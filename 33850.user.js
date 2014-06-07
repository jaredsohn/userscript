// ==UserScript==
// @name           zap2it imdb movie link
// @namespace      http://userscripts.org/users/35791/scripts
// @url            http://userscripts.org/scripts/show/33850
// @description    find movies, add imdb icon - click to open imdb in new tab
// @include        http://tvlistings.zap2it.com/tvlistings/ZCGrid.do*
// @include        http://tvlistings.zap2it.com/tv/*
// ==/UserScript==

/* 20110811
	Added WWW to imdb - thanks Alexo
*/

/* 20100927
	Titles containing an ampersand now link correctly
*/

/* 20090722
	Added RottenTomatoes icon & search link
*/

var url = window.content.location.href;
var isGrid = url.match(/\/ZCGrid\.do/);
var isIMDBmoviePage = url.match(/\/MV[0-9.*]/i);

if (isGrid) {
	var movies = document.evaluate('//td[contains(@class,"zc-g-M")]/a', document, null, 6, null);
} else if (isIMDBmoviePage) {
	var movies = document.evaluate('//h1[@id="zc-program-title"]', document, null, 6, null );
} else {
	return;
}

for (var i=0; i < movies.snapshotLength;  i++)
{
  var icon = movies.snapshotItem(i).parentNode.insertBefore(document.createElement("IMG"), movies.snapshotItem(i).nextSibling);
  icon.src = "data:image/x-icon;base64,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"; 
  icon.style.marginLeft = "5px";
  icon.addEventListener("click",
    function(e)
    {
      GM_openInTab("http://www.imdb.com/find?s=all&q="+(e.target.parentNode.firstChild.nextSibling.textContent).replace('&','%26'));
	  e.stopPropagation();
    }
   ,true);
  
  icon = movies.snapshotItem(i).parentNode.insertBefore(document.createElement("IMG"), movies.snapshotItem(i).nextSibling);
  icon.src = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wDp6elJs7O1r3Z2iv9SUnf/RkZ4/0ZGe/9XV4b/goKi/8PDy6/09PRJ////AP///wD///8A////APn5+Rq3t7m2R0di8BERX/8AAG//AAB8/wAAg/8AAIf/AACJ/wIChv8aGoX/ZWWR8NnZ3Vz9/f0A////APn5+SiXl5vXDAxG/wAAe/8AAIb/AACI/wAAi/8AAI3/AACQ/wAAk/8AAJf/AACb/wAAmv8pKYX/x8fPXP///wC+vr91Hh5L/wAAg/8AAIv/AACN/wAAkP8AAJP/AACW/wAAmf8AAJ3/AACf/wAAo/8AAKb/AACp/zk5mfDY2N5jaWl0/wAAbf8AAJH/AACT/wAAlv8AAJn/AACc/wAAn/8AAKL/AACl/wAAqP8AAKz/AACv/wAAsv8DA63/f3+t/zg4W/8AAI3/AACZ/wAAnP8AAKD/AACj/wAApf8AAKn/AACs/wAAr/8AALL/AAC1/wAAuP8AALv/AADA/zg4k/8qKln/AACa/wAAof8GBqb/BgaE/wwLqv8JCbH/AACx/wAAtf8AALj/AAC9/wAAvv8AAMH/AADE/wAAy/8WFpT/QEBw/wAAov8SErD/Jye8/xomd/8KK1b/IyG7/xkZwv8CAr//AADE/wAAnP8AAL3/AADL/wAAz/8AANX/FhaY/3p6nfgFBaP/MjLC/zw7yf8yNK3/BV4c/xAodv82NdD/DQ3K/wAFrf8ADFP/AADN/wAA1P8AANb/AADZ/zk5mP/R0dZaLS2b/0pK1v9SUtb/T0vS/xFjLf8AaRL/JSWw/xMWwv8ARC7/ABt1/wAA3v8AAN//AADk/wgIzv+Tk7r/+fn5FZmZsbU7O6T/WFjG/2Jg3f8rU2D/AJEA/wUtQf8DSzf/AGYZ/wAKtv8AAeH/AAbG/wIIif9TU5v25+fqd////wD39/cKg4OQuiImR/8YPjn/DmMe/wCNAP8AgQD/AJMA/wBRIP8AMmL/ADNP/wIyMv9EU17/4+Plaf///wD///8A/Pz8EcfHyOhCTUr/F0Mh/wV4Bf8AhwD/AHYA/wB8AP8AiwD/AFYL/wclSv9pcYnz3t/icP39/QP///8A////APz8/Afc3NxwyMnIcL7GvnBwj3DtJ18n/wduB/8CdgL/TopO/1eCWf87WEL/b3pv6NXV1Y79/f0K////AP///wD///8A////AP///wD///8A6OjooeLi4lU7Xzv1VnFW/NfX13X19fUU7/HvFMrMypykpKS29/f3Dv///wD///8A////AP///wD///8A////AP///wD///8AYXZh87fEt/P///8A////AP///wD///8A////AP///wD///8A8A8AAMAHAACAAwAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAIABAADAAwAAwAcAAPgDAAD6cwAA/n8AAA=="; 
  icon.style.marginLeft = "5px";
  icon.addEventListener("click",
    function(e)
    {
      GM_openInTab("http://www.rottentomatoes.com/search/full_search.php?search="+(e.target.parentNode.firstChild.nextSibling.textContent).replace('&','%26'));
	  e.stopPropagation();
    }
   ,true);
  
}

GM_addStyle(
	"h1#zc-program-title { float: left; } \
	#zc-sc-ep-detail img { cursor: pointer; float: left; position: relative; top: 10px; left: 10px; } \
	#zc-sc-ep-mvRating-w { clear: left; } \
	");
