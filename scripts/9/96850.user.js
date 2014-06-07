// ==UserScript==
// @name           CampusCruiser access keys
// @namespace      campuscruiser.com
// @description    Adds access keys to CampusCruiser.
// @include        http://campuscruiser.com/*
// @include        http://*.campuscruiser.com/*
// @include        https://campuscruiser.com/*
// @include        https://*.campuscruiser.com/*
// @version      0.03
// ==/UserScript==

//Logs out with access key l
if (document.getElementById('ccLogOut')){
    document.getElementById('ccLogOut').setAttribute('accesskey','l')
}

if (document.getElementById('ccQIcons')){
    
    //Goes to homepage with access key h
    document.getElementById('ccQIcons').getElementsByTagName('a')[0].setAttribute('accesskey','h')

    //Gets email with access key i (think "inbox")
    document.getElementById('ccQIcons').getElementsByTagName('a')[2].setAttribute('accesskey','i')

    //Composes a new email with access key c
    document.getElementById('ccQIcons').getElementsByTagName('a')[3].setAttribute('accesskey','c')

}