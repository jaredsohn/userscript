// ==UserScript==
// @name        C&C: TA Raidhelper
// @namespace   termnml
// @description Filters name and level information except for interesting raidtargets
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.0
// @author      termnml
// @icon		https://prodgame09.alliances.commandandconquer.com/171/favicon.ico
// ==/UserScript==
/* Thanks to Topper42 for his help via the EA API Knowledgebase */
/* Thanks to Mooff for the forkbase http://userscripts.org/scripts/show/203613 */
function initHideCampsButton(){
    
    var minimumlevel = 0;
    var HCshow = new qx.ui.form.Button("Show all");
    var HCBtn = new qx.ui.form.Button("LVL");
    var HCop = new qx.ui.form.Button("OP");
    var HCcust = new qx.ui.form.Button("Custom");
    var HCsett = new qx.ui.form.Button("Settings");
    
    
    HCshow.set({ width: 95,
               height: 15,
               appearance: "button-text-small",
               toolTipText: "Shows all Targets"
              });
    HCBtn.set({ width: 46,
               height: 15,
               appearance: "button-text-small",
               toolTipText: "Shows Targets based on Level"
              });
    HCop.set({ width: 46,
               height: 15,
               appearance: "button-text-small",
               toolTipText: "Shows Outposts"
              });
    HCcust.set({ width: 95,
               height: 15,
               appearance: "button-text-small",
               toolTipText: "Shows Targets based on Custom Settings"
              });
    HCsett.set({ width: 95,
               height: 15,
               appearance: "button-text-small",
               toolTipText: "Shows Settings for Custom View"
              });
    
    HCshow.addListener("click",function(){
        var currCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
        var x = currCity.get_X();
        var y = currCity.get_Y();
        var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
        var attackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();

        if (minimumlevel == 0)
        {
            minimumlevel =  Math.floor(currCity.get_LvlOffense()); 
        }
        
        for (var i = x - (attackDistance); i < (x+attackDistance); i++)
        {
            for (var j = y - attackDistance; j < (y+attackDistance); j++)
            {
                var visObject = region.GetObjectFromPosition(i * region.get_GridWidth(),j * region.get_GridHeight());
                if(visObject != null)
                {
                    
                    if (visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp)
                    {
                        
                        if ( Math.round(visObject.get_BaseLevelFloat()) + 1 < minimumlevel)
                        {
                            visObject.ShowInfos();
                        }
                    }
                    else if(visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType || 
                            visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest)
                    {
                        visObject.ShowInfos();
                    }
                }
            }      
        }
    },this);
    
    HCBtn.addListener("click",function(){
        var currCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
        var x = currCity.get_X();
        var y = currCity.get_Y();
        var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
        var attackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();

        if (minimumlevel == 0)
        {
            minimumlevel =  Math.floor(currCity.get_LvlOffense()); 
        }
        
        for (var i = x - (attackDistance); i < (x+attackDistance); i++)
        {
            for (var j = y - attackDistance; j < (y+attackDistance); j++)
            {
                var visObject = region.GetObjectFromPosition(i * region.get_GridWidth(),j * region.get_GridHeight());
                if(visObject != null)
                {
                    
                    if (visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp)
                    {
                        
                        if ( Math.round(visObject.get_BaseLevelFloat()) + 1 < minimumlevel)
                        {
                            visObject.HideInfos();
                        }
                    }
                    else if(visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType || 
                            visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest)
                    {
                        visObject.HideInfos();
                    }
                }
            }      
        }
    },this);
    
    HCop.addListener("click",function(){
        var currCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
        var x = currCity.get_X();
        var y = currCity.get_Y();
        var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
        var attackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();

        if (minimumlevel == 0)
        {
            minimumlevel =  Math.floor(currCity.get_LvlOffense()); 
        }
        
        for (var i = x - (attackDistance); i < (x+attackDistance); i++)
        {
            for (var j = y - attackDistance; j < (y+attackDistance); j++)
            {
                var visObject = region.GetObjectFromPosition(i * region.get_GridWidth(),j * region.get_GridHeight());
                if(visObject != null)
                {
                    
                    if (visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp)
                    {
                        
                        if ( Math.round(visObject.get_BaseLevelFloat()) + 1 < minimumlevel)
                        {
                            visObject.HideInfos();
                        }
                    }
                    else if(visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType || 
                            visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest)
                    {
                        visObject.HideInfos();
                    }
                }
            }      
        }
    },this);
    
    var app = qx.core.Init.getApplication();
    app.getDesktop().add(HCshow, {
        right: 120,
        bottom:60,
    });
    app.getDesktop().add(HCBtn, {
        right: 170,
        bottom:40,
    });
    app.getDesktop().add(HCop, {
        right: 120,
        bottom:40,
    });
    app.getDesktop().add(HCcust, {
        right: 120,
        bottom:20,
    });
    app.getDesktop().add(HCsett, {
        right: 120,
        bottom:0,
    });
    
}
/*Main*/
function waitForClientLib(){
    
    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    webfrontend = unsafeWindow["webfrontend"];
	
    if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
    {
        setTimeout(waitForClientLib, 1000);
        return;
    }
    else{    
        initHideCampsButton();
    }
    
}
function startup(){
    
	setTimeout(waitForClientLib, 1000);
    
}
startup();
