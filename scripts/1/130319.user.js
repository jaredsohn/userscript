// ==UserScript==
// @name            SW-Slabi
// @author          FasoMaso (compilation version) Originals by unknow
// @description     Sofiawars 
// @namespace       *
// @version         0.1.1 (07.04.2012)
// @include         http://*sofiawars.com/*
// @exclude         http://www.sofiawars.com/thimble/*
// @exclude         http://www.sofiawars.com/player/1*
// @exclude         http://www.sofiawars.com/player/2*
// @exclude         http://www.sofiawars.com/player/3*
// @exclude         http://www.sofiawars.com/player/4*
// @exclude         http://www.sofiawars.com/player/5*
// @exclude         http://www.sofiawars.com/player/6*
// @exclude         http://www.sofiawars.com/player/7*
// @exclude         http://www.sofiawars.com/player/8*
// @exclude         http://www.sofiawars.com/player/9*
// @run-at          document-end
// ==/UserScript==

var healing_coeff = 0.75;        // Кога да се самолекува с сироп за 50 монети
var full_healing = 0.3;
var default_wait = 280;                // Wait timeout. Majors = 300, otherwise - 900
var additional_wait = [7,60];          // Additional timeout between fights. Lower and upper borders
var wait_health_ok = 6;                // Timeout if health is ok
var hide_in_metro = 0; 		       // Do mining
var digging_preference = 100;	      // Proximity that bot would go into metro
var dig_ok_chance = 0;                // Ore chance. No comments.
var do_rats_inmetro = 0;		// Kill rats in merto or flee
//var states = "%raider";        // %enemy
//var states = "%enemy";        // %spisak s wragowe
//var states = "%victim";        // %spisak s jertwi
//var states = "%weaker";
var states = "%level";
var do_petrics = 0; // Do nanopetrics
var ore_for_petrics = 5;
var money_for_petrics = 500;
var play_lottery = 0;
var lottery_cost = 510;
var lottery_entrance = 9200;		// Minimal amount of cash to go play
var play_lottery_spend_all = 1;		// Spend all money on lottery
var record_lottery_data = 1;		// Log lottery statistics
var at_war = 1; // Dali da wliza w grupowite boewe po wreme na woina
var do_rats = 0; // Dali da tarsi plahowe
var do_fights = 1; // Bitki obiknoweni
var do_fights_area = 0; // Bitki za protiwopostawiane
var stats_difference = 0.97;		// Allow victim to be 20% stronger then us
var raider_stats_difference = 0.97;		// Allow victim to be 20% stronger then us
var ratSearchDuration = 600;		// How long we have to search rat
var save_path = "c:\\";			// Where to save lottery logs
var hoursToSpend = 2000;		// Time to run, in hours
var z = 548;                            // Repetion count
var bottles_req = 5;			// Minimum amount of bottles neeeded
var bottles_max = 15;			// Maximum of bottles to keep
var bottle_price = 50;			// Self descriptive
var policeCriticalLevel = 50;		// Value in percent. 0 eq -5, 100 eq +5
var reduceCost = 300;			// Bribe size
var do_bribes  = 0;			// Podkupi
var hh_level_difference = 0;		// What levels add to list
var hh_timeout = 1;			// in hours
var do_Random = 0;			// Join Ranodm fights
var random_preference = 65;
var do_training = 0;
var max_wait_time = 370;		// Max timer wait in seconds
var show_ad = 0;


const main_host = "http://www.sofiawars.com";
const urls = ["/alley/",
	    "/square/",
	    "/home/",
	    "/clan",
	    "/shop",
	    "/police",
	    "/metro",
	    "/factory",
	    "/shop/section/tech/",
	    "/shop/section/cloth/",
	    "/shop/section/hats/",
	    "/shop/section/weapons/",
	    "/shop/section/pouches/",
	    "/shop/section/zoo/",
	    "/shop/section/other/",
	    "/shop/section/home/",
	    "/phone/contacts/",
	    "/phone/messages/", 
	    "/phone/logs/", 
	    "/phone/duels/"];

const stat_links = ["health", "strength", "dexterity", "resistance", "intuition", "attention", "charism"];
const stats_names = ["Здраве", "Сила", "Ловкост", "Издръжливост", "Хитрост", "Предпазливост", "Харизма"];
const stats_weight = [1.01, 1.21, 1.05, 1.21, 1.05, 0.94, 0.75];
var stats_vals = [];	 
var own_stats = 0;   

var DEBUG = 0;
const NOT_FOUND = "#EANF#";

if (do_fights == 1) { z = Math.floor(hoursToSpend * (3600 / default_wait));}
if (do_rats == 1) { z = Math.floor(hoursToSpend * (3600 / ratSearchDuration));}

var MyMacroCode;
var t1; // Время в бою
var t2; // После боя
var currHP;
var maxHP;
var jsNewLine="\n";
var retcode;            // Результат выполнения скрипта
var digCode;
var i = 0;            // Loop variable
var tmp;
var money;
var ore;
var bottles;
var healing_link;     // Actual link to use +50% bottle
var a_wantedLevel;
var self_level;	      // Actual level of character
var victim_list_accured = 0;
var collar_brought = 0;

function getRandomInt(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveToFile(folder, filename, out_string) {
 iimDisplay("logging:"+folder+filename+" : DATA:"+out_string);
 var code = "CODE:" + jsNewLine;
 code = code + "ADD !EXTRACT "+ out_string + jsNewLine;
 code = code + "SAVEAS TYPE=EXTRACT FOLDER="+folder+" FILE="+filename + jsNewLine;
 iimPlay(code); 
} 

// Found @ http://blog.stevenlevithan.com/archives/faster-trim-javascript
function trim (str) {
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}

function getMoney()
{ 
  var code="CODE: \n TAB T=1" + jsNewLine;
//  code = code + "URL GOTO=http://www.sofiawars.com/player/" + jsNewLine;
  code += "TAG POS=1 TYPE=LI ATTR=CLASS:tugriki-block&&TXT:* EXTRACT=TXT" + jsNewLine;
  code += "TAG POS=1 TYPE=LI ATTR=CLASS:ruda-block&&TXT:* EXTRACT=TXT" + jsNewLine;
  code += "TAG POS=1 TYPE=A ATTR=CLASS:name&&TXT:* EXTRACT=TXT" + jsNewLine;

  iimPlay(code);

  money = iimGetLastExtract(1).replace(",","");
  ore = trim(iimGetLastExtract(2));
  var m = iimGetLastExtract(3);
  self_level = Number(m.substring(m.indexOf("[")+1,m.indexOf("]")));
  
  getOwnStats();
}

function getBottles() {
var code="CODE: \n TAB T=1" + jsNewLine;
code = code + "URL GOTO=http://www.sofiawars.com/player/" + jsNewLine;
code = code + "TAG POS=1 TYPE=IMG ATTR=SRC:/@/images/obj/drugs5.png" + jsNewLine;
code = code + "TAG POS=R1 TYPE=DIV ATTR=TXT:* EXTRACT=TXT" + jsNewLine;
code = code + "TAG POS=R1 TYPE=DIV ATTR=TXT:* EXTRACT=HTM" + jsNewLine;

var a = iimPlay(code);

if (a > 0) {
 bottles = iimGetLastExtract(1).replace("#","");
 var tmp = iimGetLastExtract(2);
 if(typeof(bottles) === 'undefined' || bottles == null) { bottles = 0; }
 var matching = "document.location.href='";
 tmp = tmp.substring(tmp.indexOf(matching)+matching.length,tmp.indexOf("';\""));
 healing_link = tmp;
  }
 else {iimDisplay(iimGetLastError());}
}


function doSleep(amount) {
 var tmpCode = "CODE:" + jsNewLine;
 tmpCode += "WAIT SECONDS=" + amount;
 iimPlay(tmpCode);
}

function doWar() {
 var tmpCode = "CODE:" + jsNewLine;
 tmpCode += "URL GOTO=http://www.sofiawars.com/alley/" + jsNewLine;
 tmpCode += "TAG POS=1 TYPE=H3 ATTR=TXT:Война" + jsNewLine;
 tmpCode += "TAG POS=1 TYPE=BUTTON ATTR=TXT:Ще<SP>участвам<SP>в<SP>битката" + jsNewLine;
 tmpCode += "WAIT SECONDS="+getRandomInt(2,10) + jsNewLine;
 tmpCode += "TAG POS=1 TYPE=BUTTON ATTR=TXT:OK" + jsNewLine;
 var tmp_retcode = iimPlay(tmpCode);
 if (tmp_retcode > 0) { doSleep(300); }; 
}

function do_fights_area_proc(inCombat)
{ 
  var Fight = "CODE:" + jsNewLine;
	Fight = Fight + "URL GOTO=http://www.sofiawars.com/alley/search/npc/" + jsNewLine;
	
	iimPlay(Fight);

  Fight = "CODE:" + jsNewLine;
  Fight = Fight + "TAG POS=2 TYPE=DIV ATTR=TXT:Нападни!" + jsNewLine;
  Fight = Fight + "WAIT SECONDS="+ inCombat + jsNewLine;    // Need to be in combat for some time
  Fight = Fight + "URL GOTO=http://www.sofiawars.com/alley/" + jsNewLine;   
  
  var tmp_retcode = iimPlay(Fight);
  if (tmp_retcode < 0) { iimDisplay(iimGetLastError()); };
}

function doHealing() {
 iimDisplay("Healing");
 var tmpCode = "CODE:" + jsNewLine;
 tmpCode += "WAIT SECONDS=5"+ jsNewLine;
 iimDisplay("healing link:"+healing_link);
 tmpCode += "URL GOTO=http://www.sofiawars.com"+ healing_link + jsNewLine;
 tmpCode += "WAIT SECONDS="+getRandomInt(2,10) + jsNewLine;
 var tmp_retcode = iimPlay(tmpCode);
 if (tmp_retcode < 0) { iimDisplay(iimGetLastError()); }
 return tmp_retcode;
}

function doFullHealing() {
 iimDisplay("healing");
 var tmpCode = "CODE:" + jsNewLine;
 tmpCode += "URL GOTO= http://www.sofiawars.com/home/heal/" + jsNewLine;;
 tmpCode += "WAIT SECONDS="+getRandomInt(2,10) + jsNewLine;;
 var tmp_retcode = iimPlay(tmpCode) + jsNewLine;;
 if (tmp_retcode < 0) {doSleep(10); iimDisplay(iimGetLastError()); }
}

function getHealth() {
 var getHealthCode = "CODE:" + jsNewLine;
 getHealthCode = getHealthCode + "URL GOTO=http://www.sofiawars.com/alley/" + jsNewLine;
 getHealthCode = getHealthCode + "TAG POS=1 TYPE=SPAN ATTR=ID:currenthp EXTRACT=TXT" + jsNewLine;
 getHealthCode = getHealthCode + "TAG POS=1 TYPE=SPAN ATTR=ID:maxhp EXTRACT=TXT" + jsNewLine;
 var tmp_retcode = iimPlay(getHealthCode);
 if (tmp_retcode < 0) { iimDisplay(iimGetLastError()); } else {
  currHP = iimGetLastExtract(1);
  maxHP = iimGetLastExtract(2); }
}

function searchRaider()
{
  var code = "CODE:"  + jsNewLine;
   code += "URL GOTO=http://www.sofiawars.com/alley/" + jsNewLine;
   code += "TAG POS=1 TYPE=H3 ATTR=TXT:Търсене<SP>на<SP>съперник" + jsNewLine;
   code += "TAG POS=R2 TYPE=DIV ATTR=TXT:Търсене*" + jsNewLine;
   iimPlay(code);
}

function searchByCriteria(criteria, min, max, inCombat) {
  var tmp_stat_diff = stats_difference;
  if (criteria == "%level--") { searchByLevel(6,6); } 
  else if (criteria == "%raider") { 
    stats_difference = raider_stats_difference;
    searchRaider(); } 
  else {
    var Fight = "CODE:" + jsNewLine;
	  Fight = Fight + "URL GOTO=http://www.sofiawars.com/alley/" + jsNewLine;
	  Fight = Fight + "TAG POS=1 TYPE=SELECT FORM=ACTION:/alley/search/type/ ATTR=NAME:type CONTENT=%weak" + jsNewLine;
	  //Fight = Fight + "TAG POS=1 TYPE=SELECT FORM=ACTION:/alley/search/type/ ATTR=NAME:type CONTENT=%victim" + jsNewLine;
	  //Fight = Fight + "TAG POS=1 TYPE=SELECT FORM=ACTION:/alley/search/type/ ATTR=NAME:type CONTENT=%enemy" + jsNewLine;
	  Fight = Fight + "TAG POS=2 TYPE=DIV ATTR=TXT:Търсене*" + jsNewLine;
	  iimPlay(Fight);
   }
   doFight(inCombat);
   stats_difference = tmp_stat_diff;
}

function doFight(inCombat) {
  iimDisplay("Fighting");
  var attack_attempts = 0;
  
  
  // be sure that we aren't attacking Chuck
  var es = -1;
  var enemy_found = -1;
  while (attack_attempts <= 15) {
   attack_attempts++;
   if ((es = getEnemyStats()) > stats_difference * own_stats) {
   var find_next = "CODE:" + jsNewLine;
   find_next += "SET !ERRORIGNORE YES" + jsNewLine;
   find_next += "SET !TIMEOUT_TAG 3" + jsNewLine;
   find_next += "TAG POS=2 TYPE=DIV ATTR=TXT:Търси<SP>друг";
   iimPlay(find_next);
   iimDisplay("This guy is too high for us :(. "+es+" vs "+(stats_difference * own_stats)); }
   else { enemy_found = 1;  break;}
  }
  
  if (enemy_found == -1) {
      Fight = "CODE:" + jsNewLine;
      Fight += "TAG POS=2 TYPE=DIV ATTR=TXT:Назад" + jsNewLine;
  } else {  
    Fight = "CODE:" + jsNewLine;
    Fight = Fight + "TAG POS=2 TYPE=DIV ATTR=TXT:Нападни!" + jsNewLine;
    Fight = Fight + "WAIT SECONDS="+ inCombat + jsNewLine;    // Need to be in combat for some time
    Fight = Fight + "URL GOTO=http://www.sofiawars.com/alley/" + jsNewLine;   }
  
  var tmp_retcode = iimPlay(Fight);
  if (tmp_retcode < 0) { iimDisplay(iimGetLastError()); };
  return tmp_retcode; 
}

function doPetrics(v_money, v_ore) {
 iimDisplay("Doing petrics");
 if ((v_money>=money_for_petrics)&&(v_ore>=ore_for_petrics)) { 
   var petricCode = "CODE:"+ jsNewLine;
   petricCode = petricCode + "URL GOTO=http://www.sofiawars.com/factory/" + jsNewLine;
   petricCode = petricCode + "TAG POS=1 TYPE=BUTTON ATTR=TXT:Започни<SP>преработка<SP>—<SP>5<SP>+<SP>500" + jsNewLine;
   petricCode = petricCode + "WAIT SECONDS="+getRandomInt(5,15);
   var retcode = iimPlay(petricCode);
   if (retcode < 0) { iimDisplay(iimGetLastError()); };
  } else { iimDisplay("Need more resourses to do petrics"); }
}

function searchRat(tx2)
{
 iimDisplay("Searching for rat");
 var tmpCode = "CODE:"+jsNewLine;
 tmpCode +="URL GOTO=http://www.sofiawars.com/metro/" + jsNewLine;
 tmpCode +="TAG POS=2 TYPE=DIV ATTR=TXT:Опитай<SP>да<SP>откриеш<SP>Плъхотрол" + jsNewLine;
 tmpCode +="WAIT SECONDS="+(tx2 + getRandomInt(5,12)) + jsNewLine;
  iimDisplay("Kavabunga !");
 tmpCode += "URL GOTO=http://www.sofiawars.com/metro/" + jsNewLine;
 tmpCode += "TAG POS=1 TYPE=BUTTON ATTR=TXT:Нападни<SP>звяра";
  var retcode = iimPlay(tmpCode);
  if (retcode < 0) { 
   iimDisplay(iimGetLastError()); 
   tmpCode = "CODE:" + jsNewLine;
  //  tmpCode += "URL GOTO=http://www.sofiawars.com/metro/" + jsNewLine;
  tmpCode += "TAG POS=1 TYPE=BUTTON ATTR=TXT:Мъжествено<SP>бягство" + jsNewLine;
   iimPlay(tmpCode);   
  }
}

function getWantedLevel() {
var code="CODE: \n TAB T=1" + jsNewLine;
code = code + "URL GOTO=http://www.sofiawars.com/player/" + jsNewLine;
code = code + "TAG POS=1 TYPE=DIV ATTR=CLASS:wanted EXTRACT=HTM" + jsNewLine;

var a = iimPlay(code);

if (a > 0) {
 var tmp = iimGetLastExtract(1);
 var tmp2 = tmp.indexOf("width")+6;
 tmp = tmp.substring(tmp2,tmp.indexOf("%",tmp2));
 //alert(tmp);
 a_wantedLevel = tmp;
 iimDisplay("Wanted level: "+ a_wantedLevel);
  }
 else {iimDisplay(iimGetLastError());}
 return a_wantedLevel;
}

function reduceWantedLevel() {
 var code="CODE: \n TAB T=1" + jsNewLine;
 code = code + "URL GOTO=http://www.sofiawars.com/police/" + jsNewLine;
   code = code + "TAG POS=2 TYPE=DIV ATTR=TXT:Дай<SP>подкуп<SP>—<SP>*" + jsNewLine;
// code = code + "TAG POS=2 TYPE=DIV ATTR=TXT:Дать<SP>взятку<SP>-<SP>"+reduceCost + jsNewLine;
 iimPlay(code);
}

function checkForLevel()
{
 var code="CODE: \n TAB T=1" + jsNewLine;
 code = code + "URL GOTO=http://www.sofiawars.com/quest/" + jsNewLine;
 code = code + "TAG POS=1 TYPE=BUTTON ATTR=TXT:Напред,<SP>към<SP>нови<SP>победи!" + jsNewLine;
 iimPlay(code);
}

function getVictimList(target_lvl)
{
 //TAG POS=1 TYPE=TD ATTR=CLASS:yfnc_tablehead1&&TXT:* EXTRACT=TXT
 var m = "<span class=\"level\">[";
 var attk_lnk = "a class=\"f\" href=\"";
 var i; var z;
 var result;
 var victim_list = [];
 // First of all get total amount of pages
 // <a class="num" href="/huntclub/wanted/page/2/">2</a><a class="num" href="/huntclub/wanted/page/3/">3</a>…<a class="num" href="/huntclub/wanted/page/15/">15</a>
 var code="CODE: \n TAB T=1" + jsNewLine;
/* code += "URL GOTO=http://www.sofiawars.com/huntclub/wanted/page/1/" + jsNewLine;
 code += "TAG POS=1 TYPE=A ATTR=CLASS:num" + jsNewLine;
 code += "TAG POS=R2 TYPE=A ATTR=CLASS:num EXTRACT=TXT" + jsNewLine;
 iimPlay(code); */
// alert(iimGetLastExtract(1));
 var hh_pages = 9;//iimGetLastExtract(1);
 for (z = 1;z<hh_pages; z++)
 { 
    var code="CODE: \n TAB T=1" + jsNewLine;
	code += "URL GOTO=http://www.sofiawars.com/huntclub/wanted/page/"+z+"/" + jsNewLine;
	result = iimPlay(code);
	if (result < 0) {return;}
  for (i=1;i<=20;i++)
  {    	
  	code =  "CODE: \n TAB T=1" + jsNewLine;
    	code += "TAG POS="+i+" TYPE=TD ATTR=CLASS:name&&TXT:* EXTRACT=HTM" + jsNewLine;
    	code += "TAG POS="+i+" TYPE=TD ATTR=CLASS:name&&TXT:* EXTRACT=TXT" + jsNewLine;
    	code += "TAG POS="+i+" TYPE=TD ATTR=CLASS:action&&TXT:* EXTRACT=TXT";
    	result = iimPlay(code);
    	if (result < 0) {return;}
    	var lvl = iimGetLastExtract(1);
    	if (lvl == NOT_FOUND) {break;}
    	if (iimGetLastExtract(3) !== "Атакувай") {iimDisplay("skipping"); continue;}
	var victim_name = iimGetLastExtract(2).substring(0,iimGetLastExtract(2).indexOf("["));
	
    	var c = iimGetLastExtract(2);
    	
    	lvl = lvl.substring(lvl.indexOf(m)+ m.length,lvl.indexOf("]</span>"));
//    	c = c.substring(c.indexOf(attk_lnk)+attk_lnk.length, c.indexOf("\"><i class=\"rl\">"));
    	if (lvl >= target_lvl) { iimDisplay("Adding: "+victim_name); victim_list.push(victim_name); }
   }
  }
  
  iimDisplay("Adding "+victim_list.length+" victims");
  for (i=0;i<victim_list.length;i++)
  {
  	//addVictim(victim_list[i], 0);
  	addEnemy(victim_list[i]);
  }
}

function addEnemy(name_x)
{
   visitURL("http://www.sofiawars.com/phone/contacts/enemies/",0,2);
   postUrl("http://www.sofiawars.com/phone/contacts/add/", "name="+name_x+"&info=&type=enemy");
}

var xmlHttp=createXmlHttpRequestObject();
function createXmlHttpRequestObject()
{
	var xmlHttp;
	
	try
	{
		xmlHttp=new XMLHttpRequest();
	}
	catch(e)
	{
		var XMLHttpVersions=new Array("MSXML2.XMLHTTP.6.0",
									  "MSXML2.XMLHTTP.5.0",
									  "MSXML2.XMLHTTP.4.0",
									  "MSXML2.XMLHTTP.3.0",
									  "MSXML2.XMLHTTP",
									  "Microsoft.XMLHTTP");
		for (var i=0; i<XmlHttpVersions.length && !xmlHttp; i++)
		{
			try
			{
				xmlHttp= new ActiveXObject(XmlHttpVersions[i]);
			}
			catch(e) {}
		}
	}
	if (!xmlHttp)
		alert("error of creating XMLHttpRequest");
	else
		return xmlHttp;
}


function postUrl(path, params)
{

  var req = new XMLHttpRequest();
    if (xmlHttp)
    {    
        try
        {
            xmlHttp.open("POST", path, true);
            xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlHttp.onreadystatechange = data_obr;
            xmlHttp.send(params);   
        }
        catch (e)
        {
            alert("Не удалось соединиться с сервером:\n" + e.toString());    
        }  
    }
}

function data_obr()
{
    if (xmlHttp)
    {
        if(xmlHttp.onreadystatechange == 4)
        {
            alert(xmlHttp.responseText); 
        }
    }
}

function clearEnemyList()
{
   result = 1;
   do {
	   var code="CODE: \n TAB T=1" + jsNewLine;
	   code += "URL GOTO=http://www.sofiawars.com/phone/contacts/enemies/" + jsNewLine;
	   code += "TAG POS=1 TYPE=H3 ATTR=TXT:*Врагове* EXTRACT=TXT" + jsNewLine;
	   code += "TAG POS=R1 TYPE=A ATTR=CLASS:f EXTRACT=HTM" + jsNewLine;
	   //code += "WAIT SECONDS=5";
		
	   result = iimPlay(code);
	   var s = iimGetLastExtract(2);

	   var p = s.indexOf("phoneConfirmDeleteContact") + 26;
	   s = s.substring(p,s.indexOf(");\">")).replace(/\'/g, '');
           var fields = s.split(',');

           postUrl("http://www.sofiawars.com/phone/contacts/","action=delete&id="+fields[1]+"&nickname="+fields[0]+"&type=contact");
	   //count_z = iimGetLastExtract(1).substring(iimGetLastExtract(1).indexOf("(")+1, iimGetLastExtract(1).indexOf(")"));
   } while (s != NOT_FOUND)
}

function removeOrder()
{
  var code="CODE: \n TAB T=1" + jsNewLine;
  code += "URL GOTO=http://www.sofiawars.com/player" + jsNewLine;
  code += "TAG POS=1 TYPE=A ATTR=TXT:откупиться EXTRACT=TXT" + jsNewLine;
  var r = iimPlay(code);
  var t = iimGetLastExtract(1);
  iimDisplay(t);
  if (t != NOT_FOUND) {
  	code =  "CODE: \n TAB T=1" + jsNewLine;
  	code += "URL GOTO=http://www.sofiawars.com/huntclub/me/" + jsNewLine;
	code += "ONDIALOG POS=1 BUTTON=OK CONTENT=" + jsNewLine;
	code += "TAG POS=1 TYPE=BUTTON ATTR=TXT:Откупиться<SP>—<SP>*" + jsNewLine;
	code += "WAIT SECONDS=5" + jsNewLine;
	iimPlay(code);
  }
}

function joinRandomFight()
{
  var code="CODE: \n TAB T=1" + jsNewLine;
  code += "URL GOTO=http://www.sofiawars.com/alley/" + jsNewLine;
  code += "TAG POS=1 TYPE=BUTTON ATTR=TXT:Записване<SP>за<SP>битката<SP>в<SP>*" + jsNewLine;
  iimPlay(code);
  checkTimer();
}

function actualHealing()
{
  getHealth();
  if (currHP<(maxHP*full_healing)) { doFullHealing(); } else if (currHP<(maxHP*healing_coeff)) { doHealing(); }  
}

function visitURL(URL, delay_before, delay_after)
{
  var code = "CODE: \n TAB T=1" + jsNewLine;
  code += "WAIT SECONDS=" + delay_before + jsNewLine;
  code += "URL GOTO="+URL + jsNewLine;
  code += "WAIT SECONDS=" + delay_after + jsNewLine;
  iimPlay(code);
}

function MetroCode() {
 var MetroCode = "CODE:" + jsNewLine;
 MetroCode += "TAG POS=1 TYPE=A ATTR=HREF:http://www.sofiawars.com/square/" + jsNewLine;
 MetroCode += "TAG POS=2 TYPE=DIV ATTR=TXT:Метро" + jsNewLine;
 MetroCode += "TAG POS=2 TYPE=DIV ATTR=TXT:Спусни<SP>се<SP>в<SP>тунела" + jsNewLine;
 MetroCode += "WAIT SECONDS=10" + jsNewLine;
 MetroCode += "TAG POS=1 TYPE=TD ATTR=ID:metrodig EXTRACT=HTM";
 iimPlay(MetroCode);
 var timer = iimGetLastExtract(1);
 if ((timer != NOT_FOUND)&&(timer !=null))
 {   
   timer = Math.floor(timer.substring(timer.indexOf("timer2=")+8,timer.indexOf("id=")-2)*1.05);
    doSleep(Math.floor(timer*0.88));actualHealing();
    timer = Math.floor(timer*0.10);
   MetroCode = "CODE:" + jsNewLine;
   MetroCode += "URL GOTO=http://www.sofiawars.com/metro/" + jsNewLine;
   MetroCode += "WAIT SECONDS="+(timer - 10) + jsNewLine;
   if (do_rats_inmetro == 1) {
//    <div class="text clear" id="welcome-rat" style="display:none;">
     //MetroCode += "TAG POS=1 TYPE=DIV ATTR=ID:welcome-rat&&ATTR:STYLE:display:none"+ jsNewLine; 
     MetroCode += "TAG POS=1 TYPE=BUTTON ATTR=TXT:Нападни<SP>звяра" + jsNewLine; 
     MetroCode += "WAIT SECONDS=7";
     iimPlay(MetroCode); 
      MetroCode = "CODE:" + jsNewLine; 
   }   
   MetroCode += "TAG POS=1 TYPE=BUTTON ATTR=TXT:Копай<SP>тук" + jsNewLine;
   MetroCode += "WAIT SECONDS=3";
   iimPlay(MetroCode);
 }
} 

function checkTimer()
{
	actualHealing();
  var code = "CODE:" + jsNewLine;
  code += "SET !ERRORIGNORE YES" + jsNewLine;
  code += "SET !TIMEOUT_TAG 3" + jsNewLine;
  code += "TAG POS=1 TYPE=A ATTR=ID:timeout EXTRACT=HTM" + jsNewLine;
  iimPlay(code);
  var timer = iimGetLastExtract(1);
  iimDisplay("timer: "+timer);
  timer = timer.substring(timer.indexOf("timer") + 7,timer.indexOf("endtime=")-2);
  if (timer == null) {timer = max_wait_time-1; }
  if (timer > 0) {  
    if (timer > max_wait_time) {timer = max_wait_time;}
    timer = timer * 0.96;
    //timer = timer * 0.12;
    doSleep(timer);
  }
}

function checkPolice()
{
  var result = -1;
  var Code = "CODE:" + jsNewLine;
  Code += "TAG POS=1 TYPE=A ATTR=HREF:http://www.sofiawars.com/square/" + jsNewLine;
  Code += "WAIT SECONDS=2"+ jsNewLine;
  Code += "TAG POS=2 TYPE=DIV ATTR=TXT:Полиция" + jsNewLine;
  Code += "WAIT SECONDS=3"+ jsNewLine;
  Code += "TAG POS=1 TYPE=P ATTR=TXT:Уреди<SP>се<SP>с<SP>връзки* EXTRACT=TXT" + jsNewLine;

  iimPlay(Code);
  var t = iimGetLastExtract();
  if (t == NOT_FOUND) { result = 0; } else { result = 1;}
  return result;
}

function getOwnStats()
{
  own_stats = 0
  var code = "CODE:" + jsNewLine;
//  code += "URL GOTO=http://www.sofiawars.com/player/" + jsNewLine;
  iimPlay("CODE: URL GOTO=http://www.sofiawars.com/player/");
  code += "TAG POS=1 TYPE=B ATTR=TXT:#stat#" + jsNewLine;
  code += "TAG POS=R1 TYPE=SPAN ATTR=TXT:* EXTRACT=TXT" + jsNewLine;
  for (var i=0; i<stats_names.length; i++)
  {
    var workCode = code.replace("#stat#", stats_names[i]);    
    iimPlay(workCode);
    var c_x = iimGetLastExtract(1);    
    if (c_x == NOT_FOUND) {break;} else {stats_vals[i] = c_x; own_stats += Number(c_x) * stats_weight[i];}
  }
}

function getEnemyStats()
{
 // stat_vals.length = -1; // Clear stats 
  var enemy_strength = 0;
  var code = "CODE:" + jsNewLine;
  code += "TAG POS=1 TYPE=TD ATTR=CLASS:fighter2-cell" + jsNewLine;
  code += "TAG POS=2 TYPE=B ATTR=TXT:#stat#" + jsNewLine;
  code += "TAG POS=R1 TYPE=SPAN ATTR=TXT:* EXTRACT=TXT" + jsNewLine;

  for (var i=0; i<stats_names.length; i++)
  {
    var workCode = code.replace("#stat#", stats_names[i]);    
    var result = iimPlay(workCode);
    if (result < 0) {return -1;}
    var c_x = iimGetLastExtract(1);
    if (c_x == NOT_FOUND) {return -1;} 
    enemy_strength += Number(c_x) * stats_weight[i];
  }
  return enemy_strength;
}

function swapItem(newItemId)
{
  visitURL(main_host+"/player/dress/"+newItemId,0,1);
}

function showAd()
{
  alert("If you like this script you could submit a small donation.\n"+
  	"It would be used to buy majority, and improving this script.\n\n"+
  	"Webmoney : R695577495756\n\n"+
  	"(if you don't like this AD you could disable it in preferenses)");
}

function searchByLevel(min, max)
{
   var code = "CODE:"  + jsNewLine;
   code += "URL GOTO=http://www.sofiawars.com/alley/" + jsNewLine;
   code += "TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:/alley/search/level/ ATTR=NAME:minlevel CONTENT="+min + jsNewLine;
   code += "TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:/alley/search/level/ ATTR=NAME:maxlevel CONTENT="+max + jsNewLine;
   code += "TAG POS=2 TYPE=DIV ATTR=TXT:Търси<SP>противник<SP>—<SP>1" + jsNewLine;
   iimPlay(code);
}

// MetroCode = "CODE:";
// MetroCode = MetroCode + "URL GOTO=http://www.sofiawars.com/metro/" + jsNewLine;
// MetroCode = MetroCode + "TAG POS=2 TYPE=DIV ATTR=TXT:Спуститься<SP>в<SP>туннель" + jsNewLine;
// MetroCode = MetroCode + "WAIT SECONDS=" + dig_timeout + jsNewLine;
// MetroCode = MetroCode + "TAG POS=1 TYPE=B ATTR=ID:ore_chance EXTRACT=TXT";

if (show_ad == 1) {showAd();}

var dd = new Date();

for (i=0; i< z; i = i+1)
{
    //checkTimer();
    t1=getRandomInt(5,12);
    t2=default_wait+getRandomInt(additional_wait[0],additional_wait[1]) - t1;
    dd = new Date();
    

    getHealth(); getBottles(); getMoney();
    //removeOrder();
    
    
    if (bottles < bottles_req) { var tmp = Math.floor(money / bottle_price);
     if (tmp > bottles_max) {tmp = bottles_max;} }

    if (do_fights == 1) { {
        actualHealing();
        searchByCriteria(states, self_level, self_level, t1); }
      getMoney();
       if ((getWantedLevel() >= policeCriticalLevel)&&(do_bribes == 1)) { if(money >= reduceCost) { reduceWantedLevel();} else 
       { do
         {
           //if (checkMiningPick() == 0) {buyKirka(money);} 
           MetroCode();          
         }
         while ( getWantedLevel() >= policeCriticalLevel )
       }
      }
    }
    
    if (do_fights_area == 1) 
    { 
      actualHealing();
      do_fights_area_proc(t1);
    }
    
    //roamAround(2,4);
    if (at_war == 1)  { doWar(); }      
    if ((do_Random == 1)&&(getRandomInt(0,100) < random_preference)) { actualHealing(); joinRandomFight(); }
    
    if (do_petrics == 1) {getMoney(); doPetrics(money, ore); }
    // If petrics triggered, then amount of money could be changed
    
    var p_t = getRandomInt(1,100);
    if ((hide_in_metro == 1) && (p_t < digging_preference))
     { iimDisplay("We go mining: "+p_t);
       //if (checkMiningPick() == 0) {buyKirka(money);}
       MetroCode(); }
    // Fight is over. So checking if we have to do healing           
    actualHealing();
    
    if (do_rats == 1) { searchRat(ratSearchDuration); }

    doSleep(getRandomInt(2,15));
    
    iimDisplay("Cycle number: "+i);
    // Reset in one hour.
    dd = new Date();
    var zizza = dd.getMinutes();
    if ((zizza >=0)&&(zizza <=12)) { victim_list_accured = 0; collar_brought = 0; do_bribes = checkPolice();}
}

