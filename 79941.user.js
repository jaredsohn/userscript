// ==UserScript==
// @name           דוקטור צחוק מציג: איקרים הצילו
// @namespace      
// @description    מציג מיידית תבניות להודעה למסחר, תרבות והחשוב - לתקיפות .
// @include        http://s*.ikariam.*/*
// @version	       1.8
// ==/UserScript==



var version = 1.08;
var CHECK_INTERVAL = 2880000;
var dlUrl = 'http://ikariam.norsam.org/gm/ikariam_helpme.user.js';

var lang={


  
    il:   { 'new':      'דוקטור צחוק הכין עבורך גרסה חדשה',
  	    'helpme':   'HELPME',
  	    'install':  'התקן',
  	    'attack':   'מתקפה',
  	    'resource': 'משאבים',
  	    'culture':  'חוזה תרבות',
  	    'spam': 	'סתם ספאם',
       	'guerra':       'בהקשר למלחמה',
  	    'template': 'תבנית הודעה בהקשר ל: ',
  	           
                     'att_txt':  "[אני מותקף!]\n"
  	    	                 +  "בלי שום לחץ - אבל אני מותקף!!\n"
		 		 +  "אני מותקף בעיר ___________שנמצאת במיקום [__:__] \n"
		 		 +  "התקיפה יוצאת מעיר _________במיקום [__:__]\n"
		 		 +  "והיא תגיע בשעה זו לערך: _____\n"
                                 + "# - מ י ד ע - נ ו ס ף - #\n"
		 		 +  "לדעתי אני זקוק ל______ כוחות מסוג _____בינתיים יש לי כבר _____כוחות מסוג______\n",

		    'res_txt':  "[צריך משאבים]\n"
			         +  "אני זקוק למשאבים!!\n"
		 		 +  "המשאבים להם אני זקוק הנם ___ בכמות של ___לעיר ממנה אני שולח את ההודעה.\n"
		 		 +  "אני יכול לשלוח חזרה ____ של המשאב______\n"
		 		 +  "ואם אני רוצה לקנות, אני מוכן לשלם ליחידה טווח של __ זהב, אבל רחמים, לא לדפוק מחיר...\n"
	     		         +  "תודה מראש",
	   
                   'cul_txt':  "[חוזה תרבות פנוי]\n"
	    	     +  "רבותי, - וגבירותי - ברשותי _ חוזי תרבות לאומנות הטובה ביותר.! נאלשלוח אליי בקשות אם אתם זקוקים לקצת תרבות",

		   'spa_txt':  "[סתם ספאם]\n"
                                 +  "אני יודע שאסור סתם דואר, אבל אני רוצה לשתף אתכם!!\n"

		   'gue_txt':  "[בהקשר למלחמה]\n"
                                 +  "רציתי לברר בהקשר למלחמה שלנו עם ________!!\n"
	    	
	           'alert': "הופה - עוד לא הכרנו! נעים מאוד, דוקטור צחור. כעת גש \\לשגרירות שלך. אתה יודע מה אומרים: אמור לי מי חבריך..."

  			},
  	  		
 es:{ 'new':      'דוקטור צחוק הכין עבורך גרסה חדשה',
  	    'helpme':   'HELPME',
  	    'install':  'התקן',
  	    'attack':   'מתקפה',
  	    'resource': 'משאבים',
  	    'culture':  'חוזה תרבות',
  	    'spam': 	'סתם ספאם',
       	'guerra':       'בהקשר למלחמה',
  	    'template': 'תבנית הודעה בהקשר ל: ',
  	           
                     'att_txt':  "[אני מותקף!]\n"
  	    	                 +  "בלי שום לחץ - אבל אני מותקף!!\n"
		 		 +  "אני מותקף בעיר ___________שנמצאת במיקום [__:__] \n"
		 		 +  "התקיפה יוצאת מעיר _________במיקום [__:__]\n"
		 		 +  "והיא תגיע בשעה זו לערך: _____\n"
                                 + "# - מ י ד ע - נ ו ס ף - #\n"
		 		 +  "לדעתי אני זקוק ל______ כוחות מסוג _____בינתיים יש לי כבר _____כוחות מסוג______\n",

		    'res_txt':  "[צריך משאבים]\n"
			         +  "אני זקוק למשאבים!!\n"
		 		 +  "המשאבים להם אני זקוק הנם ___ בכמות של ___לעיר ממנה אני שולח את ההודעה.\n"
		 		 +  "אני יכול לשלוח חזרה ____ של המשאב______\n"
		 		 +  "ואם אני רוצה לקנות, אני מוכן לשלם ליחידה טווח של __ זהב, אבל רחמים, לא לדפוק מחיר...\n"
	     		         +  "תודה מראש",
	   
                   'cul_txt':  "[חוזה תרבות פנוי]\n"
	    	     +  "רבותי, - וגבירותי - ברשותי _ חוזי תרבות לאומנות הטובה ביותר.! נאלשלוח אליי בקשות אם אתם זקוקים לקצת תרבות",

		   'spa_txt':  "[סתם ספאם]\n"
                                 +  "אני יודע שאסור סתם דואר, אבל אני רוצה לשתף אתכם!!\n"

		   'gue_txt':  "[בהקשר למלחמה]\n"
                                 +  "רציתי לברר בהקשר למלחמה שלנו עם ________!!\n"
	    	
	           'alert': "הופה - עוד לא הכרנו! נעים מאוד, דוקטור צחור. כעת גש \\לשגרירות שלך. אתה יודע מה אומרים: אמור לי מי חבריך..."

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
		 		 +  "et il arrivera ֳ  cet heures: _____\n"
		 		 +  "# PLUS D'INFORMATIONS #\n"
		 		 +  "SVP, je voudrais ___ bateaux et ____ unitֳ©s; "
		 	     +  "j'ai dֳ©jֳ  ___ bateaux et _____ unitֳ©s.\n",
		'res_txt':  "[Je voudrais des materiaux]\n"
			     +  "Je cherche des materiaux!!\n"
		 		 +  "Je voudrais dans la ville ______ au coordinates [__:__]\n"
		 		 +  "les materiaux suivantes: __________\n"
		 		 +  "Je peux vous donner en change: _________\n"
	     		 +  "Merci beaucoup",
	    'cul_txt':  "[Je cherche de la culture]\n"
	    	     +  "J'ai ___ traitֳ©s cultural!\nEcrivez-moi pour les changer avec moi!" ,
		'spa_txt':  "[Spam]\n",
		'gue_txt':  "[Guerre]\n",
	    'alert': "Je ne connais pas votre alliance, svp visitez l\\'Ambassade"
	  
  			},
  dk: {	'new':      'Ny version tilgֳ¦ngelig',
  	    'helpme':   'HJֳ†LP MIG',
  	    'install':  'install',
  	    'attack':   'Angreb',
  	    'resource': 'Ressourcer',
  	    'culture' : 'Cultural traktat',
  	    'template': 'Skabelon for: ',
   	    'spam': 	'Spam',
		'guerra': 	'Krig',

  	    'att_txt': "[Jeg er under angreb!]\n"
  	    	     + "Hjֳ¦lp! Jeg er under angreb!\n"
				 + "Jeg er under angreb pֳ¥ landsbyen _____ pֳ¥ ֳ¸en pֳ¥ koordinaterne [__:__]\n"
				 + "Angreb kommer fra landsbyen _____ pֳ¥ koordinater [__:__]\n"
				 + "Og det vil nֳ¥ frem til dette tidspunkt: _____ \n"
				 + "# FLERE OPLYSNINGER # \n"
				 + "Vֳ¦r sֳ¸d, jeg har brug for ___ skibe og ____ tropper, jeg allerede har ___ skibe og _____ tropper.\n",
		'res_txt': "[Jeg leder efter ressourcer]\n"
			     + "Jeg leder efter ressourcer!!\n"
		 		 + "Jeg vil gerne i beskeden ______ pֳ¥ koordinater [__:__]\n"
		 		 + "Fֳ¸lgende ressourcer: __________\n"
		 		 + "eg kan sende tilbage til dig fֳ¸lgende ressourcer: _________\n"
	     		 + "Tak pֳ¥ forhֳ¥nd",
	    'cul_txt': "[Kulturel traktater rֳ¥dighed]\n"
	    	     + "Jeg har ___ kulturelle traktat til rֳ¥dighed! Skriv til mig hvis du har brug for nogle!",
		'spa_txt': "[Spam]\n",
		'gue_txt': "[Krig]\n",	    	
	    'alert': "Jeg ken der ikke din alliance, kan du besֳ¸ge din ambassade"
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

var spanish = ':ar:il:ve:cl:co:mx:pe:';
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

