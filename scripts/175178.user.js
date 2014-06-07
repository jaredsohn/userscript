// ==UserScript==
// @name Tremor Games Filter
// @namespace Crazycatz00
// @include http://www.tremorgames.com/index.php?action=*
// @version 1.0.1
// @grant none
// ==/UserScript==
(function(){'use script';
	var SETTINGS,
		loadSettings=function(){SETTINGS=JSON.parse(window.localStorage.tgfSettings||'{"filter":true,"hide":false,"filterDesura":false,"filterSteam":false,"filterGOG":false,"filterNames":{}}')},
		saveSETTINGS=function(){window.localStorage.tgfSettings=JSON.stringify(SETTINGS);},
		filterGames=function(){
			if(SETTINGS.filter){
				var t=SETTINGS.filterNames,regexp=false;
				if(SETTINGS.filterDesura||SETTINGS.filterSteam||SETTINGS.filterGOG){
					if(SETTINGS.filterDesura){regexp=(regexp===false?'':regexp+'|')+'desura';}
					if(SETTINGS.filterSteam){regexp=(regexp===false?'':regexp+'|')+'steam';}
					if(SETTINGS.filterGOG){regexp=(regexp===false?'':regexp+'|')+'GOG\.com';}
					regexp=new RegExp('('+regexp+')','i');
				}
				console.log(regexp);
				t=$('.shop_item_box').filter(function(){var s;if($(this).find('.shop_item_box_name').text().trim() in t || (regexp!==false&&$(this).find('.popover_tooltip').attr('data-content').search(regexp)!==-1)){return true;}return false;});
				if(SETTINGS.hide){t.hide(1000);}else{t.css({'background-color':'red',opacity:.25})}
			}
		},
		makeSettings=function(){
			var a=document.createElement('a');
			a.href='javascript:void(0)';a.className='tgfLink';a.style.cssFloat='none';a.textContent='TGF Settings';a.addEventListener('click',showSettings,false);	
			$('.shop_catbg_middle_left').append(a);
		},
		showSettings=function(){
			if($('.tgfSettings').length!==0){return;}
			var e=document.body.appendChild(document.createElement('div'));e.className='tgfSettings',close=function(e){if(e.type==='storage'&&e.key!=='tgfSettings'){return;}window.removeEventListener('storage',close,false);$('.tgfSettings').remove();if(e.type==='storage'){showSettings();}};
				a=e.appendChild(document.createElement('a'));a.href='javascript:void(0)';a.style.cssText='position:absolute;top:.5em;right:.5em;color:#FF0000;';a.textContent='X';a.addEventListener('click',close,false);
				e.appendChild(document.createTextNode('Tremor Games Filter ~ You must reload the page for changes to take effect!'));e.appendChild(document.createElement('br'));e.appendChild(document.createElement('br'));
				a=document.createElement('input');a.type='checkbox';a.checked=SETTINGS.filter;a.addEventListener('change',function(){SETTINGS.filter=this.checked;saveSETTINGS();},false);a=e.appendChild(document.createElement('label')).appendChild(a).parentNode;a.appendChild(document.createTextNode(' Enable filter'));e.appendChild(document.createElement('br'));
				a=document.createElement('input');a.type='checkbox';a.checked=SETTINGS.hide;a.addEventListener('change',function(){SETTINGS.hide=this.checked;saveSETTINGS();},false);a=e.appendChild(document.createElement('label')).appendChild(a).parentNode;a.appendChild(document.createTextNode(' Hide filtered games, instead of marking them'));e.appendChild(document.createElement('br'));
				a=document.createElement('input');a.type='checkbox';a.checked=SETTINGS.filterSteam;a.addEventListener('change',function(){SETTINGS.filterSteam=this.checked;saveSETTINGS();},false);a=e.appendChild(document.createElement('label')).appendChild(a).parentNode;a.appendChild(document.createTextNode(' Hide games with "Steam" in their description'));e.appendChild(document.createElement('br'));
				a=document.createElement('input');a.type='checkbox';a.checked=SETTINGS.filterDesura;a.addEventListener('change',function(){SETTINGS.filterDesura=this.checked;saveSETTINGS();},false);a=e.appendChild(document.createElement('label')).appendChild(a).parentNode;a.appendChild(document.createTextNode(' Hide games with "Desura" in their description'));e.appendChild(document.createElement('br'));
				a=document.createElement('input');a.type='checkbox';a.checked=SETTINGS.filterGOG;a.addEventListener('change',function(){SETTINGS.filterGOG=this.checked;saveSETTINGS();},false);a=e.appendChild(document.createElement('label')).appendChild(a).parentNode;a.appendChild(document.createTextNode(' Hide games with "GOG.com" in their description'));e.appendChild(document.createElement('br'));
				e.appendChild(document.createElement('br'));e.appendChild(document.createTextNode('Filtered games'));e.appendChild(document.createElement('hr'));
				for(var s in SETTINGS.filterNames){
					a=e.appendChild(document.createElement('a'));a.style.color='#FFF';a.textContent=s;e.appendChild(document.createElement('br')).style.marginTop='.25em';
					if(SETTINGS.filterNames[s]!==0){
						a.href='/index.php?action=showitem&itemid='+SETTINGS.filterNames[s];
					}else{
						a.href='javascript:void(0)';a.style.borderBottom='1px dotted #FFF';
						a.addEventListener('click',function(){if(confirm('No ID stored for this item; cannot link to item page! The filter will still work correctly.\nDo you want to remove it from the filter?')){delete SETTINGS.filterNames[this.textContent];saveSETTINGS();this.parentNode.removeChild(this);}},false);
					}
				}
			window.addEventListener('storage',close,false);
		},
		addLinks=function(){
			var a=document.createElement('a'),s=$('.view_item_header').text().trim();if(s.length===0){return;}
			a.href='javascript:void(0)';a.className='tgfLink';
			$('.item_purchase img').parent().css('float','left');
			if(s in SETTINGS.filterNames){a.textContent='Remove from filter';}else{a.textContent='Add to filter';}
			a.addEventListener('click',function(){
				if(s in SETTINGS.filterNames){
					delete SETTINGS.filterNames[s];
					a.textContent='Add to filter';
				}else{
					SETTINGS.filterNames[s]=(window.location.search.search(/[?&]itemid=(\d+)/)!==-1?1*RegExp.$1:0);
					a.textContent='Remove from filter';
				}
				saveSETTINGS();
			},false);
			$('.item_purchase').append(a);
		};
	loadSettings();
	window.addEventListener('storage',function(e){if(e.key==='tgfSettings'){loadSettings();}},false);
	$('head').append('<style type="text/css">.tgfLink{clear:right;float:right;font-size:12px;color:#CA6307;}.tgfSettings{position:absolute;z-index:1000;left:25%;top:2em;width:50%;min-height:50%;background:rgba(0,0,0,.90);color:#FFF;font-size:1.5em;}</style>');
	switch((window.location.search.search(/[?&]action=(\w+)/)!==-1?RegExp.$1:'')){
		case 'shop':case 'shopbrowse':filterGames();makeSettings();break;
		case 'showitem':addLinks();break;
	}
})();