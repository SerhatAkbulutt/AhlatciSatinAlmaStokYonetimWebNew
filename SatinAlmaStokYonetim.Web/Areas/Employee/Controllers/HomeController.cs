using Microsoft.AspNetCore.Mvc;
using SatinAlmaStokYonetim.Code.Filter;
using SatinAlmaStokYonetim.Web.Models;
using System;
using System.Diagnostics;

namespace SatinAlmaStokYonetim.Web.Areas.Employee.Controllers
{
    [Area("Employee")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        public IActionResult Index() => View();
        public IActionResult Message() => View();


        [ViewActionFilter(ViewPageName = "CreateRequest")]
        public IActionResult CreateRequest() => View();


        [ViewActionFilter(ViewPageName = "ApproveRequest")]
        public IActionResult ApproveRequest() => View();


        [ViewActionFilter(ViewPageName = "OfferApproval")]
        public IActionResult OfferApproval() => View();


        [ViewActionFilter(ViewPageName = "CreateOffer")]
        public IActionResult CreateOffer() => View();


        [ViewActionFilter(ViewPageName = "ManageStock")]
        public IActionResult ManageStock() => View();


        [ViewActionFilter(ViewPageName = "Invoices")]
        public IActionResult Invoices() => View();


        [ViewActionFilter(ViewPageName = "InvoiceEntry")]
        public IActionResult InvoiceEntry() => View();

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
