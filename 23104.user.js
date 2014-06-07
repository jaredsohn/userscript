// ==UserScript==
// @name           Wowhead Character
// @namespace      wowhead
// @include        http://www.wowhead.com/?char*
// ==/UserScript==

xml2array=function(root){if(!root)return;var ret=this.parseElement(root);if(this.usearray==true){ret=[ret];}else if(this.usearray==false){}else if(this.usearray==null){}else if(this.usearray[root.nodeName]){ret=[ret];};var json={};json[root.nodeName]=ret;return json;};parseElement=function(elem){if(elem.nodeType==7){return;};if(elem.nodeType==3||elem.nodeType==4){return elem.nodeValue;};var retval;var cnt={};if(elem.attributes&&elem.attributes.length){retval={};for(var i=0;i<elem.attributes.length;i++){var key=elem.attributes[i].nodeName;if(typeof(key)!="string")continue;var val=elem.attributes[i].nodeValue;if(!val)continue;if(typeof(cnt[key])=="undefined")cnt[key]=0;cnt[key]++;this.addNode(retval,key,cnt[key],val);};};if(elem.childNodes&&elem.childNodes.length){var textonly=true;if(retval)textonly=false;for(var i=0;i<elem.childNodes.length&&textonly;i++){var ntype=elem.childNodes[i].nodeType;if(ntype==3||ntype==4)continue;textonly=false;};if(textonly){if(!retval)retval="";for(var i=0;i<elem.childNodes.length;i++){retval+=elem.childNodes[i].nodeValue;};}else{if(!retval)retval={};for(var i=0;i<elem.childNodes.length;i++){var key=elem.childNodes[i].nodeName;if(typeof(key)!="string")continue;var val=this.parseElement(elem.childNodes[i]);if(!val)continue;if(typeof(cnt[key])=="undefined")cnt[key]=0;cnt[key]++;this.addNode(retval,key,cnt[key],val);};};};return retval;};addNode=function(hash,key,cnts,val){if(this.usearray==true){if(cnts==1)hash[key]=[];hash[key][hash[key].length]=val;}else if(this.usearray==false){if(cnts==1)hash[key]=val;}else if(this.usearray==null){if(cnts==1){hash[key]=val;}else if(cnts==2){hash[key]=[hash[key],val];}else{hash[key][hash[key].length]=val;};}else if(this.usearray[key]){if(cnts==1)hash[key]=[];hash[key][hash[key].length]=val;}else{if(cnts==1)hash[key]=val;};};
function ge(_1){return document.getElementById(_1)}
function rc(_1){_1.parentNode.removeChild(_1)}
function ct(_1){return document.createTextNode(_1)}
function gE(_1,_2){return _1.getElementsByTagName(_2)}
function ce(_1,_2){var _3=document.createElement(_1);for(var _4 in _2){_3.setAttribute(_4, _2[_4]);};return _3;}
function ae(_1,_2){return _1.appendChild(_2)}
function iA(_1,_2){return _2.parentNode.insertBefore(_1,_2.nextSibling);}
function aE(_1,_2,_3){_1.addEventListener(_2,_3,false)}
function cP(_1){document.title=_1;var page = ge('main-contents');page.innerHTML = '';var div = ce('div', {id:'text'});div.className = 'text';ae(page, div);}
function BtW(_1,_2){var _3=function(z,y){var a=z.length;while(--a>0&&z[a]==y){}z=z.substring(0,a+1);return (z==y)?"":z;};var _7=function(_8){var _9="";var b=_3(_8,"0");for(var i=0;i<b.length;++i){tens=parseInt(b[i]);ones=(++i==b.length)?0:parseInt(b[i]);_9+=_c[tens*6+ones];}return (b.length==_8.length)?_9:_9+_d;};var _c="0zMcmVokRsaqbdrfwihuGINALpTjnyxtgevE";var _d="Z";var _e="",tens,ones;var _f=["druid","hunter","mage","paladin","priest","rogue","shaman","warlock","warrior"];var _10=[[21,21,20],[21,20,23],[23,22,22],[20,22,22],[22,21,21],[21,24,22],[20,21,20],[21,22,22],[23,21,22]];_2=_2.toLowerCase();for(var i=_f.length;i-->0;){if(_2.indexOf(_f[i])!=-1){wowhead_class=i;break;}}_e+=_c[wowhead_class*3];_e+=_7(_1.substr(0,_10[wowhead_class][0]));_e+=_7(_1.substr(_10[wowhead_class][0],_10[wowhead_class][1]));_e+=_7(_1.substr(_10[wowhead_class][0]+_10[wowhead_class][1],_10[wowhead_class][2]));if(_e[_e.length-1]==_d){_e=_e.substr(0,_e.length-1);}return _e;}
function aS(_1){GM_addStyle(_1.replace(/;/g, ' !important;'))}
function aM(_1,_2) {
	_1.addEventListener('mouseover', function(evt) {Tooltip.showAtCursor(evt,unescape(_2))}, false);
	_1.addEventListener('mouseout', function() {Tooltip.hide()}, false);
	_1.addEventListener('mousemove', function(evt) {Tooltip.cursorUpdate(evt)}, false);
}
var Browser = {ie:false};
function ac(z){var a=0,b=0;while(z){a+=z.offsetLeft;b+=z.offsetTop;z=z.offsetParent;}return [a,b];}
function $E(e){if(!e){e=event;}e._button=e.which?e.which:e.button;e._target=e.target?e.target:e.srcElement;return e;}
var Tooltip={clip:"main-contents",create:function(_177){var d=ce("div"),t=ce("table"),tb=ce("tbody"),tr1=ce("tr"),tr2=ce("tr"),td=ce("td"),th1=ce("th"),th2=ce("th"),th3=ce("th");d.className="tooltip";th1.style.backgroundPosition="top right";th2.style.backgroundPosition="bottom left";th3.style.backgroundPosition="bottom right";if(_177){td.innerHTML=_177;}ae(tr1,td);ae(tr1,th1);ae(tb,tr1);ae(tr2,th2);ae(tr2,th3);ae(tb,tr2);ae(t,tb);Tooltip.icon=ce("p");Tooltip.icon.style.visibility="hidden";ae(Tooltip.icon,ce("div"));ae(d,Tooltip.icon);ae(d,t);return d;},fix:function(_181,_182,_183){var _184=gE(_181,"table")[0],td=gE(_184,"td")[0],c=td.childNodes;if(c.length>=2&&c[0].nodeName=="TABLE"&&c[1].nodeName=="TABLE"){var m;if(c[1].offsetWidth>300){m=Math.max(300,c[0].offsetWidth)+20;}else{m=Math.max(c[0].offsetWidth,c[1].offsetWidth)+20;}if(m>20){_181.style.width=m+"px";c[0].style.width=c[1].style.width="100%";if(!_182&&_181.offsetHeight>document.body.clientHeight){_184.className="shrink";}}}if(_183){_181.style.visibility="visible";}},fixSafe:function(p1,p2,p3){if(Browser.ie){setTimeout(Tooltip.fix.bind(this,p1,p2,p3),1);}else{Tooltip.fix(p1,p2,p3);}},append:function(el,_18c){var el=$(el);var _18d=Tooltip.create(_18c);ae(el,_18d);Tooltip.fixSafe(_18d,1,1);},prepare:function(){if(!Tooltip.tooltip){var _=Tooltip.create();_.style.position="absolute";_.style.left=_.style.top="-2323px";var lay=ge("layers");ae(lay,_);Tooltip.tooltip=_;Tooltip.tooltipTable=gE(_,"table")[0];Tooltip.tooltipTd=gE(_,"td")[0];if(Browser.ie6){_=ce("iframe");_.src="javascript:0;";_.frameBorder=0;ae(lay,_);Tooltip.iframe=_;}}},move:function(x,y,w1,h1,_194,_195,clip,_197,tow,toh){if(!Tooltip.tooltipTable){return;}var _,left=x,top=y,_19d=x,_19e=y,minx=0,miny=0,_1a1=g_getWindowSize(),_1a2=g_getScroll(),bcw=_1a1.w,bch=_1a1.h,bsl=_1a2.x,bst=_1a2.y;if(clip==null){clip=Tooltip.clip;}if(_197==null){_197=Tooltip.tooltip;tow=Tooltip.tooltipTable.offsetWidth;toh=Tooltip.tooltipTable.offsetHeight;}_197.style.width=tow+"px";if(clip){_=ge(clip);if(_){c=ac(_);minx=c[0];miny=c[1];if(_.offsetWidth+minx<=bsl+bcw){bcw=_.offsetWidth+minx-bsl;}if(_.offsetHeight+miny<=bst+bch){bch=_.offsetHeight+miny-bst;}}}if(left+w1+tow>bcw){left=Math.max(left-tow,minx)-_194;}else{left+=w1+_194;}if(left<minx){left=minx;}else{if(left+tow>bsl+bcw){left=bsl+bcw-tow;}}if(top-toh>Math.max(bst,miny)){top-=toh+_195;}else{top+=h1+_195;}if(top<miny){top=miny;}else{if(top+toh>bst+bch){top=Math.max(bst,bst+bch-toh);}}if(Tooltip.iconVisible){if(_19d>=left-48&&_19d<=left&&_19e>=top-4&&_19e<=top+48){top-=48-(_19e-top);}}_197.style.left=left+"px";_197.style.top=top+"px";_197.style.visibility="visible";if(Browser.ie6&&Tooltip.iframe){_=Tooltip.iframe;_.style.left=left+"px";_.style.top=top+"px";_.style.width=tow+"px";_.style.height=toh+"px";_.style.display="";_.style.visibility="visible";}},show:function(_1a7,text,x,y,_1ab){if(Tooltip.disabled){return;}var _;Tooltip.prepare();if(_1ab){text="<span class=\""+_1ab+"\">"+text+"</span>";}_=Tooltip.tooltip;_.style.width="550px";_.style.left="-2323px";_.style.top="-2323px";Tooltip.tooltipTd.innerHTML=text;_.style.display="";var _1ad=ac(_1a7);Tooltip.fix(_,0,0);Tooltip.move(_1ad[0],_1ad[1],_1a7.offsetWidth,_1a7.offsetHeight,x,y);},showAtCursor:function(_1ae,text,x,y,_1b2){if(Tooltip.disabled){return;}if(!x||x<10){x=10;}if(!y||y<10){y=10;}_1ae=$E(_1ae);Tooltip.prepare();if(_1b2){text="<span class=\""+_1b2+"\">"+text+"</span>";}var _;_=Tooltip.tooltip;_.style.width="550px";_.style.left="-2323px";_.style.top="-2323px";Tooltip.tooltipTd.innerHTML=text;_.style.display="";var pos=g_getCursorPos(_1ae);Tooltip.fix(_,0,0);Tooltip.move(pos.x,pos.y,0,0,x,y);},showAtXY:function(text,x,y,_1b8,_1b9){if(Tooltip.disabled){return;}Tooltip.prepare();var _;_=Tooltip.tooltip;_.style.width="550px";_.style.left="-2323px";_.style.top="-2323px";Tooltip.tooltipTd.innerHTML=text;_.style.display="";Tooltip.fix(_,0,0);Tooltip.move(x,y,0,0,_1b8,_1b9,null,null,null,null);},cursorUpdate:function(_1bb,x,y){if(Tooltip.disabled||!Tooltip.tooltip){return;}_1bb=$E(_1bb);if(!x||x<10){x=10;}if(!y||y<10){y=10;}var pos=g_getCursorPos(_1bb);Tooltip.move(pos.x,pos.y,0,0,x,y);},hide:function(){if(Tooltip.tooltip){Tooltip.tooltip.style.display="none";Tooltip.tooltip.visibility="hidden";Tooltip.tooltipTable.className="";if(Browser.ie6){Tooltip.iframe.style.display="none";}Tooltip.setIcon(null);}},setIcon:function(icon){Tooltip.prepare();if(icon){Tooltip.icon.style.backgroundImage="url(http://static.wowhead.com/images/icons/medium/"+icon.toLowerCase()+".jpg)";Tooltip.icon.style.visibility="visible";}else{Tooltip.icon.style.backgroundImage="none";Tooltip.icon.style.visibility="hidden";}Tooltip.iconVisible=icon?1:0;}};
function g_getCursorPos(e){var x,y;if(window.innerHeight){x=e.pageX;y=e.pageY;}else{var _62=g_getScroll();x=e.clientX+_62.x;y=e.clientY+_62.y;}return {x:x,y:y};}
function g_getScroll(){var x=0,y=0;if(typeof (window.pageYOffset)=="number"){x=window.pageXOffset;y=window.pageYOffset;}else{if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){x=document.body.scrollLeft;y=document.body.scrollTop;}else{if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){x=document.documentElement.scrollLeft;y=document.documentElement.scrollTop;}}}return {x:x,y:y};}
function g_getWindowSize(){var _5b=0,_5c=0;if(typeof window.innerWidth=="number"){_5b=window.innerWidth;_5c=window.innerHeight;}else{if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){_5b=document.documentElement.clientWidth;_5c=document.documentElement.clientHeight;}else{if(document.body&&(document.body.clientWidth||document.body.clientHeight)){_5b=document.body.clientWidth;_5c=document.body.clientHeight;}}}return {w:_5b,h:_5c};}
var char_class;
var data;

function addTalent() {
	ae(ge('text'),ce('div', {id:'talentDiv', style:'display: none;'}));
	ae(ge('talentDiv'),ce('div', {id:'talentCollapse'}));
	ae(ge('talentDiv'),ce('div', {id:'talentDiv_2_header'}));
	ae(ge('talentDiv'),ce('div', {id:'talentDiv_1_header'}));
	ae(ge('talentDiv'),ce('div', {id:'talentDiv_0_header'}));
	ae(ge('talentDiv'),ce('div', {class:'myClear'}));
	ae(ge('talentDiv'),ce('div', {id:'talentDiv_2'}));
	ae(ge('talentDiv'),ce('div', {id:'talentDiv_1'}));
	ae(ge('talentDiv'),ce('div', {id:'talentDiv_0'}));

	
	for (i=0; i<3; i++) {
		for (y=0; y<9; y++) {
			for(x=0; x<4; x++) {
				var iconWrap = ce('div');
				iconWrap.id = i+'_'+y+'x'+x;
				iconWrap.style.cssFloat = 'left';
				ae(ge('talentDiv_'+i),iconWrap);
				var icon = ce('div');
				icon.style.marginTop = '10px';
				icon.style.marginLeft = '10px';
				icon.style.minWidth='26px';
				icon.style.minHeight='26px';
				ae(iconWrap, icon);
				var num = ce('div');
				num.style.display = 'none';
				num.style.cursor = 'default';
				num.style.cssFloat = 'left';
				num.style.marginTop = '14px';
				num.style.marginLeft = '10px';
				num.style.minWidth='9px';
				num.style.minHeight='9px';
				num.style.borderTop='1px solid #242424';
				num.style.borderLeft='1px solid #242424';
				num.style.backgroundColor='#111';
				ae(num, ce('font'));
				num.firstChild.style.cursor = 'default';
				num.firstChild.style.color = '#fff;';
				num.firstChild.style.fontSize = '9px';
				num.firstChild.style.lineHeight = '9px';
				num.style.textAlign = 'right';
				ae(icon,num);
				}
			var div = ce('div');
			div.style.clear = 'both';
			ae(ge('talentDiv_'+i),div);
			}
	}
}

function addGuild() {
	ae(ge('text'),ce('div', {id:'guildDiv', style:'display: none;'}));
	ae(ge('guildDiv'),ce('div', {id:'guild_Header'})).innerHTML = 'Guild';
	ae(ge('guildDiv'),ce('div', {class:'myClear'}));
	ae(ge('guildDiv'),ce('div', {class:'guildClass', id:'guild_Content'}));
	ae(ge('guildDiv'),ce('div', {class:'myClear'}));
	ae(ge('guildDiv'),ce('div', {id:'guild_Footer'}));
}

function addRep() {
	ae(ge('text'),ce('div', {id:'repDiv', style:'display: none;'}));
	ae(ge('repDiv'),ce('div', {id:'rep_Header'})).innerHTML = 'Reputation';
	ae(ge('repDiv'),ce('div', {class:'myClear'}));
	ae(ge('repDiv'),ce('div', {class:'repClass', id:'rep_Content'}));
	ae(ge('repDiv'),ce('div', {class:'myClear'}));
}

function addArena() {
	ae(ge('text'),ce('div', {id:'arenaDiv', style:'display: none;'}));
	ae(ge('arenaDiv'),ce('div', {id:'arena2v2_header'})).innerHTML = '2v2';
	ae(ge('arenaDiv'),ce('div', {id:'arena3v3_header'})).innerHTML = '3v3';
	ae(ge('arenaDiv'),ce('div', {id:'arena5v5_header'})).innerHTML = '5v5';
	ae(ge('arenaDiv'),ce('div', {class:'myClear'}));
	ae(ge('arenaDiv'),ce('div', {class:'arenaTeam', id:'arena2v2'}));
	ae(ge('arenaDiv'),ce('div', {class:'arenaTeam', id:'arena3v3'}));
	ae(ge('arenaDiv'),ce('div', {class:'arenaTeam', id:'arena5v5'}));
}

function add3D() {
	ae(ge('text'),ce('div', {id:'modelDiv', style:'display: none;'}));
	ae(ge('modelDiv'),ce('div', {id:'model_header'})).innerHTML = '3D Model View';
	ae(ge('modelDiv'),ce('div', {class:'myClear'}));
	ae(ge('modelDiv'),ce('div', {id:'model_window'}));
}

function addTalents(talents, spec, clazz) {
	var talent_url = 'http://www.wowhead.com/?talent='+BtW(spec,char_class)
	p=0;
	for (z=0; z<3; z++) {
		ae(ge('talentDiv_'+z+'_header'), ce('span')).innerHTML = '<a class="myGold" style="text-decoration:none !important;" href='+talent_url+'>'+talents[z].n+'</a>';
		num = 0;
		for (i=0; i<talents[z].length; i++) {
			y = (talents[z][i].y/5);
			x = talents[z][i].x-1;
			talents[z][i].k = spec.charAt(p);
			iconWrap = ge(z+'_'+y+'x'+x);
			icon = iconWrap.firstChild;
	        var tt = "<table><tr><td><b>";
	        if (talents[z][i].z) {
	            tt += "<span style=\"float: right\" class=\"q0\">Rank " + talents[z][i].z + "</span>";
	        }
	        tt += talents[z][i].n + "</b><br />" + "Rank " + talents[z][i].k + "/" + talents[z][i].m + "<br />";
	        if (talents[z][i].t) {
	            for (var x = 0, len = talents[z][i].t.length; x < len; x += 2) {
	                if (talents[z][i].t[x] && talents[z][i].t[x + 1]) {
	                    tt += "<table width=\"100%\"><tr><td>" + talents[z][i].t[x] + "</td><th>" + talents[z][i].t[x + 1] + "</th></tr></table>";
	                } else {
	                    tt += talents[z][i].t[x] + "<br />";
	                }
	            }
	        }
	        tt += "</td></tr></table><table><tr><td>";
	        tt += "<span class=\"q\">" + getTalentDescription(talents[z][i]) + "</span><br />";
	        tt += "</td></tr></table>";
			aM(icon, tt);
			aM(icon.firstChild, tt);
			icon.style.minWidth='24px';
			icon.style.minHeight='24px';
			icon.style.border='1px solid #777';
			icon.style.backgroundImage = 'url(http://www.paenis.com/talents/'+clazz+'/'+(z+1)+'_icons.jpg)';
			icon.style.backgroundPosition = '-'+((i*24))+'px '+(talents[z][i].k > 0 ? '0px' : '-24px' );
			if(talents[z][i].k>0) { num+=parseFloat(talents[z][i].k); }
			icon.firstChild.style.display = '';
			var span = ae(icon.firstChild.firstChild, ce('span'));
			span.innerHTML = (talents[z][i].k+'/'+talents[z][i].m)
			if(talents[z][i].k >= 1) {
				if(talents[z][i].k == talents[z][i].m) {
					span.className = 'myYellow'
				} else {
					span.className = 'myGreen'
				}
			}
			        if (talents[z][i].r) {
                    var req_node = ge(i+'_'+talents[z][i].r[0]);
					var req_y = (talents[z][talents[z][i].r[0]].y/5);
					var req_x = talents[z][talents[z][i].r[0]].x-1;
                    var dX = talents[z][i].x - talents[z][talents[z][i].r[0]].x;
                    var dY = (talents[z][i].y - talents[z][talents[z][i].r[0]].y) / 5;
                    var l, t, w, h;
                    var type = -1;
                    if (dY > 0) {
                        if (dX == 0) {
                            type = 0;
                        } else {
                            if (dX < 0) {
                                type = 1;
                            } else {
                                type = 2;
                            }
                        }
                    } else {
                        if (dY == 0) {
                            if (dX > 0) {
                                type = 3;
                            } else {
                                if (dX < 0) {
                                    type = 4;
                                }
                            }
                        }
                    }
                    w = (Math.abs(dX) - 1) * 36;
                    h = (Math.abs(dY) - 1) * 36;
                    switch (type) {
                      case 0:
                        w = 15;
                        h += 15;
                        l = ((req_x)*36)+16;
                        t = ((req_y+1)*36);
                        break;
                      case 1:
                        w += 30;
                        h = 15;
                        l = ((req_x)*36)-17;
                        t = ((req_y)*36)+16;
                        break;
                      case 2:
                        w += 31;
                        h = 15;
                        l = ((req_x+1)*36);
                        t = ((req_y)*36)+16;
                       break;
                      case 3:
                        w += 15;
                        h = 15;
                        l = ((req_x+1)*36);
                        t = ((req_y)*36)+16;
                        break;
                      case 4:
                        w += 15;
                        h = 15;
                        l = ((req_x)*36);
                        t = ((req_y)*36)+16;
                        break;
                      default:;
                    }
					template = [
					ce('div', {class:'arrowDown'}),
					ce('div', {class:'arrowLeftDown_left'}),
					ce('div', {class:'arrowRightDown_right'}),
					ce('div', {class:'arrowRight'}),
					ce('div', {class:'arrowLeft'})
					];
					if(type == 1) {
						var arrow2 = ce('div', {class:'arrowLeftDown_down'})
						_ = arrow2.style;
						_.position = 'absolute';
						_.left = ((l+w)-30) + "px";
						_.top = (t+15) + "px";
						_.width = "15px";
						_.height = (((Math.abs(dY) - 1) * 36)+20) + "px";
					}
					if(type == 2) {
						var arrow2 = ce('div', {class:'arrowRightDown_down'})
						_ = arrow2.style;
						_.position = 'absolute';
						_.left = ((l+w)-15) + "px";
						_.top = (t+15) + "px";
						_.width = "15px";
						_.height = (((Math.abs(dY) - 1) * 36)+20) + "px";
					}
                    var arrow = template[type].cloneNode(1);
                    _ = arrow.style;
					if(talents[z][i].k>0) { arrow.setAttribute('class', arrow.getAttribute('class')+'2')}
					_.position = 'absolute';
                    _.left = l + "px";
                    _.top = t + "px";
                    _.width = w + "px";
                    _.height = h + "px";
                    ae(ge(z+'_'+req_y+'x'+req_x).parentNode,arrow);
                    if(arrow2)
						ae(ge(z+'_'+req_y+'x'+req_x).parentNode,arrow2);
                }
			p++;
		}
		ae(ge('talentDiv_'+z+'_header'), ct(' ('+num+')'));
	}
}
function getTalentSpec(talents, region, url) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+region+'/character-talents.xml?'+url,
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var xml = xml2array(dom)['#document'];
			var stuff = runTalents(talents);
			addTalents(stuff, xml.page.characterInfo.talentTab.talentTree.value, xml.page.characterInfo.character.class.toLowerCase())
		}
	});
}
function runTalents(talents) {
	eval(talents)
	return data;
}
function gC(char){
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://"+(char.region=='EU'?'eu.wowarmory.com':'www.wowarmory.com')+'/character-sheet.xml?r='+char.realm+'&n='+char.name,
		onload: function(responseDetails) {
			cD(responseDetails.responseText, char.region, char.realm);
		}
	});
}
function cD(data, region, realm){
	var parser = new DOMParser();
	var dom = parser.parseFromString(data, "application/xml");
	var xml = xml2array(dom)['#document'];
	var cI = xml.page.characterInfo;
	
	char_class = cI.character.class.toLowerCase();
	race = cI.character.race.toLowerCase().replace(' ','');
	sex = cI.character.gender.toLowerCase();
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://static.wowhead.com/talent/data/'+cI.character.class.toLowerCase()+'.js',
		onload: function(responseDetails) {
			getTalentSpec(responseDetails.responseText.replace(/\$WowheadTalentCalculator.registerClass\(.*, data\);/g, ''),
			(region=='EU'?'eu.wowarmory.com':'www.wowarmory.com'),
			cI.character.charUrl);
		}
	});
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://"+(region=='EU'?'eu.wowarmory.com':'www.wowarmory.com')+'/character-reputation.xml?r='+realm+'&n='+cI.character.name,
		onload: function(responseDetails) {
			var repParser = new DOMParser();
			var repDom = repParser.parseFromString(responseDetails.responseText, "application/xml");
			var repXml = xml2array(repDom)['#document'];
			parseReputation(repXml);
		}
	});

	if(cI.character.guildName) 
		getGuildInfo((region=='EU'?'eu.wowarmory.com':'www.wowarmory.com'), realm, cI.character.guildName, region)
	
	var wrapDiv = ge('buffs');
	if(cI.characterTab.buffs){
		if(cI.characterTab.buffs.spell.icon) { 
			var divClear = ce('div');
			divClear.className = 'clear'
			var icon = cI.characterTab.buffs.spell.icon;
			img = ce('img', {src:'http://'+(region=='EU'?'eu.wowarmory.com':'www.wowarmory.com')+'/images/icons/21x21/'+icon+'.png'});
			img.style.cssFloat = 'left';
			aM(img, '<div class=\'myTable\'><span class=\'myYellow myBold myItemName\'>'+cI.characterTab.buffs.spell.name +'</span><br>'+cI.characterTab.buffs.spell.effect+'</div>');
			ae(wrapDiv, img);
			ae(wrapDiv, divClear);
		} else {
			for(var i = 0; i < cI.characterTab.buffs.spell.length; i++) {
				var divClear = ce('div');
				divClear.className = 'clear'
				var icon = cI.characterTab.buffs.spell[i].icon;
				img = ce('img', {src:'http://'+(region=='EU'?'eu.wowarmory.com':'www.wowarmory.com')+'/images/icons/21x21/'+icon+'.png'});
				img.style.cssFloat = 'left';
				aM(img, '<div class=\'myTable\'><span class=\'myYellow myBold myItemName\'>'+cI.characterTab.buffs.spell[i].name +'</span><br>'+cI.characterTab.buffs.spell[i].effect+'</div>');
				ae(wrapDiv, img);
				ae(wrapDiv, divClear);
			}
		}
	}

	var wrapDiv = ge('debuffs');
	if(cI.characterTab.debuffs){
		if(cI.characterTab.debuffs.spell.icon) { 
			var divClear = ce('div');
			divClear.className = 'clear';
			var icon = cI.characterTab.debuffs.spell.icon;
			img = ce('img', {src:'http://'+(region=='EU'?'eu.wowarmory.com':'www.wowarmory.com')+'/images/icons/21x21/'+icon+'.png'});
			img.style.cssFloat = 'left';
			aM(img,  '<div class=\'myTable\'><span class=\'myYellow myBold myItemName\'>'+cI.characterTab.debuffs.spell.name +'</span><br>'+cI.characterTab.debuffs.spell.effect+'</div>');
			ae(wrapDiv, img);
			ae(wrapDiv, divClear);
		} else {
			for(var i = 0; i < cI.characterTab.debuffs.spell.length; i++) {
				var divClear = ce('div');
				divClear.className = 'clear'
				var icon = cI.characterTab.debuffs.spell[i].icon;
				img = ce('img', {src:'http://'+(region=='EU'?'eu.wowarmory.com':'www.wowarmory.com')+'/images/icons/21x21/'+icon+'.png'});
				img.style.cssFloat = 'left';
				aM(img, '<div class=\'myTable\'><span class=\'myYellow myBold myItemName\'>'+cI.characterTab.debuffs.spell[i].name +'</span><br>'+cI.characterTab.debuffs.spell[i].effect+'</div>');
				ae(wrapDiv, icon);
				ae(wrapDiv, divClear);
			}
		}
	}

	var charDiv = ge('character');
	charDiv.className = cI.character['class'].toLowerCase();
	var level = ge('level2');
	level.innerHTML ='';
	ae(level, ct(cI.character.level));
	var spec = ge('spec');
	spec.innerHTML ='';
	ae(spec, ct(cI.characterTab.talentSpec.treeOne+'/'+cI.characterTab.talentSpec.treeTwo+'/'+cI.characterTab.talentSpec.treeThree));
	ge('image').firstChild.src='http://'+(region=='EU'?'eu.wowarmory.com':'www.wowarmory.com')+'/images/portraits/'+(cI.character.level >= 60 ? (cI.character.level >= 70 ? 'wow-70' : 'wow') : 'wow-default')+'/'+cI.character.genderId+'-\n'+cI.character.raceId+'-'+cI.character.classId+'.gif';

	var name = ge('name');
	var name_link = ce('a');
	name_link.href = 'http://www.wowhead.com/?char&r='+cI.character.realm+'&n='+cI.character.name+'&s='+region;
	ae(name_link, ct(cI.character.name))
	ae(name, name_link);

	var guild = ge('guild');
	ae(guild, ct('<'+cI.character.guildName+'>'));

	var server = ge('server');
	ae(server, ct(cI.character.realm));

	var healthDiv = ge('health');
	ae(healthDiv, ct(cI.characterTab.characterBars.health.effective))
	var manaDiv = ge('mana');
	ae(manaDiv, ct(cI.characterTab.characterBars.secondBar.effective))
	manaDiv.className = cI.characterTab.characterBars.secondBar.type;

	var wrapDiv = ge('items');
	class_name = cI.character['class'].toLowerCase();
	if (class_name == 'druid') { ge('17').firstChild.src = 'http://www.paenis.com/icon/17_relic.png'; }
	if (class_name == 'paladin') { ge('17').firstChild.src = 'http://www.paenis.com/icon/17_relic.png'; }
	if (class_name == 'shaman') { ge('17').firstChild.src = 'http://www.paenis.com/icon/17_relic.png'; }
	if(cI.characterTab.items.item.id) { 
			var id = cI.characterTab.items.item.id;
			var slot = cI.characterTab.items.item.slot;
			if(!ge(slot)) {} else {
			cacheItem(id, cI.character.realm, cI.character.name, slot, (region=='EU'?'eu.wowarmory.com':'www.wowarmory.com'));
			var iconWrap = ge(slot);
			icon = iconWrap.firstChild;
			aM(icon, '<div class=\'myTable\'><img src=images/loading.gif><img src=images/loading2.gif></div>');
			icon.src = 'http://static.wowhead.com/images/icons/small/temp.jpg';
			icon.addEventListener('click', function() { GM_openInTab('http://www.wowhead.com/?item='+id); }, false);
			}
	} else {
		for(var i = 0; i < cI.characterTab.items.item.length; i++) {
			var id = cI.characterTab.items.item[i].id;
			var slot = cI.characterTab.items.item[i].slot;
			if(!ge(slot)) {} else {
			cacheItem(id, cI.character.realm, cI.character.name, slot, (region=='EU'?'eu.wowarmory.com':'www.wowarmory.com'));
			var iconWrap = ge(slot);
			icon = iconWrap.firstChild;
			aM(icon, '<div class=\'myTable\'><img src=images/loading.gif><img src=images/loading2.gif></div>');
			icon.src = 'http://static.wowhead.com/images/icons/small/temp.jpg';
			icon.addEventListener('click', function() { GM_openInTab('http://www.wowhead.com/?item='+id); }, false);
			}
		}
	}
	ge('base stats').innerHTML = '';
	ge('melee').innerHTML = '';
	ge('ranged').innerHTML = '';
	ge('spell').innerHTML = '';
	ge('bonus damage').innerHTML = '';
	ge('defense').innerHTML = '';
	baseStats(cI);
	melee(cI);
	ranged(cI);
	spell(cI);
	damage(cI);
	defense(cI);

	if(cI.character.arenaTeams) {
		var teamArray = cI.character.arenaTeams.arenaTeam;
		for(var x in teamArray) {
			if(teamArray[x].members) {
				var table = ce('table');
				table.className = 'arenaTeamText';
				var tr = ce('tr');
				var td = ce('td');
				td.colSpan = 2;
				td.style.textAlign='center'; 
				td.style.borderBottom = '1px solid #777';
				ae(td, ct(teamArray[x].name));
				ae(tr, td)
				ae(table, tr);

				var tr = ce('tr');
				tr.style.borderTop = '1px solid #777';
				var td = ce('td');
				var td2 = ce('td');
				td.className = 'grey'
				td2.className = 'other';
				ae(td, ct('Team Rating'));
				ae(td2, ct(teamArray[x].rating));
				ae(tr, td)
				ae(tr, td2)
				ae(table, tr);

				var tr = ce('tr');
				var td = ce('td');
				var td2 = ce('td');
				td.className = 'grey';
				td2.className = 'other';
				ae(td, ct('Ranking'));
				ae(td2, ct(teamArray[x].ranking));
				ae(tr, td)
				ae(tr, td2)
				ae(table, tr);
				
				var tr = ce('tr');
				var td = ce('td');
				td.colSpan = 2;
				td.style.textAlign='center';
				td.innerHTML = '&nbsp'
				ae(tr, td)
				ae(table, tr);
				
				
				var tr = ce('tr');
				var td = ce('td');
				var td2 = ce('td');
				td.style.textAlign = 'left';
				td2.style.textAlign = 'right';
				tr.style.borderBottom = '1px solid #777';
				ae(td, ct('Member'));
				ae(td2, ct('Rating'));
				ae(tr, td)
				ae(tr, td2)
				ae(table, tr);

				for(y in teamArray[x].members.character) {
					var tr = ce('tr');
					var td = ce('td');
					var td2 = ce('td');
					td.className = teamArray[x].members.character[y].class.toLowerCase();
					td2.className = 'other';
					var a = ce('a');
					a.className = teamArray[x].members.character[y].class.toLowerCase();
					a.style.textDecoration = 'none';
					a.href = '?char&'+teamArray[x].members.character[y].charUrl+'&s='+region;
					ae(a, ct(teamArray[x].members.character[y].name))
					ae(td, a);
					ae(td2, ct(teamArray[x].members.character[y].contribution));
					ae(tr, td)
					ae(tr, td2)
					ae(table, tr);
				}
				ae(ge('arena'+teamArray[x].size+'v'+teamArray[x].size), table)
			}
		}
	}
};
function addDummyData(){
	var charDiv = ge('character');
	charDiv.className = 'warrior';
	var charDivWrap = ce('div');
	ae(charDivWrap, ce('h2'))
	var h3 = ce('h3', {id:'level'});
	var span = ce('span');
	span.id = 'level2';
	ae(h3, span);
	ae(span, ct('01'));
	ae(h3, ce('br'));
	var span = ce('span');
	span.id = 'spec';
	ae(h3, span);
	ae(span, ct('00/00/00'));
	ae(charDivWrap, h3)
	ae(charDiv, charDivWrap)
	ae(charDiv, ce('div', {id:'image'}))
	ae(ge('image'), ce('img', {src:'http://www.wowarmory.com/images/portraits/wow-default/1-1-1.gif'}));
	var charDivWrap = ce('div');
	charDivWrap.style.cssFloat = 'left';
	var h3 = ce('h3');
	ae(h3, ct(''));
	h3.id = 'name';
	ae(charDivWrap, h3)
	var h3 = ce('h3');
	ae(h3, ct(''));
	h3.style.clear = 'both';
	h3.id = 'guild';
	ae(charDivWrap, h3)
	var h3 = ce('h3');
	h3.id = 'server';
	h3.style.clear = 'both';
	ae(h3, ct(''));
	ae(charDivWrap, h3)
	charDivWrap.id = 'CharInfoDiv';
	ae(charDiv, charDivWrap)
	var wrapDiv = ge('bars');
	var healthDiv = ge('health');
	var manaDiv = ge('mana');
	ae(healthDiv, ct(''))
	ae(manaDiv, ct(''))

	var wrapDiv = ge('items');
	var divClear = ce('div');
	divClear.className = 'clear'
		for(var i = 0; i <= 18; i++) {
			if(i==3) i++;
			var iconWrap = ce('div');
			iconWrap.id = i;
			icon = document.createElement('img');
			icon.src = 'http://www.paenis.com/icon/'+i+'.png';
			if(i==17) { icon.src = 'http://www.paenis.com/icon/'+i+'_ranged.png'; }
			icon.className = 'myIcon';
			icon.style.cssFloat = icon.style.styleFloat = 'left';
			ae(iconWrap, icon);
			ae(wrapDiv, iconWrap);
			ae(wrapDiv, divClear);
			if((i+1) == Math.round(19/2)) {
				var spacerDiv = ce('div');
				spacerDiv.style.height = '0px';
				spacerDiv.style.clear = 'both';
				ae(wrapDiv, spacerDiv)
			}
		}
	stats('Base Stats',{strength:0, agility:0, stamina:0,intellect:0,spirit:0,armory:0},1)
	stats('Melee',{damage:0, speed:0, power:0, hitRating:0, critChance:'0%', weaponSkill:0},1)
	stats('Ranged',{damage:0, speed:0, power:0, hitRating:0, critChance:'0%', weaponSkill:0})
	stats('Spell',{bonusHealing:0, hitRating:0, penetration:0, manaRegen:0, mp5:0},1)
	stats('Bonus Damage',{holy:0, arcane:0, fire:0, nature:0, frost:0, shadow:0})
	stats('Defense',{armor:0, defense:0, dodge:'0%', parry:'0%', block:'0%', resilience:0})
};
function addDivs(){
	var wrapDiv = ce('div', {id:'buffwrap'});
	var buffsDiv = ce('div', {id:'buffs'});
	buffsDiv.style.cssFloat = 'left';
	ae(wrapDiv, buffsDiv);

	var debuffsDiv = ce('div', {id:'debuffs'});
	debuffsDiv.style.cssFloat = 'left';
	ae(wrapDiv, debuffsDiv);
	ae(ge('text'), wrapDiv);

	var otherwrapDiv = ce('div', {id:'otherwrap'});
	var charDiv = ce('div', {id:'character'});
	ae(otherwrapDiv, charDiv)
	var clearDiv = ce('div');
	clearDiv.className = 'clear';
	ae(otherwrapDiv, clearDiv)

	var wrapDiv = ce('div', {id:'bars'});
	wrapDiv.style.cssFloat = 'left';
	var healthDiv = ce('div', {id:'health'});
	var manaDiv = ce('div', {id:'mana'});
	manaDiv.className = 'm';
	ae(wrapDiv, healthDiv)
	ae(wrapDiv, manaDiv)
	ae(otherwrapDiv, wrapDiv)

	var wrapDiv = ce('div', {id:'items'});
	wrapDiv.style.cssFloat = 'left';
	ae(ge('text'), wrapDiv);
	ae(otherwrapDiv, wrapDiv)

	var clearDiv = ce('div');
	clearDiv.className = 'clear';
	ae(otherwrapDiv, clearDiv)
	
	var wrapDiv = ce('div', {id:'base stats'});
	wrapDiv.style.cssFloat = 'left';
	ae(otherwrapDiv, wrapDiv);
	var wrapDiv = ce('div', {id:'defense'});
	wrapDiv.style.cssFloat = 'left';
	ae(otherwrapDiv, wrapDiv);

	var clearDiv = ce('div');
	clearDiv.className = 'clear';
	ae(otherwrapDiv, clearDiv)

	var wrapDiv = ce('div', {id:'melee'});
	wrapDiv.style.cssFloat = 'left';
	ae(otherwrapDiv, wrapDiv);
	var wrapDiv = ce('div', {id:'ranged'});
	wrapDiv.style.cssFloat = 'left';
	ae(otherwrapDiv, wrapDiv);

	var clearDiv = ce('div');
	clearDiv.className = 'clear';
	ae(otherwrapDiv, clearDiv)

	var wrapDiv = ce('div', {id:'spell'});
	wrapDiv.style.cssFloat = 'left';
	ae(otherwrapDiv, wrapDiv);
	var wrapDiv = ce('div', {id:'bonus damage'});
	wrapDiv.style.cssFloat = 'left';
	ae(otherwrapDiv, wrapDiv);

	var clearDiv = ce('div');
	clearDiv.className = 'clear';
	ae(otherwrapDiv, clearDiv)
	ae(ge('text'), otherwrapDiv)

	addDummyData();
}

function parseReputation(repInfo) {
	var factionIds = {'argentdawn':529,'ashtonguedeathsworn':1012,'bloodsailbuccaneers':87,'bootybay':21,'broodofnozdormu':910,'cenarioncircle':609,'cenarionexpedition':942,'darkmoonfaire':909,'darkspeartrolls':530,'darnassus':69,'everlook':577,'exodar':930,'frostwolfclanforces':729,'gadgetzan':369,'gelkisclancentaur':92,'gnomereganexiles':54,'honorhold':946,'hydraxianwaterlords':749,'ironforge':47,'keepersoftime':989,'kurenai':978,'lowercity':1011,'magramclancentaur':93,'netherwing':1015,'ogri\'la':1038,'orgrimmar':76,'ratchet':470,'ravenholdt':349,'sha\'tariskyguard':1031,'shatteredsunoffensive':1077,'shen\'dralar':809,'silvermooncity':911,'silverwingsentinels':890,'sporeggar':970,'stormpikeguard':730,'stormwind':72,'syndicate':70,'thealdor':932,'theconsortium':933,'thedefilersforces':510,'theleagueofarathor':509,'themag\'har':941,'thescaleofthesands':990,'thescryers':934,'thesha\'tar':935,'thevioleteye':967,'thoriumbrotherhood':59,'thrallmar':947,'thunderbluff':81,'timbermawhold':576,'tranquillien':922,'undercity':68,'warsongoutridersforces':889,'wildhammerclan':471,'wintersabertrainers':589,'zandalartribe':270};
	repCats = repInfo.page.characterInfo.reputationTab.factionCategory;
	var table = ce('table');
	table.className = 'repText';

	for(var x in repCats) {
		var tr = ce('tr');
		tr.id = repCats[x].key+'_'+repCats[x].faction.length;
		var td = ce('td');
		td.colSpan = 2;
		td.style.textAlign='center'; 
		td.style.borderBottom = '1px solid #777';
		var a = ce('a');
		a.style.textDecoration = 'none';
		a.href = 'javascript:;';
		a.addEventListener('click', function(evt) { 
			for(var x=0; x<evt.target.parentNode.parentNode.id.split('_')[1]; x++) {
				var _ = ge(evt.target.parentNode.parentNode.id.split('_')[0]+'_'+x);
				if(_.style.display == 'none') {
					_.style.display = '';
				} else { 
					_.style.display = 'none';
				}
			}
		}, false);
		ae(a, ct(repCats[x].name));
		ae(td, a);
		ae(tr, td)
		ae(table, tr);
		for(var i in repCats[x].faction) {
			var tr = ce('tr');
			if(x > 0) { tr.style.display = 'none'; }
			tr.id = repCats[x].key+'_'+i;
			var td = ce('td');
			var td2 = ce('td');
			td.className = 'name';
			td.id = repCats[x].faction[i].key;
			td2.className = 'rep';
			var a = ce('a');
			a.href = 'http://www.wowhead.com/?faction='+factionIds[repCats[x].faction[i].key];
			a.style.textDecoration = 'none';
			ae(a, ct(repCats[x].faction[i].name));
			ae(td, a);
			
			var repBar = ce('div');
			var repBarBG = ce('div');
			var repBarText = ce('div');
			repBarText.style.color = 'black';
			repBarText.style.position = 'absolute';
			repBarText.style.padding = 'auto';
			repBarText.style.width = '100%';
			repBarText.style.height = '12px';
			repBarBG.style.position = 'absolute';
			repBarBG.style.height = '12px';
			repBar.className = 'repBar';
			if(repCats[x].faction[i].reputation < -6000) { repBarBG.className = 'hated'; }
			else if(repCats[x].faction[i].reputation < -3000) { repBarBG.className = 'hostile'; }
			else if(repCats[x].faction[i].reputation < 0) { repBarBG.className = 'unfriendly'; }	
			else if(repCats[x].faction[i].reputation < 3000) { repBarBG.className = 'neutral'; }	
			else if(repCats[x].faction[i].reputation < 9000) { repBarBG.className = 'friendly'; }
			else if(repCats[x].faction[i].reputation < 21000) { repBarBG.className = 'honored'; }
			else if(repCats[x].faction[i].reputation < 42000) { repBarBG.className = 'revered'; }
			else { repBarBG.className = 'exalted'; }
			var old_reputation = parseFloat(repCats[x].faction[i].reputation);
			if(repCats[x].faction[i].reputation < -6000) { var adjusted_reputation = old_reputation + 42000; }
			else if(repCats[x].faction[i].reputation < -3000) { var adjusted_reputation = old_reputation + 6000; }
			else if(repCats[x].faction[i].reputation < 0) { var adjusted_reputation = old_reputation + 3000; }	
			else if(repCats[x].faction[i].reputation < 3000) { var adjusted_reputation = old_reputation; }	
			else if(repCats[x].faction[i].reputation < 9000) { var adjusted_reputation = old_reputation - 3000; }
			else if(repCats[x].faction[i].reputation < 21000) { var adjusted_reputation = old_reputation - 9000; }
			else if(repCats[x].faction[i].reputation < 42000) { var adjusted_reputation = old_reputation - 21000; }
			else { var adjusted_reputation = old_reputation - 42000; }
			if(repCats[x].faction[i].reputation < -6000) { var rep_cap = 36000 }
			else if(repCats[x].faction[i].reputation < -3000) { var rep_cap = 3000; }
			else if(repCats[x].faction[i].reputation < 0) { var rep_cap = 3000; }	
			else if(repCats[x].faction[i].reputation < 3000) { var rep_cap = 3000; }	
			else if(repCats[x].faction[i].reputation < 9000) { var rep_cap = 6000; }
			else if(repCats[x].faction[i].reputation < 21000) { var rep_cap = 12000; }
			else if(repCats[x].faction[i].reputation < 42000) { var rep_cap = 21000; }
			else { var rep_cap = 1000; }
			
			repBarBG.style.width = (adjusted_reputation/rep_cap)*100+'%';

			ae(repBarText, ct(adjusted_reputation+'/'+rep_cap))
			ae(repBar, repBarBG);
			ae(repBar, repBarText);
			ae(td2, repBar);
			ae(tr, td)
			ae(tr, td2)
			ae(table, tr);
		}
	}
	ae(ge('rep_Content'), table)
}

function getGuildInfo(armory_serv, realm, gname,region) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://"+armory_serv+"/guild-info.xml?r="+realm+"&n="+gname+"&p=1",
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var xml = xml2array(dom)['#document'];
			addGuildInfo(xml.page.guildInfo.guild.members, xml.page.guildKey.name,region)
		}
	});
}

function addGuildInfo(guild, guild_name,region) {
				guild.character.sort(function(a,b){return a.rank - b.rank})
				unsafeWindow.gm_guildName = guild_name
				unsafeWindow.gm_guildInfo = guild.character
				unsafeWindow.gm_guildPage = 0;
				unsafeWindow.gm_guildMaxPages = Math.floor(guild.character.length/20);
				unsafeWindow.gm_guildRegion = region;
				
				var pageSpan = ce('span');
				var prevPageSpan = ce('span');
				var nextPageSpan = ce('span');
				var prevPage = ce('a');
				var nextPage = ce('a');
				var prevDiv = ce('div');
				var nextDiv = ce('div');
				var prevBlock = ce('blockquote');
				var nextBlock = ce('blockquote');
				var prevI = ce('i');
				var nextI = ce('i');
				var prevSpan = ce('span');
				var nextSpan = ce('span');
				pageSpan.id = 'guild_pageSpan';
				prevPage.id = 'guild_prevPage';
				nextPage.id = 'guild_nextPage';
				nextPageSpan.style.cssFloat = 'right';
				prevPageSpan.style.cssFloat = 'left';
				nextPageSpan.style.width = '50px';
				prevPageSpan.style.width = '52px';
				nextPage.style.marginLeft = '0px';
				prevPage.style.marginLeft = '0px';
				prevPage.className = 'button-red';
				nextPage.className = 'button-red';
				prevPage.style.textDecoration = 'none';
				nextPage.style.textDecoration = 'none';
				prevPage.href = 'javascript:;';
				nextPage.href = 'javascript:;';
				prevPage.addEventListener('click', function() { if(unsafeWindow.gm_guildPage-1>=0) unsafeWindow.displayGuildPage(unsafeWindow.gm_guildPage-1); }, false);
				nextPage.addEventListener('click', function() { if(unsafeWindow.gm_guildPage+1<=unsafeWindow.gm_guildMaxPages) unsafeWindow.displayGuildPage(unsafeWindow.gm_guildPage+1); }, false);

				ae(prevPage, prevDiv);
				ae(nextPage, nextDiv);
				ae(prevDiv, prevBlock);
				ae(nextDiv, nextBlock);
				ae(prevBlock, prevI);
				ae(nextBlock, nextI);
				ae(prevI, ct('Prev'));
				ae(nextI, ct('Next'));
				ae(prevSpan, ct('Prev'));
				ae(nextSpan, ct('Next'));
				ae(prevDiv, prevSpan);
				ae(nextDiv, nextSpan);
				ae(prevPageSpan, prevPage);
				ae(nextPageSpan, nextPage);
				ae(ge('guild_Footer'), prevPageSpan);
				ae(ge('guild_Footer'), nextPageSpan);
				ae(ge('guild_Footer'), pageSpan);
				
				unsafeWindow.displayGuildPage(0)
}

unsafeWindow.displayGuildPage = function(page) {
				if (page == 0 && page == unsafeWindow.gm_guildMaxPages) {
					ge('guild_prevPage').className = ge('guild_prevPage').className + ' button-red-disabled';
					ge('guild_nextPage').className = ge('guild_nextPage').className + ' button-red-disabled';
				} else if (page == 0) {
					ge('guild_prevPage').className = ge('guild_prevPage').className + ' button-red-disabled';
					ge('guild_nextPage').className = 'button-red';
				} else if (page == unsafeWindow.gm_guildMaxPages) {
					ge('guild_prevPage').className = 'button-red';
					ge('guild_nextPage').className = ge('guild_nextPage').className + ' button-red-disabled';
				} else {
					ge('guild_prevPage').className = 'button-red';
					ge('guild_nextPage').className = 'button-red';
				}
				ge('guild_Content').innerHTML = '';
				var table = ce('table');
				table.className = 'guildText';
				var tr = ce('tr');
				var td = ce('td');
				td.colSpan = 3;
				td.style.textAlign='center'; 
				td.style.borderBottom = '1px solid #777';
				ae(td, ct(unsafeWindow.gm_guildName));
				ae(tr, td)
				ae(table, tr);
				
				var min = (0+(page*20));
				var max = (20+(20*page));
				if (max > unsafeWindow.gm_guildInfo.length)
					max = unsafeWindow.gm_guildInfo.length;
				for(y=min; y<max; y++) {
					var tr = ce('tr');
					var td = ce('td');
					var td2 = ce('td');
					var td3 = ce('td');
					td.width = '50%';
					td2.width = '5%';
					td3.width = '45%';
					td3.className = 'other';
					var a = ce('a');
					a.className = unsafeWindow.gm_guildInfo[y].class.toLowerCase();
					a.style.textDecoration = 'none';
					a.href = '?char&'+unsafeWindow.gm_guildInfo[y].url+'&s='+unsafeWindow.gm_guildRegion;
					ae(a, ct(unsafeWindow.gm_guildInfo[y].name))
					ae(td, a);
					ae(td2, ct(unsafeWindow.gm_guildInfo[y].level));
					ae(td3, ct('Rank '+unsafeWindow.gm_guildInfo[y].rank));
					ae(tr, td)
					ae(tr, td2)
					ae(tr, td3)
					ae(table, tr);
				}
				ae(ge('guild_Content'), table)
				unsafeWindow.gm_guildPage = page;
				ge('guild_pageSpan').innerHTML = 'Page '+(page+1);
}
function cacheItem(id, realm, name, slot, armory_serv) {
	GM_xmlhttpRequest({
	method: 'GET',
	url: "http://"+armory_serv+"/item-tooltip.xml?i="+id+"&r="+realm+"&n="+name,
	headers: {"User-Agent":"ok"},
	onload: function(responseDetails) {
			GM_xmlhttpRequest({
			tooltip: responseDetails.responseText.replace(/src="/g, "src=\"http://"+armory_serv+"/"),
			method: 'GET',
			url: "http://www.wowhead.com/?item="+id+"&xml",
			headers: {"Content-Type":"text/html","Accept-Encoding":"text/html"},
			onload: function(responseDetails) {
					var parser = new DOMParser();
					var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
					var xml = xml2array(dom)['#document'];
					this.tooltip = this.tooltip.replace(/http:\/\/www.wowarmory.com\/images\/icons\/21x21\/(.*).png/g, 'http://static.wowhead.com/images/icons/tiny/$1.gif');
					this.tooltip = this.tooltip.replace(/http:\/\/eu.wowarmory.com\/images\/icons\/21x21\/(.*).png/g, 'http://static.wowhead.com/images/icons/tiny/$1.gif');
					this.tooltip = this.tooltip.replace(/<br>\n<br>\n<span class="tooltipContentSpecial" style="float: left;">[\s\S]*<\/div>/g, '</div');
					unsafeWindow.g_items[id]=[xml.wowhead.item.icon['#text'],this.tooltip];
					ge(slot).innerHTML = '';
					icon = document.createElement('img');
					aM(icon, this.tooltip);
					icon.src = 'http://static.wowhead.com/images/icons/small/'+xml.wowhead.item.icon['#text'].toLowerCase()+'.jpg';
					icon.addEventListener('click', function() { GM_openInTab('http://www.wowhead.com/?item='+id); }, false);
					icon.className = 'myIcon'+xml.wowhead.item.quality['#text'];
					icon.style.cssFloat = icon.style.styleFloat = 'left';
					ae(ge(slot), icon);
					
					var _slot = xml.wowhead.item.inventorySlot.id;
					var displayId = xml.wowhead.item.icon.displayId;
					ItemList.push({slot:_slot,displayId:displayId});
					updateModel.process();
				}
			});

		}
	})
}
aS('#character #image { float:left; margin-top:0px; margin-right:2px; border:1px solid #777; background:#000; width:64px; height:64px; padding:3px; }\n'+
'#character h1, #character h2, #character h3 { float:left; margin-left:2px; }\n'+
'#character h1 { padding: 0px 4px 0px 4px; margin-bottom: 0px; margin-right: 2px; min-width: 100%;}\n'+
'#character h3 { margin:2px; padding:6px 10px 6px 10px; border:1px solid #777;}\n'+
'#character h3#level { min-width: 28px; line-height: 14px; text-align: center; background:#161616; margin-left: -38px; margin-top: 40px; font-size: 14px; padding:1px 4px 1px 4px;}\n'+
'#level2 { font-size: 14px; min-width: 28px; }\n'+
'#spec { font-size: 8px; min-width: 28px; }\n'+
'#CharInfoDiv { background: #161616; min-width:194px; padding:3px 0px 0px 0px; min-height:67px; border:1px solid #777; }\n'+
'#character h3#name { border:0px; font-size: 18px; margin: 0px; padding: 2px 10px 3px; }\n'+
'#character h3#guild { border:0px;  font-size: 9px; margin: 2px 0px; padding: 1px 10px; }\n'+
'#character h3#server { border:0px;  font-size: 9px; margin: 0px; padding: 0px 10px; }\n'+
'#character h3 small { color:#888; margin-left:5px; padding: 0px; }\n'+
'#character h3 a { text-decoration:none; color:white; }\n'+
'#character h3 a:hover { text-decoration:underline; }\n'+
'#character.warrior h2 { background-position:0px 0px; }\n'+
'#character.mage h2 { background-position:-36px 0px; }\n'+
'#character.rogue h2 { background-position:-72px 0px; }\n'+
'#character.druid h2 { background-position:-108px 0px; }\n'+
'#character.hunter h2 { background-position:-144px 0px; }\n'+
'#character.shaman h2 { background-position:-180px 0px; }\n'+
'#character.priest h2 { background-position:-216px 0px; }\n'+
'#character.warlock h2 { background-position:-252px 0px; }\n'+
'#character.paladin h2 { background-position:-288px 0px; }\n'+
'#text { height:1000px; }'+
'#character h2 { clear:none; float:left; padding: 0px; margin:0px; display:block; width:36px; height:36px; background:url(http://img88.imageshack.us/img88/5176/classesmediumhg0.jpg); float:left; border:1px solid #777; margin-top:0px; }\n'+
'#health, #mana { padding: 0px; width:110px; background:#0E5602; height:18px; font-weight:bold; font-size:11px; text-align:center; border:1px solid #777; margin:0px; }\n'+
'#mana.m { background:#2A2A70; margin-top: 2px; margin-bottom:2px; }\n'+
'#mana.e { background:#5C5F01; margin-top: 2px; margin-bottom:2px; }\n'+
'#mana.r { background:#851B1B; margin-top: 2px; margin-bottom:2px; }\n'+
'#mana.m:hover{border:1px solid #00a8ff;}'+
'#mana.r:hover{border:1px solid #ff0000;}'+
'#mana.e:hover{border:1px solid #fcff00;}'+
'#health:hover{border:1px solid #7eff00;}'+
'#items { margin-left: 0px; margin-top: 0px; }'+
'#guildDiv { float:left; width: 162px; height: 350px; margin-right: 2px; margin-bottom: 2px; }'+
'.guildClass { background: #161616; width: 155px; min-height: 300px; float:left; border:1px solid #777; }'+
'#guild_Content { padding:5px 1px 0px 4px; margin-right: 2px; margin-top: -1px; }'+
'#guild_Header { text-align: center; font-weight:bold; background: #1D1D1D; float:left; width: 160px; padding:0px 0px 0px 0px; min-height:18px; border:1px solid #777; position:relative; margin-right: 2px; }'+
'#guild_Footer { margin-top: -1px; text-align: center; background: #1D1D1D; float:left; width: 150px; padding:0px 5px 0px 5px; height:22px; border:1px solid #777; position:relative; margin-right: 2px; }'+
'#repDiv { float:left; width: 162px; height: 350px; margin-right: 2px; margin-bottom: 2px; }'+
'.repClass { background: #161616; width: 155px; min-height: 323px; float:left; border:1px solid #777; }'+
'#rep_Content { padding:5px 1px 0px 4px; margin-right: 2px; margin-top: -1px; }'+
'#rep_Header { text-align: center; font-weight:bold; background: #1D1D1D; float:left; width: 160px; padding:0px 0px 0px 0px; min-height:18px; border:1px solid #777; position:relative; margin-right: 2px; }'+
'table.repText { width: 150px; line-height: normal; border-collapse:collapse; margin:1px; font-size:9px; }'+
'table.repText td.name { color:#FC5; text-align: left;}\n'+
'table.repText td.rep { text-align: right;}\n'+
'.repBar { position: relative; background-color: #555; float:right; border:1px solid #777; text-align: center; width: 52px; height: 12px; }'+
'#modelDiv { float:left; width: 306px; height: 250px; }'+
'#model_window { padding:0px 0px 0px 0px; margin-right: 2px; margin-top: -1px; border:1px solid #777; float:left; background: #161616; width:300px; height:250px; }'+
'#model_header { text-align: center; font-weight:bold; background: #1D1D1D; float:left; width: 300px; padding:0px 0px 0px 0px; min-height:20px; border:1px solid #777; position:relative; margin-right: 2px; }'+
'#arenaDiv { float:left; width: 356px; height: 200px; margin-right: 2px; margin-bottom: 2px; }'+
'.arenaTeam { background: #161616; width: 110px; min-height: 198px; float: left; border:1px solid #777; }'+
'#arena2v2 { padding:5px 0px 0px 5px; margin-right: 2px; margin-top: -1px; }'+
'#arena3v3 { padding:5px 0px 0px 5px; margin-right: 2px; margin-top: -1px; width: 111px; }'+
'#arena5v5 { padding:5px 0px 0px 5px; margin-right: 0px; margin-top: -1px; }'+
'#arena2v2_header { text-align: center; font-weight:bold; background: #1D1D1D; float:left; width: 115px; padding:0px 0px 0px 0px; min-height:20px; border:1px solid #777; position:relative; margin-right: 2px; }'+
'#arena3v3_header { text-align: center; font-weight:bold; background: #1D1D1D; float:left; width: 116px; padding:0px 0px 0px 0px; min-height:20px; border:1px solid #777; position:relative; margin-right: 2px; }'+
'#arena5v5_header { text-align: center; font-weight:bold; background: #1D1D1D; float:left; width: 115px; padding:0px 0px 0px 0px; min-height:20px; border:1px solid #777; position:relative; margin-right: 0px;}'+
'#talentDiv{ float:left; width: 466px; height: 350px; margin-right: 2px; margin-bottom: 1px; }'+
'#talentCollapse{ display:none; clear:both; background: #161616; float:right; min-width:10px; min-height:10px; border:1px solid #777; position:relative; margin-left: -12px; z-index:9;}'+
'#talentDiv_0{ background: #161616; float:right; min-width:154px; padding:0px; min-height:328px; border:1px solid #777; margin-top: -1px; position:relative; }'+
'#talentDiv_1{ background: #161616; float:right; min-width:154px; padding:0px; min-height:328px; border:1px solid #777; margin-top: -1px; margin-left:-1px; position:relative; }'+
'#talentDiv_2{ background: #161616; float:right; min-width:154px; padding:0px; min-height:328px; border:1px solid #777; margin-top: -1px; margin-left:-1px; position:relative; }'+
'#talentDiv_0_header{ text-align: center; font-weight:bold; background: #1D1D1D; float:right; min-width:154px; padding:0px; min-height:18px; border:1px solid #777; position:relative; }'+
'#talentDiv_1_header{ text-align: center; font-weight:bold; background: #1D1D1D; float:right; min-width:154px; padding:0px; min-height:18px; border:1px solid #777; margin-left:-1px; position:relative; }'+
'#talentDiv_2_header{ text-align: center; font-weight:bold; background: #1D1D1D; float:right; min-width:154px; padding:0px; min-height:18px; border:1px solid #777; margin-left:-1px; position:relative; }'+
'#guild_pageSpan{ font-size:10px; }'+
'#spacerDiv{ min-width: 1px; height: 118px; }'+
'a:active.button-red-disabled i { left: -1px; }'+
'.myIcon{ width:18px; height:18px; margin: 0px 0px 2px 2px; border: 1px solid #444; }'+
'.myIcon:hover{ border:1px solid #666; }'+
'.myIconPoor{ width:18px; height:18px; margin: 0px 0px 2px 2px; border: 1px solid #777; }'+
'.myIconPoor:hover{ border:1px solid #BBB; }'+
'.myIconCommon{ width:18px; height:18px; margin: 0px 0px 2px 2px; border: 1px solid #DDD; }'+
'.myIconCommon:hover{ border:1px solid #FFF; }'+
'.myIconUncommon{ width:18px; height:18px; margin: 0px 0px 2px 2px; border: 1px solid #009900; }'+
'.myIconUncommon:hover{ border:1px solid #00CC00; }'+
'.myIconRare{ width:18px; height:18px; margin: 0px 0px 2px 2px; border: 1px solid #0050DD; }'+
'.myIconRare:hover{ border:1px solid #0077FF; }'+
'.myIconEpic{ width:18px; height:18px; margin: 0px 0px 2px 2px; border: 1px solid #8822CC; }'+
'.myIconEpic:hover{ border:1px solid #A335EE; }'+
'.myIconLegendary{ width:18px; height:18px; margin: 0px 0px 2px 2px; border: 1px solid #EE8800; }'+
'.myIconLegendary:hover{ border:1px solid #DDAA00; }'+
'#text{ min-height:550px; }'+
'#buffwrap { background-color: #161616; width:42px; height: 465px; border:1px solid #777; float:left; margin-right:2px;}\n'+
'#otherwrap { float:left; height: 467px; }'+
'table.guildText { width: 150px; line-height: normal; border-collapse:collapse; margin:1px; font-size:9px; }'+
'table.guildText td.grey { text-align:left; color:#888; }\n'+
'table.guildText td.other { color:#FC5; text-align: right;}\n'+
'table.arenaTeamText { width: 105px; line-height: normal; float:left; border-collapse:collapse; margin:1px; font-size:9px; }'+
'table.arenaTeamText td.grey { text-align:left; color:#888; }\n'+
'table.arenaTeamText td.other { color:#FC5; text-align: right;}\n'+
'.tooltip { max-width:350px; }'+
'#loading { text-align:center; width:100%; height:11px; background:transparent url(http://static.wowhead.com/images/loading.gif) no-repeat scroll center top; }'+
'div.header { background:#1D1D1D; border:1px solid #777; padding:0px 0px 5px 0px; font-size:10px; margin-bottom:-2px; text-align:center; height:15px; width:150px;}'+
'table.stats { height: 94px; width: 151px; line-height: normal; float:left; border-collapse:collapse; margin:1px; margin-right:2px; margin-bottom:2px; border:1px solid #777; font-size:9px; }\n'+
'table.stats th { background:#1D1D1D; border-bottom:1px solid #777; padding:0px;}\n'+
'table.stats td { height: 14px; padding:0px 6px; color:#FC5; font-weight:bold; text-align: right;}\n'+
'table.stats tr { height: 13px; background:#161616; }\n'+
'table.stats td.first { text-align:left; padding-right:0; color:#888; font-weight:normal; }\n'+
'div.header2 { background:#1D1D1D; border:1px solid #777; padding:0px 0px 5px 0px; font-size:10px; margin-bottom:-2px; text-align:center; height:15px; width:154px;}'+
'table.stats2 { height: 94px; width: 155px; line-height: normal; float:left; border-collapse:collapse; margin:1px; margin-right:2px; margin-bottom:2px; border:1px solid #777; font-size:9px; }\n'+
'table.stats2 th { background:#1D1D1D; border-bottom:1px solid #777; padding:0px;}\n'+
'table.stats2 td { margin-top:4px; padding:0px 6px; color:#FC5; font-weight:bold; text-align: right;}\n'+
'table.stats2 tr { height: 14px; background:#161616; }'+
'table.stats2 td.first { text-align:left; padding-right:0; color:#888; font-weight:normal; }\n'+
'.screenParent { padding: 0px 10px 10px 10px; background-color: #404040; }'+
'.screenParentTop { background-color: #404040; padding: 5px 12px; font-size: 16px; text-align: center; font-weight: bold; }'+
'.screen { min-height: 250px; background: url(http://img337.imageshack.us/img337/7312/49346454ft5.jpg); background-position: 0px 0px; }'+
'.screen2 { min-height: 70px; background: #181818; background-position: 0px 0px; }'+
//'.screen { min-height: 250px; background: url(http://img440.imageshack.us/img440/8821/sappoverlaytx6.jpg); background-position: -500px -700px; }'+
'.screenTop { padding: 0px 10px; background-color: #303030; font-size: 13px; text-align: left; }'+
'.screenSub { padding: 0px 5px; background-color: #181818; font-size: 10px; padding-bottom: 5px; }'+
'.screenFoot { padding: 0px 10px; background-color: #282828; font-size: 12px; text-align: center; }'+
'.myItemName{font-size:13px;}'+
'.myClearLeft{clear:left;}'+
'.myClear{clear:right;}'+
'.myGold{color:#e5cc80;}'+
'.myOrange{color:#ff8000;}'+
'.myPurple{color:#A335EE;}'+
'.myBlue{color:#0070DD;}'+
'.myGray{color:#c9c9c9;}'+
'.myGreen{color:#00FF00;}'+
'.myYellow{color:#ffd517;}'+
'.myRed{color:#d80000;}'+
'.myWhite{color:#ffffff;}'+
'.myTable{max-width:290px;color:#FFFFFF;font-size:12px;position:relative;font-family:Verdana,sans-serif;}'+
'.exalted { background-color:cyan; }'+
'.revered { background-color:#00ffcc; }'+
'.honored { background-color:#00ff88; }'+
'.friendly { background-color:lime }'+
'.neutral { background-color:yellow }'+
'.unfriendly { background-color:#ee6622; }'+
'.hostile { background-color:red }'+
'.hated { background-color:#cc2222; }'+
'.socketImg{width:14px;height:14px;vertical-align:-20%;margin:0 7px 0 0;padding:0;}'+
'.tooltipRight{position:relative;float:right;clear:right;margin: 0 0 0 4px;}'+
'.bonusGreen{color:#00FF00;}'+
'.myBlueGem{color:#666666;display:block;background:url(blue-mini.gif) no-repeat 3px 4px;padding-left:19px;}'+
'.myMetaGem{color:#666666;display:block;background:url(meta-mini.gif) no-repeat 3px 4px;padding-left:19px;}'+
'.myOrangeGem{color:#666666;display:block;background:url(orange-mini.gif) no-repeat 3px 4px;padding-left:19px;}'+
'.myPurpleGem{color:#666666;display:block;background:url(purple-mini.gif) no-repeat 3px 4px;padding-left:19px;}'+
'.myRedGem{color:#666666;display:block;background:url(red-mini.gif) no-repeat 3px 4px;padding-left:19px;}'+
'.myYellowGem{color:#666666;display:block;background:url(yellow-mini.gif) no-repeat 3px 4px;padding-left:19px;}'+
'.setNameYellow{color:#ffd517;font-size:11px;}'+
'.setItemIndent {display:inline;}'+
'.setItemIndent span{margin-left:9px;}'+
'.setItemYellow{color:#f8ffa8;}'+
'.setItemGray{color:#787880;}'+
'.druid { color: #FF7D0A; }'+
'.hunter { color: #ABD473; }'+
'.mage { color: #69CCF0; }'+
'.paladin { color: #F58CBA; }'+
'.priest { color: #FFFFFF; }'+
'.rogue { color: #FFF569; }'+
'.shaman { color: #2459FF; }'+
'.warlock { color: #9482CA; }'+
'.warrior { color: #C79C6E; }'+
'.arrowDown{ background: url(http://static.wowhead.com/talent/images/arrows/down.png) left bottom }'+
'.arrowDown2{ background: url(http://static.wowhead.com/talent/images/arrows/down2.png) left bottom }'+
'.arrowLeftDown_left{ background: url(http://static.wowhead.com/talent/images/arrows/leftdown.png) left top }'+
'.arrowLeftDown_down{ background: url(http://static.wowhead.com/talent/images/arrows/down.png) left bottom }'+
'.arrowLeftDown_left2{ background: url(http://static.wowhead.com/talent/images/arrows/leftdown2.png) left top }'+
'.arrowLeftDown_down2{ background: url(http://static.wowhead.com/talent/images/arrows/down2.png) left bottom }'+
'.arrowRightDown_right{ background: url(http://static.wowhead.com/talent/images/arrows/rightdown.png) right bottom }'+
'.arrowRightDown_down{ background: url(http://static.wowhead.com/talent/images/arrows/down.png) left bottom }'+
'.arrowRightDown_right2{ background: url(http://static.wowhead.com/talent/images/arrows/rightdown2.png) right bottom }'+
'.arrowRightDown_down2{ background: url(http://static.wowhead.com/talent/images/arrows/down2.png) left bottom }'+
'.arrowRight{ background: url(http://static.wowhead.com/talent/images/arrows/right.png) right bottom }'+
'.arrowRight2{ background: url(http://static.wowhead.com/talent/images/arrows/right2.png) right bottom }'+
'.arrowLeft{ background: url(http://static.wowhead.com/talent/images/arrows/left.png) left top }'+
'.arrowLeft2{ background: url(http://static.wowhead.com/talent/images/arrows/left2.png) left top }'+
'.error{color:red; font-weight:bold; text-align:center; width:100%; }'
);
function stats(title,list,x){
	var div = ce('div');
	if(x==1) { div.className = 'header2'; } else { div.className = 'header'; }
	ae(div, ct(title));
	ae(ge(title.toLowerCase()),div);
	
	var table = ce('table');
	if(x==1) { table.className = 'stats2 base'; } else { table.className = 'stats base'; }
	ae(ge(title.toLowerCase()),table)
	for(i in list) {
	  	var tr = ce('tr');
	  	var td = ce('td');
	  	var td2 = ce('td');
	  	td.className = 'first';
		ae(td, ct(i.charAt(0).toUpperCase()));
		ae(td, ct(i.substr(1).replace(/([A-Z])/g," $1")));
		var text = list[i].toString();
		if(i == 'speed') { ae(td2, ct(text)); } else { ae(td2, ct(text.replace(/\.00(?!%)/,''))); }
	  	ae(tr, td)
	  	ae(tr, td2)
	  	ae(table, tr);
	}
	if(title.toLowerCase()=='spell'){
	  	var tr = ce('tr');var td = ce('td');var td2 = ce('td');
	  	td.innerHTML = '&nbsp';
		td2.innerHTML = '&nbsp';
	  	ae(tr, td);ae(tr, td2);ae(table, tr);
	}
};
function baseStats(cI){
	var i,t = {strength:'', agility:'', stamina:'', intellect:'', spirit:'', armor:''};
	for(i in t) t[i] = cI.characterTab.baseStats[i][t[i]||'effective'];
	stats("Base Stats",t,1);
}
function melee(cI){
	var i,t = {damage:'~', speed:'~', power:'effective', hitRating:'', critChance:'percent', expertise:''};
	for(i in t) if(t[i]!='~') t[i] = cI.characterTab.melee[i][t[i]||'value'];
	t.damage = cI.characterTab.melee.mainHandDamage.min+'-'+cI.characterTab.melee.mainHandDamage.max;
	var offhand = false;
	for(var x in cI.characterTab.items.item) { if(cI.characterTab.items.item[x].slot == '16') { offhand = true; if(cI.characterTab.melee.offHandDamage.min == 0) { offhand = false; } break; } };
	if(offhand) { t.damage += '/'+cI.characterTab.melee.offHandDamage.min+'-'+cI.characterTab.melee.offHandDamage.max; }
	t.speed = cI.characterTab.melee.mainHandSpeed.value;
	if(offhand) { t.speed += '/'+cI.characterTab.melee.offHandSpeed.value; }
	t.critChance += '%';
	stats("Melee",t,1);
};
function ranged(cI){
	var i,t = {damage:'~', speed:'', power:'effective', hitRating:'', critChance:'percent', weaponSkill:''};
	for(i in t) if(t[i]!='~') t[i] = cI.characterTab.ranged[i][t[i]||'value'];
	if(t.weaponSkill*1<0) t.weaponSkill = "N/A";
	t.damage = cI.characterTab.ranged.damage.min+'-'+cI.characterTab.ranged.damage.max;
	t.critChance += '%';
	stats("Ranged",t);
};
function spell(cI){
	var i,t = {bonusHealing:'', hitRating:'', penetration:'', manaRegen:'notCasting', mp5:'~'};
	for(i in t) if(t[i]!='~') t[i] = cI.characterTab.spell[i][t[i]||'value'];
	t.mp5 = cI.characterTab.spell['manaRegen']['casting'];
	stats("Spell",t,1);
};
function damage(cI){
	var i,t = {holy:'', arcane:'', fire:'', nature:'', frost:'', shadow:''};
	for(i in t) t[i] = cI.characterTab.spell.bonusDamage[i][t[i]||'value'] + ' ('+cI.characterTab.spell.critChance[i][t[i]||'percent']+'%)';
	stats("Bonus Damage",t);
};
function defense(cI){
	var i,t = {armor:'effective', defense:'value', dodge:'', parry:'', block:'', resilience:'value'};
	for(i in t) t[i] = (t[i])?cI.characterTab.defenses[i][t[i]]:cI.characterTab.defenses[i].percent + '%';
	stats("Defense",t);
};
function getTalentDescription(_67) {
    var _69 = _67.d;
    var _6a = Math.max(0, _67.k - 1);
    for (var i = 0; i < _67.length; ++i) {
        var _6c = _69.split("$");
        var _6d = _6c.length;
        if (_6d-- == 1) {
            continue;
        }
        _69 = _6c[0];
        if (_67[i].length) {
            _69 += _67[i][Math.min(_6a, _67[i].length - 1)];
        } else {
            _69 += Math.round(_67[i] * (_6a + 1) * 100) / 100;
        }
        for (var j = 1; j < _6d; ++j) {
            _69 += _6c[j] + "$";
        }
        _69 += _6c[_6d];
    }
    return _69;
}

ConfigView = new function() {
	function onShow(dest, first, opt) {
		unsafeWindow.Lightbox.setSize(510, 305);
		if(first) {
			var screenParent = ce('div');
			screenParent.className = 'screenParent';
			var screenParentTop = ce('div');
			screenParentTop.className = 'screenParentTop';
			screenParentTop.innerHTML = 'Character Config';
			ae(dest, screenParentTop);
			ae(dest, screenParent);


			var screen = ce('div');
			screen.className = 'screen';
			ae(screenParent, screen);


			var screenTop = ce('div');
			screenTop.className = 'screenTop';
			screenTop.innerHTML = 'Talents';
			var screenSub = ce('div');
			screenSub.className = 'screenSub';
			ae(screen, screenTop);
			ae(screen, screenSub);
			
			ae(screenSub, ct('Display: '))
			var input = document.createElement('input');
			input.type = 'checkbox';
			input.id = 'talent_show';
			input.checked = unsafeWindow.config.talent.show;
			ae(screenSub, input);
			
			var screenTop = ce('div');
			screenTop.className = 'screenTop';
			screenTop.innerHTML = 'Guild';
			var screenSub = ce('div');
			screenSub.className = 'screenSub';
			ae(screen, screenTop);
			ae(screen, screenSub);
			
			ae(screenSub, ct('Display: '))
			var input = document.createElement('input');
			input.type = 'checkbox';
			input.id = 'guild_show';
			input.checked = unsafeWindow.config.guild.show;
			ae(screenSub, input);
			
			var screenTop = ce('div');
			screenTop.className = 'screenTop';
			screenTop.innerHTML = 'Arena Teams';
			var screenSub = ce('div');
			screenSub.className = 'screenSub';
			ae(screen, screenTop);
			ae(screen, screenSub);
			
			ae(screenSub, ct('Display: '))
			var input = document.createElement('input');
			input.type = 'checkbox';
			input.id = 'arena_show';
			input.checked = unsafeWindow.config.arena.show;
			ae(screenSub, input);
			
			var screenTop = ce('div');
			screenTop.className = 'screenTop';
			screenTop.innerHTML = 'Reputation';
			var screenSub = ce('div');
			screenSub.className = 'screenSub';
			ae(screen, screenTop);
			ae(screen, screenSub);
			
			ae(screenSub, ct('Display: '))
			var input = document.createElement('input');
			input.type = 'checkbox';
			input.id = 'rep_show';
			input.checked = unsafeWindow.config.rep.show;
			ae(screenSub, input);
			
			
			var screenTop = ce('div');
			screenTop.className = 'screenTop';
			screenTop.innerHTML = '3D Model Viewer';
			var screenSub = ce('div');
			screenSub.className = 'screenSub';
			ae(screen, screenTop);
			ae(screen, screenSub);
			
			ae(screenSub, ct('Display: '))
			var input = document.createElement('input');
			input.type = 'checkbox';
			input.id = 'model_show';
			input.checked = unsafeWindow.config.model.show;
			ae(screenSub, input);

			ae(screenSub, ct('Cloak: '))
			var input = document.createElement('input');
			input.type = 'checkbox';
			input.id = 'cloak_show';
			input.checked = unsafeWindow.config.model.cloak;
			ae(screenSub, input);

			ae(screenSub, ct('Helm: '))
			var input = document.createElement('input');
			input.type = 'checkbox';
			input.id = 'helm_show';
			input.checked = unsafeWindow.config.model.helm;
			ae(screenSub, input);

			var screenFoot = ce('div');
			screenFoot.className = 'screenFoot';
			screenFoot.innerHTML = 'WANNA <a href="javascript:;" id="configSave">SAVE</a> OR <a href="javascript:;" id="configCancel">CANCEL</a>?!';
			ae(screenParent, screenFoot);
			aE(ge('configSave'), 'click', function() { saveConfig() })
			aE(ge('configCancel'), 'click', function() { cancelConfig() })

		}
	}
	this.show = function() {
		unsafeWindow.Lightbox.show('charConfig', onShow);
	}
	this.hide = function() {
		unsafeWindow.Lightbox.hide('charConfig');
	}
}

function saveConfig() {
	GM_setValue('talentDiv', ge('talent_show').checked)
	GM_setValue('guildDiv', ge('guild_show').checked)
	GM_setValue('arenaDiv', ge('arena_show').checked)
	GM_setValue('repDiv', ge('rep_show').checked)
	GM_setValue('modelDiv', ge('model_show').checked)
	GM_setValue('modelCloak', ge('cloak_show').checked)
	GM_setValue('modelHelm', ge('helm_show').checked)
	unsafeWindow.config.talent.show = GM_getValue('talentDiv',true);
	unsafeWindow.config.guild.show = GM_getValue('guildDiv',true)
	unsafeWindow.config.arena.show = GM_getValue('arenaDiv',true)
	unsafeWindow.config.rep.show = GM_getValue('repDiv',true)
	unsafeWindow.config.model.show = GM_getValue('modelDiv',true)
	unsafeWindow.config.model.cloak = GM_getValue('modelCloak',true)
	unsafeWindow.config.model.helm = GM_getValue('modelHelm',true)
	ConfigView.hide()
		if(data) {
		ge('talentDiv').style.display = (GM_getValue('talentDiv',true) ? 'block' : 'none')
		ge('guildDiv').style.display = (GM_getValue('guildDiv',true) ? 'block' : 'none')
		ge('arenaDiv').style.display = (GM_getValue('arenaDiv',true) ? 'block' : 'none')
		ge('repDiv').style.display = (GM_getValue('repDiv',true) ? 'block' : 'none')
		ge('modelDiv').style.display = (GM_getValue('modelDiv',true) ? 'block' : 'none')
	}
	refreshModel()
}

function cancelConfig() {
	ge('talent_show').checked = GM_getValue('talentDiv',true);
	ge('guild_show').checked = GM_getValue('guildDiv',true);
	ge('arena_show').checked = GM_getValue('arenaDiv',true);
	ge('rep_show').checked = GM_getValue('repDiv',true);
	ge('model_show').checked = GM_getValue('modelDiv',true);
	ge('cloak_show').checked = GM_getValue('modelCloak',true);
	ge('helm_show').checked = GM_getValue('modelHelm',true);
	ConfigView.hide()
}

CharView = new function() {
	function onShow(dest, first, opt) {
		unsafeWindow.Lightbox.setSize(300, 100);
		if(first) {
			var screenParent = ce('div');
			screenParent.className = 'screenParent';
			var screenParentTop = ce('div');
			screenParentTop.className = 'screenParentTop';
			screenParentTop.innerHTML = 'Select your Character';
			ae(dest, screenParentTop);
			ae(dest, screenParent);


			var screen = ce('div');
			screen.className = 'screen2';
			ae(screenParent, screen);

			var screenSub = ce('div');
			screenSub.className = 'screenSub';
			ae(screen, screenSub);

			var name_span = ce('div', {style:'float:left;'});
			ae(name_span, ce('span', {style:'height: 17px; padding-top: 5px; float:left; '})).innerHTML = 'Name: '
			var input = document.createElement('input');
			input.type = 'text';
			input.id = 'char_name';
			input.style.cssFloat = 'right';
			ae(name_span, input);
			ae(screenSub, name_span)
			
			ae(screenSub, ce('div', {style:'clear:both;'}))
			
			var realm_span = ce('div', {style:'float:left;'});
			ae(realm_span, ce('span', {style:'height: 17px; padding-top: 5px; float:left; '})).innerHTML = 'Realm: '
			var input = document.createElement('input');
			input.type = 'text';
			input.id = 'realm_name';
			input.style.cssFloat = 'right';
			ae(realm_span, input);
			ae(screenSub, realm_span)
			
			ae(screenSub, ce('div', {style:'clear:both;'}))
			
			var server_span = ce('div', {style:'float:left;'});
			ae(server_span, ce('span', {style:'height: 17px; padding-top: 5px; float:left; '})).innerHTML = 'Server: '
			var select = document.createElement('select');
			select.id = 'server_name';
			select.style.cssFloat = 'right';
			ae(server_span, select);
			ae(screenSub, server_span)
			
			var option = document.createElement('option');
			option.innerHTML = 'US';
			ae(select, option)
			var option = document.createElement('option');
			option.innerHTML = 'EU';
			ae(select, option)
			
			var screenFoot = ce('div');
			screenFoot.className = 'screenFoot';
			screenFoot.innerHTML = 'WANNA <a href="javascript:;" id="configSave">SUBMIT</a>?!';
			ae(screenParent, screenFoot);
			aE(ge('configSave'), 'click', function() { if(!ge('char_name').value || !ge('realm_name').value) { window.alert('Please Input a name and/or realm.') } else { submitChar(ge('realm_name').value,ge('char_name').value,ge('server_name').options[ge('server_name').selectedIndex].value) } })

		}
	}
	this.show = function() {
		unsafeWindow.Lightbox.show('charDisplay', onShow);
	}
	this.hide = function() {
		unsafeWindow.Lightbox.hide('charDisplay');
	}
}

function addConfigLink() {
	if(gE(ge('kbl34h6b43'),'a')[0]) { rc(gE(ge('kbl34h6b43'),'a')[0]) }
	aE(ae(ge('kbl34h6b43'), ce('a', {href:'javascript:;', id:'configLnk'})), 'click', function() { ConfigView.show() })
	ae(ge('configLnk'), ct('[Config]'))
}

function submitChar(realm, name, server) {
	CharView.hide()
	addConfigLink()
	ge('buffwrap').style.display='block';
	ge('otherwrap').style.display='block';
	ge('talentDiv').style.display = (GM_getValue('talentDiv',true) ? 'block' : 'none')
	ge('guildDiv').style.display = (GM_getValue('guildDiv',true) ? 'block' : 'none')
	ge('arenaDiv').style.display = (GM_getValue('arenaDiv',true) ? 'block' : 'none')
	ge('repDiv').style.display = (GM_getValue('repDiv',true) ? 'block' : 'none')
	ge('modelDiv').style.display = (GM_getValue('repDiv',true) ? 'block' : 'none')
	data = ['',realm,name,server];
	gC({name:name,realm:realm,region:server})
}

function refreshModel() {
var race_sex = race+sex;
var item_string = '';
var noted = false;
var cloak = unsafeWindow.config.model.cloak;
var helm = unsafeWindow.config.model.helm;
ItemList.sort(function(a,b){return a.slot-b.slot;});
for(i=0;i<ItemList.length;i++) {
	if(ItemList[i].slot != '25' && ItemList[i].slot != '15') {
		if(ItemList[i].slot == '23') { ItemList[i].slot = '22'; }
		if(ItemList[i].slot == '13') { if(noted){ItemList[i].slot = '22';}else{ItemList[i].slot = '21';noted=true;} }
		if(!cloak && ItemList[i].slot == '16') { continue; }
		if(!helm && ItemList[i].slot == '1') { continue; }
		item_string += ItemList[i].slot+','+ItemList[i].displayId+',';
	}
}
ge('model_window').innerHTML = '<applet width="300" height="250" archive="http://static.wowhead.com/modelviewer/applet-launcher.jar,http://download.java.net/media/jogl/builds/archive/jsr-231-webstart-current/jogl.jar,http://download.java.net/media/gluegen/webstart/gluegen-rt.jar,http://download.java.net/media/java3d/webstart/release/vecmath/latest/vecmath.jar,http://static.wowhead.com/modelviewer/ModelView.jar" code="org.jdesktop.applet.util.JNLPAppletLauncher" id="3dviewer-java"><param value="false" name="codebase_lookup"/><param value="no" name="cache_option"/><param value="modelview.ModelViewerApplet" name="subapplet.classname"/><param value="Model Viewer Applet" name="subapplet.displayname"/><param value="true" name="progressbar"/><param value="1" name="jnlpNumExtensions"/><param value="http://download.java.net/media/jogl/builds/archive/jsr-231-webstart-current/jogl.jnlp" name="jnlpExtension1"/><param value="http://static.wowhead.com/modelviewer/" name="contentPath"/><param value="'+race_sex+'" name="model"/><param value="16" name="modelType"/><param value="'+item_string+'" name="equipList"/><param value="#181818" name="bgColor"/></applet>';
}

cP('Character Profile');
unsafeWindow.Tooltip.clip = 'layout';
var ItemList = new Array();
var race = '';
var sex = '';

unsafeWindow.config = {
	talent:{
		show: GM_getValue('talentDiv',true)
	},
	guild:{
		show: GM_getValue('guildDiv',true)
	},
	arena:{
		show: GM_getValue('arenaDiv',true)
	},
	rep:{
		show: GM_getValue('repDiv',true)
	},
	model:{
		show: GM_getValue('modelDiv',true),
		cloak: GM_getValue('modelCloak',true),
		helm: GM_getValue('modelHelm',true),
	}
}

addDivs();

ge('buffwrap').style.display='none';
ge('otherwrap').style.display='none';

ae(ge('text'),ce('div', {id:'spacerDiv'}));

addTalent();
addGuild();
addRep();
addArena();
add3D();


data = window.location.search.match(/\?char&r=(.*?)&n=(\w*)(?:&s=(\w*))?/);
if(data) { 
ge('buffwrap').style.display='block';
ge('otherwrap').style.display='block';
ge('talentDiv').style.display = (GM_getValue('talentDiv',true) ? 'block' : 'none');
ge('arenaDiv').style.display = (GM_getValue('arenaDiv',true) ? 'block' : 'none');
ge('guildDiv').style.display = (GM_getValue('guildDiv',true) ? 'block' : 'none');
ge('repDiv').style.display = (GM_getValue('repDiv',true) ? 'block' : 'none');
ge('modelDiv').style.display = (GM_getValue('modelDiv',true) ? 'block' : 'none');
gC({name:data[2],realm:data[1],region:(data[3]?data[3]:'US')})
} else {
CharView.show();
}

var updateModel = { 
	_timeoutId: 0,
	_process: function (params) { refreshModel(params) },
	process: function (params) { 
		clearTimeout(this._timeoutId); 
		var me = this; 
		this._timeoutId = setTimeout(function(){ me._process(params); }, 750);
	} 
};

if(window.location.search.match(/\?char&r=(.*?)&n=(\w*)(?:&s=(\w*))?/)) {
	addConfigLink()
} else {
	aE(ae(ge('kbl34h6b43'), ce('a', {href:'javascript:;', id:'charLnk'})), 'click', function() { CharView.show() })
	ae(ge('charLnk'), ct('[Select Char]'))
}