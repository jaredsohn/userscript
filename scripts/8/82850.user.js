// ==UserScript==
// @name           Dan 3.0 Task Fix
// @namespace      mat
// @description    See code
// @include		http://revision3.com/dan30/task/*
// @include		http://www.revision3.com/dan30/task/*
// ==/UserScript==
(function (){
    document.getElementsByClassName("vote-info")[0].style.width="130px";
    document.getElementsByClassName("vote-buttons")[0].style.width="290px";
    document.getElementById("commentField").setAttribute("cols","56");
})();

