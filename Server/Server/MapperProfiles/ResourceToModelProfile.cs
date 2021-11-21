using AutoMapper;
using Server.Data;
using Server.Resources;

namespace Server.MapperProfiles
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<CommentResource, Comment>();
            CreateMap<DotResource, Dot>();
        }
    }
}