// ==UserScript==
// @name           pretome code autofill
// @namespace	   mezb
// @description    pretome code autofill
// @include        https://pretome.info/*
// ==/UserScript==

try {

    if(!GM_getValue('key')){
        key = prompt('Enter your key code: ');
        GM_setValue('key', key);
    } else {

        document.getElementsByName("q")[0].focus();
        document.getElementsByName("q")[0].value = GM_getValue('key');
        document.getElementsByName("q")[0].focus();
        setTimeout('document.getElementsByClassName("btn/")[0].focus();',1000);
        if (document.getElementsByClassName('btn/') !== null){
            setInterval((login),3000); //3 segundos
        }
    }
} catch (e){

}


function login(){

    if(!GM_getValue('pwd')){
        pwd = prompt('Enter your password: ');
        GM_setValue('pwd', pwd);
    } else if(!GM_getValue('u')){
        user = prompt('Enter your username: ');
        GM_setValue('u', user);
    } else {
        document.getElementsByName("username")[0].value = GM_getValue('u');
        document.getElementsByName("password")[0].value = GM_getValue('pwd');
        document.getElementsByClassName('btn/')[0].click();
    }
}
