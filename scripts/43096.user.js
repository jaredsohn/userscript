// ==UserScript==
// @name           Typography EN
// @namespace      N/A
// @include        http://en.wikipedia.org/*
// ==/UserScript==

function getElementsByClass(tag,theClass) {
	var allTags = document.getElementsByTagName(tag);
	var classArray = [];
	for(var k=0;k<allTags.length;k++) {
		if(allTags[k].getAttribute('class') == theClass) {
		classArray[classArray.length] = allTags[k]; }}
	return classArray; }


function repair(tags) {
	for (i=0;i<tags.length;i++) {
		tag = tags[i].innerHTML;
		
		for (j=0;tag.search(/="([^'"]*)'([^'"]*)'([^"]*)"/)!=-1;j++) {
			tag = tag.replace(/="([^'"]*)'([^'"]*)'([^"]*)"/g,"=\"$1§$2§$3\""); }
		for (k=0;tag.search(/="([^"]*)"/)!=-1;k++) {
			tag = tag.replace(/="([^"]*)"/g,"=×$1×"); }
		
		tag = tag.replace(/ "/g," “"); 
		tag = tag.replace(/&nbsp;"/g," “");
		tag = tag.replace(/—"/g,"—“");
		tag = tag.replace(/" /g,"” ");
		tag = tag.replace(/"&nbsp;/g,"”&nbsp;");
		tag = tag.replace(/"<\//g,"”</");
		tag = tag.replace(/"$/g,"”");
		tag = tag.replace(/"\./g,"”.");
		tag = tag.replace(/",/g,"”,");
		tag = tag.replace(/"\?/g,"”?");
		tag = tag.replace(/"!/g,"”!");
		tag = tag.replace(/":/g,"”:");
		tag = tag.replace(/\("/g,"(“");
    tag = tag.replace(/"\)/g,"”)");
		tag = tag.replace(/>"/g,">“");
		tag = tag.replace(/\n"/g,"\n“");
		tag = tag.replace(/([^ >\n])"/g,"$1”");
		tag = tag.replace(/"/g,"“");
		
    if (tag.search(/'/)==0) {tag = tag.replace(/'/,'‘'); }
		tag = tag.replace(/='([^']*)'/g,"=\\$1\\");
		tag = tag.replace(/ '/g,' ‘');
		tag = tag.replace(/'s/g,'’s');
		tag = tag.replace(/' /g,'’ ');
		tag = tag.replace(/\('/g,'(‘');
		tag = tag.replace(/>'/g,'>‘');
		tag = tag.replace(/\n'/g,'\n‘');
		tag = tag.replace(/([^ >\n])'/g,'$1’');
		tag = tag.replace(/=\\([^\\]*)\\/g,"='$1'");
		
		for (l=0;tag.search(/=×([^×§]*)§([^×§]*)§([^×]*)×/)!=-1;l++) {
			tag = tag.replace(/=×([^×§]*)§([^×§]*)§([^×]*)×/g,"=×$1'$2'$3×"); }
		for (m=0;tag.search(/=×([^×]*)×/)!=-1;m++) {
			tag = tag.replace(/=×([^×]*)×/g,"=\"$1\""); }
		
		/*if (tags==h1s || tags==h2s) {
			tag = tag.replace(/="([^"]*)fi([^"]*)"/g,"=\"$1fff,iii$2\"");
			tag = tag.replace(/fi/g,"ﬁ");
			tag = tag.replace(/="([^"]*)fff,iii([^"]*)"/g,"=\"$1fi$2\"");
			tag = tag.replace(/="([^"]*)fl([^"]*)"/g,"=\"$1fff,lll$2\"");
			tag = tag.replace(/fl/g,"ﬂ");
			tag = tag.replace(/="([^"]*)fff,lll([^"]*)"/g,"=\"$1fl$2\""); }*/
		
		tags[i].innerHTML = tag; }}

var title = document.getElementsByTagName('title');
var ps = document.getElementsByTagName('p');
var lis = document.getElementsByTagName('li');
var dls = document.getElementsByTagName('dl');
var h1s = document.getElementsByTagName('h1');
var h2s = document.getElementsByTagName('h2');
var h3s = document.getElementsByTagName('h3');
var as = document.getElementsByTagName('a');
var spans = document.getElementsByTagName('span');
var tds = document.getElementsByTagName('td');
var is = document.getElementsByTagName('i');
var blockquotes = document.getElementsByTagName('blockquote');
var tdsMboxText = getElementsByClass('td','mbox-text');
var dablink = getElementsByClass('div','dablink');

repair(title);
repair(ps);
repair(lis);
repair(dls);
repair(h1s);
repair(h2s);
repair(h3s);
repair(as);
repair(spans);
repair(tds);
repair(is);
repair(blockquotes);
repair(tdsMboxText);
repair(dablink);