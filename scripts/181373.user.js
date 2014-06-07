// ==UserScript==
// @name           Ogame Redesign: import / export
// @description    Напоминает о покупке контейнера
// @namespace      localhost
// @author         Asiman
// @version 	   1.0
// @copyright	   2013, LogServer.Net
// @include http://*-*.ogame.gameforge.com/game/index.php?page=*
// @include http://*.ogame.*/game/index.php?page=*
// @homepage 	   http://userscripts.org/scripts/show/181373
// ==/UserScript==
(function(){
    var OGameClock = document.getElementsByClassName('OGameClock')[0].innerHTML;
    var strPattern = /[0-9]+/;
    var date = OGameClock.match(strPattern);

    function serchBT () {
        //Сегодня предложений больше нет. Приходите завтра.
        var bargain_text = document.getElementsByClassName('bargain_text')[0];
        if (bargain_text) {
            delete localStorage.CL;
            if (bargain_text.innerHTML.length > 0) {
                localStorage.DT = date;
            }
        }
    }

    function echoUploadErr () {
        var width = 0;
            width = screen.width/2 - 200;

        var strUploadErr = '';
            strUploadErr += '<div aria-labelledby="ui-id-1" aria-describedby="errorBoxDecision" role="dialog" tabindex="-1" style="height: auto; width: 400px; top: 250px; left: '+width+'px; display: block;" class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front errorBox ui-draggable">';
            strUploadErr += '   <div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span class="ui-dialog-title" id="ui-id-1">Ссылка</span><button title="close" aria-disabled="false" role="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"><span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text">close</span></button></div><div style="width: auto; min-height: 150px; max-height: none; height: auto;" id="errorBoxDecision" class="errorBox TBfixedPosition ui-dialog-content ui-widget-content">';
            strUploadErr += '   <div class="head"><h4 id="errorBoxDecisionHead">Импорт / Экспорт</h4></div>';
            strUploadErr += '   <div class="middle">';
            strUploadErr += '       <span id="errorBoxDecisionContent">Внимание! Вы не приобрели контейнер с неизвестным содержимым!</span>';
            strUploadErr += '       <div class="response">';
            strUploadErr += '           <div style="float:left; width:180px;">';
            strUploadErr += '               <a href="index.php?page=traderOverview#animation=false&page=traderImportExport" class="yes"><span id="errorBoxDecisionYes">Перейти</span></a>';
            strUploadErr += '           </div>';
            strUploadErr += '           <div style="float:left; width:180px;">';
            strUploadErr += '               <a href="index.php?page=overview" class="no"><span id="errorBoxDecisionNo">Скрыть</span></a>';
            strUploadErr += '           </div>';
            strUploadErr += '           <br class="clearfloat">';
            strUploadErr += '       </div>';
            strUploadErr += '   </div>';
            strUploadErr += '       <div class="foot"></div>';
            strUploadErr += '   </div>';
            strUploadErr += '</div>';
        var div = document.createElement ('div');
            div.innerHTML = strUploadErr;
        document.body.appendChild(div);
    }
    if (localStorage.DT != date) {
        if (!localStorage.CL){
            echoUploadErr ();
        }
    }

    $(".no").click(function() {
        localStorage.DT = date;
    });

    $(".yes").click(function() {
        localStorage.CL = true;
    });

    setInterval(serchBT, 1000);

})();
