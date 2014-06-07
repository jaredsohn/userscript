// ==UserScript==

// @name           Ika-Título
// @autor          2-D (Ex-Reaper)
// @homepage       http://userscripts.org/scripts/show/113152
// @description    Agrega títulos a los mensajes.
// @include        http://m*.ikariam.*/index.php*
// @icon           http://img834.imageshack.us/img834/4173/ikat.jpg
// @exclude        http://board.ikariam.*/*// @version        
// @version        v4.5

// ==/UserScript==





var CHECK_INTERVAL = 8640000;
var page = document.getElementsByTagName('body')[0].id;
var defaultSubject;
var defaultAllySubject;
var lang;

function getIkaDomain(s) {
   var spl = s.toLowerCase().split(".");
   return (spl[1] != 'ikariam' ? spl[1] : spl[spl.length - 1]);
}

function getIkaServer(s) {
   return s.toLowerCase().split(".")[0];
}

var serDom = '.' + getIkaServer(top.location.host) + '.' + getIkaDomain(top.location.host);

defineLanguage = function () {
   var language;
   var domain = getIkaDomain(top.location.host);
   var spanish = ':ar:ve:cl:co:mx:pe:';
   if (spanish.indexOf(':' + domain + ':') != - 1) {
      domain = 'es';
   }

   if (isDefined(GM_getValue('subjectLang'))) {
      if (domain != GM_getValue('subjectLang') && GM_getValue('subjectLang')!='default') {
         domain = GM_getValue('subjectLang');
      }
   } else {
      GM_setValue('subjectLang', domain);
   }

   switch (domain) {
   case "it":
      language = {
         newver: 'Nuova versione Ikariam Subject disponibile',
         install: 'installare',
         //help: '<small>Mettere nella prima riga del messaggio il soggetto tra parentesi quadre. Es: [Cerco legno]</small>',
         subject: 'Oggetto:',
         type: 'Tipo:',
         spam: 'Per favore, verifica l\'oggetto del messaggio',
         Re: 'Re:',
         reply: 'Aggiungere "Re:" nella risposta',
         reply2: 'solo se c\'&egrave; gi&agrave; un soggetto',
         defaultAllySubject: 'Soggetto per messaggi circolari',
         defaultSubject: 'Soggetto per messaggi privati',
         language: 'Lingua',
         saveconfig: 'Salvare'
      };
      break;
   case "fr":
      language = {
         newver: 'Nouvelle version du Ikariam Subject',
         install: 't&eacute;l&eacute;charger',
         //help: '<small>Put in first line of the message the subject inside square brackets. .g.: [Looking for marble]</small>',
         subject: 'Sujet:',
         type: 'Typologie:',
         spam: 'Svp, verifiez le sujet du message',
         Re: 'Re:',
         reply: 'Ajouter "Re:" danse la r&eacute;ponse',
         reply2: 'seulement s\'il y a un autre Suject',
         defaultAllySubject: 'Suject pour l\'alliance',
         defaultSubject: 'Suject pour les messages privés',
         language: 'Langue',
         saveconfig: 'Sauver'
      };
      break;
   case "gr":
      language = {
         newver: 'Νέα Έκδοση του Ikariam Subject διαθέσιμη',
         install: 'εγκατέστησε',
         //help: '<small>Put in first line of the message the subject inside square brackets. .g.: [Looking for marble]</small>',
         subject: 'θέμα:',
         type: 'γράψε:',
         spam: 'Παρακαλώ,ελέγξτε τι θέμα του μηνύματος',
         Re: 'Απ.:',
         reply: 'Εισαγωγή Απ.: στις απαντήσεις',
         reply2: 'μόνο άμα υπάρχει παλιότερο θέμα',
         defaultAllySubject: 'Προεπιλεγμένο περιεχόμενο συμμαχίας',
         defaultSubject: 'Προεπιλεγμένο περιεχόμενο προσωπικού μη νύματος',
         language: 'Γλώσσα',
         saveconfig: 'Αποθήκευσε'
      };
      break;
   case "es":
      language = {
         newver: 'Nueva versi&oacute;n disponible de Ikariam Subject',
         install: 'instalar',
         //help: '<small>Escriba en la primera l&iacute;nea del mensaje el asunto entre corchetes . P.E.: [Busco m&aacute;rmol]</small>',
         subject: 'Asunto:',
         type: 'Tipo:',
         spam: 'Por favor, revise el asunto',
         Re: 'Re:',
         reply: 'Insertar Re: en respuestas',
         reply2: 's&oacute;lo si hay asunto previo',
         defaultAllySubject: 'Asunto mensaje a alianza',
         defaultSubject: 'Asunto mensaje',
         language: 'Idioma',
         saveconfig: 'Guardar'
      };
      break;
   case "ro":
      language = {
         newver: 'O noua versiune Ikariam Subject este disponibila',
         install: 'install',
         //help: '<small>Escriba en la primera l&iacute;nea del mensaje el asunto entre corchetes . P.E.: [Busco m&aacute;rmol]</small>',
         subject: 'Subiect:',
         type: 'Tipul:',
         spam: 'Verificati subiectul mesajului',
         Re: 'Re:',
         reply: 'Insert Re: in reply-uri',
         reply2: 'doar daca exista un subiect anterior',
         defaultAllySubject: 'Default alliance subject',
         defaultSubject: 'Default private msg subject',
         language: 'Limba',
         saveconfig: 'Save'
      };
      break;
   default:
      language = {
         newver: 'New version of Ikariam Subject available',
         install: 'install',
         //help: '<small>Put in first line of the message the subject inside square brackets. .g.: [Looking for marble]</small>',
         subject: 'Subject:',
         type: 'Type:',
         spam: 'Please, check message subject',
         Re: 'Re:',
         reply: 'Insert Re: in replies',
         reply2: 'only if there is a previous subject',
         defaultAllySubject: 'Default ally subject',
         defaultSubject: 'Default private msg subject',
         language: 'Language',
         saveconfig: 'Save'
      };
      break;
   }
   return language;
};

//recycling some code... ;-)
String.prototype.trim = function () {
   return this.replace(/^\s+|\s+$/g, '');
};

function insertAfter(newElement, targetElement) {
   var parent = targetElement.parentNode;
   if (parent.lastchild == targetElement) {
      parent.appendChild(newElement);
   } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
   }
}

getElementsByClass = function (inElement, className) {
   var all = inElement.getElementsByTagName('*');
   var elements = [];
   for (var e = 0; e < all.length; e++) {
      if (all[e].className == className) {
         elements[elements.length] = all[e];
      }
   }
   return elements;
};

isDefined = function (myvar) {
   if (typeof(myvar) != 'undefined') {
      return true;
   }
   return false;
};


//Ikariam Subject functions

function setDefaults() {
   if (isDefined(GM_getValue('defaultAllySubject' + serDom))) {
      defaultAllySubject = GM_getValue('defaultAllySubject' + serDom);
   } else {
      GM_setValue('defaultAllySubject' + serDom, 'SPAM');
      defaultAllySubject = 'SPAM';
   }
   if (isDefined(GM_getValue('defaultSubject' + serDom))) {
      defaultSubject = GM_getValue('defaultSubject' + serDom);
   } else {
      GM_setValue('defaultSubject' + serDom, '');
      defaultSubject = '';
   }
   if (!isDefined(GM_getValue('Reply'))) {
      GM_setValue('Reply', true);
   }
   if (!isDefined(GM_getValue('Reply2'))) {
      GM_setValue('Reply2', true);
   }
}

function insertSubjectTextbox() {
   var parentDiv = document.getElementById('mailSubject');
   var allyMessage = isDefined(top.location.href.split('msgType=51')[1]) && isDefined(top.location.href.split('allyId=')[1]);
   GM_addStyle("#textSubject { width: 180px; }");

   if (allyMessage) {
      parentDiv.childNodes[3].childNodes[11].innerHTML = "<input type='text' id='textSubject' value='" + defaultAllySubject + "'/>";
   } else {
      var newSubjectDiv = document.createElement('div');
      newSubjectDiv.setAttribute('id', 'mailSubjectMod');

      if (GM_getValue('Reply')) {
         var replyMessage = document.getElementById('text').value.split("> ")[1];
         if (isDefined(replyMessage)) {
            var replySubject = replyMessage.split("[")[1];
            if (isDefined(replySubject)) {
               replySubject = replySubject.split("]")[0];
               if (replySubject.split(lang.reply)[1] != null) {
                  replySubject = replySubject.split(lang.reply)[1];
               }
               defaultSubject = lang.Re + replySubject;
            } else if (!GM_getValue('Reply2')) {
               defaultSubject = lang.Re;
            }
         }//ends reply
      }
      newSubjectDiv.innerHTML = '<span class = "maillabels">' +
                                    '<label>' + lang.subject + '</label>' +
                                '</span>' +
                                '<span>' +
                                    '<input type="text" id="textSubject" value="' + defaultSubject + '"/>' +
                                '</span>';
      document.getElementById('mailRecipient').parentNode.insertBefore(newSubjectDiv, document.getElementById('mailSubject'));
      parentDiv.childNodes[1].innerHTML = '<label for="treaties">' + lang.type + '</label>';
   }
}

function insertSubjectinMessage(e) {
   var subject = document.getElementById('textSubject').value.trim();
   if (subject == defaultSubject) {
      var news = prompt(lang.spam, subject);
      if (news == null) {
         e.preventDefault();
         document.getElementById('textSubject').focus();
         return;
      } else {
         subject = news;
      }
   }
   if (subject != "") {
      document.getElementById('text').value = "[" + subject + "]\n" + document.getElementById('text').value;
   }
}

function moveUpSendButton() {
   getElementsByClass(notice, "centerButton")[0].setAttribute('style', 'margin-top: 0px; margin-bottom: 0px');
   document.getElementById('text').removeEventListener("keypress", moveUpSendButton, false);
}

function optionsPage() {
   var newElement = document.createElement("form");
   newElement.setAttribute('id', 'optionSubject');
   newElement.innerHTML =
      "<div class='contentBox01h'>" +
         "<h3 class='header'>" +
            "<span style='font-size:12px;'>  Opciones Ika-Título</span>" +
         "</h3>" +
         "<div class='content'>" +
            "<table cellpadding='0' cellspacing='0'>" +
               "<tbody>" +
                  "<tr>" +
                     "<th id='defaultAllySubject'>" + lang.defaultAllySubject + "</th>" +
                     "<td><input class='textfield' style='width: 120px;' type='text' id='defaultAllySubjectValue' value='" + defaultAllySubject + "'></td>" +
                  "</tr>" +
                  "<tr>" +
                     "<th id='defaultSubject'>" + lang.defaultSubject + "</th>" +
                     "<td><input class='textfield' style='width: 120px;' type='text' id='defaultSubjectValue' value='" + defaultSubject + "'></td>" +
                  "</tr>" +
                     "<tr>" +
                        "<th id='subjectReply'>" + lang.reply + "</th>" +
                        "<td><input type='checkbox' id='subjectReply1'></td>"+
                        "<td style='width:200px'><input type='checkbox' disabled='true' id='subjectReply2'><span id='subjectReplyCondition'>" + lang.reply2 + "</span></td>"+
                     "</tr>" +
                  "<tr>" +
                     "<th id='subjectlanguage'>" + lang.language + "</th>" +
                     "<td><select id='subjectLanguageSelect'></select></td>"+
                  "</tr>" +
               "</tbody>" +
            "</table>" +
            "<div class='centerButton'>" +
               "<input class='button' id='saveSubjectOptions' value='" + lang.saveconfig + "'>" +
            "</div>" +
         "</div>" +
         "<div class='footer'></div>" +
      "</div>";

   document.getElementById('mainview').insertBefore(newElement, document.getElementById('vacationMode'));

   //Add languages
   var langtyp = ['default', 'gr', 'en', 'es', 'fr', 'it', 'ro'];
   var selOpt = false;
   for (var l = 0; l < langtyp.length; l++)
   {
       if (langtyp[l] == GM_getValue('subjectLang')) {
         selOpt = true;
       } else {
         selOpt = false;
       }
       document.getElementById('subjectLanguageSelect').options[l] = new Option(langtyp[l], langtyp[l], false, selOpt);
   }
   //Control checkBoxes
   document.getElementById('subjectReply1').checked = GM_getValue('Reply');
   document.getElementById('subjectReply2').disabled = !document.getElementById('subjectReply1').checked
   document.getElementById('subjectReply2').checked = GM_getValue('Reply2');
   //Add checkbox event
   document.getElementById('subjectReply1').addEventListener('change', function ()
   {
     if (document.getElementById('subjectReply1').checked) {
        document.getElementById('subjectReply2').disabled = false;
        document.getElementById('subjectReply2').checked = GM_getValue('Reply2');
     } else {
        document.getElementById('subjectReply2').checked = false;
        document.getElementById('subjectReply2').disabled = true;
     }
   }, false);
   //Add button event
   document.getElementById('saveSubjectOptions').addEventListener('click', function ()
   {
      GM_setValue('defaultAllySubject' + serDom, document.getElementById('defaultAllySubjectValue').value);
      GM_setValue('defaultSubject' + serDom, document.getElementById('defaultSubjectValue').value);
      GM_setValue('Reply', document.getElementById('subjectReply1').checked);
      GM_setValue('Reply2', document.getElementById('subjectReply2').checked);
      GM_setValue('subjectLang', document.getElementById('subjectLanguageSelect').value);
      lang = defineLanguage();
      //change text to option page
      document.getElementById('defaultAllySubject').innerHTML = lang.defaultAllySubject;
      document.getElementById('defaultSubject').innerHTML = lang.defaultSubject;
      document.getElementById('subjectReply').innerHTML = lang.reply;
      document.getElementById('subjectReplyCondition').innerHTML = lang.reply2;
      document.getElementById('subjectlanguage').innerHTML = lang.language;
      document.getElementById('saveSubjectOptions').value = lang.saveconfig;
      document.getElementById('defaultAllySubjectValue').focus();
   }, false);
}

// -- let's go! --
var gameServer = top.location.host;
lang = defineLanguage();
setDefaults();

if ((page == 'options')) {
   optionsPage();
}

if (page == 'sendMessage' || page == 'sendIKMessage') {
   insertSubjectTextbox();
   var notice = document.getElementById('notice');
   getElementsByClass(notice, "button")[0].addEventListener("click", insertSubjectinMessage, true);
   getElementsByClass(notice, "button")[0].setAttribute('style', 'margin-top: 0px');
   document.getElementById('text').addEventListener("keypress", moveUpSendButton, false);
   return;
}

// continue...
var isIn = (document.getElementById("diplomacyAdvisor") != null);
var isOut = (document.getElementById("diplomacyAdvisorOutBox") != null);
if (!isIn && !isOut) {
   return;
}

var tabz = document.getElementById("tabz");
if (tabz == null) {
   return;
}

var td1 = tabz.getElementsByTagName("td");
var soggetti = getElementsByClass(document, "msgText");
for (var i = 0; i < soggetti.length; i++) {
   var elem = soggetti[i];
   var div = elem.getElementsByTagName('div')[0];
   var inn = div.innerHTML;
   if (inn.substring(0, 1) == "[") {
      var fine = inn.indexOf("]");
      if (fine > 1) {
         var res = inn.substring(1, fine);
         if (fine > 30) {
            res = inn.substring(1, 30) + '...';
         }
         var trp = elem.parentNode;
         var tr = trp.previousSibling.previousSibling;
         var ndiv = getElementsByClass(tr, "subject")[0];
         var circolare = "";
         if (ndiv.innerHTML.indexOf("-") > 0) {
            circolare = "[G] ";
         }
         ndiv.innerHTML = circolare + res;
         div.innerHTML = "<i>### " + inn.substring(1, fine) + " ###</i><br>" + inn.substring(fine + 1);
      }
   }
}

// thanks
function cbf(e) {
   var m1 = "sampi";
   var m2 = "sa@gm";
   var m3 = "ail.com";
   alert("Ikariam Subject ver. " + version + " [04.Jun.10]\nhttp://ikariam.norsam.org/\nSamuele Manfrin (write me in it/en/fr), " + m1 + m2 + m3);
   alert("" +
         "0.7: added Greek translation (Thanks to nniicckk)\n"+
   	   	 "0.6: configurability added in Options page (Thanks to NubeRoja), revised user interface\n" +
         "0.5: removed mini-help, added subject separately (Thanks to NubeRoja)\n" +
         "0.44: modified to work with latest GM\n" +
         "0.43: added autbox functionality\n" +
         "0.42: it works with 0.3.1 too\n" +
         "0.41: ehm... removed debug alerts\n" +
         "0.4: mini-help added\n" +
         "0.3: changed page recognition, it works well :-)\n" +
         "0.2: introduced auto-update feature, added translation\n" +
         "0.1: first working version\n"
   );
}

function verChecker(name, install, before) {
   var c = GM_getValue('currVersion', '');
   var ora = (new Date()).getTime();
   var t = GM_getValue('lastCheck', 0);
   if (ora - t > CHECK_INTERVAL) {
      getCurrentVersion(name, install, before);
   } else {
      if (c != '' && c > version) {
         insertAfter(install, before);
      }
   }
}

function getCurrentVersion(name, install, before) {
   GM_xmlhttpRequest({
      method: 'POST',
      url: 'http://ikariam.norsam.org/version.php',
      data: "p=" + name,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Content-type': 'application/x-www-form-urlencoded',
         'Accept': 'application/atom+xml,application/xml,text/xml',
         'Referer': 'http://' + gameServer + '/index.php',
         'Cookie': document.cookie
      },
      onload: function (responseDetails) {
         GM_setValue('currVersion', responseDetails.responseText);
         var lc = '' + (new Date()).getTime();
         GM_setValue('lastCheck', lc);
         verChecker(name, install, before);
      }
   });
}

var installDiv = document.createElement("div");
installDiv.setAttribute("id", "npInstall");
installDiv.setAttribute("class", "content");
installDiv.innerHTML = '<p>' + lang.newver + ': <a href="' + dlUrl + '">' + lang.install + '</a></p>';
installDiv.style.borderTop = '1px solid #444';

var newpos = document.getElementById("mainview");
var newdesc = getElementsByClass(newpos, "buildingDescription")[0];

verChecker('ikasubject', installDiv, newdesc.lastChild);

GM_registerMenuCommand('Subject Info', cbf);
