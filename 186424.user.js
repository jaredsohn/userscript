// ==UserScript==
// @name           Modified Base Stats Info with Octave Plot Function
// @author         sir3, modified from Wildcard's Base Stats Info Script
// @description    Alt+Y - Insert to message/chat/post all your bases/cities info. Alt+S - Insert Octave code for plotting Score/Rank/RP... graphs over time.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        2.9
// ==/UserScript==
(function () {
  var TAI_main = function () {
    function createInstance() {
      qx.Class.define("TAI", { //TAS.main
        type : "singleton",
        extend : qx.core.Object,
        members : {
          initialize : function () {
            addEventListener("keyup", this.onKey, false);
            console.log("TA Info loaded.");
          },
          onKey : function (ev) {
            var s = String.fromCharCode(ev.keyCode);
            var inputField = document.querySelector('input:focus, textarea:focus');
            if (inputField != null) {
              // ALT+
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "Y") {
                // player bases info to share with others

                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;//all player cities
                var txt = "", c, unitData, supp, type, dif;
                for (var key in apc) {
                  c = apc[key];
                  txt += "[coords]" + c.get_PosX() + ":" + c.get_PosY() + ":" + c.get_Name() + "[/coords]: ";
                  txt += "Base: [b]" + ('0' + c.get_LvlBase().toFixed(2)).slice(-5) + "[/b] ";
                  txt += "Off: [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] ";
                  txt += "Def: [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b] "; 
                   unitData = c.get_CityBuildingsData();
                   supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (supp !== null) {
                    txt += supp.get_TechGameData_Obj().dn.slice(0, 3) + ": [b]" + supp.get_CurrentLevel() + "[/b] ";
                  }
                  txt += "[i][b]Dif: " + (dif = ('0' + c.get_LvlDefense().toFixed(2).slice(-5) - c.get_LvlBase().toFixed(2).slice(-5)).toFixed(2)) + "[/b][/i]";  
                  txt += "[hr]";
                }
                inputField.value += txt;
              } else if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "S") {
				var rp = ClientLib.Data.MainData.GetInstance().get_Player();

                var player = ClientLib.Data.MainData.GetInstance().get_Player();
			    var cr = player.get_PlayerResearch();
                var cw = player.get_Faction();
                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                var cd = cr.GetResearchItemFomMdbId(cj);
                var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                var resourcesNeeded = new Array();
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];

				// Add target point
				// alert(getMethods(rp).join("\n"));
				
				var txt = (
				"try; load cnc; break; catch; cnc.title={'Time' 'Score' 'Rank' 'RP' 'Cash'}; end;" +
				"data= [" +
				ClientLib.Data.MainData.GetInstance().get_Time().GetData() / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour()/24/1000+" "+
				rp.get_ScorePoints()+" " +
				rp.get_OverallRank()+" " +
				rp.get_ResearchPoints()+" " +
				rp.GetCreditsCount()+" " +
				//rp.get_Credits()+" "+
				"]; try; cnc.data(1,1); cnc.data=[cnc.data; data]; break; catch; cnc.data = data; end; "+
				"cnc.limits=max(cnc.data); cnc.limits(4) = "+researchNeeded+"; cnc.limits(5)=" + creditsNeeded+"; "+
				"cnc.stepsPerHour="+ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour()+"; "+
				"cnc.xdata=linspace(0, cnc.data(size(cnc.data,1),1)-cnc.data(1,1),1280); "+
				"figure('Position', [100,100, 850, 1100]); "+
				"for (i=[3:max(size(cnc.title))]); subplot(max(size(cnc.title))-2,1,i-2); plot(cnc.xdata, interp1(cnc.data(:,1)-cnc.data(1,1), cnc.data(:,i), cnc.xdata,'pchip'),cnc.data(:,1)-cnc.data(1,1), cnc.data(:,i),['gx;' cnc.title{1,i} ';']); title(cnc.title{1,i}); if (i>3); if (size(cnc.data,1)>4); hold on; ax = axis; xcur = cnc.data(size(cnc.data,1))-cnc.data(1,1); xroot = cnc.data(size(cnc.data,1)-3,1)-cnc.data(1,1); ycur = cnc.data(size(cnc.data,1),i); yroot = cnc.data(size(cnc.data,1)-3,i); dx = xcur - xroot; dy = ycur - yroot; if (dy>0);	xmcv = xroot + (cnc.limits(i)-yroot)/dy*dx; ymcv = cnc.limits(i); if (dy>0); plot( [ax(1) xmcv], [ymcv ymcv], 'color', [0.5 0.5 0.5] ); plot( [xmcv xmcv], [yroot ymcv], 'r-' ); plot( [xroot xmcv], [yroot ymcv], 'r-' ); plot( [xroot xcur], [yroot ycur], 'rx' ); endif; hold off; legend('Interpolation','Data Point','Next MCV','Linear Extrapolation'); endif; endif; endif; xlabel('days'); endfor;"+
				"save cnc;"
				);
                inputField.value += txt;
              }
            }
          }
        } // members
      });
    }

    // Loading
    function TAI_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          if (qx.core.Init.getApplication().getMenuBar() !== null) {
            createInstance();
            TAI.getInstance().initialize();
          } else setTimeout(TAI_checkIfLoaded, 1000);
        } else {
          setTimeout(TAI_checkIfLoaded, 1000);
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
      setTimeout(TAI_checkIfLoaded, 1000);
    }
  };
  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var TAIScript = document.createElement("script");
  var txt = TAI_main.toString();
  TAIScript.innerHTML = "(" + txt + ")();";
  TAIScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TAIScript);
  }
})();