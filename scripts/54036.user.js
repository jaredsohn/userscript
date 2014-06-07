// ==UserScript==
// @name           Ryo E's Awesome eRepublik Greasemonkey Script
// @version        0.37
// @namespace      http://www.erepublik.com/en/citizen/profile/1215707
// @description	   Does some random stuff on eRepublik. Mostly good stuff.
// @author         Ryo E
// @include        http://www.erepublik.com/*
// ==/UserScript==

// To change settings, click Community -> Tools -> Ryo E's Awesome eRepublik Greasemonkey Script

//Default settings:
const plato_jones = false;
const fix_wiki_links = true;
const search_redirect = true;
const auto_subscribe = true; // Not to be confused with autoSubscribe or AutoSubscribe (confusing, I know)
const comment_sub = true;
const no_presentation = true;
const in_game_settings = true;
const next_train = true;
const next_work = true;
const next_hw = true;
const comments_link = true;

const autoSubscribe = false; // Not to be confused with auto_subscribe or AutoSubscribe (confusing, I know)
const HWDaysToGo = false;

var citizenID;

// re: Which page(s) the function should be executed on
// fu: Function to execute
// en: The name of the default settings variable (and greasemonkey value)
// name, desc: Shown on the tools page
// loggedout: Whether it should run if the user is logged out
var features = [
{"re":/.*/, "fu":FixWikiLinks, "en":"fix_wiki_links", "name":"Fix Wiki Links", "desc":"Fixes the in-game links to the eRepublik Wiki.", "loggedout":true},
{"re":/^\/search/, "fu":SearchRedirect, "en":"search_redirect", "name":"Search Redirect", "desc":"If there is only one search result, you will automatically be redirected to that player/org.", "loggedout":true},
{"re":/^\/(newspaper|article)\//, "fu":AutoSubscribe, "en":"auto_subscribe", "name":"Auto-Subscribe", "desc":"Viewing a newspaper or article will subscribe you to that newspaper. This can be switched on/off while viewing a newspaper by clicking the Auto Sub button beneath the Subscribe button."},
{"re":/^\/article\//, "fu":CommentsSubscribe, "en":"comment_sub", "name":"Comments Subscribe", "desc":"By leaving a comment on an article, you will automatically be subscribed to the comments of the article."},
{"re":/.*/, "fu":PlatoJones, "en":"plato_jones"},
{"re":/^\/elections\/country-\d+-election-congress-(\d+-)?date-\d+-\d+-region-\d+/, "fu":NoPresentation, "en":"no_presentation", "name":"Fix Presentation Links", "desc":"Fixes an eRepublik bug on the elections page which shows links to congress candidates' presentations even if they don't have one."},
{"re":/^\/(badges|rss_menu)/, "fu":GoGoGadgetSettings, "en":"in_game_settings", "loggedout":true},
{"re":/^\/my-places\/army/, "fu": NextTrain, "en":"next_train", "name":"Strength After Next Train", "desc":"Displays on the army page what your strength will be after the next time you train."},
{"re":/^\/company/, "fu": NextWork, "en":"next_work", "name":"Skill After Next Work", "desc":"Displays on the company page what your skill will be after the next time you work."},
{"re":/^\/company/, "fu": NextHW, "en":"next_hw", "name":"Next Hard Worker medal", "desc":"Displays on the company page how many more days you must work until you receive a hard worker medal. Also shows when you're viewing your profile and you hover the cursor over your hard worker medal."},
{"re":/^\/citizen\/profile/, "fu": NextHW2, "en":"next_hw", "name":"", "desc":""},
{"re":/^\/article\//, "fu": CommentsLink, "en":"comments_link", "name":"Fix #comments", "desc":"Fixes an eRepublik bug where the page doesn't scroll to the comments section when you're viewing an article and the URL ends in '#comments' (e.g. when you click the 'xx comments' link below the article title).", "loggedout":true}
];

var countries = [, 'Romania',,,,,,,, 'Brazil', 'Italy', 'France', 'Germany', 'Hungary', 'China', 'Spain',,,,,,,, 'Canada', 'USA',, 'Mexico', 'Argentina', 'Venezuela', 'United-Kingdom', 'Switzerland', 'Netherlands', 'Belgium', 'Austria', 'Czech-Republic', 'Poland', 'Slovakia', 'Norway', 'Sweden', 'Finland', 'Ukraine', 'Russia', 'Bulgaria', 'Turkey', 'Greece', 'Japan',, 'South-Korea', 'India', 'Indonesia', 'Australia', 'South-Africa', 'Moldavia', 'Portugal', 'Ireland', 'Denmark', 'Iran', 'Pakistan', 'Israel', 'Thailand',, 'Slovenia',, 'Croatia', 'Chile', 'Serbia', 'Malaysia', 'Philippines', 'Singapore', 'Bosnia-Herzegovina', 'Estonia', 'Latvia', 'Lithuania', 'North-Korea', 'Uruguay', 'Paraguay', 'Bolivia', 'Peru', 'Colombia'];
var industries = [,'Food','Gift','Weapon','Moving-Tickets','Grain','Diamonds','Iron','Oil','Wood','House','Hospital','Defense-System'];

var skill;

function subscribe(comments) //if comments==true, subscribe to comments - if not, subscribe to newspaper
{
 var newScript = document.createElement("script");
 newScript.type = "application/javascript";
 newScript.innerHTML = (comments?"subscribeToComments('subscribe');":"getSubscribers('subscribe', 0);");
 document.body.appendChild(newScript);
}

function getGMVal (name)
{
 return ((GM_getValue(citizenID+"."+name) == undefined) ? eval(name) : (GM_getValue(citizenID+"."+name)));
}

function setGMVal (name, value)
{
 GM_setValue(citizenID+"."+name, value);
}

function deleteGMVal (name)
{
 GM_deleteValue(citizenID+"."+name);
}

///// Fix links to eRepublik wiki /////
function FixWikiLinks()
{
 var links = document.getElementsByTagName("a");
 var reu = /^http:\/\/wiki.erepublik.com\/index.php\/(Citizen|Company|Country|Newspaper|Party|Region)_/;
 for (x in links)
 {
  if (!reu.test(links[x].href)) continue;
  var newhref;
  if (/\/Region_/.test(links[x].href)) newhref = "http://wiki.erepublik.com/index.php/" + document.title.replace("eRepublik Region | ","");
  else newhref = links[x].href.replace(reu,"http://wiki.erepublik.com/index.php/");
  links[x].href = newhref.replace(/\s|%20/g,"_").replace(/^\s*|\s*$/g,""); //clean up the wiki link
 }
}

///// If there is only one search result, redirect to that player/org /////
function SearchRedirect()
{
 var entities = document.getElementsByClassName("entity")
 if (entities.length==1)
 {
  entities[0].parentNode.parentNode.parentNode.innerHTML += "<tr><td colspan='4' style='text-align:center;padding:10px'>Redirecting...</td></tr>"
  location.assign(entities[0].getElementsByTagName("a")[0].href);
 }
}

///// Subscribe to newspapers by viewing them. Woooo. /////
function AutoSubscribe()
{
 if(document.getElementsByClassName("subscribeToNewspaper").length) //I'm assuming you don't want to subscribe to your own paper
 {
  if (getGMVal("autoSubscribe")&&document.getElementsByClassName("subscribeToNewspaper")[0].style.display != "none") subscribe(false);
  var coolStory = document.createElement("a");
  coolStory.href = "#";
  coolStory.className = "goright";
  coolStory.id = "autosuba";
  coolStory.innerHTML = "Auto Sub is O" + (getGMVal("autoSubscribe")?"n":"ff");
  coolStory.addEventListener("click",
   function() //Toggle autosubscribe on/off
   {
    setGMVal("autoSubscribe", !getGMVal("autoSubscribe"));
    this.innerHTML = "Auto Sub is O" + (getGMVal("autoSubscribe")?"n":"ff");
    if (getGMVal("autoSubscribe")&&document.getElementsByClassName("subscribeToNewspaper")[0].style.display != "none") subscribe(false);
   },
   false);
  document.getElementById("subscribers").parentNode.appendChild(coolStory);
 }
}

///// Subscribe to comments by commenting. Woooo. /////
function CommentsSubscribe()
{
 document.getElementsByClassName("submitpost")[0].addEventListener("submit", function(){subscribe(true)}, false);
}

///// /////
function PlatoJones()
{
 GM_addStyle("#advisor {background:transparent url(http://i31.tinypic.com/ejt15w.jpg) no-repeat scroll 0 0}");
}

///// Fixes a bug which makes it seem like a congress candidate has a presentation when they really don't /////
function NoPresentation()
{
 var links = document.getElementsByTagName("a");
 for (x in links)
 {
  if (links[x].href==window.location&&links[x].innerHTML=='<span class="smalldotted">Presentation</span>')
  {
   links[x].firstChild.innerHTML = "No presentation";
   links[x].parentNode.insertBefore(links[x].firstChild,links[x]);
   links[x].innerHTML = "";
  }
 }
}

///// In-game settings /////
function savesettings()
{
 for(x in features)
 {
  if(!features[x].name||(!features[x].loggedout&&citizenID=="logged_out")) continue;
  enabled = (document.getElementById("togglebutton"+x).title=="Enabled");
  setGMVal(features[x].en, enabled);
 }
}
// Switch feature on/off
function togglefeature(ID)
{
 enabled = (document.getElementById(ID).title=="Enabled");
 if (enabled)
 {
  document.getElementById(ID).style.backgroundImage = "url(/images/parts/btn-weekly_off.gif)";
  document.getElementById(ID).title="Disabled";
 }
 else
 {
  document.getElementById(ID).style.backgroundImage = "url(/images/parts/btn-weekly_on.gif)";
  document.getElementById(ID).title="Enabled";
 }
}

// Show more/less info about a feature
function toggleinfo(x)
{
 moreinfo = document.getElementById("moreinfo"+x);
 infohere = document.getElementById("infohere"+x);
 if (moreinfo.innerHTML == "More info")
 {
  moreinfo.innerHTML = "Less info";
  infohere.innerHTML = features[x].desc;
 }
 else
 {
  moreinfo.innerHTML = "More info";
  infohere.innerHTML = "";
 }
}

function ScriptReset(resetindex)
{
 for(x in features)
 {
  if(!features[x].name) continue;
  deleteGMVal(features[x].en);
  if(eval(features[x].en))
  {
   document.getElementById("togglebutton"+x).style.backgroundImage = "url(/images/parts/btn-weekly_on.gif)";
   document.getElementById("togglebutton"+x).title="Enabled";
  }
  else
  {
   document.getElementById("togglebutton"+x).style.backgroundImage = "url(/images/parts/btn-weekly_off.gif)";
   document.getElementById("togglebutton"+x).title="Disabled";
  }
 }
 if(resetindex==0) return;
 GMVals = GM_listValues();
 if(resetindex==1)
 {
  for(x in GMVals)
   if(GMVals[x].indexOf(citizenID)==0) // If the value's name begins with citizenID
    GM_deleteValue(GMVals[x]);
 }
 else if(resetindex==2)
  for(x in GMVals)
   GM_deleteValue(GMVals[x]);
}

// Select tab
function TabClick()
{
 dada = document.getElementsByClassName("tabs")[0].parentNode;
 document.getElementsByClassName("on")[0].className = "";
 document.getElementById("RyoETab").className = "on";

 while(dada.getElementsByClassName("bordersep").length)
  dada.removeChild(dada.getElementsByClassName("bordersep")[0]);
 while(dada.getElementsByClassName("holder").length)
  dada.removeChild(dada.getElementsByClassName("holder")[0]);

 newdiv = document.createElement("div");
 newdiv.className = "bordersep";
 newdiv.style.textAlign = "center";
 newinput = document.createElement("input");
 newinput.type = "button";
 newinput.value = "Save settings";
 newdiv.appendChild(newinput);
 dada.appendChild(newdiv);
 newinput.addEventListener("click",savesettings,false);

 for (x in features)
 {
  if (!features[x].name||(!features[x].loggedout&&citizenID=="logged_out")) continue;
  enabled = getGMVal(features[x].en);
  newdiv = document.createElement("div");
  newdiv.className = "bordersep";
  if (enabled) HTML = '<div id="togglebutton'+x+'" style="background: transparent url(/images/parts/btn-weekly_on.gif) no-repeat scroll 0pt 0pt; cursor: pointer; float: left; height: 25px; width: 25px;" title="Enabled"></div>';
  else HTML = '<div id="togglebutton'+x+'" style="background: transparent url(/images/parts/btn-weekly_off.gif) no-repeat scroll 0pt 0pt; cursor: pointer; float: left; height: 25px; width: 25px;" title="Disabled"></div>';
  HTML += '<div style="line-height: 25px;">&nbsp;&nbsp;&nbsp;' + features[x].name;
  
  //If a feature needs more inputs, they go here

  HTML += '&nbsp;(<a id="moreinfo' + x + '" style="cursor:pointer">More info</a>)</div><div style="margin-left:12px;padding-left:13px;font-size: 11px;border-left: 1px solid #666;" id="infohere' + x + '"></div>';
  newdiv.innerHTML = HTML;
  dada.appendChild(newdiv);
  document.getElementById("togglebutton"+x).addEventListener("click", function(){togglefeature(this.id)}, false);
  eval('document.getElementById("moreinfo"+x).addEventListener("click", function(){toggleinfo('+x+')}, false);'); //without eval(), x will always equal the number of the last feature
 }

 newdiv = document.createElement("div");
 newdiv.className = "bordersep";
 newdiv.style.textAlign = "center";
 newinput = document.createElement("input");
 newinput.type = "button";
 newinput.value = "Save settings";
 newdiv.appendChild(newinput);
 dada.appendChild(newdiv);
 newinput.addEventListener("click",savesettings,false);

 newdiv = document.createElement("div");
 newdiv.className = "holder";
 newdiv.innerHTML = '<select id="resetselect"><option>Set default settings</option><option>Reset all for this user</option><option>Reset all</option></select><input type="button" id="resetbutton" value="Reset script"/>';
 dada.appendChild(newdiv);
 document.getElementById("resetbutton").addEventListener("click",function(){
  ScriptReset(document.getElementById("resetselect").selectedIndex);
  },false);
}

// Show tab
function GoGoGadgetSettings()
{
 newli = document.createElement("li");
 newli.innerHTML = "<a id='RyoETab' href='#'><span>Ryo E's Awesome eRepublik Greasemonkey Script</span></a>";
 document.getElementsByClassName("tabs")[0].appendChild(newli);
 document.getElementById("RyoETab").addEventListener('click', TabClick, false);
}

///// Display strength after next training /////
function NextTrain()
{
 strength = parseFloat(document.getElementsByClassName("display-strenght-core")[0].innerHTML);
 if (strength < 2) strengthplus = 0.5;
 else if (strength < 3) strengthplus = 0.2;
 else if (strength < 4) strengthplus = 0.1;
 else strengthplus = 0.04;

 tbody = document.getElementsByClassName("offers")[0].tBodies[0];
 newtr = document.createElement("tr");
 newtd = document.createElement("td");
 newtd.vAlign = "middle";
 newtd.innerHTML = "Strength after next train";
 newtr.appendChild(newtd);

 newtd = document.createElement("td");
 newtd.vAlign = "middle";
 newtd.innerHTML = '<div class="entity"><span class="new-strength-start"><span class="new-strength-end"><span class="new-strength-core">' + (strength+strengthplus).toFixed(2) + "</span></span></span></div>";
 newtr.appendChild(newtd);
 tbody.appendChild(newtr);

 newstyle = ".new-strength-start{background:transparent url(/images/parts/map-erepublik-logged.png) no-repeat scroll -140px -194px;display:block;float:left;padding-left:2px;} ";
 newstyle += ".new-strength-end{background:transparent url(/images/parts/map-erepublik-logged.png) no-repeat scroll -139px -194px;display:block;padding-right:2px;} ";
 newstyle += ".new-strength-core{background-color:#EEE;color:#666;display:block;font-size:18px;padding:7px 0 7px 0;text-align:center;width:47px;border-top:1px solid #E2E2E2;border-bottom:1px solid #E2E2E2;}";
 GM_addStyle(newstyle);//#F3F3F3
}

///// Display what your skill will be after you next work /////
// Display everything on the page
function DispNextWork(skills)
{
 industry = document.getElementsByClassName("special")[1].innerHTML;
 for (x in industries)
 {
  if (industries[x]==industry)
  {
   if (x > 9) domain = "constructions";
   else if (x > 4) domain = "land";
   else if (x > 0) domain = "manufacturing";
   else return; //Something's gone wrong - ABORT ABORT
  }
 }

 var skill = 0;
 for (x in skills)
  if (skills[x].domain == domain)
   skill = skills[x].value;

 elem = document.getElementsByClassName("infoholder-indent")[0].parentNode;
 newdiv = document.createElement("div");
 newdiv.id = "whatsmyskilldawg";
 newdiv.innerHTML = "<div class='regular'>Skill after you next work:</div>";
 elem.appendChild(newdiv);
 
 if (skill < 1) skillincrease = 0.50;
 else if (skill < 2) skillincrease = 0.25;
 else if (skill < 3) skillincrease = 0.10;
 else if (skill < 4) skillincrease = 0.05;
 else skillincrease = 0.02;

 newdiv = document.createElement("div");
 newdiv.innerHTML = '<div class="entity"><span class="new-strength-start"><span class="new-strength-end"><span class="new-strength-core">' + (skill + skillincrease).toFixed(2) + "</span></span></span></div><div class='regular' style='float:right;margin:11px 2px;'>(+" + skillincrease + ")</div>";
 newdiv.style.marginTop = "7px";
 newdiv.style.cssFloat = "right";
 elem.appendChild(newdiv);

 newstyle = "#whatsmyskilldawg{float:left;padding:15px 0 15px 50px;margin:5px 0 0;background:transparent url(/images/parts/icon_skill_"+domain+".gif) no-repeat scroll -6px center;}";
 //Recycle the styles from NextTrain() - it looks the same, may as well save some work
 newstyle += ".new-strength-start{background:transparent url(/images/parts/map-erepublik-logged.png) no-repeat scroll -140px -194px;display:block;float:left;padding-left:2px;} ";
 newstyle += ".new-strength-end{background:transparent url(/images/parts/map-erepublik-logged.png) no-repeat scroll -139px -194px;display:block;padding-right:2px;} ";
 newstyle += ".new-strength-core{background-color:#EEE;color:#666;display:block;font-size:18px;padding:7px 0 7px 0;text-align:center;width:47px;border-top:1px solid #E2E2E2;border-bottom:1px solid #E2E2E2;}";
 GM_addStyle(newstyle);
}

// Find out about your skills
function NextWork()
{
 if (!document.getElementsByClassName("infoholder-indent").length) return; //Only continue if you're an employee of the company

 GM_xmlhttpRequest({
  method: 'GET',
  url: "http://api.erepublik.com/v1/feeds/citizens/" + citizenID + ".json",
  onload: function (res) {
  eval("json = " + res.responseText);
  DispNextWork(json.skills);
  },
 });
}

///// Display how many more days until your next hard worker medal /////
function NextHW()
{
 if (!document.getElementsByClassName("infoholder-indent").length) return; //Only continue if you're an employee of the company
 workP = document.getElementsByClassName("infoholder-indent")[0].getElementsByTagName("p")[0].innerHTML;

 if (/^You worked \d+/.test(workP))
 {
  if(workP.match(/\d+/)=="29") setGMVal("HWDaysToGo",1);
  else setGMVal("HWDaysToGo",parseInt(workP.replace(/(^You worked \d+ |\D+)/g,"")));
 }
 else if (/^You worked 30 days in a row./.test(workP)&&getGMVal("HWDaysToGo"))
  setGMVal("HWDaysToGo",30);
 else if (/^You have already worked today.$/.test(workP)&&getGMVal("HWDaysToGo"))
  document.getElementsByClassName("infoholder-indent")[0].getElementsByTagName("p")[1].innerHTML = "You have " + getGMVal("HWDaysToGo") + " day" + (getGMVal("HWDaysToGo")==1?"":"s") + " until you receive a Hard Worker medal.";
 else if (/^You have not worked today.$/.test(workP)&&getGMVal("HWDaysToGo"))
 {
  newp = document.createElement("p");
  newp.innerHTML = "You have " + getGMVal("HWDaysToGo") + " days until you receive a Hard Worker medal.";
  document.getElementsByClassName("infoholder-indent")[0].appendChild(newp);
 }
}
function NextHW2() // Displays on your profile when you mouseover your HW medals
{
 if(location.pathname.match("/"+citizenID)&&getGMVal("HWDaysToGo")) document.getElementById("achievment").getElementsByTagName("p")[1].innerHTML += ".<br/>Days to next medal: <strong>" + getGMVal("HWDaysToGo") + "</strong>";
}

///// When you're viewing an article and the URL ends in #comments, you will actually be taken to the comments section /////
function CommentsLink()
{//Simple function! Yey!
 document.getElementsByClassName("holder")[0].insertBefore(document.getElementsByName("comments")[0], document.getElementById("comments_div"));
}

///// Let's do this thang! /////
function main()
{
 url = location.pathname.replace(/^\/e[ns]/,"");
 try
 {
  citizenID = document.getElementsByClassName("avatarholder")[0].getElementsByTagName("a")[0].href.match(/\d+/);
 }
 catch(err)//Either you're logged out, or something's gone wrong
 {
  citizenID = "logged_out";
  for (x in features)
  {
   enabled = getGMVal(features[x].en);
   if (features[x].loggedout&&features[x].re.test(url)&&enabled) features[x].fu();
  }
  return;
 }

 for (x in features)//If you've got this far, then you're logged on and I've got your citizen ID
 {
  enabled = getGMVal(features[x].en);
  if (features[x].re.test(url)&&enabled) features[x].fu();
 }
}

// Run when the page has loaded
window.addEventListener("load", main, false);










/*               |
             _-_ @
           X@:::X@@
         XXX@:::X@@
         XXX@x@:X@@@
         XXX@X@@X@@@
         XXX@X@@X@@@
         XXX@X@@X@@@
         XX+++++++@@
      +++++++++++++++++
   +++++             +++++      `| /\
 +++                     +++  \/ |o\/
+                           +

*/



// What are you doing all the way down here? The script is ^up there^!