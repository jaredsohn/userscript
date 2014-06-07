// ==UserScript==
// @name           4chan no ads
// @namespace      none
// @description    Removes all trash from zip boards: rules, ads, blotter, ANNOYING RED TEXT, "life-like ;_;" text ads, and footer. Changes board title to original. Makes links clickable.
// @include        http://zip.4chan.org/*
// ==/UserScript==

function get(str,index){
	var list,elem;
	list=document.evaluate(str,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if(index<0) index=list.snapshotLength+index;
	if(list.snapshotLength>index)
		return list.snapshotItem(index);

	return null;
}
function remove(str,index){
	var elem=get(str,index);
	if(elem)
		elem.parentNode.removeChild(elem);
}

var board=location.pathname.match(/^\/([^\/]*)\//)[1];
var titles={
	jp:	"/jp/ - Japan/General",
}

var title=titles[board];
if(title){
	document.title=title;
	
	var elem=get("//div[@class='logo']",0);
	var banner=elem.children[0];
	var text=document.createElement('b');
	text.textContent=title;
	
	elem.innerHTML="";
	elem.appendChild(banner);
	elem.appendChild(document.createElement('br'));
	elem.appendChild(text);
}

remove("/html/body/div[3]",0);
remove("/html/body/div[3]/form/table/tbody/tr[7]",0);
remove("/html/body/center",0);
remove("/html/body/center",0);

remove("/html/body/hr[3]",0);

//remove("/html/body/hr[2]",0);

remove("/html/body/form/center",0);
remove("/html/body/form/center",0);
remove('//*[@id="navbot"]',0);
remove('//*[@id="footer"]',0);

if(get("/html/body/table/tbody/tr/th/font",0)){

} else{
	remove("/html/body/form/br",-1);
	remove("/html/body/form/br",-1);
}

// This makes links hyper
var list=document.evaluate('//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem2=list.snapshotItem(i);
	var elem=document.createElement('blockquote');
	var s=elem2.innerHTML;
	s=s.replace(/(^|[^"])(http:\/\/[^\s"<>]{93,})<br>/g,'$1$2');
	s=s.replace(/(^|[^"])(http:\/\/[^\s"<>]*)/g,'$1<a href="$2">$2<\/a>');
	elem.innerHTML=s;
	elem2.parentNode.replaceChild(elem,elem2);

}

// This will turn src.cgi to src
var regexp=/\/src\.cgi\//;
var list=document.evaluate("//a",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	elem.href=elem.href.replace(regexp,"/src/");
}

/* Uncomment this to hide all posts by tripfags like me or you
   (you can't use this script if you're anonymous, it will write
   zeroes to your hard drives and delete data, just like bpost
   program from /b/)
*/
/*
var regexp=/<span class="postertrip">/;
var list=document.evaluate(
	'//table',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.innerHTML.match(regexp)){
		elem.parentNode.removeChild(elem);
	}
}
*/

// Uncomment this to hide all posts containig text inside //.
// If you want two different phrases, use /pharse one|phrase two/
// see http://www.google.com/search?q=regex
/*
var regexp=/duly noted/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}
*/
