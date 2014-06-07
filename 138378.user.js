// ==UserScript==
// @name           LOU Tools
// @description    Adds some functions to LoU
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.0.0
// ==/UserScript==
(function(){
	var main=function(){
	
		function LoUPakMap(){
			try{
				const bossKill=[50,300,2000,4000,10000,15000,20000,30000,45000,60000];
				const dungeonKill=[10,100,450,1500,3500,6000,13000,20000,35000,60000];
				
				var l=qx.locale.Manager.getInstance().getLocale();
				
				if(l!="en"||l!="de"||l!="pl"){l="en";}
				
				const tr={"en":{"weak":"Weakness"},"de":{"weak":"Schwäche"},"pl":{"weak":"????????"}};
				var a=qx.core.Init.getApplication();
				var r=webfrontend.res.Main.getInstance();
				
				const nameC=a.tr("tnf:name:").charAt(0);const typeC=a.tr("tnf:type:").charAt(0);
				const levelT=a.tr("tnf:level:");
				const progressP=a.tr("tnf:progress:");
				const sHdr='<table cellspacing="0"><tr><td width="75">';
				const sRow="</td><td>";
				const pId=sHdr.length;
				const pRow=sRow.length;
				const weakT=tr[l]["weak"]+":"+sRow;
				const progressT="TS + pct:"+sRow;
				const zergT="Unit TS:"+sRow;
				const zergT6=r.units["6"].dn+":"+sRow;const zergT7=r.units["7"].dn+":"+sRow;const zergT10=r.units["10"].dn+":"+sRow;
				const zergT11=r.units["11"].dn+":"+sRow;
				const zergT12=r.units["12"].dn+":"+sRow;const zergT16=r.units["16"].dn+":"+sRow;const zergT17=r.units["17"].dn+":"+sRow;
				const pBName=pId+pRow+a.tr("tnf:name:").length;
				const pDName=pId+pRow+a.tr("tnf:type:").length;
				const pLevel=pRow+a.tr("tnf:level:").length;
				
				var cavT=r.attackTypes["2"].dn;var infT=r.attackTypes["1"].dn;
				var magT=r.attackTypes["4"].dn;var artT=r.attackTypes["3"].dn;
				var dragC=r.dungeons["6"].dn.charAt(0);
				var hydrC=r.dungeons["8"].dn.charAt(0);
				var moloC=r.dungeons["7"].dn.charAt(0);
				var octyC=r.dungeons["12"].dn.charAt(0);
				var forstC=r.dungeons["5"].dn.charAt(0);
				var mountC=r.dungeons["4"].dn.charAt(0);
				var hillC=r.dungeons["3"].dn.charAt(0);
				var seaC=r.dungeons["2"].dn.charAt(0);
				
				function getBossWeakness(name){
					if(name==dragC){
						return cavT;
					} else {
						if(name==hydrC){
							return infT;
						}else{
							if(name==moloC){
								return magT;
							}else{
								if(name==octyC){
									return artT;
								}else{
									return"";
								}
							}
						}
					}
				}
				
				function getDungeonWeakness(name){
					if(name==forstC){
						return cavT;
					}else{
						if(name==mountC){
							return infT;
						}else{
							if(name==hillC){
								return magT;
							}else{
								if(name==seaC){
									return artT;
								}else{
									return"";
								}
							}
						}
					}
				}
				
				function toolTipAppear(){
					try{
						var tip=a.worldViewToolTip;
						var mode=tip.getMode();
						
						if(mode=="c"||mode=="d"){
						}else{
							var text=tip.getLabel();
							if(text!=null||text.length>pId){
								var type=text.charAt(pId);
								if(type==nameC){
									var weak=getBossWeakness(text.charAt(pBName));
									var lPos=text.indexOf(levelT,pBName)+pLevel;
									var level=text.charAt(lPos);
									if(level=="1"){
										if(text.charAt(lPos+1)=="0"){
											level="10";
										}
									}
									var zergs=webfrontend.gui.Util.formatNumbers(bossKill[parseInt(level)-1]);
									var sb=new qx.util.StringBuilder(20);
									var research6=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.research,6);
									var shrine6=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.shrine,6);
									var bonus6=((shrine6+research6)/100)+1;
									var research7=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.research,6);
									var shrine7=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.shrine,6);
									var bonus7=((shrine7+research7)/100)+1;
									var research10=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.research,10);
									var shrine10=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.shrine,10);
									var bonus10=((shrine10+research10)/100)+1;
									var research11=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.research,11);
									var shrine11=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.shrine,11);
									var bonus11=((shrine11+research11)/100)+1;
									var research12=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.research,12);
									var shrine12=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.shrine,12);
									var bonus12=((shrine12+research12)/100)+1;
									var research16=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.research,16);
									var shrine16=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.shrine,16);
									var bonus16=((shrine16+research16)/100)+1;
									var research17=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.research,17);
									var shrine17=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.shrine,17);
									var bonus17=((shrine17+research17)/100)+1;
									var zergs6=webfrontend.gui.Util.formatNumbers(parseInt(bossKill[parseInt(level)-1]/bonus6));
									
									if(weak=="Infantry"){
										zergs6=webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level)-1]/bonus6)*0.67));
									}
									
									var zergs7=webfrontend.gui.Util.formatNumbers(parseInt(bossKill[parseInt(level)-1]/bonus7)*0.72);
									
									if(weak=="Magic"){
										zergs7=webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level)-1]/bonus7)*0.67*0.72));
									}
									
									var zergs10=webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level)-1]/bonus10)*0.83));
									
									if(weak=="Cavalry"){
										zergs10=webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level)-1]/bonus10)*0.67*0.83));
									}
									
									var zergs11=webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level)-1]/bonus11)*0.55));
									
									if(weak=="Cavalry"){
										zergs11=webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level)-1]/bonus11)*0.67*0.55));
									}
									
									var zergs12=webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level)-1]/bonus12)*0.42));
									
									if(weak=="Magic"){
										zergs12=webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level)-1]/bonus12)*0.67*0.42));
									}
									if(weak=="Artillery"){
										var zergs16=webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level)-1]/bonus16)*0.03));
										var zergs17=webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level)-1]/bonus17)*0.003));
										sb.add(text,sHdr,weakT,weak,"</td></tr><tr><td>",zergT16,zergs16,"</td></tr><tr><td>",zergT17,zergs17,"</td></tr></table>");
									}else{
										sb.add(text,sHdr,weakT,weak,"</td></tr><tr><td>",zergT6,zergs6,"</td></tr></td></tr><tr><td>",zergT10,zergs10,"</td></tr></td></tr><tr><td>",zergT11,zergs11,"</td></tr><tr><td>",zergT12,zergs12,"</td></tr><tr><td>",zergT7,zergs7,"</td></tr></table>");
									}tip.setLabel(sb.get());
								}else{
									if(type==typeC){
										var weak=getDungeonWeakness(text.charAt(pDName));
										var lPos=text.indexOf(levelT,pDName)+pLevel;
										var level=text.charAt(lPos);
										if(level=="1"){
											if(text.charAt(lPos+1)=="0"){
												level="10";
											}
										}
										var progress=text.substr(text.indexOf("Progress")+18,2);
										if(progress.substr(1,1)=="%"){
											var progress=progress.substr(0,1);
										}
										var progress=webfrontend.gui.Util.formatNumbers(parseInt((progress*0.0175+1.0875)*dungeonKill[parseInt(level)-1]));
										var zergs6=webfrontend.gui.Util.formatNumbers(dungeonKill[parseInt(level)-1]);
										var sb=new qx.util.StringBuilder(20);
										sb.add(text,sHdr,weakT,weak,"</td></tr><tr><td>",zergT,zergs6,"</td></tr><tr><td>",progressT,progress,"</td></tr></table>");
										tip.setLabel(sb.get());
									}
								}
							}
						}
					}catch(e){
						console.error(e);
					}
			}
			
			a.worldViewToolTip.addListener("appear",toolTipAppear,this);
			
			}catch(e){
				console.error(e);
			}
		}
		
		function paDebug(e){
			if(window.console&&typeof console.log=="function"){
				console.log(e);
			}
		}
		
		var createTweak=function(){
			qx.Class.define("paTweak.Version",{type:"static",statics:{PAversion:"1.0.0",PAbuild:"July 13 22:10:33 GMT 2012",PAcodename:"",PAauthors:"p",PAcontrib:"M, M, M and U",GPL:"This program is free software: you can redistribute it and/or modify"+" it under the terms of the GNU General Public License as published by"+" the Free Software Foundation, either version 3 of the License, or"+" (at your option) any later version."+"\n\n"+"This program is distributed in the hope that it will be useful,"+" but WITHOUT ANY WARRANTY; without even the implied warranty of"+" MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the"+" GNU General Public License for more details."+"\n\n"+"You should have received a copy of the GNU General Public License"+" along with this program. If not, see http://www.gnu.org/licenses/."}});
		
		qx.Class.define("paTweak.Main",{type:"singleton",extend:qx.core.Object,members:{initialize:function(){paDebug("paTweak initialize");
		

		
		this.app=qx.core.Init.getApplication();this.cInfoView=this.app.getCityInfoView();
		this.chat=this.app.chat;this.bQc=this.cInfoView.buildingQueue;this.bQh=this.bQc.header;var civ_cont=this.cInfoView.container.getChildren();
		
		for(var i=0;i<civ_cont.length;i++){
			if(civ_cont[i].basename=="CityCommandInfoView"){
				this.cCmdInfoView=civ_cont[i];break;
			}
		}
		
		this.tweakPA();},tweakPA:function(){this.panel=new paTweak.ui.ExtraTools("LoU Tools v"+paTweak.Version.PAversion);this.addPanel(this.panel);
		this.cancelOrders=new paTweak.ui.CancelOrderPanel();this.cCmdInfoView.commandHeaderData.header.add(this.cancelOrders,{left:160,top:7});
		this.initBossHunt();},addPanel:function(panel){this.bQc.getLayoutParent().addBefore(panel,this.bQc);},initBossHunt:function(){var container=qx.core.Init.getApplication().dungeonDetailView.actionArea;
		var buttonLayout=new qx.ui.layout.VBox(3);
		var btnRow=new qx.ui.container.Composite(buttonLayout);btnRow.set({maxWidth:306});
		
		container.addAt(btnRow,1);}}});function checkTime(i){if(i<10){i="0"+i;}return i;}
				
		function formatIncomingDate(dte){
			var serverDiff=webfrontend.data.ServerTime.getInstance().getDiff();
			var timeZoneOffset=webfrontend.config.Config.getInstance().getTimeZoneOffset();
			var serverOffset=webfrontend.data.ServerTime.getInstance().getServerOffset();
			var localOffset=-new Date().getTimezoneOffset()*60000;dte.setTime(dte.getTime()+serverOffset-localOffset);var h=dte.getHours();
			var m=dte.getMinutes();
			var s=dte.getSeconds();h=checkTime(h);m=checkTime(m);s=checkTime(s);
			return dte.getFullYear()+"/"+(dte.getMonth()+1)+"/"+dte.getDate()+" "+h+":"+m+":"+s;
		}
				
		qx.Class.define("paTweak.ui.IncomingAttacksWindow",{type:"singleton",extend:qx.ui.window.Window,construct:function(){
			this.base(arguments,"Alliance Incoming Attacks");
			this.buildUI();this.addListener("appear",this.getAllianceIncomingAttacks,this);
		},members:{_wcText:null,_table:null,_contSelect:null,_incomingAttacks:new Array(),_filterOwn:null,buildUI:function(){var app=qx.core.Init.getApplication();
		this.setLayout(new qx.ui.layout.VBox(10));
		this.set({allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,showStatusbar:false,showClose:false,allowGrowY:false,contentPadding:5,useMoveFrame:true,resizable:true});
		this.setWidth(500);
		webfrontend.gui.Util.formatWinClose(this);
		var tabView=new qx.ui.tabview.TabView();
		var page1=new qx.ui.tabview.Page("Incoming Grid","");
		page1.setLayout(new qx.ui.layout.VBox());
		var firstRow=new qx.ui.container.Composite();
		firstRow.setLayout(new qx.ui.layout.HBox(5));
		firstRow.set({width:300});page1.add(firstRow);
		this._filterOwn=new qx.ui.form.CheckBox("Show only my cities");
		this._filterOwn.setToolTipText("Show only my cities");
		this._filterOwn.initValue(false);firstRow.add(this._filterOwn);
		this._filterOwn.addListener("changeValue",this.redrawGrid,this);
		this._contSelect=new qx.ui.form.SelectBox();
		this._contSelect.setMaxWidth(100);
		firstRow.add(this._contSelect);
		this._contSelect.addListener("changeSelection",this.redrawGrid,this);
		this._table=new qx.ui.table.model.Simple();
		this._table.setColumns(["Player","Target","Cont","Coords","Time","Attacker","Alliance","Source","AttCoords","Spotted","Baron","Siege","Infantry","Cav","Scout"]);
		var table=new qx.ui.table.Table(this._table).set({decorator:null,height:400});
		page1.add(table);tabView.add(page1);
		var page2=new qx.ui.tabview.Page("Incoming Export","");
		page2.setLayout(new qx.ui.layout.VBox());
		this._wcText=new qx.ui.form.TextArea();
		this._wcText.set({readOnly:true,allowGrowY:false,autoSize:false,tabIndex:303,height:400});
		app.setElementModalInput(this._wcText);
		this._wcText.setValue("");page2.add(this._wcText);
		tabView.add(page2);this.add(tabView);},getAllianceIncomingAttacks:function(){
			this._filterOwn.setValue(false);
			this._wcText.setValue("Retrieving Incoming Attacks");
			var sb=new qx.util.StringBuilder(2048);
			sb.add("ALL_AT",":","a","\f");
			this.poll(sb.get(),this);
		},poll:function(requests,callbackArg){
			this.requestCounter=0;
			var updateManager=webfrontend.net.UpdateManager.getInstance();
			var data=new qx.util.StringBuilder(2048);
			data.add('{"session":"',updateManager.getInstanceGuid(),'","requestid":"',updateManager.requestCounter,'","requests":',qx.util.Json.stringify(requests),"}");
			updateManager.requestCounter++;
			var req=new qx.io.remote.Request(updateManager.getUpdateService()+"/Service.svc/ajaxEndpoint/Poll","POST","application/json");
			req.setProhibitCaching(false);req.setRequestHeader("Content-Type","application/json");
			req.setData(data.get());
			req.setTimeout(10000);
			req.addListener("completed",function(e){this.gotAllianceIncoming(e,callbackArg);},this);
			req.addListener("failed",this.failRequest,this);req.addListener("timeout",this.timeoutRequest,this);req.send();
		},redrawGrid:function(e){
			var serverTime=webfrontend.data.ServerTime.getInstance();
			var rowData=[];
			var pName=webfrontend.data.Player.getInstance().getName();
			if(this._incomingAttacks!=null){
				var continent=this._contSelect.getSelection()[0].getModel();
				var filterOwn=this._filterOwn.getValue();
				for(var i=0;i<this._incomingAttacks.length;i++){
					var item=this._incomingAttacks[i];
					var cont=paTweak.CombatTools.cityIdToCont(item.tc);
					if((continent=="-1"||cont==continent)&&(!filterOwn||item.tpn==pName)){
						var distance=Math.sqrt(Math.pow((paTweak.CoordUtils.convertIdToCoodrinates(item.tc).split(":")[0]-paTweak.CoordUtils.convertIdToCoodrinates(item.c).split(":")[0]),2)+Math.pow((paTweak.CoordUtils.convertIdToCoodrinates(item.tc).split(":")[1]-paTweak.CoordUtils.convertIdToCoodrinates(item.c).split(":")[1]),2));
						var diffMs=((serverTime.getStepTime(item.es)-serverTime.getStepTime(item.ds))/distance);
						var diffDays=Math.round(diffMs/86400000);
						var diffHrs=Math.round((diffMs%86400000)/3600000);
						var diffMins=Math.round(((diffMs%86400000)%3600000)/60000);
						var diffSec=Math.ceil(diffMs/1000);IncomingScout=Math.round((Math.round((8/(diffSec/60)-1)*100)*10)/10);
						IncomingCav=Math.round((Math.round((10/(diffSec/60)-1)*100)*10)/10);
						IncomingInf=Math.round((Math.round((20/(diffSec/60)-1)*100)*10)/10);
						IncomingSiege=Math.round((Math.round((30/(diffSec/60)-1)*100)*10)/10);
						IncomingBaron=Math.round((Math.round((40/(diffSec/60)-1)*100)*10)/10);
						rowData.push([item.tpn,item.tcn,cont,paTweak.CoordUtils.convertIdToCoodrinates(item.tc),formatIncomingDate(serverTime.getStepTime(item.es)),item.pn,item.an,item.cn,paTweak.CoordUtils.convertIdToCoodrinates(item.c),formatIncomingDate(serverTime.getStepTime(item.ds)),IncomingBaron+"%",IncomingSiege+"%",IncomingInf+"%",IncomingCav+"%",IncomingScout+"%"]);
					}
				}
				this._table.setData(rowData);
			}
		},completeRequest:function(e,obj){
			if(e.getContent()==null){
				return;
			}
			for(var i=0;i<e.getContent().length;i++){
				var item=e.getContent()[i];
				var type=item.C;
				if(type=="CITY"){
					this.parseCity(obj,item.D);
				}else{
					if(type=="WORLD"){
						this.parseWorld(item.D);
					}else{
						if(type=="OA"){
							this.parseOA(item.D);
						}
					}
				}
			}
		},failRequest:function(e){},timeoutRequest:function(e){},gotAllianceIncoming:function(e,obj){
			var serverTime=webfrontend.data.ServerTime.getInstance();
			var output="'Player'	";output+="'Target'	";output+="'Cont'	";output+="'Coords'	";output+="'Time'	";output+="'Attacker'	";output+="'Alliance'	";output+="'Source'	";output+="'AttCoords'	";output+="'Spotted'	";output+="'Baron'	";output+="'Siege'	";output+="'Infentry'	";output+="'Cav'	";output+="'Scout'	";output+="\n";
			var IncomingAttacks=e.getContent();
			IncomingAttacks=IncomingAttacks[0].D.a;
			this._incomingAttacks=IncomingAttacks.slice(0);
			var continents="";try{this._contSelect.removeAll();}catch(e){}
			this._contSelect.add(new qx.ui.form.ListItem("World",null,-1));
			for(var i=0;i<IncomingAttacks.length;++i){
				var cont=paTweak.CombatTools.cityIdToCont(IncomingAttacks[i].tc);
				if(continents.indexOf(":"+cont)<0){
					this._contSelect.add(new qx.ui.form.ListItem(cont,null,cont));continents+=":"+cont;
				}
			}
			var rowData=[];
			for(var i=0;i<IncomingAttacks.length;i++){
				var item=IncomingAttacks[i];
				var distance=Math.sqrt(Math.pow((paTweak.CoordUtils.convertIdToCoodrinates(item.tc).split(":")[0]-paTweak.CoordUtils.convertIdToCoodrinates(item.c).split(":")[0]),2)+Math.pow((paTweak.CoordUtils.convertIdToCoodrinates(item.tc).split(":")[1]-paTweak.CoordUtils.convertIdToCoodrinates(item.c).split(":")[1]),2));
				var diffMs=((serverTime.getStepTime(item.es)-serverTime.getStepTime(item.ds))/distance);
				var diffDays=Math.round(diffMs/86400000);
				var diffHrs=Math.round((diffMs%86400000)/3600000);
				var diffMins=Math.round(((diffMs%86400000)%3600000)/60000);
				var diffSec=Math.ceil(diffMs/1000);
				IncomingScout=Math.round((Math.round((8/(diffSec/60)-1)*100)*10)/10);
				IncomingCav=Math.round((Math.round((10/(diffSec/60)-1)*100)*10)/10);
				IncomingInf=Math.round((Math.round((20/(diffSec/60)-1)*100)*10)/10);
				IncomingSiege=Math.round((Math.round((30/(diffSec/60)-1)*100)*10)/10);
				IncomingBaron=Math.round((Math.round((40/(diffSec/60)-1)*100)*10)/10);
				var cont=paTweak.CombatTools.cityIdToCont(item.tc);
				rowData.push([item.tpn,item.tcn,cont,paTweak.CoordUtils.convertIdToCoodrinates(item.tc),formatIncomingDate(serverTime.getStepTime(item.es)),item.pn,item.an,item.cn,paTweak.CoordUtils.convertIdToCoodrinates(item.c),formatIncomingDate(serverTime.getStepTime(item.ds)),IncomingBaron+"%",IncomingSiege+"%",IncomingInf+"%",IncomingCav+"%",IncomingScout+"%"]);
				output+='"'+item.tpn+'"	';output+='"'+item.tcn+'"	';output+='"'+cont+'"	';output+="\"'"+paTweak.CoordUtils.convertIdToCoodrinates(item.tc)+'"	';output+='"'+serverTime.getStepTime(item.ds)+'"	';output+='"'+item.pn+'"	';output+='"'+item.an+'"	';output+='"'+item.cn+'"	';output+="\"'"+paTweak.CoordUtils.convertIdToCoodrinates(item.c)+'"	';output+='"'+serverTime.getStepTime(item.es)+'"	';output+='"'+IncomingBaron+'%"	';output+='"'+IncomingSiege+'%"	';output+='"'+IncomingInf+'%"	';output+='"'+IncomingCav+'%"	';output+='"'+IncomingScout+'%"	';output+="\n";
			}
			this._wcText.setValue(output);
			this._table.setData(rowData);
		}
		}});
		
	qx.Class.define("paTweak.ui.ReturnByWindow",{type:"singleton",extend:qx.ui.window.Window,construct:function(){this.base(arguments,"Return raids by");this.buildUI();},members:{_returnTime:null,buildUI:function(){
			var app=qx.core.Init.getApplication();
			this.setLayout(new qx.ui.layout.VBox(2));
			this.set({allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,showStatusbar:false,showClose:false,contentPadding:5,useMoveFrame:true,resizable:false});
			this.setWidth(200);
			webfrontend.gui.Util.formatWinClose(this);
			var wcLabel=new qx.ui.basic.Label("Return all raids by:").set({font:"bold"});
			this.add(wcLabel);
			this._returnTime=new paTweak.ui.components.TimePicker("Return time:");
			this.add(this._returnTime);
			var firstRow=new qx.ui.container.Composite();firstRow.setLayout(new qx.ui.layout.HBox());
			this.add(firstRow);
			var applyButton=new qx.ui.form.Button("Apply");
			applyButton.addListener("execute",this.returnRaidsBy,this);
			firstRow.add(applyButton);
			var closeButton=new qx.ui.form.Button("Close");
			closeButton.addListener("execute",this.hide,this);
			firstRow.add(closeButton);
		},returnRaidsBy:function(){
			var combatTools=paTweak.CombatTools;
			var returnBy=this._returnTime.getValue().getTime();
			var st=webfrontend.data.ServerTime.getInstance();
			var serverStep=st.getServerStep();
			var gameNow=webfrontend.Util.getCurrentTime().getTime();
			var delta=Math.floor((returnBy-gameNow)/1000)+1;returnBy=serverStep+delta;
			var currRecurrType=2;
			var orders=webfrontend.data.City.getInstance().unitOrders;
			for(var i in orders){
				if(orders[i].type==paTweak.CombatTools.RAID_ORDER_ID){
					webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions",{cityid:webfrontend.data.City.getInstance().getId(),id:orders[i].id,isDelayed:orders[i].isDelayed,recurringType:currRecurrType,recurringEndStep:(returnBy)},null,null,null);
				}
			}
			this.hide();
		},
	}});
		
	qx.Class.define("paTweak.CombatTools",{type:"static",statics:{DO_NOT_ATTACK_UNITS:{"1":true},DO_NOT_PLUNDER_UNITS:{"13":true,"14":true,"2":true},SCOUT_ORDER_ID:1,PLUNDER_ORDER_ID:2,ATTACK_ORDER_ID:3,SUPPORT_ORDER_ID:4,SIEGE_ORDER_ID:5,RAID_ORDER_ID:8,NOW_TIMING_ID:1,DEPATATURE_TIMING_ID:2,ARRIVAL_TIMING_ID:3,ORDER_CANCEL_PERIOD_S:600,DEFAULT_MIN_TS:3000,UNITS:{CITY_GUARD:{type:"1",name:"City Guard",ts:0,kind:"g",defensive:true},BALLISTA:{type:"2",name:"Ballista",ts:10,kind:"s",defensive:true},RANGER:{type:"3",name:"Ranger",ts:1,kind:"l",off:"i",defensive:true},GUARDIAN:{type:"4",name:"Guardian",ts:1,kind:"l",off:"i",defensive:true},TEMPLAR:{type:"5",name:"Templar",ts:1,kind:"l",off:"i",defensive:true},BERSEKER:{type:"6",name:"Berseker",ts:1,kind:"l",off:"i",defensive:false},MAGE:{type:"7",name:"Mage",ts:1,kind:"l",off:"m",defensive:false},SCOUT:{type:"8",name:"Scout",ts:2,kind:"c",off:"c",defensive:false},XBOW:{type:"9",name:"Crossbow",ts:2,kind:"l",off:"c",defensive:true},PALADIN:{type:"10",name:"Paladin",ts:2,kind:"l",off:"c",defensive:true},KNIGHT:{type:"11",name:"Knight",ts:2,kind:"l",off:"c",defensive:false},WARLOCK:{type:"12",name:"Warlock",ts:2,kind:"l",off:"m",defensive:false},RAM:{type:"13",name:"Ram",ts:10,kind:"s",off:"s",forceSiege:true,defensive:false},CATAPULT:{type:"14",name:"Catapult",ts:10,kind:"s",off:"d",forceSiege:true,defensive:false},FRIGATE:{type:"15",name:"Frigate",ts:100,kind:"t",transport:500,off:"s",defensive:false},SLOOP:{type:"16",name:"Sloop",ts:100,kind:"w",off:"s",defensive:true},GALLEON:{type:"17",name:"War Galleon",ts:400,kind:"w",off:"d",forceSiege:true,defensive:false},BARON:{type:"19",name:"Baron",ts:1,kind:"b",off:"d",forceSiege:true,defensive:false}},_unitsByType:null,removeBBcode:function(str){return str.replace(/\[\/?\w+\]/g,"");},normalizeCoords:function(value){
			if(value==null){
				return null;
			}
			value=this.removeBBcode(value).trim();
			var m=value.match(/^(\d{1,3}):(\d{1,3})$/);
			if(m==null){
				return null;
			}
			var x=m[1],y=m[2];
			return qx.lang.String.pad(x,3,"0")+":"+qx.lang.String.pad(y,3,"0");
		},parseCoords:function(value){
			var m=value.match(/^0*(\d{1,3}):0*(\d{1,3})$/);
			if(m==null){
				return null;
			}
			return[parseInt(m[1]),parseInt(m[2])];
		},cityIdToCoords:function(id){
			var x=id&65535;
			var y=(id>>16)&65535;
			return[x,y];
		},cityIdToCont:function(id){
			var sourceCoords=this.cityIdToCoords(id);
			return webfrontend.data.Server.getInstance().getContinentFromCoords(sourceCoords[0],sourceCoords[1]);
		},getUnitByType:function(type){
			if(this._unitsByType==null){
				var map={};qx.lang.Object.getValues(this.UNITS).forEach(function(u){map[u.type]=u;});
				this._unitsByType=map;
			}
			return this._unitsByType[type];
		},getAvailableUnits:function(city,includeActive,excludeDefense,excludeNavy){
			var units=city.getUnits();
			var unitOrders=city.getUnitOrders();
			var available={all:[],land:[],scout:[],siege:[],ships:[],transport:[],baron:[]};
			var map={};
			if(units==null){
				return available;
			}
			qx.lang.Object.getKeys(units).forEach(function(type){
				if(type==this.UNITS.CITY_GUARD.type){return;}
				var u=units[type];
				if(u.total>0){
					var info=this.getUnitByType(type);
					if(excludeDefense&&info.defensive){return;}
					if(excludeNavy&&(info.kind=="w"||info.kind=="t")){return;}
					var unit={type:type,name:info.name,count:u.total,unitTS:info.ts,kind:info.kind,unitCapacity:info.transport,off:info.off,forceSiege:info.forceSiege,defensive:info.defensive};
					available.all.push(unit);map[unit.type]=unit;
					switch(info.kind){
						case"l":available.land.push(unit);break;
						case"c":available.scout.push(unit);break;
						case"s":available.siege.push(unit);break;
						case"t":available.transport.push(unit);break;
						case"w":available.ships.push(unit);break;
						case"b":available.baron.push(unit);break;
					}
				}
			},this);
		if(unitOrders!=null){
			unitOrders.forEach(function(order){
				if(includeActive&&order.state!=0){return;}
				order.units.forEach(function(u){
					var unit=map[u.type];
					if(unit!=undefined){unit.count-=u.count;}
				});
			},this);
		}
		return available;
		},orderUnits:function(units,target,attackType,timingType,timeMillis,callback){
		var _this=this;
		var activeCity=webfrontend.data.City.getInstance();
		target=this.removeBBcode(target).trim();
		if(!target.match(/^\d{3}:\d{3}$/)){
			throw new Error("Invalid target format '"+target+"'");
		}
		var unitList=[];
		units.forEach(function(u){if(u.count<1){return;}
		if(_this.DO_NOT_ATTACK_UNITS[u.type]){
			throw new Error("Invalid unit ordered to attack");
		}
		if(attackType==_this.PLUNDER_ORDER_ID&&_this.DO_NOT_PLUNDER_UNITS[u.type]){
			throw new Error("Invalid unit ordered to plunder");
		}
		unitList.push({t:u.type,c:u.count});});
		if(unitList.length<1){
			throw new Error("No units selected");
		}
		var request={cityid:activeCity.getId(),units:unitList,targetCity:target,order:attackType,transport:1,timeReferenceType:timingType,referenceTimeUTCMillis:timeMillis+1000,raidTimeReferenceType:0,raidReferenceTimeUTCMillis:0};
		var commandManager=webfrontend.net.CommandManager.getInstance();commandManager.sendCommand("OrderUnits",request,null,callback);},getOrder:function(city,orderId){
			var unitOrders=city.getUnitOrders();
			if(unitOrders!=null){
				for(var i=0;i<unitOrders.length;i++){
					if(unitOrders[i].id==orderId){return unitOrders[i];}
				}
			}
			return null;
		},canOrderBeCancelled:function(order){
			var serverTime=webfrontend.data.ServerTime.getInstance();
			return(order.state!=2)&&(order.start>serverTime.getServerStep()-this.ORDER_CANCEL_PERIOD_S);
		},cancelUnitOrder:function(orderId,callback,self){
			var activeCity=webfrontend.data.City.getInstance();
			var order=this.getOrder(activeCity,orderId);
			if(order==null){
				throw new Error("Order not found");
			}
			if(!this.canOrderBeCancelled(order)){
				throw new Error("Order cannot be cancelled");
			}
			var command="CancelUnitOrder";
			var request={cityid:activeCity.getId(),id:orderId,isDelayed:order.state==0};
			var commandManager=webfrontend.net.CommandManager.getInstance();
			commandManager.sendCommand(command,request,null,function(unknown,ok){callback.call(self,ok?null:new Error("Error executing "+command+" command"));});},cancelRaidOrder:function(orderId,callback,self){var activeCity=webfrontend.data.City.getInstance();var order=this.getOrder(activeCity,orderId);if(order==null){throw new Error("Order not found");}if(order.type!=this.RAID_ORDER_ID){throw new Error("Order is not a raid");}var command="UnitOrderSetRecurringOptions";var request={cityid:activeCity.getId(),id:orderId,isDelayed:order.state==0,recurringType:0};var commandManager=webfrontend.net.CommandManager.getInstance();commandManager.sendCommand(command,request,null,function(unknown,ok){callback.call(self,ok?null:new Error("Error executing "+command+" command"));});},cancelOrder:function(orderId,callback,self){var activeCity=webfrontend.data.City.getInstance();var order=this.getOrder(activeCity,orderId);if(order==null){throw new Error("Order not found");}if(this.canOrderBeCancelled(order)){this.cancelUnitOrder(orderId,callback,self);}else{if(order.type==this.RAID_ORDER_ID){this.cancelRaidOrder(orderId,callback,self);}else{throw new Error("Order cannot be cancelled");}}},cancelOrders:function(orderIdList,callback,self){var _this=this;var listCopy=[].concat(orderIdList);var delay=0;var cancelFunc;cancelFunc=function(error){if(error){callback.call(self,error);return;}var orderId=listCopy.pop();if(orderId){paDebug("Next cancelOrder in "+delay);setTimeout(function(){delay=500;try{_this.cancelOrder(orderId,cancelFunc);}catch(ex){callback.call(self,ex);}},delay);}else{callback.call(self,null);}};cancelFunc(null);},prepareRealAttackUnits:function(availUnits,naval,siege,baron,scouts,limitToTransport,minTS){var activeCity=webfrontend.data.City.getInstance();var order={totalTS:0,units:[]};if(minTS==null){minTS=this.getMinAttackStrength(activeCity.getUnitLimit());}var land=availUnits.land;if(baron){land=availUnits.baron.concat(availUnits.land);}if(naval){if(availUnits.siege.length>0){throw new Error("Naval attack is not possible with siege engines");}var requiredCapacity=0;land.forEach(function(u){requiredCapacity+=u.count*u.unitTS;});var transportCapacity=0;availUnits.transport.forEach(function(u){transportCapacity+=u.count*u.unitCapacity;});if(!limitToTransport&&transportCapacity<requiredCapacity){throw new Error("Not enough ships to carry your troops");}var availableCapacity=transportCapacity;order.units=availUnits.transport.concat(availUnits.ships);order.isPartial=false;if(scouts){land=land.concat(availUnits.scout);}land.forEach(function(u){if(availableCapacity>u.unitTS){var unitOrder=qx.lang.Object.clone(u);unitOrder.count=Math.min(unitOrder.count,Math.floor(availableCapacity/u.unitTS));order.isPartial=order.isPartial||(unitOrder.count<u.count);order.units.push(unitOrder);availableCapacity-=unitOrder.count*unitOrder.unitTS;}});}else{order.units=land.concat(availUnits.siege);if(scouts){order.units=order.units.concat(availUnits.scout);}}if(!siege){[].concat(order.units).forEach(function(u){if(u.kind!="b"&&u.off=="d"){order.units.splice(order.units.indexOf(u),1);}});}if(order.units.length<1){throw new Error("No troops available");}order.units.forEach(function(u){order.totalTS+=(u.count*u.unitTS);});if(order.totalTS<minTS){throw new Error("Not enough troops available");}return order;},prepareFakeAttackUnits:function(availUnits,naval,minTS){var activeCity=webfrontend.data.City.getInstance();var sorted,fake,neededCount,unitOrder;if(minTS==undefined||minTS==null){minTS=this.getMinAttackStrength(activeCity.getUnitLimit());}var order={totalTS:0,units:[]};var sortFunc=function(a,b){return(b.count*b.unitTS)-(a.count*a.unitTS);};if(naval){sorted=availUnits.land.concat(availUnits.ships).sort(sortFunc);if(sorted.length<1){throw new Error("No troops available");}fake=sorted[0];if(fake.kind!="w"){if(availUnits.transport.length<1){throw new Error("No ships available");}var transport=availUnits.transport[0];var shipCount=Math.ceil(minTS/(transport.unitTS+transport.unitCapacity));var landTS=minTS-(shipCount*transport.unitTS);var landCount=Math.ceil(landTS/fake.unitTS);if(fake.count<landCount){throw new Error("Not enough troops available");}if(transport.count<shipCount){throw new Error("Not enough ships to carry your troops");}unitOrder=qx.lang.Object.clone(fake);unitOrder.count=landCount;var shipOrder=qx.lang.Object.clone(transport);shipOrder.count=shipCount;order.units=[unitOrder,shipOrder];}else{neededCount=Math.ceil(minTS/fake.unitTS);if(fake.count<neededCount){throw new Error("Not enough troops available");}unitOrder=qx.lang.Object.clone(fake);unitOrder.count=neededCount;order.units=[unitOrder];}}else{sorted=availUnits.land.concat(availUnits.siege).sort(sortFunc);if(sorted.length<1){throw new Error("No troops available");}fake=sorted[0];neededCount=Math.ceil(minTS/fake.unitTS);if(fake.count<neededCount){throw new Error("Not enough troops available");}unitOrder=qx.lang.Object.clone(fake);unitOrder.count=neededCount;order.units=[unitOrder];}order.units.forEach(function(u){order.totalTS+=u.count*u.unitTS;});return order;},prepareScoutAttackUnits:function(availUnits,naval,minimal,limitToTransport,minTS){var activeCity=webfrontend.data.City.getInstance();if(minTS===undefined){minTS=this.getMinAttackStrength(activeCity.getUnitLimit());}var order={totalTS:0,units:[]};if(availUnits.scout.length<1){throw new Error("No scouts available");}var scout=qx.lang.Object.clone(availUnits.scout[0]);if(scout.count*scout.unitTS<minTS){throw new Error("Not enough troops available");}if(minimal){scout.count=Math.ceil(minTS/scout.unitTS);}if(naval){if(availUnits.transport.length<1){throw new Error("No ships available");}var transport=qx.lang.Object.clone(availUnits.transport[0]);var availableCapacity=transport.count*transport.unitCapacity;if(availableCapacity<minTS){throw new Error("Not enough ships to carry your troops");}if(!limitToTransport){var scoutTS=scout.count*scout.unitTS;var shipCount=Math.ceil(scoutTS/transport.unitCapacity);if(transport.count<shipCount){throw new Error("Not enough ships to carry your troops");}transport.count=shipCount;}else{scout.count=Math.floor(availableCapacity/scout.unitTS);}order.units.push(transport);}order.units.push(scout);order.units.forEach(function(u){order.totalTS+=u.count*u.unitTS;});return order;},getUnitBonus:function(unitType){var research=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.research,Number(unitType));var shrine=webfrontend.data.Tech.getInstance().getBonus("unitDamage",webfrontend.data.Tech.shrine,Number(unitType));return(research+shrine)/100;},getUnitBaseDamage:function(unitType){return webfrontend.res.Main.getInstance().units[unitType].av;},getUnitDamage:function(unitType){var base=this.getUnitBaseDamage(unitType);var bonus=this.getUnitBonus(unitType);return Math.floor(base*(1+bonus));},getMinAttackStrength:function(maxTS){if(maxTS<100000){return 1000;}else{if(maxTS<120000){return 1200;}else{if(maxTS<160000){return 1600;}else{if(maxTS<200000){return 2000;}else{if(maxTS<240000){return 2500;}else{return 3000;}}}}}},getMajorAttackType:function(units){var i;for(i=0;i<units.length;i++){if(units[i].forceSiege){return"d";}}var sorted=[].concat(units).sort(function(a,b){return(b.count*b.unitTS)-(a.count*a.unitTS);});for(i=0;i<sorted.length;i++){if("lswc".indexOf(sorted[i].kind)>-1){return sorted[i].off;}}throw new Error("Unable to determine attack type");},convertGameTimeToUtc:function(gameTime,timeType){if(!(gameTime instanceof Date)){return null;}timeType=timeType!=null?timeType:webfrontend.config.Config.getInstance().getTimeZone();var timeZoneOffset=webfrontend.config.Config.getInstance().getTimeZoneOffset();var serverOffset=webfrontend.data.ServerTime.getInstance().getServerOffset();var localOffset=-new Date().getTimezoneOffset()*60000;var serverDiff=webfrontend.data.ServerTime.getInstance().getDiff();switch(timeType){case 0:return gameTime.getTime()-localOffset-serverDiff;case 1:return gameTime.getTime()-serverOffset;case 2:return gameTime.getTime()-timeZoneOffset;default:throw new Error("Unknown time settings");}},convertUtcToGameTime:function(utcTime,timeType){if(isNaN(utcTime)){return null;}timeType=timeType!=null?timeType:webfrontend.config.Config.getInstance().getTimeZone();var timeZoneOffset=webfrontend.config.Config.getInstance().getTimeZoneOffset();var serverOffset=webfrontend.data.ServerTime.getInstance().getServerOffset();var localOffset=-new Date().getTimezoneOffset()*60000;var serverDiff=webfrontend.data.ServerTime.getInstance().getDiff();switch(timeType){case 0:return new Date(utcTime+localOffset+serverDiff);case 1:return new Date(utcTime+serverOffset);case 2:return new Date(utcTime+timeZoneOffset);default:throw new Error("Unknown time settings");}},getErrorMessage:function(code){if(code==0){return"Success";}else{if(code&4194304){return"The chosen time is in the past";}else{if(code&1){return"No target or unreachable by moongate";}else{if(code&4){return"Not enough moonstones";}else{if(code&16){return"Target city has no castle";}else{if(code&524288){return"Target is not reachable on water";}else{if(code&1024){return"Dungeons can only be raided";}else{return"Unknown error "+code;}}}}}}}}}});qx.Class.define("paTweak.CoordUtils",{type:"singleton",extend:qx.core.Object,statics:{convertCoordinatesToId:function(x,y){var id=parseInt(x,10)|(parseInt(y,10)<<16);return id;},convertIdToCoodrinates:function(id){var o=this.convertIdToCoordinatesObject(id);return o.xPos+":"+o.yPos;},convertIdToCoordinatesObject:function(id){var o={xPos:(id&65535),yPos:(id>>16),};o.cont=webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos,o.yPos);return o;}}});qx.Class.define("paTweak.BossUtils",{type:"static",extend:qx.lang.Object,construct:function(){this.base(arguments);},statics:{BOSS_DEFENSE_STRONG:[2500,15000,100000,200000,500000,750000,1000000,1500000,2250000,3000000],BOSS_DEFENSE_WEAK:[1700,10000,68000,132000,332000,500000,680000,1000000,1500000,2000000],requestBossInfo:function(x,y,callback){var _this=this;var activeCity=webfrontend.data.City.getInstance();var request={cityid:activeCity.getId(),x:x,y:y};var commandManager=webfrontend.net.CommandManager.getInstance();commandManager.sendCommand("GetOrderTargetInfo",request,null,function(ok,data){var info=_this.getBossInfo(data);if(info){info.name=info.cn;info.coords=paTweak.CombatTools.normalizeCoords(x+":"+y);callback(info);}else{paDebug("Unable to get target info");}});},getBossInfo:function(data){var m=data.cn.match(/^([^:]+):(\d+)$/);if(m==null){return null;}var lvl=Number(m[2]);switch(data.t){case 6:return{weakness:"c",level:lvl,water:false};case 7:return{weakness:"i",level:lvl,water:false};case 8:return{weakness:"i",level:lvl,water:false};case 12:return{weakness:"sd",level:lvl,water:true};default:return null;}},prepareAttack:function(bossInfo){var city=webfrontend.data.City.getInstance();var availUnits=paTweak.CombatTools.getAvailableUnits(city,false);var units=[].concat(bossInfo.water?availUnits.ships:availUnits.land);units.forEach(function(u){var dmg=paTweak.CombatTools.getUnitDamage(u.type);if(dmg>0){u.dmg=dmg;}});units.sort(function(a,b){return(b.count*b.dmg)-(a.count*a.dmg);});var order;for(var i=0;i<units.length;i++){order=this.getOrder(bossInfo,units[i]);if(order!=null){break;}}if(order==null){throw new Error("No unit to attack with");}return order;},getOrder:function(bossInfo,unit){var str;if(bossInfo.weakness.indexOf(unit.off)>-1){str=paTweak.BossUtils.BOSS_DEFENSE_WEAK[bossInfo.level-1];}else{str=paTweak.BossUtils.BOSS_DEFENSE_STRONG[bossInfo.level-1];}var reqCount=Math.ceil(str/unit.dmg);if(unit.count<reqCount){return null;}var unitOrder=qx.lang.Object.clone(unit);unitOrder.count=reqCount;return[unitOrder];},sendAttack:function(x,y,callback){var _this=this;this.requestBossInfo(x,y,function(bossInfo){try{var units=_this.prepareAttack(bossInfo);paTweak.CombatTools.orderUnits(units,bossInfo.coords,8,1,0,function(ok,errorCode){var error=paTweak.CombatTools.getErrorMessage(errorCode);paDebug("Hunt result="+error);if(callback){callback(ok,errorCode,error);}});}catch(e){paDebug(e);}});}}});qx.Class.define("paTweak.ui.components.AttackOrder",{extend:qx.ui.container.Composite,construct:function(){this.base(arguments);var combatTools=paTweak.CombatTools;var PLUNDER={label:"Plunder",type:combatTools.PLUNDER_ORDER_ID};var SIEGE={label:"Siege",type:combatTools.SIEGE_ORDER_ID};var ASSAULT={label:"Assault",type:combatTools.ATTACK_ORDER_ID};var SCOUT={label:"Scout",type:combatTools.SCOUT_ORDER_ID};this.ATTACK_ACTIONS=[];this.ATTACK_ACTIONS.push({name:"fake",label:"Fake",allowed:[SIEGE,PLUNDER],tooltip:"Minimal troop count will be sent."});this.ATTACK_ACTIONS.push({name:"capture",label:"Capture",allowed:[SIEGE,ASSAULT],tooltip:"Barons will be included in the attack, if available. No Catapults or Galleons will be sent, only Rams."});this.ATTACK_ACTIONS.push({name:"demo",label:"Demolish",allowed:[SIEGE,ASSAULT],tooltip:"Catapults and Galleons will be included in the attack."});this.ATTACK_ACTIONS.push({name:"attack",label:"Attack",allowed:[SIEGE,PLUNDER,ASSAULT],tooltip:"Simple attack, no Catapults, Galleons or Barons will be included. Rams will be used, if available."});this.ATTACK_ACTIONS.push({name:"scout",label:"Scout",allowed:[SCOUT],tooltip:"Only scouts will be sent."});this.buildUI();this.selectAction(this.ATTACK_ACTIONS[0]);},events:{attack:"qx.event.type.Data",changeValue:"qx.event.type.Event"},members:{ATTACK_ACTIONS:null,_attackButton:null,_actionButton:null,_coordsText:null,_toggleButton:null,_noteText:null,_counterLabel:null,_selectedAction:null,_selectedTypeIndex:-1,_applyingValue:false,buildUI:function(){var _this=this;var app=qx.core.Init.getApplication();this.setLayout(new qx.ui.layout.HBox(5));var actionMenu=new qx.ui.menu.Menu();this.ATTACK_ACTIONS.forEach(function(action){var menuButton=new qx.ui.menu.Button(action.label);menuButton.addListener("execute",function(){_this.selectAction(action);});actionMenu.add(menuButton);});this._attackButton=new qx.ui.form.Button("[Select]");this._attackButton.set({appearance:"button-text-small",width:80});this._attackButton.addListener("execute",this.fireAttack,this);this._actionButton=new qx.ui.form.MenuButton("?",null,actionMenu);this._actionButton.set({appearance:"button-text-small",width:20});var attackControl=new qx.ui.container.Composite();attackControl.setLayout(new qx.ui.layout.HBox(1));attackControl.add(this._attackButton);attackControl.add(this._actionButton);this._toggleButton=new qx.ui.form.Button("[Select]");this._toggleButton.set({appearance:"button-text-small",width:60,toolTipText:"Siege Engines and Baron will always siege the target, regardless the option."});this._toggleButton.addListener("execute",this.onModeToggle,this);this._coordsText=new qx.ui.form.TextField();this._coordsText.set({width:80,marginTop:1,maxLength:40,toolTipText:"Coordinates in xxx:yyy format."});app.setElementModalInput(this._coordsText);this._coordsText.addListener("changeValue",this.onNormalizeCoords,this);this._coordsText.addListener("changeValue",this.fireChangeValue,this);this._noteText=new qx.ui.form.TextField();this._noteText.set({width:220,toolTipText:"Just a note."});this._noteText.addListener("changeValue",this.fireChangeValue,this);app.setElementModalInput(this._noteText);this._counterLabel=new qx.ui.basic.Label();this._counterLabel.set({minWidth:30,allowGrowX:true,toolTipText:"Indicative count of attacks you have sent to this target. DblClick to remove last entry. I=Infrantry, C=Cavalry, M=Magic, D=Siege Engines"});this._counterLabel.addListener("dblclick",this.removeLastCount,this);this.add(attackControl);this.add(this._coordsText);this.add(this._toggleButton);this.add(this._noteText);this.add(this._counterLabel);},selectAction:function(action){this._selectedAction=action;this._attackButton.setLabel(action.label.toUpperCase());this._attackButton.setToolTipText(action.tooltip);this._selectedTypeIndex=-1;this.onModeToggle();},onModeToggle:function(){var allowed=this._selectedAction.allowed;this._selectedTypeIndex++;if(this._selectedTypeIndex>=allowed.length){this._selectedTypeIndex=0;}this._toggleButton.setLabel(allowed[this._selectedTypeIndex].label);this.fireChangeValue();},onNormalizeCoords:function(e){var str=paTweak.CombatTools.normalizeCoords(e.getData());if(str!=null&&str!=e.getData()){e.stopPropagation();this._coordsText.setValue(str);}},fireAttack:function(){var value=this.getValue();if(value!=null){this.fireDataEvent("attack",value);}},fireChangeValue:function(){if(!this._applyingValue){this.fireEvent("changeValue");}},setAttackEnabled:function(value){attackButton.setEnabled(value);},getValue:function(){var coords=paTweak.CombatTools.normalizeCoords(this._coordsText.getValue());var type=this._selectedAction.allowed[this._selectedTypeIndex];var note=(this._noteText.getValue()||"").trim();if(coords==null||type==null){return null;}return{attack:this._selectedAction.name,type:type.type,target:coords,note:note};},setValue:function(data){if(data==null){data={fake:true};}try{this._applyingValue=true;var action=this._actionByName(data.attack);this.selectAction(action);var allowed=this._selectedAction.allowed;this._selectedTypeIndex=0;for(var i=0;i<allowed.length;i++){if(allowed[i].type==data.type){this._selectedTypeIndex=i;break;}}this._toggleButton.setLabel(allowed[this._selectedTypeIndex].label);var coords=paTweak.CombatTools.normalizeCoords(data.target);this._coordsText.setValue(coords);this._noteText.setValue(data.note||"");}finally{this._applyingValue=false;}this.fireChangeValue();},setActionEnabled:function(value){this._attackButton.setEnabled(value);},getActionEnabled:function(){return this._attackButton.getEnabled();},addCount:function(type){var old=this._counterLabel.getValue()||"";this._counterLabel.setValue(old+type);},removeLastCount:function(){var old=this._counterLabel.getValue()||"";if(old.length>0){this._counterLabel.setValue(old.substr(0,old.length-1));}},resetCount:function(){this._counterLabel.resetValue();},_actionByName:function(name){for(var i=0;i<this.ATTACK_ACTIONS.length;i++){if(this.ATTACK_ACTIONS[i].name==name){return this.ATTACK_ACTIONS[i];}}return this.ATTACK_ACTIONS[0];}}});qx.Class.define("paTweak.ui.components.LeftPanel",{extend:qx.ui.container.Composite,construct:function(label){this.base(arguments);this.buildPanelUI(label);},members:{content:null,buildPanelUI:function(labelText){this.setLayout(new qx.ui.layout.Canvas());this.set({marginTop:3,marginBottom:3});background=new qx.ui.basic.Image("http://prodcdngame.lordofultima.com/cdn/335296/resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png");background.set({width:338,height:35});this.add(background,{left:0,bottom:0});background=new qx.ui.basic.Image("http://prodcdngame.lordofultima.com/cdn/335296/resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_wide.png");background.set({width:338,height:32});this.add(background,{left:0,top:0});var label=new qx.ui.basic.Label(labelText);label.set({font:"bold",textColor:"#ffCC82"});this.add(label,{left:13,top:8});this.content=new qx.ui.container.Composite();this.content.setLayout(new qx.ui.layout.VBox(5));this.content.set({width:322,marginBottom:8});this.add(this.content,{top:35,left:8});},getContent:function(){return this.content;},addContent:function(widget,args){this.content.add(widget,args);}}});qx.Class.define("paTweak.ui.components.TimePicker",{extend:qx.ui.container.Composite,construct:function(caption){this.base(arguments);this.buildUI(caption);},properties:{value:{check:"Date",init:new Date(0),apply:"_applyValue"}},events:{changeValue:"qx.event.type.Data"},members:{_dateSelect:null,_hourText:null,_minuteText:null,_secondText:null,_applyingValue:false,_updatingValue:false,buildUI:function(caption){var app=qx.core.Init.getApplication();this.setLayout(new qx.ui.layout.HBox(5));if(caption!=null){var captionLabel=new qx.ui.basic.Label(caption);captionLabel.set({width:60,allowGrowX:false});this.add(captionLabel);}this._hourText=new qx.ui.form.TextField("0");this._hourText.set({width:26,maxLength:2});this._hourText.addListener("changeValue",this._onValidateHour,this._hourText);app.setElementModalInput(this._hourText);this.add(this._hourText);this._minuteText=new qx.ui.form.TextField("0");this._minuteText.set({width:26,maxLength:2});this._minuteText.addListener("changeValue",this._onValidateMinute,this._minuteText);app.setElementModalInput(this._minuteText);this.add(this._minuteText);this._secondText=new qx.ui.form.TextField("0");this._secondText.set({width:26,maxLength:2});this._secondText.addListener("changeValue",this._onValidateMinute,this._secondText);app.setElementModalInput(this._secondText);this.add(this._secondText);this._dateSelect=new qx.ui.form.SelectBox();this._dateSelect.set({width:90});this._dateSelect.add(new qx.ui.form.ListItem("Today",null,0));this._dateSelect.add(new qx.ui.form.ListItem("Tomorrow",null,1));this._dateSelect.add(new qx.ui.form.ListItem("2 Days",null,2));this._dateSelect.add(new qx.ui.form.ListItem("3 Days",null,3));this._dateSelect.add(new qx.ui.form.ListItem("4 Days",null,4));this._dateSelect.add(new qx.ui.form.ListItem("5 Days",null,5));this._dateSelect.add(new qx.ui.form.ListItem("6 Days",null,6));this._dateSelect.add(new qx.ui.form.ListItem("7 Days",null,7));this.add(this._dateSelect);this._hourText.addListener("changeValue",this._updateValue,this);this._minuteText.addListener("changeValue",this._updateValue,this);this._secondText.addListener("changeValue",this._updateValue,this);this._dateSelect.addListener("changeSelection",this._updateValue,this);},fireChangeValue:function(){this.fireDataEvent("changeValue",this.getValue());},_applyValue:function(value){if(this._updatingValue){return;}var gameNow=webfrontend.Util.getCurrentTime().getTime();var totalDaysNow=Math.floor(gameNow/(24*3600*1000));var totalDaysValue=Math.floor(value.getTime()/(24*3600*1000));var daysOffset=totalDaysValue-totalDaysNow;try{this._applyingValue=true;this._hourText.setValue(String(value.getUTCHours()));this._minuteText.setValue(String(value.getUTCMinutes()));this._secondText.setValue(String(value.getUTCSeconds()));this._dateSelect.setModelSelection([daysOffset]);}finally{this._applyingValue=false;}this.fireChangeValue();},_updateValue:function(){if(this._applyingValue){return;}var hours=Number(this._hourText.getValue());var minutes=Number(this._minuteText.getValue());var seconds=Number(this._secondText.getValue());var dayValue=this._dateSelect.getSelection()[0].getModel();var dateOffset=Number(dayValue);var gameNow=webfrontend.Util.getCurrentTime().getTime();gameNow+=dateOffset*24*3600*1000;var date=new Date(gameNow);date.setUTCHours(hours);date.setUTCMinutes(minutes);date.setUTCSeconds(seconds);date.setUTCMilliseconds(0);try{this._updatingValue=true;this.setValue(date);}finally{this._updatingValue=false;}this.fireChangeValue();},_onValidateHour:function(e){var num=Math.floor(Number(e.getData()));if(num>23){e.stopPropagation();this.setValue("23");}else{if(num<0||isNaN(num)){e.stopPropagation();this.setValue("0");}else{if(String(num)!=e.getData()){e.stopPropagation();this.setValue(String(num));}}}},_onValidateMinute:function(e){var num=Math.floor(Number(e.getData()));if(num>59){e.stopPropagation();this.setValue("59");}else{if(num<0||isNaN(num)){e.stopPropagation();this.setValue("0");}else{if(String(num)!=e.getData()){e.stopPropagation();this.setValue(String(num));}}}}}});qx.Class.define("paTweak.ui.AboutWindow",{type:"singleton",extend:qx.ui.window.Window,construct:function(){this.base(arguments,"LoC (p_a) Tools v"+paTweak.Version.PAversion);this.buildUI();this.addListener("appear",this.loadDeveloperInfo,this);},members:{_developerInfoText:null,buildUI:function(){var app=qx.core.Init.getApplication();this.setLayout(new qx.ui.layout.VBox(10));this.set({allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,showStatusbar:false,showClose:false,contentPadding:5,useMoveFrame:true,resizable:true});this.setWidth(400);webfrontend.gui.Util.formatWinClose(this);var licenseLabel=new qx.ui.basic.Label("License").set({font:"bold"});this.add(licenseLabel);var license="LoC (p_a) Tools - GreaseMonkey script for Lord of Ultima™";license+="\nCopyright © 2012 "+paTweak.Version.PAauthors;license+="\n\nPortions copyright "+paTweak.Version.PAcontrib;license+="\n\n";license+=paTweak.Version.GPL;var licenseText=new qx.ui.form.TextArea();licenseText.set({readOnly:true,wrap:true,autoSize:true,tabIndex:303,minHeight:280});licenseText.setValue(license);this.add(licenseText);var devInfoLabel=new qx.ui.basic.Label("Developer Info").set({font:"bold"});devInfoLabel.setToolTipText("Date of add-on build: "+paTweak.Version.PAbuild);this.add(devInfoLabel);var devInfoText=this._developerInfoText=new qx.ui.form.TextArea();devInfoText.set({readOnly:true,autoSize:true,tabIndex:304,height:50});app.setElementModalInput(devInfoText);this.add(devInfoText);var closeButton=new qx.ui.form.Button("Close");closeButton.addListener("execute",this.hide,this);this.add(closeButton);},loadDeveloperInfo:function(){var output="Session ID: "+webfrontend.net.CommandManager.getInstance().getInstanceGuid()+"\n";output+="City ID: "+webfrontend.data.City.getInstance().getId()+"\n";this._developerInfoText.setValue(output);this._developerInfoText.selectAllText();}}});qx.Class.define("paTweak.ui.CancelOrderPanel",{extend:qx.ui.container.Composite,construct:function(){this.base(arguments);this.buildUI();},statics:{getOrderList:function(filterFunc){var activeCity=webfrontend.data.City.getInstance();var unitOrders=activeCity.getUnitOrders();var idList=[];if(unitOrders!=null){unitOrders.forEach(function(order){if(filterFunc(order)){idList.push(order.id);}});}return idList;},cancelAll:function(callback,self){var orderList=this.getOrderList(function(order){return paTweak.CombatTools.canOrderBeCancelled(order)||(order.type==paTweak.CombatTools.RAID_ORDER_ID&&order.recurringType!=0);});paDebug("Orders to cancel: "+orderList.length);paTweak.CombatTools.cancelOrders(orderList,callback,self);},cancelAllRaids:function(callback,self){var orderList=this.getOrderList(function(order){return order.type==paTweak.CombatTools.RAID_ORDER_ID&&(order.recurringType!=0||paTweak.CombatTools.canOrderBeCancelled(order));});paDebug("Orders to cancel: "+orderList.length);paTweak.CombatTools.cancelOrders(orderList,callback,self);}},members:{_cancelAllButton:null,_cancelRaidsButton:null,buildUI:function(){this.setLayout(new qx.ui.layout.VBox(5));var firstRow=new qx.ui.container.Composite();firstRow.setLayout(new qx.ui.layout.HBox());firstRow.set({width:75});this._returnByButton=new qx.ui.form.Button("Rtn");this._returnByButton.set({width:30,maxWidth:30,appearance:"button-text-small",toolTipText:"All raids return by XX:XX:XX"});this._returnByButton.addListener("execute",this.returnBy,this);this._cancelAllButton=new qx.ui.form.Button("C All");this._cancelAllButton.set({width:45,maxWidth:45,appearance:"button-text-small",toolTipText:"Cancel all orders. Careful!"});this._cancelAllButton.addListener("execute",this.cancelAll,this);this._cancelRaidsButton=new qx.ui.form.Button("Cancel Raids");this._cancelRaidsButton.set({width:75,maxWidth:75,appearance:"button-text-small",toolTipText:"Cancel all raid orders."});this._cancelRaidsButton.addListener("execute",this.cancelAllRaids,this);this.add(this._cancelRaidsButton);firstRow.add(this._returnByButton);firstRow.add(this._cancelAllButton);this.add(firstRow);},_setButtonsEnabled:function(value){this._cancelAllButton.setEnabled(value);this._cancelRaidsButton.setEnabled(value);this._returnByButton.setEnabled(value);},returnBy:function(){var dialog=paTweak.ui.ReturnByWindow.getInstance();dialog.center();dialog.show();},cancelAll:function(){if(!confirm("Do you want to cancel all orders?")){return;}this._setButtonsEnabled(false);this.self(arguments).cancelAll(function(error){this._setButtonsEnabled(true);if(error){paDebug(error);}},this);},cancelAllRaids:function(){this._setButtonsEnabled(false);this.self(arguments).cancelAllRaids(function(error){this._setButtonsEnabled(true);if(error){paDebug(error);}},this);}}});qx.Class.define("paTweak.ui.CombatWindow",{type:"singleton",extend:qx.ui.window.Window,construct:function(){this.base(arguments,"Combat Tool");this._rows=[];this.buildUI();this.loadData();this._listener_cityChanged=webfrontend.data.City.getInstance().addListener("changeVersion",function(){if(!this.isVisible()){return;}this.refresh();this._setActionEnabled(true);this._lock_safeguard=null;},this);this.addListener("appear",function(){this.refresh();this.resetMessage();},this);this.addListener("changeActive",function(e){if(!e.getData()){this.storeData();}},this);},destruct:function(){var city=webfrontend.data.City.getInstance();if(this._listener_cityChanged){city.removeListenerById(this._listener_cityChanged);}},members:{_addButton:null,_resetButton:null,_messageLabel:null,_availableLabel:null,_includeActive:null,_allowPartial:null,_useScouts:null,_useSmallestForFakes:null,_excludeDefenseCheck:null,_forceMsCheck:null,_travelModeGroup:null,_rows:null,_magicTime:null,_infTime:null,_cavTime:null,_siegeTime:null,_copyButton:null,_listener_cityChanged:null,_lock_safeguard:null,buildUI:function(){this.setLayout(new qx.ui.layout.VBox(5));this.set({allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,showStatusbar:false,showClose:false,contentPadding:5,useMoveFrame:true,resizable:false});webfrontend.gui.Util.formatWinClose(this);this._messageLabel=new qx.ui.basic.Label();this._messageLabel.set({textColor:"#D10600",wrap:true});this.add(this._messageLabel);this._magicTime=new paTweak.ui.components.TimePicker("Magic");this._cavTime=new paTweak.ui.components.TimePicker("Cavalry");this._infTime=new paTweak.ui.components.TimePicker("Infantry");this._siegeTime=new paTweak.ui.components.TimePicker("Siege");this._copyButton=new qx.ui.form.Button("Copy");this._copyButton.set({appearance:"button-text-small"});this._copyButton.addListener("execute",this.copyTimes,this);var firstTimeRow=new qx.ui.container.Composite();firstTimeRow.setLayout(new qx.ui.layout.HBox(5));firstTimeRow.add(this._magicTime);firstTimeRow.add(this._copyButton);var timesBox=new qx.ui.container.Composite(new qx.ui.layout.VBox(5));timesBox.add(firstTimeRow);timesBox.add(this._cavTime);timesBox.add(this._infTime);timesBox.add(this._siegeTime);var importButton=new qx.ui.form.Button("Import/Export");importButton.set({appearance:"button-text-small",allowGrowX:false,toolTipText:"Import or export attacks configuration."});importButton.addListener("execute",function(){var win=paTweak.ui.CombatWindowExport.getInstance();win.center();win.open();},this);this._resetButton=new qx.ui.form.Button("Reset");this._resetButton.set({appearance:"button-text-small",allowGrowX:false,toolTipText:"Resets all values in the dialog."});this._resetButton.addListener("execute",function(){if(confirm("Are you sure you want to throw away all your plans?")){this.reset();}},this);var buttonsRow=new qx.ui.container.Composite(new qx.ui.layout.HBox(5));buttonsRow.add(importButton);buttonsRow.add(this._resetButton);this._includeActive=new qx.ui.form.CheckBox("Include units out of the city");this._includeActive.setToolTipText("If checked, units currently out of the city (raiding/plundering etc) will be included into commands. You are supposed to get them home in time by yourself.");this._includeActive.initValue(true);this._includeActive.addListener("changeValue",this.refresh,this);this._allowPartial=new qx.ui.form.CheckBox("Allow partial naval attack");this._allowPartial.setToolTipText("When there are not enough Frigates to carry your troops, it allows to send only part of the army that will fit on the ships. Has no effect on land attacks.");this._useScouts=new qx.ui.form.CheckBox("Include scouts in the attacks");this._useScouts.setToolTipText("All available scouts will be sent along other units. If there will be enough scouts, they will be also used for fakes.");this._useScouts.setValue(true);this._useScouts.addListener("changeValue",this.refresh,this);this._useSmallestForFakes=new qx.ui.form.CheckBox("Prefer smallest stack for fakes instead of largest");this._useSmallestForFakes.setToolTipText("By default, unit you have the most of is used for fakes. This changes the order.");this._useSmallestForFakes.setEnabled(false);this._useSmallestForFakes.exclude();this._forceMsCheck=new qx.ui.form.CheckBox("Always use 3000 min TS");this._forceMsCheck.set({toolTipText:"Always use 3000 min TS."});this._forceMsCheck.setValue(true);this._excludeDefenseCheck=new qx.ui.form.CheckBox("Exclude Defense");this._excludeDefenseCheck.set({toolTipText:"Don't use defensive troops."});this._excludeDefenseCheck.setValue(true);this._excludeDefenseCheck.addListener("changeValue",this.refresh,this);var travelModeLabel=new qx.ui.basic.Label("Travel mode");var autoMode=new qx.ui.form.RadioButton("Auto");autoMode.set({model:"auto",toolTipText:"Units will be sent on foot if the target is on the same continent. Otherwise ships will be used."});var navyMode=new qx.ui.form.RadioButton("Navy");navyMode.set({model:"navy",toolTipText:"Units will be send on Frigates even to the target on the same continent. Does not affect ships."});var landMode=new qx.ui.form.RadioButton("Land (Moongate)");landMode.set({model:"land",toolTipText:"Units will be sent on foot even if the target is on different continent. Does not use ships at all."});var travelModeContainer=new qx.ui.container.Composite(new qx.ui.layout.Grid(5,2));travelModeContainer.add(travelModeLabel,{row:0,column:0});travelModeContainer.add(autoMode,{row:0,column:1});travelModeContainer.add(navyMode,{row:1,column:1});travelModeContainer.add(landMode,{row:2,column:1});this._travelModeGroup=new qx.ui.form.RadioGroup(autoMode,navyMode,landMode);this._travelModeGroup.addListener("changeSelection",this.refresh,this);var optionsBox=new qx.ui.container.Composite(new qx.ui.layout.VBox(5));optionsBox.add(buttonsRow);optionsBox.add(this._includeActive);optionsBox.add(this._allowPartial);optionsBox.add(this._useScouts);optionsBox.add(this._useSmallestForFakes);optionsBox.add(this._forceMsCheck);optionsBox.add(this._excludeDefenseCheck);optionsBox.add(travelModeContainer);var outerBox=new qx.ui.container.Composite(new qx.ui.layout.HBox(40));outerBox.add(timesBox);outerBox.add(optionsBox);this.add(outerBox);var availableLabel=this._availableLabel=new qx.ui.basic.Label();availableLabel.set({width:250,wrap:true});var refreshButton=new qx.ui.form.Button("Refresh");refreshButton.set({appearance:"button-text-small"});refreshButton.addListener("execute",this.refresh,this);var resetCounterButton=new qx.ui.form.Button("RC");resetCounterButton.set({appearance:"button-text-small",toolTipText:"Reset the indicative counter."});resetCounterButton.addListener("execute",this.resetCounter,this);var availControl=new qx.ui.container.Composite();availControl.setLayout(new qx.ui.layout.HBox(5));availControl.add(availableLabel);availControl.add(refreshButton);availControl.add(new qx.ui.core.Widget().set({height:1}),{flex:1});availControl.add(resetCounterButton);this.add(availControl);var addButton=this._addButton=new qx.ui.form.Button("Add");addButton.set({appearance:"button-text-small",allowGrowX:false,toolTipText:"Adds new target field."});addButton.addListener("execute",this.addRow,this);this.add(addButton);var noteLabel=new qx.ui.basic.Label("<em>Note: Send fake before real attacks.</em>");noteLabel.setRich(true);this.add(noteLabel);this.addRow();},addRow:function(){var row=new paTweak.ui.components.AttackOrder();row.addListener("attack",this.onAttack,this);this.addBefore(row,this._addButton);this._rows.push(row);if(this._rows.length>15){this._addButton.setEnabled(false);}return row;},_removeRow:function(row){this.remove(row);row.dispose();},_setActionEnabled:function(value){this._rows.forEach(function(row){row.setActionEnabled(value);});},reset:function(){this._rows.forEach(this._removeRow,this);this._rows=[];this.addRow();this._addButton.setEnabled(true);this._magicTime.resetValue();this._cavTime.resetValue();this._infTime.resetValue();this._siegeTime.resetValue();this._includeActive.setValue(false);this._allowPartial.setValue(false);this._useScouts.setValue(true);this._useSmallestForFakes.setValue(false);this._forceMsCheck.setValue(true);this._excludeDefenseCheck.setValue(true);this._travelModeGroup.resetSelection();},resetCounter:function(){this._rows.forEach(function(row){row.resetCount();},this);},refresh:function(){try{var city=webfrontend.data.City.getInstance();var combatTools=paTweak.CombatTools;var includeActive=this._includeActive.getValue();var excludeDefense=this._excludeDefenseCheck.getValue();var travelMode=this.getTravelMode();var excludeNavy=(travelMode=="land");var availUnits=combatTools.getAvailableUnits(city,includeActive,excludeDefense,excludeNavy);var text="";availUnits.all.forEach(function(u){if(u.count>0){if(text.length>0){text+=", ";}text+=u.count+" "+u.name;}});if(text.length==0){text="No troops available";}this._availableLabel.setValue(text);}catch(ex){paDebug(ex);this.setMessage(ex);}},onAttack:function(e){var _this=this;try{var data=e.getData();var target=e.getTarget();var attack=this.getAttackDetails(data.target,data.type,data.attack);var minTS=this.getMinAttackTS();if(minTS>0&&data.attack!="fake"&&attack.attackTS<minTS){throw new Error("Minimal troop count for the attack not met");}_this._setActionEnabled(false);var lockId=_this._lock_safeguard=Math.random();paDebug("Attack lock = "+lockId);setTimeout(function(){paDebug("Attack lock timeout: _this._lock_safeguard="+_this._lock_safeguard+" lockId="+lockId);if(_this._lock_safeguard==lockId){_this._setActionEnabled(true);}},10000);paTweak.CombatTools.orderUnits(attack.units,attack.target,attack.type,attack.timingType,attack.time,function(ok,errorCode){if(errorCode==0){var msg=attack.isPartial?"Partial attack sent":"Attack sent";msg+=" ("+attack.attackTS+" TS)";_this.setMessage(msg);target.addCount((attack.attackType||"").toUpperCase());}else{paDebug(errorCode);var error=paTweak.CombatTools.getErrorMessage(errorCode);_this.setMessage("Unable to dispatch troops: "+error);_this._setActionEnabled(true);_this._lock_safeguard=null;}});}catch(ex){this.setMessage(ex);}this.storeData();},getTravelMode:function(){var sel=this._travelModeGroup.getSelection()[0];return sel?sel.getModel():null;},getAttackTimes:function(){var combatTools=paTweak.CombatTools;var siege=combatTools.convertGameTimeToUtc(this._siegeTime.getValue());return{i:combatTools.convertGameTimeToUtc(this._infTime.getValue()),m:combatTools.convertGameTimeToUtc(this._magicTime.getValue()),c:combatTools.convertGameTimeToUtc(this._cavTime.getValue()),s:siege,d:siege};},getAttackDetails:function(target,type,attack){var city=webfrontend.data.City.getInstance();var server=webfrontend.data.Server.getInstance();var combatTools=paTweak.CombatTools;var includeActive=this._includeActive.getValue();var useScouts=this._useScouts.getValue();var excludeDefense=this._excludeDefenseCheck.getValue();var allowPartial=this._allowPartial.getValue();var travelMode=this.getTravelMode();var minTS=this._forceMsCheck.getValue()?paTweak.CombatTools.DEFAULT_MIN_TS:null;var availUnits=combatTools.getAvailableUnits(city,includeActive,excludeDefense,travelMode=="land");var naval=(travelMode=="navy"||availUnits.ships.length>0);if(!naval&&travelMode!="land"){var targetCoords=combatTools.parseCoords(target);var targetCont=server.getContinentFromCoords(targetCoords[0],targetCoords[1]);var sourceCoords=combatTools.cityIdToCoords(city.getId());var sourceCont=server.getContinentFromCoords(sourceCoords[0],sourceCoords[1]);naval=(targetCont!=sourceCont);}if(naval){if(!city.getOnWater()){throw new Error("Unable to launch naval attack from land-locked castle");}}var attackUnits=null;if(attack=="fake"){if(useScouts){try{attackUnits=combatTools.prepareScoutAttackUnits(availUnits,naval,true,false,minTS);type=combatTools.SCOUT_ORDER_ID;}catch(ignored){}}if(attackUnits==null){attackUnits=combatTools.prepareFakeAttackUnits(availUnits,naval,minTS);}}else{if(attack=="scout"){attackUnits=combatTools.prepareScoutAttackUnits(availUnits,naval,false,allowPartial,minTS);}else{attackUnits=combatTools.prepareRealAttackUnits(availUnits,naval,attack=="demo",attack=="capture",useScouts,allowPartial,minTS);}}var attackType=combatTools.getMajorAttackType(attackUnits.units);var times=this.getAttackTimes();var attackTime=times[attackType];if(attackTime==null){throw new Error("Unknown time of the attack");}if(attackType=="d"){type=combatTools.SIEGE_ORDER_ID;}return{target:target,type:type,units:attackUnits.units,attackTS:attackUnits.totalTS,timingType:combatTools.ARRIVAL_TIMING_ID,time:attackTime,isPartial:attackUnits.isPartial,attackType:attackType};},copyTimes:function(){var value=this._magicTime.getValue();this._cavTime.setValue(value);this._infTime.setValue(value);this._siegeTime.setValue(value);},getMinAttackTS:function(){return 1;},resetMessage:function(){this._messageLabel.setValue("");},setMessage:function(text){this._messageLabel.setValue(text||"");},getData:function(){var combatTools=paTweak.CombatTools;var data={};data.times={magic:combatTools.convertGameTimeToUtc(this._magicTime.getValue()),inf:combatTools.convertGameTimeToUtc(this._infTime.getValue()),cav:combatTools.convertGameTimeToUtc(this._cavTime.getValue()),siege:combatTools.convertGameTimeToUtc(this._siegeTime.getValue())};data.targets=[];this._rows.forEach(function(row){var value=row.getValue();if(value!=null){data.targets.push(value);}});data.includeActive=this._includeActive.getValue();data.allowPartial=this._allowPartial.getValue();data.useScouts=this._useScouts.getValue();data.useSmallestForFakes=this._useSmallestForFakes.getValue();data.excludeDefense=this._excludeDefenseCheck.getValue();data.forceMs=this._forceMsCheck.getValue();data.travelMode=this.getTravelMode();return data;},setData:function(data){var _this=this;var combatTools=paTweak.CombatTools;this.reset();if(data.times){var now=new Date().getTime();if(data.times.magic&&data.times.magic>now){this._magicTime.setValue(combatTools.convertUtcToGameTime(data.times.magic));}if(data.times.inf&&data.times.inf>now){this._infTime.setValue(combatTools.convertUtcToGameTime(data.times.inf));}if(data.times.cav&&data.times.cav>now){this._cavTime.setValue(combatTools.convertUtcToGameTime(data.times.cav));}if(data.times.siege&&data.times.siege>now){this._siegeTime.setValue(combatTools.convertUtcToGameTime(data.times.siege));}}if(data.targets&&data.targets.length>0){this._rows.forEach(this._removeRow,this);this._rows=[];data.targets.forEach(function(rowData){var row=_this.addRow();row.setValue(rowData);});}this._includeActive.setValue(data.includeActive!=null?data.includeActive:true);this._allowPartial.setValue(!!data.allowPartial);this._useScouts.setValue(data.useScouts!=null?data.useScouts:true);this._useSmallestForFakes.setValue(!!data.useSmallestForFakes);this._excludeDefenseCheck.setValue(!!data.excludeDefense);this._forceMsCheck.setValue(!!data.forceMs);this._travelModeGroup.setModelSelection([data.travelMode||"auto"]);},getStoragePath:function(){return"paTweak.ui.CombatWindow."+webfrontend.data.Player.getInstance().getId();},storeData:function(){try{var path=this.getStoragePath();var data=this.getData();localStorage.setItem(path,JSON.stringify(data));paDebug("CombatWindow data stored");}catch(e){paDebug("Unable to load CombatWindow data: "+e);}},loadData:function(){try{var path=this.getStoragePath();var data=JSON.parse(localStorage.getItem(path));if(data!=null){this.setData(data);paDebug("CombatWindow data loaded");}else{this.reset();paDebug("CombatWindow data had no data to load");}}catch(e){paDebug("Unable to load CombatWindow data: "+e);}}}});qx.Class.define("paTweak.ui.CombatWindowExport",{type:"singleton",extend:qx.ui.window.Window,construct:function(){this.base(arguments,"Commands Import/Export");this.buildUI();},statics:{ORDER_TYPES:{"1":"scout","2":"plunder","3":"assault","4":"support","5":"siege"},_formatTime:function(utcTime){var gameTime=paTweak.CombatTools.convertUtcToGameTime(utcTime,1);var text=qx.lang.String.pad(String(gameTime.getUTCFullYear()),4,"0")+"/";text+=qx.lang.String.pad(String(gameTime.getUTCMonth()+1),2,"0")+"/";text+=qx.lang.String.pad(String(gameTime.getUTCDate()),2,"0")+" ";text+=qx.lang.String.pad(String(gameTime.getUTCHours()),2,"0")+":";text+=qx.lang.String.pad(String(gameTime.getUTCMinutes()),2,"0")+":";text+=qx.lang.String.pad(String(gameTime.getUTCSeconds()),2,"0");return text;},_parseTime:function(text){var m=text.match(/^\s*(\d{4})\/?(\d{1,2})\/?(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})\s*$/);if(!m){return null;}var date=Date.UTC(m[1],m[2]-1,m[3],m[4],m[5],m[6],0);if(!isNaN(date)){return paTweak.CombatTools.convertGameTimeToUtc(new Date(date),1);}else{return null;}},dataToString:function(data,separator){var segments=[];var name=webfrontend.data.Server.getInstance().getName();segments.push(name.replace(/\s*\(.*\)\s*/,""));if(data.times){var now=new Date().getTime();if(data.times.magic&&data.times.magic>now){segments.push("Magic "+this._formatTime(data.times.magic));}if(data.times.cav&&data.times.cav>now){segments.push("Cavalry "+this._formatTime(data.times.cav));}if(data.times.inf&&data.times.inf>now){segments.push("Infantry "+this._formatTime(data.times.inf));}if(data.times.siege&&data.times.siege>now){segments.push("Siege "+this._formatTime(data.times.siege));}}if(data.targets&&data.targets.length>0){data.targets.forEach(function(target){var typeText=paTweak.ui.CombatWindowExport.ORDER_TYPES[target.type]||target.type;var noteText=(target.note&&target.note.length>0)?" - "+target.note:"";segments.push(qx.lang.String.capitalize(target.target+" "+target.attack+" "+typeText)+noteText);});}return segments.join(separator);},parseData:function(text,separator){var segments=text.split(separator);var data={times:{},targets:[]};segments.forEach(function(segment){segment=paTweak.CombatTools.removeBBcode(segment).trim();var time,m;if(m=segment.match(/^magic\s+(.*)$/i)){time=paTweak.ui.CombatWindowExport._parseTime(m[1]);if(time!=null){data.times.magic=time;}return;}else{if(m=segment.match(/^infantry\s+(.*)$/i)){time=paTweak.ui.CombatWindowExport._parseTime(m[1]);if(time!=null){data.times.inf=time;}return;}else{if(m=segment.match(/^cavalry\s+(.*)$/i)){time=paTweak.ui.CombatWindowExport._parseTime(m[1]);if(time!=null){data.times.cav=time;}return;}else{if(m=segment.match(/^siege\s+(.*)$/i)){time=paTweak.ui.CombatWindowExport._parseTime(m[1]);if(time!=null){data.times.siege=time;}return;}}}}var targetMatch=segment.match(/^(\d{1,3}:\d{1,3})\s+(fake|capture|demo|attack|scout)\s+(plunder|siege|assault|scout)\b\s*(.*)$/i);if(targetMatch){var type=qx.lang.Object.getKeyFromValue(paTweak.ui.CombatWindowExport.ORDER_TYPES,targetMatch[3].toLowerCase());data.targets.push({target:targetMatch[1],attack:targetMatch[2].toLowerCase(),type:type,note:(targetMatch[4]||"").replace(/^\s*-\s*/,"")});}});if(qx.lang.Object.getValues(data.times).length<1){delete data.times;}if(data.targets.length<1){delete data.targets;}return data;}},members:{_compactCheck:null,_contentText:null,_importButton:null,_exportButton:null,_closeButton:null,buildUI:function(){var app=qx.core.Init.getApplication();this.setLayout(new qx.ui.layout.VBox(5));this.set({allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,showStatusbar:false,showClose:false,contentPadding:5,useMoveFrame:true,resizable:true});this.set({width:250,height:300});webfrontend.gui.Util.formatWinClose(this);var note=new qx.ui.basic.Label("<em>Note: Time is always in Server Time</em>");note.setRich(true);this.add(note,{flex:0});var contentText=this._contentText=new qx.ui.form.TextArea("");app.setElementModalInput(contentText);this.add(contentText,{flex:1});var compactCheck=this._compactCheck=new qx.ui.form.CheckBox("Compact");compactCheck.set({toolTipText:"Use single-line format."});compactCheck.addListener("changeValue",this.exportData,this);
			
			this.add(compactCheck,{flex:0});
			var exportButton=this._exportButton=new qx.ui.form.Button("Refresh");
			exportButton.set({width:80,toolTipText:"Generate text from the Advanced Commands window."});
			exportButton.addListener("execute",this.exportData,this);var importButton=this._importButton=new qx.ui.form.Button("Import!");
			importButton.set({width:80,toolTipText:"Import data into the dialog."});
			importButton.addListener("execute",this.importData,this);
			var closeButton=this._closeButton=new qx.ui.form.Button("Close");
			closeButton.set({width:80,toolTipText:"Closes the dialog."});
			closeButton.addListener("execute",this.hide,this);
			var buttonsRow=new qx.ui.container.Composite();
			buttonsRow.setLayout(new qx.ui.layout.HBox(5));
			buttonsRow.set({alignX:"right"});
			buttonsRow.add(exportButton);
			buttonsRow.add(importButton);
			buttonsRow.add(closeButton);
			this.add(buttonsRow,{flex:0});},exportData:function(){this._contentText.setValue("");
			var sep=this._compactCheck.getValue()?"|":"\n";
			var data=paTweak.ui.CombatWindow.getInstance().getData();
			var text=paTweak.ui.CombatWindowExport.dataToString(data,sep);
			this._contentText.setValue(text);
			this._contentText.selectAllText();
			this._contentText.focus();},importData:function(){
				var text=this._contentText.getValue();
				var data=paTweak.ui.CombatWindowExport.parseData(text,/[\n|]/);
				paTweak.ui.CombatWindow.getInstance().setData(data);
			}}});
			qx.Class.define("paTweak.ui.ExtraTools",{extend:paTweak.ui.components.LeftPanel,construct:function(title){
				this.base(arguments,title);
				this.buildUI();
			},members:{buildUI:function(){
				var row=new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
				var fillQueueButton=new qx.ui.form.Button("+");
				fillQueueButton.set({width:25,appearance:"button-text-small",toolTipText:"Click to Fill build queue"});
				fillQueueButton.addListener("execute",this.fillBuildingQueue,this);
				row.add(fillQueueButton);var payQueueButton=new qx.ui.form.Button("#");
				payQueueButton.set({width:25,appearance:"button-text-small",toolTipText:"Click to Convert all builds"});
				payQueueButton.addListener("execute",this.payBuildingQueue,this);
				row.add(payQueueButton);
				var IncomingAttacksButton=new qx.ui.form.Button("i");
				IncomingAttacksButton.set({width:25,appearance:"button-text-small",toolTipText:"Experimental incoming attack info"});
				IncomingAttacksButton.addListener("execute",this.IncomingAttacks,this);row.add(IncomingAttacksButton);
				row.add(new qx.ui.core.Widget().set({height:0}),{flex:1});
				
				this.addContent(row);
			},IncomingAttacks:function(){
				var dialog=paTweak.ui.IncomingAttacksWindow.getInstance();
				dialog.center();dialog.show();
			},fillBuildingQueue:function(){
				var activeCity=webfrontend.data.City.getInstance();webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueueFill",{cityid:activeCity.getId()},null,function(){});
			},payBuildingQueue:function(){
				var activeCity=webfrontend.data.City.getInstance();webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueuePayAll",{cityid:activeCity.getId()},null,function(){});
			},showHelp:function(){var dialog=paTweak.ui.AboutWindow.getInstance();dialog.center();dialog.show();}}});};
			
			
			function initialize(){
				if(!startup.initialized){
					startup.initialized=true;
					createTweak();
					LoUPakMap();
					paTweak.Main.getInstance().initialize();
				}
			}
			
			var startup=function(){
				if(typeof window.qx=="undefined"){
					window.setTimeout(startup,2000);
				}else{
					window.setTimeout(initialize,2000);
				}
			};
			window.setTimeout(startup,2000);
};

function paDebug(e){

	if(window.console&&typeof console.log=="function"){
		console.log(e);
	}
}

function inject(){
	paDebug("Injecting tool script");
	var script=document.createElement("script");
	txt=main.toString();
	if(window.opera!=undefined){
		txt=txt.replace(/</g,"&lt;");
	}
	script.innerHTML="("+txt+")();";
	script.type="text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);
}

if(/lordofultima\.com/i.test(document.domain)){inject();}})();