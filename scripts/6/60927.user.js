// ==UserScript==
// @name			Add Google Analytics Account Name To Page Title
// @namespace		gaAcctInTitle
// @include			https://www.google.com/analytics/*
// @match			https://www.google.com/analytics/*
// @datecreated		2009-10-30
// @lastupdated		2009-10-30
// @version			0.1
// @author			Erik Vergobbi Vold
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript will add the Google Analytics account name to the page title and remove "Google Analytics" from the page title.
// ==/UserScript==
(function(){
	var s=document.getElementById('subheader');
	if(!s) return;
	var c=0,o="Google Analytics";
	var r=o;
	var e = function(){
		var a_ = document.evaluate("//span[@id='AccountDropdown']/*/select[contains(@class,'gwt-ListBox')]", document, null, 9, null).singleNodeValue;
		if (!a_) 
			a_ = document.getElementById("account");
		if (!a_) 
			return;

		if(!c) s.addEventListener("DOMNodeInserted",e,false);
		a_.addEventListener("change",e,false);
		c++;

		var a = a_.options[a_.selectedIndex].innerHTML.replace(/^\s+/i, "").replace(/\s+$/i, "");

		if (r == o) {
			var i = 0, t = document.title.split(" - ");
			for (; i < t.length; i++) 
				if (t[i].match(/Google Analytics/i)) 
					break;
			if (i < t.length) 
				t.splice(i, 1);
			if (!a.match(/\w/i) || a.match(/Create New Account\.\.\./i) || a.match(/Select an account/i)) return;
			else {
				t.push(a);
				t = t.join(" - ");
				document.title = t;
				r=a;
			}
		}
		else if(r!=a){
			if (!a.match(/\w/i) || a.match(/Create New Account\.\.\./i) || a.match(/Select an account/i)) {
				document.title = document.title.replace("- " + r, "");
				r = o;
			}
			else {
				document.title = document.title.replace("- " + r, "- " + a);
				r=a
			}
			
		}
	}
	e();
})();