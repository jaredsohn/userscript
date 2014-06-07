// ==UserScript==
// @name           Rakuten Item Support
// @author         Tonny
// @email   jwall149@gmail.com
// @namespace      Raku.Suppo
// @include        http://item.rakuten.co.jp/*
// @include		   http://www.rakuten.co.jp/*
// @version        0.1.2
// ==/UserScript==

/**********************
** Variable Settings **
**********************/
var aCss = "";
GM_addStyle(aCss);

var box_style = 'border:4px ridge #0099FF; background:#BFE6FF; color:#000; padding:16px; width:200px; height:70px; text-align:center; cursor:move; filter:alpha(opacity=95); opacity: 0.95;';
//////////////////////////////////////////////////////////////////////////

function dragStart(e) {
dragObj.elNode = e.target;
if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
dragObj.cursorStartX = e.clientX + window.scrollX;
dragObj.cursorStartY = e.clientY + window.scrollY;
dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
dragObj.elNode.style.zIndex = ++dragObj.zIndex;
document.addEventListener("mousemove", dragGo,   true);
document.addEventListener("mouseup",   dragStop, true);
e.preventDefault();
}

function dragGo(e) {
e.preventDefault();
var x = e.clientX + window.scrollX,
	y = e.clientY + window.scrollY;
dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
dragObj.elNode.style.top = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
}

function dragStop(e) {
document.removeEventListener("mousemove", dragGo,   true);
document.removeEventListener("mouseup",   dragStop, true);
}

function getElementsByTagAndClass(tagName,className){
    var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
    var allElements = document.getElementsByTagName(tagName);
    var results = [];
    var element;
    for (var i = 0; (element = allElements[i]) != null; i++) {
            var elementClass = element.className;
            if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
                    results.push(element);
    }

    return results;
}


function getFirstElementByTagAndClass(tagName,className){
    var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
    var allElements = document.getElementsByTagName(tagName);
    var result = null;
    var element;
    for (var i = 0; (element = allElements[i]) != null; i++) {
            var elementClass = element.className;
            if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass)) {			
						result = element;
						break;
					}
			
    }
    return result;
}


/******************** define functions ********************/
// HTML dom helper

var str = window.location.href;

if (str.indexOf('http://www.rakuten.co.jp/') == 0) {
// If is homepage
	var cur_name = getFirstElementByTagAndClass("p","name");
	if (cur_name == null) {
	  var cur_name = getFirstElementByTagAndClass("p","forlog");
	}
	
	var dragObj = new Object(), x, y;
	dragObj.zIndex = 0;
	var adiv = document.createElement('div');
	var content = price1title+"<span style='color:red'>"+price1+"</span>"+"<br/>"+delivery+"<br/>";	
	adiv.setAttribute('id', 'draggable_box');
	adiv.setAttribute('style', 'z-index:99; position:fixed; top:10px; left:'+(window.innerWidth-300)+'px; -moz-border-radius:6px; '+(box_style?box_style:''));
	adiv.addEventListener('mousedown', function(e){dragStart(e);}, false);
	adiv.innerHTML = cur_name.innerHTML;
	document.body.insertBefore(adiv, document.body.firstChild);

	
} else {
// Is item page

var price1obj = getElementsByTagAndClass("span","price1")[0];
var price1title = price1obj.innerHTML;
var price1 = getElementsByTagAndClass("span","price2")[0].innerHTML;
var delivery = getElementsByTagAndClass("span","tax_postage")[1].innerHTML;

//Create anchor
var priceAnchor = document.createElement('a');
priceAnchor.setAttribute('name', 'priceanchor');

var priceLink = document.createElement('a');
priceLink.setAttribute('href', window.location+'#priceanchor');

var priceLinkSpan = document.createElement('span');
priceLinkSpan.setAttribute("style","color:red");
priceLinkSpan.appendChild(document.createTextNode("\u6ce8文所へ"));

priceLink.appendChild(priceLinkSpan);

price1obj.appendChild(priceAnchor);
//alert(price0title+price0+price1title+price1+delivery);

//Create box
var dragObj = new Object(), x, y;
dragObj.zIndex = 0;
var adiv = document.createElement('div');
var content = price1title+"<span style='color:red'>"+price1+"</span>"+"<br/>"+delivery+"<br/>";
adiv.innerHTML = content;
adiv.setAttribute('id', 'draggable_box');
adiv.setAttribute('style', 'z-index:99; position:fixed; top:10px; left:'+(window.innerWidth-300)+'px; -moz-border-radius:6px; '+(box_style?box_style:''));
adiv.addEventListener('mousedown', function(e){dragStart(e);}, false);
adiv.appendChild(priceLink);
document.body.insertBefore(adiv, document.body.firstChild);

}

