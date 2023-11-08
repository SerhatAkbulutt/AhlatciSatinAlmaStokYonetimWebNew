document.addEventListener('DOMContentLoaded', function () {
    var theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.getElementById('light-style').disabled = true;
        document.getElementById('dark-style').disabled = false;
        document.getElementById('lightMode').checked = false;
    } else {
        document.getElementById('light-style').disabled = false;
        document.getElementById('dark-style').disabled = true;
        document.getElementById('lightMode').checked = true;
    }
});
function lightModeTogle() {

    if (document.getElementById("dark-style").disabled) {
        document.getElementById("dark-style").disabled = false;
        document.getElementById("light-style").disabled = true;
        localStorage.setItem('theme', 'light');
    } else {
        document.getElementById("light-style").disabled = false;
        document.getElementById("dark-style").disabled = true;
        localStorage.setItem('theme', 'dark');
    }
}
$(document).ready(function () {

    $("#datapicker1").datepicker({ dateFormat: 'yy-mm-dd' });
    "use strict";
    $("#customDatatable").DataTable({
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: "_TOTAL_ kayıttan _START_ - _END_ arası kayıt gösteriliyor.",
            search: "Arama:",
            infoEmpty: "Gösterilecek hiç kayıt yok.",
            loadingRecords: "Kayıtlar yükleniyor.",
            infoFiltered: "(Toplam _MAX_ kayıttan filtrelenenler)",
            zeroRecords: "Tablo boş",
            lengthMenu: 'Göster <select class=\'form-select form-select-sm ms-1 me-1\'><option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="-1">Tümü</option></select>'
        },
        pageLength: 5,
        select: {
            style: "multi"
        },
        order: [
            [1, "asc"]
        ],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded"), $("#customDatatable_length label").addClass("form-label")
        }
    })
    $("#categoryDatatable").DataTable({
        language: {
            paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
            },
            info: "_TOTAL_ kayıttan _START_ - _END_ arası kayıt gösteriliyor.",
            search: "Arama:",
            infoEmpty: "Gösterilecek hiç kayıt yok.",
            loadingRecords: "Kayıtlar yükleniyor.",
            infoFiltered: "(Toplam _MAX_ kayıttan filtrelenenler)",
            zeroRecords: "Tablo boş",
            lengthMenu: 'Göster <select class=\'form-select form-select-sm ms-1 me-1\'><option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="-1">Tümü</option></select> Ürün'
        },
        pageLength: 5,
        select: {
            style: "multi"
        },
        order: [
            [1, "asc"]
        ],
        drawCallback: function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded"), $("#categoryDatatable_length label").addClass("form-label")
        }
    })
});