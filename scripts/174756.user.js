// ==UserScript==
// @id             www.chickenbones.craftsaddle.org-0fc43a72-8ca4-4103-bc8d-2efe651487d2@scriptish
// @name           chickenbones direct links
// @version        1.1.0
// @history        1.1.0 Добавил переменную для быстрой смены версии minecraft
// @history        1.0.0 Релиз скрипта.
// @namespace      http://userscripts.org/scripts/show/174756
// @author         Black_Sunlight
// @description    Заменяет ссылки на сайте http://www.chickenbones.craftsaddle.org/Files/New_Versions/links.php на прямые минуя adf.ly
// @include        http://www.chickenbones.craftsaddle.org/Files/New_Versions/links.php
// @require	http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==
/* Переменная для смены версии minecraft, менять можно только версию в кавычках */

var version='1.6.4'

/*ДАЛЬШЕ НЕ РЕДАКТИРОВАТЬ*/
/*========================*/
var lnk="http://www.chickenbones.craftsaddle.org/Files/New_Versions/"+version+"/"
var req=0;
$(function(){
$('div[id*="'+version+'"]').show();
$('div[id*="'+version+'"]').find('a').each(function(){
var self=$(this)
var name=self.text().replace(/([a-zA-Z-]{1,})\s*.*/ig,"$1")
var ver='';
if(req<6){
req++;
reqester(self,name,lnk,ver)
}
})
});

function reqester(self,name,lnk,ver){
$.get('http://www.chickenbones.craftsaddle.org/Files/New_Versions/version.php?version='+version+'&file='+name, function(data){
ver=data.replace(/Ret\:\s*(\d{1,}.*)/ig,"$1")
var trulnk=lnk+name+" "+ver+".jar"
self.attr('href',trulnk);
})
}