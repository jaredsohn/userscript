// ==UserScript==
// @name         اعداد تركي-تلوين صفحه الجيش+الشروط المطلوبه /مطلوب اشتراك مميز لتشغيل السكربت Requirements/ Required the participation of distinguished/To run the script
// @namespace         Crayon Army-
// @include         http://test.allieswar.com/Game/Army.aspx*
// @include         http:b*.allieswar.com/Game/Army.aspx*
// ==/UserScript==
function do_platypus_script() {
html_insert_it(window.document,document.getElementById('ctl00_ctl00_CphBody_CphMain_HyperLinkSimulator'),'<a platypus-background-color="" style="" id="ctl00_ctl00_CphBody_CphMain_HyperLinkSimulator" class="Simulator" href="Simulator.aspx">محاكي المعركه</a>',false,false);
html_insert_it(window.document,document.getElementById('ctl00_ctl00_CphBody_CphMain_HyperLink3'),'<a platypus-background-color="" style="" id="ctl00_ctl00_CphBody_CphMain_HyperLink3" class="InjuredMove" href="ArmyInjured.aspx">الجيش المصاب لهذي القريه</a>',false,false);
html_insert_it(window.document,document.getElementById('ctl00_ctl00_CphBody_CphMain_Label18'),'المهام المطلوبه',true,false);
erase_it(window.document,document.getElementById('ctl00_ctl00_CphBody_CphMain_Label18'),null,null,null);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'نقل الغنائم',true,false);
erase_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'ذهاب دون عوده',true,false);
erase_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[3]/TD[1]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'اغتيال الضحيه',true,false);
erase_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[3]/TD[1]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[5]/TD[1]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'يفضل الاستيطان عند العدو',true,false);
erase_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[5]/TD[1]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/HR[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'Preparation and implementation of (Mr. Turki)',false,false);
html_insert_it(window.document,document.getElementById('ctl00_ctl00_ImageButtonFB'),'انتضرونا في النسخه المطوره',false,false);
erase_it(window.document,document.getElementById('ctl00_ctl00_ImageButtonFB'),null,null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: blue;font-weight: bolder;border-style: outset;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: black;font-style: oblique;font-weight: bolder;font-size: medium;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: yellow;background-color: blue;font-style: oblique;font-weight: bolder;font-size: medium;border-style: outset;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: yellow;background-color: blue;font-style: oblique;font-weight: bolder;font-size: medium;border-style: outset;",null,null);
set_style_script(window.document,document.getElementById('ctl00_ctl00_CphBody_CphMain_DropDownListSpeed'),"color: white;background-color: maroon;font-style: oblique;font-weight: bolder;font-size: medium;border-style: outset;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/SPAN[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: maroon;font-weight: bolder;font-size: small;border-style: outset;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/SPAN[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: black;font-weight: bolder;font-size: medium;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/SPAN[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: black;font-weight: bolder;font-size: medium;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[3]/TD[1]/SPAN[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: black;font-weight: bolder;font-size: medium;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[4]/TD[1]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;background-color: black;font-weight: bolder;font-size: medium;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[2]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[5]/TD[1]/SPAN[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: purple;background-color: lime;font-style: oblique;font-weight: bolder;font-size: medium;",null,null);
set_style_script(window.document,document.getElementById('ctl00_ctl00_CphBody_CphMain_LabelRequiredSettlers'),"color: black;background-color: white;font-style: oblique;font-weight: bolder;font-size: medium;border-style: outset;border-width: thick;border-color: black;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: black;font-style: oblique;font-weight: bolder;font-size: medium;border-style: outset;border-width: thick;border-color: black;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/SPAN[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: yellow;background-color: black;font-style: oblique;font-weight: bolder;font-size: medium;border-style: outset;border-width: thick;border-color: black;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/DIV[2]/DIV[1]/SPAN[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: yellow;background-color: gray;font-style: oblique;font-weight: bolder;font-size: medium;border-style: outset;border-width: thick;border-color: black;",null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]/CENTER[1]/DIV[1]/DIV[2]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: navy;background-color: white;font-weight: bolder;font-size: medium;border-style: outset;border-width: thick;border-color: black;",null,null);
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
// 
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