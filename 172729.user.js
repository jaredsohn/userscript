// ==UserScript==
// @name            Gala Stuff 2.0
// @namespace       Crazycatz00
// @description     Because they just HAD to change the layout...
// @match           *://www.galagiveaways.com/*
// @icon            http://www.galagiveaways.com/favicon.ico
// @downloadURL     https://userscripts.org/scripts/source/172729.user.js
// @updateURL       https://userscripts.org/scripts/source/172729.meta.js
// @version         1.4.5
// @grant           none
// ==/UserScript==
(function(window){'use strict';var $=window.jQuery;
	//if(typeof $!=='function'){alert('Gala Stuff 2.0\nFailed to load jQuery, aborting!\nPlease make sure you aren\'t blocking it.');return;}
	//if(typeof JSON==='undefined'){alert('Gala Stuff 2.0\nJSON API not supported in this browser, aborting!');return;}
	/*Shim console.log, because I like leaving it in for those random edge cases*/
	if(!window.console){window.console={log:function(){}};}else if(typeof window.console.log!=='function'){window.console.log=function(){};}
	var settings,
		settingsLoad=function(){
			var def={sSteam:true,sDesura:true,sOrigin:true,sExtraOdds:true,sPoker:true,sEntered:true,sMassive:true,maxPrice:0,maxFeedback:-1,dynamicLoad:false,dynamicSort:0,scroll:false,highlight:false,firefoxFix:false,seen1stTime:false,hBlue:'background-color:rgba(0,0,255,.5);',hGreen:'background-color:rgba(0,255,0,.5);',hYellow:'background-color:rgba(204,204,0,.5);',hRed:'background-color:rgba(255,0,0,.5);'},i,c=false;
			settings=JSON.parse(localStorage.gs2Settings||'{}');
			for(i in def){if(typeof settings[i]==='undefined'){settings[i]=def[i];c=true;};}
			if(c){settingsSave();}
			vPts=settings.maxPrice;try{vPts=1*$('#account_points').text().replace(/[^\d]+/g,'');}catch(e){console.log(e);}
		},
		settingsSave=function(){localStorage.gs2Settings=JSON.stringify(settings);},
		filteredGames,
		filteredGamesLoad=function(){filteredGames=JSON.parse(localStorage.gs2Filter||'{}');},
		filteredGamesSave=function(){localStorage.gs2Filter=JSON.stringify(filteredGames);},
		addCSS=function(){
			var s=document.createElement('style'),c=function(t){return t;};s.type='text/css';
			s.innerHTML='.games-selection{overflow:hidden;}.galastuff20-hBlue a>.image-block{'+c(settings.hBlue)+'}.galastuff20-hGreen a>.image-block{'+c(settings.hGreen)+'}.galastuff20-hYellow a>.image-block{'+c(settings.hYellow)+'}.galastuff20-hRed a>.image-block{'+c(settings.hRed)+'}';
			if(settings.firefoxFix===true){s.innerHTML+='.game-description .giveaway-type{right:0;}';}
			document.head.appendChild(s);
			document.body.classList.add("galastuff20");
		},
		showMsg=function(a,cc,t,f){var c=function(f){if(typeof cc==='function'&&cc(f=f===true)===false&&!f){return;}e.remove();},e=$('<div style="margin:auto;display:table;padding:0.5em 1em;background:rgba(0,0,0,0.9);color:#FFF;border-radius:1em;"></div>').appendTo($('<div style="width:100%;position:fixed;top:45%;z-index:1315;"></div>').appendTo('body')).append($('<h2>Gala Stuff 2.0'+(typeof t==='string'&&t.length!==0?' '+t:'')+'</h2>'));for(t in a){if(a.hasOwnProperty(t)){e.append(a[t]);}}$('<br><a href="javascript:void(0)" style="color:#FFF;display:table;margin:auto;">[Dismiss]</a>').appendTo(e).click(c);if(typeof f==='number'){e.delay(f).fadeOut(1000,c.bind(undefined,true));}},
		matchSteam=/steampowered\.com.*\/(?:apps|subs)\/(\d+)\//,
		matchDesura=/desura\.com.*\/(\d+)\/[^\/]+\./i,
		matchOrigin=/\/[^-_\/]+[-_]([^\/]+)(?:big|\d{3}x[^\/]+)\.[^\/]+$/i,
		vPts=0,
	_filterGamesID=function(u,t){
		var s;
		if(s=u.find('.image-block>img:not([class="icon"]):not([alt="Icon"])').attr('src')){
			if((!t||(t&1)===1)&&s.search(matchSteam)!==-1){s='s'+RegExp.$1;
			}else if((!t||(t&2)===2)&&s.search(matchDesura)!==-1){s='d'+RegExp.$1;
			}else if((!t||(t&4)===4)&&s.search(matchOrigin)!==-1){
				if(RegExp.$1.search(/IGM/i)===-1){s='o'+RegExp.$1.toLowerCase();}
				else if((s=u.find('.title').text().replace(/\s\s*/g,'')).length!==0){s='o'+s.toLowerCase()}
				else{s=false;}
			}else{s=false;}
		}
		return s;
	},
	_filterGamesRaw=function(){
		var u=$(this),s=u.find('img.icon[src*="icon-game"]').attr('src'),t=0,v;
		if(s&&s.search(/icon-game(\d*)\./)!==-1){
			switch(1*RegExp.$1){
				case 0:if(!settings.sSteam){return true;}t=1;break;
				case 2:if(!settings.sDesura){return true;}t=2;break;
				case 3:if(!settings.sOrigin){return true;}t=4;break;
			}
		}
		if(settings.sEntered===false&&u.find('.image-block').text().indexOf('Bid')!==-1){return true;}
		if((s=u.find('.giveaway-type>img:not([class])').attr('src'))&&s.search(/images\/icon-(.*)\.png/)!==-1){
			switch(RegExp.$1){
				case 'odds':if(!settings.sExtraOdds){return true;}t|=16;break;
				case 'poker':case 'mix2':if(!settings.sPoker){return true;}break;
			}
		}
		if(settings.maxPrice!==0&&(s=u.find('.points').text())&&s.search(/Points:\s*([\d,]+)/)!==-1&&(1*RegExp.$1.replace(/[^\d]+/g,''))>settings.maxPrice){return true;}
		if(settings.maxFeedback>=0&&(s=u.find('.points').text())&&s.search(/Min\s+Fb:\s*([\d,]+)/)!==-1&&(1*RegExp.$1.replace(/[^\d]+/g,'')>settings.maxFeedback)){return true;}
		if(typeof (s=_filterGamesID(u,t))==='string'&&s in filteredGames){return true;}
		if(settings.highlight!==false){
			if((s=u.find('.points').text())&&s.search(/Points: ([\d,]+)/i)!==-1){
				v=u.find('.image-block');
				if((s=1*RegExp.$1.replace(/[^\d]+/g,''))===vPts||((t&16)===16&&s<vPts&&s*10>=vPts)){
					u[0].classList.add('galastuff20-hYellow');
				}else if(s>vPts){
					u[0].classList.add('galastuff20-hRed');
				}else if(s<vPts){
					if((s=u.find('.players').text())&&s.search(/Max\s*Pl/i)!==-1){
						u[0].classList.add('galastuff20-hBlue');
					}else{
						u[0].classList.add('galastuff20-hGreen');
					}
				}
			}
		}
		//Fix bug where some titles show up as "Something &amp; Something"
		if((s=u.find('.title')).length>0){s.html(s.text());}
		return false;
	},
	filterGames=function(){filteredGamesLoad();
		//Bug in Gala sometimes does "?gameprovider=undefined" then errors out with no giveaways found
		if(document.location.search.search(/[?&]gameprovider=undefined/)!==-1){document.location.href=document.location.href.replace(/([?&]gameprovider=)undefined/,'$1all');}
		if(settings.scroll){$('#content')[0].scrollIntoView(true);}
		if(!settings.sMassive){$('.games-massive').remove();}
		$('.games-selection .game-description').filter(_filterGamesRaw).hide();
		window.addEventListener('storage',function(e){if(e.key==='gs2Filter'){
			var t=filteredGames,i;filteredGamesLoad();
			$('.games-selection .game-description').filter(_filterGamesRaw).hide(1000);
			//Show giveaways that were un-filtered
			for(i in t){if(!(i in filteredGames)){$('.games-selection .game-description').filter(function(){if(i===_filterGamesID($(this))){return true;}return false;}).show(1000);}}
		}},false);
		var t=document.location.pathname.search(/(\/[^\/]+)(?:\/(\d+))?$/)!==-1,
			loadBase=(t&&RegExp.$1.length>1?RegExp.$1:'/home')+'/',
			loadCur=t&&1*RegExp.$2>0?1*RegExp.$2:1,
			loading=false,
			loadingStatus=$('<div style="text-align:center;clear:both;padding-top:.75em;"></div>').appendTo($('.games-selection>div')),
			loadLast=$('.pages-wrapper a:nth-last-child(2)').text()*1||1,
			loadNext=function(d){
				/*Add all giveaways, with filtered ones hidden*/
				d=$(d).find('.games-selection .game-description');d.filter(_filterGamesRaw).hide();$('.games-selection ul').append(d);
				/*Only add giveaways that are NOT filtered*/
				//$('.games-selection ul').append($(d).find('.games-selection .game-description').not(_filterGamesRaw));
				d=''+loadCur;
				$('.pages-wrapper a').filter(function(){return $(this).text()===d;}).hide();
				if(loadCur>=loadLast){
					$(window).unbind('scroll',loadCheck);
					$('.pages-wrapper a:contains(Next)').remove();
					loadingStatus.text("You've reached the end.");
				}else{
					$('.pages-wrapper a:contains(Next)').attr('href',loadBase+(loadCur+1)+document.location.search);
					loadingStatus.empty();
					loading=false;
					if(settings.dynamicLoad){setTimeout(loadCheck,100);}
				}
				if(typeof sortF==='function'&&sortL>0){sortF(sortL);}
/*if(window.gs2PageHooks&&typeof window.gs2PageHooks.dynPageLoad==='function'){window.gs2PageHooks.dynPageLoad();}//*/
			},
			loadCheckE=$('.pages-wrapper')[0]||document.getElementById('footer'),
			loadCheckImg=$('<img/>',{width:24,height:24,src:'data:image/gif;base64,R0lGODlhGAAYAPMEANf08wC7tDfKxH/d2WvY01vTz9Lz8sfw76Pm5BvDvELMyKHm5Oz6+bjs6k7QywAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hoiQ3JlYXRlZCB3aXRoIENoaW1wbHkuY29tIgAh+QQJCgAEACwAAAAAGAAYAAAEcJCESYm9ON8gughamHEeKJ5kZ55h+rGiu8KYbBlHfhi3vls2ggFABPCERSPQ80IWj8PnsnRLQq1TVVXqJB6DUe9WLGGawspuGoxVf83jNPpNdcfpWruezZ1nmwyBghaCg2V1NDVwiYqIjId5j5BNjxEAIfkECQoABAAsAAAAABgAGAAABIeQyDmDvTSTxLsMQigEGpUUaJF84lhOZ7oSoEi+W6qyNp7LvNDtFUPNakKJ4cA8GCTFHa11MwCugOfPGHQRrFht9EhVYrNQHbn3PYvV3ao7DZyywdd3HenFo7dSfHJhdFx2SW2EgGuIfnqGgmaKY3ESDJeYhYFlOJSHXkRwn0MlHR6jPi+RLxEAIfkECQoAAAAsAAAAABgAGAAABIwQyEmrDDhbmrq/QigEkqOciiMlRVskoEgCymAPyuq+cTjXtxyA5YIBAqKRBGgTEltGpGx5w+mKPSWt6txFkz/uFZoNB8e8I5h6HnrL7Cb6O922n2mpL251Y9V1TH14dHt2cn5kgIaCXX96Wo1zcIeDb4uRYol5a5WOipAzJigqm4VaG0MeHZSpqaEAEQAh+QQJCgAAACwAAAAAGAAYAAAEiBDISau9uKbNM3BKqDhSUpxFIg1sKyntoJRoKhFIjhBvPAMmlAqA0/EAsNYveBoWc8cka1lz6nY9JU14u0Z922bXmJ2GbURvWXa2kpFgYHUMXVO56beULcc/sXBafWJ5dYFmg2h/X4JMimqHfI5uhnt3hIt2bSsxA5qJQxggIiSgHhgcHaerABEAIfkECQoAAAAsAAAAABgAGAAABIIQyEmrvThr7ZRXjjaMpKSQgyI1bCsRSIwQJqoCy6EfyyvPNdItt+sBYDIa4CSUEHVGZEzJHA13PF8yaHVioz+qzVvUTrkpMtQMXI5xX7a4CS8fw+irXdquputrd1tudE9ZgmeEXYCHfHOLhmCDfjctLoh9bxgoI3kbFx0fIZ+kpRkRACH5BAkKAAEALAAAAAAYABgAAAR5MMhJq7046833+KDWjKREIChCaMvhHouZqpLxHobUvnFwpquAAUAE5AI7V++HCg6LxyRMBqwVjbrbcua8RrXUphWa5YVpQm9Zee6SkWAfd0z8muXV9Fu6zT/ra1N4YnqAcHdMaAyLjIF9hBgkJYNoHRMgIZaam5waEQAh+QQJCgABACwAAAAAGAAYAAAEZTDISau9OOvNu8dNKH7TcpzHIhnoYaztG5ioGhhADsi4LtMnWy/H0+0kwNTKWPQhW0Lm0jmDTonXY7WWbWK3wa4YrLxJzdRklDrUqsftnxX9jT+5AYZ+L9nzyTYkIiMkhYaHiBYRACH5BAkKAAEALAAAAAAYABgAAARRMMhJq7046827/2BmHORhSGN5Bim5GkAMvPKM1rScx7vN4jddkDf0wYQ/5JGYZC6NwCZUGX32rkWsVGvNerffLjjAKJsl5jM5zQi53/C4nBIBADsK'}),
			loadCheck=function(){var r=loadCheckE.getBoundingClientRect();if(!loading&&r.top>=0&&r.left>=0&&r.top<=(window.innerHeight||document.documentElement.clientHeight)&&r.left<=(window.innerWidth||document.documentElement.clientWidth)&&loadCur!==loadLast){loading=true;loadingStatus.append(loadCheckImg).append(document.createTextNode(' Loading page '+(++loadCur)+'...'));$.get(loadBase+loadCur+document.location.search,loadNext);}};
		if(settings.dynamicLoad&&loadCur<loadLast&&loadLast>1){
			loadCheck();
			$(window).bind('scroll',loadCheck);
		}
		t=$('.radioGroup');
		if(t.length>0){
			$('.games-search .link-button').remove();
			t.append($('<br>'));
			$('<input type="radio" id="gs2Dynamic" style="visibility:hidden;margin-right:5px;"'+(settings.dynamicLoad?' checked':'')+'>').appendTo(t).click(function(){
				var c=!settings.dynamicLoad;
				$(this).data('check',c);
				$(this).prop('checked',settings.dynamicLoad=c);settingsSave();
				if(loadCur>=loadLast||loadLast<2){return;
				}else if(c){$(window).bind('scroll',loadCheck);loadCheck();
				}else{$(window).unbind('scroll',loadCheck);}
			});
			t.append($('<label for="gs2Dynamic">Dynamic Loading</label>'));
			$('<label for="sbFilter">Sort Giveaways</label>').appendTo(t);
			var sortL=0,sortF=function(v,i){if(typeof v==='object'){v=this.value;}else if(typeof v==='string'){v*=1;}
				var f,g;
				switch(v%1000){
					case -1:settings.dynamicSort=sortL;settingsSave();showMsg(['Saved default sort!'],0,0,3000);sortE.val(sortL);if((f=$('#sbSelector_'+sortE.attr('sb'))).length!==0){f.text(sortE.find('option:selected').text());}return false;
					case 0:f=function(a,b){var r=/^[^\d]*(?:(\d+)\s*week[^\d]*)?(?:(\d+)\s*day[^\d]*)?(?:(\d+)\s*hour[^\d]*)?(?:(\d+)\s*min[^\d]*)?(?:(\d+)\s*sec[^\d]*)?/i;if($(a).find('.ends').text().search(r)!==-1){a=(((7*RegExp.$1+1*RegExp.$2)*24+1*RegExp.$3)*60+1*RegExp.$4)*60+1*RegExp.$5;}else{a=0;}if($(b).find('.ends').text().search(r)!==-1){b=(((7*RegExp.$1+1*RegExp.$2)*24+1*RegExp.$3)*60+1*RegExp.$4)*60+1*RegExp.$5;}else{b=0;}return a-b;};break;
					case 1:f=function(a,b){return $(a).find('.title').text().trim().toLowerCase().localeCompare($(b).find('.title').text().trim().toLowerCase());};break;
					case 2:f=function(a,b){return ($(a).find('.points').text().search(/Points: ([\d,]+)/i)!==-1?1*RegExp.$1.replace(/[^\d]+/g,''):0)-($(b).find('.points').text().search(/Points: ([\d,]+)/i)!==-1?1*RegExp.$1.replace(/[^\d]+/g,''):0);};break;
					case 3:f=function(a,b){return ($(a).find('.players').text().search(/Players: ([\d,]+)/i)!==-1?1*RegExp.$1.replace(/[^\d]+/g,''):0)-($(b).find('.players').text().search(/Players: ([\d,]+)/i)!==-1?1*RegExp.$1.replace(/[^\d]+/g,''):0);};break;
					case 4:f=function(a,b){return ($(a).find('.giveaway-type>img:not([class])').attr('src')||'').localeCompare($(b).find('.giveaway-type>img:not([class])').attr('src')||'');};break;
					default:return false;
				}
				if(v>999){g=f;f=function(a,b){return (($(a).find('.image-block').text().indexOf('Bid')!==-1)-($(b).find('.image-block').text().indexOf('Bid')!==-1))||g(a,b);};}
				$('.games-selection ul').append($('.games-selection .game-description').sort(f));sortL=v;
				return true;
			},
			sortE=$('<select class="custom-selec"><option value="0">End Time</option><option value="1">Alphabetical</option><option value="2">Points</option><option value="3">Players</option><option value="4">Type</option></select>').appendTo(t).change(sortF);
			sortE.find('option').each(function(){if(this.value<0||this.value>999){return;}$(this).clone().val((this.value*1)+1000).text(this.textContent+' [ES]').appendTo(sortE);});
			$('<option value="-1">—Save Sort—</option>').appendTo(sortE);
			if(settings.dynamicSort>0&&sortF(sortL=settings.dynamicSort)){sortE.val(sortL);}
			sortE.selectbox({effect:'fade',onChange:sortF});
		}
	},
	gamePage=function(){filteredGamesLoad();
		var p=document.createElement('p'),id=$('.game-image img').attr('src');
		if(!id){return;
		}else if(id.search(matchSteam)!==-1){id='s'+RegExp.$1;
		}else if(id.search(matchDesura)!==-1){id='d'+RegExp.$1;
		}else if(id.search(matchOrigin)!==-1){id='o'+RegExp.$1.toLowerCase();
		}else{return;}
		$('.info-text').append(p);
		p=p.appendChild(document.createElement('a'));p.href='javascript:void(0);';p.style.cssText='color:#C00101;text-decoration:none;';
		if(id in filteredGames){p.textContent='Remove from filter [ID='+id+']';}else{p.textContent='Add to filter [ID='+id+']';}
		p.addEventListener('click',function(){
			if(id in filteredGames){
				delete filteredGames[id];
				p.textContent='Add to filter [ID='+id+']';
			}else{
				var n=$('.name a').text();if(n&&n.search(/^([^\n]+)/)!==-1){n=RegExp.$1.trim();}else{n=true;}
				filteredGames[id]=n;
				p.textContent='Remove from filter [ID='+id+']';
			}
			filteredGamesSave();
		});
		window.addEventListener('storage',function(e){if(e.key==='gs2Filter'){
			filteredGamesLoad();
			if(id in filteredGames){
				if(p.textContent.indexOf('Remove from filter')===-1){
					p.textContent='Remove from filter [ID='+id+']';
				}
			}else{
				if(p.textContent.indexOf('Add to filter')===-1){
					p.textContent='Add to filter [ID='+id+']';
				}
			}
		}},false);
	},
	userPage=function(){filteredGamesLoad();
		var p=document.createElement('section'),e,s,t,sH,sG=p;
		$('.account-links').append(p);p.appendChild(document.createElement('header')).appendChild(document.createElement('h2')).innerHTML='Gala Stuff 2.0 Settings';p=p.appendChild(document.createElement('ul'));
		if(typeof GM_info==='object'&&typeof GM_info.script==='object'){
			p.appendChild(document.createElement('li')).textContent='Version: '+GM_info.script.version;
			p.appendChild(document.createElement('li')).textContent='This script will '+(GM_info.scriptWillUpdate?'':'NOT ')+'automatically update';
		}
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('a'))).textContent='Forum thread';e.href='/topic/15052ec00b5c11e38ef74762841af6b7';
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('a'))).textContent='Userscripts.Org';e.href='https://userscripts.org/scripts/show/172729';
		p.appendChild(document.createElement('li')).innerHTML='&nbsp;';
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('input')));e.type='button';e.value='Restore Defaults';e.title='Does not affect filtered games list';e.addEventListener('click',function(){if(confirm('Are you sure you want to reset settings?\nNote that this will NOT clear the filtered games list!')){localStorage.removeItem('gs2Settings');window.location.reload();}},false);
		if(settings.seen1stTime===false){(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('input')));e.type='button';e.value='Disable first-time dialog';e.addEventListener('click',function(){settings.seen1stTime=true;settingsSave();},false);}
		p.appendChild(document.createElement('li')).innerHTML='&nbsp;';
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('label')).appendChild(document.createElement('input'))).parentNode.appendChild(document.createTextNode('Show Steam giveaways'));e.type='checkbox';e.checked=settings.sSteam;e.addEventListener('change',function(){settings.sSteam=this.checked;settingsSave();},false);
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('label')).appendChild(document.createElement('input'))).parentNode.appendChild(document.createTextNode('Show Desura giveaways'));e.type='checkbox';e.checked=settings.sDesura;e.addEventListener('change',function(){settings.sDesura=this.checked;settingsSave();},false);
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('label')).appendChild(document.createElement('input'))).parentNode.appendChild(document.createTextNode('Show Origin giveaways'));e.type='checkbox';e.checked=settings.sOrigin;e.addEventListener('change',function(){settings.sOrigin=this.checked;settingsSave();},false);
		p.appendChild(document.createElement('li')).innerHTML='&nbsp;';
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('label')).appendChild(document.createElement('input'))).parentNode.appendChild(document.createTextNode('Show Extra Odds giveaways'));e.type='checkbox';e.checked=settings.sExtraOdds;e.addEventListener('change',function(){settings.sExtraOdds=this.checked;settingsSave();},false);
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('label')).appendChild(document.createElement('input'))).parentNode.appendChild(document.createTextNode('Show Poker giveaways'));e.type='checkbox';e.checked=settings.sPoker;e.addEventListener('change',function(){settings.sPoker=this.checked;settingsSave();},false);
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('label')).appendChild(document.createElement('input'))).parentNode.appendChild(document.createTextNode('Show Massive giveaways'));e.type='checkbox';e.checked=settings.sMassive;e.addEventListener('change',function(){settings.sMassive=this.checked;settingsSave();},false);
		p.appendChild(document.createElement('li')).innerHTML='&nbsp;';
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('label')).appendChild(document.createElement('input'))).parentNode.appendChild(document.createTextNode('Show entered giveaways'));e.type='checkbox';e.checked=settings.sEntered;e.addEventListener('change',function(){settings.sEntered=this.checked;settingsSave();},false);
		e=p.appendChild(document.createElement('li')).appendChild(document.createTextNode('Hide giveaways above this many points (0=Disable) ')).parentNode.appendChild(document.createElement('input'));e.type='number';e.min=0;e.value=settings.maxPrice;e.addEventListener('change',function(){var n=1*this.value;if(isNaN(n)||n<0){return;}settings.maxPrice=n;settingsSave();},false);
		e=p.appendChild(document.createElement('li')).appendChild(document.createTextNode('Hide giveaways above this much feedback (-1=Disable) ')).parentNode.appendChild(document.createElement('input'));e.type='number';e.min=-1;e.value=settings.maxFeedback;e.addEventListener('change',function(){var n=1*this.value;if(isNaN(n)||n<-1){return;}settings.maxFeedback=n;settingsSave();},false);
		p.appendChild(document.createElement('li')).innerHTML='&nbsp;';
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('label')).appendChild(document.createElement('input'))).parentNode.appendChild(document.createTextNode('Dynamic giveaway page loading'));e.type='checkbox';e.checked=settings.dynamicLoad;e.addEventListener('change',function(){settings.dynamicLoad=this.checked;settingsSave();},false);
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('label')).appendChild(document.createElement('input'))).parentNode.appendChild(document.createTextNode('Scroll down to giveaways on load'));e.type='checkbox';e.checked=settings.scroll;e.addEventListener('change',function(){settings.scroll=this.checked;settingsSave();},false);
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('label')).appendChild(document.createElement('input'))).parentNode.appendChild(document.createTextNode('Fix a site-bug that doesn\'t show giveaway type banners (affects mostly Firefox)'));e.type='checkbox';e.checked=settings.firefoxFix;e.addEventListener('change',function(){settings.firefoxFix=this.checked;settingsSave();},false);
		(e=p.appendChild(document.createElement('li')).appendChild(document.createElement('label')).appendChild(document.createElement('input'))).parentNode.appendChild(document.createTextNode('Highlight giveaways based on points'));e.type='checkbox';e.checked=settings.highlight;e.addEventListener('change',function(){if(settings.highlight=this.checked){sH.show(500);}else{sH.hide(500);}settingsSave();},false);
		$('.account-links').append(p=document.createElement('section'));sH=$(p);if(!settings.highlight){sH.hide();}p.appendChild(document.createElement('header')).appendChild(document.createElement('h2')).textContent='Gala Stuff 2.0 Highlight Styles (Blank for default)';p=p.appendChild(document.createElement('ul'));
		e=p.appendChild(document.createElement('li')).appendChild(document.createTextNode('Blue (Enough points to enter and is a Maximum Players giveaway)')).parentNode.appendChild(document.createElement('input'));e.type='text';e.value=settings.hBlue;e.addEventListener('change',function(){if(this.value.length===0){delete settings.hBlue;}else{settings.hBlue=this.value;}settingsSave();},false);
		e=p.appendChild(document.createElement('li')).appendChild(document.createTextNode('Green (Enough points to enter)')).parentNode.appendChild(document.createElement('input'));e.type='text';e.value=settings.hGreen;e.addEventListener('change',function(){if(this.value.length===0){delete settings.hGreen;}else{settings.hGreen=this.value;}settingsSave();},false);
		e=p.appendChild(document.createElement('li')).appendChild(document.createTextNode('Yellow (Uses all your points; Extra Odds: Can enter at least 1 time but not 10 times)')).parentNode.appendChild(document.createElement('input'));e.type='text';e.value=settings.hYellow;e.addEventListener('change',function(){if(this.value.length===0){delete settings.hYellow;}else{settings.hYellow=this.value;}settingsSave();},false);
		e=p.appendChild(document.createElement('li')).appendChild(document.createTextNode('Red (Not enough points to enter)')).parentNode.appendChild(document.createElement('input'));e.type='text';e.value=settings.hRed;e.addEventListener('change',function(){if(this.value.length===0){delete settings.hRed;}else{settings.hRed=this.value;}settingsSave();},false);
		$('.account-links').append(p=document.createElement('section'));p.appendChild(document.createElement('header')).appendChild(document.createElement('h2')).textContent='Gala Stuff 2.0 Filtered Games (Click to remove)';p=p.appendChild(document.createElement('ul'));
		t=function(){var i=this.getAttribute('data-id');if(i&&i in filteredGames&&confirm('Are you sure you want to remove '+this.textContent+'?')){delete filteredGames[i];filteredGamesSave();this.parentNode.removeChild(this);}};
		for(e in filteredGames){s=p.appendChild(document.createElement('li')).appendChild(document.createElement('a'));s.href='javascript:void(0);';s.setAttribute('data-id',s.title=e);if(typeof filteredGames[e]==='string'){s.innerHTML=filteredGames[e];}else{s.textContent='ID: '+e;}s.addEventListener('click',t,false);}
		window.addEventListener('storage',function(r){var h;if(r.key==='gs2Filter'){
			filteredGamesLoad();
			h={};
			$('a[data-id]').filter(function(){e=this.getAttribute('data-id');if(!(e in filteredGames)){return true;}h[e]=true;return false;}).remove();
			for(e in filteredGames){if(!(e in h)){
				s=p.appendChild(document.createElement('li')).appendChild(document.createElement('a'));s.href='javascript:void(0);';s.setAttribute('data-id',s.title=e);if(typeof filteredGames[e]==='string'){s.innerHTML=filteredGames[e];}else{s.textContent='ID: '+e;}s.addEventListener('click',t,false);
			}}
		}else if(r.key==='gs2Settings'){
			showMsg(['Settings have changed from another page!<br /><a href="javascript:void(window.location.reload())">Reload this page</a>']);
		}},false);
		if(document.location.hash==='#gs2section'){sG.scrollIntoView(true);}
	};
	settingsLoad();addCSS();
/*window.gs2PageHooks={version:typeof GM_info==='object'&&typeof GM_info.script==='object'?GM_info.script.version:''};//*/
	if(window.location.pathname.search(/\/(enter|leave)?GA\//)!==-1){gamePage();
	}else if(window.location.pathname.indexOf('/profile')===0){userPage();
	}else if($('.games-selection').length!==0){filterGames();}
	if(settings.seen1stTime===false){showMsg(['To configure, check your <a href="/profile#gs2section" style="color:#FFF;">profile page!</a>'],function(){settings.seen1stTime=true;settingsSave();settingsLoad();},'Installed!');}
}(typeof window.jQuery!=='function'&&typeof unsafeWindow!=='undefined'&&typeof unsafeWindow.jQuery==='function'?unsafeWindow:window));