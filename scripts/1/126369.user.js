/*
 Copyright (c) 2012 Goran Pedić

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

// ==UserScript==
// @name           BOLSidebar Blackout
// @version        2.0.7
// @description    Sidebar sa aktivnim temama za BOL forum.
// @namespace      http://www.bug.hr/forum/
// @match          http://www.bug.hr/forum/*
// @include        http://www.bug.hr/forum/*
// @exclude        http://www.bug.hr/forum/login/*
// @exclude        http://www.bug.hr/forum/newpost/*
// @author         drnde (http://www.bug.hr/forum/user/drnde/6251.aspx)
// ==/UserScript==

;
var BOLSidebar = {};
BOLSidebar.ENV = "production";
BOLSidebar.config = {
  BUG_SERVER_SCRIPT_URL: 'http://www.bug.hr/forum/tasks/?n=connect',
  BUG_TOPIC_URL: '/forum/topicunread/',
  REFRESH_INTERVAL: 30,
  VIEW_MODE: 'both'  
};

(function(){
  
  BOLSidebar.event = function () {
      var listeners = [];
      return {
        attach: function (listener) {
          listeners.push(listener);
        },
        notify: function (args) {
          for (var i = 0; i < listeners.length; i++) {
            listeners[i](args);
          }
        }
      };
  };

})();
(function(){

  BOLSidebar.util = {};
  BOLSidebar.util.decode = function( str ) { 
    return decodeURIComponent((str || '').replace(/\+/g, ' ')); 
  };
  BOLSidebar.util.encode = encodeURIComponent;
  BOLSidebar.util.objectEmpty = function(obj){
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  };
  BOLSidebar.util.distinct = function(arr){
    if(arr instanceof Array){
      var distinct = {};
      for(idx = 0, arr_length = arr.length; idx < arr_length; idx++ ){
        distinct[arr[idx]] = null;
      }
      arr.length = 0;
      for(var val in distinct){
        arr.push(val);
      }
      return arr;
    }
    return [];
  };
  BOLSidebar.util.getById = function (elementId) { 
    return document.getElementById(elementId); 
  };
  
  BOLSidebar.util.hasClass = function (ele,cls) {
  	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  };
  BOLSidebar.util.addClass = function (ele,cls) {
  	if (!BOLSidebar.util.hasClass(ele,cls)) ele.className += " "+cls;
  };
  BOLSidebar.util.removeClass = function (ele,cls) {
  	if (BOLSidebar.util.hasClass(ele,cls)) {
  		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
  		ele.className=ele.className.replace(reg,' ');
  	}
  };

})();
(function(){
  
  BOLSidebar.css = (function(){
    return {
      inject: function(css,id){
        	var sheet = document.createElement('style');
  	      sheet.id = id || "bugBOLSidebar.tyles";
  	      sheet.innerHTML = css;
  	      document.getElementsByTagName("head")[0].appendChild(sheet);
      }
    };
  })();

})();
(function(){
  
  BOLSidebar.request = (function(){
    var createXhrObject = function() {
  			if (xhrObject = new XMLHttpRequest())
  				return xhrObject;
  			else
  				throw new Error('AjaxHandler: Could not create an XHR object.');
  		};
      
    return {
      async: function(method, url, callback, postVars){
        var xhr = createXhrObject();
        xhr.onreadystatechange = function() {
          if (xhr.readyState !== 4)
  				  return;
            try{
  			(xhr.status === 200) ? callback(xhr.responseText,
  			    xhr.responseXML, "success") : callback(xhr.status, "failure");
  						
            } catch(e){
                console.error("Something went wrong while requesting data: ",e);
            }
  		};
  			xhr.open(method, url, true);
  			if (method !== 'POST')
  				postVars = null;
  			xhr.send(postVars);
      }
    }
  })();
  
})();
(function(){
  
  BOLSidebar.scheduler = function(interval, target, init){  
      //private
      var checkInterval = function(val){
        if(typeof interval !== "number"){
          throw new TypeError("Scheduler interval must be a number");
        }
        else if(interval < 1){
          throw new Error("Scheduler interval must be greater then 0");
        }
        return val;
      };
      var checkTarget = function(target){
        if(typeof target !== "function"){
          throw new Error("Scheduler target must be a function");
        }
        return target;
      }
      
    	var intval = checkInterval(interval);
  		var target = checkTarget(target);
      var active = false;
      var instance = null;
      
      // init target now?
      if(init === true){
        target();
      }
      
      //public
      return {
        start: function(){
          try {
            instance = window.setInterval(target,intval * 1000);
            active = true;
          } catch (e) {
  					console.error("Cannot start interval: ",e);
  				}
        },
        stop: function(){
          try {
  					window.clearInterval(instance);
            active = false;
  				} catch (e) {
  					console.error("Cannot stop interval: ", e);
  				}
        },
        setInterval: function(val){
          intval = checkInterval(val);
          this.stop();
  			  this.start();
        },
        isActive: function(){
          return active;
        }
      };
  }
  
})();
(function(){
  
  BOLSidebar.storage = (function(){
    
    var checkType = function(mode){
      var storage_type = "";
      if ( !mode || mode === 'local' )
        storage_type = "localStorage";
      else if (mode === 'session')
        storage_type = "sessionStorage";
      else
        throw "storage mode " + mode + "  invalid";
        
      return storage_type;
    };
    
    return{    
      write: function(key, value, mode){
        	try {
    				var storage_type = checkType(mode);
            window[storage_type].removeItem(key);
    				window[storage_type].setItem(key, value);
            return true;
    			} catch (e) {
    				console.error("Error inside Util.Data.setItem: ", e);
            return false;
    			}
      },    
      read: function(key, mode){
  			try {
          var storage_type = checkType(mode);
  			  var value = window[storage_type].getItem(key);
  			} catch (e) {
  				console.error("Error inside Util.Data.getItem for key:" + key, e);
  			}
  			return value;
      },    
      erase: function(key, mode){
        try {
  				var storage_type = checkType(mode);
  				window[storage_type].removeItem(key);			
          return true;
  			} catch (e) {
  				console.error("Error inside Util.Data.removeItem: ",e);
          return false;
  			}
      }    
    };
  })();
  
})();








(function(){
  
  BOLSidebar.Status = (function(){
    var viewChanged = BOLSidebar.event();
    var view = "topic";
    var minimized = BOLSidebar.event();
    return {
      setView: function(newView){
        view = newView;
        viewChanged.notify(view);
      },
      minimize: function(){
      },
      subscribe: function(subscriber,event){
        if(event === "change")
          viewChanged.attach(subscriber);
      }
    };
  })();

})();
(function(){
  
  BOLSidebar.Topic = function(newId,newName,newType){
    //set topic properties
    var name = newName || "";
    var type = newType || "";
    var id = newId  || "";
  
    return {
      getId: function(){ return id; },
      getName: function(){ return name; },
      getType: function(){ return type; },
      id: function(){ return id; },
      name: function(){ return name; },
      type: function(){ return type; },
      toObj: function(){
        return {
            "id": id,
            "name": name,
            "type": type
        };
      },
      set: function(newId,newName,newType){
          id = newId || id;
          name = newName || name;
          type = newType || type;
      },
      save: function(){
        var topics = JSON.parse(BOLSidebar.storage.read("topics")) || {};
        topics[id] = this.toObj();      
        return BOLSidebar.storage.write("topics",JSON.stringify(topics));
      },    
      match: function(topic){      
        if(topic){
          var that = this.toObj;
          var match = true;
          for(var prop in topic){
            match = that.hasOwnProperty(prop) ? that[prop] === topic[prop] : false;
            if(!match) return match;           
          }
          return true;
        }
        return false;
      },
      equals: function(topic){      
        return ( topic && ( name === topic.name && type === topic.type ) ) ? true : false;
      }
    }
  };
  
  /**
   * Topic class methods and properties
   */
  BOLSidebar.Topic.events = {
    loaded: BOLSidebar.event(),
    started: BOLSidebar.event()
  };
  BOLSidebar.Topic.subscribe = function(subscriber,event){
    if(BOLSidebar.Topic.events.hasOwnProperty(event))
      BOLSidebar.Topic.events[event].attach(subscriber);
  };
  BOLSidebar.Topic.pull = function(url){
  	try {
  		  BOLSidebar.request.async('GET', BOLSidebar.config.BUG_SERVER_SCRIPT_URL, BOLSidebar.Topic.events.loaded.notify);
  		} catch (e) {
  			console.error("Request failed: ", e);
  		} 
      BOLSidebar.Topic.events.started.notify();    
  };

})();
(function(){
  
  BOLSidebar.Options = (function(){
    var loadOptions = function(){
      return {
        showMode: JSON.parse(BOLSidebar.storage.read("showMode")) || BOLSidebar.config.VIEW_MODE,
        refreshRate: JSON.parse(BOLSidebar.storage.read("refreshRate")) || BOLSidebar.config.REFRESH_INTERVAL,
        minimized: JSON.parse(BOLSidebar.storage.read("minimized")) || false
      }
    };
    var opt = loadOptions();
    var events = {
      minimize: BOLSidebar.event(),
      refresh: BOLSidebar.event(),
      mode: BOLSidebar.event()
    };
    return {
      setShowMode: function(mode){
        if(typeof mode === "string" && mode === "both" || mode === "contrib" || mode === "fav"){
          if(BOLSidebar.storage.write("showMode",JSON.stringify(mode))){
            opt.showMode = mode;
            events.mode.notify(opt.showMode);
            return true;
          }          
        }
        return false;
      },
      setRefreshRate: function(rate){
        if(!isNaN(rate)){
          if(BOLSidebar.storage.write("refreshRate",JSON.stringify(parseInt(rate)))){
            opt.refreshRate = rate;
            events.refresh.notify(opt.refreshRate);
            return true;
          }          
        }
        return false;      
      },
      toggleMinimize: function(){
        opt.minimized = !opt.minimized;
        
        if(BOLSidebar.storage.write("minimized",JSON.stringify(opt.minimized))){
          console.log("notify of :",opt.minimized)
          events.minimize.notify(opt.minimized);
        }
      },
      getShowMode: function(){
        return opt.showMode;
      },
      getRefreshRate: function(){
        return opt.refreshRate;
      },
      getMinimized: function(){
        return opt.minimized;
      },
      get: function(){
        return opt;
      },
      reload: function(){
        opt = loadOptions();
      },
      subscribe: function(subscriber,event){
        if(events.hasOwnProperty(event))
          events[event].attach(subscriber);
      }
    };
  })();

})();
(function(){
  
  BOLSidebar.TopicsSettingsList = function(label){
    var load = function(label){ 
      return JSON.parse(BOLSidebar.storage.read(label)) || {}; 
    }
    var settingsLabel = label;  
    var settings = load(label);
    var unsavedChanges = false;
    var changed = BOLSidebar.event();
    var saved = BOLSidebar.event();
    return {       
      add: function(key,value){
        //settings[topic.getId()] = topic.getName();
        settings[key] = value;
        unsavedChanges = true;
        changed.notify(settings);
      },
      remove: function(key){
        if(this.exists(key)){
           delete settings[key];
           unsavedChanges = true;
           changed.notify(settings);
        }              
      },
      exists: function(key){
        return settings.hasOwnProperty(key);
      },
      toggle: function(key,value){
        if(this.exists(key)){
          this.remove(key);
        }
        else if(typeof key === "string"){
          this.add(key,value);
        }
      },
      get: function(){
        return settings;
      },
      subscribe: function(subscriber,event){
        if(event === "change")
          changed.attach(subscriber);
        else
          saved.attach(subscriber);
      },
      save: function(){
        var status = BOLSidebar.storage.write(settingsLabel,JSON.stringify(settings));
        if(status){
          unsavedChanges = false;
          saved.notify(settings);
        }
        else{
          console.error("Cannot save " + label + ", resetting object");        
        }
        return status;
      },
      reload: function(){
        settings = load(settingsLabel);
        changed.notify(settings);
      }
    };
  }
  
  BOLSidebar.Blocklist = new BOLSidebar.TopicsSettingsList("blocklist");
  BOLSidebar.Colorlist = new BOLSidebar.TopicsSettingsList("colorlist");
  
})();




(function(){

  BOLSidebar.ApplicationController = (function(){
    return{
  	  minimize : function (minimized){
  		  BOLSidebar.AppView.toggle(minimized);	
  	  }
    }
  })();
  
  BOLSidebar.Options.subscribe(BOLSidebar.ApplicationController.minimize,"minimize");

})();
(function(){
  
  BOLSidebar.OptionsController = (function(){	
  	return {
      toggle_minimize : function (){
  		  BOLSidebar.Options.toggleMinimize();	
  	  },
      update: function(params){
        if(params){
          if(params.hasOwnProperty("mode")){
            BOLSidebar.Options.setShowMode(params.mode);
          }
          if(params.hasOwnProperty("interval")){
            BOLSidebar.Options.setRefreshRate(params.interval);
          }            
        }      
      }
    };
  })();

})();
(function(){
  
  BOLSidebar.TopicController = (function(){
    var _cache = null;
    return {
      show: function(json){
        if(json){
          _cache = json;
          BOLSidebar.TopicView.render(json);      
        }
        else {
          this.reload();
        }
      },
      reload: function(){
        BOLSidebar.TopicView.render(_cache);
      },
      toggle_indicator: function(){
        BOLSidebar.TopicView.indicate();
      }
    };
  })();
  
  BOLSidebar.Topic.subscribe(BOLSidebar.TopicController.toggle_indicator,"started");
  BOLSidebar.Topic.subscribe(function(json){
    BOLSidebar.TopicController.show(json); 
    //TopicController.toggle_indicator();
  },"loaded");
  BOLSidebar.Options.subscribe(BOLSidebar.TopicController.reload,"mode");
  BOLSidebar.Blocklist.subscribe(BOLSidebar.TopicController.reload,"saved");
  
})();
(function(){
  
  BOLSidebar.EditController = (function(){
    var _cache = null;
    return {  
      show: function(topics){
        if(topics){
          _cache = topics;
          BOLSidebar.EditView.render(topics);
        }
        else {
          this.reload();
        }
      },
      reload: function(){
        BOLSidebar.EditView.render(_cache); 
      },
      toggle_block: function(params){
        if(params && params.hasOwnProperty("id")){
          if(params.id !== "000" && params.id !== "111")
            BOLSidebar.Blocklist.toggle(params.id,params.name);
        }
      },
      save_edits: function(){
        BOLSidebar.Blocklist.save();
        BOLSidebar.Router.to_path("topics");
      },
      discard_edits: function(){
        BOLSidebar.Blocklist.reload();
        BOLSidebar.Router.to_path("topics");
      }
    };
  })();
  
  BOLSidebar.Topic.subscribe(BOLSidebar.EditController.show,"loaded");
  BOLSidebar.Blocklist.subscribe(BOLSidebar.EditController.reload,"change");

})();




(function(){
  
  var routes = {
    "default": { route:"#/", run: BOLSidebar.TopicController.show },
    "topics": { route:"#/topics", run: function(){BOLSidebar.Status.setView("topic");} },
    "edits": { route: "#/edits", run: function(){BOLSidebar.Status.setView("edit");} },
    "options": { route: "#/options", run: BOLSidebar.OptionsController.show },
    "save_options": { route: "#/options/save", run: BOLSidebar.OptionsController.save },
    "discard_options": { route: "#/options/discard", run: BOLSidebar.TopicController.show },
    "save_edits": { route: "#/edits/save", run: BOLSidebar.EditController.save_edits },
    "discard_edits": { route: "#/edits/discard", run: BOLSidebar.EditController.discard_edits },
    "new_refresh_interval": { route: "#/options/refresh/:interval", run: BOLSidebar.OptionsController.update },
    "new_show_mode": { route: "#/options/show/:mode", run: BOLSidebar.OptionsController.update },
    "block_toggle": { route: "#/toggle/:id/:name", run: BOLSidebar.EditController.toggle_block },
    "minimize_toggle": { route: "#/minimize", run: BOLSidebar.OptionsController.toggle_minimize }
  };
  
  BOLSidebar.Router = (function(routes){
    
    var PATH_REPLACER = "([^\/]+)";
    var PATH_NAME_MATCHER = /:([\w\d]+)/g;  
    var QUERY_STRING_MATCHER = /\?([^#]*)?$/;
    PATH_NAME_MATCHER.lastIndex = 0;
    //process routes
    for(var path in routes){
      //create new Regex that mathes the route
      routes[path].regex = new RegExp(routes[path].route.replace(PATH_NAME_MATCHER, PATH_REPLACER) + "$");
  
      //add parameter names to params array
      routes[path].params = [];
      while ((path_match = PATH_NAME_MATCHER.exec(routes[path].route)) !== null) {
        routes[path].params.push(path_match[1]);
      }
      
    }  
    
    //store routes as private
    var routes = routes;
    
    var clearRoute = function(){
      window.location.hash = "/sidebar";
    };
    
    //event callback
    var route = function(){
      var hash = window.location.hash;
      console.log("Routing to: ",hash);
      //check hash value to avoid infinite loop
      if(hash !== "#/sidebar"){
        var match = null;
        //routes are indexed by path
        for(path in routes){
          if(match = hash.match(routes[path].regex)){
            //console.log("Found match: ",match,"\nobject: ",routes[path]);
            var params = {};
            for(var idx=1; idx < match.length; idx++){
              params[routes[path].params[idx-1]] = BOLSidebar.util.decode(match[idx]);
            }
            //console.log("Sending params: ",params, "\n to: ",path);
            routes[path].run(params);
            break;
          }       
        }
        clearRoute();
      }
    };
    
    window.addEventListener("hashchange", route, false);
   
    return {
      clear: clearRoute,
      to_path: function(route,params){
        routes[route].run(params);
        clearRoute();
      }    
    };
    
  })(routes);
})();
(function(){
  
  BOLSidebar.TopicHelper = {
    _cacheJSON: "",
    _cacheTopics: {},
    transform: function(topicsJson){
      if(topicsJson === this._cache){
        var topicsObj = _cacheTopics || {};
      }
      else{
        var topicsObj = JSON.parse(topicsJson) || {};
      }
      
      var topicsArr = [];
  
      if (topicsObj.r === "0"){     
        var topicsShema = { 
          "fav": { count: parseInt(topicsObj.numNewFavMessages), topicNames: topicsObj.newFavTopicList, ids: topicsObj.newFavTopicListIDs},
          "contrib": {count: parseInt(topicsObj.numNewContribMessages), topicNames: topicsObj.newContribTopicList, ids: topicsObj.newContribTopicListIDs}
        }
  
        for(var type in topicsShema){
          if(topicsShema[type].count > 0){
            for(var topic in topicsShema[type].topicNames){
              topicsArr.push(BOLSidebar.Topic(topicsShema[type].ids[topic], topicsShema[type].topicNames[topic], type));
            }
          }
        }
      }
    return topicsArr;
    }
  }

})();

(function(){
  //Base64 encoded images used for navigation icons
  BOLSidebar.asset = {};
  BOLSidebar.asset.opt_ico = 
  "iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAAC\
  xjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4\
  1LjbQg61aAAABG0lEQVQ4T3VSLROCUBAkEolEotFINBKJ/gSjkcg/MBr5CUSj0Ug0Go1GG7h7s8c\
  cDL6ZN+/udu/7JcmfM03TIdzsH2+2g5yP43jF/UJeHNh6GHabQQAUILzcA/KAe+cNtg/0ahFAGc1\
  R5CIShHfCv+CUMw7FgRsIKQGWqJ73TgTvogCD2aBk7FF95rRBPseGOQdxU8hvBShJrLzckHE9L7Z\
  jvXp2EBoqJzl3Ak3fOG3ErRqQajn3ysz9bmU+C28FtnQu5PzxYSEqBzcfri1glHlqG5pAGqy0UB6\
  zNMHxqEQcmm2FzqX/Kk7aA8SXmQLntOD44BT5ySq0iQbvw3vgn9gKbmuLX3TVN7/mMuM6Cnthicr\
  MwbEC9pqtuT+dKTSP+L0UhAAAAABJRU5ErkJggg==";
  
  BOLSidebar.asset.opt_ico_hover = 
  "iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAAC\
  xjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4\
  1LjbQg61aAAABSklEQVQ4T3VTLXPDMAwNLBwsHBwcLCwsLBwryceuqDBw/2BwzPoJg4OBu8TOBRY\
  OFhYWtnqS7TpZ6jtdzpb0nt6zk2UPVkV2HWJHw9Ojuni+p3ZZGfdVGncpyV3TKIz95v3LLEhFw3N\
  h3F9sMG5gkEYiABl7LqndjADAGBu5GEBpAfKl6UlAeKqc3CrmQ4IBfnbULJDAiNCcU/saCgvTf3q\
  AQc5ghmjkAIM2dodUL3zQ2mbBBCfkhB0aPFoTGKdm6V61RnZydZaTfdfmnpCM+6nbZD/SvEzDjVs\
  04yqQhM555u4gzAwi9QCDs8psz8EsGDcC4GuLRuIKdaqtmMZmyYGg+YXxPUsdQal70yndKZyxTre\
  6vyodb7pEnn95AB7lU6NY/1FZ5SZqlvR7f2Vq7Ax6uxk90dRx9uQf4xQBWjAimGGcfFnr3J91A7Y\
  2foh06GEKAAAAAElFTkSuQmCC";
  
  BOLSidebar.asset.min_ico = 
  "iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAAC\
  xjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4\
  1LjbQg61aAAABCklEQVQ4T4VSoRaCQBAkGolEop9ANBqJfgLRaLxmNBIpdqLRaCQaiUYiDZzBOd7\
  dPUDeu3fs7szuze5G0co3juPBOfEabvYDnAzDUOL0+Pc++Go49otJEEgBaC0D/w3Ok8fxdbCPXgJ\
  VnIgCpy5A8UrxHphsjsOwgQcAuzV9wN2UoJkwMGJqlM5kqzFMDNxHCbKIGuxz/3YUAFsdnAuNQuS\
  KZNjXsNNB3OJLPjtXsBb5tUJuJdMobkhORe62mmUlcYQi55PPcZgt3cCdVIhN+02Fc7Nbhfu8lID\
  yHEzhYWzjlPmN28B3Z1dxz33gTiy+jmNzV9RtHPxcTb9imIVaNAFW5sbxptY4xH4BCtjbbRrJ5XY\
  AAAAASUVORK5CYII=";
  
  BOLSidebar.asset.min_ico_hover = 
  "iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAAC\
  xjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4\
  1LjbQg61aAAABMElEQVQ4T4VTLVPDQBCNRCKRSH4CEomsxNU0FwZVWYlDInG7PwGJjGTa28xJZGV\
  lJRL27X2QtEnIzE0mt2/fu/duU1UTT8P+Lq8lh8spXNl/4u1VQ/LmSL4dy09/1eTf9ftmlKThcF2\
  T7EsDSVCS1lYmIn90vL0fEECxNCoYRH0A6o46NhI91YrlttRzQQk+ltxeTPmrqXtNBMEwCMM86oL\
  CXDAgVoEDCEwdHhJb+2+iCijqLJtqxf4xNneMZk315TTpfj3jcSuqLAsUcRVoduQ/x5oRqJGzfza\
  8viskG5n9cS6sbEmzCYl8YXt5w9hmnpp3D/GUcihCSO5vqnbrsX6zlyYPvgeYElz0/xW92U1sBjm\
  kYM8EAB6MaH++NZMzxVMGeMERoYyJs7d6HfuzfgEWRUKTFoGn8QAAAABJRU5ErkJggg==";
  
  BOLSidebar.asset.edit_ico = 
  "iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAAC\
  xjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4\
  1LjbQg61aAAABPklEQVQ4T3WTIU8DQRCFr446/gGVyMoKROXJSn5CJQJR2ZAgUJXI4pBIDAmSNAg\
  kEkmrKhAVkLt+b/O22e4tl0xmZ+bNvp23e1WVfW3bnjZNc4N/wK/ksQl2kmOPYsBTbAuw85H/wur\
  iBhSWsYP1G+uZwPg5/jOpTTuMKgLa6Yil3aldRQzrUcBoFoJvFy6d6xH3CnrMjfuIzRJDrCGRNxE\
  PsbHYTBQ1GQgcdpNPmYil+nOqnAiwF+cmFcG9mY+EIP/q/FZrqe3454BnMXOwiMw+okbREQceRyc\
  JquNltZg1iwKJFh6C7tu5x2yUW+f/NFaoaZaU3ferDcXUT25lbdzqsKnYfcdqWAI4S65Ps98Rb9z\
  Y4C/yh1J7xiCmlf0NgT9yarwuPlEK59Sf0oY4I/n3DmNpF4mBjaP99zftAf1qIq6807RsAAAAAEl\
  FTkSuQmCC";
  
  BOLSidebar.asset.edit_ico_hover = 
  "iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAAC\
  xjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4\
  1LjbQg61aAAABaUlEQVQ4T3VTLVPDQBANDlmJRKIYJALBDAZZiasgHwwKWck/qMTdSiQSXCWT3mU\
  iK5FIJLK8t5ttmqZk5ubuspt9H7vJsr1nJu2kkNVdIfG5COmdeylpOpPl8X7u4J5LfChD/EHyZn+\
  h0Fcp9e3BAmVoZPtBiJ84z5lsDOLaYwQYIxItpF9SZDCX+qKSeJ1LuuS9lNWTFkCOv8uoBZS+GaB\
  Was5D/BjQDqnF/azTzwKtohOpq6gvEFjaHdpxNq0ojB1AE/ekkvY082rcScc/1CAedb/TTL04v3W\
  splkV0gsvDKjbpuvVTcH9yMxLG83tjFXjPFCEZkF3jWJc7/a1R4NpLottc6o0jZrcvC5pThbuMty\
  /0o5gUY6ZZm4CsVmwPaNBQfK9xIITZ4Ua2fZa0a3HGniU+lyNBKoZ2tw4XbqO+MlgUFTv7mhSmy1\
  l5e3yLozGVAehb0U/32BFp0eIhwadZlC7r//+pj9v0qXbpL9+sAAAAABJRU5ErkJggg==";
  
  BOLSidebar.asset.loading_ico = 
  "R0lGODlhEAAQAPQAAP///9HUzfz9/Nrd1+jp5tLUztfa1Pb39u7v7dTX0eXn4+Pk4Pn5+Ovt6vT0\
  893f2uDi3QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05F\
  VFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAA\
  EAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla\
  +KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KM\
  aCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr\
  6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAA\
  EAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoL\
  LoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAA\
  ABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7\
  baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCO\
  ZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYA\
  qrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVf\
  ICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0Ua\
  FBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==";
})();
(function(){
  //Create CSS used by the BugSidebar
  var generateCss = (function(){
  	BOLSidebar.css.inject('\
    /* BOLSidebar.Header */\
    \
  	#sidebarHeader { \
      padding: 7px 10px 5px;\
      height:18px; \
  		background: #909090; /* Old browsers */ \
		background: -moz-linear-gradient(top, #909090 0%, #4c4c4c 100%); /* FF3.6+ */ \
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#909090), color-stop(100%,#4c4c4c)); /* Chrome,Safari4+ */ \
		background: -webkit-linear-gradient(top, #909090 0%,#4c4c4c 100%); /* Chrome10+,Safari5.1+ */ \
		background: -o-linear-gradient(top, #909090 0%,#4c4c4c 100%); /* Opera 11.10+ */ \
		background: linear-gradient(top, #909090 0%,#4c4c4c 100%); /* W3C */ \
  		} \
    #sidebarTitle { \
      float:left; \
    }\
    #sidebarTitle a{ \
      font-size: 14px; \
      font-weight: bold; \
      color:white; \
      cursor: pointer; \
    } \
    .headerButton { \
      height:15px; \
      width:15px; \
      float: right; \
      cursor: pointer; \
      }\
  	#editButton { \
      margin-right:3px; \
      background-image:url(\'data:image/png;base64,'+BOLSidebar.asset.opt_ico+'\'); \
    }\
  	#editButton:hover { \
      background-image:url(\'data:image/png;base64,'+BOLSidebar.asset.opt_ico_hover+'\'); \
    }\
  	#minimizeButton { \
      background-image:url(\'data:image/png;base64,'+BOLSidebar.asset.min_ico+'\'); \
    }\
  	#minimizeButton:hover { \
      background-image:url(\'data:image/png;base64,'+BOLSidebar.asset.min_ico_hover+'\'); \
    }\
    #loading_anim { \
      margin-right:4px; \
      height:15px; \
      width:15px; \
      float: right; \
      background-image:url(\'data:image/gif;base64,'+BOLSidebar.asset.loading_ico+'\'); \
    }\
    \
    /* BOLSidebar.Body */\
    \
  	#sidebarBody { \
      padding:0px; \
      clear:both; \
    } \
  	#sidebarBody .optionsButtonContainer { \
      padding:4px; \
    } \
  	#sidebarBody .optionsButton a { \
      font-weight:bold; \
      text-decoration: none; \
      color:#408DCF; \
      cursor:pointer; \
      padding: 0 6px; \
      margin-right: 5px; \
      float:right; \
      border:#C0C0C0 1px solid; \
      width:54px; \
      text-align:center; \
    } \
    #sidebarBody .optionsButton a:hover {\
      border-color: #888; \
      color: #58595A; \
    }\
  	#sidebarBody ul li a:hover {color: #669FCC} \
  	#sidebarRefresh {height: 17px; width: 24px; float: right;} \
  	\
  	.sidebarContentButton { \
  	width: 20px; float:left; margin-left: 3px; margin-top: 2px; border: 2px solid #DEDDD6; text-align:center; \
  	border-width: 2px 2px 0px 2px; font-weight: bold; font-size: 11px; color:#A09F9D; cursor:pointer; \
  	-moz-border-radius: 4px 4px 0px 0px; border-radius: 4px 4px 0px 0px; \
  	} \
  	.sidebarContentButton:hover { border-color:#669FCC; color:#669FCC; } \
    .sidebarContentButton.active { border-color:#E3A64A; color:#E3A64A; } \
    .sidebarContentButton.active:hover { border-color:#669FCC; color:#669FCC; } \
  	#topicView #topics {padding:5px;} \
    #topicButtons { height:17px; margin-top:2px; }\
  	#topicButtons .selected{ border-color:#fcd61a; color:#FCD61A; } \
  	#topicButtons .selected:hover { border-color:#669FCC; color:#669FCC; } \
    #topicButtons a { text-decoration:none; }\
  	#editView #editTopics { clear:both; cursor:default; padding:5px;} \
  	#editView #editTopics > ul{ }\
  	#editView #editMenu { background-color:#919791; color:white; } \
  	#editView .editNavButton { \
      float:left; \
      text-align:center; \
      background-color:#919791; \
      height:20px;width:92px; \
      font-weight:bold; \
      text-shadow: 0px -1px 0px #e5e5ee; \
    } \
  	#editMenu .editNavButton.buttonSelectedBlue { background-color:#EEEEE7; color:#919791; }\
  	#editMenu .editNavButton a { margin-top:10px; } \
  	#editMenu #editMenuBlock { border-right: 2px; } \
  	#editMenu #editMenuPaint {} \
  	#editView .editSeperator { \
      color: #EEEEE7; \
    margin-top:2px; \
    font-weight:bold; \
    text-align:center; \
    background: #4c4c4c; /* Old browsers */ \
	background: -moz-linear-gradient(top, #909090 0%, #4c4c4c 100%); /* FF3.6+ */ \
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#909090), color-stop(100%,#4c4c4c)); /* Chrome,Safari4+ */ \
	background: -webkit-linear-gradient(top, #909090 0%,#4c4c4c 100%); /* Chrome10+,Safari5.1+ */ \
	background: -o-linear-gradient(top, #909090 0%,#4c4c4c 100%); /* Opera 11.10+ */ \
	background: linear-gradient(top, #909090 0%,#4c4c4c 100%); /* W3C */ \
    } \
  	');
  })();

})();


(function(){
	var rightMenu = document.getElementById("ctl00_oRightMenu");
	var sidebarFrame = document.createElement("div");
	sidebarFrame.setAttribute("class","listbox");
	sidebarFrame.setAttribute("id","sidebarFrame");
	rightMenu.insertBefore(sidebarFrame,rightMenu.childNodes[4]);
	document.getElementById("sidebarFrame").innerHTML = '\
	  <div id="sidebarHeader" class="sidebar"> \
		  <span id="sidebarTitle"><a>Nove poruke </a></span> \
			<a href="#/minimize"><span id="minimizeButton" class="headerButton"></span></a> \
      <a href="#/edits"><span id="editButton" class="headerButton"></span></a>\
		</div> \
		<div id="sidebarBody" class="content alt sidebarcontent"> \
		</div>';

    BOLSidebar.AppView = (function(){
      var minimize = {
        toggle: function(state){
          document.getElementById("sidebarBody").style.display = state ? "none" : "block";
        },
        set: function(state){
          document.getElementById("sidebarBody").style.display = state ? "block" : "none";
        }
      };
      minimize.toggle(BOLSidebar.Options.getMinimized());
      return {
        toggle: function(state){
          minimize.toggle(state);
        }
      };
    })();

})();
(function() {

	var topicViewPanel = document.createElement("div");
	topicViewPanel.setAttribute("id", "topicView");
	// topicViewPanel.style.display = "none";

	var topicViewContent = '\
			<div id="topics"> \
				<ul id="sidebarTopics">\
        </ul> \
			</div> \
			<div id="topicButtons" class="contentButtons"> \
				<a href="#/options/show/both">\
          <span title="Sve teme" id="topic_both" class="sidebarContentButton">SP</span>\
        </a> \
				<a href="#/options/show/contrib">\
          <span title="Teme u kojima sudjelujem" id="topic_contrib" class="sidebarContentButton">S</span>\
        </a> \
				<a href="#/options/show/fav">\
          <span title="Teme koje pratim" id="topic_fav" class="sidebarContentButton">P</span>\
        </a> \
        <div id="loading_anim" style="display:none;"></div>\
			</div>';
				
	topicViewPanel.innerHTML = topicViewContent;
	document.getElementById("sidebarBody").appendChild(topicViewPanel);


  BOLSidebar.TopicView = (function(){
    var viewName = "topic";
    var mode = null;
    var topicSet = null;//{"both":[],"fav":[],"contrib":[], "info":[]};
    var active = [];
    var topics = null;
    var cache = null;
    var composer = function(topic){
      return ["<li><a href='/forum/topicunread/", topic.id(), ".aspx'>", topic.name(), "</a></li>"].join("");
          
    };
    //http://www.bug.hr
    return {
      render: function(topicsJson){
        active.length = 0;
        if(topicsJson !== cache){
          
          cache = topicsJson;
          topics = BOLSidebar.TopicHelper.transform(topicsJson);
          topicSet = {
            "both":[],
            "fav":[],
            "contrib":[] 
          };
          
          for(var idx=0; idx < topics.length; idx++){
              topicSet[topics[idx].type()].push(topics[idx].id());
          }
          topicSet["both"] = BOLSidebar.util.distinct(topicSet["fav"].concat(topicSet["contrib"])).reverse();
        }
  
        if(mode !== BOLSidebar.Options.getShowMode()){
          mode = BOLSidebar.Options.getShowMode();
          this.toggleButtons();
        } 
        var blocklist = BOLSidebar.Blocklist.get();
          
        for(var idx = 0, ts_length = topicSet[mode].length; idx < ts_length; idx++)
          for(var idy = 0, t_length = topics.length; idy < t_length; idy++)
            if( topics[idy].id() === topicSet[mode][idx] && !blocklist.hasOwnProperty(topics[idy].id()) ){
              active.push(composer(topics[idy]));
              break;
            }
              
        
        if(active.length === 0)
          active = ["<li style='text-align:center;'><a href='#/sidebar'>Trenutno nema aktivnih tema</a></li>"];
        
          
        document.getElementById("sidebarTopics").innerHTML = active.join("");
        
        if(BOLSidebar.ENV === "test" || BOLSidebar.ENV === "development")
            return {"input": topics, "processed": topicSet, "rendered": active};
      },
      toggle: function(view){
        view === viewName ? document.getElementById("topicView").style.display = "block" :
          document.getElementById("topicView").style.display = "none";
      },
      toggleButtons: function(){
        var buttons = document.getElementsByClassName("sidebarContentButton");
        for(var idx = 0; idx < buttons.length; idx++ ){
          if(buttons[idx].id.indexOf(mode) !== -1){
            BOLSidebar.util.addClass(buttons[idx],"active");
          }
          else {
            BOLSidebar.util.removeClass(buttons[idx],"active");   
          }             
        }
      },
      indicate: function(){
        var loading_anim = document.getElementById("loading_anim");
        loading_anim.style.display = "block";
        setTimeout(function(){loading_anim.style.display = "none"},1200);
      }
    }
  })();
  
  BOLSidebar.Status.subscribe(BOLSidebar.TopicView.toggle,"change");

})();
/** 
 * @projectDescription  EditView.
 *
 * @version  1.0 
 */

(function() {

	var editViewPanel = document.createElement("div");
	editViewPanel.setAttribute("id", "editView");
	editViewPanel.style.display = "none";

	var editViewContent = '\
				<div id="editMenu" style="display:none;">\
					<div id="editMenuBlock" class="editNavButton buttonSelectedBlue"><a>Block</a></div>\
					<div id="editMenuPaint" class="editNavButton"><a>Paint</a></div>\
					<div style="clear:both;"> </div> \
				</div> \
				<div id="editTopics"> \
					<div class="editSeperator">Aktivne teme</div>\
					<ul id="editActiveList"></ul> \
					<div class="editSeperator">Blokirane teme</div>\
					<ul id="editBlockedList"></ul> \
				</div>\
				<div class="optionsButtonContainer">\
					<!--<div id="cancel_edits_button" class="optionsButton"><a href="#/edits/discard"> Odustani </a></div>--> \
					<!--<div style="width:5px; height:5px; float:right;"></div>--> \
					<div id="confirm_edits_button" class="optionsButton"><a href="#/edits/save"> Prihvati </a></div> \
					<div style="clear:both;"></div> \
				</div>';

	editViewPanel.innerHTML = editViewContent;
	document.getElementById("sidebarBody").appendChild(editViewPanel);


  BOLSidebar.EditView = (function(){
    var viewName = "edit";
    var composer = function(id,name){
        return ["<li id=edit_", id,">",
        "<a href='#/toggle/", id, "/",BOLSidebar.util.encode(name),"'>", 
          name, "</a></li>"].join("");
    };
    
    return {
      render: function(topics){
        topics = BOLSidebar.TopicHelper.transform(topics);
        var blocklist = BOLSidebar.Blocklist.get();
        var blocked = [];
        var active = [];
        var topicSet = {};
        
        for(var idx=0; idx < topics.length; idx++){
          topicSet[topics[idx].id()] = topics[idx].name();
        }
        
        for(var id in blocklist){
           blocked.push(composer(id,BOLSidebar.util.decode(blocklist[id])));
        }
               
        for(var topicId in topicSet){    
          if(!blocklist.hasOwnProperty(topicId)){
            active.push(composer(topicId,topicSet[topicId]));
          }
        }
      document.getElementById("editActiveList").innerHTML = active.join("");
      document.getElementById("editBlockedList").innerHTML = blocked.join("");
      
      if(BOLSidebar.ENV === "test" || BOLSidebar.ENV === "development")
          return {"input": topics, "processed": topicSet, "rendered": {"active":active , "blocked": blocked}};
      },
      toggle: function(view){
        view === viewName ? document.getElementById("editView").style.display = "block" :
          document.getElementById("editView").style.display = "none";
      }
    };
    
  })();
  
  BOLSidebar.Status.subscribe(BOLSidebar.EditView.toggle,"change")
})();



//set up the main scheduler
(function(){
  if(BOLSidebar.ENV === 'production'){
    var scheduler = BOLSidebar.scheduler(BOLSidebar.Options.getRefreshRate(),BOLSidebar.Topic.pull,true);
    scheduler.start();
  }
})();
