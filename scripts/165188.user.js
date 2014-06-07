// ==UserScript==
// @name surplace produits manquants
// @namespace http://cartouchemania.com
// @description afficher les commandes surplaces
// @include http://www.cartouchemania.com/admin/Main.asp?module=FacturesSelect.asp*
// ==/UserScript==




var ppp = document.lastChild.lastChild.lastElementChild.lastElementChild.lastElementChild.lastElementChild.children[7].lastElementChild;
//alert(ppp.childElementCount);
var pppcount = ppp.childElementCount;
//var surplace =  Array();
//alert(ppp.children[6].children[8].lastElementChild.value);
var surplace = new Array();

for(var i=2;i<pppcount;i=i+2){
    var qqq = ppp.children[i].children[8].textContent; // type envoi

    var exist = ppp.children[i].children[8].lastElementChild.value;

    var thiscom = ppp.children[i].children[8].lastElementChild.id;
    var thiscomd = thiscom.substring(7)+' ';
    var reg = /\s/g;
    var qqqq = qqq.replace(reg,"");
    
    var retrait = "RETRAITSURPLACE";

    if(qqqq==retrait) {
    //alert(exist);
        if(exist.indexOf("MANQUE")>=0){
                var j = i/2;
                var manqueIndex = exist.indexOf("/");
                //alert("index"+manqueIndex);
                manqueIndex = manqueIndex +1;
                var manque = exist.substring(0,manqueIndex);
                
                surplace[j] = thiscomd.concat(manque);
                //alert(surplace[j]);
            }

        }    
}
//alert(surplace[24]);
var surplace = surplace.toString();
        
surplace = surplace.replace(new RegExp('[,]*[,]', 'g'),"<br>");

var line = document.lastChild.lastChild.lastElementChild.lastElementChild.lastElementChild.lastElementChild.children[4].lastElementChild.firstElementChild.firstElementChild.lastElementChild;
line.innerHTML = "<input type='button' value='MANQUANT' />";
line.onclick = function(){
    var newWindow = window.open("","","height=200,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
    var content = "";
    
    content = surplace;
    newWindow.document.write(content);
    newWindow.document.close();
    newWindow.focus();
    
}















