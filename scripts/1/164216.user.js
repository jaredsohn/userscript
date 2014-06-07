// ==UserScript==
// @name Send Resources to all bases
// @description send resources from current city to all others
// @namespace transfer_all
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 0.2
// @author Shing0
// @grant none
// ==/UserScript==

(function () {
  var SendToAll_main = function () {
    var chkbxConfirm = null;
    var resTypeToggle = null;
	var transferQueue = null;
    var transferWindow = null;
    var valueinput = 0;

    function createSendToAll() {
      try {
        console.log('Transfer to all Bases');
        chkbxConfirm = new qx.ui.form.CheckBox("");
		transferWindow = webfrontend.gui.trade.TradeOverlay.getInstance().getLayoutChildren()[13].getLayoutChildren()[1].getLayout()._getLayoutChildren();
        resTypeToggle = transferWindow[1].getLayoutChildren()[2];
        var btnTransferAll=new webfrontend.ui.SoundButton("Send to All").set({width:80,enabled:false});
        valueinput = new qx.ui.form.TextField("").set({width: 120, maxLength: 15});

        chkbxConfirm.addListener("changeValue", function () {
          btnTransferAll.setEnabled(chkbxConfirm.getValue());
          if (chkbxConfirm.getValue()) performAction('costCalculation');
        }, this);

        resTypeToggle.addListener("changeValue", function () {
          chkbxConfirm.setValue(false);
        }, this);

        btnTransferAll.addListener("click", function () {
          performAction('transfer');
        }, this);

        transferWindow[3].add(btnTransferAll,{right:2,top:100});
        transferWindow[3].add(chkbxConfirm,{right:68,top:104});
        transferWindow[3].add(valueinput,{left:10, top:98});
      } catch (e) {
        console.log("createSendToAll: ", e);
      }
    }

    function performAction(action) {
      try {
        var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
        var ownCity = cities.get_CurrentOwnCity();
        var allCities = cities.get_AllCities().d;
        var isTiberium = resTypeToggle.getValue();
        var costLabel = transferWindow[3].getLayoutChildren()[1].getLayoutChildren()[1].getLayoutChildren()[2];
        var resType = ClientLib.Base.EResourceType.Crystal;
        var transferCost = 0;
        var resAmount;
        
        if (isTiberium) resType = ClientLib.Base.EResourceType.Tiberium;
        var item = [];
        transferQueue = [];

        for (var sourceCity in allCities) {
            var city = allCities[sourceCity];
            var cityname = city.get_Name();
      //      console.log(cityname);
            var blocksend = false;
            
            
            if(cityname.indexOf('.S') !== -1){
            
                //blocksend = true;
                continue;
            
            }
                        
          if (sourceCity == ownCity.get_Id()) continue;
          if(valueinput.getValue() != 0) resAmount = valueinput.getValue();
          //if (allCities[sourceCity].CanTrade() == ClientLib.Data.ETradeError.None && ownCity.CanTrade() == ClientLib.Data.ETradeError.None) {
        if(valueinput.getValue() != 0 && allCities[sourceCity].CanTrade() == ClientLib.Data.ETradeError.None && ownCity.CanTrade() == ClientLib.Data.ETradeError.None){
            
            if (action == 'transfer') {
              item = [allCities[sourceCity],ownCity,resType,resAmount];
              transferQueue.push(item);
            }
            if (action == 'costCalculation') transferCost += allCities[sourceCity].CalculateTradeCostToCoord(ownCity.get_PosX(), ownCity.get_PosY(), resAmount);
          }
           
          
        }
        if (action == 'transfer') {
          chkbxConfirm.setValue(false);
          transfer();
        }
        if (action == 'costCalculation') {
          costLabel.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompactAfterMillion(transferCost));
		  if (transferCost > ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsCount()) costLabel.setTextColor("red");
        }
      } catch (e) {
        console.log("performAction: ", e);
      }
    }
	
    function transfer() {
      try {
        if (transferQueue.length > 0) {
          targetCity = transferQueue[0][0];
          sourceCity = transferQueue[0][1];
          resType = transferQueue[0][2];
          resAmount = transferQueue[0][3];
        
          ClientLib.Net.CommunicationManager.GetInstance().SendCommand ("SelfTrade",{targetCityId:targetCity.get_Id(),sourceCityId:sourceCity.get_Id(),resourceType:resType,amount:resAmount}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, transferResult), null, true);
        }
      } catch (e) {
        console.log("transfer: ", e);
      }
    }

    function transferResult(context, result) {
      try {
        if (result) {
          targetCity = transferQueue[0][0];
          sourceCity = transferQueue[0][1];
          resType = transferQueue[0][2];
          resAmount = transferQueue[0][3];
          
          
          ClientLib.Data.MainData.GetInstance().get_Player().AddCredits(-targetCity.CalculateTradeCostToCoord(sourceCity.get_X(),sourceCity.get_Y(),amount));
          targetCity.AddResources(resourceType,amount);
          sourceCity.AddResources(resourceType,-amount);
        }
        transferQueue.splice(0,1);
        window.setTimeout(transfer, 2000);

      } catch (e) {
        console.log("transferResult: ", e);
      }
    }

    function SendToAll_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          if (ClientLib.Data.MainData.GetInstance().get_Player().get_Faction() !== null) {
            createSendToAll();
          } else {
            window.setTimeout(SendToAll_checkIfLoaded, 1000);
          }
        } else {
          window.setTimeout(SendToAll_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("SendToAll_checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(SendToAll_checkIfLoaded, 1000);
    }
  };

  try {
    var SendToAll = document.createElement("script");
    SendToAll.innerHTML = "(" + SendToAll_main.toString() + ")();";
    SendToAll.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(SendToAll);
    }
  } catch (e) {
    console.log("SendToAll: init error: ", e);
  }
})();