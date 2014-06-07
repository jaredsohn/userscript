// ==UserScript==
// @name           Mudar a Cor de Algumas propriedades do FaceBook
// @author         Cefa Schiati 
// @include        https*://*.facebook.com.*/
// @include        https*://*.pt.facebook.com.*/
// ==/UserScript==


function Alterar(){
var sms=confirm("você tem certeza que deseja auterar a cor?\n NOTA \n Seu facebook não 

sofrerar nenhum dano e a ação poderá ser revertida futuramente quando desejado");

if(sms == true){
document.getElementById('blueBar').style.backgroundColor=["red"];
}
else
{
alert('você sera redirecionado a pagina do Chrome');
}
}Alterar();
