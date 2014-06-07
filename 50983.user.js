// ==UserScript==
// @name	         		Game ChecPlay 
// @namespace		  http://www.flickr.com/groups/yes_or_no/discuss/
// @description	      	 A friendly tool for making GG easier for you!
// @version		  0.11.3
// @identifier		
// @date	          	06/06/2009
// @creator		  hervcha
// @include		  http://www.flickr.com/groups/yes_or_no/discuss/
// @include		 http://flickr.com/groups/yes_or_no/discuss/
// ==/UserScript==

(function CheckPlay() {

var CPStartTime = new Date();
var CPtoolversion ="V0.1";
var CPtoolDBversion = "V0.1";
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

if (name.match("(CLOSED) CHAT THREAD")=="(CLOSED) CHAT THREAD") return true; 
if (name.match("OPEN")=="OPEN") return false;
if (name.match("VOTE")=="VOTE") return false;
if (name.match("GAME")=="GAME") return true; 

return true;
}

function nonchallenge(name)
{
if (name.match("CHAT THREAD")=="CHAT THREAD") return true; 

}


ChecPlayClicked = function ChecPlay Clicked()
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
if ((newchlgstatus=="none")&&(value=="winner")) return "Excluded";
// set for photoposter (first for loop)
if ((newchlgstatus=="none")&&(value=="photoposter")) return "Player";
if ((newchlgstatus=="Excluded")&&(value=="photoposter")) return "ErrExclPlay";
// set for voter (second for loop)
if ((newchlgstatus=="none")&&(value=="voter")) return "Voted";
if ((newchlgstatus=="Excluded")&&(value=="voter")) return "Voted";
if ((newchlgstatus=="ErrExclPlay")&&(value=="voter")) return "ErrExclPlay";
if ((newchlgstatus=="Player")&&(value=="voter")) return "Voted"; 
if ((newchlgstatus=="Voted")&&(value=="voter")) return "Voted"; //catch a comment and a vote from same player;

}


function setchlgstatuscolor(chlgstatus)
{

if (chlgstatus=="VOTE") return "Orange";
if (chlgstatus=="ErrExclPlay") return "Red";
if (chlgstatus=="UPDATING") return "";

return "";
}

function setchlgstatustitle(chlgstatus)
{

if (chlgstatus=="VOTE") return "You haven't voted in this challenge yet... Please vote.";
if (chlgstatus=="OPEN") return "This challenge is open to play and doesn't require voting yet.";
if (chlgstatus=="Excluded") return "You are excluded from entering this challenge, see rules for more information.";
if (chlgstatus=="Player") return "You are a player in this challenge. Good luck!";
if (chlgstatus=="Voted") return "You have voted in this challenge. Thank you.";
if (chlgstatus=="ErrExclPlay") return "You are excluded from this challenge but did enter in it. Please have your entry removed";
if (chlgstatus=="---") return "This thread is closed or contains general information.";
if (chlgstatus=="Finished") return "Voting in this thread is finished. Please wait for a mod to close the challenge.";
if (chlgstatus=="Filled") return "This challenge has 3 photos in it and is waiting to be set to vote by a mod/admin. You may vote in it already if you want.";
if (chlgstatus=="UPDATING") return "Challenge information is being updated in the background";
if (chlgstatus=="CHAT THREAD") return "Important Information for the group.";

}

function fillupanchor(anchor,newchlgstatus,chlgname)
{

anchor.innerHTML=newchlgstatus;
anchor.style.textDecoration='none';





if (newchlgstatus=="WEEKLY CHAT") anchor.innerHTML='<img src="http://i43.tinypic.com/2nlsmqw.png" width="60" height="17">';
if (newchlgstatus=="Filled") anchor.innerHTML='<img src="http://i40.tinypic.com/oa0zyo.png" width="60" height="17">';
if (newchlgstatus=="Finished") anchor.innerHTML='<img src="http://i40.tinypic.com/oa0zyo.png" width="60" height="17">';
if (newchlgstatus=="--VOTE--") anchor.innerHTML='<img src="http://i40.tinypic.com/ay6051.png" width="60" height="17">';  
if (newchlgstatus=="VOTE") anchor.innerHTML='<img src="http://i40.tinypic.com/ay6051.png" width="60" sheight="17">'; 
if (newchlgstatus=="Voted") anchor.innerHTML='<img src="http://i39.tinypic.com/1q0dqp.png" width="60" height="17">'; 
if (newchlgstatus=="OPEN") anchor.innerHTML='<img src="http://i39.tinypic.com/2ywwnl0.png" width="60" height="17">'; 
if (newchlgstatus=="ErrExclPlay") anchor.innerHTML='<img src="http://www.flickr.com/images/icon_alert_big.png" width="22" height="17" border=0>'; 
if (newchlgstatus=="UPDATING") anchor.innerHTML='<img src="http://l.yimg.com/www.flickr.com/images/pulser2.gif" alt="" width="21" height="10" border="0">';
if (newchlgstatus=="Player") anchor.innerHTML='<img src="http://i39.tinypic.com/2nrpoxc.png" width="60" height="17" border=0>';
if (newchlgstatus=="CLOSED") anchor.innerHTML='<img src="http://i44.tinypic.com/2vxnek9.png" width="60" height="17" border=0>';
if (newchlgstatus=="INFO") anchor.innerHTML='<img src="http://i39.tinypic.com/2wox6v4.png" width="60" height="17">';
if (newchlgstatus=="GAME") anchor.innerHTML='<img src="http://i41.tinypic.com/2z4llxc.png" width="60" height="17">';





anchor.style.color=setchlgstatuscolor(newchlgstatus);
anchor.title=setchlgstatustitle(newchlgstatus);

//if some statusses are reached, let's display a warning on screen
/*
if (newchlgstatus=="ErrExclPlay")  //ErrExclPlay
 {
 wanchor=thisdocument.getElementById("CheckPlayStatusDiv");
 wanchor.style.display='block';
 wanchor=thisdocument.getElementById("CheckPlayStatus");
 wanchor.innerHTML="You entered a challenge you were excluded from (look for the '" +
                  newchlgstatus + "' status and ask a mod/admin to remove " + 
                  "this entry by leaving a message in the Chat Thread";
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
	if (playernumber==10)
	 {
	 wanchor=thisdocument.getElementById("CheckPlayStatusDiv");
	 wanchor.style.display='block';
	 wanchor=thisdocument.getElementById("CheckPlayStatus");
	 wanchor.innerHTML="You entered 3 challenges and have reached your maximum play limit!";
	 wanchor.style.color='red';
	 }
	if (playernumber>10)
	 {
	 wanchor=thisdocument.getElementById("CheckPlayStatusDiv");
	 wanchor.style.display='block';
	 wanchor=thisdocument.getElementById("CheckPlayStatus");
	 wanchor.innerHTML="You entered over 3 challenges and are thus breaking the rules! " + 
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
           if (chlgname.match("Icon Group Game")=="Icon Group Game") Icon Group Game=true
             else Icon Group Game=false;
           
           if (!Icon Group Game) 
             {			
/*			 challengetxt=challengetxt.split("Voting begins")[1].split("<b>")[1].split("<")[0]; 
             if (challengetxt.indexOf(playername)!=-1) 
                newchlgstatus=addchlgstatus(newchlgstatus,"winner");
             }
            else
               {
               if (challengetxt.indexOf(playername)!=-1) newchlgstatus=addchlgstatus(newchlgstatus,"photoposter");
               //don't add to playernumber because this is a special challenge
 */            }
          
           lastimgplace= 2;
           photosposted= 0;
           var lastvote= "";
           
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
           
		   if (chlgname.match("VOTE")== "VOTE" )
             {
             for (i=lastimgplace; i <tds.length;i++) {
               txt=tds[i];
    
               if (txt.match("says")=="says") 
                 {
                 voter=txt.split("<a href")[1].split(">")[1].split("<")[0].replace(/&amp;/g,"&");
                 if (voter.indexOf(playername)!=-1) 
                    newchlgstatus=addchlgstatus(newchlgstatus,"voter");
                 
   				      var ptag=txt.split("<p>")[1].split("<small>")[0];
  				        lastvote=ptag.split("\t")[7].split("\t")[0].replace(/&gt;/g,">");
                 }
               } // end of for
             //check for finished votes when not Icon Group Game
             //if (!Icon Group Game)
               //{
               if ((photosposted==3)&&((chlgnum!='0'))&&(lastvote.match('7')=="7")) 
                 newchlgstatus="Finished";
              // }
             } // end of if match vote
             
           //overwrite some base statusses if challenge is in voting.
           
           if ((newchlgstatus=="none")&&(photosposted==3)&&(chlgnum=='0')&&(chlgname.match("OPEN")=="OPEN")) newchlgstatus="Filled";
		  if (((newchlgstatus=="none")||(newchlgstatus=="Excluded"))&&(chlgname.match("VOTE")=="VOTE")) newchlgstatus="--VOTE--";
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
  if (nonchallenge(chlgname))  chlgstatus="CHAT THREAD";


  
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
  
  if (chlgstatus=="Player"&&!forcereload) playernumber++; //when forcereload number gets added in loadthread
  
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

if ( window.name == 'Log page' ) return; //don't process log page

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
  
	// check if we have GM variables
	if ( GM_getValue( "CP.auto" ) == undefined )
		GM_setValue( "CP.auto", "true" );

	if ( GM_getValue ( "CP.auto" ) == "true" )
		automode = true;
	else
		automode = false;

	if ( automode )
		automodetxt = "on";


// check themelist & chlgheaders

if (thisdocument.title.match("discussion topics")=="discussion topics") 
{

  // ************************
  // main *Game page
  // ************************
  //alert("in main");
  
  if ( automode ) 
  ProcessMainDoc( );

}
	//add auto on/off link
	var Docmain   = thisdocument.getElementById( "Main" );
	var Doctables = Docmain.getElementsByTagName( "table" );
	var Doctrs    = Doctables[ 0 ].getElementsByTagName( "tr" );
	var Doctds    = Doctrs[ 0 ].getElementsByTagName( "td" );
	var DoCP      = Doctds[ 1 ].getElementsByTagName( "p" );

	myanchor = thisdocument.createElement( 'img' );
	myanchor.setAttribute( 'src', 'http://l.yimg.com/www.flickr.com/images/subnavi_dots.gif' );
	myanchor.setAttribute( 'alt', '' );
	myanchor.setAttribute( 'height', '11' );
	myanchor.setAttribute( 'width', '1' );
	DoCP[ 0 ].appendChild( myanchor );

	myanchor = thisdocument.createElement( 'a' );
	myanchor.innerHTML = "CheckPlay " + automodetxt; // +" (" + playername + ")" ;
	myanchor.href = "#";
	myanchor.id = "CheckPlay";
	myanchor.setAttribute( 'onClick', 'return false;' );
	myanchor.addEventListener( 'click', function eventclickmain(e) { CheckPlayClicked(); },	false );
	DoCP[ 0 ].appendChild( myanchor );

	mydiv = thisdocument.createElement( 'div' );
	mydiv.style.display = 'none';
	mydiv.id = "CheckPlayStatusDiv";
	Doctds[ 1 ].appendChild( mydiv );

	myanchor = thisdocument.createElement( 'p' );
	myanchor.id = "CheckPlayStatus";
	myanchor.innerHTML = "CheckPlay statusfield";
	myanchor.setAttribute( 'style', 'text-decoration: none; color: Red' );
	mydiv.appendChild( myanchor );


addCPheader( );

return;

// *******************
//  End of processing
// *******************

})();

