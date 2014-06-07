// ==UserScript==
// @name            Aktivni XCHAT seznam
// @description    Udela seznam lidi v mistnostech aktivni.  
// @namespace   PaulReage70
// @include     http://xchat.centrum.cz/*/modchat?op=roomlist&*
// @version     0.95
// ==/UserScript==
// (c) PaulReage70@gmail.com
// Drazdilo mne, ze ten seznam chatujicich neni aktivni... takze jsem napsal toto. 
// Odzkouseno jen pro Firefox.
// Profily se po kliknuti oteviraji porad ve stejnem okne. 
// Dedicated to TTDD ;-)
// PaulReage70@gmail.com

function SCHOV(){  window.status="";  document.body.removeChild(floatTip); }
function KLIK(){  
  var AN="";
  if (! BX1[0].checked) { AN=document.URL.replace(/^(.*?)(~.+\/)(.*)/,"$2"); } ;
  window.open("http://xchat.centrum.cz/"+AN+"whoiswho/profile.php?f=1&nick="+this.innerHTML,"XCHP"); 
}

function UKAZ(event){ 
  this.style.cursor="pointer";  
  var top = document.documentElement.scrollTop || document.body.scrollTop;
  var X=event.pageX+20;
  var Y=event.pageY-top+20;
  CT(this.innerHTML+'<br> <img src="http://xchat.centrum.cz/whoiswho/perphoto.php?nick='+this.innerHTML+'">',X,Y);
  document.body.appendChild(floatTip);
}

var xc_td = document.getElementsByTagName("td");
for (var i = 0; i < xc_td.length; i++) {
  if (xc_td[i].id=="c4") {  xc_td[i].innerHTML=xc_td[i].innerHTML.replace(/(^| |>)([^  <>,]+)(,|&nbsp|<)/g,"$1<XU>$2</XU>$3");   }  
} ;

var tds = document.getElementsByTagName("XU");
for (var i = 0; i < tds.length; i++) {
	    tds[i].addEventListener("mouseover", UKAZ, false);
	    tds[i].addEventListener("mouseout", SCHOV, false);
	    tds[i].addEventListener("click", KLIK, false);
}

var floatTip=document.createElement("div");
function CT(JM,XX,YY){
        floatTip.id="FT1";
        floatTip.style.padding="8px";
        floatTip.style.position="fixed";
        floatTip.style.textAlign="center";
        floatTip.style.backgroundColor="#ffffbb";
        floatTip.style.border="none";
        floatTip.innerHTML=JM;
        floatTip.style.left=XX+"px" ;
        floatTip.style.top=YY+"px";
}

function RESIZE(event){   footer.style.left=window.innerWidth-150+"px" ;  footer.style.top=window.innerHeight-50+"px"; }

var footer=document.createElement("div");
        footer.id="FOOT1";
        footer.style.padding="8px";
        footer.style.position="fixed";
        footer.style.textAlign="center";
        footer.style.backgroundColor="#ffffbb";
        footer.style.border="none";
        footer.innerHTML="<form><input type='checkbox' name='BX1' id='myCheck'>Anonymně?</form>";
        BX1=document.getElementsByName("BX1");
        RESIZE();

window.addEventListener("resize", RESIZE, false);
document.body.appendChild(footer);

