// ==UserScript==
// @version       1.0
// @author        ihsoft
// @name          C&C:TA IHSoftTools (unpacked)
// @namespace     http://cncopt.com/
// @icon          http://cncopt.com/favicon.ico
// @description   Aggregates battle reports results and shows how much resources you got and RT spent. Also indicates daily ratio of money farming. Aggregates are shown by day, two weeks of history. Requires "MaelstromTool Dev".
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://*.cncopt.com/*
// @include       http*://cncopt.com/*
// @grant         GM_log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// ==/UserScript==
/* 
Script is heavily based on "C&C:Tiberium Alliances Maelstrom Tools" (http://userscripts.org/scripts/show/140991).
Thank you, guys, for making such a wonderful script and giving it to people non-obfuscated.
*/
(function() {
  var IHSoft_Tools_main = function() {
    try {
      function create() {
        // MaelstromTool global objects. We use them.
        var MT_Base = window.MaelstromTools.Base.getInstance();
        var MT_Cache = window.MaelstromTools.Cache.getInstance();
        
        qx.Class.define("IHSoft.FarmingStats", {
          type: "singleton",
          extend: qx.core.Object,
          statics: {
            INITIAL_POLL_SIZE: 100,
            REFRESH_POLL_SIZE: 5,
            STATE_CHECK_TIMEOUT: 200,
            SETTING_SUMMARY: "IHS_FS_SUMMARY",
            SETTING_LAST_TS: "IHS_FS_LAST_TS",
            HISTORY_LENGTH_MSEC: 14 * 24 * 60 * 60 * 1000,  // 2 weeks
          },
          members: {
            // Public members, you may accessing them (don't change!).
            // Summary, keyed by day timestamp.
            reportsSummary: {},

            // Private member, don't access them directly.
            lastTimestamp_: 0,
            lastSavedTimestamp_: 0,
            dataReadyCallbacks_: new Array(),
            updateInProgress_: false,
            pageNum_: 0,
            hasNewData_: false,

            initialize: function() {
              try {
                this.loadStats();
                this._getInitialState();
                console.log('IHSoft.FarmingStats loaded');
              } catch (e) {
                console.log("IHSoft.FarmingStats.initialize: ", e);
              }
            },
                    
            // Register a subscriber to notify when updates available.
            registerDataReadyCallback: function(callback) {
              this.dataReadyCallbacks_.push(callback);
            },

            // Unregister a subscriber.
            unregisterDataReadyCallback: function(callback) {
              var pos = this.dataReadyCallbacks_.indexOf(callback);
              if (pos !== -1) this.dataReadyCallbacks_.splice(pos, 1);
            },

            // Loads saved stats from MT storage.
            loadStats: function() {
              try {
                var storage = window.MaelstromTools.LocalStorage;
                this.reportsSummary = storage.get(IHSoft.FarmingStats.SETTING_SUMMARY, {});
                this.lastSavedTimestamp_ = storage.get(IHSoft.FarmingStats.SETTING_LAST_TS, 0);
                this.lastTimestamp_ = this.lastSavedTimestamp_;

                // Cleanup old entries.
                var cutoffTs = (new Date()).getTime() - IHSoft.FarmingStats.HISTORY_LENGTH_MSEC;
                for (var ts in this.reportsSummary) {
                  if (ts < cutoffTs) {
                    delete this.reportsSummary[ts];
                    this.hasNewData_ = true;
                  }
                }
              } catch (e) {
                console.log("IHSoft.FarmingStats.loadStats: ", e);
              }
            },
                    
            // Saves current stats into MT storage.
            saveStats: function() {
              try {
                if (this.hasNewData_) {
                  this.lastSavedTimestamp_ = this.lastTimestamp_;
                  var storage = window.MaelstromTools.LocalStorage;
                  storage.set(IHSoft.FarmingStats.SETTING_SUMMARY, this.reportsSummary);
                  storage.set(IHSoft.FarmingStats.SETTING_LAST_TS, this.lastSavedTimestamp_);
                  this.hasNewData_ = false;
                }
              } catch (e) {
                console.log("IHSoft.FarmingStats.saveStats: ", e);
              }
            },

            // Requests new reports and updates stats. Registered callbacks will be called when
            // data is ready.
            requestReports: function() {
              try {
                if (!this.updateInProgress_) {
                  this.updateInProgress_ = true;
                  this.pageNum_ = 0;
                  this.todaysMoneyRate_ = this.calculateDailyMoneyRate();
                  this._requestReports(this.pageNum_++);
                }
              } catch (e) {
                console.log("IHSoft.FarmingStats.requestReports: ", e);
              }
            },

            // Returns daily rate of money production for all bases.
            // City cache must be ready or else function will return 0.
            calculateDailyMoneyRate: function() {
              var moneyRate = 0;
              try {
                MT_Cache.updateCityCache();
                for (var cname in MT_Cache.Cities) {
                  var cityProduction = MT_Cache.Cities[cname].Object.get_CityCreditsProduction();
                  moneyRate += ClientLib.Base.Resource.GetResourceGrowPerHour(cityProduction, false);
                  moneyRate += ClientLib.Base.Resource.GetResourceBonusGrowPerHour(cityProduction, false);
                }
              } catch (e) {
                console.log("IHSoft.FarmingStats.calculateDailyMoneyRate: ", e);
              }
              return moneyRate * 24;
            },

            // Below are "private" methods. Don't call them as they may change in incompatible way.

            // Gets initial state. We need city cache availabe.
            // TODO: Check if we can hook on event.
            _getInitialState: function() {
              this.updateInProgress_ = true;
              MT_Cache.updateCityCache();
              if (MT_Cache.CityCount > 0) {
                this.updateInProgress_ = false;
                this.requestReports();
              } else {
                window.setTimeout(
                    phe.cnc.Util.createMethodWrapper(this, this._getInitialState),
                    IHSoft.FarmingStats.STATE_CHECK_TIMEOUT);
              }
            },

            // Requests a page of reports headers.        
            _requestReports: function(pageNum) {
              var pageSize = (this.lastSavedTimestamp_ === 0 ? IHSoft.FarmingStats.INITIAL_POLL_SIZE
                                                             : IHSoft.FarmingStats.REFRESH_POLL_SIZE);
              var req = {
                  type: ClientLib.Data.Reports.EPlayerReportType.CombatOffense,
                  skip: pageNum * pageSize, take: pageSize,
                  sort: ClientLib.Data.Reports.ESortColumn.Time, ascending: false
              };
              var callback = phe.cnc.Util.createEventDelegate(
                  ClientLib.Net.CommandResult, this, this._reportsCallback);
              ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand(
                  "GetReportHeaderAll", req, callback, null);
            },

            // Handles report headers and requests data for the new ones.
            _reportsCallback: function(unused_context, reportHeaders) {
              try {
                if (reportHeaders.length) {
                  this._reports = new Array();
                  for (var i = 0; i < reportHeaders.length; i++) {
                    this._reports.push(IHSoft.Utils.getReportFromHeader(reportHeaders[i]));
                  }
                  this._currentReportNum = 0;
                  this._requestNextReportData();
                } else {
                  this._endDataPoll();
                }
              } catch (e) {
                console.log("IHSoft.FarmingStats._reportsCallback: ", e);
              }
            },
            
            // Requests data for the next new header.
            _requestNextReportData: function() {
              if (this._currentReportNum < this._reports.length) {
                var report = this._reports[this._currentReportNum++];
                if (report.get_Time() > this.lastSavedTimestamp_) {
                  this._requestReportData(report);  // Report is new, get data for it.
                } else {
                  this._endDataPoll();  // No more new reports. Stop.
                }
              } else {
                // Currrent page is done and we still have new reports. Request.
                this._requestReports(this.pageNum_++);
              }
            },

            // Stops data polling, notifies subscribers and saves current summary.
            _endDataPoll: function() {
              for (var i = 0; i < this.dataReadyCallbacks_.length; i++) {
                try {
                  this.dataReadyCallbacks_[i]();
                } catch (e) {
                  // Don't let single evil callback to screw up all the scripts.
                  console.log("IHSoft.FarmingStats._endDataPoll, callback error: ", e);
                }
              }
              this.saveStats();
              this.updateInProgress_ = false;
            },

            // Populate report with data. Header must be loaded.
            _requestReportData: function(report) {
              var callback = phe.cnc.Util.createEventDelegate(
                  ClientLib.Net.CommandResult, this, this._reportDataCallback);
              ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand(
                  "GetReportDataAndHeader", {playerReportId: report.get_Id()}, callback, report);
            },

            // Recieves and populates report data.
            _reportDataCallback: function(report, reportDataAndHeader) {
              try {
                this.hasNewData_ = true;
                IHSoft.Utils.addCombatReportData(report, reportDataAndHeader.d);
                var date = Date.parse((new Date(report.get_Time()).toDateString()));
                var dayValue = this.reportsSummary[date];
                if (!dayValue) {
                  dayValue = {date: date, rp: 0, tiberium: 0, crystal: 0, gold: 0, rt: 0, crates: 0,
                              goldRatio: 0};
                  this.reportsSummary[date] = dayValue;
                }
                dayValue.rp += report.GetAttackerResourceReward(ClientLib.Base.EResourceType.ResearchPoints);
                dayValue.tiberium += report.GetAttackerResourceReward(ClientLib.Base.EResourceType.Tiberium);
                dayValue.crystal += report.GetAttackerResourceReward(ClientLib.Base.EResourceType.Crystal);
                dayValue.gold += report.GetAttackerResourceReward(ClientLib.Base.EResourceType.Gold);
                dayValue.goldRatio = dayValue.gold / this.todaysMoneyRate_;
                dayValue.rt += report.GetAttackerMaxRepairTime();
                if (report.get_AttackerItemRewards().length) {
                  dayValue.crates++;
                }

                // Get more date for records above the latest timstamp.
                if (this.lastTimestamp_ < report.get_Time()) {
                  this.lastTimestamp_ = report.get_Time();
                }
                this._requestNextReportData();
              } catch (e) {
                console.log("IHSoft.FarmingStats._reportDataCallback: ", e);
              }
            }
          }
        });
        
        qx.Class.define("IHSoft.FarmingStatsGUI", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          statics: {
            BUTTON_IMAGE: "FocusBase",
            BUTTON_LINE: 2,  // Same as Maelstrom UpgradePriority.

            WINDOW_NAME: "IHSoftFarmingStats",
            WINDOW_TITLE: "IHSoft Farming Stats v1.0",
            WINDOW_WIDTH: 527,
            WINDOW_HEIGHT: 390,  // ~14 rows.

            // Table definition.
            COL_DATE: 0,
            COL_RT_COST: 1,
            COL_RP_REWARD: 2,
            COL_GREEN_REWARD: 3,
            COL_BLUE_REWARD: 4,
            COL_GOLD_REWARD: 5,
            COL_GOLD_GAIN_RATIO: 6,
            COL_CRATES_COUNT: 7,
            COL_DEFS: ["Date", "RT cost", "RP reward", "Tiberium reward", "Crystal reward",
                       "Money reward", "Money daily gain %", "Crates"]
          },
          members: {
            _model: null,
            _table: null,

            registerGUI: function() {
              try {
                this.IsTimerEnabled = false; // No auto refresh.

                // Setup window and menu button.
                MT_Base.createNewWindow(
                    IHSoft.FarmingStatsGUI.WINDOW_NAME, "L",
                    120, 60,
                    IHSoft.FarmingStatsGUI.WINDOW_WIDTH, IHSoft.FarmingStatsGUI.WINDOW_HEIGHT);
                var farmingStats = MT_Base.createDesktopButton(
                    IHSoft.FarmingStatsGUI.WINDOW_TITLE, IHSoft.FarmingStatsGUI.BUTTON_IMAGE,
                    false, MT_Base.desktopPosition(IHSoft.FarmingStatsGUI.BUTTON_LINE));
                farmingStats.addListener("execute", function() {
                  window.IHSoft.FarmingStatsGUI.getInstance().openWindow(
                      IHSoft.FarmingStatsGUI.WINDOW_NAME, IHSoft.FarmingStatsGUI.WINDOW_TITLE);
                }, null);
                MT_Base.addToMainMenu(IHSoft.FarmingStatsGUI.WINDOW_NAME, farmingStats);
              } catch (e) {
                console.log("IHsoft.FramingStatsGUI.registerGUI: ", e);
              }
            },

            initWindow: function() {
              try {
                // Setup table view.
                this._model = new qx.ui.table.model.Simple();
                this._model.setColumns(IHSoft.FarmingStatsGUI.COL_DEFS);
                this._table = new qx.ui.table.Table(this._model);
                this._table.setColumnVisibilityButtonVisible(false);
                this._table.setColumnWidth(IHSoft.FarmingStatsGUI.COL_DATE, 80);
                this._table.setColumnWidth(IHSoft.FarmingStatsGUI.COL_RT_COST, 80);
                this._table.setColumnWidth(IHSoft.FarmingStatsGUI.COL_RP_REWARD, 60);
                this._table.setColumnWidth(IHSoft.FarmingStatsGUI.COL_GREEN_REWARD, 60);
                this._table.setColumnWidth(IHSoft.FarmingStatsGUI.COL_BLUE_REWARD, 60);
                this._table.setColumnWidth(IHSoft.FarmingStatsGUI.COL_GOLD_REWARD, 60);
                this._table.setColumnWidth(IHSoft.FarmingStatsGUI.COL_GOLD_GAIN_RATIO, 60);
                this._table.setColumnWidth(IHSoft.FarmingStatsGUI.COL_CRATES_COUNT, 40);
                
                this.Window.setPadding(0);
                this.Window.set({
                  resizable: true
                });

                this.Window.removeAll();
                this.Window.add(this._table, {
                  flex: 1
                });

                var tcm = this._table.getTableColumnModel();
                tcm.setDataCellRenderer(
                    IHSoft.FarmingStatsGUI.COL_DATE, new HuffyTools.ReplaceRender().set({
                        ReplaceFunction: function(value) {
                          return phe.cnc.Util.getLocaleShortDateString(new Date(value));
                        }
                    }));
                tcm.setDataCellRenderer(
                    IHSoft.FarmingStatsGUI.COL_RT_COST, new HuffyTools.ReplaceRender().set({
                        ReplaceFunction: ClientLib.Vis.VisMain.FormatTimespan
                    }));
                tcm.setDataCellRenderer(
                    IHSoft.FarmingStatsGUI.COL_RP_REWARD, new HuffyTools.ReplaceRender().set({
                        ReplaceFunction: phe.cnc.gui.util.Numbers.formatNumbersCompact
                    }));
                tcm.setDataCellRenderer(
                    IHSoft.FarmingStatsGUI.COL_GREEN_REWARD, new HuffyTools.ReplaceRender().set({
                        ReplaceFunction: phe.cnc.gui.util.Numbers.formatNumbersCompact
                    }));
                tcm.setDataCellRenderer(
                    IHSoft.FarmingStatsGUI.COL_BLUE_REWARD, new HuffyTools.ReplaceRender().set({
                        ReplaceFunction: phe.cnc.gui.util.Numbers.formatNumbersCompact
                    }));
                tcm.setDataCellRenderer(
                    IHSoft.FarmingStatsGUI.COL_GOLD_REWARD, new HuffyTools.ReplaceRender().set({
                        ReplaceFunction: phe.cnc.gui.util.Numbers.formatNumbersCompact
                    }));
                tcm.setDataCellRenderer(
                    IHSoft.FarmingStatsGUI.COL_GOLD_GAIN_RATIO, new HuffyTools.ReplaceRender().set({
                        ReplaceFunction: phe.cnc.gui.util.Numbers.calculateDisplayPercentValue
                    }));

                window.IHSoft.FarmingStats.getInstance().registerDataReadyCallback(
                    phe.cnc.Util.createMethodWrapper(this, this.setWidgetLabels));
              } catch (e) {
                console.log("IHsoft.FramingStatsGUI.initWindow: ", e);
              }
            },

            // @Override
            updateCache: function() {
              try {
                if (!this._table) {
                  this.initWindow();
                }
                window.IHSoft.FarmingStats.getInstance().requestReports();
              } catch (e) {
                console.log("IHSoft.FarmingStatsGUI.updateCache: ", e);
              }
            },

            // @Override
            setWidgetLabels: function() {
              try {
                var rowData = new Array();
                var summary = window.IHSoft.FarmingStats.getInstance().reportsSummary;
                for (var date in summary) {
                  var row = summary[date];
                  // Fill table row by index to be more flexible when column order changes.
                  var data = new Array();
                  data[IHSoft.FarmingStatsGUI.COL_DATE] = row.date;
                  data[IHSoft.FarmingStatsGUI.COL_RT_COST] = row.rt;
                  data[IHSoft.FarmingStatsGUI.COL_RP_REWARD] = row.rp;
                  data[IHSoft.FarmingStatsGUI.COL_GREEN_REWARD] = row.tiberium;
                  data[IHSoft.FarmingStatsGUI.COL_BLUE_REWARD] = row.crystal;
                  data[IHSoft.FarmingStatsGUI.COL_GOLD_REWARD] = row.gold;
                  data[IHSoft.FarmingStatsGUI.COL_GOLD_GAIN_RATIO] = row.goldRatio;
                  data[IHSoft.FarmingStatsGUI.COL_CRATES_COUNT] = row.crates;
                  rowData.push(data);
                }
                // Sort by date, descending.
                rowData.sort(function(elem1, elem2) {
                  if (elem1[0] < elem2[0]) return 1;
                  if (elem1[0] > elem2[0]) return -1;
                  return 0;
                });
                this._model.setData(rowData);
              } catch (e) {
                console.log("IHSoft.FarmingStatsGUI.setWidgetLabels: ", e);
              }
            }
          }
        });

        // Hepler methods for accessing various data.
        qx.Class.define("IHSoft.Utils", {
          type: "static",
          statics: {
            FN_PARSE_REPORT: null,
            FN_ADD_COMBAT_REPORT_DATA: null,

            // Finds required obfuscated functions by their contents.
            // It works because of: a) these are simple wrapper objects; b) JSON fields don't change.
            initialize: function() {
              IHSoft.Utils.FN_PARSE_REPORT = IHSoft.Utils.findMethod(
                  ClientLib.Data.Reports.CombatReport.prototype,
                  '=b.dbn;', 'getReportFromHeader()');
              IHSoft.Utils.FN_ADD_COMBAT_REPORT_DATA = IHSoft.Utils.findMethod(
                  ClientLib.Data.Reports.CombatReport.prototype,
                  '=b.apn;', 'addCombatReportData()');
            },

            // Finds a building in city object. Returns {@null} if not found.
            getBuildingById: function(city, buildingId) {
              var buildings = city.get_Buildings().d;
              for (var o in buildings) {
                var obj = buildings[o];
                if (obj.get_Id() === buildingId) return obj;
              }
              console.log('IHSoft.Utils.getBuildingById: Building ' + buildingId + ' not found');
              return null;
            },

            // Returns {@ClientLib.Data.Reports.CombatReport} object form a battle report header.
            getReportFromHeader: function(reportHeader) {
              try {
                var cr = new ClientLib.Data.Reports.CombatReport();
                IHSoft.Utils.FN_PARSE_REPORT.call(cr, reportHeader);
                return cr;
              } catch (e) {
                console.log("IHSoft.Utils.getReportFromHeader: ", e);
                throw e;
              }
            },

            // Add combat report data to the object.
            // cr: {@ClientLib.Data.Reports.CombatReport}
            // data: data from AJAX.
            addCombatReportData: function(cr, data) {
              try {
                IHSoft.Utils.FN_ADD_COMBAT_REPORT_DATA.call(cr, data);
                return cr;
              } catch (e) {
                console.log("IHSoft.Utils.addCombatReportData: ", e);
                throw e;
              }
            },
            
            // Finds method in the specified prototype by a string pattern.
            // Use with caution, you may find many troubles on your back if your pattern is not
            // unique.
            // proto: Prototype of the object to search.
            // pattern: A string to search in the function body.
            // hintName: Human friendly name of the method to find (for logging only).
            // knownName: A name that you know was used once, leave it {@null} if you don't.
            // @returns: Method or undefined. If it's a method invoke it thru call().
            findMethod: function(proto, pattern, hintName, knownName) {
              var fn;
              try {
                if (knownName) {
                  fn = proto[knownName];
                }
                if (typeof fn === 'undefined') {
                  for (var name in proto) {
                    var candidate = proto[name];
                    if (typeof candidate === 'function' && 
                        candidate.toString().indexOf(pattern) !== -1) {
                      console.log("IHSoft.Utils.findMethod: Found " + hintName + " method - " + name);
                      fn = candidate;
                      break;
                    }
                  }
                }
                if (typeof fn === 'undefined') {
                  console.log("IHSoft.Utils.findMethod: Failed to find " + hintName);
                }
              } catch (e) {
                console.log("IHSoft.Utils.findMethod: " + e);
              }
              return fn;
            }
          }
        });
      }
    } catch (e) {
      console.log("IHSoft tools main: ", e);
    }

    function checkIfLoaded() {
      try {
        if (typeof window.MaelstromTools !== 'undefined') {
          create();
          // Initialize order is important!
          window.IHSoft.Utils.initialize();
          window.IHSoft.FarmingStats.getInstance().initialize();
          window.IHSoft.FarmingStatsGUI.getInstance().registerGUI();
        } else {
          console.log("IHSoft tools: Waiting for MaelstromTools...");
          window.setTimeout(checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("IHSoft tools, checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(checkIfLoaded, 1000);
    }
  };

  try {
    var autoUpgrade = document.createElement("script");
    autoUpgrade.innerHTML = "(" + IHSoft_Tools_main.toString() + ")();";
    autoUpgrade.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(autoUpgrade);
    }
  } catch (e) {
    console.log("IHSoft tools: init error: ", e);
  }
})();