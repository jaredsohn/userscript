// ==UserScript==
// @name        PluginsLib - mhAlliance - Tiberium Alliances
// @author      MrHIDEn(game:PEEU)
// @description Alliance analyser. How many viruses was released. REQUIRES: Menu,Util (PluginsLib)
// @version     0.02 alpha
// @namespace   http*://*.alliances.commandandconquer.com/*
// @include     http*://*.alliances.commandandconquer.com/*
// @grant       none
// @downloadURL https://userscripts.org/scripts/source/169255.user.js
// @updateURL   https://userscripts.org/scripts/source/169255.meta.js
// ==/UserScript==
/*NOTES
catch online, offline notifications
p=PluginsLib.mhNotepad.getInstance();
p.centerPosition();
p.center();
*/
(function() {
var injectBody = function(scriptSize) {
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir; var ccc=console.clear;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;}

  var pluginName = "mhAlliance";
  var created = false;
  function createClasses()
  {
    //class PluginsLib.Test
    qx.Class.define("PluginsLib." + pluginName,
    {
      type: "singleton",
      extend: webfrontend.gui.CustomWindow,

      statics : {
        NAME: 'Alliance analyser',
        PLUGIN: 'MH Alliance',//=Menu Name
        HINT: 'Open alliance info window',
        AUTHOR: 'MrHIDEn',
        VERSION: 0.02,
        REQUIRES: 'Menu,Util',
        NEEDS: '',
        INFO: 'Alliance analyser.',
        WWW: 'http://userscripts.org/scripts/show/169255',
        ONPLUGIN: null,
        ONOPTIONS: null,
        SIZE: 0
      },

      //class PluginsLib.mhAlliance.construct
      construct: function() //Test
      {
        //GUI
        this.base(arguments);
        this.setLayout(new qx.ui.layout.VBox(2));
          //layout : new qx.ui.layout.Grow()
          //focus free

        //WINDOW
        this.set({
          width: 650,
          //height: 500,
          caption: "Alliance analyser " + this.constructor.VERSION.toFixed(2),
          padding: 2,
          allowMaximize: true,
          showMaximize: true,
          allowMinimize: false,
          showMinimize: false
        });

        //custom items
        this.__txtArea = new qx.ui.form.TextArea("");
        this.__txtArea.set(
        {
          readOnly: true,
          height: 50,
          tabIndex    : 2,
          //height      : 60,
          //rows: 20,
          //required    : true,
          placeholder : "Waiting..."
        });
        this.__btnRun = new qx.ui.form.Button("Refresh");
        this.__btnRun.addListener("execute", this.__run, this);

        //base
        var cntContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});

        this.lblSummary = new qx.ui.basic.Label("Viruses: 0, Online: 0, Members: 0").set({ alignX: "left", rich: true, font: "font_size_14_bold"});//center


        var cntVBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));

        var lblOptions = new qx.ui.basic.Label("<u>Options</u>").set({ rich: true, alignX: "right"});
        lblOptions.addListener("click", this.__onOptions, this);

        //public
        PluginsLib.Util.extendNotificationGetDetails();
        this._LNotificationCategory = PluginsLib.Util.denumerate(ClientLib.Config.Main.ENotificationCategory);
        this.__extendNotificationChange();

        this.__btnMenuDelegate = new qx.ui.form.Button("Alliance analyser").set({
          toolTipText: "Alliance analyser"
        });
        this.__btnMenuDelegate.addListener("execute",this.onMenuDelegate, this);

        //TODO new table
        // table model
        this.tableModel = new qx.ui.table.model.Simple();
        //this.tableModel.setColumns([ "Name", "Rank", "OnlineState", "LastSeen", "Code", "Virus" ]);
        //var key = [ "Name", "Virus", "Rank", "OnlineState", "LastSeen", "HasControlHubCode" ];
        this.tableModel.setColumns([ "Name", "Virused", "Owns code", "Last seen", "Status", "Rank" ]);
        // table
        this.table = new qx.ui.table.Table(this.tableModel);
        this.table.set({
          width: 600,
          height: 500,
          decorator : null
        });       
        

        cntContainer.add(this.lblSummary);
        cntContainer.add(this.table);
        cntContainer.add(this.__btnRun);
        //cntContainer.add(lblOptions);
        
        //cntContainer.add(this.__txtArea);
        this.add(cntContainer);        
          
        //REGISTER PLUGIN
        this.constructor.ONPLUGIN = function(){this.constructor.getInstance().open();};
        this.constructor.ONOPTIONS = function(){this.constructor.getInstance().open();};//test
        PluginsLib.Menu.getInstance().RegisterPlugin(this);
        
        //READY
        console.info("Plugin '"+pluginName+"' LOADED");
      },

      destruct: function()
      {

      },

      //class PluginsLib.mhAlliance.members
      members:
      {
        __txtArea: null,
        __btnRun: null,
        lblSummary: null,
        members: {},
/*
[ "Name", "Rank", "OnlineState", "LastSeen", "Code", "Virus" ]
[ "Name", "Rank", "OnlineState", "LastSeen", "HasControlHubCode", "Virus" ]
({
Id:4511
Name:"someone"
Role:1961
Rank:58
Points:26594942
Bases:22
OnlineState:1
LastSeen:1369583152448
ActiveState:0
Level:19
Faction:1
JoinStep:106553
HasControlHubCode:true
RoleName:"Leader"
})
*/
        getMembers: function(am) {
          //INFO am=members
          /*NOTES
          alliance started viral attacks
          */
          try {
            am = am || {};
            var k;
            var md = ClientLib.Data.MainData.GetInstance().get_Alliance().get_MemberData();//var mem = {c:md.c, d:md.d};
            var ini = Object.keys(am).length===0;
            if(ini) {
              am = {c:0,d:{},v:0,o:0};//am = {c:md.c,d:{},v:0};
            }
            else {
              am.v = 0;
            }
            for(k in md.d) {
              var o = md.d[k];
              if(ini) am.d[k] = {};
              var n = am.d[k];
              n.Id = o.Id;
              n.Name = o.Name;
              n.Role = o.Role;
              n.Rank = o.Rank;
              n.Points = o.Points;
              n.Bases = o.Bases;
              n.OnlineState = o.OnlineState;
              n.LastSeen = o.LastSeen;
              n.ActiveState = o.ActiveState;
              n.Level = o.Level;
              n.Faction = o.Faction;
              n.JoinStep = o.JoinStep;
              n.HasControlHubCode = o.HasControlHubCode;
              n.RoleName = o.RoleName;
              if(ini) n.Virus = "NO";
              if(n.Virus == "YES") am.v++;
            }
            am.c = 0;
            am.o = 0;
            for(k in am.d) {
              am.c++;
              var os = am.d[k].OnlineState;
              if(os>0 && os<3) am.o++;
            }
            return am;
          } catch (e) {
            console.error(this.classname,'.getMembers: ',e);
          }
        },
        printMember: function (m) {
          var s='';
          //var lbl = [ "Name", "Rank", "OnlineState", "LastSeen", "Code", "Virus" ];
          //[ "Name", "Virused", "Code", "LastSeen", "OnlineState", "Rank" ]
          //[ "Name", "Virus", "HasControlHubCode", "LastSeen", "OnlineState", "Rank" ]
          var lbl = [ "", "Virus:", "Code:", "LastSeen:", "Online:", "Rank:" ];
          var key = [ "Name", "Virus", "HasControlHubCode", "LastSeen", "OnlineState", "Rank" ];
          for(var i in key) {
            if(typeof(m[key[i]])!='undefined') {
              if(key[i]=="LastSeen") {
                s+=lbl[i]+" "+phe.cnc.Util.getDateTimeString(new Date(m[key[i]]))+", ";
              }
              else {
                s+=lbl[i]+" "+m[key[i]]+", ";
              }
            }
          }
          return s;
        },
        refreshTable: function (id) {
          var s='';
        },
        //TODO XXXXXXXXXXXXXXXXX
        tableMember: function (m) {//<-keys here?
          var row=[];
          //[ "Name", "Virused", "Code", "LastSeen", "OnlineState", "Rank" ]
          //[ "Name", "Virus", "HasControlHubCode", "LastSeen", "OnlineState", "Rank" ]
          //var keys = [ "Name", "Virus", "Rank", "OnlineState", "LastSeen", "HasControlHubCode" ];
          var keys = [ "Name", "Virus", "HasControlHubCode", "LastSeen", "OnlineState", "Rank" ];
          for(var i in keys) {
            var value = m[keys[i]];
            if(typeof(value)!='undefined') {
              var key = keys[i];
              switch (key) {
                case "OnlineState":
                  var status = "";
                  switch (value) {
                    case 0:
                      status = "Offilne";
                      break;
                    case 1:
                      status = "Online";
                      break;
                    case 2:
                      status = "Away";
                      break;
                    case 3:
                      status = "Hidden";
                      break;
                    default:
                      status = "(unknown)";
                      break;
                  }
                  row.push(value.toString()+". "+status);//()?:
                  break;
                case "HasControlHubCode":
                  row.push((value)?"Yes":"No");
                  break;
                case "LastSeen":
                  row.push(phe.cnc.Util.getDateTimeString(new Date(value)));
                  break;
                case "Rank":
                  row.push(value);//.toString()
                  break;
                default:
                  row.push(value);
                break;
              }
            }
            else {
              row.push('???');
            }
          }
          return row;
        },
/*
// Create the initial data
var rowData = this.createRandomRows(50);
tableModel.setData(rowData);
*/
        table: null,
        tableModel: null,

        __winOption: null,

        //INFO can be popup, label, btn, ect
        __btnMenuDelegate: null,
        getMenuDelegate: function() {
          //console.info(this.classname,'.getMenuDelegate');
          return this.__btnMenuDelegate;
        },
        onMenuDelegate: function() {
          console.info(this.classname,'.onMenuDelegate');
          this.open();
        },

        __onOptions: function() {
          //TODO
          //this.winO....
          console.info('__onOptions');
        },

        __txtAreaClear: function() {
          this.__txtArea.setValue("");
        },
        __txtAreaAppend: function(s) {
          var txt = this.__txtArea.getValue();
          txt += s;
          this.__txtArea.setValue(txt);
        },
        __txtAreaAppendLine: function(s) {
          var txt = this.__txtArea.getValue();
          txt += s + "\r\n";
          this.__txtArea.setValue(txt);
        },
        __run: function() {
          //TODO check allNotifications
          //this.__txtAreaClear();
          /*
          PluginsLib.mhAlliance .getMembers:
TypeError: o.Id is undefined
*/
          try {
            var ns=ClientLib.Data.MainData.GetInstance().get_Notifications().GetAllByCategoryId(ClientLib.Data.ENotificationCategory.EndGame);
            var names=[];
            for(var i in ns) {
              n=ns[i];
              try{
                id=n.get_MdbId();//=61 Virus
                if(id==61) {
                  //ccl('id',id);
                  //ccl(d.get_Details());//61 !
                  ccl(n.get_Parameters());//61 !      
                  var params = n.get_Parameters();
                  //var name="";
                  for(var j in params) {
                    var o=params[j];
                    if(typeof(o.t)!='undefined' && o.t=="pn") {
                      names.push(o.v);
                      break;
                    }
                  }
                  ccl(name);
                }
              }catch(e){};
            }
            //var am = getMembers(); 
            var k,m;
            var am = this.getMembers(this.members);
            for(k in am.d) {
              m = am.d[k];
              for(i in names) {
                if(m.Name==names[i]) {
                  m.Virus = "YES";
                  am.v++;
                  //ccl(names[i],"YES");
                  break;
                }
              }
            }
            var tbl=[];//bunch
            for(k in am.d) {
              m = am.d[k];
              //this.__txtAreaAppendLine(this.printMember(m));
              tbl.push(this.tableMember(m));//row
            }
            //this.__txtAreaAppendLine("Viral Attacks done: " + am.v);
            //this.lblSummary.setValue("Viruses: "+am.v+"/"+am.c);
            //"Viruses: 0, Online: 0, Members: 0"
            //Util.FormatString("Viruses: %0, Online: %1, Members: %2",[am.v,]);
            this.lblSummary.setValue(PluginsLib.Util.FormatString("Viruses: %0, Online: %1, Members: %2",[am.v,am.o,am.c]));
            this.tableModel.setData(tbl);
            this.members = am;
          } catch (e) {
            console.error(this.classname,'.__run: ',e);
          }
            
        },

        _LNotificationCategory: null,
        _notificationList: [],
        _viralAttack: 0,
/*
static ClientLib.Config.Main.ENotificationCategory Alliance
static ClientLib.Config.Main.ENotificationCategory Base
static ClientLib.Config.Main.ENotificationCategory Combat
static ClientLib.Config.Main.ENotificationCategory Forum
static ClientLib.Config.Main.ENotificationCategory Player
static ClientLib.Config.Main.ENotificationCategory POI
static ClientLib.Config.Main.ENotificationCategory System
static ClientLib.Config.Main.ENotificationCategory Count
*/
        _onNotificationAdded: function (n) {
          try {
            //if(n.get_CategoryId()!=ClientLib.Data.ENotificationCategory.Alliance) return;
            //console.log('Notification:',this._LNotificationCategory[n.get_CategoryId()],n);
            var len = this._notificationList.unshift(n);
            if(len>200) this._notificationList.pop();
            if(typeof(n.get_Details)=='undefined') return;
            //m=ClientLib.Data.MainData.GetInstance().get_Notifications().GetAll();
            //fl=ClientLib.Data.MainData.GetInstance().get_Notifications().get_FirstLoadCompleted();
          //console.log('Notification:',n.get_CategoryId(),this._LNotificationCategory[n.get_CategoryId()],n.get_MdbId(),n.get_Details().id,n.get_Details().n,n.get_Parameters() );
            //if(n.get_MdbId()!=26) return;//k==26 "Alliance Attac Incoming"
            //n.OpenPopup();//k==26 "Alliance Attac Incoming"
            // Notification:,n.get_MdbId(),n.get_Details().id,n.get_Details().n,n.get_Parameters()
            // Notification: undefined 61 61 Endgame Alliance Viral Attack [Object { k="1", t="pn", v="PEEU"}]
            // Notification: undefined 62 62 Endgame Alliance Fortress Full Strength []
            if(n.get_MdbId()!=61) return;//k==61 "Endgame Alliance Viral Attack"
            this._viralAttack++;
            var params = n.get_Parameters();
            var name="";
            for(var i in params) {
              var o=params[i];
              if(typeof(o.t)!='undefined' && o.t=="pn") {
                name = o.v;
                break;
              }
            }
            //this.__txtAreaClear();//clear
            //this.__txtAreaAppendLine(""+this._viralAttack+" Viral Attack done by "+name);
            var am = this.getMembers(this.members);
            for(var k in am.d) {
              var m = am.d[k];
              if(m.Name==name) {
                m.Virus = "YES";
                am.v++;
                break;
              }
              //this.__txtAreaAppendLine(this.printMember(m));
            }
            //this.__txtAreaAppendLine("Viral Attacks done: "+am.v);
            //this.lblSummary.setValue("Viruses: "+am.v+"/"+am.c);            
            this.lblSummary.setValue(PluginsLib.Util.FormatString("Viruses: %0, Online: %1, Members: %2",[am.v,am.o,am.c]));
            this.members = am;
          } catch (e) {
            console.error(this.classname,'._onNotificationAdded: ',e);
          }
        },
        __extendNotificationChange: function() {
          //phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.__onSelectionChange);
          phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Notifications(), "NotificationAdded", ClientLib.Data.NotificationAdded, this, this._onNotificationAdded);
        }
        //^last member
      }
    });
    created = true;
  }//createClasses()
  function WaitForGame() {
    try
    {
      if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      {
        var app = qx.core.Init.getApplication();
        if (app.initDone===true)
        {
          if(!created) createClasses();
          
          var plugin = PluginsLib[pluginName];
          var ready = true;
          if(plugin.REQUIRES.length > 0) {
            var req = plugin.REQUIRES.split(',');
            //check all requires
            for(var i in req) {
              //cci(req[i]);
              if(typeof(PluginsLib[req[i]])=='undefined') {
                console.log(pluginName,'.WaitForGame.REQUIRES ',req[i],typeof(PluginsLib[req[i]]));
                ready = false;
                break;//WAIT
              }
            }
          }
          if(ready) {
            plugin.getInstance();
            plugin.SIZE = scriptSize;
            console.info("Plugin '"+plugin.getInstance().basename+"' READY");
            return;//DONE
          }
        }
      }
    } catch (e) {
      console.error('PluginsLib.'+pluginName,'.WaitForGame: ', e);
    }
    window.setTimeout(WaitForGame, 3000);//, scriptSize
  }
  window.setTimeout(WaitForGame, 3000);
};
function Inject() {
  var script = document.createElement('script');
  var txt = injectBody.toString();
  txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
  script.innerHTML = '(' + txt + ')();';
  script.type = 'text/javascript';
  document.head.appendChild(script);
}
Inject();
})();