// ==UserScript==
// @name  Numéro affiché sur page factureSelectRechercher
// @namespace http://cartouchemania.com
// @description ajouder un bottom pour afficher les nums de Commande,Client et Fucture
// @include http://www.cartouchemania.com/admin/FacturesSelectRechercher.asp?idc=*
// ==/UserScript==

var firstLine = document.lastChild.lastChild.firstElementChild.firstElementChild;
var firstLineCell = firstLine.children[0].insertCell(0);
firstLineCell.innerHTML = "- -!";
var allline =  document.lastChild.lastChild.firstElementChild.firstElementChild;

for(var i=2;i<allline.children.length;i=i+2) {
    var allline =  document.lastChild.lastChild.firstElementChild.firstElementChild;
    var thisline = allline.children[i];
    var thisLineCell =thisline.insertCell(0);
    var xiaobutton = document.createElement("div");
    xiaobutton.innerHTML = "<input type='button' value='C' />";
    thisLineCell.appendChild(xiaobutton);
    //alert(xiaobutton.innerHTML);
}

for(var j=2;j<allline.children.length;j=j+2) {
    (function() {
        var t=j;
        var thisButton =  allline.children[t].firstElementChild.firstElementChild.children[0];
        thisButton.onclick = function() {
            //var trlength =allline.length;
            var thisline = allline.children[t];
            var newWindow = window.open("","","height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
            var content = "N°Commande C° "+thisline.children[1].children[0].firstChild.data.bold()+"<br>";
            content =content + "ID Client ID° "+thisline.children[2].children[0].firstChild.data.bold()+"<br>";
            content = content + "Facture F° "+thisline.children[1].children[2].value.bold()+"<br>";
            content =content + "C°"+thisline.children[1].children[0].firstChild.data.bold()+"/";
            content = content + "ID°"+thisline.children[2].children[0].firstChild.data.bold()+"/";
            content += "F°"+thisline.children[1].children[2].value.bold();
            newWindow.document.write(content);
            newWindow.document.close();
            newWindow.focus();
        }
    })();


}






