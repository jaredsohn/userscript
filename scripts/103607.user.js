// ==UserScript==
// @name           Mudar a Cor de Algumas propriedades do FaceBook
// @author         Cefa Schiati 
// @include        http*://*.facebook.com.*/
// @exclude        http*://*.pt.facebook.com.*/
// ==/UserScript==

var Fundo="black";
var CorLinks="Red";
var CorMouseOver="Purple";
var sms=confirm("você tem novas atualizações verificar?");

function Alterar(){
document.getElementById('headNav').style.backgroundColor=[Fundo];
document.getElementById('pageNav').style.border.="4";
alert(sms);

}
Alterar();