using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SatinAlmaStokYonetim.Web.Models.Offer
{
    public class OfferPostDto
    {
        public int CompanyId { get; set; }
        public long RequestId { get; set; }
        public int SupplierId { get; set; }
        public string? OfferDescription { get; set; }
        public decimal OfferPrice { get; set; }
        public string PriceCurrency { get; set; }
    }
}
