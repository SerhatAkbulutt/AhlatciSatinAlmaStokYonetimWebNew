let requests = [];
let basket = [];
let offers = [];
let selectedOfferId;

function detail(offerId) {
    selectedOfferId = offerId;
    createOfferDetailTable(offerId);
    $("#detailModal").modal("show");
}
function decline(offerId) {
    selectedOfferId = offerId;
    Post2('https://localhost:7172/Offer/DeleteOffer', parseInt(selectedOfferId), (data) => {
        if (data.isSuccess) {
            getOffers(selectedOfferId);
            $.NotificationApp.send("Teklif", "Teklif Reddedildi.", "bottom-right", "rgba(0,0,0,0.2)", "warning");
        }
        else {
            $.NotificationApp.send("Hata", "İşlem Surasında Hata Oluştu.", "bottom-right", "rgba(0,0,0,0.2)", "danger");
          
        }    
    });
}

function approve(offerId, requestId) {
    selectedOfferId = offerId;
    var data = {
        RequestId: requestId,
        OfferId: offerId
    };
    Post2('https://localhost:7172/Offer/SuccessOffer', data, (data) => {
        if (data.isSuccess) {
            getAllRequest();
            $.NotificationApp.send("Teklif", "Teklif Onaylandı.", "bottom-right", "rgba(0,0,0,0.2)", "success");
            document.getElementById("divRequestDetail").innerHTML = "";
        }
        else {
            $.NotificationApp.send("Hata", "İşlem Surasında Hata Oluştu.", "bottom-right", "rgba(0,0,0,0.2)", "danger");

        }
    });
}

function createOfferDetailTable(id) {

    offer = offers.find(offers => offers.id === id);
    if (offer !== undefined) {

        let data2 = JSON.parse(offer.offerDescription);
        html = ``;
        html += `<table class="table table-bordered table-selected table-sm table-centered mb-0">`;
        html += `   <thead>`;
        html += `       <tr>`;
        html += `            <th>Sıra</th>`;
        html += `            <th>Ürün</th>`;
        html += `            <th>Adet</th>`;
        html += `            <th>Birim Fiyatı</th>`;
        html += `        </tr>`;
        html += `   </thead>`;
        html += `    <tbody>`;
        for (var i = 0; i < data2.length; i++) {
            html += `       <tr>`;
            html += `           <td>${i + 1}</td>`;
            html += `           <td>${data2[i].productName}</td>`;
            html += `           <td>${data2[i].quantity}</td>`;
            html += `           <td>${data2[i].unitPrice}</td>`;
            html += `       </tr>`;
        }
        html += `    </tbody>`;
        html += `</table>`;
        $("#offerDetail").html(html);
    }

}
function createOffersTable(data) {
    html = ``;
    html += `<table class="table table-bordered table-sm table-centered mb-0">`;
    html += `   <thead>`;
    html += `       <tr>`;
    html += `            <th>Sıra</th>`;
    html += `            <th>Tedarikçi Firma</th>`;
    html += `            <th>Teklif Tarihi</th>`;
    html += `            <th class="text-center">Siparişler</th>`;
    html += `            <th class="text-center">Kur</th>`;
    html += `            <th>Toplam Fiyat</th>`;
    html += `            <th class="text-center">Reddet</th>`;
    html += `            <th class="text-center">Onayla</th>`;
    html += `        </tr>`;
    html += `   </thead>`;
    html += `    <tbody>`;
    for (var i = 0; i < data.length; i++) {
        html += `       <tr>`;
        if (data[i].offerStatus == 2) {
            html += `           <td>${i + 1}</td>`;
            html += `           <td><strike>${data[i].companyName}</strike></td>`;
            html += `           <td><strike>${formatTarih(data[i].offerTime)}</strike></td>`;
            html += `           <td class="table-action text-center">`;
            html += `               <a href="javascript: detail(${data[i].id});" class="action-icon"> <i style="color:rgba(255, 188, 0, 0.85)" class="mdi mdi-cart-variant"></i></a>`;
            html += `           </td>`;
            html += `           <td><span class="badge badge-secondary-lighten font-12 "><strike>${data[i].priceCurrency}</strike></span></td>`;
            html += `           <td><span class="badge badge-secondary-lighten font-12 "><strike>${data[i].offerPrice}</strike></span></td>`;
            html += `           <td class="table-action text-center">`;
            html += `           </td>`;
            html += `           <td class="table-action text-center">`;
            html += `           </td>`;
        }
        else {
            html += `           <td>${i + 1}</td>`;
            html += `           <td>${data[i].companyName}</td>`;
            html += `           <td>${formatTarih(data[i].offerTime)}</td>`;
            html += `           <td class="table-action text-center">`;
            html += `               <a href="javascript: detail(${data[i].id});" class="action-icon"> <i style="color:rgba(255, 188, 0, 0.85)" class="mdi mdi-cart-variant"></i></a>`;
            html += `           </td>`;
            html += `           <td><span class="badge badge-secondary-lighten font-12 ">${data[i].priceCurrency}</span></td>`;
            html += `           <td><span class="badge badge-secondary-lighten font-12 ">${data[i].offerPrice}</span></td>`;
            html += `           <td class="table-action text-center">`;
            html += `               <a href="javascript: decline(${data[i].id});" class="action-icon"> <i style="color:rgb(250, 92, 124);" class="mdi mdi-minus-circle-outline"></i></a>`;
            html += `           </td>`;
            html += `           <td class="table-action text-center">`;
            html += `               <a href="javascript: approve(${data[i].id},${data[i].requestId});" class="action-icon"> <i style="color:rgb(10, 207, 151);" class="mdi mdi-check-outline"></i></a>`;
            html += `           </td>`;
        } 
        html += `       </tr>`;
    }
    html += `    </tbody>`;
    html += `</table>`;
    $("#divOffers").html(html);
}
function createBasketTable(data) {
    html = ``;
    html += `<table class="table table-bordered table-sm table-centered mb-0">`;
    html += `   <thead>`;
    html += `       <tr>`;
    html += `            <th>Sıra</th>`;
    html += `            <th>Ürün</th>`;
    html += `            <th>Birim/Miktar</th>`;
    html += `            <th>Adet</th>`;
    html += `        </tr>`;
    html += `   </thead>`;
    html += `    <tbody>`;
    for (var i = 0; i < data.length; i++) {
        html += `       <tr>`;
        html += `           <td>${i + 1}</td>`;
        html += `           <td>${data[i].productName}</td>`;
        html += `           <td>${data[i].unitQuantity}</td>`;
        html += `           <td>${data[i].quantity}</td>`;
        html += `       </tr>`;
    }
    html += `    </tbody>`;
    html += `</table>`;
    $("#divRequestDetail").html(html);
}
function getOffers(id) {
    selectedOfferId = id;
    var data = {
        CompanyId: parseInt(CID),
        RequestId: id
    }
    Post2('https://localhost:7172/Offer/GetAllOffers', data, (data) => {
        offers = data;
        if (offers.length > 0) {
            createOffersTable(offers);
        }
        else {
            $("#divOffers").html("");
        }
    });

}
function readRequest(requestId, requestNo, basketId) {
    document.getElementById("offerPage").style.display = "block";
    htmlInfo = `${requestNo}`;
    $("#requestInfo").html(htmlInfo);

    Post2('https://localhost:7172/Basket/GetbyBasketId', basketId, (data) => {
        basket = data;
        createBasketTable(basket);
        getOffers(requestId);
    });
}
function createRequestsTable(data) {
    html = ``;
    for (var i = 0; i < data.length; i++) {
        html += `<a href="javascript:void(readRequest(${data[i].id},'${data[i].requestNo}',${data[i].basketId}));" class="text-body">`;
        html += `<div class="d-flex mt-1 p-1">`;
        html += `<div class="avatar-sm d-table">`;
        html += `<span class="avatar-title bg-info-lighten rounded-circle text-info">`;
        html += `<i class="uil uil-mountains font-24"></i>`;
        html += `</span>`;
        html += `</div>`;
        html += `<div class="ms-2">`;
        html += `<h5 class="mt-0 mb-0">${CNA}</h5>`;
        html += `<span class="badge badge-info-lighten ms-1"> Teklif Onay...</span>`;
        html += `<p class="mb-0 text-muted font-12">Talep No:</p><p class="mb-0 text-muted font-12"> ${data[i].requestNo}</p>`;
        html += `</div>`;
        html += `</div>`;
        html += `</a>`;
    }
    $("#divRequests").html(html);
}
function getAllRequest() {
    document.getElementById("offerPage").style.display = "none";

    Post2('https://localhost:7172/Request/GetStatusThree', parseInt(CID), (data) => {
        requests = data;
        createRequestsTable(requests);
    });
}
$(document).ready(function () {
    getAllRequest();
});