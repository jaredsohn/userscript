// ==UserScript==
// @author Oberpanzerkriegschnecke, Elf__X
// @name WoWPStats
// @version 0.5.2.B
// @description Adds some useful fields for MMO game World of Warplanes user's page 
// @include http://worldofwarplanes.ru/community/accounts/*
// @include http://worldofwarplanes.com/community/accounts/*
// @include http://worldofwarplanes.eu/community/accounts/*
//
// @exclude http://challenge.worldoftanks.ru/uc/accounts/*
// @exclude http://worldoftanks.com/uc/accounts/*
// @exclude http://worldoftanks.ru/uc/accounts/*
// @exclude http://worldoftanks.ru/community/accounts/*
// @exclude http://worldoftanks.com/community/accounts/*
// @exclude http://uc.worldoftanks.eu/uc/accounts/*
// @exclude http://worldoftanks.eu/uc/accounts/*
// @exclude http://worldoftanks.eu/community/accounts/*
// ==/UserScript==
var lang;
var scriptVersion = "0.5.2.B";
var scriptPage = "http://forum.worldofwarplanes.ru/index.php?/topic/30282-";

if(document.title.indexOf("Профиль игрока")>-1)	lang="ru";
if (window.location.host.indexOf("worldofwarplanes") > -1 && window.location.href.indexOf("accounts") > -1) {
	main();
}
function main() {   
    var lang = (document.title.indexOf("Профиль игрока")>-1 ? "ru":"en"),
        timeDiv = document.getElementsByClassName("b-profile-name")[0],
		clanDiv = document.getElementsByClassName("b-profile-clan")[0],
		
		dayArray = [],
        blockArray = [],
        statTooltip = '',
		
		playerNick = document.getElementById("js-profile-name").innerHTML, 
        daypassed = (new Date() - new Date(document.getElementsByClassName("js-date-format")[0].getAttribute("data-timestamp") * 1000)) / 1000 / 60 / 60 / 24,
		toFixed_n = 2,
		toFixed_n1 = 3,
        atype = [],
        vehilcleTypesNumber = 4,
        prem, 
        platforms,
        AllWins,
        AllFrags,
        AllGroundTargets,
        AvgXp,
        AllBattles,
		AllAvgLev,
		//AllDamagGround,
		//AllSuperiority,
		AllFails,
		AllSurvived,
		AllHelp;
    	/*AllGold = document.getElementsByClassName("currency-gold")[0],
    	AllCredit = document.getElementsByClassName("currency-credit")[0],
    	AllExp = document.getElementsByClassName("currency-experience")[0],
		ussr_b = 0,
		ussr_w = 0,
		germany_b = 0,
		germany_w = 0,
		usa_b = 0,
		usa_w = 0,
		japan_b = 0,
		japan_w = 0,
		NatCount = 4, //number of nations
		levOrder = ["X","IX","VIII","VII","VI","V","IV","III","II","I"],
		platformLevels = new Object(),
		levtr = [],
		platformTypes = new Object(),
		trPlatform = []*/       
    
	//insert scripts
	setup_script (sortTd);	
	setup_script (toFl);
	setup_script (col);
	setup_script (col2);
    
    atype[1] = //'lf', light fighters
	['ar-65','ar-68','ar-80','bf-109b','bf-109e','bf-109f','bf-109g','bf-209a1','me-p1092','me-p1101',					//lf Germany
	'i-5','i-15','i-16-5','i-16-24','lagg-3','la-5','la-7', 'la-9','la-150','la-160','la-15',							//lf USSR
	'p-12','p-23','hawk-75','p-36','p-40','p-51a','p-51','p-51h','p-51jp','fj-1','f-86a',								//lf USA
	'type-91',																											//lf Japan
	'fw-56','he-100','bf-109c',																							//lf prem Germany
	'p-40-m-105','p-39q',																								//lf prem USSR
	'p-77'];																											//lf prem USA

	atype[2] = //'hf', heavy fighters
	['ao-192','fw-57','bf-110b','bf-110e','me-410','bf-109z','me-609','me-262','bf-109tl','me-262-hg3',					//hf Germany
	'me-p1099b','me-p1102',
	'me-210'];																											//hf prem Germany

	atype[3] = //'sa', strike aircrafts
	['tsh-1','tsh-3','lbsh','il-2-1','il-2-2','il-8','il-10','il-20','il-40','il-40p',									//sa USSR
	'pegas','bsh-1','tandem'];																							//sa prem USSR

	atype[4] = //'nf', navy fighters
	['f2f','f3f','f2a','f4f','f4u','f2g','f5u','f6u','f7u',																//nf Vereinigte Staaten
	'a4n','a5m','a6m2','a6m5','a7m','j4m1','j7w1','j7w2','j7w3',														//nf Japan
	'ar-197',																											//nf prem Germany
	'f11c','2pa-l','fl-1'];																								//nf prem USA

	prem = 
	['fw-56','he-100',																									//lf prem Germany
	'p-39q','p-40-m-105',																								//lf prem USSR
	'p-77',																												//lf prem USA
	'me-210',																											//hf prem Germany
	'ar-197',																											//nf prem Germany
	'pegas','bsh-1','tandem',																							//sa prem USSR	
	'f11c','2pa-l','fl-1'];																								//nf prem USA

	platforms = ['ar-65','ar-68','ar-80','bf-109b','bf-109e','bf-109f','bf-109g','bf-209a1','me-p1092','me-p1101',		//lf Germany
	'i-5','i-15','i-16-5','i-16-24','lagg-3','la-5','la-9','la-150','la-160','la-15',									//lf USSR
	'p-12','p-23','hawk-75','p-36','p-40','p-51a','p-51','p-51h','p-51jp','fj-1','f-86a',								//lf USA
	'type-91',																											//lf Japan
	'ao-192','fw-57','bf-110b','bf-110e','me-410','bf-109z','me-609','me-262','bf-109tl','me-262-hg3',					//hf Germany
	'me-p1099b','me-p1102',
	'tsh-1','tsh-3','lbsh','il-2-1','il-2-2','il-8','il-10','il-20','il-40','il-40p',									//sa USSR
	'f2f','f3f','f2a','f4f','f4u','f2g','f5u','f6u','f7u',																//nf USA
	'a4n','a5m','a6m2','a6m5','a7m','j4m1','j7w1','j7w2','j7w3',														//nf Japan
	'fw-56','he-100','bf-109c',																							//lf prem Germany
	'p-39q','p-40-m-105',																								//lf prem USSR
	'p-77',																												//lf prem USA
	'me-210',																											//hf prem Germany
	'pegas','bsh-1','tandem',																							//sa prem USSR
	'ar-197',																											//nf prem Germany
	'f11c','2pa-l','fl-1'];																								//nf prem USA
	
    //argument for GetBattleStat:
    //'battles', 'victories', 'draws', 'fails', 'survived', 'experience', 'experienceMax', 'frags', 'ground', 'help'
    AllBattles = GetBattleStat('battles');
    AllWins = GetBattleStat('victories');
	AllFails = GetBattleStat('fails');
    AvgXp = GetBattleStat('experience');
    //AllDamag = GetBattleStat('damage');
    AvgDamag = GetBattleStat('damage');
    AllFrags = GetBattleStat('frags');
	AllSurvived = GetBattleStat('survived');
	AllHelp = GetBattleStat('help');	
    AllGroundTargets = GetBattleStat('ground');
	//AllAvgLev = CalcAvgLev();
    
    document.getElementById("js-profile-name").setAttribute('style', "max-width: 100%;");
    
    if (!clanDiv) {
    	clanDiv = document.getElementsByClassName("b-profile-noclan")[0];
    } else {
		document.getElementsByClassName("b-statistic_item")[0].setAttribute('style', "max-width: 100%;");
    }  
    if (!clanDiv) clanDiv = timeDiv;
    clanDiv.setAttribute('style', "width: 50%; max-width: 100%;");
    
    timeDiv.setAttribute('style', "width: 40%; max-width: 100%;");
	timeDiv.innerHTML += "<p>" + (lang == "ru" ? "Версия <a href='"+scriptPage+"'>скрипта</a> " : " <a href='"+scriptPage+"'>Script</a> version ")
	+ scriptVersion + " <br>"
	+ "</p>"
    + "<style>"
    + ".great_btn {"
    + " background: linear-gradient(to bottom, #0bc408 0%,#09a206 100%);"
    + " color: #fff;"
    + " font-size: 14px;"
    + " text-shadow: 0 1px 0 #757575;"
    + " padding: 4px 15px 5px 14px;"
    + " margin: 55px;"
    + " cursor: pointer;"
    + " border: 0;"
    + " border-top: 1px solid #87c286;"
    + " border-right: 1px solid #0e780c;"
    + " border-left: 1px solid #0e780c;"
    + " border-bottom: 1px solid #0e780c;"
    + " box-shadow: 0 -1px 0 #0e780c, 0 1px 0 #fff;"
    + " width: 150px;"
    + " border-radius: 15px;"
    + "}"
    + ".spoiler >  input + .box > blockquote{"
    + "    display: none;"
    + "}"
    + ".spoiler >  input:checked + .box > blockquote {"
    + "    display: block;"
    + "}"
    + '.spoiler >  input[type="checkbox"] {'
    + "    cursor: pointer;"
    + "    border-color:transparent!important;"
    + "    border-style:none!important;"
    + "    background:transparent none!important;"
    + "    position:relative;z-index:1;"
    + "    margin:-10px 0 -30px -290px;"
    + " }"
    + ".spoiler span.close,"
    + ".spoiler span.open{"
    + "    padding-left:22px;"
    + "    color: #F25322 !important;"
    + "    border-bottom: 1px dashed #F25322;"
    + "}"
    + ".spoiler >  input +  .box > span.close {"
    + "    display: none;"
    + "}"
    + ".spoiler >  input:checked +  .box > span.close {"
    + "    padding: 0 10px 0 0;"
    + "    background: url('http://worldoftanks.ru/static/3.11.1.1/common/css/block/b-link/img/vertical-arrow.png') 100% 2px no-repeat;"
    + "    background-position: 100% -16px;"
    + "    display: inline;"
    + "}"
    + ".spoiler >  input:checked  + .box > span.open {"
    + "    display: none;"
    + "}"
    + ".spoiler >  input +  .box >  span.open {"
    + "    padding: 0 10px 0 0;"
    + "    background-position: 100% -16px;"
    + "    background: url('http://worldoftanks.ru/static/3.11.1.1/common/css/block/b-link/img/vertical-arrow.png') 100% 2px no-repeat;"
    + "    display: inline;"
    + "}"
    + ".spoiler blockquote,"
    + ".spoiler{"
    + "    padding:0.5em;"
    + "    border-radius:15px;"
    + "    -webkit-border-radius:15px;"
    + "    -khtml-border-radius:15px;"
    + "    -moz-border-radius:15px;"
    + "    -o-border-radius:15px;"
    + "    -ms-border-radius:15px;"
    + "}"
    + ".spoiler {"
    + "    overflow-x:hidden;"
    + "    overflow-y:hidden;"
    + "    box-shadow: 0px 1px 8px #F2534A;"
    + "    border:#f25322 solid 1px;"
    + "    -webkit-box-shadow:0px 1px 8px #F2534A;"
    + "    -khtml-box-shadow:0px 3px 8px #F2534A;"
    + "    -moz-box-shadow:0px 1px 8px #F2534A;"
    + "    -ms-box-shadow:0px 1px 8px #F2534A;"
    + "}"
    + ".spoiler blockquote {"
    + "   margin-top:12px;"
    + "   min-height: 23px;"
    + "   border:#CDCDCD 2px dashed;"
    + "}"
    + " </style>";
	
	EnhanceGeneralStat(lang, AllBattles, AllWins, AllFails, AllFrags, AllSurvived, AllGroundTargets, AllHelp, AvgXp, AllAvgLev);
	
	/*var th = document.createElement('th');
	var yd = document.getElementsByTagName('th');
	th.className = "right";
	th.innerHTML = (lang == "ru") ?"% побед" : "win%";
	
	trth = yd[yd.length-1].parentNode;

	trth.innerHTML = "<th>" + (lang == "ru"?"Уровень":"Level") + "</th>" + trth.innerHTML.replace(2,1);
	
	trth.appendChild(th);
    
	trth.innerHTML = trth.innerHTML.replace(/<th>/gm,"<th><div onclick='sortTd(this,0)' style = 'cursor: pointer'>")
	trth.innerHTML = trth.innerHTML.replace(/<th class="right"/gm,'<th class="right"><div onclick="sortTd(this,0)" style = "cursor: pointer"');
	trth.innerHTML = trth.innerHTML.replace(/<\/th>/gm,'</div></th>');
	
	yd = document.getElementsByTagName('td');
	for (i = 0; i < yd.length; i++) {
		if( yd[i].className.indexOf("td-armory-icon") > 1) {
			var wp = yd[i+3].innerHTML*100/yd[i+2].innerHTML;
			var td = document.createElement('td');
			
			td.className = "right value";
			td.innerHTML = col(wp,toFixed_n,false);
			yd[i].parentNode.appendChild(td);
		}
	}*/

	//th = document.createElement('th');	
	//th.innerHTML = "<div onclick='sortTd(this,0)' style = 'cursor: pointer;'>"+(lang == "ru"? "Тип" : "Type") +"</div>";
	//trth.insertBefore(th, trth.cells[0]);
	
	/*yd = document.getElementsByTagName('td');
	for (i = 0; i < yd.length; i++) {
		if( yd[i].className.indexOf("td-armory-icon")>1) {
			var b = toFl(yd[i+2].innerHTML);
			var w = toFl(yd[i+3].innerHTML);
			all_battles += b;
			all_wins += w;	

			if (yd[i].className.indexOf("js-ussr td-armory-icon")==0) 			{ussr_b += b; 	ussr_w += w; 	nat = 1;}
			else if (yd[i].className.indexOf("js-germany td-armory-icon")==0) 	{germany_b += b;germany_w+= w; 	nat = 2;}
			else if (yd[i].className.indexOf("js-usa td-armory-icon")==0) 		{usa_b += b; 	usa_w+= w; 		nat = 3;}
			else if (yd[i].className.indexOf("js-japan td-armory-icon")==0) 	{japan_b += b; 	japan_w += w; 	nat = 4;}

			levN = yd[i].getElementsByTagName('span')[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/g,"");
			if (platformLevels[levN]==undefined){
				platformLevels[levN] = new Object();
				platformLevels[levN].b = 0;
				platformLevels[levN].w = 0;
				platformLevels[levN].t = [];
				for (var j=0;j<6;j++){
					platformLevels[levN].t[j] = new Object();	
					platformLevels[levN].t[j].b = 0;
					platformLevels[levN].t[j].w = 0;
				}
			}
			platformLevels[levN].b += b;
			platformLevels[levN].w += w;
				
			ttN = 0;
			imgName = yd[i].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
			for (var j = 1; j<6 ; j++) {
				if (atype[j].indexOf(imgName)>=0) {		
					ttN = j;
					break;
				}	
			}
//
			wikilink = yd[i+1].getElementsByTagName("a")[0]
			if(wikilink!=undefined)
				yd[i+1].innerHTML =yd[i+1].innerHTML.replace('a class="b-gray-link" href', "a style='color:#"+(prem.indexOf(imgName)>=0?"ffc363":"babfba")+"' href")

			platformType = "t"+ttN;
			if (platformTypes[platformType] == undefined) {
				platformTypes[platformType] = new Object();
				platformTypes[platformType].b = 0;
				platformTypes[platformType].w = 0;
				platformTypes[platformType].n = [];
				for (var j=1;j<NatCount;j++) {
					platformTypes[platformType].n[j] = new Object();	
					platformTypes[platformType].n[j].b = 0;
					platformTypes[platformType].n[j].w = 0;
				}
			}
			platformTypes[platformType].b += b;
			platformTypes[platformType].w += w;
			platformTypes[platformType].n[nat].b += b;
			platformTypes[platformType].n[nat].w += w;
			platformLevels[levN].t[ttN].b +=b;
			platformLevels[levN].t[ttN].w +=w;

			var a =(w/b*100); 
			trPlatformTable = yd[i].parentNode;
			var tdProc = document.createElement("td");
			tdProc.className = "right value";
			tdProc.innerHTML = ""+col(a,2,false)+"%";
			trPlatformTable.appendChild(tdProc);
			
			var t = [];
			t[0] = trPlatformTable;
			t[1] = ttN;
			t[2] = imgName;
			t[3] = b;
			t[4] = w;
			trPlatform.push(t);
			yd[i].setAttribute("nat", nat);
			}
		} 
	}*/
	
	function GetBattleStat(gimmieData) {
		var genResults = document.getElementsByClassName("t-table-dotted")[0];
		var battleEff = document.getElementsByClassName("t-table-dotted")[1];
		var resText;
		var result;
		/*
		var battles = {
                    'max': {
                        'killed': '7',
                        'objects_destroyed': '8',
                        'total_assists': '3',
                        'killed_backgunner': '1',
                        'damage_dealt': '666',
                        'structure_damage': '14 030',
                        'objects_destroyed_rocket': '0',
                        'objects_destroyed_bomb': '4'
                    },
                    'average': {
                        'killed': '0.75',
                        'objects_destroyed': '0.32',
                        'total_assists': '0.22',
                        'killed_backgunner': '0.00',
                        'damage_dealt': '101.95',
                        'structure_damage': '682.92',
                        'objects_destroyed_rocket': '0.00',
                        'objects_destroyed_bomb': '0.22'
                    },
                    'total': {
                        'killed': '233',
                        'objects_destroyed': '101',
                        'total_assists': '67',
                        'killed_backgunner': '1',
                        'damage_dealt': '31 705',
                        'structure_damage': '212 388',
                        'objects_destroyed_rocket': '0',
                        'objects_destroyed_bomb': '67'
                    }
                }
		*/
        switch (gimmieData){
            case 'battles':
                resText = genResults.rows[0].cells[1].innerHTML;
                break
            case 'victories':
                resText = genResults.rows[1].cells[1].innerHTML;
                break
            case 'draws':
                resText = genResults.rows[2].cells[1].innerHTML;
                break
            case 'fails':
                resText = genResults.rows[3].cells[1].innerHTML;
                break
            case 'survived':
                resText = genResults.rows[4].cells[1].innerHTML;
                break
            case 'experience':
                resText = genResults.rows[5].cells[1].innerHTML;
                break
            case 'experienceMax':
                resText = genResults.rows[6].cells[1].innerHTML;
                break
            case 'frags':
                resText = battles.total.killed;
                break
            case 'ground':
                resText = battles.total.objects_destroyed;
                break
            case 'help':
                resText = battles.total.total_assists;
                break
            case 'ground':
                resText = battles.total.objects_destroyed;
                break
            case 'help':
                resText = battles.total.total_assists;
                break
            case 'damage':
                resText = battles.average.damage_dealt;
                break    
            default:
            	return(-1);
        }
		resText = resText.indexOf("span") > 0 ? resText.substr(0,resText.indexOf("span")) : resText;
		if (resText.indexOf("%)") > 0){
			resText = resText.substr(resText.indexOf("(")+1, resText.length-resText.indexOf("(")-4);
			//result = resText;
		}
		//result = toFl(resText);
			
		return (resText);
	}
    
    function GetBattleStatFromScriptVar(gimmieData){
		var rText;
		
		switch (gimmieData){
            case 'frags':
                rText = battles.total.killed;
                break
            case 'ground':
                rText = battles.total.objects_destroyed;
                break
            case 'help':
                rText = battles.total.total_assists;
                break
		}
		
		return (rText);
	}//GetBattleStatFromScriptVar
    
    function toFl(s){                 
		var a =""+s;
		return (parseFloat(a.replace(/[\D\.]/g,"")));
	}//toFl

	function EnhanceGeneralStat(language, battlesNum, winsNum, failsNum, airKills, survivedNum, groundTargets, airHelp, xpPoints, avgLevel){
		var genResults = document.getElementsByClassName("t-table-dotted")[0];
		var battleEff = document.getElementsByClassName("t-table-dotted")[1];
		var ft = document.getElementsByClassName("t-profile t-table-vehicle")[0];
		var resText = "http://forum.worldofwarplanes.ru/index.php?/topic/42016-";
		var effSquad, effFlyHigher;
		var tr, td;
		
		effSquad = ((toFl(airKills)/battlesNum + toFl(airHelp)/battlesNum/2)*10 + winsNum/10 + survivedNum/10 + toFl(groundTargets)/battlesNum*0.3).toFixed(toFixed_n);
        //(фраги + помощь + наземка / 2) / бои + %побед / 200 + %выживаний / 100 + средний опыт / 2500 + средний урон / 1000
		effFlyHigher =  ((toFl(airKills) + toFl(airHelp) + toFl(groundTargets)/2)/battlesNum + winsNum/200 + survivedNum/100 + toFl(xpPoints)/2500 + AvgDamag/1000).toFixed(toFixed_n);
        
		//toFl(genResults.rows[1].cells[1].innerHTML),toFixed_n
		genResults.rows[1].cells[1].innerHTML = "<b><i>" + col(winsNum,false) + "</i></b>"; 	//win percentage
		genResults.rows[3].cells[1].innerHTML = "<b><i>" + col(failsNum,true) + "</i></b>";	//fail percentage
		//squad.vg
		tr = document.createElement('tr');
		genResults.appendChild(tr);
		
		td = document.createElement('td');			
		td.className = "td-minor";
		td.innerHTML = ((language == "ru") ? "Рейтинг эффективности по " : "Efficiency rating according to ") + "<a href='"+resText+"'>squad.vg</a>";
		tr.appendChild(td);
		
		td = document.createElement('td');			
		td.className = "td-value";
		td.innerHTML = "<b><i>" + effSquad + "</i></b>";
		tr.appendChild(td);
		//flyhigher.ru
		resText = "http://flyhigher.ru";
		tr = document.createElement('tr');
		genResults.appendChild(tr);
		
		td = document.createElement('td');			
		td.className = "td-minor";
		td.innerHTML = ((language == "ru") ? "Рейтинг эффективности по " : "Efficiency rating according to ") + "<a href='"+resText+"'>flyhigher.ru</a>";
		tr.appendChild(td);
		
		td = document.createElement('td');			
		td.className = "td-value";
		td.innerHTML = "<b><i>" + effFlyHigher + "</i></b>";
		tr.appendChild(td);
	}//EnhanceGeneralStat
    
    /*function CalcAvgLev(prem) {
    	var avgL = 0,
            totalB = 0,
            platforms = document.getElementsByClassName("tr-tanks"),
            pbcount,
            plev,
            imgName,
            platformsLevels = {
                "I":1,
                "II":2,
                "III":3,
                "IV":4,
                "V":5,
                "VI":6,
                "VII":7,
                "VIII":8,
                "IX":9,
                "X":10,
            },
        
        for (var i=0; i<platforms.length; i++) {
            imgName = platforms[i].cells[0].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
            pbcount = toFl(platforms[i].cells[1].innerHTML);
            if (prem.indexOf(imgName)>=0) {
                platforms[i].cells[0].getElementsByTagName('a')[0].setAttribute('style', 'color: #ffc363 !important;');
            }
            plev = platformsLevels[platforms[i].cells[0].getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML];
            totalB += pbcount;
            avgL += plev * pbcount;
        }
        
        return avgL/totalB;
    }*/
    
	function setup_script (script_name) { // просто заменил копипасту на вызов функции, klensy
		var script = document.createElement("script");  
		script.type = "text/javascript";		
		script.textContent =  script_name.toString();
		document.body.appendChild(script);
	}//setup_script
    
	function sortTd(el,dir) {
		var p = el;
		while (p.tagName.toLowerCase() != "tbody") {
			if (p.tagName.toLowerCase() == "th"||p.tagName.toLowerCase() == "td")
				Index = p.cellIndex;
			p = p.parentNode;
		}
		tBody = p;	
		rows = tBody.rows;
		th = rows[0];
		sortar = [];
	
		for (var i = 1; i < rows.length; i++) {
			sortar[i] = [];
			sortar[i][0] = defkey(rows[i],Index);
			sortar[i][1] = rows[i];
		}
		if (el.onclick.toString().indexOf('"u"') > 0) {
			sortar.sort(_sort);
			el.setAttribute('onclick','sortTd(this, "d")');
		} 
		else {
			sortar.sort(_sortR);
			el.setAttribute('onclick','sortTd(this, "u")');
		}
		tBody.innerHTML = "";
		tBody.appendChild(th);
		for (var i = 0; i < sortar.length - 1; i++) {
			tBody.appendChild(sortar[i][1]);
		}

		function defkey(row,i) {//alert("Index = " + i);
			var levOrder = ["X","IX","VIII","VII","VI","V","IV","III","II","I"];
			//if (i >= 7) return parseFloat(row.cells[i].innerHTML.replace(/\D/g,"")) ; 
			if (i == 4) return parseFloat(row.cells[i].innerHTML.match(/>(.*)</)[1]) ; 
			if (i >= 2) return parseFloat(row.cells[i].innerHTML.replace(/\D/g,"")) ; 
			if (i == 0) return levOrder.indexOf( row.cells[i].getElementsByTagName("span")[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/,"") );
			return row.cells[i].innerHTML;
		}

		function _sort(a,b) {
			a = a[0];
			b = b[0];
			return (a > b) ? -1 : 1;
		}

		function _sortR(a,b) {
			a = a[0];
			b = b[0];
			return (a > b) ? 1 : -1;
		}

	}//sortTd
	
	function col(v1, inv) {
		if(isNaN(v1)) return "x";
		var color = "90ffff";
        if (inv) {var v = 100 - v1;} else {v=v1}
		if (v<101) color="D042F3";
		if (v<63.9) color="02C9B3" 
		if (v<56.7) color="60FF00"
		if (v<51.9) color="F8F400"
		if (v<48.8) color="FE7903"
		if (v<46.3) color="FE0E00"

		return "<font color='"+color+"'>"+v1+"%</font>";
	}//col
	
	function col2(v) {
		if (isNaN(v)) v = 0;
		var color = "D042F3";
		if (v<15) color="02C9B3"
		if (v<10) color="60FF00"
		if (v<5) color="F8F400"
		if (v<0) color="FE7903" 
		if (v<-5) color="FE0E00"     //красный
		v = v.toFixed(toFixed_n);
		if (v>=0) v = "+"+v;
		return "<font color='"+color+"'>"+v+"</font>";
	}//col2
}