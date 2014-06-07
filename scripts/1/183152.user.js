// ==UserScript==
// @name     SPF Remove related youtubes
// @include  http://*.youtube.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==

// I'm using defineGetter and defineSetter to lock the variables to make sure that YouTube doesn't change them.
function defineLockedProperty(obj, key, setter, getter) {
  if (ytcenter.utils.ie) {
    Object.defineProperty(obj, key, {
      get: getter,
      set: setter
    });
    return obj;
  } else {
    obj.__defineGetter__(key, getter);
    obj.__defineSetter__(key, setter);
    return obj;
  }
}
/*
  The wrapper for the SPFConfig.
  This is to protect the injected code inserted into YouTube.
 */
function SPFConfigWrapper(current, config) {
  var i, __self = this;
  current.config = config;
  
  ytcenter.utils.each(config, function(key, value){
    if (key !== "config")
      __self[key] = value;
  });
  
  this._config = config;
  
  defineLockedProperty(this, "config", function(cfg){
    ytcenter.utils.each(cfg, function(key, value){
      config[key] = value;
    });
  }, function(){
    return this._config;
  });
}
/*
  This is to lock the SPF functions used by YouTube.
 */
function SPF(objects) {
  defineLockedProperty(this, "enabled", function(value){ }, function(value){
    return true;
  });
  for (key in objects) {
    if (key === "enabled") continue;
    if (objects.hasOwnProperty(key)) {
      this[key] = objects[key];
    }
  }
}

var ytcenter = {};
// Some utilities functions used by YouTube Center.
ytcenter.utils = {};
ytcenter.utils.ie = (function(){
  for (var v = 3, el = document.createElement('b'), all = el.all || []; el.innerHTML = '<!--[if gt IE ' + (++v) + ']><i><![endif]-->', all[0];);
  return v > 4 ? v : !!document.documentMode;
}());
ytcenter.utils.isArray = function(arr){
  return Object.prototype.toString.call(arr) === "[object Array]";
};
ytcenter.utils.each = function(obj, callback){
  if (ytcenter.utils.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      if (callback(i, obj[i]) === true) break;
    }
  } else {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (callback(key, obj[key]) === true) break;
      }
    }
  }
};

// This handles everything that has anything to do with SPF.
ytcenter.spf = (function(){
  var _obj = {},
  listeners = { // The different listeners available for use.
    "error": [],
    "error-before": [],
    "processed": [],
    "processed-before": [],
    "received": [],
    "received-before": [],
    "requested": [],
    "requested-before": [],
    "script-loading": [],
    "script-loading-before": [],
    "begin-response": [],
    "dispose": [],
    "init": [],
    "load": [],
    "navigate": [],
    "prefetch": [],
    "process": []
  },
  loadListeners = [],
  events = ["error", "processed", "received", "requested", "script-loading", "begin-response"], // The events from YouTube.
  eventsSPF = ["dispose", "init", "load", "navigate", "prefetch", "process"], // These are events from YouTube, but is used to other things than loading the next page.
  injected = false,
  originalCallbacks = {},
  masterCallbacks = {};
  
  /*
    This makes it possible to enable or disable SPF on the page.
   */
  _obj.setEnabled = function(enabled){
    if (!window.spf || !window.spf.dispose) return;
    var objects;
    if (enabled) {
      //objects = window.spf.init(window.ytspf.config);
    } else {
      console.log("[SPF] Disposing of the SPF injections.");
      if (window.spf && window.spf.dispose && typeof window.spf.dispose === "function") {
        objects = window.spf.dispose();
      }
    }
  };
  /*
    This is the function you call to add an event listener to one of the events listed in listeners.
   */
  _obj.addEventListener = function(event, callback){
    if (!listeners.hasOwnProperty(event)) return;
    listeners[event].push(callback);
  };
  
  /*
    Checking if this code has done its job.
   */
  _obj.isInjected = function(){
    return injected ? true : false;
  };
  /*
    Checking if SPF is enabled on the page.
   */
  _obj.isEnabled = function(){
    return unsafeWindow && window.ytspf && window.ytspf.enabled ? true : false;
  };
  /*
    Checking if the page is ready for injection.
   */
  _obj.isReadyToInject = function(){
    var obj_name, i;
    console.log("[SPF] Checking if SPF is ready...");
    if (typeof window._spf_state !== "object") {
      console.log("[SPF] Failed... _spf_state object is not initialized yet!");
      return false;
    }
    if (typeof window._spf_state.config !== "object") {
      console.log("[SPF] Failed... _spf_state.config object is not initialized yet!");
      return false;
    }
    for (i = 0; i < eventsSPF.length; i++) {
      if (typeof window.spf[eventsSPF[i]] !== "function") {
        console.log("[SPF] Failed... " + eventsSPF[i] + " has not been created yet!");
        return false;
      }
    }
    console.log("[SPF] SPF is ready for manipulation!");
    return true;
  };
  /*
    Used to handle the first argument from the init event called by YouTube.
   */
  _obj._init = function(callbacks){
    if (ytcenter.getPage() === "embed") return;
    ytcenter.utils.each(callbacks, function(key, value){
      var a = key.replace(/-callback$/, "");
      if (key.indexOf("navigate-") === 0) {
        a = a.replace(/navigate-$/, "");
      }
      originalCallbacks[a] = value;
      callbacks[key] = masterCallbacks[key];
    });
    return callbacks;
  };
  /*
    Function called to inject the code into YouTube. If this is not called it wont do anything.
   */
  _obj.inject = function(){ // Should only be called once every instance (page reload).
    if (!_obj.isEnabled() || injected) return; // Should not inject when SPF is not enabled!
    injected = true;
    
    // Initializing the variables and getting the different SPF object from YouTube.
    var ytspf = window._spf_state,
        spf = window.spf,
        obj_name,
        func;
    console.log("[SPF] Injecting ability to add event listeners to SPF.");
    
    // Goes through every eventsSPF and creates a callback to handle an infinite loop.
    for (var i = 0; i < eventsSPF.length; i++) {
      if (typeof originalCallbacks[eventsSPF[i]] !== "function") originalCallbacks[eventsSPF[i]] = spf[eventsSPF[i]];
      masterCallbacks[eventsSPF[i]] = (function(event){
        return function(){
          var args = arguments;
          
          var r,j;
          console.log("[SPF] spf => " + event);
          console.log(args);
          if (event === "init") {
            args[0] = _obj._init(args[0]);
          }
          try {
            for (j = 0; j < listeners[event].length; j++) {
              args = listeners[event][j].apply(null, args) || args;
            }
          } catch (e) {
            console.error(e);
          }
          
          if (typeof originalCallbacks[event] === "function") {
            r = originalCallbacks[event].apply(null, args);
          } else {
            console.error("[SPF] Wasn't able to call the original callback!");
          }
          return r;
        };
      })(eventsSPF[i]);
      spf[eventsSPF[i]] = masterCallbacks[eventsSPF[i]];
    }
    var _spf = [];
    
    // Does the same here, but with events.
    for (var i = 0; i < events.length; i++) {
      if (events[i].indexOf("-") !== -1) {
        obj_name = events[i] + "-callback";
      } else {
        obj_name = "navigate-" + events[i] + "-callback";
      }
      if (typeof originalCallbacks[events[i]] !== "function") originalCallbacks[events[i]] = ytspf.config[obj_name];
      masterCallbacks[obj_name] = (function(event){
        return function(){
          var args = arguments;
          
          var r,j;
          console.log("[SPF] _spf_state => " + event);
          if (ytcenter.settings.debug_spf_args) console.log(args);
          try {
            for (j = 0; j < listeners[event + "-before"].length; j++) {
              args = listeners[event + "-before"][j].apply(null, args) || args;
            }
          } catch (e) {
            console.error(e);
            throw e;
            return;
          }
          if (typeof originalCallbacks[event] === "function") {
            r = originalCallbacks[event].apply(unsafeWindow, args);
          } else {
            console.error("[SPF] Wasn't able to call the original callback!");
          }
          
          for (j = 0; j < listeners[event].length; j++) {
            listeners[event][j].apply(null, arguments);
          }
          return r;
        };
      })(events[i]);
      _spf.push({
        key: obj_name,
        callback: masterCallbacks[obj_name],
        update: (function(event){
          return function(a){
            originalCallbacks[event] = a;
          };
        })(events[i])
      });
      if (!ytspf) ytspf = {};
      if (!ytspf.config) ytspf.config = {};
      if (!window.ytspf) window.ytspf = {};
      if (!window.ytspf.config) window.ytspf.config = {};
      ytspf.config[obj_name] = masterCallbacks[obj_name];
      window.ytspf.config[obj_name] = masterCallbacks[obj_name];
    }
    
    // Wraps everything to prevent YouTube from changing it.
    ytspf = new SPFConfigWrapper(ytspf, new SPFConfig(_spf, ytspf.config));
    defineLockedProperty(unsafeWindow, "_spf_state", function(s){
      ytcenter.utils.each(s, function(key, value){
        ytspf[key] = value;
      });
    }, function(){
      return ytspf;
    });
  };
  
  return _obj;
})();

// Optional : This is used to force SPF to be enabled, but can be disabled by _obj.setEnabled().
window.ytspf = new SPF(window.ytspf);

// Used to start the whole injecting process. Would be ideal to only run this when the whole page has loaded.
var _spf_timer = function(){
  if (ytcenter.spf.isEnabled()) {
    if (ytcenter.spf.isReadyToInject() && !ytcenter.spf.isInjected()) {
      ytcenter.spf.inject();
    } else if (!ytcenter.spf.isReadyToInject() && !ytcenter.spf.isInjected() && document.readyState !== "complete") {
      setTimeout(_spf_timer, 1000);
    }
  }
};
_spf_timer();

// This is the only thing needed for what you want. This can be used to manipulate the incoming data before YouTube creates the new player.
// So you will be able to modify the player configurations before YouTube uses them.
ytcenter.spf.addEventListener("received-before", function(url, data){
  /*
   * url : The url of the new page.
   * data : An object with every information needed for the new page.
   *
   * data:
   *   attr
   *     * : the key is the id of the element, which is modified by this.
   *       class : the new classes for the element.
   *       ... Would believe that other attributes for the element can be modified too with this.
   *   css : The new css for the page, but the timing script is present in it too. It's pure html inserted into the page.
   *   html
   *     * : element id, which the value is the new html content for that specific element.
   *   js : The javascript inserted into the page. It's possible for this to have the player configurations too, but very unlikely.
   *   swfcfg : the player configurations, which is where you want to look.
   *     args
   *       rvs : This is the property you want to edit as it handles what is shown on the recommended videos when you're finished with the video.
   *   timing : The timing on when things loaded on the page.
   *     * : The value is the date.
   *   title : The new title for the page.
   */
  
  data.swfcfg.args.rvs = data.swfcfg.args.rvs.replace(/title%3D(.(?!%26))*?anatomy(?!%2C)(.(?!%2C))*?id%3D[\w-]{11}/ig, 'id%3D')
                         .replace(/id%3D[\w-]{11}(?!%2C)(?=([^&](?!%2C))*?anatomy)/ig, 'id%3D');
  
  return data; // This is not really needed but good to indicate that it's returned.
});