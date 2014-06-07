// ==UserScript==
// @name          MUforum Decryptor
// @namespace     http://localhost/
// @description   It decrypts link from megauploadforum.net
// @include       http://www.megauploadforum.net/*
// ==/UserScript==

// author jockerino

var patternDec = /decryptor.php/ ;
var docLink = document.getElementsByTagName('a');

// Prendo i link che mi interessano
var myDecLink=new Array();
var j=0;
for (var i=0; i<docLink.length;i++){
	if ( patternDec.test(docLink[i].href) ){
		myDecLink[j]=docLink[i].href;
		j=j+1;
	}
}

// Array dei link da mostrare
var myLinks=new Array();
var patternURL= new RegExp("window\.location = (.*)");
var patternReplace = /\'|\+/g;
var temp1;
//var temp2;
//alert(patternURL);
for (i=0;i<myDecLink.length;i++){
	xhttp=new XMLHttpRequest();
	xhttp.open("GET",myDecLink[i],false);
	xhttp.send();
	var response=xhttp.responseText;
	//alert(response);
	temp1=patternURL.exec(response);
	myLinks[i]=temp1[1].replace(patternReplace,"");
	//alert(myLinks[i]);
}
alert(myLinks);