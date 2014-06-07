// ==UserScript==
// @name        adjustColor
// @namespace   by syakku
// @description	convert colors to eye-friendly
// @version     1.6
// ==/UserScript==

//	http://userscripts.org/scripts/show/240312

var _SKIP = true;						//	OPTION : skip <a> tag (link anchor)
var _IGNORE_THEME = false;	//	OPTION : skip os theme check (<INPUT>, <TEXTAREA>...)
var _BG_IMAGE_LEVEL = 5;		//	OPTION : search bg-image level (-1 = disable)

//	OPTION : "white" & "black" color
//var _r = 237, _g = 228, _b = 205;	//	《練色》
//var _r = 237, _g = 233, _b = 216;	//	《素色》
var _r = 234, _g = 229, _b = 227; //	《素色2》
var _r2 = 23, _g2 = 25, _b2 = 23; //	《墨》
//var _r2 = 43, _g2 = 43, _b2 = 43;	//	《黒》
//var _r2 = 22, _g2 = 22, _b2 = 14;	//	《暗黒色》

//	OPTION : os theme color
var _SYS_BUTTON = "rgb(227, 227, 227)";
var _SYS_TEXT = "rgb(255, 255, 255)";
var _SYS_SELECT = "rgb(255, 255, 255)";
var _SYS_PROGRESS = "rgb(230, 230, 230)";

//	preparations
var _rm = (_r - _r2) / 255,
    _gm = (_g - _g2) / 255,
    _bm = (_b - _b2) / 255;

if (GM_getValue("_FIRSTRUN") !== false){checkSysColor();}	//	check system color
else {
	//	os theme color
	_SYS_BUTTON = GM_getValue("_SYS_BUTTON");
	_SYS_TEXT = GM_getValue("_SYS_TEXT");
	_SYS_SELECT = GM_getValue("_SYS_SELECT");
	_SYS_PROGRESS = GM_getValue("_SYS_PROGRESS");

}

//	load main function

//	"DOMContentLoaded" specification
var _head = document.getElementsByTagName("HEAD")[0];
var _domFlag;
if (typeof _head !== "undefined"){
	_domFlag = _head.getElementsByTagName("SCRIPT")[0];
	if (typeof _domFlag === "undefined"){
		_domFlag = _head.getElementsByTagName("STYLE")[0];
	}
}

if (typeof _domFlag === "undefined"){

	var _tLArray = document.getElementsByTagName("link")[0];
	if (typeof _tLArray !== "undefined"){
		
		if (_IGNORE_THEME === false){
			window.addEventListener("load", main, false);
		}else{
			window.addEventListener("load", aMain, false);
		}
		
	document.addEventListener('DOMNodeInserted',addNode, false);

	}else {doMain();}
	
}else{doMain();}

function addNode(_evt){
	if (_evt.target.tagName === "SCRIPT"){
		if (_evt.target.parentNode.tagName === "HEAD"){
			doMain();
		}
	}
}
	
function doMain() {

	if (_IGNORE_THEME === false){main();}
	else {aMain();}
		
}
	
//	main
function main() {
	
	document.removeEventListener('DOMNodeInserted',addNode);
				
	var _fgColor = [];
    var _elm = document.getElementsByTagName("*");
	var _elm_length = _elm.length;

    for (var i = 0; i < _elm_length; i++) {

        var _style = document.defaultView.getComputedStyle(_elm[i], null);

        _fgColor[i] = _style.getPropertyValue("color");	//	prevent inheritance

		var _bgColor = _style.getPropertyValue("background-color");
		
        if (_bgColor !== "transparent") {
		
			var _tElm = _elm[i];
			//	prevent os theme
            if (_tElm.style.borderStyle === "") {

                switch (_tElm.tagName) {

                case "INPUT":

                    switch (_tElm.getAttribute("type")) {

                    case "reset":
                    case "button":
                    case "submit":

                        if (_bgColor === _SYS_BUTTON) {continue;}
                        break;

                    default:

                        if (_bgColor === _SYS_TEXT) {continue;}
                    }

                    break;

                case "TEXTAREA":

                    if (_bgColor === _SYS_TEXT) {continue;}
                    break;

                case "SELECT":

                    if (_bgColor === _SYS_SELECT) {continue;}
                    break;

                case "BUTTON":

                    if (_bgColor === _SYS_BUTTON) {continue;}
                    break;

                case "PROGRESS":

                    if (_bgColor === _SYS_PROGRESS) {continue;}
                    break;
                }
            }

            _tElm.style.backgroundColor = convColor(_bgColor);

        }
    }

	
    for (var i = 0; i < _elm_length; i++) {
	
			var _tElm = _elm[i];
			var _tFgColor = _fgColor[i];
			
	        if (_tFgColor !== "transparent") {
				//	skip anchor option
				if (_SKIP === true) {
					if (_tElm.tagName === "A") {continue;}
				}
				
            _tElm.style.color = convColor(_tFgColor);

        }
    }

	if (_BG_IMAGE_LEVEL > -1){
		bgImageConv();
	}

}



//	another main
function aMain() {

	document.removeEventListener('DOMNodeInserted',addNode);

	var _fgColor = [];
    var _elm = document.getElementsByTagName("*");
	var _elm_length = _elm.length;

    for (var i = 0; i < _elm_length; i++) {

		var _tElm = _elm[i];
        var _style = document.defaultView.getComputedStyle(_tElm, null);

        _fgColor[i] = _style.getPropertyValue("color");	//	prevent inheritance

		var _bgColor = _style.getPropertyValue("background-color");

        if (_bgColor != "transparent") {

            _tElm.style.backgroundColor = convColor(_bgColor);

        }
    }

	
    for (var i = 0; i < _elm_length; i++) {
	
			var _tElm = _elm[i];
			var _tFgColor = fgColor[i];
			
	        if (_tFgColor !== "transparent") {
				//	skip anchor option
				if (_SKIP === true) {
					if (_tElm.tagName === "A") {continue;}
				}

            _tElm.style.color = convColor(_tFgColor);

        }
    }

	if (_BG_IMAGE_LEVEL !== -1){
		bgImageConv();
	}

}


//	reduce color
function convColor(_bg) {

	_bg = _bg.substring(4, _bg.length - 1);
	
	var _col = _bg.split(", ");

    //	rgb * (_rgb - _rgb2) / 255 + _rgb2
    var _colR = Math.floor(_col[0] * _rm + _r2);
    var _colG = Math.floor(_col[1] * _gm + _g2);
    var _colB = Math.floor(_col[2] * _bm + _b2);
	
    if (typeof _col[3] === "undefined") {

        return ("rgb(" + _colR + ", " + _colG + ", " + _colB + ")");

    }
    return ("rgb(" + _colR + ", " + _colG + ", " + _colB + ", " + _col[3] + ")"); //	rgba
}


//	use first run
function checkSysColor() {

    var _button = document.createElement("BUTTON"),
        _text = document.createElement("INPUT"),
        _select = document.createElement("SELECT"),
        _progress = document.createElement("PROGRESS");

    _SYS_BUTTON = document.defaultView.getComputedStyle(_button, null).getPropertyValue("background-color");
    _SYS_TEXT = document.defaultView.getComputedStyle(_text, null).getPropertyValue("background-color");
    _SYS_SELECT = document.defaultView.getComputedStyle(_select, null).getPropertyValue("background-color");
    _SYS_PROGRESS = document.defaultView.getComputedStyle(_progress, null).getPropertyValue("background-color");
	
	GM_setValue("_SYS_BUTTON", _SYS_BUTTON);
	GM_setValue("_SYS_TEXT", _SYS_TEXT);
	GM_setValue("_SYS_SELECT", _SYS_SELECT);
	GM_setValue("_SYS_PROGRESS", _SYS_PROGRESS);
	GM_setValue("_FIRSTRUN", false);

}

function bgImageConv(){

	var _aa = 2 - _r / 127.5;
	var _rr = 128;
	var _gg =  Math.floor(127.5 - (_r - _g) / _aa);
	var _bb =  Math.floor(127.5 - (_r - _b) / _aa);
	var _rgba = "rgba(" + _rr+ ", " + _gg + ", " + _bb + ", " + _aa + ")";
	var _alpha = "linear-gradient(" + _rgba + ',' + _rgba + "),";
	childConv(document.lastChild, _BG_IMAGE_LEVEL);
	
	function childConv(_node, _num){
	
		var _bg = document.defaultView.getComputedStyle(_node, null).getPropertyValue("background-image");
		if (_bg !== "none"){
			_node.style.backgroundImage = _alpha + _bg;
		}
		_num--;
		
		if (_num > -1){
			
			var _child = _node.children;
			for (var i = 0; i < _child.length; i++){
				childConv(_child[i], _num);
			}
			
		}
	}
}