// ==UserScript==
// @name           Lepro WhoIsWho
// @author         UnDetected, al-dexter
// @version        2.2
// @description    Наглядность половой принадлежности =)
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// ==/UserScript==

(function(){
    colorize(document.getElementsByClassName('ddi'));
    
    function colorize(e) {
        for(i = 0; i < e.length; i++) {
            var ddi = e[i];
            var cUser = ddi.getElementsByClassName('c_user')[0];
            cUser.style.color = getColor(ddi.innerHTML);
        }	
    }
    
    function getColor(e) {
        var sw = /Написала/;
        return sw.test(e) ? "#f00" : "#00f";
    }
    
    // If DOM changed
    document.addEventListener("DOMNodeInserted", handleComment, false);	
    function handleComment(e) {
        if (e.target.className.indexOf("comment") > -1) {
            colorize(e.target.getElementsByClassName('ddi'));
        }
    }
})();