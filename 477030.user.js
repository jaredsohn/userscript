// ==UserScript==
// @name       GD Remove Invite in LinkedIn Poeple
// @namespace  gduprez@gmail.com
// @version    0.1
// @description  Remove Invite item in Poeple list, just keep Links
// @match      https://www.linkedin.com/people/pymk*
// @copyright  2014+, Guillaume Duprez
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    
}

addGlobalStyle('.bt-invite { display:none; visibility:hidden; }');
