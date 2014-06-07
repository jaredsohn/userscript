// ==UserScript==
// @name          Image Catalog
// @namespace     http://nedbatchelder.com/
// @description   Shows a catalog of the images on a page.
// @include       http://*
// @include       https://*
// @include       file://*
// ==/UserScript==

GM_registerMenuCommand("Show image catalog", show_image_catalog);

function show_image_catalog() {
    var img_display = document.createElement("div");
    ihtml = "<div style='margin: 10px auto 0 auto; border-top: 2px dotted black; background-color: white;'>";

    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        img = imgs[i];
        ihtml += "<div style='margin: 5px 10px'>";
        ihtml += "<img src='" + img.src + "'/>";
        ihtml += "<br/>";
        ihtml += "src = <a href='" + img.src + "'>" + img.src + "</a>";
        ihtml += "<br/>";
        ihtml += "width = " + img.width + ", height = " + img.height;
        if (img.width != img.naturalWidth || img.height != img.naturalHeight) {
            ihtml += ", <span style='color:red; font-weight: bold'>";
            ihtml += "naturalWidth = " + img.naturalWidth;
            ihtml += ", naturalHeight = " + img.naturalHeight;
            ihtml += "</span>";
        }
        ihtml += "</div>";
    }
    ihtml += "</div>";
    img_display.innerHTML = ihtml;
    document.body.insertBefore(img_display, null);
}
