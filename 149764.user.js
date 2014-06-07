// ==UserScript==
// @name           LoU Baron Bar FR - Roma-fr.org
// @namespace      LoU Baron Bar
// @description    Ajouts à Lord of Ultima: Barre de suivi pour les barons, nombre de chateaux, état des purifs...
// @icon		   http://www.roma-fr.org/roma-fr.png
// @license        Creative Commons Attribution-ShareAlike 3.0 Unported License - http://creativecommons.org/licenses/by-sa/3.0/
// @author         Equipe ROMA-fr.org | Remerciements à OzGoober, orshee, Alchemist42, DanT1, paulwratt, LordGregGreg et à tous ceux qui ont participé a l'élaboration de ce script | base de cette version: http://userscripts.org/scripts/show/145722
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        3.0.12 fr 0.2
// @require        http://sizzlemctwizzle.com/updater.php?id=149764&days=1
// ==/UserScript==

(function() {

	function bblog(e){
		if (typeof console != "undefined") console.log(e);
		else if (window.opera) opera.postError(e);
		else GM_log(e);
	}

	bblog('BRB_mainFunction');

var BRB_mainFunction = function() {//

	BRB_version = '3.0.12';
	BRB_debug = false;//
	
	balog('BaronBar');

	function balog(e){
		if(!BRB_debug) return;
		if (typeof console != "undefined") console.log(e);
		else if (window.opera) opera.postError(e);
		else GM_log(e);
	}

	var bbApp, bbPlayer, bbTech, bbPlayerBar;
	var bbCastleLabel, bbCastleValue;
	var bbBaronLabel, bbBaronValue;
	var bbPurifiedResourcesLabel, bbPurifiedResourcesValue;

	function BRB_BaronBarLoU(){
		balog('BaronBarLoU: start');
		
		// Baron Info in Title Bar
		var BRB_Appearance = 'label-playername-banner';
		var BRB_Color = 'player-name-banner-dark';
		var BRB_CasToolTip = 'Castles'
		var BRB_BarToolTip = 'Total / Disponibles / En cours de recrutement / Recrutables';
		var BRB_ResToolTip = 'Bois sombre / Pierre runique / Veritium / Grain magique';
		var BRB_LeftIdent = 1000;
		try{
			if(bos!='undefined')
				BRB_LeftIdent = 1182;
			}
		catch(e){balog(e);}
		// Label: Castles
		bbCastleLabel = new qx.ui.basic.Label('Nombre de chateaux:');
		bbCastleLabel.setAppearance(BRB_Appearance);
		bbCastleLabel.setTextColor(BRB_Color);
		bbCastleLabel.setToolTipText(BRB_CasToolTip);
		balog('BaronBarLoU: start2');
		bbPlayerBar.add(bbCastleLabel, { top: 1, left: BRB_LeftIdent + 5 });
		//balog('BaronBarLoU: star3');
		
		// values: Castles
		bbCastleValue = new qx.ui.basic.Label(BRB_CasToolTip);
		bbCastleValue.setAppearance(BRB_Appearance);
		bbCastleValue.setToolTipText(BRB_CasToolTip);
		bbPlayerBar.add(bbCastleValue, { top: 1, left: BRB_LeftIdent + 115 });
		webfrontend.base.Timer.getInstance().addListener("uiTick", BRB_updateCastleCount, this); // set auto update
		//balog('BaronBarLoU: start4');
		// Label: Barons
		bbBaronLabel = new qx.ui.basic.Label('Barons:');
		bbBaronLabel.setAppearance(BRB_Appearance);
		bbBaronLabel.setTextColor(BRB_Color);
		bbBaronLabel.setToolTipText(BRB_BarToolTip);
		bbPlayerBar.add(bbBaronLabel, { top: 16, left: BRB_LeftIdent + 5 });
		//balog('BaronBarLoU: start5');
		// values: Barons
		bbBaronValue = new qx.ui.basic.Label('0/0/0/0');
		bbBaronValue.setAppearance(BRB_Appearance);
		bbBaronValue.setToolTipText(BRB_BarToolTip);
		bbPlayerBar.add(bbBaronValue, { top: 16, left: BRB_LeftIdent + 45 });
		webfrontend.base.Timer.getInstance().addListener("uiTick", BRB_updateCurBarons, this); // set auto update
		//balog('BaronBarLoU: start6');
		// Label: Purified Resources
		bbPurifiedResourcesLabel = new qx.ui.basic.Label('Ressources Purifiées:');
		bbPurifiedResourcesLabel.setAppearance(BRB_Appearance);
		bbPurifiedResourcesLabel.setTextColor(BRB_Color);
		bbPurifiedResourcesLabel.setToolTipText(BRB_ResToolTip);
		bbPlayerBar.add(bbPurifiedResourcesLabel, { top: 31, left: BRB_LeftIdent + 5 });
		//balog('BaronBarLoU: start7');
		// values: Purified Resources
		bbPurifiedResourcesValue = new qx.ui.basic.Label('0/0/0/0');
		bbPurifiedResourcesValue.setAppearance(BRB_Appearance);
		bbPurifiedResourcesValue.setToolTipText(BRB_ResToolTip);
		bbPlayerBar.add(bbPurifiedResourcesValue, { top: 43, left: BRB_LeftIdent + 5 });
		webfrontend.base.Timer.getInstance().addListener("uiTick", BRB_updatePurifiedResources, this); // set auto update

		balog('BaronBarLoU: end');
	}

	function BRB_updateCastleCount(){
		balog('BRB_updateCastleCount: start');

		var BRB_castles = bbPlayer.getNumCastles();
		if (BRB_castles!='undefined') {
			bbCastleValue.setValue(BRB_castles.toString());
//			bbCastleValue.setValue("42");
		}
		
		balog('BRB_updateCastleCount: end');
	}

	function BRB_updateCurBarons() {
		balog('BRB_updateCurBarons: start');

		var BRB_TotalBarons = bbPlayer.getBarons();
		var BRB_IdleBarons = bbPlayer.getBaronsIdle();
		var BRB_QueuedBarons = bbPlayer.getBaronsQueue();
		var BRB_AvailableBarons = bbTech.getBonus("baronCount", webfrontend.data.Tech.research) - ((bbPlayer.getNumCities() - 1) + BRB_IdleBarons + BRB_QueuedBarons);
		bbBaronValue.setValue(BRB_TotalBarons + " / " + BRB_IdleBarons + " / " + BRB_QueuedBarons + " / " + BRB_AvailableBarons);
//		bbBaronValue.setValue("100/100/20/100");
		
		balog('BRB_updateCurBarons: end');
	}

	function BRB_updatePurifiedResources() {
		balog('BRB_updatePurifiedResources: start');

		var BRB_puri = bbPlayer.getVoidResources();
		if (BRB_puri) {
			bbPurifiedResourcesValue.setValue(BRB_puri[3][1] + " / " + BRB_puri[2][1] + " / " + BRB_puri[1][1] + " / " + BRB_puri[0][1]);
//			bbPurifiedResourcesLabel.setValue("100/100/20/100");
		}

		balog('BRB_updatePurifiedResources: start');
	}
	
	balog(BRB_version + ' running');
	
	function BRB_checkIfLoaded() {
		clearTimeout(BRB_timeout);
		try {
			balog('checking');
			if(typeof qx != "undefined" && typeof webfrontend != "undefined"){
				oApp = qx.core.Init.getApplication(); // application
				oPlayer = webfrontend.data.Player.getInstance(); // player data
				if (oApp && oPlayer) {
					if(oApp.title){
						bbPlayerBar = oApp.title; // top player info bar
						bbPlayer = oPlayer;						
						oTech = webfrontend.data.Tech.getInstance();
						bbTech=oTech;
						if (oTech && oTech.getBonus("baronCount", webfrontend.data.Tech.research) > 0) {
							balog('starting');
							setTimeout(function(){BRB_BaronBarLoU();}, 1000);
							balog(BRB_version + ' startup finished');
						}else{
							balog('almost there');
							balog(oApp);
							balog(oPlayer);
							BRB_timeout = setTimeout(function(){BRB_checkIfLoaded();}, 1000);
						}
					}else{
						balog('almost ready');
						balog(oApp);
						balog(oPlayer);
						BRB_timeout = setTimeout(function(){BRB_checkIfLoaded();}, 1000);
					}
				}else{
					balog('not ready yet');
					balog(oApp);
					balog(oPlayer);
					BRB_timeout = setTimeout(function(){BRB_checkIfLoaded();}, 1000);
				}
			}else{
				balog('no objects');
				BRB_timeout = setTimeout(function(){BRB_checkIfLoaded();}, 1000);
			}
		}catch(e){
			balog('failed try/catch');
			balog(e);
		}
	}
	if(/lordofultima\.com/i.test(document.domain)){
		BRB_timeout = setTimeout(function(){BRB_checkIfLoaded();}, 1000);
		balog('starting check');
	}
	
};//
// end: BRB_mainFunction
	
var BRB_helperFunction = function() {//
	
};//
// end: BRB_helperFunction


	bblog('galeg begin');
	// injecting, because there seem to be problems when creating with unsafeWindow
/*	var BaronBarScript = document.createElement("script");
		BaronBarScript.innerHTML = BRB_helperFunction.toString().substring(15,(BRB_helperFunction.toString().length)-1);
		BaronBarScript.type = "text/javascript";
*/	var BaronBarScript = document.createElement("script");
		BaronBarScript.innerHTML = BRB_mainFunction.toString().substring(15,(BRB_mainFunction.toString().length)-1);
		BaronBarScript.type = "text/javascript";
	if(/lordofultima\.com/i.test(document.domain)){
//		gulog('galeg injecting helpers');
//		document.getElementsByTagName("body")[0].appendChild(BaronBarHelperScript);
		bblog('galeg injecting main');
		document.getElementsByTagName("body")[0].appendChild(BaronBarScript);
		bblog('galeg injected');
	}
	bblog('galeg finish');
})();