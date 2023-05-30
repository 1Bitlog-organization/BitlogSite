var CrmLink = "http://94.19.185.98:1337/api/news-api/";

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
    xhr.DONE;
};

var total;

getJSON(CrmLink, function (err, data) {
    if (err !== null) {
    } else {
        // dc = document.getElementById("display");
        // dc.innerHTML =
        //     "total: " + data.meta.pagination.total;

        total = data.meta.pagination.total;
        for (let i = total; i >= 1; i--) {
            getJSON(CrmLink + i, function (err, data) {
                if (err !== null) {
                    alert("Something went wrong: " + err);
                } else {
                    if (data.data.attributes.DRAFT != true) {
                        var Stp = data.data.attributes.publishedAt;

                        var date =
                            Stp.slice(0, 4) +
                            "." +
                            Stp.slice(5, 7) +
                            "." +
                            Stp.slice(8, 10);
                        var time = Stp.slice(11, 13) + ":" + Stp.slice(14, 16);
                        var datetime = date + " " + time;

                        pastePoint = document.querySelector("div.display");

                        mainElement = document.createElement("div");
                        mainElement.classList.add(
                            "text-white",
                            "bg-dark",
                            "mb-3",
                            "crd"
                        );

                        dataElement = document.createElement("div");
                        dataElement.classList.add("element");
                        dataElement.innerHTML += `<div class="spacer" style="height: 1%;"></div>`;
                        dataElement.innerHTML +=
                            "<h4>" + data.data.attributes.Title + "</h4>";
                        dataElement.innerHTML +=
                            "<p>" + data.data.attributes.Text + "</p>";
                        if (data.data.attributes.Forms == true) {
                            dataElement.innerHTML +=
                                "<a>" +
                                data.data.attributes.publishedAt +
                                "</a>" +
                                `<a class="btn btn-default forms-bt" target="_blank" href="` +
                                data.data.attributes.FormUrl +
                                `">` +
                                "Go To Yandex Forms" +
                                "</a>";
                        } else if (
                            data.data.attributes.Forms == false ||
                            data.data.attributes.Forms == null
                        ) {
                            dataElement.innerHTML += "<a>" + datetime + "</a>";
                        }

                        dataElement.innerHTML += `<div class="spacer" style="height: 20px;"></div>`;
                        mainElement.insertBefore(dataElement, null);
                        pastePoint.insertBefore(mainElement, null);
                    }
                }
            });
        }
    }
});
