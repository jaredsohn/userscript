// ==UserScript==
// @name           Poruke Naslov (Srpsko-Hrvatska latinica)
// @namespace      Naslov
// @description    Dodaje naslov u vase poruke
// @version        0.3
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
//
// ---- Urađeno za Ikariam Balkan ----


//Current scripts version
var version = 0.2;

// Changelog
// 0.2 - fixed error in circs with no subject 


String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

function getIkaDomain(s) {
   var spl = s.toLowerCase().split(".");
   return (spl[1]!='ikariam' ? spl[1] : spl[spl.length-1]);
}

function getIkaServer(s) {
   return s.toLowerCase().split(".")[0];
}


var gameServer = top.location.host;

var serverId = getIkaServer(gameServer);
var domain = getIkaDomain(gameServer);



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
      parentDiv.childNodes[3].childNodes[11].innerHTML = "<select name='subjectdrop' id='msgDrop'>" 
      + "<option value='Obična' selected>Obična...</option>"
      + "<option value='Kulturna razmena'>Кulturna razmena</option>"
      + "<option value='Trgovina'>Trgovina</option>"
      + "<option value='Dolazeći/Odlazeći Napad'>Dolazeći/Odlazeći Napad</option>"
  //    + "<option value='Announcement'>Announcement</option>"
 //     + "<option value='War Announcement'>War Announcement</option>"
        + "<option value='VAŽNO OBAVEŠTENJE!!!'>VAŽNO OBAVEŠTENJE!!!</option>"
        + "<option value='UPUTSTVO'>UPUTSTVO</option>"
        + "<option value='Razmena resursa'>Razmena resursa</option>"
        + "<option value='Ćaskanje.'>Ćaskanje.</option>"
        + "<option value='Izveštaji borbe'>Izveštaji borbe</option>"
        + "<option value='Vicevi i zabava'>Vicevi i zabava</option></select><input type='text' id='msg' value='' />";
   } else {
      var newSubjectDiv = document.createElement('div');
      newSubjectDiv.setAttribute('id', 'mailSubjectMod');
      newSubjectDiv.innerHTML = "<span class = 'maillabels'>"+"<label>Naslov:</label></span><span><input type='text' id='msg' value=''/></span>";
      document.getElementById('mailRecipient').parentNode.insertBefore(newSubjectDiv,document.getElementById('mailSubject'));
      parentDiv.childNodes[1].innerHTML = '<label for="treaties">Vrsta Poruke:</label>';
   }
}

function insertSubjectinMessage(e) {

    if (document.getElementById('msgDrop')){
    var subject = document.getElementById('msgDrop').value.trim();
    var message = document.getElementById('msg').value;
    if (subject != "Custom"){
    if (message != ""){
        document.getElementById('text').value = "[" + subject + " " + message + "]\n" + document.getElementById('text').value;
    }
    else{
      document.getElementById('text').value = "[" + subject + "]\n" + document.getElementById('text').value;
    }}else{
        if (message!=""){
        document.getElementById('text').value = "[" + message + "]\n" + document.getElementById('text').value;
        }
    }
    }
    else{
    var message = document.getElementById('msg').value;
      if (message!=""){
      document.getElementById('text').value = "[" + message + "]\n" + document.getElementById('text').value;
      }
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

            var trp = elem.parentNode;
            var tr = trp.previousSibling.previousSibling;
            
        

         var ndiv = getElementsByClass(tr,"subject")[0];
         var circolare="";
         if (ndiv.innerHTML.indexOf("-")>0) circolare = "[A] ";
         
         if (res.indexOf("Trade")!=-1){
         ndiv.innerHTML="<img title=\"Trade\" src=\"skin/wonder2/multi_marble.gif\" height=\"12\" width=\"12\" /> "+res;
        // tr.setAttribute("style","background-color:#AEFF82");
         
         }
         else if (res.indexOf("CT")!=-1){
         ndiv.innerHTML="<img title=\"Cultural Treaty\" src=\"skin/museum/icon32_culturalgood.gif\" height=\"12\" width=\"12\" /> "+res;
         }
         else if (res.indexOf("Incoming")!=-1){
         ndiv.innerHTML=res;
         tr.setAttribute("style","background-color:#FF9292");
         }
         else if (res.indexOf("Announcement")!=-1){
         ndiv.innerHTML=res;
         tr.setAttribute("style","background-color:#B8DDF1");
         }
         else if (res.indexOf("Bloodsport")!=-1){
         ndiv.innerHTML=res;
         }
         else if (res.indexOf("Death Spectres")!=-1){
         ndiv.innerHTML=res;
         }
         else if (res.indexOf("Triage")!=-1){
         ndiv.innerHTML=res;
         }
         else if (res.indexOf("L.I.C.")!=-1){
         ndiv.innerHTML=res;
         }
         else if (res.indexOf("EMT")!=-1){
         ndiv.innerHTML=res;
         }
         else if (res.indexOf("Euthanasia")!=-1){
         ndiv.innerHTML=res;
         }
         else{         
         ndiv.innerHTML=circolare+res;
         }
         div.innerHTML = "<i>### "+inn.substring(1,fine)+" ###</i><br>"+inn.substring(fine+1);
      }     
   }
}


//this function check if there is new version of script available
window.checkVersion = function(){
 
  var tmp = new Date().getTime(); //Obtains time in milliseconds
 
  var tm = GM_getValue("tcv", 0); // Obtains value when last check was performed, default value is 0
 
  if(tm == 0){ //Checks if check was performed before
 
   GM_setValue("tcv", parseInt(tmp/1000)); //If check was not performed this means that user just installed latest version of script, and we therefore save time in seconds when check was performed
 
  }else{
 
if(tmp/1000 - parseInt(tm) > 90000 ){ // This part checks whether check was performed in last 25 hours. You can set your own timing by chaining value 90000 to something else. Note that this value is in seconds.
 
    GM_setValue("tcv", parseInt(tmp/1000)); //Now we save time so that it was checked for new version.
 
    //this part connects to userscripts meta site and checks values for your script
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://userscripts.org/scripts/source/67740.meta.js', //Here you will change number 51469 to number of your script
      headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/html,application/xml,text/xml',
      },
      onload: function(responseDetails) {
     
      var text = responseDetails.responseText; //We obtain contents of the site
      vs=text.split("\n"); //We split content by rows
      vers = vs[4].substring(12); // Here we obtain version of the script if by some case you have your @version tag in some other row then fifth then change number 4 to some other value that responds to your code
     
        if(version != parseFloat(vers)){ // We check if new version is out
          alert("A new version of Ikariam Subject (Osiris Mod) is out!");// This is notification to user that new version is available
          window.location = "http://userscripts.org/scripts/source/67740.user.js"; //If new version is out install new version of the script. NOTE: that you have to change number 51469 to the number of your script on userscripts.
     
          window.reload();
     
        }
     
      }
    });
     
    }
     
  }
 
}

window.checkVersion();
