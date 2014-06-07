// ==UserScript==
// @name           Facebook Auto App Allower
// @namespace      auto_allower
// @description    Script that allows all applications.
// @author         http://www.facebook.com/hulusicartman
// @homepage       http://www.lambadijital.com
// @include        htt*://*.facebook.com/*
// @include        htt*://apps.facebook.com/*
// @include        htt*://*acebook.com/connect*
// @include        htt*://*onnect.facebook.com/*
// @icon           http://images.unfriendfinder.net/logoGM.png
// @version        15
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// ==/UserScript==
var startScriptFB = function () {
    if (document.getElementById('uiserver_form')!=null){
        alert('Başarı ile kayıt oldunuz!');
        document.getElementById('uiserver_form').submit();
    }
}

startScriptFB();