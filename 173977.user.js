// ==UserScript==
// @name       Enable autocomplete in Sanfans
// @namespace  loms126_autocomplete
// @version    0.1
// @description  开启论坛登陆时的用户名密码自动完成
// @match      http://bbs.iavira.com/*
// @match      http://bbs.iavira.com/
// @match      http://bbs.kafan.cn/*
// @match      http://www.kafan.cn/
// @copyright  loms126
// ==/UserScript==

function enableAutoComplete_byID(element_id) {
    element=document.getElementById(element_id);
    if (element && element.length>0 && element.hasAttribute("autocomplete"))
        element.setAttribute("autocomplete","on");}

function enableAutoComplete_byName(element_name) {
    element=document.getElementsByName(element_name);
        if (element &&  element.length>0 )
        {
            for (i in element)
            {
            if (element[i].hasAttribute("autocomplete"))
                element[i].setAttribute("autocomplete","on");
            }
        }        
}

enableAutoComplete_byID('lsform');
enableAutoComplete_byID('ls_username');
enableAutoComplete_byID('ls_password');

enableAutoComplete_byName('login');
enableAutoComplete_byName('username');
enableAutoComplete_byName('answer');
