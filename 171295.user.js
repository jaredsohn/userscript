// ==UserScript==
// @name            SRLTSX version 0.0.2
// @namespace       tag://kongregate
// @description    Easier Kongregate's Legacy of a Thousand Suns
// @author         SReject
// @version        0.0.2
// @date           06.19.2013
// @include        http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns*
// ==/UserScript==

if (top===self&&/^(?:http:\/\/)?(www\.)?kongregate.com\/games\/5thPlanetGames\/legacy-of-a-thousand-suns\/?(?:#|$|\?)/i.test(document.location.href)) {
	(document.head || document.body || document.documentElement).appendChild(document.createElement("script").appendChild(document.createTextNode('('+function(){
		console.log("[SRLTSX] Initializing....");
		if(typeof GM_setValue=='undefined'||typeof GM_getValue=='undefined'||typeof GM_deleteValue=='undefined'){
			GM_setValue=function(name,value){localStorage.setItem(name, (typeof value).substring(0,1) + value)}
			GM_getValue=function(name,dvalue){
				var value=localStorage.getItem(name);
				if(typeof value!='string')return dvalue
				return value.substring(1);
			}
			GM_deleteValue=function(name){localStorage.removeItem(name)}
		}
		window.SRLTSX={
			version:{major:"0.0.1",minor:"0.0.s"},
			echo:function(msg){holodeck.activeDialogue().SRLTSX_echo(msg)},
			config:(function(){
				try{var tmp=JSON.parse(GM_getValue("SRLTSX","{}"))}
				catch(e){var tmp={}}
				tmp.scrollbarFix = (typeof tmp.scrollbarFix == 'boolean'?tmp.scrollbarFix:true);
				tmp.splitLongMsgs = (typeof tmp.splitLongMsgs == 'boolean'?tmp.splitLongMsgs:true);
				tmp.hideLOTSTab = (typeof tmp.hideLOTSTab == 'boolean' ? tmp.hideLOTSTab : false);
				tmp.hideRaidLinks = (typeof tmp.hideRaidLinks == 'boolean'?tmp.hideRaidLinks:false);
				tmp.hideVisitedRaids = (typeof tmp.hideVisitedRaids == 'boolean'?tmp.hideVisitedRaids:false);
				tmp.hideSeenRaids = (typeof tmp.hideSeenRaids == 'boolean'?tmp.hideSeenRaids:false);
				tmp.formatRaidLinks = (typeof tmp.formatRaidLinks == 'boolean'?tmp.formatRaidLinks:true);
				tmp.raidLinkFormat = (typeof tmp.raidLinkFormat == 'string'?tmp.raidLinkFormat:"<visited:(v) ><name> - <diff> - <fs>/<os>");
				tmp.raidLinkFormat = tmp.raidLinkFormat.replace(/&#91;/g,"[").replace(/&#93;/g,"]").replace(/&#123;/g,"{").replace(/&#125;/g,"}")
				if (typeof tmp.raidList!='object')tmp.raidList = {}
				for(var hash in tmp.raidList)if(tmp.raidList.hasOwnProperty(hash)){
					tmp.raidList[hash].timeLeft=function(){return this.expTime - parseInt(Date.now()/1000)}
					if(tmp.raidList[hash].timeLeft()<0)delete tmp.raidList[hash];
				}
				GM_setValue("SRLTSX",JSON.stringify(tmp));
				tmp.addRaid=function(hash,id,boss,diff,seen,visited,user){
					if (typeof SRLTSX.config.getRaid(hash)!='object') {
						SRLTSX.config.raidList[hash] = {
							hash:hash,
							id:id,
							boss:boss,
							diff:diff,
							seen:seen,
							visited:visited,
							user:user,
							expTime:(typeof SRLTSX.raids[boss]=='object'?SRLTSX.raids[boss].duration:168)*3600+parseInt(Date.now()/1000),
							timeLeft:function(){return this.expTime - parseInt(Date.now()/1000)}
						}
						SRLTSX.gui.addRaid(hash);
					}
					return SRLTSX.config.raidList[hash]
				}
				tmp.getRaid = function(hash) {
					if (typeof SRLTSX.config.raidList[hash]=='object') {
						if (SRLTSX.config.raidList[hash].timeLeft()>0)return SRLTSX.config.raidList[hash];
						delete SRLTSX.config.raidList[hash];
					}
				}
				tmp.save=function(){
					for (var hash in SRLTSX.config.raidList){
						if (SRLTSX.config.raidList.hasOwnProperty(hash)&&SRLTSX.config.raidList[hash].timeLeft<1) {
							delete SRLTSX.config.raidList[hash];
							SRLTSX.gui.raidListItemRemoveByHash(hash);
						}
					}
					var a=SRLTSX.config.raidFormat;
					SRLTSX.config.raidFormat=SRLTSX.config.raidLinkFormat.replace(/\{/g,"&#123;").replace(/\}/g,"&#125;").replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")
					GM_setValue("SRLTSX",JSON.stringify(SRLTSX.config));
					SRLTSX.config.raidFormat=a;
					setTimeout(SRLTSX.config.save,300000);
				}
				return tmp;
			})(),
			getRaidDetails: function(url,user) {
				user=(user?user:'');
				var i,r={diff:'',hash:'',boss:'',id:''},reg=/[?&]([^=]+)=([^?&]+)/ig,p=url.replace(/&amp;/gi,"&");
				while ((i=reg.exec(p))!=null) {
					if(!r.diff&&i[1]=='kv_difficulty'){r.diff=parseInt(i[2])}
					else if(!r.hash&&i[1]=='kv_hash'){r.hash=i[2]}
					else if (!r.boss&&i[1]=='kv_raid_boss'){r.boss=i[2]}
					else if (!r.id&&i[1]=='kv_raid_id'){r.id=i[2]}
					else if (i[1] != 'kv_action_type'){return}
				}
				if(r.diff==''||r.hash==''||r.boss==''||r.id=='')return;
				var info=SRLTSX.config.getRaid(r.hash);
				if (typeof info!='object')info=SRLTSX.config.addRaid(r.hash, r.id, r.boss, r.diff,false, false,user);
				r.diffLongText = ['Normal','Hard','Legendary','Nightmare'][r.diff-1];
				r.diffShortText = ['N','H','L','NM'][r.diff-1];
				r.seen=info.seen;
				r.visited=info.visited;
				var stats=SRLTSX.raids[r.boss];
				if (typeof stats=='object') {
					r.name=stats.name;
					r.size=stats.size;
					r.dur=stats.duration;
					r.durText=stats.dur+"hrs";
					r.stat=stats.stat;
					r.statText=SRLTSX.getStatText(stats.stat);
					if(typeof stats.health=='array'||typeof stats.health=='object') {
						i=stats.health[r.diff-1];
						r.health=i.value;
						r.healthText=SRLTSX.getShortNum(r.health);
						r.fairShare=i.fs;
						r.fairShareText=SRLTSX.getShortNum(r.fairShare);
						r.optimalShare=i.os;
						r.optimalShareText=SRLTSX.getShortNum(r.optimalShare);
					}
					else	if(!isNaN(stats.health)) {
						r.health = stats.health * (r.diff == 1?1:(r.diff == 2?1.25:(r.diff == 3?1.6:2)));
						r.healthText = SRLTSX.getShortNum(r.health);
						r.fairShare = r.health / r.size;
						r.fairShareText = SRLTSX.getShortNum(r.fairShare);
						r.optimalShare = r.fairShare * {"10":1.25, "12": 1.75, "50": 2.2, "100":2.3, "250": 1, "500": 1.5}[r.size];
						r.optimalShareText = SRLTSX.getShortNum(r.optimalShare);
					}
					else {
						r.health='Uk';
						r.healthText='Unknown';
						r.fairShare='Uk';
						r.fairShareText='Unknown';
						r.fairShare='Uk';
						r.optimalShareText='Unknown';
					} 
				}
				r.linkText = function () {
					if (SRLTSX.config.formatRaidLinks){
						var txt = SRLTSX.config.raidLinkFormat;
						txt = txt.replace(/<visited:([^>]*)>/gi,(this.visited?"$1":""));
						txt = txt.replace(/<seen:([^>]*)>/gi,(this.seen?"$1":""));
						txt = txt.replace(/<diff>/gi,this.diffShortText);
						txt = txt.replace(/<diff:Num>/gi,this.diff);
						txt = txt.replace(/<diff:Long>/gi,this.diffLongText);
						txt = txt.replace(/<bossId>/gi,this.boss);
						txt = txt.replace(/<raidId>/gi,this.id);
						txt = txt.replace(/<hash>/gi,this.hash);
						txt = txt.replace(/<name>/gi,(!this.name?'Unknown':this.name));
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
					return '<image src="http://cdn2.kongregate.com/game_icons/0033/2679/i.gif" style="vertical-align: text-top"> Legacy of a Thousand Suns'
				}
				return r;
			},
			getRaidLink:function(msg,user){
				msg=msg.replace(/[\r\n]/g,"");
				var m=/^((?:(?!<a[ >]).)*)<a.*? href="((?:(?:https?:\/\/)?(?:www\.)?kongregate\.com)?\/games\/5thPlanetGames\/legacy-of-a-thousand-suns(\?[^"]+))".*?<\/a>((?:(?!<\/?a[ >]).)*(?:<a.*? class="reply_link"[> ].*)?)$/i.exec(msg);
				if(m){
					var raid=SRLTSX.getRaidDetails(m[3],(user?user:''));
					if(typeof raid!='undefined'&&typeof raid!='null'){
						raid.ptext=m[1];
						raid.url=m[2];
						raid.ntext=m[4];
						return raid;
					}
				}
			},
			getShortNum:function(num) {
				if(isNaN(num)||num<0){return num}
				else if(num>=1000000000000){return (num/1000000000000).toFixed(3)/1+"T"}
				else if(num>=1000000000){return (num/1000000000).toFixed(2)/1+"B"}
				else if(num>=1000000){return (num/1000000).toFixed(2)/1+"M"}
				else if(num>=1000){return (num/1000).toFixed(1)/1+"K"}
				return num+""
			},
			getStatText:function(stat){
				if (!stat||typeof stat=='undefined')return 'Unknown';
				stat=stat.toLowerCase();
				var r="";
				if(stat=='?'||stat=='Unknown')return 'Unknown';
				if(stat.indexOf("s")>-1)r="Stamina";
				if(stat.indexOf("h")>-1)r+=(r!=''?(stat.indexOf("e")>-1?", ":" and "):"")+"Honor";
				if(stat.indexOf("e")>-1)r+=(r!=''?" and ":"")+"Energy";
				return r;
			},
			mark:function(hash){
				SRLTSX.config.raidList[hash].visited=true;
				SRLTSX.gui.toggleRaid("visited",hash,true);
				SRLTSX.gui.raidListItemUpdate(hash)
			},
			gui:{
				addRaid:function(hash){
					var r=SRLTSX.config.raidList[hash],i;
					if (r&&typeof r!='undefined'&&r.boss&&typeof r.boss!='undefined') {
						var rd=SRLTSX.raids[r.boss],a=document.getElementById("raid_list"),b=1,info='<hr>';
						if (a&&typeof a!='undefinied'&&rd&&typeof rd!='undefined'&&rd.health&&typeof rd.health!='undefined'){ 
							if(a.hasChildNodes())b+=a.childNodes.length;
							if(typeof rd.health=='array'||typeof rd.health=='object'){
								i="";
								try {
									r.health = rd.health[r.diff-1];
									i='<div style="float: left; width: 49%;">';
									i+='Posted By:<br>Difficulty:<br>Stats Used:<br>Size:<br>Health:<br>Fair Share:<br>Optimal Share:</div>';
									i+='<div style="float: right; width: 49%;text-align: right;">';
									i+=(r.user != ''?r.user:'Unknown')+"<br>";
									i+=["Normal","Hard","Legendary","Nightmare"][r.diff -1]+"<br>";
									i+=rd.stat+"<br>";
									i+=rd.size+"<br>";
									i+=(isNaN(r.health.value)?r.health.value:SRLTSX.getShortNum(r.health.value))+"<br>";
									i+=SRLTSX.getShortNum(r.health.fs)+"<br>";
									i+=SRLTSX.getShortNum(r.health.os)+"</div>";
								}catch(e){
									rd={name: 'Unknown'};
									i='<div style="float: left;width: 49%;">Posted By:<br>Boss Id:<br>Difficulty:</div>';
									i+='<div style="width: 49%; float: right; text-align: right;">'
									i+=(r.user != ''?r.user:'Unknown')+"<br>";
									i+=r.boss+"<br>";
									i+=["Normal","Hard","Legendary","Nightmare"][r.diff -1]+"</div>";
								}
								info+=i;
							}
							else if (!isNaN(rd.health)) {
								var h = rd.health * [1,1.25,1.6,2][r.diff -1];
								var f = h / rd.size;
								var o = f * {"10":1.25, "12": 1.75, "50":2.2, "100":2.3, "250":1,"500":1.5}[rd.size];
								info += '<div style="float: left; width: 49%;">';
								info += 'Posted By:<br>Difficulty:<br>Stats Used:<br>Size:<br>Health:<br>Fair Share:<br>Optimal Share:</div>';
								info += '<div style="float: right; width: 49%;text-align: right;">';
								info += (r.user != ''?r.user:'Unknown')+"<br>";
								info += ["Normal","Hard","Legendary","Nightmare"][r.diff -1]+"<br>";
								info += rd.stat+"<br>";
								info += rd.size+"<br>";
								info += SRLTSX.getShortNum(h)+"<br>";
								info += SRLTSX.getShortNum(f)+"<br>";
								info += SRLTSX.getShortNum(o)+"</div>";
							}
							else {
								rd={name: 'Unknown'};
								info+='<div style="float: left;width: 49%;">Posted By:<br>Boss Id:<br>Difficulty:</div>';
								info+='<div style="width: 49%; float: right; text-align: right;">'
								info+=(r.user != ''?r.user:'Unknown')+"<br>";
								info+=r.boss+"<br>";
								info+=["Normal","Hard","Legendary","Nightmare"][r.diff -1]+"</div>";
							}
							info += '<div style="clear: both"></div><hr>';
							info += '<center><table><tr>';
							info += '<td style="width: 70px"><input type="checkbox" onclick="SRLTSX.gui.raidListCBClicked(this,\'seen\',\''+r.hash+'\')"'+(r.seen == true?' checked="checked"':'')+'> Seen</td>';
							info += '<td style="width: 70px"><input type="checkbox" onclick="SRLTSX.gui.raidListCBClicked(this,\'visited\',\''+r.hash+'\')"'+(r.visited == true?' checked="checked"':'')+'> Visited</td>';
							info += '</tr></table></center>';
							var li=SRLTSX.gui.cHTML('div').set({class:'raid_list_item',style:b%2==0?'background-color:#e0e0e0':'',raidId:r.id,raidHash:r.hash,raidDiff:r.diff,raidBoss:r.boss,raidVisited:r.visited,raidSeen:r.seen}).attach("to",a).ele();
							var url = "http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns?kv_action_type=raidhelp&kv_difficulty="+r.diff+"&kv_hash="+r.hash+"&kv_raid_boss="+r.boss+"&kv_raid_id="+r.id;
							var rh = SRLTSX.gui.cHTML('div').set({class: 'raid_list_item_head'}).html(' \
								<a href="'+url+'" onclick="SRLTSX.gui.raidLinkClick(this); return false" class="link">' + rd.name + '</a> \
								<span class="link" style="font-weight: normal !important; float: right"><a href="#" onClick="SRLTSX.gui.deleteRaid(this,\''+r.hash+'\'); return false;">delete</a></span> \
								<span class="text">' + rd.name + '</span><span class="text" style="float: right">'+(r.visited?'<i>visited</i>':'')+'</span> \
							').attach("to",li).ele().addEventListener("click",function(e){
								var con=document.getElementById("raid_list").getElementsByClassName("active");
								if(con.length==1)con[0].className=con[0].className.replace(/ active/gi,"");
								this.parentNode.className+=" active";
							});
							var ri=SRLTSX.gui.cHTML('div').set({class:'raid_list_item_info'}).html(info).attach("to",li);
						}
					}
					else {delete SRLTSX.config.raidList[hash]}
				},
				cHTML: function (ele) {
					function cEle(ele) {
						this._ele=ele;
						this.ele=function(){return this._ele}
						this.set=function(param){
							for(var attr in param)if(param.hasOwnProperty(attr))this._ele.setAttribute(attr,param[attr]);
							return this
						}
						this.text = function(text){
							this._ele.appendChild(document.createTextNode(text));
							return this
						}
						this.html = function(text,overwrite){
							if(overwrite){this._ele.innerHTML=text}
							else{this._ele.innerHTML+=text}
							return this
						}
						this.attach = function (method,ele) {
							if(typeof ele == 'string')ele = document.getElementById(ele);
							if(!(ele instanceof Node))throw "Invalid attachment element specified";
							if(!/^(?:to|before|after)$/i.test(method))throw "Invalid append method specified";
							if (method=='to'){ele.appendChild(this._ele)}
							else if(method=='before'){ele.parentNode.insertBefore(this._ele,ele)}
							else if(typeof ele.nextSibling=='undefined'){ele.parentNode.appendChild(this._ele)}
							else{ele.parentNode.insertBefore(this._ele,ele.nextSibling)}
							return this;
						}
						this.on=function(event,func,bubble){this._ele.addEventListener(event,func,bubble);return this}
					}
					if(typeof ele=="string")ele=(/^#/i.test(ele)?document.getElementById(ele.substring(1)):document.createElement(ele));
					if(ele instanceof Node)return new cEle(ele);
					throw "Invalid element type specified"
				},
				deleteRaid: function (ele,hash) {
					if (typeof hash == 'string' && hash != '') {
						if(SRLTSX.config.raidList[hash]){delete SRLTSX.config.raidList[hash]}
						setTimeout(function(ele) {
							var e=ele.nextSibling;
							while(e){
								if(e.getAttribute("style").indexOf('background-color:#e0e0e0')>-1){e.setAttribute("style","")}
								else{e.setAttribute("style",'background-color:#e0e0e0')}
								e = e.nextSibling;
							}
							ele.parentNode.removeChild(ele);
						},1,ele.parentNode.parentNode.parentNode)
					}
				},
				help:function(item){},
				getElementsByAttribute: function (tagname,attr,value,ele) {
					var eles=(ele?ele.getElementsByTagName(tagname):document.getElementsByTagName(tagname)),result=new Array();
					for (var i=0;i<eles.length;i++)if(eles[i].getAttribute("attr")==value)result.push(eles[i]);
					return result;
				},
				load:function(){
					SRLTSX.gui.cHTML('style').set({type: "text/css",id: 'SRLTSX_raidClass'}).text('.SRLTSX_raid{display:'+(SRLTSX.config.hideRaidLinks == true?'none !important':'block')+'}').attach('to',document.head);
					SRLTSX.gui.cHTML('style').set({type: "text/css",id: 'SRLTSX_visitedRaidClass'}).text('.SRLTSX_visitedRaid{display: '+(SRLTSX.config.hideVisitedRaids == true?'none !important':'block')+'}').attach('to',document.head);
					SRLTSX.gui.cHTML('style').set({type: "text/css",id: 'SRLTSX_seenRaidClass'}).text('.SRLTSX_seenRaid{display: '+(SRLTSX.config.hideSeenRaids == true?'none !important':'block')+'}').attach('to',document.head);
					SRLTSX.gui.cHTML('style').set({type: "text/css"}).text(" \
						#kong_game_ui div#lots_tab_pane {padding: 8px; text-align: left;} \
						#kong_game_ui div#lots_tab_pane ul { margin: 0px; padding: 0px; list-style-type: none; position: relative;} \
						#kong_game_ui div#lots_tab_pane ul li.tab { float: left; height: 100%; } \
						#kong_game_ui div#lots_tab_pane ul li.tab div.tab_head  { font-family: Verdana, Arial, sans-serif;font-size: 10px;padding: 3px 5px 4px 5px; background-color: #c0c0c0; cursor: pointer; text-decoration: underline; margin-right: 1px; } \
						#kong_game_ui div#lots_tab_pane ul li.tab div.tab_pane  { padding: 2px 5px; background-color: #ffffff; display: none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_head { background-color: #ffffff; cursor: default; text-decoration: none; }\
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane { position: absolute; display: block; left: 0px}\
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list {overflow-y: scroll; font-family: Verdana, Arial, sans-serif; font-size: 11px;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item {cursor: pointer; position: relative; padding: 2px; border-bottom: 1px solid #b0b0b0;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item .raid_list_item_head .link{display:none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item .raid_list_item_info {display:none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item .raid_list_item_info hr {clear:both; margin: 5px 15px; } \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active {cursor: default; background-color: #DEEAF6 !important;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_head .text{display:none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_head .link{display: inline-block; font-weight: bold;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_info {display:block;} \
					").attach("to",document.head);
					var link = SRLTSX.gui.cHTML('a').set({href: '#lots_tab_pane',class: ''}).html("LOTS").attach("to",SRLTSX.gui.cHTML('li').set({class: 'tab', id: 'lots_tab'}).attach("after","game_tab").ele()).ele();
					var pane = SRLTSX.gui.cHTML('div').set({id: 'lots_tab_pane'}).html(' \
						<div class="room_name_container"><span class="room_name">LoTS Extension</span></div> \
						<ul id="SRLTSX_tabpane_tabs"> \
							<li class="tab active"><div class="tab_head">Raids</div><div class="tab_pane"><div id="raid_list"></div></div></li> \
							<li class="tab"> \
								<div class="tab_head">Options</div> \
									<div class="tab_pane"><br> \
									<input type="checkbox" id="SRLTSX_options_formatRaids"> Enable Raid Link Formatting (<a href="#" onclick="return false">?</a>)<br><br> \
									<textarea id="SRLTSX_options_raidLinkFormat"></textarea><br> \
									<hr> \
									<input type="checkbox" id="SRLTSX_options_hideRaidLinks"> Hide all raid links (<a href="#" onclick="return false">?</a>)<br> \
									<br> \
									<input type="checkbox" id="SRLTSX_options_hideSeenRaids"> Hide raids I\'ve seen before (<a href="#" onclick="return false">?</a>)<br> \
									<input type="checkbox" id="SRLTSX_options_hideVisitedRaids"> Hide raids I\'ve already visited (<a href="#" onclick="return false">?</a>)<br> \
								</div> \
							</li> \
							<li class="tab"><div class="tab_head">About</div><div class="tab_pane"> \
								<b>Author</b>: SReject<br>\
								<b>Version</b>: '+SRLTSX.version.major+'<br/> \
								<b>Minor Version</b>: '+SRLTSX.version.minor+'<br/><br/> \
								<a href="http://userscripts.org/scripts/show/128721" target="_blank">Home Page</a><br> \
								<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=W7C5Z4HMEPQDN&lc=US&item_name=SRInc%20%2d%20SRLTSX&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted" target="_blank">Donate</a><br><br> \
								<a href="http://userscripts.org/scripts/source/128721.user.js" target="_blank">Get Latest</a></div>  \
							</li> \
						</ul> \
					').attach("to",'kong_game_ui').ele();
					pane.style.height = document.getElementById("chat_tab_pane").style.height;
					var e = pane.getElementsByClassName("tab_head")
					for(var i=0;i<e.length;i++)e[i].addEventListener("click",function(){
						if(!/\bactive\b/i.test(this.className)){
							var i=0,e=document.getElementById("lots_tab_pane").getElementsByTagName("li");
							for(;i<e.length;i++)if(e[i].getAttribute("class").indexOf("active")>-1)e[i].className=e[i].className.replace(/ active$/g,"");
							(this.parentNode).className += " active";
						}
					});
					holodeck._tabs.addTab(link);
					document.getElementById("lots_tab").style.display = (SRLTSX.config.hideLOTSTab?"none":"list-item");
					var e=pane.getElementsByClassName("tab_pane"),w=pane.offsetWidth-24,h=pane.offsetHeight-e[0].offsetTop -36,i=0;
					for (;i<e.length;i++){e[i].style.width=w+"px";e[i].style.height=h+"px"}
					var raid_list=document.getElementById('raid_list');
					raid_list.style.height=(h-raid_list.offsetTop-3)+"px";
					SRLTSX.gui.loadRaidList();
					var optsFormatRaids = SRLTSX.gui.cHTML('#SRLTSX_options_formatRaids');
					var optsRaidFormat = SRLTSX.gui.cHTML('#SRLTSX_options_raidLinkFormat');
					optsRaidFormat.ele().addEventListener("blur",function() {
						if(this.value!=""){SRLTSX.config.raidLinkFormat=this.value}
						else{this.value=SRLTSX.config.raidLinkFormat}
					});
					var optsHideARaids = SRLTSX.gui.cHTML('#SRLTSX_options_hideRaidLinks');
					var optsHideSRaids = SRLTSX.gui.cHTML('#SRLTSX_options_hideSeenRaids');
					var optsHideVRaids = SRLTSX.gui.cHTML('#SRLTSX_options_hideVisitedRaids');
					if(SRLTSX.config.formatRaidLinks){optsFormatRaids.ele().checked='checked'}
					else{optsRaidFormat.ele().disabled = 'disabled'}
					optsRaidFormat.ele().value=SRLTSX.config.raidLinkFormat;
					optsRaidFormat.ele().style.width=e[0].offsetWidth-12+"px";
					if(SRLTSX.config.hideSeenRaids){optsHideSRaids.ele().checked='checked'}
					if(SRLTSX.config.hideVisitedRaids){optsHideVRaids.ele().checked='checked'}
					if(SRLTSX.config.hideRaidLinks) {
						optsHideARaids.ele().checked=true;
						optsHideVRaids.ele().disabled=true;
						optsHideSRaids.ele().disabled=true;
					}
					optsFormatRaids.ele().addEventListener("click",function(){
						document.getElementById('SRLTSX_options_raidLinkFormat').disabled=(this.checked==true?false:true);
						SRLTSX.config.formatRaidLinks=this.checked;
					},true);
					optsHideARaids.ele().addEventListener("click",function() {
						document.getElementById('SRLTSX_options_hideVisitedRaids').disabled=this.checked;
						document.getElementById('SRLTSX_options_hideSeenRaids').disabled=this.checked;
						SRLTSX.config.hideRaidLinks=this.checked;
						SRLTSX.gui.toggleCSS({id:"SRLTSX_raidClass",cls:".SRLTSX_raid{display:"+(this.checked==true?'none !important':'block')+"}"})
					},true);
					optsHideSRaids.ele().addEventListener("click",function(){
						SRLTSX.config.hideSeenRaids=this.checked;
						SRLTSX.gui.toggleCSS({id:"SRLTSX_seenRaidClass",cls:".SRLTSX_seenRaid{display:"+(this.checked==true?'none !important':'block')+"}"})
					},true);
					optsHideVRaids.ele().addEventListener("click",function(){
						SRLTSX.config.hideVisitedRaids=this.checked;
						SRLTSX.gui.toggleCSS({id:"SRLTSX_visitedRaidClass",cls:".SRLTSX_visitedRaid{display:"+(this.checked==true?'none !important':'block')+"}"})
					},true);
					SRLTSX.gui.cHTML('li').set({class:'spritegame'}).html("<a href=\"http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns\" onclick=\"SRLTSX.reload();return false;\">Reload Game</a>").attach("after","get_kreds_link");
					console.log("[SRLTSX] Loading is complete.");
				},
				loadRaidList:function(){
					var a,i = document.getElementById("raid_list");
					while(i.hasChildNodes()&&i.childNodes.length>0)i.removeChild(i.firstChild);
					for (a in SRLTSX.config.raidList)if(SRLTSX.config.raidList.hasOwnProperty(a))SRLTSX.gui.addRaid(a);
				},
				raidLinkClick:function(ele,url){
					SRLTSX.loadRaid(ele.href);
					ele=ele.parentNode;
					ele.getElementsByClassName("text")[1].innerHTML='<i>visited</i>';
					ele=ele.parentNode.getElementsByTagName("input")[1].checked=true;
				},
				raidListCBClicked:function(ele,cb,hash){
					if(SRLTSX.config.raidList[hash]){
						SRLTSX.config.raidList[hash][cb] = ele.checked;
						SRLTSX.gui.toggleRaid(cb,hash,true);
						if(cb=='visited')ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("text")[1].innerHTML=(ele.checked?"<i>visited</i>":"");
					}
				},
				raidListItemUpdate:function(hash){
					var raid=SRLTSX.config.raidList[hash];
					if(typeof raid=='object'){
						var ele=document.getElementById("raid_list").firstChild;
						while(ele){
							if(ele.getAttribute("raidHash")==hash){
								ele.getElementsByClassName("text")[1].innerHTML=(raid.visited == true?'<i>visited</i>':'');
								ele.getElementsByTagName("input")[0].checked=(raid.seen == true?true:false);
								ele.getElementsByTagName("input")[1].checked=(raid.visited == true?true:false);
								break
							}
							ele=ele.nextSibling
						}
					}
					else{SRLTSX.gui.raidListItemRemoveByHash(hash)}
				},
				raidListItemRemoveByHash: function (hash) {
					var e,ele=document.getElementById("raid_list").firstChild;
					while(typeof ele != 'null'){
						if(ele.getAttribute("raidHash")==hash)break;
						ele=ele.nextSibling;
					}
					if(ele){
						while(typeof (e=ele.nextSibling)!='null')e.setAttribute("style",(e.getAttribute("style").indexOf('background-color:#e0e0e0') > -1?"":'background-color:#e0e0e0'));
						ele.parentNode.removeChild(ele)
					}
				},
				toggleCSS: function (p) {
					document.head.removeChild(document.getElementById(p.id));
					SRLTSX.gui.cHTML("style").set({type:"text/css", id:p.id}).text(p.cls).attach("to",document.head);
				},
				toggleRaid: function(type,hash,tog) {
					var d=document.getElementsByClassName("SRLTSX_hash_"+hash);
					if (typeof SRLTSX.config.raidList[hash]=='object') {
						var raid=SRLTSX.config.raidList[hash];
						var raid=SRLTSX.getRaidDetails("&kv_difficulty="+raid.diff+"&kv_hash="+hash+"&kv_raid_boss="+raid.boss+"&kv_raid_id="+raid.id);
					}
					for(var i=d.length-1;i>-1;i--){
						if(tog==true&&d[i].className.indexOf("SRLTSX_"+type+"Raid")==-1){d[i].className+=" SRLTSX_"+type+"Raid"}
						else if(tog == false&&d[i].className.indexOf("SRLTSX_"+type+"Raid")>-1){d[i].className=d[i].className.replace(eval("/SRLTSX_"+type+"Raid( |$)/i"),"")}
						if(typeof raid=='object')d[i].getElementsByTagName("a")[0].innerHTML=raid.linkText();
					}
				}
			},
			load: function (fails) {
				if (typeof holodeck=='object'&&typeof holodeck._tabs=='object'&&typeof holodeck._tabs.addTab=='function'&&typeof ChatDialogue=='function'&&typeof activateGame=='function'&&typeof document.getElementById('kong_game_ui')!='null'){
					SRLTSX.gui.load();
					ChatDialogue.prototype.SRLTSX_echo=function(msg){this.SRLTSX_DUM("LoTS Extention","<br>"+msg,{class:"whisper whisper_recieved"},{non_user:true})}
					ChatDialogue.prototype.SRLTSX_DUM=ChatDialogue.prototype.displayUnsanitizedMessage;
					ChatDialogue.prototype.displayUnsanitizedMessage=function(b,d,e,f){
						if(!this._user_manager.isMuted(b)){
							d=d.replace('&amp;','&').replace(/(?:s|m)\["[^"\]]+","([^\/]+\/([^\/]+)\?[^"\]]+)"[^\]]*$/i,function(a,b,c){
								return '<a href="http://www.kongregate.com/games/'+b+'">'+c+'</a>'
							});
							if(typeof e!='object'){e={class: ''}}
							else if(typeof e.class!='string'){e.class=''}
							var g=SRLTSX.getRaidLink(d,b);
							if (typeof g=='object') {
								e.class+=" SRLTSX_raid SRLTSX_hash_"+g.hash+(g.seen?" SRLTSX_seenRaid":'')+(g.visited?" SRLTSX_visitedRaid":'');
								d=g.ptext+"<a href=\""+g.url+"\" onclick=\"SRLTSX.loadRaid(this.href); return false\" oncontextmenu=\"SRLTSX.mark('"+g.hash+"')\">"+g.linkText()+'</a>'+g.ntext;
								var eles=document.getElementsByClassName("SRLTSX_hash_"+g.hash);
								SRLTSX.gui.toggleRaid('visited',g.hash,true);
								SRLTSX.config.raidList[g.hash].seen=true;
								SRLTSX.gui.raidListItemUpdate(g.hash)
							}
							this.SRLTSX_DUM(b,d,e,f)
						}
					}
					holodeck.addChatCommand("raidformat",function(deck,text){
						if(/^\/raidformat$/i.test(text)){SRLTSX.echo("Raid Link formatting is: <b>"+(SRLTSX.config.formatRaidLinks?"on":"off")+"</b><br>Current Format:<br>"+SRLTSX.config.raidLinkFormat.replace(/</g,"&lt;").replace(/>/g,"&gt;"))}
						else if(/^\/raidformat on$/i.test(text)){
							if(SRLTSX.config.formatRaidLinks==false){SRLTSX.config.formatRaidLinks=true;SRLTSX.echo("Raid link formatting is now enabled")}
							else{SRLTSX.echo("Raid link formatting is already enabled")}
						}
						else if(/^\/raidformat off$/i.test(text)){
							if (SRLTSX.config.formatRaidLinks==true){SRLTSX.config.formatRaidLinks=false;SRLTSX.echo("Raid link formatting is now disabled")}
							else{SRLTSX.echo("Raid link formatting is already disabled")}
						}
						else if(/^\/raidformat help$/i.test(text)) {SRLTSX.gui.help("raidformat")}
						else if(SRLTSX.config.formatRaidLinks==false){SRLTSX.echo('<b>/raidformat</b>: You must enable raid link formatting before you can set the format. (<a href="#" onclick="SRLTSX.gui.help(\'raidformat\'); return false">help</a>)')}
						else if (i=/^\/raidformat (\S.*)$/i.exec(text)){SRLTSX.config.raidLinkFormat=i[1];SRLTSX.gui.cHTML('#SRLTSX_options_raidLinkFormat').ele().value = i[1];SRLTSX.echo("Raid format now set to:<br>"+i[1].replace(/</g,"&lt;").replace(/>/g,"&gt;"))}
						else{SRLTSX.echo('<b>/raidformat</b>: Invalid parameters specified. (<a href="#" onclick="SRLTSX.gui.help(\'raidformat\'); return false">help</a>)')}
						return false;
					});
					holodeck.addChatCommand("loadraid",function(deck,text){
						var u;
						if(u=/^\/loadraid (\S+)$/i.exec(text)){SRLTSX.loadRaid(u[1]);}
						else {SRLTSX.echo('<b>/loadraid</b>: Invalid raid specified. (<a href="#" onclick="SRLTSX.gui.help(\'loadraid\'); return false">help</a>)')}
						return false;
					});
					holodeck.addChatCommand("reload",function(deck,text){
						if (/^\/reload$/i.test(text)){SRLTSX.reload()}
						else{SRLTSX.echo('<b>/reload</b>: Invalid parameters specified. (<a href="#" onclick="SRLTSX.gui.help(\'reload\'); return false">help</a>)')}
						return false
					});
					holodeck.addChatCommand("toggle",function (deck,text){
						var i;
						if(/^\/toggle$/i.test(text)){
							var msg="<b>Current Displays:</b><br>"
							msg+="Visited Raids: "+(!SRLTSX.config.hideVisitedRaids?'Shown':'hidden')+"<br>";
							msg+="Seen Raids: "+(!SRLTSX.config.hideSeenRaids?'Shown':'Hidden')+"<br>";
							SRLTSX.echo(msg);
						}
						else if(i=/^\/toggle (visited|seen)( show| hide)?$/i.exec(text)) {
							var p1=i[1].toLowerCase(),p2='';
							if(typeof i[2]=='string'&&i[2]!='')p2=i[2].toLowerCase();
							var h=p1.substring(0,1).toUpperCase()+p1.substring(1);
							if (p2 == '') {	SRLTSX.echo(h+" raids are currently: "+(SRLTSX.config[(p1 == "visited"?"hideVisitedRaids":"hideSeenRaids")] == true?"Hidden":"Shown"))}
							else {
								var eleId="SRLTSX_"+p1+"RaidClass";
								var state=document.getElementById(eleId).innerText.indexOf("none")>-1?"h":"s";
								var setTo=p2==" hide"?"h":"s";
								if(state==setTo){SRLTSX.echo(h+" raids are already "+(state=="s"?"Shown":"Hidden"))}
								else {
									var cls='.SRLTSX_'+p1+'Raid{display: '+(setTo=="s"?"block}":"none !important}");
									SRLTSX.gui.toggleCSS({id:eleId,cls:cls});
									SRLTSX.echo(h+" raids are now set to be "+(setTo=="s"?"Shown":"Hidden"));
								}
							}
						}
						else{SRLTSX.echo('Invalid parameters specified. (<a href="#" onclick="SRLTSX.gui.help(\'toggleraidview\'); return false">help</a>)')}
						return false;
					});
					holodeck.addChatCommand("tabdis", function(deck,text){
						if (/^\/tabdis$/i.test(text)) {
							SRLTSX.echo("LOTS Tab is currently: "+(SRLTSX.config.hideLOTSTab?"hidden":"displayed"))
						}
						else if(/^\/tabdis (show)$/i.test(text)){
							if (!SRLTSX.config.hideLOTSTab) {
								SRLTSX.echo("LOTS tab is already shown");
							}
							else {
								document.getElementById("lots_tab").style.display = "list-item";
								SRLTSX.config.hideLOTSTab = false;
								SRLTSX.config.save();
								SRLTSX.echo("LOTS tab is now shown");
							}
						}
						else if(/^\/tabdis hide$/i.test(text)){
							if (SRLTSX.config.hideLOTSTab) {
								SRLTSX.echo("LOTS tab is already hidden");
							}
							else {
								document.getElementById("lots_tab").style.display = "none";
								SRLTSX.config.hideLOTSTab = true;
								SRLTSX.config.save();
								SRLTSX.echo("LOTS tab is now hidden");
							}
						}
						else {
							SRLTSX.echo("Invalid parameters specified.");
						}
						return false;
					});
					holodeck.addChatCommand("clear",function(deck,text){holodeck.activeDialogue().clear();return false});
					holodeck.addChatCommand("raid", function(deck,text){
						var p;
						if (p=/^\/raid (.*?)(?: ([1-4]))?$/i.exec(text)) {
							var msg="",
								start=(!isNaN(p[2]))?p[2]-1:0,
								end=(!isNaN(p[2]))?p[2]:4,
								find=p[1].toLowerCase(),
								i,raid,n,h,fs,os;
							for(i in SRLTSX.raids){if(SRLTSX.raids.hasOwnProperty(i)){
								raid=SRLTSX.raids[i];
								if (raid.name.toLowerCase().indexOf(find)>-1){
									if(msg!="")msg+="<br>";
									msg+="<b>"+raid.name+"</b><br>";
									msg+="Size: "+raid.size+"<br>";
									msg+="Stats: "+SRLTSX.getStatText(raid.stat)+"<br>";
									msg+="Duration: "+raid.duration + "hrs<br>";
									if (typeof raid.health=='array'||typeof raid.health=='object'){
										for(n=start;n<end;n++){
											h=raid.health[n].value;
											fs=raid.health[n].fs;
											os=raid.health[n].os;
											msg += "---<br>";
											msg += "Difficulty: "+["Normal","Hard","Legendary","Nightmare"][n]+"<br>";
											msg += "Health: "+SRLTSX.getShortNum(h)+"<br>";
											msg += "Fair Share: "+SRLTSX.getShortNum(fs)+"<br>";
											msg += "Optimal Share: "+SRLTSX.getShortNum(os)+"<br>";
										}
									}
									else if(isNaN(raid.health)){
										msg+="---<br>Health: Unknown<br>Fair Share: Unknown<br>Optimal Share: Unknown<br>"
									}
									else{
										for(n=start;n<end;n++){
											h=raid.health*[1,1.25,1.6,2][n];
											fs=h/raid.size;
											os=fs*{"10": 1.25,"50":2.2,"100":2.3,"250":1,"500":1.5}[raid.size+""];
											msg += "---<br>";
											msg += "Difficulty: "+["Normal","Hard","Legendary","Nightmare"][n]+"<br>";
											msg += "Health: "+SRLTSX.getShortNum(h)+"<br>";
											msg += "Fair Share: "+SRLTSX.getShortNum(fs)+"<br>";
											msg += "Optimal Share: "+SRLTSX.getShortNum(os)+"<br>";
										}
									}
								}
							}}
							if(msg!=""){SRLTSX.echo(msg)}
							else{SRLTSX.echo('No raids found matching: '+p[1])}
						}
						else {SRLTSX.echo('<b>/raid</b>: Invalid parameters specified (<a href="#" onclick="SRLTSX.gui.help(\'raid\')">help</a>)')}
						return false;
					});
					holodeck.addChatCommand("version", function(deck,text) {
						var d="<b>Version</b>: "+SRLTSX.version.major+"("+SRLTSX.version.minor+")<br>";
						d+="<b>Major Version</b>: "+SRLTSX.version.major+"<br>"
						d+="<b>Minor Version</b>: "+SRLTSX.version.minor+"<br>"
						d+='<a href="http://userscripts.org/scripts/show/128721" target="_blank">Go to script page</a>';
						SRLTSX.echo(d);
						return false;
					});
					
					holodeck.addChatCommand("update", function(deck,text) {
						window.open("http://adf.ly/3966902/http://userscripts.org/scripts/source/128721.user.js");
						SRLTSX.echo("After installation, you will need to refresh this page");
						return false;
					});
					window.onbeforeunload=function(){SRLTSX.config.save()}
					setTimeout(function(){
						var i=SRLTSX.getRaidDetails(document.location.href);
						if (i&&typeof i=='object'){
							if (SRLTSX.config.getRaid(i.hash)){SRLTSX.config.raidList[i.hash].visited=true;SRLTSX.config.raidList[i.hash].seen=true}
							else {SRLTSX.config.addRaid(i.hash,i.id,i.boss,i.diff,true,true,false,'')}
						}
						SRLTSX.config.save();
						delete SRLTSX.load;
					},1);
				}
				else if (fails < 10) {
					console.log("[SRLTSX] Missing needed Kongregate resourses, retrying in 5 seconds....");
					setTimeout(SRLTSX.load,5000,fails+1)
				}
				else {
					console.log("[SRLTSX] Unable to locate required Kongregate resources. Loading aborted");
					setTimeout(function(){delete SRLTSX;},1);
				}
			},
			loadRaid: function (url) {
				var r;
				if (typeof (r=SRLTSX.getRaidDetails(url)) == 'object') {
					var reg = new RegExp(/var iframe_options = ([^\x3B]+)/g);
					var match = reg.exec(activateGame); 
					var iframe_options = eval('('+match[1]+')');
					iframe_options['kv_action_type']='raidhelp';
					iframe_options['kv_difficulty']=r.diff;
					iframe_options['kv_hash']=r.hash;
					iframe_options['kv_raid_boss']=r.boss;
					iframe_options['kv_raid_id']=r.id;
					$('gameiframe').replace(new Element('iframe', {"id":"gameiframe","name":"gameiframe","style":"border:none;position:relative;z-index:1;","scrolling":"auto","border":0,"frameborder":0,"width":760,"height":700,"class":"dont_hide"}));
					$('gameiframe').contentWindow.location.replace("http://adf.ly/3966902/http://web1.legacyofathousandsuns.com/kong?" + Object.toQueryString(iframe_options));
					SRLTSX.config.raidList[r.hash].visited = true;
					SRLTSX.gui.toggleRaid("visited",r.hash,true);
					SRLTSX.gui.raidListItemUpdate(r.hash);
				}
			},
			raids: {
				advocate_tulk:{name: "Advocate Tulk",id: "advocate_tulk",stat: "S",size: 50,duration: 72,health: 45000000},
				agony_and_ecstasy:{name: "Agony and Ecstasy",id: "agony_and_ecstasy",stat: "S",size: 100,duration: 72,health: 95000000},
				assasin:{name: "Kelovar Assassin",id: "assasin",stat: "S",size: 100,duration: 72,health: 65000000},
				besalaad_warmaster:{name: "Besalaad Warmaster",id: "besalaad_warmaster",stat: "S",size: 500,duration: 168,health: 700000000},
				carnifex:{name: "Carnifex Prime",id: "carnifex",stat: "S",size: 100,duration: 120,health:35000000},
				caligula:{name: "Caligula",id: "caligula",stat: "S",size: 50,duration: 72,health:55000000},
				carnus:{name: "Carnus 9000",id: "carnus",stat: "S",size: 50,duration: 120,health:15000000},
				centurian_sentinel:{name: "CC Sentinel",id: "centurian_sentinel",stat: "S",size: 250,duration: 168,health:550000000},
				china:{name: "Blood Alley Gang",id: "china",stat: "S",size: 50,duration: 72,health:35000000},
				colonel:{name: "Psychic Colonel",id: "colonel",stat: "S",size: 250,duration: 168,health:150000000},
				colonel_mustard:{name: "Colonel Mustard",id: "colonel_mustard",stat: "H",size: 10,duration: 120,health:12000000},
				commander:{name: "CC Commander",id: "commander",stat: "S",size: 10,duration: 168,health:150000},
				commander_veck:{name: "CC Storm Commander",id: "commander_veck",stat: "S",size: 250,duration: 168,health:900000000},
				contest_winners:{name: "Shadows of the Void",id: "contest_winners",stat: "H",size: 250,duration: 168,health: 500000000},
				crossbones_squadron:{name: "Crossbones Squadron",id: "crossbones_squadron",stat: "H",size: 10,duration: 120,health:8000000},
				cruiser:{name: "CC Cruiser",id: "cruiser",stat: "S",size: 50,duration: 72,health:25000000},
				cybertollahs:{name: "Supreme Cybertollahs",id: "cybertollahs",stat: "S",size: 10,duration: 72,health:4000000},
				dule_warmaster:{name: "CC Councilor", id: "dule_warmaster",stat: "S",size: 500,duration: 24,health: 2500000000},
				flora:{name: "Ruomyes' Death Flora",id: "flora",stat: "H",size: 50,duration: 144,health:35000000},
				generalrahn:{name: "CC Rahn",id: "generalrahn",stat: "S",size: 250,duration: 168,health:350000000},
				general_skorzeny:{name: "General Skorzeny",id: "general_skorzeny",stat: "?",	size: 5000,duration: 120,health:250000000000},
				genesis:{name: "Genesis",id: "genesis",stat: "H",size: 250,duration: 168,health: 1000000000},
				grislak:{name: "Grislak",id: "grislak",stat: "H",size: 50,duration: 144,health:55000000},
				hultex_quibberath:{name: "Guldax Quibberath",id: "hultex_quibberath",stat: "S",size: 250,duration: 168,health:800000000},
				infection:{name: "Infected Squad",id: "infection",stat: "H",size: 50,duration: 144,health:30000000},
				kaltharan_devourer:{name: "Kaltharan Devourer",id: "kaltharan_devourer",stat: "H",size: 100,duration: 168,health:175000000},
				kang:{name: "Kang",id: "kang",stat: "H",size: 10,duration: 120,health:5000000},
				krakak:{name: "Krakak Swarm",id: "krakak",stat: "H",size: 10,duration: 120,health:4500000},
				legacy_bot:{name: "Legacy Bot",id: "legacy_bot",stat: "H",size: 100,duration: 168,health:250000000},
				lieutenant_targe:{name: "Lieutenant Targe",id: "lieutenant_targe",stat: "S",size: 10,duration: 120,health:14000000},
				luna:{name: "Luna",id: "luna",stat: "H",size: 50,duration: 120,health:50000000},
				lupin:{name: "Lupin",id: "lupin",stat: "S",size: 10,duration: 72,health:12000000},
				lurking_horror:{name: "Lurking Horror",id: "lurking_horror",stat: "H",size: 250,duration: 168,health:250000000},
				mecha_wyrm:{name: "Mecha-Wyrm",id: "mecha_wyrm",stat: "H",size: 250,duration: 168,health:350000000},
				mercury:{name: "Mercury Thor",id: "mercury",stat: "S",size: 250,duration: 168,health:700000000},
				mermara:{name: "Mermara",id: "mermara",stat: "S",size: 500,duration: 168,health:800000000},
				natasha:{name: "Natasha Cybersmash",id: "natasha",stat: "S",size: 250,duration: 168,health:450000000},
				nemo:{name: "Nemo",id: "nemo",stat: "S",size: 500,duration: 168,health:1000000000},
				peacemaker_500:{name: "Peacemaker 500",id: "peacemaker_500",stat: "H",size: 100,duration: 168,health:140000000},
				purple_lion:{name: "Purple Lion",id: "purple_lion",stat: "S",size: 10,duration: 72,health:8000000},
				professor_squid:{name: "Professor Squid",id: "professor_squid",stat: "H",size: 10,duration: 120,health:18000000},
				psychic_cyborg:{name: "Mr. Justice",id: "psychic_cyborg",stat: "H",size: 50,duration: 144,health:45000000},
				qin_legion:{name: "Qin Legion",id: "qin_legion",stat: "H",size: 50,duration: 144,health:65000000},
				ragebeasts:{name: "Garlax Ragebeasts",id: "ragebeasts",stat: "S",size: 10,duration: 120,health:2000000},
				rautha:{name: "Commander Rautha",id: "rautha",stat: "S",size: 100,duration: 72,health:50000000},
				reaver:{name: "Galactic Reaver",id: "reaver",stat: "S", size: 250,duration: 72,health: 1000000000},
				robotic_rautha:{name: "Robotic Rautha",id: "robotic_rautha",stat: "S",size: 100,duration: 72,health:80000000},
				rylattu_exterminator:{name: "Rylattu Exterminator",id: "rylattu_exterminator",stat: "H",size: 100,duration: 168,health:100000000},
				saucers:{name: "Saucers",id: "saucers",stat: "H",size: 100,duration: 168,health:55000000},
				scarlet_harlet:{name: "The Scarlet Harlot",id: "scarlet_harlet",stat: "S",size: 10,duration: 72,health:10000000},
				seth:{name: "Nathaniel Vorden",id: "seth",stat: "S",size: 10,duration: 72,health:6000000},
				ship_of_the_damned:{name: "Ship of the Damned",id: "ship_of_the_damned",stat: "H",size: 250,duration: 168,health:300000000},
				sigurd:{name: "Sigurd Spinebreaker", id: "sigurd", stat: "S", size: 10,duration: 72,health: 16000000},
				sludge_serpent:{name: "Sludge Serpent",id: "sludge_serpent",stat: "S",size: 100,duration: 72,health:120000000},
				sun_xi:{name: "Sun Xi's Echo",id: "sun_xi",stat: "S",size: 100,duration: 72,health:100000000},
				telemachus:{name: "Telemachus",id: "telemachus",stat: "S",size: 100,duration: 168,health:20000000},
				terminus_death_squad:{name: "Terminus Death Squad",id: "terminus_death_squad",stat: "H",size: 10,duration: 120,health:24000000},
				terminus_interceptor_squadron:{name: "Terminus Interceptor Squadron",id: "terminus_interceptor_squadron",stat: "H",size: 50,duration: 144,health:75000000},
				terminus_juggernaut:{name: "Terminus Juggernaut",id: "terminus_juggernaut",stat: "H",size: 100,duration: 168,health:200000000},
				the_emperor:{name: "Dule's Robot",id: "the_emperor",stat: "S",size: 500,duration: 168,health:5000000000},
				trashmaster:{name: "Trashmaster Colby",id: "trashmaster",stat: "H",size: 50,duration: 144,health:100000000},
				tourniquet:{name: "Tourniquet 7",id: "tourniquet",stat: "H",size: 100,duration: 168,health:60000000},
				vince_vortex:{name: "Vince Vortex",id: "vince_vortex",stat: "E",size: 500,duration: 72,health:600000000},
				vespasia:{name: "Vespasia's Android",id: "vespasia",stat: "S",size: 250,duration: 168,health:250000000},
				void:{name: "CC Void Killer",id: "void",stat: "S",size: 50,duration: 168,health:5000000},
				vulture_gunship:{name: "Vulture Gunship",id: "vulture_gunship",stat: "S",size: 50,duration: 72,health:65000000},
				warden_ramiro:{name: "Warden Ramiro",id: "warden_ramiro",stat: "S",size: 50,duration: 72,health:60000000},
				xarpa:{name: "CC Fleet Commander", id: "xarpa",stat: "S", size: 50,duration: 72, health: 70000000},
				celebration_enhancer_1:{name:"Celebration Enhancer j-54",id:"celebration_enhancer_1",stat:"H",size:250,duration:84,health:600000000},
				the_hat:{name:"The Hat", id: "the_hat", stat: "S", size: 250, duration: 72, health:1100000000},
				kalaxian_cult_mistress:{name: "Cult Mistress", id:"kalaxian_cult_mistress", stat:"S", size: 100, duration: 72, health:160000000},
				crush_colossa:{name: "Crush Colossa", id:"crush_colossa", stat: "S", size:500, duration: 72, health:3000000000},
				bachanghenfil:{name:"Bachanghenfil", id:"bachanghenfil", stat: "S", size: 50, duration: 72,health: 75000000},
				
				quiskerian_temple:{name: "Quiskerian Temple", id:"quiskerian_temple", stat:"S", size:25, duration:10, health:[
					{value:200000000,fs:8000000,os:8000000},
					{value:1000000000,fs:40000000,os:40000000},
					{value:2000000000,fs:80000000,os:80000000},
					{value:3000000000,fs:120000000,os:120000000}
				]},
				murderer:{name:"murderer",id: "murderer", stats:"S",size: 1,duration:6, health:[
					{value:6000000,fs:6000000,os:6000000},
					{value:6000000,fs:6000000,os:6000000},
					{value:6000000,fs:6000000,os:6000000},
					{value:6000000,fs:6000000,os:6000000}
				]},
				wahsh:{name:"Wahsh",id:"wahsh",stat:"H",size:100,duration:72, health:[
					{value:500000000,fs:5000000,os:5000000},
					{value:1200000000,fs:12000000,os:12000000},
					{value:3125000000,fs:31250000,os:31250000},
					{value:7812500000,fs:78125000,os:78125000}
				]},
				space_pox:{name:"Space Pox",id: "space_pox",shortName:"Pox",stat:"S",size:12,duration:5,health:[
					{value:100000000,fs:10000000,os:35000000},
					{value:500000000,fs:50000000,os:175000000},
					{value:1000000000,fs:100000000,os:350000000},
					{value:1500000000,fs:150000000,os:525000000}
				]},
				
				inf_colony:{name:"Infested Colony",id:"inf_colony",stat:"SEH",size:90000,duration:100,health:[{value:"Unlimited",fs:1000000000,os:1000000000},{value:"Unlimited",fs:1000000000,os:1000000000},{value:"Unlimited",fs:1000000000,os:1000000000},{value:"Unlimited",fs:1000000000,os:1000000000}]},
				inf_lair:{name:"Alien Lair",id:"inf_lair",stat:"SEH",size:90000,duration:100,health:[{value:"Unlimited",fs:1000000000,os:1000000000},{value:"Unlimited",fs:1000000000,os:1000000000},{value:"Unlimited",fs:1000000000,os:1000000000},{value:"Unlimited",fs:1000000000,os:1000000000}]},
				inf_ship:{name:"Python",id:"inf_ship",stat:"SEH",size:90000,duration:100,health:[{value:"Unlimited",fs:1000000000,os:1000000000},{value:"Unlimited",fs:1000000000,os:1000000000},{value:"Unlimited",fs:1000000000,os:1000000000},{value:"Unlimited",fs:1000000000,os:1000000000}]},

				gut_phager:{name:"Gut Phager",id:"gut_phager",stat:"S", size:50,duration:72,health:80000000} ,
quiskan_psi_hound:{
	name: "Quiskan Psi-Hound",
	id: "quiskan_psi_hound",
	size: 250,
	stat: "H",
	duration: 168,
	health:[{
		value:1000000000,
		fs: 4000000,
		os: 4000000
	},{
		value: 1500000000,
		fs: 6000000,
		os: 6000000
	},{
		value: 2500000000,
		fs: 10000000,
		os: 10000000
	},{
		value: 10000000000,
		fs: 40000000,
		os: 40000000
	}]
},
g_rahn:{name:"G. Rahn", id: "g_rahn", size: 250, stat: "S", duration: 72, health: 1200000000},
shuborunth:{name: "Blob", id: "shuborunth", size: 100, stat: "S", duration: 72, health: 200000000},
haunted_house:{name: "H. House", id: "haunted_house", stat: "H", size: 100, duration: 168, health: 350000000},
nosferatu_nick:{name: "Nick", id: "nosferatu_nick", stat: "S", size: 500, duration: 24, health:3500000000},
niflung_boar:{name:"Boar",id:"niflung_boar",stat:"S",size:500,duration:30,health:4000000000},
guan_yu:{name:"Guan Yu",id:"guan_yu",stat:"S",size:250,duration:72,health:1300000000},
birthday_cake_of_doom:{name:"Birthday Cake",id:"birthday_cake_of_doom",stat:"S",size:100,duration:72,health:250000000},
missile_strike:{
	name: "Missile Strike",
	id: "Missile Strike",
	size: 10,
	stat: "S",
	duration: 72,
	health: 22000000
},
bashan:{
	name: "Bashan",
	id: "bashan",
	size: 50,
	stat: "S",
	duration: 72,
	health: 85000000
},
cyborg_shark:{
	name: "Cyborg Shark",
	id: "cyborg_shark",
	stat: "S",
	size: 50,
	duration: 72,
	health: 90000000
},
anthropist_xenocide_warship:{
	name: "Xenocide Warship",
	id: "anthropist_xenocide_warship",
	stat: "S",
	size: 100,
	duration: 72,
	health: 300000000
},
vlarg_relic_hunter:{
	name: "Vlarg Relic Hunter",
	id: "vlarg_relic_hunter",
	stat: "S",
	size: 500,
	duration: 30,
	health: 4500000000
},
bile_beast:{
	name: "Bile",
	id: "bile_beast",
	stat: "S",
	size: 250,
	duration: 72,
	health: 1500000000
},
pi:{
	name: "Pi",
	id: "pi",
	stat: "S",
	size: 10,
	duration: 72,
	health: 24000000
}
			},
			reload: function () {
				SRLTSX.echo("Reloading, please wait...");
				var reg=new RegExp(/var iframe_options = ([^\x3B]+)/g);
				var match=reg.exec(activateGame); 
				var iframe_options=eval('('+match[1]+')');
				$('gameiframe').replace(new Element('iframe', {"id":"gameiframe","name":"gameiframe","style":"border:none;position:relative;z-index:1;","scrolling":"auto","border":0,"frameborder":0,"width":760,"height":700,"class":"dont_hide"}));
				$('gameiframe').contentWindow.location.replace("http://adf.ly/3966902/http://web1.legacyofathousandsuns.com/kong?" + Object.toQueryString(iframe_options));
			}
		}
		console.log("[SRLTSX] Initialized. Checking for needed Kongregate resources...");
		SRLTSX.load(0);
	}+')()')).parentNode);
}