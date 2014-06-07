// ==UserScript==
// @name        C&C Tiberium Alliances United-Forum Raidhelper
// @namespace   Mooff
// @description Removes name and level information except for interesting raidtargets
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx
// @version     0.1
// @author      Mooff
// ==/UserScript==
/* Thanks to Topper42 for his help via the EA API Knowledgebase */
function initHideCampsButton(){
    
    var minimumlevel = 0;
    var HCBtn = new qx.ui.form.Button("Clear View");
    
    HCBtn.set({ width: 80, 
               appearance: "button-text-small",
               toolTipText: "Makes interesting targets more visible"
              });
    
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
    
    var app = qx.core.Init.getApplication();
    app.getDesktop().add(HCBtn, {
        right: 125,
        bottom:55,
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
    
};
startup();