using SpineWise.ClassLibrary.Models;

namespace SpineWise.Web.Endpoints.ChairManagement.GetByUser
{
    public class GetChairByUserResponse
    {
        public string SerialNumber { get; set; }
        public DateTime DateOfCreating { get; set; }
        public string ChairModelName { get; set; }
    }
}
