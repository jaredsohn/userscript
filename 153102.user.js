// ==UserScript==
// @name           sks Raid Reporter
// @description    LoU raid report addon
// @namespace      davelou
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.0.0
// ==/UserScript==

(function() {

    var inject = function davelousksrr() {
        var h;
        if (!window.qx || !qx.core.Init || !qx.core.Init.getApplication().initDone || !(h=window.webfrontend))
        {
            window.setTimeout(davelousksrr, 5000);
            return
        }
        
        try {
            var a = qx.core.Init.getApplication();
            var m = h.res.Main.getInstance();
            qx.Class.define("sks.loua.RaidReporter", {
                type: "singleton",
                extend: qx.core.Object,
                members: {
                    dungeonLoot :
                    {
                        "Giant Spider" : 25,
                        "Thief" : 33,
                        "Centaur" : 70,
                        "Troll" : 290,
                        "Skeleton" : 25,
                        "Ghoul" : 33,
                        "Gargoyle" : 135,
                        "Daemon" : 340,
                        "Orc" : 30,
                        "Troglodyte" : 40,
                        "Ettin" : 120,
                        "Minotaur" : 250,
                        "Pirate Dhow" : 75,
                        "Pirate Sloop" : 250,
                        "Pirate Frigate" : 650,
                        "Pirate War Galleon" : 1400
                    },

                    showOverkill:
                    {
                        type: "number",
                        title: "Max Overkill %",
                        width: 35,
                        desc: "Maximum overkill percentage to display",
                        value: "100",
                    },
                    yellowOverkill:
                    {
                        type: "number",
                        title: "Yellow Overkill %",
                        width: 35,
                        desc: "Percentage to show overkill in yellow",
                        value: "90",
                    },
                    redOverkill:
                    {
                        type: "number",
                        title: "Red Overkill %",
                        width: 35,
                        desc: "Percentage to show overkill in red",
                        value: "75",
                    },
                    showUnderkill:
                    {
                        type: "number",
                        title: "Max Underkill %",
                        width: 35,
                        desc: "Maximum underkill percentage to display",
                        value: "100",
                    },
                    yellowUnderkill:
                    {
                        type: "number",
                        title: "Yellow Underkill %",
                        width: 35,
                        desc: "Percentage to show underkill in yellow",
                        value: "80",
                    },
                    redUnderkill:
                    {
                        type: "number",
                        title: "Red Underkill %",
                        width: 35,
                        desc: "Percentage to show underkill in red",
                        value: "60",
                    },

                    interceptOnReport: function(r,fm,fn)
                    {
                        a.getReportPage().sksOriginalOnReport( r,fm,fn );

                        var children = a.getReportPage().reportBody.getChildren();
                        for( var i = 0; i < children.length; i++ )
                        {
                            if( children[i] instanceof qx.ui.core.Spacer )
                            {
                                if(fm.hasOwnProperty("r")&&fm.r!=null && fm.hasOwnProperty("a")&&fm.a!=null)
                                {
                                    var resGain = {
                                        0:0,
                                        1:0,
                                        2:0,
                                        3:0,
                                        4:0
                                    };
                                    var resLoss = {
                                        0:0,
                                        1:0,
                                        2:0,
                                        3:0,
                                        4:0
                                    };
                                    var maxLoot = 0;
                                    var hasDungeonLoot = false;

                                    if(fm.hasOwnProperty("r")&&fm.r!=null)
                                    {
                                        for(var rindex=0;rindex<fm.r.length;rindex++)
                                        {
                                            if(fm.r[rindex].t>=0)
                                            {
                                                resGain[fm.r[rindex].t] = fm.r[rindex].v;
                                            }
                                        }
                                    }
                                    if(fm.hasOwnProperty("a")&&fm.a!=null)
                                    {
                                        for(var armyIndex=0;armyIndex<fm.a.length;armyIndex++)
                                        {
                                            var ku=0;
                                            var ko=fm.a[armyIndex];

                                            if(ko.r==h.base.GameObjects.eArmyRole.Attacker)
                                            {
                                                if(ko.u!=null)
                                                    for(var unitIndex=0;unitIndex<ko.u.length;unitIndex++)
                                                    {
                                                        var unitType=ko.u[unitIndex].t;

                                                        if(!m.units.hasOwnProperty(unitType))
                                                            continue;
                                                        var unitData=m.units[unitType];
                                                        var unitCount=ko.u[unitIndex].o-ko.u[unitIndex].l;

                                                        for(var resIndex in unitData.res)
                                                        {
                                                            resLoss[resIndex] += unitData.res[resIndex]*unitCount;
                                                        }
                                                        resLoss[0] += unitData.g*unitCount;
                                                    }
                                            }
                                            else
                                            {
                                                if( ko.u!=null )
                                                {
                                                    for(unitIndex=0;unitIndex<ko.u.length;unitIndex++)
                                                    {
                                                        unitType=ko.u[unitIndex].t;

                                                        if(!m.units.hasOwnProperty(unitType))
                                                            continue;
                                                        unitData=m.units[unitType];
                                                        if( j.dungeonLoot.hasOwnProperty( unitData.dn ) )
                                                        {
                                                            maxLoot += j.dungeonLoot[unitData.dn] * ko.u[unitIndex].o;
                                                            hasDungeonLoot = true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }


                                    var totalGain = resGain[0]+resGain[1]+resGain[2]+resGain[3]+resGain[4];

                                    var resOutput = new qx.ui.container.Composite();
                                    resOutput.setLayout( new qx.ui.layout.HBox(5) );
                                    for( rindex = 1; rindex <= 5; rindex++ )
                                    {
                                        var actualIndex = rindex == 5 ? 0 : rindex;
                                        var net = resGain[actualIndex] - resLoss[actualIndex];
                                        var rText = new qx.ui.basic.Label();
                                        rText.setAlignY( "middle" );
                                        rText.setRich( true );
                                        rText.setFont( "bold" );
                                        if( net == 0 )
                                        {
                                            rText.setValue( "+0" );
                                        }
                                        else if( net >= 0 )
                                        {
                                            rText.setValue( "+" + h.gui.Util.formatNumbers(net).toString() );
                                            rText.setTextColor( "green" );
                                        }
                                        else
                                        {
                                            rText.setValue( h.gui.Util.formatNumbers(net).toString() );
                                            rText.setTextColor( "red" );
                                        }
                                        var img;
                                        if( rindex == 5 )
                                        {
                                            img = new qx.ui.basic.Image( h.config.Config.getInstance().getUIImagePath("ui/icons_ressource_gold.png") );
                                        }
                                        else
                                        {
                                            var fileInfo = m.getFileInfo(m.resources[rindex].i);
                                            img = new qx.ui.basic.Image( h.config.Config.getInstance().getUIImagePath(fileInfo.url) );
                                        }
                                        img.setWidth(30);
                                        img.setHeight(30);
                                        img.setScale(true);
                                        resOutput.add( img );
                                        resOutput.add( rText );
                                        resOutput.add( new qx.ui.core.Spacer().set({
                                            width:5
                                        }) );
                                    }

                                    var rrHeader = new qx.ui.basic.Label( "RaidReporter:" );
                                    rrHeader.setRich( true );
                                    rrHeader.setAppearance( "textheader_main1_serif" );
                                    a.getReportPage().reportBody.addAt( rrHeader, i++ );
                                    a.getReportPage().reportBody.addAt( resOutput, i++ );

                                    var yellowColor = "#AF7817";
                                    if( hasDungeonLoot )
                                    {
                                        var str = "";
                                        var showText = true;
                                        if( fm.rcc < maxLoot )
                                        {
                                            var percent = (totalGain - resGain[0]) / maxLoot * 100.0;
                                            var col = "green";
                                            if( percent < j.redUnderkill.value )
                                                col = "red";
                                            else if( percent < j.yellowUnderkill.value )
                                                col = yellowColor;
                                            else if( percent > j.showUnderkill.value )
                                                showText = false;

                                            str = "<b style=\"color:" + col + "\">" + parseInt( percent ) + "%  Underkill:</b>  Gained " + percent.toFixed( 2 ) + "% of " + webfrontend.gui.Util.formatNumbers(maxLoot).toString();
                                        }
                                        else
                                        {
                                            percent = maxLoot / fm.rcc * 100.0;
                                            col = "green";
                                            if( percent < j.redOverkill.value )
                                                col = "red";
                                            else if( percent < j.yellowOverkill.value )
                                                col = yellowColor;
                                            else if( percent > j.showOverkill.value )
                                                showText = false;

                                            str = "<b style=\"color:" + col + "\">" + parseInt( percent ) + "%  Overkill:</b>  Only " + percent.toFixed( 2 ) + "% of troops needed for max loot (" + webfrontend.gui.Util.formatNumbers(maxLoot).toString() + ")";
                                        }
                                        if( showText )
                                        {
                                            var txt = new qx.ui.basic.Label();
                                            txt.setRich( true );
                                            txt.setAllowGrowX( true );
                                            txt.setValue( str );
                                            a.getReportPage().reportBody.addAt( txt, i++ );
                                        }
                                    }

                                    a.getReportPage().reportBody.addAt( new qx.ui.core.Spacer().set( {
                                        height:5
                                    } ), i++ );
                                    a.getReportPage().reportBody.addAt( new qx.ui.core.Widget().set({
                                        backgroundColor:"#c4a77b",
                                        height:2,
                                        allowGrowX:true,
                                        marginTop:6
                                    }), i++ );
                                }
                                break;
                            }
                        }
                    },
                    start: function()
                    {
                        var rep = a.getReportPage();
                        rep.sksOriginalOnReport = webfrontend.gui.ReportPage.prototype._onReport;
                        rep._onReport = this.interceptOnReport;
                       
                    },

                    
                }

            });
            var j=sks.loua.RaidReporter.getInstance();
            j.start();

        } catch (e) {
        }
    } // end of inject

    console.info("dave.lou.sksrr inject");
    var script = document.createElement("script");
    script.innerHTML = "(" + inject.toString() + ")();";
    script.type = "text/javascript";
    script.title = "dave.lou.sksrr";
    document.getElementsByTagName("head")[0].appendChild(script);

})();



