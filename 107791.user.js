// ==UserScript==
// @name          +1 Google Plus Clicker
// @namespace     http://mengja.exteen.com/20110724/programming-script-greasemonkey-1-topic-google-plus
// @description   To click all +1 button in the google plus page
// @include           http://plus.google.com/*
// @include           https://plus.google.com/*
// @match             http://plus.google.com/*
// @match             https://plus.google.com/*
// @version           1.2
// ==/UserScript==

var aryClassElemeng = new Array();

window.doSomething = function() {
    aryClassElemeng.length = 0;
    getElementsByClassName( "esw eswd Mh kg", document.body );
	if(aryClassElemeng.length>0){
		var r  = confirm("Now, This page have +1 button = " 
					+ aryClassElemeng.length + " items\n"
					+ "Do you want to add +1?");
		if (r==true){
			for ( var i = 0; i < aryClassElemeng.length; i++ ) {
				aryClassElemeng[i].click();
			}
		}
	}
}

function getElementsByClassName( strClassName, obj ) {
    if ( obj.className == strClassName ) {
        aryClassElemeng[aryClassElemeng.length] = obj;
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i] );
}


window.addEventListener("load", doSomething, true);
setInterval(doSomething, 30000);