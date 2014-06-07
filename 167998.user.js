// ==UserScript==
// @name	test
// @namespace	https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include	https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @icon	http://img577.imageshack.us/img577/7893/j1vj.png
// @version	1
// @author      dark_atticus
// @description	test
// ==/UserScript==

//(1)-------------------------------Simulador----------------------------//


(function(){var r=document.createElement("script");r.innerHTML="("+function(){function r(){qx.Class.define("Simulator",{type:"singleton",extend:qx.core.Object,construct:function(){try{this.armyBar=qx.core.Init.getApplication().getArmySetupAttackBar();this.playArea=qx.core.Init.getApplication().getMainOverlay();this.replayBar=qx.core.Init.getApplication().getReportReplayOverlay();this.isSimButtonDisabled=!1;this.armyTempFormations=[];this.armyTempIdx=0;this.isSimulation=!1;this.hideArmyTooltips();
var b;this.simBtn=(new qx.ui.form.Button("","http://img18.imageshack.us/img18/2482/5gs.png")).set({toolTipText:"Simular",width:72,height:56,alignY:"middle",appearance:"button-text-small"});this.simBtn.addListener("click",function(){this.__openSimulatorWindow()},this);this.simBtn.getChildControl("icon").set({width:45,height:45,scale:!0});this.simBtn.hide();this.playArea.add(this.simBtn,{left:null,right:3,bottom:161});this.statBtn=(new qx.ui.form.Button("","http://icons.iconarchive.com/icons/yusuke-kamiyamane/fugue/16/chart-up-color-icon.png")).set({toolTipText:"Estatísticas",
width:25,height:25,alignY:"middle",appearance:"button-text-small"});this.statBtn.getChildControl("icon").set({width:15,height:15,scale:!0});this.statBtn.addListener("click",function(){this.__openStatWindow()},this);this.statBtn.hide();this.playArea.add(this.statBtn,{left:null,right:34,bottom:368});this.optionBtn=(new qx.ui.form.Button("","http://icons.iconarchive.com/icons/mcdo-design/smooth-leopard/32/Utilities-Folder-Lavender-icon.png")).set({toolTipText:"Opções",width:35,
height:45,alignY:"middle",appearance:"button-text-small"});this.optionBtn.addListener("click",function(){this.__openOptionWindow()},this);this.optionBtn.getChildControl("icon").set({width:45,height:45,scale:!0});this.optionBtn.hide();this.playArea.add(this.optionBtn,{left:null,right:3,bottom:321});this.layoutBtn=(new qx.ui.form.Button("","http://icons.iconarchive.com/icons/enhancedlabs/lha-objects/32/Floppy-icon.png")).set({toolTipText:"Guardar",width:25,height:25,alignY:"middle",appearance:"button-text-small"});
this.layoutBtn.getChildControl("icon").set({width:15,height:15,scale:!0});this.layoutBtn.addListener("click",function(){this.__openLayoutWindow()},this);this.layoutBtn.hide();this.playArea.add(this.layoutBtn,{left:null,right:3,bottom:368});this.unlockCmtBtn=(new qx.ui.form.Button("Unlock")).set({toolTipText:"Desbloquear",width:50,height:50,opacity:0.7,alignY:"middle",appearance:"button-text-small"});this.unlockCmtBtn.addListener("click",function(){this.timeoutCmtBtn()},this);this.armyBar.add(this.unlockCmtBtn,
{left:null,right:7,bottom:5});this.unlockRTBtn=(new qx.ui.form.Button("Unlock")).set({toolTipText:"Desbloquear",width:50,height:50,opacity:0.7,alignY:"middle",appearance:"button-text-small"});this.unlockRTBtn.addListener("click",function(){this.timeoutRTBtn()},this);this.armyBar.add(this.unlockRTBtn,{left:null,right:7,bottom:97});this.shiftUpBtn=(new qx.ui.form.Button("","http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-5/16/navigate-up-icon.png")).set({toolTipText:"Mover todas as unidades para cima",width:20,height:20,alignY:"middle",appearance:"button-text-small",
gap:0,iconPosition:"top",show:"icon"});this.shiftUpBtn.addListener("click",function(){this.shiftFormation("u",0)},this);this.shiftUpBtn.hide();this.playArea.add(this.shiftUpBtn,{left:null,right:13,bottom:253});this.shiftDownBtn=(new qx.ui.form.Button("","http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-5/16/navigate-down-icon.png")).set({toolTipText:"Mover todas as unidades para baixo",width:20,height:20,alignY:"middle",appearance:"button-text-small",gap:0,iconPosition:"top",show:"icon"});this.shiftDownBtn.addListener("click",function(){this.shiftFormation("d",
0)},this);this.shiftDownBtn.hide();this.playArea.add(this.shiftDownBtn,{left:null,right:13,bottom:217});this.shiftLeftBtn=(new qx.ui.form.Button("","http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-5/16/navigate-left-icon.png")).set({toolTipText:"Mover todas as unidades para a esquerda",width:20,height:20,alignY:"middle",appearance:"button-text-small",gap:0,iconPosition:"top",show:"icon"});this.shiftLeftBtn.addListener("click",function(){this.shiftFormation("l",0)},this);this.shiftLeftBtn.hide();this.playArea.add(this.shiftLeftBtn,{left:null,right:28,
bottom:235});this.shiftRightBtn=(new qx.ui.form.Button("","http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-5/16/navigate-right-icon.png")).set({toolTipText:"Mover todas as unidades para a direita",width:20,height:20,alignY:"middle",appearance:"button-text-small",gap:0,iconPosition:"top",show:"icon"});this.shiftRightBtn.addListener("click",function(){this.shiftFormation("r",0)},this);this.shiftRightBtn.hide();this.playArea.add(this.shiftRightBtn,{left:null,right:3,bottom:235});for(b=0;b<ClientLib.Base.Util.get_ArmyMaxSlotCountY();b++){var a=(new qx.ui.form.Button(b+
1,"http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-5/16/navigate-left-icon.png")).set({toolTipText:"Mover as unidades para a esquerda",width:25,maxHeight:25,alignY:"middle",show:"icon",iconPosition:"top"});a.addListener("click",function(a){this.shiftFormation("l",parseInt(a.getTarget().getLabel(),10))},this);var c=(new qx.ui.form.Button(b+1,"http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-5/16/navigate-right-icon.png")).set({toolTipText:"Mover as unidades um espaço para a direita",width:30,maxHeight:25,alignY:"middle",show:"icon",iconPosition:"top"});c.addListener("click",function(a){this.shiftFormation("r",
parseInt(a.getTarget().getLabel(),10))},this);var e=this.armyBar.getChildren()[1].getChildren()[b+4];e.removeAll();e.setLayout(new qx.ui.layout.HBox);e.add(new qx.ui.core.Spacer,{flex:1});e.add(a);e.add(c);e.add(new qx.ui.core.Spacer,{flex:1})}this.mirrorBtnH=(new qx.ui.form.Button("","http://icons.iconarchive.com/icons/fatcow/farm-fresh/16/shape-align-right-icon.png")).set({toolTipText:"Inverter",show:"icon",width:25,height:25,center:!0,alignY:"middle",appearance:"button-text-small"});this.mirrorBtnH.getChildControl("icon").set({width:15,height:15,scale:!0});
this.mirrorBtnH.addListener("click",function(){this.mirrorFormation("h")},this);this.mirrorBtnH.hide();this.playArea.add(this.mirrorBtnH,{left:null,right:3,bottom:272});this.mirrorBtnV=(new qx.ui.form.Button("","http://icons.iconarchive.com/icons/fatcow/farm-fresh/16/shape-align-bottom-icon.png")).set({toolTipText:"Espelho",show:"icon",width:25,height:25,center:!0,alignY:"middle",appearance:"button-text-small"});this.mirrorBtnV.getChildControl("icon").set({width:15,height:15,scale:!0});this.mirrorBtnV.addListener("click",function(){this.mirrorFormation("v")},
this);this.mirrorBtnV.hide();this.playArea.add(this.mirrorBtnV,{left:null,right:30,bottom:272});this.disableAllUnitsBtn=(new qx.ui.form.Button("","http://i.imgur.com/wx8hitZ.png")).set({toolTipText:"Activar/Desactivar",show:"icon",width:25,height:25,center:!0,alignY:"middle",appearance:"button-text-small"});this.disableAllUnitsBtn.getChildControl("icon").set({width:15,height:15,scale:!0});this.disableAllUnitsBtn.addListener("click",function(){this.shiftFormation("n",0)},this);this.disableAllUnitsBtn.hide();
this.playArea.add(this.disableAllUnitsBtn,{left:null,right:30,bottom:296});this.armyUndoBtn=(new qx.ui.form.Button("","FactionUI/icons/icon_refresh_funds.png")).set({toolTipText:"Voltar á formação anterior",show:"icon",width:25,height:25,center:!0,alignY:"middle",appearance:"button-text-small"});this.armyUndoBtn.getChildControl("icon").set({width:15,height:15,scale:!0});this.armyUndoBtn.addListener("click",function(){this.undoCurrentFormation()},
this);this.armyUndoBtn.setEnabled(!1);this.armyUndoBtn.hide();this.playArea.add(this.armyUndoBtn,{left:null,right:3,bottom:296});this.quickSaveBtn=(new qx.ui.form.Button("","http://www.iconattitude.com/icons/open_icon_library/actions/png/16/document-save-3.png")).set({toolTipText:"Guardar actual Formação<br>sem abrir<br>a janela de Formação",width:15,height:25,alignY:"middle",appearance:"button-text-small"});this.quickSaveBtn.getChildControl("icon").set({width:15,
height:15,scale:!0});this.quickSaveBtn.addListener("click",function(){Simulator.LayoutWindow.getInstance().saveNewLayout(!0)},this);this.quickSaveBtn.hide();this.playArea.add(this.quickSaveBtn,{left:null,right:3,bottom:136});this.backBtn=(new qx.ui.form.Button("Back")).set({toolTipText:"Voltar",width:50,height:24,appearance:"button-text-small"});this.backBtn.addListener("click",function(){this.backToCombatSetup()},this);this.replayBar.add(this.backBtn,{top:37,left:255});this.replayStatBtn=
(new qx.ui.form.Button("Stats")).set({toolTipText:"Voltar",width:50,height:24,appearance:"button-text-small"});this.replayStatBtn.addListener("click",function(){this.__openStatWindow()},this);this.replayBar.add(this.replayStatBtn,{top:7,left:255})}catch(d){console.log("Error setting up Simulator Constructor: "),console.log(d.toString())}},destruct:function(){},members:{armyBar:null,playArea:null,replayBar:null,isSimButtonDisabled:null,armyTempFormations:null,armyTempIdx:null,isSimulation:null,
simBtn:null,optionBtn:null,statBtn:null,layoutBtn:null,unlockCmtBtn:null,unlockRTBtn:null,shiftUpBtn:null,shiftDownBtn:null,shiftLeftBtn:null,shiftRightBtn:null,disableAllUnitsBtn:null,armyUndoBtn:null,quickSaveBtn:null,backBtn:null,replayStatBtn:null,__openSimulatorWindow:function(){var b=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();if(null!=b){var a=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();this.isSimulation=!0;this.saveTempFormation();localStorage.ta_sim_last_city=
b.get_Id();a.get_CityArmyFormationsManager().set_CurrentTargetBaseId(b.get_Id());ClientLib.API.Battleground.GetInstance().SimulateBattle();qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay,b.get_Id(),0,0);b=localStorage.autoSimulate;if(void 0!==b&&"yes"==b){var c=localStorage.simulateSpeed;setTimeout(function(){var a=ClientLib.Vis.VisMain.GetInstance().get_Battleground();a.RestartReplay();a.set_ReplaySpeed(parseInt(c,10))},1E3)}!1==this.isSimButtonDisabled&&
(this.disableSimulateButtonTimer(1E4),"function"===typeof Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer&&Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(1E4));setTimeout(function(){var a=ClientLib.Vis.VisMain.GetInstance().get_Battleground().get_BattleDuration(),a=phe.cnc.Util.getTimespanString(a);Simulator.StatWindow.getInstance().sim[Simulator.StatWindow.getInstance().simSelected].Label.Battle.Duration.setValue(a)},10);!1==Simulator.StatWindow.getInstance().simReplayBtn.getEnabled()&&
Simulator.StatWindow.getInstance().simReplayBtn.setEnabled(!0)}},__openOptionWindow:function(){try{Simulator.OptionWindow.getInstance().isVisible()?(console.log("Closing Option Window"),Simulator.OptionWindow.getInstance().close()):(console.log("Opening Option Window"),Simulator.OptionWindow.getInstance().open())}catch(b){console.log("Error Opening or Closing Option Window"),console.log(b.toString())}},__openStatWindow:function(){try{Simulator.StatWindow.getInstance().isVisible()?(console.log("Closing Stat Window"),
Simulator.StatWindow.getInstance().close()):(console.log("Opening Stat Window"),Simulator.StatWindow.getInstance().open(),Simulator.StatWindow.getInstance().calcResources())}catch(b){console.log("Error Opening or Closing Stat Window"),console.log(b.toString())}},__openLayoutWindow:function(){try{Simulator.LayoutWindow.getInstance().isVisible()?(console.log("Closing Layout Window"),Simulator.LayoutWindow.getInstance().close()):(console.log("Opening LayoutWindow"),Simulator.LayoutWindow.getInstance().updateLayoutList(),
Simulator.LayoutWindow.getInstance().layoutTextBox.setValue(""),Simulator.LayoutWindow.getInstance().persistentCheck.setValue(!1),Simulator.LayoutWindow.getInstance().open())}catch(b){console.log("Error Opening or Closing Layout Window"),console.log(b.toString())}},saveTempFormation:function(){try{var b=this.getCityPreArmyUnits().get_ArmyUnits().l;if(0!=this.armyTempFormations.length)for(var a=0;a<b.length;a++){var c=this.armyTempFormations[this.armyTempIdx][a];if(b[a].get_CoordX()!=c.x||b[a].get_CoordY()!=
c.y)break;else if(a+1==b.length)return}c=[];for(a=0;a<b.length;a++){var e=b[a],d={};d.x=e.get_CoordX();d.y=e.get_CoordY();d.id=e.get_Id();d.enabled=e.get_Enabled();c.push(d)}this.armyTempFormations.push(c);this.armyTempIdx=this.armyTempFormations.length-1;1<this.armyTempFormations.length&&this.armyUndoBtn.setEnabled(!0)}catch(f){console.log("Error Saving Temp Formation"),console.log(f.toString())}},undoCurrentFormation:function(){try{this.restoreFormation(this.armyTempFormations[this.armyTempIdx-
1]),this.armyTempFormations.splice(this.armyTempIdx,1),this.armyTempIdx--,1==this.armyTempFormations.length&&this.armyUndoBtn.setEnabled(!1)}catch(b){console.log("Error undoing formation"),console.log(b.toString())}},mirrorFormation:function(b){try{console.log("Shifting Unit Formation");for(var a=this.getCityPreArmyUnits().get_ArmyUnits().l,c=[],e=0;e<a.length;e++){var d=a[e],f={},h=d.get_CoordX(),g=d.get_CoordY();"h"==b&&(h=Math.abs(h-8));"v"==b&&(g=Math.abs(g-3));f.x=h;f.y=g;f.id=d.get_Id();f.enabled=
d.get_Enabled();c.push(f)}this.restoreFormation(c)}catch(k){console.log("Error Mirroring Formation"),console.log(k.toString())}},shiftFormation:function(b,a){try{console.log("Shifting Unit Formation: direction:"+b+", sel:"+a);var c=0,e=0;"u"==b&&(c=-1);"d"==b&&(c=1);"l"==b&&(e=-1);"r"==b&&(e=1);if(0!=c||0!=e||"n"==b){for(var d=this.getCityPreArmyUnits().get_ArmyUnits().l,f=[],h=0;h<d.length;h++){var g=d[h],k={},q=g.get_CoordX()+e;switch(q){case 9:q=0;break;case -1:q=8}var p=g.get_CoordY()+c;switch(p){case 4:p=
0;break;case -1:p=3}0==a||g.get_CoordX()==a-1||"u"!=b&&"d"!=b?k.y=p:k.y=g.get_CoordY();0==a||g.get_CoordY()==a-1||"l"!=b&&"r"!=b?k.x=q:k.x=g.get_CoordX();k.id=g.get_Id();"n"==b&&(k.enabled=void 0!==localStorage.allUnitsDisabled?"yes"==localStorage.allUnitsDisabled?g.set_Enabled(!0):g.set_Enabled(!1):g.set_Enabled(!1));k.enabled=g.get_Enabled();f.push(k)}"n"==b&&(localStorage.allUnitsDisabled="yes"==localStorage.allUnitsDisabled?"no":"yes");this.restoreFormation(f)}}catch(l){console.log("Error Shifting Units"),
console.log(l.toString())}},restoreFormation:function(b){try{for(var a=this.getCityPreArmyUnits(),c=a.get_ArmyUnits().l,e=0;e<b.length;e++)for(var d=b[e],f=d.id,h=0;h<c.length;h++)c[h].get_Id()===f&&(c[h].MoveBattleUnit(d.x,d.y),void 0===d.enabled?c[h].set_Enabled(!0):c[h].set_Enabled(d.enabled));a.UpdateFormation(!0)}catch(g){console.log("Error Restoring Formation"),console.log(g.toString())}},getCityPreArmyUnits:function(){var b=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(),
a=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(),c=a.get_CityArmyFormationsManager();a.get_CityArmyFormationsManager().set_CurrentTargetBaseId(b.get_Id());return c.GetFormationByTargetBaseId(c.get_CurrentTargetBaseId())},timeoutCmtBtn:function(){this.armyBar.remove(this.unlockCmtBtn);setTimeout(function(){Simulator.getInstance().armyBar.add(Simulator.getInstance().unlockCmtBtn,{left:null,right:7,bottom:5})},2E3)},timeoutRTBtn:function(){this.armyBar.remove(this.unlockRTBtn);
setTimeout(function(){Simulator.getInstance().armyBar.add(Simulator.getInstance().unlockRTBtn,{left:null,right:7,bottom:97})},2E3)},backToCombatSetup:function(){try{var b=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();null!=b&&qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense,b.get_Id(),0,0)}catch(a){console.log("Error closing Simulation Window"),console.log(a.toString())}},disableSimulateButtonTimer:function(b){try{1E3<=
b?(this.isSimButtonDisabled=!0,this.simBtn.setEnabled(!1),this.simBtn.setLabel(Math.floor(b/1E3)),b-=1E3,setTimeout(function(){Simulator.getInstance().disableSimulateButtonTimer(b)},1E3)):(setTimeout(function(){Simulator.getInstance().simBtn.setEnabled(!0);Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue()?Simulator.getInstance().simBtn.setLabel("Simulate"):Simulator.getInstance().simBtn.setLabel("S")},b),this.isSimButtonDisabled=!1)}catch(a){console.log("Error disabling simulator button"),
console.log(a.toString())}},hideArmyTooltips:function(){try{void 0===localStorage.ArmyUnitTooltipDisabled&&(localStorage.ArmyUnitTooltipDisabled="yes");for(var b in ClientLib.Vis.BaseView.BaseView.prototype)if("function"===typeof ClientLib.Vis.BaseView.BaseView.prototype[b]&&-1<ClientLib.Vis.BaseView.BaseView.prototype[b].toString().indexOf(ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip.toString())){Function("","ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip_Original = ClientLib.Vis.BaseView.BaseView.prototype."+
b)();Function("","ClientLib.Vis.BaseView.BaseView.prototype."+b+" = function (a) { if(ClientLib.Vis.VisMain.GetInstance().get_Mode()==7 && localStorage['ArmyUnitTooltipDisabled']=='yes') { return; } else { this.ShowToolTip_Original(a); } };")();break}qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original=qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility;qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility=function(a){"yes"==localStorage.ArmyUnitTooltipDisabled?
qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(!1):qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(a)}}catch(a){console.log("Error hideArmyUnitTooltips()"),console.log(a.toString())}}}});qx.Class.define("Simulator.StatWindow",{type:"singleton",extend:qx.ui.window.Window,construct:function(){try{this.base(arguments);this.set({layout:(new qx.ui.layout.VBox).set({spacing:0}),caption:"Simulator Stats",icon:"FactionUI/icons/icon_res_plinfo_command_points.png",
contentPadding:5,contentPaddingTop:0,allowMaximize:!1,showMaximize:!1,allowMinimize:!1,showMinimize:!1,resizable:!0,resizableTop:!1,resizableBottom:!1});this.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});if(void 0!==localStorage.statWindowPosLeft){var b=parseInt(localStorage.statWindowPosLeft,10),a=parseInt(localStorage.statWindowPosTop,10);this.moveTo(b,a)}else this.moveTo(124,31);this.simViews=void 0!==localStorage.simViews?parseInt(localStorage.simViews,10):2;var c=
qx.core.Init.getApplication();this.isSimStatButtonDisabled=!1;this.Battle=(new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain",allowGrowX:!0,marginLeft:0,marginRight:0});var e=(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0}),d=(new qx.ui.basic.Label("O")).set({toolTipText:c.tr("tnf:combat report"),alignX:"center",alignY:"middle"}),f=(new qx.ui.basic.Label("D")).set({toolTipText:c.tr("tnf:combat timer npc: %1",
""),alignX:"center",alignY:"middle"}),h=(new qx.ui.basic.Label("B")).set({toolTipText:c.tr("tnf:base"),alignX:"center",alignY:"middle"});e.add(d);e.add(f);e.add(h);this.Battle.add(e);this.add(this.Battle);var g=(new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"});g.add((new qx.ui.basic.Label(c.tr("tnf:combat target"))).set({alignX:"center",alignY:"middle",paddingBottom:5,font:"font_size_13_bold"}));this.add(g);this.EnemyHealth=(new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain",
allowGrowX:!0,marginLeft:0,marginRight:0});var k=(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0}),q=(new qx.ui.basic.Atom(null,"FactionUI/icons/icon_arsnl_show_all.png")).set({toolTipText:c.tr("tnf:total"),toolTipIcon:"FactionUI/icons/icon_arsnl_show_all.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),p=(new qx.ui.basic.Atom(null,"FactionUI/icons/icon_arsnl_base_buildings.png")).set({toolTipText:c.tr("tnf:base"),
toolTipIcon:"FactionUI/icons/icon_arsnl_base_buildings.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),l=(new qx.ui.basic.Atom(null,"FactionUI/icons/icon_def_army_points.png")).set({toolTipText:c.tr("tnf:defense"),toolTipIcon:"FactionUI/icons/icon_def_army_points.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),m=(new qx.ui.basic.Label("CY")).set({toolTipText:GAMEDATA.Tech[1].dn,alignX:"center",alignY:"middle"}),n=(new qx.ui.basic.Label("DF")).set({toolTipText:GAMEDATA.Tech[42].dn,
alignX:"center",alignY:"middle"}),t=(new qx.ui.basic.Label("CC")).set({toolTipText:GAMEDATA.Tech[24].dn,alignX:"center",alignY:"middle"});q.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});p.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});l.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});k.add(q);k.add(p);k.add(l);k.add(m);k.add(n);k.add(t);this.EnemyHealth.add(k);this.add(this.EnemyHealth);var x=(new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"});
x.add((new qx.ui.basic.Label(c.tr("tnf:own repair cost"))).set({alignX:"center",alignY:"middle",paddingBottom:5,font:"font_size_13_bold"}));this.add(x);this.Repair=(new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain",allowGrowX:!0,marginLeft:0,marginRight:0});var s=(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0}),E=(new qx.ui.basic.Atom(null,"webfrontend/ui/icons/icn_repair_points.png")).set({toolTipText:c.tr("tnf:offense repair time"),
toolTipIcon:"webfrontend/ui/icons/icn_repair_points.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),u=(new qx.ui.basic.Atom(null,"webfrontend/ui/icons/icn_repair_off_points.png")).set({toolTipText:c.tr("tnf:repair points"),toolTipIcon:"webfrontend/ui/icons/icn_repair_off_points.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),y=(new qx.ui.basic.Atom(null,"webfrontend/ui/icons/icon_res_repair_inf.png")).set({toolTipText:c.tr("tnf:infantry repair title"),toolTipIcon:"webfrontend/ui/icons/icon_res_repair_inf.png",
alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),F=(new qx.ui.basic.Atom(null,"webfrontend/ui/icons/icon_res_repair_tnk.png")).set({toolTipText:c.tr("tnf:vehicle repair title"),toolTipIcon:"webfrontend/ui/icons/icon_res_repair_tnk.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),z=(new qx.ui.basic.Atom(null,"webfrontend/ui/icons/icon_res_repair_air.png")).set({toolTipText:c.tr("tnf:aircraft repair title"),toolTipIcon:"webfrontend/ui/icons/icon_res_repair_air.png",alignX:"center",
alignY:"middle",gap:0,iconPosition:"top"});E.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});u.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});y.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});F.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});z.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});s.add(E);s.add(u);s.add(y);s.add(F);s.add(z);this.Repair.add(s);this.add(this.Repair);
var A=(new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"});A.add((new qx.ui.basic.Label(c.tr("tnf:lootable resources:"))).set({alignX:"center",alignY:"middle",paddingBottom:5,font:"font_size_13_bold"}));this.add(A);this.Loot=(new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain",allowGrowX:!0,marginLeft:0,marginRight:0});var v=(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29,padding:5,allowGrowX:!0,
marginLeft:0,marginRight:0}),r=(new qx.ui.basic.Atom(null,"webfrontend/ui/common/icn_res_tiberium.png")).set({toolTipText:c.tr("tnf:tiberium"),toolTipIcon:"webfrontend/ui/common/icn_res_tiberium.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),B=(new qx.ui.basic.Atom(null,"webfrontend/ui/common/icn_res_chrystal.png")).set({toolTipText:c.tr("tnf:crystals"),toolTipIcon:"webfrontend/ui/common/icn_res_chrystal.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),w=(new qx.ui.basic.Atom(null,
"webfrontend/ui/common/icn_res_dollar.png")).set({toolTipText:c.tr("tnf:credits"),toolTipIcon:"webfrontend/ui/common/icn_res_dollar.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),G=(new qx.ui.basic.Atom(null,"webfrontend/ui/common/icn_res_research_mission.png")).set({toolTipText:c.tr("tnf:research points"),toolTipIcon:"webfrontend/ui/common/icn_res_research_mission.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"}),H=(new qx.ui.basic.Atom(null,"FactionUI/icons/icon_transfer_resource.png")).set({toolTipText:c.tr("tnf:total")+
" "+c.tr("tnf:loot"),toolTipIcon:"FactionUI/icons/icon_transfer_resource.png",alignX:"center",alignY:"middle",gap:0,iconPosition:"top"});r.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});B.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});w.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});G.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});H.getChildControl("icon").set({width:18,height:18,scale:!0,
alignY:"middle"});v.add(r);v.add(B);v.add(w);v.add(G);v.add(H);this.Loot.add(v);this.add(this.Loot);var D=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({decorator:"pane-light-opaque",allowGrowX:!0,marginLeft:0,marginRight:0,padding:5});this.add(D);this.simStatBtn=(new qx.ui.form.Button(c.tr("tnf:update"))).set({allowGrowX:!1});this.simStatBtn.setToolTipText("Updates Simulation Stats");this.simStatBtn.addListener("click",this.simulateStats,this);this.simReplayBtn=(new qx.ui.form.Button(c.tr("tnf:show combat"))).set({allowGrowX:!1});
this.simReplayBtn.setToolTipText(c.tr("tnf:show battle replay"));this.simReplayBtn.addListener("click",this.doSimReplay,this);this.simReplayBtn.setEnabled(!1);D.add(this.simStatBtn,{width:"50%"});D.add(this.simReplayBtn,{width:"50%"});g.addListener("click",function(){this.EnemyHealth.isVisible()?this.EnemyHealth.exclude():this.EnemyHealth.show()},this);x.addListener("click",function(){this.Repair.isVisible()?this.Repair.exclude():this.Repair.show()},this);A.addListener("click",function(){this.Loot.isVisible()?
this.Loot.exclude():this.Loot.show()},this);void 0!==localStorage.hideHealth&&"yes"==localStorage.hideHealth&&this.EnemyHealth.exclude();void 0!==localStorage.hideRepair&&"yes"==localStorage.hideRepair&&this.Repair.exclude();void 0!==localStorage.hideLoot&&"yes"==localStorage.hideLoot&&this.Loot.exclude();for(b=0;b<this.simViews;b++)this.sim[b]=new this.Simulation(b),this.sim[b].Select(this.simSelected),this.Battle.add(this.sim[b].Label.Battle.container,{flex:1}),this.EnemyHealth.add(this.sim[b].Label.EnemyHealth.container,
{flex:1}),this.Repair.add(this.sim[b].Label.Repair.container,{flex:1}),this.Loot.add(this.sim[b].Label.Loot.container,{flex:1});phe.cnc.Util.attachNetEvent(ClientLib.API.Battleground.GetInstance(),"OnSimulateBattleFinished",ClientLib.API.OnSimulateBattleFinished,this,this.__OnSimulateBattleFinished);phe.cnc.base.Timer.getInstance().addListener("uiTick",this._onTick,this)}catch(C){console.log("Error setting up Simulator.StatWindow Constructor: "),console.log(C.toString())}},destruct:function(){},members:{Battle:null,
EnemyHealth:null,Repair:null,Loot:null,simStatBtn:null,simReplayBtn:null,isSimStatButtonDisabled:null,simSelected:0,simViews:3,sim:[],Simulation:function(b){try{var a=!1,c=this.OwnCity=this.TargetCity=null,e=null;this.Label={Battle:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0,decorator:"pane-light-opaque"}),Outcome:(new qx.ui.basic.Atom("-",null)).set({alignX:"center",alignY:"middle",gap:0,iconPosition:"top",show:"label"}),
Duration:(new qx.ui.basic.Label("-:--")).set({alignX:"center",alignY:"middle"}),OwnCity:(new qx.ui.basic.Label("-")).set({alignX:"center",alignY:"middle"})},EnemyHealth:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0,decorator:"pane-light-opaque"}),Overall:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Base:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Defense:(new qx.ui.basic.Label("-")).set({alignX:"right",
alignY:"middle"}),CY:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),DF:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),CC:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"})},Repair:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0,decorator:"pane-light-opaque"}),Storage:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Overall:(new qx.ui.basic.Label("-")).set({alignX:"right",
alignY:"middle"}),Inf:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Vehi:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Air:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"})},Loot:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65,padding:5,allowGrowX:!0,marginLeft:0,marginRight:0,decorator:"pane-light-opaque"}),Tib:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Cry:(new qx.ui.basic.Label("-")).set({alignX:"right",
alignY:"middle"}),Cred:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),RP:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"}),Overall:(new qx.ui.basic.Label("-")).set({alignX:"right",alignY:"middle"})}};var d=function(){this.RT=this.Cry=this.Tib=this.MaxHealth=this.EndHealth=this.StartHealth=0;this.getHP=function(){return 0==this.EndHealth&&0==this.StartHealth?0:0==this.MaxHealth?100:100*(this.EndHealth/this.MaxHealth)};this.getHPrel=function(){return 0==this.StartHealth?
0:0==this.MaxHealth?-100:-100*((this.StartHealth-this.EndHealth)/this.MaxHealth)}},f=function(){this.Battle=this.Base=0};this.Stats={Battle:{Outcome:0,Duration:0,OwnCity:""},EnemyHealth:{Overall:new d,Base:new d,Defense:new d,CY:new d,DF:new d,CC:new d},Repair:{Storage:0,Overall:new d,Inf:new d,Vehi:new d,Air:new d},Loot:{Tib:new f,Cry:new f,Cred:new f,RP:new f,Overall:new f}};this.setSimulation=function(b){a=!0;this.TargetCity=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
this.OwnCity=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();this.Stats.Battle.OwnCity=this.OwnCity.get_Name();this.saveFormation();e=[];for(var c=0;c<b.length;c++)e.push(b[c].Value)};this.UpdateLabels=function(){var b=qx.core.Init.getApplication(),c=function(a){return phe.cnc.Util.getTimespanString(a)},d=function(a,b){25>b?a.setTextColor("red"):75>b?a.setTextColor("orangered"):a.setTextColor("darkgreen")},e=function(a,b){25>b?a.setTextColor("darkgreen"):75>b?a.setTextColor("orangered"):
a.setTextColor("red")};if(a){switch(this.Stats.Battle.Outcome){case 1:this.Label.Battle.Outcome.resetLabel();this.Label.Battle.Outcome.set({show:"icon"});this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_defeat.png");this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_defeat.png");this.Label.Battle.Outcome.setToolTipText(b.tr("tnf:total defeat"));break;case 2:this.Label.Battle.Outcome.resetLabel();this.Label.Battle.Outcome.set({show:"icon"});this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_victory.png");
this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_victory.png");this.Label.Battle.Outcome.setToolTipText(b.tr("tnf:victory"));break;case 3:this.Label.Battle.Outcome.resetLabel(),this.Label.Battle.Outcome.set({show:"icon"}),this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_victory.png"),this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_victory.png"),this.Label.Battle.Outcome.setToolTipText(b.tr("tnf:total victory"))}this.Label.Battle.Duration.setValue(c(this.Stats.Battle.Duration/
1E3));null!=this.OwnCity&&(this.Stats.Battle.OwnCity=this.OwnCity.get_Name());this.Label.Battle.OwnCity.setValue(this.Stats.Battle.OwnCity);switch(localStorage.getEHSelection){case "hp rel":this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHPrel().toFixed(2)+"%");this.Label.EnemyHealth.Overall.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.Overall.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib)+
"<br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry));this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHPrel().toFixed(2)+"%");this.Label.EnemyHealth.Base.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.Base.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib));this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHPrel().toFixed(2)+
"%");this.Label.EnemyHealth.Defense.setToolTipText(b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib)+"<br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry));this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHPrel().toFixed(2)+"%");this.Label.EnemyHealth.CY.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.CY.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib));
this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHPrel().toFixed(2)+"%");this.Label.EnemyHealth.DF.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.DF.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib));this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHPrel().toFixed(2)+"%");this.Label.EnemyHealth.CC.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.CC.RT)+"<br>"+
b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib));break;default:this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHP().toFixed(2)+"%"),this.Label.EnemyHealth.Overall.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.Overall.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib)+"<br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry)),
this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHP().toFixed(2)+"%"),this.Label.EnemyHealth.Base.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.Base.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib)),this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHP().toFixed(2)+"%"),this.Label.EnemyHealth.Defense.setToolTipText(b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib)+
"<br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry)),this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHP().toFixed(2)+"%"),this.Label.EnemyHealth.CY.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.CY.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib)),this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHP().toFixed(2)+"%"),
this.Label.EnemyHealth.DF.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.DF.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib)),this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHP().toFixed(2)+"%"),this.Label.EnemyHealth.CC.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.EnemyHealth.CC.RT)+"<br>"+b.tr("tnf:tiberium")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib))}e(this.Label.EnemyHealth.Overall,
this.Stats.EnemyHealth.Overall.getHP());e(this.Label.EnemyHealth.Base,this.Stats.EnemyHealth.Base.getHP());e(this.Label.EnemyHealth.Defense,this.Stats.EnemyHealth.Defense.getHP());e(this.Label.EnemyHealth.CY,this.Stats.EnemyHealth.CY.getHP());e(this.Label.EnemyHealth.DF,this.Stats.EnemyHealth.DF.getHP());e(this.Label.EnemyHealth.CC,this.Stats.EnemyHealth.CC.getHP());null!=this.OwnCity&&(this.Stats.Repair.Storage=Math.min(this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir)));this.Label.Repair.Storage.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(this.Stats.Repair.Storage)));this.Label.Repair.Storage.setTextColor(this.Stats.Repair.Storage>this.Stats.Repair.Overall.RT?"darkgreen":"red");switch(localStorage.getRTSelection){case "cry":this.Label.Repair.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));
this.Label.Repair.Overall.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Overall.RT)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Overall.getHP().toFixed(2)+"%");this.Label.Repair.Inf.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));this.Label.Repair.Inf.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Inf.RT)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Inf.getHP().toFixed(2)+"%");this.Label.Repair.Vehi.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));
this.Label.Repair.Vehi.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Vehi.RT)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Vehi.getHP().toFixed(2)+"%");this.Label.Repair.Air.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));this.Label.Repair.Air.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Air.RT)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Air.getHP().toFixed(2)+"%");break;case "hp":this.Label.Repair.Overall.setValue(this.Stats.Repair.Overall.getHP().toFixed(2)+
"%");this.Label.Repair.Overall.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Overall.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHP().toFixed(2)+"%");this.Label.Repair.Inf.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Inf.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));
this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHP().toFixed(2)+"%");this.Label.Repair.Vehi.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Vehi.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHP().toFixed(2)+"%");this.Label.Repair.Air.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Air.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));
break;case "hp rel":this.Label.Repair.Overall.setValue(this.Stats.Repair.Overall.getHPrel().toFixed(2)+"%");this.Label.Repair.Overall.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Overall.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHPrel().toFixed(2)+"%");this.Label.Repair.Inf.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Inf.RT)+"</br>"+
b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHPrel().toFixed(2)+"%");this.Label.Repair.Vehi.setToolTipText(b.tr("tnf:repair points")+": "+c(this.Stats.Repair.Vehi.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHPrel().toFixed(2)+"%");this.Label.Repair.Air.setToolTipText(b.tr("tnf:repair points")+
": "+c(this.Stats.Repair.Air.RT)+"</br>"+b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));break;default:this.Label.Repair.Overall.setValue(c(this.Stats.Repair.Overall.RT)),this.Label.Repair.Overall.setToolTipText(b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Overall.getHP().toFixed(2)+"%"),this.Label.Repair.Inf.setValue(c(this.Stats.Repair.Inf.RT)),
this.Label.Repair.Inf.setToolTipText(b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Inf.getHP().toFixed(2)+"%"),this.Label.Repair.Vehi.setValue(c(this.Stats.Repair.Vehi.RT)),this.Label.Repair.Vehi.setToolTipText(b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Vehi.getHP().toFixed(2)+"%"),this.Label.Repair.Air.setValue(c(this.Stats.Repair.Air.RT)),
this.Label.Repair.Air.setToolTipText(b.tr("tnf:crystals")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry)+"</br>"+b.tr("tnf:health")+": "+this.Stats.Repair.Air.getHP().toFixed(2)+"%")}d(this.Label.Repair.Overall,this.Stats.Repair.Overall.getHP());d(this.Label.Repair.Inf,this.Stats.Repair.Inf.getHP());this.Stats.Repair.Inf.RT===this.Stats.Repair.Overall.RT&&100>this.Stats.Repair.Inf.getHP()&&this.Label.Repair.Inf.setTextColor("black");d(this.Label.Repair.Vehi,this.Stats.Repair.Vehi.getHP());
this.Stats.Repair.Vehi.RT===this.Stats.Repair.Overall.RT&&100>this.Stats.Repair.Vehi.getHP()&&this.Label.Repair.Vehi.setTextColor("black");d(this.Label.Repair.Air,this.Stats.Repair.Air.getHP());this.Stats.Repair.Air.RT===this.Stats.Repair.Overall.RT&&100>this.Stats.Repair.Air.getHP()&&this.Label.Repair.Air.setTextColor("black");this.Label.Loot.Tib.setToolTipText((100*(this.Stats.Loot.Tib.Battle/this.Stats.Loot.Tib.Base)).toFixed(2)+"%<br>"+b.tr("tnf:base")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base));
this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Battle));this.Label.Loot.Cry.setToolTipText((100*(this.Stats.Loot.Cry.Battle/this.Stats.Loot.Cry.Base)).toFixed(2)+"%<br>"+b.tr("tnf:base")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base));this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Battle));this.Label.Loot.Cred.setToolTipText((100*(this.Stats.Loot.Cred.Battle/this.Stats.Loot.Cred.Base)).toFixed(2)+
"%<br>"+b.tr("tnf:base")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base));this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Battle));this.Label.Loot.RP.setToolTipText((100*(this.Stats.Loot.RP.Battle/this.Stats.Loot.RP.Base)).toFixed(2)+"%<br>"+b.tr("tnf:base")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base));this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Battle));
this.Label.Loot.Overall.setToolTipText((100*(this.Stats.Loot.Overall.Battle/this.Stats.Loot.Overall.Base)).toFixed(2)+"%<br>"+b.tr("tnf:base")+": "+phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base));this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Battle))}else if(0<this.Stats.Loot.Tib.Base||0<this.Stats.Loot.Cry.Base||0<this.Stats.Loot.Cred.Base||0<this.Stats.Loot.RP.Base||0<this.Stats.Loot.Overall.Base)this.Label.Loot.Tib.resetToolTipText(),
this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base)),this.Label.Loot.Cry.resetToolTipText(),this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base)),this.Label.Loot.Cred.resetToolTipText(),this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base)),this.Label.Loot.RP.resetToolTipText(),this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base)),
this.Label.Loot.Overall.resetToolTipText(),this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base))};this.ResetStats=function(){this.Stats.Battle.Outcome=0;this.Stats.Battle.Duration=0;this.Stats.Battle.OwnCity="";this.Stats.EnemyHealth.Overall=new d;this.Stats.EnemyHealth.Base=new d;this.Stats.EnemyHealth.Defense=new d;this.Stats.EnemyHealth.CY=new d;this.Stats.EnemyHealth.DF=new d;this.Stats.EnemyHealth.CC=new d;this.Stats.Repair.Storage=0;this.Stats.Repair.Overall=
new d;this.Stats.Repair.Inf=new d;this.Stats.Repair.Vehi=new d;this.Stats.Repair.Air=new d;this.Stats.Loot.Tib.Battle=0;this.Stats.Loot.Cry.Battle=0;this.Stats.Loot.Cred.Battle=0;this.Stats.Loot.RP.Battle=0;this.Stats.Loot.Overall.Battle=0};this.ResetLabels=function(){this.Label.Battle.Outcome.resetIcon();this.Label.Battle.Outcome.resetToolTipIcon();this.Label.Battle.Outcome.resetToolTipText();this.Label.Battle.Outcome.setShow("label");this.Label.Battle.Outcome.setLabel("-");this.Label.Battle.Duration.setValue("-:--");
this.Label.Battle.OwnCity.setValue("-");this.Label.EnemyHealth.Overall.setValue("-");this.Label.EnemyHealth.Overall.resetToolTipText();this.Label.EnemyHealth.Overall.resetTextColor();this.Label.EnemyHealth.Base.setValue("-");this.Label.EnemyHealth.Base.resetToolTipText();this.Label.EnemyHealth.Base.resetTextColor();this.Label.EnemyHealth.Defense.setValue("-");this.Label.EnemyHealth.Defense.resetToolTipText();this.Label.EnemyHealth.Defense.resetTextColor();this.Label.EnemyHealth.CY.setValue("-");this.Label.EnemyHealth.CY.resetToolTipText();
this.Label.EnemyHealth.CY.resetTextColor();this.Label.EnemyHealth.DF.setValue("-");this.Label.EnemyHealth.DF.resetToolTipText();this.Label.EnemyHealth.DF.resetTextColor();this.Label.EnemyHealth.CC.setValue("-");this.Label.EnemyHealth.CC.resetToolTipText();this.Label.EnemyHealth.CC.resetTextColor();this.Label.Repair.Storage.setValue("-");this.Label.Repair.Storage.resetToolTipText();this.Label.Repair.Storage.resetTextColor();this.Label.Repair.Overall.setValue("-");this.Label.Repair.Overall.resetToolTipText();
this.Label.Repair.Overall.resetTextColor();this.Label.Repair.Inf.setValue("-");this.Label.Repair.Inf.resetToolTipText();this.Label.Repair.Inf.resetTextColor();this.Label.Repair.Vehi.setValue("-");this.Label.Repair.Vehi.resetToolTipText();this.Label.Repair.Vehi.resetTextColor();this.Label.Repair.Air.setValue("-");this.Label.Repair.Air.resetToolTipText();this.Label.Repair.Air.resetTextColor();this.Label.Loot.Tib.setValue("-");this.Label.Loot.Tib.resetToolTipText();this.Label.Loot.Tib.resetTextColor();
this.Label.Loot.Cry.setValue("-");this.Label.Loot.Cry.resetToolTipText();this.Label.Loot.Cry.resetTextColor();this.Label.Loot.Cred.setValue("-");this.Label.Loot.Cred.resetToolTipText();this.Label.Loot.Cred.resetTextColor();this.Label.Loot.RP.setValue("-");this.Label.Loot.RP.resetToolTipText();this.Label.Loot.RP.resetTextColor();this.Label.Loot.Overall.setValue("-");this.Label.Loot.Overall.resetToolTipText();this.Label.Loot.Overall.resetTextColor()};this.Reset=function(){var b=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
if(null===this.TargetCity||b.get_CityArmyFormationsManager().get_CurrentTargetBaseId()!=this.TargetCity.get_Id())a=!1,this.OwnCity=this.TargetCity=null,this.ResetStats(),this.Stats.Loot.Tib.Base=0,this.Stats.Loot.Cry.Base=0,this.Stats.Loot.Cred.Base=0,this.Stats.Loot.RP.Base=0,this.Stats.Loot.Overall.Base=0,this.ResetLabels()};this.Select=function(a){if(a==b){a="pane-light-opaque";var c=1}else a="pane-light-plain",c=0.6;this.Label.Battle.container.set({decorator:a,opacity:c});this.Label.EnemyHealth.container.set({decorator:a,
opacity:c});this.Label.Repair.container.set({decorator:a,opacity:c});this.Label.Loot.container.set({decorator:a,opacity:c})};this.saveFormation=function(){try{c=[];for(var a=Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l,b=0;b<a.length;b++){var d=a[b],e={};e.x=d.get_CoordX();e.y=d.get_CoordY();e.id=d.get_Id();e.enabled=d.get_Enabled();c.push(e)}}catch(f){console.log("Error Saving Stat Formation"),console.log(f.toString())}};this.loadFormation=function(){try{ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId(this.OwnCity.get_Id()),
Simulator.getInstance().restoreFormation(c)}catch(a){console.log("Error loading Stat Formation"),console.log(a.toString())}};this.Label.Battle.Outcome.getChildControl("icon").set({width:18,height:18,scale:!0,alignY:"middle"});this.Label.Battle.container.add(this.Label.Battle.Outcome);this.Label.Battle.container.add(this.Label.Battle.Duration);this.Label.Battle.container.add(this.Label.Battle.OwnCity);this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Overall);this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Base);
this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Defense);this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CY);this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.DF);this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CC);this.Label.Repair.container.add(this.Label.Repair.Storage);this.Label.Repair.container.add(this.Label.Repair.Overall);this.Label.Repair.container.add(this.Label.Repair.Inf);this.Label.Repair.container.add(this.Label.Repair.Vehi);this.Label.Repair.container.add(this.Label.Repair.Air);
this.Label.Loot.container.add(this.Label.Loot.Tib);this.Label.Loot.container.add(this.Label.Loot.Cry);this.Label.Loot.container.add(this.Label.Loot.Cred);this.Label.Loot.container.add(this.Label.Loot.RP);this.Label.Loot.container.add(this.Label.Loot.Overall);this.Label.Battle.container.addListener("click",function(){Simulator.StatWindow.getInstance().simSelected=b;for(var a=0;a<Simulator.StatWindow.getInstance().sim.length;a++)Simulator.StatWindow.getInstance().sim[a].Select(b)},this);this.Label.EnemyHealth.container.addListener("click",
function(){Simulator.StatWindow.getInstance().simSelected=b;for(var a=0;a<Simulator.StatWindow.getInstance().sim.length;a++)Simulator.StatWindow.getInstance().sim[a].Select(b)},this);this.Label.Repair.container.addListener("click",function(){Simulator.StatWindow.getInstance().simSelected=b;for(var a=0;a<Simulator.StatWindow.getInstance().sim.length;a++)Simulator.StatWindow.getInstance().sim[a].Select(b)},this);this.Label.Loot.container.addListener("click",function(){Simulator.StatWindow.getInstance().simSelected=
b;for(var a=0;a<Simulator.StatWindow.getInstance().sim.length;a++)Simulator.StatWindow.getInstance().sim[a].Select(b)},this);this.Label.Battle.container.addListener("dblclick",function(){this.loadFormation()},this);this.Label.EnemyHealth.container.addListener("dblclick",function(){this.loadFormation()},this);this.Label.Repair.container.addListener("dblclick",function(){this.loadFormation()},this);this.Label.Loot.container.addListener("dblclick",function(){this.loadFormation()},this);this.Label.EnemyHealth.container.addListener("contextmenu",
function(){localStorage.getEHSelection="hp rel"==localStorage.getEHSelection?"hp":"hp rel"},this);this.Label.Repair.container.addListener("contextmenu",function(){localStorage.getRTSelection="cry"==localStorage.getRTSelection?"rt":"hp"==localStorage.getRTSelection?"hp rel":"hp rel"==localStorage.getRTSelection?"cry":"hp"},this)}catch(h){console.log("Error init Simulation"),console.log(h.toString())}},simulateStats:function(){console.log("Simulating Stats");var b=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
null!=b&&(Simulator.getInstance().isSimulation=!0,Simulator.getInstance().saveTempFormation(),localStorage.ta_sim_last_city=b.get_Id(),ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_CityArmyFormationsManager().set_CurrentTargetBaseId(b.get_Id()),ClientLib.API.Battleground.GetInstance().SimulateBattle())},doSimReplay:function(){try{if(Simulator.getInstance().isSimulation=!0,qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay,
localStorage.ta_sim_last_city,0,0),void 0!==localStorage.autoSimulate&&"yes"==localStorage.autoSimulate){var b=localStorage.simulateSpeed;setTimeout(function(){var a=ClientLib.Vis.VisMain.GetInstance().get_Battleground();a.RestartReplay();a.set_ReplaySpeed(parseInt(b,10))},1E3)}}catch(a){console.log("Error attempting to show Simulation Replay"),console.log(a.toString())}},calculateRepairCosts:function(b,a,c,e,d){var f={RT:0,Cry:0,Tib:0};if(c!=e)for(b=ClientLib.API.Util.GetUnitRepairCosts(a,b,(c-e)/
d),a=0;a<b.length;a++)switch(c=b[a],parseInt(c.Type,10)){case ClientLib.Base.EResourceType.Tiberium:f.Tib+=c.Count;break;case ClientLib.Base.EResourceType.Crystal:f.Cry+=c.Count;break;case ClientLib.Base.EResourceType.RepairChargeBase:case ClientLib.Base.EResourceType.RepairChargeInf:case ClientLib.Base.EResourceType.RepairChargeVeh:case ClientLib.Base.EResourceType.RepairChargeAir:f.RT+=c.Count}return f},_onTick:function(){for(var b=0;b<this.sim.length;b++)this.sim[b].UpdateLabels()},__OnSimulateBattleFinished:function(b){!1==
this.isSimStatButtonDisabled&&(this.disableSimulateStatButtonTimer(1E4),"function"===typeof Simulator.getInstance().disableSimulateButtonTimer&&Simulator.getInstance().disableSimulateButtonTimer(1E4));!1==this.simReplayBtn.getEnabled()&&this.simReplayBtn.setEnabled(!0);this.getSimulationInfo(b,this.sim[this.simSelected]);this.sim[this.simSelected].setSimulation(b)},getSimulationInfo:function(b,a){console.log("Getting Player Unit Damage");try{a.ResetStats();for(var c={},e=[],d=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(),
f=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(),h=d.get_CityFaction(),d=0;d<b.length;d++){var g=b[d].Value,k=g.t,q=ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(k),p=g.l,l=Math.floor(g.sh),m=Math.floor(g.h),n=Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(p,q,!1)),t=q.pt,x=q.mt;e.push(g);switch(h){case ClientLib.Base.EFactionType.GDIFaction:case ClientLib.Base.EFactionType.NODFaction:switch(t){case ClientLib.Base.EPlacementType.Defense:case ClientLib.Base.EPlacementType.Structure:n=
Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(p,q,!0))}}c=this.calculateRepairCosts(k,p,l,m,n);switch(t){case ClientLib.Base.EPlacementType.Defense:a.Stats.EnemyHealth.Overall.StartHealth+=l;a.Stats.EnemyHealth.Overall.EndHealth+=m;a.Stats.EnemyHealth.Overall.MaxHealth+=n;a.Stats.EnemyHealth.Overall.Tib+=c.Tib;a.Stats.EnemyHealth.Overall.Cry+=c.Cry;a.Stats.EnemyHealth.Defense.StartHealth+=l;a.Stats.EnemyHealth.Defense.EndHealth+=m;a.Stats.EnemyHealth.Defense.MaxHealth+=n;a.Stats.EnemyHealth.Defense.Tib+=
c.Tib;a.Stats.EnemyHealth.Defense.Cry+=c.Cry;break;case ClientLib.Base.EPlacementType.Offense:a.Stats.Repair.Overall.StartHealth+=l;a.Stats.Repair.Overall.EndHealth+=m;a.Stats.Repair.Overall.MaxHealth+=n;a.Stats.Repair.Overall.Tib+=c.Tib;a.Stats.Repair.Overall.Cry+=c.Cry;switch(x){case ClientLib.Base.EUnitMovementType.Feet:a.Stats.Repair.Inf.StartHealth+=l;a.Stats.Repair.Inf.EndHealth+=m;a.Stats.Repair.Inf.MaxHealth+=n;a.Stats.Repair.Inf.RT+=c.RT;a.Stats.Repair.Inf.Tib+=c.Tib;a.Stats.Repair.Inf.Cry+=
c.Cry;break;case ClientLib.Base.EUnitMovementType.Wheel:case ClientLib.Base.EUnitMovementType.Track:a.Stats.Repair.Vehi.StartHealth+=l;a.Stats.Repair.Vehi.EndHealth+=m;a.Stats.Repair.Vehi.MaxHealth+=n;a.Stats.Repair.Vehi.RT+=c.RT;a.Stats.Repair.Vehi.Tib+=c.Tib;a.Stats.Repair.Vehi.Cry+=c.Cry;break;case ClientLib.Base.EUnitMovementType.Air:case ClientLib.Base.EUnitMovementType.Air2:a.Stats.Repair.Air.StartHealth+=l,a.Stats.Repair.Air.EndHealth+=m,a.Stats.Repair.Air.MaxHealth+=n,a.Stats.Repair.Air.RT+=
c.RT,a.Stats.Repair.Air.Tib+=c.Tib,a.Stats.Repair.Air.Cry+=c.Cry}break;case ClientLib.Base.EPlacementType.Structure:switch(a.Stats.EnemyHealth.Overall.StartHealth+=l,a.Stats.EnemyHealth.Overall.EndHealth+=m,a.Stats.EnemyHealth.Overall.MaxHealth+=n,a.Stats.EnemyHealth.Overall.RT+=c.RT,a.Stats.EnemyHealth.Overall.Tib+=c.Tib,a.Stats.EnemyHealth.Overall.Cry+=c.Cry,a.Stats.EnemyHealth.Base.StartHealth+=l,a.Stats.EnemyHealth.Base.EndHealth+=m,a.Stats.EnemyHealth.Base.MaxHealth+=n,a.Stats.EnemyHealth.Base.RT+=
c.RT,a.Stats.EnemyHealth.Base.Tib+=c.Tib,a.Stats.EnemyHealth.Base.Cry+=c.Cry,k){case 112:case 151:case 177:case 233:a.Stats.EnemyHealth.CY.StartHealth+=l;a.Stats.EnemyHealth.CY.EndHealth+=m;a.Stats.EnemyHealth.CY.MaxHealth+=n;a.Stats.EnemyHealth.CY.RT+=c.RT;a.Stats.EnemyHealth.CY.Tib+=c.Tib;a.Stats.EnemyHealth.CY.Cry+=c.Cry;break;case 131:case 158:case 195:a.Stats.EnemyHealth.DF.StartHealth+=l;a.Stats.EnemyHealth.DF.EndHealth+=m;a.Stats.EnemyHealth.DF.MaxHealth+=n;a.Stats.EnemyHealth.DF.RT+=c.RT;
a.Stats.EnemyHealth.DF.Tib+=c.Tib;a.Stats.EnemyHealth.DF.Cry+=c.Cry;break;case 111:case 159:a.Stats.EnemyHealth.CC.StartHealth+=l,a.Stats.EnemyHealth.CC.EndHealth+=m,a.Stats.EnemyHealth.CC.MaxHealth+=n,a.Stats.EnemyHealth.CC.RT+=c.RT,a.Stats.EnemyHealth.CC.Tib+=c.Tib,a.Stats.EnemyHealth.CC.Cry+=c.Cry}}}a.Stats.Repair.Overall.RT=Math.max(a.Stats.Repair.Inf.RT,a.Stats.Repair.Vehi.RT,a.Stats.Repair.Air.RT);a.Stats.Battle.Outcome=0===a.Stats.Repair.Overall.EndHealth?1:0===a.Stats.EnemyHealth.CY.EndHealth?
3:2;a.Stats.Repair.Storage=Math.min(f.GetResourceCount(8),f.GetResourceCount(9),f.GetResourceCount(10));this.calcResources(e,a);setTimeout(function(){var a=ClientLib.Vis.VisMain.GetInstance().get_Battleground();Simulator.StatWindow.getInstance().sim[Simulator.StatWindow.getInstance().simSelected].Stats.Battle.Duration=a.get_BattleDuration()},1)}catch(s){console.log("Error Getting Player Unit Damage"),console.log(s.toString())}},calcResources:function(b,a){try{var c=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_CityFaction(),
e={1:0,2:0,3:0,6:0},d,f,h,g=-1,k=-1;for(f=0;9>f;f++)for(h=0;8>h;h++){var q=ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth(),p=ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight(),l=ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(f*q,h*p);if(null!==l&&"function"===typeof l.get_BuildingName){try{if(void 0!==b)for(d=0;d<b.length;d++){var m=b[d],n=ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(m.t);if(n.dn==l.get_BuildingName()){var t=Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(m.l,
n,!1));switch(c){case ClientLib.Base.EFactionType.GDIFaction:case ClientLib.Base.EFactionType.NODFaction:switch(n.pt){case ClientLib.Base.EPlacementType.Defense:case ClientLib.Base.EPlacementType.Structure:t=Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(m.l,n,!0))}}g=(m.sh-m.h)/t;"Harvester"==n.dn&&(k=l.get_BuildingDetails().get_HitpointsPercent(),Math.round(100*k)!=Math.round(100*g)&&(g=k));b.splice(d,1);break}}}catch(x){console.log("Error Calculating Resources 2"),console.log(x),console.log(x.name+
" "+x.message)}try{var s=l.get_BuildingDetails();-1==g&&(g=s.get_HitpointsPercent(),"Harvester"==l.get_BuildingName()&&(k=l.get_BuildingDetails().get_HitpointsPercent(),Math.round(100*k)!=Math.round(100*g)&&(g=k)))}catch(r){console.log("Error Calculating Resources 3"),console.log(r),console.log(r.name+" "+r.message)}var u=s.get_UnitLevelRepairRequirements();for(d=0;d<u.length;d++){var y=u[d].Type,w=u[d].Count;e[y]+=Math.round(g*w-0.5)}g=-1}}for(f=0;9>f;f++)for(h=8;16>h;h++)try{q=ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridWidth();
p=ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridHeight();8==h&&(q+=1,p+=1);var z=ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(f*q,h*p);if(null!==z&&z.get_VisObjectType()!=ClientLib.Vis.VisObject.EObjectType.CityBuildingType&&"function"===typeof z.get_UnitDetails){if(void 0!==b)for(d=0;d<b.length;d++)if(m=b[d],n=ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(m.t),n.dn==z.get_UnitName()){t=Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(m.l,n,!1));switch(c){case ClientLib.Base.EFactionType.GDIFaction:case ClientLib.Base.EFactionType.NODFaction:switch(n.pt){case ClientLib.Base.EPlacementType.Defense:case ClientLib.Base.EPlacementType.Structure:t=
Math.floor(16*ClientLib.API.Util.GetUnitMaxHealthByLevel(m.l,n,!0))}}g=(m.sh-m.h)/t;b.splice(d,1);break}var A=z.get_UnitDetails();-1==g&&(g=A.get_HitpointsPercent());u=A.get_UnitLevelRepairRequirements();for(d=0;d<u.length;d++)y=u[d].Type,w=u[d].Count,e[y]+=Math.round(g*w-0.5);g=-1}}catch(v){console.log("Error Calculating Resources 4"),console.log(v),console.log(v.name+" "+v.message)}var C=e[1]+e[2]+e[3]+e[6];if(void 0===b)for(d=0;d<this.sim.length;d++)this.sim[d].Reset(),this.sim[d].Stats.Loot.Overall.Base=
C,this.sim[d].Stats.Loot.Tib.Base=e[1],this.sim[d].Stats.Loot.Cry.Base=e[2],this.sim[d].Stats.Loot.Cred.Base=e[3],this.sim[d].Stats.Loot.RP.Base=e[6];else 3===a.Stats.Battle.Outcome?(a.Stats.Loot.Overall.Battle=a.Stats.Loot.Overall.Base,a.Stats.Loot.Tib.Battle=a.Stats.Loot.Tib.Base,a.Stats.Loot.Cry.Battle=a.Stats.Loot.Cry.Base,a.Stats.Loot.Cred.Battle=a.Stats.Loot.Cred.Base,a.Stats.Loot.RP.Battle=a.Stats.Loot.RP.Base):(a.Stats.Loot.Overall.Battle=C,a.Stats.Loot.Tib.Battle=e[1],a.Stats.Loot.Cry.Battle=
e[2],a.Stats.Loot.Cred.Battle=e[3],a.Stats.Loot.RP.Battle=e[6])}catch(B){console.log("Error Calculating Resources"),console.log(B),console.log(B.name+" "+B.message)}},disableSimulateStatButtonTimer:function(b){try{1E3<=b?(this.isSimStatButtonDisabled=!0,this.simStatBtn.setEnabled(!1),this.simStatBtn.setLabel(Math.floor(b/1E3)),b-=1E3,setTimeout(function(){Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(b)},1E3)):(setTimeout(function(){Simulator.StatWindow.getInstance().simStatBtn.setEnabled(!0);
Simulator.StatWindow.getInstance().simStatBtn.setLabel("Update")},b),this.isSimStatButtonDisabled=!1)}catch(a){console.log("Error disabling simulator button"),console.log(a.toString())}}}});qx.Class.define("Simulator.OptionWindow",{type:"singleton",extend:qx.ui.window.Window,construct:function(){this.base(arguments);this.setLayout(new qx.ui.layout.VBox(5));this.addListener("resize",function(){this.center()},this);this.set({caption:"Simulator Options",allowMaximize:!1,showMaximize:!1,allowMinimize:!1,
showMinimize:!1});var b=qx.core.Init.getApplication(),a=new qx.ui.tabview.TabView,c=new qx.ui.tabview.Page("General");genLayout=new qx.ui.layout.VBox(5);c.setLayout(genLayout);var e=new qx.ui.container.Composite(new qx.ui.layout.HBox(5));e.setThemedFont("bold");var d=new qx.ui.basic.Label("Buttons:");e.add(d);c.add(e);e=new qx.ui.container.Composite(new qx.ui.layout.VBox(5));this._buttonLocCB=new qx.ui.form.CheckBox("Right/Left Play Area");this._buttonLoc2CB=new qx.ui.form.CheckBox("Play Area/CombatBar Right Side");
this._buttonSizeCB=new qx.ui.form.CheckBox("Change SimBtn Size");this._buttonLocCB.addListener("changeValue",this._onButtonLocChange,this);this._buttonLoc2CB.addListener("changeValue",this._onButtonLocChange2,this);this._buttonSizeCB.addListener("changeValue",this._onButtonSizeChange,this);void 0!==localStorage.isBtnRight&&("yes"==localStorage.isBtnRight?this._buttonLocCB.setValue(!0):this._buttonLocCB.setValue(!1));void 0!==localStorage.isBtnCmd&&("yes"==localStorage.isBtnCmd?this._buttonLoc2CB.setValue(!0):
this._buttonLoc2CB.setValue(!1));void 0!==localStorage.isBtnNorm&&("yes"==localStorage.isBtnNorm?this._buttonSizeCB.setValue(!0):this._buttonSizeCB.setValue(!1),this.setButtonSize());this._disableRTBtnCB=new qx.ui.form.CheckBox("Disable Repair Button");this._disableRTBtnCB.addListener("changeValue",this._onDisableRTBtnChange,this);void 0!==localStorage.isRTBtnDisabled&&("yes"==localStorage.isRTBtnDisabled?this._disableRTBtnCB.setValue(!0):this._disableRTBtnCB.setValue(!1));this._disableCmtBtnCB=new qx.ui.form.CheckBox("Disable Combat Button");
this._disableCmtBtnCB.addListener("changeValue",this._onDisableCmtBtnChange,this);void 0!==localStorage.isCmtBtnDisabled&&("yes"==localStorage.isCmtBtnDisabled?this._disableCmtBtnCB.setValue(!0):this._disableCmtBtnCB.setValue(!1));this._ArmyUnitTooltip=new qx.ui.form.CheckBox("Disable Army Unit Tooltip");this._ArmyUnitTooltip.addListener("changeValue",this._onArmyUnitTooltipChange,this);void 0!==localStorage.ArmyUnitTooltipDisabled&&("yes"==localStorage.ArmyUnitTooltipDisabled?this._ArmyUnitTooltip.setValue(!0):
this._ArmyUnitTooltip.setValue(!1));e.add(this._buttonSizeCB);e.add(this._buttonLocCB);e.add(this._buttonLoc2CB);e.add(this._disableRTBtnCB);e.add(this._disableCmtBtnCB);e.add(this._ArmyUnitTooltip);c.add(e);e=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});e.setThemedFont("bold");d=new qx.ui.basic.Label("Simulator:");e.add(d);c.add(e);e=new qx.ui.container.Composite(new qx.ui.layout.VBox(5));this._autoSimulateCB=new qx.ui.form.CheckBox("Auto Start Simulation");void 0!==
localStorage.autoSimulate&&"yes"==localStorage.autoSimulate&&this._autoSimulateCB.setValue(!0);var f=(new qx.ui.container.Composite(new qx.ui.layout.Grid(5))).set({marginLeft:20}),h=new qx.ui.form.RadioButton("x1"),g=new qx.ui.form.RadioButton("x2"),k=new qx.ui.form.RadioButton("x4");this._simSpeedGroup=new qx.ui.form.RadioGroup(h,g,k);this._simSpeedGroup.addListener("changeSelection",this._onSimSpeedChange,this);this._autoSimulateCB.addListener("changeValue",this._onAutoSimulateChange,this);void 0!==
localStorage.simulateSpeed&&(d=this._simSpeedGroup.getSelectables(!1),"2"==localStorage.simulateSpeed?d[1].setValue(!0):"4"==localStorage.simulateSpeed?d[2].setValue(!0):d[0].setValue(!0));!1==this._autoSimulateCB.getValue()&&this._simSpeedGroup.setEnabled(!1);f.add(h,{row:0,column:0});f.add(g,{row:0,column:1});f.add(k,{row:0,column:2});e.add(this._autoSimulateCB);e.add(f);c.add(e);e=new qx.ui.tabview.Page("Stats");statsLayout=new qx.ui.layout.VBox(5);e.setLayout(statsLayout);d=new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
d.setThemedFont("bold");f=new qx.ui.basic.Label("Stat Window:");d.add(f);e.add(d);d=new qx.ui.container.Composite(new qx.ui.layout.VBox(5));this._autoOpenCB=new qx.ui.form.CheckBox("Auto Open");this._autoOpenCB.addListener("changeValue",this._onAutoOpenStatsChange,this);void 0!==localStorage.autoOpenStat&&("yes"==localStorage.autoOpenStat?this._autoOpenCB.setValue(!0):this._autoOpenCB.setValue(!1));d.add(this._autoOpenCB);e.add(d);d=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});
d.setThemedFont("bold");f=new qx.ui.basic.Label(b.tr("tnf:combat target"));d.add(f);e.add(d);f=new qx.ui.container.Composite(new qx.ui.layout.HBox(5));h=new qx.ui.form.RadioButton("HP abs");g=new qx.ui.form.RadioButton("HP rel");this._EnemyHealthSecGroup=new qx.ui.form.RadioGroup(h,g);this._EnemyHealthSecGroup.addListener("changeSelection",this._onEnemyHealthSelectionChange,this);void 0!==localStorage.getEHSelection&&(d=this._EnemyHealthSecGroup.getSelectables(!1),"hp"==localStorage.getEHSelection?
d[0].setValue(!0):"hp rel"==localStorage.getEHSelection?d[1].setValue(!0):d[0].setValue(!0));f.add(h);f.add(g);e.add(f);d=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});d.setThemedFont("bold");b=new qx.ui.basic.Label(b.tr("tnf:own repair cost"));d.add(b);e.add(d);b=new qx.ui.container.Composite(new qx.ui.layout.HBox(5));f=new qx.ui.form.RadioButton("RT");h=new qx.ui.form.RadioButton("C");g=new qx.ui.form.RadioButton("HP abs");k=new qx.ui.form.RadioButton("HP rel");this._repairSecGroup=
new qx.ui.form.RadioGroup(f,h,g,k);this._repairSecGroup.addListener("changeSelection",this._onRepairSelectionChange,this);void 0!==localStorage.getRTSelection&&(d=this._repairSecGroup.getSelectables(!1),"rt"==localStorage.getRTSelection?d[0].setValue(!0):"cry"==localStorage.getRTSelection?d[1].setValue(!0):"hp"==localStorage.getRTSelection?d[2].setValue(!0):"hp rel"==localStorage.getRTSelection?d[3].setValue(!0):d[0].setValue(!0));b.add(f);b.add(h);b.add(g);b.add(k);e.add(b);b=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});
b.setThemedFont("bold");d=new qx.ui.basic.Label("Simulations shown");b.add(d);e.add(b);b=new qx.ui.container.Composite(new qx.ui.layout.HBox(10));this._simViews=(new qx.ui.form.Spinner).set({minimum:2});void 0!==localStorage.simViews&&(isNaN(parseInt(localStorage.simViews,10))?this._simViews.setValue(Simulator.StatWindow.getInstance().simViews):this._simViews.setValue(parseInt(localStorage.simViews,10)));this._simViews.addListener("changeValue",this._onSimViewsChanged,this);b.add(this._simViews);
e.add(b);b=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});b.setThemedFont("bold");d=new qx.ui.basic.Label("Hide Sections (on Startup):");b.add(d);e.add(b);b=new qx.ui.container.Composite(new qx.ui.layout.HBox(10));this._hideHealthCB=new qx.ui.form.CheckBox("Health");this._hideRepairCB=new qx.ui.form.CheckBox("Repair");this._hideLootCB=new qx.ui.form.CheckBox("Loot");this._hideHealthCB.addListener("changeValue",this._onHideEHChange,this);this._hideRepairCB.addListener("changeValue",
this._onHideRTChange,this);this._hideLootCB.addListener("changeValue",this._onHideLootChange,this);void 0!==localStorage.hideHealth&&("yes"==localStorage.hideHealth?this._hideHealthCB.setValue(!0):this._hideHealthCB.setValue(!1));void 0!==localStorage.hideRepair&&("yes"==localStorage.hideRepair?this._hideRepairCB.setValue(!0):this._hideRepairCB.setValue(!1));void 0!==localStorage.hideLoot&&("yes"==localStorage.hideLoot?this._hideLootCB.setValue(!0):this._hideLootCB.setValue(!1));b.add(this._hideHealthCB);
b.add(this._hideRepairCB);b.add(this._hideLootCB);e.add(b);b=(new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});d=(new qx.ui.basic.Label("Set Stat Window Position:")).set({alignY:"middle"});d.setFont("bold");f=(new qx.ui.form.Button("Set")).set({allowGrowX:!1,allowGrowY:!1,height:20});f.addListener("click",this._onSetStatWindowPositionChange,this);b.add(d);b.add(f);e.add(b);a.add(c);a.add(e);this.add(a)},destruct:function(){},members:{_buttonSizeCB:null,_buttonLocCB:null,
_buttonLoc2CB:null,_disableRTBtnCB:null,_disableCmtBtnCB:null,_autoOpenCB:null,_autoSimulateCB:null,_simSpeedGroup:null,_repairSecGroup:null,_EnemyHealthSecGroup:null,_simViews:null,_hideHealthCB:null,_hideRepairCB:null,_hideLootCB:null,_ArmyUnitTooltip:null,_onButtonSizeChange:function(){try{!0==this._buttonSizeCB.getValue()?localStorage.isBtnNorm="yes":localStorage.isBtnNorm="no",this.setButtonSize()}catch(b){console.log("Error Button Size Change: "+b.toString())}},_onButtonLocChange:function(){try{!0==
this._buttonLocCB.getValue()?localStorage.isBtnRight="yes":localStorage.isBtnRight="no",this.setButtonLoc()}catch(b){console.log("Error Button Location Change: "+b.toString())}},_onButtonLocChange2:function(){try{!0==this._buttonLoc2CB.getValue()?localStorage.isBtnCmd="yes":localStorage.isBtnCmd="no",this.setButtonLoc2()}catch(b){console.log("Error Button Location Change: "+b.toString())}},_onDisableRTBtnChange:function(){try{var b=this._disableRTBtnCB.getValue();localStorage.isRTBtnDisabled=!0==
b?"yes":"no";this.setRTBtn(b)}catch(a){console.log("Error Disable RT Button Change: "+a.toString())}},_onDisableCmtBtnChange:function(){try{var b=this._disableCmtBtnCB.getValue();localStorage.isCmtBtnDisabled=!0==b?"yes":"no";this.setCmtBtn(b)}catch(a){console.log("Error Disable Cmt Button Change: "+a.toString())}},_onEnemyHealthSelectionChange:function(b){try{var a=b.getData()[0].getLabel();localStorage.getEHSelection="HP abs"==a?"hp":"HP rel"==a?"hp rel":"hp"}catch(c){console.log("Error Enemy Health Section Selection Change: "+
c.toString())}},_onRepairSelectionChange:function(b){try{var a=b.getData()[0].getLabel();localStorage.getRTSelection="RT"==a?"rt":"HP abs"==a?"hp":"HP rel"==a?"hp rel":"C"==a?"cry":"rt"}catch(c){console.log("Error Repair Section Selection Change: "+c.toString())}},_onAutoOpenStatsChange:function(){try{!1==this._autoOpenCB.getValue()?localStorage.autoOpenStat="no":localStorage.autoOpenStat="yes"}catch(b){console.log("Error Auto Open Stats Change: "+b.toString())}},_onArmyUnitTooltipChange:function(){try{!1==
this._ArmyUnitTooltip.getValue()?localStorage.ArmyUnitTooltipDisabled="no":localStorage.ArmyUnitTooltipDisabled="yes"}catch(b){console.log("Error Army Unit Tooltip Change: "+b.toString())}},_onAutoSimulateChange:function(){try{!1==this._autoSimulateCB.getValue()?(this._simSpeedGroup.setEnabled(!1),localStorage.autoSimulate="no"):(this._simSpeedGroup.setEnabled(!0),localStorage.autoSimulate="yes")}catch(b){console.log("Error Auto Simulate Change: "+b.toString())}},_onSimSpeedChange:function(b){try{var a=
b.getData()[0].getLabel();localStorage.simulateSpeed="x1"==a?"1":"x2"==a?"2":"4"}catch(c){console.log("Error Sim Speed Change: "+c.toString())}},_onSimViewsChanged:function(){try{var b=parseInt(this._simViews.getValue(),10);if(!isNaN(b)&&0<b){localStorage.simViews=b.toString();Simulator.StatWindow.getInstance().simViews=b;for(var a=Simulator.StatWindow.getInstance().sim.length-1;0<=a;a--)a>b-1&&(Simulator.StatWindow.getInstance().Battle.remove(Simulator.StatWindow.getInstance().sim[a].Label.Battle.container),
Simulator.StatWindow.getInstance().EnemyHealth.remove(Simulator.StatWindow.getInstance().sim[a].Label.EnemyHealth.container),Simulator.StatWindow.getInstance().Repair.remove(Simulator.StatWindow.getInstance().sim[a].Label.Repair.container),Simulator.StatWindow.getInstance().Loot.remove(Simulator.StatWindow.getInstance().sim[a].Label.Loot.container),Simulator.StatWindow.getInstance().sim.pop());for(a=0;a<b;a++)a==Simulator.StatWindow.getInstance().sim.length&&(Simulator.StatWindow.getInstance().sim.push(new (Simulator.StatWindow.getInstance().Simulation)(a)),
Simulator.StatWindow.getInstance().Battle.add(Simulator.StatWindow.getInstance().sim[a].Label.Battle.container,{flex:1}),Simulator.StatWindow.getInstance().EnemyHealth.add(Simulator.StatWindow.getInstance().sim[a].Label.EnemyHealth.container,{flex:1}),Simulator.StatWindow.getInstance().Repair.add(Simulator.StatWindow.getInstance().sim[a].Label.Repair.container,{flex:1}),Simulator.StatWindow.getInstance().Loot.add(Simulator.StatWindow.getInstance().sim[a].Label.Loot.container,{flex:1}),Simulator.StatWindow.getInstance().sim[a].Select(Simulator.StatWindow.getInstance().simSelected));
if(b-1<Simulator.StatWindow.getInstance().simSelected)for(a=Simulator.StatWindow.getInstance().simSelected=0;a<Simulator.StatWindow.getInstance().sim.length;a++)Simulator.StatWindow.getInstance().sim[a].Select(0)}}catch(c){console.log("Error Simulation Views Change: "+c.toString())}},_onHideEHChange:function(){try{!0==this._hideHealthCB.getValue()?localStorage.hideHealth="yes":localStorage.hideHealth="no"}catch(b){console.log("Error Hide Enemy Base Health Change: "+b.toString())}},_onHideRTChange:function(){try{!0==
this._hideRepairCB.getValue()?localStorage.hideRepair="yes":localStorage.hideRepair="no"}catch(b){console.log("Error Hide Repair Times Change: "+b.toString())}},_onHideLootChange:function(){try{!0==this._hideLootCB.getValue()?localStorage.hideLoot="yes":localStorage.hideLoot="no"}catch(b){console.log("Error Hide Loot Change: "+b.toString())}},_onSetStatWindowPositionChange:function(){try{var b=Simulator.StatWindow.getInstance().getLayoutProperties();localStorage.statWindowPosLeft=b.left;localStorage.statWindowPosTop=
b.top}catch(a){console.log("Error Stat Window Position Change: "+a.toString())}},setRTBtn:function(b){!0==b?Simulator.getInstance().unlockRTBtn.hide():Simulator.getInstance().unlockRTBtn.show()},setCmtBtn:function(b){!0==b?Simulator.getInstance().unlockCmtBtn.hide():Simulator.getInstance().unlockCmtBtn.show()},setButtonLoc:function(){try{var b=this._buttonLocCB.getValue(),a=this._buttonSizeCB.getValue();if(!0==b){if(!0==a)var c=70;Simulator.getInstance().playArea.add(Simulator.getInstance().simBtn,
{left:null,right:3,bottom:161});Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn,{left:null,right:34,bottom:368});Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn,{left:null,right:3,bottom:321});Simulator.getInstance().playArea.add(Simulator.getInstance().layoutBtn,{left:null,right:3,bottom:368});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn,{left:null,right:13,bottom:253});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn,
{left:null,right:13,bottom:217});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn,{left:null,right:28,bottom:235});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn,{left:null,right:3,bottom:235});Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn,{left:null,right:30,bottom:296});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH,{left:null,right:30,bottom:272});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV,
{left:null,right:3,bottom:272});Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn,{left:null,right:3,bottom:296});Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn,{left:null,right:3,bottom:136})}else c=null,Simulator.getInstance().playArea.add(Simulator.getInstance().simBtn,{right:c,left:3,bottom:161}),Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn,{right:c,left:34,bottom:368}),Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn,
{right:c,left:3,bottom:321}),Simulator.getInstance().playArea.add(Simulator.getInstance().layoutBtn,{right:c,left:3,bottom:368}),Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn,{right:c,left:13,bottom:253}),Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn,{right:c,left:13,bottom:217}),Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn,{right:c,left:3,bottom:235}),Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn,
{right:c,left:28,bottom:235}),Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn,{right:c,left:30,bottom:296}),Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH,{right:c,left:30,bottom:272}),Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV,{right:c,left:3,bottom:272}),Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn,{right:c,left:3,bottom:296}),Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn,
{left:3,right:c,bottom:136})}catch(e){console.log("Error Setting Button Location: "+e.toString())}},setButtonLoc2:function(){try{var b=this._buttonLoc2CB.getValue();this._buttonSizeCB.getValue();if(!0==b){var a=null;Simulator.getInstance().playArea.add(Simulator.getInstance().simBtn,{left:a,right:3,bottom:161});Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn,{left:a,right:34,bottom:368});Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn,{left:a,right:3,bottom:321});
Simulator.getInstance().playArea.add(Simulator.getInstance().layoutBtn,{left:a,right:3,bottom:368});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn,{left:a,right:13,bottom:253});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn,{left:a,right:13,bottom:217});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn,{left:a,right:28,bottom:235});Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn,{left:a,right:3,
bottom:235});Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn,{left:a,right:30,bottom:296});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH,{left:a,right:30,bottom:272});Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV,{left:a,right:3,bottom:272});Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn,{left:a,right:3,bottom:296})}else a=null,Simulator.getInstance().armyBar.add(Simulator.getInstance().simBtn,
{left:a,right:60,bottom:13}),Simulator.getInstance().playArea.add(Simulator.getInstance().layoutBtn,{left:a,right:3,bottom:368}),Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn,{left:a,right:30,bottom:320}),Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn,{left:a,right:34,bottom:368}),Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn,{left:a,right:3,bottom:321}),Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn,
{left:a,right:30,bottom:296}),Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn,{left:a,right:3,bottom:296}),Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftUpBtn,{left:a,right:80,bottom:135}),Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftDownBtn,{left:a,right:80,bottom:110}),Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftLeftBtn,{left:a,right:100,bottom:123}),Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftRightBtn,
{left:a,right:63,bottom:123}),Simulator.getInstance().armyBar.add(Simulator.getInstance().mirrorBtnH,{left:a,right:63,bottom:83}),Simulator.getInstance().armyBar.add(Simulator.getInstance().mirrorBtnV,{left:a,right:90,bottom:83});Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn,{left:a,right:3,bottom:136})}catch(c){console.log("Error Setting Button Location: "+c.toString())}},setButtonSize:function(){try{value=this._buttonSizeCB.getValue(),!0==value?(Simulator.getInstance().simBtn.setLabel("S",
"http://i.imgur.com/P7hf5CG.png"),Simulator.getInstance().simBtn.getChildControl("icon").set({width:45,height:45,scale:!0}),Simulator.getInstance().simBtn.setWidth(45)):(Simulator.getInstance().simBtn.setLabel("S","http://i.imgur.com/P7hf5CG.png"),Simulator.getInstance().simBtn.getChildControl("icon").set({width:72,height:46,scale:!0}),Simulator.getInstance().simBtn.setWidth(72)),Simulator.getInstance().statBtn.setLabel("","http://icons.iconarchive.com/icons/kyo-tux/phuzion/16/Misc-Stats-icon.png"),
Simulator.getInstance().statBtn.setWidth(25),Simulator.getInstance().statBtn.setHieght(25),Simulator.getInstance().optionBtn.setLabel("Options"),Simulator.getInstance().optionBtn.setWidth(45),Simulator.getInstance().layoutBtn.setLabel(""),Simulator.getInstance().layoutBtn.setWidth(25),Simulator.getInstance().layoutBtn.setHieght(25),this.setButtonLoc(),this.setButtonLoc2()}catch(b){console.log("Error Setting Button Size: "+b.toString())}}}});qx.Class.define("Simulator.LayoutWindow",{type:"singleton",
extend:webfrontend.gui.CustomWindow,construct:function(){this.base(arguments);this.setLayout(new qx.ui.layout.VBox);this.set({width:200,caption:"Simulator Layouts",padding:2,allowMaximize:!1,showMaximize:!1,allowMinimize:!1,showMinimize:!1});var b=(new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"}),a=(new qx.ui.basic.Label("Formation Saver")).set({alignX:"center",alignY:"top",font:"font_size_14_bold"});b.add(a);this.add(b);this.layoutList=new qx.ui.form.List;
this.layoutList.set({selectionMode:"one",height:100,width:150,margin:5});this.add(this.layoutList);b=new qx.ui.container.Composite;a=new qx.ui.layout.HBox(5,"center");b.setLayout(a);var a=new qx.ui.form.Button("Load"),c=new qx.ui.form.Button("Delete");a.set({height:15,width:70,alignX:"center"});a.addListener("click",this.loadLayout,this);c.set({height:15,width:70,alignX:"center"});c.addListener("click",this.deleteLayout,this);b.add(a);b.add(c);this.add(b);b=(new qx.ui.container.Composite((new qx.ui.layout.HBox).set({spacing:10}))).set({marginTop:20,
marginLeft:5});this.layoutTextBox=(new qx.ui.form.TextField("")).set({width:75,maxLength:15});a=new qx.ui.form.Button("Save");a.set({height:10,width:70,alignX:"center"});a.addListener("click",this.saveNewLayout,this);b.add(this.layoutTextBox);b.add(a);this.add(b);b=(new qx.ui.container.Composite((new qx.ui.layout.HBox).set({spacing:10}))).set({marginTop:10,marginLeft:5});this.persistentCheck=new qx.ui.form.CheckBox("Make Persistent");this.persistentCheck.setTextColor("white");this.persistentCheck.setFont("bold");
this.persistentCheck.setToolTipText("If checked, formation will be saved and can be used by this city in any other city");b.add(this.persistentCheck);this.add(b);b=(new qx.ui.container.Composite(new qx.ui.layout.HBox)).set({marginTop:5,marginLeft:5});a=(new qx.ui.basic.Label("")).set({alignX:"center",alignY:"top"});a.setValue("<p align='justify'><b>If formation does not change on load, try moving one unit first, then try again.</b></p>");a.set({rich:!0,wrap:!0,width:165,textColor:"white"});b.add(a);
this.add(b);b=(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({alignX:"center",marginTop:5,marginLeft:5,allowGrowX:!1});a=(new qx.ui.form.Button("Clear All")).set({alignX:"center",width:70});a.addListener("click",this.clearAllLayouts,this);b.add(a);this.add(b);this.layoutsArray=[]},destruct:function(){},members:{layoutList:null,layoutTextBox:null,layoutsArray:null,persistentCheck:null,saveNewLayout:function(b){try{console.log("Saving Layout");if(void 0!==b&&!0==b||""==this.layoutTextBox.getValue())var a=
new Date,c=a.getDate(),e=a.getMonth()+1,d=10>a.getHours()?"0"+a.getHours():a.getHours(),f=10>a.getMinutes()?"0"+a.getMinutes():a.getMinutes(),h=10>a.getSeconds()?"0"+a.getSeconds():a.getSeconds(),g=e+"/"+c+"@"+d+":"+f+":"+h;else g=this.layoutTextBox.getValue();var k=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId(),q=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId()+"."+k+"."+g,p=this.layoutList.getChildren();for(b=0;b<p.length;b++)if(thisItem=p[b].getModel(),
thisItem==q){alert("Save Failed: Duplicate Name");return}var l=Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l,l=this.prepareLayout(l),p={},p=!0==this.persistentCheck.getValue()?{id:q,label:g,formation:l,pers:"yes"}:{id:q,label:g,formation:l,pers:"no"};this.layoutsArray.push(p);this.layoutList.add(new qx.ui.form.ListItem(p.label,null,p.id));this.layoutTextBox.setValue("");Simulator.getInstance().quickSaveBtn.setLabel("?");setTimeout(function(){Simulator.getInstance().quickSaveBtn.setLabel("")},
2E3);this.updateStorage()}catch(m){console.log("Error Saving Layout"),console.log(m)}},loadLayout:function(){try{console.log("Loading Layout");ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();var b=this.layoutList.getSelection()[0].getModel(),a;for(a in this.layoutsArray)if(this.layoutsArray[a].id==b){Simulator.getInstance().restoreFormation(this.layoutsArray[a].formation);break}}catch(c){console.log("Error Loading Layout"),console.log(c)}},deleteLayout:function(){try{if(console.log("Deleting Layout"),
confirm("Are you sure you want to delete this layout?")){for(var b in this.layoutsArray)this.layoutsArray[b].id==this.layoutList.getSelection()[0].getModel()&&(this.layoutsArray.splice(b,1),this.updateStorage());this.updateLayoutList()}}catch(a){console.log("Error Deleting Layout"),console.log(a)}},updateStorage:function(){try{console.log("Updating Storage"),localStorage.savedFormations=JSON.stringify(this.layoutsArray)}catch(b){console.log("Error updating localStorage"),console.log(b)}},updateLayoutList:function(){try{console.log("Updating Layout List");
var b=localStorage.savedFormations;void 0!==b&&(this.layoutsArray=JSON.parse(b));this.layoutList.removeAll();var a=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId(),c=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId(),b=c+"."+a,e;for(e in this.layoutsArray){var d=this.layoutsArray[e].label,a=b+"."+d,f=this.layoutsArray[e].pers,h=this.layoutsArray[e].id.match(c.toString());(a==this.layoutsArray[e].id||void 0!==f&&"yes"==f&&null!=h)&&this.layoutList.add(new qx.ui.form.ListItem(d,
null,this.layoutsArray[e].id))}}catch(g){console.log("Error Updating Layout List"),console.log(g)}},prepareLayout:function(b){try{console.log("Preparing Layout for Saving");saved_units=[];for(var a=0;a<b.length;a++){var c=b[a],e={};e.x=c.get_CoordX();e.y=c.get_CoordY();e.id=c.get_Id();e.enabled=c.get_Enabled();saved_units.push(e)}return saved_units}catch(d){console.log("Error Preparing Unit Layout"),console.log(d)}},clearAllLayouts:function(){try{console.log("Clearing All Layouts"),confirm("Clicking OK will delete all of your saved layouts from every base!")?
(localStorage.removeItem("savedFormations"),this.layoutsArray=[],alert("All saved layouts have been deleted."),this.updateLayoutList()):alert("No layouts were deleted.")}catch(b){console.log("Error Clearing All Layouts"),console.log(b)}}}})}function C(b,a){setTimeout(function(){try{if(console.log("View Changed"),Simulator.OptionWindow.getInstance().close(),Simulator.LayoutWindow.getInstance().close(),a!=ClientLib.Vis.Mode.CombatSetup&&a!=ClientLib.Vis.Mode.Battleground?(Simulator.StatWindow.getInstance().close(),
Simulator.getInstance().armyTempFormations=[],Simulator.getInstance().armyTempIdx=0,Simulator.getInstance().armyUndoBtn.setEnabled(!1),Simulator.getInstance().isSimulation=!1):a==ClientLib.Vis.Mode.CombatSetup&&(void 0!==localStorage.autoOpenStat?"yes"==localStorage.autoOpenStat?Simulator.StatWindow.getInstance().open():Simulator.StatWindow.getInstance().close():(Simulator.StatWindow.getInstance().open(),localStorage.autoOpenStat="yes"),localStorage.allUnitsDisabled="no",!1==Simulator.getInstance().isSimulation?
setTimeout(function(){Simulator.StatWindow.getInstance().calcResources()},2E3):Simulator.getInstance().isSimulation=!1,b!=ClientLib.Vis.Mode.Battleground&&Simulator.getInstance().saveTempFormation()),null!=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity()){var c=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Name(),e=ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Name();a==ClientLib.Vis.Mode.Battleground||c==e?(Simulator.getInstance().simBtn.hide(),
Simulator.getInstance().shiftUpBtn.hide(),Simulator.getInstance().shiftDownBtn.hide(),Simulator.getInstance().shiftLeftBtn.hide(),Simulator.getInstance().shiftRightBtn.hide(),Simulator.getInstance().disableAllUnitsBtn.hide(),Simulator.getInstance().mirrorBtnH.hide(),Simulator.getInstance().mirrorBtnV.hide(),Simulator.getInstance().armyUndoBtn.hide(),Simulator.getInstance().layoutBtn.hide(),Simulator.getInstance().optionBtn.hide(),Simulator.getInstance().statBtn.hide(),Simulator.getInstance().quickSaveBtn.hide()):
c!=e&&(Simulator.getInstance().simBtn.show(),Simulator.getInstance().shiftUpBtn.show(),Simulator.getInstance().shiftDownBtn.show(),Simulator.getInstance().shiftLeftBtn.show(),Simulator.getInstance().shiftRightBtn.show(),Simulator.getInstance().disableAllUnitsBtn.show(),Simulator.getInstance().mirrorBtnH.show(),Simulator.getInstance().mirrorBtnV.show(),Simulator.getInstance().armyUndoBtn.show(),Simulator.getInstance().layoutBtn.show(),Simulator.getInstance().optionBtn.show(),Simulator.getInstance().statBtn.show(),
Simulator.getInstance().quickSaveBtn.show())}}catch(d){console.log("Error closing windows or hiding buttons on view change"),console.log(d.toString())}},500)}function w(){try{if("undefined"!==typeof qx&&"undefined"!==typeof qx.core&&"undefined"!==typeof qx.core.Init&&"undefined"!==typeof ClientLib&&"undefined"!==typeof phe)if(!0==qx.core.Init.getApplication().initDone)try{console.log("CENTER DRIVEN - Tiberium Alliances Combat Simulator: Loading");r();if(392583<=PerforceChangelist){var b=""+ClientLib.Data.Cities.prototype.get_CurrentCity,
a;for(a in ClientLib.Data.Cities.prototype)if(ClientLib.Data.Cities.prototype.hasOwnProperty(a)&&"function"==typeof ClientLib.Data.Cities.prototype[a]&&-1<(""+ClientLib.Data.Cities.prototype[a]).indexOf(b)&&6==a.length){b=a;break}var c=""+ClientLib.Data.Cities.prototype.get_CurrentOwnCity,e;for(e in ClientLib.Data.Cities.prototype)if(ClientLib.Data.Cities.prototype.hasOwnProperty(e)&&"function"==typeof ClientLib.Data.Cities.prototype[e]&&-1<(""+ClientLib.Data.Cities.prototype[e]).indexOf(c)&&6==e.length){c=
e;break}var d=""+ClientLib.API.Util.GetUnitRepairCosts,d=d.replace(b,c),f=d.substring(d.indexOf("{")+1,d.lastIndexOf("}")),h=Function("a,b,c",f);ClientLib.API.Util.GetUnitRepairCosts=h}Simulator.getInstance();Simulator.StatWindow.getInstance();Simulator.OptionWindow.getInstance();Simulator.LayoutWindow.getInstance();phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(),"ViewModeChange",ClientLib.Vis.ViewModeChange,this,C);console.log("CENTER DRIVEN - Tiberium Alliances Combat Simulator: Loaded")}catch(g){console.log("CENTER DRIVEN - Tiberium Alliances Combat Simulator initialization error:"),
console.log(g)}else window.setTimeout(w,1E3);else window.setTimeout(w,1E3)}catch(k){console.log(k)}}window.setTimeout(w,1E3)}.toString()+")();";r.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(r)})();

//(2)-----------------------------Salvar Formação-----------------//

(function (){
  var tafs_main = function() {
    var windowSaver;
      
    function initialize() {
      console.log("Formation Saver Loaded");

      qx.Class.define("webfrontend.gui.PlayArea.FormationSaver", {
        extend: qx.ui.container.Composite,

        construct:function() {
          qx.ui.container.Composite.call(this);
          this.setLayout(new qx.ui.layout.Canvas());
          this.add(this.init());
        },

        statics: {
          SaverCollapsedHeight: 32,
          SaverExpandedHeight: 245,
        },

        properties: {
          expanded: {init: true, apply: "expand"},
        },

        members: {
          buttonResize: null,
          containerContence: null,
          containerSaves: null,
          containerMain: null,
          buttonSave: null,

          init: function() {          
            var Y = 6;
            this.buttonResize = new webfrontend.ui.SoundButton(null, "FactionUI/icons/icon_tracker_minimise.png").set({width: 20, height: 20, appearance: "button-notif-cat", center: true, allowGrowX: false});
            this.buttonResize.addListener("click",function(e) {
              this.setExpanded(!this.getExpanded());
            }, this);
            var ba = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({alignY:"middle"})).set({margin:Y,marginRight:Y+3});
            ba.add(this.buttonResize);
            var labelTitle = new qx.ui.basic.Label("<b>Saver</b>");
            labelTitle.set({marginLeft: 4, rich: true});
            labelTitle.setTextColor("#FFFFFF");
            ba.add(labelTitle);
            this.containerContence = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"center"})).set({allowGrowX:true,marginTop:0,marginBottom:5});

            containerSaves = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 2)).set({allowGrowX: true , marginLeft: 0, marginBottom: 5});
            this.containerContence.add(containerSaves);

            buttonSave = new qx.ui.form.Button("Save");
            buttonSave.set({width: 50, appearance: "button-text-small", toolTipText: "Save attack formation", allowGrowX:false});
            buttonSave.addListener("click", this.save, this); 
            this.containerContence.add(buttonSave);

            this.containerMain=new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"right"})).set({maxHeight:webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight,width:75,minHeight:32,allowShrinkY:true,decorator:new qx.ui.decoration.VBox().set({baseImage:"webfrontend/ui/common/bgr_mission_tracker.png"})});
            this.containerMain.add(ba);
            this.containerMain.add(this.containerContence,{flex:1});

            return this.containerMain;
          },

          expand: function(bs) {
            if(!bs) {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_maximise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverCollapsedHeight);
            } else {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_minimise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight);
            }
          },

          update: function() {
            containerSaves.removeAll();

            var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
            var currentOwnCity = playerCities.get_CurrentOwnCity();
            var cityID = playerCities.get_CurrentCity().get_Id();
            var ownCityID = currentOwnCity.get_Id();

            var formations = this.loadFormations();
            if(!formations) {
              return;
            }
            if(!formations[cityID]) {
              return;
            }
            if(!formations[cityID][ownCityID]) {
              return;
            }

            var i = 0;
            for(var id in formations[cityID][ownCityID]) {
              if(id != 0) {
                i++;
                var formation = formations[cityID][ownCityID][id];
                var date = new Date(Number(formation.t));
                var toolTipText = "<div><span style='float: left'><b>" + formation.n + "</b></span><span style='float: right'>&nbsp;&nbsp;&nbsp;&nbsp;" + date.getHours() + ":" + (date.getMinutes() <= 9 ? "0" : "") + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth() + 1) + "</span></div><div style='clear: both;'></div>";
                if(formation.cy != null) {
                  toolTipText += formation.cy + "% Construction Yard</br>" + formation.df + "% Defense Facility</br>" + formation.ts + "% Troop Strength</br>" + this.formatSecondsAsTime(formation.r) + " Repair Time";
                }

                var labelLoad = new qx.ui.basic.Label(formation.n);
                labelLoad.set({width: 40, allowGrowX: false, toolTipText: toolTipText});
                labelLoad.setTextColor("#FFFFFF");
                labelLoad.addListener("click", this.clickLoad(formation), this);
                labelLoad.addListener("mouseover", this.mouseover(labelLoad, "#BBBBBB"), this);
                labelLoad.addListener("mouseout", this.mouseout(labelLoad, "#FFFFFF"), this);
                containerSaves.add(labelLoad, {row: i, column: 1});

                var labelDelete = new qx.ui.basic.Label("<b>X</b>");
                labelDelete.set({width: 10, allowGrowX:false, rich: true, toolTipText: "Delete " + formation.n});
                labelDelete.setTextColor("#881717");
                labelDelete.addListener("click", this.clickDeleteF(cityID, ownCityID, id), this);
                labelDelete.addListener("mouseover", this.mouseover(labelDelete, "#550909"), this);
                labelDelete.addListener("mouseout", this.mouseover(labelDelete, "#881717"), this);
                containerSaves.add(labelDelete, {row: i, column: 2});
              }
            }
          },

          mouseover: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          mouseout: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          save: function() {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              var ownCityID = currentOwnCity.get_Id();
 
              var newFormation = new Object();
              newFormation.t = new Date().getTime().toString();
              newFormation.n = "";
              newFormation.l = new Array();

              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor saving!");
                return;
              }
              armyUnits = armyUnits.l;
              for(var i in armyUnits)
              {
                var unit = armyUnits[i];
                newFormation.l[i] = new Object();
                newFormation.l[i].x = unit.get_CoordX();
                newFormation.l[i].y = unit.get_CoordY();
                newFormation.l[i].e = unit.get_Enabled();
              }

              var formations = this.loadFormations();
              if(!formations) {
                formations = new Object();
              }
              if(!formations[cityID]) {
                formations[cityID] = new Object();
              }
              if(!formations[cityID][ownCityID]) {
                formations[cityID][ownCityID] = new Array();
                formations[cityID][ownCityID][0] = 0;
              }
              formations[cityID][ownCityID][0]++;
              newFormation.n = "Save " + formations[cityID][ownCityID][0];
              
              formations[cityID][ownCityID].push(newFormation);
              this.saveFormations(formations);

              windowSaver.update();
            } catch(e) {
              console.log(e);
            }
          },

          clickLoad: function(newFormation) {
            return function() {
              this.load(newFormation);
            }
          },

          load: function(newFormation) {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities();
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              
              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor loading!");
                return;
              }
              armyUnits = armyUnits.l;

              for(var i in newFormation.l)
              {
                var unitData = newFormation.l[i];
                armyUnits[i].MoveBattleUnit(unitData.x, unitData.y);
                if(unitData.e != null) {
                  if(armyUnits[i].set_Enabled_Original) {
                    armyUnits[i].set_Enabled_Original(unitData.e);
                  } else {
                    armyUnits[i].set_Enabled(unitData.e);
                  }
                }
              }

              //formation.set_CurrentTargetBaseId(cityID);
            } catch(e) {
              console.log(e);
            }
          },

          clickDeleteF: function(cityID, ownCityID, id) {
            return function() {
              this.deleteF(cityID, ownCityID, id);
            }
          },

          deleteF: function(cityID, ownCityID, id) {
            var formations = this.loadFormations();
            if(!formations || !formations[cityID] || !formations[cityID][ownCityID])
              return;

            formations[cityID][ownCityID].splice(id, 1);
            if(formations[cityID][ownCityID].length <= 1) {
              delete formations[cityID][ownCityID];
            }
            var i
            for(i in formations[cityID]) {
              if(formations[cityID].hasOwnProperty(i)) {
                break;
              }
            }
            if(!i)
              delete formations[cityID];

            this.saveFormations(formations);

            windowSaver.update();
          },

          saveFormations: function(formations) {
            var data = JSON.stringify(formations);
            localStorage.formations = data;
          },

          loadFormations: function() {
            var formations = localStorage.formations;
            return formations && JSON.parse(formations);
          },
          
          formatSecondsAsTime: function(secs, format) {
            var hr = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600)) / 60);
            var sec = Math.floor(secs - (hr * 3600) - (min * 60));

            if(hr < 10) {
              hr = "0" + hr;
            }
            if(min < 10) {
              min = "0" + min;
            }
            if(sec < 10) {
              sec = "0" + sec;
            }
            
            return hr + ':' + min + ':' + sec;
          },
        }
      })
      
      windowSaver = new webfrontend.gui.PlayArea.FormationSaver();
      windowSaver.hide();
      qx.core.Init.getApplication().getPlayArea().add(windowSaver, {top: 55, right: -2});
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId = function(a) {
        this.__tafs__set_CurrentOwnCityId(a); 
        updateView();
      }
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId = function(a) {
        this.__tafs__set_CurrentCityId(a); 
        updateView();
      }
      
      function updateView() {
        if (PerforceChangelist >= 376877) {
          switch(qx.core.Init.getApplication().getPlayArea().getViewMode()) {
            case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense:
            case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupBase:
              windowSaver.update();
              windowSaver.show();
              break;
            default:
              windowSaver.hide();
          }          
        } else {
          switch(qx.core.Init.getApplication().getPlayArea().getViewMode()) {
            case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense:
            case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupBase:
              windowSaver.update();
              windowSaver.show();
              break;
            default:
              windowSaver.hide();
          }
        }
      }
    }

    function tafs_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tafs_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tafs_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tafs_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tafsScript = document.createElement("script");
  tafsScript.innerHTML = "(" + tafs_main.toString() + ")();";
  tafsScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tafsScript);
  }
})();



//-------------------Maelstrom--------------------//

(function () {
  var MaelstromTools_main = function () {
    try {
      function CCTAWrapperIsInstalled() {
        return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
      }

      function createMaelstromTools() {
        console.log('MaelstromTools loaded');

        qx.Class.define("MaelstromTools.Language", {
          type: "singleton",
          extend: qx.core.Object,
          construct: function (language) {
            this.Languages = ['de', 'pt', 'fr', 'tr']; // en is default, not needed in here!
            if (language != null) {
              this.MyLanguage = language;
            }
          },
          members: {
            MyLanguage: "en",
            Languages: null,
            Data: null,

            loadData: function (language) {
              var l = this.Languages.indexOf(language);

              if (l < 0) {
                this.Data = null;
                return;
              }

              this.Data = new Object();
              this.Data["Collect all packages"] = ["Alle Pakete einsammeln", "Recolher todos os pacotes", "Récupérez tous les paquets", "Tüm paketleri topla"][l];
              this.Data["Overall production"] = ["Produktionsübersicht", "Produção global", "La production globale", "Genel üretim"][l];
              this.Data["Army overview"] = ["Truppenübersicht", "Vista Geral de Exército", "Armée aperçu", "Ordu önizlemesi"][l];
              this.Data["Base resources"] = ["Basis Ressourcen", "Recursos base", "ressources de base", "Üs önizlemesi"][l];
              this.Data["Main menu"] = ["Hauptmenü", "Menu Principal", "menu principal", "Ana menü"][l];
              this.Data["Repair all units"] = ["Alle Einheiten reparieren", "Reparar todas as unidades", "Réparer toutes les unités", "Tüm üniteleri onar"][l];
              this.Data["Repair all defense buildings"] = ["Alle Verteidigungsgebäude reparieren", "Reparar todos os edifícios de defesa", "Réparer tous les bâtiments de défense", "Tüm savunma binalarını onar"][l];
              this.Data["Repair all buildings"] = ["Alle Gebäurde reparieren", "Reparar todos os edifícios", "Réparer tous les bâtiments", "Tüm binaları onar"][l];
              this.Data["Base status overview"] = ["Basisübersicht", "Estado geral da base", "aperçu de l'état de base", "Üs durumu önizlemesi"][l];
              this.Data["Upgrade priority overview"] = ["Upgrade Übersicht", "Prioridade de upgrades", "aperçu des priorités de mise à niveau", "Yükseltme önceliği önizlemesi"][l];
              this.Data["MaelstromTools Preferences"] = ["MaelstromTools Einstellungen", "Preferências de MaelstromTools", "Préférences MaelstromTools", "MaelstromTools Ayarları"][l];
              this.Data["Options"] = ["Einstellungen", "Opções", "Options", "Seçenekler"][l];
              this.Data["Target out of range, no resource calculation possible"] = ["Ziel nicht in Reichweite, kann die plünderbaren Ressourcen nicht berechnen", "Alvo fora do alcance, não é possivel calcular os recursos", "Cible hors de portée, pas de calcul de ressources possible",
     "Hedef menzil dışında, kaynak hesaplaması olanaksız"][l];
              this.Data["Lootable resources"] = ["Plünderbare Ressourcen", "Recursos roubáveis", "Ressources à piller", "Yağmalanabilir kaynaklar"][l];
              this.Data["per CP"] = ["pro KP", "por PC", "par PC", "KP başına"][l];
              this.Data["2nd run"] = ["2. Angriff", "2º ataque", "2° attaque", "2. saldırı"][l];
              this.Data["3rd run"] = ["3. Angriff", "3º ataque", "3° attaque", "3. saldırı"][l];
              this.Data["Calculating resources..."] = ["Berechne plünderbare Ressourcen...", "A calcular recursos...", "calcul de ressources ...", "Kaynaklar hesaplanıyor..."][l];
              this.Data["Next MCV"] = ["MBF", "MCV", "VCM"][l];
              this.Data["Show time to next MCV"] = ["Zeige Zeit bis zum nächsten MBF", "Mostrar tempo restante até ao próximo MCV", "Afficher l'heure pour le prochain VCM ", "Sırdaki MCV için gereken süreyi göster"][l];
              this.Data["Show lootable resources (restart required)"] = ["Zeige plünderbare Ressourcen (Neustart nötig)", "Mostrar recursos roubáveis (é necessário reiniciar)", "Afficher les ressources fouiller (redémarrage nécessaire)", "Yağmalanabilir kaynakları göster (yeniden başlatma gerekli)"][l];
              this.Data["Use dedicated Main Menu (restart required)"] = ["Verwende extra Hauptmenü (Neustart nötig)", "Usar botão para o Menu Principal (é necessário reiniciar)", "Utiliser dédiée du menu principal (redémarrage nécessaire)", "Ana menü tuşunu kullan (yeniden başlatma gerekli)"][l];
              this.Data["Autocollect packages"] = ["Sammle Pakete automatisch", "Auto recolher pacotes", "paquets autocollecté", "Paketleri otomatik topla"][l];
              this.Data["Autorepair units"] = ["Repariere Einheiten automatisch", "Auto reparar o exército", "unités autoréparé", "Üniteleri otomatik onar"][l];
              this.Data["Autorepair defense (higher prio than buildings)"] = ["Repariere Verteidigung automatisch (höhere Prio als Gebäude)", "Auto reparar defesa (maior prioridade do que os edifícios)", "réparation automatique la défense (priorité plus élevé que les bâtiments) ", "Savunmayı otomatik onar (binalardan daha yüksek öncelikli olarak)"][l];
              this.Data["Autorepair buildings"] = ["Repariere Gebäude automatisch", "Auto reparar edifícios", "bâtiments autoréparé", "Binaları otomatik onar"][l];
              this.Data["Automatic interval in minutes"] = ["Auto-Intervall in Minuten", "Intervalo de tempo automático (em minutos)", "intervalle automatique en quelques minutes", "Otomatik toplama aralığı (dk)"][l];
              this.Data["Apply changes"] = ["Speichern", "Confirmar", "Appliquer changements", "Uygula"][l];
              this.Data["Discard changes"] = ["Abbrechen", "Cancelar", "Annuler changements", "İptal"][l];
              this.Data["Reset to default"] = ["Auf Standard zurücksetzen", "Definições padrão", "Réinitialiser", "Sıfırla"][l];
              this.Data["Continuous"] = ["Kontinuierlich", "Contínua", "continue", "Sürekli"][l];
              this.Data["Bonus"] = ["Pakete", "Bónus", "Bonus", "Bonus"][l];
              this.Data["POI"] = ["POI", "POI", "POI", "POI"][l];
              this.Data["Total / h"] = ["Gesamt / h", "Total / h", "Total / h", "Toplam / sa."][l];
              this.Data["Repaircharges"] = ["Reparaturzeiten", "Custo de reparação", "frais de réparation", "Onarım maliyeti"][l];
              this.Data["Repairtime"] = ["Max. verfügbar", "Tempo de reparação", "Temps de réparation", "Onarım süresi"][l];
              this.Data["Attacks"] = ["Angriffe", "Ataques", "Attaques", "Saldırılar"][l];
              this.Data[MaelstromTools.Statics.Infantry] = ["Infanterie", "Infantaria", "Infanterie", "Piyade"][l];
              this.Data[MaelstromTools.Statics.Vehicle] = ["Fahrzeuge", "Veículos", "Vehicule", "Motorlu B."][l];
              this.Data[MaelstromTools.Statics.Aircraft] = ["Flugzeuge", "Aeronaves", "Aviation", "Hava A."][l];
              this.Data[MaelstromTools.Statics.Tiberium] = ["Tiberium", "Tibério", "Tiberium", "Tiberium"][l];
              this.Data[MaelstromTools.Statics.Crystal] = ["Kristalle", "Cristal", "Cristal", "Kristal"][l];
              this.Data[MaelstromTools.Statics.Power] = ["Strom", "Potência", "Energie", "Güç"][l];
              this.Data[MaelstromTools.Statics.Dollar] = ["Credits", "Créditos", "Crédit", "Kredi"][l];
              this.Data[MaelstromTools.Statics.Research] = ["Forschung", "Investigação", "Recherche", "Araştırma"][l];
              this.Data["Base"] = ["Basis", "Base", "Base", "Üs"][l];
              this.Data["Defense"] = ["Verteidigung", "Defesa", "Défense", "Savunma"][l];
              this.Data["Army"] = ["Armee", "Exército", "Armée", "Ordu"][l];
              this.Data["Level"] = ["Stufe", "Nível", "Niveau", "Seviye"][l];
              this.Data["Buildings"] = ["Gebäude", "Edifícios", "Bâtiments", "Binalar"][l];
              this.Data["Health"] = ["Leben", "Vida", "Santé", "Sağlık"][l];
              this.Data["Units"] = ["Einheiten", "Unidades", "Unités", "Üniteler"][l];
              this.Data["Hide Mission Tracker"] = ["Missionsfenster ausblenden", "Esconder janela das Missões", "Cacher la fenêtre de mission", "Görev İzleyicisini Gizle"][l];
              this.Data["none"] = ["keine", "nenhum", "aucun", "hiçbiri"][l];
              this.Data["Cooldown"] = ["Cooldown", "Relocalização", "Recharge", "Cooldown"][l];
              this.Data["Protection"] = ["Geschützt bis", "Protecção", "Protection", "Koruma"][l];
              this.Data["Available weapon"] = ["Verfügbare Artillerie", "Apoio disponível", "arme disponible", "Mevcut silah"][l];
              this.Data["Calibrated on"] = ["Kalibriert auf", "Calibrado em", "Calibré sur ", "Kalibreli"][l];
              this.Data["Total resources"] = ["Gesamt", "Total de recursos", "Ressources totales", "Toplam kaynaklar"][l];
              this.Data["Max. storage"] = ["Max. Kapazität", "Armazenamento Máx.", "Max. de stockage", "Maks. Depo"][l];
              this.Data["Storage full!"] = ["Lager voll!", "Armazenamento cheio!", "Stockage plein", "Depo dolu!"][l];
              this.Data["Storage"] = ["Lagerstand", "Armazenamento", "Stockage", "Depo"][l];
              this.Data["display only top buildings"] = ["Nur Top-Gebäude anzeigen", "Mostrar apenas melhores edifícios", "afficher uniquement les bâtiments principaux", "yalnızca en iyi binaları göster"][l];
              this.Data["display only affordable buildings"] = ["Nur einsetzbare Gebäude anzeigen", "Mostrar apenas edíficios acessíveis", "afficher uniquement les bâtiments abordables", "yalnızca satın alınabilir binaları göster"][l];
              this.Data["City"] = ["Stadt", "Base", "Base", "Şehir"][l];
              this.Data["Type (coord)"] = ["Typ (Koord.)", "Escrever (coord)", "Type (coord)", "Tip (koord.)"][l];
              this.Data["to Level"] = ["Auf Stufe", "para nível", "à Niveau ", "Seviye için"][l];
              this.Data["Gain/h"] = ["Zuwachs/h", "Melhoria/h", "Gain / h", "Kazanç / sa."][l];
              this.Data["Factor"] = ["Faktor", "Factor", "Facteur", "Faktör"][l];
              this.Data["Tib/gain"] = ["Tib./Zuwachs", "Tib/melhoria", "Tib / gain", "Tib/Kazanç"][l];
              this.Data["Pow/gain"] = ["Strom/Zuwachs", "Potencia/melhoria", "Puissance / Gain", "Güç/Kazanç"][l];
              this.Data["ETA"] = ["Verfügbar in", "Tempo restante", "Temps restant", "Kalan Zaman"][l];
              this.Data["Upgrade"] = ["Aufrüsten", "Upgrade", "Upgrade", "Yükselt"][l];
              this.Data["Powerplant"] = ["Kratfwerk", "Central de Energia", "Centrale", "Güç Santrali"][l];
              this.Data["Refinery"] = ["Raffinerie", "Refinaria", "Raffinerie", "Rafineri"][l];
              this.Data["Harvester"] = ["Sammler", "Harvester", "Collecteur", "Biçerdöver"][l];
              this.Data["Silo"] = ["Silo", "Silo", "Silo", "Silo"][l];
              this.Data["Accumulator"] = ["Akkumulator", "Acumulador", "Accumulateur", "Akümülatör"][l];
              this.Data["Calibrate support"] = ["Artillerie kalibrieren", "Calibrar apoio", "Calibrer soutien", "Takviyeyi kalibre et"][l];
              this.Data["Access"] = ["Öffne", "Aceder", "Accès ", "Aç"][l];
              this.Data["Focus on"] = ["Zentriere auf", "Concentrar em", "Centré sur", "Odaklan"][l];
              this.Data["Possible attacks from this base (available CP)"] = ["Mögliche Angriffe (verfügbare KP)", "Possible attacks from this base (available CP)","Possible attacks from this base (available CP)", "Bu üsten yapılması mümkün olan saldırılar (mevcut KP)"][l];
              //this.Data[""] = [""][l];
            },
            get: function (ident) {
              return this.gt(ident);
            },
            gt: function (ident) {
              if (!this.Data || !this.Data[ident]) {
                /*if(!parseInt(ident.substr(0, 1), 10) && ident != "0") {
                  console.log("missing language data: " + ident);
                }*/
                return ident;
              }
              return this.Data[ident];
            }
          }
        }),

        // define Base
        qx.Class.define("MaelstromTools.Base", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            /* Desktop */
            timerInterval: 1500,
            mainTimerInterval: 5000,
            lootStatusInfoInterval: null,
            images: null,
            mWindows: null,
            mainMenuWindow: null,

            itemsOnDesktop: null,
            itemsOnDesktopCount: null,
            itemsInMainMenu: null,
            itemsInMainMenuCount: null,
            buttonCollectAllResources: null,
            buttonRepairAllUnits: null,
            buttonRepairAllBuildings: null,

            lootWidget: null,

            initialize: function () {
              try {
                //console.log(qx.locale.Manager.getInstance().getLocale());
                Lang.loadData(qx.locale.Manager.getInstance().getLocale());
                //console.log("Client version: " + MaelstromTools.Wrapper.GetClientVersion());
                this.itemsOnDesktopCount = new Array();
                this.itemsOnDesktop = new Object();
                this.itemsInMainMenuCount = new Array();
                this.itemsInMainMenu = new Object();

                var fileManager = ClientLib.File.FileManager.GetInstance();
                //ui/icons/icon_mainui_defense_button
                //ui/icons/icon_mainui_base_button
                //ui/icons/icon_army_points
                //icon_def_army_points
                var factionText = ClientLib.Base.Util.GetFactionGuiPatchText();
                this.createNewImage(MaelstromTools.Statics.Tiberium, "ui/common/icn_res_tiberium.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Crystal, "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Power, "ui/common/icn_res_power.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Dollar, "ui/common/icn_res_dollar.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Research, "ui/common/icn_res_research.png", fileManager);
                this.createNewImage("Sum", "ui/common/icn_build_slots.png", fileManager);
                this.createNewImage("AccessBase", "ui/" + factionText + "/icons/icon_mainui_enterbase.png", fileManager);
                this.createNewImage("FocusBase", "ui/" + factionText + "/icons/icon_mainui_focusbase.png", fileManager);
                this.createNewImage("Packages", "ui/" + factionText + "/icons/icon_collect_packages.png", fileManager);
                this.createNewImage("RepairAllUnits", "ui/" + factionText + "/icons/icon_army_points.png", fileManager);
                this.createNewImage("RepairAllBuildings", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("ResourceOverviewMenu", "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage("ProductionMenu", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("RepairTimeMenu", "ui/" + factionText + "/icons/icon_repair_all_button.png", fileManager);
                this.createNewImage("Crosshair", "ui/icons/icon_support_tnk_white.png", fileManager);
                this.createNewImage("UpgradeBuilding", "ui/" + factionText + "/icons/icon_building_detail_upgrade.png", fileManager);

                this.createNewWindow("MainMenu", "R", 125, 140, 120, 100, "B");
                this.createNewWindow("Production", "L", 120, 60, 340, 140);
                this.createNewWindow("RepairTime", "L", 120, 60, 340, 140);
                this.createNewWindow("ResourceOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("BaseStatusOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("Preferences", "L", 120, 60, 440, 140);
                this.createNewWindow("UpgradePriority", "L", 120, 60, 870, 400);

                if (!this.mainMenuWindow) {
                  this.mainMenuWindow = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
                    //backgroundColor: "#303030",
                    padding: 5,
                    paddingRight: 0
                  });
                  if (MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.mainMenuWindow.setPlaceMethod("mouse");
                    this.mainMenuWindow.setPosition("top-left");
                  } else {
                    this.mainMenuWindow.setPlaceMethod("widget");
                    this.mainMenuWindow.setPosition("bottom-right");
                    this.mainMenuWindow.setAutoHide(false);
                    this.mainMenuWindow.setBackgroundColor("transparent");
                    this.mainMenuWindow.setShadow(null);
                    this.mainMenuWindow.setDecorator(new qx.ui.decoration.Background());
                  }
                }

                var desktopPositionModifier = 0;

                this.buttonCollectAllResources = this.createDesktopButton(Lang.gt("Collect all packages"), "Packages", true, this.desktopPosition(desktopPositionModifier));
                this.buttonCollectAllResources.addListener("execute", this.collectAllPackages, this);

                var openProductionWindowButton = this.createDesktopButton(Lang.gt("Overall production"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openProductionWindowButton.addListener("execute", function () {
                  window.MaelstromTools.Production.getInstance().openWindow("Production", Lang.gt("Overall production"));
                }, this);

                var openResourceOverviewWindowButton = this.createDesktopButton(Lang.gt("Base resources"), "ResourceOverviewMenu", false, this.desktopPosition(desktopPositionModifier));
                openResourceOverviewWindowButton.addListener("execute", function () {
                  window.MaelstromTools.ResourceOverview.getInstance().openWindow("ResourceOverview", Lang.gt("Base resources"));
                }, this);

                desktopPositionModifier++;
                var openMainMenuButton = this.createDesktopButton(Lang.gt("Main menu"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openMainMenuButton.addListener("click", function (e) {
                  this.mainMenuWindow.placeToMouse(e);
                  this.mainMenuWindow.show();
                }, this);

                this.buttonRepairAllUnits = this.createDesktopButton(Lang.gt("Repair all units"), "RepairAllUnits", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllUnits.addListener("execute", this.repairAllUnits, this);

                this.buttonRepairAllBuildings = this.createDesktopButton(Lang.gt("Repair all buildings"), "RepairAllBuildings", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllBuildings.addListener("execute", this.repairAllBuildings, this);

                var openRepairTimeWindowButton = this.createDesktopButton(Lang.gt("Army overview"), "RepairTimeMenu", false, this.desktopPosition(desktopPositionModifier));
                openRepairTimeWindowButton.addListener("execute", function () {
                  window.MaelstromTools.RepairTime.getInstance().openWindow("RepairTime", Lang.gt("Army overview"));
                }, this);

                var openBaseStatusOverview = this.createDesktopButton(Lang.gt("Base status overview"), "Crosshair", false, this.desktopPosition(desktopPositionModifier));
                openBaseStatusOverview.addListener("execute", function () {
                  window.MaelstromTools.BaseStatus.getInstance().openWindow("BaseStatusOverview", Lang.gt("Base status overview"));
                }, this);

                desktopPositionModifier++;
                var openHuffyUpgradeOverview = this.createDesktopButton(Lang.gt("Upgrade priority overview"), "UpgradeBuilding", false, this.desktopPosition(desktopPositionModifier));
                openHuffyUpgradeOverview.addListener("execute", function () {
                  window.HuffyTools.UpgradePriorityGUI.getInstance().openWindow("UpgradePriority", Lang.gt("Upgrade priority overview"));
                }, this);

                desktopPositionModifier++;
                var preferencesButton = new qx.ui.form.Button(Lang.gt("Options")).set({
                  appearance: "button-text-small",
                  width: 100,
                  minWidth: 100,
                  maxWidth: 100
                });
                preferencesButton.setUserData("desktopPosition", this.desktopPosition(desktopPositionModifier));
                preferencesButton.addListener("execute", function () {
                  window.MaelstromTools.Preferences.getInstance().openWindow("Preferences", Lang.gt("MaelstromTools Preferences"), true);
                }, this);

                if (MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop("MainMenu", openMainMenuButton);
                }
                this.addToMainMenu("ResourceOverviewMenu", openResourceOverviewWindowButton);
                this.addToMainMenu("ProductionMenu", openProductionWindowButton);
                this.addToMainMenu("BaseStatusMenu", openBaseStatusOverview);
                this.addToMainMenu("RepairTimeMenu", openRepairTimeWindowButton);
                this.addToMainMenu("UpgradeBuilding", openHuffyUpgradeOverview);

                this.addToMainMenu("PreferencesMenu", preferencesButton);

                if (!MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.mainMenuWindow.show();
                  var target = qx.core.Init.getApplication().getOptionsBar(); //getServerBar(); //qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_APPOINTMENTS);
                  this.mainMenuWindow.placeToWidget(target, true);
                }

                webfrontend.gui.chat.ChatWidget.recvbufsize = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);
                this.runSecondlyTimer();
                this.runMainTimer();
                this.runAutoCollectTimer();
              } catch (e) {
                console.log("MaelstromTools.initialize: ", e);
              }
            },

            desktopPosition: function (modifier) {
              if (!modifier) modifier = 0;
              return modifier;
            },

            createDesktopButton: function (title, imageName, isNotification, desktopPosition) {
              try {
                if (!isNotification) {
                  isNotification = false;
                }
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                var desktopButton = new qx.ui.form.Button(null, this.images[imageName]).set({
                  toolTipText: title,
                  width: 50,
                  height: 40,
                  maxWidth: 50,
                  maxHeight: 40,
                  appearance: (isNotification ? "button-standard-nod" : "button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
                  center: true
                });

                desktopButton.setUserData("isNotification", isNotification);
                desktopButton.setUserData("desktopPosition", desktopPosition);
                return desktopButton;
              } catch (e) {
                console.log("MaelstromTools.createDesktopButton: ", e);
              }
            },

            createNewImage: function (name, path, fileManager) {
              try {
                if (!this.images) {
                  this.images = new Object();
                }
                if (!fileManager) {
                  return;
                }

                this.images[name] = fileManager.GetPhysicalPath(path);
              } catch (e) {
                console.log("MaelstromTools.createNewImage: ", e);
              }
            },

            createNewWindow: function (name, align, x, y, w, h, alignV) {
              try {
                if (!this.mWindows) {
                  this.mWindows = new Object();
                }
                this.mWindows[name] = new Object();
                this.mWindows[name]["Align"] = align;
                this.mWindows[name]["AlignV"] = alignV;
                this.mWindows[name]["x"] = x;
                this.mWindows[name]["y"] = y;
                this.mWindows[name]["w"] = w;
                this.mWindows[name]["h"] = h;
              } catch (e) {
                console.log("MaelstromTools.createNewWindow: ", e);
              }
            },

            addToMainMenu: function (name, button) {
              try {
                /*if(!this.useDedicatedMainMenu) {
                  return;
                }*/
                if (this.itemsInMainMenu[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                var isNotification = button.getUserData("isNotification");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                if (!isNotification) {
                  isNotification = false;
                }

                if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop(name, button);
                } else {
                  if (!this.itemsInMainMenuCount[desktopPosition]) {
                    this.itemsInMainMenuCount[desktopPosition] = 0;
                  }
                  this.mainMenuWindow.add(button, {
                    right: 5 + (52 * this.itemsInMainMenuCount[desktopPosition]),
                    top: 0 + (42 * (desktopPosition)) //bottom: 0 - (42 * (desktopPosition - 1))
                  });

                  this.itemsInMainMenu[name] = button;
                  this.itemsInMainMenuCount[desktopPosition]++;
                }
              } catch (e) {
                console.log("MaelstromTools.addToMainMenu: ", e);
              }
            },

            removeFromMainMenu: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                if (this.itemsOnDesktop[name] != null) {
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!isNotification) {
                    isNotification = false;
                  }
                  if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.removeFromDesktop(name, rearrange);
                  }
                } else if (this.itemsInMainMenu[name] != null) {
                  var desktopPosition = this.itemsInMainMenu[name].getUserData("desktopPosition");
                  var isNotification = this.itemsInMainMenu[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  this.mainMenuWindow.remove(this.itemsInMainMenu[name]);
                  this.itemsInMainMenu[name] = null;
                  this.itemsInMainMenuCount[desktopPosition]--;

                  if (rearrange && this.itemsInMainMenu[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsInMainMenu[itemName] == null) {
                        continue;
                      }
                      if (!isNotification) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsInMainMenu[itemName];
                      this.removeFromMainMenu(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            addToDesktop: function (name, button) {
              try {
                if (this.itemsOnDesktop[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }

                if (!this.itemsOnDesktopCount[desktopPosition]) {
                  this.itemsOnDesktopCount[desktopPosition] = 0;
                }

                var app = qx.core.Init.getApplication();
                //var navBar = app.getNavigationBar();

                // console.log("add to Desktop at pos: " + this.itemsOnDesktopCount);
                app.getDesktop().add(button, {
                  //right: navBar.getBounds().width + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: 42 * (desktopPosition - 1)
                  right: 5 + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: this.initialAppointmentBarHeight + 125 + (42 * (desktopPosition - 1))
                  bottom: 140 - (42 * (desktopPosition - 1))
                });

                this.itemsOnDesktop[name] = button;
                this.itemsOnDesktopCount[desktopPosition]++;
              } catch (e) {
                console.log("MaelstromTools.addToDesktop: ", e);
              }
            },

            removeFromDesktop: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                var app = qx.core.Init.getApplication();

                if (this.itemsOnDesktop[name] != null) {
                  var desktopPosition = this.itemsOnDesktop[name].getUserData("desktopPosition");
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  app.getDesktop().remove(this.itemsOnDesktop[name]);
                  this.itemsOnDesktop[name] = null;
                  this.itemsOnDesktopCount[desktopPosition]--;

                  if (rearrange && this.itemsOnDesktopCount[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsOnDesktop[itemName] == null) {
                        continue;
                      }
                      if (!this.itemsOnDesktop[itemName].getUserData("isNotification")) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsOnDesktop[itemName];
                      this.removeFromDesktop(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            runSecondlyTimer: function () {
              try {
                this.calculateCostsForNextMCV();

                var self = this;
                window.setTimeout(function () {
                  self.runSecondlyTimer();
                }, 1000);
              } catch (e) {
                console.log("MaelstromTools.runSecondlyTimer: ", e);
              }
            },

            runMainTimer: function () {
              try {
                this.checkForPackages();
                if (CCTAWrapperIsInstalled()) {
                  this.checkRepairAllUnits();
                  this.checkRepairAllBuildings();
                }

                var missionTracker = typeof (qx.core.Init.getApplication().getMissionsBar) === 'function' ? qx.core.Init.getApplication().getMissionsBar() : qx.core.Init.getApplication().getMissionTracker(); //fix for PerforceChangelist>=376877
                if (MT_Preferences.Settings.autoHideMissionTracker) {
                  if (missionTracker.isVisible()) {
                    missionTracker.hide();
                  }
                  if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                    if (qx.core.Init.getApplication().getMissionsBar().getSizeHint().height != 0) {
                      qx.core.Init.getApplication().getMissionsBar().getSizeHint().height = 0;
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                } else {
                  if (!missionTracker.isVisible()) {
                    missionTracker.show();
                    if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                      qx.core.Init.getApplication().getMissionsBar().initHeight();
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                }
                
                var self = this;
                window.setTimeout(function () {
                  self.runMainTimer();
                }, this.mainTimerInterval);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            runAutoCollectTimer: function () {
              try {
                //console.log("runAutoCollectTimer ", MT_Preferences.Settings.AutoCollectTimer);
                if (!CCTAWrapperIsInstalled()) return; // run timer only then wrapper is running
                if (this.checkForPackages() && MT_Preferences.Settings.autoCollectPackages) {
                  this.collectAllPackages();
                }
                if (this.checkRepairAllUnits() && MT_Preferences.Settings.autoRepairUnits) {
                  this.repairAllUnits();
                }
                if (this.checkRepairAllBuildings() && MT_Preferences.Settings.autoRepairBuildings) {
                  this.repairAllBuildings();
                }

                var self = this;
                window.setTimeout(function () {
                  self.runAutoCollectTimer();
                }, MT_Preferences.Settings.AutoCollectTimer * 60000);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            openWindow: function (windowObj, windowName, skipMoveWindow) {
              try {
                if (!windowObj.isVisible()) {
                  if (windowName == "MainMenu") {
                    windowObj.show();
                  } else {
                    if (!skipMoveWindow) {
                      this.moveWindow(windowObj, windowName);
                    }
                    windowObj.open();
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.openWindow: ", e);
              }
            },

            moveWindow: function (windowObj, windowName) {
              try {
                var x = this.mWindows[windowName]["x"];
                var y = this.mWindows[windowName]["y"];
                if (this.mWindows[windowName]["Align"] == "R") {
                  x = qx.bom.Viewport.getWidth(window) - this.mWindows[windowName]["x"];
                }
                if (this.mWindows[windowName]["AlignV"] == "B") {
                  y = qx.bom.Viewport.getHeight(window) - this.mWindows[windowName]["y"] - windowObj.height;
                }
                windowObj.moveTo(x, y);
                if (windowName != "MainMenu") {
                  windowObj.setHeight(this.mWindows[windowName]["h"]);
                  windowObj.setWidth(this.mWindows[windowName]["w"]);
                }
              } catch (e) {
                console.log("MaelstromTools.moveWindow: ", e);
              }
            },

            checkForPackages: function () {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    this.addToMainMenu("CollectAllResources", this.buttonCollectAllResources);
                    return true;
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkForPackages: ", e);
                return false;
              }
            },

            collectAllPackages: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    if (MT_Cache.CityCount <= 1) {
                      var buildings = ncity.get_Buildings().d;
                      for (var x in buildings) {
                        var building = buildings[x];
                        if (building.get_ProducesPackages() && building.get_ReadyToCollect()) {
                          ClientLib.Net.CommunicationManager.GetInstance().SendCommand("CollectResource",{cityid:ncity.get_Id(), posX:building.get_CoordX(),posY:building.get_CoordY()}, null, null, true);
                        }
                      }
                    } else {
                      ncity.CollectAllResources();
                    }
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
              } catch (e) {
                console.log("MaelstromTools.collectAllPackages: ", e);
              }
            },

            checkRepairAll: function (visMode, buttonName, button) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    this.addToMainMenu(buttonName, button);
                    return true;
                  }
                }

                this.removeFromMainMenu(buttonName);
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkRepairAll: ", e);
                return false;
              }
            },

            checkRepairAllUnits: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits", this.buttonRepairAllUnits);
            },

            checkRepairAllBuildings: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings", this.buttonRepairAllBuildings);
            },

            repairAll: function (visMode, buttonName) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    MaelstromTools.Wrapper.RepairAll(ncity, visMode);
                  }

                }
                this.removeFromMainMenu(buttonName);
              } catch (e) {
                console.log("MaelstromTools.repairAll: ", e);
              }
            },

            //ClientLib.Data.City.prototype.get_CityRepairData
            //ClientLib.Data.CityRepair.prototype.CanRepairAll
            //ClientLib.Data.CityRepair.prototype.RepairAll
            repairAllUnits: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits");
              } catch (e) {
                console.log("MaelstromTools.repairAllUnits: ", e);
              }
            },

            repairAllBuildings: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings");
              } catch (e) {
                console.log("MaelstromTools.repairAllBuildings: ", e);
              }
            },

            updateLoot: function (ident, visCity, widget) {
              try {
                clearInterval(this.lootStatusInfoInterval);
                if (!MT_Preferences.Settings.showLoot) {
                  if (this.lootWidget[ident]) {
                    this.lootWidget[ident].removeAll();
                  }
                  return;
                }

                var baseLoadState = MT_Cache.updateLoot(visCity);
                if (baseLoadState == -2) { // base already cached and base not changed
                  return;
                }

                if (!this.lootWidget) {
                  this.lootWidget = new Object();
                }
                if (!this.lootWidget[ident]) {
                  this.lootWidget[ident] = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                  this.lootWidget[ident].setTextColor("white");
                  widget.add(this.lootWidget[ident]);
                }
                var lootWidget = this.lootWidget[ident];

                var rowIdx = 1;
                var colIdx = 1;
                lootWidget.removeAll();
                switch (baseLoadState) {
                  case -1:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Target out of range, no resource calculation possible", null, null, 'bold', null);
                      break;
                    }
                  case 1:
                    {
                      var Resources = MT_Cache.SelectedBaseResources;
                      this.createResourceLabels(lootWidget, ++rowIdx, "Possible attacks from this base (available CP)", Resources, - 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "Lootable resources", Resources, 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "per CP", Resources, 1 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "2nd run", Resources, 2 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "3rd run", Resources, 3 * Resources.CPNeeded);
                      break;
                    }
                  default:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Calculating resources...", null, null, 'bold', null);
                      this.lootStatusInfoInterval = setInterval(function () {
                        MaelstromTools.Base.getInstance().updateLoot(ident, visCity, widget);
                      }, 100);
                      break;
                    }
                }
              } catch (e) {
                console.log("MaelstromTools.updateLoot: ", e);
              }
            },

            createResourceLabels: function (lootWidget, rowIdx, Label, Resources, Modifier) {
              var colIdx = 1;
              var font = (Modifier > 1 ? null : 'bold');

              if (Modifier == -1 && Resources.CPNeeded > 0) {
                Label = Lang.gt(Label) + ": " + Math.floor(ClientLib.Data.MainData.GetInstance().get_Player().GetCommandPointCount() / Resources.CPNeeded);
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Label, null, 'left', font, null, 9);
                return;
              }
              colIdx = 1;
              if (Modifier > 0) {
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Lang.gt(Label) + ":", null, null, font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Research));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Research] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Tiberium] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Crystal] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Dollar));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Dollar] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage("Sum"));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources["Total"] / Modifier), 50, 'right', font);
              }
            },

            mcvPopup: null,
            mcvPopupX : 0,
            mcvPopupY : 0,
            mcvTimerLabel: null,
            calculateCostsForNextMCV: function () {
              try {
                if (!MT_Preferences.Settings.showCostsForNextMCV) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }
                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                var cw = player.get_Faction();
                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                var cr = player.get_PlayerResearch();
                var cd = cr.GetResearchItemFomMdbId(cj);
                if (cd == null) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                if (!this.mcvPopup) {
                  this.mcvPopup = new qx.ui.window.Window("").set({
                    contentPadding : 0,
                    showMinimize : false,
                    showMaximize : false,
                    showClose : false,
                    resizable : false
                  });
                  this.mcvPopup.setLayout(new qx.ui.layout.VBox());
                  this.mcvPopup.addListener("move", function (e) {
                    var base = MaelstromTools.Base.getInstance();
                    var size = qx.core.Init.getApplication().getRoot().getBounds();
                    var value = size.width - e.getData().left;
                    base.mcvPopupX = value < 0 ? 150 : value;
                    value = size.height - e.getData().top;
                    base.mcvPopupY = value < 0 ? 70 : value;
                    MaelstromTools.LocalStorage.set("mcvPopup", {
                      x : base.mcvPopupX,
                      y : base.mcvPopupY
                    });
                  });
                  var font = qx.bom.Font.fromString('bold').set({
                    size: 20
                  });

                  this.mcvTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: 'red',
                    width: 155,
                    textAlign: 'center',
                    marginBottom : 5
                  });
                  this.mcvPopup.add(this.mcvTimerLabel);
                  var serverBar = qx.core.Init.getApplication().getServerBar().getBounds();
                  var pos = MaelstromTools.LocalStorage.get("mcvPopup", {
                      x : serverBar.width + 150,
                      y : 70
                    });
                  this.mcvPopupX = pos.x;
                  this.mcvPopupY = pos.y;
                  this.mcvPopup.open();
                }
                var size = qx.core.Init.getApplication().getRoot().getBounds();
                this.mcvPopup.moveTo(size.width - this.mcvPopupX, size.height - this.mcvPopupY);

                var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                var resourcesNeeded = new Array();
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                //var currentResearchPoints = player.get_ResearchPoints();

                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;

                if (creditGrowthPerHour == 0 || creditTimeLeftInHours <= 0) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                this.mcvPopup.setCaption(Lang.gt("Next MCV") + " ($ " + MaelstromTools.Wrapper.FormatNumbersCompact(creditsNeeded) + ")");
                this.mcvTimerLabel.setValue(MaelstromTools.Wrapper.FormatTimespan(creditTimeLeftInHours * 60 * 60));

                if (!this.mcvPopup.isVisible()) {
                  this.mcvPopup.open();
                }
              } catch (e) {
                console.log("calculateCostsForNextMCV", e);
              }
            }
          }
        });

        // define Preferences
        qx.Class.define("MaelstromTools.Preferences", {
          type: "singleton",
          extend: qx.core.Object,

          statics: {
            USEDEDICATEDMAINMENU: "useDedicatedMainMenu",
            AUTOCOLLECTPACKAGES: "autoCollectPackages",
            AUTOREPAIRUNITS: "autoRepairUnits",
            AUTOREPAIRBUILDINGS: "autoRepairBuildings",
            AUTOHIDEMISSIONTRACKER: "autoHideMissionTracker",
            AUTOCOLLECTTIMER: "AutoCollectTimer",
            SHOWLOOT: "showLoot",
            SHOWCOSTSFORNEXTMCV: "showCostsForNextMCV",
            CHATHISTORYLENGTH: "ChatHistoryLength"
          },

          members: {
            Window: null,
            Widget: null,
            Settings: null,
            FormElements: null,

            readOptions: function () {
              try {
                if (!this.Settings) {
                  this.Settings = new Object();
                }

                /*
                if(MaelstromTools.LocalStorage.get("useDedicatedMainMenu") == null) {
                  if(qx.bom.Viewport.getWidth(window) > 1800) {
                    this.Settings["useDedicatedMainMenu"] = false;
                  }
                } else {
                  this.Settings["useDedicatedMainMenu"] = (MaelstromTools.LocalStorage.get("useDedicatedMainMenu", 1) == 1);
                }*/
                this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRUNITS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 60);
                this.Settings[MaelstromTools.Preferences.SHOWLOOT] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWLOOT, 1) == 1);
                this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, 1) == 1);
                this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);

                if (!CCTAWrapperIsInstalled()) {
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = false;
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = false;
                  //this.Settings[MaelstromTools.Preferences.SHOWLOOT] = false;
                }
                //console.log(this.Settings);

              } catch (e) {
                console.log("MaelstromTools.Preferences.readOptions: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  //this.Window = new qx.ui.window.Window(WindowTitle).set({
                  this.Window = new webfrontend.gui.OverlayWindow().set({
                    autoHide: false,
                    title: WindowTitle,
                    minHeight: 350

                    //resizable: false,
                    //showMaximize:false,
                    //showMinimize:false,
                    //allowMaximize:false,
                    //allowMinimize:false,
                    //showStatusbar: false
                  });
                  this.Window.clientArea.setPadding(10);
                  this.Window.clientArea.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid().set({
                    spacingX: 5,
                    spacingY: 5
                  }));

                  //this.Widget.setTextColor("white");

                  this.Window.clientArea.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.setWidgetLabels();
                }
              } catch (e) {
                console.log("MaelstromTools.Preferences.openWindow: ", e);
              }
            },

            addFormElement: function (name, element) {
              this.FormElements[name] = element;
            },

            setWidgetLabels: function () {
              try {
                this.readOptions();

                this.FormElements = new Object();
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 1;

                var chkAutoHideMissionTracker = new qx.ui.form.CheckBox(Lang.gt("Hide Mission Tracker")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] == 1
                });
                var chkUseDedicatedMainMenu = new qx.ui.form.CheckBox(Lang.gt("Use dedicated Main Menu (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] == 1
                });
                var chkShowLoot = new qx.ui.form.CheckBox(Lang.gt("Show lootable resources (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWLOOT] == 1/*,
                  enabled: CCTAWrapperIsInstalled()*/
                });
                var chkCostsNextMCV = new qx.ui.form.CheckBox(Lang.gt("Show time to next MCV")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] == 1
                });
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoHideMissionTracker, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkUseDedicatedMainMenu, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkShowLoot, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkCostsNextMCV, 2);

                var chkAutoCollectPackages = new qx.ui.form.CheckBox(Lang.gt("Autocollect packages")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] == 1
                });
                var chkAutoRepairUnits = new qx.ui.form.CheckBox(Lang.gt("Autorepair units")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });
                var chkAutoRepairBuildings = new qx.ui.form.CheckBox(Lang.gt("Autorepair buildings")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });

                var spinnerChatHistoryLength = new qx.ui.form.Spinner().set({
                  minimum: 64,
                  maximum: 512,
                  value: this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Chat history length") + " (" + spinnerChatHistoryLength.getMinimum() + " - " + spinnerChatHistoryLength.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerChatHistoryLength);

                var spinnerAutoCollectTimer = new qx.ui.form.Spinner().set({
                  minimum: 5,
                  maximum: 60 * 6,
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Automatic interval in minutes") + " (" + spinnerAutoCollectTimer.getMinimum() + " - " + spinnerAutoCollectTimer.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerAutoCollectTimer);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoCollectPackages, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairUnits, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairBuildings, 2);

                var applyButton = new qx.ui.form.Button(Lang.gt("Apply changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                applyButton.addListener("execute", this.applyChanges, this);

                var cancelButton = new qx.ui.form.Button(Lang.gt("Discard changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                cancelButton.addListener("execute", function () {
                  this.Window.close();
                }, this);

                var resetButton = new qx.ui.form.Button(Lang.gt("Reset to default")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                resetButton.addListener("execute", this.resetToDefault, this);

                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, resetButton);
                colIdx = 1;
                MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, cancelButton);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, applyButton);

                this.addFormElement(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, chkAutoHideMissionTracker);
                this.addFormElement(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, chkUseDedicatedMainMenu);
                this.addFormElement(MaelstromTools.Preferences.SHOWLOOT, chkShowLoot);
                this.addFormElement(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, chkCostsNextMCV);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, chkAutoCollectPackages);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRUNITS, chkAutoRepairUnits);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, chkAutoRepairBuildings);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTTIMER, spinnerAutoCollectTimer);
                this.addFormElement(MaelstromTools.Preferences.CHATHISTORYLENGTH, spinnerChatHistoryLength);
              } catch (e) {
                console.log("MaelstromTools.Preferences.setWidgetLabels: ", e);
              }
            },

            applyChanges: function () {
              try {
                var autoRunNeeded = false;
                for (var idx in this.FormElements) {
                  var element = this.FormElements[idx];
                  if (idx == MaelstromTools.Preferences.AUTOCOLLECTTIMER) {
                    autoRunNeeded = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 0) != element.getValue());
                  }
                  if (idx == MaelstromTools.Preferences.CHATHISTORYLENGTH) {
                    webfrontend.gui.chat.ChatWidget.recvbufsize = element.getValue();
                  }
                  MaelstromTools.LocalStorage.set(idx, element.getValue());
                }
                this.readOptions();
                if (autoRunNeeded) {
                  MT_Base.runAutoCollectTimer();
                }
                this.Window.close();
              } catch (e) {
                console.log("MaelstromTools.Preferences.applyChanges: ", e);
              }
            },

            resetToDefault: function () {
              try {
                MaelstromTools.LocalStorage.clearAll();
                this.setWidgetLabels();
              } catch (e) {
                console.log("MaelstromTools.Preferences.resetToDefault: ", e);
              }
            }
          }
        });

        // define DefaultObject
        qx.Class.define("MaelstromTools.DefaultObject", {
          type: "abstract",
          extend: qx.core.Object,
          members: {
            Window: null,
            Widget: null,
            Cache: {}, //k null
            IsTimerEnabled: true,

            calc: function () {
              try {
                if (this.Window.isVisible()) {
                  this.updateCache();
                  this.setWidgetLabels();
                  if (this.IsTimerEnabled) {
                    var self = this;
                    window.setTimeout(function () {
                      self.calc();
                    }, MT_Base.timerInterval);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.calc: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  this.Window = new qx.ui.window.Window(WindowTitle).set({
                    resizable: false,
                    showMaximize: false,
                    showMinimize: false,
                    allowMaximize: false,
                    allowMinimize: false,
                    showStatusbar: false
                  });
                  this.Window.setPadding(10);
                  this.Window.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid());
                  this.Widget.setTextColor("white");

                  this.Window.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.calc();
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.openWindow: ", e);
              }
            }
          }
        });

        // define Production
        qx.Class.define("MaelstromTools.Production", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            updateCache: function (onlyForCity) {
              try {
                MT_Cache.updateCityCache();
                var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                //this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  if (onlyForCity != null && onlyForCity != cname) {
                    continue;
                  }
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (typeof (this.Cache[cname]) !== 'object') this.Cache[cname] = {};
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Tiberium]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Tiberium] = {}; // all have to be checked, 
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Crystal]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Crystal] = {}; // this.Cache[cname] can be created inside different namespaces
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Power]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Power] = {}; // like the RepairTime etc... without those objs
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Dollar]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Dollar] = {};

                  this.Cache[cname]["ProductionStopped"] = ncity.get_IsGhostMode();
                  this.Cache[cname]["PackagesStopped"] = (ncity.get_hasCooldown() || ncity.get_IsGhostMode());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false); // (production.d[ClientLib.Base.EResourceType.Tiberium]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium); //(production.d[ClientLib.Base.EResourceType.Tiberium]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false); //(production.d[ClientLib.Base.EResourceType.Crystal]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal); //(production.d[ClientLib.Base.EResourceType.Crystal]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Power]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false); //(production.d[ClientLib.Base.EResourceType.Power]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power); // (production.d[ClientLib.Base.EResourceType.Power]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["Delta"] = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["ExtraBonusDelta"] = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["POI"] = 0;
                  this.Cache[cname]["BaseLevel"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  if (onlyForCity != null && onlyForCity == cname) return this.Cache[cname];
                }
              } catch (e) {
                console.log("MaelstromTools.Production.updateCache: ", e);
              }
            },

            createProductionLabels2: function (rowIdx, colIdx, cityName, resourceType) {
              try {
                if (cityName == "-Total-") {
                  var Totals = Object();
                  Totals["Delta"] = 0;
                  Totals["ExtraBonusDelta"] = 0;
                  Totals["POI"] = 0;
                  Totals["Total"] = 0;

                  for (var cname in this.Cache) {
                    Totals["Delta"] += this.Cache[cname][resourceType]['Delta'];
                    Totals["ExtraBonusDelta"] += this.Cache[cname][resourceType]['ExtraBonusDelta'];
                    Totals["POI"] += this.Cache[cname][resourceType]['POI'];
                  }
                  Totals["Total"] = Totals['Delta'] + Totals['ExtraBonusDelta'] + Totals['POI'];

                  rowIdx++;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Delta']), 80, 'right', 'bold');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['ExtraBonusDelta']), 80, 'right', 'bold');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['POI']), 80, 'right', 'bold');
                  } else {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Total']), 80, 'right', 'bold');
                } else if (cityName == "-Labels-") {
                  MaelstromTools.Util.addImage(this.Widget, rowIdx++, colIdx, MaelstromTools.Util.getImage(resourceType));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Continuous", 100, 'left');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Bonus", 100, 'left');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "POI", 100, 'left');
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / BaseLevel", 100, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / h", 100, 'left');
                } else {
                  var cityCache = this.Cache[cityName];
                  if (rowIdx > 2) {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta']), 80, 'right', null, ((cityCache["ProductionStopped"] || cityCache[resourceType]['Delta'] == 0) ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['ExtraBonusDelta']), 80, 'right', null, ((cityCache["PackagesStopped"] || cityCache[resourceType]['ExtraBonusDelta'] == 0) ? "red" : "white"));
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['POI']), 80, 'right', null, (cityCache[resourceType]['POI'] == 0 ? "red" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact((cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']) / cityCache["BaseLevel"]), 80, 'right');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']), 80, 'right', 'bold');
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.Production.createProductionLabels2: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var rowIdx = 1;
                var colIdx = 1;

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Dollar);

                colIdx++;
                for (var cityName in this.Cache) {
                  rowIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, cityName, 80, 'right');

                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Tiberium);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Crystal);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Power);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Dollar);

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                }

                rowIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Total / h", 80, 'right', 'bold');

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Dollar);
              } catch (e) {
                console.log("MaelstromTools.Production.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define RepairTime
        qx.Class.define("MaelstromTools.RepairTime", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var RepLargest = '';

                  this.Cache[cname] = Object();
                  this.Cache[cname]["RepairTime"] = Object();
                  this.Cache[cname]["Repaircharge"] = Object();
                  this.Cache[cname]["Repaircharge"]["Smallest"] = 999999999;
                  this.Cache[cname]["RepairTime"]["Largest"] = 0;

                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                  this.Cache[cname]["RepairTime"]["Maximum"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);

                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft];
                  }

                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry];
                    RepLargest = "Infantry";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle];
                    RepLargest = "Vehicle";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft];
                    RepLargest = "Aircraft";
                  }

                  //PossibleAttacks and MaxAttacks fixes
                  var offHealth = ncity.GetOffenseConditionInPercent();
                  if (RepLargest !== '') {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = this.Cache[cname]["RepairTime"][RepLargest];
                    var i = Math.ceil(this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv); //fix
                    var j = this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv;
                    if (offHealth !== 100) { i--; i += '*';} // Decrease number of attacks by 1 when unit unhealthy. Additional visual info: asterisk when units aren't healthy
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = i;
                    var k = this.Cache[cname]["RepairTime"].Maximum / this.Cache[cname]["RepairTime"].LargestDiv;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = Math.ceil(k); //fix
                  } else {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = 0;
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = 0;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = 0;
                  }

                  var unitsData = ncity.get_CityUnitsData();
                  this.Cache[cname]["Base"] = Object();
                  this.Cache[cname]["Base"]["Level"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  this.Cache[cname]["Base"]["UnitLimit"] = ncity.GetBuildingSlotLimit(); //ncity.GetNumBuildings();
                  this.Cache[cname]["Base"]["TotalHeadCount"] = ncity.GetBuildingSlotCount();
                  this.Cache[cname]["Base"]["FreeHeadCount"] = this.Cache[cname]["Base"]["UnitLimit"] - this.Cache[cname]["Base"]["TotalHeadCount"];
                  this.Cache[cname]["Base"]["HealthInPercent"] = ncity.GetBuildingsConditionInPercent();

                  this.Cache[cname]["Offense"] = Object();
                  this.Cache[cname]["Offense"]["Level"] = (Math.floor(ncity.get_LvlOffense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Offense"]["UnitLimit"] = unitsData.get_UnitLimitOffense();
                  this.Cache[cname]["Offense"]["TotalHeadCount"] = unitsData.get_TotalOffenseHeadCount();
                  this.Cache[cname]["Offense"]["FreeHeadCount"] = unitsData.get_FreeOffenseHeadCount();
                  this.Cache[cname]["Offense"]["HealthInPercent"] = offHealth > 0 ? offHealth : 0;

                  this.Cache[cname]["Defense"] = Object();
                  this.Cache[cname]["Defense"]["Level"] = (Math.floor(ncity.get_LvlDefense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Defense"]["UnitLimit"] = unitsData.get_UnitLimitDefense();
                  this.Cache[cname]["Defense"]["TotalHeadCount"] = unitsData.get_TotalDefenseHeadCount();
                  this.Cache[cname]["Defense"]["FreeHeadCount"] = unitsData.get_FreeDefenseHeadCount();
                  this.Cache[cname]["Defense"]["HealthInPercent"] = ncity.GetDefenseConditionInPercent() > 0 ? ncity.GetDefenseConditionInPercent() : 0;

                  //console.log(ncity.get_CityUnitsData().get_UnitLimitOffense() + " / " + ncity.get_CityUnitsData().get_TotalOffenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeOffenseHeadCount());
                  //console.log(ncity.get_CityUnitsData().get_UnitLimitDefense() + " / " + ncity.get_CityUnitsData().get_TotalDefenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeDefenseHeadCount());
                }
              } catch (e) {
                console.log("MaelstromTools.RepairTime.updateCache: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;

                rowIdx = this.createOverviewLabels(rowIdx);
                rowIdx = this.createRepairchargeLabels(rowIdx);
              } catch (e) {
                console.log("MaelstromTools.RepairTime.setWidgetLabels: ", e);
              }
            },

            createRepairchargeLabels: function (rowIdx) {
              try {
                var colIdx = 2;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx++, "Repaircharges", null, 'left', null, null, 3);
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Infantry, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Vehicle, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Aircraft, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Repairtime", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Attacks", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Next at", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Max+1 at", 80, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  if (cityCache.Offense.UnitLimit == 0) {
                    continue;
                  }
                  colIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Infantry), 60, 'right', null, (cityCache.RepairTime.Infantry == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Vehicle), 60, 'right', null, (cityCache.RepairTime.Vehicle == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Aircraft), 60, 'right', null, (cityCache.RepairTime.Aircraft == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.Repaircharge.Smallest), 80, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.RepairTime.PossibleAttacks + " / " + cityCache.RepairTime.MaxAttacks, 60, 'right', null, (cityCache.Offense.HealthInPercent !== 100 ? 'red' : null)); // mark red when unhealthy
                    var i = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.PossibleAttacks;
                    var j = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.MaxAttacks;
                    (i>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(i), 80, 'right', null, (i > cityCache.RepairTime.Maximum ? "yellow" : "white")) : colIdx++; /// yellow if more than Maximum RT
                    (j>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(j), 80, 'right') : colIdx++;
                  } else {
                    colIdx += 7;
                  }

                  colIdx += 4;
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName, PerforceChangelist >= 376877 ? ClientLib.Data.PlayerAreaViewMode.pavmPlayerOffense : webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense));
                  rowIdx += 2;
                }

                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createRepairchargeLabels: ", e);
              }
            },

            createOverviewLabels: function (rowIdx) {
              try {
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Base", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Defense", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Army", 60, 'right');

                rowIdx++;
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Units", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.Level, 60, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.TotalHeadCount + " / " + cityCache.Base.UnitLimit, 60, 'right', null, (cityCache.Base.FreeHeadCount >= 1 ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.HealthInPercent + "%", 60, 'right', null, (cityCache.Base.HealthInPercent < 25 ? "red" : (cityCache.Base.HealthInPercent < 100 ? "yellow" : "white")));

                  if (cityCache.Defense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.TotalHeadCount + " / " + cityCache.Defense.UnitLimit, 60, 'right', null, (cityCache.Defense.FreeHeadCount >= 5 ? "red" : (cityCache.Defense.FreeHeadCount >= 3 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.HealthInPercent + "%", 60, 'right', null, (cityCache.Defense.HealthInPercent < 25 ? "red" : (cityCache.Defense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.TotalHeadCount + " / " + cityCache.Offense.UnitLimit, 60, 'right', null, (cityCache.Offense.FreeHeadCount >= 10 ? "red" : (cityCache.Offense.FreeHeadCount >= 5 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.HealthInPercent + "%", 60, 'right', null, (cityCache.Offense.HealthInPercent < 25 ? "red" : (cityCache.Offense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx += 2;
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createOverviewLabels: ", e);
              }
            }

          }
        });

        // define ResourceOverview
        qx.Class.define("MaelstromTools.ResourceOverview", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            Table: null,
            Model: null,

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var mtime = ClientLib.Data.MainData.GetInstance().get_Time();

                  this.Cache[cname] = Object();
                  this.Cache[cname][MaelstromTools.Statics.Tiberium] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Tiberium));
                  this.Cache[cname][MaelstromTools.Statics.Crystal] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Crystal));
                  this.Cache[cname][MaelstromTools.Statics.Power] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Power));
                }

              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.updateCache: ", e);
              }
            },
/*
            setWidgetLabelsTable: function () {
              try {
                if (!this.Table) {
                  this.Widget.setLayout(new qx.ui.layout.HBox());

                  this.Model = new qx.ui.table.model.Simple();
                  this.Model.setColumns(["City", "Tib. Storage", "Tiberium", "Full", "Crystal", "Full", "Power", "Storage", "Full"]);
                  this.Table = new qx.ui.table.Table(this.Model);
                  this.Widget.add(this.Table, {
                    flex: 1
                  });
                }

                var Totals = Object();
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                var rowData = [];

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];

                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  rowData.push([
                    cityName,
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full'])
                    ]);
                }
                rowData.push([
                  'Total resources',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']),
                  ''
                  ]);

                this.Model.setData(rowData);
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            },

            */
            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var first = true;
                var rowIdx = 2;
                var Totals = Object();
                var colIdx = 1;
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left');
                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Max. storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right');

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= cityCache[MaelstromTools.Statics.Tiberium + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Tiberium] < cityCache[MaelstromTools.Statics.Tiberium + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }
                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= cityCache[MaelstromTools.Statics.Crystal + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Crystal] < cityCache[MaelstromTools.Statics.Crystal + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Power));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= cityCache[MaelstromTools.Statics.Power + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white")));

                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']), 80, 'right');

                  if (cityCache[MaelstromTools.Statics.Power] < cityCache[MaelstromTools.Statics.Power + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }


                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx++;
                  first = false;
                }

                colIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Total resources", 100, 'left', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Tiberium] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Crystal] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Power] / Totals[MaelstromTools.Statics.Power + 'Max'] * 100) + '%', 100, 'center', 'bold');
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define BaseStatus
        qx.Class.define("MaelstromTools.BaseStatus", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            CityMenuButtons: null,

            //City.SetDedicatedSupport
            //City.RecallDedicatedSupport
            //City.get_SupportDedicatedBaseId
            //System.String get_SupportDedicatedBaseName ()
            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var player = ClientLib.Data.MainData.GetInstance().get_Player();
                  var supportData = ncity.get_SupportData();
                  //System.String get_PlayerName ()
                  this.Cache[cname] = Object();
                  // Movement lock
                  this.Cache[cname]["HasCooldown"] = ncity.get_hasCooldown();
                  this.Cache[cname]["CooldownEnd"] = Math.max(ncity.get_MoveCooldownEndStep(), ncity.get_MoveRestictionEndStep());
                  this.Cache[cname]["MoveCooldownEnd"] = ncity.get_MoveCooldownEndStep();
                  this.Cache[cname]["MoveLockdownEnd"] = ncity.get_MoveRestictionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_isProtected();
                  this.Cache[cname]["ProtectionEnd"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsAlerted"] = ncity.get_isAlerted();

                  // Supportweapon
                  if (supportData == null) {
                    this.Cache[cname]["HasSupportWeapon"] = false;
                  } else {
                    this.Cache[cname]["HasSupportWeapon"] = true;
                    if (ncity.get_SupportDedicatedBaseId() > 0) {
                      this.Cache[cname]["SupportedCityId"] = ncity.get_SupportDedicatedBaseId();
                      this.Cache[cname]["SupportedCityName"] = ncity.get_SupportDedicatedBaseName();
                      var coordId = ncity.get_SupportDedicatedBaseCoordId();
                      this.Cache[cname]["SupportedCityX"] = (coordId & 0xffff);
                      this.Cache[cname]["SupportedCityY"] = ((coordId >> 0x10) & 0xffff);
                      /*
                      var cityX = ncity.get_PosX();
                      var cityY = ncity.get_PosY();
                      
                      var mainData = ClientLib.Data.MainData.GetInstance();
                      var visRegion = ClientLib.Vis.VisMain.GetInstance().get_Region();

                      var gridW = visRegion.get_GridWidth();
                      var gridH = visRegion.get_GridHeight();
                      //console.log(cname);
                      //console.log("x: " + cityX + " y: " + cityY);

                      var worldObj = visRegion.GetObjectFromPosition((this.Cache[cname]["SupportedCityX"]*gridW), (this.Cache[cname]["SupportedCityY"]*gridH));
                      
                      //ClientLib.Vis.Region.RegionCity
                      if (worldObj == null) {
                        this.Cache[cname]["SupportTime"] = "";
                      } else {
                        console.log(cname);
                        //console.log(worldObj.CalibrationSupportDuration());
                        var weaponState = worldObj.get_SupportWeaponStatus();
                        
                        //console.log(this.calcDuration(ncity, worldObj));
                        var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                        cities.set_CurrentOwnCityId(ncity.get_Id());
                        var status = worldObj.get_SupportWeaponStatus();
                        var server = mainData.get_Server();
                        //console.log(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()));
                        console.log(status);
                        console.log(currStep);
                        this.Cache[cname]["SupportTime"] = mainData.get_Time().GetTimespanString(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()), currStep);
                        //status.Status&ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating)==ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating
                        var currStep = ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep();
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, status.CalibrationEndStep) - currStep), false);
                        //this.Cache[cname]["SupportTime"] = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(weaponState.CalibrationEndStep, currStep);
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()) - currStep)), false);
                      //console.log(this.Cache[cname]["SupportTime"]);
                      }
                       */
                    } else { // prevent reference to undefined property ReferenceError
                      this.Cache[cname]["SupportedCityId"] = null;
                      this.Cache[cname]["SupportedCityName"] = null;
                      this.Cache[cname]["SupportedCityX"] = null;
                      this.Cache[cname]["SupportedCityY"] = null;
                    }
                    this.Cache[cname]["SupportRange"] = MaelstromTools.Wrapper.GetSupportWeaponRange(ncity.get_SupportWeapon());
                    var techName = ClientLib.Base.Tech.GetTechNameFromTechId(supportData.get_Type(), player.get_Faction());
                    this.Cache[cname]["SupportName"] = ClientLib.Base.Tech.GetProductionBuildingNameFromFaction(techName, player.get_Faction());
                    this.Cache[cname]["SupportLevel"] = supportData.get_Level();
                    //this.Cache[cname]["SupportBuilding"] = ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName);
                    //console.log(this.Cache[cname]["SupportBuilding"]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.updateCache: ", e);
              }
            },
            /*
            calcDuration: function(currOwnCity, regionCity) {
              var targetCity = MaelstromTools.Wrapper.GetCity(regionCity.get_Id());
              
              var supportBase=regionCity.get_SupportData();
              if(supportBase == null)
              {
                return -1;
              }
              var weapon=regionCity.get_SupportWeapon();
              if(weapon == null)
              {
                return -1;
              }
              if(currOwnCity.get_Id() == regionCity.get_Id())
              {
                if(supportBase.get_Magnitude() == 0) {
                  return -1;
                }
                return 0;
              }
              var dx=(currOwnCity.get_X() - targetCity.get_PosX());
              var dy=(currOwnCity.get_Y() - targetCity.get_PosY());
              var distance=((dx * dx) + (dy * dy));
              return Math.floor((weapon.pt + (weapon.tpf * Math.floor((Math.sqrt(distance) + 0.5)))));
            },*/

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Cooldown", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Protection", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Available weapon", 140, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Calibrated on", 140, 'left');

                //colIdx++;
                var rowIdxRecall = rowIdx;
                var colIdxRecall = 0;
                var supportWeaponCount = 0;

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left', null, (cityCache.IsAlerted ? 'red' : null));

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.CooldownEnd), 70, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.ProtectionEnd), 70, 'right');

                  if (!cityCache.HasSupportWeapon) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "none", 140, 'left');
                    colIdx += 2;
                  } else {
                    supportWeaponCount++;
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportName + " (" + cityCache.SupportLevel + ")", 140, 'left');

                    if (cityCache.SupportedCityId > 0) {
                      MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportedCityName, 140, 'left');
                      colIdxRecall = colIdx;
                      MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, this.getRecallButton(cityName));
                    } else {
                      colIdx += 2;
                    }
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getFocusBaseButton(cityName));

                  rowIdx++;
                }

                if (supportWeaponCount > 0 && colIdxRecall > 0) {
                  MaelstromTools.Util.addElement(this.Widget, rowIdxRecall, colIdxRecall, this.getRecallAllButton());
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.setWidgetLabels: ", e);
              }
            },

            getRecallAllButton: function () {
              var button = new qx.ui.form.Button("Recall all").set({
                appearance: "button-text-small",
                toolTipText: "Recall all support weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallAllSupport();
              }, this);
              return button;
            },

            getRecallButton: function (cityName) {
              var button = new qx.ui.form.Button("Recall").set({
                appearance: "button-text-small",
                toolTipText: "Recall support to " + cityName,
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallSupport(cityName);
              }, this);
              return button;
            }
            /*
            getCalibrateAllOnSelectedBaseButton: function() {
              var button = new qx.ui.form.Button("Calibrate all weapons on selected base").set({
                appearance: "button-text-small",
                toolTipText: "Calibrate all weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function(e){
                Util.calibrateWholeSupport(ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId());
              }, this);
              return button;
            }*/


          }
        });

        // define Statics
        qx.Class.define("MaelstromTools.Statics", {
          type: "static",
          statics: {
            Tiberium: 'Tiberium',
            Crystal: 'Crystal',
            Power: 'Power',
            Dollar: 'Dollar',
            Research: 'Research',
            Vehicle: "Vehicle",
            Aircraft: "Aircraft",
            Infantry: "Infantry",

            LootTypeName: function (ltype) {
              switch (ltype) {
                case ClientLib.Base.EResourceType.Tiberium:
                  return MaelstromTools.Statics.Tiberium;
                  break;
                case ClientLib.Base.EResourceType.Crystal:
                  return MaelstromTools.Statics.Crystal;
                  break;
                case ClientLib.Base.EResourceType.Power:
                  return MaelstromTools.Statics.Power;
                  break;
                case ClientLib.Base.EResourceType.Gold:
                  return MaelstromTools.Statics.Dollar;
                  break;
                default:
                  return "";
                  break;
              }
            }
          }
        });

        // define Util
        //ClientLib.Data.Cities.prototype.GetCityByCoord
        //ClientLib.Data.City.prototype.get_HasIncommingAttack
        qx.Class.define("MaelstromTools.Util", {
          type: "static",
          statics: {
            ArrayUnique: function (array) {
              var o = {};
              var l = array.length;
              r = [];
              for (var i = 0; i < l; i++) o[array[i]] = array[i];
              for (var i in o) r.push(o[i]);
              return r;
            },

            ArraySize: function (array) {
              var size = 0;
              for (var key in array)
              if (array.hasOwnProperty(key)) size++;
              return size;
            },

            addLabel: function (widget, rowIdx, colIdx, value, width, textAlign, font, color, colSpan) {
              try {
                var label = new qx.ui.basic.Label().set({
                  value: Lang.gt(value)
                });
                if (width) {
                  label.setWidth(width);
                }
                if (textAlign) {
                  label.setTextAlign(textAlign);
                }
                if (color) {
                  label.setTextColor(color);
                }
                if (font) {
                  label.setFont(font);
                }
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }

                widget.add(label, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addLabel: ", e);
              }
            },

            addElement: function (widget, rowIdx, colIdx, element, colSpan) {
              try {
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }
                widget.add(element, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addElement: ", e);
              }
            },

            addImage: function (widget, rowIdx, colIdx, image) {
              try {
                widget.add(image, {
                  row: rowIdx,
                  column: colIdx
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addImage: ", e);
              }
            },

            getImage: function (name) {
              var image = new qx.ui.basic.Image(MT_Base.images[name]);
              image.setScale(true);
              image.setWidth(20);
              image.setHeight(20);
              return image;
            },

            getAccessBaseButton: function (cityName, viewMode) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["AccessBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Access") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.setUserData("viewMode", viewMode);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.accessBase(e.getTarget().getUserData("cityId"), e.getTarget().getUserData("viewMode"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getAccessBaseButton: ", e);
              }
            },

            getFocusBaseButton: function (cityName) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["FocusBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Focus on") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.focusBase(e.getTarget().getUserData("cityId"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getFocusBaseButton: ", e);
              }
            },

            accessBase: function (cityId, viewMode) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    if (viewMode) {
                      webfrontend.gui.UtilView.openVisModeInMainWindow(viewMode, cityId, false);
                    } else {
                      webfrontend.gui.UtilView.openCityInMainWindow(cityId);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.accessBase: ", e);
              }
            },
            focusBase: function (cityId) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cityId);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.focusBase: ", e);
              }
            },

            recallSupport: function (cityName) {
              try {
                var ncity = MT_Cache.Cities[cityName]["Object"];
                ncity.RecallDedicatedSupport();
              } catch (e) {
                console.log("MaelstromTools.Util.recallSupport: ", e);
              }
            },

            recallAllSupport: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  ncity.RecallDedicatedSupport();
                }
              } catch (e) {
                console.log("MaelstromTools.Util.recallAllSupport: ", e);
              }
            },

            checkIfSupportIsAllowed: function (selectedBase) {
              try {
                if (selectedBase.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.RegionCityType) {
                  return false;
                }
                if (selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Own && selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance) {
                  return false;
                }
                return true;
              } catch (e) {
                console.log("MaelstromTools.Util.checkIfSupportIsAllowed: ", e);
                return false;
              }
            },

            calibrateWholeSupportOnSelectedBase: function () {
              if (this.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu)) {
                this.calibrateWholeSupport(MT_Cache.SelectedBaseForMenu);
              }
            },

            calibrateWholeSupport: function (targetRegionCity) {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  //var targetCity = MaelstromTools.Wrapper.GetCity(targetCityId);
                  var weapon = ncity.get_SupportWeapon();

                  //console.log("checking support weapon for " + ncity.get_Name() + " calibrating on " + targetRegionCity.get_Name());

                  if (targetRegionCity != null && weapon != null) {
                    //console.log("city at " + ncity.get_X() + " / " + ncity.get_Y());
                    //console.log("targetRegionCity at " + targetRegionCity.get_RawX() + " / " + targetRegionCity.get_RawY());
                    //var distance = ClientLib.Base.Util.CalculateDistance(ncity.get_X(), ncity.get_Y(), targetRegionCity.get_RawX(), targetRegionCity.get_RawY());
                    var dx = (ncity.get_X() - targetRegionCity.get_RawX());
                    var dy = (ncity.get_Y() - targetRegionCity.get_RawY());
                    var distance = ((dx * dx) + (dy * dy));
                    var range = MaelstromTools.Wrapper.GetSupportWeaponRange(weapon);
                    //console.log("distance is " + distance);
                    //console.log("range isy " + range*range);
                    if (distance <= (range * range)) {
                      ncity.SetDedicatedSupport(targetRegionCity.get_Id());
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.calibrateWholeSupport: ", e);
              }
            },

            // visCity : ClientLib.Vis.Region.RegionObject
            getResources: function (visCity) { // to verifier against PerforceChangelist>=376877
              try {
                var loot = new Object();
                if (visCity.get_X() < 0 || visCity.get_Y() < 0) {
                  loot["LoadState"] = 0;
                  return loot;
                }
                var currentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                var distance = ClientLib.Base.Util.CalculateDistance(currentOwnCity.get_X(), currentOwnCity.get_Y(), visCity.get_RawX(), visCity.get_RawY());
                var maxAttackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
                if (distance > maxAttackDistance) {
                  loot["LoadState"] = -1;
                  return loot;
                }

                var ncity = MaelstromTools.Wrapper.GetCity(visCity.get_Id());
                /* ClientLib.Data.CityBuildings */
                //var cityBuildings = ncity.get_CityBuildingsData();
                var cityUnits = ncity.get_CityUnitsData();

                //var buildings = MaelstromTools.Wrapper.GetBuildings(cityBuildings);
                var buildings = ncity.get_Buildings().d;
                var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits(cityUnits);
                //var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits();

                /*for(var u in buildings) {
              console.log(buildings[u].get_MdbBuildingId());
              console.log("----------------");
            }*/

                var buildingLoot = MaelstromTools.Util.getResourcesPart(buildings);
                //var buildingLoot2 = MaelstromTools.Util.getResourcesPart(this.collectBuildings(ncity));

                var unitLoot = MaelstromTools.Util.getResourcesPart(defenseUnits);

                loot[MaelstromTools.Statics.Tiberium] = buildingLoot[ClientLib.Base.EResourceType.Tiberium] + unitLoot[ClientLib.Base.EResourceType.Tiberium];
                loot[MaelstromTools.Statics.Crystal] = buildingLoot[ClientLib.Base.EResourceType.Crystal] + unitLoot[ClientLib.Base.EResourceType.Crystal];
                loot[MaelstromTools.Statics.Dollar] = buildingLoot[ClientLib.Base.EResourceType.Gold] + unitLoot[ClientLib.Base.EResourceType.Gold];
                loot[MaelstromTools.Statics.Research] = buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + unitLoot[ClientLib.Base.EResourceType.ResearchPoints];
                loot["Factor"] = loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar] + loot[MaelstromTools.Statics.Research];
                loot["CPNeeded"] = currentOwnCity.CalculateAttackCommandPointCostToCoord(ncity.get_X(), ncity.get_Y());
                loot["LoadState"] = (loot["Factor"] > 0 ? 1 : 0);
                loot["Total"] = loot[MaelstromTools.Statics.Research] + loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar];

                /*console.log("Building loot");
                console.log( buildingLoot[ClientLib.Base.EResourceType.Tiberium] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Tiberium]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Crystal] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Crystal]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Gold] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Gold]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.ResearchPoints]);
                console.log("-------------");*/
                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResources", e);
              }
            },
            /*
            collectBuildings: function(ncity) {
              var cityBuildings = ncity.get_CityBuildingsData();
              var buildings = new Array();
              var count = 0;
              // ncity.GetNumBuildings()
              for(var i = 0; i < 100000; i++) {
                var building = cityBuildings.GetBuildingByMDBId(i);
                if(!building) {
                  continue;
                }
                
                //console.log(building.get_TechName() + " - " + ncity.get_CityFaction() + " - " + ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(building.get_TechName(), ncity.get_CityFaction()) + " at lvl " + building.get_CurrentLevel());
                buildings.push(building);
              //buildings[count++] = building;
              }
              return buildings; //MaelstromTools.Util.ArrayUnique(buildings);
            },*/

            getResourcesPart: function (cityEntities) {
              try {
                var loot = [0, 0, 0, 0, 0, 0, 0, 0];
                if (cityEntities == null) {
                  return loot;
                }

                var objcityEntities = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in cityEntities) objcityEntities.push(cityEntities[o]);
                } else { //old
                  for (var i = 0; i < cityEntities.length; i++) objcityEntities.push(cityEntities[i]);
                }

                for (var i = 0; i < objcityEntities.length; i++) {
                  var cityEntity = objcityEntities[i];
                  var unitLevelRequirements = MaelstromTools.Wrapper.GetUnitLevelRequirements(cityEntity);

                  for (var x = 0; x < unitLevelRequirements.length; x++) {
                    loot[unitLevelRequirements[x].Type] += unitLevelRequirements[x].Count * cityEntity.get_HitpointsPercent();
                    if (cityEntity.get_HitpointsPercent() < 1.0) {
                      // destroyed

                    }
                  }
                }

                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResourcesPart", e);
              }
            }

            /*
            findBuildings: function(city) {
              for (var k in city) {
                if ((typeof(city[k]) == "object") && city[k] && city[k] && 0 in city[k]) {
                  if ((typeof(city[k][0]) == "object")  && city[k][0] && "BuildingDBId" in city[k][0]) {
                    return city[k];
                  }
                }
              }
              return [];
            }*/
          }
        });

        // define Wrapper
        qx.Class.define("MaelstromTools.Wrapper", {
          type: "static",
          statics: {
            GetStepTime: function (step, defaultString) {
              if (!defaultString) {
                defaultString = "";
              }
              var endTime = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(step, ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep());
              if (endTime == "00:00") {
                return defaultString;
              }
              return endTime;
            },

            FormatNumbersCompact: function (value) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(value);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(value);
              }
            },

            GetDateTimeString: function (value) {
                return phe.cnc.Util.getDateTimeString(value);
            },

            FormatTimespan: function (value) {
              return ClientLib.Vis.VisMain.FormatTimespan(value);
            },

            GetSupportWeaponRange: function (weapon) {
              return weapon.r;
            },

            GetCity: function (cityId) {
              return ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityId);
            },

            RepairAll: function (ncity, visMode) {
              var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
              ncity.RepairAll();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
            },

            CanRepairAll: function (ncity, viewMode) {
              try {
                /*var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
                var retVal = ncity.CanRepairAll();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
                return retVal;*/

                var repairData = ncity.get_CityRepairData();
                var myRepair = repairData.CanRepair(0, viewMode);
                repairData.UpdateCachedFullRepairAllCost(viewMode);
                return ((myRepair != null) && (!ncity.get_IsLocked() || (viewMode != ClientLib.Vis.Mode.ArmySetup)));

                return false;
              } catch (e) {
                console.log("MaelstromTools.Wrapper.CanRepairAll: ", e);
                return false;
              }
            },
            /*GetBuildings: function (cityBuildings) {
              if (PerforceChangelist >= 376877) { //new
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().d : null);
              } else { //old
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().l : null);
              }
            },*/
            GetDefenseUnits: function (cityUnits) {
            //GetDefenseUnits: function () {
              if (PerforceChangelist >= 392583) { //endgame patch
                return (cityUnits.get_DefenseUnits() != null ? cityUnits.get_DefenseUnits().d : null);
              } else { //old
                var defenseObjects = [];
                for (var x = 0; x < 9; x++) {
                  for (var y = 0; y < 8; y++) {
                    var defenseObject = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition((x * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth()),(y * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight()));
                    if (defenseObject !== null && defenseObject.get_CityEntity() !== null) {
                      defenseObjects.push(defenseObject.get_UnitDetails());
                    }
                  }
                }
                return defenseObjects;
              }
            },
            GetUnitLevelRequirements: function (cityEntity) {
              if (PerforceChangelist >= 376877) { //new
                return (cityEntity.get_UnitLevelRepairRequirements() != null ? cityEntity.get_UnitLevelRepairRequirements() : null);
              } else { //old
                return (cityEntity.get_UnitLevelRequirements() != null ? cityEntity.get_UnitLevelRequirements() : null);
              }
            },

            GetBaseLevel: function (ncity) {
              return (Math.floor(ncity.get_LvlBase() * 100) / 100).toFixed(2);
            }
            /*,
            
            GetPointsByLevelWithThresholds: function (_levelThresholds,_levelFactors,_iLevel) {
              var result=0;
              var lastLevel=_iLevel;
              if(_levelThresholds.length != _levelFactors.length) {
                return 0;
              }
              for (var i=(_levelThresholds.length - 1); (i >= 0); i--) {
                var threshold=(_levelThresholds[i] - 1);
                if(lastLevel >= threshold) {
                  result += ((lastLevel - threshold) * _levelFactors[i]);
                  lastLevel=threshold;
                }
              }
              return result;
            },
            GetArmyPoints: function(_iLevel) {
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
              var m_iArmyPointsPerLevelThresholds = server.get_ArmyPointsPerLevelThresholds();
              var m_fArmyPointsPerLevel = server.get_ArmyPointsPerLevel();
              _iLevel += 4;
              var armyPoints = MaelstromTools.Wrapper.GetPointsByLevelWithThresholds(m_iArmyPointsPerLevelThresholds, m_fArmyPointsPerLevel, _iLevel);
              return Math.min(armyPoints, server.get_MaxArmyPoints());
            },
            
            GetBuilding: function(ncity, techName) {
              return ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName)
            },
            
            GetCommandCenter: function(ncity) {
              //var techName = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Command_Center, ClientLib.Data.MainData.GetInstance().get_Player().get_Faction());

              return MaelstromTools.Wrapper.GetBuilding(ncity, ClientLib.Base.ETechName.Command_Center);
            // conyard return this.GetBuildingCondition$0(ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction$0(0, ClientLib.Data.MainData.GetInstance$9().get_Player$2().get_Faction$2()));
            // ClientLib.Data.City.prototype.GetOffenseConditionInPercent=ClientLib.Data.City.prototype.GetOffenseConditionInPercent$0;
            }*/
          }
        });

        // define LocalStorage
        qx.Class.define("MaelstromTools.LocalStorage", {
          type: "static",
          statics: {
            isSupported: function () {
              return typeof (Storage) !== "undefined";
            },
            set: function (key, value) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  localStorage["CCTA_MaelstromTools_" + key] = JSON.stringify(value);
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.set: ", e);
              }
            },
            get: function (key, defaultValueIfNotSet) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  if (localStorage["CCTA_MaelstromTools_" + key] != null && localStorage["CCTA_MaelstromTools_" + key] != 'undefined') {
                    return JSON.parse(localStorage["CCTA_MaelstromTools_" + key]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.get: ", e);
              }
              return defaultValueIfNotSet;
            },
            clearAll: function () {
              try {
                if (!MaelstromTools.LocalStorage.isSupported()) {
                  return;
                }
                for (var key in localStorage) {
                  if (key.indexOf("CCTA_MaelstromTools_") == 0) {
                    localStorage.removeItem(key);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.clearAll: ", e);
              }
            }
          }
        });

        // define Cache
        qx.Class.define("MaelstromTools.Cache", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            CityCount: 0,
            Cities: null,
            SelectedBaseForMenu: null,
            SelectedBaseResources: null,
            SelectedBaseForLoot: null,

            updateCityCache: function () {
              try {
                this.CityCount = 0;
                this.Cities = Object();

                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                for (var cindex in cities.d) {
                  this.CityCount++;
                  var ncity = MaelstromTools.Wrapper.GetCity(cindex);
                  var ncityName = ncity.get_Name();
                  this.Cities[ncityName] = Object();
                  this.Cities[ncityName]["ID"] = cindex;
                  this.Cities[ncityName]["Object"] = ncity;
                }
              } catch (e) {
                console.log("MaelstromTools.Cache.updateCityCache: ", e);
              }
            },

            updateLoot: function (visCity) {
              var cityId = visCity.get_Id();

              if (this.SelectedBaseForLoot != null && cityId == this.SelectedBaseForLoot.get_Id() && this.SelectedBaseResources != null && this.SelectedBaseResources["LoadState"] > 0) {
                return -2;
              }
              this.SelectedBaseForLoot = visCity;
              this.SelectedBaseResources = MaelstromTools.Util.getResources(visCity);
              return this.SelectedBaseResources["LoadState"];
            }
          }
        });

        // define HuffyTools.ImageRender
        qx.Class.define("HuffyTools.ImageRender", {
          extend: qx.ui.table.cellrenderer.AbstractImage,
          construct: function (width, height) {
            this.base(arguments);
            if (width) {
              this.__imageWidth = width;
            }
            if (height) {
              this.__imageHeight = height;
            }
            this.__am = qx.util.AliasManager.getInstance();
          },
          members: {
            __am: null,
            __imageHeight: 16,
            __imageWidth: 16,
            // overridden
            _identifyImage: function (cellInfo) {
              var imageHints = {
                imageWidth: this.__imageWidth,
                imageHeight: this.__imageHeight
              };
              if (cellInfo.value == "") {
                imageHints.url = null;
              } else {
                imageHints.url = this.__am.resolve(cellInfo.value);
              }
              imageHints.tooltip = cellInfo.tooltip;
              return imageHints;
            }
          },
          destruct: function () {
            this.__am = null;
          }
        });

        // define HuffyTools.ReplaceRender
        qx.Class.define("HuffyTools.ReplaceRender", {
          extend: qx.ui.table.cellrenderer.Default,
          properties: {
            replaceFunction: {
              check: "Function",
              nullable: true,
              init: null
            }
          },
          members: {
            // overridden
            _getContentHtml: function (cellInfo) {
              var value = cellInfo.value;
              var replaceFunc = this.getReplaceFunction();
              // use function
              if (replaceFunc) {
                cellInfo.value = replaceFunc(value);
              }
              return qx.bom.String.escape(this._formatValue(cellInfo));
            }
          }
        });

        qx.Class.define("HuffyTools.CityCheckBox", {
          extend: qx.ui.form.CheckBox,
          members: {
            HT_CityID: null
          }
        });

        // define HuffyTools.UpgradePriorityGUI
        qx.Class.define("HuffyTools.UpgradePriorityGUI", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            HT_TabView: null,
            HT_Options: null,
            HT_ShowOnlyTopBuildings: null,
            HT_ShowOnlyAffordableBuildings: null,
            HT_CityBuildings: null,
            HT_Pages: null,
            HT_Tables: null,
            HT_Models: null,
            HT_SelectedResourceType: null,
            BuildingList: null,
            upgradeInProgress: null,
            init: function () {
              /*
              Done:
              - Added cost per gain to the lists
              - Added building coordinates to the lists
              - Only display the top affordable and not affordable building
              - Persistent filter by city, top and affordable per resource type
              - Reload onTabChange for speed optimization
              - Estimated time until upgrade is affordable
              
              ToDo:
              - let the user decide to sort by colums he like i.e. timefactor or cost/gain and save it in the configuration
              - integrate buttons to transfer resources ?

               */
              try {
                this.HT_SelectedResourceType = -1;
                this.IsTimerEnabled = false;
                this.upgradeInProgress = false;

                this.HT_TabView = new qx.ui.tabview.TabView();
                this.HT_TabView.set({
                  contentPadding: 0,
                  appearance: "tabview",
                  margin: 5,
                  barPosition: 'left'
                });
                this.Widget = new qx.ui.tabview.Page("UpgradePriority");
                this.Widget.setPadding(0);
                this.Widget.setMargin(0);
                this.Widget.setBackgroundColor("#BEC8CF");
                this.Widget.setLayout(new qx.ui.layout.VBox(2));
                //this.Widget.add(this.HT_Options);
                this.Widget.add(this.HT_TabView, {
                  flex: 1
                });
                this.Window.setPadding(0);
                this.Window.set({
                  resizable: true
                });

                this.Window.removeAll();
                this.Window.add(this.Widget);

                this.BuildingList = new Array;
                this.HT_Models = new Array;
                this.HT_Tables = new Array;
                this.HT_Pages = new Array;

                this.createTabPage(ClientLib.Base.EResourceType.Tiberium);
                this.createTable(ClientLib.Base.EResourceType.Tiberium);
                this.HT_Tables[ClientLib.Base.EResourceType.Tiberium].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Tiberium);
                }, this);


                this.createTabPage(ClientLib.Base.EResourceType.Crystal);
                this.createTable(ClientLib.Base.EResourceType.Crystal);
                this.HT_Tables[ClientLib.Base.EResourceType.Crystal].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Crystal);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Power);
                this.createTable(ClientLib.Base.EResourceType.Power);
                this.HT_Tables[ClientLib.Base.EResourceType.Power].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Power);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Gold);
                this.createTable(ClientLib.Base.EResourceType.Gold);
                this.HT_Tables[ClientLib.Base.EResourceType.Gold].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Gold);
                }, this);


                MT_Cache.updateCityCache();
                this.HT_Options = new Array();
                this.HT_ShowOnlyTopBuildings = new Array();
                this.HT_ShowOnlyAffordableBuildings = new Array();
                this.HT_CityBuildings = new Array();
                for (var mPage in this.HT_Pages) {
                  this.createOptions(mPage);
                  this.HT_Pages[mPage].add(this.HT_Options[mPage]);
                  this.HT_Pages[mPage].add(this.HT_Tables[mPage], {
                    flex: 1
                  });
                  this.HT_TabView.add(this.HT_Pages[mPage]);
                }

                // Zeigen wir Dollars an !
                this.HT_TabView.setSelection([this.HT_TabView.getChildren()[2]]);
                this.HT_SelectedResourceType = ClientLib.Base.EResourceType.Gold;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.init: ", e);
              }
            },
            createOptions: function (eType) {
              var oBox = new qx.ui.layout.Flow();
              var oOptions = new qx.ui.container.Composite(oBox);
              oOptions.setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only top buildings"));
              this.HT_ShowOnlyTopBuildings[eType].setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_TOPBUILDINGS_" + eType, true));
              this.HT_ShowOnlyTopBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyTopBuildings[eType], {
                left: 10,
                top: 10
              });
              this.HT_ShowOnlyAffordableBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only affordable buildings"));
              this.HT_ShowOnlyAffordableBuildings[eType].setMargin(5);
              this.HT_ShowOnlyAffordableBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_AFFORDABLE_" + eType, true));
              this.HT_ShowOnlyAffordableBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyAffordableBuildings[eType], {
                left: 10,
                top: 10,
                lineBreak: true
              });
              this.HT_CityBuildings[eType] = new Array();
              for (var cname in MT_Cache.Cities) {
                var oCity = MT_Cache.Cities[cname].Object;
                var oCityBuildings = new HuffyTools.CityCheckBox(cname);
                oCityBuildings.HT_CityID = oCity.get_Id();
                oCityBuildings.setMargin(5);
                oCityBuildings.setValue(MaelstromTools.LocalStorage.get("UGL_CITYFILTER_" + eType + "_" + oCity.get_Id(), true));
                oCityBuildings.addListener("execute", this.CBChanged, this);
                oOptions.add(oCityBuildings, {
                  left: 10,
                  top: 10
                });
                this.HT_CityBuildings[eType][cname] = oCityBuildings;
              }
              this.HT_Options[eType] = oOptions;
            },
            createTable: function (eType) {
              try {
                this.HT_Models[eType] = new qx.ui.table.model.Simple();
                this.HT_Models[eType].setColumns(["ID", Lang.gt("City"), Lang.gt("Type (coord)"), Lang.gt("to Level"), Lang.gt("Gain/h"), Lang.gt("Factor"), Lang.gt("Tiberium"), Lang.gt("Power"), Lang.gt("Tib/gain"), Lang.gt("Pow/gain"), Lang.gt("ETA"), Lang.gt("Upgrade"), "State"]);
                this.HT_Tables[eType] = new qx.ui.table.Table(this.HT_Models[eType]);
                this.HT_Tables[eType].setColumnVisibilityButtonVisible(false);
                this.HT_Tables[eType].setColumnWidth(0, 0);
                this.HT_Tables[eType].setColumnWidth(1, 90);
                this.HT_Tables[eType].setColumnWidth(2, 120);
                this.HT_Tables[eType].setColumnWidth(3, 55);
                this.HT_Tables[eType].setColumnWidth(4, 70);
                this.HT_Tables[eType].setColumnWidth(5, 60);
                this.HT_Tables[eType].setColumnWidth(6, 70);
                this.HT_Tables[eType].setColumnWidth(7, 70);
                this.HT_Tables[eType].setColumnWidth(8, 70);
                this.HT_Tables[eType].setColumnWidth(9, 70);
                this.HT_Tables[eType].setColumnWidth(10, 70);
                this.HT_Tables[eType].setColumnWidth(11, 40);
                this.HT_Tables[eType].setColumnWidth(12, 0);
                var tcm = this.HT_Tables[eType].getTableColumnModel();
                tcm.setColumnVisible(0, false);
                tcm.setColumnVisible(12, false);
                tcm.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }));
                tcm.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 5
                  })
                }));
                tcm.setDataCellRenderer(6, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(7, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(11, new HuffyTools.ImageRender(40, 20));
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTable: ", e);
              }
            },
            createTabPage: function (resource_type) {
              try {
                var sName = MaelstromTools.Statics.LootTypeName(resource_type);
                var oRes = new qx.ui.tabview.Page(Lang.gt(sName), MT_Base.images[sName]);
                oRes.setLayout(new qx.ui.layout.VBox(2));
                oRes.setPadding(5);
                var btnTab = oRes.getChildControl("button");
                btnTab.resetWidth();
                btnTab.resetHeight();
                btnTab.set({
                  show: "icon",
                  margin: 0,
                  padding: 0,
                  toolTipText: sName
                });
                btnTab.addListener("execute", this.TabChanged, [this, resource_type]);
                this.HT_Pages[resource_type] = oRes;
                return oRes;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTabPage: ", e);
              }
            },

            TabChanged: function (e) {
              try {
                this[0].HT_SelectedResourceType = this[1];
                this[0].UpgradeCompleted(null, null);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.TabChanged: ", e);
              }
            },

            upgradeBuilding: function (e, eResourceType) {
              if (this.upgradeInProgress == true) {
                console.log("upgradeBuilding:", "upgrade in progress !");
                return;
              }
              try {
                if (e.getColumn() == 11) {
                  var buildingID = this.HT_Models[eResourceType].getValue(0, e.getRow());
                  var iState = parseInt(this.HT_Models[eResourceType].getValue(12, e.getRow()));
                  if (iState != 1) {
                    return;
                  }
                  if (buildingID in this.BuildingList) {
                    this.upgradeInProgress = true;
                    if (PerforceChangelist >= 382917) { //new
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    } else { //old
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], webfrontend.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    }
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.upgradeBuilding: ", e);
              }
            },
            UpgradeCompleted: function (context, result) {
              var self = this;
              window.setTimeout(function () {
                self.calc();
              }, 1000);
              this.upgradeInProgress = false;
            },
            CBChanged: function (e) {
              this.UpgradeCompleted(null, null);
            },
            formatTiberiumAndPower: function (oValue) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(oValue);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(oValue);
              }
            },
            updateCache: function () {
              try {
                if (!this.HT_TabView) {
                  this.init();
                }
                var eType = this.HT_SelectedResourceType;
                var bTop = this.HT_ShowOnlyTopBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_TOPBUILDINGS_" + eType, bTop);
                var bAffordable = this.HT_ShowOnlyAffordableBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_AFFORDABLE_" + eType, bAffordable);
                var oCityFilter = new Array();
                for (var cname in this.HT_CityBuildings[eType]) {
                  var oCityBuildings = this.HT_CityBuildings[eType][cname];
                  var bFilterBuilding = oCityBuildings.getValue();
                  MaelstromTools.LocalStorage.set("UGL_CITYFILTER_" + eType + "_" + oCityBuildings.HT_CityID, bFilterBuilding);
                  oCityFilter[cname] = bFilterBuilding;
                }
                window.HuffyTools.UpgradePriority.getInstance().collectData(bTop, bAffordable, oCityFilter, eType);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.updateCache: ", e);
              }
            },
            setWidgetLabels: function () {
              try {
                var HuffyCalc = window.HuffyTools.UpgradePriority.getInstance();
                var UpgradeList = HuffyCalc.Cache;

                for (var eResourceType in UpgradeList) {
                  //var eResourceType = MaelstromTools.Statics.LootTypeName(eResourceName);
                  var rowData = [];

                  this.HT_Models[eResourceType].setData([]);

                  for (var mCity in UpgradeList[eResourceType]) {
                    for (var mBuilding in UpgradeList[eResourceType][mCity]) {
                      var UpItem = UpgradeList[eResourceType][mCity][mBuilding];
                      if (typeof (UpItem.Type) == "undefined") {
                        continue;
                      }
                      if (!(mBuilding in this.BuildingList)) {
                        this.BuildingList[UpItem.ID] = UpItem.Building;
                      }
                      var iTiberiumCosts = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumCosts = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium];
                      }
                      var iTiberiumPerGain = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium] / UpItem.GainPerHour;
                      }
                      var iPowerCosts = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerCosts = UpItem.Costs[ClientLib.Base.EResourceType.Power];
                      }
                      var iPowerPerGain = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Power] / UpItem.GainPerHour;
                      }
                      var img = MT_Base.images["UpgradeBuilding"];
                      if (UpItem.Affordable == false) {
                        img = "";
                      }
                      var sType = UpItem.Type;
                      sType = sType + "(" + UpItem.PosX + ":" + UpItem.PosY + ")";
                      var iETA = 0;
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium] > 0) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium];
                      }
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power] > iETA) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power];
                      }
                      var sETA = "";
                      if (iETA > 0) {
                        sETA = ClientLib.Vis.VisMain.FormatTimespan(iETA);
                      }
                      var iState = 0;
                      if (UpItem.Affordable == true) {
                        iState = 1;
                      } else if (UpItem.AffordableByTransfer == true) {
                        iState = 2;
                      } else {
                        iState = 3;
                      }
                      rowData.push([UpItem.ID, mCity, sType, UpItem.Level, UpItem.GainPerHour, UpItem.Ticks, iTiberiumCosts, iPowerCosts, iTiberiumPerGain, iPowerPerGain, sETA, img, iState]);
                    }
                  }
                  this.HT_Models[eResourceType].setData(rowData);
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define HuffyTools.UpgradePriority
        qx.Class.define("HuffyTools.UpgradePriority", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            list_units: null,
            list_buildings: null,

            comparePrio: function (elem1, elem2) {
              if (elem1.Ticks < elem2.Ticks) return -1;
              if (elem1.Ticks > elem2.Ticks) return 1;
              return 0;
            },
            getPrioList: function (city, arTechtypes, eModPackageSize, eModProduction, bOnlyTopBuildings, bOnlyAffordableBuildings) {
              try {
                var RSI = window.MaelstromTools.ResourceOverview.getInstance();
                RSI.updateCache();
                var TotalTiberium = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  var i = cityCache[MaelstromTools.Statics.Tiberium];
                  if (typeof (i) !== 'undefined') {
                    TotalTiberium += i;
                    //but never goes here during test.... // to optimize - to do
                  }
                }
                var resAll = new Array();
                var prod = MaelstromTools.Production.getInstance().updateCache(city.get_Name());
                //var buildings = MaelstromTools.Wrapper.GetBuildings(city.get_CityBuildingsData());
                var buildings = city.get_Buildings().d;

                // 376877 & old fixes 
                var objbuildings = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in buildings) objbuildings.push(buildings[o]);
                } else { //old
                  for (var i = 0; i < buildings.length; i++) objbuildings.push(buildings[i]);
                }


                for (var i = 0; i < objbuildings.length; i++) {
                  var city_building = objbuildings[i];

                  // TODO: check for destroyed building

                  var iTechType = city_building.get_TechName();
                  var bSkip = true;
                  for (var iTypeKey in arTechtypes) {
                    if (arTechtypes[iTypeKey] == iTechType) {
                      bSkip = false;
                      break;
                    }
                  }
                  if (bSkip == true) {
                    continue;
                  }
                  var city_buildingdetailview = city.GetBuildingDetailViewInfo(city_building);
                  if (city_buildingdetailview == null) {
                    continue;
                  }
                  var bindex = city_building.get_Id();
                  var resbuilding = new Array();
                  resbuilding["ID"] = bindex;
                  resbuilding["Type"] = this.TechTypeName(parseInt(iTechType, 10));
                  resbuilding["PosX"] = city_building.get_CoordX();
                  resbuilding["PosY"] = city_building.get_CoordY();

                  resbuilding["Building"] = {
                    cityid: city.get_Id(),
                    posX: resbuilding["PosX"],
                    posY: resbuilding["PosY"],
                    isPaid: true
                  };

                  resbuilding["GainPerHour"] = 0;
                  resbuilding["Level"] = city_building.get_CurrentLevel() + 1;
                  for (var ModifierType in city_buildingdetailview.OwnProdModifiers.d) {
                    switch (parseInt(ModifierType, 10)) {
                      case eModPackageSize:
                        {
                          var ModOj = city_buildingdetailview.OwnProdModifiers.d[city_building.get_MainModifierTypeId()];
                          var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                          resbuilding["GainPerHour"] += (city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta / Mod);
                          break;
                        }
                      case eModProduction:
                        {
                          resbuilding["GainPerHour"] += city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta;
                          break;
                        }
                    }
                  }
                  // Nutzen ins VerhÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¤ltnis zu den Kosten setzten
                  var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(city_building.get_CurrentLevel() + 1, city_building.get_TechGameData_Obj());
                  var RatioPerCostType = new Object();
                  var sRatio = "";
                  var sCosts = "";
                  var lTicks = 0;
                  var bHasPower = true;
                  var bHasTiberium = true;
                  var bAffordableByTransfer = true;
                  var oCosts = new Array();
                  var oTimes = new Array();
                  for (var costtype in TechLevelData) {
                    if (typeof (TechLevelData[costtype]) == "function") {
                      continue;
                    }
                    if (TechLevelData[costtype].Type == "0") {
                      continue;
                    }

                    oCosts[TechLevelData[costtype].Type] = TechLevelData[costtype].Count;
                    if (parseInt(TechLevelData[costtype].Count) <= 0) {
                      continue;
                    }
                    RatioPerCostType[costtype] = TechLevelData[costtype].Count / resbuilding["GainPerHour"];
                    if (sCosts.length > 0) {
                      sCosts = sCosts + ", ";
                    }
                    sCosts = sCosts + MaelstromTools.Wrapper.FormatNumbersCompact(TechLevelData[costtype].Count) + " " + MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);
                    if (sRatio.length > 0) {
                      sRatio = sRatio + ", ";
                    }
                    // Upgrade affordable ?
                    if (city.GetResourceCount(TechLevelData[costtype].Type) < TechLevelData[costtype].Count) {
                      switch (TechLevelData[costtype].Type) {
                        case ClientLib.Base.EResourceType.Tiberium:
                          {
                            bHasTiberium = false;
                            if (TotalTiberium < TechLevelData[costtype].Count) {
                              bAffordableByTransfer = false;
                            }
                          }
                          break;
                        case ClientLib.Base.EResourceType.Power:
                          {
                            bHasPower = false;
                          }
                          break;
                      }
                    }
                    sRatio = sRatio + MaelstromTools.Wrapper.FormatNumbersCompact(RatioPerCostType[costtype]);

                    var techlevelData = MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);

                    var dCityProduction = prod[techlevelData].Delta + prod[techlevelData].ExtraBonusDelta + prod[techlevelData].POI;
                    if (dCityProduction > 0) {
                      if (lTicks < (3600 * RatioPerCostType[costtype] / dCityProduction)) {
                        lTicks = (3600 * RatioPerCostType[costtype] / dCityProduction);
                      }
                    }
                    oTimes[TechLevelData[costtype].Type] = 0;
                    if (oCosts[TechLevelData[costtype].Type] > city.GetResourceCount(TechLevelData[costtype].Type)) {
                      oTimes[TechLevelData[costtype].Type] = (3600 * (oCosts[TechLevelData[costtype].Type] - city.GetResourceCount(TechLevelData[costtype].Type))) / dCityProduction;
                    }
                  }
                  resbuilding["Ticks"] = lTicks;
                  resbuilding["Time"] = ClientLib.Vis.VisMain.FormatTimespan(lTicks);
                  resbuilding["Costtext"] = sCosts;
                  resbuilding["Costs"] = oCosts;
                  resbuilding["TimeTillUpgradable"] = oTimes;
                  resbuilding["Ratio"] = sRatio;
                  resbuilding["Affordable"] = bHasTiberium && bHasPower;
                  resbuilding["AffordableByTransfer"] = bHasPower && bAffordableByTransfer;
                  if (resbuilding["GainPerHour"] > 0 && (bOnlyAffordableBuildings == false || resbuilding["Affordable"] == true)) {
                    resAll[bindex] = resbuilding;
                  }
                }


                resAll = resAll.sort(this.comparePrio);
                if (!bOnlyTopBuildings) {
                  return resAll;
                }
                var res2 = new Array();
                if (MaelstromTools.Util.ArraySize(resAll) > 0) {
                  var iTopNotAffordable = -1;
                  var iTopAffordable = -1;
                  var iNextNotAffordable = -1;
                  var iLastIndex = -1;
                  for (var iNewIndex in resAll) {
                    if (resAll[iNewIndex].Affordable == true) {
                      if (iTopAffordable == -1) {
                        iTopAffordable = iNewIndex;
                        iNextNotAffordable = iLastIndex;
                      }
                    } else {
                      if (iTopNotAffordable == -1) {
                        iTopNotAffordable = iNewIndex;
                      }
                    }
                    iLastIndex = iNewIndex;
                  }
                  if (iTopAffordable == -1) {
                    iNextNotAffordable = iLastIndex;
                  }
                  var iIndex = 0;
                  if (iTopNotAffordable != -1) {
                    res2[iIndex++] = resAll[iTopNotAffordable];
                  }
                  if (iNextNotAffordable != -1) {
                    res2[iIndex++] = resAll[iNextNotAffordable];
                  }
                  if (iTopAffordable != -1) {
                    res2[iIndex++] = resAll[iTopAffordable];
                  }
                }
                res2 = res2.sort(this.comparePrio);
                return res2;
              } catch (e) {
                console.log("HuffyTools.getPrioList: ", e);
              }
            },
            TechTypeName: function (iTechType) {
              switch (iTechType) {
                case ClientLib.Base.ETechName.PowerPlant:
                  {
                    return Lang.gt("Powerplant");
                    break;
                  }
                case ClientLib.Base.ETechName.Refinery:
                  {
                    return Lang.gt("Refinery");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester_Crystal:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Silo:
                  {
                    return Lang.gt("Silo");
                    break;
                  }
                case ClientLib.Base.ETechName.Accumulator:
                  {
                    return Lang.gt("Accumulator");
                    break;
                  }
              }
              return "?";
            },
            collectData: function (bOnlyTopBuildings, bOnlyAffordableBuildings, oCityFilter, eSelectedResourceType) {
              try {
                MT_Cache.updateCityCache();
                this.Cache = new Object();
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                  this.Cache[ClientLib.Base.EResourceType.Tiberium] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                  this.Cache[ClientLib.Base.EResourceType.Crystal] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                  this.Cache[ClientLib.Base.EResourceType.Power] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                  this.Cache[ClientLib.Base.EResourceType.Gold] = new Object();
                }
                for (var cname in MT_Cache.Cities) {
                  var city = MT_Cache.Cities[cname].Object;
                  if (oCityFilter[cname] == false) {
                    continue;
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                    this.Cache[ClientLib.Base.EResourceType.Tiberium][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.TiberiumPackageSize, ClientLib.Base.EModifierType.TiberiumProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                    this.Cache[ClientLib.Base.EResourceType.Crystal][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.CrystalPackageSize, ClientLib.Base.EModifierType.CrystalProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                    this.Cache[ClientLib.Base.EResourceType.Power][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                    this.Cache[ClientLib.Base.EResourceType.Gold][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.collectData: ", e);
              }
            }
          }
        });

        var __MTCity_initialized = false; //k undeclared

        var Lang = window.MaelstromTools.Language.getInstance();
        var MT_Cache = window.MaelstromTools.Cache.getInstance();
        var MT_Base = window.MaelstromTools.Base.getInstance();
        var MT_Preferences = window.MaelstromTools.Preferences.getInstance();
        MT_Preferences.readOptions();

        if (!webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {

          MT_Cache.SelectedBaseForMenu = selectedVisObject;
          var baseStatusOverview = window.MaelstromTools.BaseStatus.getInstance();

          if (__MTCity_initialized == false) {
            //console.log(selectedBase.get_Name());
            __MTCity_initialized = true;
            baseStatusOverview.CityMenuButtons = new Array();

            for (var k in this) {
              try {
                if (this.hasOwnProperty(k)) {
                  if (this[k] && this[k].basename == "Composite") {
                    var button = new qx.ui.form.Button(Lang.gt("Calibrate support"));
                    button.addListener("execute", function (e) {
                      MaelstromTools.Util.calibrateWholeSupportOnSelectedBase();
                    }, this);

                    this[k].add(button);
                    baseStatusOverview.CityMenuButtons.push(button);
                  }
                }
              } catch (e) {
                console.log("webfrontend.gui.region.RegionCityMenu.prototype.showMenu: ", e);
              }
            }
          }

          var isAllowed = MaelstromTools.Util.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu);

          for (var x = 0; x < baseStatusOverview.CityMenuButtons.length; ++x) {
            baseStatusOverview.CityMenuButtons[x].setVisibility(isAllowed ? 'visible' : 'excluded');
          }
          this.__MTCity_showMenu(selectedVisObject);
        };

        if (MT_Preferences.Settings.showLoot) {
          // Wrap onCitiesChange method
          if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp) {
            webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(1, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance());
            return this.__MTCity_NPCCamp();
          };

          if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase) {
            webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(2, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            //MT_Base.updateLoot(2, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            return this.__MTCity_NPCBase();
          };

          if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City) {
            webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(3, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            //MT_Base.updateLoot(3, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            return this.__MTCity_City();
          };
        }

      }
    } catch (e) {
      console.log("createMaelstromTools: ", e);
    }

    function MaelstromTools_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createMaelstromTools();
          window.MaelstromTools.Base.getInstance().initialize();
        } else {
          window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("MaelstromTools_checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
    }
  };

  try {
    var MaelstromScript = document.createElement("script");
    MaelstromScript.innerHTML = "(" + MaelstromTools_main.toString() + ")();";
    MaelstromScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(MaelstromScript);
    }
  } catch (e) {
    console.log("MaelstromTools: init error: ", e);
  }
})();
//----------------------------------Wrapper--------------------//
(function () {
    var CCTAWrapper_main = function () {
        try {
            _log = function () {
                if (typeof console != 'undefined') console.log(arguments);
                else if (window.opera) opera.postError(arguments);
                else GM_log(arguments);
            }

            function createCCTAWrapper() {
                console.log('CCTAWrapper loaded');
                _log('wrapper loading' + PerforceChangelist);
                System = $I;
                SharedLib = $I;
                var strFunction;
                
                // SharedLib.Combat.CbtSimulation.prototype.DoStep
                for (var x in $I) {
                    for (var key in $I[x].prototype) {
                        if ($I[x].prototype.hasOwnProperty(key) && typeof($I[x].prototype[key]) === 'function') {  // reduced iterations from 20K to 12K
                            strFunction = $I[x].prototype[key].toString();
                            if (strFunction.indexOf("().l;var b;for (var d = 0 ; d < c.length ; d++){b = c[d];if((b.") > -1) {
                                $I[x].prototype.DoStep = $I[x].prototype[key];
                                console.log("SharedLib.Combat.CbtSimulation.prototype.DoStep = $I." + x + ".prototype." + key);
                                break;
                            }
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.CanRepair
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("DefenseSetup") > -1 && strFunction.indexOf("DamagedEntity") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("Type==7") > -1 && strFunction.indexOf("var a=0;if") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityUnits.prototype.get_OffenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                var searchString = "for (var b in {d:this.";
                var startPos = strFunction.indexOf(searchString) + searchString.length;
                var fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                var fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_OffenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Data.CityUnits.prototype.get_DefenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                searchString = "for (var c in {d:this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_DefenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation
                strFunction = ClientLib.Vis.Battleground.Battleground.prototype.StartBattle.toString();
                searchString = "=0;for(var a=0; (a<9); a++){this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = fn;
                console.log("ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = function(){return this." + fn_name + ";}");

                // GetNerfBoostModifier
                if (typeof ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier == 'undefined') ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier = ClientLib.Base.Util.GetNerfAndBoostModifier;

                _log('wrapper loaded');
            }
        } catch (e) {
            console.log("createCCTAWrapper: ", e);
        }

        function CCTAWrapper_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined') {
                    createCCTAWrapper();
                } else {
                    window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
                }
            } catch (e) {
                CCTAWrapper_IsInstalled = false;
                console.log("CCTAWrapper_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
        }
    }

    try {
        var CCTAWrapper = document.createElement("script");
        CCTAWrapper.innerHTML = "var CCTAWrapper_IsInstalled = true; (" + CCTAWrapper_main.toString() + ")();";
        CCTAWrapper.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(CCTAWrapper);
        }
    } catch (e) {
        console.log("CCTAWrapper: init error: ", e);
    }
})();

//----------------------------------------Zoom----------------------------//

(function (){
  var tazoom_main = function() {
    function initialize() {
      console.log("Zoom Loaded");
      
      var zoomMin = 2.0; // Larger number means able to zoom in closer.
      var zoomMax = 0.1; // Smaller number means able to zoom out further.
      var zoomInc = 0.08; // Larger number for faster zooming, Smaller number for slower zooming.
      
      webfrontend.gui.BackgroundArea.prototype.onHotKeyPress = function(be) {
        if(!this.active || be.getTarget() != this.mapContainer)
          return;
        var bh = be.getKeyIdentifier();
        var bf = ClientLib.Vis.VisMain.GetInstance();
        switch(bh) {
          case "+":
            var bg = bf.get_Region().get_ZoomFactor() + zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
          case "-":
            var bg = bf.get_Region().get_ZoomFactor() - zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
        }
        this.closeCityInfo();
        this.closeCityList();
      }

      var backgroundArea = qx.core.Init.getApplication().getBackgroundArea();
      qx.bom.Element.removeListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.removeListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      webfrontend.gui.BackgroundArea.prototype._onMouseWheel = function(e) {
        if(this.activeSceneView == null)
          return;
        var bz = e.getWheelDelta();
        var by = this.activeSceneView.get_ZoomFactor();
        by += bz > 0 ? -zoomInc : zoomInc;
        by = Math.min(zoomMin, Math.max(zoomMax, by));
        this.activeSceneView.set_ZoomFactor(by);
        e.stop();
      }
      qx.bom.Element.addListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.addListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea); 
    }
 
    function tazoom_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tazoom_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tazoom_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tazoom_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tazoomScript = document.createElement("script");
  tazoomScript.innerHTML = "(" + tazoom_main.toString() + ")();";
  tazoomScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tazoomScript);
  }
})();

//--------------------------Upgrade?--------------------//



(function () {
    var injectFunction = function () {
        function createClasses() {
            qx.Class.define("Upgrade", {
                type: "singleton",
                extend: qx.core.Object,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();

                        var btnUpgrade = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png").set({
                            toolTipText: qxApp.tr("tnf:toggle upgrade mode"),
                            alignY: "middle",
                            show: "icon",
                            width : 60,
                            allowGrowX : false,
                            allowGrowY : false,
                            appearance : "button"
                        });
                        btnUpgrade.addListener("click", this.toggleWindow, this);

                        var btnTrade = qx.core.Init.getApplication().getPlayArea().getHUD().getUIItem(ClientLib.Data.Missions.PATH.WDG_TRADE);
                        btnTrade.getLayoutParent().addAfter(btnUpgrade, btnTrade);
                    } catch (e) {
                        console.log("Error setting up Upgrade Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    toggleWindow: function () {
                        if (Upgrade.Window.getInstance().isVisible()) Upgrade.Window.getInstance().close();
                        else Upgrade.Window.getInstance().open();
                    }
                }
            });
            qx.Class.define("Upgrade.Window", {
                type: "singleton",
                extend: qx.ui.window.Window,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();
                        this.base(arguments);
                        this.set({
                            layout: new qx.ui.layout.VBox().set({ spacing: 0 }),
                            contentPadding: 5,
                            contentPaddingTop: 0,
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            resizable: true
                        });
                        this.moveTo(124, 31);
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

                        var cntCurrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntCurrent.add(this.titCurrent = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));
                        cntCurrent.add(this.selCurrent = new qx.ui.basic.Label("").set({ alignX: "center" }));
                        var cntCurrentHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntCurrentHBox.add(new qx.ui.basic.Label(qxApp.tr("tnf:level:")).set({ alignY: "middle" }));
                        cntCurrentHBox.add(this.txtCurrent = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
                        cntCurrentHBox.add(this.btnCurrent = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
                        this.txtCurrent.addListener("changeValue", this.onInputCurrent, this);
                        this.btnCurrent.addListener("execute", this.onUpgradeCurrent, this);
                        cntCurrent.add(cntCurrentHBox);
                        var cntCurrentRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntCurrentRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntCurrentRes.add(this.tibCurrent = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        cntCurrentRes.add(this.cryCurrent = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        cntCurrentRes.add(this.powCurrent = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.tibCurrent.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                        this.cryCurrent.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                        this.powCurrent.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                        this.tibCurrent.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.cryCurrent.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.powCurrent.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        cntCurrent.add(cntCurrentRes);
                        this.add(cntCurrent);

                        var cntAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntAll.add(this.titAll = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));
                        var cntAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntAllHBox.add(new qx.ui.basic.Label(qxApp.tr("tnf:level:")).set({ alignY: "middle" }));
                        cntAllHBox.add(this.txtAll = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
                        cntAllHBox.add(this.btnAll = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
                        this.txtAll.addListener("changeValue", this.onInputAll, this);
                        this.btnAll.addListener("execute", this.onUpgradeAll, this);
                        cntAll.add(cntAllHBox);
                        var cntAllRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5))
                        cntAllRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntAllRes.add(this.tibAll = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        cntAllRes.add(this.cryAll = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        cntAllRes.add(this.powAll = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.tibAll.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                        this.cryAll.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                        this.powAll.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                        this.tibAll.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.cryAll.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        this.powAll.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
                        cntAll.add(cntAllRes);
                        this.add(cntAll);

                        this.addListener("appear", this.onOpen, this);
                        this.addListener("close", this.onClose, this);
                    } catch (e) {
                        console.log("Error setting up Upgrade.Window Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    Current: null,
                    titCurrent: null,
                    selCurrent: null,
                    txtCurrent: null,
                    btnCurrent: null,
                    tibCurrent: null,
                    cryCurrent: null,
                    powCurrent: null,
                    titAll: null,
                    txtAll: null,
                    btnAll: null,
                    tibAll: null,
                    cryAll: null,
                    powAll: null,
                    onOpen: function () {
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                        this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
                    },
                    onClose: function () {
                        phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
                        phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
                        phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
                    },
                    onViewModeChanged: function (oldMode, newMode) {
                        if (oldMode !== newMode) {
                            var qxApp = qx.core.Init.getApplication();
                            switch (newMode) {
                            case ClientLib.Vis.Mode.City:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:base"));
                                this.setIcon("FactionUI/icons/icon_arsnl_base_buildings.png");
                                this.titCurrent.setValue(qxApp.tr("Selected building"));
                                this.titAll.setValue(qxApp.tr("All buildings"));
                                this.resetAll();
                                this.resetCurrent();
                                break;
                            case ClientLib.Vis.Mode.DefenseSetup:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:defense"));
                                this.setIcon("FactionUI/icons/icon_def_army_points.png");
                                this.titCurrent.setValue(qxApp.tr("Selected defense unit"));
                                this.titAll.setValue(qxApp.tr("All defense units"));
                                this.resetAll();
                                this.resetCurrent();
                                break;
                            case ClientLib.Vis.Mode.ArmySetup:
                                this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:offense"));
                                this.setIcon("FactionUI/icons/icon_army_points.png");
                                this.titCurrent.setValue(qxApp.tr("Selected army unit"));
                                this.titAll.setValue(qxApp.tr("All army units"));
                                this.resetAll();
                                this.resetCurrent();
                                break;
                            default:
                                this.close();
                                break;
                            }
                        }
                    },
                    onSelectionChange: function (oldObj, newObj) {
                        if (newObj != null) {
                            switch (newObj.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                this.Current = newObj;
                                var name = newObj.get_BuildingName();
                                var level = newObj.get_BuildingLevel();
                                this.selCurrent.setValue(name + " (" + level + ")");
                                this.txtCurrent.setMinimum(level + 1);
                                this.txtCurrent.setMaximum(level + 51);
                                this.txtCurrent.setValue(level + 1);
                                this.txtCurrent.setEnabled(true);
                                this.btnCurrent.setEnabled(true);
                                this.onInputCurrent();
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                this.Current = newObj;
                                var name = newObj.get_UnitName();
                                var level = newObj.get_UnitLevel();
                                this.selCurrent.setValue(name + " (" + level + ")");
                                this.txtCurrent.setMinimum(level + 1);
                                this.txtCurrent.setMaximum(level + 51);
                                this.txtCurrent.setValue(level + 1);
                                this.txtCurrent.setEnabled(true);
                                this.btnCurrent.setEnabled(true);
                                this.onInputCurrent();
                                break;
                            }
                        }
                    },
                    onCurrentCityChange: function (oldObj, newObj) {
                        if (oldObj !== newObj) {
                            this.resetAll();
                            this.resetCurrent();
                        }
                    },
                    GetCurrentUpgradeCostsToLevel: function (Current, newLevel) {
                        var costs = null;
                        if (Current !== null && newLevel > 0) {
                            switch (Current.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                if (newLevel > Current.get_BuildingLevel())
                                    costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForBuildingToLevel(Current.get_BuildingDetails(), newLevel);
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                                if (newLevel > Current.get_UnitLevel())
                                    costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForUnitToLevel(Current.get_UnitDetails(), newLevel);
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                if (newLevel > Current.get_UnitLevel())
                                    costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForUnitToLevel(Current.get_UnitDetails(), newLevel);
                                break;
                            }
                        }
                        return costs;
                    },
                    resetCurrent: function () {
                        this.Current = null;
                        this.selCurrent.setValue("-");
                        this.txtCurrent.setMinimum(0);
                        this.txtCurrent.setMaximum(0);
                        this.txtCurrent.resetValue();
                        this.txtCurrent.setEnabled(false);
                        this.btnCurrent.setEnabled(false);
                        this.onInputCurrent();
                    },
                    onInputCurrent: function () {
                        var costs = this.GetCurrentUpgradeCostsToLevel(this.Current, parseInt(this.txtCurrent.getValue(), 10));
                        var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var tib_cur = own_city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium)+ own_city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium)+ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
						var tib_sto = own_city.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
						var cry_cur = own_city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal)+ own_city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal)+ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
						var cry_sto = own_city.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
						var pow_cur = own_city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power)+ own_city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power)+ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
						var pow_sto = own_city.GetResourceCount(ClientLib.Base.EResourceType.Power);
						if (costs !== null) {
                            for (var i = 0, Tib = 0, Cry = 0, Pow = 0; i < costs.length; i++) {
                                var uCosts = costs[i];
                                var cType = parseInt(uCosts.Type, 10);
                                switch (cType) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    Tib += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Crystal:
                                    Cry += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Power:
                                    Pow += uCosts.Count;
                                    break;
                                }
                            }
                            var tib_time = formatCompactTime((Tib-tib_sto),tib_cur);
							var cry_time = formatCompactTime((Cry-cry_sto),cry_cur);
							var pow_time = formatCompactTime((Pow-pow_sto),pow_cur);
							this.tibCurrent.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib)+'@'+tib_time);
                            this.tibCurrent.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                            if (Tib === 0) this.tibCurrent.exclude();
                            else this.tibCurrent.show();
                            this.cryCurrent.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry)+'@'+cry_time);
                            this.cryCurrent.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                            if (Cry === 0) this.cryCurrent.exclude();
                            else this.cryCurrent.show();
                            this.powCurrent.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow)+'@'+pow_time);
                            this.powCurrent.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                            if (Pow === 0) this.powCurrent.exclude();
                            else this.powCurrent.show();
                        } else {
                            this.tibCurrent.setLabel("-");
                            this.tibCurrent.resetToolTipText();
                            this.tibCurrent.show();
                            this.cryCurrent.setLabel("-");
                            this.cryCurrent.resetToolTipText();
                            this.cryCurrent.show();
                            this.powCurrent.setLabel("-");
                            this.powCurrent.resetToolTipText();
                            this.powCurrent.show();
                        }
                    },
                    onUpgradeCurrent: function() {
                        var newLevel = parseInt(this.txtCurrent.getValue(), 10);
                        if (newLevel > 0 && this.Current !== null) {
                            switch (this.Current.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                                if (newLevel > this.Current.get_BuildingLevel()) {
                                    ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(this.Current.get_BuildingDetails(), newLevel);
                                    this.onSelectionChange(null, this.Current);
                                }
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                                if (newLevel > this.Current.get_UnitLevel()) {
                                    ClientLib.API.Defense.GetInstance().UpgradeUnitToLevel(this.Current.get_UnitDetails(), newLevel);
                                    this.onSelectionChange(null, this.Current);
                                }
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                                if (newLevel > this.Current.get_UnitLevel()) {
                                    ClientLib.API.Army.GetInstance().UpgradeUnitToLevel(this.Current.get_UnitDetails(), newLevel);
                                    this.onSelectionChange(null, this.Current);
                                }
                                break;
                            }
                        }
                    },
                    GetAllUpgradeCostsToLevel: function (newLevel) {
                        if (newLevel > 0) {
                            switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
                            case ClientLib.Vis.Mode.City:
                                return ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(newLevel);
                            case ClientLib.Vis.Mode.DefenseSetup:
                                return ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
                            case ClientLib.Vis.Mode.ArmySetup:
                                return ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
                            }
                        }
                        return null;
                    },
                    calcAllLowLevel: function () {
                        for (var newLevel = 1, Tib = 0, Cry = 0, Pow = 0; Tib === 0 && Cry === 0 && Pow === 0 && newLevel < 1000; newLevel++) {
                            var costs = this.GetAllUpgradeCostsToLevel(newLevel);
                            if (costs !== null) {
                                for (var i = 0; i < costs.length; i++) {
                                    var uCosts = costs[i];
                                    var cType = parseInt(uCosts.Type, 10);
                                    switch (cType) {
                                    case ClientLib.Base.EResourceType.Tiberium:
                                        Tib += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Crystal:
                                        Cry += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Power:
                                        Pow += uCosts.Count;
                                        break;
                                    }
                                }
                            }
                        }
                        return (newLevel === 1000?0:(newLevel - 1));
                    },
                    resetAll: function () {
                        var allLowLevel = this.calcAllLowLevel();
                        if (allLowLevel > 0) {
                            this.txtAll.setMinimum(allLowLevel);
                            this.txtAll.setMaximum(allLowLevel + 50);
                            this.txtAll.setValue(allLowLevel);
                            this.txtAll.setEnabled(true);
                            this.btnAll.setEnabled(true);
                        } else {
                            this.txtAll.setMinimum(0);
                            this.txtAll.setMaximum(0);
                            this.txtAll.resetValue();
                            this.txtAll.setEnabled(false);
                            this.btnAll.setEnabled(false);
                        }
                        this.onInputAll();
                    },
                    onInputAll: function () {
                        var newLevel = parseInt(this.txtAll.getValue(), 10);
                        var costs = this.GetAllUpgradeCostsToLevel(newLevel);
						var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var tib_cur = own_city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium)+ own_city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium)+ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
						var tib_sto = own_city.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
						var cry_cur = own_city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal)+ own_city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal)+ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
						var cry_sto = own_city.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
						var pow_cur = own_city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power)+ own_city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power)+ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
						var pow_sto = own_city.GetResourceCount(ClientLib.Base.EResourceType.Power);
						if (newLevel > 0 && costs !== null) {
                            for (var i = 0, Tib = 0, Cry = 0, Pow = 0; i < costs.length; i++) {
                                var uCosts = costs[i];
                                switch (parseInt(uCosts.Type, 10)) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    Tib += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Crystal:
                                    Cry += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Power:
                                    Pow += uCosts.Count;
                                    break;
                                }
                            }
							var tib_time = formatCompactTime((Tib-tib_sto),tib_cur);
							var cry_time = formatCompactTime((Cry-cry_sto),cry_cur);
							var pow_time = formatCompactTime((Pow-pow_sto),pow_cur);
							this.tibAll.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib)+'@'+tib_time);
                            this.tibAll.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                            if (Tib === 0) this.tibAll.exclude();
                            else this.tibAll.show();
                            this.cryAll.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry)+'@'+cry_time);
                            this.cryAll.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                            if (Cry === 0) this.cryAll.exclude();
                            else this.cryAll.show();
                            this.powAll.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow)+'@'+pow_time);
                            this.powAll.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                            if (Pow === 0) this.powAll.exclude();
                            else this.powAll.show();
                        } else {
                            this.tibAll.setLabel("-");
                            this.tibAll.resetToolTipText();
                            this.tibAll.show();
                            this.cryAll.setLabel("-");
                            this.cryAll.resetToolTipText();
                            this.cryAll.show();
                            this.powAll.setLabel("-");
                            this.powAll.resetToolTipText();
                            this.powAll.show();
                        }
                    },
                    onUpgradeAll: function () {
                        var newLevel = parseInt(this.txtAll.getValue(), 10);
                        if (newLevel > 0) {
                            switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
                            case ClientLib.Vis.Mode.City:
                                ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
                                this.resetAll()
                                break;
                            case ClientLib.Vis.Mode.DefenseSetup:
                                ClientLib.API.Defense.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                                this.resetAll()
                                break;
                            case ClientLib.Vis.Mode.ArmySetup:
                                ClientLib.API.Army.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                                this.resetAll()
                                break;
                            }
                        }
                    }
                }
            });
        }
		function formatCompactTime(ress,ressph)  {
            ressph = ressph;
			var resspm = ressph/60;
			var ressps = resspm/60;
			var tunit = '0T 00:00:00';
			var days = '0';
			var hours = '00';
			var min = '00';
			var sec = '00';
			if((ress/(ressph*24))>=1){
				days = Math.floor(ress/(ressph*24));
			}
			if((ress/ressph)-(days*24)>=1){
				hours = Math.floor((ress/ressph)-(days*24));
			}
			if((ress/resspm)-(days*24*60)-(hours*60)>=1){
				min = Math.floor((ress/resspm)-(days*24*60)-(hours*60));
				if(min<10){min = '0'+min;}
			}
			if((ress/ressps)-(days*24*60*60)-(hours*60*60)-(min*60)>=1){
				sec = Math.floor(((ress/ressps)-(days*24*60*60)-(hours*60*60)-(min*60)));
				if(sec<10){sec = '0'+sec;}
			}			
			tunit = days+'T '+hours+':'+min+':'+sec;
			return tunit;
        }
        function translation() {
            var localeManager = qx.locale.Manager.getInstance();

            // Default language is english (en)
            // Available Languages are: ar,ce,cs,da,de,en,es,fi,fr,hu,id,it,nb,nl,pl,pt,ro,ru,sk,sv,ta,tr,uk
            // You can send me translations so i can include them in the Script.

            // German
            localeManager.addTranslation("de", {
                "Selected building": "Markiertes Gebäude",
                "All buildings": "Alle Gebäude",
                "Selected defense unit": "Markierte Abwehrstellung",
                "All defense units": "Alle Abwehrstellungen",
                "Selected army unit": "Markierte Armee-Einheit",
                "All army units": "Alle Armee-Einheiten"
            });
        }
        function waitForGame() {
            try {
                if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loading");
                            translation();
                            createClasses();
                            Upgrade.getInstance();
                            Upgrade.Base.getInstance();
                            Upgrade.Defense.getInstance();
                            Upgrade.Army.getInstance();
                            console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loaded");
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        window.setTimeout(waitForGame, 1000);
                    }
                } else {
                    window.setTimeout(waitForGame, 1000);
                }
            } catch (e) {
                console.log(e);
            }
        }
        window.setTimeout(waitForGame, 1000);
    };

    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";

    document.getElementsByTagName("head")[0].appendChild(script);
})();


//----------------------------Cordenadas----------------------//

(function () {
  var CNCTACoordsButtonAll_main = function () {
    try {
      function createCoordsButton() {
        console.log('C&C:Tiberium Alliances Coords Button All loaded.');
 
        /*
        $a = qx.core.Init.getApplication(); // Application
        $c = $a.getChat(); // ChatWindow
        $w = $c.getChatWidget(); // ChatWidget
        $i = $cw.getEditable(); // Input
        $d = $i.getContentElement().getDomElement(); // Input DOM Element
        */
 
        var coordsButton = {
          selectedBase: null,
          pasteCoords: function(){
            var $i = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
            var $d = $i.getContentElement().getDomElement(); // Input DOM Element
 
            var result = new Array();
            result.push($d.value.substring(0,$d.selectionStart)); // start
 
            result.push('[coords]' + coordsButton.selectedBase.get_RawX() + ':' + coordsButton.selectedBase.get_RawY() + '[/coords]');
 
            result.push($d.value.substring($d.selectionEnd, $d.value.length)); // end
 
            $i.setValue(result.join(' '));
          }
        };
 
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
       
          webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {
            coordsButton.selectedBase = selectedVisObject;
            if (this.__coordsButton_initialized != 1) {
              this.__coordsButton_initialized = 1;
              this.__newComposite = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({
                padding: 2
              });
              for(i in this) {
                if(this[i] && this[i].basename == "Composite") {
                  var button = new qx.ui.form.Button("Paste Coords");
                  button.addListener("execute", function () {
                    coordsButton.pasteCoords();
                  });            
                  this[i].add(button);
                }
              }
            }
            this.__coordsButton_showMenu(selectedVisObject);
            switch (selectedVisObject.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
              case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubServer:
                this.add(this.__newComposite);
                break;
            }
          }
        }
      }    
    } catch (e) {
      console.log("createCoordsButton: ", e);
    }
 
    function CNCTACoordsButtonAll_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          createCoordsButton();
        } else {
          window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("CNCTACoordsButtonAll_checkIfLoaded: ", e);
      }
    }
  window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
  };
  try {
    var CNCTACoordsButtonAll = document.createElement("script");
    CNCTACoordsButtonAll.innerHTML = "(" + CNCTACoordsButtonAll_main.toString() + ")();";
    CNCTACoordsButtonAll.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(CNCTACoordsButtonAll);
  } catch (e) {
    console.log("CNCTACoordsButtonAll: init error: ", e);
  }
})();

//-----------------------------Trade Window------------------//

(function () {
	var NewTradeOverlay_main = function () {
		console.log('NewTradeOverlay loaded');
		function CreateNewTradeOverlay() {
			qx.Class.undefine("webfrontend.gui.trade.TradeOverlay");
			qx.Class.define("webfrontend.gui.trade.TradeOverlay", {
				type : "singleton",
				extend : webfrontend.gui.OverlayWindow,
				construct : function () {
					webfrontend.gui.OverlayWindow.call(this);
					this.set({
						autoHide : false
					});
					this.clientArea.setLayout(new qx.ui.layout.HBox());
					this.clientArea.setMargin(0);
					this.clientArea.setWidth(464);
					this.setTitle(qx.locale.Manager.tr("tnf:trade window title"));
					this.clientArea.add(new qx.ui.core.Spacer(), {
						flex : 1
					});
					this.clientArea.add(this.tradeWindow());
					this.clientArea.add(new qx.ui.core.Spacer(), {
						flex : 1
					});
					this.tradeConfirmationWidget = new webfrontend.gui.widgets.confirmationWidgets.TradeConfirmationWidget();
				},
				members : {
					activated : false,
					transferWindowTableSelectedRows : null,
					modifier : null,
					tradeWindowTable : null,
					tableColumnModel : null,
					resourceTransferType : null,
					transferAmountTextField : null,
					largeTiberiumImage : null,
					costToTradeLabel : null,
					transferFromBaseLabel : null,
					totalResourceAmount : null,
					selectedRowData : null,
					selectedRow : null,
					tradeButton : null,
					tenPercentButton : null,
					twentyFivePercentButton : null,
					fiftyPercentButton : null,
					seventyFivePercentButton : null,
					oneHundredPercentButton : null,
					resourceSelectionRadioButtons : null,
					selectAllNoneButton : null,
					userDefinedMinimumAmount : -1,
					userDefinedMaxDistance : -1,
					tradeConfirmationWidget : null,
					activate : function () {
						if (!this.activated) {
							ClientLib.Vis.VisMain.GetInstance().PlayUISound("audio/ui/OpenWindow");
							phe.cnc.base.Timer.getInstance().addListener("uiTick", this._onTick, this);
							this.selectedRowData = null;
							this.selectedRow = null;
							this.transferWindowTableSelectedRows = [];
							this.transferAmountTextField.setValue("");
							this.costToTradeLabel.setValue("0");
							this.userDefinedMinimumAmount = -1;
							this.userDefinedMaxDistance = -1;
							this.resourceTransferType = ClientLib.Base.EResourceType.Tiberium;
							this.tradeWindowTable.resetCellFocus();
							this.tradeWindowTable.resetSelection();
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
							this.resourceSelectionRadioButtons.resetSelection();
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
							this.TableRowFilter();
							this.tableColumnModel.sortByColumn(2, true);
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:select all" : "Select All"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:select none" : "Select None"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:cannot manually modify" : "Cannot be modified with multiple rows selected"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:trading with multiple bases" : "Trading with multiple bases"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:percent buttons" : "Please use one of the Percent buttons"
							});
							this.activated = true;
						}
					},
					deactivate : function () {
						if (this.activated) {
							phe.cnc.base.Timer.getInstance().removeListener("uiTick", this._onTick, this);
							this.tradeWindowTable.resetSelection();
							this.tradeWindowTable.resetCellFocus();
							this.transferAmountTextField.setValue("");
							this.transferWindowTableSelectedRows = [];
							this.costToTradeLabel.setValue("");
							this.selectedRow = null;
							this.selectedRowData = null;
							this.modifier = 1;
							this.activated = false;
						}
					},
					getFilterMinimimAmount : function () {
						return this.userDefinedMinimumAmount;
					},
					getFilterDistanceLimit : function () {
						return this.userDefinedMaxDistance;
					},
					tradeWindow : function () {
						var tradeWindowContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2)).set({
							marginTop : 10,
							marginBottom : 10,
							marginLeft : 4
						});

						tradeWindowContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});

						var selectResourcesLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select resources:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13"
						});
						var resourceSelectionContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
							height : 26
						});
						var tiberiumToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_tiberium.png").set({
							appearance : "button-toggle",
							width : 84
						});
						tiberiumToggleButton.setUserData("key", ClientLib.Base.EResourceType.Tiberium);
						var tiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_tiberium.png").set({
							width : 24,
							height : 24,
							scale : true
						});
						var crystalToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_crystal.png").set({
							appearance : "button-toggle",
							width : 84
						});
						crystalToggleButton.setUserData("key", ClientLib.Base.EResourceType.Crystal);
						var crystalImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_chrystal.png").set({
							width : 24,
							height : 24,
							scale : true
						});
						resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						resourceSelectionContainer.add(selectResourcesLabel);
						resourceSelectionContainer.add(tiberiumToggleButton);
						resourceSelectionContainer.add(new qx.ui.core.Spacer().set({
							width : 2
						}));
						resourceSelectionContainer.add(crystalToggleButton);
						resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						this.resourceSelectionRadioButtons = new qx.ui.form.RadioGroup(tiberiumToggleButton, crystalToggleButton);
						this.resourceSelectionRadioButtons.addListener("changeSelection", this.ChangeResourceType, this);

						tradeWindowContainer.add(resourceSelectionContainer);

						var currentServer = ClientLib.Data.MainData.GetInstance().get_Server();
						var tradeCostToolTip = qx.locale.Manager.tr("tnf:trade costs %1 (+%2 per field)", currentServer.get_TradeCostMinimum(), currentServer.get_TradeCostPerField());
						var searchContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2));
						var searchBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						var minimumAmountLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:minimum amount:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13"
						});
						this.minimumAmountTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
						});
						this.minimumAmountTextField.setFilter(/[0-9]/);
						this.minimumAmountTextField.setMaxLength(12);
						var maxDistanceLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:distance limit:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13",
							toolTipText : tradeCostToolTip
						});
						this.maxDistanceTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
						});
						this.maxDistanceTextField.setFilter(/[0-9]/);
						this.maxDistanceTextField.setMaxLength(3);
						searchBox.add(minimumAmountLabel);
						searchBox.add(this.minimumAmountTextField);
						searchBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						searchBox.add(maxDistanceLabel);
						searchBox.add(this.maxDistanceTextField);
						searchBox.add(new qx.ui.core.Spacer(), {
							flex : 2
						});

						searchContainer.add(searchBox);

						var searchButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:search")).set({
							width : 300,
							maxWidth : 300,
							marginBottom : 8,
							marginTop : 4,
							alignX : "center"
						});
						searchButton.addListener("execute", this.TableRowFilter, this);
						searchContainer.add(searchButton);

						//tradeWindowContainer.add(searchContainer);

						this.selectAllNoneButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:select all")).set({
							enabled : true,
							//appearance: "button-forum-light",
							//textColor: "text-label",
							width : 160
						});

						this.selectAllNoneButton.addListener("click", this.SelectAllRows, this);

						tradeWindowContainer.add(this.selectAllNoneButton);

						this.tableColumnModel = new webfrontend.data.SimpleColFormattingDataModel();
						this.tableColumnModel.setColumns([qx.locale.Manager.tr("tnf:base"), qx.locale.Manager.tr("tnf:distance"), qx.locale.Manager.tr("tnf:$ / 1000"), qx.locale.Manager.tr("tnf:amount"), "Amount", "Max", "ID"], ["Base", "Distance", "Credits", "AmountDesc", "Amount", "Max", "ID"]);
						this.tableColumnModel.setColumnSortable(0, true);
						this.tableColumnModel.setColumnSortable(1, true);
						this.tableColumnModel.setColumnSortable(2, true);
						this.tableColumnModel.setColumnSortable(3, true);
						this.tableColumnModel.setSortMethods(3, this.AmountSort);
						this.tradeWindowTable = new webfrontend.gui.trade.TradeBaseTable(this.tableColumnModel).set({
							statusBarVisible : false,
							columnVisibilityButtonVisible : false,
							maxHeight : 300
						});
						this.tradeWindowTable.addListener("cellClick", this.TradeWindowTableCellClick, this);
						this.tradeWindowTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
						this.tradeWindowTable.setDataRowRenderer(new webfrontend.gui.trade.TradeBaseTableRowRenderer(this.tradeWindowTable));
						this.tradeWindowTable.showCellToolTip = true;
						var tradeWindowTableColumnModel = this.tradeWindowTable.getTableColumnModel();
						tradeWindowTableColumnModel.setDataCellRenderer(0, new qx.ui.table.cellrenderer.String());
						tradeWindowTableColumnModel.setDataCellRenderer(1, new qx.ui.table.cellrenderer.Number());
						tradeWindowTableColumnModel.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Number());
						tradeWindowTableColumnModel.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Default());
						tradeWindowTableColumnModel.getHeaderCellRenderer(2).setToolTip(tradeCostToolTip);
						tradeWindowTableColumnModel.setDataCellRenderer(3, new webfrontend.gui.trade.TradeBaseTableCellRenderer());
						tradeWindowTableColumnModel.setColumnWidth(0, 160);
						tradeWindowTableColumnModel.setColumnWidth(1, 60);
						tradeWindowTableColumnModel.setColumnWidth(2, 100);
						tradeWindowTableColumnModel.setColumnVisible(4, false);
						tradeWindowTableColumnModel.setColumnVisible(5, false);
						tradeWindowTableColumnModel.setColumnVisible(6, false);
						tradeWindowContainer.add(this.tradeWindowTable);

						var transferAmountContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());
						var transferAmountBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({
							minHeight : 36
						});
						this.largeTiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_tiberium.png").set({
							alignY : "middle",
							width : 22,
							height : 20,
							scale : true
						});
						this.transferFromBaseLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select base for transfer")).set({
							rich : true,
							textColor : "text-label",
							marginBottom : 2,
							alignY : "middle",
							maxWidth : 182
						});
						this.transferAmountTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed"),
							enabled : false,
							width : 208,
							marginRight : 1
						});
						this.transferAmountTextField.setFilter(/[0-9]/);
						this.transferAmountTextField.setMaxLength(20);
						this.transferAmountTextField.addListener("input", this.ResourceAmountChanged, this);
						transferAmountBox.add(this.largeTiberiumImage);
						transferAmountBox.add(this.transferFromBaseLabel);
						var percentButtonsBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
							marginTop : 2
						});
						this.tenPercentButton = new webfrontend.ui.SoundButton("10%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.tenPercentButton.addListener("execute", this.TenPercent, this);
						this.twentyFivePercentButton = new webfrontend.ui.SoundButton("25%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.twentyFivePercentButton.addListener("execute", this.TwentyFivePercent, this);
						this.fiftyPercentButton = new webfrontend.ui.SoundButton("50%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.fiftyPercentButton.addListener("execute", this.FiftyPercent, this);
						this.seventyFivePercentButton = new webfrontend.ui.SoundButton("75%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.seventyFivePercentButton.addListener("execute", this.SeventyFivePercent, this);
						this.oneHundredPercentButton = new webfrontend.ui.SoundButton("100%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.oneHundredPercentButton.addListener("execute", this.OneHundredPercent, this);
						percentButtonsBox.add(this.tenPercentButton);
						percentButtonsBox.add(this.twentyFivePercentButton);
						percentButtonsBox.add(this.fiftyPercentButton);
						percentButtonsBox.add(this.seventyFivePercentButton);
						percentButtonsBox.add(this.oneHundredPercentButton);
						transferAmountContainer.add(transferAmountBox);
						transferAmountContainer.add(this.transferAmountTextField);
						transferAmountContainer.add(percentButtonsBox);
						var tradeCostContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
							alignX : "center",
							maxWidth : 148
						});
						var tradeCostLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:costs:")).set({
							textColor : "text-label",
							marginBottom : 2,
							font : "font_size_13_bold",
							width : 148,
							textAlign : "center"
						});
						var tradeCostBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
							alignX : "center",
							allowGrowX : true,
							marginTop : 10
						});
						this.costToTradeLabel = new qx.ui.basic.Label().set({
							textColor : "text-value",
							alignY : "middle",
							font : "font_size_14_bold",
							marginLeft : 3
						});
						var dollarImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_credits.png").set({
							width : 18,
							height : 20,
							scale : true,
							AutoFlipH : false
						});
						tradeCostBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						tradeCostBox.add(dollarImage);
						tradeCostBox.add(this.costToTradeLabel);
						tradeCostBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						this.tradeButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:trade")).set({
							width : 196,
							enabled : false
						});
						this.tradeButton.addListener("execute", this.TradeWithBases, this);
						tradeCostContainer.add(tradeCostLabel);
						tradeCostContainer.add(tradeCostBox);
						tradeCostContainer.add(this.tradeButton);
						var tradeWindowCanvas = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
							decorator : new qx.ui.decoration.Background().set({
								backgroundRepeat : 'no-repeat',
								backgroundImage : "webfrontend/ui/menues/resource_transfer/bgr_restransfer_summary.png"
							})
						});
						tradeWindowCanvas.add(transferAmountContainer, {
							left : 50,
							top : 5
						});
						tradeWindowCanvas.add(tradeCostContainer, {
							left : 285,
							top : 18
						});
						tradeWindowCanvas.add(this.tradeButton, {
							left : 134,
							top : 100
						});
						tradeWindowContainer.add(tradeWindowCanvas);
						return tradeWindowContainer;
					},
					TableRowFilter : function () {
						var tableArray = [];
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null) {
							this.userDefinedMaxDistance = this.maxDistanceTextField.getValue() == "" ? -1 : parseInt(this.maxDistanceTextField.getValue(), 10);
							this.userDefinedMinimumAmount = this.minimumAmountTextField.getValue() == "" ? -1 : parseInt(this.minimumAmountTextField.getValue(), 10);
							var allCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
							for (var currentBase in allCities.d) {
								if (currentCity.get_Id() != currentBase && allCities.d[currentBase].IsOwnBase()) {
									var otherCity = allCities.d[currentBase];
									var currentBaseID = currentBase;
									var otherCityName = otherCity.get_Name();
									var distance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
									var costToTrade = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
									var resourceAmount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
									var maxResources = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
									var disqualifyDistance = false;
									var disqualifyAmount = false;
									if (this.userDefinedMaxDistance != -1 && this.userDefinedMaxDistance < distance)
										disqualifyDistance = true;
									if (this.userDefinedMinimumAmount != -1 && this.userDefinedMinimumAmount > resourceAmount)
										disqualifyAmount = true;
									if (!disqualifyDistance && !disqualifyAmount) {
										var formattedAmount = phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount);
										tableArray.push({
											Base : otherCityName,
											Distance : distance,
											Credits : costToTrade,
											AmountDesc : formattedAmount,
											Amount : resourceAmount,
											Max : maxResources.toString(),
											ID : currentBaseID
										});
									}
								}
							}
							this.tableColumnModel.setDataAsMapArray(tableArray, true);
							this.selectedRow = null;
							this.selectedRowData = null;
							this.tradeWindowTable.resetCellFocus();
							this.MaintainTradeWindow();
						}
					},
					SelectAllRows : function () {
						if (this.tradeWindowTable.getSelectionModel().getSelectedCount() != this.tableColumnModel.getRowCount()) {
							this.tradeWindowTable.getSelectionModel().setSelectionInterval(0, this.tableColumnModel.getRowCount() - 1);
							this.transferAmountTextField.setValue("");
							this.totalResourceAmount = 0;
							this.costToTradeLabel.setValue("0");
							this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select none"));
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));
							this.UpdateSelectedRows(this.tableColumnModel.getRowData(0));
							this.selectedRowData = this.tableColumnModel.getRowData(0);
						} else {
							this.tradeWindowTable.resetSelection();
							this.tradeWindowTable.resetCellFocus();
							this.transferAmountTextField.setValue("");
							this.transferWindowTableSelectedRows = [];
							this.SetCostLabel();
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
							this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
						}
					},
					AmountSort : function (bI, bJ) {
						if (bI[4] < bJ[4])
							return -1;
						if (bI[4] > bJ[4])
							return 1;
						return 0;
					},
					UpdateSelectedRows : function (rowData) {
						this.transferWindowTableSelectedRows = [];

						var localRows = [];
						var colModel = this.tableColumnModel;

						this.tradeWindowTable.getSelectionModel().iterateSelection(function (index) {
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(colModel.getRowData(index).ID);
							if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None)
								localRows.push(colModel.getRowData(index));
						});
						this.transferWindowTableSelectedRows = localRows;

					},
					TradeWindowTableCellClick : function (e) {

						var rowData = this.tableColumnModel.getRowData(e.getRow());
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(rowData.ID);

						this.modifier = 0;
						this.transferAmountTextField.setValue("");
						this.SetCostLabel();

						if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None) {
							this.selectedRow = e.getRow();
							this.selectedRowData = rowData;

							this.UpdateSelectedRows();

							if (this.transferWindowTableSelectedRows.length == 1)
								this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trade with %1", "<b>" + rowData.Base + "</b>"));
							if (this.transferWindowTableSelectedRows.length > 1)
								this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));

						}

						this.MaintainTradeWindow();

					},
					ChangeResourceType : function (e) {
						var userObject = e.getData()[0];
						this.transferAmountTextField.setValue("");
						this.transferWindowTableSelectedRows = [];
						this.SetCostLabel();
						this.tradeWindowTable.resetSelection();
						this.tradeWindowTable.resetCellFocus();
						this.resourceTransferType = userObject.getUserData("key");
						if (this.resourceTransferType == ClientLib.Base.EResourceType.Tiberium) {
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
						} else {
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_crystal.png");
						}
						this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
						this.MaintainTradeWindow();
					},
					ResourceAmountChanged : function () {
						this.modifier = 1;
						this.SetCostLabel();
					},
					CalculateTradeCost : function () {
						this.totalTransferAmount = 0;

						if (this.transferWindowTableSelectedRows.length > 0) {

							var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
							var selectedCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

							if (this.transferWindowTableSelectedRows.length > 1) {
								for (var base in this.transferWindowTableSelectedRows) {
									this.totalTransferAmount += cities[this.transferWindowTableSelectedRows[base].ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), this.transferWindowTableSelectedRows[base].Amount * this.modifier);
								}
							} else {
								this.totalTransferAmount += cities[this.selectedRowData.ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, '')));
							}
							return this.totalTransferAmount;
						}
						return 0;
					},
					ModifyResourceAmount : function (modifier) {
						this.totalResourceAmount = 0;

						this.UpdateSelectedRows(this.selectedRowData);

						if (this.transferWindowTableSelectedRows.length > 0) {
							for (var base in this.transferWindowTableSelectedRows) {
								this.totalResourceAmount += Math.floor(this.transferWindowTableSelectedRows[base].Amount * modifier);
							}
							return this.totalResourceAmount;
						}
						return 0;
					},
					SetCostLabel : function () {
						var tradeCost = this.CalculateTradeCost();
						if (this.transferAmountTextField.getValue() == "")
							tradeCost = 0;
						this.costToTradeLabel.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompactAfterMillion(tradeCost).toString());
						this.costToTradeLabel.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(tradeCost).toString());
						//this.MaintainTradeWindow();
					},
					TenPercent : function () {
						this.modifier = 0.1;
						var resourceAmount = this.ModifyResourceAmount(0.1);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					TwentyFivePercent : function () {
						this.modifier = 0.25;
						var resourceAmount = this.ModifyResourceAmount(0.25);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					FiftyPercent : function () {
						this.modifier = 0.5;
						var resourceAmount = this.ModifyResourceAmount(0.5);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					SeventyFivePercent : function () {
						this.modifier = 0.75;
						var resourceAmount = this.ModifyResourceAmount(0.75);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					OneHundredPercent : function () {
						this.modifier = 1;
						var resourceAmount = this.ModifyResourceAmount(1);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					TradeWithBases : function () {
						var transferAmount = 0;
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (this.transferWindowTableSelectedRows.length > 0) {
							if (currentCity != null && this.transferAmountTextField.getValue() != "") {
								for (var base in this.transferWindowTableSelectedRows) {
									var currentBase = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.transferWindowTableSelectedRows[base].ID);
									if (currentBase != null && currentBase.CanTrade() == ClientLib.Data.ETradeError.None && currentCity.CanTrade() == ClientLib.Data.ETradeError.None) {
										this.tradeButton.setEnabled(false);
										if (this.transferWindowTableSelectedRows.length == 1) {
											transferAmount = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
										} else {
											transferAmount = parseInt(this.transferWindowTableSelectedRows[base].Amount * this.modifier, 10);
										}
										ClientLib.Data.MainData.GetInstance().get_Player().AddCredits(-currentCity.CalculateTradeCostToCoord(currentBase.get_X(), currentBase.get_Y(), transferAmount));
										currentCity.AddResources(this.resourceTransferType, transferAmount);
										currentBase.AddResources(this.resourceTransferType, -transferAmount);
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("SelfTrade", {
											targetCityId : currentCity.get_Id(),
											sourceCityId : currentBase.get_Id(),
											resourceType : this.resourceTransferType,
											amount : transferAmount
										}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.TradeResult), null);
									}
								}

								this.tradeWindowTable.resetSelection();
								this.tradeWindowTable.resetCellFocus();
								this.transferWindowTableSelectedRows = [];
								this.transferAmountTextField.setValue("");
								this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
								this.SetCostLabel();
							}
						}
					},
					TradeResult : function (ce, result) {
						if (result != ClientLib.Base.EErrorCode.Success) {
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.selectedRowData.ID);
							this.tradeConfirmationWidget.showTradeError(this, null, city.get_Name());
						} else {
							this.SetCostLabel();
						}
						this.tradeButton.setEnabled(true);
					},
					UpdateTradeTableData : function () {
						var updatedResourceCount = [];
						var otherCity = null;
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null) {
							var transferWindowsTableData = this.tableColumnModel.getDataAsMapArray();
							for (var row in transferWindowsTableData) {
								otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(transferWindowsTableData[row].ID);
								if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase()) {
									var otherCityID = otherCity.get_Id();
									var otherCityName = otherCity.get_Name();
									var otherCityDistance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
									var otherCityTradeCost = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
									var otherCityResourceCount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
									var otherCityMaxStorage = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
									var otherCityResourceCountFormatted = phe.cnc.gui.util.Numbers.formatNumbers(otherCityResourceCount);
									updatedResourceCount.push({
										Base : otherCityName,
										Distance : otherCityDistance,
										Credits : otherCityTradeCost,
										AmountDesc : otherCityResourceCountFormatted,
										Amount : otherCityResourceCount,
										Max : otherCityMaxStorage.toString(),
										ID : otherCityID
									});
								} else {
									updatedResourceCount.push(transferWindowsTableData[row]);
								}
							}
							this.tableColumnModel.setDataAsMapArray(updatedResourceCount, true, false);
							if (this.selectedRow != null) {
								var selectedRowData = this.tableColumnModel.getRowData(this.selectedRow);
								otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(selectedRowData.ID);
								if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase() && otherCity.CanTrade() != ClientLib.Data.ETradeError.None) {
									this.selectedRowData = null;
									this.selectedRow = null;
									this.tradeWindowTable.resetCellFocus();
								} else {
									this.selectedRowData = selectedRowData;
								}
							}
						}
					},
					MaintainTradeWindow : function () {

						var hasEnoughtCredits = false;
						var validResourceAmount = true;

						if (this.transferWindowTableSelectedRows.length > 0) {

							var resourcesInTextField = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
							var tradeCost = this.CalculateTradeCost();
							var playerCreditCount = ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsCount();

							if (playerCreditCount < tradeCost) {
								this.costToTradeLabel.setTextColor("text-error");
							} else {
								this.costToTradeLabel.resetTextColor();
							}

							var selectedBaseResourceAmount = parseInt(this.selectedRowData.Amount, 10);

							if (this.transferAmountTextField.getValue() != "" && this.transferWindowTableSelectedRows.length > 1) {
								//Automatically update the text field with the new resource amount each tick
								var resourceAmount = this.ModifyResourceAmount(this.modifier);
								this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
								this.SetCostLabel();
							}

							if (this.transferWindowTableSelectedRows.length == 1) {
								if (resourcesInTextField == 0 || selectedBaseResourceAmount < resourcesInTextField) {
									this.transferAmountTextField.setTextColor("text-error");
								} else {
									this.transferAmountTextField.resetTextColor();
								}
								validResourceAmount = resourcesInTextField > 0 && resourcesInTextField <= selectedBaseResourceAmount;
							}

							hasEnoughtCredits = playerCreditCount >= tradeCost;

						}

						this.tradeButton.setEnabled(this.transferWindowTableSelectedRows.length > 0 && hasEnoughtCredits && validResourceAmount && this.transferAmountTextField.getValue() != "");
						this.transferAmountTextField.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.tenPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.twentyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.fiftyPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.seventyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.oneHundredPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);

						this.transferAmountTextField.setReadOnly(this.transferWindowTableSelectedRows.length > 1);

						if (this.tradeWindowTable.getSelectionModel().getSelectedCount() > 1) {
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:percent buttons"));
						} else {
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
						}

					},
					_onTick : function () {
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null && currentCity.get_HasIncommingAttack()) {
							this.onBtnClose();
						}
						this.UpdateTradeTableData();
						this.MaintainTradeWindow();
					}
				}
			});
		}

		function NewTradeOverlay_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined' && typeof webfrontend.gui.trade.TradeOverlay !== 'undefined') {
					qx.Class.undefine("webfrontend.gui.trade.TradeOverlay");
					CreateNewTradeOverlay();
				} else {
					window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("NewTradeOverlay_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
		}
	};

	try {
		var NewTradeOverlay = document.createElement("script");
		NewTradeOverlay.innerHTML = "(" + NewTradeOverlay_main.toString() + ")();";
		NewTradeOverlay.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(NewTradeOverlay);
		}
	} catch (e) {
		console.log("NewTradeOverlay: init error: ", e);
	}

})();

//---------------------------------Shortcuts------------------//

(function () {
	var chatHelper_main = function () {
		window.chatHelper_debug = 0; //initial debug level, top level for easy console access
		var chlog = function chlog(str,lvl){
			if (lvl > 0) { //lvl 1+
				if (window.chatHelper_debug == 1) { // lvl 1
					console.log("ChatHelper_debug: "+str+"\n");
				}
				if (window.chatHelper_debug == 2) { // lvl 2
					console.log("ChatHelper_debug: "+str+"\n");
				}
				
			} else { //lvl 0 or no arg passed to lvl
				console.log("ChatHelper_log: "+str+"\n");
			}
		};
		try {
			function createchatHelper() {
				var onkeyupDelay = 50; //ms to wait after a keyupevent before searching contacts list. Lower for faster searching. Higher for better performance.
				window.chatHelper_suppressBrowserAltKeys = true;
				window.chatHelper_version = "3.1.6";
				window.chatHelper_name = "C&C: Tiberium Alliances Chat Helper Enhanced";
				chlog(window.chatHelper_name + ' v' + window.chatHelper_version + ': loading.',0);
				var saveObj = {
					saveObjVer : "3.1.6",
					contacts : []
				}
				
				var validCharPatt = /[-\w\.]/;
				var isWhisp = false;
				var contacts = [];
				var timer;
				var _sub;

				
				function getCaretPos(obj) {
					// getCaretPos from: http://userscripts.org/scripts/show/151099
					obj.focus();
					
					if (obj.selectionStart) {
						return obj.selectionStart; //Gecko
					} else if (document.selection) //IE
					{
						var sel = document.selection.createRange();
						var clone = sel.duplicate();
						sel.collapse(true);
						clone.moveToElementText(obj);
						clone.setEndPoint('EndToEnd', sel);
						return clone.text.length;
					}
					
					return 0;
				}
				
				function moveCaret(inputObject, pos) {
					// moveCaretPos from: http://userscripts.org/scripts/show/151099
					if (inputObject.selectionStart) {
						inputObject.setSelectionRange(pos, pos);
						inputObject.focus();
					}
				}
				
				function getCursorWordPos(inputField) {
					var pos = getCaretPos(inputField);
					var inText = inputField.value;
					var lc = inText.charAt(pos - 1);
					if (lc.match(validCharPatt) != null) {
						var sPos = pos;
						var ePos = pos;
						var t = inputField.value;
						while (sPos >= 0 && t.charAt(sPos - 1).match(validCharPatt) != null) {
							sPos--;
						}
						while (ePos <= t.length && t.charAt(ePos).match(validCharPatt) != null) {
							ePos++;
						}
						//inputField.setSelectionRange(sPos,ePos);
						return [sPos, ePos];
					}
				}
				
				function tagWith(tag, inputField) {
					var eTag = tag.replace('[', '[/'); //closing tag
					var tagLen = tag.length;
					var eTagLen = eTag.length;
					if (inputField != null) {
						var pos = getCaretPos(inputField);
						var inText = inputField.value;
						//save scroll position
						if (inputField.type === 'textarea')
							var st = inputField.scrollTop;
						//if there is selected text
						if (inputField.selectionStart !== inputField.selectionEnd) {
							var a = inText.slice(0, inputField.selectionStart);
							var b = inText.slice(inputField.selectionStart, inputField.selectionEnd);
							var c = inText.slice(inputField.selectionEnd, inText.length);
							inputField.value = a + tag + b + eTag + c;
							moveCaret(inputField, pos + tagLen + eTagLen + b.length);
							//if ((input IS empty) OR (the last char was a space)) AND next char ISNOT a left sqbracket
						} else if ((inText === "" || inText.charAt(pos - 1) === " ") && (inText.charAt(pos) !== '[')) {
							inputField.value = inText.substr(0, pos) + tag + eTag + inText.substr(pos, inText.length);
							moveCaret(inputField, pos + tagLen);
							//if last character is a valid playername character
						} else if (inText.charAt(pos - 1).match(validCharPatt) != null) {
							var arr = getCursorWordPos(inputField); //
							var s = arr[0];
							var e = arr[1];
							inputField.value = inText.slice(0, s) + tag + inText.slice(s, e) + eTag + inText.slice(e, inText.length);
							moveCaret(inputField, e + tagLen + eTagLen);
						}
						//restore scroll position
						if (inputField.type === 'textarea')
							inputField.scrollTop = st;
					}
				}
				
				function showHelp() {
					alert("Type /chelp in any text box to show this message.\n\nEnter key in chat:\tsearches your chat string for Urls and Coords and wraps them before submission.\n\nAlt + 1\t:\tsearches for Urls and Coords in a message or forum post and tags accordingly. Cursor is moved to the beginning.\nAlt + 2\t:\tManual URL insertion popup window\nAlt + 0\t:\tclears all tags\n\nWord wraps: tags a selected word -or- tags the word where the cursor is (if chat is empty or you hit <space> empty tags are inserted).\nAttempts to preserve cursor and scroll position.\n|\tAlt + p or Alt + 3\t:\tplayer tags\n|\tAlt + a or Alt + 4\t:\talliance tags\n|\tAlt + b\t\t\t:\tbold tags\n|\tAlt + i\t\t\t:\titalic tags\n|\tAlt + u\t\t\t:\tunderline tags\n|__\tAlt + s\t\t\t:\tstrikethrough tags\n\nContact list commands:\n/list -or- /contacts\n/add\n/del\n/del all - wipes your whole contact list");
				}
				
				function saveData() {
					saveObj.contacts = contacts;
					var jString = JSON.stringify(saveObj);
					chlog("saveJSON: "+jString, 1);
					localStorage.setItem('chatHelper', jString);
				}

				function loadData() {
					try{
						if (localStorage.getItem('myContacts')) { //should be removed eventually
							var dat = localStorage.getItem('myContacts');
							dat = dat.split(',');
							saveObj.contacts = dat;
							
							//unset old storage 
							localStorage.removeItem('myContacts');
						} else if (localStorage.getItem('chatHelper')) {
							var saveObjTmp = JSON.parse(localStorage.getItem('chatHelper'));
							if (saveObjTmp.saveObjVer != window.chatHelper_version){
								//version changed
								var va = saveObjTmp.saveObjVer.split('.');
								var vb = window.chatHelper_version.split('.');
								
								if (va[0] != vb[0]){ //major version change
									chlog("ChatHelper: Major version change from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
								} else {
									if (va[1] != vb[1]){ //minor version change
										chlog("ChatHelper: Minor version change from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
									} else {
										if (va[2] != vb[2]){ //patch release
											chlog("ChatHelper: Version Patched from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
										}
									}
								}
							} else {
								//no version change
								localStorage.getItem('chatHelper');
							}
							saveObj = saveObjTmp;
						}
						contacts = saveObj.contacts;
						saveData();
					}catch(err){
						chlog(err);
					}
				}
				
				if (!localStorage.myContacts) {
					chlog("Deprecated contacts variable does not exist.",1);
					loadData();
				} else {
					//contacts = loadData();
					loadData();
					chlog("Contacts: " + contacts, 1);
				}
				
				function saveContact(fr) {
					chlog("Number of contacts == "+contacts.length,1);
					contacts.push(fr);
					chlog(fr + " added to contacts list.",1);
					saveData();
				}
				
				function caseInsensitiveSort(a, b) {
					a = a.toLowerCase();
					b = b.toLowerCase();
					if (a > b)
						return 1;
					if (a < b)
						return -1;
					return 0;
				}
				
				function listContacts() {
					var len = contacts.length;
					var a = contacts.sort(caseInsensitiveSort);
					if (len == 1) {
						alert(len + " Contact:\n\n" + a.join("\n") + "\n");
					} else if (len > 1) {
						alert(len + " Contacts:\n\n" + a.join("\n") + "\n");
					} else {
						var p = prompt("Your contacts list is empty.\n\nType a name here to add a contact:\n", "");
						if (p) {
							saveContact(p);
						}
					}
				}
				
				function deleteContact(fr) {
					if (fr === "all") {
						contacts = [];
						chlog("All contacts deleted",1);
						saveData();
					} else {
						var ind = contacts.indexOf(fr);
						if (ind > -1) {
							saveObj.contacts = contacts.splice(ind, 1);
							saveData();
							chlog(contacts,1);
							chlog(fr + " deleted from contacts list.");
						}
					}
				}
				function keyUpTimer(kEv) {
					kEv = kEv || window.event;
					if (kEv.target.type === "text" && kEv.target.value != '') {
						var inputField = kEv.target;
						var inText = inputField.value;
						var len = inText.length;
						var sub;
						var kc = kEv.keyCode;
						if (len >= 10 && inText.match(/^(\/whisper)/) != null) {
							isWhisp = true;
						}
						if (isWhisp && len >= 10 && !kEv.altGraphKey && !kEv.ctrlKey && !kEv.altKey && kc > 47 && kc < 91) {
							chlog("keyUpTimer keyCode =="+kEv.keyCode,1);
							sub = inText.substr(9);
							if (!sub.match(/\s/)) {
								for (var i = 0; i < contacts.length; i++) {
									var slen = sub.length;
									if (contacts[i][slen - 1] === sub[slen - 1] && contacts[i].substr(0, slen) == sub) {
										inputField.value = "/whisper " + contacts[i] + " ";
										inputField.setSelectionRange(10 + slen - 1, 10 + contacts[i].length, "forward");
									}
								}
							} else {
								isWhisp = false;
							}
						} else {
							isWhisp = false;
						}
					}
				}
				
				document.onkeyup = function (kEv) {
					clearTimeout(timer);
					timer = setTimeout(function () {
							keyUpTimer(kEv);
						}, onkeyupDelay);
				}
				
				function delayedConfirm() {
					if (confirm("Add " + _sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
						saveContact(_sub);
					}
				}
				
				function autoTag(inputField, inText) {
					var isUrl = false;
					var lookBack;
					//the code here is mostly from Bruce Doan: http://userscripts.org/scripts/show/151965
					////auto url
					inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\+\|#:;,~\*\(\)\$]*)*\/?(\[\/url\])*/gi, function () {
							var result = new Array();
							var protocol = arguments[2].match(/https?:\/\//);
							for (var i in arguments){
								chlog("autoTag url reg arg "+i + "= " + arguments[i],1);
							}
							result.push('[url]');
							result.push(arguments[2]); // http[s]://
							result.push(arguments[3]); // domain
							result.push(arguments[4]); // ext
							result.push(arguments[5]); // query string
							result.push('[/url]');
							if (protocol === null){
								chlog("autotag url - no protocol",2);
							} else {
								isUrl = true;
								chlog("bypassing coords tagging\n detected protocol = " + protocol,2);
								
							}
							return result.join('');
						});
					////auto coords
					if (!isUrl) {
						chlog("checking for coords",1);
						lookBack = inText.replace(/(\[coords\])?([#])?([0-9]{3,4})[:.]([0-9]{3,4})([:.]\w+)?(\[\/coords\])?/gi, function () {
								for (var i in arguments){
									chlog("autoTag coords reg arg " + i + " = " + arguments[i],1);
								}
								var hashBefore = arguments[2];
								chlog("hashBefore "+hashBefore,1);
								if (!hashBefore) {
									chlog("no hash returning");
									var result = new Array();
									result.push('[coords]');
									result.push(arguments[3]);
									result.push(':');
									result.push(arguments[4]);
									if (arguments[5] != undefined) {
										result.push(arguments[5].replace('.', ':'));
									}
									result.push('[/coords]');
									return result.join('');
								} else {
									return arguments[0];
								}
							});
						inText = lookBack;
						chlog("lookedback",1);
						chlog("LB string: "+lookBack,1);
					}
					// shorthand for player
					inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
					// shorthand for alliance
					inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
					
					return inText;
				}
				
				document.onkeydown = function (kEv) {
					kEv = kEv || window.event;
					
					/* Tab key
					if (kEv.keyCode == 9){
						chlog("Tab key pressed",1)
						var input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
						kEv.preventDefault();
						kEv.stopPropagation();
					}
					 */
					if (!kEv.shiftKey && kEv.keyCode === 13 && (kEv.target.type === "text" || kEv.target.type === "textarea")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						var add = inText.match(/^(\/add)/);
						var del = inText.match(/^(\/del)/);
						var showContacts = inText.match(/^((\/contacts)|(\/list))/);
						var sub;
						var cf;
						if (inText.match(/^(\/whisper)/) != null || add != null) {
							if (add != null) {
								sub = inText.substr(5);
							} else {
								sub = inText.substr(9);
							}
							if (sub.match(/^(\w*)\s/)) {
								//if space after player name (is a whisper or a typo)
								var arr = sub.match(/^(\w*)/);
								sub = arr[0].replace(/\s$/, "");
								if (contacts.indexOf(sub) == -1) {
									//not in contacts list
									_sub = sub;
									setTimeout(delayedConfirm, 500);
								}
							} else if (contacts.indexOf(sub) == -1) {
								//no message to send, not in contacts, promt to add, clear input
								chlog("clearing input field",1);
								inputField.focus(); //?necessary?
								inputField.value = "";
								var cf = confirm("Add " + sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list");
								if (cf) {
									saveContact(sub);
									return false;
								} else {
									return false;
								}
							} else if (sub && contacts.indexOf(sub) > -1) {
								//not a whisper, reject duplicate contact
								alert(sub + " is already in your contacts list.");
							}
						}
						//remove contact(s)
						if (del) {
							sub = inText.substr(5);
							chlog("clearing input field",1);
							inputField.value = "";
							if ((contacts.indexOf(sub) > -1 || sub == "all") && confirm("Really delete " + sub + " from your contacts?")) {
								deleteContact(sub);
							} else {
								alert(sub + " is not in your contacts list.");
							}
							return false;
						}
						// show contacts list
						if (showContacts) {
							chlog("clearing input field",1);
							inputField.value = "";
							listContacts();
							return false;
							
						}
						// /chelp dialog
						if (inText.length === 6 && inText.match(/^(\/chelp)/) != null) {
							chlog("clearing input field",1);
							inputField.value = "";
							showHelp();
							return false;
						}
						
						if (inputField != null && inputField.type === "text" && inText !== "") {
							chlog("onEnter auto-tagging",1);
							
							inText = autoTag(inputField, inText); //auto-tag
							
							if (inText !== inputField.value) {
								inputField.value = inText;
							}
						}
					}
					
					if (kEv.altKey && !kEv.shiftKey && !kEv.altGraphKey && !kEv.ctrlKey && kEv.target != null && (kEv.target.type === "textarea" || kEv.target.type === "text")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						// Alt key, not Ctrl or AltGr
						if (kEv.altKey && !kEv.altGraphKey && !kEv.ctrlKey) {
							var cc = kEv.charCode;
							var kc = kEv.keyCode;
							chlog("charCode == "+cc,1);
							chlog("keyCode == "+kc,1);

							/* Alt+1 for auto Coordinates/Urls in message body */
							if (inputField.type === "textarea" && (cc === 49 || kc === 49)) {
								var pos = getCaretPos(inputField);
								chlog("attempting Alt+1 message auto-tag",1);
								if (inputField != null) {
									var st = inputField.scrollTop;
									
									inText = autoTag(inputField, inText); //auto-tag
									
									if (inText !== "" || inText !== inputField.value) {
										inputField.value = inText;
										inputField.scrollTop = st;
										moveCaret(inputField, 0);
									}
								}
							}
							/* Alt+2 for URLs fallback */
							if (cc === 50 || kc === 50) {
								if (inputField != null) {
									var url = prompt("Website (Syntax: google.com or www.google.com)", "");
									if (url != null) {
										inputField.value += '[url]' + url + '[/url]';
									}
								}
							}
							/* Alt+3 or Alt+p for players */
							if ((cc === 112 || kc === 80) || (cc === 51 || kc === 51)) {
								tagWith('[player]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+4 or Alt+a for alliances */
							if ((cc === 97 || kc === 65) || (cc === 52 || kc === 52)) {
								tagWith('[alliance]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+0 to clear tags */
							if (cc === 48 || kc === 48) {
								if (inputField.type === 'textarea')
									var st = inputField.scrollTop;
								if (inputField != null) {
									inText = inText.replace(/\[\/?coords\]/gi, '');
									inText = inText.replace(/\[\/?url\]/gi, '');
									inText = inText.replace(/\[\/?player\]/gi, '');
									inText = inText.replace(/\[\/?alliance\]/gi, '');
									inText = inText.replace(/\[\/?b\]/gi, '');
									inText = inText.replace(/\[\/?i\]/gi, '');
									inText = inText.replace(/\[\/?u\]/gi, '');
									inText = inText.replace(/\[\/?s\]/gi, '');
									inputField.value = inText;
								}
								if (inputField.type === 'textarea')
									inputField.scrollTop = st;
							}
							/* Alt+b for bold */
							if (cc === 98 || kc === 66) {
								tagWith('[b]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+i for italics */
							if (cc === 105 || kc === 73) {
								tagWith('[i]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+u for underline */
							if (cc === 117 || kc === 85) {
								tagWith('[u]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+s for strikethrough */
							if (cc === 115 || kc === 83) {
								tagWith('[s]', inputField);
								if (window.chatHelper_suppressBrowserAltKeys)
									return false;
							}
						}
					}
				}
			}
		} catch (err) {
			chlog("createchatHelper: "+ err,1);
			console.error(err);
		}
		
		function chatHelper_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined') {
					createchatHelper();
				} else {
					window.setTimeout(chatHelper_checkIfLoaded, 1333);
				}
			} catch (err) {
				console.log("chatHelper_checkIfLoaded: ", err);
			}
		}
		window.setTimeout(chatHelper_checkIfLoaded, 1333);
	};
	try {
		var chatHelper = document.createElement("script");
		chatHelper.innerHTML = "(" + chatHelper_main.toString() + ")();";
		chatHelper.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(chatHelper);
	} catch (err) {
		console.log("chatHelper: init error: ", err);
	}
})();

//-------------------------------Stycker Note----------------------------------//

(function () {
    var InfoSticker_main = function () {
        try {
            function createInfoSticker() {
                console.log('InfoSticker loaded');
                // define Base
                qx.Class.define("InfoSticker.Base", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        /* Desktop */
                        dataTimerInterval: 1000,
                        positionInterval: 500,
                        tibIcon: null,
                        cryIcon: null,
                        powIcon: null,
                        creditIcon: null,
                        repairIcon: null,
                        hasStorage: false,

                        initialize: function () {
                            try {
                                this.hasStorage = 'localStorage' in window && window['localStorage'] !== null;
                            } catch (se) {}
                            try {
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.tibIcon = fileManager.GetPhysicalPath("ui/common/icn_res_tiberium.png");
                                this.cryIcon = fileManager.GetPhysicalPath("ui/common/icn_res_chrystal.png");
                                this.powIcon = fileManager.GetPhysicalPath("ui/common/icn_res_power.png");
                                this.creditIcon = fileManager.GetPhysicalPath("ui/common/icn_res_dollar.png");
								this.repairIcon = fileManager.GetPhysicalPath("ui/icons/icn_repair_off_points.png");
                                
								if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
									this.attachEvent = webfrontend.gui.Util.attachNetEvent;
								else
									this.attachEvent = phe.cnc.Util.attachNetEvent;
                                
                                this.runMainTimer();
                            } catch (e) {
                                console.log("InfoSticker.initialize: ", e.toString());
                            }
                        },
                        runMainTimer: function () {
                            try {
                                var self = this;
                                this.calculateInfoData();
                                window.setTimeout(function () {
                                    self.runMainTimer();
                                }, this.dataTimerInterval);
                            } catch (e) {
                                console.log("InfoSticker.runMainTimer: ", e.toString());
                            }
                        },
                        runPositionTimer: function () {
                            try {
                                var self = this;
                                this.repositionSticker();
                                window.setTimeout(function () {
                                    self.runPositionTimer();
                                }, this.positionInterval);
                            } catch (e) {
                                console.log("InfoSticker.runPositionTimer: ", e.toString());
                            }
                        },
                        infoSticker: null,
                        mcvPopup: null,
                        mcvTimerLabel: null,
                        mcvInfoLabel: null,
                        mcvPane: null,
                        
                        repairPopup: null,
                        repairTimerLabel: null,

                        resourcePane: null,
                        resourceHidden: false,
                        resourceTitleLabel: null,
                        resourceHideButton: null,
                        resourceLabel1: null,
                        resourceLabel2: null,
                        resourceLabel3: null,

                        resourceLabel1per: null,
                        resourceLabel2per: null,
                        resourceLabel3per: null,

                        productionTitleLabel: null,
                        productionLabelPower: null,
                        productionLabelCredit: null,

                        repairInfoLabel: null,

                        lastButton: null,

                        top_image: null,
                        bot_image: null,

                        toFlipH: [],

                        pinButton: null,
                        pinned: false,

                        pinTop: 130,
                        pinButtonDecoration: null,
                        pinPane: null,

                        pinIconFix: false,
                        
                        lockButton: null,
                        locked: false,

                        lockButtonDecoration: null,
                        lockPane: null,

                        lockIconFix: false,
                        
                        mcvHide: false,
                        repairHide: false,
                        resourceHide: false,
                        productionHide: false,
                        stickerBackground: null,
                        
                        mcvPane: null,
                        
                        pinLockPos: 0,
                        
                        attachEvent: function() {},
                        
                        isNull: function(e) {
                            return typeof e == "undefined" || e == null;
                        },
                        
                        getApp: function() {
                            return qx.core.Init.getApplication();
                        },
                        
                        getBaseListBar: function() {
                            var app = this.getApp();
                            var b;
                            if(!this.isNull(app)) {
                                b = app.getBaseNavigationBar();
                                if(!this.isNull(b)) {
                                    if(b.getChildren().length > 0) {
                                        b = b.getChildren()[0];
                                        if(b.getChildren().length > 0) {
                                            b = b.getChildren()[0];
                                            return b;
                                        }
                                    }
                                }
                            }
                            return null;
                        },
                        
                        repositionSticker: function () {
                            try {
                            	var i;
                                
                                if (this.infoSticker && !this.mcvInfoLabel.isDisposed() && !this.mcvPopup.isDisposed()) {
                                    var dele;

                                    try {
                                        if (this.top_image != null) {
                                            dele = this.top_image.getContentElement().getDomElement();
                                            if (dele != null) {
                                                dele.style["-moz-transform"] = "scaleY(-1)";
                                                dele.style["-o-transform"] = "scaleY(-1)";
                                                dele.style["-webkit-transform"] = "scaleY(-1)";
                                                dele.style.transform = "scaleY(-1)";
                                                dele.style.filter = "FlipV";
                                                dele.style["-ms-filter"] = "FlipV";
                                                this.top_image = null;
                                            }
                                        }
                                        for (i = this.toFlipH.length - 1; i >= 0; i--) {
                                            var e = this.toFlipH[i];
                                            if(e.isDisposed()) this.toFlipH.splice(i, 1);
                                            else {
                                                dele = e.getDecoratorElement().getDomElement();
                                                if (dele != null) {
                                                    dele.style["-moz-transform"] = "scaleX(-1)";
                                                    dele.style["-o-transform"] = "scaleX(-1)";
                                                    dele.style["-webkit-transform"] = "scaleX(-1)";
                                                    dele.style.transform = "scaleX(-1)";
                                                    dele.style.filter = "FlipH";
                                                    dele.style["-ms-filter"] = "FlipH";
                                                    this.toFlipH.splice(i, 1);
                                                }
                                            }
                                        }
                                    } catch (e2) {
                                        console.log("Error flipping images.", e2.toString());
                                    }
                                    var baseListBar = this.getBaseListBar();
                                    if(baseListBar!=null) {
                                        var baseCont = baseListBar.getChildren();
                                        for (i = 0; i < baseCont.length; i++) {
                                            var baseButton = baseCont[i];
                                            if(typeof baseButton.getBaseId === 'function') {
                                                if(baseButton.getBaseId() == ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id()
                                                    && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                            //var baseButtonDecorator = baseButton.getDecorator();
                                            //if (baseButton!=this.mcvPopup && baseButtonDecorator != null && typeof baseButtonDecorator === "string" && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                                //if (baseButtonDecorator.indexOf("focused") >= 0 || baseButtonDecorator.indexOf("pressed") >= 0) {
                                                    if(this.locked) {
                                                        if(!this.pinned) {
                                                            if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                                baseListBar.remove(this.mcvPopup);
                                                            }
                                                            this.pinLockPos = baseListBar.indexOf(baseButton)+1;
                                                            baseListBar.addAt(this.mcvPopup, this.pinLockPos);
                                                        } else if(baseListBar.indexOf(this.mcvPopup)<0) {
                                                            baseListBar.addAt(this.mcvPopup, Math.max(0, Math.min(this.pinLockPos, baseCont.length)));
                                                        }
                                                    } else {
                                                        if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                            baseListBar.remove(this.mcvPopup);
                                                        }
                                                        if (!this.pinned) {
                                                            var top = baseButton.getBounds().top;
                                                            var infoTop;
                                                            try {
                                                                var stickerHeight = this.infoSticker.getContentElement().getDomElement().style.height;
                                                                stickerHeight = stickerHeight.substring(0, stickerHeight.indexOf("px"));
                                                                infoTop = Math.min(130 + top, Math.max(660, window.innerHeight) - parseInt(stickerHeight, 10) - 130);
                                                            } catch (heighterror) {
                                                                infoTop = 130 + top;
                                                            }
                                                            if(this.infoSticker.getContentElement().getDomElement()!=null)
                                                                this.infoSticker.setDomTop(infoTop);
                                                            
                                                            this.pinTop = infoTop;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    
                                }
                            } catch (ex) {
                                console.log("InfoSticker.repositionSticker: ", ex.toString());
                            }
                        },
                        toLock: function (e) {
                            try {
                                this.locked = !this.locked;
                                if(!this.locked) {
                                    this.infoSticker.show();
                                    this.stickerBackground.add(this.mcvPopup);
                                }
                                else this.infoSticker.hide();
                                this.lockButton.setIcon(this.locked ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png");
                                this.updateLockButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.locked) {
                                        localStorage["infoSticker-locked"] = "true";
                                        if(this.pinned) localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                    } else {
                                        localStorage["infoSticker-locked"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                                this.repositionSticker();
                            } catch(e) {
                                console.log("InfoSticker.toLock: ", e.toString());
                            }
                        },
                        updateLockButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.lockPane.setDecorator(null);
                            this.lockButtonDecoration = new qx.ui.decoration.Background();
                            this.lockButtonDecoration.setBackgroundColor(this.locked ? dark : light);
                            this.lockPane.setDecorator(this.lockButtonDecoration);
                        },
                        toPin: function (e) {
                            try {
                                this.pinned = !this.pinned;
                                this.pinButton.setIcon(this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png");
                                this.updatePinButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.pinned) {
                                        localStorage["infoSticker-pinned"] = "true";
                                        localStorage["infoSticker-top"] = this.pinTop.toString();
                                        if(this.locked) {
                                            localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                        }
                                    } else {
                                        localStorage["infoSticker-pinned"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                            } catch(e) {
                                console.log("InfoSticker.toPin: ", e.toString());
                            }
                        },
                        updatePinButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.pinPane.setDecorator(null);
                            this.pinButtonDecoration = new qx.ui.decoration.Background().set({
                                //innerOpacity: 0.5
                            });
                            //this.pinButtonDecoration.setInnerColor(this.pinned ? mid : light);
                            //this.pinButtonDecoration.setOuterColor(this.pinned ? light : mid);
                            this.pinButtonDecoration.setBackgroundColor(this.pinned ? dark : light);
                            this.pinPane.setDecorator(this.pinButtonDecoration);
                        },
                        hideResource: function () {
                            try {
                                //if(this.resourceHidden) 
                                if (this.resourcePane.isVisible()) {
                                    //this.resourcePane.hide();
                                    this.resourcePane.exclude();
                                    this.resourceHideButton.setLabel("+");
                                } else {
                                    this.resourcePane.show();
                                    this.resourceHideButton.setLabel("-");
                                }
                            } catch(e) {
                                console.log("InfoSticker.hideResource: ", e.toString());
                            }
                        },
                        lastPane: null,
                        createSection: function (parent, titleLabel, visible, visibilityStorageName) {
							try {
								var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									padding: [5, 0, 5, 5],
									width: 124,
									decorator: new qx.ui.decoration.Background().set({
										backgroundImage: "decoration/pane_messaging_item/messaging_items_pane.png",
										backgroundRepeat: "scale",
									}),
									alignX: "right"
								});
								
								var labelStyle = {
									font: qx.bom.Font.fromString('bold').set({
										size: 12
									}),
									textColor: '#595969'
								};
								titleLabel.set(labelStyle);
								
								var hidePane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									width: 124,
                                    alignX: "right"
								});
								
								var hideButton = new qx.ui.form.Button("-").set({
									//decorator: new qx.ui.decoration.Single(1, "solid", "black"),
									maxWidth: 15,
									maxHeight: 10,
									//textColor: "black"
								});
                                var self = this;
								//resourceHideButton.addListener("execute", this.hideResource, this);
								hideButton.addListener("execute", function () {
									if (hidePane.isVisible()) {
										hidePane.exclude();
										hideButton.setLabel("+");
									} else {
										hidePane.show();
										hideButton.setLabel("-");
									}
									if(self.hasStorage)
										localStorage["infoSticker-"+visibilityStorageName] = !hidePane.isVisible();
								});

								var titleBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));
								titleBar.add(hideButton);
								titleBar.add(titleLabel);
								pane.add(titleBar);
								pane.add(hidePane);
								
                                if(!visible) hidePane.exclude();
                                
								this.toFlipH.push(pane);

                                this.lastPane = pane;
								parent.add(pane);
								
								return hidePane;
							} catch(e) {
								console.log("InfoSticker.createSection: ", e.toString());
								throw e;
							}
                        },
						createHBox: function (ele1, ele2, ele3) {
							var cnt;
							cnt = new qx.ui.container.Composite();
							cnt.setLayout(new qx.ui.layout.HBox(0));
							if (ele1 != null) {
								cnt.add(ele1);
								ele1.setAlignY("middle");
							}
							if (ele2 != null) {
								cnt.add(ele2);
								ele2.setAlignY("bottom");
							}
							if (ele3 != null) {
								cnt.add(ele3);
								ele3.setAlignY("bottom");
							}

							return cnt;
						},
                        
                        formatCompactTime: function (time) {
                            var comps = time.split(":");
                            
                            var i = 0;
                            var value = Math.round(parseInt(comps[i], 10)).toString();
                            var len = comps.length;
                            while(value==0) {
                                value = Math.round(parseInt(comps[++i], 10)).toString();
                                len--;
                            }
                            var unit;
                            switch(len) {
                                case 1: unit = "s"; break;
                                case 2: unit = "m"; break;
                                case 3: unit = "h"; break;
                                case 4: unit = "d"; break;
                            }
                            return value+unit;
                        },
                        createImage: function(icon) {
                            var image = new qx.ui.basic.Image(icon);
                            image.setScale(true);
                            image.setWidth(20);
                            image.setHeight(20);
                            return image;
                        },

                        createMCVPane: function() {
                            try {
                                this.mcvInfoLabel = new qx.ui.basic.Label();
                                this.mcvTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 18
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center'
                                });
                                this.mcvTimerCreditProdLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('normal').set({
                                        size: 12
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center',
                                    marginTop: 4,
                                    marginBottom: -4
                                });
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                
                                
                                var pane = this.createSection(b3, this.mcvInfoLabel, !this.mcvHide, "mcvHide");
                                pane.add(this.mcvTimerLabel);
                                pane.add(this.mcvTimerCreditProdLabel);
                                this.mcvPane = this.lastPane;
                                this.lastPane.setMarginLeft(7);
                                
                            } catch(e) {
                                console.log("InfoSticker.createMCVPopup", e.toString());
                            }
                        },
                        moveStickerUp: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.max(0, this.pinLockPos-1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerUp", e.toString());
                            }
                        },
                        moveStickerDown: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.min(baseListBar.getChildren().length, this.pinLockPos+1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerDown", e.toString());
                            }
                        },
                        menuUpButton: null,
                        menuDownButton: null,
                        createMCVPopup: function() {
                            try {
                                var self = this;
                                this.mcvPopup = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                    spacing: 3})).set({
                                    paddingLeft: 5,
                                    width: 105,
                                    decorator: new qx.ui.decoration.Background()
                                });
                                
                                var menu = new qx.ui.menu.Menu();
                                var menuPinButton = new qx.ui.menu.Button("Pin", "FactionUI/icons/icn_thread_pin_inactive.png");
                                menuPinButton.addListener("execute", this.toPin, this);
                                menu.add(menuPinButton);
                                var menuLockButton = new qx.ui.menu.Button("Lock", "FactionUI/icons/icn_thread_locked_inactive.png");
                                menuLockButton.addListener("execute", this.toLock, this);
                                menu.add(menuLockButton);
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.menuUpButton = new qx.ui.menu.Button("Move up", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_up.png"));
                                //ui/icons/icon_tracker_arrow_up.png ui/gdi/icons/cht_opt_arrow_down.png
                                this.menuUpButton.addListener("execute", this.moveStickerUp, this);
                                menu.add(this.menuUpButton);
                                this.menuDownButton = new qx.ui.menu.Button("Move down", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_down.png"));
                                this.menuDownButton.addListener("execute", this.moveStickerDown, this);
                                menu.add(this.menuDownButton);
                                this.mcvPopup.setContextMenu(menu);
                                if(!this.locked) {
                                    this.stickerBackground.add(this.mcvPopup);
                                }
    
    ////////////////////////////----------------------------------------------------------
                                this.pinButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.pinButton.addListener("execute", this.toPin, this);
                                
                                this.pinPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updatePinButtonDecoration();
                                
                                this.pinPane.setDecorator(this.pinButtonDecoration);
                                this.pinPane.add(this.pinButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                var icon = this.pinButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.lockButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.lockButton.addListener("execute", this.toLock, this);
                                
                                this.lockPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updateLockButtonDecoration();
                                
                                this.lockPane.setDecorator(this.lockButtonDecoration);
                                this.lockPane.add(this.lockButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                icon = this.lockButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.resourceTitleLabel = new qx.ui.basic.Label();
                                this.resourceTitleLabel.setValue("Base");
                                var resStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 14
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 65,
                                    marginLeft: -10,
                                    textAlign: 'right'
                                };
                                
                                this.resourceLabel1 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel2 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel3 = new qx.ui.basic.Label().set(resStyle);
                                
                                var perStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 9
                                    }),
                                    textColor: '#282828',
                                    height: 18,
                                    width: 33,
                                    textAlign: 'right'
                                };
                                this.resourceLabel1per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel2per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel3per = new qx.ui.basic.Label().set(perStyle);
                                
                                
                                var pane3 = this.createSection(this.mcvPopup, this.resourceTitleLabel, !this.resourceHide, "resourceHide");
                                
                                
                                this.repairTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 16
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    marginLeft: 0,
                                    textAlign: 'center'
                                });
                                pane3.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimerLabel));
                                
                                pane3.add(this.createHBox(this.createImage(this.tibIcon), this.resourceLabel1, this.resourceLabel1per));
                                pane3.add(this.createHBox(this.createImage(this.cryIcon), this.resourceLabel2, this.resourceLabel2per));
                                pane3.add(this.createHBox(this.createImage(this.powIcon), this.resourceLabel3, this.resourceLabel3per));
                                
                                var mcvC = this.mcvPopup.getChildren();
                                mcvC[mcvC.length-1].getChildren()[0].add(this.pinPane);
                                mcvC[mcvC.length-1].getChildren()[0].add(this.lockPane);
    ////////////////////////////----------------------------------------------------------
    
                                this.productionTitleLabel = new qx.ui.basic.Label();
                                this.productionTitleLabel.setValue("Productions");
                                
                                var productionStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 70,
                                    textAlign: 'right',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
								this.productionLabelTiberium = new qx.ui.basic.Label().set(productionStyle);
								this.productionLabelCrystal = new qx.ui.basic.Label().set(productionStyle);
                                this.productionLabelPower = new qx.ui.basic.Label().set(productionStyle);
								this.productionLabelPower1 = new qx.ui.basic.Label().set(productionStyle);
                                this.productionLabelCredit = new qx.ui.basic.Label().set(productionStyle);
                                
                                var pane4 = this.createSection(this.mcvPopup, this.productionTitleLabel, !this.productionHide, "productionHide");
                                pane4.add(this.createHBox(this.createImage(this.tibIcon), this.productionLabelTiberium));
                                pane4.add(this.createHBox(this.createImage(this.cryIcon), this.productionLabelCrystal));
								pane4.add(this.createHBox(this.createImage(this.powIcon), this.productionLabelPower));
								pane4.add(this.createHBox(this.createImage(this.powIcon), this.productionLabelPower1));
                                pane4.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
                            } catch(e) {
                                console.log("InfoSticker: createMCVPopup", e.toString());
                            }
                        },
                        currentCityChange: function() {
                            this.calculateInfoData();
                            this.repositionSticker();
                        },
                        disposeRecover: function() {
                            
                            try {
                                if(this.mcvPane.isDisposed()) {
                                    this.createMCVPane();
                                }
                                
                                if(this.mcvPopup.isDisposed()) {
                                    this.createMCVPopup();
                                    
                                    this.repositionSticker();
                                }
                                this.waitingRecovery = false;
                            } catch(e) {
                                console.log("InfoSticker: disposeRecover", e.toString());
                            }
                            
                        },
                        waitingRecovery: false,
                        citiesChange: function() {
                            try {
                                var self = this;
                                var baseListBar = this.getBaseListBar();
                                this.disposeRecover();
                                
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                    this.mcvPopup.dispose();
                                }
                                
                                if(baseListBar.indexOf(this.mcvPane)>=0) {
                                    baseListBar.remove(this.mcvPane);
                                    this.mcvPane.dispose();
                                }
                                if(!this.waitingRecovery) {
                                    this.waitingRecovery = true;
                                    window.setTimeout(function () {
                                        self.disposeRecover();
                                    }, 10);
                                }
                            } catch(e) {
                                console.log("InfoSticker: citiesChange", e.toString());
                            }
                        },
                        calculateInfoData: function () {
                            try {
                                var self = this;
                                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                                var cw = player.get_Faction();
                                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                                var cr = player.get_PlayerResearch();
                                var cd = cr.GetResearchItemFomMdbId(cj);
                                
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                if(b3.getChildren().length==0) return;
                                if (!this.infoSticker) {
                                    this.infoSticker = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                        alignX: "right"
                                    })).set({
                                        width: 105,
                                    });

                                    var top = 130;
                                    if (this.hasStorage) {
                                        var l = localStorage["infoSticker-locked"] == "true";
                                        if (l != null) {
                                            this.locked = l;
                                            var pl = localStorage["infoSticker-pinLock"];
                                            if(pl!=null) {
                                                try {
                                                	this.pinLockPos = parseInt(pl, 10);
                                                } catch(etm) {}
                                            }
                                        }
                                        
                                        var p = localStorage["infoSticker-pinned"];
                                        var t = localStorage["infoSticker-top"];
                                        if (p != null && t != null) {
                                            var tn;
                                            try {
                                                this.pinned = p == "true";
                                                if (this.pinned) {
                                                    tn = parseInt(t, 10);
                                                    top = tn;
                                                }
                                            } catch (etn) {}
                                        }
                                        this.mcvHide = localStorage["infoSticker-mcvHide"] == "true";
                                        this.repairHide = localStorage["infoSticker-repairHide"] == "true";
                                        this.resourceHide = localStorage["infoSticker-resourceHide"] == "true";
                                        this.productionHide = localStorage["infoSticker-productionHide"] == "true";
                                    }
                                    
                                    
                                    app.getDesktop().add(this.infoSticker, {
                                        right: 124,
                                        top: top
                                    });
                                    if(this.locked) {
                                        this.infoSticker.hide();
                                    }

                                    this.stickerBackground = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                        //paddingLeft: 5,
                                        width: 105,
                                        decorator: new qx.ui.decoration.Background().set({
                                            backgroundImage: "webfrontend/ui/common/bgr_region_world_select_scaler.png",
                                            backgroundRepeat: "scale",
                                        })
                                    });
                                    
                                    this.createMCVPane();
                                    this.createMCVPopup();
									
                                    if(this.locked && this.pinned) {
                                        this.menuUpButton.setEnabled(true);
                                        this.menuDownButton.setEnabled(true);
                                    } else {
                                        this.menuUpButton.setEnabled(false);
                                        this.menuDownButton.setEnabled(false);
                                    }
                                    
                                    this.top_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.top_image);

                                    this.infoSticker.add(this.stickerBackground);
                                    //this.infoSticker.add(this.mcvPopup);

                                    this.bot_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.bot_image);

                                    this.runPositionTimer();

                                    try {
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.currentCityChange);
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "Change", ClientLib.Data.CitiesChange, this, this.citiesChange);
                                    } catch(eventError) {
                                        console.log("InfoSticker.EventAttach:", eventError);
                                        console.log("The script will continue to run, but with slower response speed.");
                                    }
                                }
                                this.disposeRecover();
                                
                                if (cd == null) {
                                    if (this.mcvPopup) {
                                        //this.mcvInfoLabel.setValue("MCV ($???)");
                                        this.mcvInfoLabel.setValue("MCV<br>$???");
                                        this.mcvTimerLabel.setValue("Loading");
                                    }
                                } else {
                                    var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                                    var resourcesNeeded = [];
                                    for (var i in nextLevelInfo.rr) {
                                        if (nextLevelInfo.rr[i].t > 0) {
                                            resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                                        }
                                    }
                                    //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                                    //var currentResearchPoints = player.get_ResearchPoints();
                                    var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                                    var creditsResourceData = player.get_Credits();
                                    var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                                    var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
                                    this.mcvInfoLabel.setValue("MCV ($ " + this.formatNumbersCompact(creditsNeeded) + ")");
                                    //this.mcvInfoLabel.setValue("MCV<br>$" + this.formatNumbersCompact(creditsNeeded));
                                    this.mcvTimerCreditProdLabel.setValue("at " + this.formatNumbersCompact(creditGrowthPerHour) + "/h");
                                    if (creditTimeLeftInHours <= 0) {
                                        this.mcvTimerLabel.setValue("Ready");
                                    } else if (creditGrowthPerHour == 0) {
                                        this.mcvTimerLabel.setValue("Never");
                                    } else {
                                        if(creditTimeLeftInHours >= 24 * 100) {
                                            this.mcvTimerLabel.setValue("> 99 days");
                                        } else {
                                            this.mcvTimerLabel.setValue(this.FormatTimespan(creditTimeLeftInHours * 60 * 60));
                                        }
                                    }
                                }

                                var ncity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                if (ncity == null) {
                                    if (this.mcvPopup) {
                                        this.repairTimerLabel.setValue("Select a base");

                                        this.resourceLabel1.setValue("N/A");
                                        this.resourceLabel2.setValue("N/A");
                                        this.resourceLabel3.setValue("N/A");
                                    }
                                } else {

                                    var rt = Math.min(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
                                    if (ncity.get_CityUnitsData().get_UnitLimitOffense() == 0) {
                                        this.repairTimerLabel.setValue("No army");
                                    } else {
                                        this.repairTimerLabel.setValue(this.FormatTimespan(rt));
                                    }

                                    var tib = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                                    var tibMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                                    var tibRatio = tib / tibMax;
                                    this.resourceLabel1.setTextColor(this.formatNumberColor(tib, tibMax));
                                    this.resourceLabel1.setValue(this.formatNumbersCompact(tib));
                                    this.resourceLabel1per.setValue(this.formatPercent(tibRatio));

                                    var cry = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                                    var cryMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                                    var cryRatio = cry / cryMax;
                                    this.resourceLabel2.setTextColor(this.formatNumberColor(cry, cryMax));
                                    this.resourceLabel2.setValue(this.formatNumbersCompact(cry));
                                    this.resourceLabel2per.setValue(this.formatPercent(cryRatio));

                                    var power = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                                    var powerMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                                    var powerRatio = power / powerMax;
                                    this.resourceLabel3.setTextColor(this.formatNumberColor(power, powerMax));
                                    this.resourceLabel3.setValue(this.formatNumbersCompact(power));
                                    this.resourceLabel3per.setValue(this.formatPercent(powerRatio));

                                    
									var powerCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
                                    var powerBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
                                    var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var powerAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    var powerProd = (powerCont + powerAlly + powerBonus)*1;
									var powerPac = (powerCont + powerAlly + powerBonus)*24;
									
									var tiberiumCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false);
                                    var tiberiumBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium);
                                    //var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var tiberiumAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
									var tiberiumPac = (tiberiumCont + tiberiumAlly + tiberiumBonus)*1;
									
									var crystalCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false);
                                    var crystalBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal);
                                    //var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var crystalAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
									var crystalPac = (crystalCont + crystalAlly + crystalBonus)*1;

                                    var creditCont = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditBonus = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditProd = (creditCont + creditBonus)*1;

									this.productionLabelTiberium.setValue(this.formatNumbersCompact(tiberiumPac) + "/h");
									this.productionLabelCrystal.setValue(this.formatNumbersCompact(crystalPac) + "/h");
                                    this.productionLabelPower.setValue(this.formatNumbersCompact(powerProd) + "/h");
									this.productionLabelPower1.setValue(this.formatNumbersCompact(powerPac) + "/24h");
                                    this.productionLabelCredit.setValue(this.formatNumbersCompact(creditProd) + "/h");
                                }
                            } catch (e) {
                                console.log("InfoSticker.calculateInfoData", e.toString());
                            }
                        },
                        formatPercent: function (value) {
                            return value > 999 / 100 ? ">999%" : this.formatNumbersCompact(value * 100, 0) + "%";
                            //return this.formatNumbersCompact(value*100, 0) + "%";
                        },
                        formatNumberColor: function (value, max) {
                            var ratio = value / max;

                            var color;
                            var black = [40, 180, 40];
                            var yellow = [181, 181, 0];
                            var red = [187, 43, 43];

                            if (ratio < 0.5) color = black;
                            else if (ratio < 0.75) color = this.interpolateColor(black, yellow, (ratio - 0.5) / 0.25);
                            else if (ratio < 1) color = this.interpolateColor(yellow, red, (ratio - 0.75) / 0.25);
                            else color = red;

                            //console.log(qx.util.ColorUtil.rgbToHexString(color));
                            return qx.util.ColorUtil.rgbToHexString(color);
                        },
                        interpolateColor: function (color1, color2, s) {
                            //console.log("interp "+s+ " " + color1[1]+" " +color2[1]+" " +(color1[1]+s*(color2[1]-color1[1])));
                            return [Math.floor(color1[0] + s * (color2[0] - color1[0])),
                            Math.floor(color1[1] + s * (color2[1] - color1[1])),
                            Math.floor(color1[2] + s * (color2[2] - color1[2]))];
                        },
                        formatNumbersCompact: function (value, decimals) {
                            if (decimals == undefined) decimals = 2;
                            var valueStr;
                            var unit = "";
                            if (value < 1000) valueStr = value.toString();
                            else if (value < 1000 * 1000) {
                                valueStr = (value / 1000).toString();
                                unit = "k";
                            } else if (value < 1000 * 1000 * 1000) {
                                valueStr = (value / 1000000).toString();
                                unit = "M";
                            } else {
                                valueStr = (value / 1000000000).toString();
                                unit = "G";
                            }
                            if (valueStr.indexOf(".") >= 0) {
                                var whole = valueStr.substring(0, valueStr.indexOf("."));
                                if (decimals === 0) {
                                    valueStr = whole;
                                } else {
                                    var fraction = valueStr.substring(valueStr.indexOf(".") + 1);
                                    if (fraction.length > decimals) fraction = fraction.substring(0, decimals);
                                    valueStr = whole + "." + fraction;
                                }
                            }

                            valueStr = valueStr + unit;
                            return valueStr;
                        },
                        FormatTimespan: function (value) {
                            var i;
                            var t = ClientLib.Vis.VisMain.FormatTimespan(value);
                            var colonCount = 0;
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') colonCount++;
                            }
                            var r = "";
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') {
                                    if (colonCount > 2) {
                                        r += "d ";
                                    } else {
                                        r += t.charAt(i);
                                    }
                                    colonCount--;
                                } else {
                                    r += t.charAt(i);
                                }
                            }
                            return r;
                        }
                    }
                });
            }
        } catch (e) {
            console.log("InfoSticker: createInfoSticker: ", e.toString());
        }

        function InfoSticker_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    createInfoSticker();
                    window.InfoSticker.Base.getInstance().initialize();
                } else {
                    window.setTimeout(InfoSticker_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("InfoSticker_checkIfLoaded: ", e.toString());
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(InfoSticker_checkIfLoaded, 1000);
        }
    }
    try {
        var InfoStickerScript = document.createElement("script");
        InfoStickerScript.innerHTML = "(" + InfoSticker_main.toString() + ")();";
        InfoStickerScript.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(InfoStickerScript);
        }
    } catch (e) {
        console.log("InfoSticker: init error: ", e.toString());
    }
})();
//------------------------------------------Title Mod-------------------------------//

(function () {
 var titleMod_main = function () {
  try {
   window.titleMod_Version = "0.7.0";
   console.log("C&C: Tiberium Alliances Title Mod v" + window.titleMod_Version + " loading...");
   var titleMod_init = function () {
    
    // Set this to false if you don't want any sound
    var playNotificationSounds = true;
    var checkPageFocusDelay = 2000;

    var SND_loud = new Audio("data:video/ogg;base64,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");
    var SND_twoTone = new Audio("data:video/ogg;base64,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");
    var SND_quiet = new Audio("data:video/ogg;base64,T2dnUwACAAAAAAAAAAAzeQAAAAAAAGMW9OABHgF2b3JiaXMAAAAAAkSsAAAAAAAAAHcBAAAAAAC4AU9nZ1MAAAAAAAAAAAAAM3kAAAEAAACApmwcEC3//////////////////+IDdm9yYmlzHQAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMDcwNjIyAAAAAAEFdm9yYmlzJUJDVgEAQAAAJHMYKkalcxaEEBpCUBnjHELOa+wZQkwRghwyTFvLJXOQIaSgQohbKIHQkFUAAEAAAIdBeBSEikEIIYQlPViSgyc9CCGEiDl4FIRpQQghhBBCCCGEEEIIIYRFOWiSgydBCB2E4zA4DIPlOPgchEU5WBCDJ0HoIIQPQriag6w5CCGEJDVIUIMGOegchMIsKIqCxDC4FoQENSiMguQwyNSDC0KImoNJNfgahGdBeBaEaUEIIYQkQUiQgwZByBiERkFYkoMGObgUhMtBqBqEKjkIH4QgNGQVAJAAAKCiKIqiKAoQGrIKAMgAABBAURTHcRzJkRzJsRwLCA1ZBQAAAQAIAACgSIqkSI7kSJIkWZIlWZIlWZLmiaosy7Isy7IsyzIQGrIKAEgAAFBRDEVxFAcIDVkFAGQAAAigOIqlWIqlaIrniI4IhIasAgCAAAAEAAAQNENTPEeURM9UVde2bdu2bdu2bdu2bdu2bVuWZRkIDVkFAEAAABDSaWapBogwAxkGQkNWAQAIAACAEYowxIDQkFUAAEAAAIAYSg6iCa0535zjoFkOmkqxOR2cSLV5kpuKuTnnnHPOyeacMc4555yinFkMmgmtOeecxKBZCpoJrTnnnCexedCaKq0555xxzulgnBHGOeecJq15kJqNtTnnnAWtaY6aS7E555xIuXlSm0u1Oeecc84555xzzjnnnOrF6RycE84555yovbmWm9DFOeecT8bp3pwQzjnnnHPOOeecc84555wgNGQVAAAEAEAQho1h3CkI0udoIEYRYhoy6UH36DAJGoOcQurR6GiklDoIJZVxUkonCA1ZBQAAAgBACCGFFFJIIYUUUkghhRRiiCGGGHLKKaeggkoqqaiijDLLLLPMMssss8w67KyzDjsMMcQQQyutxFJTbTXWWGvuOeeag7RWWmuttVJKKaWUUgpCQ1YBACAAAARCBhlkkFFIIYUUYogpp5xyCiqogNCQVQAAIACAAAAAAE/yHNERHdERHdERHdERHdHxHM8RJVESJVESLdMyNdNTRVV1ZdeWdVm3fVvYhV33fd33fd34dWFYlmVZlmVZlmVZlmVZlmVZliA0ZBUAAAIAACCEEEJIIYUUUkgpxhhzzDnoJJQQCA1ZBQAAAgAIAAAAcBRHcRzJkRxJsiRL0iTN0ixP8zRPEz1RFEXTNFXRFV1RN21RNmXTNV1TNl1VVm1Xlm1btnXbl2Xb933f933f933f933f931dB0JDVgEAEgAAOpIjKZIiKZLjOI4kSUBoyCoAQAYAQAAAiuIojuM4kiRJkiVpkmd5lqiZmumZniqqQGjIKgAAEABAAAAAAAAAiqZ4iql4iqh4juiIkmiZlqipmivKpuy6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6rguEhqwCACQAAHQkR3IkR1IkRVIkR3KA0JBVAIAMAIAAABzDMSRFcizL0jRP8zRPEz3REz3TU0VXdIHQkFUAACAAgAAAAAAAAAzJsBTL0RxNEiXVUi1VUy3VUkXVU1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU3TNE0TCA1ZCQCQAQCgEFtLrcXcCWocYtJyzCR0TmIQqrEIIke1t8oxpRzFnhqIlFESe6ooY4pJzDG00CknrdZSOoUUpJhTChVSDlogNGSFABCaAeBwHECyLECyNAAAAAAAAACQNA3QPA+wPA8AAAAAAAAAJE0DLE8DNM8DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEDSNEDzPEDzPAAAAAAAAADQPA/wRBHwRBEAAAAAAAAALM8DPNEDPFEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDRNEDzPEDzPAAAAAAAAACwPA/wRBHwPBEAAAAAAAAANM8DPFEEPFEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQ4AAAEGAhFBqyIgCIEwAwOA40DZoGzwM4lgXPg+dBFAGOZcHz4HkQRQAAAAAAAAAAAAA0z4OqQlXhqgDN82CqUFWoLgAAAAAAAAAAAACW50FVoapwXYDleTBVmCpUFQAAAAAAAAAAAABPFKG6UF24KsAzRbgqXBWqCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAYcAAACDChDBQasiIAiBMAcDiKZQEAgOM4lgUAAI7jWBYAAFiWJYoAAGBZmigCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAABhwAAAIMKEMFBqyEgCIAgAwKIplAcuyLGBZlgU0zbIAlgbQPIDnAUQRAAgAAChwAAAIsEFTYnGAQkNWAgBRAAAGRbEsTRNFmqZpmiaKNE3TNE0UeZ6meZ5pQtM8zzQhip5nmhBFzzNNmKYoqioQRVUVAABQ4AAAEGCDpsTiAIWGrAQAQgIADI5iWZ4niqIoiqapqjRN0zxPFEXRNFXVVWmapnmeKIqiaaqq6vI8TRNF0xRF01RV14WmiaJpmqJpqqrrwvNE0TRNU1VV1XXheaJomqapqq7ruhBFUTRN01RV13VdIIqmaZqq6rqyDETRNFVVVV1XloEomqaqqqrryjIwTdNUVdeVXVkGmKaquq4syzJAVV3XdWVZtgGq6rquK8uyDXBd15VlWbZtAK4ry7Js2wIAAA4cAAACjKCTjCqLsNGECw9AoSErAoAoAADAGKYUU8owJiGkEBrGJIQSQiYllZRKqiCkUlIpFYRUUiolo5JSailVEFIpKZUKQiqllVQAANiBAwDYgYVQaMhKACAPAIAgRinGGGMMMqYUY845B5VSijHnnJOMMcaYc85JKRljzDnnpJSMOeecc1JK5pxzzjkppXPOOeeclFJK55xzTkopJYTOOSellNI555wTAABU4AAAEGCjyOYEI0GFhqwEAFIBAAyOY1mapmmeJ4qWJGma53meKJqmZkma5nmeJ4qmyfM8TxRF0TRVled5niiKommqKtcVRdM0TVVVVbIsiqZpmqrqujBN01RV13VlmKZpqqrrui5s21RV1XVlGbatmqoqu7IMXFd1Zde2geu6ruzatgAA8AQHAKACG1ZHOCkaCyw0ZCUAkAEAQBiDjEIIIYUQQgohhJRSCAkAABhwAAAIMKEMFBqyEgBIBQAAkLHWWmuttdZARymllFJKqXCMUkoppZRSSimllFJKKaWUSkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKBQAuVTgA6D7YsDrCSdFYYKEhKwGAVAAAwBilmHJOQikVQow5JiGlFiuEGHNOSkoxFs85B6GU1losnnMOQimtxVhU6pyUlFqKragUMikppdZiEMKUlFprpbUghCqpxJZaa0EIXVNqKZbYghC2tpJSjDEG4YOPsZVYagw++CBbKzHVWgAAZoMDAESCDasjnBSNBRYashIACAkAIIxRijHGGHPOOeckY4wx5pxzEEIIoWSMMeeccw5CCCGUzjnnnHMQQgghhFJKx5xzDkIIIYRQUuqccxBCCKGEEEoqnXMOQgghhFJKSaVzEEIIoYRQQkklpdQ5CCGEEEIpKaWUQgghhBJC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");
    // Volume - valid range 0.0 to 1.0
    SND_loud.volume = 0.4;
    SND_twoTone.volume = 0.5;
    SND_quiet.volume = 1.0;
    
    var debug = false;
    var msg_alliance = 0;
    var msg_whisper = 0;
    var msg_officer = 0;
    function setFavIcon(o) {
     try {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var canvasCopy = document.createElement('canvas');
      var ctxCopy = canvasCopy.getContext("2d");
      var children = document.head.childNodes;
      var iconDom;
      var img = document.createElement('img');
      
      //get favicon by rel
      if (!document.getElementById("Favicon")) {
       for (i in children) {
        if (children[i].rel) {
         children[i].id = "Favicon";
         iconDom = children[i];
         //children[i].parentNode.removeChild(children[i]);
         break;
        }
       }
      } else {
       iconDom = document.getElementById("Favicon");
      }
      //on
      if (o === 1) {
       if (debug)
        console.log("o === 1");
       img.src = 'favicon.ico';
       img.onload = function () {
        if (canvas.getContext) {
         canvas.height = canvas.width = 16; // set the size
         //Chrome fix for 64px favicon
         if (img.width > 16) {
          canvasCopy.width = img.width;
          canvasCopy.height = img.height;
          ctxCopy.drawImage(img, 0, 0);
          ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
         } else if (img.width == 16) {
          ctx.drawImage(img, 0, 0);
         }
         ctx.shadowOffsetX = 1;
         ctx.shadowOffsetY = 1;
         ctx.shadowBlur = 1;
         ctx.shadowColor = "#000000";
         ctx.font = 'bold 18px "helvetica", sans-serif';
         if (msg_alliance > 0 || debug) {
          ctx.fillStyle = '#a5f25b'; //alliance
          ctx.fillText("!", 1, 15);
         }
         if (msg_whisper > 0 || debug) {
          ctx.fillStyle = '#ff95b3'; //outgoing whisper
          //ctx.fillStyle = '#c59eff'; //incoming whisper
          ctx.fillText("!", 5, 15);
         }
         if (msg_officer > 0 || debug) {
          ctx.fillStyle = '#fdf05f'; //officer
          ctx.fillText("!", 9, 15);
         }
         iconDom.href = canvas.toDataURL('image/x-icon');
         document.head.appendChild(iconDom);
        }
       };
      }
      //off
      if (!o) {
       if (debug)
        console.log("o is false or 0");
       //var el = document.getElementById("Favicon");
       iconDom.href = 'favicon.ico';
       document.head.appendChild(iconDom);
      }
     } catch (err) {
      console.log("CNCTAtitleMod: Problem swapping favicon " + err);
     }
    }
    
    function init() {
     try {
      var mainData = ClientLib.Data.MainData.GetInstance();
      var player_cities = mainData.get_Cities();
      if (player_cities.get_CurrentOwnCity() != null) {
       if (debug)
        setFavIcon(1);
       var current_city = player_cities.get_CurrentOwnCity();
       var playerName = current_city.get_PlayerName();
       var PNRegex = new RegExp(">" + playerName + "<", "i");
       var inBackground = false;
       var title0 = window.document.title = playerName + " - C&C: Tiberium Alliances";
       console.log("Changing Window title from: " + window.document.title);
       window.document.title = playerName + " - C&C: Tiberium Alliances";
       if (typeof webfrontend.gui.chat.ChatWidget.prototype.titleMod_showMessage === 'undefined') {
        webfrontend.gui.chat.ChatWidget.prototype.titleMod_showMessage = webfrontend.gui.chat.ChatWidget.prototype.showMessage;
        webfrontend.gui.chat.ChatWidget.prototype.showMessage = function (message, sender, channel) {
         //console.log("\nmessage: "+message+"\nchannel: "+channel);
         // 1 system white
         // 3 alliance
         if (channel == 3 && inBackground) {
          if (playNotificationSounds){
           SND_quiet.play();
           //SND_twoTone.play();
           //SND_loud.play();
          }
          msg_alliance++;
          setFavIcon(1);
         }
         // 5 officer
         if (channel == 5 && inBackground) {
          if (playNotificationSounds){
           //SND_quiet.play();
           SND_twoTone.play();
           //SND_loud.play();
          }
          msg_officer++;
          setFavIcon(1);
         }
         // 9 whisper
         if (channel == 9 && inBackground && !PNRegex.test(sender)) {
          if (playNotificationSounds){
           //SND_quiet.play();
           //SND_twoTone.play();
           SND_loud.play();
          }
          msg_whisper++;
          title1 = window.document.title = "(" + msg_whisper + ")" + playerName + " - C&C: Tiberium Alliances";
          setFavIcon(1);
         }
         // 15 AFK blue
         this.titleMod_showMessage(message, sender, channel);
        };
       }
       var CheckPageFocus = function () {
        if (document.hasFocus() && inBackground) {
         msg_alliance = 0;
         msg_whisper = 0;
         msg_officer = 0;
         inBackground = false;
         window.document.title = playerName + " - C&C: Tiberium Alliances";
         if (!debug)
          setFavIcon(0);
        } else if (document.hasFocus() == false) {
         inBackground = true;
        }
       }
       setInterval(CheckPageFocus, checkPageFocusDelay);
      } else {
       window.setTimeout(init, 1000);
      }
     } catch (e) {
      console.log("CNCTAtitleMod: problem loading player name:\n" + e);
     }
    }
    init();
    
   }
  } catch (e) {
   console.log("titleMod_init: ", e);
  }
  
  function CNCTAtitleMod_checkIfLoaded() {
   try {
    if (typeof qx != 'undefined') {
     titleMod_init();
    } else {
     window.setTimeout(CNCTAtitleMod_checkIfLoaded, 1000);
    }
   } catch (e) {
    console.log("CNCTAtitleMod_checkIfLoaded: ", e);
   }
  }
  window.setTimeout(CNCTAtitleMod_checkIfLoaded, 2000);
 };
 
 try {
  var CNCTAtitleMod = document.createElement("script");
  CNCTAtitleMod.innerHTML = "(" + titleMod_main.toString() + ")();";
  CNCTAtitleMod.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(CNCTAtitleMod);
 } catch (e) {
  console.log("CNCTAtitleMod: init error: ", e);
 }
})();

//-------------------------------------Informação Aliança-----------------------------//


// ==UserScript==
// @name           Informação NovaGama
// @author         Dark
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @downloadURL    http://userscripts.org/scripts/show/169401
// @version        1
// @icon           http://img577.imageshack.us/img577/7893/j1vj.png
// ==/UserScript==

function Ini() {
	console.log("BaseInfo initialisiert...");
};
Ini();
(function () {
	var BaseInfoMain = function () {
		function BaseInfoCreate()
			{
				try
					{
						qx.Class.define("BaseInfo", {
							type: "singleton",
							extend: qx.core.Object,
							construct: function () {
								window.addEventListener("click", this.onClick, false);
								window.addEventListener("keyup", this.onKey, false);
								window.addEventListener("mouseover", this.onMouseOver, false);
								console.log("BaseInfo geladen...");
								VERSION = '';
								AUTHOR = 'Dark';
								CLASS = 'Informação NovaGama';
							},
							members: {
								BasenwerteFenster: null,
								BasenwerteTab: null,
								BasenwertePage: null,
								BasenwerteVBox: null,
								AusgabeTab: null,
								AusgabePage: null,
								AusgabeVBox: null,
								BasenwerteButton: null,
								app: null,
								initialize: function () {
									this.BasenwerteFenster = new qx.ui.window.Window(CLASS + " " + VERSION,"http://img577.imageshack.us/img577/7893/j1vj.png").set({
										padding: 5,
										paddingRight: 0,
										showMaximize:false,
										showMinimize:false,
										showClose:true,
										allowClose:true,
										resizable:false
									});
									this.BasenwerteFenster.setTextColor('black');
									this.BasenwerteFenster.setLayout(new qx.ui.layout.HBox); 
									this.BasenwerteFenster.moveTo(280, 60);
									
									// Tab Reihe
									this.BasenwerteTab = (new qx.ui.tabview.TabView).set({
										contentPaddingTop: 3,
										contentPaddingBottom: 6,
										contentPaddingRight: 7,
										contentPaddingLeft: 3
									});
									this.BasenwerteFenster.add(this.BasenwerteTab);
									
									// Tab 1
									this.BasenwertePage = new qx.ui.tabview.Page("Informação Bases NovaGama");
									this.BasenwertePage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.BasenwertePage);
									this.BasenwerteVBox = new qx.ui.container.Composite();
									this.BasenwerteVBox.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteVBox.setThemedPadding(2);
									this.BasenwerteVBox.setThemedBackgroundColor("#eef");
									this.BasenwertePage.add(this.BasenwerteVBox);

									// Tab 2
									this.MembersPage = new qx.ui.tabview.Page("Membros");
									this.MembersPage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.MembersPage);
									this.MembersVBox = new qx.ui.container.Composite();
									this.MembersVBox.setLayout(new qx.ui.layout.VBox(5));
									this.MembersVBox.setThemedPadding(2);
									this.MembersVBox.setThemedBackgroundColor("#eef");
									this.MembersPage.add(this.MembersVBox);

									// Tab 3
									this.AboutPage = new qx.ui.tabview.Page("Tutoriais");
									this.AboutPage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.AboutPage);
									this.AboutVBox = new qx.ui.container.Composite();
									this.AboutVBox.setLayout(new qx.ui.layout.VBox(5));
									this.AboutVBox.setThemedPadding(2);
									this.AboutVBox.setThemedBackgroundColor("#eef");
									this.AboutPage.add(this.AboutVBox);

									this.BasenwerteButton = new qx.ui.form.Button(null, "http://img825.imageshack.us/img825/874/4zni.png").set({
										toolTipText: CLASS + " " + VERSION,
										width: 33,
										height: 33,
										maxWidth: 33,
										maxHeight: 33,
										appearance: ("button-playarea-mode-frame"),
										center: true
									});
									this.BasenwerteButton.addListener("click", function (e) {
										this.BasenwerteVBox.removeAll();
										this.AboutVBox.removeAll();
										this.MembersVBox.removeAll();
										this.showBasenwerte();
										this.BasenwerteFenster.show();
									}, this);
									this.app = qx.core.Init.getApplication();
									this.app.getDesktop().add(this.BasenwerteButton, {
										right: 125,
										top: 0
									});
								},
								showBasenwerte: function (ev) {
									var instance = ClientLib.Data.MainData.GetInstance();
									var alliance = instance.get_Alliance();
									var serverName = instance.get_Server().get_Name();
									var player = instance.get_Player();
									var faction1 = player.get_Faction();
									var playerRank = player.get_OverallRank();
									var aktuellesDatum = new Date();
									var Stunde = aktuellesDatum.getHours();
									var Minute = aktuellesDatum.getMinutes();
									var Monat = aktuellesDatum.getMonth()+1 ;
									var Tag = aktuellesDatum.getDate();
									var Jahr = aktuellesDatum.getFullYear();
									if(Stunde<10) Stunde = "0" + Stunde;
									if(Minute<10) Minute = "0" + Minute;
									if(Tag<10) Tag = "0" + Tag;
									if(Monat<10) Monat = "0" + Monat;
									var Datum = Tag + "." + Monat + "." + Jahr;
									var Uhrzeit = Stunde + ":" + Minute;
									var player_basen = 0;
									var support_gebaeude = 0;
									var v = 0;
									var credit_b = 0;
									var base1 = '';
									var base2 = '';
									var VE_durchschnitt = null;
									var VE_lvl = null;
									var support = 0;
									var supportlvl = null;
									var credit_def = null;
									var credit_durchschnitt = null;
									var repairMaxTime = null;
									var creditPerHour = 0;
									var creditsPerHour = 0;
									var credit_basen = '';
									var first_rep_flug = 0;
									var first_rep_fahr = 0;
									var first_rep_fuss = 0;
									var second_rep_flug = 0;
									var second_rep_fahr = 0;
									var second_rep_fuss = 0;
									var firstBaseName = '';
									var firstBaselvl = 0;
									var firstOfflvl = 0;
									var firstDeflvl = 0;
									var firstPowerProduction = 0;
									var firstRepairAir = null;
									var firstRepairVehicle = null;
									var firstRepairInfantry = null;
									var secondBaseName = '';
									var secondBaselvl = 0;
									var secondOfflvl = 0;
									var secondDeflvl = 0;
									var secondPowerProduction = 0;
									var secondRepairAir = null;
									var secondRepairVehicle = null;
									var secondRepairInfantry = null;
									var factionArt = new Array();
									factionArt[0] = "";
									factionArt[1] = "GDI";
									factionArt[2] = "NOD";
									var newAusgabe = new Array();
									var apc = instance.get_Cities();
									var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
									var PlayerID = apc.get_CurrentOwnCity().get_PlayerId();
									var AllianzName = apc.get_CurrentOwnCity().get_AllianceName();
									var AllianzID = apc.get_CurrentOwnCity().get_AllianceId();
									var apcl = apc.get_AllCities().d;
									var members = alliance.get_MemberData().d, member;
									keys = Object.keys(members);
									len = keys.length;
									var AllianzRolle = new Array();
									var AllianzSpieler = new Array();
									var sd;
									while (len--)
										{
											member = members[keys[len]];
											AllianzRolle[member.Id] = member.RoleName;
											AllianzSpieler[member.Id] = member.Name;
										}
									var allBases = '';
									var aB_basename,aB_baselvl,aB_offlvl,aB_deflvl,aB_velvl,aB_vzlvl,aB_cclvl,aB_supportlvl,aB_credits,aB_strom;
									for (var key in apcl)
										{
											player_basen++;
											var c = apcl[key];
											try
												{
													sd = c.get_SupportData();
													if(sd !== null)
														{
															support_gebaeude++;
															support = sd.get_Level();
															supportlvl = supportlvl+support;
															
														}
													else
														{
															support = 0;
														}
													unitData = c.get_CityBuildingsData();
													ve = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
													vz = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ);
													creditPerHour = ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false) + ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false);
													repairMaxTime = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
													commandpointsMaxStorage = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.CommandPoints);
													creditsPerHour = creditsPerHour + creditPerHour;
													if(c.get_CommandCenterLevel() > 0)
														{
															if(firstOfflvl < c.get_LvlOffense())
																{
																	secondBaseName = firstBaseName;
																	secondBaselvl = firstBaselvl;
																	secondOfflvl = firstOfflvl;
																	secondDeflvl = firstDeflvl;
																	secondPowerProduction = firstPowerProduction;
																	secondRepairInfantry = firstRepairInfantry;
																	secondRepairVehicle = firstRepairVehicle;
																	secondRepairAir = firstRepairAir;
																	
																	firstBaseName = c.get_Name();
																	firstBaselvl = c.get_LvlBase();
																	firstOfflvl = c.get_LvlOffense();
																	firstDeflvl = c.get_LvlDefense();
																	firstPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
																	firstRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
																	firstRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
																	firstRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
																}
															else if(c.get_LvlOffense() > secondOfflvl)
																{
																	secondBaseName = c.get_Name();
																	secondBaselvl = c.get_LvlBase();
																	secondOfflvl = c.get_LvlOffense();
																	secondDeflvl = c.get_LvlDefense();
																	secondPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
																	secondRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
																	secondRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
																	secondRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
																}
														}
													if(parseInt(creditPerHour) > 50000)
														{
															credit_b++;
															credit_def = credit_def + c.get_LvlDefense();
														}
													if(ve !== null)
														{
															v++;
															VE_lvl = VE_lvl+ve.get_CurrentLevel();
														}
													// All Bases v2.5
													// Basename,BaseLvl,OffLvl,DefLvl,VE,VZ,KZ,SupportLvl,Credits,Strom,
													if(allBases != "")
														{
															allBases += ' |||| ';
														}
													if(ve !== null) { aB_velvl = ve.get_CurrentLevel().toString(); } else { aB_velvl = 0;}
													if(vz !== null) { aB_vzlvl = vz.get_CurrentLevel().toString(); } else { aB_vzlvl = 0;}
													if(c.get_CommandCenterLevel)  { aB_cclvl =  c.get_CommandCenterLevel().toString(); } else { aB_cclvl = 0;}
													allBases += '' + c.get_Name().toString() + ' | ' + c.get_LvlBase().toFixed(2).toString() + ' | ' + c.get_LvlOffense().toFixed(2).toString() + ' | ' + c.get_LvlDefense().toFixed(2).toString() + ' | ' + aB_velvl + ' | ' + aB_vzlvl + ' | ' + aB_cclvl + ' | ' + support.toFixed(2).toString() + ' | ' + parseInt(creditPerHour) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power)) + '';
													
												}
											catch (e)
												{
													console.warn("BaseInfo pro Base: ", e); 
												}
										}

									credit_durchschnitt = credit_def / credit_b;
									newAusgabe["credit_basen"] = credit_b;
									if(credit_b>0)
										{
											newAusgabe["credit_def"] = "" + credit_durchschnitt.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["credit_def"] = 0;
										}
									newAusgabe["support_basen"] = support_gebaeude;
									if(support_gebaeude>0)
										{
											supportlvl = supportlvl / support_gebaeude;
											newAusgabe["support_lvl"] = "" + supportlvl.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["support_lvl"] = 0;
										}
									VE_durchschnitt = VE_lvl / v;
									if(v>0)
										{
											newAusgabe["ve"] = "" + VE_durchschnitt.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["ve"] = 0;
										}
									first_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(firstRepairAir);
									first_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(firstRepairVehicle);
									first_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(firstRepairInfantry);
									if(first_rep_flug.split(":").length < 3)
										{
											first_rep_flug = "0:" + first_rep_flug;
										}
									if(first_rep_fahr.split(":").length < 3)
										{
											first_rep_fahr = "0:" + first_rep_fahr;
										}
									if(first_rep_fuss.split(":").length < 3)
										{
											first_rep_fuss = "0:" + first_rep_fuss;
										}
									second_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(secondRepairAir);
									second_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(secondRepairVehicle);
									second_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(secondRepairInfantry);
									if(second_rep_flug.split(":").length < 3)
										{
											second_rep_flug = "0:" + second_rep_flug;
										}
									if(second_rep_fahr.split(":").length < 3)
										{
											second_rep_fahr = "0:" + second_rep_fahr;
										}
									if(second_rep_fuss.split(":").length < 3)
										{
											second_rep_fuss = "0:" + second_rep_fuss;
										}
									
									newAusgabe["AllianzID"] = AllianzID;
									newAusgabe["AllianzName"] = AllianzName.toString();
									newAusgabe["AllianzRolle"] = AllianzRolle[PlayerID].toString();
									newAusgabe["ServerName"] = serverName.toString();

									newAusgabe["Spieler"] = PlayerName;
									newAusgabe["Klasse"] = factionArt[faction1];
									newAusgabe["Datum"] = Datum;
									newAusgabe["Uhrzeit"] = Uhrzeit;
									newAusgabe["Rang"] = playerRank;
									newAusgabe["maxKP"] = commandpointsMaxStorage;
									newAusgabe["repZeit"] = repairMaxTime / 60 / 60;
									newAusgabe["Basen"] = player_basen;
									newAusgabe["Creditproduktion"] = parseInt(creditsPerHour);
									
									newAusgabe["1st_Base"] = firstBaselvl.toFixed(2).toString();
									newAusgabe["1st_Def"] = firstDeflvl.toFixed(2).toString();
									newAusgabe["1st_Off"] = firstOfflvl.toFixed(2).toString();
									newAusgabe["1st_Stromproduktion"] = parseInt(firstPowerProduction);
									newAusgabe["1st_Flugzeuge"] = first_rep_flug;
									newAusgabe["1st_Fahrzeuge"] = first_rep_fahr;
									newAusgabe["1st_Fusstruppen"] = first_rep_fuss;
                                    
                                    newAusgabe["2nd_Base"] = secondBaselvl.toFixed(2).toString();
									newAusgabe["2nd_Def"] = secondDeflvl.toFixed(2).toString();
									newAusgabe["2nd_Off"] = secondOfflvl.toFixed(2).toString();
									newAusgabe["2nd_Stromproduktion"] = parseInt(secondPowerProduction);
									newAusgabe["2nd_Flugzeuge"] = second_rep_flug;
									newAusgabe["2nd_Fahrzeuge"] = second_rep_fahr;
									newAusgabe["2nd_Fusstruppen"] = second_rep_fuss;
									
								
									var usersubmit = '';
									for(var werte in newAusgabe)
										{
											usersubmit += "[" + werte + "] == " + newAusgabe[werte] + "\n";
										}
									// Tab 1 Basenwerte
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Informações Gerais</u></b></big><br><b>Função na Aliança:</b> " + newAusgabe["AllianzRolle"] + "<br><b>Nome:</b> " + newAusgabe["Spieler"] + "<br><b>Facção:</b> " + newAusgabe["Klasse"] + "<br><b>Hora actual:</b> " + newAusgabe["Uhrzeit"] + "hr - " + newAusgabe["Datum"] + "<br><b>Classificação:</b> " + newAusgabe["Rang"] + "<br><b>Max PC:</b> " + newAusgabe["maxKP"] + "<br><b>Max Reparo:</b> " + newAusgabe["repZeit"] + "<br><b>Nº Bases:</b> " + newAusgabe["Basen"] + "<br><b>NºBases de Prod.Creditos:</b> " + newAusgabe["credit_basen"] + "<br><b>Prod.Creditos:</b> " + newAusgabe["Creditproduktion"] + "<br><b>Support:</b> " + newAusgabe["support_basen"] + "<br><b>Nível Support Ø:</b> " + newAusgabe["support_lvl"] + "</td></tr></table>").set({rich: true}));
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>1. Base</u></b></big><br><b>Nome da Base:</b> " + firstBaseName + "<br><b>Nível Base:</b> " + newAusgabe["1st_Base"] + "<br><b>Off:</b> " + newAusgabe["1st_Off"] + "<br><b>Def:</b> " + newAusgabe["1st_Def"] + "<br><b>Prod.Energia:</b> " + newAusgabe["1st_Stromproduktion"] + "<br><b>Rep. Aeronaves:</b> " + newAusgabe["1st_Flugzeuge"] + "<br><b>Rep. Veiculos:</b> " + newAusgabe["1st_Fahrzeuge"] + "<br><b>Rep. Infantaria:</b> " + newAusgabe["1st_Fusstruppen"] + "</td><td><big><b><u>2. Base</u></b></big><br><b>Nome Base:</b> " + secondBaseName + "<br><b>Nível Base:</b> " + newAusgabe["2nd_Base"] + "<br><b>Off:</b> " + newAusgabe["2nd_Off"] + "<br><b>Def:</b> " + newAusgabe["2nd_Def"] + "<br><b>Prod.Energia:</b> " + newAusgabe["2nd_Stromproduktion"] + "<br><b>Rep. Aeronaves:</b> " + newAusgabe["2nd_Flugzeuge"] + "<br><b>Rep. Veiculos:</b> " + newAusgabe["2nd_Fahrzeuge"] + "<br><b>Rep. Infantaria:</b> " + newAusgabe["2nd_Fusstruppen"] + "</td></tr></table>").set({rich: true}));
                                    this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?usersubmit=" + escape(usersubmit) + "&amp;allBases=" + escape(allBases) + "' target='_blank'><button><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Transferir Valores:&nbsp;&nbsp;&nbsp;&nbsp;</b></button></a></td></tr></table>").set({rich: true}));
									
									// Tab 2 Mitglieder
									var keys = Object.keys(AllianzSpieler);
									var anzahl = keys.length;
									var len = keys.length;
									var member='',userreplace='',i=0;
									userreplace += newAusgabe["AllianzID"] + ',' + newAusgabe["AllianzName"] + ',' + newAusgabe["AllianzRolle"] + ',' + newAusgabe["ServerName"] + ',';
									while (len--)
										{
											i++;
											if(member != '')
												{
													if(i == 5)
														{
															member += ',<br>';
															i = 0;
														}
													else
														{
															member += ', ';
														}
													userreplace += ',';
												}
											member += AllianzSpieler[keys[len]];
											userreplace += AllianzSpieler[keys[len]];
										}
									this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Membros da Aliança (" + anzahl + ")</u></b></big><br><br>" + member + "</td></tr></table>").set({rich: true}));
									if(newAusgabe["AllianzRolle"] == 'Oberbefehlshaber' || newAusgabe["AllianzRolle"] == 'Leader')
										{
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><span style='color: #bb0000;'><u></u></span></td></tr></table>").set({rich: true}));
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?userreplace=" + escape(userreplace) + "' target='_blank'><button><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tabela de Informação dos Membros&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></button></a><br><span style='color: #bb0000;'><i>Voçê tem no " + CLASS + "-Vai ser registado na Página</i></span></td></tr></table>").set({rich: true}));
										}

									// Tab 3 ScriptInfo
									this.AboutVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Apoios NG</u></b></big><br><b><br><b>Homepage:</b> <a href='https://docs.google.com/document/d/1PAv68ACklD5b25RKhEP5JhzQr5_sOk6YDHO0xah8QBI/edit?usp=sharing' target='_blank'>Script NovaGama</a><br><b><br><b>Homepage:</b> <a href='https://docs.google.com/document/d/1tP3xgsYqhL-6o-kvOWKeAYLzcwN5uq944Mec_00aS1Y/edit?usp=sharing' target='_blank'>Base de Dados NovaGama</a><br><b><br><b>Homepage:</b> <a href='https://docs.google.com/document/d/1RgH3WmuKs9Ynn_yyxwQ4e3DxM4XDiRRiaKpa69rJ0hs/edit?usp=sharing' target='_blank'> Como Organizar Bases</a><br><b><br><b>Homepage:</b> <a href='https://docs.google.com/document/d/1sp_J4eiwnq76bgH-jTIIs95sxWrIRzRMG3aNh4IaFmU/edit?usp=sharing' target='_blank'>Como Organizar Ataque</a><br><b><br><b>Homepage:</b> <a href='https://docs.google.com/document/d/1mQF2Kvrcp8thB5I1ZdSNoGPjiZfz3ZUrco_E7zm2y9g/edit?usp=sharing' target='_blank'>Como Organizar Defesa</a></td></tr></table>").set({rich: true, width: 350}));
								}
							}
						});          
					}
				catch (e)
					{
						console.warn("qx.Class.define(BaseInfo: ", e);      
					}
				BaseInfo.getInstance();
			}
		function LoadExtension()
			{
				try
					{
						if (typeof(qx)!='undefined')
							{
								if (!!qx.core.Init.getApplication().getMenuBar())
									{
										BaseInfoCreate();
										BaseInfo.getInstance().initialize();
										return;
									}
							}
					}
				catch (e)
					{
						if (console !== undefined) console.log(e);
						else if (window.opera) opera.postError(e);
						else GM_log(e);
					}
				window.setTimeout(LoadExtension, 1000);
			}
		LoadExtension();
	}
	function Inject()
		{
			if (window.location.pathname != ("/login/auth"))
				{
					var Script = document.createElement("script");
					Script.innerHTML = "(" + BaseInfoMain.toString() + ")();";
					Script.type = "text/javascript";        
					document.getElementsByTagName("head")[0].appendChild(Script);
				}
		}    
	Inject();
})();


//----------------------------Compass-----------------------//


(function () {
function injectBody()
{
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir; var ccc=console.clear;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;}

  var spaceName = 'MHTools.Navigator';
  function createClasses() {
    function classExist(name) {
      if(name===null || name===undefined) return;
      var sp = name.split('.');
      var o=window;
      for(var i=0;i<sp.length;i++) {
        o=o[sp[i]];
        if(o===undefined) {
          return false;
        }
      }
      return true;
    }
    if(!classExist('qx.html.Canvas')) {
      qx.Class.define("qx.html.Canvas",
      {
        extend : qx.html.Element,
        construct : function(styles, attributes)
        {
          this.base(arguments, "canvas", styles, attributes);
          this.__canvas = document.createElement("canvas");
        },
        members :
        {
          __canvas : null,
          _createDomElement : function() {
            return this.__canvas;
          },
          getCanvas : function() {
            return this.__canvas;
          },
          setWidth : function(width) {
            this.__canvas.width = width;
          },
          getWidth : function() {
            return this.__canvas.width;
          },
          setHeight : function(height) {
            this.__canvas.height = height;
          },
          getHeight : function() {
            return this.__canvas.height;
          },
          getContext2d : function() {
            return this.__canvas.getContext("2d");
          }
        },
        destruct : function() {
          this.__canvas = null;
        }
      });
      cci('qx.html.Canvas ADDED');
    }
    if(!classExist('qx.ui.embed.Canvas')) {
      qx.Class.define("qx.ui.embed.Canvas",
      {
        extend : qx.ui.core.Widget,
        construct : function(canvasWidth, canvasHeight)
        {
          this.base(arguments);
          this.__deferredDraw = new qx.util.DeferredCall(this.__redraw, this);
          this.addListener("resize", this._onResize, this);
          if (canvasWidth !== undefined) {
            this.setCanvasWidth(canvasWidth);
          }
          if (canvasHeight !== undefined) {
            this.setCanvasHeight(canvasHeight);
          }
        },
        events :
        {
          "redraw" : "qx.event.type.Data"
        },
        properties :
        {
          syncDimension :
          {
            check : "Boolean",
            init : false
          },
          canvasWidth :
          {
            check : "Integer",
            init : 300,
            apply : "_applyCanvasWidth"
          },
          canvasHeight :
          {
            check : "Integer",
            init : 150,
            apply : "_applyCanvasHeight"
          }
        },
        members :
        {
          __deferredDraw : null,
          _createContentElement : function() {
            return new qx.html.Canvas();
          },
          __redraw : function()
          {
            var canvas = this.getContentElement();
            var height = canvas.getHeight();
            var width = canvas.getWidth();
            var context = canvas.getContext2d();
            this._draw(width, height, context);
            this.fireNonBubblingEvent(
              "redraw",
              qx.event.type.Data,
              [{
                width: width,
                height: height,
                context: context
              }]
            );
          },
          _applyCanvasWidth : function(value, old)
          {
            this.getContentElement().setWidth(value);
            this.__deferredDraw.schedule();
          },
          _applyCanvasHeight : function(value, old)
          {
            this.getContentElement().setHeight(value);
            this.__deferredDraw.schedule();
          },
          update : function() {
            this.__deferredDraw.schedule();
          },
          _onResize : function(e)
          {
            var data = e.getData();

            if (this.getSyncDimension())
            {
              this.setCanvasHeight(data.height);
              this.setCanvasWidth(data.width);
            }
          },
          getContext2d : function() {
            return this.getContentElement().getContext2d();
          },
          _draw : function(width, height, context) {}
        },
        destruct : function() {
          this._disposeObjects("__deferredDraw");
        }
      });
      cci('qx.ui.embed.Canvas ADDED');
    }
    // MAIN BODY
    qx.Class.define("MHTools.Navigator", {
      type: 'singleton',
      extend: qx.core.Object,
      statics : {
        NAME: 'Navegador',
        PLUGIN: 'none',
        AUTHOR: 'MrHIDEn',
        VERSION: "NG",
        REQUIRES: '',
        INFO: '',
        WWW: 'http://userscripts.org/scripts/show/159496',
        SIZE: 0
      },
      construct: function() {
        try {
          this.stats.src = 'http://goo.gl/aeCxf';//1.0.0 1.1.0 1.2.0 1.3x
          this.Self = this;
          var backColor = '#eeeeff';
          var ser = ClientLib.Data.MainData.GetInstance().get_Server();
          this.cenX = ser.get_ContinentWidth() / 2;
          this.cenY = ser.get_ContinentHeight() / 2;  
          var pos = this.loadFromStorage('lock', {x:this.cenX, y:this.cenY});
          this.lockX = pos.x;
          this.lockY = pos.y;          
          //this.lockX = this.cenX;
          //this.lockY = this.cenY;
          this.posTimer = new qx.event.Timer();
          this.posTimer.addListener("interval",this.onPosTimer,this);
          this.winName = "Navigator " + MHTools.Navigator.VERSION.toString();
          this.win = new qx.ui.window.Window(this.winName);
          this.win.set({
            width:50,
            //showMinimize:false,
            showMaximize:false,
            showClose:false,
            padding: 0,
            //contentPadding: 2,
            allowClose:false,
            //allowMinimize:false,
            resizable:false,
            toolTipText: "NovaGama Compass."
          });
          this.win.addListener("minimize",function(e) {
            if(this.extMinimized) {
              this.extMinimized = false;
              for(var k in this.extItems) this.win.add(this.extItems[k]);
            }
            else {
              this.extMinimized = true;
              this.win.removeAll();
            }
            this.win.restore();//trick
          },this);
          this.win.addListener("move", function(e) {
            var pos = {left:e.getData().left, top:e.getData().top};
            this.saveToStorage('winpos', pos);
          }, this);
          pos = this.loadFromStorage('winpos', {left:120, top:4});
          this.win.moveTo(pos.left, pos.top);
          var winLayout = new qx.ui.layout.VBox();
          winLayout.setAlignX("center");
          this.win.setLayout(winLayout);
          
          var winXYLayout = new qx.ui.layout.VBox();
          this.winXY = new qx.ui.window.Window("Go to x:y");
          this.winXY.set({
            width:130,
            height:50,
            showMinimize:false,
            showMaximize:false,
            showClose:true,
            //contentPadding: 6,
            padding: 1,
            resizable:false
            //layout:winXYLayout
          });
          this.winXY.setLayout(winXYLayout);
          this.winXY.setToolTipText('Proper values:<br>333 444<br>333:444<br>333;444<br>333,444<br>333.444<br>[coords]333:444[/coords]');
          var cntXY = new qx.ui.container.Composite(new qx.ui.layout.VBox());
          cntXY.setThemedBackgroundColor(backColor);
          var lblXY = new qx.ui.basic.Label('Write X:Y and press [Enter]');
          this.txtXY = new qx.ui.form.TextField('');
          this.txtXY.set(
          {
            required    : true,
            placeholder : "Ex: 333:444"
          });
          this.txtXY.addListener("keydown", function(e) {
            if(e.getKeyIdentifier()=="Enter") {
              var txt = this.txtXY.getValue();
              if(txt.length>2) {
                  txt = txt.trim();
                  txt = txt.replace('[coords]','').replace('[/coords]','');
                  txt = txt.replace(' ',':');
                  txt = txt.replace(';',':');
                  txt = txt.replace(',',':');
                  txt = txt.replace('.',':');
                  var s = txt.split(':');
                  if(s.length==2) {
                    var x = s[0];
                    var y = s[1];
                    if(!isNaN(parseInt(x)) && !isNaN(parseInt(y))) {
                      x = parseInt(x);
                      y = parseInt(y);
                      webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(x,y);
                      this.txtXY.setValue('');
                      this.winXY.close();
                    }
                  }
                  return;
              }
              alert('Use:\nnumers and one of allowed separators \' :;,.\' \nor [coords]333:444[/coords]');
            }
          }, this);
          this.winXY.add(cntXY);
          cntXY.add(lblXY);
          cntXY.add(this.txtXY);


          // Compass 1 //////////////////////////////////////////////////////////////
          var canvas1 = new qx.ui.embed.Canvas();
          canvas1.set({
            width: 45,
            height: 45,
            canvasWidth: 45,
            canvasHeight: 45,
            toolTipText: "Pointing selected base."
          });
          canvas1.addListener("click",function(e) {
            var cid  = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
            webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cid);
            this.displayCompass();
          },this);
          canvas1.set({
            toolTipText: "Click - go to."
          });
          var hboxNav1 = new qx.ui.layout.HBox();
          hboxNav1.setAlignX("center");
          var cntNav1 = new qx.ui.container.Composite();
          cntNav1.setLayout(hboxNav1);
          cntNav1.setThemedBackgroundColor(backColor);
          cntNav1.add(canvas1);
          this.ctx1 = canvas1.getContext2d();
          // add
          this.extItems.push(cntNav1);

          // Info //////////////////////////////////////////////////////////////
          var vboxInfo1 = new qx.ui.layout.VBox();
          vboxInfo1.setAlignX("center");
          var cntInfo1 = new qx.ui.container.Composite();
          cntInfo1.setLayout(vboxInfo1);
          cntInfo1.setThemedBackgroundColor(backColor);
          cntInfo1.setThemedFont("bold");
          this.disBase = new qx.ui.basic.Label('0');
          this.disBase.set({
            toolTipText: "Distance from your current base to the center of view."
          });
          cntInfo1.add(new qx.ui.basic.Label("Current Base"));
          cntInfo1.add(this.disBase);
          // add
          this.extItems.push(cntInfo1);

          // Compass 2 //////////////////////////////////////////////////////////////
          var canvas2 = new qx.ui.embed.Canvas();
          canvas2.set({
            width: 45,
            height: 45,
            canvasWidth: 45,
            canvasHeight: 45,
            toolTipText: "Pointing locked base. Click this to lock center of the map."
          });
          canvas2.addListener("click",function(e) {
            webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(this.lockX,this.lockY);
          },this);
          canvas2.set({
            toolTipText: "Click - go to."
          });
          var hboxNav2 = new qx.ui.layout.HBox();
          hboxNav2.setAlignX("center");
          var cntNav2 = new qx.ui.container.Composite();
          cntNav2.setLayout(hboxNav2);
          cntNav2.setThemedBackgroundColor(backColor);
          cntNav2.add(canvas2);
          this.ctx2 = canvas2.getContext2d();
          // add
          this.extItems.push(cntNav2);


          var vboxInfo2 = new qx.ui.layout.VBox();
          vboxInfo2.setAlignX("center");
          var cntInfo2 = new qx.ui.container.Composite();
          cntInfo2.setLayout(vboxInfo2);
          cntInfo2.setThemedBackgroundColor(backColor);
          cntInfo2.setThemedFont("bold");

          this.coordLock = new qx.ui.basic.Label('X:Y');
          this.coordLock.set({
            toolTipText: "Click - set center of map."
          });
          this.coordLock.addListener("click",function(e) {
            var ser = ClientLib.Data.MainData.GetInstance().get_Server(); 
            this.lockX = ser.get_ContinentWidth() / 2;
            this.lockY = ser.get_ContinentHeight() / 2;
            this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
            this.displayCompass();
          },this);
          this.disLock = new qx.ui.basic.Label('0');
          this.disLock.set({
            toolTipText: "Distance from locked object to the selected object."
          });
          var btnXY = new qx.ui.form.Button("X:Y");
          btnXY.set({
            width:50,
            toolTipText: "Go to position."
          }); 
          btnXY.addListener("execute", function(e) {
            var lp = this.win.getLayoutProperties();
            this.winXY.moveTo(lp.left, lp.top+150);
            this.winXY.open();
            this.txtXY.focus();
          }, this);
          var btnLock = new qx.ui.form.Button("Lock");
          btnLock.set({
            width:60,
            toolTipText: "Lock position of the selected object."
          });
          btnLock.addListener("execute", function(e) {
            this.lockX = this.selX;
            this.lockY = this.selY;
            this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
            this.saveToStorage('lock', {x:this.lockX,y:this.lockY});
            this.displayCompass();
          }, this);
          cntInfo2.add(this.coordLock);
          cntInfo2.add(this.disLock);
          // add
          this.extItems.push(cntInfo2);
          
          var cntButtons = new qx.ui.container.Composite(new qx.ui.layout.HBox());
          cntButtons.setThemedBackgroundColor(backColor);
          cntButtons.add(btnXY);
          cntButtons.add(btnLock);
          // add
          this.extItems.push(cntButtons);

          for(var k in this.extItems) this.win.add(this.extItems[k]);

          this.win.open();

          phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.onPositionChange);
          phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);

          console.info(this.classname," LOADED");
        } catch (e) {
          console.error(this.classname,".construct: ", e);
        }
      },
      members: {
        Self: null,
        stats: document.createElement('img'),
        winName: '',
        win: null,
        extItems: [],
        extMinimized: false,
        winXY: null,
        txtXY: null,
        posTimer: null,
        disBase: null,
        disObj: null,
        coordLock: null,
        disLock: null,
        ctx1: null,
        ctx2: null,
        background: null,
        size: 50,
        LObjectType: [],
        selX: -1,
        selY: -1,
        lockX: 0,
        lockY: 0,
        cenX: 0,
        cenY: 0,
        selected: null,
        visObject: null,
        loadFromStorage: function(key,preval) {
          var S = ClientLib.Base.LocalStorage;
          if (S.get_IsSupported()) {
            var val = S.GetItem(this.classname+'.'+key);
            if(val!==null) {
              preval = val;
            }
          }
          return preval;
        },
        saveToStorage: function(key,val) {
          if(val!==null) {
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) S.SetItem(this.classname+'.'+key, val);
          }
        },
        onPositionChange: function (e) {
          //console.log('onPositionChange');
          this.posTimer.restartWith(200);
        },
        onPosTimer: function (e) {
          //console.log('onPosTimer');
          this.posTimer.stop();
          this.displayCompass();
        },
        onSelectionChange: function (l,c) {
          //console.log('onSelectionChange.c:',c);
          try {
            var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
            if (visObject!==null) {
              var t = visObject.get_VisObjectType();
              switch (t) {
                /* NOTE
                RegionCityType
                RegionSuperWeaponType
                RegionTerrainType
                RegionMoveTarget
                RegionFreeSlotType
                RegionNPCBase
                RegionNPCCamp
                RegionPointOfInterest
                RegionRuin
                RegionGhostCity
                RegionNewPlayerSpot
                RegionHub  */
                case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                  //this.calcDistance();
                  //console.log('visObject:',visObject);
                  //console.log('Vis Object Type:',t,', ',this.LObjectType[t]);
                  this.visObject = visObject;
                  this.selX = visObject.get_RawX();
                  this.selY = visObject.get_RawY();
                  this.selected = true;
                  this.displayCompass();
                  break;
                default:
                  break;
              }
            }
          } catch (e) {
            console.error(this.classname,".onSelectionChange", e);
          }
        },
        displayCompass: function () {
          //console.log('displayCompass:');
          try {
            if(this.ctx1===null) return;
            if(this.ctx2===null) return;
            var ctx1 = this.ctx1;
            var ctx2 = this.ctx2;
            var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
            var cityCoordX = currentCity.get_PosX();
            var cityCoordY = currentCity.get_PosY();
            if(this.selX==-1 && this.selY==-1) {
              this.selX = currentCity.get_PosX();
              this.selY = currentCity.get_PosY();
              //this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
            }

            var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
            var gridW = region.get_GridWidth();
            var gridH = region.get_GridHeight();
            var regionX = region.get_PosX();
            var regionY = region.get_PosY();
            var viewW = region.get_ViewWidth();
            var viewH = region.get_ViewHeight();
            var zoom = region.get_ZoomFactor();

            var viewCoordX = (regionX + viewW / 2 / zoom) / gridW - 0.5;
            var viewCoordY = (regionY + viewH / 2 / zoom) / gridH - 0.5;

            var dx = viewCoordX - cityCoordX;
            var dy = cityCoordY - viewCoordY;
            var distance = Math.sqrt(dx * dx + dy * dy);

            ctx1.clearRect(0, 0, 50, 50);
            ctx1.save();
            ctx1.translate(25, 25);
            ctx1.rotate(dy > 0 ? Math.asin(dx / distance) + Math.PI : -Math.asin(dx / distance));
            this.drawCompass(ctx1);
            ctx1.restore();

            var dx2 = this.selX - this.lockX;
            var dy2 = this.lockY - this.selY;
            var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            ctx2.clearRect(0, 0, 50, 50);
            ctx2.save();
            ctx2.translate(25, 25);
            ctx2.rotate(dy2 > 0 ? Math.asin(dx2 / distance2) + Math.PI : -Math.asin(dx2 / distance2));
            this.drawCompass(ctx2);
            ctx2.restore();

            this.disBase.setValue(distance.toFixed(1).toString());
            var ltext = ClientLib.Base.Util.CalculateDistance(this.lockX, this.lockY, this.selX, this.selY);
            this.disLock.setValue(ltext.toString());


          } catch (e) {
            console.error(this.classname,".displayCompass", e);
          }
        },
        drawCompass: function(c) {
          //console.log('drawCompass:');
          c.strokeStyle = 'black';
          c.beginPath();
          c.arc(0,0,20,0,Math.PI*2,true); // Outer circle
          c.stroke();

          c.strokeStyle = 'black';
          c.beginPath();
          c.moveTo(0, 0);
          c.lineTo(0, -20);  // Line
          c.closePath();
          c.stroke();

          c.beginPath();
          c.strokeStyle = 'black';
          c.fillStyle = 'white';
          c.arc(0,0,4,0,Math.PI*2,true); // Inner dot
          c.fill();
          c.stroke();

          c.beginPath();
          c.strokeStyle = 'black';
          c.fillStyle = 'aqua';
          c.arc(0,-20,4,0,Math.PI*2,true); // Outer dot
          c.fill();
          c.stroke();
        }
      }
    });
  }//createClasses()
  function WaitForGame() {
    try
    {
      if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      {
        var app = qx.core.Init.getApplication();
        if (app.initDone===true)
        {
          createClasses();
          MHTools.Navigator.getInstance();
          MHTools.Navigator.SIZE = scriptSize;
          return;//DONE
        }
      }
    } catch (e) {
      console.error(spaceName,'.WaitForGame: ', e);
    }
    window.setTimeout(WaitForGame, 2000);
  }
  window.setTimeout(WaitForGame, 2000);
}
function Inject() {
  var script = document.createElement('script');
  var txt = injectBody.toString();
  txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
  script.innerHTML = '(' + txt + ')();';
  script.type = 'text/javascript';
  document.head.appendChild(script);
}
Inject();
})();
//--------------------------------------CnCopt-------------------------------------//

var scity = null;
var tcity = null;
var tbase = null;
try {
  unsafeWindow.__cncopt_version = "1.7.5";
  (function () {
    var cncopt_main = function () {

      var defense_unit_map = {
        /* GDI Defense Units */"GDI_Wall": "w",
        "GDI_Cannon": "c",
        "GDI_Antitank Barrier": "t",
        "GDI_Barbwire": "b",
        "GDI_Turret": "m",
        "GDI_Flak": "f",
        "GDI_Art Inf": "r",
        "GDI_Art Air": "e",
        "GDI_Art Tank": "a",
        "GDI_Def_APC Guardian": "g",
        "GDI_Def_Missile Squad": "q",
        "GDI_Def_Pitbull": "p",
        "GDI_Def_Predator": "d",
        "GDI_Def_Sniper": "s",
        "GDI_Def_Zone Trooper": "z",
        /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
        "NOD_Def_Art Air": "e",
        "NOD_Def_Art Inf": "r",
        "NOD_Def_Art Tank": "a",
        "NOD_Def_Attack Bike": "p",
        "NOD_Def_Barbwire": "b",
        "NOD_Def_Black Hand": "z",
        "NOD_Def_Cannon": "c",
        "NOD_Def_Confessor": "s",
        "NOD_Def_Flak": "f",
        "NOD_Def_MG Nest": "m",
        "NOD_Def_Militant Rocket Soldiers": "q",
        "NOD_Def_Reckoner": "g",
        "NOD_Def_Scorpion Tank": "d",
        "NOD_Def_Wall": "w",

        /* Forgotten Defense Units */"FOR_Wall": "w",
        "FOR_Barbwire_VS_Inf": "b",
        "FOR_Barrier_VS_Veh": "t",
        "FOR_Inf_VS_Inf": "g",
        "FOR_Inf_VS_Veh": "r",
        "FOR_Inf_VS_Air": "q",
        "FOR_Sniper": "n",
        "FOR_Mammoth": "y",
        "FOR_Veh_VS_Inf": "o",
        "FOR_Veh_VS_Veh": "s",
        "FOR_Veh_VS_Air": "u",
        "FOR_Turret_VS_Inf": "m",
        "FOR_Turret_VS_Inf_ranged": "a",
        "FOR_Turret_VS_Veh": "v",
        "FOR_Turret_VS_Veh_ranged": "d",
        "FOR_Turret_VS_Air": "f",
        "FOR_Turret_VS_Air_ranged": "e",
        "": ""
      };

      var offense_unit_map = {
        /* GDI Offense Units */"GDI_APC Guardian": "g",
        "GDI_Commando": "c",
        "GDI_Firehawk": "f",
        "GDI_Juggernaut": "j",
        "GDI_Kodiak": "k",
        "GDI_Mammoth": "m",
        "GDI_Missile Squad": "q",
        "GDI_Orca": "o",
        "GDI_Paladin": "a",
        "GDI_Pitbull": "p",
        "GDI_Predator": "d",
        "GDI_Riflemen": "r",
        "GDI_Sniper Team": "s",
        "GDI_Zone Trooper": "z",

        /* Nod Offense Units */"NOD_Attack Bike": "b",
        "NOD_Avatar": "a",
        "NOD_Black Hand": "z",
        "NOD_Cobra": "r",
        "NOD_Commando": "c",
        "NOD_Confessor": "s",
        "NOD_Militant Rocket Soldiers": "q",
        "NOD_Militants": "m",
        "NOD_Reckoner": "k",
        "NOD_Salamander": "l",
        "NOD_Scorpion Tank": "o",
        "NOD_Specter Artilery": "p",
        "NOD_Venom": "v",
        "NOD_Vertigo": "t",
        "": ""
      };


      function findTechLayout(city) {
        for (var k in city) {
          //console.log(typeof(city[k]), "1.city[", k, "]", city[k])
          if ((typeof (city[k]) == "object") && city[k] && 0 in city[k] && 8 in city[k]) {
            if ((typeof (city[k][0]) == "object") && city[k][0] && city[k][0] && 0 in city[k][0] && 15 in city[k][0]) {
              if ((typeof (city[k][0][0]) == "object") && city[k][0][0] && "BuildingIndex" in city[k][0][0]) {
                return city[k];
              }
            }
          }
        }
        return null;
      }

      function findBuildings(city) {
        var cityBuildings = city.get_CityBuildingsData();
        for (var k in cityBuildings) {
          if (PerforceChangelist >= 376877) {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k] && "c" in cityBuildings[k] && cityBuildings[k].c > 0) {
              return cityBuildings[k].d;
            }
          } else {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "l" in cityBuildings[k]) {
              return cityBuildings[k].l;
            }
          }
        }
      }

      function isOffenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in offense_unit_map);
      }

      function isDefenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in defense_unit_map);
      }

      function getUnitArrays(city) {
        var ret = [];
        for (var k in city) {
          if ((typeof (city[k]) == "object") && city[k]) {
            for (var k2 in city[k]) {
              if (PerforceChangelist >= 376877) {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "d" in city[k][k2]) {
                  var lst = city[k][k2].d;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              } else {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "l" in city[k][k2]) {
                  var lst = city[k][k2].l;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return ret;
      }

      function getDefenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isDefenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }

      function getOffenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isOffenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }


      function cncopt_create() {
        console.log("CNCOpt Link Button v" + window.__cncopt_version + " loaded");
        var cncopt = {
          selected_base: null,
          keymap: {
            /* GDI Buildings */"GDI_Accumulator": "a",
            "GDI_Refinery": "r",
            "GDI_Trade Center": "u",
            "GDI_Silo": "s",
            "GDI_Power Plant": "p",
            "GDI_Construction Yard": "y",
            "GDI_Airport": "d",
            "GDI_Barracks": "b",
            "GDI_Factory": "f",
            "GDI_Defense HQ": "q",
            "GDI_Defense Facility": "w",
            "GDI_Command Center": "e",
            "GDI_Support_Art": "z",
            "GDI_Support_Air": "x",
            "GDI_Support_Ion": "i",
            /* Forgotten Buildings */"FOR_Silo": "s",
            "FOR_Refinery": "r",
            "FOR_Tiberium Booster": "b",
            "FOR_Crystal Booster": "v",
            "FOR_Trade Center": "u",
            "FOR_Defense Facility": "w",
            "FOR_Construction Yard": "y",
            "FOR_Harvester_Tiberium": "h",
            "FOR_Defense HQ": "q",
            "FOR_Harvester_Crystal": "n",
            /* Nod Buildings */"NOD_Refinery": "r",
            "NOD_Power Plant": "p",
            "NOD_Harvester": "h",
            "NOD_Construction Yard": "y",
            "NOD_Airport": "d",
            "NOD_Trade Center": "u",
            "NOD_Defense HQ": "q",
            "NOD_Barracks": "b",
            "NOD_Silo": "s",
            "NOD_Factory": "f",
            "NOD_Harvester_Crystal": "n",
            "NOD_Command Post": "e",
            "NOD_Support_Art": "z",
            "NOD_Support_Ion": "i",
            "NOD_Accumulator": "a",
            "NOD_Support_Air": "x",
            "NOD_Defense Facility": "w",
            //"NOD_Tech Lab": "",
            //"NOD_Recruitment Hub": "X",
            //"NOD_Temple of Nod": "X",

            /* GDI Defense Units */"GDI_Wall": "w",
            "GDI_Cannon": "c",
            "GDI_Antitank Barrier": "t",
            "GDI_Barbwire": "b",
            "GDI_Turret": "m",
            "GDI_Flak": "f",
            "GDI_Art Inf": "r",
            "GDI_Art Air": "e",
            "GDI_Art Tank": "a",
            "GDI_Def_APC Guardian": "g",
            "GDI_Def_Missile Squad": "q",
            "GDI_Def_Pitbull": "p",
            "GDI_Def_Predator": "d",
            "GDI_Def_Sniper": "s",
            "GDI_Def_Zone Trooper": "z",
            /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
            "NOD_Def_Art Air": "e",
            "NOD_Def_Art Inf": "r",
            "NOD_Def_Art Tank": "a",
            "NOD_Def_Attack Bike": "p",
            "NOD_Def_Barbwire": "b",
            "NOD_Def_Black Hand": "z",
            "NOD_Def_Cannon": "c",
            "NOD_Def_Confessor": "s",
            "NOD_Def_Flak": "f",
            "NOD_Def_MG Nest": "m",
            "NOD_Def_Militant Rocket Soldiers": "q",
            "NOD_Def_Reckoner": "g",
            "NOD_Def_Scorpion Tank": "d",
            "NOD_Def_Wall": "w",

            /* Forgotten Defense Units */"FOR_Wall": "w",
            "FOR_Barbwire_VS_Inf": "b",
            "FOR_Barrier_VS_Veh": "t",
            "FOR_Inf_VS_Inf": "g",
            "FOR_Inf_VS_Veh": "r",
            "FOR_Inf_VS_Air": "q",
            "FOR_Sniper": "n",
            "FOR_Mammoth": "y",
            "FOR_Veh_VS_Inf": "o",
            "FOR_Veh_VS_Veh": "s",
            "FOR_Veh_VS_Air": "u",
            "FOR_Turret_VS_Inf": "m",
            "FOR_Turret_VS_Inf_ranged": "a",
            "FOR_Turret_VS_Veh": "v",
            "FOR_Turret_VS_Veh_ranged": "d",
            "FOR_Turret_VS_Air": "f",
            "FOR_Turret_VS_Air_ranged": "e",

            /* GDI Offense Units */"GDI_APC Guardian": "g",
            "GDI_Commando": "c",
            "GDI_Firehawk": "f",
            "GDI_Juggernaut": "j",
            "GDI_Kodiak": "k",
            "GDI_Mammoth": "m",
            "GDI_Missile Squad": "q",
            "GDI_Orca": "o",
            "GDI_Paladin": "a",
            "GDI_Pitbull": "p",
            "GDI_Predator": "d",
            "GDI_Riflemen": "r",
            "GDI_Sniper Team": "s",
            "GDI_Zone Trooper": "z",

            /* Nod Offense Units */"NOD_Attack Bike": "b",
            "NOD_Avatar": "a",
            "NOD_Black Hand": "z",
            "NOD_Cobra": "r",
            "NOD_Commando": "c",
            "NOD_Confessor": "s",
            "NOD_Militant Rocket Soldiers": "q",
            "NOD_Militants": "m",
            "NOD_Reckoner": "k",
            "NOD_Salamander": "l",
            "NOD_Scorpion Tank": "o",
            "NOD_Specter Artilery": "p",
            "NOD_Venom": "v",
            "NOD_Vertigo": "t",

            "<last>": "."
          },
          make_sharelink: function () {
            try {
              var selected_base = cncopt.selected_base;
              var city_id = selected_base.get_Id();
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
              var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
              var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
              tbase = selected_base;
              tcity = city;
              scity = own_city;
              //console.log("Target City: ", city);
              //console.log("Own City: ", own_city);
              var link = "http://cncopt.com/?map=";
              link += "3|"; /* link version */
              switch (city.get_CityFaction()) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + city.get_CityFaction());
                  link += "E|";
                  break;
              }
              switch (own_city.get_CityFaction()) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + own_city.get_CityFaction());
                  link += "E|";
                  break;
              }
              link += city.get_Name() + "|";
              defense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                defense_units.push(col)
              }
              var defense_unit_list = getDefenseUnits(city);
              if (PerforceChangelist >= 376877) {
                for (var i in defense_unit_list) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              } else {
                for (var i = 0; i < defense_unit_list.length; ++i) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              }

              offense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                offense_units.push(col)
              }

              var offense_unit_list = getOffenseUnits(own_city);
              if (PerforceChangelist >= 376877) {
                for (var i in offense_unit_list) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              } else {
                for (var i = 0; i < offense_unit_list.length; ++i) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              }

              var techLayout = findTechLayout(city);
              var buildings = findBuildings(city);
              for (var i = 0; i < 20; ++i) {
                row = [];
                for (var j = 0; j < 9; ++j) {
                  var spot = i > 16 ? null : techLayout[j][i];
                  var level = 0;
                  var building = null;
                  if (spot && spot.BuildingIndex >= 0) {
                    building = buildings[spot.BuildingIndex];
                    level = building.get_CurrentLevel();
                  }
                  var defense_unit = defense_units[j][i];
                  if (defense_unit) {
                    level = defense_unit.get_CurrentLevel();
                  }
                  var offense_unit = offense_units[j][i];
                  if (offense_unit) {
                    level = offense_unit.get_CurrentLevel();
                  }
                  if (level > 1) {
                    link += level;
                  }

                  switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                    case 0:
                      if (building) {
                        var techId = building.get_MdbBuildingId();
                        if (GAMEDATA.Tech[techId].n in cncopt.keymap) {
                          link += cncopt.keymap[GAMEDATA.Tech[techId].n];
                        } else {
                          console.log("cncopt [5]: Unhandled building: " + techId, building);
                          link += ".";
                        }
                      } else if (defense_unit) {
                        if (defense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[defense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else if (offense_unit) {
                        if (offense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[offense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else {
                        link += ".";
                      }
                      break;
                    case 1:
                      /* Crystal */
                      if (spot.BuildingIndex < 0) link += "c";
                      else link += "n";
                      break;
                    case 2:
                      /* Tiberium */
                      if (spot.BuildingIndex < 0) link += "t";
                      else link += "h";
                      break;
                    case 4:
                      /* Woods */
                      link += "j";
                      break;
                    case 5:
                      /* Scrub */
                      link += "h";
                      break;
                    case 6:
                      /* Oil */
                      link += "l";
                      break;
                    case 7:
                      /* Swamp */
                      link += "k";
                      break;
                    default:
                      console.log("cncopt [4]: Unhandled resource type: " + city.GetResourceType(j, i));
                      link += ".";
                      break;
                  }
                }
              }
              /* Tack on our alliance bonuses */
              if (alliance && scity.get_AllianceId() == tcity.get_AllianceId()) {
                link += "|" + alliance.get_POITiberiumBonus();
                link += "|" + alliance.get_POICrystalBonus();
                link += "|" + alliance.get_POIPowerBonus();
                link += "|" + alliance.get_POIInfantryBonus();
                link += "|" + alliance.get_POIVehicleBonus();
                link += "|" + alliance.get_POIAirBonus();
                link += "|" + alliance.get_POIDefenseBonus();
              }

              //console.log(link);
              window.open(link, "_blank");
            } catch (e) {
              console.log("cncopt [1]: ", e);
            }
          }
        };
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }

        var check_ct = 0;
        var check_timer = null;
        var button_enabled = 123456;
        /* Wrap showMenu so we can inject our Sharelink at the end of menus and
         * sync Base object to our cncopt.selected_base variable  */
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
          try {
            var self = this;
            //console.log(selected_base);
            cncopt.selected_base = selected_base;
            if (this.__cncopt_initialized != 1) {
              this.__cncopt_initialized = 1;
              this.__cncopt_links = [];
              for (var i in this) {
                try {
                  if (this[i] && this[i].basename == "Composite") {
                    var link = new qx.ui.form.Button("CNCOpt NG","http://img825.imageshack.us/img825/874/4zni.png");
                    link.addListener("execute", function () {
                      var bt = qx.core.Init.getApplication();
                      bt.getBackgroundArea().closeCityInfo();
                      cncopt.make_sharelink();
                    });
                    this[i].add(link);
                    this.__cncopt_links.push(link)
                  }
                } catch (e) {
                  console.log("cncopt [2]: ", e);
                }
              }
            }
            var tf = false;
            switch (selected_base.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                switch (selected_base.get_Type()) {
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                    tf = true;
                    break;
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                    tf = true;
                    break;
                }
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                tf = false;
                console.log("cncopt: Ghost City selected.. ignoring because we don't know what to do here");
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                tf = true;
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                tf = true;
                break;
            }

            var orig_tf = tf;

            function check_if_button_should_be_enabled() {
              try {
                tf = orig_tf;
                var selected_base = cncopt.selected_base;
                var still_loading = false;
                if (check_timer != null) {
                  clearTimeout(check_timer);
                }

                /* When a city is selected, the data for the city is loaded in the background.. once the 
                 * data arrives, this method is called again with these fields set, but until it does
                 * we can't actually generate the link.. so this section of the code grays out the button
                 * until the data is ready, then it'll light up. */
                if (selected_base && selected_base.get_Id) {
                  var city_id = selected_base.get_Id();
                  var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                  //if (!city || !city.m_CityUnits || !city.m_CityUnits.m_DefenseUnits) {
                  //console.log("City", city);
                  //console.log("get_OwnerId", city.get_OwnerId());
                  if (!city || city.get_OwnerId() == 0) {
                    still_loading = true;
                    tf = false;
                  }
                } else {
                  tf = false;
                }
                if (tf != button_enabled) {
                  button_enabled = tf;
                  for (var i = 0; i < self.__cncopt_links.length; ++i) {
                    self.__cncopt_links[i].setEnabled(tf);
                  }
                }
                if (!still_loading) {
                  check_ct = 0;
                } else {
                  if (check_ct > 0) {
                    check_ct--;
                    check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                  } else {
                    check_timer = null;
                  }
                }
              } catch (e) {
                console.log("cncopt [3]: ", e);
                tf = false;
              }
            }

            check_ct = 50;
            check_if_button_should_be_enabled();
          } catch (e) {
            console.log("cncopt [3]: ", e);
          }
          this.__cncopt_real_showMenu(selected_base);
        }
      }


      /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
      function cnc_check_if_loaded() {
        try {
          if (typeof qx != 'undefined') {
            a = qx.core.Init.getApplication(); // application
            if (a) {
              cncopt_create();
            } else {
              window.setTimeout(cnc_check_if_loaded, 1000);
            }
          } else {
            window.setTimeout(cnc_check_if_loaded, 1000);
          }
        } catch (e) {
          if (typeof console != 'undefined') console.log(e);
          else if (window.opera) opera.postError(e);
          else GM_log(e);
        }
      }
      if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
    }

    // injecting because we can't seem to hook into the game interface via unsafeWindow 
    //   (Ripped from AmpliDude's LoU Tweak script)
    var script_block = document.createElement("script");
    txt = cncopt_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
  })();
} catch (e) {
  GM_log(e);
}
