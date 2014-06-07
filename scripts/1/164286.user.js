// ==UserScript==
// @name        imgRotate
// @namespace   faleij
// @description Provides 2 rotation options to the right click menu for images.
// @include     *
// @version     2
// @updateURL  	http://userscripts.org/scripts/source/164286.meta.js
// ==/UserScript==
var menu = document.createElement("menu");
menu.type = "context";
menu.id = "faleijs_imagerotate_contextmenu";

var submenu = document.createElement("menu");
submenu.label = "Rotate";
menu.appendChild(submenu);

var menu_item_1 = document.createElement("menuitem");
menu_item_1.label = "Rotate 90° CCW";
submenu.appendChild(menu_item_1);

var menu_item_2 = document.createElement("menuitem");
menu_item_2.label = "Rotate 90° CW";
submenu.appendChild(menu_item_2);

var menu_item_3 = document.createElement("menuitem");
menu_item_3.label = "Rotate 180°";
submenu.appendChild(menu_item_3);

var menu_item_4 = document.createElement("menuitem");
menu_item_4.label = "Reset Rotation";
submenu.appendChild(menu_item_4);

document.body.appendChild(menu);

var context;

document.body.addEventListener("contextmenu",function(e){
    context = e.target;
    var rot = context.style.MozTransform.toString().match(/(\-?[\d.]+)deg/g);
    if(rot){
        rot = (parseFloat(rot[0])%360);
    }else{
        rot = 0;
    }
    submenu.label = "Rotate ("+rot+"°)";
});
var regex = /(\-?[\d.]+)deg/g;
menu_item_1.addEventListener("click",function(e){
    if(context.style.MozTransform){
        var rot = context.style.MozTransform.toString().match(regex);
        if(rot.length===1){
            context.style.MozTransform = "rotate("+(parseFloat(rot[0])-90)%360+"deg)";
        }else{
            context.style.MozTransform = "rotate(-90deg)";
        }
    }else
        context.style.MozTransform = "rotate(-90deg)";
});

menu_item_2.addEventListener("click",function(e){
    if(context.style.MozTransform){
        var rot = context.style.MozTransform.toString().match(regex);
        if(rot.length===1){
            context.style.MozTransform = "rotate("+(parseFloat(rot[0])+90)%360+"deg)";
        }else{
            context.style.MozTransform = "rotate(90deg)";
        }
    }else
        context.style.MozTransform = "rotate(90deg)";
});

menu_item_3.addEventListener("click",function(e){
    if(context.style.MozTransform){
        var rot = context.style.MozTransform.toString().match(regex);
        if(rot.length===1){
            context.style.MozTransform = "rotate("+(parseFloat(rot[0])+180)%360+"deg)";
        }else{
            context.style.MozTransform = "rotate(180deg)";
        }
    }else
        context.style.MozTransform = "rotate(180deg)";
});

menu_item_4.addEventListener("click",function(e){
    context.style.MozTransform = "rotate(0deg)";
});

function addHandler(collection) {
    for (var i = 0; i < collection.length; i++) collection[i].setAttribute("contextmenu", menu.id);
}

document.body.addEventListener("DOMNodeInserted", function (e) {
    addHandler(e.target.querySelectorAll("img"));
});

addHandler(document.querySelectorAll("img"));