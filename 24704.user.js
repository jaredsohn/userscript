// ==UserScript==
// @name           huwiki counter fix
// @namespace      tgr
// @description    Javítás a magyar wikipédia statisztikájának hibás kódolásához / workaround for the bad encoding in the statistics of the hungarian wikipedia
// @include        http://stats.wikipedia.hu/cgi-bin/awstats.pl?*
// ==/UserScript==

// find frame with link stats
var doc = top.mainright ? top.mainright.document : self.document;

// correct url and text in article links
var i, links = doc.getElementsByTagName('a'), re = new RegExp("^http://stats\\.wikipedia\\.hu/huwp_counter\\.png-(Wikip%C3%A9dia|Nullextra)-(.*)");
for(i=0; i<links.length; i++) {
  m = links[i].href.match(re);
  if(!m) continue;
  var namee = m[2];
  if(namee[0] == ':') namee = namee.substr(1);
  var name = decodeURIComponent(namee);
  if(m[1] == "Nullextra") {
    links[i].href = 'http://www.nullextra.org/wiki/' + encodeURIComponent(name.replace(/ /g, "_"));
    links[i].innerHTML = name + " <i>(Nullextra)</i>";
  } else {
    links[i].href = 'http://hu.wikipedia.org/wiki/' + encodeURIComponent(name.replace(/ /g, "_"));
    links[i].innerHTML = name;
  }
}

var form = doc.forms.namedItem("FormFilter");
if (form) {
  var filter = form.elements.namedItem("urlfilter");
  var filterex = form.elements.namedItem("urlfilterex");

  // encode filter string before sending
  function formencode() {
    filter.value = encodeURIComponent(encodeURIComponent(filter.value));
    filterex.value = encodeURIComponent(encodeURIComponent(filterex.value));
  }
  form.addEventListener('submit', formencode, true);

  // undo visual effects of encoding
  filter.value = decodeURIComponent(filter.value);
  filterex.value = decodeURIComponent(filterex.value);
  var b = doc.getElementsByTagName('b');
  for (i=0; i<b.length; i++) {
    b[i].innerHTML = decodeURIComponent(b[i].innerHTML);
  }
}
