// ==UserScript==
// @name           Ostatnia strona - Urodziny
// @namespace      http://www.fotka.pl/profil/suchar
// @description    Automatycznie wyszukuje numer ostatniej strony z urodzinami.
// @include        http://www.fotka.pl/urodziny*
// @version        1.0
// @copyright      2013+, suchar
// @author         suchar
// @run-at         document-end
// @grant          unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.$;

$("div.pages a").each(function(){
    this.href = "/urodziny/?page="+ this.href.split('/')[4];
}
);

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
        e.target.href = "http://www.fotka.pl/urodziny/?page="+n;
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
    return $.ajax({url: "http://www.fotka.pl/urodziny/?page="+page, async: false}).responseText.indexOf('<a class="av96"') != -1;
}