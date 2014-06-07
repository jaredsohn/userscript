// ==UserScript==
// @name	         Foto Competition Check Play
// @namespace		http://www.flickr.com/groups/fotocompetition/discuss/
// @description	A tool to help players in the Flickr Foto Competition
// @version		   0.26_fc
// @date				
// @date		        01.June.2008
// @creator		     KVangeel (Kris Vangeel) Author of Check Play 
// @modified date   28 March 2009
// @modified by		Wayne Child/Austrian Alex (Modified for Pick Your Poison)
// @modified date   12.June.2009
// @modified by	  Andrew Dunn (Modified for Challenge You)
// @modified date	  30.August.2009
// @modified by	  Richard Hamilton (www.itslife.ca) (Modified for Foto Competition)
// @include		  http://www.flickr.com/groups/fotocompetition/discuss/*
// @include		  http://www.flickr.com/groups/fotocompetition/discuss
// @include		  http://flickr.com/groups/fotocompetition/discuss/*
// @include		  http://flickr.com/groups/fotocompetition/discuss

// ==/UserScript==

(function () {

var CPStartTime=new Date();
var CPtoolversion="V0.26_fc";
var CPtoolDBversion="V0.26_fc";
var chlgsplit;

function setEnvironment()
{
a="none";
if (typeof(GM_setValue)=='function') 
  {
   a="GM";  // GreaseMonkey under Firefox
   chlgsplit=1;
  }
if (typeof(PRO_setValue)=='object') 
  {
   a="PRO";  // IE7Pro under MS Internet Explorer
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
addCPheader = function addCPheader() {

var topbar=thisdocument.getElementById("TopBar");
var tables=topbar.getElementsByTagName("table");
var trs=tables[0].getElementsByTagName("tr");
var tds=trs[0].getElementsByTagName("td");

var CPEndTime=new Date();
var CPExecutionTime=CPEndTime-CPStartTime;

tds[1].innerHTML = "CheckPlay " + CPtoolversion + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + tds[1].innerHTML;

//GM_log(tds[1].innerHTML);
}


function skipchallenge(name)
	{

	if (name.match("CLOSED","i")=="CLOSED") return true;
    if (name.match("VOID","i")=="VOID") return true;
    if (name.match("^WINNER","i")=="WINNER") return true;
	if (name.match("UNANIMOUS WINNER","i")=="UNANIMOUS WINNER") return true; 
	if (name.match("ON HOLD","i")=="ON HOLD") return false;
	if (name.match("OPEN","i")=="OPEN") return false;
	if (name.match("VOTING","i")=="VOTING") return false;
	if (name.match("GOLD","i")=="GOLD") return true;
	if (name.match("QUALIFYING","i")=="QUALIFYING") return true;
	if (name.match("PLATINUM","i")=="PLATINUM") return true;
	if (name.match(/\sS\s/)) return true;
return true;
	}

function nonchallenge(name)
	{
   if (name.match("The Chatting Post")=="The Chatting Post") return true;
	}

function meet(name)	
	{
	if (name.match("MEET","i")=="Meet") return true; 
	}

function mustread(name)	
	{
	if (name.match("VOTING IS COMPULSORY")=="VOTING IS COMPULSORY") return true; 
	}

CheckPlayClicked = function CheckPlayClicked()
{

if (MY_getValue("CP.auto")=="true") automode=true
  else automode=false;

playernumber=0;

if (automode) 
  {
  automode=false;
  MY_setValue("CP.auto","false");
  automodetxt="off";
  }
  else
    {
    automode=true;
    MY_setValue("CP.auto","true");
    automodetxt="on";
    }

link=document.getElementById("CheckPlay");
link.innerHTML="CheckPlay " + automodetxt; // +" (" + playername +")" ;

return true;
}

function addchlgstatus(newchlgstatus,value)
{
// following changes can only occur in order below
// set winner (before for loops)
if ((newchlgstatus=="none")&&(value=="winner")) return "EXCLUDED";
// set for photoposter (first for loop)
if ((newchlgstatus=="none")&&(value=="photoposter")) return "PLAYER";
if ((newchlgstatus=="EXCLUDED")&&(value=="photoposter")) return "ERREXCLPLAY";
// set for voter (second for loop)
if ((newchlgstatus=="none")&&(value=="voter")) return "VOTED";
if ((newchlgstatus=="EXCLUDED")&&(value=="voter")) return "VOTED";
if ((newchlgstatus=="ERREXCLPLAY")&&(value=="voter")) return "ERREXCLPLAY";
if ((newchlgstatus=="PLAYER")&&(value=="voter")) return "VOTED"; 
if ((newchlgstatus=="VOTED")&&(value=="voter")) return "VOTED"; //catch a comment and a vote from same PLAYER;

}

function setchlgstatuscolor(chlgstatus)
{
	if (chlgstatus=="VOTING") return "Red";
	if (chlgstatus=="ERREXCLPLAY") return "Red";
	if (chlgstatus=="UPDATING") return "";
	if (chlgstatus=="OPEN") return "Green";
	if (chlgstatus=="FINISHED") return "Black";
	if (chlgstatus=="CHAT") return "Purple";
	if (chlgstatus=="MUST READ") return "Black";
	if (chlgstatus=="PLAYER") return "Navy";

return "";
}

function setchlgstatustitle(chlgstatus)
{
	if (chlgstatus=="VOTING") return "You haven't voted in this challenge yet... Please vote.";
	if (chlgstatus=="OPEN") return "This challenge is open to play and doesn't require voting yet.";
	if (chlgstatus=="EXCLUDED") return "You are excluded from entering this challenge, see rules for more information.";
	if (chlgstatus=="PLAYER") return "You are a player in this challenge. Good luck!";
	if (chlgstatus=="VOTED") return "You have voted in this challenge. Thank you.";
	if (chlgstatus=="ERREXCLPLAY") return "You are excluded from this challenge but did enter in it. Please have your entry removed";
	if (chlgstatus=="---") return "This thread is closed or contains general information.";
	if (chlgstatus=="FINISHED") return "Voting in this thread is finished. Please wait for a moderator or administrator to close the challenge.";
	if (chlgstatus=="FILLED") return "This challenge has 4 photos in it and is waiting to be set VOTING by a moderator or administrator. You may vote in it already if you want.";
	if (chlgstatus=="UPDATING") return "Challenge information is being updated in the background";
	if (chlgstatus=="CHAT") return "This is the Chatting Post thread. Drop by to say hello, or let the admins or mods know of a problem in a challenge.";
	if (chlgstatus=="MUST READ") return "Please read this discussion prior to playing.";
	if (chlgstatus=="MEET") return "Please come on in and meet the newest Gold Medalist.";
}

function fillupanchor(anchor,newchlgstatus,chlgname)
{

anchor.innerHTML=newchlgstatus;
anchor.style.textDecoration='none';

	if (newchlgstatus=="CHAT") anchor.innerHTML='CHAT';
	if (newchlgstatus=="MUST READ") anchor.innerHTML='MUST READ';
   if (newchlgstatus=="MEET") anchor.innerHTML='MEET';
   if (newchlgstatus=="winner") anchor.innerHTML='WINNER';
	if (newchlgstatus=="FILLED") anchor.innerHTML='FILLED';
	if (newchlgstatus=="FINISHED") anchor.innerHTML='FINISHED';
	if (newchlgstatus=="VOTING") anchor.innerHTML='VOTING';  
	if (newchlgstatus=="VOTED") anchor.innerHTML='VOTED'; 
	if (newchlgstatus=="OPEN") anchor.innerHTML='OPEN'; 
	if (newchlgstatus=="ERREXCLPLAY") anchor.innerHTML='EXCLUDED FROM PLAY'; 
	if (newchlgstatus=="UPDATING") anchor.innerHTML='UPDATING';
	if (newchlgstatus=="PLAYER") anchor.innerHTML='PLAYER';

anchor.style.color=setchlgstatuscolor(newchlgstatus);
anchor.title=setchlgstatustitle(newchlgstatus);
//if some statusses are reached, let's display a warning on screen
/*
if (newchlgstatus=="ERREXCLPLAY")  //ERREXCLPLAY
 {
 wanchor=thisdocument.getElementById("CheckPlayStatusDiv");
 wanchor.style.display='block';
 wanchor=thisdocument.getElementById("CheckPlayStatus");
 wanchor.innerHTML="You entered a challenge you were excluded from (look for the '" +
                  newchlgstatus + "' status and ask a mod/admin to remove " + 
                  "this entry by leaving a message in the Chat";
 wanchor.style.color='red';
 wanchor.style.textDecorationUnderline='underline';
 wanchor.style.fontWeight='bold';
 }
 */
 if (chlgname.match("VOID")=="VOID")
 {
	//DO NOTHING
 }
 else
{ 
	if (playernumber==2000)  // High number as Group currently does not set the maximum play limit
	 {
	 wanchor=thisdocument.getElementById("CheckPlayStatusDiv");
	 wanchor.style.display='block';
	 wanchor=thisdocument.getElementById("CheckPlayStatus");
	 wanchor.innerHTML="You entered 2000 challenges thus reaching your maximum play limit!";
	 wanchor.style.color='red';
	 }
	if (playernumber>2000)
	 {
	 wanchor=thisdocument.getElementById("CheckPlayStatusDiv");
	 wanchor.style.display='block';
	 wanchor=thisdocument.getElementById("CheckPlayStatus");
	 wanchor.innerHTML="You entered over 2000 challenges and are thus breaking the rules! " + 
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
//GM_log("CP: Started loading new thread (in background): " + thread + " , " + chlgname);
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
       /*  Not current required
           if (chlgname.match("MC")=="MC") MC=true
             else MC=false;
           
           if (!MC) 
             {			
			 challengetxt=challengetxt.split("Voting begins")[1].split("<b>")[1].split("<")[0]; 
             if (challengetxt.indexOf(playername)!=-1) 
                newchlgstatus=addchlgstatus(newchlgstatus,"winner");
             }
            else
               {
               if (challengetxt.indexOf(playername)!=-1) newchlgstatus=addchlgstatus(newchlgstatus,"photoposter");
               //don't add to playernumber because this is a special challenge
             }
 */         
           lastimgplace= 2;
           photosposted= 0;
           lastvote="";
  
			// var votes = collectVotes( tds );
			    
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
         
           
		   if (chlgname.match("VOTING")== "VOTING" )
             {
             for (i=lastimgplace; i <tds.length;i++) {
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
             //check for finished votes when not MC
             //if (!MC)
               //{
 if ((chlgname.match("QUALIFYING")=="QUALIFYING")  || (chlgname.match("PLATINUM")=="PLATINUM"))
 {
	//Don't calculate Finished for Gold Qualifying and Gold Match
 } 

 else
  {          

               if ((photosposted==4)&&(chlgname.match(" S ") !=" S ")&&(chlgname.match("GOLD") !="GOLD")&&((chlgnum !='40'))&&(lastvote.match('5') >="5")) 
                 newchlgstatus="FINISHED";
              if ((photosposted==4)&&(chlgname.match(" S "))&&(lastvote.match('10') >="10")) 
			  newchlgstatus="FINISHED";
			  if ((photosposted==4)&&(chlgname.match("GOLD"))&&(lastvote.match('15') >="15")) 
                 newchlgstatus="FINISHED";
              
			  // }
  } // end of calculate voting else
  
} // end of if match vote

           
           //overwrite some base statusses if challenge is in voting.
           
           if ((newchlgstatus=="none")&&(photosposted==4)&&(chlgname.match("OPEN")=="OPEN")) newchlgstatus="FILLED";

           if (((newchlgstatus=="none")||(newchlgstatus=="EXCLUDED"))&&(chlgname.match("VOTING")=="VOTING")) newchlgstatus="VOTING";
               else if (newchlgstatus=="none") newchlgstatus="OPEN";
           
           //let's go and change the update status on screen
           var updanchor=thisdocument.getElementById("CP."+thread);
           
           var sdata=newchlgstatus+"-!**!-"+commentcounter+"-!**!-"+thread+"-!**!-"+chlgstatuscode;
           //GM_log(sdata);
           MY_setValue("CP."+chlgnum,sdata);
           
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
myanchor.innerHTML="CP-status";
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
  if (nonchallenge(chlgname))  chlgstatus="CHAT";
  if (meet(chlgname))  chlgstatus="MEET";
  if (mustread(chlgname))	 chlgstatus="MUST READ";
  
  mncommentcounter=tds[2].innerHTML;

  // add statusses
  myanchor=thisdocument.createElement('a');
  myanchor.id="CP."+thread;
  myanchor.href=thread;
  
  if (chlgstatus=="UPDATING") 
    {
		
     var chlgnum=chlgname.split(/<b>/i)[chlgsplit].split(" ")[0];
     var chlgstatuscode=chlgname.split(" ")[2];
     lfullstatus=MY_getValue('CP.'+chlgnum);
	 
	   if (MY_getValue('CP.'+chlgnum)==undefined) loadneeded=true;
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
  
  if (chlgstatus=="PLAYER"&&!forcereload) playernumber++; //when forcereload number gets added in loadthread
  
  fillupanchor(myanchor,chlgstatus,chlgname);
  
  mylink=trs[i].insertCell(statusposition);
  mylink.style.textAlign='center';
  mysmall=thisdocument.createElement('small');
  mysmall.appendChild(myanchor);
  mylink.appendChild(mysmall);
  
}


return;

} // end of ProcessMainDoc



// *******************
// Start of processing
// *******************

if (window.name=='Log page') return; //don't process log page

var env;
env=setEnvironment();

if (env=="none") 
  {
  alert('This Check Play tool is only supported under Greasemonkey or IE7PRO');
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

//playername="ItsLife";
//alert(playername);

// check if we have GM variables
if (MY_getValue("CP.auto")==undefined) MY_setValue("CP.auto","true");
if (MY_getValue("CP.lastloadtime")==undefined) MY_setValue("CP.lastloadtime",CPStartTime.getTime().toString());


if (MY_getValue("CP.auto")=="true") automode=true
  else automode=false;
if (automode) automodetxt="on";


lastloadtime=MY_getValue("CP.lastloadtime");
elapstime=CPStartTime.getTime()-lastloadtime;
if (elapstime > 1000*60*3) //more then 3 minutes force reload 
  {
  forcereload=true;
  MY_setValue("CP.lastloadtime",CPStartTime.getTime().toString());
  }  
   
//add auto on/off link
var Docmain=thisdocument.getElementById("Main");
var Doctables=Docmain.getElementsByTagName("table");
var Doctrs=Doctables[0].getElementsByTagName("tr");
var Doctds=Doctrs[0].getElementsByTagName("td");
var Docp=Doctds[1].getElementsByTagName("p");

myanchor=thisdocument.createElement('img');
myanchor.setAttribute('src','');
myanchor.setAttribute('alt','');
myanchor.setAttribute('height','11');
myanchor.setAttribute('width','1');
Docp[0].appendChild(myanchor);

myanchor=thisdocument.createElement('a');
myanchor.innerHTML=" FCCheckPlay "+ automodetxt; //20090722 + " "; //  + " (" + playername +")"
myanchor.href=location;
myanchor.id="CheckPlay";
myEventListener(myanchor,'click',CheckPlayClicked,false);  
Docp[0].appendChild(myanchor);

mydiv=thisdocument.createElement('div');
mydiv.style.display='none';
mydiv.id="CheckPlayStatusDiv";
Doctds[1].appendChild(mydiv);

myanchor=thisdocument.createElement('p');
myanchor.id="CheckPlayStatus";
myanchor.innerHTML="CheckPlay statusfield";
myanchor.setAttribute('style','text-decoration: none; color: Red');
mydiv.appendChild(myanchor);

if (thisdocument.title.match("discussion topics")=="discussion topics") {

  // ***************************
  // main Foto Competition page
  // ***************************
  //alert("in main");
  
  if (automode) ProcessMainDoc();
}

addCPheader();

return;

// *******************
//  End of processing
// *******************


})();

// JavaScript Document// JavaScript Document  
