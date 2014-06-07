// ==UserScript==
// @name        C&C Tiberium Alliances New Raidhelper
// @namespace   alexos75
// @description Removes name and level information except for interesting raidtargets. You can now toggle the display. By editing lowerRange and upperRange you can modify the range of visible targets.
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx
// @version     0.2
// @author      alexos75
// ==/UserScript==
/* Based on the script of Mooff */
function initHideCampsButton(){
    
	// section for settings ->
	var lowerRange = 2;
        var upperRange = 99;
	var hideColleaquesInfos = true;
	var hidePoiInfos = true;
	// <- section for settings
	
	var activeText = "Clear View";
	var inactiveText = "Show All";
    var minimumlevel = 0;
	var maximumlevel = 0;
	var HCBtn = new qx.ui.form.Button(activeText);
	var active = false;
    
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
		active = !active;
		
		minimumlevel =  Math.floor(currCity.get_LvlOffense() - lowerRange); 
		maximumlevel =  Math.floor(currCity.get_LvlOffense() + upperRange); 
        
        
        for (var i = x - (attackDistance); i < (x+attackDistance); i++)
        {
            for (var j = y - attackDistance; j < (y+attackDistance); j++)
            {
                var visObject = region.GetObjectFromPosition(i * region.get_GridWidth(),j * region.get_GridHeight());
                if(visObject != null)
                {
                    
                    if (visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp)
                    {
                        var lvl = Math.round(visObject.get_BaseLevelFloat()) + 1;
						
                        if ( lvl < minimumlevel || lvl > maximumlevel )
                        {
                            if( active)
							{
								visObject.HideInfos();
							}
							else
							{
								visObject.ShowInfos();
							}
								
                        }
                    }
                    else if( (visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType && hideColleaquesInfos) || 
                            (visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest && hidePoiInfos))
                    {
                        if( active)
						{
							visObject.HideInfos();
						}
						else
						{
							visObject.ShowInfos();
						}
                    }
                }
            }      
        }
		
		if( active)
		{
			HCBtn.set({ label : inactiveText })
		}
		else
		{
			HCBtn.set({ label : activeText })
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