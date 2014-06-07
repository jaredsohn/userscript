// ==UserScript==
// @name           GLB Ticker by karma99
// @namespace      www.goallineblitz.com
// @description    Shows a customized game result ticker
// @include        http://goallineblitz.com/game/*
// @exclude        http://goallineblitz.com/game/home.pl
// @exclude        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp&hide=1
// @exclude        http://goallineblitz.com/game/replay.pl?pbp_id=*
// @exclude        http://goallineblitz.com/game/login.pl
// ==/UserScript==

/*
Goal Line Blitz Score Ticker, by karma99 v0.91
Displays a running ticker of league scores on all pages EXCEPT your home page, the 1 by 1 revealing play by 
play page and the replay page. Obviously you don't want a ticker to spoil those hidden results!
If you don't care about such things, just highlight each entry in the "Excluded Pages" in the "Manage User Scripts"
window and click "Remove" for each one and it will show on all GLB pages.

Limitations: when you start the ticker for the first time if a page doesn't have any games
listed or they are shown but the score says "Matchup" they will be listed in the ticker as 
"No scores available" or "Games will sim soon" respectively.
The ticker stores the game data on your local machine and only gets updates when the games are due to play.
This is to vastly speed up loading and to stop Bort crying when the server gets killed with lots of unrequired
hits to pages that haven't changed.
The results will be rechecked at the time they are due to sim. If they are simmed early
(as most games are) they will still NOT show until the due time. If the games are late the script will check
every 10 minutes after the due time until they sim.
The ticker is designed as a nice football website style add on, if you need to know a result the very second
the game is simmed... go to the page and look  :P

Ok, so now you know what it does, how do you set it up?
On every league details page and conference details page you will see a link under the conference name
"Add to Score Ticker". Click this and the conference will be added, and "Remove from Score Ticker" does exactly
what you'd expect!

So that's it. This is currently a late Beta as I need to see how to deal with playoffs and the off season, but
I can't do that until I can see the pages, so keep an eye out for updates soon!
Enjoy  :D

Updates
v0.1-0.8 Developer testing phase (thanks to mw54finest)
v0.9     2nd July 08 - Public release
v0.91    3rd July 08 - Ticker will now pause when mouse is hovered over the top selection bar above the ticker (thanks to cretin for the idea)
*/

// Check for add/rem query strings
if(GetQueryString('tickeradd'))
{
  var lf=GetQueryString('tickeradd').replace(/-/,',');
  var existing=ArrayFromCsv(GM_getValue('tickerlflist',''));
  // Already exists?
  var index = existing.indexOf(lf);
  if(index == -1)
    {
      existing.push(lf);
      GM_setValue('tickerlflist',ArrayToCsv(existing));
    }  
}
if(GetQueryString('tickerrem'))
{
  var lf=GetQueryString('tickerrem').replace(/-/,',');
  var existing=ArrayFromCsv(GM_getValue('tickerlflist',''));
  var index = existing.indexOf(lf);
  if(index != -1)
    {existing.splice(index, 1);}
  GM_setValue('tickerlflist',ArrayToCsv(existing));
}

// Add/Remove links on conference/league pages
if (window.location.href.split('p://goallineblitz.com/game/league.pl').length > 1 && document.getElementById('conferences'))
{
  var conferences=getElementsByClassName('conference',document.getElementById('conferences'));
  if(conferences.length>0)
  {
    for(i=0;i<conferences.length;i++)
    {
      var league=conferences[i].innerHTML.split('<a href="/game/league.pl?league_id=')[1].split('&amp;conference_id')[0];
      var conference=conferences[i].innerHTML.split('conference_id=')[1].split('&amp;playoffs')[0];
      var headDiv=getElementsByClassName('medium_head',conferences[i])[0];
      
      var addrem='add';
      var addremText='Add to';
      // Link to add or remove?
      if(ArrayFromCsv(GM_getValue('tickerlflist','')).indexOf(league+','+conference)>-1)
      {
        addrem='rem';
        addremText='Remove from';
      }
      headDiv.innerHTML+='<div><a href='+window.location.href.split('&ticker')[0]+'&amp;ticker'+addrem+'='+league+'-'+conference+'>'+addremText+' Score Ticker</a></div>';
    }
  }
}

function ArrayToCsv(lfArray) // Array to csv for storing
{
  var csv='';
  for(a=0;a<lfArray.length;a++)
    {csv+=lfArray[a]+((a==lfArray.length-1) ? '' : ':');}
  return csv;
}

function ArrayFromCsv(lfCsv) // Array from csv for retrievel
{
  var arr = new Array();
  if (lfCsv!='')
  {
    for(b=0;b<lfCsv.split(':').length;b++)
      {arr.push(lfCsv.split(':')[b]);}
  }
  return arr;
}

var leagueConferences=ArrayFromCsv(GM_getValue('tickerlflist',''));

window.setTimeout(function(){

// Add new div for ticker
var tickerDiv=document.createElement('div');
tickerDiv.id='scoreTicker';
tickerDiv.style.backgroundImage='url(/images/game/design/toolbar.gif)';
tickerDiv.style.backgroundRepeat='repeat-x';
tickerDiv.style.position='absolute';
tickerDiv.style.top='110px';
tickerDiv.style.width='96%';
tickerDiv.style.height='16px';
tickerDiv.style.color='white';
tickerDiv.style.fontSize='12px';
tickerDiv.style.paddingLeft='2%';
tickerDiv.style.paddingRight='2%';
tickerDiv.style.overflow='hidden';
var bContainer = document.getElementById('body_container');
var contentDiv = document.getElementById('content');
bContainer.insertBefore(tickerDiv,contentDiv);

// Add new div for message
var msgDiv=document.createElement('div');
msgDiv.id='msgdiv';
msgDiv.style.display='none';
msgDiv.innerHTML='';
var contentDiv = document.getElementById('content');
contentDiv.insertBefore(msgDiv,null);

// Add new div for counter
var counterVar=document.createElement('div');
counterVar.id='countervar';
counterVar.style.display='none';
counterVar.innerHTML='';
contentDiv.insertBefore(counterVar,null);

// Add new div for position
var positionDiv=document.createElement('div');
positionDiv.id='positiondiv';
positionDiv.style.display='none';
positionDiv.innerHTML=GM_getValue('tickerposition',0);
contentDiv.insertBefore(positionDiv,null);

// Add new div for pause
var pauseDiv=document.createElement('div');
pauseDiv.id='pausediv';
pauseDiv.style.display='none';
contentDiv.insertBefore(pauseDiv,null);

// Add pause events to toolbar
var toolbar=document.getElementById('toolbar');
toolbar.setAttribute("onMouseOver","SetPause('P');");
toolbar.setAttribute("onMouseOut","SetPause('');");

// Update ticker position on unload
window.addEventListener("unload", function(){GM_setValue('tickerposition', parseInt(document.getElementById('positiondiv').innerHTML));}, false);

var lcText='var leagueConferences=new Array(';
if (leagueConferences.length>0)
{
  for (var a in leagueConferences){lcText+='"'+leagueConferences[a]+'",';}
  lcText=lcText.substring(0,lcText.length-2);
  lcText+='");';
}
else
{lcText+=');';}

// Pause function
var pauseScript="function SetPause(p){document.getElementById('pausediv').innerHTML=p;};";
// Add ticker script
var tickerScript=document.createElement('script');
tickerScript.type='text/javascript';
tickerScript.innerHTML=pauseScript+lcText+'function GetMessage(){if(leagueConferences.length==0){return "You must select at least 1 conference..."} else if(document.getElementById("countervar").innerHTML.length==leagueConferences.length){return document.getElementById("msgdiv").innerHTML}else{var loadmsg="Loading...";while(loadmsg.length<180){loadmsg=loadmsg+" "+loadmsg;};return loadmsg;}};var position=parseInt(document.getElementById("positiondiv").innerHTML);function ticker(){var msg=GetMessage();while(msg.length<170){msg+=" "+GetMessage();};msg+=" "+GetMessage();document.getElementById("scoreTicker").innerHTML=msg.substring(position,position+170);if(document.getElementById("pausediv").innerHTML==""){position++;};if(position>(msg.length-1)/2 && msg.split("Loading...").length==1){position=0;};document.getElementById("positiondiv").innerHTML=position;}ticker();setInterval("ticker()",100);';
document.getElementsByTagName('head')[0].appendChild(tickerScript);

if(leagueConferences.length>0)
{
  for(lc=0;lc<leagueConferences.length;lc++)
  {GetScores(leagueConferences[lc].split(',')[0],leagueConferences[lc].split(',')[1]);}
}

function GetScores(l,c){

// Check cache
var cached = false;
var firstTime = true;
if (GM_getValue(l+':'+c, '')!='')
{
	// Check cache time
	if (new Date() < new Date().setTime(Date.parse(GM_getValue(l+':'+c+':updatetime',0)))){
		document.getElementById('msgdiv').innerHTML=document.getElementById('msgdiv').innerHTML+GM_getValue(l+':'+c);
		document.getElementById('countervar').innerHTML+='G';
		cached=true;
    }
    firstTime=false;
}

if (!cached)
{
GM_xmlhttpRequest
(
{
	method: 'GET',
	url: 'http://goallineblitz.com/game/league.pl?league_id='+l+'&conference_id='+c,
	headers: 
	{
	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(replayPage)
	{
		var resp=replayPage.responseText;
		var headDetails=resp.split('<div class="big_head subhead_head">')[1];
		var league=headDetails.split('">')[1].split('</a>')[0];
		var conf=headDetails.split('</a> - ')[1].split('</div>')[0];
		var gamestable=resp.split('<table class="games_table"')[1].split('</table>')[0];
		var gameTime=resp.split('Next sim in:')[1].split('</div>')[0];
		var hms=gameTime.split(':');
		var gameSimTime=new Date(new Date().getTime()+(hms[0]*3600000)+(hms[1]*60000)+(hms[2]*1000));
		
		var msg='FAILED!';
		if (gamestable.split('_color1">').length < 2)
		{
        msg=league+' '+conf+' : No scores available... ';
		}
		else
		{
			if (gamestable.split('Matchup').length > 1)
			{
        if (firstTime)
          {msg=league+' '+conf+' : Games will sim soon... ';}
        else
          {
            msg=GM_getValue(l+':'+c); //Keep existing value
            gameSimTime=new Date(new Date().getTime()+(10*60000)); // Add 10 mins and check again
          }
      }
			else
			{
				msg=league+' '+conf+' : ';
				// Get all game results
				var gamesrough=gamestable.split('<a href="');
				for(i=1;i<gamesrough.length;i++)
				{
					// First column is team 1
					var team1=gamesrough[i].split('">')[1].split('</a>')[0];
					i++;
				
					// Second column is team 2
					var team2=gamesrough[i].split('">')[1].split('</a>')[0];
					i++;
				
					// Third column is score, ignore 4th column
					var score=gamesrough[i].split('">')[1].split('</a>')[0];
					i++;

					msg=msg+team1+' '+score.split('-')[0]+' : '+team2+' '+score.split('-')[1]+' .... ';
				}
			}		
		}
		// Cache time
		GM_setValue(l+':'+c+':updatetime',gameSimTime.toString());
		// Cache data
		GM_setValue(l+':'+c,msg);
		document.getElementById('msgdiv').innerHTML=document.getElementById('msgdiv').innerHTML+msg;
		document.getElementById('countervar').innerHTML+='G';
	}
});
// Recaching so reset ticker position
GM_setValue('tickerposition',0);
}
}

});

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
	return a;
};

function GetQueryString(name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)"; 
  var regex = new RegExp( regexS ); 
  var results = regex.exec(window.location.href); 
  if( results == null )    
    return null;
  else    
    return results[1];
}