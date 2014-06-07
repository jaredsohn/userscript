// ==UserScript==
// @name          GNN High Resolution
// @namespace     http://totalstranger.gnn.tv
// @description   Changes forum/thread/headlines/articles/links/blogs/yard view. Not suitable for resolutions below 1024x768. Created with the help of a Platypus.
// @include       *gnn.tv/threads/*
// @include       *gnn.tv/forum/*
// @include       *gnn.tv/yard/*
// @include       *gnn.tv/users/*
// @include       *gnn.tv/articles/*
// @include       *gnn.tv/headlines/*
// @include       *gnn.tv/links/*
// ==/UserScript==


function do_platypus_script() {
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[2]/DIV[6]/FORM[1]/TEXTAREA[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<A HREF="http://onelook.com/" TARGET="_blank">Dictionary search</A> | <A HREF="http://www.wsu.edu/~brians/errors/errors.html" TARGET="_blank">Common Errors in English</A> | <A HREF="http://en.wikipedia.org/wiki/Main_Page" TARGET="_blank">Wikipedia</A> | <A HREF="http://www.google.com/" TARGET="_blank">Google</A> | <A HREF="http://www.bugmenot.com/" TARGET="_blank">Bugmenot.com</A> | <A HREF="http://www.alternet.org/" TARGET="_blank">AlterNet</A> | <A HREF="http://news.infoshop.org/" TARGET="_blank">Infoshop News</A> | <A HREF="http://www.stats.org/" TARGET="_blank">Stats.org</A> | <A HREF="http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?db=PubMed" TARGET="_blank">PubMed</A>',true,false);
html_insert_it(window.document,document.getElementById('prev'),'<CENTER><A HREF="#Top">Top</A>',false,false);
html_insert_it(window.document,document.getElementById('trail'),'<A HREF="#Bot">Bottom</A></CENTER>',false,false);
html_insert_it(window.document,document.getElementById('trail'),'',false,false);
html_insert_it(window.document,document.getElementById('trail'),'',false,false);
html_insert_it(window.document,document.getElementById('trail'),'',false,false);
html_insert_it(window.document,document.getElementById('trail'),'',false,false);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[2]/SPAN[5]/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<A NAME="Top">',false,false);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/SPAN[1]/CENTER[1]/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<A NAME="Bot">',false,false);
}; 
window.addEventListener("load", function() { do_platypus_script() }, false);


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
  var biggest_elem = find_biggest_elem(doc);
  isolate(doc, biggest_elem);
  relax(doc, biggest_elem);
  make_bw(doc, biggest_elem);
  fix_page_it(doc, biggest_elem);
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
  var allElems = document.evaluate("//*",
 doc.body, null,
 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
 null);
  for (var i = 0; i < allElems.snapshotLength; i++) {
    var thisElem = allElems.snapshotItem(i);
    var thisElem_size = thisElem.offsetHeight * thisElem.offsetWidth;

    if (thisElem_size < size_of_body &&
thisElem_size > max_size &&
!contains_big_element(thisElem, size_of_body * big_element_limit)) {
      max_size = thisElem_size;
      max_elem = thisElem;
    };
  };
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
Warning("Platypus couldn't find a page element when executing the command "+
func_name+".  This usually happens when running a script -- maybe the"+
" web page the script is running on has changed.");
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
};

//.user.jsjs


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addGlobalStyle('body { background: #000000; background-repeat: no-repeat; color: #ffffff; font-size: 10px; line-height: 12px; } #page_id { clear: both; display: block; width: 745px; height: 106px; margin-bottom: 20px; background-color: #000000; background-image: url(http://paregoricspills.com/blog/css/logo2.gif); background-repeat: no-repeat;  } a { text-decoration: none !important; color: #5fab4c !important; } b { color: #5fab4c !important; font-size: 12px !important; } p { color: white !important; font-size: 16px !important; padding-top: 0px; line-height: 18px !important; } h1 {color: white !important; text-align: left; margin: 0px; padding: 1px; padding-bottom: 15px; padding-top: 0px; font-size: 35px; } h2, h3, h4, h5, h6 { color: #ffffff !important; text-align: center; font-size: 20 px; padding-top: 1px; } #preview { background-color: #153100 !important; } td { color: white !important; font-size: 13px; line-height: 14px !important; }  h2 { background-color: #153100 !important; } #headline { background-color: #153100 !important; }  th { text-decoration: underline; color: #699060 !important; font-size: 11px !important; } #date { color: silver !important; } #replies #usr_name { background-color: transparent !important; padding-bottom: 7px; } #replies #usr_image_fl { padding-top: 5px; padding-bottom: 9px; padding-right: 9px; vertical-align: top; width: 0px; } #replies #usr_image_fl img { width: 65px; height: 65px; } #replies #rpl_text {width: 100%; } #site_id {background-color: #153100 !important; } #rpl_max_dt {background-color: #153100 !important; } .summary {background-color: #153100 !important; } .desc {color: white !important; } #_created_dt {background-color: black; } #art_headline {background-color: black; } #usr_name {background-color: black; } #desc {color: #2a6630 !important; font-style: italic !important; } #posted {color: silver !important; }  #body p { width: 720px !important; } #summary { background-image: none !important; background-color: #153100 !important; border-color: #840215 !important } #posted_by { background-color: #153100 !important; height: 140px !important; } #th #cat_title {background-color: #153100 !important; } #th #thr_cnt {background-color: #153100 !important; } #ad-bg img { display: none; } #yard_pub {height: 140px !important; } #lnk { height: 70px; background-color: black; } .element input { margin-top: 15px !important ; margin-bottom: 15px !important ; width: 400px !important ; height: 15px !important ; line-height: 17px !important ; } textarea { height: 320px !important ; width: 730px !important ; } select { margin-top: 15px !important ; margin-bottom: 15px !important ; width: 120px !important ; } .optional { border-left: 7px solid #153100 !important; } .submit {border-left: 7px solid #153100 !important; } #edit_reply textarea { width: 400px !important; } #ad-store { display: none; } #ad-true_lies { display: none } #site_info { display: none; } #left #menu {background-color: #153100; position: absolute; top: 415px !important; } #left #google {position: absolute; top: 390px; z-index: 1;} #control #user a {color: red !important; font-size: 12px;}  #related { background-color: #153100 !important; border-color: #840215 !important; width: 745px; padding: 0px !important; } #asset_content { background-color: #153100 !important; } #page_id h1 {font-size: 25px; opacity: 0.5; } #byline { color: #648464; background-color: #153100 !important; font-weight: bold !important; } ul li { color: white !important; font-size: 15px !important; line-height: 15px;} .byline_article { font-weight: bold !important; font-size: 18px !important ;} #replies #rpl_text div {width: 630px !important; overflow: visible !important; } #replies #rpl_text p {width: 620px; overflow: visible !important;} blockquote { font-style: italic !important; display: table !important; background-color: #004426; } blockquote p em {font-variant: small-caps; } #body {color: silver;} #wrapper #framework #content #pagination #pages { position: fixed;  top: 0px; right: 10px; font-size: 14px; color: red; background-color: black; opacity: .8; z-index: 1 !important;} #content #pagination a {color: #0cff00 !important; text-decoration: underline !important ; } #header h1 { font-size: 16px; position: absolute; top: 0px; left: 215px; width: 700px; overflow: visible; opacity: 0.8;} #replies tr.break { background-color: #004426; background-repeat: no-repeat; height: 3px; } #post a {color: #0cff00 !important; font-size: 9px; opacity: 0.8;} #post {width: 735px; text-align: center !important;} #wrapper #framework #content #trail {font-size: 20px; position: absolute; top: 61px; left: 323px ; color: white; opacity: 0.4;} #wrapper #framework #content #trail img {background-color: white;} #wrapper #framework #content #pagination {width: 750px; } #control #yard img { height: 70px;} #control #user { background-color: #153100 ; opacity: .5 ;position: absolute !important; top: 2px !important; } #control { position: absolute; top: 105px; background-image: url(http://paregoricspills.com/blog/css/hdr_cms.gif); background-position: 0px 186px; background-repeat: no-repeat; background-color: #153100; } #control .headerimg {visibility: hidden; height: 0px; } #control tbody { height: 92px; z-index: 2 !important;} #wrapper #control #user #info {position: absolute; left: 80px; } body, h1, h2, h3, h4, li, td, th, p, textarea {font-family: "Tahoma" !important;} #right_site_info {visibility: hidden; height: 10px;}');
