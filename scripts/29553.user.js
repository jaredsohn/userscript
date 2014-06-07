// ==UserScript==
// @name           Signaturize
// @namespace      Help.com
// @description    adds a signature to replies at help.com, version 5
// @include        http://help.com/post/*
// ==/UserScript==


//================================Edit the following and set signatures====================================

var NumberOfSignaturesUsed = 1;        //set this number to how many you want to use, randomly.
//  1 will always use first one, 2 always randomly one of first 2, etc.

//set the additional signatures here.
var signature2 = "- Give until theres nothing left, The Signaturizer";                         // change this variable to your signature.
var signature3 = "- Signaturized";                         // change this variable to your signature.
var signature4 = "- Regards, The Signaturizer";                         // change this variable to your signature.
var signature5 = "- Ever Helpful, Signaturizer";                         // change this variable to your signature.



//================================please dont edit below this line====================================


if (GM_getValue( "FirstSig", "")=="")
{ 
var signaturex = prompt("Enter your signature. Reset by pressing home in reply box.","- Regards, The Signaturizer");
GM_setValue("FirstSig", signaturex);
};

var signature1 = GM_getValue( "FirstSig", "- Regards, The Signaturizer")         // DO NOT change this variable.

var signature="";
var randomNum =Math.floor(Math.random()*6);
var targetElement = document.getElementById("reply");
var targetElement2 = document.getElementById("add-reply");
NumberOfSignaturesUsed++;


randomNum =Math.floor(Math.random()*NumberOfSignaturesUsed);
switch(randomNum)
{
case 1: signature=signature1; break;
case 2: signature=signature2; break;
case 3: signature=signature3; break;
case 4: signature=signature4; break;
case 5: signature=signature5; break;
};


targetElement.addEventListener("keyup", function(e) { var unicode=e.keyCode? e.keyCode : e.charCode; if(unicode==36){var signaturex = prompt("Enter your signature.  Reset by pressing home in reply box.",GM_getValue( "FirstSig", "- Regards, The Signaturizer")); GM_setValue("FirstSig", signaturex); signature1 = GM_getValue( "FirstSig", "- Regards, The Signaturizer"); };}, false);

var anonbox = document.getElementsByName("anonymous");

targetElement.addEventListener("keydown", function() { randomNum =Math.floor(Math.random()*NumberOfSignaturesUsed); if(randomNum==5){signature=signature5}; if(randomNum==4){signature=signature4}; if(randomNum==3){signature=signature3}; if(randomNum==2){signature=signature2}; if(randomNum==1){signature=signature1}; }, false);
targetElement2.addEventListener("click", function() { if(anonbox[0].checked!=true){ targetElement.value=targetElement.value+"\n\n"+signature; }; }, false);
