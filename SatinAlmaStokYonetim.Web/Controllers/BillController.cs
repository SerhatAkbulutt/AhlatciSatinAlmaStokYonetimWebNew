using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;
using SatinAlmaStokYonetim.Web.Models;
using Newtonsoft.Json.Linq;
using SatinAlmaStokYonetim.Models;
using static SatinAlmaStokYonetim.Web.Models.BillModel;

namespace SatinAlmaStokYonetim.Web.Controllers
{
    public class BillController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> CreateBill([FromBody] BillModel model)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}bill/createBill";

            var json = JsonSerializer.Serialize(model);

            var httpResponseMessage = await client.PostAsync(uri, new StringContent(json, Encoding.UTF8, "application/json"));

            return Json(new { isSuccess = true });
        }

        [HttpPost]
        public async Task<IActionResult> GetallBillbyCompanyId([FromBody] int companyId)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}bill/getallbyCompanyId?companyId={companyId}";

            var httpResponseMessage = await client.GetAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<BillGetDto>>>(contentData,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }

        [HttpPost]
        public async Task<IActionResult> GetBillDetailbyBillId([FromBody] int billId)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}billdetail/getallbilldetailbybillId?billId={billId}";

            var httpresponseMessage = await client.GetAsync(uri);

            var contentData = await httpresponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<BillDetailItem>>>(contentData,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }
    }
}
