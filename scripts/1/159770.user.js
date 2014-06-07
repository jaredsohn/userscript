// ==UserScript==
// @name  Numéro affiché sur page FacturesSelectNF
// @namespace http://cartouchemania.com
// @description ajouder un bottom pour afficher les nums de Commande,Client et Fucture
// @include http://www.cartouchemania.com/admin/Main.asp?module=FacturesSelectNF.asp*
// ==/UserScript==

if(navigator.userAgent.indexOf("Firefox")>0){
var allline = document.lastChild.lastChild.firstElementChild.firstElementChild.
    lastElementChild.firstElementChild.children[7].firstElementChild;
var thisline = allline.children[2];
var thatline = allline.children[0];
var x = thatline.insertCell(0);
var y = thisline.insertCell(0);
x.innerHTML = ":)";
y.innerHTML = "<input type=\"button\" onclick=\"addsell()\" value=\"C\">";

window.addsell = function() {
    var allline = document.lastChild.lastChild.firstElementChild.firstElementChild.
        lastElementChild.firstElementChild.children[7].firstElementChild;
    var trlength =allline.length;
    var thisline = allline.children[2];
    var newWindow = window.open("","","height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
    var content = "N° Commande C° "+thisline.children[1].children[0].firstChild.data.bold()+"<br>";
    content += "ID Client ID° "+thisline.children[2].children[0].firstChild.data.bold()+"<br>";
    content += "Facture F° "+thisline.children[1].children[2].value.bold()+"<br>";
    content += "C°"+thisline.children[1].children[0].firstChild.data.bold()+"/";
    content += "ID°"+thisline.children[2].children[0].firstChild.data.bold()+"/";
    content += "F°"+thisline.children[1].children[2].value.bold();
    newWindow.document.write(content);
    newWindow.document.close();
    newWindow.focus();

}

}else if(navigator.userAgent.indexOf("Chrome")>0){
var allline = document.lastChild.lastChild.firstElementChild.firstElementChild.
    lastElementChild.firstElementChild.children[7].firstElementChild;
var thisline = allline.children[2];
var thatline = allline.children[0];
var x = thatline.insertCell(0);
var y = thisline.insertCell(0);
x.innerHTML = ":)";
var xiaoButton = document.createElement('div');
xiaoButton.innerHTML = "<input type='button' value='C'>";
y.appendChild(xiaoButton);


xiaoButton.onclick = function() {
    var allline = document.lastChild.lastChild.firstElementChild.firstElementChild.
        lastElementChild.firstElementChild.children[7].firstElementChild;
    var trlength =allline.length;
    var thisline = allline.children[2];
    //alert("N° Commande C° "+thisline.children[2].children[0].innerText+"<br>"+"Facture F° "+thisline.children[2].children[2].value.bold()+"<br>"+"ID Client ID° "+thisline.children[3].children[0].innerText.bold()+"<br>");    
    var content = "N° Commande C° "+thisline.children[1].children[0].innerText.bold()+"<br>";
    content += "ID Client ID° "+thisline.children[2].children[0].innerText.bold()+"<br>";
    content += "Facture F° "+thisline.children[1].children[2].value.bold()+"<br>";
    content += "C°"+thisline.children[1].children[0].innerText.bold()+"/";
    content += "ID°"+thisline.children[2].children[0].innerText.bold()+"/";
    content += "F°"+thisline.children[1].children[2].value.bold();
    var newWindow = window.open("","","height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
    newWindow.document.write(content);
    newWindow.document.close();
    newWindow.focus();
}

}




