// ==UserScript==
// @name	         Game Ease for *Game
// @namespace		  #Allis0n J
// @description	          A friendly tool for making Game easier for you!
// @version		  0.14
// @identifier
// @date	          05/26/2009
// @creator		  Allis0n J (Allison Jennings)
// @modified date   	  17 January 2010
// @modified by		  RKho (pipeguru)
// @include		  http://flickr.com/groups/yes_or_no/discuss/*
// @include		  http://www.flickr.com/groups/yes_or_no/discuss/*
// ==/UserScript==
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------


(function () {

var GEStartTime=new Date();
var GEtoolversion="V0.14";
var GEtoolDBversion="V0.14";
var chlgsplit;

function setEnvironment()
{
a="none";
if (typeof(GM_setValue)=='function')
  {
   a="GM";
   chlgsplit=1;
  }
if (typeof(PRO_setValue)=='object') 
  {
   a="PRO";
   chlgsplit=0;
  }
return a;
}

function setPlayername()
{
if (env=="GM") return unsafeWindow.global_name;
if (env=="PRO") return window.global_name;
}


function MY_setValue(a,b)
{
if (env=="GM") return GM_setValue(a,b);
if (env=="PRO") return PRO_setValue(a,b);
}

function MY_getValue(a)
{
if (env=="GM") return GM_getValue(a);
if (env=="PRO") return PRO_getValue(a);
}

function MY_log(a)
{
if (env=="GM") return GM_log(a);
if (env=="PRO") return;
}

function myEventListener(element,a,b,c)
{
if (env=="GM") element.addEventListener(a,b,c);
if (env=="PRO") element.attachEvent('on'+a,b,c);
return element;
}


//the real code
addGEheader = function addGEheader() {

var topbar=thisdocument.getElementById("TopBar");
var tables=topbar.getElementsByTagName("table");
var trs=tables[0].getElementsByTagName("tr");
var tds=trs[0].getElementsByTagName("td");

var GEEndTime=new Date();
var GEExecutionTime=GEEndTime-GEStartTime;

tds[1].innerHTML = "GameEase " + GEtoolversion + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + tds[1].innerHTML;

//GM_log(tds[1].innerHTML);
}


function skipchallenge(name)
{

if (name.match("(CLOSED) WEEKLY CHAT")=="(CLOSED) WEEKLY CHAT") return true; 
if (name.match("(CLOSED) Weekly Chat")=="(CLOSED) Weekly Chat") return true;
if (name.match("OPEN")=="OPEN") return false;
if (name.match("VOTE")=="VOTE") return false;
if (name.match("GAME")=="GAME") return true;

return true;
}

function nonchallenge1(name)
{
if (name.match("CHAT")=="CHAT") return true;
}
function nonchallenge2(name)
{
if (name.match("Chat")=="Chat") return true;
}

GameEaseClicked = function GameEaseClicked()
{

if (MY_getValue("GE.auto")=="true") automode=true
  else automode=false;

playernumber=0;

if (automode)
  {
  automode=false;
  MY_setValue("GE.auto","false");
  automodetxt="off";
  }
  else
    {
    automode=true;
    MY_setValue("GE.auto","true");
    automodetxt="on";
    }

link=document.getElementById("GameEase");
link.innerHTML="GameEase " + automodetxt; // +" (" + playername +")" ;

return true;
}


function addchlgstatus(newchlgstatus,value)
{
// following changes can only occur in order below
// set AWARDED (before for loops)
if ((newchlgstatus=="none")&&(value=="AWARDED")) return "Excluded";
// set for photoposter (first for loop)
if ((newchlgstatus=="none")&&(value=="photoposter")) return "Player";
if ((newchlgstatus=="Excluded")&&(value=="photoposter")) return "ErrExclPlay";
// set for voter (second for loop)
if ((newchlgstatus=="none")&&(value=="voter")) return "Voted";
if ((newchlgstatus=="Excluded")&&(value=="voter")) return "Voted";
if ((newchlgstatus=="ErrExclPlay")&&(value=="voter")) return "ErrExclPlay";
if ((newchlgstatus=="Player")&&(value=="voter")) return "Player"; 
if ((newchlgstatus=="Voted")&&(value=="voter")) return "Voted"; //catch a comment and a vote from same player

}


function setchlgstatuscolor(chlgstatus)
{

if (chlgstatus=="OK") return "Green";
if (chlgstatus=="VOTE") return "Red";
if (chlgstatus=="--VOTE--") return "Red";
if (chlgstatus=="ErrExclPlay") return "Orange";
if (chlgstatus=="UPDATING") return "";
if (chlgstatus=="WEEKLY CHAT") return "Orange";
if (chlgstatus=="Weekly Chat") return "Orange";

return "";
}

function setchlgstatustitle(chlgstatus)
{
if (chlgstatus=="VOTE") return "You haven't voted in this challenge yet... Please vote.";
if (chlgstatus=="--VOTE--") return "You haven't voted in this challenge yet... Please vote.";
if (chlgstatus=="OK") return "This challenge is open to play and doesn't require voting yet.";
if (chlgstatus=="Excluded") return "You are excluded from entering this challenge, see rules for more information.";
if (chlgstatus=="Player") return "You are a player in this challenge. Good luck!";
if (chlgstatus=="Voted") return "You have voted in this challenge. Thank you.";
if (chlgstatus=="ErrExclPlay") return "You are excluded from this challenge but did enter in it. Please have your entry removed";
if (chlgstatus=="---") return "This thread is closed or contains general information.";
if (chlgstatus=="Finished") return "Voting in this thread is finished. Please wait for a mod to close the challenge.";
if (chlgstatus=="Filled") return "This challenge has 2 photos in it and is waiting to be set to vote by a mod/admin. You may vote in it already if you want.";
if (chlgstatus=="UPDATING") return "Challenge information is being updated in the background"
if (chlgstatus=="WEEKLY CHAT") return "Important Information for the group.";
if (chlgstatus=="Weekly Chat") return "Important Information for the group.";
if (chlgstatus=="INFO") return "Important Information for the group.";
if (chlgstatus=="GAME") return "Extra games to play.";

}

function fillupanchor(anchor,newchlgstatus,chlgname)
{

anchor.innerHTML=newchlgstatus;
anchor.style.textDecoration='none';


if (newchlgstatus=="CHAT") anchor.innerHTML= '[CHAT_ROOM]';

if (newchlgstatus=="Chat") anchor.innerHTML= '[CHAT_ROOM]';

if (newchlgstatus=="INFO") anchor.innerHTML= '[   INFO   ]';

if (newchlgstatus=="GAME") anchor.innerHTML= '[   GAME   ]';

if (newchlgstatus=="Filled") anchor.innerHTML=   '[  FILLED  ]';

if (newchlgstatus=="Finished") anchor.innerHTML= '[ FINISHED ]';

if (newchlgstatus=="--VOTE--") anchor.innerHTML= '[   VOTE   ]';
  
if (newchlgstatus=="VOTE") anchor.innerHTML=     '[   VOTE   ]'; 

if (newchlgstatus=="Voted") anchor.innerHTML='<img src="http://www.flickr.com/images/icon_check.png" width="20" height="17">'; 

if (newchlgstatus=="OK") anchor.innerHTML=       '[   OPEN   ]'; 

if (newchlgstatus=="ErrExclPlay") anchor.innerHTML= '[ErrExclPlay]';

if (newchlgstatus=="UPDATING") anchor.innerHTML='<img src="http://l.yimg.com/www.flickr.com/images/pulser2.gif" alt="" width="21" height="10" border="0">';

if (newchlgstatus=="Player") anchor.innerHTML=   '[  PLAYER  ]';

anchor.style.color=setchlgstatuscolor(newchlgstatus);
anchor.title=setchlgstatustitle(newchlgstatus);

//if some statusses are reached, let's display a warning on screen
/*
if (newchlgstatus=="ErrExclPlay")  //ErrExclPlay
 {
 wanchor=thisdocument.getElementById("GameEaseStatusDiv");
 wanchor.style.display='block';
 wanchor=thisdocument.getElementById("GameEaseStatus");
 wanchor.innerHTML="You entered a challenge you were excluded from (look for the '" +
                  newchlgstatus + "' status and ask a mod/admin to remove " + 
                  "this entry by leaving a message in the Hero Chatter";
 wanchor.style.color='red';
 wanchor.style.textDecorationUnderline='underline';
 wanchor.style.fontWeight='bold';
 }
 */
 if (chlgname.match("asdf")=="asdf")
 {
	//DO NOTHING
 }
 else
{ 
	if (playernumber==3)
	 {
	 wanchor=thisdocument.getElementById("GameEaseStatusDiv");
	 wanchor.style.display='block';
	 wanchor=thisdocument.getElementById("GameEaseStatus");
	 wanchor.innerHTML="You entered 3 challenges and have reached your maximum play limit!";
	 wanchor.style.color='red';
	 }
	if (playernumber>3)
	 {
	 wanchor=thisdocument.getElementById("GameEaseStatusDiv");
	 wanchor.style.display='block';
	 wanchor=thisdocument.getElementById("GameEaseStatus");
	 wanchor.innerHTML="You entered over 3 challenges and are thus breaking the rules! " + " (*GameX2 & *GameX3 excluded) " +
					  "Please remove your latest entry!";
	 wanchor.style.color='red';
	 wanchor.style.textDecorationUnderline='underline';
	 wanchor.style.fontWeight='bold';
	 }
 }
return;
}

function loadthread(thread,chlgname,chlgnum,chlgstatuscode) 
{
//alert('chlgname = ' + chlgname + ', chlgnum = ' + chlgnum + ', ' + ', chlgstatuscode = ' + chlgstatuscode)
//GM_log("GE: Started loading new thread (in background): " + thread + " , " + chlgname);
var xmlhttp = new XMLHttpRequest(); 
xmlhttp.open("GET", thread); //true for async
ifModifiedSince = new Date(0);
xmlhttp.setRequestHeader("If-Modified-Since", ifModifiedSince);

xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) 
        { 	
           content=xmlhttp.responseText.split('<div id="DiscussTopic">')[1].split('</div>')[0];
		   //alert(content);
           tables=content.split('<table');         
 
           challengetxt=tables[1].split('says:')[1].split('<small>')[0];
           tds=tables[2].split('<td class');
           var commentcounter=(tds.length-1)/2;

           
           var newchlgstatus="none";
		  // alert()
           if (chlgname.match("GameX2")=="GameX2") inbrackets=true
             else inbrackets=false;
           
           if (!inbrackets)
             {			
/*			 challengetxt=challengetxt.split("Voting begins")[1].split("<b>")[1].split("<")[0]; 
             if (challengetxt.indexOf(playername)!=-1) 
                newchlgstatus=addchlgstatus(newchlgstatus,"AWARDED");
             }
            else
               {
               if (challengetxt.indexOf(playername)!=-1) newchlgstatus=addchlgstatus(newchlgstatus,"photoposter");
               //don't add to playernumber because this is a special challenge
 */            }
          
           lastimgplace=2;
           photosposted=0;
           lastvote="";
           
           for (i=2;i<tds.length;i++) {
             txt=tds[i];
    		
			//alert(txt);
	
             if (txt.match("says")=="says") {
               txt2=txt.split("</h4>")[1].split("<small>")[0]; //check on 2nd part because of extra img title for admins

               if (txt2.match("img")=="img") {
                 // photo found, now get username
                 photosposted++;
                 photoposter=txt.split("<a href")[1].split(">")[1].split("<")[0];
                 photoposter=photoposter.replace(/&amp;/g,"&");
                 if (photoposter.indexOf(playername)!=-1)
                    { 
                    newchlgstatus=addchlgstatus(newchlgstatus,"photoposter");
                    playernumber++;
                    }
                 lastimgplace=i+1;
               }
             }
           } // end of for

           // loop again for voters starting from just behind last image
		   
		   //alert('here');		   
           
		   if (chlgname.match("VOTE")=="VOTE")
             {
             for (i=lastimgplace;i<tds.length;i++) {
               txt=tds[i];
    
               if (txt.match("says")=="says") 
                 {
                 voter=txt.split("<a href")[1].split(">")[1].split("<")[0].replace(/&amp;/g,"&");
                 if (voter.indexOf(playername)!=-1) 
                    newchlgstatus=addchlgstatus(newchlgstatus,"voter");
                 
   				      var ptag=txt.split("<p>")[1].split("<small>")[0];
  				        lastvote=ptag.split("\t")[8].split("\t")[0].replace(/&gt;/g,">");
                 }
               } // end of for
             //check for finished votes when not inbrackets
             //if (!inbrackets)
               //{
               if (((photosposted==2)&&(chlgnum=='14'))&&(lastvote.match('10')=="10"))
                 newchlgstatus="Finished";
               if (((photosposted==2)&&(chlgnum=='13'))&&(lastvote.match('10')=="10"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='01'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='02'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='03'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='04'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='05'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='06'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='07'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='08'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='09'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='10'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='11'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";
               if ((photosposted==2)&&((chlgnum=='12'))&&(lastvote.match('5')=="5"))
                 newchlgstatus="Finished";              // }
             } // end of if match vote
             
           //overwrite some base statusses if challenge is in voting.
           if ((newchlgstatus=="none")&&(photosposted==2)&&(chlgname.match("OPEN")=="OPEN")) newchlgstatus="Filled";
	   if ((newchlgstatus=="none")&&(photosposted==20)&&(chlgnum=='XXX')&&(chlgname.match("OPEN")=="OPEN")) newchlgstatus="Filled";
           if (((newchlgstatus=="none")||(newchlgstatus=="Excluded"))&&(chlgname.match("VOTE")=="VOTE")) newchlgstatus="--VOTE--";
               else if (newchlgstatus=="none") newchlgstatus="OK";
           
           //let's go and change the update status on screen
           var updanchor=thisdocument.getElementById("GE."+thread);
           
           var sdata=newchlgstatus+"-!**!-"+commentcounter+"-!**!-"+thread+"-!**!-"+chlgstatuscode;
           //GM_log(sdata);
           MY_setValue("GE."+chlgnum,sdata);
           
           fillupanchor(updanchor,newchlgstatus,chlgname);    

      }  //end of readystate
   } // end of onstatechange function
xmlhttp.send(null); 
}


ProcessMainDoc = function ProcessMainDoc() {

// select main table
var main=thisdocument.getElementById("Main");
var tables=main.getElementsByTagName("table");
var trs=tables[2].getElementsByTagName("tr");

// add new table header to the table
var tds=trs[0].getElementsByTagName("th");
tds[3].width="12%";
myanchor=thisdocument.createElement('th');
myanchor.innerHTML="GE-status";
myanchor.width="8%";
myanchor.style.textAlign='center';
trs[0].appendChild(myanchor);

// let's loop the table and start processing
var i=0;
for (i=1;i<trs.length;i++) {

  chlgstatus="UPDATING";
  insertstatus=true;
  loadneeded=false;
  
  tds=trs[i].getElementsByTagName("td");
  
  if (statusposition==0) statusposition=tds.length;
  
  var anchor=tds[0].getElementsByTagName("a")[0];
  var thread=anchor.href;
  var chlgname=anchor.innerHTML;
  
  if (skipchallenge(chlgname)) chlgstatus="---";
  if (nonchallenge1(chlgname))  chlgstatus="CHAT";
  if (nonchallenge2(chlgname))  chlgstatus="Chat";

  
  mncommentcounter=tds[2].innerHTML;

  // add statusses
  myanchor=thisdocument.createElement('a');
  myanchor.id="GE."+thread;
  myanchor.href=thread;
  
  if (chlgstatus=="UPDATING") 
    {
		
     var chlgnum=chlgname.split(/<b>/i)[chlgsplit].split(" ")[0];
     var chlgstatuscode=chlgname.split(" ")[2];
     lfullstatus=MY_getValue('GE.'+chlgnum);
	 
	   if (MY_getValue('GE.'+chlgnum)==undefined) loadneeded=true;
	     else 
	     {
	      var ldata=lfullstatus.split("-!**!-");
	      counter=ldata[1];
	      lthread=ldata[2];
	      lstatus=ldata[3];
	      if ((counter==mncommentcounter)&&(lthread==thread)&&(lstatus==chlgstatuscode)) chlgstatus=ldata[0];
	        else loadneeded=true;
	     }   
		 
     if (loadneeded||forcereload) 
       {
       if (forcereload) MY_log('forcereload of: ' + chlgnum);
       loadthread(thread,chlgname,chlgnum,chlgstatuscode);
       }
    }
  
  if (chlgstatus=="Player"&&!forcereload) playernumber++; //when forcereload number gets added in loadthread
  
  fillupanchor(myanchor,chlgstatus,chlgname);
  
  mylink=trs[i].insertCell(statusposition);
  mylink.style.textAlign='center';
  mysmall=thisdocument.createElement('small');
  mysmall.appendChild(myanchor);
  mylink.appendChild(mysmall);
  
}

//GM_log("End of processing main discuss page");

return;

}

// *******************
// Start of processing
// *******************

if (window.name=='Log page') return; //don't process log page

var env;
env=setEnvironment();

if (env=="none") 
  {
  alert('GameEase tool is only supported under Greasemonkey or IE7PRO');
  return
  }
  
//alert('start');

var thislocation=location;
var thisdocument=document;
var playername=setPlayername();
var automodetxt="off";
var playernumber=0;
var statusposition=0;
var forcereload=false;

//playername="smwarnke4";
//alert(playername);

// check if we have GM variables
if (MY_getValue("GE.auto")==undefined) MY_setValue("GE.auto","true");
if (MY_getValue("GE.lastloadtime")==undefined) MY_setValue("GE.lastloadtime",GEStartTime.getTime().toString());


if (MY_getValue("GE.auto")=="true") automode=true
  else automode=false;
if (automode) automodetxt="on";


lastloadtime=MY_getValue("GE.lastloadtime");
elapstime=GEStartTime.getTime()-lastloadtime;
if (elapstime > 1000*60*3) //more then 3 minutes force reload 
  {
  forcereload=true;
  MY_setValue("GE.lastloadtime",GEStartTime.getTime().toString());
  }  
  

//add auto on/off link
var Docmain=thisdocument.getElementById("Main");
var Doctables=Docmain.getElementsByTagName("table");
var Doctrs=Doctables[0].getElementsByTagName("tr");
var Doctds=Doctrs[0].getElementsByTagName("td");
var Docp=Doctds[1].getElementsByTagName("p");

myanchor=thisdocument.createElement('img');
myanchor.setAttribute('src','http://l.yimg.com/www.flickr.com/images/subnavi_dots.gif');
myanchor.setAttribute('alt','');
myanchor.setAttribute('height','11');
myanchor.setAttribute('width','1');
Docp[0].appendChild(myanchor);

myanchor=thisdocument.createElement('a');
myanchor.innerHTML="GameEase "+ automodetxt; // +" (" + playername +")" ;
myanchor.href=location;
myanchor.id="GameEase";
myEventListener(myanchor,'click',GameEaseClicked,false);
Docp[0].appendChild(myanchor);

mydiv=thisdocument.createElement('div');
mydiv.style.display='none';
mydiv.id="GameEaseStatusDiv";
Doctds[1].appendChild(mydiv);

myanchor=thisdocument.createElement('p');
myanchor.id="GameEaseStatus";
myanchor.innerHTML="GameEase statusfield";
myanchor.setAttribute('style','text-decoration: none; color: Red');
mydiv.appendChild(myanchor);


// check themelist & chlgheaders

if (thisdocument.title.match("discussion topics")=="discussion topics") {

  // ************************
  // main *Game page
  // ************************
  //alert("in main");
  
  if (automode) ProcessMainDoc();

}

addGEheader();

return;

// *******************
//  End of processing
// *******************

})();

