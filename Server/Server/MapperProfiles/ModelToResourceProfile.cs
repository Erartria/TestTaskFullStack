using AutoMapper;
using Server.Data;
using Server.Resources;

namespace Server.MapperProfiles
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Comment, CommentResource>();
            CreateMap<Dot, DotResource>();
        }
    }
}