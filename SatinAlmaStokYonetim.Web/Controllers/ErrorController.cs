using Microsoft.AspNetCore.Mvc;

namespace SatinAlmaStokYonetim.Web.Controllers
{
    public class ErrorController : Controller
    {
        public IActionResult PageNotFound()
        {
            return View();
        }
    }
}
