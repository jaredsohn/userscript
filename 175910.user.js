// ==UserScript==
// @id             7c2a2cb4-f492-40fd-a0fc-f964cfce77a5@scriptish
// @name           anti timer beta
// @version        1.0.1
// @history        1.0.1 Не там был вызов анонимной функции
// @history        1.0.0 Релиз
// @namespace      http://userscripts.org/scripts/show/175910
// @author         Black_Sunlight
// @description    Обходит таймер пока на на hugefiles.net и fileparadox.in введите каптчу и жмите единственную кнопку
// @include        htt*://hugefiles.net/*
// @include        htt*://fileparadox.in/*
// @require	http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==

(function(win, u, noConsole, FAST){ 

try{
$(function(){
$('#countdown_str').hide();
$('input[class^="btn-create-download"]').attr('onclick','$(\'form[name^="F1"]\').submit()');
});
}catch(er){
    console.log("~~ER_global: "+ er +' (line '+(er.lineNumber||'')+')')   
    }; 

}(typeof unsafeWindow !='undefined'? unsafeWindow: window,'undefined',1,1));
