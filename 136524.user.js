// ==UserScript==
// @name           TA Combat Sim
// @description    
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.1.6.0
// @author         WildKatana
// ==/UserScript==

(function(){
  var TASuite_mainFunction = function() {
	function initPro()
	{
	TASuite.main.prototype.degree = null;
	TASuite.main.prototype.currentDx = null;
	TASuite.main.prototype.currentDy = null;
	TASuite.main.prototype.currentUnit = null;
	TASuite.main.prototype.units = null;
	TASuite.main.prototype.units_list = null;
	TASuite.main.prototype.buttonProTools = null;
	TASuite.main.prototype.buttonOptimize = null;
	TASuite.main.prototype.degreeSelect = null;
	TASuite.main.prototype.primarySelect = null;
	TASuite.main.prototype.secondarySelect = null;
	TASuite.main.prototype.add_ArmyChanged = null;
	TASuite.main.prototype.lastPrimary = null;
	TASuite.main.prototype.lastSecondary = null;
	TASuite.main.prototype.currentPrimary = null;
	TASuite.main.prototype.currentSecondary = null;
	TASuite.main.prototype.lastPercentage = null;
	TASuite.main.prototype.lastEnemyPercentage = null;
	TASuite.main.prototype.lastDFPercentage = null;
	TASuite.main.prototype.lastCYPercentage = null;
	TASuite.main.prototype.lastInfantryPercentage = null;
	TASuite.main.prototype.lastVehiclePercentage = null;
	TASuite.main.prototype.lastAirPercentage = null;
	TASuite.main.prototype.lastEnemyUnitsPercentage = null;
	TASuite.main.prototype.lastEnemyBuildingsPercentage = null;
	TASuite.main.prototype.totalSeconds = null;
	TASuite.main.prototype.lastVictory = null;
	TASuite.main.prototype.saved_units = null;
	TASuite.main.prototype.optimizing = null;
	TASuite.main.prototype.ajaxImage = null;
	TASuite.main.prototype.enemyTroopStrengthLabel = null;
	TASuite.main.prototype.enemyBuildingsStrengthLabel = null;
	TASuite.main.prototype.enemyUnitsStrengthLabel = null;
	TASuite.main.prototype.airTroopStrengthLabel = null;
	TASuite.main.prototype.infantryTroopStrengthLabel = null;
	TASuite.main.prototype.vehicleTroopStrengthLabel = null;
	TASuite.main.prototype.CYTroopStrengthLabel = null;
	TASuite.main.prototype.DFTroopStrengthLabel = null;
	TASuite.main.prototype.simTroopDamageLabel = null;
	TASuite.main.prototype.simVictoryLabel = null;
	TASuite.main.prototype.simTimeLabel = null;
	TASuite.main.prototype.initializePro = function () {
	_this = this;
	this.add_ArmyChanged = (new System.EventHandler).$ctor(this, this.onUnitMoved);
	this.buttonOptimize = new qx.ui.form.Button("Optimize");
	this.buttonOptimize.set({
		width : 80,
		appearance : "button-text-small",
		toolTipText : "Attempt to optimize your setup"
	});
	this.buttonOptimize.addListener("click", this.optimizeLayout, this);
	this.ajaxImage = new qx.ui.basic.Image("https://dl.dropbox.com/u/41023713/loading.gif");
	this.ajaxImage.setVisibility("none");
	this.ajaxImage.setThemedAlignX("center");
	this.battleResultsBox = new qx.ui.window.Window("Battle Simulator Pro");
	this.battleResultsBox.setPadding(10);
	this.battleResultsBox.setLayout(new qx.ui.layout.VBox(10));
	this.battleResultsBox.setShowMaximize(false);
	this.battleResultsBox.setShowMinimize(false);
	this.battleResultsBox.moveTo(115, 200);
	this.battleResultsBox.setHeight(400);
	this.battleResultsBox.setWidth(200);
	this.battleResultsBox.getApplicationRoot().set({
		blockerColor : "#000000",
		blockerOpacity : 0.6
	});
	var _0xeac6x1 = new qx.ui.container.Composite();
	_0xeac6x1.setLayout(new qx.ui.layout.VBox(5));
	_0xeac6x1.setThemedFont("bold");
	_0xeac6x1.setThemedPadding(2);
	_0xeac6x1.setThemedBackgroundColor("#eef");
	this.battleResultsBox.add(_0xeac6x1);
	var _0xeac6x2 = new qx.ui.basic.Label().set({
			value : "<a target='_blank' href='http://www.youtube.com/watch?v=TcgryVL9jnk'>Tutorial</a> | <a target='_blank' href='http://www.moneyscripts.net/ta/faq'>FAQ</a> | <a target='_blank' href='http://userscripts.org/scripts/discuss/130344'>Forums</a>",
			rich : true
		});
	_0xeac6x1.add(_0xeac6x2);
	var _0xeac6x3 = new qx.ui.container.Composite();
	_0xeac6x3.setLayout(new qx.ui.layout.VBox(5));
	_0xeac6x3.setThemedFont("bold");
	_0xeac6x3.setThemedPadding(2);
	_0xeac6x3.setThemedBackgroundColor("#eef");
	this.battleResultsBox.add(_0xeac6x3);
	var _0xeac6x4 = new qx.ui.container.Composite();
	_0xeac6x4.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6x4.add(new qx.ui.basic.Label("Enemy Strength: "));
	this.enemyTroopStrengthLabel = new qx.ui.basic.Label("100%");
	_0xeac6x4.add(this.enemyTroopStrengthLabel);
	this.enemyTroopStrengthLabel.setTextColor("red");
	_0xeac6x3.add(_0xeac6x4);
	var _0xeac6x5 = new qx.ui.container.Composite();
	_0xeac6x5.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6x5.add(new qx.ui.basic.Label("Units: "));
	this.enemyUnitsStrengthLabel = new qx.ui.basic.Label("100%");
	_0xeac6x5.add(this.enemyUnitsStrengthLabel);
	this.enemyUnitsStrengthLabel.setTextColor("green");
	_0xeac6x3.add(_0xeac6x5);
	var _0xeac6x6 = new qx.ui.container.Composite();
	_0xeac6x6.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6x6.add(new qx.ui.basic.Label("Buildings: "));
	this.enemyBuildingsStrengthLabel = new qx.ui.basic.Label("100%");
	_0xeac6x6.add(this.enemyBuildingsStrengthLabel);
	this.enemyBuildingsStrengthLabel.setTextColor("green");
	_0xeac6x3.add(_0xeac6x6);
	var _0xeac6x7 = new qx.ui.container.Composite();
	_0xeac6x7.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6x7.add(new qx.ui.basic.Label("Construction Yard: "));
	this.CYTroopStrengthLabel = new qx.ui.basic.Label("100%");
	_0xeac6x7.add(this.CYTroopStrengthLabel);
	this.CYTroopStrengthLabel.setTextColor("red");
	_0xeac6x3.add(_0xeac6x7);
	var _0xeac6x8 = new qx.ui.container.Composite();
	_0xeac6x8.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6x8.add(new qx.ui.basic.Label("Defense Facility: "));
	this.DFTroopStrengthLabel = new qx.ui.basic.Label("100%");
	_0xeac6x8.add(this.DFTroopStrengthLabel);
	this.DFTroopStrengthLabel.setTextColor("red");
	_0xeac6x3.add(_0xeac6x8);
	var _0xeac6x9 = new qx.ui.container.Composite();
	_0xeac6x9.setLayout(new qx.ui.layout.VBox(5));
	_0xeac6x9.setThemedFont("bold");
	_0xeac6x9.setThemedPadding(2);
	_0xeac6x9.setThemedBackgroundColor("#eef");
	this.battleResultsBox.add(_0xeac6x9);
	var _0xeac6xa = new qx.ui.container.Composite();
	_0xeac6xa.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6xa.add(new qx.ui.basic.Label("Troop Strength: "));
	this.simTroopDamageLabel = new qx.ui.basic.Label("100%");
	_0xeac6xa.add(this.simTroopDamageLabel);
	this.simTroopDamageLabel.setTextColor("blue");
	_0xeac6x9.add(_0xeac6xa);
	var _0xeac6xb = new qx.ui.container.Composite();
	_0xeac6xb.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6xb.add(new qx.ui.basic.Label("Infantry: "));
	this.infantryTroopStrengthLabel = new qx.ui.basic.Label("100%");
	_0xeac6xb.add(this.infantryTroopStrengthLabel);
	this.infantryTroopStrengthLabel.setTextColor("green");
	_0xeac6x9.add(_0xeac6xb);
	var _0xeac6xc = new qx.ui.container.Composite();
	_0xeac6xc.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6xc.add(new qx.ui.basic.Label("Vehicle: "));
	this.vehicleTroopStrengthLabel = new qx.ui.basic.Label("100%");
	_0xeac6xc.add(this.vehicleTroopStrengthLabel);
	this.vehicleTroopStrengthLabel.setTextColor("green");
	_0xeac6x9.add(_0xeac6xc);
	var _0xeac6xd = new qx.ui.container.Composite();
	_0xeac6xd.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6xd.add(new qx.ui.basic.Label("Air: "));
	this.airTroopStrengthLabel = new qx.ui.basic.Label("100%");
	_0xeac6xd.add(this.airTroopStrengthLabel);
	this.airTroopStrengthLabel.setTextColor("green");
	_0xeac6x9.add(_0xeac6xd);
	var _0xeac6xe = new qx.ui.container.Composite();
	_0xeac6xe.setLayout(new qx.ui.layout.VBox(5));
	_0xeac6xe.setThemedFont("bold");
	_0xeac6xe.setThemedPadding(2);
	_0xeac6xe.setThemedBackgroundColor("#eef");
	var _0xeac6xf = new qx.ui.container.Composite();
	_0xeac6xf.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6xf.add(new qx.ui.basic.Label("Victory: "));
	this.simVictoryLabel = new qx.ui.basic.Label("Yes");
	_0xeac6xf.add(this.simVictoryLabel);
	this.simVictoryLabel.setTextColor("green");
	_0xeac6xe.add(_0xeac6xf);
	var _0xeac6x10 = new qx.ui.container.Composite();
	_0xeac6x10.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6x10.add(new qx.ui.basic.Label("Battle Time: "));
	this.simTimeLabel = new qx.ui.basic.Label("120");
	_0xeac6x10.add(this.simTimeLabel);
	this.simTimeLabel.setTextColor("black");
	_0xeac6xe.add(_0xeac6x10);
	this.battleResultsBox.add(_0xeac6xe);
	var _0xeac6x11 = new qx.ui.container.Composite();
	_0xeac6x11.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6x11.add(new qx.ui.basic.Label("Mode: "));
	this.degreeSelect = new qx.ui.form.SelectBox();
	this.degreeSelect.add(new qx.ui.form.ListItem("Quick", null, "1"));
	var _0xeac6x12 = new qx.ui.form.ListItem("Average", null, "2");
	this.degreeSelect.add(_0xeac6x12);
	this.degreeSelect.add(new qx.ui.form.ListItem("Thorough", null, "4"));
	this.degreeSelect.add(new qx.ui.form.ListItem("Exhaustive", null, "8"));
	this.degreeSelect.setSelection([_0xeac6x12]);
	_0xeac6x11.add(this.degreeSelect);
	_0xeac6xe.add(_0xeac6x11);
	var _0xeac6x13 = new qx.ui.container.Composite();
	_0xeac6x13.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6x13.add(new qx.ui.basic.Label("1st: "));
	this.primarySelect = new qx.ui.form.SelectBox();
	var _0xeac6x14 = new qx.ui.form.ListItem("C. Yard", null, "CY");
	this.primarySelect.add(_0xeac6x14);
	this.primarySelect.add(new qx.ui.form.ListItem("Troop Strength", null, "TS"));
	this.primarySelect.add(new qx.ui.form.ListItem("Defense Facility", null, "DF"));
	this.primarySelect.add(new qx.ui.form.ListItem("Enemy Troops", null, "ES"));
	this.primarySelect.setSelection([_0xeac6x14]);
	_0xeac6x13.add(this.primarySelect);
	_0xeac6xe.add(_0xeac6x13);
	var _0xeac6x15 = new qx.ui.container.Composite();
	_0xeac6x15.setLayout(new qx.ui.layout.HBox(5));
	_0xeac6x15.add(new qx.ui.basic.Label("2nd: "));
	this.secondarySelect = new qx.ui.form.SelectBox();
	this.secondarySelect.add(new qx.ui.form.ListItem("C. Yard", null, "CY"));
	var _0xeac6x16 = new qx.ui.form.ListItem("Troop Strength", null, "TS");
	this.secondarySelect.add(_0xeac6x16);
	this.secondarySelect.add(new qx.ui.form.ListItem("Defense Facility", null, "DF"));
	this.secondarySelect.add(new qx.ui.form.ListItem("Enemy Troops", null, "ES"));
	this.secondarySelect.setSelection([_0xeac6x16]);
	_0xeac6x15.add(this.secondarySelect);
	_0xeac6xe.add(_0xeac6x15);
	_0xeac6xe.add(this.ajaxImage);
	this.battleResultsBox.add(this.buttonOptimize);
	var _0xeac6x17 = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	this.buttonProTools = new qx.ui.form.Button("Pro");
	this.buttonProTools.set({
		width : 50,
		appearance : "button-text-small",
		toolTipText : "Open Pro Simulator Tools"
	});
	this.buttonProTools.addListener("click", this.togglePro, this);
	_0xeac6x17.add(this.buttonProTools, {
		top : 17,
		right : 7
	});
	localStorage.setItem("tasim_pro", true);
	try {
		_0xeac6x17.remove(this.buttonGetProTools);
	} catch (e) {};
};
TASuite.main.prototype.getCityPreArmyUnits = function () {
	var _0xeac6x17 = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
	var _0xeac6x18 = null;
	for (var _0xeac6x19 in _0xeac6x17) {
		try {
			if (_0xeac6x17[_0xeac6x19]instanceof ClientLib.Data.CityPreArmyUnits) {
				_0xeac6x18 = _0xeac6x17[_0xeac6x19];
				break;
			};
		} catch (e) {};
	};
	return _0xeac6x18;
};
TASuite.main.prototype.closeProBox = function () {
	try {
		var _0xeac6x18 = this.getCityPreArmyUnits();
		_0xeac6x18.remove_ArmyChanged(this.add_ArmyChanged);
		this.battleResultsBox.close();
	} catch (e) {
		console.log(e);
	};
};
TASuite.main.prototype.togglePro = function () {
	var _0xeac6x18 = this.getCityPreArmyUnits();
	this.units = _0xeac6x18.m_ArmyUnits.l;
	if (this.battleResultsBox.isVisible()) {
		this.closeProBox();
	} else {
		try {
			_0xeac6x18.add_ArmyChanged(this.add_ArmyChanged);
		} catch (e) {
			console.log(e);
		};
		this.updateProWindow();
		this.battleResultsBox.moveTo(115, 200);
		this.battleResultsBox.setHeight(400);
		this.battleResultsBox.setWidth(200);
		this.battleResultsBox.open();
	};
};
TASuite.main.prototype.optimizeLayout = function () {
	try {
		var _0xeac6x18 = this.getCityPreArmyUnits();
		if (this.battleResultsBox.isModal()) {
			this.optimizingDone();
			this.updateFormation();
		} else {
			this.battleResultsBox.setModal(true);
			this.battleResultsBox.setAllowClose(false);
			this.buttonOptimize.setLabel("Cancel");
			this.ajaxImage.setVisibility("visible");
			this.optimizing = true;
			this.updateProWindow();
			this.setTargets();
			this.degree = parseInt(this.degreeSelect.getSelection()[0].getModel());
			this.checkBetterFormation();
		};
	} catch (e) {
		console.log(e);
	};
};
TASuite.main.prototype.optimizingDone = function () {
	this.buttonOptimize.setLabel("Optimize");
	this.battleResultsBox.setAllowClose(true);
	this.battleResultsBox.setModal(false);
	this.optimizing = false;
	this.ajaxImage.setVisibility("none");
};
TASuite.main.prototype.updateFormation = function () {
	var _0xeac6x18 = this.getCityPreArmyUnits();
	this.restoreFormation(_0xeac6x18.m_ArmyUnits.l);
	_0xeac6x18.UpdateArmyLayout$0();
	_0xeac6x18.RefreshData$0();
};
TASuite.main.prototype.checkBetterFormation = function () {
	this.saveFormation();
	var _0xeac6x1a = [];
	for (var _0xeac6x1b = 0; _0xeac6x1b < this.units.length; _0xeac6x1b++) {
		_0xeac6x1a.push(_0xeac6x1b);
	};
	var _0xeac6x1c,
	_0xeac6x1d,
	_0xeac6x1e = _0xeac6x1a.length;
	if (_0xeac6x1e) {
		while (--_0xeac6x1e) {
			_0xeac6x1d = Math.floor(Math.random() * (_0xeac6x1e + 1));
			_0xeac6x1c = _0xeac6x1a[_0xeac6x1d];
			_0xeac6x1a[_0xeac6x1d] = _0xeac6x1a[_0xeac6x1e];
			_0xeac6x1a[_0xeac6x1e] = _0xeac6x1c;
		};
	};
	this.units_list = _0xeac6x1a;
	this.currentUnit = this.units[this.units_list.pop()];
	this.currentDx = this.degree;
	this.currentDy = this.degree;
	setTimeout(this.moveLoop, 1000);
	return false;
};
TASuite.main.prototype.moveLoop = function () {
	ta = window.TASuite.main.getInstance();
	if (!ta.optimizing) {
		return;
	};
	var _0xeac6x1f = ta.currentUnit;
	var _0xeac6x20 = _0xeac6x1f.get_CoordX();
	var _0xeac6x21 = _0xeac6x1f.get_CoordY();
	var _0xeac6x22 = ta.degree;
	var _0xeac6x23 = ta.currentDx;
	var _0xeac6x24 = ta.currentDy;
	_0xeac6x23 -= 1;
	new_x = _0xeac6x23 + _0xeac6x20;
	new_y = _0xeac6x24 + _0xeac6x21;
	if (_0xeac6x24 == 0 && _0xeac6x23 == 0) {
		_0xeac6x23 -= 1;
	} else {
		if (new_x >= 0 && new_x < 8) {
			if (new_y >= 0 && new_y < 4) {
				_0xeac6x1f.MoveBattleUnit(new_x, new_y);
				if (ta.checkNewResults()) {
					ta.updateFormation();
					ta.nextUnit();
					return;
				} else {
					_0xeac6x1f.MoveBattleUnit(_0xeac6x20, _0xeac6x21);
				};
			};
		};
	};
	if (_0xeac6x23 < -_0xeac6x22 || _0xeac6x23 < 0) {
		_0xeac6x23 = _0xeac6x22;
		_0xeac6x24 -= 1;
		if (_0xeac6x24 < -_0xeac6x22 || _0xeac6x24 < 0) {
			ta.nextUnit();
			return;
		};
	};
	ta.currentDx = _0xeac6x23;
	ta.currentDy = _0xeac6x24;
	setTimeout(ta.moveLoop, 10);
};
TASuite.main.prototype.nextUnit = function () {
	if (this.units_list.length > 0) {
		this.currentDx = this.degree;
		this.currentDy = this.degree;
		this.currentUnit = this.units[this.units_list.pop()];
		setTimeout(this.moveLoop, 10);
	} else {
		this.degree -= 1;
		if (this.degree > 0) {
			this.checkBetterFormation();
		} else {
			this.optimizingDone();
			this.updateFormation();
		};
	};
};
TASuite.main.prototype.setTargets = function () {
	var _0xeac6x25 = this.primarySelect.getSelection()[0].getModel();
	var _0xeac6x26 = this.secondarySelect.getSelection()[0].getModel();
	this.lastPrimary = this.getTarget(_0xeac6x25);
	this.lastSecondary = this.getTarget(_0xeac6x26);
	this.currentPrimary = this.lastPrimary;
	this.currentSecondary = this.lastSecondary;
};
TASuite.main.prototype.getTarget = function (_0xeac6x19) {
	switch (_0xeac6x19) {
	case "DF":
		return this.lastDFPercentage; ;
	case "CY":
		return this.lastCYPercentage; ;
	case "TS":
		return this.lastPercentage; ;
	case "ES":
		return this.lastEnemyPercentage; ;
	};
};
TASuite.main.prototype.compareTargets = function () {
	var _0xeac6x27 = 1;
	var _0xeac6x28 = 1;
	var _0xeac6x25 = this.primarySelect.getSelection()[0].getModel();
	var _0xeac6x26 = this.secondarySelect.getSelection()[0].getModel();
	switch (_0xeac6x25) {
	case "ES": ;
	case "DF": ;
	case "CY":
		_0xeac6x27 = -1;
		break; ;
	};
	switch (_0xeac6x26) {
	case "ES": ;
	case "DF": ;
	case "CY":
		_0xeac6x28 = -1;
		break; ;
	};
	this.lastPrimary = this.getTarget(_0xeac6x25);
	this.lastSecondary = this.getTarget(_0xeac6x26);
	if ((this.lastPrimary * _0xeac6x27) > (this.currentPrimary * _0xeac6x27)) {
		return true;
	} else {
		if ((this.lastPrimary * _0xeac6x27) == (this.currentPrimary * _0xeac6x27)) {
			if ((this.lastSecondary * _0xeac6x28) > (this.currentSecondary * _0xeac6x28)) {
				return true;
			} else {
				return false;
			};
		};
		return false;
	};
};
TASuite.main.prototype.checkNewResults = function () {
	this.calculateSimResults();
	if (this.compareTargets()) {
		this.saveFormation();
		this.setTargets();
		this.updateProWindow();
		return true;
	};
	return false;
};
TASuite.main.prototype.restoreFormation = function (_0xeac6x18) {
	for (var _0xeac6x1b = 0; (_0xeac6x1b < _0xeac6x18.length); _0xeac6x1b++) {
		var _0xeac6x29 = this.saved_units[_0xeac6x1b];
		_0xeac6x18[_0xeac6x1b].m_CoordX = _0xeac6x29.x;
		_0xeac6x18[_0xeac6x1b].m_CoordY = _0xeac6x29.y;
		_0xeac6x18[_0xeac6x1b].m_UnitId = _0xeac6x29.id;
	};
};
TASuite.main.prototype.saveFormation = function () {
	this.saved_units = [];
	for (var _0xeac6x1b = 0; (_0xeac6x1b < this.units.length); _0xeac6x1b++) {
		var _0xeac6x1f = this.units[_0xeac6x1b];
		var _0xeac6x2a = {};
		_0xeac6x2a.x = _0xeac6x1f.m_CoordX;
		_0xeac6x2a.y = _0xeac6x1f.m_CoordY;
		_0xeac6x2a.id = _0xeac6x1f.m_UnitId;
		this.saved_units.push(_0xeac6x2a);
	};
};
TASuite.main.prototype.calculateTroopStrengths = function (_0xeac6x2b) {
	var _0xeac6x2c = 0;
	var _0xeac6x2d = 0;
	var _0xeac6x2e = 0;
	var _0xeac6x2f = 0;
	var _0xeac6x30 = 0;
	var _0xeac6x31 = 0;
	var _0xeac6x32 = 0;
	var _0xeac6x33 = 0;
	var _0xeac6x34 = 0;
	var _0xeac6x35 = 0;
	var _0xeac6x36 = 0;
	var _0xeac6x37 = 0;
	var _0xeac6x38 = 0;
	var _0xeac6x39 = 0;
	this.lastDFPercentage = 0;
	this.lastCYPercentage = 0;
	var _0xeac6x3a = _0xeac6x2b.m_Entities.d;
	var _0xeac6x3b = SharedLib.Combat.ECbtAlignment.Attacker;
	for (var _0xeac6x1b in _0xeac6x3a) {
		var _0xeac6x3c = _0xeac6x3a[_0xeac6x1b];
		var _0xeac6x3d = _0xeac6x3c.get_Entity$0();
		if (_0xeac6x3d.m_eAlignment == _0xeac6x3b) {
			_0xeac6x2c += _0xeac6x3d.m_iHitpoints;
			_0xeac6x2d += _0xeac6x3d.m_iHitpointsCurrent;
			if (_0xeac6x3c.m_UnitType.AirUnit) {
				_0xeac6x38 += _0xeac6x3d.m_iHitpoints;
				_0xeac6x39 += _0xeac6x3d.m_iHitpointsCurrent;
			} else {
				if (_0xeac6x3c.m_UnitType.MovementType == 1) {
					_0xeac6x34 += _0xeac6x3d.m_iHitpoints;
					_0xeac6x35 += _0xeac6x3d.m_iHitpointsCurrent;
				} else {
					_0xeac6x36 += _0xeac6x3d.m_iHitpoints;
					_0xeac6x37 += _0xeac6x3d.m_iHitpointsCurrent;
				};
			};
		} else {
			_0xeac6x2e += _0xeac6x3d.m_iHitpoints;
			_0xeac6x2f += _0xeac6x3d.m_iHitpointsCurrent;
			if (_0xeac6x3c.m_Type == 1) {
				_0xeac6x30 += _0xeac6x3d.m_iHitpoints;
				_0xeac6x31 += _0xeac6x3d.m_iHitpointsCurrent;
				if (_0xeac6x3d.m_MDCTypeId == 195) {
					this.lastDFPercentage = (_0xeac6x3d.m_iHitpointsCurrent / _0xeac6x3d.m_iHitpoints) * 100;
				};
				if (_0xeac6x3d.m_MDCTypeId == 177) {
					this.lastCYPercentage = (_0xeac6x3d.m_iHitpointsCurrent / _0xeac6x3d.m_iHitpoints) * 100;
				};
			} else {
				_0xeac6x32 += _0xeac6x3d.m_iHitpoints;
				_0xeac6x33 += _0xeac6x3d.m_iHitpointsCurrent;
			};
		};
	};
	this.lastInfantryPercentage = (_0xeac6x35 / _0xeac6x34) * 100;
	this.lastVehiclePercentage = (_0xeac6x37 / _0xeac6x36) * 100;
	this.lastAirPercentage = (_0xeac6x39 / _0xeac6x38) * 100;
	this.totalSeconds = (_0xeac6x2b.m_Simulation.m_iCombatStep * _0xeac6x2b.m_TimePerStep) / 1000;
	this.lastEnemyUnitsPercentage = (_0xeac6x33 / _0xeac6x32) * 100;
	this.lastEnemyBuildingsPercentage = (_0xeac6x31 / _0xeac6x30) * 100;
	this.lastEnemyPercentage = (_0xeac6x2f / _0xeac6x2e) * 100;
	this.lastPercentage = (_0xeac6x2d / _0xeac6x2c) * 100;
};
TASuite.main.prototype.onViewChange = function (oldMode, newMode) {
	window.TASuite.main.getInstance().closeProBox();
};
TASuite.main.prototype.onUnitMoved = function (sender, e) {
	if (!this.optimizing) {
		window.TASuite.main.getInstance().updateProWindow();
	};
};
TASuite.main.prototype.onDamageDone = function (sender, e) {
	try {
		battleground = sender.DamageDone.i[0].o;
		if (battleground.m_CurrentStep % 10 == 0) {
			window.TASuite.main.getInstance().updateTroopStrength(battleground);
		};
	} catch (e) {
		console.log(e);
	};
};
TASuite.main.prototype.onDefenseDestroyed = function (sender, e) {
	try {
		battleground = sender.DamageDone.i[0].o;
		window.TASuite.main.getInstance().updateTroopStrength(battleground);
	} catch (e) {
		console.log(e);
	};
};
TASuite.main.prototype.calculateSimResults = function () {
	var _0xeac6x2b = this.setupBattleground(this.getCityPreArmyUnits());
	while (_0xeac6x2b.m_Simulation.DoStep$0()) {};
	this.calculateTroopStrengths(_0xeac6x2b);
	this.lastVictory = _0xeac6x2b.m_Simulation.m_bDestroyDefense;
};
TASuite.main.prototype.updateProWindow = function () {
	this.calculateSimResults();
	if (this.lastVictory) {
		this.simVictoryLabel.setValue("Yes");
		this.simVictoryLabel.setTextColor("green");
	} else {
		this.simVictoryLabel.setValue("No");
		this.simVictoryLabel.setTextColor("red");
	};
	this.enemyUnitsStrengthLabel.setValue(this.lastEnemyUnitsPercentage.toFixed(2).toString());
	this.enemyBuildingsStrengthLabel.setValue(this.lastEnemyBuildingsPercentage.toFixed(2).toString());
	this.enemyTroopStrengthLabel.setValue(this.lastEnemyPercentage.toFixed(2).toString());
	this.airTroopStrengthLabel.setValue(this.lastAirPercentage.toFixed(2).toString());
	this.infantryTroopStrengthLabel.setValue(this.lastInfantryPercentage.toFixed(2).toString());
	this.vehicleTroopStrengthLabel.setValue(this.lastVehiclePercentage.toFixed(2).toString());
	this.CYTroopStrengthLabel.setValue(this.lastCYPercentage.toFixed(2).toString());
	this.DFTroopStrengthLabel.setValue(this.lastDFPercentage.toFixed(2).toString());
	this.simTimeLabel.setValue(this.totalSeconds.toFixed(2).toString());
	this.simTroopDamageLabel.setValue(this.lastPercentage.toFixed(2).toString());
};
TASuite.main.getInstance().battleResultsBox.close();
TASuite.main.getInstance().initializePro();

	}
    function createTweak() {
      var TASuite = {};
      qx.Class.define("TASuite.main", {
        type: "singleton",
        extend: qx.core.Object,
        members: {
          buttonSimulateCombat: null,
          buttonReturnSetup: null,
          buttonGetProTools: null,
          buttonCheckPro: null,
          troopDamageLabel: null,
          battleResultsBox: null,
          add_ViewModeChange: null,
          attacker_modules: null,
          defender_modules: null,
          initialize: function() {
          	this.add_ViewModeChange = (new ClientLib.Vis.ViewModeChange).$ctor(this, this.onViewChange);
            this.buttonSimulateCombat = new qx.ui.form.Button("Simulate");
            this.buttonSimulateCombat.set({width: 80, appearance: "button-text-small", toolTipText: "Start Combat Simulation"});
            this.buttonSimulateCombat.addListener("click", this.startSimulation, this);
            
            this.buttonGetProTools = new qx.ui.form.Button("Pro?");
            this.buttonGetProTools.set({width: 50, appearance: "button-text-small", toolTipText: "Get Pro Simulator Tools"});
            this.buttonGetProTools.addListener("click", this.toggleGetPro, this);
            
            this.buttonReturnSetup = new qx.ui.form.Button("Setup");
            this.buttonReturnSetup.set({width: 80, appearance: "button-text-small", toolTipText: "Return to Combat Setup"});
            this.buttonReturnSetup.addListener("click", this.returnSetup, this);
            
            // The Battle Simulator Pro box
            this.battleResultsBox = new qx.ui.window.Window("Battle Simulator Pro");
            this.battleResultsBox.setPadding(10);
					  this.battleResultsBox.setLayout(new qx.ui.layout.VBox(10));
					  this.battleResultsBox.setShowMaximize(false);
					  this.battleResultsBox.setShowMinimize(false);
					  this.battleResultsBox.moveTo(115, 200);
					  this.battleResultsBox.setHeight(400);
					  this.battleResultsBox.setWidth(200);
					  this.battleResultsBox.getApplicationRoot().set({
						  blockerColor: '#000000',
						  blockerOpacity: 0.6
						});
						
						// The Help Vertical Box
					  var pVBox = new qx.ui.container.Composite()
					  pVBox.setLayout(new qx.ui.layout.VBox(5));
					  pVBox.setThemedFont("bold");
						pVBox.setThemedPadding(2);
						pVBox.setThemedBackgroundColor("#eef");
						this.battleResultsBox.add(pVBox);
						var proHelpBar = new qx.ui.basic.Label().set({
					    value: "<a target='_blank' href='http://www.youtube.com/watch?v=TcgryVL9jnk'>Pro</a> | <a target='_blank' href='http://www.moneyscripts.net/ta/faq'>FAQ</a> | <a target='_blank' href='http://userscripts.org/scripts/discuss/130344'>Forums</a>",
					    rich : true
					  });
					  pVBox.add(proHelpBar);
					  
					  _this = this;
					  setTimeout(function() {
					  	try {
						  	// Get the active modules
								// Doing this the hard and unreliable way for now, until we figure out a better way
								
								_this.attacker_modules = {};
								var g = ClientLib.Res.ResMain.GetInstance$10();
								var player = ClientLib.Data.MainData.GetInstance$9().get_Player$2();
								_this.attacker_modules.l = [];
								for (var i in g.m_Gamedata.units) {
									var ug = g.GetUnit$0(i);
									var research = player.m_PlayerResearch.GetResearchItemFomMdbId(ug.tl);
									var modules = ug.m;
									for (var j in modules) {
									  var module = modules[j];
									  if (module.t == 1) {
									    _this.attacker_modules.l.push(module.i);
									  }
									  if (research && module.t == 3 && research.m_Level == 2) {
									    _this.attacker_modules.l.push(module.i);
									  }
									}
								}
								
								_this.defender_modules = _this.attacker_modules;
							}
							catch(e) {
								console.log(e);
							}
					  	
					  	ClientLib.Vis.VisMain.GetInstance().add_ViewModeChange(_this.add_ViewModeChange);
					  	var pid = ClientLib.Data.MainData.GetInstance().m_Player.name;
					  	// Add a refresh button for the user to manually check for pro. Should only need to do it one time at max
					  	_this.buttonCheckPro = new qx.ui.form.Button("Refresh Pro");
						  _this.buttonCheckPro.set({appearance: "button-text-small", toolTipText: "Try to load pro."});
						  _this.buttonCheckPro.addListener("click", function() {
						  	_this.buttonCheckPro.setLabel("Checking...");
						  	_this.buttonCheckPro.setEnabled(false);
						  	var head = document.getElementsByTagName('head')[0];
							  var script = document.createElement('script');
							  script.type = 'text/javascript';
							  script.src = 'https://www.moneyscripts.net/ta/ta/pb3/' + pid.toString() + "/" + new Date().getTime().toString();
							  head.appendChild(script);
						  }, _this);
						  //_this.battleResultsBox.add(_this.buttonCheckPro);
					  	
					  	var proDonateText = new qx.ui.basic.Label().set({
						    value: "Battle Simulator Pro is only available to supporters of the project. To become a supporter, simply donate $1 or more by clicking the button below. If the donation is for less than $1, it won't qualify for the pro access. To see what the Pro version adds, take a look at this short video: <a style='color: #efefef;' target='_blank' href='http://www.youtube.com/watch?v=TcgryVL9jnk'>Pro Video</a>. You will be given access to Pro immediately after the donation is received, usually within a minute or two. <a style='color: #efefef;' target='_blank' href='http://www.moneyscripts.net/ta/terms'>Terms & Conditions</a>",
						    rich : true,
						    width: 180,
						    textAlign: 'justify'
						  });
						  proDonateText.setTextColor("white");
						  //_this.battleResultsBox.add(proDonateText);
						  
						  if (pid) {
							  var paypalButton = new qx.ui.basic.Label().set({
							    value: "<form action='https://www.paypal.com/cgi-bin/webscr' method='post'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='hosted_button_id' value='DB5VHSWX3CKR4'><input type='hidden' name='custom' value='" + pid.toString() +"'><input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'><img alt='' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'></form>",
							    rich : true,
							    width: 180,
							    textAlign: 'center'
							  });
								//_this.battleResultsBox.add(paypalButton);
							}
					  	
					  	// Check for the pro script if they have it for sure
					  	if (localStorage.getItem("tasim_pro") == "true") {
						  	var head = document.getElementsByTagName('head')[0];
							  var script = document.createElement('script');
							  script.type = 'text/javascript';
							  script.src = 'https://www.moneyscripts.net/ta/ta/pb3/' + pid.toString() + "/" + new Date().getTime().toString();
							  head.appendChild(script);
						  }
					  }, 5000);
					  
            var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
            armyBar.add(this.buttonSimulateCombat, {top: 130, right: 0});
            armyBar.add(this.buttonGetProTools, {top: 16, right: 7});
            
            var replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
            replayBar.add(this.buttonReturnSetup, {top: 10, right: 80});
            
            this.troopDamageLabel = new qx.ui.basic.Label().set({
					    value: "<span style='color: black; font-weight: bold;'>Troop Strength: 100%</span>",
					    rich : true
					  });
						replayBar.add(this.troopDamageLabel, { right : 100, top: 30});
            
            this.buttonUnlockAttack = new qx.ui.form.Button("Unlock");
						this.buttonUnlockAttack.set({width: 60, height: 45, appearance: "button-text-small", toolTipText: "Unlock"});
						this.buttonUnlockAttack.addListener("click", this.unlockAttacks, this);
						armyBar.add(this.buttonUnlockAttack, {top: 81, right: 0});
          },
          closeProBox: function() {
						this.battleResultsBox.close();
					},
          onViewChange: function(oldMode, newMode) {
          	try {
	          	if (newMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense) {
	            	var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
	          		if (localStorage.ta_sim_last_city != current_city) {
	          			// Reset the battleground
	          			this.bustCache();
	          		}
	          	}
	          	if (newMode == webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerDefense) {
	          		this.closeProBox();
	          	}
          	}
          	catch(e) {
          		console.log(e);
          		if (newMode == webfrontend.gui.PlayArea.modes.EMode_CombatSetupDefense) {
	            	var current_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
	          		if (localStorage.ta_sim_last_city != current_city) {
	          			// Reset the battleground
	          			this.bustCache();
	          		}
	          	}
	          	if (newMode == webfrontend.gui.PlayArea.modes.EMode_PlayerDefense) {
	          		this.closeProBox();
	          	}
          	}
          },
					unlockAttacks: function() {
						var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
						armyBar.remove(this.buttonUnlockAttack);
						var _this = this;
						setTimeout(function() { armyBar.add(_this.buttonUnlockAttack); }, 2000);
					},
          toggleGetPro: function() {
          	var armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
          	if (this.battleResultsBox.isVisible()) {
          		this.battleResultsBox.close();
          	}
          	else {
          		this.battleResultsBox.moveTo(115, 200);
						  this.battleResultsBox.setHeight(400);
						  this.battleResultsBox.setWidth(200);
          		this.battleResultsBox.open();
          	}
          },
          returnSetup: function() {
            // Set the scene again, just in case it didn't work the first time
            var app = qx.core.Init.getApplication();
            var player_cities =ClientLib.Data.MainData.GetInstance().get_Cities();
            var current_city = player_cities.get_CurrentCity();
            try {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
            }
            catch (e) {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
            }
          },
          calculateTroopStrength: function(battleground) {
          	var total_hp = 0;
            var end_hp = 0;
            
            for (i in battleground.m_Entities.d) {
            	var entity = battleground.m_Entities.d[i];
						  if (entity.get_Entity$0().m_eAlignment == SharedLib.Combat.ECbtAlignment.Attacker) {
						  	// This is one of the good guys
						  	total_hp += entity.m_Entity.m_iHitpoints;
						  	end_hp += entity.m_Entity.m_iHitpointsCurrent;
						  }
					  }
					  
					  return percentage = Math.floor((end_hp / total_hp) * 100);
          },
          updateTroopStrength: function(battleground) {
					  var percentage = this.calculateTroopStrength(battleground);
					  
					  this.troopDamageLabel.setValue("<span style='color: black; font-weight: bold;'>Troop Strength: " + percentage.toString() + "%</span>");
          },
          onDamageDone: function(sender, e) {
          	// Try to update the Troop Strength meter
						try {
	            battleground = sender.DamageDone.i[0].o;
	            // For the sake of performance, only run this every 10th step
	            if (battleground.m_CurrentStep % 10 == 0) {
		            window.TASuite.main.getInstance().updateTroopStrength(battleground);
						  }
						}
	          catch (e) {
	          	console.log(e);
	          }
          },
          onDefenseDestroyed: function(sender, e) {
          	// Try to update the Troop Strength meter
						try {
	            battleground = sender.DamageDone.i[0].o;
		          window.TASuite.main.getInstance().updateTroopStrength(battleground);
						}
	          catch (e) {
	          	console.log(e);
	          }
          },
          bustCache: function() {
          	// Bust the cache
        		try {
	            var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
        			own_city.m_CityArmyFormationsManager.m_ArmyFormations.d[own_city.m_CityArmyFormationsManager.m_CurrentTargetBaseId].CopyCityOffenseUnitsLayout$0();
        		}
        		catch(e) {
        			console.log(e);
        		}
          },
          setupBattleground: function(offense_units) {
          	var mainData = ClientLib.Data.MainData.GetInstance();
            var player_cities = mainData.get_Cities();
            var current_city = player_cities.get_CurrentCity();
            var own_city = player_cities.get_CurrentOwnCity();
            
            localStorage.ta_sim_last_city = current_city.get_Id();
            
            var alliance = ClientLib.Data.MainData.GetInstance().m_Alliance;
            var combatData = (new ClientLib.Data.Combat).$ctor$1();
            combatData.m_Version = 1;
            
            var unitData = own_city.m_CityUnits.m_OffenseUnits.l;
            var data = new Array();
            
            try {
            	console.log(offense_units);
            	offense_units = offense_units || own_city.m_CityArmyFormationsManager.m_ArmyFormations.d[current_city.get_Id()];
            	console.log(offense_units);
	            for(var i = 0; i < unitData.length; i++)  {
	              var info = new Object();
	              info.h = unitData[i].m_CurrentHealth;
	              info.i = unitData[i].m_MdbUnitId
	              info.l = unitData[i].m_CurrentLevel
	              info.x = offense_units.m_ArmyUnits.l[i].m_CoordX
	              info.y = offense_units.m_ArmyUnits.l[i].m_CoordY
	              data.push(info);
	            }
            }
            catch (e) {
            	console.log(e);
            }
            combatData.m_Attacker = data;
            
            unitData = current_city.m_CityUnits.m_DefenseUnits.l;
            data = new Array();
            for(i = 0; i < unitData.length; i++)  {
              info = new Object();
              info.h = unitData[i].m_CurrentHealth;
              info.i = unitData[i].m_MdbUnitId;
              info.l = unitData[i].m_CurrentLevel;
              info.x = unitData[i].m_Coords.m_iX;
              info.y = unitData[i].m_Coords.m_iY;
              data.push(info);
            }
            combatData.m_Defender = data;

            data = new Array();
            for (var i=0; (i < 9); i++) {
              for (var j=0; (j < 8); j++) {
                var terrainType=current_city.GetResourceType$0(i, (j + current_city.get_CityHeight$0()));
                var unitType=-1;
                switch (terrainType)
                {
                  case ClientLib.Data.ECityTerrainType.FOREST: {
                    unitType=0x7c;
                    break;
                  }
                  case ClientLib.Data.ECityTerrainType.BRIAR: {
                    unitType=0x7b;
                    break;
                  }
                  case ClientLib.Data.ECityTerrainType.SWAMP: {
                    unitType=0x7d;
                    break;
                  }
                  case ClientLib.Data.ECityTerrainType.WATER: {
                    unitType=0x7e;
                    break;
                  }
                }
                if(unitType != -1)
                {
                  info = new Object();
                  info.h = 100;
                  info.i = unitType;
                  info.l = 1;
                  info.x = i;
                  info.y = j;
                  data.push(info);
                }
              }
            } 
            combatData.m_Blocker = data;

            unitData = current_city.m_CityBuildings.m_Buildings.l;
            data = new Array();
            for(i = 0; i < unitData.length; i++)  {
              info = new Object();
              info.h = unitData[i].m_CurrentHealth;
              info.i = unitData[i].m_MdbUnitId;
              info.l = unitData[i].m_CurrentLevel;
              info.x = unitData[i].m_Coords.m_iX;
              info.y = unitData[i].m_Coords.m_iY;
              data.push(info);
            }
            combatData.m_Buildings = data;
            
            combatData.m_Supports = null;
            combatData.m_StartStep = 5902339;
            combatData.m_CombatSteps = 1;
            combatData.m_BoostInfantry = alliance.get_POIInfantryBonus();
            combatData.m_BoostVehicle = alliance.get_POIVehicleBonus();
            combatData.m_BoostAir = alliance.get_POIAirBonus();
            combatData.m_BoostDefense = current_city.m_AllianceDefenseBonus;
            combatData.m_AttackerBaseId = own_city.get_Id();
            combatData.m_AttackerBaseName = own_city.get_Name();
            combatData.m_AttackerPlayerId = own_city.get_PlayerId();
            combatData.m_AttackerPlayerName = own_city.get_OwnerName();
            combatData.m_AttackerAllianceId = own_city.get_AllianceId();
            combatData.m_AttackerAllianceName = own_city.get_OwnerAllianceName();
            combatData.m_DefenderBaseId = current_city.get_Id();
            combatData.m_DefenderBaseName = current_city.get_Name();
            combatData.m_DefenderPlayerId = own_city.get_PlayerId();
            combatData.m_DefenderPlayerName = current_city.get_OwnerName();
            combatData.m_DefenderAllianceId = current_city.get_AllianceId();
            combatData.m_DefenderAllianceName = current_city.get_OwnerAllianceName();
            combatData.m_DefenderBlockStep = 0;
            combatData.m_AttackTimeStamp = new Date().getTime();
            var resourceLayout = new Object();
            resourceLayout.l = new Array();
            for (var i=0; (i < combatData.m_Buildings.length); i++) {
              resourceLayout.l[combatData.m_Buildings[i].y] = 0;
            }
            combatData.m_ResourceLayout = resourceLayout;
            combatData.m_DefenderFaction = current_city.get_CityFaction();
            combatData.m_AttackerModules = this.attacker_modules;
            combatData.m_DefenderModules = this.defender_modules;
            
            if(((combatData.m_DefenderFaction == ClientLib.Base.EFactionType.FORFaction) || (combatData.m_DefenderFaction == ClientLib.Base.EFactionType.NPCBase)) || (combatData.m_DefenderFaction == ClientLib.Base.EFactionType.NPCCamp))
            {
	  					combatData.SetNPCNames$0();
            }
            combatData.m_MaxDuration = 120;
            combatData.m_Complete = false;
            if(combatData.m_Complete) {
	  					combatData.m_Id=-1;
            }
            combatData.m_Debug = null;
	
            var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground(); 
            battleground.Reset();
            battleground.m_CurrentReplay = combatData;
            battleground.InitBattle$0();
            battleground.SetCombatData$1(combatData);
            battleground.StartBattle$0();
            battleground.m_BattleDuration = (1200 * Math.floor(0x3e8 / battleground.m_SimSetup.get_SubSteps$0()));
                          
            return battleground;
          },
          startSimulation: function() {
          	var app = qx.core.Init.getApplication();
          	var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
          	var current_city = player_cities.get_CurrentCity();
          	
          	window.TASuite.main.getInstance().troopDamageLabel.setValue("<span style='color: black; font-weight: bold;'>Troop Strength: 100%</span>");
            
            try {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
            }
            catch (e) {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
            }
            var battleground = this.setupBattleground();
            
            // Add the event listeners
            battleground.m_Simulation.add_DamageDone$0((new System.EventHandler).$ctor(this, this.onDamageDone));
            battleground.m_Simulation.add_OnDestroyDefense$0((new System.EventHandler).$ctor(this,this.onDefenseDestroyed));
            
            // Set the scene again, just in case it didn't work the first time
            try {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
            }
            catch (e) {
            	app.getPlayArea().setView(webfrontend.gui.PlayArea.modes.EMode_CombatReplay, current_city.get_Id(), 0, 0);
            }
          }
        }
      });
    }
    
    function TASuite_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            createTweak();
            window.TASuite.main.getInstance().initialize();
			initPro();
          } else
            window.setTimeout(TASuite_checkIfLoaded, 1000);
        } else {
          window.setTimeout(TASuite_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(TASuite_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var TASuiteScript = document.createElement("script");
  var txt = TASuite_mainFunction.toString();
  TASuiteScript.innerHTML = "(" + txt + ")();";
  TASuiteScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TASuiteScript);
  }

})();