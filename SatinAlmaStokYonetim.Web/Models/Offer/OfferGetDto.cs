namespace SatinAlmaStokYonetim.Web.Models.Offer
{
    public class OfferGetDto
    {
        public long Id { get; set; }
        public long RequestId { get; set; }
        public string CompanyName { get; set; }
        public DateTime OfferTime { get; set; }
        public byte OfferStatus { get; set; }
        public string OfferNo { get; set; }
        public string? OfferDescription { get; set; }
        public decimal OfferPrice { get; set; }
        public string PriceCurrency { get; set; }
    }
}
