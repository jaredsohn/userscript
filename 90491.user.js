// ==UserScript==
// @name        LogoSaver
// @version     4.2.0
// @date        2010
// @author      NoFan
// @download	ikareports.ru
// @include	http://s*.ikariam.*/*?view=militaryAdvisorReportView&combatId=*
// @include	http://s*.ikariam.*/*?view=safehouseReports*
// @include	http://s*.ru.ikariam.*/*?view=island&id=*
// @include	http://s*.ikariam.*/*?view=island&id=*
// @include	http://s*.ikariam.*/*?action=Espionage&function=executeMission&actionRequest=*
// @include	http://s*.ikariam.*/*?view=safehouseReports&id=*
// @include	http://*ikareports.ru/world*
// ==/UserScript==


function addNewScript(link){
    var script, head;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = link;
    head.appendChild(script);
}
addNewScript('http://ikareports.ru/inc/userjs/ls42_core.js?t='+Math.random( ));