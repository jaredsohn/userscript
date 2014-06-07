// ==UserScript==
// @name           Burglish Input for Gmail
// @namespace      Burglish
// @include        http*://mail.google.com/mail/*
// ==/UserScript==

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML =  '@font-face{font-family: Zawgyi-One;font-style: normal;font-weight: 700;src: url(http://mark.soemin.googlepages.com/ZAWGYIO0.eot);}.inline{text-align:left !important;float:left !important;position:absolute !important;background-color: #e5ecf9;min-width:150;width:50%;max-height:450;min-height:20;overflow:hidden;padding:3px;visibility:hidden;cursor:pointer;font:13px/1.6em Zawgyi-One,Arial,Verdana,Sans-Serif;z-index:100;}.colon{float:left;background-color: #d7eaf9;padding:1px;min-width:150;border: #87CEFA solid 1px;}.coloff{float:left;background-color: #e5ecf9;padding:1px;min-width:150;border: #e5ecf9 solid 1px;}.on{background-color:#87CEFA;min-width:150;}.off{background-color:#e5ecf9;min-width:150;}.tips{background-color: #00FFCC;padding:1px;border: #87CEFA solid 1px;font:13px/1.6em Zawgyi-One,Arial,Verdana,Sans-Serif;}input{vertical-align:middle;}';
document.getElementsByTagName("head")[0].appendChild(style);

var scripts = ["basic","ajax","lib","burmese","burglish","language"];
for( var i =0; i < scripts.length ; i++){
		var myscript = document.createElement('script');
		myscript.src = 'http://burglish.googlepages.com/' + scripts[i] + '.js';
		document.getElementsByTagName("head")[0].appendChild(myscript);
}

var myscript = document.createElement('script');
myscript.innerHTML = 'var rawTimerID=0;function onRawTimer(){var ttag=document.getElementsByTagName("TEXTAREA"); for(var i=0;i<ttag.length;i++){ if( !isDef(_o[ttag[i].id]) && ttag[i].name.inc(["to","to.*","to_\\d+"])==-1){ if(!ttag[i]["burglish"])initTextarea({id:ttag[i].id,toburmese:true,self:true});}} clearTimeout(rawTimerID); rawTimerID=setInterval(onRawTimer, 2000);};onRawTimer();';
document.getElementsByTagName("head")[0].appendChild(myscript);