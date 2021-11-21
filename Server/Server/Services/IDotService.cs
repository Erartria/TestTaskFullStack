using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Data;

namespace Server.Services
{
    public interface IDotService
    {
        Task<List<Dot>> FindAllDots();
        Task<Dot> FindById(int id);
        Task<Dot> DeleteDot(int id);
    }
}