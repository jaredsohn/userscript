// ==UserScript==
// @name			Kocmonitor
// @version			1309031
// @description		A Kingdoms of Camelot Mod
// @namespace		kocmon.com
// @icon			http://www.gravatar.com/avatar/f93cdced9c9b863a7d9e4b9988886015
// @include			http://kocmon.com/*
// @include			https://kocmon.com/*
// @include			*.kingdomsofcamelot.com/fb/e2/src/main_src.php*
// @include			http://*
// @grant			unsafeWindow
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_deleteValue
// @grant			GM_xmlhttpRequest
// @grant			GM_openInTab
// @grant			GM_log
// @grant			GM_listValues
// @grant			GM_addStyle
// @grant			GM_registerMenuCommand
// @require			http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

//============================================================================

var kocmonitor={};
kocmonitor.PLAYERUID = 0;
kocmonitor.PLAYERNAME = '';
kocmonitor.PLAYERDOMAIN = 0;
kocmonitor.PLAYERALLIANCEID = 0;
kocmonitor.PLAYERALLIANCENAME = '';
kocmonitor.PLAYERMIST = 0;
kocmonitor.PLAYERCITIES = [];
kocmonitor.PLAYERDOMAINS = [];
kocmonitor.PLAYERSEED = null;
kocmonitor.AUTHORIZEDSITES=null;
kocmonitor.CURRENTURL=""+document.location.toString();
kocmonitor.CURRENTWEBFOLDER=document.location.host+""+document.location.pathname.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '')+'/';
kocmonitor.REMOVEDMIXPANEL=false;
kocmonitor.WEBSITEURL='http://kocmon.com/';
kocmonitor.URL='http://kocmon.com/ajax/kocmonitor/index.php';
kocmonitor.STORAGEPREFIX = 'KOCMONITOR';
kocmonitor.CITIESSAVED = '';
kocmonitor.CITIESLASTSENT = 0;
kocmonitor.SENDINFODELAY=1000*60*60*6; //every 6 hours
kocmonitor.SENDSEEDDELAY=1000*60*60*24; //once a day
kocmonitor.DEBUG=false;
kocmonitor.SCRIPTID=121891;
kocmonitor.SCRIPTVERSION=1309031;
kocmonitor.EXTENSIONLIST=[];
kocmonitor.MODLANG='eng';
kocmonitor.TIMELEFTOFINIT=0;
kocmonitor.LOCALIZE=[];
kocmonitor.LOCALIZE.eng=[];
kocmonitor.LOCALIZE.eng[0]=null;
kocmonitor.LOCALIZE.eng[1]='Would you like to update %0?';
kocmonitor.LOCALIZE.eng[2]='No update needed';
kocmonitor.LOCALIZE.eng[3]='Your using an alpha version, do you want to downgrade %0?';
kocmonitor.LOCALIZE.eng[4]='Not allowed on this website';

kocmonitor.ADDWINDOWTIMMER=null;
kocmonitor.CORRECTWINDOWTIMMER=null;
kocmonitor.SENDINFOTIMMER=null;
kocmonitor.DOTASKTIMMER=null;

kocmonitor.IMAGES=[];
kocmonitor.IMAGES[0]='data:image/png;base64,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';      


kocmonitor.cleanArray=function(actual){
	var newArray = [];
	for(var i = 0; i<actual.length; i++){
		if(actual[i]){
			newArray.push(actual[i]);
		}
	}
	return newArray;
};
kocmonitor.generateRandomNumber=function(min,max){
	if (min >= max) {
		return null;
	}
	else {
		return Math.round(min+((max-min)*Math.random()));
	}	
};
kocmonitor.updateSeed=function(url,args,json){
	var me=this;
	var i=0;
	switch(url){
		case 'ajax/_dispatch53.php':
			if(args.ctrl){
				if(args.ctrl=='throneRoom%5CThroneRoomServiceAjax'){
					if(args.action){
						if(args.action=='timeRepair'){
							if(json.error_code){
								if(json.error_code==0){
							
								}
								else if(json.error_code==256){
									window.seed.throne.inventory[args.throneRoomItemId].status=1;
								}
								else{
									
								}
							}
							else{
								if(json.eta){//start repair
									kocmonitor.log('repair of item #'+args.throneRoomItemId+' will be done in '+kocmonitor.timeUntill(Math.floor(json.eta)));
									
									window.seed.throne.inventory[args.throneRoomItemId].status=4;
									
									var t1=Math.floor(json.eta*1000);
									var t2=new Date().getTime();
									var wait=t1-t2;
									setTimeout(function(){
										window.seed.throne.inventory[args.throneRoomItemId].status=1;
									},wait);
								}
							}
						}
						else if(args.action=='upgradeQuality'){
							if(json.error_code){
								if(json.error_code==0){
							
								}
								else if(json.error_code==256){
									//window.seed.throne.inventory[args.throneRoomItemId].status=1;
								}
								else{
									
								}
							}
							else{
								if(args.payment && args.cityId){
									if(args.payment=='aetherstone' && json.aetherstones){
										window.seed.cityData.city[args.cityId].production.AETHERSTONE=window.seed.cityData.city[args.cityId].production.AETHERSTONE-json.aetherstones;										
									}
									if(args.payment=='gem' && json.gems){//payment = gem or gems not sure because i don't have any so i can't test
										window.seed.player.gems=window.seed.player.gems-json.gems;									
									}
								}
								if(json.success && json.success===true){
									window.seed.throne.inventory[args.throneRoomItemId].status=1;
								}
								if(json['break'] && json['break']===true){
									window.seed.throne.inventory[args.throneRoomItemId].status=3;
								}
								if(args.throneRoomItemId && json.item){
									if(json.item[0]){
										//fix because the programmers at kabam are dumbasses
										//the server returns zero as item id so we use the id from the request params
										json.item[0].id=args.throneRoomItemId;
										window.seed.throne.inventory[args.throneRoomItemId]=json.item[0].faction;
									}
								}
								if(json.heatupModifier){
									window.seed.throne.heatupModifier=json.heatupModifier;
								}
								if(json.forgeMasterModifier){
									//TODO no idea what the name of the origional is so i can't update.
								}
								if(json.lastAttemptTime){
									window.seed.throne.lastAttemptTime=json.lastAttemptTime;
								}
								if(json.downgrade && json.downgrade===true){
									//TODO not sure how to deal with this
								}
								if(args.buffItemId){
									//TODO have to adjust item count
								}
							}
						}
						else if(args.action=='upgradeLevel'){
							if(args.payment && args.cityId){
								if(args.payment=='aetherstone' && json.aetherstones){
									window.seed.cityData.city[args.cityId].production.AETHERSTONE=window.seed.cityData.city[args.cityId].production.AETHERSTONE-json.aetherstones;										
								}
								if(args.payment=='gem' && json.gems){//payment = gem or gems not sure because i don't have any so i can't test
									window.seed.player.gems=window.seed.player.gems-json.gems;									
								}
							}
							if(json.success && json.success===true){
								window.seed.throne.inventory[args.throneRoomItemId].status=1;
							}
							if(json['break'] && json['break']===true){
								window.seed.throne.inventory[args.throneRoomItemId].status=3;
							}
							if(args.throneRoomItemId && json.item){
								if(json.item[0]){
									json.item[0].id=args.throneRoomItemId;
									window.seed.throne.inventory[args.throneRoomItemId]=json.item[0].faction;
								}
							}
							if(json.heatupModifier){
								window.seed.throne.heatupModifier=json.heatupModifier;
							}
							if(json.forgeMasterModifier){
								//TODO no idea what the name of the origional is so i can't update.
							}
							if(json.lastAttemptTime){
								window.seed.throne.lastAttemptTime=json.lastAttemptTime;
							}
							if(json.downgrade && json.downgrade===true){
								//TODO not sure how to deal with this
							}
							if(args.buffItemId){
								//TODO have to adjust item count
							}
						}
					}
				}
			}
			break;
		default:
			break;
	}
};
kocmonitor.authorizedWebsiteStatus=function(){
	if(!kocmonitor.AUTHORIZEDSITES){
		kocmonitor.AUTHORIZEDSITES=kocmonitor.authorizedWebsiteGet();
	}
	var folder=document.location.host+""+document.location.pathname.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '')+'/';
	for(var i=0;i<kocmonitor.AUTHORIZEDSITES.length;i++){
		var site = kocmonitor.AUTHORIZEDSITES[i];
		if(folder.indexOf(site) == 0){
			return true;
		}
	}
	return false;
};
kocmonitor.removeAjaxParams=function(params){
	if(!params){return;}
	var result=JSON.parse(JSON.stringify(params));
	if(!result){return;}
	var kabam=JSON.parse(JSON.stringify(unsafeWindow.g_ajaxparams));
	for(var i in result){
		if(kabam[i]){
			delete result[i];
		}
	}	
	return result;
};
kocmonitor.deparam=function(str){
	str = decodeURIComponent(str);
	var chunks = str.split('&');
	var obj = {};
	for(var c=0; c < chunks.length; c++) {
		var split = chunks[c].split('=', 2);
	    obj[split[0]] = split[1];
	}
	delete obj.fb_sig_in_iframe;
	delete obj.fb_sig_expires;
	delete obj.fb_sig_api_key;
	delete obj.fb_sig_added;
	delete obj.fb_sig;
	delete obj.fb_sig_time;
	delete obj.fb_sig_user;
	delete obj.fb_sig_session_key;
	delete obj.fb_sig_profile_update_time;
	delete obj.tvuid;
	delete obj.kabamuid;
	delete obj.tpuid;
	delete obj.lang;
	delete obj.standalone;
	delete obj.signed_request;
	delete obj.pf;
	delete obj.pg;
	delete obj.__kraken_network;
	return obj;
};
kocmonitor.getTranslation=function(word,replace){
	var str='';
	if(word && kocmonitor.LOCALIZE){
		if(kocmonitor.LOCALIZE[kocmonitor.MODLANG] && kocmonitor.LOCALIZE[kocmonitor.MODLANG][word]){
			str=kocmonitor.LOCALIZE[kocmonitor.MODLANG][word];
		}
		else if(kocmonitor.LOCALIZE.eng && kocmonitor.LOCALIZE.eng[word]){
			str=kocmonitor.LOCALIZE.eng[word];
		}
		else{
			return;
		}
		if(replace){
			if($.isArray(replace)) {
				for (var i=0; i<replace.length; i++) {
					str = str.replace('%'+i,replace[i]);
				}
			} else {
				str = str.replace('%0',replace);
			}
		}
	}
	return str;
};
kocmonitor.getAetherstone=function(cityId){
	if(!cityId){return;}
	if(unsafeWindow && unsafeWindow.seed && unsafeWindow.seed.cityData && unsafeWindow.seed.cityData.city && unsafeWindow.seed.cityData.city[cityId] && unsafeWindow.seed.cityData.city[cityId].production && unsafeWindow.seed.cityData.city[cityId].production.AETHERSTONE){
		return (1*unsafeWindow.seed.cityData.city[cityId].production.AETHERSTONE);
	}
};
kocmonitor.setTranslation=function(w,r,lang){
	if(!kocmonitor.LOCALIZE[lang]){
		kocmonitor.LOCALIZE[lang]=[];
	}
	kocmonitor.LOCALIZE[lang][w]=r;
};
kocmonitor.extend=function(extension,obj){
	kocmonitor.ext[extension]=obj;
	alert('extension2='+JSON.stringify(kocmonitor.ext[extension], null, "\t"));
};
kocmonitor.extensionGetValue=function(extension,name,value){
	return kocmonitor.getValue(kocmonitor.STORAGEPREFIX+'ext_'+extension+'_'+name,value);
};
kocmonitor.extensionSetValue=function(extension,name,value){
	kocmonitor.setValue(kocmonitor.STORAGEPREFIX+'ext_'+extension+'_'+name,value);
};
kocmonitor.extensionDeleteValue=function(extension,name){
	kocmonitor.deleteValue(kocmonitor.STORAGEPREFIX+'ext_'+extension+'_'+name);
};
kocmonitor.is=function(a){
	var is={
		Null:function(a){
			return a===null;
		},
		Undefined:function(a){
			return a===undefined;
		},
		nt:function(a){
			return(a===null||a===undefined);
		},
		Function:function(a){
			return(typeof(a)==='function')?a.constructor.toString().match(/Function/)!==null:false;
		},
		String:function(a){
			return(typeof(a)==='string')?true:(typeof(a)==='object')?a.constructor.toString().match(/string/i)!==null:false;
		},
		Array:function(a){
			return(typeof(a)==='object')?a.constructor.toString().match(/array/i)!==null||a.length!==undefined:false;
		},
		Boolean:function(a){
			return(typeof(a)==='boolean')?true:(typeof(a)==='object')?a.constructor.toString().match(/boolean/i)!==null:false;
		},
		Date:function(a){
			return(typeof(a)==='date')?true:(typeof(a)==='object')?a.constructor.toString().match(/date/i)!==null:false;
		},
		HTML:function(a){
			return(typeof(a)==='object')?a.constructor.toString().match(/html/i)!==null:false;
		},
		Number:function(a){
			return(typeof(a)==='number')?true:(typeof(a)==='object')?a.constructor.toString().match(/Number/)!==null:false;
		},
		Object:function(a){
			return(typeof(a)==='object')?a.constructor.toString().match(/object/i)!==null:false;
		},
		RegExp:function(a){
			return(typeof(a)==='function')?a.constructor.toString().match(/regexp/i)!==null:false;
		}
	};
	return(is[a]);
};
kocmonitor.getDistance=function(x1,y1,x2,y2,max){
	var dx = 0;
	var dy = 0;
	var dist = 0;
	if(!max){max=750;}
	if (x1 > x2){
	     dx = x1 - x2;
	}else{
	     dx = x2 - x1;
	}
	if ((max - x2 + x1) < dx){
	     dx = max - x2 + x1;
	}
	if ((x1 + max - x2) < dx){
	     dx = x1 + max - x2;
	}
	if (y1 > y2){
	     dy = y1 - y2;
	}else{
	     dy = y2 - y1;
	}
	if ((max - y2 + y1) < dy){
	     dy = max - y2 + y1;
	}
	if ((y1 + max - y2) < dy){
	     dy = y1 + max - y2;
	}
	dist = Math.sqrt((dx*dx)+(dy*dy));
	return(dist);
};
kocmonitor.getBlockCoords=function(x,y){
	var blocks=[];
	//round to nearest 5
	x=Math.floor(1*x/5)*5;
	y=Math.floor(1*y/5)*5;
	//server requests are formated like this
	blocks.push([x-5,y-5]);
	blocks.push([x-5,y]);
	blocks.push([x-5,1*y+5]);
	blocks.push([x,y-5]);
	blocks.push([x,y]);
	blocks.push([x,1*y+5]);
	blocks.push([1*x+5,y-5]);
	blocks.push([1*x+5,y]);
	blocks.push([1*x+5,1*y+5]);
	for(var i=0;i<blocks.length;i++){
		if(blocks[i][0]<0){blocks[i][0]=750-(-1*blocks[i][0]);}
		if(blocks[i][0]>749){blocks[i][0]=blocks[i][0]-750;}
		if(blocks[i][1]<0){blocks[i][1]=750-(-1*blocks[i][1]);}
		if(blocks[i][1]>749){blocks[i][1]=blocks[i][1]-750;}
	}
	return blocks;
};
kocmonitor.htmlEntities=function(str){
	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
kocmonitor.setValueObject=function(k,v){
	v=JSON.stringify(v);
	GM_setValue(k,v);
};
kocmonitor.getValueObject=function(k,dv){
	var v=GM_getValue(k,dv);
	if(!v || v==undefined){
		return null;
	}
	v=JSON.parse(v);
	if(!v){
		if(!dv){
			v=null;
		}
		else{
			v=dv;
		}	
	}
	return v;
};
kocmonitor.setValue=function(k,v){
	GM_setValue(k,v);
};
kocmonitor.getValue=function(k,dv){
	return(GM_getValue(k,dv));
};
kocmonitor.deleteValue=function(k){
	GM_deleteValue(k);
};
kocmonitor.getThroneStatus=function(){
	if(unsafeWindow && unsafeWindow.seed && unsafeWindow.seed.queue_throne){
		return JSON.parse(JSON.stringify(unsafeWindow.seed.queue_throne));
	}
};
kocmonitor.getDomains=function(force){
	if(unsafeWindow.g_ajaxparams){
		var now=new Date().getTime()*1;
		var wait=86400000;//1 day
		var k=kocmonitor.STORAGEPREFIX+'getDomains_lastcheck';
		var lastsent=kocmonitor.getValue(k,0);
		if(force || 1*lastsent+wait<now){
			var args = {};
			args.v2=true;
			var json=kocmonitor.sendToKabam(args,'myServers',null,true);
			if(json && json.selectableServers && json.selectableServers.servers){
				var domains=[];
				for(var i in json.selectableServers.servers){
					var d = json.selectableServers.servers[i].serverId;
					domains.push(1*i);
				}
				domains.sort(); 
				kocmonitor.log('getDomains();');
				kocmonitor.setValue(''+k,''+now);
				return domains;
			}
		}
		else{
			var playerdomains=kocmonitor.getValue('PLAYERDOMAINS');
			if(!playerdomains){
				playerdomains=[]; playerdomains.push(1*kocmonitor.PLAYERDOMAIN);
				return playerdomains;
			}
			else{
				return JSON.parse(''+playerdomains);
			}
		}
	}
};
kocmonitor.getSavedInfo=function(){
	return(kocmonitor.getValue('ajaxparams',null));
};
kocmonitor.getSavedServerId=function(){
	return(kocmonitor.getValue('sid'));
};
kocmonitor.getCurrentCityId=function(){
	if(unsafeWindow && unsafeWindow.currentcityid){
		return JSON.parse(JSON.stringify(unsafeWindow.currentcityid));
	}
};
kocmonitor.getCities=function(){
	var seed = kocmonitor.getSeed();
	if(seed && seed.cities){
		return JSON.parse(JSON.stringify(seed.cities));
	}
};
kocmonitor.gameInfoSave=function(){
	if(unsafeWindow && unsafeWindow.seed){
		kocmonitor.setValue('PLAYERDOMAIN',			kocmonitor.PLAYERDOMAIN);
		kocmonitor.setValue('PLAYERUID',			kocmonitor.PLAYERUID);
		kocmonitor.setValue('PLAYERNAME',			kocmonitor.PLAYERNAME);
		kocmonitor.setValue('PLAYERALLIANCEID',		kocmonitor.PLAYERALLIANCEID);
		kocmonitor.setValue('PLAYERALLIANCENAME',	kocmonitor.PLAYERALLIANCENAME);
		kocmonitor.setValue('PLAYERMIST',			kocmonitor.PLAYERMIST);
		kocmonitor.setValueObject('PLAYERCITIES',	kocmonitor.PLAYERCITIES);
		kocmonitor.setValueObject('PLAYERDOMAINS',	kocmonitor.PLAYERDOMAINS);

		var current=null;
		var saved=null;
		var tmp=null;
		var thekey='';
		
		//seed
		tmp=[];
		for(var i in kocmonitor.PLAYERSEED){
			thekey = kocmonitor.STORAGEPREFIX+'SEED_'+i;
			kocmonitor.setValueObject(thekey,kocmonitor.PLAYERSEED[i]);
			tmp.push(i);
			//console.log(kocmonitor.getValueObject(thekey));
		}
		kocmonitor.setValueObject(kocmonitor.STORAGEPREFIX+'SEEDKEYS',tmp);
		
		//cities
		current=kocmonitor.getValueObject('PLAYERCITIES');
		thekey=kocmonitor.STORAGEPREFIX+'CITIES';
		saved=kocmonitor.getValueObject(thekey);
		if(current!=saved){
			kocmonitor.setValueObject(				kocmonitor.STORAGEPREFIX+'CITIES',current);
		}
		kocmonitor.setValueObject('ACCOUNTIDS',		kocmonitor.ACCOUNTIDS);
	}
};
kocmonitor.gameInfoLoad=function(){
	if(unsafeWindow && unsafeWindow.seed){
		kocmonitor.PLAYERUID			= kocmonitor.getUserId();
		kocmonitor.PLAYERNAME			= kocmonitor.getUserName();
		kocmonitor.PLAYERDOMAIN			= kocmonitor.getServerId();
		kocmonitor.PLAYERDOMAINS		= kocmonitor.getDomains();
		kocmonitor.PLAYERALLIANCEID		= kocmonitor.getPlayerAllianceId();
		kocmonitor.PLAYERALLIANCENAME	= kocmonitor.getPlayerAllianceName();
		kocmonitor.PLAYERMIST			= kocmonitor.getPlayerMist();
		kocmonitor.PLAYERCITIES			= kocmonitor.getCities();
		kocmonitor.AUTHORIZEDSITES		= kocmonitor.authorizedWebsiteGet();
		kocmonitor.STORAGEPREFIX		= kocmonitor.PLAYERUID+'_'+kocmonitor.PLAYERDOMAIN+'_';
		kocmonitor.PLAYERSEED			= kocmonitor.getSeed();
		kocmonitor.ACCOUNTIDS			= kocmonitor.getSavedUserIds(kocmonitor.PLAYERUID);
	}
	else{
		kocmonitor.PLAYERUID			= kocmonitor.getValue('PLAYERUID');
		kocmonitor.PLAYERNAME			= kocmonitor.getValue('PLAYERNAME');
		kocmonitor.PLAYERDOMAIN			= kocmonitor.getValue('PLAYERDOMAIN');
		kocmonitor.PLAYERDOMAINS		= kocmonitor.getValueObject('PLAYERDOMAINS');
		kocmonitor.PLAYERALLIANCEID		= kocmonitor.getValue('PLAYERALLIANCEID');
		kocmonitor.PLAYERALLIANCENAME	= kocmonitor.getValue('PLAYERALLIANCENAME');
		kocmonitor.PLAYERMIST			= kocmonitor.getValue('PLAYERMIST');
		kocmonitor.PLAYERCITIES			= kocmonitor.getValueObject('PLAYERCITIES');
		kocmonitor.AUTHORIZEDSITES		= kocmonitor.authorizedWebsiteGet();
		kocmonitor.STORAGEPREFIX		= kocmonitor.PLAYERUID+'_'+kocmonitor.PLAYERDOMAIN+'_';

		//the seed is too large to store as one string so we have to reassemble
		kocmonitor.PLAYERSEED={};
		kocmonitor.PLAYERSEEDKEYS		= kocmonitor.getValueObject(kocmonitor.STORAGEPREFIX+'SEEDKEYS');
		if(kocmonitor.PLAYERSEEDKEYS){
			var prefix=kocmonitor.STORAGEPREFIX+'SEED_';
			var k='';
			for(var i in kocmonitor.PLAYERSEEDKEYS){
				k = kocmonitor.PLAYERSEEDKEYS[i];
				kocmonitor.PLAYERSEED[k]=JSON.parse(kocmonitor.getValue(prefix+k));
			}
		}
		kocmonitor.ACCOUNTIDS			= kocmonitor.getSavedUserIds();
	}
};
kocmonitor.getKnightList=function(city){
	var seed = kocmonitor.getSeed();
	var knights=seed.knights;
	var a=[];	
	if(city){
		city='city'+city;
		if(knights[city]){
			for(var i in knights[city]){
				var knight={};
				knight.id=knights[city][i]['knightId'];
				knight.name=knights[city][i]['knightName'];
				a.push(knight);
			}
		}
	}else{
		for(var city in knights){
			for(var i in knights[city]){
				var knight={};
				knight.id=knights[city][i]['knightId'];
				knight.name=knights[city][i]['knightName'];
				knight.city=knights[city][i]['cityId'];
				a.push(knight);
			}
		}
	}
	return a;
};
kocmonitor.getServerId=function(){
	if(unsafeWindow && unsafeWindow.g_server){
		return (1*unsafeWindow.g_server);
	}
};
kocmonitor.getServerName=function(){
	return;
};
kocmonitor.getSavedUserIds=function(uid){
	var uids=kocmonitor.getValueObject('ACCOUNTIDS',[uid]);
	if(uid){
		if(!$.inArray(uid,uids)){
			uids.push(uid);
		}
	}
	return uids;
};
kocmonitor.getUserId=function(){
	if(unsafeWindow && unsafeWindow.g_ajaxparams && unsafeWindow.g_ajaxparams['tvuid']){
		return JSON.parse(JSON.stringify(unsafeWindow.g_ajaxparams['tvuid']));
	}
};
kocmonitor.getUserName=function(){
	if(unsafeWindow && unsafeWindow.seed && unsafeWindow.seed.player && unsafeWindow.seed.player.name){
		return JSON.parse(JSON.stringify(unsafeWindow.seed.player.name));
	}
};
kocmonitor.getSeed=function(){
	if(unsafeWindow && unsafeWindow.seed){
		return JSON.parse(JSON.stringify(unsafeWindow.seed));
	}
};
kocmonitor.getModerators=function(){
	if(unsafeWindow && unsafeWindow.moderators){
		return JSON.parse(JSON.stringify(unsafeWindow.moderators));
	}
};
kocmonitor.getThroneItemList=function(){
	if(unsafeWindow && unsafeWindow.seed && unsafeWindow.seed.throne && unsafeWindow.seed.throne.inventory){
		var a = [];
		var collection=unsafeWindow.seed.throne.inventory;
		for(var i in collection){
			a.push(collection[i]);
		}
		return a;
	}
};
kocmonitor.getPlayerAllianceId=function(){
	if(unsafeWindow && unsafeWindow.seed && unsafeWindow.seed.allianceDiplomacies && unsafeWindow.seed.allianceDiplomacies.allianceId){
		return JSON.parse(JSON.stringify(unsafeWindow.seed.allianceDiplomacies.allianceId));
	}
	return 0;
};
kocmonitor.getPlayerAllianceName=function(){
	if(unsafeWindow && unsafeWindow.seed && unsafeWindow.seed.allianceDiplomacies && unsafeWindow.seed.allianceDiplomacies.allianceName){
		return JSON.parse(JSON.stringify(unsafeWindow.seed.allianceDiplomacies.allianceName));
	}
	return '';
};
kocmonitor.getPlayerMist=function(){
	var result=0;
	if(unsafeWindow && unsafeWindow.seed && unsafeWindow.seed.playerEffects && unsafeWindow.seed.playerEffects.fogExpire){
		result=unsafeWindow.seed.playerEffects.fogExpire;
		var timestamp = Math.floor(new Date().getTime()/1000);
		if(timestamp > result){
			result=0;			
		}
	}
	return JSON.parse(JSON.stringify(result));
};

kocmonitor.getThroneItems=function(){
	if(unsafeWindow && unsafeWindow.seed && unsafeWindow.seed.throne){
		return JSON.parse(JSON.stringify(unsafeWindow.seed.throne));
	}
};
kocmonitor.getThroneItemAttributes=function(){
	if(unsafeWindow && unsafeWindow.cm && unsafeWindow.cm.features && unsafeWindow.cm.features.TR_EFFECTS){
		return JSON.parse(unsafeWindow.cm.features.TR_EFFECTS);
	}
};
kocmonitor.sendToKocmon=function(type,payload,callback){
	var url =kocmonitor.URL;
	var obj={};
	obj.type = type;
	obj.s = kocmonitor.PLAYERDOMAIN;
	obj.u = kocmonitor.PLAYERUID;
	obj.data = payload;
	obj.version=kocmonitor.SCRIPTVERSION;
	var args='data='+encodeURIComponent(JSON.stringify(obj));
	GM_xmlhttpRequest({
		"method": 'POST',
		"url": url,
		"data": args,
		"headers": {
			"Content-type" : "application/x-www-form-urlencoded"
		},
		"onreadystatechange": function(r) {
			
		},
		"onload": function(r) {
			if(r && r.status!=200){
				var s='';
				s=s+"\n"+'url='+url;
				s=s+"\n"+'data='+JSON.stringify(obj);
				if(r.status){s=s+"\n"+'status:'+r.status;}
				if(r.statusText){s=s+"\n"+'statusText'+r.statusText;}
				if(r.responseHeaders){s=s+"\n"+'responseHeaders'+r.responseHeaders;}
				if(r.responseText){s=s+"\n"+'responseText'+r.responseText;}
				if(r.readyState){s=s+"\n"+'readyState'+r.readyState;}
				kocmonitor.log(s);
			}
			if(callback) {
				callback(r);
			}
		}
	});	
};
kocmonitor.sendToKabam=function(args,page,callback){
	var async = false;
	var data=JSON.parse(JSON.stringify(unsafeWindow.g_ajaxparams));
	for(var i in args){
		data[i]=args[i];
	}
	var url = kocmonitor.createAjaxUrl(page);
	var str='';
	for(var i in data){
		str=str+'&'+i+'='+data[i];
	}
	str=str.substr(1);
	if(callback){
		async=true;
	}
	var result=null;
    $.ajax({
        'type': "POST",
        'url': url,
        'data': str,
        'async': async,
        'success': function(str){
            result = JSON.parse(str);
            if(!result){
            	result=str;
            }
            kocmonitor.debug_traffic('ajax/'+page+'.php',args,str);
        }
    });
    return result;
};
kocmonitor.antiCheat=function(){
	var now = 1*(new Date().getTime());
	if(now>kocmonitor.TIMELEFTOFINIT){
		return;
	}
	if(unsafeWindow){
		if(unsafeWindow.cm){
			if(unsafeWindow.cm.MixPanelTracker) {
				unsafeWindow.cm.MixPanelTracker.track=function(){};
			}
			if(unsafeWindow.cm.cheatDetector){
				unsafeWindow.cm.cheatDetector={
					detect:function(){}
				};
			}
		}
		if(unsafeWindow.MixpanelLib) {
			unsafeWindow.MixpanelLib.prototype={
				register:function(){},
				track:function(t){}
			};
		}
		if(!unsafeWindow.cm || !unsafeWindow.MixpanelLib) {
			window.setTimeout(function() {
				kocmonitor.antiCheat();
			},1000);
		} else {
			kocmonitor.log('Mixpanel removed');
			kocmonitor.REMOVEDMIXPANEL=true;
		}
	}
};
kocmonitor.scriptAdd=function(source,objname){
	if (typeof source == 'function') {
		source = ""+source.toString();
	}
	else if(typeof source == 'object' && objname){
		var str='var '+objname+'={};';
		for(var k in source){
			str=str+"\n"+objname+'.'+k+'='+source[k].toString();
		}
		source=str;
	}
	else{

	}
	source='(function(){'+"\n"+source+"\n"+'window['+"'"+objname+"'"+']='+objname+';'+"\n"+'}());';
	var script = document.createElement('script');
	script.setAttribute("type", "text/javascript");
	script.textContent = ""+source;
	window.document.body.appendChild(script);
	window.document.body.removeChild(script);
};
kocmonitor.scriptInclude=function(src){
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.src=src;
	window.document.body.appendChild(script);
	window.document.body.removeChild(script);
};
kocmonitor.addCssResource=function(src){
	var elem = document.createElement('link');
	elem.setAttribute('href',src);
	elem.setAttribute('rel','stylesheet');
	elem.setAttribute('type','text/css');	
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(elem);
};
kocmonitor.hasClass=function(ele,cls){
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};
kocmonitor.addClass=function(ele,cls){
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
};
kocmonitor.removeClass=function(ele,cls){
	if (kocmonitor.hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
};
kocmonitor.getAjaxParams=function(){
	if(unsafeWindow && unsafeWindow.g_ajaxparams){
		return JSON.parse(JSON.stringify(unsafeWindow.g_ajaxparams));
	}
};
kocmonitor.saveInfo=function(){
	var info=JSON.stringify(kocmonitor.getCurrentInfo());
	if(info){
		var sid=kocmonitor.getServerId();
		kocmonitor.setValue('ajaxparams',info);
		kocmonitor.setValue('sid',sid);	
	}
};
kocmonitor.send_info=function(force){
	if (unsafeWindow.g_ajaxparams && unsafeWindow.g_server) {
		var now=new Date().getTime();
		var k=kocmonitor.STORAGEPREFIX+'lastsent_ajaxparams';
		var lastsent=kocmonitor.getValue(k,0);
		if(force || 1*lastsent+kocmonitor.SENDINFODELAY<now){
			var savedkey=kocmonitor.STORAGEPREFIX+'saved_ajaxparams';
			var saved=JSON.parse(kocmonitor.getValue(savedkey,null));
			var json = kocmonitor.getAjaxParams();
			if(force || saved != json){
				kocmonitor.setValue(k,''+now+'');
				kocmonitor.setValue(savedkey,''+JSON.stringify(json));
				kocmonitor.sendToKocmon('info',json);
				kocmonitor.log('send_info();');
			}
		}
	}
};
kocmonitor.send_seed=function(force){
	if (unsafeWindow.g_ajaxparams && unsafeWindow.g_server) {
		var now=new Date().getTime();
		var k=kocmonitor.STORAGEPREFIX+'lastsent_seed';
		var lastsent=kocmonitor.getValue(k,0);
		if(force || 1*lastsent+kocmonitor.SENDSEEDDELAY<now){
			kocmonitor.setValue(k,''+now+'');
			var json =kocmonitor.getSeed();
			kocmonitor.sendToKocmon('seed',json);
			kocmonitor.log('send_seed();');
		}
	}
};
kocmonitor.sanatizeInt=function(str){return 1*str;};
kocmonitor.sanatizeString=function(str){return ''+str;};
kocmonitor.initAddonToggleButton=function(b,k,l){
	setTimeout(function() {
		var elem=document.getElementById(b);
		if(elem){
			var state=kocmonitor.getValue(k);
			if(state && state===1){
				elem.setAttribute('class','on');
				elem.innerHTML='On';
			}else{
				elem.setAttribute('class','off');
				elem.innerHTML='Off';
			}		
			elem.addEventListener('click', function(){					
				var obj=this;
				var state=obj.getAttribute('class');
				if(state.indexOf('on')>-1){
					obj.setAttribute('class','off');
					kocmonitor.deleteValue(k);
					obj.innerHTML='Off';
					state=null;
				}else{
					obj.setAttribute('class','on');
					kocmonitor.setValue(k,1);
					obj.innerHTML='On';
					state=1;
				}						
			}, true);
		}
	}, 10000);	
};
kocmonitor.initAddonExtensionButton=function(l,ver){
	var p=document.getElementById(kocmonitor.ELEMENTPREFIX+'tab_content_main_addons');
	var id=l.toLowerCase();
	id=id.replace(" ","");
	var container=document.createElement('div');
	var button=document.createElement('button');
	button.id=kocmonitor.ELEMENTPREFIX+id+'_button';	
	button.setAttribute('class','off');
	button.innerHTML='Off';
	container.appendChild(button);
	var label=document.createElement('span');
	label.innerHTML='&nbsp;Addon '+l+' v'+ver;
	container.appendChild(label);
	p.appendChild(container);
};
kocmonitor.initAddonExtension=function(addonName,addonSource,addonInit,addonVersion){
	if(addonSource){kocmonitor.scriptAdd(addonSource);}
	if(addonInit){
		var tmp=setInterval(
			function() {
				if(unsafeWindow.kocmon){
					clearInterval(tmp);
					unsafeWindow.createTab(addonName,'');
					kocmonitor.initAddonExtensionButton(addonName,(addonVersion||'1.0'));
					kocmonitor.addonInit();
				}
			},
		1000);
	}
};
kocmonitor.dotask=function(){
	var now=new Date().getTime();
	kocmonitor.setValue('lasttaskrun',''+now+'');
	kocmonitor.setValue('currentdomain',''+kocmonitor.getServerId()+'');
	var command = kocmonitor.getValue('command', '');
	if (command != '') {
		kocmonitor.setValue('command','');
		kocmonitor.log('command=' + command);
		var js = '';
		var cmd = command.split('|');
		var timestamp = cmd.shift();
		var url = cmd.shift();
		var mod = cmd.shift();
		var s = cmd.shift();
		var type = cmd.shift();
		if(!s || s=='' || 1*s===kocmonitor.PLAYERDOMAIN){
			switch (type) {
				case 'evalscript':
					kocmonitor.scriptAdd(cmd[0]);
					break;
				case 'includescript':
					kocmonitor.scriptInclude(cmd[0]);
					break;
				case 'location':
					var x = kocmonitor.sanatizeInt(cmd[0]);
					var y = kocmonitor.sanatizeInt(cmd[1]);
					kocmonitor.mapMove(x,y);
					break;
				case 'setbookmark':
					var x = kocmonitor.sanatizeInt(cmd[0]);
					var y = kocmonitor.sanatizeInt(cmd[1]);
					var n = 'loc';
					if(cmd[2]){
						n = kocmonitor.sanatizeString(cmd[2]);
					}
					kocmonitor.bookmarkAdd(x,y,n);
					break;
				case 'deletebookmark'://does not work
					var x = kocmonitor.sanatizeInt(cmd[0]);
					var y = kocmonitor.sanatizeInt(cmd[1]);
					kocmonitor.bookmarkDelete(x,y);
					break;
				default:
					break;
			}
		}
	}
};
kocmonitor.intercept_unknown=function(url,text){};
kocmonitor.intercept_fetchMapTiles=function(json){};
kocmonitor.intercept_updateSeed=function(json){};
kocmonitor.intercept_getChat=function(json){};
kocmonitor.intercept_viewCourt=function(json){};
kocmonitor.intercept=function(url, r){
	if (r && r.status == 200 && r.responseText) {
		var str=r.responseText.trim();
		var fm=url.match('ajax/([a-zA-Z_]+).php');
		if(fm && fm.length == 2){
			kocmonitor.debug_traffic(url,r,str);
			var json=null;
			try{
				json=JSON.parse(""+str);
			}catch(e){
				return;
			}
			var page = fm[1];
			switch(page){
				case 'fetchMapTiles':
					kocmonitor.intercept_fetchMapTiles(json);
					break;
				case 'updateSeed':
					//kocmonitor.intercept_updateSeed(json);
				break;
				case 'getChat':
					kocmonitor.intercept_getChat(json);
				break;
				case 'viewCourt':
					kocmonitor.intercept_viewCourt(json);
				break;
				default:
				break;
			}
		}
	}
	//kocmonitor.intercept_unknown(url,r.responseText);
};
kocmonitor.showTime=function(timestamp,version){
	var now=null;
	if(timestamp){
		now = new Date(timestamp);
	}else{
		now = new Date();
	}
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	var timeValue = "" + ((hours >12) ? hours -12 :hours);
	if (timeValue == "0") timeValue = 12;
	timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
	timeValue += ((seconds < 10) ? ":0" : ":") + seconds;
	timeValue += (hours >= 12) ? " PM" : " AM";
	return timeValue;	
};
kocmonitor.log=function(msg,targetId,replaceIt){
	var elem=null;
	if(targetId){
		elem =$('#'+targetId);
	}
	else{
		elem =$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-log-generic-result');
	}
	if(elem && elem.length==1){
		var html='';
		var type=$.type(msg);
		if(type=='string'){
			msg.replace(/</gi,"&lt;");
			msg.replace(/>/gi,"&gt;");
			html='<div>'+kocmonitor.showTime()+' '+msg+'</div>';
		}
		else{
			msg=JSON.stringify(msg,null,"\t");
			msg=msg.replace(/</gi,'&lt;');
			msg=msg.replace(/>/gi,'&gt;');
			html='<pre>'+kocmonitor.showTime()+"\n"+msg+'</pre>';
		}
		if(replaceIt==1){
			elem.html(html);
		}
		else{
			var n = elem.children().length;
			if(n>30){
				elem.children(':last').remove();
			}
			elem.prepend(html);
		}
	}
};
kocmonitor.debug_traffic=function(url,r,response){
	var n = $('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-log-traffic-result').children().length;
	if(n>20){
		$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-log-traffic-result').children(':last').remove();
	}
	var query=JSON.stringify(r.args);
	response=response.replace(/^\s+|\s+$/g,'');
	response=response.replace(/</gi,"&lt;");
	response=response.replace(/>/gi,"&gt;");
	//var query=JSON.stringify(args);
	//$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-log-traffic-result').prepend('<div><div>'+showTime()+'&nbsp;'+url+'</div><div class="url">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+query+'</div><div class="result">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+response+'</div></div>');
	var status='';
	if(r.status != 200){
		status='&nbsp;('+r.status+')';
	}
	$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-log-traffic-result').prepend(
		'<div><div>'+
		kocmonitor.showTime()+'&nbsp;'+
		url+'&nbsp;'+
		//(Math.floor(r.took*1000)/1000)+'ms&nbsp;'+
		status+
		'</div>'+
		//'<div class="">'+r.requestHeaders+'</div>'+
		'<div class="url">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SND:&nbsp;'+query+'</div>'+
		'<div class="result">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REC:&nbsp;'+response+'</div>'+
		'</div>');
};
kocmonitor.update=function(){
	kocmonitor.log('update()');
	var wait=1000*60*60*24;
	var now=''+new Date().getTime();
	var k='script_'+kocmonitor.SCRIPTID+'_';
	var key_name=k+'name';
	var key_version=k+'version';
	var key_update=k+'update';
	var local_name=kocmonitor.getValue(key_name);
	var local_version=kocmonitor.getValue(key_version);
	GM_xmlhttpRequest({
		method : 'GET',
		url : 'http://userscripts.org/scripts/source/' + kocmonitor.SCRIPTID + '.meta.js?' + now,
		headers : {'Cache-Control' : 'no-cache'},
		onload : function(resp) {
			var rt = resp.responseText;
			var remote_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
			//var remote_version = parseInt(/@version\s*(.*?)\s*$/m.exec(rt)[1]);
			var remote_version = (/@version\s*(.*?)\s*$/m.exec(rt))[1];
			kocmonitor.setValue(key_name, remote_name);
			kocmonitor.setValue(key_version, remote_version);
			kocmonitor.setValue(key_update, now);
			if(remote_version > kocmonitor.SCRIPTVERSION){
				if(confirm(''+kocmonitor.getTranslation(1,remote_name))){
					GM_openInTab('http://userscripts.org/scripts/show/' + kocmonitor.SCRIPTID);
				}
			}
			else if(remote_version < kocmonitor.SCRIPTVERSION) {
				if(confirm(''+kocmonitor.getTranslation(3,remote_name))){
					GM_openInTab('http://userscripts.org/scripts/show/' + kocmonitor.SCRIPTID);
				}						
			}
			else{
				alert(kocmonitor.getTranslation(2));
			}
		}
	});
};
kocmonitor.watchtraffic=function(){
    var OldXHR = unsafeWindow.XMLHttpRequest;
    // create a wrapper object to emulate XMLHttpRequest object
    var NewXHR = function() {
        var self = this;
        var actualXHR = new OldXHR();  
        this.requestHeaders = "";
        this.requestBody = "";     
        // emulate methods
        this.open = function(a, b, c, d, e) { 
        	self.url=b;
        	self.took=new Date().getTime();
        	self.openMethod = a.toUpperCase();
        	self.openURL = b;
        	if (self.onopen != null && typeof(self.onopen) == "function") { self.onopen(a,b,c,d,e); } 
            return actualXHR.open(a,b,c,d,e); 
        };
        this.send = function(a) {
        	self.args=kocmonitor.deparam(a);
        	if (self.onsend != null && typeof(this.onsend) == "function") { self.onsend(a); } 
        	self.requestBody += a;
        	return actualXHR.send(a); 
        };
        this.setRequestHeader = function(a, b) {
        	if (self.onsetrequestheader != null && typeof(self.onsetrequestheader) == "function") { self.onsetrequestheader(a, b); } 
        	self.requestHeaders += a + ":" + b + "\r\n";
        	return actualXHR.setRequestHeader(a, b); 
        };
        this.getRequestHeader = function() {
            return actualXHR.getRequestHeader(); 
        };
        this.getResponseHeader = function(a) { return actualXHR.getResponseHeader(a); };
        this.getAllResponseHeaders = function() { return actualXHR.getAllResponseHeaders(); };
        this.abort = function() { return actualXHR.abort(); };
        this.addEventListener = function(a, b, c) { alert("not implemented yet"); };
        this.dispatchEvent = function(e) { alert("not implemented yet"); };
        this.openRequest = function(a, b, c, d, e) { alert("not implemented yet"); };
        this.overrideMimeType = function(e) { alert("not implemented yet"); };
        this.removeEventListener = function(a, b, c) { alert("not implemented yet"); };
        // copy the values from actualXHR back onto self
        function copyState() {
            // copy properties back from the actual XHR to the wrapper
            try {
                self.readyState = actualXHR.readyState;
            } catch (e) {}
            try {
                self.status = actualXHR.status;
            } catch (e) {}
            try {
                self.responseText = actualXHR.responseText;
            } catch (e) {}
            try {
                self.statusText = actualXHR.statusText;
            } catch (e) {}
            try {
                self.responseXML = actualXHR.responseXML;
            } catch (e) {}
        }
        // emulate callbacks from regular XMLHttpRequest object
        actualXHR.onreadystatechange = function() {
            copyState();
            try {
                if (self.onupdate != null && typeof(self.onupdate) == "function") { self.onupdate(); } 
            } catch (e) {}           
            if (self.onreadystatechange != null && typeof(self.onreadystatechange) == "function") { return self.onreadystatechange(); } 
        };
        actualXHR.onerror = function(e) {
            copyState();
            try {
                if (self.onupdate != null && typeof(self.onupdate) == "function") { self.onupdate(); } 
            } catch (e) {}
            if (self.onerror != null && typeof(self.onerror) == "function") { 
                return self.onerror(e); 
            } else if (self.onreadystatechange != null && typeof(self.onreadystatechange) == "function") { 
                return self.onreadystatechange(); 
            }
        };
        actualXHR.onload = function(e) {
            copyState();
            self.took=1*(new Date().getTime()-self.took);
            kocmonitor.intercept(self.url,self);
            try {
                if (self.onupdate != null && typeof(self.onupdate) == "function") { self.onupdate(); } 
            } catch (e) {}
            if (self.onload != null && typeof(self.onload) == "function") { 
                return self.onload(e); 
            } else if (self.onreadystatechange != null && typeof(self.onreadystatechange) == "function") { 
                return self.onreadystatechange(); 
            }
        };
        actualXHR.onprogress = function(e) {
            copyState();
            try {
                if (self.onupdate != null && typeof(self.onupdate) == "function") { self.onupdate(); } 
            } catch (e) {}
            if (self.onprogress != null && typeof(self.onprogress) == "function") { 
                return self.onprogress(e);
            } else if (self.onreadystatechange != null && typeof(self.onreadystatechange) == "function") { 
                return self.onreadystatechange(); 
            }
        };
    };
    unsafeWindow.XMLHttpRequest = NewXHR;	
};
kocmonitor.kocIsRunning=function(){
	var n = kocmonitor.getValue('lasttaskrun',0);
	var t = 1*new Date().getTime();
	if(1*n+5000 > 1*t){
		return true;
	}else{
		return false;
	}
};
kocmonitor.interface_addcss=function(){
	var main='#'+kocmonitor.ELEMENTPREFIX;
	GM_addStyle(main+' *{font-size:12px;}');
	GM_addStyle(main+' p{padding:0px;margin:0px;}');
	GM_addStyle(main+' pre{padding:0px;margin:0px; overflow:auto; max-height:790px;}');
	GM_addStyle(main+' a{color:rgb(17,70,132); text-decoration:underline;}');
	GM_addStyle(main+' a:hover{color:#A52A2A;}');
	GM_addStyle(main+' h2 a{font-size:18px;}');
	GM_addStyle(main+' {position:absolute; padding:0px; margin:0px; background-image:url(http://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/dialog_740_r2_c1.jpg); background-repeat:no-repeat; background-position:0px 0px; top:136px; left:8px; width:742px; border:1px solid #beb89e; background-color:#fffef6; z-index:999999; display:none;}');
	GM_addStyle(main+' ul{padding:0px; margin:0px; display:block;}');
	GM_addStyle(main+'-window{position:relative; max-height:1002px; overflow:auto; display:block; padding:0px; margin:0px; margin-left:18px; margin-right:18px; margin-top:5px; margin-bottom:0px;}');
	GM_addStyle(main+' .top{height:45px;}');
	GM_addStyle(main+' .top h2{text-align:center; padding:0px; margin:0px; margin-top:6px;}');	
	GM_addStyle(main+' .kocmon_tabs{position:relative; clear:both; display:block; padding:0px; margin:0px; margin-left:0px; margin-right:0px; margin-top:0px;}');
	GM_addStyle(main+' .kocmon_tab_contents > div { position:relative; z-index:999; max-height:960px; overflow:auto; top:0px; background-color:#fffef6; border:1px solid #beb89e; border-radius: 5px; -moz-border-radius: 5px; padding:5px; margin-bottom:0px;}');
	GM_addStyle(main+' .kocmon_tab_buttons{ position:relative; padding:0px; margin:0px; top:0px; left:0px; z-index:1000;}');
	GM_addStyle(main+' .kocmon_tab_buttons li{ position:relative; padding:0px; margin:0px; list-style:none; display:inline-block;}');
	GM_addStyle(main+' .kocmon_tab_buttons .selected {top:1px; padding-top:4px; color:#000;}');
	GM_addStyle(main+' .kocmon_tab_button { font-weight:normal; font-style:normal; font-size:12px; position:relative;  background-color:#fffef6; color:#beb89e; display:inline-block; white-space:nowrap; border:1px solid #beb89e; border-radius: 5px; border-bottom-right-radius:0px; border-bottom-left-radius:0px; font-size:12px; font-weight: bold; position:relative; padding-left:6px; padding-right:6px; padding-top:3px; padding-bottom:2px; color:#beb89e; text-decoration: none; outline:none; border-bottom:0px; }');
	GM_addStyle(main+'-tabs-throne-upgrade .status {width:29px; height:29px; text-align:center; font-size:24px; font-weight:bold; color:#fff;}');
	GM_addStyle(main+'-tabs-throne-upgrade .status1 {}');
	GM_addStyle(main+'-tabs-throne-upgrade .status3 { background-image:url(https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_fail_overlay.png); }');
	GM_addStyle(main+'-tabs-throne-upgrade .status4 { background-image:url(https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_hammer.png); }');
	GM_addStyle(main+' .throne-upgrade-order { text-align:center; font-size:24px; color:#fff;}');
	GM_addStyle(main+' .throne-upgrade-item { padding:0px; margin-right:5px; margin-bottom:5px; display:inline-block; width:29px; height:29px; border:2px outset; overflow:hidden; background-position:0px 0px; background-color:#000; }');
	GM_addStyle(main+'_logo{ z-index: 10; display:inline-block; position:relative; left:-411px; top:-88px; width: 32px; height: 32px; border:1px solid #000; background-repeat: no-repeat; background-image: url('+kocmonitor.IMAGES[0]+'); }');
};
kocmonitor.interface_addMainButton=function(){
	if( $('#'+kocmonitor.ELEMENTPREFIX).length > 0 ){
		//console.log('window exists so we nolonger need to try to create');
		return;
	}
	if( $('.taskbar .rightColumn').length == 0 ){
		//console.log('main_engagement_tabs is missing');
		return;
	}
	var obj=$('.taskbar .rightColumn').get(0);
	
	var me=this;
	var elem,elemChild,str;
	
	elem=document.createElement('a');
	elem.addEventListener('click', function(event) {
		kocmonitor.interface_toggle();
		return false;
	},false);
	elem.setAttribute('id',kocmonitor.ELEMENTPREFIX+'_logo');
	elem.setAttribute('title','Kocmonitor '+kocmonitor.SCRIPTVERSION);
	obj.appendChild(elem);
		
	obj=document.createElement('div');
	obj.setAttribute('id',kocmonitor.ELEMENTPREFIX);
	obj.id=''+kocmonitor.ELEMENTPREFIX;
	str='';
	str=str+'<div class="top"><h2><a href="http://kocmon.com" target="_blank">Kocmon.com</a></h2></div>';
	str=str+'<div id="'+kocmonitor.ELEMENTPREFIX+'-window">';
	str=str+'	<div class="kocmon_tabs">';
	str=str+'		<ul class="kocmon_tab_buttons">';
	str=str+'			<li><a data-href="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom">Kocmon.com</a></li>';
	str=str+'		</ul>';
	str=str+'		<div class="kocmon_tab_contents">';
	str=str+'			<div id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom">';
	str=str+'				<div class="kocmon_tabs">';
	str=str+'					<ul class="kocmon_tab_buttons">';
	str=str+'						<li><a data-localize="eng" data-href="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-mod">Mod</a></li>';
	str=str+'						<li><a data-localize="eng" data-href="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-website">Website</a></li>';
	str=str+'						<li><a data-localize="eng" data-href="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-log">Log</a></li>';
	str=str+'						<li><a data-localize="eng" data-href="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug">Debug</a></li>';
	str=str+'					</ul>';
	str=str+'					<div class="kocmon_tab_contents">';
	str=str+'						<div id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-mod">';	
	str=str+'							<div>';
	str=str+'								<button id="'+kocmonitor.ELEMENTPREFIX+'-tabs-main-update" data-localize="eng">Update</button>&nbsp;v<span id="'+kocmonitor.ELEMENTPREFIX+'-tabs-main-version">'+kocmonitor.SCRIPTVERSION+'</span>';
	str=str+'							</div>';
	str=str+'						</div>';	
	str=str+'					</div>';
	str=str+'				</div>';
	str=str+'			</div>';
	str=str+'		</div>';
	str=str+'	</div>';
	str=str+'	<pre id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-log-result"></pre>';
	str=str+'</div>';
	obj.innerHTML=str;

	elem=document.createElement('a');
	elem.addEventListener('click', function(event) {
		kocmonitor.interface_toggle(); return false;
	}, 'false');
	elem.setAttribute('style','background-image:url(https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/close_icon.png); position:absolute; top:8px; right:6px; width:20px; height:20px;');
	elem.innerHTML='&nbsp;';
	$(obj).append(elem);
	
	elem=document.createElement('div');
	elem.setAttribute('style','position:relative; background-image:url(https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/dialog_740_r3_c1.jpg); background-repeat:no-repeat; background-position:0px 0px; width:742px; height:52px;');
	elem.innerHTML='&nbsp;';
	$(obj).append(elem);
	
	document.body.appendChild(obj);
	kocmonitor.interface_correctWindowLocation();
	$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-main-update').click(function(){
		kocmonitor.update();
	});
	if(kocmonitor.ext){
		for(var i in kocmonitor.ext){
			kocmonitor.ext[i].timmers=[];
			if(kocmonitor.ext[i].init){
				kocmonitor.ext[i].init();
			}
		}
	}
	kocmonitor.interface_createTabs('.kocmon_tabs');
	kocmonitor.CORRECTWINDOWTIMMER=setInterval(function(){
		kocmonitor.interface_correctWindowLocation();
	},2000);
	setTimeout(function(){
		clearInterval(kocmonitor.CORRECTWINDOWTIMMER);
	},8000);
	//console.log('kocmonitor.interface_addMainButton stop');
};
kocmonitor.addSneezeGuard=function(id){
	$p=null;
	$n=null;
	$p=$('#'+id);
	if($p && $p.length==0){
		return;
	}
	$p.css('position','relative');
	$n=$('#'+id+'_sneezeguard');
	if($n && $n.length==0){
		$p.append('<div id="'+id+'_sneezeguard" style="position:absolute; top:0px; left:0px; width:100%; height:100%; background-color:rgba(0,0,0,.5); color:#fff;">&nbsp;</div>');
	}
};
kocmonitor.interface_correctWindowLocation=function(){
	var top = $('#main_engagement_tabs').position().top;
	var current=$('#'+kocmonitor.ELEMENTPREFIX).position().top;
	if(current<1*top+142){
		$('#'+kocmonitor.ELEMENTPREFIX).css('top',(1*top+142)+'px');
	}
};
kocmonitor.interface_toggle=function(){
	$('#'+kocmonitor.ELEMENTPREFIX).toggle();
};
kocmonitor.interface_createTabs=function(id){
	var $tabs = $(id);
	if($tabs.length > 0){
		$tabs.each(function(tabgroup) {
			var first=null;
			var $ul=null;
			$(this).addClass('kocmon_tabs');
			//check for sub content
			var foundButtons=0;
			var foundContent=0;
			$(this).children().each(function(index){
				if($(this).hasClass('kocmon_tab_contents')){
					foundContent=1;
				}
				if($(this).hasClass('kocmon_tab_buttons')){
					foundButtons=1;
					$ul=$(this);
				}
			});
			var found=null;
			if(foundButtons==0){
				$(this).children().each(function(index){
					var tag=this.tagName.toUpperCase();
					if(tag=='UL'){
						if(!found){
							$(this).addClass('kocmon_tab_buttons');
							$ul=$(this);
							found=1;
						}
					}
				});
				if(!found){
					var $ul='<ul class="kocmon_tab_buttons"></ul>';
					$(this).prepend($ul);
				}
			}
			$('.kocmon_tab_contents',$(this)).children().each(function(index) {
				$(this).addClass('kocmon_tab_content');
			});
			if(!$ul){
				$ul=$('<ul />');
				$ul.addClass('kocmon_tab_buttons');
				$('.kocmon_tab_content',$(this)).each(function(index) {
					var title='';
					var localize='';
					if($(this).attr('title')){
						title=$(this).attr('title');
						$(this).removeAttr('title');
						localize=$(this).attr('data-localize');
						$(this).removeAttr('data-localize');
					}
					else{
						title='Tab'+index;
					}
					var id;
					if($(this).attr('id')){
						id=$(this).attr('id');
					}
					else{
						id='tab_'+tabgroup+'_'+index;
						$(this).attr('id',id);
					}
					$li=$('<li />');
					$a=$('<a />');
					//$a.attr('href','#'+id);
					$a.data('href',id);
					$a.data('localize',localize);
					$a.attr('id',id+'_button');
					$a.html(title);
					$li.append($a);
					$ul.append($li);
				});
				$(this).prepend($ul);
			}
			first=null;
			$('li a',$ul).each(function(index) {
				$(this).addClass('kocmon_tab_button');
				if($(this).attr('href')){
					var tmp=''+$(this).attr('href');
					tmp=tmp.replace('#','');
					$(this).data('href',tmp);
					$(this).removeAttr('href');
				}
				$(this).click(function(event){
					event.preventDefault();
					var container = $(this).parent().parent().parent();
					$('.kocmon_tab_contents:first',container).children('div').each(function(index){
						$(this).removeClass('selected');
						$(this).hide();	
					});
					$(this).parent().parent().children().each(function(index){
						$('a',$(this)).removeClass('selected');
					});
					$(this).addClass('selected');
					$('#'+$(this).data('href')).addClass('selected');
					$('#'+$(this).data('href')).show();	
				});
				if(!first){
					var $tab_button=$('a:first',$(this).parent());
					$tab_button.click();
					first=true;
				}
			});
		});
	}	
};
kocmonitor.SetCookie=function(cookieName,cookieValue,nDays){//i ripped this off from someone, not even sure it works
	var today = new Date();
	var expire = new Date();
	if (nDays==null || nDays==0) {
		nDays=1;
	}
	expire.setTime(today.getTime() + 3600000*24*nDays);
	document.cookie = cookieName+"="+escape(cookieValue) + ";expires="+expire.toGMTString();
};
kocmonitor.striphttp=function(str){
    var regexp = new RegExp(!str ? "https*:\/\/" : "https*:\/\/(www\.)*", "ig");
    return str.replace(regexp, "");	
};
kocmonitor.display_website=function(){
	//check if link to kocmon.com otherwise ignore any website features.
	var obj=$("a[href^='http://kocmon.com']");
	if(!obj || obj.length==0){
		return;
	}
	kocmonitor.gameInfoLoad();
	if(kocmonitor.authorizedWebsiteStatus()){
		kocmonitor.display_website_authorized();
	}
	else{
		kocmonitor.display_website_unauthorized();
	}
};
kocmonitor.display_website_unauthorized=function(){//works on any site
	window.setTimeout(function(){
		$('[data-kocmonitor]').each(function(){
			var json=$(this).data('kocmonitor');
			if(json){
				if(json.cmd){
					switch(json.cmd){
						case 'movemap'://this allows properly formated location buttons to move your in game map
							$(this).click(function(){
								if(kocmonitor.kocIsRunning()){
									if(json.domain && kocmonitor.PLAYERDOMAIN && json.domain > 0 && kocmonitor.PLAYERDOMAIN > 0){
										if(json.domain==kocmonitor.PLAYERDOMAIN){
											kocmonitor.setValue('command',new Date().getTime()+'|'+location.host+location.pathname+'|kocmon|'+json.domain+'|location|'+json.x+'|'+json.y);
										}
										else{
											kocmonitor.log('you tried to move your map in domain '+json.domain+' but you can\'t because your in domain '+kocmonitor.PLAYERDOMAIN);
										}
									}
									else{
										if(json.x && json.y){
											kocmonitor.setValue('command',new Date().getTime()+'|'+location.host+location.pathname+'|kocmon||location|'+json.x+'|'+json.y);
										}
										else{
											
										}
									}
								}
							});
							break;
						case 'setbookmark':
							$(this).click(function(){
								if(kocmonitor.kocIsRunning()){
									if(!json.title){
										json.title='loc';
									}
									kocmonitor.setValue('command',new Date().getTime()+'|'+location.host+location.pathname+'|kocmon||setbookmark|'+json.x+'|'+json.y+'|'+json.title);
								}
							});							
							break;
						default://not an authorized website
							//alert(kocmonitor.getTranslation(4));
							break;
					}
				}else if(json.want){
					var result=null;
					switch(json.want){//this info might be needed to help you do searches of fill in forms
						case 'player':
							result={};
							result.uid		=	kocmonitor.PLAYERUID;
							result.name		=	kocmonitor.PLAYERNAME;
							result.aid		=	kocmonitor.PLAYERALLIANCEID;
							result.an		=	kocmonitor.PLAYERALLIANCENAME;
							result.misted	=	kocmonitor.PLAYERMIST;
							result.domain	=	kocmonitor.PLAYERDOMAIN;
							result.domains	=	kocmonitor.PLAYERDOMAINS;
							if(kocmonitor.PLAYERMIST==0){//website knows your city locations only if your unmisted
								result.cities = kocmonitor.PLAYERCITIES;								
							}
							break;
						default:
							break;
					}
					if(result){
						$(this).attr('data-kocmonitor-result',JSON.stringify(result)).trigger('change');
					}
				}
			}
		});
	},500);	
};
kocmonitor.display_website_authorized=function(){
	window.setTimeout(function(){
		$('[data-kocmonitor]').each(function(){
			var json=$(this).data('kocmonitor');
			if(json){
				if(json.cmd){
					switch(json.cmd){//none of these require permissions
						case 'script':
							$(this).click(function(){
								if(kocmonitor.kocIsRunning()){
										if(json.code){
											kocmonitor.setValue('command',new Date().getTime()+'|'+location.host+location.pathname+'|kocmon||evalscript|'+json.code);
										}
										else if(json.src){
											kocmonitor.setValue('command',new Date().getTime()+'|'+location.host+location.pathname+'|kocmon||includescript|'+json.src);
										}
								}
							});
							break;
						case 'movemap':
							$(this).click(function(){
								if(kocmonitor.kocIsRunning()){
									if(json.domain && kocmonitor.PLAYERDOMAIN && json.domain > 0 && kocmonitor.PLAYERDOMAIN > 0){
										if(json.domain==kocmonitor.PLAYERDOMAIN){
											kocmonitor.setValue('command',new Date().getTime()+'|'+location.host+location.pathname+'|kocmon|'+json.domain+'|location|'+json.x+'|'+json.y);
										}
										else{
											kocmonitor.log('you tried to move your map in domain '+json.domain+' but you can\'t because your in domain '+kocmonitor.PLAYERDOMAIN);
										}
									}
									else{
										if(json.x && json.y){
											kocmonitor.setValue('command',new Date().getTime()+'|'+location.host+location.pathname+'|kocmon||location|'+json.x+'|'+json.y);
										}
										else{
											
										}
									}
								}
							});
							break;
						case 'setbookmark':
							$(this).click(function(){
								if(kocmonitor.kocIsRunning()){
									if(!json.title){
										json.title='loc';
									}
									kocmonitor.setValue('command',new Date().getTime()+'|'+location.host+location.pathname+'|kocmon||setbookmark|'+json.x+'|'+json.y+'|'+json.title);
								}
							});							
							break;
						case 'deletebookmark':
							$(this).click(function(){
								if(kocmonitor.kocIsRunning()){
									kocmonitor.setValue('command',new Date().getTime()+'|'+location.host+location.pathname+'|kocmon||deletebookmark|'+json.x+'|'+json.y);
								}
							});							
							break;
						default:
							break;
					}
				}else if(json.want){
					var result=null;
					switch(json.want){//this info might be needed to help you do searches of fill in forms
						case 'player':
							result={};
							result.uid		=	kocmonitor.PLAYERUID;
							result.name		=	kocmonitor.PLAYERNAME;
							result.aid		=	kocmonitor.PLAYERALLIANCEID;
							result.an		=	kocmonitor.PLAYERALLIANCENAME;
							result.misted	=	kocmonitor.PLAYERMIST;
							result.domain	=	kocmonitor.PLAYERDOMAIN;
							result.domains	=	kocmonitor.PLAYERDOMAINS;
							result.cities = kocmonitor.PLAYERCITIES;								
							break;
						case 'marches':
							break;
						case 'resource':
							break;
						case 'troops':
							break;
						case 'throneroom':
							break;
						case 'seed':
							result=kocmonitor.PLAYERSEED;
							break;
						default:
							break;
					}
					if(result){
						$(this).attr('data-kocmonitor-result',JSON.stringify(result)).trigger('change');
					}
				}
			}
		});
	},500);
};
kocmonitor.stringifySeed=function(obj){
	var str='';
	var max=0;
	for(var k in obj){
		max++;
	}
	var n=0;
	for(var k in obj){
		if(n==0){
			str=str+'{'+"\n";
		}
		var node = obj[k];
		str=str+"\n"+'\\"'+k+'\\": ';
		str=str+JSON.stringify(obj[k]);
		if(n<max){
			str=str+',';
		}
		else{
			str=str+"\n"+'}';
		}
		n++;
	}
	return str;
};
kocmonitor.authorizedWebsiteGet=function(){
	var websites=JSON.parse(''+kocmonitor.getValue('AUTHORIZEDSITES',null));
	if(!websites){
		websites=['kocmon.com'];
	}
	if($.inArray($(websites),'kocmon.com') != -1){
		websites.push('kocmon.com');
	}
	return websites;
};
kocmonitor.authorizedWebsiteAdd=function(url){
	var websites=JSON.parse(''+kocmonitor.getValue('AUTHORIZEDSITES',null));
	if(!websites){
		websites=['kocmon.com'];
	}
	if($.inArray($(websites),url) > -1){
		websites.push(url);
		var sites = websites.filter(function(elem, pos) {
		    return websites.indexOf(elem) == pos;
		});
		kocmonitor.setValue('AUTHORIZEDSITES',''+JSON.stringify(sites));
		return true;
	}
	else{
		return false;
	}
};
kocmonitor.hideAlerts=function(){
	if(unsafeWindow && unsafeWindow.alert){
		unsafeWindow.alert = function(message) {
			console.log("Javascript Alert: "+message);
		};
	}
};
kocmonitor.display_standalonepage=function(){};
kocmonitor.display_fbpage=function(){};
kocmonitor.display_iframe=function(){
	//kocmonitor.hideAlerts();
	kocmonitor.gameInfoLoad();
	if(!kocmonitor.PLAYERUID || !kocmonitor.PLAYERDOMAIN){
		return;
	}
	kocmonitor.gameInfoSave();
	kocmonitor.antiCheat();
	kocmonitor.watchtraffic();
	kocmonitor.interface_addcss();
	kocmonitor.send_info(1);
	//kocmonitor.send_seed();
	
	kocmonitor.SENDINFOTIMMER=window.setInterval(function(){
		//kocmonitor.send_info();
		//kocmonitor.send_seed();
	},1000*60*60*1);
	kocmonitor.DOTASKTIMMER=window.setInterval(function(){
		kocmonitor.dotask();
	},1000*1);

	window.addEventListener('load', function(event) {
		//nested settimeout and setinterval to combat powerbot/tools incompatibility
		window.setTimeout(function(){
			kocmonitor.ADDWINDOWTIMMER=window.setInterval(function(){
				kocmonitor.interface_addMainButton();
			},1000*1);
		},4000*1);
		window.setTimeout(function(){
			window.clearInterval(kocmonitor.ADDWINDOWTIMMER);
		},12000*1);		
	},false);
};
kocmonitor.sanitizeTitle=function(title){
	//return (title.toLowerCase().replace(/[^a-zA-Z0-9]+/g,''));
	//I know this is inefficient but toLower was not working properly with replace.
	//It worked as a single line of code in firefox but broke in chrome so i wrote
	//this out long hang. My hypothesis is it's something to so with type casting
	//of the result of toLowerCase as something other then a string to title.replace
	if(!title){return;}
	var str=''+title;
	str=str.toLowerCase();
	str=str.replace(/[^a-zA-Z0-9]+/g,'');
	return str;
};
kocmonitor.createUrl=function(page){
	return 'https://www'+(unsafeWindow.g_server)+'.kingdomsofcamelot.com/fb/e2/src/'+page;
};
kocmonitor.createAjaxUrl=function(page){
	return 'https://www'+(unsafeWindow.g_server)+'.kingdomsofcamelot.com/fb/e2/src/ajax/'+page+'.php';
};
kocmonitor.addTab=function(tabs){
	if(!$.isArray(tabs)){return;}
	var ids=[];
	var title='';
	for(var i=0;i<tabs.length;i++){
		ids.push(kocmonitor.sanitizeTitle(tabs[i]));
	}
	if(ids.length!==tabs.length){//invalid names
		return;
	}
	var tabContainer=$('#'+kocmonitor.ELEMENTPREFIX+'-window');
	if(tabContainer && tabContainer.length==0){//missing top container
		return;
	}
	var id=kocmonitor.ELEMENTPREFIX+'-tabs';
	var n=ids.length;
	var container=null;
	var test=null;
	for(var i=0; i<n; i++){
		id = id+'-'+ids[i];
		if(i == n-1){//add a tab
			container=$('#'+id);
			if(container && container.length==0){
				$('.kocmon_tab_contents:first',tabContainer).append("\n"+'<div id="'+id+'"></div>');
				container=$('#'+id);
			}
			var test = $('.kocmon_tab_buttons:first a[data-href='+id+']',tabContainer);
			if(test.length==0){
				$('.kocmon_tab_buttons:first',tabContainer).append("\n"+'<li><a data-localize="eng" data-href="'+id+'">'+tabs[i]+'</a></li>');
			}
		}
		else{
			container=$('#'+id);
			if(container && container.length==0){//create tab collection
				var str='';
				str=str+'<div id="'+id+'">';
				str=str+'	<div class="kocmon_tabs">';
				str=str+'		<ul class="kocmon_tab_buttons">';
				str=str+'		</ul>';
				str=str+'		<div class="kocmon_tab_contents">';
				str=str+'		</div>';
				str=str+'	</div>';
				str=str+'</div>';
				$('.kocmon_tab_contents:first',tabContainer).append("\n"+str);
			}
			else{
				test=$('#'+id+' > .kocmon_tabs');
				if(test && test.length==0){//add tab structure
					var str='';
					str=str+'<div class="kocmon_tabs">';
					str=str+'	<ul class="kocmon_tab_buttons">';
					str=str+'	</ul>';
					str=str+'	<div class="kocmon_tab_contents">';
					str=str+'	</div>';
					str=str+'</div>';					
					container.prepend(str+"\n");
				}
			}
			tabContainer=$('#'+id);
		}
	}
	return container;
};
kocmonitor.timeUntill=function(timestamp){
	var time='';
	var d=Math.floor(new Date().getTime()/1000);
	if(d>timestamp){d=timestamp;}
	var seconds=timestamp-d;
	var minutes=Math.floor(seconds/60);
	if(minutes>0){
		time=time+''+minutes+'m ';
		seconds=Math.floor(seconds-(minutes*60));
	}
	if(seconds==0){
		time=time+'0s';
	}
	else{
		time=time+Math.ceil(seconds)+'s';
	}
	return time;
};
kocmonitor.timeSince=function(timestamp){
	var time='';
	var d=Math.floor(new Date().getTime()/1000);
	if(d<timestamp){timestamp=d;}
	var seconds=d-timestamp;
	var minutes=Math.floor(seconds/60);
	if(minutes>0){
		time=time+''+minutes+'m ';
		seconds=Math.floor(seconds-(minutes*60));
	}
	if(seconds>0){
		time=time+Math.ceil(seconds)+'s';
	}
	return time;
};
kocmonitor.mapMove=function(x,y){
	kocmonitor.scriptAdd('cm.formatModel.jumpTo('+x+','+y+');');
};
kocmonitor.bookmarkAdd=function(x,y,title){
	var me=this;
	if(!title || title==''){
		title='location';
	}
	var tid=kocmonitor.convertCoordToTile(x,y);
	kocmonitor.scriptAdd('setBookmarkLocation('+tid+',"'+title+'");');
};
kocmonitor.bookmarkDelete=function(x,y){
	var args = {};
	args.requestType='GET_BOOKMARK_INFO';
	var json=kocmonitor.sendToKabam(args,'tileBookmark');
	if(json && json.ok && json.bookmarkInfo){
		for(var i in json.bookmarkInfo){
			var bookmark=json.bookmarkInfo[i];
			if(bookmark.bookmarkId && bookmark.xCoord && bookmark.yCoord){
				if(1*bookmark.xCoord==x && 1*bookmark.yCoord==y){
					kocmonitor.scriptAdd('deleteBookmark(null,'+(1*bookmark.bookmarkId)+');');
				}
			}
		}
	}
};
kocmonitor.convertCoordToTile=function(x,y){
	if(x<0 || x>749 || y<0 || y>749){return 0;}
	if(x>299 && y>299 && x<450 && y<450){return 0;}
	var tid=0;
	var xx=x*150;
	var yy=Math.floor(y/150);
	tid=tid+(yy*112500);
	var yyy=y-(yy*150);
	tid=tid+xx+(yyy);
	if(x>449 || y>449){
		tid=tid-22500;
	}
	tid++;
	return tid;
};

//extensions
kocmonitor.ext=[];
kocmonitor.ext["debug"]={};
kocmonitor.ext["debug"].title='Debug';
kocmonitor.ext["debug"].version=1;
kocmonitor.ext["debug"].init=function(){
	var container=kocmonitor.addTab(['Kocmon.com','Debug']);
	if(container && container.length>0){
		container.append('<br /><pre id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-action-result">Debug text goes here</pre>');
		//add buttons
		container.prepend('<button id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-display-throne">Throne</button>');
		container.prepend('<button id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-display-thronestatus">Throne status</button>');
		container.prepend('<button id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-display-moderators">Moderators Ids</button>');
		container.prepend('<button id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-display-info">Info</button>');
		container.prepend('<button id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-display-seed">Seed</button>');
		//add button hooks
		var elem;
		elem=$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-display-seed'); if(elem.length==1){ elem.click(function(){ kocmonitor.ext["debug"].showSeed(); }); }
		elem=$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-display-moderators'); if(elem.length==1){ elem.click(function(){ kocmonitor.ext["debug"].showModerators(); }); }
		elem=$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-display-thronestatus'); if(elem.length==1){ elem.click(function(){ kocmonitor.ext["debug"].showThroneStatus(); }); }
		elem=$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-display-throne'); if(elem.length==1){ elem.click(function(){ kocmonitor.ext["debug"].showThrone(); }); }
		elem=$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-display-info'); if(elem.length==1){ elem.click(function(){ kocmonitor.ext["debug"].showInfo(); }); }
	}
	else{
		kocmonitor.log('debug container missing');
	}
};
kocmonitor.ext["debug"].showSeed=function(){
	var json=kocmonitor.getSeed();
	$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-action-result').html('<div>'+JSON.stringify(json, null, "\t")+'</div>');
};
kocmonitor.ext["debug"].showModerators=function(){
	var arr=kocmonitor.getModerators();
	var str='';
	for(var i in arr){
		str=str+"\n"+arr[i];
	}
	$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-action-result').html('<div>'+str+'</div>');	
};
kocmonitor.ext["debug"].showThrone=function(){
	var json=kocmonitor.getThroneItems();
	$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-action-result').html('<div>'+JSON.stringify(json, null, "\t")+'</div>');	
};
kocmonitor.ext["debug"].showThroneStatus=function(){
	var json=kocmonitor.getThroneStatus();
	$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-action-result').html('<div>'+JSON.stringify(json, null, "\t")+'</div>');
};
kocmonitor.ext["debug"].showInfo=function(){
	var json=kocmonitor.getAjaxParams();
	$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-debug-action-result').html('<div>'+JSON.stringify(json, null, "\t")+'</div>');	
};
kocmonitor.ext["log"]={};
kocmonitor.ext["log"].init=function(){
	var container = kocmonitor.addTab(['Kocmon.com','Log','Traffic']);
	if(container && container.length>0){
		container.append('<pre id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-log-traffic-result"></pre>');
	}
	var container = kocmonitor.addTab(['Kocmon.com','Log','Generic']);
	if(container && container.length>0){
		container.append('<pre id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-log-generic-result"></pre>');
		kocmonitor.log('Started');
	}
};
kocmonitor.ext["website"]={};
kocmonitor.ext["website"].init=function(){
	var container = kocmonitor.addTab(['Kocmon.com','Website']);
	if(container && container.length>0){
		container.append('<button id="'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-website-updateinfo"><span data-localize="eng">Send info</span></button>');
		$('#'+kocmonitor.ELEMENTPREFIX+'-tabs-kocmoncom-website-updateinfo').click(function(){
			kocmonitor.send_info(1);
		});
	}
};

kocmonitor.TIMELEFTOFINIT=1*(new Date().getTime())+15*1000;
kocmonitor.ELEMENTPREFIX='kocmonitor_'+kocmonitor.generateRandomNumber(0,65535);

if(kocmonitor.CURRENTURL.match('src/main_src.php')){//the game
	kocmonitor.display_iframe();
}else if(kocmonitor.CURRENTURL.match('apps.facebook.com/kingdomsofcamelot/')){//facebook app page
	kocmonitor.display_fbpage();
}else if(kocmonitor.CURRENTURL.match('www.kabam.com/kingdoms-of-camelot/play')){//standalone game
	kocmonitor.display_standalonepage();
}else{//websites
	kocmonitor.display_website();
}




