// ==UserScript==
// @name           Scholar Wikipediafier
// @namespace      en.wikipedia.org/wiki/User:Smith609
// @description    Adds links on Google Scholar search results pages to produce links to ready-to-paste Wikipedia citations
// @version        1.03 - Correct positioning of {{Wikify}} links
// @include        http://scholar.google.*/scholar?*&q=*
// @include        http://scholar.google.*/scholar?*&as_q=*
// @include        http://scholar.google.*/scholar?q=*
// @include        http://scholar.google.*/scholar?as_q=*
// ==/UserScript==

relatedRegExp = /\/scholar\?q=related:([\w\d_]*)/;
var spans = document.getElementsByTagName('span');
var spanas = new Array();
for (var i = 0; i < spans.length; i++) {
	if (spans[i].className == 'gs_fl') {
		spanas = spans[i].getElementsByTagName('a');
		for (var j = 0; j < spanas.length; j++) {
			spanas[j].className = 'gs_fl';
		}
	}
}

var as = document.getElementsByTagName('a');
var j = 0;
var relateds = new Array();
var url = new Array();
var title = new Array();
for (var i = 0; i < as.length; i++) {
  as[i].style.textDecoration = 'none';
  if (as[i].className == 'gs_fl') {
    if (as[i].href.match(relatedRegExp)) {
      relateds[j] = as[i];
      url[j] = lastURL;
      title[j] = lastTitle;
      j++;
    }
  } else {
    lastTitle = as[i].innerHTML;
    lastURL = as[i].href;
    as[i].style.borderBottom= (i > 24?'dotted 1px':'none');
  }
}
dash = new Array();
newLinks = new Array();
for (i = 0; i < relateds.length; i++) {
  newLinks[i] = document.createElement('a');
  newLinks[i].className = 'gs_fl';
  dash[i] = document.createTextNode(' - ');
  match =  relatedRegExp.exec(relateds[i].href);
  newLinks[i].href = "http://toolserver.org/~verisimilus/Scholar/Cite.php?id="
                   + match[1] + "&url=" + escape(url[i]) + "&title=" + escape(title[i].replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));
  newLinks[i].innerHTML = '{{Wikify}}';
  newLinks[i].style.fontWeight = 'bold';
  newLinks[i].style.textDecoration = 'none';
  var parentNode = relateds[i].parentNode;
  parentNode.insertBefore(dash[i], parentNode.firstChild);
  parentNode.insertBefore(newLinks[i], parentNode.firstChild);
}