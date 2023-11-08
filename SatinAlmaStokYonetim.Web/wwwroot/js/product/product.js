
let products = [];
let selectedId = 0;
let selectedProduct;


function createProductTable(data) {
    html = ` <div class="table-responsive">`;
    html += `<table class="table table-sm table-bordered" id="productTable">`;
    html += ` <thead>`;
    html += `<tr>`;
    html += `<th class="text-center">Sıra</th>`;
    html += `<th>Kategori</th>`;
    html += `<th class="text-center">Ürün Resmi</th>`;
    html += `<th>Ürün Adı</th>`;
    html += `<th class="text-center">İşlemler</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    for (var i = 0; i < data.length; i++) {
        html += `<tr>`;
        html += `<td class="text-center">#${i + 1}</td >`;
        html += `<td>${data[i].categoryId}</td >`;
        html += `<td class="text-center"><img src="/assets/images/products/${data[i].productImage}" alt="product-img" title="product-img" class="rounded me-2" height="32"></td>`
        html += `<td>${data[i].productName}</td >`;
        html += `     <td class="text-center">`;
        html += `       <a href="javascript:editView(${data[i].id});" class="action-icon">`;
        html += `         <i style="color:rgb(223, 173, 61);" class="ms-1 mdi mdi-lead-pencil"></i>`;
        html += `       </a>`;
        html += `     </td>`;
        html += `</tr>`;
    }
    html += ` </tbody>`;
    html += ` </table>`;
    html += ` </div>`;
    $("#divProducts").html(html);
}

function editView(id) {
    selectedId = id;
    if (selectedId > 0) {
        selectedProduct = products.find(products => products.id === selectedId);
        if (selectedProduct !== undefined) {
            document.getElementById("inputProductName").value = selectedProduct.productName;
            document.getElementById("modalCategoryOption").selectedIndex = `${selectedProduct.categoryId}`;
            $("#productModal").modal("show");
        }
    }
}

function newProduct() {
    selectedProduct = null;
    selectedId = 0;
    $("#productModal").modal("show");
}

function saveProduct() {

    var data = {
        Id: selectedId,
        UnitId: selecteUnitdId,
        ProductName: document.getElementById("inputProductName").value,
        CategoryId: parseInt(document.getElementById("modalCategoriOption").value),
        ProductImage: "",
    };

    Post2("https://localhost:7172/Product/GetAllProduct", data, (data) => {
        $("#productModal").modal("hide");
    });

}
function getAllProducts() {

    Get2("https://localhost:7172/Product/GetAllProduct", (data) => {

        if (data.length > 0) {
            products = data;
            createProductTable(data);
        }
    });
}

function changeCategori() {

}

function modalCategoryOptionChange() {

}

function getAllCategories() {

    Get2("https://localhost:7172/Category/GetAllCategory", (data) => {
        let categories = data;
        var html = `<option selected disabled value="0">Kategori Seç...</option>`;
        for (var i = 0; i < categories.length; i++) {
            html += `<option value="${categories[i].id}">${categories[i].categoryName}</option>`;
        }
        $("#categoryOption").html(html);
        $("#modalCategoryOption").html(html);
        getAllProducts();
    });
}
$(document).ready(function () {

    getAllCategories();
});