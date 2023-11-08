namespace SatinAlmaStokYonetim.Web.Models
{
    public class BasketDetailItem
    {
        public long Id { get; set; }
        public int ProductId { get; set; }
        public int BasketId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitQuantity { get; set; }
        public byte DetailStatus { get; set; }
    }
}
