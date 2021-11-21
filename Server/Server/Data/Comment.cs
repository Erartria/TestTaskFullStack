using System.ComponentModel.DataAnnotations;

namespace Server.Data
{
    public class Comment
    {
        [Key] public int Id { get; set; }

        [Required] public string Text { get; set; }

        [Required] public string BackgroundColor { get; set; }

        public int DotId { get; set; }

        [Required] public Dot Dot { get; set; }
    }
}