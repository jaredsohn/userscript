// ==UserScript==
// @name           IMDB Also Seen Detector
// @namespace      userscripts-dugeen
// @description    Warns user if IMDB filmography contains works of interest
// @include        http://www.imdb.com/name/*
// ==/UserScript==

// 20120602 Created
// 20120603 Also highlight actor's name if any matches at all
// 20120603 ..unless we expected at least one match
// 20120608 Highlight actor's name if only an expected match, but not so prominently
// 20120610 Also highlight section heading

function go() {
// each of the works we're interested in
works = [
  { title: "Doctor Who", expect: 0 } ,
  { title: "Carry [Oo]n", expect: 0 },
  { title: "The Avengers", expect: 1 },
  { title: "The Prisoner", expect: 0 },
  { title: "Blake'?s", expect: 0} 
];

// make regexes for each work to save compilation time in the loop later
for (var i=0; i < works.length; ++i) {
  works[i].regexp = new RegExp(works[i].title, "");     
}

// get all links
var as = document.evaluate(
"//a"
, document
, null
, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
, null);

var sectionheader;
var hits = 0, unexpected = 0;
if (!!as) {
  var a, t, j, containing, pspda;
  for (var i=0; i < as.snapshotLength; ++i) {
    a = as.snapshotItem(i);
    t = a.textContent;
    // look in the text of a for each of our regexes
    var got = 0;
    for (j=0; j < works.length; ++j) {
      if (works[j].regexp.exec(t)) {
        got = 1;
        ++hits;
        // get the first child of the parent of the first div ancestor of this link, which shd be a div.head
        containing = a.parentNode;
        while (1) {
          if (containing.tagName == 'DIV') break;
          containing = containing.parentNode;
        }
        // previous sibling of containing div's parent shd be a div, but it may be a text node. Go back through the siblings until 
        // we find a DIV, or there are no more
        pspda = containing.parentNode.previousSibling;
        while (pspda && pspda.tagName != 'DIV') {
          pspda = pspda.previousSibling;
        }  
        //.previousSibling;
        // expect     
        if (!pspda) { 
          GM_log('Can\'t highlight section header, as can\'t find it'); 
        } else {          
          if (!works[j].expect) {
            unexpected = 1;
            pspda.style.textTransform = 'uppercase';    
          } else {
            pspda.style.fontStyle = 'italic'; 
          }
        pspda.style.background = 'yellow';
        }
      }
    }
    // if any match found, highlight link
    if (got) {
      a.style.textTransform = 'uppercase';
      a.style.background = 'yellow';
    }
  }
}        
// highlight actor's name in header if any matches
if (hits) {
  var hhs = document.evaluate(
  "//h1[@class='header']"
  , document
  , null
  , XPathResult.FIRST_ORDERED_NODE_TYPE 
  , null);  
  if (!!hhs) {
    var hh = hhs.singleNodeValue;
    if (unexpected) {
      hh.style.textTransform = 'uppercase';
    } else {
      hh.style.fontStyle = 'italic';
    }
    hh.style.background = 'yellow';
  }
}

}

//window.addEventListener("load", go, false);
go();