// ==UserScript==
// @name           Auto Sign
// @namespace      http://www.orkut.com/Community.aspx?cmm=43898706
// @description    Auto signature ... huh
// @include        http://www.orkut.com/Scrap*
// @include        http://www.orkut.com/CommMsg*
// @author        John  
// ==/UserScript==

var signature = "[b][gray]
I think, therefore I'm single.[b][/gray]\n
";
 
function lalala () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n" + signature ; 
clearInterval (lalalaid) 
}
lalalaid = setInterval (lalala,2000)