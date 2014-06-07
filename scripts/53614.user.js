// ==UserScript==
// @name           MAL Browser Killer!!!
// @namespace      http://thayanger.neostrada.pl
// @include        http://myanimelist.net/animelist/*
// @description    In progress - don't touch it!!!
// @author         Bastvera <bastvera@gmail.com>
// ==/UserScript==


var bookmark = document.createElement('A');
bookmark.appendChild(document.createTextNode('CLICK'));
bookmark.style.fontSize="25px";
bookmark.href="javascript:;"

xxx = document.getElementById('list_surround');
xxx.appendChild(bookmark);

 ratings = document.evaluate(
                "//A[@class='animetitle']",
                document,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null);
				
		var ListLinks = [];
		var j =0;
	for (var i = 0; i < ratings.snapshotLength; i++){
	
        rate = ratings.snapshotItem(i);
		rateformHTML = rate.nextSibling.nextSibling;
		
		
		if(rateformHTML!=null){
		 finder = rateformHTML.innerHTML.search("Airing");
				
        if(finder!=-1){
		//alert(rate.firstChild.innerHTML);
		ListLinks[j] = rate;
		j++;
		}}
       
    }
	
	bookmark.addEventListener('click',function () {
    ScrollToElement();
},false)

function ScrollToElement(){
for( var i in ListLinks){
window.open(ListLinks[i].href);
}	
}