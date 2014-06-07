// ==UserScript==
// @name world-war helper
// @namespace Oliver
// @include http://wwar.storm8.com/*
// ==/UserScript==

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

/*
* Set this value to your country's number
* 1 = Germany
* 2 = UK
* 3 = USA
* 4 = China
* 5 = Russia
*/
// var sanctionCountry = 5;

// Don't edit anything var below this line
//----------------------------------------
var autobank = GM_getValue("autobank", false);
var autobuildInc = GM_getValue("income",false);
var autobuildDef = GM_getValue("defense",false);
var autoheal = GM_getValue("autoHeal", false);
var healthLimit = parseInt(GM_getValue("healthLimit",27));
var healthTimer = parseInt(GM_getValue("healthTimer", 10));
var healing = GM_getValue("healing", false);
var currentPage = GM_getValue("currentPage", "home.php");
var sanction = GM_getValue("sanction", false);
var sanctionLevel = GM_getValue("sanctionLevel",1);
var sanctionAmmo = GM_getValue("sanctionAmmo",1);
var autosancNum = GM_getValue("autosancNum",0);
var resanc = GM_getValue("resanc",false);
var csearch = GM_getValue("csearch", "");
var dosearch = GM_getValue("dosearch",false);
var sancCountry = parseInt(GM_getValue("sancCountry",2));
var autoAttack = GM_getValue("autoAttack",false);
var PUID = GM_getValue("PUID", "");
var cleanWall = GM_getValue('cleanWall', false);
var messageBox = GM_getValue('messageBox', true);
var missionId = GM_getValue('missionId', "*");
var refillEnergy = GM_getValue('refillEnergy', false);
var missionDelay = GM_getValue('missionDelay', true);

// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","wwfixermenu");
var bchecked = "";
var ichecked = "";
var dchecked = "";
var hchecked = "";
var schecked = "";
var zchecked = "";
var achecked = "";
var cchecked = "";
var mchecked = messageBox ? " checked" : "";
var rchecked = refillEnergy ? " checked" : "";
var MDchked = missionDelay ? " checked" : "";

if (autobank)
bchecked = " checked";
if (autobuildInc)
ichecked = " checked";
if (autobuildDef)
dchecked = " checked";
if (autoheal)
hchecked = " checked";
if (sanction)
schecked = " checked";
if (dosearch)
zchecked = " checked";
if (autoAttack)
achecked = " checked";
if (cleanWall)
cchecked = " checked";

menu.innerHTML = "\
<input type=\"checkbox\" id=\"autobuildInc\" "+ichecked+" /> Inc \
<input type=\"checkbox\" id=\"autobuildDef\" "+dchecked+" /> Def \
<input type=\"checkbox\" id=\"autoAttack\" "+achecked+" /> AA \
<input type=\"checkbox\" id=\"cleanWall\" "+cchecked+" /> CW \
<input type=\"checkbox\" id=\"messageBox\" "+mchecked+" /> MB <BR/> \
<input type=\"checkbox\" id=\"autoheal\" "+hchecked+" /> AH <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"healthlimit\" value=\""+healthLimit+"\" /> <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"healthtimer\" value=\""+healthTimer+"\" /> &nbsp;&nbsp; \
AM <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"missionId\" value=\""+missionId+"\" /> <input type=\"checkbox\" id=\"missionDelay\" "+MDchked+" /> Delay <br>\
<input type=\"checkbox\" id=\"sanction\" "+schecked+" /> AK <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"sanctionlevel\" value=\""+sanctionLevel+"\" /> <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"sanctionammo\" value=\""+sanctionAmmo+"\" /> \
NoKill <select id=\"sancCountry\" size=\"1\"> \
<option value=\"1\">Germany</option> \
<option value=\"2\">UK</option> \
<option value=\"3\">USA</option> \
<option value=\"4\">China</option> \
<option value=\"5\">Russia</option> \
</select> <br>\
PUID <input type=\"text\" style=\"border: 1px solid green; width: 6em; color: #00ff00; background: black; text-align: center;\" id=\"textboxPUID\" onchange=\"document.getElementById('btnSETPUID').disabled=false;\" value=\""+PUID+"\" /> <INPUT type=\"button\" value=\"G\" input id=\"btnGETPUID\" \> <INPUT type=\"button\" value=\"S\" input id=\"btnSETPUID\" \> <INPUT type=\"button\" value=\"CLR\" input id=\"btnCLRPUID\" \> <br>\
<input type=\"checkbox\" id=\"dosearch\" "+zchecked+" /> Srch <input type=\"text\" style=\"border: 1px solid green; width: 8em; color: #00ff00; background: black; text-align: center;\" id=\"csearch\" value=\""+csearch+"\" /> \
AS <input type=\"text\" style=\"border: 1px solid green; width: 4em; color: #00ff00; background: black; text-align: center;\" id=\"autosancNum\" value=\""+autosancNum+"\" /> \
<div id=\"wwfixernextbuilding\" style=\"margin-top: 4px;\"></div>";

menu.style.padding = '10px';
var x = 1;
if (document.body.children[1].id == "wwhelpermenu")
x = 2;
document.body.insertBefore(menu, document.body.children[x]);


var page = String(location).split('/')[3].split('.php')[0];


var vPUID = "";
if (page == "profile")
{
var st = document.getElementById("sectionTabs");
var purl = String(st.getElementsByTagName("a")[0]);
vPUID = getQueryVariable(purl, 'puid');
}

var ibutton = document.getElementById("btnGETPUID");
ibutton.addEventListener('click', Get_PUID, true);
if (vPUID=="" || vPUID==null)
ibutton.disabled=true; else ibutton.disabled=false;

var ibutton1 = document.getElementById("btnSETPUID");
ibutton1.addEventListener('click', Set_PUID, true);
ibutton1.disabled=true;

var ibutton2 = document.getElementById("btnCLRPUID");
ibutton2.addEventListener('click', Clr_PUID, true);
if (document.getElementById("textboxPUID").value!="" || PUID!="")
ibutton2.disabled=false; else ibutton2.disabled=true;

function getQueryVariable(query, variable) {
var qm = query.indexOf('?');
if (qm >= 0) query=query.substring(qm+1);
var vars = query.split("&");
for (var i=0;i<vars.length;i++) {
var pair = vars[i].split("=");
if (pair[0] == variable) return pair[1];
}
}

function Get_PUID()
{
var upbox = document.getElementById("textboxPUID");
upbox.value = vPUID;
GM_setValue("PUID", vPUID);
ibutton.disabled=true;
ibutton1.disabled=true;
ibutton2.disabled=false;
}

function Set_PUID()
{
var upbox = document.getElementById("textboxPUID");
GM_setValue("PUID", upbox.value);
ibutton1.disabled=true;
ibutton2.disabled=false;
}

function Clr_PUID()
{
var upbox = document.getElementById("textboxPUID");
upbox.value = "";
GM_setValue("PUID", "");
ibutton2.disabled=true;
}

function setSelect(id, val) {
var elem = document.getElementById(id);
for (n = elem.length-1; n >= 0; n--) {
// alert(elem.options[n].text + ' ' + elem.options[n].value);
if (parseInt(elem.options[n].value) == val) {
elem.options[n].selected = true;
break;
}
}
}
setSelect('sancCountry', sancCountry);

function fixNum(n)
{
n += '';
var rgx = /(\d+)(\d{3})/;
while (rgx.test(n)) {
n = n.replace(rgx, '$1' + ',' + '$2');
}
return n;
}

function checkOptions()
{
// autobanking
if(document.getElementById('autobank')!=null){
if (document.getElementById('autobank').checked)
GM_setValue("autobank",true);
else
GM_setValue("autobank",false);
}
// autobuilding
if (document.getElementById('autobuildDef').checked)
GM_setValue("defense",true);
else
GM_setValue("defense",false);
if (document.getElementById('autobuildInc').checked)
GM_setValue("income",true);
else
GM_setValue("income",false);

// comment search
if (document.getElementById('dosearch').checked)
GM_setValue("dosearch", true);
else
GM_setValue("dosearch", false);
var strSearch = document.getElementById('csearch').value;
GM_setValue("csearch", strSearch);

// auto mission
var newMissionId = document.getElementById('missionId').value;
if (missionId != newMissionId)
{
missionId = newMissionId;
GM_setValue("missionId", missionId);
}

// auto healing
if (document.getElementById('autoheal').checked)
GM_setValue("autoHeal", true);
else
GM_setValue("autoHeal", false);
var oldhealth = healthLimit;
var newhealth = document.getElementById('healthlimit').value;
if (oldhealth != newhealth)
{
healthLimit = newhealth;
GM_setValue("healthLimit",parseInt(healthLimit));
}
var oldtimer = healthTimer;
var newtimer = document.getElementById('healthtimer').value;
if (oldtimer != newtimer)
{
healthTimer = newtimer;
GM_setValue("healthTimer",parseInt(newtimer));
}

// autokill sanction
if (document.getElementById('sanction').checked)
GM_setValue("sanction",true);
else
GM_setValue("sanction",false);
var oldsanc = sanctionLevel;
var newsanc = document.getElementById('sanctionlevel').value;
if (oldsanc != newsanc)
{
sanctionLevel = newsanc;
GM_setValue("sanctionLevel",parseInt(sanctionLevel));
}
var oldammo = sanctionAmmo;
var newammo = document.getElementById('sanctionammo').value;
if (oldammo != newammo)
{
sanctionAmmo = newammo;
GM_setValue("sanctionAmmo",parseInt(sanctionAmmo));
}

// sancCountry
var oldcountry = sancCountry;
var newcountry = parseInt(document.getElementById('sancCountry').value);
if (oldcountry != newcountry)
{
// alert(oldcountry+' -> '+newcountry);
sancCountry = newcountry;
GM_setValue("sancCountry", sancCountry);
}

// autosanc
var oldNum = autosancNum;
var newNum = document.getElementById('autosancNum').value;
if (oldNum != newNum)
{
autosancNum = newNum;
GM_setValue("autosancNum",parseInt(autosancNum));
}

// auto re-attack
if (document.getElementById('autoAttack').checked)
GM_setValue("autoAttack", true);
else
GM_setValue("autoAttack", false);

// auto clean-wall
if (document.getElementById('cleanWall').checked)
GM_setValue("cleanWall", true);
else
GM_setValue("cleanWall", false);

// show message-box?
GM_setValue("messageBox", document.getElementById('messageBox').checked);

// refill Energy within auto-mission?
GM_setValue("refillEnergy", document.getElementById('refillEnergy').checked);

// auto-mission with delay 1~3 seconds?
GM_setValue("missionDelay", document.getElementById('missionDelay').checked);
}

// autohealing
if (autoheal)
{
var healthCurrent = parseInt(document.getElementById('healthCurrent').innerHTML);
var healthMax = parseInt(document.getElementById('healthMax').innerHTML);

if (window.name=='HospitalWin') {
if (healthCurrent < healthLimit) {
var elememtHealBtn = document.getElementsByClassName('tac healBtn')[0];
if (elememtHealBtn!=null)
document.location = elememtHealBtn.getElementsByTagName('a')[0].href;
} else {
GM_setValue('healing', false);
window.opener.document.location.reload();
window.close();
}
} else {
// set page refresh timer
if (healthTimer > 0) {
if (page == "hospital") {
setTimeout('document.location.reload();', healthTimer * 500);
} else
if (page == "home" && resanc == false) {
// console.log('page='+page);
setTimeout('document.location.reload();', healthTimer * 60 * 1000);
}
}

if (healthCurrent < healthLimit && healthCurrent < healthMax) {
if (!healing) {
launch("http://wwar.storm8.com/hospital.php", "HospitalWin", "", "MainWin");
GM_setValue('healing', true);
healing = true;
}
} else {
if (healing) {
GM_setValue('healing', false);
healing = false;
}
}
}
}


// auto clean wall
if (cleanWall)
{
var postComment = document.getElementsByClassName('btnMed btnPostComment');
if (page == "profile" && postComment != null && postComment.length > 0)
{
var messages = document.getElementsByClassName('newsFeedItemMsg');
if (messages.length > 0)
{
var lnks = messages[0].getElementsByTagName("a");
var mPuid = getQueryVariable(lnks[0].href, 'puid');
if (PUID==mPuid || (PUID=='' && mPuid==null))
{
cleanWall = false;
GM_setValue('cleanWall', false);
}
else
{
if (lnks.length>1)
document.location = lnks[1];
else
document.location = lnks[0];
}
} else {
cleanWall = false;
GM_setValue('cleanWall', false);
}
}
}

// search in comments or Sanction Board
if (dosearch || PUID != "")
{

var postComment = document.getElementsByClassName('btnMed btnPostComment');

if (((page == "profile" && postComment != null && postComment.length > 0 && cleanWall==false)) ||((dosearch == true)&&(page =="group_member")))
{
var lnks = document.links;
var wasfound = false;
var mystring = csearch;
for (i=0; i<lnks.length; i++)
{
var tPuid = getQueryVariable(lnks[i].href, 'puid');
if (tPuid == null) continue;
var test = lnks[i].innerHTML;
//alert(test);
if ((dosearch && test.indexOf(csearch)>=0) || (PUID!="" && PUID==tPuid))
{
wasfound = true;
//alert("Found a link that may belong to that chump!");
document.location = lnks[i];
break;
}
}

if (!wasfound)
{
for (j=lnks.length-1; j>=0; j--)
{
var test2 = lnks[j].innerHTML;
if (test2.indexOf("Next") == 0)
{
document.location = lnks[j];
break;
}
}
}
}

if (page == "hitlist")
{

// AK?
if (GM_getValue("sanction",false) || PUID!="") {
// var lnks = document.links;
var wasfound = false;
var mystring = csearch;
var ammo = parseInt(document.getElementById('staminaCurrent').innerHTML);

if (!healing) {
// still alive?
var alive = document.getElementsByClassName('doAgainTxt');
if (alive.length > 0)
{
var next = alive[0].getElementsByTagName('input')[0];
if (ammo >= sanctionAmmo) click(next);
return;
}

var sancList = document.getElementsByClassName('fightTable');
// for (i=0; i<lnks.length; i++)
for (i=0; i<sancList.length; i++)
{
var fields = sancList[i].getElementsByTagName('td');
var name = fields[1].getElementsByTagName('a')[0].innerHTML;

if (PUID != "") {
var tPuid = getQueryVariable(String(fields[1].getElementsByTagName('a')[0]), 'puid');

if (PUID == tPuid) wasfound = true;
} else
if (name.indexOf(csearch) >= 0) {
var country = fields[0].getElementsByTagName('img')[0].src.split('/')[6].substr(0,1);
var level = parseInt(fields[1].getElementsByTagName('div')[1].innerHTML.substr(6));

if (GM_getValue("sanction",false)) {
if (level == GM_getValue('sanctionLevel',1) &&
country == sancCountry)
{
wasfound = true;
}
} else
wasfound = true;
}

if (wasfound)
{
var AttackButton = fields[5].getElementsByTagName('a')[0];
// document.location = lnks[i+1];
if (ammo >= sanctionAmmo)
// click(lnks[i+1]);
click(AttackButton);
break;
}
}
if (!wasfound)
{
var tabs = document.getElementById('sectionTabs');
// console.log(tabs.getElementsByTagName("a")[1]);
document.location = tabs.getElementsByTagName("a")[1];

// document.location = 'http://wwar.storm8.com/hitlist.php?';
}
}
}
else
{

// hit list search
var lnks =  document.getElementsByClassName('fightMobster')
var wasfound = false;
var mystring = csearch;
for (i=0; i<lnks.length; i++)
{
var test = lnks[i].getElementsByTagName("a")[0].innerHTML;
//alert(test);
if (test.indexOf(csearch) != -1)
{
wasfound = true;
document.location = lnks[i].getElementsByTagName("a")[0].href;
break;
}
}
if (!wasfound)
{
document.location = 'http://wwar.storm8.com/hitlist.php?';
}
}

// // hit list search
// var lnks = document.links;
// var wasfound = false;
// var mystring = csearch;
// for (i=0; i<lnks.length; i++)
// {
// var test = lnks[i].innerHTML;
// //alert(test);
// if (test.indexOf(csearch) >= 0)
// {
// wasfound = true;
// document.location = lnks[i];
// break;
// }
// }
// if (!wasfound)
// {
// document.location = 'http://wwar.storm8.com/hitlist.php?';
// }
// }
}
}


function launch(newURL, newName, newFeatures, orgName) {
var remote = open(newURL, newName, newFeatures);
if (remote.opener == null)
remote.opener = window;
remote.opener.name = orgName;
return remote;
}

function getCash()
{
var cfield = document.getElementById('cashCurrent');
var cash;
if (cfield.getElementsByTagName('a').length > 0)
cash = cfield.getElementsByTagName('a')[0].innerHTML.replace(/,/g,'');
else
cash = cfield.innerHTML.replace(/,/g,'');
if (cash.lastIndexOf('bil') > 0)
    	cash = parseFloat(cash) * 1000000000;
return cash;
}

// autobanking
function bankIt()
{
if (GM_getValue("autobank",false))
{
var cash = getCash();
if (cash > 0)
postwith("bank.php", ['depositAmount', cash, 'action', 'Deposit']);
}
}

function postwith (to,p) {
var myForm = document.createElement("form");
myForm.method="post" ;
myForm.action = to ;
for (var k=0; k<p.length; k+=2) {
var myInput = document.createElement("input") ;
myInput.setAttribute("name", p[k]) ;
myInput.setAttribute("value", p[k+1]);
myForm.appendChild(myInput) ;
}
document.body.appendChild(myForm) ;
myForm.submit() ;
document.body.removeChild(myForm) ;
}

function removeElement(id) {
var element = document.getElementById(id);
element.parentNode.removeChild(element);
}


// remove AD and messageBox?
if (messageBox == false)
{
// remove messageBox
var messageBox = document.getElementsByClassName('messageBox infoBox');
if (messageBox.length > 0)
{
for (i=messageBox.length-1; i>=0; i--)
{
messageBox[i].parentNode.removeChild(messageBox[i]);
}
}

// remove AD
var successMsg = document.getElementsByClassName('messageBoxSuccess')[0];
if (successMsg != null)
{
var installAction = successMsg.getElementsByClassName('installAction')[0];
if (installAction != null)
{
successMsg.parentNode.removeChild(successMsg);
}
}
}


// show ID of missions
if (page == "missions")
{
var missions = document.getElementsByClassName('missionTable');
for (i=0; i<missions.length; i++)
{
var missionName = missions[i].getElementsByClassName('missionName ')[0];
var missionLink = missions[i].getElementsByTagName('a')[0];
var jId = getQueryVariable(missionLink.href, 'jid');
missionName.innerHTML = jId+'.'+missionName.innerHTML;
}
}


// automission
function automission()
{
if (page == "missions" && missionId != "")
{
var finished = false;
var errorMsg = document.getElementsByClassName('messageBoxFail')[0];
if (errorMsg != null)
{
var doAgainBtn = document.getElementsByClassName('btnMed btnDoAgain')[0];
if (doAgainBtn != null)
{
click(doAgainBtn);
}
else
if (refillEnergy)
{
// refill Energy with HP
var favorAction = document.getElementsByClassName('favorAction')[0];
var refillHP = favorAction.getElementsByTagName('a')[0];
document.location = refillHP;
}
else
{
var randomTimer=Math.round(Math.random()*30+30)*1000;
setTimeout('document.location="/missions.php";', randomTimer);
}
}
else
{
var missions = document.getElementsByClassName('missionTable');
for (i=0; i<missions.length; i++)
{
var masteryBarProgress = missions[i].getElementsByClassName('masteryBarProgress')[0];
var progressPercent = 100;
if (masteryBarProgress != null)
progressPercent = masteryBarProgress.innerHTML.split('%')[0];
var missionLink = missions[i].getElementsByTagName('a')[0];
if ((missionLink.href.indexOf("jid="+missionId) >= 0) ||
(missionId == '*' && progressPercent < 100))
{
if (missionDelay)
{
var randomDelay=Math.round(Math.random()*2+1)*2000;
setTimeout(missionLink.click(), randomDelay);
}
else
{
missionLink.click()
}
break;
}
else if(missionId == '+'){
if (masteryBarProgress != null){
progressPercent = masteryBarProgress.innerHTML.split('%')[0];
if(progressPercent<100){
var randomDelay=Math.round(Math.random()*2+1)*2000;
setTimeout(missionLink.click(), randomDelay);
finished = false;
}else{
finished = true;
}
}
}
}
var tabs = document.getElementsByClassName('sectionTabs')[0].getElementsByTagName('li');

for(l=0;l<tabs.length;l++){
if(tabs[l].getAttribute('class') == 'selected'){
var randomDelay=Math.round(Math.random()*2+1)*2000;
if(l<tabs.length-1){
setTimeout(tabs[l+1].getElementsByTagName('a')[0].click(), randomDelay);
}else{
GotoNextTabs();
}
return;
//alert(tabs[l].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML)//.getAttribute('style'))
}
}

}
}
}


function GotoNextTabs() {
    var imgs = document.getElementsByTagName("img");
    
    for (var i = 0; i < imgs.length; i++) {	
        if(imgs[i].src.indexOf("http://static.storm8.com/wwar/images/arrows/tabforward.png")!=-1)		{
			imgs[i].parentNode.click();
		}		
    }   
}

// autobuilding
function autobuild()
{
if (page == "investment")
{
var def = GM_getValue("defense",false);
var inc = GM_getValue("income",false);
if (def || inc)
{
var links = new Array();
var prices = new Array();
var ratios = new Array();
var names = new Array();
var buildings = document.getElementsByClassName("reTable");
// for (i in buildings)
for (i=0; i<buildings.length; i++)
{
var info = buildings[i].getElementsByClassName("reInfoItem")
if (info.length == 0)
continue;
var type = info[0].innerHTML.substr(0,1);
var link = buildings[i].getElementsByTagName("a")[0].href;

if ((def && type=='D') || (inc && type=="I"))
{
var cols = buildings[i].getElementsByTagName("td");
var returns = cols[0].getElementsByClassName("reInfoItem")[0];
var price = (cols[2].getElementsByClassName("cash")[0].getElementsByTagName("span")[0].innerHTML.split(">")[1].replace(/,/g,''));
if (price.lastIndexOf('K') > 0)
price = parseInt(price) * 1000;
else if (price.lastIndexOf('mil') > 0)
price = parseFloat(price) * 1000000;
else if (price.lastIndexOf('bil') > 0)
price = parseFloat(price) * 1000000000;

if (type == "I")
{
var field = returns.getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerHTML.split(">")[1].replace(/,/g,'')
if (field.lastIndexOf('mil') > 0)
var nret = parseFloat(field) * 1000000;
else
var nret = parseInt(field);
}
else
var nret = parseInt(returns.getElementsByClassName("defense")[0].innerHTML.substr(1)) * 500;

var ratio = Math.round(price * 10 / nret)/10;
var name = buildings[i].getElementsByClassName('reName')[0].innerHTML;
names[names.length] = name;
links[links.length] = link;
prices[prices.length] = parseInt(price);
ratios[ratios.length] = ratio;
//alert(ratio+":"+ratios[ratios.length-1] )
}
}

var minIndex = 0;
for (r=0; r<ratios.length; r++)
if (ratios[r] < ratios[minIndex])
minIndex = r;
var cash = getCash();

var need = prices[minIndex] - cash;
var rate = parseInt(document.getElementById('cashTimerDiv').getElementsByTagName('span')[0].getElementsByTagName('span')[0].getElementsByTagName('span')[0].innerHTML.replace(/,/g,''));

document.getElementById('wwfixernextbuilding').innerHTML = '<font color="#00ff00"><small><b>Next building: '+names[minIndex]+', need <img src="http://static.storm8.com/wwar/images/money.png?v=140">'+fixNum(need)+'</b> - '+Math.ceil(need / rate)+'h</small></font>';
if (cash >= prices[minIndex])
document.location = links[minIndex];
}
}
}

if (autoAttack) {
if (page == "profile")
{
var profileName = document.getElementsByClassName('profileRight')[0].getElementsByTagName('b')[0].innerHTML;
if (dosearch && csearch.indexOf(profileName)>=0) {
var elementBtnMed = document.getElementsByClassName('btnMed')[0];
if (elementBtnMed!=null) {
click(elementBtnMed);
}
}
} else
if (page == "fight" && autoAttack)
{
var elementBtnMed = document.getElementsByClassName('btnMed')[2];
if (elementBtnMed!=null) {
click(elementBtnMed);
}
}
}

// autokill sanctions
if (page == "hitlist")
{
// check if search is enabled
if (dosearch)
return;
else
if (GM_getValue("sanction",false))
attackSanc();
}

function attackSanc(noReattack)
{
// check health
if (parseInt(document.getElementById('healthCurrent').innerHTML) <= 27)
return;
// check ammo
if (document.getElementById('staminaCurrent').innerHTML == 0)
{
// defeat storm8 hacker checks by introducing random delay up to 5 seconds
var delay = Math.random()*5;
var time = document.getElementById('staminaType').innerHTML.split(':');
var seconds = parseInt(time[0]) * 60 + parseInt(time[1]) + delay; // add 2 seconds to the timer
// wait to receive sanctionAmmo ammo
sanctionAmmo = Math.max(1, sanctionAmmo);
seconds = seconds + 100 * (sanctionAmmo - 1);
setTimeout("document.location = 'http://wwar.storm8.com/hitlist.php'", Math.floor(1000*seconds));
return;
}

// check for re-attack
if (noReattack == null)
{
//var won = document.getElementsByClassName('wonFight').length;
var won = document.getElementsByClassName('lostFight').length;
var alive = document.getElementsByClassName('doAgainTxt');
// alert(won+' / '+alive.length);
if (won && alive.length > 0)
{
var next = alive[0].getElementsByTagName('input')[0];
click(next);
return;
}
}

// otherwise find a new person to attack
var people = document.getElementsByClassName("fightTable");
var found = false;
// for (i in people)
for (i=0; i<people.length; i++)
{
var fields = people[i].getElementsByTagName("td");
var level = parseInt(fields[1].getElementsByTagName("div")[1].innerHTML.substr(6));
var country = fields[0].getElementsByTagName("img")[0].src.split("/")[6].substr(0,1);

if (level < GM_getValue("sanctionLevel",1) && country != sancCountry)
{
var link = fields[5].getElementsByTagName("a")[0];
click(link);
found = true;
break;
}
}
if (!found)
document.location = 'http://wwar.storm8.com/hitlist.php';
//setTimeout("document.location = 'http://wwar.storm8.com/hitlist.php'", Math.floor(Math.random() * 40)*90);
//setTimeout("document.location = 'http://wwar.storm8.com/hitlist.php'", 2000);
}

if (resanc)
{
if (page == "hitlist")
{
document.location = 'http://wwar.storm8.com/home.php';
}
if (page == "home")
{
// settimeout because the links load with JS
setTimeout(resanc_home, 1000);
}
if (page == "profile")
{
var buttons = document.getElementsByClassName('buttonHolder')[0].getElementsByTagName('input');
click (buttons[buttons.length - 1]);
}
}

function resanc_home()
{
var a = document.getElementsByTagName('a');

var found = false;
for (i=0; i<a.length; i++)
{
if (a[i].innerHTML == resanc)
{
found = true;
break;
}
// else
// console.log(a[i].innerHTML);
}
if (!found)
{
alert('link not found!');
GM_setValue('resanc', false);
}
else
{
document.location = a[i];
}
}

// autosanction
if (page == "bounty")
{
GM_setValue("resanc",false);
var form = document.getElementById('bountyForm');
var minpay = parseInt(form.getElementsByTagName('span')[0].childNodes[1].nodeValue.replace(/,/g,''));
var target = document.getElementsByClassName('sectionHeader')[0].innerHTML.split('"')[1];
form.getElementsByTagName('input')[0].value = minpay;

if (autosancNum > 0)
{
GM_setValue('resanc',target);
GM_setValue('autosancNum',autosancNum - 1);
// see if we've just failed to sanc him
var n = 1000;
var fails = document.getElementsByClassName('messageBoxFail');
if (fails.length > 0)
{
GM_setValue('autosancNum', autosancNum);
if (fails[0].innerHTML.length == 114 + resanc.length)
//if (fails[0].innerHTML.substring("tomorrow"))
{
// too many sancs for today
GM_setValue('resanc', false);
return;
}
n = 1000*2;
}
setTimeout(click_sanc, n);
}
}
//Failure: You have put too many people on sanctions today. Please try again tomorrow.
function click_sanc()
{
document.getElementById('bountyForm').getElementsByClassName('btnMed btnBroadcast')[0].click();
//click(document.getElementById('bountyForm').getElementsByClassName('btnMed btnBroadcast')[0]);
}


// Click by JoeSimmons
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
if(!e) {return;}
if(typeof e=='string') e=document.getElementById(e);
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
}

function ClickLink(elem){
if (typeof elem.onclick == "function") {
    elem.onclick.apply(elem);
}
}

autobuild();
automission();

if (!window.closed) {
setInterval(bankIt, 30*1000);
setInterval(autobuild, 30*1000);
setInterval(checkOptions, 1000);
}