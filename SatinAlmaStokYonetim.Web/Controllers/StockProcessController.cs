using Microsoft.AspNetCore.Mvc;
using SatinAlmaStokYonetim.Models;
using SatinAlmaStokYonetim.Web.Models;
using System.Text;
using System.Text.Json;

namespace SatinAlmaStokYonetim.Web.Controllers
{
    public class StockProcessController : Controller
    {

        //Stok getir!.
        [HttpPost]
        public async Task<IActionResult> GetallStockbyCompanyId([FromBody] int companyId)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}stock/getallstockbyCompanyId?companyId={companyId}";

            var httpResponseMessage = await client.GetAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<StockItem>>>(contentData,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }

        //Stok operation tablosundan get etkemk için buraya bir stok ıd değeri gerekli!!!!.
        [HttpPost]
        public async Task<IActionResult> GetallStockOperationbyStockId([FromBody] int stockId)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}stockOperation/getallOperationbystockId?stockId={stockId}";

            var httpresponseMessage = await client.GetAsync(uri);

            var contentData = await httpresponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<StockOperationItem>>>(contentData,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }

        //Stock Çıkış işlemleri için bu kontroller kullanılacak...
        [HttpPost]
        public async Task<IActionResult> LogOutStock([FromBody] StockOperationOutItem item)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}stockOperation/logoutstock";

            var json = JsonSerializer.Serialize(item);

            var httpResponseMessage = await client.PostAsync(uri, new StringContent(json, encoding: Encoding.UTF8, "application/json"));

            return Json(new { isSuccess = true });
        }

    }
}
