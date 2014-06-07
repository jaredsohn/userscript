// ==UserScript==
// @name           Wikipedia: Show English article title
// @namespace      http://code.google.com/p/ecmanaut/
// @description    For wikipedia pages on (not-en).wikipedia.org, show the English title too in the page header.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @resource throb http://baycam.ca/spinner.gif
// @include        http://*.wikipedia.org/wiki/*
// @exclude        http://en.wikipedia.org/wiki/*
// ==/UserScript==

var header = $X('id("firstHeading")'), eng;
var link = $X('id("p-lang")//a[starts-with(@href,"http://en.wikipedia")]');
if (link && header) {
  eng = node({ tag: <a style="float: right; color: #888; display: block;"
                       href={ link.href }>
                 <img height="24" src={ GM_getResourceURL("throb") }/>
                 { fix(decodeURIComponent(link.pathname.split(/\//g).pop())) }
               </a>, append: header });
  wget$X(link.href, update, './/*[@id="firstHeading"]', !"GM", !!"div");
}

function update(title) {
  eng.innerHTML = title.innerHTML;
  eng.style.color = "";
}

function fix(title) {
  return title.replace(/_/g, " ");
}
