// ==UserScript==
// @name           DotD Raid Catcher
// @namespace      tag://kongregate
// @description    DotD raid assistance.
// @author         JHunz, wpatter6
// @version        2.5.9
// @date           01.17.2014
// @grant          GM_xmlhttpRequest
// @include		   *armorgames.com/dawn-of-the-dragons-game*
// @include        http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
// @include        *newgrounds.com/portal/view/609826*
// @include        *web*.dawnofthedragons.com/*
// @homepage       http://dotd.azurewebsites.net/ScriptPage.aspx
// ==/UserScript==

function shared(sv) {
	console.log("[RaidCatcher] Shared script adding...");
	if (typeof GM_setValue == 'undefined' || typeof GM_getValue == 'undefined' || typeof GM_deleteValue == 'undefined') {//gm storage functions
		GM_setValue = function (name,value) { localStorage.setItem(name, value); }
		GM_getValue = function (name,dvalue) {
			var value = localStorage.getItem(name);
			if (typeof value != 'string') {
				return dvalue;
			}
			else {
				var type = value.substring(0,1);
				if(type != '{') value = value.substring(1);
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
		GM_deleteValue = function (name)  { localStorage.removeItem(name); }
	}
	var session = {};
	window.RaidCatcher = {
		version: {
			major: '2.5.9', 
			minor: 'wpatter6/JHunz',
			scriptid:157708,
			updateCheck: function () {
				if ((RaidCatcher.settings.lastUpdateCheck||0) < (new Date().getTime() - 14400000)) {
					RaidCatcher.request.req({
						eventName: "rc.chkupd",
						url: 'http://userscripts.org/scripts/review/'+RaidCatcher.version.scriptid,
						method: "GET",
						timeout: 30000
					});
					RaidCatcher.settings.lastUpdateCheck = new Date().getTime();
				}
			},
			needsUpdate:false,
			updateCheckResponse: function(e){
				if(e && e.data && e.data.responseText){
					console.log("[RaidCatcher] Update Check Response");
					var re = /\/\/\s+@version\s+(\d+\.\d+\.\d+)/i;

					if (re.test(e.data.responseText)) {
						// version tag found
						var versionString = e.data.responseText.match(re)[1];
						var re = /(\d+)\.(\d+)\.(\d+)/;

						var matches = versionString.match(re);
						var publicMajor = parseInt(matches[1],10);
						var publicMinor = parseInt(matches[2],10);
						var publicBuild = parseInt(matches[3],10);

						
						matches = RaidCatcher.version.major.match(re);
						var thisMajor = parseInt(matches[1],10);
						var thisMinor = parseInt(matches[2],10);
						var thisBuild = parseInt(matches[3],10);

						if (publicMajor > thisMajor || (publicMajor == thisMajor && publicMinor > thisMinor) || (publicMajor == thisMajor && publicMinor == thisMinor && publicBuild > thisBuild)) {
							RaidCatcher.version.needsUpdate = true;
							RaidCatcher.ui.updateMessage();
						}
					}
				}
			}
		},
		ui:{//raid tab creation/interaction
			raidSort: function (raidArray) {
				var sortui = true;
				if(typeof raidArray === 'undefined') raidArray = RaidCatcher.storage.getRaids();
				else sortui = false;
				var selectedSort = RaidCatcher.$("#RaidSortSelection").val();
				var selectedDir = RaidCatcher.$("#RaidSortDirection").val();
				
				RaidCatcher.settings.raidSortSelection = selectedSort;
				RaidCatcher.settings.raidSortDirection = selectedDir;
				
				var sortFunc;
				if(selectedSort == "Id")
					if(selectedDir == "asc")
						sortFunc = function(a,b){
							if(!(typeof a.id === 'undefined' || typeof b.id === 'undefined'))
								if(a.id < b.id) return 1;
							return -1;
						}
					else
						sortFunc = function(a,b){
							if(!(typeof a.id === 'undefined' || typeof b.id === 'undefined'))
								if(a.id > b.id) return 1;
							return -1;
						}
				else if(selectedSort == "Time")
					if(selectedDir == "asc")
						sortFunc = function(a,b){
							if(!(typeof a.timeStamp === 'undefined' || typeof b.timeStamp === 'undefined'))
								if(a.timeStamp < b.timeStamp) return 1;
							return -1;
						}
					else
						sortFunc = function(a,b){
							if(!(typeof a.timeStamp === 'undefined' || typeof b.timeStamp === 'undefined'))
								if(a.timeStamp > b.timeStamp) return 1;
							return -1;
						}
				else if(selectedSort == "Name")
					if(selectedDir == "asc")
						sortFunc = function(a,b){
							a=DotDRaidInfo.raids[a.boss]; b=DotDRaidInfo.raids[b.boss];
							if(!(typeof a === 'undefined' || typeof b === 'undefined'))
								if(a.name > b.name) return 1
							return -1;
						}
					else
						sortFunc = function(a,b){
							a=DotDRaidInfo.raids[a.boss]; b=DotDRaidInfo.raids[b.boss];
							if(!(typeof a === 'undefined' || typeof b === 'undefined'))
								if(a.name < b.name) return 1
							return -1;
						}
				else if(selectedSort == "Diff")
					if(selectedDir == "asc")
						sortFunc = function(a,b){
							if(a.diff > b.diff) return 1
							return -1
						}
					else
						sortFunc = function(a,b){
							if(a.diff < b.diff) return 1
							return -1
						}
				if(raidArray.sort){
					try{
						raidArray.sort(sortFunc);
					}catch(ex){ RaidCatcher.ui.doError("Raid Sorting Error", ex); }
					if(sortui){
						var raidDiv=document.getElementById('dotd_raid_list');
						for(var i=0; i<raidArray.length; i++){
							if(raidArray[i].ele) RaidCatcher.$(raidArray[i].ele).attach('to', raidDiv);
						}
					}
				}
				return raidArray;
			},
			getRaidSearchBossRegex: function(v){
				var bossSearch = v||RaidCatcher.$("#RaidBossNameSearch").val();
				var splits = bossSearch.split(/\||,|(\sor\s)/i);
				for (i in DotDRaidInfo.searchKeywords) {
					if (DotDRaidInfo.searchKeywords.hasOwnProperty(i)) {
						var keyWord = DotDRaidInfo.searchKeywords[i];
						if(DotDRaidInfo.classifications.hasOwnProperty(i)){
							keyWord.sub = DotDRaidInfo.classifications[i].toString().replace(/,/g, '|');
						}
						for (j=0;j<splits.length;j+=2) {
							if (keyWord.reg && keyWord.sub && keyWord.reg.test(splits[j])) {
								splits[j] = keyWord.sub;
							}
						}
					}
				}
				var reString = "";
				if(splits.length>1)
					for(i=0;i<splits.length;i+=2) {
						if (splits[i].trim() != "") {
							reString += (i==0)?"":"|";
							reString += "(";
							reString += splits[i].trim().replace(/\./g, "\\.");
							reString += ")";
						}
					}
				else reString = splits[0].replace(/\./g, "\\.");
				//console.log("[RaidCatcher] Boss search regex: " + reString);
				return new RegExp(reString, "i");
			},
			quickFilter: function(filterKey) {
				if(typeof filterKey === 'undefined')
					filterKey = RaidCatcher.$("#RaidBossQuickFilter").val();
					
				console.log("[RaidCatcher] Quick filter "+filterKey);
				var qf = RaidCatcher.settings.quickFilters[filterKey];				
				if(qf != null){				

					RaidCatcher.$("#RoomNameSearch").val(qf.roomSearch);
					RaidCatcher.$("#PostedNameSearch").val(qf.posterSearch);				
					RaidCatcher.$("#RaidBossNameSearch").val(qf.bossSearch);		
					RaidCatcher.$("#RaidBossDifficultySearch").val(qf.diffSearch);
					RaidCatcher.$("#PostedNameSwitch").val(qf.posterSwitch);
					RaidCatcher.$("#RoomNameSwitch").val(qf.roomSwitch);
					RaidCatcher.$("#AgeSearch").val(qf.ageSearch);
					RaidCatcher.$("#AgeSwitch").val(qf.ageSwitch);
					RaidCatcher.$("#AgeTimeSwitch").val(qf.ageTimeSwitch)
					RaidCatcher.$("#QuickFilterDeleteButton").ele().disabled=false;
				} else {
					RaidCatcher.$("#RoomNameSearch").val("");
					RaidCatcher.$("#PostedNameSearch").val("");				
					RaidCatcher.$("#RaidBossNameSearch").val("");	
					RaidCatcher.$("#AgeSearch").val("");
					RaidCatcher.$("#RaidBossDifficultySearch").val(0);
					RaidCatcher.$("#PostedNameSwitch").val(0);
					RaidCatcher.$("#RoomNameSwitch").val(0);
					RaidCatcher.$("#AgeSwitch").val(0);
					RaidCatcher.$("#AgeTimeSwitch").val("3600000")
					RaidCatcher.$("#QuickFilterDeleteButton").ele().disabled=true;
				}
				RaidCatcher.settings.selectedQuickFilter = parseInt(filterKey);
				RaidCatcher.ui.raidSearch();
				RaidCatcher.settings.save();
			},
			addQuickFilter: function() {
				var result = prompt("Name this filter");
				if(result != null)
				{
					var id = (function () {
						var i = 0;
						for(var j in RaidCatcher.settings.quickFilters)if(j > i) i = j;
						return i;
					})()+1;
					RaidCatcher.settings.quickFilters[id] = {
						label: result,
						roomSearch: RaidCatcher.$("#RoomNameSearch").val(),
						posterSearch: RaidCatcher.$("#PostedNameSearch").val(),
						bossSearch: RaidCatcher.$("#RaidBossNameSearch").val(),			
						posterSwitch : RaidCatcher.$("#PostedNameSwitch").val(),
						roomSwitch : RaidCatcher.$("#RoomNameSwitch").val(),
						diffSearch : RaidCatcher.$("#RaidBossDifficultySearch").val(),
						ageSwitch: RaidCatcher.$("#AgeSwitch").val(),
						ageSearch: RaidCatcher.$("#AgeSearch").val(),
						ageTimeSwitch: RaidCatcher.$("#AgeTimeSwitch").val()
					};
					this.loadQuickFilters(id);
				}
				RaidCatcher.settings.save();
			},
			deleteQuickFilter: function() {
				var filterKey = RaidCatcher.$("#RaidBossQuickFilter").val();
				if(filterKey == "0") return false;
				if(confirm("Delete filter?")){
					delete RaidCatcher.settings.quickFilters[filterKey];
					this.loadQuickFilters(0);
					this.quickFilter(0);
					RaidCatcher.settings.save();
				}
			},
			loadQuickFilters: function(id) {
				RaidCatcher.settings.selectedQuickFilter = id = (id||RaidCatcher.settings.selectedQuickFilter)
				var e = RaidCatcher.$("#RaidBossQuickFilter").ele();				
				while(e.hasChildNodes()) e.removeChild(e.childNodes[0]);
				
				RaidCatcher.$('option').set({style:"max-width:100px; overflow:hidden;", value:"0"}).text("None").attach("to", e);
				//e.appendChild(new Option("None","0"));
				for(var k in RaidCatcher.settings.quickFilters)
					RaidCatcher.$('option').set({style:"max-width:100px; overflow:hidden;", value:k}).text(RaidCatcher.settings.quickFilters[k].label).attach("to", e);//e.appendChild(new Option(RaidCatcher.settings.quickFilters[k].label,k));
					
				RaidCatcher.$("#QuickFilterDeleteButton").ele().disabled=((id||0)==0);
				RaidCatcher.$("#QuickFilterSaveButton").ele().disabled=(RaidCatcher.$("#RoomNameSearch").val()+
					RaidCatcher.$("#PostedNameSearch").val()+RaidCatcher.$("#RaidBossNameSearch").val()+RaidCatcher.$("#AgeSearch").val()=="" 
					|| RaidCatcher.$("#RaidBossDifficultySearch").val() > 0);
				e.value = id;
				if(id>0) RaidCatcher.ui.quickFilter(id);
			},	
			applyTooltips: function (el) {
				var e = [];
				if(el && el.getElementsByTagName){
					var nl = el.getElementsByTagName("*");
					for(var i = nl.length; i--; e.unshift(nl[i]));
				} else {
					var nl = RaidCatcher.$("#DotDRaidTabPane").ele().getElementsByTagName("*");
					for(var i = nl.length; i--; e.unshift(nl[i]));
					var nl = RaidCatcher.$("#DotD_chatToolbar").ele().getElementsByTagName("*");
					for(var i = nl.length; i--; e.unshift(nl[i]));
				}
				for(var i=0; i<e.length; i++){
					var elem = RaidCatcher.$(e[i]);
					
					var helptext = elem.get('helptext', false);
					if(helptext){
						var newel = RaidCatcher.$('div').set({class:'help_icon', tooltip:helptext}).attach((elem.ele().tagName.toLowerCase()=='td'?'to':'after'), elem.ele());
						newel.ele().addEventListener('mouseover', function(){ RaidCatcher.ui.tooltip.show(RaidCatcher.$(this).get('tooltip')); });
						newel.ele().addEventListener('mouseout', RaidCatcher.ui.tooltip.hide);
					}
					
					if(elem.get('tooltip', false)){
						elem.ele().addEventListener('mouseover', function(){ RaidCatcher.ui.tooltip.show(RaidCatcher.$(this).get('tooltip')); });
						elem.ele().addEventListener('mouseout', RaidCatcher.ui.tooltip.hide);
					}
				}
			},
			raidSearch: function (str){
				var roomSearch = RaidCatcher.$("#RoomNameSearch").val();
				var posterSearch = RaidCatcher.$("#PostedNameSearch").val();
				var bossSearch = RaidCatcher.$("#RaidBossNameSearch").val();
				if(typeof str == 'string' && roomSearch != str && bossSearch != str && posterSearch != str) return false;//still typing

				if(!RaidCatcher.util.isNumber(roomSearch) && roomSearch != ""){
					alert("Enter room number only for room search");
					return;
				}
				var diffSearch = RaidCatcher.$("#RaidBossDifficultySearch").val();
				var ageSearch = parseInt(RaidCatcher.$("#AgeSearch").val())||0;
				var ageTime = ageSearch==0?0:new Date().getTime()-(ageSearch*parseInt(RaidCatcher.$("#AgeTimeSwitch").val()));
				var isBefore = RaidCatcher.$("#AgeSwitch").val()>0;
				
				RaidCatcher.$("#QuickFilterSaveButton").ele().disabled=(roomSearch+posterSearch+bossSearch+RaidCatcher.$("#AgeSearch").val() == "" && diffSearch == 0);
				RaidCatcher.settings.bossSearchDiff = parseInt(diffSearch);
				RaidCatcher.settings.bossSearchString = bossSearch;
				
				var posterSwitch = RaidCatcher.$("#PostedNameSwitch").val();
				var roomSwitch = RaidCatcher.$("#RoomNameSwitch").val();

				var raidList = document.getElementById('dotd_raid_list').childNodes,raidName;

				// Construct the final regex string to use in search
				
				var re = RaidCatcher.ui.getRaidSearchBossRegex();
				var p_re = new RegExp(posterSearch, "i");
				for(i=0; i< raidList.length; i++) {
					var el = raidList[i];
					if(el && el.nodeType != 3){
						var f = RaidCatcher.ui.filterRaidSingle(el, re, p_re, posterSwitch, roomSearch, roomSwitch, ageTime, isBefore);
						el.className = el.className.replace(/DotDRaidItem (hidden )?(.*)/i,"DotDRaidItem "+(f?'':'hidden ')+"$2");
					}
				}
				RaidCatcher.ui.updateSelectedRaidCount();
				return false;
			},
			deleteSelectedRaids: function (){
				var r = RaidCatcher.ui.getSelectedRaids();
				for(var i = 0; i < r.length; i++){
					RaidCatcher.storage.removeRaid(r[i].id);
				}
				RaidCatcher.storage.save();
				RaidCatcher.ui.updateSelectedRaidCount();
				RaidCatcher.ui.updateMessage();
			},
			filterRaidSingle: function(el, re, p_re, posterSwitch, roomFilter, roomSwitch, age, isBefore){
				if(el.nodeType == 3) return false;				
				var id = el;
				if(typeof el != "string" && typeof el != "number") id = el.getAttribute("raidid");
				else el = document.getElementsByClassName("raid_list_item_"+id)[0];
				var r = RaidCatcher.storage.getRaid(id), e = el.getElementsByClassName('name')[0];
				
				if(typeof r == 'object') {
					return ((re.test(e.innerHTML) || re.test(e.lastChild.innerHTML)) &&  //Name
							(RaidCatcher.settings.bossSearchDiff==0 || RaidCatcher.settings.bossSearchDiff==r.diff) &&  //Difficulty
							((posterSwitch==0 && p_re.test(r.user)) || (posterSwitch==1 && !p_re.test(r.user))) && //Poster
							((roomFilter=="") || (roomSwitch==0 && roomFilter==r.room) || (roomSwitch==1 && roomFilter != r.room)) &&//Room
							((age==0) || (!isBefore && age <= r.timeStamp) || (isBefore && age >= r.timeStamp))//age
						)
				} else {
					return false;
				}
			},
			searchKeyUp: function (str) {
				setTimeout("RaidCatcher.ui.raidSearch('"+str+"')", 500);
			},
			tabs: {},
			isInit:false,
			addTabs: function() {
				for(var name in RaidCatcher.ui.tabs){
					if(RaidCatcher.ui.tabs.hasOwnProperty(name)) {
						RaidCatcher.ui.addTabBase(name, RaidCatcher.ui.tabs[name].content, RaidCatcher.ui.tabs[name].clickFunc);
					}
				}
				RaidCatcher.ui.adjustTabs();
			},
			addTabBase: function(name, contents, clickFunc){
				//console.log("[RaidCatcher] Adding custom tab " + name);
				var ele = RaidCatcher.$('#RaidCatcher_tabpane_tabs').ele();
				var el = RaidCatcher.$('li').set({class:'tab'}).attach('to', ele).ele();
				var tab = RaidCatcher.$('div').set({class:'tab_head'}).text(name).attach('to', el).ele()
				RaidCatcher.$('div').set({class:'tab_pane'}).html(contents).attach('to', el);
				tab.addEventListener("click",RaidCatcher.ui.tabClick);
				if(typeof clickFunc === 'function') tab.addEventListener("click",clickFunc);
			},
			addTab: function(name, contents, clickFunc){//use this method to add tabs properly.
				while(RaidCatcher.ui.tabs.hasOwnProperty(name) || /^(raids|options|filters|importing)$/i.test(name)){
					var ex;
					if(ex = /(.*) \((\d)\)$/.exec(name))
						name = ex[1]+" ("+(++ex[2])+")";
					else
						name = name + " (2)";
				}
				RaidCatcher.ui.tabs[name] = {content: contents};
				if(typeof clickFunc == 'string'){
					var ex;
					if(ex = /^function\(\){(.*)}$/i.exec(clickFunc)) clickFunc = ex[1];
					try{clickFunc = new Function('a','b', clickFunc);}
					catch(e){clickFunc = null;}
				}
				if(typeof clickFunc === 'function') RaidCatcher.ui.tabs[name].clickFunc = clickFunc;
				if(RaidCatcher.ui.isInit){
					RaidCatcher.ui.addTabBase(name, contents, clickFunc);
					RaidCatcher.ui.adjustTabs();
				}
			},
			toolIcons:[//these are the classes for the tool icons
				'DotDToolbarUpArrowIcon',
				'DotDToolbarDownArrowIcon',
				'DotDToolbarLeftArrowIcon',
				'DotDToolbarRightArrowIcon',
				'DotDToolbarRefreshIcon',
				'DotDToolbarChartIcon',
				'DotDToolbarCloseIcon'
			],
			addTool: function(tooltip, chatCommand, openUrl, icon, iconText, order){
				for(var i=0;i<RaidCatcher.settings.tools.length;i++)if(RaidCatcher.settings.tools[i].tooltip==tooltip) return false;
				var f;
				icon = String(icon);
				if(typeof order === 'undefined') order = RaidCatcher.settings.tools.length;
				if(typeof chatCommand === 'function'){ 
					f = chatCommand.toString();
					chatCommand = null; 
				}
				var iconClass = icon.indexOf(".")==-1?icon:'', background = icon.indexOf(".")>-1?icon:'';
				var t = {chat:chatCommand, url: openUrl, class:iconClass, tooltip:tooltip, order:order, id:RaidCatcher.settings.tools.length, bg:background, text:iconText, func:f};
				RaidCatcher.settings.tools.push(t);
				RaidCatcher.settings.save();
				if(RaidCatcher.ui.isInit){
					RaidCatcher.ui.addToolBase(t);
					RaidCatcher.ui.adjustToolbar();
				}
				return true;
			},
			addToolBase: function(tool){
				//console.log("[RaidCatcher] Adding toolbar item " + tool.tooltip);
				var doChatCommand = function(){ return; }
				var doWindowOpen = function(){ return; }
				if(/^\/.+/.test(tool.chat)) doChatCommand = function () { RaidCatcher.chat.output(tool.chat); };
				if(/^http.+/.test(tool.url)) doWindowOpen = function () { window.open(tool.url) };
				
				RaidCatcher.$('option').set({value:tool.id}).html(tool.tooltip).attach("to", "RaidCatcher_options_toolbar_items");
				var t = RaidCatcher.$('div').set({tooltip:tool.tooltip, class:'ChatToolbarIcon ' + (tool.class||'')}).text(tool.text||'').attach('to', RaidCatcher.ui.toolbar);
				if(tool.bg||'' != '') t.set({style:'background-image:url('+tool.bg+');'});
				t.ele().addEventListener('click', tool.func?function(){eval("("+tool.func+")()")}:function(){ doChatCommand(); doWindowOpen();});
			},
			addTools: function (init){
				console.log("[RaidCatcher] addTools");
				RaidCatcher.settings.tools.sort(function (a,b){
					if(a.order > b.order) return 1;
					return -1;
				});
				RaidCatcher.$('#RaidCatcher_options_toolbar_items').ele().options.length = 0;
				while(RaidCatcher.ui.toolbar.childNodes.length > 1){
					RaidCatcher.ui.toolbar.removeChild(RaidCatcher.ui.toolbar.lastChild);
				}
				for(var i=0;i<RaidCatcher.settings.tools.length;i++){
					RaidCatcher.ui.addToolBase(RaidCatcher.settings.tools[i]);
				}
				if(!init) RaidCatcher.ui.applyTooltips(RaidCatcher.ui.toolbar);
				RaidCatcher.ui.adjustToolbar();
			},
			initToolbar: function () {
				var toolbar = RaidCatcher.ui.toolbar = RaidCatcher.$('div').set({id:"DotD_chatToolbar"}).attach("to", document.body).ele();
				RaidCatcher.$('div').set({class:'ChatToolbarIcon RCIcon', id:'DotD_chatToolbar_Expand'}).attach('to', toolbar).ele().addEventListener('click', function() { RaidCatcher.ui.toggleToolbar(!RaidCatcher.settings.hideToolbar); });			
				window.addEventListener('resize', function() { RaidCatcher.ui.adjustToolbar(); });
				var isHover = false, isChanging = false, isExpanded = !RaidCatcher.settings.hideToolbar&&!RaidCatcher.settings.autohideToolbar, collapseTimeout;
				
				var expand = function () {
					if(!isChanging && !isExpanded){
						isChanging = true;
						RaidCatcher.ui.expandToolbar();
						clearTimeout(collapseTimeout);
						setTimeout(function () { isChanging = false; isExpanded=true;}, 200);
					}
				}
				var collapse = function () {
					if(!isChanging && isExpanded){
						isHover = false;
						collapseTimeout = setTimeout(function(){if(!isChanging && !isHover && isExpanded){isChanging=true;RaidCatcher.ui.collapseToolbar(); setTimeout(function(){isChanging=false;isExpanded=false},200)};}, 1000);
					}
				}
				toolbar.addEventListener('mousemove', function (){
					isHover = true;
					clearTimeout(collapseTimeout);
				});
				var autoHide = function () {
					//console.log("[RaidCatcher] auto hide " + RaidCatcher.settings.autohideToolbar);
					if(RaidCatcher.settings.autohideToolbar){
						RaidCatcher.settings.hideToolbar = true;
						toolbar.addEventListener('mouseover', expand);
						toolbar.addEventListener('mouseout', collapse);
					} else {
						toolbar.removeEventListener('mouseover',  expand);
						toolbar.removeEventListener('mouseout', collapse);
					}
					RaidCatcher.ui.toggleToolbar();
				}
				
				RaidCatcher.ui.addTools(true);
				autoHide();
				delete RaidCatcher.ui.initToolbar;
			},
			adjustTabs: function(){
				var w = 0,ele = RaidCatcher.$('#RaidCatcher_tabpane_tabs').ele(),el = RaidCatcher.$('li').set({class:'tab'}).attach('to', ele).ele(),tabs = ele.getElementsByClassName("tab");
				for(var i = 0; i < tabs.length; i++) w += tabs[i].offsetWidth;
				var rows = Math.ceil(w / ele.offsetWidth);
				if(rows > 1){
					var offset = (rows - 1) * 22, newTabPaneHeight = RaidCatcher.ui.baseTabPaneHeight - offset, raidList = RaidCatcher.$('#dotd_raid_list').ele(), curw = 0;
					for (var i = 0;i<tabs.length;i++) {
						var tab = tabs[i].getElementsByClassName('tab_pane')[0];
						curw += tabs[i].offsetWidth+5;
						tab.style.height = newTabPaneHeight + "px";
						tab.style.marginTop = ((rows - Math.ceil(curw / ele.offsetWidth))*22) + "px";
					}
					raidList.style.height = (RaidCatcher.ui.baseRaidListHeight - offset) + "px";
				}
			},
			tabClick: function () {
				if (!/\bactive\b/i.test(this.className)) {
					var e = document.getElementById("dotd_tab_pane").getElementsByClassName("tab");
					for (var i = 0;i<e.length;i++) {
						if (/\bactive\b/i.test(e[i].getAttribute("class"))) e[i].className = e[i].className.replace(/ active$/g,"");
					}
					(this.parentNode).className += " active";
				}
			},
			expandToolbar: function(){
				//console.log('[RaidCatcher] Expanding toolbar');
				RaidCatcher.$("#DotD_chatToolbar_Expand").set({style:''});
				var toolbar = RaidCatcher.$("#DotD_chatToolbar");
				toolbar.ele().style.height = 'auto';
				if(RaidCatcher.util.animateTimeout) clearTimeout(RaidCatcher.util.animateTimeout);
				RaidCatcher.util.elAnimateHeight(toolbar.ele(), toolbar.height(), 15, true, 100, RaidCatcher.ui.adjustToolbar);
			},
			collapseToolbar: function(){
				//console.log('[RaidCatcher] Collapsing toolbar');
				var toolbar = RaidCatcher.$("#DotD_chatToolbar");
				if(RaidCatcher.util.animateTimeout) clearTimeout(RaidCatcher.util.animateTimeout);
				RaidCatcher.util.elAnimateHeight(toolbar.ele(), 15, null, true, 200, RaidCatcher.ui.adjustToolbar);
			},
			toggleToolbar: function (b) {
				if(!(typeof b === 'undefined'))RaidCatcher.settings.hideToolbar=b;
				if(RaidCatcher.settings.hideToolbar) RaidCatcher.ui.collapseToolbar();
				else RaidCatcher.ui.expandToolbar();
			},
			adjustToolbar: function () {
				var ifr=RaidCatcher.$("#"+session.iframeId),toolbar = RaidCatcher.$("#DotD_chatToolbar");
				if(RaidCatcher.settings.hideToolbar && !RaidCatcher.settings.autohideToolbar) toolbar.ele().style.height = "15px";
				//console.log("[RaidCatcher] adjustToolbar bottom:"+ifr.bottom()+", height:"+toolbar.height()+", top:"+(ifr.bottom() - toolbar.height()));
				toolbar.ele().style.top = (ifr.bottom() - toolbar.height()) + "px";
				toolbar.ele().style.left = (ifr.right() - 4) + "px";
			},
			init: function(el) {
				RaidCatcher.ui.baseTabPaneWidth = el.offsetWidth - 20;
				RaidCatcher.ui.baseTabPaneHeight = el.offsetHeight - 36 - (session.platformId!=1?10:0);
				RaidCatcher.ui.baseRaidListHeight = RaidCatcher.settings.bossSearchString==''&&RaidCatcher.settings.selectedQuickFilter==0?'550':'400';
				RaidCatcher.$('style').set({type: "text/css",id: 'DotD_shared_styles'}).text(' \
					#RaidCatcher_tooltip { position:absolute; display:block; background:url(data:image/gif;base64,R0lGODlhBQCWAIABAGZmZv///yH5BAEAAAEALAAAAAAFAJYAAAIgjG8AqaH9opy02ouz3rz7D4biSJbmiabqyrbuC8eyWgAAOw==) top left no-repeat; } \
					#RaidCatcher_tooltip_top { display:block; height:5px; margin-left:5px; background:url(data:image/gif;base64,R0lGODlhkAEFAIABAGZmZv///yH5BAEAAAEALAAAAACQAQUAAAI0hI+py+0Po5y02ouz3rz7XwWiCJbmiabqyrauOr7yTNf2jecPqff+DwwKZ4Gh8YhMKoWBAgA7) top right no-repeat; overflow:hidden; } \
					#RaidCatcher_tooltip_cont { display:block; padding:2px 12px 3px 7px; margin-left:5px; background:#666; color:#fff; } \
					#RaidCatcher_tooltip_bot {display:block;height:5px;margin-left:5px;background:url(data:image/gif;base64,R0lGODlhkAEFAIABAGZmZv///yH5BAEAAAEALAAAAACQAQUAAAI1hI+py+0Po5y02ouz3rz7nwXgSJbmiabqyqpiC8fyTNf27QQvzvf+DwyydDuh8YhMKm9EXQEAOw==) top right no-repeat;overflow:hidden;} \
					#dotd_tab_pane ul{margin: 0px;padding: 0px;list-style-type: none;position: relative;}\
					#dotd_tab_pane ul li.tab{float: left;height: 100%;}\
					#dotd_tab_pane ul li.tab .help_icon { display:inline-block; padding-left:3px;width:12px; height:12px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QERFgId/iptggAAAftJREFUKM89kstLVGEcQM/33esMjjM6vq5j0UIzDCJopBpciAVuigajdZCLoEXh/AktahnUUMsg124KpxIkspY3haG3UDoVPcjGmRrvvJx7v18Lo/MfnMNR/EOqpejSy8/pSlMyX0rVpADDTizfFbayJ0b6clbPoAegAGR78+CNx+/mljYqqddlgUgEFbbpDSuSfSHG+9vci2OJmdDAvjUljd/Ra/MrT26v/kp19A+K0xnGnR1XACcfFMS2LOx6VU3H6+6lY3um9OLKenrhzc/Ur8AWg1Lu7Lj6vvUHgOWzQ8qytDLRmLhlUs/Wt9K6XPUzqx+LaG1Ra8Hhmy+YvPcKgPm1IihQSvG+YvBaktGFzUoS0SCijAjFuuH8cAiA+xuVXU2FIhziW7mR1LuJDOILvh8g9TpXz6W4/vQDX1s2u2UUCCgl6CEnlscEiO9La8fHaIszd56zUPAIBGqB0AiMNOsNBrva87q7oy17dH8v7Oxg/BZ20+PhlUkuHIrT9A2+QL1lGIlAxJasPnV8ODd9ZK/bia+k0ZTtli2nby1zN18mZGsxgZFQs6YmHMudGnVytgp3e1LdmhHF3KO3pZT7Y5PFRoxYj8GpeSrZF2bCsd3LYwMzKp7w1P81mqXo4sqndLkWZArFalJrxYFEVz7errNTo05OxRMewF8GHurvcyGirgAAAABJRU5ErkJggg==) center no-repeat;}\
					#dotd_tab_pane ul li.tab.active div.tab_head{background-color:white;cursor:default;text-decoration:none;}\
					#dotd_tab_pane ul li.tab div.tab_head{font-family: Verdana, Arial, sans-serif;font-size: 10px;padding: 3px 5px 4px 5px;background-color: silver;cursor: pointer;text-decoration: underline;margin-right: 1px;}\
					#dotd_tab_pane ul li.tab.active div.tab_pane{position: absolute;display: block;left: 0px;}\
					#dotd_tab_pane ul li.tab div.tab_pane{padding-left:5px;background-color: white;display: none; width:'+RaidCatcher.ui.baseTabPaneWidth+'px; height:'+RaidCatcher.ui.baseTabPaneHeight+'px;}\
					#dotd_tab_pane ul li.tab div#dotd_raid_list {width:98%; height:'+RaidCatcher.ui.baseRaidListHeight+'px;overflow-y:auto;overflow-x:hidden;text-align:left;}\
					#dotd_tab_pane ul li.tab div.DotDRaidItem{width:99%; border-bottom:1px solid #666666; padding:1px 0px 1px 3px;}\
					#dotd_tab_pane ul li.tab div.DotDRaidItem span{padding:0px;float:left; padding-right:2px;}\
					#dotd_tab_pane ul li.tab div.DotDRaidItem .visited{float:right}\
					#dotd_tab_pane ul li.tab div.DotDRaidItem .delete{float:right}\
					#dotd_tab_pane ul li.tab div.RaidDiff1{background-color:#d5e8c7;}\
					#dotd_tab_pane ul li.tab div.RaidDiff1 .diff{color:#8db86d; font-weight:bold;}\
					#dotd_tab_pane ul li.tab div.RaidDiff2{background-color:#eae9cf;}\
					#dotd_tab_pane ul li.tab div.RaidDiff2 .diff{color:#878431; font-weight:bold;}\
					#dotd_tab_pane ul li.tab div.RaidDiff3{background-color:#decaca;}\
					#dotd_tab_pane ul li.tab div.RaidDiff3 .diff{color:#a64343; font-weight:bold;}\
					#dotd_tab_pane ul li.tab div.RaidDiff4{background-color:#e0d6df;}\
					#dotd_tab_pane ul li.tab div.RaidDiff4 .diff{color:#702a69; font-weight:bold;}\
					#dotd_tab_pane ul li.tab div.DotDRaidItem .diff{width:25px;}\
					#dotd_tab_pane ul li.tab div.DotDRaidItem > span {float:left; padding-left:3px;}\
					#dotd_tab_pane ul li.tab div.DotDRaidItem .visited{float:right; padding-right:3px;}\
					#dotd_tab_pane ul li.tab div.DotDRaidItem .raidHead{width:100%; cursor:pointer;}\
					#dotd_tab_pane ul li.tab div.DotDRaidItem .moreInfo{ width:100%; padding:5px; padding-bottom:3px;}\
					#dotd_tab_pane ul li.tab div.DotDRaidItem .moreInfo > div{margin:10 auto;width:95%; background-color:white;}\
					#dotd_tab_pane ul li.tab span.OpenRaidSize {padding-left:12px; background-repeat:no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QMeFAYw/r5jqwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAM0lEQVQY02NkQAK8J+X/w9ifzR8ywtiM6JLo4LP5Q0YmBiIAIz5TYIAok4izjnoOJyacAI78EgKhinQ9AAAAAElFTkSuQmCC);}\
					span.SummRaidSize {padding-left:12px; background-repeat:no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QYTEyckVz7jHQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAM0lEQVQY02NkQAK7pon/h7Hdsl4ywtiM6JLowC3rJSMTAxGAEZ8pMECUScRZRz2HExNOABVYEnTWoZKUAAAAAElFTkSuQmCC);}\
					span.ClosedRaidSize {padding-left:12px; background-repeat:no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QMeFAcJuKDa4gAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAM0lEQVQY02NkQAIneXn/w9jmnz8zwtiM6JLowPzzZ0YmBiIAIz5TYIAok4izjnoOJyacAHqyEfCkFQlZAAAAAElFTkSuQmCC);}\
					.RaidCatcher_deadRaid{display:none !important}\
					.RaidCatcher_deadRaidList{display:none !important}\
					.hidden{display:none !important}\
					#DotD_chatToolbar {position:absolute; width:15px; background-color:#333; z-index:500;overflow:hidden;}\
					#dotd_tab_pane ul li.tab span.ChatToolbarIcon{width:15px; height:15px;display:inline-block;background-color:#333;}\
					#DotD_chatToolbar div.ChatToolbarIcon{width:15px; height:15px; cursor:pointer; padding-top:2px; background-repeat:no-repeat; background-size: 15px 15px;color:white;font-weight:bold;text-align:center;}\
					#DotD_chatToolbar div.ChatToolbarIcon:hover{background-color:#000}\
					#RCshade, #RCmodalPrompt { display: none; }\
					#RCshade { position: fixed; z-index: 10000; top: 0; left: 0; width: 100%; height: 100%; background: silver; opacity: 0.7; filter: alpha(opacity=50);}\
					#RCmodalPrompt { position: fixed; z-index: 10001; top: 50%; left: 50%; width: 300px; height:100px; text-align:center; margin-top:-50px; margin-left:-150px;background:white;}\
					.DotDToolbarUpArrowIcon {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAArrAAAK6wGCiw1aAAAAB3RJTUUH3QUBFTsZUBxrJwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABMElEQVQoz4VSMU7DQBCc8TnCUVJQ8AzewBNIT5WSF1DxAlr+QENNywsQpKCjoaFBEQUSKMjZGYqcI9sxYaSTbk+7OzO7B2RIgm3sg21I2sZFcyHZT7yUdCfpfG/HiOjEks4kvUqy7Sfbs3ZuRGwUtGVImtqe2X53hiRLepF0Utf1qG1hi7quS0lzdyFJjghLWkk6HRrERNJVlrlT3DsXTV2Zi0uS9wDebK8BzEke265IfgF4AHALoLS9iIiUUoqGuWr5pu0b25+ZfSnpuu3V9gEAFLZBctVyMc4MTTJJlrbHzUpJ/kjaFPfAPza6814WRdHNIJHVYHAtze8qis3A+gwkKwDT3GQCoBqSUg6sbQ3gEcCI5KHtJYBnAPGvj4gggCOSY5LJ9tr2N4CPlFJH/y9axhhhblQvwAAAAABJRU5ErkJggg==);} \
					.DotDToolbarDownArrowIcon {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAB3RJTUUH3QMaERwrTV8FIAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABJElEQVQoz4WSMU4DURBDnzeBRECFuAIdSJwAaGhJT5UScQAqDoC4D2dAVNSIhhpRUIASafNtCjZos1mEpd/MH894LIsOSikCdiVtSRomKUlmwPtgMEi7d9glS9oEpsApsAd8SHoEboH5f+QBcACcJRlJClD39VbdQhKSzJN8SQL4TDIHska23d1MQ/odJolklWt7fXPfhr66JKqqqkgyWk6WNEuyaG5dqlgAs5aasaQfE2wvJJ0kOWoaD4FxI3kjyT5wlWQIPCd5WHHe9rXttF8Sp4Wmfpdke+0o2+e256WUv8jTuq6HK24uUdf1hu1j2y8NeYm3JBPbO223sU0phVJKe+AkyVMj89X2RSfCa5JXVNi+tH2f5KYTIPru7f/opK8dqm+HYxfyOZ6EqgAAAABJRU5ErkJggg==);} \
					.DotDToolbarLeftArrowIcon {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAB3RJTUUH3QMaERwZhYhUoAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABNUlEQVQoz42TMUsDURCEZ+9OjF7ARkt7sbIV/Auayt5SsLDzF1ha+BMsrGz9EXbapBFBsFcQLmD0vPksfBfOkEgGtth9b2d2mfekBNsCNA3bsq25aJpmOs+B5Xn3s1mMts8iYk/S51wlYDJiXddLtg9sA5zqHxQRMUnyPN+VdJPS70S8IikARYSABvgqOsoD4AJYTmSHtrckFR2hnqShpKt2p2PgwTZtACPg1fZbG8DY9q3tzZZtH9hJSqQJyogou6ukcdclFZkkRcSdpJd0Hr+lGEuqgAqoJFURAfAONEVqPLf9LOlS0kZiH0bEU0QUHbWepHvgY9qaAQm2T2yH7VXbJVACfdu9pmnij4+2+7aPFvKx9UeSsiwb1XV9nef5tqRHLYLuWwVK22tAb6HmWb8AmFn/AbO8CfDsL13EAAAAAElFTkSuQmCC);}\
					.DotDToolbarRightArrowIcon {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAArrAAAK6wGCiw1aAAAAB3RJTUUH3QUBFTsC2nmiywAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABN0lEQVQoz42SrW5VQRSFv33OSW57CwGBBoXE4DDU8gRofAUOhUDzCggcvqnA4rA8AIIHaEJyE2ibe2d9CM6Qk4b+bDdrsmbP3t+CS5UElf/ptyp1L8k99aBrrbVbm18keb/dbqeFdnN39XUSk7xKcqcbVabWWlXVqqqmv7oAAmfqrqoAPgI/geP5zAQ8AI6Ap+p5vwB26uPFBz4kORiG4VPf1sMkn9WomySbJBt1o565qCQ/1LcAU1WNwH21quruoiMqVdXZFPBIfQYwqTvgtKou1F/dVFVW1d4SR1V9U0+68XdVfQFOgX8zzot5AhzOnb8D74ZhOO5QK8lKXSdZq2t1fzYfzTjOkzxfoprGcRS4uAJlB/+ytfa1z30TfJIcJnmzjFyS65Ojrlpr41K7NqtXvXg5o38Auu8EvQXHnAMAAAAASUVORK5CYII=);}\
					.DotDToolbarRefreshIcon {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QMaFDMA9TQG5gAAAYBJREFUKM9tk71qFmEQhZ95JUFBIdiIIoIg/oBFsNFWC1FsBLGwsbCw8Aq8AQsrKytvQFKKraCIhY0aGxERUsRC/EOL7zOanMfCXXlZPLDszrzzzA5ndkulqgBIQv0NGlCAKkCqyqoiCa01ANoIqgXsA24Cz4B1YK2qHlbVZWAJoLXG0JAR3KaeVb+oJjGJEz1Wj45Mkn/waXWjK/ymvlfX1FmXf57kQA/uTPJmeNuW+jLJ9SSHkiyrt9T1bpLb6sIIn+8O3qonmEi9qn4camZJdgE09cxg2gbwoKpejIZ093fAj+F5R1VdU483YO+Q/Kmu9tC4iao6CezphrkD7G/ApyGxCBzmP1LvA6tdw0fAU5Jc6tx8leTgBBxXc0H9nmSWZHk8XEryYdjvpvokybn5fL7Yw0ODu+qNJK1PXuwc30ryOcmKemRi3G51e79n1AX1yvh1DXqd5NR0/D5uVUVV/VZXgGPAPeArsFlVv8bi0fk+rv4vGbq34RLYmkK9/gDffpglIVZx9gAAAABJRU5ErkJggg==);} \
					.DotDToolbarCloseIcon {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAB3RJTUUH3QMaERwA4eP8YAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA3UlEQVQoz6WTsRHCMAxF5ZyPEZjLl0k8RSoKRqFiFE+RNBngPxqZE+BAgRrr9CVL/1s2+9eAC9CA5UfeAjRJlxhsAJI2oIZ46r6kCmye115u9MJus6TsWJY0e1FvsLyPVEMxkorHC69Wh5zeOuzA6me/cP4mSJZUgF1S7LZLKp3KqDAFf43FktZR3tSdlBKSsnM9eWLHTkCRlFNKHHWf46jAGikccgaqCzVUO2B1tDlb7ABkf4HcJ3J8k7R8bJgD9UDE54YBzcysS3/38zZN0zWKGPwrcDazAtz//lAPWQiUsvtgh8AAAAAASUVORK5CYII=);} \
					.DotDToolbarChartIcon {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAB3RJTUUH3QMaEioOjQH+SwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAXUlEQVQoz8WSQQrAQAgDk9IvxkfqI+2pUFxYFAqbix4UxyhwSgQAd89OsSREBCSBJNtTMjO/cdxYdXexa42ZsTWpjVp32zUubr+O1rxqwZ46ef3yJDvELfb48Mf1ANWQRt9tLxsUAAAAAElFTkSuQmCC);} \
					#DotD_chatToolbar div.RCIcon {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAB3RJTUUH3QMaER0XeytI5gAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACBklEQVQoz3WTv0tbURTHP/e+90iIHYKUtslQKLSlg9CKUAxCO1naOAmiEPBP0MHRzUlwUERniYhggpvSLE4ZotBiW4dQW9LSGIzW0h+kMZCb906H+GL80S/c5cD3e873e85VmURCPGMQEZRSCIAI2rJA62ZNBAClFO2wPWOIp9NcRnZigl/7+wTC4SskH9pXBXi/sEB+eZnyzg7PZme5E4tRr1T4H2zaVA9zOYKdnXjGEOnt5UY0StkYmk7kAlEphU1b8eXKCtq2AXg7M0N5e5tAOHyF2Brb7/xlY4PXIyO8m58HwFSrNGo10BrxPMR1EdcFz2s+QPsqnjHUTk74vrvLx9VVYlNT3O3vp3p4SEckQjyVIp5K8WptjUejo7j1+jnZDoVQlkXj9JTKwQEAt3t6uNXdzfO5OYpbW3xeXwfg3sAA4nnY/hr+lkpYgQDacfAajeZYjsODoSEA8skkfwoFqkdH3OzqQlkWKpNIiLguKEUreRFOj495PDbG/cFB3kxP82Nvr2nvzLsdDJ6NrfUFstK6qax1a02en7gIcjkwANV2gk5HB+VcjlI2y9PJSZxQiN+FAtG+Pp6Mj+Mag33dzQLYwSCVYpFvmQxurcaLpSU+pdM8HB4G4MPi4sXO/ogigrIsEOFnPk8+mQRoEb9ubp4Hdt31+L+s5bleb/04ZVlYjsM/zCrn/y+e2jwAAAAASUVORK5CYII=);}\
					#DotD_chatToolbar_Expand {height:15px;width:15px;}\
				').attach('to',document.head);
				
				RaidCatcher.$('div').html('\
					<div id="RCshade"></div>\
					<div id="RCmodalPrompt">\
						<div id="RCmodalPromptContainer"></div>\
						<input type="text" id="RCmodalPromptText" /> <input type="button" id="RCmodalPromptButton" value="Ok">\
					</div>\
				').attach("to", document.body);
				
				var pane = RaidCatcher.$('div').set({id:"DotDRaidTabPane",style: 'padding:5px;width:100%;height:100%;text-align:left'}).html('\
					<div class="room_name_container h6_alt mbs">Raid Catcher - <span class="room_name" id="DotDStatusOutput"></span></div> \
					<ul id="RaidCatcher_tabpane_tabs"> \
						<li class="tab active"> \
							<div class="tab_head">Raids</div> \
							<div class="tab_pane"> \
								<div id="RaidSearchDiv" class="collapsible_panel"> \
									<p class="panel_handle spritegame mts '+(RaidCatcher.settings.bossSearchString==''&&RaidCatcher.settings.selectedQuickFilter==0?'closed_link':'opened_link')+' style="text-align:left" onclick="RaidCatcher.ui.toggleDisplay(\'RaidSearching\', this, \'dotd_raid_list\')"> <a> Search </a> </p> \
									<div id="RaidSearching" '+(RaidCatcher.settings.bossSearchString==''&&RaidCatcher.settings.selectedQuickFilter==0?'style="display:none"':'')+'> \
										<hr>\
										<table>\
										<tr><td align="right">Quick:</td> \
										<td><select id="RaidBossQuickFilter" style="max-width:100px; overflow:hidden;" tabIndex="49" onchange="RaidCatcher.ui.quickFilter()"></select></td> \
										<td><input type="button" id="QuickFilterSaveButton" onclick="RaidCatcher.ui.addQuickFilter()" value="Save" /> \
										<input type="button" id="QuickFilterDeleteButton" onclick="RaidCatcher.ui.deleteQuickFilter()" value="Delete" /></td></tr>\
										<tr><td align="right">Boss:</td> \
										<td><select id="RaidBossDifficultySearch" tabIndex="50" onchange="RaidCatcher.ui.raidSearch()"> \
											<option value="0" selected>All or Any</option> \
											<option value="1">Normal</option> \
											<option value="2">Hard</option> \
											<option value="3">Legendary</option> \
											<option value="4">Nightmare</option> \
											<!--<option value="5">Insane</option> \
											<option value="6">Hell</option>--> \
										</select></td><td> <input id="RaidBossNameSearch" size="10" tabIndex="51" onkeyup="RaidCatcher.ui.searchKeyUp(this.value);"></td></tr> \
										<tr><td align="right">Poster:</td>\
										<td><select id="PostedNameSwitch" tabIndex="-1"> \
											<option value="0" selected>Contains</option> \
											<option value="1">Not Contains</option> \
										</select></td><td> <input id="PostedNameSearch" size="10" tabIndex="52" onkeyup="RaidCatcher.ui.raidSearch()"></td></tr> \
										<tr><td align="right">Room:</td>\
										<td><select id="RoomNameSwitch" tabIndex="-1"> \
											<option value="0" selected>Equals</option> \
											<option value="1">Not Equals</option> \
										</select></td><td> <input id="RoomNameSearch" size="10" tabIndex="53" class="numeric_textbox" onkeyup="RaidCatcher.ui.raidSearch()"></td></tr> \
										<tr><td align="right">Age:</td>\
										<td colspan="3"><select id="AgeSwitch" onchange="if(RaidCatcher.$(\'#AgeSearch\').val())RaidCatcher.ui.raidSearch()" tabIndex="-1"> \
											<option value="0" selected>Newer</option> \
											<option value="1">Older</option>\
										</select> than <input id="AgeSearch" size="2" tabIndex="54" maxlength="2" class="numeric_textbox" onkeyup="RaidCatcher.ui.raidSearch()"> \
										<select id="AgeTimeSwitch" onchange="if(RaidCatcher.$(\'#AgeSearch\').val())RaidCatcher.ui.raidSearch()" tabIndex="-1"> \
											<option value="86400000">Days</option> \
											<option value="3600000" selected>Hours</option>\
											<option value="60000">Minutes</option>\
										</select></td></tr>\
										</table> \
										<hr>\
									</div> \
								</div> \
								<div id="RaidSortingDiv" class="collapsible_panel"> \
									<p class="panel_handle spritegame mts closed_link" style="text-align:left" onclick="RaidCatcher.ui.toggleDisplay(\'RaidSorting\', this, \'dotd_raid_list\')"> <a> Sort </a> </p> \
									<div id="RaidSorting" style="display:none"> \
										<hr>\
										Sort By: \
										<select id="RaidSortSelection" tabIndex="-1" onchange="RaidCatcher.ui.raidSort()"> \
											<option value="Time">Time Since</option> \
											<option value="Name">Raid Name</option> \
											<option value="Diff">Difficulty</option> \
											<option value="Id">Raid Id</option> \
										</select> \
										<select id="RaidSortDirection" tabIndex="-1" onchange="RaidCatcher.ui.raidSort()"> \
											<option value="asc">Ascending</option> \
											<option value="desc">Descending</option> \
										</select> \
										<hr>\
									</div> \
								</div> \
								<div id="RaidJoinDiv" class="collapsible_panel dotd_kong_option"> \
									<p class="panel_handle spritegame mts closed_link" style="text-align:left" onclick="RaidCatcher.ui.toggleDisplay(\'RaidJoin\', this, \'dotd_raid_list\');RaidCatcher.ui.updateSelectedRaidCount();"> <a> Join </a> </p> \
									<div id="RaidJoin" style="display:none"> \
										<hr> \
										<form name="DotDActionsForm" onsubmit="return false">\
										<input type="checkbox" id="dotd_selection_all_checkbox"> All Raids <span style="float:right" id="selected_raid_count">&nbsp;</span>\
										<table style="width;100%">\
										<tr>\
										<td style="padding-right:5px">Visited<br/><input type="radio" class="raid_selection" name="radio_raid_new_visited" value="visited_"></td>\
										<td style="padding-right:5px">New<br/><input type="radio" class="raid_selection" name="radio_raid_new_visited" value="new_"></td>\
										<td style="padding-right:5px">Both<br/><input type="radio" class="raid_selection" name="radio_raid_new_visited" value="new_visited_"></td>\
										</tr><tr><td align="center"> \
										<input name="JoinRaids" id="AutoJoinButton" onclick="RaidCatcher.game.joinSelectedRaids();return false;" tabIndex="-1" type="button" value="Join" tooltip="Join all selected (not dead) raids.");">\
										<input name="DeleteRaids" onclick="RaidCatcher.ui.deleteSelectedRaids();return false;" tabIndex="-1" type="button" value="Delete" tooltip="Delete selected raids."> \
										</td></tr></table> \
										<textarea id="QuickShareText" style="display:none;height:16px;width:90%;"></textarea> \
										</form>\ \
										<hr> \
									</div> \
								</div> \
								<div id="dotd_raid_list" tabIndex="-1"> \
								</div>\
							</div> \
						</li> \
						<li class="tab"> \
							<div class="tab_head">Importing</div> \
							<div class="tab_pane"> \
								<div id="ImportingExpirationTimesDiv" class="collapsible_panel"> \
									<p class="panel_handle spritegame mts opened_link" style="text-align:left" onclick="RaidCatcher.ui.toggleDisplay(\'ImportingExpirationTimes\', this);"> <a> Expiration Times </a> </p> \
									<div id="ImportingExpirationTimes"><hr> \
										<table><!--<tr><td colspan="2" align="left" helptext="<p>Importing raids requires that you share raids in chat.  After sharing a raid, you will be able to import raids of that size for a certain number of days.  Small and medium raids will expire after 5 days, Large 6, and Epic and Colossal will expire after 7 days of posting.</p> <p>If a raid size has expired, simply summon and post a raid of that size in chat and try importing again.</p>">\
										<b><u>Raid expiration times</u></b></td></tr>-->\
										<tr><td align="right" id="DotD_LabelS">Small:&nbsp;</td><td align="left"><span id="DotD_ExpS">Unknown</span></td></tr>\
										<tr><td align="right" id="DotD_LabelM">Medium:&nbsp;</td><td align="left"><span id="DotD_ExpM">Unknown</span></td></tr>\
										<tr><td align="right" id="DotD_LabelL">Large:&nbsp;</td><td align="left"><span id="DotD_ExpL">Unknown</span></td></tr>\
										<tr><td align="right" id="DotD_LabelE">Epic:&nbsp;</td><td align="left"><span id="DotD_ExpE">Unknown</span></td></tr>\
										<tr><td align="right" id="DotD_LabelC">Colossal:&nbsp;</td><td align="left"><span id="DotD_ExpC">Unknown</span></td></tr>\
										<!--<tr><td align="right">Date:&nbsp;</td><td align="left"><span id="DotD_LastImportDate"></span></td>\
										<tr><td align="right">Count:&nbsp;</td><td align="left"><span id="DotD_LastImportCount"></span></td>-->\
										</table>\
									<hr></div>\
								</div>\
								<div id="ImportingDiv" class="collapsible_panel"> \
									<p class="panel_handle spritegame mts opened_link" style="text-align:left" onclick="RaidCatcher.ui.toggleDisplay(\'ImportingHistory\', this);"> <a> Importing </a> </p> \
									<div id="ImportingHistory"><hr> \
										<div style="width:100%"><div style="float:left;width:24%;text-align:center;font-weight:bold">Count</div>\
										<div style="display:inline-block;margin:0 auto;width:40%;text-align:center;font-weight:bold">Date</div>\
										<div style="float:right; width:25%; text-align:center;font-weight:bold">Setting</div></div>\
										<div style="height:60px;width:100%;overflow:auto;" id="DotD_ImportList"></div>\
										Last imported <span id="DotD_TimeSinceLastImport"></span>\
										<table><tr><td><input type="button" id="RaidImportButton" onclick="RaidCatcher.request.raids()" value="Import" /></td>\
										<td><span id="ImportSelectSpan" style="display:none;"> \
										From the last <input type="text" id="ImportSelectNum" size="2" value="1" maxlength="2" class="numeric_textbox"> </span></td>\
										<td><select id="ImportSelect">\
											<option value="All">All</option>\
											<option selected value="Latest">Latest</option>\
											<option value="mi">Minutes</option>\
											<option value="hh">Hours</option>\
											<option value="dd">Days</option>\
										</select></td></tr>\
										<tr><td colspan="5"><input type="checkbox" id="RaidCatcher_options_joinAfterImport" /> Join raids after importing.</td></tr></table>\
									<hr></div>\
								</div>\
								<div id="ImportingSubmissionDiv" class="collapsible_panel"> \
									<p class="panel_handle spritegame mts opened_link" style="text-align:left" onclick="RaidCatcher.ui.toggleDisplay(\'ImportingSubmission\', this);"> <a> Direct Submission </a> </p> \
									<div id="ImportingSubmission"><hr> \
										<table><tr><td colspan="2"><input type="text" size="20" id="RaidSubmissionText" helptext="This allows you to submit raids directly to the central database."></td></tr>\
										<tr><td style="white-space:nowrap"><span>Make public </span><span id="SubmitSelectSpan" style="display:none">after <input type="text" id="SubmitSelectNum" size="2" maxlength="3" value="30" class="numeric_textbox"></span></td>\
										<td><select id="RaidSubmissionSelect" helptext="This will allow you to submit a raid that will not be shared for a specified amount of time.  You will be credited for submission if the raid is still alive when it is made public.">\
											<option selected value="now">Immediately</option>\
											<option value="mi">Minutes</option>\
										</select></td></tr>\
										<tr><td colspan="2"><input type="button" value="Submit Raid" onclick="RaidCatcher.request.submitRaid()"></td></tr>\
										<tr><td id="RaidSubmissionResult" style="height:50px" colspan="2">&nbsp;</td></tr></table>\
									<hr></div>\
								</div>\
								<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">\
									<input type="hidden" name="cmd" value="_s-xclick">\
									<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----MIIHLwYJKoZIhvcNAQcEoIIHIDCCBxwCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYCuQY9qmxwTIq28pcDycyXCaHIS4duevOm7idfkJfxRnSaWwhias0DryLETl+VNmsrxWjU5b4b73hYy0+KGLHNw8Hoo38WfAxPf2TA6WwZCDF3D2WV7SmDp0F3/JJ+cJQkYzwbmEhTdjJ/I4Y0ee8qm920PE4Z+StMxEUC0CvWV1TELMAkGBSsOAwIaBQAwgawGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQIh8teVmJr0/SAgYjQg3jhu3ttFy9Y7yBenTWZu/x/HMP8KKjOs9H/gV6Tm7uo103f/q5imoH68Rk7UU9O5MqO/WQuYRbkTOANiYOrUlBeSvgXC7Tfz+wa4RzVibnj9lsziwoT+mA5XTN35XkrNzjQWuwZmbwWQfLDkx7/o9ffnTlk9JCZaqXDE5OHTK5dorbHmYjwoIIDhzCCA4MwggLsoAMCAQICAQAwDQYJKoZIhvcNAQEFBQAwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMB4XDTA0MDIxMzEwMTMxNVoXDTM1MDIxMzEwMTMxNVowgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBR07d/ETMS1ycjtkpkvjXZe9k+6CieLuLsPumsJ7QC1odNz3sJiCbs2wC0nLE0uLGaEtXynIgRqIddYCHx88pb5HTXv4SZeuv0Rqq4+axW9PLAAATU8w04qqjaSXgbGLP3NmohqM6bV9kZZwZLR/klDaQGo1u9uDb9lr4Yn+rBQIDAQABo4HuMIHrMB0GA1UdDgQWBBSWn3y7xm8XvVk/UtcKG+wQ1mSUazCBuwYDVR0jBIGzMIGwgBSWn3y7xm8XvVk/UtcKG+wQ1mSUa6GBlKSBkTCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb22CAQAwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCBXzpWmoBa5e9fo6ujionW1hUhPkOBakTr3YCDjbYfvJEiv/2P+IobhOGJr85+XHhN0v4gUkEDI8r2/rNk1m0GA8HKddvTjyGw/XqXa+LSTlDYkqI8OwR8GEYj4efEtcRpRYBxV8KxAW93YDWzFGvruKnnLbDAF6VR5w/cCMn5hzGCAZowggGWAgEBMIGUMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTQwMTI2MTkyODU2WjAjBgkqhkiG9w0BCQQxFgQU5D9lc6la9fDYL6ONMtRTIeZpnYwwDQYJKoZIhvcNAQEBBQAEgYAdLbz8rkN4HR9AIVIbNDikWR/usiFxv1nsm6fKLZu89hmwPK/hMY67YXK0zj8MaDljyr8BBEFzmqBxzjYV6qIEaCwNY6okpri05HAlKBshbNuEeM004ErpkVchdC+u5sdUybj/8gmkztipLcdC6dYIYuhBLDv8mSYK4caLctA9rw==-----END PKCS7-----\
									">\
									<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">\
									<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">\
								</form>\
							</div> \
						</li> \
						<li class="tab"> \
							<div class="tab_head">Options</div> \
							<div class="tab_pane"> \
								<div id="RaidListOptionsDiv" class="collapsible_panel"> \
									<p class="panel_handle spritegame mts opened_link" style="text-align:left" onclick="RaidCatcher.ui.toggleDisplay(\'RaidListOptions\', this)"> <a> Raid list options </a> </p> \
									<div id="RaidListOptions"> \
										<hr>\
										<input type="checkbox" tabIndex="54" id="RaidCatcher_options_hideVisitedRaidsList"> Hide visited raids in list<br> \
										<input type="checkbox" tabIndex="54" id="RaidCatcher_options_pruneFromServer"> <span helptext="This will cause your raids to be marked as dead on import from raids that the server has identified as dead.">Prune raids from server dead list.</span><br> \
										<input type="checkbox" id="RaidCatcher_options_storeRaidsLocally"> <span helptext="Checking this option will cause raids to be stored locally, and retrieved when the page is initially loaded.  This can cause longer loading times and RAM usage, but will prevent raids you have already seen previously from being added again.">Store raids locally.</span><br>\
										<input type="button" value="Clear Dead Cache" onclick="RaidCatcher.storage..wipeDeadCache()" /><br>\
										<hr>\
									</div> \
								</div> \
								<div id="ToolbarOptionsDiv" class="collapsible_panel"> \
									<p class="panel_handle spritegame mts opened_link" style="text-align:left" onclick="RaidCatcher.ui.toggleDisplay(\'ToolbarOptions\', this)"> <a> Toolbar Configuration </a> </p> \
									<div id="ToolbarOptions"> \
										<hr>\
										<input type="checkbox" id="RaidCatcher_options_autohideToolbar"> Auto hide toolbar<br> \
										<div id="RaidCatcher_options_toolbar_item_edit" style="width:100%">\
											<table>\
												<tr><td align="right" valign="top">Item:</td><td style="width:85%"><select id="RaidCatcher_options_toolbar_items" multiple style="width:100%;height:80px"></select></td></tr>\
												<tr><td align="right">Icon:</td><td id="RaidCatcher_options_toolbar_item_icon_container" style="width:80%"></td></tr>\
												<tr><td align="right">Name:</td><td style="width:80%"><input type="text" id="RaidCatcher_options_toolbar_item_name" style="width:100%"></td></tr>\
												<tr><td align="right">Chat:</td><td style="width:80%"><input type="text" id="RaidCatcher_options_toolbar_item_chat" style="width:100%"></td></tr>\
												<tr><td align="right">URL:</td><td style="width:80%"><input type="text" id="RaidCatcher_options_toolbar_item_url" style="width:100%"></td></tr>\
											</table>\
											<input type="button" id="RaidCatcher_options_toolbar_item_save" value="Save" disabled="true">\
											<input type="button" id="RaidCatcher_options_toolbar_item_delete" value="Delete" disabled="true">\
											<input type="button" id="RaidCatcher_options_toolbar_item_add" value="Add">\
										</div>\
										<hr>\
									</div> \
								</div> \
								<div id="ChatOptionsDiv" class="collapsible_panel dotd_kong_option"> \
									<p class="panel_handle spritegame mts opened_link" style="text-align:left" onclick="RaidCatcher.ui.toggleDisplay(\'ChatOptions\', this)"> <a> Chat options </a> </p> \
									<div id="ChatOptions"> \
										<hr>\
										<input type="checkbox" id="RaidCatcher_options_outputRaidStatusInChat"> Show raid status in chat on startup and import.<br> \
										<input type="checkbox" id="RaidCatcher_options_filterChatLinks"> Hide filtered raids in chat <br> \
										<input type="checkbox" id="RaidCatcher_options_hideChatLinks"> Hide all raid links in chat <br> \
										<input type="checkbox" id="RaidCatcher_options_hideChatSeenLinks"> Hide seen raids in chat <br> \
										<input type="checkbox" id="RaidCatcher_options_hideChatVisitedLinks"> Hide visited raids in chat <br> \
										<input type="checkbox" id="RaidCatcher_options_convertAllLinks"> Make all chat links clickable. <br> \
										<input type="checkbox" id="RaidCatcher_options_formatRaids"> <span helptext="Set formatting options for raid links posted in chat.<br><strong>See the userscript page for a list of all formatting options.</strong>">Enable Raid Link Formatting</span><br> \
										<textarea id="RaidCatcher_options_raidLinkFormat" style="height:29px;width:260px">'+RaidCatcher.settings.raidLinkFormat+'</textarea> \
										<hr>\
									</div> \
								</div> \
							</div> \
						</li> \
						<li class="tab"> \
							<div class="tab_head">Filters</div> \
							<div class="tab_pane" style="overflow:auto"> \
								<div id="dotd_raid_filters" class="collapsible_panel"> \
									<p class="panel_handle spritegame mts opened_link" style="text-align:left" onclick="RaidCatcher.ui.toggleDisplay(\'RaidFilters\', this)"> <a> Raid Filters </a> </p> \
									<div id="RaidFilters"> \
										<hr>\
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'DotDFilterSmall\',this,null,\'Small Raids [-]\');return false;">Small Raids [+]</a><br> \
											<table id="DotDFilterSmall" style="display:none">\
												<tr><td><b>Raid</td><td><b>N</b></td><td><b>H</b></td><td><b>L</b></td><td><b>NM</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'DotDFilterMedium\',this,null,\'Medium Raids [-]\');return false;">Medium Raids [+]</a><br> \
											<table id="DotDFilterMedium" style="display:none">\
												<tr><td><b>Raid</td><td><b>N</b></td><td><b>H</b></td><td><b>L</b></td><td><b>NM</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'DotDFilterLarge\',this,null,\'Large Raids [-]\');return false;">Large Raids [+]</a><br> \
											<table id="DotDFilterLarge" style="display:none">\
												<tr><td><b>Raid</td><td><b>N</b></td><td><b>H</b></td><td><b>L</b></td><td><b>NM</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'DotDFilterEpic\',this,null,\'Epic Raids [-]\');return false;">Epic Raids [+]</a><br> \
											<table id="DotDFilterEpic" style="display:none">\
												<tr><td><b>Raid</td><td><b>N</b></td><td><b>H</b></td><td><b>L</b></td><td><b>NM</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'DotDFilterColossal\',this,null,\'Colossal Raids [-]\');return false;">Colossal Raids [+]</a><br> \
											<table id="DotDFilterColossal" style="display:none">\
												<tr><td><b>Raid</td><td><b>N</b></td><td><b>H</b></td><td><b>L</b></td><td><b>NM</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<div class="dotd_kong_option"> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'DotDFilterGuild\',this,null,\'Guild Raids [-]\');return false;">Guild Raids [+]</a><br> \
											<table id="DotDFilterGuild" style="display:none">\
												<tr><td><b>Raid</td><td><b>N</b></td><td><b>H</b></td><td><b>L</b></td><td><b>NM</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'DotDFilterSpecial\',this,null,\'Special Raids [-]\');return false;">Special Raids [+]</a><br> \
											<table id="DotDFilterSpecial" style="display:none">\
												<tr><td><b>Raid</td><td><b>N</b></td><td><b>H</b></td><td><b>L</b></td><td><b>NM</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<hr>\
									</div> \
								</div> \
								<div id="dotd_leon_filters" class="collapsible_panel"> \
									<p class="panel_handle spritegame mts opened_link" style="text-align:left" onclick="RaidCatcher.ui.toggleDisplay(\'LEONFilter\', this)"> <a helptext="This allows you to select which of the LEON tiers are displayed in raid links in chat and on the raid tab.  The default is only tiers which are above fs.  The column headers tell what types of drops you will get, for example 1/6 means one epic and 6 total drops and 2-3 means either two or 3 epic drops."> Leon Tier Filters </a> </p> \
									<div id="LEONFilter"> \
										<hr>\
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'LEONFilterSmall\',this,null,\'Small Raids [-]\');return false;">Small Raids [+]</a><br> \
											<table id="LEONFilterSmall" style="display:none">\
												<tr><td><b>Raid</td><td><b>1/5</b></td><td><b>1/6</b></td><td><b>1/8</b></td><td><b>2/9</b></td><td><b>2-3</b></td><td><b>3/9</b></td><td><b>3-4</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'LEONFilterMedium\',this,null,\'Medium Raids [-]\');return false;">Medium Raids [+]</a><br> \
											<table id="LEONFilterMedium" style="display:none">\
												<tr><td><b>Raid</td><td><b>1/5</b></td><td><b>1/6</b></td><td><b>1/8</b></td><td><b>2/9</b></td><td><b>2-3</b></td><td><b>3/9</b></td><td><b>3-4</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'LEONFilterLarge\',this,null,\'Large Raids [-]\');return false;">Large Raids [+]</a><br> \
											<table id="LEONFilterLarge" style="display:none">\
												<tr><td><b>Raid</td><td><b>1/5</b></td><td><b>1/6</b></td><td><b>1/8</b></td><td><b>2/9</b></td><td><b>2-3</b></td><td><b>3/9</b></td><td><b>3-4</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'LEONFilterEpic\',this,null,\'Epic Raids [-]\');return false;">Epic Raids [+]</a><br> \
											<table id="LEONFilterEpic" style="display:none">\
												<tr><td><b>Raid</td><td><b>1/5</b></td><td><b>1/6</b></td><td><b>1/8</b></td><td><b>2/9</b></td><td><b>2-3</b></td><td><b>3/9</b></td><td><b>3-4</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'LEONFilterColossal\',this,null,\'Colossal Raids [-]\');return false;">Colossal Raids [+]</a><br> \
											<table id="LEONFilterColossal" style="display:none">\
												<tr><td><b>Raid</td><td><b>1/5</b></td><td><b>1/6</b></td><td><b>1/8</b></td><td><b>2/9</b></td><td><b>2-3</b></td><td><b>3/9</b></td><td><b>3-4</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<div> \
											<a href="#" onclick="RaidCatcher.ui.toggleDisplay(\'LEONFilterGuild\',this,null,\'Guild Raids [-]\');return false;">Guild Raids [+]</a><br> \
											<table id="LEONFilterGuild" style="display:none">\
												<tr><td><b>Raid</td><td><b>1/5</b></td><td><b>1/6</b></td><td><b>1/8</b></td><td><b>2/9</b></td><td><b>2-3</b></td><td><b>3/9</b></td><td><b>3-4</b></td><td><b>All</b></td></tr> \
											</table>\
										</div> \
										<hr>\
									</div>\
								</div>\
							</div> \
						</li> \
					</ul> \
				').attach("to",el).ele();
				
				
				
				//sorting/searching elements
				RaidCatcher.$("#RaidBossDifficultySearch").val(RaidCatcher.settings.bossSearchDiff);
				RaidCatcher.$("#RaidBossNameSearch").val(RaidCatcher.settings.bossSearchString);
				RaidCatcher.$("#RaidSortSelection").val(RaidCatcher.settings.raidSortSelection);
				RaidCatcher.$("#RaidSortDirection").val(RaidCatcher.settings.raidSortDirection);
				RaidCatcher.ui.loadQuickFilters();
				
				//importing elements
				var e = RaidCatcher.$("#ImportSelect").ele();
				e.addEventListener('change', function () {
					if(this.value == 'Latest' || this.value == 'All'){ 
						RaidCatcher.$("#ImportSelectSpan").ele().style.display = 'none';
						RaidCatcher.$("#ImportSelectNum").val(-1);
					}else RaidCatcher.$("#ImportSelectSpan").ele().style.display = 'block';
				});
				
				var e = RaidCatcher.$("#RaidSubmissionSelect").ele();
				e.addEventListener('change', function () {
					if(this.value == 'now') RaidCatcher.$("#SubmitSelectSpan").ele().style.display = 'none';
					else RaidCatcher.$("#SubmitSelectSpan").ele().style.display = 'inline';
				});
				
				//raid filtering elements
				for (var i in DotDRaidInfo.raids) {
					if (DotDRaidInfo.raids.hasOwnProperty(i)) {
						var r = DotDRaidInfo.raids[i];
						
						var row = RaidCatcher.$('tr').set({id: 'RaidCatcher_filter_'+ r.id}).html(' \
							<td>' + r.name + '</td> \
							<td><input type="checkbox" id="dotd_filter_' + r.id + '_0"/></td> \
							<td><input type="checkbox" id="dotd_filter_' + r.id + '_1"/></td> \
							<td><input type="checkbox" id="dotd_filter_' + r.id + '_2"/></td> \
							<td><input type="checkbox" id="dotd_filter_' + r.id + '_3"/></td> \
							<td><input type="checkbox" id="dotd_filter_' + r.id + '_all"/></td>\
						');
						
						var tableId = 'DotDFilter';
						if (r.stat == 'H') 
							row.attach('to', tableId + 'Guild');
						else if (r.stat == 'ESH' || r.essenceSize == 'Personal') 
							row.attach('to', tableId + 'Special');
						else
							row.attach('to', tableId + r.essenceSize);
							
						var allChecked = true;
						for(var j=0;j<4;j++){
							var cb = document.getElementById('dotd_filter_' + r.id + '_' + j);
							
							if(cb){
								cb.checked = !RaidCatcher.settings.getFilter(r.id, j);
								allChecked = (!allChecked ? false: cb.checked);
								
								if(!cb.checked){
									if(RaidCatcher.settings.filterChatLinks)
										RaidCatcher.ui.toggleCSS({id: "RaidCatcher_filteredRaidChat" + r.id + '_' + j + "Class", class:"RaidChatFilterStyle", 
											cls:".RaidCatcher_filteredRaidChat" + r.id + '_' + j + " {display: none !important})"});
									RaidCatcher.ui.toggleCSS({id: "RaidCatcher_filteredRaidList" + r.id + '_' + j + "Class", class:"RaidListFilterStyle", 
										cls:".RaidCatcher_filteredRaidList" + r.id + '_' + j + "{display: none !important}"});
								}
									
								cb.addEventListener('click', function (){
									var raidid = "";
									var diffIndex = "";
									var reg = /dotd_filter_([\.0-9a-z_]+)_([0-9])/i;
									if ((i = reg.exec(this.id)) != null) {
										raidid = i[1];
										diffIndex = parseInt(i[2]);
									}
									RaidCatcher.ui.filterRaid(raidid, diffIndex, !this.checked);
									if(!this.checked) RaidCatcher.$("#dotd_filter_" + raidid + "_all").ele().checked = false;
								});
							} else allChecked = false;
						}
						var allcb = document.getElementById('dotd_filter_' + r.id + '_all');
						if(allcb){
							if(allChecked) allcb.checked = true;
							allcb.addEventListener('click', function(){
								var reg = /dotd_filter_([\.0-9a-z_]+)_all/i;
								var raidid = "";
								if ((i = reg.exec(this.id)) != null) {
									raidid = i[1];
								}
								for (var j=0;j<4;j++) {
									RaidCatcher.$("#dotd_filter_" + raidid + "_" + j).ele().checked = this.checked;
									RaidCatcher.ui.filterRaid(raidid,j,!this.checked, false);
								}
								RaidCatcher.settings.save();
							});
						}
						
						//LEON Filtering
						if(!r.loottiers && r.essenceSize != 'Personal' && r.stat != 'ESH'){
							allChecked = true;
							var st = '<td>' + r.shortname.substring(0, r.shortname.length > 7 ? 7 : r.shortname.length).trim() + '</td>';
							for(var j = 0; j < 7; j++){
								var dis = (r.size==500 && j == 2);
								var show = RaidCatcher.settings.getLeonFilter(r.id,j);
								allChecked = allChecked && show;
								st += '<td><input type="checkbox" '+ (dis?'disabled':'') +' id="leon_filter_' + r.id + '_' + j + '" '+(!dis && show ? 'checked="checked"' : '')+'"/></td>';
							}
							st += '<td><input type="checkbox" id="leon_filter_' + r.id + '_all" '+(allChecked?'checked="checked"' : '') + '/></td>';
							
							RaidCatcher.$('tr').set({id: 'RaidCatcher_leon_'+ r.id}).html(st).attach('to', 'LEONFilter' + (r.stat=='H'?'Guild':r.essenceSize));
							
							for(var j = 0; j < 7; j++){
								RaidCatcher.$('#leon_filter_' + r.id + '_' + j).ele().addEventListener('click', function(){
									var reg = /leon_filter_([\.0-9a-z_]+)_([0-6])/i, ex;
									if ((ex = reg.exec(this.id)) != null) {
										raidid = ex[1];
										tier = parseInt(ex[2]);
										RaidCatcher.settings.setLeonFilter(raidid, tier, this.checked, true);
										if(!this.checked) RaidCatcher.$("#leon_filter_" + raidid + "_all").ele().checked = false;
									}
								});
							}
							RaidCatcher.$('#leon_filter_' + r.id + '_all').ele().addEventListener('click', function(){
								var reg = /leon_filter_([\.0-9a-z_]+)_all/i, ex, raidid;
								if ((ex = reg.exec(this.id)) != null) {
									raidid = ex[1];
									for (var j=0;j<7;j++) {
										RaidCatcher.$("#leon_filter_" + raidid + "_" + j).ele().checked = this.checked;
										RaidCatcher.settings.setLeonFilter(raidid,j,this.checked, false);
									}
								}
								RaidCatcher.settings.save();
							});
						}
					}
				}
				
				//toolbar settings elements
				var e = RaidCatcher.$('#RaidCatcher_options_autohideToolbar').ele();
				e.checked = RaidCatcher.settings.autohideToolbar;
				e.addEventListener('click', function () {
					RaidCatcher.settings.autohideToolbar = this.checked;
					autoHide();
				});
				
				var e = RaidCatcher.$("#RaidCatcher_options_toolbar_item_icon_container").ele();
				for(var i = 0; i < RaidCatcher.ui.toolIcons.length; i++){
					var ne = RaidCatcher.$('span').set({style:"padding-right:10px"}).attach("to", e).ele();
					RaidCatcher.$('input').set({type:'radio', name:'ToolbarIconRadio', value:RaidCatcher.ui.toolIcons[i]}).attach('to', ne).ele().addEventListener('change', function(){
						RaidCatcher.$('#RaidCatcher_options_toolbar_item_imageUrl').val("");
						RaidCatcher.$('#RaidCatcher_options_toolbar_item_imageUrl').ele().disabled = true;
						RaidCatcher.$('#RaidCatcher_options_toolbar_item_text').val("");
						RaidCatcher.$('#RaidCatcher_options_toolbar_item_text').ele().disabled = true;
					});
					RaidCatcher.$('span').set({class:'ChatToolbarIcon ' + RaidCatcher.ui.toolIcons[i]}).html('&nbsp;').attach('to', ne);
				}
				
				var ne = RaidCatcher.$('span').set({style:"padding-right:10px"}).attach("to", e);
				RaidCatcher.$('input').set({type:'radio', name:'ToolbarIconRadio', value:'text', id:'RaidCatcher_options_toolbar_item_textRadio'}).attach('to', ne.ele()).ele().addEventListener('change', function(){
					RaidCatcher.$('#RaidCatcher_options_toolbar_item_text').ele().disabled = !this.checked;
					RaidCatcher.$('#RaidCatcher_options_toolbar_item_imageUrl').val("");
					RaidCatcher.$('#RaidCatcher_options_toolbar_item_imageUrl').ele().disabled = true;
				});
				ne.text("Text:");
				RaidCatcher.$('input').set({type:'text', id:'RaidCatcher_options_toolbar_item_text', disabled:true, size:3, maxlength:2}).attach('to', ne.ele());
				
				var ne = RaidCatcher.$('div').attach("to", e);
				RaidCatcher.$('input').set({type:'radio', name:'ToolbarIconRadio', value:'url', size:12, id:'RaidCatcher_options_toolbar_item_imageUrlRadio'}).attach('to', ne.ele()).ele().addEventListener('change', function(){
					RaidCatcher.$('#RaidCatcher_options_toolbar_item_text').val("");
					RaidCatcher.$('#RaidCatcher_options_toolbar_item_text').ele().disabled = true;
					RaidCatcher.$('#RaidCatcher_options_toolbar_item_imageUrl').ele().disabled = !this.checked;
				});
				ne.text("Image Url:");
				RaidCatcher.$('input').set({type:'text', id:'RaidCatcher_options_toolbar_item_imageUrl', disabled:true}).attach('to', ne.ele());
				
				RaidCatcher.$("#RaidCatcher_options_toolbar_items").ele().addEventListener("change", function () {
					var t;
					for(var i = 0; i < RaidCatcher.settings.tools.length; i++){
						if(RaidCatcher.settings.tools[i].id == RaidCatcher.$(this).val()){
							t = RaidCatcher.settings.tools[i];
							break;
						}
					}
					if(t){
						RaidCatcher.$('#RaidCatcher_options_toolbar_item_save').ele().disabled = RaidCatcher.$('#RaidCatcher_options_toolbar_item_delete').ele().disabled = false;
						RaidCatcher.$('#RaidCatcher_options_toolbar_item_name').val(t.tooltip);
						if(typeof t.func === 'undefined'){
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_chat').val(t.chat);
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_url').val(t.url);
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_chat').ele().disabled = RaidCatcher.$('#RaidCatcher_options_toolbar_item_url').ele().disabled = false;
						}else{
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_chat').val("Custom function");
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_url').val("Custom function");
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_chat').ele().disabled = RaidCatcher.$('#RaidCatcher_options_toolbar_item_url').ele().disabled = true;
						}
						
						
						if(t.text||'' != ''){
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_text').ele().disabled = false;
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_text').val(t.text);
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_textRadio').ele().checked = true;
						} else if (t.bg||'' != ''){
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_imageUrl').ele().disabled = false;
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_imageUrl').val(t.bg);
							RaidCatcher.$('#RaidCatcher_options_toolbar_item_imageUrlRadio').ele().checked = true;
						} else {
							var eles = document.getElementsByName("ToolbarIconRadio");
							for(var i = 0; i < eles.length; i++) 
								eles[i].checked = eles[i].value==t.class;
						}
					}
				});
				
				RaidCatcher.$("#RaidCatcher_options_toolbar_item_save").ele().addEventListener("click", function () {
					var eles = document.getElementsByName("ToolbarIconRadio"), i;
					for(i = 0; i < RaidCatcher.settings.tools.length; i++){
						if(RaidCatcher.settings.tools[i].id == RaidCatcher.$("#RaidCatcher_options_toolbar_items").val()) 
							break;
					}
					for(var j = 0; j < eles.length; j++)
						if(eles[j].checked){
							if(eles[j].value=='url'){ 
								RaidCatcher.settings.tools[i].bg = RaidCatcher.$("#RaidCatcher_options_toolbar_item_imageUrl").val();
								RaidCatcher.settings.tools[i].class = '';
								RaidCatcher.settings.tools[i].text = '';
							}else if (eles[j].value=='text'){
								RaidCatcher.settings.tools[i].bg = '';
								RaidCatcher.settings.tools[i].class = '';
								RaidCatcher.settings.tools[i].text = RaidCatcher.$("#RaidCatcher_options_toolbar_item_text").val()
							}else{ 
								RaidCatcher.settings.tools[i].bg = '';
								RaidCatcher.settings.tools[i].class = eles[j].value;
								RaidCatcher.settings.tools[i].text = '';
							}
						}
						
					RaidCatcher.settings.tools[i].tooltip = RaidCatcher.$('#RaidCatcher_options_toolbar_item_name').val();
					RaidCatcher.settings.tools[i].chat = RaidCatcher.$('#RaidCatcher_options_toolbar_item_chat').val();
					RaidCatcher.settings.tools[i].url = RaidCatcher.$('#RaidCatcher_options_toolbar_item_url').val();
					RaidCatcher.settings.save();
					RaidCatcher.ui.addTools();
				});
				
				RaidCatcher.$("#RaidCatcher_options_toolbar_item_delete").ele().addEventListener("click", function () {
					var i;
					for(i = 0; i < RaidCatcher.settings.tools.length; i++){
						if(RaidCatcher.settings.tools[i].id == RaidCatcher.$("#RaidCatcher_options_toolbar_items").val())
							break;
					}
					RaidCatcher.$('#RaidCatcher_options_toolbar_item_name').val("");
					RaidCatcher.$('#RaidCatcher_options_toolbar_item_chat').val("");
					RaidCatcher.$('#RaidCatcher_options_toolbar_item_url').val("");
					var eles = document.getElementsByName("ToolbarIconRadio");
					for(var j = 0; j < eles.length; j++) eles[j].checked = false;
					
					RaidCatcher.settings.tools.splice(i,1);
					RaidCatcher.settings.save();
					RaidCatcher.ui.addTools();
				});
				
				RaidCatcher.$("#RaidCatcher_options_toolbar_item_add").ele().addEventListener("click", function () {
					var eles = document.getElementsByName("ToolbarIconRadio"), icon, text;
					for(var i = 0; i < eles.length; i++)
						if(eles[i].checked){
							if(eles[i].value=='url') icon = RaidCatcher.$("#RaidCatcher_options_toolbar_item_imageUrl").val();
							else if (eles[i].value=='text') text = RaidCatcher.$("#RaidCatcher_options_toolbar_item_text").val();
							else icon = eles[i].value;
						}
					
					if(!RaidCatcher.ui.addTool(
						RaidCatcher.$('#RaidCatcher_options_toolbar_item_name').val(),
						RaidCatcher.$('#RaidCatcher_options_toolbar_item_chat').val(),
						RaidCatcher.$('#RaidCatcher_options_toolbar_item_url').val(),
						icon, text
					)) alert("A toolbar item already exists with this name.  Please give your custom toolbar item a unique name.");
				});
				
				//option settings elements
				RaidCatcher.$('style').set({type: "text/css",id:'RaidCatcher_visitedRaidListClass'}).text('.RaidCatcher_visitedRaidList{display: '+(RaidCatcher.settings.hideVisitedRaidsInRaidList == true?'none !important':'block')+'}').attach('to',document.head);
				var e = RaidCatcher.$('#RaidCatcher_options_hideVisitedRaidsList').ele();
				e.checked = RaidCatcher.settings.hideVisitedRaidsInRaidList;
				e.addEventListener('click', function () {
					RaidCatcher.settings.hideVisitedRaidsInRaidList = this.checked;
					RaidCatcher.ui.toggleCSS({id: "RaidCatcher_visitedRaidListClass", cls:".RaidCatcher_visitedRaidList{display:"+(this.checked == true?'none !important':'block')+"}"})
				});
				
				var e = RaidCatcher.$('#RaidCatcher_options_pruneFromServer').ele();
				e.checked = RaidCatcher.settings.pruneFromServer;
				e.addEventListener('click', function () {
					RaidCatcher.settings.pruneFromServer = this.checked;
					RaidCatcher.settings.save();
				});
				
				var e = RaidCatcher.$("#RaidCatcher_options_joinAfterImport").ele();
				e.checked = RaidCatcher.settings.joinAfterImport;
				e.addEventListener('click', function() {
					RaidCatcher.settings.joinAfterImport = this.checked;
					RaidCatcher.storage.save();
				});
				
				var e = RaidCatcher.$("#RaidCatcher_options_storeRaidsLocally").ele();
				e.checked = RaidCatcher.settings.storeRaidsLocally;
				e.addEventListener('click', function() {
					RaidCatcher.settings.storeRaidsLocally = this.checked;
					RaidCatcher.storage.save();
				});
				if(session.platformId==1){//kong only options
					var e = RaidCatcher.$('#RaidCatcher_options_outputRaidStatusInChat').ele();
					e.checked = RaidCatcher.settings.outputRaidStatus;
					e.addEventListener('click', function () {
						RaidCatcher.settings.outputRaidStatus = this.checked;
						RaidCatcher.settings.save();
					});
					
					var e = RaidCatcher.$('#RaidCatcher_options_filterChatLinks').ele();
					e.checked = RaidCatcher.settings.filterChatLinks;
					e.addEventListener('click', function () {
						RaidCatcher.settings.filterChatLinks = this.checked;
						if(!this.checked){
							var s = document.getElementsByClassName('RaidChatFilterStyle');
							for(var i=0; i<s.length;i++){
								s[i].parentNode.removeChild(s[i]);
							}
						} else {
							for (var i in DotDRaidInfo.raids) {
								if (DotDRaidInfo.raids.hasOwnProperty(i)) {
									var raid = DotDRaidInfo.raids[i];
									for (var j=0; j<4; j++) {
										if(RaidCatcher.settings.getFilter(raid.id,j))
											RaidCatcher.ui.toggleCSS({id: "RaidCatcher_filteredRaidChat" + raid.id + '_' + j + "Class", class:'RaidChatFilterStyle',
												cls:".RaidCatcher_filteredRaidChat" + raid.id + '_' + j + "{display: none !important}"});
									}
								}
							}
						}
					});
					
					var e = RaidCatcher.$('#RaidCatcher_options_hideChatLinks').ele();
					RaidCatcher.ui.toggleCSS({id: "RaidCatcher_raidClass", cls:".RaidCatcher_raid{display: "+(RaidCatcher.settings.hideChatLinks?'none !important':'block')+"}"});
					e.checked = RaidCatcher.settings.hideChatLinks;
					e.addEventListener('click', function () {
						RaidCatcher.settings.hideChatLinks = this.checked;
						RaidCatcher.$('#RaidCatcher_options_hideChatSeenLinks').ele().disabled = this.checked;
						RaidCatcher.$('#RaidCatcher_options_hideChatVisitedLinks').ele().disabled = this.checked;
						RaidCatcher.ui.toggleCSS({id: "RaidCatcher_raidClass", cls:".RaidCatcher_raid{display: "+(this.checked?'none !important':'block')+"}"});
					});
					
					var e = RaidCatcher.$('#RaidCatcher_options_hideChatSeenLinks').ele();
					RaidCatcher.ui.toggleCSS({id: "RaidCatcher_seenRaidClass", cls:".RaidCatcher_seenRaid{display: "+(RaidCatcher.settings.hideChatSeenLinks?'none !important':'block')+"}"});
					e.checked = RaidCatcher.settings.hideChatSeenLinks;
					e.addEventListener('click', function () {
						RaidCatcher.settings.hideChatSeenLinks = this.checked;
						RaidCatcher.ui.toggleCSS({id: "RaidCatcher_seenRaidClass", cls:".RaidCatcher_seenRaid{display: "+(this.checked?'none !important':'block')+"}"});
					});
					
					var e = RaidCatcher.$('#RaidCatcher_options_hideChatVisitedLinks').ele();
					RaidCatcher.ui.toggleCSS({id: "RaidCatcher_visitedRaidClass", cls:".RaidCatcher_visitedRaid{display: "+(RaidCatcher.settings.hideChatVisitedLinks?'none !important':'block')+"}"});
					e.checked = RaidCatcher.settings.hideChatVisitedLinks;
					e.addEventListener('click', function () {
						RaidCatcher.settings.hideChatVisitedLinks = this.checked;
						RaidCatcher.ui.toggleCSS({id: "RaidCatcher_visitedRaidClass", cls:".RaidCatcher_visitedRaid{display: "+(this.checked?'none !important':'block')+"}"});
					});
					
					var e = RaidCatcher.$("#RaidCatcher_options_convertAllLinks").ele();
					e.checked = RaidCatcher.settings.convertAllLinks;
					e.addEventListener('click', function () {
						RaidCatcher.settings.convertAllLinks = this.checked;
					});
					
					var e = RaidCatcher.$('#RaidCatcher_options_formatRaids').ele();
					e.checked = RaidCatcher.settings.formatRaidLinks;
					e.addEventListener('click', function () {
						RaidCatcher.settings.formatRaidLinks = this.checked;
						RaidCatcher.$('#RaidCatcher_options_raidLinkFormat').ele().disabled = !this.checked;
					});
					
					var e = RaidCatcher.$('#RaidCatcher_options_raidLinkFormat').ele();
					e.disabled = !RaidCatcher.settings.formatRaidLinks;
					e.addEventListener('change', function () {
						RaidCatcher.settings.raidLinkFormat = this.value;
					});
					
					//Raid selection/joining
					var selectAllCheckbox = RaidCatcher.$('#dotd_selection_all_checkbox');
					if(/all/i.test(RaidCatcher.settings.selectedRaids)){
						selectAllCheckbox.ele().checked = 'checked';
						var e = pane.getElementsByClassName("raid_selection");
						for(i=0;i<e.length;i++)
							e[i].disabled = true;
					}
					selectAllCheckbox.ele().addEventListener('click', function(){
						var e = pane.getElementsByClassName("raid_selection");
						for(i=0;i<e.length;i++)
							e[i].disabled = this.checked;
						if(this.checked)
							RaidCatcher.settings.selectedRaids += "all_";
						else
							RaidCatcher.settings.selectedRaids = RaidCatcher.settings.selectedRaids.replace(/all_/ig, "");
							
						RaidCatcher.ui.updateSelectedRaidCount();
					});
					
					var e = pane.getElementsByClassName("raid_selection");
					for(i=0;i<e.length;i++){
						var curel = e[i];
						var regex = new RegExp(curel.value, "ig");
						if(regex.test(RaidCatcher.settings.selectedRaids)) curel.checked = 'checked';
						curel.addEventListener('click', function(){
							var rs = document.DotDActionsForm[this.name];
							for(j=0;j<rs.length;j++) 
								RaidCatcher.settings.selectedRaids = RaidCatcher.settings.selectedRaids.replace(new RegExp(rs[j].value, "ig"), "");
							if(this.checked) 
								RaidCatcher.settings.selectedRaids += this.value;
							RaidCatcher.ui.updateSelectedRaidCount();
						});
					}
				} else {
					var e = pane.getElementsByClassName('dotd_kong_option');
					for(var i=0; i<e.length; i++) e[i].style.display = 'none';
				}
				
				
				//tab styling
				var e = pane.getElementsByClassName("tab_head")
				for (var i = 0;i<e.length;i++) {
					e[i].addEventListener("click",RaidCatcher.ui.tabClick);
				}
				
				//make numeric textboxes
				var e = pane.getElementsByClassName("numeric_textbox");
				for(var i = 0; i < e.length; i++){ 
					e[i].addEventListener('keyup', RaidCatcher.util.numbersOnlyKeyUp);
					e[i].addEventListener('keydown', RaidCatcher.util.numbersOnly);
				}
				
				//populate raids
				if(RaidCatcher.settings.storeRaidsLocally){
					RaidCatcher.storage.importing = true;
					for(var i in RaidCatcher.storage.raids){
						if(RaidCatcher.storage.raids.hasOwnProperty(i)){
							this.addRaid(i, false);
						}
					}
					RaidCatcher.storage.importing = false;
					this.raidSort();
					this.raidSearch();
				}
				
				setTimeout(function () { RaidCatcher.ui.addTabs(); RaidCatcher.ui.initToolbar(); RaidCatcher.ui.applyTooltips(); RaidCatcher.ui.isInit = true;}, 3000);
				this.updateMessage();
				var st = RaidCatcher.settings.updateImportInfo();
				if(RaidCatcher.settings.outputRaidStatus){
					if(st == "") st = "All raid sizes are up to date.";
					RaidCatcher.chat.echo("RaidCatcher initialized.<br>"+st);
				}
				delete this.init;
			},
			filterRaid: function(boss, diff, flt, save){
				RaidCatcher.settings.setFilter(boss, diff, flt, save);
				RaidCatcher.ui.toggleCSS({id: "RaidCatcher_filteredRaidChat" + boss + '_' + diff + "Class", class:"RaidChatFilterStyle",
					cls:".RaidCatcher_filteredRaidChat" + boss + '_' + diff + "{display: "+(flt&&RaidCatcher.settings.filterChatLinks?'none !important':'block')+"}"});
				RaidCatcher.ui.toggleCSS({id: "RaidCatcher_filteredRaidList" + boss + '_' + diff + "Class", class:"RaidListFilterStyle",
					cls:".RaidCatcher_filteredRaidList" + boss + '_' + diff + "{display: "+(flt?'none !important':'block')+"}"});
			},
			toggleDisplay: function(el, sender, el2, str){
				if(typeof el == "string") el = document.getElementById(el);
				if(typeof el2 == "string") el2 = document.getElementById(el2);
				if(el.style.display == "none"){
					el.style.display = "block";
					if(typeof sender == "object") sender.className = sender.className.replace("closed_link", "opened_link");
					if(el2) el2.style.height = (el2.offsetHeight - el.offsetHeight - parseInt(el.offsetHeight/8)) + "px";
					if(str){ sender.prevHTML = sender.innerHTML; sender.innerHTML = str; }
				}else{
					h = el.offsetHeight;
					el.style.display = "none";
					if(typeof sender == "object") sender.className = sender.className.replace("opened_link", "closed_link");
					if(el2) el2.style.height = (el2.offsetHeight+h+parseInt(h/8)) + "px";
					if(sender.prevHTML) sender.innerHTML = sender.prevHTML;
				}
				delete this.init;
			},
			addRaid: function(r, sort){//must have been added to the RaidCatcher.storage.raids list first
				if(typeof r == 'string' || typeof r == 'number') r = RaidCatcher.storage.raids[r];
				sort = (typeof sort == 'boolean'?sort:true);
				var name = (DotDRaidInfo.raids[r.boss]||{name:'Unknown'}).name;
				if(name.length > 22) name = name.substring(0, 22);
				var item = RaidCatcher.$('div').set({
					id:'DotDRaid_'+r.id, 
					raidid:r.id, 
					open:0, 
					class:'DotDRaidItem RaidDiff'+r.diff+' RaidCatcher_filteredRaidList'+r.boss+'_'+(r.diff-1)+(r.visited?" RaidCatcher_visitedRaidList":"")
				}).html('\
					<div class="raidHead">\
						<span class="link">[<a class="RaidLink" href="'+RaidCatcher.util.getRaidUrl(r)+'" onmousedown="RaidCatcher.ui.linkMouseDown(event,'+r.id+');" onclick="return false;">Link</a>]</span>&nbsp;\
						<span class="diff">'+['N','H','L','NM'][r.diff-1]+'</span> \
						<span class="name">'+name+'<span class="hidden">'+r.boss+'</span></span>\
						<span class="visited">'+(r.visited?'visited':'')+'</span>\
						<a class="delete" href="#" style="display:none" onclick="RaidCatcher.storage.removeRaid('+r.id+');RaidCatcher.storage.save();return false;">delete</a><br>\
					</div>\
					</span>\
				').attach('first', 'dotd_raid_list').ele();
				item.getElementsByClassName('raidHead')[0].addEventListener('click', function(e){
					if(e.target.className != "RaidLink"){
						var el = RaidCatcher.$(this.parentNode);
						if(parseInt(el.get('open'))){
							el.set({open:0}).remove('.moreInfo').hide('.delete').show('.visited');
						} else {
							var r = RaidCatcher.storage.raids[el.get('raidid')];
							RaidCatcher.$('div').set({class:'moreInfo'}).html(RaidCatcher.ui.makeRaidInfo(r)).attach('to', el.set({open:1}).hide('.visited').show('.delete').ele());
						}
					}
				});
				if(!RaidCatcher.storage.importing){
					this.updateSelectedRaidCount();
					if(sort) setTimeout(RaidCatcher.ui.raidSort,1);
				}
			},
			linkMouseDown: function(e,r, chat){
				console.log("[RaidCatcher] linkMouseDown " + r + " : " + chat);
				var t = 1
				if(e.which==1){
					if(RaidCatcher.game.joining){
						if(typeof r != 'object') r = RaidCatcher.storage.getRaid(r);
						RaidCatcher.game.joinRaidList.splice(RaidCatcher.game.joinRaidIndex+1, 0, r);
					} else RaidCatcher.game.joinRaid(r);
				} else if(e.which==3) t=2000;
				if(session.platformId!=1 || e.which==3)
					setTimeout(function(){RaidCatcher.ui.markRaidVisited(r)}, t);
			},
			makeRaidInfo: function(r){
				if(typeof r != 'object') r = RaidCatcher.storage.raids[r];
				r = RaidCatcher.util.getRaidInfoBase(r);
				var ret = '<div>\
						<table style="margin:0 auto;width:99%" border="0">\
						<tr><td colspan="2" style="height:2px;background-color:#AAAAAA"></td></tr>\
						<tr><td>Posted by:</td><td align="right">'+r.user+'<br>Room ' +r.room+'</td></tr>\
						<tr><td>Time:</td><td align="right">'+(typeof r.timeStamp == 'number'?dateFormat(new Date(r.timeStamp), 'ddd, h:MM TT')+'<br>'+RaidCatcher.util.timeSince(r.timeStamp)+'':'Unrecognized time stamp')+'</td></tr>\
						<tr><td colspan="2" style="height:2px;background-color:#AAAAAA"></td></tr>\
						<tr><td>Difficulty:</td><td align="right">'+["Normal","Hard","Legendary","Nightmare","Insane","Hell"][r.diff -1]+'</td></tr>\
						<tr><td>Stat</td><td align="right">'+r.statText+'</td></tr>\
						<tr><td>Size:</td><td align="right">'+r.size+'</td></tr>\
						<tr><td>Classification:</td><td align="right">'+r.classification()+'</td></tr>\
						<tr><td>Health:</td><td align="right">'+r.healthText+'</td></tr>'
					ret += '<tr><td>Fair Share:</td><td align="right">'+r.fairShareText+'</td></tr>';
					ret += '<tr><td>Loot tiers:</td><td align="right">'+(r.optimalShareText||'Unknown')+'</td></tr>'
						
				ret += '</table><center><input type="checkbox" '+(r.seen?'checked="checked"':'')+' onclick="RaidCatcher.storage.raids['+r.id+'].seen=this.checked;RaidCatcher.ui.toggleRaid(\'seen\','+r.id+', this.checked);"> Seen&nbsp;&nbsp;\
						<input type="checkbox" '+(r.visited?'checked="checked"':'')+' onclick="RaidCatcher.ui.markRaidVisited('+r.id+', this.checked);"> Visited</center>\
					 </div>'
				return ret;
			},
			removeRaid: function(r){
				if(typeof r == 'object') r = r.id;
				var el = document.getElementById('DotDRaid_'+r);
				if(el) el.parentNode.removeChild(el);
				
				var els = document.getElementsByClassName('RaidCatcher_raid_'+r);
				console.log("[RaidCatcher] ui.removeRaid " + r + " : " + els.length);
				if(els.length) for(i=0;i<els.length;i++){
					els[i].parentNode.removeChild(els[i]);
				}
			},
			clearRaids: function(){
				var raidDiv=document.getElementById('dotd_raid_list');
				while(raidDiv.firstChild) raidDiv.removeChild(raidDiv.firstChild);
			},
			markRaidVisited: function(r, b){
				b=(typeof b === 'undefined'?true:b);
				r=(typeof r == 'object'?r.id:r);
				if(!RaidCatcher.game.joining) console.log('[RaidCatcher] markRaidVisited ' + r + ' : ' + b);
				if(RaidCatcher.storage.raids.hasOwnProperty(r)) RaidCatcher.storage.raids[r].visited = b;
				var el = document.getElementById('DotDRaid_'+r);
				if(el) el.getElementsByClassName('visited')[0].innerHTML = (b?'visited':'');
				this.toggleRaid('visited', r, b);
				if(!RaidCatcher.storage.importing) this.updateSelectedRaidCount()
			},
			updateSelectedRaidCount: function () {
				if(RaidCatcher.game.joining || RaidCatcher.storage.importing) return;
				var el = document.getElementById("selected_raid_count");
				if(el && el.offsetHeight + el.offsetWidth > 0){
					var raids = this.getSelectedRaids();
					el.innerHTML = raids.length + " selected";
					delete raids;
				}
			},
			getSelectedRaids: function (s, sort) {
				var r = [];
				sort = (typeof sort==='undefined'?false:sort);
				s = (typeof s == 'string'?s:RaidCatcher.settings.selectedRaids);
				if(!/visited/.test(s) && !/new/.test(s)) s += 'visited_new_';
				console.log("[RaidCatcher] getSelectedRaids " + s);
				if(!RaidCatcher.game.joining) console.log("[RaidCatcher] Getting " + s);
				if(s != ""){
					var raids = RaidCatcher.storage.getRaids();
					var re = RaidCatcher.ui.getRaidSearchBossRegex(),
						pRe = new RegExp(RaidCatcher.$("#PostedNameSearch").val(), "i"), pSw = RaidCatcher.$("#PostedNameSwitch").val(),
						room = RaidCatcher.$("#RoomNameSearch").val(), roomSw = RaidCatcher.$("#RoomNameSwitch").val();
					var ageSearch = parseInt(RaidCatcher.$("#AgeSearch").val())||0;
					var ageTime = ageSearch==0?0:new Date().getTime()-(ageSearch*parseInt(RaidCatcher.$("#AgeTimeSwitch").val()));
					var isBefore = RaidCatcher.$("#AgeSwitch").val()>0;
					for(i=raids.length-1; i>=0; i--) {
						var raid = raids[i];
						if(raid && raid.ele){
							if (!(typeof raid === 'undefined') && !RaidCatcher.settings.getFilter(raid.boss, raid.diff-1) && (
								(/all/.test(s)) ||
								(((/visited/.test(s) && raid.visited) || (/new/.test(s) && !raid.visited)) &&
									RaidCatcher.ui.filterRaidSingle(raid.ele, re, pRe, pSw, room, roomSw,ageTime,isBefore))
							)) {
								try {
									r.push(raid);
								} catch(ex){ RaidCatcher.ui.doError('Raid Selection Error', ex); } 
							}
						} else RaidCatcher.storage.removeRaid(raid);
					}
				}
				if(!RaidCatcher.game.joining) console.log("[RaidCatcher] Got selected " + r.length);
				if(sort) r = RaidCatcher.ui.raidSort(r);
				return r;
			},
			toggleRaid: function(type,id,tog,skipRaidDetails) {
				if(!RaidCatcher.game.joining) console.log('[RaidCatcher] Toggle raid ' + id + ' ' + type);
				skipRaidDetails = (typeof skipRaidDetails === 'undefined')?false:skipRaidDetails;
				var raid = RaidCatcher.storage.raids[id];
				if (typeof raid == 'object' && !skipRaidDetails) {
					raid = RaidCatcher.util.getRaidFromUrl("&kv_difficulty="+raid.diff+"&kv_hash="+raid.hash+"&kv_raid_boss="+raid.boss+"&kv_raid_id="+raid.id);
				}
				var d = document.getElementsByClassName("RaidCatcher_raid_" + id);
				for (var i = d.length -1;i>-1;i--) {
					if (tog == true && d[i].className.indexOf("RaidCatcher_"+type+"Raid") == -1) {
						d[i].className += " RaidCatcher_"+type+"Raid";
					}
					else if (tog == false && d[i].className.indexOf("RaidCatcher_"+type+"Raid") > -1) {
						d[i].className = d[i].className.replace(eval("/RaidCatcher_"+type+"Raid( |$)/i"),"");
					}
					if (typeof raid == 'object' && !skipRaidDetails) {
						d[i].getElementsByTagName("a")[0].innerHTML = raid.linkText();
					}
				}
				var el = document.getElementById('DotDRaid_' + id);
				if(el){
					if(tog == true && el.className.indexOf("RaidCatcher_"+type+"RaidList") == -1){
						el.className += " RaidCatcher_"+type+"RaidList";
					} else if (tog == false && el.className.indexOf("RaidCatcher_"+type+"RaidList") > -1) {
						el.className = el.className.replace(eval("/RaidCatcher_"+type+"RaidList( |$)/i"),"");
					}
				}
			},
			toggleCSS: function (p) {
				if (p) {
					var el = document.getElementById(p.id);
					if(el) document.head.removeChild(document.getElementById(p.id));
					RaidCatcher.$("style").set({type: "text/css", id: p.id, class:(p.class||'DotDStyle')}).text(p.cls).attach("to",document.head);
				}
			},
			updateMessage: function () {
				if(RaidCatcher.game.joining || RaidCatcher.storage.importing) return;
				this.outputStatus(this.standardMessage(), false, this.hasError);
			},
			standardMessage: function (){
				if(RaidCatcher.version.needsUpdate) return 'Script version is out of date.  <a href="http://userscripts.org/scripts/show/'+RaidCatcher.version.scriptid+'" target="_blank" onclick="RaidCatcher.version.needsUpdate=false;RaidCatcher.ui.updateMessage()">Update</a> <a href="#" onclick="RaidCatcher.version.needsUpdate=false;RaidCatcher.ui.updateMessage(); return false;">Dismiss</a>'
				if(this.hasError) return this.errorMessage;
				return 'JHunz/wpatter6 - <span class="room_name_container h6_alt mbs">' +(document.getElementById("dotd_raid_list").childNodes.length -1) + ' raids stored</span>';
			},
			fadeChatOverlay: function (){
				if(session.chatEle)
					RaidCatcher.util.elfade(session.chatEle);
			},
			statusTimer: null,
			hasError: false,
			errorMessage:'',
			outputStatus: function (str, msecs, showInChat){
				showInChat=(typeof showInChat === 'undefined'?true:showInChat);
				msecs=(typeof msecs === 'undefined'?4000:msecs);
				//if(!RaidCatcher.game.joining) console.log("[RaidCatcher] outputStatus " + str);
				var el = document.getElementById('DotDStatusOutput');
				el.innerHTML=str;
				if(session.chatEle && showInChat){
					session.chatEle.innerHTML = str;
					session.chatEle.style.display="block";
					session.chatEle.style.opacity=1;
				}
				if(msecs) {
					if (this.statusTimer) {
						clearTimeout(this.statusTimer);
					}
					this.statusTimer = setTimeout(function(){ RaidCatcher.ui.fadeChatOverlay();el.innerHTML=RaidCatcher.ui.standardMessage(); }, msecs);
				}
				return str;
			},
			tooltip:(function(){
				var tmp={};
				tmp.id = 'RaidCatcher_tooltip',tmp.tt,tmp.c;
				
				tmp.show=function(v,w){
					if(tmp.tt == null){
						tmp.tt = RaidCatcher.$('div').set({id:tmp.id}).attach('to', document.body);
						RaidCatcher.$('div').set({id:tmp.id+'_top'}).attach('to', tmp.tt.ele());
						tmp.c = RaidCatcher.$('div').set({id:tmp.id+'_cont'}).attach('to', tmp.tt.ele());
						RaidCatcher.$('div').set({id:tmp.id+'_bot'}).attach('to', tmp.tt.ele());
						document.addEventListener('mousemove', tmp.pos);
					}
					tmp.tt.set({fade:false,style:'opacity:1;z-index:2000;display:block;width:'+(w?w+'px':'auto')});
					tmp.c.html(v, true);
					if(tmp.tt.ele().offsetWidth > 300){tmp.tt.ele().style.width = 300 + 'px'}
					tmp.h = parseInt(tmp.tt.ele().offsetHeight) + 3;
				};
				tmp.pos=function(e){
					if(tmp.tt){
						tmp.tt.ele().style.top = (e.pageY - tmp.h) + 'px';
						tmp.tt.ele().style.left = (e.pageX + 3) + 'px';
					}
				};
				tmp.hide=function(){
					if(tmp.tt){
						tmp.tt.set({fade:true});
						RaidCatcher.util.elfade(tmp.tt.ele(), 200);
					}
				};
				return tmp;
			})(),
			doError: function(sub, ex, str){
				ex = (ex||'').toString().replace(/('|")/g, ''); str = (str||'').replace(/('|")/g, '');
				var body = "Enter information about this error:\n\n\nPlease do not modify anything below\n---------------"; 
				try{
					var caller = (arguments.callee.caller.name||'').replace(/('|")/g, '');
					if(caller != '') body += "\n\nCaller: " + caller;
				} catch (e){}
				if(ex != '') body += "\n\nError: " + ex;
				if(str != '') body += "\n\n" + str;
				RaidCatcher.ui.hasError = true;
				RaidCatcher.ui.errorMessage = "An error occured "+RaidCatcher.util.getMailToLink(sub, body);
				RaidCatcher.ui.updateMessage();
			}
		},
		$: function (ele) {//modified cHTML
			function cEle(ele) {
				this._ele = ele;
				this.ele = function(){
					return this._ele
				}
				this.val = function (val) {
					if(!(typeof val==='undefined')) this._ele.value = val;
					if(this._ele.options) return this._ele.options[this._ele.selectedIndex].value
					return this._ele.value;
				}
				this.set = function (param) {
					for (var attr in param) {
						if (param.hasOwnProperty(attr)) {
							this._ele.setAttribute(attr,param[attr]);
						}
					}
					return this
				}
				this.left = function(){
					var el = document.getElementById(this._ele.id);
					l = el.offsetLeft;
					while(el = el.offsetParent){
						l += el.offsetLeft;
						if(el == document.body) break;
					}
					return l;
				}
				this.top = function(){
					var el = document.getElementById(this._ele.id);
					t = el.offsetTop;
					while(el = el.offsetParent){
						t += el.offsetTop;
						if(el == document.body) break;
					}
					return t;
				}
				this.right = function(){
					return this.left() + this.width();
				}
				this.bottom = function(){
					return this.top() + this.height();
				}
				this.height = function() {
					return this._ele.offsetHeight;
				}
				this.width = function() {
					return this._ele.offsetWidth;
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
				this.get = function(text, def) {
					if(this._ele && this._ele.getAttribute){
						var ret = this._ele.getAttribute(text)||def;
						if(typeof ret == 'string' && (ret.toLowerCase() == 'true' || ret.toLowerCase() == 'false'))
							ret = ret.toLowerCase() == 'true';
						return ret;
					}
				}
				this.remove = function(ele) {
					if(typeof ele == 'string')
						ele = (/^#/i.test(ele)?document.getElementById(ele.substring(1)):/^\./i.test(ele)?this._ele.getElementsByClassName(ele.substring(1))[0]:false);
					if(ele){
						//try{ 
							this._ele.removeChild(ele); 
						//} catch (e) { }
					}
					return this
				}
				this.hide = function (ele) {
					if(typeof ele === 'undefined') this._ele.style.display = 'none';
					if(typeof ele == 'string'){
						ele = (/^#/i.test(ele)?document.getElementById(ele.substring(1)):/^\./i.test(ele)?this._ele.getElementsByClassName(ele.substring(1))[0]:false);
						ele.style.display = 'none';
					}
					return this;
				}
				this.show = function (ele) {
					if(typeof ele === 'undefined') this._ele.style.display = 'block';
					if(typeof ele == 'string'){
						ele = (/^#/i.test(ele)?document.getElementById(ele.substring(1)):/^\./i.test(ele)?this._ele.getElementsByClassName(ele.substring(1))[0]:false);
						ele.style.display = 'block';
					}
					return this;
				}
				this.attach = function (method,ele) {
					if (typeof ele == 'string') ele = document.getElementById(ele);
					if (!(ele instanceof Node)){
						throw "Invalid attachment element specified"
					}
					else if (!/^(?:to|before|after|first)$/i.test(method)){
						throw "Invalid append method specified"
					}
					else if (method == 'to'){
						ele.appendChild(this._ele)
					}
					else if (method == 'first'){
						if(ele.hasChildNodes())
							ele.insertBefore(this._ele, ele.childNodes[0]);
						else
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
				console.log(ele);
				throw "Invalid element type specified"
			}
		},
		chat: {
			echo: function () { return false; },
			init: function(){
				console.log('[RaidCatcher] Kongregate chat initializing...');
				RaidCatcher.chat.echo = function(msg){if(holodeck&&holodeck.activeDialogue())holodeck.activeDialogue().RaidCatcher_echo(msg)};
				RaidCatcher.chat.output = function(msg, whisper, to){
					if(whisper && ((to||'') != '')) msg = "/w " + to + " " + msg;
					var txt = [];		
					var elems=document.getElementsByClassName('chat_input');
					for(i=0;i<elems.length;i++){
						txt[i] = elems[i].value;
						elems[i].value = msg;
					}
					holodeck.activeDialogue().sendInput();
					for(i=0;i<txt.length;i++) elems[i].value = txt[i];
				}
				ChatDialogue.prototype.RaidCatcher_echo = function(msg){
					this.RaidCatcher_DUM("Raid Catcher","<br>"+msg,{class: "whisper whisper_received"},{non_user: true})
				}
				ChatDialogue.prototype.RaidCatcher_DUM = ChatDialogue.prototype.displayUnsanitizedMessage;
				ChatDialogue.prototype.displayUnsanitizedMessage=function (b,d,e,f) {//b=user,d=message,e=element,f=unk
					if(!this._user_manager.isMuted(b)){
						if(typeof DotDRaidInfo == 'object'){
							if (typeof e != 'object') { e = {class: ''}  }
							else if (typeof e.class != 'string') { e.class = ''; }
							var isPublic = false;
							if(this._holodeck && this._holodeck._chat_window && this._holodeck._chat_window._active_room)
								try { isPublic = (/^room_\d+-dawn-of-the-dragons-\d+$/i.test(this._holodeck._chat_window._active_room._short_room_name) && e.class.indexOf("whisper") == -1?true:false) }
								catch(ex){ /*RaidCatcher.ui.doError("Chat DUM Error", ex, "Message User:\n"+b+"\n\nMessage:\n"+d);*/}

							var raid = RaidCatcher.util.getRaidLink(d,b);
							var urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?\??\S*/gi;
							var t;
							if (typeof raid == 'object') {
								e.class+= " RaidCatcher_raid";
								e.class+= " RaidCatcher_raid_"+raid.id;
								e.class+= (raid.seen?" RaidCatcher_seenRaid":'');
								e.class+=(raid.visited?" RaidCatcher_visitedRaid":'');
								e.class+=" RaidCatcher_filteredRaidChat" + raid.boss + '_' + (raid.diff - 1);							
								var mouseDownParam = (raid.isFiltered) ? "'" + raid.url + "'" : raid.id;
								d = raid.ptext + '<a href="'+raid.link()+'" onClick="return false;" onMouseDown="RaidCatcher.ui.linkMouseDown(event,'+mouseDownParam+',true);return false;">'+raid.linkText()+'</a>'+raid.ntext;
								if(!(raid.isFiltered||false)) RaidCatcher.storage.raids[raid.id].seen = true;
								if(raid.isNew)setTimeout(RaidCatcher.ui.raidSearch, 1);
								if(raid.isDead) e.class += " hidden";
							} else if(RaidCatcher.settings.convertAllLinks)
								while((t = urlRegex.exec(d))){ //check for links and convert them to decent links
									if(!/kongregate.com/i.test(t[0]) && !/\.\./.test(t[0])){
										var url = t[0].indexOf("http") != 0 ? "http://" + t[0] : t[0];
										var link = t[0].length > 50 ? t[0].substring(0, 25)+'...'+t[0].substring(t[0].length-25, t[0].length) : t[0];
										var newlink = "<a href='" + url + "' target='_blank'>" + link + "</a>";
										urlRegex.lastIndex += newlink.length - t[0].length;
										d = d.substring(0, t.index) + newlink + d.substring(t.index + t[0].length, d.length);
									}
								}
							if((typeof RaidCatcher.settings.mutedUsers === 'object') && RaidCatcher.settings.mutedUsers[b]){
								e.class+=" hidden";
								console.log("[RaidCatcher] Muted message received from " + b + " : " + d);
							}
						}
						this.RaidCatcher_DUM(b,d,e,f);
					}
				}
				holodeck.addChatCommand("reload",function(deck,text){
					RaidCatcher.game.reload();
					RaidCatcher.chat.echo("Game reloaded.");
					return false
				});
				holodeck.addChatCommand("cleardead",function(deck,text){
					RaidCatcher.storage.wipeDeadCache();
					RaidCatcher.chat.echo("Dead cache cleared.");
					return false;
				});
				holodeck.addChatCommand("mute",function (deck, text){
					var s = String(text).split(" ");
					if(s.length == 2 && s[1] != ""){
						RaidCatcher.settings.mutedUsers[s[1]]=true;
						RaidCatcher.chat.echo('User "' + s[1] + '" muted.  Use the /unmute command to undo, and the /mutelist to see all muted users.');
						RaidCatcher.settings.save();
					}else {
						RaidCatcher.chat.echo('<b>/mute</b>: Invalid parameters specified. The proper syntax is "/mute [username]".');
					}
					return false;
				});
				holodeck.addChatCommand("unmute",function (deck, text){
					var s = String(text).split(" ");
					if(s.length == 2 && s[1] != ""){
						if(s[1] == 'all'){
							for(var u in RaidCatcher.settings.mutedUsers){
								delete RaidCatcher.settings.mutedUsers[u];
							}
							RaidCatcher.chat.echo('All users unmuted.');
						}else if(RaidCatcher.settings.mutedUsers[s[1]]){
							delete RaidCatcher.settings.mutedUsers[s[1]];
							RaidCatcher.chat.echo('User "' + s[1] + '" unmuted.');
							RaidCatcher.settings.save();
						} else RaidCatcher.chat.echo('No muted user "' + s[1] + '" found.');
						
					}else {
						RaidCatcher.chat.echo('<b>/unmute</b>: Invalid parameters specified. The proper syntax is "/unmute [username]". "/unmute all" can be used to unmute all muted users.');
					}
					return false;
				});
				holodeck.addChatCommand("mutelist", function (deck, text){
					var s = "<b>List of users currently muted:</b><br/>";
					var i = 0;
					for(var u in RaidCatcher.settings.mutedUsers){
						s += u + "<br/>";
						i++;
					}
					if(i==0)s="No users currently muted.<br/>";
					s += "<br/>Use the /mute and /unmute commands to add or remove users on this list.";
					RaidCatcher.chat.echo(s);
					return false;
				});
				holodeck.addChatCommand("donate", function(deck,text) {
					window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2Y8C4RURY33AL&lc=US&item_name=Raid%20Catcher&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");
					RaidCatcher.chat.echo("Donation window opened.");
					return false;
				});
				holodeck.addChatCommand("help", function(deck,text) {
					window.open("https://docs.google.com/spreadsheet/viewform?formkey=dGM4Vy1jbUZXOUpzM3ZjNUY0V21fLWc6MQ");
					RaidCatcher.chat.echo("Help window opened.");
					return false;
				});
				holodeck.addChatCommand("clear",function(deck,text){
					holodeck.activeDialogue().clear();
					return false
				});
				holodeck.addChatCommand("raid", function(deck,text){
					var p;
					if (p = /^\/raid (.*?)(?: ([1-6]|n|h|l|nm))?$/i.exec(text)) {
						var msg = "";
						var diff = p[2]?p[2].toLowerCase():'abc';
						if(isNaN(diff)){
							switch(diff){
								case 'n':diff=1;break;
								case 'h':diff=2;break;
								case 'l':diff=3;break;
								case 'nm':diff=4;break;
								default:diff='abc';
							}
						}
						var start = isNaN(diff)?0:diff-1;
						var find = p[1].toLowerCase();
						var r = RaidCatcher.util.getRaidFromUrlBase(find);
						if(r.id != ''){ 
							start = r.diff-1;
							find = DotDRaidInfo.raids[r.boss].name.toLowerCase();
						}
						for (var i in DotDRaidInfo.raids) {
							if (DotDRaidInfo.raids.hasOwnProperty(i)) {
								var raid = JSON.parse(JSON.stringify(DotDRaidInfo.raids[i]));
								if (new RegExp(find).test(raid.name.toLowerCase())) {
									if (msg != "") msg += "<br>"
									msg += "<b>"+raid.name+"</b><br>";
									msg += "Loot: <a href=\"http://dotd.wikia.com/wiki/"+raid.name.replace(/ /g, "_")+"_("+(raid.stat=="H"?"Guild_":"")+"Raid)\" target='_blank'>wiki</a><br>";
									msg += "Size: "+raid.size+"<br>";
									msg += "Stats: "+RaidCatcher.util.getStatText(raid.stat)+"<br>";
									msg += "Duration: "+raid.duration + "hrs<br>";
									msg += "Classification: "+RaidCatcher.util.getRaidClassification(raid.id)+"<br>";
									if (raid.health[0] == 'Unlimited') {
										msg += "---<br>Health: Unlimited<br>";
										var tiers = RaidCatcher.util.getLootTierText(raid.id,0);
										if (tiers != "") msg += "Loot Tiers: " + tiers + "<br>";
										else msg += "FairShare: 1B<br>Optimal Share: 1B<br>";
									} else {
										var end = (isNaN(diff)?(raid.id == 'echthros'?6:4):diff);	
										if(r.id != '') end = r.diff;
										var hpArr = raid.health;
										for (var n = start;n<end;n++) {
											raid.health = hpArr[n];
											raid.fairShare = raid.health / raid.size;
											msg += "---<br>";
											msg += "Difficulty: "+["Normal","Hard","Legendary","Nightmare","Insane","Hell"][n]+"<br>";
											msg += "Health: "+RaidCatcher.util.getShortNum(raid.health)+"<br>";
											if(n==3) msg += "AP: " + RaidCatcher.util.getShortNum(raid.fairShare/2)+"<br>";
											msg += "Fair Share: " + RaidCatcher.util.getShortNum(raid.fairShare)+"<br>";
											var tiers = RaidCatcher.util.getLootTierText(raid.id,n);
											if(tiers == '') tiers = RaidCatcher.util.getLeonTiers(raid);
											msg += "Loot Tiers: " + tiers + "<br>";
										}
									}
								}
							}
						}
						if (msg != "") {
							RaidCatcher.chat.echo(msg);
						}
						else {
							RaidCatcher.chat.echo('No raids found matching: '+p[1]);
						}
					}
					else {
						RaidCatcher.chat.echo('<b>/raid</b>: Invalid parameters specified.  Proper format is /raid [raid] [difficulty (1-4)]');
					}
					return false;
				});
				holodeck.addChatCommand("version", function(deck,text) {
					var timeDiff = new Date().getTime() - RaidCatcher.settings.lastUpdateCheck;
					var diffHours = Math.round(timeDiff / 360000) / 10; 

					var d = "<b>Version</b>: "+RaidCatcher.version.major+"("+RaidCatcher.version.minor+")<br>";
					d += "<b>Major Version</b>: "+RaidCatcher.version.major+"<br>";
					d += "<b>Minor Version</b>: "+RaidCatcher.version.minor+"<br>";
					d += "<b>Connected to Mirror</b>: "+sv+"<br>";
					d += "<b>Last Update Check</b>: "+diffHours+" hours ago<br>";
					d += '<a href="http://userscripts.org/scripts/show/'+RaidCatcher.version.scriptid+'" target="_blank">Go to script page</a>';
					RaidCatcher.chat.echo(d);
					return false;
				});
				holodeck.addChatCommand("update", function(deck,text) {
					window.open("http://userscripts.org/scripts/show/"+RaidCatcher.version.scriptid);
					RaidCatcher.chat.echo("After installation, you will need to refresh this page");
					return false;
				});
				holodeck.addChatCommand("perc", function(deck, text) {
					var args = text.split(" "),
						tiers = [3999, 5999, 9999, 13999, 15999, 17999, 21999, 23999, 29999, 32999, 35999],
						ret = "<b>Perception Tiers:</b>",
						a_text = ["<br>1 – 3999: Brown/Grey","<br>4000 – 5999: Brown/Grey/Green","<br>6000 – 9999: Grey/Green","<br>10000 – 13999: Grey/Green/Blue","<br>14000 – 15999: Green/Blue",
							"<br>16000 – 17999: Green/Blue/Purple","<br>18000 – 21999: Blue/Purple","<br>22000 – 23999: Blue/Purple/Orange","<br>24000 – 29999: Purple/Orange","<br>30000 - 32999: Orange",
							"<br>33000 - 35999: Orange/Red, more orange","<br>36000+: Orange/Red, more red"]
							;
					if(args.length > 1){
						var t = 0;
						while(t < tiers.length && tiers[t] < parseInt(args[1])) t++;
						ret += a_text[t];
					}else{
						for(var t = 0; t < a_text.length; t++) ret += a_text[t];
					}
					RaidCatcher.chat.echo(ret);
					return false;
				});
				
				holodeck.addChatCommand("ad", function(deck, text) {
					RaidCatcher.chat.output("Get your raids here! Please read the information on the script page http://userscripts.org/scripts/show/"+RaidCatcher.version.scriptid);
					return false;
				});
				holodeck.addChatCommand("import", function(deck, text) {
					//var oldFilter = RaidCatcher.$("#RaidBossNameSearch").val();
					//var oldSelection = RaidCatcher.settings.selectedRaids;
					var st = RaidCatcher.chat.getImportString(text);
					if(RaidCatcher.request.raids()) RaidCatcher.chat.echo(st);
					
					/*
					var f = function(){
						if(RaidCatcher.request.complete && !RaidCatcher.storage.importing && !RaidCatcher.game.joining){
							RaidCatcher.$("#RaidBossNameSearch").val(oldFilter)
							RaidCatcher.ui.raidSearch();
							RaidCatcher.settings.selectedRaids = oldSelection;
						} else setTimeout(f, 1000);
					}
					setTimeout(f, 5000);
					*/
					return false;
				});
				holodeck.addChatCommand("whisper", function(deck, text){
					var t;
					if(t = /^\/whisper (.*?)(?: (.*))/.exec(text)){
						var r = t[1],msg = t[2];
						
						if(isNaN(r))r = RaidCatcher.util.getRaidFromUrlBase(r).id;
						r = RaidCatcher.storage.raids[r];
						
						if(r && r.user||"" != "")
							RaidCatcher.chat.output(msg, true, r.user);
						else 
							RaidCatcher.chat.echo('<b>/whisper</b>: Invalid raid parameter specified. Raid must have originated from chat or import.');
							
					} else {
						RaidCatcher.chat.echo('<b>/whisper</b>: Invalid parameters specified.  Proper format is /whisper [raid id or full link] [message]');
					}
					return false;
				});
				holodeck.addChatCommand("join", function(deck, text) {
					var oldSelection = RaidCatcher.settings.selectedRaids,
						oldFilter = RaidCatcher.$("#RaidBossNameSearch").val();
					if(/^\/join (.*?)/i.test(text)){
						var s = text.split(" ");
						for(var i = 1; i < s.length; i++){
							var val = s[i];
							//if(val||''=='') break;
							if(/^all$/i.test(val) || /^both$/i.test(val))
								RaidCatcher.settings.selectedRaids = 'new_visited_';
							else if(/^new$/i.test(val))
								RaidCatcher.settings.selectedRaids = 'new_';
							else if(/^old$/i.test(val) || /^visited$/i.test(val))
								RaidCatcher.settings.selectedRaids = 'visited_';
							else{
								var b = true;
								//test custom filter names
								for(var i in RaidCatcher.settings.quickFilters){
									var f = RaidCatcher.settings.quickFilters[i];
									if(new RegExp(val, "i").test(f.label)){//TODO REGEXP
										RaidCatcher.ui.quickFilter(i);
										b=false;
									}
								}
								
								//else test boss names TODO!!
								if(b){
									RaidCatcher.$("#RaidBossNameSearch").val(val);
									RaidCatcher.ui.raidSearch(val);
								}								
							}
						}
					}
					RaidCatcher.game.joinSelectedRaids();
					RaidCatcher.$("#RaidBossNameSearch").val(oldFilter)
					RaidCatcher.ui.raidSearch();
					RaidCatcher.settings.selectedRaids = oldSelection;
					return false;
				});
				holodeck.addChatCommand("chart", function(deck, text) {
					window.open("http://dotd.azurewebsites.net");
					return false;
				});
				holodeck.addChatCommand("stats", function(deck, text) {
					window.open("http://dotd.azurewebsites.net");
					return false;
				});
				holodeck.addChatCommand("lmgtfy", function(deck, text) {
					if(/^\/lmgtfy .+/.test(text))
						RaidCatcher.chat.output("http://lmgtfy.com/?q="+encodeURIComponent(text.substring(text.indexOf(" ")+1)));
					return false;
				});
				holodeck.addChatCommand("wiki", function(deck, text) {
					var t;
					if(t = /^\/wiki (.+)/.exec(text))
						window.open("http://dotd.wikia.com/wiki/index.php?search="+encodeURIComponent(t[1].replace("'", "")));
					else
						window.open("http://dotd.wikia.com");
					return false;
				});
				holodeck.addChatCommand("quickfilter", function(deck, text) {
					if (/^\/quickfilter (.*)/i.test(text)) {
						var m = (/^\/quickfilter (.*)/i.exec(text)[1]);

						//test custom filter names
						for(var i in RaidCatcher.settings.quickFilters){
							var f = RaidCatcher.settings.quickFilters[i];
							if(new RegExp("^" + m + "$", "i").test(f.label)){//TODO REGEXP
								RaidCatcher.$("#RaidBossQuickFilter").val(i);
								RaidCatcher.ui.quickFilter(i);
							}
						}
					}

					return false;
				});

				console.log("[RaidCatcher] Kongregate chat initialized.");
				delete this.init;
			},
			getRoomNumber: function() {
				var els = document.getElementsByClassName('room_name_container');
				for(var i=0;i<els.length;i++){
					if(els[i].innerHTML.indexOf('Room') > -1){
						var ret = els[i].firstChild.nextSibling.innerHTML
						if(ret.indexOf('#') > -1) return parseInt(ret.substring(ret.indexOf('#')+1, ret.length));
						return null
					}
				}
				return 0;
			},
			getImportString: function(text){
				var t = String(text).split(" "), tst = "", st = "Importing", el = RaidCatcher.$("#ImportSelect"), el1 = RaidCatcher.$("#ImportSelectNum");
				for(var i = 1; i < t.length; i++){
					var val = t[i];
					if(isNaN(val)){
						if(/^latest$/i.test(val))
							el.val("Latest");
						else if (/^all$/i.test(val))
							el.val("All");
						else if (/^days?$/i.test(val))
							el.val("dd");
						else if (/^hours?$/i.test(val))
							el.val("hh");
						else if (/^min(ute)?s?$/i.test(val))
							el.val("mi");
						else if (val != ''){
							var b = true;
							//test custom filter names
							for(var i in RaidCatcher.settings.quickFilters){
								var f = RaidCatcher.settings.quickFilters[i];
								if(new RegExp(val, "i").test(f.label)){
									RaidCatcher.ui.quickFilter(i);
									tst = " with quick filter \"" + f.label + "\"";
									b=false;
								}
							}
							//else test boss names TODO!!
							if(b){
								RaidCatcher.$("#RaidBossNameSearch").val(val);
								RaidCatcher.ui.raidSearch(val);
								tst = " with boss filter \"" + val + "\"";
							}								
						}
					} else el1.val(val>60?60:val);
				}
				console.log("[RaidCatcher] Outputting import string");
				if(!/latest|all/i.test(el.val())) st += " from the last " + el1.val();
				st += " " + el.ele().options[el.ele().selectedIndex].text + tst + "...";
				return st;
			},
			output: function (txt) {
				var elems= document.getElementsByClassName('chat_input');
				var txt = [];
				for(i=0;i<elems.length;i++){
					txt[i] = elems[i].value;
					elems[i].value = param1;
				}
				holodeck.activeDialogue().sendInput();
				for(i=0;i<txt.length;i++){
					elems[i].value = txt[i];
				}
			}
		},
		request: {
			raids: function(isinit, ctxt){
				var secs = 30 - parseInt(((new Date()).getTime() - RaidCatcher.settings.lastImportDate)/1000);
				if(secs > 0){
					RaidCatcher.chat.echo("Imported too recently. You can import again in " + secs + " seconds.");
					return false;
				}
				
				if((ctxt||"") == "" && RaidCatcher.settings.docaptcha){
					RaidCatcher.util.doCaptcha();
					return false;
				}
				console.log("[RaidCatcher] Get raids");
				var requrl = this.url("RaidSpitter",{u:session.user,a:RaidCatcher.settings.auth,p:session.platformId,r:RaidCatcher.chat.getRoomNumber()});
				var flt = RaidCatcher.settings.getFilterString()||"";
				if(flt != "") requrl += "&f="+flt;
				if((ctxt||"") != "") requrl += "&ctxt="+ctxt;
				var dp = RaidCatcher.$("#ImportSelect").val();
				if(/all/i.test(dp)) dp = 'dd', RaidCatcher.$("#ImportSelectNum").val(10);
				if(dp != "Latest") requrl += "&d="+dp+"&l="+RaidCatcher.$("#ImportSelectNum").val();
				if(RaidCatcher.settings.auth){
					if(!isinit)	this.initialize("Requesting raids");
					else this.tries++;
					RaidCatcher.request.req({
						eventName: "rc.getraids",
						url: requrl,
						method: "GET",
						headers: {"Content-Type": "application/JSON"},
						timeout: 30000
					});
				}
				document.getElementById('RaidImportButton').disabled = true;
				setTimeout(function () { document.getElementById('RaidImportButton').disabled = false;}, 30000);
				return true;
			},
			initialize: function (str){
				RaidCatcher.ui.outputStatus(str + "...");
				RaidCatcher.request.tries = 0;
				RaidCatcher.request.seconds = 0;
				RaidCatcher.request.complete = false;
				RaidCatcher.request.timer = setTimeout(RaidCatcher.request.tick, 1000, str);
			},
			tick: function (str) {
				if(!RaidCatcher.request.complete){
					if(RaidCatcher.request.seconds > 20){
						RaidCatcher.ui.outputStatus("Request failed.");
						return;
					}
					RaidCatcher.request.seconds++; 
					RaidCatcher.ui.outputStatus(str + " ("+RaidCatcher.request.seconds+")...");
					RaidCatcher.request.timer = setTimeout(RaidCatcher.request.tick, 1000, str);
				}
			},
			complete:false,
			seconds: 0,
			timer: null,
			tries:0,
			req: function(param){
				var a = document.createEvent("MessageEvent");
				if (a.initMessageEvent) {
					a.initMessageEvent("rc.req", false, false, param, document.location.protocol + "//" + document.location.hostname, 0, window, null);
				} else {
					a = new MessageEvent('rc.req',{"origin":document.location.protocol + "//" + document.location.hostname, "lastEventId": 0, "source": window, "data": param})
				}
				document.dispatchEvent(a);
			},
			submitRaid: function (isinit) {
				var r = RaidCatcher.util.getRaidFromUrlBase(RaidCatcher.$('#RaidSubmissionText').val());
				if(typeof r == 'object' && r.id && r.hash && r.boss && r.diff){
					var offset;
					if(RaidCatcher.$("#RaidSubmissionSelect").val() == 'now') offset = 0;
					else offset = RaidCatcher.$("#SubmitSelectNum").val();
					
					if(!isinit) this.initialize("Submitting raid");
					else this.tries++;
					var requrl = this.url("RaidSubmit", {u:session.user,p:session.platformId,id:r.id,hash:r.hash,boss:r.boss,diff:r.diff,o:offset});
					RaidCatcher.request.req({
						eventName: "rc.submitr",
						url: requrl,
						method: "GET",
						timeout: 30000
					});
				}
				else {
					RaidCatcher.$('#RaidSubmissionResult').html("Invalid raid specified", true);
				}
			},
			submitRaidResponse: function (e) {
				var d, el = RaidCatcher.$('#RaidSubmissionResult');
				if(e.data){
					if(e.data.status != 200){
						if(RaidCatcher.request.tries >=3){
							RaidCatcher.ui.outputStatus("Raid server busy. Please try again in a moment.");
							console.log("[RaidCatcher] Request Failed. Url:" + e.data.url);
							console.log(JSON.stringify(e.data));
							RaidCatcher.request.complete = true;
						} else {
							console.log("[RaidCatcher] Server unresponsive (status "+e.data.status+"). Trying again, "+RaidCatcher.request.tries+" tries.");
							setTimeout("RaidCatcher.request.submitRaid(true);", 1000);
						}
						return;
					}
					RaidCatcher.request.complete = true;
					try{ d = JSON.parse(e.data.responseText) }
					catch (ex) { RaidCatcher.ui.doError("Raid Submission Error", ex, "Request Url:\n"+e.data.url+"\n\nResponse Text:\n"+e.data.responseText); }
				}
				var str = "", b = false;
				RaidCatcher.$('#RaidSubmissionText').val("");
				if (d.isDead) str='Raid submission failed. Raid is dead or invalid.';
				else if(d.isNew){ 
					str='Raid submitted successfully.';
					b = true;
				}else str='Raid was submitted by ' + d.op + ', ' + dateFormat(new Date(d.dateP), 'ddd h:MM TT');
				
				el.html(RaidCatcher.ui.outputStatus(str)+ (b?' If you included a delay, you will be credited after the raid has been verified when it is made public.':''), true);
				setTimeout(function(){el.html('',true)}, 30000);
				RaidCatcher.settings.updateImportInfo(d);
			},
			init: function () {
				document.addEventListener("rc.getraids", RaidCatcher.storage.addRaids, false);
				document.addEventListener("rc.joinraid", RaidCatcher.game.joinRaidResponse, false);
				document.addEventListener("rc.chkupd", RaidCatcher.version.updateCheckResponse, false);
				document.addEventListener("rc.submitr", RaidCatcher.request.submitRaidResponse, false);
				document.addEventListener("rc.dates", RaidCatcher.settings.updateImportInfo, false);
				delete this.init;
			},
			url: function(pg, qst) {
				return RaidCatcher.util.stringFormat("http://dotd{0}.azurewebsites.net/{1}.aspx?{2}",sv,pg,this.serialize(qst));
			},
			serialize: function(obj) {
				var str = [];
				for(var p in obj)if(obj[p]!=null)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			}
		},
		storage: (function(){
			var tmp = {};
			tmp.raids = {};
			tmp.deadCache = {};
			tmp.importing = false;

			tmp.init = function() {
				if(RaidCatcher.settings.storeRaidsLocally){
					try {
						this.raids = JSON.parse(GM_getValue(RaidCatcher.util.getStorageKey('raids'),"{}"));

					} catch (e) {this.raids = {}}
				}
				try {
					this.deadCache = JSON.parse(GM_getValue(RaidCatcher.util.getStorageKey('deadCache'),"{}"));
				} catch (e) {this.deadCache = {}}
				delete this.init;
			}
			tmp.isDeadRaid = function(id) {
				if (typeof this.deadCache[id] != "undefined")
					return true;
				return false;
			}
			tmp.markRaidDead = function(id) {
				if (RaidCatcher.storage.raids[id]) {
					RaidCatcher.ui.removeRaid(id);
				}
				if (typeof this.deadCache[id] == "undefined") {
					console.log("[RaidCatcher] Adding raid to dead cache " + id);
					this.deadCache[id] = {};
					this.deadCache[id].expTime = 604800 + parseInt((new Date).getTime() / 1000);
				}
				delete this.raids[id];
			}
			tmp.wipeDeadCache = function(id) {
				for(var i in RaidCatcher.storage.deadCache){
					if(RaidCatcher.storage.deadCache.hasOwnProperty(i)){
						delete RaidCatcher.storage.deadCache[i];
					}
				}
				RaidCatcher.storage.save();

			}
			tmp.addRaids = function(e) {
				var r;
				if(e.data.status != 200){
					if(RaidCatcher.request.tries >=3){
						RaidCatcher.request.complete = true;
						RaidCatcher.ui.outputStatus("Raid server busy. Please try again in a moment.");
						console.log("[RaidCatcher] Request Failed. Url:" + e.data.url);
						console.log(JSON.stringify(e.data));
					} else {
						console.log("[RaidCatcher] Server unresponsive (status "+e.data.status+"). Trying again, "+RaidCatcher.request.tries+" tries.");
						setTimeout("RaidCatcher.request.raids(true);", 1000);
					}
					return;
				}
				RaidCatcher.request.complete = true;
				try{ r = JSON.parse(e.data.responseText) }
				catch (ex) { 
					RaidCatcher.ui.doError("Raid Importing Error", ex, "Request Url:\n"+e.data.url+"\n\nResponse Text:\n"+e.data.responseText);
					document.getElementById('RaidImportButton').disabled = false;
					return; 
				}
				
				RaidCatcher.settings.docaptcha=r.docaptcha;
				RaidCatcher.settings.captcha = r.captcha
				if(!r.auth){
					if(r.docaptcha){ 
						RaidCatcher.request.raids();
						return;
					}
					RaidCatcher.ui.doError("Raid Auth Error");
					return;
				}
				
				console.log("[RaidCatcher] raids.addRaids from " + typeof r);
				RaidCatcher.storage.importing = true;
				RaidCatcher.ui.outputStatus("Importing " + r.raids.length + " raids...");
				r.ct = document.getElementById('dotd_raid_list').childNodes.length;
				for(var i = r.raids.length-1; i>=0; i--){
					try {
						var raid = r.raids[i];
						RaidCatcher.storage.addRaid(raid.h, raid.i, raid.b, raid.d, false, false, raid.p, raid.t, raid.r, true);
					} catch(ex){ RaidCatcher.ui.doError("Raid Add Error", ex, "Raid Info:\n" + JSON.stringify(raid)); }
				}
				r.ct = document.getElementById('dotd_raid_list').childNodes.length - r.ct;
				RaidCatcher.storage.importing = false;
				RaidCatcher.ui.outputStatus("Import complete. " + r.ct + " new.");
				RaidCatcher.ui.raidSearch();
				RaidCatcher.ui.raidSort();
				
				var st = RaidCatcher.settings.updateImportInfo(r);
				var st1 = "Import complete. " + r.ct + " new.";
				
				if(RaidCatcher.settings.outputRaidStatus && st != "") st1 = st1 + "<br>"+st;
				RaidCatcher.chat.echo(st1);
				
				if(RaidCatcher.settings.pruneFromServer && r.deadraids)
					for(var i = 0; i < r.deadraids.length; i++)
						RaidCatcher.storage.markRaidDead(r.deadraids[i]);
				
				if(RaidCatcher.settings.joinAfterImport){
					RaidCatcher.game.joinSelectedRaids();
				}
				RaidCatcher.$("#ImportSelect").val("Latest");
				RaidCatcher.$("#ImportSelectSpan").ele().style.display = 'none';
			}
			tmp.getRaid = function (id) {
				if(this.raids[id]){
					var r = JSON.parse(JSON.stringify(this.raids[id]));
					r.ele = document.getElementById('DotDRaid_'+id);
					r.link = function(){ return RaidCatcher.util.getRaidUrl(this) }
					return r;
				}
			}
			tmp.getRaids = function () {
				var ret = [];
				for(var i in this.raids){
					if(this.raids.hasOwnProperty(i)){
						var r = JSON.parse(JSON.stringify(this.raids[i]));
						r.ele = document.getElementById('DotDRaid_'+r.id);
						r.link = function(){ return RaidCatcher.util.getRaidUrl(r) }
						ret.push(r);
					}
				}
				return ret;
			}
			tmp.addRaid = function(hash,id,boss,diff,seen,visited,user,ts,room,imp) {
				if (RaidCatcher.settings.getFilter(boss,diff-1)||RaidCatcher.storage.deadCache.hasOwnProperty(id)) return false;
				if (typeof RaidCatcher.storage.raids[id] != 'object') {
					var r = {
						hash: hash,
						id: id,
						boss: boss,
						diff: diff,
						seen: seen,
						visited: visited,
						user: user,
						lastUser: user,
						expTime: (typeof DotDRaidInfo.raids[boss] == 'object'?DotDRaidInfo.raids[boss].duration:168) * 3600+parseInt(((typeof ts ==='undefined'||ts==null)?(new Date().getTime()):ts) / 1000),
						timeStamp: ((typeof ts ==='undefined'||ts==null)?(new Date().getTime()):parseInt(ts)),
						room: ((typeof room ==='undefined'||room==null)?RaidCatcher.chat.getRoomNumber():parseInt(room))
					}
					RaidCatcher.storage.raids[id] = r;
					RaidCatcher.ui.addRaid(r);
					//onNewRaid
					if(!imp)setTimeout(function(){RaidCatcher.ui.updateMessage()}, 1);
				}
				return RaidCatcher.storage.raids[id];
			}
			tmp.removeRaid = function(id){
				if (typeof id == 'object') id = id.id;
				if (typeof this.raids[id] == 'object') {
					console.log("[RaidCatcher] Removing raid " + id);
					RaidCatcher.ui.removeRaid(id);
					delete RaidCatcher.storage.raids[id];
				}
			}
			tmp.save = function(b){
				if(typeof b === 'undefined') b = false;
				if(!b){
					this.pruneRaids();
					var t = new Date().getTime();
					for(var i in RaidCatcher.storage.deadCache) if(RaidCatcher.storage.deadCache.hasOwnProperty(i) && t>RaidCatcher.storage.deadCache[i]) delete RaidCatcher.storage.deadCache[i];				
				}
				if(RaidCatcher.settings.storeRaidsLocally){
					GM_setValue(RaidCatcher.util.getStorageKey('raids'),JSON.stringify(RaidCatcher.storage.raids));
				} else GM_deleteValue(RaidCatcher.util.getStorageKey('raids'));
				GM_setValue(RaidCatcher.util.getStorageKey('deadCache'),JSON.stringify(RaidCatcher.storage.deadCache));
				console.log("[RaidCatcher] Storage saved");
			}
			tmp.pruneRaids = function () {
				var ct = 0;
				for(var i in this.raids){
					if(this.raids.hasOwnProperty(i)){
						var r = this.raids[i];
						if(r.expTime <= (new Date().getTime()/1000)){
							this.removeRaid(i);
							ct++;
						}
					}
				}
				ct = 0;
				for(var i in this.deadCache){
					if(this.deadCache.hasOwnProperty(i)){
						var r = this.deadCache[i];
						if(r.expTime <= (new Date().getTime()/1000)){
							delete this.deadCache[i];
							ct++;
						}
					}
				}
			}
			tmp.clearRaids = function () {
				delete RaidCatcher.storage.raids;
				GM_deleteValue(RaidCatcher.util.getStorageKey('raids'));
				RaidCatcher.ui.clearRaids();
			}
			return tmp;
		})(),
		settings: (function(){
			var tmp = {};
			
			tmp.init = function(){
				try{ 
					var str = GM_getValue(RaidCatcher.util.getStorageKey('settings'),'');
					if(str != ''){
						var obj = JSON.parse(str);
						for(var i in obj) if(obj.hasOwnProperty(i)) RaidCatcher.settings[i] = obj[i];
					}
				}
				catch (ex){ RaidCatcher.ui.doError("Raid Settings Error", ex); }
				if(typeof this.lastVersionLoaded === 'undefined'){//first time loaded, try to pull user settings from SRDotDX
					console.log("[RaidCatcher] First load, pulling settings from SRDotDX settings...");
					var dotdx;
					try{ dotdx = JSON.parse(GM_getValue('SRDotDX'),false) }
					catch (e){dotdx = false}
					if(dotdx){
						console.log("[RaidCatcher] SRDotDX settings found, setting RaidCatcher defaults.");
						this.filterChatLinks = dotdx.filterChatLinks;
						this.hideVisitedRaidsInRaidList = dotdx.hideVisitedRaidsInRaidList;
						this.hideVisitedRaids = dotdx.hideVisitedRaids;
						this.hideSeenRaids = dotdx.hideSeenRaids;
						this.formatRaidLinks = dotdx.formatRaidLinks;
						this.raidLinkFormat = dotdx.raidLinkFormat;
						this.mutedUsers = dotdx.mutedUsers;
						this.filters = dotdx.filters;
						this.hideChatLinks = dotdx.hideRaidLinks;
						this.hideChatSeenLinks = dotdx.hideSeenRaids;
						this.hideChatVisitedLinks = dotdx.hideVisitedRaids;
						this.storeRaidsLocally = true;
					}				
				}
				//boolean
				this.hideVisitedRaids = (typeof this.hideVisitedRaids == 'boolean'?this.hideVisitedRaids:false);
				this.hideSeenRaids = (typeof this.hideSeenRaids == 'boolean'?this.hideSeenRaids:false);
				this.storeRaidsLocally = (typeof this.storeRaidsLocally == 'boolean'?this.storeRaidsLocally:false);
				this.outputRaidStatus = (typeof this.outputRaidStatus == 'boolean'?this.outputRaidStatus:true);
				this.pruneFromServer = (typeof this.pruneFromServer == 'boolean'?this.pruneFromServer:true);
				this.filterChatLinks = (typeof this.filterChatLinks == 'boolean'?this.filterChatLinks:true);
				this.hideChatLinks = (typeof this.hideChatLinks == 'boolean'?this.hideChatLinks:false);
				this.hideChatSeenLinks = (typeof this.hideChatSeenLinks == 'boolean'?this.hideChatSeenLinks:false);
				this.hideChatVisitedLinks = (typeof this.hideChatVisitedLinks == 'boolean'?this.hideChatVisitedLinks:false);
				this.convertAllLinks = (typeof this.convertAllLinks == 'boolean'?this.convertAllLinks:true);
				this.hideVisitedRaidsInRaidList = (typeof this.hideVisitedRaidsInRaidList == 'boolean'?this.hideVisitedRaidsInRaidList:false);
				this.formatRaidLinks = (typeof this.formatRaidLinks == 'boolean'?this.formatRaidLinks:true);
				this.joinAfterImport = (typeof this.joinAfterImport == 'boolean'?this.joinAfterImport:false);
				this.importAliveS = (typeof this.importAliveS == 'boolean'?this.importAliveS:false);
				this.importAliveM = (typeof this.importAliveM == 'boolean'?this.importAliveM:false);
				this.importAliveL = (typeof this.importAliveL == 'boolean'?this.importAliveL:false);
				this.importAliveE = (typeof this.importAliveE == 'boolean'?this.importAliveE:false);
				this.importAliveC = (typeof this.importAliveC == 'boolean'?this.importAliveC:false);
				this.hideToolbar = (typeof this.hideToolbar == 'boolean'?this.hideToolbar:false);
				this.autohideToolbar = (typeof this.autohideToolbar == 'boolean'?this.autohideToolbar:false);
				this.logConsole = (typeof this.logConsole == 'boolean'?this.logConsole:true);
				this.docaptcha = (typeof this.docaptcha == 'boolean'?this.docaptcha:false);
				
				//numbers
				this.lastUpdateCheck = (typeof this.lastUpdateCheck == 'number'?this.lastUpdateCheck:0);
				//this.lastImportCount = (typeof this.lastImportCount == 'number'?this.lastImportCount:0);
				this.lastImportDate = (typeof this.lastImportDate == 'number'?this.lastImportDate:0);
				this.importExpireS = (typeof this.importExpireS == 'number'?this.importExpireS:0);
				this.importExpireM = (typeof this.importExpireM == 'number'?this.importExpireM:0);
				this.importExpireL = (typeof this.importExpireL == 'number'?this.importExpireL:0);
				this.importExpireE = (typeof this.importExpireE == 'number'?this.importExpireE:0);
				this.importExpireC = (typeof this.importExpireC == 'number'?this.importExpireC:0);
				this.importSummonS = (typeof this.importSummonS == 'number'?this.importSummonS:0);
				this.importSummonM = (typeof this.importSummonM == 'number'?this.importSummonM:0);
				this.importSummonL = (typeof this.importSummonL == 'number'?this.importSummonL:0);
				this.importSummonE = (typeof this.importSummonE == 'number'?this.importSummonE:0);
				this.importSummonC = (typeof this.importSummonC == 'number'?this.importSummonC:0);
				this.bossSearchDiff = (typeof this.bossSearchDiff == 'number'?this.bossSearchDiff:0);
				this.selectedQuickFilter = (typeof this.selectedQuickFilter == 'number'?this.selectedQuickFilter:0);
				if(this.lastImportCount) delete this.lastImportCount;
				
				//strings
				this.selectedRaids = (typeof this.selectedRaids == 'string'?this.selectedRaids:"visible_new_visited_");
				this.raidLinkFormat = (typeof this.raidLinkFormat == 'string'?this.raidLinkFormat:"<seen:(s) ><visited:(v) ><shortname> - <diff> - <fs>/<tiers>");
				this.raidLinkFormat = this.raidLinkFormat.replace(/&#91;/g,"[").replace(/&#93;/g,"]").replace(/&#123;/g,"{").replace(/&#125;/g,"}").replace("<os>", "<tiers>");
				this.bossSearchString = (typeof this.bossSearchString == 'string'?this.bossSearchString:"");
				this.raidSortSelection  = (typeof this.raidSortSelection == 'string'?this.raidSortSelection:"Time");
				this.raidSortDirection  = (typeof this.raidSortDirection == 'string'?this.raidSortDirection:"asc");
				this.auth = (typeof this.auth == 'string'?this.auth:null);
				this.captcha = (typeof this.captcha == 'string'?this.captcha:null);
				
				//objects
				this.mutedUsers = (typeof this.mutedUsers =='object'?this.mutedUsers:{});
				this.importList = (typeof this.importList == 'object'?this.importList:{});
				this.filters = (typeof this.filters =='object'?this.filters:{});
				this.leon = (typeof this.leon == 'object'? this.leon:{});
				this.quickFilters = (typeof this.quickFilters =='object'?this.quickFilters:{});
				this.tools = (typeof this.tools =='object'?this.tools:[
						{chat:'/import', url:null, class:'DotDToolbarDownArrowIcon', tooltip:'Import Raids', order:0, bg:null, id:0},
						{chat:'/join', url:null, class: 'DotDToolbarLeftArrowIcon', tooltip:'Join Raids', order:1, bg:null, id:1},
						{chat:'/reload', url:null, class: 'DotDToolbarRefreshIcon', tooltip:'Refresh Game', order:2, bg:null, id:2},
						{chat:null, url:'http://dotd.azurewebsites.net', class: 'DotDToolbarChartIcon', tooltip:'View statistic charts', order:3, bg:null, id:3},
						{chat:null, url:'http://dotd.azurewebsites.net/Styles/Images/StatAllocationTable.png?t='+new Date().getTime(), text: 'SP', tooltip:'View stat increase chart', order:4, bg:null, id:4},
					]);
					
				//update the import times
				var requrl = RaidCatcher.request.url("RaidDates", {u:session.user,p:session.platformId});
				RaidCatcher.request.req({
					eventName: "rc.dates",
					url: requrl,
					method: "GET",
					timeout: 30000
				});
				this.save();
				delete this.init;
			}
			
			tmp.setLeonFilter = function(raidid, tier, val, save){ RaidCatcher.settings.leon[raidid][tier] = val; if(save)RaidCatcher.settings.save(); }
			tmp.getLeonFilter = function(raidid, tier){
				if (typeof RaidCatcher.settings.leon[raidid] == 'boolean') {
					var tempVal = RaidCatcher.settings.leon[raidid];
					RaidCatcher.settings.leon[raidid] = [tempVal, tempVal, tempVal, tempVal, tempVal, tempVal];
					RaidCatcher.settings.leon[raidid] = [tempVal, tempVal, tempVal, tempVal, tempVal, tempVal];
				} else if ((typeof RaidCatcher.settings.leon[raidid] != 'boolean') && (typeof RaidCatcher.settings.leon[raidid] != 'object')) {
					if(DotDRaidInfo.raids.hasOwnProperty(raidid)){
						var r = DotDRaidInfo.raids[raidid], t = [], fs = r.health[0] / r.size;
						for(var j = 0; j < 7; j++){
							var tier = RaidCatcher.util.getLeonTier(r, j)
							t.push(tier >= fs);
						}
						RaidCatcher.settings.leon[raidid] = t;
					} else return false;
				} 
				return RaidCatcher.settings.leon[raidid][tier];
			}
			
			//functions
			tmp.setFilter = function(raidid,diff,val,save) { save=(typeof save==='undefined'?true:save);RaidCatcher.settings.filters[raidid][diff] = val; if(save)RaidCatcher.settings.save();}
			tmp.getFilter = function(raidid,diffIndex) {
				if (typeof RaidCatcher.settings.filters[raidid] == 'boolean') {
					var tempVal = RaidCatcher.settings.filters[raidid];
					RaidCatcher.settings.filters[raidid] = [tempVal, tempVal, tempVal, tempVal, tempVal, tempVal];
				} else if ((typeof RaidCatcher.settings.filters[raidid] != 'boolean') && (typeof RaidCatcher.settings.filters[raidid] != 'object')) {
					if(DotDRaidInfo.raids.hasOwnProperty(raidid)){
						var raid = DotDRaidInfo.raids[raidid];
						if ((raid.size && raid.size == 1) || (raid.stat && raid.stat.toLowerCase() == 'h')) {
							RaidCatcher.settings.filters[raidid] = [true, true, true, true, true, true];
						} else {
							RaidCatcher.settings.filters[raidid] = [false, false, false, false, false];
						}
					} else return true;
				} return RaidCatcher.settings.filters[raidid][diffIndex];
			}
			tmp.getFilterString = function () {
				var ret = "";
				var getAll = true;
				for(var i in RaidCatcher.settings.filters){
					var diffs = "";
					if(DotDRaidInfo.raids.hasOwnProperty(i)){
						for(var j = 0; j < 4; j++){
							if(!RaidCatcher.settings.filters[i][j] && DotDRaidInfo.raids[i].stat != 'H'){
								if(diffs != "") diffs += ",";
								diffs += (j+1);
							} else
								getAll = false;
						}
						if(diffs != "") ret += i + ":" + diffs + ";";
					}
				}
				if(!getAll) return ret;
			}
			tmp.save = function () {
				var a = RaidCatcher.settings.raidFormat;
				RaidCatcher.settings.raidFormat = RaidCatcher.settings.raidLinkFormat.replace(/\{/g,"&#123;").replace(/\}/g,"&#125;").replace(/\[/g,"&#91;").replace(/\]/g,"&#93;");
				GM_setValue(RaidCatcher.util.getStorageKey('settings'),JSON.stringify(RaidCatcher.settings));
				RaidCatcher.settings.raidFormat = a;
				console.log("[RaidCatcher] Settings saved.");
			}
			tmp.updateImportInfo = function (r){
				if(r){
					if(r.data && r.data.status != 200) return;
					if(r.data && r.data.responseText){
						try{ r = JSON.parse(r.data.responseText) } 
						catch (ex) { RaidCatcher.ui.doError("Raid Import Info Error", ex, "Request Url:\n"+e.data.url+"\n\nResponse Text:\n"+e.data.responseText) }
					}
					console.log("[RaidCatcher] Updating import info");
					if(r.raids){
						RaidCatcher.settings.importList[new Date().getTime()] = { n:r.ct, t:r.raids.length, c:RaidCatcher.$("#ImportSelectNum").val(), d:RaidCatcher.$("#ImportSelect").ele().options[RaidCatcher.$("#ImportSelect").ele().selectedIndex].text };
						RaidCatcher.settings.lastImportDate = new Date().getTime();
					}
					RaidCatcher.settings.importExpireS = r.dateS;
					RaidCatcher.settings.importExpireM = r.dateM;
					RaidCatcher.settings.importExpireL = r.dateL;
					RaidCatcher.settings.importExpireE = r.dateE;
					RaidCatcher.settings.importExpireC = r.dateC;
					
					RaidCatcher.settings.importSummonS = r.summS;
					RaidCatcher.settings.importSummonM = r.summM;
					RaidCatcher.settings.importSummonL = r.summL;
					RaidCatcher.settings.importSummonE = r.summE;
					RaidCatcher.settings.importSummonC = r.summC;
					
					RaidCatcher.settings.importAliveS = r.activeS;
					RaidCatcher.settings.importAliveM = r.activeM;
					RaidCatcher.settings.importAliveL = r.activeL;
					RaidCatcher.settings.importAliveE = r.activeE;
					RaidCatcher.settings.importAliveC = r.activeC;
					
					RaidCatcher.settings.save();
				}
				var d = new Date().getTime(), html = "";
				
				var makeHtml = function(alive, expDate, summDate, size){
					var ret = alive?'<span class="OpenRaidSize">Open</span>' : expDate < d ? '<span class="ClosedRaidSize">Expired</span>' : '<span class="DeadRaidSize '+(summDate < d ? 'SummRaidSize' : 'OpenRaidSize' )+'">' + RaidCatcher.util.timeSince(expDate, true)+" ("+dateFormat(new Date(expDate), 'ddd, h:MM TT')+")</span>";
					if(!alive && expDate){
						if(expDate < d){
							if(html != "") html += "<br>";
							html += '<span class="ClosedRaidSize">' + size + ' raids expired</span>';
						} else if (summDate < d){
							if(html != "") html += "<br>";
							html += '<span class="SummRaidSize">' + size + ' raids can be summoned</span>';
						}
					}
					return ret;
				}
				var html1 = makeHtml(RaidCatcher.settings.importAliveS,RaidCatcher.settings.importExpireS, RaidCatcher.settings.importSummonS, 'Small'), 
					html2 = makeHtml(RaidCatcher.settings.importAliveM,RaidCatcher.settings.importExpireM, RaidCatcher.settings.importSummonM, 'Medium'), 
					html3 = makeHtml(RaidCatcher.settings.importAliveL,RaidCatcher.settings.importExpireL, RaidCatcher.settings.importSummonL, 'Large'), 
					html4 = makeHtml(RaidCatcher.settings.importAliveE,RaidCatcher.settings.importExpireE, RaidCatcher.settings.importSummonE, 'Epic'), 
					html5 = makeHtml(RaidCatcher.settings.importAliveC,RaidCatcher.settings.importExpireC, RaidCatcher.settings.importSummonC, 'Colossal');
				
				RaidCatcher.$('#DotD_ExpS').html(html1, true);
				RaidCatcher.$('#DotD_ExpM').html(html2, true);
				RaidCatcher.$('#DotD_ExpL').html(html3, true);
				RaidCatcher.$('#DotD_ExpE').html(html4, true);
				RaidCatcher.$('#DotD_ExpC').html(html5, true);
				RaidCatcher.$("#DotD_TimeSinceLastImport").html(RaidCatcher.util.timeSince(RaidCatcher.settings.lastImportDate),true);
				
				
				var importList = RaidCatcher.$("#DotD_ImportList").ele();
				while(importList.firstChild) importList.removeChild(importList.firstChild);
				var keys = [];
				for (var k in RaidCatcher.settings.importList) keys.unshift(k);
				for (i=0; i<keys.length; i++) {
					var dt = keys[i];
					if(RaidCatcher.settings.importList.hasOwnProperty(dt)){
						if(i<10){
							var im = RaidCatcher.settings.importList[dt];
							var c = ['ddd','bbb'][i%2];
							RaidCatcher.$('div').set({style:'background-color:#'+c+';width:98%;height:15px;padding:2px;'}).html("\
								<div style='float:left;width:24%;text-align:center;'>" + im.n + "/" + im.t + "</div>\
								<div style='display:inline-block;margin:0 auto;width:40%;text-align:center;'>" + dateFormat(new Date(parseInt(dt)), 'ddd, h:MM TT') + "</div>\
								<div style='float:right; width:25%; text-align:center;'>" + (/latest|all/i.test(im.d)?"":im.c+" ") + im.d + "</div>\
							").attach('to', 'DotD_ImportList');
						} else delete RaidCatcher.settings.importList[dt];
					}
				}
				return html;				
			}
			return tmp;
		})(),
		util: {
			showModelPrompt: function(html, clickFunc){
				var obtn = RaidCatcher.$("#RCmodalPromptButton").ele(),nbtn = obtn.cloneNode(true);
				obtn.parentNode.replaceChild(nbtn, obtn);
				
				nbtn.addEventListener("click", function(){
					RaidCatcher.$("#RCshade").hide();
					RaidCatcher.$("#RCmodalPrompt").hide();
					clickFunc(RaidCatcher.$("#RCmodalPromptText").val());
				});
				
				RaidCatcher.$("#RCmodalPromptContainer").html(html, true);
				RaidCatcher.$("#RCshade").show();
				RaidCatcher.$("#RCmodalPrompt").show();
				RaidCatcher.$("#RCmodalPromptText").ele().focus();
			},
			doCaptcha: function(){			
				RaidCatcher.util.showModelPrompt('<b>Wow you\'re busy, sure you\'re not a bot?<b><br><img src="data:image/bmp;base64,'+RaidCatcher.settings.captcha+'" id="RCcaptcha">',function(text){
					RaidCatcher.request.raids(false, text);
				});
			},
			getMailToLink: function(subject, body){
				return "<a onclick='RaidCatcher.ui.hasError=false;RaidCatcher.ui.updateMessage();' href='mailto:dotdscripthelp@gmail.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body+"\n\Session:\n"+JSON.stringify(session.dump()))+"'>Send error</a>";
			},
			getStorageKey: function(key){
				return 'RaidCatcher_'+session.platform+'_'+session.user+'_'+key;
			},
			animateTimeout:null,
			elAnimateHeight: function(elem, endheight, startheight, goup, time, doneFunc){
				if(typeof goup != 'boolean') goup = false;
				if(typeof time != 'number') time = 200;
				if(typeof elem == 'string') elem = document.getElementById(elem);
				if(!elem) return;
				if(typeof startheight != 'number') startheight = elem.offsetHeight;
				else elem.style.height = startheight + 'px';
				var tickspeed=20, diff = endheight - startheight, m = diff/Math.abs(diff), tick = diff / (time / tickspeed);
				var elem$ = RaidCatcher.$(elem), starttop = elem.offsetTop, startleft = elem$.left();
				(function go() {
					if((elem.offsetHeight + tick) * m < endheight * m){
						elem.style.height = (elem.offsetHeight + tick)+'px';            
						if(goup) elem.style.top = (elem.offsetTop - tick)+'px';
						RaidCatcher.util.animateTimeout = setTimeout(go, tickspeed);
					} else { 
						elem.style.height = endheight + "px";
						if(typeof doneFunc == 'function') doneFunc();
					}
				})()
			},
			elfade: function(elem,time){
				if(typeof time!='number')time=500;
				if(typeof elem=='string')elem=document.getElementById(elem);
				if(!elem)return;
				var startOpacity=elem.style.opacity||1;
				elem.style.opacity=startOpacity;var tick=1/(time/100);(function go(){if(!RaidCatcher.$(elem).get('fade', true)) return;elem.style.opacity=Math.round((elem.style.opacity-tick)*100)/100;if(elem.style.opacity>0)setTimeout(go,100);else elem.style.display='none'})()},
			isNumber: function(n) {return !isNaN(parseFloat(n)) && isFinite(n);},
			timeSince: function(date,after){if(typeof date=='number')date=new Date(date);var seconds=Math.abs(Math.floor((new Date().getTime()-date.getTime())/1000));var interval=Math.floor(seconds/31536000);var pretext="over ";var posttext=" ago";if(after)posttext=" left";if(interval>=1){return pretext+interval+" year"+(interval==1?'':'s')+posttext}interval=Math.floor(seconds/2592000);if(interval>=1){return pretext+interval+" month"+(interval==1?'':'s')+posttext}interval=Math.floor(seconds/86400);if(interval>=1){return pretext+interval+" day"+(interval==1?'':'s')+posttext}interval=Math.floor(seconds/3600);if(interval>=1){return pretext+interval+" hour"+(interval==1?'':'s')+posttext}interval=Math.floor(seconds/60);if(interval>=1){return interval+" minute"+(interval==1?'':'s')+posttext}return Math.floor(seconds)+" second"+(seconds==1?'':'s')+posttext},
			removeArrayDupes: function(arr){var i,len=arr.length,out=[],obj={};for(i=0;i<len;i++){obj[arr[i]]=0}for(i in obj){out.push(i)}return out},
			stringFormat: function() {
				var s = arguments[0];
				for (var i = 0; i < arguments.length - 1; i++) {       
					var reg = new RegExp("\\{" + i + "\\}", "gm");             
					s = s.replace(reg, arguments[i + 1]);
				}
				return s;
			},
			getShortNum: function (num) {
				if (isNaN(num) || num < 0){return num}
				else if (num>=1000000000000){return Math.ceil(num/1000000000)/1000+"T"}
				else if (num>=1000000000){return Math.ceil(num/10000000)/100+"B"}
				else if (num>=1000000){return Math.ceil(num/10000)/100+"M"}
				else if (num>=1000){return Math.ceil(num/100)/10+"K"}
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
				if (typeof DotDRaidInfo.raids[raidid] != 'object' || typeof DotDRaidInfo.raids[raidid].loottiers != 'object' || typeof DotDRaidInfo.raids[raidid].loottiers[diffIndex] != 'object') {
					return "";
				}
				var tiers = DotDRaidInfo.raids[raidid].loottiers[diffIndex];
				var text = tiers[0];
				for (var i = 1;i<tiers.length;i+=1) {
					text = text + "/" + tiers[i] + " ";
				}
				return text;
			},
			getRaidLink: function (msg,user) {
				msg = msg.replace(/[\r\n]/g,"");
				var b = new RegExp(session.querystringPrefix+"_raid_id=[0-9]*","i").test(msg) && new RegExp(session.querystringPrefix+"_hash=.*","i").test(msg);
				
				//TODO this regex should be changed so it picks up partial links
				var m = /^((?:(?!<a[ >]).)*)<a.*? href="((?:(?:https?:\/\/)?(?:www\.)?kongregate\.com)?\/games\/5thPlanetGames\/dawn-of-the-dragons(\?[^"]+))".*?<\/a>((?:(?!<\/?a[ >]).)*(?:<a.*? class="reply_link"[> ].*)?)$/i.exec(msg);
				if (b && m) {
					var raid = RaidCatcher.util.getRaidFromUrl(m[3],user)
					if (typeof raid != 'undefined' && typeof raid != 'null') {
						raid.ptext = m[1];
						raid.url = m[2];
						raid.ntext = m[4];
						return raid;
					}
				}
			},
			getRaidClassification: function(r){
				if(typeof r == 'object') r = r.boss
				if(typeof r == 'number' && RaidCatcher.storage.raids[r]) r = RaidCatcher.storage.raids[r].boss;
				var cls = "";
				for(var type in DotDRaidInfo.classifications){
					if(DotDRaidInfo.classifications.hasOwnProperty(type)){
						for(var i=0; i<DotDRaidInfo.classifications[type].length; i++){
							if(DotDRaidInfo.classifications[type][i] == r){
								if(cls != "") cls += ", ";
								cls += type;
							}
						}
					}
				}
				return (cls==""?"Unclassified":cls.replace(/_/g, ' '));
			},
			getLeonTier: function(r, t){
				var hp = r.health;
				if(isNaN(hp)) hp = hp[0];
				var tier = {
					"Small":[.0525, .06, .09, .12, .16, .25, .35],
					"Medium":[.0025, .014, .019, .041, .0625, .135, .17],
					"Large":[.002, .009, .015, .022, .032, .065, .09],
					"Epic":[.00015, .0009, .0013, .0025, .0071, .0181, .041],
					"Colossal":[.0004, .0009, 0, .0013, .0025, .005, .018],
					"Personal":[1]
				}[r.essenceSize][t];
				return tier * hp;
			},
			getLeonTiers: function(r){
				var ret = [];
				for(var i = 0; i < 7; i++){
					if(RaidCatcher.settings.getLeonFilter(r.boss||r.id, i)){
						var num = RaidCatcher.util.getLeonTier(r, i);
						if(num > 0) ret.push(RaidCatcher.util.getShortNum(num));
					}
				}
				return ret.toString().replace(/,/g, "/ ");
			},
			getRaidInfoBase: function(r){
				r.diffLongText = ['Normal','Hard','Legendary','Nightmare','Insane','Hell'][r.diff-1];
				r.diffShortText = ['N','H','L','NM','I','HL'][r.diff-1];
				r.classification = function () { return RaidCatcher.util.getRaidClassification(this) };
				
				var stats = DotDRaidInfo.raids[r.boss];
				if (typeof stats == 'object') {
					r.name = stats.name;
					r.shortname = stats.shortname;
					r.size = stats.size;
					r.dur = stats.duration;
					r.durText = stats.dur + "hrs";
					r.stat = stats.stat;
					r.statText = RaidCatcher.util.getStatText(stats.stat);
					r.essenceSize = stats.essenceSize;
					if (!isNaN(stats.health[r.diff-1])) {
						r.health = stats.health[r.diff-1];
						r.healthText = RaidCatcher.util.getShortNum(r.health);
						r.fairShare = r.health / r.size;
						r.fairShareText = RaidCatcher.util.getShortNum(r.fairShare);
						if (typeof stats.loottiers == 'object' && typeof stats.loottiers[r.diff-1] == 'object')
							r.optimalShareText = RaidCatcher.util.getLootTierText(stats.id,(r.diff - 1));
						else
							r.optimalShareText = RaidCatcher.util.getLeonTiers(r);
					}
					else if (stats.health[0] == 'Unlimited') {
						r.health = '';
						r.healthText = 'Unlimited';
						if (typeof stats.loottiers == 'object' && typeof stats.loottiers[r.diff-1] == 'object' && stats.loottiers[r.diff-1][0]) {
							// TODO: At some point, make the numeric FS/OS numbers here line up with the correct textual ones
							r.fairshare = 0;
							r.fairShareText = stats.loottiers[r.diff-1][0];
							r.optimalShareText = RaidCatcher.util.getLootTierText(stats.id,(r.diff - 1));;
						} else {
							r.fairShare = 1000000000;
							r.fairShareText = RaidCatcher.util.getShortNum(r.fairShare);
							r.optimalShareText = RaidCatcher.util.getShortNum(1000000000);
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
				return r;
			},
			getRaidFromUrlBase: function(url){
				var r = {diff: '', hash: '', boss: '', id: ''};
				var reg = /[?&]([^=]+)=([^?&]+)/ig, p = url.replace(/&amp;/gi,"&");
				while ((i = reg.exec(p)) != null) {
					if (!r.diff && i[1] == session.querystringPrefix+'_difficulty') r.diff=parseInt(i[2]);
					else if (!r.hash && i[1] == session.querystringPrefix+'_hash') r.hash=i[2];
					else if (!r.boss && i[1] == session.querystringPrefix+'_raid_boss') r.boss=i[2];
					else if (!r.id && i[1] == session.querystringPrefix+'_raid_id') r.id=i[2].replace(/http:?/i,""); // Workaround for when part of the next link gets glommed onto the last bit of this one
					//else if (i[1] != session.querystringPrefix+'_action_type') return
				}
				if (typeof r != 'undefined' && typeof r.diff != 'undefined' && typeof r.hash != 'undefined' && typeof r.boss != 'undefined' && typeof r.id != 'undefined') {
					r = RaidCatcher.util.getRaidInfoBase(r);
				}
				return r;
			},
			getRaidFromUrl: function(url,user,visited,seen,ts,room) {
				user=(user?user:'');
				visited=(visited?visited:(user==session.user && RaidCatcher.settings.markMyRaidsVisted));
				seen=(seen?seen:false);
				var i;
				var r = RaidCatcher.util.getRaidFromUrlBase(url);
				if(RaidCatcher.storage.deadCache.hasOwnProperty(r.id)){
					r.isDead = true;
					return r;
				}
				if (typeof r != 'undefined' && typeof r.diff != 'undefined' && typeof r.hash != 'undefined' && typeof r.boss != 'undefined' && typeof r.id != 'undefined') {
					var info = RaidCatcher.storage.getRaid(r.id);
					if (typeof info != 'object') {
						info = RaidCatcher.storage.addRaid(r.hash, r.id, r.boss, r.diff,visited,seen,user,ts,room)
						if(typeof info == 'object') r.isNew = true;
						else r.isFiltered = true;
					} else r.isNew = false;
					r.timeStamp = info.timeStamp;
					r.seen = info.seen;
					r.visited = info.visited;
					r.nuked = info.nuked;
					r.link = function () { return RaidCatcher.util.getRaidUrl(r) };
					r.linkText = function () { return RaidCatcher.util.getRaidLinkText(this); }
					return r;
				}
			},
			getRaidUrl: function(r){
				return RaidCatcher.util.stringFormat(session.gameLocation + "{0}_action_type=raidhelp&{0}_raid_id={1}&{0}_hash={2}&{0}_difficulty={3}&{0}_raid_boss={4}",
					session.querystringPrefix, r.id, r.hash, r.diff, r.boss);
			},
			getRaidLinkText: function(r){
				if(typeof r == 'string' || typeof r == 'number') r = RaidCatcher.storage.getRaid(r);
				if (RaidCatcher.settings.formatRaidLinks){
					var txt = RaidCatcher.settings.raidLinkFormat;
					txt = txt.replace(/<visited:([^>]*)>/gi,(r.visited?"$1":""));
					txt = txt.replace(/<seen:([^>]*)>/gi,(r.seen?"$1":""));
					txt = txt.replace(/<diff>/gi,r.diffShortText);
					txt = txt.replace(/<diff:Num>/gi,r.diff);
					txt = txt.replace(/<diff:Long>/gi,r.diffLongText);
					txt = txt.replace(/<bossId>/gi,r.boss);
					txt = txt.replace(/<raidId>/gi,r.id);
					txt = txt.replace(/<hash>/gi,r.hash);
					txt = txt.replace(/<name>/gi,(!r.name?'Unknown':r.name));
					txt = txt.replace(/<shortname>/gi,(!r.name?'Unknown':DotDRaidInfo.raids[r.boss].shortname));
					txt = txt.replace(/<size>/gi,(!r.name?'':r.size));
					txt = txt.replace(/<dur>/gi,(!r.name?'':r.durText));
					txt = txt.replace(/<dur:Num>/gi,(!r.name?'':r.dur));
					txt = txt.replace(/<stat>/gi,(!r.name?'':r.stat));
					txt = txt.replace(/<stat:Long>/gi,(!r.name?'':r.statText));
					txt = txt.replace(/<health>/gi,(!r.name?'':r.healthText));
					txt = txt.replace(/<health:Num>/gi,(!r.name?'':r.health));
					txt = txt.replace(/<ap>/gi,(!r.name?'':RaidCatcher.util.getShortNum(Math.ceil(r.fairShare/2))));
					txt = txt.replace(/<ap:Num>/gi,(!r.name?'':Math.ceil(r.fairShare/2)));
					txt = txt.replace(/<fs>/gi,(!r.name?'':r.fairShareText));
					txt = txt.replace(/<fs:Num>/gi,(!r.name?'':r.fairShare));
					txt = txt.replace(/<tiers>/gi,(!r.name?'':r.optimalShareText));
					//txt = txt.replace(/<os:Num>/gi,(!r.name?'':r.optimalShare));	
					txt = txt.replace(/</g,"&lt;").replace(/>/g,"&gt;");
					return txt.replace(/&lt;image&gt;/gi,'<image src="http://cdn2.kongregate.com/assets/resize-image/40x30/game_icons/0034/9771/DawnKong.png?11179-op" style="vertical-align: text-top; float: left;">');
				} else {
					return '<image src="http://cdn2.kongregate.com/assets/resize-image/40x30/game_icons/0034/9771/DawnKong.png?11179-op" style="vertical-align: text-top"> Dawn of the Dragons'
				}
			},
			getRaidJoinUrl: function(r){
				return RaidCatcher.util.stringFormat(session.joinLocation + session.querystring + '&{0}_action_type=raidhelp&{0}_raid_id={1}&{0}_hash={2}', 
					session.querystringPrefix, r.id, r.hash);
			},
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
			},
			getRaidSizes: {
				10: { name: 'Small', visible: 'Yes', pruneTimers: [3600000,10800000,32400000]}, // 1h, 2h, 3h
				13: { name: 'Small', visible: 'No', pruneTimers: [3600000,10800000,32400000]},  // 1h, 2h, 3h
				15: { name: 'Small', visible: 'No', prumeTimers: [18000000,18000000,18000000]}, // Serpina only, so 5h/5h/5h
				50: { name: 'Medium', visible: 'Yes', pruneTimers: [3600000,10800000,32400000]}, // 1h, 2h, 3h
				100:{ name: 'Large', visible: 'Yes', pruneTimers: [14400000,43200000,129600000]}, // 4h, 12h, 36h
				250:{ name: 'Epic', visible: 'Yes', pruneTimers: [86400000,172800000,259200000]}, // 24h, 48h, 72h
				500:{ name: 'Colossal', visible: 'Yes', pruneTimers: [86400000,172800000,259200000]} // 24h, 48h, 72h
			},
			ctrlHeld:false,
			numbersOnly: function (e) {
				if(e.keyCode == 17){ RaidCatcher.util.ctrlHeld = true; return; }
				if(!RaidCatcher.util.ctrlHeld && e.keyCode != 46 && e.keyCode != 8 && e.keyCode != 9 && !(e.keyCode >= 48 && e.keyCode <= 57) && !(e.keyCode >= 96 && e.keyCode <= 105)) e.preventDefault();
			},
			numbersOnlyKeyUp: function (e) {
				if(e.keyCode == 17){ RaidCatcher.util.ctrlHeld = false; }
				if(isNaN(this.value)) this.value = '';
			},
			browser: (function(){
				var b;
				var testCSS = function(prop) { return prop in document.documentElement.style; }
				var base = (function(){ var N= navigator.appName, ua= navigator.userAgent, tem; var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i); if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1]; M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?']; return M;})();
				if(!!(window.opera && window.opera.version)){
					b = 'Opera';
				} else if(testCSS('MozBoxSizing')){
					b = 'FireFox';
				} else if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0){
					b = 'Safari';
				}else if (testCSS('WebkitTransform')){
					b = 'Chrome';
				} else {
					b = unknown;
				}
				return b + ' ' + base[1];
			})()
		},
		game:{
			reload: function (url){
				if(window.activateGame)
					activateGame();
				else{
					url = (url||session.iframeLocation + session.querystring);
					RaidCatcher.$('#'+session.iframeId).ele().src = url;
				}
			},
			joinRaid: function(r){
				if(typeof r == 'string' && r.indexOf('/games/5thPlanetGames')>-1) r = RaidCatcher.util.getRaidFromUrl(r);
				else if(typeof r == 'string' || typeof r == 'number') r = RaidCatcher.storage.getRaid(r);
				if(session.platformId == 1 && typeof r == 'object'){//only kong can fast join
					if(!this.joining) RaidCatcher.request.initialize("Joining " + (!r.boss?'Unknown':DotDRaidInfo.raids[r.boss].shortname));
					RaidCatcher.request.req({
						eventName: "rc.joinraid",
						url: RaidCatcher.util.getRaidJoinUrl(r),
						method: "GET",
						timeout: 30000
					});
				}else {
					RaidCatcher.$('#'+session.iframeId).ele().src = RaidCatcher.util.getRaidJoinUrl(r);
				}
				console.log("[RaidCatcher] Raid joined");
			},
			joinRaidResponse: function(e){
				if(e && e.data && e.data.responseText && e.data.url){
					RaidCatcher.request.complete = true;
					var raidid = RaidCatcher.util.getQueryVariable(session.querystringPrefix + '_raid_id', e.data.url)
					var status = "", statustxt = "";
					RaidCatcher.game.joinRaidComplete++;
					if (/successfully (re-)?joined/i.test(e.data.responseText)) {
						RaidCatcher.game.joinRaidSuccessful++;
						RaidCatcher.ui.markRaidVisited(raidid);
						statustxt = DotDRaidInfo.raids[RaidCatcher.storage.raids[raidid].boss].shortname + " joined successfully.";
						status = "success";
					} else if (/already a member/i.test(e.data.responseText)){
						RaidCatcher.ui.markRaidVisited(raidid);
						statustxt = "Join Failed. You are already a member.";
						status = "member";
					}else if (/already completed/i.test(e.data.responseText) || /not a member of the guild/i.test(e.data.responseText)) {
						RaidCatcher.game.joinRaidDead++;
						statustxt = "Join failed. Raid is dead.";
						status = "dead";
						RaidCatcher.storage.markRaidDead(raidid);
					} else if (/(invalid|find) raid (hash|ID)/i.test(e.data.responseText)) {
						status = "invalid";
						statustxt = "Join failed. Raid is invalid.";
						RaidCatcher.game.joinRaidInvalid++;
						RaidCatcher.storage.removeRaid(raidid);
					} else{
						status = 'unknown';
						statustxt = "Unknown join response.";
					}
					
					if(RaidCatcher.game.joining){
						if(RaidCatcher.game.joinRaidComplete >= RaidCatcher.game.joinRaidList.length){
							statustxt = "Finished joining. " + RaidCatcher.game.joinRaidSuccessful + " new, " + RaidCatcher.game.joinRaidDead + " dead, " + RaidCatcher.game.joinRaidInvalid + " invalid.";
							RaidCatcher.ui.updateSelectedRaidCount();
							RaidCatcher.game.joining = false;
							RaidCatcher.game.joinRaidList = [];
							RaidCatcher.$("#AutoJoinButton").val('Join');
							RaidCatcher.storage.save();
						} else {
							statustxt = "Joined " + RaidCatcher.game.joinRaidComplete + " of " + RaidCatcher.game.joinRaidList.length + ". " + RaidCatcher.game.joinRaidSuccessful + " new, " + RaidCatcher.game.joinRaidDead + " dead";
							if(RaidCatcher.game.joinRaidIndex < RaidCatcher.game.joinRaidList.length)
								RaidCatcher.game.joinRaid(RaidCatcher.game.joinRaidList[RaidCatcher.game.joinRaidIndex++]);
						}
					} else RaidCatcher.storage.save();
					
					if(statustxt != "") RaidCatcher.ui.outputStatus(statustxt);
					console.log('[RaidCatcher] Raid ' + raidid + ' joined (' + status + ') ' + RaidCatcher.game.joining);
				}
			},
			joinSelectedRaids: function () {
				this.joining = !this.joining;
				this.joinRaidIndex = 0;
				this.joinRaidComplete = 0;
				this.joinRaidSuccessful = 0;
				this.joinRaidDead = 0;
				this.joinRaidInvalid = 0;
				if(this.joining){
					RaidCatcher.$("#AutoJoinButton").val('Stop');
					RaidCatcher.game.joinRaidList = RaidCatcher.ui.getSelectedRaids(true, true);
					if(this.joinRaidList.length == 0){
						RaidCatcher.ui.outputStatus("No raids selected. Joining cancelled.");
						this.joining = false;
						return;
					}
					console.log("[RaidCatcher] game.joinSelectedRaids " + this.joinRaidList.length);
					while(this.joinRaidIndex < Math.min(20, this.joinRaidList.length)){
						this.joinRaid(this.joinRaidList[this.joinRaidIndex++]);
					}
				} else {
					RaidCatcher.$("#AutoJoinButton").val('Join');
					this.joinRaidList = [];
				}
			},
			joining: false,
			joinRaidList:[],
			joinRaidIndex: 0,
			joinRaidComplete:0,
			joinRaidSuccessful:0,
			joinRaidDead:0,
			joinRaidInvalid:0
		},
		init: function(s, p){
			console.log("[RaidCatcher] Beginning init...");
			s.dump = function (){ return {version: RaidCatcher.version.major, platform: s.platform, platformId: s.platformId, user: s.user, auth: s.auth, browser: RaidCatcher.util.browser, mirror:sv} }
			session = s;
			if(RaidCatcher.settings.init){
				console.log("[RaidCatcher] settings.init...");
				RaidCatcher.settings.init();
				console.log("[RaidCatcher] settings.init done");
			}
			console.log("[RaidCatcher] Creating " + s.platform + " for " + s.user + " (" + RaidCatcher.settings.auth + ")...");
			if(!RaidCatcher.settings.auth) RaidCatcher.settings.auth = s.auth;
			if (RaidCatcher.settings.auth != s.auth){
				//change auth code on server using both new and old
				console.log("[RaidCatcher] Auth code has changed.  Updating with RaidCatcher server. New:" + s.auth + " Old:"+RaidCatcher.settings.auth);
				var requrl = RaidCatcher.request.url("RaidDates", {u:session.user,p:session.platformId, o:RaidCatcher.settings.auth, n:s.auth});
				document.addEventListener("rc.auth", function (e){
					if(e.data && e.data.responseText != ""){
						console.log("[RaidCatcher] Auth code successfully changed to "+e.data.responseText);
						RaidCatcher.settings.auth = e.data.responseText;
						RaidCatcher.settings.save();
					}
				}, false);
				RaidCatcher.request.req({
					eventName: "rc.auth",
					url: requrl,
					method: "GET",
					timeout: 30000
				});
			}
			if(RaidCatcher.request.init){
				console.log("[RaidCatcher] request.init...");
				RaidCatcher.request.init();
				console.log("[RaidCatcher] request.init done");
			}
			if(RaidCatcher.storage.init){
				console.log("[RaidCatcher] storage.init...");
				RaidCatcher.storage.init();
				console.log("[RaidCatcher] storage.init done");
			}
			
			if(RaidCatcher.ui.init){
				console.log("[RaidCatcher] ui.init...");
				RaidCatcher.ui.init(p);
				console.log("[RaidCatcher] ui.init done");
			}
			if(RaidCatcher.settings.lastVersionLoaded != RaidCatcher.version.major){
				//Updates for new versions can be done here
				console.log("[RaidCatcher] Version upgraded from "+RaidCatcher.settings.lastVersionLoaded+" to "+RaidCatcher.version.major);
				RaidCatcher.settings.lastVersionLoaded = RaidCatcher.version.major;
			}
			
			// Cache raid info in case website goes down later
			var tempObj = JSON.parse(JSON.stringify(DotDRaidInfo));
			for (var keyWord in DotDRaidInfo.searchKeywords) {
				if (DotDRaidInfo.searchKeywords.hasOwnProperty(keyWord)) {
					tempObj.searchKeywords[keyWord].reg = DotDRaidInfo.searchKeywords[keyWord].reg.source;
				}
			}
			GM_setValue('RaidCatcher_RaidInfoCache',JSON.stringify(tempObj));
			
			RaidCatcher.tick();
			RaidCatcher.isInit = true;
			console.log("[RaidCatcher] Created " + s.platform);
			delete this.init;
		},
		tick: function(){
			RaidCatcher.settings.save();
			RaidCatcher.storage.save();
			RaidCatcher.settings.updateImportInfo();
			RaidCatcher.version.updateCheck();
			setTimeout(RaidCatcher.tick, 30000);
		},
		isInit: false
	}
	window.addEventListener('beforeunload', function () {
		RaidCatcher.settings.save();
		RaidCatcher.storage.save(true);
	});
	window.dateFormat=function(){var token=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,timezone=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,timezoneClip=/[^-+\dA-Z]/g,pad=function(val,len){val=String(val);len=len||2;while(val.length<len)val="0"+val;return val};return function(date,mask,utc){var dF=dateFormat;if(arguments.length==1&&Object.prototype.toString.call(date)=="[object String]"&&!/\d/.test(date)){mask=date;date=undefined}date=date?new Date(date):new Date;if(isNaN(date))throw SyntaxError("invalid date");mask=String(dF.masks[mask]||mask||dF.masks["default"]);if(mask.slice(0,4)=="UTC:"){mask=mask.slice(4);utc=true}var _=utc?"getUTC":"get",d=date[_+"Date"](),D=date[_+"Day"](),m=date[_+"Month"](),y=date[_+"FullYear"](),H=date[_+"Hours"](),M=date[_+"Minutes"](),s=date[_+"Seconds"](),L=date[_+"Milliseconds"](),o=utc?0:date.getTimezoneOffset(),flags={d:d,dd:pad(d),ddd:dF.i18n.dayNames[D],dddd:dF.i18n.dayNames[D+7],m:m+1,mm:pad(m+1),mmm:dF.i18n.monthNames[m],mmmm:dF.i18n.monthNames[m+12],yy:String(y).slice(2),yyyy:y,h:H%12||12,hh:pad(H%12||12),H:H,HH:pad(H),M:M,MM:pad(M),s:s,ss:pad(s),l:pad(L,3),L:pad(L>99?Math.round(L/10):L),t:H<12?"a":"p",tt:H<12?"am":"pm",T:H<12?"A":"P",TT:H<12?"AM":"PM",Z:utc?"UTC":(String(date).match(timezone)||[""]).pop().replace(timezoneClip,""),o:(o>0?"-":"+")+pad(Math.floor(Math.abs(o)/60)*100+Math.abs(o)%60,4),S:["th","st","nd","rd"][d%10>3?0:(d%100-d%10!=10)*d%10]};return mask.replace(token,function($0){return $0 in flags?flags[$0]:$0.slice(1,$0.length-1)})}}();dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]}
	console.log("[RaidCatcher] Shared script added");
}
function kmain(sv){//kong
	console.log("[RaidCatcher] Kongregate initializing...");
	window.initKongChat = function (tries){
		tries=(tries||1);
		if(tries > 50){
			console.log('[RaidCatcher] Kongregate resources not found. Aborting');
			return;
		}
		if (typeof holodeck == 'object' && typeof ChatDialogue == 'function' && typeof RaidCatcher == 'object' && typeof holodeck._chat_commands == 'object'){
			console.log('[RaidCatcher] Kongregate resources found.  Initializing...');
			if(typeof RaidCatcher.chat.init == 'function') setTimeout(function(){RaidCatcher.chat.init();}, 1);
		} else {
			console.log('[RaidCatcher] Kongregate resources not found ('+tries+' attempts), retrying in 1 second...');
			setTimeout('initKongChat('+(++tries)+')', 1000);
		}
	}
	initKongChat();
	window.initKongDotD = function (tries){
		tries=(tries||1);
		if(tries % 5 == 0 && !(typeof DotDRaidInfo == 'object')){
			var script = document.createElement("script");
			script.src = 'http://dotd'+sv+'.azurewebsites.net/Scripts/RaidInfo_min.js?t='+new Date().getTime();
			script.type = 'text/javascript';
			(document.head || document.body || document.documentElement).appendChild(script);
		}
		if (tries > 12) {
			// Load cached raid info
			console.log("[RaidCatcher] Attempting to load cached raid info");
			if (typeof DotDRaidInfo != 'object') {
				try{ 
					var str = GM_getValue('RaidCatcher_RaidInfoCache','');
					if(str != ''){
						window.DotDRaidInfo = JSON.parse(str);
						for (var keyword in DotDRaidInfo.searchKeywords) {
							if (DotDRaidInfo.searchKeywords.hasOwnProperty(keyword)) {
								DotDRaidInfo.searchKeywords[keyword].reg = new RegExp(DotDRaidInfo.searchKeywords[keyword].reg, "i");
							}
						}
					} 
				}
				catch (ex){ RaidCatcher.ui.doError("Raid Cache Load Error", ex); }
			}
		}
		if(tries > 20){
			console.log('[RaidCatcher] Script resources not found. Aborting');
			return;
		}
		if (typeof holodeck == 'object' && typeof ChatDialogue == 'function' && typeof document.getElementById('kong_game_ui') != 'null'  && typeof document.getElementById('gameiframe') != 'null' && document.getElementById('gameiframe').tagName.toLowerCase() == 'iframe' && 
			typeof RaidCatcher == 'object' && typeof active_user == 'object' && typeof DotDRaidInfo == 'object' && active_user.username().toLowerCase() != "guest") {
			console.log('[RaidCatcher] Script resources found.  Initializing...');
			RaidCatcher.$('style').set({type: "text/css",id: 'DotD_Kong_styles'}).text(' \
				#kong_game_ui ul.main_tabs li#dotd_tab a {height: 11px;width: 33px; color:white;} \
				#kong_game_ui ul.main_tabs li#dotd_tab a.active {color:#222} \
			').attach('to',document.head);

			var link = RaidCatcher.$('a').text("Raids").set({href: '#dotd_tab_pane',class: ''}).attach("to",RaidCatcher.$('li').set({class: 'tab', id: 'dotd_tab'}).attach("after","game_tab").ele()).ele();
			
			RaidCatcher.$('li').set({
				class: 'spritegame'
			}).html("<a href=\"http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons\" onclick=\"RaidCatcher.game.reload();return false;\">Reload Game</a>").attach("after","quicklinks_favorite_block");
			
			var pane = RaidCatcher.$('div').set({id: 'dotd_tab_pane'}).attach("to",'kong_game_ui').ele();
			pane.style.height = document.getElementById("chat_tab_pane").style.height;
			holodeck._tabs.addTab(link);
			
			console.log("[RaidCatcher] Calling RaidCatcher.init");
			var qstr = RaidCatcher.request.serialize({kongregate_username: active_user.username(), 
				kongregate_user_id:active_user.id(), 
				kongregate_game_auth_token:active_user.gameAuthToken(),
				kongregate_game_id:active_user.gameId(),
				kongregate_host:'http://www.kongregate.com',
				kongregate_game_url:'http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons',
				kongregate_api_host:'http://api.kongregate.com',
				kongregate_channel_id:new Date().getTime(),
				kongregate_api_path:'http://chat.kongregate.com/flash/API_AS3_95ea811098ac0e93cd27d72283df3a32.swf',
				kongregate_ansible_path:'chat.kongregate.com/flash/ansible_61bb4144ad60c5041a61071ac48e05c2.swf',
				kongregate_preview:'false',
				preview:'false',
				kongregate_split_treatments:'dawn-of-the-dragons-skin,control',
				kongregate:'true'
			});
			
			RaidCatcher.init({
				platform: 'Kongregate',
				platformId: 1,
				user: active_user.username(),
				auth: active_user.gameAuthToken().substring(0, 15),//first 15 chars of the game auth code
				iframeId: 'gameiframe',
				iframeLocation: 'http://web1.dawnofthedragons.com/kong?',//for reload;
				joinLocation: 'http://web1.dawnofthedragons.com/kong/raidjoin.php?',//for raid joining
				gameLocation: 'http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons?', //for links
				querystring: qstr,//full querystring for joining raids
				querystringPrefix: 'kv',
				chatEle: RaidCatcher.$('div').set({id: 'chat_status_overlay', style: 'position:absolute;top:157px;left:-3px;z-index:20000;width:290px;display:none;background-color:#c0c0c0;padding:3px 8px;font-family: Verdana, Arial;' }).attach("to",'chat_tab_pane').ele()
			}, pane);
			console.log('[RaidCatcher] Kongregate initialized.');
		}else{
			console.log('[RaidCatcher] Script resources not found ('+tries+' attempts), retrying in 1 second...');
			//console.log('[RaidCatcher] DotDRaidInfo:'+(typeof DotDRaidInfo)+', active_user:'+(typeof active_user)+', holodeck:'+(typeof holodeck)+ ", ChatDialogue:"+(typeof ChatDialogue)+", kong_game_ui:"+(typeof document.getElementById('kong_game_ui'))+", RaidCatcher:"+(typeof RaidCatcher));
			setTimeout('initKongDotD('+(++tries)+')', 1000);
		}
	}
	initKongDotD();
}
function amain(sv){//AG
	console.log("[RaidCatcher] AG initializing...");
	window.initAGDotD = function (tries) {
		tries=(tries||1);
		if(tries % 5 == 0 && !(typeof DotDRaidInfo == 'object')){
			var script = document.createElement("script");
			script.src = 'http://dotd'+sv+'.azurewebsites.net/Scripts/RaidInfo_min.js?t='+new Date().getTime();
			script.type = 'text/javascript';
			(document.head || document.body || document.documentElement).appendChild(script);
		}
		if (tries > 12) {
			// Load cached raid info
			console.log("[RaidCatcher] Attempting to load cached raid info");
			if (typeof DotDRaidInfo != 'object') {
				try{ 
					var str = GM_getValue('RaidCatcher_RaidInfoCache','');
					if(str != ''){
						window.DotDRaidInfo = JSON.parse(str);
						for (var keyword in DotDRaidInfo.searchKeywords) {
							if (DotDRaidInfo.searchKeywords.hasOwnProperty(keyword)) {
								DotDRaidInfo.searchKeywords[keyword].reg = new RegExp(DotDRaidInfo.searchKeywords[keyword].reg, "i");
							}
						}
					} 
				}
				catch (ex){ RaidCatcher.ui.doError("Raid Cache Load Error", ex); }
			}
		}
		if(tries > 20){
			console.log('[RaidCatcher] AG resources not found. Aborting');
			return;
		}
		if(typeof RaidCatcher == "object" && typeof document.getElementById('game-iframe-div') != 'null' && typeof document.getElementById('game-iframe-div').getElementsByTagName('iframe')[0] != 'null' && typeof DotDRaidInfo == 'object'){
			console.log('[RaidCatcher] AG resources found.  Initializing...');
			RaidCatcher.$('style').set({type: "text/css",id: 'DotD_AG_styles'}).text(' \
				.room_name_container{font-style:italic;font-family:Arial,sans-serif;} .mbs{margin-bottom:5px !important} .h6_alt{color:#666}\
				#dotd_tab_pane {position:absolute;background-color:#DDD;width:264px !important;height:640px !important;z-index:500;}\
				#dotd_tab_pane input {width:78px !important;}\
				#dotd_tab_pane select {width: auto !important; border-radius:auto !important; color:auto !important; font-size:auto !important; height:20px !important;padding:0px 0px 0px 0px;line-height:20px !important; margin: auto !important; font-size: auto !important}\
				#dotd_tab {position:absolute; width:65px; height:36px;z-index:500;cursor:pointer;background-image:url(http://i.imgur.com/WVr5l.png)}\
				.dotd_tab_overlay {position:absolute; width:65px; height:36px;z-index:500;pointer-events:none;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AsMEDEXzYbZWAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAFUlEQVQI12P8//+/LwMDAwMTAxQAADQ8A058cLdLAAAAAElFTkSuQmCC)}\
				.panel_handle {margin: 5px 0 8px;line-height: 10px;cursor: pointer;}\
				.panel_handle a {padding-left: 14px;font-weight: bold;text-transform: uppercase;text-decoration: none;color: #333;outline: none;}\
				.spritegame {background-image: url(http://www.kongregate.com/images/presentation/gamepage_sprite.png?35);background-color: transparent;background-repeat: no-repeat;}\
				.closed_link {background-position: -42px -1147px;}\
				.opened_link {background-position: -42px -1161px;}\
			').attach('to',document.head);
			
			var pane = RaidCatcher.$('div').set({id: 'dotd_tab_pane' }).attach("to", document.getElementsByTagName('body')[0]).ele();
			var tab = RaidCatcher.$('div').set({id: 'dotd_tab', class: 'dotd_tab'}).attach("to", document.getElementsByTagName('body')[0]).ele();
			var tabhoverpane = RaidCatcher.$('div').set({id: 'dotd_tab_hover_pane', class: 'hidden dotd_tab_overlay'}).attach("to", document.getElementsByTagName('body')[0]).ele();
			var tabclickpane = RaidCatcher.$('div').set({id: 'dotd_tab_click_pane', class: 'hidden dotd_tab_overlay'}).attach("to", document.getElementsByTagName('body')[0]).ele();
			var gameframe = document.getElementById('game-iframe-div').getElementsByTagName('iframe')[0];
			gameframe.setAttribute('id', 'game-iframe');
			
			var rf = function () {//handles window resizing and raid control placement
				console.log("[RaidCatcher] Repositioning");
				var el = document.getElementById('game-iframe');
				var x = parseInt(el.offsetLeft);
				var y = parseInt(el.offsetTop);
				while(el != null) { x += parseInt(el.offsetLeft); y += parseInt(el.offsetTop); el = el.offsetParent; }
				var x1=x+760, y1=y+47, x2=x+1023, y2=y+5;
				pane.style.left = x1+'px';pane.style.top = y1+'px';tab.style.left = x2+'px';tab.style.top = y2+'px';tabhoverpane.style.left = x2+'px';tabhoverpane.style.top = y2+'px';tabclickpane.style.left = x2+'px';tabclickpane.style.top = y2+'px';
			}
			rf();
			
			RaidCatcher.$('a').set({
				class: 'feature-tab',
				title: 'Refresh the game',
				href: 'http://armorgames.com/dawn-of-the-dragons-game/13509',
				onclick: 'RaidCatcher.game.reload();return false;',
				style: 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAAAmJLR0QALe9Sf0cAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcDAoTDiXIgp9xAAAAHWlUWHRDb21tZW50AAAAAABDcmVhdGVkIHdpdGggR0lNUGQuZQcAAAOcSURBVFjDtZhbSBVBGMd/s64GVlT4EGSBFQSRnh5CrcBuVkRQPQR2JMiIQJJeSiiKIEQogqIL9VQUPYQPRXS/UUaUFUGZJSF0oTtkx1AkRa2dHnbPOrs7e/SsnVnOYc9/Z+c33/fNnPlmxC5JhsoAfXyjXSzCJGMlm2xmgHwnxCQpSF6A8x29SPczmukUIXiHOYgYBEVBSQ9EAr9pwaCQPBtiKAgR2RrpgUgs4DOF5GAmEYYCiVaEA5EILMDA4hcwGtNu2G9L9IgIJBIDCxCOdYGYjCzwwo2N3V27NRMtJHrg0UEGmx2ZJcJ1l98m7MkoXG6qmAjivKKTLGZSQn2KqNjfQnWXd2bobdnDZc55lE985X4IwGsHiAKZhcBQxlcQMosGba8380wz25OzxL4qAUPtvd5RC0IQcIplgbgYGp+Y/vHgL7M5DjTQxgB51PqeHmIjL9xfm3jAe8dZqsPEVGk4ztLN+XFc5AAzOeoqSzjiA83jNxDnFwdZTMJxlu2wv4PuCi+nqOWOgoBGquj21HnCWNaymw28ZaG2lSEgN3kZ0JqpJuFRmtgLxGjiSRTIaa3aSo1Wv8B37RQ1os3vxVwNaNeYElI7EmQdsCqgWjSF1E97jZ/DXKq1T66HvpPCkrhGW8mZEAT0pA9Zzm4Os4LJbFHUG8SIUcZ+Ounw1D9LSygk1F0/gXLKAcjjOQkWctB51kUDDUAR06jnBxOBpylcHAopVe4rqACgg6+M57yrv+Y1l1lFP5PISR9SwhqNug2AXq551KtDDpYQyCjytfoJbvMx7SEfApmv0faR4G6kqasdXcWs16idEREhkHZt1RmREyUtZH3IYlsaEaKJyRLiwD0ukksudcqTk0DMV3sZS9k5RDamgTRyiXOs5iGwSPNn08MVAFYzjgRxtg+dk/mXX/8qP4bHgZdu8QrYwQDZrPCsIcl8xbv8igKZlWKNB8jnZmgfK2jTJkVeiOnPyIP5yjdqKKMyoJ+kzYfw7rR8gZdKcqkrjyhnK8VUucoxntOcYhuEu99yIHIYSXYd8IZWPtDLRGKcSS8ZL0iZdw0vx5fKne0qy01UK73ukoGUP7jrGN7eV82JAUyp5OLpWqDf/arNKzGRgR5HP6aQvsuxBA9EjnBjih4ikFjOP6X0xSSaJWB5/GMmAVYGDgskE4Bu212WssuS/+nYw76mAL02RK34vw9woB2zisyWL3SIDJ539dPHAH9EF/8A5zFApEGC7YcAAAAASUVORK5CYII=) !important;'
			}).attach("to","feature-box");
			
			window.addEventListener('resize', rf);
			window.addEventListener('message', function(event){//needed to hide raid pane when other tabs are clicked.
				if(/web1\.dawnofthedragons\.com/.test(event.origin) && /HideRaids/.test(event.data) && !/hidden/.test(pane.className)){
					pane.className += " hidden";
					tabclickpane.className += " hidden";
				}
			});
			tab.addEventListener('click', function () {pane.className = pane.className.replace(/hidden/gi, '');tabclickpane.className = tabclickpane.className.replace(/hidden/gi, '');});
			tab.addEventListener('mouseover', function () {tabhoverpane.className = tabhoverpane.className.replace(/hidden/gi, '');});
			tab.addEventListener('mouseout', function () { tabhoverpane.className += ' hidden';});
			
			RaidCatcher.init({
				platform: 'ArmorGames',
				platformId: 2,
				user: RaidCatcher.util.getQueryVariable('user_id', gameframe.src),
				auth: RaidCatcher.util.getQueryVariable('user_id', gameframe.src).substring(0, 15),//first 15 characters of user_id
				iframeId: 'game-iframe',
				iframeLocation: 'http://web1.dawnofthedragons.com/armor/?',
				joinLocation: 'http://web1.dawnofthedragons.com/armor/?',
				gameLocation: 'http://armorgames.com/dawn-of-the-dragons-game/13509?',
				querystring: 'user_id='+RaidCatcher.util.getQueryVariable('user_id', gameframe.src)+'&auth_token='+RaidCatcher.util.getQueryVariable('auth_token', gameframe.src),
				querystringPrefix: 'ar'
			}, pane);
			
			pane.className = 'hidden';
			console.log('[RaidCatcher] AG Initialized.');
		} else {
			console.log('[RaidCatcher] AG resources not found ('+tries+' attempts), retrying in 1 second...');
			setTimeout('initAGDotD('+(++tries)+')', 1000);
		}
		
	}
	initAGDotD();
}
function ngmain(sv){//newgrounds
	console.log("[RaidCatcher] Newgrounds initializing...");
	window.initAGDotD = function (tries) {
		tries=(tries||1);
		if(tries % 5 == 0 && !(typeof DotDRaidInfo == 'object')){
			var script = document.createElement("script");
			script.src = 'http://dotd'+sv+'.azurewebsites.net/Scripts/RaidInfo_min.js?t='+new Date().getTime();
			script.type = 'text/javascript';
			(document.head || document.body || document.documentElement).appendChild(script);
		}
		if (tries > 12) {
			// Load cached raid info
			console.log("[RaidCatcher] Attempting to load cached raid info");
			if (typeof DotDRaidInfo != 'object') {
				try{ 
					var str = GM_getValue('RaidCatcher_RaidInfoCache','');
					if(str != ''){
						window.DotDRaidInfo = JSON.parse(str);
						for (var keyword in DotDRaidInfo.searchKeywords) {
							if (DotDRaidInfo.searchKeywords.hasOwnProperty(keyword)) {
								DotDRaidInfo.searchKeywords[keyword].reg = new RegExp(DotDRaidInfo.searchKeywords[keyword].reg, "i");
							}
						}
					} 
				}
				catch (ex){ RaidCatcher.ui.doError("Raid Cache Load Error", ex); }
			}
		}
		if(tries > 20){
			console.log('[RaidCatcher] AG resources not found. Aborting');
			return;
		}
		if(typeof RaidCatcher == "object" && typeof document.getElementById('html5_inner') != 'null' && typeof document.getElementById('html5_inner').getElementsByTagName('iframe')[0] != 'null' && typeof DotDRaidInfo == 'object'){
			console.log('[RaidCatcher] Newgrounds resources found.  Initializing...');
			RaidCatcher.$('style').set({type: "text/css",id: 'DotD_AG_styles'}).text(' \
				.room_name_container{font-style:italic;font-family:Arial,sans-serif;} .mbs{margin-bottom:5px !important} .h6_alt{color:#666}\
				#dotd_tab_pane {position:absolute;background-color:#DDD;width:264px !important;height:640px !important;z-index:500;}\
				#dotd_tab_pane select {width: auto !important}\
				#dotd_tab {position:absolute; width:65px; height:36px;z-index:500;cursor:pointer;background-image:url(http://i.imgur.com/WVr5l.png)}\
				.dotd_tab_overlay {position:absolute; width:65px; height:36px;z-index:500;pointer-events:none;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AsMEDEXzYbZWAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAFUlEQVQI12P8//+/LwMDAwMTAxQAADQ8A058cLdLAAAAAElFTkSuQmCC)}\
				.panel_handle {margin: 5px 0 8px;line-height: 10px;cursor: pointer;}\
				.panel_handle a {padding-left: 14px;font-weight: bold;text-transform: uppercase;text-decoration: none;color: #333;outline: none;}\
				.spritegame {background-image: url(http://www.kongregate.com/images/presentation/gamepage_sprite.png?35);background-color: transparent;background-repeat: no-repeat;}\
				.closed_link {background-position: -42px -1147px;}\
				.opened_link {background-position: -42px -1161px;}\
			').attach('to',document.head);
			
			var pane = RaidCatcher.$('div').set({id: 'dotd_tab_pane' }).attach("to", document.getElementsByTagName('body')[0]).ele();
			var tab = RaidCatcher.$('div').set({id: 'dotd_tab', class: 'dotd_tab'}).attach("to", document.getElementsByTagName('body')[0]).ele();
			var tabhoverpane = RaidCatcher.$('div').set({id: 'dotd_tab_hover_pane', class: 'hidden dotd_tab_overlay'}).attach("to", document.getElementsByTagName('body')[0]).ele();
			var tabclickpane = RaidCatcher.$('div').set({id: 'dotd_tab_click_pane', class: 'hidden dotd_tab_overlay'}).attach("to", document.getElementsByTagName('body')[0]).ele();
			var gameframe = document.getElementById('html5_inner').getElementsByTagName('iframe')[0];
			gameframe.setAttribute('id', 'game-iframe');
			
			var rf = function () {//handles window resizing and raid control placement
				console.log("[RaidCatcher] Repositioning");
				var el = document.getElementById('game-iframe');
				var x = parseInt(el.offsetLeft);
				var y = parseInt(el.offsetTop);
				while(el != null) { x += parseInt(el.offsetLeft); y += parseInt(el.offsetTop); el = el.offsetParent; }
				var x1=x+766, y1=y+47, x2=x+1026, y2=y+9;
				pane.style.left = x1+'px';pane.style.top = y1+'px';tab.style.left = x2+'px';tab.style.top = y2+'px';tabhoverpane.style.left = x2+'px';tabhoverpane.style.top = y2+'px';tabclickpane.style.left = x2+'px';tabclickpane.style.top = y2+'px';
			}
			rf();
			
			RaidCatcher.$('a').set({
				class: 'feature-tab',
				title: 'Refresh the game',
				href: 'http://www.newgrounds.com/portal/view/609826',
				onclick: 'RaidCatcher.game.reload();return false;',
				style: 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAAAmJLR0QALe9Sf0cAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcDAoTDiXIgp9xAAAAHWlUWHRDb21tZW50AAAAAABDcmVhdGVkIHdpdGggR0lNUGQuZQcAAAOcSURBVFjDtZhbSBVBGMd/s64GVlT4EGSBFQSRnh5CrcBuVkRQPQR2JMiIQJJeSiiKIEQogqIL9VQUPYQPRXS/UUaUFUGZJSF0oTtkx1AkRa2dHnbPOrs7e/SsnVnOYc9/Z+c33/fNnPlmxC5JhsoAfXyjXSzCJGMlm2xmgHwnxCQpSF6A8x29SPczmukUIXiHOYgYBEVBSQ9EAr9pwaCQPBtiKAgR2RrpgUgs4DOF5GAmEYYCiVaEA5EILMDA4hcwGtNu2G9L9IgIJBIDCxCOdYGYjCzwwo2N3V27NRMtJHrg0UEGmx2ZJcJ1l98m7MkoXG6qmAjivKKTLGZSQn2KqNjfQnWXd2bobdnDZc55lE985X4IwGsHiAKZhcBQxlcQMosGba8380wz25OzxL4qAUPtvd5RC0IQcIplgbgYGp+Y/vHgL7M5DjTQxgB51PqeHmIjL9xfm3jAe8dZqsPEVGk4ztLN+XFc5AAzOeoqSzjiA83jNxDnFwdZTMJxlu2wv4PuCi+nqOWOgoBGquj21HnCWNaymw28ZaG2lSEgN3kZ0JqpJuFRmtgLxGjiSRTIaa3aSo1Wv8B37RQ1os3vxVwNaNeYElI7EmQdsCqgWjSF1E97jZ/DXKq1T66HvpPCkrhGW8mZEAT0pA9Zzm4Os4LJbFHUG8SIUcZ+Ounw1D9LSygk1F0/gXLKAcjjOQkWctB51kUDDUAR06jnBxOBpylcHAopVe4rqACgg6+M57yrv+Y1l1lFP5PISR9SwhqNug2AXq551KtDDpYQyCjytfoJbvMx7SEfApmv0faR4G6kqasdXcWs16idEREhkHZt1RmREyUtZH3IYlsaEaKJyRLiwD0ukksudcqTk0DMV3sZS9k5RDamgTRyiXOs5iGwSPNn08MVAFYzjgRxtg+dk/mXX/8qP4bHgZdu8QrYwQDZrPCsIcl8xbv8igKZlWKNB8jnZmgfK2jTJkVeiOnPyIP5yjdqKKMyoJ+kzYfw7rR8gZdKcqkrjyhnK8VUucoxntOcYhuEu99yIHIYSXYd8IZWPtDLRGKcSS8ZL0iZdw0vx5fKne0qy01UK73ukoGUP7jrGN7eV82JAUyp5OLpWqDf/arNKzGRgR5HP6aQvsuxBA9EjnBjih4ikFjOP6X0xSSaJWB5/GMmAVYGDgskE4Bu212WssuS/+nYw76mAL02RK34vw9woB2zisyWL3SIDJ539dPHAH9EF/8A5zFApEGC7YcAAAAASUVORK5CYII=) !important;'
			}).attach("to","html5_header");
			
			window.addEventListener('resize', rf);
			window.addEventListener('message', function(event){//needed to hide raid pane when other tabs are clicked.
				if(/web1\.dawnofthedragons\.com/.test(event.origin) && /HideRaids/.test(event.data) && !/hidden/.test(pane.className)){
					pane.className += " hidden";
					tabclickpane.className += " hidden";
				}
			});
			tab.addEventListener('click', function () {pane.className = pane.className.replace(/hidden/gi, '');tabclickpane.className = tabclickpane.className.replace(/hidden/gi, '');});
			tab.addEventListener('mouseover', function () {tabhoverpane.className = tabhoverpane.className.replace(/hidden/gi, '');});
			tab.addEventListener('mouseout', function () { tabhoverpane.className += ' hidden';});
			RaidCatcher.init({
				platform: 'Newgrounds',
				platformId: 3,
				user: 'ng_'+RaidCatcher.util.getQueryVariable('NewgroundsAPI_UserName', gameframe.src),
				auth: RaidCatcher.util.getQueryVariable('NewgroundsAPI_UserID', gameframe.src),
				iframeId: 'game-iframe',
				iframeLocation: 'http://web1.dawnofthedragons.com/newgrounds/?',
				joinLocation: 'http://web1.dawnofthedragons.com/newgrounds/?',
				gameLocation: 'http://web1.dawnofthedragons.com/newgrounds/?',
				querystring: gameframe.src.substring(gameframe.src.indexOf("?")+1),
				querystringPrefix: 'ng'
			}, pane);
			pane.className = 'hidden';
			console.log('[RaidCatcher] Newgrounds Initialized.');
		} else {
			console.log('[RaidCatcher] Newgrounds resources not found ('+tries+' attempts), retrying in 1 second...');
			setTimeout('initAGDotD('+(++tries)+')', 1000);
		}
		
	}
	initAGDotD();
}
function agamemain(){//AG game frame (only for tab hiding)
	document.getElementById('chatSWF').addEventListener('mouseup', function (){
		window.parent.postMessage('HideRaids', 'http://armorgames.com/dawn-of-the-dragons-game');
	});
}
function nggamemain(){//NG game frame (only for tab hiding)
	document.getElementById('chatSWF').addEventListener('mouseup', function (){
		window.parent.postMessage('HideRaids', 'http://www.newgrounds.com/portal/view/609826');
	});
}
//var rightNow = new Date(),jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0),temp = jan1.toGMTString(),jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1)),gmt_offset = (jan1 - jan2) / (1000 * 60 * 60);
var d = document;
if(window.top == window.self && (
	/^http:\/\/armorgames\.com\/dawn-of-the-dragons-game/i.test(d.location.href) ||
	/^http:\/\/www\.kongregate\.com\/games\/5thplanetgames\/dawn-of-the-dragons(?:\/?$|\?|#)/i.test(d.location.href) ||
	/^http:\/\/www\.newgrounds\.com\/portal\/view\/609826(?:\/?$|\?|#)/i.test(d.location.href)
	)){
	console.log("[RaidCatcher] Starting...");
	var s = Math.floor(Math.random()*5)+1;//Random will give more even balance.
	
	//if((gmt_offset >= -12 && gmt_offset < -5) || gmt_offset > 9) s = 1;//W US
	//else if(gmt_offset >= -5 && gmt_offset < -1) s = 2;//E US
	//else if(gmt_offset >= -1 && gmt_offset < 1) s = 3;//W Eur
	//else s = 4;//E Asia
	
	var origs = s;
	var cyclePing = function(){
		if(s == ""){
			alert("All RaidCatcher servers failed to respond. Attempting to load script without server interaction."); 
			start("");
			delete cyclePing;
			delete ping;
			return;
		}
		if(++s>5) s=1; 
		if(s==origs) s = "";
		ping(); 
	}
	var ping = function () {
		console.log("[RaidCatcher] Pinging mirror " + s);
		GM_xmlhttpRequest({
			method:"Get",
			url:'http://dotd'+s+'.azurewebsites.net/ServerPing.aspx',
			onload: function(response){
				if(response.responseText=='1'){ 
					console.log("[RaidCatcher] Ping of mirror " +s+" successful.");
					start(s);
					delete cyclePing;
					delete ping;
				}else{ 
					console.log("[RaidCatcher] Invalid mirror ping response.");
					//console.log(response.responseText);
					cyclePing();
				}
			},
			timeout: 30000,
			onerror: function(response){
				console.log("Ping of mirror " +s+" errored.");
				cyclePing();
			},
			ontimeout: function(response){
				console.log("Ping of mirror " +s+" timed out");
				cyclePing();
			}
		});
	}
	
	var start = function(s){ 
		console.log("[RaidCatcher] Starting mirror "+s);
		
		var script = d.createElement("script");
		script.src = 'http://dotd'+s+'.azurewebsites.net/Scripts/RaidInfo_min.js?t='+new Date().getTime();
		script.type = 'text/javascript';
		(d.head || d.body || d.documentElement).appendChild(script);
		
		d.addEventListener("rc.req", function (param) {
			var a = param.data;
			a.callback = function (e, r) {
				this.onload = null;
				this.onerror = null;
				this.ontimeout = null;
				this.event = e;
				this.status = r.status;
				this.responseText = r.responseText;
				var c = document.createEvent("MessageEvent");
				if (c.initMessageEvent) {
					c.initMessageEvent(this.eventName, false, false, this, document.location.protocol + "//" + document.location.hostname, 1, unsafeWindow, null);
				} else {
					c = new MessageEvent(this.eventName, {"origin": document.location.protocol + "//" + document.location.hostname, "lastEventId": 1, "source": unsafeWindow, "data": this})
				}
				document.dispatchEvent(c);
			};
			a.onload = a.callback.bind(a, "load");
			a.onerror = a.callback.bind(a, "error");
			a.ontimeout = a.callback.bind(a, "timeout");
			setTimeout(function () {  GM_xmlhttpRequest(a); }, 0);
		});
		
		if (/^http:\/\/armorgames\.com\/dawn-of-the-dragons-game/i.test(d.location.href)) {//amain
			var script = d.createElement("script");
			script.appendChild(d.createTextNode('('+shared+')("'+s+'")'));
			(d.head || d.body || d.documentElement).appendChild(script);
			
			var ascript = d.createElement("script");
			ascript.appendChild(d.createTextNode('('+amain+')("'+s+'")'));
			(d.head || d.body || d.documentElement).appendChild(ascript);
		}
		if (/^http:\/\/www\.kongregate\.com\/games\/5thplanetgames\/dawn-of-the-dragons(?:\/?$|\?|#)/i.test(d.location.href)) {//kmain
			var script = d.createElement("script");
			script.appendChild(d.createTextNode('('+shared+')("'+s+'")'));
			(d.head || d.body || d.documentElement).appendChild(script);
			
			var kscript = d.createElement("script");
			kscript.appendChild(d.createTextNode('('+kmain+')("'+s+'")'));
			(d.head || d.body || d.documentElement).appendChild(kscript);

		}
		if (/^http:\/\/www\.newgrounds\.com\/portal\/view\/609826(?:\/?$|\?|#)/i.test(d.location.href)) {//kmain
			var script = d.createElement("script");
			script.appendChild(d.createTextNode('('+shared+')("'+s+'")'));
			(d.head || d.body || d.documentElement).appendChild(script);
			
			var kscript = d.createElement("script");
			kscript.appendChild(d.createTextNode('('+ngmain+')("'+s+'")'));
			(d.head || d.body || d.documentElement).appendChild(kscript);

		}
		delete start;
	}
	ping();
}
if(/^http:\/\/web.\.dawnofthedragons\.com\/armor/i.test(d.location.href)){//agamemain
	var ascript = d.createElement("script");
	ascript.appendChild(d.createTextNode('('+agamemain+')()'));
	(d.head || d.body || d.documentElement).appendChild(ascript);
}
if(/^http:\/\/web.\.dawnofthedragons\.com\/newgrounds/i.test(d.location.href)){//agamemain
	var ascript = d.createElement("script");
	ascript.appendChild(d.createTextNode('('+nggamemain+')()'));
	(d.head || d.body || d.documentElement).appendChild(ascript);
}