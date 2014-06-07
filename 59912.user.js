// ==UserScript==
// @name           mixi show all diaries on news
// @namespace      http://jk.jp/
// @include        http://news.mixi.jp/list_quote_diary.pl*
// ==/UserScript==

(function() {

    function doIt() {

	function getDiaryAnchor(element) {
           return element.getElementsByTagName('a');
	}

       var Call_GM_xmlhttpRequest=function(i, url){

        function on_add_diary(response) {
            // 本文を切り出す
	    var from = response.responseText.indexOf("<div id=\"diary_body\"");
            if (from == -1 ) return;
            var to = response.responseText.indexOf("<\/div>",from);
            var s = response.responseText.substr(from+44,to-from-44);

            // 本文をタグに入れる
            var newElement = document.createElement("p");
            newElement.innerHTML=s;
            newElement.style.border="dashed 1px #FF6600";
            var diaryAbs = lists[i].getElementsByTagName("p")[0];
            diaryAbs.innerHTML=s;
            diaryAbs.style.backgroundColor="#EEEEEE";
            var readMore = lists[i].getElementsByTagName("p")[1];
            readMore.style.position="relative";
        }

        GM_xmlhttpRequest({method: "GET", url: url, 
        onload: on_add_diary});
	return;
       }

      lists = getDivElementsByClass('diaryList01');
      for(var i=0;i<lists.length;i++) {
	var anchor = getDiaryAnchor(lists[i])[0];
        if ( i > 5 ) break; // Mixiの制限対策
        Call_GM_xmlhttpRequest(i,anchor.href);         
      }
    }

    var getDivElementsByClass = function(searchClass) {
       	var classElements = new Array();
	var allElements = document.getElementsByTagName("div");
	for (i = 0, j = 0; i < allElements.length; i++) {
	    if (allElements[i].className == searchClass) {
		classElements[j] = allElements[i];
		j++;
	    }
	}
	return classElements;
    }

    var getPElementsByClass = function(searchClass) {
       	var classElements = new Array();
	var allElements = document.getElementsByTagName("p");
	for (i = 0, j = 0; i < allElements.length; i++) {
	    if (allElements[i].className == searchClass) {
		classElements[j] = allElements[i];
		j++;
	    }
	}
	return classElements;
    }

    doIt();

})();
