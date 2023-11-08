using Microsoft.AspNetCore.Mvc;
using SatinAlmaStokYonetim.Models;
using SatinAlmaStokYonetim.Web.Models;
using System.Text.Json;

namespace SatinAlmaStokYonetim.Web.Controllers
{
    public class SupplierController : Controller
    {

        [HttpGet]
        public async Task<IActionResult> GetAllSupplier()
        {
            HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}suppliers/getallSupplier";

            var httpResponseMessage = await client.GetAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<SupplierItem>>>(contentData,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }
    }
}
