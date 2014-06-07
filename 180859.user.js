// ==UserScript==
// @name           Ostatnia strona - Grupy
// @namespace      http://www.fotka.pl/profil/suchar
// @description    Automatycznie wyszukuje numer ostatniej strony w wątku na forum grupy.
// @include        http://www.fotka.pl/grupa*
// @version        1.1
// @copyright      2013+, suchar
// @author         suchar
// @run-at         document-end
// @grant          unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.$;
var url = unsafeWindow.document.location.hostname + unsafeWindow.document.location.pathname;

var forum = document.location.href.match(/Forum*/);
if (forum) {dodajPrzycisk();}

function dodajPrzycisk(){
    $("div.pages").each(function(e){
        var last = document.createElement("a"); 
        last.innerHTML = "Ostania";
        last.style.cursor = "pointer";
        last.className = "last_page";
        last.href = "javascript:void(0)";
        $(last).click(function(e){
            last.style.cursor = "default";
            var n = findLast(1, 100);
            last.style.cursor = "pointer";
            e.target.href = url+"?strona="+n;
            e.target.innerHTML = n;
            e.preventDefault();
            $(e.target).unbind("click");
            $("a.last_page").html(n);
        });
        this.appendChild(last);
    }
);
}

function findLast(start, end){
    while(end-start > 1){	
        console.log("sprawdzanie " + start + " - " + end);
        $("a.last_page").html("Wyszukiwanie ("+start+"-"+end+")");
        var mid = Math.ceil((start+end)/2);
        if(exists(mid)){
            start = mid;
        }else{			
            end = mid;
        }
    }
    return end-1;
}
function exists(page){
    return $.ajax({url: url+"?strona="+page, async: false}).responseText.indexOf('<div class="post_outter">') != -1;
}