// ==UserScript==
// @name       AutoPivotPoints
// @version    1.0
// @include    http://www.livecharts.co.uk/pivot*
// ==/UserScript==
function removeAllIDontWant(){
    var s = document.createElement('style');
    s.id = 'BetterWebQQStyle';
    s.innerHTML = 'body{background-image:none!important;background-color:#d4d4d4!important}.top,.footer,div.middle_col h3.headings,div.middle_col h2,p,iframe,div.panel,div.left_col {display:none!important}.content{padding-top:0!important}'; 
    document.querySelector('head').appendChild(s);
}
removeAllIDontWant();
