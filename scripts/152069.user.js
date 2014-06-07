// ==UserScript==
// @name       Няшка #1 для SynergyCenter
// @namespace  http://sc.ivt.su
// @version    0.2
// @description  отображение пользователей просматревших действие
// @match      http://sc.ivt.lan/*
// @match      http://sc.ivt.su/*
// @copyright  2012+, yagudin_aa
// @run-at document-end
// ==/UserScript==
(function (window, undefined) {
    var w = window;
    if (typeof unsafeWindow != undefined)
        w = unsafeWindow;
    if (w.self != w.top) {
        return;
    }
    if (w.Utils.isDefined("Task.ActionsGrid")) {
        w.Ext.override(w.Task.ActionsGrid, {
            onRender : function() {
                w.GlobalEventHandler.addListener("newaction", this.onNewAction, this);
                w.Task.ActionsGrid.superclass.onRender.apply(this, arguments);
                this.addPostViews();
            },
            addPostViews: function() {
                var cm = this.getColumnModel();
                var oldConfig = cm.config;
                oldConfig.unshift(0);
                oldConfig[0] = {header:"Просмотрели",dataIndex:"views",renderer:function(v, c){
                    c.cellAttr += " rowspan='2'";
                    return v;
                }};
                cm.setConfig(oldConfig);
                this.getStore().on("load",function(){
                    w.HistoryAction.getTaskViewRange(this.idTask,0,50,"time_mark","DESC",[], {scope:this, callback: function(views){
                        var actionsGrid = this;
                        var store = actionsGrid.getStore();
                        store.each(function(record,index){
                            var actionViews = [];
                            var actionTime = record.get("time");
                            for(var i=0; i<views.data.length;i++){
                                if(views.data[i].time_mark>actionTime) {
                                    actionViews.push(views.data[i].u.name);
                                }
                            }
                            for(i=0;i<actionViews.length; i++) {
                                actionViews[i] = actionViews[i].split(" ")[0];
                            }
                            if(actionViews.length>0){
                                var filteredActionViews = [];
                                for(i=0;i<actionViews.length; i++) {
                                    var find=false;
                                    for(var j=0;j<filteredActionViews.length;j++){
                                        if(actionViews[i]==filteredActionViews[j]){
                                            find = true;
                                            break;
                                        }
                                    }
                                    if(find==false)
                                        filteredActionViews.push(actionViews[i]);
                                }
                                actionViews = filteredActionViews;
                            }
                            if(actionViews.length>0){
                                var viewsText = "<span style='font-size:10px'>";
                                for(i=0;i<actionViews.length; i++) {
                                    viewsText += "<br>" + actionViews[i];
                                }
                                viewsText += "</span>";
                                record.set("views", viewsText);
                            }
                        },this);
                    }});
                },this);
            }
        });
    }
})(window);