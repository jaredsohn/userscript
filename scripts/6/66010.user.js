// ==UserScript==
// @name           custom boards.ie 
// @namespace      http://www.twinstorm.com/boards
// @description    custom css for boards
// @include     http://boards.ie/*
// @include     http://*.boards.ie/*
// ==/UserScript==
 
function addStyle(style)
{
 var head = document.getElementsByTagName("HEAD")[0];
 var ele = head.appendChild(window.document.createElement( 'style' ));
 ele.innerHTML = style;
 return ele;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

 
function removeElement(ElementXpath)
{
 var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 for (i=0; i<alltags.snapshotLength; i++)
 {
  element = alltags.snapshotItem(i);
  element.parentNode.removeChild(element); // Remove this element from its parent.
 }
}

//this adds your own hosted css file - much easier to maintain
//you cant link to physical drive so you must be running a virtual server like wamp or IIS then use localhost or your own website somewhere!

//addGlobalStyle('@import "http://localhost:81/fpss/test.css";');

//comment these style additions if using your own style sheet

//block images
addGlobalStyle('img, map { display:none; !important;}');

//only shows quick reply image since other images are blocked
addGlobalStyle('img[title="Quick reply to this message"]{display:inline-block !important;}');

//table cells and headers etc...
addGlobalStyle('.alt2, .alt2Active, .alt1, .alt1Active, .tcat, .tborder , .thead, td.thead, div.thead, .vbmenu_control{background-color: #fff !important;background-image: none !important;color:#000 !important;}');

//styles the header bar in the default boards.ie beta theme mode (select theme "beta" from user cp to work)
addGlobalStyle('.navitem {	background-color:#fff!important;}');

//self describing css classes

addGlobalStyle('a:link, .vbmenu_control a:link{	color:#454545 !important;	text-decoration:none !important;}');
addGlobalStyle('a:hover, .vbmenu_control a:hover{	color:#5E5E5E !important;	text-decoration:underline !important;}');
addGlobalStyle('a:visited, .vbmenu_control a:visited{	color:#6E6E6E !important;	text-decoration:none !important;}');
addGlobalStyle('body{background-color:#fff!important;}');
addGlobalStyle('.tborder{	border-color:#eee !important;}');
addGlobalStyle('.bigusername{	font-size:.8em !important;	font-weight:normal !important;}');
 
//removes boards.ie search with google table cell
removeElement("//td[@width='300']");
 
//removes gap between links at top and main forums below
removeElement("//table[@id='topbar']");
 
//come back to this one later
removeElement("//div[@width='300px']");
 
//change site title
document.title="myboards";
 
//remove favicon - not working with boards - must be done thru js or css
var links = document.getElementsByTagName('link');
 for(i=0; i<links.length; i++){
  var link = links[i];
  if (link.rel == "shortcut icon"){
          var head = link.parentNode;
                head.removeChild(link);
               // head.appendChild(f);
                break;
  }
 }