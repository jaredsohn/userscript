// ==UserScript==
// @name          Amazon Sambok ISBN Search
// @namespace     http://www.nb.no/baser/sambok/
// @description	  Add search links to the Norwegian Sambok and Bibsys Library Database from  Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

(

function() {
  mainmatch = window._content.location.href.match(/\/(\d{9}[\d|X])\//);
  if (mainmatch){
  	var isbn = mainmatch[1];
  	var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (header) {

      var sambok_link = document.createElement('a');
   	  sambok_link.setAttribute('href', 'http://nabo.nb.no/bok?_b=sambok&I=' + isbn);
	  sambok_link.setAttribute('title', 'SÃ¸k opp denne utgivelsen i Sambok');
	  sambok_link.setAttribute('style', 'font-weight: bold; color: #F00; background-color:#FEE; border: thin dashed blue;');
   	  sambok_link.innerHTML
	   	= '</br>SÃ¸k opp denne utgivelsen i Sambok (ISBN)';



      var bibsys_link = document.createElement('a');
   	  bibsys_link.setAttribute('href', 'http://openurl.bibsys.no/openurl?sid=BIBSYS:Ask&genre=book&isbn=' + isbn);
	  bibsys_link.setAttribute('title', 'SÃ¸k opp denne utgivelsen i Bibsys (ISBN)');
	  bibsys_link.setAttribute('style', 'font-weight: bold; color: #F00; background-color:#FEE; border: thin dashed blue;');
   	  bibsys_link.innerHTML
	   	= '</br>SÃ¸k opp denne utgivelsen i Bibsys (ISBN)';



      header.parentNode.insertBefore(sambok_link, header.nextSibling);
      header.parentNode.insertBefore(bibsys_link, header.nextSibling);
    }
  }
}
)();
