// ==UserScript==

// @name        	BF3 Suspicious Player Script
// @namespace   	BF3 Suspicious Player Script
// @description 	Finding hard to believe stats in BF3
// @include     	http://bf3stats.com/stats_pc/*
// @include			http://bf3stats.com/stats_360/*
// @include			http://bf3stats.com/stats_ps3/*
// @version     	1.6
// @lastupdated    	2012-12-17
// @url				http://userscripts.org/scripts/show/135120
// @updateURL    	http://userscripts.org/scripts/source/135120.meta.js
// @downloadURL   	http://userscripts.org/scripts/source/135120.user.js
// @author			Mike DiDomizio

// ==/UserScript==

console.log('loaded');

//everytime something goes over what is normal, a flag is set
var flagsSet = 0;
var flagsReasons = new Array();

//############## 1.5 to 1.6 changes
//added xbow and xbow scoped

//44 magnum/REX is set to hand cannon as it was setting off false positives on legitimate players
var weapons = new Object({
	rifle : ["SCAR-H","SCAR-L","MTAR-21","G36-C","F2000","M16A4","AN-94","ACW-R","M416","AEK-971","SG553","AS VAL","UMP-45","AK-74M","KH2002","PP-2000","G3A3","M4A1","AUG A3","M27 IAR"],
	pistol : ["MP443","93R","M1911 TACT.","M1911 SUPP.","M9","M9 SUPP.","G17C","MP443 SUPP.","M1911","G18 SUPP.","M9 TACT.","G18","MP443 TACT.","M1911 S-TAC.","G17C SUPP."],
	smg : ["PDW-R","P90","PP-19","MP7","AKS-74u","A91","L85A2","FAMAS","QBZ-95B","M5K","G53"],
	sniper : ["JNG-90","L96","M417","SVD","M98B","MK11 MOD 0","SV98","M40A5","QBU-88","SKS","M39 EMR"],
	lmg : ["PKP PECHENEG","L86A2","LSAT","MG36","M249","RPK-74M","TYPE 88 LMG","M60E4","M240B","QBB-95"],
	shotgun : ["DAO-12","M26 MASS","SPAS-12","MK3A1","USAS-12","M1014","870MCS","SAIGA 12K"],
	rocket : ["SMAW","RPG-7V2","M320","FGM-148 JAVELIN","SA-18 IGLA","FIM-92 STINGER"],
	handCannon : [".44 MAGNUM",".44 SCOPED","MP412 REX"],
	knife : ["KNIFE","ACB-90"],
	xbow : ["XBOW SCOPED","XBOW"]
});


var h1 = document.getElementsByTagName("h1");
for(var i = 0; i < h1.length; i++)
{
	if(h1[i].className == "ptitle")
	{
		var playerName = h1[i].getElementsByTagName("strong")[0].innerHTML; 		
		
		var d = getId("gspm").parentNode.getElementsByTagName("dd");
		d[d.length-1].innerHTML += ' | <a href="http://metabans.com/search/'+playerName+'">MetaBans</a> | <a href="http://i-stats.net/index.php?action=pcheck&player='+playerName+'&game=BF3">I-Stats</a> | '+
		'<a href="http://www.team-des-fra.fr/CoM/bf3.php?p='+playerName+'">Team-DES</a>';
		break;	
	}
}

var score = parseInt(getId("scores-score").innerHTML.replace(/\s+/g,''));
var deaths = parseInt(getId("global-deaths").innerHTML.replace(/\s+/g,''));
var timePlayed = getId("global-time").innerHTML.match(/^(\d{2,})\:(\d{2,})\:(\d{2,})/);
var secondsPlayed = 0;
if(timePlayed.length == 4)
{
	secondsPlayed += parseFloat(timePlayed[1]) * 3600;
	secondsPlayed += parseFloat(timePlayed[2]) * 60;
	secondsPlayed += parseFloat(timePlayed[3]);
};

if(score && score < 24600000)
{
	//GET TIME UNTIL S. STAR 100 //145
	var scoreLeft = 24600000 - score;
	var spm = getId("spm").innerHTML.replace(/\s+/g,'');
	var minutesLeft = scoreLeft / spm;
	var days = minutesLeft / 1440;
	
	var dt = document.createElement("dt");
	var text = document.createTextNode("S. Star 100 (days)");
	dt.appendChild(text);
	
	var dd = document.createElement("dd");
	var text = document.createTextNode(days.toFixed(2));
	dd.appendChild(text);
	
	getId("scores-score").parentNode.insertBefore(dt,getId("scores-score").previousSibling);
	getId("scores-score").parentNode.insertBefore(dd,getId("scores-score").previousSibling);
}

//headshot distance
var hs = getId("global-longesths");
var hh = getId("global-longesthandhs");
var hsd = parseInt(hs.innerHTML.replace(/\s+/g,''));
var hhd = parseInt(hh.innerHTML.replace(/\s+/g,''));

//headshot distance more than 4000m?
calcSusp(hsd,new Array(2000,3000), new Array(hs,hs.previousSibling),new Array(0,10),"<strong>headshot distance</strong> more than {1} {2}");

//handheld more than 4000m?
calcSusp(hhd,new Array(2000,3000),new Array(hh,hh.previousSibling),new Array(0,10),"<strong>handheld headshot distance</strong> more than {1} {2}");

//GENERAL SCORE MINUTE
var gspm = getId("gspm");
var gspm2 = parseFloat(gspm.innerHTML.replace(/\s+/,''));
calcSusp(gspm2,new Array(4000,8000,10000),gspm,new Array(0,1,10),"<strong>General Score Per Minute</strong> higher than {1} {2}");

//KILL/DEATH RATIO
var kd = getId("kdr").getElementsByTagName("span")[0];
var kdi = kd.innerHTML;
calcSusp(kdi,new Array(15,20,30,40),new Array(kd.parentNode,kd.parentNode.previousSibling),new Array(0,1,2,10),"<strong>Kill/Death Ratio</strong> higher than {1} {2}");

//SPM
var rankings = getId("rankings");
var tr = rankings.nextSibling.nextSibling.getElementsByTagName("table")[1].getElementsByTagName("tr");
outer:
for(var i = 0; i< tr.length; i++)
{
	var td = tr[i].getElementsByTagName("td");
	//inner:
	for(var j = 0;j<td.length;j++)
	{
		if(td[j].innerHTML == "Score per minute")
		{
			var spm = td[j].parentNode.getElementsByTagName("td")[3].innerHTML;
			var spm2 = getId("spm");
			calcSusp(spm2,new Array(4000,8000,10000),new Array(td[j].parentNode,spm2),new Array(0,1,10),"<strong>Score Per Min</strong> higher than {1} {2}");
			
			break outer;
		};
	};
};


window.onload = function()
{

	var percSet = 100;
	var wstats = getId("weapons").nextSibling.nextSibling.getElementsByTagName("table")[0].getElementsByTagName("tr");
	wstats[0].innerHTML += "<th class='header'>Hits to Kill</th><th class='header'>Shots to Kill</th>";
	
	for(var i = 0;i < wstats.length;i++)
	{
		var td = wstats[i].getElementsByTagName("td");
		
		if(td && td[0] && td[3] && td[8])
		{
			
			var weapon = new weaponInfo(td);
			wstats[i].innerHTML += "<td>"+weapon.hitsToKill.toFixed(1)+"</td><td>"+weapon.shotsToKill.toFixed(1)+"</td>";
			
			if(weapon.deaths)
			{
				wstats[i].innerHTML += "<td>"+weapon.deaths.toFixed(0)+"</td>";
			};
			
			//FIND THE WEAPON AND WHAT CLASS IT IS UNDER
			switch(weapon.type)
			{
				case 'pistol' :
				case 'rifle' : percSet = 40;
					break;
					
				case 'handCannon' : 
				case 'lmg' : 
				case 'shotgun' : percSet = 50;
					break;
					
				case 'xbow' :
				case 'sniper' : percSet = 80;
					break;
					
				case 'rocket' : percSet = 90;
					break;
					
				case 'knife' : percSet = 100;
					break;
					
				default : percSet = 100;
			};
			
			
			//the most an air vehicle can have is 5 (huey), 5 flat would be only possible (without killing more than 1 vehicle per hit/collateral) if every hit was on a severely injured fully packed huey
			//I would add the javelin, but it could be used against the amtrac/6
			if(weapon.name == "SA-18 IGLA" || weapon.name == "FIM-92 STINGER")
			{
				//is this rl killing more than 5 people per hit?
				if(weapon.kills > 3 && (weapon.kills / weapon.hits > 5))
				{
					highlight(wstats[i],10);
					flagsReasons.push("<strong>"+weapon.name+"</strong> is killing more than 5 people per hit, this is practically impossible due to the fact that the huey has 5 spots (H/K = "+(weapon.kills / weapon.hits).toFixed(1)+")");
				}
			}
			
			
			
			//IS THAT
			
			if(weapon.kills > 20 || (weapon.hitKillPerc >= 80 && weapons.kills > 2))
			{
				calcSusp(weapon.hitKillPerc - percSet,new Array(0,10,20,30),wstats[i],new Array(0,1,2,10),"<strong>"+weapon.name+"</strong> has a higher hit/kill percentage than "+percSet+" ("+weapon.hitKillPerc.toFixed(1)+")");
			};
			
			//headshot kill percentage for guns that are not shotguns that are above 100%
			if(weapon.type != "shotgun" && weapon.kills > 10)
			{
				calcSusp(weapon.headShotPerc,new Array(65,75,85,95),wstats[i],new Array(0,1,2,10),"<strong>"+weapon.name+"</strong> has a higher headshot kill percentage than {1} {2}");
			}
			
			wstats[i].addEventListener("mouseenter",function()
			{
				if(!hoverbox){
					var hoverbox = getHoverbox();
				}
				
				var gun = new weaponInfo(this.getElementsByTagName("td"));
				
				var html = '';
				
				if(gun.kills > 10)
				{
					
					html = "<dt>Hit/Kill perc</dt><dd>"+gun.hitKillPerc.toFixed(1)+"%</dd>";
					
					if(gun.kills < 500)
					{
						html += "<dt>S. Star 5</dt><dd>"+gun.timeUntilServiceStar(5)+"</dd>";
					};
					
					if(gun.kills < 10000)
					{
						
						html += "<dt>S. Star 100</dt><dd>"+gun.timeUntilServiceStar(100)+"</dd>";
					};
					
					if(gun.kills >= 10000)
					{
						//THAT'S RIGHT
						html += "<dt>Time until Service Star 1000</dt><dd>"+gun.timeUntilServiceStar(1000)+"</dd>";
					};
				};
				
				hoverbox.getElementsByTagName("dl")[0].innerHTML += html;
				
			});
			
		}else{
			continue;
		};
	};
	
	
	if(flagsReasons.length > 0)
	{
		var html = '';
		//html +='<div style="line-height:19px" class="cont text">';
		html += "<table>";
		for(var s in flagsReasons)
		{
			html += "<tr><td>"+(parseInt(s)+1)+".  "+flagsReasons[s]+"</td></tr>";
		}
		
		html += "</table>";
		//html += '</div>';

		//$('#content').append(html);
		
		var suspEl = document.createElement("div");
		suspEl.style.lineHeigt = "19px";
		suspEl.className = "cont text";
		suspEl.innerHTML = html;
		
		document.getElementById("content").appendChild(suspEl);
	}
	
	//ADD NEW TABLE COLUMNS, FIX THE SORTER
	$('table.stable.sortable.sort_4').unbind().tablesorter(); 
	$('#content h1').click(function(){
		var e = $(this).next();
		(e.css('display') == "block") ? e.slideUp() : e.slideDown();
	});
	var dd = document.createElement("dd");
	var text = document.createTextNode(flagsSet);
	dd.appendChild(text);
	
	var dt = document.createElement("dt");
	var text = document.createTextNode("Suspicious Level");
	dt.appendChild(text);
	
	getId("gspm").parentNode.insertBefore(dt,getId("gspm").previousSibling);
	getId("gspm").parentNode.insertBefore(dd,getId("gspm").previousSibling);
	
	//BUILD SUSPICIOUS LIST
	
	
};

function getId(id)
{
	return document.getElementById(id);
}

function weaponInfo(td)
{
	this.name = td[0].innerHTML;
	var hits = td[8].innerHTML.replace(/\s+/g,'');
	var shots = td[7].innerHTML.replace(/\s+/g,'');
	var kills = td[3].innerHTML.replace(/\s+/g,'');
	this.headShotPerc = parseFloat(td[5].innerHTML);
	this.hitsToKill = ((hits == 0 || kills <= 1)) ?  100 : hits / kills;
	this.shotsToKill = ((shots == 0 || kills <= 1)) ?  100 : shots / kills;
	this.type = "unknown";
	
	outer:
	for(var j in weapons)
	{
		for(var w in weapons[j])
		{
			if(weapons[j][w] == this.name)
			{
				this.type = j;			
				break outer;
			};
		};
	};
	
	this.kills = parseFloat(kills);
	this.hits = parseFloat(hits);
	
	this.hitKillPerc = 0;
	if(this.hits != 0 && this.kills != 0)
	{
		this.hitKillPerc = (this.kills / this.hits) * 100
	};
	
	var time = td[2].innerHTML.match(/^(\d{2,})\:(\d{2,})\:(\d{2,})/);
	this.secondsUsed = 0;
	if(time.length == 4)
	{
		this.secondsUsed += parseFloat(time[1]) * 60 * 60;
		this.secondsUsed += parseFloat(time[2]) * 60;
		this.secondsUsed += parseFloat(time[3]);
	};
	
	//a crude way of getting a guess at number of deaths, take the amount of time the user has used this weapon and figure out what percent of deaths could make up for it
	//var percPlayed = secondsPlayed / this.secondsUsed;
	//this.deaths =  deaths / percPlayed;
		
	//UNTIL 100 S. STARS
	this.timeUntilServiceStar = function(serviceStar)
	{
		if(this.kills == 0 || this.secondsUsed == 0 || isNaN(serviceStar))
		{
			return '-';
		}
		var secondsUntil = ((serviceStar * 100) - this.kills) / (this.kills / this.secondsUsed);
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		
		if(secondsUntil > 3600)
		{
			hours = secondsUntil / 3600;
			hours = hours.toFixed(0);
			if(hours < 10){hours = "0"+hours};
			secondsUntil = secondsUntil / 3600;
		}
		
		if(secondsUntil > 60)
		{
			minutes = secondsUntil / 60;
			minutes = minutes.toFixed(0);
			if(minutes < 10){minutes = "0"+minutes};
			secondsUntil /= 60;
		}
		
		seconds += secondsUntil;
		seconds = seconds.toFixed(0);
		if(seconds < 10){seconds = "0"+seconds};

		
		return hours+"h "+minutes+"m "+seconds+"s";
	};
};


function highlight(el,type)
{
	var color = "#FFC8C8";
	switch(type)
	{
		case 0 : color = "#FFBBBB";
			break;
		case 1 : color = "#FF9393";
			break;
		case 2 : color = "#FF6363";
			break;
		case 10 : color = "#FF0000";
			break;
	};
	
	if (el instanceof Array) 
	{
		for(var i in el)
		{
			el[i].style.background = color;
			flagsSet++;
		};
	} 
	else 
	{
		el.style.background = color;
		flagsSet++;
	};
};

function getHoverbox()
{
	var div = document.getElementsByTagName("div");
	for(var i = 0;i<div.length;i++)
	{
		if(div[i].className == "hoverinfobox")
		{
			return div[i];
		};
	};
};

/*
	val is the value to test
	limit is an array of values to test against
	highlightThese is either a single DOM element or an array of them to highlight
	highlightLevel is the level of highlighting
	debug is for testing purposes
*/
function calcSusp(val,limit,highlightThese,highlightLevel,flagText,debug)
{
	var setOff = false;
	for(var i in limit)
	{
		
		//see if value is higher than that number then see if next one exists/is not high, if not highligh
		if(val >= limit[i] && ((limit[i+1] && val < limit[i+1]) || !limit[i+1]) )
		{
			if(!highlightLevel[i] && highlightLevel[i] != 0)
			{
				highlightLevel[i] = 10;
			};
			setOff = i;
		}
	}
	
	if(setOff)
	{
		highlight(highlightThese,highlightLevel[setOff]);
	}
	
	if(flagText && setOff)
	{
		var text = flagText.replace("{1}",limit[setOff]);
		text = text.replace("{2}","("+val.toFixed(1)+")");
		flagsReasons.push(text);
	}
}
