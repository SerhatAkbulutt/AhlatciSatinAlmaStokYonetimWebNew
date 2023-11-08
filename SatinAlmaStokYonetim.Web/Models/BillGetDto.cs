namespace SatinAlmaStokYonetim.Web.Models
{
    public class BillGetDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string BillNumber { get; set; }
        public DateTime BillDate { get; set; }
        public decimal ProductAmount { get; set; }
        public decimal TotalKDV { get; set; }
        public decimal BillTotalPrice { get; set; }
        public decimal Discount { get; set; }
        public string Currency { get; set; }
    }
}
