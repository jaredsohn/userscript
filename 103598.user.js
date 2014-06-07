// ==UserScript==
// @name           Facebook Foto Shrinker
// @namespace      facebook.com
// @description    Shrinks FB fotos
// @include        http*://www.facebook.com/photo.php*
// ==/UserScript==

// v1.3 //attempt
var image;
var origheight;
var origwidth;
var autoshrink = GM_getValue("autoshrink",true);
var autoexpand = GM_getValue("autoexpand",false);
var maxheight = GM_getValue("maxheight",0); //set dynamically? (image position, browserwindow size...)

GM_registerMenuCommand("***Facebook Image Shrinker options***",function(){});
GM_registerMenuCommand("Switch auto-shrinking on/off",function(){swapAutoShrink();});
GM_registerMenuCommand("Switch auto-expanding on/off",function(){swapAutoExpand();});
GM_registerMenuCommand("Adjust imagesize",function(){shrinkImage();});
GM_registerMenuCommand("Restore orignal imagesize",function(){restoreImageSize();});
GM_registerMenuCommand("Set new height",function(){setHeight();});


document.body.addEventListener("DOMSubtreeModified",checkLocation,true);
doIt();


function checkLocation(){
    if(location.href.indexOf("photo.php")!=-1){
        doIt();
    }
}

function checkCorrectHeight(){
    if(maxheight<1||isNaN(maxheight)){
        setHeight();
    }
}

function doIt(){
    image = document.getElementById("myphoto");
    origheight = image.height;
    origwidth = image.width;
    checkCorrectHeight();
    if(autoshrink){
        if(origheight>maxheight){
            shrinkImage();
        }
    }
    if(autoexpand){
        if(origheight<maxheight){
            shrinkImage(); // misleading function name, but works.
        }
    }
}

function shrinkImage(){
    var ratio = origheight / maxheight;
    image.height = origheight / ratio;
    image.width = origwidth / ratio;
}

function restoreImageSize(){
    image.height = origheight;
    image.width = origwidth;
}

function setHeight(){
    GM_setValue("maxheight",prompt("\n\nPlease enter a new Value for the max height of a picture shown.\n(If unsure, click OK and then adjust it later.)",450));
    location.reload();
}

function swapAutoShrink(){
    if(GM_getValue("autoshrink",true)){
        GM_setValue("autoshrink",false);
        restoreImageSize();
        alert("Automatic shrinking is now OFF");
    }else{
        GM_setValue("autoshrink",true);
        shrinkImage();
        alert("Automatic shrinking is now ON");
    }
    location.reload();
}

function swapAutoExpand(){
    if(GM_getValue("autoexpand",false)){
        GM_setValue("autoexpand",false);
        restoreImageSize();
        alert("Automatic expanding is now OFF");
    }else{
        GM_setValue("autoexpand",true);
        shrinkImage();
        alert("Automatic expanding is now ON");
    }
    location.reload();
}
