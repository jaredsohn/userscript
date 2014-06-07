// ==UserScript==
// @name        eZ Maintainance list sort
// @namespace   http://psicofrenia.com
// @description Sort itens of eZ Mainatinance list
// @include     http://*.ez.no:*/crmadmin/issue_view/*
// @include     http://*.ez.no:*/crmadmin/issue_edit/*
// @grant none
// @version     1.0
// ==/UserScript==

sortList('branches');
sortList('module_branches');

function sortList(objId) {
    var objList = document.getElementById(objId);
    
    arrTexts = new Array();
    
    for(i=0; i<objList.length; i++)  {
      arrTexts[i] =  objList.options[i].text.toLowerCase() + "(#####)" + objList.options[i].text + "(#####)" + objList.options[i].value;
    }
    
    arrTexts.sort();
    arrTexts.reverse();
    
    for(i=0; i<objList.length; i++)  {
        var n = arrTexts[i].split("(#####)");
        objList.options[i].text = n[1];
        objList.options[i].value = n[2];
    }
}