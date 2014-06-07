// ==UserScript==
// @name           DupFindr - Flickr Organizr Duplicates Finder
// @namespace      tobias.schoessler.dupfindr
// @description    a script that finds duplicates in your Flickr Organizr selection.
// @include        http://www.flickr.com/photos/organize/
// ==/UserScript==
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    }
    else { 
        $ = unsafeWindow.jQuery; letsJQuery();
    }
}
GM_wait();
window.test=function(){
    alert("OK!");
};
// All your GM code must be inside this function

window.pool=[];

function Filer(photo_id) {
    this.photo_id=photo_id;
    this.flickr_photos_getInfo_onLoad=function(k,xml,p){
        var title = xml.getElementsByTagName("title")[0].textContent
        GM_log(this.photo_id+":"+title);
        if (window.pool[title]) {
            GM_log("   is a duplicate.");
        //dups.push(photo_id);
        } else{
            window.pool[title] = photo_id;
            unsafeWindow._ge('tabl_mat_batch').mat_remove_photo(photo_id);
        }
    };
};

function hash(image)
{
    if (image.title=="") return;
    unsafeWindow.F.API.callMethod("flickr.photos.getInfo",{
        photo_id:image.title
    }, new Filer(image.title));

}

function findDups(){
    GM_log("finding duplicates ...");
    window.pool=[];
    $('div[class="batch_photo_img_div"] img').each(function() {
            hash(this);
    });
    GM_log("finding duplicates done.");
}

function placeBtn() {
    var btn = document.createElement('button');
    btn.addEventListener('click', findDups, false);
    btn.innerHTML = 'FIND DUPS';
    document.getElementsByClassName("gray_menu_buttons")[1].appendChild(btn);
}


/* $("#gray_batch_button_bar ul[class=gray_menu_buttons]").append(
            '<li id="candy_button_o_print" class="no_menu_li">'+
            '<span class="button">'+
            '<span class="left padded">'+
            "<a onclick=\"window.findDups()\">FIND DUPS</a>"+
            '</li>'
            );*/

function letsJQuery() {
    placeBtn();
}