using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpineWise.Web.Data;
using SpineWise.Web.Helpers.Auth;
using SpineWise.Web.Helpers.Endpoint;
using SpineWise.Web.Helpers.Models;

namespace SpineWise.Web.Endpoints.ChairUser.Add
{
    [MyAuthorization("user")]
    [Route("chairuser")]
    public class AddChairUserEndpoint:MyBaseEndpoint<AddChairUserRequest, NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly MyAuthService _myAuthService;

        public AddChairUserEndpoint(ApplicationDbContext context, MyAuthService myAuth)
        {
            _applicationDbContext = context;
            _myAuthService=myAuth;
        }

        [HttpPost("add")]
        public override async Task<ActionResult<NoResponse>> Action(AddChairUserRequest request, CancellationToken cancellationToken = default)
        {
            var chair = await _applicationDbContext
                .Chairs
                .Where(x => x.SerialNumber == request.ChairNumber)
                .FirstOrDefaultAsync(cancellationToken);
            if (chair == null)
            {
                return BadRequest("Wrong chair serial number!");
            }

            var user = _myAuthService.GetAuthInfo().UserAccount;

            var chairUser = new ClassLibrary.Models.ChairUser
            {
                ChairId = chair.Id,
                DateOfAcquiring = DateTime.Now,
                UserId = user.Id
            };
            _applicationDbContext.Add(chairUser);
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Ok(new NoResponse());
        }
    }
}
