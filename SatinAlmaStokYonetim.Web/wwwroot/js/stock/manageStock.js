let stocks = [];
let stocksFilter = [];
let selectedStock;
let selectedStockOpr;

function Test2() {

    let stockId = 7;
    Post2('https://localhost:7172/StockProcess/GetallStockOperationbyStockId', stockId, (data) => {

    });
}

function createStockTable(data) {
    if (data.length > 0) {
        html = ``;
        html += `<table class="table table-sm table-centered border" id="customDatatable">`;
        html += `  <thead class="table-light">`;
        html += `    <tr>`;
        html += `      <th class="text-center">Sıra</th>`;
        html += `      <th class="text-center">Ürün Adı</th>`;
        html += `      <th class="text-center">Adet</th>`;
        html += `      <th class="text-center">Stok Çıkış</th>`;
        html += `    </tr>`;
        html += `  </thead>`;
        html += `  <tbody>`;
        for (var i = 0; i < data.length; i++) {
            html += `    <tr>`;
            html += `      <td  class="text-center">${i + 1}</td>`;
            html += `      <td  class="text-center">${data[i].productName}</td>`;
            html += `      <td  class="text-center">${data[i].quantity}</td>`;
            html += `     <td  class="text-center">`;
            html += `       <a href="javascript:stockOut(${data[i].id});" class="action-icon">`;
            html += `         <i style="color:rgb(153, 173, 61);" class="ms-1 mdi mdi-login"></i>`;
            html += `       </a>`;
            html += `     </td>`;
            html += `    </tr>`;
        }
        html += `  </tbody>`;
        html += `</table>`;
        $("#divStocks").html(html);
        createProductOption(data);
    }

}

function createProductOption(data) {

    var html = `<option selected disabled value="0">Ürün Seç...</option>`;
    for (var i = 0; i < data.length; i++) {
        html += `<option value="${data[i].id}">${data[i].productName}</option>`;
    }
    $("#productOption").html(html);
}
function stockOut(id) {
    selectedStock = stocks.find(stocks => stocks.id === id);
    document.getElementById("productQuantity").value = selectedStock.quantity;
    $("#productImage").attr("src", `/assets/images/products/${selectedStock.productImage}`);
    $("#inputQuantity").attr("max", `${selectedStock.quantity}`);
    $("#stockModal").modal("show");
}


function productChange() {
    let sel = document.getElementById("productOption");
    let text = sel.options[sel.selectedIndex].text;
    selectedStockOpr = stocks.find(stocks => stocks.ProductName === text);
    alert(selectedStockOpr.stockId);
}

function stockOutAction() {

    let outQuantity = parseInt(document.getElementById("inputQuantity").value);
    var data = {
        Quantity: outQuantity,
        EmployeeId: parseInt(UID),
        StockId: selectedStock.id
    };
    Post2('https://localhost:7172/StockProcess/LogOutStock', data, (data) => {
        $("#stockModal").modal("hide");
        getAllStocks();
    });
}
function getAllStocks() {
    Post2('https://localhost:7172/StockProcess/GetallStockbyCompanyId', parseInt(CID), (data) => {
        stocks = data;
        createStockTable(stocks);
    });
}


function getAllCategory() {
    Get2('https://localhost:7172/Category/GetAllCategory', (data) => {
        var html = `<option selected value="0">Tüm Kategoriler</option>`;
        for (var i = 0; i < data.length; i++) {
            html += `<option value="${data[i].id}">${data[i].categoryName}</option>`;
        }
        $("#categoriyOption").html(html);
    });
}
function categoryChange() {

    let categoryId = parseInt(document.getElementById("categoriyOption").value);
    if (categoryId === 0) {
        createStockTable(stocks);
    }
    else {
        stocksFilter = stocks;
        let data = stocksFilter.filter(stocksFilter => stocksFilter.categoryId === categoryId);
        createStockTable(data);
    }
}


$(document).ready(function () {
    getAllCategory();
    getAllStocks();
});