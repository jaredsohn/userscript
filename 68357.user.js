// ==UserScript==
// @name           Ikariam Subject
// @namespace      http://ikariam.norsam.org/subject
// @description    Can add a subject to your messages: simply put between square brackets the subject in first line.
// @include        http://s*.ikariam.*/index.php*
// @version        0.5
// ==/UserScript==

var version=0.5;
var dlUrl = 'http://ikariam.norsam.org/gm/ikariam_subject.user.js';
var CHECK_INTERVAL = 2880000;

var lang={
  it: {  'new': 'Nuova versione Ikariam Subject disponibile',
       'install': 'installare',
       // 'help': '<small>Mettere nella prima riga del messaggio il soggetto tra parentesi quadre. Es: [Cerco legno]</small>',
      'subject': 'Oggetto: ',
      'type': 'Tipo: ',
      'spam': 'Per favore, verifica l\'oggetto del messaggio'
      },
  en: { 'new': 'New version of Ikariam Subject available',
       'install': 'install',
       // 'help': '<small>Put in first line of the message the subject inside square brackets. .g.: [Looking for marble]</small>',
       'subject': 'Subject:',
       'type': 'Type:',
       'spam': 'Please, check message subject'
      },
  fr: { 'new': 'Nouvelle version du Ikariam Subject',
       'install': 't&eacute;l&eacute;charger',
       // 'help': '<small>Mettre le sujet dans la premiere ligne du message entre parent&egrave;ses carr&eacute;es. Example: [Je cherche du Marble]</small>',
       'subject': 'Sujet:',
        'type': 'Typologie:',
        'spam': 'Svp, vrifiez le sujet du message',
      },
  es: {'new': 'Nueva versi&oacute;n disponible de Ikariam Subject',
       'install': 'instalar',
       // 'help': '<small>Escribe en la primera l&iacute;nea del mensaje el asunto entre corchetes . P.E.: [Busco m&aacute;rmol]</small>',
       'subject': 'Asunto:',
        'type': 'Tipo:',
        'spam': 'Por favor, revise el asunto del mensaje'
      }
};

var SPAM = '';

//recycling some code... ;-)
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

function getIkaDomain(s) {
   var spl = s.toLowerCase().split(".");
   return (spl[1]!='ikariam' ? spl[1] : spl[spl.length-1]);
}

function getIkaServer(s) {
   return s.toLowerCase().split(".")[0];
}

// -- let's go! --
var gameServer = top.location.host;

var serverId = getIkaServer(gameServer);
var domain = getIkaDomain(gameServer);

var spanish = ':ar:ve:cl:co:mx:pe:';
var local='en';
if (domain in lang) local = domain;
if (spanish.indexOf(':'+domain+':') != -1 ) local = 'es';


function insertAfter(newElement,targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;
    //if the parents lastchild is the targetElement...
    if(parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        //else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
};

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


function insertSubjectTextbox () {
   var parentDiv = document.getElementById('mailSubject');
   var allyMessage = top.location.href.split('msgType=51&allyId=');
   if (allyMessage[1]!=null) {
      parentDiv.childNodes[3].childNodes[11].innerHTML = "<input type='text' id='textSubject' value='"+SPAM+"'/>";
   } else {
      var newSubjectDiv = document.createElement('div');
      newSubjectDiv.setAttribute('id', 'mailSubjectMod');
      newSubjectDiv.innerHTML = '<span class = "maillabels"><label>'+lang[local]['subject']+'</label></span><span><input type="text" id="textSubject" value="'+SPAM+'"/></span>';
      document.getElementById('mailRecipient').parentNode.insertBefore(newSubjectDiv,document.getElementById('mailSubject'));
      parentDiv.childNodes[1].innerHTML = '<label for="treaties">'+lang[local]['type']+'</label>';
   }
}

function insertSubjectinMessage(e) {
   var subject = document.getElementById('textSubject').value.trim();
   if (subject == '^&^^%%^889') {
      var news = prompt(lang[local]['spam'],subject);
      if (news == null ) {
         e.preventDefault();                             //This works!!
         document.getElementById('textSubject').focus(); //This is for show correct image button when cancel, if not image is mousedown
         return;
      } else {
         subject = news;
      }
   }
   if (subject != "") {
      var message = document.getElementById('text').value;
      document.getElementById('text').value = "[" + subject + "]\n" + document.getElementById('text').value;
   } 
   // alert(document.getElementById('text').value);
}
function moveUpSendButton () {
   //alert('moveDownSendButton');
   getElementsByClass(notice,"centerButton")[0].setAttribute('style', 'margin-top: 0px; margin-bottom: 0px'); //move up a little more
   document.getElementById('text').removeEventListener("keypress",moveUpSendButton,false);                  //remove the listener, this function executes only one time
}

if (document.getElementById("sendMessage")!=null || document.getElementById("sendIKMessage")!=null) {
   //GM_log("ok I'm here");
   //insert the subject texbox
   insertSubjectTextbox();
   var notice = document.getElementById('notice');
   getElementsByClass(notice,"button")[0].addEventListener("click",insertSubjectinMessage,true);
   // todo: move up a little the "send" button :-)    --> CHECK THE CODE, I think this is the best code
   getElementsByClass(notice,"button")[0].setAttribute('style', 'margin-top: 0px');   // first move up a little the send button
   document.getElementById('text').addEventListener("keypress",moveUpSendButton,false);  //when we type text appears the caracter count label --> capture the event and move up a little more

   return;
}

// continue...
var isIn = (document.getElementById("diplomacyAdvisor")!=null);
var isOut = (document.getElementById("diplomacyAdvisorOutBox")!=null);
if (!isIn && !isOut) 
   return;

var tabz = document.getElementById("tabz");
if (tabz==null) 
   return;
var td1 = tabz.getElementsByTagName("td");
// if (td1[0].getAttribute("class")!="selected") return;

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
            var trp = elem.parentNode;
            // .previousSibling.nodeName=#text; 
            var tr = trp.previousSibling.previousSibling;
            /*
         var idp = elem.parentNode.id;
         var msgid = idp.replace(/tbl_mail/g,"message");
         var tr = document.getElementById(msgid);
            */
         var ndiv = getElementsByClass(tr,"subject")[0];
         var circolare="";
         if (ndiv.innerHTML.indexOf("-")>0) circolare = "[A] ";
         ndiv.innerHTML=circolare+res;
         div.innerHTML = "<i>### "+inn.substring(1,fine)+" ###</i><br>"+inn.substring(fine+1);
      }     
   }
}

// thanks
function cbf(e) {
   var m1 = "sampi";
   var m2 = "sa@gm";
   var m3 = "ail.com";
   alert("Ikariam Subject ver. "+version+" [28.Jan.10]\nhttp://ikariam.norsam.org/\nSamuele Manfrin (write me in it/en/fr), "+m1+m2+m3);
   alert( ""
        + "0.5: removed mini-help, added subject separately (Thanks to NubeRoja!)\n"      //Changed name by Nickname :-)
        + "0.44: modified to work with latest GM\n"
        + "0.43: added autbox functionality\n"
        + "0.42: it works with 0.3.1 too\n"
        + "0.41: ehm... removed debug alerts\n"
        + "0.4: mini-help added\n"  
        + "0.3: changed page recognition, it works well :-)\n"
        + "0.2: introduced auto-update feature, added translation\n"
        +   "0.1: first working version\n"
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


var installDiv = document.createElement("div");
installDiv.setAttribute("id","npInstall");
installDiv.setAttribute("class","content");
installDiv.innerHTML='<p>'+lang[local]['new']+': <a href="'+dlUrl+'">'+lang[local]['install']+'</a></p>';
installDiv.style.borderTop='1px solid #444';

var newpos = document.getElementById("mainview");
var newdesc = getElementsByClass(newpos,"buildingDescription")[0];

verChecker('ikasubject',installDiv,newdesc.lastChild);

GM_registerMenuCommand('Subject Info',cbf);
