using Microsoft.AspNetCore.Mvc;
using SatinAlmaStokYonetim.Models;
using SatinAlmaStokYonetim.Web.Models;
using System.Text.Json;

namespace SatinAlmaStokYonetim.Web.Controllers
{
    public class ProductController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> GetCategory([FromBody]string id)
        {

            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");
            int newId = Convert.ToInt32(id);
            string uri = $"{client.BaseAddress}api/products/getallbycategoryId?categoryId={newId}";

            var responseMessage = await client.GetAsync(uri);

            var cd = await responseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<ProductItem>>>(cd,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(new { jsonData!.data });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProduct()
        {
            HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}api/products/getProducts";

            var httpResponseMessage = await client.GetAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<ProductItem>>>(contentData,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }
    }
}
