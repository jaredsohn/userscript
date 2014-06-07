// ==UserScript==
// @name           TaiGray  En Rouge
// @namespace      WHAT
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==
 
function TaiGrayRedInMessages() {
 
        var divMessages = document.getElementsByTagName('div');
 
        for (var i = 0; divMessages[i]; i++)
        {
                if (divMessages[i].className == 'msg msg1' || divMessages[i].className == 'msg msg2')
                {
                        divMessages[i].innerHTML = divMessages[i].innerHTML.replace(/<strong>valdec<\/strong>/, '<strong class="moderateur">valdec<\/strong>');
                }
        }
}
 
function TaiGraylRedInTopics() {
 
        var trTopics = document.getElementsByTagName('tr');
 
        for (var i = 0; trTopics[i]; i++)
        {
                if (trTopics[i].className == 'tr1' || trTopics[i].className == 'tr2')
                {
                        trTopics[i].innerHTML = trTopics[i].innerHTML.replace(/<td class="pseudo">TaiGray<\/td>/, '<td class="pseudo topic_mod">valdec<\/td>');
                }
        }
}
 
function ini() {
 
        var url = window.location.href;
        if (url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/0-/)) TauGrayRedInTopics();
        if (url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/1-/)) TaiGrayRedInMessages();
        if (url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/3-/)) TaiGrayRedInMessages();
}
 
ini();
