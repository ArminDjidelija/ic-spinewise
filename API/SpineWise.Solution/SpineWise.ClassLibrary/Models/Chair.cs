using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpineWise.ClassLibrary.Models
{
    public class Chair
    {
        [Key]
        public int Id { get; set; }
        public string SerialNumber { get; set; }
        public DateTime DateOfCreating { get; set; }

        [ForeignKey(nameof(ChairModel))]
        public int ChairModelId { get; set; }
        public ChairModel ChairModel { get; set; }
    }
}
