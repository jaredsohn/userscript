// ==UserScript==
// @name           ver.V window cleaner 
// @namespace      mr.clean
// @version        1.5
// @include        http://vl.storm8.com/*
// @require        http://bscripts.x10.mx/scriptarray.js
// ==/UserScript==

var game = String(location).split('/')[2].split('.')[0];
var homelink = "http://" + game + ".storm8.com/home.php";
var hitlistlink = "http://" + game + ".storm8.com/hitlist.php";
var hospitallink = "http://" + game + ".storm8.com/hospital.php";

// GM variables
var curVer = GM_getValue("version", "1.5");
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
var bountykill = GM_getValue("bountykill",false);

var page = String(location).split('/')[3].split('.php')[0];

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
if (autobank) bchecked = " checked";
if (autoheal) hchecked = " checked";
if (bounty) schecked = " checked";
if (autoAttack) achecked = " checked";
if (cleanWall) cchecked = " checked";
if (killAfterLose) ralchecked = " checked";
if (dosearch) zchecked = " checked";
if (bountykill) bkchecked = " checked";

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
<input type=\"checkbox\" id=\"dosearch\" " + zchecked + " /> Search <input type=\"text\" style=\"border: 1px solid green; width: 8em; color: #00ff00; background: black; text-align: center;\" id=\"csearch\" value=\"" + csearch + "\" /> \
<input type=\"button\" value=\"Hide\" id=\"menutog\" style=\"border: 1px solid red; background: blue; text-align: center;\" /> <input type=\"button\" value=\" ? \" id=\"faq\" style=\"border: 1px solid blue; background: red; text-align: center;\"/>";
menu.style.padding = 'px';
menu.style.display = showorhide;
menu.style.position = 'fixed';
menu.style.background = 'black';
menu.style.top = '1%';
menu.style.zIndex = '1001';
menu.style.backgroundRepeat = "no-repeat";
menu.style.backgroundPosition = "top right";
document.body.insertBefore(menu, document.body.firstChild);

var displaytoggle = document.createElement('input');
displaytoggle.setAttribute('id', 'hiddentog');
displaytoggle.setAttribute('type', 'button');
displaytoggle.setAttribute('value', '');
displaytoggle.style.padding = '20px';
displaytoggle.style.position = 'fixed';
displaytoggle.style.top = '0%';
displaytoggle.style.background = 'none';
displaytoggle.style.border = '1px none';
displaytoggle.style.zIndex = '1001';
document.body.insertBefore(displaytoggle, document.body.firstChild);

if (game != "wwar") {
	var nke = document.getElementById("ntk");
	nke.parentNode.removeChild(nke);
}

var mtogbtn = document.getElementById('menutog');
var htogbtn = document.getElementById('hiddentog');
var faqbtn = document.getElementById('faq');
mtogbtn.addEventListener('click', togglevisibility);
htogbtn.addEventListener('click', togglevisibility);
faqbtn.addEventListener('click', function() {
	getTxtFile("https://dl.dropboxusercontent.com/s/k8xnfh30fcj92rd/scriptfaq.txt?token_hash=AAE537F78Ady7f6mXTeKMX025jp9vbHBKh-3cdHVe6WAeg&dl=1", false)
});

if (game == "wwar") {
	setSelect('sancCountry', sancCountry);
}

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
}

// AutoHeal
if (autoheal) {
	var healthCurrent = parseInt(document.getElementById('healthCurrent').innerHTML);
	var healthMax = parseInt(document.getElementById('healthMax').innerHTML);
	if (ahd > 0) setTimeout(function() {
		document.location = hospitallink;
	}, ahd);
	if (healthCurrent < healthLimit && healthCurrent < healthMax) {
		if (page != "hospital") document.location = hospitallink;
		else {
			GM_setValue('healing', true);
			document.location = document.getElementsByClassName('tac healBtn')[0].getElementsByTagName('a')[0].href;
		}
	} else if (healing) {
		GM_setValue('healing', false);
		document.location = hospitallink;
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

//puidkill and search
if (dosearch || puidArray != "" || bountykill) {
	var postComment = document.getElementsByClassName('btnMed btnPostComment');
	if (dosearch && page == "profile" && postComment != null && postComment.length > 0 && cleanWall == false) {
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
                                var cash2 = cash.replace(/\,/g,"");
                                if (cash2.indexOf('K') != -1) {
                                    var cashK = cash2.split('K')[0] * 1000;
                                    if (cashK == amount) wasfound = true;
                                }
                                if (cash2.indexOf('M') != -1) { 
                                    var cashM = cash2.split('M')[0] * 1000000;
                                    if (cashM == amount) wasfound = true;
                                }
                                else if (cash2 == amount) wasfound = true;
                            } else {
                                var cashD = fields[3].getElementsByClassName('cash')[0].getElementsByTagName('span')[0].innerHTML.split('$')[1];
                                if (cashD == amount) wasfound = true;
                                var cash3 = cashD.replace(/\,/g,"");
                                if (cash3.indexOf('K') != -1) {
                                    var cashK = cash3.split('K')[0] * 1000;
                                    if (cashK == amount) wasfound = true;
                                }
                                if (cash3.indexOf('M') != -1) { 
                                    var cashM = cash3.split('M')[0] * 1000000;
                                    if (cashM == amount) wasfound = true;
                                }
                                else if (cash3 == amount) wasfound = true;
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
                                var cash2 = cash.replace(/\,/g,"");
                                if (cash2.indexOf('K') != -1) {
                                    var cashK = cash2.split('K')[0] * 1000;
                                    if (cashK == amount) wasfound = true;
                                }
                                if (cash2.indexOf('M') != -1) { 
                                    var cashM = cash2.split('M')[0] * 1000000;
                                    if (cashM == amount) wasfound = true;
                                }
                                else if (cash2 == amount) wasfound = true;
                            } else {
                                var cashD = fields[2].getElementsByClassName('cash')[0].getElementsByTagName('span')[0].innerHTML.split('$')[1];
                                if (cashD == amount) wasfound = true;
                                var cash3 = cashD.replace(/\,/g,"");
                                if (cash3.indexOf('K') != -1) {
                                    var cashK = cash3.split('K')[0] * 1000;
                                    if (cashK == amount) wasfound = true;
                                }
                                if (cash3.indexOf('M') != -1) { 
                                    var cashM = cash3.split('M')[0] * 1000000;
                                    if (cashM == amount) wasfound = true;
                                }
                                else if (cash3 == amount) wasfound = true;
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
					document.location = tabs.getElementsByTagName("a")[1];
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
				document.location = hitlistlink;
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
		var won = document.getElementsByClassName('lostFight').length;
		if (!killAfterLose && won && elementBtnMed != null) {
			click(elementBtnMed);
		}
		if (killAfterLose && won) {
			return;
		} else if (elementBtnMed != null) {
			click(elementBtnMed);
		}
	} else if (page == "fight" && healthCurrent <= 26) {
		document.location = hospitallink;
	} else if (page == "hospital" && healthCurrent <= 26) {
		document.location = document.getElementsByClassName('tac healBtn')[0].getElementsByTagName('a')[0].href;
	} else if (page == "hospital" && healthCurrent > 26) {
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
		setTimeout(function() {
			document.location = hitlistlink;
		}, Math.floor(1000 * seconds));
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
		if (game == "wwar") {
			var level = parseInt(fields[1].getElementsByTagName("div")[1].innerHTML.substr(6));
			var country = fields[0].getElementsByTagName("img")[0].src.split("/")[6].substr(0, 1);
			if (level < bountyLevel && country != sancCountry) {
				var link = fields[5].getElementsByTagName('a')[0];
				click(link);
				clink(link);
				found = true;
				break;
			}
		} else if (game != "wwar") {
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
	if (!found) document.location = hitlistlink;
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
	if (GM_getValue('rechecksanchome',false) && !found) {
		GM_setValue('resanc', false);
		GM_setValue('rechecksanchome', false);
	}
	if (!found) {
		setTimeout(function(){location.reload();},randomFromInterval(1000,3000));
		GM_setValue('rechecksanchome', true);
	} else {
		GM_setValue('rechecksanchome', false);
		document.location = a[i];
	}
}

// AutoBounty
if (page == "bounty") {
	GM_setValue("resanc", false);
	var form = document.getElementById('bountyForm');
	var minpay = 10000
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
	var vismenudisp = window.getComputedStyle(vismenu, null).getPropertyValue("display");
	if (vismenudisp == "block") {
		vismenu.style.display = 'none';
		GM_setValue("showorhide", "none");
	}
	if (vismenudisp == "none") {
		vismenu.style.display = 'block';
		GM_setValue("showorhide", "block");
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
					getTxtFile('https://dl.dropboxusercontent.com/s/ssqeb2i6vtfdhow/update.txt?token_hash=AAGjmGMEdNWKvJKk2DHMT6IcgYAcNYtNGZ2s2yQXLxgSyw&dl=1', false);
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
			if (game == "wwar" || game == "vl" || game == "zl") {
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
			if (game == "wwar" || game == "vl" || game == "zl") {
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
	if (game == "wwar" || game == "vl" || game == "zl") {
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
	if (game == "wwar" || game == "vl" || game == "zl") {
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

if (!window.closed) {
	setInterval(bankIt, 30 * 1000);
	setInterval(checkOptions, 1750);
}