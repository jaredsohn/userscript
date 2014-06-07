// ==UserScript==
// @name         Userscripts.org Edit Source Button on Script Source Page
// @namespace    usoEditSrcBtnOnScriptSrcPg
// @include      /https?:\/\/userscripts\.org\/scripts\/review\/\d+.*/i
// @include      http*://userscripts.org/scripts/review/*
// @match        http://userscripts.org/scripts/review/*
// @match        https://userscripts.org/scripts/review/*
// @datecreated  2010-03-07
// @lastupdated  2010-03-07
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript adds a 'Edit Source' button to a script's 'Source Code' tab if you are the admin for that script.
// ==/UserScript==

(function(d){
	var admin=d.evaluate("//ul[@id='script-nav']/li/a[contains(@class,'admin')]",d,null,9,null).singleNodeValue;
	if(!admin) return;

	var wwBtn = d.getElementById('wrap-button1');
	if(!wwBtn) return;

	var clickFunc = function(){
		window.location.href = /https?:\/\/userscripts\.org\/scripts\/review\/\d+/i.exec(window.location.href)[0].replace(/review/,"edit_src");
	};

	var newBtn = d.createElement('button');
	newBtn.innerHTML = "Edit Source";
	newBtn.addEventListener("click", clickFunc, false);
	newBtn.setAttribute('style','margin-top: 3px; margin-right: 20px;');

	var newBtn2 = newBtn.cloneNode(true);
	newBtn2.addEventListener("click", clickFunc, false);

	wwBtn.parentNode.insertBefore(newBtn,wwBtn);
	wwBtn.parentNode.insertBefore(newBtn2,d.getElementById('wrap-button2'));
})(document);
