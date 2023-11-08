using Microsoft.AspNetCore.Mvc;
using SatinAlmaStokYonetim.Models;
using SatinAlmaStokYonetim.Web.Models;
using System.Text;
using System.Text.Json;

namespace SatinAlmaStokYonetim.Web.Controllers
{
    public class RequestController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> GetbyCompanyIdAndDepartmanId([FromBody] CompDepId id)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}requests/getbyCompandDep?companyId={id.companyId}&departmentId={id.departmentId}";

            var httpResponseMessage = await client.GetAsync(uri);
                
            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<RequestItem>>>(contentData,

                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }


        [HttpPost]
        public async Task<IActionResult> GetbyCompanyId([FromBody] int companyId)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}requests/getbyCompany?companyId={companyId}";

            var httpResponseMessage = await client.GetAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<RequestItem>>>(contentData,

                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }


        [HttpPost]
        public async Task<IActionResult> GetbySA([FromBody] CompDepId id)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}requests/getbySA?companyId={id.companyId}&departmentId={id.departmentId}";

            var httpResponseMessage = await client.GetAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<RequestItem>>>(contentData,

                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }


        [HttpPost]
        public async Task<IActionResult> SuccessRequest([FromBody] int requestId)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}requests/updateRequest?id={requestId}";

            var json = JsonSerializer.Serialize(requestId);

            var httpResponseMessage = await client.PutAsync(uri, new StringContent(json, Encoding.UTF8, "application/json"));

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<NoData>>(contentData,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(new { isSuccess = true });
        }


        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] int id)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}requests/deleteRequest?id={id}";

            var httpResponseMessage = await client.DeleteAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            return Json(new { isSuccess = true });
        }

        [HttpPost]
        public async Task<IActionResult> GetAllNotifications([FromBody] CompDepId item)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}requests/getallCount?companyId={item.companyId}&departmentId={item.departmentId}";


            var httpResponseMessage = await client.GetAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

           return Ok(int.Parse(contentData));   
        }

        [HttpPost]
        public async Task<IActionResult> StatusTwo([FromBody] int requestId)
        {
            using HttpClient client = new HttpClient();
            var json = JsonSerializer.Serialize(requestId);
            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}requests/requeststatusTwo?requestId={requestId}";

            var httpResponseMessage = await client.PutAsync(uri, new StringContent(json, Encoding.UTF8, "application/json"));

            var contenData = await httpResponseMessage.Content.ReadAsStringAsync();

            return Json(new { isSuccess = true });
        }

        //RequestStatus = 3 olanlar ve companyId ye göre o değeri  sağlayan talepler için requestler için get etme eylemi
        [HttpPost]
        public async Task<IActionResult> GetStatusThree([FromBody] int companyId)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}requests/getRequests?companyId={companyId}";

            var httpResponseMessage = await client.GetAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<RequestItem>>>(contentData,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }

        [HttpPost]
        public async Task<IActionResult> GetStatusFor([FromBody] CompDepId item)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}requests/getallStatusFour?companyId={item.companyId}&departmentId={item.departmentId}";

            var httpResponseMessage = await client.GetAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<RequestItem>>>(contentData,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }
    }
}
