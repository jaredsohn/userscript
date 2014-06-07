// ==UserScript==
// @name           SRLoaTSX - wpatter6/JHunz
// @namespace      tag://kongregate
// @description    Easier Kongregate's Legacy of a Thousand Suns
// @author         SReject, chairmansteve, JHunz, wpatter6
// @version        0.1.8
// @date           09.02.2012
// @include        http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns*
// @include        *pastebin.com*
// @include        *web*.legacyofathousandsuns.com/kong*
// ==/UserScript==

function main() {
// if any1 needs a simple way to calculate damage: atk*4+def+legionpower*5
	if (typeof GM_setValue == 'undefined' || typeof GM_getValue == 'undefined' || typeof GM_deleteValue == 'undefined') {
		GM_setValue = function (name,value) {
			localStorage.setItem(name, (typeof value).substring(0,1) + value);
		}
		GM_getValue = function (name,dvalue) {
			var value = localStorage.getItem(name);
			if (typeof value != 'string') {
				return dvalue;
			}
			else {
				var type = value.substring(0,1);
				value = value.substring(1);
				if (type == 'b') {
					return (value == 'true');
				}
				else if (type == 'n') {
					return Number(value);
				}
				else {
					return value;
				}
			}
		}
		GM_deleteValue = function (name)  {
			localStorage.removeItem(name);
		}
	}
	window.FPX = {
		tooltip:(function(){
			var id = 'FPXtt';
			var top = 3;
			var left = 3;
			var maxw = 300;
			var speed = 10;
			var timer = 20;
			var endalpha = 95;
			var alpha = 0;
			var tt,t,c,b,h;
			var ie = document.all ? true : false;
			
			var tmp={};
			tmp.id = 'FPXtt';
			tmp.top = 3;
			tmp.left = 3;
			tmp.maxw = 300;
			tmp.speed = 10;
			tmp.timer = 20;
			tmp.endalpha = 95;
			tmp.alpha = 0;
			tmp.tt,tmp.t,tmp.c,tmp.b,tmp.h;
			tmp.ie = document.all ? true : false;
			
			tmp.show=function(v,w){
					if(tt == null){
						tt = document.createElement('div');
						tt.setAttribute('id',id);
						t = document.createElement('div');
						t.setAttribute('id',id + 'top');
						c = document.createElement('div');
						c.setAttribute('id',id + 'cont');
						b = document.createElement('div');
						b.setAttribute('id',id + 'bot');
						tt.appendChild(t);
						tt.appendChild(c);
						tt.appendChild(b);
						document.body.appendChild(tt);
						tt.style.opacity = 0;
						tt.style.filter = 'alpha(opacity=0)';
						document.onmousemove = this.pos;
					}
					tt.style.display = 'block';
					c.innerHTML = v;
					tt.style.width = w ? w + 'px' : 'auto';
					if(!w && ie){
						t.style.display = 'none';
						b.style.display = 'none';
						tt.style.width = tt.offsetWidth;
						t.style.display = 'block';
						b.style.display = 'block';
					}
					if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
						h = parseInt(tt.offsetHeight) + top;
						clearInterval(tt.timer);
						tt.timer = setInterval(function(){FPX.tooltip.fade(1)},timer);
				};
			tmp.pos=function(e){
					var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
					var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
					tt.style.top = (u - h) + 'px';
					tt.style.left = (l + left) + 'px';
				};
			tmp.fade=function(d){
					var a = alpha;
					if((a != endalpha && d == 1) || (a != 0 && d == -1)){
						var i = speed;
						if(endalpha - a < speed && d == 1){
							i = endalpha - a;
						}else if(alpha < speed && d == -1){
							i = a;
						}
						alpha = a + (i * d);
						tt.style.opacity = alpha * .01;
						tt.style.filter = 'alpha(opacity=' + alpha + ')';
					}else{
						clearInterval(tt.timer);
						if(d == -1){tt.style.display = 'none'}
					}
				};
				tmp.hide=function(){
					clearInterval(tt.timer);
					tt.timer = setInterval(function(){FPX.tooltip.fade(-1)},timer);
				};
			return tmp;
		})()
	}
	//dateformatting utilities
	window.dateFormat=function(){var token=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,timezone=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,timezoneClip=/[^-+\dA-Z]/g,pad=function(val,len){val=String(val);len=len||2;while(val.length<len)val="0"+val;return val};return function(date,mask,utc){var dF=dateFormat;if(arguments.length==1&&Object.prototype.toString.call(date)=="[object String]"&&!/\d/.test(date)){mask=date;date=undefined}date=date?new Date(date):new Date;if(isNaN(date))throw SyntaxError("invalid date");mask=String(dF.masks[mask]||mask||dF.masks["default"]);if(mask.slice(0,4)=="UTC:"){mask=mask.slice(4);utc=true}var _=utc?"getUTC":"get",d=date[_+"Date"](),D=date[_+"Day"](),m=date[_+"Month"](),y=date[_+"FullYear"](),H=date[_+"Hours"](),M=date[_+"Minutes"](),s=date[_+"Seconds"](),L=date[_+"Milliseconds"](),o=utc?0:date.getTimezoneOffset(),flags={d:d,dd:pad(d),ddd:dF.i18n.dayNames[D],dddd:dF.i18n.dayNames[D+7],m:m+1,mm:pad(m+1),mmm:dF.i18n.monthNames[m],mmmm:dF.i18n.monthNames[m+12],yy:String(y).slice(2),yyyy:y,h:H%12||12,hh:pad(H%12||12),H:H,HH:pad(H),M:M,MM:pad(M),s:s,ss:pad(s),l:pad(L,3),L:pad(L>99?Math.round(L/10):L),t:H<12?"a":"p",tt:H<12?"am":"pm",T:H<12?"A":"P",TT:H<12?"AM":"PM",Z:utc?"UTC":(String(date).match(timezone)||[""]).pop().replace(timezoneClip,""),o:(o>0?"-":"+")+pad(Math.floor(Math.abs(o)/60)*100+Math.abs(o)%60,4),S:["th","st","nd","rd"][d%10>3?0:(d%100-d%10!=10)*d%10]};return mask.replace(token,function($0){return $0 in flags?flags[$0]:$0.slice(1,$0.length-1)})}}();dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};
	window.timeSince=function(date,after){if(typeof date=='number')date=new Date(date);var seconds=Math.abs(Math.floor((new Date().getTime()-date.getTime())/1000));var interval=Math.floor(seconds/31536000);var pretext="about ";var posttext=" ago";if(after)posttext=" left";if(interval>=1){return pretext+interval+" year"+(interval==1?'':'s')+posttext}interval=Math.floor(seconds/2592000);if(interval>=1){return pretext+interval+" month"+(interval==1?'':'s')+posttext}interval=Math.floor(seconds/86400);if(interval>=1){return pretext+interval+" day"+(interval==1?'':'s')+posttext}interval=Math.floor(seconds/3600);if(interval>=1){return pretext+interval+" hour"+(interval==1?'':'s')+posttext}interval=Math.floor(seconds/60);if(interval>=1){return interval+" minute"+(interval==1?'':'s')+posttext}return Math.floor(seconds)+" seconds"+(seconds==1?'':'s')+posttext}
	window.isNumber=function(n) {return !isNaN(parseFloat(n)) && isFinite(n);}
	window.eliminateDuplicates=function(arr){var i,len=arr.length,out=[],obj={};for(i=0;i<len;i++){obj[arr[i]]=0}for(i in obj){out.push(i)}return out}
	
	window.SRLoaTSX = {
		version: {major: "0.1.7", minor: "wpatter6/JHunz"},
		echo: function(msg){holodeck.activeDialogue().SRLoaTSX_echo(msg)},
		config: (function(){
			try {
				var tmp = JSON.parse(GM_getValue("SRLoaTSX","{}"));
			}
			catch (e) {var tmp = {}}
			tmp.scrollbarFix = (typeof tmp.scrollbarFix == 'boolean'?tmp.scrollbarFix:true);
			tmp.splitLongMsgs = (typeof tmp.splitLongMsgs == 'boolean'?tmp.splitLongMsgs:true);
			tmp.hideRaidLinks = (typeof tmp.hideRaidLinks == 'boolean'?tmp.hideRaidLinks:false);
			tmp.hideVisitedRaids = (typeof tmp.hideVisitedRaids == 'boolean'?tmp.hideVisitedRaids:false);
			tmp.hideVisitedRaidsInRaidList = (typeof tmp.hideVisitedRaidsInRaidList == 'boolean'?tmp.hideVisitedRaidsInRaidList:false);
			tmp.hideSeenRaids = (typeof tmp.hideSeenRaids == 'boolean'?tmp.hideSeenRaids:false);
			tmp.FPXmarkRightClick = (typeof tmp.FPXmarkRightClick == 'boolean'?tmp.FPXmarkRightClick:false);
			tmp.markMyRaidsVisted = (typeof tmp.markMyRaidsVisted == 'boolean'?tmp.markMyRaidsVisted:false);
			tmp.whisperSpam = false;
			tmp.AutoJoinInterval = (typeof tmp.AutoJoinInterval == 'number'?tmp.AutoJoinInterval:1000);
			tmp.autoWhisper = (typeof tmp.autoWhisper == 'boolean'?tmp.autoWhisper:false);
			tmp.markImportedVisited = (typeof tmp.markImportedVisited == 'boolean'?tmp.markImportedVisited:false);
			tmp.prettyPost = (typeof tmp.prettyPost == 'boolean'?tmp.prettyPost:false);
			tmp.useMaxRaidCount = (typeof tmp.useMaxRaidCount =='boolean'?tmp.useMaxRaidCount:false);
			tmp.maxRaidCount = (!(typeof tmp.maxRaidCount === 'undefined')?tmp.maxRaidCount:3000);
			tmp.autoImportPaste = (typeof tmp.autoImportPaste =='boolean'?tmp.autoImportPaste:false);
			tmp.whisperTo = (typeof tmp.whisperTo == 'string'?tmp.whisperTo:'');
			tmp.showRaidLink = (typeof tmp.showRaidLink == 'boolean'?tmp.showRaidLink:(navigator.userAgent.toLowerCase().indexOf('chrome')>-1));
			tmp.formatLinkOutput = (typeof tmp.formatLinkOutput == 'boolean'?tmp.formatLinkOutput:false);
			tmp.FPXoptsMarkRightClickDelay = (typeof tmp.FPXoptsMarkRightClickDelay == 'number'?tmp.FPXoptsMarkRightClickDelay:2000);
			tmp.FPXdisplayListImgLink = (typeof tmp.FPXdisplayListImgLink == 'boolean'?tmp.FPXdisplayListImgLink:false);
			tmp.formatRaidLinks = (typeof tmp.formatRaidLinks == 'boolean'?tmp.formatRaidLinks:true);
			tmp.raidLinkFormat = (typeof tmp.raidLinkFormat == 'string'?tmp.raidLinkFormat:"<seen:(s) ><visited:(v) ><shortname> - <diff> - <fs>/<os>");
			tmp.raidLinkFormat = tmp.raidLinkFormat.replace(/&#91;/g,"[").replace(/&#93;/g,"]").replace(/&#123;/g,"{").replace(/&#125;/g,"}")
			tmp.unvisitedRaidPruningMode = (typeof tmp.unvisitedRaidPruningMode == 'number'? tmp.unvisitedRaidPruningMode : 1);
			if (typeof tmp.raidList != 'object')tmp.raidList = {};
			if (typeof tmp.pasteList != 'object')tmp.pasteList = {};

			// Raid list indexing upgrade code
			tmp.pendingRaidListIndexingChange = (typeof tmp.pendingRaidListIndexingChange == 'boolean'?tmp.pendingRaidListIndexingChange:true);
			if (tmp.pendingRaidListIndexingChange == true) {
				var raidList2 = {};

				for (var hash in tmp.raidList) {
					if (tmp.raidList.hasOwnProperty(hash)) {
						raidList2[tmp.raidList[hash].id] = tmp.raidList[hash];
					}
				}

				tmp.raidList = raidList2;
				tmp.pendingRaidListIndexingChange = false;
			}

			// Delete expired raids
			for (var id in tmp.raidList){
				if (tmp.raidList.hasOwnProperty(id)) {
					tmp.raidList[id].timeLeft = function (){
						return this.expTime - parseInt((new Date).getTime() / 1000);
					}
					if (tmp.raidList[id].timeLeft() < 0) {
						delete tmp.raidList[id];
					}
				}
			}

			if (typeof tmp.filters != 'object') {
				tmp.filters = {}
			}

			// Default filtering settings filter out guild raids and personal raids from chat
			tmp.getFilter = function(raidid,diffIndex) {
				// Upgrade from raid id filtering to raid id/difficulty filtering data structure
				if (typeof SRLoaTSX.config.filters[raidid] == 'boolean') {
					var tempVal = SRLoaTSX.config.filters[raidid];
					SRLoaTSX.config.filters[raidid] = [tempVal, tempVal, tempVal, tempVal, tempVal, tempVal];
				} else if ((typeof SRLoaTSX.config.filters[raidid] != 'boolean') && (typeof SRLoaTSX.config.filters[raidid] != 'object')) {
					var raid = SRLoaTSX.raids[raidid];
					if (raid.size == 1 || raid.stat == 'H' || raid.stat == 'h') {
						SRLoaTSX.config.filters[raidid] = [true, true, true, true, true, true];
					} else {
						SRLoaTSX.config.filters[raidid] = [false, false, false, false, false];
					}
				}
					
				return SRLoaTSX.config.filters[raidid][diffIndex];
			}
			tmp.setFilter = function(raidid,diff,val) {
				SRLoaTSX.config.filters[raidid][diff] = val;
			}

			tmp.filterChatLinks = (typeof tmp.filterChatLinks == 'boolean'?tmp.filterChatLinks:true);
			tmp.filterRaidList = (typeof tmp.filterRaidList == 'boolean'?tmp.filterRaidList:false);
			tmp.newRaidsAtTopOfList = (typeof tmp.newRaidsAtTopOfList == 'boolean'?tmp.newRaidsAtTopOfList:false);

			// Update old default for right click delay
			// It's obvious this wasn't widely used, because a bug was preventing saving any value except the default
			if (tmp.FPXoptsMarkRightClickDelay == 8000) { tmp.FPXoptsMarkRightClickDelay = 2000; }

			GM_setValue("SRLoaTSX",JSON.stringify(tmp));
			tmp.addRaid = function(hash,id,boss,diff,seen,visited,user,ts,room) {
				if (typeof SRLoaTSX.config.getRaid(id) != 'object') {
					SRLoaTSX.config.raidList[id] = {
						hash: hash,
						id: id,
						boss: boss,
						diff: diff,
						seen: seen,
						visited: visited,
						user: user,
						lastUser: user,
						expTime: (typeof SRLoaTSX.raids[boss] == 'object'?SRLoaTSX.raids[boss].duration:168) * 3600+parseInt((new Date).getTime() / 1000),
						timeLeft: function (){return this.expTime - parseInt((new Date).getTime() / 1000)},
						timeStamp: ((typeof ts ==='undefined'||ts==null)?(new Date().getTime()):parseInt(ts)),
						room: ((typeof room ==='undefined'||room==null)?SRLoaTSX.getRoomName():parseInt(room))
					}
					SRLoaTSX.gui.addRaid(id);
					//onNewRaid
					SRLoaTSX.purge();
				}
				SRLoaTSX.config.raidList[id].lastUser = user;
				return SRLoaTSX.config.raidList[id]
			}
			tmp.addPaste = function(url,id,user){
				if (typeof SRLoaTSX.config.getPaste(id) != 'object') {
					SRLoaTSX.config.pasteList[id]={
						url: url,
						id: id,
						user: user,
						lastUser: user,
						timeStamp: new Date().getTime()
					}
					console.log("[SRLoaTSX] New pastebin added " + id + " : " + user)
					//onNewPastie
					//TODO ADD TO GUI/PURGE
				}
				SRLoaTSX.config.pasteList[id].lastuser = user;
				return SRLoaTSX.config.pasteList[id]				
			}
			tmp.export = function () {
				SRLoaTSX.config.save();
				window.prompt("Export Data:",JSON.stringify(SRLoaTSX.config));
			}
			tmp.getRaid = function(id) {
				if (typeof SRLoaTSX.config.raidList[id] == 'object') {
					if (SRLoaTSX.config.raidList[id].timeLeft() > 1) {
						return SRLoaTSX.config.raidList[id];
					}
					else {
						delete SRLoaTSX.config.raidList[id];
					}
				}
			}
			tmp.getPaste = function(id) {
				if (typeof SRLoaTSX.config.pasteList[id] == 'object') {
					console.log("[SRLoaTSX] Returning paste " + id);
					return SRLoaTSX.config.pasteList[id];
				}
			}
			tmp.import = function (data) {
			}
			tmp.save = function (b) {
				b = (typeof b==='undefined'?true:b);
				for (var id in SRLoaTSX.config.raidList){
					if (SRLoaTSX.config.raidList.hasOwnProperty(id) && SRLoaTSX.config.raidList[id].timeLeft <= 0) {
						delete SRLoaTSX.config.raidList[id];
						SRLoaTSX.gui.raidListRemoveById(id);
					}
				}
				var a = SRLoaTSX.config.raidFormat;
				SRLoaTSX.config.raidFormat = SRLoaTSX.config.raidLinkFormat.replace(/\{/g,"&#123;").replace(/\}/g,"&#125;").replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")
				GM_setValue("SRLoaTSX",JSON.stringify(SRLoaTSX.config));
				SRLoaTSX.config.raidFormat = a;
				if(b) setTimeout("SRLoaTSX.config.save(true);",30000);
				console.log("[SRLoaTSX] Config saved (repeat="+b+")");
			}
			return tmp;
		})(),
		purge: function() {
			var el = document.getElementById('raid_list');
			if(el){
				var diff = el.childNodes.length - SRLoaTSX.config.maxRaidCount;
				if(SRLoaTSX.config.useMaxRaidCount && diff > 0){
					if(!SRLoaTSX.gui.Importing){
						console.log("[SRLoaTSX] Purging started " + diff);
						var uraids = SRLoaTSX.gui.GetUnvisitedRaids();
						uraids.sort(function(a,b){
							if(!(typeof a.timeStamp === 'undefined' || typeof b.timeStamp === 'undefined'))
								if(a.timeStamp < b.timeStamp) return -1;
							return 1;
						});
						var i=0, total=0;;
						while(i<uraids.length && diff > 0){
							if((new Date).getTime() - uraids[i].timeStamp > 60000){//only if it's older than 1 hour
								console.log('[SRLoaTSX] Purging ' + uraids[i].id);
								SRLoaTSX.gui.deleteRaid(uraids[i].ele.getElementsByClassName("FPXDeleteLink")[0], uraids[i].id);
								i++;
								diff--;
							} else break;
						}
						total += i;
						i=0;
						if(diff > 0){
							var raids = SRLoaTSX.gui.GetAllRaids();
							raids.sort(function(a,b){
								if(!(typeof a.timeStamp === 'undefined' || typeof b.timeStamp === 'undefined'))
									if(a.timeStamp < b.timeStamp) return -1;
								return 1;
							});
							while(i<raids.length && diff > 0){
								if((new Date).getTime() - uraids[i].timeStamp > 60000){//only if it's older than 1 hour
									console.log('[SRLoaTSX] Purging ' + raids[i].id);
									SRLoaTSX.gui.deleteRaid(raids[i].ele.getElementsByClassName("FPXDeleteLink")[0], raids[i].id);
									i++;
									diff--;
								} else break;
							}
						}
						total += i;
						SRLoaTSX.gui.doStatusOutput('Maximum raid count exceeded. ' + total + ' old raids purged.');
						console.log("[SRLoaTSX] Purging ended");
					}else setTimeout("SRLoaTSX.purge();", 1000);
				}
			}
		},
		getRaidDetailsBase: function(url) {
			//if(!/^http:\/\/www\.kongregate\.com\/games\/5thplanetgames\/legacy-of-a-thousand-suns(?:\/?$|\?|#)/i.test(url)) return null;//added security for pastebin import
			var r = {diff: '', hash: '', boss: '', id: ''};
			var reg = /[?&]([^=]+)=([^?&]+)/ig, p = url.replace(/&amp;/gi,"&");
			while ((i = reg.exec(p)) != null) {
				if (!r.diff && i[1] == 'kv_difficulty'){
					r.diff=parseInt(i[2])
				}
				else if (!r.hash && i[1] == 'kv_hash'){
					r.hash=i[2]
				}
				else if (!r.boss && i[1] == 'kv_raid_boss'){
					r.boss=i[2]
				}
				else if (!r.id && i[1] == 'kv_raid_id'){
					r.id=i[2]
				}
				else if (i[1] != 'kv_action_type'){
					return
				}
			}
			if (typeof r != 'undefined' && typeof r.diff != 'undefined' && typeof r.hash != 'undefined' && typeof r.boss != 'undefined' && typeof r.id != 'undefined') {
				r.diffLongText = ['Normal','Hard','Legendary','Nightmare','Insane','Hell'][r.diff-1];
				r.diffShortText = ['N','H','L','NM','I','HL'][r.diff-1];
				
				var stats = SRLoaTSX.raids[r.boss];
				if (typeof stats == 'object') {
					r.name = stats.name;
					r.shortname = stats.shortname;
					r.size = stats.size;
					r.dur = stats.duration;
					r.durText = stats.dur + "hrs";
					r.stat = stats.stat;
					r.statText = SRLoaTSX.getStatText(stats.stat);
					if (!isNaN(stats.health[r.diff-1])) {
						r.health = stats.health[r.diff-1];
						r.healthText = SRLoaTSX.getShortNum(r.health);
						if (r.boss == "dragons_lair") {
							r.fairShareText = "";
						} else {
							r.fairShare = r.health / r.size;
							r.fairShareText = SRLoaTSX.getShortNum(r.fairShare);

						}

						if (typeof stats.loottiers == 'object' && typeof stats.loottiers[r.diff-1] == 'object') {
							var tiers = stats.loottiers[r.diff-1];
							var text = 'Tiered loot: ' + SRLoaTSX.getLootTierText(stats.id,(r.diff - 1));
							r.optimalShare = 0;
							r.optimalShareText = text;

						} else {

							r.optimalShare = r.fairShare * {"1": 1, "10":1.25, "13":1.25, "50": 2.2, "100":2.3, "250": 1, "500": 1.5}[r.size];					
							r.optimalShareText = SRLoaTSX.getShortNum(r.optimalShare);
						}
						
					}
					else if (stats.health[0] == 'Unlimited') {
						r.health = '';
						r.healthText = 'Unlimited';
						if (typeof stats.loottiers == 'object' && typeof stats.loottiers[r.diff-1] == 'object' && stats.loottiers[r.diff-1][0]) {
							// TODO: At some point, make the numeric FS/OS numbers here line up with the correct textual ones
							r.fairshare = 1000000000;
							r.optimalShare = 1000000000;
							r.fairShareText = stats.loottiers[r.diff-1][0];
							r.optimalShareText = stats.loottiers[r.diff-1][stats.loottiers[r.diff-1].length-1];
						} else {
							r.fairShare = 1000000000;
							r.fairShareText = SRLoaTSX.getShortNum(r.fairShare);
							r.optimalShare = 1000000000;
							r.optimalShareText = SRLoaTSX.getShortNum(r.optimalShare);
						}
					}
					else {
						r.health = '';
						r.healthText = 'Unknown';
						r.fairShare = '';
						r.fairShareText = 'Unknown';
						r.fairShare = '';
						r.optimalShareText = 'Unknown';
					} 
				}
			}
			return r;
		},
		getPasteDetails: function(url, user) {
			user=(user?user:'');
			var pb = {url: url, id: url.substring(url.length-8)};
			pb.id = url.substring(url.length-8);
			console.log("[SRLoaTSX] Getting paste");
			var info = SRLoaTSX.config.getPaste(pb.id);
			console.log(typeof info);
			if(typeof info === 'undefined'){
				info = SRLoaTSX.config.addPaste(pb.url, pb.id, user);
				if(typeof info == 'object'){
					console.log("[SRLoaTSX] Paste is new");
					pb.isNew = true;
				}
			} else pb.isNew = false;
			pb.user = info.user;
			pb.lastUser = info.lastUser;
			//pb.seen = info.seen;
			//pb.linkText = function () { //TODO
			//	if (SRLoaTSX.config.formatPasteLinks){
			//		var txt = SRLoaTSX.config.pasteLinkFormat;
			//	}
			//}
			return pb;
		},
		getRaidDetails: function(url,user,visited,seen,ts,room) {
			user=(user?user:'');
			visited=(visited?visited:(user==active_user.username() && SRLoaTSX.config.markMyRaidsVisted));
			seen=(seen?seen:false);
			var i;
			var r = SRLoaTSX.getRaidDetailsBase(url);
			if (typeof r != 'undefined' && typeof r.diff != 'undefined' && typeof r.hash != 'undefined' && typeof r.boss != 'undefined' && typeof r.id != 'undefined') {
				var info = SRLoaTSX.config.getRaid(r.id);
				if (typeof info != 'object') {
					info = SRLoaTSX.config.addRaid(r.hash, r.id, r.boss, r.diff,visited,seen,user,ts,room)
					if(typeof info == 'object') r.isNew = true;
					//inserting new raid
				} else r.isNew = false;
				r.timeStamp = info.timeStamp;
				r.seen = info.seen;
				r.visited = info.visited;

				r.linkText = function () {
					if (SRLoaTSX.config.formatRaidLinks){
						var txt = SRLoaTSX.config.raidLinkFormat;
						txt = txt.replace(/<visited:([^>]*)>/gi,(this.visited?"$1":""));
						txt = txt.replace(/<seen:([^>]*)>/gi,(this.seen?"$1":""));
						txt = txt.replace(/<diff>/gi,this.diffShortText);
						txt = txt.replace(/<diff:Num>/gi,this.diff);
						txt = txt.replace(/<diff:Long>/gi,this.diffLongText);
						txt = txt.replace(/<bossId>/gi,this.boss);
						txt = txt.replace(/<raidId>/gi,this.id);
						txt = txt.replace(/<hash>/gi,this.hash);
						txt = txt.replace(/<name>/gi,(!this.name?'Unknown':this.name));
						txt = txt.replace(/<shortname>/gi,(!this.name?'Unknown':SRLoaTSX.raids[this.boss].shortname));
						txt = txt.replace(/<size>/gi,(!this.name?'':this.size));
						txt = txt.replace(/<dur>/gi,(!this.name?'':this.durText));
						txt = txt.replace(/<dur:Num>/gi,(!this.name?'':this.dur));
						txt = txt.replace(/<stat>/gi,(!this.name?'':this.stat));
						txt = txt.replace(/<stat:Long>/gi,(!this.name?'':this.statText));
						txt = txt.replace(/<health>/gi,(!this.name?'':this.healthText));
						txt = txt.replace(/<health:Num>/gi,(!this.name?'':this.health));
						txt = txt.replace(/<fs>/gi,(!this.name?'':this.fairShareText));
						txt = txt.replace(/<fs:Num>/gi,(!this.name?'':this.fairShare));
						txt = txt.replace(/<os>/gi,(!this.name?'':this.optimalShareText));
						txt = txt.replace(/<os:Num>/gi,(!this.name?'':this.optimalShare));	
						txt = txt.replace(/</g,"&lt;").replace(/>/g,"&gt;");
						return txt.replace(/&lt;image&gt;/gi,'<image src="http://cdn2.kongregate.com/game_icons/0033/2679/i.gif" style="vertical-align: text-top; float: left;">');
					}
					else {
						return '<image src="http://cdn2.kongregate.com/game_icons/0033/2679/i.gif" style="vertical-align: text-top"> Legacy of a Thousand Suns'
					}
				}
				return r;
			}
		},
		browser: {
			ff:(navigator.userAgent.toLowerCase().indexOf("firefox")>-1),
			chrome:(navigator.userAgent.toLowerCase().indexOf('chrome')>-1)
		},
		getRaidLink: function (msg,user) {
			msg = msg.replace(/[\r\n]/g,"");
			var m = /^((?:(?!<a[ >]).)*)<a.*? href="((?:(?:https?:\/\/)?(?:www\.)?kongregate\.com)?\/games\/5thPlanetGames\/legacy-of-a-thousand-suns(\?[^"]+))".*?<\/a>((?:(?!<\/?a[ >]).)*(?:<a.*? class="reply_link"[> ].*)?)$/i.exec(msg);
			if (m) {
				var raid = SRLoaTSX.getRaidDetails(m[3],user)
				if (typeof raid != 'undefined' && typeof raid != 'null') {
					raid.ptext = m[1];
					raid.url = m[2];
					raid.ntext = m[4];
					return raid;
				}
			}
		},
		getPastebinLink: function (msg, user, pub) {
			msg = msg.replace(/[\r\n]/g,"");
			var m = /^((?:(?!<a[ >]).)*)?http:\/\/pastebin\.com\/\w{8}((?:(?!<\/?a[ >]).)*(?:<a.*? class="reply_link"[> ].*)?)$/i.exec(msg);
			if (m) {
				console.log("[SRLoaTSX] Getting paste details");
				var pb = SRLoaTSX.getPasteDetails(/http:\/\/pastebin\.com\/\w{8}/i.exec(m[0])+"",pub?user:active_user.username());
				if(!(typeof pb === 'undefined' || typeof pb === 'null')){	
					pb.ptext = m[1]||"";
					pb.ntext = m[2]||"";
				}
				return pb;
			}
		},
		getRoomName: function() {
			var els = document.getElementsByClassName('room_name_container');
			for(var i=0;i<els.length;i++){
				if(els[i].innerHTML.indexOf('Room') > -1){
					var ret = els[i].firstChild.nextSibling.innerHTML
					if(ret.indexOf('#') > -1) return parseInt(ret.substring(ret.indexOf('#')+1, ret.length));
					return null
				}
			}
			return null
		},
		getShortNum: function (num) {
			if (isNaN(num) || num < 0){return num}
			else if (num>=1000000000000){return (num/1000000000000).toFixed(3)/1+"T"}
			else if (num>=1000000000){return (num/1000000000).toFixed(2)/1+"B"}
			else if (num>=1000000){return (num/1000000).toFixed(2)/1+"M"}
			else if (num>=1000){return (num/1000).toFixed(1)/1+"K"}
			else if (num>0){return num+""}
		},
		getStatText: function (stat) {
			stat=stat.toLowerCase();
			var r="";
			if (stat=='?'||stat=='Unknown')return 'Unknown';
			if (stat.indexOf("s")>-1)r="Stamina";
			if (stat.indexOf("h")>-1)r+=(r!=''?(stat.indexOf("e")>-1?", ":" and "):"")+"Honor";
			if (stat.indexOf("e")>-1)r+=(r!=''?" and ":"")+"Energy";
			return r;
		},
		getLootTierText: function (raidid, diffIndex) {
			if (typeof SRLoaTSX.raids[raidid] != 'object' || typeof SRLoaTSX.raids[raidid].loottiers != 'object' || typeof SRLoaTSX.raids[raidid].loottiers[diffIndex] != 'object') {
				return "";
			}
			var tiers = SRLoaTSX.raids[raidid].loottiers[diffIndex];
			var text = tiers[0];
			for (var i = 1;i<tiers.length;i+=1) {
				text = text + "/" + tiers[i] + " ";
			}
			return text;
		},
		gui: {
			addRaid: function (id) {
				var r = id;
				if(typeof id == "string" || typeof id == "number") r = SRLoaTSX.config.raidList[id];
				if (r.boss) {
					var rd = SRLoaTSX.raids[r.boss];
					var a = document.getElementById("raid_list");
					if (typeof a != 'undefined' && a) { 
						var b = 1
						if (a.hasChildNodes()) b += a.childNodes.length;
						var info = '<hr>';
						if (typeof rd != 'object') {
							rd = {name: 'Unknown'};
							info += '<div style="float: left;width: 49%;">Posted By:<br>In Room:<br>Timestamp:<br><br><hr>Boss Id:<br>Difficulty:</div>';
							info += '<div style="width: 49%; float: right; text-align: right;">'
							info += (r.user != ''?r.user:'Unknown')+"<br>";
							info += ((r.room!='undefined'&&r.room!= null&& r.room!= '')?r.room:'Unknown')+"<br>";
							info += (typeof r.timeStamp == 'number'?dateFormat(new Date(r.timeStamp), 'ddd, h:MM TT') :'Unknown')+"<br>";
							info += (typeof r.timeStamp == 'number'?'<span id="timeSince_'+r.id+'">'+timeSince(new Date(r.timeStamp))+'</span>' :'Unknown')+"<hr>";
							info += r.boss+"<br>";
							info += ["Normal","Hard","Legendary","Nightmare","Insane","Hell"][r.diff -1]+"</div>";
						}
						else if (rd.health[r.diff-1] == 'Unlimited') {
							info += '<div style="float: left;width: 49%;">Posted By:<br>In Room:<br>Timestamp:<br><br><hr>Stat Used:<br>Difficulty:<br>Health:<br>Best Share:</div>';
							info += '<div style="width: 49%; float: right; text-align: right;">'
							info += (r.user != ''?r.user:'Unknown')+"<br>";
							info += ((r.room!='undefined'&&r.room!= null&& r.room!= '')?r.room:'Unknown')+"<br>";
							info += (typeof r.timeStamp == 'number'?dateFormat(new Date(r.timeStamp), 'ddd, h:MM TT') :'Unknown')+"<br>";
							info += (typeof r.timeStamp == 'number'?'<span id="timeSince_'+r.id+'">'+timeSince(new Date(r.timeStamp))+'</span>' :'Unknown')+"<hr>";
							info += rd.stat+"<br>";
							info += ["Normal","Hard","Legendary","Nightmare","Insane","Hell"][r.diff -1]+"<br>";	
							info += "Unlimited<br>";
							if (typeof rd.loottiers == 'object' && typeof rd.loottiers[r.diff-1] == 'object') {
								info += rd.loottiers[r.diff-1][rd.loottiers[r.diff-1].length-1] + "</div>";								
							} else {
								info += "Unlisted</div>";
							}
						}
						
						else if (!isNaN(rd.health[r.diff-1])) {
							var h = rd.health[r.diff -1];
							var f = h / rd.size;
							var o = f * {"1":1, "10":1.25, "50":2.2, "100":2.3, "250":1,"500":1.5}[rd.size];
							info += '<div style="float: left; width: 49%;">';
							info += 'Posted By:<br>In Room:<br>Timestamp:<br><br><hr>Difficulty:<br>Stats Used:<br>Size:<br>Health:<br>';
							if (typeof rd.loottiers == 'object' && typeof rd.loottiers[r.diff-1] == 'object') {
								info += 'Loot tiers:</div>';
							}
							else {
								info += 'Fair Share:<br>Optimal Share:</div>';
							}
							info += '<div style="float: right; width: 49%;text-align: right;">';
							info += (r.user != ''?r.user:'Unknown')+"<br>";
							info += ((r.room!='undefined'&&r.room!= null&& r.room!= '')?r.room:'Unknown')+"<br>";
							info += (typeof r.timeStamp == 'number'?dateFormat(new Date(r.timeStamp), 'ddd, h:MM TT') :'Unknown')+"<br>";
							info += (typeof r.timeStamp == 'number'?'<span id="timeSince_'+r.id+'">'+timeSince(new Date(r.timeStamp))+'</span>' :'Unknown')+"<hr>";
							info += ["Normal","Hard","Legendary","Nightmare","Insane","Hell"][r.diff -1]+"<br>";
							info += rd.stat+"<br>";
							info += rd.size+"<br>";
							info += SRLoaTSX.getShortNum(h)+"<br>";
							if (typeof rd.loottiers == 'object' && typeof rd.loottiers[r.diff-1] == 'object') {
								info += SRLoaTSX.getLootTierText(rd.id,(r.diff-1)) + "</div>";
							} else {
								info += SRLoaTSX.getShortNum(f)+"<br>";
								info += SRLoaTSX.getShortNum(o)+"</div>";
							}
						}
						else {
							info += '<div style="float: left; width: 49%;">';
							info += 'Posted By:<br>In Room:<br>Timestamp:<br><br><hr>Difficulty:<br>Stats Used:<br>Size:<br>Health:<br>Fair Share:<br>Optimal Share:</div>';
							info += '<div style="float: right; width: 49%;text-align: right;">';
							info += (r.user != ''?r.user:'Unknown')+"<br>";
							info += ((r.room!='undefined'&&r.room!= null&& r.room!= '')?r.room:'Unknown')+"<br>";
							info += (typeof r.timeStamp == 'number'?dateFormat(new Date(r.timeStamp), 'ddd, h:MM TT') :'Unknown')+"<br>";
							info += (typeof r.timeStamp == 'number'?'<span id="timeSince_'+r.id+'">'+'<span id="timeSince_'+r.id+'">'+timeSince(new Date(r.timeStamp))+'</span>'+'</span>':'Unknown')+"<hr>";
							info += ["Normal","Hard","Legendary","Nightmare","Insane","Hell"][r.diff -1]+"<br>";
							info += rd.stat+"<br>";
							info += rd.size+"<br>";
							info += "Unknown<br>";
							info += "Unknown<br>";
							info += "Unknown</div>";
						}
						info += '<div style="clear: both"></div><hr>';
						info += '<center><table><tr>';
						info += '<td style="width: 70px"><input class="FPXcbSeen" type="checkbox" '+(r.seen == true?' checked="checked"':'')+'> Seen</td>';
						info += '<td style="width: 70px"><input class="FPXcbVisited" type="checkbox" '+(r.visited == true?' checked="checked"':'')+'> Visited</td>';
						info += '</tr></table></center>';

						var url = "/games/5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_difficulty="+r.diff+"&kv_hash="+r.hash+"&kv_raid_boss="+r.boss+"&kv_raid_id="+r.id;
						var filterClass = " SRLoaTSX_filteredRaidList" + rd.id + '_' + (r.diff - 1);
						var visitedClass = (r.visited == true ? " SRLoaTSX_visitedRaidList" : "");
						var lii = SRLoaTSX.gui.cHTML('div').set({
							class: 'raid_list_item raid_list_item_'+ r.id + filterClass + visitedClass,
							style: b%2==0?'background-color:#e0e0e0':'',
							raidId: r.id,
							raidHash: r.hash,
							raidDiff: r.diff,
							raidBoss: r.boss,
							raidVisited: r.visited,
							raidSeen: r.seen,
						});
						if (SRLoaTSX.config.newRaidsAtTopOfRaidList == true) {
							var arr = a.getElementsByClassName("raid_list_item");
							if (arr.length > 0) {
								lii.attach("before",arr[0]);
							} else {
								lii.attach("to",a);
							}
						} else {
							lii.attach("to",a);
						}
						var li = lii.ele();

						
						var rh;

						var diffColor = "";
						var diffText = "";
						if (r.diff == 1) {
							diffColor = "#00BB00";
							diffText = "N";
						} else if (r.diff == 2) {
							diffColor = "#DDAA00";
							diffText = "H";
						} else if (r.diff == 3) {
							diffColor = "#FF0000";
							diffText = "L";
						} else if (r.diff == 4) {
							diffColor = "#BB00BB";
							diffText = "NM";
						}

						if(SRLoaTSX.config.FPXdisplayListImgLink){
							rh=SRLoaTSX.gui.cHTML('div').set({class: 'raid_list_item_head'}).html(' \
								<a href="'+url+'" class="link">' + rd.name + '</a> \
								<span class="link" style="font-weight: normal !important; float: right"><a class="FPXDeleteLink" href="#">delete</a></span> \
								<a class="FPXlink" href="'+url+'" ></a> \
								<span class="RaidQuickLink">[</span><a style="color:blue; text-decoration:underline; cursor:pointer" class="RaidQuickLink" href="'+url+'">Link</a><span class="RaidQuickLink">]</span> \
								<span class="FPXtext">' + rd.name + '</span> <span class="FPXtext" style="float: right">'+(r.visited?'visited':'')+'</span><span class="FPXtext" style="display: block; width: 25px; float: left; font-weight: bold; color: ' + diffColor + ';">' + diffText + '</span> \
							').attach("to",li).ele()/* .addEventListener("click",function(e) {
								var con = document.getElementById("raid_list").getElementsByClassName("active");
								if (con.length == 1) con[0].className = con[0].className.replace(/ active/gi,"");
								this.parentNode.className += " active";
							}) */;
						}else{
							rh=SRLoaTSX.gui.cHTML('div').set({class: 'raid_list_item_head'}).html(' \
								<a href="'+url+'" class="link">' + rd.name + '</a> \
								<span class="link" style="font-weight: normal !important; float: right"><a class="FPXDeleteLink" href="#">delete</a></span> \
								<span class="RaidQuickLink">[</span><a style="color:blue; text-decoration:underline; cursor:pointer" class="RaidQuickLink" href="'+url+'">Link</a><span class="RaidQuickLink">]</span> \
								<span class="FPXtext">' + rd.name + '</span> <span class="FPXtext" style="float: right">'+(r.visited?'visited':'')+'</span><span class="FPXtext" style="display: block; width: 25px; float: left; font-weight: bold; color: ' + diffColor + ';">' + diffText + '</span> \
							').attach("to",li).ele()/* .addEventListener("click",function(e) {
								var con = document.getElementById("raid_list").getElementsByClassName("active");
								if (con.length == 1) con[0].className = con[0].className.replace(/ active/gi,"");
								this.parentNode.className += " active";
							}) */;
						}
						var ri = SRLoaTSX.gui.cHTML('div').set({
							class: 'raid_list_item_info'
						}).html(info).attach("to",li);
					}
				}
				else {
					delete SRLoaTSX.config.raidList[a];
				}
			},
			cHTML: function (ele) {
				function cEle(ele) {
					this._ele = ele;
					this.ele = function(){
						return this._ele
					}
					this.set = function (param) {
						for (var attr in param) {
							if (param.hasOwnProperty(attr)) {
								this._ele.setAttribute(attr,param[attr]);
							}
						}
						return this
					}
					this.text = function(text){
						this._ele.appendChild(document.createTextNode(text));
						return this
					}
					this.html = function(text,overwrite){
						if (overwrite){
							this._ele.innerHTML=text
						}
						else {
							this._ele.innerHTML+=text
						}
						return this
					}
					this.attach = function (method,ele) {
						if (typeof ele == 'string') ele = document.getElementById(ele);
						if (!(ele instanceof Node)){
							throw "Invalid attachment element specified"
						}
						else if (!/^(?:to|before|after)$/i.test(method)){
							throw "Invalid append method specified"
						}
						else if (method == 'to'){
							ele.appendChild(this._ele)
						}
						else if (method == 'before'){
							ele.parentNode.insertBefore(this._ele,ele)
						}
						else if (typeof ele.nextSibling == 'undefined'){
							ele.parentNode.appendChild(this._ele)
						}
						else {
							ele.parentNode.insertBefore(this._ele,ele.nextSibling)
						}
						return this;
					}
					this.on=function(event,func,bubble){
						this._ele.addEventListener(event,func,bubble);
						return this;
					}
				}
				if (typeof ele == "string"){
					ele = (/^#/i.test(ele)?document.getElementById(ele.substring(1)):document.createElement(ele));
				}
				if (ele instanceof Node){
					return new cEle(ele)
				}
				else {
					throw "Invalid element type specified"
				}
			},
			errorMessage: function(s, tag){
				tag=(typeof tag==='undefined'?'b':tag);
				SRLoaTSX.gui.doStatusOutput('<'+tag+'>'+s+'</'+tag+'>');
			},
			updateMessage: function () {
				SRLoaTSX.gui.doStatusOutput(SRLoaTSX.gui.standardMessage(), false);
			},
			postingMessage: function(i, ct) {
				SRLoaTSX.gui.doStatusOutput('Posting message ' + i + (typeof ct==='undefined'?'': ' of ' + ct + '...'), false);
			},
			standardMessage: function (){//message to show 
				return 'JHunz/wpatter6 - <span class="room_name_container h6_alt mbs">' +document.getElementById("raid_list").childNodes.length + ' raids stored</span>';
			},
			doStatusOutput: function (str, msecs){
				msecs=(typeof msecs === 'undefined'?4000:msecs);
				var el = document.getElementById('StatusOutput');
				el.innerHTML=str;
				if(msecs)setTimeout(function(){ el.innerHTML=SRLoaTSX.gui.standardMessage(); }, msecs);
			},
			raidsTabClicked: function (){
				var els = document.getElementsByClassName("SRLoaTSX_NewRaidsCount");
				for(var i=0;i<els.length;i++){
					i.innerHTML='0';
				}
			},
			toggleDisplay: function(el, sender){
				if(typeof el == "string") el = document.getElementById(el);
				if(el.style.display == "none"){
					el.style.display = "";
					if(typeof sender == "object") sender.className = sender.className.replace("closed_link", "opened_link");
				}else{
					el.style.display = "none";
					if(typeof sender == "object") sender.className = sender.className.replace("opened_link", "closed_link");
				}
			},
			Importing:false,
			FPXimportRaids: function(user){
				var linklist=document.FPXRaidSpamForm.FPXRaidSpamInput.value;
				if(linklist.length>10)
				{
					console.log("[SRLoaTSX] Import started");
					SRLoaTSX.gui.Importing=true;
					document.FPXRaidSpamForm.FPXRaidSpamInput.value="";
					var link,tagged=false,haspb=false,imct=0,total=document.getElementById('raid_list').childNodes.length;
					var patt = new RegExp("http...www.kongregate.com.games.5thPlanetGames.legacy.of.a.thousand.suns.[\\w\\s\\d_=&]+[^,]", "ig");
					//if(total > SRLoaTSX.config.maxRaidCount){
					//	if(!confirm("This import contains a large number of raids (" + total + ").  Too many raids can cause performance issues, and can even crash the browser. Continue?"))
					//		return;
					//}
					
					if(linklist.indexOf("!!OBJECT_IMPORT!!")>-1){
						var objs = linklist.split(";"), i=0;
						console.log("[SRLoaTSX] Objects importing "+objs.length);
						tagged=true;
						while(imct<objs.length){
							var obj = objs[imct].split(",");
							if(obj.length == 4 && patt.test(obj[0])){
								console.log("[SRLoaTSX] Object importing " + imct + ": " + obj[2] + " : " + obj[1] + " : " + obj[3]);
								SRLoaTSX.getRaidDetails(obj[0], obj[2], SRLoaTSX.config.markImportedVisited, SRLoaTSX.config.markImportedVisited, obj[1],obj[3]);
							}
							imct++;
						}
					}
					if(!tagged){
						while(link = patt.exec(linklist))
						{
							imct++;
							SRLoaTSX.getRaidDetails(String(link), 'Untagged Import', SRLoaTSX.config.markImportedVisited, SRLoaTSX.config.markImportedVisited);
						}
					}

					var pbpatt = new RegExp("http...pastebin.com.\\w{8}", "ig");
					while(link = pbpatt.exec(linklist)){
						haspb=true;
						SRLoaTSX.gui.FPXImportPasteBin(link);//recurse
					}
					if(!haspb){				
						var diff = document.getElementById('raid_list').childNodes.length - total;
						SRLoaTSX.gui.doStatusOutput('Import complete, ' + diff + ' of ' + imct + ' new raids');
					}
					SRLoaTSX.gui.Importing=false;
					SRLoaTSX.config.save(false);
					return {totalnew: diff, total:imct}
				}
			},
			deleteRaid: function (ele,id,upd) {
				upd=(typeof upd === 'undefined'?true:upd);
				if (SRLoaTSX.config.raidList[id]) {
					delete SRLoaTSX.config.raidList[id];
				}
				setTimeout(function(ele) {
					//var e = ele.nextSibling;
					//while (e) {
					//	if (e.getAttribute("style").indexOf('background-color:#e0e0e0') > -1) {
					//		e.setAttribute("style","");
					//	}
					//	else {
					//		e.setAttribute("style",'background-color:#e0e0e0');
					//	}
					//	e = e.nextSibling;
					//}
					//delete the element
					ele.parentNode.removeChild(ele);
					if(upd)SRLoaTSX.gui.updateMessage();
				},1,ele.parentNode.parentNode.parentNode)
			},
			FPXdeleteAllRaids: function () {
				console.log("[SRLoaTSX]::{FPX}:: DELETE ALL STARTED...");
				for (var id in SRLoaTSX.config.raidList){					
						if (SRLoaTSX.config.raidList[id]) {
							delete SRLoaTSX.config.raidList[id];
						}				
				}
				console.log("[SRLoaTSX]::{FPX}:: removing from raid_list div");
				var raidlistDIV=document.getElementById('raid_list');
				while (raidlistDIV.hasChildNodes()) {
					raidlistDIV.removeChild(raidlistDIV.lastChild);
				}
				console.log("[SRLoaTSX]::{FPX}:: removing from local storage...");
				localStorage.removeItem('raidList');
				SRLoaTSX.gui.updateMessage();
				console.log("[SRLoaTSX]::{FPX}:: DELETE ALL FINISHED...");
			},
			FPXdoWork: function (param1, whisper, whisperTo) {
				console.log("[SRLoaTSX]::{FPX}::"+param1+"\n");
				var matchClass="chat_input";						
				var elems= document.getElementById("chat_rooms_container").firstChild.getElementsByTagName('textarea');
				if(whisper && ((whisperTo||"") != "")){
					console.log("[SRLoaTSX] Whispering spam to " + SRLoaTSX.config.whisperTo);
					param1 = "/w " + SRLoaTSX.config.whisperTo + " " + param1;
				}
				for (var i in elems){
						if((" "+elems[i].className+" ").indexOf(" "+matchClass+" ") > -1)
						{elems[i].value = param1;holodeck.activeDialogue().sendInput(); break;}
				}
			},
			FPXformatRaidOutput: function(url) {
				if(!SRLoaTSX.config.formatLinkOutput) return url;
				var r = SRLoaTSX.getRaidDetailsBase(String(url));
				return r.shortname + ' ' + r.diffShortText + ' ' + url				
			},
			FPXprettyPost: function () {
				console.log("[SRLoaTSX]::{FPX}:: Pretty post...");
				try
				{
					var linklist=document.FPXRaidSpamForm.FPXRaidSpamInput.value;
					
					if(linklist.length>10){
						var patt = new RegExp("http...www.kongregate.com.games.5thPlanetGames.legacy.of.a.thousand.suns.[\\w\\s\\d_=&]+[^,]", "ig");
						var link,links=[];
						while(link = patt.exec(linklist)) links.push(link);
						
						var fullList = eliminateDuplicates(links);
						var fullCount = fullList.length;
						var bossArray = [];
						var finalOutput = ["Train starting. " + fullCount + " total raids including "];
						
						for(var i=0; i< SRLoaTSX.raidArray.length; i++)
						{
							var curBoss = SRLoaTSX.raidArray[i]
							var filtList = fullList.filter(function (e){
								return new RegExp('kv_raid_boss=' + curBoss,'i').test(e);
							});
							if(filtList.length > 0){
								var raid = SRLoaTSX.raids[curBoss];
								bossArray.push(raid.shortname);
								finalOutput.push(raid.name + " x" + filtList.length);
								console.log("[SRLoaTSX] Pretty post sorting " + raid.shortname);
								filtList.sort(function(a,b){
									a=SRLoaTSX.getRaidDetailsBase(String(a)),b=SRLoaTSX.getRaidDetailsBase(String(b));
									if(a.diff < b.diff) return -1
									return 1
								});
								for(var j=0; j< filtList.length; j++){
									var r = SRLoaTSX.getRaidDetailsBase(String(filtList[j]));
									finalOutput.push((j+1) + ") " + r.diffShortText + " " + filtList[j]);
								}
							}
						}
						if(bossArray.length > 0){
							finalOutput.push("Train finished");
							var bossStr = "";
							for(var i=0; i<bossArray.length; i++){
								if(bossStr != "") bossStr += ", ";
								bossStr += bossArray[i];
							}
							finalOutput[0] = finalOutput[0] + bossStr;
							var timer = 500, ttw=3000, ct=0;
							for(var i=0; i<finalOutput.length; i++){
								if(!SRLoaTSX.gui.isPosting) break;
								var link = finalOutput[i];
								(function(param1) {return SRLoaTSX.gui.FPXTimerArray[i]=setTimeout(function() {
									if(!SRLoaTSX.gui.isPosting)return; 
									SRLoaTSX.gui.FPXdoWork(param1, SRLoaTSX.config.whisperSpam, SRLoaTSX.config.whisperTo);
									SRLoaTSX.gui.postingMessage(++ct, finalOutput.length);
								},timer); })(link);
								timer+=ttw;								
							}
						}
					}
					SRLoaTSX.gui.FPXTimerArray[SRLoaTSX.gui.FPXTimerArray.length] = setTimeout(function() {	SRLoaTSX.gui.FPXEndPosting();console.log("[SRLoaTSX]::{FPX}:: Pretty post finished"); },timer);
					
				}catch(error){console.log("[SRLoaTSX]::{FPX}::ERROR:: "+error);}
			},
			isPosting:false,
			FPXTimerArray: [],
			FPXStopPosting: function(){
				SRLoaTSX.gui.FPXEndPosting();
				console.log("[SRLoaTSX]::{FPX}:: SPAMMER CANCELLED...");
				SRLoaTSX.echo('Raid posting cancelled');
			},
			FPXEndPosting: function(){
				for(var i=0;i<SRLoaTSX.gui.FPXTimerArray.length;i++){
					clearTimeout(SRLoaTSX.gui.FPXTimerArray[i]);
				}
				SRLoaTSX.gui.isPosting = false;
				document.FPXRaidSpamForm.Submit.disabled=false;
				document.FPXRaidSpamForm.Submit1.disabled=true;
				document.FPXRaidSpamForm.Submit2.disabled=false;
				document.FPXRaidSpamForm.Submit3.disabled=false;
				SRLoaTSX.gui.doStatusOutput('Posting finished');
				//document.getElementById("FPXShareTab").innerHTML="Share";
				SRLoaTSX.gui.FPXTimerArray = [];
				SRLoaTSX.config.save(true);
			},
			FPXStartPosting: function() {
				SRLoaTSX.gui.isPosting = true;
				document.FPXRaidSpamForm.Submit.disabled=true;
				document.FPXRaidSpamForm.Submit1.disabled=false;
				document.FPXRaidSpamForm.Submit2.disabled=true;
				document.FPXRaidSpamForm.Submit3.disabled=true;
				SRLoaTSX.gui.doStatusOutput('Posting started...', false);
				//document.getElementById("FPXShareTab").innerHTML="Working...";
			},
			FPXspamRaids: function () {
				if(SRLoaTSX.config.whisperSpam && ((SRLoaTSX.config.whisperTo||"") == "")){
					alert("You must select a user to whisper to if whispering is selected.");
					return false;
				}
				SRLoaTSX.gui.FPXStartPosting();
				if(SRLoaTSX.config.prettyPost){
					SRLoaTSX.gui.FPXprettyPost();
				}else{			
					console.log("[SRLoaTSX]::{FPX}:: SPAMMER STARTED...");
					try
					{
						var linklist=document.FPXRaidSpamForm.FPXRaidSpamInput.value;
						var ct=0;
						if(linklist.length>10)
						{
							document.FPXRaidSpamForm.FPXRaidSpamInput.value="";
							var patt = new RegExp("http...www.kongregate.com.games.5thPlanetGames.legacy.of.a.thousand.suns.[\\w\\s\\d_=&]+[^,]", "ig");
							var link, i=0;
							var timer=500,ttw=3000;
							var total = linklist.split(patt).length;
							
							while((link = patt.exec(linklist)) && SRLoaTSX.gui.isPosting)
							{
								(function(param1) {return SRLoaTSX.gui.FPXTimerArray[i]=setTimeout(function() {
									if(!SRLoaTSX.gui.isPosting)return; 
									SRLoaTSX.gui.FPXdoWork(SRLoaTSX.gui.FPXformatRaidOutput(param1), SRLoaTSX.config.whisperSpam, SRLoaTSX.config.whisperTo);
									SRLoaTSX.gui.postingMessage(++ct, total);},timer); 
								})(link);
								timer+=ttw;
								i++;
							}
						}
						SRLoaTSX.gui.FPXTimerArray[SRLoaTSX.gui.FPXTimerArray.length]=setTimeout(function() {	SRLoaTSX.gui.FPXEndPosting(); console.log("[SRLoaTSX]::{FPX}:: SPAMMER FINISHED..."); },timer);
					}catch(error)
					{
						console.log("[SRLoaTSX]::{FPX}::ERROR:: "+error);
					}
				}
			},
			FPXFilterRaidListByName: function () {
				console.log("[SRLoaTSX]::{FPX}:: FILTERING RAID LIST...");
				
				var roomNameFilter = document.FPXRaidFilterForm.FPXRoomNameFilter.value;
				if(!isNumber(roomNameFilter) && roomNameFilter != ""){
					alert("Enter room number only for room filtering");
					return;
				}
				
				var raidList=document.getElementById('raid_list').childNodes,raidName;
				var classReg = /(SRLoaTSX_filteredRaidList[0-9a-z_]+)/i;
				var visitReg = /SRLoaTSX_visitedRaidList/i;
				
				var diffFilter=document.FPXRaidFilterForm.FPXRaidBossDifficultyFilter.value;
				var posterSwitch = document.FPXRaidFilterForm.FPXPostedNameSwitch.value;
				var roomSwitch = document.FPXRaidFilterForm.FPXRoomNameSwitch.value;
				var roomFilter = document.FPXRaidFilterForm.FPXRoomNameFilter.value;
				
				var str = (!(typeof SRLoaTSX.zoneRaidRegex[document.FPXRaidFilterForm.FPXRaidBossNameFilter.value]==='undefined')?SRLoaTSX.zoneRaidRegex[document.FPXRaidFilterForm.FPXRaidBossNameFilter.value]:document.FPXRaidFilterForm.FPXRaidBossNameFilter.value);
				
				var re = new RegExp(str, "i");
				var p_re = new RegExp(document.FPXRaidFilterForm.FPXPostedNameFilter.value, "i");
				
				for(i=0; i< raidList.length; i++)
				{
					SRLoaTSX.gui.FPXFilterRaidSingle(raidList[i], re, diffFilter, p_re, posterSwitch, roomFilter, roomSwitch);
				}
				
				console.log("[SRLoaTSX]::{FPX}:: RAID LIST FILTER COMPLETED...");
				return false;
			},
			FPXFilterRaidSingle: function(el, re, diffFilter, p_re, posterSwitch, roomFilter, roomSwitch){
				re=(re?re:new RegExp(document.FPXRaidFilterForm.FPXRaidBossNameFilter.value, "i"));
				if(typeof el == "undefined") return;
				var id = el;
				
				if(typeof el != "string" && typeof el != "number") id = el.getAttribute("raidid");
				else el = document.getElementsByClassName("raid_list_item_"+id)[0];
				
				var r = SRLoaTSX.config.raidList[id];
				
				
				if(typeof r == 'object')
				{
					if(re.test(el.firstChild.childNodes[1].textContent) &&  //Name
						(diffFilter==0 || diffFilter==r.diff) &&  //Difficulty
						((posterSwitch==0 && p_re.test(r.user)) || (posterSwitch==1 && !p_re.test(r.user))) && //Poster
						((roomFilter=="") || (roomSwitch==0 && roomFilter==r.room) || (roomSwitch==1 && roomFilter != r.room))){ //Room
						el.className = el.className.replace(/raid_list_item (hidden )?(.*)/i,"raid_list_item $2");
						return true;
					}else{
						el.className = el.className.replace(/raid_list_item (hidden )?(.*)/i,"raid_list_item hidden $2");
						return false;
					}
				}
			},
			FPXImportPasteBin: function(url){
				url=url+"";
				if(/pastebin\.com\//i.test(url)){
					if(!SRLoaTSX.gui.importingPastebin){
						url= 'http://pastebin.com/raw.php?i='+url.substring(url.length-8);
						console.log("[SRLoaTSX] Importing pastebin " +url);
						SRLoaTSX.gui.importingPastebin=true;
						document.getElementById("SRLoaTSX_pastebin").src = url;
						setTimeout("if(SRLoaTSX.gui.importingPastebin){console.log('[SRLoaTSX] Unknown error importing pastebin.  See console');SRLoaTSX.gui.importingPastebin=false;}", 30000);//not found in 30 secs error occured
					} else {
						console.log("[SRLoaTSX] Pastebin collision, trying again in 1 second");
						setTimeout("SRLoaTSX.gui.FPXImportPasteBin('"+url+"');", 1000);
					}
				}
			},
			importingPastebin:false,
			FPXSortRaids: function () {
				var raidArray = [];
				var selectedSort = document.getElementById("FPXRaidSortSelection").value;
				var selectedDir = document.getElementById("FPXRaidSortDirection").value;
				
				console.log("[SRLoaTSX] Sorting started " + selectedSort + " : " + selectedDir);
				var raidlistDIV=document.getElementById('raid_list');
				var raidList = raidlistDIV.childNodes;
				for(i=0; i<raidList.length; i+=1) {
					var item = SRLoaTSX.config.raidList[raidList[i].getAttribute("raidid")];
					raidArray.push(item);
				}
				var sortFunc;
				if(selectedSort == "Id")
					if(selectedDir == "asc")
						sortFunc = function(a,b){
							if(!(typeof a.id === 'undefined' || typeof b.id === 'undefined'))
								if(a.id < b.id) return -1;
							return 1;
						}
					else
						sortFunc = function(a,b){
							if(!(typeof a.id === 'undefined' || typeof b.id === 'undefined'))
								if(a.id > b.id) return -1;
							return 1;
						}
				else if(selectedSort == "Time")
					if(selectedDir == "asc")
						sortFunc = function(a,b){
							if(!(typeof a.timeStamp === 'undefined' || typeof b.timeStamp === 'undefined'))
								if(a.timeStamp < b.timeStamp) return -1;
							return 1;
						}
					else
						sortFunc = function(a,b){
							if(!(typeof a.timeStamp === 'undefined' || typeof b.timeStamp === 'undefined'))
								if(a.timeStamp > b.timeStamp) return -1;
							return 1;
						}
				else if(selectedSort == "Name")
					if(selectedDir == "asc")
						sortFunc = function(a,b){
							a=SRLoaTSX.raids[a.boss]; b=SRLoaTSX.raids[b.boss];
							console.log(a + " : " + b + " : " + (typeof a === 'undefined') + " : " + (typeof b === 'undefined'));
							if(!(typeof a === 'undefined' || typeof b === 'undefined'))
								if(a.name > b.name) return -1
							return 1;
						}
					else
						sortFunc = function(a,b){
							a=SRLoaTSX.raids[a.boss]; b=SRLoaTSX.raids[b.boss];
							if(!(typeof a === 'undefined' || typeof b === 'undefined'))
								if(a.name < b.name) return -1
							return 1;
						}
				else if(selectedSort == "Diff")
					if(selectedDir == "asc")
						sortFunc = function(a,b){
							if(a.diff > b.diff) return -1
							return 1
						}
					else
						sortFunc = function(a,b){
							if(a.diff < b.diff) return -1
							return 1
						}
				try{
					raidArray.sort(sortFunc);
				}catch(e){
					console.log("[SRLoaTSX] Sorting error: " +e);
					return;
				}
				
				var raidlistDIV=document.getElementById('raid_list');
				while (raidlistDIV.hasChildNodes()) {
					raidlistDIV.removeChild(raidlistDIV.lastChild);
				}
				
				for(var i=0; i<raidArray.length; i++){
					//SRLoaTSX.config.raidList[r.id] = r;
					SRLoaTSX.gui.addRaid(raidArray[i]);
				}
				SRLoaTSX.gui.FPXFilterRaidListByName();
				
				console.log("[SRLoaTSX] Sorting finished");
			},
			GetAllRaids: function (visible){
				console.log("[SRLoaTSX] Get all raids (visible="+visible+")");
				var r = [];
				var raidList = document.getElementById('raid_list').childNodes;
				if(typeof visible === 'undefined')
					for(i=0; i<raidList.length; i++) {
						var item = raidList[i];
						var raid = SRLoaTSX.config.raidList[item.getAttribute("raidid")];
						if (!(typeof raid === 'undefined')) {
							try {
								r.push(JSON.parse(JSON.stringify(raid)));
								r[r.length-1].ele = item
							} catch(err){console.log("[SRLoaTSX]::{FPX}:: error::"+err+"   raid var"+raidList[i]+raidList[i].innerHTML);return false;} 
						}
					}
				else if(visible)
					for(i=0; i<raidList.length; i++) {
							var item = raidList[i];
							var raid = SRLoaTSX.config.raidList[item.getAttribute("raidid")];
							if (!(typeof raid === 'undefined') && item.offsetWidth+item.offsetHeight>0){
								try {
									r.push(JSON.parse(JSON.stringify(raid)));
									r[r.length-1].ele = item
								} catch(err){console.log("[SRLoaTSX]::{FPX}:: error::"+err+"   raid var"+raidList[i]+raidList[i].innerHTML);return false;} 
							}
						}
				else
					for(i=0; i<raidList.length; i++) {
							var item = raidList[i];
							var raid = SRLoaTSX.config.raidList[item.getAttribute("raidid")];
							if (!(typeof raid === 'undefined') && item.offsetWidth+item.offsetHeight==0){
								try {
									r.push(JSON.parse(JSON.stringify(raid)));
									r[r.length-1].ele = item
								} catch(err){console.log("[SRLoaTSX]::{FPX}:: error::"+err+"   raid var"+raidList[i]+raidList[i].innerHTML);return false;} 
							}
						}
				return r;
			},
			GetHiddenRaids: function () {
				return this.GetAllRaids(false);
			},
			GetVisibleRaids: function () {
				return this.GetAllRaids(true);
			},
			GetUnvisitedRaids: function () {
				console.log("[SRLoaTSX] Getting unvisited raids (gui)");
				var r = [];
				var raidList = document.getElementById('raid_list').childNodes;
				
				for(i=0; i<raidList.length; i++) {
					var item = raidList[i];
					var raidid = item.getAttribute("raidid");
					var raid = SRLoaTSX.config.raidList[raidid]
					if (raid) {
						try {
							if (!raid.visited) {
								r.push(JSON.parse(JSON.stringify(raid)));
								r[r.length-1].ele = item
							}
						} catch(err){console.log("[SRLoaTSX]::{FPX}:: error::"+err+"   raid var"+raidList[i]+raidList[i].innerHTML);return false;} 
					}
				}
				return r;
			},
			DeleteUnvisitedRaids: function () {
				console.log("[SRLoaTSX] Deleting unvisited raids");
				var raids = SRLoaTSX.gui.GetUnvisitedRaids();
				for (i=0;i<raids.length;i++){
					var raid = raids[i];
					SRLoaTSX.gui.deleteRaid(raid.ele.getElementsByClassName("FPXDeleteLink")[0], raid.id, false);
				}
				SRLoaTSX.gui.doStatusOutput(raids.length + ' unvisited raids deleted');
			},
			DeleteHiddenRaids: function () {
				console.log("[SRLoaTSX] Deleting hidden raids");
				var raids = SRLoaTSX.gui.GetHiddenRaids();
				for(i=0;i<raids.length;i++){
					var raid = raids[i];
					SRLoaTSX.gui.deleteRaid(raid.ele.getElementsByClassName("FPXDeleteLink")[0], raid.id, false);
				}
				SRLoaTSX.gui.doStatusOutput(raids.length+' hidden raids deleted');
				console.log("[SRLoaTSX] Finished deleting hidden raids");
			},
			AutoJoin: false,
			AutoJoining: false,
			AutoJoinTimerArray: [],
			AutoJoinVisible: function (b, t) {
				if(typeof b === 'undefined'){
					b=!SRLoaTSX.gui.AutoJoin;
					document.getElementById('AutoJoinVisibleButton').value=b?"Cancel Auto Join":"Join Visible Raids";
				}
				for(i=0; i<SRLoaTSX.gui.AutoJoinTimerArray.length; i++){
					clearTimeout(SRLoaTSX.gui.AutoJoinTimerArray[i]);
				}
				SRLoaTSX.gui.AutoJoinTimerArray=[];
				SRLoaTSX.gui.AutoJoin = b;
				if(typeof b=='boolean' && b){
					console.log("[SRLoaTSX] Joining visible raids");
					var raids = SRLoaTSX.gui.GetVisibleRaids(),timer = (!(typeof t==='undefined')?t:200),ttw = SRLoaTSX.config.AutoJoinInterval;//make configurable
					if(raids.length > 0){
						timeFinished = (ttw*raids.length)+(new Date().getTime());
						for(i=0; i<raids.length; i++){
							var raid = raids[i];
							SRLoaTSX.gui.AutoJoinTimerArray[SRLoaTSX.gui.AutoJoinTimerArray.length]=setTimeout("if(SRLoaTSX.gui.AutoJoin){SRLoaTSX.gui.doStatusOutput('Joining "+(i+1)+" of "+raids.length+", '+timeSince("+timeFinished+",true), false);SRLoaTSX.gui.FPXraidLinkClickChat("+raid.id+",'"+raid.ele.firstChild.getElementsByTagName('a')[0].href+"', false)}", timer)
							timer += ttw;
						}
						SRLoaTSX.gui.AutoJoinTimerArray[SRLoaTSX.gui.AutoJoinTimerArray.length]=setTimeout("SRLoaTSX.reload();SRLoaTSX.gui.doStatusOutput('Finished Auto Joining');SRLoaTSX.gui.AutoJoin=false;SRLoaTSX.gui.AutoJoining=false;document.getElementById('AutoJoinVisibleButton').value='Join Visible Raids';", timer);//removed SRLoaTSX.gui.AutoJoinRepeater();
						SRLoaTSX.gui.AutoJoining=true;
						console.log("[SRLoaTSX] Joining prepared");
					}//else{
					//	console.log("[SRLoaTSX] No visible raids found. Checking again in "+(ttw/1000)+" seconds");
					//	SRLoaTSX.gui.AutoJoining=false;
					//	setTimeout("SRLoaTSX.gui.AutoJoinRepeater();", ttw);
					//}
				} else SRLoaTSX.gui.doStatusOutput('Cancelled Auto Joining');
				return b;
			},
			//AutoJoinRepeater: function () {
			//	if(SRLoaTSX.gui.AutoJoin){
			//		if(!SRLoaTSX.gui.AutoJoining){
			//			console.log("[SRLoaTSX] Auto joiner checking for new visible raids");
			//			SRLoaTSX.gui.AutoJoinVisible(true);
			//		}else setTimeout("SRLoaTSX.gui.AutoJoinRepeater();", 5000*60);//check every 5 minutes
			//	}
			//},
			DeleteVisibleRaids: function () {
				console.log("[SRLoaTSX] Deleting visible raids");
				var raids = SRLoaTSX.gui.GetVisibleRaids();
				for(i=0; i<raids.length; i++){
					var raid = raids[i];
					SRLoaTSX.gui.deleteRaid(raid.ele.getElementsByClassName("FPXDeleteLink")[0], raid.id, false);
				}
				SRLoaTSX.gui.doStatusOutput(raids.length + ' visible raids deleted');
				console.log("[SRLoaTSX] Deleting complete");
			},
			DumpRaidsToShare: function(v) {
				console.log("[SRLoaTSX] Dumping "+(v?'visible':'all'));
				var raids = (v?SRLoaTSX.gui.GetVisibleRaids():SRLoaTSX.gui.GetAllRaids());
				var dumptext = "!!OBJECT_IMPORT!!", el=document.getElementById('FPXRaidSpamTA');
				for(i=0; i<raids.length; i++){
					var raid = raids[i];
					var txt = raid.ele.firstChild.getElementsByTagName('a')[0].href+","+raid.timeStamp+","+raid.user+","+raid.room+";"
					dumptext += txt;
				}
				SRLoaTSX.gui.doStatusOutput((!v?'All ':'') + raids.length + (v?' visible':'') + ' raids dumped to share.');
				el.focus(); el.value = dumptext; el.select();
				console.log("[SRLoaTSX] Dumped "+(v?'visible':'all'));
				return false;
			},
			BeginDeletingExpiredUnvisitedRaids: function() {
				SRLoaTSX.gui.DeleteExpiredUnvisitedRaids();

				setInterval('SRLoaTSX.gui.DeleteExpiredUnvisitedRaids();',600000);
			},
			DeleteExpiredUnvisitedRaids: function() {
				console.log("[SRLoaTSX] Deleting expired unvisited raids");
				if (SRLoaTSX.config.unvisitedRaidPruningMode <= 2 && SRLoaTSX.config.unvisitedRaidPruningMode >= 0) {
					var raidList = document.getElementById('raid_list').childNodes;
					var pruneTime = new Date().getTime();
					var ct = 0;
					for(i=0; i<raidList.length; i+=1) {
						var item = raidList[i];	
						var raidid = item.getAttribute("raidid");
						if (SRLoaTSX.config.raidList[raidid]) {
							try {
								var raid = SRLoaTSX.config.raidList[raidid];
								if (SRLoaTSX.raids[raid.boss]) {

									var raidInfo = SRLoaTSX.raids[raid.boss];
									if (!raid.visited) {
										if(SRLoaTSX.raidSizes[raidInfo.size] && SRLoaTSX.raidSizes[raidInfo.size].pruneTimers && SRLoaTSX.raidSizes[raidInfo.size].pruneTimers[SRLoaTSX.config.unvisitedRaidPruningMode]) {
											var pruneTimer = SRLoaTSX.raidSizes[raidInfo.size].pruneTimers[SRLoaTSX.config.unvisitedRaidPruningMode];
											if ((pruneTime - raid.timeStamp) >= pruneTimer) {
												console.log("[SRLoaTSX] Deleting raid " + raidid);
												SRLoaTSX.gui.deleteRaid(item.getElementsByClassName("FPXDeleteLink")[0], raidid);
												ct++;
											}
										}
									}
								} else {
									console.log("[SRLoaTSX] Deleting raid " + raidid);
									SRLoaTSX.gui.deleteRaid(item.getElementsByClassName("FPXDeleteLink")[0], raidid);
									ct++;
								}

							} catch(err){console.log("[SRLoaTSX]::{FPX}:: error::"+err+"   raid var"+raidList[i]+raidList[i].innerHTML);return false;} 

						}
					}
					if(ct>0)SRLoaTSX.gui.doStatusOutput(ct + " old unvisited raids pruned.");
				}
			},
			help: function (item) {
			},
			getElementsByAttribute: function (tagname,attr,value,ele) {
				var eles = (ele?ele.getElementsByTagName(tagname):document.getElementsByTagName(tagname));
				var result = new Array();
				for (var i=0;i<eles.length;i++) {
					if (eles[i].getAttribute("attr") == value) {
						result.push(eles[i]);
					}
				}
				return result;
			},
			toggleCollapse: function (aId, toggleDivId,text) {
				var a = document.getElementById(aId);
				var div = document.getElementById(toggleDivId);

				if (div.style.display == "block") {
					div.style.display = "none";
					a.innerHTML = text + " [+]";
				}
				else {
					div.style.display = "block";
					a.innerHTML = text + " [-]";
				}
			},
			load: function () {
				if (typeof holodeck == 'object' && typeof holodeck._tabs == 'object' && typeof holodeck._tabs.addTab == 'function') {
					SRLoaTSX.gui.cHTML('style').set({type: "text/css",id: 'SRLoaTSX_raidClass'}).text('.SRLoaTSX_raid{display:'+(SRLoaTSX.config.hideRaidLinks == true?'none !important':'block')+'}').attach('to',document.head);
					SRLoaTSX.gui.cHTML('style').set({type: "text/css",id: 'SRLoaTSX_visitedRaidClass'}).text('.SRLoaTSX_visitedRaid{display: '+(SRLoaTSX.config.hideVisitedRaids == true?'none !important':'block')+'}').attach('to',document.head);
					SRLoaTSX.gui.cHTML('style').set({type: "text/css",id:'SRLoaTSX_visitedRaidListClass'}).text('.SRLoaTSX_visitedRaidList{display: '+(SRLoaTSX.config.hideVisitedRaidsInRaidList == true?'none !important':'block')+'}').attach('to',document.head);
					SRLoaTSX.gui.cHTML('style').set({type: "text/css",id: 'SRLoaTSX_seenRaidClass'}).text('.SRLoaTSX_seenRaid{display: '+(SRLoaTSX.config.hideSeenRaids == true?'none !important':'block')+'}').attach('to',document.head);
					for (var i in SRLoaTSX.raids) {
						if (SRLoaTSX.raids.hasOwnProperty(i)) {
							var raid = SRLoaTSX.raids[i];
							for (j=0; j<4; j++) {
								SRLoaTSX.gui.cHTML('style').set({type: "text/css",id: 'SRLoaTSX_filteredRaidChat' + raid.id + '_' + j + 'Class'}).text('.SRLoaTSX_filteredRaidChat' + raid.id + '_' + j + '{display: ' + ((SRLoaTSX.config.getFilter(raid.id,j) == true && SRLoaTSX.config.filterChatLinks == true)?'none !important':'block')+'}').attach('to',document.head);
								SRLoaTSX.gui.cHTML('style').set({type: "text/css",id: 'SRLoaTSX_filteredRaidList' + raid.id + '_' + j + 'Class'}).text('.SRLoaTSX_filteredRaidList' + raid.id + '_' + j + '{display: ' + ((SRLoaTSX.config.getFilter(raid.id,j) == true && SRLoaTSX.config.filterRaidList == true)?'none !important':'block')+'}').attach('to',document.head);
							}
						}
					}
					
					SRLoaTSX.gui.cHTML('style').set({type: "text/css"}).text(" \
						a.FPXDeleteAllBtn{display:block;color:#FFFFFF;background-color:rgb(153, 0, 0);font-weight:bold;font-size:11px;width:120px;text-align:center;padding:0;padding-top:3px;padding-bottom:4px;border:1px solid #ffffff;outline:1px solid rgb(153, 0, 0);text-decoration:none;margin-left:1px;} \
						#FPXtt { position:absolute; display:block; background:url(data:image/gif;base64,R0lGODlhBQCWAIABAGZmZv///yH5BAEAAAEALAAAAAAFAJYAAAIgjG8AqaH9opy02ouz3rz7D4biSJbmiabqyrbuC8eyWgAAOw==) top left no-repeat; } \
						#FPXtttop { display:block; height:5px; margin-left:5px; background:url(data:image/gif;base64,R0lGODlhkAEFAIABAGZmZv///yH5BAEAAAEALAAAAACQAQUAAAI0hI+py+0Po5y02ouz3rz7XwWiCJbmiabqyrauOr7yTNf2jecPqff+DwwKZ4Gh8YhMKoWBAgA7) top right no-repeat; overflow:hidden; } \
						#FPXttcont { display:block; padding:2px 12px 3px 7px; margin-left:5px; background:#666; color:#fff; } \
						#FPXttbot {display:block;height:5px;margin-left:5px;background:url(data:image/gif;base64,R0lGODlhkAEFAIABAGZmZv///yH5BAEAAAEALAAAAACQAQUAAAI1hI+py+0Po5y02ouz3rz7nwXgSJbmiabqyqpiC8fyTNf27QQvzvf+DwyydDuh8YhMKm9EXQEAOw==) top right no-repeat;overflow:hidden;} \
						#kong_game_ui ul.main_tabs li#lots_tab a {width: 44px; color:white; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAwCAIAAAAOxbS1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARfSURBVFhH1Vk/SFtBGL9ot46RjI1GealkajJFBGOhdJBgEQczmmImty6COAUhS5fipDROJR0kIOJQBJNA0C1bkDxK2oBT2uBUxMl+9+7evXv33t2ZNLbpDfLeve/P777v933vyzPQbrfRyKyxkUGCgWA09/f3I4IJowkEAiOEZkSg0Ex50Qwxd32ZEllMsjbE3PVlyoUGNPs6ytBT7ELz2FC09h00btHO4WrEXquHHT4K1W14sF1lWyBqS/BaLhlLJzI9PS3YEqLroPEkOL5TgUbdbhej+UXHeedwr5XJxEtnDhyXSVurXdlpZSPEeXU726LGNr/uSxTt7qdJf+pVxpHonJ+ipVxuSQ7Hlg2vHxUzjbzgPLW7m5L7e8CboXpWis9MERMWmJfh8PpmRhodxxk+R+tbB6V2cXwjNFKKw48xungo1sAGYO3NVI7WwzwYuAZHpT03n/y9RKewamoXUl5ZOtVAGmN0kfCmsoPy76jb6n6+YWPMllDj9NxFbw8cPqrwEHLX/phRaWkrPLz+HvBY2cfGKRktdisNW9wtxSGtCCrNroLO9xYi0fJdYvfzEbJIAlnBYLBxe0GyfM5pxy4SyaJi20oxGEBZ0i4W89GigsaB/2Da0jZNTVOQP5YXjbzfEEYPjEmhKC8aDxrBivr1q3XpFdAe7wEsloRdOyqwAAMIsvgdfU3JsJN97ckEB0QeELBFBMitHo1XiFkkVvoib7/y2EUulyOevKRhUIQLhokn+x8Sn9ikvFEwjq9JWfBIHnkjisAoHoksVlthTJSFk4VNUZ6+j4hf8T2loKqWy1pdL/kIQxhPHjDfSKjbb4kRM4KWcEJnouirXh5JmE5bA1TjYwCisRks7EMHJH4V+LdBot3Pc8rQwkY2GSTbvcviQa3LRGIrW2nDPCmUm2QLRJfRsSXBayHEyVg6PrYEv+OJRELordbt08nEs+vPHz59qddvJjNrszf1qx/U95sXt9e3xsSdvQOiz1Gr0fnl0qqb4/NrmcS4CQ9iK2+jZtEydpd4HbqipryJdmXKnz3NlunohWYNZNbrZs+IxtS06dYOTsxgct4t1izbIfXTdr5tSRkTixq9HgkMssBcdbu1C1MLByF8juBECDXLJ71kdmtrYyGkPoH4O5zDFMQGYM31GG0oGDAJjow5nXGLKD8x45rlQqFQNA0NJEUvBvJiE5couUzdxuaTQRsjkDJozKrPykcVIEHuCpA8hRZFwyYgD3W6tWPAY2UfG7cQkqU2DOIraaMHacWVtkLZE5oI0mj5puwJ2eVfzqIcJskWzkoQjBedSodkpedmQ7UrlwKOXZLsQIUfWF2gdoEg42l7k3YGfCvMVdJpS023R3oqTlt/sxcLAzLcSr8mDQZLpsXvs2t+6CZscVU4n0XfTujrjN9UvH15EPw1r6L9RkF/KngHcuGIvkySefUWjTOJek+smMZJSNlfNZ0VAWaPCHvIrf9/PXgrQx99vMMo2/kN5y+czr7nW8kAAAAASUVORK5CYII=) !important;background-position: 0px -25px}\r\n \
						#kong_game_ui ul.main_tabs li#lots_tab a.active {background-position: 0px 0px;} \
						#kong_game_ui div#lots_tab_pane {padding: 8px; text-align: left;} \
						#kong_game_ui div#lots_tab_pane ul { margin: 0px; padding: 0px; list-style-type: none; position: relative;} \
						#kong_game_ui div#lots_tab_pane ul li.tab { float: left; height: 100%; } \
						#kong_game_ui div#lots_tab_pane ul li.tab div.tab_head  { font-family: Verdana, Arial, sans-serif;font-size: 10px;padding: 3px 5px 4px 5px; background-color: #c0c0c0; cursor: pointer; text-decoration: underline; margin-right: 1px; } \
						#kong_game_ui div#lots_tab_pane ul li.tab div.tab_pane  { padding: 2px 5px; background-color: #ffffff; display: none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_head { background-color: #ffffff; cursor: default; text-decoration: none; }\
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane { position: absolute; display: block; left: 0px}\
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list {overflow-y: scroll; font-family: Verdana, Arial, sans-serif; font-size: 11px;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item {cursor: pointer; position: relative; padding: 2px; border-bottom: 1px solid #b0b0b0;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item .raid_list_item_head .link {display:none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item .raid_list_item_head .FPXlink {display:block;width:10px;height:10px; padding-right: 5px;float: left;Background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=') no-repeat scroll left center transparent;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.hidden {display:none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item .raid_list_item_info {display:none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item .raid_list_item_info hr {clear:both; margin: 5px 15px; } \
						"+(!SRLoaTSX.config.showRaidLink?'#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item .raid_list_item_head .RaidQuickLink{display:none;}':'') + "\
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active {cursor: default; background-color: #DEEAF6 !important;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_head .text{display:none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_head .FPXtext{display:none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_head .RaidQuickLink{display:none !important;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_head .link{display: inline-block; font-weight: bold;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_info {display:block;} \
					").attach("to",document.head);
					var link = SRLoaTSX.gui.cHTML('a').set({href: '#lots_tab_pane',class: ''}).html("<span class='SRLoaTSX_new' style='float:right; padding-top:3px; padding-right:3px;'>(<span class='SRLoaTSX_NewRaidsCount'>0</span>)</span>").attach("to",SRLoaTSX.gui.cHTML('li').set({class: 'tab', id: 'lots_tab', onclick:'SRLoaTSX.gui.raidsTabClicked()'}).attach("after","game_tab").ele()).ele();

					var pane = SRLoaTSX.gui.cHTML('div').set({id: 'lots_tab_pane'}).html(' \
						<div class="room_name_container h6_alt mbs">LoaTS Extension - <span class="room_name" id="StatusOutput"></span></div> \
						<ul id="SRLoaTSX_tabpane_tabs"> \
							<li class="tab active"> \
								<div class="tab_head">Raids</div> \
								<div class="tab_pane"> \
									<div id="FPXRaidFilterDiv" class="collapsible_panel"> \
										<p class="panel_handle spritegame mts closed_link" onclick="SRLoaTSX.gui.toggleDisplay(\'FPXRaidFiltering\', this)"> <a> Raid Filtering </a> </p> \
										<div id="FPXRaidFiltering" style="display:none"> \
											<FORM name="FPXRaidFilterForm" onSubmit="return false;"> \
												<table><tr><td align="right">Boss:</td> \
												<td><select name="FPXRaidBossDifficultyFilter" tabIndex="50" onchange="SRLoaTSX.gui.FPXFilterRaidListByName()"> \
													<option value="0" selected>All or Any</option> \
													<option value="1">Normal</option> \
													<option value="2">Hard</option> \
													<option value="3">Legendary</option> \
													<option value="4">Nightmare</option> \
													<!--<option value="5">Insane</option> \
													<option value="6">Hell</option>--> \
												</select></td><td> <INPUT NAME="FPXRaidBossNameFilter" size="10" tabIndex="51" onkeyup="SRLoaTSX.gui.FPXFilterRaidListByName()"></td></tr> \
												<tr><td>Poster:</td>\
												<td><select name="FPXPostedNameSwitch" tabIndex="-1"> \
													<option value="0" selected>Contains</option> \
													<option value="1">Not Contains</option> \
												</select></td><td> <INPUT NAME="FPXPostedNameFilter" size="10" tabIndex="52" onkeyup="SRLoaTSX.gui.FPXFilterRaidListByName()"></td></tr> \
												<tr><td>Room:</td>\
												<td><select name="FPXRoomNameSwitch" tabIndex="-1"> \
													<option value="0" selected>Equals</option> \
													<option value="1">Not Equals</option> \
												</select></td><td> <INPUT NAME="FPXRoomNameFilter" size="10" tabIndex="53" onkeyup="SRLoaTSX.gui.FPXFilterRaidListByName()"></td></tr> \
												<tr><td colspan="3" align="left"><input type="checkbox" tabIndex="54" id="SRLoaTSX_options_hideVisitedRaidsInRaidList"> Hide visited </td></tr> \
												<!--<tr><td colspan="3" align="right"><input name="button" tabIndex="-1" type="submit" value="Search" onClick=";return false"/></td></tr>--></table> \
											</FORM> \
										</div> \
									</div> \
									<div id="FPXRaidActionsDiv" class="collapsible_panel"> \
										<p class="panel_handle spritegame mts closed_link" onclick="SRLoaTSX.gui.toggleDisplay(\'FPXRaidSort\', this)"> <a> Raid Sorting </a> </p> \
										<div id="FPXRaidSort" style="display:none"> \
											Sort By: \
											<select id="FPXRaidSortSelection" tabIndex="-1"> \
												<option value="Time" selected>TimeStamp</option> \
												<option value="Name">Raid Name</option> \
												<option value="Diff">Difficulty</option> \
												<option value="Id">Raid Id</option> \
											</select> \
											<select id="FPXRaidSortDirection" tabIndex="-1"> \
												<option value="asc" selected>Ascending</option> \
												<option value="desc">Descending</option> \
											</select> \
											<input type="button" onClick="SRLoaTSX.gui.FPXSortRaids();return false;" value="Sort"> \
											<input type="checkbox" id="SRLoaTSX_options_newRaidsAtTopOfRaidList"> New raids at top of raid list <br> \
										</div> \
									</div> \
									<div id="FPXRaidActionsDiv" class="collapsible_panel"> \
										<p class="panel_handle spritegame mts closed_link" onclick="SRLoaTSX.gui.toggleDisplay(\'FPXRaidActions\', this)"> <a> Raid Actions </a> </p> \
										<div id="FPXRaidActions" style="display:none"> \
											<hr> \
											<input name="DumpShare" tabIndex="-1" type="button" value="Dump All Raids to Share Tab" onClick="SRLoaTSX.gui.DumpRaidsToShare(false);return false;"/> (<a href="#" tabIndex="-1" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'All hidden and visible raids in the list will be dumped to the Share Raids tab.  You can then use the button in that tab to post them to chat, or load them into a pastebin to share.\');">?</a>) <br>\
											<input name="DumpVisible" tabIndex="-1" type="button" value="Dump Visible Raids to Share Tab" onClick="SRLoaTSX.gui.DumpRaidsToShare(true);return false;"/> (<a href="#" tabIndex="-1" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'All raids currently visible in the list will be dumped to the Share Raids tab.  You can then use the button in that tab to post them to chat, or load them into a pastebin to share\');">?</a>) <br>\
											<input name="QuickDump" tabIndex="-1" type="button" value="Quick Share Visible Raids" onClick="SRLoaTSX.gui.DumpVisibleRaidsToShare();SRLoaTSX.gui.FPXspamRaids();return false;"/> (<a href="#" tabIndex="-1" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'This will immediately begin posting all visible raids in the order shown.\');">?</a>) <br>\
											<input name="DeleteVisible" tabIndex="-1" type="button" value="Delete All Visible Raids" onClick="SRLoaTSX.gui.DeleteVisibleRaids();return false;"> (<a href="#" tabIndex="-1" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'This will delete all raids currently visible.\');">?</a>) <br>\
											<input name="DeleteHidden" tabIndex="-1" type="button" value="Delete All Hidden Raids" onClick="SRLoaTSX.gui.DeleteHiddenRaids();return false;"> (<a href="#" tabIndex="-1" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'This will delete all raids that are currently not visible.\');">?</a>) <br>\
											<input name="DeleteUnvisited" tabIndex="-1" type="button" value="Delete All Unvisited Raids" onClick="SRLoaTSX.gui.DeleteUnvisitedRaids();return false;"> (<a href="#" tabIndex="-1" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'This will delete all raids that you have not visited.\');">?</a>) <br> \
											<input name="AutoJoinVisible" id="AutoJoinVisibleButton" tabIndex="-1" type="button" value="Join Visible Raids" onClick="SRLoaTSX.gui.AutoJoinVisible();return false;"> \
											<!--<input name="AutoJoin" id="AutoJoinRaids" tabIndex="-1" type="checkbox" onClick="SRLoaTSX.gui.AutoJoinVisible(this.checked);"> Join Visible Raids -->(<a href="#" tabIndex="-1" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'This will join all visible raids by refreshing the game.  I was unable to find anything in the LoTS or Kongregate ToS directly forbidding it, though have heard of people getting in trouble for using this method for joining raids.  Use at your own risk.\');">?</a>) \
											<input name="AutoJoinTimer" id="SRLoaTSX_options_autoJoinTimer" size="3" tabIndex="-1" type="text">Interval (ms) \
											<hr> \
										</div> \
									</div> \
									<div id="raid_list" tabIndex="-1"> \
									</div> \
								</div> \
							</li> \
							<li class="tab"> \
							<div class="tab_head">Options</div> \
									<div class="tab_pane"><br> \
									<div id="FPXRaidOptionsDiv" class="collapsible_panel"> \
										<p class="panel_handle spritegame mts opened_link" onclick="SRLoaTSX.gui.toggleDisplay(\'FPXRaidOptions\', this)"> <a> Raid Options </a> </p> \
										<div id="FPXRaidOptions"> \
											<hr> \
												<input type="checkbox" id="FPX_options_markVisitedRightClick"> Mark raids as visited on RightClick (<a href="#" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'When you right-click on a raid (generally, to copy and paste), that raid will be marked as visited.\');">?</a>)<br> \
												Delay(milliseconds) (<a href="#" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'Number of milliseconds to wait before marking raid link visited when it is right clicked.<br><strong>Only enabled if <i>\\\'Mark right click\\\'</i> is enabled.</strong> \');">?</a>) :: \
												<INPUT id="FPX_options_markVisitedRightClickDelay" size="8"> <br>\
												<input type="checkbox" id="SRLoaTSX_options_markMyRaidsVisited"> Automatically mark raids posted by me as visited <br> \
												<input type="checkbox" id="SRLoaTSX_options_showRaidLink"> Show raid link in raid list <br><br> \
												Unvisited raid pruning (<a href="#" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'How fast the script will automatically remove unvisited raids.  Small and Medium raids: Aggressive 1h, Moderate 2h, Slow 3h.  Large Raids: Aggressive 4h, Moderate 12h, Slow 36h.  Epic and Colossal raids: Aggressive 24h, Moderate 48h, Slow 72h.\');">?</a>)<br> \
												<input type="radio" id="FPX_options_unvisitedPruningAggressive" name="unvisitedPruning" value="Aggressive"/>Aggressive&nbsp;&nbsp; \
												<input type="radio" id="FPX_options_unvisitedPruningModerate" name="unvisitedPruning" value="Moderate"/>Moderate&nbsp;&nbsp; \
												<input type="radio" id="FPX_options_unvisitedPruningSlow" name="unvisitedPruning" value="Slow"/>Slow&nbsp;&nbsp; \
												<input type="radio" id="FPX_options_unvisitedPruningNone" name="unvisitedPruning" value="None"/>None&nbsp;&nbsp;<br> \
												<input type="checkbox" id="FPX_options_useMaxRaidCount"> enable max raid count <input type="text" id="FPX_options_maxRaidCount" size="5">(<a href="#" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'This will specify the maximum number of raids to store in the script. Once this number is reached, it will automatically purge the oldest raid as a new one is added.  Lowering this number could improve issues like shockwave crashes, etc.\');">?</a>)<br> \
												<a class="FPXDeleteAllBtn" href="#" onclick="SRLoaTSX.gui.FPXdeleteAllRaids();return false;">Delete All Raids</a> \ \
											<hr> \
										</div> \
									</div> \
									<div id="FPXChatOptionsDiv" class="open_link"> \
										<p class="panel_handle spritegame mts opened_link" onclick="SRLoaTSX.gui.toggleDisplay(\'FPXChatOptions\', this)"> <a> Chat Options </a> </p> \
										<div id="FPXChatOptions"> \
											<hr> \
											<input type="checkbox" id="SRLoaTSX_options_autoImportPaste"> Auto Import pastebins <br> \
											<input type="checkbox" id="SRLoaTSX_options_hideRaidLinks"> Hide all raid links in chat <br> \
											<input type="checkbox" id="SRLoaTSX_options_hideSeenRaids"> Hide seen raids in chat <br> \
											<input type="checkbox" id="SRLoaTSX_options_hideVisitedRaids"> Hide visited raids in chat <br> \
											<input type="checkbox" id="FPX_options_displayLinkImg"> Display icon beside raid (refresh req.) (<a href="#" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'Show a link Icon (\
												<img src=\\\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=\\\'/> ) next to the boss name Inside the raid list.<br><strong>This may cause script to become excessively laggy as the list becomes larger.</strong>\');">?</a>)<br> \ \
											<hr><input type="checkbox" id="SRLoaTSX_options_formatRaids"> Enable Raid Link Formatting (<a href="#" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'Set formatting options for raid links posted in chat.<br><strong>See the userscript page for a list of all formatting options.</strong> \');">?</a>)<br><br> \
											<textarea id="SRLoaTSX_options_raidLinkFormat"></textarea> \
											<hr> \
										</div> \
									</div> \
								</div> \
							</li> \
							<li class="tab"> \
								<div class="tab_head" id="FPXShareTab">Share</div> \
								<div class="tab_pane"> \
								<div id="FPXRaidSpamDiv"> \
										<FORM name="FPXRaidSpamForm" onSubmit="return false"> \
											<div id="FPXShareDiv" class="collapsible_panel"> \
												<p class="panel_handle spritegame mts opened_link" onclick="SRLoaTSX.gui.toggleDisplay(\'FPXShare\', this)"> <a> Sharing </a> </p> \
												<div id="FPXShare"> <hr>\
													<input name="Submit"  type="submit" tabIndex="-1" value="Post Links to Chat" onClick="SRLoaTSX.gui.FPXspamRaids();return false;"/> \
													<input name="Submit1" type="submit" disabled="disabled" tabIndex="-1" value="Cancel Posting" onClick="SRLoaTSX.gui.FPXStopPosting();return false;"/><br> \
													<input type="checkbox" id="SRLoaTSX_options_formatLinkOutput"> Enable simple formatting for link spam <br> \
													<input type="checkbox" id="SRLoaTSX_options_prettyPost"> Enable counting and sorting for link spam <br> \
													<input type="checkbox" id="SRLoaTSX_options_whisperRaids"> Whisper to <input type="text" id="SRLoaTSX_options_whisperTo"> <br>\
													<!--<input type="checkbox" id="SRLoaTSX_options_autoWhipser"> Auto Whisper <br>--> \
												<hr></div> \
											</div> \
											<div id="FPXShareDiv" class="collapsible_panel"> \
												<p class="panel_handle spritegame mts opened_link" onclick="SRLoaTSX.gui.toggleDisplay(\'FPXImport\', this)"> <a> Import </a> </p> \
												<div id="FPXImport"> <hr>\
													<input name="Submit2"  type="submit" tabIndex="-1" value="Import to Raid Tab" onClick="SRLoaTSX.gui.FPXimportRaids();return false;"/> (<a href="#" onclick="return false" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'This will add any new raids in the share box below to the raid tab.\');">?</a>)\
													<input name="Submit3"  type="submit" tabIndex="-1" value="Delete and Import" onClick="SRLoaTSX.gui.FPXdeleteAllRaids();SRLoaTSX.gui.FPXimportRaids();return false;"/>(<a href="#" onclick="return false" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'This will delete all raids on the raid tab and refresh the data with any raids in the share box below.\');">?</a>)<br> \
													<!--<input name="Submit4" type="submit" tabIndex="-1" value="Import Pastebin" onClick="SRLoaTSX.gui.FPXImportPasteBin();return false;"> <input type="text" id="SRLoaTSX_FPX_ImportPastebin">(<a href="#" onclick="return false" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'This is currently only working in chrome.  Before this is fixed, Firefox users should simply navigate to the pastebin url, copy the raw data, and paste it into box below and import the raids. \');">?</a>)<br> -->\
													<input type="checkbox" id="SRLoaTSX_options_markImportedRaidsVisited"> Mark imported raids visited <br> \
												<hr></div> \
											</div> \
											<textarea id="FPXRaidSpamTA" name="FPXRaidSpamInput" ></textarea><br> \
										</FORM> \
									</div> \
								</div> \
							</li> \
							<li class="tab"> \
								<div class="tab_head">Filtering</div> \
								<div class="tab_pane"> \
									<div id="FPXRaidFilterDiv"> \
										<div id="FPXRaidFilterWhereDiv"> \
											<input type="checkbox" id="SRLoaTSX_options_perRaidFilterLinks">Activate filtering on raid links (<a href="#" onclick="return false" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'All raids unchecked below will be hidden when linked in chat, in addition to all other link hiding options\');">?</a>)<br> \
											<input type="checkbox" id="SRLoaTSX_options_perRaidFilterRaidList">Activate filtering on raid list tab (<a href="#" onclick="return false" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'All raids unchecked below will be hidden in the Raids tab, in addition to the search options specified there\');">?</a>)<br> \
										</div> \
										<hr> \
										<div id="FPXRaidFilterWhatDiv"> \
											<div> \
												<div> \
													<a id="FPXPersonalAToggle" href="#" onclick="SRLoaTSX.gui.toggleCollapse(\'FPXPersonalAToggle\',\'FPXRaidTablePersonal\',\'Personal Raids\');return false;">Personal Raids [+]</a><br> \
												</div> \
												<table id="FPXRaidTablePersonal" cellspacing="3" style="display:none"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatPersonal"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div> \
												<div> \
													<a id="FPXSmallAToggle" href="#" onclick="SRLoaTSX.gui.toggleCollapse(\'FPXSmallAToggle\',\'FPXRaidTableSmall\',\'Small Raids\');return false;">Small Raids [+]</a><br> \
												</div> \
												<table id="FPXRaidTableSmall" style="display:none"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatSmall"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div> \
												<div> \
													<a id="FPXMediumAToggle" href="#" onclick="SRLoaTSX.gui.toggleCollapse(\'FPXMediumAToggle\',\'FPXRaidTableMedium\',\'Medium Raids\');return false;">Medium Raids [+]</a><br> \
												</div> \
												<table id="FPXRaidTableMedium" style="display:none"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatMedium"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div> \
												<div> \
													<a id="FPXLargeAToggle" href="#" onclick="SRLoaTSX.gui.toggleCollapse(\'FPXLargeAToggle\',\'FPXRaidTableLarge\',\'Large Raids\');return false;">Large Raids [+]</a><br> \
												</div> \
												<table id="FPXRaidTableLarge" style="display:none"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatLarge"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div> \
												<div> \
													<a id="FPXEpicAToggle" href="#" onclick="SRLoaTSX.gui.toggleCollapse(\'FPXEpicAToggle\',\'FPXRaidTableEpic\',\'Epic Raids\');return false;">Epic Raids [+]</a><br> \
												</div> \
												<table id="FPXRaidTableEpic" style="display:none"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatEpic"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div> \
												<div> \
													<a id="FPXColossalAToggle" href="#" onclick="SRLoaTSX.gui.toggleCollapse(\'FPXColossalAToggle\',\'FPXRaidTableColossal\',\'Colossal Raids\');return false;">Colossal Raids [+]</a><br> \
												</div> \
												<table id="FPXRaidTableColossal" style="display:none"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatColossal"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div> \
												<div> \
													<a id="FPXGuildAToggle" href="#" onclick="SRLoaTSX.gui.toggleCollapse(\'FPXGuildAToggle\',\'FPXRaidTableGuild\',\'Guild Raids\');return false;">Guild Raids [+]</a><br> \
												</div> \
												<table id="FPXRaidTableGuild" style="display:none"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatGuild"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
											<div> \
												<div> \
													<a id="FPXSpecialAToggle" href="#" onclick="SRLoaTSX.gui.toggleCollapse(\'FPXSpecialAToggle\',\'FPXRaidTableSpecial\',\'Special Raids\');return false;">Special Raids [+]</a><br> \
												</div> \
												<table id="FPXRaidTableSpecial" style="display:none"> \
													<col width="180"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><col width="20"/><thead><tr><th>Raid</th><th>N</th><th>H</th><th>L</th><th>NM</th><th>All</th></tr></thead> \
													<tbody id="FPXRaidFilterWhatSpecial"> \
														<!-- Dynamic content --> \
													</tbody> \
												</table> \
											</div> \
										</div> \
										<iframe id="SRLoaTSX_pastebin" style="display:none"></iframe> \
									</div> \
								</div> \
							</li> \
							<!-- <li class="tab"> \
								<div class="tab_head">Help</div> \
								<div class="tab_pane">Do I need text too?</div> \
							</li> --> \
						</ul> \
					').attach("to",'kong_game_ui').ele();

					pane.style.height = document.getElementById("chat_tab_pane").style.height;
					var e = pane.getElementsByClassName("tab_head")
					for (var i = 0;i<e.length;i++) {
						e[i].addEventListener("click",function(){
							if (!/\bactive\b/i.test(this.className)) {
								var e = document.getElementById("lots_tab_pane").getElementsByTagName("li");
								for (var i = 0;i<e.length;i++) {
									if (e[i].getAttribute("class").indexOf("active") > -1) e[i].className = e[i].className.replace(/ active$/g,"");
								}
								(this.parentNode).className += " active";
							}
						});
					}
					holodeck._tabs.addTab(link);

					var e = pane.getElementsByClassName("tab_pane");
					var w = pane.offsetWidth - 24;
					var h = pane.offsetHeight - e[0].offsetTop - 36;
					for (var i = 0;i<e.length;i++) {
						e[i].style.width = w + "px";
						e[i].style.height = h + "px";
					}

					//spam tab
					var FPXimpSpam= SRLoaTSX.gui.cHTML('#FPXRaidSpamTA');
					FPXimpSpam.ele().style.width = e[0].offsetWidth - 12 + "px";
					FPXimpSpam.ele().style.height = (h - 300) + "px";
					var FPXSpamText="Paste raid and/or pastebin links here to share or import\n\nLinks must be comma (,) separated.";
					FPXimpSpam.ele().value=FPXSpamText;
					FPXimpSpam.ele().addEventListener("blur",function() {
						if (this.value == "") {
							this.value = FPXSpamText;
						}
					});
					FPXimpSpam.ele().addEventListener("focus",function() {
						if (this.value == FPXSpamText) {
							this.value = "";
						}
					});
					
					/*var FPXimpPB = SRLoaTSX.gui.cHTML('#SRLoaTSX_FPX_ImportPastebin');
					var FPXimpText = "Enter pastebin url";
					FPXimpPB.ele().value=FPXimpText;
					FPXimpPB.ele().addEventListener("blur",function() {
						if (this.value == "") {
							this.value = FPXimpText;
						}
					});
					FPXimpPB.ele().addEventListener("focus",function() {
						if (this.value == FPXimpText) {
							this.value = "";
						}
					});*/

					// Raids Tab
					var raid_list = document.getElementById('raid_list');
					raid_list.style.height = (h - raid_list.offsetTop -3) + "px";
					SRLoaTSX.gui.loadRaidList();

					//raidlist global click listener
					raid_list.addEventListener("mouseup",function(event) {
						SRLoaTSX.gui.FPXraidListMouseDown(event);
					},false);
					raid_list.addEventListener("click",function(e) {
						e.preventDefault();
						e.stopPropagation();
						return false;
					},false);
					
					//options tab
					var FPXoptsMarkRightClick = SRLoaTSX.gui.cHTML('#FPX_options_markVisitedRightClick');
					var FPXoptsMarkRightClickDelay = SRLoaTSX.gui.cHTML('#FPX_options_markVisitedRightClickDelay');
					var FPXoptsDispLinkIcon = SRLoaTSX.gui.cHTML('#FPX_options_displayLinkImg');
					var optsFormatRaids = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_formatRaids');
					var optsRaidFormat = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_raidLinkFormat');
					var optsHideARaids = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_hideRaidLinks');
					var optsHideSRaids = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_hideSeenRaids');
					var optsHideVRaids = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_hideVisitedRaids');
					var optsAutoJoinInterval = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_autoJoinTimer');
					var optsShowRaidLink = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_showRaidLink');
					var optsHideVRaidsList = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_hideVisitedRaidsInRaidList');
					var optsWhisperToCheck = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_whisperRaids');
					var optsMarkImportedVisited = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_markImportedRaidsVisited');
					var optsWhisperTo = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_whisperTo');
					var optsMarkMyRaidsVisited = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_markMyRaidsVisited');
					var optsUseMaxRaidCount = SRLoaTSX.gui.cHTML('#FPX_options_useMaxRaidCount');
					var optsMaxRaidCount = SRLoaTSX.gui.cHTML('#FPX_options_maxRaidCount');
					var optsNewRaidsAtTopOfRaidList = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_newRaidsAtTopOfRaidList');
					var optsFormatLinkOutput = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_formatLinkOutput');
					var optsPrettyPost = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_prettyPost');
					var optsAutoImportPaste = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_autoImportPaste');
					var rbUnvisitedPruningAggressive = SRLoaTSX.gui.cHTML('#FPX_options_unvisitedPruningAggressive');
					var rbUnvisitedPruningModerate = SRLoaTSX.gui.cHTML('#FPX_options_unvisitedPruningModerate');
					var rbUnvisitedPruningSlow = SRLoaTSX.gui.cHTML('#FPX_options_unvisitedPruningSlow');
					var rbUnvisitedPruningNone = SRLoaTSX.gui.cHTML('#FPX_options_unvisitedPruningNone');
					if ((SRLoaTSX.config.AutoJoinInterval||'')!='') { optsAutoJoinInterval.ele().value = SRLoaTSX.config.AutoJoinInterval }
					if (SRLoaTSX.config.FPXmarkRightClick) {	FPXoptsMarkRightClick.ele().checked = 'checked'}
					if (SRLoaTSX.config.FPXdisplayListImgLink) {	FPXoptsDispLinkIcon.ele().checked = 'checked'}
					if (SRLoaTSX.config.formatRaidLinks) {	optsFormatRaids.ele().checked = 'checked'}
					if (SRLoaTSX.config.markMyRaidsVisted) { optsMarkMyRaidsVisited.ele().checked = 'checked' }
					if (SRLoaTSX.config.showRaidLink) { optsShowRaidLink.ele().checked = 'checked';}
					if (SRLoaTSX.config.formatLinkOutput) { optsFormatLinkOutput.ele().checked = 'checked'; optsPrettyPost.ele().disabled=true;}
					if (SRLoaTSX.config.prettyPost) { optsPrettyPost.ele().checked='checked'; optsFormatLinkOutput.ele().disabled=true;}
					if (SRLoaTSX.config.markImportedVisited) { optsMarkImportedVisited.ele().checked = 'checked'; }
					if (SRLoaTSX.config.whisperSpam) { optsWhisperToCheck.ele().checked = 'checked'; }
					if ((SRLoaTSX.config.whisperTo||'')!='') { optsWhisperTo.ele().value = SRLoaTSX.config.whisperTo; }
					if (SRLoaTSX.config.useMaxRaidCount) { optsUseMaxRaidCount.ele().checked = 'checked'; }
					if (SRLoaTSX.config.maxRaidCount>0) { optsMaxRaidCount.ele().value = SRLoaTSX.config.maxRaidCount; }
					if (SRLoaTSX.config.autoImportPaste) { optsAutoImportPaste.ele().checked = 'checked'; }
					else { optsRaidFormat.ele().disabled = 'disabled' }
		
					if (SRLoaTSX.config.unvisitedRaidPruningMode == 0) {
						rbUnvisitedPruningAggressive.ele().checked = true;
					} else if (SRLoaTSX.config.unvisitedRaidPruningMode == 1) {
						rbUnvisitedPruningModerate.ele().checked = true;
					} else if (SRLoaTSX.config.unvisitedRaidPruningMode == 2) {
						rbUnvisitedPruningSlow.ele().checked = true;
					} else if (SRLoaTSX.config.unvisitedRaidPruningMode == 3) {
						rbUnvisitedPruningNone.ele().checked = true;
					}

					FPXoptsMarkRightClickDelay.ele().value = SRLoaTSX.config.FPXoptsMarkRightClickDelay;
					document.getElementById('FPX_options_markVisitedRightClickDelay').disabled = !SRLoaTSX.config.FPXmarkRightClick;
					optsRaidFormat.ele().value = SRLoaTSX.config.raidLinkFormat;
					optsRaidFormat.ele().style.width = e[0].offsetWidth - 12 + "px";
					if (SRLoaTSX.config.hideSeenRaids) {optsHideSRaids.ele().checked = 'checked'}
					if (SRLoaTSX.config.hideVisitedRaids) {optsHideVRaids.ele().checked = 'checked'}
					if (SRLoaTSX.config.hideVisitedRaidsInRaidList) { optsHideVRaidsList.ele().checked = 'checked'}
					if (SRLoaTSX.config.hideRaidLinks) {
						optsHideARaids.ele().checked = true;
						optsHideVRaids.ele().disabled = true;
						optsHideSRaids.ele().disabled = true;
					}
					if (SRLoaTSX.config.newRaidsAtTopOfRaidList) { optsNewRaidsAtTopOfRaidList.ele().checked = 'checked'}
					
					optsAutoImportPaste.ele().addEventListener('click', function (){
						SRLoaTSX.config.autoImportPaste = this.checked;
					});
					optsAutoJoinInterval.ele().addEventListener('change', function (){
						if(isNumber(this.value)) SRLoaTSX.config.AutoJoinInterval = parseInt(this.value);
						else SRLoaTSX.gui.errorMessage('Interval must be a number');
					});
					optsMaxRaidCount.ele().addEventListener('change', function (){
						if(isNumber(this.value)) SRLoaTSX.config.maxRaidCount = parseInt(this.value);
						else SRLoaTSX.gui.errorMessage('Raid count must be a number');
					});
					
					optsUseMaxRaidCount.ele().addEventListener('click', function (){
						SRLoaTSX.config.useMaxRaidCount = this.checked;
					});
					
					optsPrettyPost.ele().addEventListener('click', function(){
						SRLoaTSX.config.prettyPost = this.checked;
						if(this.checked){
							document.getElementById("SRLoaTSX_options_formatLinkOutput").checked=false;
							SRLoaTSX.config.formatLinkOutput = false;
						}
						document.getElementById("SRLoaTSX_options_formatLinkOutput").disabled=this.checked;
					});
					
					optsMarkImportedVisited.ele().addEventListener("click", function() {
						SRLoaTSX.config.markImportedVisited = this.checked;
					});
					
					optsWhisperToCheck.ele().addEventListener("click", function(){
						SRLoaTSX.config.whisperSpam = this.checked;
					});
					
					optsWhisperTo.ele().addEventListener("change", function(){
						console.log("[SRLoaTSX] Whisper person changed to " + this.value);
						SRLoaTSX.config.whisperTo = this.value;
					});
					optsFormatLinkOutput.ele().addEventListener("click", function(){
						SRLoaTSX.config.formatLinkOutput = this.checked;
						if(this.checked){
							document.getElementById("SRLoaTSX_options_prettyPost").checked=false;
							document.getElementById("SRLoaTSX_options_prettyPost").disabled=true;
							SRLoaTSX.config.prettyPost = false;
						}
						document.getElementById("SRLoaTSX_options_prettyPost").disabled=this.checked;
					});
					
					optsShowRaidLink.ele().addEventListener("click", function() {
						SRLoaTSX.config.showRaidLink = this.checked;
						var els = document.getElementsByClassName("RaidQuickLink");
						for(var i=0; i<els.length; i++){
							els[i].style.display = (this.checked?'inline':'none');
						}
					});
					
					optsMarkMyRaidsVisited.ele().addEventListener("click", function() {
						SRLoaTSX.config.markMyRaidsVisted = this.checked;
					});
					FPXoptsMarkRightClick.ele().addEventListener("click",function() {
						SRLoaTSX.config.FPXmarkRightClick = this.checked;
						document.getElementById('FPX_options_markVisitedRightClickDelay').disabled = !SRLoaTSX.config.FPXmarkRightClick;
					
					},false);
					FPXoptsDispLinkIcon.ele().addEventListener("click",function() {
						SRLoaTSX.config.FPXdisplayListImgLink = this.checked;
						console.log("[SRLoaTSX]::{FPX}::FPXdisplayListImgLink="+SRLoaTSX.config.FPXdisplayListImgLink);
					},true);
					FPXoptsMarkRightClickDelay.ele().addEventListener("blur",function() {
						if (/^\d+$/ig.test(this.value)) {
							SRLoaTSX.config.FPXoptsMarkRightClickDelay = parseInt(this.value);
						}
						else {
							this.value = SRLoaTSX.config.FPXoptsMarkRightClickDelay;
						}
					});
					optsRaidFormat.ele().addEventListener("blur",function() {
						if (this.value != "") {
							SRLoaTSX.config.raidLinkFormat = this.value;
						}
						else {
							this.value = SRLoaTSX.config.raidLinkFormat;
						}
					});
					optsFormatRaids.ele().addEventListener("click",function() {
						document.getElementById('SRLoaTSX_options_raidLinkFormat').disabled = (this.checked == true?false:true);
						SRLoaTSX.config.formatRaidLinks = this.checked;
					},true);
					optsHideARaids.ele().addEventListener("click",function() {
						document.getElementById('SRLoaTSX_options_hideVisitedRaids').disabled = this.checked;
						document.getElementById('SRLoaTSX_options_hideSeenRaids').disabled = this.checked;
						SRLoaTSX.config.hideRaidLinks = this.checked;
						SRLoaTSX.gui.toggleCSS({id: "SRLoaTSX_raidClass", cls:".SRLoaTSX_raid{display: "+(this.checked == true?'none !important':'block')+"}"})
					},true);
					optsHideSRaids.ele().addEventListener("click",function() {
						SRLoaTSX.config.hideSeenRaids = this.checked;
						SRLoaTSX.gui.toggleCSS({id: "SRLoaTSX_seenRaidClass", cls:".SRLoaTSX_seenRaid{display: "+(this.checked == true?'none !important':'block')+"}"})
					},true);
					optsHideVRaids.ele().addEventListener("click",function() {
						SRLoaTSX.config.hideVisitedRaids = this.checked;
						//FPX::FPX_options_markVisitedRightClickDelay disable
						SRLoaTSX.gui.toggleCSS({id: "SRLoaTSX_visitedRaidClass", cls:".SRLoaTSX_visitedRaid{display: "+(this.checked == true?'none !important':'block')+"}"})
					},true);
					optsHideVRaidsList.ele().addEventListener("click",function() {
						SRLoaTSX.config.hideVisitedRaidsInRaidList = this.checked;
						SRLoaTSX.gui.toggleCSS({id: "SRLoaTSX_visitedRaidListClass", cls:".SRLoaTSX_visitedRaidList{display:"+(this.checked == true?'none !important':'block')+"}"})
					},true);
					optsNewRaidsAtTopOfRaidList.ele().addEventListener("click",function() {
						SRLoaTSX.config.newRaidsAtTopOfRaidList = this.checked;
					},true);

					rbUnvisitedPruningAggressive.ele().addEventListener("click",function() {
						SRLoaTSX.config.unvisitedRaidPruningMode = 0;
					},true);

					rbUnvisitedPruningModerate.ele().addEventListener("click",function() {
						SRLoaTSX.config.unvisitedRaidPruningMode = 1;
					},true);

					rbUnvisitedPruningSlow.ele().addEventListener("click",function() {
						SRLoaTSX.config.unvisitedRaidPruningMode = 2;
					},true);

					rbUnvisitedPruningNone.ele().addEventListener("click",function() {
						SRLoaTSX.config.unvisitedRaidPruningMode = 3;
					},true);

					// Filtering tab					
					for (var i in SRLoaTSX.raids) {
						if (SRLoaTSX.raids.hasOwnProperty(i)) {
							var raid = SRLoaTSX.raids[i];

							var parentTableId = 'FPX_options_cbs_' + raid.id;
							var parentTable = SRLoaTSX.gui.cHTML('tr').set({id: parentTableId}).html(' \
								<td>' + raid.name + '</td> \
								<td><input type="checkbox" id="cb_filter_' + raid.id + '_0' + '"/></td> \
								<td><input type="checkbox" id="cb_filter_' + raid.id + '_1' + '"/></td> \
								<td><input type="checkbox" id="cb_filter_' + raid.id + '_2' + '"/></td> \
								<td><input type="checkbox" id="cb_filter_' + raid.id + '_3' + '"/></td> \
								<td><input type="checkbox" id="cb_filter_' + raid.id + '_all' + '"/></td>');

							if (raid.size == 1) {
								parentTable.attach('to','FPXRaidFilterWhatPersonal');
							} else if (raid.stat == 'H' || raid.stat == 'h') {
								parentTable.attach('to','FPXRaidFilterWhatGuild');
							} else if (raid.size == 10 || raid.size == 13) {
								parentTable.attach('to','FPXRaidFilterWhatSmall');
							} else if (raid.size == 50) {
								parentTable.attach('to','FPXRaidFilterWhatMedium');
							} else if (raid.size == 100) {
								parentTable.attach('to','FPXRaidFilterWhatLarge');
							} else if (raid.size == 250) {
								parentTable.attach('to','FPXRaidFilterWhatEpic');
							} else if (raid.size == 500) {
								parentTable.attach('to','FPXRaidFilterWhatColossal');
							} else {
								parentTable.attach('to','FPXRaidFilterWhatSpecial');
							}

							
							for (var j=0; j<4; j++) {
								var cb_id = "cb_filter_" + raid.id + '_' + j;
								var is_checked = (SRLoaTSX.config.getFilter(raid.id,j) == true ? false : true);
								var cb = SRLoaTSX.gui.cHTML('#' + cb_id);	
								cb.ele().checked = is_checked;

								cb.ele().addEventListener("click",function() {
									var raidid = "";
									var diffIndex = "";
									var reg = /cb_filter_([0-9a-z_]+)_([0-9])/i;
									if ((i = reg.exec(this.id)) != null) {
										raidid = i[1];
										diffIndex = parseInt(i[2]);
									}
									SRLoaTSX.config.setFilter(raidid,diffIndex,!this.checked);
									SRLoaTSX.gui.toggleCSS({id: "SRLoaTSX_filteredRaidChat" + raidid + '_' + diffIndex + "Class", 
										cls:".SRLoaTSX_filteredRaidChat" + raidid + '_' + diffIndex + "{display: "+((this.checked==false && SRLoaTSX.config.filterChatLinks)?'none !important':'block')+"}"});
									SRLoaTSX.gui.toggleCSS({id: "SRLoaTSX_filteredRaidList" + raidid + '_' + diffIndex + "Class", 
										cls:".SRLoaTSX_filteredRaidList" + raidid + '_' + diffIndex + "{display: "+((this.checked==false && SRLoaTSX.config.filterRaidList)?'none !important':'block')+"}"});
							
									var f1 = SRLoaTSX.config.getFilter(raidid,0);
									var f2 = SRLoaTSX.config.getFilter(raidid,1);
									var f3 = SRLoaTSX.config.getFilter(raidid,2);
									var f4 = SRLoaTSX.config.getFilter(raidid,3);

									var cb_all_id = "cb_filter_" + raidid + '_all';
									
									if ((!f1 && !f2 && !f3 && !f4) || (f1 && f2 && f3 && f4)) {
										var cb = SRLoaTSX.gui.cHTML('#' + cb_all_id);
										cb.ele().checked = this.checked;
									} 


								},true);	
							}

							var all_cb_id = "cb_filter_" + raid.id + "_all";
							var is_checked = (SRLoaTSX.config.getFilter(raid.id,0) == true && SRLoaTSX.config.getFilter(raid.id,1) == true && SRLoaTSX.config.getFilter(raid.id,2) == true && SRLoaTSX.config.getFilter(raid.id,3) == true) ? false : true;
							var cb = SRLoaTSX.gui.cHTML('#' + all_cb_id);
							cb.ele().checked = is_checked;

							cb.ele().addEventListener("click",function() {
								var reg = /cb_filter_([0-9a-z_]+)_all/i;
								var raidid = "";
								if ((i = reg.exec(this.id)) != null) {
									raidid = i[1];
								}

								for (var j=0;j<4;j++) {
									var cb_id = "cb_filter_" + raidid + '_' + j;
									var subcb = SRLoaTSX.gui.cHTML('#' + cb_id);
									subcb.ele().checked = this.checked;
									SRLoaTSX.config.setFilter(raidid,j,!this.checked);
																												SRLoaTSX.gui.toggleCSS({id: "SRLoaTSX_filteredRaidChat" + raidid + '_' + j + "Class", 
										cls:".SRLoaTSX_filteredRaidChat" + raidid + '_' + j + "{display: "+((this.checked==false && SRLoaTSX.config.filterChatLinks)?'none !important':'block')+"}"});
									SRLoaTSX.gui.toggleCSS({id: "SRLoaTSX_filteredRaidList" + raidid + '_' + j + "Class", 
										cls:".SRLoaTSX_filteredRaidList" + raidid + '_' + j + "{display: "+((this.checked==false && SRLoaTSX.config.filterRaidList)?'none !important':'block')+"}"});
								}

							},true);					
						}
					}

					var filterChatCb = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_perRaidFilterLinks');
					filterChatCb.ele().checked = SRLoaTSX.config.filterChatLinks;
					filterChatCb.ele().addEventListener("click",function() {
						SRLoaTSX.config.filterChatLinks = this.checked;			

						for (var i in SRLoaTSX.raids) {
							if (SRLoaTSX.raids.hasOwnProperty(i)) {
								var raid = SRLoaTSX.raids[i];

								for (var j=0; j<4; j++) {
									SRLoaTSX.gui.toggleCSS({id: "SRLoaTSX_filteredRaidChat" + raid.id + '_' + j + "Class",
										cls:".SRLoaTSX_filteredRaidChat" + raid.id + '_' + j + "{display: "+((SRLoaTSX.config.getFilter(raid.id,j)==true && SRLoaTSX.config.filterChatLinks)?'none !important':'block')+"}"});
								}
							}
						}

					},true);

					var filterListCb = SRLoaTSX.gui.cHTML('#SRLoaTSX_options_perRaidFilterRaidList');
					filterListCb.ele().checked = SRLoaTSX.config.filterRaidList;
					filterListCb.ele().addEventListener("click",function() {
						SRLoaTSX.config.filterRaidList = this.checked;			

						for (var i in SRLoaTSX.raids) {
							if (SRLoaTSX.raids.hasOwnProperty(i)) {
								var raid = SRLoaTSX.raids[i];

								for (var j=0; j<4; j++) {
									SRLoaTSX.gui.toggleCSS({id: "SRLoaTSX_filteredRaidList" + raid.id + '_' + j + "Class",
										cls:".SRLoaTSX_filteredRaidList" + raid.id + '_' + j + "{display: "+((SRLoaTSX.config.getFilter(raid.id,j)==true && SRLoaTSX.config.filterRaidList)?'none !important':'block')+"}"});
								}
							}
						}

					},true);		

					SRLoaTSX.gui.cHTML('li').set({
						class: 'spritegame'
					}).html("<a href=\"http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns\" onclick=\"SRLoaTSX.reload(); return false;\">Reload Game</a>").attach("after","get_kreds_link");

					// Start raid pruning 10 seconds after loading completion
					setTimeout('SRLoaTSX.gui.BeginDeletingExpiredUnvisitedRaids(); SRLoaTSX.purge();',10000);

					console.log("[SRLoaTSX] Loading is complete.");
				}
				else {setTimeout(SRLoaTSX.gui.load,5)}
				SRLoaTSX.gui.doStatusOutput('Loaded successfully');
			},
			loadRaidList: function () {
				var i = document.getElementById("raid_list");
				while (i.hasChildNodes() && i.childNodes.length > 0) {
					i.removeChild(i.firstChild);
				}
				for (var a in SRLoaTSX.config.raidList) {
					if (SRLoaTSX.config.raidList.hasOwnProperty(a)) {
						SRLoaTSX.gui.addRaid(a);
					}
				}
			},
			loadPasteList: function () {//todo after gui
				
			},
			FPXraidLinkClickRaidList: function (ele,isRightClick, isCopy) {
				if(!isRightClick){
					console.log("[SRLoaTSX] FPXraidLinkClickRaidList");
					SRLoaTSX.loadRaid(ele.href);
				}
				else if(document.getElementById('FPX_options_markVisitedRightClick').checked){
					var id= ele.parentNode.parentNode.getAttribute("raidid");	
					SRLoaTSX.config.raidList[id].visited = true;
					SRLoaTSX.gui.toggleRaid('visited',id,true);				
					SRLoaTSX.gui.raidListItemUpdate(id);
				}
			},
			FPXraidLinkClickChat: function (id,link,isRightClick) {
				if(!isRightClick){
					console.log("[SRLoaTSX] FPXraidLinkClickChat");
					SRLoaTSX.loadRaid(link);
				}
				else if(SRLoaTSX.config.FPXmarkRightClick){
					SRLoaTSX.config.raidList[id].visited = true;
					SRLoaTSX.gui.toggleRaid('visited',id,true);				
					SRLoaTSX.gui.raidListItemUpdate(id);
				}
			},
			FPXraidListMouseDown: function (e) {
				e.preventDefault();
				
				var classtype=e.element().className;
				e = e || window.event;
				e.stopPropagation();
				console.log("[SRLoaTSX]::{FPX}:: Clicked on::"+classtype+"::"+e.which);
				if(e.which == 1){
					if(classtype == "raid_list_item_head"){
						var con = document.getElementById("raid_list").getElementsByClassName("active");
						if (con.length == 1) con[0].className = con[0].className.replace(/ active/gi,"");
						e.element().parentNode.className += " active";
						SRLoaTSX.gui.raidListItemUpdateTimeSince(e.element().parentNode.getAttribute("raidid"));
						return false;
					}else if(classtype == "FPXtext"){
						var con = document.getElementById("raid_list").getElementsByClassName("active");
						if (con.length == 1) con[0].className = con[0].className.replace(/ active/gi,"");
						e.element().parentNode.parentNode.className += " active";
						SRLoaTSX.gui.raidListItemUpdateTimeSince(e.element().parentNode.parentNode.getAttribute("raidid"));
						return false;
					}else if(classtype == "FPXlink"){
						SRLoaTSX.gui.FPXraidLinkClickRaidList(e.element(), false); return false;
					}else if(classtype == "FPXDeleteLink"){
						SRLoaTSX.gui.deleteRaid(e.element(),e.element().parentNode.parentNode.parentNode.getAttribute("raidid")); return false;
					}else if(classtype == "link"){
						SRLoaTSX.gui.FPXraidLinkClickRaidList(e.element(), false); return false;
					}else if(classtype == "FPXcbVisited"){
						console.log("[SRLoaTSX]::{FPX}:: Clicked on::"+classtype+"::"+e.which+"::"+e.element().parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("raidid"));
						e.element().checked=(e.element().checked == true?false:true);
						SRLoaTSX.gui.raidListCBClicked(e.element(),'visited',e.element().parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("raidid"));
					}else if(classtype == "FPXcbSeen"){
						//onclick="SRLoaTSX.gui.raidListCBClicked(this,\'seen\',\''+r.hash+'\')"'+(r.seen == true?' checked="checked"':'')+'
						console.log("[SRLoaTSX]::{FPX}:: Clicked on::"+classtype+"::"+e.which+"::"+e.element().parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("raidid"));
						e.element().checked=(e.element().checked == true?false:true);
						SRLoaTSX.gui.raidListCBClicked(e.element(),'seen',e.element().parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("raidid"));
					}else if(classtype == "RaidQuickLink"){
						SRLoaTSX.gui.FPXraidLinkClickRaidList(e.element(), false); return false;
					}
				}else if(e.which == 3){
					if(classtype == "FPXlink" || classtype == "link" || classtype == "RaidQuickLink"){
						(function() { return setTimeout(function() {SRLoaTSX.gui.FPXraidLinkClickRaidList(e.element(),true);}, SRLoaTSX.config.FPXoptsMarkRightClickDelay)})();
						return false;
					}
				}
			},
			FPXraidLinkMouseDown: function (e,param1,param2,isChat) {
				e = e || window.event;
				if(isChat){
					switch (e.which) {
						case 1: SRLoaTSX.gui.FPXraidLinkClickChat(param1,param2,false); break;
						case 3: 
								if(SRLoaTSX.config.FPXmarkRightClick){
									(function(p1,p2) {return setTimeout(function() {SRLoaTSX.gui.FPXraidLinkClickChat(p1,p2,true);}, SRLoaTSX.config.FPXoptsMarkRightClickDelay)})(param1,param2);
								}else{
									SRLoaTSX.gui.FPXraidLinkClickChat(param1,param2,true); 
								}
								break;
					}
				}else
				{
					switch (e.which) {
						case 1: SRLoaTSX.gui.FPXraidLinkClickRaidList(param1,false); break;
						case 3: (function(p1) { return setTimeout(function() {SRLoaTSX.gui.FPXraidLinkClickRaidList(p1,true);}, SRLoaTSX.config.FPXoptsMarkRightClickDelay)})(param1); break; 
					}
				}
			},
			raidListCBClicked: function (ele,cb,id) {
			console.log("[SRLoaTSX]::{FPX}:: Clicked on::"+ele.checked+"::"+cb+"::"+id);
				if (SRLoaTSX.config.raidList[id]) {
				console.log("[SRLoaTSX]::{FPX}:: Clicked on1::"+ele.checked+"::"+cb+"::"+id);
					SRLoaTSX.config.raidList[id][cb] = ele.checked;
					console.log("[SRLoaTSX]::{FPX}:: Clicked on2::"+ele+"::"+cb+"::"+id);
					SRLoaTSX.gui.toggleRaid(cb,id,true);
					console.log("[SRLoaTSX]::{FPX}:: Clicked on3::"+ele+"::"+cb+"::"+id);
					if (cb =='visited') {
						console.log("[SRLoaTSX]::{FPX}:: Clicked on4::"+ele+"::"+cb+"::"+id);
						ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("FPXtext")[1].innerHTML = (ele.checked?"visited":"");
						console.log("[SRLoaTSX]::{FPX}:: Clicked on5::"+ele+"::"+cb+"::"+ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("FPXtext")[1].innerHTML);
					}
				}
			},
			raidListItemUpdateTimeSince: function (id) {
				var raid = SRLoaTSX.config.raidList[id];
				if (typeof raid == 'object') {
					document.getElementById('timeSince_' + id).innerHTML = timeSince(new Date(raid.timeStamp))
				}
			},
			raidListItemUpdate: function (id) {
				var raid = SRLoaTSX.config.raidList[id];
				if (typeof raid == 'object') {
					var ele = document.getElementById("raid_list").firstChild;
					while (ele) {
						if (ele.getAttribute("raidid") == id) {
							ele.getElementsByClassName("FPXtext")[1].innerHTML = (raid.visited == true?'visited':'');
							ele.getElementsByTagName("input")[0].checked = (raid.seen == true?true:false);
							ele.getElementsByTagName("input")[1].checked = (raid.visited == true?true:false);
							break;
						}
						ele = ele.nextSibling;
					}
				}
				else {
					SRLoaTSX.gui.raidListItemRemoveById(id);
				}
			},
			raidListItemRemoveById: function (id) {
				var e, ele = document.getElementById("raid_list").firstChild;
				while (typeof ele != 'null') {
					if (ele.getAttribute("raidid") == id) {
						break;
					}
					ele = ele.nextSibling;
				}
				if (ele) {
					while (typeof (e = ele.nextSibling) != 'null') {
						e.setAttribute("style",(e.getAttribute("style").indexOf('background-color:#e0e0e0') > -1?"":'background-color:#e0e0e0'))
					}
					ele.parentNode.removeChild(ele);
				}
			},
			toggleCSS: function (p) {
				document.head.removeChild(document.getElementById(p.id));
				SRLoaTSX.gui.cHTML("style").set({type: "text/css", id: p.id}).text(p.cls).attach("to",document.head);
			},
			toggleRaid: function(type,id,tog) {
				var d = document.getElementsByClassName("SRLoaTSX_raidid_" + id);
				if (typeof SRLoaTSX.config.raidList[id] == 'object') {
					var raid = SRLoaTSX.config.raidList[id];
					var raid = SRLoaTSX.getRaidDetails("&kv_difficulty="+raid.diff+"&kv_hash="+raid.hash+"&kv_raid_boss="+raid.boss+"&kv_raid_id="+raid.id);
				}
				for (var i = d.length -1;i>-1;i--) {
					if (tog == true && d[i].className.indexOf("SRLoaTSX_"+type+"Raid") == -1) {
						d[i].className += " SRLoaTSX_"+type+"Raid";
					}
					else if (tog == false && d[i].className.indexOf("SRLoaTSX_"+type+"Raid") > -1) {
						d[i].className = d[i].className.replace(eval("/SRLoaTSX_"+type+"Raid( |$)/i"),"");
					}
					if (typeof raid == 'object') {
						d[i].getElementsByTagName("a")[0].innerHTML = raid.linkText();
					}
				}

				var d2 = document.getElementsByClassName("raid_list_item_" + id);
				for (var j = d2.length -1;j>-1;j--) {
					if (tog == true && d2[j].className.indexOf("SRLoaTSX_"+type+"RaidList") == -1) {
						d2[j].className += " SRLoaTSX_"+type+"RaidList";
					}
					else if (tog == false && d2[j].className.indexOf("SRLoaTSX_"+type+"RaidList") > -1) {
						d2[j].className = d2[j].className.replace(eval("/SRLoaTSX_"+type+"RaidList( |$)/i"),"");
					}
				}
			}
		},
		load: function (fails) {
			if (typeof holodeck == 'object' && typeof ChatDialogue == 'function' && typeof activateGame == 'function' && typeof document.getElementById('kong_game_ui') != 'null') {
				ChatDialogue.prototype.SRLoaTSX_echo = function(msg){
					this.SRLoaTSX_DUM("LoaTS Extention","<br>"+msg,{class: "whisper whisper_recieved"},{non_user: true})
				}
				ChatDialogue.prototype.SRLoaTSX_DUM = ChatDialogue.prototype.displayUnsanitizedMessage;
				ChatDialogue.prototype.displayUnsanitizedMessage=function (b,d,e,f) {
					if(!this._user_manager.isMuted(b)){
						if (typeof e != 'object') { 
							e = {class: ''} 
						}
						else if (typeof e.class != 'string') {
							e.class = '';
						}
						var isPublic = false;
						try {
							isPublic = (/^room_\d+-legacy-of-a-thousand-suns-\d+$/i.test(this._holodeck._chat_window._active_room._short_room_name) && e.class.indexOf("whisper") == -1?true:false)
						}
						catch(err){}

						
						var raid = SRLoaTSX.getRaidLink(d,b,isPublic)
						if (typeof raid == 'object') {
							e.class+= " SRLoaTSX_raid";
							e.class+= " SRLoaTSX_hash_"+raid.hash;
							e.class+= " SRLoaTSX_raidid_"+raid.id;
							e.class+= (raid.seen?" SRLoaTSX_seenRaid":'');
							e.class+=(raid.visited?" SRLoaTSX_visitedRaid":'');
							e.class+=" SRLoaTSX_filteredRaidChat" + raid.boss + '_' + (raid.diff - 1);							
							d = raid.ptext + '<a href="'+raid.url+'" onClick="return false;" onMouseDown="SRLoaTSX.gui.FPXraidLinkMouseDown(event,'+'\''+raid.id+'\''+',this.href,true); return false">'+raid.linkText()+'</a>'+raid.ntext;
							SRLoaTSX.gui.toggleRaid('visited',raid.id,raid.visited);
							SRLoaTSX.config.raidList[raid.id].seen = true;
							SRLoaTSX.gui.raidListItemUpdate(raid.id);
							if(raid.isNew && !SRLoaTSX.gui.AutoJoin)
								SRLoaTSX.gui.updateMessage();
						}
						var pb = SRLoaTSX.getPastebinLink(d,b,isPublic)
						if (typeof pb == 'object') {
							var doImport = pb.user!=active_user.username() && SRLoaTSX.config.autoImportPaste && pb.user==b;
							d = pb.ptext + '<a href="'+pb.url+'" target="_blank">'+(pb.isNew?'Pastebin Link':pb.user+'\'s Pastebin')+'</a> <span class="pb_'+pb.id+'">('+(doImport?'Importing...':'<a href="#" onClick="return false;" onMouseDown="SRLoaTSX.gui.FPXImportPasteBin(\''+pb.url+'\')">Import</a>')+')</span>'+pb.ntext;
							if(doImport){
								setTimeout("SRLoaTSX.gui.FPXImportPasteBin('"+pb.url+"');", 1000);
							}
						}
						
						this.SRLoaTSX_DUM(b,d,e,f);
					}
				}
				holodeck.addChatCommand("raidformat",function(deck,text){
					if (/^\/raidformat$/i.test(text)) {
						var i = SRLoaTSX.config.raidLinkFormat.replace(/</g,"&lt;").replace(/>/g,"&gt;")
						SRLoaTSX.echo("Raid Link formatting is: <b>" + (SRLoaTSX.config.formatRaidLinks?"on":"off")+"</b><br>Current Format:<br>"+i);
					}
					else if (/^\/raidformat on$/i.test(text)) {
						if (SRLoaTSX.config.formatRaidLinks == false) {
							SRLoaTSX.config.formatRaidLinks = true;
							SRLoaTSX.echo("Raid link formatting is now enabled");
						}
						else {
							SRLoaTSX.echo("Raid link formatting is already enabled")
						}
					}
					else if (/^\/raidformat off$/i.test(text)) {
						if (SRLoaTSX.config.formatRaidLinks == true) {
							SRLoaTSX.config.formatRaidLinks = false;
							SRLoaTSX.echo("Raid link formatting is now disabled");
						}
						else {
							SRLoaTSX.echo("Raid link formatting is already disabled")
						}
					}
					else if (/^\/raidformat help$/i.test(text)) {
						SRLoaTSX.gui.help("raidformat")
					}
					else if (SRLoaTSX.config.formatRaidLinks == false) {
						SRLoaTSX.echo('<b>/raidformat</b>: You must enable raid link formatting before you can set the format. (<a href="#" onclick="SRLoaTSX.gui.help(\'raidformat\'); return false">help</a>)')
					}
					else if (i = /^\/raidformat (\S.*)$/i.exec(text)) {
						SRLoaTSX.config.raidLinkFormat = i[1];
						SRLoaTSX.gui.cHTML('#SRLoaTSX_options_raidLinkFormat').ele().value = i[1];
						SRLoaTSX.echo("Raid format now set to:<br>"+i[1].replace(/</g,"&lt;").replace(/>/g,"&gt;"));
					}
					else {
						SRLoaTSX.echo('<b>/raidformat</b>: Invalid parameters specified. (<a href="#" onclick="SRLoaTSX.gui.help(\'raidformat\'); return false">help</a>)')
					}
					return false;
				});
				holodeck.addChatCommand("lr",function(deck,text){
					var u;
					if (u = /^\/lr (\S+)$/i.exec(text)) {SRLoaTSX.loadRaid(u[1]);}
					else {SRLoaTSX.echo('<b>/loadraid</b>: Invalid raid specified. (<a href="#" onclick="SRLoaTSX.gui.help(\'loadraid\'); return false">help</a>)');}
					return false;
				});
				holodeck.addChatCommand("loadraid",function(deck,text){
					var u;
					if (u = /^\/loadraid (\S+)$/i.exec(text)) {SRLoaTSX.loadRaid(u[1]);}
					else {SRLoaTSX.echo('<b>/loadraid</b>: Invalid raid specified. (<a href="#" onclick="SRLoaTSX.gui.help(\'loadraid\'); return false">help</a>)');}
					return false;
				});
				holodeck.addChatCommand("stop",function(deck,text){
					if(SRLoaTSX.gui.isPosting)
					{
						SRLoaTSX.gui.FPXStopPosting();
					}else{SRLoaTSX.echo('<b>/stop</b>: Links are not being posted. Stop command invalid.');}
					return false;
				});
				holodeck.addChatCommand("help", function(deck,text) {
					window.open("https://docs.google.com/spreadsheet/viewform?formkey=dGM4Vy1jbUZXOUpzM3ZjNUY0V21fLWc6MQ");
					SRLoaTSX.echo("Help window opened.");
					return false;
				});
				holodeck.addChatCommand("reload",function(deck,text){
					if (/^\/reload$/i.test(text)) {
						SRLoaTSX.reload();
					}
					else {
						SRLoaTSX.echo('<b>/reload</b>: Invalid parameters specified. (<a href="#" onclick="SRLoaTSX.gui.help(\'reload\'); return false">help</a>)');
					}
					return false
				});
				holodeck.addChatCommand("toggle",function (deck,text){
					var i;
					if (/^\/toggle$/i.test(text)) {
						var msg = "<b>Current Displays:</b><br>"
						msg += "Visited Raids: "+(!SRLoaTSX.config.hideVisitedRaids?'Shown':'hidden')+"<br>";
						msg += "Seen Raids: "+(!SRLoaTSX.config.hideSeenRaids?'Shown':'Hidden')+"<br>";
						SRLoaTSX.echo(msg);
					}
					else if (i = /^\/toggle (visited|seen)( show| hide)?$/i.exec(text)) {
						var p1 = i[1].toLowerCase();
						if (typeof i[2] == 'string' && i[2] != '') {
							var p2 = i[2].toLowerCase()
						}
						else {
							p2 = '';
						}

						var h = p1.substring(0,1).toUpperCase()+p1.substring(1);
						if (p2 == '') {
							SRLoaTSX.echo(h+" raids are currently: "+(SRLoaTSX.config[(p1 == "visited"?"hideVisitedRaids":"hideSeenRaids")] == true?"Hidden":"Shown"));
						}
						else {
							var eleId = "SRLoaTSX_" + p1 + "RaidClass";
							var state = document.getElementById(eleId).innerText.indexOf("none") > -1?"h":"s";
							var setTo = p2==" hide"?"h":"s";
							if (state == setTo) {
								SRLoaTSX.echo(h+" raids are already "+(state=="s"?"Shown":"Hidden"));
							}
							else {
								var cls = '.SRLoaTSX_'+p1+'Raid{display: '+(setTo=="s"?"block}":"none !important}");
								SRLoaTSX.gui.toggleCSS({id: eleId, cls: cls});
								SRLoaTSX.echo(h+" raids are now set to be "+(setTo=="s"?"Shown":"Hidden"));
							}

						}
					}
					else {
						SRLoaTSX.echo('Invalid parameters specified. (<a href="#" onclick="SRLoaTSX.gui.help(\'toggleraidview\'); return false">help</a>)');
					}
					return false;
				});
				holodeck.addChatCommand("clear",function(deck,text){
					holodeck.activeDialogue().clear();
					return false
				});
				holodeck.addChatCommand("spit",function(deck,text) {
					var p;
					if (p = /^\/spit ([0-9]*).*$/i.exec(text)) {
						var r = SRLoaTSX.config.getRaid(p[1]);
						var adjectives = ['stupid','worthless','terrible','awful','despicable','horrible','disgusting','ridiculous','horrendous','abominable','hideous'];
						var spitSounds = ['*ptoo*','*ptooie*', '*ptui*', '*pthu*'];
						var random1=Math.floor(Math.random()*11);
						var random2=Math.floor(Math.random()*4);
						if (typeof r == 'object') {
							var text = r.lastUser + ", I spit on your " + adjectives[random1] + " " + SRLoaTSX.raids[r.boss].name + "! " + spitSounds[random2] + "!";
							var elems= document.getElementById("chat_rooms_container").firstChild.getElementsByTagName('textarea');
							for (var i in elems){
								if((" "+elems[i].className+" ").indexOf(" chat_input ") > -1)
									{elems[i].value = text;holodeck.activeDialogue().sendInput(); break;
								}
							}
						}
					}
					return false;

				});				

				holodeck.addChatCommand("raid", function(deck,text){
					var p;
					if (p = /^\/raid (.*?)(?: ([1-6]))?$/i.exec(text)) {
						var msg = "";
						var start = (!isNaN(p[2]))?p[2]-1:0;
						var find = p[1].toLowerCase();
						for (var i in SRLoaTSX.raids) {
							if (SRLoaTSX.raids.hasOwnProperty(i)) {
								var raid = SRLoaTSX.raids[i];
								if (raid.name.toLowerCase().indexOf(find) > -1) {
									if (msg != "") msg += "<br>"
									msg += "<b>"+raid.name+"</b><br>";
									msg += "Size: "+raid.size+"<br>";
									msg += "Stats: "+SRLoaTSX.getStatText(raid.stat)+"<br>";
									msg += "Duration: "+raid.duration + "hrs<br>";
									if (raid.health[0] == 'Unlimited') {
										msg += "---<br>Health: Unlimited<br>FairShare: 1B<br>Optimal Share: 1B<br>";
									}
									else {
										var end = (isNaN(p[2])?(raid.id == 'echthros'?6:4):p[2]);
										
										for (var n = start;n<end;n++) {
											var h = raid.health[n];
											msg += "---<br>";
											msg += "Difficulty: "+["Normal","Hard","Legendary","Nightmare","Insane","Hell"][n]+"<br>";
											msg += "Health: "+SRLoaTSX.getShortNum(h)+"<br>";
											if (typeof raid.loottiers == 'object') {
												msg += "Loot Tiers: " + SRLoaTSX.getLootTierText(raid.id,n) + "<br>";
											} else {
												var fs = h / raid.size;
												var os = fs*{"1": 1, "10": 1.25,"50":2.2, "100": 2.3, "250": 1, "500": 1.5}[raid.size + ""];
												msg += "Fair Share: "+SRLoaTSX.getShortNum(fs)+"<br>";
												msg += "Optimal Share: "+SRLoaTSX.getShortNum(os)+"<br>";
											}
										}
									}
								}
							}
						}
						if (msg != "") {
							SRLoaTSX.echo(msg);
						}
						else {
							SRLoaTSX.echo('No raids found matching: '+p[1]);
						}
					}
					else {
						SRLoaTSX.echo('<b>/raid</b>: Invalid parameters specified (<a href="#" onclick="SRLoaTSX.gui.help(\'raid\')">help</a>)');
					}
					return false;
				});
				holodeck.addChatCommand("version", function(deck,text) {
					var d = "<b>Version</b>: "+SRLoaTSX.version.major+"("+SRLoaTSX.version.minor+")<br>";
					d += "<b>Major Version</b>: "+SRLoaTSX.version.major+"<br>"
					d += "<b>Minor Version</b>: "+SRLoaTSX.version.minor+"<br>"
					d += '<a href="http://userscripts.org/scripts/show/140080" target="_blank">Go to script page</a>';
					SRLoaTSX.echo(d);
					return false;
				});
				holodeck.addChatCommand("update", function(deck,text) {
					window.open("http://userscripts.org/scripts/show/140080");
					SRLoaTSX.echo("After installation, you will need to refresh this page");
					return false;
				});
				var i;
				if (typeof (i = SRLoaTSX.getRaidDetails(document.location.href)) == 'object'){
					if (SRLoaTSX.config.getRaid(i.id)) {
						SRLoaTSX.config.raidList[i.id].visited = true;
						SRLoaTSX.config.raidList[i.id].seen = true;
					}
					else {
						SRLoaTSX.config.addRaid(i.hash,i.id,i.boss,i.diff,true,true,false,'')
					}
				}
				window.onbeforeunload = function(){
					SRLoaTSX.config.pasteList = {};//for now just purge pastys when page is left
					SRLoaTSX.config.save(false);
				}

				SRLoaTSX.config.save();
				SRLoaTSX.gui.load();
				setTimeout(function(){delete SRLoaTSX.load},1);
				console.log("[SRLoaTSX] Core loaded; Loading user interface...");
			}

			else if (fails < 10) {
				console.log("[SRLoaTSX] Missing needed Kongregate resources, retrying in 5 seconds....");
				setTimeout(SRLoaTSX.load,5000,fails+1)
			}
			else {
				console.log("[SRLoaTSX] Unable to locate required Kongregate resources. Loading aborted");
				setTimeout(function(){delete SRLoaTSX;},1);
			}
		},
		loadRaid: function (url) {
			var r;
			if (typeof (r=SRLoaTSX.getRaidDetails(url)) == 'object') {
				var reg = new RegExp(/var iframe_options = ([^\x3B]+)/g);
				var match = reg.exec(activateGame); 
				var iframe_options = eval('('+match[1]+')');
				iframe_options['kv_action_type'] = 'raidhelp';
				iframe_options['kv_difficulty'] = r.diff;
				iframe_options['kv_hash'] = r.hash;
				iframe_options['kv_raid_boss'] = r.boss;
				iframe_options['kv_raid_id'] = r.id;
				$('gameiframe').replace(new Element('iframe', {"id":"gameiframe","name":"gameiframe","style":"border:none;position:relative;z-index:1;","scrolling":"auto","border":0,"frameborder":0,"width":760,"height":700,"class":"dont_hide"}));
				$('gameiframe').contentWindow.location.replace("http://web1.legacyofathousandsuns.com/kong?" + Object.toQueryString(iframe_options));
				SRLoaTSX.config.raidList[r.id].visited = true;
				SRLoaTSX.gui.toggleRaid("visited",r.id,true);
				SRLoaTSX.gui.raidListItemUpdate(r.id);
				//if(!SRLoaTSX.gui.AutoJoining && SRLoaTSX.config.AutoRefreshOnLinkClick) setTimeout("SRLoaTSX.reload()", SRLoaTSX.config.AutoJoinInterval);
			}
		},
		zoneRaidRegex:{
			z1: 'commander|void|telemachus|colonel',
			z2: 'ragebeasts|carnus|carnifex|vespasia',
			z3: 'cybertollahs|cruiser|rautha|generalrahn',
			z4: 'seth|china|assasin|natasha',
			z5: 'purple_lion|advocate_tulk|robotic_rautha|centurian_sentinel|besalaad_warmaster',
			z6: 'scarlet_harlet|caligula|agony_and_ecstasy|mercury|mermara',
			z7: 'lupin|warden_ramiro|sun_xi|hultex_quibberath|nemo',
			z8: 'lieutenant_targe|vulture_gunship|sludge_serpent|commander_veck|the_emperor',
			z9: 'sigurd|xarpa|reaver|dule_warmaster',
			z10: 'bachanghenfil|kalaxian_cult_mistress|the_hat|crush_colossa',
			z11: 'gut_phager'
		},
		raids: {
			sherlock_holmes:{name: 'The Murderer', shortname: 'Murderer',  id: 'sherlock_holmes', stat: 'S', size:1, duration:6, health: [6000000,0,0,0,,]},
			commander:{name: 'Centurian Commander', shortname: 'CC Commander',  id: 'commander', stat: 'S', size:10, duration:168, health: [150000,187500,240000,300000,,]},
			ragebeasts:{name: 'Garlax Ragebeasts', shortname: 'ragebeasts',  id: 'ragebeasts', stat: 'S', size:10, duration:120, health: [2000000,2500000,3200000,4000000,,]},
			cybertollahs:{name: 'Supreme Cybertollahs', shortname: 'Cybertollahs',  id: 'cybertollahs', stat: 'S', size:10, duration:72, health: [4000000,5000000,6400000,8000000,,]},
			seth:{name: 'Nathaniel Vorden', shortname: 'Vorden',  id: 'seth', stat: 'S', size:10, duration:72, health: [6000000,7500000,9600000,12000000,,]},
			purple_lion:{name: 'Purple Lion', shortname: 'Lion',  id: 'purple_lion', stat: 'S', size:10, duration:72, health: [8000000,10000000,12800000,16000000,,]},
			scarlet_harlet:{name: 'The Scarlet Harlot', shortname: 'Scarlet',  id: 'scarlet_harlet', stat: 'S', size:10, duration:72, health: [10000000,12500000,16000000,20000000,,]},
			lupin:{name: 'lupin', shortname: 'lupin',  id: 'lupin', stat: 'S', size:10, duration:72, health: [12000000,15000000,19200000,24000000,,]},
			lieutenant_targe:{name: 'Lieutenant Targe', shortname: 'Targe',  id: 'lieutenant_targe', stat: 'S', size:10, duration:120, health: [14000000,17500000,22400000,28000000,,]},
			sigurd:{name: 'Sigurd Spinebreaker', shortname: 'Sigurd',  id: 'sigurd', stat: 'S', size:10, duration:72, health: [16000000,20000000,25600000,32000000,,]},
			quiskerian_temple:{name: 'Quiskerian Temple', shortname: 'Temple',  id: 'quiskerian_temple', stat: 'S', size:25, duration:10, health: [200000000,1000000000,2000000000,3000000000,,], loottiers: [['8M','12M','16M','24M','28M','36M','40M','48M','56M','60M','85M'],['40M','60M','80M','120M','140M','180M','200M','236M','280M','300M','425M'],['80M','120M','160M','240M','280M','360M','400M','472M','560M','601M','850M'],['120M','180M','240M','360M','420M','540M','600M','708M','840M','901M', '1275M'],[],[]]},
			general_skorzeny:{name: 'General Skorzeny', shortname: 'Skorzeny',  id: 'general_skorzeny', stat: 'SEH', size:90000, duration:72, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited'], loottiers: [['1 and over'],[],[],[],[],[]]},
			vince_vortex:{name: 'Vince Vortex', shortname: 'Vince',  id: 'vince_vortex', stat: 'E', size:500, duration:72, health: [600000000,750000000,960000000,1200000000,,]}
		},
		raidSizes: {
			10: { name: 'Small', visible: 'Yes', pruneTimers: [3600000,10800000,32400000]}, // 1h, 2h, 3h
			13: { name: 'Small', visible: 'No', pruneTimers: [3600000,10800000,32400000]},  // 1h, 2h, 3h
			50: { name: 'Medium', visible: 'Yes', pruneTimers: [3600000,10800000,32400000]}, // 1h, 2h, 3h
			100:{ name: 'Large', visible: 'Yes', pruneTimers: [14400000,43200000,129600000]}, // 4h, 12h, 36h
			250:{ name: 'Epic', visible: 'Yes', pruneTimers: [86400000,172800000,259200000]}, // 24h, 48h, 72h
			500:{ name: 'Colossal', visible: 'Yes', pruneTimers: [86400000,172800000,259200000]} // 24h, 48h, 72h
		},
		raidArray: [ "sherlock_holmes","commander","ragebeasts","cybertollahs","seth","purple_lion","scarlet_harlet","lupin","lieutenant_targe","sigurd","space_pox","quiskerian_temple",
			"void","carnus","cruiser","china","advocate_tulk","caligula","warden_ramiro","vulture_gunship","xarpa","bachanghenfil","gut_phager",
			"telemachus","carnifex","rautha","assasin","robotic_rautha","agony_and_ecstasy","sun_xi","sludge_serpent","kalaxian_cult_mistress",
			"colonel","vespasia","generalrahn","natasha","centurian_sentinel","mercury","hultex_quibberath","commander_veck","reaver","the_hat",
			"besalaad_warmaster","mermara","nemo","the_emperor","dule_warmaster","crush_colossa",
			"krakak","kang","crossbones_squadron","colonel_mustard","professor_squid","terminus_death_squad",
			"infection","flora","psychic_cyborg","grislak","qin_legion","terminus_interceptor_squadron","luna","trashmaster",
			"saucers","tourniquet","rylattu_exterminator","peacemaker_500","kaltharan_devourer","terminus_juggernaut","legacy_bot","wahsh",
			"lurking_horror","ship_of_the_damned","mecha_wyrm","contest_winners","genesis","celebration_enhancer_1",
			"inf_ship","inf_colony","inf_lair","general_skorzeny","vince_vortex" ],
		reload: function () {
			SRLoaTSX.echo("Reloading, please wait...");
			var reg = new RegExp(/var iframe_options = ([^\x3B]+)/g);
			var match = reg.exec(activateGame); 
			var iframe_options = eval('('+match[1]+')');
			$('gameiframe').replace(new Element('iframe', {"id":"gameiframe","name":"gameiframe","style":"border:none;position:relative;z-index:1;","scrolling":"auto","border":0,"frameborder":0,"width":760,"height":700,"class":"dont_hide"}));
			$('gameiframe').contentWindow.location.replace("http://web1.legacyofathousandsuns.com/kong?" + Object.toQueryString(iframe_options));
		}
	}
	window.addEventListener("message", function(event){
		if(/pastebin\.com/i.test(event.origin)){//for pastebin import
			var pbid = event.data.split("###")[0];
			console.log("[SRLoaTSX] Pastebin message recieved "+pbid);
			document.FPXRaidSpamForm.FPXRaidSpamInput.value=event.data.replace(/&amp;/g, '&');
			var ct = SRLoaTSX.gui.FPXimportRaids();
			
			SRLoaTSX.config.pasteList[pbid].newTotal=ct.totalnew;
			SRLoaTSX.config.pasteList[pbid].total=ct.total;
			SRLoaTSX.config.pasteList[pbid].lastImport=new Date().getTime();
			
			var els = document.getElementsByClassName("pb_"+pbid);
			for(i=0;i<els.length;i++){
				els[i].innerHTML="(Imported, "+ct.totalnew+" new)";
			}
			SRLoaTSX.gui.importingPastebin=false;
			console.log("[SRLoaTSX] Pastebin import complete");
		}

		if(/web[\w]+\.legacyofathousandsuns\.com/i.test(event.origin)) { // for Kong game iframe 
			console.log("[SRLoaTSX] Reloading");
			if (/reload/.test(event.data)) { // reload the frame
				SRLoaTSX.reload();
			}
		} 

	}, false);
	console.log("[SRLoaTSX] Initialized. Checking for needed Kongregate resources...");
	SRLoaTSX.load(0);	
}
function PBmain(){//pastebin script
	var id = (window.location+"").substring((window.location+"").length-8);
	window.parent.postMessage(id+"###"+document.getElementsByTagName("body")[0].innerHTML, 'http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns');
}
function DDmain(){//game frame script
	var linkElements = document.getElementsByTagName('a');
	if (linkElements[0]) {
		linkElements[0].onclick = function() { window.parent.postMessage('reload','http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns'); return false; };
		//linkElements[0].textContent = 'Reload Game';
	} 
}
if (/^http:\/\/www\.kongregate\.com\/games\/5thplanetgames\/legacy-of-a-thousand-suns(?:\/?$|\?|#)/i.test(document.location.href)) {
	console.log("[SRLoaTSX] Initializing....");
	/*var jq = document.createElement("script");
	jq.src = "http://code.jquery.com/jquery-latest.min.js";
	(document.head || document.body || document.documentElement).appendChild(jq);*/
	var script = document.createElement("script");
	script.appendChild(document.createTextNode('('+main+')()'));
	(document.head || document.body || document.documentElement).appendChild(script);
}
if (/pastebin\.com\/raw\.php\?i\=/i.test(document.location.href)) {
	console.log("[SRLoaTSX] PasteBin Initializing....");
	var script = document.createElement("script");
	script.appendChild(document.createTextNode('('+PBmain+')()'));
	(document.head || document.body || document.documentElement).appendChild(script);
}
if (/web[\w]+\.legacyofathousandsuns\.com\/kong/i.test(document.location.href)) {
	console.log("[SRLoaTSX] Gamescript Initializing....");
	var script = document.createElement("script");
	script.appendChild(document.createTextNode('('+DDmain+')()'));
	(document.head || document.body || document.documentElement).appendChild(script);
}