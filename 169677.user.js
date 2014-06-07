// ==UserScript==
// @name                OrC Report 
// @namespace	        slye_tag_2013
// @description	        Report troop counts to alliance form. Specific to OrC atm
// @include		http://*.lordofultima.com/*/index.aspx*
// @version             2.0.3
// ==/UserScript==

// ChangeLog:
//    2.0.3 - 8/25/13
//        - OMG this sucks. Learn to use strings and split by dots greasemonkey/tampermonkey!
//    2.03 - 8/25/13
//        - My theory is that, under certain conditions, the alliance name is not
//          always available at game start. So in this version we wait for it to
//          become available.
//        - It seems version up there needs to be a number and not have a letter
//    2.0b - 8/21/13
//        - Support orders were not getting sent. This is fixed.
//    2.0a - 8/20/13
//        - Damn javascript anyway. Fixed mysterious lack of callback data bug.
//        - Fixed progress widget "bug"
//    2.0 - 8/15/13
//        - Added option to automatically send all city data (unticked by default)
//        - Added options page
//        - Added intel gathering from reports
//        - Added support troops, players, and cities to report
//        - Added all troops to report, not just offense
//        - Refactored cross-domain data transport extensively, don't ask ;)
//        - Should refuse to operate if you aren't in the proper alliance
//        - This no longer points to google docs but to a custom webserver
//    1.1a - 6/26/2013
//        - Firefox apparently needs to count from row 0
//    1.1 - 6/26/2013
//        - Sorting no longer removes your update selections
//        - Rearchitected sendReport so it behaves the same regardless of table sorting
//        - Table comes up sorted by city name now
//        - Previous script would not send info on cities with zero offensive troops, now it will
//        - Confirmation button added so people will stop asking if it got there
//        - Removed another subtle and not so trivial dependency on BoS tools
//        - Link now opens in a new frame/window rather than the current game client
//        - Added Frigates as type 
//        - Remove trivial dependency on BoS tools
//    1.0 - Initial Release

 // Most of this shamelessly lifted from LoU BoS

// This wrapping is a namespace protector, since everything defined inside this
// will be in it's own scope.
(function namespaceAgain() {   // collide dis!

  console.log("NS top");
  // This is the injected code
  var scriptContent = function louReportMain() {

    function utf8_to_b64( str ) {
       return window.btoa(unescape(encodeURIComponent( str )));
    }  
    
    var myOrCVersion = "2.0.3";

    function lourAddMissingQooxoodo() {
      if (typeof qx.lang == 'undefined' || typeof qx.lang.Json == 'undefined') {
        qx.Class.define("qx.lang.Json", {
          type: "singleton",
          extend: qx.core.Object,
          statics: {
            parse: function(s) {
              return qx.util.Json.parse(s);
            },
            stringify: function(o) {
              return qx.util.Json.stringify(o);
            }
          }
        });
      }
      if (typeof webfrontend.ui == 'undefined' || typeof webfrontend.ui.MessageBox == 'undefined') {
        qx.Class.define("webfrontend.ui.MessageBox", {                  
          extend: webfrontend.gui.MessageBox,
          statics: {
            messageBox: function(o) {
              webfrontend.gui.MessageBox.messageBox(o);
            }
          }                       
        });             
      }
    }

    function lourStartOnQx() {
      if (typeof qx != 'undefined') {
        console.log("Adding missing Qooxoodoo");
        lourAddMissingQooxoodo();
        lourScript();                
      } else {
        window.setTimeout(lourStartOnQx, 5000);    
      }
    };
    window.setTimeout(lourStartOnQx, 5000);    
        
    var lourScript = function () {
    
      qx.Class.define("lour.Const", {
        statics: {      
          CITYINPUT_URL: "http://public.jetcafe.org:8765",
          
	  GOLD: 0,
	  WOOD: 1,
	  STONE: 2,
	  IRON: 3,
	  FOOD: 4,
          
          REGION_CITY: 0,
          REGION_CASTLE: 1,
          REGION_LAWLESS_CITY: 2,
          REGION_LAWLESS_CASTLE: 3,
          REGION_RUINS: 4,
          REGION_UNKNOWN: 5,
          
	  TABLE_SUMMARY_ROW_BORDER: "2px solid #E8D3AE",
          TABLE_DEFAULT_COLOR: "#F3D298",
	  TABLE_BORDER: "1px dotted rgb(77, 79, 70)",
          
          //flood control
          MIN_SEND_COMMAND_INTERVAL: 750,
          MIN_POLL_INTERVAL: 900000,
          
          MAX_POPUPS: 10
        }
      });
      
      function mod_info_string() {
        return "<h2>This mod is an automatic troop reporting and intelligence gathering tool for the OrC alliance.</h2><p>Troops will be reported to <a href=\"" + lour.Const.CITYINPUT_URL + "\" target=\"_blank\">this URL</a> for all your cities automatically.</p>" +
          "<p><span style='text-decoration: blink'>WARNING:</span> this tool will upload troop reports automaticaly to the remote database <b>as you view them</b>. See the <b>options</b> tab to turn this off.</p>" +
          "<p>To use this tool:</p><ol>" +
          "<li>Look at the Military Report tab. </li>" +
          "<li>Select the cities you wish to send information about by clicking the row until the 'upload?' box is checked</li>" +
          "<li>Once all cities you wish to report are selected, click the 'Send Report' button</li>" +
          "</ol>" + 
          "<p>Note that you can now just upload all cities without having to select. See the options tab.</p>" +
          "<p>Also note that due to defensive support calculations, the 'cities left' number may increase on you while you send data. <b>This is expected and normal behavior!</b></p>" +
          "<h3>Please report bugs to xSlyex.</h3>" +
          "<h4>OrC Report version " + myOrCVersion + "</h4>";
      }
      
      // Our UI strings, I'm only doing english since all I know is english.
      // Patches welcome. 
      var localizedStrings = {
        "en" : {
          "mainMenuName": "OrC Report",
          "reportWidget": "Alliance Troop Report Widget",
          "infoTab": "Mod Information",
          "reportTab": "Military Report",
          "send": "Send Report",
          "refresh": "Refresh",
          "id": "Id",
          "name": "Name",
          "position": "Position",
          "reference": "Reference",
          "ts": "TS",
          "breakdown": "Troop Breakdown",
          "water": "On Water?",
          "castle": "Is Castle?",
          "cities to fetch": "Cities left (may increase): ",
          "upload" : "Upload?",
          "sent" : "Your data has been sent",
          "confirmation" : "Confirmation",
          "warning" : "Warning",
          "support" : "Supporting Defense",
          "select cities please" : "You did not select any cities to upload. Use the checkboxes and try again",
          "options": "Options",
          "": ""
        },
        "": ""
      };
      
      function tr(msgId) {
        var locale = qx.locale.Manager.getInstance().getLocale();
        if (localizedStrings[locale] != undefined && localizedStrings[locale][msgId] != undefined) {
          return localizedStrings[locale][msgId];
        }
        if (localizedStrings["en"][msgId] != undefined) {
          return localizedStrings["en"][msgId];
        }
        return msgId;
      }
      
      function lourAlert(message) {
        if (lour.Utils._popupsCount < lour.Const.MAX_POPUPS) {
          alert(message);
          lour.Utils._popupsCount++;
        }
      }
      
      qx.Class.define("lour.Utils",{
        type: "singleton",
        extend: qx.core.Object,
        statics: {
          _popupsCount: 0,
          showMsg: function(msg) {
            if (lour.Utils._popupsCount < lour.Const.MAX_POPUPS) {
              alert(msg);
              lour.Utils._popupsCount++;
            }
          },
          handleError: function(msg) {
            this.showMsg(msg);
          }
        }
      });

      var a;
      window.setTimeout(lourCheckIfLoaded, 1000);

      function lourCheckIfLoaded() {
        try {
          a = qx.core.Init.getApplication();
          var allianceName = webfrontend.data.Alliance.getInstance().getName();
          if (a && a.chat && a.cityInfoView && a.title.reportButton && allianceName && allianceName !== "") {
            lour.Tweaks.getInstance().gameStarted();
          } else {
            window.setTimeout(lourCheckIfLoaded, 1000);
          }
        } catch (e) {
          console.log("Cannot check if loaded: " + e);
        }
      }


      qx.Class.define("lour.gui.OptionsPage", {
        extend: qx.ui.tabview.Page,
        construct: function() {
          qx.ui.tabview.Page.call(this);
          this.setLabel(tr("options"));
          this.setLayout(new qx.ui.layout.Dock());
          
          var scrollable = new qx.ui.container.Scroll();                                          
          this.add(scrollable);
          
          var scroll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({
            marginLeft: 100,
            marginRight: 100
          });
          scrollable.add(scroll);

    
          var opts = lour.Options.getInstance();
          this.optionsWidgets = [];
          var optvalues = opts.optionsValues;
          var optconfig = opts.optionsConfig;
          console.log("Optspage");
          console.log(optvalues);
          console.log(optconfig);
              
          for (opt in optvalues) {
            console.log("Option " + opt);
            var container = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
              marginLeft: 15,
              marginTop: 5
            });
            var widget;
            var event;

            switch(optconfig[opt].type) {
             case opts.typeBool:
              widget = new qx.ui.form.CheckBox(optconfig[opt].label);
              event = "execute";
              break;
             case opts.typeStr:
              container.add( new qx.ui.basic.Label( optconfig[opt].label ) );
              widget = new qx.ui.form.TextField("");
              event = "changeValue";
              break;
             default:
              console.log("Unsupported type in options page: " + optconfig[opt].type);
              continue;
            }

            widget.setValue( optvalues[opt] );
            widget.setToolTipText( optconfig[opt].desc );
            this.optionsWidgets[opt] = widget;
            widget.addListener(event, function(event) {
              var opts = lour.Options.getInstance();
              var value = this.optionsWidgets[opt].getValue();
              opts.setOption(opt, value);
              opts.optionCallback(opt, value);
            }, this);

            container.add(widget);
            scroll.add(container);
          }
        },
        members: {
          optionsWidgets: null
        }
      });

      qx.Class.define("lour.Options", {
        extend: qx.core.Object,
        type: "singleton",
        construct: function() {
          this.optionsConfig = {
            "autoscanreports": {
              dflt: true,
              label: "Automatically upload intel?",
              desc: "OrC Report will automatically send relevant scouting intel to our database whenever you click on any assault, siege, scout, or plunder report. To stop this behavior, untick this checkbox.",
              type: this.typeBool
            },
            "autosendcities": {
              dflt: false,
              label: "Send all city data?",
              desc: "When sending city troop data, the boxes in the \'Upload?\' column determine which cities to send. If you select this option, they will all be checked by default. Even with this box ticked, before you send data you may still uncheck specific cities if you do not want to upload data from specifc cities.",
              type: this.typeBool,
              setCallback: function(value) {
                var rw = getReportWidget();
                rw.reportTab._initAllSelections(value);
              }
            }
          };
          this.initOptions();
        },
        members: {
          debugMe: true,
          noEvent: true,
          optionsConfig: null,
          optionsValues: null,
          typeBool: 1,
          typeString: 2,
          dirToStorage: 1,
          dirFromStorage: 2,
          optPrefix: 'opt_',
          initOptions: function() {
            this.optionsValues = [];

            var stor = lour.Storage.getInstance();
            for (option in this.optionsConfig) {
              var value = stor.getValue( this.optPrefix + option );

              console.log("Found value for " + option + ": " + value);
              if ( value == null ) {
                console.log("Defaulting " + option);
                value = this.optionsConfig[option].dflt;
              } else {
                var type = this.optionsConfig[option].type;
                value = this.xlateStorageValue(this.dirFromStorage, type, value);
                console.log("Setting  " + option + ": " + value);
              }
              this.setOption(option, value);
              this.noEvent = false;
            }
          },
          optionCallback: function (opt, value) {
              var cb = this.optionsConfig[opt].setCallback;
              if (cb != null) {
                cb(value);
              }
          },
          getOption: function( key ) {
            return this.optionsValues[key];
          },
          setOption: function( key, value ) {
            var stor = lour.Storage.getInstance();
            stor.setValue( this.optPrefix + key, this.xlateStorageValue( this.dirToStorage, this.optionsConfig[key].type, value ) );
            this.optionsValues[key] = value;
            console.log("wrote option " + key);

            var event = this.optionsConfig[key].onChange;
          },
          xlateStorageValue: function(direction, type, value) {
            
            switch(type) {
             case this.typeBool:
              if (direction == this.dirToStorage) {
                if (value) {
                  return "T";
                }
                return "F";
              } else {
                if (value == "T") {
                  return true;
                }
                return false;
              }
              break;
             case this.typeStr:
              return value;
              default:
              console.log("ERROR: unsupported option type: " + type);
              return null;
            }
          }
        }
      });

      qx.Class.define("lour.Storage", {
        extend: qx.core.Object,
        type: "singleton",
        construct: function() {
          this.supportsLocalStorage = false;

          try {
            if ('localStorage' in window && window['localStorage'] !== null) {
              this.supportsLocalStorage = true;
            }
          } catch (e) {
            console.log(e);
          }
          var lsStatus = (this.supportsLocalStorage) ? "yes" : "no";
          if (this.debugMe) { console.log("Local storage supported: " + lsStatus ); }
          
        },
        members: {
          debugMe: true,
          supportsLocalStorage: false,
          prefix: "lours_",
          setValue: function( key, value) {
            if (! this.supportsLocalStorage) {
              return false;
            }
            return localStorage.setItem( this.prefix + key, value);
          },
          getValue: function( key ) {
            if (! this.supportsLocalStorage) {
              return null;
            }
            return localStorage.getItem( this.prefix + key);
          }
        }
      });

      qx.Class.define("lour.Server", {
        extend: qx.core.Object,
        type: "singleton",
        construct: function() {
	  //webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateCity, this);
          // this next listener WILL fire each time you change a city
	  //webfrontend.data.City.getInstance().addListener("changeCity", this.onCityChanged, this);
	  webfrontend.data.City.getInstance().addListener("changeVersion", this.updateCity, this);
	  this._pollCityTimer = new qx.event.Timer(lour.Const.MIN_SEND_COMMAND_INTERVAL);
	  this._pollCityTimer.addListener("interval", this._pollNextCity, this);
        },
        properties: {
	  lastUpdatedCityId: {
	    init: false,
	    event: "lour.data.changeLastUpdatedCityId"
	  }, 
	  lastUpdatedCityAt: {
	    init: false
	  }
        }, 
        members: {
	  cities: new Object(),
	  cityResources: new Object(),
	  como: new Object(),
	  _citiesToPoll: new Array(),
	  _publicCities: new Array(),
	  _cityPollTime: new Array(),
	  _citiesToPersist: new Array(),
	  _dirtyCities: new Object(),
	  persistCityTimer: null,
	  _showPollCitiesProgressDialog: false,
	  _pollCitiesProgressDialog: null,
	  _endPollCallback: null,
          _endPollCallbackId: null,
	  sectors: new Object(),
          fetchLimit: 0,   // set to 0 for release!
	  onCityChanged: function() {
	    var city = webfrontend.data.City.getInstance();
	    if (city.getId() == -1) {
              console.log("City changed but ID was -1");
	      return;
	    }
            console.log("City changed: " + city.getId());
	    this.markCityDirty(city.getId());			
	  },
	  markCityDirty: function(s) {
	    var cityId = parseInt(s, 10);
	    var dirty = this._dirtyCities[cityId] || false;
	    if (!dirty) {
	      this._dirtyCities[cityId] = true;
	    }
	  },
	  markCityPolled: function(s) {
	    this._cityPollTime[s] = (new Date()).getTime();
	  },
	  cityPollable: function(s) {
            var a = (new Date()).getTime();
	    var b = this._cityPollTime[s];
            if (typeof b == 'undefined' || (b + lour.Const.MIN_POLL_INTERVAL) < a) {
              console.log("City " + s + " is pollable (" + a + " vs " + b + ")");
              return true;
            } else {
              console.log("City " + s + " is not pollable yet (" + a + " vs " + b + ")");
              return false;
            }
	  },
	  fetchPublicCity: function(cityid, callback, arg) {
            console.log("arg is " + arg);
            if (this.cities[cityid]) {
              callback(this.cities[cityid]);
              return true;
            }
            this._fetchLimit++;
            this.addPublicPollableCity(cityid);
            this._endPollCallback = callback;
            this._endPollCallbackId = cityid;
	    this._pollCityTimer.start();
            this._showPollCitiesProgressDialog = false;
            return true;
	  }, 
	  pollCities: function(citiesToPoll) {
	    this._citiesToPoll = citiesToPoll;
	    this._disposePollCitiesProgressDialog();
	    this._pollCitiesProgressDialog = new webfrontend.gui.ConfirmationWidget();
            this._showPollCitiesProgressDialog = true;
            if (this._showPollCitiesProgressDialog) {
	      this._pollCitiesProgressDialog.showInProgressBox(tr("cities to fetch") + this._citiesToPoll.length);
            }
	    qx.core.Init.getApplication().getDesktop().add(this._pollCitiesProgressDialog, {
	      left: 0,
	      right: 0,
	      top: 0,
	      bottom: 0
	    });
	    this._pollCitiesProgressDialog.show();
	    this._pollCityTimer.start();
	  },
	  pollAllCities: function() {
	    var citiesToPoll = [];		
	    
	    var cities = webfrontend.data.Player.getInstance().cities;
	    for (var cityId in cities) {
	      if (cityId != undefined) {
	        if (this.cityPollable(cityId)) {
                  citiesToPoll.push(cityId);
                }
	      }
	    }
	    this.pollCities(citiesToPoll);
	  },
          addPublicPollableCity: function(cityid) {
            console.log("Adding city " + cityid + " to pollable list");
            this._citiesToPoll.unshift(cityid);
            this._publicCities[cityid] = true;
          },
          _disposePollCitiesProgressDialog: function() {
	    if (this._pollCitiesProgressDialog != null) {
	      this._pollCitiesProgressDialog.disable();
	      this._pollCitiesProgressDialog.destroy();
	      this._pollCitiesProgressDialog = null;
              this._showPollCitiesProgressDialog = false;
	    }
	  },
	  _pollNextCity: function() {
            //            console.log("_pollNextCity called");
	    if (this._citiesToPoll.length > 0) {
              //              console.log("possibly fetching cities");
	      var cityId = this._citiesToPoll[0];
	      this._citiesToPoll.splice(0, 1);
              if (this.cityPollable(cityId)) {
                if (this._publicCities[cityId]) {
                  console.log("fetching PUBLIC city ID " + cityId);
	          lour.net.CommandManager.getInstance().pollPublicCity(cityId);
                  
                } else {
                  console.log("fetching city ID " + cityId);
	          lour.net.CommandManager.getInstance().pollCity(cityId);
                }
	        this.markCityPolled(cityId);
              }
              if (this._showPollCitiesProgressDialog ) {
	        this._pollCitiesProgressDialog.showInProgressBox(tr("cities to fetch") + this._citiesToPoll.length);
              }
              if (this.fetchLimit > 0) {  // this is just for debugging
                this.fetchLimit--;
                if (this.fetchLimit == 0) {
	          this._pollCityTimer.stop();
	          this._disposePollCitiesProgressDialog();
                  var report = getReportWidget();
                  report.pollFinished();
                }
              }
	    } else {
	      this._pollCityTimer.stop();
	      this._disposePollCitiesProgressDialog();
              if (this._endPollCallback) {
                var tmpfn = this._endPollCallback;
                this._endPollCallback = null;
                tmpfn(this.cities[this._endPollCallbackId]);
                  
              } else {
                var report = getReportWidget();
                report.pollFinished();
              }
	    }
	  },
	  updateCity: function() {
	    var city = webfrontend.data.City.getInstance();
	    if (city.getId() == -1) {
	      return;
	    }
	    var c = new lour.City();
	    c.populate(city);
	    if (this.cities[c.getId()] != undefined) {
	      this.cities[c.getId()].dispose();
	    }
	    this.cities[c.getId()] = c;
            
	    this.setLastUpdatedCityId(c.getId());
	    this.setLastUpdatedCityAt(new Date());
	    this.markCityPolled(city.getId());
	  },
	  addCOMOItem: function(item) {
	    this.como[item.i] = item;
	    this.updateCityFromCOMOItem(item);
	  },
	  updateCityFromCOMOItem: function(item) {
	    if (this.cities[item.i] == undefined) {
	      return;
	    }
	    var city = this.cities[item.i];
	    city.units = new Object();
	    city.unitOrders = new Array();
	    
	    for (var i = 0; i < item.c.length; i++) {
	      var command = item.c[i];
	      var units = new Array();
	      for (var j = 0; j < command.u.length; j++) {
	        var unit = command.u[j];
	        
	        if (command.i == 0) {						
		  city.units[unit.t] = {
		    count: unit.c,
		    total: unit.c,
		    speed: -1
		  };
	        } else {
		  var cityUnits = city.units[unit.t];
		  if (cityUnits == undefined) {
		    city.units[unit.t] = {
		      count: 0,
		      total: 0,
		      speed: -1							
		    };
		    cityUnits = city.units[unit.t];
		  }
		  if (command.d == 0) {
		    //delayed order cannot increase troop count
		    cityUnits.total += unit.c;
		  }
	        }
	        
	        units.push({
		  type: unit.t,
		  count: unit.c
	        });
	      }
	      if (command.i != 0) {
	        //{"i":26722474,"t":8,"s":2,"cn":"Mountain:9","c":7995428,"pn":"","p":0,"e":19024467,"d":0,"q":0,"r":1,"u":[{"t":6,"c":129237}]}]},
	        
	        var order = {
		  id: command.i,
		  type: command.t,
		  state: command.s,
		  //start: command.ss,
		  start: null,
		  end: command.e,
		  city: command.c,
		  cityName: command.cn,
		  player: command.p,
		  playerName: command.pn,
		  //alliance: command.a,
		  //allianceName: command.an,
		  units: units,
		  isDelayed: command.d,
		  recurringType: command.r,
		  //recurringEndStep: command.rs,
		  quickSupport: command.q,
                  onWater: command.w
	        };
	        city.unitOrders.push(order);				
	      }
	    }			
	  }		
        }
      });

      qx.Class.define("lour.DBServer", {
        extend: qx.core.Object,
        type: "singleton",
        construct: function() {
          if (this.debugMe) { console.log("Constructing DB server"); }

          // Supported alliances
          this.allianceId["Organized Chaos"] = 1;
          this.allianceId["Controlled Chaos"] = 2;
          this.allianceId["Pirates of Chaos"] = 3;

          var stor = lour.Storage.getInstance();
          var s = stor.getValue(this.lsID_checkString);
          if (s == null) {
            if (this.debugMe) { console.log("Making new string"); }
            this.checkString = this.makeId();
          } else {
            if (this.debugMe) { console.log("Retrieving old string"); }
            this.checkString = s;
          }
            
          stor.setValue(this.lsID_checkString, this.checkString);
          if (this.debugMe) { console.log("Checkstring is " + this.checkString); }
        },
        members: {
          debugMe: true,
          contact: false,
	  checkString: "__unsupported__",
          lsID_checkString: 'db_checkString',
	  responseString: "__unset__",
          allianceId: new Array(),
          reportChecked: new Array(),
          getAllianceId: function(alliance) {
            return this.allianceId[alliance];
          },
          reportSeen: function(id) {
            return this.reportChecked[id] != null;
          },
          sendReport: function(id, data) {

            // var fA = data.h.t.substr(0,5);
            // console.log("fA is " + fA);
            // fA - 11115 - They siege me
            // fA - 01015 - I siege them
            // fA - 01095 - Cancelled my siege

            // fA - 01114 - Support arrives
            // fA - 01104 - Support cancelled

            // fA - *1013 - I assault them
            // fA - *1113 - They Assault me

            // fA - *1001 - (green) I scout them
            // fA - *1011 - (yellow) I scout them
            // fA - *1111 - They scout me

            // fA - *1012 - I plunder them
            // fA - *1112 - They plundered me

            // So..
            var reportType = data.h.t.substr(4,1);
            var meIsTarget = data.h.t.substr(2,1) == "1";

            var s = "Report: ";
            var processThis = true;
            switch(reportType) {
             case "5":
              s += "Siege ";
              break;
             case "4":
              s += "Support ";
              processThis = false;
              break;
             case "3":
              s += "Assault ";
              break;
             case "2":
              s += "Plunder ";
              break;
             case "1":
              s += "Scout ";
              break;
             default:
              processThis = false;
              s += "(uncategorized) ";
              break;
            }
            
            if (meIsTarget) {
              s += "to me ";
            } else {
              s += "from me ";
            }

            if (meIsTarget && processThis) {
              var sendvec = new Array();
              sendvec["a"] = data.a[0].a;
              sendvec["p"] = data.a[0].pn;
              var cityId = data.a[0].c[0].i;
              var units = data.a[0].u;
              for (k in units) {
                var unitType = units[k].t;
                s += "using " + unitType + " ";
                sendvec["u" + unitType] = units[k].o;
              }
              var sd = this;
              lour.Server.getInstance().fetchPublicCity(cityId, function(city) {
                sendvec["x"] = city.x;
                sendvec["y"] = city.y;
                console.log("Yo " + sd);
                sd.sendData("sc",sendvec);
              });

              if (this.debugMe) { console.log(s); }
            }
            
            this.reportChecked[id] = true;
            return true;
          },
          makeId: function () {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@";
            for( var i=0; i < 15; i++ ) {
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
          },
	  sendData: function(cmd, data) {
            var encodePost = "";
            for (var k in data) {
              console.log("data[" + k + "] = " + data[k]);
              encodePost += k + "\021" + data[k] + "\021";
            }
            var encodedPost = utf8_to_b64(encodePost);
            
            // This is freakin odd. If I trigger an error by mis-specifying the return content type,
            // everything works. If I specify the correct content type, no gets are sent.
            var query = 's=' + this.responseString + '&t=' + this.checkString + '&c=' + encodedPost;
            var req = new qx.io.remote.Request(lour.Const.CITYINPUT_URL + '/' + cmd + '?' + query, 'GET', "text/plain");
            req.setCrossDomain(true);
            var me = this;
            req.addListener("completed", function (e) {
              me.setResponse(e.getContent());
            });
            req.send();
	  },
          setResponse: function(response) {
            this.responseString = response;
          },
          sanitizeString: function (s) {
            return utf8_to_b64(s);
          },
	  initSession: function() {
            var playerName = webfrontend.data.Player.getInstance().getName();
            var req = new qx.io.remote.Request(lour.Const.CITYINPUT_URL + '/i?p=' + this.sanitizeString(playerName) + '&s=' + this.checkString, 'GET', "text/plain");
            req.setCrossDomain(true);
            var me = this;
            req.addListener("completed", function (e) {
              me.setResponse(e.getContent());
              me.contact = true;
            });
            req.send(); 
          }
        }
      });

      qx.Class.define("lour.Tweaks", {
        type: "singleton",
        extend: qx.core.Object,
        members: {
          _reportHook: null,
          gameStarted: function() {
            var res = webfrontend.res.Main.getInstance();           
            console.log("game started");

            var allianceName = webfrontend.data.Alliance.getInstance().getName();
            var db = lour.DBServer.getInstance();
            if (db.getAllianceId(allianceName) == null) {
              console.log("You are not in the proper alliance '" + allianceName + "'to use this tool");
              return;
            }
            db.initSession();

            this.tweakErrorReporting();

            try {
              var container = a.title.reportButton.getLayoutParent();
              var btnReport = new qx.ui.form.Button(tr("mainMenuName")).set({
                marginLeft: 10
              });
              btnReport.setWidth(90);
              btnReport.setHeight(32);
              container._add(btnReport, {
                row: 0,
                column: 16
              });
              btnReport.addListener("click", function (event) {
                this.showReport();
              }, this);

              // ghod
              
              var container2 = a.getReportPage();
              container2._lourOrig = container2._onReport;
              container2._onReport = function (r, fm, fn) {
           	var app = qx.core.Init.getApplication();
		var rep = app.getReportPage();     
                rep._lourOrig(r, fm, fn);

                var opts = lour.Options.getInstance();
                if (! opts.getOption("autoscanreports")) {
                    return;
                }

                console.log(rep);
                var db = lour.DBServer.getInstance();
                var id = rep.__pu;
                console.log("_onReport " + rep.__pu);
                if (db.reportSeen(id)) {
                  console.log("ID " + id + " already seen");
                } else {
                  console.log("ID " + id + " not seen ... sending");
                  db.sendReport(rep.__pu, rep.rawData);
                }
              };


            } catch (e) {
              lour.Utils.showMsg("Error loading lour.Tweaks: " + e);
            }
          },
 	  showReport: function() {
            try {
	      var server = lour.Server.getInstance();
            } catch (e) {
              console.log("something failed: " + e);
            }
            var report = getReportWidget();

	    server.updateCity();
            report.waitForPollToFinish();
	    server.pollAllCities();
            report.delayedUpdateView();
	  },
          tweakErrorReporting: function() {
            qx.event.GlobalError.setErrorHandler( function(message) {
              console.log("QX Error: " + message);
            }, this);
          }
        }
      });

      var reportWidget = null;
      function getReportWidget() {
	if (reportWidget == null) {
	  reportWidget = new lour.gui.reportWidget();
	}
	return reportWidget;
      }

      function getUnitRequiredSpace(unitType) {
	var res = webfrontend.res.Main.getInstance();
	var unit = res.units[unitType];
	if (unit == null) {
	  return 0;
	}
	return unit.uc;
      }  

      function formatUnits(units) {
	    var s = "";
        
	for (var key in units) {
	  if (key == undefined) continue;
          
	  var unit = units[key];
          
	  if (unit == undefined || unit.o == undefined || unit.t == undefined || unit.l == undefined) {
	    continue;
	  }
          
	  if (s != "") {
	    s += ", ";
	  }
          
	  //var lost = unit.o - unit.l;
	  //s += unit.o + "-" + lost + "=" + unit.l + " ";
	  /* old format */
	  s += unit.o + " ";
	  if (unit.l != unit.o) {
	    s += "(" + unit.l + ") ";
	  }
          
	  s += formatUnitType(unit.t, unit.o);
	}
        
	if (s == "") {
	  s = "none";
	}
        
	return s;
      }

      function formatUnitType(unitType, count) {
	var res = webfrontend.res.Main.getInstance();
	var unit = res.units[unitType];
	if (unit == null) {
	  return "UNKNOWN_" + unitType;
	}
	var name = unit.dn.toLowerCase();
	var locale = qx.locale.Manager.getInstance().getLocale();
	if (locale == "en") {
	  if (name != null && name.length > 0 && name.charAt(name.length - 1) != 's' && count > 1) {
	    name += 's';
	    if (name == "crossbowmans") {
	      name = "crossbowmen";
	    }
	  }
	} else {
	  if (name != null && name.length > 0 && count > 1) {
	    switch (name) {
	     case "stadtwächter":
	      name = "Stadtwächter";
	      break;
	     case "balliste":
	      name = "Baliste(n)";
	      break;
	     case "jäger":
	      name = "Jäger";
	      break;
	     case "pikenier":
	      name = "Pikenier(e)";
	      break;
	     case "templer":
	      name = "Templer";
	      break;
	     case "beserker":
	      name = "Berserker";
	      break;
	     case "magier":
	      name = "Magier";
	      break;
	     case "kundschafter":
	      name = "Kundschafter";
	      break;
	     case "armbrustschütze":
	      name = "Armbrustschütze(n)";
	      break;
	     case "paladin":
	      name = "Paladin(e)";
	      break;
	     case "ritter":
	      name = "Ritter";
	      break;
	     case "hexenmeister":
	      name = "Hexenmeister";
	      break;
	     case "rammbock":
	      name = "Rammböcke";
	      break;
	     case "katapult":
	      name = "Katapult(e)";
	      break;
	     case "fregatte":
	      name = "Fregatte(n)";
	      break;
	     case "schaluppe":
	      name = "Schaluppe(n)";
	      break;
	     case "kriegsgaleone":
	      name = "Kriegsgaleone(n)";
	      break;
	     case "baron":
	      name = "Baron(e)";
	      break;
	    }
	  }
	}
	return name;
      }

      
      qx.Class.define("lour.gui.reportWidget", {
        type: "singleton",
        extend: qx.ui.window.Window,            
        construct: function() {
          qx.ui.window.Window.call(this);
          this.setLayout(new qx.ui.layout.Dock());
          
          var maxWidth = qx.bom.Viewport.getWidth(window);
          var maxHeight = qx.bom.Viewport.getHeight(window);                      
          var pos = {
            left: 400,
            top: 150,
            width: 1400,
            height: 500
          };             
          
          this.set({
            width: pos.width,
            minWidth: 200,
            maxWidth: parseInt(maxWidth * 0.95),
            height: pos.height,
            minHeight: 200,
            maxHeight: parseInt(maxHeight * 0.9),
            allowMaximize: false,
            allowMinimize: false,
            showMaximize: false,
            showMinimize: false,
            showStatusbar: false,
            showClose: false,
            caption: tr("reportWidget"),
            resizeSensitivity: 7,
            contentPadding: 0,
            zIndex: 100000 - 1
          });                             
          
          this.moveTo(pos.left, pos.top);
          
          this.tabView = new qx.ui.tabview.TabView().set({
            contentPadding: 5
          });
          this.tabView.setAppearance("tabview");
          
          this.infoTab = new lour.gui.InfoPage();
          this.tabView.add(this.infoTab);

          this.reportTab = new lour.gui.ReportPage();
          this.tabView.add(this.reportTab);
          
          this.optionsTab = new lour.gui.OptionsPage();
          this.tabView.add(this.optionsTab);

          this.tabView.addListener("changeSelection", this.onChangeTab, this);            
          this.add(this.tabView);
          
          webfrontend.gui.Util.formatWinClose(this);

          this._updateTimer = new qx.event.Timer(750); // not sure what this really should be
	  this._updateTimer.addListener("interval", this.delayedUpdateView, this);
        }, 
        members: {
          tabView: null,
          infoTab: null,
          reportTab: null,
          optionsTab: null,
	  _requestedResourceType: 1,
	  _requestedResourceCity: 0,
	  _requestedResourceFetchedCities: null,
	  _requestedResourceRefreshView: false,								
	  _requestResourcesProgressDialog: null,
	  _waitingForFullMessage: true,

          _waitingForPoll: false,
          _updateTimer: null,
	  
	  cities: null,
	  resfHandlerAdded: false,
          
	  updateManagerConsumers: [],
	  guardianTimer: null,
	  lastUpdateViewTime: 0,
          waitForPollToFinish: function() {
            this._waitingForPoll = true;
          },
          pollFinished: function() {
            this._waitingForPoll = false;
          },
          delayedUpdateView: function() {
            if (this._waitingForPoll) {
              this._updateTimer.start();
            } else {
              this._updateTimer.stop();
              if (! this.isVisible()) {
                this.open();
	      }
              this.updateView();
            }
          },
	  getRequestDetails: function(dt) {
	    if (this._waitingForFullMessage) {
	      return "a";
	    } else {
	      return "";
	    }
	  }, 
	  dispatchResults: function(du) {
	    if (this._waitingForFullMessage) {
	      this._waitingForFullMessage = false;
	    }
	    if (du == null || du.length == 0) return;
	    
	    for (var i = 0, count = du.length; i < count; i++) {
	      var dv = du[i];
	      this.cities[dv.i] = dv;
	    }
	    
	    this.updateView(true);					
	  }, 
	  onTick: function() {
            
	  }, 
	  _addDefendersToRow: function(city, row, sum) {
	    row["ts"] = 0;
	    row["summary_military"] = "";
	        row["unitsAtHome"] = 0;
	    for (var i = 1; i <= 19; i++) {
	      var unitKey = "unit_" + i;
	      if (i == 18) continue;
	      var unit = city.getUnitTypeInfo(i);
	      row[unitKey] = unit.total;
	      row["unit_def_" + i] = unit.count;
	      row["support_def_" + i] = 0;
	      row["unitsAtHome"] += unit.count;
	      if (sum[unitKey] == null || sum[unitKey] == "") {
		sum[unitKey] = 0;
	      }
	      sum[unitKey] += unit.total;
              
	      var space = unit.total * getUnitRequiredSpace(i);
	      row["ts"] += space;
	      sum["ts"] += space;
              
	      if (unit.total > 0) {
		if (row["summary_military"].length > 0) {
		  row["summary_military"] += ", ";
		}
		row["summary_military"] += unit.total + " " + formatUnitType(i, unit.total);
	      }
	    }
	    if (city.getSupportOrders() != null) {
	      for (var i = 0; i < city.getSupportOrders().length; i++) {
		var order = city.getSupportOrders()[i];
		if (order.state == 4 && order.units != null) {

                  if (row["support_orders"] == null) {
                    row["support_orders"] = new Array();
                  }
                  var orderlist = row["support_orders"];

                  var orderkey = order.playerName + "_from_" + order.city;
                  if (orderlist[orderkey] == null) {
                    orderlist[orderkey] = new Array();
                  }
                  var playerorder = orderlist[orderkey];
                  playerorder["player"] = order.playerName;
                  playerorder["alliance"] = order.allianceName;
                  playerorder["cityId"] = order.city;
                  
		  for (var u = 0; u < order.units.length; u++) {
		    var unit = order.units[u];
		    row["unit_def_" + unit.type] += unit.count;
		    row["support_def_" + unit.type] += unit.count;
                    playerorder["unit_" + unit.type] = unit.count;
		  }
		}
	      }
	    }
            
	    row["summary_defenders_ts"] = 0;
	    row["summary_defenders"] = "";
	    row["summary_support"] = "";
	    for (var i = 1; i <= 19; i++) {
	      if (i == 18) continue;
	      var unitKey = "unit_def_" + i;
	      var supportKey = "support_def_" + i;
	      if (row[unitKey] != "0" && row[unitKey] != null) {
		if (row["summary_defenders"].length > 0) {
		  row["summary_defenders"] += ", ";
		}
		row["summary_defenders"] += row[unitKey] + " " + formatUnitType(i, row[unitKey]);
                
		if (sum[unitKey] == null || sum[unitKey] == "") {
		  sum[unitKey] = 0;
		}
		sum[unitKey] += row[unitKey];
		var space = row[unitKey] * getUnitRequiredSpace(i);
		row["summary_defenders_ts"] += space;
		sum["summary_defenders_ts"] += space;
	      }
	      if (row[supportKey] != "0" && row[supportKey] != null) {
		if (row["summary_support"].length > 0) {
		  row["summary_support"] += ", ";
		}
		row["summary_support"] += row[supportKey] + " " + formatUnitType(i, row[supportKey]);
	      }
	    }
            
            
	    sum["summary_military"] = "";
	    for (var i = 1; i <= 19; i++) {
	      var unitKey = "unit_" + i;
	      if (i == 18) continue;
	      if (sum[unitKey] != "0" && sum[unitKey] != null && sum[unitKey] != "") {
		if (sum["summary_military"].length > 0) {
		  sum["summary_military"] += ", ";
		}
		sum["summary_military"] += sum[unitKey] + " " + formatUnitType(i, sum[unitKey]);
	      }
	    }
            
	    sum["summary_defenders"] = "";
	    for (var i = 1; i <= 19; i++) {
	      var unitKey = "unit_def_" + i;
	      if (i == 18) continue;
	      if (sum[unitKey] != "0" && sum[unitKey] != null && sum[unitKey] != "") {
		if (sum["summary_defenders"].length > 0) {
		  sum["summary_defenders"] += ", ";
		}
		sum["summary_defenders"] += sum[unitKey] + " " + formatUnitType(i, sum[unitKey]);
	      }
	    }

	  },
	  updateView: function(isAutoRefreshed) {
	    
	    var startTime = (new Date()).getTime();
	    
	    if (!this.isSeeable()) {
	      //console.log("Main summary view is hidden, nothing to update");
	      return;
	    }
	    
	    if (isAutoRefreshed === true && startTime - this.lastUpdateViewTime <= lour.Const.MIN_INTERVAL_BETWEEN_AUTO_REFRESHES) {
	      //console.log("summary was recently auto updated skipping update");
	      return;
	    }

            if (this.tabView.isSelected(this.reportTab)) {
              this.reportTab.updateView();
            }
            
	    var finishTime = (new Date()).getTime();
	    //console.log("summary.updateView took " + (finishTime - startTime) + "ms , previous update ended " + (startTime - this.lastUpdateViewTime) + "ms before current one started");
	    this.lastUpdateViewTime = finishTime;
	  },
          onChangeTab: function() {
            if (this._waitingForPoll) {
              return;
            }
            this.updateView();
          }
	}
      });

      qx.Class.define("lour.ui.table.cellrenderer.Default", {
	extend : qx.ui.table.cellrenderer.Default,
	construct: function(align, color, style, weight){
	  this.base(arguments);
	  this.__defaultTextAlign = align || "";
	  this.__defaultColor = color || lour.Const.TABLE_DEFAULT_COLOR;
	  this.__defaultFontStyle = style || "";
	  this.__defaultFontWeight = weight || "";
	}, 
	members: {
	  __defaultTextAlign : null,
	  __defaultColor : null,
	  __defaultFontStyle : null,
	  __defaultFontWeight : null,
          
	  _getCellStyle : function(cellInfo) {
	    var tableModel = cellInfo.table.getTableModel();
            
	    var style = {
	      "text-align": this.__defaultTextAlign,
	      "color": this.__defaultColor,
	      "font-style": this.__defaultFontStyle,
	      "font-weight": this.__defaultFontWeight,
	      "border-top": lour.Const.TABLE_BORDER
	    };
	    
	    var id = tableModel.getValueById("id", cellInfo.row);
	    if (id == "Total") {
	      style["border-top"] = lour.Const.TABLE_SUMMARY_ROW_BORDER;
	    } else if (qx.lang.Type.isNumber(id) && id < 0) {
	      style["border-bottom"] = lour.Const.TABLE_SUMMARY_ROW_BORDER;
	    }
            
	    var styleString = [];
	    for(var key in style) {
	      if (style[key]) {
		styleString.push(key, ":", style[key], ";");
	      }
	    }
	    return styleString.join("");
	  }
	}
      });
      
      qx.Class.define("lour.ui.table.cellrenderer.Boolean", {
	extend : qx.ui.table.cellrenderer.Boolean,
	construct: function(align, color, style, weight){
	  this.base(arguments);
	  this.__defaultTextAlign = align || "";
	  this.__defaultColor = color || lour.Const.TABLE_DEFAULT_COLOR;
	  this.__defaultFontStyle = style || "";
	  this.__defaultFontWeight = weight || "";
	}, 
	members: {
	  __defaultTextAlign : null,
	  __defaultColor : null,
	  __defaultFontStyle : null,
	  __defaultFontWeight : null,
          
	  _getCellStyle : function(cellInfo) {
	    var tableModel = cellInfo.table.getTableModel();
            
	    var style = {
	      "text-align": this.__defaultTextAlign,
	      "color": this.__defaultColor,
	      "font-style": this.__defaultFontStyle,
	      "font-weight": this.__defaultFontWeight,
	      "border-top": lour.Const.TABLE_BORDER
	    };
	    
	    var id = tableModel.getValueById("id", cellInfo.row);
	    if (id == "Total") {
	      style["border-top"] = lour.Const.TABLE_SUMMARY_ROW_BORDER;
	    } else if (qx.lang.Type.isNumber(id) && id < 0) {
	      style["border-bottom"] = lour.Const.TABLE_SUMMARY_ROW_BORDER;
	    }
            
	        var styleString = [];
	    for(var key in style) {
	      if (style[key]) {
		styleString.push(key, ":", style[key], ";");
	      }
	    }
	    return styleString.join("");
	  }
	}
      });
      
      
      qx.Class.define("lour.gui.Page", {
	extend: qx.ui.tabview.Page,
	construct: function() {
	  qx.ui.tabview.Page.call(this);
	}, 
	members: {
	  _table: null,
	  _tableModel: null,
	  _addBlankValuesToRow: function(row, tableModel) {
	    //it seems that case insensitive doesnt handle well null values so it's safer to populate row with empty values
	    for (var col = 0; col < tableModel.getColumnCount(); col++) {
	      row[tableModel.getColumnId(col)] = "";
	    }
	  }, 
	  updateView: function() {
	    if (!this.isSeeable()) {
	      //console.log("Some view is hidden, nothing to update");
              console.log("something hidden, not doing page update view");
	      return;
	    }
	    
	    if (this._tableModel == null) {
	      return;
	    }
	    this._tableModel.setDataAsMapArray(this.createRowData(), false);
            this._tableModel.sortByColumn(2, true);
	  }
	}
      });
      
      qx.Class.define("lour.ui.table.Table", {
	extend: qx.ui.table.Table,
	construct: function(tableModel, custom) {
	  //this.base(arguments);
	  qx.ui.table.Table.call(this, tableModel, custom);
	  this._setupTableLookAndFeel();
	}, 
	members:  {
	  _setupTableLookAndFeel: function() {
	    this.setStatusBarVisible(false);
	    var focusedRowBGColor = "#555555";
	    var rowBGColor = "#373930";
	    this.setDataRowRenderer(new webfrontend.ui.RowRendererCustom(this, focusedRowBGColor, focusedRowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor));
	        this.setHeaderCellHeight(22);
	    var tcm = this.getTableColumnModel();
	    for (var col = 0; col < tcm.getOverallColumnCount(); col++) {
	      tcm.setDataCellRenderer(col, new lour.ui.table.cellrenderer.Default());
	    }										
	  }
	}
      });
      
      qx.Class.define("lour.gui.InfoPage", {
	extend: lour.gui.Page,
        construct: function() {
	  lour.gui.Page.call(this);
	  this.setLabel(tr("infoTab"));
	  this.setLayout(new qx.ui.layout.VBox(10));
	  var textbox = new qx.ui.basic.Label().set({
            value: mod_info_string(),
            rich: true,
            padding: 10
          });

          this.add(textbox);
	}
      });
      
      qx.Class.define("lour.gui.ReportPage", {
	extend: lour.gui.Page,
	construct: function() {
          console.log("Made reportpage");
	  lour.gui.Page.call(this);
	  this.setLabel(tr("reportTab"));
	  this.setLayout(new qx.ui.layout.VBox(10));
	  
	  this.add(this._createToolBar());		
	  
	  this._tableModel = new qx.ui.table.model.Simple();
	  var columnNames = [ tr("id"), tr("upload"), tr("name"), tr("position"), tr("reference"), tr("water"), tr("castle"), tr("ts"), tr("breakdown"), tr("support")];
	  var columnIds = ["id", "upload", "name", "position", "reference", "water", "castled", "ts", "breakdown", "support"];
	  this._tableModel.setColumns(columnNames, columnIds);

	  this.table = new lour.ui.table.Table(this._tableModel);
          //	  this.table.addListener("cellClick", this._handleCellClick, this);
          
	  var columnModel = this.table.getTableColumnModel();
	  columnModel.setColumnVisible(0, false);
          for (var i = 1; i < 4; i++) {
	    columnModel.setColumnWidth(i, 60);
	  }
	  columnModel.setColumnWidth(4, 100);
	  columnModel.setColumnWidth(5, 100);
	  columnModel.setColumnWidth(6, 100);
	  columnModel.setColumnWidth(7, 100);
	  columnModel.setColumnWidth(8, 400);
	  columnModel.setColumnWidth(9, 400);
          
	  columnModel.setDataCellRenderer(this._tableModel.getColumnIndexById("upload"), new lour.ui.table.cellrenderer.Boolean());
          
          var selectionModel = this.table.getSelectionManager().getSelectionModel();

          selectionModel.setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION_TOGGLE);

          selectionModel.addListener("changeSelection",
                                     function(e) {
                                       var tablemodel = this.getTableModel();
                                       var data = tablemodel.getDataAsMapArray();
                                       var colSelect = tablemodel.getColumnIndexById("upload");
                                       for (var i=0,l=data.length;i<l;i++) {
                                         var rowIsSelected = selectionModel.isSelectedIndex(i);
                                         tablemodel.setValue(colSelect, i, rowIsSelected);
                                       }
                                     }, this.table);

          
          this.table.setRowFocusChangeModifiesSelection(false);
          this.table.setResetSelectionOnHeaderClick(false);
          this.table.setFocusedCell(0, 0, true);

	  this.add(this.table, {flex: 1, edge: 0});					

          this.unitXlate["unit_1"] = "CityGuards";
          this.unitXlate["unit_2"] = "Ballistae";
          this.unitXlate["unit_3"] = "Rangers";
          this.unitXlate["unit_4"] = "Guardians";
          this.unitXlate["unit_5"] = "Templars";
          this.unitXlate["unit_6"] = "Zerks";
          this.unitXlate["unit_7"] = "Mages";
          this.unitXlate["unit_8"] = "Scouts";
          this.unitXlate["unit_9"] = "Xbows";
          this.unitXlate["unit_10"] = "Pallies";
          this.unitXlate["unit_11"] = "Knights";
          this.unitXlate["unit_12"] = "Warlocks";
          this.unitXlate["unit_13"] = "Rams"; 
          this.unitXlate["unit_14"] = "Cats";
          this.unitXlate["unit_15"] = "Frigates";
          this.unitXlate["unit_16"] = "Sloops";
          this.unitXlate["unit_17"] = "War Galleons";

          this.unitFormName["Pallies"] = "entry.1050147013";
          this.unitFormName["Mages"] = "entry.2046802233";
          this.unitFormName["Warlocks"] = "entry.1941766282";
          this.unitFormName["Knights"] = "entry.1362502563";
          this.unitFormName["Zerks"] = "entry.527576880";
          this.unitFormName["Rams"] = "entry.574525434";
          this.unitFormName["Cats"] = "entry.282396340";
          this.unitFormName["War Galleons"] = "entry.580964945";
          this.unitFormName["Frigates"] = "entry.1728693612";
	}, 
	members: {
          unitFormName: [],
          unitXlate: [],
          //          cityToRow: [],
	  table: null,
	  _tableModel: null,
	  sbCityType: null,
	  sbContinents: null,
          _cityCache: new Array(),
	  createRowData: function() {
	    var rowData = [];
            
	    var cities = webfrontend.data.Player.getInstance().cities;
            
            var sum = [];
            //	    this._addBlankValuesToRow(sum, this._tableModel);
            //	    sum["id"] = "Total";
            //	    sum["name"] = "Total";
            //	    sum["ts"] = 0;
            //	    sum["summary_defenders_ts"] = 0;
            //	    sum["upload"] = false; 
	    
	    var server = lour.Server.getInstance();
            var opts = lour.Options.getInstance();
            var rowidx = 0;
	    for (var cityId in cities) {
	      var c = cities[cityId];
	      if (c == null) { continue; }

	      var unknownValue = "";
	      var row = [];
	      this._addBlankValuesToRow(row, this._tableModel);
	      row["id"] = cityId;
	      row["name"] = c.name;
	      row["position"] = c.xPos + "::" + c.yPos;
	      row["reference"] = c.reference;
              row["upload"] = opts.getOption("autosendcities");

//              var bitfield = '';
//              for (i=4; i>=0; i--) {
//                bitfield += ( (c.type & (1 << i)) ? "1" : "0");
//              }

              row["castled"] = ( (c.type & 2) ) ? "yes" : "";
//              console.log("City " + c.name + " type is " + c.type + "... bitfield: " + bitfield );
	      
	      var city = server.cities[cityId];
              var dummyrow = [];
	      if (city != undefined && ! city.isPublic) {
		getReportWidget()._addDefendersToRow(city, dummyrow, sum);
                console.log(c.name + " type of city.onWater is " + typeof(city.onWater));
                console.log(c.name + " value of city.onWater is " + city.onWater);
                row["water"] = (city.onWater == 1) ? "yes" : "";
	      }
              row["ts"] = dummyrow["ts"];
              row["breakdown"] = dummyrow["summary_military"];
              row["support"] = dummyrow["summary_support"];
              for (var k in dummyrow) {
                //                console.log(k + " is " + dummyrow[k]);
                row["raw_" + k] = dummyrow[k];
              }

              
	      rowData.push(row);
              this._cityCache[cityId] = new Array(row, dummyrow);
              //              this.cityToRow[cityId] = rowidx;
              rowidx++;
            }
	    
            //	    if (rowData.length > 0) {
            //	      rowData.push(sum);
            //	    }
            
	    return rowData;
	  },
          _initAllSelections: function(value) {
              console.log("Init to " + value);
              var selectionModel = this.table.getSelectionManager().getSelectionModel();
              var tablemodel = this.table.getTableModel();
              var data = tablemodel.getDataAsMapArray();
              var colSelect = tablemodel.getColumnIndexById("upload");
              for (var i=0,l=data.length;i<l;i++) {
                   tablemodel.setValue(colSelect, i, value);
              }
              // brute fucking force
              if (value) {
                 selectionModel.setSelectionInterval(0, data.length);
              } else {
                 selectionModel.resetSelection();
              }
          },
	  _createToolBar: function() {
	    var toolBar = new qx.ui.groupbox.GroupBox();
	    toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
	    
	    var btnCsvExport = new qx.ui.form.Button(tr("send"));			
	    btnCsvExport.setWidth(100);
	    toolBar.add(btnCsvExport);
	    btnCsvExport.addListener("execute", function(evt) {
	      this.sendReport();
	    }, this);
            
	    var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
	    btnUpdateView.setWidth(80);			
	    toolBar.add(btnUpdateView);
	    btnUpdateView.addListener("execute", function(evt) {
	      this.updateView();								
	    }, this);
	    return toolBar;
	  },
          sendReport: function() {
            var player = webfrontend.data.Player.getInstance();
            var playerName = player.getName();
            var cities = player.cities;
            var allianceName = webfrontend.data.Alliance.getInstance().getName();
            var atLeastOne = false;
            var rowCount = this._tableModel.getRowCount();
            //            console.log("## rows " + rowCount);
            
	    for ( var rowidx = 0; rowidx < rowCount; rowidx++) {
              var row = this._tableModel.getRowData(rowidx);
              //              console.log("## rowidx " + rowidx + ":");
              //              for (k in row) {
              //               console.log("    " + k + " = " + row[k]);
              //              }
              var cityId = row[0];
              var c = cities[cityId];
              var cityrow = this._cityCache[cityId][0];
              var inforow = this._cityCache[cityId][1];
              if (c == null) {
                console.log("Null city found in row " + rowidx + ": " + cityId);
                continue;
              }
              if (cityrow == null) {
                console.log("Null city cache found in row " + rowidx + ": " + cityId);
                continue;
              }
              
              
              if (row[1]) {
                var db = lour.DBServer.getInstance();
                var server = lour.Server.getInstance();
                console.log("Row is "); console.log(row);
                console.log("Inforow is "); console.log(inforow);
                var continent = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
                console.log("Name:" + c.name + " - Position:" + c.xPos + ":" + c.yPos
                            + " - Continent:" + continent + " - Player: " + playerName + " - Alliance:" + allianceName + " Summary:" + row["breakdown"]);
                var data = [];
                data["a"] = db.getAllianceId(allianceName);
                data["p"] = playerName;
                data["c"] = continent;
                data["x"] = c.xPos;
                data["y"] = c.yPos;
                data["w"] = (cityrow["water"] == "yes") ? 1 : 0;
                data["cs"] = (cityrow["castled"] == "yes") ? 1 : 0;

 	        for (var i = 1; i <= 19; i++) {
	          if (i == 18) continue;
	          var unitType = "unit_" + i;
                  var dataKey = "u" + i;
                  var key = "raw_" + unitType;
                  var unitName = this.unitXlate[unitType];
                  if (cityrow[key] > 0) {
                    data[dataKey] = cityrow[key];
                  }
                }
                data["sp"] = (inforow["support_orders"] == null) ? 0 : 1;
                db.sendData("cs",data);
                
                if (inforow["support_orders"] !== null) {
                  var orderlist = inforow["support_orders"];
                  for (var p in orderlist) {
                    console.log("Scanning " + p);
                    var playerorder = orderlist[p];
//                    console.log(playerorder);
                    var data = [];
                    data["p"] = playerName;
                    data["c"] = continent;
                    data["x"] = c.xPos;
                    data["y"] = c.yPos;
                    data["sp"] = playerorder["player"];
                    data["sa"] = db.getAllianceId(playerorder["alliance"]);
                    var remotecity = server.cities[ playerorder["cityId"] ];
//                    console.log("Remote city:");
//                    console.log(remotecity);
                    if (remotecity == null) {
                      data["sn"] = 1;
                    } else {
                      data["sc"] = remotecity.cont;
                      data["sx"] = remotecity.x;
                      data["sy"] = remotecity.y;
                    }
                    
 	            for (var i = 1; i <= 19; i++) {
	              if (i == 18) continue;
	              var unitType = "unit_" + i;
                      var dataKey = "su" + i;
                      if (playerorder[unitType] > 0) {
                        data[dataKey] = playerorder[unitType];
                      }
                    }
                    
                    db.sendData("sp",data);
                  }
                }
                
                atLeastOne = true;
              }
            }
            
            if (atLeastOne) {
              webfrontend.ui.MessageBox.messageBox({
                title: tr("confirmation"),
                text: tr("sent"),
                textRich: true,
                buttons: 1
              });
            } else {
              webfrontend.ui.MessageBox.messageBox({
                title: tr("warning"),
                text: tr("select cities please"),
                textRich: true,
                buttons: 1
              });
            }
	  }
        }
      });

    qx.Class.define("lour.net.CommandManager", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
	  this._sendTimer = new qx.event.Timer(lour.Const.MIN_SEND_COMMAND_INTERVAL);
	  this._sendTimer.addListener("interval", this.sendPendingCommand, this);	
	  this._sendTimer.start();		
	},
	properties: {
	  lastSendCommand: {
	    init: 0
	  }
	},
	members: {
	  _toSend: [],
	  _sendTimer: null,
	  sendCommand: function(endPoint, request, context, onSendDone, extraValue) {
	    var now = (new Date()).getTime();
	    if (now - this.getLastSendCommand() >= lour.Const.MIN_SEND_COMMAND_INTERVAL) {
	      this.forcedSendCommand(endPoint, request, context, onSendDone, extraValue);
	    } else {
	      this._toSend.push({
		endPoint: endPoint, 
		request: request, 
		context: context, 
		onSendDone: onSendDone, 
		extraValue: extraValue
	      });
	    }
	  },
	  getNumberOfPendingCommands: function() {
	    return this._toSend.length;
	  },
	  forcedSendCommand: function(endPoint, request, context, onSendDone, extraValue) {
	    var now = (new Date()).getTime();
	    webfrontend.net.CommandManager.getInstance().sendCommand(endPoint, request, context, onSendDone, extraValue);			
	    this.setLastSendCommand(now);		
	  }, 
	  sendPendingCommand: function() {
	    if (this._toSend.length > 0) {
	      var o = this._toSend[0];
	      this._toSend.splice(0, 1);
	      this.forcedSendCommand(o.endPoint, o.request, o.context, o.onSendDone, o.extraValue);
	    }
	  },
	  pollPublicCity: function(cityId) {
	    this.sendCommand("GetPublicCityInfo", { id: cityId }, this, this.gotPublicCity, cityId);
	  },
	  pollCity: function(cityId) {
	    var sb = new qx.util.StringBuilder(2048);
	    sb.add("CITY", ":", cityId, '\f');
	    this.poll(sb.get(), cityId);
	  },
	  pollWorld: function(sectorIds) {
	    var sb = new qx.util.StringBuilder(2048);
	    sb.add("WORLD", ":");
	    
	    for (var i = 0; i < sectorIds.length; i++) {
	      var sectorId = sectorIds[i];
	      var s = I_KEB_MEB(sectorId) + I_KEB_REB(0); 
	      sb.add(s);
	    }
			
	    sb.add('\f');
	    this.poll(sb.get(), sectorIds);
	  },
	  poll: function(requests, callbackArg) {
	    this.requestCounter = 0;
	    
		var updateManager = webfrontend.net.UpdateManager.getInstance();
	    
	    var data = new qx.util.StringBuilder(2048);
	    data.add('{"session":"', updateManager.getInstanceGuid(), '","requestid":"', updateManager.requestCounter, '","requests":', qx.lang.Json.stringify(requests), "}");
	    updateManager.requestCounter++;			
	    
	    var req = new qx.io.remote.Request(updateManager.getUpdateService() + "/Service.svc/ajaxEndpoint/Poll", "POST", "application/json");
	    req.setProhibitCaching(false);
	    req.setRequestHeader("Content-Type", "application/json");
	    req.setData(data.get());
	    req.setTimeout(10000);
	    req.addListener("completed", function(e) {
	      this.completeRequest(e, callbackArg);
	    }, this);
	    req.addListener("failed", this.failRequest, this);
	    req.addListener("timeout", this.timeoutRequest, this);
	    req.send();			
	  },
	  completeRequest: function(e, obj) {
	    
	    if (e.getContent() == null) return;
	    
	    for (var i = 0; i < e.getContent().length; i++) {
	      var item = e.getContent()[i];
	      var type = item.C;
	      if (type == "CITY") {
		this.parseCity(obj, item.D);
	      } else if (type == "WORLD") {
		this.parseWorld(item.D);
	      } else if (type == "OA") {
		this.parseOA(item.D);
	      }
	    }
	  }, 
	  failRequest: function(e) {
	    
	  }, 
	  timeoutRequest: function(e) {
	    
	  },
	  parseOA: function(data) {
	    if (data == null || data.a == null) {
	      return;
	    }
	    try {
	      var sum = 0;
	      for (var i = 0; i < data.a.length; i++) {
		var a = data.a[i];
		sum += a.ta;					
	      }
	      console.log(sum);
	    } catch (e) {
	      lour.Utils.handleError(e);
	    }			
	  },
	  parseWorld: function(data) {
	    if (data == null || data.s == null) {
	      return;
	    }
	    try {
	      var server = lour.Server.getInstance();
	      for (var i = 0; i < data.s.length; i++) {
		var d = data.s[i];
		
		var sector;
		if (server.sectors[d.i] != null) {
		  sector = server.sectors[d.i];
		} else {
                  console.log("Apparently bosSector is being called");
		  sector = new bosSector();
                  console.log("Apparently bosSector has been called");
		}
		sector.init(d);
                
		server.sectors[d.i] = sector;
	      }
	    } catch (e) {
	      lour.Utils.handleError(e);
	    }
	  },
	  parseCity: function(cityId, data) {
	    try {
	      var server = lour.Server.getInstance();
	      var city = server.cities[cityId];
	      var store = false;
	      if (city == undefined) {
		city = new lour.City();
		store = true;
	      }
	      city.dispatchResults(data);
	      if (store) {
		city.setId(cityId);
		server.cities[cityId] = city;
	      }
	      server.markCityDirty(cityId);
	    } catch (e) {
	      lour.Utils.handleError(e);
	    }
	  },
          gotPublicCity: function(ok, response, cityId) {
            if (ok) {
	      try {
                if (response == null) {
                  console.log("MISSING CITY");
                  return;
                }
	        var server = lour.Server.getInstance();
	        var city = server.cities[cityId];
	        var store = false;
	        if (city == undefined) {
		  city = new lour.PublicCity();
		  store = true;
	        }
	        city.dispatchResults(response, cityId);
	        if (store) {
		  server.cities[cityId] = city;
	        }
	      } catch (e) {
	        lour.Utils.handleError(e);
	      }
            }
          }
	}
    });
      
    qx.Class.define("lour.PublicCity", {
      extend: qx.core.Object,
      construct: function() {
	qx.Bootstrap.setDisplayName(this, "lour.PublicCity");
      },
      members: {
        id: -1,
        x: -1,
        y: -1,
        onWater: false,
        isCastle: false,
        cont: -1,
        isPublic: true, 
        dispatchResults: function(data,id) {
          this.id = id;
          this.x = data.x;
          this.y = data.y;
          this.onWater = data.w;
          this.isCastle = data.s;
          this.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(data.x, data.y);
        }
      }
    });
      
     /** most of code of this class is taken from game source code */
    qx.Class.define("lour.City", {
      extend: qx.core.Object,
      construct: function() {
	qx.Bootstrap.setDisplayName(this, "lour.City");
	this.resources = new Object();
	this.setId(-1);
	//this.setRequestId(-1);
      }, destruct: function() {
	//alert("Destroying " + this.getId());
	
	delete this.resources;
	delete this.buildQueue;
	delete this.units;
	delete this.traders;
        
	delete this.unitOrders;
	delete this.tradeOrders;
	
	delete this.unitQueue;
	delete this.recruitingSpeed;
	delete this.incomingUnitOrders;
	delete this.supportOrders, 
	delete this.tradeIncoming; 
        
      }, 
      statics: {
	SERIALIZABLE_MEMBERS: ["resources", "units", "buildQueue", "unitQueue", "recruitingSpeed", "unitOrders", "incomingUnitOrders", "supportOrders", "traders" /*XXX trades are useless to save, "tradeOrders", "tradeIncoming"*/],
	createFromSimpleObject: function(o) {
	  var c = new lour.City();
	  var props = qx.Class.getProperties(c.constructor);
          
	  o["lastUpdated"] = new Date(o["lastUpdated"]);
          
	  for (var prop in props) {
	    var name = props[prop];
	    try {
	      if (o[name] != undefined) {
		c.set(name, o[name]);
	      }
	    } catch (e) {
		  debug(name + " " + e);
	    }
	  }
          
	  var members = lour.City.SERIALIZABLE_MEMBERS;
	  for (var key in members) {
	    var m = members[key];
	    c[m] = o[m];
	  }
          
	  return c;
	}
      }, properties: {
	id: {
	  init: -1
	},
	lastUpdated: {
	  init: null
	},
	requestId: {
	  init: -1
	}, 
	version: {
	  init: -1
	},
	//id: {
	//        event: bK
	// }, version: {
	//        init: -1,
	//        event: ba
	onWater: {
	  init: false
	}, unitCount: {
	  init: 0
	}, unitLimit: {
	  init: 0
	}, unitsInQueue: {
	  init: 0
	}, buildingCount: {
	  init: 0
	}, buildingLimit: {
	  init: 0
	}, buildingsInQueue: {
	  init: 0
	}, strongHold: {
	  init: false
	}, sieged: {
	  init: false
	}, canRecruit: {
	  init: false
	}, canCommand: {
	  init: false
	}, orderLimit: {
	  init: 0
	}, barracksLevel: {
	  init: 0
	}, townhallLevel: {
	  init: 0
	}, marketplaceLevel: {
	  init: 0
	}, harborLevel: {
	  init: 0
	}, wallLevel: {
	  init: 0
	}, hideoutSize: {
	  init: 0
	}, foodConsumption: {
	  init: 0
	}, foodConsumptionSupporter: {
	  init: 0
	}, foodConsumptionQueue: {
	  init: 0
	}, buildTimeAbsMod: {
	  init: 0
	}, buildTimePercentMod: {
	  init: 0
	}, plunderProtection: {
	  init: 0
	}, goldProduction: {
	  init: 0
	}, name: {
	  init: ""
	}, reference: {
	  reference: ""
	}, text: {
	  init: ""
	}, buildingQueueStart: {
	  init: 0
	}, buildingQueueEnd: {
	  init: 0		
	}
      }, members: {
        isPublic: false,
	resources: null,
	units: null,
	buildQueue: null,
	unitQueue: null,
	recruitingSpeed: null,
	unitOrders: null,
	incomingUnitOrders: null,
	tradeOrders: null,
	tradeIncoming: null,
	//----------------
	toSimpleObject : function() {
	  var o = new Object();
          
	  var props = qx.Class.getProperties(this.constructor);
	  for (var prop in props) {
	    var name = props[prop];
	    try {
	      if (qx.lang.Type.isString(name) && name.indexOf("function ") != 0) {
		o[name] = this.get(name);
	      }
	    } catch (e) {
	      debug(name + " " + e);
	    }
	  }
          
	  //qx does strange things for date object when serializing to JSON, below is workaround
	  o["lastUpdated"] = this.getLastUpdated().getTime();
          
	  var members = lour.City.SERIALIZABLE_MEMBERS;
	  for (var key in members) {
	    var m = members[key];
	    o[m] = this[m];
	  }
          
	  return o;
	},
	//----------------
	populate: function(other) {
          
	  this.setLastUpdated(new Date());
          
	  this.resources = new Object();
	  this.setId(-1);
	  //this.setRequestId(-1);
              
	  var props = qx.Class.getProperties(this.constructor);
	  for (var prop = 0; prop < props.length; prop++) {
	    //for (var prop in props) {
	    var name = props[prop];
	    try {
	      if (qx.lang.Type.isString(name)) {
		this.set(name, other.get(name));
	      }
	    } catch (e) {
	      //debug(name + " " + e);
	    }
	  }
          
	  this.setId(parseInt(this.getId()));
          
	  for (var res = 1; res <= 4; res++) {
            
	    this.resources[res] = {
	      step: 0,
	      base: 0,
	      delta: 0,
	      max: 0
	    };
            
	    if (other.resources.hasOwnProperty(res)) {
	      var thisRes = this.resources[res];
	      var otherRes = other.resources[res];
	      thisRes.step = otherRes.step;
	      thisRes.base = otherRes.base;
	      thisRes.delta = otherRes.delta;
	      thisRes.max = otherRes.max;
	    }
	  }
          
	  this.buildQueue = new Array();
          
	  if (other.hasBuildQueue()) {
	    for (var i = 0; i < other.buildQueue.length; i++) {
	      var item = other.buildQueue[i];
	      this.buildQueue[i] = {
		id: item.id,
		building: item.building,
		state: item.state,
		start: item.start,
		end: item.end,
		type: item.type,
		level: item.level,
		x: item.x,
		y: item.y,
		isPaid: item.isPaid
	      };
	    }
	  }
          
	  this.units = new Object();
	  if (other.getUnits() != null) {
	    for (var key in other.getUnits()) {
	      var item = (other.getUnits())[key];
	      this.units[key] = {
		count: item.count,
		total: item.total,
		speed: item.speed
	      };
	    }
	  }
          
	  this.unitQueue = new Array();
	  if (other.hasUnitQueue()) {
	    for (var i = 0; i < other.unitQueue.length; i++) {
	      var item = other.unitQueue[i];
	      this.unitQueue[i] = {
		id: item.id,
		type: item.type,
		count: item.count,
		batch: item.batch,
		left: item.left,
		start: item.start,
		end: item.end,
		isPaid: item.isPaid
	      };
	    }
	  }
          
	  this.traders = new Object();
	  if (other.traders != null) {
	    for (var key in other.traders) {
	      var item = other.traders[key];
	      this.traders[key] = {
		count: item.count,
		total: item.total,
		order: item.order
	      };
	    }
	  }
          
          
	  this.unitOrders = new Array();
	  if (other.unitOrders != null) {
	    for (var i = 0; i < other.unitOrders.length; i++) {
	      var item = other.unitOrders[i];
	      this.unitOrders[i] = {
		id: item.id,
		type: item.type,
		state: item.state,
		start: item.start,
		end: item.end,
		city: item.city,
		cityName: item.cityName,
		player: item.player,
		playerName: item.playerName,
		alliance: item.alliance,
		allianceName: item.allianceName,
		units: item.units,
		isDelayed: item.isDelayed,
		recurringType: item.recurringType,
		recurringEndStep: item.recurringEndStep,
		quickSupport: item.quickSupport
	      };
	    }
	  }
          
	  this.supportOrders = new Array();
	  if (other.supportOrders != null) {
	    for (var i = 0; i < other.supportOrders.length; i++) {
	      var item = other.supportOrders[i];
	      this.supportOrders[i] = {
		id: item.id,
		type: item.type,
		state: item.state,
		end: item.end,
		city: item.city,
		cityName: item.cityName,
		player: item.player,
		playerName: item.playerName,
		alliance: item.alliance,
		allianceName: item.allianceName,
		units: new Array(),
		quickSupport: item.quickSupport
	      };
              lour.Server.getInstance().addPublicPollableCity(item.city);
              
	      for (var u = 0; u < item.units.length; u++) {
		this.supportOrders[i].units[u] = {
		  type: item.units[u].type,
		  count: item.units[u].count
		};
	      }
	    }
	  }
          
	  this.tradeOrders = new Array();
	  if (other.tradeOrders != null) {
	    for (var i = 0; i < other.tradeOrders.length; i++) {
	      var item = other.tradeOrders[i];
	      
	      this.tradeOrders[i] = {
		id: item.id,
		type: item.type,
		transport: item.transport,
		state: item.state,
		start: item.start,
		end: item.end,
		city: item.city,
		cityName: item.cityName,
		player: item.player,
		playerName: item.playerName,
		alliance: item.alliance,
		allianceName: item.allianceName,
		resources: new Array()
	      };
	      for (var u = 0; u < item.resources.length; u++) {
		this.tradeOrders[i].resources[u] = {
		  type: item.resources[u].type,
		  count: item.resources[u].count
		};
	      }					
	    }
	  }
	  
	  this.tradeIncoming = new Array();
	  if (other.tradeIncoming != null) {
	    for (var i = 0; i < other.tradeIncoming.length; i++) {
	      var item = other.tradeIncoming[i];
	      
	      this.tradeIncoming[i] = {
		id: item.id,
		type: item.type,
		transport: item.transport,
		state: item.state,
		start: item.start,
		end: item.end,
		city: item.city,
		cityName: item.cityName,
		player: item.player,
		playerName: item.playerName,
		alliance: item.alliance,
		allianceName: item.allianceName,
		resources: new Array()
	      };
	      for (var u = 0; u < item.resources.length; u++) {
		this.tradeIncoming[i].resources[u] = {
		  type: item.resources[u].type,
		  count: item.resources[u].count
		};
	      }					
	    }
	  }		
	},
	//----------------
	
	dispatchResults: function(K) {
	  
	  this.setLastUpdated(new Date());
	  
	  var bh = "changeVersion",
	      bg = "",
	      bf = "CITY",
	      be = "s",
	      bd = "m",
	      bc = "psr",
	      bb = "at",
	      ba = "bl",
	  Y = "hrl",
	  X = "rs",
	  ch = "to",
	  cg = "v",
	  cf = "iuo",
	  ce = "t",
	  cd = "nr",
	  cc = "changeCity",
	  cb = "r",
	  ca = "singleton",
	  bY = "f",
	  bX = "sh",
	  bo = "q",
	  bp = "btam",
	  bm = "d",
	  bn = "tl",
	  bk = "ts",
	  bl = "webfrontend.data.City",
	  bi = "bc",
	  bj = "pl",
	  bu = "b",
	  bv = "pp",
	  bD = "mtl",
	  bB = "ae",
	      bL = "su",
	      bG = "n",
	  bT = "mpl",
	  bQ = "wl",
	  bx = "btpm",
	  bW = "uq",
	  bV = "_applyId",
	  bU = "ol",
	  bw = "st",
	  bz = "cpr",
	  bA = "i",
	  bC = "fc",
	  bE = "cr",
	  bH = "w",
	  bN = "pd",
	  bS = "bbl",
	  bq = "tf",
	      br = "u",
	  by = "ul",
	  bK = "pwr",
	  bJ = "g",
	  bI = "uo",
	  bP = "et",
	  bO = "uc",
	  bF = "fcs",
	  bM = "ns",
	  W = "hs",
	  bR = "fcq",
	  bs = "ad",
	  bt = "ti";			
	  
	  var O = webfrontend.res.Main.getInstance();
	  var P = webfrontend.data.Server.getInstance();
	  if (K.hasOwnProperty(bz)) {
	    //this.setCanPurifyResources(K.cpr);
	  }
	  if (K.hasOwnProperty(bA)) {
	    //if (this.getRequestId() != K.i) return;
	  }
	  if (K.hasOwnProperty(bG)) this.setName(K.n);
	  if (K.hasOwnProperty(cb) && K.r != null) {
	    for (var i = 0; i < K.r.length; i++) {
	      var M = K.r[i].i;
	      if (!this.resources.hasOwnProperty(M)) this.resources[M] = {
		step: 0,
		base: 0,
		delta: 0,
		max: 0
	      };
	      if (K.r[i].hasOwnProperty(be)) this.resources[M].step = K.r[i].s;
	      if (K.r[i].hasOwnProperty(bu)) this.resources[M].base = K.r[i].b;
	      if (K.r[i].hasOwnProperty(bm)) this.resources[M].delta = K.r[i].d;
	      if (K.r[i].hasOwnProperty(bd)) this.resources[M].max = K.r[i].m;
	    }
	  }
	  //if (K.hasOwnProperty(bK)) this.palaceWoodResources = K.pwr;
	  //if (K.hasOwnProperty(bc)) this.palaceStoneResources = K.psr;
	  if (K.hasOwnProperty(W)) this.setHideoutSize(K.hs);
	  if (K.hasOwnProperty(bC)) this.setFoodConsumption(K.fc);
	  if (K.hasOwnProperty(bF)) this.setFoodConsumptionSupporter(K.fcs);
	  if (K.hasOwnProperty(bR)) this.setFoodConsumptionQueue(K.fcq);
	  if (K.hasOwnProperty(bH)) this.onWater = K.w;
      	  if (K.hasOwnProperty(bJ)) this.setGoldProduction(K.g);
	  //if (K.hasOwnProperty(bk)) this.setTypeSlots(K.ts);
	  var R = 0;
	  if (K.hasOwnProperty(bo)) {
	    if (K.q != null && K.q.length > 0) {
	      if (this.buildQueue == null) this.buildQueue = new Array();
	      else qx.lang.Array.removeAll(this.buildQueue);
	      for (var i = 0; i < K.q.length; i++) {
		var item = K.q[i];
		this.buildQueue[i] = {
		  id: item.i,
		  building: item.b,
		  state: item.s,
		  type: item.t,
		  l: item.l,
		  x: item.x,
		  y: item.y,
		  isPaid: item.p,
		  warnings: item.w,
		  time: -1
		};
                
		if (K.q[i].l == 1 && K.q[i].s == 1) R++;
	      }
	    } else {
	      if (this.buildQueue != null) delete this.buildQueue;
	    }
	    this.setBuildingsInQueue(R);
	  }
	  R = 0;
	  if (K.hasOwnProperty(bW)) {
	    if (K.uq != null && K.uq.length > 0) {
	      if (this.unitQueue == null) this.unitQueue = new Array();
	      else qx.lang.Array.removeAll(this.unitQueue);
	      for (var i = 0; i < K.uq.length; i++) {
		this.unitQueue[i] = {
		  id: K.uq[i].i,
		  type: K.uq[i].t,
		  count: K.uq[i].o,
		  batch: K.uq[i].c,
		  left: K.uq[i].l,
		  start: K.uq[i].ss,
		  end: K.uq[i].es,
		  isPaid: K.uq[i].p
		};
		R += K.uq[i].l * O.units[K.uq[i].t].uc;
	      }
	    } else {
	      if (this.unitQueue != null) delete this.unitQueue;
	    }
	    this.setUnitsInQueue(R);
	  }
	  if (K.hasOwnProperty(br)) {
	    if (K.u != null && K.u.length > 0) {
	      if (this.units == null) this.units = new Object();
	      else qx.lang.Object.empty(this.units);
	      for (var i = 0; i < K.u.length; i++) this.units[K.u[i].t] = {
		count: K.u[i].c,
		total: K.u[i].tc,
		speed: K.u[i].s
	      };
	    } else {
	      if (this.units != null) delete this.units;
	    }
	  }
	  if (K.hasOwnProperty(cf)) {
	    if (K.iuo != null && K.iuo.length > 0) {
	      if (this.incomingUnitOrders == null) this.incomingUnitOrders = new Array();
	      else qx.lang.Array.removeAll(this.incomingUnitOrders);
	      for (var i = 0; i < K.iuo.length; i++) {
		this.incomingUnitOrders[i] = {
		  id: K.iuo[i].i,
		  type: K.iuo[i].t,
		  state: K.iuo[i].s,
		  end: K.iuo[i].es,
		  city: K.iuo[i].c,
		  cityName: K.iuo[i].cn,
		  player: K.iuo[i].p,
		  playerName: K.iuo[i].pn,
		  alliance: K.iuo[i].a,
		  allianceName: K.iuo[i].an
		};
	      }
	    } else {
	      if (this.incomingUnitOrders != null) delete this.incomingUnitOrders;
	    }
	  }
	  if (K.hasOwnProperty(ce)) {
	    if (K.t != null && K.t.length > 0) {
	      if (this.traders == null) this.traders = new Object();
	      else qx.lang.Object.empty(this.traders);
	      for (var i = 0; i < K.t.length; i++) this.traders[K.t[i].t] = {
		count: K.t[i].c,
		total: K.t[i].tc,
		order: 0
	      };
	    } else {
	      if (this.traders != null) delete this.traders;
	    }
	  }
	  if (K.hasOwnProperty(bI)) {
	    if (K.uo != null && K.uo.length > 0) {
	      if (this.unitOrders == null) this.unitOrders = new Array();
	      else qx.lang.Array.removeAll(this.unitOrders);
	      for (var i = 0; i < K.uo.length; i++) {
		var U = null;
		if (K.uo[i].u != null && K.uo[i].u.length > 0) {
		  U = new Array();
		  for (var j = 0; j < K.uo[i].u.length; j++) U.push({
		    type: K.uo[i].u[j].t,
		    count: K.uo[i].u[j].c
		  });
		}
		this.unitOrders[i] = {
		  id: K.uo[i].i,
		  type: K.uo[i].t,
		  state: K.uo[i].s,
		  start: K.uo[i].ss,
		  end: K.uo[i].es,
		  city: K.uo[i].c,
		  cityName: K.uo[i].cn,
		  player: K.uo[i].p,
		  playerName: K.uo[i].pn,
		  alliance: K.uo[i].a,
		  allianceName: K.uo[i].an,
		  units: U,
		  isDelayed: K.uo[i].d,
		  recurringType: K.uo[i].rt,
		  recurringEndStep: K.uo[i].rs,
		  quickSupport: K.uo[i].q
		};
	      }
	    } else {
	      if (this.unitOrders != null) delete this.unitOrders;
	    }
	  }
	  if (K.hasOwnProperty(bL)) {
	    if (K.su != null && K.su.length > 0) {
	      if (this.supportOrders == null) this.supportOrders = new Array();
	      else qx.lang.Array.removeAll(this.supportOrders);
	      for (var i = 0; i < K.su.length; i++) {
		var U = null;
		if (K.su[i].u != null && K.su[i].u.length > 0) {
		  U = new Array();
		  for (var j = 0; j < K.su[i].u.length; j++) U.push({
		    type: K.su[i].u[j].t,
		    count: K.su[i].u[j].c
		  });
		}
		this.supportOrders[i] = {
		  id: K.su[i].i,
		  type: K.su[i].t,
		  state: K.su[i].s,
		  end: K.su[i].es,
		  city: K.su[i].c,
		  cityName: K.su[i].cn,
		  player: K.su[i].p,
		  playerName: K.su[i].pn,
		  alliance: K.su[i].a,
		  allianceName: K.su[i].an,
		  units: U,
		  quickSupport: K.su[i].q
		};
                lour.Server.getInstance().addPublicPollableCity(K.su[i].c);
	      }
	    } else {
	      if (this.supportOrders != null) delete this.supportOrders;
	    }
	  }
	  if (K.hasOwnProperty(ch)) {
	    if (K.to != null && K.to.length > 0) {
	      if (this.tradeOrders == null) this.tradeOrders = new Array();
	      else qx.lang.Array.removeAll(this.tradeOrders);
	      for (var i = 0; i < K.to.length; i++) {
		var U = null;
		var T = 0;
		if (K.to[i].r != null && K.to[i].r.length > 0) {
		  var O = new Array();
		  for (var j = 0; j < K.to[i].r.length; j++) {
		    O.push({
		      type: K.to[i].r[j].t,
		      count: K.to[i].r[j].c
		    });
		    T += K.to[i].r[j].c;
		  }
		  this.traders[K.to[i].tt].order += Math.ceil(T / P.getTradeCapacity(K.to[i].tt));
		}
		this.tradeOrders[i] = {
		  id: K.to[i].i,
		  type: K.to[i].t,
		  transport: K.to[i].tt,
		  state: K.to[i].s,
		  start: K.to[i].ss,
		  end: K.to[i].es,
		  city: K.to[i].c,
		  cityName: K.to[i].cn,
		  player: K.to[i].p,
		  playerName: K.to[i].pn,
		  alliance: K.to[i].a,
		  allianceName: K.to[i].an,
		  resources: O
		};
	      }
	    } else {
	      if (this.tradeOrders != null) delete this.tradeOrders;
	    }
	  }
	  if (K.hasOwnProperty(bq)) {
	    if (K.tf != null && K.tf.length > 0) {
	      if (this.tradeOffers == null) this.tradeOffers = new Array();
	      else qx.lang.Array.removeAll(this.tradeOffers);
	      for (var i = 0; i < K.tf.length; i++) {
		this.tradeOffers[i] = {
		  id: K.tf[i].i,
		  transport: K.tf[i].t,
		  deliverTime: K.tf[i].d,
		  price: K.tf[i].p,
		  resourceType: K.tf[i].r,
		  amountTradeUnit: K.tf[i].a
		};
	      }
	    } else {
	      if (this.tradeOffers != null) delete this.tradeOffers;
	    }
	  }
	  if (K.hasOwnProperty(bt)) {
	    if (K.ti != null && K.ti.length > 0) {
	      if (this.tradeIncoming == null) this.tradeIncoming = new Array();
	      else qx.lang.Array.removeAll(this.tradeIncoming);
	      for (var i = 0; i < K.ti.length; i++) {
		if (K.ti[i].r != null && K.ti[i].r.length > 0) {
		  var O = new Array();
		  for (var j = 0; j < K.ti[i].r.length; j++) O.push({
		    type: K.ti[i].r[j].t,
		    count: K.ti[i].r[j].c
		  });
		}
		this.tradeIncoming[i] = {
		  id: K.ti[i].i,
		  type: K.ti[i].t,
		  transport: K.ti[i].tt,
		  state: K.ti[i].s,
		  start: K.ti[i].ss,
		  end: K.ti[i].es,
		  city: K.ti[i].c,
		  cityName: K.ti[i].cn,
		  player: K.ti[i].p,
		  playerName: K.ti[i].pn,
		  alliance: K.ti[i].a,
		  allianceName: K.ti[i].an,
		  resources: O
		};
	      }
	    } else {
	      if (this.tradeIncoming != null) delete this.tradeIncoming;
	    }
	  }
	  if (K.hasOwnProperty(X)) {
	    if (K.rs != null && K.rs.length > 0) {
	      if (this.recruitingSpeed == null) this.recruitingSpeed = new Object();
	      else qx.lang.Object.empty(this.recruitingSpeed);
	      for (var i = 0; i < K.rs.length; i++) this.recruitingSpeed[K.rs[i].t] = {
		abs: K.rs[i].a,
		percent: K.rs[i].p
	      };
	    } else {
	      if (this.recruitingSpeed != null) delete this.recruitingSpeed;
	    }
	  }
	  if (K.hasOwnProperty(by)) this.setUnitLimit(K.ul);
	  if (K.hasOwnProperty(bO)) this.setUnitCount(K.uc);
	  if (K.hasOwnProperty(ba)) this.setBuildingLimit(K.bl);
	  if (K.hasOwnProperty(bU)) this.setOrderLimit(K.ol);
	  if (K.hasOwnProperty(bi)) this.setBuildingCount(K.bc);
	  if (K.hasOwnProperty(bX)) this.setStrongHold(K.sh);
	  if (K.hasOwnProperty(be)) this.setSieged(K.s);
	  if (K.hasOwnProperty(bE)) this.setCanRecruit(K.cr);
	  if (K.hasOwnProperty(bn)) this.setTownhallLevel(K.tl);
	  if (K.hasOwnProperty(bS)) this.setBarracksLevel(K.bbl);
	  if (K.hasOwnProperty(bT)) this.setMarketplaceLevel(K.mpl);
	  if (K.hasOwnProperty(Y)) this.setHarborLevel(K.hrl);
	  //if (K.hasOwnProperty(bD)) this.setMageTowerLevel(K.mtl);
	  if (K.hasOwnProperty(bp)) this.setBuildTimeAbsMod(K.btam);
	  if (K.hasOwnProperty(bx)) this.setBuildTimePercentMod(K.btpm);
	  if (K.hasOwnProperty(bQ)) this.setWallLevel(K.wl);
	  if (K.hasOwnProperty(bv)) this.setPlunderProtection(K.pp);
	  if (K.hasOwnProperty(cd)) {
	    /*
	      if (this.getReference() != K.nr && this.getRequestId() == K.i) {
	      var Q = webfrontend.data.Player.getInstance();
	      var S = this.getRequestId();
	      if (Q.cities.hasOwnProperty(S)) {
	      Q.cities[S].reference = K.nr;
	      Q.fireDataEvent(bh, Q.getVersion());
	      }
	      }
	    */
	    this.setReference(K.nr);
	  }
	  if (K.hasOwnProperty(bM)) this.setText(K.ns);
	  //if (K.hasOwnProperty(bs)) this.setAutoBuildOptionDefense(K.ad);
	  //if (K.hasOwnProperty(bB)) this.setAutoBuildOptionEconomy(K.ae);
	  //if (K.hasOwnProperty(bb)) this.setAutoBuildTypeFlags(K.at);
	  //if (K.hasOwnProperty(bN)) this.setPalaceDamage(K.pd);
	  //if (K.hasOwnProperty(bP)) this.setEnlightenmentTime(K.et);
	  //if (K.hasOwnProperty(bw)) this.setShrineType(K.st);
	  this.setCanCommand(this.getCanRecruit() && this.getBarracksLevel() > 0 || this.getUnitCount() > 0);
	  //if (K.hasOwnProperty(bY)) this.setFaith(K.f);
	  //if (K.hasOwnProperty(bj)) this.setPalaceLevel(K.pl);
	  if (K.hasOwnProperty("bqs")) this.setBuildingQueueStart(K.bqs);
	  if (K.hasOwnProperty("bqe")) this.setBuildingQueueEnd(K.bqe);
	  this.calculateBuildingQueueTimes();
	  var N = false;
	  if (this.getId() != this.getRequestId()) {
	    this.setId(this.getRequestId());
	    N = true;
	  }
	  if (K.hasOwnProperty(cg)) {
	    if (this.getVersion() != K.v) {
	      this.setVersion(K.v);
	      N = false;
	    }
	  } else N = true;
	  
	  /*
	    if (N) {
	    var v = this.getVersion();
	    var V = qx.event.Registration;
	    if (V.hasListener(this, bh)) V.fireEvent(this, bh, qx.event.type.Data, [v, v]);
	    }
	  */
	  var L = webfrontend.data.TradeMinister.getInstance();
	  
	},
	
	calculateBuildingQueueTimes: function() {
	  if (this.buildQueue == null) return false;
	  var cF = false;
	  var cA = webfrontend.res.Main.getInstance();
	  var cE = new Object();
	  var cy = this.getBuildingQueueStart();
	  var cB = this.getBuildingQueueEnd();
	  for (var i = 0; i < this.buildQueue.length; i++) {
	    if (this.buildQueue[i].BuildingX == -1 || this.buildQueue[i].BuildingY == -1) {
	      if (i > 0) this.buildQueue[i].start = this.buildQueue[i - 1].end;
	      this.buildQueue[i].end = this.buildQueue[i].start;
	      continue;
	    }
	    var cz;
	    var cC = this.buildQueue[i].building;
	    if (cE.hasOwnProperty(cC)) cz = cE[cC];
	    else cz = this.buildQueue[i].l;
	    switch (this.buildQueue[i].state) {
	     case 1:
	      cz++;
	      cE[cC] = cz;
	      this.buildQueue[i].level = cz;
	      break;
	     case 2:
	      cE[cC] = cz - 1;
	      this.buildQueue[i].level = cz - 1;
	      break;
	     case 5:
	      cE[cC] = 0;
	      this.buildQueue[i].level = 0;
	      break;
	    }
	    if ((i == 0) && (cy != 0) && (cB != 0)) {
	      if (this.buildQueue[i].state == 5) {
		this.buildQueue[i].start = cy;
		this.buildQueue[i].end = this.buildQueue[i].start + this.urthBuildingGetDemolishTime(this.buildQueue[i].type, cz);
	      } else {
		this.buildQueue[i].start = cy;
		this.buildQueue[i].end = cB;
	      }
	    } else {
	      var cD = 0;
	      if (this.buildQueue[i].state == 5) cD = this.urthBuildingGetDemolishTime(this.buildQueue[i].type, cz);
	      else cD = this.urthBuildingGetBuildTime(this.buildQueue[i].type, cz, this.buildQueue[i].state);
	      if (i > 0) {
		if (this.buildQueue[i - 1].start == 0) this.buildQueue[i].start = 0;
		else this.buildQueue[i].start = this.buildQueue[i - 1].end;
	      } else this.buildQueue[i].start = 0;
	      this.buildQueue[i].end = this.buildQueue[i].start + cD;
	    }
	    if ((this.buildQueue[i].end - this.buildQueue[i].start) != this.buildQueue[i].time) {
	      cF = true;
	      this.buildQueue[i].time = (this.buildQueue[i].end - this.buildQueue[i].start);
	    }
	  }
	  return cF;
	},
	//----------------
	getIncomingUnitOrders: function() {
	  return this.incomingUnitOrders;
	}, getUnitTypeInfo: function(g) {
	  if (this.units != null && this.units.hasOwnProperty(g)) return this.units[g];
	  return {
	    count: 0,
	    total: 0,
	    speed: -1
	  };
	}, getBuildQueue: function() {
	  return this.buildQueue;
	}, hasBuildQueue: function() {
	  return this.buildQueue != null;
	}, getUnitQueue: function() {
	  return this.unitQueue;
	}, hasUnitQueue: function() {
	  return this.unitQueue != null;
	}, getAvailableUnitQueueSpace: function() {
	  var e = webfrontend.data.Player.getInstance().getMaxUnitQueueSize();
	  if (this.unitQueue != null) {
	    e -= this.unitQueue.length;
	  }
	  return e;
	}, getUnitOrders: function() {
	  return this.unitOrders;
	}, getSupportOrders: function() {
	  return this.supportOrders;
	}, getRecruitingSpeed: function() {
	  return this.recruitingSpeed;
	}, getIncomingUnitOrders: function() {
	  return this.incomingUnitOrders;
	}, getUnits: function() {
	  return this.units;
	}, getTraders: function() {
	  return this.traders;
	}, getTradeOrders: function() {
	  return this.tradeOrders;
	}, getTradeOffers: function() {
	  return this.tradeOffers;
	}, getTradeIncoming: function() {
	  return this.tradeIncoming;
	}, getOrder: function(d) {
	  if (this.unitOrders != null) {
	    for (var i = 0; i < this.unitOrders.length; i++) if (this.unitOrders[i].id == d) return this.unitOrders[i];
	  }
	  if (this.incomingUnitOrders != null) {
	    for (var i = 0; i < this.incomingUnitOrders.length; i++) if (this.incomingUnitOrders[i].id == d) return this.incomingUnitOrders[i];
	  }
	  if (this.supportOrders != null) {
	    for (var i = 0; i < this.supportOrders.length; i++) if (this.supportOrders[i].id == d) return this.supportOrders[i];
	  }
	  return null;
	}, getResourceCount: function(F) {
	  if (!this.resources.hasOwnProperty(F)) return 0;
	  var G = webfrontend.data.ServerTime.getInstance().getServerStep();
	  if (G == 0) return 0;
	  var I = G - this.resources[F].step;
	  var H = this.resources[F].delta;
	  if (F == 4) {
	    H -= this.getFoodConsumption() + this.getFoodConsumptionSupporter();
	  }
	  var J = I * H + this.resources[F].base;
	  J = Math.max(0, Math.min(J, this.resources[F].max));
	  return J;
	}, getResourceGrowPerHour: function(a) {
	  if (!this.resources.hasOwnProperty(a)) return 0;
	  return this.resources[a].delta * webfrontend.data.ServerTime.getInstance().getStepsPerHour();
	}, getResourceMaxStorage: function(f) {
	  if (!this.resources.hasOwnProperty(f)) return 0;
	  return this.resources[f].max;
	}, getResourceStorageFullTime: function(K) {
	  if (!this.resources.hasOwnProperty(K)) return new Date(0);
	  var L = this.getResourceGrowPerHour(K);
	  if (L <= 0) return new Date(0);
	  var M = this.resources[K].step + (this.resources[K].max - this.resources[K].base) / this.resources[K].delta;
	  if (webfrontend.data.ServerTime.getInstance().getServerStep() >= M) return new Date(0);
	  return webfrontend.data.ServerTime.getInstance().getStepTime(M);
	}, getResourceStorageEmptyTime: function(l, m) {
	  if (!this.resources.hasOwnProperty(l)) return new Date(0);
	  var n = this.resources[l].step + this.resources[l].base / -(this.resources[l].delta - m);
	  if (webfrontend.data.ServerTime.getInstance().getServerStep() >= n) return new Date(0);
	  return webfrontend.data.ServerTime.getInstance().getStepTime(n);
	}, getResourceCountTime: function(o, p) {
	  if (!this.resources.hasOwnProperty(o)) return new Date(0);
	  if (this.resources[o].delta <= 0) return new Date(0);
	  var q = this.resources[o].step + (p - this.resources[o].base) / this.resources[o].delta;
	  return webfrontend.data.ServerTime.getInstance().getStepTime(q);
	}, countDefenders: function() {
	  if (this.units == null || this.units.length == 0) return 0;
	  var c = 0;
	  for (var b in this.units) c += this.units[b].count;
	  return c;
	}, getGoldGrowPerHour: function() {
	  return this.getGoldProduction() * webfrontend.data.ServerTime.getInstance().getStepsPerHour();
	}, _applyId: function(O, P) {
	  if (O != -1 && P == -1) webfrontend.net.UpdateManager.getInstance().addConsumer(Y, this);
	  if (O == -1 && P != -1) {
	    webfrontend.net.UpdateManager.getInstance().removeConsumer(Y);
	    this.setId(-1);
	  }
	}, getSupportMoving: function(r) {
	  r = r || false;
	  var u = [];
	  var t = this.getUnitOrders();
	  if (t) {
	    var s = t.length;
	    for (var i = 0; i < s; i++) {
	      if (t[i].quickSupport && r) {
		continue;
	      }
	      if (t[i].type == 4) {
		if (t[i].state == 1 || t[i].state == 2) {
		  u[u.length] = [t[i], 0];
		}
	      }
	    }
	  }
	  var t = this.getSupportOrders();
	  if (t) {
	    var s = t.length;
	    for (var i = 0; i < s; i++) {
	      if (t[i].quickSupport && r) {
		continue;
	      }
	      if (t[i].type == 4 && t[i].state == 1) {
		u[u.length] = [t[i], 1];
	      }
	    }
	  }
	  return u;
	},
	//MINE
	buildQueueOcuppied: function() {
	  if (this.buildQueue == null || this.buildQueue.length == 0) {
	    return null;
	  }
	  return (this.buildQueue[this.buildQueue.length - 1].end - webfrontend.data.ServerTime.getInstance().getServerStep());
	},
	unitQueueOcuppied: function() {
	  if (this.unitQueue == null || this.unitQueue.length == 0) {
	    return null;
	  }
	  return (this.unitQueue[this.unitQueue.length - 1].end - webfrontend.data.ServerTime.getInstance().getServerStep());
	},
	setResourceCount: function(res, count) {
	  if (!this.resources.hasOwnProperty(res)) {
	    return;
	  }
          
	  var serverStep = webfrontend.data.ServerTime.getInstance().getServerStep();
	  if (serverStep == 0) return;
          
	  this.resources[res].step = serverStep;
	  this.resources[res].base = count;
	},
	getFoodBalance: function() {
	  var steps = webfrontend.data.ServerTime.getInstance().getStepsPerHour();
	  var foodGrow = Math.floor(this.getResourceGrowPerHour(lour.Const.FOOD) + 0.5);
	  var foodCons = Math.round(this.getFoodConsumption() * steps);
	  var foodConsQueue = Math.round(this.getFoodConsumptionQueue() * steps);
	  var foodConsSupport = Math.round(this.getFoodConsumptionSupporter() * steps);
          
	  var foodBalance = foodGrow - foodCons - foodConsQueue - foodConsSupport;
	  return foodBalance;
	}, 
	getTradeIncomingResources: function(resType) {
	  var totalRes = 0;
	      if (this.tradeIncoming == null) {
		return totalRes;
	      }
	  var now = webfrontend.data.ServerTime.getInstance().getServerStep();
	  for (var i = 0; i < this.tradeIncoming.length; i++) {
	    var order = this.tradeIncoming[i];
	    if (order.end >= now) {
	      for (var j = 0; j < order.resources.length; j++) {
		var r = order.resources[j];
		if (r.type == resType) {
		  totalRes += r.count;
		}
	      }
	    }
	  }
	  return totalRes;
	},
	urthBuildingGetBuildTime: function(P, Q, R, S) {
	  if (S == null) S = this.urthBuildingGetTotalSpeedBouns();
	  var res = webfrontend.res.Main.getInstance();
	  var T = 0;
	  if (res.buildings.hasOwnProperty(P) && res.buildings[P].r.hasOwnProperty(Q)) {
	    var U = res.buildings[P].r[Q].t;
	    if (res.buildings[P].im == 0) {
	      U = (U * 100) / S;
	      if (R == 2 || R == 5) U /= 2;
	    }
	    T = Math.floor(Math.max(webfrontend.data.Server.getInstance().getBuildingMinimumBuildTime(), U + 0.5));
	  }
	  return T;
	}, 
	urthBuildingGetDemolishTime: function(V, W) {
	  var X = this.urthBuildingGetTotalSpeedBouns();
	  var Y = 0;
	  for (var ba = W; ba > 0; ba--) Y += this.urthBuildingGetBuildTime(V, ba, 5, X);
	  return Y;
	}, 
	urthBuildingGetTotalSpeedBouns: function() {
	  //var city = webfrontend.data.City.getInstance();
	  var city = this;
	  var tech = webfrontend.data.Tech.getInstance();
	  var bf = tech.getBonus("constSpeed", webfrontend.data.Tech.research);
	  var be = tech.getBonus("constSpeed", webfrontend.data.Tech.shrine);
	  var bc = Math.floor(city.getBuildTimePercentMod());
	  return bc + bf + be;
	}			
      }
    });
    
    };
  };


  
  // This injects the main code
  function injectLouReportScript() {
    console.log("Injecting OrCReport script"); 
    var script = document.createElement("script");
    script.innerHTML = "( " + scriptContent.toString() + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    console.log("Injecting OrCReport script...done");
  }
  injectLouReportScript();
  
}());

// End of namespaceRapYoYo
