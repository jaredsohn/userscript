// ==UserScript==
// @name           scorte
// @namespace      http://userscripts.org/users/F1Project_scorte
// @description    scorte_marketing
// @include        http://www.f1project.org/marketing.php
// ==/UserScript==


var doc = document.URL="http://www.f1project.org/segreteria.php";

var xmlReq1 = new XMLHttpRequest();
xmlReq1.onreadystatechange=elabXML_segreteria;
var xmllink ="/segreteria.php";
xmlReq1.open("GET", xmllink, false);
xmlReq1.send(null); 

elabMag();

function elabMag(){
  try {
    console.log("start");
    var arr = new Array();
    ttable = document.getElementsByTagName("td" );     
    console.log("num elem td:"+ ttable.length );
    classe  =0;
    classe1 =0;
    arr1    =0;
    z       =0;
    for (i=0;i<ttable.length;i++) {
      if (ttable[i].textContent.length<800 &&
           ttable[i].textContent.match("in magazzino") &&
            ttable[i].textContent.match("F1Pro") ) {
        classe +=1;
        //console.log("testo:"+ ttable[i].textContent ) 
        var arrtesto = new Array;
        arrtesto = ttable[i].textContent.split(" ");
        //for (z=0;z<arrtesto.length;z++){
        // console.log("z:"+z" "+arrtesto[z].textContent);
        // console.log("z:"+z+" "+arrtesto[z])
        //}
        //break;
        giac1  = arrtesto[27].replace(".","");
        media1 = readCookie("media"+classe);
        console.log ("media1:"+media1)
        aut1 = (giac1*1)/(media1*1);
        qua1 = media1*7;

        ttable[i].innerHTML +="<b>gg ("+numtoimg(aut1.toFixed(0))+") qta*7gg("+qua1.toFixed(0)+") media("+media1+")</b>" ;
      }
    } 
  }catch (e){
    console.log("err:"+e)
  }
}

function elabXML_segreteria() {
  if (xmlReq1.readyState == 4) {
    if (xmlReq1.status == 200) {
     
      console.log("start XML analisi:");
           
      s= document.createElement("input")
     
      s.innerHTML = xmlReq1.responseText;
     
      var xmlDoc = s.getElementsByTagName("td");
     
      var classe = [0,0,0,0,0,0,0,0,0,0,0];
     
      var gg     = [0,0,0,0,0,0,0,0,0,0,0];
      val    = new Number(0) ;
      valTot = new Number(0) ;
      console.log("num elem td:"+ xmlDoc.length );
      try {
              
        for (i=0;i<xmlDoc.length;i++) {
          //console.log("testo:"+ xmlDoc[i].textContent )
          if ( xmlDoc[i].textContent.match("Hai ricevuto") && 
                xmlDoc[i].textContent.match("classe") &&
                 xmlDoc[i].textContent.length <1000 ){
            //console.log("testo (" +i +"):"+ xmlDoc[i].textContent )
           
            var newarr = new Array;
            newarr = xmlDoc[i].textContent.split(" ");
           
            indice = newarr[16];
            val    = newarr[10];         
            valTot = classe[indice];
            classe[indice] = valTot * 1 + val *1;
            gg[indice]     += 1;            
          }
         
        }
        console.log("classe len"+classe.length);
        for (z=1;z<classe.length;z++){
          media = classe[z]/gg[z];          
          console.log("classe"+z+":"+classe[z]+" gg:"+gg[z]);//+" arr1:"+arr1+" media:"+media1);
          createCookie('media'+z,media.toFixed(0),1); 
        }

         
      } catch(e) {
        console.log("err:"+e) ;
      }
    } 
  }
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
  console.log("name:"+name+" value:"+value);
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

function numtoimg(numero){

  //numero = parseInt(numero) + Math.floor(Math.random()*11);

  //return '<img src=http://www.gnirro.com/f1project/' + numero + '.jpg>';
  if (numero < 3) {
    return '<font color="#a00000"><b>' + numero + '</b></font>'
    }
  if (numero > 2 && numero < 9) {
    return '<font color="#ff8000"><b>' + numero + '</b></font>'
    }
  if (numero > 8 && numero < 13) {
    return '<font color="#40c000"><b>' + numero + '</b></font>'
    }
  if (numero > 12 && numero < 17) {
    return '<font color="#0000ff"><b>' + numero + '</b></font>'
    }
  if (numero > 16) {
    return '<font color="#8000a0"><b>' + numero + '</b></font>'
    }
}    }    