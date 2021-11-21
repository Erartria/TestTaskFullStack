using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Persistence;

namespace Server.Services
{
    public class DotService : BaseService, IDotService
    {
        public DotService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Dot>> FindAllDots()
        {
            return await _context.Dots.Include(dot => dot.Comments).ToListAsync();
        }

        public async Task<Dot> FindById(int id)
        {
            var dot = await _context.Dots
                .Include(dot => dot.Comments)
                .FirstOrDefaultAsync(dot => dot.Id == id);

            if (dot == null)
            {
                var erMessage = GenerateErrorMessage($"a Dot with {id} does not exist");
                throw new NullReferenceException(erMessage);
            }

            return dot;
        }

        public async Task<Dot> DeleteDot(int id)
        {
            var existedDot = await FindById(id);
            _context.Dots.Remove(existedDot);
            await _context.SaveChangesAsync();
            return existedDot;
        }
    }
}