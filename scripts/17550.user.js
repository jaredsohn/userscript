// ==UserScript==
// @name            Gmail Hide Ads
// @author          Ricardo Ferreira
// @namespace       m4n_in_bl4ck
// @description     Can switch display of  ads by clicking the triangle on right.
// @include         http://mail.google.com/mail/*
// @include         https://mail.google.com/mail/*
// ==/UserScript==
// Version          1.1
// Credits          Code borrowed from http://userscripts.org/scripts/show/8682 by ruiz

var gmail;
var Document;
var Window;	

function init(id, onresize) 
{
	function toggleDisplay() 
	{
    		var hide = !GM_getValue(id);
    		GM_setValue(id, hide);
    		switchButton.className = hide ? "closed" : "opened";
    		setTimeout(onresize, 0);
  	}

  	var switchButton = document.createElement("div");
  	switchButton.id = id + "SwitchButton";
  	switchButton.addEventListener("click", toggleDisplay, false);
    	document.body.appendChild(switchButton);

  	GM_setValue(id, !GM_getValue(id));
	gmail.registerViewChangeCallback(onresize)
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

init("rh", function() {
	var hide = GM_getValue("rh");
	var rh = gmail.getConvRhsElement();
	if (!rh) return;
	rh.parentNode.style.display = hide ? "none" : "block";
	rh.parentNode.parentNode.firstChild.style.width = "1%";//hide ? "0px" : "225px";
	onResize();
});

// Styles for Switch Button
GM_addStyle(<><![CDATA[
  #rhSwitchButton {
    position: absolute;
    width: 0;
    height: 0;
    border: 12px none transparent;
    -moz-border-radius:  2px;
    cursor: pointer;
    -moz-opacity: 0.3;
  }
  #rhSwitchButton:hover {
    -moz-opacity: 0.6;
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