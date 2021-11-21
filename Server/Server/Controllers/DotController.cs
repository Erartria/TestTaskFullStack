using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Resources;
using Server.Services;

namespace Server.Controllers
{
    public class DotController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IDotService _service;

        public DotController(IDotService dotService, IMapper mapper)
        {
            _service = dotService;
            _mapper = mapper;
        }

        [HttpGet("/api/[controller]")]
        public async Task<IReadOnlyCollection<DotResource>> GetAllPoint()
        {
            var dots = await _service.FindAllDots();
            var resources = _mapper.Map<List<Dot>, List<DotResource>>(dots);
            return resources;
        }

        /// <summary>
        /// MVC view
        /// </summary>
        /// <returns>View that located at Views/Dot/Index.cshtml</returns>
        [HttpGet("/view")]
        public IActionResult Index()
        {
            ViewData["Message"] = "Your application description page.";
            return View();
        }

        [HttpGet("/api/[controller]/{id}")]
        public async Task<ActionResult<DotResource>> GetPointById(int id)
        {
            var dot = await _service.FindById(id);
            var resources = _mapper.Map<Dot, DotResource>(dot);
            return resources;
        }

        [HttpDelete("/api/[controller]/{id}")]
        public async Task<ActionResult<DotResource>> DeletePointById(int id)
        {
            var dot = await _service.DeleteDot(id);
            var resource = _mapper.Map<Dot, DotResource>(dot);
            return Ok(resource);
        }
    }
}