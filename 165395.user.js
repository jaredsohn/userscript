// ==UserScript==
// @name produits manquants de la marque
// @namespace http://cartouchemania.com
// @description afficher les produits manquants de la marque
// @include http://www.cartouchemania.com/admin/Main.asp?module=FacturesSelect-encours.asp*
// ==/UserScript==

var ppp = document.lastChild.lastChild.lastElementChild.lastElementChild.lastElementChild.lastElementChild.children[5].lastElementChild;
//alert(ppp.childElementCount);

var pppcount = ppp.childElementCount;
var marque = new Array();
var dd = ppp.children[2];
//alert(dd.localName);
var content;
var contentc;
for(var i = 2;i<pppcount;i = i+2){
    var produit = ppp.children[i].children[6].textContent.bold()+' *';
    var comd = ppp.children[i].children[9].textContent;
    //alert(comd);
    if(produit.indexOf('C24')>=0){
        var c = ppp.children[i].children[0].textContent.bold()+' ';
        var id = ppp.children[i].children[1].textContent+' ';
        var fabricant = ppp.children[i].children[5].textContent+' ';
        var quantity = ppp.children[i].children[8].textContent+'/';
        var phrase = c.concat(id).concat(fabricant).concat(produit).concat(quantity);
        
        //alert(phrase);
        content = content + '<br>'+phrase;
    }
    if(comd.indexOf('MANQUE')>=0 ){
        var cc = ppp.children[i].children[0].textContent.bold()+' ';
        var idc = ppp.children[i].children[1].textContent+' ';
        var fabricantc = ppp.children[i].children[5].textContent+' ';
        var manqueIndex = comd.indexOf("/");
        manqueIndex = manqueIndex +1;
        var manque = comd.substring(0,manqueIndex);
        
        var phrasec = cc.concat(idc).concat(fabricantc).concat(manque);
        
        contentc = contentc + '<br>'+phrasec;
    }

}



var line = document.lastChild.lastChild.lastElementChild.lastElementChild.lastElementChild.lastElementChild.children[4].lastElementChild.firstElementChild.firstElementChild.lastElementChild;
var linnewDiv = document.lastChild.lastChild.lastElementChild.lastElementChild.lastElementChild.lastElementChild.children[4].lastElementChild.firstElementChild.firstElementChild;
linnewDiv.align = "left";
var newDiv = document.createElement("div");
linnewDiv.appendChild(newDiv);
newDiv.style.align = "right";
newDiv.innerHTML = "<input type='button' value='COMPATIBLE' />";

line.align = "left";
line.style.width = "40%";
line.innerHTML = "<input type='button' value='MANQUANT' />";
line.onclick = function(){
    var newWindow = window.open("","","height=400,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
    content = content+'<title>MARQUE</title>'
    newWindow.document.write(content);
    newWindow.document.close();
    newWindow.focus();
    
}
newDiv.onclick = function(){
    var newWindow = window.open("","","height=600,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
    contentc = contentc+'<title>COMPATIBLE</title>'
    newWindow.document.write(contentc);
    newWindow.document.close();
    newWindow.focus();
    
}