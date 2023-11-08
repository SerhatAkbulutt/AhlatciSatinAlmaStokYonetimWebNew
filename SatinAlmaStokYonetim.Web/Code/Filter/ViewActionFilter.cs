using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace SatinAlmaStokYonetim.Code.Filter
{
    public class ViewActionFilter : ActionFilterAttribute, IAuthorizationFilter
    {
        public string? ViewPageName;
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!string.IsNullOrEmpty(ViewPageName))
            {
                bool isAuthorized = false;
                switch (ViewPageName)
                {
                    case "CreateRequest":
                        if (Repo.Session.Authority == "Talep")
                        {
                            isAuthorized = true;
                        }
                        break;
                    case "ApproveRequest":
                        if (Repo.Session.Authority == "")
                        {
                            isAuthorized = true;
                        }
                        break;
                    case "CreateOffer":
                        if (Repo.Session.Authority == "")
                        {
                            isAuthorized = true;
                        }
                        break;
                    case "OfferApproval":
                        if (Repo.Session.Authority == "")
                        {
                            isAuthorized = true;
                        }
                        break;
                    case "ManageStock":
                        if (Repo.Session.Authority == "")
                        {
                            isAuthorized = true;
                        }
                        break;
                    case "InvoiceEntry":
                        if (Repo.Session.Authority == "Muhasebe")
                        {
                            isAuthorized = true;
                        }
                        break;
                    case "Invoices":
                        if (Repo.Session.Authority == "Muhasebe")
                        {
                            isAuthorized = true;
                        }
                        break;
                }
                if (!isAuthorized)
                    context.Result = new UnauthorizedResult();
            }
            else if (string.IsNullOrEmpty(Repo.Session.Username))
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }

}
