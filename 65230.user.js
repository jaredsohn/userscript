// ==UserScript==
// @name	Dark Age of Wythia - Unread Messages
// @namespace	Airbender
// @description	Check for Unread Messages in Inbox and Tackboard
// @include	*wythia.com/*
// @exclude	*wythia.com/donations*
// @exclude	*wythia.com/HTML*
// @exclude	*wythia.com/user_search*
// @exclude	*wythia.com/display_stats*
// @exclude	*wythia.com/fief_calculator*
// @exclude	*wythia.com/HTML/town_rate*
// @exclude *wythia.com/page.php*
// @exclude *wythia.com/frame_shower*
// @exclude *wythia.com/linkconfigure*
// @exclude *wythia.com/showcharacterdescription*
// @exclude *wythia.com/accountcreation*
// @exclude *wythia.com/login*
// ==/UserScript==

// Script Auto update code provided by http://www.crappytools.net

// VERSION 2.2

// Changelog
//
// Fixed issue when Daylight savings time came into effect (Partial Fix). 
// Permanent fix to be released soon.

var SUC_script_num = 65230;// Change this to the number given to the script by userscripts.org (check the address bar); 
var timezoneAdjust =2400000;


//---------------------------------------------------------------------------//
//								CHECK INBOX									 //
//---------------------------------------------------------------------------//

function inboxCheck(){	

	var myUrl ='http://'+document.domain+'/message_system.php';	
	window.setTimeout(function() {   
		GM_xmlhttpRequest({
		method: 'GET',
		url: myUrl,
		onload: function(responseDetails){								
			checkMail(responseDetails);
		}
		});
	}, 0);
}

function checkMail(responseDetails){		
	var ct=0;
	var userName=new Array();	
	var subject=new Array()
	var mailLink=new Array();	
	var str,pos,next;
	str=responseDetails.responseText;
	while(str.match('color:white;\'><b>')){
		pos=str.indexOf('color:white;\'><b>');
		str=str.substring(pos+17);			
		next=str.indexOf('</b></font></center>');
		userName[ct]=str.substring(0,next);				
		pos=str.indexOf('color:white;\'><b>');
		str=str.substring(pos+17);			
		pos=str.indexOf('color:white;\'><b>');
		str=str.substring(pos+17);			
		next=str.indexOf('</b></font></center>');		
		pos=str.indexOf('<a href=\'');	
		str=str.substring(pos+9);			
		next=str.indexOf('\'>');
		mailLink[ct]=str.substring(0,next);		
		str=str.substring(next+2);			
		next=str.indexOf('</a>');		
		subject[ct]=str.substring(0,next);		
		pos=str.indexOf('color:white;\'><b>');
		str=str.substring(pos+17);			
		pos=str.indexOf('color:white;\'><b>');
		str=str.substring(pos+17);					
		ct++;		
	}
	createMailList(ct,userName,subject,mailLink);
}

function createMailList(ct,userName,subject,mailLink){		
	if(ct==0){		
		GM_setValue('isUnreadInbox',false);
		return;
	
	}
	GM_setValue('isUnreadInbox',true);
	var div,table,tr;	
	div=document.createElement('div');
	div.style.position = 'relative';	
	table=document.createElement('table');
	table.id="tableUnreadMail";
	table.width="50%";
	table.bgcolor="black"
	table.border="black"		  
	tr=document.createElement('tr');
	tr.align="center";			
	td=document.createElement('th');	
	td.colSpan="3";
	td.innerHTML = '<font size=3 color="WHITE"><blink><b>'+ct+' Unread Messages in Inbox</b></blink></font>';
	tr.appendChild(td);	
	table.appendChild(tr);		
	for(i=1;i<=ct;i++){			
		tr=document.createElement('tr');	
		tr.align="center";		
			td=document.createElement('td');			
			td.width="10%";
			td.innerHTML = '<a href="http://'+document.domain+ mailLink[i-1] +'" STYLE="text-decoration:none"><font color="WHITE" size =2>'+ i +'</font></a>';  				
	  		tr.appendChild(td);
	  		td=document.createElement('td');			
			td.width="30%";
			td.innerHTML = '<a href="http://'+document.domain+ mailLink[i-1] +'" STYLE="text-decoration:none"><font color="WHITE" size =2>'+ userName[i-1] +'</font></a>';  				
	  		tr.appendChild(td);
	  		td=document.createElement('td');			
			td.width="70%";
			td.innerHTML = '<a href="http://'+document.domain+ mailLink[i-1] +'" STYLE="text-decoration:none"><font color="WHITE" size =2>'+ subject[i-1] +'</font></a>';  				
	  		tr.appendChild(td);		  	  	 	
		table.appendChild(tr);
	}
	div.appendChild(table);	
	var loc=location.href;
	var tid=2;
	if(loc.match('message_system')){
		tid=3;
	}	
	var b = document.getElementsByTagName('table')[tid];
	div=b.parentNode.insertBefore(div,b);
}

//***************************************************************************//


//---------------------------------------------------------------------------//
//							CHECK TACKBOARD									 //
//---------------------------------------------------------------------------//

var topicCtr=0;
var topicName=new Array();
var topicId=new Array();
var topicCtrNew=0;
var topicNameNew=new Array();
var topicIdNew=new Array();
var utcOffset=-5;		//EST Time Offset (only for winter);

function tackboardCheck(pgnum){	

	var myUrl ='http://'+document.domain+'/clan_tackboard.php?action=viewTackBoard&page='+pgnum;	
	window.setTimeout(function() {   
		GM_xmlhttpRequest({
		method: 'GET',
		url: myUrl,
		onload: function(resp){	
			if(resp.responseText.match('You do not belong to a clan')||resp.responseText.match('Forgot Your Password?')){
				// do nothing				
			}
			else if(resp.responseText.match('This tackboard currently has no threads')){	
				createMessageList();			
			}
			else{
				checkTackboard(resp);
				pgnum++;
				tackboardCheck(pgnum);
			}
		}
		});
	}, 0);

}

function checkTackboard(resp){		
	var nm,id,dt,tm,d,strid;
	var str,pos,next;
	str=resp.responseText;		
	while(str.match('viewThread&ThreadID=')){
		
		pos=str.indexOf('clan_tackboard.php?action=viewThread&ThreadID=');
		str=str.substring(pos+46);			
		next=str.indexOf('\'>');
		id=str.substring(0,next);				
		pos=next+2;
		str=str.substring(pos);			
		next=str.indexOf('</a>');				
		nm=str.substring(0,next);					
		pos=str.indexOf('color:orange;\'><b>');
		str=str.substring(pos+18);				
		next=str.indexOf('</b>');		
		dt=str.substring(0,next);		
		dt=dt.replace('-','/');
		dt=dt.replace('-','/');
		pos=str.indexOf('color:orange;\'><b>');
		str=str.substring(pos+18);				
		next=str.indexOf('</b>');		
		tm=str.substring(0,next);		
		d=new Date(dt + " " + tm);
		strid='tackboardMessage'+id;
		
		//utc = d.getTime() + (d.getTimezoneOffset() * 60000);   
		//nd = new Date(utc + (timezoneAdjust*utcOfffset));
		//lastEntryTime=nd.getTime();
		lastEntryTime=d.getTime();
		
		lastVisTime=parseInt(GM_getValue(strid,0),10);	
		if(lastVisTime==0){			
			topicIdNew[topicCtrNew]=id;
			topicNameNew[topicCtrNew]=nm;
			topicCtrNew++;							
		}
		else if(lastVisTime<lastEntryTime){			
			topicId[topicCtr]=id;
			topicName[topicCtr]=nm;
			topicCtr++;
		}				
	}		
}

function setTackboardMessageRead(){
	var pos=location.href.indexOf('ThreadID=');
	id=location.href.substr(pos+9);
	strid='tackboardMessage'+id;
	if(location.href.match('ThreadID='+id)){
		d=new Date();
		utc = d.getTime() + (d.getTimezoneOffset() * 60000);
		nd = new Date(utc + (timezoneAdjust*utcOffset));
		curTime=nd.getTime();
		GM_setValue(strid,curTime+'');
	}
}

function createMessageList(){
	
	if(topicCtrNew==0&&	topicCtr==0){	
		GM_setValue('isUnreadTackboard',false);
		return;
			
	}
	GM_setValue('isUnreadTackboard',true);
	
	if(topicCtrNew>0){			
		var div,table,tr;	
		div=document.createElement('div');
		div.style.position = 'relative';	
		table=document.createElement('table');
		table.id="tableNewThread";
		table.width="50%";
		table.bgcolor="black"
		table.border="black"		    	
		tr=document.createElement('tr');
		tr.align="center";			
		td=document.createElement('th');	
		td.colSpan="3";
		td.innerHTML = '<font size=3 color="WHITE"><blink><b>'+topicCtrNew+' New Threads in Tackboard</b></blink></font>';
		tr.appendChild(td);	
		table.appendChild(tr);		
		for(i=1;i<=topicCtrNew;i++){			
			tr=document.createElement('tr');	
			tr.align="center";		
				td=document.createElement('td');			
				td.width="10%";
				td.innerHTML = '<a href="http://'+document.domain+ '/clan_tackboard.php?action=viewThread&ThreadID=' + topicIdNew[i-1] +'" STYLE="text-decoration:none"><font color="WHITE" size =2>'+ i +'</font></a>';  				
				tr.appendChild(td);
				td=document.createElement('td');			
				td.width="90%";
				td.innerHTML = '<a href="http://'+document.domain+ '/clan_tackboard.php?action=viewThread&ThreadID=' + topicIdNew[i-1] + '" STYLE="text-decoration:none"><font color="WHITE" size =2>'+ topicNameNew[i-1] +'</font></a>';  				
				tr.appendChild(td);		  	  	 	
			table.appendChild(tr);
		}
		div.appendChild(table);	
		var loc=location.href;
		var tid=2;
		if(loc.match('message_system')){
			tid=3;
		}	
		var b = document.getElementsByTagName('table')[tid];
		div=b.parentNode.insertBefore(div,b);
		
	}
	
		var div,table,tr;	
		div=document.createElement('div');
		div.style.position = 'relative';	
		table=document.createElement('table');
		table.id="tableNewMessages";
		table.width="50%";
		table.bgcolor="black"
		table.border="black"		    	
		tr=document.createElement('tr');
		tr.align="center";			
		td=document.createElement('th');	
		td.colSpan="3";
		td.innerHTML = '<font size=3 color="WHITE"><blink><b>'+topicCtr+'  New Messages in Tackboard</b></blink></font>';
		tr.appendChild(td);	
		table.appendChild(tr);		
		for(i=1;i<=topicCtr;i++){			
			tr=document.createElement('tr');	
			tr.align="center";		
				td=document.createElement('td');			
				td.width="10%";
				td.innerHTML = '<a href="http://'+document.domain+ '/clan_tackboard.php?action=viewThread&ThreadID=' + topicId[i-1] +'" STYLE="text-decoration:none"><font color="WHITE" size =2>'+ i +'</font></a>';  				
				tr.appendChild(td);
				td=document.createElement('td');			
				td.width="90%";
				td.innerHTML = '<a href="http://'+document.domain+ '/clan_tackboard.php?action=viewThread&ThreadID=' + topicId[i-1] + '" STYLE="text-decoration:none"><font color="WHITE" size =2>'+ topicName[i-1] +'</font></a>';  				
				tr.appendChild(td);		  	  	 	
			table.appendChild(tr);
		}
		div.appendChild(table);	
		var loc=location.href;
		var tid=2;
		if(loc.match('message_system')){
			tid=3;
		}	
		var b = document.getElementsByTagName('table')[tid];
		if (topicCtr>0)	div=b.parentNode.insertBefore(div,b);
	
}

//***************************************************************************//


//---------------------------------------------------------------------------//
//							LOADING SCRIPTS									 //
//---------------------------------------------------------------------------//

function load_script() {	
	d=new Date();
	utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (timezoneAdjust*utcOffset));
	var curT=nd.getTime();
	var oldT=parseInt(GM_getValue('last_wythia_check',0),10);	
	var isUnreadInbox=GM_getValue('isUnreadInbox',false);
	var isUnreadTackboard=GM_getValue('isUnreadTackboard',false);	
	if(curT-oldT>300000 || isUnreadInbox|| isUnreadTackboard){
		GM_setValue('last_wythia_check',curT+'');
		inboxCheck();
		tackboardCheck(1);		
	}
	if(location.href.match('action=viewThread&ThreadID=')){
		setTackboardMessageRead();
	}

	
}
window.addEventListener("load", load_script, false);

//***************************************************************************//


//---------------------------------------------------------------------------//
//								AUTO UPDATE									 //
//---------------------------------------------------------------------------//

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0'),10) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1],10);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'),10);
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
					
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}

//***************************************************************************//
