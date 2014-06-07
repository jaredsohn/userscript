// ==UserScript==
// @version        1.4.1
// @name           CNC TA Resource and Layout Viewer
// @namespace      http://g3gg0.de
// @description    Shows resources and their layout for bases in tooltip
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @require        http://sizzlemctwizzle.com/updater.php?id=132492
// ==/UserScript==


(function (){
    var g3_resViewMain = function() 
    {
        function g3_createArray(length) 
        {
            var a = new Array(length || 0);

            if (arguments.length > 1) 
            {
                var args = Array.prototype.slice.call(arguments, 1);
                for (var i = 0; i < length; i++) 
                {
                    a[i] = g3_createArray.apply(this, args);
                }
            }

            return a;
        }

        function g3_resViewCreate() {
            var g3_resView = {
                font: null,
                resourceComposite: null,

                lootTable: [0,0,0,0,0,0,0,0],
                tableData: null,

                getTiberium: function() {
                    return g3_resView.lootTable[1];
                },
                getCrystal: function() {
                    return g3_resView.lootTable[2];
                },
                getCredits: function() {
                    return g3_resView.lootTable[3];
                },
                getResearch: function() {
                    return g3_resView.lootTable[6];
                },
                updateLayout: function(selected_base) {
                    try {
                        var city_id = selected_base.get_Id();
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);

                        /* reset all data */
                        g3_resView.lootTable = [0,0,0,0,0,0,0,0];
                        g3_resView.tableData = g3_createArray(9, 8);

                        /* have any data about units? */
                        if(city.m_CityUnits != null && city.m_CityBuildings != null)
                        {
                            /* already cached buildings? */
                            if(city.m_CityBuildings.m_Buildings != null)
                            {
                                var buildings = city.m_CityBuildings.m_Buildings.l.length;

                                for (var pos = 0; pos < buildings; pos++)
                                {
                                    var building = city.m_CityBuildings.m_Buildings.l[pos];
                                    var req = building.m_UnitLevelRequirements;

                                    for(var i=0; i < req.rer.length; i++)
                                    {
                                        g3_resView.lootTable[req.rer[i].t] += req.rer[i].c * building.get_HitpointsPercent();
                                    }
                                }
                            }

                            /* already cached defense units? */
                            if(city.m_CityUnits.m_DefenseUnits != null)
                            {
                                var units = city.m_CityUnits.m_DefenseUnits.l.length;

                                for (var pos = 0; pos < units; pos++)
                                {
                                    var unit = city.m_CityUnits.m_DefenseUnits.l[pos];
                                    var req = unit.m_UnitLevelRequirements;

                                    for(var i=0; i < req.rer.length; i++)
                                    {
                                        g3_resView.lootTable[req.rer[i].t] += req.rer[i].c * unit.get_HitpointsPercent();
                                    }
                                }
                            }
                        }

                        if(city.m_ResourceLayout != null)
                        {
                            for (var y=0; (y < 8); y++)
                            {
                                var typeStr = "";

                                for (var x=0; (x < 9); x++)
                                {
                                    var type = ' ';
                                    var terrainType=((city.m_ResourceLayout[y] >> ((3 * x) & 0x1f)) & ClientLib.Data.ECityTerrainType.WATER);

                                    switch (terrainType)
                                    {
                                        case ClientLib.Data.ECityTerrainType.NONE:
                                        {
                                            type = ' ';
                                            break;
                                        }
                                        case ClientLib.Data.ECityTerrainType.CRYSTAL:
                                        {
                                            type = 'C';
                                            break;
                                        }
                                        case ClientLib.Data.ECityTerrainType.TIBERIUM:
                                        {
                                            type = 'T';
                                            break;
                                        }
                                        case ClientLib.Data.ECityTerrainType.BLOCKED:
                                        {
                                            type = 'B';
                                            break;
                                        }
                                        case ClientLib.Data.ECityTerrainType.FOREST:
                                        {
                                            type = 'F';
                                            break;
                                        }
                                        case ClientLib.Data.ECityTerrainType.BRIAR:
                                        {
                                            type = 'b';
                                            break;
                                        }
                                        case ClientLib.Data.ECityTerrainType.SWAMP:
                                        {
                                            type = 'S';
                                            break;
                                        }
                                        case ClientLib.Data.ECityTerrainType.WATER:
                                        {
                                            type = 'W';
                                            break;
                                        }
                                        default:
                                        {
                                            type = '?';
                                            break;
                                        }
                                    }

                                    g3_resView.tableData[x][y] = type;
                                    typeStr = typeStr + type;
                                }
                            }
                        }
                    } catch (e) {
                        console.log("g3_resView [1]: ", e);
                    }
                }
            };

            if (!webfrontend.gui.region.RegionCityMenu.prototype.__g3_resView_real_showMenu) {
                webfrontend.gui.region.RegionCityMenu.prototype.__g3_resView_real_showMenu =
                webfrontend.gui.region.RegionCityMenu.prototype.showMenu;

                console.log("g3_resView initialized");
            }

            var g3_imgEmpty = ClientLib.File.FileManager.GetInstance().GetPhysicalPath("ui/menues/main_menu/misc_empty_pixel.png");
            var g3_imgTiberium = ClientLib.File.FileManager.GetInstance().GetPhysicalPath("ui/common/icn_res_tiberium.png");
            var g3_imgCrystal = ClientLib.File.FileManager.GetInstance().GetPhysicalPath("ui/common/icn_res_chrystal.png");
            var g3_imgCredits = ClientLib.File.FileManager.GetInstance().GetPhysicalPath("ui/common/icn_res_dollar.png");
            var g3_imgResearch = ClientLib.File.FileManager.GetInstance().GetPhysicalPath("ui/common/icn_res_research.png");


            webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function(selected_base) {
                try {
                    for (var i in this) {
                        try {
                            if (this[i] && this[i].basename == "Composite")
                            {
                                if(!g3_resView.font)
                                {
                                    g3_resView.font = new qx.bom.Font( 7, [ "Courier New", "Arial" ]);
                                }

                                if(!g3_resView.resourceComposite) {
                                    g3_resView.resourceComposite = new qx.ui.container.Composite();
                                    g3_resView.resourceComposite.setLayout(new qx.ui.layout.VBox(5));
                                    g3_resView.resourceComposite.setTextColor("white");
                                    
                                    g3_resView.labelRes = new qx.ui.basic.Label("Ressourcen");
                                    
                                    g3_resView.labelRes.setFont("font_size_14_bold");
                                    
                                    g3_resView.labelMap = new qx.ui.basic.Label().set({
                                        value: "",
                                        rich : true,
                                    });
                                    
                                    g3_resView.resourceComposite.add(g3_resView.labelRes);
                                    g3_resView.resourceComposite.add(g3_resView.labelMap);

                                    webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance().add(g3_resView.resourceComposite);
                                    webfrontend.gui.region.RegionCityStatusInfoOwn.getInstance().add(g3_resView.resourceComposite);
                                    webfrontend.gui.region.RegionCityStatusInfoAlliance.getInstance().add(g3_resView.resourceComposite);
                                    webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance().add(g3_resView.resourceComposite);
                                    webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance().add(g3_resView.resourceComposite);
                                }
                                

                                /* unfortunately every base type has its own tooltip. add our rendered data to the current one */
                                switch (selected_base.get_VisObjectType()) 
                                {
                                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                                        g3_resView.updateLayout(selected_base);
                                        break;
                                        
                                    default:
                                        console.log("g3_resView unsupported type: " + selected_base.get_VisObjectType());
                                        this.__g3_resView_real_showMenu(selected_base);
                                        return;
                                }

                                try 
                                {
                                    /* first get the number of spots */
                                    var cntTiberium = 0;
                                    var cntCrystal = 0;

                                    for (var y=0; (y < 8); y++)
                                    {
                                        for (var x=0; (x < 9); x++)
                                        {
                                            switch(g3_resView.tableData[x][y])
                                            {
                                                case 'T':
                                                    cntTiberium++;
                                                    break;
                                                case 'C':
                                                    cntCrystal++;
                                                    break;
                                            }
                                        }
                                    }

                                    /* then plot them */
                                    var richString = '<table border="0" cellspacing="0" cellpadding="0">';
                                    for (var y=0; (y < 8); y++)
                                    {
                                        richString = richString + "<tr>";
                                        for (var x=0; (x < 9); x++)
                                        {
                                            var img = "";
                                            switch(g3_resView.tableData[x][y])
                                            {
                                                case 'T':
                                                    img = '<img width="14" height="14" src="'+g3_imgTiberium+'">';
                                                    break;
                                                case 'C':
                                                    img = '<img width="14" height="14" src="'+g3_imgCrystal+'">';
                                                    break;
                                                default:
                                                    img = '<img width="14" height="14" src="'+g3_imgEmpty+'">';
                                                    break;
                                            }
                                            richString = richString + "<td>" + img + "</td>";
                                        }

                                        /* oh and add the raidable resources, too */
                                        switch(y)
                                        {
                                            case 0:
                                                richString = richString + '<td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><img width="14" height="14" src="'+g3_imgTiberium+'"></td><td align="right">&nbsp;&nbsp;<b>'+g3_formatNumber(g3_resView.getTiberium())+'</b></td>';
                                                break;
                                            case 1:
                                                richString = richString + '<td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><img width="14" height="14" src="'+g3_imgCrystal+'"></td><td align="right">&nbsp;&nbsp;<b>'+g3_formatNumber(g3_resView.getCrystal())+'</b></td>';
                                                break;
                                            case 2:
                                                richString = richString + '<td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><img width="14" height="14" src="'+g3_imgCredits+'"></td><td align="right">&nbsp;&nbsp;<b>'+g3_formatNumber(g3_resView.getCredits())+'</b></td>';
                                                break;
                                            case 3:
                                                richString = richString + '<td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><img width="14" height="14" src="'+g3_imgResearch+'"></td><td align="right">&nbsp;&nbsp;<b>'+g3_formatNumber(g3_resView.getResearch())+'</b></td>';
                                                break;
                                            case 5:
                                                richString = richString + '<td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><img width="14" height="14" src="'+g3_imgTiberium+'">x'+cntTiberium+'</td>';
                                                break;
                                            case 6:
                                                richString = richString + '<td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><img width="14" height="14" src="'+g3_imgCrystal+'">x'+cntCrystal+'</td>';
                                                break;
                                        }
                                        richString = richString + "</tr>";
                                    }
                                    richString = richString + "</table>";

                                    g3_resView.labelMap.setValue(richString);
                                }
                                catch(e) {
                                    console.log("failed: " + e);
                                }
                                break;

                            }
                        } catch (e) {
                            console.log("g3_resView [2]: ", e);
                        }
                    }
                }
                catch (e)
                {
                    console.log("g3_resView [3]: ", e);
                }
                this.__g3_resView_real_showMenu(selected_base);
            }
        }

        function g3_formatNumber(number)
        {
            var scalings = [ '', 'k', 'M', 'G', 'T'];
            var scaling = 0;

            while(number > 1000)
            {
                scaling++;
                number /= 1000;
            }

            return (Math.round(number*10)/10) + " " + scalings[scaling];
        }

        function g3_resViewCheck() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication())
                {
                    g3_resViewCreate();
                    return;
                }

                window.setTimeout( g3_resViewCheck, 1000);
            }
            catch (e)
            {
                if (typeof console != 'undefined') console.log(e);
                else if (window.opera) opera.postError(e);
                else GM_log(e);
            }
        }

        window.setTimeout(g3_resViewCheck, 1000);
    }

    try {
        var inj = document.createElement("script");
        txt = g3_resViewMain.toString();
        inj.innerHTML = "(" + txt + ")();";
        inj.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(inj);
    }
    catch (e)
    {
        console.log("g3_resView init error: ", e);
    }
})();
