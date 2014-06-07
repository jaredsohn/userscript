// ==UserScript==
// @name           Filmweb - dodaj ocene obok wszyskitch odnosnikow do filmwebu
// @namespace      http://userscripts.org/users/27225
// @description    Dodaje ikonke filmwebu obok wszystkich odnosnikow do filmwebu (na wszystkcih stronach), po kliknieciu ktorej pobiera ocene filmu do ktorego jest ten odnosnik.
// @version			2.0
// @include        *
// @exclude        http://www.filmweb.pl/*
// @exclude        http://filmweb.pl/*
// @exclude        http://www.imdb.com/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// ==/UserScript==

//DEBUG
// if(unsafeWindow.console){
   // var glog = unsafeWindow.console.log;
// }

var fwIcon = 'data:image/png;base64,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';
var loadingIcon = 'data:image/gif;base64,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';

window.addEventListener(
  'load',
  function() {
    setTimeout(
      function () {
		// Add filmweb check rating buttons
        var pattern = '//a[starts-with(@href, "http://www.filmweb.pl/") or starts-with(@href, "http://filmweb.pl/")]';
		var results = document.evaluate( pattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		for(x = 0 ; x < results.snapshotLength; x++){
			addFWButton(results.snapshotItem(x));
		}
      },
    10);
  },
  false
);

function addFWButton(element){
    var checkFWButton = document.createElement("a");
    checkFWButton.setAttribute("id",element.href);
    checkFWButton.setAttribute("style",'cursor:pointer;text-decoration: none;');
    checkFWButton.setAttribute("alt",'Sprawdz ocene na FilmWeb');
    checkFWButton.setAttribute("title",'Sprawdz ocene na FilmWeb');
    checkFWButton.addEventListener("click", getRating, false);
    checkFWButton.innerHTML = '&nbsp;&nbsp;<img width="16" height="16" src="'+fwIcon+'"/>';
    element.parentNode.insertBefore(checkFWButton, element.nextSibling);
}

function getRating(){
    var elem = this;
	elem.innerHTML = '&nbsp;&nbsp;<img width="16" height="16" src="'+fwIcon+'" />&nbsp;&nbsp;<img src="'+loadingIcon+'" alt ="checking">';
	var the_url = elem.id;
   
    GM_xmlhttpRequest({
        url: the_url,
        method: 'GET',
        onload: function(response) {
           
            var html = response.responseText;
			if($(html).find("strong[rel='v:rating']").length > 0){
				var rating = $(html).find("strong[rel='v:rating']").text();
				var votes = $(html).find("strong[property='v:votes']").text();
				elem.innerHTML = '&nbsp;&nbsp;<img width="16" height="16" src="'+fwIcon+'" />&nbsp;&nbsp;Ocena:' + rating+' głosów: '+votes;
			}
			else
				elem.innerHTML = '&nbsp;&nbsp;<img width="16" height="16" src="'+fwIcon+'" />&nbsp;&nbsp;Brak Oceny!';
        }
    });
}