// ==UserScript==
// @name           Alliance Dashboard
// @author         OswaldJon
// @description    Advanced Alliance Management Tool
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant          none
// @version        0.3
// ==/UserScript==
function initADReport() {
    var AD_main = function () {
    function createInstance() {
        qx.Class.define("AD", {
            type : "singleton",
            extend : qx.core.Object,
            members : {
				data: null,
                mail: null,
                ui: null,
                intervalUpdate: null,
                initialize : function () {
					
					this.data = ADDataProvider.getInstance().initialize();
                    this.ui = ADUserInterface.getInstance().initialize();

                },

            }
        });
        qx.Class.define("ADDataProvider", {
            type: "singleton",
            extend: qx.core.Object,
            members: {
                mainData:           null,                                               //  ClientLib.Data.MainData
                alliance:           null,                                               //  ClientLib.Data.Alliance
                members:            null,                                               //  System.Collections.Generic.Dictionary$2
                pois:               new Array,                                          //  Owned POIS
                poiTypes:           new Array,                                          //  POI Types
                poiColors:          new Array,                                          //  POI Colors
                /**
                 * Init main class data
                 * @return this
                 */
                initialize: function() {
                    this.mainData   = ClientLib.Data.MainData.GetInstance();
                    this.player     = this.mainData.get_Player();
                    this.alliance   = this.mainData.get_Alliance();
                    this.members    = this.initMemberData();
                    this.pois       = this.initPois();

                    return this;
                },
                /**
                 * Init alliance members data
                 * @return {Array} alliance members data
                 */
                initMemberData: function() {
                    var memberData = this.alliance.get_MemberData().d;
                    var output = new Array();
                    for(var i in memberData) {


                        var date = new Date(memberData[i]["LastSeen"]);
                        var hours = date.getHours();
                        if (hours<10) {hours = "0" + hours}
                        var minutes = date.getMinutes();
                        if (minutes<10) {minutes = "0" + minutes}
                        var seconds = date.getSeconds();
                        if (seconds<10) {seconds = "0" + seconds}
                        var day = date.getDate();
                        var month = date.getMonth();
                        var year = date.getFullYear();

                        var formattedTime = month + '/'+day+'/'+year+' '+hours + ':' + minutes + ':' + seconds;
                        var onlinestate = "Hidden";
                        if(memberData[i]["OnlineState"] == 0) onlinestate = "Offline";
                        if(memberData[i]["OnlineState"] == 1) onlinestate = "Online";
                        if(memberData[i]["OnlineState"] == 2) onlinestate = "Away";

                        output.push(new Array(
                            memberData[i]["Id"],
                            memberData[i]["Name"],
                            memberData[i]["Rank"],
                            memberData[i]["Points"],
                            memberData[i]["Bases"],
                            onlinestate,
                            formattedTime
                        ));
                    }
                    return output;
                },
                /**
                 * Return alliance member data
                 * @return {Array} alliance member data
                 */
				getMemberData: function() {
					return this.members;
				},
				
                /**
                 * Send request to EA servers
                 * @param command string - The name of the command to send
                 * @param params - JSON Params to send with the request
                 * @param context - Context used to determine action in the callback method
                 */
                doRequest: function(command, params, context) {
                    ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand(command, params, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.commandCallback), context);
                },
                /**
                 * Callback method called on requests to EA servers
                 * @param context string context used
                 * @param data object data returned from EA
                 */
                commandCallback: function(context, data) {
                    switch (context) {
                        case 'GetMemberDataForDetailMemberTab':
                            ADUserInterface.getInstance().populateDetailMemberTab(data);
                        break;
                        case 'GetBaseReportDataForDetailMemberBasesTabs':
                            ADUserInterface.getInstance().populateBaseReportDetailMemberBaseTab(data);
                        break;
                    }
                },
                /**
                 * Init Alliance owned POIs
                 * @return {Array} Alliance owned POIs
                 */
                initPois: function() {

                    this.poiTypes["2"] = "Tiberium";
                    this.poiTypes["3"] = "Crystal";
                    this.poiTypes["4"] = "Reactor";
                    this.poiTypes["5"] = "Tungsten";
                    this.poiTypes["6"] = "Uranium";
                    this.poiTypes["7"] = "Aircraft";
                    this.poiTypes["8"] = "Resonator";

                    this.poiColors["2"] = "00FF37";
                    this.poiColors["3"] = "8A54FF";
                    this.poiColors["4"] = "77F0FC";
                    this.poiColors["5"] = "E6FF00";
                    this.poiColors["6"] = "FFB13D";
                    this.poiColors["7"] = "FF5757";
                    this.poiColors["8"] = "FF73B0";



                    var pois = this.alliance.get_OwnedPOIs();
                    for (var key in pois) {
                        var poi = pois[key];
                        var item = new Array('<span style="background:#'+this.poiColors[poi["t"]]+';display:block;width:15px;height:15px;">&nbsp;</span>',this.poiTypes[poi["t"]], poi["l"], poi["x"], poi["y"]);
                        this.pois.push(item);
                    }
                    return this.pois;
                },
                /**
                 * Return Alliance owned POIs
                 * @return {Array} Alliance owned POIs
                 */
                getPois: function() {
                    return this.pois;
                },
                /**
                 * Return POI Types
                 * @return {Array} POI Types
                 */
                getPoiTypes: function() {
                    return this.poiTypes;
                },
                /**
                 * Return Alliance instance
                 * @return {Object} Alliance
                 */
                getAlliance: function() {
                    return this.alliance;
                },
                /**
                 * Get object param name by index. Used for obfuscated methods.
                 * @param object Object to search into
                 * @param idx Index of the key serched
                 * @return string Key searched
                 */
                getNameByIdx: function (object, idx){
                    var i=0;
                    for(var n in object) {
                        if(i==idx) return n;
                        i++;
                    }
                    return null;
                }
            }
        });
        qx.Class.define("ADUserInterface", {
            type: "singleton",
            extend: qx.core.Object,
            members: {
                adWindow:           null,                                 // Alliance Dashboard window
                data:               null,                                 // ClientLib.Data.MainData
                UIDetailGroupbox:   null,                                 // Current member details groupbox
                UITabsCities:       new Array,                            // Current member cities tabs
                /**
                 * Main UI initialization
                 */
                initialize: function() {
                    this.data = ADDataProvider.getInstance();
                    this.initMenu();
                },
                /**
                 * Init menus ans buttons
                 */
                initMenu: function() {
                    
                    // Init dashboard button
                    var bar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION);
                    var cctaBtn = new qx.ui.form.Button("Dashboard");
                    cctaBtn.set
                        ({
                            alignY: "middle",
                            width: 40,
                            height: 40,
                            toolTipText: "View Alliance Dashbord",
                            appearance: "button-text-small"
                        });
                    cctaBtn.addListener("click", function(){
                        ADUserInterface.getInstance().openADWindow();
                    }, this);
                    bar.add(cctaBtn);
					
                },
                /**
                 * Init alliance dashboard window
                 * @return {Object} Alliance dashboard window
                 */
                initADWindow: function() {
                    if(this.adWindow != null) return this.adWindow;

                    var adWindow = new qx.ui.window.Window("Dashboard: "+this.data.getAlliance().get_Name());
                    adWindow.set({
                        layout: new qx.ui.layout.VBox(10),
                        showMaximize: true,
                        showMinimize: false,
                        alignX: "center",
                        alignY: "middle",
                        width: 1000,
                        height: 660,
                        minWidth: 100,
                        minHeight: 200,
                        showStatusbar: true,
                        textColor: "#4E5661"
                    });

                    adWindow.addListener('close', function(e){
                        this.adWindow = null;
                    }, this);

                    // Tabs interface
                    var tabView = new qx.ui.tabview.TabView();

                    var poiTab = this.initAdWindowPoiTab();
                    tabView.add(poiTab, {flex:1});

                    // Members Tab
                    var membersTab = this.initAdWindowMembersTab();
                    tabView.add(membersTab, {flex:1});

					// Rank tab
                    var rankTab = this.initAdWindowRankTab();
                    tabView.add(rankTab, {flex:1});

                    adWindow.add(tabView, {flex:1});

                    var slider = new qx.ui.form.Slider();
                    slider.set({
                        value: 100,
                        minimum: 0,
                        maximum: 100,
                        singleStep: 1,
                        pageStep: 20
                    });
                    adWindow.add(slider);
                    slider.addListener("changeValue", function(e){
                        var op = e.getData()/100;
                        this.adWindow.set({opacity: op});
                    }, this);
                    this.adWindow = adWindow;

                    return this.adWindow;
                },
                /**
                 * Open alliance dashbord window
                 */
                openADWindow: function() {

                    if(this.adWindow == null) {
                        this.initADWindow();
                    }
                    this.adWindow.open();
                    this.adWindow.center();

                    this.adWindow.set({opacity:1});

                },
                /**
                 * Common actions applied to window tabs
                 * @param tab Tab used
                 * @return {Object} Tab altered
                 */
                initAbstractTab: function(tab) {
                    tab.setOpacity(1);
                    return tab;
                },
                /**
                 * Init owned POIs tab content
                 * @return {qx.ui.tabview.Page} Owned POIs tab content
                 */
                initAdWindowPoiTab: function() {
                    var tab = new qx.ui.tabview.Page("POI");

                    tab = this.initAbstractTab(tab);
                    tab.setLayout(new qx.ui.layout.HBox(10));

                    var groupbox = new qx.ui.groupbox.GroupBox("Taken POI");
                    groupbox.setLayout(new qx.ui.layout.VBox(10));
                    tab.add(groupbox, {flex:1});

                    var tableModel = new qx.ui.table.model.Simple();
                    tableModel.setColumns([ "-", "Type", "Level", "X", "Y" ]);
                    var tableData = this.data.getPois();
                    tableModel.setData(tableData);
                    var customTCM =
                    {
                        tableColumnModel : function(obj) {
                            return new qx.ui.table.columnmodel.Resize(obj);
                        }
                    };

                    var table = new qx.ui.table.Table(tableModel,customTCM).set({
                        decorator: null
                    });
                    table.addListener('cellClick', function(e) {
                        webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(parseInt(tableData[e["$$user_row"]][3], 10), parseInt(tableData[e["$$user_row"]][4], 10));
                    }, this);

                    var tcm = table.getTableColumnModel();
                    var resizeBehavior = tcm.getBehavior();
                    resizeBehavior.set(0, { width:"1*", minWidth:20, maxWidth:30  });

                    var renderer = new qx.ui.table.cellrenderer.Html();
                    table.getTableColumnModel().setDataCellRenderer(0, renderer);

                    groupbox.add(table, {flex:1});


                    return tab;
                },
                /**
                 * Init POI Ranking window tab content
                 * @return {qx.ui.tabview.Page} POI Ranking window tab content
                 */
                initAdWindowRankTab: function(){
                    var tab = new qx.ui.tabview.Page("POI Ranking");

                    tab = this.initAbstractTab(tab);
                    tab.setLayout(new qx.ui.layout.HBox(10));

                    var alliance = this.data.alliance;
                    var tableModel = new qx.ui.table.model.Simple();
                    tableModel.setColumns([ "Type", "Ranking", "Score", "Next Tier", "Infos"]);

                    var rankScore = alliance.get_POIRankScore();
                    var rankSteps = new Array(
                        [0,0,0],
                        [5,14,3000],
                        [16,17,4000],
                        [27,20,5500],
                        [50,23,7000],
                        [90,26,8500],
                        [160,29,10000],
                        [260,32,12000],
                        [420,35,15000],
                        [750,38,18000],
                        [1300,41,22000],
                        [2200,44,26000],
                        [3600,47,30000],
                        [5700,50,36000],
                        [9700,53,45000],
                        [16400,56,60000],
                        [28000,58,80000],
                        [44000,60,105000],
                        [80000,62,135000],
                        [115000,64,170000],
                        [190000,66,215000],
                        [330000,68,270000]);

                    var nextSteps = new Array();
                    for(var i in rankScore) {
                        for(var j in rankScore[i]) {
                            for(var iStep in rankSteps) {
                                if(rankSteps[iStep][0] <= rankScore[i]["s"]) continue;
                                nextSteps[i] = rankSteps[iStep][0];
                                break;
                            }
                        }
                    }


                    var rankGeneral = new Array("Général", alliance.get_Rank(), alliance.get_TotalScore(), "/");
                    var rankTib = new Array("POI Tiberium", rankScore[0]["r"], rankScore[0]["s"], nextSteps[0], "Bonus: "+alliance.get_POITiberiumBonus()+"/h" );
                    var rankCry = new Array("POI Crystal",rankScore[1]["r"], rankScore[1]["s"], nextSteps[1], "Bonus: "+alliance.get_POICrystalBonus()+"/h");
                    var rankRea = new Array("POI Reacteur", rankScore[2]["r"], rankScore[2]["s"], nextSteps[2], "Bonus: "+alliance.get_POIPowerBonus()+"/h");
                    var rankTun = new Array("POI Tungstène", rankScore[3]["r"], rankScore[3]["s"], nextSteps[3], "Bonus: "+alliance.get_POIInfantryBonus()+"%");
                    var rankUra = new Array("POI Uranium", rankScore[4]["r"], rankScore[4]["s"], nextSteps[4], "Bonus: "+alliance.get_POIVehicleBonus()+"%");
                    var rankAir = new Array("POI Aircraft", rankScore[5]["r"], rankScore[5]["s"], nextSteps[5], "Bonus: "+alliance.get_POIAirBonus()+"%");
                    var rankRes = new Array("POI Résonateur", rankScore[6]["r"], rankScore[6]["s"], nextSteps[6], "Bonus: "+alliance.get_POIDefenseBonus()+"%");

                    var rankings = new Array();
                    rankings.push(rankGeneral,rankTib,rankCry,rankRea,rankTun,rankUra,rankAir,rankRes);


                    tableModel.setData(rankings);
                    var table = new qx.ui.table.Table(tableModel).set({
                        decorator: null
                    });
                    tab.add(table, {flex:1});

                    return tab;
                },
                /**
                 * Init Alliance members window tab content
                 * @return {qx.ui.tabview.Page} Alliance members window tab content
                 */
                initAdWindowMembersTab: function() {
                    var tab = new qx.ui.tabview.Page("Members");
                    tab = this.initAbstractTab(tab);
                    tab.setLayout(new qx.ui.layout.HBox(10));

                    var groupbox = new qx.ui.groupbox.GroupBox("Members");
                    groupbox.setLayout(new qx.ui.layout.VBox(10));
                    tab.add(groupbox, {flex:1, width: '50%'});

                    var tableModel = new qx.ui.table.model.Simple();
                    tableModel.setColumns([ "ID", "Name", "Rank", "Points", "Bases", "Online", "Last visit" ]);
                    var tableData = this.data.getMemberData();
                    tableModel.setData(tableData);

                    var table = new qx.ui.table.Table(tableModel).set({
                        decorator: null
                    });


                    var detailGroupbox = new qx.ui.groupbox.GroupBox("Member details");

                    table.addListener('cellClick', function(e) {
                        var playerId = tableData[e["$$user_row"]][0];
                        detailGroupbox.removeAll();
                        this.initAdWindowDetailMemberTab(playerId);
                    }, this);

                    groupbox.add(table, {flex:1});


                    detailGroupbox.setLayout(new qx.ui.layout.VBox(10));
                    this.UIDetailGroupbox = detailGroupbox;
                    tab.add(this.UIDetailGroupbox, {flex:1, width: '50%'});

                    return tab;
                },
                /**
                 * Init Member details content by sending request to EA Servers. Will be continued in callback method.
                 * @param playerId
                 */
                initAdWindowDetailMemberTab: function(playerId) {

                    this.data.doRequest('GetPublicPlayerInfo', {id:playerId}, 'GetMemberDataForDetailMemberTab');



                },
                /**
                 * Callback method for detail member content init
                 * @param data
                 */
                populateDetailMemberTab: function(data) {
                    var detailTabView = new qx.ui.tabview.TabView();

                    var infoTab = new qx.ui.tabview.Page("History");
                    infoTab = this.initAbstractTab(infoTab);
                    infoTab.setLayout(new qx.ui.layout.VBox(10));

                    var citiesTabs = new qx.ui.tabview.TabView();

                    var memberCities = data.c;
                    for(var k in memberCities) {
                        var city = memberCities[k];
                        var cityTab = new qx.ui.tabview.Page(city["n"]);
                        cityTab.setLayout(new qx.ui.layout.VBox(10));
                        var noFightLabel = new qx.ui.basic.Label("No offense report for this base").set({
                            textColor: "text-value",
                            font: "font_size_13_bold"
                        });
                        cityTab.add(noFightLabel);
                        this.UITabsCities[city["i"]] = cityTab;
                        this.data.doRequest('GetReportHeaderBase', {
                            ascending: false,
                            baseId: city["i"],
                            skip: 0,
                            sort: 1,
                            take: 200,
                            type: 1
                        }, 'GetBaseReportDataForDetailMemberBasesTabs');
                        citiesTabs.add(cityTab,{flex:1});
                    }
                    infoTab.add(citiesTabs,{flex:1});


                   /* var ranking = new qx.ui.form.ListItem(JSON.stringify(data));
                    infoTab.add(ranking);*/
                    detailTabView.add(infoTab, {flex:1});

                    /*var infoTab = new qx.ui.tabview.Page("Layouts");
                    infoTab = this.initAbstractTab(infoTab);
                    infoTab.setLayout(new qx.ui.layout.VBox(10));
                    detailTabView.add(infoTab, {flex:1});*/

                    /*var infoTab = new qx.ui.tabview.Page("Maps");
                    infoTab = this.initAbstractTab(infoTab);
                    infoTab.setLayout(new qx.ui.layout.HBox(10));
                    detailTabView.add(infoTab, {flex:1});*/

                    this.UIDetailGroupbox.add(detailTabView, {flex:1});
                },
                /**
                 * Callback method for member bases reports content init
                 * @param data
                 * @return {Boolean} true if nothing to append, content appended else
                 */
                populateBaseReportDetailMemberBaseTab: function(data) {
                    if(data.length == 0) {
                        return true;
                    }
                    var firstObject = data[0];
                    var baseId = firstObject.bi;

                    var imgResult = new Array;
                    imgResult["img"] = 'none';
                    imgResult["img0"] = '0';
                    imgResult["img1"] = '<img src="https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/5aaca4e32fdcbc59a332a90ab09560fd.png" />';
                    imgResult["img2"] = '2';
                    imgResult["img3"] = '3';
                    imgResult["img4"] = '<img src="https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/d0b7b7f9cceaf177eeb45703dd5b8583.png" />';
                    imgResult["img5"] = '<img src="https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/8b3f702643d0916531dd088032c0b14e.png" />';
                    imgResult["img6"] = '<img src="https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/d0b7b7f9cceaf177eeb45703dd5b8583.png" />';

                    var thisCityTab = this.UITabsCities[baseId];
                    thisCityTab.removeAll();

                    var tableModel = new qx.ui.table.model.Simple();
                    tableModel.setColumns([ "Result", "Type", "Time" ]);
                    var tableData = new Array;

                    for(var i in data) {
                        var item = data[i];
                        var combatInfo = item.ad;

                        var typeVal = "Attack: "+combatInfo.dbn;
                        if(combatInfo.dbn == 1) typeVal = "<span style='color:green;'>Attack: Camp lvl "+combatInfo.dbl+"</span>";
                        if(combatInfo.dbn == 2) typeVal = "<span style='color:green;'>Attack: Camp lvl "+combatInfo.dbl+"</span>";
                        if(combatInfo.dbn == 3) typeVal = "<span style='color:#ff8c00;'>Attack: Outpost lvl "+combatInfo.dbl+"</span>";
                        if(combatInfo.dbn == 4) typeVal = "<span style='color:red;'>Attack: Base lvl "+combatInfo.dbl+"</span>";

                        var date = new Date(item.t);
                        var hours = date.getHours();
                        if (hours<10) {hours = "0" + hours}
                        var minutes = date.getMinutes();
                        if (minutes<10) {minutes = "0" + minutes}
                        var seconds = date.getSeconds();
                        if (seconds<10) {seconds = "0" + seconds}
                        var day = date.getDate();
                        var month = date.getMonth();
                        var year = date.getFullYear();

                        var formattedTime = month + '/'+day+'/'+year+' '+hours + ':' + minutes + ':' + seconds;
                        tableData.push(new Array(imgResult["img"+combatInfo.cr], typeVal, formattedTime));

                    }

                    tableModel.setData(tableData);


                    var customTCM =
                    {
                        tableColumnModel : function(obj) {
                            return new qx.ui.table.columnmodel.Resize(obj);
                        }
                    };

                    var table = new qx.ui.table.Table(tableModel,customTCM).set({
                        decorator: null
                    });

                    var tcm = table.getTableColumnModel();
                    var resizeBehavior = tcm.getBehavior();
                    resizeBehavior.setWidth(0, 60);
                    resizeBehavior.set(1, { width:"1*", minWidth:100, maxWidth:600  });

                    var renderer = new qx.ui.table.cellrenderer.Html();
                    table.getTableColumnModel().setDataCellRenderer(0, renderer);
                    table.getTableColumnModel().setDataCellRenderer(1, renderer);

                    thisCityTab.add(table, {flex:1});



                }
            }
        });
    }

    // Loading
    function AD_checkIfLoaded() {
        try {
            if (typeof qx != 'undefined') {
                if (qx.core.Init.getApplication().getMenuBar() !== null) {
                    createInstance();
                    AD.getInstance().initialize();
                } else setTimeout(AD_checkIfLoaded, 1000);
            } else {
                setTimeout(AD_checkIfLoaded, 1000);
            }
        } catch (e) {
            if (typeof console != 'undefined') {
                console.log(e);
            } else if (window.opera) {
                opera.postError(e);
            } else {
                GM_log(e);
            }
        }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
        setTimeout(AD_checkIfLoaded, 1000);
    }
};

// injecting, because there seem to be problems when creating game interface with unsafeWindow
var AllDash = document.createElement("script");
var txt = AD_main.toString();
AllDash.innerHTML = "(" + txt + ")();";
AllDash.type = "text/javascript";
if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(AllDash);
}
}
/*Main*/
function waitForClientLib(){

    for(var i in unsafeWindow) {
        //alert(i+" --- "+unsafeWindow[i]);
    }

    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    webfrontend = unsafeWindow["webfrontend"];

    if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
    {
        setTimeout(waitForClientLib, 10000);
        return;
    }
    else {
        initADReport();
    }

}
function startup(){
    setTimeout(waitForClientLib, 10000);
};
startup();
