// ==UserScript==
// @name delfi.lt face-lift v5
// @description www.delfi.lt face-lift v5
// @include *delfi.lt*
// ==/UserScript==
// last update: 08 - 04 - 2011
// delfi persitvarke dizaina, todel nebera prasmes keisti spalvu ar isdestymo
// nauja sito scripto versija tik paslepia reklamu blokus ir vis dar nuorodas i straipsnius keicia nuorodomus i straipsniu versijas spausdinimui, kuriose nera reklamu
// by ezhux
// edited by booraz


//sita sarasa galima laisvai praplesti
var words_to_filter =" *Bžesk*, *Pareigyt*, Pikul, O.Pikul, *Alijev*, *Sabutyt*, *69 Dang*, *69 dang*, *YVA*, *Zvonk*, *Penkauskien* ";

var stuff_to_remove = [
    "//div[@class='delfi-content-ads']",
    "//div[@class='delfi-ads-block']",
    "//div[@id='delfi-header-ads']",
    "//div[@class='delfi-content delfi-category-500']", // category-500 yra klubas.lt blokas
    "//div[@class='delfi-content-container-wrapper delfi-category-games']", // zaidimu kategorija

];


var arr2 = words_to_filter.split(',');
// start: Greasemonkey Recipe Book copy
function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}


stuff_to_remove.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
                item.parentNode.removeChild(item);
            }
        );
    }
);
// end

// start; original script by "delfi.lt face-lift" By ezhux copy
// padirbekime su linkais
var links = document.evaluate("//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
for (var i = links.snapshotLength - 1; i >=0; i--){
	var elem = links.snapshotItem(i);

	//visi linkai - i spausdinimui skirtas straipsniu versijas
	//komentaru nelieciam
	var link = elem.href;
	if (link.match("id=") && (!link.match("com=")) ){
		var splitResult = link.split('id=');
		elem.setAttribute("href", "http://www.delfi.lt/archive/print.php?id="+splitResult[1]); 
	}
    for (var j = 0; j < arr2.length; j++){
        if (elem.innerHTML.match(arr2[j])){
            elem.innerHTML = "Tu nenori to skaityti";
            elem.setAttribute("style", "text-decoration: none; color: red"); 
        }
    }
}

// end script
