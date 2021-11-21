using System.Runtime.CompilerServices;

namespace Server.Persistence
{
    public class BaseService
    {
        protected readonly AppDbContext _context;

        public BaseService(AppDbContext dbContext)
        {
            _context = dbContext;
        }

        public string GenerateErrorMessage(string message,
            [CallerMemberName] string method = "")
        {
            return $"An error occurred while {method} in {GetType().Name}: {message}";
        }
    }
}