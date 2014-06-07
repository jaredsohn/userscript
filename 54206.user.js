// ==UserScript==
// @name antižvaigždės.lt
// @description anti
// @include *.lt*
// ==/UserScript==
// by ezhux
// 

//sita sarasa galima laisvai praplesti
var words_to_filter =" *Olialia*, Skaiv*, *Berneen*, *Petruškeviči*, *Paksait*, *Butkut*, *Ostapenko*, Mia$, *Perminait*, *Bžesk*, *Pareigyt*, *Sabutyt*, *69 Dang*, *69 dang*, *YVA*, *Zvonk*, *Penkauskien*, aaa ";

var arr2 = words_to_filter.split(',');

var links = document.evaluate("//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
for (var i = links.snapshotLength - 1; i >=0; i--){
	var elem = links.snapshotItem(i);
            
    for (var j = 0; j < arr2.length; j++){
        if (elem.innerHTML.match(arr2[j])){
            elem.innerHTML = "Tu nenori to skaityti";
            elem.setAttribute("style", "text-decoration: none; color: red"); 
        }
    }
}

// end script

