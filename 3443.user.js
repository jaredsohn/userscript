// ==UserScript==
// @name           Logotypes.ru Preview Images
// @namespace      http://www.jonasjohn.de/
// @description    Shows the logo image below the logo name, so you don't have to click on the preview link for each logo
// @include        http://www.logotypes.ru/list_*
// @version	   0.2
// ==/UserScript==

/*
Sorry, i use here a strange way to load the images. 
This is because the image src is different for each
row, so i had to load the preview page into an iframe 
and grab the image url from it.
*/

function add_preview_images() {

    var table = document.getElementsByTagName("table")[4];
    var rows = table.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
    
        var row = rows[i];
        var data = row.getElementsByTagName("td");

        var preview_url = data[3].childNodes[0].href;
            preview_url = preview_url.replace(/javascript:Preview\('([0-9]+)'\)/i, '$1');
            preview_url = "/preview_e.asp?id=" + preview_url;

        var lid = "pl" + i;
        
        var img = '<br/>';
            img += '<span style="color:#8A8D9D;font-size:90%;"><img id="'+lid+'i" alt="preview image is loading..." /></span>';
            img += '<iframe style="display:none" src="'+preview_url+'" id="'+lid+'" name="'+lid+'" border=0 width=1 height=1 ';
            img += 'onload="void(document.getElementById(this.id+\'i\').src=frames[this.id].document.body.getElementsByTagName(\'img\')[1].src)"></iframe>';
        
        // append image + iframe to the table row
        data[0].childNodes[0].innerHTML += img;
    }
       
}

add_preview_images();
// end user script



