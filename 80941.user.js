// Date: 28.02.2009
// Get latest version at http://ikariam.norsam.org
//
// ==UserScript==
// @name           Ikariam Not Defteri
// @namespace      NorSamIkariamNotepad
// @description    İstediginiz gibi yazı yazabileceginiz not defteriniz..
// @author         Samuele Manfrin
// @version		   0.41
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==


if(document.getElementById('city') == null) return;

var version = 0.41;
var dlUrl = 'http://ikariam.norsam.org/gm/ikariam_notepad.user.js';

var lang={
  it: {	'new': 'Nuova versione disponibile',
  	    'install': 'installare',
  	    'edit':	'edit',
  	    'note': 'Note'
  	  		},
  en: { 'new': 'New version available',
  	    'install': '.',
  	    'edit': 'Yaz/Degiştir',
  	    'note': 'Not Defteri'
  			},
  fr: { 'new': 'Nouvelle version',
  	    'install': 'télécharger',
  	    'edit': 'changer',
  	    'note': 'Notes'
  			},
  // thanks to Salomone for Hungarian translation
  hu: { 'new': 'Új verzió elérhető',
        'install': 'Telepít',
        'edit': 'változtat',
        'note': 'Jegyzet'
  }
};

function cbf(e) {
//	alert("Ikariam NotePad ver. "+version+" [18.Mar.09]\nhttp://ikariam.norsam.org/\n");
//	alert("Ikariam NotePad ver. "+version+" [19.Dec.09]\nhttp://ikariam.norsam.org/\n");
	alert("Ikariam NotePad ver. "+version+" [31.Jan.10]\nhttp://ikariam.norsam.org/\n");

	alert( "0.1: first working version\n" 
		  +"0.2: introduced auto-update feature\n"
	      +"0.3: added multilingual\n"
	      +"0.4: revised for new greasemonkey\n"
	      +"0.41: added Hungarian translation (thanks to Salomone)\n"
	);
}

var cityId = getCityId(top.location.search);
if (cityId==-1) return;
var CHECK_INTERVAL = 2880000;
var gameServer = top.location.host;

var domain = getIkaDomain(gameServer);
var serverId = getIkaServer(gameServer);

var local='en';
if (domain in lang) local = domain;

var uniqueCityId = "city"+serverId+domain+cityId;

var informationDiv = document.getElementById('information');

function getIkaDomain(s) {
	var ss = s.toLowerCase();
	var spl = ss.split(".");
	// quick & dirty... :)
	return (spl[1]!='ikariam' ? spl[1] : spl[spl.length-1]);
}

function getIkaServer(s) {
	return s.toLowerCase().split(".")[0];
}

function verChecker(name,install,before) {
	var c = GM_getValue('currVersion','');
	var ora = (new Date()).getTime();
	var t = GM_getValue('lastCheck',0);
	if (ora-t>CHECK_INTERVAL) {
		getCurrentVersion(name,install,before);
	} else {
		if (c!='' && c>version) 
			insertAfter(install, before);
	}
}

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
                GM_setValue("currVersion",responseDetails.responseText);
                var ad = ''+(new Date()).getTime();
                GM_setValue('lastCheck', ''+(new Date()).getTime());
                // alert('c:'+GM_getValue('lastCheck',''));
                verChecker(name,install,before);
        }
    });
}

// alcune funzioni che mi possono servire
function getCityId(s) {
	var elements = s.split("&");
	if (elements.length!=2) return -1;
	var ids = elements[1].split("=");
	if (ids.length!=2) return -2;
	return (ids[1]);
}

// recycle recycle recycle ;-)
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

function saveNote(event) {
	var v = event.target.id;
	var uniqueCityId = v.substring(5);
	var divObj = document.getElementById(uniqueCityId);
	var textArea = document.getElementById(v).value;
	GM_setValue(uniqueCityId,textArea);
	divObj.innerHTML="<p>"+textArea.replace(/\n/g,'<br>')+"</p>";
}

function editnote(event) {
	var v = event.target.id;
	// var uniqueCityId = v.replace(/^.+[a-z]([0-9]+)$/,'$1');
	var uniqueCityId = v.substring(9);
	var divObj = document.getElementById(uniqueCityId);
	var contenuto = divObj.getElementsByTagName("p")[0].innerHTML;
	content = contenuto.replace(/<br>/ig,"\n");
	var ftname = "ftxt_"+uniqueCityId;
	divObj.innerHTML="<form><textarea id='"+ftname+"' style='font-size: 12px; margin-left:5px;' cols='32' rows='2'>"+content+"</textarea></form>";
	document.getElementById(ftname).focus();
	var ta = document.getElementById(ftname);
	ta.addEventListener("blur",saveNote,true);
}

var newDiv = document.createElement("div");
newDiv.setAttribute("class", "dynamic");

var newFooter = document.createElement("div");
newFooter.setAttribute("class", "footer");

var newDivH3 = document.createElement("h3");
var edid = "editnote_"+uniqueCityId;
newDivH3.setAttribute("class", "header");
newDivH3.innerHTML = lang[local]['note']+" <a href='javascript:void(0)' id=\""+edid+"\">["+lang[local]['edit']+"]</a>";

var newContent = document.createElement("div");
newContent.setAttribute("class", "content");
newContent.setAttribute("id", uniqueCityId);
if (!GM_getValue(uniqueCityId)) GM_setValue(uniqueCityId,"");
var toShow = GM_getValue(uniqueCityId);
newContent.innerHTML = "<p>"+toShow.replace(/\n/g,'<br>')+"</p>";
var installDiv = document.createElement("div");
installDiv.setAttribute("id","npInstall");
installDiv.setAttribute("class","content");
installDiv.innerHTML='<p>'+lang[local]['new']+': <a href="'+dlUrl+'">'+lang[local]['install']+'</a></p>';
installDiv.style.borderTop='1px solid #444';

// ora mettiamo tutto al suo posto
newDiv.appendChild(newDivH3);
newDiv.appendChild(newContent);
// newDiv.appendChild(installDiv);
newDiv.appendChild(newFooter);
insertAfter(newDiv, informationDiv);

verChecker('ikanotepad',installDiv,newContent);
var alink = document.getElementById(edid);

alink.addEventListener("click",editnote, true); 

GM_registerMenuCommand('NotePad Info',cbf);
