// ==UserScript==
// @name Tiberium Alliances - New Resource Trade Window
// @description Implements a new TradeOverlay class, allowing you to select individual, multiple or all bases to transfer resources from
// @namespace NewTradeOverlay
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.4.7
// @author Chiantii
// @updateURL https://userscripts.org/scripts/source/168297.meta.js
// @downloadURL https://userscripts.org/scripts/source/168297.user.js
// ==/UserScript==
(function () {
	var NewTradeOverlay_main = function () {
		console.log('NewTradeOverlay loaded');
		function CreateNewTradeOverlay() {
			qx.Class.undefine("webfrontend.gui.trade.TradeOverlay");
			qx.Class.define("webfrontend.gui.trade.TradeOverlay", {
				type : "singleton",
				extend : webfrontend.gui.OverlayWindow,
				construct : function () {
					webfrontend.gui.OverlayWindow.call(this);
					this.set({
						autoHide : false
					});
					this.clientArea.setLayout(new qx.ui.layout.HBox());
					this.clientArea.setMargin(0);
					this.clientArea.setWidth(464);
					this.setTitle(qx.locale.Manager.tr("tnf:trade window title"));
					this.clientArea.add(new qx.ui.core.Spacer(), {
						flex : 1
					});
					this.clientArea.add(this.tradeWindow());
					this.clientArea.add(new qx.ui.core.Spacer(), {
						flex : 1
					});
					this.tradeConfirmationWidget = new webfrontend.gui.widgets.confirmationWidgets.TradeConfirmationWidget();
				},
				members : {
					activated : false,
					transferWindowTableSelectedRows : null,
					modifier : null,
					tradeWindowTable : null,
					tableColumnModel : null,
					resourceTransferType : null,
					transferAmountTextField : null,
					largeTiberiumImage : null,
					costToTradeLabel : null,
					transferFromBaseLabel : null,
					totalResourceAmount : null,
					selectedRowData : null,
					selectedRow : null,
					tradeButton : null,
					tenPercentButton : null,
					twentyFivePercentButton : null,
					fiftyPercentButton : null,
					seventyFivePercentButton : null,
					oneHundredPercentButton : null,
					resourceSelectionRadioButtons : null,
					selectAllNoneButton : null,
					userDefinedMinimumAmount : -1,
					userDefinedMaxDistance : -1,
					tradeConfirmationWidget : null,
					activate : function () {
						if (!this.activated) {
							ClientLib.Vis.VisMain.GetInstance().PlayUISound("audio/ui/OpenWindow");
							phe.cnc.base.Timer.getInstance().addListener("uiTick", this._onTick, this);
							this.selectedRowData = null;
							this.selectedRow = null;
							this.transferWindowTableSelectedRows = [];
							this.transferAmountTextField.setValue("");
							this.costToTradeLabel.setValue("0");
							this.userDefinedMinimumAmount = -1;
							this.userDefinedMaxDistance = -1;
							this.resourceTransferType = ClientLib.Base.EResourceType.Tiberium;
							this.tradeWindowTable.resetCellFocus();
							this.tradeWindowTable.resetSelection();
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
							this.resourceSelectionRadioButtons.resetSelection();
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
							this.TableRowFilter();
							this.tableColumnModel.sortByColumn(2, true);
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:select all" : "Select All"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:select none" : "Select None"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:cannot manually modify" : "Cannot be modified with multiple rows selected"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:trading with multiple bases" : "Trading with multiple bases"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:percent buttons" : "Please use one of the Percent buttons"
							});
							this.activated = true;
						}
					},
					deactivate : function () {
						if (this.activated) {
							phe.cnc.base.Timer.getInstance().removeListener("uiTick", this._onTick, this);
							this.tradeWindowTable.resetSelection();
							this.tradeWindowTable.resetCellFocus();
							this.transferAmountTextField.setValue("");
							this.transferWindowTableSelectedRows = [];
							this.costToTradeLabel.setValue("");
							this.selectedRow = null;
							this.selectedRowData = null;
							this.modifier = 1;
							this.activated = false;
						}
					},
					getFilterMinimimAmount : function () {
						return this.userDefinedMinimumAmount;
					},
					getFilterDistanceLimit : function () {
						return this.userDefinedMaxDistance;
					},
					tradeWindow : function () {
						var tradeWindowContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2)).set({
							marginTop : 10,
							marginBottom : 10,
							marginLeft : 4
						});

						tradeWindowContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});

						var selectResourcesLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select resources:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13"
						});
						var resourceSelectionContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
							height : 26
						});
						var tiberiumToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_tiberium.png").set({
							appearance : "button-toggle",
							width : 84
						});
						tiberiumToggleButton.setUserData("key", ClientLib.Base.EResourceType.Tiberium);
						var tiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_tiberium.png").set({
							width : 24,
							height : 24,
							scale : true
						});
						var crystalToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_crystal.png").set({
							appearance : "button-toggle",
							width : 84
						});
						crystalToggleButton.setUserData("key", ClientLib.Base.EResourceType.Crystal);
						var crystalImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_chrystal.png").set({
							width : 24,
							height : 24,
							scale : true
						});
						resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						resourceSelectionContainer.add(selectResourcesLabel);
						resourceSelectionContainer.add(tiberiumToggleButton);
						resourceSelectionContainer.add(new qx.ui.core.Spacer().set({
							width : 2
						}));
						resourceSelectionContainer.add(crystalToggleButton);
						resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						this.resourceSelectionRadioButtons = new qx.ui.form.RadioGroup(tiberiumToggleButton, crystalToggleButton);
						this.resourceSelectionRadioButtons.addListener("changeSelection", this.ChangeResourceType, this);

						tradeWindowContainer.add(resourceSelectionContainer);

						var currentServer = ClientLib.Data.MainData.GetInstance().get_Server();
						var tradeCostToolTip = qx.locale.Manager.tr("tnf:trade costs %1 (+%2 per field)", currentServer.get_TradeCostMinimum(), currentServer.get_TradeCostPerField());
						var searchContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2));
						var searchBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						var minimumAmountLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:minimum amount:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13"
						});
						this.minimumAmountTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
						});
						this.minimumAmountTextField.setFilter(/[0-9]/);
						this.minimumAmountTextField.setMaxLength(12);
						var maxDistanceLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:distance limit:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13",
							toolTipText : tradeCostToolTip
						});
						this.maxDistanceTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
						});
						this.maxDistanceTextField.setFilter(/[0-9]/);
						this.maxDistanceTextField.setMaxLength(3);
						searchBox.add(minimumAmountLabel);
						searchBox.add(this.minimumAmountTextField);
						searchBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						searchBox.add(maxDistanceLabel);
						searchBox.add(this.maxDistanceTextField);
						searchBox.add(new qx.ui.core.Spacer(), {
							flex : 2
						});

						searchContainer.add(searchBox);

						var searchButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:search")).set({
							width : 300,
							maxWidth : 300,
							marginBottom : 8,
							marginTop : 4,
							alignX : "center"
						});
						searchButton.addListener("execute", this.TableRowFilter, this);
						searchContainer.add(searchButton);

						//tradeWindowContainer.add(searchContainer);

						this.selectAllNoneButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:select all")).set({
							enabled : true,
							//appearance: "button-forum-light",
							//textColor: "text-label",
							width : 160
						});

						this.selectAllNoneButton.addListener("click", this.SelectAllRows, this);

						tradeWindowContainer.add(this.selectAllNoneButton);

						this.tableColumnModel = new webfrontend.data.SimpleColFormattingDataModel();
						this.tableColumnModel.setColumns([qx.locale.Manager.tr("tnf:base"), qx.locale.Manager.tr("tnf:distance"), qx.locale.Manager.tr("tnf:$ / 1000"), qx.locale.Manager.tr("tnf:amount"), "Amount", "Max", "ID"], ["Base", "Distance", "Credits", "AmountDesc", "Amount", "Max", "ID"]);
						this.tableColumnModel.setColumnSortable(0, true);
						this.tableColumnModel.setColumnSortable(1, true);
						this.tableColumnModel.setColumnSortable(2, true);
						this.tableColumnModel.setColumnSortable(3, true);
						this.tableColumnModel.setSortMethods(3, this.AmountSort);
						this.tradeWindowTable = new webfrontend.gui.trade.TradeBaseTable(this.tableColumnModel).set({
							statusBarVisible : false,
							columnVisibilityButtonVisible : false,
							maxHeight : 300
						});
						this.tradeWindowTable.addListener("cellClick", this.TradeWindowTableCellClick, this);
						this.tradeWindowTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
						this.tradeWindowTable.setDataRowRenderer(new webfrontend.gui.trade.TradeBaseTableRowRenderer(this.tradeWindowTable));
						this.tradeWindowTable.showCellToolTip = true;
						var tradeWindowTableColumnModel = this.tradeWindowTable.getTableColumnModel();
						tradeWindowTableColumnModel.setDataCellRenderer(0, new qx.ui.table.cellrenderer.String());
						tradeWindowTableColumnModel.setDataCellRenderer(1, new qx.ui.table.cellrenderer.Number());
						tradeWindowTableColumnModel.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Number());
						tradeWindowTableColumnModel.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Default());
						tradeWindowTableColumnModel.getHeaderCellRenderer(2).setToolTip(tradeCostToolTip);
						tradeWindowTableColumnModel.setDataCellRenderer(3, new webfrontend.gui.trade.TradeBaseTableCellRenderer());
						tradeWindowTableColumnModel.setColumnWidth(0, 160);
						tradeWindowTableColumnModel.setColumnWidth(1, 60);
						tradeWindowTableColumnModel.setColumnWidth(2, 100);
						tradeWindowTableColumnModel.setColumnVisible(4, false);
						tradeWindowTableColumnModel.setColumnVisible(5, false);
						tradeWindowTableColumnModel.setColumnVisible(6, false);
						tradeWindowContainer.add(this.tradeWindowTable);

						var transferAmountContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());
						var transferAmountBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({
							minHeight : 36
						});
						this.largeTiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_tiberium.png").set({
							alignY : "middle",
							width : 22,
							height : 20,
							scale : true
						});
						this.transferFromBaseLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select base for transfer")).set({
							rich : true,
							textColor : "text-label",
							marginBottom : 2,
							alignY : "middle",
							maxWidth : 182
						});
						this.transferAmountTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed"),
							enabled : false,
							width : 208,
							marginRight : 1
						});
						this.transferAmountTextField.setFilter(/[0-9]/);
						this.transferAmountTextField.setMaxLength(20);
						this.transferAmountTextField.addListener("input", this.ResourceAmountChanged, this);
						transferAmountBox.add(this.largeTiberiumImage);
						transferAmountBox.add(this.transferFromBaseLabel);
						var percentButtonsBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
							marginTop : 2
						});
						this.tenPercentButton = new webfrontend.ui.SoundButton("10%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.tenPercentButton.addListener("execute", this.TenPercent, this);
						this.twentyFivePercentButton = new webfrontend.ui.SoundButton("25%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.twentyFivePercentButton.addListener("execute", this.TwentyFivePercent, this);
						this.fiftyPercentButton = new webfrontend.ui.SoundButton("50%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.fiftyPercentButton.addListener("execute", this.FiftyPercent, this);
						this.seventyFivePercentButton = new webfrontend.ui.SoundButton("75%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.seventyFivePercentButton.addListener("execute", this.SeventyFivePercent, this);
						this.oneHundredPercentButton = new webfrontend.ui.SoundButton("100%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.oneHundredPercentButton.addListener("execute", this.OneHundredPercent, this);
						percentButtonsBox.add(this.tenPercentButton);
						percentButtonsBox.add(this.twentyFivePercentButton);
						percentButtonsBox.add(this.fiftyPercentButton);
						percentButtonsBox.add(this.seventyFivePercentButton);
						percentButtonsBox.add(this.oneHundredPercentButton);
						transferAmountContainer.add(transferAmountBox);
						transferAmountContainer.add(this.transferAmountTextField);
						transferAmountContainer.add(percentButtonsBox);
						var tradeCostContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
							alignX : "center",
							maxWidth : 148
						});
						var tradeCostLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:costs:")).set({
							textColor : "text-label",
							marginBottom : 2,
							font : "font_size_13_bold",
							width : 148,
							textAlign : "center"
						});
						var tradeCostBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
							alignX : "center",
							allowGrowX : true,
							marginTop : 10
						});
						this.costToTradeLabel = new qx.ui.basic.Label().set({
							textColor : "text-value",
							alignY : "middle",
							font : "font_size_14_bold",
							marginLeft : 3
						});
						var dollarImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_credits.png").set({
							width : 18,
							height : 20,
							scale : true,
							AutoFlipH : false
						});
						tradeCostBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						tradeCostBox.add(dollarImage);
						tradeCostBox.add(this.costToTradeLabel);
						tradeCostBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						this.tradeButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:trade")).set({
							width : 196,
							enabled : false
						});
						this.tradeButton.addListener("execute", this.TradeWithBases, this);
						tradeCostContainer.add(tradeCostLabel);
						tradeCostContainer.add(tradeCostBox);
						tradeCostContainer.add(this.tradeButton);
						var tradeWindowCanvas = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
							decorator : new qx.ui.decoration.Background().set({
								backgroundRepeat : 'no-repeat',
								backgroundImage : "webfrontend/ui/menues/resource_transfer/bgr_restransfer_summary.png"
							})
						});
						tradeWindowCanvas.add(transferAmountContainer, {
							left : 50,
							top : 5
						});
						tradeWindowCanvas.add(tradeCostContainer, {
							left : 285,
							top : 18
						});
						tradeWindowCanvas.add(this.tradeButton, {
							left : 134,
							top : 100
						});
						tradeWindowContainer.add(tradeWindowCanvas);
						return tradeWindowContainer;
					},
					TableRowFilter : function () {
						var tableArray = [];
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null) {
							this.userDefinedMaxDistance = this.maxDistanceTextField.getValue() == "" ? -1 : parseInt(this.maxDistanceTextField.getValue(), 10);
							this.userDefinedMinimumAmount = this.minimumAmountTextField.getValue() == "" ? -1 : parseInt(this.minimumAmountTextField.getValue(), 10);
							var allCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
							for (var currentBase in allCities.d) {
								if (currentCity.get_Id() != currentBase && allCities.d[currentBase].IsOwnBase()) {
									var otherCity = allCities.d[currentBase];
									var currentBaseID = currentBase;
									var otherCityName = otherCity.get_Name();
									var distance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
									var costToTrade = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
									var resourceAmount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
									var maxResources = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
									var disqualifyDistance = false;
									var disqualifyAmount = false;
									if (this.userDefinedMaxDistance != -1 && this.userDefinedMaxDistance < distance)
										disqualifyDistance = true;
									if (this.userDefinedMinimumAmount != -1 && this.userDefinedMinimumAmount > resourceAmount)
										disqualifyAmount = true;
									if (!disqualifyDistance && !disqualifyAmount) {
										var formattedAmount = phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount);
										tableArray.push({
											Base : otherCityName,
											Distance : distance,
											Credits : costToTrade,
											AmountDesc : formattedAmount,
											Amount : resourceAmount,
											Max : maxResources.toString(),
											ID : currentBaseID
										});
									}
								}
							}
							this.tableColumnModel.setDataAsMapArray(tableArray, true);
							this.selectedRow = null;
							this.selectedRowData = null;
							this.tradeWindowTable.resetCellFocus();
							this.MaintainTradeWindow();
						}
					},
					SelectAllRows : function () {
						if (this.tradeWindowTable.getSelectionModel().getSelectedCount() != this.tableColumnModel.getRowCount()) {
							this.tradeWindowTable.getSelectionModel().setSelectionInterval(0, this.tableColumnModel.getRowCount() - 1);
							this.transferAmountTextField.setValue("");
							this.totalResourceAmount = 0;
							this.costToTradeLabel.setValue("0");
							this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select none"));
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));
							this.UpdateSelectedRows(this.tableColumnModel.getRowData(0));
							this.selectedRowData = this.tableColumnModel.getRowData(0);
						} else {
							this.tradeWindowTable.resetSelection();
							this.tradeWindowTable.resetCellFocus();
							this.transferAmountTextField.setValue("");
							this.transferWindowTableSelectedRows = [];
							this.SetCostLabel();
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
							this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
						}
					},
					AmountSort : function (bI, bJ) {
						if (bI[4] < bJ[4])
							return -1;
						if (bI[4] > bJ[4])
							return 1;
						return 0;
					},
					UpdateSelectedRows : function (rowData) {
						this.transferWindowTableSelectedRows = [];

						var localRows = [];
						var colModel = this.tableColumnModel;

						this.tradeWindowTable.getSelectionModel().iterateSelection(function (index) {
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(colModel.getRowData(index).ID);
							if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None)
								localRows.push(colModel.getRowData(index));
						});
						this.transferWindowTableSelectedRows = localRows;

					},
					TradeWindowTableCellClick : function (e) {

						var rowData = this.tableColumnModel.getRowData(e.getRow());
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(rowData.ID);

						this.modifier = 0;
						this.transferAmountTextField.setValue("");
						this.SetCostLabel();

						if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None) {
							this.selectedRow = e.getRow();
							this.selectedRowData = rowData;

							this.UpdateSelectedRows();

							if (this.transferWindowTableSelectedRows.length == 1)
								this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trade with %1", "<b>" + rowData.Base + "</b>"));
							if (this.transferWindowTableSelectedRows.length > 1)
								this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));

						}

						this.MaintainTradeWindow();

					},
					ChangeResourceType : function (e) {
						var userObject = e.getData()[0];
						this.transferAmountTextField.setValue("");
						this.transferWindowTableSelectedRows = [];
						this.SetCostLabel();
						this.tradeWindowTable.resetSelection();
						this.tradeWindowTable.resetCellFocus();
						this.resourceTransferType = userObject.getUserData("key");
						if (this.resourceTransferType == ClientLib.Base.EResourceType.Tiberium) {
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
						} else {
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_crystal.png");
						}
						this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
						this.MaintainTradeWindow();
					},
					ResourceAmountChanged : function () {
						this.modifier = 1;
						this.SetCostLabel();
					},
					CalculateTradeCost : function () {
						this.totalTransferAmount = 0;

						if (this.transferWindowTableSelectedRows.length > 0) {

							var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
							var selectedCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

							if (this.transferWindowTableSelectedRows.length > 1) {
								for (var base in this.transferWindowTableSelectedRows) {
									this.totalTransferAmount += cities[this.transferWindowTableSelectedRows[base].ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), this.transferWindowTableSelectedRows[base].Amount * this.modifier);
								}
							} else {
								this.totalTransferAmount += cities[this.selectedRowData.ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, '')));
							}
							return this.totalTransferAmount;
						}
						return 0;
					},
					ModifyResourceAmount : function (modifier) {
						this.totalResourceAmount = 0;

						this.UpdateSelectedRows(this.selectedRowData);

						if (this.transferWindowTableSelectedRows.length > 0) {
							for (var base in this.transferWindowTableSelectedRows) {
								this.totalResourceAmount += Math.floor(this.transferWindowTableSelectedRows[base].Amount * modifier);
							}
							return this.totalResourceAmount;
						}
						return 0;
					},
					SetCostLabel : function () {
						var tradeCost = this.CalculateTradeCost();
						if (this.transferAmountTextField.getValue() == "")
							tradeCost = 0;
						this.costToTradeLabel.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompactAfterMillion(tradeCost).toString());
						this.costToTradeLabel.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(tradeCost).toString());
						//this.MaintainTradeWindow();
					},
					TenPercent : function () {
						this.modifier = 0.1;
						var resourceAmount = this.ModifyResourceAmount(0.1);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					TwentyFivePercent : function () {
						this.modifier = 0.25;
						var resourceAmount = this.ModifyResourceAmount(0.25);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					FiftyPercent : function () {
						this.modifier = 0.5;
						var resourceAmount = this.ModifyResourceAmount(0.5);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					SeventyFivePercent : function () {
						this.modifier = 0.75;
						var resourceAmount = this.ModifyResourceAmount(0.75);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					OneHundredPercent : function () {
						this.modifier = 1;
						var resourceAmount = this.ModifyResourceAmount(1);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					TradeWithBases : function () {
						var transferAmount = 0;
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (this.transferWindowTableSelectedRows.length > 0) {
							if (currentCity != null && this.transferAmountTextField.getValue() != "") {
								for (var base in this.transferWindowTableSelectedRows) {
									var currentBase = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.transferWindowTableSelectedRows[base].ID);
									if (currentBase != null && currentBase.CanTrade() == ClientLib.Data.ETradeError.None && currentCity.CanTrade() == ClientLib.Data.ETradeError.None) {
										this.tradeButton.setEnabled(false);
										if (this.transferWindowTableSelectedRows.length == 1) {
											transferAmount = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
										} else {
											transferAmount = parseInt(this.transferWindowTableSelectedRows[base].Amount * this.modifier, 10);
										}
										ClientLib.Data.MainData.GetInstance().get_Player().AddCredits(-currentCity.CalculateTradeCostToCoord(currentBase.get_X(), currentBase.get_Y(), transferAmount));
										currentCity.AddResources(this.resourceTransferType, transferAmount);
										currentBase.AddResources(this.resourceTransferType, -transferAmount);
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("SelfTrade", {
											targetCityId : currentCity.get_Id(),
											sourceCityId : currentBase.get_Id(),
											resourceType : this.resourceTransferType,
											amount : transferAmount
										}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.TradeResult), null);
									}
								}

								this.tradeWindowTable.resetSelection();
								this.tradeWindowTable.resetCellFocus();
								this.transferWindowTableSelectedRows = [];
								this.transferAmountTextField.setValue("");
								this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
								this.SetCostLabel();
							}
						}
					},
					TradeResult : function (ce, result) {
						if (result != ClientLib.Base.EErrorCode.Success) {
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.selectedRowData.ID);
							this.tradeConfirmationWidget.showTradeError(this, null, city.get_Name());
						} else {
							this.SetCostLabel();
						}
						this.tradeButton.setEnabled(true);
					},
					UpdateTradeTableData : function () {
						var updatedResourceCount = [];
						var otherCity = null;
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null) {
							var transferWindowsTableData = this.tableColumnModel.getDataAsMapArray();
							for (var row in transferWindowsTableData) {
								otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(transferWindowsTableData[row].ID);
								if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase()) {
									var otherCityID = otherCity.get_Id();
									var otherCityName = otherCity.get_Name();
									var otherCityDistance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
									var otherCityTradeCost = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
									var otherCityResourceCount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
									var otherCityMaxStorage = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
									var otherCityResourceCountFormatted = phe.cnc.gui.util.Numbers.formatNumbers(otherCityResourceCount);
									updatedResourceCount.push({
										Base : otherCityName,
										Distance : otherCityDistance,
										Credits : otherCityTradeCost,
										AmountDesc : otherCityResourceCountFormatted,
										Amount : otherCityResourceCount,
										Max : otherCityMaxStorage.toString(),
										ID : otherCityID
									});
								} else {
									updatedResourceCount.push(transferWindowsTableData[row]);
								}
							}
							this.tableColumnModel.setDataAsMapArray(updatedResourceCount, true, false);
							if (this.selectedRow != null) {
								var selectedRowData = this.tableColumnModel.getRowData(this.selectedRow);
								otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(selectedRowData.ID);
								if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase() && otherCity.CanTrade() != ClientLib.Data.ETradeError.None) {
									this.selectedRowData = null;
									this.selectedRow = null;
									this.tradeWindowTable.resetCellFocus();
								} else {
									this.selectedRowData = selectedRowData;
								}
							}
						}
					},
					MaintainTradeWindow : function () {

						var hasEnoughtCredits = false;
						var validResourceAmount = true;

						if (this.transferWindowTableSelectedRows.length > 0) {

							var resourcesInTextField = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
							var tradeCost = this.CalculateTradeCost();
							var playerCreditCount = ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsCount();

							if (playerCreditCount < tradeCost) {
								this.costToTradeLabel.setTextColor("text-error");
							} else {
								this.costToTradeLabel.resetTextColor();
							}

							var selectedBaseResourceAmount = parseInt(this.selectedRowData.Amount, 10);

							if (this.transferAmountTextField.getValue() != "" && this.transferWindowTableSelectedRows.length > 1) {
								//Automatically update the text field with the new resource amount each tick
								var resourceAmount = this.ModifyResourceAmount(this.modifier);
								this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
								this.SetCostLabel();
							}

							if (this.transferWindowTableSelectedRows.length == 1) {
								if (resourcesInTextField == 0 || selectedBaseResourceAmount < resourcesInTextField) {
									this.transferAmountTextField.setTextColor("text-error");
								} else {
									this.transferAmountTextField.resetTextColor();
								}
								validResourceAmount = resourcesInTextField > 0 && resourcesInTextField <= selectedBaseResourceAmount;
							}

							hasEnoughtCredits = playerCreditCount >= tradeCost;

						}

						this.tradeButton.setEnabled(this.transferWindowTableSelectedRows.length > 0 && hasEnoughtCredits && validResourceAmount && this.transferAmountTextField.getValue() != "");
						this.transferAmountTextField.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.tenPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.twentyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.fiftyPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.seventyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.oneHundredPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);

						this.transferAmountTextField.setReadOnly(this.transferWindowTableSelectedRows.length > 1);

						if (this.tradeWindowTable.getSelectionModel().getSelectedCount() > 1) {
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:percent buttons"));
						} else {
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
						}

					},
					_onTick : function () {
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null && currentCity.get_HasIncommingAttack()) {
							this.onBtnClose();
						}
						this.UpdateTradeTableData();
						this.MaintainTradeWindow();
					}
				}
			});
		}

		function NewTradeOverlay_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined' && typeof webfrontend.gui.trade.TradeOverlay !== 'undefined') {
					qx.Class.undefine("webfrontend.gui.trade.TradeOverlay");
					CreateNewTradeOverlay();
				} else {
					window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("NewTradeOverlay_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
		}
	};

	try {
		var NewTradeOverlay = document.createElement("script");
		NewTradeOverlay.innerHTML = "(" + NewTradeOverlay_main.toString() + ")();";
		NewTradeOverlay.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(NewTradeOverlay);
		}
	} catch (e) {
		console.log("NewTradeOverlay: init error: ", e);
	}

})();
