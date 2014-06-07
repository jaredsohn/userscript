// ==UserScript==
// @name           Avengers Easy IMDB
// @namespace      userscripts-dugeen
// @description    Provide possible imdb links
// @include        /http://dissolute\.com\.au/avweb/\w+/\d+.html/
// @include        /http://www\.dissolute\.com\.au/avweb/\w+/\d+.html/
// ==/UserScript==

// 20120607 Also find pairs like (Janie Jones and Colin Zeal)
// 20120620 Also work with series 6 pages


// in series 6 epdiv may not have a p child, the p may be child of fill inside epdiv
var paras = document.evaluate(
"//div[@class='epdiv' or @class='fill']/p"
, document
, null
, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
, null);

var nameacc = [];

if (typeof paras != 'undefined' && paras.snapshotLength > 0) {
  //match for brackets with capitalised words. NB 2nd word may be an initial
  var re = /\(([A-Z]\w+\s+[A-Z].*?)\)/g;
  var reand = /\(([A-Z][^ ]+\s+[A-Z][^ ]+) and ([A-Z][^ ]+\s+[A-Z][^ ]+)\)/gm;
  var ul;
  var name;

  var nlinks = 0;
  for (var i = 0; i < paras.snapshotLength; i++) { 
    var p = paras.snapshotItem(i); 
    var t= p.textContent
    while (name = re.exec(t)) { 
      nameacc[nameacc.length] = name[1];
    }
    while (name = reand.exec(t)) { 
      GM_log(name[0]);
      nameacc[nameacc.length] = name[1];
      nameacc[nameacc.length] = name[2];
    }
  }
  if (nameacc.length > 0) {
    for (i = 0; i < nameacc.length; ++i) 
    {
      if (i == 0) {
        // list for links to go in
        ul = document.createElement('ul');
      }
      // item for our link
      var li = document.createElement('li');
      // our link
      var a = document.createElement('a');
      a.appendChild( document.createTextNode(nameacc[i]) );
      a.setAttribute('href', 'https://www.google.co.uk/search?q=' + encodeURIComponent(nameacc[i] + ' imdb') + '&tbs=li:1');
      // put it in the item
      li.appendChild(a);
      // put the item in the list
      ul.appendChild(li);
    }
    p.appendChild(ul);    
  }
} else {
  GM_log("epdiv not found");
}