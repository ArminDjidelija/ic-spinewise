using Microsoft.AspNetCore.Mvc;
using SpineWise.ClassLibrary.Models;
using SpineWise.Web.Data;
using SpineWise.Web.Helpers.Auth.PasswordHasher;
using SpineWise.Web.Helpers.Endpoint;
using SpineWise.Web.Helpers.Generators;
using SpineWise.Web.Helpers.Models;

namespace SpineWise.Web.Endpoints.GenerateData
{
    [Route("testdata")]
    public class GenerateUsers : MyBaseEndpoint<NoRequest, NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public GenerateUsers(ApplicationDbContext context)
        {
            _applicationDbContext = context;
        }

        [HttpGet("generateusers")]
        public override async Task<ActionResult<NoResponse>> Action([FromQuery]NoRequest request,
            CancellationToken cancellationToken = default)
        {
            for (int i = 0; i < 3; i++)
            {
                var count = _applicationDbContext.Users.Count() + 1;
                var password=await PasswordHasher.Hash("user"+count);
                var user = new User
                {
                    BirthDate = DateTime.Now,
                    DateOfCreation = DateTime.Now,
                    Email = $"u{count}@u",
                    Password = password,
                    FirstName = "first" + count,
                    LastName = "last" + count,
                    Username = "first.last" + count
                };
                _applicationDbContext.Add(user);
                await _applicationDbContext.SaveChangesAsync(cancellationToken);
            }

            return Ok(new NoResponse());
        }
    }
}