// ==UserScript==
// @name       爱红伞后台管理自动填密码
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://bbs.iavira.com/forum.php?mod=modcp&*

// @copyright  2012+, You
// ==/UserScript==


function enableAutoComplete_byID(element_id) {
    element=document.getElementById(element_id);
    if (element )
        element.setAttribute("autocomplete","on");}




enableAutoComplete_byID('cppwd')