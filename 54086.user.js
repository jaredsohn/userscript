// ==UserScript==
// @name           addons.mozilla.org Language Redirect
// @namespace      f4d82972-6ebf-43b5-912e-8aad9b3fddb2
// @author         tomchen1989
// @description    Redirect addons.mozilla.org pages to your language.
// @include        https://addons.mozilla.org/*/firefox/*
// @version        1.0.0
// ==/UserScript==


//Save the 'Other languages' options at the bottom of any pages on addons.mozilla.org. After it, when you open a page of any language version on addons.mozilla.org, it will be forced to redirect to your language version. [Greasemonkey Only]
//记录addons.mozilla.org的页面底部的'其他语言'选项设置。打开addons.mozilla.org的所有页面的任何语言版本时，将会强行跳转到你所设定语言的页面。[仅用于Greasemonkey]
//Sauvegarder l'option de 'Autres langues' en bas de toutes les pages sur addons.mozilla.org. Après, quand vous ouvrez une page d'une version linguistique sur addons.mozilla.org, il redirigera forcement vers la version de votre langue. [Greasemonkey Seulement]


(function() {
try {


function $(id) { return document.getElementById(id); }

function changeLang() {
	var langSel = $("language");
	GM_setValue("lang", langSel.options[langSel.selectedIndex].value);
}

if (!GM_getValue("lang")) {
	if ($("language")) { changeLang(); }
} else {
	var url = window.location.toString();
	var curLang = url.split("/")[3];
	var setLang = GM_getValue("lang");
	if (curLang != setLang) {
		window.location = url.substr(0, 27) + setLang + url.substr(27 + curLang.length);
	}
}

if ($("language")) {
	var langSel = $("language");
	langSel.addEventListener("change", changeLang, false);
}


} catch (a) {
//	alert(a);
}
})();