// ==UserScript==
// @name        booru-slideshow
// @namespace   http://userscripts.org/users/133663
// @description Automatically move to the next page in a pool or search after a set time
// @include     http://danbooru.donmai.us/posts/*?*
// @version     1.02
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_addStyle
// ==/UserScript==

var cslider = GM_getValue('slider', 0);
var timer;
if (!cslider) // Slideshow off
{
    var slidert = document.createElement('input');
    slidert.setAttribute('value', cslider);
    slidert.setAttribute('id', 'tau');
    slidert.setAttribute('style', 'position: relative !important; left: 0px !important; top: 0px !important');
    var sliders = document.createElement('span');
    sliders.innerHTML = ' Maximize and center';
    var sliderp = document.createElement('span');
    sliderp.innerHTML = ' Slideshow interval (ms): ';
    var sliderb = document.createElement('input');
    sliderb.setAttribute('type', 'button');
    sliderb.setAttribute('value', 'Begin slideshow');
    sliderb.addEventListener('click', onSliderButton, false);
    var sliderc = document.createElement('input');
    sliderc.setAttribute('type', 'checkbox');
    sliderc.addEventListener('click', onChecked, false);
    var nbsp = document.createElement('span');
    nbsp.innerHTML = '&nbsp;';
    var newdiv = document.createElement('li');
    newdiv.appendChild(document.createElement('br'));
    newdiv.appendChild(sliderb);
    newdiv.appendChild(sliderp);
    newdiv.appendChild(slidert);
    newdiv.appendChild(nbsp);
    newdiv.appendChild(sliderc);
    newdiv.appendChild(sliders);
    newdiv.appendChild(document.createElement('br'));
    var place = getElementsByAttribute(document, 'li', 'class', 'active');
    insertAfter(place[0].parentNode, newdiv, place);
}
else // Slideshow on
{
    timer = setInterval(function(){timedFunction()},cslider);
    var slidert = document.createElement('input');
    slidert.setAttribute('value', cslider);
    slidert.setAttribute('id', 'tau');
    slidert.setAttribute('style', 'position: relative !important; left: 0px !important; top: 0px !important');
    var sliders = document.createElement('span');
    sliders.innerHTML = ' Maximize and center';
    var sliderp = document.createElement('span');
    sliderp.innerHTML = ' Slideshow interval (ms): ';
    var sliderb = document.createElement('input');
    sliderb.setAttribute('type', 'button');
    sliderb.setAttribute('value', 'End slideshow');
    sliderb.addEventListener('click', offSliderButton, false);
    var sliderc = document.createElement('input');
    sliderc.setAttribute('type', 'checkbox');
    sliderc.addEventListener('click', onChecked, false);
    var nbsp = document.createElement('span');
    nbsp.innerHTML = '&nbsp;';
    var newdiv = document.createElement('li');
    newdiv.appendChild(document.createElement('br'));
    newdiv.appendChild(sliderb);
    newdiv.appendChild(sliderp);
    newdiv.appendChild(slidert);
    newdiv.appendChild(nbsp);
    newdiv.appendChild(sliderc);
    newdiv.appendChild(sliders);
    newdiv.appendChild(document.createElement('br'));
    var place = getElementsByAttribute(document, 'li', 'class', 'active');
    insertAfter(place[0].parentNode, newdiv, place);
    window.addEventListener('keydown', keyPressed, true);
    var cmax = GM_getValue('max', false);
    if (cmax)
    {
        sliderc.setAttribute('checked', true);
        maximizeAndCenter();
    }
}

function keyPressed (e)
{
    if (e.keyCode == '27') { // Pressed ESC
        offSliderButton();
    }
}

function maximizeAndCenter ()
{
    GM_addStyle('img#image {            \
       display: block !important;       \
       position: absolute !important;   \
       left: 0px;                       \
       top: 0px;                        \
       margin-left: auto !important;    \
       margin-right: auto !important;   \
       width: 100% !important;          \
       height: auto !important;         \
    }                                   \
    div#nav-links {                     \
       display: block !important;       \
       position: absolute !important;   \
       bottom: 0px !important;          \
       margin-left: audio !important;   \
       width: 75% !important;           \
    };');
}

function onChecked ()
{
    var czh = getElementsByAttribute(document, 'input', 'type', 'checkbox');
    GM_setValue('max', czh[0].checked);
}

function onSliderButton ()
{
    var tau = getElementsByAttribute(document, 'input', 'id', 'tau');
    GM_setValue('slider', tau[0].value);
    timer = setInterval(function(){timedFunction()}, tau[0].value);
    var sliderb = getElementsByAttribute(document, 'input', 'value', 'Begin slideshow');
    sliderb[0].addEventListener('click', offSliderButton, false);
    sliderb[0].setAttribute('value', 'End slideshow');
}

function offSliderButton ()
{
    GM_deleteValue('slider');
    var sliderb = getElementsByAttribute(document, 'input', 'value', 'End slideshow');
    sliderb[0].addEventListener('click', onSliderButton, false);
    sliderb[0].setAttribute('value', 'Begin slideshow');
    window.clearInterval(timer);
}

function timedFunction ()
{
    window.clearInterval(timer);
    var tekeli = getElementsByAttribute(document, 'a', 'class', 'next');
    var nurl = tekeli[0].getAttribute('href');
    window.location.href = 'http://danbooru.donmai.us' + nurl;
}

// Generic code from my other scripts
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
    }}} return arrReturnElements;
}
function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}