namespace SatinAlmaStokYonetim.Web.Models
{
    public class RequestItem
    {
        public long Id { get; set; }
        public long EmployeeId { get; set; }
        public long BasketId { get; set; }
        public string RequestNo { get; set; }
        public byte RequestStatus { get; set; }
    }
}
