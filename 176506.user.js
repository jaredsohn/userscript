// ==UserScript==
// @name           Storm8 Functions
// @namespace      Dr. Drity Joe and Bennett
// @description    Auto functions for all Storm8 games
// @copyright      2013
// @version        2.2
// @include        http://*.storm8.com/*
// @require        http://bscripts.x10.mx/scriptarray.js
// ==/UserScript==

var game = String(location).split('/')[2].split('.')[0];
var homelink = "http://" + game + ".storm8.com/home.php";
var hitlistlink = "http://" + game + ".storm8.com/hitlist.php";
var hospitallink = "http://" + game + ".storm8.com/hospital.php";
var banklink = "http://" + game + ".storm8.com/bank.php";

// GM variables
var curVer = "2.2";
var autobank = GM_getValue("autobank", false);
var autoheal = GM_getValue("autoHeal", false);
var healthLimit = parseInt(GM_getValue("healthLimit", 60));
var healthTimer = GM_getValue("healthTimer", "5-10");
var ahd = parseInt(GM_getValue("ahd", randomFromInterval(5000, 10000)));
var healing = GM_getValue("healing", false);
var bounty = GM_getValue("bounty", false);
var bountyLevel = GM_getValue("bountyLevel", 150);
var bountyAmmo = GM_getValue("bountyAmmo", 1);
var autosancNum = GM_getValue("autosancNum", 0);
var resanc = GM_getValue("resanc", false);
if (game == "wwar") {
	var sancCountry = GM_getValue("sancCountry", 1);
}
var autoAttack = GM_getValue("autoAttack", false);
var PUID = GM_SuperValue.get("PUID", "");
var cleanWall = GM_getValue('cleanWall', false);
var messageBox = GM_getValue('messageBox', true);
var missionId = GM_getValue('missionId', "");
var amount = parseInt(GM_getValue("amount", 2500000));
var showorhide = GM_getValue("showorhide", "block");
var puidArray = GM_SuperValue.get('puidArray', []);
var puidSelected = GM_getValue('puidSelected', null);
var killAfterLose = GM_getValue('killAfterLose', false);
var csearch = GM_getValue("csearch", "");
var dosearch = GM_getValue("dosearch", false);
var bountykill = GM_getValue("bountykill", false);
var missiont = GM_getValue('missiont', 'best');
var missiono = GM_getValue('missiono', 'off');
var mcat = parseInt(GM_getValue('mcat', '1'));
var mnum = parseInt(GM_getValue('mnum', '1'));
var missionl = GM_getValue('mission' + game, 0);
var mscat = 1;
var ransanc = GM_getValue('ransanc',false);
var ransancnum = GM_getValue('ransancnum',0);
var ransancmeth = GM_getValue('ransancmeth','fight');
var hideorshow = GM_getValue("hideorshow", "none");
var page = String(location).split('/')[3].split('.php')[0];
var need2heal = GM_getValue('need2heal', 0);

if (page == "home") {
	getTxtFile("https://dl.dropboxusercontent.com/s/7gg9luhmklkfo01/version.txt?token_hash=AAHC1-m6s7X8ILr-zXrsMh3h2cUIWh2CClRZlqGXdYigbA&dl=1", true);
}

//Super-quick Make it bank
if (page == "hospital") {
	var htmlsearch = document.getElementsByTagName('body')[0].innerHTML;
	if (htmlsearch.indexOf('to pay for that.') != -1) {
		GM_setValue('need2bank', true);
		document.location = banklink;
		return;
	}
}
if (GM_getValue('need2bank', false)) {
	var cash = getCash();
	if (cash > 0) postwith("bank.php", ['depositAmount', '1000000000', 'action', 'Deposit']);
	else alert('You are broke!');
	GM_setValue('need2bank', false);
	GM_setValue('justbank', true);
	return;
}
if (GM_getValue('justbank', false)) {
	GM_setValue('justbank', false);
	setTimeout(function(){document.location = hospitallink;}, 500);
	return;
}
if (page == "help") {
    var d = confirm('Press OK to clear all settings.');
	if (d) {
        var variablesdel = GM_listValues();
        for (var fuckit = 0;fuckit<variablesdel.length;fuckit++) {
                GM_deleteValue(variablesdel[fuckit]);
        }
        document.location = 'http://'+game+'.storm8.com/home.php';
    }
}
if (hideorshow == "none") GM_setValue('showorhide','block');
// Menu builder
var bchecked = "";
var ichecked = "";
var dchecked = "";
var hchecked = "";
var schecked = "";
var zchecked = "";
var achecked = "";
var cchecked = "";
var rchecked = "";
var mchecked = messageBox ? " checked" : "";
var ralchecked = "";
var bkchecked = "";
var mochecked = "";
var ransancchecked = "";
if (autobank) bchecked = " checked";
if (autoheal) hchecked = " checked";
if (bounty) schecked = " checked";
if (autoAttack) achecked = " checked";
if (cleanWall) cchecked = " checked";
if (killAfterLose) ralchecked = " checked";
if (dosearch) zchecked = " checked";
if (bountykill) bkchecked = " checked";
if (missiono == "on") mochecked = " checked";
if (ransanc) ransancchecked = " checked";
var menu = document.createElement('div');
menu.setAttribute("id", "s8fixermenu");
menu.innerHTML = "\
<input type=\"checkbox\" id=\"autobank\" " + bchecked + " /> Bank \
<input type=\"checkbox\" id=\"autoAttack\" " + achecked + " /> Attack <input type=\"checkbox\" id=\"ral\" " + ralchecked + " />W/O</BR> \
<input type=\"checkbox\" id=\"autoheal\" " + hchecked + " /> Heal <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"healthlimit\" value=\"" + healthLimit + "\" /> <input type=\"text\" style=\"border: 1px solid green; width: 4em; color: #00ff00; background: black; text-align: center;\" id=\"healthtimer\" value=\"" + healthTimer + "\" /> </BR> \
<input type=\"checkbox\" id=\"bounty\" " + schecked + " /> Kill <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"bountylevel\" value=\"" + bountyLevel + "\" />  <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"bountyammo\" value=\"" + bountyAmmo + "\" /> \
<span id=\"ntk\">NoKill <select style=\"border: 1px solid green; background: black; color: #00ff00; text-align: left;\" id=\"sancCountry\"> \
  <option value=\"1\">Germany</option> \
  <option value=\"2\">UK</option> \
  <option value=\"3\">USA</option> \
  <option value=\"4\">China</option> \
  <option value=\"5\">Russia</option> \
</select> </span> <br>\
<input type=\"checkbox\" id=\"cleanWall\" " + cchecked + " /> CleanWall \
<input type=\"checkbox\" id=\"messageBox\" " + mchecked + " /> MessageBox <BR/> \
Hitlist <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"autosancNum\" value=\"" + autosancNum + "\" /> times for <input type=\"text\" style=\"border: 1px solid green; width: 5em; color: #00ff00; background: black; text-align: center;\" id=\"amount\" value=\"" + amount + "\" /> <input type=\"checkbox\" id=\"bk\" " + bkchecked + " /> K@B <br> \
PUID <select style=\"border: 1px solid green; width: 23em; background: black; text-align: left; color: #00ff00;\" id=\"selectboxPUID\" /> </select><br><input type=\"button\" value=\"GET\" input id=\"btnGETPUID\" /> <INPUT type=\"button\" value=\"CLR\" input id=\"btnCLRPUID\" /> <INPUT type=\"button\" value=\"CLR ALL\" input id=\"btnCLRALL\" /> <INPUT type=\"button\" value=\"SET\" input id=\"btnSET\" /> <br>\
<input type=\"checkbox\" id=\"ransanc\" " + ransancchecked + " /> RanSanc \
<input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"ransancnum\" value=\"" + ransancnum + "\" /> \
<select style=\"border: 1px solid green; background: black; color: #00ff00; text-align: left;\" id=\"ransancmeth\"> \
  <option value=\"fight\">Fight</option> \
  <option value=\"list\">List</option> \
</select> \
<INPUT type=\"button\" value=\"Income ROI\" input id=\"roido\" /> <br>\
<input type=\"checkbox\" id=\"missiono\" " + mochecked + " /> Missions \
<select style=\"border: 1px solid green; background: black; color: #00ff00; text-align: left;\" id=\"missiont\"> \
  <option value=\"best\">Best</option> \
  <option value=\"specific\">Specific</option> \
</select> \
<input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"mcat\" value=\"" + mcat + "\" />T#\
<input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"mnum\" value=\"" + mnum + "\" />M#<br>\
<input type=\"checkbox\" id=\"dosearch\" " + zchecked + " /> Search <input type=\"text\" style=\"border: 1px solid green; width: 8em; color: #00ff00; background: black; text-align: center;\" id=\"csearch\" value=\"" + csearch + "\" /> \
<input type=\"button\" value=\"Hide\" id=\"menutog\" style=\"border: 1px solid red; background: blue; text-align: center;\" /> <input type=\"button\" value=\" ? \" id=\"faq\" style=\"border: 1px solid blue; background: red; text-align: center;\"/>";
menu.style.padding = '10px';
menu.style.display = showorhide;
menu.style.position = 'fixed';
menu.style.background = 'black';
menu.style.top = '16%';
menu.style.zIndex = '1001';
menu.style.backgroundImage = "url('https://dl.dropboxusercontent.com/s/d18bcq32y4bcghk/rotten4pple.png?token_hash=AAG0lWdWvI1srfu5R9PsBwf44qhQbR3b4aIvsv3sA4RkQA&dl=1')";
menu.style.backgroundRepeat = "no-repeat";
menu.style.backgroundPosition = "top right";
document.body.insertBefore(menu, document.body.firstChild);
var displaytoggle = document.createElement('input');
displaytoggle.setAttribute('id', 'hiddentog');
displaytoggle.setAttribute('type', 'button');
displaytoggle.setAttribute('value', '-->');
displaytoggle.style.display = hideorshow;
displaytoggle.style.padding = '10px';
displaytoggle.style.position = 'fixed';
displaytoggle.style.top = '33%';
displaytoggle.style.background = 'green';
displaytoggle.style.border = '1px solid yellow';
displaytoggle.style.zIndex = '1001';
document.body.insertBefore(displaytoggle, document.body.firstChild);
if (game != "wwar") {
	var nke = document.getElementById("ntk");
	nke.parentNode.removeChild(nke);
}
setSelect('missiont', missiont);
setSelect('ransancmeth',ransancmeth);
if (game == "zl") {
    mcat = mcat + 4;
    mscat = mscat + 4;
}
if (game == "vl") {
    mcat = mcat + 10;
    mscat = mscat + 10;
}
if (game == "zl" || game == "kl" || game == "rol") {
	document.getElementById('missiont').disabled = true;
	GM_setValue('missiont', 'specific');
}
var mtogbtn = document.getElementById('menutog');
var htogbtn = document.getElementById('hiddentog');
var faqbtn = document.getElementById('faq');
mtogbtn.addEventListener('click', togglevisibility);
htogbtn.addEventListener('click', togglevisibility);
faqbtn.addEventListener('click', function() {
	getTxtFile("https://dl.dropboxusercontent.com/s/sf0tvy1csm3jpcf/scriptfaq.txt?token_hash=AAFBe2BjEG683BFHvtzUJJs4wOosCTbKrhchzt5B6SGp1g&dl=1", false)
});
if (game == "wwar") {
	setSelect('sancCountry', sancCountry);
}
var roiBtn = document.getElementById('roido');
roiBtn.addEventListener('click', function() {
    GM_setValue('doingroi',true);
    document.location = 'http://'+game+'.storm8.com/investment.php';
});

//Unhide names
if (page == "home") setTimeout(unHideNames,1500);
else unHideNames();

function checkOptions() {
	// autobanking
	if (document.getElementById('autobank').checked) GM_setValue("autobank", true);
	else GM_setValue("autobank", false);
	// auto healing
	if (document.getElementById('autoheal').checked) GM_setValue("autoHeal", true);
	else GM_setValue("autoHeal", false);
	var oldhealth = healthLimit;
	var newhealth = document.getElementById('healthlimit').value;
	if (oldhealth != newhealth) {
		healthLimit = newhealth;
		GM_setValue("healthLimit", parseInt(healthLimit));
	}
	//search
	if (document.getElementById('dosearch').checked) GM_setValue("dosearch", true);
	else GM_setValue("dosearch", false);
	var strSearch = document.getElementById('csearch').value;
	GM_setValue("csearch", strSearch);
	//health time
	var oldtimer = healthTimer;
	var newtimer = document.getElementById('healthtimer').value;
	if (oldtimer != newtimer) {
		healthTimer = newtimer;
		GM_setValue("healthTimer", newtimer);
		healmeth();
	}
	// autokill bounty
	if (document.getElementById('bounty').checked) GM_setValue("bounty", true);
	else GM_setValue("bounty", false);
	var oldsanc = bountyLevel;
	var newsanc = document.getElementById('bountylevel').value;
	if (oldsanc != newsanc) {
		bountyLevel = newsanc;
		GM_setValue("bountyLevel", parseInt(bountyLevel));
	}
	var oldammo = bountyAmmo;
	var newammo = document.getElementById('bountyammo').value;
	if (oldammo != newammo) {
		bountyAmmo = newammo;
		GM_setValue("bountyAmmo", parseInt(bountyAmmo));
	}
	// sancCountry
	if (game == "wwar") {
		var oldcountry = sancCountry;
		var newcountry = document.getElementById('sancCountry').value;
		if (oldcountry != newcountry) {
			sancCountry = newcountry;
			GM_setValue("sancCountry", sancCountry);
		}
	}
	// autosanc
	var oldNum = autosancNum;
	var newNum = document.getElementById('autosancNum').value;
	if (oldNum != newNum) {
		autosancNum = newNum;
		GM_setValue("autosancNum", parseInt(autosancNum));
	}
	var oldbounty = amount;
	var newbounty = document.getElementById('amount').value;
	if (oldbounty != newbounty) {
		amount = newbounty;
		GM_setValue("amount", parseInt(amount));
	}
	// auto re-attack
	if (document.getElementById('autoAttack').checked) GM_setValue("autoAttack", true);
	else GM_setValue("autoAttack", false);
	//ral
	if (document.getElementById('ral').checked) GM_setValue("killAfterLose", true);
	else GM_setValue("killAfterLose", false);
	//bk
	if (document.getElementById('bk').checked) GM_setValue("bountykill", true);
	else GM_setValue("bountykill", false);
	// auto clean-wall
	if (document.getElementById('cleanWall').checked) GM_setValue("cleanWall", true);
	else GM_setValue("cleanWall", false);
	// show message-box?
	GM_setValue("messageBox", document.getElementById('messageBox').checked);
	if (document.getElementById('missiono').checked) {
		GM_setValue("missiono", "on");
	} else GM_setValue("missiono", "off");
	var oldcat = mcat;
	var newcat = document.getElementById('mcat').value;
	if (oldcat != newcat) {
		GM_setValue("mcat", parseInt(newcat));
	}
	var oldnum = mnum;
	var newnum = document.getElementById('mnum').value;
	if (oldnum != newnum) {
		GM_setValue("mnum", parseInt(newnum));
	}
	var oldmt = missiont;
	var newmt = document.getElementById('missiont').value;
	if (oldmt != newmt) GM_setValue("missiont", newmt);
	if (document.getElementById('ransanc').checked) {
		GM_setValue("ransanc", true);
	} else GM_setValue("ransanc", false);
	var oldrn = ransancnum;
	var newrn = parseInt(document.getElementById('ransancnum').value);
	if (oldrn != newrn) GM_setValue("ransancnum",newrn);
	var oldrm = ransancmeth;
	var newrm = document.getElementById('ransancmeth').value;
	if (oldrm != newrm) GM_setValue("ransancmeth", newrm);
}

// AutoHeal
if (autoheal) {
	var healthCurrent = parseInt(document.getElementById('healthCurrent').innerHTML);
	var healthMax = parseInt(document.getElementById('healthMax').innerHTML);
	if (ahd > 0) setTimeout(function(){document.location = hospitallink;}, ahd);
	if (healthCurrent < healthLimit && healthCurrent < healthMax) {
		if (page != "hospital") document.location = hospitallink;
		else setTimeout(function(){document.location = document.getElementsByClassName('tac healBtn')[0].getElementsByTagName('a')[0].href;},randomFromInterval(1000,2000));
	}
}

// CleanWall
if (cleanWall) {
	var postComment = document.getElementsByClassName('btnMed btnPostComment');
	if (page == "profile" && postComment != null && postComment.length > 0) {
		var messages = document.getElementsByClassName('newsFeedItemMsg');
		if (messages.length > 0) {
			var lnks = messages[0].getElementsByTagName("a");
			var mPuid = getQueryVariable(lnks[0].href, 'puid');
			if (PUID == mPuid || (PUID == '' && mPuid == null)) {
				cleanWall = false;
				GM_setValue('cleanWall', false);
			} else {
				if (lnks.length > 1) document.location = lnks[1];
				else document.location = lnks[0];
			}
		} else {
			cleanWall = false;
			GM_setValue('cleanWall', false);
		}
	}
}

var arrayPuid = puidArray;
var selBox = document.getElementById('selectboxPUID');
var getBtn = document.getElementById('btnGETPUID');
var clrBtn = document.getElementById('btnCLRPUID');
var clrAll = document.getElementById('btnCLRALL');
var btnSet = document.getElementById('btnSET');
var searchBox = document.getElementById('csearch');
selBox.addEventListener('change', function() {
	checkOpts(arrayPuid);
}, true);
getBtn.addEventListener('click', function() {
	getPuid(false);
}, true);
clrBtn.addEventListener('click', function() {
	clrPuid(false);
}, true);
clrAll.addEventListener('click', function() {
	clrPuid(true);
}, true);
btnSet.addEventListener('click', function() {
	getPuid(true);
}, true);
searchBox.addEventListener('change', function() {
	GM_setValue('csearch', searchBox.value);
	if (searchBox.value == "") btnSet.disabled = true;
	else btnSet.disabled = false;
}, true);
getBtn.disabled = true;
clrBtn.disabled = true;
clrAll.disabled = true;
btnSet.disabled = true;
if (page == "profile") getBtn.disabled = false;
if (searchBox.value != "" && GM_getValue('puidSet', '') != searchBox.value) btnSet.disabled = false;
if (arrayPuid != "") {
	clrBtn.disabled = false;
	clrAll.disabled = false;
	createOpts(arrayPuid, false);
	setSelect('selectboxPUID', puidSelected);
	if (page == "profile") {
		checkOpts(arrayPuid);
	}
}

if (GM_getValue('doingroi',false) && page == "investment") doroistuff();

if (page == "profile" && ransanc && ransancnum > 0) {
    if (ransancmeth == "fight" || (ransancmeth == "list" && GM_getValue('ransancrdy',false))) {
        GM_setValue('ransancrdy',false);
        var buttons = document.getElementsByClassName('buttonHolder')[0].getElementsByTagName('input');
        click(buttons[buttons.length - 1]);
    }
    if (ransancmeth == "list" && GM_getValue('ransancprof',false)) {
        var links = document.getElementsByTagName('a');
        if (links) {
            var j = 0;
            for (var i=0; i<links.length; i++) {
                var plink = links[i].href.indexOf('puid');
                var chance = randomFromInterval(0,5);
                var newsitem = document.getElementsByClassName('newsFeedItem');
                if (plink != -1) {
                    j++;
                    if (chance == 5) {
                        GM_setValue('ransancprof',false);
                        GM_setValue('ransancrdy',true);
                        click(links[i]);
                    }
                }
                if (j == newsitem.length) {
                    GM_setValue('ransancprof',false);
                    document.location = "http://"+game+".storm8.com/hitlist.php";
                }
            }
        } else {
            GM_setValue('ransancprof',false);
            document.location = "http://"+game+".storm8.com/hitlist.php";
        }
    }
    if (ransancmeth == "list" && GM_getValue('ransanchit',false)) {
        var comtab = document.getElementById('sectionTabs').getElementsByTagName('a')[1].href;
        GM_setValue('ransanchit',false);
        GM_setValue('ransancprof',true);
        document.location = comtab;
    }
}

if (page == "bounty" && ransanc && ransancnum > 0) {
    var failed = document.getElementsByClassName('messageBoxFail')[0];
    if (failed) {
        var failr = failed.innerHTML;
        if (failr.indexOf('too many people') != -1) {
            GM_setValue('ransancoff',true);
            document.location = "http://"+game+".storm8.com/home.php";
        } else {
            if (ransancmeth == "fight") document.location = "http://"+game+".storm8.com/fight.php";
            if (ransancmeth == "list") document.location = "http://"+game+".storm8.com/hitlist.php";
        }
    }
    var form = document.getElementById('bountyForm');
    if (game == "im" || game == "rl") {
        var minpay = parseInt(form.getElementsByTagName('span')[0].innerHTML.replace(/,/g,'').replace(/[$]/g,''));
	}
    else var minpay = parseInt(form.getElementsByTagName('span')[0].childNodes[1].nodeValue.replace(/,/g,''));
	form.getElementsByTagName('input')[0].value = minpay;
	if (!failed) {
        click_sanc();
        GM_setValue('ransancgo',true);
    }
}

if (page == "hitlist" && ransanc && GM_getValue('ransancgo',false)) {
    GM_setValue('ransancnum',ransancnum-1);
    GM_setValue('ransancgo',false);
    if (ransancmeth == "fight") document.location = "http://"+game+".storm8.com/fight.php";
    if (ransancmeth == "list") document.location = "http://"+game+".storm8.com/hitlist.php";
}

if (page == "home" && GM_getValue('ransancoff',false)) {
    GM_setValue('ransancoff',false);
    document.getElementById('ransanc').checked = false;
}

if (((page == "fight" && ransancmeth == "fight") || (page == "hitlist" && ransancmeth == "list")) && ransanc && ransancnum > 0) {
    var links = document.getElementsByTagName('a');
    if (links) {
        var j = 0;
        for (var i=0; i<links.length; i++) {
            var plink = links[i].href.indexOf('puid');
            var chance = randomFromInterval(0,5);
            var fighttable = document.getElementsByClassName('fightTable');
            if (plink != -1) {
                j++;
                if (chance == 5) {
                    if (ransancmeth == "list") GM_setValue('ransanchit',true);
                    click(links[i]);
                }
            }
            if (j > 9) location.reload();
            if (j == fighttable.length) setTimeout(function(){location.reload();},randomFromInterval(1000,2500));
        }
    } else setTimeout(function(){location.reload();},randomFromInterval(1000,2500));
}

if (page == "missions" && missiono == "on") {
    var energy = document.getElementById("energyCurrent").innerHTML;
	if (missionl == 708 || missionl == 4316) {
		var mt = document.getElementsByClassName('missionTable')[2];
		var energyneed = mt.getElementsByClassName("requiredEnergy")[0].innerHTML;
		if (energy == energyneed) {
			click(document.getElementsByClassName('actionButton')[2]);
			GM_setValue('mission' + game, 0);
			return;
		} else {
			var ut = randomFromInterval(600000, 900000);
			setTimeout(function(){location.reload();}, ut);
			return;
		}
	}
	if (missionl == 759 || missionl == 8810 || missionl == 617 || missionl == 738) {
		var mt = document.getElementsByClassName('missionTable')[3];
		var energyneed = mt.getElementsByClassName("requiredEnergy")[0].innerHTML;
		if (energy == energyneed) {
			click(document.getElementsByClassName('actionButton')[3]);
			GM_setValue('mission' + game, 0);
			return;
		} else {
			var ut = randomFromInterval(600000, 900000);
			setTimeout(function(){location.reload();}, ut);
			return;
		}
	}
	if (missionl == 829 || missionl == 102) {
		var mt = document.getElementsByClassName('missionTable')[5];
		var energyneed = mt.getElementsByClassName("requiredEnergy")[0].innerHTML;
		if (energy == energyneed) {
			click(document.getElementsByClassName('actionButton')[5]);
			GM_setValue('mission' + game, 0);
			return;
		} else {
			var ut = randomFromInterval(600000, 900000);
			setTimeout(function(){location.reload();}, ut);
			return;
		}
	}
	if (missionl == 9010 || missionl == 9310 || missionl == 4516) {
		var mt = document.getElementsByClassName('missionTable')[9];
		var energyneed = mt.getElementsByClassName("requiredEnergy")[0].innerHTML;
		if (energy == energyneed) {
			click(document.getElementsByClassName('actionButton')[9]);
			GM_setValue('mission' + game, 0);
			return;
		} else {
			var ut = randomFromInterval(600000, 900000);
			setTimeout(function(){location.reload();}, ut);
			return;
		}
	}
	if (missionl == 9510 || missionl == 153 || missionl == 1012 || missionl == 6914) {
		var mt = document.getElementsByClassName('missionTable')[7];
		var energyneed = mt.getElementsByClassName("requiredEnergy")[0].innerHTML;
		if (energy == energyneed) {
			click(document.getElementsByClassName('actionButton')[7]);
			GM_setValue('mission' + game, 0);
			return;
		} else {
			var ut = randomFromInterval(600000, 900000);
			setTimeout(function(){location.reload();}, ut);
			return;
		}
	}
	if (missionl == 486 || missionl == 6714 || missionl == 2616) {
		var mt = document.getElementsByClassName('missionTable')[4];
		var energyneed = mt.getElementsByClassName("requiredEnergy")[0].innerHTML;
		if (energy == energyneed) {
			click(document.getElementsByClassName('actionButton')[4]);
			GM_setValue('mission' + game, 0);
			return;
		} else {
			var ut = randomFromInterval(600000, 900000);
			setTimeout(function(){location.reload();}, ut);
			return;
		}
	}
	if (missionl == 768949) {
		var mt = document.getElementsByClassName('missionTable')[11];
		var energyneed = mt.getElementsByClassName("requiredEnergy")[0].innerHTML;
		if (energy == energyneed) {
			click(document.getElementsByClassName('actionButton')[11]);
			GM_setValue('mission' + game, 0);
			return;
		} else {
			var ut = randomFromInterval(600000, 900000);
			setTimeout(function(){location.reload();}, ut);
			return;
		}
	}
	if (missionl == 889) {
		var mt = document.getElementsByClassName('missionTable')[0];
		var energyneed = mt.getElementsByClassName("requiredEnergy")[0].innerHTML;
		if (energy == energyneed) {
			click(document.getElementsByClassName('actionButton')[0]);
			GM_setValue('mission' + game, 0);
			return;
		} else {
			var ut = randomFromInterval(600000, 900000);
			setTimeout(function(){location.reload();}, ut);
			return;
		}
	}
	if (missionl == 1714) {
		var mt = document.getElementsByClassName('missionTable')[8];
		var energyneed = mt.getElementsByClassName("requiredEnergy")[0].innerHTML;
		if (energy == energyneed) {
			click(document.getElementsByClassName('actionButton')[8]);
			GM_setValue('mission' + game, 0);
			return;
		} else {
			var ut = randomFromInterval(600000, 900000);
			setTimeout(function(){location.reload();}, ut);
			return;
		}
	}
	var mission = document.getElementsByClassName("boxedItem");
	for (var i=0;i<mission.length;i++) {
		var fail = document.getElementsByClassName("fail").length;
		var htmldump = document.getElementsByTagName('body')[0].innerHTML;
		if (fail && (htmldump.indexOf('to complete the mission') != -1 || htmldump.indexOf('Buy the cars/parts for'))) {
			var buyunits = document.getElementsByClassName('btnMed btnDoAgain')[0];
			if (buyunits) {
				click(buyunits);
				return;
			}
			if (!buyunits) {
				var cat = String(location).split('cat=')[1].split('&')[0];
				var job = String(location).split('jid=')[1].split('&')[0];
				if (job == "16" && cat == "3" && game == "wwar") {
					click(document.getElementsByClassName('actionButton')[0]);
					return;
				}
				if (job == "20" && cat == "4" && game == "wwar") {
					click(document.getElementsByClassName('actionButton')[2]);
					return;
				}
				if (job == "104" && cat == "5" && game == "wwar") {
					click(document.getElementsByClassName('actionButton')[1]);
					return;
				}
				if (job == "70" && cat == "8" && game == "wwar") {
					document.location = 'http://wwar.storm8.com/missions.php?cat=6';
					GM_setValue('mission' + game, 708);
					return;
				}
				if (job == "75" && cat == "9" && game == "wwar") {
					document.location = 'http://wwar.storm8.com/missions.php?cat=7';
					GM_setValue('mission' + game, 759);
					return;
				}
				if (job == "82" && cat == "9" && game == "wwar") {
					document.location = 'http://wwar.storm8.com/missions.php?cat=6';
					GM_setValue('mission' + game, 829);
					return;
				}
				if (job == "88" && cat == "10" && game == "wwar") {
					document.location = 'http://wwar.storm8.com/missions.php?cat=8';
					GM_setValue('mission' + game, 8810);
					return;
				}
				if (job == "90" && cat == "10" && game == "wwar") {
					document.location = 'http://wwar.storm8.com/missions.php?cat=8';
					GM_setValue('mission' + game, 9010);
					return;
				}
				if (job == "93" && cat == "10" && game == "wwar") {
					document.location = 'http://wwar.storm8.com/missions.php?cat=9';
					GM_setValue('mission' + game, 9310);
					return;
				}
				if (job == "95" && cat == "10" && game == "wwar") {
					document.location = 'http://wwar.storm8.com/missions.php?cat=6';
					GM_setValue('mission' + game, 9510);
					return;
				}
				if (job == "10" && cat == "2" && game == "im") {
					document.location = 'http://im.storm8.com/missions.php?cat=1';
					GM_setValue('mission' + game, 102);
					return;
				}
				if (job == "13" && cat == "2" && game == "im") {
					click(document.getElementsByClassName('actionButton')[3]);
					return;
				}
				if (job == "15" && cat == "3" && game == "im") {
					document.location = 'http://im.storm8.com/missions.php?cat=2';
					GM_setValue('mission' + game, 153);
					return;
				}
				if (job == "48" && cat == "6" && game == "im") {
					document.location = 'http://im.storm8.com/missions.php?cat=5';
					GM_setValue('mission' + game, 486);
					return;
				}
				if (job == "61" && cat == "7" && game == "im") {
					document.location = 'http://im.storm8.com/missions.php?cat=6';
					GM_setValue('mission' + game, 617);
					return;
				}
				if (job == "73" && cat == "8" && game == "im") {
					document.location = 'http://im.storm8.com/missions.php?cat=7';
					GM_setValue('mission' + game, 738);
					return;
				}
				if (((job == "76" && cat == "8") || (job == "94" && cat == "9")) && game == "im") {
					document.location = 'http://im.storm8.com/missions.php?cat=7';
					GM_setValue('mission' + game, 768949);
					return;
				}
				if (job == "88" && cat == "9" && game == "im") {
					document.location = 'http://im.storm8.com/missions.php?cat=4';
					GM_setValue('mission' + game, 889);
					return;
				}
				if (job == "61" && cat == "11" && game == "vl") {
					click(document.getElementsByClassName('actionButton')[2]);
					return;
				}
				if (job == "6" && cat == "11" && game == "vl") {
					click(document.getElementsByClassName('actionButton')[3]);
					return;
				}
				if (job == "10" && cat == "12" && game == "vl") {
					document.location = 'http://vl.storm8.com/missions.php?cat=11';
					GM_setValue('mission' + game, 1012);
					return;
				}
				if (job == "11" && cat == "12" && game == "vl") {
					click(document.getElementsByClassName('actionButton')[0]);
					return;
				}
				if (job == "13" && cat == "13" && game == "vl") {
					click(document.getElementsByClassName('actionButton')[1]);
					return;
				}
				if (job == "67" && cat == "14" && game == "vl") {
					document.location = 'http://vl.storm8.com/missions.php?cat=13';
					GM_setValue('mission' + game, 6714);
					return;
				}
				if (job == "69" && cat == "14" && game == "vl") {
					document.location = 'http://vl.storm8.com/missions.php?cat=13';
					GM_setValue('mission' + game, 6914);
					return;
				}
				if (job == "17" && cat == "14" && game == "vl") {
					document.location = 'http://vl.storm8.com/missions.php?cat=13';
					GM_setValue('mission' + game, 1714);
					return;
				}
				if (job == "71" && cat == "14" && game == "vl") {
					click(document.getElementsByClassName('actionButton')[7]);
					return;
				}
				if (job == "43" && cat == "16" && game == "vl") {
					document.location = 'http://vl.storm8.com/missions.php?cat=14';
					GM_setValue('mission' + game, 4316);
					return;
				}
				if (job == "26" && cat == "16" && game == "vl") {
					document.location = 'http://vl.storm8.com/missions.php?cat=15';
					GM_setValue('mission' + game, 2616);
					return;
				}
				if (job == "45" && cat == "16" && game == "vl") {
					document.location = 'http://vl.storm8.com/missions.php?cat=15';
					GM_setValue('mission' + game, 4516);
					return;
				}
				if (job == "92" && cat == "17" && game == "vl") {
					click(document.getElementsByClassName('actionButton')[4]);
					return;
				}
				if (job == "114" && cat == "19" && game == "vl") {
					click(document.getElementsByClassName('actionButton')[4]);
					return;
				} else {
                    if (parseInt(job) > 0 && parseInt(cat) > 0 && htmldump.indexOf('Refill') == -1) {
                        alert('You are missing a loot item and it has not been coded to go collect it automatically.');
                        return;
                    } else {
                        var ut = randomFromInterval(600000, 900000);
                        setTimeout(function(){document.location='http://'+game+'.storm8.com/missions.php?cat='+cat;}, ut);
                        return;
                    }
				}
			}
		}
		if ((String(location).indexOf('cat=') == -1 && String(location).indexOf('jid=') == -1) || (String(location).indexOf('buyMissingItems') != -1 && String(location).indexOf('cat=') == -1) || htmldump.indexOf('mastery for this category') != -1) {
            var tab = document.getElementsByClassName('selected')[0];
			if (tab) {
				var ttab = tab.getElementsByTagName('a')[0];
				click(ttab);
				return;
			} else {
				document.location = 'http://'+game+'.storm8.com/missions.php?cat='+mscat;
				return;
			}
		}
		if ((String(location).indexOf('cat=') != -1 && parseInt(String(location).split('cat=')[1].split('&')[0]) > 25)) {
			document.location = 'http://'+game+'.storm8.com/missions.php?cat='+mscat;
			return;
		}
		var missionpart = mission[i].getElementsByClassName("missionTable")[0];
		var energyneed = missionpart.getElementsByClassName("requiredEnergy")[0].innerHTML;
		var doit = missionpart.getElementsByClassName("actionButton")[0];
		if (game != "zl" && game != "kl" && game != "rol") {
			var percentdone = missionpart.getElementsByClassName("masteryBarProgress")[0].innerHTML.split('%')[0];
			if (missiont == "best") {
				if (percentdone != "100" && parseInt(energy) >= parseInt(energyneed)) {
					click(doit);
					return;
				}
				if (percentdone != "100" && parseInt(energy) < parseInt(energyneed) && (i+1) == mission.length) {
					var cat = String(location).split('cat=')[1].split('&')[0];
					var ut = randomFromInterval(600000, 900000);
					setTimeout(function(){document.location='http://'+game+'.storm8.com/missions.php?cat='+cat;}, ut);
					return;
				}
				var temp = document.getElementsByTagName('body')[0].innerHTML;
				var count = temp.replace(/(<([^>]+)>)/ig,'');
                var count2 = count.match(/100%.Rank/g);
                if(count2) {
				    if (count2.length == mission.length) switchmission();
				}
			}
		}
		if (missiont == "specific") {
			var cat = String(location).split('cat=')[1].split('&')[0];
			if (cat == mcat) {
				var f = mnum - 1;
				var missionpart = mission[f].getElementsByClassName("missionTable")[0];
				var energyneed = missionpart.getElementsByClassName("requiredEnergy")[0].innerHTML;
				var doit = missionpart.getElementsByClassName("actionButton")[0];
				if (parseInt(energy) >= parseInt(energyneed)) {
					click(doit);
					return;
				}
				if (parseInt(energy) < parseInt(energyneed)) {
					var ut = randomFromInterval(600000, 900000);
					setTimeout(function(){document.location='http://'+game+'.storm8.com/missions.php?cat='+cat;}, ut);
					return;
				}
			}
		}
	}
}

function switchmission() {
	var cat = parseInt(String(location).split('cat=')[1].split('&')[0]);
	var nextcat = cat+1;
	document.location = 'http://'+game+'.storm8.com/missions.php?cat='+nextcat;
}

//puidkill and search
if (dosearch || puidArray != "" || bountykill) {
	var postComment = document.getElementsByClassName('btnMed btnPostComment');
	if (dosearch && page == "profile" && postComment != null && postComment.length > 0 && cleanwall == false) {
		var lnks = document.links;
		var wasfound = false;
		var mystring = csearch;
		for (i = 0; i < lnks.length; i++) {
			var tPuid = getQueryVariable(lnks[i].href, 'puid');
			if (tPuid == null) continue;
			var test = lnks[i].href;
			if (test.indexOf(csearch) >= 0) {
				wasfound = true;
				document.location = lnks[i];
				break;
			}
			if (puidArray != "") {
				for (j = 0; j < puidArray.length; ++j) {
					if (test.indexOf(csearch) >= 0 || parseInt(puidArray[j]) == tPuid) {
						wasfound = true;
						document.location = lnks[i];
						break;
					}
				}
			}
		}
		if (!wasfound) {
			for (j = lnks.length - 1; j >= 0; j--) {
				var test2 = lnks[j].innerHTML;
				if (test2.indexOf("Next") == 0) {
					document.location = lnks[j];
					break;
				}
			}
		}
	}
	if (page == "hitlist") {
		if (parseInt(document.getElementById('healthCurrent').innerHTML) <= 26) {
			GM_setValue('akheal', true);
		}
		if (!dosearch) {
			var wasfound = false;
			var ammo = parseInt(document.getElementById('staminaCurrent').innerHTML);
			if (!healing) {
				var alive = document.getElementsByClassName('doAgainTxt');
				if (alive.length > 0) {
					var next = alive[0].getElementsByTagName('input')[0];
					if (ammo >= bountyAmmo) click(next);
					return;
				}
				var sancList = document.getElementsByClassName('fightTable');
				for (i = 0; i < sancList.length; i++) {
					var fields = sancList[i].getElementsByTagName('td');
					if (game == "wwar" || game == "vl" || game == "zl" || game == "rl") {
						var name = fields[1].getElementsByTagName('a')[0].innerHTML;
						var tPuid = getQueryVariable(String(fields[1].getElementsByTagName('a')[0]), 'puid');
						for (j = 0; j < puidArray.length; ++j) {
							var PUID = parseInt(puidArray[j]);
							if (PUID == tPuid) {
								wasfound = true;
							}
						}
						if (bountykill && amount != 0) {
							if (game != "rl") {
								var cash = fields[3].getElementsByClassName('cash')[0].getElementsByTagName('span')[0].innerHTML.split('>')[1];
								if (cash == amount) wasfound = true;
								var cash2 = cash.replace(/\,/g, "");
								if (cash2.indexOf('K') != -1) {
									var cashK = cash2.split('K')[0] * 1000;
									if (cashK == amount) wasfound = true;
								}
								if (cash2.indexOf('M') != -1) {
									var cashM = cash2.split('M')[0] * 1000000;
									if (cashM == amount) wasfound = true;
								} else if (cash2 == amount) wasfound = true;
							} else {
								var cashD = fields[3].getElementsByClassName('cash')[0].getElementsByTagName('span')[0].innerHTML.split('$')[1];
								if (cashD == amount) wasfound = true;
								var cash3 = cashD.replace(/\,/g, "");
								if (cash3.indexOf('K') != -1) {
									var cashK = cash3.split('K')[0] * 1000;
									if (cashK == amount) wasfound = true;
								}
								if (cash3.indexOf('M') != -1) {
									var cashM = cash3.split('M')[0] * 1000000;
									if (cashM == amount) wasfound = true;
								} else if (cash3 == amount) wasfound = true;
							}
						}
						if (wasfound) {
							var AttackButton = fields[5].getElementsByTagName('a')[0];
							if (ammo >= bountyAmmo) click(AttackButton);
							break;
						}
					} else {
						var name = fields[0].getElementsByTagName('a')[0].innerHTML;
						var tPuid = getQueryVariable(String(fields[0].getElementsByTagName('a')[0]), 'puid');
						for (j = 0; j < puidArray.length; ++j) {
							var PUID = parseInt(puidArray[j]);
							if (PUID == tPuid) {
								wasfound = true;
							}
						}
						if (bountykill && amount != 0) {
							if (game != "im") {
								var cash = fields[2].getElementsByClassName('cash')[0].getElementsByTagName('span')[0].innerHTML.split('>')[1];
								if (cash == amount) wasfound = true;
								var cash2 = cash.replace(/\,/g, "");
								if (cash2.indexOf('K') != -1) {
									var cashK = cash2.split('K')[0] * 1000;
									if (cashK == amount) wasfound = true;
								}
								if (cash2.indexOf('M') != -1) {
									var cashM = cash2.split('M')[0] * 1000000;
									if (cashM == amount) wasfound = true;
								} else if (cash2 == amount) wasfound = true;
							} else {
								var cashD = fields[2].getElementsByClassName('cash')[0].getElementsByTagName('span')[0].innerHTML.split('$')[1];
								if (cashD == amount) wasfound = true;
								var cash3 = cashD.replace(/\,/g, "");
								if (cash3.indexOf('K') != -1) {
									var cashK = cash3.split('K')[0] * 1000;
									if (cashK == amount) wasfound = true;
								}
								if (cash3.indexOf('M') != -1) {
									var cashM = cash3.split('M')[0] * 1000000;
									if (cashM == amount) wasfound = true;
								} else if (cash3 == amount) wasfound = true;
							}
						}
						if (wasfound) {
							var AttackButton = fields[4].getElementsByTagName('a')[0];
							if (ammo >= bountyAmmo) click(AttackButton);
							break;
						}
					}
				}
				if (!wasfound) {
					var tabs = document.getElementById('sectionTabs');
					setTimeout(function(){document.location = tabs.getElementsByTagName("a")[1];}, randomFromInterval(250, 1000));
				}
			}
		} else {
			var lnks = document.links;
			var wasfound = false;
			var mystring = csearch;
			for (i = 0; i < lnks.length; i++) {
				var test = lnks[i].href;
				if (test.indexOf(csearch) >= 0) {
					wasfound = true;
					document.location = lnks[i];
					break;
				}
			}
			if (!wasfound) {
				setTimeout(function(){document.location = hitlistlink;}, randomFromInterval(250, 1000));
			}
		}
	}
}

// AutoBank
function bankIt() {
	if (GM_getValue("autobank", false)) {
		var cash = getCash();
		if (cash > 0) postwith("bank.php", ['depositAmount', cash, 'action', 'Deposit']);
	}
}

// MessageBox
if (messageBox == true) {
	// Remove messageBox
	var messageBox = document.getElementsByClassName('messageBox infoBox');
	if (messageBox.length > 0) {
		for (i = messageBox.length - 1; i >= 0; i--) {
			messageBox[i].parentNode.removeChild(messageBox[i]);
		}
	}
	// Remove ads
	var successMsg = document.getElementsByClassName('messageBoxSuccess')[0];
	if (successMsg != null) {
		var installAction = successMsg.getElementsByClassName('installAction')[0];
		if (installAction != null) {
			successMsg.parentNode.removeChild(successMsg);
		}
	}
}

if (autoAttack) {
	var healthCurrent = parseInt(document.getElementById('healthCurrent').innerHTML);
	if (page == "fight" && autoAttack && healthCurrent > 26) {
        var elementBtnMed = document.getElementsByClassName('btnMed')[2];
		var attackurl = elementBtnMed.getAttribute('onclick').split("href='/")[1].split("';")[0];
		attackurl = "http://"+game+".storm8.com/"+attackurl;
		var won = document.getElementsByClassName('lostFight').length;
		if (!killAfterLose && won && elementBtnMed != null) {
			document.location = attackurl;
		}
		if (killAfterLose && won) {
			return;
		} else if (elementBtnMed != null) {
			document.location = attackurl;
		}
	} else if (page == "fight" && healthCurrent <= 26) {
        GM_setValue('need2heal', 1);
		document.location = hospitallink;
	} else if (page == "hospital" && healthCurrent <= 26 && need2heal == 1) {
        GM_setValue('need2heal', 2);
		document.location = document.getElementsByClassName('tac healBtn')[0].getElementsByTagName('a')[0].href;
	} else if (page == "hospital" && healthCurrent > 26 && need2heal == 2) {
        GM_setValue('need2heal', 0);
		window.history.go(-3);
	}
}

// Autokill
if (page == "hitlist" && GM_getValue("bounty", false)) attackSanc(killAfterLose);

if (GM_getValue('akheal', false)) {
	var healthCurrent = parseInt(document.getElementById('healthCurrent').innerHTML);
	if (page == "hitlist" && healthCurrent <= 26) {
		document.location = hospitallink;
	} else if (page == "hospital" && healthCurrent <= 26) {
		document.location = document.getElementsByClassName('tac healBtn')[0].getElementsByTagName('a')[0].href;
	} else if (page == "hospital" && healthCurrent > 26) {
		document.location = hitlistlink;
		GM_setValue('akheal', false);
	}
}

function attackSanc(noReattack) {
	// Check health
	if (parseInt(document.getElementById('healthCurrent').innerHTML) <= 26) {
		GM_setValue('akheal', true);
		return;
	}
	// Check ammo
	if (document.getElementById('staminaCurrent').innerHTML == 0) {
		var delay = Math.random() * 5;
		var time = document.getElementById('staminaType').innerHTML.split(':');
		var seconds = parseInt(time[0]) * 60 + parseInt(time[1]) + delay;
		bountyAmmo = Math.max(1, bountyAmmo);
		seconds = seconds + 100 * (bountyAmmo - 1);
		setTimeout(function(){document.location = hitlistlink;}, Math.floor(1000 * seconds));
		return;
	}
	// Check for reattack
	if (!noReattack) {
		var won = document.getElementsByClassName('lostFight').length;
		var alive = document.getElementsByClassName('doAgainTxt');
		if (won && alive.length > 0) {
			var next = alive[0].getElementsByTagName('input')[0];
			click(next);
			return;
		}
	}
	// Find a new person to attack
	var people = document.getElementsByClassName("fightTable");
	var found = false;
	for (i = 0; i < people.length; i++) {
		var fields = people[i].getElementsByTagName("td");
		if (game == "wwar" || game == "vl" || game == "zl" || game == "rl") {
			var level = parseInt(fields[1].getElementsByTagName("div")[1].innerHTML.substr(6));
			if (game == "wwar") {
				var country = fields[0].getElementsByTagName("img")[0].src.split("/")[6].substr(0, 1);
				if (level < bountyLevel && country != sancCountry) {
					var link = fields[5].getElementsByTagName('a')[0];
					click(link);
					clink(link);
					found = true;
					break;
				}
			}
			if (game == "vl" || game == "zl") {
				var level = parseInt(fields[1].getElementsByTagName("div")[1].innerHTML.substr(4));
				if (level < bountyLevel) {
					var link = fields[5].getElementsByTagName('a')[0];
					click(link);
					clink(link);
					found = true;
					break;
				}
			}
			if (game == "rl") {
				if (level < bountyLevel) {
					var link = fields[5].getElementsByTagName('a')[0];
					click(link);
					clink(link);
					found = true;
					break;
				}
			}
		} else {
			var level = parseInt(fields[0].getElementsByTagName("div")[1].innerHTML.substr(6));
			if (level < bountyLevel) {
				var link = fields[4].getElementsByTagName('a')[0];
				click(link);
				clink(link);
				found = true;
				break;
			}
		}
	}
	if (!found) setTimeout(function() {document.location = hitlistlink;}, randomFromInterval(250, 1000));
}

if (resanc) {
	if (page == "hitlist") {
		document.location = homelink;
	}
	if (page == "home") {
		setTimeout(resanc_home, 1000);
	}
	if (page == "profile") {
		var buttons = document.getElementsByClassName('buttonHolder')[0].getElementsByTagName('input');
		click(buttons[buttons.length - 1]);
	}
}

function resanc_home() {
	var a = document.getElementsByTagName('a');
	var found = false;
	for (i = 0; i < a.length; i++) {
		if (a[i].innerHTML == resanc) {
			found = true;
			break;
		}
	}
	if (GM_getValue('rechecksanchome', false) && !found) {
		GM_setValue('resanc', false);
		GM_setValue('rechecksanchome', false);
	}
	if (!found) {
		setTimeout(function(){location.reload();}, randomFromInterval(1000, 3000));
		GM_setValue('rechecksanchome', true);
	} else {
		GM_setValue('rechecksanchome', false);
		document.location = a[i];
	}
}

// AutoBounty
if (page == "bounty" && !ransanc) {
	GM_setValue("resanc", false);
	var form = document.getElementById('bountyForm');
	var target = document.getElementsByClassName('sectionHeader')[0].innerHTML.split('"')[1];
	form.getElementsByTagName('input')[0].value = amount;
	if (autosancNum > 0) {
		GM_setValue('resanc', target);
		GM_setValue('autosancNum', autosancNum - 1);
		// See if it failed to sanction
		var n = 0;
		var fails = document.getElementsByClassName('messageBoxFail');
		if (fails.length > 0) {
			GM_setValue('autosancNum', autosancNum);
			if (fails[0].innerHTML.length == 114 + resanc.length || fails[0].innerHTML.length == 110 + resanc.length) {
				// Too many sancs for today
				GM_setValue('resanc', false);
				return;
			}
			n = randomFromInterval(3000, 10000);
		}
		setTimeout(click_sanc, n);
	}
}

function click_sanc() {
	click(document.getElementById('bountyForm').getElementsByClassName('btnBroadcast')[0]);
}

function click(e, type) {
	if (!e) {
		return;
	}
	if (typeof e == 'string') e = document.getElementById(e);
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent((type || 'click'), true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	e.dispatchEvent(evObj);
}

function togglevisibility() {
	var vismenu = document.getElementById('s8fixermenu');
	var btnshow = document.getElementById('hiddentog');
	var vismenudisp = window.getComputedStyle(vismenu, null).getPropertyValue("display");
	if (vismenudisp == "block") {
		vismenu.style.display = 'none';
		btnshow.style.display = 'block';
		GM_setValue("showorhide", "none");
		GM_setValue("hideorshow", "block");
	}
	if (vismenudisp == "none") {
		vismenu.style.display = 'block';
		btnshow.style.display = 'none';
		GM_setValue("showorhide", "block");
		GM_setValue("hideorshow", "none");
	}
}

function getTxtFile(url, isUpdate) {
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", url, true);
	txtFile.onreadystatechange = function() {
		if (txtFile.readyState === 4) {
			if (txtFile.status === 200) {
				if (!isUpdate) {
					alert(txtFile.responseText);
				}
				if (isUpdate && txtFile.responseText != curVer) {
					getTxtFile('https://dl.dropboxusercontent.com/s/8s2p7yf0dr1bfyg/update.txt?token_hash=AAFAdZsSJHwlOsImrRrKmT9rfPXwy4ZB3QIL5LXhOrzZwA&dl=1', false);
				}
			}
		}
	}
	txtFile.send(null);
}

function getQueryVariable(query, variable) {
	var qm = query.indexOf('?');
	if (qm >= 0) query = query.substring(qm + 1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) return pair[1];
	}
}

function healmeth() {
	var box = document.getElementById('healthtimer').value;
	var fn = box.split('-')[0] * 1000;
	var sn = box.split('-')[1] * 1000;
	var ahd = randomFromInterval(fn, sn);
	GM_setValue("ahd", ahd);
}

function randomFromInterval(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function postwith(to, p) {
	var myForm = document.createElement("form");
	myForm.method = "post";
	myForm.action = to;
	for (var k = 0; k < p.length; k += 2) {
		var myInput = document.createElement("input");
		myInput.setAttribute("name", p[k]);
		myInput.setAttribute("value", p[k + 1]);
		myForm.appendChild(myInput);
	}
	document.body.appendChild(myForm);
	myForm.submit();
	document.body.removeChild(myForm);
}

function fixNum(n) {
	n += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(n)) {
		n = n.replace(rgx, '$1' + ',' + '$2');
	}
	return n;
}

function getCash() {
	var cfield = document.getElementById('cashCurrent');
	var cash = 0;
	if (cfield.getElementsByTagName('a').length > 0) return parseInt(cfield.getElementsByTagName('a')[0].innerHTML.replace(/,/g, ''));
	else return parseInt(cfield.innerHTML.replace(/,/g, ''));
}

function getPuid(setBox) {
	if (setBox) {
		if (GM_getValue('cleared', false)) {
			arrayPuid = [];
			GM_setValue('cleared', false);
			arrayPuid.push(searchBox.value);
			GM_SuperValue.set('puidArray', arrayPuid);
			createOpts(arrayPuid, false);
			setSelect('selectboxPUID', searchBox.value);
			GM_setValue('puidSelected', searchBox.value);
			GM_setValue('puidSet', searchBox.value);
			clrBtn.disabled = false;
			clrAll.disabled = false;
			btnSet.disabled = true;
		} else {
			arrayPuid.push(searchBox.value);
			GM_SuperValue.set('puidArray', arrayPuid);
			createOpts(arrayPuid, false);
			setSelect('selectboxPUID', searchBox.value);
			GM_setValue('puidSelected', searchBox.value);
			GM_setValue('puidSet', searchBox.value);
			clrBtn.disabled = false;
			clrAll.disabled = false;
			btnSet.disabled = true;
		}
	} else {
		if (GM_getValue('cleared', false)) {
			arrayPuid = [];
			GM_setValue('cleared', false);
			if (game == "wwar" || game == "vl" || game == "zl" || game == "rl") {
				var profileName = document.getElementsByClassName('profileRight')[0].getElementsByTagName('b')[0].innerHTML;
				var puidAndName = String(location).split('=')[1].split('&')[0] + " - " + profileName;
				arrayPuid.push(puidAndName);
				GM_SuperValue.set('puidArray', arrayPuid);
				createOpts(arrayPuid, true);
				clrBtn.disabled = false;
				clrAll.disabled = false;
				getBtn.disabled = true;
			} else {
				var profileName = document.getElementsByClassName('profileHeader')[0].getElementsByTagName('span')[0].innerHTML;
				var puidAndName = String(location).split('=')[1].split('&')[0] + " - " + profileName;
				arrayPuid.push(puidAndName);
				GM_SuperValue.set('puidArray', arrayPuid);
				createOpts(arrayPuid, true);
				clrBtn.disabled = false;
				clrAll.disabled = false;
				getBtn.disabled = true;
			}
		} else {
			if (game == "wwar" || game == "vl" || game == "zl" || game == "rl") {
				var profileName = document.getElementsByClassName('profileRight')[0].getElementsByTagName('b')[0].innerHTML;
				var puidAndName = String(location).split('=')[1].split('&')[0] + " - " + profileName;
				arrayPuid.push(puidAndName);
				GM_SuperValue.set('puidArray', arrayPuid);
				createOpts(arrayPuid, true);
				clrBtn.disabled = false;
				clrAll.disabled = false;
				getBtn.disabled = true;
			} else {
				var profileName = document.getElementsByClassName('profileHeader')[0].getElementsByTagName('span')[0].innerHTML;
				var puidAndName = String(location).split('=')[1].split('&')[0] + " - " + profileName;
				arrayPuid.push(puidAndName);
				GM_SuperValue.set('puidArray', arrayPuid);
				createOpts(arrayPuid, true);
				clrBtn.disabled = false;
				clrAll.disabled = false;
				getBtn.disabled = true;
			}
		}
	}
}

function clrPuid(all) {
	if (all) {
		selBox.innerHTML = '';
		GM_SuperValue.set('puidArray', []);
		GM_setValue('cleared', true);
		GM_setValue('puidSet', '');
		clrBtn.disabled = true;
		clrAll.disabled = true;
		if (searchBox.value != "") btnSet.disabled = false;
	} else {
		var selectedPuid = selBox.options[selBox.selectedIndex].text;
		var puidToRemove = arrayPuid.indexOf(selectedPuid);
		arrayPuid.splice(puidToRemove, 1);
		GM_SuperValue.set('puidArray', arrayPuid);
		if (GM_getValue('puidSet', '') == selectedPuid) GM_setValue('puidSet', '');
		deleteOpts(arrayPuid);
		if (arrayPuid == "") {
			clrBtn.disabled = true;
			clrAll.disabled = true;
		}
	}
	if (searchBox.value == selectedPuid) btnSet.disabled = false;
	getBtn.disabled = false;
	checkOpts(arrayPuid);
	if (page != "profile") getBtn.disabled = true;
}

function createOpts(array, firstTime) {
	if (game == "wwar" || game == "vl" || game == "zl" || game == "rl") {
		selBox.innerHTML = "";
		for (var i = 0; i < array.length; i++) {
			var opt = document.createElement('option');
			opt.innerHTML = array[i];
			opt.value = array[i];
			selBox.appendChild(opt);
		}
		if (firstTime) {
			var profileName = document.getElementsByClassName('profileRight')[0].getElementsByTagName('b')[0].innerHTML;
			var puidCreated = String(location).split('=')[1].split('&')[0] + " - " + profileName;
			setSelect('selectboxPUID', puidCreated);
			GM_setValue('puidSelected', puidCreated);
		}
	} else {
		selBox.innerHTML = "";
		for (var i = 0; i < array.length; i++) {
			var opt = document.createElement('option');
			opt.innerHTML = array[i];
			opt.value = array[i];
			selBox.appendChild(opt);
		}
		if (firstTime) {
			var profileName = document.getElementsByClassName('profileHeader')[0].getElementsByTagName('span')[0].innerHTML;
			var puidCreated = String(location).split('=')[1].split('&')[0] + " - " + profileName;
			setSelect('selectboxPUID', puidCreated);
			GM_setValue('puidSelected', puidCreated);
		}
	}
}

function deleteOpts(array) {
	var selectedPuid = selBox.options[selBox.selectedIndex].text;
	var opts = selBox.getElementsByTagName('option');
	for (i in opts) {
		if (opts[i].value == selectedPuid) {
			optSelected = opts[i];
			optSelected.parentNode.removeChild(optSelected);
		}
	}
}

function checkOpts(array) {
	if (game == "wwar" || game == "vl" || game == "zl" || game == "rl") {
		var oldPuidSelected = puidSelected;
		var newPuidSelected = selBox.value;
		if (oldPuidSelected != newPuidSelected) {
			GM_setValue("puidSelected", newPuidSelected);
			setSelect('selectboxPUID', newPuidSelected);
		}
		var opts = selBox.getElementsByTagName('option');
		for (i = 0; i < opts.length; i++) {
			optsUnallowed = opts[i].innerHTML;
			var profileName = document.getElementsByClassName('profileRight')[0].getElementsByTagName('b')[0].innerHTML;
			if (String(location).split('=')[1].split('&')[0] + " - " + profileName == optsUnallowed) {
				getBtn.disabled = true;
			}
		}
	} else {
		var oldPuidSelected = puidSelected;
		var newPuidSelected = selBox.value;
		if (oldPuidSelected != newPuidSelected) {
			GM_setValue("puidSelected", newPuidSelected);
			setSelect('selectboxPUID', newPuidSelected);
		}
		var opts = selBox.getElementsByTagName('option');
		for (i = 0; i < opts.length; i++) {
			optsUnallowed = opts[i].innerHTML;
			var profileName = document.getElementsByClassName('profileHeader')[0].getElementsByTagName('span')[0].innerHTML;
			if (String(location).split('=')[1].split('&')[0] + " - " + profileName == optsUnallowed) {
				getBtn.disabled = true;
			}
		}
	}
}

function setSelect(id, val) {
	var elem = document.getElementById(id);
	for (n = elem.length - 1; n >= 0; n--) {
		if (elem.options[n].value == val) {
			elem.options[n].selected = true;
		}
	}
}

function encodeHTML(str) {
	var buf = [];
	for (var i = str.length - 1; i >= 0; i--) {
		buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
	}
	return buf.join('');
}

function unHideNames() {
    if (page == "home" || page == "group" || page == "group_member" || page == "fight" || page == "hitlist" || (page == "profile" && String(location).indexOf('selectedTab=comment') != -1)) {
	   var allLinks = document.getElementsByTagName('a');
	   if (allLinks) {
            for (var i=0; i<allLinks.length; i++) {
                if (allLinks[i].href.indexOf('puid') != -1) {
                    var namecheck = allLinks[i].innerHTML;
                    var entityoutput = String(encodeHTML(namecheck));
                    var namechar = entityoutput.match(/;/g).length;
                    if (namechar <= 2) allLinks[i].innerHTML = 'CLICK ME!';
                    if (entityoutput.split('#')[1].split(';')[0] == "12288") allLinks[i].innerHTML = 'CLICK ME!';
                }
            }
        }
    }
}

function doroistuff() {
	//Basic setup
	var coh = GM_SuperValue.get('coh', 0);
	var owned = [];
	var buy = [];
	var cost = [];
	var roi = [];
	var eids = [];
	var inames = [];

	//Setup for different games
	var game = String(location).split('/')[2].split('.')[0];
	if (game == "vl") {
		var income = [50, 250, 800, 5000, 10000, 16000, 50000, 100000, 160000, 250000, 350000, 410000];
		var initCost = [2000, 10000, 30000, 200000, 500000, 1100000, 4000000, 10000000, 20000000, 40000000, 75000000, 90000000];
	}
	if (game == "wwar") {
		var income = [1000, 6500, 16500, 56000, 270000, 500000, 700000, 1200000, 1400000];
		var initCost = [25000, 220000, 800000, 4000000, 30000000, 90000000, 150000000, 500000000, 1200000000];
	}
	if (game == "im") {
		var income = [50, 250, 800, 5000, 10000, 16000, 50000, 100000, 160000, 250000, 275000, 300000, 350000, 375000, 400000, 430000];
		var initCost = [2000, 10000, 30000, 200000, 500000, 1100000, 4000000, 10000000, 20000000, 40000000, 55000000, 75000000, 105000000, 150000000, 250000000, 420000000];
	}
	if (game == "zl") {
		var income = [1, 5, 10, 25, 65, 110, 200, 350, 590, 900, 1500, 2700, 4200];
		var initCost = [40, 220, 500, 1500, 5000, 11000, 25000, 54000, 110000, 200000, 360000, 700000, 1200000];
	}
	if (game == "rl") {
		var income = [50, 100, 200, 400, 1000, 1500, 2700, 4800, 7500, 11500, 28000, 32000, 34000];
		var initCost = [3000, 7000, 15000, 55000, 175000, 330000, 700000, 1100000, 2000000, 3250000, 8500000, 12500000, 15000000];
	}
	if (game == "kl") {
		var income = [1, 5, 12, 50, 150, 250, 800, 1400, 2200, 3200, 4500, 6200, 15000];
		var initCost = [50, 250, 650, 2800, 9000, 14000, 50000, 100000, 180000, 320000, 540000, 1250000, 4000000];
	}
	if (game == "rol") {
		var income = [20, 40, 75, 240, 700, 1200, 2000, 2700, 5000, 7500, 12500];
		var initCost = [800, 1700, 3800, 14000, 50000, 100000, 200000, 330000, 720000, 1250000, 2500000];
	}
	if (game == "nl") {
		var income = [];
		var initCost = [];
	}
	if (game == "pl") {
		var income = [];
		var initCost = [];
	}

	var investitem = document.getElementsByClassName('investItem');
	for (var i = 0; i < investitem.length; i++) {
		var numown = investitem[i].getElementsByClassName('ownedNum')[0];
		if (numown) {
			var info = investitem[i].getElementsByClassName("reInfoItem")[0];
			var type = info.innerHTML.substr(0, 1);
			var investname = investitem[i].getElementsByClassName('reName')[0].innerHTML;
			if (type == "I") {
				var invid = investitem[i].getElementsByClassName('reBuyAction')[0].getElementsByTagName('a')[0].href.split('inv_id=')[1].split('&')[0];
				var rno = parseInt(numown.innerHTML.replace(/,/g, ''));
				if (rno < 32767) owned.push(rno);
				if (rno >= 32767) owned.push(1000000000000);
				inames.push(investname);
				buy.push(0);
				eids.push(parseInt(invid));
			}
		}
	}

	function askCash() {
		var cash = prompt('How much would you like to spend?', '0');
		if (cash != null && cash != "" && parseInt(cash) <= 5000000000000) {
			GM_SuperValue.set('coh', parseInt(cash));
			document.location = 'http://' + game + '.storm8.com/investment.php';
		}
		if (parseInt(cash) > 5000000000000) {
			alert("Don't spend more than 5T at once");
			document.location = 'http://' + game + '.storm8.com/investment.php';
		}
		if (cash == null) GM_setValue('doingroi', false);
	}

	function getClosestValue(a, x) {
		var lo, hi;
		for (var i = a.length; i--;) {
			if (a[i] <= x && (lo === undefined || lo < a[i])) lo = a[i];
			if (a[i] >= x && (hi === undefined || hi > a[i])) hi = a[i];
		}
		return [lo];
	}

	function whatToBuy() {
		for (var j = 0; j < owned.length; j++) {
			cost.push((1 + 0.1 * (owned[j] + buy[j])) * initCost[j]);
			roi.push(income[j] / cost[j]);
		}
		var toh = coh;
		while (toh > 0) {
			var wtb = getClosestValue(roi, 1);
			for (var i = 0; i < roi.length; i++) {
				if (wtb == roi[i]) {
					toh = toh - cost[i];
					if (toh > 0) {
						buy[i] = buy[i] + 1;
						cost[i] = (1 + 0.1 * (owned[i] + buy[i])) * initCost[i];
						roi[i] = income[i] / cost[i];
						if ((buy[i] + owned[i]) >= 32767) owned[i] = 1000000000000;
					} else {
						GM_SuperValue.set('coh', 0);
						break;
					}
				}
			}
		}
		var allz = 0;
		for (var z = 0; z < buy.length; z++) {
			if (buy[z] == 0) allz++;
		}
		if (allz == buy.length) {
			alert('You cannot afford to buy the best ROI.');
			GM_setValue('doingroi', false);
		} else {
			GM_SuperValue.set('buy', buy);
			document.location = 'http://' + game + '.storm8.com/investment.php';
		}
	}

	function formulateBuy() {
		var buyarray = GM_SuperValue.get('buy', null);
		var timetr = 0;
		var waitbitch = 0;
		for (var i = 0; i < buyarray.length; i++) {
			if (buyarray[i] > 0 && waitbitch == 0) {
				waitbitch = 1;
				var numofinv = buyarray[i];
				var invidtobuy = eids[i];
				var p = confirm('You are about to buy ' + numofinv + ' ' + inames[i] + "'s.");
				if (p) {
					postwith("investment.php", ['inv_id', invidtobuy, 'action', 'buy', 'numberOfInv', numofinv]);
					buyarray[i] = 0;
					GM_SuperValue.set('buy', buyarray);
				} else {
					GM_SuperValue.set('buy', null);
					GM_setValue('doingroi', false);
					return;
				}
			}
			if (buyarray[i] == 0) timetr++;
			if (timetr == buyarray.length) {
				GM_SuperValue.set('buy', null);
				GM_setValue('doingroi', false);
			}
		}
	}
	if (coh > 0 && GM_SuperValue.get('buy', null) == null) whatToBuy();
	if (coh <= 0 && GM_SuperValue.get('buy', null) == null) askCash();
	if (GM_SuperValue.get('buy', null) != null) formulateBuy();
}

if (!window.closed) {
	setInterval(bankIt, 60 * 1000 * 30);
	setInterval(checkOptions, 100);
}