// ==UserScript==
// @name            3 Pane Google Reader
// @description     Add 3rd pane with a frame containing the actual blog item
// @include         http://reader.google.com/reader/*
// @include         http://www.google.com/reader/*
// @version         0.1
//
// Based on Itai Lahan's Google Reader Preview v0.1
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// version 0.1
// 2007-30-08
//
// version 0.2
// 2007-30-08
//
// version 0.2.1
// 2007-06-09
//     ktkr!!!!
//     Oh! Google added graetful function !!!
//     Searching feeds for keyword!!
//     Thanks Google.
//
// version 0.2.2
// 2007-08-09
//     bug fix
//
// CHANGELOG:
// v0.1 - test release
// v0.2
//   - pane becomes resizable 
//   - add user script command "change pane style"
// v0.2.1
//   - apply google's changings
// v0.2.2
//   - bug fix
//
// ==/UserScript==
(function(){
const GR3P_NODE_ID_PANE      = "pane3";
const GR3P_NODE_ID_VIEW      = "view_frame";
const GR3P_PANE_OBJECTS      = new Array ();

const GR_NODE_ID_MAIN        = "main";
const GR_NODE_ID_NAV         = "nav";
const GR_NODE_ID_CHROME      = "chrome";
const GR_NODE_ID_ETR_UP      = "entries-up";
const GR_NODE_ID_ETR_DOWN    = "entries-down"
const GR_NODE_ID_REFRESH     = "viewer-refresh"
const GR_HIDE_LIST           = new Array ("all-subscriptions-header" , "selectors-box" , "add-box");

const GR_MAIN_STYLE_MTOP     = "20px";
const GR_NAV_STYLE_MTOP      = "0px";
const GR_CHROME_STYLE_PTOP   = "0px";

const DEFAULT_PANE_HEIGHT    = "300px";
const DEFAULT_PANE_WIDTH     = "100%";
const DEFAULT_PANE_FLOAT     = "left";
const DEFAULT_PANE_HTML      = '<IFRAME id="' + GR3P_NODE_ID_VIEW + '" src="" height="100%" width="100%"></IFrame>';

const VISIBLE_NONE           = "none";
const VISIBLE_BLOCK          = "block";
const VISIBLE_INLINE         = "inline";

const PANE_TYPE_DEFAULT      = "default";
const PANE_TYPE_THREE        = "3pane";
var currentType = PANE_TYPE_THREE;

const DAMMY_LAYER_COLOR      = "#FFF";
const DAMMY_LAYER_OPACITY    =  0.1;
const DAMMY_LAYER_HEIGHT     = "100%";
const DAMMY_LAYER_WIDTH      = "100%";
const DAMMY_LAYER_POSITION   = "absolute";
const DAMMY_LAYER_ZINDEX     =  100;

const RESIZER_HEIGHT         = "5px";
const RESIZER_COLOR_OUT      = "#EEF";
const RESIZER_COLOR_OVER     = "#DDE";
const RESIZER_CURSOR_STYLE   = "n-resize";
const RESIZER_MARGIN_TOP     = "5px";

const COMMAND_CHANGE_TYPE    = "change pane type";

function init(){
    document.getElementsByClassName = getElementsByClassName;
    
    var main                = getNode(GR_NODE_ID_MAIN);
    var nav                 = getNode(GR_NODE_ID_NAV);
    var chrome              = getNode(GR_NODE_ID_CHROME);

    main.style.marginTop    = GR_MAIN_STYLE_MTOP;
    nav.style.marginTop     = GR_NAV_STYLE_MTOP;
    chrome.style.paddingTop = GR_CHROME_STYLE_PTOP;
    

    for(var i = 0 ; i < GR_HIDE_LIST.length ; i++){
        setVisibleById(GR_HIDE_LIST[i] , VISIBLE_NONE);
    }
    
    var t1 = removeElementById(GR_NODE_ID_ETR_UP);
    var t2 = removeElementById(GR_NODE_ID_ETR_DOWN);

    var to = getNode(GR_NODE_ID_REFRESH);
    to.parentNode.insertBefore(t2 , to.nextSibling);
    to.parentNode.insertBefore(t1 , to.nextSibling);

    GR3P_PANE_OBJECTS.push(init3rdPane());
    GR3P_PANE_OBJECTS.push(initResizer());
}

function init3rdPane(){
	var main = getNode(GR_NODE_ID_MAIN);
	if(main == undefined)return undefined;

	var div = document.createElement("DIV");
	div.id           = GR3P_NODE_ID_PANE;
	div.style.height = DEFAULT_PANE_HEIGHT;
	div.style.width  = DEFAULT_PANE_WIDTH;
	div.innerHTML    = DEFAULT_PANE_HTML;
	div.style.float  = DEFAULT_PANE_FLOAT;
    
	main.insertBefore(div , getNode(GR_NODE_ID_NAV));
	return div;
}

function initResizer(){
	var elem = get3rdPane();
	if(elem == undefined)return undefined;
	
	var isDrag = false;
	var __y;
    var __h;
	function onMouseDown(e) {
	   __y = e.pageY;
       __h = get3rdPane().offsetHeight;
       setVisibleElement(layer , VISIBLE_BLOCK);

       isDrag = true;
	   return false;
	};
    
    function onMouseOver(){
        div.style.backgroundColor = RESIZER_COLOR_OVER;
    }
    
    function onMouseOut(){
        div.style.backgroundColor = RESIZER_COLOR_OUT;
    }
    
	function onMouseMove(e) {
	   if (!isDrag) {
          return true;
       }
       
       var _y = e.pageY;
       var _d = _y - __y;
	   get3rdPane().style.height = (__h + _d) + "px";
       return false;
    }
    function onMouseUp(e) {
       setVisibleElement(layer , VISIBLE_NONE);
       fit2Window();
       isDrag = false;
    }

    var div = document.createElement("DIV");
    div.style.marginTop       = RESIZER_MARGIN_TOP;
    div.style.height          = RESIZER_HEIGHT;
    div.style.cursor          = RESIZER_CURSOR_STYLE;
    div.style.backgroundColor = RESIZER_COLOR_OUT;
    
    div.addEventListener("mousedown",onMouseDown , false);
    div.addEventListener("mouseover",onMouseOver , false);
    div.addEventListener("mouseout" ,onMouseOut , false);
    
    var layer = document.createElement("DIV");
    layer.style.height           = DAMMY_LAYER_HEIGHT;
    layer.style.width            = DAMMY_LAYER_WIDTH;
    layer.style.position         = DAMMY_LAYER_POSITION;
    layer.style.backgroundColor  = DAMMY_LAYER_COLOR;
    layer.style.zIndex           = DAMMY_LAYER_ZINDEX;
    layer.style.MozOpacity       = DAMMY_LAYER_OPACITY;
    setVisibleElement(layer , VISIBLE_NONE);
    
    document.addEventListener("mousemove",onMouseMove,false);
    document.addEventListener("mouseup"  ,onMouseUp  ,false);

    elem.parentNode.insertBefore(div   ,elem.nextSibling);
    elem.parentNode.insertBefore(layer ,elem);
    
    return div;
}

function get3rdPane(){
	return getNode(GR3P_NODE_ID_PANE);
}

function getViewFrame(){
    return getNode(GR3P_NODE_ID_VIEW);
}

function getNode(id){
    return document.getElementById(id);
}

function removeElementById(id){
    var elem = getNode(id);
    elem.parentNode.removeChild(elem);
    return elem;
}

function setVisibleById(id,visible){
    setVisibleElement(getNode(id) , visible);
}

function setVisibleElement(elem , visible){
    elem.style.display = visible;
}

function fit2Window(){
//    unsafeWindow.ob();    
    unsafeWindow.nb();    
}

function changePaneStyle(){
    if(currentType == PANE_TYPE_DEFAULT){
        for(var i = 0 ; i < GR_HIDE_LIST.length ; i++){
            setVisibleById(GR_HIDE_LIST[i] , VISIBLE_NONE );
        }
        
        for(var i = 0 ; i < GR3P_PANE_OBJECTS.length ; i++){
            setVisibleElement(GR3P_PANE_OBJECTS[i],VISIBLE_BLOCK);
        }
        currentType = PANE_TYPE_THREE;
    }else{
        for(var i = 0 ; i < GR_HIDE_LIST.length ; i++){
            setVisibleById(GR_HIDE_LIST[i] , VISIBLE_BLOCK);
        }
        for(var i = 0 ; i < GR3P_PANE_OBJECTS.length ; i++){
            setVisibleElement(GR3P_PANE_OBJECTS[i],VISIBLE_NONE);
        }
        currentType = PANE_TYPE_DEFAULT;
    }
    fit2Window();
}



function getElementsByClassName (className, parentNode) {
  var elements = [];
  var parent = parentNode;
  if (parentNode == undefined) {
	  parent = document.body;
  }
  if (parent.getElementsByTagName == undefined) {
	  return elements;
  }
  var children = parent.getElementsByTagName('*');
  for (var i = 0; i < children.length; i ++) {
	var child = children[i];
    if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) {
      elements[elements.length] = child;
	}
  }
  return elements;
}

function decorate_new_elements(e) {
    if(currentType == PANE_TYPE_DEFAULT)return;
    
	var element = e.target;
	if (element.className != "entry-container") {
		if ( element.className == "entry-actions"){
			setVisibleElement(element,VISIBLE_NONE);
		}
		return;
	}
	setVisibleElement(element,VISIBLE_NONE);

	var elements = document.getElementsByClassName("entry-title", element);
	if ((elements == undefined) || (elements.length == 0)) {
		return;
	}
	var entry_title = elements[0];
	var href_array = /\"(http:\/\/[^\"]*)\"/.exec(entry_title.innerHTML);
	if (href_array == undefined || href_array.length == 0) {
		return;
	}
	var href = href_array[1];

	elements = document.getElementsByClassName("entry-body", element);
	if (elements != undefined && (elements.length > 0)) {
		getViewFrame().src = href;
	}
}

document.body.addEventListener('DOMNodeInserted', decorate_new_elements, false);

GM_registerMenuCommand(COMMAND_CHANGE_TYPE , changePaneStyle);

init();

})();