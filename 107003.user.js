// ==UserScript==
// @name           CS2 Jumpbox
// @namespace      CS
// @include        http*://*.chosenspace.com/*
// @exclude        http*://*.chosenspace.com/*/*
// ==/UserScript==
var alltags,thistag,newContent,getsys,system,sector,grid;
alltags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	var sysnames={
			133:{'n':'Arcas Expanse'},
			147:{'n':'Asterion Expanse'},
			148:{'n':'Regulus Expanse'},
			149:{'n':'Hathor Expanse'},
			150:{'n':'Nespian System',22:{'n':'Nespia I'},88:{'n':'Lax'},100:{'n':'Nespia II'},132:{'n':'Vobis'},207:{'n':'Rakus'},291:{'n':'Wahur'},304:{'n':'Mantia'},337:{'n':'Serio'},388:{'n':'Nespia III'}},
			151:{'n':'Newhope Expanse'},
			152:{'n':'Polaris Expanse'},
			153:{'n':'Basian System',64:{'n':'Taris'},95:{'n':'Cerea'},143:{'n':'Trennok'},200:{'n':'Basia VI'},213:{'n':'Basia IX'},257:{'n':'Mertis'},269:{'n':'Kaas'},314:{'n':'Prema'},365:{'n':'Basia VII'}},
			168:{'n':'Tyrian System',59:{'n':'Tyria VI'},85:{'n':'Tyria I'},133:{'n':'Saren'},204:{'n':'Durrok'},250:{'n':'Tyria VII'},267:{'n':'Velos'},314:{'n':'Fariss'}},
			169:{'n':'Memorial Expanse'},
			170:{'n':'Midway Expanse'},
			171:{'n':'Perennis Expanse'},
			172:{'n':'Raxian System',45:{'n':'Raxia VI'},77:{'n':'Tanis'},107:{'n':'Aeten'},130:{'n':'Raxia IX'},197:{'n':'Raxia VIII'},205:{'n':'Zeta'},229:{'n':'Raxia VII'},275:{'n':'Brax'},330:{'n':'Soror'}},
			173:{'n':'Ursa Expanse'},
			188:{'n':'Iota Expanse'},
			189:{'n':'Altian System',23:{'n':'Altia VII'},107:{'n':'Altia IX'},116:{'n':'Aruk'},129:{'n':'Freya'},144:{'n':'Ares'},199:{'n':'Altia VI'},268:{'n':'Altia VIII'},284:{'n':'Ventani'},333:{'n':'Jakar'}},
			190:{'n':'Solian System',55:{'n':'Kryos'},68:{'n':'Solia VIII'},106:{'n':'Primus'},172:{'n':'Solia II'},177:{'n':'Omnis'},224:{'n':'Mirnok'},288:{'n':'Exillis'},337:{'n':'Aquila'},395:{'n':'Solia VII'}},
			191:{'n':'Atra Expanse'},
			192:{'n':'Jexian System',69:{'n':'Ezra'},94:{'n':'Netrea'},101:{'n':'Jexia VII'},125:{'n':'Capek'},214:{'n':'Jexia I'},227:{'n':'Jahib'},273:{'n':'Gratia'},331:{'n':'Trellum'},347:{'n':'Jexia IX'},363:{'n':'Jexia VIII'}},
			193:{'n':'Antares Expanse'},
			208:{'n':'Zarian System',23:{'n':'Zaria VIII'},58:{'n':'Arcas'},89:{'n':'Zaria II'},124:{'n':'Teag'},155:{'n':'Cetus'},225:{'n':'Lapsus'},250:{'n':'Zaria IX'},256:{'n':'Beslan'},328:{'n':'Lutra'},358:{'n':'Zaria I'},393:{'n':'Zaria VII'}},
			209:{'n':'Allansia Expanse'},
			210:{'n':'Veranza Expanse'},
			211:{'n':'Casian System',117:{'n':'Satus'},131:{'n':'Zaran'},165:{'n':'Kallos'},189:{'n':'Casia VII'},242:{'n':'Casia V'},256:{'n':'Vega'},327:{'n':'Tapek'}},
			212:{'n':'Wartorn Expanse'},
			213:{'n':'Farian System',94:{'n':'Ramura'},126:{'n':'Magus'},149:{'n':'Faria V'},203:{'n':'Vaku'},235:{'n':'Lyra'},331:{'n':'Equis'},367:{'n':'Faria VII'}},
			228:{'n':'Lyrian System',125:{'n':'Birnax'},156:{'n':'Sigma'},203:{'n':'Lyria II'},293:{'n':'Remus'},338:{'n':'Cenix'},371:{'n':'Lyria VI'}},
			229:{'n':'Pulsar Expanse'},
			230:{'n':'Genian System',85:{'n':'Pallidus'},116:{'n':'Volan'},140:{'n':'Genia VI'},208:{'n':'Genia VII'},234:{'n':'Aeger'},292:{'n':'Genia VIII'},297:{'n':'Rumino'},327:{'n':'Darnak'}},
			231:{'n':'Exile Expanse'},
			232:{'n':'Volian System',12:{'n':'Volia VII'},69:{'n':'Verdus'},77:{'n':'Takar'},175:{'n':'Adari'},198:{'n':'Volia VIII'},205:{'n':'Arium'},212:{'n':'Volia IX'},249:{'n':'Volia I'},291:{'n':'Volia II'},321:{'n':'Volia VI'},327:{'n':'Uran'}},
			233:{'n':'Imperial Expanse'},
			248:{'n':'Meridian Expanse'},
			249:{'n':'Omnian System',74:{'n':'Prolix'},127:{'n':'Rhinaxi'},139:{'n':'Omnia VI'},212:{'n':'Omnia VII'},217:{'n':'Zohar'},245:{'n':'Qualis'},293:{'n':'Gennok'},318:{'n':'Vorax'}},
			250:{'n':'Darkened Expanse'},
			251:{'n':'Adarian System',95:{'n':'Antar'},127:{'n':'Raxis'},214:{'n':'Nakara'},222:{'n':'Adaria IV'},266:{'n':'Acrus'},318:{'n':'Ceti'},329:{'n':'Adaria V'}},
			252:{'n':'Cephalus Expanse'},
			253:{'n':'Desian System',50:{'n':'Xenox'},145:{'n':'Inibi'},174:{'n':'Dahir'},189:{'n':'Desia VII'},246:{'n':'Ferox'},292:{'n':'Zethus'},336:{'n':'Desia IV'},382:{'n':'Desia V'}},
			254:{'n':'Heavenly Expanse'},
			268:{'n':'Utopian Expanse'}
	}
	function button(off,width,height,btitle,value,backgroundcolor,backgroundpicture,onclick){
		var newButton=document.createElement('input');
		newButton.type='button';
		var bgc='';
		if(width!='')bgc+='width:'+width+';';
		if(height!='')bgc+='height:'+height+';';
		if(backgroundpicture!='')bgc+='background:url(data:image/png;base64,'+backgroundpicture+') no-repeat center;';
		if(backgroundpicture!=''&&width!=''&&height!='')bgc+='background-size:'+width+' '+height+';-moz-background-size:'+width+' '+height+';-o-background-size:'+width+' '+height+';-webkit-background-size:'+width+' '+height+';-khtml-background-size:'+width+' '+height+';';
		newButton.value=value;
		if(off){
			if(onclick=='')bgc+='border:1px solid transparent!important;';
			else newButton.className='forms_btn_off';
		}else{
			newButton.className='forms_btn';
			newButton.setAttribute('onclick',onclick);
		}
		if(backgroundcolor!='')bgc+='background-color:#'+backgroundcolor+'!important;'
		if(bgc!='')newButton.setAttribute('style',bgc);
		if(btitle!='')newButton.setAttribute('title',btitle);
		return newButton; 
	}
	function checkopen(s){
		if(s==133)return true;
		if(s>=147&&s<=153)return true;
		if(s>=168&&s<=173)return true;
		if(s>=188&&s<=193)return true;
		if(s>=208&&s<=213)return true;
		if(s>=228&&s<=233)return true;
		if(s>=248&&s<=254)return true;
		if(s==268)return true;
		return false;
	}
	getsys=thistag.getAttribute('onclick');
	system=(getsys.split("system_id=")[1].split("&")[0])*1;
	sector=(getsys.split("sector_id=")[1].split("&")[0])*1;
	grid=(getsys.split("grid_id=")[1].split("'")[0])*1;
	var newRef=location.href.split('/');
		newRef=newRef[0]+"//"+newRef[2]+"/";
	var div=document.createElement('div');
	div.setAttribute('style',"position:fixed;bottom:0.2em;left:1em;height:auto;width:90px;");
	div.appendChild(button(false,'85px;margin:0 0 3px 0!important;','','','Captain Logs','','',"location.href='index.php?go=user_logs'"));
	div.appendChild(button(false,'85px;margin:0 0 3px 0!important;','','','Faction Logs','','',"location.href='index.php?go=faction_logs'"));
	div.appendChild(button(false,'85px','','Show/Hide Jumpbox','Jumpbox','','',"var jumpbox=document.getElementById('jumpbox');if(jumpbox.style.zIndex==1){jumpbox.style.opacity=0;jumpbox.style.zIndex=-1;}else{jumpbox.style.opacity=1;jumpbox.style.zIndex=1;};"));
	document.body.appendChild(div);
	var subdiv,subspan;
	subdiv=document.createElement('div');
	subdiv.setAttribute('style',"position:fixed;bottom:0.2em;left:105px;background-color:#050505;height:auto;width:auto;border:1px solid #a00;padding:0.5em;z-index:-1;opacity:0;");
	subdiv.setAttribute('class',"forms_btn jumpbox");
	subdiv.setAttribute('id',"jumpbox");
	document.body.appendChild(subdiv);
	var iblack="iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAJUlEQVQoU2NgIBYYGBj8x4XhZoAUADkYGCoOUTdYFRH0HaGgAgBHkD5Q/TU5fwAAAABJRU5ErkJggg==";
	var iblue="iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAJklEQVQoU2NgIBYYGBj8x4XhZoAUMPzfhoHB4jAwWBUR9B2hoAIADklo/fxwVZEAAAAASUVORK5CYII=";
	var iyellow="iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAJElEQVQoU2NgIBYYGBj8x4XhZoAUnPnPgIFB4oNeEUHfEQoqAJrUayNzSooAAAAAAElFTkSuQmCC";
	subspan=document.createElement('div');
	subspan.setAttribute('style',"background-color:#050505;height:auto;width:72px;margin:0 auto;");
	subspan.setAttribute('onmouseout',"document.getElementById('mapdesc').value=''");
	subspan.setAttribute('class',"forms_btn jumpbox");
	subspan.setAttribute('id',"mapbox");
	subdiv.appendChild(subspan);
	function addit(text,bg,here,clicky){
		var ret=document.createElement('span');
		var tempadd=(here)?'background-color:#960082':'';
		ret.setAttribute('style','height:9px;width:9px;float:left;margin:0!important;padding:0!important;text-align:center;'+'background:url(data:image/png;base64,'+bg+') no-repeat center;'+tempadd);
		ret.setAttribute('onmouseover',"document.getElementById('mapdesc').value='"+text+"';this.style.backgroundColor='#CC0000'");
		tempadd=(here)?'960082':'transparent';
		ret.setAttribute('onmouseout',"this.style.backgroundColor='"+tempadd+"'");
		if(clicky!=0)ret.setAttribute('onclick',"document.getElementById('rjsys').value="+clicky);
		return ret;
	}
	var itext,ibgcolor,sobber,iclick;
	var exp=/System/;var i=127;var ihere=false;
	while(i<=274){
		if(i in sysnames){
			itext=sysnames[i]['n'];
			ibgcolor=(exp.test(itext))?iyellow:iblue;
			iclick=i;
		}else{
			itext="unknown System #"+i;
			ibgcolor=iblack;
			iclick=0;
		}
		ihere=(i==system)?true:false;
		sobber=addit(itext,ibgcolor,ihere,iclick);
		subspan.appendChild(sobber);
		i++;
		switch(i){case 135:case 155:case 175:case 195:case 215:case 235:case 255:i+=12;}
	}
	subspan=document.createElement('div');
	subspan.setAttribute('style','height:auto;width:100%!important;float:left;text-align:center;');
	subdiv.appendChild(subspan);
	child=document.createElement('input');
	child.type='text';
	child.id='mapdesc';
	child.className='forms_txt forms_txt_jboff';
	child.setAttribute('style',"width:100%;text-align:center;margin:0 0 4px 0!important;padding:0px!important;color:#606060;border:none!important;");
	subspan.appendChild(child);
	subspan.appendChild(document.createElement('br'));
	var jbsel=document.createElement('select');
	jbsel.id='rjsys';
	jbsel.className='forms';
	var jsys=1;
	while(jsys<=400){
		if(checkopen(jsys)){
			var jbselopt=document.createElement('option');
			if(jsys==system)jbselopt.selected="selected";
			jbselopt.value=jsys;
			if(jsys in sysnames)jbselopt.textContent=sysnames[jsys]['n'];
			else jbselopt.textContent=jsys;
			jbsel.appendChild(jbselopt);
		}
		jsys++;
	}
	subspan.appendChild(jbsel);
	subspan.appendChild(document.createElement('br'));
	var child=document.createElement('input');
		child.type='text';
		child.id='rjsec';
		child.className='forms_txt forms_txt_jboff';
		child.maxLength=3;
		child.setAttribute('style',"float:left;width:5em;margin:4px 0 0 0;text-align:center;padding:0px!important;color:#606060;");
		child.setAttribute('value',"Sector");
		child.setAttribute('onmouseover',"this.select();");
		child.setAttribute('onmouseout',"this.blur();");
		child.setAttribute('onfocus',"this.style.color='#ccc';this.className='forms_txt forms_txt_jbon';this.value=this.value.replace(/\\D/g,'');");
		child.setAttribute('onblur',"this.value=this.value.replace(/\\D/g,'');if(this.value==''||(this.value*1)<1||(this.value*1)>400){this.value='Sector';this.style.color='#606060';this.className='forms_txt forms_txt_jboff';}else{this.style.color='#3f3';this.className='forms_txt forms_txt_jbact';}");
		child.setAttribute('onkeypress',"var key,keychar;if(window.event)key=window.event.keyCode;else if(event)key=event.which;else return true;keychar=String.fromCharCode(key);if(key==0||key==8||key==9||key==13||key==27)return true;else if(key<=47||key>=58)return false;else if((('0123456789').indexOf(keychar)>-1))return true;else return false;");
	subspan.appendChild(child);
	child=document.createElement('input');
		child.type='text';
		child.id='rjgrid';
		child.className='forms_txt forms_txt_jboff';
		child.maxLength=3;
		child.setAttribute('style',"float:right;width:5em;margin:4px 0 0 0;text-align:center;padding:0px!important;color:#606060;");
		child.setAttribute('value',"Grid");
		child.setAttribute('onmouseover',"this.select();");
		child.setAttribute('onmouseout',"this.blur();");
		child.setAttribute('onfocus',"this.style.color='#ccc';this.className='forms_txt forms_txt_jbon';this.value=this.value.replace(/\\D/g,'');");
		child.setAttribute('onblur',"this.value=this.value.replace(/\\D/g,'');if(this.value==''||(this.value*1)<1||(this.value*1)>400){this.value='Grid';this.style.color='#606060';this.className='forms_txt forms_txt_jboff';}else{this.style.color='#3f3';this.className='forms_txt forms_txt_jbact';}");
		child.setAttribute('onkeypress',"this.style.color='#ccc';var key,keychar;if(window.event)key=window.event.keyCode;else if(event)key=event.which;else return true;keychar=String.fromCharCode(key);if(key==0||key==8||key==9||key==13||key==27)return true;else if(key<=47||key>=58)return false;else if((('0123456789').indexOf(keychar)>-1))return true;else return false;");
	subspan.appendChild(child);
	subspan.appendChild(document.createElement('br'));
	var jls="if(isNaN(parseFloat(document.getElementById('rjsec').value))||isNaN(parseFloat(document.getElementById('rjgrid').value))){alert('Please fill all fields');return false}else{location.href='functions/lightspeed.php?system_id='+parseFloat(document.getElementById('rjsys').value)+'&sector_id='+parseFloat(document.getElementById('rjsec').value)+'&grid_id='+parseFloat(document.getElementById('rjgrid').value);}";
	child=button(false,'5em;margin:4px 0 0 0','','Lightspeed','L S','','',jls);
	child.style.cssFloat='left';
	subspan.appendChild(child);
	var jhj="if(isNaN(parseFloat(document.getElementById('rjsec').value))||isNaN(parseFloat(document.getElementById('rjgrid').value))){alert('Please fill all fields');return false}else{location.href='functions/hyperjump.php?system_id='+parseFloat(document.getElementById('rjsys').value)+'&sector_id='+parseFloat(document.getElementById('rjsec').value)+'&grid_id='+parseFloat(document.getElementById('rjgrid').value);}";
	child=button(false,'5em;margin:4px 0 0 0','','Hyperjump','H J','','',jhj);
	child.style.cssFloat='right';
	subspan.appendChild(child);
	subspan.appendChild(document.createElement('br'));
	var view="var v,s;var e=parseFloat(document.getElementById('rjsec').value);var g=parseFloat(document.getElementById('rjgrid').value);if(isNaN(e)){v='system';s=''}else{v='sector';s=e+'&grid_id=';s+=(isNaN(g))?'':g;}location.href='index.php?view='+v+'&system_id='+document.getElementById('rjsys').value+'&sector_id='+s;";
	subspan.appendChild(button(false,'100%;margin:4px 0 0 0','','Show target location on map','Show','','',view));
}
