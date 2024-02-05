using Microsoft.AspNetCore.Mvc;
using SpineWise.ClassLibrary.Models;
using SpineWise.Web.Data;
using SpineWise.Web.Helpers.Auth;
using SpineWise.Web.Helpers.Auth.PasswordHasher;
using SpineWise.Web.Helpers.Endpoint;
using SpineWise.Web.Helpers.Models;

namespace SpineWise.Web.Endpoints.GenerateData
{
    [MyAuthorization("superuser")]
    [Route("generatedata")]
    public class GenerateAdmins:MyBaseEndpoint<string,NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public GenerateAdmins(ApplicationDbContext context)
        {
            _applicationDbContext = context;
        }

        [HttpGet("generateadmins")]
        public override async Task<ActionResult<NoResponse>> Action([FromQuery] string request,
            CancellationToken cancellationToken = default)
        {

            var counter = 1;
            for (int i = 0; i < 3; i++)
            {
                var count = _applicationDbContext.SuperAdmins.Count() + 1;
                var pass = $"admin{counter}{counter + 1}{counter + 2}+-!";
                var password = await PasswordHasher.Hash(pass);
                var admin = new SuperAdmin()
                {
                    BirthDate = DateTime.Now,
                    DateOfCreation = DateTime.Now,
                    Email = $"admin{count}@admin",
                    Password = password,
                    FirstName = "adminf" + count,
                    LastName = "adminl" + count,
                    Username = "adminf.adminl" + count
                };
                _applicationDbContext.SuperAdmins.Add(admin);
                await _applicationDbContext.SaveChangesAsync(cancellationToken);
                counter++;
            }

            return Ok(new NoResponse());
        }
    }
}
