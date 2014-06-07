// ==UserScript==
// @name       Google calendar default calendar for new events
// @namespace  beltrachi
// @version    0.2.0
// @description  Choose default calendar to use for new events on the web interface
// @include         https://*.google.*/calendar/*
// @include         http://*.google.*/calendar/*
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_addStyle
// @author          beltrachi
// ==/UserScript==
(function() {
    var ManagerClass = function(){
        this.initialize();
    };
    ManagerClass.prototype = {
        key: "google_calendar_default_calendar",
        situations: [],
        scan_delay: 500,
        initialize: function(){
            this.setListeners();
            this.start();
        },
        setListeners:function(){
            var _this = this;
            window.addEventListener("load",function(){
                _this.start();
            });
            window.addEventListener("focus",function(){
                _this.start();
            });
            window.addEventListener("blur",function(){
                _this.log("blur");
                _this.stop();
            });

        },
        scan: function(){
            var i, list = document.getElementsByTagName("SELECT");
            for(i=0;i < list.length; i++){
                this.applySituations(list[i]);
            }
        },
        applySituations:function(elem){
            var i;
            for(i = 0; i < this.situations.length; i++ ){
                if( this.applySituation(this.situations[i], elem) ){
                    break;
                }
            }
        },
        applySituation: function(situation, elem){
            var _this= this;
            if(situation.canApplyOn(elem)){
                situation.applyTo(elem, this.getDefault(), function(v){
                    _this.saveDefault(v);
                });
                return true;
            }
        },
        getDefault:function(){
            var v = GM_getValue(this.key,"");
            this.log("getDefault returns " + v);
            return v;
        },
        saveDefault:function(value){
            this.log("saveDefault with "+value);
            return GM_setValue(this.key,value);
        },
        log:function(msg){
            //return console && console.log(msg);
        },
        start:function(){
            this.log("start");
            //The best way would be that Google calendar notifies with
            //an event or so but nothing is documented or couldnt be found.
            
            //When you drag and drop to create an event for more than an hour, no
            //event like click or mouseup/mousedown is triggered. We could only base on
            //mousemove but it would be too consuming and would not trigger when used by
            //keyboard. So polling is the only way right now.
            var _this = this;
            if(this.trigger){ return; }
            this.trigger = window.setInterval(
                function(){
                    _this.scan();
                },
                _this.scan_delay
            );	
        },
        stop:function(){
            this.log("stop");
            window.clearInterval(this.trigger);
            this.trigger = null;
        }
    };
    
    var PopupSituation = function(){};
    PopupSituation.prototype = {
        name:"PopupSituation",
        mark: "GM_applied-cb",
        className: "cb-calendar",
        
        labels:{
            save: "Save as default",
            saveTitle: "Saves current selected calendar as default to be used for new events from now on.",
            saved: "Default calendar saved successfully."
        },
        canApplyOn:function(elem){
            var cn = ("" + elem.className);
            return (cn.indexOf(this.className) !== -1 && cn.indexOf(this.mark) === -1);
        },
        // defaultValue: the value of the default value to be selected
        // saveFunc: the function to call to save the value. It expects the new value
        applyTo:function(elem, defaultValue, saveFunc){
            this.updateSelect(elem, defaultValue);
			this.addControls(elem,saveFunc);
            elem.className += " " + this.mark;
        },
        updateSelect:function(elem, defaultValue){
            var list = elem.options, i;
            for(i = 0; i < list.length; i++){
                if(list[i].value == defaultValue){
                    elem.selectedIndex = i;
                    break;
                }
            }
        },
        addControls:function(elem, saveFunc){
            //Add save button
            var a= document.createElement("a"),
                _this=this;
            a.innerHTML=this.labels.save;
            a.href="javascript:void(0)";
            a.title = this.labels.saveTitle;
            a.addEventListener("click", function(evt){
                var v = elem.options[elem.selectedIndex].value;
                saveFunc(v);
                alert(_this.labels.saved);
                return false;
            }, false);
            elem.parentNode.appendChild(a);
        }
    };
    ManagerClass.prototype.situations.push(new PopupSituation());
    
    // Edit new event page support
    var EditEventSituation = function(){};
    EditEventSituation.prototype = {
        //Inheritance of properties (hackish?)
        "__proto__": PopupSituation.prototype,
        name: "EditEventSituation",
        //Only when its a new form, not edit and apply once
        canApplyOn:function(elem){
            var cn = ("" + elem.className), 
                node,
                is_page_form = (elem.id.match(/\.calendar/) && cn.indexOf(this.mark) === -1);
            if( is_page_form ){
                //Now only run if it's new and not edit.
                node = document.getElementById("coverinner");
                return node && node.childNodes[0].getAttribute("data-eid") == "newEvent";
            }
            return false;
        }
    };
    ManagerClass.prototype.situations.push(new EditEventSituation());
    
    var manager = new ManagerClass();
    
})();