// ==UserScript==
// @name           userscripts.org alternate CSS
// @fullname       userscripts.org alternate CSS
// @description    Enhancing userscripts.org
// @author         GIJoe
// @version        1.051
// @licence        http://creativecommons.org/licenses/by-sa/3.0/
// @license        (CC) by-sa
// @namespace      http://userscripts.org/scripts/show/34698
// @include        http://userscripts.org/*
// @include        https://userscripts.org/*
// ==/UserScript==

( function() {

//======== Useful Sub-routines =====
$=function(name) { return document.getElementById(name); }
GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
  var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
  var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
  if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
  return sel;
}

//---
function previousElement(el) { do { el=el.previousSibling; } while(el && el.nodeType!=1); return el; }
function nextElement(el) { do { el=el.nextSibling; } while(el && el.nodeType!=1); return el; }
function removeElement(el) { if(el) { el.parentNode.removeChild(el); } }
function removeElementByName(name) { removeElement($(name)); }

//---
function getAbsoluteTop(el) { var AbsTop=0; while(el) { AbsTop=AbsTop+el.offsetTop; el=el.offsetParent; } return(AbsTop); }
function scrollToElem(el,way) { // way=true -> down / way=false -> up
  var nval=getAbsoluteTop(el);
  if(!way) { nval=Math.max(0,nval-document.documentElement.clientHeight+el.offsetHeight); }
  scrollTo(document.documentElement.scrollLeft,nval);
}

//======== Routines ================

// Extend rows
function more_rows_in_script_description_extended() {
  var el=document.evaluate('//textarea[@id="script_description_extended"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if(el) { el.setAttribute('rows','40'); }
  var gn=$('guide_body');
  if(gn) { gn.setAttribute('rows','60'); gn.style.setProperty('height','auto',''); }
  var gd=$('group_description');
  if(gd) { gd.setAttribute('rows','60'); gd.style.setProperty('height','auto',''); }
}
function extend_file_input() {
  var el=document.evaluate('//input[(@id="src") and (@type="file")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  if(el) { el.setAttribute('size','100'); }
  var gn=$('guide_name');
  if(gn) { gn.setAttribute('size','100'); }
  var grn=$('group_name');
  if(grn) { grn.setAttribute('size','100'); }
}

// bind_change_wrap()
const WRAP_TO_ON  = 'Enable Word Wrap';
const WRAP_TO_OFF = 'Disable Word Wrap';
function change_wrap(wrap) {
  var elems=document.evaluate('//pre', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(elems) {
    var elems_lg=elems.snapshotLength;
    for(var h=0;h<elems_lg;h++) {
      var elem=elems.snapshotItem(h);
      if(elem) {
        if(wrap) { elem.setAttribute('wrap','on'); }
        else { elem.setAttribute('wrap','off'); }
} } } }

function toggle_wrap(e) {
  var btElem1=$('wrap-button1');
  var btElem2=$('wrap-button2');
  if(btElem1) {
    if(btElem1.textContent==WRAP_TO_ON) {
      change_wrap(true);
      btElem1.textContent=WRAP_TO_OFF;
      if(btElem2) { btElem2.textContent=WRAP_TO_OFF; }
    } else {
      change_wrap(false);
      btElem1.textContent=WRAP_TO_ON;
      if(btElem2) { btElem2.textContent=WRAP_TO_ON; }
  } }
  e.target.blur();
}

function create_wrap_buttons(elem) {
  elem.setAttribute('wrap','off');
  var btElem1=document.createElement('button');
  btElem1.setAttribute('style','width:180px; margin-top:3px;');
  btElem1.textContent=WRAP_TO_ON;
  var btElem2=btElem1.cloneNode(true); 
  btElem1.setAttribute('id','wrap-button1');
  btElem2.setAttribute('id','wrap-button2');
  btElem1.addEventListener('click',toggle_wrap,true);
  btElem2.addEventListener('click',toggle_wrap,true);
  elem.parentNode.insertBefore(btElem1, elem);
  elem.parentNode.insertBefore(btElem2, elem.nextSibbling);
}
function bind_change_wrap() {
  var elem=$('scripts-review');
  if(!elem) { elem=$('jetpacks-source'); }
  if(elem) {
    elem=$('source');
    if(!elem) { elem=document.evaluate('//pre',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; }
    if(elem) { create_wrap_buttons(elem); Create_ChangeTabToSpace_button(elem); }
    return;
  }
  var elem=$('scripts-diff');
  if(elem) {
    elem=document.evaluate('//pre',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
    if(elem) { create_wrap_buttons(elem); Create_ChangeTabToSpace_button(elem); }
    return;
} }
function changeTabsToSpace(e,valElem,elem) {
  var val=parseInt(valElem.value,10); if(isNaN(val)) { return; }
  val=Math.max(0,Math.min(99,val)); valElem.value=val;
  var rep=''; for(var h=0;h<val;h++) { rep+=' '; };
  elem.innerHTML=elem.innerHTML.replace(/\t/g,rep);
  e.target.setAttribute('DISABLED','DISABLED');
  valElem.setAttribute('DISABLED','DISABLED');
}
function Create_ChangeTabToSpace_button(elem) {
  var btElem1=document.createElement('button');
  btElem1.setAttribute('style','width:180px; margin-left:20px;');
  btElem1.textContent='Change Tabs to Spaces';
  var taElem1=document.createElement('input'); taElem1.setAttribute('type','text');
  taElem1.setAttribute('style','width:24px; height:17px; position:relative; top:0px; margin:0; padding:0; margin-left:3px; text-align:right;');
  taElem1.setAttribute('maxlength','2');
  taElem1.setAttribute('onClick','this.focus();this.select();');
  taElem1.value=2;
  elem.parentNode.insertBefore(btElem1, elem);
  elem.parentNode.insertBefore(taElem1, elem);
  btElem1.addEventListener('click', function(e) { changeTabsToSpace(e,taElem1,elem); e.target.blur(); },true);
}


function createBottomTop(div1,div2) {
  var Elem1=document.createElement('a');
  Elem1.textContent=String.fromCharCode(8659);
  Elem1.setAttribute('href','#bottom_pagination');
  Elem1.setAttribute('title','Bottom pagination');
  Elem1.setAttribute('style','margin-right:4px; cursor:pointer;');
  div1.insertBefore(Elem1,div1.firstChild);
  div1.setAttribute('id','top_pagination');
  var Elem2=document.createElement('a');
  Elem2.textContent=String.fromCharCode(8657);
  Elem2.setAttribute('href','#top_pagination');
  Elem2.setAttribute('title','Top pagination');
  Elem2.setAttribute('style','margin-right:4px; cursor:pointer;');
  div2.insertBefore(Elem2,div2.firstChild);
  div2.setAttribute('id','bottom_pagination');
  Elem1.addEventListener('click',function(event) { scrollToElem(div2,false); event.preventDefault(); },true);
  Elem2.addEventListener('click',function(event) { scrollToElem(div1,true ); event.preventDefault(); },true);
}

function duplicate_pagination() {
  var divs=document.evaluate('//div[contains(@class,"pagination")]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
  if(divs) {
    var lg=divs.snapshotLength;
    if(lg==2) { createBottomTop(divs.snapshotItem(0),divs.snapshotItem(1)); }
    if(lg!=1) { return; }
    var div=divs.snapshotItem(0);
    var pdiv=div.parentNode;
    var content=document.evaluate('.//table',pdiv,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
    if(!content) { content=document.evaluate('.//ul[not(contains(@id,"script-nav"))]',pdiv,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; }
    if(!content) { return; }
    var curs=pdiv.firstChild;
    var after=false;
    while(true) {
      if(curs==div) { break; }
      if(curs==content) { after=true; break; }
      curs=curs.nextSibling;
      if(!curs) { return; }
    }
    var pag2=div.cloneNode(true);
    if(after) {
      pdiv.insertBefore(pag2,content);
      createBottomTop(pag2,div);
    } else {
      pdiv.insertBefore(pag2,content.nextSibling);
      createBottomTop(div,pag2);
} } }

function AddBottomTop() {
  var navdiv=document.evaluate('//div[@id="header"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
  if(!navdiv) { return; }
  var contdiv=document.evaluate('.//div[@class="container"]',navdiv,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
  var footdiv=document.evaluate('//div[@id="footer"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
  if(!contdiv || !footdiv) { return; }

  var div1=document.createElement('div');
  div1.setAttribute('class','alt_topbottom');
  div1.setAttribute('style','float:left; position:absolute;');
  var Elem1=document.createElement('a');
  Elem1.setAttribute('href','#footer');
  Elem1.setAttribute('title','Bottom');
  Elem1.setAttribute('style','position: absolute; top:7px; left:5px; background:url(data:image/gif;base64,R0lGODlhEAAQAIABAP///8zMzCH5BAEAAAEALAAAAAAQABAAAAIfjI+pywidgIRHPhosvDorDU6RRV5faS4l1rHYC8dBAQA7) 1px 1px; padding:1px !important; margin:0 !important');
  div1.appendChild(Elem1);
  Elem1.addEventListener('click',function(event) { scrollTo(document.documentElement.scrollLeft,document.documentElement.scrollHeight); event.preventDefault(); },true);
  navdiv.insertBefore(div1,navdiv.firstChild);
  contdiv.style.setProperty('margin-left','40px','');

  var div2=document.createElement('div');
  div2.setAttribute('class','alt_topbottom');
  div2.setAttribute('style','float:left; position:absolute; z-index:1;');
  var Elem2=document.createElement('a');
  Elem2.setAttribute('href','#header');
  Elem2.setAttribute('title','Top');
  Elem2.setAttribute('style','position: absolute; top:9px; left:5px; background:url(data:image/gif;base64,R0lGODlhEAAQAIABAP///8zMzCH5BAEAAAEALAAAAAAQABAAAAIejI+pywidgIRGWmgzy1zdP0VV+DQXFZyUuqLuCwcFADs=) 1px 1px; padding:1px !important; margin:0 !important');
  div2.appendChild(Elem2);
  Elem2.addEventListener('click',function(event) { scrollTo(document.documentElement.scrollLeft,0); event.preventDefault(); },true);
  footdiv.insertBefore(div2,footdiv.firstChild);
}

function add_missing_buttons() {
  const LISTE={
      "Jetpacks": ["/jetpacks","Scripts"]
    , "Groups"  : ["/groups"  ,"Blog"   ]
    , "Guides"  : ["/guides"  ,"Groups" ]
  }
  var mm=$('mainmenu');
  if(!mm) { return; }
  for(var key in LISTE) {
    var data=LISTE[key];
    var btn=document.evaluate('.//a[contains(text(),"'+key+'")]', mm, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    if(btn) { continue; }
    btn=document.evaluate('.//a[contains(text(),"'+data[1]+'")]', mm, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    if(!btn) { continue; }
    nav=nextElement(btn.parentNode);
    var liElem=document.createElement('li');
    var aElem =document.createElement('a');
    aElem.setAttribute('href',data[0]);
    aElem.textContent=key;
    liElem.appendChild(aElem);
    btn.parentNode.parentNode.insertBefore(liElem,nav);
} }

function fixJetpacksPage() {
  var jp=document.evaluate('//body[contains(@class,"jetpacks")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  if(jp) {
    var el=document.evaluate('.//a[contains(text(),"Jetpacks")]', jp, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    if(el) { el.parentNode.setAttribute('class','active'); }
} }

function addFeedback() {
  var ls=document.evaluate('//ul[@class="login_status"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  if(ls) {
    var liElem=document.createElement('li');
    var aElem =document.createElement('a');
    aElem.setAttribute('href','http://userscripts.uservoice.com/');
    aElem.textContent='Feedback';
    liElem.appendChild(aElem);
    ls.appendChild(liElem);
} }

function newTopicReplaceText() {
  var aElem=document.evaluate('//a[starts-with(@href,"/topics/new?forum_id=") and starts-with(text(),"New topic")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  if(aElem) { aElem.textContent='New topic'; }
}

function addViewSource() {
  var aElems=document.evaluate('//a[starts-with(@href,"/scripts/version/") and (text()="install")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if(aElems) {
    for(var h=0,lg=aElems.snapshotLength;h<lg;h++) {
      var aElem=aElems.snapshotItem(h);
      var tEl=document.createTextNode(' | ');
      var aEl=document.createElement('a');
      aEl.setAttribute('href',aElem.getAttribute('href')+'?view_source');
      aEl.textContent='view';
      aElem.parentNode.insertBefore(aEl,aElem.nextSibling);
      aElem.parentNode.insertBefore(tEl,aElem.nextSibling);
} } }

function swapTopicsAndReview() {
  function AddTD(p_tr,rs,data,css) {
    var td=document.createElement('td');
    td.setAttribute('style','border:0px none; vertical-align:top;'+css);
    switch(rs) {
      case 1: td.setAttribute('rowspan','2'); break;
      case 2: td.setAttribute('colspan','2'); break;
    }
    p_tr.appendChild(td);
    td.appendChild(data);
  }
  var ct=$('content');
  var sm=$('summary');
  var tp=$('topics');
  var ac=$('activity');
  var pa=document.evaluate('//div[contains(@class,"postactions")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

  if(ct && sm) {
    var tel=document.createElement('table');
    tel.setAttribute('style','border-collapse: collapse; border:0px none; margin:0; padding:0; font-size:1em;');
    var tr1=document.createElement('tr');
    tel.appendChild(tr1);
    AddTD(tr1,0,sm,'');
    if(tp) { AddTD(tr1,0,tp,' width:260px; padding-left: 0; padding-right: 11px;'); }
    if(ac) { AddTD(tr1,0,ac,' width:150px;'); }
    ct.insertBefore(tel,ct.firstChild);
  }
  var is=$('install_script');
  var de=$('details');
  if(is && de) {
    de.parentNode.insertBefore(is,de);
} }

function showNoTextLinks() {
  var aElems=document.evaluate('//a[not(@style) and not(@class) and not(text())]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if(aElems) {
    for(var h=0,lg=aElems.snapshotLength;h<lg;h++) {
      var aElem=aElems.snapshotItem(h);
      if(aElem.childNodes.length<1) { aElem.textContent='('+aElem.href+')'; }
} } }

function removeInlineTextAreaStyles() {
  var elems=document.evaluate('//textarea', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(elems) {
    for(var h=0,lg=elems.snapshotLength;h<lg;h++) {
      var el=elems.snapshotItem(h);
      el.style.removeProperty('width');
      el.style.removeProperty('height');
} } }


function fixTitle() {
  document.title=document.title.replace(/\&ndash\;/i,String.fromCharCode(8211)).replace(/&amp;/,'&');
}

//*** Add top pagination
duplicate_pagination();
AddBottomTop();

//*** Add Wrap Button
bind_change_wrap();

//*** More rows
more_rows_in_script_description_extended();
extend_file_input();

//*** Add the missing button in the mainmenu when not logged
add_missing_buttons();
addFeedback();
fixJetpacksPage();

//*** Add show source in versions page
addViewSource();

//*** Cosmetic change
newTopicReplaceText();
swapTopicsAndReview();

//*** Fix HTML entities in title
fixTitle();

//Remove inline height and width
removeInlineTextAreaStyles();

//*** may be slow
//showNoTextLinks();

//*** Add css
GM_addGlobalStyle(''
//--- Header & Footer
+' #top,#top ul.login_status { height: 17px; }'
+' #top ul.login_status li { line-height: 16px; }'
+' #header #nav    { width:96% !important; margin-left:28px !important; }'
+' #footer-content { width:96% !important; margin-left:30px !important; }'
+' div#footer .col { width:50% !important; }'
+' #header #nav #mainmenu li a { text-shadow:none; }'
+' #header #script_search { float:right; position:relative; width:238px; }'
+' #header #script_search input[type="text"] { position:absolute; left:0; margin:-2px 2px 0 0; padding:3px 0; width:214px; color:#444444; }'
+' #header #script_search #search-go { position: absolute; top:8px; right:0px }'
+' #header h1 { height: 24px; }'
+' #header #mainmenu li { border-radius: 6px 6px 0pt 0pt; -moz-border-radius: 6px 6px 0pt 0pt; background-color:#221100; }'
+' #header #mainmenu li:hover { background-color:#443311; }'
+' #header #mainmenu li.active:hover { background-color:#EEEEEE; }'

+' #section h2 { padding-top: 0px; }'
+' #section p, #section .about { margin-bottom: 2px; }'
+' #section #section_search input[type="text"] { margin:-2px 4px 0 0; padding:3px 0; width:214px; color:#444444; }'
+' #section #section_search .go { position: absolute; top:1px; right:4px; background-position: 4px 3px; }'
+' body.users #section .avatar .photo { margin-top: 2px; margin-bottom: 2px; }'
+' #section > .container { width: 71% !important; }' 

+' #review-list .overview table { margin:0; padding-left: 2px; }'
+' #review-list .overview tr td:first-child { padding-left:2px; width:66px; }'
+' #review-list .overview table .value { width: 70px; }'
+' #review-list .overview .count { text-align:right; }'
+' #activity p.details { margin-left:0; }'

//--- Content
+' #activity  { font-size: 1.2em; font-family:Tahoma,"Lucida Grande",Arial,Helvetica,sans-serif; float:right !important; }'
+' body#users-show .main h1 { padding-left:5px; }'
+' body#users-show .main > div > div > * { padding-left:5px; }'
+' #activity table td { padding-bottom:2px !important; padding-top:2px !important; }'
+' #topics         { font-size: 1.2em; float:right !important; }'
+' #topics table   { margin-bottom:0px; }'
+' #content #topic-title    { background-color: #FFEEDD; border: 1px solid #CCCCCC; padding: 2px 4px; margin-bottom:0; margin-right: 154px; font-size: 18px; }'
+' #about-summary { margin-bottom: 0; }'
+' #about-summary #topics p.details, #activity p.details { margin-top:0 !important; }'
+' #screenshots    { width:96% !important; }'
+' #homeMenu       { margin-top: -3px !important; width:auto !important; white-space:nowrap; }'
+' .container      { position:relative; width:auto; margin: 0 10px; min-width:760px; }'
+' #content        { float:left; position:relative; left:10px; width:79%; }'
+' #content        { width:71% !important; margin-right:0 !important; }'
+' #content pre    { max-width:none !important; }'
+' #right          { top:5px; font-size:0.9em; right:10px; }'
+' #right          { position:relative; float:right !important; width:25% !important; padding-left:0px !important; margin-left:0px !important; }'
+' #script_sidebar { padding-top:0px; }'
+' table, ul       { margin-bottom:8px; }'
+' #full_description { float:none; }'
+' #about-summary { padding:0 5px; }'
+' #about-summary #summary  { width: auto; }'
+' #about-summary #topics   { width: 260px; margin:0; }'
+' .admin_section  { display:block !important; position:relative !important; float:none !important; margin-left:160px !important; width:auto !important; min-height:450px; }'
+' .admin_section > table { width:500px; }'
+' .admin_section #script_description_extended { height: 600px;  width: 95%; }'
+' .admin_section #script_src { height: 1000px; width: 98%; }'
+' #heading #icon { height:100px; overflow:hidden; }'
+' #scripts-show #heading { width: 71%; }'
+' body.home .subnav, body.users .subnav { position:absolute; top:0; left:0; }'
+' body.home #main  , body.users #main   { margin-left:150px; min-height:500px; width:auto !important; }'

//--- Users
+' body#users-show .user-info { float:none; margin-left: 160px; position:relative; width: auto; } '
+' body#users-show .avatar { width: 120px !important; }'
+' body#users-show .main .box { width: 100% !important; min-height:0; padding:10px 0px !important; }'
+' body#users-show .main #contributions, body#users-show .main #activity { background: #F0F0F0; padding-top:10px; }'

//--- Misc
+' #right #comments ul { list-style-type:disc; }'
+' h1 {font-size:26px !important; line-height: 26px !important;}'
+' h3 {font-size:20px !important; line-height: 20px !important; padding: 2px 10px 2px 10px !important; margin-bottom:2px !important}'
+' p  { margin-top: 0px; }'
+' th a:visited { color:#FFFFEE; }'
+' th a:hover   { color:#FFEE00; }'
+' #content > p { margin-bottom:5px; margin-top:5px; }'
+' .pagination  { margin-bottom:5px; margin-top:0px; }'
+' p.subtitle img { vertical-align:sub; }'
+' #root > .container { margin-top: 5px;}'
+' body.messages #content ul { list-style-type: none; }'

+' textarea,input[type=text] { border-color: #CCCCCC #AAAAAA #AAAAAA #CCCCCC !important; }'
+' #heading #icon img, #heading #avatar img { margin: 1px; margin-left:30px; }'
+' body#users-show #tag-cloud { margin-left: 20px; }'

+' #script-nav li.menu { border-radius: 6px 6px 0pt 0pt; -moz-border-radius: 6px 6px 0pt 0pt; background-color:#E0E0E0; }'
+' #script-nav li.menu:hover { background-color: #E4E4E4; }'
+' #script-nav li.current { border-radius: 6px 6px 0pt 0pt; -moz-border-radius: 6px 6px 0pt 0pt; background-color:#FFFFFF; }'
+' #script-nav li.current:hover { background-color: #FFFFFF; }'

//--- Elements pre / blockquote / code
+' .container            { font-size: 14px; width:auto; }'
+' .container pre        { border-style: solid; border-color: #E0E0E0 #C0C0C0 #C0C0C0 #E0E0E0; border-width: 2px 1px 1px 3px;'
+                        ' margin:6px 0; max-width:none; overflow-x:auto; font-size: 1em; }'
+' .container blockquote { border-style: solid !important; border-width:2px 1px 1px 3px !important; border-color: #CCFFBB #99DD99 #99DD99 #CCFFBB !important;'
+                        ' max-width:none !important; overflow-x:auto !important; padding:5px 10px !important; margin: 6px 0 !important;'
+                        ' background: #DDFFDD !important; font-family:"Lucida Grande",Tahoma,Arial,Helvetica,sans-serif; font-size:1em; }'
+' .container code       { background: #DDDDDD; font-size: 1em; line-height:1.4em; padding-bottom:0.2em; padding-top:0.1em; }'

+' .container pre pre               { font-size: 1em; }'
+' .container pre code              { font-size: 1em; background: #D0D0D0; }'
+' .container pre blockquote        { font-size: 1em; }'
+' .container code pre              { font-size: 1em; }'
+' .container code code             { font-size: 1em; }'
+' .container code blockquote       { font-size: 1em; }'
+' .container blockquote pre        { font-size: 1em; }'
+' .container blockquote code       { font-size: 1em; background: #D0D0D0; }'
+' .container blockquote blockquote { font-size: 1em; }'

+' #summary { font-size:14px; } #topics,#activity,#topics td,#topics th { font-size:12px; }'
+' #topics td,#topics th { padding: 3px 5px 3px 5px; }'
+' #topics td.count { text-align:right; padding-right:8px; }'
+' #topics p { margin-top:1px; margin-bottom:1px; }'
+' #activity h6 { background: none repeat scroll 0 0 #333333; border: 1px solid #222222; color: white; font-size: 1em; padding: 3px 10px; font-weight: bold; }'
+' #activity p.details { text-align:center; min-width:150px; }'
+' #topics p.details { text-align:center; min-width:200px; background-color:#F8F8F8; }'

//--- Full width content
+' .wide #content { width:98% !important; }'

//--- Messages
+' #message_body { width: 98% !important; }'
+' #message_subject { width: 98% !important; }'
+' body.messages #content { width:98% !important; }'
+' body.messages #content .message_info { width:220px !important; }'
+' body.messages #content .message_info .date { display:block; }'
+' body.messages #content li.preview .message_preview { display:block; }'
+' body.messages #content li.preview .message_preview .message { display:block; }'
+' body.messages #content .message_info .controls { position:absolute; right:0; top:0; }'
+' body.messages #content li.full .message_full { width:98% !important; }'

//--- Div hidding
+' #uservoice-feedback-tab { display:none !important; }'
+' #clikball               { display:none !important; }'
+' #uso                    { display:none !important; }'
+' #home-widgets #uso      { display:block !important; }'

//=== http://userscripts.org/
+' body#site-home #browser-news li { height: auto; margin-top:12px; min-height:16px; background-position:8px 0px !important; }'
+' body#site-home #browser-news .greasemonkey { min-height:32px; background-position:0px 0px !important; }'
+' body#site-home #browser-news .webkit { min-height:32px; background-position:0px 0px !important; }'

//=== http://userscripts.org/forums/*/topics/*
//=== http://userscripts.org/users/*/comments
//=== http://userscripts.org/users/*/script_comments
+' table.wide { table-layout:fixed; width:100%; }'

//=== http://userscripts.org/forums
//=== http://userscripts.org/scripts
//=== http://userscripts.org/users/*/scripts
+' table.wide.topics, table.wide.forums { table-layout:auto; }'

//=== http://userscripts.org/forums
+' a.lastpost { position: relative; padding: 0 4px 2px; top: -1px; }'
+' #topic_title,#review_title { width: 50%; border: 2px solid; background: #F8F8F8; }'
+' #review_body { width: 95% }'
+' #topics-new #content #topic-title { display: none; }'
//+' #script-nav .a2a_dd { background: #F0F0FF; border: 1px solid #CCCCFF; line-height: 20px; margin: 0; margin-left:3px; border-radius: 6px; -moz-border-radius: 6px; }'

//=== http://userscripts.org/scripts/edit/*
//=== http://userscripts.org/scripts/edit_src/*
+' #script_name { width:90%; }'
+' #script_summary, #script_location, #script_homepage { width:98%; }'

+' #reviews-edit #review_title { width:90%; }'
+' #reviews-edit #review_body { width:100%; }'
+' #group_description { width:100%; }'

//=== http://userscripts.org/groups
+' #group_list { table-layout:auto; }'
//=== http://userscripts.org/guides
+' .guides table[class=wide] { table-layout:auto; }'

//=== http://userscripts.org/articles
+' #articles-index #content h2 { font-size: 18px; border-top: 1px solid #DDDDDD; } '
+' #articles-index #content h2:first-child { border-top: 0px; } '

//=== Wrap on/off
+' #scripts-review #root > .container, #scripts-diff .container { display :inline-block; padding-right:16px; min-width:95%; }'
+' #scripts-review #content  , #scripts-diff #content   { overflow:visible !important; width:auto !important; min-width:98%; }'
+' .scripts pre[wrap=on] , #jetpacks-source pre[wrap=on]  { white-space: pre-wrap; }'
+' .scripts pre[wrap=off], #jetpacks-source pre[wrap=off] { overflow:visible !important; }'

+' .awesome, .awesome:visited { text-shadow:none; font-size:13px !important; }'
+' .awesome.orange, .awesome.orange:visited { color:#333333; background-color:#FF9900; }'
+' .awesome.orange:hover, .awesome:visited.orange:hover { color:#000000; background-color: #FF7700 ; }'

+' body.users ul.subnav li a { position:relative; }'
+' body.users ul.subnav li a span { float:none; position:absolute; margin:4px; top:0; right:0; }'

//=== Extended
+' .alt_topbottom a,.alt_topbottom a:visited { cursor:pointer; width:17px; height:16px; background-color:#FF8000 !important; border:1px solid #FFAA88;}'
+' .alt_topbottom a:hover,.alt_topbottom a:visited.alt_topbottom a:hover { cursor:pointer; width:16px; height:16px; background-color:#FF6000 !important; border:1px solid #FF9977;}'
);

} )();
