// ==UserScript== 
// @name          Blood Wars testStuff
// @namespace     http://r*.fr.bloodwars.net/test_items.php
// @description   A Greasemonkey script that show test stuff.
// @include       http://r*.fr.bloodwars.net/test_items.php*
// @author	  	  Millasseau Mickaël
// @license       Freeware
// @version       2013.06.10
// @updateURL	  https://userscripts.org/scripts/source/172012.meta.js
// ==/UserScript==

function new_div() {
	maDiv = document.createElement("div");
	maDiv.id = 'testStuff';
	maDiv.className = 'lesTests';
	maDiv.innerHTML = "<br />";
	maDiv.innerHTML = "<img src='http://img.xooimage.com/files3/9/9/0/icone-attention-3ab983.png'> Avant toute chose, n'oubliez pas de rentrer le niveau de votre personnage ! <img src='http://img.xooimage.com/files3/9/9/0/icone-attention-3ab983.png'><br /><br />";
	maDiv.innerHTML += "Note : Les améliorations affectés aux objets directement sont pris en compte par le site et donc pas par le script<br /><br />";
	maDiv.setAttribute('style','float: center; width: auto; height: auto; padding: 10px; text-align: center; border: 1px solid lightgray;');
	var nbDiv = document.getElementsByTagName("div");
	nbDiv[14].appendChild(maDiv);
	new_div2();
	new_div3();	
	new_div4();
	var links = document.getElementsByTagName('a');
	var page = document.location.href;
	if (isNaN(page.charAt(page.indexOf('&playerLvl=')+13)) == false){
	   page = page.substring(page.indexOf('&playerLvl=')+14,page.length);
	} else {
	   page = page.substring(page.indexOf('&playerLvl=')+13,page.length);
	}
	for(var i = 0; i < links.length; i++){
	   links[i].href += page;
	}
	addSaveItem();
}

function new_div2() {
	monDiv = document.createElement("div");
	monDiv.setAttribute('style','float: left; width: auto; height: auto; padding: 20px; text-align: left;');
	monDiv.id = 'caracPerso';
	monDiv.className = 'caracs';
    var page = document.location.href;
	monDiv.innerHTML = "<b>Les caractéristiques de votre personnage </b><br />(en entrainement)<br /><br /><TABLE border=1><TR><TD>force</TD><TD><INPUT type=text size='3' name='cforce'></TD></TR><TR><TD>agilité</TD><TD><INPUT type=text size='3' name='cagilite'></TD></TR><TR><TD>résistance</TD><TD><INPUT type=text size='3' name='cresistance'></TD></TR><TR><TD>apparence</TD><TD><INPUT type=text size='3' name='capparence'></TD></TR><TR><TD>charisme</TD><TD><INPUT type=text size='3' name='ccharisme'></TD></TR><TR><TD>réputation</TD><TD><INPUT type=text size='3' name='creputation'></TD></TR><TR><TD>perception</TD><TD><INPUT type=text size='3' name='cperception'></TD></TR><TR><TD>intelligence</TD><TD><INPUT type=text size='3' name='cintelligence'></TD></TR><TR><TD>savoir</TD><TD><INPUT type=text size='3' name='csavoir'></TD></TR><TR><TD colspan='2' align='center'><input name='saveCaracsPerso' id='test52' type='submit' value='valider' ></TD></TR></TABLE>";
	var endroit = document.getElementById("testStuff");
	endroit.appendChild(monDiv);
	var targetNameObject2 = document.getElementsByName("saveCaracsPerso");
	targetNameObject2[0].addEventListener("click",regCaracsPerso,false);
	testCaracsPerso();
}

function new_div3() {
	monDiv = document.createElement("div");
	monDiv.setAttribute('style','float: left; width: auto; height: auto; padding: 20px; text-align: left;');
	monDiv.id = 'lesItems';
	monDiv.className = 'items';
	monDiv.innerHTML = "<b>Objets enregistrés : </b><br /><br />"; 
	if(getQueryParam('arme1') != false)
	   monDiv.innerHTML += "<span id='arme1'>Arme1 : " + remplaceExpr(recupObjetsReg('arme1')[0].toString(),'_',' ') + "</span>";
	if(getQueryParam('arme2') != false)
	   monDiv.innerHTML += "<span id='arme2'>Arme2 : " + remplaceExpr(recupObjetsReg('arme2')[0].toString(),'_',' ') + "</span>";
	if(getQueryParam('arme') != false)
	   monDiv.innerHTML += "<span id='arme'>Arme : " + remplaceExpr(recupObjetsReg('arme')[0].toString(),'_',' ') + "</span>";
	if(getQueryParam('tete') != false)
	   monDiv.innerHTML += "<span id='tete'>Tete : " + remplaceExpr(recupObjetsReg('tete')[0].toString(),'_',' ') + "</span>";
	if(getQueryParam('haut') != false)
	   monDiv.innerHTML += "<span id='haut'>Haut : " + remplaceExpr(recupObjetsReg('haut')[0].toString(),'_',' ') + "</span>";
	if(getQueryParam('lebas') != false)
	   monDiv.innerHTML += "<span id='lebas'>Bas : " + remplaceExpr(recupObjetsReg('lebas')[0].toString(),'_',' ') + "</span>";
	if(getQueryParam('cou') != false)
	   monDiv.innerHTML += "<span id='cou'>Cou : " + remplaceExpr(recupObjetsReg('cou')[0].toString(),'_',' ') + "</span>";
	if(getQueryParam('doigt1') != false)
	   monDiv.innerHTML += "<span id='doigt1'>Doigt1 : " + remplaceExpr(recupObjetsReg('doigt1')[0].toString(),'_',' ') + "</span>";
	if(getQueryParam('doigt2') != false)
	   monDiv.innerHTML += "<span id='doigt2'>Doigt2 : " + remplaceExpr(recupObjetsReg('doigt2')[0].toString(),'_',' ') + "</span>";
	monDiv.innerHTML += "<span id='exiMax'><br /><br /><b> Exigences maximales à atteindre : </b><br /></span>";
	var endroit = document.getElementById("testStuff");
	endroit.appendChild(monDiv);
}

function new_div4() {
	monDiv = document.createElement("div");
	monDiv.setAttribute('style','float: left; width: auto; height: auto; padding: 20px; text-align: left;');
	monDiv.id = 'lesStas';
	monDiv.className = 'stats';
	monDiv.innerHTML = " <b>Statistiques totales : </b><br /><br />";
	monDiv.innerHTML += "<INPUT type=hidden name='arme1dommin' value='0'><INPUT type=hidden name='arme1dommincrit' value='0'><INPUT type=hidden name='arme1dommax' value='0'><INPUT type=hidden name='arme1dommaxcrit' value='0'><INPUT type=hidden name='arme1nbatk' value='0'><INPUT type=hidden name='arme2dommin' value='0'><INPUT type=hidden name='arme2dommincrit' value='0'><INPUT type=hidden name='arme2dommax' value='0'><INPUT type=hidden name='arme2dommaxcrit' value='0'><INPUT type=hidden name='arme2nbatk' value='0'><INPUT type=hidden name='armedommin' value='0'><INPUT type=hidden name='armedommincrit' value='0'><INPUT type=hidden name='armedommax' value='0'><INPUT type=hidden name='armedommaxcrit' value='0'><INPUT type=hidden name='armenbatk' value='0'>";
	monDiv.innerHTML += "<INPUT type=hidden name='deftot' value='0'>";
	monDiv.innerHTML += "<span id='arme1domtxt' style='display:none'>Arme 1 : Dommages nb1 - nb2  X nb3<br />Dommages critiques : nb4 - nb5 <br /></span>";
	monDiv.innerHTML += "<span id='arme2domtxt' style='display:none'>Arme 2 : Dommages nb1 - nb2  X nb3<br />Dommages critiques : nb4 - nb5 <br /></span>";
	monDiv.innerHTML += "<span id='armedomtxt' style='display:none'>Arme : Dommages nb1 - nb2  X nb3<br />Dommages critiques : nb4 - nb5 <br /></span>";
	monDiv.innerHTML += "<span id='deftottxt' style='display:none'><br />Défense totale : nb<br /><br /></span>";
	monDiv.innerHTML += "<br />force <INPUT type=text size='1' name='force' value='0' readonly><br />";
	monDiv.innerHTML += "agilité <INPUT type=text size='1' name='agilite' value='0' readonly><br />";
	monDiv.innerHTML += "résistance <INPUT type=text size='1' name='resistance' value='0' readonly><br />";
	monDiv.innerHTML += "apparence <INPUT type=text size='1' name='apparence' value='0' readonly><br />";
	monDiv.innerHTML += "charisme <INPUT type=text size='1' name='charisme' value='0' readonly><br />";
	monDiv.innerHTML += "réputation <INPUT type=text size='1' name='reputation' value='0' readonly><br />";
	monDiv.innerHTML += "perception <INPUT type=text size='1' name='perception' value='0' readonly><br />";
	monDiv.innerHTML += "intelligence <INPUT type=text size='1' name='intelligence' value='0' readonly><br />";
	monDiv.innerHTML += "savoir <INPUT type=text size='1' name='savoir' value='0' readonly><br />";
	monDiv.innerHTML += "chance <INPUT type=text size='1' name='chance' value='0' readonly><br />";
	monDiv.innerHTML += "<INPUT type=hidden name='stopatk' value='0'><INPUT type=hidden name='modificateur_de_dommages_critiques_de_l_arme' value='0'><INPUT type=hidden name='facilite' value='0'><INPUT type=hidden name='regenpdv' value='0'><INPUT type=hidden name='precision_de_chaque_arme' value='0'><INPUT type=hidden name='defense_du_personnage' value='0'><INPUT type=hidden name='sangperh' value='0'><INPUT type=hidden name='pts_de_sang' value='0'><INPUT type=hidden name='pts_de_vie_de_base' value='0'><INPUT type=hidden name='precision_des_armes_blanches' value='0'><INPUT type=hidden name='degintel' value='0'><INPUT type=hidden name='deginteldom' value='0'><INPUT type=hidden name='defmax' value='0'><INPUT type=hidden name='precision' value='0'><INPUT type=hidden name='chancehit' value='0'><INPUT type=hidden name='cc' value='0'><INPUT type=hidden name='atklvl' value='0'><INPUT type=hidden name='atklvldom' value='0'><INPUT type=hidden name='dommages_de_chaque_arme' value='0'><INPUT type=hidden name='dommages_minimaux_de_chaque_arme' value='0'><INPUT type=hidden name='dommages_maximaux_de_chaque_arme' value='0'><INPUT type=hidden name='dommage_totale_d_arme' value='0'><INPUT type=hidden name='dommage_totale_d_arme1' value='0'><INPUT type=hidden name='dommage_totale_d_arme2' value='0'><INPUT type=hidden name='deflvl' value='0'><INPUT type=hidden name='deflvltot' value='0'><INPUT type=hidden name='ignoredef' value='0'><INPUT type=hidden name='atksup' value='0'><INPUT type=hidden name='pdvperhit' value='0'><INPUT type=hidden name='chancehitsavoir' value='0'><INPUT type=hidden name='chance_d_un_coup_critique_a_l_arme_a_feu' value='0'><INPUT type=hidden name='esquive' value='0'>";
	monDiv.innerHTML += "<span id='precisiontxt' style='display:none'>Précision nb<br /></span>";
	monDiv.innerHTML += "<span id='precision_des_armes_blanchestxt' style='display:none'>(Précision des armes blanches nb)<br /></span>";
	monDiv.innerHTML += "<span id='precision_de_chaque_armetxt' style='display:none'>Précision de chaque arme + nb<br /></span>";
	monDiv.innerHTML += "<span id='chancehittxt' style='display:none'>Chance de toucher avec une arme est augmentée de nb%<br /></span>";
	monDiv.innerHTML += "<span id='chancehitsavoirtxt' style='display:none'>Chance de toucher avec une arme est augmentée de la valeur du savoir (nb)<br /></span>";
	monDiv.innerHTML += "<span id='atksuptxt' style='display:none'>nb attaques supplémentaires par armes par manche<br /></span>";
	monDiv.innerHTML += "<span id='stopatktxt' style='display:none'>L`ennemi est privé d`attaques pendant la première manche du combat<br /></span>";
	monDiv.innerHTML += "<span id='cctxt' style='display:none'>Coups critiques nb %<br /></span>";
	monDiv.innerHTML += "<span id='chance_d_un_coup_critique_de_l_armetxt' style='display:none'>Chance d`un coup critique de l`arme nb %<br /></span>";
	monDiv.innerHTML += "<span id='chance_d_un_coup_critique_de_l_arme1txt' style='display:none'>Chance d`un coup critique de l`arme1 nb %<br /></span>";
	monDiv.innerHTML += "<span id='chance_d_un_coup_critique_de_l_arme2txt' style='display:none'>Chance d`un coup critique de l`arme2 nb %<br /></span>";
	monDiv.innerHTML += "<span id='ignoredeftxt' style='display:none'>Ignore nb % de la défense des ennemis<br /></span>";
	monDiv.innerHTML += "<span id='atklvltxt' style='display:none'>Dommages de chaque arme augmentés de nb1/4 niveaux d`expériences<br />(+nb2 dommages)<br /></span>";
	monDiv.innerHTML += "<span id='dommages_de_chaque_armetxt' style='display:none'>Dommages de chaque arme nb <br /></span>";
	monDiv.innerHTML += "<span id='dommages_minimaux_de_chaque_armetxt' style='display:none'>Dommages minimaux de chaque arme +nb <br /></span>";
	monDiv.innerHTML += "<span id='dommages_maximaux_de_chaque_armetxt' style='display:none'>Dommages maximaux de chaque arme +nb <br /></span>";
	monDiv.innerHTML += "<span id='defense_du_personnagetxt' style='display:none'>Défense du personnage nb <br /></span>";
	monDiv.innerHTML += "<span id='deginteltxt' style='display:none'>Dégâts augmentés de 1/nb1 du savoir<br />(+nb2 dommages)<br /></span>";
	monDiv.innerHTML += "<span id='dommage_totale_d_armetxt' style='display:none'>Dommages total d'arme +nb%<br /></span>";
	monDiv.innerHTML += "<span id='dommage_totale_d_arme1txt' style='display:none'>Dommages total d'arme1 nb%<br /></span>";
	monDiv.innerHTML += "<span id='dommage_totale_d_arme2txt' style='display:none'>Dommages total d'arme2 nb%<br /></span>";
	monDiv.innerHTML += "<span id='modificateur_de_dommages_critiques_de_l_armetxt' style='display:none'>Modificateur de dommages critiques de l`arme +nb%<br /></span>";
	monDiv.innerHTML += "<span id='deflvltxt' style='display:none'>Défense augmentée de nb1/4 niveaux d`expériences<br />(+nb2 défense)<br /></span>";
	monDiv.innerHTML += "<span id='pdvperhittxt' style='display:none;'>nb point de vie par attaques<br /></span>";
	monDiv.innerHTML += "<span id='esquivetxt' style='display:none;'>Esquive + nb%<br /></span>";
	monDiv.innerHTML += "<span id='defmaxtxt' style='display:none;'>Défense maximale venante des objets = 0<br /></span>";
	monDiv.innerHTML += "<span id='pts_de_vie_de_basetxt' style='display:none;'>Points de vie de base + nb%<br /></span>";
	monDiv.innerHTML += "<span id='pts_de_sangtxt' style='display:none;'>Points de sang nb%<br /></span>";
	monDiv.innerHTML += "<span id='sangperhtxt' style='display:none;'>nb litres de sang / h<br /></span>";
	monDiv.innerHTML += "<span id='regenpdvtxt' style='display:none;'>Régénère nb points de vie après chaque manche de combat<br /></span>";
	monDiv.innerHTML += "<span id='facilitetxt' style='display:none;'>Facilité nb%<br /></span>";
	var endroit = document.getElementById("testStuff");
	endroit.appendChild(monDiv);
	regExigences();
	displayLesExigences();
}

function getQueryParam(param) {
    var result =  window.location.search.match(
        new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
    );
    return result ? result[3] : false;
}

function remplaceExpr(expr,a,b) {
    var k=0;
    while (k!=-1) {
         k=expr.indexOf(a,k);
         if (k>=0) {
            expr=expr.substring(0,k)+b+expr.substring(k+a.length);
            k+=b.length;
         }
     }
     return expr;
}

function removeAccents(strAccents){
    strAccents = strAccents.split('');
    strAccentsOut = new Array();
    strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = ['A','A','A','A','A','A','a','a','a','a','a','a','O','O','O','O','O','O','O','o','o','o','o','o','o','E','E','E','E','e','e','e','e','e','C','c','D','I','I','I','I','i','i','i','i','U','U','U','U','u','u','u','u','N','n','S','s','Y','y','y','Z','z'];
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut[accents.indexOf(strAccents[y])];
        }
        else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}

function addSaveItem(){
    var lesTypesItem = new Array(["0"],["12","13","14","15","16","17","18","51","52","53"],["1","2","3","4","30","31","32","33","34","35"],["5","36","37"],["6","38","39","40","41"],["7","8","9","10","42","43","44","45","46","47"],["11","48","49","50"],["19","20","21","22","23","54","55","56","57","58"],["24","25","26","59","60","61","62"],["27","28","29","63","64","65","66"],["67","68","69","70","71","72","73","74","75","76","77"]);
    var nameObject = document.getElementsByTagName("span");
    for (var i=0; i<lesTypesItem.length; i++){
        for (var j=0; j<lesTypesItem[i].length; j++){
            if (( getQueryParam('baseType') == lesTypesItem[i][j]) && (i == 0)){
                nameObject[0].innerHTML += " Vous ne pouvez pas enregistrer ce type d'objet";
                break;
            }
            if (( getQueryParam('baseType') == lesTypesItem[i][j]) && (i == 1)){
                nameObject[0].innerHTML += " <img id='save01' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant qu'arme 1";
                nameObject[0].innerHTML += " <img id='save02' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant qu'arme 2";
                var targetNameObject1 = document.getElementById("save01");
                targetNameObject1.addEventListener("click",function() {regObject('arme1');},false);
                var targetNameObject2 = document.getElementById("save02");
                targetNameObject2.addEventListener("click",function() {regObject('arme2');},false);
                break;
            }
            if (( getQueryParam('baseType') == lesTypesItem[i][j]) && (i == 2)){
                nameObject[0].innerHTML += " <img id='save03' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant que tête";
                var targetNameObject1 = document.getElementById("save03");
                targetNameObject1.addEventListener("click",function() {regObject('tete');},false);
                break;
            }
            if (( getQueryParam('baseType') == lesTypesItem[i][j]) && (i == 3)){
                nameObject[0].innerHTML += " <img id='save04' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant que doigt 1";
                nameObject[0].innerHTML += " <img id='save05' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant que doigt 2";
                var targetNameObject1 = document.getElementById("save04");
                targetNameObject1.addEventListener("click",function() {regObject('doigt1');},false);
                var targetNameObject2 = document.getElementById("save05");
                targetNameObject2.addEventListener("click",function() {regObject('doigt2');},false);
                break;
            }
            if (( getQueryParam('baseType') == lesTypesItem[i][j]) && (i == 4)){
                nameObject[0].innerHTML += " <img id='save06' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant que cou";
                var targetNameObject1 = document.getElementById("save06");
                targetNameObject1.addEventListener("click",function() {regObject('cou');},false);
                break;
            }
            if (( getQueryParam('baseType') == lesTypesItem[i][j]) && (i == 5)){
                nameObject[0].innerHTML += " <img id='save07' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant que haut";
                var targetNameObject1 = document.getElementById("save07");
                targetNameObject1.addEventListener("click",function() {regObject('haut');},false);
                break;
            }
            if (( getQueryParam('baseType') == lesTypesItem[i][j]) && (i == 6)){
                nameObject[0].innerHTML += " <img id='save08' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant que bas";
                var targetNameObject1 = document.getElementById("save08");
                targetNameObject1.addEventListener("click",function() {regObject('lebas');},false);
                break;
            }
            if (( getQueryParam('baseType') == lesTypesItem[i][j]) && (i == 7)){
                nameObject[0].innerHTML += " <img id='save09' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant qu'arme";
                var targetNameObject1 = document.getElementById("save09");
                targetNameObject1.addEventListener("click",function() {regObject('arme');},false);
                break;
            }
            if (( getQueryParam('baseType') == lesTypesItem[i][j]) && (i == 8)){
                nameObject[0].innerHTML += " <img id='save10' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant qu'arme 1";
                nameObject[0].innerHTML += " <img id='save11' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant qu'arme 2";
                var targetNameObject1 = document.getElementById("save10");
                targetNameObject1.addEventListener("click",function() {regObject('arme1');},false);
                var targetNameObject2 = document.getElementById("save11");
                targetNameObject2.addEventListener("click",function() {regObject('arme2');},false);
                break;
            }
            if (( getQueryParam('baseType') == lesTypesItem[i][j]) && (i == 9)){
                nameObject[0].innerHTML += " <img id='save12' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant qu'arme";
                var targetNameObject1 = document.getElementById("save12");
                targetNameObject1.addEventListener("click",function() {regObject('arme');},false);
                break;
            }
            if (( getQueryParam('baseType') == lesTypesItem[i][j]) && (i == 10)){
                nameObject[0].innerHTML += " <img id='save13' name='save' src='http://www.poirrier.be/~jean-etienne/info/exodus/exodus-01-floppy.png'> Enregistrer en tant qu'arme";
                var targetNameObject1 = document.getElementById("save13");
                targetNameObject1.addEventListener("click",function() {regObject('arme');},false);
                break;
            }
        }
    }
}

function regObject(vari){
    var chaine = "";
    var page = document.location.href;
    chaine = "&" + vari + "=[" + setUrlName(getNameObject()) + ";" + setUrlAttribu(getAttributObject()) + ";" + setUrlExigences(getExigencesObject());
    if (vari == ('arme1') || (vari == 'arme2') || (vari == 'arme')){
        chaine += ";dommagemin"+vari+"=" + getDomDef()[0] + "&dommagemax"+vari+"=" + getDomDef()[1] + ";" +setUrlName(getTypeArme());
    }
    if (vari == ('tete') || (vari == 'haut') || (vari == 'lebas')){
        chaine += ";defense=" + getDomDef();
    }
    chaine += "]";
    if (getQueryParam(vari) != false) {
        var page2 = page;
        page2 = page2.substring(page2.indexOf('&'+vari), page2.length);
        page2 = page2.substring(0, page2.indexOf(']')+1);
        page = remplaceExpr(page,page2,'');
    }
    if (((vari == 'arme1') || (vari == 'arme2')) && (getQueryParam('arme') != false)){
        var page2 = page;
        page2 = page2.substring(page2.indexOf('&arme'), page2.length);
        page2 = page2.substring(0, page2.indexOf(']')+1);
        page = remplaceExpr(page,page2,'');
    }
    if((vari == 'arme') && (getQueryParam('arme1') != false)){
        var page2 = page;
        page2 = page2.substring(page2.indexOf('&arme1'), page2.length);
        page2 = page2.substring(0, page2.indexOf(']')+1);
        page = remplaceExpr(page,page2,'');
    }
    if((vari == 'arme') && (getQueryParam('arme2') != false)){
        var page2 = page;
        page2 = page2.substring(page2.indexOf('&arme2'), page2.length);
        page2 = page2.substring(0, page2.indexOf(']')+1);
        page = remplaceExpr(page,page2,'');
    }
    page += chaine;
    window.location.href = page;
}

function setUrlName(chaine){
    chaine = remplaceExpr(chaine,' ','_');
    return chaine;
}

function setUrlAttribu(tab){
    var chaine = "";
    for (var i=0; i < tab.length; i++) {
        if (tab[i].charAt(0) == ' ')
            chaine += tab[i].substring(1, tab[i].length);
        else
            chaine +=tab[i];
        if((typeof(tab[i+1]) != "undefined") && (isNaN(tab[i+1]) == true))
            chaine += "&";
        else if ((typeof(tab[i+1]) != "undefined")) //&& (i >0))
                chaine += "=";
    }
    chaine = remplaceExpr(chaine,' ','_');
    return chaine;
}

function setUrlExigences(tab){
    var chaine = "";
    for (var i=0; i < tab.length; i++) {
        chaine+= tab[i];
        if((typeof(tab[i+1]) != "undefined") && (isNaN(tab[i+1]) == true))
            chaine += "&";
        if((typeof(tab[i+1]) != "undefined") && (isNaN(tab[i+1]) == false))
            chaine += "=";
    }
    return chaine;
}

function recupUrlTab(chaine) {
    var reg=new RegExp("[&=]+", "g");
    return chaine.split(reg);
}

function recupObjetsReg (type){
    if (getQueryParam(type) != false) {
        var page = document.location.href;
        page = page.substring(page.indexOf('&' + type), page.length);
        page = page.substring(page.indexOf('[')+1, page.indexOf(']'));
        var tableau = page.split(';');
        var tab = new Array();
        for (var i = 0; i < tableau.length; i++) {
            tab[i] = recupUrlTab(tableau[i]);
        }
        return tab;
    } else {
        return false;
    }
}

function regExigences(){
    var caracsPersoLib = ["force","agilite","resistance","apparence","charisme","reputation","perception","intelligence","savoir","chance","atklvl","deflvl","nbatk","ignoredef","atksup","stopatk","pdvperhit","chancehitsavoir","cc","precision","dommages_de_chaque_arme","dommages_minimaux_de_chaque_arme","dommages_maximaux_de_chaque_arme","dommage_totale_d_arme","chance_d_un_coup_critique_a_l_arme_a_feu","chancehit","esquive","defmax","degintel","precision_des_armes_blanches","pts_de_vie_de_base","pts_de_sang","sangperh","defense_du_personnage","chance_d_un_coup_critique_de_l_arme","precision_de_chaque_arme","regenpdv","facilite","modificateur_de_dommages_critiques_de_l_arme"];
    if(getQueryParam('caracs') != false){
        var caracs = recupObjetsReg('caracs');
        for (var i = 0; i<caracsPersoLib.length; i++) {
            for (var j = 0; j<caracs[0].length; j=j+2) {
                if (caracsPersoLib[i] == caracs[0][j]){
                    var tot = document.getElementsByName(caracsPersoLib[i])[0].value;
                    var leTot = parseFloat(tot) + parseFloat(caracs[0][j+1]);
                    document.getElementsByName(caracsPersoLib[i])[0].value = leTot;
                }
            }
        }
    }
    if(getQueryParam('arme1') != false){
        var arme1 = recupObjetsReg('arme1');
        for (var i = 0; i<caracsPersoLib.length; i++) {
            for (var j = 0; j<arme1[1].length; j=j+2) {
                if (caracsPersoLib[i] == arme1[1][j]){
                    if(caracsPersoLib[i] == 'nbatk'){
                        document.getElementsByName('arme1nbatk')[0].value = parseFloat(arme1[1][j+1]);
                    }else if(caracsPersoLib[i] == 'chance_d_un_coup_critique_de_l_arme'){
						document.getElementById('chance_d_un_coup_critique_de_l_arme1txt').style.display="inline";
						document.getElementById('chance_d_un_coup_critique_de_l_arme1txt').innerHTML = remplaceExpr(document.getElementById('chance_d_un_coup_critique_de_l_arme1txt').innerHTML,'nb',arme1[1][j+1]);
					}else if(caracsPersoLib[i] == 'dommage_totale_d_arme'){
						document.getElementsByName('dommage_totale_d_arme1')[0].value = arme1[1][j+1];
					}else{
                        var tot = document.getElementsByName(caracsPersoLib[i])[0].value;
                        var leTot = parseFloat(tot) + parseFloat(arme1[1][j+1]);
                        document.getElementsByName(caracsPersoLib[i])[0].value = leTot;
                    }
                }
            }
        }
        document.getElementsByName('arme1dommin')[0].value = arme1[3][1];
        document.getElementsByName('arme1dommax')[0].value = arme1[3][3];
        document.getElementById('arme1domtxt').style.display="inline";
    }
    if(getQueryParam('arme2') != false){
        var arme2 = recupObjetsReg('arme2');
        for (var i = 0; i<caracsPersoLib.length; i++) {
            for (var j = 0; j<arme2[1].length; j=j+2) {
                if (caracsPersoLib[i] == arme2[1][j]){
                    if(caracsPersoLib[i] == 'nbatk'){
                        document.getElementsByName('arme2nbatk')[0].value = parseFloat(arme2[1][j+1]);
                    }else if(caracsPersoLib[i] == 'chance_d_un_coup_critique_de_l_arme'){
						document.getElementById('chance_d_un_coup_critique_de_l_arme2txt').style.display="inline";
						document.getElementById('chance_d_un_coup_critique_de_l_arme2txt').innerHTML = remplaceExpr(document.getElementById('chance_d_un_coup_critique_de_l_arme2txt').innerHTML,'nb',arme2[1][j+1]);
					}else if(caracsPersoLib[i] == 'dommage_totale_d_arme'){
						document.getElementsByName('dommage_totale_d_arme2')[0].value = arme2[1][j+1];
					}else{
                        var tot = document.getElementsByName(caracsPersoLib[i])[0].value;
                        var leTot = parseFloat(tot) + parseFloat(arme2[1][j+1]);
                        document.getElementsByName(caracsPersoLib[i])[0].value = leTot;
                    }
                }
            }
        }
        document.getElementsByName('arme2dommin')[0].value = arme2[3][1];
        document.getElementsByName('arme2dommax')[0].value = arme2[3][3];
        document.getElementById('arme2domtxt').style.display="inline";
    }
    if(getQueryParam('arme') != false){
        var arme = recupObjetsReg('arme');
        for (var i = 0; i<caracsPersoLib.length; i++) {
            for (var j = 0; j<arme[1].length; j=j+2) {
                if (caracsPersoLib[i] == arme[1][j]){
                    if(caracsPersoLib[i] == 'nbatk'){
                        document.getElementsByName('armenbatk')[0].value = parseFloat(arme[1][j+1]);
                    }else if(caracsPersoLib[i] == 'chance_d_un_coup_critique_de_l_arme'){
						document.getElementById('chance_d_un_coup_critique_de_l_armetxt').style.display="inline";
						document.getElementById('chance_d_un_coup_critique_de_l_armetxt').innerHTML = remplaceExpr(document.getElementById('chance_d_un_coup_critique_de_l_armetxt').innerHTML,'nb',arme[1][j+1]);
					}else{
                        var tot = document.getElementsByName(caracsPersoLib[i])[0].value;
                        var leTot = parseFloat(tot) + parseFloat(arme[1][j+1]);
                        document.getElementsByName(caracsPersoLib[i])[0].value = leTot;
                    }
                }
            }
        }
        document.getElementsByName('armedommin')[0].value = arme[3][1];
        document.getElementsByName('armedommax')[0].value = arme[3][3];
        document.getElementById('armedomtxt').style.display="inline";
    }
    if(getQueryParam('tete') != false){
        var tete = recupObjetsReg('tete');
        for (var i = 0; i<caracsPersoLib.length; i++) {
            for (var j = 0; j<tete[1].length; j=j+2) {
                if (caracsPersoLib[i] == tete[1][j]){
                    var tot = document.getElementsByName(caracsPersoLib[i])[0].value;
                    var leTot = parseFloat(tot) + parseFloat(tete[1][j+1]);
                    document.getElementsByName(caracsPersoLib[i])[0].value = leTot;
                }
            }
        }
    }
    if(getQueryParam('haut') != false){
        var haut = recupObjetsReg('haut');
        for (var i = 0; i<caracsPersoLib.length; i++) {
            for (var j = 0; j<haut[1].length; j=j+2) {
                if (caracsPersoLib[i] == haut[1][j]){
                    var tot = document.getElementsByName(caracsPersoLib[i])[0].value;
                    var leTot = parseFloat(tot) + parseFloat(haut[1][j+1]);
                    document.getElementsByName(caracsPersoLib[i])[0].value = leTot;
                }
            }
        }
    }
    if(getQueryParam('lebas') != false){
        var lebas = recupObjetsReg('lebas');
        for (var i = 0; i<caracsPersoLib.length; i++) {
            for (var j = 0; j<lebas[1].length; j=j+2) {
                if (caracsPersoLib[i] == lebas[1][j]){
                    var tot = document.getElementsByName(caracsPersoLib[i])[0].value;
                    var leTot = parseFloat(tot) + parseFloat(lebas[1][j+1]);
                    document.getElementsByName(caracsPersoLib[i])[0].value = leTot;
                }
            }
        }
    }
    if(getQueryParam('cou') != false){
        var cou = recupObjetsReg('cou');
        for (var i = 0; i<caracsPersoLib.length; i++) {
            for (var j = 0; j<cou[1].length; j=j+2) {
                if (caracsPersoLib[i] == cou[1][j]){
                    var tot = document.getElementsByName(caracsPersoLib[i])[0].value;
                    var leTot = parseFloat(tot) + parseFloat(cou[1][j+1]);
                    document.getElementsByName(caracsPersoLib[i])[0].value = leTot;
                }
            }
        }
    }
    if(getQueryParam('doigt1') != false){
        var doigt1 = recupObjetsReg('doigt1');
        for (var i = 0; i<caracsPersoLib.length; i++) {
            for (var j = 0; j<doigt1[1].length; j=j+2) {
                if (caracsPersoLib[i] == doigt1[1][j]){
                    var tot = document.getElementsByName(caracsPersoLib[i])[0].value;
                    var leTot = parseFloat(tot) + parseFloat(doigt1[1][j+1]);
                    document.getElementsByName(caracsPersoLib[i])[0].value = leTot;
                }
            }
        }
    }
    if(getQueryParam('doigt2') != false){
        var doigt2 = recupObjetsReg('doigt2');
        for (var i = 0; i<caracsPersoLib.length; i++) {
            for (var j = 0; j<doigt2[1].length; j=j+2) {
                if (caracsPersoLib[i] == doigt2[1][j]){
                    var tot = document.getElementsByName(caracsPersoLib[i])[0].value;
                    var leTot = parseFloat(tot) + parseFloat(doigt2[1][j+1]);
                    document.getElementsByName(caracsPersoLib[i])[0].value = leTot;
                }
            }
        }
    }
    if(document.getElementsByName('esquive')[0].value != 0){
        document.getElementById('esquivetxt').style.display="inline";
        document.getElementById('esquivetxt').innerHTML = remplaceExpr(document.getElementById('esquivetxt').innerHTML,'nb',document.getElementsByName('esquive')[0].value);
    }
    if(document.getElementsByName('chancehitsavoir')[0].value != 0){
        document.getElementsByName('chancehitsavoir')[0].value = document.getElementsByName('savoir')[0].value;
        document.getElementById('chancehitsavoirtxt').style.display="inline";
        document.getElementById('chancehitsavoirtxt').innerHTML = remplaceExpr(document.getElementById('chancehitsavoirtxt').innerHTML,'nb',document.getElementsByName('chancehitsavoir')[0].value);
        document.getElementsByName('precision')[0].value = parseFloat(document.getElementsByName('chancehitsavoir')[0].value) + parseFloat(document.getElementsByName('precision')[0].value);
    }
    if(document.getElementsByName('stopatk')[0].value > 0){
        document.getElementById('stopatktxt').style.display="inline";
    }
    if(document.getElementsByName('atklvl')[0].value > 0){
        document.getElementById('atklvltxt').style.display="inline";
        document.getElementById('atklvltxt').innerHTML = remplaceExpr(document.getElementById('atklvltxt').innerHTML,'nb1',document.getElementsByName('atklvl')[0].value);
        var dom = (Math.floor(parseFloat(getQueryParam('playerLvl')) / 4))*parseFloat(document.getElementsByName('atklvl')[0].value);
        document.getElementsByName('atklvldom')[0].value = dom;
        document.getElementById('atklvltxt').innerHTML = remplaceExpr(document.getElementById('atklvltxt').innerHTML,'nb2',document.getElementsByName('atklvldom')[0].value);
    }
	if(document.getElementsByName('degintel')[0].value > 0){
        document.getElementById('deginteltxt').style.display="inline";
        document.getElementById('deginteltxt').innerHTML = remplaceExpr(document.getElementById('deginteltxt').innerHTML,'nb1',document.getElementsByName('degintel')[0].value);
        var dom = Math.floor(parseFloat(document.getElementsByName('intelligence')[0].value)/parseFloat(document.getElementsByName('degintel')[0].value));
        document.getElementsByName('deginteldom')[0].value = dom;
        document.getElementById('deginteltxt').innerHTML = remplaceExpr(document.getElementById('deginteltxt').innerHTML,'nb2',document.getElementsByName('deginteldom')[0].value);
    }
    if(document.getElementsByName('deflvl')[0].value > 0){
        document.getElementById('deflvltxt').style.display="inline";
        document.getElementById('deflvltxt').innerHTML = remplaceExpr(document.getElementById('deflvltxt').innerHTML,'nb1',document.getElementsByName('deflvl')[0].value);
        var tot = (Math.floor(parseFloat(getQueryParam('playerLvl')) / 4))*parseFloat(document.getElementsByName('deflvl')[0].value);
        document.getElementsByName('deflvltot')[0].value = tot;
        document.getElementById('deflvltxt').innerHTML = remplaceExpr(document.getElementById('deflvltxt').innerHTML,'nb2',document.getElementsByName('deflvltot')[0].value);
    }
    if(document.getElementsByName('ignoredef')[0].value > 0){
        document.getElementById('ignoredeftxt').style.display="inline";
        document.getElementById('ignoredeftxt').innerHTML = remplaceExpr(document.getElementById('ignoredeftxt').innerHTML,'nb',document.getElementsByName('ignoredef')[0].value);
    }
    if(document.getElementsByName('atksup')[0].value > 0){
        document.getElementById('atksuptxt').style.display="inline";
        document.getElementById('atksuptxt').innerHTML = remplaceExpr(document.getElementById('atksuptxt').innerHTML,'nb',document.getElementsByName('atksup')[0].value);
        var tot = document.getElementsByName('atksup')[0].value;
        var leTot = parseFloat(tot) + parseFloat(document.getElementsByName('arme1nbatk')[0].value);
        document.getElementsByName('arme1nbatk')[0].value = leTot;
        var leTot = parseFloat(tot) + parseFloat(document.getElementsByName('arme2nbatk')[0].value);
        document.getElementsByName('arme2nbatk')[0].value = leTot;
        var leTot = parseFloat(tot) + parseFloat(document.getElementsByName('armenbatk')[0].value);
        document.getElementsByName('armenbatk')[0].value = leTot;
    }
    if(document.getElementsByName('pdvperhit')[0].value != 0){
        document.getElementById('pdvperhittxt').style.display="inline";
        document.getElementById('pdvperhittxt').innerHTML = remplaceExpr(document.getElementById('pdvperhittxt').innerHTML,'nb',document.getElementsByName('pdvperhit')[0].value);
    }
    if(document.getElementsByName('chance_d_un_coup_critique_a_l_arme_a_feu')[0].value != 0){
        if (getQueryParam('arme1') != false){
            if (arme1[4] == 'Arme_a_feu_a_une_main'){
                document.getElementsByName('cc')[0].value = parseFloat(document.getElementsByName('cc')[0].value) + parseFloat(document.getElementsByName('chance_d_un_coup_critique_a_l_arme_a_feu')[0].value);
            }
        } else if(getQueryParam('arme2') != false){
            if(arme2[4] == 'Arme_a_feu_a_une_main'){
                document.getElementsByName('cc')[0].value = parseFloat(document.getElementsByName('cc')[0].value) + parseFloat(document.getElementsByName('chance_d_un_coup_critique_a_l_arme_a_feu')[0].value);
            }
        }
        if (getQueryParam('arme') != false) {
            if (arme[4] == 'Arme_a_feu_a_deux_mains')
                document.getElementsByName('cc')[0].value = parseFloat(document.getElementsByName('cc')[0].value) + parseFloat(document.getElementsByName('chance_d_un_coup_critique_a_l_arme_a_feu')[0].value);
        }
    }
    if(document.getElementsByName('cc')[0].value != 0){
        document.getElementById('cctxt').style.display="inline";
        document.getElementById('cctxt').innerHTML = remplaceExpr(document.getElementById('cctxt').innerHTML,'nb',document.getElementsByName('cc')[0].value);
    }
    if(document.getElementsByName('chancehit')[0].value > 0){
        document.getElementById('chancehittxt').style.display="inline";
        document.getElementById('chancehittxt').innerHTML = remplaceExpr(document.getElementById('chancehittxt').innerHTML,'nb',document.getElementsByName('chancehit')[0].value);
        document.getElementsByName('precision')[0].value = Math.floor(parseFloat(document.getElementsByName('precision')[0].value) * (1 + (parseFloat(document.getElementsByName('chancehit')[0].value)/100)));
    }
	if(document.getElementsByName('precision_des_armes_blanches')[0].value != 0){
		if(getQueryParam('arme1') != false){
			if(arme1[4] == 'Arme_a_une_main'){
				document.getElementById('precision_des_armes_blanchestxt').style.display="inline";
				document.getElementById('precision_des_armes_blanchestxt').innerHTML = remplaceExpr(document.getElementById('precision_des_armes_blanchestxt').innerHTML,'nb',document.getElementsByName('precision_des_armes_blanches')[0].value);
				document.getElementsByName('precision')[0].value = parseFloat(document.getElementsByName('precision')[0].value) + parseFloat(document.getElementsByName('precision_des_armes_blanches')[0].value);
			}
		} else if(getQueryParam('arme2') != false){
			if(arme2[4] == 'Arme_a_une_main'){
				document.getElementById('precision_des_armes_blanchestxt').style.display="inline";
				document.getElementById('precision_des_armes_blanchestxt').innerHTML = remplaceExpr(document.getElementById('precision_des_armes_blanchestxt').innerHTML,'nb',document.getElementsByName('precision_des_armes_blanches')[0].value);
				document.getElementsByName('precision')[0].value = parseFloat(document.getElementsByName('precision')[0].value) + parseFloat(document.getElementsByName('precision_des_armes_blanches')[0].value);
			}
		} else if(getQueryParam('arme') != false){
			if(arme[4] == 'Arme_a_deux_mains'){
				document.getElementById('precision_des_armes_blanchestxt').style.display="inline";
				document.getElementById('precision_des_armes_blanchestxt').innerHTML = remplaceExpr(document.getElementById('precision_des_armes_blanchestxt').innerHTML,'nb',document.getElementsByName('precision_des_armes_blanches')[0].value);
				document.getElementsByName('precision')[0].value = parseFloat(document.getElementsByName('precision')[0].value) + parseFloat(document.getElementsByName('precision_des_armes_blanches')[0].value);
			}
		}
	}
    if(document.getElementsByName('precision')[0].value != 0){
        document.getElementById('precisiontxt').style.display="inline";
        document.getElementById('precisiontxt').innerHTML = remplaceExpr(document.getElementById('precisiontxt').innerHTML,'nb',document.getElementsByName('precision')[0].value);
    }
	if(document.getElementsByName('precision_de_chaque_arme')[0].value != 0){
		document.getElementById('precision_de_chaque_armetxt').style.display="inline";
        document.getElementById('precision_de_chaque_armetxt').innerHTML = remplaceExpr(document.getElementById('precision_de_chaque_armetxt').innerHTML,'nb',document.getElementsByName('precision_de_chaque_arme')[0].value);
    }
    if(document.getElementsByName('dommages_de_chaque_arme')[0].value != 0){
        document.getElementById('dommages_de_chaque_armetxt').style.display="inline";
        document.getElementById('dommages_de_chaque_armetxt').innerHTML = remplaceExpr(document.getElementById('dommages_de_chaque_armetxt').innerHTML,'nb',document.getElementsByName('dommages_de_chaque_arme')[0].value);
    }
    if(document.getElementsByName('dommages_minimaux_de_chaque_arme')[0].value != 0){
        document.getElementById('dommages_minimaux_de_chaque_armetxt').style.display="inline";
        document.getElementById('dommages_minimaux_de_chaque_armetxt').innerHTML = remplaceExpr(document.getElementById('dommages_minimaux_de_chaque_armetxt').innerHTML,'nb',document.getElementsByName('dommages_minimaux_de_chaque_arme')[0].value);
    }
    if(document.getElementsByName('dommages_maximaux_de_chaque_arme')[0].value != 0){
        document.getElementById('dommages_maximaux_de_chaque_armetxt').style.display="inline";
        document.getElementById('dommages_maximaux_de_chaque_armetxt').innerHTML = remplaceExpr(document.getElementById('dommages_maximaux_de_chaque_armetxt').innerHTML,'nb',document.getElementsByName('dommages_maximaux_de_chaque_arme')[0].value);
    }
	if(document.getElementsByName('modificateur_de_dommages_critiques_de_l_arme')[0].value != 0){
		document.getElementById('modificateur_de_dommages_critiques_de_l_armetxt').style.display="inline";
        document.getElementById('modificateur_de_dommages_critiques_de_l_armetxt').innerHTML = remplaceExpr(document.getElementById('modificateur_de_dommages_critiques_de_l_armetxt').innerHTML,'nb',document.getElementsByName('modificateur_de_dommages_critiques_de_l_arme')[0].value);
    }
    if(document.getElementsByName('arme1dommax')[0].value != 0){ 
		document.getElementsByName('arme1dommin')[0].value = parseFloat(document.getElementsByName('arme1dommin')[0].value) + parseFloat(document.getElementsByName('atklvldom')[0].value) + parseFloat(document.getElementsByName('dommages_de_chaque_arme')[0].value) + parseFloat(document.getElementsByName('dommages_minimaux_de_chaque_arme')[0].value);
        document.getElementsByName('arme1dommax')[0].value = parseFloat(document.getElementsByName('arme1dommax')[0].value) + parseFloat(document.getElementsByName('atklvldom')[0].value) + parseFloat(document.getElementsByName('dommages_de_chaque_arme')[0].value) + parseFloat(document.getElementsByName('dommages_maximaux_de_chaque_arme')[0].value);
        if(arme1[4] == 'Arme_a_feu_a_une_main'){
            document.getElementsByName('arme1dommin')[0].value = parseFloat(document.getElementsByName('arme1dommin')[0].value) + Math.floor((parseFloat(document.getElementsByName('savoir')[0].value)/3));
            document.getElementsByName('arme1dommax')[0].value = parseFloat(document.getElementsByName('arme1dommax')[0].value) + Math.floor((parseFloat(document.getElementsByName('savoir')[0].value)/3));
			document.getElementsByName('arme1dommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme1dommin')[0].value) *1.5);
			document.getElementsByName('arme1dommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme1dommax')[0].value) *1.5);
		}
        if(arme1[4] == 'Arme_a_une_main'){
            document.getElementsByName('arme1dommin')[0].value = parseFloat(document.getElementsByName('arme1dommin')[0].value) + parseFloat(document.getElementsByName('force')[0].value);
            document.getElementsByName('arme1dommax')[0].value = parseFloat(document.getElementsByName('arme1dommax')[0].value) + parseFloat(document.getElementsByName('force')[0].value);
			document.getElementsByName('arme1dommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme1dommin')[0].value) *2);
			document.getElementsByName('arme1dommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme1dommax')[0].value) *2);
		}
		if(document.getElementsByName('dommage_totale_d_arme1')[0].value > 0){
            document.getElementsByName('arme1dommin')[0].value = Math.floor(parseFloat(document.getElementsByName('arme1dommin')[0].value)* (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme1')[0].value)/100)));
            document.getElementsByName('arme1dommax')[0].value = Math.floor(parseFloat(document.getElementsByName('arme1dommax')[0].value)* (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme1')[0].value)/100)));
            document.getElementsByName('arme1dommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme1dommincrit')[0].value) * (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme1')[0].value)/100)));
			document.getElementsByName('arme1dommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme1dommaxcrit')[0].value) * (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme1')[0].value)/100)));
			document.getElementById('dommage_totale_d_arme1txt').style.display="inline";
            document.getElementById('dommage_totale_d_arme1txt').innerHTML = remplaceExpr(document.getElementById('dommage_totale_d_arme1txt').innerHTML,'nb',document.getElementsByName('dommage_totale_d_arme1')[0].value);
        }
		document.getElementById('arme1domtxt').innerHTML = remplaceExpr(document.getElementById('arme1domtxt').innerHTML,'nb1',document.getElementsByName('arme1dommin')[0].value);
        document.getElementById('arme1domtxt').innerHTML = remplaceExpr(document.getElementById('arme1domtxt').innerHTML,'nb2',document.getElementsByName('arme1dommax')[0].value);
        document.getElementById('arme1domtxt').innerHTML = remplaceExpr(document.getElementById('arme1domtxt').innerHTML,'nb3',document.getElementsByName('arme1nbatk')[0].value);
        document.getElementById('arme1domtxt').innerHTML = remplaceExpr(document.getElementById('arme1domtxt').innerHTML,'nb4',document.getElementsByName('arme1dommincrit')[0].value);
        document.getElementById('arme1domtxt').innerHTML = remplaceExpr(document.getElementById('arme1domtxt').innerHTML,'nb5',document.getElementsByName('arme1dommaxcrit')[0].value);
    }
    if(document.getElementsByName('arme2dommax')[0].value != 0){
		document.getElementsByName('arme2dommin')[0].value = parseFloat(document.getElementsByName('arme2dommin')[0].value) + parseFloat(document.getElementsByName('atklvldom')[0].value) + parseFloat(document.getElementsByName('dommages_de_chaque_arme')[0].value) + parseFloat(document.getElementsByName('dommages_minimaux_de_chaque_arme')[0].value);
        document.getElementsByName('arme2dommax')[0].value = parseFloat(document.getElementsByName('arme2dommax')[0].value) + parseFloat(document.getElementsByName('atklvldom')[0].value) + parseFloat(document.getElementsByName('dommages_de_chaque_arme')[0].value) + parseFloat(document.getElementsByName('dommages_maximaux_de_chaque_arme')[0].value);
        if(arme2[4] == 'Arme_a_feu_a_une_main'){
            document.getElementsByName('arme2dommin')[0].value = parseFloat(document.getElementsByName('arme2dommin')[0].value) + Math.floor((parseFloat(document.getElementsByName('savoir')[0].value)/3));
            document.getElementsByName('arme2dommax')[0].value = parseFloat(document.getElementsByName('arme2dommax')[0].value) + Math.floor((parseFloat(document.getElementsByName('savoir')[0].value)/3));
			document.getElementsByName('arme2dommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme2dommin')[0].value) *1.5);
			document.getElementsByName('arme2dommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme2dommax')[0].value) *1.5);
		}
        if(arme2[4] == 'Arme_a_une_main'){
            document.getElementsByName('arme2dommin')[0].value = parseFloat(document.getElementsByName('arme2dommin')[0].value) + parseFloat(document.getElementsByName('force')[0].value);
            document.getElementsByName('arme2dommax')[0].value = parseFloat(document.getElementsByName('arme2dommax')[0].value) + parseFloat(document.getElementsByName('force')[0].value);
			document.getElementsByName('arme2dommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme2dommin')[0].value) *2);
			document.getElementsByName('arme2dommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme2dommax')[0].value) *2);
		}
        if(document.getElementsByName('dommage_totale_d_arme2')[0].value > 0){
            document.getElementsByName('arme2dommin')[0].value = Math.floor(parseFloat(document.getElementsByName('arme2dommin')[0].value)* (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme2')[0].value)/100)));
            document.getElementsByName('arme2dommax')[0].value = Math.floor(parseFloat(document.getElementsByName('arme2dommax')[0].value)* (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme2')[0].value)/100)));
            document.getElementsByName('arme2dommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme2dommincrit')[0].value) * (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme2')[0].value)/100)));
			document.getElementsByName('arme2dommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('arme2dommaxcrit')[0].value) * (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme2')[0].value)/100)));
			document.getElementById('dommage_totale_d_arme2txt').style.display="inline";
            document.getElementById('dommage_totale_d_arme2txt').innerHTML = remplaceExpr(document.getElementById('dommage_totale_d_arme2txt').innerHTML,'nb',document.getElementsByName('dommage_totale_d_arme2')[0].value);
        }
		document.getElementById('arme2domtxt').innerHTML = remplaceExpr(document.getElementById('arme2domtxt').innerHTML,'nb1',document.getElementsByName('arme2dommin')[0].value);
        document.getElementById('arme2domtxt').innerHTML = remplaceExpr(document.getElementById('arme2domtxt').innerHTML,'nb2',document.getElementsByName('arme2dommax')[0].value);
        document.getElementById('arme2domtxt').innerHTML = remplaceExpr(document.getElementById('arme2domtxt').innerHTML,'nb3',document.getElementsByName('arme2nbatk')[0].value);
		document.getElementById('arme2domtxt').innerHTML = remplaceExpr(document.getElementById('arme2domtxt').innerHTML,'nb4',document.getElementsByName('arme2dommincrit')[0].value);
        document.getElementById('arme2domtxt').innerHTML = remplaceExpr(document.getElementById('arme2domtxt').innerHTML,'nb5',document.getElementsByName('arme2dommaxcrit')[0].value);
    }
    if(document.getElementsByName('armedommax')[0].value != 0){
        document.getElementsByName('armedommin')[0].value = parseFloat(document.getElementsByName('armedommin')[0].value) + parseFloat(document.getElementsByName('atklvldom')[0].value) + parseFloat(document.getElementsByName('dommages_de_chaque_arme')[0].value) + parseFloat(document.getElementsByName('dommages_minimaux_de_chaque_arme')[0].value) + parseFloat(document.getElementsByName('deginteldom')[0].value);
        document.getElementsByName('armedommax')[0].value = parseFloat(document.getElementsByName('armedommax')[0].value) + parseFloat(document.getElementsByName('atklvldom')[0].value) + parseFloat(document.getElementsByName('dommages_de_chaque_arme')[0].value) + parseFloat(document.getElementsByName('dommages_maximaux_de_chaque_arme')[0].value) + parseFloat(document.getElementsByName('deginteldom')[0].value);
		if(arme[4] == 'Arme_a_feu_a_deux_mains'){
            document.getElementsByName('armedommin')[0].value = parseFloat(document.getElementsByName('armedommin')[0].value) + Math.floor((parseFloat(document.getElementsByName('savoir')[0].value)/3));
            document.getElementsByName('armedommax')[0].value = parseFloat(document.getElementsByName('armedommax')[0].value) + Math.floor((parseFloat(document.getElementsByName('savoir')[0].value)/3));
			document.getElementsByName('armedommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommin')[0].value) *2);
			document.getElementsByName('armedommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommax')[0].value) *2);
		}
        if(arme[4] == 'Arme_a_deux_mains'){
            document.getElementsByName('armedommin')[0].value = parseFloat(document.getElementsByName('armedommin')[0].value) + parseFloat(document.getElementsByName('force')[0].value);
            document.getElementsByName('armedommax')[0].value = parseFloat(document.getElementsByName('armedommax')[0].value) + parseFloat(document.getElementsByName('force')[0].value);
			document.getElementsByName('armedommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommin')[0].value) *4);
			document.getElementsByName('armedommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommax')[0].value) *4);
		}
		if(arme[4] == 'Arme_a_distance_a_deux_mains_(legere)'){
			document.getElementsByName('armedommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommin')[0].value) *1.7);
			document.getElementsByName('armedommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommax')[0].value) *1.7);
		}
		if(arme[4] == 'Arme_a_distance_a_deux_mains_(lourde)'){
			document.getElementsByName('armedommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommin')[0].value) *2.7);
			document.getElementsByName('armedommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommax')[0].value) *2.7);
		}
        if(document.getElementsByName('dommage_totale_d_arme')[0].value > 0){
            document.getElementsByName('armedommin')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommin')[0].value)* (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme')[0].value)/100)));
            document.getElementsByName('armedommax')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommax')[0].value)* (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme')[0].value)/100)));
            document.getElementsByName('armedommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommincrit')[0].value) * (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme')[0].value)/100)));
			document.getElementsByName('armedommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommaxcrit')[0].value) * (1 + (parseFloat(document.getElementsByName('dommage_totale_d_arme')[0].value)/100)));
			document.getElementById('dommage_totale_d_armetxt').style.display="inline";
            document.getElementById('dommage_totale_d_armetxt').innerHTML = remplaceExpr(document.getElementById('dommage_totale_d_armetxt').innerHTML,'nb',document.getElementsByName('dommage_totale_d_arme')[0].value);
        }
		if(document.getElementsByName('modificateur_de_dommages_critiques_de_l_arme')[0].value > 0){
			document.getElementsByName('armedommincrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommin')[0].value) * (1 + (parseFloat(document.getElementsByName('modificateur_de_dommages_critiques_de_l_arme')[0].value))/100));
			document.getElementsByName('armedommaxcrit')[0].value = Math.floor(parseFloat(document.getElementsByName('armedommax')[0].value) * (1 + (parseFloat(document.getElementsByName('modificateur_de_dommages_critiques_de_l_arme')[0].value))/100));
		}
        document.getElementById('armedomtxt').innerHTML = remplaceExpr(document.getElementById('armedomtxt').innerHTML,'nb1',document.getElementsByName('armedommin')[0].value);
        document.getElementById('armedomtxt').innerHTML = remplaceExpr(document.getElementById('armedomtxt').innerHTML,'nb2',document.getElementsByName('armedommax')[0].value);
        document.getElementById('armedomtxt').innerHTML = remplaceExpr(document.getElementById('armedomtxt').innerHTML,'nb3',document.getElementsByName('armenbatk')[0].value);
		document.getElementById('armedomtxt').innerHTML = remplaceExpr(document.getElementById('armedomtxt').innerHTML,'nb4',document.getElementsByName('armedommincrit')[0].value);
        document.getElementById('armedomtxt').innerHTML = remplaceExpr(document.getElementById('armedomtxt').innerHTML,'nb5',document.getElementsByName('armedommaxcrit')[0].value);
	}
    if(document.getElementsByName('pts_de_vie_de_base')[0].value != 0){
		document.getElementById('pts_de_vie_de_basetxt').style.display="inline";
        document.getElementById('pts_de_vie_de_basetxt').innerHTML = remplaceExpr(document.getElementById('pts_de_vie_de_basetxt').innerHTML,'nb',document.getElementsByName('pts_de_vie_de_base')[0].value);
	}
	if(document.getElementsByName('pts_de_sang')[0].value != 0){
		document.getElementById('pts_de_sangtxt').style.display="inline";
        document.getElementById('pts_de_sangtxt').innerHTML = remplaceExpr(document.getElementById('pts_de_sangtxt').innerHTML,'nb',document.getElementsByName('pts_de_sang')[0].value);
	}
	if(document.getElementsByName('sangperh')[0].value != 0){
		document.getElementById('sangperhtxt').style.display="inline";
        document.getElementById('sangperhtxt').innerHTML = remplaceExpr(document.getElementById('sangperhtxt').innerHTML,'nb',document.getElementsByName('sangperh')[0].value);
	}
	if(document.getElementsByName('regenpdv')[0].value != 0){
		document.getElementById('regenpdvtxt').style.display="inline";
        document.getElementById('regenpdvtxt').innerHTML = remplaceExpr(document.getElementById('regenpdvtxt').innerHTML,'nb',document.getElementsByName('regenpdv')[0].value);
	}
	if(document.getElementsByName('facilite')[0].value != 0){
		document.getElementById('facilitetxt').style.display="inline";
        document.getElementById('facilitetxt').innerHTML = remplaceExpr(document.getElementById('facilitetxt').innerHTML,'nb',document.getElementsByName('facilite')[0].value);
	}
	if((getQueryParam('tete') != false) || (getQueryParam('haut') != false) || (getQueryParam('lebas') != false) || (document.getElementsByName('deflvltot')[0].value != 0) || (document.getElementsByName('defense_du_personnage')[0].value != 0)){ //defense_du_personnagetxt
        if(getQueryParam('tete') != false){
			if(document.getElementsByName('defmax')[0].value != 0){
				document.getElementById('defmaxtxt').style.display="inline";
				document.getElementsByName('deftot')[0].value = parseFloat(document.getElementsByName('deftot')[0].value);
			} else {
				document.getElementsByName('deftot')[0].value = parseFloat(document.getElementsByName('deftot')[0].value) + parseFloat(tete[3][1]);
			}
        }
        if(getQueryParam('haut') != false){
			if(document.getElementsByName('defmax')[0].value != 0){
				document.getElementById('defmaxtxt').style.display="inline";
				document.getElementsByName('deftot')[0].value = parseFloat(document.getElementsByName('deftot')[0].value);
			} else {
				document.getElementsByName('deftot')[0].value = parseFloat(document.getElementsByName('deftot')[0].value) + parseFloat(haut[3][1]);
			}
        }
        if(getQueryParam('lebas') != false){
			if(document.getElementsByName('defmax')[0].value != 0){
				document.getElementById('defmaxtxt').style.display="inline";
				document.getElementsByName('deftot')[0].value = parseFloat(document.getElementsByName('deftot')[0].value);
			} else {
				document.getElementsByName('deftot')[0].value = parseFloat(document.getElementsByName('deftot')[0].value) + parseFloat(lebas[3][1]);
			}
        }
		if(document.getElementsByName('defense_du_personnage')[0].value != 0){
			document.getElementById('defense_du_personnagetxt').style.display="inline";
			document.getElementById('defense_du_personnagetxt').innerHTML = remplaceExpr(document.getElementById('defense_du_personnagetxt').innerHTML,'nb',document.getElementsByName('defense_du_personnage')[0].value);
			document.getElementsByName('deftot')[0].value = parseFloat(document.getElementsByName('deftot')[0].value) + parseFloat(document.getElementsByName('defense_du_personnage')[0].value);
		}
        document.getElementsByName('deftot')[0].value = parseFloat(document.getElementsByName('deftot')[0].value) + parseFloat(document.getElementsByName('deflvltot')[0].value);
        document.getElementById('deftottxt').style.display="inline";
        document.getElementById('deftottxt').innerHTML = remplaceExpr(document.getElementById('deftottxt').innerHTML,'nb',document.getElementsByName('deftot')[0].value);
    }
}

function displayLesExigences(){
    var lesTypes = ['arme1','arme2','arme','tete','haut','lebas','cou','doigt1','doigt2'];
    for(var i = 0; i<lesTypes.length; i++) {
        if(getQueryParam(lesTypes[i]) != false){
            displayExigences(lesTypes[i]);
        }
    }
    calcExigencesMax();
}

function displayExigences(type) {
    var caracsPersoLib = ["force","agilite","resistance","apparence","charisme","reputation","perception","intelligence","savoir"];
    var monObjet = recupObjetsReg(type)[2];
    document.getElementById(type).innerHTML += "<br />&nbsp;&nbsp;"
	var lvlFac = Math.floor(parseFloat(monObjet[1]) *(1 - ((parseFloat(document.getElementsByName('facilite')[0].value))/100)));
    if((getQueryParam('playerLvl'))>=(parseFloat(lvlFac))){
        document.getElementById(type).innerHTML += monObjet[0] + ": <FONT COLOR='green' >" + lvlFac + "</FONT> ";
    }else {
        document.getElementById(type).innerHTML += monObjet[0] + ": <FONT COLOR='red' >" + lvlFac + "</FONT> ";
    }
    for(var i = 0; i<caracsPersoLib.length; i++){
        for (var j = 2; j<monObjet.length; j=j+2){
            if (caracsPersoLib[i] == monObjet[j]){
                if((parseFloat(document.getElementsByName(caracsPersoLib[i])[0].value))>=(parseFloat(monObjet[j+1]))){
                   document.getElementById(type).innerHTML += monObjet[j] + ": <FONT COLOR='green' >" + Math.floor(parseFloat(monObjet[j+1])*(1 - ((parseFloat(document.getElementsByName('facilite')[0].value))/100))) + "</FONT> ";
                }else {
                    document.getElementById(type).innerHTML += monObjet[j] + ": <FONT COLOR='red' >" + Math.floor(parseFloat(monObjet[j+1])*(1 - ((parseFloat(document.getElementsByName('facilite')[0].value))/100))) + "</FONT> ";
                }
            }
        }
    }
    document.getElementById(type).innerHTML += "<br /><br />";
}

function calcExigencesMax(){
    var caracsPersoLib = ["niveau","force","agilite","resistance","apparence","charisme","reputation","perception","intelligence","savoir"];
    var lesTypes = ['arme1','arme2','arme','tete','haut','lebas','cou','doigt1','doigt2'];
    var tabEx = new Array();
    for(var i = 0; i<caracsPersoLib.length; i++){
        tabEx[i] = new Array();
        tabEx[i][0] = i;
        for(var k = 0; k<lesTypes.length; k++) {
            if(getQueryParam(lesTypes[k])!=false){
                var monObjet = recupObjetsReg(lesTypes[k])[2];
                for (var j = 0; j<monObjet.length; j=j+2){
                    if (caracsPersoLib[i] == monObjet[j]){
                        tabEx[i].push(parseFloat(monObjet[j+1]));
                    }
                }
            }
        }
    }
    var tabExTot = new Array();
    for(var i = 0; i<tabEx.length; i++){
        tabExTot.push(tabEx[i][0]);
        if ( tabEx[i].length > 1){
            var max = '0';
            for(var j=1; j<tabEx[i].length; j++){
                if ( max < tabEx[i][j]) {
                    max = Math.floor(parseFloat(tabEx[i][j])*(1 - ((parseFloat(document.getElementsByName('facilite')[0].value))/100)));
                }
            }
        } else {
            var max = 0;
        }
        tabExTot.push(max);
    }
    for (var i = 0; i<tabExTot.length; i=i+2){
        if (tabExTot[i+1]>0){ 
            if(i==0){
                if((parseFloat(getQueryParam('playerLvl')))>=(parseFloat(tabExTot[1]))){
                    document.getElementById('exiMax').innerHTML += "niveau : <FONT COLOR='green' >" + tabExTot[i+1] + "</FONT> <br />";
                }else {
                    document.getElementById('exiMax').innerHTML += "niveau : <FONT COLOR='red' >" + tabExTot[i+1] + "</FONT> <br />";
                }
            } else {
                if((parseFloat(document.getElementsByName(caracsPersoLib[tabExTot[i]])[0].value))>=(tabExTot[i+1])){
                    document.getElementById('exiMax').innerHTML += caracsPersoLib[tabExTot[i]] + ": <FONT COLOR='green' >" + tabExTot[i+1] + "</FONT> <br />";
                }else {
                    document.getElementById('exiMax').innerHTML += caracsPersoLib[tabExTot[i]] + ": <FONT COLOR='red' >" + tabExTot[i+1] + "</FONT> <br />";
                }
            }
        }
    }
}

function testCaracsPerso(){
    var caracsPersoLib = ["force","agilite","resistance","apparence","charisme","reputation","perception","intelligence","savoir"];
    if (getQueryParam('caracs') != false) {
        var page = document.location.href;
        page = page.substring(page.indexOf('&caracs'), page.length);
        page = page.substring(page.indexOf('[')+1, page.indexOf(']'));
        var tableau=recupUrlTab(page);
        for (var i = 0; i < tableau.length; i=i+2) {
            document.getElementsByName("c"+tableau[i])[0].value = tableau[i+1];
        }
    }
}

function regCaracsPerso(){

    var caracsPersoLib = ["force","agilite","resistance","apparence","charisme","reputation","perception","intelligence","savoir"];
    var chaine = "";
    chaine = caracsPersoLib[0] + "=" + document.getElementsByName("c"+caracsPersoLib[0])[0].value;
    for (var i=1; i < caracsPersoLib.length; i++) {
        chaine += "&" + caracsPersoLib[i] + "=" + document.getElementsByName("c"+caracsPersoLib[i])[0].value;
    }
    var page = document.location.href;
    var chaine2 = "&caracs=[" + chaine +"]";
    if (getQueryParam('caracs') != false) {
        var page2 = page;
        page2 = page2.substring(page2.indexOf('&caracs'), page2.length);
        page2 = page2.substring(0, page2.indexOf(']')+1);
        page = remplaceExpr(page,page2,'');
    }
    page += chaine2;
    window.location.href = page;
}

function getNameObject() {
    var nameObject = document.getElementsByTagName("span");
    var nameObject2 = nameObject[0].textContent;
    nameObject2 = remplaceExpr(nameObject2,'(','');
    nameObject2 = remplaceExpr(nameObject2,')','');
    nameObject2 = remplaceExpr(nameObject2,'   ',' ');
    nameObject2 = remplaceExpr(nameObject2,'  ',' ');
    nameObject2 = nameObject2.substring(0,nameObject2.indexOf('Enregistrer')-1);
    nameObject2 = removeAccents(nameObject2);
    return nameObject2;
}

function getTypeArme(){
    var lesTypesItem = new Array(["12","13","14","15","16","17","18","51","52","53"],["19","20","21","22","23","54","55","56","57","58"],["24","25","26","59","60","61","62"],["27","28","29","63","64","65","66"],["67","68","69","70","71","72","73","74","75","76","77"]);
    for(var i = 0; i<lesTypesItem.length; i++){
        for(var j = 0; j<lesTypesItem[i].length; j++){
            if (getQueryParam('baseType') == lesTypesItem[i][j]){
                var attribu = document.getElementsByTagName("div");
                var attribuContent = attribu[13].textContent;
                attribuContent = remplaceExpr(attribuContent,':','');
                attribuContent = removeAccents(attribuContent);
                attribuContent = attribuContent.substring(attribuContent.indexOf('Typ ')+4,attribuContent.indexOf('Dommages'));
                return attribuContent;
            }
        }
    }
}

function getDomDef(){
    var lesTypesItem = new Array(["12","13","14","15","16","17","18","51","52","53"],["1","2","3","4","30","31","32","33","34","35"],["7","8","9","10","42","43","44","45","46","47"],["11","48","49","50"],["19","20","21","22","23","54","55","56","57","58"],["24","25","26","59","60","61","62"],["27","28","29","63","64","65","66"],["67","68","69","70","71","72","73","74","75","76","77"]);
    for(var i = 0; i<lesTypesItem.length; i++){
        for(var j = 0; j<lesTypesItem[i].length; j++){
            if((getQueryParam('baseType') == lesTypesItem[i][j]) && ((i==0)||(i>3))){
                var attribu = document.getElementsByTagName("div");
                var attribuContent = attribu[13].textContent;
                var doms = new Array();
                attribuContent = remplaceExpr(attribuContent,':','');
                attribuContent = attribuContent.substring(attribuContent.indexOf('Dommages ')+9,attribuContent.indexOf('Attributs'));
                doms = attribuContent.split(' - ');
                return doms;
            }
            if((getQueryParam('baseType') == lesTypesItem[i][j]) && ((i>0)&&(i<4))){
                var attribu = document.getElementsByTagName("div");
                var attribuContent = attribu[13].textContent;
                attribuContent = remplaceExpr(attribuContent,':','');
                attribuContent = removeAccents(attribuContent);
                attribuContent = attribuContent.substring(attribuContent.indexOf('Defense ')+8,attribuContent.indexOf('Attributs'));
                return attribuContent;
            }
        }
    }
}

function getAttributObject() {
    var attribu = document.getElementsByTagName("div");
    var attribuContent = attribu[13].textContent;
    var caracs = ["NIVEAU","FORCE","AGILITÉ","RÉPUTATION","CHARISME","PERCEPTION","AGILITÉ","RÉSISTANCE","INTELLIGENCE","SAVOIR","CHANCE", "APPARENCE","PTS DE SANG","PTS DE VIE","Précision"];
    for (var i = 0; i<caracs.length; i++) {
        attribuContent = remplaceExpr(attribuContent,caracs[i],caracs[i].toLowerCase());
    }
    var alphabet =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    for (var i = 0; i<alphabet.length; i++) {
        attribuContent = remplaceExpr(attribuContent,alphabet[i],' '+alphabet[i]);
    }
    attribuContent = remplaceExpr(attribuContent,',','');
    attribuContent = remplaceExpr(attribuContent,':','');
    attribuContent = remplaceExpr(attribuContent,' %','');
    attribuContent = remplaceExpr(attribuContent,"`",' ');
    attribuContent = attribuContent.substring(attribuContent.indexOf('Attributs ')+10,attribuContent.indexOf('Exigences')-1);
    //remplacer les caractéristiques en phrases
    if (attribuContent.indexOf("défense de l objet augmentée de") != "-1"){
        var i = 0;
        while ( i < attribuContent.charAt(attribuContent.indexOf("défense de l objet augmentée de")+32)){
            i++;
        }
        attribuContent = remplaceExpr(attribuContent,"défense de l`objet augmentée de "+i+" pour chaque 4 niveaux d`expérience","deflvl +"+i);
    } else if (attribuContent.indexOf("défense ") != "-1" ){
        var i = 0;
        while ( i < attribuContent.charAt(attribuContent.indexOf("défense ")+8)){
            i++;
        }
        attribuContent = remplaceExpr(attribuContent,"défense "+i+" pour chaque 4 niveaux de personnage","deflvl +"+i);
    }
	if(attribuContent.indexOf("dégâts +1/") != "-1"){
		var i = attribuContent.charAt(attribuContent.indexOf("dégâts +1/")+10);
		attribuContent = remplaceExpr(attribuContent,"dégâts +1/"+i+" intelligence","degintel +"+i);
	}
    if (attribuContent.indexOf("dommages de chaque arme augmentés de ") != "-1"){
        var i = attribuContent.charAt(attribuContent.indexOf("dommages de chaque arme augmentés de ")+37);
        attribuContent = remplaceExpr(attribuContent,"dommages de chaque arme augmentés de "+i+" pour chaque 4 niveaux d expériences","atklvl +"+i);
    }
    if (attribuContent.indexOf("nombre d attaques par manche ") != "-1"){
        var i = 0;
        var number = attribuContent.charAt(attribuContent.indexOf("nombre d attaques par manche ")+29);
        if (!isNaN(attribuContent.charAt(attribuContent.indexOf("nombre d attaques par manche ")+30))){
            number += attribuContent.charAt(attribuContent.indexOf("nombre d attaques par manche ")+30);
            if (!isNaN(attribuContent.charAt(attribuContent.indexOf("nombre d attaques par manche ")+31))){
                number += attribuContent.charAt(attribuContent.indexOf("nombre d attaques par manche ")+31);
            }
        }
        while ( i < number){
            i++;
        }
        attribuContent = remplaceExpr(attribuContent,"nombre d attaques par manche "+i,"nbatk +"+i);
    }
    if (attribuContent.indexOf("chance de toucher avec une arme est augmentée de") != "-1"){
        var number = attribuContent.charAt(attribuContent.indexOf("chance de toucher avec une arme est augmentée de")+48);
        if (isNaN(attribuContent.charAt(attribuContent.indexOf("chance de toucher avec une arme est augmentée de")+49)) == false){
            number += attribuContent.charAt(attribuContent.indexOf("chance de toucher avec une arme est augmentée de")+49);
            if (!isNaN(attribuContent.charAt(attribuContent.indexOf("chance de toucher avec une arme est augmentée de")+50))){
                number += attribuContent.charAt(attribuContent.indexOf("chance de toucher avec une arme est augmentée de")+50);
            }
        }
        attribuContent = remplaceExpr(attribuContent,"chance de toucher avec une arme est augmentée de"+number,"chancehit +"+number);
    }
    if (attribuContent.indexOf("chance d un coup critique ") != "-1"){
        var i = 0;
        var number = attribuContent.charAt(attribuContent.indexOf("chance d un coup critique "+attribuContent.charAt(attribuContent.indexOf('chance d un coup critique ')+26))+27);
        if (isNaN(attribuContent.charAt(attribuContent.indexOf("chance d un coup critique "+attribuContent.charAt(attribuContent.indexOf('chance d un coup critique ')+26))+28)) == false){
            number += attribuContent.charAt(attribuContent.indexOf("chance d un coup critique "+attribuContent.charAt(attribuContent.indexOf('chance d un coup critique ')+26))+28);
            if (!isNaN(attribuContent.charAt(attribuContent.indexOf("chance d un coup critique "+attribuContent.charAt(attribuContent.indexOf('chance d un coup critique ')+26))+29))){
                number += attribuContent.charAt(attribuContent.indexOf("chance d un coup critique "+attribuContent.charAt(attribuContent.indexOf('chance d un coup critique ')+26))+29);
            }
        }
        while ( i < number){
            i++;
        }
        attribuContent = remplaceExpr(attribuContent,"chance d un coup critique "+attribuContent.charAt(attribuContent.indexOf('chance d un coup critique ')+26)+i,"cc "+attribuContent.charAt(attribuContent.indexOf('chance d un coup critique ')+26)+i);
    }
    if (attribuContent.indexOf("cette arme ignore ") != "-1"){
        var i = 0;
        var number = attribuContent.charAt(attribuContent.indexOf("cette arme ignore ")+18);
        if (isNaN(attribuContent.charAt(attribuContent.indexOf("cette arme ignore ")+19)) == false){
            number += attribuContent.charAt(attribuContent.indexOf("cette arme ignore ")+19);
            if (!isNaN(attribuContent.charAt(attribuContent.indexOf("cette arme ignore ")+20))){
                number += attribuContent.charAt(attribuContent.indexOf("cette arme ignore ")+20);
            }
        }
        while ( i < number){
            i++;
        }
        attribuContent = remplaceExpr(attribuContent,"cette arme ignore "+i+" de la défense de l ennemi","ignoredef +"+i);
    } else if (attribuContent.indexOf("ignore ") != "-1"){
        var i = 0;
        var number = attribuContent.charAt(attribuContent.indexOf("ignore ")+7);
        if (isNaN(attribuContent.charAt(attribuContent.indexOf("ignore ")+8)) == false){
            number += attribuContent.charAt(attribuContent.indexOf("ignore ")+8);
            if (!isNaN(attribuContent.charAt(attribuContent.indexOf("ignore ")+9))){
                number += attribuContent.charAt(attribuContent.indexOf("ignore ")+9);
            }
        }
        while ( i < number){
            i++;
        }
        attribuContent = remplaceExpr(attribuContent,"ignore "+i+" de la défense de l ennemi","ignoredef +"+i);
    }
    if (attribuContent.indexOf(" attaques supplémentaires pour chaque arme") != "-1"){
        var i = 0;
        while ( i < attribuContent.charAt(attribuContent.indexOf(" attaques supplémentaires pour chaque arme")-1)){
            i++;
        }
        attribuContent = remplaceExpr(attribuContent,i+" attaques supplémentaires pour chaque arme","atksup +"+i);
    }
    if (attribuContent.indexOf("l ennemi est privé d attaques pendant la première manche du combat") != "-1"){
        attribuContent = remplaceExpr(attribuContent,"l ennemi est privé d attaques pendant la première manche du combat","stopatk +1");
    }
    if (attribuContent.indexOf(" litres de sang / h") != "-1"){
		var i = 0;
        var number = attribuContent.charAt(attribuContent.indexOf(" litres de sang / h")-1);
		var charactere = attribuContent.charAt(attribuContent.indexOf(" litres de sang / h")-2);
        if (isNaN(attribuContent.charAt(attribuContent.indexOf(" litres de sang / h")-2)) == false){
            number = attribuContent.charAt(attribuContent.indexOf(" litres de sang / h")-2) + number;
			charactere = attribuContent.charAt(attribuContent.indexOf(" litres de sang / h")-3);
        }
		i = charactere + number;
        attribuContent = remplaceExpr(attribuContent,i+" litres de sang / h","sangperh "+i);
    }
	if (attribuContent.indexOf(" de pts de vie à chaque juste frappe") != "-1"){
        var i = 0;
        var number = attribuContent.charAt(attribuContent.indexOf(" de pts de vie à chaque juste frappe")-1);
		var charactere = attribuContent.charAt(attribuContent.indexOf(" de pts de vie à chaque juste frappe")-2);
        if (isNaN(attribuContent.charAt(attribuContent.indexOf(" de pts de vie à chaque juste frappe")-2)) == false){
            number = attribuContent.charAt(attribuContent.indexOf(" de pts de vie à chaque juste frappe")-2) + number;
			charactere = attribuContent.charAt(attribuContent.indexOf(" de pts de vie à chaque juste frappe")-3);
        }
		i = charactere + number;
        attribuContent = remplaceExpr(attribuContent,i+" de pts de vie à chaque juste frappe","pdvperhit "+i);
    }
	if(attribuContent.indexOf("régénère ") != "-1"){
		var i = 0;
        var number = attribuContent.charAt(attribuContent.indexOf("régénère ")+9);
        if (isNaN(attribuContent.charAt(attribuContent.indexOf("régénère ")+10)) == false){
            number += attribuContent.charAt(attribuContent.indexOf("régénère ")+10);
        }
		i = number;
        attribuContent = remplaceExpr(attribuContent,"régénère "+i+" pts de vie après chaque manche de combat","regenpdv +"+i);
	}
	if(attribuContent.indexOf("les exigences envers les paramètres du personnage sont abaissés de ") != "-1"){
		var i = 0;
        var number = attribuContent.charAt(attribuContent.indexOf("les exigences envers les paramètres du personnage sont abaissés de ")+67);
        if (isNaN(attribuContent.charAt(attribuContent.indexOf("les exigences envers les paramètres du personnage sont abaissés de ")+68)) == false){
            number += attribuContent.charAt(attribuContent.indexOf("les exigences envers les paramètres du personnage sont abaissés de ")+68);
        }
		i = number;
        attribuContent = remplaceExpr(attribuContent,"les exigences envers les paramètres du personnage sont abaissés de "+i,"facilite +"+i);
	}
	if(attribuContent.indexOf("défense maximale venante des objets = 0") != "-1"){
		attribuContent = remplaceExpr(attribuContent,"défense maximale venante des objets = 0","defmax +1");
	}
    if (attribuContent.indexOf("chance de toucher a été augmentée de la valeur de savoir") != "-1"){
        attribuContent = remplaceExpr(attribuContent,"chance de toucher a été augmentée de la valeur de savoir","chancehitsavoir +1");
    }
    attribuContent = removeAccents(attribuContent);
    var lesAttribu = attribuContent.split(' ');
    if (lesAttribu[0].charAt(0) == ' ')
        lesAttribu[0] = lesAttribu[0].substring(1, lesAttribu[0].length);
    var lesVraiAttribu = new Array();
    var maChaine = "";
    for (var i=0; i<lesAttribu.length; i++) {
        if ((lesAttribu[i].charAt(0) == '+') || (lesAttribu[i].charAt(0) == '-')){
			lesVraiAttribu.push(maChaine);
			maChaine = "";
			maChaine = lesAttribu[i];
			lesVraiAttribu.push(maChaine);
			maChaine = "";
		} else {
			maChaine += " " + lesAttribu[i];
		}
    }
    return lesVraiAttribu;
}

function getExigencesObject() {
    var exigence = document.getElementsByTagName("div");
    var exigenceContent = exigence[13].textContent;
    var caracs = ["NIVEAU","FORCE","AGILITÉ","RÉPUTATION","CHARISME","PERCEPTION","AGILITÉ","RÉSISTANCE","INTELLIGENCE","SAVOIR","CHANCE", "APPARENCE"];
    for (var i = 0; i<caracs.length; i++) {
        exigenceContent = remplaceExpr(exigenceContent,caracs[i],caracs[i].toLowerCase());
    }
    var alphabet =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    for (var i = 0; i<alphabet.length; i++) {
        exigenceContent = remplaceExpr(exigenceContent,alphabet[i],' '+alphabet[i]);
    }
    exigenceContent = remplaceExpr(exigenceContent,',','');
    exigenceContent = remplaceExpr(exigenceContent,':','');
    exigenceContent = exigenceContent.substring(exigenceContent.indexOf('Exigences')+10,exigenceContent.indexOf('Prix')-1);
    if (exigenceContent.indexOf(" Le personnage doit être dans l`acte 2") != "-1"){
        exigenceContent = remplaceExpr(exigenceContent,"  Le personnage doit être dans l`acte 2","");
    }
    exigenceContent = removeAccents(exigenceContent);
    var lesExigences = exigenceContent.split(' ');
    return lesExigences;
}

new_div();