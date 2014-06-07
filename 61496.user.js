// ==UserScript==
// @name           VoteConca
// @namespace      VoteConca
// @description    Checa o botão 'Conca' no Craque da Galera
// @include           http://globoesporte.globo.com/Esportes/Futebol/Brasileirao/Serie_A/Craque_da_Galera/*
// ==/UserScript==

input = document.getElementById('participante_02');
input.checked = true;
input.click();
document.body.focus();

inputs = document.getElementsByTagName("a");
for(i=0;i<inputs.length;i++)
{
if (inputs[i].innerHTML == "votar novamente")
{
window.location = inputs[i];
}
}
