// ==UserScript==
// @name            NWS Tabular Forecast
// @namespace       www.userscripts.org
// @include         http://forecast.weather.gov/MapClick.php?*&FcstType=digital*
 
// ==/UserScript==

// IMPORTANT: This script depends on the following items -- and only the following 
// items -- being selected when you Show Menu on the NWS Tabular page: Temperature,
// Surface Wind (mph), Sky Coverage, Precipitation Potential, Relative Humidity, Quantitative Precipitation 6-hr 0.10. 
// After you have made your selection, you can Hide Menu.

function do_platypus_script() {

// Add Day of Week to the appropriate columns

t = document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[3]/TD[2]/FONT[1]/B[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
h = t.textContent;

var d = new Date();
var weekday=new Array(7);
weekday[0]="Sun";
weekday[1]="Mon";
weekday[2]="Tue";
weekday[3]="Wed";
weekday[4]="Thu";
weekday[5]="Fri";
weekday[6]="Sat";

x1 = d.getDay();
if ((h == "01")) {
  // Today's day of the week will be in w2 rather than w1.  When h=="00" this is not a problem.
  if (x1 > 0) {x1 = x1 - 1;} else {x1 = 6;};
};
w1 =  "<b>" + weekday[x1] + "_</b>";
if (x1 < 6) {x2 = x1 + 1;} else {x2 = 0;};
w2 =  "<b>" + weekday[x2] + "_</b>";
if (x2 < 6) {x3 = x2 + 1;} else {x3 = 0;};
w3 =  "<b>" + weekday[x3] + "_</b>";

a = 27 - h;
if (a > 25) {a = 3;}

if (a > 4) {
document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[2] /TD[3]    /FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML = w1;
           };
document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[2] /TD['+a+']/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML = w2;
document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[13]/TD['+a+']/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML = w3;

// Fix row titles to take up exactly one line

do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/Temperature \(°F\)/g,'Temperature(°F)',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/Rel. Humidity \(%\)/g,'RelativeHumid%',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/Wind Dir/g,'Wind Direction',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/Pcpn. Potential \(%\)/g,'Pcpn Pot %',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/Sky Cover \(%\)/g,'Sky Cover %',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/Gust/g,'Gust (mph)',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/6hr Prob QPF 0.10/g,'P[Px>.10"]',null);

// Original table rows
// 1 = horizontal line;  2 = Date;  3 = Hour;  4 = Temp;  5 = Wind speed;  6 = Wind Direction;  7 = Gust;  8 = Sky Cover;  9 = Precip. Pot.;  10 = Relative Humidity;  11 = PQPF;
// 12= horizontal line; 13 = Date; 14 = Hour; 15 = Temp; 16 = Wind speed; 17 = Wind Direction; 18 = Gust; 19 = Sky Cover; 20 = Precip. Pot.;  21 = Relative Humidity;  22 = PQPF;

// Delete right brackets in PQPF lines to reflect open intervals at the right boundaries in contrast to closed interval at the left boundaries
c = 2;
do {
    do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[11]/TD['+c+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/]/,'',null);
    do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[11]/TD['+c+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/\[/,'|',null);
    do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[22]/TD['+c+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/]/,'',null);
    do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[22]/TD['+c+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/\[/,'|',null);
    c++;
    }
while (c <= 25);

// Change cell formats to improve readability

r = 2;
    c = 1;
    do {
        x = document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR['+r+']/TD['+c+']/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        if (x.innerHTML != ""){ 
        set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR['+r+']/TD['+c+']/FONT[1]/B[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,                     "font-size: small;",null,null);
          };
        c ++;  
       }
    while (c <= 25);

r = 3;
    c = 1;
    do {
        set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR['+r+']/TD['+c+']/FONT[1]/B[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,                     "font-size: small;",null,null);
        c ++;  
       }
    while (c <= 25);

r = 4;
do {
    set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR['+r+']/TD[1]/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"font-weight:bolder;font-size: small;",null,null);
    c = 2;
    do {
        set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR['+r+']/TD['+c+']/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"font-weight: lighter;font-size: small;",null,null);
        c ++;  
       }
    while (c <= 25);
    r ++;
   }
while (r <= 11);

r = 13;
    c = 1;
    do {
        x = document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR['+r+']/TD['+c+']/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        if (x.innerHTML != ""){ 
        set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR['+r+']/TD['+c+']/FONT[1]/B[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,                     "font-size: small;",null,null);
          };
        c ++;  
       }
    while (c <= 25);

r = 14;
    c = 1;
    do {
        set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR['+r+']/TD['+c+']/FONT[1]/B[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,                     "font-size: small;",null,null);
        c ++;  
       }
    while (c <= 25);

r = 15;
do {
    set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR['+r+']/TD[1]/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"font-weight: bolder;font-size: small;",null,null);
    c = 2;
    do {
        set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR['+r+']/TD['+c+']/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"font-weight: lighter;font-size: small;",null,null);
        c ++;  
       }
    while (c <= 25);
    r ++;
   }
while (r <= 22);

// Equalize column widths
c = 2;
  do {
      y =             document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[2] /TD['+c+']/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
      if ((y == "")) {
                      document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[2] /TD['+c+']/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML= "88888";
                      set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[2]/TD['+c+']/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;",null,null);
                     };
      c++;
     }
  while (c <=25);

// Rearrange row order in table.  Doing this from bottom to top minimizes problem of renumbering rows after script_paste.

   // Wind Direction before speed (bottom section)
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[17]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
script_paste(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[16]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[17]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
      // Rows above 16 are now incremented by 1.
   // Relative Humidity before wind (bottom section)
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[22]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
script_paste(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[16]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[22]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
      // Rows above 16 are now incremented by 2.
   // Wind Direction before speed (top section)
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
script_paste(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[5]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
      // Rows above 5 are now incremented by 1. Rows above 16 are now incremented by 3.
   // Relative Humidity before wind (top section)
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[11]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
script_paste(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[5]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('/HTML[1]/BODY[1]/TABLE[6]/TBODY[1]/TR[11]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);

// Mash up Clear Sky Chart
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<a href=http://cleardarksky.com/c/LawrenceKSkey.html> <img src="http://cleardarksky.com/csk/getcsk.php?id=LawrenceKS" style="width: 950px; height: 200px; margin-left: 40px"></a> ',true,true);

}; // Ends do_platypus_script

window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");

//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing all the code to implement Platypus
//  actions.  Can be "included" into the Platypus script.
// 

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