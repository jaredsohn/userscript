// ==UserScript==
// @name           Popodeus: Popmundo Login Server Select
// @namespace      http://popodeus.com
// @description    Lets you select the server you want to login to in Popmundo.com and shows mini statistics.
// @match          http://*.popmundo.com/*
// @include        http://www*.popmundo.com/common/index.html
// @include        http://www*.popmundo.com/*/entry.asp
// @include        http://www*.popmundo.com/*/Entry.asp
// @include        http://www*.popmundo.com/*/entry.asp?*
// @include        http://www*.popmundo.com/*/Entry.asp?*
// @include        http://www*.popmundo.com/*/Credits.asp
// @author         Seppo Vuolteenaho, aka Photodeus, aka Popodeus
// @copyright	   Popodeus.com, 2010. All rights reserved. No right to alter or redistribute.
// @version        7
// ==/UserScript==
var version = 7;

if (location.href.match(/common\/(Entry|Credits)\.asp/i)) {
		
	function X(xpath) {
		var elem = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (elem && elem.snapshotLength >= 1)
			return elem.snapshotItem(0);
		else return null;
	}
	function elem(name, attrs, style, text) {
		var e = document.createElement(name);
		var key;
		if (attrs) for (key in attrs) e.setAttribute(key, attrs[key]);
		if (style) for (key in style) e.style[key] = style[key];
		if (text) e.appendChild(document.createTextNode(text));
		return e;
		}
	function imgsrc(server,when) {
		return 'http://popodeus.com/scripts/server-select/img/v'+version+'/'+server+'-'+when;
	}
	function getimg(when) {
		return elem('img',{src:imgsrc(document.domain.match(/www(\d+)/)[1],when),width:1,height:1});
	}
	
	function runIt() {
		if (location.href.indexOf('Credits.asp') > 0) {
			document.body.appendChild(getimg('out'));
			return;
		}
		var langsel = X('//select[@name="LanguageID"]');
		if (langsel) {
			var frm = X('//form[@name="GameLogin"]');
				var num = frm.getAttribute('action').match(/www(\d+)/)[1];
			frm.target = '_top';
		
			var tr = elem('tr');
			var td = elem('td', null, null, 'Select server:');
		
			tr.appendChild(td);
			
			var tblhead = langsel.parentNode.parentNode.parentNode;
			
			tblhead.appendChild(tr);
		
			tr = elem('tr');
			td = elem('td', {colspan:2},{verticalAlign:'bottom'});
			var sel = elem('select');
			var i, x;
			var wasselected = false;
			for (i = 120; i <= 126; i++) {
				x = {};
				if (i == num) {
					x.selected = 'selected';
					wasselected = true;
				}
				sel.appendChild(elem('option', x, null, i));
			}
			if (!wasselected) sel.appendChild(elem('option', {selected:'selected'}, null, num));
			td.appendChild(sel);
			var a = elem('a',{href:'http://userscripts.org/scripts/show/42299',target:'_blank'});
			a.appendChild(elem('img',{align:'absbottom',alt:'Server Select by Popodeus.com',id:'x-stats',src:imgsrc(num,'initial')}));
			td.appendChild(a);
			tr.appendChild(td);
			tblhead.appendChild(tr);
		
			sel.addEventListener('change', function() {
					frm.setAttribute('action', frm.getAttribute('action').replace(/www\d+/, 'www' + sel.value));
				document.getElementById('x-stats').src = imgsrc(sel.value,'change');
			}, false);
			frm.addEventListener('submit', function() {
					document.body.appendChild(getimg('go'));
			}, false);
		}
	}
	
	runIt();
}