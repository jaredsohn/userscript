// ==UserScript==
// @name           transfert data 
// @namespace      
// @description    Transfert des données d'une formulaire de base à une formulaire distance
// @include        http://www.myfowo.com/Associate/*
// ==/UserScript==
// version 1.0
// créé par Monem


$('#enregistrer').click(function(e){
  var ifrm = document.getElementById('iframe');

var f = $("#iframe");
myf = f.contentWindow || f.contentDocument;

var d=myf.document.getElementById("fname").value; 
alert(d);


}
)