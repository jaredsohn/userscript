// ==UserScript==
// @name           Strony poza setkę
// @namespace      http://www.fotka.pl/profil/suchar
// @description    Pozwala na wygodne przechodzenie poza 100 stronę zgłoszeń, bez potrzeby modyfikowania adresu strony. Ponadto automatycznie wyszukuje numer ostatniej strony.
// @include        http://www.fotka.pl/przyjaciel/friend/index*
// @version        3.0
// @copyright      2013+, suchar
// @author         suchar
// @run-at         document-end
// @grant          unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.$;

$("div.pages a").each(function(){
    this.href = "?page="+ this.href.split('/')[6];
}
);

if(document.location.href.indexOf("?page=") != -1){
    var page = parseInt(document.location.href.split("=")[1]);
    if(page >= 100){
        $("div.pages a").not("[accesskey]").hide();
        $("div.pages").find("a:last").attr("href", "?page="+(page+1));
        $("div.pages").find("a:first").attr("href", "?page="+(page-1));
        $("div.pages").find("span").html(page);
        var next100 = document.createElement("a");
        next100.href = "?page="+(page+100);
        next100.innerHTML = "Następne 100";
        $("div.pages").append(next100);
    }
}

$("div.pages").each(function(e){
    var last = document.createElement("a"); 
    last.innerHTML = "Ostania";
    last.style.cursor = "pointer";
    last.className = "last_page";
    last.href = "javascript:void(0)";
    $(last).click(function(e){
        last.style.cursor = "default";
        var n = findLast(1, 500);
        last.style.cursor = "pointer";
        e.target.href = "http://www.fotka.pl/przyjaciel/friend/index/?page="+n;
        e.target.innerHTML = n;
        e.preventDefault();
        $(e.target).unbind("click");
        $("a.last_page").html(n);
    });
    this.appendChild(last);
}
);

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
    return $.ajax({url: "http://www.fotka.pl/przyjaciel/friend/index/?page="+page, async: false}).responseText.indexOf('<td class="td1"') != -1;
}



