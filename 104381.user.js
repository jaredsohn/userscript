// ==UserScript==
// @name           Bitcoin Tool
// @namespace      Bitcoin Tool
// @description    Bitcoin Tool - recognizes Bitcoin addresses on websites, adds links to the blockexplorer, adds a select button for easier copy-paste, and a "Falkvinge" Send BTC button
// @version        1.1
// @include        *
// ==/UserScript==

text = document.body.innerHTML;
if (text.match(/[^A-Za-z0-9/"]1[A-HJ-NP-Za-km-z1-9]{32,33}[^A-Za-z0-9"]/)) {
document.body.innerHTML = text.replace(/(<[^<]*[^A-Za-z0-9/"])(1[A-HJ-NP-Za-km-z1-9]{32,33})([^A-Za-z0-9?%"]...)/g,function(a,b,c,d){
t = new Array(256);for(j=97;j<=122;++j){t[j]=0;}for(j=65;j<=90;++j){t[j]=0;}for(j=48;j<=57;++j){t[j]=0;}for(j=0;j<c.length;++j){++t[c.charCodeAt(j)];}
sum=0;sum1=0;sum2=0;sum3=0;for(j=97;j<=122;++j){sum+=t[j]*t[j];sum1+=t[j]}for(j=65;j<=90;++j){sum+=t[j]*t[j];sum2+=t[j]}for(j=48;j<=57;++j){sum+=t[j]*t[j];sum3+=t[j]}
return (a.match(/^<(textarea|input|pre|code)/i) || d=="</a>" || sum >= 90 || sum1 <= 2 || sum1 >= 26 || sum2 <= 2 || sum2 >= 26 || sum3 >= 14) ? b+c+d : b+"<a href=\"http://blockexplorer.com/address/"+c+"\">"+c+"</a>"
+"<span style=\"cursor:pointer;border:1px solid black;font-size:80%;color:black;font-weight:normal;padding:1px 2px 0 2px;margin:1px 0 1px 4px;background:#ddd;\" "
+"onclick=\"if(document.createRange){r=document.createRange();previousSibling.focus();r.selectNodeContents(previousSibling);w=window.getSelection();w.addRange(r);}else{r=document.body.createTextRange();r.moveToElementText(previousSibling);r.select();}\" onmouseover=\"this.style.backgroundColor='#eee'\" onMouseOut=\"this.style.backgroundColor='#ddd'\">Select</span>"
+"<span style=\"cursor:pointer;border:1px solid black;font-size:80%;color:black;font-weight:normal;padding:1px 2px 0 2px;margin:1px 0 1px 6px;background:#ddd;\" title=\"Requires bitcoind and bitcoin_httpd\" onmouseover=\"this.style.backgroundColor='#eee'\" onMouseOut=\"this.style.backgroundColor='#ddd'\" onclick=\"window.open('http://localhost:8330/"+c+"');\">Send BTC</span>"+d;
});
}

// If you like the tool, donate to 141HiFa6pek3uM32LpRe3gXraETV1fViWC
// 
// This is public domain code, free for commercial and non-commercial use.
// If you use some of it, give a link to this script:
// http://userscripts.org/scripts/show/104381
