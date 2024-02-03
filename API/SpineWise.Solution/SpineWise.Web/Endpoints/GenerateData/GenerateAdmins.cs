using Microsoft.AspNetCore.Mvc;
using SpineWise.ClassLibrary.Models;
using SpineWise.Web.Data;
using SpineWise.Web.Helpers.Auth.PasswordHasher;
using SpineWise.Web.Helpers.Endpoint;
using SpineWise.Web.Helpers.Models;

namespace SpineWise.Web.Endpoints.GenerateData
{
    [Route("generatedata")]
    public class GenerateAdmins:MyBaseEndpoint<NoRequest,NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public GenerateAdmins(ApplicationDbContext context)
        {
            _applicationDbContext = context;
        }

        [HttpGet("generateadmins")]
        public override async Task<ActionResult<NoResponse>> Action([FromQuery] NoRequest request,
            CancellationToken cancellationToken = default)
        {
            for (int i = 0; i < 3; i++)
            {
                var count = _applicationDbContext.SuperAdmins.Count() + 1;
                var password = await PasswordHasher.Hash("admin" + count);
                var admin = new SuperAdmin()
                {
                    BirthDate = DateTime.Now,
                    DateOfCreation = DateTime.Now,
                    Email = $"a{count}@a",
                    Password = password,
                    FirstName = "first" + count,
                    LastName = "last" + count,
                    Username = "first.last" + count
                };
                _applicationDbContext.Add(admin);
                await _applicationDbContext.SaveChangesAsync(cancellationToken);
            }

            return Ok(new NoResponse());
        }
    }
}
