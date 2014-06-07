// ==UserScript==
// @name           Stämme - Einheitenzusammenfassung
// @namespace      Stämme - Einheitenzusammenfassung
// @description    Stämme - Einheitenzusammenfassung
// @include        http://de*.die-staemme.de/game.php?village=*&screen=barracks*
// @include        http://de*.die-staemme.de/game.php?village=*&screen=stable*
// @include        http://de*.die-staemme.de/game.php?village=*&screen=garage*
// ==/UserScript==
sites=[/barracks/, /stable/, /garage/];
for(i=0;i<sites.length;i++){
    if(sites[i].exec(window.location.href)!=null){
        site=i;
    }
}
num=0;
Namen=[["spear", "sword", "axe", "archer"],
       ["spy", "light", "marcher", "heavy"],
       ["ram", "catapult"]]
NamenRegEx=[[/Speer/, /Schwert/, /Axt/, /Bogen/],
            [/Sp.her/, /Leicht/, /Beritten/, /Schwer/],
            [/Ramm/, /Kata/]];
Anzahl=new Array();
Zahl=new Array(0,0,0,0);
if(document.getElementsByClassName("lit").length==1){
    BauKnoten=document.getElementsByClassName("vis")[1].lastChild;
    for(i=1;i<BauKnoten.getElementsByTagName("tr").length;i++){
        Daten=BauKnoten.getElementsByTagName("tr")[i].firstChild.nextSibling.firstChild.data;
        DatenArray=Daten.split(" ");
        for(a=0;a<Namen[site].length;a++){
            if(DatenArray[1].search(NamenRegEx[site][a])!= -1){
                Zahl[a]=Zahl[a]*1+DatenArray[0]*1;
                break;
            }
        }
    }
}
function eintragen(){
test=Anzahl[i].split("/");
Zahl[i]=String(Zahl[i]*1+parseInt(test[1])*1);
}
for(i=0;i<Namen[site].length;i++){
    try{
        Node=document.getElementsByName(Namen[site][i])[0];
        Anzahl[i]=Node.parentNode.previousSibling.previousSibling.firstChild.data;
        eintragen();
        document.getElementsByName(Namen[site][i])[0].parentNode.previousSibling.previousSibling.firstChild.data+="/"+Zahl[i];
    }catch (e){
        Anzahl[i]=document.getElementsByClassName("inactive")[num].previousSibling.previousSibling.firstChild.data;
        eintragen();
        document.getElementsByClassName("inactive")[num].previousSibling.previousSibling.firstChild.data+="/"+Zahl[i];
        num++;
    }
}
Node=document.getElementsByClassName("vis")[document.getElementsByClassName("vis").length-1];
Node.lastChild.firstChild.getElementsByTagName("th")[3].firstChild.data+="/Alles";