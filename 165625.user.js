// ==UserScript==
// @name Tiberium Alliances BaseNavBar Reorderer
// @description Allows you to set a custom order for your bases in the Base Navigation Bar.
// @namespace basenav_reorder
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.0
// @author KRS_L
// ==/UserScript==
(function () {
	var BaseNavReorder_main = function () {
		var reorderWindow = null;
		var baseList = null;
		var bases = null;
		var myOrder = null;
		var reorderInterval = 500;
		function createBaseNavReorder() {
			try {
				console.log('Base Navigation Bar Reorderer loaded');
				var baseTimerBar = qx.core.Init.getApplication().getGlobalBaseTimerBar().getChildren()[1];
				var btnToggleWindow=new qx.ui.form.Button("").set({toolTipText:"Reorder Bases"});
				baseTimerBar.add(btnToggleWindow);
				reorderWindow = new qx.ui.window.Window("BaseNavBar Reorderer", "").set({
					contentPaddingTop: 0,
					contentPaddingBottom: 7,
					contentPaddingRight: 7,
					contentPaddingLeft: 7,
					width: 200,
					showMaximize: false,
					showMinimize: false,
					allowMaximize: false,
					allowMinimize: false,
					resizable: false
				});
				reorderWindow.setLayout(new qx.ui.layout.Canvas());

				baseList = new qx.ui.form.List;
				baseList.set({ height: 300, width: 150, selectionMode : "single" });
				var btnMoveUp=new qx.ui.form.Button("↑").set({height:40,toolTipText:"Move Up"});
				var btnMoveDown=new qx.ui.form.Button("↓").set({height:40,toolTipText:"Move Down"});

				reorderWindow.add(btnMoveUp, {
					top: 105,
					right: 3
				});
				reorderWindow.add(btnMoveDown, {
					bottom: 110,
					right: 3
				});

				reorderWindow.add(baseList);
				myOrder = localStorage.ta_basenavbar_baseorder;
				if (!myOrder) {
					myOrder = getAllBases();
					localStorage.ta_basenavbar_baseorder = JSON.stringify(myOrder);
				}
				btnToggleWindow.addListener("click", toggleReorderWindow, this);
				btnMoveUp.addListener("click", moveUp, this);	
				btnMoveDown.addListener("click", moveDown, this);
				reorder();
			} catch (e) {
				console.log("createBaseNavReorder: ", e);
			}
		}

		function moveUp() {
			try {
				if (baseList.getSelection()[0] !== null) {
					var curIndex = baseList.indexOf(baseList.getSelection()[0]);
					if (curIndex > 0) baseList.addAt(baseList.getSelection()[0],curIndex-1);
					saveOrder();
				}
			} catch (e) {
				console.log(e);
			}
		}

		function moveDown() {
			try {
				if (baseList.getSelection()[0] !== null) {
					var curIndex = baseList.indexOf(baseList.getSelection()[0]);
					if (curIndex < baseList.getChildren().length) baseList.addAt(baseList.getSelection()[0],curIndex+1);
					saveOrder();
				}
			} catch (e) {
				console.log(e);
			}
		}
	
		function saveOrder() {
			try {
				myOrder = [];
				for (var y in baseList.getChildren()) {
					myOrder.push(translateNameToId(baseList.getChildren()[y].getLabel()));
				}
				localStorage.ta_basenavbar_baseorder = JSON.stringify(myOrder);
			} catch (e) {
				console.log(e);
			}
		}

		function toggleReorderWindow() {
			try {
				if (reorderWindow.isVisible()) {
					reorderWindow.close();
					baseList.removeAll();
				} else {
					var reorderWindowLeft = qx.bom.Viewport.getWidth(window) - window.qx.core.Init.getApplication().getGlobalBaseTimerBar().getWidth() - reorderWindow.getWidth();
					var reorderWindowTop = window.qx.core.Init.getApplication().getGlobalBaseTimerBar().getHeight();
					reorderWindow.moveTo(reorderWindowLeft, reorderWindowTop);
					var item;
					myOrder = JSON.parse(localStorage.ta_basenavbar_baseorder);
					var newBases = getAllBases(); 
					for (var j in myOrder) {
						for (var i in newBases) {
							if (myOrder[j] === newBases[i]) {
								newBases.splice(i, 1);
								continue;
							}
						}
					}
					myOrder = myOrder.concat(newBases);
					reorderWindow.open();
					for (var x in myOrder) {
						item = new qx.ui.form.ListItem(translateIdToName(myOrder[x]));
						baseList.add(item);
					}
				}
			} catch (e) {
				console.log(e);
			}
		}

		function reorder() {
			try {
				var baseNavigationBar = qx.core.Init.getApplication().getBaseNavigationBar().getChildren()[0].getChildren()[0];
				var baseButtons = baseNavigationBar.getChildren();
				myOrder = JSON.parse(localStorage.ta_basenavbar_baseorder);

				for (var i = myOrder.length; i > -1 ; i--) {
					for (var x in baseButtons) {
						if (typeof baseButtons[x].getChildren()[1].getChildren === 'function') {
							var navigationButton = baseButtons[x].getChildren()[1].getChildren()[0].getChildren()[2];
							if (navigationButton.getValue() === translateIdToName(myOrder[i])) {
								baseNavigationBar.addAt(baseButtons[x],0);
							}
						}
					}
				}
				window.setTimeout(reorder, reorderInterval);
			} catch (e) {
				console.log(e);
			}
		}

		function getAllBases() {
			try {
				bases = [];
				var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
				for (var cityId in cities) {
					bases.push(cityId);
				}
				return bases;
			} catch (e) {
				console.log(e);
			}
		}

		function translateIdToName(id) {
			try {
				var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
				for (var cityId in cities) {
					if (cityId === id) {
						return cities[cityId].get_Name();
					}
				}
			} catch (e) {
				console.log(e);
			}
		}

		function translateNameToId(name) {
			try {
				var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
				for (var city in cities) {
					if (cities[city].get_Name() === name) {
						return city;
					}
				}
			} catch (e) {
				console.log(e);
			}
		}
	
		function BaseNavReorder_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getGlobalBaseTimerBar() && qx.core.Init.getApplication().getBaseNavigationBar()) {
					createBaseNavReorder();
				} else {
					window.setTimeout(BaseNavReorder_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("BaseNavReorder_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(BaseNavReorder_checkIfLoaded, 1000);
		}
	}

	try {
		var BaseNavReorder = document.createElement("script");
		BaseNavReorder.innerHTML = "(" + BaseNavReorder_main.toString() + ")();";
		BaseNavReorder.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(BaseNavReorder);
		}
	} catch (e) {
		console.log("BaseNavReorder: init error: ", e);
	}
})();