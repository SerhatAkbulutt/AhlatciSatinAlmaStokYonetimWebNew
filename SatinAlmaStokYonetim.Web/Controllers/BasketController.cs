using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;
using SatinAlmaStokYonetim.Web.Models;
using SatinAlmaStokYonetim.Models;

namespace SatinAlmaStokYonetim.Web.Controllers
{
    public class BasketController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BasketModel model)
        {

            var json = JsonSerializer.Serialize(model);

            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}baskets/insertBasket";

            var httpResponseMessage = await client.PostAsync(uri, new StringContent(json, Encoding.UTF8, "application/json"));

            return Json(new { IsSuccess = true });
        }

        [HttpPost]
        public async Task<IActionResult> GetbyBasketId([FromBody] int id)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}basketDetails/getbyrequestId?id={id}";

            var httpResponseMessage = await client.GetAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<BasketDetailGetDto>>>(contentData,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }
    }
}
