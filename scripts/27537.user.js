// ==UserScript==
// @name           AllianceScanner
// @namespace   og
// @include        http://*.ogame.*/*
// ==/UserScript==
function addBoxLink(){
var addOk = 0;
var linkText = 'Riepilogo'; 
var leftMenu   = document.getElementById("menu");
if(leftMenu) {
var boxLink = document.createElement('A');
boxLink.setAttribute('id', 'AllyScan');
boxLink.setAttribute('href', '#');
boxLink.setAttribute('onclick', 'openScanBox(this)');
var leftLinks = leftMenu.getElementsByTagName('A');
for(i in leftLinks) {
   if (leftLinks[i].innerHTML == linkText) {
      var nodeL = leftLinks[i];
      var parentNodeLink = leftLinks[i].parentNode;
      var parentHTML      = parentNodeLink.innerHTML;
      parentNodeLink.innerHTML = "";
      parentNodeLink.appendChild(boxLink);
      parentNodeLink.innerHTML+= '<BR><BR>' + parentHTML;
      document.getElementById('AllyScan').innerHTML = 'AllyScan';
      addOk=1;
      break;
    }
   }
 }
 return addOk;
}

function addBox(){
var allyLink = document.getElementById('AllyScan');
allyParent   = allyLink.parentNode;
var boxScan = document.createElement('DIV');
boxScan.setAttribute('id', 'BoxScan');
boxScan.setAttribute('style', 'position:absolute; z-index:500;top:50px; left:130px; visibility: hidden;');
boxScan.innerHTML = 
         '<TABLE class="header" style="border: 3px double;">'+
         '<tr>'+
        '<td class="header">'+
       ' <table class="header">'+
        '<tbody><tr class="header"><td class="c" colspan="2">Galassia</td></tr>'+
                   '<tr class="header"><td class="l"><input id="minGalaxyRange" value="1" size="5" maxlength="3"  type="text"></td>'+
                                               ' <td class="l"><input id="maxGalaxyRange" value="1" size="5" maxlength="3"  type="text"></td></tr>'+
      ' </tbody>'+
       '</table> '+   
      '</td>'+
      
     ' <td class="header">'+
      ' <table class="header">'+
        '<tbody><tr class="header"><td class="c" colspan="2">Sistema solare</td></tr>'+
                  ' <tr class="header"><td class="l"><input id="minSystemRange"  value="1" size="5" maxlength="3"  type="text"></td>'+
                                                '<td class="l"><input id="maxSystemRange" value="1" size="5" maxlength="3" type="text"></td></tr>'+
        '</tbody>'+
        '</table>'+
       ' </td>'+
       ' </tr>'+
       ' <tr>'+
       ' <td class="header" align="right">nome alleanza: </td><td class="header"><input id="allyTag" value="" size="17" maxlength="20" type="text"></td>'+
       ' </tr>'+
       ' <tr>'+
       ' <td class="header"  colspan="2" align="center"><input value="Cerca" title="Cerca tutti i membri di un\'alleanza" type="button" onclick="lookForAlly()"></td></tr>'+
       ' <td class="header" colspan="2" align="right"><input id="oc" value="-" title="Cerca tutti i membri di un\'alleanza" type="button" onclick="opClose(\'oc\',\'scrollResults\')"></td></tr>'+
       ' <tr><td class="header" colspan="2" ><DIV id="scrollResults" style ="height: 300px; overflow-x:hidden;overflow-y:scroll;"><table  border="1px" id="allyMembers"></table></DIV></td></tr>'+
       ' </TABLE>';
       allyParent.appendChild(boxScan);
      
}

unsafeWindow.openScanBox = function(callerNode){
var boxS = document.getElementById("BoxScan");
if (boxS.style.visibility == "hidden")  boxS.style.visibility = "visible";  else  boxS.style.visibility = "hidden";
}
unsafeWindow.lookForAlly = function(){
document.getElementById("allyMembers").innerHTML = '';
var r1=document.getElementById('minGalaxyRange');
var r2=document.getElementById('maxGalaxyRange');
var r3=document.getElementById('minSystemRange');
var r4=document.getElementById('maxSystemRange');
var an = document.getElementById('allyTag');
if (isNaN(parseInt(r1.value)) ||  isNaN(parseInt(r2.value)) || (r1.value>r2.value) ||  (r1.value<0 || r2.value<0) || isNaN(parseInt(r3.value)) || isNaN(parseInt(r4.value))  || (r3.value>r4.value) || (r3.value<0 || r4.value<0) || (an.value.length == 0)) alert("Input non valido! \n Il tuo tasso alcolico è troppo basso! \n Ritenta quando sarai più sbronzo!"); else {
var sess = "";
var v1    = parseInt(r1.value);
var v2    = parseInt(r2.value);
var v3    = parseInt(r3.value);
var v4    = parseInt(r4.value);
var v5    = an.value;
if(confirm("Vuoi continuare? \n Verranno analizzati "+(((v2+1)-v1)*((v4+1)-v3))+" sistemi!\nLa ricerca impiegherà più di "+Math.floor((((v2+1)-v1)*((v4+1)-v3))/600)+" minuti")) {
var ogaserver = location.href;
var iGal = 0;
var iSys = 0;
if (ogaserver.indexOf('?')!=-1){ogaserver = ogaserver.split('?')[0];}
var dochtml = document.getElementsByTagName('A');
for (i = 1; i<dochtml.length;i++ ) {linki = dochtml[i]; if (linki.href.indexOf('session=') !=1) {
var l1 = linki.href.indexOf('session=')+8;
var subhref = linki.href.substring(l1);
if (subhref.indexOf('&')!=-1) sess = subhref.substring(0,subhref.indexOf('&')); else sess = subhref;
break;} }
for (iGal=(v1);iGal<=(v2);iGal++){
    for (iSys=(v3);iSys<=(v4);iSys++){
      
     //apro
  setTimeout("go("+iGal+","+iSys+",'"+ogaserver+"','"+sess+"','"+v5+"')",100);
 //chiudo
      
     }    
  }
 } 
}
}
unsafeWindow.go = function(iGal,iSys,ogaserver,sess,an){
  var iG=iGal;
  var iS=iSys;
  GM_xmlhttpRequest({
    method: "POST",
    url: ogaserver,
    data: "page=galaxy&session="+ sess +"&no_header=1&galaxy="+iG+"&system="+iS+"",
    headers: {
      "User-agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; it; rv:1.8.1.14) Gecko/20080404 Firefox/2.0.0.14",
      "Content-type": "application/x-www-form-urlencoded",
      "Accept": "text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
      "Referer": ogaserver
    },
    onload:  function(responseDetails) {
        var showResultNode = document.getElementById("allyMembers");       
        var allyName         = an;
        var planet = "";
        var player = "";
        var ally     = "";
        var htmlString = responseDetails.responseText;
        var i1 = null;
        var i2 = null;
             var i=0;
             while (htmlString.indexOf('<a href="#"  tabindex=') != -1) {
             htmlString = htmlString.substring(htmlString.indexOf('tabindex=') +10);
                          i1=htmlString.indexOf('<td class=c colspan=2 >')+23;
                         htmlString = htmlString.substring(i1);
                         i2=htmlString.indexOf('</td>');
                          planet = htmlString.substring(0,i2);
                          htmlString = htmlString.substring(i2+5);
                         i1=htmlString.indexOf('<td class=c >')+13;
                         htmlString = htmlString.substring(i1);
                         i2=htmlString.indexOf('</td>');
                         player = htmlString.substring(0,i2);
                          htmlString = htmlString.substring(i2+5);
                         if ( (htmlString.indexOf('<a href="#"  tabindex=')  > htmlString.indexOf('<td class=c >')) || (((htmlString.indexOf('<a href="#"  tabindex=')  == -1) &&  (htmlString.indexOf('<td class=c >') != -1) ) ) )
                         {i1=htmlString.indexOf('<td class=c >')+13;
                         htmlString = htmlString.substring(i1);
                         i2=htmlString.indexOf('</td>');
                         ally = htmlString.substring(0,i2);
                          }
                       if (ally.indexOf(' '+allyName+' ')!=-1) showResultNode.innerHTML+= '<TR><TD align="left">' +planet.substring(planet.indexOf(' '))+'</TD><TD align ="left">'+player.substring(player.indexOf(' '))+'</TD></TR>';  
                        
             }    
   
    }
  }); 
 }

unsafeWindow.opClose = function(bId,sId){
var bNode = document.getElementById(bId);
var sNode = document.getElementById(sId);
if(bNode.value == '-') {sNode.style.height = '0px';bNode.value = '+';} else  {sNode.style.height = '300px';bNode.value = '-';}
}

if (addBoxLink() == 1) addBox();