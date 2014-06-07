// ==UserScript==
// @name        KG_TotalGamesCount
// @namespace   http://klavogonki.alexzh.ru
// @description Добавляет отображение общего количества заездов на страницу статистики
// @author      voidmain
// @license     MIT
// @version     1.0
// @include     http://klavogonki.ru/u/*
// @grant       none
// @run-at      document-end 
// ==/UserScript==


function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
}


function main() {
    var totalGamesCountTemplate = '\n<style>\
#totalGamesCounter { width: 100%; padding: 1px 0 5px 0; background-color: #f5f5f5; border-radius: 3px; margin-bottom: 20px; }\
#totalGamesCounter .title { padding: 5px; margin-left: 5px; font-size: 12px; font-weight: bold; color: #aaa; text-transform: uppercase; text-align: center; }\
#totalGamesCounter .value { position: relative; padding: 3px 0 3px 10px; margin: 0 5px; font-size: 18px; font-weight: bold; color: #666; background-color: #f9f9f9; border-top: 1px solid #ccc; border-bottom: 1px solid white; border-radius: 3px; }\
#totalGamesCounter .value .icon-icomoon { margin-right: 2px; font-size: 16px; vertical-align: middle; }\
#totalGamesCounter .value span { vertical-align: middle; }\
</style>\n\
<div id="totalGamesCounter">\n\
<div class="title">Общий пробег</div>\n\
<div class="value">\n\
<div class="icon-icomoon icon-road"></div>\n\
<span>{{total_num_races}}</span>\n\
</div>\n\
</div>\n';

    angular.element('body').scope().$on('routeSegmentChange', function(e, obj) {        
        if(!obj.segment || obj.segment.name != "overview") {
            return;
        }
        
        var profile = angular.element('body').injector().get('Profile');
        profile.getIndexData(obj.segment.locals.data.summary.user.id).then(function(index) {
            e.targetScope.total_num_races = index.stats.total_num_races;
        });
        
        var template = obj.segment.locals.$template;
        var index = template.indexOf("<div class='recent'>\n<h4>Недавние режимы</h4>");
        template = template.substring(0, index) + totalGamesCountTemplate + template.substring(index, template.length);
        obj.segment.locals.$template = template;
    });
}


window.addEventListener("load", function() {
    exec(main);
}, false);