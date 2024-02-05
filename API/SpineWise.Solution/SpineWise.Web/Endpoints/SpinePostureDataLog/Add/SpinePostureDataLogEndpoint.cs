using Microsoft.AspNetCore.Mvc;
using SpineWise.Web.Data;
using SpineWise.Web.Helpers.Endpoint;
using SpineWise.Web.Helpers.Models;

namespace SpineWise.Web.Endpoints.SpinePostureDataLog.Add
{
    [Route("sensordata")]
    public class SpinePostureDataLogEndpoint:MyBaseEndpoint<SpinePostureDataLogRequest, NoResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IConfiguration _configuration;
        public SpinePostureDataLogEndpoint(ApplicationDbContext context, IConfiguration configuration)
        {
            _applicationDbContext = context;
            _configuration = configuration;
        }
        [HttpPost("log")]
        public override async Task<ActionResult<NoResponse>> Action([FromBody]SpinePostureDataLogRequest request, CancellationToken cancellationToken = default)
        {
            string arduinoLogKey = _configuration.GetValue<string>("ArduinoLogKey:Key");
            if (request.Key != arduinoLogKey)
            {
                return BadRequest("Wrong key");
            }
            var DatumVrijeme = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,
                TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"));

            var obj = new ClassLibrary.Models.SpinePostureDataLog()
            {
                LegDistance = request.LegDistance,
                UpperBackDistance = request.UpperBackDistance,
                PressureSensor1 = request.PressureSensor1,
                PressureSensor2 = request.PressureSensor2,
                PressureSensor3 = request.PressureSensor3,
                ChairId = request.ChairId,
                DateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,
                    TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"))
            };

            _applicationDbContext.SpinePostureDataLogs.Add(obj);
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Ok();
        }
    }
}
