using Microsoft.AspNetCore.Mvc;

namespace SatinAlmaStokYonetim.Web.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class HomeController : Controller
    {
        public IActionResult Index() => View();
        public IActionResult RegisterUser() => View();
        public IActionResult CreateRequest() => View();
        public IActionResult CreateOffer() => View();
        public IActionResult Product() => View();
        public IActionResult ProductCategory() => View();
        public IActionResult Company() => View();
        public IActionResult Department() => View();
        public IActionResult Employee() => View();

        public IActionResult Role() => View();
        
    }
}
