using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpineWise.ClassLibrary.Models
{
    public class ChairUser
    {
        public int Id { get; set; }
        [ForeignKey(nameof(Chair))]
        public int ChairId { get; set; }
        public Chair Chair { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public User User { get; set; }

        public DateTime DateOfAcquiring { get; set; }
    }
}
