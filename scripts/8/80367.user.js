// ==UserScript==
// @name           Ikariam Mesaj Konusu 
// @namespace      http://ikariam.norsam.org/subject
// @description    İkariam mesajlarınıza mesaj içerigi hakkında konu başlıgı yazabiliceksiniz.
// @include        http://s*.ikariam.*/index.php*
// @version        0.42
// ==/UserScript==

var version=0.42;
var dlUrl = 'http://ikariam.norsam.org/gm/ikariam_subject.user.js';
var CHECK_INTERVAL = 144000;

var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var serverId = gameServerParts[0];
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];

var local='en';
if (domain=='fr' || domain=='it') local=domain;

var lang={
  
  en: { 'new': 'Bu Hizmet ''www.ikariam.forumm.biz'' Tarafından Sağlanmaktadır :)',
  	    'install': 'install',
  	    'help': '<small>Put in first line of the message the subject inside square brackets. E.g.: [Looking for marble]</small>'
 
  	},
};
// insert the microhelp (first line)
if (document.getElementById("sendMessage")!=null || document.getElementById("sendIKMessage")!=null) {
	// GM_log("qui si");
	var form1 = document.getElementsByTagName('form')[0];
	var newP = document.createElement("div");
	newP.setAttribute("class", "maillabels");
	newP.innerHTML=lang[local]['help'];
	// alert("newp:"+newP.innerHTML);
	var ch1 = form1.firstChild;
	form1.insertBefore(newP,ch1);
	// todo: move up the send button :-)
	return;
}

// continue...
if (document.getElementById("diplomacyAdvisor")==null) return;

var tabz = document.getElementById("tabz");
if (tabz==null) return;
var td1 = tabz.getElementsByTagName("td");
if (td1[0].getAttribute("class")!="selected") return;

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

// part 2: manage messages
var soggetti = getElementsByClass(document,"msgText");
for (var i=0; i<soggetti.length; i++) {
	var elem = soggetti[i];
	var div=elem.getElementsByTagName('div')[0];
	var inn = div.innerHTML;
	if (inn.substring(0,1)=="[") {
		var fine = inn.indexOf("]");		
		if (fine>1) {
			var res = inn.substring(1,fine);
			if (fine>30) res = inn.substring(1,30)+'...';
			// prendo l'id del padre
			var idp = elem.parentNode.id;
			var msgid = idp.replace(/tbl_mail/g,"message");
			var tr = document.getElementById(msgid);
			var ndiv = getElementsByClass(tr,"subject")[0];
			var circolare="";
			if (ndiv.innerHTML.indexOf("-")>0) circolare = "[A] ";
			ndiv.innerHTML=circolare+res;
			div.innerHTML = "<i>### "+inn.substring(1,fine)+" ###</i><br>"+inn.substring(fine+1);
		}		
	}
}

function cbf(e) {
	var m1 = "sampi";
	var m2 = "sa@gm";
	var m3 = "ail.com";
	alert("Ikariam Subject ver. "+version+" [09.May.09]\nhttp://ikariam.norsam.org/\nSamuele Manfrin (write me in it/en/fr), "+m1+m2+m3);
	alert( ""
		  + "0.42: it works with 0.3.1 too\n"
		  + "0.41: ehm... removed debug alerts\n"	
		  + "0.4: mini-help added\n"	
		  + "0.3: changed page recognition, it works well :-)\n"
		  + "0.2: introduced auto-update feature, added translation\n"
		  +	"0.1: first working version\n"     
	);
}

function verChecker(name,install,before) {
	var c = GM_getValue('currVersion_'+name,'');
	var ora = (new Date()).getTime();
	var t = GM_getValue('lastCheck_'+name,0);
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
                GM_setValue("currVersion_"+name,responseDetails.responseText);
                var ad = ''+(new Date()).getTime();
                GM_setValue('lastCheck_'+name, ''+(new Date()).getTime());
                // alert('c:'+GM_getValue('lastCheck',''));
                verChecker(name,install,before);
        }
    });
}

// ricicliamo un po' di codice... ;-)
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

var installDiv = document.createElement("div");
installDiv.setAttribute("id","npInstall");
installDiv.setAttribute("class","content");
installDiv.innerHTML='<p>'+lang[local]['new']+': <a href="'+dlUrl+'">'+lang[local]['install']+'</a></p>';
installDiv.style.borderTop='1px solid #444';

var newpos = document.getElementById("mainview");
var newdesc = getElementsByClass(newpos,"buildingDescription")[0];

verChecker('ikasubject',installDiv,newdesc.lastChild);

GM_registerMenuCommand('Subject Info',cbf);
