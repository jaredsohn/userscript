// ==UserScript==
// @name           ICanHasUncluttered
// @namespace      eric.biven.us
// @description    Unclutter the icanhascheezeburger.com web site
// @include        http://icanhascheezburger.com/
// @include        http://icanhascheezburger.com/page/*
// @include        http://www.icanhascheezburger.com/
// @include        http://www.icanhascheezburger.com/page/*
//
// @include        http://ihasahotdog.com/
// @include        http://ihasahotdog.com/page/*
// @include        http://www.ihasahotdog.com/
// @include        http://www.ihasahotdog.com/page/*
//
// @include        http://roflrazzi.com/
// @include        http://roflrazzi.com/page/*
// @include        http://www.roflrazzi.com/
// @include        http://www.roflrazzi.com/page/*
//
// @include        http://totallylookslike.com/
// @include        http://totallylookslike.com/page/*
// @include        http://www.totallylookslike.com/
// @include        http://www.totallylookslike.com/page/*
//
// @include        http://punditkitchen.com/
// @include        http://punditkitchen.com/page/*
// @include        http://www.punditkitchen.com/
// @include        http://www.punditkitchen.com/page/*
//
// @include        http://graphjam.com/
// @include        http://graphjam.com/page/*
// @include        http://www.graphjam.com/
// @include        http://www.graphjam.com/page/*
//
// @include        http://failblog.org/
// @include        http://failblog.org/page/*
// @include        http://www.failblog.org/
// @include        http://wwwfailblog.orgpage/*
//
// @include        http://engrishfunny.com/
// @include        http://engrishfunny.com/page/*
// @include        http://www.engrishfunny.com/
// @include        http://www.engrishfunny.com/page/*
//
// ==/UserScript==

var html = document.getElementsByTagName('html')[0];
var oldBody = document.getElementsByTagName('body')[0];
var newBody = document.createElement('body');

function getDDL() {
	return (<r><![CDATA[
<script type="text/javascript">
    function newSite(ddl) {
    	document.location.href = ddl.options[ddl.selectedIndex].value;
    }
</script>
<select onChange="javascript:newSite(this);">
    <option value="">--Select a Site--</option>
    <option value="http://icanhascheezburger.com/">icanhascheezburger</option>
    <option value="http://ihasahotdog.com/">ihasahotdog</option>
    <option value="http://roflrazzi.com/">roflrazzi</option>
    <option value="http://totallylookslike.com/">totallylookslike</option>
    <option value="http://punditkitchen.com/">punditkitchen</option>
    <option value="http://graphjam.com/">graphjam</option>
    <option value="http://failblog.org/">failblog</option>
    <option value="http://engrishfunny.com/">engrishfunny</option>
</select>
]]></r>).toString();

}

newBody.innerHTML += getDDL();

var nav = document.evaluate("//*[contains(@class, 'navigation')]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
if (nav) {
	nav.innerHTML = nav.innerHTML.replace('<b>', '<div class="funny nav">').replace('</b>', '</div>');
	newBody.innerHTML += nav.innerHTML;
}

var funnies = document.evaluate("//div[contains(@class, 'post')]", document, null, XPathResult.ANY_TYPE, null);
while (funny = funnies.iterateNext()) {
	var div = document.createElement('div');
	div.className = "funny";
	div.appendChild(funny.getElementsByTagName('h2')[0].cloneNode(true));
	var pics = document.evaluate("div/div/div/p/img | div/div/div/p/a/img | div/div/div/p/span", funny, null, XPathResult.ANY_TYPE, null);
	
	div.appendChild(pics.iterateNext().cloneNode(true));
	newBody.appendChild(div);
}

if (nav) {
	newBody.innerHTML += nav.innerHTML;
}

html.removeChild(oldBody);
html.appendChild(newBody);

GM_addStyle('.funny { width:300px; margin-bottom:20px; padding: 15px; }');
GM_addStyle('select { margin-bottom:20px; }');
GM_addStyle('body { background-image:none; background-color:#ffffff; padding:20px;}');
GM_addStyle('.funny img { width:300px }');
GM_addStyle('.nav { font-size:18px; }');

