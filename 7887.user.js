// by Manda_Chuva (23893)

// ==UserScript==
// @name           Sokker NT Database
// @description    Version 0.1 - This script fills automaticaly NT Databases forms available on the internet.
// @include        http://online.sokker.org/player.php*
// @include        http://62.233.129.98/sokker/player.php*
// ==/UserScript==

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };
String.prototype.removeNonDigit =   function() { return this.replace(/\D/g, ""); };

var tables = document.getElementsByTagName("table");
position=tables.length-4;

var NT = document.createElement("a");

var player = tables[position].rows[0].cells[0].getElementsByTagName("b");
var pid = tables[1].rows[0].cells[0].getElementsByTagName("h1");
var skill1 = tables[position+1].rows[0].cells[0].getElementsByTagName("b");
var skill2 = tables[position+1].rows[0].cells[1].getElementsByTagName("b");
var skill3 = tables[position+1].rows[1].cells[0].getElementsByTagName("b");
var skill4 = tables[position+1].rows[1].cells[1].getElementsByTagName("b");
var skill5 = tables[position+1].rows[2].cells[0].getElementsByTagName("b");
var skill6 = tables[position+1].rows[2].cells[1].getElementsByTagName("b");
var skill7 = tables[position+1].rows[3].cells[0].getElementsByTagName("b");
var skill8 = tables[position+1].rows[3].cells[1].getElementsByTagName("b");
var team = tables[position].rows[0].cells[0].getElementsByTagName("a");
position2=team.length-4;
if(position2<0) position2=0;
var aux1=getNodeValue(pid[0]).replace("]","").split("[");
var aux2=team[position2].href.replace("&","=").split("=");
var aux3=team[position2+1].href.replace("&","=").split("=");

var login=aux2[1];
var name=player[0].childNodes[0].nodeValue.trim();
var pid=aux1[1];
var age=player[1].childNodes[0].nodeValue.trim();
var sta=getSkillIndex(getNodeValue(skill1[0]));
var kee=getSkillIndex(getNodeValue(skill2[0]));
var pac=getSkillIndex(getNodeValue(skill3[0]));
var def=getSkillIndex(getNodeValue(skill4[0]));
var tec=getSkillIndex(getNodeValue(skill5[0]));
var pla=getSkillIndex(getNodeValue(skill6[0]));
var pas=getSkillIndex(getNodeValue(skill7[0]));
var str=getSkillIndex(getNodeValue(skill8[0]));

var country=aux3[1];
var url="http://sokker.awardspace.com/ntdb/error.php?";

if(country==21) url="http://sokker.awardspace.com/ntdb/index.php?";

url=url+"login="+login+"&name="+name+"&pid="+pid+"&age="+age+"&sta="+sta+"&kee="+kee+"&pac="+pac+"&def="+def+"&tec="+tec+"&pla="+pla+"&pas="+pas+"&str="+str;

var IMG = document.createElement("img");
IMG.src="http://www.sokkerfiles.net/pic/flags/"+country+".png";
IMG.border=0;
NT.appendChild(IMG);
NT.href = url;
//document.body.insertBefore(NT, lastChild);
tables[position].rows[0].cells[0].appendChild(NT);

function getNodeValue(theNode) {
 for (var i = 0; ((i < 10) && (theNode.nodeValue == null)); i++) {
  theNode = theNode.firstChild;
 }
 return theNode.nodeValue;  
}

function getSkillIndex(theSkill) {
//Portuguese
 if(theSkill=="Terr\u00EDvel") return 0;
 if(theSkill=="P\u00E9ssimo") return 1;
 if(theSkill=="Insatisfat\u00F3rio") return 2;
 if(theSkill=="Ruim") return 3;
 if(theSkill=="Fraco") return 4;
 if(theSkill=="Mediano") return 5;
 if(theSkill=="Razo\u00E1vel") return 6;
 if(theSkill=="Bom") return 7;
 if(theSkill=="S\u00F3lido") return 8;
 if(theSkill=="Muito Bom") return 9;
 if(theSkill=="Excelente") return 10;
 if(theSkill=="Formid\u00E1vel") return 11;
 if(theSkill=="Fenomenal") return 12;
 if(theSkill=="Incr\u00EDvel") return 13;
 if(theSkill=="Brilhante") return 14;
 if(theSkill=="Magn\u00EDfico") return 15;
 if(theSkill=="Sobrenatural") return 16;
 if(theSkill=="Lend\u00E1rio") return 17;
//English
 if(theSkill=="tragic") return 0;
 if(theSkill=="hopeless") return 1;
 if(theSkill=="unsactisfatory") return 2;
 if(theSkill=="poor") return 3;
 if(theSkill=="weak") return 4;
 if(theSkill=="average") return 5;
 if(theSkill=="adequate") return 6;
 if(theSkill=="good") return 7;
 if(theSkill=="solid") return 8;
 if(theSkill=="very good") return 9;
 if(theSkill=="excellent") return 10;
 if(theSkill=="formidable") return 11;
 if(theSkill=="outstanding") return 12;
 if(theSkill=="incredible") return 13;
 if(theSkill=="brilliant") return 14;
 if(theSkill=="magical") return 15;
 if(theSkill=="unearthy") return 16;
 if(theSkill=="divine") return 17;

 return 0;
}