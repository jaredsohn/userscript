// ==UserScript==
// @name           Sokker - Skills value tip
// @include        http://online.sokker.org/players.php*
// @include        http://online.sokker.org/player.php*
// ==/UserScript==

var skills = document.body.getElementsByTagName("b");
var value;
for (i=0; i<skills.length; i++) {
  value = getSkillIndex(skills[i].innerHTML);
  if (value!=-1) {
   skills[i].setAttribute("title", value);
  }
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
if(theSkill=="unsatisfactory") return 2;
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
if(theSkill=="unearthly") return 16;
if(theSkill=="divine") return 17;
//Espa?ol
if(theSkill=="tr\u00E1gico") return 0;
if(theSkill=="tr\u00E1gica") return 0;
if(theSkill=="terrible") return 1;
if(theSkill=="deficiente") return 2;
if(theSkill=="pobre") return 3;
if(theSkill=="d\u00E9bil") return 4;
if(theSkill=="regular") return 5;
if(theSkill=="aceptable") return 6;
if(theSkill=="bueno") return 7;
if(theSkill=="buena") return 7;
if(theSkill=="s\u00F3lido") return 8;
if(theSkill=="s\u00F3lida") return 8;
if(theSkill=="muy bueno") return 9;
if(theSkill=="muy buena") return 9;
if(theSkill=="excelente") return 10;
if(theSkill=="formidable") return 11;
if(theSkill=="destacado") return 12;
if(theSkill=="destacada") return 12;
if(theSkill=="incre\u00EDble") return 13;
if(theSkill=="brillante") return 14;
if(theSkill=="m\u00E1gico") return 15;
if(theSkill=="m\u00E1gica") return 15;
if(theSkill=="sobrenatural") return 16;
if(theSkill=="divino") return 17;
if(theSkill=="divina") return 17;
return -1;
}