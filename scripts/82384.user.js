(function() {

	// ==UserScript==
	// @name           FixFA
	// @creator        Draco18s
	// @namespace      FA-ControlPanel
	// @description    Moves the control planel to the left side ah la Oldstyle FA.
	// @include        http://www.furaffinity.net/*
	// ==/UserScript==
	
	
	function getElement( name ) {
		if( document.getElementById ) // this is the way the standards work
			elem = document.getElementById( name );
		else if( document.all ) // this is the way old msie versions work
		  elem = document.all[name];
		else if( document.layers ) // this is the way nn4 works
			elem = document.layers[name];
		return elem;
	}
	
	function replace_html(s) {
		var insides;
		insides = s.innerHTML;
		var insides = insides.replace(/<\/td>/g, "<br>");
		insides = insides.replace(/ [ ]+/g, "");
		insides = insides.replace(/<br>[\r\n]+<br>/g, "");
		insides = insides.replace(/Messagecenter - /g, "");
		insides = insides.replace(/<td?[^>]+(>|$)/g, "");
		insides = insides.replace(/<strong>Control panel menu<\/strong>/g, "<tr><td class=\"cat\" colspan=\"6\"><strong>Control panel menu</strong></td></tr>");
		insides = insides.replace(/[\r\n][\r\n]<a(.*)<\/a>/g,"<tr><td class=\"alt1\"><a$1<\/a>");
		insides = insides.replace(/<\/tr><br>/g,"</tr>");
		return insides;
	}
	
	function setup() {
		var elem = getElement('usercp-menu');
		elem.innerHTML = replace_html(elem);
		var vis = elem.style;
		vis.position = "absolute";
		vis.top = "187px";
		vis.left = "15px";
		vis.width = "170px";
		elem = getElement('admin_notice_do_not_adblock');
		vis = elem.style;
		vis.position = "relative";
		vis.marginLeft = "200px";
		vis.top = "10px";
		vis.width = Math.floor(window.innerWidth*.95 - 225) + "px";
		elem = getElement('messagecenter-other');
		if(elem != null) {
			vis = elem.style;
			vis.marginLeft = "160px";
		}
		elem = getElement('usercp-menu');
		do {
			elem = elem.nextSibling;
			if(elem.firstChild != null) {
				vis = elem.style;
				vis.marginLeft = "174px";
				vis.width = (window.innerWidth - 225) + "px";
			}
			/*if(elem.name == 'MsgForm') {
				vis = elem.style;
				vis.marginLeft = "174px";
				vis.width = (window.innerWidth - 225) + "px";
				vis.position = "relative";
				vis.top = "-36px";
			}
			if(elem.className == 'personal-messages') {
				vis = elem.style;
				vis.marginLeft = "174px";
				vis.width = (window.innerWidth - 225) + "px";
			}
			if(elem.className == 'viewmessage') {
				vis = elem.style;
				vis.marginLeft = "174px";
				vis.width = (window.innerWidth - 225) + "px";
				elem = elem.nextSibling;
				elem = elem.nextSibling;
				elem = elem.nextSibling;
				elem = elem.nextSibling;
				elem = elem.nextSibling;
				elem = elem.nextSibling;
				vis = elem.style;
				vis.marginLeft = "174px";
				vis.width = (window.innerWidth - 225) + "px";
			}*/
		} while(elem)
		
	}
	
	setup();
})();