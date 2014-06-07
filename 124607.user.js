// ==UserScript==
// @name           Pokec.sk - Skrývač bočného panelu nového skla
// @namespace      pokec, azet, nove, sklo, panel, menu, skryt
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @version        0.1
// ==/UserScript==
var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement("script");
newScript.type = "text/javascript";
newScript.charset = "utf-8";
newScript.id = "skryvacPanelu";
newScript.src = "data:application/x-javascript;base64,77u/ZnVuY3Rpb24gaGlkZXIoKXt2YXIgc2lya2E9JCgiI3NrbG8iKS5jc3MoIndpZHRoIik7JCgiI2ZpbHRlckJ5Q29udGFjdHMiKS5hZnRlcignPGEgaWQ9InBhcmFwZXRLbGlrIiBjbGFzcz0icGlza290a2EiIGhyZWY9IiMiIHRpdGxlPSJQcmVww61uYcSNIHBhbmVsdSI+U2tyecWlPC9hPicpO2Z1bmN0aW9uIGEoKXt2YXIgc2tsbz0kKCIjc2tsbyIpLHBhcmFwZXQ9JCgiI3BhcmFwZXQiKSxrbGlrPSQoIiNwYXJhcGV0S2xpayIpO2lmKHBhcmFwZXQuY3NzKCJkaXNwbGF5IikhPT0ibm9uZSIpe2tsaWsudGV4dCgiWm9icmF6acWlIik7cGFyYXBldC5jc3MoImRpc3BsYXkiLCJub25lIik7c2tsby5jc3MoIndpZHRoIiwiMTAwJSIpfWVsc2V7a2xpay50ZXh0KCJTa3J5xaUiKTtza2xvLmNzcygid2lkdGgiLHNpcmthKTtwYXJhcGV0LmNzcygiZGlzcGxheSIsImJsb2NrIil9fSQoIiNyZWtsYW1hX3BhcmFwZXQiKS5yZW1vdmUoKTskKCIjcGFyYXBldCIpLmNzcygiYm90dG9tIiwiMCIpOyQoIiNwYXJhcGV0S2xpayIpLmNsaWNrKGEpfWhpZGVyKCk7";
headID.appendChild(newScript);

/*
function hider(){
var sirka=$("#sklo").css("width");

$("#filterByContacts").after('<a id="parapetKlik" class="piskotka" href="#" title="Prepínač panelu">Skryť</a>');

function a(){
var sklo=$("#sklo"),
    parapet=$("#parapet"),
    klik=$("#parapetKlik");

if(parapet.css("display")!=="none"){
    klik.text("Zobraziť");
    parapet.css("display","none");
    sklo.css("width","100%");
}
else{
    klik.text("Skryť");
    sklo.css("width",sirka);
    parapet.css("display","block");
    }
}
$("#reklama_parapet").remove();
$("#parapet").css("bottom","0");
$("#parapetKlik").click(a);
}
hider();
*/