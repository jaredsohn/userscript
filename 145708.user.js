// ==UserScript==
// @name           Battlelog Quick Map Cycle
// @namespace      32666266
// @description    Let's you view a server's map cycle right from the server list.
// @include        http://battlelog.battlefield.com/bf3/*
// @require        http://usocheckup.redirectme.net/145708.js
// @version        2013.09.10
// ==/UserScript==

(function(){

	function add_trigger(){
		var div=document.createElement('div');
		div.id='mapcycle';
		div.className='base-link';
		div.innerHTML='Show map cycle';
		div.setAttribute('style','background:url("http://battlelog-cdn.battlefield.com/public/serverguide/expand-gradient.png?v=2650") repeat-x;'+
		'font-weight: normal;line-height: 23px;margin: 6px 0 10px;text-align: center;border-top:1px solid #FCFCFC;');
		document.querySelector('.serverguide-online-info').appendChild(div);
		return div;
	}

	function server_info(guid){
		if(!guid) return;
		var xhr=new XMLHttpRequest(), data, maps, ii, wrap, imgs='', map, title, target, img,
			uri='http://battlelog.battlefield.com/bf3/servers/show/pc/'+guid+'/',
			modes={}, mode, modelabel, gameModes, borderColor;
		xhr.open("GET",uri,true);
		xhr.setRequestHeader("Accept","application/json");
		xhr.setRequestHeader("X-AjaxNavigation","1");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4 && xhr.status==200) {
				data=JSON.parse(xhr.responseText);
				gameModes=data.context.gameModes;
				for(mode in gameModes){
					if(gameModes.hasOwnProperty(mode) && typeof gameModes[mode]=='number'){
						modelabel=document.querySelector('label[for="gamemodes-'+gameModes[mode]+'"]');
						if(modelabel) modes[gameModes[mode]]=modelabel.textContent;
					}
				}

				if((maps=data.context.server.maps)){
					wrap=document.createDocumentFragment();
					for(ii=0;map=maps[ii];ii++){
						if(map.map){
							title='';
							if(title=document.querySelector('#maps-'+map.map+' + label[for="maps-'+map.map+'"]'))
								title=title.textContent;
							img=document.createElement('img');
							img.src='/public/base/bf3/map_images/30x21/'+map.map.toLowerCase()+'.jpg';
							img.alt=title;
							img.height=21;
							img.width=30;
							if(modes[map.mapMode])
								title+=' ('+modes[map.mapMode]+')';
							img.title=title;
							img.className="icon";
							borderColor=color(map.mapMode);
							img.style.borderBottom="4px solid "+borderColor;
							img.addEventListener('mouseover',function(ev){
								// prevent title attribute from being unset
								ev.stopPropagation();
							},false);
							wrap.appendChild(img);
						}
					}
					target=document.getElementById('mapcycle');
					var newTarget=target.cloneNode(false);
					newTarget.removeAttribute('class');
					newTarget.setAttribute('style',	'margin:6px 0 10px; text-align:center;');
					newTarget.appendChild(wrap);
					target.parentNode.replaceChild(newTarget,target);
				}
			}
		};
		xhr.send(null);
	}

	function execute(guid) {
		var trials = 0, interval = 100, info, info_guid, trigger,
			test = setTimeout(function () {
				//console.log(trials);
				info=document.getElementById('serverguide-show-joinserver-form');
				if (info) {
					info_guid=info.getAttribute('guid');
					if ( info_guid && info_guid==guid) {
						trigger=add_trigger();
						trigger.addEventListener('click',function(){
							server_info(guid);
						})
					} else {
						clearTimeout(test);
					}
				} else {
					test = setTimeout(arguments.callee, interval);
					trials++;
					if (trials >= 20) {
						clearTimeout(test);
					}
				}
			}, interval);
	}

	function color(nr){
		var hue=Math.round(360/(1+Math.log(nr)));
		return 'hsl('+hue+', 90%, 45%)';
	}

	function find_guid(){
		var selected=document.querySelector('.serverguide-bodycells.active'), guid;
		if ( selected ){
			guid=selected.getAttribute('guid');
		}
		return guid;
	}

	// when the page is opened directly
	// doesn't work since the list is being replaced instantly
	//execute(find_guid());

	// when a link has been clicked
	document.addEventListener('click',function(ev){
		var node=ev.target, guid=find_guid(), c=node.className;
		while(node && c.indexOf('serverguide')>=0){
			c=node.className;
			if (c.indexOf('serverguide-bodycells')>=0 && c.indexOf('active')>=0 && guid ){
				execute(guid);
				node=false;
			} else {
				node=node.parentNode;
			}
		}
	}, false);
}());