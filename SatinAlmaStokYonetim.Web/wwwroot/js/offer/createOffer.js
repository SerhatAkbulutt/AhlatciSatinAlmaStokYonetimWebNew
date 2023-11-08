let offers = [];
let requests = [];
let selectedSupplierId = 0;
let selectedRequestId = 0;
let basket = [];
let postBasket = [];
let currency = "Türk Lirası"
function closeOfferEntry() {
    Post2('https://localhost:7172/Request/StatusTwo', selectedRequestId, (data) => {
        $("#closeOfferEntryModal").modal("hide");
        htmlInfo = ` <h5 class="mb-4 bg-light p-2"><i class="mdi mdi-office-building me-1"></i>Talep No: - </h5>`;
        $("#infoRequestNo").html(htmlInfo);
        $("#divOfferDetail").html("");
        getAllRequest();
    });
}
function readRequest(id, requestNo, requestId) {
    document.getElementById("closeOfferEntryButton").style.display = "inline-block";
    $("#divOfferDetail").html("");
    getAllSupplier();
    document.getElementById("offerDetailButton").style.display = "inline-block";
    selectedBasketId = id;
    selectedRequestId = requestId;
    if (selectedBasketId > 0) {
        Post2('https://localhost:7172/Basket/GetbyBasketId', selectedBasketId, (data) => {
            basket = data;
            if (basket.length > 0) {

                basket.map(function (basket) {
                    delete basket.unitQuantity;
                    delete basket.detailStatus;
                    delete basket.createdTime;

                    return basket;
                });
                basket.forEach((obj) => {
                    obj.unitPrice = 1;
                });

                basket.forEach((obj) => {
                    obj.currency = "Lira";
                });
                postBasket = basket;
                createProductTable(basket);
            }
            else {
            }
        });
    }
    htmlInfo = ` <h5 class="mb-4 bg-light p-2">
                        <i class="mdi mdi-office-building me-1"></i>Talep No:  ${requestNo}
                    </h5>`;
    $("#infoRequestNo").html(htmlInfo);
}
function createProductTable(data) {
    html = ``;
    html += `<div class="table-responsive">`;
    html += `<table class="table mt-1 table-bordered table-sm table-centered mb-0">`;
    html += `   <thead class="table-light">`;
    html += `        <tr>`;
    html += `            <th>Sıra</th>`;
    html += `            <th>Ürün Adı</th>`;
    html += `            <th>Adet</th>`;
    html += `            <th>Birim Fiyat</th>`;
    html += `        </tr>`;
    html += `   </thead>`;
    html += `   <tbody>`;
    for (var i = 0; i < data.length; i++) {
        html += `        <tr>`;
        html += `            <th>${i + 1}</th>`;
        html += `            <th>${data[i].productName}</th>`;
        html += `            <th><span class="badge badge-info-lighten p-1">${data[i].quantity}</span></th>`;
        html += `            <th><div class="input-group input-group-sm" style="min-width:180px;">`;
        html += `            <input type="number" id="inputProductPrice${i + 1}" class="form-control form-control-sm" onchange="offerProductPrice(${data[i].productId},'inputProductPrice${i + 1}')" min="0" value="1" placeholder="0" style="width: 30px;">`;
        html += `            <label class="input-group-text input-group-text-sm">Fiyat</label>`;
        html += `            </div></th></tr>`;
    }
    html += `   </tbody>`;
    html += `</table>`
    html += `</div>`;
    html += `</div>`;
    html += `<table class="table mt-2 table-bordered table-sm table-centered mb-0"><tbody><tr></tr>`;
    html += ` <th id="priceInfo">Toplam Fiyat : ${priceCalculator()} ₺</th>`;
    html += `<th>`;
    html += `  <select class="form-select" id="optionCurrency" onchange="currencyChange()" style="min-width:80px;">`;
    html += `    <option selected value="1">₺ (Türk Lirası)</option>`;
    html += `    <option value="2">$ (Dolar)</option>`;
    html += `    <option value="3">€ (Euro)</option>`;
    html += `    <option value="4">£ (Sterlin)</option>`;
    html += `   </select>`;
    html += `</th>`;

    html += ` </tr></tbody></table>`;
    html += `<table class="table mt-2 table-bordered table-sm table-centered mb-0" ><tr><th><span class=" float-end ms-3" id="supplierWarning" style="display:inline; color:#cc9778;"> ! Tedarikçi Firma Seçilmedi.</span><button type="button" data-bs-toggle="modal" data-bs-target="#addOfferModal" onclick="offerInfo()" class="btn btn-sm btn-primary float-end"  id="createOfferButton" style="display:none;">`;
    html += `    <i class="mdi mdi-chevron-triple-down me-1"></i> Teklifi Oluştur`;
    html += `</button></th></tr></table>`;

    $("#divOfferDetail").html(html);
}
function offerInfo() {
    $("#divOfferDetail2").html("");
    html = ``;
    html += `<table class="table mb-3 table-bordered table-sm table-centered mb-0">`;
    html += `   <thead class="table-light">`;
    html += `        <tr>`;
    html += `            <th>Sıra</th>`;
    html += `            <th>Ürün Adı</th>`;
    html += `            <th>Adet</th>`;
    html += `            <th>Birim Fiyat</th>`;
    html += `        </tr>`;
    html += `   </thead>`;
    html += `   <tbody>`;
    for (var i = 0; i < postBasket.length; i++) {
        html += `        <tr>`;
        html += `            <th>${i + 1}</th>`;
        html += `            <th>${postBasket[i].productName}</th>`;
        html += `            <th><span class="badge badge-info-lighten p-1">${postBasket[i].quantity}</span></th>`;
        html += `            <th><span class="badge badge-success-lighten p-1">${postBasket[i].unitPrice}${getIcon()}</span></th>`;
        html += `        </tr>`;
    }
    html += `   </tbody>`;
    html += `</table>`
    $("#divOfferDetail2").html(html);
}
function offerProductPrice(id, elementName) {
    let product = postBasket.find(postBasket => postBasket.productId === id);
    let price = document.getElementById(elementName).value;
    product.unitPrice = parseFloat(price);
    $("#priceInfo").html(`Toplam Fiyat : ${priceCalculator()} ${getIcon()}`);
}
function currencyChange() {
    getCurrency();
    $("#priceInfo").html(`Toplam Fiyat : ${priceCalculator()} ${getIcon()}`);
}
function createOffer() {
    postBasket.map(function (postBasket) {
        delete postBasket.productId;
        return postBasket;
    });
    const myJSON = JSON.stringify(postBasket);

    var data = {
        CompanyId: parseInt(CID),
        SupplierId: selectedSupplierId,
        RequestId: selectedRequestId,
        OfferDescription: myJSON,
        OfferPrice: priceCalculator(),
        PriceCurrency: currency,
    };

    Post2('https://localhost:7172/Offer/CreateOffer', data, (data) => {

        if (data.isSuccess) {
            $("#addOfferModal").modal("hide");
            $.NotificationApp.send("Teklif", "Teklif Alındı.", "bottom-right", "rgba(0,0,0,0.2)", "success");

        }
        else {
            $.NotificationApp.send("Hata", "İşlem Surasında Hata Oluştu.", "bottom-right", "rgba(0,0,0,0.2)", "danger");
        }
    });
}
function priceCalculator() {
    let totalPrice = 0;
    for (var i = 0; i < postBasket.length; i++) {

        totalPrice += (postBasket[i].quantity * postBasket[i].unitPrice);
    }
    return totalPrice;
}
function getAllRequest() {

    resetOfferView();

    var data = {
        CompanyId: parseInt(CID),
        DepartmentId: parseInt(DID)
    };

    Post2('https://localhost:7172/Request/GetbySA', data, (data) => {
        requests = data;
        createRequestsTable(requests);
    });
}
function getAllSupplier() {

    Get2('https://localhost:7172/Supplier/GetAllSupplier', (data) => {
        var html = `<option selected disabled value="0">Tedarikçi Fırma Seç...</option>`;
        for (var i = 0; i < data.length; i++) {
            html += `<option value="${data[i].id}">${data[i].companyName}</option>`;
        }
        $("#suppliersOption").html(html);
    });
}
function supplierChange() {
    selectedSupplierId = parseInt(document.getElementById("suppliersOption").value)
    document.getElementById("createOfferButton").style.display = "block";
    document.getElementById("supplierWarning").style.display = "none";
}
function resetOfferView() {

    $("#divOfferList").html("");
    document.getElementById("offerDetailButton").style.display = "none";
}
function createRequestsTable(data) {

    html = ``;
    for (var i = 0; i < data.length; i++) {
        html += `<a href="javascript:void(readRequest(${data[i].basketId},'${data[i].requestNo}', ${data[i].id}));" class="text-body">`;
        html += `<div class="d-flex mt-1 p-1">`;
        html += `<div class="avatar-sm d-table">`;
        html += `<span class="avatar-title bg-info-lighten rounded-circle text-info">`;
        html += `<i class="uil uil-mountains font-24"></i>`;
        html += `</span>`;
        html += `</div>`;
        html += `<div class="ms-2">`;
        html += `<h5 class="mt-0 mb-0">${CNA}</h5>`;
        html += `<span class="badge badge-warning-lighten ms-1"> Teklif Alınıyor...</span>`;
        html += `<p class="mb-0 text-muted font-12">Talep No:</p><p class="mb-0 text-muted font-12"> ${data[i].requestNo}</p>`;
        html += `</div>`;
        html += `</div>`;
        html += `</a>`;
    }
    $("#divRequests").html(html);
}

$("#searchRequest").on("keyup", function () {
    const find = $(this).val().toLowerCase();
    const result = requests.filter(request => request.requestNo.toLowerCase().includes(find));
    createRequestsTable(result);
});

function getIcon() {
    let icon = "₺"
    switch (currency) {
        case "Dolar": icon = "$"; break;
        case "Euro": icon = "€"; break;
        case "Sterlin": icon = "£"; break;
        default: icon = "₺"; break;
    }
    return icon;
}

function getCurrency() {

    if (document.getElementById("optionCurrency") !== undefined) {
        let val = document.getElementById("optionCurrency").value
        switch (val) {
            case "2": currency = "Dolar"; break;
            case "3": currency = "Euro"; break;
            case "4": currency = "Sterlin"; break;
            default: currency = "Türk Lirası"; break;
        }
    }
}

$(document).ready(function () {
    getAllRequest();
    getAllSupplier();
});