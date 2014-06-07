// ==UserScript==
// @name          Enhanced Viewer for Wretch Album
// @namespace     http://www.wretch.cc/blog/sunday777
// @description   Dynamically show large pictures when viewing Wretch Album.
// @include       http://www.wretch.cc/album/album.php*
// ==/UserScript==
// Author: Andro Lee
// email: andro.lee (at) gmail.com
// History:
// V2.31 2008 Dec 18
//      Show "Downaloding..." text in big pic if it is still downloading.
// V2.3 2008 Dec 18
//      Solved problem that can't show snapshot of video items.
// V2.2 2008 Dec 17
//      Again fine tune position calculation of floating window.
// V2.1 2008 Dec 16
//      Fine tune position calculation of floating window.
// V2.0 2008 Dec 15
//     Use a floating window to show enlarged picture.
// V1.0 2008 Dec 12

//var mode;
//GM_registerMenuCommand("View Wretch Album with floating window", function (event) {GM_setValue("mode", "floating");});
//GM_registerMenuCommand("View Wretch Album in slide mode", function (event){GM_setValue("mode", "slide");});
//GM_registerMenuCommand("View Wretch Album with floating window", function (event) {mode = 1;window.location.reload();});
//GM_registerMenuCommand("View Wretch Album in slide mode", function (event){mode = 2;window.location.reload();});



//show_mode = GM_getValue("mode");
//alert(mode);

//if (show_mode == "floating")
//{
    var border_px = 5;
    var offset_px = 60;
    var pic_stat;

    // create a image element
    pic = document.createElement("img");
    pic.border = border_px;
    pic.alt = "Downloading...";
    pic.style.position = "fixed";
    pic.style.zIndex = 1;
    pic.style.display = "none";

    pic.addEventListener("mouseout", function (event) {
        this.style.display = "none";
        pic_stat = "onbig";
    }, false);

    pic.addEventListener("click", function (event) {
        this.style.display = "none";
        pic_stat = "onbig";
    }, false);

    // put the img as first node in HTML body.
    body_node = document.getElementsByTagName("body")[0];
    body_node.insertBefore(pic, body_node.firstChild);

    // loop all images in an album
    album = document.getElementById("ad_square");
    img_all = album.getElementsByTagName("img");
    for (var i = 0; i < img_all.length; i++) {

        img_node = img_all[i];

        isrc = img_node.src;

        idx = isrc.indexOf("thumbs/t");

        if (idx != -1) {

            // load original picture
            img_hidden = document.createElement("img");
            img_hidden.src = isrc.slice(0, idx) + isrc.substr(idx+8);
            img_hidden.style.display = "none";
            img_node.appendChild(img_hidden);

            //img_node.src = isrc.slice(0, idx) + isrc.substr(idx+8);

            // create mimic thunbnails
            //if (img_node.width > img_node.height)
              //  img_node.width = 90;
            //else
              //  img_node.height = 90;

            img_node.addEventListener("mouseover", function (event)
            {
                if (pic.src == this.firstChild.src && pic_stat == "onbig")
                {
                    pic_stat = "in";
                    return;
                }
                pic.src = this.firstChild.src;

                big_width = pic.width + border_px*2;

                if (event.clientX >= big_width + offset_px)
                    pic.style.left = event.clientX - big_width - offset_px;
                else if(window.innerWidth - event.clientX >= big_width + offset_px)
                    pic.style.left = event.clientX + offset_px;
                else if (event.clientX > window.innerWidth / 2)
                    pic.style.left = 0;
                else
                    pic.style.left = window.innerWidth - big_width;

                big_height = pic.height + border_px*2;
                if (event.clientY >= big_height + offset_px)
                    pic.style.top = event.clientY - big_height - offset_px;
                else if(window.innerHeight - event.clientY >= big_height + offset_px)
                    pic.style.top = event.clientY + offset_px;
                else if (event.clientY > window.innerHeight / 2)
                    pic.style.top = 0;
                else
                    pic.style.top = window.innerHeight - big_height;

                pic.style.display = "block";

                if (event.clientX < pic.offsetLeft ||
                    event.clientX > pic.offsetLeft + pic.width + border_px*2 ||
                    event.clientY < pic.offsetTop ||
                    event.clientY > pic.offsetTop + pic.height + border_px*2)
                    pic_stat = "out";
                else
                    pic_stat = "in";

            }, false);

            img_node.addEventListener("mousemove", function (event)
            {
                big_width = pic.width + border_px*2;

                if (event.clientX >= big_width + offset_px)
                    pic.style.left = event.clientX - big_width - offset_px;
                else if(window.innerWidth - event.clientX >= big_width + offset_px)
                    pic.style.left = event.clientX + offset_px;

                big_height = pic.height + border_px*2;

                if (event.clientY >= big_height + offset_px)
                    pic.style.top = event.clientY - big_height - offset_px;
                else if(window.innerHeight - event.clientY >= big_height + offset_px)
                    pic.style.top = event.clientY + offset_px;

                if (pic_stat == "out")
                    pic.style.display = "block";

            }, false);

            img_node.addEventListener("mouseout", function (event) {
                if (pic_stat == "out")
                    pic.style.display = "none";
            }, false);
        }
    }
//}
//Else
/*
{

    // create new band-style album
    new_album = document.createElement("table");

    album_table = document.getElementById("ad_square");

    album_rows = album_table.getElementsByTagName("tr");

    for (var i = 0; i < album_rows.length; i+=2) {

        thumbs = album_rows[i].getElementsByTagName("td");
        titles = album_rows[i+1].getElementsByTagName("td");

        for (var j = 0; j < titles.length; j++) {
            tr_new = document.createElement("tr");

            td_new = thumbs[j].cloneNode(true);
            td_new.removeAttribute("class");
            td_new.removeAttribute("width");
            td_new.removeAttribute("height");
            tr_new.appendChild(td_new);

            td_new = titles[j].cloneNode(true);
            td_new.setAttribute("valign", "middle");
            td_new.setAttribute("aligh", "left");
            tr_new.appendChild(td_new);

            new_album.appendChild(tr_new);
        }
    }

    album_table.parentNode.setAttribute("align", "left");
    tr_node = album_table.parentNode.parentNode;
    album_table.parentNode.replaceChild(new_album, album_table);

    td_new = document.createElement("td");
    big_img = document.createElement("img");
    big_img.style.position = "fixed";
    big_img.style.right = 20;
    big_img.style.top = 20;
    big_img.addEventListener("click", function (event) {big_img.style.display = "none";}, false);
    td_new.appendChild(big_img);
    tr_node.appendChild(td_new);

    img_all = new_album.getElementsByTagName("img");

    for (var i = 0; i < img_all.length; i++) {

        var isrc, idx;

        img_node = img_all[i];
        isrc = img_node.src;
        idx = isrc.indexOf("thumbs/t");

        if (idx != -1) {
            img_node.src = isrc.slice(0, idx) + isrc.substr(idx+8);

            if (img_node.width > img_node.height)
                img_node.width = 120;
            else
                img_node.height = 120;

            img_node.addEventListener("mouseover", function (event) {
                big_img.src = this.src;
                big_img.style.display = "block";
            }, false);
        }
    }

    big_img.src = img_node.src;
}
*/
