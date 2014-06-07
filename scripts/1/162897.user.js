// ==UserScript==
// @name           Mutik's DotD Script
// @namespace      tag://kongregate
// @description    Fork of ForTheGoodOfAll DotD script with new look and strongly optimized js code
// @author         Mutik, orig version: SReject, chairmansteve, tsukinomai(Shylight)?, JHunz, wpatter6, MoW, true_heathen, HG, mutikt, PDrifting
// @version        1.0.15
// @grant          GM_xmlhttpRequest
// @include        http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
// @include        *web*.dawnofthedragons.com/*
// @include        http://pastebin.com/*
// ==/UserScript==

function main() {
    if (typeof GM_setValue === 'undefined') {
        var GM_setValue = function (name, value) { localStorage.setItem(name, (typeof value).substring(0, 1) + value); };
    }
    if (typeof GM_getValue == 'undefined') {
        var GM_getValue = function (name, dvalue) {
            var value = localStorage.getItem(name);
            if (typeof value != 'string') return dvalue;
            else {
                var type = value.substring(0, 1);
                value = value.substring(1);
                if (type == 'b') return (value == 'true');
                else if (type == 'n') return Number(value);
                else return value;
            }
        };
    }
    if (typeof GM_deleteValue == 'undefined') var GM_deleteValue = function(name) { localStorage.removeItem(name) };

    window.FPX = {
		LandBasePrices:[4000,15000,25000,50000,75000,110000,300000,600000,1200000],
        LandBaseIncome:[100,300,400,700,900,1200,2700,4500,8000],
        LandCostRatio: function(owned) {
            var landCosts = [4000,15000,25000,50000,75000,110000,300000,600000,1200000];
            var icr = [1,1,1,1,1,1,1,1,1]; /*Income/Cost ratio*/
            var i = 9;
            while (i--) {
                landCosts[i] += FPX.LandBasePrices[i] * owned[i] / 10;
                icr[i] = FPX.LandBaseIncome[i] / landCosts[i];
            }
            return icr;
        }
	};
	window.timeSince = function(date,after) {
        if (typeof date === 'number') date = new Date(date);
        var seconds = Math.abs(Math.floor((new Date().getTime() - date.getTime())/1000));
        var interval = Math.floor(seconds/31536000);
        var pretext = 'about ', posttext = after ? ' left' : ' ago';
        if (interval >= 1) return pretext + interval + ' year' + (interval == 1 ? '' : 's') + posttext;
        interval = Math.floor(seconds/2592000);
        if (interval >= 1) return pretext + interval + ' month' + (interval == 1 ? '' : 's') + posttext;
        interval = Math.floor(seconds/86400);
        if (interval >= 1) return pretext + interval + ' day' + (interval == 1 ? '' : 's') + posttext;
        interval = Math.floor(seconds/3600);
        if (interval >= 1) return pretext + interval + ' hour' + (interval == 1 ? '' : 's') + posttext;
        interval = Math.floor(seconds/60);
        if (interval >= 1) return interval + ' minute' + (interval == 1 ? '' : 's') + posttext;
        return Math.floor(seconds) + ' second' + (seconds == 1 ? '' : 's') + posttext;
    };
	window.isNumber = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); };
	window.SRDotDX = {
		version: { major: "1.0.15", minor: 'Mutik\'s mod' },
        util: {
            getQueryVariable: function(v, s){
                var query = String(s||window.location.search.substring(1));
                if(query.indexOf('?')>-1) query = query.substring(query.indexOf('?')+1);
                var vars = query.split('&');
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split('=');
                    if (decodeURIComponent(pair[0]) == v) {
                        return decodeURIComponent(pair[1]);
                    }
                }
                return ''
            },
            getRaidFromUrl: function(url){
                var r = {}, link;
                var reg = /[?&]([^=]+)=([^?&]+)/ig, p = url.replace(/&amp;/gi,"&");
                while (link = reg.exec(p)) {
                    if (!r.diff && link[1] == 'kv_difficulty') r.diff = parseInt(link[2]);
                    else if (!r.hash && link[1] == 'kv_hash') r.hash = link[2];
                    else if (!r.boss && link[1] == 'kv_raid_boss') r.boss = link[2];
                    else if (!r.id && link[1] == 'kv_raid_id') r.id = link[2].replace(/http:?/i,"");
                    else if (link[1] != 'kv_action_type') return null;
                }
                return r;
            },
            getShortNum: function (num) {
                if (isNaN(num) || num < 0) return num;
                if (num >= 1000000000000) return (num / 1000000000000).toPrecision(4) + 't';
                if (num >= 1000000000) return (num / 1000000000).toPrecision(4) + 'b';
                if (num >= 1000000) return (num / 1000000).toPrecision(4) + 'm';
                if (num >= 1000) return (num / 1000).toPrecision(4) + 'k';
                return num + ''
            },
            objToUriString: function(obj) {
                if (typeof obj == 'object') {
                    var str = '';
                    for (var i in obj) str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]) + '&'; str = str.substring(0,str.length-1);
                    return str
                } return '';
            },
            serialize: function(obj) {
                var str = [];
                for (var p in obj) if(obj[p]!=null)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            stringFormat: function() {
                var s = arguments[0];
                for (var i = 0; i < arguments.length - 1; i++) {
                    var reg = new RegExp("\\{" + i + "\\}", "gm");
                    s = s.replace(reg, arguments[i + 1]);
                }
                return s;
            }
        },
		config: (function() {
            var tmp, reqSave = false;
			try { tmp = JSON.parse(GM_getValue('SRDotDX','{}')) }
			catch (e) { tmp = {}; reqSave = true }
            //Raids tab vars
            tmp.lastFilter = typeof tmp.lastFilter == 'string' ? tmp.lastFilter : '';
            tmp.filterSearchStringR = typeof tmp.filterSearchStringR == 'string' ? tmp.filterSearchStringR : '';
            tmp.fltIncVis = typeof tmp.fltIncVis == 'boolean' ? tmp.fltIncVis : false;
            tmp.fltShowNuked = typeof tmp.fltShowNuked == 'boolean' ? tmp.fltShowNuked : false;
            tmp.fltShowAll = typeof tmp.fltShowAll == 'boolean' ? tmp.fltShowAll : false;

            //Options tab vars
            tmp.importFiltered = typeof tmp.importFiltered == 'boolean' ? tmp.importFiltered : true;
			tmp.hideRaidLinks = typeof tmp.hideRaidLinks == 'boolean' ? tmp.hideRaidLinks : false;
            tmp.hideBotLinks = typeof tmp.hideBotLinks == 'boolean' ? tmp.hideBotLinks : false;
            tmp.hideVisitedRaids = typeof tmp.hideVisitedRaids == 'boolean' ? tmp.hideVisitedRaids : false;
            tmp.hideVisitedRaidsInRaidList = typeof tmp.hideVisitedRaidsInRaidList == 'boolean' ? tmp.hideVisitedRaidsInRaidList : false;
            tmp.markMyRaidsVisted = typeof tmp.markMyRaidsVisted == 'boolean' ? tmp.markMyRaidsVisted : false;
            tmp.markImportedVisited = typeof tmp.markImportedVisited == 'boolean' ? tmp.markImportedVisited : false;
            tmp.FPXLandOwnedCount = typeof tmp.FPXLandOwnedCount == 'object' ? tmp.FPXLandOwnedCount : [0, 0, 0, 0, 0, 0, 0, 0, 0];
            tmp.prettyPost = typeof tmp.prettyPost == 'boolean' ? tmp.prettyPost : false;
            tmp.useMaxRaidCount = typeof tmp.useMaxRaidCount == 'boolean' ? tmp.useMaxRaidCount : false;
            tmp.maxRaidCount = !(typeof tmp.maxRaidCount === 'undefined') ? tmp.maxRaidCount : 3000;
            tmp.autoImportPaste = typeof tmp.autoImportPaste == 'boolean' ? tmp.autoImportPaste : false;
            tmp.confirmForLargePaste = typeof tmp.confirmForLargePaste == 'boolean' && tmp.confirmPasteSize ? tmp.confirmForLargePaste : false;
            tmp.confirmPasteSize = typeof tmp.confirmPasteSize == 'number' ? tmp.confirmPasteSize : 1000;
            tmp.showStatusOverlay = typeof tmp.showStatusOverlay == 'boolean' ? tmp.showStatusOverlay : false;
            tmp.confirmDeletes = typeof tmp.confirmDeletes == 'boolean' ? tmp.confirmDeletes : true;
            tmp.autoPostPaste = typeof tmp.autoPostPaste == 'boolean' ? tmp.autoPostPaste : false;
            tmp.whisperTo = typeof tmp.whisperTo == 'string' ? tmp.whisperTo : '';
            tmp.formatLinkOutput = typeof tmp.formatLinkOutput == 'boolean' ? tmp.formatLinkOutput : false;
            tmp.linkShowFs = typeof tmp.linkShowFs == 'boolean' ? tmp.linkShowFs : false;
            tmp.linkShowAp = typeof tmp.linkShowAp == 'boolean' ? tmp.linkShowAp : false;
            tmp.unvisitedRaidPruningMode = typeof tmp.unvisitedRaidPruningMode == 'number' ? tmp.unvisitedRaidPruningMode : 1;
            tmp.selectedRaids = typeof tmp.selectedRaids == 'string' ? tmp.selectedRaids : '';
            tmp.pastebinUrl = typeof tmp.pastebinUrl == 'string' ? tmp.pastebinUrl : '';
            tmp.bckColor = typeof tmp.bckColor == 'string' ? tmp.bckColor : 'fff';
            tmp.lastImported = typeof tmp.lastImported == 'number' ? tmp.lastImported : ((new Date).getTime() - 1728000000);
            tmp.hideKongForum = typeof tmp.hideKongForum == 'boolean' ? tmp.hideKongForum : false;
            tmp.hideGameDetails = typeof tmp.hideGameDetails == 'boolean' ? tmp.hideGameDetails : false;
            tmp.hideGameTitle = typeof tmp.hideGameTitle == 'boolean' ? tmp.hideGameTitle : true;
            tmp.chatFilterString = typeof tmp.chatFilterString == 'string' ? tmp.chatFilterString : '';
            tmp.filterSearchStringC = typeof tmp.filterSearchStringC == 'string' ? tmp.filterSearchStringC : '';
            tmp.chatSize = typeof tmp.chatSize == 'number' ? tmp.chatSize : 300;
            tmp.sbEnable = typeof tmp.sbEnable == 'boolean' ? tmp.sbEnable : false;
            tmp.cbDisable = typeof tmp.cbDisable == 'boolean' ? tmp.cbDisable : false;
            tmp.sbRightSide = typeof tmp.sbRightSide == 'boolean' ? tmp.sbRightSide : false;
            tmp.kongUser = typeof tmp.kongUser == 'string' ? tmp.kongUser : 'Guest';
            tmp.kongAuth = typeof tmp.kongAuth == 'string' ? tmp.kongAuth : '0';
            tmp.kongId = typeof tmp.kongId == 'string' ? tmp.kongId : '0';
            tmp.kongMsg = typeof tmp.kongMsg == 'boolean' ? tmp.kongMsg : false;
            tmp.filterChatLinks = typeof tmp.filterChatLinks == 'boolean' ? tmp.filterChatLinks : true;
            tmp.filterRaidList = typeof tmp.filterRaidList == 'boolean' ? tmp.filterRaidList : false;
            tmp.newRaidsAtTopOfList = typeof tmp.newRaidsAtTopOfList == 'boolean' ? tmp.newRaidsAtTopOfList : false;
            tmp.sbConfig = typeof tmp.sbConfig == 'object' ? tmp.sbConfig : [
                {type:'btn',name:'Camp',cmd:'/camp'},,,,
                {type:'btn',name:'Yydians',cmd:'/raid yyd'},
                {type:'btn',name:'Nessie',cmd:'/raid sea'},
                {type:'btn',name:'Tisi',cmd:'/raid tisi'},,,,,
                {type:'btn',color:'r',name:'Reload',cmd:'SRDotDX.reload()'},,,
                {type:'btn',name:'Room 1',cmd:'SRDotDX.gui.gotoRoom(1)'},
                {type:'btn',name:'Room 8',cmd:'SRDotDX.gui.gotoRoom(8)'},,,,,,,
                {type:'jtxt'},
                {type:'btn',color:'g',name:'Join',cmd:'SRDotDX.gui.joinSelectedRaids(true)'},
                {type:'btn',color:'b',name:'Import',cmd:'SRDotDX.gui.importFromServer()'}
            ];

            if (typeof tmp.mutedUsers != 'object') tmp.mutedUsers = {};
            if (typeof tmp.ignUsers != 'object') tmp.ignUsers = {};
            if (typeof tmp.friendUsers != 'object') tmp.friendUsers = {};
			if (typeof tmp.raidList != 'object') tmp.raidList = {};
            if (typeof tmp.filters !== 'object') tmp.filters = {};

            if(reqSave) GM_setValue('SRDotDX', JSON.stringify(tmp));

            // Delete expired raids
            for (var id in tmp.raidList) {
                if (tmp.raidList.hasOwnProperty(id)) {
                    tmp.raidList[id].timeLeft = function() { return this.expTime - parseInt((new Date).getTime() / 1000) };
                    if (tmp.raidList[id].timeLeft() < 0) delete tmp.raidList[id];
                }
            }

            tmp.addRaid = function(hash,id,boss,diff,visited,user,ts,room) {
				if((/ /).test(user)) {
                    var reg = new RegExp('[0-9]+|[0-9a-zA-Z_]+','g');
                    room = reg.exec(user); user = reg.exec(user);
                }
                if (typeof SRDotDX.config.raidList[id] != 'object') {
                    var tStamp = typeof ts == 'undefined' || ts == null ? parseInt((new Date).getTime() / 1000) : parseInt(ts);
					SRDotDX.config.raidList[id] = {
						hash: hash, id: id, boss: boss, diff: diff, visited: visited, nuked: false, user: user, lastUser: user, timeStamp: tStamp,
                        expTime: (typeof SRDotDX.raids[boss] == 'object' ? SRDotDX.raids[boss].duration : 96) * 3600 + tStamp,
                        timeLeft: function() {return this.expTime - parseInt((new Date).getTime() / 1000) },
                        room: typeof room == 'undefined' || room == null ? SRDotDX.util.getRoomNumber() : parseInt(room) };
					SRDotDX.gui.addRaid(id);
				}
				SRDotDX.config.raidList[id].lastUser = user;
				return SRDotDX.config.raidList[id]
			};
			tmp.getRaid = function(id) {
				if (typeof SRDotDX.config.raidList[id] == 'object') {
                    if (SRDotDX.config.raidList[id].timeLeft() > 1) return SRDotDX.config.raidList[id];
                    delete SRDotDX.config.raidList[id];
                } return false
			};
            tmp.setFilter = function(raidid,diff,val) { SRDotDX.config.filters[raidid][diff] = val };
			tmp.save = function(b) {
                b = typeof b == 'undefined' ? true : b;
                GM_setValue('SRDotDX', JSON.stringify(SRDotDX.config));
				if(b) setTimeout(SRDotDX.config.save, 60000, true);
				else console.log('[DotDX] Manual config save invoked');
			};
			return tmp;
		})(),
        request: {
            importLock: false,
            joinAfterImport: false,
            fromChat: false,
            quickBtnLock: true,
            filterSearchStringT: "",
            raids: function(isinit,hours){
                if(!SRDotDX.gui.joining) {
                    var secs = 15 - parseInt((new Date().getTime() - SRDotDX.config.lastImported)/1000);
                    if(secs > 0) {
                        SRDotDX.echo("You can import again in " + secs + " seconds.");
                        return }
                    console.log("[DotDX] Importing raids from raids server ...");
                    if(!isinit)	this.initialize("Requesting raids");
                    else SRDotDX.request.tries++;
                    var h = hours ? ('&h='+hours) : '';
                    SRDotDX.request.req({
                        eventName: "dotd.getraids",
                        url: "http://dotd.url.ph/download.php?u="+SRDotDX.config.kongUser+h,
                        method: "GET",
                        headers: {"Content-Type": "application/JSON"},
                        timeout: 30000
                    });
                }
            },
            initialize: function (str) {
                SRDotDX.gui.doStatusOutput(str + "...",3000,true);
                SRDotDX.request.tries = 0;
                SRDotDX.request.seconds = 0;
                SRDotDX.request.complete = false;
                SRDotDX.request.timer = setTimeout(SRDotDX.request.tick, 1000, str);
            },
            tick: function (str) {
                if(!SRDotDX.request.complete){
                    if(SRDotDX.request.seconds > 20){
                        SRDotDX.gui.doStatusOutput("Request failed.",3000,true);
                        return;
                    }
                    SRDotDX.request.seconds++;
                    SRDotDX.gui.doStatusOutput(str + " ("+SRDotDX.request.seconds+")...",1500,true);
                    SRDotDX.request.timer = setTimeout(SRDotDX.request.tick, 1000, str);
                }
            },
            complete: false,
            seconds: 0,
            timer: null,
            tries: 0,
            req: function(param){
                var a = document.createEvent("MessageEvent");
                if (a.initMessageEvent) a.initMessageEvent("dotd.req", false, false, JSON.stringify(param), document.location.protocol + "//" + document.location.hostname, 0, window, null);
                else a = new MessageEvent("dotd.req",{"origin":document.location.protocol + "//" + document.location.hostname, "lastEventId": 0, "source": window, "data": JSON.stringify(param)});
                document.dispatchEvent(a);
            },
            pasteImport: function (url,isinit) {
                if(!isinit) this.initialize("Importing PasteBin");
                var pb = url.split('com/')[1];
                SRDotDX.request.req({
                    eventName: "dotd.importpb",
                    url: 'http://pastebin.com/raw.php?i=' + pb,
                    method: "GET",
                    timeout: 30000
                });
            },
            init: function () {
                document.addEventListener("dotd.joinraid", SRDotDX.request.joinRaidResponse, false);
                document.addEventListener("dotd.importpb", SRDotDX.request.pbResponse, false);
                document.addEventListener("dotd.getraids", SRDotDX.request.addRaids, false);
                delete this.init;
            },
            joinRaid: function(r){
                if(typeof r == 'object') {
                    if(!SRDotDX.gui.joining) SRDotDX.request.initialize("Joining " + (!SRDotDX.raids[r.boss]?r.boss.capitalize().replace(/_/g,' '):SRDotDX.raids[r.boss].shortname));
                    var joinData = 'kongregate_username='+SRDotDX.config.kongUser+'&kongregate_user_id='+SRDotDX.config.kongId+'&kongregate_game_auth_token='+SRDotDX.config.kongAuth;
                    SRDotDX.request.req({
                        eventName: "dotd.joinraid",
                        url: SRDotDX.util.stringFormat('http://50.18.191.15/kong/raidjoin.php?' + joinData + '&kv_action_type=raidhelp&kv_raid_id={0}&kv_hash={1}', r.id, r.hash),
                        method: "GET",
                        timeout: 30000
                    });
                }
            },
            addRaids: function(e) {
                var r, data = JSON.parse(e.data);
                if(data.status != 200) {
                    if(SRDotDX.request.tries >=3){
                        SRDotDX.request.complete = true;
                        SRDotDX.gui.doStatusOutput("Raids server busy. Please try again in a moment.");
                        console.log('[DotDX] Raids request failed (url: ' + data.url + ')');
                        console.log(JSON.stringify(data));
                    } else {
                        console.log("[DotDX] Raids server unresponsive (status " + data.status + "). Trying again, " + SRDotDX.request.tries + " tries.");
                    }
                    return;
                }
                SRDotDX.request.complete = true;
                try{ r = JSON.parse(data.responseText.split('<!--')[0]) }
                catch (ex) {
                    console.log("[DotDX] Raids importing error or no raids imported");
                    console.log('[DotDX] responseText: ' + data.responseText);
                    return;
                }
                SRDotDX.gui.doStatusOutput("Importing " + r.raids.length + " raids...");
                var raid, j = r.raids.length, n = 0, t=0;
                var swt = !SRDotDX.config.importFiltered, filter = SRDotDX.gui.cHTML('#DotDX_filters').ele().innerHTML;
                while(j--) {
                    raid = r.raids[j];
                    if (swt || filter.indexOf('fltList_' + raid.b + '_' + (raid.d-1)) < 0) {
                        t++; if (!SRDotDX.config.getRaid(raid.i)) n++, SRDotDX.config.addRaid(raid.h, raid.i, raid.b, raid.d, false, raid.p, raid.t, raid.r);
                    }
                }
                console.log('[DotDX] Import raids from server complete');
                SRDotDX.gui.selectRaidsToJoin('import response');
                SRDotDX.config.lastImported = (new Date).getTime();
                var msg = 'Imported ' + t + ' raids, ' + n + ' new.';
                SRDotDX.echo(msg);
                if (SRDotDX.request.joinAfterImport) { SRDotDX.gui.selectRaidsToJoin(); SRDotDX.gui.joinSelectedRaids(false) }
                SRDotDX.gui.doStatusOutput(msg,5000,true);
            },
            pbResponse: function(e){
                var data = JSON.parse(e.data);
                if(data && data.responseText && data.url) {
                    SRDotDX.request.complete = true;
                    if(/raw/.test(data.url)) {
                        SRDotDX.gui.importingPastebin = true;
                        var r = data.responseText.split('|'), pbid = data.url.split('=')[1], u, i = 0;
                        if (/\|/.test(data.responseText)) { u = r[1]; r = r[3]; } else { u = 'Unknown'; r = r[0]; }
                        SRDotDX.gui.Importing = true;
                        var total = Object.keys(SRDotDX.config.raidList).length;
                        r = r.split(',');
                        while(i < r.length) SRDotDX.getRaidDetails(r[i], u, SRDotDX.config.markImportedVisited), i++;
                        var diff = Object.keys(SRDotDX.config.raidList).length - total;
                        SRDotDX.gui.doStatusOutput('Import complete, ' + diff + ' of ' + i + ' new raids');
                        var pbtot = i;
                        SRDotDX.gui.Importing = false;
                        var els = document.getElementsByClassName("pb_"+pbid);
                        if(els.length > 0) {
                            if (pbtot == 0 ) { i = 0; while (i < els.length) els[i].innerHTML = '(<a href="" onClick="return false;" onMouseDown="SRDotDX.request.pasteImport(\'http://pastebin.com/' + pbid + '\',false)">Import</a>)', i++ }
                            else { i = 0; while (i < els.length) els[i].innerHTML='(Imported, ' + diff + ' new)', i++ }
                        }
                        setTimeout(SRDotDX.config.save, 1000, false);
                        SRDotDX.gui.importingPastebin = false;
                        console.log('[DotDX] Pastebin import complete (url: ' + data.url + ')');
                    }
                }
            },
            joinRaidResponse: function(e){
                var data = JSON.parse(e.data);
                if(data && data.responseText && data.url) {
                    SRDotDX.request.complete = true;
                    var raidid = SRDotDX.util.getQueryVariable('kv_raid_id', data.url);
                    SRDotDX.gui.joinRaidComplete++;
                    var status = '', statustxt = '';
                    if (typeof SRDotDX.config.raidList[raidid] == 'object') {
                    SRDotDX.config.raidList[raidid].visited = true;
                    SRDotDX.gui.toggleRaid('visited', raidid, true);
                    SRDotDX.gui.raidListItemUpdate(raidid);
                    if (/successfully (re-)?joined/i.test(data.responseText)) {
                        SRDotDX.gui.joinRaidSuccessful++;
                        statustxt = SRDotDX.raids[SRDotDX.config.raidList[raidid].boss].shortname + " joined successfully.";
                    } else if (/already a member/i.test(data.responseText)){
                        statustxt = "Join Failed. You are already a member.";
                    }else if (/already completed/i.test(data.responseText)) {
                        SRDotDX.gui.joinRaidDead++;
                        statustxt = "Join failed. Raid is dead.";
                        SRDotDX.nukeRaid(raidid);
                    }else if (/not a member of the guild/i.test(data.responseText)) {
                        SRDotDX.gui.joinRaidDead++;
                        statustxt = "Join failed. You are not member of that Guild.";
                        SRDotDX.nukeRaid(raidid);
                    } else if (/(invalid|find) raid (hash|ID)/i.test(data.responseText)) {
                        statustxt = "Join failed. Invalid hash or ID.";
                        SRDotDX.gui.joinRaidInvalid++;
                        SRDotDX.gui.deleteRaidFromDB(raidid);
                    }
                    else { statustxt = 'Unknown join response.'; }
                    } else SRDotDX.gui.joinRaidInvalid++;

                    if(SRDotDX.gui.joining) {
                        if(SRDotDX.gui.joinRaidComplete >= SRDotDX.gui.joinRaidList.length) {
                            statustxt = "Finished joining. " + SRDotDX.gui.joinRaidSuccessful + " new, " + SRDotDX.gui.joinRaidDead + " dead.";
                            SRDotDX.gui.joinFinish(true);
                            setTimeout(SRDotDX.config.save, 3000, false)
                        } else {
                            statustxt = "Joined " + SRDotDX.gui.joinRaidComplete + " of " + SRDotDX.gui.joinRaidList.length + ". " + SRDotDX.gui.joinRaidSuccessful + " new, " + SRDotDX.gui.joinRaidDead + " dead.";
                            if(SRDotDX.gui.joinRaidIndex < SRDotDX.gui.joinRaidList.length) SRDotDX.request.joinRaid(SRDotDX.gui.joinRaidList[SRDotDX.gui.joinRaidIndex++]);
                        }
                    }
                    else {
                        setTimeout(SRDotDX.config.save, 3000, false);
                    }
                    if(statustxt != '') SRDotDX.gui.doStatusOutput(statustxt, 4000, true);
                }
            }
        },
		getRaidDetailsBase: function(url) {
			var r = {diff: '', hash: '', boss: '', id: ''}, i;
			var reg = /[?&]([^=]+)=([^?&]+)/ig, p = url.replace(/&amp;/gi,'&');
			while ((i = reg.exec(p)) != null) {
				if (!r.diff && i[1] == 'kv_difficulty') r.diff = parseInt(i[2]);
				else if (!r.hash && i[1] == 'kv_hash') r.hash = i[2];
				else if (!r.boss && i[1] == 'kv_raid_boss') r.boss = i[2];
				else if (!r.id && i[1] == 'kv_raid_id') r.id = parseInt(i[2]);
				else if (i[1] != 'kv_action_type') return false;
			}
			if (typeof r != 'undefined' && typeof r.diff != 'undefined' && typeof r.hash != 'undefined' && typeof r.boss != 'undefined' && typeof r.id != 'undefined') {
				r.diffLongText = ['Normal','Hard','Legendary','Nightmare','Insane','Hell'][r.diff-1];
				r.diffShortText = ['N','H','L','NM','I','HL'][r.diff-1];
				var stats = SRDotDX.raids[r.boss];
				if (typeof stats == 'object') {
					r.name = stats.name;
					r.shortname = stats.shortname;
					r.size = stats.size;
					r.type = stats.type;
					r.dur = stats.duration;
					r.durText = stats.dur + "hrs";
					r.stat = stats.stat;
					r.statText = SRDotDX.getStatText(stats.stat);
				}
			}
			return r;
		},
		getPasteDetails: function(url,user) {
            user = user ? user : '';
			var pb = {url: url, id: url.substring(url.length-8)};
			pb.id = url.substring(url.length-8);
			console.log('[DotDX] Importing Pastebin (url: ' + url + ')');
			var info = SRDotDX.config.getPaste(pb.id);
			if (!info) { info = SRDotDX.config.addPaste(pb.url, pb.id, user); if(typeof info == 'object') pb.isNew = true }
            else pb.isNew = false;
			pb.user = info.user;
			pb.lastUser = info.lastUser;
			return pb;
		},
        getTierTxt: function(hp,ppl,ap){
            var num = hp/ppl; num = ap? num/2 : num;
            if (num >= 1000000000000) return (num / 1000000000000).toPrecision(3) + 't';
            if (num >= 1000000000) return (num / 1000000000).toPrecision(3) + 'b';
            if (num >= 1000000) return (num / 1000000).toPrecision(3) + 'm';
            if (num >= 1000) return (num / 1000).toPrecision(3) + 'k';
            return num + ''
        },
		getRaidDetails: function(url,user,visited,ts,room) {
            user = user ? user : '';
            var rVis = visited ? visited : user == SRDotDX.config.kongUser && SRDotDX.config.markMyRaidsVisted;
			var r = SRDotDX.util.getRaidFromUrl(url);
			if (r && typeof r.diff == 'number' && typeof r.hash == 'string' && typeof r.boss == 'string' && typeof r.id == 'string') {
                var filter = SRDotDX.gui.cHTML('#DotDX_filters').ele().innerHTML;
                r.visited = rVis;
                if(!SRDotDX.config.importFiltered || filter.indexOf('fltList_' + r.boss + '_' + (r.diff-1)) < 0){
                var info = SRDotDX.config.getRaid(r.id);
				if (typeof info != 'object') {
					info = SRDotDX.config.addRaid(r.hash, r.id, r.boss, r.diff, r.visited, user, ts, room);
					if (typeof info == 'object') r.isNew = true;
                    else return null;
				}
                else r.isNew = false;
				r.timeStamp = info.timeStamp; r.visited = info.visited; r.nuked = info.nuked;
                }
				r.linkText = function() {
                    var raidInfo = SRDotDX.raids[r.boss];
                    var txt = '[' + ['','N','H','L','NM'][this.diff] + ' ';
                    txt += raidInfo ? raidInfo.shortname : r.boss.capitalize().replace(/_/g,' ');
                    if(SRDotDX.config.linkShowFs) txt += raidInfo ? ', fs:' + SRDotDX.getTierTxt(raidInfo.health[this.diff-1],raidInfo.size,false) : '';
                    if(SRDotDX.config.linkShowAp) txt += raidInfo ? ', ap:' + SRDotDX.getTierTxt(raidInfo.health[this.diff-1],raidInfo.size,true) : '';
                    txt += (this.visited || r.visited) ? '|★' : '';
                    txt += ']';
                    return txt
                };
				return r;
			}
            return null
		},
		/*browser: {
            ff: navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
            chrome: navigator.userAgent.toLowerCase().indexOf('chrome') > -1
		},*/
		getRaidLink: function(msg,user) {
			msg = msg.replace(/[\r\n]/g,'');
			var m = /^((?:(?!<a[ >]).)*)<a.*? href="((?:(?:https?:\/\/)?(?:www\.)?kongregate\.com)?\/games\/5thPlanetGames\/dawn-of-the-dragons(\?[^"]+))".*?<\/a>((?:(?!<\/?a[ >]).)*(?:<a.*? class="reply_link"[> ].*)?)$/i.exec(msg);
			if (m) {
				var raid = SRDotDX.getRaidDetails(m[3], user);
				if (raid) {
					raid.ptext = m[1]; raid.url = m[2]; raid.ntext = m[4];
					return raid;
				}
			}
            return null
		},
		getPastebinLink: function(msg,user) {
			msg = msg.replace(/[\r\n]/g,'');
			var m = /^((?:(?!<a[ >]).)*)?http:\/\/pastebin\.com\/\w{8}((?:(?!<\/?a[ >]).)*(?:<a.*? class="reply_link"[> ].*)?)$/i.exec(msg);
			if (m) {
				var pb = SRDotDX.getPasteDetails(/http:\/\/pastebin\.com\/\w{8}/i.exec(m[0]) + '',user);
				if(typeof pb != 'undefined') {
                    pb.ptext = m[1] || '';
                    pb.ntext = m[2] || '';
                }
				return pb;
            }
			else return null;
		},
		getStatText: function(stat) {
			stat = stat.toLowerCase();
			var r = '';
			if (stat == '?' || stat == 'Unknown') return 'Unknown';
			if (stat.indexOf('s') > -1) r = 'Stamina';
			if (stat.indexOf('h') > -1) r += (r != '' ? (stat.indexOf('e') > -1 ? ', ' : ' and ') :  '') + 'Honor';
			if (stat.indexOf('e') > -1) r += (r != '' ? ' and ' : '') + 'Energy';
			return r;
		},
        getTimestamp: function() {
          return '('+('0'+(new Date().getHours())).slice(-2) + ':' + ('0'+(new Date().getMinutes())).slice(-2)+')';
        },
		refreshRaidTab: function() {
			var el_out = document.getElementById('raid_list');
			var el_in1 = document.getElementById('mainRaidsFrame');
			var el_in2 = document.getElementById('topRaidPane');
			el_out.style.height = el_in1.offsetHeight - el_in2.offsetHeight - 8 + 'px';
		},
        isFirefox: navigator.userAgent.indexOf('Firefox') > 0,
		gui: {
            getChatNumber: function() {
                var cont = document.getElementsByClassName('chat_room_template'), ele;
                for (var i=0; i<cont.length; i++) { ele = cont[i].getAttribute('style'); if(ele == null || ele == '') return i}
                return 1;
            },
            setMessagesCount: function() {
                var num = active_user.unreadWhispersCount() + active_user.unreadShoutsCount();
                var ele = document.getElementById('profile_control_unread_message_count');
                ele.innerHTML = num;
                ele.style.display = num==0 ? 'none' : 'block';
                setTimeout(SRDotDX.gui.setMessagesCount, 60000);
            },
            gotoRoom: function(num) {
                var numInt = parseInt(num);
                if (isNaN(numInt) || numInt < 1 || numInt > 13) holodeck.chatWindow().activateRoomChooser();
                else {
                    var roomObj = JSON.parse('{"type": "game", "xmpp_name": "138636-dawn-of-the-dragons-'+num+'", "name": "Dawn of the Dragons - Room #'+('0'+num).slice(-2)+'", "id": "138636-dawn-of-the-dragons-'+num+'"}');
                    holodeck.joinRoom(roomObj);
                }
            },
            httpCommand: function(url){
                window.open(url);
            },
            applySidebarUI: function(mode) { //-1:remove, 0:redraw, 1:create, 2:recreate
                if(mode == -1 || mode == 2) {
                    document.getElementById('dotdx_sidebar').remove();
                    if (mode == -1) SRDotDX.gui.chatResize(SRDotDX.config.chatSize), document.getElementsByClassName("links_connect")[0].setAttribute('colspan','2');
                }
                if (mode > -1) {
                    var sbElemObj, sbElemTxt, i;
                    if (mode > 0) {
                        if (mode == 1) document.getElementsByClassName("links_connect")[0].setAttribute('colspan','3');
                        if(!SRDotDX.config.sbRightSide) document.getElementById('chat_container').style.marginLeft = "0px";
                        SRDotDX.gui.cHTML('td').set({id: 'dotdx_sidebar', style: 'width: 70px'})
                            .html('<div id="dotdx_sidebar_container"></div>',true)
                            .attach('after',SRDotDX.config.sbRightSide?'chat_container_cell':'gameholder');
                        SRDotDX.gui.chatResize(SRDotDX.config.chatSize);
                    }
                    if (mode == 0) {
                        sbElemTxt = '[' + document.getElementById('options_sbConfig').value + ']';
                        sbElemObj = JSON.parse(sbElemTxt);
                        SRDotDX.config.sbConfig = sbElemObj;
                        SRDotDX.config.save(false);
                    }
                    else sbElemObj = SRDotDX.config.sbConfig;

                    var sidebarElemHtml = "", sbCmd = "", sbCls="";
                    for (i=0; i<sbElemObj.length; i++) {
                        if (i == 25) break;
                        if (typeof sbElemObj[i] == 'undefined' || sbElemObj[i] == null) { sidebarElemHtml += '<div></div>'; continue }
                        if (sbElemObj[i].type == 'jtxt') { sidebarElemHtml += '<input id="sbJoinStr" onkeyup="SRDotDX.gui.updateFilterTxt(this.value)" class="dotdx_chat_filter" type="text" value="">'; continue }
                        if (typeof sbElemObj[i].cmd != 'undefined') {
                            if (sbElemObj[i].cmd.charAt(0) == '/') sbCmd = 'SRDotDX.gui.chatCommand(\''+sbElemObj[i].cmd+'\')';
                            else if (sbElemObj[i].cmd.indexOf('://') > 2) sbCmd = 'SRDotDX.gui.httpCommand(\''+sbElemObj[i].cmd+'\')';
                            else sbCmd = sbElemObj[i].cmd.replace("'","\'");
                        }
                        if (typeof sbElemObj[i].color != 'undefined') {
                            if (sbElemObj[i].color.charAt(0).toLowerCase() == 'b' && sbElemObj[i].color.toLowerCase() != 'black') sbCls = 'class="b" ';
                            else if (sbElemObj[i].color.charAt(0).toLowerCase() == 'g') sbCls = 'class="g" ';
                            else if (sbElemObj[i].color.charAt(0).toLowerCase() == 'r') sbCls = 'class="r" ';
                            else if (sbElemObj[i].color.charAt(0).toLowerCase() == 'y') sbCls = 'class="y" ';
                        }
                        sidebarElemHtml += '<button ' + sbCls + 'onclick="' + sbCmd + '">' + (typeof sbElemObj[i].name == 'undefined' ? ('Btn '+(i+1)) : sbElemObj[i].name) + '</button>';
                        sbCmd = ""; sbCls="";
                    }
                    SRDotDX.gui.cHTML('#dotdx_sidebar_container').html(sidebarElemHtml,true);
                }
            },
            chatResize: function(chatSize) {
                SRDotDX.config.chatSize = chatSize;
                var sbWidth = SRDotDX.config.sbEnable ? 70 : 0;
                var chatWidthInc = chatSize - 300;
                var chatCorr = chatWidthInc/75*2;
                var overallWidth = (1063 + sbWidth + chatWidthInc) + "px";
                document.getElementById('maingame').style.width = overallWidth;
                document.getElementById('maingamecontent').style.width = overallWidth;
                document.getElementById('flashframecontent').style.width = overallWidth;
                document.getElementById('chat_container').style.width = chatSize + "px";
                document.getElementById('chat_tab_pane').style.width = (chatSize - 16) + "px";
                document.getElementById('DotDX_chatResizeElems').innerHTML =   '#kong_game_ui textarea.chat_input { width: ' + (chatSize - 30) + 'px !important; }\
                                                                                #kong_game_ui div#chat_raids_overlay { width: ' + (chatSize - 8) + 'px }\
                                                                                #kong_game_ui div#chat_raids_overlay > span { width: ' + (chatSize - 18 - chatCorr) + 'px }\
                                                                                div#dotdx_sidebar_container { ' + (SRDotDX.config.sbRightSide?"text-align: left; padding-left: 1px":"text-align: right; margin-left: 2px; padding-right: 1px") + ' }';
            },
			helpBox: function(boxId,raidId,mouseOut) {
                var boxDiv = document.getElementById(boxId);
                if (mouseOut) SRDotDX.gui.CurrentRaidsOutputTimer = setTimeout(function(){document.getElementById('chat_raids_overlay').className = "";}, 1500); //setTimeout(elfade, 1500, boxId, 750, false);//fadeEffect.init(boxId, 0);//boxDiv.style.display = 'none';
                else {
                    var info = SRDotDX.config.getRaid(raidId), msg = 'Unknown';
                    var raid = (info == null || typeof SRDotDX.raids[info.boss] == 'undefined') ? {name:'Unknown'} : SRDotDX.raids[info.boss];
                    if (raid.name != 'Unknown') {
                        var diff = info.diff-1;
                        msg  = '<span style="font-size: 12px;">' + raid.name + ' on ' + ['Normal','Hard','Legendary','Nightmare','Insane','Hell'][diff] + '</span><br>';
                        msg += (raid.type == '' ? '' : raid.type + ' | ') + SRDotDX.raidSizes[raid.size].name + ' Raid' + (diff == 3 ? ' | AP' : '');
                        var size = raid.size < 25 ? 10 : raid.size;
                        var fs = raid.health[diff] / (size==101?100:size);
                        if (typeof raid.lt != 'object') {

                            var epicRatio = SRDotDX.raidSizes[size].ratios;
                            msg += '<br>fs: ' + SRDotDX.util.getShortNum(fs) + ' | 1e: ' + SRDotDX.util.getShortNum(fs*epicRatio[0]) + ' | 2e: ' + SRDotDX.util.getShortNum(fs*epicRatio[2]) + ' | 2/3e: ' + SRDotDX.util.getShortNum(fs*epicRatio[3]);
                            //msg += '<br>2e: ' + epicRatio[2] + ' | 3e: ' + epicRatio[4] + ' | fs: ' + fs;
                        }
                        else if (typeof raid.lt == 'object') {
                            var ele = SRDotDX.lootTiers[raid.lt[diff]];
                            var step = SRDotDX.config.chatSize == 450 ? 6 : (SRDotDX.config.chatSize == 375 ? 5 : 4);
                            var steplow = step - 1;
                            var tiers = ele['tiers'];
                            var epics = ele['epics'];
                            var best = ele['best'];
                            var text = ''; var i = tiers.length;
                            while (i--) text = (i%step == steplow ? '<br>' : (i > 0 && tiers[i-1].charAt(5)=='b'? '&thinsp; | ' : ' | ') ) + (i==best?'<u>':'') + epics[i] + (epics[i]<10?'e:&#8192; ':'e: ')+ tiers[i] + (i==best?'</u>':'') + text;
                            msg += ' | Tiered<br>fs: &nbsp;&nbsp;&thinsp;' + SRDotDX.util.getShortNum(fs) + '' + text;
                        }
                        else {}
                    }
                    document.getElementById(boxId + '_text').innerHTML = msg;
                    if (!(boxDiv.className.indexOf('active') > 0)) boxDiv.className = "active";
                    clearTimeout(SRDotDX.gui.CurrentRaidsOutputTimer);
                }
            },
            displayHint: function(hint) {
                var helpEl = document.getElementById('helpBox');
                if (hint) {
                    helpEl.innerHTML = hint;
                    //helpEl.style.display = 'block';
                    helpEl.style.marginTop = '-' + helpEl.offsetHeight + 'px';
                }
                else helpEl.style.marginTop = '3px';
            },
            refreshRaidList: function() {
                document.getElementById('raid_list').innerHTML = "";
                for (var i=0; i<SRDotDX.gui.joinRaidList.length; i++) SRDotDX.gui.addRaid(SRDotDX.gui.joinRaidList[i]);
            },
			addRaid: function(id) {
				var r = typeof id == 'string' || typeof id == 'number' ? SRDotDX.config.raidList[id] : id;
                var a = document.getElementById('raid_list');
                if (r.boss) {
					if (typeof a != 'undefined' && a) {
                        var rd = typeof SRDotDX.raids[r.boss] != 'object' ? {name: 'Unknown'} : SRDotDX.raids[r.boss];
						var url = 'http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons?kv_action_type=raidhelp&kv_difficulty=' + r.diff + '&kv_hash=' + r.hash + '&kv_raid_boss=' + r.boss + '&kv_raid_id=' + r.id;
						//var filterClass = ' DotDX_fltList_' + rd.id + '_' + (r.diff - 1);
                        var diffClass = '', diffText = '';
                        switch(r.diff) {
                            case 1: diffClass = " DotDX_N"; diffText = "N"; break;
                            case 2: diffClass = " DotDX_H"; diffText = "H"; break;
                            case 3: diffClass = " DotDX_L"; diffText = "L"; break;
                            case 4: diffClass = " DotDX_NM"; diffText = "NM"; break;
                        }
                        var lii = SRDotDX.gui.cHTML('div').set({
							class: 'raid_list_item' + diffClass + (r.visited ? ' DotDX_visitedRaidList' : '') + (r.nuked ? ' DotDX_nukedRaidList' : ''),
							id: 'DotDX_'+ r.id,
                            raidid: r.id
						}).html(' \
							<span class="DotDX_RaidListVisited">' + (r.visited ? '&#9733;' : '') + '</span> \
							<a class="DotDX_RaidLink" href="' + url + '">' + rd.name + '</a> \
                            <span class="DotDX_List_diff' + diffClass + '">' + diffText + '</span> \
                            <a class="dotdxRaidListDelete" style="float:right; display: inline" href="#">DEL</a>\
						', true);
						if (SRDotDX.config.newRaidsAtTopOfRaidList) {
							var arr = a.getElementsByClassName('raid_list_item');
							if (arr.length > 0) lii.attach('before', arr[0]); else lii.attach('to', a);
						}
                        else lii.attach('to', a);
					}
				}
				else delete SRDotDX.config.raidList[id];
			},
            toggleRaidListDesc: function(el,mode) {
                if (mode) { clearTimeout(el.timerout); el.timerin = setTimeout(function(){el.lastElementChild.style.display = "block";},500) }
                else { clearTimeout(el.timerin); el.timerout = setTimeout(function(){el.lastElementChild.style.display = "none";},50) }
                return false;
            },
			cHTML: function(ele) {
                function Cele(ele) {
                    this._ele = ele;
                    this.ele = function() { return this._ele };
                    this.set = function(param) { for (var attr in param) if (param.hasOwnProperty(attr)) this._ele.setAttribute(attr, param[attr]); return this };
                    this.text = function(text) { this._ele.appendChild(document.createTextNode(text)); return this };
                    this.html = function(text,overwrite) { this._ele.innerHTML = overwrite ? text : this._ele.innerHTML + text; return this };
                    this.on = function(event,func,bubble) { this._ele.addEventListener(event,func,bubble); return this };
                    this.attach = function(method,ele) {
                        if (typeof ele == 'string') ele = document.getElementById(String(ele));
                        if (!(ele instanceof Node)) throw 'Invalid attachment element specified';
                        else if (!/^(?:to|before|after)$/i.test(method)) throw 'Invalid append method specified';
                        else if (method == 'to') ele.appendChild(this._ele);
                        else if (method == 'before') ele.parentNode.insertBefore(this._ele, ele);
                        else if (typeof ele.nextSibling == 'undefined') ele.parentNode.appendChild(this._ele);
                        else ele.parentNode.insertBefore(this._ele, ele.nextSibling);
                        return this
                    };
                }
                if (typeof ele == 'string') ele = /^#/i.test(String(ele)) ? document.getElementById(ele.substring(1)) : document.createElement(String(ele));
                if (ele instanceof Node) return new Cele(ele);
                throw 'Invalid element type specified';
            },
			errorMessage: function(s,tag) { tag = typeof tag == 'undefined' ? 'b' : tag; SRDotDX.gui.doStatusOutput('<'+tag+'>'+s+'</'+tag+'>') },
			updateMessage: function() { SRDotDX.gui.doStatusOutput(SRDotDX.gui.standardMessage(), false, true) },
			postingMessage: function(i,ct) { SRDotDX.gui.doStatusOutput('Posting message ' + i + (typeof ct == 'undefined' ? '' : ' of ' + ct + '...'), false) },
            standardMessage: function() { return  Object.keys(SRDotDX.config.raidList).length + ' raids in db, ' + SRDotDX.gui.joinRaidList.length + ' selected to join'; },
            CurrentStatusOutputTimer: 0,
            doStatusOutput: function(str,msecs,showInChat) {
				showInChat = typeof showInChat == 'undefined' ? true : showInChat;
				msecs = typeof msecs == 'undefined' ? 4000 : msecs;
				var el = document.getElementById('StatusOutput');
                var el2 = document.getElementById('dotdx_chat_overlay');
                el.innerHTML = str;
                if (showInChat) {
                    el2.innerHTML = str;
                }
				if (msecs) {
					if (SRDotDX.gui.CurrentStatusOutputTimer) clearTimeout(SRDotDX.gui.CurrentStatusOutputTimer);
					SRDotDX.gui.CurrentStatusOutputTimer = setTimeout(function(){ el.innerHTML = SRDotDX.gui.standardMessage(); el2.innerHTML = SRDotDX.gui.standardMessage() }, msecs);
				}
			},
			toggleDisplay: function(elem,sender,el2) {
				if (typeof elem == 'undefined') return;
                var el = document.getElementById(elem);
                var alls = document.getElementsByName(sender.getAttribute('name'));
                if(alls.length > 0) {
                    for (var i = 0; i < alls.length; i++) {
                        if(alls[i].nodeName == 'P') alls[i].getElementsByTagName('span')[0].innerHTML = '+';
                        else alls[i].style.display = 'none';
                    }
                    el.style.display = 'block'; sender.getElementsByTagName('span')[0].innerHTML = '&minus;';
                }
                else {
				if (el.style.display == 'none') {
					el.style.display = 'block'; sender.getElementsByTagName('span')[0].innerHTML = '&minus;';
				}
				else {
					el.style.display = 'none'; sender.getElementsByTagName('span')[0].innerHTML = '+';
				}
                }
                if (typeof el2 == 'string') {
                    switch(el2) {
                        case 'raid_list': SRDotDX.refreshRaidTab(); break;
                        case 'share_list': document.getElementById('DotDX_raidsToSpam').style.height = ( 532 - document.getElementById('FPXShare').offsetHeight - document.getElementById('FPXImport').offsetHeight ) + "px";
                    }
                }
			},
			Importing: false,
			FPXimportRaids: function(save) {
				var linklist = document.FPXRaidSpamForm.FPXRaidSpamInput.value;
				if (linklist.length > 10) {
					save = typeof save == 'undefined' ? true : save;
					console.log('[SRDotDX] Import started');
					SRDotDX.gui.Importing = true;
					document.FPXRaidSpamForm.FPXRaidSpamInput.value = '';
					var link, tagged = false, haspb = false, imct = 0;
                    var total = document.getElementById('raid_list').childNodes.length;
					var patt = new RegExp('http...www.kongregate.com.games.5thPlanetGames.dawn.of.the.dragons.[\\w\\s\\d_=&]+[^,]', 'ig');
					if (linklist.indexOf('!!OBJECT_IMPORT!!') > -1) {
						var objs = linklist.split(';'), obj;
						if (SRDotDX.config.confirmForLargePaste && SRDotDX.gui.importingPastebin && objs.length > SRDotDX.config.confirmPasteSize && !confirm('This pastebin import exceeds ' + SRDotDX.config.confirmPasteSize + ' raids.  Continue with import?')) return false;
						console.log('[SRDotDX] Objects importing ' + objs.length);
						tagged = true;
						while (imct < objs.length) {
							obj = objs[imct].split(',');
							if (obj.length == 4) {
								console.log('[SRDotDX] Object importing ' + imct + ': ' + obj[2] + ' : ' + obj[1] + ' : ' + obj[3]);
								SRDotDX.getRaidDetails(obj[0], obj[2], SRDotDX.config.markImportedVisited, obj[1], obj[3]);
							}
							imct++;
						}
					}
					if (!tagged) {
						if(SRDotDX.config.confirmForLargePaste && SRDotDX.gui.importingPastebin && linklist.split(',').length > SRDotDX.config.confirmPasteSize	&& !confirm('This pastebin import exceeds '+SRDotDX.config.confirmPasteSize+' raids.  Continue with import?')) return false;
						while(link = patt.exec(linklist)) {
							imct++; SRDotDX.getRaidDetails(link+'', 'PasteBin', SRDotDX.config.markImportedVisited);
						}
					}
					var pbpatt = new RegExp('http...pastebin.com.\\w{8}', 'ig');
					while (link = pbpatt.exec(linklist)) { haspb = true; SRDotDX.request.pasteImport(link) }
					if (!haspb) {
						var diff = document.getElementById('raid_list').childNodes.length - total;
						SRDotDX.gui.doStatusOutput('Import complete, ' + diff + ' of ' + imct + ' new raids');
					}
					SRDotDX.gui.Importing = false;
					if (save) setTimeout(SRDotDX.config.save, 250, false);
					return {totalnew: diff, total: imct}
				}
                return false;
			},
			deleteRaid: function(ele) {
                var id = ele.getAttribute('raidid');
                SRDotDX.gui.deleteRaidFromDB(id);
                ele.parentNode.removeChild(ele);
			},
            deleteRaidFromDB: function(id) {
                SRDotDX.gui.toggleRaid('nuked', id, true);
                if (SRDotDX.config.raidList[id]) delete SRDotDX.config.raidList[id];
            },
			FPXdeleteAllRaids: function() {
				if (!SRDotDX.config.confirmDeletes || confirm('This will delete all ' + SRDotDX.config.raidList.length + ' raids stored. Continue? \n (This message can be disabled on the options tab.)')) {
					for (var id in SRDotDX.config.raidList) if (SRDotDX.config.raidList[id]) delete SRDotDX.config.raidList[id];
					var raidlistDIV = document.getElementById('raid_list');
					while (raidlistDIV.hasChildNodes()) raidlistDIV.removeChild(raidlistDIV.lastChild);
					localStorage.removeItem('raidList');
					SRDotDX.gui.updateMessage();
					console.log('[SRDotDX] Delete all raids finished.');
				}
			},
            chatCommand: function(text) {
                var elems = document.getElementsByClassName('chat_input');
                var txt = [], i = elems.length;
                while (i--) { txt[i] = elems[i].value; elems[i].value = text }
                holodeck.activeDialogue().sendInput();
                i = txt.length;
                while (i--) elems[i].value = txt[i];
            },
			FPXdoWork: function(param1, whisper) {
				//console.log('[DotDX] Posting to chat: ' + (/^http/.test(param1) ? '(url: ' + param1 + ')' : param1) );
				//var matchClass = 'chat_input';
				var elems = document.getElementsByClassName('chat_input');
				if (whisper && whisper != '') {
					//console.log('[DotDX] Whispering spam to: ' + SRDotDX.config.whisperTo);
					param1 = '/w ' + whisper + ' ' + param1;
				}
				var txt = [], i = elems.length;
				while (i--) { txt[i] = elems[i].value; elems[i].value = param1 }
				holodeck.activeDialogue().sendInput();
                i = txt.length;
				while (i--) elems[i].value = txt[i];
			},
			FPXformatRaidOutput: function(url) {
                var pre = ''; //user && room ? '['+room+'|'+user+'] ' : '';
				if (!SRDotDX.config.formatLinkOutput) return pre + url;
				var r = SRDotDX.getRaidDetailsBase(String(url));
				return pre + r.shortname + ' ' + r.diffShortText + ' ' + url;
			},
			isPosting: false,
			FPXTimerArray: [],
			FPXStopPosting: function() {
				SRDotDX.gui.endSpammingRaids();
				console.log('[DotDX] Spamming raids to chat... [cancelled]');
				SRDotDX.echo('Raid posting cancelled');
			},
			endSpammingRaids: function() {
                var i = SRDotDX.gui.FPXTimerArray.length;
				while (i--) clearTimeout(SRDotDX.gui.FPXTimerArray[i]);
				SRDotDX.gui.isPosting = false;
				document.getElementById('PostRaidsButton').value = 'Post';
                document.getElementById('dotdx_share_post_button').value = 'Post Links to Chat';
                document.getElementById('dotdx_share_post_button').value = 'Friend Share links';
				SRDotDX.gui.doStatusOutput('Posting raids finished');
				SRDotDX.gui.FPXTimerArray = [];
				SRDotDX.config.save(false);
			},
			prepareSpammingRaids: function() {
				SRDotDX.gui.isPosting = true;
				document.getElementById('PostRaidsButton').value = 'Cancel';
                document.getElementById('dotdx_share_post_button').value = 'Cancel';
                document.getElementById('dotdx_friend_post_button').value = 'Cancel';
				SRDotDX.gui.doStatusOutput('Posting raids started', false);
			},
            spamRaidsToFriends: function() {
                SRDotDX.gui.prepareSpammingRaids();
                var userList = [[],[],[],[],[]], i;
                for (user in SRDotDX.config.friendUsers) {
                    for(i=0;i<5;i++) if(SRDotDX.config.friendUsers[user][i]) userList[i].push(user);
                }
                console.log('[DotDX] Spamming raids to friends... [started]');
                try {
                    var linkList = document.getElementById('DotDX_raidsToSpam').value;
                    if (linkList.length > 10) {
                        console.log('[DotDX] [If length went trough]');
                        document.getElementById('DotDX_raidsToSpam').value = '';
                        var patt = new RegExp('http...www.kongregate.com.games.5thPlanetGames.dawn.of.the.dragons.[\\w\\s\\d_=&]+[^,]', 'ig');
                        var link, ct = 0, sel = 4, r, rs, u; i=0;
                        var timer = 500, ttw = 3050;
                        var total = linkList.split(patt).length-1;
                        console.log('[DotDX] [Just before while]');
                        while((link = patt.exec(linkList)) && SRDotDX.gui.isPosting) {
                            console.log('[DotDX] [After while]');
                            r = SRDotDX.util.getRaidFromUrl(link.toString());
                            rs = SRDotDX.raids[r.boss].size;
                            if (r.boss == 'serpina') sel = 0;
                            else if (rs < 26) sel = 1;
                            else if (rs == 50) sel = 2;
                            else if (rs == 100) sel = 3;
                            console.log('[DotDX] [If before user for]');
                            if (userList[sel].length > 0) {
                                for(u=0;u<userList[sel].length;u++) {
                                    console.log('[DotDX] [Inside user for]');
                                    ( function(p1,p2) {
                                        return SRDotDX.gui.FPXTimerArray[i] = setTimeout(function() { if (!SRDotDX.gui.isPosting) return;
                                            SRDotDX.gui.FPXdoWork(SRDotDX.gui.FPXformatRaidOutput(p1), p2);
                                            ++ct; SRDotDX.gui.postingMessage(ct, i);
                                        },timer); })(link,userList[sel][u]);
                                    timer += ttw; i++;
                                }
                            }
                        }
                    }
                    SRDotDX.gui.FPXTimerArray[SRDotDX.gui.FPXTimerArray.length] = setTimeout(function() { SRDotDX.gui.endSpammingRaids(); console.log('[DotDX] Spamming raids to friends... [stopped]'); }, timer);
                }
                catch(ex) { console.log('[DotDX] Spamming raids to friends... [error]: ' + ex) }
            },
			FPXspamRaids: function() {
                SRDotDX.gui.prepareSpammingRaids();
                console.log('[DotDX] Spamming raids to chat... [started]');
					try {
						var linkList = document.getElementById('DotDX_raidsToSpam').value;
						if (linkList.length > 10) {
                            document.getElementById('DotDX_raidsToSpam').value = '';
							var patt = new RegExp('http...www.kongregate.com.games.5thPlanetGames.dawn.of.the.dragons.[\\w\\s\\d_=&]+[^,]', 'ig');
							var link, ct = 0, i=0;
							var timer = 500, ttw = 3050;
							var total = linkList.split(patt).length-1;
                            //var user = active_user.username();
                            //var room = active_room.getId().split('dragons-')[1];
							while((link = patt.exec(linkList)) && SRDotDX.gui.isPosting) {
								( function(p1) {
                                    return SRDotDX.gui.FPXTimerArray[i] = setTimeout(function() { if (!SRDotDX.gui.isPosting) return;
                                    SRDotDX.gui.FPXdoWork(SRDotDX.gui.FPXformatRaidOutput(p1), SRDotDX.config.whisperTo);
                                    ++ct; SRDotDX.gui.postingMessage(ct, total);
                                },timer); })(link);
								timer += ttw; i++;
							}
						}
						SRDotDX.gui.FPXTimerArray[SRDotDX.gui.FPXTimerArray.length] = setTimeout(function() { SRDotDX.gui.endSpammingRaids(); console.log('[DotDX] Spamming raids to chat... [stopped]'); }, timer);
					}
                    catch(ex) { console.log('[DotDX] Spamming raids to chat... [error]: ' + ex) }
			},
            quickImportAndJoin: function(joinStr,imp) {
                SRDotDX.gui.updateFilterTxt(joinStr,false,true);
                SRDotDX.request.quickBtnLock = false;
                if (imp) SRDotDX.request.joinAfterImport = true, SRDotDX.gui.importFromServer();
                else SRDotDX.gui.joinSelectedRaids();
            },
            importFromServer: function() {
                var h = Math.ceil(((new Date).getTime() - SRDotDX.config.lastImported)/3600000);
                SRDotDX.echo('Importing raids from server');
                SRDotDX.request.raids(false,h);
            },
			importingPastebin: false,
			FPXSortRaids: function() {
				var raidArray = [], i, sortFunc;
				var selectedSort = document.getElementById('FPXRaidSortSelection').value;
				var selectedDir = document.getElementById('FPXRaidSortDirection').value;
                var raidlistDIV = document.getElementById('raid_list');
                var raidList = raidlistDIV.childNodes;
				console.log('[SRDotDX] Sorting started ' + selectedSort + ' : ' + selectedDir);
                i = raidList.length;
				while (i--) raidArray.push( SRDotDX.config.raidList[raidList[i].getAttribute('raidid')] );
                switch(selectedSort) {
                    case 'Id':
					    if (selectedDir == 'asc') sortFunc = function(a,b) {
                            if (!(typeof a.id === 'undefined' || typeof b.id === 'undefined') && a.id > b.id) return -1;
							return 1;
						};
					    else sortFunc = function(a,b) {
                            if (!(typeof a.id === 'undefined' || typeof b.id === 'undefined') && a.id < b.id) return -1;
							return 1;
						};
                        break;
                    case 'Time':
					    if (selectedDir == 'asc') sortFunc = function(a,b) {
                            if (!(typeof a.timeStamp === 'undefined' || typeof b.timeStamp === 'undefined') && a.timeStamp > b.timeStamp) return -1;
							return 1;
						};
					    else sortFunc = function(a,b) {
                            if (!(typeof a.timeStamp === 'undefined' || typeof b.timeStamp === 'undefined') && a.timeStamp < b.timeStamp) return -1;
							return 1;
						};
                        break;
                    case 'Name':
					    if (selectedDir == 'asc') sortFunc = function(a,b) {
							a = SRDotDX.raids[a.boss]; b = SRDotDX.raids[b.boss];
							//console.log(a + ' : ' + b + ' : ' + (typeof a === 'undefined') + ' : ' + (typeof b === 'undefined'));
                            if (!(typeof a === 'undefined' || typeof b === 'undefined') && a.name > b.name) return -1;
							return 1;
						};
					    else sortFunc = function(a,b) {
							a = SRDotDX.raids[a.boss]; b = SRDotDX.raids[b.boss];
                            if (!(typeof a === 'undefined' || typeof b === 'undefined') && a.name < b.name) return -1;
							return 1;
						};
                        break;
                    case 'Diff':
					    if (selectedDir == 'asc') sortFunc = function(a,b) { if (a.diff > b.diff) return -1; return 1 };
					    else sortFunc = function(a,b) { if (a.diff < b.diff) return -1; return 1 };
                        break;
                }
				try { raidArray.sort(sortFunc) }
                catch(e) { console.log('[SRDotDX] Sorting error: ' + e); return }
				raidlistDIV = document.getElementById('raid_list');
				while (raidlistDIV.hasChildNodes()) raidlistDIV.removeChild(raidlistDIV.lastChild);
				i = raidArray.length;
                while (i--) SRDotDX.gui.addRaid(raidArray[i]);
				//SRDotDX.gui.FPXFilterRaidListByName();
				console.log('[SRDotDX] Sorting finished');
			},
			GetRaid: function(id) {
				if (isNumber(id)) {
					var raidList = document.getElementById('raid_list').childNodes;
                    var i = raidList.length, item;
					while (i--) {
						item = raidList[i];
						if (item.getAttribute('raidid') == id) { var raid = JSON.parse(JSON.stringify(SRDotDX.config.raidList[id])); raid.ele = item; return raid }
					}
				}
				return null
			},
            joinRaidList: [],
            postRaidList: [],
            updateFilterTimeout: null,
            filterSearchStringC: "",
            filterSearchStringR: "",
            updateFilterContext: true,
            includeDiff: function(str,dv) {
                var diff = isNaN(parseInt(dv)) ? ({'n':1,'h':2,'l':3,'nm':4,'nnm':0})[dv] || 5 : parseInt(dv);
                var out = "";
                var string = str.toString();
                switch (diff) {
                    case 0: out = string.replace(/,|$/g,'_1,') + string.replace(/,|$/g,'_4,'); break;
                    case 1: case 2: case 3: case 4: out = string.replace(/,|$/g,'_' + diff + ','); break;
                    default: for (var i=1; i<=4; i++) out += string.replace(/,|$/g,'_' + i + ','); break;
                }
                return out.slice(0,-1);
            },
            updateFilterTxt: function(txt,fromRT,quick) {
                clearTimeout(this.updateFilterTimeout);
                var foundRaids = [], field, rf, i;
                if (txt != "") {
                    var searchArray = txt.split(/\s?\|\s?|\sor\s|\s?,\s?/ig);
                    console.log('[DotDX] Pattern split: ' + searchArray);
                    for (i=0; i<searchArray.length; i++) {
                        field = searchArray[i].toLowerCase().split(':');
                        if (field[0] != "") {
                            if (typeof SRDotDX.searchPatterns[field[0]] != 'undefined') foundRaids.push(this.includeDiff(SRDotDX.searchPatterns[field[0]],field[1]));
                            else if (typeof SRDotDX.raids[field[0]] != 'undefined') foundRaids.push(this.includeDiff(field[0],field[1]));
                            else {
                                for (var key in SRDotDX.raids) {
                                    rf = (SRDotDX.raids[key].name + ':' + SRDotDX.raids[key].shortname + ':' + SRDotDX.raids[key].type).toLowerCase();
                                    if (rf.indexOf(field[0]) >= 0) foundRaids.push(this.includeDiff(key,field[1]));
                                }
                            }
                        }
                    }
                }
                var finalSearchString = foundRaids.length == 0 ? "" : "," + foundRaids.toString() + ",";
                console.log('[DotDX] Raids to join from ' + (fromRT?'Raids':'Chat') + ' tab: ' + foundRaids);
                if (fromRT) {
                    SRDotDX.config.lastFilter = txt;
                    SRDotDX.config.filterSearchStringR = finalSearchString;
                }
                else if (quick) {
                    SRDotDX.request.filterSearchStringT = finalSearchString;
                }
                else {
                var filterInputs = document.getElementsByClassName('dotdx_chat_filter');
                for (i=0; i<filterInputs.length; i++) if(filterInputs[i].value != txt) filterInputs[i].value = txt;
                SRDotDX.config.chatFilterString = txt;
                    SRDotDX.config.filterSearchStringC = finalSearchString;
                //this.joinRaidFromChat = true;
                }
                if(quick) { SRDotDX.gui.selectRaidsToJoin('quick'); SRDotDX.config.save(false) }
                else { this.updateFilterTimeout = setTimeout(function(){SRDotDX.gui.selectRaidsToJoin(); SRDotDX.config.save(false)},300) }
            },
            selectRaidsToJoin: function(from) {
                if (SRDotDX.request.quickBtnLock) {
                if (!SRDotDX.gui.joining) SRDotDX.gui.joinRaidList.length = 0;
                SRDotDX.gui.updateFilterContext = document.getElementById('chat_tab').firstChild.className == 'active';
                var searchString = from && from == 'quick' ? SRDotDX.request.filterSearchStringT : (SRDotDX.gui.updateFilterContext && SRDotDX.config.chatFilterString != "" ? SRDotDX.config.filterSearchStringC : SRDotDX.config.filterSearchStringR);
                var r, c = 0, filter = SRDotDX.gui.cHTML('#DotDX_filters').ele().innerHTML;
                for (var raid in SRDotDX.config.raidList) {
                    r = SRDotDX.config.raidList[raid];
                    if( SRDotDX.config.fltShowAll || (
                        (SRDotDX.config.fltShowNuked ? r.nuked : !r.nuked && (SRDotDX.config.fltIncVis || !r.visited)) &&
                        filter.indexOf('fltList_' + r.boss + '_' + (r.diff-1)) < 0 &&
                        (searchString == "" || searchString.indexOf("," + r.boss + "_" + r.diff + ",") >= 0) ) )
                        //try { SRDotDX.gui.joinRaidList.push(JSON.parse(JSON.stringify(r))) } catch(ex){}
                        try { SRDotDX.gui.joinRaidList.push(r) } catch(ex){}
                }
                //console.log('[DotDX] Selected to join (invoked from ' + (from || 'other') + '): ' + SRDotDX.gui.joinRaidList.length);
                //console.log('[DotDX] Raids to join: ' + SRDotDX.gui.joinRaidList);

                if(!SRDotDX.gui.joining) SRDotDX.gui.updateMessage(), SRDotDX.gui.refreshRaidList();
                }
            },
            pushRaidToJoinQueue: function(id) {
                var searchString = SRDotDX.gui.updateFilterContext && SRDotDX.config.chatFilterString != "" ? SRDotDX.config.filterSearchStringC : SRDotDX.config.filterSearchStringR;
                var r, filter = SRDotDX.gui.cHTML('#DotDX_filters').ele().innerHTML;
                r = SRDotDX.config.raidList[id];
                if( SRDotDX.config.fltShowAll || (
                    (SRDotDX.config.fltShowNuked ? r.nuked : !r.nuked && (SRDotDX.config.fltIncVis || !r.visited)) &&
                        // --> change to it after some time (2-3 days) // (SRDotDX.config.importFiltered || filter.indexOf('fltList_' + r.boss + '_' + (r.diff-1)) < 0) &&
                        filter.indexOf('fltList_' + r.boss + '_' + (r.diff-1)) < 0 &&
                        (searchString == "" || searchString.indexOf("," + r.boss + "_" + r.diff + ",") >= 0) ) )
                    try { SRDotDX.gui.joinRaidList.push(JSON.parse(JSON.stringify(r))) } catch(ex){};
            },
            joining: false,
            joinRaidIndex: 0,
            joinRaidComplete: 0,
            joinRaidSuccessful: 0,
            joinRaidDead: 0,
            joinRaidInvalid: 0,
            joinSelectedRaids: function (fromChat) {
            if (!this.joining) {
                this.joining = true;
                this.joinRaidIndex = 0;
                this.joinRaidComplete = 0;
                this.joinRaidSuccessful = 0;
                this.joinRaidDead = 0;
                this.joinRaidInvalid = 0;
                //if (this.joinRaidList.length == 0) this.joinRaidList = this.selectRaidsToJoin();
                if (SRDotDX.gui.joinRaidList.length == 0) { this.joinFinish(true); return }
                SRDotDX.gui.cHTML("#AutoJoinVisibleButton").ele().value = 'Cancel';
                SRDotDX.gui.cHTML("#AutoImpJoinVisibleButton").ele().value = 'Cancel';
                console.log('[DotDX] Hyperfast joining ' + SRDotDX.gui.joinRaidList.length + ' raids');
                //SRDotDX.request.kongData = 'kongregate_username='+holodeck._active_user.username()+'&kongregate_user_id='+holodeck._active_user.id()+'&kongregate_game_auth_token='+holodeck._active_user.gameAuthToken();
                while(SRDotDX.gui.joinRaidIndex < Math.min(30,SRDotDX.gui.joinRaidList.length)) SRDotDX.request.joinRaid(SRDotDX.gui.joinRaidList[SRDotDX.gui.joinRaidIndex++]);
            }
            else if (!fromChat) this.joinFinish();
            },
            joinFinish: function(recalc){
                this.joining = false;
                SRDotDX.request.quickBtnLock = true;
                SRDotDX.gui.cHTML("#AutoJoinVisibleButton").ele().value = 'Join';
                SRDotDX.gui.cHTML("#AutoImpJoinVisibleButton").ele().value = 'Import & Join';
                //this.joinRaidList = [];
                if (recalc) this.selectRaidsToJoin('joining finish');
            },
            refreshFriends: function() {
                var content="", ff, i= 0, f=false, friend;
                var parentDiv = SRDotDX.gui.cHTML('#FPXfsOptions');
                parentDiv.html('<span class="generic">User</span><span class="share">Srp</span><span class="share">Sml</span><span class="share">Med</span><span class="share">Lrg</span><span class="share" style="margin-right: 27px">Oth</span><hr style="width: 270px; margin: 3px auto 4px; border: 0; height: 1px; background-color: #999;">',true);
                for (friend in SRDotDX.config.friendUsers) {
                    ff = SRDotDX.config.friendUsers[friend];
                    content += (f?'<br>':'')+'<span class="generic">' + friend + '</span>' +
                        '<input type="checkbox" id="fs:' + friend + ':0' + '"/><label for="fs:' + friend + ':0' + '"></label>'+
                        '<input type="checkbox" id="fs:' + friend + ':1' + '"/><label for="fs:' + friend + ':1' + '"></label>'+
                        '<input type="checkbox" id="fs:' + friend + ':2' + '"/><label for="fs:' + friend + ':2' + '"></label>'+
                        '<input type="checkbox" id="fs:' + friend + ':3' + '"/><label for="fs:' + friend + ':3' + '"></label>'+
                        '<input type="checkbox" id="fs:' + friend + ':4' + '"/><label for="fs:' + friend + ':4' + '"></label>';
                    f=true;
                }
                parentDiv.html('<div style="overflow-y: scroll; width: 277px; height: 420px">'+content+'</div>',false);
                for (friend in SRDotDX.config.friendUsers) {
                    ff = SRDotDX.config.friendUsers[friend];
                    for (i=0; i<5; i++) SRDotDX.gui.cHTML('#fs:' + friend + ':' + i).on('click',function(e){SRDotDX.gui.fsEleClick(e)}).ele().checked = ff[i];
                }
            },
			DeleteRaids: function () {
                if (!this.joining) {
                    console.log('[DotDX] Erasing visible raids ...');
                    var rn = SRDotDX.gui.joinRaidList.length;
                    if (rn > 0 && (!SRDotDX.config.confirmDeletes || confirm('This will delete ' + rn + ' raids. Continue? \n (This message can be disabled on the options tab.)'))) {
                        var i, tot = 0;
                        for (i=0; i<rn; i++) {
                            SRDotDX.gui.deleteRaidFromDB(SRDotDX.gui.joinRaidList[i].id);
                            tot++;
                        }
                        SRDotDX.gui.doStatusOutput(tot + ' raids deleted');
                        SRDotDX.gui.selectRaidsToJoin();
                        console.log('[DotDX] Erasing complete');
                    }
                }
			},
			GetDumpText: function () {
                var dumptext = "";
                var pre = "http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons?kv_action_type=raidhelp";
					var i, raid;
					for (i=0; i<SRDotDX.gui.joinRaidList.length; i++) {
                        raid = SRDotDX.gui.joinRaidList[i];
                        if (raid.nuked) continue;
                        dumptext += pre + '&kv_raid_id=' + raid.id + '&kv_difficulty=' + raid.diff + '&kv_raid_boss=' + raid.boss + '&kv_hash=' + raid.hash + ', ';
                    }
					return dumptext;
			},
			RaidAction: function(f) {
				//console.log('[SRDotDX] Do action ' + f);
				//var r = (f == 'delete' ? SRDotDX.gui.GetRaids(true) : SRDotDX.gui.GetRaids(false));
				//if (r.length == 0) alert("You have selected 0 raids.  Deletion is the only action that can be performed on dead raids.");
				switch (f) {
					case 'share':
						SRDotDX.gui.DumpRaidsToShare(true); break;
					case 'post':
						if (SRDotDX.gui.isPosting) SRDotDX.gui.FPXStopPosting();
						else SRDotDX.gui.DumpRaidsToShare(), SRDotDX.gui.FPXspamRaids();
						break;
                    case 'post_share':
                        if (SRDotDX.gui.isPosting) SRDotDX.gui.FPXStopPosting();
                        else SRDotDX.gui.FPXspamRaids();
                        break;
                    case 'post_friend':
                        if (SRDotDX.gui.isPosting) SRDotDX.gui.FPXStopPosting();
                        else SRDotDX.gui.spamRaidsToFriends();
                        break;
					case 'delete':
						SRDotDX.gui.DeleteRaids(); break;
				}
				//r = null;
				return false;
			},
			DumpRaidsToShare: function(b) {
				document.getElementById('DotDX_raidsToSpam').value = SRDotDX.gui.GetDumpText();
				SRDotDX.gui.doStatusOutput('Copied ' + SRDotDX.gui.joinRaidList.length + ' raid links to share tab.');
				console.log('[DotDX] Dumped ' + SRDotDX.gui.joinRaidList.length + ' to share');
				if(b) {
					var e = document.getElementById('lots_tab_pane').getElementsByTagName('li');
                    var i = e.length;
					while (i--) if (e[i].getAttribute('class').indexOf('active') > -1) e[i].className = e[i].className.replace(/ active$/g,'');
				    (document.getElementById('FPXShareTab').parentNode).className += ' active';
				}
			},
			BeginDeletingExpiredUnvisitedRaids: function() { SRDotDX.gui.DeleteExpiredUnvisitedRaids(); setInterval('SRDotDX.gui.DeleteExpiredUnvisitedRaids();',600000) },
			DeleteExpiredUnvisitedRaids: function() {
				console.log('[DotDX] Deleting nuked amd old unvisited raids');
                var ct, item, i;
                if (SRDotDX.config.unvisitedRaidPruningMode <= 2 && SRDotDX.config.unvisitedRaidPruningMode >= 0) {
                    //var raidList = document.getElementById('raid_list').childNodes;
                    var pruneTime = new Date().getTime() / 1000;
                    var raidid, raid, raidInfo, pruneTimer; ct = 0;
                    for (raidid in SRDotDX.config.raidList) {
                        raid = SRDotDX.config.raidList[raidid];
                        if (SRDotDX.raids[raid.boss]) {
                            if (!raid.visited || raid.nuked) {
                                raidInfo = SRDotDX.raids[raid.boss];
                                pruneTimer = SRDotDX.raidSizes[raidInfo.size].pruneTimers[SRDotDX.config.unvisitedRaidPruningMode];
                                if (raid.nuked) pruneTimer = pruneTimer / 2; //double time nuked pruning
                                if ((pruneTime - raid.timeStamp) >= pruneTimer) { SRDotDX.gui.deleteRaidFromDB(raidid); ct++ }
                            }
                        }
                        else { SRDotDX.gui.deleteRaidFromDB(raidid); ct++ }
                    }
                    if (ct > 0) SRDotDX.gui.doStatusOutput(ct + ' old unvisited raids pruned.');
                    console.log('[DotDX] Number of raids pruned: ' + ct);
                    SRDotDX.gui.selectRaidsToJoin('prune');
                }
			},
            switchBot: function() {
                //console.log('[SRDotDX] Bot button clicked');
                var chkBot = document.getElementById('SRDotDX_options_hideBotLinks');
                SRDotDX.config.hideBotLinks = chkBot.checked ? chkBot.checked = false : chkBot.checked = true;
                SRDotDX.gui.cHTML('#SRDotDX_botClass').html('.bot {display: ' + (chkBot.checked ? 'none !important' : 'block') + '}', true);
                var botbtns = document.getElementsByClassName('dotdx_chat_bot_button');
                for (var i=0; i<botbtns.length; i++) {
                    var botcn = botbtns[i].className;
                    botbtns[i].className = botcn.indexOf('active') > 0 ? botcn.replace(' active','') : botcn + ' active';
                }
                SRDotDX.gui.scrollChat();
            },
            scrollChat: function(num) {
                var els = document.getElementsByClassName('chat_message_window'), i = num?num:0;
                if (num) els[num].scrollTop = els[num].scrollHeight;
                else while (i < els.length) els[i].scrollTop = els[i].scrollHeight, i++;
            },
            toggleFiltering: function() {
                var query = '.DotDX_filter_dummy_0 ', i = 0, frcId = '.DotDX_fltChat_', raidId;
                var fltLen = Object.keys(SRDotDX.config.filters).length;
                if ((fltLen != SRDotDX.raidArray.length) || typeof SRDotDX.config.filters['serpina.jpg'] == 'object') {
                    while (i < SRDotDX.raidArray.length) {
                        raidId = SRDotDX.raidArray[i];
                        if(typeof SRDotDX.config.filters[raidId] == 'undefined') SRDotDX.config.filters[raidId] = [false, false, false, false];
                        i++
                    }
                    for (i in SRDotDX.config.filters) if (SRDotDX.raidArray.indexOf(i) < 0) delete SRDotDX.config.filters[i];
                    console.log('[DotDX] Filters array has been altered!');
                }
                if (SRDotDX.config.filterChatLinks) {
                    i = 0;
                    while (i < SRDotDX.raidArray.length) {
                        raidId = SRDotDX.raidArray[i];
                        if (SRDotDX.config.filters[raidId][0]) query = frcId + raidId + '_0, ' + query;
                        if (SRDotDX.config.filters[raidId][1]) query = frcId + raidId + '_1, ' + query;
                        if (SRDotDX.config.filters[raidId][2]) query = frcId + raidId + '_2, ' + query;
                        if (SRDotDX.config.filters[raidId][3]) query = frcId + raidId + '_3, ' + query;
                        i++
                    }
                }
                if (SRDotDX.config.filterRaidList) {
                    i = 0; frcId = '.DotDX_fltList_';
                    while (i < SRDotDX.raidArray.length) {
                        raidId = SRDotDX.raidArray[i];
                        if (SRDotDX.config.filters[raidId][0]) query = frcId + raidId + '_0, ' + query;
                        if (SRDotDX.config.filters[raidId][1]) query = frcId + raidId + '_1, ' + query;
                        if (SRDotDX.config.filters[raidId][2]) query = frcId + raidId + '_2, ' + query;
                        if (SRDotDX.config.filters[raidId][3]) query = frcId + raidId + '_3, ' + query;
                        i++
                    }
                }
                //if (SRDotDX.config.hideVisitedRaidsInRaidList) query = '.DotDX_visitedRaidList, ' + query;
                SRDotDX.gui.cHTML('#DotDX_filters').html(query + '{display: none !important}',true);
            },
			load: function () {
				if (typeof holodeck._tabs.addTab == 'function' && document.getElementById('chat_rooms_container') != null) {
                    SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'SRDotDX_botClass'}).text('.bot{display:'+(SRDotDX.config.hideBotLinks ? 'none !important':'block')+'}').attach('to',document.head);
					SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'SRDotDX_raidClass'}).text('.SRDotDX_raid{display:'+(SRDotDX.config.hideRaidLinks ? 'none !important':'block')+'}').attach('to',document.head);
					SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'SRDotDX_visitedRaidClass'}).text('.DotDX_visitedRaid{display: '+(SRDotDX.config.hideVisitedRaids ? 'none !important':'block')+'}').attach('to',document.head);
					//SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'SRDotDX_visitedRaidListClass'}).text('.DotDX_visitedRaidList {display: '+(SRDotDX.config.hideVisitedRaidsInRaidList == true?'none !important':'block')+'}').attach('to',document.head);
                    SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'DotDX_forum'}).text('div.game_page_wrap {padding-top: 16px; margin-top: 14px !important; background: #333 !important; display: ' + (SRDotDX.config.hideKongForum ? 'none' : 'block') + '}').attach('to',document.head);
                    SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'DotDX_details'}).text('div.game_details_outer {margin-top: 14px !important; width: 900px !important; border: solid 20px #333 !important; display: ' + (SRDotDX.config.hideGameDetails ? 'none' : 'block') + '}').attach('to',document.head);
                    SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'DotDX_filters'}).text('.DotDX_filter_dummy_0 {display: none !important}').attach('to',document.head);
                    SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'DotDX_chatResizeElems'}).text('#kong_game_ui textarea.chat_input { width: 270px !important; }\
                    #kong_game_ui div#chat_raids_overlay { width: 292px }\
                    #kong_game_ui div#chat_raids_overlay > span { width: 282px }\
                    div#dotdx_sidebar_container { ' + (SRDotDX.config.sbRightSide?"text-align: left; padding-left: 1px":"text-align: right; margin-left: 2px; padding-right: 1px") + ' }').attach('to',document.head);
                    SRDotDX.gui.toggleFiltering();
					SRDotDX.gui.cHTML('style').set({type: "text/css"}).text(" \
					    " + (SRDotDX.config.hideGameTitle ? "ul#gamepage_categories_list, .horizontal_ad, div#dealspot_banner_holder, div#kong_bumper_preroll_600x400-ad-slot, div#gamepage_header {display:none;} \
					    div.gamepage_header_outer, div.gamepage_header_inner, div.gamepage_header_outer h1 {height: 0 !important; padding: 0 !important; margin: 0 !important} \
						#primarylayout .maincontent {padding: 6px 0 !important} \
						" : "") + "div.raid_list_item.hidden, .DotDX_nukedRaid, div.game_page_admindev_controls, div#subwrap, li#quicklinks_facebook {display:none;} \
						#primarywrap {background-image: none !important; background-color: transparent !important;} \
						body {background-color: #" + SRDotDX.config.bckColor + " !important}\
						#FPXtt { position:absolute; display:block; } \
						#FPXtttop { display:block; height:5px; margin-left:5px; } \
						#FPXttcont { display:block; padding:2px 12px 3px 7px; margin-left:5px; background:#666; color:#fff; } \
						#FPXttbot {display:block;height:5px;margin-left:5px;} \
						#kong_game_ui ul.main_tabs li#lots_tab a {width: 33px; color:white;} \
						#kong_game_ui ul.main_tabs li#lots_tab a.active {background-position: 0px 0px; color:black;} \
						#kong_game_ui div#lots_tab_pane {padding: 8px; text-align: left; background-color: #777; height: 649px}\
						#kong_game_ui div#lots_tab_pane div#dotdx_shadow_wrapper { width: 282px; border: 1px solid #222; box-shadow: 0 0 12px #111; height: 649px; overflow: hidden; background-color: #ddd;}\
						li#game_tab {display:none !important} \
						#kong_game_ui div#chat_window { background-color: #fff; border: 1px solid #333; overflow: hidden; box-shadow: 0 0 8px 1px #333; }\
						#kong_game_ui div#chat_window_header { height: 69px; box-shadow: 0 0 5px #333; position: relative; background-color: #ddd; }\
						#kong_game_ui div#chat_window_header div.room_name_container { border-bottom: 1px solid #aaa; padding: 5px 7px 3px; margin: 0 !important; background-color: #e6e6e6; font-family: \"Trebuchet MS\", Helvetica, sans-serif }\
						#kong_game_ui div#chat_window_header div.room_name_container .room_name { font-family: \"Trebuchet MS\", Helvetica, sans-serif; color: #333; text-shadow: 0 0 3px #ccc; }\
						#kong_game_ui div.chat_actions_container span.kong_ico { font-size: 12px !important; }\
						#kong_game_ui div.chat_actions_container ul.chat_actions_list { padding: 4px 0; border-radius: 5px 0 0 5px; top: 22px; border-color: #777; box-shadow: 0 0 8px #999; min-width: 122px; font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 11px; }\
						#kong_game_ui div.chat_actions_container ul.chat_actions_list li { line-height: 20px; padding: 0 10px; border-width: 1px 0; border-color: #fff; border-style: solid;}\
						#kong_game_ui .chat_actions_container .chat_actions_list li:hover { background-color: #f0f0f0; border-color: #bbb; color: #333; box-shadow: 0 0 4px #ddd; position: relative; }\
						#kong_game_ui div.chat_actions_container span.btn_tools { height: 16px; line-height: initial !important; width: 20px; margin: 2px 3px; } \
						#kong_game_ui div#chat_window_header div.dotdx_chat_overlay { border-top: 1px solid #bbb; margin-top: 3px; padding-top: 4px; overflow: hidden; white-space: nowrap; } \
						#kong_game_ui div#chat_window_header div.dotdx_chat_overlay > span { color: #333; text-shadow: 0 0 3px #ccc; }\
						#kong_game_ui div#chat_tab_pane {background-color: #777} \
						#kong_game_ui div.chat_actions_container select { width: 92px; margin-top: 2px; font-family: \"Trebuchet MS\",Helvetica,sans-serif; font-style: italic; outline: none; background-color: #ddd; margin-right: 2px; } \
						#kong_game_ui div#chat_room_tabs div a { margin: 0; background: none; text-decoration: none; font-family: \"Trebuchet MS\",Helvetica,sans-serif; font-size: 11px; color: #222; font-style: italic; transition: text-shadow .2s; border-right: 1px dotted #aaa; padding: " + (SRDotDX.isFirefox ? "3px 9px 3px 7px":"4px 9px 2px 7px") + "; }\
						#kong_game_ui div#chat_room_tabs div a:hover { text-shadow: 0 0 5px #888; }\
						#kong_game_ui div#chat_room_tabs div.active a { text-shadow: 0 0 5px #999; background-color: #eee; }\
						#kong_game_ui div#chat_rooms_container div.chat_tabpane.users_in_room { background-color: #f6f6f6; height: 89px; border: 1px solid #999; border-width: 1px 0; border-bottom-color: #888; box-shadow: inset 0 -2px 6px -4px #444; } \
						#kong_game_ui div#chat_raids_overlay { display:none; position: absolute; overflow: hidden; bottom: 491px; left: 3px; background-color: #e0e0e0; font-family: \"Trebuchet MS\", Helvetica, sans-serif; color: #000; font-size: 11px; padding: 3px 0; border-color: #555; border-width: 1px; border-style: solid; box-shadow: 0 0 10px #222; text-shadow: 0 0 4px #ccc; background: -webkit-linear-gradient(top, #fff, #ddd); background: -moz-linear-gradient(top, #fff, #ddd); }\
						#kong_game_ui div#chat_raids_overlay.active { display: block } \
						#kong_game_ui div#chat_raids_overlay > span { display: block; margin: 0 auto }\
						#kong_game_ui div#lots_tab_pane ul { margin: 0px; padding: 0px; list-style-type: none; position: relative;} \
						#kong_game_ui div#lots_tab_pane ul li.tab { float: left; height: 100%; } \
						#kong_game_ui div#lots_tab_pane ul li.tab div.tab_head  { font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 11px; font-style: italic; padding: " + (SRDotDX.isFirefox ? "2px 7px 3px":"3px 7px 2px") + "; cursor: pointer; border-right: 1px dotted #aaa; transition: text-shadow .2s; color: #222} \
						#kong_game_ui div#lots_tab_pane ul li.tab div.tab_head:hover { text-shadow: 0 0 5px #888; }\
						#kong_game_ui div#lots_tab_pane ul li.tab div.tab_pane  { background-color: #f9f9f9; display: none; border-top: 1px solid #888; width: 282px; height: 600px; box-shadow: inset 0 0 6px -1px #777; padding-top: 2px;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_head { background-color: #eee; cursor: default; text-shadow: 0 0 5px #999; }\
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane { position: absolute; display: block; left: 0px; }\
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list, \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #paste_list {overflow-y: auto; font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 12px; height: 453px; border-top: 1px solid #aaa; box-shadow: 0 0 3px #ccc; background: -webkit-linear-gradient(left, #fff, #eee); background: -moz-linear-gradient(left, #fff, #eee);} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item {cursor: pointer; position: relative; padding: 3px 2px 1px; border-width: 1px 0; border-style: solid; border-top-color: transparent; border-bottom-color: #ddd; margin-top: -1px;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.hidden {display:none;} \
						a.FPXImportLink, a.FPXDeleteLink { font: normal 10px Arial; border: 1px solid #c0c0c0; color:black; text-decoration:none; cursor:pointer; font-variant: small-caps; display: block; width: 40px; text-align: center; margin-right: 2px; background-color: #fff} \
						a.FPXImportLink:hover { border-color: #008299; background-color: #008299; color: white;} \
						a.FPXDeleteLink:hover { border-color: #D24726; background-color: #D24726; color: white;} \
						a.dotdxRaidListDelete { font: 10px \"Trebuchet MS\"; color: black; text-decoration: none; cursor: pointer; margin-right: 2px; } \
						a.dotdxRaidListDelete:hover { color: #BD0000; text-shadow: 0 0 2px #FF8E8E; }\
						a.DotDX_RaidLink {text-decoration:none; color: #333;} \
						a.DotDX_RaidLink:hover { color: #111; text-shadow: 0 0 3px rgba(0, 0, 0, 0.2); } \
						div.DotDX_ListPanel {border-top: 1px dashed #999; margin-top: 2px; padding-top: 2px; }\
						div.DotDX_ListPanel > span.raidListContent {font-style: italic} \
						#kong_game_ui p.user_count.full { color: crimson; } \
						#kong_game_ui div#lots_tab_pane a.pastebinlink {font: normal 11px Verdana; color:#333; text-decoration:none; cursor:pointer;} \
						#kong_game_ui div#lots_tab_pane a.pastebinlink:hover { text-decoration: underline; color: black } \
						#kong_game_ui div#lots_tab_pane span.pasteright, #kong_game_ui div#lots_tab_pane span.pasteleft {font: normal 11px Verdana; color: #333} \
						#kong_game_ui div#lots_tab_pane span.pasteright {float:right; padding-right: 6px} \
						#kong_game_ui div#lots_tab_pane span.pasteleft {float:left} \
						#kong_game_ui div.chat_message_window { position: relative; bottom: -1px; margin: 0; height: 4" + (SRDotDX.config.cbDisable ? '43' : '22') + "px !important; } \
						#kong_game_ui div.chat_message_window p {border-bottom: 1px solid #DFDFDF; margin: 0; padding: 3px 5px;} \
						#kong_game_ui p.even {background-color: #fff !important} \
						#kong_game_ui p.SRDotDX_raid, #kong_game_ui p.whisper, #kong_game_ui p.script { border-top: 1px solid #e5e5e5; margin: -1px 0 0 0 !important; } \
						#kong_game_ui p.SRDotDX_raid {padding: 2px 5px !important;} \
						#kong_game_ui p.DotDX_diff_1, #raid_list .raid_list_item.DotDX_N:hover {background-color: rgb(211, 247, 203) !important; border-color: rgb(138, 179, 137) !important; background: -webkit-linear-gradient(top,#CBE7C4,#F3FAF2); background: -moz-linear-gradient(top,#CBE7C4,#F3FAF2);} \
						#kong_game_ui p.DotDX_diff_2, #raid_list .raid_list_item.DotDX_H:hover {background-color: rgb(240, 233, 187) !important; border-color: rgb(173, 173, 104) !important; background: -webkit-linear-gradient(top,#F7F0C8,#FCFBF8); background: -moz-linear-gradient(top,#F7F0C8,#FCFBF8);} \
						#kong_game_ui p.DotDX_diff_3, #raid_list .raid_list_item.DotDX_L:hover {background-color: rgb(255, 204, 197) !important; border-color: rgb(177, 135, 128) !important; background: -webkit-linear-gradient(top,#F3D7D1,#FCF7F7); background: -moz-linear-gradient(top,#F3D7D1,#FCF7F7);} \
						#kong_game_ui p.DotDX_diff_4, #raid_list .raid_list_item.DotDX_NM:hover {background-color: rgb(233, 226, 236) !important; border-color: rgb(169, 154, 187) !important; background: -webkit-linear-gradient(top,#DDD4E2,#F4F0F7); background: -moz-linear-gradient(top,#DDD4E2,#F4F0F7);} \
						#kong_game_ui div#lots_tab_pane div#raid_list .raid_list_item:hover { box-shadow: 0 0 4px #ccc; }\
						#kong_game_ui p.whisper {padding: 3px 5px !important; background-color: rgb(228, 237, 241) !important; border-color: #A1B4BE !important; background: -webkit-linear-gradient(top,#DCE8F1,#EFF4F7); background: -moz-linear-gradient(top,#DCE8F1,#EFF4F7); } \
						#kong_game_ui p.script {background-color: rgb(245, 245, 245) !important; border-color: rgb(165, 165, 165) !important; background: -webkit-linear-gradient(left,#f3f3f3,#fff); background: -moz-linear-gradient(left,#f3f3f3,#fff);} \
						#kong_game_ui p.script hr { height: 1px; border: 0; background: #ccc; margin: 3px 0 2px; }\
						#kong_game_ui p.script span { font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 11px} \
						#kong_game_ui p.script span .title { font-size: 12px; font-weight: bold; color: #222 } \
						#kong_game_ui p.script span .title:hover { text-shadow: 0 0 4px #ccc; text-decoration: none; }\
						#kong_game_ui p span.separator { margin-right: 0px !important; display:inline !important; float: none !important} \
						#kong_game_ui p span.username { color: rgb(39, 101, 148); text-decoration: none; cursor: pointer; display:inline !important; float: none !important } \
						#kong_game_ui p span.username.ign { color: rgb(38, 116, 34); }\
						#kong_game_ui p span.username.is_self { color: rgb(151, 49, 49); }\
						#kong_game_ui p span.username:hover { text-decoration: underline } \
						#kong_game_ui p span.timestamp {font-style: italic; font-size: 9px; color: #666; vertical-align: text-top;} \
						#kong_game_ui p span.message {line-height: 16px; word-wrap: break-word; display:inline !important; float: none !important} \
						#kong_game_ui p span.message a { text-decoration: none; color: #444; font-style: normal } \
						#kong_game_ui p span.message a:hover { text-decoration: underline; color: #000 } \
						#kong_game_ui p span.message a.chat_link:hover { text-shadow: 0 0 4px #F5C68A; text-decoration: none; } \
                        #kong_game_ui p span.message a.chat_link { color: #946A3D; } \
						#kong_game_ui p.emote {font-style: italic; color: #085088;}\
						#kong_game_ui p.emote span.username, #kong_game_ui p.emote span.separator { display: none !important }\
						#kong_game_ui p span.room { color: #666; font-size: 9px; vertical-align: text-top; }\
						#kong_game_ui div.chat_message_window div.error_msg { background-color: #FFF8E0; margin: 0; padding: 3px 5px; border-bottom: 1px solid #ddd; font-size: 9px; color: #555; }\
						#kong_game_ui .chatOverlayMain {border-style: solid; border-color: #C2A71C; border-width: 1px 0; font-family: \"Trebuchet MS\", Helvetica, sans-serif; color: #fff; font-size: 11px; font-weight: normal; text-align: right} \
						#kong_game_ui .chatOverlayMain > span {padding: 3px 10px; cursor: pointer;} \
						#kong_game_ui .chatOverlayMain > span:hover {background-color: #C2A71C; font-style: italic; color: #555}\
						#kong_game_ui textarea.chat_input { height: 30px !important; margin: 0 !important; outline: none; padding: 4px 6px 4px } \
						" + (SRDotDX.config.cbDisable ? '#kong_game_ui div.chat_controls { box-shadow: 0 0 4px #666; position: relative; border-top: 1px solid #777 }' : '') + " \
						#kong_game_ui div.dotdx_chat_buttons { position: relative; width: 100%; padding: " + (SRDotDX.isFirefox ? "0 0 1px":"1px 0 0") + "; background-color: #eaeaea; font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 11px; font-style: italic; color: #444; box-shadow: 0 0 6px -2px #333; border-width: 1px 0; border-style: solid; border-color: #888; background: -webkit-linear-gradient(top,#ddd,#f0f0f0); background: -moz-linear-gradient(top,#ddd,#f0f0f0);}\
						#kong_game_ui div.dotdx_chat_buttons > span { display: inline-block; padding: 3px 7px; cursor: pointer; transition: text-shadow .2s; }\
						#kong_game_ui input.dotdx_chat_filter { border: 1px solid #ccc; padding: 0 4px; display: inline-block; font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 11px; font-style: italic; color: #333; width: 110px; background-color: #f7f7f7; outline: none; }\
						#kong_game_ui input.dotdx_chat_filter:focus { background-color: #fff }\
						div.dotdx_chat_buttons > span.active { text-shadow: 0 0 4px #aaa }\
						div.dotdx_chat_buttons > span:hover { text-shadow: 0 0 4px #888 }\
						div.tab_pane p.collapsingCategory { border: 1px solid #999; border-width: 1px 0; margin: 5px 0 0; cursor: pointer; background-color: #ddd; font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 12px; padding: 2px 6px 1px; padding-right: 10px; box-shadow: 0 0 4px #ccc; background: -webkit-linear-gradient(top, #ccc, #eee); background: -moz-linear-gradient(top, #ccc, #eee); } \
						div.tab_pane p.collapsingCategory:hover { background: -webkit-linear-gradient(top, #ccc, #ddd); background: -moz-linear-gradient(top, #ccc, #ddd); box-shadow: 0 0 4px #bbb;}\
						div.tab_pane div.collapsingField { padding-top: 3px; }\
						xxx {display:block !important}\
						span.DotDX_RaidListVisited {float: right; padding: 0 3px;} \
						span.DotDX_List_diff {display: block; width: 25px; float: left; font-weight: bold; padding-left: 2px;} \
						span.DotDX_List_diff.DotDX_N {color: #00BB00;} \
						span.DotDX_List_diff.DotDX_H {color: #DDAA00;} \
						span.DotDX_List_diff.DotDX_L {color: #FF0000;} \
						span.DotDX_List_diff.DotDX_NM {color: #BB00BB;} \
						div.tab_pane input, div.tab_pane select {border: 1px solid #ccc; padding: 1px} \
						div.tab_pane input {height: 14px;} \
						div.tab_pane select {height: 18px} \
						div.tab_pane input[type=\"button\"] {height: 26px; padding: 0 3px; color: #444; border: 1px solid #bbb; background-color: #f7f7f7; outline: none; box-shadow: 0 0 3px #ddd; background: -webkit-linear-gradient(top, #eee, #fff); background: -moz-linear-gradient(top, #eee, #fff); font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 11px; transition: all .3s} \
						div.tab_pane input[type=\"button\"].generic:hover {background: -webkit-linear-gradient(top, #fff, #ccc); background: -moz-linear-gradient(top, #fff, #ccc); box-shadow: 0 0 5px #bbb; text-shadow: 0 0 3px #bbb;}\
						div.tab_pane input[type=\"button\"].green:hover {background: -webkit-linear-gradient(top, #fff, #b9daaf); background: -moz-linear-gradient(top, #fff, #b9daaf); box-shadow: 0 0 5px #a7ca9c; text-shadow: 0 0 3px #bbb;}\
						div.tab_pane input[type=\"button\"].blue:hover {background: -webkit-linear-gradient(top, #fff, #a4c8ee); background: -moz-linear-gradient(top, #fff, #a4c8ee); box-shadow: 0 0 5px #a9d3ff; text-shadow: 0 0 3px #bbb;}\
						div.tab_pane input[type=\"button\"].red:hover,\
						div.tab_pane input[type=\"button\"][value=\"Cancel\"]:hover {background: -webkit-linear-gradient(top, #fff, #f0a4a4); background: -moz-linear-gradient(top, #fff, #f0a4a4); box-shadow: 0 0 5px #ffbaba; text-shadow: 0 0 3px #bbb;}\
						div.tab_pane input.landpmbutton { height: 20px; width: 22px; } \
						div.tab_pane input.landpmbuttonhigh { height: 20px; width: 22px; background-color: #82BA00; background: -webkit-linear-gradient(top,#8DC98D,#fff); background: -moz-linear-gradient(top,#8DC98D,#fff); } \
						div.tab_pane input.landtxtfield { padding: 2px 0; width: 50px; text-align: center} \
						div.tab_pane input.landtxtfieldc { padding: 2px 0; width: 100%; text-align: center } \
						div.tab_pane td.landname { padding-top: 3px} \
						div.tab_pane input.landsavebutton { height: 20px; width:100% } \
						table.raids { font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 10px; text-align: center; border-collapse: collapse;  margin: 5px auto } \
                        table.raids td { border: 1px solid #bbb; width: 55px; background-color: #fff; }\
                        table.raids td.ep { text-align: right; width: auto; padding: 0 4px; } \
                        table.raids th { border: 1px solid #bbb; background-color: #efefef; } \
                        table.raids tr.head { background-color: #fafafa; } \
                        table.raids tr.split td { border-bottom-width: 2px; } \
                        table.raids tr.best td { background-color: #eff4f9; } \
                        table.raids colgroup col.selected { border: 2px solid #5f9ea0; }\
                        ul#SRDotDX_tabpane_tabs input[type=\"checkbox\"] {display: none}\
                        ul#SRDotDX_tabpane_tabs input[type=\"checkbox\"] + label {font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 12px; cursor: pointer;}\
					    ul#SRDotDX_tabpane_tabs input[type=\"checkbox\"] + label:before { content:\"\"; display:inline-block; width:17px; height:14px; position: relative; top: 2px; background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiUlEQVR42qXM3QYFIRiF4d3dJpIhI5FKJCOSSHe7f9gn4ztZo3Wwzt6HvTbHfhdCeD8Nvw27Ad57OI4xUsA5BwMpJQpYa2Eg50wBYwwMlFIocJ4nDFzXRQGtNQzUWilwHAcMtNYooJSCgd47BaSUMDDGoIAQAgbmnBTgnMPAWosCcP3fDdjZNvABvRhVEQglsV8AAAAASUVORK5CYII=') left top no-repeat; }\
                        ul#SRDotDX_tabpane_tabs input[type=\"checkbox\"].generic + label:before { margin-left: 5px }\
                        ul#SRDotDX_tabpane_tabs input[type=\"checkbox\"]:checked + label:before {background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuklEQVR42qWScQfFIBTF27dNzIxMxtREkpjE7Nu+98q7U+96T0/nj3Vv55wfsYF0akgfpdTj3+KrM1QAKWVzed93DNi2rRmgtcaAdV1/lowxBDJpRgAhxNeytTafkEk7AizLkk3nHIEZdlCZQQDOeTa99/lMO8ywg9I9AszznM3jONATwAOlDAJM03QHQgj3XN6XPgKM41iFYozk8670EIAx1vgXEHKeJwZQSpsB13VhQHP7rQrQo27AE+MRcBFOD9LhAAAAAElFTkSuQmCC') left top no-repeat;}\
                        ul#SRDotDX_tabpane_tabs input[type=\"radio\"] {display: none}\
                        ul#SRDotDX_tabpane_tabs input[type=\"radio\"] + label {font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 12px; cursor: pointer;}\
					    ul#SRDotDX_tabpane_tabs input[type=\"radio\"] + label:before { content:\"\"; display:inline-block; width:17px; height:14px; position: relative; top: 3px; background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAMAAABFNRROAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJQTFRFfX19hYWFhoaGiYmJi4uLkZGRkpKSmJiYm5ubsbGxtra2t7e3ubm5vLy8vr6+wMDAwsLCxsbG4ODg4eHh4uLi5eXl5+fn6urq6+vr7Ozs7e3t7u7u7+/v8PDw8/Pz9fX1+Pj4+vr6/Pz8/v7+////////b6mNewAAACZ0Uk5T/////////////////////////////////////////////////wCneoG8AAAAd0lEQVR42jTOyRaDIBQD0CDigAqOQMWWDr7//0WhHu4qWSUgIicrVNLFBKKBT/a0Ex9S0034JaHRhL04vrej2NGNn2zsILZ3tgkwHzLPIJZXtghI9cyUhGOrv63Mxb3aPBJT6/SlL9VsZ1X2/2dkWg7empguAQYA2EwP8sBMGt4AAAAASUVORK5CYII=') left top no-repeat; }\
                        ul#SRDotDX_tabpane_tabs input[type=\"radio\"].generic + label:before { margin-left: 5px }\
                        ul#SRDotDX_tabpane_tabs input[type=\"radio\"]:checked + label:before {background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAMAAABFNRROAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKVQTFRFWlpaYGBgZmZmb29vfX19goKChYWFhoaGiYmJi4uLkZGRkpKSlpaWmJiYmZmZm5uboqKio6OjpaWlsbGxs7Oztra2t7e3ubm5vLy8vb29vr6+v7+/wMDAwcHBwsLCxsbGzs7O4ODg4eHh4uLi5eXl5+fn6urq6+vr7Ozs7e3t7u7u7+/v8PDw8vLy8/Pz9fX19vb2+Pj4+vr6/Pz8/v7+////////5PCE/wAAADd0Uk5T////////////////////////////////////////////////////////////////////////ABBZnYsAAACbSURBVHjaHI7ZAoIgFAVvoqhYWRlq5r6vGFD8/6elztPM0zmglOqoozu02wyUCq2s/bWZFe4Vu+t3Z3VjBYM5SZk8EikncwA/FdyAExhcpD6Qmr81hJD24jUBPK43tHNfRwykZOlRKSsJ0Ghm5y2ubI4odLgaRf7MxVjhbtu7NP3yWfrmEu9fAjsq2iKyg+OZajxLt7xms78AAwBAzRQEoOducwAAAABJRU5ErkJggg==') left top no-repeat;}\
                        ul#SRDotDX_tabpane_tabs input[type=\"text\"].generic { border: 1px dashed transparent; border-bottom-color: #bbb; padding: 0 1px; background-color: transparent; font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 12px; color: #333; outline: none; height: 15px; text-align: center; }\
                        ul#SRDotDX_tabpane_tabs input[type=\"text\"].generic:hover { border-style: solid; }\
                        ul#SRDotDX_tabpane_tabs input[type=\"text\"].generic:focus {border-style: solid; border-color: #ccc; background: -webkit-linear-gradient(top,#eee,#fff); background: -moz-linear-gradient(top,#eee,#fff);}\
                        ul#SRDotDX_tabpane_tabs input[type=\"text\"][disabled].generic { color: #aaa; }\
                        ul#SRDotDX_tabpane_tabs input[type=\"text\"].color {float: right; margin-right: 6px; width: 40px;}\
                        input#raidsBossFilter {width: 260px; box-shadow: 0 0 4px -1px #aaa; outline: none; font-family: \"Trebuchet MS\", Helvetica, sans-serif;  font-size: 12px; padding: 3px 5px; background: -webkit-linear-gradient(top, #fff, #d1dfee); background: -moz-linear-gradient(top, #fff, #d1dfee); border-color: #aaa; margin: 4px auto; display: block}\
                        input#raidsBossFilter:hover, input#raidsBossFilter:focus {background: -webkit-linear-gradient(top, #DFE8F1, #fff); background: -moz-linear-gradient(top, #DFE8F1, #fff);}\
                        textarea#DotDX_raidsToSpam, textarea#options_sbConfig { border: 1px solid #aaa; width: 254px; margin-left: 6px; margin-top: 5px; margin-bottom: 4px; box-shadow: 0 0 4px #ccc; padding: 3px 7px; resize: none; outline: none; background: -webkit-linear-gradient(left,#fff,#eee); background: -moz-linear-gradient(left,#fff,#eee); font-size: 10px; font-style: italic; color: #444; text-shadow: 1px 1px 2px #ddd;}\
                        #kong_game_ui div#dotdx_status_div {font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-style: italic; font-size: 11px; margin: 0; padding: 6px 6px 4px; border-bottom: 1px solid #aaa; background-color: #e6e6e6; color: #666;}\
                        #kong_game_ui div#dotdx_status_div span {text-shadow: 0 0 4px #aaa; color: #333;}\
                        #kong_game_ui div#helpBox { padding: 10px 8px 8px; position: relative; color: #000; background: -moz-linear-gradient(top, rgb(187, 187, 187), rgb(235, 235, 235)); background: -webkit-linear-gradient(top, rgb(187, 187, 187), rgb(235, 235, 235)); margin-top: 3px; box-shadow: rgb(111, 111, 111) 0px 0px 6px; border-top-width: 1px; border-top-style: solid; border-top-color: rgb(131, 131, 131); font-family: \"Trebuchet MS\",Helvetica,sans-serif; font-size: 12px; text-shadow: 0 0 4px #aaa; font-style: italic; transition: margin .2s;}\
                        #kong_game_ui span.generic { display: inline-block; margin-left: 6px; margin: 3px 6px 0; font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 12px; }\
                        #kong_game_ui span.notice { display: inline-block; font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 10px; font-style: italic; margin: 3px 6px; text-shadow: 0 0 3px #ddd; }\
                        #kong_game_ui div#dotdx_usercontext { display: none; position: absolute; background-color: #eee; border: 1px solid #888; display: none; box-shadow: 0 0 8px #888; font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 12px; background: -webkit-linear-gradient(top,#e7e7e7,#fff); background: -moz-linear-gradient(top,#e7e7e7,#fff); cursor: pointer;}\
                        #kong_game_ui div#dotdx_usercontext span { display: inline-block; padding: 3px 6px 2px }\
                        #kong_game_ui div#dotdx_usercontext span:hover { text-shadow: 0 0 3px #aaa; }\
                        div#FPXfsOptions span.generic {float:left; clear:both}\
                        div#FPXfsOptions span.share { font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 10px; margin-right: 10px; margin-right: 5px; display: inline-block; padding-top: 3px; }\
                        div#FPXfsOptions label { margin-right: 4px; }\
                        div#dotdx_sidebar_container { margin-top: 25px; background: #777; height: 655px; padding-top: 10px }\
                        div#dotdx_sidebar_container > button {width: 60px; border: 1px solid #555; margin-bottom: 5px; font-size: 11px; font-family: \"Trebuchet MS\", Helvetica, sans-serif; height: 21px; transition-property: box-shadow, text-shadow, border-color, background; transition-duration: .5s; background: #ddd; text-shadow: 0 0 6px #999; box-shadow: 0 0 6px #444; outline: none; background: -webkit-linear-gradient(top,#f5f5f5,#bbb); background: -moz-linear-gradient(top,#f5f5f5,#bbb) }\
                        div#dotdx_sidebar_container > button:hover { background-color: #888; color: #fff; text-shadow: 0 0 10px #eee; box-shadow: 0 0 10px #222; position: relative; z-index: 40; border-color: #444; background: -webkit-linear-gradient(top,#999,#555); background: -moz-linear-gradient(top,#999,#555) }\
                        div#dotdx_sidebar_container > button.b:hover { color: #000; text-shadow: 0 0 10px #fff; box-shadow: 0 0 10px #1C3A61; background: -webkit-linear-gradient(top,#DCF0FD,#6794B2); background: -moz-linear-gradient(top,#DCF0FD,#6794B2) }\
                        div#dotdx_sidebar_container > button.g:hover { color: #000; text-shadow: 0 0 10px #fff; box-shadow: 0 0 10px #3D6425; background: -webkit-linear-gradient(top,#EFFDE5,#618D4F); background: -moz-linear-gradient(top,#EFFDE5,#618D4F) }\
                        div#dotdx_sidebar_container > button.r:hover { color: #000; text-shadow: 0 0 10px #fff; box-shadow: 0 0 10px #412222; background: -webkit-linear-gradient(top,#FFEFEF,#AA5858); background: -moz-linear-gradient(top,#FFEFEF,#AA5858) }\
                        div#dotdx_sidebar_container > button.y:hover { color: #000; text-shadow: 0 0 10px #fff; box-shadow: 0 0 10px #807823; background: -webkit-linear-gradient(top,#FFFBE0,#C9B41D); background: -moz-linear-gradient(top,#FFFBE0,#C9B41D) }\
                        div#dotdx_sidebar_container > div { width: 60px; height: 26px }\
                        div#dotdx_sidebar_container > input[type=\"text\"] { border: 1px solid #555; margin-bottom: 5px; display: inline-block; font-family: \"Trebuchet MS\", Helvetica, sans-serif; font-size: 11px; font-style: italic; color: #333; width: 54px; background-color: #f7f7f7; outline: none; text-shadow: 0 0 6px #999; box-shadow: 0 0 6px #444; height: 13px; text-align: center; background: -webkit-linear-gradient(top,#f5f5f5,#ccc); background: -moz-linear-gradient(top,#f5f5f5,#ccc) }\
                        div#dotdx_sidebar_container > input[type=\"text\"]:hover, div#dotdx_sidebar_container > input[type=\"text\"]:focus { background: -webkit-linear-gradient(top,#f5f5f5,#fff); background: -moz-linear-gradient(top,#f5f5f5,#fff) }\
                    ").attach("to",document.head);
					var link = SRDotDX.gui.cHTML('a').set({href: '#lots_tab_pane', class: ''}).html('<span class="SRDotDX_new">RAIDS</span>', false).attach('to', SRDotDX.gui.cHTML('li').set({ class: 'tab', id: 'lots_tab' }).attach('after', 'game_tab').ele()).ele();
                    var sbTmp = JSON.stringify(SRDotDX.config.sbConfig);
                    sbTmp = sbTmp.slice(1,sbTmp.length-1).replace(/},/g,"},&#10;").replace(/l,/g,"l,&#10;");
					var pane = SRDotDX.gui.cHTML('div').set({id: 'lots_tab_pane'}).html(' \
						<div id="dotdx_shadow_wrapper">\
						<div id="dotdx_status_div">DotDX: <span id="StatusOutput"></span></div> \
						<div style="height: 623px; overflow: hidden;">\
						<ul id="SRDotDX_tabpane_tabs"> \
							<li class="tab active"> \
								<div class="tab_head" id="raids_tab">Raids</div> \
								<div class="tab_pane" id="mainRaidsFrame"> \
									<div id="topRaidPane" style="background-color: #f6f6f6;"> \
									<div id="FPXRaidFilterDiv" class="collapsible_panel"> \
										<p class="collapsingCategory" id="collapsingCat1" onclick="SRDotDX.gui.toggleDisplay(\'FPXRaidFiltering\', this, \'raid_list\')">Filtering<span style="float:right">&minus;</span></p> \
										<div id="FPXRaidFiltering" style="display:block" class="collapsingField"> \
											<input type="text" id="raidsBossFilter" name="FPXRaidBossNameFilter"> \
                                            <input type="checkbox" id="dotdx_flt_vis"><label for="dotdx_flt_vis" style="margin-right: 9px; margin-left:5px; margin-bottom:5px; display: inline-block">Include visited</label>\
                                            <input type="checkbox" id="dotdx_flt_nuke"><label for="dotdx_flt_nuke" style="margin-right: 9px;">Only nuked</label>\
                                            <input type="checkbox" id="dotdx_flt_all"><label for="dotdx_flt_all">Show all</label>\
										</div> \
									</div> \
									<!-- <div id="FPXRaidSortingDiv" class="collapsible_panel"> \
										<p class="collapsingCategory" id="collapsingCat2" onclick="SRDotDX.gui.toggleDisplay(\'FPXRaidSort\', this, \'raid_list\')">Sorting<span style="float:right">+</span></p> \
										<div id="FPXRaidSort" style="display:none"> \
											<table> \
											<tr><td rowspan="2"><input type="button" class="regBtn" style="display:inline; height: 40px" id="SortRaidsButton" onClick="SRDotDX.gui.FPXSortRaids();return false;" value="Sort" onmouseout="SRDotDX.gui.turnNormal(this.id);" onmouseover="SRDotDX.gui.highlightButton(this.id,\'Sort raids based on selected criteria.\');"></td> \
											<td>&nbsp;Sort by: \
											<select style="width: 90px" id="FPXRaidSortSelection" tabIndex="-1"> \
												<option value="Time" selected>TimeStamp</option> \
												<option value="Name">Raid Name</option> \
												<option value="Diff">Difficulty</option> \
												<option value="Id">Raid Id</option> \
											</select> \
											<select style="width: 56px" id="FPXRaidSortDirection" tabIndex="-1"> \
												<option value="asc" selected>Asc</option> \
												<option value="desc">Desc</option> \
											</select></td></tr> \
											<tr><td style="padding: 2px"><input type="checkbox" id="SRDotDX_options_newRaidsAtTopOfRaidList"><div><label>New raids at top of raid list</label></div></td></tr> \
											</table> \
										</div> \
									</div> --> \
										<input style="width: 94px; margin-top: 1px; margin-left: 5px" name="ImportRaids" class="blue" id="ImportRaidsButton" onclick="SRDotDX.request.raids();return false;" tabIndex="-1" type="button" value="Import" onmouseout="SRDotDX.gui.displayHint();" onmouseover="SRDotDX.gui.displayHint(\'Import all alive raids from raids server.\');">\
										<input style="width: 55px;" name="DumpRaids" class="generic" id="DumpRaidsButton" onclick="SRDotDX.gui.RaidAction(\'share\');return false;" tabIndex="-1" type="button" value="Share" onmouseout="SRDotDX.gui.displayHint();" onmouseover="SRDotDX.gui.displayHint(\'Copy all selected (not dead) raids to the share tab.\');"> \
										<input style="width: 55px;" name="PostRaids" class="generic" id="PostRaidsButton" onclick="SRDotDX.gui.RaidAction(\'post\');return false;" tabIndex="-1" type="button" value="Post" onmouseout="SRDotDX.gui.displayHint();" onmouseover="SRDotDX.gui.displayHint(\'Post all selected (not dead) raids to chat.\');"> \
										<input style="width: 55px;" name="DeleteRaids" class="red" id="DeleteRaidsButton" onclick="SRDotDX.gui.RaidAction(\'delete\'); return false;" tabIndex="-1" type="button" value="Delete" onmouseout="SRDotDX.gui.displayHint();" onmouseover="SRDotDX.gui.displayHint(\'Delete selected raids.\');"><br> \
										<input style="width: 94px; margin-bottom: 7px; margin-left: 5px; margin-top: 4px"name="JoinRaids" class="green" id="AutoJoinVisibleButton" onclick="SRDotDX.gui.joinSelectedRaids(false) ;return false;" tabIndex="-1" type="button" value="Join" onmouseout="SRDotDX.gui.displayHint();" onmouseover="SRDotDX.gui.displayHint(\'Join all selected (not dead) raids.\'); "> \
										<input style="width: 173px; margin-bottom: 5px; margin-top: 4px" name="ImpJoinRaids" class="green" id="AutoImpJoinVisibleButton" onclick="SRDotDX.request.joinAfterImport = true;SRDotDX.request.raids();return false;" tabIndex="-1" type="button" value="Import & Join" onmouseout="SRDotDX.gui.displayHint();" onmouseover="SRDotDX.gui.displayHint(\'Import from server and join all selected (not dead) raids.\'); "> \
									</div> \
									<div style="" id="raid_list" tabIndex="-1"></div> \
								</div> \
							</li> \
							<li class="tab"> \
							<div class="tab_head">Opts</div> \
								<div class="tab_pane"> \
									<div id="FPXRaidOptionsDiv" class="collapsible_panel"> \
										<p class="collapsingCategory" name="dotdxOptsTabs" id="collapsingCat5" onclick="SRDotDX.gui.toggleDisplay(\'FPXRaidOptions\', this)">Raid Options<span style="float:right">+</span></p> \
										<div id="FPXRaidOptions" name="dotdxOptsTabs" style="display:none" class="collapsingField"> \
												<input type="checkbox" id="SRDotDX_options_markMyRaidsVisited" class="generic"><label for="SRDotDX_options_markMyRaidsVisited">Mark raids posted by me as visited</label><br> \
												<input type="checkbox" id="SRDotDX_options_confirmWhenDeleting" class="generic"><label for="SRDotDX_options_confirmWhenDeleting">Confirm when manually deleting raids</label><br> \
												<input type="checkbox" id="SRDotDX_options_importFiltered" class="generic"><label for="SRDotDX_options_importFiltered">Add to database filtered raids only</label><br> \
												<span class="generic">Unvisited raid pruning:</span><br> \
												<input type="radio" id="FPX_options_unvisitedPruningAggressive" class="generic" name="unvisitedPruning" value="Aggressive"/><label for="FPX_options_unvisitedPruningAggressive">Aggressive</label> \
												<input type="radio" id="FPX_options_unvisitedPruningModerate" class="generic" name="unvisitedPruning" value="Moderate"/><label for="FPX_options_unvisitedPruningModerate">Moderate</label> \
												<input type="radio" id="FPX_options_unvisitedPruningSlow" class="generic" name="unvisitedPruning" value="Slow"/><label for="FPX_options_unvisitedPruningSlow">Slow</label> \
												<input type="radio" id="FPX_options_unvisitedPruningNone" class="generic" name="unvisitedPruning" value="None"/><label for="FPX_options_unvisitedPruningNone">None</label><br> \
										</div> \
									</div> \
									<div id="FPXChatOptionsDiv" class="collapsible_panel"> \
										<p class="collapsingCategory" name="dotdxOptsTabs" id="collapsingCat6" onclick="SRDotDX.gui.toggleDisplay(\'FPXChatOptions\', this)">Chat Options<span style="float:right">+</span></p> \
										<div id="FPXChatOptions" name="dotdxOptsTabs" style="display:none" class="collapsingField"> \
											<input type="checkbox" id="SRDotDX_options_hideRaidLinks" class="generic"><label for="SRDotDX_options_hideRaidLinks">Hide all raid links in chat</label><br> \
											<input type="checkbox" id="SRDotDX_options_hideBotLinks" class="generic"><label for="SRDotDX_options_hideBotLinks">Hide bot raid links in chat</label><br> \
											<input type="checkbox" id="SRDotDX_options_hideVisitedRaids" class="generic"><label for="SRDotDX_options_hideVisitedRaids">Hide visited raids in chat</label><br> \
											<span class="generic">Chat size:</span>\
											<input type="radio" id="SRDotDX_options_chatSizeNormal" name="chatSize" value="300"/><label for="SRDotDX_options_chatSizeNormal">Normal</label> \
											<input type="radio" id="SRDotDX_options_chatSizePlus25" name="chatSize" value="375" class="generic"/><label for="SRDotDX_options_chatSizePlus25">+25%</label> \
											<input type="radio" id="SRDotDX_options_chatSizePlus50" name="chatSize" value="400" class="generic"/><label for="SRDotDX_options_chatSizePlus50">+50%</label><br> \
											<span class="generic">More info in raid links:</span> \
											<input type="checkbox" id="SRDotDX_options_showFS"><label for="SRDotDX_options_showFS">Show FS</label> \
											<input type="checkbox" id="SRDotDX_options_showAP" class="generic"><label for="SRDotDX_options_showAP">Show AP</label> \
										</div> \
									</div> \
									<div id="FPXPasteOptionsDiv" class="collapsible_panel"> \
										<p class="collapsingCategory" name="dotdxOptsTabs" id="collapsingCat7" onclick="SRDotDX.gui.toggleDisplay(\'FPXPasteOptions\', this)">Pastebin Options<span style="float:right">+</span></p> \
										<div id="FPXPasteOptions" name="dotdxOptsTabs" style="display:none" class="collapsingField"> \
											<input type="checkbox" id="SRDotDX_options_autoImportPaste" class="generic"><label for="SRDotDX_options_autoImportPaste">Auto import pastebins</label><br> \
											<input type="checkbox" id="SRDotDX_options_confirmForLargePaste" class="generic"><label for="SRDotDX_options_confirmForLargePaste">Confirm if pastie exceeds</label> <input type="text" class="generic" style="width: 26px;" id="SRDotDX_options_confirmPasteSize"> \
										</div> \
									</div> \
									<div id="FPXIntOptionsDiv" class="collapsible_panel"> \
										<p class="collapsingCategory" name="dotdxOptsTabs" id="collapsingCat20" onclick="SRDotDX.gui.toggleDisplay(\'FPXIntOptions\', this)">Interface Options<span style="float:right">+</span></p> \
										<div id="FPXIntOptions" name="dotdxOptsTabs" style="display:none" class="collapsingField"> \
										    <input type="checkbox" id="options_hideGameTitle" class="generic"><label for="options_hideGameTitle">Hide titlebar above game window</label><br>\
										    <input type="checkbox" id="options_hideGameDetails" class="generic"><label for="options_hideGameDetails">Hide details under game window</label><br>\
										    <input type="checkbox" id="options_hideKongForum" class="generic"><label for="options_hideKongForum">Hide forum under game window</label><br>\
										    <input type="checkbox" id="options_trueMsgCount" class="generic"><label for="options_trueMsgCount">Display true kong messages count</label><br>\
											<span class="generic">Kong background color</span><input type="text" class="generic color" id="SRDotDX_colors_background"> \
										</div> \
									</div> \
									<div id="FPXsbOptionsDiv" class="collapsible_panel"> \
										<p class="collapsingCategory" name="dotdxOptsTabs" id="collapsingCat25" onclick="SRDotDX.gui.toggleDisplay(\'FPXsbOptions\', this)">Sidebar Options<span style="float:right">+</span></p> \
										<div id="FPXsbOptions" name="dotdxOptsTabs" style="display:none" class="collapsingField"> \
										    <input type="checkbox" id="options_sbEnable" class="generic"><label for="options_sbEnable">Enable DotDX Sidebar</label><br>\
										    <input type="checkbox" id="options_cbDisable" class="generic"><label for="options_cbDisable">Hide toolbar under chat window</label><br>\
										    <input type="checkbox" id="options_sbRightSide" class="generic"><label for="options_sbRightSide">Show sidebar on the right side of chat</label><br> \
                                            <textarea id="options_sbConfig" rows="25" style="overflow-y: hidden; overflow-x: scroll; white-space: nowrap">' + sbTmp + '</textarea> \
										    <input id="dotdx_sbConfigSave" style="margin: 0 0 2px 6px; width: 270px;" class="blue" type="button" value="Save and apply new sidebar layout" onclick="SRDotDX.gui.applySidebarUI(0); return false;">\
										</div> \
									</div> \
									<div id="FPXfsOptionsDiv" class="collapsible_panel"> \
										<p class="collapsingCategory" name="dotdxOptsTabs" id="collapsingCat24" onclick="SRDotDX.gui.toggleDisplay(\'FPXfsOptions\', this)">Friend Share Options<span style="float:right">+</span></p> \
										<div id="FPXfsOptions" name="dotdxOptsTabs" style="display:none; text-align:right" class="collapsingField"> \
										</div> \
									</div> \
								</div> \
							</li> \
							<li class="tab"> \
								<div class="tab_head" id="FPXShareTab">Share</div> \
								<div class="tab_pane"> \
								    <div id="FPXRaidSpamDiv"> \
											<div id="FPXShareDiv" class="collapsible_panel"> \
												<p class="collapsingCategory" id="collapsingCat8" onclick="SRDotDX.gui.toggleDisplay(\'FPXShare\', this, \'share_list\')">Share<span style="float:right">+</span></p> \
										        <div id="FPXShare" style="display:block" class="collapsingField"> \
													<input type="checkbox" id="SRDotDX_options_formatLinkOutput" class="generic"><label for="SRDotDX_options_formatLinkOutput">Enable formatting of posted raid links</label><br> \
													<span class="generic">Whisper to </span><input type="text" class="generic" id="SRDotDX_options_whisperTo"><br>\
													<span class="notice">(if "whisper to" field is blank, raids will be posted public)</span> \
													<input id="dotdx_share_post_button" style="margin: 3px 0 0 6px; width: 133px" name="Submit" class="generic" type="button" tabIndex="-1" value="Post Links to Chat" onclick="SRDotDX.gui.RaidAction(\'post_share\');return false;"/> \
													<input id="dotdx_friend_post_button" style="width: 133px" name="Submit1" class="green" type="button" tabIndex="-1" value="Friend Share links" onclick="SRDotDX.gui.RaidAction(\'post_friend\');return false;"/><br> \
												</div> \
											</div> \
											<div id="FPXImportDiv" class="collapsible_panel" class="collapsingField"> \
												<p class="collapsingCategory" id="collapsingCat9" onclick="SRDotDX.gui.toggleDisplay(\'FPXImport\', this, \'share_list\')">Import<span style="float:right">+</span></p> \
										        <div id="FPXImport" style="display:none" class="collapsingField"> \
													<input type="checkbox" id="SRDotDX_options_markImportedRaidsVisited" class="generic"><label for="SRDotDX_options_markImportedRaidsVisited">Mark imported raids visited</label><br> \
                                                    <input style="margin-left: 6px; margin-top: 6px; width: 133px" name="Submit2" class="blue" type="button" tabIndex="-1" value="Import to Raid Tab" onClick="SRDotDX.gui.FPXimportRaids();return false;"/> \
													<input style="width: 133px" name="Submit3" class="blue" type="button" tabIndex="-1" value="Delete and Import" onClick="SRDotDX.gui.FPXdeleteAllRaids();SRDotDX.gui.FPXimportRaids();return false;"/> \
											    </div> \
											</div> \
									</div> \
									<textarea id="DotDX_raidsToSpam" name="FPXRaidSpamInput" style="height:443px;"></textarea> \
								</div> \
							</li> \
							<li class="tab"> \
								<div class="tab_head">Filter</div> \
								<div class="tab_pane"> \
									<div id="FPXRaidFilterDiv"> \
										<div id="FPXRaidFilterWhereDiv"> \
										<p class="collapsingCategory" id="collapsingCat18" onclick="SRDotDX.gui.toggleDisplay(\'FPXRaidFilterWhere\', this)">Filtering options<span style="float:right">+</span></p> \
										<div id="FPXRaidFilterWhere" style="display:block" class="collapsingField"> \
											<input type="checkbox" id="SRDotDX_options_perRaidFilterLinks" class="generic"><label for="SRDotDX_options_perRaidFilterLinks">Activate filtering on raid links</label><br> \
											<input type="checkbox" id="SRDotDX_options_perRaidFilterRaidList" class="generic"><label for="SRDotDX_options_perRaidFilterRaidList">Activate filtering on raid list tab</label><br> \
										</div>\
										</div> \
										<div id="FPXRaidFilterWhatDiv"> \
											<div id="FPXRaidTableSmallDiv" class="collapsible_panel"> \
												<p class="collapsingCategory" name="dotdxFilterTab" id="collapsingCat11" onclick="SRDotDX.gui.toggleDisplay(\'FPXRaidTableSmall\', this)">Small Raids<span style="float:right">+</span></p> \
												<table id="FPXRaidTableSmall" name="dotdxFilterTab" style="display:none" class="collapsingField"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatSmall"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div id="FPXRaidTableMediumDiv" class="collapsible_panel"> \
												<p class="collapsingCategory" name="dotdxFilterTab" id="collapsingCat12" onclick="SRDotDX.gui.toggleDisplay(\'FPXRaidTableMedium\', this)">Medium Raids<span style="float:right">+</span></p> \
												<table id="FPXRaidTableMedium" name="dotdxFilterTab" style="display:none" class="collapsingField"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatMedium"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div id="FPXRaidTableLargeDiv" class="collapsible_panel"> \
												<p class="collapsingCategory" name="dotdxFilterTab" id="collapsingCat13" onclick="SRDotDX.gui.toggleDisplay(\'FPXRaidTableLarge\', this)">Large Raids<span style="float:right">+</span></p> \
												<table id="FPXRaidTableLarge" name="dotdxFilterTab" style="display:none" class="collapsingField"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatLarge"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div id="FPXRaidTableEpicDiv" class="collapsible_panel"> \
												<p class="collapsingCategory" name="dotdxFilterTab" id="collapsingCat14" onclick="SRDotDX.gui.toggleDisplay(\'FPXRaidTableEpic\', this)">Epic Raids<span style="float:right">+</span></p> \
												<table id="FPXRaidTableEpic" name="dotdxFilterTab" style="display:none" class="collapsingField"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatEpic"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div id="FPXRaidTableColossalDiv" class="collapsible_panel"> \
												<p class="collapsingCategory" name="dotdxFilterTab" id="collapsingCat15" onclick="SRDotDX.gui.toggleDisplay(\'FPXRaidTableColossal\', this)">Colossal Raids<span style="float:right">+</span></p> \
												<table id="FPXRaidTableColossal" name="dotdxFilterTab" style="display:none" class="collapsingField"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatColossal"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div id="FPXRaidTableGuildDiv" class="collapsible_panel"> \
												<p class="collapsingCategory" name="dotdxFilterTab" id="collapsingCat16" onclick="SRDotDX.gui.toggleDisplay(\'FPXRaidTableGuild\', this)">Guild Raids<span style="float:right">+</span></p> \
												<table id="FPXRaidTableGuild" name="dotdxFilterTab" style="display:none; height: 356px; overflow-y: auto;" class="collapsingField"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatGuild"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div id="FPXRaidTableSpecialDiv" class="collapsible_panel"> \
												<p class="collapsingCategory" name="dotdxFilterTab" id="collapsingCat17" onclick="SRDotDX.gui.toggleDisplay(\'FPXRaidTableSpecial\', this)">World Raids<span style="float:right">+</span></p> \
												<table id="FPXRaidTableSpecial" name="dotdxFilterTab" style="display:none" class="collapsingField"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatSpecial"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
										</div> \
									</div> \
								</div> \
							</li> \
							<li class="tab"> \
								<div class="tab_head">Calc</div> \
								<div class="tab_pane"> \
									<ul id="SRDotDX_tabpane_tabs2"> \
									<li class="tab2"> \
								<div id="FPXLandCalcDiv" class="collapsible_panel"> \
								<p class="collapsingCategory" id="collapsingCat20" onclick="SRDotDX.gui.toggleDisplay(\'FPXLandCalc\', this)">Land Calculator<span style="float:right">+</span></p> \
								<div id="FPXLandCalc" style="display:block" class="collapsingField"> \
								<form id="FPXLand" name="FPXLandForm" onSubmit="return false;"> \
								<table style="margin: 0 auto; padding-right: 10px;"> \
									<tr><td class="landname" colspan="3">Cornfield</td><td style="width: 10px">&nbsp;</td><td class="landname" colspan="3">Stable</td></tr> \
									<tr> \
										<td> <input class="landpmbutton red" id="a_1" name="FPXminusTen_1" type="button" value=" - " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="10"/></td> \
										<td> <input class="landtxtfield" maxlength="10" name="tf_1" onblur="SRDotDX.gui.FPXLandUpdater();" size="8" type="text" tabindex="1" /></td> \
										<td> <input class="landpmbutton blue" id="b_1" name="FPXplusTen_1" type="button" value=" + " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="11"/></td> \
										<td></td> \
										<td> <input class="landpmbutton red" id="a_2" name="FPXminusTen_2" type="button"   value=" - " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="12"/></td> \
										<td> <input class="landtxtfield" maxlength="10" name="tf_2" onblur="SRDotDX.gui.FPXLandUpdater();" size="8" type="text" tabindex="2" /></td> \
										<td> <input class="landpmbutton blue" id="b_2" name="FPXplusTen_2" type="button"   value=" + " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="13"/></td> \
									</tr> \
									<tr><td class="landname" colspan="3">Barn</td><td></td><td class="landname" colspan="3">Store</td></tr> \
									<tr> \
										<td> <input class="landpmbutton red" id="a_3" name="FPXminusTen_3" type="button"   value=" - " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="14"/></td> \
										<td> <input class="landtxtfield" maxlength="10" name="tf_3" onblur="SRDotDX.gui.FPXLandUpdater();" size="8" type="text" tabindex="3" /></td> \
										<td> <input class="landpmbutton blue" id="b_3" name="FPXplusTen_3" type="button"   value=" + " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="15"/></td> \
										<td></td> \
										<td> <input class="landpmbutton red" id="a_4" name="FPXminusTen_4" type="button"   value=" - " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="16"/></td> \
										<td> <input class="landtxtfield" maxlength="10" name="tf_4" onblur="SRDotDX.gui.FPXLandUpdater();" size="8" type="text" tabindex="4" /></td> \
										<td> <input class="landpmbutton blue" id="b_4" name="FPXplusTen_4" type="button"   value=" + " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="17"/></td> \
									</tr> \
									<tr><td class="landname" colspan="3">Pub</td><td></td><td class="landname" colspan="3">Inn</td></tr> \
									<tr> \
										<td> <input class="landpmbutton red" id="a_5" name="FPXminusTen_5" type="button"   value=" - " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="18"/></td> \
										<td> <input class="landtxtfield" maxlength="10" name="tf_5" onblur="SRDotDX.gui.FPXLandUpdater();" size="8" type="text" tabindex="5" /></td> \
										<td> <input class="landpmbutton blue" id="b_5" name="FPXplusTen_5" type="button"   value=" + " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="19"/></td> \
										<td></td> \
										<td> <input class="landpmbutton red" id="a_6" name="FPXminusTen_6" type="button"   value=" - " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="20"/></td> \
										<td> <input class="landtxtfield" maxlength="10" name="tf_6" onblur="SRDotDX.gui.FPXLandUpdater();" size="8" type="text" tabindex="6" /></td> \
										<td> <input class="landpmbutton blue" id="b_6" name="FPXplusTen_6" type="button"   value=" + " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="21"/></td> \
									</tr> \
									<tr><td class="landname" colspan="3">Sentry</td><td></td><td class="landname" colspan="3">Fort</td></tr> \
									<tr> \
										<td> <input class="landpmbutton red" id="a_7" name="FPXminusTen_7" type="button"   value=" - " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="22"/></td> \
										<td> <input class="landtxtfield" maxlength="10" name="tf_7" onblur="SRDotDX.gui.FPXLandUpdater();" size="8" type="text" tabindex="7" /></td> \
										<td> <input class="landpmbutton blue" id="b_7" name="FPXplusTen_7" type="button"   value=" + " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="23"/></td> \
										<td></td> \
										<td> <input class="landpmbutton red" id="a_8" name="FPXminusTen_8" type="button"   value=" - " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="24"/></td> \
										<td> <input class="landtxtfield" maxlength="10" name="tf_8" onblur="SRDotDX.gui.FPXLandUpdater();" size="8" type="text" tabindex="8" /></td> \
										<td> <input class="landpmbutton blue" id="b_8" name="FPXplusTen_8" type="button"   value=" + " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="25"/></td> \
									</tr> \
									<tr><td class="landname" colspan="3">Castle</td></tr> \
									<tr> \
										<td> <input class="landpmbutton red" id="a_9" name="FPXminusTen_9" type="button"   value=" - " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="26"/></td> \
										<td> <input  class="landtxtfield" maxlength="10" name="tf_9" onblur="SRDotDX.gui.FPXLandUpdater();" size="8" type="text" tabindex="9" /></td> \
										<td> <input class="landpmbutton blue" id="b_9" name="FPXplusTen_9" type="button"   value=" + " onClick="SRDotDX.gui.FPXLandButtonHandler(this, this.name);return false;" tabindex="27"/></td> \
										<td></td> \
										<td colspan="3"> <input class="landsavebutton green" id="lsbutton" type="button" value="Save" onClick="SRDotDX.gui.FPXLandButtonSave();return false;" tabindex="28"/></td> \
									</tr> \
								</table> \
								</form> \
								</div> \
								</div>\
							</li> \
									</ul> \
								</div> \
							</li>  \
						</ul> \
						</div>\
						<div id="helpBox">Help message</div> \
						</div>\
					', false).attach('to', 'kong_game_ui').ele();

                    SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'DotDX_colors'}).text(' \
                        .DotDX_filter_dummy_0 {display: none !important} \
                        ').attach('to',document.head);

					pane.style.height = document.getElementById('chat_tab_pane').style.height;
					var e = pane.getElementsByClassName('tab_head');
					i = e.length;
                    while (i--) {
						e[i].addEventListener('click', function() {
							if (!/\bactive\b/i.test(this.className)) {
								var e = document.getElementById("lots_tab_pane").getElementsByTagName("li");
								var i = e.length;
                                while (i--) if (e[i].getAttribute("class").indexOf("active") > -1) e[i].className = e[i].className.replace(/ active$/g,"");
								(this.parentNode).className += ' active';
							}
						});
					}
					holodeck._tabs.addTab(link);

                    //Set up custom chat size
                    SRDotDX.gui.chatResize(SRDotDX.config.chatSize);

                    //Chat raids overlay div
                    SRDotDX.gui.cHTML('div').set({id: 'chat_raids_overlay'})
                                            .html('<span id="chat_raids_overlay_text"></span>',true)
                                            .attach("to",'chat_tab_pane');
                    SRDotDX.gui.cHTML('div').set({id: 'dotdx_usercontext' })
                                            .html('<span class="dotdx_context_name" style="text-shadow: none; font-weight: bold; padding-right: 10px;">Guest</span><span class="dotdx_context_friend">Friend</span><span class="dotdx_context_slap">Slap</span><span class="dotdx_context_mute">Mute</span>',true)
                                            .on('mouseout',SRDotDX.gui.userContextMenuOut,true)
                                            .on('click',function(e){SRDotDX.gui.userContextMenuClick(e)},false)
                                            .attach("to",'chat_tab_pane');

                    //Sidebar elements generator
                    if (SRDotDX.config.sbEnable) SRDotDX.gui.applySidebarUI(1);

                    //spam tab
					var FPXimpSpam = SRDotDX.gui.cHTML('#DotDX_raidsToSpam');
					var FPXSpamText = 'Paste raid and/or pastebin links here to share or import\n\nLinks must be comma (,) separated.';
					FPXimpSpam.ele().value=FPXSpamText;
					FPXimpSpam.ele().addEventListener('blur',function() { if (this.value == '') this.value = FPXSpamText });
					FPXimpSpam.ele().addEventListener('focus',function() { if (this.value == FPXSpamText) this.value = '' });

                    //chat global listener
                    var chat_window = document.getElementById('chat_rooms_container');
                    chat_window.addEventListener('click',function(e) { SRDotDX.gui.chatWindowMouseDown(e) }, false);
                    chat_window.addEventListener('contextmenu',function(e) { SRDotDX.gui.chatWindowContextMenu(e) }, false);
					//land tab
                    els = document.FPXLandForm; i = 9;
                    while (i--) els.elements['tf_'+(i+1)].value = SRDotDX.config.FPXLandOwnedCount[i];
                    SRDotDX.gui.FPXLandUpdater();

					//raid tab
                    var raids_tab = document.getElementById('raids_tab');
                    raids_tab.addEventListener('click', function(){ SRDotDX.gui.refreshRaidList(); }, false);

                    var raidBossFilter = SRDotDX.gui.cHTML('#raidsBossFilter');
                    raidBossFilter.ele().value = SRDotDX.config.lastFilter;
                    raidBossFilter.ele().addEventListener("keyup", function(){ SRDotDX.gui.updateFilterTxt(this.value,true); });

                    var filterIncVis = SRDotDX.gui.cHTML('#dotdx_flt_vis');
                    filterIncVis.ele().checked = SRDotDX.config.fltIncVis;
                    filterIncVis.on('click',function(){
                        SRDotDX.config.fltIncVis = this.checked;
                        if(this.checked) {
                            document.getElementById('dotdx_flt_nuke').checked = false; SRDotDX.config.fltShowNuked = false;
                            document.getElementById('dotdx_flt_all').checked = false; SRDotDX.config.fltShowAll = false;
                        }
                        SRDotDX.gui.selectRaidsToJoin('checkbox')});

                    var filterShowNuked = SRDotDX.gui.cHTML('#dotdx_flt_nuke');
                    filterShowNuked.ele().checked = SRDotDX.config.fltShowNuked;
                    filterShowNuked.on('click',function(){
                        SRDotDX.config.fltShowNuked = this.checked;
                        if(this.checked) {
                            document.getElementById('dotdx_flt_vis').checked = false; SRDotDX.config.fltIncVis = false;
                            document.getElementById('dotdx_flt_all').checked = false; SRDotDX.config.fltShowAll = false;
                        }
                        SRDotDX.gui.selectRaidsToJoin('checkbox')});

                    var filterShowAll = SRDotDX.gui.cHTML('#dotdx_flt_all');
                    filterShowAll.ele().checked = SRDotDX.config.fltShowAll;
                    filterShowAll.on('click',function(){
                        SRDotDX.config.fltShowAll = this.checked;
                        if(this.checked) {
                            document.getElementById('dotdx_flt_vis').checked = false; SRDotDX.config.fltIncVis = false;
                            document.getElementById('dotdx_flt_nuke').checked = false; SRDotDX.config.fltShowNuked = false }
                        SRDotDX.gui.selectRaidsToJoin('checkbox')});

                    //raidlist global click listener
                    var raid_list = document.getElementById('raid_list');
                    raid_list.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); return false },false);
                    raid_list.addEventListener('mousedown',function(e) { SRDotDX.gui.FPXraidListMouseDown(e) },false);

					//options tab
                    var optsImportFiltered = SRDotDX.gui.cHTML('#SRDotDX_options_importFiltered');
                    optsImportFiltered.ele().checked = SRDotDX.config.importFiltered;
                    optsImportFiltered.on('click',function(){ SRDotDX.config.importFiltered = this.checked; SRDotDX.config.save(false) });

                    var optsShowFs = SRDotDX.gui.cHTML('#SRDotDX_options_showFS');
                    optsShowFs.ele().checked = SRDotDX.config.linkShowFs;
                    optsShowFs.on('click', function(){ SRDotDX.config.linkShowFs = this.checked; SRDotDX.config.save(false) });

                    var optsShowAp = SRDotDX.gui.cHTML('#SRDotDX_options_showAP');
                    optsShowAp.ele().checked = SRDotDX.config.linkShowAp;
                    optsShowAp.on('click', function(){ SRDotDX.config.linkShowAp = this.checked; SRDotDX.config.save(false) });

					var optsHideARaids = SRDotDX.gui.cHTML('#SRDotDX_options_hideRaidLinks');
                    var optsHideBRaids = SRDotDX.gui.cHTML('#SRDotDX_options_hideBotLinks');
					var optsHideVRaids = SRDotDX.gui.cHTML('#SRDotDX_options_hideVisitedRaids');
					var optsConfirmDeletes = SRDotDX.gui.cHTML('#SRDotDX_options_confirmWhenDeleting');
					var optsMarkImportedVisited = SRDotDX.gui.cHTML('#SRDotDX_options_markImportedRaidsVisited');
					var optsWhisperTo = SRDotDX.gui.cHTML('#SRDotDX_options_whisperTo');
					var optsMarkMyRaidsVisited = SRDotDX.gui.cHTML('#SRDotDX_options_markMyRaidsVisited');
					var optsFormatLinkOutput = SRDotDX.gui.cHTML('#SRDotDX_options_formatLinkOutput');
					var optsAutoImportPaste = SRDotDX.gui.cHTML('#SRDotDX_options_autoImportPaste');
					var optsConfirmForLargePaste = SRDotDX.gui.cHTML('#SRDotDX_options_confirmForLargePaste');
					var optsConfirmPasteSize = SRDotDX.gui.cHTML('#SRDotDX_options_confirmPasteSize');
					var rbUnvisitedPruningAggressive = SRDotDX.gui.cHTML('#FPX_options_unvisitedPruningAggressive');
					var rbUnvisitedPruningModerate = SRDotDX.gui.cHTML('#FPX_options_unvisitedPruningModerate');
					var rbUnvisitedPruningSlow = SRDotDX.gui.cHTML('#FPX_options_unvisitedPruningSlow');
					var rbUnvisitedPruningNone = SRDotDX.gui.cHTML('#FPX_options_unvisitedPruningNone');

                    var optsChatSizeNormal = SRDotDX.gui.cHTML('#SRDotDX_options_chatSizeNormal');
                    optsChatSizeNormal.on('click', function(){ SRDotDX.gui.chatResize(300) });
                    var optsChatSizePlus25 = SRDotDX.gui.cHTML('#SRDotDX_options_chatSizePlus25');
                    optsChatSizePlus25.on('click', function(){ SRDotDX.gui.chatResize(375) });
                    var optsChatSizePlus50 = SRDotDX.gui.cHTML('#SRDotDX_options_chatSizePlus50');
                    optsChatSizePlus50.on('click', function(){ SRDotDX.gui.chatResize(450) });
                    switch(SRDotDX.config.chatSize) {
                        case 300: optsChatSizeNormal.ele().checked = true; break;
                        case 375: optsChatSizePlus25.ele().checked = true; break;
                        case 450: optsChatSizePlus50.ele().checked = true; break;
                        default: optsChatSizeNormal.ele().checked = true; break;
                    }

                    var optsHideKongForum = SRDotDX.gui.cHTML('#options_hideKongForum');
                    optsHideKongForum.ele().checked = SRDotDX.config.hideKongForum;
                    optsHideKongForum.on('click', function(){ SRDotDX.config.hideKongForum = this.checked; SRDotDX.gui.cHTML('#DotDX_forum').html('div.game_page_wrap {padding-top: 16px; margin-top: 14px !important; background: #333 !important; display: ' + (SRDotDX.config.hideKongForum ? 'none' : 'block') + '}',true) });

                    var optsHideGameDetails = SRDotDX.gui.cHTML('#options_hideGameDetails');
                    optsHideGameDetails.ele().checked = SRDotDX.config.hideGameDetails;
                    optsHideGameDetails.on('click', function(){ SRDotDX.config.hideGameDetails = this.checked; SRDotDX.gui.cHTML('#DotDX_details').html('div.game_details_outer {margin-top: 14px !important; width: 900px !important; border: solid 20px #333 !important; display: ' + (SRDotDX.config.hideGameDetails ? 'none' : 'block') + '}',true) });

                    var optsHideGameTitle = SRDotDX.gui.cHTML('#options_hideGameTitle');
                    optsHideGameTitle.ele().checked = SRDotDX.config.hideGameTitle;
                    optsHideGameTitle.on('click', function(){ SRDotDX.config.hideGameTitle = this.checked });

                    var optsTrueMsgCount = SRDotDX.gui.cHTML('#options_trueMsgCount');
                    optsTrueMsgCount.ele().checked = SRDotDX.config.kongMsg;
                    optsTrueMsgCount.on('click', function(){ SRDotDX.config.kongMsg = this.checked });
                    if(SRDotDX.config.kongMsg) SRDotDX.gui.setMessagesCount();

                    //Opts -> Sidebar Options
                    var optsSbEnable = SRDotDX.gui.cHTML('#options_sbEnable');
                    optsSbEnable.ele().checked = SRDotDX.config.sbEnable;
                    optsSbEnable.on('click', function(){ SRDotDX.config.sbEnable = this.checked; SRDotDX.gui.applySidebarUI(this.checked?1:-1); SRDotDX.config.save(false) });

                    var optsSbRightSide = SRDotDX.gui.cHTML('#options_sbRightSide');
                    optsSbRightSide.ele().checked = SRDotDX.config.sbRightSide;
                    optsSbRightSide.on('click', function(){ SRDotDX.config.sbRightSide = this.checked; SRDotDX.gui.applySidebarUI(2); SRDotDX.config.save(false) });

                    var optsCbDisable = SRDotDX.gui.cHTML('#options_cbDisable');
                    optsCbDisable.ele().checked = SRDotDX.config.cbDisable;
                    optsCbDisable.on('click', function(){ SRDotDX.config.cbDisable = this.checked; SRDotDX.config.save(false) });

					if (SRDotDX.config.markMyRaidsVisted) { optsMarkMyRaidsVisited.ele().checked = true }
					if (SRDotDX.config.formatLinkOutput) { optsFormatLinkOutput.ele().checked = 'checked'; }
					if (SRDotDX.config.markImportedVisited) { optsMarkImportedVisited.ele().checked = 'checked'; }
					if (SRDotDX.config.whisperTo != '') { optsWhisperTo.ele().value = SRDotDX.config.whisperTo; }
					if (SRDotDX.config.autoImportPaste) { optsAutoImportPaste.ele().checked = 'checked'; } else { optsConfirmForLargePaste.ele().disabled=true; optsConfirmPasteSize.ele().disabled=true}
					if (SRDotDX.config.confirmForLargePaste) { optsConfirmForLargePaste.ele().checked = 'checked'; } else { optsConfirmPasteSize.ele().disabled=true }
					if (SRDotDX.config.confirmPasteSize>0) { optsConfirmPasteSize.ele().value = SRDotDX.config.confirmPasteSize }
					if (SRDotDX.config.confirmDeletes) { optsConfirmDeletes.ele().checked = 'checked' }
                    if (SRDotDX.config.bckColor) { SRDotDX.gui.cHTML('#SRDotDX_colors_background').ele().value = SRDotDX.config.bckColor }



					switch(SRDotDX.config.unvisitedRaidPruningMode) {
                        case 0: rbUnvisitedPruningAggressive.ele().checked = true; break;
                        case 1: rbUnvisitedPruningModerate.ele().checked = true; break;
                        case 2: rbUnvisitedPruningSlow.ele().checked = true; break;
                        case 3: rbUnvisitedPruningNone.ele().checked = true; break;
                        default: rbUnvisitedPruningAggressive.ele().checked = true; break;
                    }

					if (SRDotDX.config.hideVisitedRaids) {optsHideVRaids.ele().checked = 'checked'}
                    if (SRDotDX.config.hideBotLinks) { optsHideBRaids.ele().checked = 'checked' }
					if (SRDotDX.config.hideRaidLinks) {
						optsHideARaids.ele().checked = true;
						optsHideVRaids.ele().disabled = true;
                        optsHideBRaids.ele().disabled = true;
					}

					optsConfirmDeletes.ele().addEventListener('click', function () { SRDotDX.config.confirmDeletes = this.checked });
					optsAutoImportPaste.ele().addEventListener('click', function (){ SRDotDX.config.autoImportPaste = this.checked;
						if(!this.checked){ optsConfirmForLargePaste.ele().checked = false; SRDotDX.config.confirmForLargePaste = false }
						optsConfirmForLargePaste.ele().disabled = !this.checked;
						optsConfirmPasteSize.ele().disabled = !this.checked;
					});
					optsConfirmForLargePaste.ele().addEventListener('click', function () { optsConfirmPasteSize.ele().disabled = !this.checked; SRDotDX.config.confirmForLargePaste = this.checked });
					optsConfirmPasteSize.ele().addEventListener('change', function () { if(isNumber(this.value)) SRDotDX.config.confirmPasteSize = parseInt(this.value); else SRDotDX.gui.errorMessage('Paste size must be a number') });

					optsMarkImportedVisited.ele().addEventListener("click", function() { SRDotDX.config.markImportedVisited = this.checked; });


					optsWhisperTo.ele().addEventListener("change", function(){
						console.log("[SRDotDX] Whisper person changed to " + this.value);
						SRDotDX.config.whisperTo = this.value;
					});
                    SRDotDX.gui.cHTML('#SRDotDX_colors_background').ele().addEventListener("change", function(){
                        SRDotDX.config.bckColor = this.value;
                    });

					optsFormatLinkOutput.ele().addEventListener("click", function(){
						SRDotDX.config.formatLinkOutput = this.checked;
					});

					optsMarkMyRaidsVisited.ele().addEventListener("click", function() {
						SRDotDX.config.markMyRaidsVisted = this.checked;
					});
					optsHideARaids.ele().addEventListener("click",function() {
						document.getElementById('SRDotDX_options_hideVisitedRaids').disabled = this.checked;
						document.getElementById('SRDotDX_options_hideSeenRaids').disabled = this.checked;
						SRDotDX.config.hideRaidLinks = this.checked;
                        SRDotDX.gui.cHTML('#SRDotDX_raidClass').html('.SRDotDX_raid {display: ' + (this.checked ? 'none !important' : 'block') + '}', true);
					},true);
                    optsHideBRaids.ele().addEventListener("click",function() { SRDotDX.gui.switchBot('dotdx_chat_bot') },true);
					optsHideVRaids.ele().addEventListener("click",function() {
						SRDotDX.config.hideVisitedRaids = this.checked;
                        SRDotDX.gui.cHTML('#SRDotDX_visitedRaidClass').html('.SRDotDX_visitedRaid {display: ' + (this.checked ? 'none !important' : 'block') + '}', true);
					},true);

                    rbUnvisitedPruningAggressive.ele().addEventListener("click",function() { SRDotDX.config.unvisitedRaidPruningMode = 0 },true);
                    rbUnvisitedPruningModerate.ele().addEventListener("click",function() { SRDotDX.config.unvisitedRaidPruningMode = 1 },true);
                    rbUnvisitedPruningSlow.ele().addEventListener("click",function() { SRDotDX.config.unvisitedRaidPruningMode = 2 },true);
                    rbUnvisitedPruningNone.ele().addEventListener("click",function() { SRDotDX.config.unvisitedRaidPruningMode = 3 },true);

					//CHAT TAB CLICK SCROLL (id=chat_tab, class=chat_message_window)
					SRDotDX.gui.cHTML('#chat_tab').ele().addEventListener("click", function () {
						setTimeout(function(){
							var els = document.getElementsByClassName('chat_message_window'), el;
							i = els.length;
                            while (i--) {
								el = els[i]; console.log("[SRDotDX] Scrolling chat window " + el.scrollTop + " : " + el.scrollHeight);
								el.scrollTop = el.scrollHeight;
							}
                            SRDotDX.gui.selectRaidsToJoin();
						},50);
					},true);

                    //RAIDS TAB CLICK EVENT LISTENER
                    SRDotDX.gui.cHTML('#lots_tab').ele().addEventListener("click", function(){setTimeout(SRDotDX.gui.selectRaidsToJoin,50)},true);

                    //FriendShare
                    SRDotDX.gui.refreshFriends();

					// Filtering tab
                    var i = 0, isChecked, raid, parentTableId = '', parentTable = '';
                    while (i < SRDotDX.raidArray.length) {
                        raid = SRDotDX.raids[SRDotDX.raidArray[i]];
                        parentTableId = 'FPX_options_cbs_' + raid.id;
                        parentTable = SRDotDX.gui.cHTML('tr').set({id: parentTableId}).html(' \
								<td>' + raid.name + '</td> \
								<td><input type="checkbox" id="cb_filter_' + raid.id + '_0' + '"/><label for="cb_filter_' + raid.id + '_0' + '"></label></td> \
								<td><input type="checkbox" id="cb_filter_' + raid.id + '_1' + '"/><label for="cb_filter_' + raid.id + '_1' + '"></label></td> \
								<td><input type="checkbox" id="cb_filter_' + raid.id + '_2' + '"/><label for="cb_filter_' + raid.id + '_2' + '"></label></td> \
								<td><input type="checkbox" id="cb_filter_' + raid.id + '_3' + '"/><label for="cb_filter_' + raid.id + '_3' + '"></label></td> \
								<td><input type="checkbox" id="cb_filter_' + raid.id + '_all' + '"/><label for="cb_filter_' + raid.id + '_all' + '"></label></td>', false);

                        if (raid.stat == 'H') parentTable.attach('to','FPXRaidFilterWhatGuild');
                        else if (raid.stat == 'ESH') parentTable.attach('to','FPXRaidFilterWhatSpecial');
                        else if (raid.size > 1 && raid.size < 50) parentTable.attach('to','FPXRaidFilterWhatSmall');
                        else if (raid.size == 50) parentTable.attach('to','FPXRaidFilterWhatMedium');
                        else if (raid.size == 100) parentTable.attach('to','FPXRaidFilterWhatLarge');
                        else if (raid.size == 250) parentTable.attach('to','FPXRaidFilterWhatEpic');
                        else if (raid.size == 500) parentTable.attach('to','FPXRaidFilterWhatColossal');

                        for (var j=0; j<4; j++) {
                            var cbId = "cb_filter_" + raid.id + '_' + j; isChecked = !SRDotDX.config.filters[raid.id][j];
                            cb = SRDotDX.gui.cHTML('#' + cbId); cb.ele().checked = isChecked;
                            cb.ele().addEventListener("click",function() {
                                var raidId = '', diffIndex = '', reg = /cb_filter_([0-9a-z_]+)_([0-9])/i;
                                var ele = SRDotDX.gui.cHTML('#DotDX_filters').ele().innerHTML; i = reg.exec(this.id);
                                if (i != null) { raidId = i[1]; diffIndex = parseInt(i[2]) }
                                SRDotDX.config.setFilter(raidId,diffIndex,!this.checked);
                                reg = new RegExp('.DotDX_fltChat_'+raidId+'_'+diffIndex+', ','g');
                                if(SRDotDX.config.filterChatLinks) {
                                    if (!this.checked && !reg.test(ele)) ele = '.DotDX_fltChat_' + raidId + '_' + diffIndex + ', ' + ele;
                                    else if (this.checked) ele = ele.replace(reg,'');
                                }
                                reg = new RegExp('.DotDX_fltList_'+raidId+'_'+diffIndex+', ','g');
                                if(SRDotDX.config.filterRaidList) {
                                    if (!this.checked && !reg.test(ele)) ele = '.DotDX_fltList_' + raidId + '_' + diffIndex + ', ' + ele;
                                    else if (this.checked) ele = ele.replace(reg,'');
                                }
                                SRDotDX.gui.cHTML('#DotDX_filters').ele().innerHTML = ele;

                                var cbAllId = "cb_filter_" + raidId + '_all';

                                var f1 = SRDotDX.config.filters[raidId][0];
                                var f2 = SRDotDX.config.filters[raidId][1];
                                var f3 = SRDotDX.config.filters[raidId][2];
                                var f4 = SRDotDX.config.filters[raidId][3];

                                if ((!f1 && !f2 && !f3 && !f4) || (f1 && f2 && f3 && f4)) { var cb = SRDotDX.gui.cHTML('#' + cbAllId); cb.ele().checked = this.checked }
                            },true);
                        }
                        var allCbId = "cb_filter_" + raid.id + "_all";
                        isChecked = !(SRDotDX.config.filters[raid.id][0] && SRDotDX.config.filters[raid.id][1] && SRDotDX.config.filters[raid.id][2] && SRDotDX.config.filters[raid.id][3]);
                        var cb = SRDotDX.gui.cHTML('#' + allCbId); cb.ele().checked = isChecked;
                        cb.on("click",function() {
                            var reg = /cb_filter_([0-9a-z_]+)_all/i, i = reg.exec(this.id), raidId = '', j = 0, cbId, subcb, ele = SRDotDX.gui.cHTML('#DotDX_filters').ele().innerHTML;
                            if (i != null) raidId = i[1];
                            while (j < 4) {
                                cbId = 'cb_filter_' + raidId + '_' + j; subcb = SRDotDX.gui.cHTML('#' + cbId);
                                subcb.ele().checked = this.checked; SRDotDX.config.filters[raidId][j] = !this.checked;
                                reg = new RegExp('.DotDX_fltChat_'+raidId+'_'+j+', ','g');
                                if(SRDotDX.config.filterChatLinks) {
                                    if (!this.checked && !reg.test(ele)) ele = '.DotDX_fltChat_' + raidId + '_' + j + ', ' + ele;
                                    else if (this.checked) ele = ele.replace(reg,'');
                                }
                                reg = new RegExp('.DotDX_fltList_'+raidId+'_'+j+', ','g');
                                if(SRDotDX.config.filterRaidList) {
                                    if (!this.checked && !reg.test(ele)) ele = '.DotDX_fltList_' + raidId + '_' + j + ', ' + ele;
                                    else if (this.checked) ele = ele.replace(reg,'');
                                }
                                SRDotDX.gui.cHTML('#DotDX_filters').ele().innerHTML = ele; j++
                            }
                        },true); i++
                    }

                    var filterChatCb = SRDotDX.gui.cHTML('#SRDotDX_options_perRaidFilterLinks');
					filterChatCb.on("click", function() { SRDotDX.config.filterChatLinks = this.checked; SRDotDX.gui.toggleFiltering();},true).ele().checked = SRDotDX.config.filterChatLinks;

					var filterListCb = SRDotDX.gui.cHTML('#SRDotDX_options_perRaidFilterRaidList');
					filterListCb.on("click", function() { SRDotDX.config.filterRaidList = this.checked; SRDotDX.gui.toggleFiltering();},true).ele().checked = SRDotDX.config.filterRaidList;

					SRDotDX.gui.cHTML('li').set({class: 'rate'}).html('<a class="spritegame" href="http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons" onclick="SRDotDX.reload(); return false;">Reload Game</a>', false).attach('after','quicklinks_favorite_block');

                    //Chat buttons overlay div
                        document.getElementsByClassName('chat_message_window')[0].setAttribute('id','chat_message_window');
                        var hd = document.getElementById('chat_window_header').getElementsByClassName('room_name_container')[0].innerHTML;
                        document.getElementById('chat_window_header').getElementsByClassName('room_name_container')[0].innerHTML = hd + '<div class="dotdx_chat_overlay">DotDX: <span id="dotdx_chat_overlay"></span></div>';
                        //for (i=0; i<chatPane.length; i++) chatPane[i].style.height = '434px';
                    if (!SRDotDX.config.cbDisable) SRDotDX.gui.cHTML('div').set({class: 'dotdx_chat_buttons'}).html('<span id="dotdx_chat_join" class="dotdx_chat_button">Join</span><input onkeyup="SRDotDX.gui.updateFilterTxt(this.value)" class="dotdx_chat_filter" type="text" value="' + SRDotDX.config.chatFilterString + '"><span class="dotdx_chat_button" id="dotdx_chat_import">Import</span><span class="dotdx_chat_button" id="dotdx_chat_reload">Reload</span><span class="dotdx_chat_button dotdx_chat_bot_button' + (SRDotDX.config.hideBotLinks ? " active" : "") + '" id="dotdx_chat_bot">Bot</span>',true).attach("after",'chat_message_window');
                    //setTimeout(SRDotDX.gui.FPXFilterRaidListByName, 2500);
                    setTimeout(SRDotDX.gui.BeginDeletingExpiredUnvisitedRaids, 10000);
					//setTimeout(SRDotDX.purge, 20000);
                    SRDotDX.util.updateUser(true);
					console.log('[DotDX] DotDeXtension loading complete');
                    SRDotDX.gui.doStatusOutput('Loaded successfully', 2000, false);
                    setTimeout(SRDotDX.config.save, 2000);
				}
				else { setTimeout(SRDotDX.gui.load, 500)}
			},
            fsEleClick: function(e) {
                e = e || window.event;
                var el = e.target.id.split(':');
                if (el[0] == 'fs') {
                    SRDotDX.config.friendUsers[el[1]][el[2]] = e.target.checked;
                }
            },
            FPXraidLinkClick: function(id) {
                if(!SRDotDX.gui.joining) {
                    //SRDotDX.request.kongData = 'kongregate_username='+holodeck._active_user.username()+'&kongregate_user_id='+holodeck._active_user.id()+'&kongregate_game_auth_token='+holodeck._active_user.gameAuthToken();
                    SRDotDX.request.joinRaid(SRDotDX.config.raidList[id]);
                }
                else SRDotDX.gui.joinRaidList.push(SRDotDX.gui.GetRaid(id));
            },
			FPXLandButtonHandler: function (ele, name) {
                var x = name.charAt(name.length-1), sign = 1;
                if(name.charAt(3)!='p')sign=-1;
                document.FPXLandForm.elements["tf_"+x].value = parseInt(document.FPXLandForm.elements["tf_"+x].value, 10)+(10*sign);
                SRDotDX.gui.FPXLandUpdater();
            },
            FPXLandUpdater: function () {
                var owned = [0,0,0,0,0,0,0,0,0], els = document.FPXLandForm, i = 9;
                while (i--) owned[i] = parseInt(els.elements['tf_'+(i+1)].value,10);
                var ratio = FPX.LandCostRatio(owned), best = 0, cn; i = 9;
                while (i--) {
                    cn = document.getElementById('b_'+(i+1)).className;
					if (cn.indexOf('landpmbutton ') == -1) document.getElementById('b_'+(i+1)).className = cn.replace('landpmbuttonhigh','landpmbutton');
					//document.getElementById('b_'+(i+1)).prevClassName = 'landpmbutton';
                    if (ratio[i] > ratio[best]) best = i;
                }
				cn = document.getElementById('b_'+(best+1)).className;
                document.getElementById('b_'+(best+1)).className = cn.replace('landpmbutton','landpmbuttonhigh');
            },
            FPXLandButtonSave: function () {
                var els = document.FPXLandForm, i = 9;
                while (i--) SRDotDX.config.FPXLandOwnedCount[i] = els.elements['tf_'+(i+1)].value;
				SRDotDX.config.save(false);
                SRDotDX.gui.doStatusOutput('Land count saved!');
            },
			FPXraidListMouseDown: function(e) {
				e.preventDefault(); e.stopPropagation();
                var classtype = e.target.className, con; e = e || window.event;
				console.log("[SRDotDX] Clicked on el with class:" + classtype + ", mouse button:" + e.which);
				if (e.which == 1) {
                    switch (classtype) {
                        case 'dotdxRaidListDelete': SRDotDX.gui.deleteRaid(e.target.parentNode); break;
                        case 'DotDX_RaidLink': SRDotDX.gui.FPXraidLinkClick(e.target.parentNode.getAttribute("raidid")); break;
                    }
				}
			},
            userContextMenuClick: function(e) {
                e = e || window.event;
                if(e.which == 1 && e.target.tagName.toLowerCase() == 'span') {
                var initialClass = e.target.className.split(' ');
                var classTokens = initialClass[0].split('_');
                console.log('[DotDX] Chat menu click: user [' + initialClass[1] + '] action [' + classTokens[2]+']');
                    switch(classTokens[2]) {
                        case 'slap':
                            var num = Math.round((Math.random()*(SRDotDX.slapSentences.length-1)));
                            SRDotDX.gui.FPXdoWork('*' + SRDotDX.slapSentences[num].replace(/<nick>/g,initialClass[1]) + '*');
                            break;
                        case 'mute':
                            SRDotDX.config.mutedUsers[initialClass[1]] = true;
                            SRDotDX.config.save(false);
                            break;
                        case 'friend':
                            if (typeof SRDotDX.config.friendUsers[initialClass[1]] == 'object') delete SRDotDX.config.friendUsers[initialClass[1]];
                            else SRDotDX.config.friendUsers[initialClass[1]] = [false,false,false,false,true];
                            SRDotDX.config.save(false);
                            SRDotDX.gui.refreshFriends();
                            break;
                        case 'name':
                            holodeck.showMiniProfile(initialClass[1]);
                            break;
                    }
                    e.target.className = initialClass[0];
                    document.getElementById('dotdx_usercontext').style.display = 'none';
                }
            },
            userContextMenuOut: function(e) {
                var el = e.toElement || e.relatedTarget;
                if (el.parentNode == this || el == this) return;
                var cMenu = document.getElementById('dotdx_usercontext');
                for(var i=0; i<4; i++) cMenu.children[i].className = cMenu.children[i].className.split(' ')[0];
                document.getElementById('dotdx_usercontext').style.display = 'none';
            },
            chatWindowContextMenu: function (e) {
                e = e || window.event;
                var clickedClass = e.target.className.split(" "), nick = "";
                console.log('[DotDX] Chat window menu [' + e.target.className + ']');
                switch (clickedClass[0]) {
                    case 'username':
                        if (clickedClass[1] != 'spritesite') {
                            e.preventDefault(); e.stopPropagation();
                            nick = clickedClass[1];
                            console.log("[DotDX] Open context menu, nick [" + nick + "], coords [" + e.clientX + "," + e.clientY + "]");
                            var cMenu = document.getElementById('dotdx_usercontext');
                            var tPane = document.getElementById('chat_tab_pane').getBoundingClientRect();
                            cMenu.children[0].innerHTML = nick;
                            cMenu.children[1].innerHTML = SRDotDX.config.friendUsers[nick] ? 'unFriend' : 'Friend';
                            for(var i=0; i<4; i++) cMenu.children[i].className += " "+nick;
                            cMenu.style.top = e.clientY - tPane.top - 14 + 'px';
                            cMenu.style.left = e.clientX - tPane.left - 3  + 'px';
                            cMenu.style.display = 'block';
                            return false;
                        }
                        break;
                }
            },
            chatWindowMouseDown: function (e) {
                e = e || window.event;
                var clickedClass = e.target.className.split(" "), nick = "";
                console.log('[DotDX] Chat window (' + e.which + ') [' + e.target.className + ']');

                switch (clickedClass[0]) {
                    case 'username':
                        if (clickedClass[1] != 'spritesite') {
                            e.preventDefault(); e.stopPropagation();
                            nick = clickedClass[1];
                            if (e.which == 1) {
                                    console.log("[DotDX] Whisp to user with nick [" + nick + "]");
                                    holodeck.chatWindow().insertPrivateMessagePrefixFor(nick);
                            }
                        }
                        break;
                    case 'chatRaidLink':
                        if(e.which == 1) {
                            e.preventDefault(); e.stopPropagation();
                            var raid = clickedClass[1].split("|");
                            var rObj = {id:raid[0],hash:raid[1],boss:raid[2],diff:raid[3]};
                            if(!SRDotDX.gui.joining) {
                                //SRDotDX.request.kongData = 'kongregate_username='+holodeck._active_user.username()+'&kongregate_user_id='+holodeck._active_user.id()+'&kongregate_game_auth_token='+holodeck._active_user.gameAuthToken();
                                SRDotDX.request.joinRaid(rObj);
                            }
                            else SRDotDX.gui.joinRaidList.push(rObj);
                        }
                        break;
                    case 'dotdx_chat_button':
                        if(e.which == 1) {
                            switch(e.target.id) {
                                case 'dotdx_chat_join': SRDotDX.gui.joinSelectedRaids(true); break;
                                case 'dotdx_chat_import': SRDotDX.gui.importFromServer(); break;
                                case 'dotdx_chat_bot': SRDotDX.gui.switchBot(); break;
                                case 'dotdx_chat_reload': SRDotDX.reload(); break;
                            }
                        }
                }
            },
			FPXraidLinkMouseDown: function (e,param1,param2,isChat) {
				e = e || window.event;
				if(isChat && e.which == 1) SRDotDX.gui.FPXraidLinkClick(param1);
			},
			raidListItemUpdateTimeSince: function(id) {
				var raid = SRDotDX.config.raidList[id];
				if (typeof raid == 'object') document.getElementById('timeSince_' + id).innerHTML = timeSince(new Date(raid.timeStamp))
			},
			raidListItemUpdate: function(id) {
				var raid = SRDotDX.config.raidList[id];
				if (typeof raid == 'object') {
					var ele = document.getElementById("raid_list").firstChild;
					while (ele) {
						if (ele.getAttribute("raidid") == id) { ele.getElementsByClassName("DotDX_RaidListVisited")[0].innerHTML = (raid.visited ? '&#9733;':''); break; }
						ele = ele.nextSibling;
					}
				}
				else SRDotDX.gui.raidListItemRemoveById(id);
			},
			raidListItemRemoveById: function (id) {
				var ele = document.getElementById('DotDX_' + id);
				if (ele) ele.parentNode.removeChild(ele);
			},
			toggleCSS: function (p) {
				if (p) {
					document.head.removeChild(document.getElementById(p.id));
					SRDotDX.gui.cHTML("style").set({type: "text/css", id: p.id}).text(p.cls).attach("to",document.head);
				}
			},
			toggleRaid: function(type,id,tog) {
				var d = document.getElementsByClassName("DotDX_raidId_" + id);
				if (typeof SRDotDX.config.raidList[id] == 'object') {
					var raid = SRDotDX.config.raidList[id];
					raid = SRDotDX.getRaidDetails("&kv_difficulty="+raid.diff+"&kv_hash="+raid.hash+"&kv_raid_boss="+raid.boss+"&kv_raid_id="+raid.id);
				}
                var i = d.length;
				while (i--) {
					if (tog && d[i].className.indexOf('DotDX_' + type + 'Raid') < 0) d[i].className += ' DotDX_' + type + 'Raid';
					else if (!tog && d[i].className.indexOf('DotDX_' + type + 'Raid') >= 0) d[i].className = d[i].className.replace(new RegExp('DotDX_' + type + 'Raid( |$)','i'),'');
					if (typeof raid == 'object') d[i].getElementsByTagName('a')[0].innerHTML = raid.linkText();
				}
            }
		},
		nukeRaid: function (id) { if (SRDotDX.config.raidList[id]) { SRDotDX.config.raidList[id].nuked = true; SRDotDX.gui.toggleRaid('nuked', id, true) } },
        searchPatterns: {
            z1:           ['kobold','scorp','ogre'],
            z2:           ['rhino','alice','lurker'],
            z3:           ['4ogre','squid','batman','drag','tainted'],
            z4:           ['bmane','3dawg','hydra','sircai','tyranthius'],
            z5:           ['ironclad','zombiehorde','stein','bogstench','nalagarst'],
            z6:           ['gunnar','nidhogg','kang','ulfrik','kalaxia'],
            z7:           ['maraak','erakka_sak','wexxa','guilbert','bellarius'],
            z8:           ['hargamesh','grimsly','rift','sisters','mardachus'],
            z9:           ['mesyra','nimrod','phaedra','tenebra','valanazes'],
            'z1-9':       ['kobold','scorp','ogre','rhino','alice','lurker','4ogre','squid','batman','drag','tainted','bmane','3dawg','hydra','sircai','tyranthius','ironclad','zombiehorde','stein','bogstench','nalagarst','gunnar','nidhogg','kang','ulfrik','kalaxia','maraak','erakka_sak','wexxa','guilbert','bellarius','hargamesh','grimsly','rift','sisters','mardachus','mesyra','nimrod','phaedra','tenebra','valanazes'],
            'z9.5':       ['pumpkin','jacksrevenge1'],
            z10:          ['krugnug','tomb_gargoyle','leonine_watcher','centurion_marius','caracalla'],
            z14:          ['zugen','gulkinari','verkiteia','cannibal_barbarians'],
            farm:         ['maraak','erakka_sak','wexxa','guilbert','bellarius','drag','tainted','ogre','scorp','baroness'],
            flute:        ['kobold','scorp','ogre','rhino','alice','lurker','4ogre','squid','batman','drag','tainted','harpy','spider','djinn','evilgnome','basilisk','roc','gladiators','chimera','crabshark','gorgon','warewolfpack','blobmonster','giantgolem'],
            tower:        ['thaltherda','hurkus','malleus'],
            small:        ['kobold','rhino','bmane','4ogre','serpina','dragons_lair','gunnar','hargamesh','ironclad','krugnug','maraak','thaltherda','zugen'],
            medium:       ['alice','erakka_sak','grimsly','3dawg','scorp','nidhogg','tomb_gargoyle','squid','tisiphone','zombiehorde','baroness','hurkus','gulkinari'],
            large:        ['ogre','batman','hydra','kang','leonine_watcher','lurker','rift','stein','wexxa','teremarthu','zralkthalat','malleus','verkiteia'],
            epic:         ['bogstench','centurion_marius','drag','tainted','guilbert','pumpkin','jacksrevenge1','mesyra','nimrod','phaedra','sircai','sisters','ulfrik','frogmen_assassins','burbata','yydians_sanctuary','grundus'],
            colossal:     ['bellarius','caracalla','kalaxia','tyranthius','mardachus','nalagarst','tenebra','valanazes','siculus','ruzzik','cannibal_barbarians','vortex_abomination'],
            glyph:        ['maraak','erakka_sak','wexxa','guilbert','bellarius'],
            citadel:      ['thaltherda','hurkus','malleus','yydians_sanctuary'],
            aquatic:      ['dirthax','frogmen_assassins','lurker','nidhogg','crabshark','squid','thaltherda'],
            beastman:     ['bmane','burbata','frogmen_assassins','batman','war_boar','hargamesh','hurkus','krugnug','malleus','scorp','ruzzik','squid'],
            bludheim:     ['gunnar','nidhogg','kang','ulfrik','kalaxia'],
            colosseum:    ['gladiators','serpina','crabshark','tisiphone','chimera'],
            construct:    ['cedric','erakka_sak','giantgolem','leonine_watcher','tomb_gargoyle','stein','yydians_sanctuary'],
            demon:        ['apoc_demon','3dawg','tyranthius','lunacy','salome','sircai','blobmonster','malchar','zralkthalat'],
            dragon:       ['bellarius','corrupterebus','dragons_lair','echidna','drag','kalaxia','krykagrius','mardachus','mesyra','nalagarst','nimrod','phaedra','rhalmarius_the_despoiler','tainted','tenebra','thaltherda','tisiphone','grundus','valanazes','verkiteia','winter_kessov'],
            human:        ['agony','rhino','gladiators','baroness','warewolfpack','alice','cannibal_barbarians','guilbert','gunnar','pumpkin','jacksrevenge1','lunacy','slaughterers','ulfrik'],
            magical:      ['djinn','grimsly','hargamesh','fairy_prince','rift','sisters','vortex_abomination','grundus'],
            ogre:         ['ogre','4ogre','felendis','zugen'],
            qwiladrian:   ['gulkinari','teremarthu','vortex_abomination'],
            ryndor:       ['bmane','3dawg','hydra','sircai','tyranthius'],
            siege:        ['echidna','ulfrik','yydians_sanctuary'],
            undead:       ['agony','bogstench','serpina','ironclad','malleus','nalagarst','stein','siculus','zombiehorde','caracalla','centurion_marius'],
            underground:  ['maraak','erakka_sak','wexxa','guilbert','bellarius','spider','tomb_gargoyle','leonine_watcher','centurion_marius','caracalla','dragons_lair','kang','3dawg','lurker','salome','stein']
        },
        shortcuts: {
            bb:     { n: 'bb',        bn: 'BB',       desc: 'Briseis\' Blessing [magic]' },
            bok:    { n: 'bok',       bn: 'BoK',      desc: 'Book of Knowledge [consumable]' },
            bsi:    { n: 'bsi',       bn: 'BSI',      desc: 'Battle Strength Index<br>(Base Attack + Base Defense) / Level' },
            ck:     { n: 'ck',        bn: 'CK',       desc: 'Chryseis\' Kiss [magic]' },
            dah:    { n: 'dah',       bn: 'Dah',      desc: 'Dahrizon [general]' },
            dl:     { n: 'dl',        bn: 'DL',       desc: 'Dragons Lair [raid]' },
            gg:     { n: 'gg',        bn: 'GG',       desc: 'Golden Garden [equip]'},
            gid:    { n: 'gid',       bn: 'GID',      desc: 'Greater Impending Doom [magic]' },
            gl:     { n: 'gl',        bn: 'GL',       desc: 'Greenleaf [equip]'},
            il:     { n: 'il',        bn: 'IL',       desc: 'Insanity Laughs [magic]' },
            lsi:    { n: 'lsi',       bn: 'LSI',      desc: 'Leveling Speed Index<br>(Base Stamina * 2 + Base Energy) / Level' },
            mach:   { n: 'mach',      bn: 'Mach',     desc: 'Machaon the Healer [general]' },
            nm:     { n: 'nm',        bn: 'NM',       desc: 'Nightmare [difficulty]' },
            pc:     { n: 'pc',        bn: 'PC',       desc: 'Planet Coins [currency]' },
            perc:   { n: 'perc',      bn: 'perc',     desc: 'Perception [stat]' },
            qm:     { n: 'qm',        bn: 'QM',       desc: 'Quicken Mind [magic]' },
            sock:   { n: 'sock',      bn: 'SoCK',     desc: 'Sword of Conquered Kingdoms [equip]' },
            sor:    { n: 'sor',       bn: 'SoR',      desc: 'Shield of Ryndor [equip]' },
            sp:     { n: 'sp',        bn: 'SP',       desc: 'Stat Points [stat]' },
            wr:     { n: 'wr',        bn: 'WR',       desc: 'World Raid [raid]' }
        },
        raids: {
			agony:              {name: 'Agony',                     shortname: 'Agony',         id: 'agony',                    type: 'Undead, Human',      stat: 'H', size:101, duration:168, health: [700000000,875000000,1120000000,1400000000,0,0]},
            apoc_demon:         {name: 'Apocolocyntosised Demon',   shortname: 'Apoc',          id: 'apoc_demon',               type: 'Demon',              stat: 'H', size:50, duration:144, health: [500000000,750000000,1000000000,2000000000,0,0], lt: ['apoc','apoc','apoc','apoc']},
            djinn:              {name: 'Al-Azab',                   shortname: 'Al-Azab',       id: 'djinn',                    type: 'Magical Creature',   stat: 'H', size:100, duration:168, health: [55000000,68750000,88000000,110000000,0,0]},
			spider:             {name: 'Arachna',                   shortname: 'Arachna',       id: 'spider',                   type: 'Underground',        stat: 'H', size:50, duration:144, health: [22000000,27500000,35200000,44000000,0,0]},
			rhino:              {name: 'Ataxes',                    shortname: 'Ataxes',        id: 'rhino',                    type: 'Human',              stat: 'S', size:10, duration:120, health: [2000000,2500000,3200000,4000000,0,0]},
			gladiators:         {name: 'Batiatus Gladiators ',      shortname: 'Gladiators ',   id: 'gladiators',               type: 'Colosseum, Human',   stat: 'H', size:10, duration:120, health: [12000000,15000000,19200000,24000000,0,0]},
			bellarius:          {name: 'Bellarius the Guardian',    shortname: 'Bella',         id: 'bellarius',                type: 'Dragon, Underground',stat: 'S', size:500, duration:96, health: [900000000,1125000000,1440000000,1800000000,0,0]},
			baroness:           {name: 'The Baroness',              shortname: 'Baroness',      id: 'baroness',                 type: 'Human',              stat: 'S', size:50, duration: 60, health: [68000000,85000000,108800000,136000000,0,0]},
			werewolfpack:       {name: 'The Black Moon Pack',       shortname: 'Black Moon',    id: 'werewolfpack',             type: 'Human',              stat: 'H', size:50, duration:144, health: [135000000,168750000,216000000,270000000,0,0]},
			alice:              {name: 'Bloody Alice',              shortname: 'Alice',         id: 'alice',                    type: 'Human',              stat: 'S', size:50, duration:120, health: [15000000,18750000,24000000,30000000,0,0]},
			bogstench:          {name: 'Bogstench',                 shortname: 'Bog',           id: 'bogstench',                type: 'Undead',             stat: 'S', size:250, duration:96, health: [450000000,562500000,720000000,900000000,0,0]},
			'4ogre':            {name: 'Briareus the Butcher',      shortname: 'Briareus',      id: '4ogre',                    type: 'Ogre',               stat: 'S', size:10, duration:72, health: [4500000,5625000,7200000,9000000,0,0]},
			bmane:              {name: 'Bloodmane',                 shortname: 'Bmane',         id: 'bmane',                    type: 'Beastman, Ryndor',   stat: 'S', size:10, duration:72, health: [7000000,8750000,11200000,14000000,0,0]},
            burbata:            {name: 'Burbata the Spine-Crusher', shortname: 'Burbata',       id: 'burbata',                  type: 'Beastman',           stat: 'S', size:250, duration:96, health: [1000000000,2000000000,3500000000,5000000000,0,0], lt: ['z10','z10','z10','z10']},
            cannibal_barbarians:{name: 'Cannibal Barbarians',       shortname: 'Cannibals',     id: 'cannibal_barbarians',      type: 'Human',              stat: 'S', size:500, duration:128, health: [60000000000,90000000000,180000000000,240000000000,0,0], lt: ['canib','canib','canib','canib']},
            cedric:             {name: 'Cedric the Smashable',      shortname: 'Cedric',        id: 'cedric',                   type: 'Construct',          stat: 'ESH', size:90000, duration:24, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
            caracalla:          {name: 'Caracalla',                 shortname: 'Cara',          id: 'caracalla',                type: 'Undead, Underground',stat: 'S', size:500, duration:128, health: [50000000000,75000000000,150000000000,200000000000,0,0], lt: ['cara','cara','cara','cara']},
			harpy:              {name: 'Celeano',                   shortname: 'Cel',           id: 'harpy',                    type: '',                   stat: 'H', size:10, duration:120, health: [3000000,3750000,4800000,6000000,0,0]},
			centurion_marius:   {name: 'Centurion Marius',          shortname: 'Marius',        id: 'centurion_marius',         type: 'Undead, Underground',stat: 'S', size:250, duration:96, health: [10000000000,12000000000,16000000000,40000000000,0,0], lt: ['z10','z10','z10','z10']},
			kobold:             {name: 'Chieftain Horgrak',         shortname: 'Horgrak',       id: 'kobold',                   type: '',                   stat: 'S', size:10, duration:168, health: [150000,187500,240000,300000,0,0]},
			corrupterebus:      {name: 'Corrupted Erebus',          shortname: 'Cbus',          id: 'corrupterebus',            type: 'Dragon',             stat: 'ESH', size:90000, duration:96, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			serpina:            {name: 'Countess Serpina',          shortname: 'Serp',          id: 'serpina',                  type: 'Colosseum, Undead',  stat: 'E', size:15, duration:5, health: [75000000,112500000,150000000,187500000,0,0]},
			basilisk:           {name: 'Deathglare',                shortname: 'Deathglare',    id: 'basilisk',                 type: '',                   stat: 'H', size:50, duration:144, health: [45000000,56250000,72000000,90000000,0,0]},
			dirthax:            {name: 'Dirthax',                   shortname: 'Dirthax',       id: 'dirthax',                  type: 'Aquatic',            stat: 'H', size:100, duration:168, health: [550000000,687500000,880000000,1100000000,0,0]},
			dragons_lair:       {name: 'Dragons Lair',              shortname: 'Lair',          id: 'dragons_lair',             type: 'Dragon, Underground',stat: 'S', size:13, duration:5, health: [100000000,500000000,1000000000,1500000000,0,0], lt: ['nDl','hDl','lDl','nmDl']},
			echidna:            {name: 'Echidna',                   shortname: 'Echidna',       id: 'echidna',                  type: 'Dragon, Siege',      stat: 'ESH', size:90000, duration:96, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			erakka_sak:         {name: 'Erakka-Sak',                shortname: 'Erakka',        id: 'erakka_sak',            type: 'Underground, Construct',stat: 'S', size:50, duration:60, health: [62000000,77500000,99200000,124000000,0,0]},
			giantgolem:         {name: 'Euphronios',                shortname: 'Euphronios',    id: 'giantgolem',               type: 'Construct',          stat: 'H', size:101, duration:168, health: [450000000,562500000,720000000,900000000,0,0]},
			echthros:           {name: 'Echthros',                  shortname: 'Echthros',      id: 'echthros',                 type: '',                   stat: 'ESH', size:90000, duration:96, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			drag:               {name: 'Erebus the Black',          shortname: 'Ereb',          id: 'drag',                     type: 'Dragon',             stat: 'S', size:250, duration:168, health: [150000000,187500000,240000000,300000000,0,0]},
            frogmen_assassins:  {name: 'Frog-Men Assassins',        shortname: 'Froggy',        id: 'frogmen_assassins',        type: 'Beastman, Aquatic',  stat: 'S', size:250, duration:96, health: [16000000000,24000000000,32000000000,64000000000,0,0], lt: ['cara','cara','cara','cara']},
            felendis:           {name: 'Banhammer Brothers',        shortname: 'Felendis',      id: 'felendis',                 type: 'Ogre',               stat: 'H', size:100, duration:168, health: [441823718,549238221,707842125,888007007,0,0]},
			ogre:               {name: 'General Grune',             shortname: 'Grune',         id: 'ogre',                     type: 'Ogre',               stat: 'S', size:100, duration:172, health: [20000000,25000000,32000000,40000000,0,0]},
			dreadbloom:         {name: 'Giant Dreadbloom',          shortname: 'Dreadbloom',    id: 'dreadbloom',               type: '',                   stat: 'H', size:101, duration:192, health: [900000000,1125000000,1440000000,1800000000,0,0]},
			batman:             {name: 'Gravlok the Night-Hunter',  shortname: 'Grav',          id: 'batman',                   type: 'Beastman',           stat: 'S', size:100, duration:72, health: [50000000,62500000,80000000,100000000,0,0]},
			evilgnome:          {name: 'Groblar Deathcap',          shortname: 'Groblar',       id: 'evilgnome',                type: '',                   stat: 'H', size:10, duration:120, health: [6000000,7500000,9600000,12000000,0,0]},
			grundus:            {name: 'Grundus',                   shortname: 'Grundus',       id: 'grundus',             type: 'Dragon, Magical Creature',stat: 'H', size:101, duration:72, health: [800000000,1600000000,4000000000,12000000000]},
            guilbert:           {name: 'Guilbert the Mad',          shortname: 'Guil',          id: 'guilbert',                 type: 'Underground, Human', stat: 'S', size:250, duration:96, health: [550000000,687500000,880000000,1100000000,0,0]},
            gulkinari:          {name: 'Gulkinari',                 shortname: 'Gulkinari',     id: 'gulkinari',                type: 'Qwiladrian',         stat: 'S', size:50, duration:60, health: [7500000000,9375000000,12000000000,15000000000,0,0], lt: ['gulk','gulk','gulk','gulk']},
            gunnar:             {name: 'Gunnar the Berserk',        shortname: 'Gunnar',        id: 'gunnar',                   type: 'Bludheim, Human',    stat: 'S', size:10, duration:48, health: [12000000,15000000,19200000,24000000,0,0]},
			war_boar:           {name: 'Hammer',                    shortname: 'Hammer',        id: 'war_boar',                 type: 'Beastman',           stat: 'H', size:50, duration:144, health: [220000000,275000000,352000000,440000000,0,0]},
			hargamesh:          {name: 'Hargamesh',                 shortname: 'Hargamesh',     id: 'hargamesh',         type: 'Beastman, Magical Creature',stat: 'S', size:10, duration:48, health: [18000000,22500000,28800000,36000000,0,0]},
			grimsly:            {name: 'Headmaster Grimsly',        shortname: 'Grimsly',       id: 'grimsly',                  type: 'Magical Creature',   stat: 'S', size:50, duration:60, health: [72000000,90000000,115200000,144000000,0,0]},
			hurkus:             {name: 'Hurkus the Eviscerator',    shortname: 'Hurk',          id: 'hurkus',                   type: 'Beastman',           stat: 'S', size:50, duration:60, health: [2812500000,4218750000,5625000000,11250000000,0,0], lt: ['hurk','hurk','hurk','hurk']},
            hydra:              {name: 'Hydra',                     shortname: 'Hydra',         id: 'hydra',                    type: 'Ryndor',             stat: 'S', size:100, duration:72, health: [65000000,81250000,104000000,130000000,0,0]},
			ironclad:           {name: 'Ironclad',                  shortname: 'Ironclad',      id: 'ironclad',                 type: 'Undead',             stat: 'S', size:10, duration:48, health: [10000000,12500000,16000000,20000000,0,0]}, //0.5/0.625/0.8/1
            pumpkin:            {name: 'Jack',                      shortname: 'Jack',          id: 'pumpkin',                  type: 'Human',              stat: 'S', size: 250, duration:48 , health: [1000000000,1500000000,2000000000,3000000000], lt: ['njack','hjack','ljack','nmjack']},
			jacksrevenge1:      {name: 'Jack\'s Revenge',           shortname: 'Revenge',       id: 'jacksrevenge1',            type: 'Human',              stat: 'S', size: 250, duration:48 , health: [5000000000,7500000000,10000000000,15000000000], lt: ['njr','hjr','ljr','nmjr']},
			kang:               {name: 'Kang-Gsod',                 shortname: 'Kang',          id: 'kang',                  type: 'Bludheim, Underground', stat: 'S', size:100, duration:72, health: [95000000,118750000,152000000,190000000,0,0]},
			'3dawg':            {name: 'Kerberos',                  shortname: 'Kerb',          id: '3dawg',            type: 'Demon, Underground, Ryndor', stat: 'S', size:50, duration:72, health: [35000000,43750000,56000000,70000000,0,0]},
			kessovtowers:       {name: 'Kessov Towers',             shortname: 'Towers',        id: 'kessovtowers',             type: 'Siege',              stat: 'ESH', size:90000, duration:120, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			kessovtower:        {name: 'Treachery and the Tower',   shortname: 'Treachery',     id: 'kessovtower',              type: 'Siege',              stat: 'ESH', size:90000, duration:24, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			kessovforts:        {name: 'Kessov Forts',              shortname: 'Forts',         id: 'kessovforts',              type: 'Siege',              stat: 'ESH', size:90000, duration:120, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			kessovcastle:       {name: 'Kessov Castle',             shortname: 'Castle',        id: 'kessovcastle',             type: 'Siege',              stat: 'ESH', size:90000, duration:144, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			kalaxia:            {name: 'Kalaxia the Far-Seer',      shortname: 'Kala',          id: 'kalaxia',                  type: 'Dragon, Bludheim',   stat: 'S', size:500, duration:96, health: [800000000,1000000000,1280000000,1600000000,0,0]},
			krugnug:            {name: 'Krugnug',                   shortname: 'Krug',          id: 'krugnug',                  type: 'Beastman',           stat: 'S', size:25, duration:48, health: [1000000000,1500000000,2000000000,4000000000,0,0], lt: ['z10','z10','z10','z10']},
			krykagrius:         {name: 'Krykagrius',                shortname: 'Kryk',          id: 'krykagrius',               type: 'Dragon',             stat: 'ESH', size:90000, duration:72, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			leonine_watcher:    {name: 'Leonine',                   shortname: 'Leo',           id: 'leonine_watcher',       type: 'Underground, Construct',stat: 'S', size:100, duration:48, health: [4000000000,6000000000,8000000000,16000000000,0,0], lt: ['z10','z10','z10','z10']},
			tyranthius:         {name: 'Lord Tyranthius',           shortname: 'Tyr',           id: 'tyranthius',               type: 'Demon, Ryndor',      stat: 'S', size:500, duration:168, health: [600000000,750000000,960000000,1200000000,0,0]},
			lunacy:             {name: 'Lunatics',                  shortname: 'Lunatics',      id: 'lunacy',                   type: 'Demon, Human',       stat: 'H', size:50, duration:144, health: [180000000,225000000,288000000,360000000,0,0]},
			lurker:             {name: 'Lurking Horror',            shortname: 'Lurking',       id: 'lurker',                  type: 'Underground, Aquatic',stat: 'S', size:100, duration:120, health: [35000000,43750000,56000000,70000000,0,0]},
            malleus:			{name: 'Malleus Vivorum',			shortname: 'Malleus',	    id: 'malleus',                  type: 'Beastman, Undead',   stat: 'S', size:100, duration:72, health: [8000000000,12000000000,16000000000,20000000000,0,0], lt: ['mall','mall','mall','mall']},
            maraak:             {name: 'Maraak the Impaler',        shortname: 'Maraak',        id: 'maraak',                   type: 'Underground',        stat: 'S', size:10, duration:48, health: [15000000,18750000,24000000,30000000,0,0]},
			mardachus:          {name: 'Mardachus the Destroyer',   shortname: 'Mard',          id: 'mardachus',                type: 'Dragon',             stat: 'S', size:500, duration:96, health: [1100000000,1375000000,1760000000,2200000000,0,0]},
			scorp:              {name: 'Mazalu',                    shortname: 'Mazalu',        id: 'scorp',                    type: 'Beastman',           stat: 'S', size:50, duration:168, health: [5000000,6250000,8000000,10000000,0,0]},
			mesyra:             {name: 'Mesyra the Watcher',        shortname: 'Mesyra',        id: 'mesyra',                   type: 'Dragon',             stat: 'S', size:250, duration:96, health: [1000000000,1250000000,1600000000,2000000000,0,0]},
			nalagarst:          {name: 'Nalagarst',                 shortname: 'Nala',          id: 'nalagarst',                type: 'Dragon, Undead',     stat: 'S', size:500, duration:98, health: [700000000,875000000,1120000000,1400000000,0,0]},
			nidhogg:            {name: 'Nidhogg',                   shortname: 'Nidhogg',       id: 'nidhogg',                  type: 'Bludheim, Aquatic',  stat: 'S', size:50, duration:60, health: [52000000,65000000,83200000,104000000,0,0]},
			nimrod:             {name: 'Nimrod the Hunter',         shortname: 'Nimrod',        id: 'nimrod',                   type: 'Dragon',             stat: 'S', size:250, duration:96, health: [1200000000,1500000000,1920000000,2400000000,0,0]},
			phaedra:            {name: 'Phaedra the Deceiver',      shortname: 'Phaedra',       id: 'phaedra',                  type: 'Dragon',             stat: 'S', size:250, duration:96, health: [1400000000,1750000000,2240000000,2800000000,0,0]},
			fairy_prince:       {name: 'Prince Obyron',             shortname: 'Obyron',        id: 'fairy_prince',             type: 'Magical Creature',   stat: 'H', size:10, duration:120, health: [30000000,37500000,48000000,60000000,0,0]},
			roc:                {name: 'Ragetalon',                 shortname: 'Ragetalon',     id: 'roc',                      type: '',                   stat: 'H', size:100, duration:168, health: [110000000,137500000,176000000,220000000,0,0]},
       rhalmarius_the_despoiler:{name: 'Rhalmarius the Despoiler',  shortname: 'Rhal',          id: 'rhalmarius_the_despoiler', type: 'Dragon',             stat: 'H', size:100, duration:84, health: [500000000,1250000000,3125000000,7812500000,0,0]},
			tomb_gargoyle:      {name: 'Riddler Gargoyle',          shortname: 'Riddler',       id: 'tomb_gargoyle',         type: 'Underground, Construct',stat: 'S', size:50, duration:48, health: [2000000000,3000000000,4000000000,8000000000,0,0], lt: ['z10','z10','z10','z10']},
			rift:               {name: 'Rift the Mauler',           shortname: 'Rift',          id: 'rift',                     type: 'Magical Creature',   stat: 'S', size:100, duration:72, health: [125000000,156250000,200000000,250000000,0,0]},
            ruzzik:             {name: 'Ruzzik the Slayer',         shortname: 'Ruzzik',        id: 'ruzzik',                   type: 'Beastman',           stat: 'S', size:500, duration:128, health: [55000000000,82500000000,165000000000,220000000000,0,0], lt: ['ruzz','ruzz','ruzz','ruzz']},
            salome:             {name: 'Salome the Seductress',     shortname: 'Salome',        id: 'salome',                   type: 'Demon, Underground', stat: 'H', size:100, duration:48, health: [666000000,832500000,1065600000,1332000000,0,0], lt: ['nSlut','hSlut','lSlut','nmSlut']},
            crabshark:          {name: 'Scuttlegore',               shortname: 'Scuttle',       id: 'crabshark',                type: 'Colosseum, Aquatic', stat: 'H', size:100, duration:168, health: [220000000,275000000,352000000,440000000,0,0]},
			squid:              {name: 'Scylla',                    shortname: 'Scylla',        id: 'squid',                    type: 'Beastman, Aquatic',  stat: 'S', size:50, duration:72, health: [25000000,31250000,40000000,50000000,0,0]},
			sircai:             {name: 'Sir Cai',                   shortname: 'Cai',           id: 'sircai',                   type: 'Demon, Ryndor',      stat: 'S', size:250, duration:168, health: [350000000,437500000,560000000,700000000,0,0]},
			sisters:            {name: 'Sisters of the Song',       shortname: 'Sisters',       id: 'sisters',                  type: 'Magical Creature',   stat: 'S', size:250, duration:96, health: [600000000,750000000,960000000,1200000000,0,0]},
			slaughterers:       {name: 'Slaughterers Six',          shortname: 'Slaughterers',  id: 'slaughterers',             type: 'Human',              stat: 'H', size:10, duration:120, health: [24000000,30000000,38400000,48000000,0,0]},
			stein:              {name: 'Stein',                     shortname: 'Stein',         id: 'stein',         type: 'Undead, Underground, Construct',stat: 'S', size:100, duration:72, health: [80000000,100000000,128000000,160000000,0,0]},
            siculus:            {name: 'Count Siculus\' Phantom',   shortname: 'Siculus',       id: 'siculus',                  type: 'Undead',             stat: 'S', size:500, duration:128, health: [850000000,1700000000,2975000000,4250000000,0,0], lt: ['sic','sic','sic','sic']},
            tainted:            {name: 'Tainted Erebus',            shortname: 'Tainted',       id: 'tainted',                  type: 'Dragon',             stat: 'S', size:250, duration:168, health: [250000000,312500000,400000000,500000000,0,0]},
			tenebra:            {name: 'Tenebra Shadow Mistress',   shortname: 'Tenebra',       id: 'tenebra',                  type: 'Dragon',             stat: 'S', size:500, duration:128, health: [2000000000,2500000000,3200000000,4000000000,0,0]},
            thaltherda:         {name: 'Thaltherda the Sea-Slitherer',shortname:'Nessie',		id: 'thaltherda',               type: 'Aquatic, Dragon',	stat: 'S', size:25,	 duration:48, health: [3000000000,4500000000,6000000000,7500000000,0,0], lt: ['nessy','nessy','nessy','nessy']},
            tisiphone:          {name: 'Tisiphone the Vengeful',    shortname: 'Tisi',          id: 'tisiphone',                type: 'Dragon, Colosseum',  stat: 'E', size:50, duration:12, health: [500000000,2500000000,5000000000,7500000000,0,0], lt: ['nTisi','hTisi','lTisi','nmTisi']},
			teremarthu:         {name: 'Teremarthu',                shortname: 'Cthullu',       id: 'teremarthu',               type: 'Qwiladrian',         stat: 'S', size:100, duration:48, health: [6000000000,9000000000,12000000000,24000000000,0,0], lt: ['z10','z10','z10','z10']},
            chimera:            {name: 'Tetrarchos',                shortname: 'Tetrarchos',    id: 'chimera',                  type: 'Colosseum',          stat: 'H', size:50, duration:144, health: [90000000,112500000,144000000,180000000,0,0]},
			gorgon:             {name: 'Tithrasia',                 shortname: 'Tithrasia',     id: 'gorgon',                   type: '',                   stat: 'H', size:10, duration:120, health: [18000000,22500000,28800000,36000000,0,0]},
			ulfrik:             {name: 'Ulfrik',                    shortname: 'Ulfrik',        id: 'ulfrik',                type: 'Bludheim, Siege, Human',stat: 'S', size:250, duration:96, health: [500000000,625000000,800000000,1000000000,0,0]},
			valanazes:          {name: 'Valanazes the Gold',        shortname: 'Vala',          id: 'valanazes',                type: 'Dragon',             stat: 'S', size:500, duration:128, health: [2400000000,3000000000,3840000000,4800000000,0,0]},
			blobmonster:        {name: 'Varlachleth',               shortname: 'Varla',         id: 'blobmonster',              type: 'Demon',              stat: 'H', size:100, duration:168, health: [330000000,412500000,528000000,660000000,0,0]},
            verkiteia:          {name: 'Verkiteia',                 shortname: 'Verkiteia',     id: 'verkiteia',                type: 'Dragon',             stat: 'S', size:100, duration:72, health: [11250000000,14062500000,18000000000,22500000000,0,0], lt: ['verk','verk','verk','verk']},
            vortex_abomination: {name: 'Vortex Abomination',        shortname: 'Vortex',     id: 'vortex_abomination',type: 'Qwiladrian, Magical Creature', stat: 'S', size:500, duration:128, health: [50000000000,75000000000,110000000000,205000000000,0,0], lt: ['vort','vort','vort','vort']},
            zugen:              {name: 'Warlord Zugen',             shortname: 'Zugen',         id: 'zugen',                    type: 'Ogre',               stat: 'S', size:25, duration:48, health: [4000000000,6000000000,8000000000,10000000000,0,0], lt: ['zugen','zugen','zugen','zugen']},
            wexxa:              {name: 'Wexxa the Worm-Tamer',      shortname: 'Wexxa',         id: 'wexxa',                    type: 'Underground',        stat: 'S', size:100, duration:72, health: [110000000,137500000,176000000,220000000,0,0]},
			winter_kessov:      {name: 'Blood Will Run Cold',       shortname: 'Cold Blood',    id: 'winter_kessov',            type: 'Dragon, Siege',      stat: 'ESH', size:90000, duration:290, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			xessus:             {name: 'Xessus of the Grim Wood',   shortname: 'Xessus',        id: 'xessus',                   type: '',                   stat: 'H', size:100, duration:48, health: [500000000,625000000,800000000,1000000000,0,0], lt: ['nIns','hIns','lIns','nmIns']},
            malchar:            {name: 'Malchar the Tri-Eyed',      shortname: 'Malchar',       id: 'malchar',                  type: 'Demon',              stat: 'H', size:100, duration:48, health: [500000000,625000000,800000000,1000000000,0,0], lt: ['nIns','hIns','lIns','nmIns']},
            krasgore:           {name: 'Krasgore',                  shortname: 'Krasgore',      id: 'krasgore',                 type: '',                   stat: 'H', size:100, duration:48, health: [500000000,625000000,800000000,1000000000,0,0], lt: ['nIns','hIns','lIns','nmIns']},
            nrlux:              {name: 'N\'rlux the Devourer',      shortname: 'N\'rlux',       id: 'nrlux',                    type: 'Giant Insect',       stat: 'H', size:100, duration:48, health: [10000000000,12500000000,16000000000,20000000000,0,0], lt: ['lux','lux','lux','lux']},
            yydians_sanctuary:  {name: 'Yydian\'s Sanctuary',       shortname: 'Yydians',       id: 'yydians_sanctuary',        type: 'Siege, Construct',   stat: 'S', size:250, duration:96, health: [0,0,0,50000000000,0,0], lt: ['yyd','yyd','yyd','yyd']},
            zombiehorde:        {name: 'Zombie Horde',              shortname: 'Zombies',       id: 'zombiehorde',              type: 'Undead',             stat: 'S', size:50, duration:60, health: [45000000,56250000,72000000,90000000,0,0]},
            zralkthalat:        {name: 'Z\'ralk\'thalat',           shortname: 'Zral',          id: 'zralkthalat',              type: 'Demon',              stat: 'S', size:100, duration:72, health: [8750000000,13125000000,17500000000,35000000000,0,0], lt: ['z10','z10','z10','z10']}
		},

		raidSizes: {
			10: { name: 'Small',    visible: 'Yes', ratios: [0.6,0.9,1.2,1.6,2.5,3.5], enames: ['1E6T','1E8T','2E','2/3E','3E','3/4E'], pruneTimers: [900,3600,7200]}, // 1h, 2h, 3h
			13: { name: 'Small',    visible: 'Yes', pruneTimers: [1800,3600,7200]},  // 1h, 2h, 2h
			15: { name: 'Small',    visible: 'Yes', pruneTimers: [1800,3600,3600]}, // Serpina only, so 5h/5h/5h
            25: { name: 'Small',    visible: 'Yes', ratios: [0.6,0.9,1.2,1.6,2.5,3.5], enames: ['1E6T','1E8T','2E','2/3E','3E','3/4E'], pruneTimers: [18000,18000,18000]},
			50: { name: 'Medium',   visible: 'Yes', ratios: [0.7,0.95,2.05,3.125,6.75,8.5], enames: ['1E6T','1E8T','2E','2/3E','3E','3/4E'], pruneTimers: [3600,7200,10800]}, // 1h, 2h, 3h
			100:{ name: 'Large',    visible: 'Yes', ratios: [0.9,1.5,2.2,3.2,6.5,9.0], enames: ['1E6T','1E8T','2E','2/3E','3E','3/4E'], pruneTimers: [7200,43200,86400]}, // 4h, 12h, 36h
            101:{ name: 'Epic',     visible: 'Yes', ratios: [0.225,0.325,0.625,1.775,4.525,10.25], enames: ['1E6T','1E8T','2E','2/3E','3E','3/4E'], pruneTimers: [21600,86400,259200]}, // 24h, 48h, 72h
			250:{ name: 'Epic',     visible: 'Yes', ratios: [0.225,0.325,0.625,1.775,4.525,10.25], enames: ['1E6T','1E8T','2E','2/3E','3E','3/4E'], pruneTimers: [21600,86400,259200]}, // 24h, 48h, 72h
			500:{ name: 'Colossal', visible: 'Yes', ratios: [0.45,0,0.65,1.25,2.5,9.0], enames: ['1E6T','1E8T','2E','2/3E','3E','3/4E'], pruneTimers: [43200,172800,259200]}, // 24h, 48h, 72h
          90000:{ name: 'World',    visible: 'Yes', ratios: [0,0,0,0,0,0], pruneTimers: [86400,86400,86400]} // 24h, 48h, 72h
		},
        //http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons?kv_action_type=raidhelp&kv_raid_id=4462809&kv_difficulty=4&kv_raid_boss=teremarthu&kv_hash=4LBo608xg9
        lootTiers: {
            apoc:   { tiers: ['12.00m','24.00m','36.00m','40.00m','60.00m','80.00m','100.0m','120.0m','140.0m','160.0m','180.0m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            cara:   { tiers: ['400.0m','500.0m','600.0m','700.0m','800.0m','900.0m','1.000b','1.250b','1.500b','1.750b','2.000b','2.250b','2.500b','2.750b','3.000b'], epics: [10,11,12,13,14,15,16,20,24,28,32,36,40,44,48], best: 0 },
            zugen:  { tiers: ['120.0m','180.0m','225.0m','240.0m','300.0m','400.0m','750.0m','1.000b','1.500b'], epics: [8,9,1,11,14,16,19,23,33], best: 4},
            gulk:   { tiers: ['90.00m','135.0m','150.0m','180.0m','225.0m','300.0m','550.0m','900.0m','1.500b'], epics: [2,5,7,9,11,15,18,22,34], best: 5 },
            verk:   { tiers: ['100.0m','175.0m','250.0m','300.0m','375.0m','450.0m','525.0m','600.0m','900.0m','1.500b'], epics: [3,8,12,13,15,16,18,21,23,36], best: 2},
            canib:  { tiers: ['250.0m','300.0m','380.0m','480.0m','580.0m','660.0m','900.0m','1.500b','2.000b','2.800b','3.500b'], epics: [12,13,14,17,18,21,23,34,46,68,88], best: 0},
            ruzz:   { tiers: ['300.0m','400.0m','500.0m','600.0m','700.0m','800.0m','900.0m','1.000b','1.250b','1.500b','1.750b','2.000b','2.250b','2.500b','2.750b','3.000b'], epics: [2,5,11,12,13,14,15,16,20,24,28,32,36,40,44,48], best: 2 },
            z10:    { tiers: ['100.0m','200.0m','300.0m','400.0m','500.0m','600.0m','700.0m','800.0m','900.0m','1.000b'], epics: [7,8,9,10,11,12,13,14,15,16], best: 0 },
            nmDl:   { tiers: ['105.0m','135.0m','150.0m','225.0m','300.0m','375.0m','450.0m','525.0m','600.0m','675.0m'], epics: [2,4,6,8,10,12,14,16,18,20], best: 2 },
            lDl:    { tiers: ['70.00m','90.00m','100.0m','150.0m','200.0m','250.0m','300.0m','350.0m','400.0m','450.0m'], epics: [2,4,6,8,10,12,14,16,18,20], best: 2 },
            hDl:    { tiers: ['35.00m','45.00m','50.00m','75.00m','100.0m','125.0m','150.0m','175.0m','200.0m','225.0m'], epics: [2,4,6,8,10,12,14,16,18,20], best: 2 },
            nDl:    { tiers: ['7.000m','9.000m','10.00m','15.00m','20.00m','25.00m','30.00m','35.00m','40.00m','45.00m'], epics: [2,4,6,8,10,12,14,16,18,20], best: 2 },
            nmTisi: { tiers: ['75.00m','105.0m','135.0m','150.0m','225.0m','300.0m','375.0m','450.0m','525.0m','600.0m','675.0m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            lTisi:  { tiers: ['50.00m','70.00m','90.00m','100.0m','150.0m','200.0m','250.0m','300.0m','350.0m','400.0m','450.0m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            hTisi:  { tiers: ['25.00m','35.00m','45.00m','50.00m','75.00m','100.0m','125.0m','150.0m','175.0m','200.0m','225.0m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            nTisi:  { tiers: ['5.000m','7.000m','9.000m','10.00m','15.00m','20.00m','25.00m','30.00m','35.00m','40.00m','45.00m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            njack:  { tiers: ['4.000m','20.00m','24.00m','48.00m','72.00m','96.00m','120.0m','144.0m','168.0m','192.0m'], epics: [2,3,4,6,7,8,9,10,11,12], best: 0},
            hjack:  { tiers: ['6.000m','30.00m','36.00m','72.00m','108.0m','144.0m','180.0m','216.0m','252.0m','288.0m'], epics: [2,3,4,6,7,8,9,10,11,12], best: 0},
            ljack:  { tiers: ['8.000m','40.00m','48.00m','96.00m','144.0m','192.0m','240.0m','288.0m','336.0m','384.0m'], epics: [2,3,4,6,7,8,9,10,11,12], best: 0},
            nmjack: { tiers: ['12.00m','60.00m','72.00m','144.0m','216.0m','288.0m','360.0m','432.0m','504.0m','576.0m'], epics: [2,3,4,6,7,8,9,10,11,12], best: 0},
            hjr:    { tiers: ['30.00m','150.0m','180.0m','360.0m','750.0m','1.500b'], epics: [8,12,16,27,36,72], best: 0},
            njr:    { tiers: ['20.00m','100.0m','120.0m','240.0m','500.0m','1.000b'], epics: [8,12,16,27,36,72], best: 0},
            ljr:    { tiers: ['40.00m','200.0m','240.0m','480.0m','1.000b','2.000b'], epics: [8,12,16,27,36,72], best: 0},
            nmjr:   { tiers: ['60.00m','300.0m','360.0m','720.0m','1.500b','3.000b'], epics: [8,12,16,27,36,72], best: 0},
            yyd:    { tiers: ['125.0m','175.0m','250.0m','300.0m','375.0m','450.0m','525.0m','625.0m','900.0m','1.500b'], epics: [3,8,12,13,15,16,18,21,23,36], best: 2},
            nessy:  { tiers: ['120.0m','180.0m','225.0m','240.0m','300.0m','500.0m','750.0m','1.000b'], epics: [9,10,11,12,13,14,17,20], best: 1},
            hurk:   { tiers: ['90.00m','135.0m','150.0m','180.0m','225.0m','300.0m','550.0m','900.0m'], epics: [3,7,10,12,15,19,26,30], best: 2},
            mall:   { tiers: ['100.0m','150.0m','225.0m','300.0m','375.0m','450.0m','525.0m','600.0m','900.0m'], epics: [3,8,11,12,14,16,18,20,24], best: 1},
            nIns:   { tiers: ['5.000m','7.000m','9.000m','10.00m','15.00m','20.00m','25.00m','30.00m','35.00m','40.00m','45.00m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            hIns:   { tiers: ['6.250m','8.750m','11.25m','12.50m','18.75m','25.00m','31.25m','37.50m','43.75m','50.00m','56.25m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            lIns:   { tiers: ['8.000m','11.20m','14.40m','16.00m','24.00m','32.00m','40.00m','48.00m','56.00m','64.00m','72.00m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            nmIns:  { tiers: ['10.00m','14.00m','18.00m','20.00m','30.00m','40.00m','50.00m','60.00m','70.00m','80.00m','90.00m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            nSlut:  { tiers: ['6.660m','9.324m','11.99m','13.32m','19.98m','26.64m','33.30m','39.96m','46.62m','53.28m','59.94m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            hSlut:  { tiers: ['8.325m','11.66m','14.99m','16.65m','24.98m','33.30m','41.63m','49.95m','58.28m','66.60m','74.93m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            lSlut:  { tiers: ['10.66m','14.92m','19.18m','21.31m','31.97m','42.62m','53.28m','63.94m','74.59m','85.25m','95.90m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            nmSlut: { tiers: ['13.32m','18.65m','23.98m','26.64m','39.96m','53.28m','66.60m','79.92m','93.24m','106.6m','119.9m'], epics: [1,2,3,4,5,6,7,8,9,10,11], best: 3 },
            sic:    { tiers: ['400.0m','500.0m','600.0m','700.0m','800.0m','900.0m','1.000b','2.000b'], epics: [10,11,12,13,14,15,16,32], best: 0},
            vort:   { tiers: ['200.0m','300.0m','400.0m','500.0m','600.0m','700.0m','800.0m','900.0m','1.000b','1.500b','2.000b','2.500b','3.000b','3.500b'], epics: [3,10,14,15,17,18,21,23,32,37,44,52,58,90], best: 1},
            lux:    { tiers: ['8.000m','17.00m','26.00m','35.00m','45.00m','56.00m','67.00m','78.00m','90.00m','103.0m','116.0m','129.0m','143.0m','157.0m','173.0m','188.0m','202.0m','220.0m','238.0m','255.0m','270.0m','293.0m','311.0m','330.0m','350.0m'], epics: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26], best: 9 }
        },
        linkNames: { 'prntscr.com':'LightShot', 'www.youtube.com':'YouTube', 'i.imgur.com':'imgur', 'imgur.com':'imgur', 'docs.google.com':'Google Docs', 'userscripts.org':'Script', 'www.dawnofthedragons.com':'DotD Forum', 'dotd.wikia.com':'DotD Wiki', 'www.fooby.de':'DotD Log Analyzer'},
        raidArray: [],
        slapSentences: [
            'slaps <nick> in the face with a rotten old fish',
            'slaps <nick> around with a glove',
            'slaps <nick> around with an armoured glove',
            'hacks into <nick>\'s computer and slaps <nick> up side the head with a rubber chicken',
            'slaps <nick> around a bit with a wet noddle',
            'slaps <nick> about the head and shoulders with a rubber chicken',
            'slaps <nick>\'s face so hard, <nick> has to walk backwards from now on',
            'slaps some sense into <nick> with a red brick',
            'slaps <nick> with a fire hose',
            'slaps <nick> with a huge law suit',
            'slaps <nick> with a great big, wet, 100% rubber duck',
            'slaps <nick> with a large dildo'
        ],
        reload: function() {
            SRDotDX.echo('Reloading, please wait...');
            activateGame();
            //SRDotDX.gui.cHTML('#gameiframe').ele().src = 'http://web1.dawnofthedragons.com/kong?' + SRDotDX.request.kongData;
        },
        fails: 0,
        load: function() {
            if (typeof holodeck == 'object' && typeof ChatDialogue == 'function' && typeof holodeck._tabs == 'object' && typeof holodeck.activeDialogue == 'function' && typeof activateGame == 'function' && typeof document.getElementById('kong_game_ui') != 'null' && typeof SRDotDX.raids == 'object' ) {
                ChatDialogue.prototype.sendInput = function () {
                    var a = this._input_node.value.match(/[\s\S]{1,240}(\s|$)/g);
                    var al = a.length-1, i;
                    if(al < 1 || this._input_node.value.charAt(0) == '/') this._holodeck.processChatCommand(this._input_node.value) && this._holodeck.filterOutgoingMessage(this._input_node.value, this._onInputFunction);
                    else for(i=0; i<=al; i++ ) this._holodeck.filterOutgoingMessage((i==0?'':'... ')+a[i]+(i==al?'':'...'), this._onInputFunction);
                    this._input_node.value = "";
                };
                ChatDialogue.prototype.SRDotDX_echo = function(msg){
                    var num = SRDotDX.gui.getChatNumber();
                    var pEle = document.getElementsByClassName('chat_message_window')[num].getElementsByTagName('p');
                    var lp = pEle.length-1;
                    if (lp >= 0 && pEle[lp].className == 'script') {
                        msg = pEle[lp].getElementsByTagName('span')[4].innerHTML + '<hr>' + msg;
                        pEle[lp].getElementsByTagName('span')[4].innerHTML = msg;
                        setTimeout(SRDotDX.gui.scrollChat,100,num);
                    }
                    else this.displayUnsanitizedMessage('DotDeXtension', '<br>' + msg, {class: 'script'}, {non_user: true});
                };
                ChatDialogue.prototype.SRDotDX_emote = function(msg){
                    var user = holodeck._active_user.chatUsername();
                    this.displayUnsanitizedMessage(user, '**' + user + ' ' + msg + '**', {class: 'emote'}, {});
                };
                ChatDialogue.MESSAGE_TEMPLATE=new Template('<p class="#{classNames}"><span class="timestamp">#{timestamp}</span><span class="room">#{room}</span></span><span class="username #{userClassNames}" oncontextmenu="return false;">#{prefix}#{username}</span><span class="separator">: </span><span name="SRDotDX_#{username}" class="message">#{message}</span><span class="clear"></span></p>');

                Holodeck.prototype.addDotdChatCommand = function (a,b) { a = a.split(','); for(var i=0; i< a.length; i++) {this._chat_commands[a[i]]||(this._chat_commands[a[i]]=[]);this._chat_commands[a[i]].push(b)} };
                ChatDialogue.prototype.displayUnsanitizedMessage = function(usr, msg, cls, pfx) {
                    cls || (cls = {});
                    pfx || (pfx = {});
                    var active_room, allow_mutes = (active_room = this._holodeck.chatWindow().activeRoom()) && !active_room.canUserModerate(active_room.self()) || pfx.whisper;
                    if (!allow_mutes || !this._user_manager.isMuted(usr)) {
                        //var e = !pfx.non_user ? "chat_message_window_username" : "chat_message_window_undecorated_username",
                        var f = usr == this._user_manager.username(), h = [], rm = '';
                        if (msg.charAt(0)=='[' && (msg.charAt(2)=='|' || msg.charAt(3)=='|')) { var sp = msg.split(']'); rm = sp[0].split('|')[0]+']&ensp;'; usr = sp[0].split('|')[1]; msg = sp[1]; h.push('bot') }
                        var e = [usr]; pfx = pfx['private'] ? 'To ' : '';
                        //this._messages_count % 2 && h.push("even");
                        cls['class'] && h.push(cls['class']);
                        if ((!cls['class'] || cls['class'].indexOf('emote') == -1) && msg.charAt(0) == '*' && msg.charAt(2) != '*') {
                            var msgLen = msg.length;
                            if (msgLen > 5) { msg = '**' + usr + ' ' + (msg.charAt(msgLen-1) == '*' ? msg.slice(1,msgLen-1) : msg.slice(1,msgLen)) + '**'; h.push('emote'); }
                        }
                        var rUsr = h.join(' ').indexOf('sent_whisper') > -1 ? this._user_manager.username() : usr;
                        var raid = SRDotDX.getRaidLink(msg,rUsr);
                        if (raid) {
                            h.push('SRDotDX_raid');
                            h.push('DotDX_diff_' + raid.diff);
                            h.push('DotDX_raidId_'+raid.id);
                            if(raid.visited) h.push('DotDX_visitedRaid');
                            if(raid.nuked) h.push('DotDX_nukedRaid');
                            h.push('DotDX_fltChat_' + raid.boss + '_' + (raid.diff - 1));
                            msg = raid.ptext + '<a href="'+raid.url+'" class="chatRaidLink '+raid.id+'|'+raid.hash+'|'+raid.boss+'|'+raid.diff+'" style="float:right;" onmouseout="SRDotDX.gui.helpBox(\'chat_raids_overlay\',\'\',true);" onmouseover="SRDotDX.gui.helpBox(\'chat_raids_overlay\',' + raid.id + ',false);">'+raid.linkText()+'</a>' + raid.ntext;
                            SRDotDX.gui.toggleRaid('visited',raid.id,raid.visited);
                            SRDotDX.gui.joining ? SRDotDX.gui.pushRaidToJoinQueue(raid.id) : SRDotDX.gui.selectRaidsToJoin('chat');
                        }
                        else {
                            var linkArr = msg.match(/(^.*?)(https?:\/\/([\w\d\._]+)[\/]?.*?(\s|$))(.*$)/i);
                            if(linkArr != null && linkArr[0].indexOf('"cmd"') < 0 && linkArr[0].indexOf('href=') < 0 && linkArr.length == 6) msg = linkArr[1] + '<a href="' + linkArr[2] + '" target="_blank" class="chat_link">[' + (SRDotDX.linkNames[linkArr[3]]?(SRDotDX.linkNames[linkArr[3]]+' link'):linkArr[3]) + ']</a>' + linkArr[4] + linkArr[5];
                        }
                        if(SRDotDX.config.mutedUsers[usr]) h.push('DotDX_nukedRaid');
                        if(SRDotDX.config.ignUsers[usr]) usr = SRDotDX.config.ignUsers[usr], e.push('ign');
                        var fCls = h.join(' ');
                        var ts = fCls.indexOf('emote') > -1 || fCls.indexOf('script') > -1 || fCls.indexOf('bot') > -1 ? '' : ('('+('0'+(new Date().getHours())).slice(-2) + ':' + ('0'+(new Date().getMinutes())).slice(-2)+')&ensp;');
                        f && e.push('is_self');

                        usr = ChatDialogue.MESSAGE_TEMPLATE.evaluate({prefix: pfx, username: usr, message: msg, classNames: fCls, userClassNames: e.join(' '), timestamp: ts, room: rm });
                        this.insert(usr);
                    }
                };
                ChatRoomGroup.prototype.buildRegularRoomNode = function(a){
                    var b = new Element("li", {"class": 0 === i % 2 ? "even room" : "odd room"});
                    b.room = a;
                    var c = (new Element("p",{"class": "name"})).update(a.name);
                    a.premium_only && (active_user.isPremium() || c.addClassName("upsell"), c.addClassName("premium_room_icon spritesite"));
                    b.insert(c);
                    b.insert((new Element("p", {"class": "user_count"+(a.joinable?"":" full")})).update(a.total_user_count));
                    b.insert(new Element("div", {style: "clear:both;"}));
                    return b
                };
                SRDotDX.util.updateUser = function(loading) {
                    if(loading || SRDotDX.config.kongUser == 'Guest') {
                        SRDotDX.config.kongUser = active_user.username();
                        SRDotDX.config.kongId = active_user.id();
                        SRDotDX.config.kongAuth = active_user.gameAuthToken();
                    }
                }
                SRDotDX.echo = function(msg) { holodeck.activeDialogue().SRDotDX_echo(msg) };
                SRDotDX.util.getRoomNumber = function() { return parseInt(holodeck._chat_window._active_room.name().match(/[0-9]{1,2}/)) };
                for (var i in SRDotDX.raids) SRDotDX.raidArray.push(i);
                holodeck.addDotdChatCommand("stop",function(deck,text){
                    if(SRDotDX.gui.isPosting)
                    {
                        SRDotDX.gui.FPXStopPosting();
                    }else{SRDotDX.echo('<b>/stop</b>: Links are not being posted. Stop command invalid.');}
                    return false;
                });
                holodeck.addDotdChatCommand("e",function (deck, text){
                    var s = text.slice(2);
                    if(s != "") holodeck.activeDialogue().SRDotDX_emote(s);
                    else SRDotDX.echo('<b>/e</b>: Empty message specified');
                    return false;
                }); //
                holodeck.addDotdChatCommand("kill",function (deck, text){
                    document.getElementById("gameiframe").src = "";
                    SRDotDX.echo('Game window killed, have a nice chatting.');
                    return false;
                });
                holodeck.addDotdChatCommand("update", function(deck,text) {
                    var d = "<font color='#990000'><b>"+SRDotDX.version.minor+"</b></font><br>";
                    d += '<b>Installed Version</b>: <font color="#990000">'+SRDotDX.version.major+'</font><br>';
                    d += 'You can check ';
                    d += '<a href="https://greasyfork.org/scripts/406-mutik-s-dotd-script" target="_blank">here (greasyfork)</a>';
                    d += ' or <a href="http://userscripts.org/scripts/show/162897" target="_blank">here (userscripts)</a>';
                    d += ' to see if your version is most current and update if needed.';
                    SRDotDX.echo(d);
                    return false;
                });
                holodeck.addDotdChatCommand("help", function(deck,text) {
                    var d = "<b>Available chat commands:</b><br>";
                    d += "/stop /e /kill /update /reload /relaod /rl /reloaf /mute /unmute /mutelist /ign /unign /ignlist /friend /unfriend /script /clear /wikil /import /imp /fs /room /ijoin /join /wiki /guide /manual /slap /sh /camp /perc /citadel /raid /help";
                    d += '<br><br><a href="https://docs.google.com/document/d/14X0WhnJrISQbxdfQv_scJbG1sUyXdE2g4iMfHmLM0E0/edit" target="_blank">You can click here to navigate to script guide for detailed instructions or use /guide and /manual commands.</a>';
                    SRDotDX.echo(d);
                    return false;
                });
                holodeck.addDotdChatCommand("reload,relaod,rl,reloaf",function(deck,text){
                    SRDotDX.reload();
                    return false;
                });
                holodeck.addDotdChatCommand("mute",function (deck, text){
                    var s = String(text).split(" ");
                    if(s.length == 2 && s[1] != ""){
                        SRDotDX.config.mutedUsers[s[1]]=true;
                        SRDotDX.echo('User "' + s[1] + '" muted.  Use the /unmute command to undo, and the /mutelist to see all muted users.');
                        SRDotDX.config.save(false);
                    }else {
                        SRDotDX.echo('<b>/mute</b>: Invalid parameters specified. The proper syntax is "/mute [username]". <!--(<a href="#" onclick="SRDotDX.gui.help(\'mute\'); return false">help</a>)-->');
                    }
                    return false;
                });
                holodeck.addDotdChatCommand("ign",function (deck, text){
                    var s = text.split(" ");
                    if(s.length == 3 && s[1] != "" && s[2] != "") {
                        SRDotDX.config.ignUsers[s[1]]=s[2];
                        SRDotDX.echo(s[1] + '\'s ign "' + s[2] + '" added.  Use the /unign command to undo, and the /ignlist to see all users with known ign.');
                        SRDotDX.config.save(false);
                    }
                    else SRDotDX.echo('<b>/ign</b>: Invalid parameters specified. The proper syntax is "/ign [kong username] [in game name]".');
                    return false;
                });
                holodeck.addDotdChatCommand('unmute',function (deck, text) {
                    var s = String(text).split(' ');
                    if(s.length == 2 && s[1] != '') {
                        if(s[1] == 'all') {
                            for (var u in SRDotDX.config.mutedUsers) delete SRDotDX.config.mutedUsers[u];
                            SRDotDX.config.save(false);
                            SRDotDX.echo('All users unmuted.');
                        }
                        else if (SRDotDX.config.mutedUsers[s[1]]) {
                            delete SRDotDX.config.mutedUsers[s[1]];
                            SRDotDX.echo('User "' + s[1] + '" unmuted.');
                            SRDotDX.config.save(false);
                        }
                        else SRDotDX.echo('No muted user "' + s[1] + '" found.');
                    }
                    else SRDotDX.echo('<b>/unmute</b>: Invalid parameters specified. The proper syntax is "/unmute [username]". "/unmute all" can be used to unmute all muted users.');
                    return false;
                });
                holodeck.addDotdChatCommand('unign',function (deck, text) {
                    var s = String(text).split(' ');
                    if(s.length == 2 && s[1] != '') {
                        if(s[1] == 'all') {
                            for (var u in SRDotDX.config.ignUsers) delete SRDotDX.config.ignUsers[u];
                            SRDotDX.config.save(false);
                            SRDotDX.echo('All users removed from IGN list.');
                        }
                        else if (SRDotDX.config.ignUsers[s[1]]) {
                            delete SRDotDX.config.ignUsers[s[1]];
                            SRDotDX.echo('Removed ' + s[1] + '\'s IGN.');
                            SRDotDX.config.save(false);
                        }
                        else SRDotDX.echo('No IGN of user "' + s[1] + '" found.');
                    }
                    else SRDotDX.echo('<b>/unign</b>: Invalid parameters specified. The proper syntax is "/unign [username]". "/unign all" can be used to clear IGN list.');
                    return false;
                });
                holodeck.addDotdChatCommand('mutelist', function (deck, text) {
                    var s = '<b>List of users currently muted:</b><br/>';
                    var i = 0;
                    for(var u in SRDotDX.config.mutedUsers) { s += u + '<br/>'; i++ }
                    if (i == 0) s = 'No users currently muted.<br/>';
                    s += '<br/>Use the /mute and /unmute commands to add or remove users on this list.';
                    SRDotDX.echo(s);
                    return false;
                });
                holodeck.addDotdChatCommand('ignlist', function (deck, text) {
                    var s = '<b>List of known users IGN:</b><br/>';
                    if (SRDotDX.config.ignUsers.length == 0) s = 'No users added to IGN list.<br/>';
                    else for (var u in SRDotDX.config.ignUsers) s += u + ':' + SRDotDX.config.ignUsers[u] + '<br/>';
                    s += '<br/>Use the /ign and /unign commands to add or remove users on this list.';
                    SRDotDX.echo(s);
                    return false;
                });
                holodeck.addDotdChatCommand('script', function(deck,text) {
                    SRDotDX.gui.FPXdoWork('Script links: https://greasyfork.org/scripts/406-mutik-s-dotd-script and http://userscripts.org/scripts/show/162897');
                    return false;
                });
                holodeck.addDotdChatCommand('clear',function(deck,text) {
                    holodeck.activeDialogue().clear();
                    return false
                });
                holodeck.addDotdChatCommand('wikil', function(deck,text) {
                    SRDotDX.gui.FPXdoWork('http://dotd.wikia.com/wiki/Dawn_of_the_Dragons_Wiki');
                    return false;
                });
                holodeck.addDotdChatCommand('import,imp', function(deck,text) {
                    if (/^(\/imp+)/i.test(text)) {
                    SRDotDX.echo('Importing all raids from server');
                    SRDotDX.request.raids();
                    }
                    else SRDotDX.echo('FAIL! ;)');
                    return false;
                });
                holodeck.addDotdChatCommand('friend', function(deck,text) {
                    var s = String(text).split(" ");
                    if(s.length == 2 && s[1] != ""){
                        if (typeof SRDotDX.config.friendUsers[s[1]] != 'object') {
                            SRDotDX.config.friendUsers[s[1]] = [false,false,false,false,true];
                            SRDotDX.config.save(false);
                            SRDotDX.gui.refreshFriends();
                            SRDotDX.echo('Added ' + s[1] + ' to friends');
                        }
                    }
                    return false;
                });
                holodeck.addDotdChatCommand('unfriend', function(deck,text) {
                    var s = String(text).split(" ");
                    if(s[1] == 'all') {
                        for (var u in SRDotDX.config.friendUsers) delete SRDotDX.config.friendUsers[u];
                        SRDotDX.config.save(false);
                        SRDotDX.gui.refreshFriends();
                        SRDotDX.echo('All users removed from friend list.');
                    }
                    else if (SRDotDX.config.friendUsers[s[1]]) {
                            delete SRDotDX.config.friendUsers[s[1]];
                            SRDotDX.config.save(false);
                            SRDotDX.gui.refreshFriends();
                            SRDotDX.echo('Removed ' + s[1] + ' from friends');
                        }
                    else SRDotDX.echo('User "' + s[1] + '" not found on friend list.');
                    return false;
                });
                holodeck.addDotdChatCommand('fs', function(deck,text) {
                    var cmd = text.split(' ');
                    if (cmd[0] == '/fs' && cmd[1]) {
                        SRDotDX.echo('Posting raid to friends');
                        document.getElementById('DotDX_raidsToSpam').value = cmd[1];
                        SRDotDX.gui.spamRaidsToFriends();
                    }
                    else SRDotDX.echo('Wrong syntax. Usage: /fs <raid link>');
                    return false;
                });
                holodeck.addDotdChatCommand('room', function(deck,text) {
                    var cmd = text.split(' ');
                    if (cmd[0] == '/room' && cmd[1]) {
                        SRDotDX.gui.gotoRoom(cmd[1]);
                    }
                    else SRDotDX.gui.gotoRoom(0);
                    return false;
                });
                holodeck.addDotdChatCommand('ijoin,join', function(deck,text) {
                    var mode = text.charAt(1) == 'j', joinStr = '';
                    if (mode) joinStr = text.slice(6), SRDotDX.gui.quickImportAndJoin(joinStr);
                    else joinStr = text.slice(7), SRDotDX.gui.quickImportAndJoin(joinStr,true);
                    return false;
                });
                holodeck.addDotdChatCommand('wiki', function(deck,text) {
                    var p = /^\/wiki (.*?)$/i.exec(text);
                    if (p) {
                        window.open('http://dotd.wikia.com/wiki/Special:Search?search=' + p[1]);
                        SRDotDX.echo('Wiki search opened.');
                    }
                    else SRDotDX.echo('<b>/wiki</b>: Invalid parameters specified');
                    return false;
                });
                holodeck.addDotdChatCommand('guide,manual', function(deck,text) {
                        window.open('https://docs.google.com/document/d/14X0WhnJrISQbxdfQv_scJbG1sUyXdE2g4iMfHmLM0E0/edit');
                        SRDotDX.echo('Script guide opened in new tab/window.');
                    return false;
                });
                holodeck.addDotdChatCommand('slap', function(deck,text) {
                    var p = /^\/slap (.*?)$/i.exec(text);
                    if (p) {
                        var num = Math.round((Math.random()*(SRDotDX.slapSentences.length-1)));
                        SRDotDX.gui.FPXdoWork('*' + SRDotDX.slapSentences[num].replace(/<nick>/g,p[1]) + '*');
                    }
                    else SRDotDX.echo('<b>/slap</b>: Invalid parameters specified');
                    return false;
                });
                holodeck.addDotdChatCommand('sh', function(deck,text) {
                    var p = /^\/sh (.*?)$/i.exec(text);
                    if (p) {
                        var fnd1 = p[1].toLowerCase(), fnd2 = p[1].length, found = false, sho;
                        for (i in SRDotDX.shortcuts) {
                            if (SRDotDX.shortcuts.hasOwnProperty(i)) {
                                sho = SRDotDX.shortcuts[i];
                                if (sho.n.toLowerCase().indexOf(fnd1) > -1 && sho.n.length == fnd2) {
                                    SRDotDX.echo('<b>' + sho.bn + '</b>: ' + sho.desc);
                                    found = true;
                                }
                            }
                        }
                        if (!found) SRDotDX.echo('<b>/sh</b>: Shortcut not found in db');
                    }
                    else SRDotDX.echo('<b>/sh</b>: No parameters specified');
                    return false;
                });
                holodeck.addDotdChatCommand('camp', function(deck,text) {
                    var name = text.split(' ');
                    name = typeof name[1] == "undefined" ? 'bob' : name[1].toLowerCase();
                    var num = SRDotDX.gui.getChatNumber();
                    var chatEle = document.getElementsByClassName('chat_message_window')[num];
                    if (chatEle.childElementCount == 0) document.getElementsByClassName('chat_message_window')[num].innerHTML = '<div><div></div></div>';
                    var chatElem = document.getElementsByClassName('chat_message_window')[num].lastChild.lastChild;
                    switch(name){
                        case 'bob': SRDotDX.gui.cHTML('p').set({style:"text-align: center; font: bold 12px Trebuchet MS; background-color: #f9f9f9"}).html('Bastion of Blood node data<img alt="Bastion of Blood node data" style="margin:3px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAAFGCAMAAAAVVVD3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAAANgAAOAAAOjYAADkAADYANjgAODoAOjo6ADo6OgAAYQAAYwAAZgA4YzYAYTgAYzoAZjhjYzpmZmEAAGYAAGEANmMAOGYAOmY6AGM4OGEAYWMAY2YAZmZmZgA2iAA4jAA6kDY2iDg4jDo6kABmkABhrABjsQBmtmE2iGM4jGY6kGFhrGNjsWZmtjqQtjaIzziM1TqQ22aQkGGsrGOxsWa2tmOx1Wa222Gs8mOx+Ga2/4g2AIw4AJA6AIg2Now4OJA6Oog2YYw4Y5A6ZqxhALFjALZmAKxhNrFjOLZmOqxhYbFjY7ZmZohhiIxjjJBmkIyMOJCQOraQOpCQZqysYba2Zs+INtWMONuQOtu2ZvKsYfixY/+2Zru7u4jPrIzVsZDbtqzPiLbbkJDb24jP8ozV+JDb/6zy8rH4+Lb///LPiPjVjP/bkP/btvLyrPj4sf//ttXV1dvb/8/y8tX4+Nv///Lyz/j41f//2/Ly8vj4+P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzdGscAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAGgZJREFUeF7tXQtj3chVvruJ24VtgEJSXlsgQGkoj7beQpt4426hG7flXQq72cThUZKwscPGQDd2kh/Pdx4zc440M9LI8r1y8OdEV1cjjebTmTk6n2Y0d/XgtcLqwatpqB93mtRT4IKO4oJOxAWdccjRebq1Wl15ol+KiMftrVbb+Ni//vGlxzh2hzdqKmW1oi1IxRrvCAzR2b/+WcxJcHTNfisiS+etx6/2BvmE47DnyS7Otbe9n6Oz8+ouZSWpAYN0wHtWOkfXtve/srv6+u7q+mcnu+m6JuhxXMr9nVdHv/a4QIezk9SAYTpXnvChMC5OrDamjxu6RwElOie72/urHWSJf3vXPwulNNDj+NoDqB8V61CqVjvCIJ1LP7kh56YccGnJOnqVdZc8anRwhd56jHxG0dnbZkOFHSOd1YqsoqkBw3Qe7727tUN5S0GIzl1qfAPmKdFBsSKdvJH1OC0lalOezg6MHFMDRtA5urYKdOiD6OiFq6FA52QXtSPQoavThx5He766ux18UThnokO+glIb6aD9hMr2dEsqGz6e/v5nukseWTqwBp0/0iEjlyob+MB2uIZYNc3D0DnZvfRzSOVctOaPoUPuUjPUAuDDXJIscnS6oEuy16tt9eNOk3oKjKHzMazVr2/nlk4eF3QiLuiMA+i8Vrh4ViA4s8r24MHLCh48eFHBBR3FHHQQmCnMfW0mOpS35opwAlGAXfZhCrwnwcfRH6WAytPp5hHpfFlZxBUg0nl2VbmuvvCJbjJ0Po2pb/+nbvJ0YpaIahAx2aUmWKQC7yP65wgUiwBHp5eHJ9tBovOOsogrQKLzm8oirgBZOncRKd7dtkts3H9368o/m0rhigQ6J9//qQl3XWrMI2AcnSyaKptUCYitV3dv2CU2osT4pK8CWyTewUXvrsAxj4C10PlTllkAX80bdomN+zdoe54OiYkKnZhHwDroAFrD6dSoZmaJjVU6J9/DdSjTCXkErIkOrHOye4Nbwvce2yXSynSw+ekXa9aJeQSYVH4C4OSHpXN8e7X6nZ/pF4al8/y91eq3/1e/MAwdEqHbMBBdStaNdlm1zp6I0CKdmEdASrUeWmHoHN/+5suX97+q3xiGzvP3vvHixb0/0G8Mb50W1I8bm3ry/RqdZ1+DZY7/MrlpR+fTP4Rlnv9FctObp0OWLVc2ZsKcIqx1iAlzitg0HRtJKCKdEBWYmMDQCVGBiQmWXtkysK6gj41bh4PQQmW7v1rBFdgQx1oHsc0Hq9UbD/U7A3QeIPcJf/XjBlK15FlEOsfvP3p55wuflOncg5c++N0FtR0xDm4NBqntEI/7qz8r04GjtgHopumEKMSE4pbOrz6i5dWyK4AbWNJ9R2+i/l6a2s5HfAMt3ncyMHRgeKiwgojrwxSY5ZscHuDplOSbBhkF62Qxmo6osLyI000WqcByoIo4haPTyyOl8l3UsZmLDuDoUAzcIN/ikuFSYx4BLrWL1Haqt1HFB5Xb6N4OVzapGFQRmuQbHR7gChzzCIipqIVIK7Wd+2+SL/BosA5d3byIo8RB+WaM41NjHgEhlWTD3pUnJTrqCxzG01EaORGHr4PyLRzO8HRCHgEhlXnsr/68RCeD8XRCUTMiDlsH5VtKAhydmEdApMNX4OhaKaLOINIZCkFRj1GTCyKuah2Wb3K4bvF0yvJNqqCPQ8da554P1xjeFbSgftwpUrt0ELbpGsFUtg9dQMDYLJ3sqIe52k4bZqHz5R937qHAeabzhJ64+KBjrCv4Ur/pLIAO4IdnRToDUcHz9zpPpQCis4k/gb9/KpJ1BqOCg8sr7w42a50sTGUbERXcW9CjDxdIBJxfV4Db9Zl5Nty6EUxPlm+6VHg63TxsKjybzz+5AhbXHbRYB8ZPrXMt8o3hR5gl6xzf7jxvByydD8kAlbaDECrRoRh4o/KNcLi18u7A0PEPcRiODrXMU8g3WQpcgWMeAePpAPdLMZt/2s5wdOiUp5BvttK41JhHQBMdD1vZPqhWtqBJJsq3lAHg6YQ8AkwqO6BC28nBVjbXecCwdNBi+RPWmSDfZKmbPJ2YR0BKzcQFo+kMVDYu6mT5pkuFo1OWb0M9CB+R7UptR/TogqICoNpd5Z+2M2zb6WPTdGrdVd3nuYxER4yzrBB0oLLdoRLnK9vz927Sx4dOJGzcOtwjUqxsrluUEenoTXRJHSJZjK1sH3yDlj3rWFXV8DdL75sYx95hvXW4eZQ8G99Fi8MkGjGHdcIN24kE23b6MHQy2CwdvYn6e2mkM/CsYIGeTe7KJevcRzR9+HveG0Q6w56NbwJd0TZavunxAk+nLN/q3VXPrn6zSGfQs/Hox65oGy3fqCWkcjk6Q/LNw7ad49u/XKJT8myaC+5oNPqRIl8j2vQ7Vobl2967aciUS025KUKqOLZqRP1RR48aVzDk2SikptpsRJt+xwpKjM9sCKo73KDjFY5Oyk0RU/dRCc1RDE+nC0Mngx4dvpJJtOl3rAzJNxxcopNyU6TUo2vbRTpoObpm4NpObhCL5gIwHZzWiDb9jpUB+fYf9HJpavCeTsxNYVJPdn+lSOedf6g8+gCdgUEsREekliyTiEPikHzDSsk6MY8AT9Y7NkvnE3r0cUu/Chyd+iAWLo4RbUbEVa0ThFuJTkW+ZeDoAIXuqgUOYqEbEniWooK+eGtyBU2Ygw5VwVpHfAZLpsM8yh3xaDjfvr3yvSKLplPtiD9+/9Hx7VudqG3JdPRuVOiI17bjm1ByBcGlWd9GdDbxV0GiIz0Ih79U9GwC82hqw9bJIbWdHzKd4ij3DBZNJ4dFu4Lg0qyrnokOonVSYVPlGwX7BfmAoMBnEumoQHASYSY6osIQqEyTb517oX4GaCeLopvqkFxBcGnWt7VUNpSKIt9J8q1ORzxywEg60XeZqK2Fzt6OSi1Z8qawRlRr8o0qTipzp8DeOCPpZGHo0NtIHTnq6KDEYo0p8i112xE6BZa8Iuag8/w9UW4Hlw0hS4dLQyeeIt+IiGlkvsBe7cxDJwtLh4sKC+HksmyVb0XrGCHEWAcdeGRSH1Plm3TbBfgCp6MEKZUnfPIP2sbToTin8iSnCfXjxqWe7MrzRv9+83hXcPPFC3pekLBZOlkYOvSeZedNS0Nnia/y9RHpHN8W5Xa4ZQhZ6xCT53+7KOvQ7co/yhld2YJEWJBAYN9O97uE8a6gD9Cxqqrhb5beN+l0KA8LpzjHPzm01vljWv7VktoOMzn5+4J16FHBy/slV0Dj3A8ucy9PwKbpBImQFwj1l5TJVfvbzuZdQR/WOsTk+O9K1jn4XMU6uFBJhbXLN+xpL7F+ChBZuDxSKgJX4G8KbSfTO2rbDo+YKrUdq8ImyDfw/s7/6JYOHUR0Rfm2f+kxzUlnYF1BH66y9eArW6RDMTT9N2uD8s3N3OlSwaUs7mwXJMNa509o+deltnNw+Y2HtUfu8d03ihlFo8Q1lBif2RCUd6AINtUoR4fCU28A/QSevlWzzv03Hx1uuR4RQ+f5dx/+4GElyKEqIyqMbcKFi2tD8u2uM5BLRYa2XdlU6ewutR1y1Z0OK992anRC/UZbIQJcxZiKVLYB+UY7FVJTbgqX2oWlc/j5IeuUK1soDF3MdvnmfYYrMOXh3IlJfbp16TGyNrBth0dMFdtOdeoSkW+qwtrlW9yR4ejwXJu6zkipuFQ/elwOcvqwdPrwrqAF9ePGpqLt1Ogcbr35qPSMeoFjcsQ6xcp2/P6jHz4qBDmLHG3IFbGod9B2inS0W6fSc92Emej00bVOqbINjMlpxCx0JKB2dc21neqkTIUxOZv4E6j7/n8y2vCdT2jkcanneoGeTW5jBeuADinRQs/1Ij1bbbQh0alP+5M+FJZO6EQjLdYu3xAUmD09nTBoJ6BKNtFBbYJwm+jZRIXZPjjaOl6+cbAnWzoFpmA7r3eGPFsfxhUMjqOWUmFJ8a/EwHFtxLtvIikYLpVaiJkHJKWerWfT4sQ+OP4S1ohk/d03YxxPx0shIKTWPVt9yqwRno1FFl1ptgmXMa5V9Q4fKAcIXCoFMvxwJCCmSnYF69SnzBrh2UjZ8DWmknEVS2tVOnSgyCKFSwWkNgak1AHPRhYqT5llPhSGDgpLnWhcYJwdpWvrfYPT0A1Ah46th0CXrEOiU50yazBmY3cqIm6KfEtJgC/w07ccm5gqjq04jnpgyqzFvSGCi3eG46ibMAsd2Kc8jppwuFWM2e6tVvWRuk2Yhw4qdHkc9dd+Vhlt+Py7D2m+rIXRQeP0js1Y585XybnVYrZ7q28tjU4XprLd+YXfeFSyjszE8unV7muwVlU1/M3R+yY/DAPY25JtO4gL/MtVpu3IJEbL6rnmONwHoc4V9JDo5LDkysbzHRNsd2JyBTTfMcEOlFh22+E3yFduPgljHZ4bwwehlo5RYXS71lv1WPlGR6YdbYHNK3WKsXQyGF3ZrApLIfto+ea72EyBzSt1umUtdAChgyA60UGcxv+He99cF1tKta/U6aY10RHBQteYKpvUDQoseTtKjM9sCCo7uC42m0pRTMyGsR46SYV1JzChtAH5hv1NF1uXTsyGsSY6VoUFHY8ycC0Zkm9xR0aPTimV+pNKAiGH0XRwNqvCcLWb5BvtmG/slGPMhpFSZbRhkQ5FBaV3rg8uv/3vl/1UH846RoVJH1yTfPNdbF06MRtGSvWPRBiGTm14ngw77jz78JWtBfXjxqbW6Ty7+u33HxWGGH169ea91c0XH3ZDUM2lFfPQkdt2qbIhzLlTqmygc/C5h4uabo6sU6Pz8uV/d+fMMnToyKXNk1PtTMxg4XT4QVtyIYBrO/6VXiDSAfLjCjbxF8CuwP8wqm87uhZh6fCTqYV5NrhvE00AzjpU4MJ9h5wBVMK5qmx1OhBwy/JsA64AfG75yUFbKhsJLVFh7b1vGlQourmGpaBD9uia7V+wdHDXuVWcDLDgCiJo4J+oMMQlGoCltQ7ScSLffBebyVXelyj8Khzdd7ZxxWyirWy37lTo9OHo0Nwj4IJSUfBL/2XJa0PyjaK51MWWUkW+lX4V7r9+fbW69JPrHxtn0KVTml57KASVuUdYhVHZRJ7ENTJATb75LjabyiFojNQJKRWHHF37rRIdmdAs33aGQlCcD/9EhbFNmE5cG5JvvottLB0VCD/OVzbmUxjEMhCCSsY3+EJPfPcNBpSv4+lQZfjO7vV/jNl26PRg6QyFoDgl6azdHVo2v/sGw+qWBjp9WDoV+TYiZsMpyUhkkGb55rvYxtIZ0jtU4Ml0WlA/bmxqfOie4OhUQ9A+Nk1nQO9U5wXNYNl05FnBOaLDDtV4aaCtsi3sVb5qRF2bF5Twg4cvDn6x4wqsqmr4m6P3TT1bUb7VBYLEBdrLI9h824FnK8q3DCIdqmWwzvmpbIef/9fafedLD5nOst7qrbiCOh3wIDlanJ+NfOaVJ7Jsk284FtrM7WhTKRHZGolWJTuysr24t3rjX66WZ88T8SVLjnY4/EhrHdgise5zO5pUFm6xa48RU38kvZcuMrB0Dql/Ydp9x9KhGJr+m7WafCPdlw4hpNQo3DJ0jq5BRKHArrYZOqe5jVI1u6FLijRF78Q1lAaf2RCUdV86hGDJavBpRoMmOjsk+yoPpqbHbNLjNuHdNxQX/9IhhD4dY5yYqm8l7pWtc6oQVCo/llQuqTlxrUjH6T7d1qdjxVBKhfsgxMMIkY7cRKdWNkDOiaWItpHyDUCJ446MHp10IJBSuS/Re5pIR1pOmY5EBaXBk9LjJss2+SYlDjsyunTYDPljuzCVLYNIZ3CenDbUjztFaqJzh57hdB67t1S2Fpw9HfVr5fkK+lgEncL0C4FO0RXQ44LKQ90mzEUHgQE/B4owroBGtT67WrLOAufJES+fXAiQ2g4/luL3EBIMncI8OZv4E1Atg3WKc33wncffSa11iMmS9A7d54jOtJeUM0/aNksHPEiO8n02YjSdDDbcdvZXl/7NKSFgvHUG5snRyNZrsdHyrdi/xtulh05RJTveOvV5cnTuEa/F0loHtkgcGRf616ryLYeGylabJyc8/fZaLK4NybdS/1pNvmUxnk51nhyKElGtOlosrqE0+MyGoPqTAbZF2wLLdslOMA+d+jw50huIc+Mf24TPH9eG5NsQHfs0bR46GVg6KOne17taLK4NybdBOlk1JAebRtdCpzpPDs4qjR4rosWa5FudDg41kVlIPeXchvV5coL+4tPTept8q9IpD6LooaXtVKf9aUL9uFOktllnUb+DQLeHSv9OBrbtDAxiacI8dLi1mjsSMJ5OH5umwwHQtIhaAmpX1zZvnerchhlEOqV3rq2qavibq/eNLrHr7B1JZ+id60bMY50Mxla2Bc6TMzC3YQbGFSzvnWt4tTOb21Bv3Bwqtsu3cv+ayjqj7myq9iIkjKUz4Nl09COLOMQlrfKtKNA0ILPFtqnVuQ37iHSGZpOgcGxvR0QcxdD036wNyTd8ZOkE+ab7MFKqmGxK2xnybKJ3RMQRNdE7cQ1lxWc2BA2/+JbpXyNwYtiHYVN7GFvZhn6VD9Lj0mMhxTZhOnFtWL7ZWKVLJ+wjMKnVuQ0zMK5gzDw5VPy9psGTQb7l+9cA8IgST5BSoaXObG5DKhCfu23wJEBXPiUBHTrmg5BS0XYm0qFGA/uUf5VPRj+KXGuXb9ToZE/CWDpsnUmVDXQGfpWvCfXjRqdSNTRtDmigA2dQ9GyNmIlOH2Pp4C769sJ+lU8CalfX5nMFTZiDjsYbuDnwV8H5pSMDgMKHYiSd4mwSm/hTiKOcaJ2B2STaMId1wIcKNMmzZbFpOhmcYzpn69mCwqKzQAqIcgv6zUaYgCswHVjsX6NEzVERUs/Ws8Un3+JqEJXgfLLE1wqdYfnWcV76eRrPloWlk/rPJH8KpM1PwIkSirB0huVbns7pPFsGvrKFKJGqRtBwssRGKmyKQC0dlWYikATdXCXHgJR6pp4t0jEjKGWJjUTHxL7pOBwlBxb615hOnAuFYFN7mJ8OgPYiyi3ptwKdJM1EGDEyuWq7J8RUVGBkPbXtHFzGiesvi+GsXGRcS5QfBZQlttCKeaZjj6MDQTnTv0ZQOhnrUMbTf0lZBk+OoGNHUCb99vNFV8AHFvvXKFFzVIRU5lH+JeUcDB1+I97D02lB/bhxqWKw0i8pZ7FkOuoMpz764Bh0UW8mZtBgnYXRGZzbsA9rneX1jcLPEIyLaaCTnX7BqqqGv3l63zJocwULm+ujjwY6kNcLm+ujj1NWNs2lFQugU3cFiHqTACPN1SbfwpJhU2WzfedoJjp9WDpWgJEgQ3DSIN/CUmBSRRTmfxWOYp8UGQnaXIFHp7LFIqcRlLKkNO9Q7XEi3/L9ayrf3LwEMZXkjotwgNF04pO2hA6d0H9mRlCOlm/F/jVOdNcipBLJ7sToLdYhV1DxbME4KAD+sV1Gyzf5p5t6dKRTTzcYOlSgjoFmoxMUiQqyJvn2lVL/mtJBDsm0c9Hxbg1wdPh8Kt9QBpS/Qb7FJaNLB/9zajSHJus423g6VL9X24lOo3yr0om5MELq6awjhFxvYscVNKB+3LjUOei4GQs2SweA1cLNQdHmCm66kQUbpwPsTXYF3HJsEHqerZPBOW47pQnNNvEnOA0decr22ggEBKCLm1P36daVn2554zTQWdqcuhIfubtzAx05tkgHNVnlG9wNzkE1GxdupHzTvRU2leSb5KgbYiqPn9spT/uTwXg6rv8M4ag8CY/RVoUOCbdChxRVKDkw88gddEgfWKE6mk4WncqWioxAWgrIAoHCrQH5VqIT+/RYZQgSHbnCE63TU29dOnH4I11KOpkZR0lUK/JN9g6wuUpkaowzCx2tbs5Pd+g447g+OGyixIp8K/evCR1jHJfaQ1Nl6//+juYCpOKIwqFGkWYxKdExvW95RcN0Qo6M+eh04Ogk+SYXlAmCxVj5VrNOyJExB51hz0apIt+YmOuDQ3JdvuX71wjMxLS6NdFpQ/24U6SOr2w60N3ggo7igk7EHHRKbWd50JJn8drS4Z+xW4ZA0LJNgLUOPcJ5feh86yrU6OtDB1xWb/9TmU4c/qhSTITboHxzeytcKudquuZmo0PPP4p0knyzwk2WlFyk42Ueo5drHJhJmI3Oi/6cunoKhqMjwm1YvnVkHqObaxqYSZiDThaeTtAkIsVEuMkSG4mqCSQNHbO3bvJ0WBRyIKpYE52g2tsGT3ZkHsPmKibfBJ0kstAOqHAjet8IcW/9blNVBa2dDgrz9ItPtLsqCjdZYgutlORb3Fu/21StoOu3Dg9/JDptgyc7Mo+RUkUUbqayNaB+3ECqlm0CLuiMwgWdiLOkc96gJc/i9aOjFaAVp6psevbZcUFHcR7oqMaaJN8QFaSgwaWKKDT6bU10wvDHSfKt8LPdQRS6oZV69tnh6YThj1PkG7jICsPmKnTc0Eo9++xwdOLwxynyjSLRQrxN8s0PrdSzzw5LB+cLdCbIN9IIIv4Ilg4dmPImrINO6kWTb3PKN5/3utqOtH4+K13sZvmWe5ITK+iarUNQOlPkGxkgZ7sg3zZBpwH14wZS9eyz44KO4oJOxAWdcQAdO6ax4e9U777p2WfHRWVTXNCJWAsdlWFpbaR8Q5IeZgSafnJeLN/cu2969tnh6ES5ooJspHwD4fiLA7LBpqp88+++6dlnR40OS4Mx8s384gCvAIYsXwjzahWwtsom5ZW1sfJNeRbffSP55q/FeujE4Y9t8k3eawOXAh06sPPum559dlg6QFIsWBsr3yg1/OKAbrJ0+BLxPpQLY110cOp2+RadRd46zCLuw1gLnSDDmqcuCXtk6VCrQXLYh7Eu6zSgftxAqp59dlzQUVzQiThLOq8RHjz4P+m/+Q7rPQKfAAAAAElFTkSuQmCC" />',true).attach('to',chatElem);
                    }
                    setTimeout(SRDotDX.gui.scrollChat,100,num);
                    return false;
                });
                holodeck.addDotdChatCommand('perc', function(deck,text) {
                    var bok = text.indexOf('bok',4);
                    var cwp = text.indexOf('cwp',4);
                    var empty = text.length < 6;
                    var output = "";
                    if (bok >= 0 || empty) output = "<b>Book of Knowledge Perc. Tiers:</b><br>\
					1 – 3999: Brown/Grey<br>\
					4000 – 5999: Brown/Grey/Green<br>\
					6000 – 9999: Grey/Green<br>\
					10000 – 13999: Grey/Green/Blue<br>\
					14000 – 15999: Green/Blue<br>\
					16000 – 17999: Green/Blue/Purple<br>\
					18000 – 21999: Blue/Purple<br>\
					22000 – 23999: Blue/Purple/Orange<br>\
					24000 – 29999: Purple/Orange<br>\
					30000 - 32999: Orange<br>\
					33000 - 35999: Orange/Red<br>\
					36000+ : Red/Orange";
                    if (empty) output += "<br>\
					-------------------------------------------------<br>";
					if (cwp >= 0 || empty) output += "<b>Clockwork Parts Perc. Tiers:</b><br>\
					1-1999: 10x Perf. Clockwork Part<br>\
                    2000-3999: 25x Perf. Clockwork Part<br>\
                    4000-5999: 40x Perf. Clockwork Part<br>\
                    6000-7999: 55x Perf. Clockwork Part<br>\
                    8000-9999: 70x Perf. Clockwork Part<br>\
                    10000-11999: 85x Perf. Clockwork Part<br>\
                    12000-13999: 100x Perf. Clockwork Part<br>\
                    14000-15999: 115x Perf. Clockwork Part<br>\
                    16000-17999: 130x Perf. Clockwork Part<br>\
                    18000-19999: 145x Perf. Clockwork Part<br>\
                    20000-21999: 160x Perf. Clockwork Part<br>\
                    22000-23999: 175x Perf. Clockwork Part<br>\
                    24000-25999: 190x Perf. Clockwork Part<br>\
                    26000-27999: 205x Perf. Clockwork Part<br>\
                    28000-29999: 220x Perf. Clockwork Part<br>\
                    30000-31999: 235x Perf. Clockwork Part<br>\
                    32000-33999: ???x Perf. Clockwork Part<br>\
                    34000-35999: ???x Perf. Clockwork Part<br>\
                    36000+ : 260x Perf. Clockwork Part";
                    SRDotDX.echo(output);
                    return false;
                });
                holodeck.addDotdChatCommand('citadel', function(deck,text) {
                SRDotDX.echo("Barrack Book = Grune N Quest<br>\
                Barrack Scroll 1 = Hydra NM Raid<br>\
                Barrack Scroll 2 = Research Library book<br>\
                Barrack Scroll 3<br>\
                Armorsmith Book = Lurking Horror N Quest<br>\
                Armorsmith Scroll 1 = Nalagarst NM Raid<br>\
                Armorsmith Scroll 2 = Research Library 1<br>\
                Armorsmith Scroll 3<br>\
                Weaponsmith Book = Erebus N Quest<br>\
                Weaponsmith Scroll 1 = Baroness NM Raid<br>\
                Weaponsmith Scroll 2 = Research Library 1<br>\
                Weaponsmith Scroll 3<br>\
                Alchemist Book = Nalagarst N Quest<br>\
                Alchemist Scroll 1 = Kalaxia N Quest<br>\
                Alchemist Scroll 2 = Research Library 5<br>\
                Alchemist Scroll 3<br>\
                Research Book = Bellarius N Quest<br>\
                Research Library Scroll 1 = Mardachus NM Raid<br>\
                Research Library Scroll 2 = Valanazes NM Raid<br>\
                Research Library Scroll 3 = Teremarthu NM Raid<br>\
                Research Library Scroll 4<br>\
                Research Library Scroll 5<br>\
                Pet Emporium Book = Not Available<br>\
                Pet Emporium 1 = Research Library 4<br>\
                Stable Book = Valanazes N Quest<br>\
                Stable Scroll 1 = Frog-men Assassins NM Raid<br>\
                Stable Scroll 2 = Research Library 2<br>\
                Stable Scroll 3<br>\
                Training Ground Book = Teremarthu N Quest<br>\
                Training Ground Scroll 1 = Research Library 3<br>\
                Training Ground Scroll 2");
                    return false;
                });
                holodeck.addDotdChatCommand('raid', function(deck,text) {
                    var p = /^\/raid (.*?)(?: ([1-6]))?$/i.exec(text);
                    if (p) {
                        var msg = '', n, i;
                        var diff = !isNaN(p[2]) ? p[2] - 1 : -1;
                        var fnd = p[1].toLowerCase();
                        for (i in SRDotDX.raids) {
                            if (SRDotDX.raids.hasOwnProperty(i)) {
                                var raid = SRDotDX.raids[i];
                                if (raid.name.toLowerCase().indexOf(fnd) > -1) {
                                    msg += '<a class="title" target="_blank" href="http://dotd.wikia.com/wiki/' + raid.name.replace(/ /g,'_').replace(/'/g,"%27") + '_(Raid)">' + raid.name + '</a>';
                                    msg += '<br>' + (raid.type == '' ? '' : raid.type + '<br>') + SRDotDX.raidSizes[raid.size].name + ' Raid (' + (raid.size == 101 ? 100 : raid.size) + ' slots) | ' + raid.duration + 'h';
                                    msg += '<br><table class="raids">';
                                    switch (diff) {
                                        case 0: msg += '<colgroup><col><col class="selected"><col><col><col></colgroup>'; break;
                                        case 1: msg += '<colgroup><col><col><col class="selected"><col><col></colgroup>'; break;
                                        case 2: msg += '<colgroup><col><col><col><col class="selected"><col></colgroup>'; break;
                                        case 3: msg += '<colgroup><col><col><col><col><col class="selected"></colgroup>'; break;
                                        default: msg += '<colgroup><col><col><col><col><col></colgroup>'; break;
                                    }
                                    var size = raid.size < 20 ? 10 : raid.size, fs = [], j = 4;
                                    while(j--) fs[j] = raid.health[j]/(size == 101 ? 100 : size);
                                    msg += '<thead> \
                                            <tr><th style="border:0; background-color: transparent;"></th><th>Normal</th><th>Hard</th><th>Legend</th><th>NMare</th></tr> \
                                        </thead> \
                                        <tbody> \
                                            <tr class="head"><td class="ep">HP</td><td>' + SRDotDX.util.getShortNum(raid.health[0]) + '</td><td>' + SRDotDX.util.getShortNum(raid.health[1]) + '</td><td>' + SRDotDX.util.getShortNum(raid.health[2]) + '</td><td>' + SRDotDX.util.getShortNum(raid.health[3]) + '</td></tr> \
                                            <tr class="head"><td class="ep">FS</td><td>' + SRDotDX.util.getShortNum(fs[0]) + '</td><td>' + SRDotDX.util.getShortNum(fs[1]) + '</td><td>' + SRDotDX.util.getShortNum(fs[2]) + '</td><td>' + SRDotDX.util.getShortNum(fs[3]) + '</td></tr> \
                                            <tr class="head split"><td class="ep">AP</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td><td>' + SRDotDX.util.getShortNum(fs[3]/2.0) + '</td></tr>';
                                    if (typeof raid.lt != 'object' && raid.id != 'rhalmarius_the_despoiler' && raid.id != 'grundus') {
                                        var ratio = SRDotDX.raidSizes[size].ratios;
                                        var ename = SRDotDX.raidSizes[size].enames;
                                        for(j=0; j<6; j++) {
                                            if (ratio[j] > 0) msg += '<tr><td class="ep">'+ename[j]+'</td><td>'+SRDotDX.util.getShortNum(fs[0]*ratio[j])+'</td><td>'+SRDotDX.util.getShortNum(fs[1]*ratio[j])+'</td><td>'+SRDotDX.util.getShortNum(fs[2]*ratio[j])+'</td><td>'+SRDotDX.util.getShortNum(fs[3]*ratio[j])+'</td></tr>';
                                        }
                                    }
                                    else if(typeof raid.lt == 'object') {
                                        var elen = SRDotDX.lootTiers[raid.lt[0]].tiers;
                                        var eleh = SRDotDX.lootTiers[raid.lt[1]].tiers;
                                        var elel = SRDotDX.lootTiers[raid.lt[2]].tiers;
                                        var elenm= SRDotDX.lootTiers[raid.lt[3]].tiers;
                                        var epics = SRDotDX.lootTiers[raid.lt[0]].epics;
                                        var best = SRDotDX.lootTiers[raid.lt[0]].best;
                                        for(j=0; j<epics.length; j++) {
                                            msg += '<tr'+(j==best?' class="best"':'')+'><td class="ep">'+epics[j]+'E</td><td>'+elen[j]+'</td><td>'+eleh[j]+'</td><td>'+elel[j]+'</td><td>'+elenm[j]+'</td></tr>';
                                        }
                                    }
                                    msg += '</tbody></table>'
                                }
                            }
                        }
                        if (msg != '') {
                            SRDotDX.echo('*loading....*');
                            setTimeout( function(){
                                var chats = document.getElementsByClassName('chat_message_window');
                                for (i=1; i<chats.length; i++) {
                                var elem = chats[i].getElementsBySelector('span[name="SRDotDX_DotDeXtension"]');
                                    if (typeof elem[elem.length-1] != 'undefined' && elem[elem.length-1].innerHTML.indexOf('loading....') > 0) {
                                        var ele = elem[elem.length-1];
                                        ele.innerHTML = ele.innerHTML.slice(0,-13) + msg;
                                        chats[i].scrollTop = chats[i].scrollHeight;
                                        break;
                                    }
                                }
                            }, 100);
                        }
                        else SRDotDX.echo('No raids found matching: ' + p[1]);
                    }
                    else SRDotDX.echo('<b>/raid</b>: Invalid parameters specified (<a href="#" onclick="SRDotDX.gui.help(\'raid\')">help</a>)');
                    return false;
                });
                window.onbeforeunload = function() { SRDotDX.config.save(false) };
                SRDotDX.fails = 0;
                console.log('[DotDX] Core loaded. Loading user interface...');
                SRDotDX.gui.load();
                SRDotDX.request.init();
                setTimeout(function() { delete SRDotDX.load }, 100);
            }
            else if (++SRDotDX.fails < 20) {
                console.log('[DotDX] Missing needed Kong resources (try:' + SRDotDX.fails + '), retrying in 0.75 second...');
                setTimeout( SRDotDX.load, 750);
            }
            else {
                console.log('[DotDX] Unable to locate required Kong resources. Loading aborted');
                setTimeout(function() { delete SRDotDX }, 1);
            }
        }
	};
	console.log('[DotDX] Initialized. Checking for needed Kong resources ...');
	SRDotDX.load();
}
if (window.top == window.self && (/^http:\/\/www\.kongregate\.com\/games\/5thplanetgames\/dawn-of-the-dragons(?:\/?$|\?|#)/i.test(document.location.href))) { //main
    console.log('[DotDX] Initializing ...');
    document.addEventListener("dotd.req", function(param) {
        var p = JSON.parse(param.data);
        p.callback = function (e, r) {
            this.onload = null;
            this.onerror = null;
            this.ontimeout = null;
            this.event = e;
            this.status = r.status;
            this.responseText = r.responseText;
            //console.log('[DotDX] Callback: ' + JSON.stringify(this));
            var c = document.createEvent("MessageEvent");
            if (c.initMessageEvent) c.initMessageEvent(this.eventName, false, false, JSON.stringify(this), document.location.protocol + "//" + document.location.hostname, 1, unsafeWindow, null);
            else c = new MessageEvent(this.eventName, {"origin": document.location.protocol + "//" + document.location.hostname, "lastEventId": 1, "source": unsafeWindow, "data": JSON.stringify(this)});
            document.dispatchEvent(c);
        };
        p.onload = p.callback.bind(p, "load");
        p.onerror = p.callback.bind(p, "error");
        p.ontimeout = p.callback.bind(p, "timeout");
        //setTimeout(function(){ GM_xmlhttpRequest(p) }, 0);
        GM_xmlhttpRequest(p);
    });
    var scr = document.createElement('script');
    scr.appendChild(document.createTextNode('(' + main + ')()'));
    (document.head || document.body || document.documentElement).appendChild(scr);
}