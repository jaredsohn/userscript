// ==UserScript==
// @name           seamapPlus
// @namespace      escaria
// @icon           http://gm.quina.at/escaria/seamapPlus/icon.png

// @description    This script adds a lot of features to seamap and world-map of escaria. For example guild- or player-colors, island-marks in worldmap, position-saving, early-warning system and a lot more!
// @author         Jodli (forum)
// @match      	   http://*.escaria.com/world/client*
// @include        http://*.escaria.com/world/client*
// @resource       colortable http://gm.quina.at/escaria/seamapPlus/colortable.png

// @version        1.99
// ==/UserScript==

const SM_Version=1.99;

const SM_Server=window.location.href.match(/http:\/\/(.+).escaria.com.+/)[1];

function setElId(e) {//supports ff4
	if(e.id)
		return ((e.id=='GM_seamapPlus_El') ? false : e.id);//Workaround
	e.id='GM_seamapPlus_El';
	var script=appendElement('script', document.body, {type:'application/javascript', textContent:'var e=document.getElementById("GM_seamapPlus_El"); e.id=e.islandId; delete e;'});
	document.body.removeChild(script);
	return ((e.id=='GM_seamapPlus_El') ? false : e.id);//Workaround
}

function getEl(Wert) {
	return document.evaluate(
		Wert,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
}
function gid(Wert) {
	return document.getElementById(Wert);
}
function appendElement(eT, eP, attr, css) {
	var e=document.createElement(eT), i;
	if(css)
		e.style.cssText=css;
	if(attr)
		for(i in attr)
			e[i] = attr[i];
	if(eP)
		eP.appendChild(e);
	return e;
}

function createBundle(b, eP, attr, css, eT) {
	var e=document.createElement(eT || 'div');
	
	e.style.cssText='background-image:'+BUNDLES[b][0]+'; background-position:'+BUNDLES[b][3]+'; width:'+BUNDLES[b][(BUNDLES[b][4] ? 4 : 1)]+'; height:'+BUNDLES[b][2]+';'+(css || '');
	if(attr)
		for(i in attr)
			e[i] = attr[i];
	if(eP)
		eP.appendChild(e);
	return e;
}

function toChild(e, i) {//kein Node.prototype in Greasemonkey...
	while(i--)
		e=e.firstChild;
	return e;
}
function toParent(e, i) {
	while(i--)
		e=e.parentNode;
	return e;
}

function saveData(ar1, ar2, v1, v2, t, d) {
	if(t==1) {
		SM[ar1].push(v1);
		SM[ar2].push(v2);
		
		var o1=SM[ar1].join("\n"), o2=SM[ar2].join("\n");
	}
	else {
		if(d) {
			SM.dangerMarker[v1]=true;
			if(SM.dangerHarmless[v1])
				delete SM.dangerHarmless[v1];
		}
		else {
			SM.dangerHarmless[v1]=true;
			if(SM.dangerMarker[v1])
				delete SM.dangerMarker[v1];
		}
		
		SM[ar1][v1]=v2;
		var o1='', o2='';
		for(var i in SM[ar1]) {
			o1 += ((d && i==v1) ? "\t" : '') + i+"\n";
			o2 += SM[ar1][i]+"\n";
		}
		o1=o1.slice(0,-1);
		o2=o2.slice(0,-1);
	}
	GM_setValue(ar1+'_'+SM_Server, o1);
	GM_setValue(ar2+'_'+SM_Server, o2);
	autoFillBox(t);
	GLOBAL_checkAgain=true;
}
function deleteData(t, i) {
	if(t==1)
		var ar1='savedNames', ar2='savedPos', title='Position';
	else if(t==2)
		var ar1='player_marks', title='Spieler-Markierung';
	else
		var ar1='marks', title='Gilden-Markierung';
	
	if(!confirm(((t==1) ? SM[ar1][i] : i) +'\nDiese '+title+' wirklich l'+unescape("%F6")+'schen?'))
		return false;
	
	if(t==1) {
		if(SM.showPositions)
			filterWorldMap(SM.savedPos[i]);
		SM[ar1].splice(i,1);
		SM[ar2].splice(i,1);
		var o1=SM[ar1].join("\n"), o2=SM[ar2].join("\n");
	}
	else {
		var o1='', o2='';
		
		delete SM[ar1][i];
		if(SM.dangerMarker[i])
			delete SM.dangerMarker[i];
		if(SM.dangerHarmless[i])
			delete SM.dangerHarmless[i];
		for(var j in SM[ar1]) {
			o1 += j+"\n";
			o2 += SM[ar1][j]+"\n";
		}
		o1=o1.slice(0,-1);
		o2=o2.slice(0,-1);
	}
	
	GM_setValue(ar1+'_'+SM_Server, o1);
	GM_setValue(ar2+'_'+SM_Server, o2);
	
	
	autoFillBox(t);
	resetIslands();
	
	return true;
}

function autoFillBox(t) {
	if(t==1)
		var e=gid('GM_seamapPlus_positionBox'), ar2='savedNames', ar1='savedPos', fuClick='v';
	else if(t==2)
		var e=gid('GM_seamapPlus_playerFavs'), ar1='player_marks', fuClick='u';
	else
		var e=gid('GM_seamapPlus_guildMarkerBox'), ar1='marks';
	
	var del = createBundle('del', false, {lang:'c_deleteData', title:locale.del}, 'padding:0; cursor:pointer;', 'td'),
		edit = createBundle('edit', false, {lang:'c_editData', title:locale.edit}, 'padding:0; cursor:pointer;', 'td'),
		danger = createBundle('Skull', false, {title:locale.dangerMark}, false, 'td'),
		forLoop1=SM[ar1],
		forLoop2=SM[ar2],
	
		f=document.createDocumentFragment();
	for(var i in forLoop1) {
		var divM=appendElement('tr', f, {lang:i});
		divM.appendChild(del.cloneNode(false));
		if(t!=1)
			divM.appendChild(edit.cloneNode(false));
		var div=appendElement('td', divM, {innerHTML:((t!=1) ? i : forLoop2[i]), title:forLoop1[i]}, 'margin-left:10px; text-align:right');
		if(fuClick) {
			div.className='GM_seamapPlus_hover';
			div.lang='c_'+fuClick;
		}
		if(t!=1) {
			div.style.color= ((forLoop1[i]=='transparent') ? 'white' : forLoop1[i]);
			if(SM.dangerMarker[i])
				divM.appendChild(danger.cloneNode(false));
		}
	}
	e.innerHTML = '';
	e.appendChild(f);
}
function showHideMenu(e) {
	if(e.style.display=='none')
		e.style.display='block';
	else 
		e.style.display='none';
}

function parseTime(sek) {
	var min=Math.floor(sek/60);
	sek=Math.round(sek - min*60);
	if(sek<10)
		sek='0'+sek;
	var hour=Math.floor(min/60);
	min-=hour*60;
	if(min<10)
		min='0'+min;
	return hour+':'+min+':'+sek;
}
function createBox(e_id, addInto, noBackground) {
	addInto=addInto || document.body;
	if(gid('GM_seamapPlus_'+e_id))
		addInto.removeChild(gid('GM_seamapPlus_'+e_id));
	if(!noBackground)
		gid('popupBackground').style.display='block';
	
	var divBox = appendElement('div', addInto, {id:'GM_seamapPlus_'+e_id, className:'GM_seamapPlus_box'}, 'z-index:10000; position:absolute; left:50%; top:50%; height:450px; width:400px; margin-left:-200px; margin-top:-225px; padding:10px'),
		div=createBundle('close', divBox, false, 'cursor:pointer; position:absolute; right:-5px; top:-5px');
		div.addEventListener('click', function() {gid('popupBackground').style.display='none'; this.parentNode.parentNode.removeChild(this.parentNode);}, false);
	
	return divBox;
}

function newMarker(Marker, for_player, i) {
	var getColor=function(x, y) {
		var m=-30, s=20;
		if(x>184 && y>426)
			return 'transparent';
		
		y+=50;
		var r=128+ Math.round(128*Math.sin(y/64));
		var g=128+ Math.round(128*Math.sin(y/64+128));
		var b=128+ Math.round(128*Math.sin(y/64+256));
		
		r= r*1.5 - (Math.abs(x-m)-s);
		g= g*1.5 - (Math.abs(x-m)-s);
		b= b*1.5 - (Math.abs(x-m)-s);
		
		if(r<0)
			r=0;
		else if(r>255)
			r=255;
		if(g<0)
			g=0;
		else if(g>255)
			g=255;
		if(b<0)
			b=0;
		else if(b>255)
			b=255;
		r=Math.round(r).toString(16);
		if(r.length<2)
			r='0'+r;
		g=Math.round(g).toString(16);
		if(g.length<2)
			g='0'+g;
		b=Math.round(b).toString(16);
		if(b.length<2)
			b='0'+b;
		return '#'+r+g+b;
	}
	
	var IMG_transparent ='url("data:image/jpeg;base64,R0lGODlhFAAUAJEAAAAAAP///3V1df///yH5BAEAAAMALAAAAAAUABQAAAI4lBWpdxrsEjMOxolWuzNqW21Sx1GfeIZgeppqNq4x+boPOtvyve7Y6/mxarASjlcUAlvFGTF4KAAAOw==")';

	
	var Marker_text= Marker || i || '';
	var col = (for_player ? SM.player_marks[i] : SM.marks[i]) || 'transparent';
	
	var div = createBox('newMarker');
	var div2=appendElement('div', div, false, 'background-image:url("'+GM_getResourceURL('colortable')+'"); width:200px; height:440px; float:left; margin:5px; cursor:pointer');
		div2.addEventListener('mousemove', function(a) {gid('GM_seamapPlus_preview').style.backgroundColor=((GLOBAL_Browser=='ff') ? getColor(a.layerX, a.layerY) : getColor(a.offsetX, a.offsetY));}, false);
		div2.addEventListener('mousedown', function(a) {gid('GM_seamapPlus_chosen').style.backgroundColor = gid('GM_seamapPlus_color').value=((GLOBAL_Browser=='ff') ? getColor(a.layerX, a.layerY) : getColor(a.offsetX, a.offsetY));}, false);
	
	
	appendElement('h2', div, {innerHTML:(for_player ? locale.player : locale.guild)}, 'text-align:center');
	
	appendElement('br', div);
	appendElement('b', div, {'innerHTML':(for_player ? locale.player : locale.guild)+':&nbsp'});
	appendElement('input', div, {type:'text', id:'GM_seamapPlus_marker', 'value':Marker_text, title:(for_player ? locale.player+'name' : locale.guildNameNoBrackets)});
	appendElement('br', div);
	appendElement('b', div, {innerHTML:locale.color+':&nbsp;'});
	var div2=appendElement('input', div, {type:'text', id:'GM_seamapPlus_color', value:col});
		div2.addEventListener('change', function() {gid('GM_seamapPlus_chosen').style.backgroundColor = this.value;}, false);
	var label=appendElement('label', div, {title:locale.describeEarlyWarning}, 'margin-bottom:20px; margin-right:88px; cursor:pointer');
		createBundle('Skull', label, false, 'display:inline-block; margin-right:5px');
		appendElement('input', label, {type:'checkbox', id:'GM_seamapPlus_addDanger', checked:(SM.dangerMarker[i] ? true : false)});
	
	var div2=appendElement('div', div, false, 'width:20px; height:20px; border:1px solid black; background-image:'+IMG_transparent+'; float:left; margin:1px');
		appendElement('div', div2, {'id':'GM_seamapPlus_preview'}, 'width:20px; height:20px; background-color:'+col);
	var div2=appendElement('div', div, false, 'width:20px; height:20px; border:1px solid black; background-image:'+IMG_transparent+'; float:left; margin:1px');
		appendElement('div', div2, {id:'GM_seamapPlus_chosen'}, 'width:20px; height:20px; background-color:'+col);
	
	
	var input=appendElement('input', div, {type:'button', value:locale.save, lang:(for_player? 1:'')});
		input.addEventListener('click', function() {
			var Marker=gid('GM_seamapPlus_marker').value, Color=gid('GM_seamapPlus_color').value;
			
			if(Marker.length==0) {
				alert(locale.newMarker_noData);
				return;
			}else if(!this.lang && (Marker.length>3 || Marker.indexOf('[')!=-1 || Marker.indexOf(']')!=-1)) {
				alert(locale.newMarker_errorGuild);
				return;
			}else if(Color.length==0) {
				alert('Bitte gib eine g'+unescape("%FC")+'ltige Farbe an');
				return;
			}else if(((!this.lang && SM.marks[Marker]) || (this.lang && SM.player_marks[Marker]))
				&& !confirm('Existiert bereits.\n'+unescape("%DC")+'berschreiben?'))
				return;
			
			
			
			
			if(!this.lang) {
				saveData('marks', 'colors', Marker, Color, 3, gid('GM_seamapPlus_addDanger').checked);
				autoFillBox(3)
			}else {
				saveData('player_marks', 'player_colors', Marker, Color, 2, gid('GM_seamapPlus_addDanger').checked);
				autoFillBox(2);
			}
		
			gid('popupBackground').style.display='none';
			this.parentNode.parentNode.removeChild(gid('GM_seamapPlus_newMarker'));
			
			filterWorldMap();
		}, false);
}

function delCache() {
	var addCheckbox=function(div, name, title, c) {
		var label=appendElement('label', div, {className:'GM_seamapPlus_hover', title:(title || ''), innerHTML:'<input type="checkbox">'+name});
		label.firstChild.checked=c;
	}
	var divBox = createBox('delCache');
	
	appendElement('div', divBox, {innerHTML:locale.delCache_desc}, 'margin:5px; font-weight:bold');
	
	addCheckbox(divBox, locale.npcs);
	addCheckbox(divBox, locale.highlevels);
	addCheckbox(divBox, locale.attack);
	addCheckbox(divBox, locale.moving);
	addCheckbox(divBox, locale.boost);
	addCheckbox(divBox, locale.friends, false, true);
	addCheckbox(divBox, locale.allys);
	addCheckbox(divBox, locale.enemys);
	addCheckbox(divBox, locale.marked_guilds);
	addCheckbox(divBox, locale.marked_players);
	
	var input=appendElement('input', divBox, {type:'button', value:locale.delCache_button});
		input.addEventListener('click', function() {
		var countDel=0;
		
		var npc=	this.parentNode.childNodes[2].firstChild.checked;
		var llf=	this.parentNode.childNodes[3].firstChild.checked;
		var attack=	this.parentNode.childNodes[4].firstChild.checked;
		var dir=	this.parentNode.childNodes[5].firstChild.checked;
		var boost=	this.parentNode.childNodes[6].firstChild.checked;
		var friend=	this.parentNode.childNodes[7].firstChild.checked;
		var ally=	this.parentNode.childNodes[8].firstChild.checked;
		var enemy=	this.parentNode.childNodes[9].firstChild.checked;
		var player=	this.parentNode.childNodes[10].firstChild.checked;
		var guild=	this.parentNode.childNodes[11].firstChild.checked;
		
		for(var i in Islands) {
			if((npc && Islands[i]['npc']) || (llf && Islands[i]['llf']) || (attack && Islands[i]['attack']) || (dir && (Islands[i]['dir'] || Islands[i]['boost'])) || (boost && Islands[i]['boost']) || (friend && Islands[i]['dipl']=='friend') || (ally && Islands[i]['dipl']=='ally') || (enemy && Islands[i]['dipl']=='enemy') || (guild && SM.marks[Islands[i]['gilde']]) || (player && SM.player_marks[i]))
				continue;
				
			if(gid(i) && gid(i).lastChild.lang=='injected')
				gid(i).removeChild(gid(i).lastChild);
			if(Islands[i]['element'])
				GLOBAL_wmIslandDiv.removeChild(Islands[i]['element']);
			delete Islands[i];
			
			--GLOBAL_islandCount;
			++countDel;
		}
		alert(countDel+locale.delCache_feedback);
	}, false);
	appendElement('div', divBox, {innerHTML:locale.delCache_help}, 'margin:15px 5px; font-size:10px');
}

function listIslands(listType) {
	var placeData=function(e,x, special) {
			var div=appendElement('div', e.childNodes[x], {lang:x, innerHTML:e.childNodes[x].title+'&nbsp;('+e.childNodes[x].firstChild.childNodes.length+')', className:'GM_seamapPlus_hover'}, 'font-weight:bold; position:absolute; left:30px; top:0'+(e.childNodes[x].firstChild.lang ? '; color:#bbb' : '')+(SM.marks[e.childNodes[x].title.slice(1,-1)] ? '; border:2px solid '+SM.marks[e.childNodes[x].title.slice(1,-1)] : ''));
				div.addEventListener('click', listClickKat, false);
				div.addEventListener('mouseover', function() {
					for(var i=0; i<this.previousSibling.childNodes.length; ++i)
						listMouseover.call(this.previousSibling.childNodes[i]);
				}, false);
				div.addEventListener('mouseout', function() {
					for(var i=0; i<this.previousSibling.childNodes.length; ++i)
						listMouseout.call(this.previousSibling.childNodes[i]);
				}, false);
				
			e.childNodes[x].style.top =(x*20 + (special ? 55 : 60))+'px';
			
			
			
			//e.childNodes[x].style.top=top_gilde+'px';
			var top=0;
			for(var j=0; j<e.childNodes[x].firstChild.childNodes.length; ++j) {
				var El=e.childNodes[x].firstChild.childNodes[j];
				El.style.top= top+'px';
				var tEl=El.firstChild.lastChild;
				
				while(tEl.className.slice(-12)!='islandsImage')
					tEl=tEl.previousSibling;
				top += parseInt(tEl.style.height.slice(0,-2))+45;
			}
			e.childNodes[x].firstChild.style.height = (top+15)+'px';
	}
	var qSortSwitch=function(e,a,b) {
		e.childNodes[b].appendChild(e.childNodes[a].firstChild);
		e.childNodes[a].appendChild(e.childNodes[b].firstChild);
		var t=e.childNodes[b].lang;
		e.childNodes[b].lang=e.childNodes[a].lang;
		e.childNodes[a].lang=t;
		
		e.childNodes[b].title= ((t=e.childNodes[b].title), e.childNodes[a].title);
		e.childNodes[a].title=t;
		
		/*e.childNodes[a].style.top=(a*20)+'px';
		e.childNodes[b].style.top=(b*20)+'px';*/
		/*e.insertBefore(e.childNodes[b], e.childNodes[a]);
		e.insertBefore(e.childNodes[a], e.childNodes[b]);*/
		
		/*var t=e[a];
		e[a]=e[b];
		e[b]=t;*/
		
		return b;
	}
	var qSortPivot=function(min, max) {
		return min;
		/*var a=Math.round(min + Math.random()*(max-min));
		var b=Math.round(min + Math.random()*(max-min));
		var c=Math.round(min + Math.random()*(max-min));
		
		return Math.max(Math.max(Math.min(a,b), Math.min(a,c)), Math.min(b,c));*/
	}
	var qSortPlacePivot=function(e,x,p,smin,smax) {
		p=qSortSwitch(e,p,x);
		placeData(e,p);
		
		if(smin<p-1)
			qSort(e, -1, smin, p-1, smin, p-1);
		else if(p!=smin)
			placeData(e,smin);
		if(p+1<smax)
			qSort(e, -1, p+1, smax, p+1, smax);
		else if(p!=smax)
			placeData(e,smax);
	}
	var qSort=function(e, p, min, max, smin, smax) {
		if(p<0) {
			p=qSortPivot(min, max);
			/*if(p!=smin)
				p=qSortSwitch(e,p,smin);*/
		}
		
		for(var i=min; i<=max; ++i)
			if(e.childNodes[i].lang>e.childNodes[p].lang) {
				var nmin=i;
				break;
			}
		
		if(i>max) {
			if(i>min)
				qSortPlacePivot(e,max,p,smin,smax);
			
			return e;
		}
		
		for(var i=max; i>min; --i)
			if(e.childNodes[i].lang<=e.childNodes[p].lang || i<=nmin)
				break;
		
		var nmax=i;
		
		if(nmin!=nmax) {
			qSortSwitch(e,nmin,nmax);
			if(nmin+1<nmax-1)
				qSort(e, p, nmin+1, nmax-1, smin, smax);
			else if(e.childNodes[p].lang>=e.childNodes[nmin+1].lang)
				qSortPlacePivot(e,nmin+1, p, smin, smax);
			else
				qSortPlacePivot(e,nmin, p, smin, smax);
		}
		else 
			qSortPlacePivot(e,nmin-1,p,smin,smax);
		return e;
	}
	
	var createIsland=function(id, pEl) {
		var main=document.createElement('div');
		if(!Islands[id]['npc']) {
			main.title=Islands[id]['user'];
			main.id='list'+Islands[id]['user'];
		}
		main.lang=Islands[id]['id'];
		main.className='islandIcon'+(SM.player_marks[Islands[id]['user']] ? ' GM_seamapPlus_markIsland' : '');
		main.style.color='black';
		main.style.cursor='pointer';
		main.style.left='40px';
		main.style.backgroundColor=(SM.player_marks[Islands[id]['user']] || null);
		
		var isl=appendElement('div', main);
		appendElement('div', main, {innerHTML:'nA', className:'GM_seamapPlus_circle', title:locale.listIslands_nA}, 'background-color:grey; position:absolute; z-index:1; bottom:0; width:30px; text-align:center');
		appendElement('div', main, {innerHTML:'<b>'+locale.distance+'</b>: '+(Math.abs(GLOBAL_MyX-Islands[id]['x']) + Math.abs(GLOBAL_MyY-Islands[id]['y'])), 'className':'GM_seamapPlus_circle', 'title':'Der Spieler befindet sich nicht im Anzeigebereich. M'+unescape("%F6")+'glicherweise sind die dargestellten Informationen veraltet oder unvollst'+unescape("%E4")+'ndig!'}, 'position:absolute; z-index:1; top:15px; left:60px');
		
		
		var inf=appendElement('a', isl, {className:'seamapEntityInfoPanel'});
			appendElement('div', inf, {innerHTML:Islands[id]['user']}, 'display:inline');
			if(Islands[id]['lvl']) {
				if(Islands[id]['llf'])
					appendElement('div', inf, {innerHTML:'&nbsp;('+Islands[id]['lvl']+')', className:'GM_seamapPlus_circle'}, 'display:inline; background-color:red; color:white; padding:0 1px 1px 0');
				else
					appendElement('div', inf, {innerHTML:'&nbsp;('+Islands[id]['lvl']+')'}, 'display:inline');
			}
			if(Islands[id]['gilde'])
				appendElement('div', inf, {innerHTML:'['+Islands[id]['gilde']+']', className:(SM.marks[Islands[id]['gilde']] ? 'GM_seamapPlus_circle' : null)}, (SM.marks[Islands[id]['gilde']] ? 'background-color:'+SM.marks[Islands[id]['gilde']] : false));
		
		
		
		if(Islands[id]['nation']==1)
			var n='romans';
		else if(Islands[id]['nation']==2)
			var n='vikings';
		else if(Islands[id]['nation']==3)
			var n='aztecs';
		else if(Islands[id]['nation']==-1)
			var n='hf';
		else if(Islands[id]['nation']==-2)
			var n='kraken';
		else
			var n='unknown';
		
		if(Islands[id]['dipl'])
			createBundle(Islands[id]['dipl'], isl, {className:'islandAlignmentIndicator'});
		createBundle(n, isl, {className:'extendedHTML islandsImage'}, 'position:relative');
		
		if(Islands[id]['attack'])
			createBundle('redSkull', isl, {className:'extendedHTML killableStatusIcon'}, 'position:relative');
		if(Islands[id]['boost'])
			appendElement('div', isl, {className:'foam_0_no_direction'});
		
		
		if(Islands[id]['dir']) {
			if(Islands[id]['dir'][0]==2 && Islands[id]['dir'][1]==1)//r
				n='arrow0';
			else if(Islands[id]['dir'][0]==2 && Islands[id]['dir'][1]==2)//ru
				n='arrow1';
			else if(Islands[id]['dir'][0]==1 && Islands[id]['dir'][1]==2)//u
				n='arrow2';
			else if(Islands[id]['dir'][0]==0 && Islands[id]['dir'][1]==2)//lu
				n='arrow3';
			else if(Islands[id]['dir'][0]==0 && Islands[id]['dir'][1]==1)//l
				n='arrow4';
			else if(Islands[id]['dir'][0]==0 && Islands[id]['dir'][1]==0)//lo
				n='arrow5';
			else if(Islands[id]['dir'][0]==1 && Islands[id]['dir'][1]==0)//o
				n='arrow6';
			else if(Islands[id]['dir'][0]==2 && Islands[id]['dir'][1]==0)//ro
				n='arrow7';
			else
				n=null;
			
			createBundle(n, isl, {className:'islandsDirection'}, 'position:absolute; left:-50px; top:-50px');
		}
		
		isl.addEventListener('click', function() {
			var El=this.parentNode; 
			window.location.hash='#seamap('+Islands[El.title || El.lang]['x']+','+Islands[El.title || El.lang]['y']+')'
		}, false);
		main.addEventListener('mouseover', listMouseover, false);
		main.addEventListener('mouseout', listMouseout, false);
		
		return main;
	}
	var cloneIsland=function(oldEl, User) {
		var id=setElId(oldEl);
		var El=oldEl.firstChild.cloneNode(true);
		
		var div=document.createElement('div');
			div.style.color='black';
			div.style.cursor='pointer';
			div.style.left='40px';
			div.lang=id;
			if(Elname[0]=='island') {
				div.title=User;
				div.id='list'+User;
			}
			div.className=oldEl.className;
			div.style.backgroundColor=oldEl.style.backgroundColor;
			div.addEventListener('mouseover', listMouseover, false);
			div.addEventListener('mouseout', listMouseout, false);
			El.addEventListener('click', function() {var El=this.parentNode; window.location.hash='#seamap('+Islands[El.title || El.lang]['x']+','+Islands[El.title || El.lang]['y']+')'}, false);
			
		div.appendChild(El);
		if(oldEl.childNodes.length>1) {
			var El2=oldEl.lastChild.cloneNode(true);
			div.appendChild(El2);
		}
		return div;
	}
	var listClickKat=function() {
		var h=this.previousSibling.style.height.slice(0,-2)-20;
		if(this.previousSibling.style.display=='none') {
			this.previousSibling.style.display='block';
			h=h*-1;
		}
		else 
			this.previousSibling.style.display = 'none';
		
		var divM=gid('GM_seamapPlus_statsBox').lastChild;
		for(var i=parseInt(this.lang)+1; i<divM.childNodes.length; ++i) {
			var El_gilde=divM.childNodes[i];
			El_gilde.style.top = (El_gilde.style.top.slice(0,-2)-h) +'px';
		}
	}
	var listMouseout=function() {
		var e=gid(this.lang);
		if(e) {
			e.style.zIndex=this.getAttribute('myzIndex');
			e.className=this.className;
			e.style.borderColor=null;
			this.style.zIndex = null;
			
			e.firstChild.firstChild.style.backgroundColor=null;
			e.firstChild.firstChild.style.borderColor=null;
			e.firstChild.firstChild.style.borderStyle=null;
			e.firstChild.firstChild.style.borderWidth=null;
		}
	}
	var listMouseover=function() {
		var e=gid(this.lang);
		if(e) {
			this.setAttribute('myzIndex', e.style.zIndex);
			e.style.zIndex=10000;
			e.className='GM_seamapPlus_markIsland islandIcon';
			e.style.borderColor='red';
			
			e.firstChild.firstChild.style.backgroundColor='#2077c4';
			e.firstChild.firstChild.style.borderColor='red';
			e.firstChild.firstChild.style.borderStyle='solid';
			e.firstChild.firstChild.style.borderWidth='0 0 2px 0';
		}
	}
	var findIsland=function(s) {
		var Els=getEl("//a[contains(@class, 'islandIcon')]");
		for(var i=0; i<Els.snapshotLength; ++i) {
			var oldEl=Els.snapshotItem(i);
			if(toChild(oldEl,5).innerHTML==s.title) {
				s.lang=setElId(oldEl);
				return oldEl;
			}
		}
		return false;
	}
	var reloadList=function() {
		var opened=new Array;
		var Els=gid('GM_seamapPlus_statsBox').lastChild;
		for(var i=0; i<Els.childNodes.length; ++i)
			if(Els.childNodes[i].firstChild.style.display=='block')
				opened.push(Els.childNodes[i].firstChild.id);
		
		var scollPos=Els.scrollTop;
		
		listIslands(gid('GM_seamapPlus_statsBox').lang);
		for(var i=0; i<opened.length; ++i)
			if(gid(opened[i]))
				listClickKat.call(gid(opened[i]).nextSibling);
		gid('GM_seamapPlus_statsBox').lastChild.scrollTop=scollPos;
	}
	if(!listType)
		var Els=(gid('gvSeamap').firstChild.nextSibling || gid('gvSeamap').firstChild).firstChild.nextSibling.childNodes;
	else if(listType=='1')
		var Els=Danger;
	else if(listType=='2')
		var Els=Islands;
	
	if(gid('GM_seamapPlus_statsBox'))
		gid('game').removeChild(gid('GM_seamapPlus_statsBox'));
	
	var divBox=appendElement('div', gid('game'), {className:'statusPanel GM_seamapPlus_box', id:'GM_seamapPlus_statsBox', lang:(listType || '')}, 'width:200px; height:'+(window.innerHeight-200)+'px');
		var div=createBundle('close', divBox, false, 'cursor:pointer; position:absolute; right:-5px; top:-5px; z-index:1');
			div.addEventListener('click', function() {gid('game').removeChild(gid('GM_seamapPlus_statsBox'));}, false);
		var div=createBundle('reload', divBox, {title:locale.reload}, 'cursor:pointer; position:absolute; left:9px; top:10px; z-index:1');
			div.addEventListener('click',reloadList, false);
	
		appendElement('div', divBox, {innerHTML:((!listType)? locale.displayArea : ((listType==1) ? locale.dangerous : 'Cache'))}, 'left:40px; top:11px; width:130px; height:30px; border-style:solid; border-color:black; border-width:0 1px 1px 1px; background-color:#1A70C4; position:absolute; text-align:center; font-weight:bold; z-index:1');
		
		
		var div=appendElement('img', divBox, {title:locale.displayArea_long, src:GLOBAL_release+'gfx/icons/zoom_icon_small_1.png'}, 'width:'+BUNDLES['listDanger'][1]+'; height:'+BUNDLES['listDanger'][2]+'; cursor:pointer; position:absolute; right:100px; top:'+((!listType) ? '33px':'27px')+'; z-index:1');
		if(listType)
			div.addEventListener('click', function() {listIslands(0);}, false);
		
		div=createBundle('listDanger', divBox, {title:locale.dangerous_long}, 'cursor:pointer; position:absolute; right:70px; top:'+((listType==1) ? '33px':'27px')+'; z-index:1');
		if(listType!=1)
			div.addEventListener('click', function() {listIslands(1);}, false);
		div=appendElement('img', divBox, {title:locale.chache_long, 'src':GLOBAL_release+'gfx/icons/show_island_only_icon_1.png'}, 'width:'+BUNDLES['listDanger'][1]+'; height:'+BUNDLES['listDanger'][2]+'; cursor:pointer; position:absolute; right:40px; top:'+((listType==2) ? '33px':'27px')+'; z-index:1');
		if(listType!=2)
			div.addEventListener('click', function() {if(GLOBAL_islandCount<250 || confirm(locale.list_Islands_much.replace('[x0]', GLOBAL_islandCount))) listIslands(2);}, false);
		
		var label=appendElement('label', divBox, false, 'position:absolute; bottom:2px; right:5px; z-index:1');
		appendElement('span', label, {innerHTML:locale.search+':&nbsp;'}, 'font-Weight:bold');
		appendElement('input', label, {type:'text'}, 'width:90px');
		div=createBundle('search', label, false, 'float:right; cursor:pointer');
		div.addEventListener('click', function() {
			var El=gid('list'+this.previousSibling.value);
			if(El) {
				if(El.parentNode.style.display=='none')
					listClickKat.call(El.parentNode.nextSibling);
				gid('GM_seamapPlus_statsBox').lastChild.scrollTop = parseInt(El.style.top.slice(0,-2))+parseInt(El.parentNode.parentNode.style.top.slice(0,-2))-50;
			}
			else
				alert('Dieser User befindet sich nicht in der Inselliste...')
		}, false);
	
	var divM=appendElement('div', divBox, {className:'directionIndicatorsOn'}, 'width:181px; height:'+(window.innerHeight-235)+'px; left:10px; top:10px; position:absolute; border:1px inset #444; overflow:auto; background-image:url("'+GLOBAL_release+'webgfx/water_seaview.jpg")');
	var div_parent=appendElement('div', divM, {lang:locale.gildenlos, title:locale.gildenlos}, 'position:absolute');
	appendElement('div', div_parent, {id:'GM_seamapPlus_'+locale.gildenlos, lang:'1'}, 'display:none; position:absolute; top:40px');
	var div_parent=appendElement('div', divM, {lang:'NPCs', title:'NPCs'}, 'position:absolute');
	appendElement('div', div_parent, {id:'GM_seamapPlus_NPCs', lang:'1'}, 'display:none; position:absolute; top:40px');
	
	for(var i in Els) {
		if(!listType && isNaN(parseInt(i))) //Greasemonkey-Sicherheitsmodell: Weder [item] noch [length] sind in Objects enthalten, sicherheitshalber trotzdem abfrage
			continue
		var isl=((!listType) ? Els[i] : gid(Els[i]['id'] || Els[i]));
		
		if(!isl) {
			if(!Islands[i])
				continue;
			
			var div=createIsland(i,divBox), User=Islands[i]['user'], Gilde=(Islands[i]['gilde'] ? '['+Islands[i]['gilde']+']' : false), npc=Islands[i]['npc'];
		}
		else {
			var Elname=isl.id.split(':');
			if(Elname[0]=='resource_spending_spring' || Elname[0]=='trade_island' || !isl.hasChildNodes() || !isl.firstChild.hasChildNodes() || toChild(isl,5).innerHTML==GLOBAL_MyUsername)
				continue;
			var User=i=toChild(isl,5).innerHTML, Gilde=toChild(isl,3).lastChild.firstChild.innerHTML,
			
				div=cloneIsland(isl, User), npc=(Elname[0]!='island');
		}
		
		if(Islands[i]['dontList']) {
			createBundle('jumpTo', div, {title:locale.restore}, 'position:absolute; top:10px; left:80px; cursor:pointer').addEventListener('click', function() {
				Islands[this.parentNode.title]['dontList']=false;
				addToDanger(Islands[this.parentNode.title]['id'], this.parentNode.title);
				createDangerTR();
				listMouseout.apply(this.parentNode);
				reloadList();
			}, false);
			
			Gilde=locale.hidden;
		}
		else {
			createBundle('del', div, {title:locale.hide}, 'position:absolute; top:10px; left:80px; cursor:pointer').addEventListener('click', function() {
				Islands[this.parentNode.title]['dontList']=true;
				addToDanger(Islands[this.parentNode.title]['id'], this.parentNode.title);
				createDangerTR();
				listMouseout.apply(this.parentNode);
				reloadList();
			}, false);
			
			if(npc)
				Gilde='NPCs';
			else if(!Gilde)
				Gilde=locale.gildenlos;
		}
		

		
		if(!(div_gilde=gid('GM_seamapPlus_'+Gilde))) {
			var div_parent=appendElement('div', divM, {lang:Gilde.toLowerCase(), title:Gilde}, 'position:absolute');
			var div_gilde=appendElement('div', div_parent, {id:'GM_seamapPlus_'+Gilde, lang:'1'}, 'display:none; position:absolute; top:40px');
		}
		
		if(isl && div_gilde.lang)
			div_gilde.lang='';
		
		User=User.toLowerCase();
		var inserted=false;
		for(var j=0; j<div_gilde.childNodes.length; ++j) {
			if(User<div_gilde.childNodes[j].title.toLowerCase()) {
				div_gilde.insertBefore(div, div_gilde.childNodes[j]);
				inserted=true;
				break;
			}
		}
		if(!inserted)
			div_gilde.appendChild(div);
	}
	if(divM.firstChild.firstChild.hasChildNodes())
		placeData(divM,0, true);
	if(divM.childNodes[1].firstChild.hasChildNodes())
		placeData(divM,1, true);
	qSort(divM, -1, 2, divM.childNodes.length-1, 2, divM.childNodes.length-1);
}

function gMainpos() {
	var horizontals= getEl("//div[@class='coordinateIndicatorHorizontal']"),
		mainLeft_El= horizontals.snapshotItem(0),
		test_zoom= horizontals.snapshotItem(1),
		mainTop_El= getEl("//div[@class='coordinateIndicatorVertical']").snapshotItem(0),
	
		zoom= (Math.abs(parseInt(mainLeft_El.innerHTML.slice(6)) - parseInt(test_zoom.innerHTML.slice(6))) >= 200),
	
		mainLeft= mainLeft_El.innerHTML.slice(6) - mainLeft_El.style.left.slice(0,-2) * (zoom ? 2:1),
		mainTop= mainTop_El.innerHTML.slice(6) - mainTop_El.style.top.slice(0,-2)* (zoom ? 2:1);
	
	return new Array(parseInt(mainLeft), parseInt(mainTop), zoom);
}
function gpos(el, mPos, sizeEl) {
	var left= parseInt(el.style.left.slice(0,-2)), top= parseInt(el.style.top.slice(0,-2)),
		size=sizeEl.style.width.slice(0,-2);
	
	if(mPos[2]) {
		left=left*2;
		top=top*2;
	}
	return new Array(mPos[0]+left+size/2, mPos[1]+top+size/2);
}

function DiffToRed(c) {
	if(c.slice(0,1)=='#') {
		var r= 255 - parseInt(c.slice(1,3),16); //ff
		var g= parseInt(c.slice(3,5),16); //00
		var b= parseInt(c.slice(5,7),16); //00
		
		if(r*4+g*1.2+b > 180)
			return 'red';
		else 
			return 'green';
	}
	else if(c=='red')
		return 'green';
	else 
		return 'red';
}

function troopTime(dist, addInto, noBackground) {
	var divM=createBox('distanceList', addInto, noBackground), table_alg, table_roman, table_npc, table_viking, table_aztec, i, tr,
		linkTo=GLOBAL_Ships_speed_data;
	appendElement('h2', divM, {innerHTML:locale.trooptime}, 'text-align:center; margin-top:0');
	table_alg=appendElement('table', divM, {border:0}, 'float:right; width:190px');
		appendElement('th', table_alg, {textContent:locale.general, colSpan:2});
		
	table_roman=appendElement('table', divM, {border:0}, 'width:190px');
		tr=appendElement('th', table_roman, {textContent:locale.romans, colSpan:2});
		createBundle('romans_zoom', tr, false, 'float:left');
		
	table_npc=appendElement('table', divM, {border:0}, 'float:right; width:190px');
		tr=appendElement('th', table_npc, {textContent:locale.npcs, colSpan:2});
		createBundle('villains_zoom', tr, false, 'float:left');
	
	table_viking=appendElement('table', divM, {border:0}, 'width:190px');
		tr=appendElement('th', table_viking, {textContent:locale.vikings, colSpan:2});
		createBundle('vikings_zoom', tr, false, 'float:left');
	
	if(linkTo['aztecs_mextli']) {
		table_aztec=appendElement('table', divM, {border:0}, 'width:190px');
			tr=appendElement('th', table_aztec, {textContent:locale.aztecs, colSpan:2});
			createBundle('aztecs_zoom', tr, false, 'float:left');
	}
	
	for(i in linkTo) {
		if(i=='vikings_scout_ship' || i=='vikings_trade_ship' || i=='vikings_transport_ship' || i=='vikings_island_breaker' || i=='aztecs_scout_ship' || i=='aztecs_trade_ship' || i=='aztecs_transport_ship' || i=='aztecs_island_breaker')
			continue;
		
		if(i=='romans_scout_ship' || i=='romans_transport_ship' || i=='romans_trade_ship' || i=='romans_island_breaker')
			tr=appendElement('tr', table_alg);
		else if(i=='vikings_longship' || i=='vikings_naglfar' || i=='vikings_knorr' || i=='vikings_hansekogge' || i=='vikings_polacker')
			tr=appendElement('tr', table_viking);
		else if(i=='romans_trade_ship' || i=='romans_transport_ship' || i=='romans_island_breaker' || i=='romans_karavelle' || i=='romans_dreadgnought' || i=='romans_fullship' || i=='romans_galeere' || i=='romans_dromone')
			tr=appendElement('tr', table_roman);
		else if(i=='aztecs_mextli' || i=='aztecs_mina' || i=='aztecs_tormenta' || i=='aztecs_allede' || i=='aztecs_uribe')
			tr=appendElement('tr', table_aztec);
		else
			tr=appendElement('tr', table_npc);
		appendElement('td', tr, {innerHTML:linkTo[i][0]}, 'font-weight:bold');
		appendElement('td', tr, {innerHTML:parseTime(dist/linkTo[i][1])}, 'text-align:right');
	}
}

function createDangerTR() {
	if(!GLOBAL_countDanger) {
		if(gid('GM_seamapPlus_danger'))
			gid('GM_seamapPlus_danger').parentNode.removeChild(gid('GM_seamapPlus_danger'));
	}
	else if(gid('GM_seamapPlus_danger'))
		gid('GM_seamapPlus_danger').firstChild.lastChild.innerHTML=GLOBAL_countDanger+' '+((GLOBAL_countDanger>1)?locale.islands : locale.island);
	else {
		var danger_tr=appendElement('tr', getEl("//table[@class='statusPanel']").snapshotItem(0).firstChild, {id:'GM_seamapPlus_danger', title:locale.earlyWarningTitle});
		
		var div=appendElement('td', danger_tr, {align:'left', className:'clickable'}, 'vertical-align:top');
			createBundle('redSkull', div, {className:'floatLeftLTR'}, 'margin:2px 6px;');
			appendElement('div', div, {className:'floatLeftLTR', innerHTML:GLOBAL_countDanger+' '+((GLOBAL_countDanger>1)?locale.islands:locale.island)}, 'font-size:large; font-weight:bold; color:orange;');
		
		danger_tr.addEventListener('click', function() {listIslands(1);}, false);
	}
}
function addToDanger(id, user) {
	var LOCisl=Islands,
		lSM=SM,
		dX=GLOBAL_MyX - LOCisl[user]['x'],
		dY=LOCisl[user]['y']-GLOBAL_MyY, //verkehrtes Koordinatensystem
		dXY = Math.abs(dX)+Math.abs(dY), w, ri, dW;
	
	if(dXY>lSM.dangerDistance || LOCisl[user]['dipl']=='friend' || LOCisl[user]['dipl']=='ally' || lSM.dangerMarked && (lSM.dangerHarmless[user] || lSM.dangerHarmless[LOCisl[user]['gilde']]) || LOCisl[user]['dontList']) {
		if(Danger[user]) {
			delete Danger[user];
			--GLOBAL_countDanger;
		}
		return;
	}
	w=Math.atan((dY)/(dX)) + ((dX<0) ? Math.PI : 0);
	ri=Math.round( ((w<0) ? Math.PI*2+w : w)/(Math.PI/180));
	dW=Math.abs(ri-LOCisl[user]['dir']);
	
	if(((lSM.dangerAttack && LOCisl[user]['attack'])
	|| (lSM.dangerEnemy && LOCisl[user]['dipl']=='enemy')
	|| (lSM.dangerLLF && LOCisl[user]['llf'])
	|| (lSM.dangerDir && LOCisl[user]['dir'] && (dW<45 || 360-dW<23)) //1->Ungenauigkeit abfangen
	|| (lSM.dangerMarked && (lSM.dangerMarker[user] || lSM.dangerMarker[LOCisl[user]['gilde']])))) {
		if(!Danger[user]) {
			++GLOBAL_countDanger;
			Danger[user]=id;
		}
	}
	else if(Danger[user]) {
		delete Danger[user];
		--GLOBAL_countDanger;
	}
}
function wmProps(i, color) {
	var LOCisl=Islands, lSM=SM, Mdiv=LOCisl[i]['element'], pic=Mdiv.firstChild, w, obj;
	
	pic.style.backgroundColor=color;
	
	if(lSM.klickWmElements && !Mdiv.style.cursor)
		Mdiv.style.cursor='pointer';
	else if(Mdiv.style.cursor)
		Mdiv.style.cursor=null;
	
	if(lSM.markNation)
		w=15;
	else if(LOCisl[i]['dipl']!='friend')
		w=6;
	else 
		w=10;
	
	Mdiv.style.left=(GLOBAL_MiddleX + LOCisl[i]['x']*GLOBAL_StepX - w/2)+'px';
	Mdiv.style.top=(GLOBAL_MiddleY + LOCisl[i]['y']*GLOBAL_StepY - w/2)+'px';
	
	Mdiv.style.width=w+'px';
	Mdiv.style.height=w+'px';
	
	
	
	if(LOCisl[i]['dir']) {
		if(!pic.nextSibling || ((obj=pic.nextSibling).lang!='dir' && (obj=Mdiv.lastChild).lang!='dir'))
			obj=appendElement('div', Mdiv, {className:'GM_seamapPlus_circle', lang:'dir'}, 'width:70%; height:70%; position:absolute; margin-left:-30%; margin-bottom:-40%; z-index:1');
		
		obj.style.backgroundColor = DiffToRed(color);
		obj.style.left=(Math.abs(LOCisl[i]['dir']-180)/1.8) + '%';
		obj.style.bottom=(Math.abs(180-Math.abs(LOCisl[i]['dir']-90))/1.8) + '%';
		
		pic.style.borderColor = DiffToRed(color);
	}
	else {
		if(pic.nextSibling && ((obj=pic.nextSibling).lang=='dir' || (obj=Mdiv.lastChild).lang=='dir'))
			Mdiv.removeChild(obj);
		if(!lSM.markNation)
			pic.style.borderColor='white';
	}
	if(pic.firstChild && (!lSM.markNation || (pic.firstChild.lang && LOCisl[i]['nation'])))
		pic.removeChild(pic.firstChild);
	if(lSM.markNation && !pic.firstChild) 
		wmCreateNation(pic, i);
	
	
	if(LOCisl[i]['boost'] && lSM.markBoost) {
		if(GLOBAL_Browser=='ff') {
			if(!pic.style.outline)
				pic.style.outline = '1px solid RoyalBlue';
			
			if(!LOCisl[i]['dir'])
				pic.style.borderColor = DiffToRed(color);
		}
		else 
			pic.style.border = '2px solid RoyalBlue';
	}
	else if(pic.style.outline)
		pic.style.outline=null;
	else if(GLOBAL_Browser=='chrome')
		pic.style.borderWidth='1px';
	
	if(LOCisl[i]['attack'] && lSM.markAttack && (!pic.nextSibling || (pic.nextSibling.lang!='attack' && Mdiv.lastChild.lang!='attack')))
		appendElement('img', Mdiv, {src:GLOBAL_release+'gfx/icons/skull_red_seaview_icon.png', lang:'attack'}, 'position:absolute; left:50%; top:80%; width:11px');
	else if((!LOCisl[i]['attack'] || !lSM.markAttack) && (pic.nextSibling && ((obj=pic.nextSibling).lang=='attack' || (obj=Mdiv.lastChild).lang=='attack')))
		Mdiv.removeChild(obj);
	
	if(LOCisl[i]['llf'] && lSM.markLLF)
		pic.className=null;
	else if(!pic.className)
		pic.className='GM_seamapPlus_circle';
}
function addToWorldMap(i) {
	var color;
	
	if(!(color= wmIslandColor(i))) {
		deleteWmElement(i);
		return;
	}
	
	if(!Islands[i]['element']) {
		Islands[i]['element']=appendElement('div', GLOBAL_wmIslandDiv, {className:'seaChartGuildMemberView', id:'wm_'+i, title:Islands[i]['user'], lang:'island'}, 'position:absolute');
		appendElement('div', Islands[i]['element'], {className:'GM_seamapPlus_circle', lang:'head'}, 'width:100%; height:100%; border:1px solid white');
	}
	wmProps(i, color);
}
function filterWorldMap(deletePos) {
	var Els=GLOBAL_wmIslandDiv.childNodes, i=Els.length, lSM=SM, El, id, color;
	while(i--) {
		El=Els[i];
		if(El.lang!='island') {
			if((El.lang!='ship' && !lSM.showShips) || (!lSM.showPositions || deletePos==El.lang))
				GLOBAL_wmIslandDiv.removeChild(El);
			continue;
		}
		id=El.id.slice(3);
		
		if(!(color=wmIslandColor(id))) {
			deleteWmElement(id);
			continue;
		}
		wmProps(id, color);
	}
}

function drawRadius() {
	var Elp=getEl("//div[@class='seachartViewportMarker']").snapshotItem(0).previousSibling.previousSibling.previousSibling;
	if(SM.markRadius) {
		var p=0;
		var tower=getEl("//div[contains(@title, 'turm')]");
		for(var i=0; i<tower.snapshotLength; ++i) {
			var l=parseInt(tower.snapshotItem(i).title.match(/.+\((\d+)\)/)[1]);
			p +=l*l;
		}
		var rSx=Math.ceil(Math.sqrt(p)*15+720)*GLOBAL_StepX;
		var rSy=Math.ceil(Math.sqrt(p)*15+720)*GLOBAL_StepX;
		var rEx=Math.ceil(rSx*0.75);
		var rEy=Math.ceil(rSy*0.75);
		
		appendElement('div', Elp, {className:'GM_seamapPlus_circle', title:'Sichtungsradius', lang:'radius'}, 'position:absolute; left:30px; top:30px; border:1px solid black; width:'+(rSx*2)+'px; height:'+(rSy*2)+'px; margin-left:'+Math.round(-rSx)+'px; margin-top:'+Math.round(-rSx)+'px; background-color:grey; opacity:0.2');
		appendElement('div', Elp, {className:'GM_seamapPlus_circle', title:'Erkennungsradius', lang:'radius'}, 'position:absolute; left:30px; top:30px; border:1px solid black; width:'+(rEx*2)+'px; height:'+(rEy*2)+'px; margin-left:'+Math.round(-rEy)+'px; margin-top:'+Math.round(-rEy)+'px; background-color:grey; opacity:0.2');
	}
	else {
		for(var i=Elp.childNodes.length-1; i>=0; --i)
			Elp.removeChild(Elp.childNodes[i]);
	}
}

function wmIslandColor(i) {
	var lSM=SM, LOCisl=Islands;
	if((!lSM.showStanding && !LOCisl[i]['dir'] && !LOCisl[i]['boost'])
	|| (!lSM.showMoving && LOCisl[i]['dir'] && !LOCisl[i]['boost'])
	|| (!lSM.showBoost && LOCisl[i]['boost'])
	|| (!lSM.showAttack && LOCisl[i]['attack'])
	|| (!lSM.showRomans && LOCisl[i]['nation']==1)
	|| (!lSM.showVikings && LOCisl[i]['nation']==2)
	|| (!lSM.showAztecs && LOCisl[i]['nation']==3)
	|| (!lSM.showLLF && LOCisl[i]['llf']))
		return false;
	
	if(LOCisl[i]['npc']) {
		if(!lSM.showNPC)
			return false;
		if(lSM.markNation)
			var color='transparent';
		else 
			var color='#A4AFAD';
	}
	else if(lSM.colorPlayer && lSM.player_marks[LOCisl[i]['user']]) {
		if(!lSM.showColored)
			return false;
		var color=lSM.player_marks[LOCisl[i]['user']];
	}
	else if(lSM.colorGilden && lSM.marks[LOCisl[i]['gilde']]) {
		if(!lSM.showColored)
			return false;
		var color=lSM.marks[LOCisl[i]['gilde']];
	}
	else if(LOCisl[i]['dipl']=='friend') {
		if(!lSM.showFriends)
			return false;
		var color='#39B92B';
	}
	else if(LOCisl[i]['dipl']=='ally') {
		if(!lSM.showAlly)
			return false;
		var color='royalblue';
	}
	else if(LOCisl[i]['dipl']=='enemy') {
		if(!lSM.showEnemy)
			return false;
		var color='red';
	}
	else {
		if(!lSM.showUnknown && !LOCisl[i]['dir'] && !LOCisl[i]['boost'] && !LOCisl[i]['attack'] && !LOCisl[i]['llf'])
			return false;
		if(lSM.markNation)
			var color='transparent';
		else 
			var color='black';
	}
	return color;
}
function wmCreateNation(div, i) {
	var LOCisl=Islands
	if(LOCisl[i]['nation']<0)
		div.style.borderColor = '#A4AFAD';
	else if(!LOCisl[i]['dir'] && !LOCisl[i]['boost'])
		div.style.borderColor = 'black';
	
	var img=appendElement(((LOCisl[i]['nation']>=0) ? 'img' : 'div'), div, {lang:'nation'}, 'width:15px; height:15px; position:absolute; z-index:3');
	
	
	if(LOCisl[i]['nation']==1)
		img.src=GLOBAL_release+'gfx/buildings_romans/island_building_1.png';
	else if(LOCisl[i]['nation']==2)
		img.src=GLOBAL_release+'gfx/buildings_vikings/island_building_1.png';
	else if(LOCisl[i]['nation']==3)
		img.src=GLOBAL_release+'gfx/buildings_aztecs/island_building_1.png';
	else if(LOCisl[i]['nation']==-1) {
		img.style.backgroundImage='url("'+GLOBAL_release+'gfx/animations_npc/trade_fleet_moving_normal_0.png")';
		img.style.backgroundPosition='-18px 36px';
	}
	else if(LOCisl[i]['nation']==-2) {
		img.style.backgroundImage='url("'+GLOBAL_release+'gfx/animations_npc/kraken_npc_arise_1.png")';
		img.style.backgroundPosition='-13px 25px';
	}
	else {
		img.src=GLOBAL_release+'gfx/buildings_npc/boss_island_building_1.png';
		img.lang='checkagain';
	}
}

function deleteWmElement(id) {
	if(Islands[id]['element']) {
		GLOBAL_wmIslandDiv.removeChild(Islands[id]['element']);
		Islands[id]['element']=false;
	}
}
function addWmPosition(i) {
	if(!SM.showPositions)
		return;
	var p=SM.savedPos[i].split(',');
	if(SM_Server=='asgard' || SM_Server=='palatin' || SM_Server=='aventin' || SM_Server=='utgard')
		appendElement('div', GLOBAL_wmIslandDiv, {title:'Position: '+SM.savedNames[i], lang:SM.savedNames[i], id:'wmPos'+SM.savedPos[i], className:'seaChartGuildMemberView'}, 'background-image:url("'+GLOBAL_release+'gfx/icons/guildboard_new_message_pinned_icon.png"); position:absolute; left:'+(GLOBAL_MiddleX + p[0]*GLOBAL_StepX - 18)+'px; top:'+(GLOBAL_MiddleY + p[1]*GLOBAL_StepY - 12)+'px; width:18px; height:12px');
	else
		appendElement('img', GLOBAL_wmIslandDiv, {title:'Position: '+SM.savedNames[i], lang:SM.savedNames[i], id:'wmPos'+SM.savedPos[i], className:'seaChartGuildMemberView', src:GLOBAL_release+'gfx/ui/guildboard_thread_sticky_icon.png'}, 'position:absolute; left:'+(GLOBAL_MiddleX + p[0]*GLOBAL_StepX - 5)+'px; top:'+(GLOBAL_MiddleY + p[1]*GLOBAL_StepY - 8)+'px; width:12px; height:12px');
}
function addShip(El, mapPos) {
	Pos=gpos(El, mapPos);
	GLOBAL_Ships.push({'x':Pos[0],
		'y':Pos[1],
		//'el':appendElement('img', GLOBAL_wmIslandDiv, {'src':GLOBAL_release+'gfx/icons/skull_seaview_icon.png', 'lang':'move'}, {'position':'absolute', 'left':(GLOBAL_MiddleX + Pos[0]*GLOBAL_StepX - 18)+'px', 'top':(GLOBAL_MiddleY + Pos[1]*GLOBAL_StepY - 12)+'px', 'width':'18px', 'height':'18px'})
		//'el':appendElement('div', GLOBAL_wmIslandDiv, {'lang':'ship'}, {'backgroundImage':El.style.backgroundImage, 'backgroundPosition':El.style.backgroundPosition, 'position':'absolute', 'left':(GLOBAL_MiddleX + Pos[0]*GLOBAL_StepX)+'px', 'top':(GLOBAL_MiddleY + Pos[1]*GLOBAL_StepY)+'px', 'width':El.style.width, 'height':El.style.height})
		'el':appendElement('div', GLOBAL_wmIslandDiv, {lang:'ship', className:'GM_seamapPlus_circle'}, 'background-color:red; position:absolute; left:'+(GLOBAL_MiddleX + Pos[0]*GLOBAL_StepX)+'px; top:'+(GLOBAL_MiddleY + Pos[1]*GLOBAL_StepY)+'px; width:4px; height:4px')
	});
}
function addIsland(id, o) {
	var LOCisl=Islands, lSM=SM;
	LOCisl[id]=o;
	
	if(lSM.cacheMax && GLOBAL_islandCount>lSM.cacheMax) {
		for(i in LOCisl) {
			if((!lSM.saveFriend || LOCisl[i]['dipl']!='friend') && (!lSM.saveAlly || LOCisl[i]['dipl']!='ally') && (!lSM.saveEnemy || LOCisl[i]['dipl']!='enemy') && (!lSM.saveMarked || (!lSM.marks[LOCisl[i]['gilde']] && !lSM.player_marks[LOCisl[i]['user']]))) {
				if(LOCisl[i]['element'])
					GLOBAL_wmIslandDiv.removeChild(LOCisl[i]['element']);
				
				delete LOCisl[i];
				--GLOBAL_islandCount;
				if(GLOBAL_islandCount<lSM.cacheMax-10)
					return;
			}
		}
		console.log('seamapPlus: Cache voll, aber keine Insel zum loeschen!')
	}
	else 
		++GLOBAL_islandCount;
}
function resetIslands() {
	if(gid('GM_seamapPlus_danger'))
		gid('GM_seamapPlus_danger').parentNode.removeChild(gid('GM_seamapPlus_danger'));
	
	var els=(gid('gvSeamap').firstChild.nextSibling || gid('gvSeamap').firstChild).firstChild.nextSibling.childNodes, i=els.length,
	elname, u;
	while(i--) {
		elname=els[i].id.split(':');
		if(els[i].lang!='checked' || !els[i].hasChildNodes() || !els[i].firstChild.hasChildNodes() || elname[0]=='resource_spending_spring' || elname[0]=='trade_island' || elname[0]=='trade_island')
			continue
		els[i].style.backgroundColor=null;
		els[i].className='islandIcon';
		
		u=toChild(els[i],3);
		u.lastChild.style.backgroundColor=null;
		u.lastChild.className=null;
		els[i].style.display='block';
		
		if(els[i].lastChild.lang=='injected')
			els[i].removeChild(els[i].lastChild);
	}
	GLOBAL_checkAgain=true;
}

function createRingLogButtons(el, daten, t) {
	if(el.lastChild.className=='GM_seamapPlus_hover')
		el.removeChild(el.lastChild);
	
	var img=appendElement('img', el, {src:GLOBAL_release+'gfx/icons/logbook_tab_icon_0.png', lang:'c_searchLogs', title:locale.searchFor_t, className:'GM_seamapPlus_hover'}, 'position:absolute; right:2px; bottom:0; width:25px;');
	img.setAttribute('daten', daten[2]);
	img.setAttribute('datenT', t);
}
function createRingButtons(el, daten) {
	if(el.lastChild.className=='GM_seamapPlus_hover2') {
		el.removeChild(el.lastChild);
		if(el.lastChild.className=='GM_seamapPlus_hover2')//zwei Buttons
			el.removeChild(el.lastChild);
	}
	if(daten[1]) {
		img=appendElement('img', el, {className:'GM_seamapPlus_hover2'}, 'position:absolute; left:0; bottom:3px; width:20px; height:20px');
		if(SM.marks[daten[1].slice(1,-1)]) {
			img.lang='c_deleteData';
			img.src=GLOBAL_release+'gfx/icons/guildboard_delete_post.png';
			img.title=locale.deleteGuildMark;
		}
		else {
			img.lang='c_addData';
			img.src=GLOBAL_release+'gfx/icons/guildboard_edit_post.png';
			img.title=locale.guildMarks_t;
		}
		img.setAttribute('daten', daten[1].slice(1,-1));//eckige Klammern erst jetzt entfernen -> regExp auch fuer gildenlose Spieler
		img.setAttribute('datenT', 3);
	}
	
	img=appendElement('img', el, {className:'GM_seamapPlus_hover2'}, 'position:absolute; left:17px; bottom:-3px; width:20px; height:20px');
	if(SM.player_marks[daten[2]]) {
		img.lang='c_deleteData';
		img.src=GLOBAL_release+'gfx/icons/guildboard_delete_post.png';
		img.title=locale.deletePlayerMark;
	}
	else {
		img.lang='c_addData';
		img.src=GLOBAL_release+'gfx/icons/ok_icon_small.png';
		img.title=locale.playerMarks_t;
	}
	img.setAttribute('daten', daten[2]);
	img.setAttribute('datenT', 2);
}
function preventAllyAttack(El, daten) {
	var col;
	if((daten[1] && (col=SM.marks[daten[1].slice(1,-1)])) || (col=SM.player_marks[daten[2]])) {
		El.className='GM_seamapPlus_circle';
		El.style.border = '3px solid '+col;
	}
	else {
		El.style.border=null;
		El.className=null;
	}
}

function setLLF(id, user, deleteI) {
	var El= gid(id), ElChild= toChild(El,4).nextSibling.firstChild, color, LOCisl=Islands;
	LOCisl[user]['llf']=(LOCisl[user]['lvl']>GLOBAL_Levelbereich);
	if(SM.seaShowLLF && LOCisl[user]['llf'])
		ElChild.className='GM_seamapPlus_llf GM_seamapPlus_circle';
	else if((!SM.seaShowLLF || !LOCisl[user]['llf']) && ElChild.className)
		ElChild.className=null;
	
	if(deleteI) {
		delete GLOBAL_forHS[i];
		
		if(SM.checkDanger && LOCisl[user]['llf']) {
			if(!Danger[user])
				addToDanger(id, user);
		}
		addToWorldMap(user);
	}
	
	return LOCisl[user]['llf'];
}
function drawDistance(mapPos) {
	var e=gid('GM_seamapPlus_distance'),
		winW=window.innerWidth*(mapPos[2] ? 2 : 1);
		winH=window.innerHeight*(mapPos[2] ? 2 : 1);
		dX=GLOBAL_MyX - (mapPos[0]+Math.round(winW/2)),
		dY=GLOBAL_MyY - (mapPos[1]+Math.round(winH/2)),
		dXabs=Math.abs(dX),
		dYabs=Math.abs(dY);
		z=Math.round(Math.sqrt(Math.pow(dXabs,2)+Math.pow(dYabs,2)));
	if(dXabs<winW/2 && dYabs<winH/2) {
		if(GLOBAL_distance_dir)
			e.style.display='none';
		GLOBAL_distance_dir=0;
		return;
	}
	else if(e.firstChild.innerHTML==z)
		return;
	e.style.display='none';
	
	e.firstChild.innerHTML=z;
	var diff=40,
		handW = parseInt(BUNDLES['hand_se'][1].slice(0,-2)),
		handH = parseInt(BUNDLES['hand_se'][2].slice(0,-2)),
		w= window.innerWidth - handW - diff,
		h= window.innerHeight - handH - diff;
	
	if(e.style.zIndex!=3000)
		e.style.zIndex=3000;
	
	if(dYabs>dXabs) {//u, o
		var w2=(w-diff)/2;
		if(dY>0) {//u
			var l=(diff+w2 + w2/(dY/dX));
			if(l<260)
				e.style.zIndex=10000;
			e.style.left= l + 'px';
			e.style.top= h+'px';
		}
		else {//o
			e.style.left= (diff+w2 - w2/(dY/dX)) + 'px';
			e.style.top= diff+'px';
		}
	}
	else {//r, l
		var h2=(h-diff)/2;
		if(dX>0) {//r
			e.style.top= (diff+h2 + h2/(dX/dY)) + 'px';
			e.style.left= w+'px';
		}
		else if(dXabs>dYabs) {//l
			e.style.top= (diff+h2 - h2/(dX/dY)) + 'px';
			e.style.left= diff+'px';
		}
	}
	
	
	if(dX>0 && dY>0) {//ru
		if(GLOBAL_distance_dir!=1){
		GLOBAL_distance_dir=1;
		e.style.backgroundPosition=BUNDLES['hand_se'][3];
		e.style.marginRight=0;
		e.firstChild.style.left='-20px';
		e.firstChild.style.top='0px';}
	}
	else if(dX>0 && dY<0) {//ro
		if(GLOBAL_distance_dir!=2){
		GLOBAL_distance_dir=2;
		e.style.backgroundPosition=BUNDLES['hand_ne'][3];
		e.style.marginRight=handW+'px';
		e.firstChild.style.left='-20px';
		e.firstChild.style.top='40px';}
	}
	else if(dX<0 && dY<0) {//lo
		if(GLOBAL_distance_dir!=3){
		GLOBAL_distance_dir=3;
		e.style.backgroundPosition=BUNDLES['hand_nw'][3];
		e.style.marginRight=0;
		e.firstChild.style.left='20px';
		e.firstChild.style.top='40px';}
	}
	else if(dX<0 && dY>0) {//lu
		if(GLOBAL_distance_dir!=4){
		GLOBAL_distance_dir=4;
		e.style.backgroundPosition=BUNDLES['hand_sw'][3];
		e.style.marginRight=handW+'px';
		e.firstChild.style.left='20px';
		e.firstChild.style.top='0px';}
	}
	
	
	e.style.display='block';
}
function jumpToPlayer(u) {
	var el=getEl("//input[@class='navigationInput']").snapshotItem(0), temp=el.value, e;
	el.value=u;
	
	e = document.createEvent('HTMLEvents'); 
	e.initEvent('click', true, true); 
	el.nextSibling.dispatchEvent(e); 
	el.value=temp;
}
function searchLog(u, TEMP_table, TEMP_kat_button) {
	var search=function(searchFor, els, els_len) {
		var user, e;
		for(var i=TEMP_lastLen; i<els_len; i++) {
			if(TEMP_kat=='menu_item_private_messages')
				user=els[i].lastChild.previousSibling.firstChild.firstChild.lastChild.textContent;
			else if(TEMP_kat=='menu_item_trade_log') {
				if((e=els[i].lastChild.previousSibling.firstChild.lastChild.firstChild.nextSibling))
					user=e.textContent;
				else
					continue;
			}
			else
				user=els[i].lastChild.previousSibling.firstChild.firstChild.firstChild.textContent;
			
			if(user=='???') {
				TEMP_lastLen=i;
				return 'wait';
			}
			else if(user==searchFor)
				return els[i];
		}
		TEMP_lastLen=i;
		return false;
	}
	var jumpToLog=function() {
		location.hash='#logbook';
		document.getElementById('game').className='logbook';
		var e = document.createEvent('HTMLEvents'); 
		e.initEvent('click', true, true); 
		TEMP_kat_button.dispatchEvent(e);
		if(gid('GM_seamapPlus_foundLog'))
			gid('logbook').firstChild.lastChild.scrollTop=gid('GM_seamapPlus_foundLog').offsetTop;
	}
	var startLoading=function() {
		var els=TEMP_table.childNodes, els_len=els.length, r;
		if(TEMP_cancelIt) {
			document.body.removeChild(gid('GM_seamapPlus_searchBox'));
			return;
		}
		else if(getEl("//div[@class='viewport']").snapshotItem(0))
			gid('GM_seamapPlus_searchState').textContent='waiting...';
		else if(TEMP_kat_button.hasChildNodes() && els.length>TEMP_lastLen) {
			if(!(r=search(TEMP_searchFor, els, els_len)) && TEMP_countLoads<TEMP_maxSearch && TEMP_button.style.display!='none') {
				if(gid('GM_seamapPlus_searchState').textContent !='searching...')
					gid('GM_seamapPlus_searchState').textContent='searching...';
				TEMP_countLoads++;
				gid('GM_seamapPlus_searchState').style.width=(TEMP_countLoads*25)+'px';
				TEMP_button.click();
			}
			else if(!r) {
				if(TEMP_countLoads>=TEMP_maxSearch)
					gid('GM_seamapPlus_searchState').textContent = locale.reachedLimit;
				else
					gid('GM_seamapPlus_searchState').textContent=locale.notFound;
				gid('GM_seamapPlus_searchState').style.width='125px';
				gid('GM_seamapPlus_searchState').style.backgroundColor='#6c1a1a';
				TEMP_closeIt=true;
				return;
			}
			else if(r!='wait') {
				r.id='GM_seamapPlus_foundLog';
				r.style.backgroundColor='#f4ecdc';
				gid('GM_seamapPlus_searchState').textContent=locale.found;
				gid('GM_seamapPlus_searchState').style.width='125px';
				gid('GM_seamapPlus_searchState').style.backgroundColor='#46430d';
				gid('GM_seamapPlus_searchJumpTo').style.display='block';
				TEMP_closeIt=true;
				if(location.hash=='#logbook')
					jumpToLog();
				return;
			}
		}
		else if(!TEMP_kat_button.hasChildNodes()) {
			gid('GM_seamapPlus_searchState').textContent='checking...';
			jumpToLog();
		}
		
		setTimeout(startLoading, 300);
	}
	if(gid('GM_seamapPlus_searchBox')) {
		document.body.removeChild(gid('GM_seamapPlus_searchBox'));
		if(gid('GM_seamapPlus_foundLog')) {
			gid('GM_seamapPlus_foundLog').style.backgroundColor=null;
			gid('GM_seamapPlus_foundLog').id=null;
		}
	}
	
	
	var main_div=appendElement('div', document.body, {className:'GM_seamapPlus_box', id:'GM_seamapPlus_searchBox'}, 'position:absolute; width:200px; top:80px; right:60px; z-index:10000');
		var div=createBundle('close', main_div, {title:locale.cancel, id:'GM_seamapPlus_searchCancel'}, 'float:left; cursor:pointer');
		div.addEventListener('click', function() {
			if(TEMP_closeIt) {
				document.body.removeChild(gid('GM_seamapPlus_searchBox'));
				if(gid('GM_seamapPlus_foundLog')) {
					gid('GM_seamapPlus_foundLog').style.backgroundColor=null;
					gid('GM_seamapPlus_foundLog').id=null;
				}
			}
			else {
				gid('GM_seamapPlus_searchState').textContent='aborting...';
				gid('GM_seamapPlus_searchState').style.backgroundColor='grey';
				TEMP_cancelIt=true;
			}
		}, false);
		appendElement('div', main_div, {innerHTML:locale.searchFor+'<br>'+u+':'}, 'display:block; font-weight:bold; font-size:11px');
		div=createBundle('jumpTo', main_div, {id:'GM_seamapPlus_searchJumpTo', title:locale.toLog}, 'display:none; float:right; cursor:pointer');
		div.addEventListener('click', function() {
			jumpToLog();
		}, false);
		div=appendElement('div', main_div, {className:'GM_seamapPlus_box'}, 'width:125px; height:13px; margin-left:2px; font-size:10px');
			appendElement('div', div, {id:'GM_seamapPlus_searchState', textContent:'searching...'}, 'width:0px; height:13px; background-color:#46300D');
		
	var TEMP_closeIt=false,
		TEMP_cancelIt=false,
		TEMP_countLoads=0,
		TEMP_maxSearch=10,
		TEMP_searchFor=u,
		TEMP_lastLen=1,
		TEMP_button=getEl("//button[@class='logbookMoreButton']").snapshotItem(0),
		TEMP_table_controll=gid('logbook').firstChild.lastChild.firstChild.firstChild.nextSibling.lastChild.lastChild,
		TEMP_controll_len=0;
		TEMP_kat=TEMP_kat_button.id;
	startLoading();
}

function mouseDownSeamap() {GLOBAL_noCheck=true;}
function clickSeamap(a) {
	GLOBAL_noCheck=false;
	var El= (GLOBAL_Browser=='ff') ? a['target'] : a['srcElement'];
	
	if(El.lang && (El.lang.slice(0,2)=='c_' || (El=El.parentNode).lang.slice(0,2)=='c_')) {
		
		var e=El.lang.slice(2);
		
		if(e=='0') {//showMenu
			if(El.nextSibling)
				El.parentNode.removeChild(El.nextSibling);
			else 
				createOptions(El.parentNode);
		}
		else if(e=='listIslands') //list Islands
			listIslands();
		else if(e=='delCache')//Cache loeschen
			delCache();
		else if(e=='props') {//Einstellungen
			if(El.firstChild.lang=='seaMarkMoving') {
				if(!GLOBAL_PA)
					return;
				if(!SM.seaMarkMoving && gid('seaMapOptionMenu').lastChild.firstChild.style.display!='block')
					alert(locale.markMoving_noPa);
			}
			else if(El.firstChild.lang=='showDistance')
				gid('GM_seamapPlus_distance').style.display='none';
			SM[El.firstChild.lang]=!El.firstChild.checked;//Event feuert zu frueh
			if(El.parentNode.lang!='seaDisplay' || El.firstChild.lang=='seaMarkMoving')
				GM_setValue(El.firstChild.lang+'_'+SM_Server, SM[El.firstChild.lang]);
			
			resetIslands();
		}
		else if(e=='props2') {//Einstellungen2 (Danger-Radius, highlevel, Cache begrenzen)
			var z=parseInt(El.previousSibling.value);
			if(El.parentNode.lang=='highlevel') {
				if(z<=4)
					El.previousSibling.value = z=5;
				GLOBAL_HS=false;
			}
			else if(El.parentNode.lang=='cacheMax' && z && z<50)
				El.previousSibling.value = z=50;
			GM_setValue(El.parentNode.lang+'_'+SM_Server, z);
			SM[El.parentNode.lang]=z;
			
			resetIslands();
			alert(locale.saved);
		}
		else if(e=='updateRate') {//Aktualisierungsrate
			var z=parseInt(El.previousSibling.value);
			if(z<100) {
				z=100;
				El.previousSibling.value=z;
			} else if(z>5000) {
				z=5000;
				El.previousSibling.value=z;
			}
			GM_setValue('update_rate_'+SM_Server, z);
			alert(locale.saved_pageStart);
		}
		else if(e=='cacheProps') {//Cache-loesch-einst; ACHTUNG verkehrte Logik
			SM.saveMarked=El.previousSibling.checked;
			SM.saveEnemy=El.previousSibling.previousSibling.checked;
			SM.saveAlly=El.previousSibling.previousSibling.previousSibling.checked;
			SM.saveFriend=El.previousSibling.previousSibling.previousSibling.previousSibling.checked;
			
			GM_setValue('saveMarked_'+SM_Server, SM.saveMarked);
			GM_setValue('saveEnemy_'+SM_Server, SM.saveEnemy);
			GM_setValue('saveAlly_'+SM_Server, SM.saveAlly);
			GM_setValue('saveFriend_'+SM_Server, SM.saveFriend);
			alert(locale.saved);
		}
		else if(e=='showHide') //Menue ein/ausblenden
			showHideMenu(El.nextSibling)
		else if(e=='deleteData')
			deleteData((El.getAttribute('datenT') || El.parentNode.parentNode.lang), (El.getAttribute('daten') || El.parentNode.lang));
		else if(e=='addData') {
			if(El.nextSibling && El.nextSibling.lang==1) {
				var pos=gMainpos(), titel;
				var post_str= (pos[0]+Math.round(window.innerWidth/2))+','+Math.round(pos[1]+(window.innerHeight/2));
				if(!(titel= prompt(locale.savePos, post_str))) return;
				
				saveData('savedPos', 'savedNames', post_str, titel, 1);
				addWmPosition(SM.savedPos.length-1);
			}
			else
				newMarker((El.getAttribute('daten')), (El.getAttribute('datenT') || El.nextSibling.lang)==2)
		}
		else if(e=='searchLogs')
			searchLog(El.getAttribute('daten'), gid(El.getAttribute('datenT')+'_table').lastChild, gid(El.getAttribute('datenT')));
		else if(e=='editData')//editMarker
			newMarker(false, (El.parentNode.parentNode.lang==2), El.parentNode.lang);
		else if(e=='v') {//jumpToPos
			window.location.hash = 'seamap('+El.title+')';
			setTimeout(function() {window.location.hash = 'seamap';}, 1000);
		}
		else if(e=='u')//jumpToPlayer
			jumpToPlayer(El.innerHTML);
		else if(e=='distance')
			troopTime(El.firstChild.textContent);
		else if(e=='goHome') {
			window.location.hash = 'seamap(home)';
			setTimeout(function() {window.location.hash = 'seamap';}, 1000);
		}
		else if(e=='language') {
			GM_setValue('isEnglish_'+SM_Server, El.hasChildNodes() ? El.firstChild.value==1 : El.value==1);
			alert(locale.saved_pageStart);
		}
	}
	else if(gid('seamapRingMenu').style.display!='none') {
		var daten;
		
		if((El=gid('menu_item_playerProfile'))) {
			if(El.lastChild.className=='GM_seamapPlus_hover2') {
				El.removeChild(El.lastChild);
				if(El.lastChild.className=='GM_seamapPlus_hover2')//zwei Buttons
					El.removeChild(El.lastChild);
			}
			if((El=gid('menu_item_privateMessage')).lastChild.className=='GM_seamapPlus_hover')
				El.removeChild(El.lastChild);
			if((El=gid('menu_item_trade')).lastChild.className=='GM_seamapPlus_hover')
				El.removeChild(El.lastChild);
			if((El=gid('menu_item_war')).lastChild.className=='GM_seamapPlus_hover')
				El.removeChild(El.lastChild);
		}
		if(gid('GM_seamapPlus_getTroopTimes'))
			gid('menu_item_war').removeChild(gid('GM_seamapPlus_getTroopTimes'));
		
		var pos=gMainpos(),
			div=createBundle('troops', gid('menu_item_war'), {lang:'c_distance', id:'GM_seamapPlus_getTroopTimes', title:locale.trooptime}, 'cursor:pointer; position:absolute; right:-20px; top:60px'),
			x=(pos[0] + parseInt(gid('seamapRingMenu').style.left.slice(0,-2)) + gid('seamapRingMenu').style.width.slice(0,-2)/2),
			y=(pos[1] + parseInt(gid('seamapRingMenu').style.top.slice(0,-2)) + gid('seamapRingMenu').style.height.slice(0,-2)/2);
			
		if(pos[2]) {
			x=x*2;
			y=y*2;
		}
		
		appendElement('div', div, {textContent:Math.round(Math.sqrt(Math.pow(Math.abs(x - GLOBAL_MyX),2)+Math.pow(Math.abs(y - GLOBAL_MyY),2))), className:'GM_seamapPlus_box', lang:'parent', title:locale.distance}, 'position:absolute; left:15px; bottom:10px; font-size:9px;');
		
		if(gid('menu_item_playerProfile').className=='clickable') {
			El=gid('seamapRingMenu').lastChild.previousSibling;
			while(El.className!='ThemeLabel' || !(daten = toChild(El,3).nextSibling.innerHTML.match(locale.regExpRingmenu)))
				El=El.previousSibling;
			
			if(daten[2]!=GLOBAL_MyUsername) {
				createRingButtons(gid('menu_item_playerProfile'), daten);
				
				createRingLogButtons(gid('menu_item_privateMessage'), daten, 'menu_item_private_messages');
				if((tEl=gid('menu_item_trade')))
					createRingLogButtons(tEl, daten, 'menu_item_trade_log');
				if((tEl=gid('menu_item_war'))) {
					preventAllyAttack(tEl, daten);
					createRingLogButtons(tEl, daten, 'menu_item_combat');
				}
			}
		}
		else {
			El=gid('menu_item_playerProfile');//fuer EinzelInsel
			if(El.lastChild.className=='GM_seamapPlus_circle') {
				El.removeChild(El.lastChild);
				if(El.lastChild.className=='GM_seamapPlus_circle')//zwei Buttons
					El.removeChild(El.lastChild);
			}
			
			gid('menu_item_war').style.border=null;
			gid('menu_item_war').className=null;
			var Buttons=getEl("//div[contains(@id, 'menu_item_playerProfile_island')]"),
				i=Buttons.snapshotLength, temp, tEl;
			
			while(i--) {
				El=Buttons.snapshotItem(i);
				daten=El.firstChild.title.match(locale.regExpRingmenu);
				
				if(daten[2]!=GLOBAL_MyUsername) {
					createRingButtons(El, daten);
					
					temp=El.id.slice(23);
					createRingLogButtons(gid('menu_item_privateMessage'+temp), daten, 'menu_item_private_messages');
					if((tEl=gid('menu_item_trade'+temp)))
						createRingLogButtons(tEl, daten, 'menu_item_trade_log');
					if((tEl=gid('menu_item_war'+temp))) {
						preventAllyAttack(tEl, daten);
						createRingLogButtons(tEl, daten, 'menu_item_combat');
					}
				}
			}
		}
	}
}
function clickWorld(a) {
	if(GLOBAL_Browser=='ff') {
		var klickEl=a['target'];
		GLOBAL_MausX=a.layerX;
		GLOBAL_MausY=a.layerY;
	}
	else {
		var klickEl=a['srcElement'];
		GLOBAL_MausX=a.offsetX;
		GLOBAL_MausY=a.offsetY;
	}
	
	if(klickEl.parentNode.className!='contentPanel' && klickEl.parentNode.id!='GM_seamapPlus_wmIslOptions') {
		while(klickEl.lang=='attack' || klickEl.lang=='radius' || klickEl.lang=='dir' || !klickEl.style.left)
			klickEl=klickEl.parentNode;
		
		GLOBAL_MausX=parseInt(klickEl.style.left.slice(0,-2))+parseInt(klickEl.style.width.slice(0,-2)/2);
		GLOBAL_MausY=parseInt(klickEl.style.top.slice(0,-2))+parseInt(klickEl.style.width.slice(0,-2)/2);
	}
	
	if(gid('GM_seamapPlus_wmIslOptions')) {
		//if(klickEl.id=='GM_seamapPlus_wmIslOptions')
		//	var lang=klickEl.lang; //da ja gleich geloescht
		gid('GM_seamapPlus_wmIslOptions').parentNode.removeChild(gid('GM_seamapPlus_wmIslOptions'));
	}
	
	if(SM.klickWmElements && klickEl.lang) {
		if(klickEl.lang=='removeFromCache') {
			GLOBAL_wmIslandDiv.removeChild(gid(klickEl.parentNode.lang));
			if(Islands[klickEl.parentNode.lang.slice(3)]) //wegen Positionsanzeige
				delete Islands[klickEl.parentNode.lang.slice(3)];
			else
				for(var i in SM.savedNames) {
					if(SM.savedNames[i]==klickEl.parentNode.lang.slice(5)) {
						delete SM.savedPos[i];
						delete SM.savedNames[i];
						break;
					}
				}
		}
		else if(klickEl.lang=='searchIsland') {
			var u=klickEl.parentNode.lang.slice(3),
				el=toChild(gid('GM_seamapPlus_worldmap_options').previousSibling, 5).nextSibling,
				e = document.createEvent('HTMLEvents'); 
		
			window.location.hash='#seamap('+Islands[u]['x']+','+Islands[u]['y']+')';
			e.initEvent('click', true, true);
			getEl("//div[@class='gwt-PopupPanel']").snapshotItem(0).style.left = '-500px';
			el.dispatchEvent(e);
			jumpToPlayer(u);
			return;
			
		}
		else {
			while(!klickEl.id)
				klickEl=klickEl.parentNode;
			
			var div=appendElement('div', gid('GM_seamapPlus_wmIslandDiv').parentNode, {id:'GM_seamapPlus_wmIslOptions', lang:klickEl.id}, 'position:absolute; left:'+GLOBAL_MausX+'px; top:'+GLOBAL_MausY+'px; z-index:4');
			if(Islands[klickEl.id.slice(3)])
				createBundle('search_mini', div, {className:'GM_seamapPlus_hover2', lang:'searchIsland', title:locale.searchThisIsland}, 'float:left; z-index:4');
			createBundle('del', div, {className:'GM_seamapPlus_hover2', lang:'removeFromCache', title:locale.removeFromCache}, 'float:left; z-index:4');
		}
		getEl("//div[@class='gwt-PopupPanel']").snapshotItem(0).style.left = '-500px';
	}
	else if(gid('GM_seamapPlus_wmExplore')) {
		var x=Math.abs((GLOBAL_MausX-GLOBAL_MiddleX)/GLOBAL_StepX - GLOBAL_MyX)*2;
		var y=Math.abs((GLOBAL_MausY-GLOBAL_MiddleY)/GLOBAL_StepY - GLOBAL_MyY)*2;
		var z=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
		gid('GM_seamapPlus_wmExplore').parentNode.lang=z;
		gid('GM_seamapPlus_wmExplore').innerHTML=parseTime(z);
	}
}
function clickWorldOptions(a) {
	var completeWorldMap=function() {
		for(var i in Islands)
			if(!Islands[i]['element'])
				addToWorldMap(i);
		
		if(SM.showPositions)
			for(var i=0; i<SM.savedPos.length; ++i) {
				if(gid('wmPos'+SM.savedPos[i]))
					continue;
				addWmPosition(i);
			}
	}
	var scrollToPos=function(El, x, y) {
		var tx=Math.round(El.scrollLeft+parseInt(El.style.width.slice(0,-2))/2);
		var ty=Math.round(El.scrollTop+parseInt(El.style.height.slice(0,-2))/2);
		if(Math.abs(x-tx)+Math.abs(y-ty) < 15)
			return;
		
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0,
		x,
		y,
		false, false, false, false, 0, null);
		El.dispatchEvent(evt);
		
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mousemove", false, true, window, 0, 0, 0,
		tx,
		ty,
		false, false, false, false, 0, null);
		El.dispatchEvent(evt);
		
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", false, true, window, 0, 0, 0,
		tx,
		ty,
		false, false, false, false, 0, null);
		El.dispatchEvent(evt);
	}
	
	
	if(a['target'])
		var El = a['target'];
	else if(a['target'])
		var El = a['srcElement'];
	
	if(El.className!='GM_seamapPlus_hover' && (El=El.parentNode).className!='GM_seamapPlus_hover')
		return;
	
	if(El.lang=='onOff')//ein-/ausblenden
		GLOBAL_wmIslandDiv.style.display= (El.lastChild.checked ? 'block' : 'none');
	else if(El.lang=='showMe') {//Options2
		if(SM.showMe==El.firstChild.nextSibling.checked)
			return;
		SM.showMe=El.firstChild.nextSibling.checked;
		
		var Marker;
		if(!(Marker=getEl("//div[@class='seachartViewportMarker']").snapshotItem(0)))
			return;
		if(!SM.showMe) {
			Marker.style.display='none'; //Sichtfeld
			if(Marker.previousSibling.style.display!='none') {
				Marker.previousSibling.style.display='none'; //Zielboje
				Marker.previousSibling.lang='showIt';
			}
			Marker.previousSibling.previousSibling.style.display='none'; //Island
			Marker.previousSibling.previousSibling.previousSibling.style.display='none'; //Island-Pfeile
		}
		else {
			Marker.style.display = 'block'; //Sichtfeld
			if(toParent(getEl("//input[@class='navigationInput']").snapshotItem(0),3).nextSibling.firstChild.firstChild.style.display != 'none')
			if(Marker.previousSibling.lang) {
				Marker.previousSibling.style.display='block'; //Zielboje
				Marker.previousSibling.lang=null;
			}
			Marker.previousSibling.previousSibling.style.display='block'; //Island
			Marker.previousSibling.previousSibling.previousSibling.style.display='block'; //Island-Pfeile
		}
	}
	else if(El.lang=='markRadius') {
		if(SM.markRadius==El.firstChild.nextSibling.checked)
			return;
		SM.markRadius=El.firstChild.nextSibling.checked;
		GM_setValue('markRadius_'+SM_Server, SM.markRadius);
		drawRadius();
	}
	else if(El.lang=='showHide') {
		showHideMenu(El.nextSibling);
	}
	else if(El.lang=='showHidePos') {
		gid('GM_seamapPlus_wmPosBox').innerHTML='';
		for(var i in SM.player_marks)
			if(Islands[i])
				appendElement('div', gid('GM_seamapPlus_wmPosBox'), {innerHTML:i, title:Islands[i]['x']+', '+Islands[i]['y'], lang:'GOTOPos', className:'GM_seamapPlus_hover'}, 'color:'+SM.player_marks[i]);
		
		appendElement('hr', gid('GM_seamapPlus_wmPosBox'));
		
		for(var i in SM.savedPos)
			appendElement('div', gid('GM_seamapPlus_wmPosBox'), {innerHTML:SM.savedNames[i], title:SM.savedPos[i], lang:'GOTOPos', className:'GM_seamapPlus_hover'});
		showHideMenu(El.nextSibling);
	}
	else if(El.lang.slice(0,4)=='goTo') {
		var viewport=getEl("//div[@class='viewport']").snapshotItem(0);
		if(El.lang=='goToHome')
			var toEl=viewport.firstChild.firstChild.nextSibling.firstChild;
		else if(El.lang=='goToDest') {
			var toEl=viewport.firstChild.firstChild.nextSibling.firstChild.nextSibling.nextSibling;
			if(toEl.style.display=='none' && !toEl.lang)
				return;
		}
		if(El.lang=='goToSight')
			var toEl=viewport.firstChild.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling;
		
		
		scrollToPos(viewport, parseInt(toEl.style.left.slice(0,-2)), parseInt(toEl.style.top.slice(0,-2)));
	}
	else if(El.lang=='GOTOPos') {
		var viewport=getEl("//div[@class='viewport']").snapshotItem(0);
		var pos=El.title.split(',');
		
		scrollToPos(viewport, parseInt(GLOBAL_MiddleX + parseInt(pos[0])*GLOBAL_StepX), parseInt(GLOBAL_MiddleY + parseInt(pos[1])*GLOBAL_StepY));
	}
	
	
	else {//Options
		if(SM[El.lang]==El.firstChild.nextSibling.checked)
			return;
		SM[El.lang]=El.firstChild.nextSibling.checked;
		GM_setValue(El.lang+'_'+SM_Server, SM[El.lang]);
		if(El.firstChild.nextSibling.lang && SM[El.lang]) //lang-Abfrage, nicht alle brauchen complete!
			completeWorldMap();
		else 
			filterWorldMap();
	}
}

function clickWmButton(a) {
	gid('GM_seamapPlus_checkLoad').style.display = 'block';
	
	var x=Math.round((GLOBAL_MausX-GLOBAL_MiddleX) / GLOBAL_StepX);
	var y=Math.round((GLOBAL_MausY-GLOBAL_MiddleY) / GLOBAL_StepY);
	
	window.location.hash='seamap('+x+','+y+')';
	
	var El=getEl("//div[@class='seachartViewportMarker']").snapshotItem(0).style;
	El.left=Math.round(GLOBAL_MausX - El.width.slice(0,-2)/2)+'px';
	El.top=Math.round(GLOBAL_MausY - El.height.slice(0,-2)/2)+'px';
	
	toParent(this,6).style.left = '-500px';

}
function clickWmExplore() {
	var div=getEl("//div[@class='dialogMiddleCenterInner dialogContent']");
	div=div.snapshotItem(((div.snapshotItem(0).firstChild.tagName=='TABLE')) ? 0 : 1);//escamod-Abfrage
	
	troopTime(this.lang, div, true);
	
	while((div=document.body.lastChild).className!='gwt-PopupPanel')
		div=div.previousSibling;
	div.style.left = '-500px';
}


function createOptions(main_div) {
	addCheckbox=function(div, name, title, v, dis) {
		var label=appendElement('label', div, {className:'GM_seamapPlus_hover', title:(title || ''), innerHTML:'<input type="checkbox">'+name});
		
		label.firstChild.checked=SM[v];
		label.lang='c_props';
		label.firstChild.lang=v;
		label.firstChild.disabled=dis;
	}
	
	GLOBAL_PA=(gid('seaMapOptionMenu').lastChild.title==locale.PAcheckString) ? true : false;
	var box, el,
		commandDiv=appendElement('ul', main_div, false, 'margin-right:60px; width:300px');
	
	appendElement('li', commandDiv, {lang:'c_delCache', className:'GM_seamapPlus_hover', innerHTML:locale.delCache_fuName, title:locale.delCache_fuName_t});
	
	box=appendElement('li', commandDiv);
	addCheckbox(box, locale.mapCheck, locale.mapCheck_t, 'controlMap');
	addCheckbox(box, locale.displayDistance, locale.displayDistance_t, 'showDistance');
	
	box=appendElement('li', commandDiv, {innerHTML:locale.highlevels+':&nbsp;', lang:'highlevel', title:locale.displayHighlevels_t});
		appendElement('input', box, {type:'text', value:GM_getValue('highlevel_'+SM_Server, 100)}, 'width:30px; text-align:center');
		appendElement('img', box, {src:GLOBAL_release+'gfx/icons/ok_icon_small.png', lang:'c_props2'}, 'vertical-align:bottom; cursor:pointer; height:20px');
	
	box=appendElement('li', commandDiv, {innerHTML:locale.update_rate, title:locale.update_rate_t});
		appendElement('input', box, {type:'text', value:GM_getValue('update_rate_'+SM_Server, 1000)}, 'width:40px; text-align:center');
		appendElement('img', box, {src:GLOBAL_release+'gfx/icons/ok_icon_small.png', lang:'c_updateRate'}, 'vertical-align:bottom; cursor:pointer; height:20px');
		
	box=appendElement('li', commandDiv, {innerHTML:locale.cache_max, lang:'cacheMax', title:locale.cache_max_t});
		appendElement('input', box, {type:'text', 'value':SM.cacheMax}, 'width:30px; text-align:center');
		appendElement('img', box, {src:GLOBAL_release+'gfx/icons/ok_icon_small.png', lang:'c_props2'}, 'vertical-align:bottom; cursor:pointer; height:20px');
		appendElement('div', box, {innerHTML:'('+locale.cache_max_desc+'0=unendlich; Aktueller Speicher: '+GLOBAL_islandCount+' '+locale.islands+')'}, 'font-size:10px');
	
	box=appendElement('li', commandDiv, {innerHTML:locale.stayCache, title:locale.stayCache_t});
		appendElement('input', box, {type:'checkbox', checked:SM.saveFriend, title:locale.friends}, 'outline:1px solid #39B92B');
		appendElement('input', box, {type:'checkbox', checked:SM.saveAlly, title:locale.allys}, 'outline:1px solid royalblue');
		appendElement('input', box, {type:'checkbox', checked:SM.saveEnemy, title:locale.enemys}, 'outline:1px solid red');
		appendElement('input', box, {type:'checkbox', checked:SM.savearked, title:locale.marked_players});
		appendElement('img', box, {src:GLOBAL_release+'gfx/icons/ok_icon_small.png', lang:'c_cacheProps'}, 'vertical-align:bottom; cursor:pointer; height:20px');
	
	appendElement('li', commandDiv, {innerHTML:locale.earlyWarning_options, title:locale.earlyWarning_options_t, lang:'c_showHide', className:'GM_seamapPlus_hover'}, 'font-weight:bold; margin-bottom:10px');
	
	box=appendElement('li', commandDiv, {className:'GM_seamapPlus_box'}, 'display:none; margin:10px 0');
		addCheckbox(box, locale.activate, false, 'checkDanger');
		
		addCheckbox(box, locale.earlyWarning_marked, locale.earlyWarning_marked_t, 'dangerMarked');
		addCheckbox(box, locale.earlyWarning_moving, locale.earlyWarning_moving_t, 'dangerDir');
		addCheckbox(box, locale.highlevels, locale.earlyWarning_highlevels_t, 'dangerLLF');
		addCheckbox(box, locale.attack, locale.earlyWarning_attack_t, 'dangerAttack');
		addCheckbox(box, locale.enemys, locale.earlyWarning_enemys_t, 'dangerEnemy');
		el=appendElement('div', box, {innerHTML:locale.earlyWarning_distance, lang:'dangerDistance', title:locale.earlyWarning_distance_t}, 'margin-left:5px');
			appendElement('input', el, {type:'text', value:SM.dangerDistance}, 'width:40px; text-align:center');
			appendElement('img', el, {src:GLOBAL_release+'gfx/icons/ok_icon_small.png', lang:'c_props2'}, 'vertical-align:bottom; cursor:pointer; height:20px');
		
	appendElement('li', commandDiv, {innerHTML:locale.seamapShow, title:locale.seamapShow_t, lang:'c_showHide', className:'GM_seamapPlus_hover'}, 'font-weight:bold; margin-bottom:10px');

	box=appendElement('li', commandDiv, {className:'GM_seamapPlus_box', lang:'seaDisplay'}, 'display:none; margin:10px 0');
		addCheckbox(box, locale.marked_guilds, locale.show_markedGuild_t, 'seaColorGilden');
		addCheckbox(box, locale.marked_players, locale.show_markedGPlayers_t, 'seaColorPlayer');
		addCheckbox(box, locale.highlevels, locale.show_higlevels_t, 'seaShowLLF');
		addCheckbox(box, locale.movingStatus, locale.movingStatus_t, 'seaMarkMoving', !GLOBAL_PA);
		appendElement('hr', box);
		addCheckbox(box, locale.standing, locale.show_standing_t, 'seaShowStanding', !GLOBAL_PA);
		addCheckbox(box, locale.moving, false, 'seaShowMoving', !GLOBAL_PA);
		addCheckbox(box, locale.friends, false, 'seaShowFriends');
		addCheckbox(box, locale.allys, false, 'seaShowAlly');
		addCheckbox(box, locale.enemys, false, 'seaShowEnemy');
		addCheckbox(box, locale.npcs, false, 'seashowNPC');
		addCheckbox(box, locale.romans, false, 'seaShowRomans');
		addCheckbox(box, locale.vikings, false, 'seaShowVikings');
		addCheckbox(box, locale.aztecs, false, 'seaShowAztecs');
		addCheckbox(box, locale.others, locale.show_others_t, 'seaShowUnknown');
	
	box=appendElement('li', commandDiv, {className:'GM_seamapPlus_box'});
		el=appendElement('div', box, {innerHTML:locale.lang+':'}, 'font-weight:bold');
		el=appendElement('label', box, {lang:'c_language'});
			appendElement('input', el, {type:'radio', name:'language', checked:!SM.isEnglish, value:0, lang:'c_language'});
			el.appendChild(document.createTextNode('Deutsch'));
		el=appendElement('label', box, {lang:'c_language'});
			appendElement('input', el, {type:'radio', name:'language', checked:SM.isEnglish, value:1, lang:'c_language'});
			el.appendChild(document.createTextNode('English'));
		//appendElement('img', box, {src:GLOBAL_release+'gfx/icons/ok_icon_small.png', lang:'c_language'}, 'vertical-align:bottom; cursor:pointer; height:20px; float:right');
	box=appendElement('li', commandDiv, {title:locale.feedbackthread_t});
		appendElement('a', box, {className:'GM_seamapPlus_hover', href:locale.feedbackthread_url, target:'_blank', innerHTML:locale.feedbackthread_value}, 'text-decoration:none');
}

init=function() {
	var script, move, temp1, temp2, ConfData, ConfData_ar, ProzentX, ProzentY,
		pushFriendsToWm=function() {
			setTimeout(function() {
				var oldWM;
				if(!(oldWM=getEl("//div[@class='seaChartGuildMemberPanel']").snapshotItem(0)))
					return;
				
				if(!oldWM.childNodes.length) {
					var El;
					if(GLOBAL_MyGilde && 
						(!(El=getEl("//div[@class='guildMembershipPanel']").snapshotItem(0))
						|| toChild(El.firstChild.firstChild.nextSibling, 3).innerHTML.match(/.+\((\d+)\)/)[1])
					) {
						pushFriendsToWm();
						return;
					}
				}
				else {
					var color;
					for(var i=0; i<oldWM.childNodes.length; ++i) {
						var El=oldWM.childNodes[i];
						var id=El.title;
						
						if(Islands[id])
							continue;
						
						addIsland(id, {'user':id, 'gilde':GLOBAL_MyGilde, 'dipl':'friend', 'nation':0, 'x':Math.round(parseInt((El.style.left.slice(0,-2))-GLOBAL_MiddleX+5)/GLOBAL_StepX), 'y':Math.round(parseInt((El.style.top.slice(0,-2))-GLOBAL_MiddleY+5)/GLOBAL_StepY)});
						addToWorldMap(id);
					}
				}
				oldWM.style.display='none';
				gid('menu_item_worldMap').removeEventListener('click', pushFriendsToWm, false);
				
				if(SM.showPositions)
					for(var i=0; i<SM.savedPos.length; ++i)
						addWmPosition(i);
				pushFriendsToWm;
			},500);
		},
		insertWmMenu=function() {
			var createWMbutton=function() {
				var Popup;
				if(!(Popup=getEl("//div[@class='gwt-PopupPanel']").snapshotItem(0)))
					return;
				if(!gid('GM_seamapPlus_wmLoad')) {
					var table=toChild(Popup,3),
						tr=appendElement('tr', table),
						td=appendElement('td', tr, {align:'center', colSpan:2}),
						img=createBundle('wmButton', td, {id:'GM_seamapPlus_wmLoad', title:locale.descWmButton}, 'cursor:pointer');
					
					img.addEventListener('click', clickWmButton, false);
					
					
					var div=appendElement('div', Popup.firstChild, {title:locale.WMexploration_desc}, 'position:absolute; cursor:pointer; top:10px; left:135px; width:140px');
					appendElement('img', div, {src:GLOBAL_release+'gfx/icons/explore_icon_1.png'}, 'height:40px; margin-right:5px');
					appendElement('div', div, {id:'GM_seamapPlus_wmExplore', innerHTML:'Init...'}, 'display:inline-block; vertical-align:top; margin-top:10px; text-shadow:1px 1px white; font-weight:bold');
					div.addEventListener('click', clickWmExplore, false);
				}
				getEl("//div[@class='viewport']").snapshotItem(0).removeEventListener('mouseup', createWMbutton, false);
				delete BUNDLES['wmButton'];
			}
			var IMG_islPoint ='data:image/gif;base64,R0lGODlhDAAMAJEAAGFJG////////wAAACH5BAEAAAIALAAAAAAMAAwAAAIahI+pGx0songoSEmNvbPyfmxXpo2Ms6QqUgAAOw==',
				IMG_islPointMark ='data:image/gif;base64,R0lGODlhDAAMALMAAPAAL9UAg7sA1vz/AGFJG/+MAP8MAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAMAAwAAAQikMhJq70nH1wMCBt1DN0nhNJYBqdIeixKqHArrvKk5VffRwA7',
				IMG_islPointGilde ='data:image/gif;base64,R0lGODlhDAAMAKIAADm5K5zclWvLYGFJG4l3VP///////wAAACH5BAEAAAYALAAAAAAMAAwAAAMqOErVRSo2AYBoMtQNQhkMxz0FJVZXcY7qWk3uFa7PUGiiJ5UoFoGOmiIBADs=',
				IMG_islPointLLF ='data:image/gif;base64,R0lGODlhDAAMAJEAAGFJG////wAAAP///yH5BAEAAAMALAAAAAAMAAwAAAIchI+pGe2Ngpg0RFovFvbI3RkfFgJj5j3OwrZGAQA7',
				IMG_islPointBoost ='data:image/gif;base64,R0lGODlhDAAMAKIAAEFp4WFJG/8AAAAAAP///wAAAAAAAAAAACH5BAEAAAQALAAAAAAMAAwAAAMmGLrc8NABQcVbT4w9LFATx1mgJnZfEJ6kaoptBl/gVNEYhDd8kAAAOw==',
				IMG_islPointBoost_c ='data:image/gif;base64,R0lGODlhDAAMAJEAAEFp4WFJGwAAAP///yH5BAEAAAMALAAAAAAMAAwAAAIfjI8Jy8p/mJiihUXpMjhXwAHeF47b1U0W+pxRm8RIAQA7',
				IMG_islPointMove ='data:image/gif;base64,R0lGODlhDAAMAJEAAGFJG/8AAAAAAP///yH5BAEAAAMALAAAAAAMAAwAAAIbhI+pGh0bhBQPxSnbudNVnjkGGFpYlXjLyiYFADs=',
				IMG_islPointShip ='data:image/gif;base64,R0lGODlhDAAMAJEAAGFJG/8AAP///wAAACH5BAEAAAIALAAAAAAMAAwAAAIPhI+py80RGoRvyuiy3qoAADs=',
				IMG_radius='data:image/gif;base64,R0lGODlhDAAMAKIAAGFJG3VkQ3prTXtsT2dRKHNhP3RiQP///yH5BAEAAAcALAAAAAAMAAwAAAM0CErSQio2U4ppMtRdggDMNgzbI1DFOFaXUKlq1bwwWUz0apmifUMCDafzUeB2xQjDAVEkAAA7',
				IMG_radius='data:image/gif;base64,R0lGODlhDAAMAKIAAGFJG3VkQ3prTXtsT2dRKHNhP3RiQP///yH5BAEAAAcALAAAAAAMAAwAAAMuCErSQio2U4ppMtRdggAMxz0CVQ3Ddgkbim5N68KlrJIiDAma6Ek1CyYCcjwiCQA7';

			setTimeout(function() {
				var viewport;
				if(!(viewport=getEl("//div[@class='viewport']").snapshotItem(0)))
					return;
				
				var addWorldMenu=function(div, name, v, complete, bspImg, color) {
					var label=appendElement('label', div, {lang:v, className:'GM_seamapPlus_hover'});
					
					if(bspImg)
						appendElement('img', label, {src:bspImg}, (color ? 'background-color:'+color+';' : '')+'width:12px');
					else
						appendElement('div', label, false, 'display:inline-block; width:12px');
					
					appendElement('input', label, {type:'checkbox', checked:SM[v], lang:(complete ? '1' : '')});
					appendElement('span', label, {innerHTML:name});
				}
				
				
				
				
				//Ladeanzeige
				createBundle('loading', getEl("//div[@class='seachartViewportMarker']").snapshotItem(0), {'id':'GM_seamapPlus_checkLoad'}, 'display:none; position:absolute; bottom:0; right:0');
				
				//Events in Worldmap einfuegen
				viewport.addEventListener('mouseup', createWMbutton, false);//temp-function
				viewport.addEventListener('mouseup', clickWorld, false);
				
				//Menu einfuegen -->
				var popupContent=getEl("//div[@class='dialogMiddleCenterInner dialogContent']");
				popupContent=popupContent.snapshotItem(((popupContent.snapshotItem(0).firstChild.tagName=='TABLE')) ? 0 : 1);//escamod-Abfrage
				
				var div=appendElement('div', popupContent, {id: 'GM_seamapPlus_worldmap_options', className:'GM_seamapPlus_box'}, 'position:absolute; right:30px; top:0; width:200px; z-index:1000');
					div.addEventListener('click', clickWorldOptions, false);
					
					var label=appendElement('label', div, {title:locale.activate_clickOptions, className:'GM_seamapPlus_hover', lang:'klickWmElements'}, 'float:right');
					appendElement('img', label, {src:GLOBAL_release+'gfx/ui/helping_hand_right.png'}, 'height:24px; width:20px');
					appendElement('input', label, {type:'checkbox', checked:SM.klickWmElements}, 'vertical-align:top');
					
					var label=appendElement('label', div, {title:locale.activate_wm, lang:'onOff', className:'GM_seamapPlus_hover'}, 'float:left');
					appendElement('img', label, {src:GLOBAL_release+'gfx/icons/islandview_tab_icon_0.png'}, 'width:25px; height:30px');
					//appendElement('img', label, {'src':GLOBAL_release+'gfx/icons/cargoAfloat_0.png'}, {'width':'25px', 'height':'30px'});
					appendElement('input', label, {type:'checkbox', checked:true}, 'vertical-align:top');
					
					
					appendElement('div', div, {innerHTML:locale.highlight, className:'GM_seamapPlus_hover', lang:'showHide'}, 'font-weight:bold; margin-top:35px; text-align:center');
					var div2=appendElement('div', div, false, 'display:none');
					
						addWorldMenu(div2, locale.marked_guilds, 'colorGilden', false, IMG_islPointMark);
						addWorldMenu(div2, locale.marked_players, 'colorPlayer', false, IMG_islPointMark);
						addWorldMenu(div2, locale.highlevels, 'markLLF', false, IMG_islPointLLF);
						addWorldMenu(div2, locale.boost, 'markBoost', false, IMG_islPointBoost);
						addWorldMenu(div2, locale.attack, 'markAttack', false, GLOBAL_release+'gfx/icons/skull_red_seaview_icon.png');
						addWorldMenu(div2, locale.nation, 'markNation', false, GLOBAL_release+'gfx/buildings_romans/island_building_1.png');
						addWorldMenu(div2, locale.radius, 'markRadius', false, IMG_radius);
					
					appendElement('div', div, {innerHTML:locale.show, className:'GM_seamapPlus_hover', lang:'showHide'}, 'font-weight:bold; margin-top:10px; text-align:center');
					var div2=appendElement('div', div, false, 'display:none');
					
						addWorldMenu(div2, locale.marked_players, 'showColored', true, IMG_islPointMark);
						addWorldMenu(div2, locale.friends, 'showFriends', true, IMG_islPointGilde);
						addWorldMenu(div2, locale.allys, 'showAlly', true, IMG_islPoint, 'RoyalBlue');
						addWorldMenu(div2, locale.enemys, 'showEnemy', true, IMG_islPoint, 'red');
						addWorldMenu(div2, locale.npcs, 'showNPC', true, IMG_islPoint, '#A4AFAD');
						addWorldMenu(div2, locale.romans, 'showRomans', true, GLOBAL_release+'gfx/buildings_romans/island_building_1.png');
						addWorldMenu(div2, locale.vikings, 'showVikings', true, GLOBAL_release+'gfx/buildings_vikings/island_building_1.png');
						addWorldMenu(div2, locale.aztecs, 'showAztecs', true, GLOBAL_release+'gfx/buildings_aztecs/island_building_1.png');
						addWorldMenu(div2, locale.highlevels, 'showLLF', true, IMG_islPointLLF);
						addWorldMenu(div2, locale.boost, 'showBoost', true, ((GLOBAL_Browser=='ff') ? IMG_islPointBoost : IMG_islPointBoost_c));
						addWorldMenu(div2, locale.moving, 'showMoving', true, IMG_islPointMove);
						addWorldMenu(div2, locale.standing, 'showStanding', true, IMG_islPoint, 'black');
						addWorldMenu(div2, locale.attack, 'showAttack', true, GLOBAL_release+'gfx/icons/skull_red_seaview_icon.png');
						addWorldMenu(div2, locale.others, 'showUnknown', true, IMG_islPoint, 'black');
						addWorldMenu(div2, locale.savedPos, 'showPositions', true,
							((SM_Server!='asgard' && SM_Server!='palatin' && SM_Server!='aventin' && SM_Server!='utgard') ? GLOBAL_release+'gfx/ui/guildboard_thread_sticky_icon.png' :''));
							// {'backgroundImage':'url("'+GLOBAL_release+'gfx/icons/guildboard_new_message_pinned_icon.png")', 'width':'18px', 'height':'12px', 'border':'0px solid white', 'backgroundColor':'transparent'});
						
						addWorldMenu(div2, locale.eigenePos, 'showMe', false, GLOBAL_release+'gfx/ui/crosshair.png');
						addWorldMenu(div2, locale.attackShips, 'showShips', false, IMG_islPointShip);
					
					appendElement('div', div, {innerHTML:locale.savedPosPlayer, className:'GM_seamapPlus_hover', lang:'showHidePos', title:locale.savedPosPlayer_t}, 'font-weight:bold; margin-top:10px; text-align:center');
						var div2=appendElement('div', div, {id:'GM_seamapPlus_wmPosBox'}, 'display:none; line-height:20px; margin-top:10px; padding-left:10px');
						
				
				//Zusatzbuttons einfuegen-->
					createBundle('toHome', div, {title:locale.jumpToHome, lang:'goToHome', className:'GM_seamapPlus_hover'}, 'position:absolute; left:-50px; top:10px;');
					appendElement('img', div, {title:locale.jumpToSight, lang:'goToSight', className:'GM_seamapPlus_hover', src:GLOBAL_release+'gfx/icons/inspect_icon_1.png'}, 'cursor:pointer; position:absolute; left:-90px; top:10px; width:'+BUNDLES['toDest'][1]);
					createBundle('toDest', div, {title:locale.jumpToDest, lang:'goToDest', className:'GM_seamapPlus_hover'}, 'position:absolute; left:-130px; top:10px;');
				//<--
				drawRadius();
				getEl("//div[@class='seaChartGuildMemberPanel']").snapshotItem(0).parentNode.appendChild(GLOBAL_wmIslandDiv);
				gid('menu_item_worldMap').removeEventListener('click', insertWmMenu, false);
				delete BUNDLES['toHome'];
				delete BUNDLES['toDest'];
				delete BUNDLES['loading'];
				insertWmMenu;
			},500);
		},
		addGrouper=function(id, hl, title, t, width) {
			var main_div= appendElement('div', gid('menu_item_worldMap').parentNode, {className:'GM_seamapPlus_box'}, 'position:absolute; top:50px; right:'+(112+t*26)+'px');
				main_div.addEventListener('mouseover', function() {this.firstChild.style.display=null; this.lastChild.style.display=null;}, false);
				main_div.addEventListener('mouseout', function() {this.firstChild.style.display='none'; this.lastChild.style.display='none';}, false);
				
				appendElement('div', main_div, {'innerHTML':hl+':'}, 'display:none; font-weight:bold; float:left');
				appendElement('div', main_div, {innerHTML:'+', className:'GM_seamapPlus_hover', title:title, lang:'c_addData'}, 'font-weight:bold; padding:2px; float:right');
			appendElement('table', main_div, {id:id, lang:t}, 'display:none; margin-top:30px; width:'+(width ? width : 200)+'px; text-align:right');
			
			autoFillBox(t);
		},
		getImageBundles=function(b) {
			appendElement('div', document.body, {id:'GM_seamap_moveVars_bundles', textContent:'notLoaded'}, 'display:none');
			var Content = "var xy, ausg='', e=document.getElementById('GM_seamap_moveVars_bundles');";
			for(var i in b)
				Content +="ausg +='\""+i+"\":[\"url(\\\''+___stdlib_fastcall____startupConfiguration___.clientAssetsBasePath+image_bundle['"+b[i]+"']['bundleName']+'\\\')\","
					+"\"'+image_bundle['"+b[i]+"']['width']+'px\","
					+"\"'+image_bundle['"+b[i]+"']['height']+'px\","
					+"\"'+(-image_bundle['"+b[i]+"']['x'])+'px '+(-image_bundle['"+b[i]+"']['y'])+'px\","
					+"\"'+(image_bundle['"+b[i]+"']['properties'] ? (image_bundle['"+b[i]+"']['width']/image_bundle['"+b[i]+"']['properties']['frames'])+'px' : '')+'\"],';";
			
			Content+="e.textContent='{'+ausg.slice(0,-1)+'}'; delete e; delete ausg;";
			document.body.removeChild(appendElement('script', document.body, {type:'application/javascript', textContent:Content}));
		},
		getShipData=function() {
			appendElement('div', document.body, {id:'GM_seamap_moveVars_ships', textContent:'notLoaded'}, 'display:none');
			var script= appendElement('script', document.body, {type:'application/javascript',
			textContent:('var temp={set:function(a,b) {this[a]=b}}, noData={getValue:function(){return 0;}}, ausg2="", e=document.getElementById("GM_seamap_moveVars_ships");'
				+'for(var i in ships){'
					+'if(ships[i].object.skills && ships[i].object.skills.alive){'
						+'ships[i].object.skills.alive(temp, noData, noData);'
						+'ausg2 += \'"\'+i+\'":["\'+ships[i].title+\'",\'+temp.speed+"],";}'
				+'} e.textContent = "{"+ausg2.slice(0,-1)+"}";'
				+'delete temp; delete noData;delete e;delete ausg2;')});
			
			document.body.removeChild(script);
		};
			
	if(!(temp1=window.location.href.match(/http:\/\/(.+).escaria.com\/world\/client.*/)))
		return;
	SM_Server=temp1[1];
	
	if(navigator.userAgent.toLowerCase().indexOf('chrome')!=-1 || navigator.userAgent.toLowerCase().indexOf('opera')!=-1) {
		GM_getValue=function (key,def) {
			var out= localStorage[key] || def;
			if(out=='false')
				out=false;
			else if(out=='true')
				out=true;
			return out;
		};
		GM_setValue=function (key,value) {
			return localStorage[key]=value;
		};
		GM_deleteValue=function (key) {
			return delete localStorage[key];
		};
		GM_getResourceURL=function (key) {
			return 'http://gm.quina.at/escaria/seamapPlus/colortable.jpg';
		};
		if(navigator.userAgent.toLowerCase().indexOf('opera')>-1) {
			GM_addStyle=function(s) {
				appendElement('style', document.getElementsByTagName('head')[0], {type:'text/css', textContent:s});
			};
			GLOBAL_Browser='opera';
		}
		else
			GLOBAL_Browser='chrome';
	}
	else
		GLOBAL_Browser='ff';

	move= appendElement('div', document.body, {id:'GM_seamap_moveVars'}, 'display:none'),
		script=appendElement('script', document.body, {type:'application/javascript', textContent:'document.getElementById("GM_seamap_moveVars").textContent=___stdlib_fastcall____startupConfiguration___["clientAssetsBasePath"];'});
	GLOBAL_release=gid('GM_seamap_moveVars').textContent;
	document.body.removeChild(script);

	script=appendElement('script', document.body, {type:'application/javascript', textContent:'document.getElementById("GM_seamap_moveVars").textContent=___stdlib_fastcall____startupConfiguration___["worldSeaChartDimensionInformationString"];'});
	ConfData=gid('GM_seamap_moveVars').textContent;
	document.body.removeChild(script);

	script=appendElement('script', document.body, {type:'application/javascript', textContent:'document.getElementById("GM_seamap_moveVars").textContent=___stdlib_fastcall____startupConfiguration___["worldUsername"];'});
	GLOBAL_MyUsername=gid('GM_seamap_moveVars').textContent;
	document.body.removeChild(script);
	document.body.removeChild(move);
	
	SM=new Object;
	SM.isEnglish=GM_getValue('isEnglish_'+SM_Server, (navigator.language != "de"));
	
	SM.showNPC=GM_getValue('showNPC_'+SM_Server, true);
	SM.showRomans=GM_getValue('showRomans_'+SM_Server, true);
	SM.showVikings=GM_getValue('showVikings_'+SM_Server, true);
	SM.showAztecs=GM_getValue('showAztecs_'+SM_Server, true);
	SM.showFriends=GM_getValue('showFriends_'+SM_Server, true);
	SM.showAlly=GM_getValue('showAlly_'+SM_Server, true);
	SM.showEnemy=GM_getValue('showEnemy_'+SM_Server, true);
	SM.showColored=GM_getValue('showColored_'+SM_Server, true);
	SM.showBoost=GM_getValue('showBoost_'+SM_Server, true);
	SM.showMoving=GM_getValue('showMoving_'+SM_Server, true);
	SM.showStanding=GM_getValue('showStanding_'+SM_Server, true);
	SM.showAttack=GM_getValue('showAttack_'+SM_Server, true);
	SM.showLLF=GM_getValue('showLLF_'+SM_Server, true);
	SM.showUnknown=GM_getValue('showUnknown_'+SM_Server, false);
	SM.showMe=true;
	SM.showShips=GM_getValue('showShips_'+SM_Server, true);
	SM.markRadius=GM_getValue('markRadius_'+SM_Server, true);
	SM.showPositions=GM_getValue('showPositions_'+SM_Server, true);

	SM.markLLF=GM_getValue('markLLF_'+SM_Server, true);
	SM.markAttack=GM_getValue('markAttack_'+SM_Server, true);
	SM.markBoost=GM_getValue('markBoost_'+SM_Server, true);
	SM.markNation=GM_getValue('markNation_'+SM_Server, true);
	SM.colorGilden=true;
	SM.colorPlayer=true;

	SM.seaColorGilden=true;
	SM.seaColorPlayer=true;
	SM.seaShowUnknown=true;
	SM.seaShowAlly=true;
	SM.seaShowFriends=true;
	SM.seaShowEnemy=true;
	SM.seaShowLLF=true;
	SM.seashowNPC=true;
	SM.seaShowRomans=true;
	SM.seaShowVikings=true;
	SM.seaShowAztecs=true;
	SM.seaShowStanding=true;
	SM.seaShowMoving=true;
	 //SM.seaMarkMoving -> erst nach Seitenload definiert
	 
	SM.controlMap=GM_getValue('controlMap_'+SM_Server, false);
	SM.showDistance=GM_getValue('showDistance_'+SM_Server, true);

	SM.cacheMax=GM_getValue('cacheMax_'+SM_Server, 500);
	SM.saveFriend=GM_getValue('saveFriend_'+SM_Server, true);
	SM.saveAlly=GM_getValue('saveAlly_'+SM_Server, false);
	SM.saveEnemy=GM_getValue('saveEnemy_'+SM_Server, false);
	SM.saveMarked=GM_getValue('saveMarked_'+SM_Server, true);

	SM.checkDanger=GM_getValue('checkDanger_'+SM_Server, true);
	SM.dangerAttack=GM_getValue('dangerAttack_'+SM_Server, true);
	SM.dangerMarked=GM_getValue('dangerMarked_'+SM_Server, true);
	SM.dangerDir=GM_getValue('dangerDir_'+SM_Server, true);
	SM.dangerLLF=GM_getValue('dangerLLF_'+SM_Server, true);
	SM.dangerEnemy=GM_getValue('dangerEnemy_'+SM_Server, true);
	SM.dangerDistance=GM_getValue('dangerDistance_'+SM_Server, 2500);

	SM.highlevel=GM_getValue('highlevel_'+SM_Server, 100);

	SM.klickWmElements=GM_getValue('klickWmElements_'+SM_Server, false);

	SM.player_marks=new Object;
	SM.marks=new Object;
	SM.dangerMarker=new Object;
	SM.dangerHarmless=new Object;
	
	locale = new Object;
	if(!SM.isEnglish)
		locale={del:'l'+unescape("%F6")+'schen',
			edit:'bearbeiten',
			dangerMark:'als gef'+unescape("%E4")+'hrlich markiert',
			guild:'Gilde',
			player:'Spieler',
			color:'Farbe',
			distance:'Distanz',
			reload:'Aktualisieren',
			displayArea:'Anzeigebereich',
			displayArea_long:'momentan dargestellte Inseln',
			dangerous:'Gef&auml;hrlich',
			dangerous_long:'gef'+unescape("%E4")+'hrliche Inseln',
			chache_long:'alle Inseln aus dem Cache',
			trooptime:'Truppen-Reise-Tabelle',
			general:'Allgemein',
			island:'Insel',
			islands:'Inseln',
			search:'Suche',
			save:'Speichern',
			saved:'Gespeichert!',
			saved_pageStart:'Gespeichert.\n'+unescape("%C4")+'nderung wird mit dem n'+unescape("%E4")+'chsten Seitenstart '+unescape("%FC")+'bernommen.',
			show:'einzeichnen',
			hide:'ausblenden',
			hidden:'ausgeblendet',
			restore:'wiederherstellen',
			highlight:'hervorheben:',
			activate:'Aktivieren',
			gildenlos:'gildenlos',
			lang:'Sprache',
			cancel:'Abbrechen',
			found:'gefunden!',
			notFound:'nichts gefunden...',
			reachedLimit:'max-Limit erreicht!',
			searchFor:'Suche nach',
			
			otherVersion:'Ein anderes seamapPlus-Script wurde entdeckt!\n\nBitte deinstalliere dieses, um Fehlfunktionen zu vermeinden.',
			guildNameNoBrackets:'Gildenname - ohne eckige Klammern!',
			describeEarlyWarning:'Meldung vom Fr'+unescape("%FC")+'hwarnsystem, sollte dieser Spieler/Gilde in der Umgebung der eigenen Insel entdeckt werden.',
			newMarker_noData:'Das Namen-Textfeld ist leer...',
			newMarker_errorGuild:'Das Gildenk'+unescape("%FC")+'rzel ist ung'+unescape("%FC")+'ltig',
			newMarker_errorColor:'Bitte gib eine g'+unescape("%FC")+'ltige Farbe an',
			newMarker_exists:'Existiert bereits.\n'+unescape("%DC")+'berschreiben?',
			delCache_desc:'Insel-Typen die <u>nicht</u> gel&ouml;scht werden sollen:',
			delCache_feedback:' Inseln wurden aus dem Cache entfernt!',
			delCache_help:'Diese Funktion leert das tempor&auml;re Speicherobject von seamapPlus.<br>Alle Inseldaten, welche in dieser Session gespeichert wurden, werden gel&ouml;scht und nicht mehr auf der Weltkarte dargestellt.<br><br>Diese Funktion l&ouml;scht keine bleibenden Daten.<br>Ein Neuladen der Seite h&auml;tte denselben Effekt.',
			delCache_button:'Cache leeren',
			listIslandsButton:'Inseln auflisten',
			listIslands_nA:'Der Spieler befindet sich nicht im Anzeigebereich. M'+unescape("%F6")+'glicherweise sind die dargestellten Informationen veraltet oder unvollst'+unescape("%E4")+'ndig!',
			list_Islands_much:'Der Insel-Cache umfasst [x0] Inseln.\nEine Auflistung erfordert etwas Rechenzeit.\n\nFortfahren?',
			list_Islands_notFound:'Dieser User befindet sich nicht in der Inselliste...',
			earlyWarningTitle:'Gefahr! Das Fr'+unescape("%FC")+'hwarnsystem hat gef'+unescape("%E4")+'hrliche Inseln im Kontrollradius entdeckt.',
			deleteGuildMark:'Gildenmarkierung l'+unescape("%F6")+'schen',
			deletePlayerMark:'Spielermarkierung l'+unescape("%F6")+'schen!',
			markMoving_noPa:'Achtung!\nSolange die Richtungs-Pfeile nicht aktiviert sind, kann diese Funktion keine Richtungen erkennen!',
			savePos:'Wie soll diese Position benannt werden?',
			activate_clickOptions:'Insel-Click-Option aktiveren (Inseln werden anklickbar um diese aus dem Cache l'+unescape("%F6")+'schen zu k'+unescape("%F6")+'nnen)',
			activate_wm:'erweiterte Weltkarte ein-/ausblenden',
			savedPosPlayer:'Positionen/Spieler*:',
			savedPosPlayer_t:'*Es werden nur die gespeicherten Spieler aufgelistet, welche sich im Cache von seamapPlus befinden',
			jumpToHome:'Zur eigenen Insel springen',
			jumpToSight:'Zum Sichtbereich springen',
			jumpToDest:'Zum Zielort springen',
			descWmButton:'Diesen Ort laden (l'+unescape("%E4")+'sst die Weltkarte g'+unescape("%F6")+'effnet',
			WMexploration_desc:'Erkundungsdauer zu diesem Ort',
			positions_head:'Positionen',
			positions_t:'Position speichern',
			playerMarks_head:'Spieler',
			playerMarks_t:'Spieler-Favorit hinzuf'+unescape("%FC")+'gen',
			guildMarks_head:'Gilden',
			guildMarks_t:'Gilden-Markierung hinzuf'+unescape("%FC")+'gen',
			removeFromCache:'Diese Insel aus dem Cache entfernen',
			searchThisIsland:'diese Insel suchen (benutzt Escaria-Such-Engine)',
			searchFor_t:'Berichte dieses Spielers suchen',
			toLog:'Bericht anzeigen',
			
			options:'Einstellungen',
			delCache_fuName:'Cache leeren',
			delCache_fuName_t:'L'+unescape("%F6")+'scht den bisher gespeicherten Inselcache und entleert die Weltkarte.',
			mapCheck:'wiederholter Kartencheck',
			mapCheck_t:'Kontrolliert die Seekarte in regelm'+unescape("%E4")+unescape("%DF")+'igen Abst'+unescape("%E4")+'nden nach Status'+unescape("%E4")+'nderungen (kostet zus'+unescape("%E4")+'tzliche Performance)',
			displayDistance:'Distanzzeiger einblenden',
			displayDistance_t:'Blendet Richtung und Distanz zur eigenen Insel auf der Seekarte ein (kostet zus'+unescape("%E4")+'tzliche Performance)',
			displayHighlevels_t:'Gibt an, ab wann Inseln, welche sich nicht in der N'+unescape("%E4")+'he einer HS befinden, als Highlevel markiert werden sollen.',
			update_rate:'Aktualisierungsrate:&nbsp;',
			update_rate_t:'Gibt die H'+unescape("%E4")+'ufigkeit an, mit der das Script ausgef'+unescape("%FC")+'hrt wird. Eine geringe Zahl erh'+unescape("%F6")+'ht die Reaktionsgeschwindigkeit des Scripts, kann aber die Performance negativ beeinflussen (Angabe in Millisekunden).',
			cache_max:'Insel-Cache begrenzen:&nbsp;',
			cache_max_t:'Gibt an, wieviele Inseln in einer Browsersession maximal in den Inselcache aufgenommen werden d'+unescape("%FC")+'rfen (0=unendlich).',
			cache_max_desc:'0=unendlich; Aktueller Speicher: ',
			stayCache:'Im Cache behalten:',
			stayCache_t:'Gibt an, welche Inseln trotz '+unescape("%FC")+'berf'+unescape("%FC")+'lltem Cache nicht entfernt werden. Beachte: Diese Inseln werden bei jedem Leeren '+unescape("%FC")+'bersprungen. Das kostet zus'+unescape("%E4")+'tzliche Performance!',
			earlyWarning_options:'Fr&uuml;hwarnsystem:',
			earlyWarning_options_t:'Mitteilung bei gef'+unescape("%E4")+'hrlichen Inseln im Anzeigebereich',
			earlyWarning_activate_t:'Fr'+unescape("%FC")+'hwarmsystem ein-/ausschalten',
			earlyWarning_marked:'als gef&auml;hrlich markierte Inseln',
			earlyWarning_marked_t:'warnt vor Inseln , welche du als gef'+unescape("%E4")+'hrlich markiert hast (Gilden- oder Spieler-Markierungen)',
			earlyWarning_moving:'auf eigene Insel zubewegende Inseln',
			earlyWarning_moving_t:'warnt vor Inseln, welche sich in Richtung der Eigenen bewegen',
			earlyWarning_highlevels_t:'warnt vor Highlevel-Spielern',
			earlyWarning_attack_t:'warnt vor Inseln mit Totenkopf oder orangenem/rotem Ruf',
			earlyWarning_distance:'Maximal-Entfernung:&nbsp;',
			earlyWarning_distance_t:'Inseln werden nur innerhalb des angegebenen Radius zur eigenen Insel als gef'+unescape("%E4")+'hrlich eingestuft.',
			seamapShow:'Anzeige-Optionen f&uuml;r Seekarte:',
			seamapShow_t:'bestimmte Insel auf der Seekarte ausblenden',
			show_markedGuild_t:'Blendet die farbliche Hervorhebung auf der Seekarte von markierten Gilden ein/aus.',
			show_markedGPlayers_t:'Blendet die farbliche Hervorhebung auf der Seekarte von markierten Spielern ein/aus.',
			show_higlevels_t:'Hebt Higlevels in Lowlevelgebieten hervor.',
			movingStatus:'Bewegungsstatus (PA-Funktion)',
			movingStatus_t:'Verdeutlicht den Bewegungsstatus von Inseln auf der Seekarte (nur bei Premium Accounts funktionst'+unescape("%FC")+'chtig)',
			show_others_t:'Blendet alle unwichtigen Spieler auf der Seekarte ein/aus.',
			
			feedbackthread_url:'http://forum.escaria.com/index.php?page=Thread&threadID=6619',
			feedbackthread_t:'Ruft den Foren-Thread von seamapPlus in einem neuen Fenster auf.',
			feedbackthread_value:'Feedback-Thread &ouml;ffnen',
			
			marked_guilds:'markierte Gilden',
			marked_players:'markierte Spieler',
			friends:'Gildenmitglieder',
			allys:'Verb'+unescape("%FC")+'ndete',
			enemys:'Feinde',
			npcs:'NPC (HF, Kraken, ...)',
			romans:'R'+unescape("%F6")+'mer',
			vikings:'Wikinger',
			aztecs:'Azteken',
			highlevels:'Highlevels',
			boost:'Inseln mit Boost',
			moving:'bewegende Inseln',
			standing:'stehende Inseln',
			attack:'Angreifer-Inseln',
			nation:'V&ouml;lker',
			others:'Sonstige Spieler',
			radius:'Insel-Radius',
			savedPos:'gespeicherte Positionen',
			eigenePos:'eigene Position',
			attackShips:'feindliche Schiffe'
		};
	else
		locale={del:'delete',
			edit:'edit',
			dangerMark:'marked as dangerous',
			guild:'Guild',
			player:'Player',
			color:'color',
			distance:'Distance',
			reload:'Reload',
			displayArea:'displayed Area',
			displayArea_long:'currently displayed Islands',
			dangerous:'Dangerous',
			dangerous_long:'Dangerous Islands',
			chache_long:'all islands from the cache',
			trooptime:'Units traveling-time',
			general:'General',
			island:'island',
			islands:'islands',
			search:'Search',
			save:'Save',
			saved:'Saved!',
			saved_pageStart:'Saved!\nChanges will take effect when page loads next',
			show:'show',
			hide:'hide',
			hidden:'hidden',
			restore:'restore',
			highlight:'highlight:',
			activate:'Activate',
			gildenlos:'guildless',
			lang:'Language',
			cancel:'cancel',
			found:'found something!',
			notFound:'found nothing...',
			reachedLimit:'reached max-Limit!',
			searchFor:'Searching for',
			
			
			otherVersion:'Another seamapPlus-Script was detected!\n\nPlease uninstall the other Script to prevent misfunctions.',
			guildNameNoBrackets:'Guildname - without brackets!',
			describeEarlyWarning:'Early-warning-system alerts if this player/guild is sighted in display area.',
			newMarker_noData:'no name is given',
			newMarker_errorGuild:'invalid guild-tag',
			newMarker_errorColor:'invalid color',
			newMarker_exists:'Allready exists. Overwrite?',
			delCache_desc:'Island-types, which should <b>not</b> be removed:',
			delCache_feedback:' islands have been removed',
			delCache_help:'This function clears the temporary memory of seamapPlus.<br>All island-data which were stored in this session, will be removed and will not be displayed on the worldmap anymore.<br><br>This function does not delete any remaining data.<br>Reloading the page would have the same effect.',
			delCache_button:'clear cache',
			listIslandsButton:'list islands',
			listIslands_nA:'This player is not located in the displayed area. The given informations could be outdated or incomplete!',
			list_Islands_much:'The island-cache contains [x0] islands.\nA listing requires some computing-time\n\nContinue?',
			list_Islands_notFound:'Not found in current List...',
			earlyWarningTitle:'Danger! The early-warning-system has detected dangerous islands in your controll-radius',
			deleteGuildMark:'delete guild-marker',
			deletePlayerMark:'delete player-marker',
			markMoving_noPa:'Attention!\nAs long as the movement-indicators are disabled, seamapPA is not able to detect island-movements!',
			savePos:'Give a name for this position',
			activate_clickOptions:'islands become clickable in order to delete them from Cache',
			activate_wm:'show/hide advanced worldmap',
			savedPosPlayer:'saved positions/players*:',
			savedPosPlayer_t:'*Only player which are stored in the Cache of seamapPlus are listed',
			jumpToHome:'Scroll to own island',
			jumpToSight:'Scroll to displayed area',
			jumpToDest:'Scroll to Destination',
			descWmButton:'Load this place (does not close worldmap)',
			WMexploration_desc:'Exploration-duration to this place',
			positions_head:'Positions',
			positions_t:'save position',
			playerMarks_head:'Player',
			playerMarks_t:'add player to favorits',
			guildMarks_head:'Guilds',
			guildMarks_t:'add guild-mark',
			removeFromCache:'remove this island from cache ',
			searchThisIsland:'search this island (uses Escaria-searching-engine)',
			searchFor_t:'search for logs from this player',
			toLog:'show log',
			
			options:'Options',
			delCache_fuName:'Clear cache',
			delCache_fuName_t:'deletes all (or some) of the saved islands and clears the worldmap.',
			mapCheck:'periodic map-check',
			mapCheck_t:'Checks the seamap in periodic intervals for changes (needs more performance).',
			displayDistance:'Show distance-pointer',
			displayDistance_t:'Shows direction and distance to your island on the seamap (needs more performance).',
			displayHighlevels_t:'Specifies at what level islands, which are not located near a trade station, should be highlighted.',
			update_rate:'Update-rate:&nbsp;',
			update_rate_t:'Spezifies the frequenzy with which th script should run. A small number increases the reaction speed of the script, but can negatively affect the performance (in milliseconds).',
			cache_max:'Limit island-cache:&nbsp;',
			cache_max_t:'Spezifies, how many islands shall be stored at most into the cache (0 = infinite).',
			cache_max_desc:'0=infinite; currently stored: ',
			stayCache:'Always stay in cache:',
			stayCache_t:'Spezifies, which islands should not be removed in spite of a crowded cache. Node: These islands are skipped during each void. That needs extra performance!',
			earlyWarning_options:'Early-warning-system:',
			earlyWarning_options_t:'Warning if dangerous islands are detected near your position.',
			earlyWarning_marked:'Marked as dangerous',
			earlyWarning_marked_t:'Islands, which you have marked as dangerous (guild- or player-marks)',
			earlyWarning_moving:'Moving to your Island',
			earlyWarning_moving_t:'warns, if an island is moving towards your island',
			earlyWarning_highlevels_t:'warns, if a highlevel-player is near your position',
			earlyWarning_attack_t:'warns if an island with skull or orange/red reputation is near your position.',
			earlyWarning_distance:'Controll-radius:&nbsp;',
			earlyWarning_distance_t:'Only within that radius, islands are classified as dangerous.',
			seamapShow:'Display-options for seamap:',
			seamapShow_t:'Hide specific islands.',
			show_markedGuild_t:'Toggles the highlighting of marked guilds on/off.',
			show_markedGPlayers_t:'toggles the highlighting of marked players on/off.',
			show_higlevels_t:'Highlights highlevel-players.',
			movingStatus:'Moving-state (PA-option)',
			movingStatus_t:'Illustrates the movement-status of islands on the sea map (works only for premium accounts).',
			show_others_t:'Hides all unimportant islands on the seamap.',
			
			feedbackthread_value:'Open feedback-thread',
			feedbackthread_url:'http://forum.escaria.com/index.php?page=Thread&threadID=6947',
			feedbackthread_t:'Opens the feedback-thread of seamapPlus in a new window.',
			
			marked_guilds:'Marked guilds',
			marked_players:'Marked players',
			friends:'Guildmembers',
			allys:'Allys',
			enemys:'Enemys',
			npcs:'NPC (M-Navy, Kraken, ...)',
			romans:'Romans',
			vikings:'Vikings',
			aztecs:'Aztecs',
			highlevels:'Highlevels',
			boost:'Boosted islands',
			moving:'Moving islands',
			standing:'Standing islands',
			attack:'Warring islands',
			nation:'Nations',
			others:'Other players',
			radius:'Island-radius',
			savedPos:'Saved positions',
			eigenePos:'Own position',
			attackShips:'Enemy ships'
		};

	if(SM_Server=='hel') {
		locale.regExpRingmenu=/of (\[[^\]]+\])*(.+)$/;
		locale.PAcheckString='Island directions on/off';
	}
	else {
		locale.regExpRingmenu=/von (\[[^\]]+\])*(.+) /;
		locale.PAcheckString='Inselrichtungen ein/aus';
	}
	if(!(temp1=GM_getValue('savedPos_'+SM_Server, false)) || !(temp2=GM_getValue('savedNames_'+SM_Server, false))) {
		SM.savedPos=new Array();
		SM.savedNames=new Array();
	}else {
		SM.savedPos=temp1.split("\n");
		SM.savedNames=temp2.split("\n");
	}
	if((temp1=GM_getValue('player_marks_'+SM_Server, false)) && (temp2=GM_getValue('player_colors_'+SM_Server, false))) {
		var t1=temp1.split("\n"), t2=temp2.split("\n");
		
		for(var i in t1) {
			if(t1[i].slice(0,1)=="\t") {
				var n=t1[i].slice(1);
				SM.dangerMarker[n]=true;
			}
			else {
				var n=t1[i];
				SM.dangerHarmless[n]=true;
			}
			SM.player_marks[n]=t2[i];
		}
	}
	if((temp1=GM_getValue('marks_'+SM_Server, false)) && (temp2=GM_getValue('colors_'+SM_Server, false))) {
		var t1=temp1.split("\n"), t2=temp2.split("\n");
		
		for(var i in t1) {
			if(t1[i].slice(0,1)=="\t") {
				var n=t1[i].slice(1);
				SM.dangerMarker[n]=true;
			}
			else {
				var n=t1[i];
				SM.dangerHarmless[n]=true;
			}
			SM.marks[n]=t2[i];
		}
	}

	Islands=new Object;
	Danger=new Object;
	GLOBAL_Ships=new Array;

	GLOBAL_Ships_speed_data=new Object;

	GLOBAL_distance_dir=0;
	GLOBAL_HS=false;
	GLOBAL_countDanger=0;
	GLOBAL_lastCheck=0;
	GLOBAL_Levelbereich=100;
	GLOBAL_checkAgain=false;
	GLOBAL_forHS=new Array;
	GLOBAL_noCheck=false;
	GLOBAL_islandCount=0;
	GLOBAL_PA=false; //nach Seitenload definiert

	GLOBAL_wmIslandDiv=document.createElement('div');
	GLOBAL_wmIslandDiv.id='GM_seamapPlus_wmIslandDiv';

	BUNDLES=new Object;

	GLOBAL_MyId=false

	 //Map-Pos-Data-->
	ConfData_ar=ConfData.split(',');

	ProzentX= 100 / (ConfData_ar[2]/Math.abs(ConfData_ar[0]));
	ProzentY= 100 / (ConfData_ar[3]/Math.abs(ConfData_ar[1]));

	GLOBAL_MiddleX= (ConfData_ar[4]/100)*ProzentX;
	GLOBAL_MiddleY= (ConfData_ar[5]/100)*ProzentY;

	GLOBAL_StepX= GLOBAL_MiddleX/Math.abs(ConfData_ar[0]);
	GLOBAL_StepY= GLOBAL_MiddleY/Math.abs(ConfData_ar[1]);
	 //<--

	GM_addStyle('.GM_seamapPlus_circle{-moz-border-radius:50%; -moz-outline-radius:50%; -webkit-border-radius:50%; border-radius:50%;}'
		+'img.GM_seamapPlus_circle:hover{background-color:black; margin:1px; cursor:pointer;}'
		+'.GM_seamapPlus_hover2:hover{background-color:black; margin:1px -1px -1px 1px; cursor:pointer; -moz-border-radius:50%; -webkit-border-radius:50%; border-radius:50%;}'
		+'.GM_seamapPlus_box{background-color:#61491B; border:1px outset #EEC04B; color:white; padding:2px; font-size:13px; -moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px;}'
		+'.GM_seamapPlus_box .GM_seamapPlus_box{border:2px ridge #EEC04B;}'
		+'.GM_seamapPlus_box label{margin:0 2px; font-size:12px; display:block;}'
		+'.GM_seamapPlus_box li{margin:5px;}'
		+'.GM_seamapPlus_box input[type="text"], .GM_seamapPlus_box input[type="button"]{border-width:1px; border-color:#EEC04B; background-color:#46300D; color:white; font-size:12px; width:100px; margin:2px; padding:0 2px; -moz-border-radius:5px; -webkit-border-radius:5px;}'
		+'.GM_seamapPlus_hover{color:white;}'
		+'.GM_seamapPlus_hover:hover{cursor:pointer; color:#EEC04B;}'
		+'.GM_seamapPlus_markIsland{background-color:#a9c7dd; border:2px solid white; margin:-2px;-moz-border-radius:20px; -webkit-border-radius:20px; border-radius:20px;}'
		+'.GM_seamapPlus_llf{background-color:#d00; color:white !important; padding:0 1px 1px 0}'
		+'ul ul li {list-style-type:none;}');
		
	delete init;
	
	var waitingId=setInterval(function() {
		var els=getEl("//a[contains(@class, 'islandIcon')]");
		if(els.snapshotLength) {
			//Eigene Daten
			if(!GLOBAL_MyId) {
				var i=els.snapshotLength, el, user, sizeEl, pos;
				while(i--) {
					el=els.snapshotItem(i);
					user=toChild(el,5).innerHTML;
					
					if(user==GLOBAL_MyUsername) {
						sizeEl=el.firstChild.lastChild;
						while(sizeEl.className.slice(-12)!='islandsImage')
							sizeEl=sizeEl.previousSibling;
						
						pos=gpos(el, gMainpos(), sizeEl);
						GLOBAL_MyGilde=toChild(el,3).lastChild.firstChild.innerHTML.slice(1,-1);
						GLOBAL_MyX=pos[0];
						GLOBAL_MyY=pos[1];
						GLOBAL_MyId=setElId(el);
						break;
					}
				}
				if(!GLOBAL_MyId)
					return;
			}
			
			
			if(!gid('GM_seamap_moveVars_bundles')) {
				getShipData();
				getImageBundles({friend:"gfx/seamap/friend_indicator_0.png",
					friend_zoom:"gfx/seamap/friend_indicator_1.png",
					ally:"gfx/seamap/ally_indicator_0.png",
					ally_zoom:"gfx/seamap/ally_indicator_1.png",
					enemy:"gfx/seamap/ally_indicator_0.png",
					enemy_zoom:"gfx/seamap/ally_indicator_1.png",
					romans:"gfx/buildings_romans/island_building_0.png",
					romans_zoom:"gfx/buildings_romans/island_building_1.png",
					vikings:"gfx/buildings_vikings/island_building_0.png",
					vikings_zoom:"gfx/buildings_vikings/island_building_1.png",
					aztecs:"gfx/buildings_aztecs/island_building_0.png",
					aztecs_zoom:"gfx/buildings_aztecs/island_building_1.png",
					villains_zoom:"gfx/buildings_villains/island_building_1.png",
					arrow0:"gfx/ui/seaview_arrow_small_0.png",
					arrow1:"gfx/ui/seaview_arrow_small_1.png",
					arrow2:"gfx/ui/seaview_arrow_small_2.png",
					arrow3:"gfx/ui/seaview_arrow_small_3.png",
					arrow4:"gfx/ui/seaview_arrow_small_4.png",
					arrow5:"gfx/ui/seaview_arrow_small_5.png",
					arrow6:"gfx/ui/seaview_arrow_small_6.png",
					arrow7:"gfx/ui/seaview_arrow_small_7.png",
					hand_ne:"gfx/ui/hand_static_ne.png",
					hand_se:"gfx/ui/hand_static_se.png",
					hand_sw:"gfx/ui/hand_static_sw.png",
					hand_nw:"gfx/ui/hand_static_nw.png",
					close:"gfx/ui/info_window_close.png",
					del:"gfx/icons/guildboard_delete_post.png",
					edit:"gfx/icons/guildboard_edit_post.png",
					loading:"gfx/icons/timer_resource_icon.png",
					wmButton:"gfx/icons/enemy_sighting_normal_icon_1.png",
					redSkull:"gfx/icons/skull_red_seaview_icon.png",
					Skull:"gfx/icons/skull_seaview_icon.png",
					toHome:"gfx/icons/home_icon_small_0.png",
					toDest:"gfx/icons/move_island_icon_small_0.png",
					listIslands:"gfx/icons/content_icon_small.png",
					reload:"gfx/ui/reload.png",
					search:"gfx/icons/goto_icon_0.png",
					search_mini:"gfx/icons/spy_mini_icon_0.png",
					listSight:"gfx/icons/zoom_icon_small_1.png",
					listDanger:"gfx/icons/war_defense_info_icon_0.png",
					listException:"gfx/icons/npc_icon_1.png",
					unknown:"gfx/buildings_villains/island_building_0.png",
					kraken:"gfx/animations_npc/kraken_npc_arise_0.png",
					hf:"gfx/animations_npc/trade_fleet_moving_normal_0.png",
					troops:"gfx/icons/sea_units_group_icon_small_0.png",
					jumpTo:"gfx/icons/arrow.png"
				});
			}
			if(gid('GM_seamap_moveVars_bundles').textContent=='notLoaded' || gid('GM_seamap_moveVars_ships').textContent=='notLoaded')
				return;
			BUNDLES=JSON.parse(gid('GM_seamap_moveVars_bundles').textContent);
			GLOBAL_Ships_speed_data=JSON.parse(gid('GM_seamap_moveVars_ships').textContent);
			document.body.removeChild(gid('GM_seamap_moveVars_bundles'));
			document.body.removeChild(gid('GM_seamap_moveVars_ships'));
			
			clearInterval(waitingId);
			
			if(gid('GM_seamapPlus_update')) {
				alert(locale.otherVersion);
				return;
			}
			appendElement('script', document.body, {type:'text/javascript', id:'GM_seamapPlus_update', src:'http://gm.quina.at/check.php?script=seamapPlus&version='+SM_Version+'&'+Math.random()});
			
			
			
			GLOBAL_PA=(gid('seaMapOptionMenu').lastChild.title=='Inselrichtungen ein/aus') ? true : false;
			SM.seaMarkMoving=(GLOBAL_PA && gid('seaMapOptionMenu').lastChild.firstChild.style.display=='block') ? GM_getValue('seaMarkMoving_'+SM_Server, true) : false;
			
			addGrouper('GM_seamapPlus_positionBox', locale.positions_head, locale.positions_t, 1);
			addGrouper('GM_seamapPlus_playerFavs', locale.playerMarks_head, locale.playerMarks_t, 2);
			addGrouper('GM_seamapPlus_guildMarkerBox', locale.guildMarks_head, locale.guildMarks_t, 3, 130);
			createBundle('listIslands', gid('menu_item_worldMap').parentNode, {lang:'c_listIslands', className:'GM_seamapPlus_hover', title:locale.listIslandsButton}, 'position:absolute; top:50px; right:226px;');
			
			var main_div=appendElement('div', gid('menu_item_worldMap').parentNode, {className:'GM_seamapPlus_box'}, 'position:absolute; top:50px; right:5px');
				var div=appendElement('div', main_div, {innerHTML:locale.options, lang:'c_0', className:'GM_seamapPlus_hover'}, 'font-weight:bold; padding:2px; float:right; width:118px; text-align:right');
				
			gid('seamap').addEventListener('mousedown', mouseDownSeamap, false);
			gid('seamap').addEventListener('mouseup', clickSeamap, false);
			
			gid('menu_item_worldMap').addEventListener('click', insertWmMenu, false);
			gid('menu_item_worldMap').addEventListener('click', pushFriendsToWm, false);
			
			div=createBundle('hand_ne', gid('seamap'), {id:'GM_seamapPlus_distance', lang:'c_goHome', title:'Distanzzeiger'}, 'display:none; position:absolute; z-index:1000; cursor:pointer')
				appendElement('div', div, {className:'GM_seamapPlus_box', title:'Entfernung zur eigenen Insel', lang:'parent'}, 'position:absolute; width:60px; color:white; font-weight:bold; font-size:12px; text-align:center');
			
			
			/**Quelltext-Korrektur - doppelte IDs, schaemts euch! ->*/
				e=getEl("//div[@id='menu_item_trade']");
				if((el=e.snapshotItem(0)).className=='buttonMenuItem' || (el=e.snapshotItem(1)).className=='buttonMenuItem')
					el.id='menu_item_trade_log';
			/**<-Ende*/
				
			var buttonFu=function(a) {
				var e= (GLOBAL_Browser=='ff') ? a['target'] : a['srcElement'];
				
				if(e.type=='button') {
					if(e.previousSibling.value.search(/^\w+$/) != -1)
						searchLog(e.previousSibling.value, e.parentNode.nextSibling.lastChild, gid(e.parentNode.nextSibling.id.slice(0, -6)));
				}
				else if(e.value==' Username')
					e.value='';
			}
			
			
			main_div=appendElement('div', false, {className:'GM_seamapPlus_box'}, 'width:190px; text-align:center; margin-top:20px');
				appendElement('input', main_div, {type:'text', value:' Username'});
				appendElement('input', main_div, {type:'button', value:locale.search}, 'width:60px');
			
			var e=gid('logbook').firstChild.lastChild.firstChild;
			
			var e2=e.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.lastChild;
			e2.id='menu_item_private_messages_table';
			div=main_div.cloneNode(true);
			div.addEventListener('click', buttonFu, false);
			e2.parentNode.insertBefore(div, e2.parentNode.lastChild);
			
			e2=e.lastChild.previousSibling.previousSibling.previousSibling.lastChild;
			e2.id='menu_item_trade_log_table';
			div=main_div.cloneNode(true);
			div.addEventListener('click', buttonFu, false);
			e2.parentNode.insertBefore(div, e2.parentNode.lastChild);
			
			e2=e.firstChild.nextSibling.nextSibling.nextSibling.lastChild;
			e2.id='menu_item_combat_table';
			main_div.addEventListener('click', buttonFu, false);
			e2.parentNode.insertBefore(main_div, e2.parentNode.lastChild);
			
			
			setInterval(checkPage, GM_getValue('update_rate_'+SM_Server, 1000));
		}
	}, 1000);
}

function checkPage() {
	if(GLOBAL_noCheck)
		return;
	/**********
	Seamap
	**********/
	
	var els=(gid('gvSeamap').firstChild.nextSibling || gid('gvSeamap').firstChild).firstChild.nextSibling,
		els_len=els.childNodes.length,
		lSM=SM;
	
	if(!els_len || (!GLOBAL_checkAgain && els.lastChild.lang=='checked')) {
		if(!els_len&& gid('GM_seamapPlus_checkLoad') && gid('GM_seamapPlus_checkLoad').style.display=='block') //wenn keine Inseln auf Kartenkoords existieren
			gid('GM_seamapPlus_checkLoad').style.display='none';
		
		if(lSM.showDistance)
			drawDistance(gMainpos());
		
		if(lSM.controlMap) {
			++GLOBAL_lastCheck;
			if(GLOBAL_lastCheck>10) {
				GLOBAL_checkAgain=true;
				GLOBAL_lastCheck=0;
			}
		}
		return;
	}
	
	
	if(!gid(GLOBAL_HS)) {
		GLOBAL_HS=false;
		GLOBAL_Levelbereich=lSM.highlevel;
	}
	var mapPos=gMainpos(),
		i=els_len, LOCisl=Islands,
		el, id, data_el, user, gilde, elname, suche, pos, npc, iId, usercol, tEl, sizeEl, temp, j;
		
	if(lSM.showDistance)
		drawDistance(mapPos);
	
	
	if(lSM.showShips) {
		while(GLOBAL_Ships.length)
			if((temp=GLOBAL_Ships.pop()['el']).parentNode)
				GLOBAL_wmIslandDiv.removeChild(temp);
	}
	while(i--) {
		el=els.childNodes[i];
		if(el.lang=='checked' && !GLOBAL_checkAgain)
			continue;
		
		/*****
		NewIsland
		*****/
		el.lang='checked';
		if(!el.hasChildNodes() || !el.firstChild.hasChildNodes()) { //Schiffe
			if(lSM.showShips && el.hasChildNodes())//fremde Schiffe
				addShip(el, mapPos);
			continue;
		}
		id=setElId(el);
		if(!id) {//bei grosser Engine-Auslastung werden injected Scripts zu spaet ausgefuehrt (warum?) -> Workaround..
			el.lang=null;
			return;
		}
		data_el=toChild(el,3);
		user=toChild(data_el,2).innerHTML;
		gilde=data_el.lastChild.firstChild.innerHTML.slice(1,-1);
		elname=id.split(':');
			
		if(elname[0]=='trade_island') {
			suche=user.match(/.+\(\d+-(\d+)\)/);
			if(suche && parseInt(suche[1])<GLOBAL_Levelbereich) {
				GLOBAL_Levelbereich=parseInt(suche[1]);
				GLOBAL_HS=id;
			}
			continue;
		}
		else if(elname[0]=='resource_spending_spring')
			continue;
		else if(user==GLOBAL_MyUsername) {
			sizeEl=el.firstChild.lastChild;
			while(sizeEl.className.slice(-12)!='islandsImage')
				sizeEl=sizeEl.previousSibling;
			pos=gpos(el, mapPos, sizeEl);
			GLOBAL_MyX=pos[0];
			GLOBAL_MyY=pos[1];
			GLOBAL_MyGilde=gilde;
			continue;
		}
		el.style.display='none'; //Chain-refreshes verhindern
		npc= !(elname[0]=='island');
		iId= (npc ? id : user);
		usercol=toChild(data_el,2).style.color;
		
		if(!LOCisl[iId])
			addIsland(iId, {'user':user, 'id':id, 'npc':npc});
		
		LOCisl[iId]['gilde']=gilde;
		LOCisl[iId]['lvl']=parseInt(toChild(el,4).nextSibling.firstChild.innerHTML.slice(2, -1));
		
		
		sizeEl=el.firstChild.lastChild;
			while(sizeEl.className.slice(-12)!='islandsImage')
				sizeEl=sizeEl.previousSibling;
		
		pos=gpos(el, mapPos, sizeEl);
		LOCisl[iId]['x']=pos[0];
		LOCisl[iId]['y']=pos[1];
		
		if(!npc) {
			//Politische Beziehung
			if(el.firstChild.lastChild.className=='islandAlignmentIndicator') {
				temp=el.firstChild.lastChild.style.backgroundPosition;
				if(temp==BUNDLES['friend'][3] || temp==BUNDLES['friend_zoom'][3])
					LOCisl[iId]['dipl']='friend';
				else if(temp==BUNDLES['ally'][3] || temp==BUNDLES['ally_zoom'][3])
					LOCisl[iId]['dipl']='ally';
				else if(temp=BUNDLES['enemy'][3] || temp==BUNDLES['enemy_zoom'][3])
					LOCisl[iId]['dipl']='enemy';
				else
					console.log('seamapPlus: Konnte islandAlignmentIndicator nicht erkennen! |'+el.firstChild.lastChild.style.backgroundPosition+'|'+BUNDLES['friend'][3]+'|')
			}
			
			//Player-Farbe
			if(lSM.seaColorPlayer && lSM.player_marks[user]) {
				el.style.backgroundColor=lSM.player_marks[user];
				el.className='GM_seamapPlus_markIsland islandIcon';
			}
			
			//Gilden-Farbe
			if(lSM.seaColorGilden && lSM.marks[gilde]) {
				data_el.lastChild.style.backgroundColor=lSM.marks[gilde];
				data_el.lastChild.className='GM_seamapPlus_circle';
			}
		
			//LLF
			if(!setLLF(id, user) && !GLOBAL_HS && !GLOBAL_forHS[user] && LOCisl[iId]['lvl']>4)
				GLOBAL_forHS[user]=id;
			//Attack
			if(usercol=='#F8820F' || usercol=='rgb(248, 130, 15)' || usercol=='#DB1F26' || usercol=='rgb(219, 31, 38)')
				LOCisl[iId]['attack']=true;
			else {
				tEl = el.firstChild.lastChild.previousSibling;
				while(tEl.className!='extendedHTML killableStatusIcon')
					tEl=tEl.previousSibling;
				LOCisl[iId]['attack']= !(tEl.style.display=='none');
			}
			
			//Boost
			LOCisl[iId]['boost']=false;
			tEl=el.firstChild.childNodes;
			for(j=1, tEl_len=tEl.length; j<tEl_len; ++j) {
				if(tEl[j].className.substr(0,6)=='foam_0') {
					LOCisl[iId]['boost']=true;
					break;
				}
			}
			
			//Nation
			if(!LOCisl[iId]['nation']) {
				temp=sizeEl.style.backgroundPosition;
				if(temp==BUNDLES['romans'][3] || temp==BUNDLES['romans_zoom'][3])
					LOCisl[iId]['nation']=1;
				else if(temp==BUNDLES['vikings'][3] || temp==BUNDLES['vikings_zoom'][3])
					LOCisl[iId]['nation']=2;
				else if(temp==BUNDLES['aztecs'][3] || temp==BUNDLES['aztecs_zoom'][3])
					LOCisl[iId]['nation']=3;
				else 
					LOCisl[iId]['nation']=0;
				
				LOCisl[iId]['id']=id;
			}
			
			//Richtung
			if(el.lastChild.lang!='injected' && lSM.seaMarkMoving)
				appendElement('div', el, {className:'GM_seamapPlus_circle', lang:'injected'}, 'position:absolute; bottom:0; text-align:center; padding:1px; z-index:1');
			
			//durch aus/ein-blenden rutscht Node ans Ende
			if((Dir=el.firstChild.firstChild.nextSibling).className=='islandsDirection' || (Dir=el.firstChild.lastChild).className=='islandsDirection') {
				if(lSM.seaMarkMoving && el.lastChild.innerHTML!='moves') {
					el.lastChild.innerHTML='moves';
					el.lastChild.style.backgroundColor='red';
				}
				temp=Dir.style.backgroundPosition;
				if(temp==BUNDLES['arrow0'][3])//r
					LOCisl[iId]['dir']=1;
				else if(temp==BUNDLES['arrow1'][3])//ru
					LOCisl[iId]['dir']=315;
				else if(temp==BUNDLES['arrow2'][3])//u
					LOCisl[iId]['dir']=270;
				else if(temp==BUNDLES['arrow3'][3])//lu
					LOCisl[iId]['dir']=225;
				else if(temp==BUNDLES['arrow4'][3])//l
					LOCisl[iId]['dir']=180;
				else if(temp==BUNDLES['arrow5'][3])//lo
					LOCisl[iId]['dir']=135;
				else if(temp==BUNDLES['arrow6'][3])//o
					LOCisl[iId]['dir']=90;
				else if(temp==BUNDLES['arrow7'][3])//ro
					LOCisl[iId]['dir']=45;
			}
			else {
				if(LOCisl[iId]['dir'])
					LOCisl[iId]['dir']=false;
				if(lSM.seaMarkMoving && el.lastChild.innerHTML!='stays') {
					el.lastChild.innerHTML='stays';
					el.lastChild.style.backgroundColor='green';
				}
			}
			
			//Danger
			if(lSM.checkDanger)
				addToDanger(id, user);
		}
		else {
			if(!LOCisl[iId]['nation']) {
				if(elname[0]=='merchantfleet')
					LOCisl[iId]['nation']=-1;
				else if(elname[0]=='kraken')
					LOCisl[iId]['nation']=-2;
				else 
					LOCisl[iId]['nation']=0;
			}
		}
		
		if((lSM.seashowNPC || !npc) && (lSM.seaShowEnemy || LOCisl[iId]['dipl']!='enemy') && (lSM.seaShowFriends || LOCisl[iId]['dipl']!='friend') && (lSM.seaShowAlly || LOCisl[iId]['dipl']!='ally') && (lSM.seaShowRomans || LOCisl[Iidy]['nation']!=1) && (lSM.seaShowVikings || LOCisl[iId]['nation']!=2) && (lSM.seaShowAztecs || LOCisl[iId]['nation']!=3) && (lSM.seaShowStanding || LOCisl[iId]['dir']) && (lSM.seaShowMoving || !LOCisl[iId]['dir']) && (lSM.seaShowUnknown || lSM.player_marks[user] || lSM.marks[gilde] || LOCisl[iId]['dipl']))
			el.style.display='block';
		
		addToWorldMap(iId);
	}
	
	if(gid('GM_seamapPlus_checkLoad') && gid('GM_seamapPlus_checkLoad').style.display=='block')
		gid('GM_seamapPlus_checkLoad').style.display='none';
	
	if(GLOBAL_HS) {
		for(var i in GLOBAL_forHS) {
			if(!gid(GLOBAL_forHS[i])) {
				delete GLOBAL_forHS[i];
				continue;
			}
			setLLF(GLOBAL_forHS[i], i, true); 
		}
	}
	
	
	if(lSM.checkDanger)
		createDangerTR();
	
	GLOBAL_checkAgain=false;
}

init();
setTimeout(function() {if(gid('GM_seamapPlus_injectCode')) {eval(gid('GM_seamapPlus_injectCode').textContent || gid('GM_seamapPlus_injectCode').innerText); document.body.removeChild(gid('GM_seamapPlus_injectCode'));}}, 1000);
