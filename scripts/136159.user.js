// ==UserScript==
// @name           Ayaemail AutoClicker test
// @description    Automatically click Ayaemail
// @include        *
// @author         Ace
// @version        1.0
// ==/UserScript==


var nf1 = "timerfrm" 
var nf2 = "Main" // nome del frame da togliere
//var iframes=document.getElementsByTagName("IFRAME");


var a = document.location.href;  // prende l'url completo
var b = a.split("ayaemails.com");// 'spezza' l'url sulla stringa "msg="
var valmsg = 0;

 function removeFrame(){ 
//if (parent.frames.length > 0){
//	window.top.location.href = location.href;
//}
var iframes=parent.frames; 
       window.alert('lunghezza  ' + parent.frames.length);
      	window.alert('nome  ' + parent.frames[1].name);
// for(i = 0 ; i < iframes.length; i++){
 //  iframe = iframes[i] ; 
 //  alert(parent.frames[i].name);
  //  if(iframe.name == "bottom"){ 
	//     parent.removeChild(iframe);
	//window.location.href= "bianca.htm";


    //} 
//  }	
} 



if (b.length > 1){                   // se la stringa "FR=" c'era ...
    valmsg = b[1];                   
    b = valmsg.split("FR=");
    valmsg = b[1];                   


if (valmsg == '1'){
  {
window.alert('valmsg  ' + valmsg);
  // for(i = 0 ; i < iframes.length; i++){
      var iframes=parent.frames;
      windows.alert('lunghezza  a' + parent.iframes.length);
window.alert('valmsg  ' + valmsg+1);
  // removeFrame();
 //  }
  }
 }
}