// ==UserScript==
// @name        KG_FullStatisticsLink
// @namespace   http://klavogonki.alexzh.ru
// @description Добавляет ссылку на скачивание полной статистики
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
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

function main() {
    var rootScope = angular.element('body').scope();

    rootScope.$on('$viewContentLoaded', function() {
        if(angular.element('.profile-stats-details').length === 0) {
            return;
        }
        
        var profileStatsScope = angular.element('.profile-stats').scope();
        
        if(profileStatsScope.Details.data.summary.user.id !== profileStatsScope.Me.id) {
            return;
        }
        
        if(angular.element('#fullStatisticLink').length > 0) {
            return;
        }
        
        var actionsListElem = angular.element('.profile-stats-details > h3 > div.actions');
        
        var actionsListUl = actionsListElem.find('ul');
        var actionsListButton = actionsListElem.find('button');
        
        if(actionsListElem.hasClass('ng-hide')) {
            actionsListUl.empty();
            actionsListElem.removeClass('ng-hide');
        }
        
        var expr = new RegExp('/u/#/' + profileStatsScope.Details.data.summary.user.id + '/stats/([^/]+?)/.*')
        var vocName = expr.exec(window.location.href)[1];
        var link = '/profile/' + profileStatsScope.Details.data.summary.user.id + '/' + vocName + '.csv';
        
        actionsListUl.append('<li><a id="fullStatisticLink" href="' + link + '">Экспорт статистики</a></li>');
    });
}

window.addEventListener("load", function() {
    // script injection
    exec(main);
}, false);