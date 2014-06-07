// ==UserScript==
// @name       dAmn Easy-Whois
// @namespace  http://kyogo.deviantart.com/
// @author  Justin Eittreim (Kyogo)
// @include      http://chat.deviantart.com/chat/*
// @match      http://chat.deviantart.com/chat/*
// @version    0.2
// @description  For those of us who like clicking on someone's name to whois them (from IRC)
// @copyright  2012+, Justin Eittreim (Kyogo)
// ==/UserScript== 

function UpdateList() {
    var MemberList = document.getElementsByClassName("dAmnChatMember");
    for (var i = 0; i < MemberList.length; i++) {
        var Body = MemberList[i].innerHTML;
        var ImgPos = Body.search("img");
        if (-1 == ImgPos) {
            var Person = Body.substring(1);
            var nsClean = Person.replace(/\[[0-9]\]$/, '').replace(/[^a-zA-Z0-9_-]/g, '');
            MemberList[i].innerHTML += '<img src="data:image/gif;base64,R0lGODlhDgAOALMAALMAvHwAhGcAb2MAamgAcV8AaFUAXVEAWkgAUUEAS////wAAAAAAAAAAAAAAAAAAACH5BAEAAAoALAAAAAAOAA4AAAQeUMlJq7036Y21NAhGDYeoFAJRmEFgvhUAwHRt31MEADs=" alt="Whois '+Person+'" width=14 height=14 onclick="dAmn_Raw(dAmnEscape(\'get login:'+nsClean+'\\np=info\\n\'));"/>';
        }
    }
    setTimeout(UpdateList, 1000);
}

setTimeout(UpdateList, 1000);