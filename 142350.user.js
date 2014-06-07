// ==UserScript==
// @name           WhiteStone LoU Tweaks
// @description    Adds some functions to LoU
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.1.0
// ==/UserScript==

(function(){
    var main=function(){

        function wsDebug(e){
            if(window.console&&typeof console.log==="function"){
                msg = (e instanceof Error && e.stack) ? e.stack : String(e);
                console.log('WSTweak: ' + e);
            }
        }

        //constants
        {
            var PLUNDER_ORDER_ID = 2;
            var ATTACK_ORDER_ID = 3;
            var SUPPORT_ORDER_ID = 4;
            var SIEGE_ORDER_ID = 5;
            var RAID_ORDER_ID = 8;
            var SETTLE_ORDER_ID = 9;

            var ORDER_STATE_OUTGOING = 1;
            var ORDER_STATE_RETURNING = 2;
        } // end constants

        var DefineClasses=function(){
            qx.Class.define("wsTweak.Main",{type:"singleton",extend:qx.core.Object,members:{
                LOC_CONTAINER_INDEX:4,
                ORIG_CHILD_COUNT:6,
                RETURN_TIME_INDEX:3,
                CMD_LIST_INDEX:1,
                    initialize:function(){wsDebug("wsTweak initialize");

                        this.app=qx.core.Init.getApplication();
                        this.cInfoView=this.app.getCityInfoView();
                        var civ_cont=this.cInfoView.container.getChildren();

                        // Find the Command Info View
                        for(var i=0;i<civ_cont.length;i++){
                            if(civ_cont[i].basename=="CityCommandInfoView"){
                                this.cCmdInfoView=civ_cont[i];break;
                            }
                        }

//                        // Add Report Upload button
//                        var uploadBtn = new qx.ui.form.Button('Upload');
                        //uploadBtn.set({width: 45, appearance: "button-text-small", toolTipText: "Upload TS"});
//                        uploadBtn.setToolTipText("Upload report info");
//                        uploadBtn.addListener("click", this.uploadReportInfo, false);
                        //this.cCmdInfoView.getChildren()[0].add(uploadBtn, {top:31, left:100});
//                        var rep = qx.core.Init.getApplication().getReportPage();
//                        rep.getChildren()[2].addAt(uploadBtn,4);

                        // Add listener for switching cities
                        webfrontend.data.City.getInstance().addListener("changeVersion", this.updateCity, this);

                        // Calculate for existing raids in initial city
                        this.calcReturnTimes();

                        // Add Scroll To Bottom button
                        var scrollBtn = new qx.ui.form.Button('Scroll To Bottom');
                        scrollBtn.set({width: 90, appearance: "button-text-small", toolTipText: "Scroll to bottom of thread"});
                        scrollBtn.addListener("click", this.scrollToBottom, false);
                        this.app.getForumPostPage().getChildren()[0].add(scrollBtn, {top:45, left:493});

                    }, // End of initialize

                    updateCity:function() {
                        //wsDebug('Entering updateCity');
                        // Clear return time from all command windows
                        var commands = this.cCmdInfoView.getChildren()[this.CMD_LIST_INDEX].getChildren();
                        if (commands) {
                            for(var i=0;i<commands.length;i++){
                                //wsDebug('updateCity: i=' + i);
                                //var localContainer = commands[i].getChildren()[this.LOC_CONTAINER_INDEX];
                                var localContainer = commands[i].getChildren()[this.LOC_CONTAINER_INDEX].getChildren()[1].getChildren()[0];
                                if(localContainer.getChildren().length > this.ORIG_CHILD_COUNT) {
                                    localContainer.removeAt(this.RETURN_TIME_INDEX);
                                }
                            }
                        }

                        // Recalc return times where appropriate
                        this.calcReturnTimes();
                    }, // End of updateCity

                    calcReturnTimes:function() {
                        //wsDebug('Entering calcReturnTimes');
                        //wsDebug('CmdInfoView: ' + this.cCmdInfoView);

                        if(!this.cCmdInfoView) {
                            for(var i=0;i<civ_cont.length;i++){
                                if(civ_cont[i].basename=="CityCommandInfoView"){
                                    this.cCmdInfoView=civ_cont[i];break;
                                }
                            }
                        }

                        var commands = this.cCmdInfoView.getChildren()[this.CMD_LIST_INDEX].getChildren();
                        var orders = webfrontend.data.City.getInstance().getUnitOrders();
                        //wsDebug('calcReturnTimes 1');
                        // If current city has no orders then quit
                        if (!orders) return;

                        for(var i=0;i<orders.length;i++){
                            var order = orders[i];
                            if (order.type == SETTLE_ORDER_ID) continue; // barons don't return from settling
                            if (order.state != ORDER_STATE_OUTGOING) continue; // Only process outgoing attacks

                            // Calculate return time
                            var diff = order.end - order.start;
                            var returnTime=webfrontend.Util.getDateTimeString(webfrontend.data.ServerTime.getInstance().getStepTime(order.end+diff));

                            // 
                            var container = new qx.ui.container.Composite();
                            container.setLayout(new qx.ui.layout.Canvas());
                            var returnLabel = new qx.ui.basic.Label("Returns:");
                            returnLabel.setTextColor("text-darkbrown");
                            var spacr2 = new qx.ui.core.Spacer();
                            spacr2.setWidth(7);
                            var returnVal = new qx.ui.basic.Label(returnTime);
                            returnVal.setTextColor("text-deepdarkbrown");
                            returnVal.set({font:"bold"});
                            container.add(returnLabel);
                            container.add(spacr2);
                            container.add(returnVal, {left:70});
                            //wsDebug('calcReturnTimes: Add for order ' + i);

                            // remove existing
                            //qx.core.Init.getApplication().getCityInfoView().container.getChildren()[14].getChildren()[1].getChildren()[0].getChildren()[4].getChildren()[1].getChildren()[0].addAt(container,3)
                            var localContainer = commands[i].getChildren()[this.LOC_CONTAINER_INDEX].getChildren()[1].getChildren()[0];
                            if(localContainer.getChildren().length > this.ORIG_CHILD_COUNT) {
                                localContainer.removeAt(this.RETURN_TIME_INDEX);
                            }

                            // add new
                            localContainer.addAt(container, this.RETURN_TIME_INDEX);
                        }
                    }, // End of calcReturnTimes

                    scrollToBottom:function() {
                        //wsDebug('Entering scrollToBottom');
                        try {
                            var mypage = qx.core.Init.getApplication().getForumPostPage();
                            var lastChildIndex = mypage.getChildren().length - 1;
                            var myscroll = mypage.getChildren()[lastChildIndex].getChildren()[1];
                            myscroll.scrollToY(99999);
                        } catch (err) {
                            wsDebug(err);
                        }
                    }, // End of scrollToBottom

            }}); // End of Main
        }; // End of DefineClasses

        function initialize(){
            if(!startup.initialized){
                startup.initialized=true;
                DefineClasses();
                wsTweak.Main.getInstance().initialize();
                //alert('Done!');
            }
        }

        function startup() {
            wsDebug("Starting up");
            if(typeof qx!="undefined"){
                try { 
                    var app=qx.core.Init.getApplication();
                    window.setTimeout(initialize,2000);
                }catch(err){
                    window.setTimeout(startup,2000);
                }
            }else{
                window.setTimeout(startup,2000);
            }
        };

        // First line to execute after injection
        wsDebug("Calling startup script");
        window.setTimeout(startup,4000);

    }; // end of main


    function wsDebug(e){
        if(window.console&&typeof console.log=="function"){
            msg = (e instanceof Error && e.stack) ? e.stack : String(e);
            console.log('WSTweak: ' + e);
        }
    }

    // Injects main script into page
    function inject(){
        wsDebug("Injecting wsTweak script");
        var script=document.createElement("script");
        txt=main.toString();
        if(window.opera!=undefined){
            txt=txt.replace(/</g,"&lt;");
        }
        script.innerHTML="("+txt+")();";
        script.type="text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    if(/lordofultima\.com/i.test(document.domain)){inject();}})();