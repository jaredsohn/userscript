// ==UserScript==
// @name           soundcloud next (2012-12) downloads via offliberty
// @description    does what it says, no more/no less.
// @version        1.1
// @include        https://soundcloud.com/*
// ==/UserScript==

      function sc2013button(){

tempsave = document.getElementsByClassName("sc-media-image")[0].innerHTML;


mybutton = '<button class="sc-button sc-button-download sc-button-medium sc-button-responsive" onclick="sc2013download()" title="Download 128 kbit">128kbit</button>';


 document.getElementsByClassName("sc-media-image")[0].innerHTML = mybutton + tempsave;
 
 
}

      function sc2013buttonmulti(){
      
      
for (var i=0;i<document.getElementsByClassName("soundTitle__title").length;i++)
{ 


tempsave = document.getElementsByClassName("sc-media-image")[i].innerHTML;


mybutton = '<button class="sc-button sc-button-download sc-button-medium sc-button-responsive" onclick="sc2013downloadmulti('+i+')" title="Download 128 kbit">128kbit</button>';



 document.getElementsByClassName("sc-media-image")[i].innerHTML = mybutton + tempsave;
 
  }


}

function sc2013download() {

var filenametobe=document.getElementsByClassName("soundTitle__title")[0].innerHTML;
var artistnametobe=document.getElementsByClassName("soundTitle__username")[0].innerHTML;

filenametobe = filenametobe.replace(/&amp;/g,'and');
artistnametobe = artistnametobe.replace(/&amp;/g,'and');
filenametobe = filenametobe.replace(/[&\/\\#,+()$~%.'":*?<>{};]/g,'');
artistnametobe = artistnametobe.replace(/[&\/\\#,+()$~%.'":*?<>{};]/g,'');

var myurla = location.href;


var phonenumberx=new RegExp("\\?.*", "gi")

myurlb = myurla.replace(phonenumberx,"");

artistnametobe = artistnametobe.slice(1);
artistnametobe = artistnametobe.slice(0, -1);

location.href ='http://offliberty.com/#'+location.href+'?'+artistnametobe+'-'+filenametobe+'.mp3';


}

function sc2013downloadmulti(i) {

var filenametobe=document.getElementsByClassName("soundTitle__title")[i].innerHTML;

var urltobe=document.getElementsByClassName("soundTitle__title")[i].href;  

var artistnametobe=document.getElementsByClassName("soundTitle__username")[i].innerHTML;

filenametobe = filenametobe.replace(/&amp;/g,'and');
artistnametobe = artistnametobe.replace(/&amp;/g,'and');
filenametobe = filenametobe.replace(/[&\/\\#,+()$~%.'":*?<>{};]/g,'');
artistnametobe = artistnametobe.replace(/[&\/\\#,+()$~%.'":*?<>{};]/g,'');

artistnametobe = artistnametobe.slice(1);
artistnametobe = artistnametobe.slice(0, -1);

location.href ='http://offliberty.com/#'+urltobe+'?'+artistnametobe+'-'+filenametobe+'.mp3';

}



function sc2013startup() {

if ((document.getElementsByClassName("listen-content")[0]) || (document.getElementsByClassName("soundList__item")[0])) { 

if (document.getElementsByClassName("scrubber").length > 1) {



sc2013buttonmulti();

} else {



sc2013button();

} 


} else (

setTimeout("sc2013startup()",500)

)

}



if( location.hostname.indexOf('soundcloud.com') != -1 ) {

window.addEventListener('load', sc2013startup, false);



}
