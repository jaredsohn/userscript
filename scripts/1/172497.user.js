// ==UserScript==
// @name       Rep Zeit
// @namespace  Rep Zeit
// @version    0.1a 
// @description  Based on Maelstrom Dev Tools, new repair time label.
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @Omi
// ==/UserScript==

(function () {
  var InfoSticker_main = function () {
    try {
      function CCTAWrapperIsInstalled() {
        return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
      }
      function createInfoSticker() {
        console.log('InfoSticker loaded');
        // define Base
        qx.Class.define("InfoSticker.Base", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            /* Desktop */
			masterTimerInterval: 1000,
            initialize: function () {
              try {
                this.runMainTimer();
              } catch (e) {
                console.log("InfoSticker.initialize: ", e);
              }
            },
			checkPackageCounter: 0,
			checkPackageInterval: 5,
			mcvCounter: 0,
			mcvInterval: 1,
			runMainTimer: function () {
              try {
                var self = this;
                if(++this.mcvCounter==this.mcvInterval) {
					this.mcvCounter = 0;
					this.calculateCostsForNextMCV();
				}
                window.setTimeout(function () {
                  self.runMainTimer();
                }, this.masterTimerInterval);
              } catch (e) {
                console.log("InfoSticker.runMainTimer: ", e);
              }
            },
            mcvPopup: null,
            mcvTimerLabel: null,
            mcvInfoLabel: null,
			
            repairPopup: null,
            repairTimerLabel: null,
            repairTimerLabel1: null,
            repairTimerLabel2: null,
            repairTimerLabel3: null,
            repairInfoLabel: null,
			
            calculateCostsForNextMCV: function () {
              try {
                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                var cw = player.get_Faction();
                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                var cr = player.get_PlayerResearch();
                var cd = cr.GetResearchItemFomMdbId(cj);
                if (!this.mcvPopup) {
                  this.mcvPopup = new qx.ui.popup.Popup(new qx.ui.layout.VBox()).set({
                    padding: 5,
                  });
                  this.mcvPopup.setPlaceMethod("widget");
                  this.mcvPopup.setPosition("left-center");
                  this.mcvPopup.setAutoHide(false);
                  this.mcvPopup.setBackgroundColor("#999999");
                  this.mcvPopup.setOpacity(0.8);
                  this.mcvPopup.setShadow(null);
                  this.mcvPopup.setDecorator(new qx.ui.decoration.Background());
                  var target = this.repairPopup;
				  if(target==null) target = qx.core.Init.getApplication().getBaseNavigationBar();
                  this.mcvPopup.placeToWidget(target, true);
                  this.mcvInfoLabel = new qx.ui.basic.Label();
                  var font = qx.bom.Font.fromString('bold').set({ size: 12 });
                  var font2 = qx.bom.Font.fromString('bold').set({ size: 12 });
                  this.mcvTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: '#000000',
                    height: 15,
                    width: 75,
                    textAlign: 'center'
                  });
                  //this.mcvPopup.add(this.mcvInfoLabel);
                  //this.mcvPopup.add(this.mcvTimerLabel);
				  
		  this.repairInfoLabel = new qx.ui.basic.Label();
                  this.repairTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: '#000000',
                    height: 15,
                    width: 75,
                    textAlign: 'center'
                  });
                  this.repairTimerLabel1 = new qx.ui.basic.Label().set({
                    font: font2,
                    textColor: '#000000',
                    height: 15,
                    width: 75,
                    textAlign: 'center'
                  });
                  this.repairTimerLabel2 = new qx.ui.basic.Label().set({
                    font: font2,
                    textColor: '#000000',
                    height: 15,
                    width: 75,
                    textAlign: 'center'
                  });
                  this.repairTimerLabel3 = new qx.ui.basic.Label().set({
                    font: font2,
                    textColor: '#000000',
                    height: 15,
                    width: 75,
                    textAlign: 'center'
                  });
                  this.mcvPopup.add(this.repairInfoLabel);
                  this.mcvPopup.add(this.repairTimerLabel);
                  //this.mcvPopup.add(this.repairTimerLabel1);
                  //this.mcvPopup.add(this.repairTimerLabel2);
                  //this.mcvPopup.add(this.repairTimerLabel3);
                }
				if (cd == null) {
                  if (this.mcvPopup) {
					this.mcvInfoLabel.setValue("Next MCV ($???)");
					this.mcvTimerLabel.setValue("Error");
                  }
                } else {
					var nextLevelInfo = cd.get_NextLevelInfo_Obj();
					var resourcesNeeded = new Array();
					for (var i in nextLevelInfo.rr) {
					  if (nextLevelInfo.rr[i].t > 0) {
						resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
					  }
					}
					//var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
					//var currentResearchPoints = player.get_ResearchPoints();
					var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
					var creditsResourceData = player.get_Credits();
					var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
					var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
					
					this.mcvInfoLabel.setValue("Next MCV ($ " + this.formatNumbersCompact(creditsNeeded) + ")");
					if(creditTimeLeftInHours <= 0) {
						this.mcvTimerLabel.setValue("Ready");
					} else if(creditGrowthPerHour == 0) {
						this.mcvTimerLabel.setValue("Never");
					} else {
						this.mcvTimerLabel.setValue(this.FormatTimespan(creditTimeLeftInHours * 60 * 60));
					}
				}
				
				var ncity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                if (ncity == null) {
                  if (this.mcvPopup) {
				    this.repairInfoLabel.setValue("Reperaturzeit");
					this.repairTimerLabel.setValue("wähle eine Base");
                  }
                } else {
					this.repairInfoLabel.setValue("Reperaturzeit");
					
					var rt = Math.min(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
										ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
										ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
					if(ncity.get_CityUnitsData().get_UnitLimitOffense() == 0) {
						this.repairTimerLabel.setValue("keine Off");
					} else {
						this.repairTimerLabel.setValue(this.FormatTimespan(rt));
						this.repairTimerLabel1.setValue(this.FormatTimespan(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf)));
						this.repairTimerLabel2.setValue(this.FormatTimespan(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh)));
						this.repairTimerLabel3.setValue(this.FormatTimespan(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir)));
					}
				}
 				if (!this.mcvPopup.isVisible()) {
				  this.mcvPopup.show();
				}
             } catch (e) {
                console.log("calculateCostsForNextMCV", e);
              }
            },
              formatNumbersCompact: function(value) {
                  if(value < 10 * 1000) return value.toString();
                  if(value < 10 * 1000 * 1000) return (value/1000).toString()+"k";
                  if(value < 10 * 1000 * 1000 * 1000) return (value/1000000).toString()+"M";
                  else return (value/1000000).toString()+"G";
              },
			FormatTimespan: function(value) {
				var t = ClientLib.Vis.VisMain.FormatTimespan(value);
				var colonCount = 0;
				for(var i=0;i<t.length;i++) {
					if(t.charAt(i) == ':') colonCount++;
				}
				var r = "";
				for(var i=0;i<t.length;i++) {
					if(t.charAt(i) == ':') {
						if(colonCount>2) {
							r+="d ";
						}
						else {
							r+=t.charAt(i);
						}
						colonCount--;
					} else {
						r+=t.charAt(i);
					}
				}
			  return r;
			}
          }
        });
      }
    } catch (e) {
      console.log("createInfoSticker: ", e);
    }
    function InfoSticker_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createInfoSticker();
          window.InfoSticker.Base.getInstance().initialize();
        } else {
          window.setTimeout(InfoSticker_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("InfoSticker_checkIfLoaded: ", e);
      }
    }
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(InfoSticker_checkIfLoaded, 1000);
    }
  }
  try {
    var InfoStickerScript = document.createElement("script");
    InfoStickerScript.innerHTML = "(" + InfoSticker_main.toString() + ")();";
    InfoStickerScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(InfoStickerScript);
    }
  } catch (e) {
    console.log("InfoSticker: init error: ", e);
  }
})();