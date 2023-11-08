function getNotification() {

    var data = {
        CompanyID: parseInt(CID),
        DepartmentID: parseInt(DID)
    };
    Post2('https://localhost:7172/Request/GetAllNotifications', data, (data) => {
        let count = data;
        if (count > 0) {
            let htmlcount = `${count}`;
            document.getElementById("requestCount").style.display = "inline-block";
            $("#requestCount").html(htmlcount);
        }
        else {
            document.getElementById("requestCount").style.display = "none";
            $("#requestCount").html("");
        }
    });
}

$(document).ready(function () {
    getNotification();
});