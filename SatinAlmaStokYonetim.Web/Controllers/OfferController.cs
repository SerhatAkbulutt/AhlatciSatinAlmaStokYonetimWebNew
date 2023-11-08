using Microsoft.AspNetCore.Mvc;
using SatinAlmaStokYonetim.Models;
using SatinAlmaStokYonetim.Web.Models;
using SatinAlmaStokYonetim.Web.Models.Offer;
using System.Text;
using System.Text.Json;

namespace SatinAlmaStokYonetim.Web.Controllers
{
    public class OfferController : Controller
    {
       public async Task<IActionResult> CreateOffer([FromBody]OfferPostDto dto)
        {
            using HttpClient client = new HttpClient();

            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}offers/createOffers";

            var json = JsonSerializer.Serialize(dto);

            var httpResponseMessage = await client.PostAsync(uri, new StringContent(json, encoding: Encoding.UTF8, "application/json"));

            return Json(new { isSuccess = true });
        }
        //Bu onaylanmış teklifleri çekiyor.
        [HttpPost]
        public async Task<IActionResult> GetAllOffers([FromBody] CompandRequestId item)
        {
            using HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:5208");

            string uri = $"{client.BaseAddress}offers/getallbycompanyIdOffers?companyId={item.CompanyId}&requestId={item.RequestId}";

            var httpResponseMessage = await client.GetAsync(uri);

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            var jsonData = JsonSerializer.Deserialize<ResponseBody<List<OfferGetDto>>>(contentData,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return Json(jsonData!.data);
        }






        //Gelen offerId değerine göre onay verme işlemi
        [HttpPost]
        public async Task<IActionResult> SuccessOffer([FromBody] RequestOffer item)
        {
            using HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:5208");
            var json = JsonSerializer.Serialize(item);
            string uri = $"{client.BaseAddress}offers/successOffer?offerId={item.OfferId}&requestId={item.RequestId}";

            var httpResponseMessage = await client.PutAsync(uri, new StringContent(json, Encoding.UTF8, "application/json"));

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            return Json(new { isSuccess = true });
        }



        //Teklif red etme
        [HttpPost]
        public async Task<IActionResult> DeleteOffer([FromBody] int offerId)
        {
            using HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:5208");
            var json = JsonSerializer.Serialize(offerId);
            string uri = $"{client.BaseAddress}offers/deleteOffer?offerId={offerId}";

            var httpResponseMessage = await client.PutAsync(uri, new StringContent(json, Encoding.UTF8, "application/json"));

            var contentData = await httpResponseMessage.Content.ReadAsStringAsync();

            return Json(new { isSuccess = true });



        }
    }
}
