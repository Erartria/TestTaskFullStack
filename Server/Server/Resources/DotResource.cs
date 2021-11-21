﻿using System.Collections.Generic;

namespace Server.Resources
{
    public class DotResource
    {
        public int Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Radius { get; set; }
        public string Color { get; set; }

        public IList<CommentResource> Comments { get; set; }
    }
}