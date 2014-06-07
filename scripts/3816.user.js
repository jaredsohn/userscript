// ==UserScript==
// @name           GameFAQs Last Page Link for V10
// @description    Quick link to the last page of a long topic
// @include        http://boards.gamefaqs.com/gfaqs/gentopic.php?board=*
// ==/UserScript==

(function(){

n=30;

for(i=1; i<document.getElementsByTagName("table")[0].rows.length; i++){


if(parseInt(document.getElementsByTagName("table")[0].rows[i].cells[3].innerHTML)>(n)){

tp=parseInt(document.getElementsByTagName("table")[0].rows[i].cells[3].innerHTML);

pages=Math.floor((tp-1)/(n));

linkHref=document.getElementsByTagName("table")[0].rows[i].cells[1].getElementsByTagName("a")[0];

document.getElementsByTagName("table")[0].rows[i].cells[0].innerHTML+=" <font size=1>[<a href="+linkHref+"&page="+pages+" title='Go to page "+(pages+1)+"'>P"+(pages+1)+"</a>]</font>";

}


}



})();
