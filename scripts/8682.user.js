// ==UserScript==
// @name            GMail Real Estate (Minimize Header, Nav or Ads)
// @author          Martin Ruiz
// @namespace       Martin Ruiz
// @description     Can switch display of the header, navigation bar and ads by clicking the triangle icon on top,left or right respectively.
// @include         http://mail.google.com/mail/*
// @include         https://mail.google.com/mail/*
// ==/UserScript==
// Version          2.0.1 fixes for gmail update
//                  2.0 updated for New GMail
// Credits          Code borrowed from http://userscripts.org/scripts/show/8507 by margin

var gmail;
var Document;
var Window;	

function init(id, onresize, register) 
{
	function toggleDisplay() 
	{
    		var hide = !GM_getValue(id);
    		GM_setValue(id, hide);
    		switchButton.className = hide ? "closed" : "opened";
    		setTimeout(onresize, 0);
  	}

  	var switchButton = Document.createElement("div");
  	switchButton.id = id + "SwitchButton";
  	switchButton.addEventListener("click", toggleDisplay, false);
    	Document.body.appendChild(switchButton);

  	GM_setValue(id, !GM_getValue(id));
	if (register) gmail.registerViewChangeCallback(function() { setTimeout(onresize, 1000); })
  	toggleDisplay();
}

var onResize = function(){};

window.addEventListener("load", function() {
  	for (var k in unsafeWindow) 
	{
    		var f = unsafeWindow[k];
    		if (typeof f == "function" && typeof f.resizeId == "number") 
		{
      			onResize = function(){ f(f.resizeId); };
      			break;
    		}
  	}
	if (unsafeWindow.gmonkey) {
		unsafeWindow.gmonkey.load('1.0', initialize);
	}
	}, false);

function initialize(g) {
gmail = g;
Document = gmail.getNavPaneElement().ownerDocument;
Window = Document.defaultView;	

//gmail.registerViewChangeCallback(function(x) { alert('cb: '+x); });

addStyle();

init("head", function() {//alert('head');
	var hide = GM_getValue("head");
	gmail.getMastheadElement().style.display = hide ? "none" : "";
	onResize();
});

init("nav", function() {//alert('nav');
	var hide = GM_getValue("nav");

	var d = hide ? "none" : "";
	d = (d==gmail.getNavPaneElement().style.display);


	if (!d) {
		var w = gmail.getNavPaneElement().nextSibling.style.width;
		w = w.replace('px','');
		var ww = hide ? (w-0+149) : (w-149);
		//alert(w+' -> '+ww);
		w = ww;
		gmail.getNavPaneElement().nextSibling.style.width = w+'px';
	}

	gmail.getNavPaneElement().style.display = hide ? "none" : "";

	onResize();
});

init("rh", function() {//alert('rhs');
	if (gmail.getActiveViewType()!='cv') return;
	var hide = GM_getValue("rh");
	var rh = gmail.getConvRhsElement();
	if (!rh) return;
	rh.parentNode.style.display = hide ? "none" : "block";
	rh.parentNode.parentNode.firstChild.style.width = "1%";//hide ? "0px" : "225px";
	onResize();
}, true);

function addStyle() {
// Styles for Switch Button
//GM_addStyle(<><![CDATA[
gm_addStyle(<><![CDATA[
  #navSwitchButton, #headSwitchButton, #rhSwitchButton {
    position: absolute;
    width: 0;
    height: 0;
    border: 12px none transparent;
    -moz-border-radius:  2px;
    cursor: pointer;
    -moz-opacity: 0.3;
  }
  #navSwitchButton:hover, #headSwitchButton:hover, #rhSwitchButton:hover {
    -moz-opacity: 0.6;
  }
  #navSwitchButton {
    top: 49%;
    left: 0;
    border-style: solid none;
  }
  #navSwitchButton.closed {
    border-left-style: solid;
    -moz-border-left-colors: transparent blue;
  }
  #navSwitchButton.opened {
    border-right-style: solid;
    -moz-border-right-colors: transparent blue;
  }
  #headSwitchButton {
    top: 0;
    left: 49%;
    border-style: none solid;
  }
  #headSwitchButton.closed {
    border-top-style: solid;
    -moz-border-top-colors: transparent blue;
  }
  #headSwitchButton.opened {
    border-bottom-style: solid;
    -moz-border-bottom-colors: transparent blue;
  }
  #rhSwitchButton {
    top: 49%;
    left: 98%;
    border-style: solid none;
  }
  #rhSwitchButton.closed {
    border-right-style: solid;
    -moz-border-right-colors: transparent blue;
  }
  #rhSwitchButton.opened {
    border-left-style: solid;
    -moz-border-left-colors: transparent blue;
  }
]]></>);
}

function gm_addStyle(s) {
	var e = Document.createElement('style');
	e.innerHTML = s;
	Document.getElementsByTagName('head')[0].appendChild(e);
//	Document.body.appendChild(e);
}

}