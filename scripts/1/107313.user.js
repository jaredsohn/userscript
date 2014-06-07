// ==UserScript==
// @name           CS2 Clear Tab Titles
// @namespace      CS
// @include        http*://*.chosenspace.com/*
// @exclude        http*://*.chosenspace.com/*/*
// ==/UserScript==
alltags=document.evaluate("//input[@value='Login']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	document.title="Login";
}else{
alltags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
var remain=/go=.*|view=.*/;
if(thistag||remain.test(location.href)){
	var blacklist={
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
	function checkList(sy,se){
		var ret='';
		if(sy in blacklist){
			if('n' in blacklist[sy])
				ret+=blacklist[sy]['n'];
			if(se&&se in blacklist[sy])
				if('n' in blacklist[sy][se]){
					ret=ret.replace(/n\s.*/,'');
					ret+=" : "+blacklist[sy][se]['n'];
				}
		}
		return ret;
	}
	var getit='=sector';
	if(remain.test(location.href))
		getit=remain.exec(location.href);
	getit+='&';
	getit=getit.split('=')[1].split('&')[0];
	getit=getit.replace('_',' ');
	getit=getit.replace(/(^|\s)([a-z])/g,function(m,p1,p2){return p1+p2.toUpperCase();});
	var planet=/Planet/;
	var resys=/system_id=\d*/;
	var resec=/sector_id=\d*/;
	var replaboard=/planet_id=\d*/;
	var refacboard=/faction_id=\d*/;
	var replanull=/planet_id=0/;
	var refacnull=/faction_id=0/;
	var step,sys,sec,getsys;
	if(getit=='System'||getit=='Sector'){
		if(resys.test(location.href))
			getsys=location.href;
		else
			getsys=thistag.getAttribute('onclick');
		step=resys.exec(getsys)+'';
		step=step.replace(/\D/g,'');
		sys=step*1;
		sec=0;
		if(resec.test(getsys)){
			step=resec.exec(getsys)+'';
			step=step.replace(/\D/g,'');
			sec=step*1;
		}
		getit=checkList(sys,sec);
	}else if(planet.test(getit)){
		getsys=thistag.getAttribute('onclick');
		step=resys.exec(getsys)+'';
		step=step.replace(/\D/g,'');
		sys=step*1;
		step=resec.exec(getsys)+'';
		step=step.replace(/\D/g,'');
		sec=step*1;
		step=getit.split(' ')[1];
		getit=checkList(sys,sec)+' : '+step;
	}else if(getit=='Board'&&replaboard.test(location.href)&&!replanull.test(location.href)){
		getsys=thistag.getAttribute('onclick');
		step=resys.exec(getsys)+'';
		step=step.replace(/\D/g,'');
		sys=step*1;
		step=resec.exec(getsys)+'';
		step=step.replace(/\D/g,'');
		sec=step*1;
		getit=checkList(sys,sec)+' : '+getit;
	}else if(getit=='Board'&&refacboard.test(location.href)&&!refacnull.test(location.href)){
		getit='Faction '+getit;
	}else if(getit=='Board'){
		getit='Public '+getit;
	}
	document.title=getit;
}}