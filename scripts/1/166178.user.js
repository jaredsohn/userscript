// ==UserScript==
// @name        Script_Bare
// @namespace   scriptbare
// @include     http://www.baidata.com/shoppers/JobBoard.php?mode=state*
// @grant       GM_setValue
// @grant       GM_getValue
// @version     1.0.3
// ==/UserScript==

window.onload = main();

function main() {

	//Troca do .paging por .forms[1] devido a compatibilidade do Tampermonkey
    var quantidade = document.forms[1].getElementsByClassName("blue11bold")[document.forms[1].getElementsByClassName("blue11bold").length - 2].getElementsByTagName("font")[0].textContent;
    var numero = parseInt(quantidade.split("-")[1]);    
    if (GM_getValue("anterior") == undefined) {
        GM_setValue("anterior", numero);
        resultado("Script executado pela 1ª vez. Clique em \"Procurar por Estado\" novamente.", 4, "yellow");
        return;
    }
    var anterior = GM_getValue("anterior");
    GM_setValue("anterior", numero);
    if (numero > anterior) {
        var diferenca = "Aumento no número de avaliações: " + (numero - anterior)
        resultado(diferenca, 4, "#00FF00")
    } else {
        resultado("Sem alterações.", 4, "#A9A9A9")
    }  
}

function resultado(status, tamanho, cor) {
    var exibir = document.getElementsByTagName("table")[1];
    exibir.insertAdjacentHTML("afterEnd", "<br><table><tr><td bgcolor=" + cor + "><font size=" + tamanho +">" + status + "</font></td></tr></table>");
}