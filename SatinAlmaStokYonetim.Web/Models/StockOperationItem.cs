namespace SatinAlmaStokYonetim.Web.Models
{
    public class StockOperationItem
    {
        public int Quantity { get; set; }
        public bool Status { get; set; }
        public DateTime OperationTime { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeSurname { get; set; }
    }
}
