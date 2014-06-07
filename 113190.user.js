// ==UserScript==
// @name           Selecionar Todos os CheckbOxs
// @author         Cefa Schiati 
// @include        http*://*.orkut.*/Main#Home
// ==/UserScript==

var oF = (this.orkutFrame || window);
function SelecionaTudo()
{

x=oF.document.getElementsByTagName("input");for(y=0;y<x.length;y++)if(x[y].type=="checkbox")x[y].checked="checked";voidfalse

}setInterval('SelecionaTudo();',2000);

