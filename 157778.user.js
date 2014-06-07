// ==UserScript==
// @name        Apec.fr sans spam SSII 
// @namespace   http://userscripts.org/scripts/show/157778
// @downloadURL		https://userscripts.org/scripts/source/157778.user.js
// @updateURL		https://userscripts.org/scripts/source/157778.meta.js
// @description Supprimmer les annonces des SSII sur le site de l'Apec
// @include     http://*.apec.fr/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @version     1.5
// @require			http://code.jquery.com/jquery-2.1.0.js
// ==/UserScript==

var blockedBoites =  new Array(
/^MALTEM CONSULTING GROUP/i,
/^PROSERVIA/i,
/^6EME SENS TECHNOLOGY/i,
/^KENT$/i,
/^CLESYS/i,
/^THALES SERVICES/i,
/^INFORMATIS TECHNOLOGY SYSTEM/i,
/^MATEN/i,
/^INDETEC/i,
/^SOPRA GROUP/i,
/^ALTEN ITC/i,
/^ALTEN( +|$)/i,
/^GLOBAL TECHNOLOGIES/i,
/^AGH CONSULTING/i,
/^IBM/i,
/^Capgemini/i,
/^Atos Origin/i,
/^Logica/i,
/^HP$/i,
/^Accenture/i,
/^Sopra Group/i,
/^Steria/i,
/^CSC$/i,
/^Thales CIS/i,
/^GFI Informatique/i,
/^Bull/i,
/^Docapost/i,
/^Altran/i,
/^Alten/i,
/^Akka Technologies/i,
/^Neurones/i,
/^Open$/i,
/^Astek/i,
/^Spie Communications/i,
/^Devoteam/i,
/^Osiatis/i,
/^NextiraOne/i,
/^T-Systems/i,
/^SII$/i,
/^SCC$/i,
/^Dell/i,
/^Tessi$/i,
/^CS Communication & Systemes/i,
/^Euriware/i,
/^Assystem/i,
/^Adecco/i,
/^APX$/i,
/^Xerox/i,
/^Business & Decision/i,
/^SQLI/i,
/^Wipro/i,
/^Econocom/i,
/^Overlap Groupe/i,
/^Solucom/i,
/^Alti$/i,
/^Kurt Salmon/i,
/^Aubay/i,
/^NCR$/i,
/^Infotel/i,
/^Apside/i,
/^Beijaflore/i,
/^Telindus/i,
/^Tibco/i,
/^Micropole-Univers/i,
/^Ausy/i,
/^Team Partners Group/i,
/^Its Group/i,
/^Keyrus/i,
/^Unisys/i,
/^Fujitsu/i,
/^Consort NT/i,
/^Computacenter/i,
/^Aptus/i,
/^Sodifrance/i,
/^ESR$/i,
/^Cognitis Group/i,
/^Acti/i,
/^TCS$/i,
/^Wincor Nixdorf/i,
/^Groupe Helice/i,
/^Eurogiciel/i,
/^Segula Technologies/i,
/^SunGard Data Systems/i,
/^Feel Europe Groupe/i,
/^Ares$/i,
/^Viseo/i,
/^Proservia/i,
/^Viveris/i,
/^Solutions 30/i,
/^Vision IT/i,
/^Prodware/i,
/^Umanis/i,
/^Prosodie/i,
/^Maltem Consulting/i,
/^Aedian/i,
/^EffiTIC/i,
/^Safran Engineering Services/i,
/^Northgate IS/i,
/^Oresys/i,
/^Logware/i,
/^Oxya/i,
/^Infosys/i,
/^Degetel groupe/i,
/^Hardis/i,
/^Eryma/i,
/^Airial Conseil/i,
/^TRSB Groupe/i,
/^Groupe Cella/i,
/^Soft Computing/i,
/^Valtech/i,
/^AFD Technologies/i,
/^Neo-Soft/i,
/^Dimension Data/i,
/^Adneom/i,
/^EXPERT LINE/i,
/^NETXP/i,
/^ARTEMYS/i,
/^GROUPE ESR/i,
/^CYCLAD FRANCE/i,
/^ITEM SERVICES/i,
/^OBJECTWARE/i,
/^EXTIA$/i,
/^SIA PARTNERS$/i,
/^LCC FRANCE S\.A\.R\.L\.$/i,
/^IKOS$/i,
/^GROUPE ON-X$/i,
/^PANDA SERVICES$/i,
/^STRATHOM$/i,
/^INTITEK$/i,
/^DAVIDSON CONSULTING$/i,
/^ACTHOM CONSEIL ET INGENIERIE$/i,
/^IENA CONSULTING$/i,
/^SOGETI FRANCE$/i,
/^KAORI SAS$/i,
/^GENIOUS SYSTEMES$/i,
/^YSANCE$/i,
/^ABAKUS$/i,
/^HR TEAM$/i,
/^SAPIENS CONSULTING$/i,
/^SEXTANT SOLUTIONS INFORMATIQUES$/i,
/^INTRINSEC$/i,
/^AKKA I & S$/i,
/^METANEXT$/i,
/^THANIS$/i,
/^TO B SERVICES$/i,
/^SYNCHRONE$/i,
/^PROGELOG$/i,
/^OSIRES$/i,
/^BLUTE@MS TECHNOLOGY$/i,
/^ANSON MCCADE$/i,
/^PEARL IT CONSULTING$/i,
/^ANTARES IT$/i,
/^MGI CONSULTANTS$/i,
/^SAS EOLEN$/i,
/^OPEN WIDE$/i,
/^CHALLENGE2MEDIA \(C2M\)$/i,
/^GROUPAGORA$/i,
/^AVANGUARD$/i,
/^SILICOM$/i,
/^ALYOTECH ENGINEERING$/i,
/^LYBELIS$/i,
/^NEWRUN$/i,
/^ACCELITE$/i,
/^3S INFORMATIQUE$/i,
/^MATIS SI$/i,
/^FEDUCIA$/i,
/^QUICK SOURCE$/i,
/^TAIX SAS$/i,
/^INGCOM$/i,
/^SUNAPSIS$/i,
/^CLARITEAM SA$/i,
/^I-TRACING$/i,
/^SYNOPSIA INGENIERIE$/i,
/^INTEGRALE IP$/i,
/^ARISMORE$/i,
/^NEXTON CONSULTING$/i,
/^T-T CONSULTING$/i,
/^IDNA$/i,
/^HELPLINE$/i,
/^SGUI$/i,
/^FISH EYE TECHNOLOGIES$/i,
/^FHM SOLUTIONS FRANCE$/i,
/^AXONES$/i,
/^R2E CONSEIL$/i,
/^FINAXYS$/i,
/^ID2 GROUPE$/i,
/^DCS EASYWARE$/i,
/^SBP$/i,
/^CAT AMANIA$/i,
/^AMARIS$/i,
/^AFERSYS$/i,
/^SQUAD$/i,
/^MF CONSULTING$/i,
/^SAS MCNEXT$/i,
/^OPENBRIDGE$/i,
/^AVISTO$/i,
/^MODIS FRANCE$/i,
/^QUARTZ-INGENIERIE$/i,
/^PROTECTIC$/i,
/^INATIS$/i,
/^TREFLE INGENIERIE$/i,
/^AKKA I & S$/i,
/^QUANTIC ETUDES$/i,
/^SIPROJ$/i,
/^PARTENOR$/i,
/^ATOS INTEGRATION SAS$/i,
/^OMNILOG$/i,
/^TALEA$/i,
/^CELLA INFORMATIQUE$/i,
/^L' INFORMATIQUE COMMUNICANTE$/i,
/^DEGETEL GROUP$/i,
/^GREEN CONSEIL$/i,
/^NOUVELI$/i,
/^ADENIUM SAS$/i,
/^MATIS TECHNOLOGIES$/i,
/^ERES TECHNOLOGIE$/i,
/^COMTIS$/i,
/^IMPROVEUS$/i,
/^ABS TECHNOLOGIES$/i,
/^OZITEM$/i,
/^CORAUD$/i,
/^ALYOTECH$/i,
/^ON-X$/i,
/^GROUPE SOFT COMPANY$/i,
/^AXILEO$/i,
/^CTS$/i,
/^ATOS A2B/i,
/^INFOSPEC$/,
/^SPIE$/,
/^M PLANET$/,
/^AKEBIA$/,
/^PARITEL TELECOM$/,
/^CELAD$/,
/^ALYOTECH CONSULTING$/,
/^KP2I$/,
/^PHINEO$/,
/^ACIAL$/,
/^INVIVOO$/,
/^IBSI$/,
/^SAVANE$/,
/^ALTER SOLUTIONS$/,
/^FORSITEC$/,
/^STEEPCONSULT SA$/,
/^GALLAN CONSULTING$/,
/^AXEL IT$/,
/^SNAISO$/,
/^LEXSI$/,
/^FREE EXPERT$/,
/^UNIWARE GLOBAL SERVICES$/,
/^4ICOM$/,
/^ABASE SAS$/,
/^AMD CONSULTING$/,
/^CASTELIS$/,
/^ATHEOS$/,
/^GROUPE ELCIMAI$/,
/^AMD CONSEIL$/,
/^LOGFI$/,
/^EXPERIS IT$/,
/^DRIMS$/,
/^SIBIO$/,
/^CNS COMMUNICATIONS$/,
/^AKKA I & S$/,
/^FRAMEIP$/,
/^SMILE$/,
/^EXPECTRA$/,
/^INCKA$/,
/^INFACT FRANCE$/,
/^ODESYS$/,
/^CGI$/,
/^LINCOLN SA$/,
/^CONSULTAKE$/,
/^AVANISTA$/,
/^VITAM$/,
/^AMESYS$/,
/^NEOVITY$/,
/^TECHNO 5$/,
/^KEREVAL$/,
/^ELSYS DESIGN$/,
/^SOGETI HIGH TECH$/,
/^ALTER DEFENSE$/,
/^ORNESS$/,
/^IN SITU$/,
/^EXL GROUP$/,
/^SELESCOPE$/,
/^MALLYANCE$/,
/^CISIF$/,
/^LOGAXONE$/,
/^PRIME IT$/,
/^DIADEMYS$/,
/^STUDEC$/,
/^CLARANS CONSULTING$/,
/^DATA BASE FACTORY$/,
/^DGE INTERIM$/,
/^ETRALI$/,
/^QUANTIC$/,
/^DELETEC$/
);

// Variables de titre

var theParent = document.getElementById('content');
var theKids = theParent.children;
var initTitle = theKids[0].innerHTML;

//var a = [];
//GM_setValue("customBoites", JSON.stringify(a));

// manage cookie
// GM_deleteValue("customBoites");

console.log(GM_getValue("customBoites"));
if(GM_getValue("customBoites")) {
	var customBoites = JSON.parse(GM_getValue("customBoites"));
} else {
	var customBoites = new Array();
}
console.log(customBoites);
//blockedBoites=blockedBoites.concat(customBoites);


function addtoGM(e) {
				console.log(e);
		var boitez=e.target.innerHTML;
		
	if(confirm("Ne plus afficher les annonces de "+boitez+" ?")) {

		customBoites.push(boitez);
		GM_setValue("customBoites", JSON.stringify(customBoites));
		console.log(GM_getValue("customBoites"));
		
		//var up=e.target.parentNode.parentNode.parentNode;
		//	up.parentNode.removeChild(up);
		
		ReplaceContentInContainer(".boxContentInside");
	
		var rightBoite = document.createElement('div');
		rightBoite.innerHTML = boitez;
		rightBoite.addEventListener("click", removefromGM, false);
		rightPan.appendChild(rightBoite);
	
	}
}

function removefromGM(e) {
		console.log(e);
		var boitez=e.target.innerHTML;
		
	if(confirm("Réafficher les annonces de "+boitez+" ?\n(effet après rafraichissement de la page)")) {

		var idx = customBoites.indexOf(boitez);  // Find the index
		if(idx!=-1) customBoites.splice(idx, 1); // Remove from array
	
		GM_setValue("customBoites", JSON.stringify(customBoites));
		console.log(GM_getValue("customBoites"));
		
		var up=e.target;
			up.parentNode.removeChild(up);
		
	}
	
	
}



function ReplaceContentInContainer(selector) {
var count_replaced=0;
var nodeList = document.querySelectorAll(selector);
    $(selector).each(function(){
        console.log(i);
        var jboite_h4 = $(this).find("h4").first();
        var boite_h4 = jboite_h4[0];
       // console.log("boite_h4",boite_h4);
        if(boite_h4 && boite_h4.tagName == "H4") {
            //console.log(boite_h4);
           // Get boite name
           //console.log('nodelist',this,this.children,boite_h4,stripTags(boite_h4.innerHTML).replace(/\s+/g," ").replace(/^ /,""));
           var boite=stripTags(boite_h4.innerHTML).replace(/\s+/g," ").replace(/^ /,"").match(/^(.+) \- (.+)$/);
           //console.log('boite',boite);
           if(boite === null && boite_h4.children[0]) {
                boite=new Array();
                boite[1]=boite_h4.children[0].innerHTML;
                //console.log(boite[1]+"...");
           } else {
                console.log(boite[1]+"...");
                
               // Make boite clickable
                boite_h4.innerHTML=boite_h4.innerHTML.replace(/<\/?([^>]+)>/ig,""); // strip tags
                var btn = document.createElement('h4');
                var btns1 = document.createElement('span');
                var btns2 = document.createElement('span');
                btns1.addEventListener("click", addtoGM, false);
                var tmp =boite;
                var tmp2=boite[2];
                btns1.innerHTML=tmp[1]; //console.log(btns1.innerHTML);
                btns2.innerHTML=" - "+tmp2; //console.log(btns2.innerHTML);
                btn.appendChild(btns1);
                btn.appendChild(btns2);
                //console.log("btn",this,btn,boite_h4);
                $(btn).insertBefore(jboite_h4);
                jboite_h4.remove();
            }
            // Boites predefined
            var broken=false;
            
            for (var j=0, len=blockedBoites.length;j<len;j++) {
                //console.log("z"+j+"/"+len+" - "+blockedBoites[j]);
                if(boite[1].match(blockedBoites[j])) {
                    console.log("... removed!"); //console.log(blockedBoites[j]);
                    $(this).remove();
                    count_replaced++;
                    broken = true;
                    break;
                }
                    
            }
            
            // Idem boites custom
            
            if(!broken)
                for (var j=0, len=customBoites.length;j<len;j++) {
                    //console.log("z"+j+"/"+len+" - "+customBoites[j]);
                    if(boite[1] == customBoites[j]) {
                        console.log("... removed!"); console.log(blockedBoites[j]);
                        $(this).remove();
                        count_replaced++;
                        break;
                    }
                }

    /*if(blockedBoites.indexOf(boite[1]) != -1) {
		console.log("... removed!");
        var up=this.parentNode;
        up.parentNode.removeChild(up);}*/
        }   
    });

 // Afficher le nombre de résultats supprimés dans le titre de page

var deletednb = count_replaced;

theKids[0].innerHTML=initTitle.replace(" correspondent à votre recherche",", "+deletednb+" supprimée"+((deletednb>1)?"s":"")+" sur cette page");
  
return count_replaced;
}

function stripTags(stringz) {
  return stringz.replace(/<\/?[^>]+>/g, '');
}

 // Lancer la suppression des annonces

ReplaceContentInContainer(".boxContent.offre");


// Afficher la liste des entreprises bloquées par l'utilisteur

var rightPan = document.querySelectorAll(".box2Benday")[0];console.log(rightPan);
var rightTitle = document.createElement('div');
rightTitle.innerHTML = "<b>Entreprises perso. exclues:</b><br>"
rightPan.appendChild(rightTitle);

	for (var i=0, len=customBoites.length;i<len;i++) {
		var rightBoite = document.createElement('div');
		rightBoite.innerHTML = customBoites[i];
		rightBoite.addEventListener("click", removefromGM, false);
		rightPan.appendChild(rightBoite);
	}