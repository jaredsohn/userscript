// ==UserScript==
// @name           habracut
// @author         RReverser
// @description    Load habracut content
// @include        http://habrahabr.ru/
// @include        http://habrahabr.ru/page*
// @include        http://habrahabr.ru/new/*
// @include        http://habrahabr.ru/blogs/*
// @include        http://habrahabr.ru/*/blog/*
// @include        http://*.habrahabr.ru/blog/*
// @include        http://habrahabr.ru/sandbox/*
// ==/UserScript==

function habracutClick() {
  var postn = this.href.replace(/.+?\//g, '').replace(/\.html.+?$/, '');

  this.innerHTML = '<img src="data:image/gif;base64,R0lGODlhEAAQAPQAAP%2F%2F%2FwAAAPj4%2BDg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla%2BKIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK%2Bo2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC%2B0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU%2FNXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK%2BkCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm%2F4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg%2BboUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC%2BRAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA%3D%3D">подгрузка содержимого...';

  try {
    var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open('GET', this.href, true);
    xmlhttp.link = this;
    xmlhttp.onreadystatechange = function() {
        if(this.readyState != 4) return;
        for(var to = this.link; to.className != 'content'; to = to.parentNode);
        to.innerHTML = this.responseText.match(/<div class="content">([\s\S]*?)<\/div>\s+<(ul class="tags"|div)/m)[1];
    };
    xmlhttp.send(null);
  } catch(e) {
    return true;
  }

  return false;
}

window.addEventListener("load", function() {
    var links = document.querySelectorAll('a.habracut');
    for(var i = 0; i < links.length; i++) links[i].onclick = habracutClick;
}, false);