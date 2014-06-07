// ==UserScript==
// @version       0.3
// @name          C&C:TA Team Coordinater
// @namespace     http://alliance.directconnect.se/
// @icon          http://alliance.directconnect.se/favicon.ico
// @description   Desc
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==


try {
unsafeWindow.__cncteam_version = 0.3;
(function (){
var cncteam_main = function() {
    function cncteam_create() {
        console.log("CNC Team Coordinater v" + window.__cncteam_version + " loaded");
        
        var CNCTeam = {};
        
        // Window class
        qx.Class.define("CNCTeam.window", 
        {
            extend : qx.ui.window.Window,

            construct : function()
            {
                this.base(arguments, "Team Coordinator");

                // hide the window buttons
                this.setShowClose(false);
                this.setShowMaximize(false);
                this.setShowMinimize(false);

                // adjust size
                this.setWidth(200);
                this.setHeight(360);

                // add the layout
                /*var layout = new qx.ui.layout.VBox(10)
                this.setLayout(layout);
                this.setPadding(10);
                this.getApplicationRoot().set({
                    blockerColor: '#000000',
                    blockerOpacity: 0.6
                });*/
                // add the layout
                var layout = new qx.ui.layout.Grid(0, 0);
                layout.setRowFlex(1, 1);
                layout.setColumnFlex(0, 1);
                this.setLayout(layout);
                this.setContentPadding(0);

                // toolbar
                var toolbar = new qx.ui.toolbar.ToolBar();
                this.add(toolbar, {row: 0, column: 0});

                // reload button
                /*var reloadButton = new qx.ui.toolbar.Button("Reload");
                toolbar.add(reloadButton);
                reloadButton.setToolTipText("Reload the coords.");
                reloadButton.addListener("execute", function() {
                this.fireEvent("reload");
                }, this);*/
    
                // list
                this.__list = new qx.ui.form.List();
                this.add(this.__list, {row: 1, column: 0});
            },

            events : 
            {
                "reload" : "qx.event.type.Event"
            },

            members : {
                __list : null,

                getList : function() {
                    return this.__list;
                }
            }
        });
        
        // Service Class
        qx.Class.define("CNCTeam.service", {
            extend : qx.core.Object,

            properties : {
                coordinates : {
                    nullable: true,
                    event: "changeCoords"
                }
            },

            members :
            {
                __store : null,

                fetchCoordinates : function() {
                    if (this.__store == null) {
                        var url = "http://api.twitter.com/1/statuses/public_timeline.json?callback=kalle";
                        this.__store = new qx.data.store.Jsonp(url, null, "kalle");        
                        //this.__store.bind("model", this, "coordinates");
                    } else {
                        this.__store.reload();
                    }
                }
            }
        });
        
        // Main class
        qx.Class.define("CNCTeam.main", {
            type: "singleton",
            extend: qx.core.Object,
            members: {
                teamService: null,
                teamWindow: null,
                
                
                initialize: function() {
                    alert('loading..')
                    
                    this.teamWindow = new window.CNCTeam.window();
                    this.teamWindow.moveTo(115, 265);
                    this.teamWindow.open();                   
                    
                    this.teamService = new window.CNCTeam.service();
                    
                    // create the controller
                    /*var controller = new qx.data.controller.List(null, this.teamWindow.getList());
                    controller.setLabelPath("text");
                    controller.setIconPath("user.profile_image_url");
                    controller.setDelegate({
                        configureItem : function(item) {
                        item.getChildControl("icon").setWidth(48);
                        item.getChildControl("icon").setHeight(48);
                        item.getChildControl("icon").setScale(true);
                        item.setRich(true);
                        }
                    });
                    this.teamService.bind("coordinates", controller, "model");
                    */
                    // start the loading on startup
                    this.teamService.fetchCoordinates();
                    
                    alert('done!')
                }
            }
        });
    }
    
    /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
    function cnc_check_if_loaded() {
        try {
            if (typeof qx != 'undefined') {
                a = qx.core.Init.getApplication(); // application
                if (a) {
                    cncteam_create();
                    window.CNCTeam.main.getInstance().initialize();
                } else {
                    window.setTimeout(cnc_check_if_loaded, 1000);
                }
            } else {
                window.setTimeout(cnc_check_if_loaded, 1000);
            }
        } catch (e) {
            if (typeof console != 'undefined') console.log(e);
            else if (window.opera) opera.postError(e);
            else GM_log(e);
        }
    }

    if (/commandandconquer\.com/i.test(document.domain))
        window.setTimeout(cnc_check_if_loaded, 1000);
    }

    // injecting because we can't seem to hook into the game interface via unsafeWindow 
    //   (Ripped from AmpliDude's LoU Tweak script)
    var script_block = document.createElement("script");
    txt = cncteam_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain))
        document.getElementsByTagName("head")[0].appendChild(script_block);

}
)();
} catch (e) {
    GM_log(e);
}