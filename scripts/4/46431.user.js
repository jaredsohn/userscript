// ==UserScript==
// @name           Builder
// @namespace      Blet
// @include        http://nl*.Tribalwars.nl*screen=main*
// ==/UserScript==

names=Array();
types=Array();
doc=this.document;


/*
 *
 * HIER DARF GEAENDERT WERDEN ;)
 *
 */

max=2; // max. Auftraege


 // DorpType 1

names[0]="Uitgebouwd"; // Dorpnaam
types[0]=Array();
types[0]["main"]=20; // max. Hoofdgebouw
types[0]["barracks"]=25; // max. Kazerne
types[0]["stable"]=20; // max. Stal
types[0]["garage"]=5; // max. Werkplaats
types[0]["snob"]=3; // max. Adelshoeve
types[0]["smith"]=20; // max. Smederij
types[0]["place"]=1; // max. Verzamelplaats
types[0]["market"]=20; // max. Marktplaats
types[0]["wood"]=30; // max. Houthakkers
types[0]["stone"]=30; // max. Leemgroeve
types[0]["iron"]=30; // max. Ijzermijn
types[0]["farm"]=30; // max. Boerderij
types[0]["storage"]=30; // max. Opslagplaats
types[0]["hide"]=10; // max. Schuilplaats
types[0]["wall"]=20; // max. Muur


/*
 *
 * AB HIER NICHTS AENDERN...
 *
 */

n2n=Array();n2n["Hauptgebï¿½ude"]="main";n2n["Kaserne"]="barracks";n2n["Stall"]="stable";n2n["Werkstatt"]="garage";n2n["Adelshof"]="snob";n2n["Schmiede"]="smith";n2n["Versammlungsplatz"]="place";n2n["Marktplatz"]="market";n2n["Holzfï¿½ller"]="wood";n2n["Lehmgrube"]="stone";n2n["Eisenmine"]="iron";n2n["Bauernhof"]="farm";n2n["Speicher"]="storage";n2n["Versteck"]="hide";n2n["Wall"]="wall";
buildings=Array("main","barracks","stable","garage","snob","smith","place","market","wood","stone","iron","farm","storage","hide","wall");

search=doc.getElementsByTagName("a");
for(var i=0; i<search.length;i++) {
 if(search[i].getAttribute("href").search(/action=cancel/) != -1) {
  max--;

  x=search[i].parentNode.parentNode.childNodes[1].firstChild.data;
  x=x.replace(/\)/,"").split(" ");

  for(var k=0;k<types.length;k++) {
   types[k][n2n[x[0]]]--; }
  }
 }

 tobuild=Array();
 for(var k=0;k<types.length;k++) {
  tobuild[names[k]]="";
 }

 search=doc.getElementsByTagName("a");
 for(var i=0; i<search.length;i++) {
  // Buttons einfuegen
  if(search[i].getAttribute("href")=="help2.php?article=buildings") {

  for(var k=0;k<types.length;k++) {
   search[i].parentNode.appendChild(document.createElement("br"));
   butt=document.createElement("input");
   butt.setAttribute("type","button");
   butt.setAttribute("value",names[k]+"-Dorf");
   butt.setAttribute("id",names[k]+"build");
   butt.disabled=true;
   search[i].parentNode.appendChild(butt);
  }
 }

 if(max > 0) { 

  if(search[i].getAttribute("href").match(/action=build/)) {

   // Konstanten ermitteln
   h=search[i].getAttribute("href").match(/h=.+/)+"";
   h=h.substring(2);
   village=search[i].getAttribute("href").match(/age=[0-9]+&/)+"";
   village=village.substring(4,village.indexOf("&"));

   x=search[i].getAttribute("href").match(/id=[a-z]+\&/)+"";
   x=x.substring(3,x.indexOf("&"))

   aktuelle_stufe=search[i].parentNode.parentNode.childNodes[1].childNodes[1].data.match(/[0-9]+/);

   for(var k=0;k<types.length;k++) {
    if(tobuild[names[k]]=="")
     if(aktuelle_stufe<types[k][x]) {
      tobuild[names[k]]=x;
     }
    }
   }
  }

  for(var k=0;k<types.length;k++) {
   if(tobuild[names[k]]!="") {
    document.getElementById(names[k]+"build").setAttribute("onclick","location.replace('game.php?village="+village+"&screen=main&action=build&id="+tobuild[names[k]]+"&h="+h+"');");
    document.getElementById(names[k]+"build").disabled=false;
   }
  }
}









