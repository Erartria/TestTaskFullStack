using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Data
{
    public sealed class Dot
    {
        public Dot()
        {
            Comments = new List<Comment>();
        }

        [Key] public int Id { get; set; }

        [Required] public int X { get; set; }

        [Required] public int Y { get; set; }

        [Required] public int Radius { get; set; }

        [Required] public string Color { get; set; }

        public IList<Comment> Comments { get; set; }
    }
}