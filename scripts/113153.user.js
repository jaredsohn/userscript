// ==UserScript==
// @name           Ika-Título (Complemento)
// @autor          2-D (Ex-Reaper)
// @description    Agrega títulos prefijados y un botón a mensajes globales.
// @homepage       http://userscripts.org/scripts/show/113153
// @include        http://m*.ikariam.*/index.php*
// @icon           http://img834.imageshack.us/img834/4173/ikat.jpg
// @version	   v4.5


// ==/UserScript==






var CHECK_INTERVAL = 2880000;
var dlUrl = 'http://ikariam.norsam.org/gm/ikariam_helpme.user.js';

var lang={
  it: {	'new':      'Nuova versione disponibile',
  	    'helpme':   'AIUTO',
  	    'install':  'installare',
  	    'attack':   'Attacco',
  	    'resource': 'Risorse',
  	    'culture' : 'Culturali',
  	    'template': 'Template per: ',
   	    'spam': 	'Spam',
		'guerra': 	'Guerra',

  	    'att_txt': "[Sono sotto attacco!]\n"
  	    	     + "Aiuto! Mi stanno attaccando!!\n"
		 		 + "Mi attaccano nel villaggio _______ nell'isola di coordinate [__:__]\n"
		 		 + "L'attacco arriva dal villaggio _______ alle coordinate [__:__]\n"
		 		 + "ed arriva alle ore _____\n"
		 		 + "# INFORMAZIONI FACOLTATIVE #\n"
		 		 + "Vorrei __ navi e __ truppe, ed ho presenti  __ navi e __ truppe\n",
		'res_txt': "[Richiesta risorse]\n"
			     + "Sto cercando risorse!!\n"
		 		 + "Vorrei nel villaggio ______ alle seguenti coordinate: __:__\n"
		 		 + "le seguenti risorse: __________\n"
		 		 + "In cambio offro le seguenti risorse: _________\n"
	     		 + "Grazie anticipatamente",
	    'cul_txt': "[Accordi culturali liberi]\n"
	    	     + "Ho ___ accordi culturali liberi: scrivetemi se vi servono!",
		'spa_txt':  "[Spam]\n",
		'gue_txt':  "[Guerra]\n",	    	
	    'alert': "Non conosco la tua ally, per favore, visita l\\'ambasciata"
  	  		},
  en: { 'new':      'New version available',
  	    'helpme':   'HELPME',
  	    'install':  'install',
  	    'attack':   'Attack',
  	    'resource': 'Resources',
  	    'culture':  'Cultural treaty',
  	    'spam': 	'Spam',
		'guerra': 	'War',
  	    'template': 'Template for: ',
  	    'att_txt':  "[I'm under attack!]\n"
  	    	     +  "Help! I'm under attack!!\n"
		 		 +  "I'm under attack on the village _________ in the island at coordinates [__:__]\n"
		 		 +  "Attack is coming from village __________ at coordinates [__:__]\n"
		 		 +  "and it will arrive at this time: _____\n"
		 		 +  "# MORE INFORMATION #\n"
		 		 +  "Please, I need ___ ships and ____ troops; I already have ___ ships and _____ troops.\n",
		'res_txt':  "[Looking for resources]\n"
			     +  "I'm looking for resources!!\n"
		 		 +  "I would like in the message ______ at coordinates [__:__]\n"
		 		 +  "the following resources: __________\n"
		 		 +  "I can send back to you the following resources: _________\n"
	     		 +  "Thank you in advance",
	    'cul_txt':  "[Cultural treaties available]\n"
	    	     +  "I have ___ cultural treaty available! Write me if you need some!",
		'spa_txt':  "[Spam]\n",
		'gue_txt':  "[War]\n",
	    	
	    'alert': "I don\\'t know your ally, please visit your Embassy"

  			},
  	  		
 es: {  'new':      'Nueva versin disponible',
 	    'helpme':   '[G]',
  	    'install':  'Instalar',
  	    'template': 'Título: ',  	    'attack':   'ATAQUE',
  	    'resource': 'COMERCIO',
  	    'culture':  'TRATADO CULTURAL',
  	    'spam': 	'SPAM',
		'guerra': 	'GUERRA',
  	    'att_txt':  "[ATAQUE]\n",
  	    'res_txt':  "[COMERCIO]\n"
,
  	    'cul_txt':  "[TRATADO CULTURAL]\n"
,
  	    'spa_txt':  "[SPAM]\n",
		'gue_txt':  "[GUERRA]\n",
		'alert': 	"Desconozco tu alianza, por favor, visita tu Embajada"

  			},
  fr: { 'new':      'Nouvelle version',
  	    'helpme':   'AIDE',
  	    'install':  'installez',
  	    'attack':   'Attaque',
  	    'resource': 'Mat&eacute;riaux',
  	    'template': 'Template pour: ',
  	    'culture':  'Trait&eacute;s cultural',
  	    'spam': 	'Spam',
		'guerra': 	'Guerre',
  	    'att_txt':  "[Je suis sous attaque!]\n"
  	    	     +  "Aidez-moi! Je suis sous attaque!!\n"
		 		 +  "L'attaque arrive dans le village _________ sur l'ile au coordinates [__:__]\n"
		 		 +  "L'attaque est parti du village __________ au coordinates [__:__]\n"
		 		 +  "et il arrivera à cet heures: _____\n"
		 		 +  "# PLUS D'INFORMATIONS #\n"
		 		 +  "SVP, je voudrais ___ bateaux et ____ unités; "
		 	     +  "j'ai déjà ___ bateaux et _____ unités.\n",
		'res_txt':  "[Je voudrais des materiaux]\n"
			     +  "Je cherche des materiaux!!\n"
		 		 +  "Je voudrais dans la ville ______ au coordinates [__:__]\n"
		 		 +  "les materiaux suivantes: __________\n"
		 		 +  "Je peux vous donner en change: _________\n"
	     		 +  "Merci beaucoup",
	    'cul_txt':  "[Je cherche de la culture]\n"
	    	     +  "J'ai ___ traités cultural!\nEcrivez-moi pour les changer avec moi!" ,
		'spa_txt':  "[Spam]\n",
		'gue_txt':  "[Guerre]\n",
	    'alert': "Je ne connais pas votre alliance, svp visitez l\\'Ambassade"
	  
  			},
  dk: {	'new':      'Ny version tilgængelig',
  	    'helpme':   'HJÆLP MIG',
  	    'install':  'install',
  	    'attack':   'Angreb',
  	    'resource': 'Ressourcer',
  	    'culture' : 'Cultural traktat',
  	    'template': 'Skabelon for: ',
   	    'spam': 	'Spam',
		'guerra': 	'Krig',

  	    'att_txt': "[Jeg er under angreb!]\n"
  	    	     + "Hjælp! Jeg er under angreb!\n"
				 + "Jeg er under angreb på landsbyen _____ på øen på koordinaterne [__:__]\n"
				 + "Angreb kommer fra landsbyen _____ på koordinater [__:__]\n"
				 + "Og det vil nå frem til dette tidspunkt: _____ \n"
				 + "# FLERE OPLYSNINGER # \n"
				 + "Vær sød, jeg har brug for ___ skibe og ____ tropper, jeg allerede har ___ skibe og _____ tropper.\n",
		'res_txt': "[Jeg leder efter ressourcer]\n"
			     + "Jeg leder efter ressourcer!!\n"
		 		 + "Jeg vil gerne i beskeden ______ på koordinater [__:__]\n"
		 		 + "Følgende ressourcer: __________\n"
		 		 + "eg kan sende tilbage til dig følgende ressourcer: _________\n"
	     		 + "Tak på forhånd",
	    'cul_txt': "[Kulturel traktater rådighed]\n"
	    	     + "Jeg har ___ kulturelle traktat til rådighed! Skriv til mig hvis du har brug for nogle!",
		'spa_txt': "[Spam]\n",
		'gue_txt': "[Krig]\n",	    	
	    'alert': "Jeg ken der ikke din alliance, kan du besøge din ambassade"
  	  		},  				
};

function verChecker(name,install,before) {
	var c = GM_getValue('hm_currVersion','');
	var ora = (new Date()).getTime();
	var t = GM_getValue('hm_lastCheck',0);
	if (ora-t>CHECK_INTERVAL) {
		getCurrentVersion(name,install,before);
	} else {
		if (c!='' && c>version) 
			insertAfter(install, before);
	}
}

getElementsByClass = function(inElement, className) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
  	  // alert(all[e].className);
    if (all[e].className == className) {
      elements[elements.length] = all[e];
    }
  }
  return elements;
};


function getCurrentVersion(name,install,before) {
	    GM_xmlhttpRequest({
        method:'POST',
        url:'http://ikariam.norsam.org/version.php',
        data:"p="+name,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
        },
        onload: function(responseDetails) {
                GM_setValue("hm_currVersion",responseDetails.responseText);
                var ad = ''+(new Date()).getTime();
                GM_setValue('hm_lastCheck', ''+(new Date()).getTime());
                // alert('c:'+GM_getValue('hm_lastCheck',''));
                verChecker(name,install,before);
        }
    });
}

function isSendAllyMessage() {
	var s = top.location.search;
	s = s.substring(1,s.length);
	var elements = s.split("&");
	var x=0;
	for (i=0; i<elements.length; i++) {
		if (elements[i]=='view=sendAllyMessage' || elements[i]=='view=sendIKMessage') x=1;
		if (x==1 && elements[i]=='customhelp=1') x=2;
	}
	return x;
}

// recycle recycle recycle... ;-)
function insertAfter(newElement,targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;
    //if the parents lastchild is the targetElement...
    if(parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


function getIkaDomain(s) {
	// I must get XX - there are 4 cases
	// 1) sNN.XX.ikariam.com
	// 2) sNN.ikariam.com.XX
	// 3) sNN.ikariam.co.XX
	// 4) sNN.ikariam.XX
	var ss = s.toLowerCase();
	var spl = ss.split(".");
	// quick & dirty... :)
	return (spl[1]!='ikariam' ? spl[1] : spl[spl.length-1]);
}

function getIkaServer(s) {
	return s.toLowerCase().split(".")[0];
}

unsafeWindow.fillDefense = function(lingua) {
	document.getElementById('text').value = tryToInteractWithSubject(lang[local]['att_txt']);
}

unsafeWindow.fillResources = function(lingua) {
	document.getElementById('text').value = tryToInteractWithSubject(lang[local]['res_txt']);
}

unsafeWindow.fillCulture = function(lingua) {
	document.getElementById('text').value = tryToInteractWithSubject(lang[local]['cul_txt']);
}

unsafeWindow.fillSpam = function(lingua) {
	document.getElementById('text').value =  tryToInteractWithSubject(lang[local]['spa_txt']);
}

unsafeWindow.fillGuerra = function(lingua) {
	document.getElementById('text').value =  tryToInteractWithSubject(lang[local]['gue_txt']);
}

function findIkaVersion() {
	var gtool = document.getElementById("GF_toolbar");
	var cver = getElementsByClass(gtool, "version")[0];
	var iver = getElementsByClass(cver, "textLabel")[0].innerHTML;
	return iver;
}

function tryToInteractWithSubject(text) {
	if (document.getElementById('textSubject')==null) return text;
	var a=text.indexOf(']');
	var subj = text.substring(1,a);
	var cont = text.substring(text.indexOf('\n')+1);
	// alert("subj: '"+subj+"'");
	// alert("cont: '"+cont+"'");
	document.getElementById('textSubject').setAttribute("value",subj);
	return cont;
}

var gameServer = top.location.host;

var serverId = getIkaServer(gameServer);
var domain = getIkaDomain(gameServer);
var ikaVersion = findIkaVersion();

var spanish = ':ar:ve:cl:co:mx:pe:';
var local='en';
if (domain in lang) local = domain;
if (spanish.indexOf(':'+domain+':') != -1 ) local = 'es';

var hmtag = 'hm_'+serverId+domain;

// recycle again (from minichat)
var playerAllay = '';

	if (document.getElementById('embassy')!=null) {
		// I'm in the embassy
		// If I've not joined any alliance...
		if (document.getElementById("embassyMenu")==null) {
			GM_setValue(hmtag, '');
		} else {
			// user is in an alliance
			var mlink = document.getElementById("all");		
			var alinke = mlink.getElementsByTagName("a")[0];
			GM_setValue(hmtag, alinke.toString());
			}
	}



var newlink;
if (ikaVersion == "0.3.0") {
   newlink = "http://"+gameServer+"/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&watch=4&position=0&type=50&customhelp=1";
} else {
	if (GM_getValue(hmtag,'')=='') {
		newlink = "javascript:alert('"+lang[local]['alert']+"')";
	} else {
   		newlink = GM_getValue(hmtag);
   	}
}

var breadcrumb = document.getElementById('breadcrumbs');
var newDiv = document.createElement("div");
newDiv.setAttribute("style","right:30px; position:absolute");
newDiv.innerHTML = '<a href="'+newlink+'"><span style="background:#A00;color:#FFF">'+lang[local]['helpme']+'</span></a>';
breadcrumb.appendChild(newDiv);

if (isSendAllyMessage()>0) {
	var mailsubj = document.getElementById('mailSubject');
	var hmDiv = document.createElement("div");
	hmDiv.setAttribute("id","hmArgument");
	var newSpan1 = document.createElement("span");
	newSpan1.setAttribute("class","maillabels");
	var newLabel = document.createElement("label");
	newLabel.innerHTML = lang[local]['template'];
	newSpan1.appendChild(newLabel);
	var newSpan2 = document.createElement("span");
	newSpan2.innerHTML = '<a href="javascript:void(0)" onclick="fillDefense(\''+local+'\')">'+lang[local]['attack']+'</a> - '
	                   + '<a href="javascript:void(0)" onclick="fillResources(\''+local+'\')">'+lang[local]['resource']+'</a> - '
	    			   + '<a href="javascript:void(0)" onclick="fillCulture(\''+local+'\')">'+lang[local]['culture']+'</a> - '
					   + '<a href="javascript:void(0)" onclick="fillSpam(\''+local+'\')">'+lang[local]['spam']+'</a> - '
					   + '<a href="javascript:void(0)" onclick="fillGuerra(\''+local+'\')">'+lang[local]['guerra']+'</a>'
	var installspan = document.createElement("span");
	installspan.innerHTML = '&nbsp;&nbsp;['+lang[local]['new']+': <a href="'+dlUrl+'">'+lang[local]['install']+'</a>]';
	hmDiv.appendChild(newSpan1);
	hmDiv.appendChild(newSpan2);
	insertAfter(hmDiv,mailsubj);
	verChecker('ikahelpme',installspan,newSpan2);
}



function cbf(e) {
	var m1 = "sampi";
	var m2 = "sa@gm";
	var m3 = "ail.com";
	alert("Ikariam HelpMe ver. "+version+" [31.Jan.10]\nhttp://ikariam.norsam.org/\nSamuele Manfrin (write me in it/en/fr), "+m1+m2+m3);
	alert( ""
		  +"1.08: Added interaction with Ikariam Subject\n"
		  +"1.07: translated in Danish (thanx to Lovebug)\n"
		  +"1.06: updated to work with new GM\n"
		  +"1.05: translated in Spanish (thanx to Odyseus)\n"
		  +"1.04: removed bug in version checking\n"
		  +"1.03: removed ultrafast version check (forgot in debug phase)\n"
		  +"1.02: it works with 0.3.1 too (finally...)\n"
		  +"1.01: correction to locale problems in french\n"
		  +"1.0: multilanguage added; tool approved on ikariam.it\n"
		  +"0.3: added autoupdate code\n"
		  +"0.2: added link for resources\n"
	      +"0.1: first release\n" 
	);
}

GM_registerMenuCommand('HelpMe',cbf);


