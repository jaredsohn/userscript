// Gmail Fixed Navigation
// version 0.9.7 BETA!
// 2007/09/13
// Copyright (c) 2007, Hiroyuki Nakamura <hiroyuki@maloninc.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Gmail Fixed Navigation
// @namespace      http://www.maloninc.com/greasemonkey/
// @description    To fix gmail navigation menu
// @include        http*://mail.google.*/*mail/*
// @include        http*://mail.google.com/a/*
// ==/UserScript==

function fixMenu() {
	var cont = document.getElementById('co');
	var menu = document.getElementById('nav');
	if (cont != null && menu !=null){
		cont.style.marginLeft = "20ex";
		menu.style.overflowX = "hidden";
		menu.style.overflowY = "auto";
		menu.style.position = "fixed";
		menu.style.height   = document.body.clientHeight - 84;
		menu.style.width = "20ex"; 
		menu.style.zIndex = 1; 
	}else{
		//setTimeout(fixMenu, 5000);
	}
}

function fixCompose(){
	var comp = document.getElementById('cm_compose');
	var foot = document.getElementById('ft');
	if (comp != null && foot != null){
		comp.style.paddingLeft = "31px";
		foot.parentNode.style.paddingLeft = "21ex";
	}else{
		//setTimeout(fixCompose, 5000);
	}
}

function fixLogo() {
	var ds = document.getElementById('ds_inbox');
	if (ds !=null){
		ds.style.position = "fixed";
		ds.style.paddingTop = 0; 
	}else{
		//setTimeout(fixLogo, 5000);
	}
}

function fixArrow() {
	var arrow = document.getElementById('ar');
	var foot  = document.getElementById('ft');
	if (arrow != null && foot != null) {
		arrow.style.left = "200px";
		arrow.style.top = (parseInt(arrow.style.top) - 13) + "px";
		foot.parentNode.style.paddingLeft = "20ex";
	} else {
		//setTimeout(fixArrow, 5000);
	}
}

function fixList() {
	var tct    = document.getElementById('tct');
	var tbd    = document.getElementById('tbd');
	var foot   = document.getElementById('ft');
	var cont   = document.getElementById('co');
	if (tct != null && tbd != null && foot != null && cont != null) {
		foot.parentNode.style.display = "none";
		tbd.style.height    = (document.body.clientHeight - 65) - (tct.offsetHeight*2);
		tbd.style.overflowX = "auto";
		tbd.style.overflowY = "auto";
		makeFootSwitch(tct.offsetWidth / 2);
	} else {
		//setTimeout(fixList, 5000);
	}
}

function fixMailBody() {
	var banner = document.getElementById('fb');
	var head   = document.getElementById('bk');
	var body   = document.getElementById('fi');
	var foot   = document.getElementById('ft');
	if (head != null && body != null && foot != null) {
		foot.parentNode.style.display = "none";
		body.parentNode.parentNode.parentNode.parentNode.style.height    = (document.body.clientHeight - 90) - 
                                                                           (head.parentNode.parentNode.parentNode.offsetHeight*2) -
                                                                           banner.parentNode.offsetHeight;
		body.parentNode.parentNode.parentNode.parentNode.style.overflowX = "auto";
		body.parentNode.parentNode.parentNode.parentNode.style.overflowY = "auto";
		makeFootSwitch(head.parentNode.parentNode.parentNode.offsetWidth/2);
	} else {
		//setTimeout(fixMailBody, 5000);
	}
}

function makeFootSwitch( marginLeft ) {
	var div  = document.createElement('div')
	var btn  = document.createElement('div');
	var cont = document.getElementById('co');
	btn.className = "opened";
	btn.id = "footSwitchButton";
	div.style.cursor     = "pointer";
	div.style.marginLeft = marginLeft;
	div.addEventListener('click', function(){
		var foot  = document.getElementById('ft');
		if (foot != null) {
			if(foot.parentNode.style.display == 'none'){
				btn.className = "closed";
				foot.parentNode.style.display = 'block';
				scrollTo(0,document.body.clientHeight);
			}else{
				btn.className = "opened";
				foot.parentNode.style.display = 'none';
			}
		}
	}, false);
	div.appendChild(btn)
	cont.appendChild(div);
}

fixLogo();
fixMenu();
fixCompose();
fixArrow();
fixList();
fixMailBody();

GM_addStyle(<><![CDATA[
   #footSwitchButton {
     width: 0;
     height: 0;
     border: 12px none transparent;
     -moz-border-radius:  2px;
     cursor: pointer;
     -moz-opacity: 0.3;
   }
   #footSwitchButton:hover {
     -moz-opacity: 0.6;
   }
   #footSwitchButton {
     border-style: none solid;
   }
   #footSwitchButton.closed {
     border-top-style: solid;
     -moz-border-top-colors: transparent blue;
   }
   #footSwitchButton.opened {
     border-bottom-style: solid;
     -moz-border-bottom-colors: transparent blue;
   }
]]></>);

