// ==UserScript==
// @name           Плюрк: Анти-блядогороскоп
// @description    Убирает и мьютит блядогороскопы
// @author         artyfarty
// @version        1.0
// @include        http://www.plurk.com/*
// ==/UserScript==
var main = function() {
document.addEventListener('DOMNodeInserted', function() {
	if (!window.TimeLine || !window.TimeLine.plurks) return;
	TimeLine.plurks
	.filter(function(p) { 
		return p.content_raw.match(/[0-9]{1,2} [а-я]{3,9}[\.\s]*(ОВЕ?Н|ТЕЛ.Ц|БЛИЗНЕЦ|РАК|Л.В|ДЕВ|ВЕС|СКОРПИОН|СТРЕЛ.Ц|КОЗЕРОГ|ВОДОЛЕ|РЫБ)/i) != null 
		})
	.map(function(p) { 
		var q = document.querySelector('div[data-pid="' + p.id + '"]'); 
		if (q) {
			window.AJS.addClass(q, "muted");
			window.AJS.loadJSON("/TimeLine/setMutePlurk").sendReq({plurk_id: p.plurk_id,value: 0});
			window.AJS.hideElement(q);
		}
	})
})
};

function addJS_Node (text, s_URL, funcToRun) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

addJS_Node (null, null, main)