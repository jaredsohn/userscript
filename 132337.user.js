// ==UserScript==
// @name            Ikariam Developer Tools V0.5.0+
// @namespace       AubergineAnodyne
// @description     Base scripting tools and data tracking utilities to simplify
//                  writing Ikariam Greasemonkey scripts.
// @author          AubergineAnodyne 
//                    (very loosely based on Ikariam Developer Tools by PhasmaExMachina)
//
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
//
// @version         0.29
//
// @history         0.29 Fixed pillage of crystal not showing up.
// @history         0.28 Added COLONIZE constant.
// @history         0.27 Added helper methods for scripts to load/read Ikariam pages in the background.
// @history         0.27 Added support for spy data (IkaTools.EmpireData.EspionageData).
// @history         0.27 Added Romanian translation (by Peta).
// @history         0.26 Added Hungarian translation (by Toroco).
// @history         0.26 Updated for Ikariam changes in 5.3.2.
// @history         0.25 Fix bug in parsing training batches for military.
// @history         0.25 Fix bug in parsing returning colonization mission.  Also correct resource calculation for colonization mission.
// @history         0.25 Fix bug in parsing missions when pirate raid is in progress.
// @history         0.24 Added support for Pirate Fortress (v0.5.3 new building).
// @history         0.23 Added resetData function.
// @history         0.23 Fixed a bug that future research levels >= 9 would not be parsed.
// @history         0.22 Fixed a bug that stopped the script from running in some browser configurations.
// @history         0.22 Added some debugging features.
// @history         0.21 Added resizing of settings tab.
// @history         0.20 Added building icon data.
// @history         0.20 Added HTML setting type.
// @history         0.20 Added some movement type data.
// @history         0.20 Fixed a bug computing number of transports for transport missions.
// @history         0.19 Added Polish translation (from pitmm).
// @history         0.19 Fixed temple build resource requirements showing up incorrectly (marble instead of crystal).
// @history         0.19 Changed how transition to resource and mine views works.
// @history         0.18 Hopefully fixed population calculation crash when running the theology government.
// @history         0.18 Fix for transport form on test server.  (Probably coming to other servers with 0.5.1).
// @history         0.17 Added German localization (translation by Cherry).
// @history         0.17 Fixed date display bug with yesterday/today/tomorrow being incorrectly assigned due to timezone issue.
// @history         0.16 Reworked how initial ajax response is determined so it works in Chrome.
// @history         0.15 Removed CDATA section (hopefully will work in Chrome).
// @history         0.14 UI support for script settings.
// @history         0.14 Fixed corruption calculation for cities with no palace.
// @history         0.14 Corrected loading time for deploy on the same island.
// @history         0.13 Another tweak to work with TamperMonkey.
// @history         0.12 Another tweak to work with TamperMonkey.
// @history         0.11 Small tweak to work with TamperMonkey in Google Chrome.
// @history         0.10 Initial version.
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

if (typeof IkaTools == 'undefined') {
IkaTools = (function() {
  var ikaToolsVersion = 0;
  
  /**
   * Support functions for logging, profiling, and debugging.
   */
  var Logging = (function() {
    var exceptionLog = [];
    
    var options = {
      debug: false,
      timings: false,
      profile: false,
    };
    
    function getExceptionLog() {
      return exceptionLog;
    }
    
    /**
     * Analogous to console.log, but may have been disabled through options.
     */
    function debug() {
      if (options.debug && console && console.log) {
        // console.log is not a true javascript function.  In some browsers we can't call 
        // it with console.log.apply syntax.  Instead we just manually support up to 6
        // arguments.
        switch (arguments.length) {
          case 0:
            console.log();
            break;
          case 1:
            console.log(arguments[0]);
            break;
          case 2:
            console.log(arguments[0], arguments[1]);
            break;
          case 3:
            console.log(arguments[0], arguments[1], arguments[2]);
            break;
          case 4:
            console.log(arguments[0], arguments[1], arguments[2], arguments[3]);
            break;
          case 5:
            console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
            break;
          default:
            console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], 
                        arguments[5]);
            break;
        }
      }
    }
    
    /**
     * Debug a caught exception.
     */
    function debugException(text, ex) {
      exceptionLog.push({text: text, stack: ex.stack, message: ex.message});
      if (console && console.error) {
        console.error('IkaTools.debugException (in %s)\n%s\n\n%s\n', text, ex, ex.stack);
      }
    }
    
    /**
     * Wrap a function to catch and log an exception.
     * If the time property is true in options (or absent) then time the function call.
     * (May set alwaysTime option to output time regardless of disabled logging settings.)
     * If the group property is true in options (or absent) then group the function call.
     */
    function debuggable(debugOptions, func) {
      if (typeof(debugOptions) == 'string') {
        debugOptions = { label: debugOptions };
      }
      debugOptions = $.extend({ time: true, 
                                group: true,
                                profile: false,
                                swallowException: false,
                               }, debugOptions);
      if (!debugOptions.label) {
        debugOptions.label = Utils.nextId('_debuggable');
      }

      return function debuggableWrapper() {
        var time = ((options.timings && debugOptions.time) || debugOptions.alwaysTime) && 
                    console && console.time;
        var group = debugOptions.group && (options.group) && console && console.group;
        var profile = debugOptions.profile && options.profile && console && console.profile;
        try {
          if (profile) {
            console.profile(debugOptions.label);
          }
          if (group) {
            console.group(debugOptions.label);
          }
          if (time) {
            console.time(debugOptions.label);
          }
          return func.apply(this, arguments);
        } catch (ex) {
          Logging.debugException(debugOptions.label, ex);
          if (!debugOptions.swallowException) {
            throw ex;
          }
        } finally {
          if (time) {
            console.timeEnd(debugOptions.label);
          }
          if (group) {
            console.groupEnd(debugOptions.label);
          }
          if (profile) {
            console.profileEnd(debugOptions.label);
          }
        }
      };
    }

    /**
     * Wrap a console.time/timeEnd pair around a function.  May be disabled 
     * through options.
     */
    function time(timeOptions, func) {      
      return function time() {
        var time = (options.timings || timeOptions.alwaysTime) && console && console.time;
        try {
          if (time) {
            console.time(timeOptions.label);
          }
          return func.apply(this, arguments);
        } finally {
          if (time) {
            console.timeEnd(timeOptions.label);
          }
        }
      }
    }
    
    /**
     * Wrap a console.group/groupEnd pair around a function.  May be disabled 
     * through options.
     */
    function group(groupOptions, func) { 
      var label;

      var collapsed = false;

      return function group() {
        var group = (options.timings || options.debug) && console && console.group;
        try {
          if (group) {
            if (groupOptions.collapsed && console.groupCollapsed) {
              console.groupCollapsed(groupOptions.label);
            } else {
              console.group(groupOptions.label);
            }
          }
          return func.apply(this, arguments);
        } finally {
          if (group) {
            console.groupEnd(groupOptions.label);
          }
        }
      }
    }
    
    /**
     * Sets logging options.  Properties are debug, timings, and profile.
     */
    function setOptions(newOptions) {
      $.extend(options, newOptions);
      if (console && console.log) {
        //console.log("Set logging options to: ", options);
      }
    }
    
    /**
     * Allows logging options to be configured by browsing to various anchors 
     * (and persisted for future page views).
     */
    function setAndSaveOptionsFromPageAnchor() {
      var savedOptions = new Data.Value(
          'debugOptions', 
          { debug: false, timings: false, profile: false , group: false},
          { useDomain: false, version: 0 });
      savedOptions.get();
          
      var anchor = window.location.hash;

      if (anchor.substring(0, 15) == '#ikaScriptTools') {
        if (anchor == '#ikaScriptToolsDebugAll') {
          savedOptions.get().debug = true;
          savedOptions.get().timings = true;
          savedOptions.get().profile = true;
        } else if (anchor == '#ikaScriptToolsDebugNone') {
          savedOptions.get().debug = false;
          savedOptions.get().timings = false;
          savedOptions.get().profile = false;
        } else if (anchor == '#ikaScriptToolsDebugOn') {
          savedOptions.get().debug = true;
        } else if (anchor == '#ikaScriptToolsDebugOff') {

          savedOptions.get().debug = false;
        } else if (anchor == '#ikaScriptToolsGroupOn') {
          savedOptions.get().group = true;
        } else if (anchor == '#ikaScriptToolsGroupOff') {
          savedOptions.get().group = false;
        } else if (anchor == '#ikaScriptToolsTimingsOn') {
          savedOptions.get().timings = true;
        } else if (anchor == '#ikaScriptToolsTimingsOff') {
          savedOptions.get().timings = false;
        } else if (anchor == '#ikaScriptToolsProfilesOn') {
          savedOptions.get().profile = true;
        } else if (anchor == '#ikaScriptToolsProfilesOff') {
          savedOptions.get().profile = false;
        }
        savedOptions.saveAsync();
      }
      setOptions(savedOptions.get());
    }

    return {
      debug: debug,
      debugException: debugException,
      debuggable: debuggable,
      time: time,
      group: group,
      setAndSaveOptionsFromPageAnchor: setAndSaveOptionsFromPageAnchor,
      getExceptionLog: getExceptionLog,
    };
  })();
  
  /**
   * Random utils that don't belong anywhere else.
   */
  var Utils = function() {
    function thunk(func) {
      var computed = false;
      var value;
      
      function thunker() {
        if (!computed) {
          value = func();
          computed = true;
        }
        return value;
      }
      
      return thunker;
    }
    
    function resettable(func) {
      var value = func();
      
      function getValue() {
        return value;
      }
      
      getValue.reset = function() {
        var ret = value;
        value = func();
        return ret;
      }
      
      getValue.set = function(v) {
        value = v;
      }
      
      return getValue;
    }        
    
    function fixedFunction(value) {
      return function() {
        return value;
      }
    }

    var nextId = function() {
      var id = 10000;
      function nextId(prefix) {
        id++;
        if (prefix) {
          return prefix + id.toString(16);
        } else {
          return id;
        }
      };
      return nextId;
    }();
    
    var nextIntegerId = function() {
      var id = 100000;
      return function nextIntegerId() {
        return id++;
      };
    }();

    function EventDispatcher(name) {
      this.name = name;
      this.listeners = [];
    }
    
    $.extend(EventDispatcher.prototype, {
      addListener: function addListener(l) {
        var listener = Logging.debuggable(
            {
              label: 'EventDispatcher[' + this.name + '].ListenerWrapper',
              swallowException: true,
            },
            function() {
              l.apply(null, arguments)
            });
        this.listeners.push(listener);
        return {
          cancel: this._cancelListener.bind(this, listener),
        };
      },
      _cancelListener: function(listener) {
        for (var i = 0, len = this.listeners.length; i < len; i++) {
          if (this.listeners[i] === listener) {
            this.listeners.splice(i, 1);
            return;
          }
        }
      },
      /*bindEventArgs: function bindEventArgs() {
        var that = this;
        var args = Array.prototype.slice.call(arguments);
        return {
          bindEventArgs: function boundBindEventArgs() {

            return that.bindEventArgs.apply(that, 
                args.concat(Array.prototype.slice.call(arguments)));
          },
          send: function boundSend() {
            that.send.apply(that, args.concat(Array.prototype.slice.call(arguments)));
          },

          scheduleSend: function boundScheduleSend(name, delay, callback) {
            return that.scheduleSend.apply(that, 
                [name, delay, callback].concat(args).concat(Array.prototype.slice.call(arguments, 3)));
          },
          toJSON: function toJSON() {
            return undefined;
          },
        };
      },*/
      send: function send() {
        var listeners = this.listeners.slice();
        for (var i = 0, len = listeners.length; i < len; i++) {
          listeners[i].apply(null, arguments);
        }
      },
      scheduleSend: function(name, delay, callback) {
        var that = this;
        var sendArgs = [];
        for (var i = 3; i < arguments.length; i++)  {
          sendArgs.push(arguments[i]);
        }
        return clearTimeout.bind(null, setTimeout(
              function scheduledSend() {
                callback();
                that.send.apply(that, sendArgs);
              },
              Math.max(delay, 10)));
        
      },
      /*startIntervalSend: function startIntervalSend(name, initialDelay, interval) {
        this.cancelIntervalSend();
        var sendCall = this.send.bind(this);
        var sendArgs = [];
        for (var i = 2; i < arguments.length; i++) {
          sendArgs.push(arguments[i]);
        }
        this.cancelInterval = clearInterval.bind(null, setInterval(
            IkaTools.Logging.debuggable(
                'IkaTools.Utils.EventDispatcher.intervalSend[' + name + ']', 
                function() {
                  sendCall.apply(null, sendArgs);
                }),
            interval));
      },
      cancelIntervalSend: function cancelIntevalSend() {
        if (this.cancelInterval) {
          this.cancelInterval();
        }
      },*/
      toJSON: function toJSON() {
        return undefined;
      },
    });
    
    function getVersion() {
      var parts = $.map(
          $('#GF_toolbar li.version span').text().match(/[0-9]+/g), 
          function(x) {
            return parseInt(x);
          }).concat([0,0,0,0,0,0,0]);
      return {
        greaterThanOrEqual: function() {
          for (var i = 0; i < arguments.length; i++) {
            if (parts[i] != arguments[i]) {
              return parts[i] >= arguments[i];
            }
          }
          return true;
        },
        lessThan: function() {
          for (var i = 0; i < arguments.length; i++) {
            if (parts[i] != arguments[i]) {
              return parts[i] < arguments[i];
            }
          }
          return false;
        },
      };
    }
    
    function isChrome() {
      return navigator.vendor.match(/Google/) || navigator.userAgent.match(/Chrome/);
    }
    
    function iterateIkariamAjaxResponse(response, f) {
      $.each(response, function iterateIkariamAjaxResponseItem(index, item) {
        f(index, item[0], item[1]);
      });
    }
    
    function forEachIkariamAjaxResponseFunction(f) {
      return function forEachIkariamResponse(response) {
        iterateIkariamAjaxResponse(response, f);
      }
    }

    function backgroundFetchPage(url, callback, options) {
      options = $.extend({method: 'GET', data: ''}, options);
      
      var headers = {
        'User-agent': navigator.userAgent, 
        'Cookie': document.cookie,
        'Referer': 'http://' + document.domain + '/index.php',
      };
      if(options.method == 'POST') {
        headers['Content-type'] = 'application/x-www-form-urlencoded';
      }
      setTimeout(function() {
        GM_xmlhttpRequest ({
          method: options.method,
          url: url,
          data: options.data,
          headers: headers,
          onload: Logging.debuggable('IkaTools.Utils.backgroundGetIkariamPage[' + url + ']', callback)
	      });
	    }, 0);
    }

    function backgroundFetchIkariamAjaxPage(url, callback, options) {
      backgroundFetchPage(url, function(response) {
        callback(JSON.parse(response.responseText));
      }, options);
    }

    var jsonResponseRegex = /ikariam.getClass\(ajax.Responder, (.*?)\);$/m;
    function backgroundFetchIkariamFullPage(url, callback, options) {
      backgroundFetchPage(url, function(response) {
        var match = jsonResponseRegex.exec(response.responseText);
        jsonResponse = [];
        if (match) {
          jsonResponse = JSON.parse(match[1]);
        }
        callback(response, jsonResponse);
      }, options);
    }

    var urlParamsRegex = /\?([^\#]*)(#|$)/;
    function parseUrlParams(url) {
      var paramsList = url.match(urlParamsRegex)[1].split('&');
      var params = {};
      $.each(paramsList, function(index, item) {
        var paramParts = item.split('=');
        if (paramParts.length == 2) {
          params[paramParts[0]] = decodeURIComponent(paramParts[1]);
        }
      });
      return params;
    }

    var timestampRegex = /(\d+)\.(\d+)\.(\d+)\s+(\d+):(\d+):(\d+)/i;
    function parseIkariamTimestamp(timestamp){
      var d = new Date();
      //Get the local GMT offset in hours
      //Attempt to match the constituent parts of the timestamp
      var match = timestamp.match(timestampRegex);
      if (match){
        d.setTime(0);
        d.setDate(parseInt(match[1], 10));
        d.setMonth(parseInt(match[2], 10)-1);
        d.setFullYear(parseInt(match[3], 10));
        d.setHours(parseInt(match[4], 10));
        d.setMinutes(parseInt(match[5], 10));
        d.setSeconds(parseInt(match[6], 10));
        //Adjust the time to get its TZ correct
        d.setTime(d.getTime() - d.getTimezoneOffset() * Constants.Time.MILLIS_PER_MINUTE -
            Constants.Time.MILLIS_PER_HOUR);  // Server time is german = GMT+1
      }
      return d;
    }

    return {
      thunk: thunk,
      resettable: resettable,
      fixedFunction: fixedFunction,
      EventDispatcher: EventDispatcher,
      nextId: nextId,
      nextIntegerId: nextIntegerId,
      getVersion: thunk(getVersion),
      isChrome: thunk(isChrome),
      iterateIkariamAjaxResponse: iterateIkariamAjaxResponse,
      forEachIkariamAjaxResponseFunction: forEachIkariamAjaxResponseFunction,

      backgroundFetchIkariamAjaxPage: backgroundFetchIkariamAjaxPage,
      backgroundFetchIkariamFullPage: backgroundFetchIkariamFullPage,

      parseUrlParams: parseUrlParams,
      parseIkariamTimestamp: parseIkariamTimestamp,
    };
  }();
  
  /**
   *  Internationalization and localization routines.
   */
  var Intl = function() {
    function Localizer(allLanguages) {
      this.allLanguages = allLanguages;
      this.languages = ['en'];
    }
    $.extend(Localizer.prototype, {
      localize: function localize(identifier) {
        var identifierParts = identifier.split('.');
        if (arguments.length > 1) {
          identifierParts = $.makeArray(arguments);
        }
        for (var i = 0; i < this.languages.length; i++) {
          var languageConfig = this.allLanguages[this.languages[i]];
          if (languageConfig !== undefined) {
            var translation = this.find(languageConfig, identifierParts);
            if (translation !== undefined) {
              return translation;
            }
          }
        }
        return '?#!' + identifierParts.join(',') + '!#?';
      },
      delayedLocalize: function delayedLocalize() {
        var args = arguments;
        var t = this;
        return function doLocalize() {
          return t.localize.apply(t, args);
        };
      },
      find: function find(config, parts) {

        for (var i = 0; i < parts.length; i++) {
          config = config[parts[i]];
          if (config === undefined) {
            return undefined;
          }
        }
        return config;
      },
      setPreferredLanguage: function setPreferredLanguage(language) {
        this.languages.unshift(language);
      },
    });
    
    var baseLocalizer = new Localizer({
      en: {
        formatting: {
          "thousandsSeparator": ",",
          "unknown": "?",
          hourFormatAMPM: true,
        },
        timeunits: {
          long: {
            day: 'Day',
            hour: 'Hour',
            week: 'Week',
          },
          short: {
            day: 'D',
            hour: 'h',
            minute: 'm',
            second: 's',
          },
          complete: '-',
          yesterday: 'yesterday',
          tomorrow: 'tomorrow',
          today: 'today',
          am: 'AM',
          pm: 'PM',
        },
        settings: {
          script_settings: 'Script Options',
          settings: 'Settings',
          save: 'Save',
        },
      },
      de: {
        formatting: {
          "thousandsSeparator": ".",
          "unknown": "?",
          hourFormatAMPM: false,
        },
        timeunits: {
          long: {
            day: 'Tag',
            hour: 'Stunde.',
            week: 'Woche',
          },
          short: {
            day: 'T',
            hour: 'h',
            minute: 'm',
            second: 's',
          },
          complete: '-',
          yesterday: 'gestern',
          tomorrow: 'morgen',
          today: 'heute',
          am: 'AM',
          pm: 'PM',
        },
        settings: {
          script_settings: 'Script Optionen',
          settings: 'Einstellungen',
          save: 'speichern',
        },
      },
      hu: {
        formatting: {
          "thousandsSeparator": ",",
          "unknown": "?",
          hourFormatAMPM: true,
        },
        timeunits: {
          long: {
            day: 'Nap',
            hour: 'Óra',
            week: 'Hét',
          },
          short: {
            day: 'n',
            hour: 'ó',
            minute: 'p',
            second: 'mp',
          },
          complete: '-',
          yesterday: 'tegnap',
          tomorrow: 'holnap',
          today: 'ma',
          am: 'Délelőtt',
          pm: 'Délután',
        },
        settings: {
          script_settings: 'Script Beállítások',
          settings: 'Beállítások',
          save: 'Mentés',
        },
      },
      pl: {
        formatting: {
          "thousandsSeparator": ",",
          "unknown": "?",
          hourFormatAMPM: true,
        },
        timeunits: {
          long: {
            day: 'Dzien',
            hour: 'Godzina',
            week: 'Tydzien',
          },
          short: {
            day: 'D',
            hour: 'h',
            minute: 'm',
            second: 's',
          },
          complete: '-',
          yesterday: 'wczoraj',
          tomorrow: 'jutro',
          today: 'dzis',
          am: 'AM',
          pm: 'PM',
        },
        settings: {
          script_settings: 'Opcje Skryptu',
          settings: 'Ustawienia',
          save: 'Zapisz',
        },
      },
      ro: {  
        formatting: {  
          "thousandsSeparator": ",",  
          "unknown": "?",  
          hourFormatAMPM: false,  
        },  
        timeunits: {  
          long: {  
            day: 'Zi',  
            hour: 'Ora',  
            week: 'Saptamana',  
          },  
          short: {  
            day: 'D',  
            hour: 'h',  
            minute: 'm',  
            second: 's',  
          },  
          complete: '-',  
          yesterday: 'ieri',  
          tomorrow: 'maine',  
          today: 'azi',  
          am: 'AM',  
          pm: 'PM',  
        },  
        settings: {  
          script_settings: 'Optiuni Script',  
          settings: 'Setari',  
          save: 'Salveaza',  
        },  
      },
    });
    
    function formatInteger(number, forceShowSign) {
      if (number === undefined || isNaN(number)) {
        return baseLocalizer.localize('formatting.unknown');
      }

      number = Math.floor(number);

      var separator = baseLocalizer.localize('formatting.thousandsSeparator');       
      var s = number.toString();

      var sign = forceShowSign ? '+' : '';
      if (number === 0) {
        sign = '';
      } else if (number < 0) {
        sign = '-';
        s = s.substring(1);
      }

      var i = s.length - 3;
      while (i > 0) {
        s = s.substring(0, i) + separator + s.substring(i);
        i -= 3;
      }
      return sign + s;
    };
    
    function formatDecimal(number, digits, forceShowSign) {
      if (number === undefined || isNaN(number)) {
        return baseLocalizer.localize('formatting.unknown');
      }
      var value = number.toFixed(digits);
      if (forceShowSign && number >= 0) { // .5 * Math.pow(10, -digits)) {
        value = '+' + value;
      }
      return value;
    }
    
    function formatRemainingTime(millis, complete, maxResolution) {
      maxResolution = maxResolution || 4;
      if (millis == Number.POSITIVE_INFINITY) {
        return '&infin;';
      }
      var seconds = Math.ceil(millis / Constants.Time.MILLIS_PER_SECOND);
      if (seconds <= 0) {
        return complete || baseLocalizer.localize('timeunits','complete');
      }
      
      var parts = [];
      if (maxResolution >= 1) {
        parts.push({value: Math.floor((seconds / 60 / 60 / 24)), label: 'day'});
      }
      if (maxResolution >= 2) {
        parts.push({value: Math.floor((seconds / 60/ 60) % 24), label: 'hour' });
      }
      if (maxResolution >= 3) {
        parts.push({value: Math.floor((seconds / 60) % 60), label: 'minute' });
      }
      if (maxResolution >= 4) {
        parts.push({value: Math.floor((seconds) % 60), label: 'second' });
      }
      
      while (parts[0] && !parts[0].value) {
        parts.shift();
      }
      parts.splice(2);
      return $.map(parts, function(part) {
        return '%s%s'.format(part.value, 
                             baseLocalizer.localize('timeunits','short',part.label));
      }).join(' ');
    }
    
    function padLeft(s, length, char) {
      while (s.length < length) {
        s = char + s;
      }
      return s;
    }
    
    function formatAbsoluteTime(date) {
      var now = new Date();
      
      var dateDay = Math.floor(date.valueOf() / Constants.Time.MILLIS_PER_DAY - 
                               date.getTimezoneOffset() / Constants.Time.MINUTES_PER_DAY);
      var nowDay = Math.floor(now.valueOf() / Constants.Time.MILLIS_PER_DAY -
                              now.getTimezoneOffset() / Constants.Time.MINUTES_PER_DAY);
      
      var dayString = '';
      if (dateDay == nowDay + 1) {
        dayString = baseLocalizer.localize('timeunits','tomorrow');
      } else if (dateDay == nowDay - 1) {
        dayString = baseLocalizer.localize('timeunits','yesterday');
      } else if (dateDay == nowDay) {
        dayString = baseLocalizer.localize('timeunits','today');
      } else {
        dayString = date.toLocaleDateString();
      }
      
      var timeString = '';
      if (baseLocalizer.localize('formatting', 'hourFormatAMPM')) {
        var m = '';
        if (date.getHours() == 0) {
          timeString = '12';
          m = baseLocalizer.localize('timeunits','am');
        } else if (date.getHours() == 12) {
          timeString = '12';
          m = baseLocalizer.localize('timeunits','pm');
        } else if (date.getHours() > 12) {
          timeString = (date.getHours() - 12).toString();
          m = baseLocalizer.localize('timeunits','pm');
        } else {
          timeString = date.getHours().toString();
          m = baseLocalizer.localize('timeunits','am');
        }
        timeString = timeString + ':' + 
                     padLeft(date.getMinutes().toString(), 2, 0) + ' ' + m;
      } else {
        timeString = date.getHours().toString() + ':' + 

                     padLeft(date.getMinutes().toString(), 2, '0');
      }
      
      return dayString + ' ' + timeString;
    }
    
    return {
      Localizer: Localizer,
      localizer: baseLocalizer,
      formatInteger: formatInteger,
      formatDecimal: formatDecimal,
      formatRemainingTime: formatRemainingTime,
      formatAbsoluteTime: formatAbsoluteTime,
    };
  }();
  
  var View = function() {
    function getDomain() {
      return document.domain;
    }
    
    function getCurrentCityId() {
      var relatedCityData = unsafeWindow.ikariam.model.relatedCityData;
      return relatedCityData[relatedCityData.selectedCity].id;
    }
    function getCurrentCity() {
      return EmpireData.getCity(getCurrentCityId());
    }
    function isActiveCity(city) {
      return city.getId() == getCurrentCityId();
    }
    
    function getCurrentIslandId() {
      // This is available in javascript data in island and city views (unfortunately at 
      // different locations).  It does not appear to be anywhere in world view data.
      return parseInt($("#js_islandBread").attr("href").match(/islandId=(\d+)/)[1]); 
    };
    
    function getViewType() {
      return unsafeWindow.ikariam.backgroundView.id;
    }
    function viewIsIsland() {
      return getViewType() == 'island';
    }
    function viewIsCity() {
      return getViewType() == 'city';
    }
  
    function getIkariamBaseViewParams() {
      var mainboxX = unsafeWindow.ikariam.mainbox_x;
      var mainboxY = unsafeWindow.ikariam.mainbox_y;
      var mainboxZ = unsafeWindow.ikariam.mainbox_z;
      
      if (mainboxX || mainboxY || mainboxZ) {
        return {
          mainbox_x: mainboxX,
          mainbox_y: mainboxY,
          mainbox_z: mainboxZ,
        };
      }
      return {};
    }
    
    function makeFullIkariamUrl(params, anchor) {
      return 'http://' + getDomain() + '/index.php?' +
             $.map(params, function(value, key) { 
                 return encodeURIComponent(key) + '=' + 
                        encodeURIComponent(value);
             }).join('&') + 
             (anchor ? '#' + anchor : '');
    }
    
    function makeLocalIkariamUrl(params) {
      return '?' + $.map(params, function(value, key) { return key + '=' + value; }).join('&');
    }
    
    function loadLocalIkariamUrl(url) {
      Logging.debug("loadLocalIkariamUrl: ", url);
      
      // This is an odd way to make the ajaxHandlerCall rather than just calling it directly.
      // It is done this way so that in Chrome the actions run when the response is recieved 
      // are run in the page's javascript context instead of the javascript context of the 
      // TamperMonkey extension.  This is necessary to properly evaluate script actions in 
      // returned ikariam pages or stuff like transport sliders simply will not work.
      document.location = 'javascript:ajaxHandlerCall(' + JSON.stringify(url) + '); void(0);';
    }
    
    function goToIkariamPage(city, mainView, mainParams, view, viewParams, anchor) {
      var changeParams = {
        // Whacked up logic I don't really understand that makes transitioning to 
        // island mine/mill pages work.  Yes, it's completely incomprehensible how Ikariam 
        // developers could screw this up, but somehow they can make the mill go to the mine 
        // if you say the old view is island when you want to go to an island page.  
        // Truly incredible!
        oldView: mainView == 'island' ? getViewType() : mainView,
        action: 'header',
        function: 'changeCurrentCity',
        cityId: city.getId(),
        actionRequest: unsafeWindow.ikariam.model.actionRequest,
      };
      
      $.extend(changeParams, getIkariamBaseViewParams(), mainParams);
      
      if (view) {
        $.extend(changeParams, viewParams);
        changeParams.templateView = view;
      }
      
      $.extend(changeParams, { backgroundView: mainView } );
      
      if (mainView == 'island' && view && !anchor) {
        // Stupid ikariam developers still include the city preselect when we ask for a 
        // specific view.  Which will overwrite whatever view (mine/mill/wonder) we 
        // actually want to see.  Set this hack to suppress that transition when the page 
        // loads.
        anchor = 'ikaScriptToolsSuppressCityPreselect';
      }
      
      if (getViewType() == mainView) {
        loadLocalIkariamUrl(makeLocalIkariamUrl(changeParams));
        return;
      }
      
      var url = makeFullIkariamUrl(changeParams, anchor);
      Logging.debug('goToIkariamPage: ', url);
      window.location.assign(url);
    }
    
    function goToLocalView(view, params) {
      loadLocalIkariamUrl(makeLocalIkariamUrl($.extend({view: view}, params)));
    }
    
    function goToCitysIslandView(city, view, params) {
      if (isActiveCity(city) && viewIsIsland() && 
          getCurrentIslandId() == city.getIslandId()) {
        if (view) {
          loadLocalIkariamUrl(makeLocalIkariamUrl($.extend({view: view}, params)));
        }
      } else if (viewIsIsland()) {
        goToIkariamPage(city, 'island', null, view, params);
      } else {
        goToIkariamPage(city, 'island', null, null, null, 
           makeIkariamLoadLocalPageAnchor($.extend({view: view}, params)));
      }
    }
    
    function goToIslandView(city, islandId, view, params) {
      if (isActiveCity(city) && viewIsIsland() &&
          getCurrentIslandId() == islandId) {
        if (view) {
          loadLocalIkariamUrl(makeLocalIkariamUrl($.extend({view: view}, params)));
        }
      } else {
        goToIkariamPage(city, 'island', { currentIslandId: islandId }, view, params);
      }
    }

    function goToIkariamFullPage(params, anchor) {
      url = makeFullIkariamUrl(params, anchor);
      Logging.debug('goToIkariamFullPage: ', url);
      window.location.replace(url);
    }

    function makeIkariamLoadLocalPageAnchor(params, doNotSuppressFirstCityInfo) {
      if (doNotSuppressFirstCityInfo) {
        return 'ikaScriptToolsLoadLocalIkariamUrl_DoNotSuppressFirstCityInfo=' + 
            encodeURIComponent(makeLocalIkariamUrl(params));
      } else {
        return 'ikaScriptToolsLoadLocalIkariamUrl=' + 
            encodeURIComponent(makeLocalIkariamUrl(params));
      }
    }
    
    function goToCityView(city, view, params) {      
      if (isActiveCity(city) && viewIsCity()) {
        if (view) {
          loadLocalIkariamUrl(makeLocalIkariamUrl($.extend({view: view}, params)));
        }
      } else {
        goToIkariamPage(city, 'city', null, view, params);
      }
    }

    function activateCity(city) {
      if (!isActiveCity(city)) {
        goToIkariamPage(city, getViewType());
      }
    }
    
    var suppressingChangeView = false;
    var superSuppressChangeView = Utils.resettable(Utils.fixedFunction(false));
    
    var initialPageAjaxResponse = Utils.thunk(function findInitialPageAjaxResponse() {
      var regex = /ikariam.getClass\(ajax.Responder, (.*)\);/;
      var response = [];
      $('script').each(function findInitialPageAjaxResponse(index, script) {
        var match = regex.exec(script.innerHTML);
        if (match) {
          response = JSON.parse(match[1]);
        }
      });
      return response;
    });
    
    unsafeWindow.ajax.Responder.changeView = function(changeView) {
      return Logging.debuggable(
          'IkaTools.View.changeViewReplacement', 
          function customChangeView(params) {          
            if (suppressingChangeView && suppressingChangeView == params[0]) {
              Logging.debug("Suppressing change to view: ", params[0]);
            } else if (superSuppressChangeView() == params[0]) {
              superSuppressChangeView.reset();
              Logging.debug("Super suppressing change to view", params[0]);
            } else {
              changeView.apply(this, arguments);
            }
          });
    }(unsafeWindow.ajax.Responder.changeView);
    
    var ajaxResponseEvent = new Utils.EventDispatcher();
    
    function registerIkariamAjaxResponseCallback(f, fireInitialPageView) {
      var canceller = ajaxResponseEvent.addListener(f);
      if (fireInitialPageView) {
        f(initialPageAjaxResponse());
      }
      return canceller;
    }
    
    var suppressNextAjaxChangeView = Utils.resettable(Utils.fixedFunction(null));
    
    function suppressChangeViewOfNextAjaxResponse(type) {
      suppressNextAjaxChangeView.set(type);
    }
    
    function suppressFirstChangeViewOfType(type) {
      superSuppressChangeView.set(type);
    }
    
    var nextAjaxResponseEvent = 
        Utils.resettable(function() { return new Utils.EventDispatcher(); });
        
    function registerNextIkariamAjaxRequestCallback(f) {

      return nextAjaxResponseEvent().addListener(f);
    }
    
    function replaceExecuteAjaxRequest(executeAjaxRequest) {      
      return function customExecuteAjaxRequest() {
        var ajaxEvent = nextAjaxResponseEvent.reset();
        var suppressChangeView = suppressNextAjaxChangeView.reset();
        
        var args = $.makeArray(arguments);
        args.push(undefined);
        
        if (!args[1]) {
          args[1] = function customAjaxCallback(responseText) {
            suppressingChangeView = suppressChangeView;
            var responder = unsafeWindow.ikariam.getClass(
                unsafeWindow.ajax.Responder, responseText);
            unsafeWindow.ikariam.controller.ajaxResponder = responder;
            suppressingChangeView = null;
            
            ajaxResponseEvent.send(responder.responseArray);
            ajaxEvent.send(responder.responseArray);
          }
          args[1].isScriptInterceptor = true;
        } else if (args[1].isScriptInterceptor) {
          // Allows multiple instances of this script to work
          var func = args[1];
          args[1] = function customAjaxCallbackWrapper() {
            suppressingChangeView = suppressChangeView;
            func.apply(this, arguments);
            suppressingChangeView = null;
            
            var responseArray = unsafeWindow.ikariam.controller.ajaxResponder.responseArray;
            ajaxResponseEvent.send(responseArray);
            ajaxEvent.send(responseArray);
          }
        }
        var ret = executeAjaxRequest.apply(this, args);
      };
    }
    
    if (unsafeWindow.ikariam.controller) {
      unsafeWindow.ikariam.controller.executeAjaxRequest = 
          replaceExecuteAjaxRequest(unsafeWindow.ikariam.controller.executeAjaxRequest);
    } else {
      unsafeWindow.ikariam.Controller.executeAjaxRequest = 
          replaceExecuteAjaxRequest(unsafeWindow.ikariam.Controller.executeAjaxRequest);
    }
    
    var ajaxFormEvent = new Utils.EventDispatcher();
    
    unsafeWindow.ajaxHandlerCallFromForm = function(ajaxHandlerCallFromForm) {
      return function customerAjaxHandlerCallFromForm(form) {
        ajaxFormEvent.send(form);
        return ajaxHandlerCallFromForm.apply(this, arguments);
      };
    }(unsafeWindow.ajaxHandlerCallFromForm);
    
    function registerAjaxFormSubmitCallback(f) {
      return ajaxFormEvent.addListener(f);
    }
    
    var gameTimeDifference = 0;
    
    function setGameTimeDifference(value) {
      Logging.debug("Game time difference: ", value);
      gameTimeDifference = value;
    }
        
    function getGameTimeDifference() {
      return gameTimeDifference;
    }
    
    function gameTimeNow() {
      return new Date().getTime() - gameTimeDifference;
    }

    return {
      getDomain: getDomain,
      
      getCurrentCityId: getCurrentCityId,
      getCurrentCity: getCurrentCity,
      isActiveCity: isActiveCity,
      
      getCurrentIslandId: getCurrentIslandId,
      
      getViewType: getViewType,
      viewIsIsland: viewIsIsland,
      viewIsCity: viewIsCity,

      goToCitysIslandView: goToCitysIslandView,
      goToCityView: goToCityView,
      goToIslandView: goToIslandView,
      goToLocalView: goToLocalView,
      activateCity: activateCity,
      goToIkariamFullPage: goToIkariamFullPage,
      makeIkariamLoadLocalPageAnchor: makeIkariamLoadLocalPageAnchor,
      
      //registerViewChangedListener: registerViewChangedListener,
      suppressChangeViewOfNextAjaxResponse: suppressChangeViewOfNextAjaxResponse,
      suppressFirstChangeViewOfType: suppressFirstChangeViewOfType,
      registerNextIkariamAjaxRequestCallback: registerNextIkariamAjaxRequestCallback,
      registerIkariamAjaxResponseCallback: registerIkariamAjaxResponseCallback,
      registerAjaxFormSubmitCallback: registerAjaxFormSubmitCallback,
      
      loadLocalIkariamUrl: loadLocalIkariamUrl,
      
      setGameTimeDifference: setGameTimeDifference,
      getGameTimeDifference: getGameTimeDifference,
      gameTimeNow: gameTimeNow,
    };
  }();

  /**
   * Data value class for encapsulating GM_getValue/GM_setValue access and 
   * serialization/deserialization.

   */
  var Data = function() {
    function Value(key, defaultValue, options) {
      this.options = $.extend({ useDomain: true, loadCallback: function() {} }, options);
      if (this.options.useDomain) {
        this.key = View.getDomain() + "/" + key + "/" + 
            (options.version || ikaToolsVersion) + '-' + ikaToolsVersion;
      } else {
        this.key = key + "/" + ikaToolsVersion;
      }
      this.defaultValue = defaultValue;
      this.data = defaultValue;
      this.needsSave = false;
    }
    
    $.extend(Value.prototype, {
      load: function load() {
        var rawValue = GM_getValue(this.key, "null");
        if (rawValue !== undefined) {
          var data = JSON.parse(rawValue, this.options.reviver);
          Logging.debug('Loaded data "%s": %s -> %o', this.key, rawValue, data);
          if (data !== null) {
            this.data = data;
          }
        } else {
        }
        this.loaded = true;
        this.options.loadCallback(this.data);
        return this.data;
      },
      save: function save() {
        return this.doSave(true);
      },
      doSave: function doSave(force) {
        if (this.needsSave || force) {
          var value = JSON.stringify(this.data, this.options.stringifier);
          Logging.debug('Saved data "%s": %o -> %s', this.key, this.data, value);
          GM_setValue(this.key, value);
          this.needsSave = false;
        }
        return this.data;
      },
      saveAsync: function saveAsync() {
        this.needsSave = true;
        setTimeout(Logging.debuggable('IkaTools.Data.Value[' + this.key + ']', 
                                      this.doSave.bind(this, false)), 0);
      },
      get: function get() {
        if (!this.loaded) {
          var value = this.load();
          return value;
        }
        return this.data;
      },
      set: function set(data) {
        this.data = data;
        return data;
      },
      reset: function reset() {
        this.set(this.defaultValue);
        this.save();
      },
    });
    
    return {
      Value: Value,
    };
  }();
  
  var UI = function() {
    function ToolTipHandler(toolTipClass, toolTipContainer, options) {
      this.toolTips = {};
      this.options = $.extend({
        delay: 200,
        activeClass: 'active',
        offsetX: 0,
        offsetY: 20,
        toolTipClass: toolTipClass,
        toolTipContainer: toolTipContainer || $('<div/>'),
      }, options);
      this.toolTipContainer = 
          $('<div style="position: absolute; z-index: 100000; display:none;"/>');
      this.toolTipContainer.append(this.options.toolTipContainer);
            
      this.activeToolTipElement = null;
      this.pendingShowEvent = null;
      this.activeToolTip = null;
      
      var body = $('body');
      body.append(this.toolTipContainer);
    }
    
    $.extend(ToolTipHandler.prototype, {
      _getCurrentToolTip: function _getCurrentToolTip() {
        if (this.activeToolTipElement) {
          var id = this.activeToolTipElement.id;
          if (id) { 
            return this.toolTips[id];
          }
        }
      },
      _reset: function _reset() {
        clearTimeout(this.pendingShowEvent);
        this.toolTipContainer.hide();
        
        var toolTipInfo = this._getCurrentToolTip();
        if (this.activeToolTip && this.activeToolTip.deactivated) {
          this.activeToolTip.deactivated($(this.activeToolTipElement));
        }
        this.activeToolTip = null;
        
        this.options.toolTipContainer.empty();
        this.activeToolTipElement = null;
      },
      _showToolTip: function _showToolTip() {
        var toolTipInfo = this._getCurrentToolTip();
        if (toolTipInfo) {
          this.activeToolTip = toolTipInfo.contentCreator($(this.activeToolTipElement));
          this.options.toolTipContainer.append(this.activeToolTip);
          this.toolTipContainer.show();
        }
      },
      _mouseOver: function _mouseOver(e) {
        var toolTipElement = $(e.target).closest('.' + this.options.toolTipClass);
        if (toolTipElement.get(0) == this.activeToolTipElement) {
          return;
        }
        
        this._reset();

        if (toolTipElement.length > 0) {
          this.activeToolTipElement = toolTipElement[0];
          this.toolTipContainer.css({
            left: (e.pageX + this.options.offsetX) + 'px', 
            top: (e.pageY + this.options.offsetY) + 'px',
          });

          this.pendingShowEvent = setTimeout(IkaTools.Logging.debuggable(
             'IkaTools.UI.ToolTipHandler.showToolTip[' + this.options.toolTipClass + ']',
             this._showToolTip.bind(this)), this.options.delay);
        }
      },
      _mouseOut: function _mouseOut(e) {
        if (this.activeToolTipElement) {
          var target = $(e.relatedTarget).closest('.' + this.options.toolTipClass);
          if (target.get(0) != this.activeToolTipElement) {
            this._reset();
            return;
          }
        }
      },
      _mouseMove: function _mouseMove(e) {
        if (this.activeToolTipElement && !this.activeToolTip) {
          this.toolTipContainer.css({
            left: (e.pageX + this.options.offsetX)+ 'px', 
            top: (e.pageY + this.options.offsetY) + 'px',
          });
        }
      },
       
      register: function registerToolTip(id, contentCreator) {
        this.toolTips[id] = {
          contentCreator: contentCreator,
        };
      },
      
      registerSimple: function registerSimpleToolTip(id, content) {
        this.register(id, function() {
          return $(content);
        });
      },
      
      registerRefreshable: function registerRefreshableToolTip(id, contentGenerator) {
        var toolTip = this;
        
        this.register(id, function() {
          var id =  Utils.nextId();
          var interval = setInterval(Logging.debuggable('IkaTools.ToolTip.refresh[' + id + ']', 
            function refreshToolTip() {
              toolTip.options.toolTipContainer.html(contentGenerator());
            }), Constants.Time.MILLIS_PER_SECOND);
            
          var tip = $(contentGenerator());
          tip.deactivated = function() {
            clearInterval(interval);
          };
          return tip;
        });
      },
      
      deregister: function deregister(id) {
        delete this.toolTips[id];
      },
      
      startHandling: function startHandling(element) {
        element.on('mouseover'/*, '.' + this.options.toolTipClass*/, Logging.debuggable(
            'IkaTools.UI.ToolTipHandler.mouseOver[' + this.options.toolTipClass + ']', 
            this._mouseOver.bind(this)));
        element.on('mouseout'/*, '.' + this.options.toolTipClass*/, Logging.debuggable(
            'IkaTools.UI.ToolTipHandler.mouseOut[' + this.options.toolTipClass + ']', 
            this._mouseOut.bind(this)))
        element.on('mousemove', '.' + this.options.toolTipClass, Logging.debuggable(
            'IkaTools.UI.ToolTipHandler.mouseMove[' + this.options.toolTipClass + ']', 
            this._mouseMove.bind(this)))
      }
    });
    
    function LeftMenu(items, options) {
      this.items = items;
      this.active = false;
      this.options = $.extend({atTop: false }, options);
    }
      
    $.extend(LeftMenu.prototype, {
      ITEM_CONTRACTED_WIDTH: 53,
      ITEM_EXPANDED_WIDTH: 199,
      ITEM_Z_INDEX_EXPANDED: 120000,
      ITEM_Z_INDEX_CONTRACTED: 65,
      ANIMATION_DURATION: 300,
      
      display: function display() {
        // Add leftMenu div and "standard" contents if we are in a 
        // view where it is not already present
        var leftMenuDiv = $('#leftMenu');
        if (!leftMenuDiv.length) {
          leftMenuDiv = $('<div id="leftMenu" >' + 
                            '<div class="slot_menu city_menu" style="z-index: 65; ">' + 
                              '<ul class="menu_slots"/>' +
                            '</div>' + 
                          '</div>');
          $('#container').append(leftMenuDiv);
        }
        
        // Setup event handlers
        for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          item.element.width(this.ITEM_COLLAPSED_WIDTH + 'px');
          item.element.mouseenter(this.expand.bind(this, item));
          item.element.mouseleave(this.contract.bind(this, item));
        }
        
        this.holderDiv = $('.slot_menu', leftMenuDiv);
        this.holderDiv.hover(this.menuActivated.bind(this),
                             this.menuPassivated.bind(this));
       
        // Add elements to ui
        var menuSlots = $('ul.menu_slots', leftMenuDiv);
        if (this.options.atTop) {
          for (var i = this.items.length - 1; i >= 0; i--) {
            menuSlots.prepend(this.items[i].element);
          }
        } else {
          for (var i = 0; i < this.items.length; i++) {
            menuSlots.append(this.items[i].element);
          }
        }
      },
      menuActivated: function menuActivated() {
        this.active = true;
        this.holderDiv.css('z-index', this.ITEM_Z_INDEX_EXPANDED);
      },
      menuPassivated: function menuPassivated() {
        this.active = false;
      },
      contract: function contract(item) {
        var holder = item.element.parent().parent();
        item.element.animate(
          { width: this.ITEM_CONTRACTED_WIDTH },
          300,
          'swing',
          this.contractComplete.bind(this)
        );
      },
      contractComplete: function contractComplete() {
        if (!this.active) {
          this.holderDiv.css('z-index', this.ITEM_Z_INDEX_CONTRACTED);
        }
      },
      expand: function expand(item) {
        item.element.animate(
          { width: this.ITEM_EXPANDED_WIDTH },
          300,
          'swing');
        this.holderDiv.css('z-index', this.ITEM_Z_INDEX_EXPANDED);

      },
    });
    
    LeftMenu.Item = function LeftMenu_Item(element) {
      this.element = element;
    }
    
    function resizePopup() {
      unsafeWindow.ikariam.controller.adjustSizes();
    }
    
    var destroyedTemplateViewEvent = Utils.thunk(function() {
      var dispatcher = new Utils.EventDispatcher();
      var oldDestroyTemplateView = unsafeWindow.ikariam.TemplateView.destroyTemplateView;
      unsafeWindow.ikariam.TemplateView.destroyTemplateView = 
          function customDestroyTemplateView() {
            oldDestroyTemplateView.apply(this, arguments);
            dispatcher.send();
          };
      return dispatcher;
    });
    
    function PopupWindow(id, header, content, options) {
      this.id = id;
      this.headerElement = $(header);
      this.contentElement = $(content);
      this.options = $.extend({
        sidebars: [], 
        oversized: false,
        activatedCallback: function() {},
        deactivatedCallback: function() {},
      }, options);
      this.isActive = false;
      
      destroyedTemplateViewEvent().addListener(this._popupDestroyed.bind(this));
    }

    $.extend(PopupWindow.prototype, {
      _popupDestroyed: function _popupDestroyed() {
        if (this.isActive) {
          this.options.deactivatedCallback(this);
        }
        this.isActive = false;
      },
      display: function display(skipResize) {
        // Always display it.  There's no good way to track if it is 
        // already displayed because there is no callback when it is destroyed.
        // (One can replace unsafeWindow.ikariam.destroyTemplateView, but there 
        // are still some issues with quickly switching between views that can 
        // mess things up and will still be considered "active" when its not visible.
        templateViewArg = {
          boxId: this.id,
          headerElem: this.headerElement.html(),
          contentElem: '<div><div id="ikaPopupTempHolder"></div></div>',
          sidebarEls: this.options.sidebars,
          oversized: this.options.oversized,
          replaceBox: true,
          keepSidebars: false
        };
        this.isActive = true;
        this.activePopup = unsafeWindow.ikariam.createTemplateView(templateViewArg);
        // Null out the id or submitting the change city form will send it as the 
        // templateView
        unsafeWindow.ikariam.templateView.id = null;
        unsafeWindow.ikariam.model.viewParams = null;
        $('#ikaPopupTempHolder').replaceWith(this.contentElement);

        this.options.activatedCallback(this);
        
        if (skipResize) {
          unsafeWindow.ikariam.controller.adjustSizes();
        }
      },
      close: function close() {
        if (this.isActive) {
          unsafeWindow.ikariam.TemplateView.destroyTemplateView();
        }
      }
    });
    
    function TabPane(tabs, options) {
      this.tabs = tabs;
      this.options = $.extend({ tabActivatedCallback: function() {} }, options);
        
      this.currentTab = null;

      this.container = $("<div/>");

      var tabsContainer = $('<ul class="tabmenu"/>');
      this.container.append(tabsContainer);

      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        tab.tabPane = this;

        tabsContainer.append(tab.tabHolder)
        this.container.append(tab.contentHolder);
        tab.contentHolder.hide();
        tab.tabHolder.click(
          IkaTools.Logging.debuggable('IkaTools.TabPane.Tab.click', 
              this.activate.bind(this, tab)));
      }
    }
    
    $.extend(TabPane.prototype, {
      getContainer: function getContainer() {
        return this.container;
      },
      activate: function activate(tab) {
        if (this.currentTab !== tab) {

          if (this.currentTab) {
            this.currentTab.contentHolder.hide();
            this.currentTab.tabHolder.removeClass('selected');
            this.currentTab.deactivated();
          }

          tab.contentHolder.show();
          tab.tabHolder.addClass('selected');
        }
        tab.activated();
        this.options.tabActivatedCallback(this.currentTab, tab);
        this.currentTab = tab;
      }
    });
      
    TabPane.Tab = function Tab(tab, content, options) {
      this.tab = $(tab);
      this.content = $(content);
      this.options = $.extend({ activatedCallback: function() {}, 
                                deactivatedCallback: function() {} },
                              options);

      this.contentHolder = $('<div/>');
      this.contentHolder.append(this.content);

      this.tabHolder = $('<li class="tab"/>');
      this.tabHolder.append(this.tab);
    }
    
    $.extend(TabPane.Tab.prototype, {
      activate: function activate() {
        this.tabPane.activate(this);
      },
      activated: function activated() {
        this.options.activatedCallback(this);
      },
      deactivated: function deactivated() {
        this.options.deactivatedCallback(this);
      },
    });
    
    function SettingsWindow(id, scriptName, settings, settingGroups) {
      this.id = id;
      this.settings = settings;
      this.scriptName = scriptName;
      this.settingGroups = settingGroups;
      this.saveEvent = new Utils.EventDispatcher();
    }

    $.extend(SettingsWindow.prototype, {
      show: function show() {
        var tabs = $.map(this.settingGroups, function makeTab(group, index) {
          var content = $.map(group.getSettings(), this.renderSetting.bind(this)).join('');
          content = '<div class="contentBox01h">' +
                      '<h3 class="header">' + 
                        Intl.localizer.localize('settings','settings') + 
                      '</h3>' +
                      '<div class="content">' + 
                        '<table class="table01"><tbody>' + content + '</tbody></table>' + 
                      '</div>' +
                      '<div class="footer"/>' +
                    '</div>' +
                    '<div class="centerButton">' + 
                      '<a class="ikaScriptToolsSaveOptions button">' + 
                        Intl.localizer.localize('settings','save') +
                      '</a>' + 
                    '</div>';
          return new TabPane.Tab('<b>' + group.getName() + '</b>', content, {});
        }.bind(this));
        var tabPane = new TabPane(tabs,  {
          tabActivatedCallback: function() {
            IkaTools.UI.resizePopup();
          },
        });
        var popup = new PopupWindow(
            'options',
            $('<div>' + Intl.localizer.localize('settings','script_settings') + ': ' + 
                this.scriptName + '</div>'),
            tabPane.getContainer());
        tabs[0].activate();
        popup.display();
        $.each(this.settingGroups, function postRenderSettingsGroup(index, group) {
          $.each(group.getSettings(), this.postRenderSetting.bind(this));
        }.bind(this));
        $('.ikaScriptToolsSaveOptions').click(Logging.debuggable(
            'IkaTools.UI.SettingsWindow.saveSettings',
            this._save.bind(this)));
      },
      renderSetting: function renderSetting(setting, index) {
        var type = setting.getType();
        var html = '<tr><td>' + setting.getLabel()() + '</td><td class="left">';
        if (type == Settings.Type.BOOLEAN) {
          html += '<input id="ikaScriptToolsSettingInput_' + setting.getName() + 
              '" type="checkbox" ' + (setting.isEnabled() ? 'checked' : '' ) + '/>';
        } else if (type == Settings.Type.CHOICE) {
          html += '<select id="ikaScriptToolsSettingInput_' + setting.getName() + '">';
          $.each(setting.getChoices(), function renderOption(key, value) {
            html += '<option value="' + value + '"' + 
                    (setting.getValue() == value ? 'selected="selected"' : '') + '>' + key + '</option>';
          })
          html += '</select>';
        } else if (type == Settings.Type.HTML) {
          html += setting.getHtml()();
        } else if (type == Settings.Type.TEXT) {
          html += '<input id="ikaScriptToolsSettingInput_' + setting.getName() 
              + '" value="' + setting.getValue() + '"/>';
        }
        html += '</td>';
        return html;
      },
      postRenderSetting: function postRenderSetting(index, setting) {
        var type = setting.getType();
        if (type == Settings.Type.HTML) {

          setting.getPostRender()();
        }
      },
      _save: function save() {
        $.each(this.settingGroups, function saveGroup(index, group) {
          $.each(group.getSettings(), this._saveSetting.bind(this));
        }.bind(this));
        this.settings.save();
        this.saveEvent.send(this);
      },
      _saveSetting: function saveSetting(index, setting) {
        var type = setting.getType();
        if (type == Settings.Type.BOOLEAN) {
          setting.setEnabled(
              $('#ikaScriptToolsSettingInput_' + setting.getName()).is(':checked'));
        } else if (type == Settings.Type.CHOICE) {
          setting.setValue(
              $('#ikaScriptToolsSettingInput_' + setting.getName()).val());
        } else if (type == Settings.Type.TEXT) {
          setting.setValue(
              $('#ikaScriptToolsSettingInput_' + setting.getName()).val());
        }
      },
      registerSavedSettingsHandler: function registerSavedSettingsHandler(f) {
        return this.saveEvent.addListener(f);
      },
      addAsScriptOptionsLink: function addAsScriptOptionsLink() {
        if($('#IkaScriptToolSettingsDropdown').size() == 0) {
          GM_addStyle(
            '#IkaScriptToolSettingsDropdown { ' +
            '  position:absolute; ' +
            '}' +
            '#IkaScriptToolSettingsDropdown:hover {' +
            '  padding-bottom:20px;' +
            '}' +
            '#IkaScriptToolSettingsDropdown #IkaScriptToolsSettingsDropdownLinks { ' +
            '  display:none;' +
            '}' +
            '#IkaScriptToolSettingsDropdown:hover #IkaScriptToolsSettingsDropdownLinks {' +
            '  display:block;' +
            '}' +
            '#IkaScriptToolsSettingsDropdownLinks { ' +
            '  background-color:#FFF5E1; ' +
            '  padding:.5em; ' +
            '  padding-bottom:0; ' +
            '  border:1px solid #666; ' +
            '  position:absolute; ' +
            '  right:-80px; ' +
            '  margin-top:2px; ' +
            '  width:170px;' +
            '}' +
            '#IkaScriptToolsSettingsDropdownLinks a { ' +
            '  color:#666; ' +
            '  cursor:pointer; ' +
            '  margin-left:0; ' +
            '  padding-left:.2em; ' +
            '  display:block; ' +
            '  margin-bottom:.5em;' +
            '}'
          );
          
          var li = document.createElement('li');
          li.id = 'IkaOptionsDropdown';
          $('#GF_toolbar ul').append($(
              '<li id="IkaScriptToolSettingsDropdown">' + 
                '<a href="javascript:void(0);">' + 
                    Intl.localizer.localize('settings','script_settings') + '</a>' + 
                '<div id="IkaScriptToolsSettingsDropdownLinks">' +
              '</li>'));
        }
        var link = $('<a>' + this.scriptName + '</a>');
        link.click(Logging.debuggable('IkaTools.UI.SettingsWindow.showSettings', 
            this.show.bind(this)));
        $('#IkaScriptToolsSettingsDropdownLinks').append(link);
      },
    });
    
    SettingsWindow.Group = function(name, settings) {
      this.name = name;
      this.settings = settings;
    }
    
    $.extend(SettingsWindow.Group.prototype, {
      getName: function getName() {
        return this.name;
      },
      getSettings: function getSettings() {
        return this.settings;
      },
    });
    
    return {
      ToolTipHandler: ToolTipHandler,
      LeftMenu: LeftMenu,
      resizePopup: resizePopup,
      PopupWindow: PopupWindow,
      TabPane: TabPane,
      SettingsWindow: SettingsWindow,
    };
  }();
  
  var Settings = function() {
    var Type = {
      BOOLEAN: 1,
      CHOICE: 2,
      HTML: 3,
      TEXT: 4,
    }
    
    function Settings(name) {
      this.name = name;
      this.data = new Data.Value('scriptOptions_' + name, { }, { version: 1 });
    }
    
    $.extend(Settings.prototype, {
      _getValue: function getValue(name, defaultValue) {
        var value = this.data.get()[name];
        return value === undefined ? defaultValue : value;
      },
      _setValue: function setValue(name, value) {
        this.data.get()[name] = value;
      },
      save: function save() {
        this.data.save();
      },
      
      boolean: function boolean(name, enabled, labelFunc) {
        return new Boolean(this, name, this._getValue(name, enabled), labelFunc);
      },
      
      choice: function choice(name, value, choices, labelFunc) {
        return new Choice(this, name, this._getValue(name, value), choices, labelFunc);
      },
      
      html: function html(htmlFunc, postRender, labelFunc) {
        return new Html(htmlFunc, postRender, labelFunc);
      }, 

      text: function text(name, value, labelFunc) {
        return new Text(this, name, this._getValue(name, value), labelFunc);
      }
    });
    
    function Boolean(settings, name, enabled, labelFunc) {
      this.settings = settings;
      this.name = name;
      this.enabled = enabled;
      this.labelFunc= labelFunc;
    }
    
    $.extend(Boolean.prototype, {
      isEnabled: function isEnabled() {
        return this.enabled;
      },
      setEnabled: function(enabled) {
        this.enabled = enabled;
        this.settings._setValue(this.name, enabled);
      },
      getName: function getName() {
        return this.name;
      },
      getType: function getType() {
        return Type.BOOLEAN;
      },
      getLabel: function getLabel() {
        return this.labelFunc;
      },
    });
    
    function Choice(settings, name, value, choices, labelFunc) {
      this.settings = settings;
      this.name = name;
      this.value = value;
      this.choices = choices;
      this.labelFunc = labelFunc;
    }
    
    $.extend(Choice.prototype, {
      getValue: function getValue() {
        return this.value;
      },
      setValue: function setValue(value) {
        this.value = value;
        this.settings._setValue(this.name, value);
      },
      getChoices: function getChoices() {
        return this.choices;
      },
      getName: function getName() {
        return this.name;
      },
      getType: function getType() {
        return Type.CHOICE;
      },
      getLabel: function getLabel() {
        return this.labelFunc;
      },
    });
    
    function Html(htmlFunc, postRender, labelFunc) {
      this.labelFunc = labelFunc;
      this.htmlFunc = htmlFunc;
      this.postRender = postRender;
    }
    
    $.extend(Html.prototype, {
      getHtml: function getHtml() { 
        return this.htmlFunc;
      },
      getPostRender: function getPostRender() {
        return this.postRender;
      },
      getType: function getType() {
        return Type.HTML;
      },
      getLabel: function getLabel() {
        return this.labelFunc;
      },
    });

    function Text(settings, name, value, labelFunc) {
      this.settings = settings;
      this.name = name;
      this.value = value;
      this.labelFunc = labelFunc;
    }

    $.extend(Text.prototype, {
      getValue: function getValue() {
        return this.value;
      },
      setValue: function setValue(value) {
        this.value = value;
        this.settings._setValue(this.name, value);
      },
      getName: function getName() {
        return this.name;
      },
      getType: function getType() {
        return Type.TEXT;
      },
      getLabel: function getLabel() {
        return this.labelFunc;
      },
    });
    
    return {
      Settings: Settings,
      Type: Type,
    };
  }();
  
  var Constants = {
    Resources: {
      WOOD: 'wood',
      WINE: 'wine',
      MARBLE: 'marble',
      GLASS: 'glass',
      SULFUR: 'sulfur',
      
      POPULATION: 'population',
      CITIZENS: 'citizens',

      SCIENTISTS: 'scientists',
      ACTION_POINTS: 'actionPoints',
      CULTURAL_GOODS: 'culturalGoods',
      TAVERN_WINE_LEVEL: 'tavernWineLevel',
      PRIESTS: 'priests',
    },
    
    CivilizationData: {
      GOVERNMENT: 'government',
      RESEARCH: 'research',
      MOVEMENT: 'movement',
      PREMIUM_FEATURE: 'premiumFeature',
    },
    
    PremiumFeatures: {
      DOUBLED_STORAGE_CAPACITY: 'doubledStorageCapacity',
      DOUBLED_SAFE_CAPACITY: 'doubledSafeCapacity',
    },
    
    Movements: {
      Mission: {
        TRANSPORT: 'transport',
        DEPLOY_ARMY: 'deployarmy',
        DEPLOY_NAVY: 'deployfleet',
        PLUNDER: 'plunder',
      },

      Stage: {
        LOADING: 'loading',
        EN_ROUTE: 'en_route',
        RETURNING: 'returning',
      },

      EventType: {
        DATA_UPDATED: 'dataUpdated',
        STAGE_CHANGED: 'stageChanged',
        CANCELLED: 'cancelled',
        COMPLETED: 'completed',
      },
      
      MissionData: {
        transport: {
          icon: 'skin/interface/mission_transport.png',
        },
        deployarmy: {
          icon: 'skin/interface/mission_deployarmy.png',
        },
        deployfleet: {
          icon: 'skin/interface/mission_deployfleet.png',
        },
        plunder: {
          icon: 'skin/interface/mission_plunder.png',
        },
        piracyRaid: {
          icon: 'skin/interface/mission_piracyRaid.png',
        },
      }
    },
    
    BuildingEventType: {
      DATA_REFRESH: 'dataRefresh',
      UPGRADE_COMPLETE: 'upgradeComplete',
    },
    
    Buildings: {
      TOWN_HALL: 'townHall',
      PALACE: 'palace',
      GOVERNORS_RESIDENCE: 'palaceColony',
      TAVERN: 'tavern',
      MUSEUM: 'museum',
      ACADEMY: 'academy',
      WORKSHOP: 'workshop',
      TEMPLE: 'temple',
      EMBASSY: 'embassy',
      WAREHOUSE: 'warehouse',
      DUMP: 'dump',
      TRADING_PORT: 'port',
      TRADING_POST: 'branchOffice',
      WALL: 'wall',
      HIDEOUT: 'safehouse',
      BARRACKS: 'barracks',
      SHIPYARD: 'shipyard',
      PIRATE_FORTRESS: 'pirateFortress',
      FORESTER: 'forester',
      CARPENTER: 'carpentering',
      WINERY: 'winegrower',
      WINE_PRESS: 'vineyard',
      STONEMASON: 'stonemason',
      ARCHITECT: 'architect',
      GLASSBLOWER: 'glassblowing',
      OPTICIAN: 'optician',
      ALCHEMISTS_TOWER: 'alchemist',
      FIREWORK_TEST_AREA: 'fireworker',
    },
    
    // Time data from http://ikariam.wikia.com/wiki/User_blog:Warrior_fr/Actual_building_Time_formula
    // Rest of data from http://ikariam.wikia.com/ building pages.
    BuildingData: {
      academy: {
        maxLevel: 32,
        wood  :[64, 68, 115, 263, 382, 626, 982, 1330, 2004, 2665, 3916, 5156, 7446, 9753, 12751, 18163, 23691, 33451, 43571, 56729, 73832, 103459, 144203, 175058, 243930, 317208, 439967, 536310, 743789, 1027469, 1257244, 1736681],
        glass :[0, 0, 0, 0, 225, 428, 744, 1089, 1748, 2454, 3786, 5216, 7862, 10729, 14599, 21627, 29321, 43020, 58213, 78724, 106414, 154857, 224146, 282571, 408877, 552141, 795252, 1006647, 1449741, 2079650, 2642546, 3790581],
        marble:0,
        sulfur:0,
        wine  :0,
        time  :{a:1440, b:1, c:1.2, d:720},
        icon  :'skin/img/city/academy_l.png',
        maxScientists: [0, 8, 12, 16, 22, 28, 35, 43, 51, 60, 69, 79, 89, 100, 111, 122, 134, 146, 159, 172, 185, 198, 212, 227, 241, 256, 271, 287, 302, 318, 335, 351, 368 ],
      },
      alchemist: {
        maxLevel: 32,
        wood  :[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
        glass :0,
        marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
        sulfur:0,
        wine  :0,
        time  :{a:72000, b:11, c:1.1, d:6120},
        icon  :'skin/img/city/alchemist_l.png',
      },
      architect: {
        maxLevel: 32,
        wood  :[185, 291, 413, 555, 720, 911, 1133, 1390, 1689, 2035, 2437, 2902, 3443, 4070, 4797, 5640, 6618, 7754, 9070, 10598, 12369, 14424, 16807, 19573, 22780, 26501, 30817, 35826, 41631, 48371, 56185, 65251],
        glass :0,
        marble:[106, 160, 222, 295, 379, 475, 587, 716, 865, 1036, 1233, 1460, 1722, 2023, 2369, 2767, 3226, 3752, 4358, 5056, 5857, 6778, 7836, 9052, 10448, 12054, 13899, 16289, 18450, 21246, 24455, 28141],
        sulfur:0,
        wine  :0,
        time  :{a:125660, b:37, c:1.06, d:2628},
        icon  :'skin/img/city/architect_l.png',
      },
      barracks: {
        maxLevel: 49,
        wood  :[48, 114, 195, 296, 420, 574, 766, 1003, 1297, 1662, 2115, 2676, 3371, 4234, 5304, 6630, 8275, 10314, 12843, 15979, 19868, 24690, 30669, 38083, 47277, 58676, 72812, 90341, 112076, 139028, 172448, 213889, 265276, 328996, 408008, 505984],
        glass :0,
        marble:[0, 0, 0, 0, 0, 0, 0, 0, 178, 431, 745, 1134, 1616, 2214, 2956, 3875, 5015, 6429, 8183, 10357, 13052, 16395, 20540, 25680, 32054, 39957, 49757, 61909, 76977, 95661, 118830, 147560, 183185, 227359, 282136, 350059],
        sulfur:0,
        wine  :0,
        time  :{a:25200, b:11, c:1.1, d:1728},
        icon  :'skin/img/city/barracks_l.png',
      },
      branchOffice: {
        maxLevel: 32,
        wood  :[48, 173, 346, 581, 896, 1314, 1863, 2580, 3509, 4706, 6241, 8203, 10699, 13866, 17872, 22926, 29286, 37272, 47283, 59806, 75447, 94954, 119245, 149453, 186977, 233530, 291225, 362658, 451015, 560208, 695038, 861391],
        glass :0,
        marble:[0, 0, 0, 0, 540, 792, 1123, 1555, 2115, 2837, 3762, 4945, 6450, 8359, 10774, 13820, 17654, 22469, 28503, 36051, 45482, 57240, 71883, 90092, 112712, 121067, 175556, 218617, 271878, 337705, 418983, 446564],
        sulfur:0,
        wine  :0,
        time  :{a:108000, b:11, c:1.1, d:9360},
        icon  :'skin/img/city/branchoffice_l.png',
      },
      carpentering: {
        maxLevel: 32,
        wood  :[63, 122, 191, 274, 372, 486, 620, 777, 962, 1178, 1432, 1730, 2078, 2486, 2964, 3524, 4178, 4945, 5841, 6890, 8117, 9550, 11229, 13190, 15484, 18166, 21299, 24963, 29245, 34247, 40096, 46930],
        glass :0,
        marble:[0, 0, 0, 0, 0, 0, 0, 359, 444, 546, 669, 816, 993, 1205, 1459, 1765, 2131, 2571, 3097, 3731, 4490, 5402, 6496, 7809, 9383, 11274, 13543, 16265, 19531, 23450, 28154, 33798],
        sulfur:0,
        wine  :0,
        time  :{a:125660, b:37, c:1.06, d:2808},
        icon  :'skin/img/city/carpentering_l.png',
      },
      dump: {
        maxLevel: 40,
        wood  :[640, 1152, 1766, 2504, 3388, 4450, 5724, 7253, 9088, 11289, 13931, 17101, 20905, 25470, 30948, 37522, 45410, 54876, 66236, 79867, 96223, 115852, 139407, 167672, 201592, 242293, 291136, 349749, 420081, 504483, 605763, 727300, 873143, 1048157, 1258171, 1510191, 1812613, 2175519, 2611007, 3133592],
        glass :[701, 1146, 1668, 2278, 2991, 3526, 4803, 5946, 7283, 8847, 10678, 12819, 15324, 18257, 21687, 25700, 30395, 35889, 42316, 49837, 58635, 68929, 80973, 95065, 111553, 130843, 153414, 179821, 201716, 246864, 289157, 338642, 396536, 464274, 543528, 636253, 744742, 871676, 1020187, 1193945],
        marble:[497, 932, 1445, 2051, 2762, 3609, 4604, 5778, 7164, 8799, 10728, 13005, 15691, 18862, 22602, 27016, 32225, 38371, 45623, 54181, 64278, 76194, 90256, 106847, 126424, 149528, 176787, 208956, 246913, 291702, 344555, 406921, 480512, 567350, 669817, 790730, 933408, 1101767, 1300431, 1534855],
        sulfur:[384, 845, 1398, 2061, 2858, 3813, 4960, 6336, 7987, 9968, 12346, 15199, 18623, 22731, 27661, 33578, 40677, 49197, 59420, 71688, 86409, 104076, 125274, 150714, 181241, 217872, 261830, 314581, 377881, 453842, 544994, 654378, 785637, 943149, 1132163, 1358979, 1631159, 1957774, 2349714, 2820041],

        wine  :0,
        time  :{a:32000, b:13, c:1.17, d:2160},
        icon  :'skin/img/city/dump_l.png',
      },
      embassy: {
        maxLevel: 32,
        wood  :[242, 415, 623, 873, 1173, 1532, 1964, 2482, 3103, 3849, 4743, 5817, 7105, 8651, 10507, 12733, 15610, 18498, 22457, 27074, 32290, 33764, 47240, 56812, 70157, 84318, 101310, 121979, 146503, 175932, 222202, 266778],
        glass :0,
        marble:[155, 342, 571, 850, 1190, 1606, 2112, 2730, 3484, 4404, 5527, 6896, 8566, 10604, 13090, 16123, 19824, 24339, 29846, 36564, 45216, 47097, 66967, 81859, 104537, 129580, 158759, 193849, 236659, 288888, 358869, 437985 ],
        sulfur:0,
        wine  :0,
        time  :{a:96000, b:7, c:1.05, d:10080},
        icon  :'skin/img/city/embassy_l.png',
      },
      fireworker: {
        maxLevel: 32,
        wood  :[272, 353, 445, 551, 673, 813, 974, 1159, 1373, 1618, 1899, 2223, 2596, 3025, 3517, 4084, 4736, 5485, 6346, 7338, 8478, 9790, 11297, 13030, 14990, 17317, 19954, 22986, 26472, 30484, 35096, 40398],
        glass :0,
        marble:[135, 212, 302, 405, 526, 665, 827, 1015, 1233, 1486, 1779, 2120, 2514, 2972, 3503, 4119, 4834, 5662, 6623, 7738, 9032, 10534, 12275, 13355, 16636, 19354, 22507, 26163, 30404, 35325, 41033, 47652],
        sulfur:0,
        wine  :0,
        time  :{a:125660, b:37, c:1.06, d:2628},
        icon  :'skin/img/city/fireworker_l.png',
      },
      forester: {
        maxLevel: 32,
        wood  :[250, 430, 664, 968, 1364, 1878, 2546, 3415, 4544, 6013, 7922, 10403, 13629, 17823, 23274, 30362, 39574, 51552, 67123, 87363, 113680, 147889, 192360, 250173, 325258, 423034, 550049, 715169, 929826, 1208878, 1571646, 2043246],
        glass :0,
        marble:[0, 104, 237, 410, 635, 928, 1309, 1803, 2446, 3282, 4368, 5781, 7617, 10422, 13108, 17142, 22386, 29204, 38068, 49589, 64569, 84041, 109356, 142266, 185046, 240663, 312965, 406956, 529144, 687989, 894489, 1162937],
        sulfur:0,
        wine  :0,
        time  :{a:72000, b:11, c:1.1, d:6120},
        icon  :'skin/img/city/forester_l.png',
      },
      glassblowing: {
        maxLevel: 32,
        wood  :[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
        glass :0,
        marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
        sulfur:0,
        wine  :0,
        time  :{a:72000, b:11, c:1.1, d:6120},
        icon  :'skin/img/city/glassblowing_l.png',
      },
      museum: {
        maxLevel: 21,
        wood  :[560, 1435, 2748, 4716, 7669, 12099, 18744, 28710, 43661, 66086, 99724, 150181, 225866, 339394, 509686, 765124, 1148280, 1723016, 2585120, 3878276],
        glass :0,
        marble:[280, 1190, 2573, 4676, 7871, 12729, 20112, 31335, 48394, 74323, 113736, 173643, 264701, 403110, 613492, 933272, 1419338, 2158157, 3281164, 4988135],
        sulfur:0,
        wine  :0,
        time  :{a:18000, b:1, c:1.1, d:14040},
        icon  :'skin/img/city/museum_r.png',
      },
      optician: {
        maxLevel: 32,
        wood  :[119, 188, 269, 362, 471, 597, 742, 912, 1108, 1335, 1600, 1906, 2261, 2673, 3152, 3706, 4348, 5096, 5962, 6966, 8131, 9482, 11050, 12868, 14978, 17424, 20262, 23553, 27373, 31804, 36943, 42904],
        glass :0,
        marble:[0, 35, 96, 167, 249, 345, 455, 584, 733, 905, 1106, 1338, 1608, 1921, 2283, 2704, 3191, 3759, 4416, 5178, 6062, 7087, 8276, 9656, 11257, 13113, 15267, 17762, 20662, 24024, 27922, 32447],
        sulfur:0,
        wine  :0,
        time  :{a:125660, b:37, c:1.06, d:2772},
        icon  :'skin/img/city/optician_l.png',
      },
      palace: {
        maxLevel: 11,
        wood  :[712, 5823, 16048, 36496, 77392, 159184, 322768, 649936, 1304272, 2612944, 4743517],
        glass :[0, 0, 0, 0, 21188, 42400, 84824, 169672, 339368, 678760, 1357543],
        marble:[0, 1433, 4546, 10770, 23218, 48114, 97906, 197490, 396658, 794994, 1591666],
        sulfur:[0, 0, 3088, 10300, 24725, 53573, 111269, 226661, 457445, 919013, 1842149],
        wine  :[0, 0, 0, 10898, 22110, 44534, 89382, 179078, 358470, 717254, 1434821],
        time  :{a:11520, b:1, c:1.4, d:0},
        icon  :'skin/img/city/palace_l.png', 
      },
      palaceColony:{
        maxLevel: 11,
        wood  :[712, 5823, 16048, 36496, 77392, 159184, 322768, 649936, 1304272, 2612944, 4743517],
        glass :[0, 0, 0, 0, 21188, 42400, 84824, 169672, 339368, 678760, 1357543],
        marble:[0, 1433, 4546, 10770, 23218, 48114, 97906, 197490, 396658, 794994, 1591666],
        sulfur:[0, 0, 3088, 10300, 24725, 53573, 111269, 226661, 457445, 919013, 1842149],
        wine  :[0, 0, 0, 10898, 22110, 44534, 89382, 179078, 358470, 717254, 1434821],
        time  :{a:11520, b:1, c:1.4, d:0},
        icon  :'skin/img/city/palaceColony_l.png',
      },
      pirateFortress:{
        maxLevel: 30,
        wood   :[450, 906, 1389, 1935, 2593, 3427, 4516, 5950, 7834, 10284, 13430, 17415, 22394, 28534, 36015, 45029, 55779, 68482, 83366, 100671, 120648, 143562, 169686, 199309, 232729, 270255, 312210, 358926, 410748, 468032],
        glass  :0,
        marble :[250, 505, 783, 1112, 1534, 2103, 2883, 3949, 5388, 7296, 9782, 12964, 16970, 21938, 28019, 35370, 44162, 54573, 66793, 81020, 97463, 116341, 137883, 162325, 189915, 220912, 255580, 294197, 337048, 384429],
        sulfur :0,
        wine   :0,
        time   :{a:1550, b:1, c:1.2, d:1800},
        icon   :'skin/img/city/pirateFortress_l.png',
      },
      port: {
        maxLevel: 47,
        wood  :[60, 150, 274, 429, 637, 894, 1207, 1645, 2106, 2735, 3537, 4492, 5689, 7103, 8850, 11094, 13731, 17062, 21097, 25965, 31810, 39190, 47998, 58713, 71955, 87627, 107102, 130776, 159019, 193938, 235849, 286514, 348718, 423990, 513947, 625160, 758178, 919693, 1116013, 1353517, 1642274, 1990223, 2411061],
        glass :0,
        marble:[0, 0, 0, 0, 0, 176, 326, 540, 791, 1138, 1598, 2176, 2928, 3859, 5051, 6628, 8566, 11089, 14265, 18241, 23197, 29642, 37636, 47703, 60556, 76367, 96639, 122156, 153753, 194089, 244300, 307174, 386955, 486969, 610992, 769302, 965792, 1212790, 1523570, 1913072, 2403313, 3015688, 3782992],
        sulfur:0,
        wine  :0,
        time  :{a:50400, b:23, c:1.15, d:1512},
        loadingSpeed: [10, 30, 60, 93, 129, 169, 213, 261, 315, 373, 437, 508, 586, 672, 766, 869, 983, 1108, 1246, 1398, 1565, 1748, 1950, 2172, 2416, 2685, 2980, 3305, 3663, 4056, 4489, 4965, 5488, 6064, 6698, 7394, 8161, 9004, 9931, 10951, 12073, 13308, 14666, 16159, 17803, 19616, 21613, 23813, 26237],

        icon  :'skin/img/city/port_l.png',
      },
      safehouse: {
        maxLevel: 32,
        wood  :[113, 248, 402, 578, 779, 1007, 1267, 1564, 1903, 2288, 2728, 3230, 3801, 4453, 5195, 6042, 7008, 8108, 9363, 10793, 12423, 14282, 16401, 18816, 21570, 24709, 28288, 32368, 37019, 42321, 48365, 55255],
        glass :0,
        marble:[0, 0, 0, 129, 197, 275, 366, 471, 593, 735, 900, 1090, 1312, 1569, 1866, 2212, 2613, 3078, 3617, 4243, 4968, 5810, 6787, 7919, 9233, 10758, 12526, 14577, 16956, 19716, 22917, 26631],
        sulfur:0,
        wine  :0,
        time  :{a:96000, b:7, c:1.05, d:12960},
        icon  :'skin/img/city/safehouse_l.png',
      },
      shipyard: {
        maxLevel: 32,
        wood  :[98, 202, 324, 477, 671, 914, 1222, 1609, 2096, 2711, 3485, 4459, 5688, 7238, 9190, 11648, 14746, 18650, 23568, 29765, 37573, 47412, 59808, 75428, 95108, 119906, 151151, 190520, 240124, 302626, 381378, 480605],
        glass :0,
        marble:[0, 0, 0, 0, 0, 778, 1052, 1397, 1832, 2381, 3070, 3941, 5037, 6420, 8161, 10354, 13118, 16601, 20989, 26517, 33484, 42261, 53321, 67256, 84814, 106938, 134814, 169937, 214192, 269954, 340214, 428741],
        sulfur:0,
        wine  :0,
        time  :{a:64800, b:7, c:1.05, d:7128},
        icon  :'skin/img/city/shipyard_l.png',
      },
      stonemason: {
        maxLevel: 32,
        wood  :[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
        glass :0,
        marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
        sulfur:0,
        wine  :0,
        time  :{a:72000, b:11, c:1.1, d:6120},
        icon  :'skin/img/city/stonemason_l.png',
      },
      temple: {
        maxLevel: 32,
        wood  :[216, 228, 333, 465, 598, 760, 958, 1197, 1432, 1773, 2112, 2512, 3082, 3655, 4458, 5126, 6232, 7167, 8687, 10247, 11784, 14228, 16752, 19265, 23156, 26663, 32026, 36830, 43256, 50782, 59591, 68528],
        glass :[173, 190, 290, 423, 567, 752, 989, 1290, 1610, 2080, 2586, 3210, 4109, 5084, 6471, 7765, 9851, 11821, 14952, 18402, 22082, 27824, 34184, 41020, 51514, 61817, 77477, 92972, 113941, 139577, 170910, 205093],
        marble:0,
        sulfur:0,
        wine  :0,
        time  :{a:2160, b:1, c:1.1, d:0},
        icon  :'skin/img/city/temple_l.png',
      },
      tavern: {
        maxLevel: 47,
        wood  :[101, 222, 367, 541, 750, 1001, 1302, 1663, 2097, 2617, 3241, 3990, 4888, 5967, 7261, 8814, 10678, 12914, 15598, 18818, 22683, 27320, 32885, 39562, 47576, 57192, 68731, 82578, 99194, 119134, 143061, 171774, 206230, 247577, 297193, 356732, 428179, 513916, 616800, 740261, 888413, 1066196, 1279537, 1535545, 1842756, 2211407, 2653789 ],
        glass :0,
        marble:[0, 0, 0, 94, 122, 158, 206, 267, 348, 452, 587, 764, 993, 1290, 1677, 2181, 2835, 3685, 4791, 6228, 8097, 10526, 13684, 17789, 23125, 30063, 39082, 50806, 66048, 85862, 111621, 145107, 188640, 245232, 318801, 414441, 538774, 700406, 910528, 1183686, 1538791, 2000427, 2600557, 3380725, 4394943, 5713425, 7427454],
        sulfur:0,
        wine  :0,
        time  :{a:10800, b:1, c:1.06, d:10440},
        icon  :'skin/img/city/taverne_r.png',
        wineUse: [0, 4, 8, 13, 18, 24, 30, 37, 44, 51, 60, 68, 78, 88, 99, 110, 122, 136, 150, 165, 180, 197, 216, 235, 255, 277, 300, 325, 351, 378, 408, 439, 472, 507, 544, 584, 626, 670, 717, 766, 818, 874, 933, 995, 1060, 1129, 1202, 1280, 1362],
      },
      townHall: {
        maxLevel: 40,
        wood  :[0, 158, 335, 623, 923, 1390, 2015, 2706, 3661, 4776, 6173, 8074, 10281, 13023, 16424, 20986, 25423, 32285, 40232, 49286, 61207, 74804, 93956, 113035, 141594, 170213, 210011, 258875, 314902, 387656, 471194, 572580, 695615, 854728, 1037814, 1274043, 1714396, 1876185, 2276285, 2761291],
        glass :0,
        marble:[0, 0, 0, 0, 285, 551, 936, 1411, 2091, 2945, 4072, 5664, 7637, 10214, 13575, 18254, 23250, 31022, 40599, 52216, 68069, 87316, 115101, 145326, 191053, 241039, 312128, 403825, 515593, 666228, 850031, 1084292, 1382826, 1783721, 2273685, 2930330, 3692589, 4756439, 6058680, 7716365],
        sulfur:0,
        wine  :0,
        time  :{a:1800, b:1, c:1.17, d:-1080},
        icon  :'skin/img/city/townhall_l.png',
      },
      vineyard: {
        maxLevel: 32,
        wood  :[339, 423, 520, 631, 758, 905, 1074, 1269, 1492, 1749, 2045, 2384, 2775, 3225, 3741, 4336, 5019, 5813, 6875, 7941, 8944, 10319, 11900, 13718, 15809, 18215, 20978, 24159, 27816, 32021, 36857, 42419],
        glass :0,
        marble:[123, 198, 285, 387, 504, 640, 798, 981, 1194, 1440, 1726, 2058, 2443, 2889, 3407, 4008, 4705, 5513, 6450, 7537, 8800, 10263, 11961, 13930, 16214, 18864, 21938, 25503, 29639, 34437, 40002, 46457],
        sulfur:0,
        wine  :0,
        time  :{a:125660, b:37, c:1.06, d:2232},
        icon  :'skin/img/city/vineyard_l.png',
      },
      wall: {
        maxLevel: 48,
        wood  :[114, 361, 657, 1012, 1439, 1951, 2565, 3302, 4186, 5247, 6521, 8049, 9882, 12083, 14724, 17892, 21695, 26258, 31733, 38304, 46189, 55650, 67004, 80629, 96979, 116599, 140143, 168395, 202298, 242982, 291802, 350387, 420689, 505049, 606284, 727765, 873541, 1048473, 1258393, 1510294, 1812577, 2175317, 2610603, 3132948, 3759764],
        glass :0,
        marble:[0, 203, 516, 892, 1344, 1885, 2535, 3315, 4251, 5374, 6721, 8338, 10279, 12608, 15402, 18755, 22779, 27607, 33402, 40355, 48699, 58711, 70726, 85144, 102446, 123208, 148122, 178019, 213896, 256948, 308610, 370605, 444998, 534270, 641397, 769949, 924213, 1109328, 1331467, 1598031, 1917913, 2301767, 2762392, 3315144, 3978446],
        sulfur:0,
        wine  :0,
        time  :{a:57600, b:11, c:1.1, d:3240},
        icon  :'skin/img/city/wall.png',
      },
      warehouse: {
        maxLevel: 40,
        wood  :[160, 288, 442, 626, 847, 1113, 1431, 1813, 2272, 2822, 3483, 4275, 5226, 6368, 7737, 9380, 11353, 13719, 16559, 19967, 24056, 28963, 34852, 41918, 50398, 60574, 72784, 87437, 105021, 126121, 151441, 181825, 218286, 262039, 314543, 377548, 453153, 543880, 652752, 783398],

        glass :0,
        marble:[0, 0, 0, 96, 211, 349, 515, 714, 953, 1240, 1584, 1997, 2492, 3086, 3800, 4656, 5683, 6915, 8394, 10169, 12299, 14855, 17922, 21602, 26019, 31319, 37678, 45310, 54468, 65458, 78645, 94471, 113461, 136249, 163595, 196409, 235787, 283041, 339745, 407790 ],
        sulfur:0,
        wine  :0,
        time  :{a:2880, b:1, c:1.14, d:2160},
        icon  :'skin/img/city/warehouse_l.png',
      },
      winegrower: {
        maxLevel: 32,
        wood  :[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
        glass :0,
        marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
        sulfur:0,
        wine  :0,
        time  :{a:72000, b:11, c:1.1, d:6120},
        icon  :'skin/img/city/winegrower_l.png',
      },
      workshop: {
        maxLevel: 32,
        wood  :[206, 383, 569, 781, 1023, 1299, 1613, 1972, 2380, 2846, 3377, 3982, 4672, 5458, 6355, 7377, 8542, 9870, 11385, 13111, 15078, 17714, 19481, 22796, 26119, 29909, 34228, 39153, 44766, 51166, 58462, 66778],
        glass :0,
        marble:[89, 167, 251, 349, 461, 592, 744, 920, 1125, 1362, 1637, 1956, 2326, 2755, 3253, 3831, 4500, 5279, 6180, 7226, 8439, 9776, 11477, 13373, 15570, 18118, 21074, 24503, 28481, 33095, 38447, 44656],
        sulfur:0,
        wine  :0,
        time  :{a:96000, b:7, c:1.05, d:11880},
        icon  :'skin/img/city/workshop_l.png',
      },
    },
    
    Research: {
      Seafaring: {
        CARPENTRY: 2150,
        DECK_WEAPONS: 1010,
        PIRACY: 1170,
        SHIP_MAINTENANCE: 1020,
        DRAFT: 1130,
        EXPANSION: 1030,
        FOREIGN_CULTURES: 1040,
        PITCH: 1050,
        MARKET: 2070,
        GREEK_FIRE: 1060,
        COUNTERWEIGHT: 1070,
        DIPLOMACY: 1080,
        SEA_MAPS: 1090,
        PADDLE_WHEEL_ENGINE: 1100,
        CAULKING: 1140,
        MORTAR_ATTACHMENT: 1110,
        MASSIVE_RAM: 1150,
        OFFSHORE_BASE: 1160,
        SEAFARING_FUTURE: 1999,
      },
      
      Economy: {
        CONSERVATION: 2010,
        PULLEY: 2020,
        WEALTH: 2030,
        WINE_CULTURE: 2040,
        IMPROVED_RESOURCE_GATHERING: 2130,
        GEOMETRY: 2060,
        ARCHITECTURE: 1120,
        HOLIDAY: 2080,
        LEGISLATION: 2170,
        CULINARY_SPECIALITIES: 2050,
        HELPING_HANDS: 2090,
        SPIRIT_LEVEL: 2100,
        WINE_PRESS: 2140,
        DEPOT: 2160,
        BUREACRACY: 2110,
        UTOPIA: 2120,
        ECONOMIC_FUTURE: 2999,
      },
      
      Science: {
        WELL_CONSTRUCTION: 3010,
        PAPER: 3020,
        ESPIONAGE: 3030,
        POLYTHEISM: 3040,
        INK: 3050,
        GOVERNMENT_FORMATION: 3150,
        INVENTION: 3140,
        CULTURAL_EXCHANGE: 3060,
        ANATOMY: 3070,
        OPTICS: 3080,
        EXPERIMENTS: 3081,
        MECHANICAL_PEN: 3090,
        BIRDS_FLIGHT: 3100,
        LETTER_CHUTE: 3110,
        STATE_RELIGION: 3160,
        PRESSURE_CHAMBER: 3120,
        ARCHIMEDEAN_PRINCIPLE: 3130,
        SCIENTIFIC_FUTURE: 3999,
      },
      
      Military: {
        DRY_DOCKS: 4010,
        MAPS: 4020,
        PROFESSIONAL_ARMY: 4030,
        SEIGE: 4040,
        CODE_OF_HONOR: 4050,
        BALLISTICS: 4060,
        LAW_OF_THE_LEVEL: 4070,
        GOVERNOR: 4080,
        PYROTECHNICS: 4130,
        LOGISTICS: 4090,
        GUNPOWDER: 4100,
        ROBOTICS: 4110,
        CANNON_CASTING: 4120,
        MILITARISTIC_FUTURE: 4999,
      },
    },
    
    Government: {
      ANARCHY: 'anarchie',
      
      IKACRACY: 'ikakratie',
      ARISTOCRACY: 'aristokratie',
      DICTATORSHIP: 'diktatur',
      DEMOCRACY: 'demokratie',
      NOMOCRACY: 'nomokratie',
      OLIGARCHY: 'oligarchie',
      TECHNOCRACY: 'technokratie',
      THEOCRACY: 'theokratie',
    },
    
    TradeGoodOrdinals: {
      WINE: 1,
      MARBLE: 2,
      GLASS: 3,
      SULFUR: 4,
    },
    
    Time: {
      SECONDS_PER_HOUR: 3600,
      SECONDS_PER_MINUTE: 60,
      MILLIS_PER_DAY: 1000 * 60 * 60 * 24,
      MILLIS_PER_HOUR: 1000 * 60 * 60,
      MILLIS_PER_SECOND: 1000,
      MILLIS_PER_MINUTE: 60000,
      MINUTES_PER_DAY: 24 * 60,
      MINUTES_PER_HOUR: 60,
      HOURS_PER_DAY: 24,
      HOURS_PER_WEEK: 24 * 7,
      
      SAFE_TIME_DELTA: 1000,
      INITIAL_PAGE_LOAD_DELTA: 2000,
    },
    
    GamePlay: {
      BUILDING_SPOTS: 18,
      HAPPINESS_PER_CULTURAL_GOOD: 50,
      HAPPINESS_PER_WINE_SERVING_LEVEL: 60,
      BASE_RESOURCE_PROTECTION: 100,
      RESOURCES_PER_TRANSPORT: 500,
      RESOURCE_PROTECTION_WAREHOUSE: 480,
      RESOURCE_PROTECTION_WAREHOUSE_INACTIVE: 80,
    },
        
    BaseView: {
      ISLAND: 'island',
      CITY: 'city',
      WORLD: 'worldview',
    },
    
    Military: {
      // Army
      HOPLITE: 'phalanx', 
      STEAM_GIANT: 'steamgiant', 
      SPEARMAN: 'spearman', 
      SWORDSMAN: 'swordsman', 
      SLINGER: 'slinger', 
      ARCHER: 'archer', 
      GUNNER: 'marksman',
      BATTERING_RAM: 'ram', 
      CATAPULT: 'catapult',
      MORTAR: 'mortar', 
      GYROCOPTER: 'gyrocopter',
      BALLOON_BOMBADIER: 'bombardier', 
      COOK: 'cook', 
      DOCTOR: 'medic',
      ARMY: 'army',
      
      // Navy
      RAM_SHIP: 'ship_ram', 
      FLAME_THROWER: 'ship_flamethrower',
      STEAM_RAM: 'ship_steamboat', 
      BALLISTA_SHIP: 'ship_ballista', 
      CATAPULT_SHIP: 'ship_catapult', 
      MORTAR_SHIP: 'ship_mortar', 
      SUBMARINE: 'ship_submarine',
      PADDLE_SPEED_SHIP: 'ship_paddlespeedship',
      BALLOON_CARRIER: 'ship_ballooncarrier',
      TENDER: 'ship_tender',
      ROCKET_SHIP: 'ship_rocketship',
      NAVY: 'navy',
    },
    
    UnitData: {
      spearman: {
        minimumBuildingLevelToBuild: 1,
        baseBuildTime: 60,
        isArmy: true,
        speed: 60,
        cargoSize: 3,
      },
      slinger: {
        minimumBuildingLevelToBuild: 2,
        baseBuildTime: 90,
        isArmy: true,
        speed: 60,
        cargoSize: 3,
      },
      ram: {
        minimumBuildingLevelToBuild: 3,
        baseBuildTime: 600,
        isArmy: true,
        speed: 40,
        cargoSize: 30,
      },
      phalanx: {
        minimumBuildingLevelToBuild: 4,
        baseBuildTime: 300,
        isArmy: true,
        speed: 60,
        cargoSize: 5,
      },
      cook: {
        minimumBuildingLevelToBuild: 5,
        baseBuildTime: 1200,
        isArmy: true,
        speed: 40,
        cargoSize: 20,
      },
      swordsman: {
        minimumBuildingLevelToBuild: 6,
        baseBuildTime: 180,
        isArmy: true,
        speed: 60,
        cargoSize: 3,
      },
      archer: {
        minimumBuildingLevelToBuild: 7,
        baseBuildTime: 240,
        isArmy: true,
        speed: 60,
        cargoSize: 5,
      },
      catapult: {
        minimumBuildingLevelToBuild: 8,
        baseBuildTime: 1800,
        isArmy: true,
        speed: 40,
        cargoSize: 30,
      },
      medic: {
        minimumBuildingLevelToBuild: 9,
        baseBuildTime: 1200,

        isArmy: true,
        speed: 60,
        cargoSize: 10,
      },
      gyrocopter: {
        minimumBuildingLevelToBuild: 10,
        baseBuildTime: 900,
        isArmy: true,
        speed: 80,
        cargoSize: 15,
      },
      bombardier: {
        minimumBuildingLevelToBuild: 11,
        baseBuildTime: 1800,
        isArmy: true,
        speed: 20,
        cargoSize: 30,
      },
      steamgiant: {
        minimumBuildingLevelToBuild: 12,
        baseBuildTime: 900,
        isArmy: true,
        speed: 40,
        cargoSize: 15,
      },
      marksman: {
        minimumBuildingLevelToBuild: 13,
        baseBuildTime: 600,
        isArmy: true,
        speed: 60,
        cargoSize: 5,
      },
      mortar: {
        minimumBuildingLevelToBuild: 14,
        baseBuildTime: 2400,
        isArmy: true,
        speed: 40,
        cargoSize: 30,
      },
      
      barbarian: {
        minimumBuildingLevelToBuild: 1,
        baseBuildTime: 1,
        isArmy: true,
        speed: 40,
        cargoSize: 5,
      },
      
      ship_ram: {
        minimumBuildingLevelToBuild: 1,
        baseBuildTime: 2400,
        isArmy: false,
        speed: 40,
        cargoSize: 0,
      },
      ship_flamethrower: {
        minimumBuildingLevelToBuild: 4,
        baseBuildTime: 1800,
        isArmy: false,
        speed: 40,
        cargoSize: 0,
      },
      ship_submarine: {
        minimumBuildingLevelToBuild: 19,
        baseBuildTime: 3600,
        isArmy: false,
        speed: 40,
        cargoSize: 0,
      },
      ship_ballista: {
        minimumBuildingLevelToBuild: 3,
        baseBuildTime: 3000,
        isArmy: false,
        speed: 40,
        cargoSize: 0,
      },
      ship_catapult: {
        minimumBuildingLevelToBuild: 3,
        baseBuildTime: 3000,
        isArmy: false,
        speed: 40,
        cargoSize: 0,
      },
      ship_mortar: {
        minimumBuildingLevelToBuild: 17,
        baseBuildTime: 3000,
        isArmy: false,
        speed: 30,
        cargoSize: 0,
      },
      ship_steamboat: {
        minimumBuildingLevelToBuild: 15,
        baseBuildTime: 2400,
        isArmy: false,
        speed: 40,
        cargoSize: 0,
      },
      ship_rocketship: {
        minimumBuildingLevelToBuild: 11,
        baseBuildTime: 3600,
        isArmy: false,
        speed: 30,
        cargoSize: 0,
      },
      ship_paddlespeedship: {
        minimumBuildingLevelToBuild: 13,
        baseBuildTime: 1800,
        isArmy: false,
        speed: 60,
        cargoSize: 0,
      },
      ship_ballooncarrier: {
        minimumBuildingLevelToBuild: 7,
        baseBuildTime: 3900,
        isArmy: false,
        speed: 20,
        cargoSize: 0,
      },
      ship_tender: {
        minimumBuildingLevelToBuild: 9,
        baseBuildTime: 2400,
        isArmy: false,
        speed: 30,
        cargoSize: 0,
      },
    },

    UnitIds: {
      301: 'slinger',
      302: 'swordsman',
      303: 'phalanx',
      304: 'marksman',
      305: 'mortar',
      306: 'catapult',
      307: 'ram',
      308: 'steamgiant',
      309: 'bombardier',
      310: 'cook',
      311: 'medic',
      312: 'gyrocopter',
      313: 'archer',
      315: 'spearman',
      316: 'barbarian',
      
      210: 'ship_ram',
      211: 'ship_flamethrower',
      212: 'ship_submarine',
      213: 'ship_ballista',
      214: 'ship_catapult',
      215: 'ship_mortar',
      216: 'ship_steamboat',
      217: 'ship_rocketship',
      218: 'ship_paddlespeedship',
      219: 'ship_ballooncarrier',
      220: 'ship_tender',
    },
    
    IkariamAjaxResponseType: {
      RELOAD: 'reload',
      PROVIDE_FEEDBACK: 'provideFeedback',
      QUEST_DATA: 'questData',
      UPDATE_GLOBAL_DATA: 'updateGlobalData',
      UPDATE_TEMPLATE_DATA: 'updateTemplateData',
      UPDATE_BACKGROUND_DATA: 'updateBackgroundData',
      CLOSE_VIEW: 'closeView',
      CHANGE_VIEW: 'changeView',
      ADD_WINDOW: 'addWindow',
      CREATE_VIEW: 'createView',
      EVAL_SCRIPT: 'evalScript',
    },
    
    
    CityType: {
      OWN: 'ownCity',
      DEPLOYMENT: 'deployedCities',
      OCCUPATION: 'occupiedCities',
    },
    
    View: {
      CITY_DETAIL: 'cityDetails',
      CITY_MILITARY: 'cityMilitary',
      RELATED_CITIES: 'relatedCities',
      ACADEMY: 'academy',
      PALACE: 'palace',
      MUSEUM: 'museum',
      ASSIGN_CULTURAL_POSSESSIONS: 'culturalPossessions_assign',
      TOWN_HALL: 'townHall',
      TEMPLE: 'temple',
      RESEARCH_ADVISOR: 'researchAdvisor',
      FINANCES: 'finances',
      BARRACKS: 'barracks',
      SHIPYARD: 'shipyard',
      PIRATE_FORTRESS: 'pirateFortress',
      MILITARY_ADVISOR: 'militaryAdvisor',
      MILITARY_ADVISOR_REPORT: 'militaryAdvisorReportView',
      PREMIUM: 'premium',
      TRANSPORT: 'transport',
      DEPLOY: 'deployment',
      BRANCH_OFFICE: 'branchOffice',
      TAKE_OFFER: 'takeOffer',
      RESOURCE: 'resource',
      TRADE_GOOD: 'tradegood',
      ABOLISH_CITY: 'abolishCity',
      HIDEOUT: 'safehouse',
      PILLAGE: 'plunder',
      BLOCKADE: 'blockade',
      SEND_SPY: 'sendSpy',
      SPY_MISSION: 'spyMissions',
      HIGH_SCORE: 'highscore',
      ALLIANCE_PAGE: 'allyPage',
      OCCUPY: 'occupy',
      COLONIZE: 'colonize',
    },

    PlayerState: {
      INACTIVE: 'inactive',
      NORMAL: '',
      VACATION: 'vacation',
      NEW: 'noob',
    },

    CombatType: {
      BLOCKADE: 'blockade',
      PILLAGE: 'plunder',
    },
  };
  
  var EmpireData = function() {
    function Military(city) {
      this._ikaToolsType = 'military';
      
      this.lastArmyUpdate = 0;
      this.lastNavyUpdate = 0;
      
      this.present = new MilitaryUnits();
      this.armyTrainingBatches = [];
      this.navyTrainingBatches = [];
      
      this._setCity(city);
    }
    
    $.extend(Military.prototype, {
      _setCity: function setCity(city) {
        if (city) {
          this.city = Utils.fixedFunction(city);
          this._startArmyTrainingTimers();
          this._startNavyTrainingTimers();
        }
      },
      _startTrainingTimers: function startTrainingTimers(batches) {
        var military = this;
        while (batches.length > 0 && batches[0].completionTime <= View.gameTimeNow()) {
          var batch = batches.shift();
          if ((batch.type == Constants.Military.ARMY && 
               batch.getCompletionTime() > this.lastArmyUpdate) || 
              (batch.type == Constants.Military.NAVY && 
               batch.getCompletionTime() > this.lastNavyUpdate)) {
            military.present._increment(batch.getUnits());
          }
        }
        $.each(batches, function startTrainingBatchTimers(index, batch) {
          if (batch.completionEvent) {
            batch.completionEvent();
          }
          batch.completionEvent = militaryChangedEvent().scheduleSend(
              'MilitaryTrainingComplete[' + military.city().getId() + ']',
              batch.getCompletionTime() - View.gameTimeNow() + 
                  Constants.Time.SAFE_TIME_DELTA,
              function militaryTrainingComplete() {
                military.present._increment(batches.shift().getUnits());
                empireData.saveAsync();
              },
              [{
                city: military.city(),
                military: military,
                type: 'training_complete',
              }]);
        });
      },
      _startArmyTrainingTimers: function startArmyTrainingTimers() {
        this._startTrainingTimers(this.armyTrainingBatches);
      },
      _startNavyTrainingTimers: function startNavyTrainingTimers() {
        this._startTrainingTimers(this.navyTrainingBatches);
      },
      _updatePresent: function updatePresent(unit, count) {
        return this.present._setCount(unit, count);
      },
      _markPresentUpdated: function markPresentUpdated(army, navy) {
        if (army || army === undefined) {
          this.lastArmyUpdate = View.gameTimeNow();
        }
        if (navy || navy === undefined) {
          this.lastNavyUpdate = View.gameTimeNow();
        }
      },
      _setArmyTrainingBatches: function setArmyTrainingBatches(batches) {

        $.each(this.armyTrainingBatches, function cancelTrainingBatchTimer(index, batch) {
          if (batch.completionEvent) {
            batch.completionEvent();
          }
        });
        
        this.armyTrainingBatches = batches;
        
        this._startArmyTrainingTimers();
      },
      _setNavyTrainingBatches: function setNavyTrainingBatches(batches) {
        $.each(this.navyTrainingBatches, function cancelTrainingBatchTimer(index, batch) {
          if (batch.completionEvent) {
            batch.completionEvent();
          }
        });

        this.navyTrainingBatches = batches;

        this._startNavyTrainingTimers();
      },
      _increment: function increment(units) {
        this.present._increment(units);
      },
      _decrement: function decrement(units) {
        this.present._decrement(units);
      },
      _clear: function clear() {
        this.present._clear();
        this.armyTrainingBatches = [];
        this.navyTrainingBatches = [];
      },
      getTrainingBatches: function getTrainingBatches(batches) {
        return $.merge($.merge([], this.armyTrainingBatches), this.navyTrainingBatches);
      },
      getPresent: function getPresent() {
        return this.present;
      },
    });
    
    function MilitaryUnits() {
      this._ikaToolsType = 'militaryUnits';
      
      this.units = {};
    }
    
    $.extend(MilitaryUnits.prototype, {
      _setCount: function setCount(unit, count) {
        var oldCount = this.units[unit];
        this.units[unit] = count;
        return oldCount != count;
      },
      _increment: function increment(units) {
        $.each(units.units, function(unit, count) {
          this._setCount(unit, (this.getCount(unit) || 0) + count);
        }.bind(this));
      },
      _decrement: function decrement(units) {
        $.each(units.units, function(unit, count) {
          this._setCount(unit, Math.max(0, (this.getCount(unit) || 0) - count));
        }.bind(this));
      },
      _clear: function clear() {
        this.units = {};
      },
      getCount: function getCount(unit) {
        return this.units[unit];
      },
      getCounts: function getCounts() {
        return this.units;
      },
      getCargoSize: function getCargoSize() {
        var cargoSize = 0;
        $.each(this.units, function addCargoSize(unit, count) {
          cargoSize += Constants.UnitData[unit].cargoSize * count;
        });
        return cargoSize;
      },
    });
    
    function TrainingBatch(type, completionTime, units) {
      this._ikaToolsType = 'trainingBatch';
      
      this.type = type;
      this.units = units;
      this.completionTime = completionTime;
    }
    
    $.extend(TrainingBatch.prototype, {
      getUnits: function getUnits() {
        return this.units;
      },
      getCompletionTime: function getCompletionTime() {
        return this.completionTime;
      },
      _getType: function getType() {
        return this.type;
      },
    });
    
    function City(id, type) {
      this._ikaToolsType = 'city';
      
      if (id) {
        this.id = id;
        this.type = type;
        
        this.level = 0;

        this.resources = {
          wood: new City.Resource(this),
          wine: new City.Resource(this),
          marble: new City.Resource(this),
          glass: new City.Resource(this),
          sulfur: new City.Resource(this),
        };

        this.buildings = new Array(Constants.GamePlay.BUILDING_SPOTS);
        for (var i = 0; i < Constants.GamePlay.BUILDING_SPOTS; i++) {
          this.buildings[i] = new City.Building(this);
        }
        this.military = new Military();
        
        this.actionPoints = 0;
        this.scientists = 0;
        this.culturalGoods = 0;
        this.priests = 0;
        this.tavernWineLevel = 0;
        this.population = undefined;
        
        this.resourceUpdateTime = 0;
        this.islandCoordinates = undefined;
      }
    }
      
    $.extend(City.prototype, {
      _postLoad: function postLoad() {
        while (this.buildings.length < Constants.GamePlay.BUILDING_SPOTS) {
           this.buildings.push(new City.Building(this));
        }
        for (var i = 0; i < Constants.GamePlay.BUILDING_SPOTS; i++) {
          this.buildings[i]._setCity(this);
        }
        if (this.isOwn()) {
          this.resources[Constants.Resources.WOOD]._setCity(this);
          this.resources[Constants.Resources.WINE]._setCity(this);
          this.resources[Constants.Resources.MARBLE]._setCity(this);
          this.resources[Constants.Resources.GLASS]._setCity(this);
          this.resources[Constants.Resources.SULFUR]._setCity(this);
        }
        this.military._setCity(this);
      },
      _updateFromGlobalData: function _updateFromGlobalData(data, correctWineConsumption) {
        var changes = [];
        this._updateActionPoints(data.maxActionPoints, changes);
        
        if (this.isOwn()) {                
          var wineConsumption = data.wineSpendings;
          var baseWineConsumption = data.wineSpendings;
          
          var winePress = this.getBuildingByType(Constants.Buildings.WINE_PRESS);
          if (correctWineConsumption) {
            if (winePress) {
              wineConsumption = wineConsumption * (100 - winePress.getLevel()) / 100;
            }
          } else {
            if (winePress) {
              baseWineConsumption = Math.floor(
                  wineConsumption / (100 - winePress.getLevel()) * 100);
            }
          }
          
          var use = Constants.BuildingData[Constants.Buildings.TAVERN].wineUse;
          for (var i = 0; i < 48; i++) {
            if (use[i] >= baseWineConsumption) {
              this._updateTavernWineLevel(i, changes);
              break;
            }
          }
          
          this._updateResources(data.currentResources, 
                                data.maxResources,
                                data.resourceProduction,
                                data.tradegoodProduction,
                                wineConsumption / Constants.Time.SECONDS_PER_HOUR,
                                changes);
        }
        
        raiseResourcesChanged(changes);
      },
      _updateFromBackgroundData: function _updateFromBackgroundData(data) {
        this.islandId = parseInt(data.islandId);
        if (this.isOwn()) {
          this._updateBuildings(data.position);
        }
      },
      _updateBuildings: function _updateBuildings(buildingsData) {
        var changes = [];
        for (var i = 0; i < Constants.GamePlay.BUILDING_SPOTS; i++) {
          var building = this.buildings[i];
          if (buildingsData[i]) {
            if (building._update(i, buildingsData[i])) {
              changes.push({
                city: this,
                building: building,
                type: Constants.BuildingEventType.DATA_REFRESH,
              });
            }
          }
        }
        this.level = this.buildings[0].getLevel();
        raiseBuildingsChanged(changes);
      },
      _updateResources: function updateResources(
          currentInfo, maxInfo, woodProduction, resourceProduction, wineConsumption,
          changedAccumulator) {
        this._updateResource(Constants.Resources.WOOD, 
            changedAccumulator,
            currentInfo["resource"],

            woodProduction);
        this._updateResource(Constants.Resources.WINE,
            changedAccumulator,
            currentInfo["1"],
            this.getTradeGoodType() == Constants.Resources.WINE ? 
                resourceProduction : undefined,
            wineConsumption);
        this._updateResource(Constants.Resources.MARBLE,
            changedAccumulator,
            currentInfo["2"], 
            this.getTradeGoodType() == Constants.Resources.MARBLE ? 
                resourceProduction : undefined);
        this._updateResource(Constants.Resources.GLASS,
            changedAccumulator,
            currentInfo["3"], 
            this.getTradeGoodType() == Constants.Resources.GLASS ? 
                resourceProduction : undefined);
        this._updateResource(Constants.Resources.SULFUR,
            changedAccumulator,
            currentInfo["4"], 
            this.getTradeGoodType() == Constants.Resources.SULFUR ? 
                resourceProduction : undefined);
        this._updatePopulation(currentInfo.population, changedAccumulator);
        
        this.resourceUpdateTime = View.gameTimeNow();
      },
      _updateResource: function updateResource(
          name, changedAccumulator, current, max, production, consumption) {
        var resource = this.resources[name];
        if (resource._update(current, max, production, consumption)) {
          changedAccumulator.push({
            city: this,
            type: name,
            value: resource,
          });
        }
      },
      _incrementResource: function incrementResource(name, changedAccumulator, delta) {
        var resource = this.resources[name];
        if (delta) {
          resource._increment(delta);
          changedAccumulator.push({
            city: this,
            type: name,
            value: resource,
          });
        }
      },
      _updateActionPoints: function updateActionPoints(actionPoints, changedAccumulator) {
        if (this.actionPoints != actionPoints) {
          changedAccumulator.push({
            city: this,
            type: Constants.Resources.ACTION_POINTS,
            value: actionPoints,
          });
        }
        this.actionPoints = actionPoints;
      },
      _updateActionPointsBy: function updateActionPointsBy(delta, changedAccumulator) {
        this._updateActionPoints(
            Math.max(0, Math.min(this.actionPoints + delta, this.getMaxActionPoints())), 
            changedAccumulator);
      },
      _updateScientists: function updateScientists(scientists, changedAccumulator) {
        if (this.scientists != scientists) {
          changedAccumulator.push({
            city: this,
            type: Constants.Resources.SCIENTISTS,
            value: scientists,
          });
        }
        this.scientists = scientists;
      },
      _updateTavernWineLevel: function updateTavernWineLevel(level, changedAccumulator) {
        if (this.tavernWineLevel != level) {
          changedAccumulator.push({
            city: this,
            type: Constants.Resources.TAVERN_WINE_LEVEL,
            value: level,
          });
        }
        this.tavernWineLevel = level;
      },
      _updateCulturalGoods: function updateCulturalGoods(culturalGoods, changedAccumulator) {
        if (this.culturalGoods != culturalGoods) {
          changedAccumulator.push({
            city: this,
            type: Constants.Resources.CULTURAL_GOODS,
            value: culturalGoods,
          });
        }
        this.culturalGoods = culturalGoods;
      },
      _updatePopulation: function updatePopulation(population, changedAccumulator) {
        if (Math.abs(this.getPopulationData().population - population) >= 1) {
          changedAccumulator.push({
            city: this,
            type: Constants.Resources.POPULATION,
            value: population,
          });
        }
        this.population = population;
      },
      _updatePriests: function updatePriests(priests, changedAccumulator) {
        if (this.priests != priests) {
          changedAccumulator.push({
            city: this,
            type: Constants.Resources.PRIESTS,
            value: priests,
          });
        }
        this.priests = priests;
      },
      
      getLastResourceUpdate: function getLastResourceUpdate() {
        return this.resourceUpdateTime;
      },
      
      getTimeSinceResourceUpdate: function getTimeSinceLastResourceUpdate() {
        return View.gameTimeNow() - this.resourceUpdateTime;
      },
      
      isOwn: function isOwn() {
        return this.type == Constants.CityType.OWN;
      },      
      isDeployment: function isDeployment() {
        return this.type == Constants.CityType.DEPLOYMENT;
      },
      isOccupation: function isOccupation() {
        return this.type == Constants.CityType.OCCUPATION;
      },
      getType: function getType() {
        return this.type;
      },
      
      getBuildingByPosition: function getBuildingByPosition(position) {
        return this.buildings[position];
      },
      getBuildingsByType: function getBuildingsByType(type) {
        return this.buildings.filter(function buildingsFilter(building) {
          return building.getType() == type;
        });
      },
      getBuildingByType: function getBuildingByType(type) {
        for (var i = 0; i < Constants.GamePlay.BUILDING_SPOTS; i++) {
          var building = this.buildings[i];
          if (building && building.getType() == type) {
            return building;
          }
        }
        return null;
      },
      getBuildings: function getBuildings() {
        return this.buildings;
      },
      getMilitary: function getMilitary() {
        return this.military;
      },
      getId: function getId() {
        return this.id;
      },
      getName: function getName() {
        return this.name;
      },
      getIslandId: function getIslandId() {
        return this.islandId;
      },
      getTradeGoodType: function getTradeGoodType() {
        return this.tradeGoodType;
      },
      getActionPoints: function getActionPoints() {
        return this.actionPoints;
      },
      getMaxActionPoints: function getMaxActionPoints() {
        return 3 + Math.floor(this.level / 4) - (this.isOwn() ? 0 : 2);
      },
      getCulturalGoods: function getCulturalGoods() {
        return this.culturalGoods;
      },
      getTavernWineLevel: function getTavernWineLevel() {
        return this.tavernWineLevel;
      },
      getPopulationData: function getPopulationData() {
        var max = 0;
        var happiness = 196;
        
        var townHall = this.getBuildingByType(Constants.Buildings.TOWN_HALL);
        var temple = this.getBuildingByType(Constants.Buildings.TEMPLE);
        var palace = this.getBuildingByType(Constants.Buildings.PALACE);
        var tavern = this.getBuildingByType(Constants.Buildings.TAVERN);
        var museum = this.getBuildingByType(Constants.Buildings.MUSEUM);
        var civData = getCivilizationData();
        
        if (townHall) {
          // Formula from http://ikariam.wikia.com/wiki/Citizen
          max += Math.floor(10 * Math.pow(townHall.getLevel(), 1.5)) * 2 + 40;

        }
        
        if (civData.hasResearched(Constants.Research.Economy.HOLIDAY)) {
          max += 50;
          happiness += 25;
        }
        if (civData.hasResearched(Constants.Research.Economy.ECONOMIC_FUTURE)) {
          var level = civData.getResearchLevel(Constants.Research.Economy.ECONOMIC_FUTURE);
          max += 20 * level;
          happiness += 10 * level;
        }
        if (palace) {
          if (civData.hasResearched(Constants.Research.Science.WELL_CONSTRUCTION)) {
            max += 50;
            happiness += 50;
          }
          if (civData.hasResearched(Constants.Research.Economy.UTOPIA)) {
            max += 200;
            happiness += 200;
          }
        }
        
        if (tavern) {
          happiness += 12 * tavern.getLevel();
        }
        happiness += Constants.GamePlay.HAPPINESS_PER_WINE_SERVING_LEVEL * 
            this.getTavernWineLevel();
        
        if (museum) {
          happiness += 20 * museum.getLevel();
        }
        happiness += Constants.GamePlay.HAPPINESS_PER_CULTURAL_GOOD * this.getCulturalGoods();
        
        var government = civData.getGovernment();
        if (government == Constants.Government.DEMOCRACY) {
          happiness += 75;
        } else if (government == Constants.Government.DICTATORSHIP) {
          happiness -= 75;
        } else if (government == Constants.Government.THEOCRACY) {
          if (temple) {
            happiness += Math.min(150, this.getPriests() * 5 / max * 100 * 2);
          } else {
            happiness -= 20;
          }
        }
        
        happiness = happiness * (1 - this.getCorruption());
        
        var happinessDelta = happiness - this.population;
        var currentPopulation = this.population + 
            happinessDelta * (1 - Math.pow(Math.E, 
                -(this.getTimeSinceResourceUpdate() / 50 / Constants.Time.MILLIS_PER_HOUR)));
        
        var population = Math.min(currentPopulation, max);
        return {
          population: population,
          max: max,
          happiness: happiness - population,
          growth: max == population && happiness > (population - 1)
              ? 0 : (happiness - population) / 50,
        };
      },
      getCorruption: function getCorruption() {
        var palace = this.getBuildingByType(Constants.Buildings.GOVERNORS_RESIDENCE) ||
            this.getBuildingByType(Constants.Buildings.PALACE);
        var level = palace ? palace.getLevel() : 0;
        var corruption = 1 - (level + 1) / getOwnCities().length;
        
        var government = getCivilizationData().getGovernment();
        if (government == Constants.Government.ARISTOCRACY || 
            government == Constants.Government.OLIGARCHY) {
          corruption += .03;
        } else if (government == Constants.Government.NOMOCRACY) {
          corruption -= .05;
        } else if (government == Constants.Government.ANARCHY) {
          corruption += .25;
        }
        
        return Math.min(Math.max(corruption, 0), 1);
      },
      getScientists: function getScientists() {
        return this.scientists;
      },
      getResearch: function getResearch() {
        var civData = getCivilizationData();
        var multiplier = 1.0;
        
        multiplier += civData.hasResearched(
            IkaTools.Constants.Research.Science.PAPER) ? .02 : 0;
        multiplier += civData.hasResearched(
            IkaTools.Constants.Research.Science.INK) ? .04 : 0;
        multiplier += civData.hasResearched(
            IkaTools.Constants.Research.Science.MECHANICAL_PEN) ? .08 : 0;
        multiplier += (civData.getResearchLevel(
            IkaTools.Constants.Research.Science.SCIENTIFIC_FUTURE) || 0) * .02;
        multiplier -= this.getCorruption();
        
        return this.scientists * multiplier;
      },

      getResource: function getResource(resourceName) {
        return this.resources[resourceName];
      },
      getResourceCapacity: function getResourceMaximumCapacity() {
        var total = 1500;
        var safe = 100;
        
        $.each(this.getBuildingsByType(Constants.Buildings.WAREHOUSE), function(i, building) {
          total += 8000 * building.getLevel();
          safe += 480 * building.getLevel();
        });
        var dump = this.getBuildingByType(Constants.Buildings.DUMP);
        if (dump) {
          total += 32000 * dump.getLevel();
        }
        
        var civilizationData = getCivilizationData();
        if (civilizationData.isPremiumFeatureEnabled(
            Constants.PremiumFeatures.DOUBLED_STORAGE_CAPACITY)) {
          total *= 2;
        }
        if (civilizationData.isPremiumFeatureEnabled(
            Constants.PremiumFeatures.DOUBLED_SAFE_CAPACITY)) {
          safe *= 2;
        }
        
        return {
          maximum: total,
          safe: safe,
        };
      },
      getIslandCoordinates: function getIslandCoordinates() {
        return this.islandCoordinates;
      },
      getLoadingSpeed: function getLoadingSpeed() {
        var speed = 10;
        var ports = this.getBuildingsByType(Constants.Buildings.TRADING_PORT);
        if (ports[0]) {
          speed = Constants.BuildingData[Constants.Buildings.TRADING_PORT]
              .loadingSpeed[ports[0].getLevel()];
        }
        if (ports[1]) {
          speed += Constants.BuildingData[Constants.Buildings.TRADING_PORT]
              .loadingSpeed[ports[1].getLevel()];
        }
        return speed / Constants.Time.SECONDS_PER_MINUTE;
      },
      getPriests: function getPriests() {
        return this.priests;
      },
    });
    
    City.Resource = function City_Resource(city) {
      this._ikaToolsType = 'cityResource';
      this._setCity(city);
    }
      
    $.extend(City.Resource.prototype, {
      _setCity: function setCity(city) {
        if (city) {
          this.city = Utils.fixedFunction(city);
        }
      },
      _update: function _update(current, production, consumption) {
        var changed = 
             Math.abs(current - this.getCurrent()) > 3 || 
             this.production != production ||
             this.consumption != consumption;
        
        this.current = current;
        this.production = production;
        this.consumption = consumption;
        
        return changed;
      },
      _increment: function _increment(delta) {
        this.current = Math.max(this.current + delta, 0);
      },
      getCurrent: function getCurrent() {
        if (this.current === undefined) {
          return undefined;
        }
        
        var current = this.current;
        var now = View.gameTimeNow();
        var max = this.city().getResourceCapacity().maximum;
        var lastUpdate = this.city().getLastResourceUpdate();
        
        if (this.production) {
          current += this.production * (now - lastUpdate) / 
              Constants.Time.MILLIS_PER_SECOND;
        }
        if (this.consumption) {

          // Wine use takes place on the hour.
          var startHour = Math.floor(lastUpdate / Constants.Time.MILLIS_PER_HOUR);
          var nowHour = Math.floor(now / Constants.Time.MILLIS_PER_HOUR);
          current -= 

              this.consumption * Constants.Time.SECONDS_PER_HOUR * (nowHour - startHour);
        }
        return Math.max(0, Math.min(max, current));
      },
      
      /**
       * In milliseconds.
       */
      getTimeUntilFull: function getTimeUntilFull() {
        var overallProduction = (this.production || 0) - (this.consumption || 0);
        if (this.current === undefined) {
          return Number.POSITIVE_INFINITY;
        } else {
          var current = this.getCurrent();
          var max = this.city().getResourceCapacity().maximum;
          var production = this.production;
          
          if (overallProduction > 0) {
            var secondsToNextHour = (Constants.Time.MILLIS_PER_HOUR - 
                 (View.gameTimeNow() % Constants.Time.MILLIS_PER_HOUR)) /
                 Constants.Time.MILLIS_PER_SECOND;
            var atNextHour = current + secondsToNextHour * production;

            if (atNextHour >= max) {
              return (max - current) / production * Constants.Time.MILLIS_PER_SECOND;
            } else {
              var hours = Math.floor(
                  (max - atNextHour) / overallProduction / Constants.Time.SECONDS_PER_HOUR);
              var atHours = atNextHour + overallProduction * hours * Constants.Time.SECONDS_PER_HOUR;
              return (secondsToNextHour + 
                      hours * Constants.Time.SECONDS_PER_HOUR + 
                      (max - atHours) / production) * Constants.Time.MILLIS_PER_SECOND;
            }
          } else if (this.current && this.getCurrent() == max) {
            // No production, but filled exactly to capacity
            return 0;
          } else {
            return Number.POSITIVE_INFINITY;
          }
        }
      },
      
      /**
       * In milliseconds.
       */
      getTimeUntilEmpty: function getTimeUntilEmpty() {
        if (this.current === undefined) {
          return Number.POSITIVE_INFINITY;
        } else if (this.consumption) {
          if (this.production > this.consumption) {
            // Could run out in first hour, but nobody is going to run their empire that 
            // way so it's not worth the effort of calculating.
            return Number.POSITIVE_INFINITY;
          } else {
            // Wine use takes place on the hour.
            var current = this.getCurrent();
            var production = this.production || 0;
            
            var secondsToNextHour = (Constants.Time.MILLIS_PER_HOUR - 
               (View.gameTimeNow() % Constants.Time.MILLIS_PER_HOUR)) / 
               Constants.Time.MILLIS_PER_SECOND;
            // Compute to end of next hour
            var atNextHour = current - this.consumption * Constants.Time.SECONDS_PER_HOUR + 
                production * secondsToNextHour;
            if (atNextHour <= 0) {
              return secondsToNextHour * Constants.Time.MILLIS_PER_SECOND;
            } else {
              var hourlyDiff = 
                  (this.consumption - production) * Constants.Time.SECONDS_PER_HOUR;
              return Constants.Time.MILLIS_PER_SECOND * (secondsToNextHour + 
                  Math.ceil(atNextHour / hourlyDiff) * Constants.Time.SECONDS_PER_HOUR);
            }
          }
        }
        return Number.POSITIVE_INFINITY;
      },
      
      getCapacity: function getCapacity() {
        return this.city().getResourceCapacity();
      },

      getProduction: function getProduction() {
        return this.production;
      },
      
      getConsumption: function getConsumption() {
        return this.consumption;
      },
    });

    City.Building = function City_Building(city) {
      this._ikaToolsType = 'building';
      this._setCity(city);

      this.position = null;
      this.type = null;
      this.level = 0;
    }
    
    $.extend(City.Building.prototype, {
      _setCity: function setCity(city) {
        if (city) {
          this.city = Utils.fixedFunction(city);
          this._scheduleUpgradeComplete();
        }
      },
      _update: function _update(position, data) {
        this.position = position;
        var changed = false;
        
        if (data.building.indexOf('buildingGround') >= 0) {
          changed = !this.isEmpty();
          
          this.type = '';
          delete this.level;
          delete this.completionTime;
        } else {
          var type = data.building.split(' ')[0];
          var level = parseInt(data.level);
          var isUpgrading = 'completed' in data;
          
          changed = (type != this.getType() || 
                     level != this.getLevel() || 
                     isUpgrading != this.isUpgrading());
          
          this.type = type;
          this.level = level;
          if (isUpgrading) {
            var completionTime = parseInt(data.completed) * 1000;
            if (this.completionTime != completionTime) {
              this.completionTime = completionTime;
              this._scheduleUpgradeComplete();
            }
          } else {
            delete this.completionTime;
          }
        }

        return changed;
      },
      _scheduleUpgradeComplete: function _scheduleUpgradeComplete() {
        if (this.upgradeEvent) {
          this.upgradeEvent();
        }
        if (this.completionTime) {
          if (this.completionTime <= View.gameTimeNow()) {
            this.level = this.level + 1;
            delete this.completionTime;
            raiseBuildingsChanged([{
              city: this.city(),
              building: this,
              type: Constants.BuildingEventType.UPGRADE_COMPLETE,
            }]);
          } else {
            this.upgradeEvent = buildingsChangedEvent().scheduleSend(
                this.type + "->" + (this.level + 1),
                // 0.5.0 still does a full page refresh if you're viewing the city when the 
                // building completes.  So we cheat a bit and send this event a few seconds
                // before it actually takes place so it doesn't get lost as part of a page 
                // refresh that just sees it as a normal "info_refresh" event.
                this.completionTime - View.gameTimeNow() + Constants.Time.SAFE_TIME_DELTA,
                function() {
                  this.level = this.level + 1;
                  delete this.completionTime;
                  empireData.saveAsync();
                }.bind(this),
                [{
                  city: this.city(),
                  building: this,
                  type: Constants.BuildingEventType.UPGRADE_COMPLETE,
                }]);
          }
        }
      },
      getPosition: function getPosition() {
        return this.position;
      },
      isEmpty: function isEmpty() {
        return !this.type;
      },
      getType: function getType() {
        return this.type;
      },
      getLevel: function getLevel() {
        return this.level;
      },
      isUpgrading: function isUpgrading() {
        return (this.completionTime > View.gameTimeNow());
      },
      getRemainingUpgradeTime: function getRemainingUpgradeTime() {
        var diff = this.completionTime - View.gameTimeNow();
        return Math.max(diff, 0);
      },
      getCompletionTime: function getCompletionTime() {
        return new Date(this.completionTime);
      },
      getUpgradeCosts: function getUpgradeCost() {

        var city = this.city();
        var civData = getCivilizationData();
        var buildingCostData = Constants.BuildingData[this.getType()];
        var level = this.getLevel() + (this.isUpgrading() ? 1 : 0);
        
        var timeParams = buildingCostData.time;
        var costs = {
          wood: buildingCostData.wood[level] || 0,
          wine: buildingCostData.wine[level] || 0,
          marble: buildingCostData.marble[level] || 0,
          glass: buildingCostData.glass[level] || 0,
          sulfur: buildingCostData.sulfur[level] || 0,
          time: Math.round(timeParams.a / timeParams.b * 
              Math.pow(timeParams.c, level+1) - timeParams.d) * 1000,
        };
        
        var multiplier = 1.0;
        multiplier -= civData.hasResearched(Constants.Research.Economy.PULLEY) ? .02 : 0;
        multiplier -= civData.hasResearched(Constants.Research.Economy.GEOMETRY) ? .04 : 0;
        multiplier -= civData.hasResearched(Constants.Research.Economy.SPIRIT_LEVEL) ? .08 : 0;
        
        var carpenter = city.getBuildingByType(Constants.Buildings.CARPENTER);
        var winePress = city.getBuildingByType(Constants.Buildings.WINE_PRESS);
        var architect = city.getBuildingByType(Constants.Buildings.ARCHITECT);
        var optician = city.getBuildingByType(Constants.Buildings.OPTICIAN);
        var fireworker = city.getBuildingByType(Constants.Buildings.FIREWORK_TEST_AREA);
        
        
        return {
          wood: costs.wood * (multiplier - (carpenter ? carpenter.getLevel() / 100 : 0)),
          wine: costs.wine * (multiplier - (winePress ? winePress.getLevel() / 100 : 0)),
          marble: costs.marble * (multiplier - (architect ? architect.getLevel() / 100 : 0)),
          glass: costs.glass * (multiplier - (optician ? optician.getLevel() / 100 : 0)),
          sulfur: costs.sulfur * (multiplier - (fireworker ? fireworker.getLevel() / 100 : 0)),
          time: costs.time,
        };
      },
      isMaxLevel: function isMaxLevel() {
        return (this.getLevel() + (this.isUpgrading() ? 1 : 0)) >= 
            Constants.BuildingData[this.getType()].maxLevel;
      },
    });
    
    CivilizationData = function CivilizationData() {
      this._ikaToolsType = 'civilizationData';

      this.research = {};
      this.government = 'ikakratie';
      this.movements = {};
      this.premiumFeatures = {};
    }
    
    $.extend(CivilizationData.prototype, {
      _startMovementTimers: function _startMovementTimers() {
        $.each(this.movements, function updateMovementsOnLoad(id, movement) {
          if (movement._updateAndStartTimer()) {
            delete this.movements[id];
          }
        }.bind(this));
      },
      _updateGovernment: function updateGovernment(government, changedAccumulator) {
        if (this.government != government) {
          changedAccumulator.push({
            type: Constants.CivilizationData.GOVERNMENT,
            government: government,
          });

        }
        this.government = government;
      },
      _updateResearch: function updateResearch(researchId, level, changedAccumulator) {
        var oldResearch = this.research[researchId];
        if (!oldResearch || oldResearch.level != level) {
          changedAccumulator.push({
            type: Constants.CivilizationData.RESEARCH,
            id: researchId,
            level: level,
          });
        }
        this.research[researchId] = { level: level };
      },
      _updateMovement: function updateMovement(movement, changedAccumulator) {
        var existing = this.movements[movement.getId()];
        if (existing) {
          existing._cancelTimer();
        }
        this.movements[movement.getId()] = movement;
        movement._updateAndStartTimer();
        if (!existing || (movement.getCompletionTime() != existing.getCompletionTime())) {
          changedAccumulator.push({
            movement: movement,
            type: Constants.Movements.EventType.DATA_UPDATED,
          });
        }
      },
      _removeMovement: function removeMovement(movementId, changedAccumulator) {
        var movement = this.movements[movementId];
        if (movement) {
          if (movement.stage == Constants.Movements.Stage.LOADING && movementId >= 0) {
            var originCity = movement.getOriginCity();
            movement._updateCity(originCity, originCity);
          }
          movement._cancelTimer();
          delete this.movements[movementId];
          changedAccumulator.push({
            movement: movement,
            type: Constants.Movements.EventType.CANCELLED,
          });
        }
      },
      _updatePremiumFeature: function updatePremiumFeature(
          changedAccumulator, feature, enabled) {
        var currentlyEnabled = this.premiumFeatures[feature] || false;
        if (currentlyEnabled != enabled) {
          changedAccumulator.push({
            type: Constants.CivilizationData.PREMIUM_FEATURE,
            feature: feature,
            enabled: enabled,
          });
        }
        this.premiumFeatures[feature] = enabled;        
      },
      hasResearched: function hasResearched(researchId) {
        var research = this.research[researchId];
        return research ? research.level > 0 : undefined;
      },
      getResearchLevel: function getResearchLevel(researchId) {
        var research = this.research[researchId];
        return research ? research.level : undefined;
      },
      getGovernment: function getGovernment() {
        return this.government;
      },
      getMovements: function getMovements() {
        var movements = [];
        $.each(this.movements, function(id, movement) {
          movements.push(movement);
        });
        movements.sort(function compareMovements(m1, m2) {
          return m1.getArrivalTime() - m2.getArrivalTime();
        });
        return movements;
      },
      getMovement: function getMovement(movementId) {
        return this.movements[movementId];
      },
      isPremiumFeatureEnabled: function isPremiumFeatureEnabled(feature) {
        return this.premiumFeatures[feature];
      },
    });
    
    function calculateTravelTime(island1Coords, island2Coords, units, transporters) {
      // same island
      if (island1Coords[0] == island2Coords[0] && 
          island1Coords[1] == island2Coords[1]) {
        var baseTime = 10 * Constants.Time.MILLIS_PER_MINUTE;
        var multiplier = transporters ? 60 : 80; // fastest unit
        if (units) {
          $.each(units.getCounts(), function applyUnitSpeed(type, count) {
            if (count) {
              var data = Constants.UnitData[type];
              multiplier = Math.min(multiplier, data.speed);
            }
          });
        }
        return baseTime * 60 / multiplier;
      } else {
        var baseTime = 20 * Math.sqrt(Math.pow(island1Coords[0] - island2Coords[0], 2) + 
                                      Math.pow(island1Coords[1] - island2Coords[1], 2)) *
                       Constants.Time.MILLIS_PER_MINUTE;
        var multiplier = 60; // fastest ship
        if (units) {
          $.each(units.getCounts(), function applyUnitSpeed(type, count) {
            if (count) {
              var data = Constants.UnitData[type];
              if (!data.isArmy) {
                multiplier = Math.min(multiplier, data.speed);
              }
            }
          });
        }
        return baseTime * 60 / multiplier;
      }
    }
    
    function Movement(
        id, type, completionTime, mission, stage, originCityId, targetCityId,
        transports, units, resources, transportTime) {
      this._ikaToolsType = 'movement';
      
      if (id) {
        this.id = id;
        this.completionTime = completionTime;
        this.mission = mission;
        this.stage = stage;
        this.originCityId = originCityId;
        this.targetCityId = targetCityId;
        this.units = units;
        this.transports = transports;
        this.resources = resources;

        this.transportTime = transportTime;

        this.type = type;
        
        var originCity = this.getOriginCity();
        var targetCity = this.getTargetCity();

        if (originCity && targetCity) {
          var originCoords = originCity.getIslandCoordinates();
          var targetCoords = targetCity.getIslandCoordinates();

          if (originCoords && targetCoords) {
            this.transportTime = calculateTravelTime(
                originCoords, targetCoords, this.units, this.transports);
          }
        }
        
        if (!this.transportTime) {
          this.transportTime = Number.POSITIVE_INFINITY;
        }
        
        if (this.completionTime <= new Date().getTime()) {
          this._toNextStage();
        }
      }
    }
    
    $.extend(Movement.prototype, {
      _cancelTimer: function cancelTimer() {
        if (this.completionEvent) {
          this.completionEvent();
        }
      },
      _startTimer: function startTimer() {
        var remainingTime = this.getTimeRemaining();
        if (isFinite(remainingTime)) {
          this.completionEvent = movementsChangedEvent().scheduleSend(
              'Movement[' + this.id + ']',
              remainingTime + Constants.Time.SAFE_TIME_DELTA,
              function moveToNextStage() {
                if (this._toNextStage()) {
                  getCivilizationData()._removeMovement(this.id, []);
                }
                empireData.saveAsync();
              }.bind(this),
              [{
                previousStage: this.getStage(),
                movement: this,
                type: this._isFinalStage() ? 
                    Constants.Movements.EventType.COMPLETED :
                    Constants.Movements.EventType.STAGE_CHANGED,
              }]);
        }
      },
      _updateCity: function updateCity(city, originCity) {
        var resourceChanges = [];
        if (city) {
          if (originCity) {
            originCity._updateActionPointsBy(1, resourceChanges);
          }
          if (city.isOwn() && 
              (this.mission == Constants.Movements.Mission.TRANSPORT ||
               this.mission == Constants.Movements.Mission.PLUNDER)) {
            $.each(this.resources, function updateCityResource(name, value) {
              city._incrementResource(name, resourceChanges, value);
            });
          }
          raiseResourcesChanged(resourceChanges);
          
          if (this.mission == Constants.Movements.Mission.DEPLOY_ARMY ||
              this.mission == Constants.Movements.Mission.DEPLOY_NAVY) {
            var military = city.getMilitary();
            military._increment(this.units);
            raiseMilitaryChanged([{
              military: military,
              city: city,
              type: 'deployment_arrived',
            }]);
          }
        }
      },
      _updateAndStartTimer: function updateAndStartTimer() {
        this._cancelTimer();
        
        if (this.completionTime <= View.gameTimeNow()) {
          return this._toNextStage();
        } else {
          this._startTimer();
        }
      },
      _toNextStage: function toNextStage() {
        var isFinalStage = this._isFinalStage();
        if (this.stage == Constants.Movements.Stage.LOADING) {
          this.stage = Constants.Movements.Stage.EN_ROUTE;
          this.completionTime += this.transportTime;
          this._startTimer();
        } else if (this.stage == Constants.Movements.Stage.EN_ROUTE) {
          if (isFinalStage) {
            this._updateCity(this.getTargetCity(), this.getOriginCity());
          }
        } else if (this.stage == Constants.Movements.Stage.RETURNING) {
          if (isFinalStage) {
            var originCity = this.getOriginCity();
            this._updateCity(originCity, originCity);
          }
        }
        return isFinalStage;
      },
      _isFinalStage: function isFinalStage() {
        if (this.stage == Constants.Movements.Stage.LOADING) {
          return false;
        } else if (this.stage == Constants.Movements.Stage.EN_ROUTE) {
          if (this.mission == Constants.Movements.Mission.TRANSPORT) {
            var city = getCity(this.targetCityId);
            return city && city.isOwn();
          } else if (this.mission == Constants.Movements.Mission.DEPLOY_ARMY ||
                     this.mission == Constants.Movements.Mission.DEPLOY_NAVY) {
            return true;
          }
        } else {
          return true;
        }
      },
      getId: function getId() {
        return this.id;
      },
      getMission: function getMission() {
        return this.mission;
      },
      getStage: function getStage() {
        return this.stage;
      },
      getOriginCityId: function getOriginCityId() {
        return this.originCityId;
      },
      getTargetCityId: function getTargetCityId() {
        return this.targetCityId;
      },
      getOriginCity: function getOriginCity() {
        return this.originCityId && getCity(this.originCityId);
      },
      getTargetCity: function getTargetCity() {
        return this.targetCityId && getCity(this.targetCityId);
      },
      getCompletionTime: function getCompletionTime() {
        return this.completionTime;
      },
      getTimeRemaining: function getTimeRemaining() {
        return this.completionTime - View.gameTimeNow();
      },
      getArrivalTime: function() {
        var time = this.getCompletionTime();
        if (this.stage == Constants.Movements.Stage.LOADING) {
          time += this.transportTime;
        }
        return time;
      },        
      getUnits: function getUnits() {
        return this.units;
      },
      getResource: function getResource(resourceName) {
        return this.resources[resourceName];
      },
      isHostile: function isHostile() {
        return this.type.indexOf('hostile') >= 0;
      },
      isOwn: function isOwn() {
        return this.type.indexOf('own') >= 0;
      }
    });
    
    var empireData = new Data.Value(
        'empireData', 

        { 
          cities: {}, 
          cityOrder: [],
          civilizationData: new CivilizationData(),
        }, 
        {
          reviver: function empireDataReviver(key, value) {
            if (value && value._ikaToolsType) {
              var obj;
              switch(value._ikaToolsType) {
                case 'city': obj = new City(); break;
                case 'building': obj = new City.Building; break;
                case 'cityResource': obj = new City.Resource(); break;
                case 'military': obj = new Military(); break;
                case 'militaryUnits': obj = new MilitaryUnits(); break;
                case 'trainingBatch': obj = new TrainingBatch(); break;
                case 'civilizationData': obj = new CivilizationData(); break;
                case 'movement': obj = new Movement(); break;
              }
              $.extend(obj, value);
              if (obj._postLoad) {
                obj._postLoad();
              }
              return obj;
            }
            return value;
          },
          version: 28,
          loadCallback: function empireDataLoaded() {
            getCivilizationData()._startMovementTimers();
          },
        });
        
    function raiseCivilizationDataChanged(changes) {
      if (changes.length) {
        civilizationDataChangedEvent().send(changes);
      }
    }

    var civilizationDataChangedEvent = Utils.thunk(function() {
      return new Utils.EventDispatcher();
    });
        
    function registerCivilizationDataChangedHandler(callback) {
      return civilizationDataChangedEvent().addListener(callback);
    }
    
    function raiseMovementsChanged(changes) {
      if (changes.length) {
        movementsChangedEvent().send(changes);
      }
    }
    
    var movementsChangedEvent = Utils.thunk(function() {
      return new Utils.EventDispatcher();
    });
    
    function registerMovementsChangedHandler(callback) {
      return movementsChangedEvent().addListener(callback);
    }

    function raiseResourcesChanged(changes) {
      if (changes.length) {
        resourcesChangedEvent().send(changes);
      }
    }
        
    var resourcesChangedEvent = Utils.thunk(function() {
      return new Utils.EventDispatcher();
    });
    
    function registerResourcesChangedHandler(callback) {
      return resourcesChangedEvent().addListener(callback);
    }
        
    var buildingsChangedEvent = Utils.thunk(function() {
      var dispatcher = new Utils.EventDispatcher();
      return dispatcher;
    });
    
    function raiseBuildingsChanged(changes) {
      if (changes.length) {
        buildingsChangedEvent().send(changes);
      }
    }
        
    function registerBuildingsChangedHandler(callback) {
      return buildingsChangedEvent().addListener(callback);
    }
    
    var militaryChangedEvent = Utils.thunk(function() {
      var dispatcher = new Utils.EventDispatcher();
      return dispatcher;
    });
    
    function raiseMilitaryChanged(changes) {
      if (changes.length) {
        militaryChangedEvent().send(changes);
      }
    }
    
    function registerMilitaryChangedHandler(callback) {
      return militaryChangedEvent().addListener(callback);
    };

    var TRADE_GOOD_LOOKUP = {
      "1": Constants.Resources.WINE,
      "2": Constants.Resources.MARBLE,
      "3": Constants.Resources.GLASS,
      "4": Constants.Resources.SULFUR,
    };
    
    function getCity(id) {
      return empireData.get().cities[id];
    };
    
    var coordsRegex = /\[(\d+):(\d+)\]/;
    function parseCoordinates(coords) {
      var match = coords.match(coordsRegex);
      return [parseInt(match[1]), parseInt(match[2])];
    }
    
    function processTransportForm(form) {
      var city = View.getCurrentCity();
      
      var transports = parseInt($('#transporterCount').val()) || 0;
      var resources = {};
      resources[Constants.Resources.WOOD] = 
          parseInt($('#textfield_wood').val()) || 0;
      resources[Constants.Resources.WINE] = 
          parseInt($('#textfield_wine').val()) || 0;
      resources[Constants.Resources.MARBLE] = 
          parseInt($('#textfield_marble').val()) || 0;
      resources[Constants.Resources.GLASS] = 
          parseInt($('#textfield_glass').val()) || 0;
      resources[Constants.Resources.SULFUR] = 
          parseInt($('#textfield_sulfur').val()) || 0;
      if ($('#createColony').length) {
        resources[Constants.Resources.WOOD] += 1250;
      }
          
      var destinationCityId = parseInt($(form.elements['destinationCityId']).val());
          
      var totalResources = 
          resources[Constants.Resources.WOOD] + 
          resources[Constants.Resources.WINE] + 
          resources[Constants.Resources.MARBLE] + 
          resources[Constants.Resources.GLASS] + 
          resources[Constants.Resources.SULFUR];
          
      var loadingCompletion = View.gameTimeNow() + 
          (totalResources / city.getLoadingSpeed() * Constants.Time.MILLIS_PER_SECOND);

      var movement = new Movement(
          -(new Date().getTime()),
          'own', 
          loadingCompletion, //TODO: multiple loads from same town (if own) stack
          Constants.Movements.Mission.TRANSPORT, 
          Constants.Movements.Stage.LOADING, 
          city.getId(),
          destinationCityId,
          transports, 
          new MilitaryUnits(), 
          resources
          // TODO: transport time for towns other than one's that are tracked
          );
      
      View.registerNextIkariamAjaxRequestCallback(function saveTransportData(response) {
        Utils.iterateIkariamAjaxResponse(response, 
            function lookForSuccessFeedback(index, name, data) {
              if (name == Constants.IkariamAjaxResponseType.PROVIDE_FEEDBACK &&
                  data[0].type == 10) {
                var changes = [];
                getCivilizationData()._updateMovement(movement, changes);
                raiseMovementsChanged(changes);
              }
            });
      });
    }
    
    function coordinatesEqual(coordinates1, coordinates2) {
      if (!coordinates1 || !coordinates2) {
        return false;
      }
      return coordinates1[0] == coordinates2[0] && 
          coordinates1[1] == coordinates2[1];
    }
    
    function processDeploymentForm(form) {
      var city = View.getCurrentCity();
      
      var transports = parseInt($('#transporterCount').html()) || 0;
      var mission = $(form.elements['function']).val() == 'deployArmy' ?
          Constants.Movements.Mission.DEPLOY_ARMY : Constants.Movements.Mission.DEPLOY_NAVY;
      var destinationCityId = parseInt($(form.elements['destinationCityId']).val());
      var destinationCity = getCity(destinationCityId);
      
      var units = new MilitaryUnits();
      
      $.each(Constants.UnitIds, function countDeployingUnits(id, type) {
        var elementId;
        if (Constants.UnitData[type].isArmy) {
          elementId = '#cargo_army_' + id;
        } else {
          elementId = '#cargo_fleet_' + id;
        }
        units._setCount(type, parseInt($(elementId).val()) || 0);
      });
      
      var cargoSize = units.getCargoSize();
      var loadingCompletion = new Date().getTime() + 
          (units.getCargoSize() / city.getLoadingSpeed() * Constants.Time.MILLIS_PER_SECOND);

      if (destinationCity && 
          coordinatesEqual(destinationCity.getIslandCoordinates(), 
                           city.getIslandCoordinates())) {
        loadingCompletion = new Date().getTime();
      }
      
      var movement = new Movement(
          -(new Date().getTime()),
          'own', 
          loadingCompletion, //TODO: multiple loads from same town (if own) stack
          mission, 
          Constants.Movements.Stage.LOADING, 
          city.getId(),
          destinationCityId,
          transports, 
          units, 
          {}
          // TODO: transport time for towns other than one's that are tracked
          );
      
      View.registerNextIkariamAjaxRequestCallback(function saveDeploymentData(response) {
          Utils.iterateIkariamAjaxResponse(response, 
              function lookForSuccessFeedback(index, name, data) {
                if (name == Constants.IkariamAjaxResponseType.PROVIDE_FEEDBACK &&
                    data[0].type == 10) {
                  var military = city.getMilitary();
                  military._decrement(units);
                  raiseMilitaryChanged([{
                    military: military,
                    city: city,
                    type: 'movement_started',
                  }]);
                  
                  var changes = [];
                  getCivilizationData()._updateMovement(movement, changes);
                  raiseMovementsChanged(changes);
                }
              });
      });
    }
    
    function processPlunderForm(form) {
      var city = View.getCurrentCity();
      var transports = parseInt($('#transporterCount').html()) || 0;
      var destinationCityId = parseInt($(form.elements['destinationCityId']).val());
      var destinationCity = getCity(destinationCityId);
      
      var units = new MilitaryUnits();
      $.each(Constants.UnitIds, function countDeployingUnits(id, type) {
        units._setCount(type, parseInt($('#cargo_army_' + id).val()) || 0);
      });
      
      var cargoSize = units.getCargoSize();
      var loadingCompletion = new Date().getTime() + 
          (units.getCargoSize() / city.getLoadingSpeed() * Constants.Time.MILLIS_PER_SECOND);
      if (destinationCity && 
          coordinatesEqual(destinationCity.getIslandCoordinates(), 
                           city.getIslandCoordinates())) {
        loadingCompletion = new Date().getTime();
      }
      
      var movement = new Movement(
          -(new Date().getTime()),
          'own', 
          loadingCompletion, //TODO: multiple loads from same town (if own) stack
          Constants.Movements.Mission.PLUNDER, 
          Constants.Movements.Stage.LOADING, 
          city.getId(),
          destinationCityId,
          transports, 
          units, 
          {}
          // TODO: transport time for towns other than one's that are tracked
          );
          
      View.registerNextIkariamAjaxRequestCallback(function savePlunderData(response) {
          Utils.iterateIkariamAjaxResponse(response, 
              function lookForSuccessFeedback(index, name, data) {
                if (name == Constants.IkariamAjaxResponseType.PROVIDE_FEEDBACK &&
                    data[0].type == 10) {
                  var military = city.getMilitary();
                  military._decrement(units);
                  raiseMilitaryChanged([{
                    military: military,
                    city: city,
                    type: 'movement_started',
                  }]);
                  
                  var changes = [];
                  getCivilizationData()._updateMovement(movement, changes);
                  raiseMovementsChanged(changes);
                }
              });
      });
    }
    
    function processCityMilitaryView(data) {
      var city = View.getCurrentCity();
      var military = city.getMilitary();
      
      var armyTds = $('#tabUnits').find('tr.count td');
      var e = false;
      e |= military._updatePresent(Constants.Military.HOPLITE, parseInt(armyTds[0].innerHTML));
      e |= military._updatePresent(Constants.Military.STEAM_GIANT, parseInt(armyTds[1].innerHTML));
      e |= military._updatePresent(Constants.Military.SPEARMAN, parseInt(armyTds[2].innerHTML));
      e |= military._updatePresent(Constants.Military.SWORDSMAN, parseInt(armyTds[3].innerHTML));
      e |= military._updatePresent(Constants.Military.SLINGER, parseInt(armyTds[4].innerHTML));
      e |= military._updatePresent(Constants.Military.ARCHER, parseInt(armyTds[5].innerHTML));
      e |= military._updatePresent(Constants.Military.GUNNER, parseInt(armyTds[6].innerHTML));
      e |= military._updatePresent(Constants.Military.BATTERING_RAM, parseInt(armyTds[7].innerHTML));
      e |= military._updatePresent(Constants.Military.CATAPULT, parseInt(armyTds[8].innerHTML));
      e |= military._updatePresent(Constants.Military.MORTAR, parseInt(armyTds[9].innerHTML));
      e |= military._updatePresent(Constants.Military.GYROCOPTER, parseInt(armyTds[10].innerHTML));
      e |= military._updatePresent(Constants.Military.BALLOON_BOMBADIER, parseInt(armyTds[11].innerHTML));
      e |= military._updatePresent(Constants.Military.COOK, parseInt(armyTds[12].innerHTML));
      e |= military._updatePresent(Constants.Military.DOCTOR, parseInt(armyTds[13].innerHTML));

      var navyTds = $('#tabShips').find('tr.count td');        
      e |= military._updatePresent(Constants.Military.RAM_SHIP, parseInt(navyTds[2].innerHTML));
      e |= military._updatePresent(Constants.Military.FLAME_THROWER, parseInt(navyTds[0].innerHTML));
      e |= military._updatePresent(Constants.Military.STEAM_RAM, parseInt(navyTds[1].innerHTML));
      e |= military._updatePresent(Constants.Military.BALLISTA_SHIP, parseInt(navyTds[4].innerHTML));
      e |= military._updatePresent(Constants.Military.CATAPULT_SHIP, parseInt(navyTds[3].innerHTML));
      e |= military._updatePresent(Constants.Military.MORTAR_SHIP, parseInt(navyTds[5].innerHTML));
      e |= military._updatePresent(Constants.Military.SUBMARINE, parseInt(navyTds[7].innerHTML));
      e |= military._updatePresent(Constants.Military.PADDLE_SPEED_SHIP, parseInt(navyTds[8].innerHTML));
      e |= military._updatePresent(Constants.Military.BALLOON_CARRIER, parseInt(navyTds[9].innerHTML));
      e |= military._updatePresent(Constants.Military.TENDER, parseInt(navyTds[10].innerHTML));
      e |= military._updatePresent(Constants.Military.ROCKET_SHIP, parseInt(navyTds[6].innerHTML));
      
      military._markPresentUpdated();
      
      if (e) {
        raiseMilitaryChanged([{ 
          city: city,
          military: military,
          type: 'data_updated',
        }]);
      }
    }
    
    function processRelatedCitiesView(data) {
      var city = View.getCurrentCity();
      var military = city.getMilitary();
      military._clear();
      
      var changed = false;
      
      var info = $('#relatedCities .contentBox01h:eq(0)');
      
      var whitespace = /\s+/;
      
      info.find('.troops .armybutton').each(function(i, element) {
        var type = element.className.split(whitespace)[1];
        changed |= military._updatePresent(type, parseInt(element.innerHTML));
      });
      info.find('.troops .fleetbutton').each(function(i, element) {
        var type = element.className.split(whitespace)[1];
        changed |= military._updatePresent(type, parseInt(element.innerHTML));
      });

      military._markPresentUpdated();
      
      if (changed) {
        raiseMilitaryChanged([{ 
          city: city,
          military: military,
          type: 'data_updated',
        }]);
      }
    }
    
    function parseMilitaryUnitsFromPending(container) {
      var idRegex = /\d+/;
      var units = new MilitaryUnits();
      
      container.children('.army_wrapper').each(function(index, unitNode) {
        var unitNode = $(unitNode);
        var type = Constants.UnitIds[
            parseInt(unitNode.find('.army').attr('class').match(idRegex)[0])];
        var count = parseInt(unitNode.find('.unitcounttextlabel').html());
        units._setCount(type, count);
      });
      return units;
    }
    
    function parseTrainingBatches(viewHtmlText, type, buildingLevel) {
      var trainingBatches = [];
      var constructionList = $('#unitConstructionList');
      if (constructionList.length) {
        var completionTime = parseInt(viewHtmlText.match(
            /showUnitCountdown.'buildCountDown', 'buildProgress', (\d+)/)[1]) * 1000;
        trainingBatches.push(new TrainingBatch(type,
            completionTime, parseMilitaryUnitsFromPending(constructionList)));

        constructionList.children('.constructionBlock').each(function() {
          var units = parseMilitaryUnitsFromPending($(this));
          completionTime += computeTrainingTime(buildingLevel, units);
          trainingBatches.push(new TrainingBatch(type, completionTime, units));
        });
      }
      return trainingBatches;
    }
    
    function computeTrainingTime(barracksLevel, units) {
      var time = 0;
      $.each(units.getCounts(), function(type, count) {
        var data = Constants.UnitData[type];
        time += count * Math.pow(0.95, barracksLevel - data.minimumBuildingLevelToBuild) * 
            data.baseBuildTime;
      });
      return time * Constants.Time.MILLIS_PER_SECOND;
    }
    
    function processBarracksView(viewHtmlText, data) {
      var city = View.getCurrentCity();
      var military = city.getMilitary();
      var barracks = city.getBuildingByType(Constants.Buildings.BARRACKS);
      
      var changed = false;
      
      function update(type, dataName) {
        if (data[dataName]) {
          changed = military._updatePresent(type, parseInt(data[dataName].text));
        }
      }
      
      update(Constants.Military.HOPLITE, 'js_barracksUnitUnitsAvailable1');
      update(Constants.Military.STEAM_GIANT, 'js_barracksUnitUnitsAvailable2');
      update(Constants.Military.SPEARMAN, 'js_barracksUnitUnitsAvailable3');
      update(Constants.Military.SWORDSMAN, 'js_barracksUnitUnitsAvailable4');
      update(Constants.Military.SLINGER, 'js_barracksUnitUnitsAvailable5');
      update(Constants.Military.ARCHER, 'js_barracksUnitUnitsAvailable6');
      update(Constants.Military.GUNNER, 'js_barracksUnitUnitsAvailable7');
      update(Constants.Military.BATTERING_RAM, 'js_barracksUnitUnitsAvailable8');
      update(Constants.Military.CATAPULT, 'js_barracksUnitUnitsAvailable9');
      update(Constants.Military.MORTAR, 'js_barracksUnitUnitsAvailable10');
      update(Constants.Military.GYROCOPTER, 'js_barracksUnitUnitsAvailable11');
      update(Constants.Military.BALLOON_BOMBADIER, 'js_barracksUnitUnitsAvailable12');
      update(Constants.Military.COOK, 'js_barracksUnitUnitsAvailable13');
      update(Constants.Military.DOCTOR, 'js_barracksUnitUnitsAvailable14');
          
      military._markPresentUpdated(true, false);

      military._setArmyTrainingBatches( 
          parseTrainingBatches(viewHtmlText, Constants.Military.ARMY, barracks.getLevel()));

      raiseMilitaryChanged([{ 
        city: city,
        military: military,
        type: 'data_updated',
      }]);
    }
    
    function processShipyardView(viewHtmlText, data) {
      var city = View.getCurrentCity();
      var military = city.getMilitary();
      var shipyard = city.getBuildingByType(Constants.Buildings.SHIPYARD);
      
      var change = false;
      function update(type, dataName) {
        if (data[dataName]) {
          changed = military._updatePresent(type, parseInt(data[dataName].text));
        }
      }
      update(Constants.Military.FLAME_THROWER, 'js_barracksUnitUnitsAvailable1');
      update(Constants.Military.STEAM_RAM, 'js_barracksUnitUnitsAvailable2');
      update(Constants.Military.RAM_SHIP, 'js_barracksUnitUnitsAvailable3');
      update(Constants.Military.CATAPULT_SHIP, 'js_barracksUnitUnitsAvailable4');
      update(Constants.Military.BALLISTA_SHIP, 'js_barracksUnitUnitsAvailable5');
      update(Constants.Military.MORTAR_SHIP, 'js_barracksUnitUnitsAvailable6');
      update(Constants.Military.ROCKET_SHIP, 'js_barracksUnitUnitsAvailable7');
      update(Constants.Military.SUBMARINE, 'js_barracksUnitUnitsAvailable8');
      update(Constants.Military.PADDLE_SPEED_SHIP, 'js_barracksUnitUnitsAvailable9');
      update(Constants.Military.BALLOON_CARRIER, 'js_barracksUnitUnitsAvailable10');
      update(Constants.Military.TENDER, 'js_barracksUnitUnitsAvailable11');
      
      military._markPresentUpdated(false, true);
      
      military._setNavyTrainingBatches( 
          parseTrainingBatches(viewHtmlText, Constants.Military.NAVY, shipyard.getLevel()));
          
      raiseMilitaryChanged([{ 
        city: city,
        military: military,
        type: 'data_updated',
      }]);
    }
      
    function processAcademyView(data) {
      var changes = [];
      View.getCurrentCity()._updateScientists(
          parseInt(data['js_academy_research_tooltip_basic_production'].text),
          changes);
      raiseResourcesChanged(changes);
    }
    
    function processSetScientistsForm(form) {
      var scientists = parseInt($('#inputScientists').val());
      
      View.registerNextIkariamAjaxRequestCallback(function saveScientstsData(response) {
        Utils.iterateIkariamAjaxResponse(response, 
            function lookForSuccessFeedback(index, name, data) {
              if (name == Constants.IkariamAjaxResponseType.PROVIDE_FEEDBACK &&
                  data[0].type == 10) {
                var changes = [];
                View.getCurrentCity()._updateScientists(scientists, changes);
                raiseResourcesChanged(changes);
              }
            });
      });
    }
    
    function processPalaceView(data) {
      var changes = [];
      getCivilizationData()._updateGovernment( 
          $('.government_pic img').attr('src').slice(16, -8), changes);
      raiseCivilizationDataChanged(changes);
    }
            
    function processMuseumView(data) {
      var changes = [];
      View.getCurrentCity()._updateCulturalGoods(
         parseInt(/\d+/.exec($('#val_culturalGoodsDeposit').parent().text())[0]), 
         changes);
      raiseResourcesChanged(changes);
    }
            
    function processCulturalPossessionsAssignView(data) {
      // Have to delay this because the script elements in the changed view 
      // need to run before we can access the cultural good information.  
      // There is no feasible way to extract the data at this point.
      setTimeout(function() {
        var cityIdRegex = /textfield_city_(\d+)/
        var changes = [];
        $('#moveCulturalGoods ul li input').each(function (index, item) {
          item = $(item);

          var city = getCity(
              parseInt(cityIdRegex.exec(item.attr('id'))[1]));
          city._updateCulturalGoods(parseInt(item.val()), changes);
        });
        raiseResourcesChanged(changes);
        empireData.saveAsync();
      }, 0);
    }
            
    function processTownHallView(data) {
      var changes = [];
      var city = View.getCurrentCity();
      city._updatePriests(
         parseInt(data['js_TownHallPopulationGraphPriestCount'].text), changes);
      city._updateCulturalGoods(
         parseInt(
             data['js_TownHallSatisfactionOverviewCultureBoniTreatyBonusValue'].text) / 50, 
         changes);
      city._updateTavernWineLevel(
          parseInt(data['js_TownHallSatisfactionOverviewWineBoniServeBonusValue'].text) / 60,
          changes);
      raiseResourcesChanged(changes);
    }
            
    function processTempleView(data) {
      var changes = [];
      View.getCurrentCity()._updatePriests(
          parseInt(data['js_TempleSlider'].slider.ini_value), changes);
      raiseResourcesChanged(changes);
    }
            
    function processResearchAdvisorView(data) {
      var civData = getCivilizationData();
      var idRegex = /researchId=([0-9]+)/i
      var levelRegex = /\((\d+)\)/;

      var researches = 
          JSON.parse(data['new_js_params'] || data['load_js'].params).currResearchType;

      var changes = [];
      $.each(researches, function (name, researchData) {
        var id = parseInt(idRegex.exec(researchData.aHref)[1]);
        var levelMatch = levelRegex.exec(name);
        var level = levelMatch 
            ? parseInt(levelMatch[1]) - 1
            : (researchData.liClass == 'explored' ? 1 : 0);

        civData._updateResearch(id, level, changes);
      });
      raiseCivilizationDataChanged(changes);
    }
    
    function processFinancesView(data) {
      var cities = getOwnCities();
      var scientistCost = 6;
      if (getCivilizationData().hasResearched(Constants.Research.Science.LETTER_CHUTE)) {
        scientistCost = 3;
      }

      var changes = []
      $('#finances .table01:eq(1) tr').slice(1, -1).each(function(index, row) {
        var tds = $(row).children('td');
        var city = cities[index];
        if ($(tds[0]).text() == city.getName()) {
          city._updateScientists(
              Math.round(-parseInt($(tds[2]).text().replace(',', '')) / scientistCost), changes);
        }
      });
      raiseResourcesChanged(changes);
    }
    
    function processMilitaryAdvisorView(data) {
      var civilizationData = getCivilizationData();
      var movementIds = {};
      
      var changes = [];
      
      $.each(civilizationData.getMovements(), function(index, movement) {
        movementIds[movement.getId()] = movement;
      });
      
      var movementMainValueRegex = /^js_MilitaryMovementsEventRow(\d+)$/;
      var cityIdRegex = /cityId=(\d+)/;
      $.each(data, function(key, value) {
        var match = movementMainValueRegex.exec(key);
        if (match /*&& value.class.indexOf('own') > 0*/) {
          var movementId = parseInt(match[1]);
          delete movementIds[movementId];

          var type = value.class;
          var completionTime = 
              data['js_MilitaryMovementsEventRow' + movementId + 'ArrivalTime']
                  .countdown.enddate * Constants.Time.MILLIS_PER_SECOND;
          var originCityId = parseInt(
              data['js_MilitaryMovementsEventRow' + movementId + 'OriginLink'].href
                  .match(cityIdRegex)[1]);
          var targetCityId = data['js_MilitaryMovementsEventRow' + movementId + 'TargetLink'].href
              ? parseInt(data['js_MilitaryMovementsEventRow' + movementId + 'TargetLink'].href
                  .match(cityIdRegex)[1]) : 0;
          var mission = data['js_MilitaryMovementsEventRow' + movementId + 'MissionIcon']
              .class.split(' ')[1];
          var stage = Constants.Movements.Stage.LOADING;
          var statusClass = 
              data['js_MilitaryMovementsEventRow' + movementId + 'Mission'].class;
          if (statusClass && statusClass.indexOf('arrow_right_green') >= 0) {
            stage = Constants.Movements.Stage.EN_ROUTE;
          } else if (statusClass && statusClass.indexOf('arrow_left_green') >= 0) {
            stage = Constants.Movements.Stage.RETURNING;
          }
          
          var transports = 0;
          var resources = {};
          var units = new MilitaryUnits();

          $.each(
              data['js_MilitaryMovementsEventRow' + movementId + 'UnitDetails']
                  .appendElement || [],
              function processUnit(index, item) {
                var count = parseInt(item.text);
                
                if (item.class.indexOf('ship_transport') >= 0) {
                  transports = count;
                }
                
                if (item.class.indexOf(Constants.Resources.WOOD) >= 0) {
                  resources[Constants.Resources.WOOD] = count;
                } else if (item.class.indexOf(Constants.Resources.WINE) >= 0) {
                  resources[Constants.Resources.WINE] = count;
                } else if (item.class.indexOf(Constants.Resources.MARBLE) >= 0) {
                  resources[Constants.Resources.MARBLE] = count;
                } else if (item.class.indexOf(Constants.Resources.GLASS) >= 0) {
                  resources[Constants.Resources.GLASS] = count;
                } else if (item.class.indexOf(Constants.Resources.SULFUR) >= 0) {
                  resources[Constants.Resources.SULFUR] = count;
                }
                
                $.each(Constants.Military, function findIsUnit(key, type) {
                  if (item.class.indexOf(' ' + type) >= 0) {
                    units._setCount(type, count);
                    return false;
                  }
                });
              });
                  
          var movement = new Movement(
              movementId, type, completionTime, mission, stage, originCityId, targetCityId,
              transports, units, resources);
          
          civilizationData._updateMovement(movement, changes);
        }
      });
      
      $.each(movementIds, function removeMissingMovements(id, value) {
        civilizationData._removeMovement(id, changes);
      });
      
      raiseMovementsChanged(changes);
    }
    
    function processPremiumView(data) {
      var civilizationData = getCivilizationData();
      var changes = [];

      civilizationData._updatePremiumFeature(changes,
          Constants.PremiumFeatures.DOUBLED_SAFE_CAPACITY,
          $('#js_buySafecapacityBonusActiveTime').hasClass('green'));      
      civilizationData._updatePremiumFeature(changes,
          Constants.PremiumFeatures.DOUBLED_STORAGE_CAPACITY,
          $('#js_buyStoragecapacityBonusActiveTime').hasClass('green'));
      
      raiseCivilizationDataChanged(changes);
    }
    
    function updateAndStartTracking() {
      // Process all known cities that show up in the dropdown.  
      // Drop any cities that are no longer there.
      var cities = { };
      var cityOrder = [];
      
      function updateCurrentCity(globalData, backgroundData, correctWineConsumption) {
        var currentCity = View.getCurrentCity();
        if (View.viewIsCity() && currentCity.getId() == parseInt(backgroundData.id)) {
          currentCity._updateFromBackgroundData(backgroundData);
        }
        currentCity._updateFromGlobalData(globalData, correctWineConsumption);
        Logging.debug("Current city %s[%s]: ", 
            currentCity.name, currentCity.id, currentCity);
      }

      $.each(unsafeWindow.dataSetForView.relatedCityData, 
          function updateFromPage_Each(key, value) {
            if (key.substring(0, 5) == "city_") {
              var city = empireData.get().cities[value.id] || 
                  new City(value.id, value.relationship);
              city.type = value.relationship;

              city.name = value.name;
              city.islandCoordinates = parseCoordinates(value.coords);
              if (value.tradegood) {
                city.tradeGoodType = TRADE_GOOD_LOOKUP[value.tradegood];
              }

              empireData.get().cities[city.id] = city;
              cityOrder.push(city.id);

              Logging.debug("City %s[%s]: %o", city.name, city.id, city);
            }
          });

      empireData.get().cityOrder = cityOrder;

      var globalData = {
        maxActionPoints: parseInt($('#js_GlobalMenu_maxActionPoints').text()),
      };
      updateCurrentCity($.extend(globalData, unsafeWindow.dataSetForView), 
                        unsafeWindow.ikariam.backgroundView.screen.data,
                        true);
                              
      empireData.saveAsync();
                        
      function updateEmpireDataFromGlobalData(data) {

        View.setGameTimeDifference(new Date().getTime() - (data['time'] || data[1]) * 
            Constants.Time.MILLIS_PER_SECOND);
        updateCurrentCity(data['headerData'] || data[10], data['backgroundData'] || data[11]);
      }
          
      View.registerIkariamAjaxResponseCallback(
          function updateEmpireDataFromAjaxResponse(response) {
            var globalData;
            var view;
            var viewHtml;
            var templateData;

            Utils.iterateIkariamAjaxResponse(response, function(index, name, data) {
              if (name == Constants.IkariamAjaxResponseType.UPDATE_GLOBAL_DATA) {
                globalData = data;
              } else if (name == Constants.IkariamAjaxResponseType.CHANGE_VIEW) {
                view = data[0];
                viewHtml = data[1];
              } else if (name == Constants.IkariamAjaxResponseType.UPDATE_TEMPLATE_DATA) {
                templateData = data;
              }
            });

            if (globalData) {
              updateEmpireDataFromGlobalData(globalData);
            }

            if (view == Constants.View.CITY_MILITARY) {
              processCityMilitaryView(templateData);
            } else if (view == Constants.View.RELATED_CITIES) {
              processRelatedCitiesView(templateData);
            } else if (view == Constants.View.ACADEMY) {
              processAcademyView(templateData);
            } else if (view == Constants.View.PALACE) {
              processPalaceView(templateData);
            } else if (view == Constants.View.MUSEUM) {
              processMuseumView(templateData);
            } else if (view == Constants.View.ASSIGN_CULTURAL_POSSESSIONS) {
              processCulturalPossessionsAssignView(templateData);
            } else if (view == Constants.View.TOWN_HALL) {
              processTownHallView(templateData);
            } else if (view == Constants.View.TEMPLE) {
              processTempleView(templateData);
            } else if (view == Constants.View.RESEARCH_ADVISOR) {
              processResearchAdvisorView(templateData);
            } else if (view == Constants.View.FINANCES) {
              processFinancesView(templateData);
            } else if (view == Constants.View.BARRACKS) {
              processBarracksView(viewHtml, templateData);
            } else if (view == Constants.View.SHIPYARD) {
              processShipyardView(viewHtml, templateData);
            } else if (view == Constants.View.MILITARY_ADVISOR) {
              processMilitaryAdvisorView(templateData);
            } else if (view == Constants.View.PREMIUM) {
              processPremiumView(templateData);
            }

            if (unsafeWindow.ikariam.templateView) {
              if (unsafeWindow.ikariam.templateView.id == Constants.View.RESEARCH_ADVISOR) {
                processResearchAdvisorView(templateData);
              }
            }

            empireData.saveAsync();
          }, true);
      
      View.registerAjaxFormSubmitCallback(
          function ajaxHandlerCallFromFormEmpireDataUpdate(form) {
            if (form.id == 'transport'  || form.id == 'transportForm') {
              processTransportForm(form);
            } else if (form.id == 'deploymentForm') {
              processDeploymentForm(form);
            } else if (form.id == 'plunderForm') {
              processPlunderForm(form);
            } else if (form.id == 'setScientists') {
              processSetScientistsForm(form);
            }
          });
    }
    
    function updateMovements(callback) {
      View.backgroundGetIkariamPage(
        'http://' + document.domain + '/index.php?view=militaryAdvisor&activeTab=militaryMovements&ajax=1',
        function updateMovementsCallback(response) {
          var dataResponse = JSON.parse(response.responseText);
          Utils.iterateIkariamAjaxResponse(dataResponse, function(index, name, data) {
            if (name == Constants.IkariamAjaxResponseType.UPDATE_TEMPLATE_DATA) {
              processMilitaryAdvisorView(data);
            }
          });
          empireData.saveAsync();
          callback(dataResponse);
        },
        'POST');
    }
    
    function getCities() {
      var data = empireData.get();
      var cities = [];
      for (var i = 0; i < data.cityOrder.length; i++) {
        cities.push(data.cities[data.cityOrder[i]]);
      }
      return cities;
    }
    
    function getOwnCities() {
      return getCities().filter(function(city) {
        return city.isOwn();
      });
    }
    
    function getCivilizationData() {
      return empireData.get().civilizationData;
    }
    
    function getDebugString(includePrivateData) {
      return JSON.stringify(empireData.get(), function debugStringify(name, value) {
        if (name === 'name' || name === 'islandCoordinates') {
          return undefined;
        }
        return value;
      });
    }
    
    function resetData() {
      empireData.reset();
    }

    var Espionage = function() {
      function Target(id) {
        this._ikaToolsType = 'target';
        
        if (id) {
          this.id = id;

          this.playerId = undefined;
          this.allianceId = undefined;
          
          this.townLevel = undefined;
          this.wallLevel = undefined;
          this.warehouseLevel = undefined;

          this.islandId = undefined;
          this.coords = undefined;

          this.occupierId = undefined;
          this.blockaderId = undefined;
          
          this.tradeGoodType = undefined;

          this.lastUpdateTime = 0;
          
          this.military = new MilitaryUnits();
          this.otherMilitary = new MilitaryUnits();
          this.militaryLastSpyMessageId = 0;
          this.militaryLastSpyTime = 0;

          this.resources = {
            wood: 0,
            wine: 0,
            marble: 0,
            glass: 0,
            sulfur: 0,

            lastSpyMessageId: 0,
            lastSpyTime: 0,
          };

          this.combats = {};
        }
      }

      function combatComparer(combat1, combat2) {
			  return combat2.time - combat1.time;
			};

      $.extend(Target.prototype, {
        getId: function getId() {
          return this.id;
        },
        getName: function getName() {
          return this.name;
        },
        getTownLevel: function getTownLevel() {
          return this.townLevel;
        },
        getWallLevel: function getWallLevel() {
          return this.wallLevel;
        },
        getIslandCoordinates: function getIslandCoordinates() {
          return this.coords;
        },
        getIslandId: function getIslandId() {
          return this.islandId;
        },
        getPlayer: function _getPlayer() {
          return getPlayer(this.playerId);
        },
        getOccupier: function getOccupier() {
          if (this.occupierId) {
            return getPlayer(this.occupierId);
          }
          return null;
        },
        getBlockader: function getBlockader() {
          if (this.blockaderId) {
            return getPlayer(this.blockaderId);
          }
        },
        getTradeGoodType: function getTradeGoodType() {
          return this.tradeGoodType;
        },
        getMilitary: function getMilitary() {
          return this.military;
        },
        getOtherMilitary: function getOtherMilitary() {
          return this.otherMilitary;
        },
        hasResourceInfo: function hasResourceInfo() {
          return this.resources.lastSpyMessageId > 0;
        },
        hasMilitaryInfo: function hasMilitaryInfo() {
          return this.militaryLastSpyMessageId > 0;
        },
        getLootableResources: function getLootableResources(type) {
          var available = this.resources[type];
          $.each(this.getCombats(View.gameTimeNow() - this.resources.lastSpyTime), 
            function subtractCombatResources(index, combat) {
              available -= combat.getLooted(type);
            });
          return Math.max(0, available - 
              (this.getPlayer().isInactive() ? 
                  Constants.GamePlay.RESOURCE_PROTECTION_WAREHOUSE_INACTIVE : 
                  Constants.GamePlay.RESOURCE_PROTECTION_WAREHOUSE) * this.warehouseLevel - 
              Constants.GamePlay.BASE_RESOURCE_PROTECTION);
        },
        getResourcesSpyTime: function getResourcesSpyTime() {
          return this.resources.lastSpyTime;
        },
        getMilitarySpyTime: function getMilitarySpyTime() {
          return this.militaryLastSpyTime;
        },
        getCombats: function getCombats(maxAge) {
          var combats = [];
          $.each(this.combats, function(index, combat) {
            if (View.gameTimeNow() - combat.time <= maxAge) {
              combats.push(combat);
            }
          });
          combats.sort(combatComparer);
          return combats;
        },
        remove: function remove() {
          delete espionageData.get().targets[this.id];
          espionageData.saveAsync();
              raiseEspionageChanged({
                type: 'targetRemoved',
                targets: [this]
              });
        },
        _refresh: function refresh(hasSpiesPresent, callback) {
          if (View.gameTimeNow() - this.lastRefreshTime < Constants.Time.MILLIS_PER_HOUR) {
            console.log('Skipping refresh');
            callback();
            return;
          }

          this.lastRefreshTime = new Date().getTime();
          
          var datasLoaded = hasSpiesPresent ? 2 : 1;
          function doneLoading() {
            if (--datasLoaded == 0) {
              callback();
            }
          }
          Utils.backgroundFetchIkariamFullPage(
              'http://' + document.domain + '/index.php?view=island&cityId=' + this.id,
              this._refreshIslandCallback.bind(this, doneLoading));
          if (hasSpiesPresent) {
            Utils.backgroundFetchIkariamFullPage(
                'http://' + document.domain + '/index.php?view=city&cityId=' + this.id,
                this._refreshCityCallback.bind(this, doneLoading));
          }
        },
        _refreshIslandCallback: function refreshIslandCallback(callback, response, ajaxResponse) {
          var target = this;
          Utils.iterateIkariamAjaxResponse(ajaxResponse, 
              function refreshTargetData(index, name, data) {
                if (name == IkaTools.Constants.IkariamAjaxResponseType.UPDATE_BACKGROUND_DATA) {
                  $.each(data.cities, function findTarget(index, city) {
                    if (parseInt(city.id) == target.id) {
                      var playerId = parseInt(city.ownerId);
                      target.name = city.name;
                      target.playerId = parseInt(city.ownerId);
                      target.townLevel = parseInt(city.level);
                      target.islandId = parseInt(data.id);
                      target.coords = [parseInt(data.xCoord), parseInt(data.yCoord)];
                      target.tradeGoodType = TRADE_GOOD_LOOKUP[data.tradegood];
                      updateOrAddPlayer(playerId, city.ownerName, city.state, parseInt(city.ownerAllyId), 
                          city.ownerAllyTag, 
                          parseInt(data.avatarScores[playerId].army_score_main.split(',').join('').split(',').join('')) / 100);
                      if (city.infos && city.infos['occupation']) {
                        target.occupierId = city.infos['occupation'].id;
                        updateOrAddPlayer(city.infos['occupation'].id, city.infos['occupation'].name);
                      } else {
                        target.occupierId = 0;
                      }
                      if (city.infos && city.infos['fleetAction']) {
                        target.blockaderId = city.infos['fleetAction'].id;
                        updateOrAddPlayer(city.infos['fleetAction'].id, city.infos['fleetAction'].name);
                      } else {
                        target.blockaderId = 0;
                      }
                    }
                  });
                }
              });
          callback(this);
        },
        _refreshCityCallback: function refreshCityCallback(callback, response, ajaxResponse) {
          var target = this;
          Utils.iterateIkariamAjaxResponse(ajaxResponse, 
              function refreshTargetData(index, name, data) {
                if (name == IkaTools.Constants.IkariamAjaxResponseType.UPDATE_BACKGROUND_DATA) {
                  target.wallLevel = parseInt(data.position[14].level) || 0;
                  target.warehouseLevel = 0;
                  $.each(data.position, function(index, item) {
                    if (item.building == Constants.Buildings.WAREHOUSE) {
                      target.warehouseLevel += parseInt(item.level);
                    }
                  });
                }
              });
          callback(this);
        },
        _getOrAddCombat: function getOrAddCombat(id) {
          var combat = this.combats[id];
          if (!combat) {
            combat = new Target.Combat(id);
            this.combats[id] = combat;
          }
          return combat;
        },
      });

      Target.Combat = function Target_Combat(id) {
        this._ikaToolsType = 'targetCombat';

        if (id) {
          this.id = id;
          
          this.type = undefined;
          this.time = undefined;

          this.resources = {
            wood: 0,
            wine: 0,
            marble: 0,
            glass: 0,
            sulfur: 0,
          };
        }
      }

      $.extend(Target.Combat.prototype, {
        getType: function getType() {
          return this.type;
        },
        getTime: function getTime() {
          return this.time;
        },
        getLooted: function getLooted(resourceType) {
          return this.resources[resourceType];
        },
      });

      function Player(id) {
        this._ikaToolsType = 'player';
        
        if (id) {
          this.id = id;
          
          this.name = null;
          this.allianceId = null;
          this.militaryScore = null;
        }
      }

      $.extend(Player.prototype, {
        _update: function update(name, state, allianceId, militaryScore) {
          this.name = name;
          if (state !== undefined) {
            this.allianceId = allianceId;
            this.militaryScore = militaryScore;
            this.state = state;
          }
        },
        getAlliance: function getAlliance() {
          if (this.allianceId) {
            return espionageData.get().alliances[this.allianceId];
          } else {
            return;
          }
        },
        getName: function getName() {
          return this.name;
        },
        getState: function getState() {
          return this.state;
        },
        getMilitaryScore: function getMilitaryScore() {
          return this.militaryScore;
        },
        isInactive: function isInactive() {
          return this.state == Constants.PlayerState.INACTIVE;
        },
      });

      function updateOrAddPlayer(id, name, state, allianceId, allianceName, militaryScore) {
        var players = espionageData.get().players;
        var player = players[id];
        if (!player) {
          player = new Player(id);
          players[id] = player;
        }
        player._update(name, state, allianceId, militaryScore);
        updateOrAddAlliance(allianceId, allianceName);
      }

      function Alliance(id) {
        this._ikaToolsType = 'alliance';
        
        if (id) {
          this.id = id;
          this.name = null;
        }
      }

      $.extend(Alliance.prototype, {
        _update: function update(name) {
          this.name = name;
        },
        getName: function getName() {
          return this.name;
        },
        getId: function getId() {
          return this.id;
        }
      });

      function updateOrAddAlliance(id, name) {
        if (id) {
          var alliances = espionageData.get().alliances;
          var alliance = alliances[id];
          if (!alliance) {
            alliance = new Alliance(id);
            alliances[id] = alliance;
          }
          alliance._update(name);
        }
      }

      function addTargetById(id, hasSpiesPresent, callback) {
        var targets = espionageData.get().targets;
        var target = targets[id];
        if (!target) {
          var target = new Target(id);
          target._refresh(hasSpiesPresent, function() {
            targets[id] = target;
            callback(target);
          });
        } else {
          target._refresh(hasSpiesPresent, function() {
            callback(target);
          });
        }
      }

      function getTargets() {
        var targets = [];
        $.each(espionageData.get().targets, function(index, target) {
          targets.push(target);
        });
        return targets;
      }

      function getTarget(id) {
        return espionageData.get().targets[id];
      }

      function getPlayer(id) {
        return espionageData.get().players[id];
      }

      function getPlayers() {
        return espionageData.get().players;
      }

      var espionageData = new Data.Value(
          'espionageData', 
          { 
            targets: {},
            alliances: {},
            players: {},
          }, 
          {
            reviver: function espionageDataReviver(key, value) {
              if (value && value._ikaToolsType) {
                var obj;

                switch(value._ikaToolsType) {
                  case 'target': obj = new Target(); break;
                  case 'targetCombat': obj = new Target.Combat(); break;
                  case 'player': obj = new Player(); break;
                  case 'alliance': obj = new Alliance(); break;
                  case 'militaryUnits': obj = new MilitaryUnits(); break;
                }
                $.extend(obj, value);
                if (obj._postLoad) {
                  obj._postLoad();
                }
                return obj;
              }
              return value;
            },
            version: 6,

            loadCallback: function espionageDataLoaded() {
            },
          });

      var espionageChangedEvent = Utils.thunk(function() {
        return new Utils.EventDispatcher();
      });
    
      function registerEspionageChangedHandler(callback) {
        return espionageChangedEvent().addListener(callback);
      }

      function raiseEspionageChanged(changes) {
        espionageChangedEvent().send(changes);
      }

      function startTracking() {
        var messageIdRegex = /message(\d+)/
        espionageData.load();
        
        View.registerIkariamAjaxResponseCallback(
            function processHideoutView(response) {
              IkaTools.Utils.iterateIkariamAjaxResponse(response, function(index, name, data) {
                if (name == IkaTools.Constants.IkariamAjaxResponseType.CHANGE_VIEW) {
                  if (data[0] == Constants.View.HIDEOUT) {
                    var targetCount = 0;
                    var targets = [];
                    $('#tabSafehouse li.city a').each(function(index, item) {
                      targetCount++;
                      addTargetById(parseInt(Utils.parseUrlParams($(item).attr('href'))['cityId']), true, 
                        function targetAdded(target) {
                          targets.push(target);
                          targetCount--;
                          if (targetCount == 0) {
                            espionageData.saveAsync();
                            raiseEspionageChanged({
                              type: 'targetsChanged',
                              targets: targets
                            });
                          }
                        });
                    });

                    var reportHeaders = $(
                        '#espionageReports tr.espionageReports, #espionageReports tr.espionageReportsalt');
                    if (reportHeaders.length) {
                      var changedTargets = [];
                      reportHeaders.each(function(index, reportHeader) {
                        var success = $('td.resultImage img', reportHeader).attr('src') == 'skin/buttons/yes.png';
                        var target = getTarget(parseInt(
                            Utils.parseUrlParams($('td.targetCity a', reportHeader).attr('href'))['selectCity']));
                        var messageId = parseInt(reportHeader.id.match(messageIdRegex)[1]);
                        var tableMailMessage = $('#tbl_mail' + messageId);
                        if (success && target) {
                          if ($('td.money', reportHeader).length &&
                              messageId > target.resources.lastSpyMessageId) {
                            // Warehouse resources mission
                            var resourceTds = $('#tbl_mail' + messageId + ' td.count');
                            target.resources.wood = parseInt(resourceTds.get(0).textContent.replace(',', ''));
                            target.resources.wine = parseInt(resourceTds.get(1).textContent.replace(',', ''));
                            target.resources.marble = parseInt(resourceTds.get(2).textContent.replace(',', ''));
                            target.resources.glass = parseInt(resourceTds.get(3).textContent.replace(',', ''));
                            target.resources.sulfur = parseInt(resourceTds.get(4).textContent.replace(',', ''));
                            target.resources.lastSpyMessageId = messageId;
                            target.resources.lastSpyTime = 
                                Utils.parseIkariamTimestamp($('td.date', reportHeader).text()).getTime();
                            target._refresh(false, function() {
                              espionageData.saveAsync(),
                              raiseEspionageChanged({
                                type: 'targetsRefreshed',
                                targets: [target],
                              });
                            });
                            changedTargets.push(target);
                          } else if ($('td.garrison', reportHeader).length && 
                              messageId > target.militaryLastSpyMessageId && 
                              tableMailMessage.find(' table.reportTable').length) {

                            readSpiedMilitary(target.getMilitary(), 
                                tableMailMessage.find('table.reportTable tr:nth-child(2) td.count'));
                            readSpiedMilitary(target.getOtherMilitary(), 
                                tableMailMessage.find('table.reportTable tr:nth-child(3) td.count'));
                                
                            target.militaryLastSpyMessageId = messageId;
                            target.militaryLastSpyTime = Utils.parseIkariamTimestamp($('td.date', reportHeader).text()).getTime();

                            target._refresh(false, function() {
                              espionageData.saveAsync(),
                              raiseEspionageChanged({
                                type: 'targetsRefreshed',
                                targets: [target],
                              });
                            });
                            changedTargets.push(target);
                          }
                        }
                      });
                      if (changedTargets.length) {
                        espionageData.saveAsync();
                        raiseEspionageChanged({
                          type: 'targetsChanged',
                          targets: changedTargets
                        });
                      }
                    }
                  } else if (data[0] == Constants.View.MILITARY_ADVISOR_REPORT) {
                    var report = $('#troopsReport');
                    var defender = report.find('.defender b:first a:first');
                    if (defender.length) {
                      var target = getTarget(parseInt(
                          Utils.parseUrlParams(defender.attr('href'))['cityId']));
                      if (target) {
                        var header = report.find('.header');
                        var result = report.find('div.result');
                        var combatId = parseInt(Utils.parseUrlParams(
                            report.find('div p.link:first a.button:first',report).attr('href'))['detailedCombatId']);
                        var combatTime = Utils.parseIkariamTimestamp(report.find('.header .date').text()).getTime();
                        var type = report.find('.overview .fleet').length ? 
                            IkaTools.Constants.CombatType.BLOCKADE : IkaTools.Constants.CombatType.PILLAGE;

                        var combat = target._getOrAddCombat(combatId);
                        combat.type = type;
                        combat.time = combatTime;
                        result.find('.resources li.value').each(function(index, item) {
                          var resourceInfo = $(item);
                          var type = resourceInfo.find('img').attr('src').match(/icon_([a-z]*)_small.png/)[1];
                          if (type == 'crystal') {
                            type = Constants.Resources.GLASS;
                          }
                          var amount = parseInt(resourceInfo.text());
                          combat.resources[type] = amount;
                        });

                        target._refresh(false, function() {
                          espionageData.saveAsync(),
                          raiseEspionageChanged({
                            type: 'targetsRefreshed',
                            targets: [target],
                          });
                        });
                      }
                      
                      espionageData.saveAsync();
                      raiseEspionageChanged({
                        type: 'combatUpdated',
                        targets: [target],
                      });
                    }
                  }
                } else if (name == Constants.IkariamAjaxResponseType.BACKGROUND_DATA) {
                }
              });
            }, true);
      }

      function readSpiedMilitary(military, unitTds) {
        var baseArmyCount = true;
        var baseNavyCount = true;
        var navyOffset = 0;
        
        if (unitTds.length == 14) { // army only
          baseNavyCount = 0;
        } else if (unitTds.length == 11) { // navy only
          baseArmyCount = 0;
          navyOffset = -14;
        } else if (unitTds.length == 0) { // nothing
          baseNavyCount = 0;
          baseArmyCount = 0;
        }
        military._setCount(Constants.Military.HOPLITE, baseArmyCount && parseInt($(unitTds[0]).text()) || 0);
        military._setCount(Constants.Military.STEAM_GIANT, baseArmyCount && parseInt($(unitTds[1]).text()) || 0);
        military._setCount(Constants.Military.SPEARMAN, baseArmyCount && parseInt($(unitTds[2]).text()) || 0);
        military._setCount(Constants.Military.SWORDSMAN, baseArmyCount && parseInt($(unitTds[3]).text()) || 0);
        military._setCount(Constants.Military.SLINGER, baseArmyCount && parseInt($(unitTds[4]).text()) || 0);
        military._setCount(Constants.Military.ARCHER, baseArmyCount && parseInt($(unitTds[5]).text()) || 0);
        military._setCount(Constants.Military.GUNNER, baseArmyCount && parseInt($(unitTds[6]).text()) || 0);
        military._setCount(Constants.Military.BATTERING_RAM, baseArmyCount && parseInt($(unitTds[7]).text()) || 0);
        military._setCount(Constants.Military.CATAPULT, baseArmyCount && parseInt($(unitTds[8]).text()) || 0);
        military._setCount(Constants.Military.MORTAR, baseArmyCount && parseInt($(unitTds[9]).text()) || 0);
        military._setCount(Constants.Military.GYROCOPTER, baseArmyCount && parseInt($(unitTds[10]).text()) || 0);
        military._setCount(Constants.Military.BALLOON_BOMBADIER, baseArmyCount && parseInt($(unitTds[11]).text()) || 0);
        military._setCount(Constants.Military.COOK, baseArmyCount && parseInt($(unitTds[12]).text()) || 0);
        military._setCount(Constants.Military.DOCTOR, baseArmyCount && parseInt($(unitTds[13]).text()) || 0);

        military._setCount(Constants.Military.RAM_SHIP, parseInt(baseNavyCount && $(unitTds[16 + navyOffset]).text()) || 0);
        military._setCount(Constants.Military.FLAME_THROWER, parseInt(baseNavyCount && $(unitTds[14 + navyOffset]).text()) || 0);
        military._setCount(Constants.Military.STEAM_RAM, parseInt(baseNavyCount && $(unitTds[15 + navyOffset]).text()) || 0);
        military._setCount(Constants.Military.BALLISTA_SHIP, parseInt(baseNavyCount && $(unitTds[18 + navyOffset]).text()) || 0);
        military._setCount(Constants.Military.CATAPULT_SHIP, parseInt(baseNavyCount && $(unitTds[17 + navyOffset]).text()) || 0);
        military._setCount(Constants.Military.MORTAR_SHIP, parseInt(baseNavyCount && $(unitTds[19 + navyOffset]).text()) || 0);
        military._setCount(Constants.Military.SUBMARINE, parseInt(baseNavyCount && $(unitTds[21 + navyOffset]).text()) || 0);
        military._setCount(Constants.Military.PADDLE_SPEED_SHIP, parseInt(baseNavyCount && $(unitTds[22 + navyOffset]).text()) || 0);
        military._setCount(Constants.Military.BALLOON_CARRIER, parseInt(baseNavyCount && $(unitTds[23 + navyOffset]).text()) || 0);
        military._setCount(Constants.Military.TENDER, parseInt(baseNavyCount && $(unitTds[24 + navyOffset]).text()) || 0);
        military._setCount(Constants.Military.ROCKET_SHIP, parseInt(baseNavyCount && $(unitTds[20 + navyOffset]).text()) || 0);
      }
      
      function getDebugString(includePrivateData) {
        return JSON.stringify(espionageData.get(), function debugStringify(name, value) {
          if (name === 'name' || name === 'coordinates') {
            return undefined;
          }
          return value;
        });
      }

      function resetData() {
        espionageData.reset();
      }
    
      return {
        startTracking: startTracking,
        registerEspionageChangedHandler: registerEspionageChangedHandler,
        getTargets: getTargets,
        getPlayers: getPlayers,
        
        getDebugString: getDebugString,
        resetData: resetData,
      };
    }();
    
    return {
      updateAndStartTracking: Logging.debuggable(
          { label: 'IkaTools.EmpireData.updateAndStartTracking', alwaysTime: true }, 
          updateAndStartTracking),
      updateMovements: updateMovements,
      
      calculateTravelTime: calculateTravelTime,
      
      getCities: Utils.thunk(getCities),
      getOwnCities: Utils.thunk(getOwnCities),
      getCivilizationData: getCivilizationData,
      getCity: getCity,
      
      getDebugString: getDebugString,
      resetData: resetData,
      
      registerCivilizationDataChangedHandler: registerCivilizationDataChangedHandler,
      registerResourcesChangedHandler: registerResourcesChangedHandler,
      registerBuildingsChangedHandler: registerBuildingsChangedHandler,
      registerMilitaryChangedHandler: registerMilitaryChangedHandler,
      registerMovementsChangedHandler: registerMovementsChangedHandler,

      Espionage:Espionage,
    };
  }();
  
  function processAnchor() {
    var anchor = window.location.hash;

    if (anchor == '#ikaScriptToolsSuppressCityPreselect') {
      document.location.hash = '';
      //unsafeWindow.ikariam.backgroundView.screen.preselectCity = 
      //    function suppressPreselectCity() { };
      View.suppressFirstChangeViewOfType('cityDetails');
    }
    if (anchor.substring(0, 35) == '#ikaScriptToolsLoadLocalIkariamUrl=') {
      var url = decodeURIComponent(anchor.substring(35));
      document.location.hash = '';
      IkaTools.View.loadLocalIkariamUrl(url);
      if (IkaTools.View.viewIsIsland()) {
        View.suppressFirstChangeViewOfType('cityDetails');
      }
    } else if (anchor.substring(0, 62) == 
        '#ikaScriptToolsLoadLocalIkariamUrl_DoNotSuppressFirstCityInfo=') {
      var url = decodeURIComponent(anchor.substring(62));
      document.location.hash = '';
      IkaTools.View.loadLocalIkariamUrl(url);
    }
  }
  
  function initialize(options) {
    processAnchor();
    $(window).bind('hashchange', processAnchor);
    options = $.extend({ trackData: true }, options);
    View.setGameTimeDifference(new Date().getTime() - 
        unsafeWindow.ikariam.model.requestTime * Constants.Time.MILLIS_PER_SECOND - 
        Constants.Time.INITIAL_PAGE_LOAD_DELTA);
    if (options.trackData) {
      IkaTools.EmpireData.updateAndStartTracking();
    }
  }
  
  return {
    Logging: Logging,
    Utils: Utils,
    View: View,
    Data: Data,
    Intl: Intl,
    EmpireData: EmpireData,
    Constants: Constants,
    UI: UI,
    Settings: Settings,
    
    initialize: initialize,
    processAnchor: processAnchor,
  };
})();
}
