let invoices = [];
let selectedInvoice;
let InvoiceProducts = [];
function createTable(data) {
    if (data.length > 0) {
        html = ``;
        html += `<table class="table table-sm table-centered" id="customDatatable">`;
        html += `  <thead class="table-light">`;
        html += `    <tr>`;
        html += `      <th>Sıra</th>`;
        html += `      <th>Fatura No</th>`;
        html += `      <th>Fatura Tarihi</th>`;
        html += `      <th>Tedarikçi Firma</th>`;
        html += `      <th>Çıktı Al</th>`;
        html += `    </tr>`;
        html += `  </thead>`;
        html += `  <tbody>`;
        for (var i = 0; i < data.length; i++) {
            html += `    <tr>`;
            html += `      <td>${i + 1}</td>`;
            html += `      <td>${data[i].billNumber}</td>`;
            html += `      <td>${formatTarih(data[i].billDate)}</td>`;
            html += `      <td>${data[i].companyName}</td>`;
            html += `     <td>`;
            html += `       <a href="javascript:printView(${data[i].id});" class="action-icon">`;
            html += `         <i style="color:rgb(0, 173, 161);" class="ms-1 mdi mdi-printer"></i>`;
            html += `       </a>`;
            html += `     </td>`;
            html += `    </tr>`;
        }
        html += `  </tbody>`;
        html += `</table>`;
        $("#divInvoices").html(html);
    }
}

function createTable(data) {
    if (data.length > 0) {
        html = ``;
        html += `<table class="table table-sm table-centered border" id="customDatatable">`;
        html += `  <thead class="table-light">`;
        html += `    <tr>`;
        html += `      <th>Sıra</th>`;
        html += `      <th>Fatura No</th>`;
        html += `      <th>Fatura Tarihi</th>`;
        html += `      <th>Tedarikçi Firma</th>`;
        html += `      <th>Çıktı Al</th>`;
        html += `    </tr>`;
        html += `  </thead>`;
        html += `  <tbody>`;
        for (var i = 0; i < data.length; i++) {
            html += `    <tr>`;
            html += `      <td>${i + 1}</td>`;
            html += `      <td>${data[i].billNumber}</td>`;
            html += `      <td>${formatTarih(data[i].billDate)}</td>`;
            html += `      <td>${data[i].companyName}</td>`;
            html += `     <td>`;
            html += `       <a href="javascript:printView(${data[i].id});" class="action-icon">`;
            html += `         <i style="color:rgb(0, 173, 161);" class="ms-1 mdi mdi-printer"></i>`;
            html += `       </a>`;
            html += `     </td>`;
            html += `    </tr>`;
        }
        html += `  </tbody>`;
        html += `</table>`;
        $("#divInvoices").html(html);
    }
}
function PrintPage() {
    var printContents = document.getElementById("printPage").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

function createDetailTable(data) {
    if (data.length > 0) {
        html = ``;
        html += `<table class="table table-sm table-centered" id="customDatatable">`;
        html += `  <thead class="table-light">`;
        html += `    <tr>`;
        html += `      <th>#</th>`;
        html += `      <th>Ürün</th>`;
        html += `      <th>Miktar</th>`;
        html += `      <th>Birim Fiyatı</th>`;
        html += `    </tr>`;
        html += `  </thead>`;
        html += `  <tbody>`;
        for (var i = 0; i < data.length; i++) {
            html += `    <tr>`;
            html += `      <td>${i + 1}</td>`;
            html += `      <td>${data[i].productName}</td>`;
            html += `      <td>${data[i].productQuantity}</td>`;
            html += `      <td>${data[i].unitPrice}</td>`;
            html += `    </tr>`;
        }
        html += `  </tbody>`;
        html += `</table>`;

        document.getElementById("productTotalAmount").innerHTML = selectedInvoice.productAmount + getIcon();
        document.getElementById("kdv").innerHTML = selectedInvoice.totalKDV + getIcon();
        document.getElementById("discount").innerHTML = selectedInvoice.discount + getIcon();
        document.getElementById("totalAmount").innerHTML = selectedInvoice.billTotalPrice + getIcon();
        document.getElementById("invoiceDate").innerHTML = selectedInvoice.billDate;
        document.getElementById("invoiceNo").innerHTML = selectedInvoice.billNumber;
        $("#divInvoiceDetail").html(html);
    }
}

function getIcon() {
    let icon = "₺";
    switch (selectedInvoice.currency) {
        case "Dolar": icon = "$"; break;
        case "Euro": icon = "€"; break;
        case "Sterlin": icon = "£"; break;
        default: icon = "₺"; break;
    }
    return icon;
}
function printView(id) {

    selectedInvoice = invoices.find(invoices => invoices.id === id);
    Post2('https://localhost:7172/Bill/GetBillDetailbyBillId', id, (data) => {
        InvoiceProducts = data;
        createDetailTable(InvoiceProducts);
        $("#invoicePrintModal").modal("show");
    });
}
function getAllInvoices() {
    let companyId = parseInt(CID);
    Post2('https://localhost:7172/Bill/GetallBillbyCompanyId', companyId, (data) => {
        invoices = data;
        createTable(invoices);
    });
}
$("#searchInvoice").on("keyup", function () {
    const find = $(this).val().toLowerCase();
    const result = invoices.filter(invoice => invoice.billNumber.toLowerCase().includes(find));
    createTable(result);
});
$(document).ready(function () {
    getAllInvoices();
});