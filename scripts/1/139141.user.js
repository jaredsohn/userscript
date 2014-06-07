// ==UserScript==
// @name        Cambia la fuente de facebook
// @namespace   cambiafuente
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @include     https://www.twitter.com/*
// @include     http://www.twitter.com/*
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @version     1
// ==/UserScript==

var join=0;

var index=56320;

var opciones=new Array();
opciones[0]=new Array("𝐀𝐁𝐂",56320);
opciones[1]=new Array("𝐴𝐵𝐶",56372);
opciones[2]=new Array("𝑨𝑩𝑪",56424);
opciones[3]=new Array("𝓐𝓑𝓒",56528);
opciones[4]=new Array("𝕬𝕭𝕮",56684);
opciones[5]=new Array("𝖠𝖡𝖢",56736);
opciones[6]=new Array("𝗔𝗕𝗖",56788);
opciones[7]=new Array("𝘈𝘉𝘊",56840);
opciones[8]=new Array("𝘼𝘽𝘾",56892);
opciones[9]=new Array("𝙰𝙱𝙲",56944);

 
function toUnicode(theString,theId) {
  
  var unicodeString = '';
  for (var i=0; i < theString.length; i++) {
    var parsedint=parseInt(theString.charCodeAt(i));
    
    if(parsedint>=65 && parsedint<=122){
      var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
          while (theUnicode.length < 4) {
      theUnicode = '0' + theUnicode;
    }
     if(parsedint>=65 && parsedint<=90){
      parsedint-=65;
      theUnicode=unescape('%uD835%u'+(index+parsedint).toString(16).toUpperCase());
    }
    else if(parsedint>=97 && parsedint<=122){
            parsedint-=97;
      theUnicode=unescape('%uD835%u'+((index+26)+parsedint).toString(16).toUpperCase());
    }   
    
    }
    else{
      theUnicode=theString.substring(i,i+1);
      
    }
    //var num=parseInt(theUnicode,16);

    unicodeString += theUnicode;
  }
  document.getElementById(theId).value=unicodeString;
}
function nuevaopcion(hue){
  index=parseInt(hue);
  
}
function creatediv(theid){
  var thisdiv = document.createElement("div");
 thisdiv.id="testing123";
thisdiv.style.width = "100px";
thisdiv.style.height = "20px";
//thisdiv.style.background = "red";
//thisdiv.style.color = "white";

var cambiar = document.createElement("select");

for (var i=0;i<opciones.length;i++){
  
var option = document.createElement("option");
option.innerHTML = opciones[i][0];
option.value = opciones[i][1];
option.onclick = function(){nuevaopcion(this.value)};
cambiar.add(option, null);
}
thisdiv.appendChild(cambiar);
document.getElementById(theid).parentNode.appendChild(thisdiv);
}

function gettargetid(e){
 
  var thisid=e.target.id;
  var thisvalue=document.getElementById(thisid).value;
  if(join==0){
  creatediv(thisid);
  join=1;

  }
  
  toUnicode(thisvalue,thisid);
}

window.addEventListener( "keyup",gettargetid);