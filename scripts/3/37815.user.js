// ==UserScript==
// @name			Character Counter
// @author			ROX
// @namespace		http://www.Rachini.com
// @description		Character Counter
// ==/UserScript==
var newURL ='javascript:(function(){var%20D=document,i,f,j,e;for(i=0;f=D.forms[i];++i)for(j=0;e=f[j];++j)if(e.type=="text"||e.type=="password"||e.tagName.toLowerCase()=="textarea")S(e);function%20S(e){if(!e.N){var%20x=D.createElement("span"),s=x.style;s.color="green";s.font="bold%2010pt%20sans-serif";s.verticalAlign="top";e.parentNode.insertBefore(x,e.nextSibling);function%20u(){x.innerHTML=e.value.length;}u();e.onchange=u;e.onkeyup=u;e.oninput=u;e.N=x;}else{e.parentNode.removeChild(e.N);e.N=0;}}})()';
content.document.location.replace(newURL);