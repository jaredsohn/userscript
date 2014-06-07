// ==UserScript==
// @name     zGrabber - Ultimate Zynga Game Feed Grabber
// @description  Script to help claim items for multiple games from the Zynga sidebar feed
// @include http://localhost/asknetguy/play/*
// @include http*://*.zynga.com/play/*
// @include http*://zynga.com/play/*
// @exclude	http*://*.zynga.com/play/luckyplaycasino/*
// @exclude	http*://*.zynga.com/play/bubble-safari/*
// @exclude	http*://*.zynga.com/play/poker/*
// @exclude	http*://*.zynga.com/play/words-with-friends/*
// @exclude	http*://*.zynga.com/play/slingo/*
// @exclude	http*://*.zynga.com/play/bingo/*
// @exclude	http*://*.zynga.com/play/jam-jam/*
// @exclude	http*://*.zynga.com/play/fashiondesignergame/*
// @exclude	http*://*.zynga.com/play/citizengrim/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @updateURL https://userscripts.org/scripts/source/160251.meta.js
// @downloadURL https://userscripts.org/scripts/source/160251.user.js
// @resource grabberCSS http://asknetguy.com/userscripts/grabber2.1.css
// @resource splash http://asknetguy.com/img/zgrablogo.png
// @resource smlogo http://asknetguy.com/img/sm_zgrablogo.png
// @icon http://asknetguy.com/img/icon_zgrablogo.png
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_listValues
// @grant GM_setValue
// @grant GM_log
// @grant GM_registerMenuCommand
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_xmlhttpRequest
// @version  3.0.4.2
// ==/UserScript==
/*Script contains a modified version of a crucial function created by Brock Adams from stackoverflow.com 
Function name: waitForKeyElements()
Function Location:    ->http://stackoverflow.com/questions/8281441/fire-greasemonkey-script-on-ajax-request */
/*
Version info:
ver 1.0.2.0 	added ability to nearly hide the menu
ver 1.0.3.0 	added Cityville
ver 1.0.3.1 	added some Spanish words and additional item support to Cityville
ver 1.0.4.0		added Farmville2
ver 1.0.5.0 	added exlusions for games that can never be added
ver 1.0.6.0		added Kingdom Quest
ver 1.0.7.0		added VillageLife, YardSaleHiddenTreasures, HiddenChronicles, KnightsOfTheRose, LegendsRiseOfAHero. Also added some exclusions
ver 1.0.8.0 	fixed a small menu issue
ver 1.0.9.0		added Click to Party, Stir Kettle, Italian-Send to Castleville Grabs. Minor speed adjustments.
ver 1.0.9.5		minor menu enhancements
ver 2.0.0.0 	Rewrote large portions for new FV options, redesigned menu, altered css.
ver 2.0.1.0		Added splash screen, logo
ver 2.0.1.1 added icon
ver 3.0.0.0 added customize field to Farmville and added items to coasterville
ver 3.0.1.0 added customize field to Castleville
ver 3.0.2.0 test version - not released
ver 3.0.3.0 Added support of new Zynga interface
ver 3.0.4.0 Added support of Chefville
ver 3.0.4.1 modified panel hide by 1 second delay
ver 3.0.4.2 quick fix to get people around the zynga url change issue
*/
var newCSS = GM_getResourceText("grabberCSS");
splashimg = GM_getResourceURL("splash");
logo = GM_getResourceURL("smlogo");
GM_addStyle(newCSS);
var pathname = window.location.pathname;
$(document).ready(function () {
$('body.zprofile-webapp').append('<div id="splashscreen"><img src="'+splashimg+'" style="margin:22px;"></div>')
$('#splashscreen').fadeOut(2500, 'linear')
    var activeGame, currurl;
	currurl = pathname;
    if (currurl.indexOf('/coast') >= 0) {
		activeGame = 'Coasterville';
    } else if (currurl.indexOf('/city') >= 0) {
		activeGame = 'Cityville';
    } else if (currurl.indexOf('/kdquest') >= 0) {
		activeGame = 'KingdomQuest';
    } else if (currurl.indexOf('/farmville-two') >= 0) {
		activeGame = 'Farmville';
    } else if (currurl.indexOf('/castle') >= 0) {
		activeGame = 'Castleville';
    } else if (currurl.indexOf('/chefville') >= 0) {
		activeGame = 'Chefville';
		} else if (currurl.indexOf('/ultimate_collector') >= 0) {
		activeGame = 'UltimateCollector';
    } else if (currurl.indexOf('/the-ville') >= 0) {
		activeGame = 'TheVille';
    } else if (currurl.indexOf('/ruby-blast') >= 0) {
		activeGame = 'RubyBlastAdventures';
    } else if (currurl.indexOf('/villagelifegame') >= 0) {
		activeGame = 'VillageLife';
    } else if (currurl.indexOf('/yardsaleht') >= 0) {
		activeGame = 'YardSaleHT';
    } else if (currurl.indexOf('/hidden-chronicles') >= 0) {
		activeGame = 'HiddenChronicles';
    } else if (currurl.indexOf('/knightsoftherose') >= 0) {
		activeGame = 'KnightsOTRose';
    } else if (currurl.indexOf('/legends-game') >= 0) {
		activeGame = 'LegendsRiseOAHero';
    } else {
		activeGame = 'Unsupported';		
    }
function showSpeedMenu() {
$("div.zgMenu").toggle()
};
function destroyIt() {
$("div.zgDiv").remove()
};
function showModeMenu() {
$("div.zgModes").toggle()
};
//settings from storage
	var fvModeOpt = GM_getValue(activeGame+"GetOpt", 0);
	var casModeOpt = GM_getValue(activeGame+"GetOpt", 0);
	var agLS = GM_getValue(activeGame+"loadSpeed", "norm");
	var agDS = GM_getValue(activeGame+"grabSpeed", "norm");
	var lsv = 10000;
	var dsv1 = 50000;
	var dsv2 = 60000;
	if (activeGame === 'Coasterville') {
		lsv = 9000;
		dsv1 = 50000;
		dsv2 = 60000;
		if (agLS === 'fast') {
			lsv = '4000';
		} else if (agLS === 'slow') {
			lsv = '15000';
		} else {
		}
		if (agDS === 'fast') {
			dsv1 = '2000';
			dsv2 = '5000';
		} else if (agDS === 'slow') {
			dsv1 = '72000';
			dsv2 = '85000';
		} else {
		}
	} else if (activeGame === 'Cityville' || 'Chefville') {
		lsv = 10000;
		dsv1 = 40000;
		dsv2 = 50000;
		if (agLS === 'fast') {
			lsv = '5000';
		} else if (agLS === 'slow') {
			lsv = '20000';
		} else {
		}
		if (agDS === 'fast') {
			dsv1 = '7000';
			dsv2 = '9000';
		} else if (agDS === 'slow') {
			dsv1 = '72000';
			dsv2 = '85000';
		} else {
		}
	} else if (activeGame === 'Castleville') {
		lsv = 9000;
		dsv1 = 40000;
		dsv2 = 50000;
		if (agLS === 'fast') {
			lsv = '5000';
		} else if (agLS === 'slow') {
			lsv = '16000';
		} else {
		}
		if (agDS === 'fast') {
			dsv1 = '7000';
			dsv2 = '8000';
		} else if (agDS === 'slow') {
			dsv1 = '60000';
			dsv2 = '70000';
		} else {
		}
	} else if (activeGame === 'Farmville') {
		lsv = 8000;
		dsv1 = 10000;
		dsv2 = 20000;
		if (agLS === 'fast') {
			lsv = '5000';
		} else if (agLS === 'slow') {
			lsv = '15000';
		} else {
		}
		if (agDS === 'fast') {
			dsv1 = '2000';
			dsv2 = '3000';
		} else if (agDS === 'slow') {
			dsv1 = '40000';
			dsv2 = '50000';
		} else {
		}
	} else if (activeGame == 'VillageLife') {
		lsv = 10000;
		dsv1 = 40000;
		dsv2 = 50000;
		if (agLS === 'fast') {
			lsv = '5000';
		} else if (agLS === 'slow') {
			lsv = '20000';
		} else {
		}
		if (agDS === 'fast') {
			dsv1 = '7000';
			dsv2 = '9000';
		} else if (agDS === 'slow') {
			dsv1 = '72000';
			dsv2 = '85000';
		} else {
		}
	} else if (activeGame == 'HiddenChronicles') {
		lsv = 10000;
		dsv1 = 40000;
		dsv2 = 50000;
		if (agLS === 'fast') {
			lsv = '5000';
		} else if (agLS === 'slow') {
			lsv = '20000';
		} else {
		}
		if (agDS === 'fast') {
			dsv1 = '7000';
			dsv2 = '9000';
		} else if (agDS === 'slow') {
			dsv1 = '72000';
			dsv2 = '85000';
		} else {
		}
	} else if (activeGame == 'KnightsOTRose') {
		lsv = 12000;
		dsv1 = 4000;
		dsv2 = 5000;
		if (agLS === 'fast') {
			lsv = '6000';
		} else if (agLS === 'slow') {
			lsv = '20000';
		} else {
		}
		if (agDS === 'fast') {
			dsv1 = '3000';
			dsv2 = '4000';
		} else if (agDS === 'slow') {
			dsv1 = '12000';
			dsv2 = '15000';
		} else {
		}
	} else if (activeGame == 'LegendsRiseOAHero') {
		lsv = 10000;
		dsv1 = 40000;
		dsv2 = 50000;
		if (agLS === 'fast') {
			lsv = '5000';
		} else if (agLS === 'slow') {
			lsv = '20000';
		} else {
		}
		if (agDS === 'fast') {
			dsv1 = '7000';
			dsv2 = '9000';
		} else if (agDS === 'slow') {
			dsv1 = '72000';
			dsv2 = '85000';
		} else {
		}
	} else if (activeGame == 'YardSaleHT') {
		lsv = 10000;
		dsv1 = 40000;
		dsv2 = 50000;
		if (agLS === 'fast') {
			lsv = '5000';
		} else if (agLS === 'slow') {
			lsv = '20000';
		} else {
		}
		if (agDS === 'fast') {
			dsv1 = '7000';
			dsv2 = '9000';
		} else if (agDS === 'slow') {
			dsv1 = '72000';
			dsv2 = '85000';
		} else {
		}
	} else if (activeGame === 'KingdomQuest') {
		lsv = 9000;
		dsv1 = 40000;
		dsv2 = 50000;
		if (agLS === 'fast') {
			lsv = '5000';
		} else if (agLS === 'slow') {
			lsv = '16000';
		} else {
		}
		if (agDS === 'fast') {
			dsv1 = '5000';
			dsv2 = '9000';
		} else if (agDS === 'slow') {
			dsv1 = '60000';
			dsv2 = '70000';
		} else {
		}
	} else {
	};
if (activeGame === 'Unsupported') {
	$('#header-outer').append(
	'<div class="zgDiv" style="border:2px black solid; position:fixed; top:10px!important; right:150px!important;z-index:999; padding:1px; text-align:center!important;list-style:none;font-size:.9em;">'
		+ '<div>UnSupported</div>'
		+ '<nav>'
		+ '<ul class="zgUnsuppMenu">'
		+ '<li><a href="" class="byebye" onclick="return false;" style="text-decoration:none;color:rgb(0, 0, 0)!important;" title="Click to roll-up">Req Game?</a>'
		+ '<ul>'
		+ '<li><a href="http://userscripts.org/messages/new?user_id=400841" target="_blank" title="Want this game added to zGrabber?">Send Request</li>'
		+ '</ul>'
		+ '</li>'
		+ '</ul>'
		+ '</nav></div>'
	)
	} else if (activeGame === 'Farmville') {	
	$('#header-outer').append(
		'<div class="zgDiv" style="background:white; border:1px black solid; position:fixed; top:0px!important; width:130px; right:150px!important;z-index:999; padding:1px;display:block; text-align:center!important;list-style:none;font-size:10px;">'
			+ '<div id="tdiv" >'+activeGame+' zGrabber</div><hr>'
			+ '<div style="background-color:#F5F5F5;">'
			+ '<a href="" onclick="return false;" style="text-decoration:none;color:black!important;" id="speedMenuID">Speed Settings</a></div>'
			+ '<div class="speedHolder">'
			+ '<div class="zgMenu" style="display: none">'
			+ '<div id="loadSection" title="Current Load Speed set to:'+agLS+'">Load<hr>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'LoadNorm">Normal</a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'LoadSlow">Slow</a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'LoadFast">Fast</a></div><br>'
			+ '<div id=grabSection title="Current Grab Delay set to:'+agDS+'">Grab<hr>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'GrabNorm">Normal </a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'GrabSlow">Slow</a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'GrabFast">Fast</a></div>'
			+ '</div><hr>'
			+ '<div style="background-color:#F5F5F5;">'
			+ '<a href="" onclick="return false;" id="modeMenuID" style="text-decoration:none;color:black!important;">Item Options</a>'
			+ '<div class="modeHolder">'
			+ '<div class="zgModes" style="display: none" >'
			+ '<div id="optionSection" ><a href="" onclick="return false;" id="FV0" style="color:red!important; background-color:white;">Disable</a><hr>'
			+ '<a href="" onclick="return false;" id="FV1">Gourmet Yogurts</a>'
			+ '<a href="" onclick="return false;" id="FV2">Sheep Railings</a>'
			+ '<a href="" onclick="return false;" id="FV3">Golden Fleece</a>'
			+ '<a href="" onclick="return false;" id="FV4">Baby Bottles</a>'
			+ '<a href="" onclick="return false;" id="FV5">Fence Posts</a>'
			+ '<a href="" onclick="return false;" id="FV6">Exotic Eggs</a>'
			+ '<a href="" onclick="return false;" id="FV7">Fine Yarn</a>'
			+ '<a href="" onclick="return false;" id="FV8">Fertilizer</a>'
			+ '<a href="" onclick="return false;" id="FV9">Points</a>'
			+ '<a href="" onclick="return false;" id="FV10">Power</a>'
			+ '<a href="" onclick="return false;" id="FV11">Water</a>'
			+ '<a href="" onclick="return false;" id="FV12">Feed</a>'
			+ '<a href="" onclick="return false;" id="FV13">All</a>'
			+ '<input type="text" id="FV14" size ="15" value="'+fvModeOpt+'"><button id="FV14_button">SaveCustomEntry</button>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '<hr><div style="background-image:url('+logo+');background-repeat:no-repeat;line-height:2;"><a href="" style="color:black;text-decoration:none;" onclick="return false;" id="destroyer">Hide Menu</a></div></div>'
	)
	} else if (activeGame === 'Castleville') {	
	$('#header-outer').append(
		'<div class="zgDiv" style="background:white; border:1px black solid; position:fixed; top:0px!important; width:130px; right:150px!important;z-index:999; padding:1px;display:block; text-align:center!important;list-style:none;font-size:10px;">'
			+ '<div id="tdiv" >'+activeGame+' zGrabber</div><hr>'
			+ '<div style="background-color:#F5F5F5;">'
			+ '<a href="" onclick="return false;" style="text-decoration:none;color:black!important;" id="speedMenuID">Speed Settings</a></div>'
			+ '<div class="speedHolder">'
			+ '<div class="zgMenu" style="display: none">'
			+ '<div id="loadSection" title="Current Load Speed set to:'+agLS+'">Load<hr>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'LoadNorm">Normal</a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'LoadSlow">Slow</a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'LoadFast">Fast</a></div><br>'
			+ '<div id=grabSection title="Current Grab Delay set to:'+agDS+'">Grab<hr>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'GrabNorm">Normal </a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'GrabSlow">Slow</a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'GrabFast">Fast</a></div>'
			+ '</div><hr>'
			+ '<div style="background-color:#F5F5F5;">'
			+ '<a href="" onclick="return false;" id="modeMenuID" style="text-decoration:none;color:black!important;">Item Options</a>'
			+ '<div class="modeHolder">'
			+ '<div class="zgModes" style="display: none" >'
			+ '<div id="optionSection" ><a href="" onclick="return false;" id="CAS0" style="color:red!important; background-color:white;">Disable</a><hr>'
			+ '<a href="" onclick="return false;" id="CAS1">Default</a>'
			+ '<input type="text" id="CAS2" size ="15" value="'+casModeOpt+'"><button id="CAS2_button">SaveCustomEntry</button>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '<hr><div style="background-image:url('+logo+');background-repeat:no-repeat;line-height:2;"><a href="" style="color:black;text-decoration:none;" onclick="return false;" id="destroyer">Hide Menu</a></div></div>'
	)
	} else {
	$('#header-outer').append(
		'<div class="zgDiv" style="background:white; border:1px black solid; position:fixed; top:0px!important; width:130px; right:150px!important;z-index:999; padding:1px; text-align:center!important;list-style:none;font-size:10px;">'
			+ '<div id="tdiv" >'+activeGame+' zGrabber</div>'
			+ '<div>'
			+ '<a href="" onclick="return false;" style="text-decoration:none;color:rgb(0, 0, 0)!important;" id="speedMenuID">Speed Settings</a></div>'
			+ '<div class="navHolder">'
			+ '<div class="zgMenu" style="display: none">'
			+ '<div id="loadSection" title="Current Load Speed set to:'+agLS+'">Load<hr>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'LoadNorm">Normal</a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'LoadSlow">Slow</a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'LoadFast">Fast</a></div><br>'
			+ '<div id=grabSection title="Current Grab Delay set to:'+agDS+'">Grab<hr>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'GrabNorm">Normal </a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'GrabSlow">Slow</a>'
			+ '<a href="" onclick="return false;" id="'+activeGame+'GrabFast">Fast</a></div>'
			+ '</div>'
			+ '<hr><div style="background-image:url('+logo+');background-repeat:no-repeat;line-height:2;"><a href="" style="color:black;text-decoration:none;" onclick="return false;" id="destroyer">HideMenu</a></div></div>'
	)
};
if (activeGame === 'Farmville') {
$("#FV" + fvModeOpt).addClass("blackbg");
};
if (activeGame === 'Castleville') {
$("#CAS" + casModeOpt).addClass("blackbg");
};
//Fade menu when not in use//Fade menu when not in use
var zDisplayPanel   = $('div.zgDiv');
zDisplayPanel.hover(
    function () { $(this).stop(true, false).fadeTo(500,  1); },
    function () { $(this).stop(true, false).fadeTo(1000, 0.5); },
	function () { $(this).stop(true, false).fadeTo(2000, 0.05); }
);
zDisplayPanel.fadeTo(2000, 0.08);
// collapse side to pause scripts
	setTimeout(function () {
	var cE1 = document.createEvent('MouseEvents');
	cE1.initEvent('click', true, false);
	$(".zui_zdc_common_rail_minmaxbutton_icon")[0].dispatchEvent(cE1);
	}, 9000);
//modified wfke follows
function waitForKeyElements (selectorTxt, actionFunction, bWaitOnce, iframeSelector) {
    var targetNodes, btargetsFound;
    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);
    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                lsv
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
};
//begin conditional setup of WFKE
//Begin Coasterville:
if ( activeGame == 'Coasterville' ) {
function getEnergy(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
}
function getGive(jNode) {
    var clickEvent2  = document.createEvent('MouseEvents');
    clickEvent2.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent2);
}
function getReward(jNode) {
    var clickEvent3  = document.createEvent('MouseEvents');
    clickEvent3.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent3);
}
function getCoin(jNode) {
    var clickEvent4  = document.createEvent('MouseEvents');
    clickEvent4.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent4);
}
function getWealth(jNode) {
    var clickEvent5  = document.createEvent('MouseEvents');
    clickEvent5.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent5);
}
function getGood(jNode) {
    var clickEvent6  = document.createEvent('MouseEvents');
    clickEvent6.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent6);
}
function getCollect(jNode) {
    var clickEvent7  = document.createEvent('MouseEvents');
    clickEvent7.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent7);
}
function getSend(jNode) {
    var clickEvent8  = document.createEvent('MouseEvents');
    clickEvent8.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent8);
}
function getMystery(jNode) {
    var clickEvent9  = document.createEvent('MouseEvents');
    clickEvent9.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent9);
}
function getSammich(jNode) {
    var clickEvent10  = document.createEvent('MouseEvents');
    clickEvent10.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent10);
}
function getGroup1() {
	waitForKeyElements("span.zui_button_label:contains('Energize')", getEnergy);
	waitForKeyElements("span.zui_button_label:contains('Give one')", getGive); // lowercase give gets
	waitForKeyElements("span.zui_button_label:contains('Give coins')", getCoin);
	waitForKeyElements("span.zui_button_label:contains('Give goods')", getGood);
	waitForKeyElements("span.zui_button_label:contains('Sammich')", getSammich);
}
function getGroup2() {
	waitForKeyElements("span.zui_button_label:contains('eward')", getReward); //this is not a typo,
	waitForKeyElements("span.zui_button_label:contains('Share The Wealth')", getWealth);
	waitForKeyElements("span.zui_button_label:contains('Collect')", getCollect);
	waitForKeyElements("span.zui_button_label:contains('Get One')", getSend); // uppercase give gets
	waitForKeyElements("span.zui_button_label:contains('Mystery')", getMystery); // re-enabled mystery gifts
}
//**end coasterville**
} else if ( activeGame == 'VillageLife' || activeGame == 'YardSaleHT' ) {
//Begin CollectOnlyGames:
function getCollects(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
}
function getGroup1() {
	waitForKeyElements("span.zui_button_label:contains('Collect')", getCollects);
}
//*******end CollectOnlyGames
} else if ( activeGame == 'HiddenChronicles' || activeGame == 'KnightsOTRose' || activeGame == 'LegendsRiseOAHero' ) {
//Begin GetOnlyGames:
function getGets(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
}
function getGroup1() {
	waitForKeyElements("span.zui_button_label:contains('Get')", getGets);
}
//*******end GetOnlyGames
} else if ( activeGame == 'Chefville') {
//Begin GiveGetGames-Chefville:
function getGives(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
}
function getGets(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
}
function getGroup1() {
	waitForKeyElements("span.zui_button_label:contains('Give')", getGives);
}
function getGroup2() {
	waitForKeyElements("span.zui_button_label:contains('Get')", getGets);
}
//*******end GiveGetGames - Chefville
} else if ( activeGame == 'Castleville' ) {
//Begin Castleville:
if (casModeOpt == 1) {
function getSends(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
}
function getJoins(jNode) {
    var clickEvent2  = document.createEvent('MouseEvents');
    clickEvent2.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent2);
}
function getGets(jNode) {
    var clickEvent3  = document.createEvent('MouseEvents');
    clickEvent3.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent3);
}
function getGives(jNode) {
    var clickEvent4  = document.createEvent('MouseEvents');
    clickEvent4.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent4);
}
function getClicks(jNode) {
    var clickEvent5  = document.createEvent('MouseEvents');
    clickEvent5.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent5);
}
function getStirs(jNode) {
    var clickEvent6  = document.createEvent('MouseEvents');
    clickEvent6.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent6);
}
function getItalian1(jNode) {
    var clickEvent7  = document.createEvent('MouseEvents');
    clickEvent7.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent7);
}
function getGroup1() {
	waitForKeyElements("span.zui_button_label:contains('Send')", getSends);
	waitForKeyElements("span.zui_button_label:contains('Join')", getJoins);
	waitForKeyElements("span.zui_button_label:contains('Click')", getClicks);
}
function getGroup2() {
	waitForKeyElements("span.zui_button_label:contains('Get')", getGets);
	waitForKeyElements("span.zui_button_label:contains('Give')", getGives);
	waitForKeyElements("span.zui_button_label:contains('Stir')", getStirs);
	waitForKeyElements("span.zui_button_label:contains('Invia')", getItalian1);
};
} else {
function getCustomCAS(jNode) {
	var clickEvent1 = document.createEvent('MouseEvents');
	clickEvent1.initEvent('click', true, true);
	jNode[0].dispatchEvent(clickEvent1);
	};
	function getCasItems() {
	var searchTxt = casModeOpt;
	waitForKeyElements('span.zui_button_label:contains("'+searchTxt+'")', getCustomCAS);
	};
}
//*******end Castleville
} else if ( activeGame == 'KingdomQuest' ) {
//Begin KingdomQuest:
function getGets(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
}
function getOKs(jNode) {
    var clickEvent2  = document.createEvent('MouseEvents');
    clickEvent2.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent2);
}
function getGroup1() {
	waitForKeyElements("span.zui_button_label:contains('Get')", getGets);
}
function getGroup2() {
	waitForKeyElements("span.zui_button_label:contains('OK')", getOKs);
}
//*******end KingdomQuest
} else if ( activeGame == 'Cityville' ) {
//Begin Cityville:
function getSends(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
}
function getClicks(jNode) {
    var clickEvent2  = document.createEvent('MouseEvents');
    clickEvent2.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent2);
}
function getGets(jNode) {
    var clickEvent3  = document.createEvent('MouseEvents');
    clickEvent3.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent3);
}
function getJewels(jNode) {
    var clickEvent4  = document.createEvent('MouseEvents');
    clickEvent4.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent4);
}
function getSpanish(jNode) {
    var clickEvent5  = document.createEvent('MouseEvents');
    clickEvent5.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent5);
}
function getGrants(jNode) {
    var clickEvent6  = document.createEvent('MouseEvents');
    clickEvent6.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent6);
}
function getGroup1() {
	waitForKeyElements("span.zui_button_label:contains('end')", getSends);
	waitForKeyElements("span.zui_button_label:contains('ick')", getClicks);
	waitForKeyElements("span.zui_button_label:contains('Grant')", getGrants);
}
function getGroup2() {
	waitForKeyElements("span.zui_button_label:contains('Get')", getGets);
	waitForKeyElements("span.zui_button_label:contains('Jewel')", getJewels);
	waitForKeyElements("span.zui_button_label:contains('nv')", getSpanish);
}
//*******end Cityville
} else if ( activeGame == 'Farmville' ) {
//Begin Farmville:
if (fvModeOpt == 13) {
function getGets(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
}
function getClaims(jNode) {
    var clickEvent2  = document.createEvent('MouseEvents');
    clickEvent2.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent2);
}
function getGives(jNode) {
    var clickEvent3  = document.createEvent('MouseEvents');
    clickEvent3.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent3);
}
function getSpanish1(jNode) {
    var clickEvent4  = document.createEvent('MouseEvents');
    clickEvent4.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent4);
}
function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Get')", getGets);
	waitForKeyElements("span.zui_button_label:contains('Claim')", getClaims);
	waitForKeyElements("span.zui_button_label:contains('Give')", getGives);
	waitForKeyElements("span.zui_button_label:contains('para')", getSpanish1);
};
	} else if (fvModeOpt == 12)
	{
	function getFeed(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Feed')", getFeed);
	};
	} else if (fvModeOpt == 11)
	{
	function getWater(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Water')", getWater);
	};
	} else if (fvModeOpt == 10)
	{
	function getPower(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Power')", getPower);
	};
	} else if (fvModeOpt == 9)
	{
	function getPoints(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Points')", getPoints);
	};
	} else if (fvModeOpt == 8)
	{
	function getFertilizer(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Fertilizer')", getFertilizer);
	};
	} else if (fvModeOpt == 7)
	{
	function getFineYarn(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Yarn')", getFineYarn);
	};
	} else if (fvModeOpt == 6)
	{
	function getExotic(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Exotic')", getExotic);
	};
	} else if (fvModeOpt == 5)
	{
	function getFence(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Fence')", getFence);
	};
	} else if (fvModeOpt == 4)
	{
	function getBottle(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Baby Bottle')", getBottle);
	};
	} else if (fvModeOpt == 3)
	{
	function getWater(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Water')", getWater);
	};
	} else if (fvModeOpt == 2)
	{
	function getRailing(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('Railing')", getRailing);
	};
	} else if (fvModeOpt == 1)
	{
	function getYogurt(jNode) {
    var clickEvent1  = document.createEvent('MouseEvents');
    clickEvent1.initEvent('click', true, true);
    jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	waitForKeyElements("span.zui_button_label:contains('ourmet')", getYogurt);
	};
	} else {
	function getCustomFV(jNode) {
	var clickEvent1 = document.createEvent('MouseEvents');
	clickEvent1.initEvent('click', true, true);
	jNode[0].dispatchEvent(clickEvent1);
	};
	function getFvItems() {
	var searchTxt = fvModeOpt;
	waitForKeyElements('span.zui_button_label:contains("'+searchTxt+'")', getCustomFV);
	};
//hopefully that worked out
}
//****End Farmville
} else {
};
//end WFKE All
GM_log("zGrabber thinks your active game is:"+activeGame+". This was logged for testing purposes");
//capture clicks of menu and trigger events
function NLoadSpeed() {
	GM_setValue(activeGame+'loadSpeed', 'norm');
	alert("You will need to reload for changes to take effect");
}
function FLoadSpeed() {
	GM_setValue(activeGame+'loadSpeed', 'fast');
	alert("You will need to reload for changes to take effect");
}
function SLoadSpeed() {
	GM_setValue(activeGame+'loadSpeed', 'slow');
	alert("You will need to reload for changes to take effect");
}
function NGrabSpeed() {
	GM_setValue(activeGame+'grabSpeed', 'norm');
	alert("You will need to reload for changes to take effect");
}
function FGrabSpeed() {
	GM_setValue(activeGame+'grabSpeed', 'fast');
	alert("You will need to reload for changes to take effect");
}
function SGrabSpeed() {
	GM_setValue(activeGame+'grabSpeed', 'slow');
	alert("You will need to reload for changes to take effect");
}
//start CAS special item function
if (activeGame == "Castleville") {
function setCAS(casopt) {
	GM_setValue(activeGame+'GetOpt', casopt);
	alert("You will need to reload for changes to take effect");
}
function getCAS2() {
var CAS_custom = ($('#CAS2').val());
var re = new RegExp(/[\s\[\]\(\)\=\,\"\'\/\?\@\:\;\!]/g);
if (re.test(CAS_custom)) {
 alert("Illegal Character used, try again");
 } else { 
GM_setValue(activeGame+'GetOpt', CAS_custom);
alert("Custom value of "+CAS_custom+" set for next reload");
}
}
}
//end Castleville special
//start FV special item function
if (activeGame == "Farmville") {
function setFV(fvopt) {
	GM_setValue(activeGame+'GetOpt', fvopt);
	alert("You will need to reload for changes to take effect");
}
function getFV14() {
var FV14_custom = ($('#FV14').val());
var re = new RegExp(/[\s\[\]\(\)\=\,\"\'\/\?\@\:\;\!]/g);
if (re.test(FV14_custom)) {
 alert("Illegal Character used, try again");
 } else { 
GM_setValue(activeGame+'GetOpt', FV14_custom);
alert("Custom value of "+FV14_custom+" set for next reload");
}
}
}
//end of farmville special item function
//special menu events and listeners
var normls, fastls, slowls, normds, fastds, slowds, speedmenu;
normls = document.getElementById(activeGame+'LoadNorm');
fastls = document.getElementById(activeGame+'LoadFast');
slowls = document.getElementById(activeGame+'LoadSlow');
normds = document.getElementById(activeGame+'GrabNorm');
fastds = document.getElementById(activeGame+'GrabFast');
slowds = document.getElementById(activeGame+'GrabSlow');
speedmenu = document.getElementById('speedMenuID');
destroy = document.getElementById('destroyer');
speedmenu.addEventListener("click", showSpeedMenu, true);
destroy.addEventListener("click", destroyIt, true);
normls.addEventListener("click", NLoadSpeed, true);
fastls.addEventListener("click", FLoadSpeed, true);
slowls.addEventListener("click", SLoadSpeed, true);
normds.addEventListener("click", NGrabSpeed, true);
fastds.addEventListener("click", FGrabSpeed, true);
slowds.addEventListener("click", SGrabSpeed, true);
//special el for castleville
if (activeGame === "Castleville") {
var modemenu, cas0, cas1, cas2;
modemenu = document.getElementById('modeMenuID');
modemenu.addEventListener("click", showModeMenu, true);
cas0 = document.getElementById('CAS0');
cas1 = document.getElementById('CAS1');
cas2 = document.getElementById('CAS2_button');
cas0.addEventListener("click", function(){setCAS(0)}, true);
cas1.addEventListener("click", function(){setCAS(1)}, true);
cas2.addEventListener("click", getCAS2, true);
}

//special el for farmville
if (activeGame === "Farmville") {
var modemenu, pFV0, pFV1, pFV2, pFV3, pFV3, pFV4, pFV5, pFV6, pFV7, pFV8, pFV9, pFV10, pFV11, pFV12, pFV13, pFV14;
pFV0 = document.getElementById('FV0');
pFV1 = document.getElementById('FV1');
pFV2 = document.getElementById('FV2');
pFV3 = document.getElementById('FV3');
pFV4 = document.getElementById('FV4');
pFV5 = document.getElementById('FV5');
pFV6 = document.getElementById('FV6');
pFV7 = document.getElementById('FV7');
pFV8 = document.getElementById('FV8');
pFV9 = document.getElementById('FV9');
pFV10 = document.getElementById('FV10');
pFV11 = document.getElementById('FV11');
pFV12 = document.getElementById('FV12');
pFV13 = document.getElementById('FV13');
pFV14 = document.getElementById('FV14_button');
modemenu = document.getElementById('modeMenuID');
modemenu.addEventListener("click", showModeMenu, true);
pFV0.addEventListener("click", function(){setFV(0)}, true);
pFV1.addEventListener("click", function(){setFV(1)}, true);
pFV2.addEventListener("click", function(){setFV(2)}, true);
pFV3.addEventListener("click", function(){setFV(3)}, true);
pFV4.addEventListener("click", function(){setFV(4)}, true);
pFV5.addEventListener("click", function(){setFV(5)}, true);
pFV6.addEventListener("click", function(){setFV(6)}, true);
pFV7.addEventListener("click", function(){setFV(7)}, true);
pFV8.addEventListener("click", function(){setFV(8)}, true);
pFV9.addEventListener("click", function(){setFV(9)}, true);
pFV10.addEventListener("click", function(){setFV(10)}, true);
pFV11.addEventListener("click", function(){setFV(11)}, true);
pFV12.addEventListener("click", function(){setFV(12)}, true);
pFV13.addEventListener("click", function(){setFV(13)}, true);
pFV14.addEventListener("click", getFV14, true);
};
//end special FV eventlisteners
//engage delays, kind of
if (activeGame == "Farmville"){
	if (fvModeOpt == 0){
	var t1=null;
	} else {
		var t1=setTimeout(getFvItems, dsv1);
	}
} else if (activeGame == "Castleville"){
	if (casModeOpt == 0){
	var t1=null;
	} else {
		var t1=setTimeout(getCasItems, dsv1);
	}
} else {
var t1=setTimeout(getGroup1, dsv1);
var t2=setTimeout(getGroup2, dsv2);
}
});
