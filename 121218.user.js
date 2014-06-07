// ==UserScript==
// @id             zpovednice umozni hledani
// @name           zpovednice umozni hledani
// @version        1.0
// @namespace      daemonicky
// @author         daemonicky
// @description    Umožní prohledávat zpovědnici pomocí googlu všem.
// @include        http://.*zpovednice.cz/index.php*
// @include        http://*zpovednice.cz/index.php*
// @run-at         document-end
// ==/UserScript==

A=document.forms;



A[1].addEventListener('submit', function(e) {
    var B=document.forms[1];
    //
    // ziskani hodnot formulare
    //
    // zdroj:
    // http://www.quirksmode.org/js/forms.html, prime hodnoty  .... http://www.javascript-coder.com/javascript-form/javascript-get-form.phtml, mozna take
    //
    // pozn:
    // B.hleddat nefunguje
    //
    function v(X,val) {return X.elements[val].value};
    val = ["hledide", "hleddat","hledzpov","hledrozhr","hleduziv"];
    def = 'http://www.google.cz/search?q=site:zpovednice.cz+';//default
    src = ['http://zpovednice.cz/detail.php?statusik=',def,def,def, 'http://www.google.cz/search?q=site:zpovednice.cz/profil.php+'];
    //alert(B.elements["hleddat"].value);
    for(i=0;i<val.length;++i){if(v(B,val[i])) window.open(src[i]+v(B,val[i]), '_blank');}
    e.preventDefault(); return false;}, false);

//document.forms[1].onsubmit="alert()";
//A=document.getElementsByTagName("input");
/*
A=document.getElementsByTagName("input");
for(i=0;i<A.length;i++){
    if(A[i].value=="NAJDI") {
        A[i].addEventListener('submit', function(e) { alert("jo!");}, false);
        //onClick="alert('')";
    }
}
*/
// http://www.mozdev.org/pipermail/greasemonkey/2006-January/007399.html, propagace
// http://old.nabble.com/Change-onsubmit-event-td27194244.html, formy primo
//A[1].addEventListener('submit', function(e) { alert("jo!");}, false);