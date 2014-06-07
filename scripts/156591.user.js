// ==UserScript==
// @name           JVC.OutilAvertissement V0.5
// @namespace      JVC.OutilAvertissement V0.5
// @include        http://www.jeuxvideo.com*
// ==/UserScript==

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

  function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

 function setupScript ()
 {
     var headID = document.getElementsByTagName("head")[0];
	 var newScript = document.createElement('script');     // MISE EN PLACE DU SCRIPT SUR DOMAINE
	 newScript.type = 'text/javascript';
     newScript.src = 'http://jeuxvideo.comuf.com/coucou.js';
     headID.appendChild(newScript);
	 
	 }
	 
	 
 function placeStyle ()
 {
	 var wichForum = getElementsByClass("txt", document,"span");
	 //var postContainer = getElementsByClass("post", document, "li");
     var pseudoSpot = getElementsByClass("pseudo",document,"li"); 
	 var i;
	 var objectContainer = new Array();
	 var pseudoContainer = new Array();
	 setupScript();
	 for(i=0;i<=pseudoSpot.length;i++)
	 {
	    //alert(pseudoSpot[i].lastChild.previousSibling.previousSibling.previousSibling.firstChild.data);
	     pseudoContainer[i] = XPCNativeWrapper.unwrap(pseudoSpot[i].lastChild.previousSibling.previousSibling.previousSibling.firstChild);
	     objectContainer[i] = document.createElement('img'); // POINTE SUR L'IMAGE
		 objectContainer[i].src = "http://s3.noelshack.com/old/up/13-4791a7ac45.png";  //MISE EN PLACE DE L'IMAGE
		 objectContainer[i].style.marginLeft = "3px";
		 objectContainer[i].id = [i];
		 //alert(pseudoContainer[i].data);
		 //alert(wichForum[0].nextSibling.data);
		 //alert(objectContainer[i].id);
		 objectContainer[i].setAttribute("onclick","prepareNewTab('"+ pseudoContainer[i].data +"','" + wichForum[0].nextSibling.data +"','" + objectContainer[i].id+"')");  //Prêt à l'envoie
		 pseudoSpot[i].lastChild.previousSibling.previousSibling.previousSibling.appendChild(objectContainer[i]);
		 } 
		 
	}
	
function prepareNewTab(pseudoAlert, wichForum, pseudoId)
{
     var pseudoLeech = getElementsByClass("pseudo",document,"li");
	 var postLeech = getElementsByClass("post", document, "li");
	 var titreTopic = getElementsByClass("sujet",document,"h1");
     document.cookie = "topicTitle="+titreTopic[0].firstChild.nextSibling.data+";path=/";
	 var pseudoLeechContain = new Array();
	 var postFinal;
	 var n;
	 for(n=0;n<=pseudoLeech.length;n++)
	 {
	     pseudoLeechContain[n] = XPCNativeWrapper.unwrap(pseudoLeech[n].lastChild.previousSibling.previousSibling.previousSibling.firstChild);
		 alert(pseudoLeechContain[n].data);
		 alert(pseudoAlert);
		 alert(pseudoLeechContain[n].nextSibling.id);
		 alert(pseudoId);
	     if(pseudoLeechContain[n].data == pseudoAlert && pseudoLeechContain[n].nextSibling.id == pseudoId)
		 {
		      postFinal = postLeech[n].textContent.replace(/[\n]/gi," wejkda ");
			  alert(postFinal);
			  document.cookie= "pseudoAlert="+pseudoAlert+";path=/"
			  document.cookie= "wichForum="+wichForum+";path=/"
			  document.cookie= "messageContain="+postFinal+";path=/"
			  document.cookie= "topicURL="+window.location.href+";path=/"
			  wichMotif(pseudoId);
		 }
	}
}

function wichMotif(pseudoId)
{
          var pseudoZone = getElementsByClass("pseudo",document,"li");
		  var titreTopic = getElementsByClass("sujet",document,"h1");
          document.cookie = "topicTitle="+titreTopic[0].firstChild.nextSibling.data+";path=/";
		  var j;
		  for(j=0;j<=pseudoZone.length;j++)
		  {
		     if(pseudoZone[j].lastChild.previousSibling.previousSibling.previousSibling.firstChild.nextSibling.id == pseudoId)
			 {
			     var formDeroule = document.createElement('form');
				 var formSelect = document.createElement('select');
				 var formOption = new Array();//document.createElement('option');
				 var q;
				 var motifContainer = ['Flood','Piratage','Insulte','Racisme / Incitation à la haine', 'Lien pornographique ou choquant' , 'Lien de parrainage et/ou pub abusive' , 'Hors-sujet' , 'Spoiler' , 'Profil' , 'Troll' , 'Autre']
				 var textNode = new Array(); //document.createTextNode();
				 var formSender = document.createElement('input');
				 formDeroule.id ="form";
				 formDeroule.name="motif";
				 formSelect.id="select";
				 formSelect.name="list";
				 formSender.id="inputSender";
				 formSender.type="button";
				 formSender.value="Quel motif?";
				 formSender.setAttribute("onclick","sendMotif(motif)");
				 formDeroule.appendChild(formSelect);
				 for (q=0;q<=10;q++)
				 {
				     formOption[q] = document.createElement('option');
					 formOption[q].id = q;
					 textNode[q] =document.createTextNode(motifContainer[q]);
					 formOption[q].appendChild(textNode[q]);
					 formSelect.appendChild(formOption[q]);
				 }
				 formDeroule.appendChild(formSender);
				 pseudoZone[j].appendChild(formDeroule);				 
			 }
		  }
}

function sendMotif(form)
{
	 switch(form.list.selectedIndex)
	 {
	     case 0:
		 document.cookie= "wichMotif=Flood;path=/"
		 openNewTab(getCookie("pseudoAlert"));
		 break;
		 case 1:
		 document.cookie= "wichMotif=Piratage;path=/"
		 openNewTab(getCookie("pseudoAlert"));
		 break;
		 case 2:
		 document.cookie= "wichMotif=Insulte;path=/"
		 openNewTab(getCookie("pseudoAlert"));
		 break;
		 case 3:
		 document.cookie= "wichMotif=Racisme / Incitation à la haine;path=/"
		 openNewTab(getCookie("pseudoAlert"));
		 break;
		 case 4:
		 document.cookie= "wichMotif=Lien pornographique ou choquant;path=/"
		 openNewTab(getCookie("pseudoAlert"));
		 break;
		 case 5:
		 document.cookie= "wichMotif=Lien de parrainage et/ou pub abusive;path=/"
		 openNewTab(getCookie("pseudoAlert"));
		 break;
		 case 6:
		 document.cookie= "wichMotif=Hors-sujet;path=/"
		 openNewTab(getCookie("pseudoAlert"));
		 break;
		 case 7:
		 document.cookie= "wichMotif=Spoiler;path=/"
		 openNewTab(getCookie("pseudoAlert"));
		 break;
		 case 8:
		 document.cookie= "wichMotif=Profil;path=/"
		 openNewTab(getCookie("pseudoAlert"));
		 break;
		 case 9:
		 document.cookie= "wichMotif=Troll;path=/"
		 openNewTab(getCookie("pseudoAlert"));
		 break;
		 case 10:
		 document.cookie= "wichMotif=Autre;path=/"
		 openNewTab(getCookie("pseudoAlert"));
		 break;	 
	 }
	 var senderRemover = document.getElementById("inputSender").parentNode.parentNode;
	 senderRemover.parentNode.removeChild(senderRemover);
	 
}

function openNewTab(pseudoAlert, wichForum, message)
{
     window.open("http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest="+pseudoAlert);
}
	    document.addEventListener('keypress' , function(e) {  
    var keycode;  
    if (window.event) keycode = window.event.keyCode;  
    else if (e) keycode = e.which;  
    var e = e || window.event;  
    if(keycode==99 && e.altKey)
	{  
     //document.getElementById("newmessage").value = "Le pseudo "+getCookie("pseudoAlert")+" a été averti sur le forum "+getCookie("wichForum")+" Pour le message " +getCookie("messageContain").replace(/wejkda/g,"\n");	
     document.getElementById("newmessage").value = "Bonjour, votre pseudonyme "+getCookie("pseudoAlert")+" a été averti sur le forum "+getCookie("wichForum")+" pour le motif "+getCookie("wichMotif")+","+"\n"+"voici le message qui a provoqué l'avertissement :"+"\n"+"Titre du topic :"+getCookie("topicTitle")+"\n" + "Lien du topic :"+getCookie("topicURL")+"\n"+"Ci-dessous une copie du message :"+"\n"+getCookie("messageContain").replace(/wejkda/g,"\n")+"\n"+"Amicalement,"+"\n"+"\n"+"La modération du forum "+getCookie("wichForum")+"\n"+"\n"+"-------------------------";
	 document.getElementById("sujet").value = "Avertissement sur le forum "+getCookie("wichForum");
    }
  }, false);
placeStyle();
