// ==UserScript==
// @id             depositfiles_waiter
// @name           depositfiles_downloader
// @namespace      http://userscripts.org/scripts/show/103743
// @version        4.5.0
// @history        4.5.0 Настало время ввести новую систему версий и дать грант функциям
// @history        4.4 Добавлена поддержка dfiles.ru
// @history        4.3 И сразу 4.3. Добавлено:Информация о просьбе подождать, и лимите подключений.
// @history        4.2 Добавлено: Автоопределение страны ссылки
// @history        4.1 Небольшой фикс
// @history        4.0 Surprise.
// @history        3.0 Переделан скрипт, теперь нажимает, добавлена инфа в табе о секундах, автоскачивание не работает, т.к. там каптча и, да, её нужно вводить :(
// @history        2.8 Фикс под новый вид кода и добавлена инфа о лимите.
// @history        2.7 Обновлены include
// @history        2.6 Обновил код, добавил настройки и их удаления для Firefox(greasemonkey или scriptish) и Chrome(Tempermonkey), для Оперы настройки остались в коде скрипта в начале.
// @history        2.5 Новый стиль в конце получения ссылки, сама кнопка плюс ссылка и поле с ссылкой
// @history        2.4 Добавлено определение превышения лимита скачивания. Для браузера Opera, программы userjsmanager добавлена ссылка обновления скрипта.
// @history        2.3 Добавлена опция индикации работы скрипта, когда вы думаете что скрипт не работает.
// @history        2.2 Убрано предупреждение о начале запроса, так же уменьшено время ожидания в конце, если не будет работать автоскачивание напишите мне об этом.
// @history        2.1 Исправлены некоторые переменные.
// @history        2.0 Добавлена опция автоматического скачивания после появления кнопки, добавлено описание, изменён namespace скрипта.
// @history        1.0 Релиз.
// @include        http://depositfiles.com/*/files/*
// @include        http://depositfiles.com/files/*
// @include        http://dfiles.ru/*/files/*
// @include        http://dfiles.ru/files/*
// @updateURL https://userscripts.org/scripts/source/103743.meta.js
// @Download http://userscripts.org/scripts/source/103743.user.js
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js?ver=1.6.1
// @grant GM_registerMenuCommand
// @grant GM_deleteValue
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_xmlhttpRequest
// ==/UserScript==
if(this.opera){

var autodownload=true; 

}
else{
GM_registerMenuCommand("Удалить настройку автоскачивания", function() {GM_deleteValue("auto")});
if(GM_getValue('auto')==undefined){
if(confirm('Первичная настройка скрипта\n для сброса настройки есть пункт меню в командах скрипта\n\nВы хотите использовать автоскачивание?')){var autodownload=true;GM_setValue('auto',true);}else{var autodownload=false;GM_setValue('auto',false);}
}
else if(GM_getValue('auto')!=undefined){var autodownload=GM_getValue('auto')}
}
eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(32(){16 10=55 50;10.47("70",1);$("19.21").66(\'<17 61="41" 11="39-40:60;62:63">\\74\\43\\13\\28\\22\\68\\13\\26\\22\\34 \\23\\43\\14\\71\\14 \\26\\13\\28\\26\\65\\25\\23\\69, \\33\\14\\35\\14\\29\\35\\22\\25\\34 \\33\\14\\29\\13\\67\\72\\73\\23\\25\\13...</17>\');16 2=15.12.30("/")[3],2=-1!=2.59("58")?"48://49.46/"+44.45+"/"+2+"/"+15.12.30("/")[4]:15.12;51({56:"57",54:10,52:2,53:{"64-100":"111/5.0 (31; 105; 31 101 5.1; 102; 104:1.8.1.20) 75/103 0.9.9.98",99:"*/*"},108:32(6){27(4==6.110){16 2=6.109,7=18.106("107");7.11.97="96";7.11.82="0";7.11.42="0";18.24.83(7);6=7.84;18.24.81(7);6.24.37=2;2=6.36("80")[0];6=6.36("76")[0];27("77"!=78 2)16 10=2.79("2")[0].85("12");$("#41").86();6?$("19.21").38(6.37):($("19.21").38(\'<17 11="93:94;95-92:91;42:87;"><2 12="\'+10+\'" 11="39-40: 88;">89</2></17>\'),90&&(15.12=10))}}})});',10,112,'||a||||b|c|||d|style|href|u0430|u043e|location|var|div|document|table||chousetype|u0438|u0441|documentElement|u0442|u043d|if|u0447|u0436|split|Windows|function|u043f|u0435|u0434|getElementsByClassName|innerHTML|html|font|size|wait|height|u043a|unsafeWindow|lang|com|append|http|depositfiles|FormData|GM_xmlhttpRequest|url|headers|data|new|method|POST|files|indexOf|18px|id|color|green|User|u0451|before|u043b|u0432|u044f|gateway_result|u0440|u0443|u0439|u0421|DepositFiles|ip|undefined|typeof|getElementsByTagName|repeat|removeChild|width|appendChild|contentDocument|getAttribute|remove|30px|20px|Download|autodownload|center|align|background|lightblue|text|hidden|visibility|206|Accept|Agent|NT|ru|FileManager|rv|U|createElement|iframe|onload|responseText|readyState|Mozilla'.split('|'),0,{}))
