// ==UserScript==
// @name            Custom Minister
// @description     Currently only building minister to upgrade building
// @namespace       Custom Minister
// @include         http://prodgame*.lordofultima.com/*/index.aspx*
// @version         0.0.1
// ==/UserScript==


(function () {
    var scriptToBeInjected = function () {
        var LouB = {};
        var localStoreData = {};

        qx.Class.define("BuildingMinisterTab",{
            type: "singleton",
            extend: qx.ui.tabview.Page,
            construct: function(){
                qx.ui.tabview.Page.call(this);
                this.setLabel("Building Minister");
                this.setPadding(10);
                this.setLayout(new qx.ui.layout.Flow());

                var buildingMinisterDescription = new qx.ui.basic.Label();
                buildingMinisterDescription.set({
                    value: "<b>The Building Minister is used to fill your building queue automatically if resource available</b>",
                    rich : true,
                    width: 450
                });
                this.add(buildingMinisterDescription, {lineBreak: true});

                this.buildingUpgrade = new qx.ui.form.CheckBox("<b>Enable Custom Building Minister to order building upgrades for this city</b>");
                this.buildingUpgrade.set({
                    rich : true,
                    paddingTop:20,
                    width: 450
                });
                this.buildingUpgrade.addListener("changeValue",this.disableAndEnableCheckbox,this);
                this.add(this.buildingUpgrade, {lineBreak: true});

                this.upgradeCottages = new qx.ui.form.CheckBox("Upgrade Cottages");
                this.upgradeCottages.set({
                    rich : true,
                    paddingTop:10,
                    paddingLeft:20,
                    width: 430
                });
                this.add(this.upgradeCottages, {lineBreak: true});

                this.upgradeWarehouses = new qx.ui.form.CheckBox("Upgrade Warehouses");
                this.upgradeWarehouses.set({
                    rich : true,
                    paddingTop:10,
                    paddingLeft:20,
                    width: 430
                });
                this.add(this.upgradeWarehouses, {lineBreak: true});

                this.upgradeEconomyBuildings = new qx.ui.form.CheckBox("Upgrade Economy Buildings");
                this.upgradeEconomyBuildings.set({
                    rich : true,
                    paddingTop:10,
                    paddingLeft:20,
                    width: 430
                });
                this.add(this.upgradeEconomyBuildings, {lineBreak: true});

                this.upgradeBarracks = new qx.ui.form.CheckBox("Upgrade Barracks");
                this.upgradeBarracks.set({
                    rich : true,
                    paddingTop:10,
                    paddingLeft:20,
                    width: 430
                });
                this.add(this.upgradeBarracks, {lineBreak: true});

                this.upgradeMilitaryBuildings = new qx.ui.form.CheckBox("Upgrade Military Production Buildings");
                this.upgradeMilitaryBuildings.set({
                    rich : true,
                    paddingTop:10,
                    paddingLeft:20,
                    width: 430
                });
                this.add(this.upgradeMilitaryBuildings, {lineBreak: true});

                this.upgradeOtherBuildings = new qx.ui.form.CheckBox("Upgrade other buildings (Marketplace, Harbor, Castle, Town Hall, Hideout)");
                this.upgradeOtherBuildings.set({
                    rich : true,
                    paddingTop:10,
                    paddingLeft:20,
                    width: 430
                });
                this.add(this.upgradeOtherBuildings, {lineBreak: true});

                var buttonContainer = new qx.ui.container.Composite();
                buttonContainer.setPadding(30);
                buttonContainer.setWidth(400);

                var buttonContainerLayout = new qx.ui.layout.Flow();
                buttonContainerLayout.setAlignX( "right" );
                buttonContainer.setLayout(buttonContainerLayout);

                var applyChanges = new qx.ui.form.Button("Apply Changes");
                applyChanges.addListener("click",this.saveBuildingMinisterSettings,this);
                buttonContainer.add(applyChanges);

                /*var undoChanges = new qx.ui.form.Button("Undo Changes");
                undoChanges.set({
                    marginLeft:20
                });
                buttonContainer.add(undoChanges);*/

                this.add(buttonContainer)
            }, members: {
                FLAG_BUILDING_UPGRADE : 0x1, // 0001
                FLAG_UPGRADE_COTTAGES : 0x2, // 0010
                FLAG_UPGRADE_WAREHOUSE : 0x4, // 0100
                FLAG_UPGRADE_ECONOMY_BUILDING : 0x8,//1000
                FLAG_UPGRADE_OTHER_BUILDING : 0x10, // 10000
                FLAG_UPGRADE_BARRACK : 0x20, // 100000
                FLAG_UPGRADE_MILITARY_BUILDINGS : 0x40,//1000000
                buildingUpgrade : null,
                upgradeOtherBuildings : null,
                upgradeMilitaryBuildings : null,
                upgradeBarracks : null,
                upgradeEconomyBuildings : null,
                upgradeCottages : null,
                upgradeWarehouses : null,

                getSettingForCity : function() {
                    var mask = 0;
                    if(localStoreData[LouB.cityInfo.getId()] && localStoreData[LouB.cityInfo.getId()].buildingMinisterSetting){
                        mask = localStoreData[LouB.cityInfo.getId()].buildingMinisterSetting;
                    }
                    return mask;
                },

                saveBuildingMinisterSettings: function() {
                    var mask = 0;
                    if(this.buildingUpgrade.getValue())
                        mask = mask | this.FLAG_BUILDING_UPGRADE;
                    if(this.upgradeBarracks.getValue())
                        mask = mask | this.FLAG_UPGRADE_BARRACK;
                    if(this.upgradeCottages.getValue())
                        mask = mask | this.FLAG_UPGRADE_COTTAGES;
                    if(this.upgradeEconomyBuildings.getValue())
                        mask = mask | this.FLAG_UPGRADE_ECONOMY_BUILDING;
                    if(this.upgradeMilitaryBuildings.getValue())
                        mask = mask | this.FLAG_UPGRADE_MILITARY_BUILDINGS;
                    if(this.upgradeOtherBuildings.getValue())
                        mask = mask | this.FLAG_UPGRADE_OTHER_BUILDING;
                    if(this.upgradeWarehouses.getValue())
                        mask = mask | this.FLAG_UPGRADE_WAREHOUSE;
                   // console.log("save building minister " + mask );
                    if(LouB.cityInfo && localStoreData[LouB.cityInfo.getId()]){
                        localStoreData[LouB.cityInfo.getId()].buildingMinisterSetting = mask;
                    }else {
                        localStoreData[LouB.cityInfo.getId()] = {buildingMinisterSetting : mask};
                    }
                    LouB.commitToLocalStore();
                },

                disableAndEnableCheckbox : function() {
                    if(this.buildingUpgrade.getValue()){
                        this.upgradeCottages.setEnabled(true);
                        this.upgradeBarracks.setEnabled(true);
                        this.upgradeEconomyBuildings.setEnabled(true);
                        this.upgradeMilitaryBuildings.setEnabled(true);
                        this.upgradeOtherBuildings.setEnabled(true);
                        this.upgradeWarehouses.setEnabled(true);
                    } else {
                        this.upgradeCottages.setEnabled(false);
                        this.upgradeBarracks.setEnabled(false);
                        this.upgradeEconomyBuildings.setEnabled(false);
                        this.upgradeMilitaryBuildings.setEnabled(false);
                        this.upgradeOtherBuildings.setEnabled(false);
                        this.upgradeWarehouses.setEnabled(false);
                    }
                },

                updatePage: function() {
                    var value = 0;
                    if (localStoreData[LouB.cityInfo.getId()] && localStoreData[LouB.cityInfo.getId()].buildingMinisterSetting){
                        value = localStoreData[LouB.cityInfo.getId()].buildingMinisterSetting;
                    }
                    this.buildingUpgrade.setValue(((this.FLAG_BUILDING_UPGRADE & value) != 0));
                    this.disableAndEnableCheckbox();
                    //console.log(value);
                    if(this.buildingUpgrade.getValue()){
                        this.upgradeCottages.setValue(((this.FLAG_UPGRADE_COTTAGES & value) != 0));
                        this.upgradeBarracks.setValue(((this.FLAG_UPGRADE_BARRACK & value) != 0));
                        this.upgradeEconomyBuildings.setValue(((this.FLAG_UPGRADE_ECONOMY_BUILDING & value) != 0));
                        this.upgradeMilitaryBuildings.setValue(((this.FLAG_UPGRADE_MILITARY_BUILDINGS & value) != 0));
                        this.upgradeOtherBuildings.setValue(((this.FLAG_UPGRADE_OTHER_BUILDING & value) != 0));
                        this.upgradeWarehouses.setValue(((this.FLAG_UPGRADE_WAREHOUSE & value) != 0));
                    }

                }
            }
        });

        qx.Class.define("MinisterSetting", {
            type: "singleton",
            extend: qx.ui.window.Window,
            construct: function() {
                qx.ui.window.Window.call(this);
                this.setLayout(new qx.ui.layout.Basic());

                var maxWidth = qx.bom.Viewport.getWidth(window);
                var maxHeight = qx.bom.Viewport.getHeight(window);

                pos = {
                    left: 400,
                    top: 50,
                    width: 600,
                    height: 500
                };

                this.set({
                    width: pos.width,
                    minWidth: 200,
                    maxWidth: parseInt(maxWidth * 0.9),
                    height: pos.height,
                    minHeight: 200,
                    maxHeight: parseInt(qx.bom.Viewport.getWidth(window) * 0.9),
                    allowMaximize: false,
                    allowMinimize: false,
                    showMaximize: false,
                    showMinimize: false,
                    showStatusbar: false,
                    showClose: false,
                    caption: "Custom Ministers",
                    resizeSensitivity: 7,
                    contentPadding: 0,
                    zIndex: 100000 - 1
                });
                this.moveTo(pos.left, pos.top);

                this.tabViewContainer = new qx.ui.tabview.TabView();
                this.tabViewContainer.setWidth(this.getWidth()-25);
                this.tabViewContainer.setHeight(this.getHeight()-50);

                this.tabViewContainer.add(window.BuildingMinisterTab.getInstance());

                this.tabViewContainer.addListener("changeSelection", this.onChangeTab, this);


                this.add(this.tabViewContainer);
                webfrontend.gui.Util.formatWinClose(this);

            },
            members: {
                tabViewContainer: null,
                onChangeTab: function() {
                    //console.log("tab changed");
                },
                updateAllPage : function () {
                    this.set({
                        caption: ("Custom Ministers " + webfrontend.data.City.getInstance().getName())
                    });
                    window.BuildingMinisterTab.getInstance().updatePage();
                }
            }
        });

        qx.Class.define("CustomBuildingMinister", {
            type: "singleton",
            extend: qx.core.Object,
            members: {
                bd: {
                    /* cottage */			"4":  {"type":2,"priority":1,"w": [ 0, 0, 0, 0, 200, 500, 1000, 2000, 5000, 12000 ],"s": [ 50, 150, 300, 600, 1000, 2000, 4000, 7500, 14000, 17000 ]},
                    /* warehouse */			"20": {"type":4,"priority":18,"w": [ 60, 150, 250, 500, 1600, 3000, 6000, 9600, 15000, 20000 ],"s": [ 0, 0, 50, 150, 400, 1000, 2000, 4800, 9000, 13000 ]},
                    /* woodcutter */		"47": {"type":8,"priority":2,"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ],"s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ]},
                    /* quarry */			"48": {"type":8,"priority":3,"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ],"s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ]},
                    /* iron mine */			"49": {"type":8,"priority":4,"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ],"s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ]},
                    /* farm */				"50": {"type":8,"priority":5,"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ],"s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ]},
                    /* sawmill */			"7":  {"type":8,"priority":6,"w": [ 60, 150, 350, 1100, 2700, 5000, 85000, 13500, 21500, 33000 ],"s": [ 60, 150, 350, 1100, 2700, 5000, 85000, 13500, 21500, 33000 ]},
                    /* stonemason */		"10": {"type":8,"priority":7,"w": [ 60, 150, 350, 1100, 2700, 5000, 85000, 13500, 21500, 33000 ],"s": [ 60, 150, 350, 1100, 2700, 5000, 85000, 13500, 21500, 33000 ]},
                    /* foundry */			"11": {"type":8,"priority":8,"w": [ 60, 150, 350, 1100, 2700, 5000, 85000, 13500, 21500, 33000 ],"s": [ 60, 150, 350, 1100, 2700, 5000, 85000, 13500, 21500, 33000 ]},
                    /* mill */				"8":  {"type":8,"priority":9,"w": [ 60, 150, 350, 1100, 2700, 5000, 85000, 13500, 21500, 33000 ],"s": [ 60, 150, 350, 1100, 2700, 5000, 85000, 13500, 21500, 33000 ]},
                    /* town hall */			"12": {"type":16,"priority":11,"w": [ 0, 200, 500, 1000, 3000, 8000, 15000, 30000, 60000, 120000 ],"s": [ 0, 0, 100, 300, 1500, 4000, 10000, 25000, 60000, 120000 ]},
                    /* marketplace */		"5":  {"type":16,"priority":10,"w": [ 40, 80, 160, 400, 1200, 2800, 5600, 9600, 15200, 23200 ],"s": [ 20, 40, 80, 200, 600, 1400, 2800, 4800, 7600, 11600 ]},
                    /* townhouse */			"13": {"type":16,"priority":12,"w": [ 0, 0, 0, 0, 1000, 2000, 3500, 7000, 14000, 29000 ],"s": [ 100, 300, 600, 2000, 4000, 7000, 11500, 17000, 24000, 29000 ]},
                    /* castle */			"21": {"type":16,"priority":26,"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],"s": [ 20000, 25000, 30000, 40000, 55000, 75000, 100000, 130000, 160000, 200000 ]},
                    /* hideout */			"9":  {"type":16,"priority":20,"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],"s": [ 50, 200, 600, 1000, 1500, 2200, 3500, 4500, 6000, 8000 ]},
                    /* harbor */			"22": {"type":16,"priority":22,"w": [ 80, 160, 320, 800, 2400, 5600, 11200, 19200, 30400, 46400 ],"s": [ 40, 80, 160, 400, 1200, 2800, 5600, 9600, 15200, 23200 ]},
                    /* barracks */			"14": {"type":32,"priority":13,"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],"s": [ 50, 150, 300, 600, 1200, 2500, 4000, 7000, 11500, 17500 ]},
                    /* training ground */	"16": {"type":64,"priority":14,"w": [ 20, 40, 80, 200, 600, 1400, 2800, 4800, 7500, 11500 ],"s": [ 40, 80, 160, 400, 1200, 2800, 5600, 9600, 15000, 23000 ]},
                    /* stable */			"17": {"type":64,"priority":15,"w": [ 25, 55, 110, 275, 800, 1900, 3750, 6500, 10200, 15500 ],"s": [ 50, 110, 220, 550, 1600, 3800, 7500, 13000, 20400, 31000 ]},
                    /* workshop */			"18": {"type":64,"priority":16,"w": [ 40, 75, 150, 370, 1100, 2600, 5200, 8900, 14000, 21500 ],"s": [ 80, 150, 300, 740, 2200, 5200, 10400, 17800, 28000, 43000 ]},
                    /* shipyard */			"19": {"type":64,"priority":17,"w": [ 50, 100, 200, 500, 1500, 3500, 7000, 12000, 19000, 29000 ],"s": [ 100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000 ]},
                    /* city guard house */	"15": {"type":64,"priority":19,"w": [ 15, 30, 55, 140, 400, 1000, 1900, 3200, 5100, 8000 ],"s": [ 30, 60, 110, 280, 800, 2000, 3800, 6400, 10200, 16000 ]},
                    /* moonglow tower */	"36": {"type":64,"priority":21,"w": [ 30, 60, 120, 300, 900, 2100, 4200, 7200, 11400, 17400 ],"s": [ 60, 120, 240, 600, 1800, 4200, 8400, 14400, 22800, 34800 ]},
                    /* trinsic temple */	"37": {"type":64,"priority":23,"w": [ 35, 70, 135, 335, 1000, 2350, 4650, 8000, 12700, 19500 ],"s": [ 70, 140, 270, 670, 2000, 4700, 9300, 16000, 25400, 39000 ]},
                    /* lookout tower */		"38": {"type":7,"priority":24,"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],"s": [ 200, 400, 600, 1000, 1500, 2200, 3500, 5000, 7500, 10000 ]},
                    /* ballista tower */	"39": {"type":7,"priority":25,"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],"s": [ 100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000 ]},
                    /* guardian tower */	"40": {"type":7,"priority":25,"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],"s": [ 100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000 ]},
                    /* ranger tower */		"41": {"type":7,"priority":25,"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],"s": [ 100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000 ]},
                    /* templar tower */		"42": {"type":7,"priority":25,"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],"s": [ 100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000 ]},
                    /* pitfall trap */		"43": {"type":7,"priority":25,"w": [ 30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000 ],"s": [ 90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000 ]},
                    /* barricade */			"44": {"type":7,"priority":25,"w": [ 30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000 ],"s": [ 90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000 ]},
                    /* arcane trap */		"45": {"type":7,"priority":25,"w": [ 30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000 ],"s": [ 90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000 ]},
                    /* camouflage trap */	"46": {"type":7,"priority":25,"w": [ 30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000 ],"s": [ 90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000 ]},
                    /* wall */				"23": {"type":8,"priority":25,"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],"s": [ 200, 2000, 8000, 20000, 30000, 45000, 70000, 100000, 140000, 200000 ]}
                },
                app: null,
                cityInfoView: null,
                buildingQueue: null,
                cityBar: null,
                currentCity: null,
                currentCityIndex: null,
                upgradableCities: null,
                timer: null,
                buildingOfAllCities: new Array(),
                cityInfo: null,
                ministersSettingButton: null,
                isBuildingMinisterStarted: true,
                startStopButton: null,

                initialize: function () {
                    //console.log("Inside custom building minister initialize");
                    LouB = this;
                    LouB.app = qx.core.Init.getApplication();
                    LouB.cityInfoView = LouB.app.cityInfoView;
                    LouB.buildingQueue = LouB.cityInfoView.buildingQueue;
                    LouB.buildingQueueHeader = LouB.buildingQueue.header;
                    LouB.cityBar = LouB.app.cityBar;
                    //LouB.timer = qx.util.TimerManager.getInstance();
                    LouB.currentCity = LouB.cityBar.citiesSelect.getSelection()[0];
                    LouB.upgradableCities = LouB.cityBar.citiesSelect.getSelectables();
                    LouB.currentCityIndex = LouB.upgradableCities.indexOf(LouB.currentCity);
                    LouB.buildingOfAllCities[LouB.currentCityIndex] = LouB.app.visMain.getBuildings();

                    this.initializaAndFetchDataFromLocalStore();
                    LouB.showStartStopButton();
                    LouB.showMinistersSettingButton();

                    LouB.cityBar.citiesSelect.addListener("changeSelection",this.onCityChanged,this);
                    LouB.timer = window.setTimeout(LouB.start, 5000);
                },

                initializaAndFetchDataFromLocalStore : function () {
                    if(localStorage.getItem("CustomBuildingMinisterData_" + webfrontend.data.Player.getInstance().getId()))
                        localStoreData = JSON.parse(localStorage.getItem("CustomBuildingMinisterData_" + webfrontend.data.Player.getInstance().getId()));
                },

                onCityChanged : function () {
                    var self = this;
                    window.setTimeout(function(){
                        LouB.cityInfo = webfrontend.data.City.getInstance();
                        if(LouB.cityInfo == null){
                            self.onCityChanged();
                            return;
                        }

                        var widget = window.MinisterSetting.getInstance();
                        widget.updateAllPage();
                    },5000);
                },

                commitToLocalStore : function () {
                    var name = "CustomBuildingMinisterData_" + webfrontend.data.Player.getInstance().getId();
                    localStorage.setItem(name, JSON.stringify(localStoreData));
                },

                openMinisterSetting: function(){
					this.onCityChanged();
                    window.MinisterSetting.getInstance().open();
                },

                showMinistersSettingButton: function(){
                    //console.log(" inside show minister setting button");
                    LouB.ministersSettingButton = new qx.ui.form.Button("S");
                    LouB.ministersSettingButton.set({width: 30, appearance: "button-text-small"});
                    LouB.ministersSettingButton.addListener("click", this.openMinisterSetting, this);
                    LouB.buildingQueueHeader.add(LouB.ministersSettingButton, {top: 33, left: 5});
					LouB.ministersSettingButton.setEnabled(false);
                },

                showStartStopButton: function(){
                    //console.log (" inside show StartStop button");
                    this.startStopButton = new qx.ui.form.Button("Stop");
                    this.startStopButton.addListener("click",this.startStopBuildingMinister,this);
                    var container = LouB.app.title.reportButton.getLayoutParent();
                    container._add(this.startStopButton , {
                        row: 0,
                        column: 15
                    });
                },

                switchToNextCity: function () {
                    //console.log("Inside switched to next city");
                    LouB.upgradableCities = LouB.cityBar.citiesSelect.getSelectables();
                    LouB.currentCityIndex = (LouB.currentCityIndex + 1) % LouB.upgradableCities.length ;
                    LouB.currentCity = LouB.upgradableCities[LouB.currentCityIndex];
                    LouB.cityBar.citiesSelect.setSelection([LouB.currentCity]);
                    LouB.timer = window.setTimeout(LouB.start, 5000);
                },

                isQueueSpaceAvailable: function(){
                    //console.log("Inside is Queue Space available");
                    buildQueueMax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
                    queueFilled = 0;
                    if(webfrontend.data.City.getInstance().buildQueue !=null){
                        queueFilled = webfrontend.data.City.getInstance().buildQueue.length;
                    }
                    if((buildQueueMax - queueFilled)>0)
                        return true;
                    return false;
                },

                fillTheBuildingQueueOFCurrentCity: function() {
                    //console.log("Inside Fill The Build Queue Of Current City");
                    LouB.cityInfo = webfrontend.data.City.getInstance();

                    if(LouB.cityInfo == null){
                        //console.log("City Info empty so rechecking after 5 sec");
                        this.timer = window.setTimeout(this.fillTheBuildingQueueOFCurrentCity, 5000);
                        return;

                    }

                    buildings = LouB.app.visMain.getBuildings();

                    if(LouB.isQueueSpaceAvailable()){
                        building = LouB.findTheLowestPossibleUpgradableBuilding(buildings);
                        LouB.upgradeBuilding(building);
                    }
                    LouB.timer = window.setTimeout(LouB.switchToNextCity, 20000);
                },

                findTheLowestPossibleUpgradableBuilding: function(buildings){
                    //console.log ("Inside find The lowest Possible Upgradable Building");
                    var allowedBuildingsMask = window.BuildingMinisterTab.getInstance().getSettingForCity();
                    totalWoods = parseInt(LouB.cityInfo.getResourceCount(1));
                    totalStone = parseInt(LouB.cityInfo.getResourceCount(2));
                    var maxLevel = 100;
                    var maxPriority = 100;
                    var returnBuilding = null;
                    var buildingQueue = webfrontend.data.City.getInstance().buildQueue;
                   // console.log(allowedBuildingsMask);
                    for (var i=0;i<buildings.length;i++) {
                        var extraLevel = 0;
                        if(buildings[i].state == 1) {
                            extraLevel = 1;
                        }
                        if(LouB.bd[buildings[i].id] && ((LouB.bd[buildings[i].id].type & allowedBuildingsMask)!=0) && (((buildings[i].id>35 && buildings[i].id<51) || (buildings[i].id>6 && buildings[i].id<24) || buildings[i].id === 4 || buildings[i].id === 5) && buildings[i].level<10 && buildings[i].level>0)){
                            //console.log("inside loop");
                            if(this.isResourceAvailableForBuilding(buildings[i].id,buildings[i].level+1,totalWoods,totalStone)){
                                if((buildings[i].level+extraLevel) < maxLevel){
                                    maxLevel = (buildings[i].level+extraLevel);
                                    maxPriority = LouB.bd[buildings[i].id].priority;
                                    returnBuilding = buildings[i];
                                }
                                else{
                                    if((buildings[i].level+extraLevel) == maxLevel){
                                        if(maxPriority>LouB.bd[buildings[i].id].priority){
                                            maxLevel = (buildings[i].level+extraLevel);
                                            maxPriority = LouB.bd[buildings[i].id].priority;
                                            returnBuilding = buildings[i];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return returnBuilding;
                },

                isResourceAvailableForBuilding: function(buildingID,buildingLevel,totalWoods,totalStone){
                    //console.log("Inside is Resource available for building");
                    if(this.bd[buildingID].w[buildingLevel-1]<=totalWoods && this.bd[buildingID].s[buildingLevel-1]<=totalStone)
                        return true;
                    return false;
                },

                upgradeBuilding: function (building) {
                    //console.log("Inside upgrade Building");
                    //console.log(building);
                    if (!building) {
                        return;
                    }
                    var commandManager = webfrontend.net.CommandManager.getInstance();
                    var cityId = webfrontend.data.City.getInstance().getId();
                    var buildingId = building.visId;
                    var buildingType = building.id;
                    commandManager.sendCommand("UpgradeBuilding", {
                        cityid: cityId,
                        buildingid: buildingId,
                        buildingType: buildingType,
                        isPaid: true
                    }, this, function () {});
                    building.level = building.level+1;
                },

                startStopBuildingMinister: function () {
                    //console.log("inside start Stop Building Minister");
                    this.isBuildingMinisterStarted = !this.isBuildingMinisterStarted;
                    if (this.timer){
                        window.clearTimeout(this.timer);
                        this.timer = null;
                    }
                    if( this.isBuildingMinisterStarted ) {
                        this.start();
                        this.startStopButton.setLabel("Stop");
                        LouB.ministersSettingButton.setEnabled(false);
                        window.MinisterSetting.getInstance().close();
                    } else {
                        this.startStopButton.setLabel("Start");
                        LouB.ministersSettingButton.setEnabled(true);
                        return;
                    }
                },

                start: function () {
                    if (LouB.app.visMain.mapmode != "c") {
                        LouB.timer = window.setTimeout(LouB.start, 5000);
                        return;
                    }
                    //console.log("City View So upgrading that city");
                    LouB.timer = window.setTimeout(LouB.fillTheBuildingQueueOFCurrentCity, 5000);;
                }
            }
        });


        var louBuildingsCheckIfLoaded = function () {
            //console.log("Building Minister check if loaded");
            if (typeof qx != 'undefined') {
                //console.log("Found Qx...");
                var a = qx.core.Init.getApplication();
                if (a && a.chat && a.cityInfoView && a.title.reportButton) {
                    window.CustomBuildingMinister.getInstance().initialize();
                } else {
                    window.setTimeout(louBuildingsCheckIfLoaded, 5000);
                }
            } else {
                //console.log("Could not find Qx...");
                window.setTimeout(louBuildingsCheckIfLoaded, 5000);
            }
        };

        window.setTimeout(louBuildingsCheckIfLoaded, 5000);

    };

    var injectCustomScript = function () {
        //console.log("Injecting Custom Ministers");
        var script = document.createElement("script");
        script.innerHTML = "(" + scriptToBeInjected.toString() + ")();";
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    var checkIfShouldInjectScript = function () {
        //console.log("Checking if should inject LoU Building Minister...");
        var loadingScreen = document.getElementById("loadingscreen");
        if (loadingScreen && loadingScreen.style.display == "block") {
            window.setTimeout(checkIfShouldInjectScript, 5000);
        } else {
            injectCustomScript();
        }
    };

    window.setTimeout(checkIfShouldInjectScript, 5000);
})();
