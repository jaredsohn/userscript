// ==UserScript==
// @name           Font-format
// @author         Cefa Schiati 
// @include        http*://*.orkut.*/Main#CommMsgPost?cmm=109349130
// @include        http*://*.orkut.*/Main#CommMsgPost?cmm=111812829
// @include        http*://*.orkut.*/Main#CommMsgPost?cmm=15518481
// ==/UserScript==



var mensagem="<center> <br><br>[maroon]Postado por @Bettostk[/maroon]</br> </center>";
var oF = (this.orkutFrame || window);
function Adiciona()
{
x=oF.document.getElementById('messageBody').innerHTML='<font face="verdana" size="2">  </font>'+mensagem;
var p=oF.document.getElementById('messageBody').innerHTML=[x];
}Adiciona();