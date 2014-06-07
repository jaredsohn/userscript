/* Ads remover and IMDB link adder
	By: majinsoftware
	Date: Jan.7.2009
	Version: 0.02

*/
// ==UserScript==
// @name		Watch-Movies.net enhancer
// @namespace		majinsoftware
// @description	        Remove ads and adds IMDB link for each movie
// @include		http://*watch-movies.net/*
// ==/UserScript==
//
// Use of platypus to remove ads and make this script
// aswell as most of the imdb link code taken from  
// Steeev http://steeev.freehostia.com script


ais=unsafeWindow.document.getElementsByTagName('a');


for (i=0;i<ais.length;i++) {
  if (ais[i].textContent!='' && (ais[i].textContent.replace("\"",'','g').length > 1) && (!ais[i].href.match(/#comments/))) {
    if (ais[i].getAttribute('href').match(/\/movies\//)) {  
        mtitle=encodeURIComponent(ais[i].textContent.replace("\"",'','g'));
	IMDB='<img src="data:image/gif;base64,R0lGODlhIQAQAOZ%2FAIiHfNu6NK%2BiZrukRsWsTP3mcdS6Tt7HZ%2BzSZs67Zt3BUubNZfvvvdjTuP%2F%2BS9W0LbabKtbLmeTBMry3nv763KydVvPONr25o%2BjUdv%2FoOPHTVdW9VfvcWf%2F%2Bgf%2FzWbGgWf%2F7ZHl3bf7%2B%2FigoJuC9MMazXkREQ%2BPERf%2FrWe7RWPTTTBYXGOniwzMzM6mnloZ%2FXnRuSOzNS9y%2BRP7cPPjea%2F%2F1d5WRfAMDB6uki8urKcyzT%2FTZav%2F0Y' +
	'FRTTP7udTIwKf%2FcM3lxTOHFUfvUN%2F7cTN3RfHZwVP7jRMC8pP%2F4fbyfJv%2FtR%2BLFTtXFft3LeXBqU8G1hcq9djcxGf%2F3Sv%2FhTO3PUvXbaPr59cSmKf%2F%2BaOjGPlhWUNC3TmdmYcGjJw8ODB4fI%2BLIXceoKte5P6GII6CMObOcPPj16ePCPPbXVPzeUOvKPurKRP%2FzRY%2BCS9CvLT9AP7%2BvZQwOGRASGvDUZO%2FXbM%2BxNOTHU9PBcNrHebOiWsWrQP%2F1jP%2FdQwAAAP%2F%2F%2FyH5BAEAAH8ALAAAAAAhABAAAAf%2FgH9%2FFDVJHYeIiUmLNTU%2BPgUFNDsICAsbLCJ%2FIiJ8GVMOoaKjU1NtS0tHR30zQxZrWhIPOmciDD5LSTwgIB4gWVkePMAewjw8KGppHBwxJzIyAQ9cDTRAPlR1LzAYAkEwG1EwMBVNQedudlbbBhYSAWN2OXo0VAUZRXJ%2BET1%2BfjYh%2FD3B4efGHD9SIoDxA2WBDAkG9syrRwPfnBsRtvgL0cWfEYI%2FXPj5gmSEHzhgRoxRIFHPDiJWLGLU6GeLiRt%2BPvr5MeHGlwkmAYC5keDOHjF66sCc4eQiv5NzVsDJCbLnT5NIWhA1iuUDAhV0gDTF2C8gmI46efoE6meC1gQKyAZ4%2BbBABYIhY58CuPEjYNoLa01eeBt37oIYC%2FAefOpCKgCqfkY8JmnSxQ8%2FcAco%2BXDgRBgLeZz2uzBiiw3IN3D2aLBQK5gDBsxs3kDijpYqegTUKSEAQxw8ByoAryCAOIYUH%2BLEcRNlwQAISso9IIFGyzI2KjhUSaOhCgcNMTR0r6LAABMmY4QYeA6BDJQrLBSQICGhvv378wNIe%2FDgTY4cYmDhhRJKlNHAFZuwsAcXXBjg4IMOMsigDhQSYCEBA2Q4gBkNaBIIADs%3D">';

      imdblinkspan=document.createElement('span');
      imdblink=' <a style="color:grey !important; font-size:9px !important" target=new href="http://www.google.com/search?hl=en&q=' + mtitle + '+site:www.imdb.com&btnI=Im Feeling Lucky">' + IMDB  + '</a>'; //ais[i].textContent + ' @ 
      imdblink+=''; 

      imdblinkspan.innerHTML=imdblink;
if (!ais[i].href.match(/comments/) && (ais[i].textContent!='Movie') && (!ais[i].href.match(/discuss/)) && (!ais[i].href.match(/reviews/)) && (!ais[i].href.match(/playlists/))){
      ais[i].parentNode.insertBefore(imdblinkspan, ais[i].nextSibling);
}
    }
  }
}



function do_platypus_script() {
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<iframe src="http:\/\/85\.17\.212\.147\/a\.php\?c=728x90" framespacing="0" marginheight="0" marginwidth="0" scrolling="no" width="728" frameborder="no" height="90"><\/iframe>/,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[6]/TBODY[1]/TR[1]/TD[5]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[7]/TBODY[1]/TR[1]/TD[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[6]/TBODY[1]/TR[1]/TD[2]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/CENTER[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");


function walk_down(node, func) {
  if (node.nodeType == 1) {
    if (node.tagName != "IMG") func(node);
    if (node.childNodes.length != 0)
      for (var i=0; i<node.childNodes.length; i++)
walk_down(node.childNodes.item(i),func);
  }
}
function make_bw(doc, node) {
  walk_down(node,
            function (node) {
      if (node.tagName != 'A') {
  node.bgcolor = "white";
  node.color = "black";
  node.style.backgroundColor = "white";
  node.style.color = "black";
  node.style.backgroundImage = "";
      }});
}
function center_it(doc, node) {
  var center_node = doc.createElement ("CENTER");
  node.parentNode.insertBefore(center_node, node);
  node.parentNode.removeChild(node);  
  center_node.appendChild(node);
  return center_node;
};
function erase_it(doc, node) {
  var offset_height = node.offsetHeight;
  var offset_width = node.offsetWidth;
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "height: "+offset_height+"; width: "+offset_width+";");
  node.parentNode.insertBefore(replacement_div, node);
  node.style.display = "none";
  return replacement_div;
};
function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};
function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
function script_paste(doc, where, what) {
    var new_node = what.cloneNode(true);
    new_node.style.display = "";
    where.parentNode.insertBefore(new_node, where);
};
function isolate(doc, node) {
  if (!node.parentNode) return;
  node.parentNode.removeChild(node);
  while (doc.body.childNodes.length > 0) {
    doc.body.removeChild(doc.body.childNodes[0]);
  };
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "margin: 0 2%; text-align: left");
  replacement_div.appendChild(node);
  doc.body.appendChild(replacement_div);
};
function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};
function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
node.href = node.href.replace(match_re, replace_string);
    };
};
function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
var allurls = doc.getElementsByTagName('A');
for(var i = 0, url; url = allurls[i]; i++)
  modify_single_url(doc, match_re, replace_string, url);
    } else {
modify_single_url(doc, match_re, replace_string, node);
    };
};
function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};
function relax(doc, node) {
  walk_down(node, function (node) {
      node.style.width = 'auto';
      node.style.marginLeft = '0pt';
      node.style.marginRight = '0pt';
      if (node.width) node.width = null; });
}
function fix_page_it(doc, node) {
    doc.background = null;
    doc.bgColor = "white";
    if (doc.style) {
      doc.style.backgroundColor = "white";
      doc.style.backgroundImage = "none";
      if (doc.style.color == "white") {
doc.style.color = "black";
      };
      if (doc.text == "white") {
doc.text = "black";
      };
    };
    doc.body.background = null;
    doc.body.bgColor = "white";
    if (doc.body.style) {
      doc.body.style.backgroundColor = "white";
      doc.body.style.backgroundImage = "none";
      if (doc.body.style.color == "white") {
doc.body.style.color = "black";
      };
      if (doc.body.text == "white") {
doc.body.text = "black";
      };
    };
};
function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
parent.insertBefore(newNode, refChild);
    else
parent.appendChild(newNode);
};
function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
};
function auto_repair_it(doc, node) {
  Dump("In auto_repair_it...");
  var biggest_elem = find_biggest_elem(doc);
  Dump("biggest_elem = "+biggest_elem);
  isolate(doc, biggest_elem);
  Dump("After isolate.");
  relax(doc, biggest_elem);
  Dump("After relax.");
  make_bw(doc, biggest_elem);
  Dump("After make_bw.");
  fix_page_it(doc, biggest_elem);
  Dump("After fix_page_it.");
};
function find_biggest_elem(doc) {
  const big_element_limit = 0.25;
  var size_of_doc = doc.documentElement.offsetHeight *
      doc.documentElement.offsetWidth;
  var body = doc.body;
  var size_of_body = body.offsetHeight * body.offsetWidth;
  if (size_of_body < (0.80 * size_of_doc)) {
      size_of_body = size_of_doc;
  };
  var max_size = 0;
  var max_elem = doc;
  /*  
  var allElems = doc("//*",
     doc, null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
  Dump("allElems = "+allElems);
  Dump("allElems.snapshotLength = "+allElems.snapshotLength);
  for (var i = 0; i < allElems.snapshotLength; i++) {
    var thisElem = allElems.snapshotItem(i);
  */
    
  var allElems = doc.getElementsByTagName("*");
  Dump("allElems = "+allElems);
  Dump("allElems.snapshotLength = "+allElems.length);
  for (var i = 0; i < allElems.length; i++) {
      var thisElem = allElems[i];
      var thisElem_size = thisElem.offsetHeight * thisElem.offsetWidth;

      if (thisElem_size < size_of_body &&
  thisElem_size > max_size &&
  !contains_big_element(thisElem, size_of_body * big_element_limit)) {
  max_size = thisElem_size;
  max_elem = thisElem;
      };
  };
  Dump("Max elem = "+max_elem.tagName);
  return max_elem;
};

function contains_big_element(node, limit) {
    if (node.childNodes.length != 0)
for (var i=0; i<node.childNodes.length; i++) {
    var child = node.childNodes.item(i);
    var child_size = child.offsetHeight * child.offsetWidth;
    if (child_size > limit) return true;
};
    return false;
};

function platypus_do(win, func_name, o, other, other2, other3) {
    var func = eval(func_name);
    var doc = null;
    if (func == null) return;
    if (!o) {
Warning(platypusplatypuscouldntfi1+
func_name+platypusthisusuallyhappens);
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
};

//.user.js
