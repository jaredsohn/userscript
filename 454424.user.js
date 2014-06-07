// ==UserScript==
// @name            Save web
// @description     Enrichisement du fichier historique
// @namespace       my save web
// @version         1.0.0
// @date            12/04/2014
// @author          kbiri ismail
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include         http://*.*
// @exclude         http://www.google.com/*
// @exclude         https://www.google.com/*
// @exclude         http://googleads*.*
// @exclude         http://static*.*
// ==/UserScript==

//******************************************************************************** 

function  fonction2(){
var fileSystem=new ActiveXObject("Scripting.FileSystemObject");

}

//******************************************************************************
function mafonction() {
var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
alert("URL   : " + newURL );
fonction2();
}


setInterval(mafonction, 5000); 





