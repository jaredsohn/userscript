// ==UserScript==
// @name           BATracer Player Profile Enhancer
// @namespace      ""
// @include        http://batracer.com/-us
// @include        http://batracer.com/-us#*
// @include        http://batracer.com/-us?*
// @include        http://batracer.com/-us?*#*
// ==/UserScript==

var href = window.location.href;
var rankingURL = href.replace("us","cw");
if (rankingURL.indexOf('#') > 0) {
	rankingURL = rankingURL.substring(0, rankingURL.indexOf('#'));
}
var allDivs = document.getElementsByTagName('div');
var n = allDivs.length;
var allTables = document.getElementsByTagName('table');

allTables[0].innerHTML = '<a name="top"></a>'+allTables[0].innerHTML;

if(n == 13){
//allDivs[7].innerHTML = '<font size=1><a href="#profile">Description</a> | <a href="#guestbook">Guestbook</a> | <a href="#active">Active Games</a> | <a href="#archive">Archived Games</a> | <a href="#cv">Racing CV</a></font><br/><br>';
allDivs[8].innerHTML = '<a name="profile"></a>'+allDivs[8].innerHTML+'   <font size=1><a href="#top>top</a></font>';
allDivs[9].innerHTML = '<a name="guestbook"></a>'+allDivs[9].innerHTML+'   <font size=1><a href="#top>top</a></font>';
allDivs[10].innerHTML = '<a name="active"></a>'+allDivs[10].innerHTML+'   <font size=1><a href="#top>top</a></font>';
allDivs[11].innerHTML = '<a name="archive"></a>'+allDivs[11].innerHTML+'   <font size=1><a href="#top>top</a></font>';
allDivs[12].innerHTML = '<a name="cv"></a>'+allDivs[12].innerHTML+'   <font size=1><a href="#top>top</a></font>';

var joe = document.createElement('div');
joe.innerHTML = '<font size=1><a href="#profile">Description</a> | <a href="#guestbook">Guestbook</a> | <a href="#active">Active Games</a> | <a href="#archive">Archived Games</a> | <a href="#cv">Racing CV</a> | <a href="' + rankingURL + '"> World Ranking</a></font><br><br>';
allTables[3].parentNode.insertBefore(joe, allTables[3]);
}

if(n == 14){
//allDivs[7].innerHTML = '<font size=1><a href="#profile">Description</a> | <a href="#guestbook">Guestbook</a> | <a href="#active">Active Games</a> | <a href="#archive">Archived Games</a> | <a href="#cv">Racing CV</a></font><br><br>';
allDivs[9].innerHTML = '<a name="profile"></a>'+allDivs[9].innerHTML+'   <font size=1><a href="#top>top</a></font>';
allDivs[10].innerHTML = '<a name="guestbook"></a>'+allDivs[10].innerHTML+'   <font size=1><a href="#top>top</a></font>';
allDivs[11].innerHTML = '<a name="active"></a>'+allDivs[11].innerHTML+'   <font size=1><a href="#top>top</a></font>';
allDivs[12].innerHTML = '<a name="archive"></a>'+allDivs[12].innerHTML+'   <font size=1><a href="#top>top</a></font>';
allDivs[13].innerHTML = '<a name="cv"></a>'+allDivs[13].innerHTML+'   <font size=1><a href="#top>top</a></font>';

var joe = document.createElement('div');
joe.innerHTML = '<font size=1><a href="#profile">Description</a> | <a href="#guestbook">Guestbook</a> | <a href="#active">Active Games</a> | <a href="#archive">Archived Games</a> | <a href="#cv">Racing CV</a> | <a href="' + rankingURL + '"> World Ranking</a></font><br><br>';
allTables[3].parentNode.insertBefore(joe, allTables[3]);
}