// ==UserScript==
// @name           Nuvision Hack
// @author         Tony Stark
// @version        0.1a
// @description    Removes watermark from nuvsion photos, enlarges thumbnails in gallery, re-enables rightclick.
// @include        http://*nuvisionactionimage.com/storefront/index.php?do=photocart&viewGallery*
// @match  http://*nuvisionactionimage.com/storefront/index.php?do=photocart&viewGallery*
// ==/UserScript==

/* Global */

function newimagepage(i,f,pic_id){
    // run original function
    ip(i,f,pic_id);
    // change the img src to one without a watermark
    document.getElementById("testImage").src = document.getElementById("testImage").src.replace("|d|","|a|");
    // delete the blank .gif overlaying the image
    document.getElementsByClassName("imgCrop_stageArea")[0].parentNode.removeChild(document.getElementsByClassName("imgCrop_stageArea")[0]);
}

function newthumbpage(i,f){
    // run original function
    tp(i,f);
    var list=document.getElementsByClassName("thumbnail")
    for (var i = 0; i < list.length; i++) {
        var imagenumber=list[i].parentNode.href.substring(list[i].parentNode.href.indexOf("image=")+6,list[i].parentNode.href.length);
        var d = new Date();
        var mds = d.getFullYear() + ('0' + (d.getMonth()+1)).slice(-2) + ('0' + d.getDate()).slice(-2) + ('0' + d.getHours()).slice(-2) + ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2);
        if (imagenumber>1000) {
        list[i].src="image.php?image="+imagenumber+"|a|||||||||"+mds;
        if (list[i].width==100) {
            list[i].height=300;
            list[i].width=450;
        };
        if (list[i].height==100) {
            list[i].height=450;
            list[i].width=300;
        };
        };
    };
    var list2=document.getElementsByClassName("thumbContainer")
    for (var i2 = 0; i2 < list2.length; i2++) {
        list2[i2].style.width="";
        list2[i2].style.height="";
    };
};
// var tp=unsafeWindow.thumbsloaded;
// unsafeWindow.thumbsloaded=newthumbpage;

// embed script in html to avoid use of unsafewindow (greasemonkey)
var script = document.createElement('script');
script.appendChild(document.createTextNode(newimagepage+newthumbpage+"var tp=thumbsloaded; thumbsloaded=newthumbpage; document.oncontextmenu=new Function(\"return true\"); var ip=loaded; loaded=newimagepage;"));
(document.body || document.head || document.documentElement).appendChild(script);


// enable right click functionality
document.oncontextmenu=new Function("return true");