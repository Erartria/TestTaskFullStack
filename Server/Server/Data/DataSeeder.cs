using Microsoft.EntityFrameworkCore;

namespace Server.Data
{
    public class DataSeeder
    {
        public static void SeedData(ModelBuilder builder)
        {
            Dot[] dots =
            {
                new() { Id = 1, Color = "red", X = 500, Y = 500, Radius = 70 },
                new() { Id = 2, Color = "yellow", X = 100, Y = 100, Radius = 30 },
                new() { Id = 3, Color = "blue", X = 200, Y = 200, Radius = 40 }
            };
            Comment[] comments =
            {
                new() { Id = 1, DotId = 1, BackgroundColor = "red", Text = "comment 1" },
                new() { Id = 2, DotId = 1, BackgroundColor = "green", Text = "comment 2" },
                new() { Id = 3, DotId = 2, BackgroundColor = "blue", Text = "comment 3" },
                new() { Id = 4, DotId = 2, BackgroundColor = "purple", Text = "comment 4" },
                new() { Id = 5, DotId = 3, BackgroundColor = "yellow", Text = "comment 5" },
                new() { Id = 6, DotId = 1, BackgroundColor = "#00a86b", Text = "very long comment 6" }
            };

            builder.Entity<Dot>().HasData(dots);
            builder.Entity<Comment>().HasData(comments);
        }
    }
}