// ==UserScript==
// @name           SRDotDX - FPX - Whatever
// @namespace      tag://kongregate
// @description    Easier Kongregate's Dawn of the Dragons
// @author         SReject, chairmansteve
// @version        0.0.9
// @date           06.09.2012
// @include        http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
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
	window.SRDotDX = {
		version: {major: "0.0.8", minor: "F.P.X"},
		echo: function(msg){holodeck.activeDialogue().SRDotDX_echo(msg)},
		config: (function(){
			try {
				var tmp = JSON.parse(GM_getValue("SRDotDX","{}"));
			}
			catch (e) {var tmp = {}}
			tmp.scrollbarFix = (typeof tmp.scrollbarFix == 'boolean'?tmp.scrollbarFix:true);
			tmp.splitLongMsgs = (typeof tmp.splitLongMsgs == 'boolean'?tmp.splitLongMsgs:true);
			tmp.hideRaidLinks = (typeof tmp.hideRaidLinks == 'boolean'?tmp.hideRaidLinks:false);
			tmp.hideVisitedRaids = (typeof tmp.hideVisitedRaids == 'boolean'?tmp.hideVisitedRaids:false);
			tmp.hideSeenRaids = (typeof tmp.hideSeenRaids == 'boolean'?tmp.hideSeenRaids:false);
			tmp.FPXmarkRightClick = (typeof tmp.FPXmarkRightClick == 'boolean'?tmp.FPXmarkRightClick:false);
			tmp.FPXoptsMarkRightClickDelay = (typeof tmp.FPXoptsMarkRightClickDelay == 'number'?tmp.FPXoptsMarkRightClickDelay:8000);
			tmp.FPXoptsDeleteEarly = (typeof tmp.FPXoptsDeleteEarly == 'string'?tmp.FPXoptsDeleteEarly:100);
			tmp.FPXdisplayListImgLink = (typeof tmp.FPXdisplayListImgLink == 'boolean'?tmp.FPXdisplayListImgLink:false);
			tmp.formatRaidLinks = (typeof tmp.formatRaidLinks == 'boolean'?tmp.formatRaidLinks:true);
			tmp.raidLinkFormat = (typeof tmp.raidLinkFormat == 'string'?tmp.raidLinkFormat:"<visited:(v) ><name> - <diff> - <fs>/<os>");
			tmp.raidLinkFormat = tmp.raidLinkFormat.replace(/&#91;/g,"[").replace(/&#93;/g,"]").replace(/&#123;/g,"{").replace(/&#125;/g,"}")
			if (typeof tmp.raidList != 'object') {
				tmp.raidList = {}
			}

            
			for (var hash in tmp.raidList){
				if (tmp.raidList.hasOwnProperty(hash)) {
					tmp.raidList[hash].timeLeft = function (){
						//return this.expTime*tmp.FPXoptsDeleteEarly/100 - parseInt((new Date).getTime() / 1000);
                        //return this.expTime + (typeof SRDotDX.raids[tmp.raidList[hash].boss] == 'object'?SRDotDX.raids[tmp.raidList[hash].boss].duration:168)*3600*tmp.FPXoptsDeleteEarly/100 - parseInt((new Date).getTime() / 1000);
                        return 1;
					}
					if (tmp.raidList[hash].timeLeft() < 0) {
						delete tmp.raidList[hash];
					}
				}
			}
            
			GM_setValue("SRDotDX",JSON.stringify(tmp));
			tmp.addRaid = function(hash,id,boss,diff,seen,visited,user) {
				if (typeof SRDotDX.config.getRaid(hash) != 'object') {
					SRDotDX.config.raidList[hash] = {
						hash: hash,
						id: id,
						boss: boss,
						diff: diff,
						seen: seen,
						visited: visited,
						user: user,
						expTime: parseInt((new Date).getTime() / 1000),
						timeLeft: function (){return ((typeof SRDotDX.raids[boss] == 'object'?SRDotDX.raids[boss].duration:168) * 3600*SRDotDX.config.FPXoptsDeleteEarly/100)+this.expTime - parseInt((new Date).getTime() / 1000)}
					}
					SRDotDX.gui.addRaid(hash,SRDotDX.config.FPXdisplayListImgLink);
				}
				return SRDotDX.config.raidList[hash]
			}
			tmp.export = function () {
				SRDotDX.config.save();
				window.prompt("Export Data:",JSON.stringify(SRDotDX.config));
			}
			tmp.getRaid = function(hash) {
				if (typeof SRDotDX.config.raidList[hash] == 'object') {
					if (SRDotDX.config.raidList[hash].timeLeft() > 1) {
						return SRDotDX.config.raidList[hash];
					}
					else {
						delete SRDotDX.config.raidList[hash];
					}
				}
			}
			tmp.import = function (data) {
			}
			tmp.save = function () {
				for (var hash in SRDotDX.config.raidList){
					if (SRDotDX.config.raidList.hasOwnProperty(hash) && SRDotDX.config.raidList[hash].timeLeft <= 0) {
						delete SRDotDX.config.raidList[hash];
						SRDotDX.gui.raidListRemoveByHash(hash);
					}
				}
				var a = SRDotDX.config.raidFormat;
				SRDotDX.config.raidFormat = SRDotDX.config.raidLinkFormat.replace(/\{/g,"&#123;").replace(/\}/g,"&#125;").replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")
				GM_setValue("SRDotDX",JSON.stringify(SRDotDX.config));
				SRDotDX.config.raidFormat = a;
				setTimeout(SRDotDX.config.save,300000);
			}
			tmp.raidTimeout = function () {
				console.log("[SRDotDX] Verifying old raids....");
                console.log("[SRDotDX] Percentage set: "+tmp.FPXoptsDeleteEarly);
                console.log("[SRDotDX] Clock: "+parseInt((new Date).getTime() / 1000));				
                //console.log("[SRDotDX] Clock: "+(new Date).getTime().toLocaleString();
                

			for (var hash in tmp.raidList){
				if (tmp.raidList.hasOwnProperty(hash)) {
                    r = tmp.raidList[hash];
                    //console.log("[SRDotDX] Time "+r.expTime);
					tmp.raidList[hash].timeLeft = function (){
						return r.expTime + (typeof SRDotDX.raids[r.boss] == 'object'?SRDotDX.raids[r.boss].duration:168)*3600*tmp.FPXoptsDeleteEarly/100 - parseInt((new Date).getTime() / 1000);
                        //return 1;
					}
					if (tmp.raidList[hash].timeLeft() < 0) {
                        console.log("[SRDotDX] Deleting Raid.");
						delete tmp.raidList[hash];
					}
				}
			}                
                
				setTimeout(SRDotDX.config.raidTimeout,60000);
			}
			return tmp;
		})(),
		getRaidDetails: function(url,user) {
			user = (user?user:'');
			var i;
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
				var info = SRDotDX.config.getRaid(r.hash);
				if (typeof info != 'object') {
					info = SRDotDX.config.addRaid(r.hash, r.id, r.boss, r.diff,false,false,user)
				}
				r.diffLongText = ['Normal','Hard','Legendary','Nightmare','Insane','Hell'][r.diff-1];
				r.diffShortText = ['N','H','L','NM','I','HL'][r.diff-1];
				r.seen = info.seen;
				r.visited = info.visited;

				var stats = SRDotDX.raids[r.boss];
				if (typeof stats == 'object') {
					r.name = stats.name;
					r.size = stats.size;
					r.dur = stats.duration;
					r.durText = stats.dur + "hrs";
					r.stat = stats.stat;
					r.statText = SRDotDX.getStatText(stats.stat);
					if (!isNaN(stats.health[r.diff-1])) {
						r.health = stats.health[r.diff-1];
						r.healthText = SRDotDX.getShortNum(r.health);
						r.fairShare = r.health / r.size;
						r.fairShareText = SRDotDX.getShortNum(r.fairShare);
						r.optimalShare = r.fairShare * {"10":1.25, "50": 2.2, "100":2.3, "250": 1, "500": 1.5}[r.size];
						r.optimalShareText = SRDotDX.getShortNum(r.optimalShare);
						
					}
					else if (stats.health[0] == 'Unlimited') {
						r.health = '';
						r.healthText = 'Unlimited';
						r.fairShare = 1000000000;
						r.fairShareText = SRDotDX.getShortNum(r.fairShare);
						r.optimalShare = 1000000000;
						r.optimalShareText = SRDotDX.getShortNum(r.optimalShare);
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

				r.linkText = function () {
					if (SRDotDX.config.formatRaidLinks){
                        //var border = 'border-bottom-color: #'+(this.stat =='S'?'FFFF00':'800080') ;
						var txt = SRDotDX.config.raidLinkFormat;
						txt = txt.replace(/<visited:([^>]*)>/gi,(this.visited?"$1":""));
						txt = txt.replace(/<seen:([^>]*)>/gi,(this.seen?"$1":""));
						txt = txt.replace(/<diff>/gi,this.diffShortText);
						txt = txt.replace(/<diff:Num>/gi,this.diff);
						txt = txt.replace(/<diff:Long>/gi,this.diffLongText);
						txt = txt.replace(/<bossId>/gi,this.boss);
						txt = txt.replace(/<raidId>/gi,this.id);
						txt = txt.replace(/<hash>/gi,this.hash);
						txt = txt.replace(/<name>/gi,(!this.name?'Unknown':this.name));
						txt = txt.replace(/<shortname>/gi,(!this.name?'Unknown':SRDotDX.raids[this.boss].shortname));
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
                        txt = txt.replace(/&lt;picture&gt;/gi,'<image src="'+SRDotDX.raids[this.boss].picture+'" style=" height: 60px; width: 80px; vertical-align: text-top; float: left;">');
						return txt.replace(/&lt;image&gt;/gi,'<image src="http://cdn4.kongregate.com/game_icons/0034/9771/logo_site.png" style="vertical-align: text-top; float: left;">');
					}
					else {
						return '<image src="http://cdn4.kongregate.com/game_icons/0034/9771/logo_site.png" style="vertical-align: text-top"> Dawn of the Dragons'
					}
				}
				return r;
			}
		},
		getRaidLink: function (msg,user) {
			msg = msg.replace(/[\r\n]/g,"");
			var m = /^((?:(?!<a[ >]).)*)<a.*? href="((?:(?:https?:\/\/)?(?:www\.)?kongregate\.com)?\/games\/5thPlanetGames\/dawn-of-the-dragons(\?[^"]+))".*?<\/a>((?:(?!<\/?a[ >]).)*(?:<a.*? class="reply_link"[> ].*)?)$/i.exec(msg);
			if (m) {
				var raid = SRDotDX.getRaidDetails(m[3],(user?user:''))
				if (typeof raid != 'undefined' && typeof raid != 'null') {
					raid.ptext = m[1];
					raid.url = m[2];
					raid.ntext = m[4];
					return raid;
				}
			}
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
		gui: {
			
			addRaid: function (hash,FPXshoIconLink) {
				var r = SRDotDX.config.raidList[hash];
				if (r.boss) {
					var rd = SRDotDX.raids[r.boss];
					var a = document.getElementById("raid_list");
					if (typeof a != 'undefined' && a) { 
						var b = 1
						if (a.hasChildNodes()) b += a.childNodes.length;
						var info = '<hr>';
						if (typeof rd != 'object') {
							rd = {name: 'Unknown'};
							info += '<div style="float: left;width: 49%;">Posted By:<br>Boss Id:<br>Difficulty:</div>';
							info += '<div style="width: 49%; float: right; text-align: right;">'
							info += (r.user != ''?r.user:'Unknown')+"<br>";
							info += r.boss+"<br>";
							info += ["Normal","Hard","Legendary","Nightmare","Insane","Hell"][r.diff -1]+"</div>";
						}
						else if (rd.health[r.diff-1] == 'Unlimited') {
							info += '<div style="float: left;width: 49%;">Posted By:<br>Stat Used:<br>Difficulty:<br>Health:<br>Best Share:<br>Maximum Time:</div>';
							info += '<div style="width: 49%; float: right; text-align: right;">'
							info += (r.user != ''?r.user:'Unknown')+"<br>";
							info += rd.stat+"<br>";
							info += ["Normal","Hard","Legendary","Nightmare","Insane","Hell"][r.diff -1]+"<br>";	
							info += "Unlimited<br>";
							info += "1B<br>";
							info += new Date(r.expTime*1000).toLocaleString()+"</div>";
						}
						
						else if (!isNaN(rd.health[r.diff-1])) {
							var h = rd.health[r.diff -1];
							var f = h / rd.size;
							var o = f * {"10":1.25, "50":2.2, "100":2.3, "250":1,"500":1.5}[rd.size];
							info += '<div style="float: left; width: 49%;">';
							info += 'Posted By:<br>Difficulty:<br>Stats Used:<br>Size:<br>Health:<br>Fair Share:<br>Optimal Share:<br>Added in:</div>';
							info += '<div style="float: right; width: 49%;text-align: right;">';
							info += (r.user != ''?r.user:'Unknown')+"<br>";
							info += ["Normal","Hard","Legendary","Nightmare","Insane","Hell"][r.diff -1]+"<br>";
							info += rd.stat+"<br>";
							info += rd.size+"<br>";
							info += SRDotDX.getShortNum(h)+"<br>";
							info += SRDotDX.getShortNum(f)+"<br>";
							info += SRDotDX.getShortNum(o)+"<br>";
							info += new Date(r.expTime*1000).toLocaleString()+"</div>";
						}
						else {
							info += '<div style="float: left; width: 49%;">';
							info += 'Posted By:<br>Difficulty:<br>Stats Used:<br>Size:<br>Health:<br>Fair Share:<br>Optimal Share:<br>Added in:</div>';
							info += '<div style="float: right; width: 49%;text-align: right;">';
							info += (r.user != ''?r.user:'Unknown')+"<br>";
							info += ["Normal","Hard","Legendary","Nightmare","Insane","Hell"][r.diff -1]+"<br>";
							info += rd.stat+"<br>";
							info += rd.size+"<br>";
							info += "Unknown<br>";
							info += "Unknown<br>";
							info += "Unknown<br>";
							info += new Date(r.expTime*1000).toLocaleString()+"</div>";
						}
						info += '<div style="clear: both"></div><hr>';
						info += '<center><table><tr>';
						info += '<td style="width: 70px"><input class="FPXcbSeen" type="checkbox" '+(r.seen == true?' checked="checked"':'')+'> Seen</td>';
						info += '<td style="width: 70px"><input class="FPXcbVisited" type="checkbox" '+(r.visited == true?' checked="checked"':'')+'> Visited</td>';
						info += '</tr></table></center>';

						var li = SRDotDX.gui.cHTML('div').set({
							class: 'raid_list_item',
							style: b%2==0?'background-color:#e0e0e0':'',
							raidId: r.id,
							raidHash: r.hash,
							raidDiff: r.diff,
							raidBoss: r.boss,
							raidVisited: r.visited,
							raidSeen: r.seen
						}).attach("to",a).ele();

						var url = "/games/5thPlanetGames/dawn-of-the-dragons?kv_action_type=raidhelp&kv_difficulty="+r.diff+"&kv_hash="+r.hash+"&kv_raid_boss="+r.boss+"&kv_raid_id="+r.id;
						var rh;
						if(FPXshoIconLink){
							rh=SRDotDX.gui.cHTML('div').set({class: 'raid_list_item_head'}).html(' \
								<a href="'+url+'" class="link">' + rd.name + '</a> \
								<span class="link" style="font-weight: normal !important; float: right"><a class="FPXDeleteLink" href="#">delete</a></span> \
								<a class="FPXlink" href="'+url+'" ></a> \
								<span class="FPXtext">' + rd.name + '</span><span class="FPXtext" style="float: right;font-style: italic;">'+(r.visited?'visited':'')+'</span> \
							').attach("to",li).ele()/* .addEventListener("click",function(e) {
								var con = document.getElementById("raid_list").getElementsByClassName("active");
								if (con.length == 1) con[0].className = con[0].className.replace(/ active/gi,"");
								this.parentNode.className += " active";
							}) */;
						}else{
							rh=SRDotDX.gui.cHTML('div').set({class: 'raid_list_item_head'}).html(' \
								<a href="'+url+'" class="link">' + rd.name + '</a> \
								<span class="link" style="font-weight: normal !important; float: right"><a class="FPXDeleteLink" href="#">delete</a></span> \
								<span class="FPXtext">' + rd.name + '</span><span class="FPXtext" style="float: right">'+(r.visited?'visited':'')+'</span> \
							').attach("to",li).ele()/* .addEventListener("click",function(e) {
								var con = document.getElementById("raid_list").getElementsByClassName("active");
								if (con.length == 1) con[0].className = con[0].className.replace(/ active/gi,"");
								this.parentNode.className += " active";
							}) */;
						}
						var ri = SRDotDX.gui.cHTML('div').set({
							class: 'raid_list_item_info'
						}).html(info).attach("to",li);
					}
				}
				else {
					delete SRDotDX.config.raidList[a];
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
			deleteRaid: function (ele,hash) {
				if (typeof hash == 'string' && hash != '') {
					if (SRDotDX.config.raidList[hash]) {
						delete SRDotDX.config.raidList[hash];
					}
					setTimeout(function(ele) {
						var e = ele.nextSibling;
						while (e) {
							if (e.getAttribute("style").indexOf('background-color:#e0e0e0') > -1) {
								e.setAttribute("style","");
							}
							else {
								e.setAttribute("style",'background-color:#e0e0e0');
							}
							e = e.nextSibling;
						}
						//delete the element
						ele.parentNode.removeChild(ele);
					},1,ele.parentNode.parentNode.parentNode)
				}
			},
			FPXdeleteAllRaids: function () {
				console.log("[SRDotDX]::{FPX}:: DELETE ALL STARTED...");
				for (var hash in SRDotDX.config.raidList){					
						if (SRDotDX.config.raidList[hash]) {
							delete SRDotDX.config.raidList[hash];
						}				
				}
				console.log("[SRDotDX]::{FPX}:: removing from raid_list div");
				var raidlistDIV=document.getElementById('raid_list');
				while (raidlistDIV.hasChildNodes()) {
					raidlistDIV.removeChild(raidlistDIV.lastChild);
				}
				console.log("[SRDotDX]::{FPX}:: removing from local storage...");
				localStorage.removeItem('raidList');

				console.log("[SRDotDX]::{FPX}:: DELETE ALL FINISHED...");
			},
			FPXdoWork: function (param1) {
				console.log("[SRDotDX]::{FPX}::"+param1+"\n");
				var matchClass="chat_input";						
				var elems= document.getElementById("chat_rooms_container").firstChild.getElementsByTagName('textarea');
				for (var i in elems){
						if((" "+elems[i].className+" ").indexOf(" "+matchClass+" ") > -1)
						{elems[i].value = param1;holodeck.activeDialogue().sendInput(); break;}
				}
			},
			FPXspamRaids: function () {
				console.log("[SRDotDX]::{FPX}:: SPAMMER STARTED...");
				try
				{					
					document.FPXRaidSpamForm.Submit.onClick="return false;";
					document.FPXRaidSpamForm.Submit.value="Working...";
					var linklist=document.FPXRaidSpamForm.FPXRaidSpamInput.value;
					if(linklist.length>10)
					{
						document.FPXRaidSpamForm.FPXRaidSpamInput.value="";
						var patt = new RegExp("http...www.kongregate.com.games.5thPlanetGames.dawn.of.the.dragons.[\\w\\s\\d_=&]+[^,]", "ig");
						var link;
						var timer=500,ttw=1500,i=1;
						
						while(link = patt.exec(linklist))
						{
							if(i%10==0)timer+=5000;
							(function(param1) {return setTimeout(function() {SRDotDX.gui.FPXdoWork(param1);},timer); })(link);
							timer+=ttw+Math.floor(Math.random()*1000);
							i+=1;
						}
					}
					setTimeout(function() {						
							document.FPXRaidSpamForm.Submit.onClick="SRDotDX.gui.FPXspamRaids();return false;";
							document.FPXRaidSpamForm.Submit.value="Send Links to Chat";
							console.log("[SRDotDX]::{FPX}:: SPAMMER FINISHED...");
						},timer);
				}catch(error)
				{
					console.log("[SRDotDX]::{FPX}::ERROR:: "+error);
				}
				
				
			},
			FPXFilterRaidListByName: function () {
				console.log("[SRDotDX]::{FPX}:: FILTERING RAID LIST...");
				//the values the user entered
				var nameFilter=document.FPXRaidFilterForm.FPXRaidBossNameFilter.value;
				var DifficultyFilter=document.FPXRaidFilterForm.FPXRaidBossDifficultyFilter.value;
				
					var re = new RegExp(nameFilter, "i");
					var raidList=document.getElementById('raid_list').childNodes,raidName;
					//checking difficulty here, to save having to checkit in the loop unnecessarily
					if(DifficultyFilter=='0')
					{
						for(i=0; i<raidList.length; i+=1) {
							//console.log("[SRDotDX]::{FPX}:: raid var"+raidList[i].firstChild.childNodes[1]+raidList[i].firstChild.childNodes[1].textContent+"   "+raidList);
							try
							{
								//return false;
								raidName=raidList[i].firstChild.childNodes[1].textContent;
								if (re.test(raidName))
								{
									//console.log("[SRDotDX]::{FPX}:: hiding "+raidName);
									raidList[i].className="raid_list_item";
								}
								else
								{
									raidList[i].className="raid_list_item hidden";
								}
							}catch(err){console.log("[SRDotDX]::{FPX}:: error::"+err+"   raid var"+raidList[i]+raidList[i].innerHTML);return false;}
						}
					}
					else
					{
						//difficulty regex
						var patt = new RegExp("kv_difficulty=(\\d+)", "i");
						//var patt=/kv_difficulty=(\\d+)/i;
						for(i=0; i<raidList.length; i+=1) 
						{
							//console.log("[SRDotDX]::{FPX}:: raid var"+raidList[i].firstChild.childNodes[1]+"    \n"+raidList[i].firstChild.childNodes[1].textContent+"   "+raidList);
							try
							{								
								if (re.test(raidList[i].firstChild.childNodes[1].textContent))
								{
									//console.log("[SRDotDX]::{FPX}:: hiding "+raidName);
									var x=patt.exec((raidList[i].firstChild.childNodes[1]))[1];
									//console.log("[SRDotDX]::{FPX}:: difficulty "+x+"  "+DifficultyFilter)
									if(x==DifficultyFilter)
									{
										raidList[i].className="raid_list_item";
										continue;
									}
									
								}						
								//if we've gotten here it means the difficulty didnt match
								raidList[i].className="raid_list_item hidden";
								
							}catch(err){console.log("[SRDotDX]::{FPX}:: error::"+err+"   raid var"+raidList[i]+raidList[i].innerHTML);return false;}
						}
					}
				
				console.log("[SRDotDX]::{FPX}:: RAID LIST FILTER COMPLETED...");
				return false;
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
			load: function () {
				if (typeof holodeck == 'object' && typeof holodeck._tabs == 'object' && typeof holodeck._tabs.addTab == 'function') {
					SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'SRDotDX_raidClass'}).text('.SRDotDX_raid{display:'+(SRDotDX.config.hideRaidLinks == true?'none !important':'block')+'}').attach('to',document.head);
					SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'SRDotDX_visitedRaidClass'}).text('.SRDotDX_visitedRaid{display: '+(SRDotDX.config.hideVisitedRaids == true?'none !important':'block')+'}').attach('to',document.head);
					SRDotDX.gui.cHTML('style').set({type: "text/css",id: 'SRDotDX_seenRaidClass'}).text('.SRDotDX_seenRaid{display: '+(SRDotDX.config.hideSeenRaids == true?'none !important':'block')+'}').attach('to',document.head);
					SRDotDX.gui.cHTML('style').set({type: "text/css"}).text(" \
						a.FPXDeleteAllBtn{display:block;color:#FFFFFF;background-color:rgb(153, 0, 0);font-weight:bold;font-size:11px;width:120px;text-align:center;padding:0;padding-top:3px;padding-bottom:4px;border:1px solid #ffffff;outline:1px solid rgb(153, 0, 0);text-decoration:none;margin-left:1px;} \
						#FPXtt { position:absolute; display:block; background:url(data:image/gif;base64,R0lGODlhBQCWAIABAGZmZv///yH5BAEAAAEALAAAAAAFAJYAAAIgjG8AqaH9opy02ouz3rz7D4biSJbmiabqyrbuC8eyWgAAOw==) top left no-repeat; } \
						#FPXtttop { display:block; height:5px; margin-left:5px; background:url(data:image/gif;base64,R0lGODlhkAEFAIABAGZmZv///yH5BAEAAAEALAAAAACQAQUAAAI0hI+py+0Po5y02ouz3rz7XwWiCJbmiabqyrauOr7yTNf2jecPqff+DwwKZ4Gh8YhMKoWBAgA7) top right no-repeat; overflow:hidden; } \
						#FPXttcont { display:block; padding:2px 12px 3px 7px; margin-left:5px; background:#666; color:#fff; } \
						#FPXttbot {display:block;height:5px;margin-left:5px;background:url(data:image/gif;base64,R0lGODlhkAEFAIABAGZmZv///yH5BAEAAAEALAAAAACQAQUAAAI1hI+py+0Po5y02ouz3rz7nwXgSJbmiabqyqpiC8fyTNf27QQvzvf+DwyydDuh8YhMKm9EXQEAOw==) top right no-repeat;overflow:hidden;} \
						#kong_game_ui ul.main_tabs li#lots_tab a {width: 44px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAwCAIAAAAOxbS1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARfSURBVFhH1Vk/SFtBGL9ot46RjI1GealkajJFBGOhdJBgEQczmmImty6COAUhS5fipDROJR0kIOJQBJNA0C1bkDxK2oBT2uBUxMl+9+7evXv33t2ZNLbpDfLeve/P777v933vyzPQbrfRyKyxkUGCgWA09/f3I4IJowkEAiOEZkSg0Ex50Qwxd32ZEllMsjbE3PVlyoUGNPs6ytBT7ELz2FC09h00btHO4WrEXquHHT4K1W14sF1lWyBqS/BaLhlLJzI9PS3YEqLroPEkOL5TgUbdbhej+UXHeedwr5XJxEtnDhyXSVurXdlpZSPEeXU726LGNr/uSxTt7qdJf+pVxpHonJ+ipVxuSQ7Hlg2vHxUzjbzgPLW7m5L7e8CboXpWis9MERMWmJfh8PpmRhodxxk+R+tbB6V2cXwjNFKKw48xungo1sAGYO3NVI7WwzwYuAZHpT03n/y9RKewamoXUl5ZOtVAGmN0kfCmsoPy76jb6n6+YWPMllDj9NxFbw8cPqrwEHLX/phRaWkrPLz+HvBY2cfGKRktdisNW9wtxSGtCCrNroLO9xYi0fJdYvfzEbJIAlnBYLBxe0GyfM5pxy4SyaJi20oxGEBZ0i4W89GigsaB/2Da0jZNTVOQP5YXjbzfEEYPjEmhKC8aDxrBivr1q3XpFdAe7wEsloRdOyqwAAMIsvgdfU3JsJN97ckEB0QeELBFBMitHo1XiFkkVvoib7/y2EUulyOevKRhUIQLhokn+x8Sn9ikvFEwjq9JWfBIHnkjisAoHoksVlthTJSFk4VNUZ6+j4hf8T2loKqWy1pdL/kIQxhPHjDfSKjbb4kRM4KWcEJnouirXh5JmE5bA1TjYwCisRks7EMHJH4V+LdBot3Pc8rQwkY2GSTbvcviQa3LRGIrW2nDPCmUm2QLRJfRsSXBayHEyVg6PrYEv+OJRELordbt08nEs+vPHz59qddvJjNrszf1qx/U95sXt9e3xsSdvQOiz1Gr0fnl0qqb4/NrmcS4CQ9iK2+jZtEydpd4HbqipryJdmXKnz3NlunohWYNZNbrZs+IxtS06dYOTsxgct4t1izbIfXTdr5tSRkTixq9HgkMssBcdbu1C1MLByF8juBECDXLJ71kdmtrYyGkPoH4O5zDFMQGYM31GG0oGDAJjow5nXGLKD8x45rlQqFQNA0NJEUvBvJiE5couUzdxuaTQRsjkDJozKrPykcVIEHuCpA8hRZFwyYgD3W6tWPAY2UfG7cQkqU2DOIraaMHacWVtkLZE5oI0mj5puwJ2eVfzqIcJskWzkoQjBedSodkpedmQ7UrlwKOXZLsQIUfWF2gdoEg42l7k3YGfCvMVdJpS023R3oqTlt/sxcLAzLcSr8mDQZLpsXvs2t+6CZscVU4n0XfTujrjN9UvH15EPw1r6L9RkF/KngHcuGIvkySefUWjTOJek+smMZJSNlfNZ0VAWaPCHvIrf9/PXgrQx99vMMo2/kN5y+czr7nW8kAAAAASUVORK5CYII=) !important;background-position: 0px -25px}\r\n \
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
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active {cursor: default; background-color: #DEEAF6 !important;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_head .text{display:none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_head .FPXtext{display:none;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_head .link{display: inline-block; font-weight: bold;} \
						#kong_game_ui div#lots_tab_pane ul li.tab.active div.tab_pane #raid_list .raid_list_item.active .raid_list_item_info {display:block;} \
					").attach("to",document.head);
					var link = SRDotDX.gui.cHTML('a').set({href: '#lots_tab_pane',class: ''}).html("DOTD").attach("to",SRDotDX.gui.cHTML('li').set({class: 'tab', id: 'lots_tab'}).attach("after","game_tab").ele()).ele();
					var pane = SRDotDX.gui.cHTML('div').set({id: 'lots_tab_pane'}).html(' \
						<div class="room_name_container"><span class="room_name">DotD Extension - FPX edition</span></div> \
						<ul id="SRDotDX_tabpane_tabs"> \
							<li class="tab active"> \
								<div class="tab_head">Raids</div> \
								<div class="tab_pane"> \
									<div id="FPXRaidFilterDiv"> \
										<FORM name="FPXRaidFilterForm" onSubmit="SRDotDX.gui.FPXFilterRaidListByName();return false"> \
											Filter:<INPUT NAME="FPXRaidBossNameFilter" size="15"> \
											<select name="FPXRaidBossDifficultyFilter"> \
												<option value="0" selected>All or Any</option> \
												<option value="1">Normal</option> \
												<option value="2">Hard</option> \
												<option value="3">Legendary</option> \
												<option value="4">Nightmare</option> \
												<option value="5">Insane</option> \
												<option value="6">Hell</option> \
											</select> \
											<input name="Submit"  type="submit" value="Filter" onClick="SRDotDX.gui.FPXFilterRaidListByName();return false"/> \
										</FORM> \
									</div> \
									<div id="raid_list"> \
									</div> \
								</div> \
							</li> \
							<li class="tab"> \
							<div class="tab_head">Options</div> \
									<div class="tab_pane"><br> \
									<input type="checkbox" id="FPX_options_markVisitedRightClick"> Mark raids as visited on RightClick (<a href="#" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'When you right-click on a raid (for copy and paste generally), that raid will be marked as visited.\');">?</a>)<br> \
									Delay(milliseconds) (<a href="#" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'Number of milliseconds to wait before marking raid link visited when it is right clicked.<br><strong>Only enabled if <i>\\\'Mark right click\\\'</i> AND <i>\\\'Hide visited raids\\\'</i> are enabled.</strong> \');">?</a>) :: \
									<INPUT id="FPX_options_markVisitedRightClickDelay" size="8"> <br>\
									\
									Delete Raids Early (Percent) <INPUT id="FPX_options_DeleteEarly" size="3"> <br>\
									<hr> \
									<input type="checkbox" id="FPX_options_displayLinkImg"> Display link icon beside Raid Name (requires refresh) \
									(<a href="#" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'Show a link Icon (\
									<img src=\\\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=\\\'/> ) next to the boss name Inside the raid list.<br><strong>This may cause script to become excessively laggy as the list becomes larger.</strong>\');">?</a>)<br><hr> \
									\
									<input type="checkbox" id="SRDotDX_options_formatRaids"> Enable Raid Link Formatting (<a href="#" onclick="return false;" onmouseout="FPX.tooltip.hide();" onmouseover="FPX.tooltip.show(\'Set formatting options for raid links posted in chat.<br><strong>See the userscript page for a list of all formatting options.</strong> \');">?</a>)<br><br> \
									<textarea id="SRDotDX_options_raidLinkFormat"></textarea><br> \
									<hr> \
									<input type="checkbox" id="SRDotDX_options_hideRaidLinks"> Hide all raid links (<a href="#" onclick="return false">?</a>)<br> \
									<br> \
									<input type="checkbox" id="SRDotDX_options_hideSeenRaids"> Hide raids I\'ve seen before (<a href="#" onclick="return false">?</a>)<br> \
									<input type="checkbox" id="SRDotDX_options_hideVisitedRaids"> Hide raids I\'ve already visited (<a href="#" onclick="return false">?</a>)<br><br><br> \
									<a class="FPXDeleteAllBtn" href="#" onclick="SRDotDX.gui.FPXdeleteAllRaids();return false;">Delete All Raids</a><br> \
								</div> \
							</li> \
							<li class="tab"> \
								<div class="tab_head">Share Raids</div> \
								<div class="tab_pane"> \
								<div id="FPXRaidSpamDiv"> \
										<FORM name="FPXRaidSpamForm" onSubmit="SRDotDX.gui.FPXspamRaids();return false"> \
											<input name="Submit"  type="submit" value="Post Links to Chat" onClick="SRDotDX.gui.FPXspamRaids();return false;"/><br> \
											<textarea id="FPXRaidSpamTA" name="FPXRaidSpamInput" ></textarea> \
										</FORM> \
									</div> \
								</div> \
							</li> \
							<li class="tab"> \
								<div class="tab_head">Help</div> \
								<div class="tab_pane">Do I need text too?</div> \
							</li> \
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
					var FPXimpSpam= SRDotDX.gui.cHTML('#FPXRaidSpamTA');
					FPXimpSpam.ele().style.width = e[0].offsetWidth - 12 + "px";
					FPXimpSpam.ele().style.height = (h - 200) + "px";
					var FPXSpamText="Paste links here and press the button.\nLinks must be comma (,) separated.\n\n\
NOTE: this is a pretty buggy beta feature.\nIt may also get you banned from kongregate and/or chat.\n\n\
This is probably only useful if you have a clipboard listener like my 'DotD raid link spammer' which may (or may not) be linked in the forums.";
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

					// Raids Tab
					var raid_list = document.getElementById('raid_list');
					raid_list.style.height = (h - raid_list.offsetTop -3) + "px";
					SRDotDX.gui.loadRaidList();

					//raidlist global click listener
					raid_list.addEventListener("mouseup",function(event) {
						SRDotDX.gui.FPXraidListMouseDown(event);
					},false);
					raid_list.addEventListener("click",function(e) {
						e.preventDefault();
						e.stopPropagation();
						return false;
					},false);
					
					//options tab
					var FPXoptsMarkRightClick = SRDotDX.gui.cHTML('#FPX_options_markVisitedRightClick');
					var FPXoptsMarkRightClickDelay = SRDotDX.gui.cHTML('#FPX_options_markVisitedRightClickDelay');
					var FPXoptsDeleteEarly = SRDotDX.gui.cHTML('#FPX_options_DeleteEarly');
					var FPXoptsDispLinkIcon = SRDotDX.gui.cHTML('#FPX_options_displayLinkImg');
					var optsFormatRaids = SRDotDX.gui.cHTML('#SRDotDX_options_formatRaids');
					var optsRaidFormat = SRDotDX.gui.cHTML('#SRDotDX_options_raidLinkFormat');
					var optsHideARaids = SRDotDX.gui.cHTML('#SRDotDX_options_hideRaidLinks');
					var optsHideSRaids = SRDotDX.gui.cHTML('#SRDotDX_options_hideSeenRaids');
					var optsHideVRaids = SRDotDX.gui.cHTML('#SRDotDX_options_hideVisitedRaids');
					if (SRDotDX.config.FPXmarkRightClick) {	FPXoptsMarkRightClick.ele().checked = 'checked'}
					if (SRDotDX.config.FPXdisplayListImgLink) {	FPXoptsDispLinkIcon.ele().checked = 'checked'}
					if (SRDotDX.config.formatRaidLinks) {	optsFormatRaids.ele().checked = 'checked'}
					else {optsRaidFormat.ele().disabled = 'disabled'}
					FPXoptsMarkRightClickDelay.ele().value = SRDotDX.config.FPXoptsMarkRightClickDelay;
					FPXoptsDeleteEarly.ele().value = SRDotDX.config.FPXoptsDeleteEarly;
					document.getElementById('FPX_options_markVisitedRightClickDelay').disabled = !SRDotDX.config.hideVisitedRaids && SRDotDX.config.FPXmarkRightClick;
					optsRaidFormat.ele().value = SRDotDX.config.raidLinkFormat;
					optsRaidFormat.ele().style.width = e[0].offsetWidth - 12 + "px";
					if (SRDotDX.config.hideSeenRaids) {optsHideSRaids.ele().checked = 'checked'}
					if (SRDotDX.config.hideVisitedRaids) {optsHideVRaids.ele().checked = 'checked'}
					if (SRDotDX.config.hideRaidLinks) {
						optsHideARaids.ele().checked = true;
						optsHideVRaids.ele().disabled = true;
						optsHideSRaids.ele().disabled = true;
					}
					
					FPXoptsMarkRightClick.ele().addEventListener("click",function() {
						SRDotDX.config.FPXmarkRightClick = this.checked;
					},false);
					FPXoptsDispLinkIcon.ele().addEventListener("click",function() {
						SRDotDX.config.FPXdisplayListImgLink = this.checked;
						console.log("[SRDotDX]::{FPX}::FPXdisplayListImgLink="+SRDotDX.config.FPXdisplayListImgLink);
					},true);
					FPXoptsMarkRightClickDelay.ele().addEventListener("blur",function() {
						if (/^\d+$/ig.test(this.value)) {
							SRDotDX.config.FPXoptsMarkRightClickDelay = this.value;
						}
						else {
							this.value = SRDotDX.config.FPXoptsMarkRightClickDelay;
						}
					});
					FPXoptsDeleteEarly.ele().addEventListener("blur",function() {
						if (/^\d+$/ig.test(this.value)) {
							SRDotDX.config.FPXoptsDeleteEarly = this.value;
						}
						else {
							this.value = SRDotDX.config.FPXoptsDeleteEarly;
						}
					});
					optsRaidFormat.ele().addEventListener("blur",function() {
						if (this.value != "") {
							SRDotDX.config.raidLinkFormat = this.value;
						}
						else {
							this.value = SRDotDX.config.raidLinkFormat;
						}
					});
					optsFormatRaids.ele().addEventListener("click",function() {
						document.getElementById('SRDotDX_options_raidLinkFormat').disabled = (this.checked == true?false:true);
						SRDotDX.config.formatRaidLinks = this.checked;
					},true);
					optsHideARaids.ele().addEventListener("click",function() {
						document.getElementById('SRDotDX_options_hideVisitedRaids').disabled = this.checked;
						document.getElementById('SRDotDX_options_hideSeenRaids').disabled = this.checked;
						SRDotDX.config.hideRaidLinks = this.checked;
						SRDotDX.gui.toggleCSS({id: "SRDotDX_raidClass", cls:".SRDotDX_raid{display: "+(this.checked == true?'none !important':'block')+"}"})
					},true);
					optsHideSRaids.ele().addEventListener("click",function() {
						SRDotDX.config.hideSeenRaids = this.checked;
						SRDotDX.gui.toggleCSS({id: "SRDotDX_seenRaidClass", cls:".SRDotDX_seenRaid{display: "+(this.checked == true?'none !important':'block')+"}"})
					},true);
					optsHideVRaids.ele().addEventListener("click",function() {
						SRDotDX.config.hideVisitedRaids = this.checked;
						//FPX::FPX_options_markVisitedRightClickDelay disable
						document.getElementById('FPX_options_markVisitedRightClickDelay').disabled = !SRDotDX.config.hideVisitedRaids && SRDotDX.config.FPXmarkRightClick;
						SRDotDX.gui.toggleCSS({id: "SRDotDX_visitedRaidClass", cls:".SRDotDX_visitedRaid{display: "+(this.checked == true?'none !important':'block')+"}"})
					},true);


					SRDotDX.gui.cHTML('li').set({
						class: 'spritegame'
					}).html("<a href=\"http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons\" onclick=\"SRDotDX.reload(); return false;\">Reload Game</a>").attach("after","get_kreds_link");
					console.log("[SRDotDX] Loading is complete.");
				}
				else {setTimeout(SRDotDX.gui.load,5)}
			},
			loadRaidList: function () {
				var i = document.getElementById("raid_list");
				var FPXshoIconLink=SRDotDX.config.FPXdisplayListImgLink;
				while (i.hasChildNodes() && i.childNodes.length > 0) {
					i.removeChild(i.firstChild);
				}
				for (var a in SRDotDX.config.raidList) {
					if (SRDotDX.config.raidList.hasOwnProperty(a)) {
						SRDotDX.gui.addRaid(a,FPXshoIconLink);
					}
				}
			},
			FPXraidLinkClickRaidList: function (ele,isRightClick) {
				if(!isRightClick){
					SRDotDX.loadRaid(ele.href);
				}
				else if(document.getElementById('FPX_options_markVisitedRightClick').checked){
					var hash=ele.parentNode.parentNode.getAttribute("raidhash");					
					SRDotDX.config.raidList[hash].visited = true;
					SRDotDX.gui.toggleRaid('visited',hash,true);				
					SRDotDX.gui.raidListItemUpdate(hash);
				}
			},
			FPXraidLinkClickChat: function (hash,link,isRightClick) {
				if(!isRightClick){
					SRDotDX.loadRaid(link);
				}
				else if(document.getElementById('FPX_options_markVisitedRightClick').checked){
					SRDotDX.config.raidList[hash].visited = true;
					SRDotDX.gui.toggleRaid('visited',hash,true);				
					SRDotDX.gui.raidListItemUpdate(hash);
				}
			},
			FPXraidListMouseDown: function (e) {
				e.preventDefault();
				
				var classtype=e.element().className;
				e = e || window.event;
				e.stopPropagation();
				console.log("[SRDotDX]::{FPX}:: Clicked on::"+classtype+"::"+e.which);
				if(e.which == 1){
					if(classtype == "raid_list_item_head"){
						var con = document.getElementById("raid_list").getElementsByClassName("active");
						if (con.length == 1) con[0].className = con[0].className.replace(/ active/gi,"");
						e.element().parentNode.className += " active";
						return false;
					}else if(classtype == "FPXtext"){
						var con = document.getElementById("raid_list").getElementsByClassName("active");
						if (con.length == 1) con[0].className = con[0].className.replace(/ active/gi,"");
						e.element().parentNode.parentNode.className += " active";
						return false;
					}else if(classtype == "FPXlink"){
						SRDotDX.gui.FPXraidLinkClickRaidList(e.element(), false); return false;
					}else if(classtype == "FPXDeleteLink"){
						SRDotDX.gui.deleteRaid(e.element(),e.element().parentNode.parentNode.parentNode.getAttribute("raidhash")); return false;
					}else if(classtype == "link"){
						SRDotDX.gui.FPXraidLinkClickRaidList(e.element(), false); return false;
					}else if(classtype == "FPXcbVisited"){
						console.log("[SRDotDX]::{FPX}:: Clicked on::"+classtype+"::"+e.which+"::"+e.element().parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("raidhash"));
						e.element().checked=(e.element().checked == true?false:true);
						SRDotDX.gui.raidListCBClicked(e.element(),'visited',e.element().parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("raidhash"));
					}else if(classtype == "FPXcbSeen"){
						//onclick="SRDotDX.gui.raidListCBClicked(this,\'seen\',\''+r.hash+'\')"'+(r.seen == true?' checked="checked"':'')+'
						console.log("[SRDotDX]::{FPX}:: Clicked on::"+classtype+"::"+e.which+"::"+e.element().parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("raidhash"));
						e.element().checked=(e.element().checked == true?false:true);
						SRDotDX.gui.raidListCBClicked(e.element(),'seen',e.element().parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("raidhash"));
					}
				}else if(e.which == 3){
					if(classtype == "FPXlink"){
						SRDotDX.gui.FPXraidLinkClickRaidList(e.element(), true); return false;
					}else if(classtype == "link"){
						SRDotDX.gui.FPXraidLinkClickRaidList(e.element(), true); return false;
					}
				}
			},
			FPXraidLinkMouseDown: function (e,param1,param2,isChat) {
				e = e || window.event;
				if(isChat){
					switch (e.which) {
						case 1: SRDotDX.gui.FPXraidLinkClickChat(param1,param2,false); break;
						case 3: 
								if(document.getElementById('SRDotDX_options_hideVisitedRaids').checked){
									(function(p1,p2) {return setTimeout(function() {SRDotDX.gui.FPXraidLinkClickChat(p1,p2,true);}, SRDotDX.config.FPXoptsMarkRightClickDelay)})(param1,param2);
								}else{
									SRDotDX.gui.FPXraidLinkClickChat(param1,param2,true); 
								}
								break;
					}
				}else
				{
					switch (e.which) {
						case 1: SRDotDX.gui.FPXraidLinkClickRaidList(param1,false); break;
						case 3: SRDotDX.gui.FPXraidLinkClickRaidList(param1,true); break; 
					}

				}

			},
			raidListCBClicked: function (ele,cb,hash) {
			console.log("[SRDotDX]::{FPX}:: Clicked on::"+ele.checked+"::"+cb+"::"+hash);
				if (SRDotDX.config.raidList[hash]) {
				console.log("[SRDotDX]::{FPX}:: Clicked on1::"+ele.checked+"::"+cb+"::"+hash);
					SRDotDX.config.raidList[hash][cb] = ele.checked;
					console.log("[SRDotDX]::{FPX}:: Clicked on2::"+ele+"::"+cb+"::"+hash);
					SRDotDX.gui.toggleRaid(cb,hash,true);
					console.log("[SRDotDX]::{FPX}:: Clicked on3::"+ele+"::"+cb+"::"+hash);
					if (cb =='visited') {
						console.log("[SRDotDX]::{FPX}:: Clicked on4::"+ele+"::"+cb+"::"+hash);
						ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("FPXtext")[1].innerHTML = (ele.checked?"visited":"");
						console.log("[SRDotDX]::{FPX}:: Clicked on5::"+ele+"::"+cb+"::"+ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("FPXtext")[1].innerHTML);
					}
				}
			},
			raidListItemUpdate: function (hash) {
				var raid = SRDotDX.config.raidList[hash];
				if (typeof raid == 'object') {
					var ele = document.getElementById("raid_list").firstChild;
					while (ele) {
						if (ele.getAttribute("raidHash") == hash) {
							ele.getElementsByClassName("FPXtext")[1].innerHTML = (raid.visited == true?'visited':'');
							ele.getElementsByTagName("input")[0].checked = (raid.seen == true?true:false);
							ele.getElementsByTagName("input")[1].checked = (raid.visited == true?true:false);
							break;
						}
						ele = ele.nextSibling;
					}
				}
				else {
					SRDotDX.gui.raidListItemRemoveByHash(hash);
				}
			},
			raidListItemRemoveByHash: function (hash) {
				var e, ele = document.getElementById("raid_list").firstChild;
				while (typeof ele != 'null') {
					if (ele.getAttribute("raidHash") == hash) {
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
				SRDotDX.gui.cHTML("style").set({type: "text/css", id: p.id}).text(p.cls).attach("to",document.head);
			},
			toggleRaid: function(type,hash,tog) {
				var d = document.getElementsByClassName("SRDotDX_hash_" + hash);
				if (typeof SRDotDX.config.raidList[hash] == 'object') {
					var raid = SRDotDX.config.raidList[hash];
					var raid = SRDotDX.getRaidDetails("&kv_difficulty="+raid.diff+"&kv_hash="+hash+"&kv_raid_boss="+raid.boss+"&kv_raid_id="+raid.id);
				}
				for (var i = d.length -1;i>-1;i--) {
					if (tog == true && d[i].className.indexOf("SRDotDX_"+type+"Raid") == -1) {
						d[i].className += " SRDotDX_"+type+"Raid";
					}
					else if (tog == false && d[i].className.indexOf("SRDotDX_"+type+"Raid") > -1) {
						d[i].className = d[i].className.replace(eval("/SRDotDX_"+type+"Raid( |$)/i"),"");
					}
					if (typeof raid == 'object') {
						d[i].getElementsByTagName("a")[0].innerHTML = raid.linkText();
					}
				}
			}
		},
		load: function (fails) {
			if (typeof holodeck == 'object' && typeof ChatDialogue == 'function' && typeof activateGame == 'function' && typeof document.getElementById('kong_game_ui') != 'null') {
				ChatDialogue.prototype.SRDotDX_echo = function(msg){
					this.SRDotDX_DUM("DotD Extention","<br>"+msg,{class: "whisper whisper_recieved"},{non_user: true})
				}
				ChatDialogue.prototype.SRDotDX_DUM = ChatDialogue.prototype.displayUnsanitizedMessage;
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
							isPublic = (/^room_\d+-dawn-of-the-dragons-\d+$/i.test(this._holodeck._chat_window._active_room._short_room_name) && e.class.indexOf("whisper") == -1?true:false)
						}
						catch(err){}

						var raid = SRDotDX.getRaidLink(d,b,isPublic)
						if (typeof raid == 'object') {
							e.class+= " SRDotDX_raid";
							e.class+= " SRDotDX_hash_"+raid.hash;
							e.class+= (raid.seen?" SRDotDX_visitedRaid":'');
							e.class+=(raid.visited?" SRDotDX_visitedRaid":'');							
							d = raid.ptext + '<a href="'+raid.url+'" onClick="return false;" onMouseDown="SRDotDX.gui.FPXraidLinkMouseDown(event,'+'\''+raid.hash+'\''+',this.href,true); return false">'+raid.linkText()+'</a>'+raid.ntext;
							var eles = document.getElementsByClassName("SRDotDX_hash_"+raid.hash);
							SRDotDX.gui.toggleRaid('visited',raid.hash,true);
							SRDotDX.config.raidList[raid.hash].seen = true;
							SRDotDX.gui.raidListItemUpdate(raid.hash);
						}
						this.SRDotDX_DUM(b,d,e,f);
					}
				}
				holodeck.addChatCommand("raidformat",function(deck,text){
					if (/^\/raidformat$/i.test(text)) {
						var i = SRDotDX.config.raidLinkFormat.replace(/</g,"&lt;").replace(/>/g,"&gt;")
						SRDotDX.echo("Raid Link formatting is: <b>" + (SRDotDX.config.formatRaidLinks?"on":"off")+"</b><br>Current Format:<br>"+i);
					}
					else if (/^\/raidformat on$/i.test(text)) {
						if (SRDotDX.config.formatRaidLinks == false) {
							SRDotDX.config.formatRaidLinks = true;
							SRDotDX.echo("Raid link formatting is now enabled");
						}
						else {
							SRDotDX.echo("Raid link formatting is already enabled")
						}
					}
					else if (/^\/raidformat off$/i.test(text)) {
						if (SRDotDX.config.formatRaidLinks == true) {
							SRDotDX.config.formatRaidLinks = false;
							SRDotDX.echo("Raid link formatting is now disabled");
						}
						else {
							SRDotDX.echo("Raid link formatting is already disabled")
						}
					}
					else if (/^\/raidformat help$/i.test(text)) {
						SRDotDX.gui.help("raidformat")
					}
					else if (SRDotDX.config.formatRaidLinks == false) {
						SRDotDX.echo('<b>/raidformat</b>: You must enable raid link formatting before you can set the format. (<a href="#" onclick="SRDotDX.gui.help(\'raidformat\'); return false">help</a>)')
					}
					else if (i = /^\/raidformat (\S.*)$/i.exec(text)) {
						SRDotDX.config.raidLinkFormat = i[1];
						SRDotDX.gui.cHTML('#SRDotDX_options_raidLinkFormat').ele().value = i[1];
						SRDotDX.echo("Raid format now set to:<br>"+i[1].replace(/</g,"&lt;").replace(/>/g,"&gt;"));
					}
					else {
						SRDotDX.echo('<b>/raidformat</b>: Invalid parameters specified. (<a href="#" onclick="SRDotDX.gui.help(\'raidformat\'); return false">help</a>)')
					}
					return false;
				});
				holodeck.addChatCommand("lr",function(deck,text){
					var u;
					if (u = /^\/lr (\S+)$/i.exec(text)) {SRDotDX.loadRaid(u[1]);}
					else {SRDotDX.echo('<b>/loadraid</b>: Invalid raid specified. (<a href="#" onclick="SRDotDX.gui.help(\'loadraid\'); return false">help</a>)');}
					return false;
				});
				holodeck.addChatCommand("loadraid",function(deck,text){
					var u;
					if (u = /^\/loadraid (\S+)$/i.exec(text)) {SRDotDX.loadRaid(u[1]);}
					else {SRDotDX.echo('<b>/loadraid</b>: Invalid raid specified. (<a href="#" onclick="SRDotDX.gui.help(\'loadraid\'); return false">help</a>)');}
					return false;
				});
				holodeck.addChatCommand("reload",function(deck,text){
					if (/^\/reload$/i.test(text)) {
						SRDotDX.reload();
					}
					else {
						SRDotDX.echo('<b>/reload</b>: Invalid parameters specified. (<a href="#" onclick="SRDotDX.gui.help(\'reload\'); return false">help</a>)');
					}
					return false
				});
				holodeck.addChatCommand("toggle",function (deck,text){
					var i;
					if (/^\/toggle$/i.test(text)) {
						var msg = "<b>Current Displays:</b><br>"
						msg += "Visited Raids: "+(!SRDotDX.config.hideVisitedRaids?'Shown':'hidden')+"<br>";
						msg += "Seen Raids: "+(!SRDotDX.config.hideSeenRaids?'Shown':'Hidden')+"<br>";
						SRDotDX.echo(msg);
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
							SRDotDX.echo(h+" raids are currently: "+(SRDotDX.config[(p1 == "visited"?"hideVisitedRaids":"hideSeenRaids")] == true?"Hidden":"Shown"));
						}
						else {
							var eleId = "SRDotDX_" + p1 + "RaidClass";
							var state = document.getElementById(eleId).innerText.indexOf("none") > -1?"h":"s";
							var setTo = p2==" hide"?"h":"s";
							if (state == setTo) {
								SRDotDX.echo(h+" raids are already "+(state=="s"?"Shown":"Hidden"));
							}
							else {
								var cls = '.SRDotDX_'+p1+'Raid{display: '+(setTo=="s"?"block}":"none !important}");
								SRDotDX.gui.toggleCSS({id: eleId, cls: cls});
								SRDotDX.echo(h+" raids are now set to be "+(setTo=="s"?"Shown":"Hidden"));
							}

						}
					}
					else {
						SRDotDX.echo('Invalid parameters specified. (<a href="#" onclick="SRDotDX.gui.help(\'toggleraidview\'); return false">help</a>)');
					}
					return false;
				});
				holodeck.addChatCommand("clear",function(deck,text){
					holodeck.activeDialogue().clear();
					return false
				});
				holodeck.addChatCommand("raid", function(deck,text){
					var p;
					if (p = /^\/raid (.*?)(?: ([1-6]))?$/i.exec(text)) {
						var msg = "";
						var start = (!isNaN(p[2]))?p[2]-1:0;
						var find = p[1].toLowerCase();
						for (var i in SRDotDX.raids) {
							if (SRDotDX.raids.hasOwnProperty(i)) {
								var raid = SRDotDX.raids[i];
								if (raid.name.toLowerCase().indexOf(find) > -1) {
									if (msg != "") msg += "<br>"
									msg += "<b>"+raid.name+"</b><br>";
									msg += "Size: "+raid.size+"<br>";
									msg += "Stats: "+SRDotDX.getStatText(raid.stat)+"<br>";
									msg += "Duration: "+raid.duration + "hrs<br>";
									if (raid.health[0] == 'Unlimited') {
										msg += "---<br>Health: Unlimited<br>FairShare: 1B<br>Optimal Share: 1B<br>";
									}
									else {
										var end = (isNaN(p[2])?(raid.id == 'echthros'?6:4):p[2]);
										
										for (var n = start;n<end;n++) {
											var h = raid.health[n];
											var fs = h / raid.size;
											var os = fs*{"1": 1, "10": 1.25,"50":2.2, "100": 2.3, "250": 1, "500": 1.5}[raid.size + ""];
											msg += "---<br>";
											msg += "Difficulty: "+["Normal","Hard","Legendary","Nightmare","Insane","Hell"][n]+"<br>";
											msg += "Health: "+SRDotDX.getShortNum(h)+"<br>";
											msg += "Fair Share: "+SRDotDX.getShortNum(fs)+"<br>";
											msg += "Optimal Share: "+SRDotDX.getShortNum(os)+"<br>";
											msg += "Duration: "+raid.duration+"<br>";
										}
									}
								}
							}
						}
						if (msg != "") {
							SRDotDX.echo(msg);
						}
						else {
							SRDotDX.echo('No raids found matching: '+p[1]);
						}
					}
					else {
						SRDotDX.echo('<b>/raid</b>: Invalid parameters specified (<a href="#" onclick="SRDotDX.gui.help(\'raid\')">help</a>)');
					}
					return false;
				});
				holodeck.addChatCommand("version", function(deck,text) {
					var d = "<b>Version</b>: "+SRDotDX.version.major+"("+SRDotDX.version.minor+")<br>";
					d += "<b>Major Version</b>: "+SRDotDX.version.major+"<br>"
					d += "<b>Minor Version</b>: "+SRDotDX.version.minor+"<br>"
					d += '<a href="http://userscripts.org/scripts/show/135595" target="_blank">Go to script page</a>';
					SRDotDX.echo(d);
					return false;
				});
				holodeck.addChatCommand("update", function(deck,text) {
					window.open("http://userscripts.org/scripts/source/135595.user.js");
					SRDotDX.echo("After installation, you will need to refresh this page");
					return false;
				});
				var i;
				if (typeof (i = SRDotDX.getRaidDetails(document.location.href)) == 'object'){
					if (SRDotDX.config.getRaid(i.hash)) {
						SRDotDX.config.raidList[i.hash].visited = true;
						SRDotDX.config.raidList[i.hash].seen = true;
					}
					else {
						SRDotDX.config.addRaid(i.hash,i.id,i.boss,i.diff,true,true,false,'')
					}
				}
				window.onbeforeunload = function(){
					SRDotDX.config.save();
				}

				SRDotDX.config.save();
				SRDotDX.config.raidTimeout();
				SRDotDX.gui.load();
				setTimeout(function(){delete SRDotDX.load},1);
				console.log("[SRDotDX] Core loaded; Loading user interface...");
			}

			else if (fails < 10) {
				console.log("[SRDotDX] Missing needed Kongregate resourses, retrying in 5 seconds....");
				setTimeout(SRDotDX.load,5000,fails+1)
			}
			else {
				console.log("[SRDotDX] Unable to locate required Kongregate resources. Loading aborted");
				setTimeout(function(){delete SRDotDX;},1);
			}
		},
		loadRaid: function (url) {
			var r;
			if (typeof (r=SRDotDX.getRaidDetails(url)) == 'object') {
				var reg = new RegExp(/var iframe_options = ([^\x3B]+)/g);
				var match = reg.exec(activateGame); 
				var iframe_options = eval('('+match[1]+')');
				iframe_options['kv_action_type'] = 'raidhelp';
				iframe_options['kv_difficulty'] = r.diff;
				iframe_options['kv_hash'] = r.hash;
				iframe_options['kv_raid_boss'] = r.boss;
				iframe_options['kv_raid_id'] = r.id;
				$('gameiframe').replace(new Element('iframe', {"id":"gameiframe","name":"gameiframe","style":"border:none;position:relative;z-index:1;","scrolling":"auto","border":0,"frameborder":0,"width":760,"height":700,"class":"dont_hide"}));
				$('gameiframe').contentWindow.location.replace("http://web1.dawnofthedragons.com/kong?" + Object.toQueryString(iframe_options));
				SRDotDX.config.raidList[r.hash].visited = true;
				SRDotDX.gui.toggleRaid("visited",r.hash,true);
				SRDotDX.gui.raidListItemUpdate(r.hash);
			}
		},
		raids: {
			misako:{name: 'Misako', shortname: 'Misako',  id: 'misako', stat: 'S', size:1, duration:48, health: [100000,125000,160000,200000,,], picture: 'http://images.wikia.com/dotd/images/2/2a/Misako.jpg'},
			mestr:{name: 'Mestr Rekkr', shortname: 'Mestr',  id: 'mestr', stat: 'S', size:1, duration:48, health: [150000,187500,240000,300000,,], picture:'http://images2.wikia.nocookie.net/__cb20110427232932/dotd/images/thumb/d/d7/Mestr_Rekkr.jpg/500px-Mestr_Rekkr.jpg'},
			magma_horror:{name: 'Magma Horror', shortname: 'Magma',  id: 'magma_horror', stat: 'S', size:1, duration:24, health: [200000,250000,320000,400000,,], picture:'http://images2.wikia.nocookie.net/__cb20110401232509/dotd/images/thumb/d/d6/Magma_Horror.jpg/500px-Magma_Horror.jpg'},
			kobold:{name: 'Chieftain Horgrak', shortname: 'Horgrak',  id: 'kobold', stat: 'S', size:10, duration:168, health: [150000,187500,240000,300000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/koboldchieftain500x383_SQb_thumb.png'},
			rhino:{name: 'Ataxes', shortname: 'Ataxes',  id: 'rhino', stat: 'S', size:10, duration:120, health: [2000000,2500000,3200000,4000000,,], picture:'http://images1.wikia.nocookie.net/__cb20100908092043/dotd/images/a/ad/Ataxes.png'},
			'4ogre':{name: 'Briareus the Butcher', shortname: 'Briareus',  id: '4ogre', stat: 'S', size:10, duration:72, health: [4500000,5625000,7200000,9000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/4armedogre500x383_kes_thumb.png'},
			bmane:{name: 'Bloodmane', shortname: 'Bmane',  id: 'bmane', stat: 'S', size:10, duration:72, health: [7000000,8750000,11200000,14000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/bloodmane_mIt_thumb.jpg'},
			ironclad:{name: 'Ironclad', shortname: 'Ironclad',  id: 'ironclad', stat: 'S', size:10, duration:48, health: [10000000,12500000,16000000,20000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/ironclad_0LC_thumb.jpg'},
			gunnar:{name: 'Gunnar the Berserk', shortname: 'Gunnar',  id: 'gunnar', stat: 'S', size:10, duration:48, health: [12000000,15000000,19200000,24000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/boss1_4eT_thumb.jpg'},
			maraak:{name: 'Maraak the Impaler', shortname: 'Maraak',  id: 'maraak', stat: 'S', size:10, duration:48, health: [15000000,18750000,24000000,30000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/orocwarlord_00r_thumb.jpg'},
			hargamesh:{name: 'Hargamesh', shortname: 'Hargamesh',  id: 'hargamesh', stat: 'S', size:10, duration:48, health: [18000000,22500000,28800000,36000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/mega_mazalu2_47y_thumb.jpg'},
			harpy:{name: 'Celeano', shortname: 'Cel',  id: 'harpy', stat: 'H', size:10, duration:120, health: [3000000,3750000,4800000,6000000,,], picture:'http://images4.wikia.nocookie.net/__cb20100908102838/dotd/images/thumb/b/b2/Celeano.jpg/500px-Celeano.jpg'},
			evilgnome:{name: 'Groblar Deathcap', shortname: 'Groblar',  id: 'evilgnome', stat: 'H', size:10, duration:120, health: [6000000,7500000,9600000,12000000,,], picture:'http://images3.wikia.nocookie.net/__cb20100908102931/dotd/images/thumb/7/78/Groblar.jpg/500px-Groblar.jpg'},
			gladiators:{name: 'Batiatus’ Gladiators ', shortname: 'Batiatus’ Gladiators ',  id: 'gladiators', stat: 'H', size:10, duration:120, health: [12000000,15000000,19200000,24000000,,], picture:'http://images1.wikia.nocookie.net/__cb20101031120229/dotd/images/0/04/Batiatus%27_Gladiators.jpg'},
			gorgon:{name: 'Tithrasia', shortname: 'Tithrasia',  id: 'gorgon', stat: 'H', size:10, duration:120, health: [18000000,22500000,28800000,36000000,,], picture:'http://images3.wikia.nocookie.net/__cb20110225175526/dotd/images/thumb/6/68/Tithrasia.jpg/500px-Tithrasia.jpg'},
			slaughterers:{name: 'Slaughterers Six', shortname: 'Slaughterers',  id: 'slaughterers', stat: 'H', size:10, duration:120, health: [24000000,30000000,38400000,48000000,,], picture:'http://images4.wikia.nocookie.net/__cb20110531171542/dotd/images/thumb/a/ac/Slaughterers_Six.jpg/500px-Slaughterers_Six.jpg'},
			fairy_prince:{name: 'Prince Obyron', shortname: 'Obyron',  id: 'fairy_prince', stat: 'H', size:10, duration:120, health: [60000000,75000000,96000000,120000000,,], picture:'http://images4.wikia.nocookie.net/__cb20110823062436/dotd/images/thumb/f/f0/Prince_Obyron.jpg/500px-Prince_Obyron.jpg'},
			scorp:{name: 'Mazalu', shortname: 'Mazalu',  id: 'scorp', stat: 'S', size:50, duration:168, health: [5000000,6250000,8000000,10000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/scorpionman500x383_nF1_thumb.png'},
			alice:{name: 'Bloody Alice', shortname: 'Alice',  id: 'alice', stat: 'S', size:50, duration:120, health: [15000000,18750000,24000000,30000000,,], picture:'http://images2.wikia.nocookie.net/__cb20100908093814/dotd/images/8/88/Bloody_Alice.png'},
			squid:{name: 'Scylla', shortname: 'Scylla',  id: 'squid', stat: 'S', size:50, duration:72, health: [25000000,31250000,40000000,50000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/squidlady500x383_Qp1_thumb.png'},
			'3dawg':{name: 'Kerberos', shortname: 'Kerb',  id: '3dawg', stat: 'S', size:50, duration:72, health: [35000000,43750000,56000000,70000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/kerberos_TjR_thumb.jpg'},
			zombiehorde:{name: 'Zombie Horde', shortname: 'Zombies',  id: 'zombiehorde', stat: 'S', size:50, duration:60, health: [45000000,56250000,72000000,90000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/zombies_2q7_thumb.jpg'},
			nidhogg:{name: 'Nidhogg', shortname: 'Nidhogg',  id: 'nidhogg', stat: 'S', size:50, duration:60, health: [52000000,65000000,83200000,104000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/nidhogg_Ptv_thumb.jpg'},
			erakka_sak:{name: 'Erakka-Sak', shortname: 'Erakka',  id: 'erakka_sak', stat: 'S', size:50, duration:60, health: [62000000,77500000,99200000,124000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/orocgolem_0Tl_thumb.jpg'},
			grimsly:{name: 'Headmaster Grimsly', shortname: 'Grimsly',  id: 'grimsly', stat: 'S', size:50, duration:60, health: [72000000,90000000,115200000,144000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/lucianareaboss1_Ug1_thumb.jpg'},
			spider:{name: 'Arachna', shortname: 'Arachna',  id: 'spider', stat: 'H', size:50, duration:144, health: [22000000,27500000,35200000,44000000,,], picture:'http://images1.wikia.nocookie.net/__cb20100908102816/dotd/images/thumb/4/4d/Arachna.jpg/500px-Arachna.jpg'},
			basilisk:{name: 'Deathglare', shortname: 'Deathglare',  id: 'basilisk', stat: 'H', size:50, duration:144, health: [45000000,56250000,72000000,90000000,,], picture:'http://images2.wikia.nocookie.net/__cb20100908102905/dotd/images/thumb/6/60/Deathglare.jpg/500px-Deathglare.jpg'},
			chimera:{name: 'Tetrarchos', shortname: 'Tetrarchos',  id: 'chimera', stat: 'H', size:50, duration:144, health: [90000000,112500000,144000000,180000000,,], picture:'http://images1.wikia.nocookie.net/__cb20101031120230/dotd/images/0/0f/Tetrarchos.jpg'},
			werewolfpack:{name: 'Black Moon', shortname: 'Black Moon',  id: 'werewolfpack', stat: 'H', size:50, duration:144, health: [135000000,168750000,216000000,270000000,,], picture:'http://images4.wikia.nocookie.net/__cb20110225175516/dotd/images/thumb/b/bd/The_Black_Moon_Pack.jpg/500px-The_Black_Moon_Pack.jpg'},
			lunacy:{name: 'Lunatics', shortname: 'Lunatics',  id: 'lunacy', stat: 'H', size:50, duration:144, health: [180000000,225000000,288000000,360000000,,], picture:'http://images1.wikia.nocookie.net/__cb20110531221353/dotd/images/thumb/9/9e/Lunatics.jpg/500px-Lunatics.jpg'},
			war_boar:{name: 'Hammer', shortname: 'Hammer',  id: 'war_boar', stat: 'H', size:50, duration:144, health: [220000000,275000000,352000000,440000000,,], picture:'http://images4.wikia.nocookie.net/__cb20110823062525/dotd/images/thumb/f/fa/Hammer.jpg/500px-Hammer.jpg'},
			ogre:{name: 'General Grune', shortname: 'Grune',  id: 'ogre', stat: 'S', size:100, duration:172, health: [20000000,25000000,32000000,40000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/ogre500x383_2io_thumb_5Wl_thumb.png'},
			lurker:{name: 'Lurking Horror', shortname: 'Lurking',  id: 'lurker', stat: 'S', size:100, duration:120, health: [35000000,43750000,56000000,70000000,,], picture:'http://images2.wikia.nocookie.net/__cb20100908094040/dotd/images/e/e6/Lurking_Horror.jpg'},
			batman:{name: 'Gravlok the Night-Hunter', shortname: 'Grav',  id: 'batman', stat: 'S', size:100, duration:72, health: [50000000,62500000,80000000,100000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/batman500x383_wch_thumb.png'},
			hydra:{name: 'Hydra', shortname: 'Hydra',  id: 'hydra', stat: 'S', size:100, duration:72, health: [65000000,81250000,104000000,130000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/hydra_m6V_thumb.jpg'},
			stein:{name: 'Stein', shortname: 'Stein',  id: 'stein', stat: 'S', size:100, duration:72, health: [80000000,100000000,128000000,160000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/stein_057_thumb.jpg'},
			kang:{name: 'Kang-Gsod', shortname: 'Kang',  id: 'kang', stat: 'S', size:100, duration:72, health: [95000000,118750000,152000000,190000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/kanggsod_yOS_thumb.jpg'},
			wexxa:{name: 'Wexxa the Worm-Tamer', shortname: 'Wexxa',  id: 'wexxa', stat: 'S', size:100, duration:72, health: [110000000,137500000,176000000,220000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/rockworm_yH4_thumb.jpg'},
			rift:{name: 'Rift the Mauler', shortname: 'Rift',  id: 'rift', stat: 'S', size:100, duration:72, health: [125000000,156250000,200000000,250000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/noirbossrough_aaY_thumb.jpg'},
			djinn:{name: 'Al-Azab', shortname: 'Al-Azab',  id: 'djinn', stat: 'H', size:100, duration:168, health: [55000000,68750000,88000000,110000000,,], picture:'http://images2.wikia.nocookie.net/__cb20100908102750/dotd/images/thumb/1/1c/Al-Azab.jpg/500px-Al-Azab.jpg'},
			roc:{name: 'Ragetalon', shortname: 'Ragetalon',  id: 'roc', stat: 'H', size:100, duration:168, health: [110000000,137500000,176000000,220000000,,], picture:'http://images3.wikia.nocookie.net/__cb20100908102953/dotd/images/thumb/e/e1/Ragetalon.jpg/500px-Ragetalon.jpg'},
			crabshark:{name: 'Scuttlegore', shortname: 'Scuttle',  id: 'crabshark', stat: 'H', size:100, duration:168, health: [220000000,275000000,352000000,440000000,,], picture:'http://images3.wikia.nocookie.net/__cb20101031120230/dotd/images/c/c6/Scuttlegore.jpg'},
			blobmonster:{name: 'Varlachleth', shortname: 'Varla',  id: 'blobmonster', stat: 'H', size:100, duration:168, health: [330000000,412500000,528000000,660000000,,], picture:'http://images3.wikia.nocookie.net/__cb20110225175721/dotd/images/thumb/6/6c/Varlachleth.jpg/500px-Varlachleth.jpg'},
			felendis:{name: 'Felendis and Shaoquin', shortname: 'Felendis',  id: 'felendis', stat: 'H', size:100, duration:168, health: [441823718,549238221,707842125,888007007,,], picture:'http://images4.wikia.nocookie.net/__cb20110531210143/dotd/images/thumb/4/42/Felendis_%26_Shaoquin.jpg/500px-Felendis_%26_Shaoquin.jpg'},
			dirthax:{name: 'Dirthax', shortname: 'Dirthax',  id: 'dirthax', stat: 'H', size:100, duration:168, health: [550000000,687500000,880000000,1100000000,,], picture:'http://images2.wikia.nocookie.net/__cb20110823062535/dotd/images/thumb/0/0c/Dirthax.jpg/500px-Dirthax.jpg'},
			giantgolem:{name: 'Euphronios', shortname: 'Euphronios',  id: 'giantgolem', stat: 'H', size:100, duration:168, health: [450000000,562500000,720000000,900000000,,], picture:'http://images1.wikia.nocookie.net/__cb20110225175108/dotd/images/thumb/6/63/Euphronios.jpg/500px-Euphronios.jpg'},
			agony:{name: 'Agony', shortname: 'Agony',  id: 'agony', stat: 'H', size:100, duration:168, health: [700000000,875000000,1120000000,1400000000,,], picture:'http://images1.wikia.nocookie.net/__cb20110531220418/dotd/images/thumb/f/f8/Agony.jpg/500px-Agony.jpg'},
			dreadbloom:{name: 'Giant Dreadbloom', shortname: 'Dreadbloom',  id: 'dreadbloom', stat: 'H', size:100, duration:192, health: [900000000,1125000000,1440000000,1800000000,,], picture:'http://images4.wikia.nocookie.net/__cb20110823062660/dotd/images/thumb/8/84/Giant_Dreadbloom.jpg/500px-Giant_Dreadbloom.jpg'},
			rhalmarius_the_despoiler:{name: 'Rhalmarius the Despoiler', shortname: 'Rhal',  id: 'rhalmarius_the_despoiler', stat: 'H', size:100, duration:84, health: [500000000,1250000000,3125000000,7812500000,,], picture:'http://images4.wikia.nocookie.net/__cb20120218034941/dotd/images/thumb/9/90/Rhalmarius_the_Despoiler.jpg/500px-Rhalmarius_the_Despoiler.jpg'},
			drag:{name: 'Erebus the Black', shortname: 'Erebus',  id: 'drag', stat: 'S', size:250, duration:168, health: [150000000,187500000,240000000,300000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/dragon500x383_r0l_thumb.png'},
			tainted:{name: 'Tainted Erebus', shortname: 'Tainted',  id: 'tainted', stat: 'S', size:250, duration:168, health: [250000000,312500000,400000000,500000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/taintederebus_0FQ_thumb.jpg'},
			sircai:{name: 'Sir Cai', shortname: 'SirCai',  id: 'sircai', stat: 'S', size:250, duration:168, health: [350000000,437500000,560000000,700000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/sircai_4MR_thumb.jpg'},
			bogstench:{name: 'Bogstench', shortname: 'Bogstench',  id: 'bogstench', stat: 'S', size:250, duration:96, health: [450000000,562500000,720000000,900000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/bogstench_G7o_thumb.jpg'},
			ulfrik:{name: 'Ulfrik', shortname: 'Ulfrik',  id: 'ulfrik', stat: 'S', size:250, duration:96, health: [500000000,625000000,800000000,1000000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/ulfrik2_g22_thumb.jpg'},
			guilbert:{name: 'Guilbert the Mad', shortname: 'Guilbert',  id: 'guilbert', stat: 'S', size:250, duration:96, health: [550000000,687500000,880000000,1100000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/madmage_1e6_thumb.jpg'},
			sisters:{name: 'Sisters of the Song', shortname: 'Sisters',  id: 'sisters', stat: 'S', size:250, duration:96, health: [600000000,750000000,960000000,1200000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/muse_bosses03_damaged03_wvL_thumb.jpg'},
			mesyra:{name: 'Mesyra the Watcher', shortname: 'Mesyra',  id: 'mesyra', stat: 'S', size:250, duration:96, health: [1000000000,1250000000,1600000000,2000000000,,], picture:'http://images2.wikia.nocookie.net/__cb20111122233426/dotd/images/thumb/3/3e/Mesyra_the_Watcher.jpg/500px-Mesyra_the_Watcher.jpg'},
			nimrod:{name: 'Nimrod the Hunter', shortname: 'Nimrod',  id: 'nimrod', stat: 'S', size:250, duration:96, health: [1200000000,1500000000,1920000000,2400000000,,], picture:'http://images3.wikia.nocookie.net/__cb20111122233419/dotd/images/thumb/e/e5/Nimrod_the_Hunter.jpg/500px-Nimrod_the_Hunter.jpg'},
			phaedra:{name: 'Phaedra the Deceiver', shortname: 'Phaedra',  id: 'phaedra', stat: 'S', size:250, duration:96, health: [1400000000,1750000000,2240000000,2800000000,,], picture:'http://images2.wikia.nocookie.net/__cb20111122233410/dotd/images/thumb/8/8e/Phaedra_the_Deceiver.jpg/500px-Phaedra_the_Deceiver.jpg'},
			tyranthius:{name: 'Lord Tyranthius', shortname: 'Tyr',  id: 'tyranthius', stat: 'S', size:500, duration:168, health: [600000000,750000000,960000000,1200000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/lordtyranthius_CYE_thumb.jpg'},
			nalagarst:{name: 'Nalagarst', shortname: 'Nalagarst',  id: 'nalagarst', stat: 'S', size:500, duration:98, health: [700000000,875000000,1120000000,1400000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/nalagarst_x5B_thumb.jpg'},
			kalaxia:{name: 'Kalaxia The Far-Seer', shortname: 'Kalaxia',  id: 'kalaxia', stat: 'S', size:500, duration:96, health: [800000000,1000000000,1280000000,1600000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/kalaxia_Vr3_thumb.jpg'},
			bellarius:{name: 'Bellarius the Guardian', shortname: 'Bellarius',  id: 'bellarius', stat: 'S', size:500, duration:96, health: [900000000,1125000000,1440000000,1800000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/reddragon_RF2_thumb.jpg'},
			mardachus:{name: 'Mardachus the Destroyer', shortname: 'Mardachus',  id: 'mardachus', stat: 'S', size:500, duration:96, health: [1100000000,1375000000,1760000000,2200000000,,], picture:'http://www.dawnofthedragons.com/forums/downloads/dragon_boss08_fh3_thumb.jpg'},
			tenebra:{name: 'Tenebra the Shadow-Mistress', shortname: 'Tenebra',  id: 'tenebra', stat: 'S', size:500, duration:128, health: [2000000000,2500000000,3200000000,4000000000,,], picture:'http://images1.wikia.nocookie.net/__cb20111122233747/dotd/images/thumb/4/4f/Tenebra_the_Shadow-Mistress.jpg/500px-Tenebra_the_Shadow-Mistress.jpg'},
			valanazes:{name: 'Valanazes the Gold', shortname: 'Valanazes',  id: 'valanazes', stat: 'S', size:500, duration:128, health: [2400000000,3000000000,3840000000,4800000000,,], picture:'http://images3.wikia.nocookie.net/__cb20111122233403/dotd/images/thumb/8/8f/Valanazes_the_Gold.jpg/500px-Valanazes_the_Gold.jpg'},
			dragons_lair:{name: 'Dragons Lair', shortname: 'Lair',  id: 'dragons_lair', stat: 'S', size:10, duration:5, health: [100000000,500000000,1000000000,1500000000,,], picture:'http://images3.wikia.nocookie.net/__cb20120209180913/dotd/images/thumb/5/54/Dragon%27s_Lair.jpg/500px-Dragon%27s_Lair.jpg'},
			kessovtowers:{name: 'Kessov Towers', shortname: 'Towers',  id: 'kessovtowers', stat: 'ESH', size:90000, duration:120, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited'], picture:'http://images3.wikia.nocookie.net/__cb20110923212516/dotd/images/thumb/6/66/Kessov_Tower.jpg/500px-Kessov_Tower.jpg'},
			kessovforts:{name: 'Kessov Forts', shortname: 'Forts',  id: 'kessovforts', stat: 'ESH', size:90000, duration:120, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited'], picture:'http://images4.wikia.nocookie.net/__cb20111001071840/dotd/images/thumb/f/f5/Kessov_Fort.jpg/500px-Kessov_Fort.jpg'},
			kessovcastle:{name: 'Kessov Castle', shortname: 'Castle',  id: 'kessovcastle', stat: 'ESH', size:90000, duration:144, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited'], picture:'http://images1.wikia.nocookie.net/__cb20111013162820/dotd/images/thumb/7/73/Kessov_Castle.jpg/500px-Kessov_Castle.jpg'},
			echthros:{name: 'Echthros', shortname: 'Echthros',  id: 'echthros', stat: 'S', size:2000, duration:48, health: [150000000000,,,250000000000,500000000000,10000000000000], picture:'http://images3.wikia.nocookie.net/__cb20110810232208/dotd/images/thumb/4/42/Echthros.jpg/500px-Echthros.jpg'},
			tisiphone:{name: 'Tisiphone The Vengeful', shortname: 'Tisiphone',  id: 'tisiphone', stat: 'E', size:50, duration:48, health: [500000000,2500000000,5000000000,7500000000,,], picture:'http://images4.wikia.nocookie.net/__cb20110614171907/dotd/images/thumb/1/11/Tisiphone_the_Vengeful.jpg/500px-Tisiphone_the_Vengeful.jpg'},
			Cerebus:{name: 'Corrupted Erebus', shortname: 'Corrupted',  id: 'corrupterebus', stat: 'ESH', size:90000, duration:72, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited'], picture:'http://images1.wikia.nocookie.net/__cb20120511194610/dotd/images/thumb/d/db/Corrupted_Erebus_1.png/500px-Corrupted_Erebus_1.png'},
            serpina:{name: 'Countess Serpina', shortname: 'Countess',  id: 'serpina', stat: 'E', size:10, duration:5, health: [75000000,112500000,150000000,187500000,,], picture:''}
		},
		reload: function () {
			SRDotDX.echo("Reloading, please wait...");
			var reg = new RegExp(/var iframe_options = ([^\x3B]+)/g);
			var match = reg.exec(activateGame); 
			var iframe_options = eval('('+match[1]+')');
			$('gameiframe').replace(new Element('iframe', {"id":"gameiframe","name":"gameiframe","style":"border:none;position:relative;z-index:1;","scrolling":"auto","border":0,"frameborder":0,"width":760,"height":700,"class":"dont_hide"}));
			$('gameiframe').contentWindow.location.replace("http://web1.dawnofthedragons.com/kong?" + Object.toQueryString(iframe_options));
		}
	}
	console.log("[SRDotDX] Initialized. Checking for needed Kongregate resources...");
	SRDotDX.load(0);
}
if (/^http:\/\/www\.kongregate\.com\/games\/5thplanetgames\/dawn-of-the-dragons(?:\/?$|\?|#)/i.test(document.location.href)) {
	console.log("[SRDotDX] Initializing....");
	var script = document.createElement("script");
	script.appendChild(document.createTextNode('('+main+')()'));
	(document.head || document.body || document.documentElement).appendChild(script);
}