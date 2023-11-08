namespace SatinAlmaStokYonetim.Web.Models
{
    public class StockItem
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public string ProductImage { get; set; }
        public int Quantity { get; set; }
    }
}
