using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpineWise.Web.Data;
using SpineWise.Web.Helpers.Auth;
using SpineWise.Web.Helpers.Endpoint;
using SpineWise.Web.Helpers.Models;

namespace SpineWise.Web.Endpoints.ChairManagement.GetByUser
{
    [Route("get")]
    public class GetChairByUserEndpoint:MyBaseEndpoint<NoRequest, GetChairByUserResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly MyAuthService _myAuthService;

        public GetChairByUserEndpoint(ApplicationDbContext context, MyAuthService myAuthService)
        {
            _applicationDbContext = context;
            _myAuthService = myAuthService;
        }

        [HttpGet("getbyuser")]
        public override async Task<ActionResult<GetChairByUserResponse>> Action(NoRequest request, CancellationToken cancellationToken = default)
        {
            var user = _myAuthService.GetAuthInfo().UserAccount;
            if (user == null)
            {
                return BadRequest("No user logged in!");
            }
            var chairs = await _applicationDbContext
                .ChairsUsers
                .Where(x => x.UserId == user.Id)
                .ToListAsync(cancellationToken);

            return Ok(chairs);
        }
    }
}
