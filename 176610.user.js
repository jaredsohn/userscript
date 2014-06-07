// ==UserScript==
// @author Bassem
// @name setting_ae
// @namespace  settings for all scripts
// @include http://ae*.tribalwars.ae/*
// ==/UserScript== 

function Config() {
	this.time = new Date().getTime();
	this.url = window.location.url;
	this.host = window.location.host;

	this.urls = new Object();
	this.urls.settings = "http://" + this.host + "/interface.php";
	this.urls.forum    = "http://" + this.host + "/forum.php";
	/*
	this.urls.forum    = "http://" + this.host + "/forum.php?game.php?village=&screen=info_command";
	this.urls.forum    = "http://" + this.host + "/forum.php?game.php?village=&screen=place";
	*/
	

	this.buildings = new Object();
	this.buildings.list = new Array();
	this.units = new Object();
	this.units.list = new Array();

	this.load = function() {
		var config = this;
		$.get(this.urls.settings, {func : "get_config"}, function(data){config.processSettings(data);});
	};

	this.processValue = function(obj, xml, name) {
		obj[name] = xml.find(name).text();
	};

	this.processSettings = function(data) {
		var xml = $(data);
		this.speed = xml.find("speed").text();
		this.unit_speed = xml.find("unit_speed").text();
		this.fake_limit = xml.find("fake_limit").text();
		
		var config = this;
		$.get(this.urls.settings, {func : "get_building_info"}, function(data){config.processBuildings(data);});
	};

	this.processUnits = function(data) {
		var xml = $(data);
		this.processUnit(xml, "spear", "مقاتل الرمح");
		this.processUnit(xml, "sword", "مقاتل السيف");
		this.processUnit(xml, "axe", "مقاتل الفأس");
		this.processUnit(xml, "archer", "رماة القوس");
		this.processUnit(xml, "spy", "كشافة");
		this.processUnit(xml, "light", "فارس خفيف");
		this.processUnit(xml, "marcher", "فارس قوس");
		this.processUnit(xml, "heavy", "فارس ثقيل");
		this.processUnit(xml, "ram", "محطمة الحائط");
		this.processUnit(xml, "catapult", "مقلاع");
		this.processUnit(xml, "knight", "قائد الفرسان");
		this.processUnit(xml, "snob", "نبيل");
		this.processUnit(xml, "militia", "ميليشيا");
		
		localStorage.setItem('twConfig', JSON.stringify(this));
		this.onloaded();
	};

	this.processUnit = function(xml, id, name) {
		var data = xml.find(id);
		if (!data)
			return;

		var unit = new Object;
		this.processValue(unit, data, "wood");
		this.processValue(unit, data, "stone");
		this.processValue(unit, data, "iron");
		this.processValue(unit, data, "pop");
		this.processValue(unit, data, "speed");
		this.processValue(unit, data, "attack");
		this.processValue(unit, data, "defense");
		this.processValue(unit, data, "defense_cavalry");
		this.processValue(unit, data, "defense_archer");
		this.processValue(unit, data, "carry");
		this.processValue(unit, data, "build_time");

		if(unit.speed.length > 0) {
			this.units.list.push(unit);
			this.units[id] = unit;
			unit.id = id;
			unit.name = name;
		}
	};

	this.processBuildings = function(data) {
		var xml = $(data);
		this.processBuilding(xml, "main",     "المبنى الرئيسي", 10);
		this.processBuilding(xml, "barracks", "الثكنات", 16);
		this.processBuilding(xml, "stable",   "الاسطبل", 20);
		this.processBuilding(xml, "garage",   "الورشه", 24);
		this.processBuilding(xml, "church",   "Church", 10);
		this.processBuilding(xml, "church_f", "First Church", 10);
		this.processBuilding(xml, "snob",     "الاكاديميه", 512);
		this.processBuilding(xml, "smith",    "الحداد", 19);
		this.processBuilding(xml, "place",    "نقطة التجمع", 0);
		this.processBuilding(xml, "statue",   "تمثال الملك", 24);
		this.processBuilding(xml, "market",   "السوق", 10);
		this.processBuilding(xml, "wood",     "الخشاب", 6);
		this.processBuilding(xml, "stone",    "حفرة الطمي", 6);
		this.processBuilding(xml, "iron",     "منجم الحديد", 6);
		this.processBuilding(xml, "farm",     "المزارع", 5);
		this.processBuilding(xml, "storage",  "المخازن", 6);
		this.processBuilding(xml, "hide",     "المخابئ", 5);
		this.processBuilding(xml, "wall",     "الحائط", 8);

		var config = this;
		$.get(this.urls.settings, {func : "get_unit_info"}, function(data){config.processUnits(data);});
	};

	this.processBuilding = function(xml, id, name, basePoints) {
		var data = xml.find(id);
		if (!data)
			return;

		var building = new Object;
		this.processValue(building, data, "max_level");
		this.processValue(building, data, "min_level");
		this.processValue(building, data, "wood");
		this.processValue(building, data, "stone");
		this.processValue(building, data, "iron");
		this.processValue(building, data, "pop");
		this.processValue(building, data, "wood_factor");
		this.processValue(building, data, "stone_factor");
		this.processValue(building, data, "iron_factor");
		this.processValue(building, data, "pop_factor");
		this.processValue(building, data, "build_time");
		this.processValue(building, data, "build_time_factor");
		
		if(building.pop.length > 0) {
			this.buildings.list.push(building);
			this.buildings[id] = building;
			building.id = id;
			building.name = name;
			building.basePoints = basePoints;
		}
	};
}


