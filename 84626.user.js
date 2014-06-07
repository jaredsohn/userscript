// ==UserScript==
// @name           GMX - look for new Emails
// @namespace      gotU
// @description    Überprüft nach jeder Minute die Anzahl ungelesener Emails und zeigt diese im Fenstertitel an. Dazu wird die Startseite "Mein GMX" nach jeder vergangenen Minute automatisch neugeladen, falls man sich auf ihr befindet. Die verbleibende Anzahl an Sekunden wird dabei in einem kleinen Kästchen angezeigt.
// @include        http://service.gmx.net/de/*
// @include        https://service.gmx.net/de/*
// @version        2011-03-25
// ==/UserScript==


startCountingFrom= 60;

reloadIframeInsteadOfWindow= true;

zentriert=false;				//Manuelle Angabe, ob die Seite durch ein Stylesheet zentriert wird. z.B. über http://userstyles.org/styles/17520 und dem Firefox Add-on Stylish


timer= null;
c=startCountingFrom;


main();


function addEvent(elem, type, eventHandle) {
    if (elem == null || elem == undefined) return;
    if ( elem.addEventListener ) {
        elem.addEventListener( type, eventHandle, false );
    } else if ( elem.attachEvent ) {
        elem.attachEvent( "on" + type, eventHandle );
    }
}

function moveCounterlabel() {
 if(window.innerWidth<800)
   return;
 if (document.getElementById("timerdisplay")) {
  var tidi = document.getElementById("timerdisplay");
  tidi.style.marginLeft = (230+window.innerWidth/2)+"px";
  //tidi.style.marginTop = "352px";
 }
}


/*Counter einblenden*/
function addCounterlabel(isFreeAccount2){
 if (document.getElementById("timerdisplay")) {
  //alert("timerdisplay schon da");
 }else{
  var newP = document.createElement("div");
  newP.style.position = "absolute";
  newP.style.width = "100px";
  newP.style.height = "18px";
  newP.style.textAlign = "center";
  //newP.style.zIndex = "0";
  newP.style.backgroundColor = "rgb(240,250,250)";
  newP.setAttribute("id","timerdisplay");
    
//wenn Seite linksbündig: Anzeige unten
  //newP.style.marginLeft = "410px";
  //newP.style.marginTop = "582px";
  
  
//Anzeige rechts

  if(isFreeAccount2)
   newP.style.marginTop = "140px";
  else
   newP.style.marginTop = "340px";
  
  if(zentriert==true){
    newP.style.marginLeft = (230+window.innerWidth/2)+"px";
  
    addEvent(window, "resize", moveCounterlabel );
  }
  else{
    newP.style.marginLeft = (630)+"px";    
  }

  var txt = 'Neuladen in: '+startCountingFrom;
  var newT = document.createTextNode(txt);
  newP.appendChild(newT);
  if (!document.getElementById("timerdisplay")){
   document.getElementsByTagName('html')[0].appendChild(newP);
   //alert("timerdisplay appended");
   //alert(parent.frames[0].location);
  }
 }
}



function changeCounterlabelColor(CounterlabelColor,inframe){
	var DocToUse = getDocumentToIframe(inframe);
	if(CounterlabelColor=="green")
		//document.getElementById("timerdisplay").style.backgroundColor = "rgb(240,250,250)";
		DocToUse.getElementById("timerdisplay").style.backgroundColor = "rgb(240,250,250)";
	else if(CounterlabelColor=="red")
		//document.getElementById("timerdisplay").style.backgroundColor = "#FFCCCC";
		DocToUse.getElementById("timerdisplay").style.backgroundColor = "#FFCCCC";
}




function checkBox(inframe){
	//alert(inframe.location);
	if(GM_getValue("onStartpage")==true)
	{
		if(timer==null)
		{
			timer = window.setInterval( decreaseCounter, 1000, inframe);
		}		
	}
	else
	{
	alert("not on startpage");		
		if(timer!=null)
		{
			window.clearInterval(timer);
		}
	}
}


/*
Counter runterzäheln
bei 0 die (Haupt-)Seite neuladen
*/

function decreaseCounter(inframe){

//alert(parent.frames[0].location);
//alert(document.location);
//alert(inframe.location);


//var f = getDocumentToIframe(inframe);
//alert(getDocumentToIframe(inframe).URL);


//alert(c);
 c--;
 //document.getElementById('timerdisplay').innerHTML="Hauptseite laden in: "+c;
getDocumentToIframe(inframe).getElementById('timerdisplay').innerHTML="Neuladen in: "+c;

 if(c==10)
    changeCounterlabelColor("red",inframe);

 //Abbruchbedingung bei 0 => Seite neuladen
 if(c<=0){
  //reset values. if just iframe is reloaded the values are not reset automatically
  c=startCountingFrom;
  changeCounterlabelColor("green",inframe);
  refresh(inframe);
  //alertFrameLocation();
  return;
 }



}


function alertFrameLocation(){
 alert(parent.frames[0].location);
}


function refresh(inframe){
 if(reloadIframeInsteadOfWindow){
  getDocumentToIframe(inframe).location.reload(); 	//just the chosen iframe
  //getDocumentToIframe(inframe).location=  getDocumentToIframe(inframe).location;
  //parent.frames[0].location=parent.frames[0].location;
  //parent.frames[0].location.reload();
 } else{
  window.location=window.location;			//entire window
 }
}


function getDocumentToIframe(iframe_object){
	//alert(iframe_object.location);
	if(iframe_object.contentDocument){
    		return iframe_object.contentDocument;
	}
	else if(iframe_object.contentWindow){
		return iframe_object.contentWindow.document;
	}else{
		return iframe_object.document;
	}
//use document.body.innerHTML;
}



function checkForUnreadEmails(inframe){
		//alert("checking for emails");
		var v22= getDocumentToIframe(inframe).body.getElementsByTagName('a');
		//var v22= iframemailvar.getElementsByTagName('a');
		//alert(v22.length);
		//var v22i;
		var numberOfEmails = 0;
		for (var v22i = 0; v22i < v22.length; v22i++)
		{
			if(v22[v22i].innerHTML.indexOf("ungelesene E-Mail") >= 0)	//found some
			{
				numberOfEmails+= parseInt( v22[v22i].getElementsByTagName("strong")[0].innerHTML );
				//alert(v22i);
			}
			else if(v22[v22i].innerHTML.indexOf("im Ordner Spamverdacht") >= 0)	//found some
			{
				if(v22[v22i].innerHTML.indexOf("keine") < 0)
				{
					numberOfEmails+= parseInt( v22[v22i].getElementsByTagName("strong")[0].innerHTML );
					//alert(v22i);
				}
			}
		}
		//alert("debug");
		if(numberOfEmails>0){
			//getDocumentToIframe(inframe).title="GMX: "+ v22[v22i].getElementsByTagName("strong")[0].innerHTML + " new Emails";
			var text= "GMX: "+ numberOfEmails + " ungelesene Email"
			if(numberOfEmails>1)	text+="s";
			top.document.title=text;
		}
		else{
			//alert("0 found");
			//getDocumentToIframe(inframe).title="GMX: "+ v22[v22i].getElementsByTagName("strong")[0].innerHTML + " new Emails";
			top.document.title="GMX: keine ungelesenen Emails";		
		}
}



function main(){

	if(document.location.href.indexOf("service.gmx.net/de/cgi/filestore")>=0){
		return;
	}
	else if(document.location.href.indexOf("service.gmx.net/de/cgi/g.fcgi/startpage?sid=")>=0 )
	{
		//alert("startpage");
		GM_setValue("onStartpage",true);
		
		var isFreeAccount= (getDocumentToIframe(parent.frames[0]).body.innerHTML.indexOf("1,0 GB") >= 0);
		addCounterlabel(isFreeAccount);
		checkBox(parent.frames[0]);

		checkForUnreadEmails(parent.frames[0]);
	}
	else if(document.location.href.indexOf("service.gmx.net/de/cgi/g.fcgi/startpage?cc=subnavi_startpage")>=0 )
	{
		//alert("startpage");
		GM_setValue("onStartpage",true);

		var isFreeAccount= (getDocumentToIframe(parent.frames[0]).body.innerHTML.indexOf("1,0 GB") >= 0);
		addCounterlabel(isFreeAccount);
		checkBox(parent.frames[0]);

		checkForUnreadEmails(parent.frames[0]);
	}
	else if(document.location.href.indexOf("service.gmx.net/de/cgi/g.fcgi/startpage?site=greetings")>=0 )
	{
		//alert("greetings");
		//alert(parent.frames[0].location);
		//alert(document.location);
		

		GM_setValue("onStartpage",true);

		var isFreeAccount= (getDocumentToIframe(parent.frames[0]).body.innerHTML.indexOf("1,0 GB") >= 0);
		addCounterlabel(isFreeAccount);

		checkBox(parent.frames[0]);


		checkForUnreadEmails(parent.frames[0]);
	}
	else if(document.location.href.indexOf("service.gmx.net/de/cgi/g.fcgi/application/navigator")>=0){
		//alert("navigator");
		//addCounterlabel();

		//checkForUnreadEmails();
		//GM_setValue("onStartpage",false);
	}
	else if(document.location.href.indexOf("service.gmx.net/de/cgi/g.fcgi/mail/index?cc=startpage_email_posteingang&FOLDER=inbox")>=0){
		GM_setValue("onStartpage",false);
	}
	else if(document.location.href.indexOf("service.gmx.net/de/cgi/g.fcgi/mail/print?")>=0){
		//alert("lese mail");
		GM_setValue("onStartpage",false);
	}
	else{
		//alert("else page: " + document.location);
		//GM_setValue("onStartpage",false);
	}


}







//http://service.gmx.net/de/cgi/g.fcgi/startpage?

//http://service.gmx.net/de/cgi/g.fcgi/application/navigator?CUSTOMERNO=6&t=de46.0.db4c8

//http://service.gmx.net/de/cgi/g.fcgi/startpage?site=greetings&CUSTOMERNO=6&t=d.0.d&lALIAS=&lDOMAIN=&lLASTLOGIN=2010%2D09%2D10+11%3A12%3A24

//https://service.gmx.net/de/cgi/g.fcgi/startpage?sid=g.1.0.4t.1.e8

//http://service.gmx.net/de/cgi/g.fcgi/startpage?cc=subnavi_startpage&sid=abh.12881.1.js1.7.m

//http://service.gmx.net/de/cgi/g.fcgi/mail/index?cc=startpage_email_posteingang&FOLDER=inbox

//http://service.gmx.net/de/cgi/g.fcgi/mail/index?sid=34&FOLDER=fol.anmeldungen

//http://service.gmx.net/de/cgi/g.fcgi/mail/print?folder=inbox&uid=Nzz&CUSTOMERNO=9&t=de68

//http://service.gmx.net/de/cgi/g.fcgi/mail/reply?

//http://service.gmx.net/de/cgi/filestore?


/*
Mind the commmon pitfalls in Greasemonkey
http://wiki.greasespot.net/Avoid_Common_Pitfalls_in_Greasemonkey
*/




/*
======================
functions for debugging purposes
======================
*/

function locationtest(){
	//alert("top: " + top.location);
	//alert("win: " + window.location);
	//alert("doc: " + document.location);




	//wie es aussieht sind location und document.location verboten!!!
	// zz §§ aa und () sind ok, also ohne href
	//allerdings: href ist erlaubt, aber .pathname ist darauf nicht definiert
	//wtf???




/*
	alert("z"+ location + "z");
	alert("§"+ top.location.pathname + "§");
	alert("a"+ window.location.pathname + "a");
	alert("("+ document.location + ")");
*/
/*
	alert("$"+ location.href.pathname + "$");
	alert("_"+ top.location.href.pathname + "_");
	alert("!"+ window.location.href.pathname + "!");
	alert("&"+ document.location.href.pathname + "&");
*/



	//alert("§"+ top.location.pathname + "§");
	//alert("a"+ window.location.pathname + "a");






/*
	alert("z"+ location.indexOf("n") + "z");
	alert("§"+ top.location.pathname.indexOf("n") + "§");
	alert("a"+ window.location.pathname.indexOf("n") + "a");
	alert("("+ document.location.indexOf("n") + ")");
*/


	//alert(location.pathname);


	//alert(location.href.pathname);
	//alert(location.pathname.indexOf("cgi");
	//alert(typeof location.pathname);

	//alert(location.pathname.indexOf("cgi");
	//alert(location.href.pathname);




	//alert("_"+dec.toString(s)+"_");
	//alert(s.indexOf("navi");
}


