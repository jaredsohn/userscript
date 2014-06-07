// ==UserScript==
// @name           Simple Ikariam Town Resources
// @namespace      http://userscripts.org/users/465257
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_registerMenuCommand
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @downloadURL    https://userscripts.org/scripts/source/132578.user.js
// @updateURL      http://userscripts.org/scripts/source/132578.meta.js
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://board.*.ikariam.com*
// @exclude        http://*.ikariam.*/board
// @version        1.214
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js
//
// @history        1.214 Missing Government on upgrade bug fixed.
// @history        1.214 Dropped debug flags ... oops
// @history        1.213 Added a help tab.
// @history        1.213 Added a report bug button.
// @history        1.213 And prob a few other things i've missed.
// @history        1.213 Added the beginnings of setting localisation.
// @history        1.213 Added the ability to drag/drop the order of towns on the board (drag resource icon).
// @history        1.213 Reformatted the options screen and made descriptions clearer.
// @history        1.213 Updated townHall capacity to 2500.
// @history        1.213 Fixed missing +/- on wine tooltips.
// @history        1.213 Fixed missing army movements.
// @history        1.213 Fixed missing Army/Fleet builds.
// @history        1.213 Added corruption to research values.
// @history        1.213 Added corruptions to Nomocracy.
// @history        1.213 Fixed column visibility issue.
// @history        1.213 Updates to building data.
// @history        1.212 Fixed loading issue.
// @history        1.212 Fixed missing fireworker icon
// @history        1.212 Fixed option 'show all units'
// @history        1.211 An absolute ton of other tweaks and fixes (and prob a few features i cant remember)
// @history        1.211 Upgradable buildings have a different style when city has a building in progress
// @history        1.211 Max level buildings are now slightly faded
// @history        1.211 compatibility with other scripts increased
// @history        1.211 hotkeys added SHIFT + Q / W / E for world/island/city view
// @history        1.211 hotkeys added Q, W, E, R for each of the advisors
// @history        1.211 build time issues associated with government have been fixed
// @history        1.211 icon and style applied to upgrading buildings
// @history        1.211 building updates to status (upgradable/upgrading etc) are almost instantaneous
// @history        1.211 board now loads more efficiently and quicker
// @history        1.211 capital city icon no longer displays on empty cells
// @history        1.211 custom icons added to the 'production building' column head and populated cells
// @history        1.211 Table updates are much faster, almost 3 times fasteron a complete redraw
// @history        1.211 Almost every table header now links directly to the ingame help pages for that item
// @history        1.211 population cell now has a progressbar
// @history        1.211 population cell has been condensed into 'current population' and 'free space' below that
// @history        1.211 net wine on totals tooltip has made a return
// @history        1.211 research tooltips updated to reflect what is seen in ikariam tooltips (even if misleading)
// @history        1.211 Premium storage and premium research have been explicitly added to the board
// @history        1.211 Options now correctly display after reloading
// @history        1.211 HIDE on worldview and HIDE on islandview options now work correctly
// @history        1.211 Initialisation assistance links have been added to settings
// @history        1.211 Window tennis option sets board on top when toggled on and restores 'on top' setting when toggled off.
// @history        1.210 fixed loading issues with an options typo
// @history        1.210 fixed the -1 resource bug.
// @history        1.209 fixed world/island view options Enable to Hide on that view (you can open with spacebar still)
// @history        1.209 added window tennis option - On top when moused over only
// @history        1.209 wine warning timer fixed
// @history        1.209 fleet/army buttons installed on every tab
// @history        1.209 changed out some textual information for related images icons
// @history        1.209 Default font sizes are not so small anymore
// @history        1.209 Changed larger font option to smaller font option
// @history        1.209 CSS has been completely re-written
// @history        1.209 tons of HTML updates to each table
// @history        1.209 changed upgrading status on the building tab to a ^ - not sure about this yet however
// @history        1.209 refactored building/city/view change links
// @history        1.209 replaced 'alternate building order' with a condensed building table option.
// @history        1.209 added condensed building table: concatenates palace/gov as well as luxury goods prod buildings into single columns of type.
// @history        1.209 fixed issue with parsing sent resources that sometimes caused an error in the movement object.
// @history        1.209 fixed an issue that stopped transports from being removed once arrived at destination.
// @history        1.209 updated and/or rebuilt every tooltip
// @history        1.209 added the beginings of a proper options object
// @history        1.209 massively reduced loading times
// @history        1.209 added a few more localization strings -many many more to do
// @history        1.209 replaced qTip with custom tips to reduce loading time
// @history        1.209 applied some previous changes that were not actually included in the previous version
// @history        1.208 quick fix for some ikariam changes
// @history        1.207 fixed satisfaction smiley images
// @history        1.207 fixed tavern satisfaction sometimes being unable to locate valid wine level
// @history        1.207 added extra building spot for pirate Fortress as well as building and research (missing build time args)
// @history        1.207 fixed type error parsing museum level
// @history        1.207 added dynamic finances (income only)
// @history        1.207 added dynamic population projection
// @history        1.207 fixed tab navigaton (shift+1/2/3) error
// @history        1.207 fixed fleet loading status (tooltip) and times (parse)
// @history        1.206 fixed resource capacities
// @history        1.206 added dynamic expandable tooltips, and created a new expandable capacity tip
// @history        1.206 changed the progressbar tooltips
// @history        1.206 fixed fatal error after clicking a building upgrade
// @history        1.205 forced a full building table refresh if encountering a new building type
// @history        1.205 made buildings available upgrade status dynamic
// @history        1.205 fixed more issues with deployment in other cities
// @history        1.204 fixed issues surrounding navigating to none owned cities. Remove not owned cities from board
// @history        1.204 fixed transport buttons and stopped them working in allied cities
// @history        1.204 fixed transport tooltips showing for non relevant resource
// @history        1.204 fixed settings icon border (chrome)
// @history        1.204 changed display on city empty spots
// @history        1.204 fixed theocracy satisfaction bug
// @history        1.204 fixed not always remembering the active tab
// @history        1.203 fixed not testing for existance of VINEYARD before getting level
// @history        1.202 scope issue breaking table updates
// @history        1.202 fixed data wipes on invalid pages
// @history        1.202 fixed transport form submission
// @history        1.202 jQUI tabs fatal error
// @history        1.202 fixed a few issues causing problems using require for jQUI
// @history        1.201 stopped hotkeys from functioning in textarea and select
// @history        1.201 added jquery noConflict fix for greasemonkey
// ==/UserScript==

/***********************************************************************************************************************
 * Includes
 ********************************************************************************************************************* */
;(function($){
var jQuery = $;

if(window.navigator.vendor.match(/Google/)) {
  var isChrome = true;
}
if(!isChrome) {
  this.$ = this.jQuery = jQuery.noConflict(true);
}

$.extend({
  exclusive     : function(arr) {
    return $.grep(arr, function(v, k) {
      return $.inArray(v, arr) === k;
    });
  },
  /**
   * Updates existing props in (a) with values of props from param[2..n]. Recursing over child objects
   * @param {object} a Object to update
   * @param {object} b Object containing values merge into param1
   * @param {object} c Other objects containing values
   * @return {object} Modified original object
   */
  mergeValues   : function(a, b, c) {
    var length = arguments.length;
    if(length == 1 || typeof arguments[0] !== "object" || typeof arguments[1] !== "object") {
      return arguments[0];
    }
    var args = jQuery.makeArray(arguments);
    var i = 1;
    var target = args[0];
    for(; i < length; i++) {
      var copy = args[i];
      for(var name in copy) {
        if(!target.hasOwnProperty(name)) {
          target[name] = copy[name];
          continue;
        }
        if(typeof target[name] == "object" && typeof copy[name] == "object") {
          target[name] = jQuery.mergeValues(target[name], copy[name])
        } else if(copy.hasOwnProperty(name) && copy[name] != undefined) {
          target[name] = copy[name]
        }
      }
    }
    return target
  },
  decodeUrlParam: function(string) {
    var str = string.split('?').pop().split('&');
    var obj = {};
    for(var i = 0; i < str.length; i++) {
      var param = str[i].split('=');
      if(param.length !== 2) {
        continue;
      }
      obj[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "))
    }
    return obj
  }
});

var events = (function() {
  var _events = {};
  var retEvents = function(id) {
    var callbacks, topic = id && _events[ id ];
    if(!topic) {
      callbacks = $.Callbacks("");
      topic = {
        pub  : callbacks.fire,
        sub  : callbacks.add,
        unsub: callbacks.remove
      };
      if(id) {
        _events[ id ] = topic;
      }
    }
    return topic;
  };
  /**
   * Call a function <tt>time</tt> (ms) in the future
   * @param {function} callback Function to be called
   * @param {number} time Wait time in milliseconds
   * @return {function} Function to cancel scheduled callback
   */
  retEvents.scheduleAction = function(callback, time) {
    return clearTimeout.bind(undefined, setTimeout(callback, time || 0));
  };
  /**
   * Call a function at specified DateTime in the future
   * @param {function} callback Function to be run
   * @param {number} [time=0] DateTime to call function
   * @return {function} Function to cancel scheduled callback
   */
  retEvents.scheduleActionAtTime = function(callback, time) {
    return retEvents.scheduleAction(callback, (time - $.now() > 0 ? time - $.now() : 0))
  };
  /**
   * Call a function every <tt>time</tt> (ms) in the future
   * @param {function} Function to be called
   * @param {number} Wait time in milliseconds between calls
   * @return {function} Function to clear the recurring event
   */
  retEvents.scheduleActionAtInterval = function(callback, time) {
    return clearInterval.bind(undefined, setInterval(callback, time));
  };
  return retEvents
})();
/***********************************************************************************************************************
 * Globals
 **********************************************************************************************************************/
var debug = false;
var log = false;   // SITR logging pane
var timing = false;
if(!unsafeWindow) unsafeWindow = window;
/***********************************************************************************************************************
 * Inject button into page before the page renders the YUI menu or it will not be animated (less work)
 **********************************************************************************************************************/
$('.menu_slots > .expandable:last').after('<li class="expandable slot99 SITR_Menu" onclick=""><div class="SITR_Menu2 image" style="background-image: url(data:image/png;base64,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); background-position:center center; background-size:122% 122%"></div></div><div class="name"><span class="namebox">SITR Resource Overview</span></div></li>');

//TODO Replace Army/Building table rendering with a per row $('row').replaceWith(newRow) on data change
//TODO Replace Resource table continuous rendering with 'resource only' updates and cell/row level replaceWith as above on various changes

/***********************************************************************************************************************
 * Utility Functions
 **********************************************************************************************************************/
var Utils = {
  wrapInClosure     : function(obj) {
    return (function(x) {
      return function() {
        return x
      }
    })(obj)
  },
  existsIn          : function(input, test) {
    try {
      var ret = input.indexOf(test) !== -1
    } catch(e) {
      return false
    }
    return ret;
  },
  estimateTravelTime: function(city1, city2) {
    if(!city1 || !city2) return 0;
    if(city1[0] == city2[0] && city1[1] == city2[1]) {
      var time = 1200 / 60 * 0.5;
    } else {
      time = 1200 / 60 * (Math.sqrt(Math.pow((city2[0] - city1[0]), 2) + Math.pow((city2[1] - city1[1]), 2)));
    }
    return Math.floor(time * 60 * 1000);
  },
  addStyleSheet     : function(style) {
    var getHead = document.getElementsByTagName("HEAD")[0];
    var cssNode = window.document.createElement('style');
    var elementStyle = getHead.appendChild(cssNode);
    elementStyle.innerHTML = style;
    return elementStyle;
  },
  escapeRegExp      : function(str) {
    return str.replace(/[\[\]\/\{\}\(\)\-\?\$\*\+\.\\\^\|]/g, "\\$&");
  },
  /**
   * Replaces '{key}' in inputString with 'value' from replacements, can take objects or arrays
   * @param inputString [string] input text to be transformed
   * @param replacements [object] object containing key/value pairs to replace
   * @return {*}
   */
  format            : function(inputString, replacements) {
    var str = '' + inputString;
    var keys = Object.keys(replacements);
    var i = keys.length;
    while(i--) {
      str = str.replace(new RegExp(this.escapeRegExp('{' + keys[i] + '}'), 'g'), replacements[keys[i]])
    }
    return str
  },
  cacheFunction     : function(toExecute, expiry) {
    expiry = expiry || 1000;
    var cachedTime = $.now;
    var cachedResult = undefined;
    return function() {
      if(cachedTime < $.now() - expiry || cachedResult === undefined) {
        cachedResult = toExecute();
        cachedTime = $.now()
      }
      return cachedResult
    }
  },
  getClone  : function($node){
    if ($node.hasClass('ui-sortable-helper') || $node.parent().find('.ui-sortable-helper').length){
    return $node;}
    return $($node.get(0).cloneNode(true))
  },
  setClone : function($node, $clone){
    if ($node.hasClass('ui-sortable-helper') || $node.parent().find('.ui-sortable-helper').length){
      return $node;
    }
    $node.get(0).parentNode.replaceChild($clone.get(0), $node.get(0));
    return $node
  },
  replaceNode       : function(node, html) {
    var t = node.cloneNode(false);
    t.innerHTML = html;
    node.parentNode.replaceChild(t, node);
    return t
  },
	 FormatTimeLengthToStr : function(timeString, precision, spacer) {
		timeString = timeString || 0;
		precision = precision || 2;
		spacer = spacer || " ";
		if(!isFinite(timeString)) {
			return ' \u221E ';
		}
		if(timeString < 0) timeString *= -1;
		var factors = [];
		var locStr = [];
		factors.day = 86400;
		factors.hour = 3600;
		factors.minute = 60;
		factors.second = 1;
		locStr.day = database.getGlobalData.getLocalisedString('day');
		locStr.hour = database.getGlobalData.getLocalisedString('hour');
		locStr.minute = database.getGlobalData.getLocalisedString('minute');
		locStr.second = database.getGlobalData.getLocalisedString('second');
		timeString = Math.ceil(timeString / 1000);
		var retString = "";
		for(var fact in factors) {
			var timeInSecs = Math.floor(timeString / factors[fact]);
			if(isNaN(timeInSecs)) {
				return retString;
			}
			if(precision > 0 && (timeInSecs > 0 || retString != "")) {
				timeString = timeString - timeInSecs * factors[fact];
				if(retString != "") {
					retString += spacer;
				}
				retString += timeInSecs + locStr[fact];
				precision--;
			}
		}
		return retString;
	},
	FormatFullTimeToDateString:	function (timeString, precise) {
		precise = precise || true;
		timeString = timeString || 0;
		var sInDay = 86400000;
		var day = '';
		var compDate = new Date(timeString);
		if(precise) {
			switch(Math.floor(compDate.getTime() / sInDay) - Math.floor($.now() / sInDay)) {
				case 0  :
					day = database.getGlobalData.getLocalisedString('Today');
					break;
				case 1  :
					day = database.getGlobalData.getLocalisedString('Tomorrow');
					break;
				case -1 :
					day = database.getGlobalData.getLocalisedString('Yesterday');
					break;
				default :
					day = (!isChrome ? compDate.toLocaleFormat('%a %d %b') : compDate.toString().split(' ').splice(0, 5).join(' '))
			}
		}
		if(day != '') {
			day += ', '
		}
		return day + compDate.toLocaleTimeString();
	},
	FormatRemainingTime : function(time, brackets) {
			brackets = brackets || false;
			var arrInTime = Utils.FormatTimeLengthToStr(time, 3, ' ');
			return (arrInTime == '') ? '' : (brackets ? '(' : '') + arrInTime + (brackets ? ')' : '');
		},
	FormatNumToStr : function(inputNum, outputSign, precision) {
		precision = precision ? "10e" + (precision - 1) : 1;
		var ret, val, sign, i, j;
		var tho = database.getGlobalData.getLocalisedString('thousandSeperator');
		var dec = database.getGlobalData.getLocalisedString('decimalPoint');
		if(!isFinite(inputNum)) {
			return '\u221E'
		}
		sign = inputNum > 0 ? 1 : inputNum === 0 ? 0 : -1;
		if(sign) {
			val = (( Math.floor(Math.abs(inputNum * precision)) / precision ) + '').split('.');
			ret = val[1] != undefined ? [dec, val[1]] : [];
			val = val[0].split('');
			i = val.length;
			j = 1;
			while(i--) {
				ret.unshift(val.pop());
				if(i && j % 3 == 0) {
					ret.unshift(tho)
				}
				j++
			}
			if(outputSign) {
				ret.unshift(sign == 1 ? '+' : '-');
			}
			return ret.join('');
		}
		else return inputNum;
	}
};
/***********************************************************************************************************************
 * CLASSES
 **********************************************************************************************************************/
function Movement(id, originCityId, targetCityId, arrivalTime, mission, loadingTime, resources, military, ships) {
  if(typeof id === "object") {
    this._id = id._id || null;
    this._originCityId = id._originCityId || null;
    this._targetCityId = id._targetCityId || null;
    this._arrivalTime = id._arrivalTime || null;
    this._mission = id._mission || null;
    this._loadingTime = id._loadingTime || null;
    this._resources = id._resources || {wood: 0, wine: 0, marble: 0, glass: 0, sulfur: 0};
    this._military = id._military || new MilitaryUnits();
    this._ships = id._ships || null;
    this._updatedCity = id._updatedCity || false;
    this._complete = id._complete || false;
    this._updateTimer = id._updateTimer || null;

  } else {
    this._id = id || null;
    this._originCityId = originCityId || null;
    this._targetCityId = targetCityId || null;
    this._arrivalTime = arrivalTime || null;
    this._mission = mission || null;
    this._loadingTime = loadingTime || null;
    this._resources = resources || {wood: 0, wine: 0, marble: 0, glass: 0, sulfur: 0};
    this._military = military || new MilitaryUnits();
    this._ships = ships || null;
    this._updatedCity = false;
    this._complete = false;
    this._updateTimer = null;
  }
}
Movement.prototype = {
  startUpdateTimer       : function() {
    this.clearUpdateTimer();
    if(this.isCompleted) {
      this.updateTransportComplete()
    } else {
      this._updateTimer = events.scheduleActionAtTime(this.updateTransportComplete.bind(this), this._arrivalTime + 1000)
    }
  },
  clearUpdateTimer       : function() {
    var ret = !this._updateTimer || this._updateTimer();
    this._updateTimer = null;
    return ret
  },
  get getId() {
    return this._id
  },
  get getOriginCityId() {
    return this._originCityId
  },
  get getTargetCityId() {
    return this._targetCityId
  },
  get getArrivalTime() {
    return this._arrivalTime
  },
  get getMission() {
    return this._mission
  },
  get getLoadingTime() {
    return this._loadingTime - $.now()
  },
  get getResources() {
    return this._resources
  },
  getResource            : function(resourceName) {
    return this._resources[resourceName]
  },
  get getMilitary() {
    return this._military
  },
  get getShips() {
    return this._ships
  },
  get isCompleted() {
    return this._arrivalTime < $.now()
  },
  get isLoading() {
    return this._loadingTime > $.now()
  },
  get getRemainingTime() {
    return this._arrivalTime - $.now()
  },
  updateTransportComplete: function() {
    if(this.isCompleted && !this._updatedCity) {
      var city = database.getCityFromId(this._targetCityId);
      var changes = [];
      if(city) {
        for(var resource in Constant.Resources) {
          if(this.getResource(Constant.Resources[resource])) {
            changes.push(Constant.Resources[resource])
          }
          city.getResource(Constant.Resources[resource]).increment(this.getResource(Constant.Resources[resource]));
        }
        this._updatedCity = true;
        city = database.getCityFromId(this.originCityId);
        if(city) {
          city.updateActionPoints(city.getAvailableActions + 1)
        }
        //TODO: Military

        if(changes.length) {
          events(Constant.Events.MOVEMENTS_UPDATED).pub([this.getTargetCityId]);
          events(Constant.Events.RESOURCES_UPDATED).pub(this.getTargetCityId, changes);
        }
        events.scheduleAction(function() {
          database.getGlobalData.removeFleetMovement(this._id)
        }.bind(this));
        return true
      }

    } else if(this._updatedCity) {
      events.scheduleAction(function() {
        database.getGlobalData.removeFleetMovement(this._id)
      }.bind(this))
    }
    return false;
  }
};

function Resource(city, name) {
  this._current = 0;
  this._production = 0;
  this._consumption = 0;
  this._currentChangedDate = $.now();
  this.city = Utils.wrapInClosure(city);
  this._name = name;
  return this
}

Resource.prototype = {
  get name() {
    return this._name
  },
  update   : function(current, production, consumption) {
    var changed = (current % this._current > 10) || (production != this._production) || (consumption != this._consumption);
    this._current = current;
    this._production = production;
    this._consumption = consumption;
    this._currentChangedDate = $.now();
    return changed;
  },
  project  : function() {
    var limit = Math.floor($.now() / 1000);
    var start = Math.floor(this._currentChangedDate / 1000);
    while(limit > start) {
      this._current += this._production;
      if(Math.floor(start / 3600) != Math.floor((start + 1) / 3600))
        if(this._current > this._consumption) {
          this._current -= this._consumption
        } else {
          this.city().projectPopData(start * 1000);
          this._consumption = 0;
        }

      start++
    }
    this._currentChangedDate = limit * 1000;
    this.city().projectPopData(limit * 1000)

  },
  increment: function(amount) {
    if(amount !== 0) {
      this._current += amount;
      return true;
    }
    return false;
  },
  get getEmptyTime() {
    var net = this.getProduction * 3600 - this.getConsumption;
    return (net < 0) ? this.getCurrent / net * -1 : Infinity; //no consumption == never empty
  },
  get getFullTime() {
    var net = this.getProduction * 3600 - this.getConsumption;
    return (net > 0) ? (this.city().maxResourceCapacities.capacity - this.getCurrent) / net : 0;//no production == never full ?
  },
  get getCurrent() {
    return Math.floor(this._current);

  },
  get getProduction() {
    return this._production || 0
  }, //per hour
  get getConsumption() {
    return this._consumption || 0
  } //per hour
};

function Military(city) {
  this.city = Utils.wrapInClosure(city);
  this._units = new MilitaryUnits();
  this._advisorLastUpdate = 0;

  this.armyTraining = [];
  this._trainingTimer = null;
}
Military.prototype = {
  init                 : function() {
    this._trainingTimer = null;
    this._startTrainingTimer()
  },
	_getTrainingTotals: function (){
		var ret = {};
		$.each(this.armyTraining, function(index, training) {
			$.each(Constant.UnitData, function(unitId, info) {
        ret[unitId] = ret[unitId]?ret[unitId]+(training.units[unitId]||0):training.units[unitId]||0
			})
		});
		return ret
	},
  get getTrainingTotals() { //cached
	  if(!this._trainingTotals) {
		  this._trainingTotals = Utils.cacheFunction(this._getTrainingTotals.bind(this), 1000)
	  }
	  return this._trainingTotals()
  },
	_getIncomingTotals :function (){
		var ret = {};
		$.each(this.city().getIncomingMilitary, function(index, element) {
			for(var unitName in Constant.UnitData) {
        ret[unitName] = ret[unitName]?ret[unitName]+(element.getMilitary.totals[unitName]||0):element.getMilitary.totals[unitName]||0;
			}
		});
		return ret
	},
  get getIncomingTotals() { //cached
	  if(!this._incomingTotals) {
		  this._incomingTotals = Utils.cacheFunction(this._getIncomingTotals.bind(this), 1000)
	  }
	  return this._incomingTotals()
  },
  getTrainingForUnit   : function(unit) {
    var ret = [];
    $.each(this.armyTraining, function(index, training) {
      $.each(training.units, function(unitId, count) {
        if(unitId === unit) {
          ret.push({count: count, time: training.completionTime})
        }
      })
    });
    return ret
  },
  setTraining          : function(trainingQueue) {
    if(!trainingQueue.length) return false;

    this._stopTrainingTimer();

    var type = trainingQueue[0].type;
    var changes = this._clearTrainingForType(type);
    $.each(trainingQueue, function(index, training) {
      this.armyTraining.push(training);
      $.each(training.units, function(unitId, count) {
        changes.push(unitId)
      })
    }.bind(this));
    this.armyTraining.sort(function(a, b) {
      return a.completionTime - b.completionTime
    });
    this._startTrainingTimer();
    return $.exclusive(changes)
  },
  _clearTrainingForType: function(type) {
    var oldTraining = this.armyTraining.filter(function(item) {
      return item.type === type
    });
    this.armyTraining = this.armyTraining.filter(function(item) {
      return item.type !== type
    });
    var changes = [];
    $.each(oldTraining, function(index, training) {
      $.each(training.units, function(unitId, count) {
        changes.push(unitId)
      })
    });
    return changes
  },
  _completeTraining    : function() {
    if(this.armyTraining.length) {
      if(this.armyTraining[0].completionTime < $.now() + 5000) {
        var changes = [];
        var training = this.armyTraining.shift();
        $.each(training.units, function(id, count) {
          this.getUnits.addUnit(id, count);
          changes.push(id)
        }.bind(this));
        if(changes.length)events(Constant.Events.MILITARY_UPDATED).pub(this.city().getId, changes)
      }
    }
    this._startTrainingTimer()
  },
  _startTrainingTimer  : function() {
    this._stopTrainingTimer();
    if(this.armyTraining.length) {
      this._trainingTimer = events.scheduleActionAtTime(this._completeTraining.bind(this), this.armyTraining[0].completionTime)

    }
  },
  _stopTrainingTimer   : function() {
    if(this._trainingTimer) {
      this._trainingTimer()
    }
    this._trainingTimer = null
  },
  updateUnits          : function(counts) {
    var changes = [];
    $.each(counts, function(unitId, count) {
      if(this._units.setUnit(unitId, count)) {
        changes.push(unitId)
      }
    }.bind(this));
    return changes;
  },
  get getUnits() {
    return this._units
  }
};
function MilitaryUnits(obj) {
  this._units = obj !== undefined ? obj._units: {};
}
MilitaryUnits.prototype = {
  getUnit   : function(unitId) {
    return this._units[unitId] || 0
  },
  setUnit   : function(unitId, count) {
    var changed = this._units[unitId] != count;
    this._units[unitId] = count;
    return changed
  },
  get totals() {
    return this._units
  },
  addUnit   : function(unitId, count) {
    return this.setUnit(unitId, this.getUnit(unitId) + count)
  },
  removeUnit: function(unitId, count) {
    count = Math.max(0, this.getUnit[unitId] - count);
    return this.setUnit(unitId, count)
  }

};
function Building(city, pos) {
  this._position = pos;
  this._level = 0;
  this._name = null;
  this.city = Utils.wrapInClosure(city);
  this._updateTimer = null
}
Building.prototype = {
  startUpgradeTimer               : function() {
    if(this._updateTimer) {
      this._updateTimer();
      delete this._updateTimer
    }
    if(this._completionTime) {
      if(this._completionTime - $.now() < 5000) {
        this.completeUpgrade()
      } else {
        this._updateTimer = events.scheduleActionAtTime(this.completeUpgrade.bind(this), this._completionTime - 4000)
      }
    }

    var statusPoll = function(a, b){
      return events.scheduleActionAtInterval(function(){
        if(a != this.isUpgradable || b != this.isUpgrading){
          var changes = {position: this._position, name: this.getName, upgraded: this.isUpgrading != b}
          events(Constant.Events.BUILDINGS_UPDATED).pub([changes]);
          a = this.isUpgradable;
          b = this.isUpgrading;
        }
      }.bind(this),3000)
    }(this.isUpgradable,this.isUpgrading)
  },
  update                          : function(data) {
    var changes;
    var name = data.building.split(' ')[0];
    var level = parseInt(data.level) || 0;
    database.getGlobalData.addLocalisedString(name, data.name); //Todo: snip for translation
    var completion = ('undefined' !== typeof data['completed']) ? parseInt(data['completed']) : 0;
    var changed = (name !== this._name || level !== this._level || !!completion != this.isUpgrading);
    if(changed) {
      changes = {position: this._position, name: this.getName, upgraded: this.isUpgrading != !completion};
    }
    if(completion) {
      this._completionTime = completion * 1000;
      this.startUpgradeTimer()
    } else if(this._completionTime) {
      delete this._completionTime
    }
    this._name = name;
    this._level = level;
    if(changed) {
      return changes;
    }
    return false;
  },
  get getUrlParams() {
    return {
      view    : this.getName,
      cityId  : this.city().getId,
      position: this.getPosition
    };
    //+'&currentCityId=351633'
  },
  get getUpgradeCost() {
    var carpenter, architect, vineyard, fireworker, optician;
    var level = this._level + this.isUpgrading;
    if(this.isEmpty) {
      return {
        wood  : Infinity,
        glass : 0,
        marble: 0,
        sulfur: 0,
        wine  : 0,
        time  : 0
      }
    }
    var time = Constant.BuildingData[this._name].time;
    var bon = 1;
    var bonTime = 1 + Constant.GovernmentData[database.getGlobalData.getGovernmentType].buildingTime;
    bon -= database.getGlobalData.getResearchTopicLevel(Constant.Research.Economy.PULLEY) ? .02 : 0;
    bon -= database.getGlobalData.getResearchTopicLevel(Constant.Research.Economy.GEOMETRY) ? .04 : 0;
    bon -= database.getGlobalData.getResearchTopicLevel(Constant.Research.Economy.SPIRIT_LEVEL) ? .08 : 0;
    return{
      wood  : Math.floor((Constant.BuildingData[this._name].wood[level] || 0) * (bon - (carpenter = this.city().getBuildingFromName(Constant.Buildings.CARPENTER), carpenter ? carpenter.getLevel / 100 : 0))),
      glass : Math.floor((Constant.BuildingData[this._name].glass[level] || 0) * (bon - (optician = this.city().getBuildingFromName(Constant.Buildings.OPTICIAN), optician ? optician.getLevel / 100 : 0))),
      marble: Math.floor((Constant.BuildingData[this._name].marble[level] || 0) * (bon - (architect = this.city().getBuildingFromName(Constant.Buildings.ARCHITECT), architect ? architect.getLevel / 100 : 0))),
      sulfur: Math.floor((Constant.BuildingData[this._name].sulfur[level] || 0) * (bon - (fireworker = this.city().getBuildingFromName(Constant.Buildings.FIREWORK_TEST_AREA), fireworker ? fireworker.getLevel / 100 : 0))),
      wine  : Math.floor((Constant.BuildingData[this._name].wine[level] || 0) * (bon - (vineyard = this.city().getBuildingFromName(Constant.Buildings.VINEYARD), vineyard ? vineyard.getLevel / 100 : 0))),
      time: Math.round(time.a / time.b * Math.pow(time.c, level + 1) - time.d) * 1000 * bonTime
    }
  },
  get getName() {
    return this._name
  },
  get getType() {
    return Constant.BuildingData[this.getName].type
  },
  get getLevel() {
    return this._level
  },
  get isEmpty() {
    return this._name == 'buildingGround' || this._name == null
  },
  get isUpgrading() {
    return (this._completionTime > $.now())
  },
  subtractUpgradeResourcesFromCity: function() {
    var cost = this.getUpgradeCost;
    $.each(Constant.Resources, function(key, resourceName) {
      this.city().getResource(resourceName).increment(cost[resourceName] * -1)
    }.bind(this));
    this._completionTime = $.now() + cost.time;
    //this.startUpgradeTimer()

  },
  get isUpgradable() {
    if(this.isEmpty || this.isMaxLevel) {
      return false
    }
    var cost = this.getUpgradeCost;
    var upgradable = true;
    $.each(Constant.Resources, function(key, value) {
      upgradable = upgradable && (!cost[value] || cost[value] <= this.city().getResource(value).getCurrent);
    }.bind(this));
    return upgradable;
  },
  get getCompletionTime() {
    return this._completionTime
  },
  get getCompletionDate() {
  },
  get isMaxLevel() {
    return Constant.BuildingData[this.getName].maxLevel === (this.getLevel + this.isUpgrading)
  },
  get getPosition() {
    return this._position
  },
  completeUpgrade                 : function() {
    this._level++;
    delete this._completionTime;
    delete this._updateTimer;                                                                               //todo: look at this completed field
    events(Constant.Events.BUILDINGS_UPDATED).pub(this.city().getId, [
      {position: this._position, name: this.getName, upgraded: true}
    ])
  }
};
function CityResearch(city) {
  this._researchersLastUpdate = 0;
  this._researchers = 0;
  this._researchCostLastUpdate = 0;
  this._researchCost = 0;
  this.city = Utils.wrapInClosure(city);
}

CityResearch.prototype = {
  updateResearchers: function(researchers) { //TODO: tidy up
    var changed = this._researchers !== researchers;
    this._researchers = researchers;
    this._researchersLastUpdate = $.now();
    this._researchCost = this.getResearchCost;
    //if (changed) events(Constant.Events.CITY_UPDATED).pub(this.city().id, {research:changed});
    return changed;
  },
  updateCost       : function(cost) { //TODO: tidy up
    var changed = this._researchCost !== cost;
    this._researchCost = cost;
    this._researchCostLastUpdate = $.now();
    this._researchers = this.getResearchers;
    //if (changed) events(Constant.Events.CITY_UPDATED).pub(this.city().id, {research:changed});
    return changed;
  },
  get getResearchers() {
    if(this._researchersLastUpdate < this._researchCostLastUpdate) {
      return Math.floor(this._researchCost / this._researchCostModifier);
    } else {
      return this._researchers
    }
  },
  get getResearch() {
    return this.researchData.total;
  },
  get researchData(){
    if (!this._researchData){
      this._researchData = Utils.cacheFunction(this.researchDataCached.bind(this),1000)
    }
    return this._researchData()
  },
  researchDataCached :function(){
    var resBon = 0 + Constant.GovernmentData[database.getGlobalData.getGovernmentType].researchBonus
                  + (database.getGlobalData.getResearchTopicLevel(Constant.Research.Science.PAPER) * 0.02)
                  + (database.getGlobalData.getResearchTopicLevel(Constant.Research.Science.INK) * 0.04)
                  + (database.getGlobalData.getResearchTopicLevel(Constant.Research.Science.MECHANICAL_PEN) * 0.08)
                  + (database.getGlobalData.getResearchTopicLevel(Constant.Research.Science.SCIENTIFIC_FUTURE) * 0.02);

    var premBon = database.getGlobalData.hasPremiumFeature(Constant.Premium.RESEARCH_POINTS_BONUS_EXTREME_LENGTH)
      ?(0 + Constant.PremiumData[Constant.Premium.RESEARCH_POINTS_BONUS_EXTREME_LENGTH].bonus)
      :database.getGlobalData.hasPremiumFeature(Constant.Premium.RESEARCH_POINTS_BONUS)
                      ?(0 + Constant.PremiumData[Constant.Premium.RESEARCH_POINTS_BONUS].bonus)
                      :0;
    var goods = Constant.GovernmentData[database.getGlobalData.getGovernmentType].researchPerCulturalGood * this.city()._culturalGoods;
    var researchers = this.getResearchers;
    var corruptionSpend = researchers * this.city().getCorruption;
    var nonCorruptedResearchers = researchers * (1 - this.city().getCorruption);
    var premiumResBonus = nonCorruptedResearchers * premBon;
    var researchBonus = nonCorruptedResearchers * resBon;
    var premiumGoodsBonus = goods * premBon;

    return {
      scientists: researchers,
      researchBonus: researchBonus,
      premiumScientistBonus:premiumResBonus,
      premiumResearchBonus: (researchBonus* premBon),
      culturalGoods: goods,
      premiumCulturalGoodsBonus: premiumGoodsBonus,
      corruption: corruptionSpend,
      total: nonCorruptedResearchers + researchBonus + premiumResBonus + goods + premiumGoodsBonus + (researchBonus* premBon)
    }
  },
  get _researchCostModifier() {
    return 6 + Constant.GovernmentData[database.getGlobalData.getGovernmentType].researcherCost - (database.getGlobalData.getResearchTopicLevel(Constant.Research.Science.LETTER_CHUTE) * 3)
  },
  get getResearchCost() {
    return this.getResearchers * this._researchCostModifier;
  }
};

function Changes(city, type, changes) {
  this.city = city || null;
  this.type = type || null;
  this.changes = changes || [];
}
function Population(city) {
  this._population = 0;
  this._citizens = 0;
  this._resourceWorkers = 0;
  this._tradeWorkers = 0;
  this._priests = 0;
  this._culturalGoods = 0;

  this._popChanged = $.now();
  this._citizensChanged = $.now();
  this._culturalGoodsChanged = $.now();
  this._priestsChanged = $.now();
  this.city = Utils.wrapInClosure(city)
}
Population.prototype = {
  updatePopulationData: function(population, citizens, priests, culturalGoods) {
    var changes = [];
    if(population && population != this._population) {
      changes.push({population: true});
      this.population = population;
    }
    if(citizens && citizens != this._priests) {
      changes.push({citizens: true});
      this.citizens = citizens;
    }
    if(priests && priests != this._priests) {
      changes.push({priests: true});
      this.priests = priests;
    }
  },
  updateWorkerData    : function(resourceName, workers) {
  },
  updatePriests       : function(newCount) {

  },
  updateCulturalGoods : function(newCount) {
  },
  get population() {
    return this._population
  },
  set population(newVal) {
    this._population = newVal;
    this._popChanged = $.now()
  },
  get citizens() {
    return this._citizens
  },
  set citizens(newVal) {
    this._citizens = newVal;
    this._citizensChanged = $.now()
  },
  get priests() {
    return this._priests
  },
  set priests(newVal) {
    this._priests = newVal;
    this._priestsChanged = $.now()
  }
};

function City(id) {
  this._id = id || 0;
  this._name = '';
  this._resources = {
    wood  : new Resource(this, Constant.Resources.WOOD),
    wine  : new Resource(this, Constant.Resources.WINE),
    marble: new Resource(this, Constant.Resources.MARBLE),
    glass : new Resource(this, Constant.Resources.GLASS),
    sulfur: new Resource(this, Constant.Resources.SULFUR)
  };
  this._capacities = {
    capacity : 0,
    safe     : 0,
    buildings: {
      dump     : {storage: 0, safe: 0},
      warehouse: {storage: 0, safe: 0},
      townHall : {storage: 2500, safe: 100}
    },
    invalid  : true
  };
  this._tradeGoodID = 0;
  this.knownTime = $.now();
  this._lastPopUpdate = $.now();
  this._buildings = new Array(18);
  var i = this._buildings.length;
  while(i--) {
    this._buildings[i] = new Building(this, i)
  }
  this._research = new CityResearch(this);
  this._actionPoints = 0;
  this._coordinates = {x: 0, y: 0};
  this._islandID = null;

  this.population = new Population(this);
  //Todo: make population class
  this._population = 0;
  this._citizens = 0;
  this._resourceWorkers = 0;
  this._tradeWorkers = 0;
  this._priests = 0;
  this._culturalGoods = 0;

  this._military = new Military(this);

  this.fleetMovements = {};
  this.militaryMovements = {};
  this.unitBuildList = [];
  //TODO: Finances
  this.goldIncome = 0;
  this.goldExpend = 0;

  this._pop = {currentPop: 0, maxPop: 0, satisfaction: {city: 196, museum: {cultural: 0, level: 0}, government: 0, tavern: {wineConsumption: 0, level: 0}, research: 0, priest: 0, total: 0}, happiness: 0, growth: 0};
  events('updateCityData').sub(this.updateCityDataFromAjax.bind(this));
  events('updateBuildingData').sub(this.updateBuildingsDataFromAjax.bind(this));
}

City.prototype = {
  init                       : function() {
    $.each(this._buildings, function(idx, building) {
      building.startUpgradeTimer()
    });
    this.military.init();
    $.each(this._resources, function(resourceName, resource) {
      resource.project()
    });
    events.scheduleActionAtInterval(function() {
      $.each(this._resources, function(resourceName, resource) {
        resource.project()
      }.bind(this))
    }.bind(this), 1000);
  },
  projectResource            : function(seconds) {
    //$.each(this._resources, function (resourceName, resource){resource.project(seconds)})
  },
  updateBuildingsDataFromAjax: function(id, position) {
    var changes = [];
    if(id == this.getId && ikariam.viewIsCity) {
      if(position) {
        $.each(position, function(i, item) {
          var change = this.getBuildingFromPosition(i).update(item);
          if(change) changes.push(change);
        }.bind(this));
        if(changes.length) {
          this._capacities.invalid = true;
          events(Constant.Events.BUILDINGS_UPDATED).pub(id, changes)
        }
      }
    }
  },
  updateCityDataFromAjax     : function(id, cityData) {
    var resourcesChanged = false;
    var changes = {};
    if(id == this.getId) {
      try {
        var baseWineConsumption = 0, wineConsumption = 0;
        if($.inArray(cityData.wineSpendings, Constant.BuildingData[Constant.Buildings.TAVERN].wineUse) > -1) {
          baseWineConsumption = cityData.wineSpendings;
          wineConsumption = (this.getBuildingFromName(Constant.Buildings.VINEYARD)) ? baseWineConsumption * ((100 - this.getBuildingFromName(Constant.Buildings.VINEYARD).getLevel) / 100) : baseWineConsumption;
        } else {
          wineConsumption = cityData.wineSpendings
        }
        this.updateTradeGoodID(parseInt(cityData.producedTradegood));
        resourcesChanged = this.updateResource(Constant.Resources.WOOD, cityData.currentResources[Constant.ResourceIDs.WOOD], cityData.resourceProduction, 0) || resourcesChanged;
        resourcesChanged = this.updateResource(Constant.Resources.WINE, cityData.currentResources[Constant.ResourceIDs.WINE], this.getTradeGoodID == Constant.ResourceIDs.WINE ? cityData.tradegoodProduction : 0, wineConsumption) || resourcesChanged;
        resourcesChanged = this.updateResource(Constant.Resources.MARBLE, cityData.currentResources[Constant.ResourceIDs.MARBLE], this.getTradeGoodID == Constant.ResourceIDs.MARBLE ? cityData.tradegoodProduction : 0, 0) || resourcesChanged;
        resourcesChanged = this.updateResource(Constant.Resources.GLASS, cityData.currentResources[Constant.ResourceIDs.GLASS], this.getTradeGoodID == Constant.ResourceIDs.GLASS ? cityData.tradegoodProduction : 0, 0) || resourcesChanged;
        resourcesChanged = this.updateResource(Constant.Resources.SULFUR, cityData.currentResources[Constant.ResourceIDs.SULFUR], this.getTradeGoodID == Constant.ResourceIDs.SULFUR ? cityData.tradegoodProduction : 0, 0) || resourcesChanged;
        this.knownTime = $.now();

	      var $actionPointElem = $('#js_GlobalMenu_maxActionPoints');
	      if(cityData.maxActionPoints) {
          changes['actionPoints'] = this.updateActionPoints(cityData.maxActionPoints || 0)
        } else {
          changes['actionPoints'] = this.updateActionPoints(parseInt($actionPointElem.text()) || 0);
        }
        changes['coordinates'] = this.updateCoordinates(parseInt(cityData.islandXCoord), parseInt(cityData.islandYCoord));
        if(ikariam.viewIsCity) {
          changes['name'] = this.updateName(cityData.name);
          changes['population'] = this.updatePopulation(cityData.currentResources['population']);
          changes['islandId'] = this.updateIslandID(parseInt(cityData.islandId));
          changes['coordinates'] = this.updateCoordinates(parseInt(cityData.islandXCoord), parseInt(cityData.islandYCoord));
        }
        if(ikariam.viewIsIsland) {
          changes['islandId'] = this.updateIslandID(parseInt(cityData.id));
          changes['coordinates'] = this.updateCoordinates(parseInt(cityData.xCoord), parseInt(cityData.yCoord));
        }
        changes['citizens'] = this.updateCitizens(cityData.currentResources['citizens']);
        database.getGlobalData.addLocalisedString('cities', $('#js_GlobalMenu_cities').find('> span').text());
        database.getGlobalData.addLocalisedString('ActionPoints', $actionPointElem.attr('title'));
        if(cityData['gold']) {
          database.getGlobalData.finance.currentGold = parseFloat(cityData['gold'])
        }
      } catch(e) {
        SITR.error('fetchCurrentCityData', e)
      } finally {
        cityData = null
      }
      events(Constant.Events.CITY_UPDATED).pub(this.getId, changes);
      if(resourcesChanged) {
        events(Constant.Events.RESOURCES_UPDATED).pub(this.getId, resourcesChanged)
      }
    }
  },
  get getCorruption() {
    if (typeof this._corruption != "function") {
      this._corruption = Utils.cacheFunction(function () {
        return Math.max(0, 1 - ((this.getBuildingFromName(Constant.Buildings.GOVERNORS_RESIDENCE) ? this.getBuildingFromName(Constant.Buildings.GOVERNORS_RESIDENCE).getLevel
          : this.getBuildingFromName(Constant.Buildings.PALACE) ? this.getBuildingFromName(Constant.Buildings.PALACE).getLevel
                            : 0) + 1) / database.getCityCount + Constant.GovernmentData[database.getGlobalData.getGovernmentType].corruption);
      }.bind(this), 1000);
    }
    return this._corruption();
  },
  get isCurrentCity() {
    return this.getId == ikariam.CurrentCityId
  },
  getResource                : function(name) {
    return this._resources[name]
  },
  updateResource             : function(resourceName, current, production, consumption) {
    return this.getResource(resourceName).update(current, production, consumption)
  },
  get getIncome() {
    return this._citizens * 3
  },
  updateIncome               : function(value) {
    if(Math.abs(this._citizens - value / 3) > 2) {
      return this.updateCitizens((value / 3))
    }
    return false

  },
  get getExpenses() {
    return -1 * this._research.getResearchCost
  },
  updateExpenses             : function(value) {
    return this._research.updateCost(Math.abs(value))
  },
  get getBuildings() {
    return this._buildings
  },
  getBuildingsFromName       : function(name) {
    var ret = [];
    var i = this._buildings.length;
    while(i--) {
      if(this._buildings[i].getName == name) ret.push(this._buildings[i])
    }
    return ret
  },
  getBuildingFromName        : function(name) {
    var i = this._buildings.length;
    while(i--) {
      if(this._buildings[i].getName == name)
        return this._buildings[i];
    }
    return null
  },
  getBuildingFromPosition    : function(position) {
    return this._buildings[position]
  },
  get getTradeGood() {
    for(var resourceName in Constant.ResourceIDs) {
      if(this._tradeGoodID == Constant.ResourceIDs[resourceName]) {
        return Constant.Resources[resourceName]
      }
    }
    return null;
  },
  get getTradeGoodID() {
    return this._tradeGoodID
  },
  updateTradeGoodID          : function(value) {
    var changed = this._tradeGoodID != value;
    if(changed) {
      this._tradeGoodID = value;
    }
    return changed
  },
  updatePriests              : function(priests) { //TODO: tidy up
    var changed = this._priests != priests;
    this._priests = priests;
    return changed;
  },
  get getName() {
    return this._name
  },
  updateName                 : function(value) {
    var changed = this._name != value;
    if(changed) {
      this._name = value;
    }
    return changed
  },
  get getId() {
    return this._id
  },
  get research() {
    return this._research
  },
  updateResearchers          : function(value) {
    return this._research.updateResearchers(value)
  },
  updateResearchCost         : function(value) {
    return this._research.updateCost(value)
  },
  get storageCapacity() {
    return null
  },
  get getAvailableActions() {
    return this._actionPoints
  },
  updateActionPoints         : function(value) {
    var changed = this._actionPoints != value;
    this._actionPoints = value;
    return changed
  },
  get getCoordinates() {
    return (this._coordinates ? [this._coordinates.x, this._coordinates.y] : null)
  },
  updateCoordinates          : function(x, y) {
    this._coordinates = {x: x, y: y};
    return false;
  },
  get getIslandID() {
    return this._islandID
  },
  updateIslandID             : function(id) {
    this._islandID = id;
    return false;
  },
  get getCulturalGoods() {
    return this._culturalGoods
  },
  updateCulturalGoods        : function(value) {
    var changed = this._culturalGoods !== value;
    if (changed) {
      this._culturalGoods = value;
    }
    return changed
  },
  get getIncomingResources() {
    return database.getGlobalData.getResourceMovementsToCity(this.getId)
  },
  get getIncomingMilitary() {
    return database.getGlobalData.getMilitaryMovementsToCity(this.getId)
  },
  get _getMaxPopulation() {
    var mPop = 0;
    if(this.getBuildingFromName(Constant.Buildings.TOWN_HALL)) {
      mPop = Math.floor((10 * Math.pow(this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel, 1.5))) * 2 + 40;
    }
    // Government bonus
    if(database.getGlobalData.getResearchTopicLevel(Constant.Research.Science.WELL_CONSTRUCTION) && this.getBuildingFromName(Constant.Buildings.PALACE)) {
      mPop += 50;
    }
    if(database.getGlobalData.getResearchTopicLevel(Constant.Research.Economy.UTOPIA) && this.getBuildingFromName(Constant.Buildings.PALACE)) {
      mPop += 200
    }
    if(database.getGlobalData.getResearchTopicLevel(Constant.Research.Economy.HOLIDAY)) {
      mPop += 50;
    }
    mPop += database.getGlobalData.getResearchTopicLevel(Constant.Research.Economy.ECONOMIC_FUTURE) * 20;
    return mPop;
  },
  get military() {
    return this._military
  },
  get getAvailableBuildings() {
    var i = 16 + database.getGlobalData.getResearchTopicLevel(Constant.Research.Economy.BUREACRACY) + database.getGlobalData.getResearchTopicLevel(Constant.Research.Seafaring.PIRACY);
    $.each(this.getBuildings, function(idx, building) {
      i -= !building.isEmpty
    }); //dec per populated spot
    return i
  },
  get maxResourceCapacities() {
    if(!this._capacities.invalid) {
      return this._capacities
    }

    var ret = {};
    ret[Constant.Buildings.DUMP] = {storage: 0, safe: 0};
    ret[Constant.Buildings.WAREHOUSE] = {storage: 0, safe: 0};
    ret[Constant.Buildings.TOWN_HALL] = {storage: 2500, safe: 100};
    $.each(this.getBuildingsFromName(Constant.Buildings.WAREHOUSE), function(i, building) {
      ret[Constant.Buildings.WAREHOUSE].storage += building.getLevel * 8000;
      ret[Constant.Buildings.WAREHOUSE].safe += building.getLevel * 480;
    });
    $.each(this.getBuildingsFromName(Constant.Buildings.DUMP), function(i, building) {
      ret[Constant.Buildings.DUMP].storage += building.getLevel * 32000
    });

    var capacity = 0;
    var safe = 0;
    for(var key in ret) {
      capacity += ret[key].storage;
      safe += ret[key].safe;
    }
    //TODO: Premium storage safety;
    this._capacities = {
      capacity : capacity * (1 + (database.getGlobalData.hasPremiumFeature(Constant.Premium.STORAGECAPACITY_BONUS) * Constant.PremiumData[Constant.Premium.STORAGECAPACITY_BONUS].bonus)),
      safe     : safe * (1 + (database.getGlobalData.hasPremiumFeature(Constant.Premium.SAFECAPACITY_BONUS) * Constant.PremiumData[Constant.Premium.SAFECAPACITY_BONUS].bonus)),
      buildings: ret
    };
    return this._capacities;
  },
  get _getSatisfactionData() {
    var r = {
      city      : 196,
      museum    : {
        cultural: 0,
        level   : 0
      },
      government: 0,
      tavern    : {
        wineConsumption: 0,
        level          : 0
      },
      research  : 0,
      priest    : 0,
      total     : 0
    };
    if(this.getBuildingFromName(Constant.Buildings.MUSEUM)) {
      r.museum.cultural = this.getCulturalGoods * 50;
      r.museum.level = this.getBuildingFromName(Constant.Buildings.MUSEUM).getLevel * 20;
    }
    r.government = Constant.GovernmentData[database.getGlobalData.getGovernmentType].happiness
                 + (Constant.GovernmentData[database.getGlobalData.getGovernmentType].happinessWithoutTemple * (this.getBuildingFromName(Constant.Buildings.TEMPLE) == undefined));
    if(this.getBuildingFromName(Constant.Buildings.TAVERN)) {
      r.tavern.level = this.getBuildingFromName(Constant.Buildings.TAVERN).getLevel * 12;
      var consumption = Math.floor(this.getResource(Constant.Resources.WINE).getConsumption * (100 / ( 100 - (this.getBuildingFromName(Constant.Buildings.VINEYARD) ? this.getBuildingFromName(Constant.Buildings.VINEYARD).getLevel : 0))));
      for(var i = 0; i < Constant.BuildingData[Constant.Buildings.TAVERN].wineUse.length; i++) {
        if(Math.abs(Constant.BuildingData[Constant.Buildings.TAVERN].wineUse[i] - consumption) <= 1) {
          r.tavern.wineConsumption = 60 * i;
          break
        }
      }
    }
    r.research = (25 * database.getGlobalData.getResearchTopicLevel(2080)) + (database.getGlobalData.getResearchTopicLevel(2999) * 10) + (this.getBuildingFromName(Constant.Buildings.PALACE) ? 50 * database.getGlobalData.getResearchTopicLevel(3010) : 0) + (this.getBuildingFromName(Constant.Buildings.PALACE) ? 200 * database.getGlobalData.getResearchTopicLevel(2120) : 0);

    r.priest = this._priests * 500 / this._getMaxPopulation * Constant.GovernmentData[database.getGlobalData.getGovernmentType].happinessBonusWithTempleConversion;
    r.priest = (r.priest <= 150 ? r.priest : 150);

    r.city = 196;
    var total = 0;
    for(var n in r) {
      if(typeof r[n] === 'object') {
        for(var o in r[n]) {
          total += r[n][o];
        }
      } else {
        total += r[n];
      }
    }
    r.total = total;
    r.corruption = Math.round(this._population + this._pop.happiness -total);
    return r
  },
  updatePopulation           : function(population) {
    var changed = this._population != population;
    this._population = population;
    this._lastPopUpdate = $.now();
    return changed;
  },
  updateCitizens             : function(citizens) {
    var changed = this._citizens != citizens;
    this._citizens = citizens;
    this._lastPopUpdate = $.now();
    return changed;
  },
  projectPopData             : function(untilTime) {
    var plus = this._getSatisfactionData;
    var maxPopulation = this._getMaxPopulation;
    var happiness = (1 - this.getCorruption) * plus.total - this._population;
    var hours = ((untilTime - this._lastPopUpdate) / 3600000);
    var pop = this._population + happiness * (1 - Math.pow(Math.E, -(hours / 50)));
    pop = (pop > maxPopulation) ? this._population > maxPopulation ? this._population : maxPopulation : pop;
    happiness = (1 - this.getCorruption) * plus.total - pop;
    //            this.updateCitizens(this._citizens + pop-this._population)
    //            this.updatePopulation(pop)
    this._citizens = this._citizens + pop - this._population;
    this._population = pop;
    this._lastPopUpdate = untilTime;
    var old = $.extend({}, this._pop);
    this._pop = {currentPop: pop, maxPop: maxPopulation, satisfaction: plus, happiness: happiness, growth: happiness * 0.02};
    if(Math.floor(old.currentPop) != Math.floor(this._pop.currentPop) || Math.floor(old.maxPop) != Math.floor(this._pop.maxPop) || Math.floor(old.happiness) != Math.floor(this._pop.happiness)) {
      events(Constant.Events.CITY_UPDATED).pub(this.getId, {population: true});
    }
  },
  get populationData() {
    return this._pop;
  },
  processUnitBuildList       : function() {
    var newList = [];
    for(var i = 0; i < this.unitBuildList.length; i++) {
      var list = this.unitBuildList[i];
      if(list.completionTime <= $.now()) {
        for(var uID in list.units) {
          var j = this.army.length;
        }
        while(j) {
          j--;
          if(uID == this.army[j].id) {
            this.army[uID] += list.units[uID]
          }
        }
      } else {
        newList.push(list);
      }
    }
    this.unitBuildList = newList;
  },
  clearUnitBuildList         : function(type) {
    if(type) {
      var newList = [];
      for(var i = 0; i < this.unitBuildList.length; i++) {
        if(this.unitBuildList[i].type != type) {
          newList.push(this.unitBuildList[i]);
        }
      }
    }
    this.unitBuildList = newList;
  },
  getUnitBuildsByUnit        : function() {
    var ret = {};
    for(var i = 0; i < this.unitBuildList.length; i++) {
      for(var uID in this.unitBuildList[i].units) {
        ret[uID] = ret[uID] || [];
        ret[uID].push({
          count         : this.unitBuildList[i].units[uID],
          completionTime: this.unitBuildList[i].completionTime})
      }
    }
    return ret;
  },
  getUnitTransportsByUnit    : function() {
    var ret = {};
    var data = database.getGlobalData.militaryMovements[this.getId];
    if(data) {
      for(var row in data) {
        for(var uID in data[row].troops) {
          ret[uID] = ret[uID] || [];
          ret[uID].push({
            count      : data[row].troops[uID],
            arrivalTime: data[row].arrivalTime,
            origin     : data[row].originCityId})
        }
      }
    }
    return ret;
  },
  get isCapital() {
    return this.getBuildingFromName(Constant.Buildings.PALACE) !== null
  },
  get isColony() {
    return this.getBuildingFromName(Constant.Buildings.PALACE) === null
  },
  get isUpgrading() {
    var res = false;
    $.each(this.getBuildings, function (idx, building) {
      res = res || building.isUpgrading;
    });
    return res
  }
};
function GlobalData() {
    this._version = {
        lastUpdateCheck : 0,
        latestVersion   : null,
        installedVersion: 0
    };
    this._research = {
        topics    : {},
        lastUpdate: 0
    };
    this.governmentType = 'demokratie';
    this.fleetMovements = [];
    this.militaryMovements = [];
    this.finance = {
        armyCost     : 0,
        armySupply   : 0,
        fleetCost    : 0,
        fleetSupply  : 0,
        currentGold  : 0,
        sigmaExpenses: function() {
            return this.armyCost + this.armySupply + this.fleetCost + this.fleetSupply
        },
        sigmaIncome  : 0,
        lastUpdated  : 0
    };
    this.localStrings = {};
		this.premium = {}
}

    GlobalData.prototype = {
        init                       : function() {
          $.each(Constant.Localization.default, this.addLocalisedString.bind(this));
            $.each(this.fleetMovements, function(key, movement) {
                this.fleetMovements[key] = new Movement(movement);
                this.fleetMovements[key]._updateTimer = null;
                this.fleetMovements[key].startUpdateTimer();
            }.bind(this));
        },
	      hasPremiumFeature: function(feature){
			      return this.premium[feature]?this.premium[feature].endTime > $.now() || this.premium[feature].continuous:false
	      },
	      setPremiumFeature:function(feature, endTime, continuous){
          var ret =  !this.hasPremiumFeature(feature) && endTime > $.now();
		      this.premium[feature] = {endTime:endTime, continuous:continuous};
          return ret
	      },
	      getPremiumTimeRemaining :function(feature){
		      return this.premium[feature]?this.premium[feature].endTime > $.now():0;
	      },
		    getPremiumTimeContinuous :function(feature){
			    return this.premium[feature]?this.premium[feature].continuous:false
		    },
        removeFleetMovement        : function(id) {
            var index = -1;
            $.each(this.fleetMovements, function(i, movement) {
                if(movement.getId == id) {
                    this.fleetMovements.splice(i, 1);
                    return false;
                }
            }.bind(this))
        },
        addFleetMovement           : function(transport) {
            try {
                this.fleetMovements.push(transport);
                transport.startUpdateTimer();
                this.fleetMovements.sort(function(a, b) {
                    return a.getArrivalTime - b.getArrivalTime
                });
                var changes = [];

                $.each(transport.getResources, function(resourceName, value) {
                    changes.push(resourceName)
                });
                //Todo: implement drilled down resource changes
                return changes
            } catch(e) {
                SITR.error('addFleetMovement', e);
            }
        },
        getMovementById            : function(id) {
            for(var i in this.fleetMovements) {
                if(this.fleetMovements[i].getId == id) {
                    return this.fleetMovements[i]
                }
            }
            return false;
        },
        clearFleetMovements        : function() {
            var changes = [];
            $.each(this.fleetMovements, function(index, item) {
                changes.push(item.getTargetCityId);
                item.clearUpdateTimer();
            });
            this.fleetMovements.length = 0;
            return $.exclusive(changes)
        },
        getResourceMovementsToCity : function(cityID) {
            return this.fleetMovements.filter(function(el) {
                if(el.getTargetCityId == cityID) {
                    return (el.getMission == 'trade' || el.getMission == 'transport')
                }
            });
        },
        getMilitaryMovementsToCity: function(cityID) {
            return this.fleetMovements.filter(function(el) {
                if(el.getTargetCityId == cityID) {
                    return (el.getMission != 'trade' && el.getMission != 'transport')
                }
            });
        },
        getResearchTopicLevel      : function(research) {
            return this._research.topics[research] || 0;
        },
        updateResearchTopic        : function(topic, level) {
            var changed = this.getResearchTopicLevel(topic) != level;
            this._research.topics[topic] = level;
            return changed;
        },
        get getGovernmentType() {
            return this.governmentType
        },
        getLocalisedString         : function(string) {
            var lString;
            //normal building var names "townHall"
            lString = this.localStrings[string.replace(/([A-Z])/g, "_$1").toLowerCase()];
            //space in name "town Hall"
            if(lString == undefined)
                lString = this.localStrings[string.toLowerCase().split(' ').join('_')];
            return (lString == undefined) ? string : lString;
        },
        addLocalisedString         : function(string, value) {
            if(this.getLocalisedString(string) == string)
                this.localStrings[string.toLowerCase().split(' ').join('_')] = value;
        },
        isOldVersion               : function() {
            return this._version.latestVersion < this._version.installedVersion;

        }
    };
  function Setting(name) {
    this._name = name;
    this._value = null
  }
  Setting.prototype = {
    get name() {
      return database.getGlobalData.getLocalisedString(this._name);
    },
    get type() {
      return Constant.SettingData[this._name].type
    }, 
    get description() {
      return database.getGlobalData.getLocalisedString(this._name + '_description');
    },
    get value() {
      return (this._value!=null?this._value:Constant.SettingData[this._name].default)
    },
    get category() {
      return Constant.SettingData[this._name].category
    },
    get choices() {
      return Constant.SettingData[this._name].choices || false
    },
    set value(value) {
      if (this.type === 'boolean') {
        this._value = !!value;
      }
      else if (this.type === 'number') {
        if (!isNaN(value)) {
          this._value = value
        }
      }
      else if (this.type === 'array' || this.type === 'orderedList') {
        if (Object.prototype.toString.call(value) === '[object Array]') {
          this._value = value
        }
      }
    }, 
    toJSON:function () {
      return {value:this._value}
    }};
/***********************************************************************************************************************
 * SITR
 **********************************************************************************************************************/
var SITR = {
  version        : 1.214,
  scriptId       : 132578,
  scriptName     : 'Simple Ikariam Town Resources Board',
  logger         : null,
  loaded         : false,
  log            : function(val) {
    if(debug) console.log('SITR: ', $.makeArray(arguments));
    if(log) {
      if(this.logger) {
        this.logger.val(val + '\n' + this.logger.val());
        return true
      } else {
        render.$tabs.append($(document.createElement("div")).attr('id', 'SITR_Log'));
        $('#SITR_Log').html('<div><textarea id="SITR_Logbox" rows="20" cols="120"></textarea></div>');
        $('<li><a href="#SITR_Log"><img class="ui-icon ui-icon-info"/></a></li>').appendTo("#SITR_Tabs .ui-tabs-nav");
        render.$tabs.tabs('refresh');
        this.logger = $('#SITR_Logbox');
        return this.log(val)
      }
    }
  },
  error          : function(func, e) {
    this.log('****** Error raised in ' + func + ' ******');
    this.log(e.name + ' : ' + e.message);
    this.log(e.stack);
    this.log('****** End ******');
    if(debug) {
      console.error('****** Error raised in ' + func + ' ******');
      console.error(e.name + ' : ' + e.message);
      console.error(e.stack);
      console.error('****** End ******')
    }
  },
  time : function(func, name){
    timing && console.time(name);
    var ret = func();
    timing && console.timeEnd(name);
    return ret
  },
  Init           : function() {
    ikariam.Init();
    render.Init();
    database.Init(ikariam.Host());
    this.CheckForUpdates(false);
    GM_registerMenuCommand(this.scriptName + ' - Manual Update', function() {
      SITR.CheckForUpdates(true);
    });

  },
  //original snippet taken from http://userscripts.org/scripts/show/20145
  CheckForUpdates: function(forced) {
    if((forced) || ((database.getGlobalData.LastUpdateCheck + 86400000 <= $.now()) && database.settings.autoUpdates.value)) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
    {
      try {
        GM_xmlhttpRequest({
          method : 'GET',
          url    : 'http://userscripts.org/scripts/source/' + SITR.scriptId + '.meta.js?' + $.now(),
          headers: {'Cache-Control': 'no-cache'},
          onload : function(resp) {
            var remote_version, rt;
            rt = resp.responseText;
            database.getGlobalData.LastUpdateCheck = $.now();
            remote_version = parseFloat(/@version\s*(.*?)\s*$/m.exec(rt)[1]);
            if(SITR.version != -1) {
              if(remote_version > SITR.version) {
                if(confirm('There is an update available for the Greasemonkey script "' + SITR.scriptName + '."\nWould you like to go to the install page now?')) {
                  GM_openInTab('http://userscripts.org/scripts/show/' + SITR.scriptId);
                }
              } else if(forced)
                render.toast('No update is available for "' + SITR.scriptName + '."');
            }
            database.getGlobalData.latestVersion = remote_version;
          }
        });
      } catch(err) {
        if(forced)
          render.toast('An error occurred while checking for updates:\n' + err);
      }
    }
  },
  HardReset      : function() {
    database = {};
    SITR.deleteVar("settings");
    SITR.deleteVar("Options"); //legacy
    SITR.deleteVar("options"); //legacy
    SITR.deleteVar("cities");
    SITR.deleteVar("LocalStrings");
    SITR.deleteVar("globalData");
    render.toast('Data Reset, reloading the page in a few seconds');
    setTimeout(function() {
      document.location = document.getElementById('js_cityLink').children[0].href
    }, 3500);
  },
	setVar : function(varname, varvalue) {
		GM_setValue(ikariam.Host() + varname, varvalue);
	},
	deleteVar : function(varname) {
		GM_deleteValue(ikariam.Host() + varname);
	},
	getVar : function(varname, vardefault) {
		var ret = GM_getValue(ikariam.Host() + varname);
		if(ret == undefined) {
			return vardefault;
		}
		return ret;
	}
};
/***********************************************************************************************************************
 * database
 **********************************************************************************************************************/
 var database = {
  _globalData           : new GlobalData(),
  cities                : {},
  settings              : {
    version               : SITR.version,
    window                : {
      left     : 150,
      top      : 180,
      activeTab: 0,
      visible  : true
    },
    addOptions            : function(objVals) {
      return $.mergeValues(this, objVals);
    }
  },
  Init                  : function(host) {
    $.each(Constant.Settings, function(key, value){
      this.settings[value] = new Setting(value);
    }.bind(database))
    var prefix = host;
    prefix = prefix.replace('.ikariam.', '-');
    prefix = prefix.replace('.', '-');
    this.Prefix = prefix;
    this.Load();
    events(Constant.Events.LOCAL_STRINGS_AVAILABLE).sub(ikariam.getLocalizationStrings.bind(this));
    $(window).on("beforeunload", function() {
      setTimeout(function() {
        database.Save();
      }, 0);
    });
  },
  addCity               : function(id, a) {
    if(a) {
      return $.mergeValues(new City(id), a);
    } else return new City(id);
  },
  get getBuildingCounts() {
    var buildingCounts = {};
    $.each(this.cities, function(cityId, city) {
      $.each(Constant.Buildings, function(key, value) {
        if(database.settings.compressedBuildingList.value && (value == Constant.Buildings.WINERY || value == Constant.Buildings.STONEMASON || value == Constant.Buildings.GLASSBLOWER || value == Constant.Buildings.ALCHEMISTS_TOWER)) {
          buildingCounts['productionBuilding'] = Math.max(buildingCounts['productionBuilding'] || 0, city.getBuildingsFromName(value).length)
        } else if(database.settings.compressedBuildingList.value && (value == Constant.Buildings.GOVERNORS_RESIDENCE || value == Constant.Buildings.PALACE)) {
          buildingCounts['colonyBuilding'] = Math.max(buildingCounts['colonyBuilding'] || 0, city.getBuildingsFromName(value).length)
        } else {
          buildingCounts[value] = Math.max(buildingCounts[value] || 0, city.getBuildingsFromName(value).length)
        }
      })
    });
    return buildingCounts
  },
  startMonitoringChanges: function() {
    //events('cityChanged').sub(this.cityChange.bind(this));
    events(Constant.Events.BUILDINGS_UPDATED).sub(this.Save.bind(this));
    events(Constant.Events.GLOBAL_UPDATED).sub(this.Save.bind(this));
    events(Constant.Events.MOVEMENTS_UPDATED).sub(this.Save.bind(this));
    events(Constant.Events.RESOURCES_UPDATED).sub(this.Save.bind(this));
    //events(Constant.Events.CITY_UPDATED).sub(this.Save.bind(this));
    events(Constant.Events.MILITARY_UPDATED).sub(this.Save.bind(this));
    events(Constant.Events.PREMIUM_UPDATED).sub(this.Save.bind(this));
  },
  Load                  : function() {
    var settings = this.UnSerialize(SITR.getVar("settings", ""));
    if(typeof settings === 'object') {
      if(!this.isDatabaseOutdated(settings.version)) {

        $.mergeValues(this.settings, settings);

        var globalData = this.UnSerialize(SITR.getVar("globalData", ""));
        if (globalData.governmentType == '') globalData.governmentType = 'demokratie';
        if(typeof globalData == 'object') {
          $.mergeValues(this._globalData, globalData);

        }
        var cities = this.UnSerialize(SITR.getVar("cities", ""));
        if(typeof cities == 'object') {
          for(var cityID in cities) {
            (this.cities[cityID] = this.addCity(cities[cityID]._id, cities[cityID])).init()
          }
        }
      }
      this._globalData.init();
    }
      events(Constant.Events.DATABASE_LOADED).pub();
  },
  Serialize             : function(data) {
    if(data)
      try {
        var ret = JSON.stringify(data)
      } catch(e) {
        SITR.log('error saving')
      }
    return ret || undefined;
  },
  UnSerialize           : function(data) {
    if(data)
      try {
        var ret = JSON.parse(data)
      } catch(e) {
        SITR.log('error loading')
      }
    return ret || undefined;
  },
  Save                  : function() {
    events.scheduleAction(function() {
      SITR.setVar("cities", database.Serialize(database.cities));
      SITR.setVar("settings", database.Serialize(database.settings));
      SITR.setVar("globalData", database.Serialize(database._globalData));
    })

  },
  get getGlobalData() {
    return this._globalData
  },
  isDatabaseOutdated    : function(version) {
    return 1.209 > (version || 0);
  },
  getCityFromId         : function(id) {
    return this.cities[id] || null
  },
  get getArmyTotals() {
    if(!this._armyTotals) {
      this._armyTotals = Utils.cacheFunction(this._getArmyTotals.bind(database), 1000)
    }
    return this._armyTotals()
  },
  _getArmyTotals: function() {
    var totals = {};
    $.each(Constant.UnitData, function(unitId, info) {
      totals[unitId] = {training: 0, total: 0, incoming: 0};
    });
    $.each(this.cities, function(cityId, city) {
      var train = city.military.getTrainingTotals;
      var incoming = city.military.getIncomingTotals;
      var total = city.military.getUnits.totals;
      $.each(Constant.UnitData, function(unitId, info) {
        totals[unitId].training += train[unitId] || 0;
        totals[unitId].total += total[unitId] || 0;
        totals[unitId].incoming += incoming[unitId] || 0;
      });
    });
    return totals
  },
  get getCityCount (){
    return Object.keys(this.cities).length
  },
  _getArmyTrainingTotals :function(){

  }
};
/***********************************************************************************************************************
 * render view
 **********************************************************************************************************************/

var render = {
  mainContentBox                : null,
  $tabs                         : null,
  cityRows                      : {
    building: {},
    resource: {},
    army    : {}
  },
  _cssResLoaded                 : false,
  toolTip                       : {
    elem : null,
    timer: null,
    hide : function() {
      render.toolTip.elem.parent().hide()
    },
    show : function() {
      render.toolTip.elem.parent().show()
    },

    mouseOver : function(event) {
      if(render.toolTip.timer) {
        render.toolTip.timer()
      }
      var f = function(shiftKey) {
        return function() {
          var elem;
          elem = $(event.target).attr('data-tooltip') ? event.target : $(event.target).parents('[data-tooltip]');

          render.toolTip.elem.html(render.toolTip.dynamicTip($(event.target).parents('tr').attr('id') ? $(event.target).parents('tr').attr('id').split('_').pop() : 0, elem));
          return render.toolTip.elem.html()
        }
      }(event.originalEvent.shiftKey);
      if(f(event.originalEvent.shiftKey)) {
        render.toolTip.show();
        render.toolTip.timer = events.scheduleActionAtInterval(f, 1000);
      }
    },
    mouseMove : function(event) {
      if(render.toolTip.timer && render.toolTip.elem) {
        var l = parseInt(render.mainContentBox.css('left').split('px')[0]);
        var t = parseInt(render.mainContentBox.css('top').split('px')[0]);
        var x = event.pageX - 15 - l;
        var y = event.pageY + 15 - t;

        if(render.mainContentBox.height() - render.toolTip.elem.height() < y) {
          y = event.pageY - render.toolTip.elem.height() - 15 - t
        }
        if(render.mainContentBox.width() - render.toolTip.elem.width() < x) {
          x = event.pageX - render.toolTip.elem.width() + 15 - l
        }
        render.toolTip.elem.parent().css({
          left: (x) + 'px',
          top : (y) + 'px'
        });
      }
    },
    mouseOut  : function(event) {
      if(render.toolTip.timer) {
        render.toolTip.timer();
        render.toolTip.timer = null
      }
      render.toolTip.hide()
    },
    init      : function() {
      render.toolTip.elem = render.mainContentBox.append($('<div id="SITRTip" style="z-index: 999999999;"><div class="content"></div></div>')).find('div.content');
      render.mainContentBox.on('mouseover', '[data-tooltip]', render.toolTip.mouseOver).on('mousemove', '[data-tooltip]', render.toolTip.mouseMove).on('mouseout', '[data-tooltip]', render.toolTip.mouseOut);
    },
    dynamicTip: function(id, elem) {
      var $elem = $(elem);
      if($elem.attr('data-tooltip') === "dynamic") {
        var tiptype = $elem.attr('class').split(" ")
      } else {
        return $elem.attr('data-tooltip') || '';
      }
      var city = database.getCityFromId(id);
      var resourceName;
      if(city) {
        resourceName = $elem.is('td') ? $elem.attr('class').split(' ').pop() : $elem.parent('td').attr('class').split(' ').pop()
      }
      var total;
      switch(tiptype.shift()) {
        case "incoming":
          return getIncomingTip();
          break;
        case "current":
          return '';
          break;
        case "progressbar":
          return getProgressTip();
          break;
        case "total":
          switch($elem.attr('id').split('_').pop()) {
            case "sigma":
              return getResourceTotalTip();
              break;
            case "goldincome":
              return getGoldIncomeTip();
              break;
            case "research":
              var researchDat;
              $.each(database.cities, function(cityId, city) {
                if (researchDat){
                  $.each(city.research.researchData,function(key, value){
                    researchDat[key] += value;
                  })
                }
                else researchDat = $.extend({}, city.research.researchData);
              });
              return getResearchTip(researchDat);
              break;
            case "army":
              return "soon";
              break;
            case "wineincome":
              total = 0;
              var consumption = 0;
              resourceName = $elem.attr('id').split('_').pop().split('income').shift();
              $.each(database.cities, function(cityId, c) {
                total += c.getResource(resourceName).getProduction;
                consumption += c.getResource(resourceName).getConsumption;
              });

              return getProductionConsumptionSubSumTip(total * 3600, consumption, true);
              break;
            default :
              total = 0;
              resourceName = $elem.attr('id').split('_').pop().split('income').shift();
              $.each(database.cities, function(cityId, c) {
                total += c.getResource(resourceName).getProduction
              });
              return getProductionTip(total * 3600);
              break;
          }
        case "population":
          return getPopulationTip();
          break;
        case "population_growth":
          return getGrowthTip();
          break;
        case "research":
          return getResearchTip();
          break;
		case "prodconssubsum":
	      return getProductionConsumptionSubSumTip(city.getResource(resourceName).getProduction * 3600, city.getResource(resourceName).getConsumption);
		  break;
        case "building":
          var bName = tiptype.shift(); //building name
          var index = parseInt(bName.slice(-1)); //building level
          bName = bName.slice(0, -1);
          return getBuildingTooltip(city.getBuildingsFromName(bName)[index]);
        case "army":
          switch(tiptype.shift()) {
            case "unit":
              return '';
              break;
            case "movement":
              return getArmyMovementTip(tiptype.pop());
              break

          }
          break;
        default :
          return "";
          break;
      }
      function getGoldIncomeTip() {
        var researchCost = 0;
        var income = 0;
        $.each(database.cities, function(cityID, city) {
          researchCost += Math.floor(city.getExpenses);
          income += Math.floor(city.getIncome)
        });
        var expense = database.getGlobalData.finance.armyCost + database.getGlobalData.finance.armySupply + database.getGlobalData.finance.fleetCost + database.getGlobalData.finance.fleetSupply - researchCost;

        return '<table>\n    <thead>\n    <td><img src="skin/resources/icon_gold.png" style="height: 11px;"></td>\n    <td><b>Hour</b></td>\n    <td class="lfdash"><b>Day</b></td>\n    <td class="lfdash"><b>Week</b></td>\n    <td></td>\n    </thead>\n    <tbody>\n    <tr class="data">\n        <td><b>-</b></td>\n        <td> ' + Utils.FormatNumToStr(database.getGlobalData.finance.armyCost, false, 0) + ' </td>\n        <td class="lfdash"> ' + Utils.FormatNumToStr(database.getGlobalData.finance.armyCost * 24, false, 0) + '</td>\n        <td class="lfdash"> ' + Utils.FormatNumToStr(database.getGlobalData.finance.armyCost * 24 * 7, false, 0) + '</td>\n        <td class="left lfdash"><i>«Army Cost</i></td>\n    </tr>\n    <tr class="data">\n        <td><b>-</b></td>\n        <td class="nolf"> ' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetCost, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetCost * 24, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetCost * 24 * 7, false, 0) + '</td>\n        <td class="left lfdash"><i>«Fleet Cost</i></td>\n    </tr>\n    <tr class="data">\n        <td><b>-</b></td>\n        <td class="nolf">' + Utils.FormatNumToStr(database.getGlobalData.finance.armySupply, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr(database.getGlobalData.finance.armySupply * 24, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr(database.getGlobalData.finance.armySupply * 24 * 7, false, 0) + '</td>\n        <td class="left lfdash"><i>«Army Supply</i></td>\n    </tr>\n    <tr class="data">\n        <td><b>-</b></td>\n        <td class="nolf">' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetSupply, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetSupply * 24, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetSupply * 24 * 7, false, 0) + '</td>\n        <td class="left lfdash"><i>«Fleet Supply</i></td>\n    </tr>\n    <tr class="data">\n        <td><b>-</b></td>\n        <td class="nolf">' + Utils.FormatNumToStr(researchCost, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr(researchCost * 24, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr(researchCost * 24 * 7, false, 0) + '</td>\n        <td class="left lfdash"><i>«Research</i></td>\n    </tr>\n    </tbody>\n    <tfoot>\n    <tr>\n        <td class="icon incomeIcon"></td>\n        <td class="nolf">' + Utils.FormatNumToStr(income, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr(income * 24, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr(income * 7 * 24, false, 0) + '</td>\n        <td class="left lfdash"><i>«Income</i></td>\n    </tr>\n    <tr>\n        <td><b>-</b></td>\n        <td class="nolf">' + Utils.FormatNumToStr(expense, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(expense * 24, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr(expense * 24 * 7, false, 0) + '</td>\n        <td class="left lfdash"><i>«Expenses</i></td>\n    </tr>\n    <tr  class="total">\n        <td><b>Σ ' + ((income - expense > 0) ? '+' : '-') + '</b></td>\n        <td class="lfdash">' + Utils.FormatNumToStr((income - expense), false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr((income - expense) * 24, false, 0) + '</td>\n        <td class="lfdash">' + Utils.FormatNumToStr((income - expense) * 7 * 24, false, 0) + '</td>\n        <td></td>\n    </tr>\n    </tfoot>\n</table>'
      }

      function getArmyMovementTip(unit) {
        var total = 0;
        var table = '<table>\n    <thead>\n        <td><img src="{0}" style="height: 11px;"></td>\n        <td><b>Training</b></td>\n        <td></td>\n    </thead>\n    <tbody>\n{1}\n    <tr class="small">\n        <td></td>\n        <td>{2}</td>\n        <td class="left"><i>«Total</i></td>\n    </tr>\n    </tbody>\n</table>';
        var rows = '';
        $.each(city.military.getTrainingForUnit(unit), function(index, data) {
          rows += Utils.format('<tr class="data">\n    <td><b>+</b></td>\n    <td >{0}</td>\n    <td ><i>«{1}</i></td>\n</tr>', [data.count, Utils.FormatTimeLengthToStr(data.time - $.now(), 3)]);
          total += data.count;
        });

        if(rows === '') {
          return ''
        } else {
          return Utils.format(table, [getImage(unit), rows, total])
        }
      }

      function makeIncomeTooltip(income, icon) {
        //income = income || 0;
        switch(icon) {
          case Constant.Resources.WOOD:
            icon = 'skin/resources/icon_wood.png';
            break;
          case Constant.Resources.WINE:
            icon = 'skin/resources/icon_wine.png';
            break;
          case Constant.Resources.MARBLE:
            icon = 'skin/resources/icon_marble.png';
            break;
          case Constant.Resources.GLASS:
            icon = 'skin/resources/icon_glass.png';
            break;
          case Constant.Resources.SULFUR:
            icon = 'skin/resources/icon_sulfur.png';
            break;
          case 'research':
            icon = 'skin/layout/bulb-on.png';
            break;
          case 'gold':
            icon = 'skin/resources/icon_gold.png';
            break;
          default:
            icon = '';
        }
        return '<table><thead><td><img src="' + icon + '" style="height: 11px;"></td><td><b>Hour</b></td><td ><b>Day</b></td><td ><b>Week</b></td><td></td></thead><tbody>' + '<tr><td><b>+</b></td><td >' + Utils.FormatNumToStr(income, false, 0) + '</td> <td >' + Utils.FormatNumToStr(income * 24, false, 0) + '</td> <td >' + Utils.FormatNumToStr(income * 24 * 7, false, 0) + '</td> <td ><i>«Production</i></td> </tr>' + '</tbody></table>';
      }

      function getGrowthTip() {
        var populationData = city.populationData;
        var img = populationData.growth > 1 ? (populationData.growth < 6 ? 'happy' : 'ecstatic') : populationData.growth < 0 ? (populationData.growth < -1 ? 'outraged' : 'sad') : 'neutral';
        img = Utils.format('skin/smilies/{0}_x25.png', [img]);
        //                if (populationData.growth > 1) {
        //                    img = populationData.growth < 6 ? 'happy' : 'ecstatic';
        //                } else if (populationData.growth < 1) {
        //                    img = populationData.growth < 0 ? populationData.growth < -1 ? 'outraged' : 'sad' : 'neutral';
        //                }

        var growthTip = '<table>\n    <thead>\n    <tr>\n        <th><div class="icon" style="background-image:url(\'{0}\')"></div></td>\n        <th colspan="2"><b>{1}</b></td>\n    </tr>\n    </thead>\n    <tbody>{2}</tbody>\n    <tfoot>\n    <tr>\n        <td class="icon incomeIcon"></td>\n        <td></td>\n        <td >{3}</td>\n    </tr>\n    <tr>\n        <td class="icon populationImage"></td>\n        <td></td>\n        <td >{4}</td>\n    </tr>\n    <tr style="border-top:3px solid #FDF7DD">\n        <td><b>Σ {5}</b></td>\n        <td></td>\n        <td >{6}</td>\n    </tr>\n    </tfoot>\n</table>';
        var growthTr = '<tr class="data">\n    <td class="icon {1}Icon"></td>\n    <td></td>\n    <td >{0}</td>\n</tr>';
        var growthRows = '';
        var incomeSum = 0
        $.each(populationData.satisfaction, function(key, value) {
          var total = 0;
          if(key === 'total') return true;
          if(typeof value === 'object') {
            for(var type in value) {
              total += value[type];
            }
          } else {
            total += value
          }
          if(total) {
            incomeSum += total;
            growthRows += Utils.format(growthTr, [total, key])
          }
        });
        return Utils.format(growthTip, [img, database.getGlobalData.getLocalisedString('Satisfaction') , growthRows, Utils.FormatNumToStr(incomeSum, false, 0), Utils.FormatNumToStr(populationData.currentPop, false, 0), (populationData.happiness >= 0 ? '+' : '-'), Utils.FormatNumToStr(populationData.happiness, false, 0)]);
      }

      function getPopulationTip() {
        var populationData = city.populationData;
        var populationTip = '<table>\n    <thead>\n    <td><img src="skin/resources/icon_population.png" style="height: 11px;" alt=""></td>\n    <td><b>{0}</b></td>\n    <td ><b>{1}</b></td>\n    <td ><b>{2}</b></td>\n    </thead>\n    <tbody>\n    <tr class="data">\n        <td><b>Σ</b></td>\n        <td >{3}</td>\n        <td >{4}</td>\n        <td >{5}</td>\n    </tr>\n</table>';
        return Utils.format(populationTip, [database.getGlobalData.getLocalisedString('Citizens'), database.getGlobalData.getLocalisedString('Population'), database.getGlobalData.getLocalisedString('Maximum'), Utils.FormatNumToStr(city._citizens, false, 0), Utils.FormatNumToStr(populationData.currentPop, false, 0), Utils.FormatNumToStr(populationData.maxPop, false, 0)]);
      }

      function getResearchTip(researchData) {
        var premium = database.getGlobalData.hasPremiumFeature(Constant.Premium.RESEARCH_POINTS_BONUS)|| database.getGlobalData.hasPremiumFeature(Constant.Premium.RESEARCH_POINTS_BONUS_EXTREME_LENGTH);
        researchData = researchData || city.research.researchData
        var rows = '';
        var tooltip = '<table>\n    <thead>\n    <tr>\n        <th colspan="3"><div align="center">\n            <img src="skin/layout/bulb-on.png" style="height: 15px; float: left">\n            \n        </div><b>{0}</b></th>\n    </tr>\n    </thead>\n    <tbody>\n    {1}\n    </tbody>\n    <tfoot>\n    <tr style="border-top:3px solid #FDF7DD">\n        <td><b>Σ</b></td>\n        <td >{2}</td>\n        <td >«Total</td>\n    </tr>\n    </tfoot>\n</table>';
        var tr = '<tr class="data">\n    <td >{2}</td>\n    <td >{0}</td>\n    <td >«{1}</td>\n</tr>';
        var gameforgeResearch = researchData.researchBonus + researchData.premiumResearchBonus;
        var gameforgeCultural = researchData.culturalGoods + researchData.premiumCulturalGoodsBonus;
        var gameforgePremium = researchData.premiumScientistBonus;

        rows = Utils.format(tr,[Utils.FormatNumToStr(researchData.scientists,false,0),
          database.getGlobalData.getLocalisedString('Scientists'),
          '+'
        ]);
        rows += Utils.format(tr,[Utils.FormatNumToStr(gameforgeResearch,false,2),
                                database.getGlobalData.getLocalisedString('research'),
                                '+'
        ]);

        if (premium){
          rows += Utils.format(tr,[
            Utils.FormatNumToStr(gameforgePremium,false, 2),
            database.getGlobalData.getLocalisedString('premium'),
            '+'])
        }
        rows += Utils.format(tr, [
          Utils.FormatNumToStr(gameforgePremium+gameforgeResearch+researchData.scientists,false,2),
          database.getGlobalData.getLocalisedString('Subtotal'),
          '<b>Σ</b>'
        ]).replace('class="data"','class="total"')
        if(database.getGlobalData.getGovernmentType == Constant.Government.DEMOCRACY) {
          rows += Utils.format(tr, [
            Utils.FormatNumToStr(gameforgeCultural,false,2),
            database.getGlobalData.getLocalisedString('Cultural Goods'),
            '+'
          ])
        }
        if(researchData.corruption) {
          rows += Utils.format(tr, [
            Utils.FormatNumToStr(researchData.corruption,false,2),
            'Corruption',
            '-'
          ])
        }
        return Utils.format(tooltip, [database.getGlobalData.getLocalisedString('Research'), rows, Utils.FormatNumToStr(researchData.total,false, 2)])
      }

      function getIncomingTip() {
        var cRes = city.getResource(resourceName).getCurrent;
        var rMov = database.getGlobalData.getResourceMovementsToCity(city.getId);
        //if (rMov) rMov = rMov[0];
        var table = '<table>\n    <thead>{0}</thead>\n    <tbody>{1}</tbody>\n    <tfoot>{2}</tfoot>\n</table>';
        var row = '<tr class="data">\n    <td><div class="icon {0}Image"></div></td>\n    <td>{1}</td>\n    <td><i>«{2}</i></td>\n    <td>{3}</td>\n</tr>\n<tr class="small data">\n    <td colspan=3></td>\n    <td>({4})</td>\n</tr>';
        var header = '<tr>\n    <th ><div class="icon merchantImage"></div></th>\n    <th colspan="3">Transports</th>\n</tr>';
        var subtotal = '<tr class="total">\n    <td>=</td>\n    <td>{0}</td>\n    <td colspan=2><i>{1}</i></td>\n</tr>';
        var footer = '<tr class="total">\n    <td>Σ</td>\n    <td colspan=3>{0}</td>\n</tr>';
        if(rMov.length) {
          var trades = '';
          var transp = '';
          var movTotal = 0;
          for(var movID in rMov) {
            if(rMov[movID].getResources[resourceName]) {
              var origin = database.getCityFromId(rMov[movID].getOriginCityId);
              var tMov = Utils.format(row, [
                rMov[movID].getMission, Utils.FormatNumToStr(rMov[movID].getResources[resourceName], false, 0), origin ? origin.getName : rMov[movID].getOriginCityId, Utils.FormatRemainingTime(rMov[movID].getArrivalTime - $.now()), rMov[movID].isLoading ? 'Loading: ' + Utils.FormatRemainingTime(rMov[movID].getLoadingTime, false) : rMov[movID].getArrivalTime > $.now() ? 'en route' : 'Arrived'
              ]);
              if(rMov[movID].getMission == "trade")
                trades += tMov; else if(rMov[movID].getMission == "transport")
                transp += tMov;
              movTotal += rMov[movID].getResources[resourceName]
            }
          }
          if(trades === '' && transp === '') {
            return ''
          }
          var body = trades + transp + Utils.format(subtotal, [
            Utils.FormatNumToStr(movTotal, false, 0), ''
          ]);
          var foot = Utils.format(footer, [
            Utils.FormatNumToStr((movTotal + cRes), false, 0)
          ]);
          var head = Utils.format(header, []);
          return Utils.format(table, [head, body, foot]);
        }
        return ''
      }

      //TODO Redo this function
      function getBuildingTooltip(building) {
        if(!building || building.isMaxLevel) return '';
        var uConst = (building.isUpgrading);
        var resourceCost = building.getUpgradeCost;
        var elem = '';
        var time = 0;
        for(var key in resourceCost) {
          if(key == 'time') {
            time = '<tr class="total"><td><img src="skin/resources/icon_time.png" style="height: 11px; float: left;"></td><td colspan=2 ><i>(' + Utils.FormatTimeLengthToStr(resourceCost[key], 3, ' ') + ')</i></td></tr>';
            continue;
          }
          if(resourceCost[key]) {
            elem += '<tr class="data"><td><div class="icon ' + key + 'Image"></div></td><td>' + Utils.FormatNumToStr(resourceCost[key], false, 0) + '</td>';
            elem += (building.city().getResource(key).getCurrent < resourceCost[key] ? '<td class="red left">(' + Utils.FormatNumToStr(building.city().getResource(key).getCurrent - resourceCost[key], true, 0) + ')</td></tr>' : '<td><img src="skin/interface/check_mark_17px.png" style="height:11px; float:left;"></td></tr>')
          }
        }
        elem = (elem !== '') ? '<table><thead><tr><th colspan=3 align="center"><b>' + (uConst ? 'Next Level' : 'Cost') + '</b></th></tr></thead><tbody>' + elem + '</tbody><tfoot>' + time + '</tfoot></table>' : '';
        if(uConst) {
          elem = '<table><thead><tr><th colspan=2><div class="prog" style="text-shadow:0 1px #FFFFFF"><b>Under Construction</b></div></th></tr></thead>' + '<tbody><tr class="data"><td></td><td>' + Utils.FormatFullTimeToDateString(building.getCompletionTime, true) + '</td></tr></tbody>' + '<tfoot><tr class="total"><td><img src="skin/resources/icon_time.png" style="height: 11px; float: left;"></td><td colspan=2 class="left"><i>(' + Utils.FormatTimeLengthToStr(building.getCompletionTime - $.now(), 3, ' ') + ')</i></td></tr></tfoot></table>' + elem
        }
        return elem
      }

      function getResourceTotalTip() {
        var totals = {};
        $.each(database.cities, function(cityId, city) {
          $.each(Constant.Resources, function(key, resourceName) {
            var res = city.getResource(resourceName);
            if(!totals[resourceName]) {
              totals[resourceName] = {}
            }

            totals[resourceName].total = totals[resourceName].total ? totals[resourceName].total + res.getCurrent : res.getCurrent;
            totals[resourceName].income = totals[resourceName].income ? totals[resourceName].income + res.getProduction * 3600 - res.getConsumption : res.getProduction * 3600 - res.getConsumption;

          })
        });

        var r = '';
        var finalSums = {income: 0, total: 0, day: 0, week: 0};
        $.each(totals, function(resourceName, data) {
          var day = data.total + data.income * 24;
          var week = data.total + data.income * 168;
          r += Utils.format('<tr class="data">\n    <td><div class="icon {0}Image"></div></td>\n    <td >{1}</td>\n    <td >{2}</td>\n    <td >{3}</td>\n    <td >{4}</td>\n</tr>', [resourceName, Utils.FormatNumToStr(data.income, false, 0), Utils.FormatNumToStr(data.total, false, 0) , Utils.FormatNumToStr(day, false, 0) , Utils.FormatNumToStr(week, false, 0)]);
          finalSums.income += data.income;
          finalSums.total += data.total;
          finalSums.day += day;
          finalSums.week += week
        });
        if(r === '') {
          return ''
        } else {
          return Utils.format('<table>\n    <thead>\n    <td></td>\n    <td><b>Income</b></td>\n    <td ><b>Total</b></td>\n    <td ><b>+24hrs</b></td>\n    <td ><b>+7days</b></td>\n    </thead>\n    <tbody>\n    {0}\n    <tfoot>\n    <td></td>\n    <td >{1}</td>\n    <td >{2}</td>\n    <td >{3}</td>\n    <td >{4}</td>\n    </tfoot>\n    </tbody>\n</table>', [r, Utils.FormatNumToStr(finalSums.income, false, 0) , Utils.FormatNumToStr(finalSums.total, false, 0) , Utils.FormatNumToStr(finalSums.day, false, 0) , Utils.FormatNumToStr(finalSums.week, false, 0)])
        }
      }

      function getProgressTip() {
        if (resourceName == 'population' || resourceName =='ui-corner-all'){return ''}; // temp fix for population progressbar
        var storage = city.maxResourceCapacities;
        var current = city.getResource(resourceName).getCurrent;
        var fulltime = (city.getResource(resourceName).getFullTime || 0 - city.getResource(resourceName).getEmptyTime) * 3600000;
        var progTip = '<table>\n    <thead>\n    <tr>\n        <th></th>\n        <th><b>Safe</b></th>\n        <th ><b>Capacity</b></th>\n        <th></th>\n    </tr>\n    </thead>\n    <tbody>{0}\n    <tr class="total">\n        <td style="width:35px; background: url(\'{9}\');background-size: auto 45px;background-position: -3px -15px; \n        background-repeat: no-repeat;"></td>\n        <td>{1}</td>\n        <td >{2}</td>\n        <td ><i>«Maximum</i></td>\n    </tr>\n    <tr class="total">\n        <td style="width:35px; background: url(\'{10}\');background-size: auto 45px;background-position: -3px -15px;\n            background-repeat: no-repeat;"></tdstyle></td>\n        <td>{3}</td>\n        <td >{4}</td>\n        <td ><i>«Used</i></td>\n    </tr>\n    <tr class="total">\n        <td><b></b></td>\n        <td>{5}</td>\n        <td >{6}</td>\n        <td ></td>\n    </tr>\n    </tbody>\n    <tfoot>\n    <tr class="small total" style="border-top:3px solid #FDF7DD">\n        <td><b></b></td>\n        <td></td>\n        <td >{7}</td>\n        <td >«To {8}</td>\n    </tr>\n    </tfoot>\n</table>';
        var progTr = '<tr  class="data">\n    <td style="width:35px; background: url(\'{0}\');background-size: auto 40px;background-position: -3px -10px; \n        background-repeat: no-repeat;">\n    <td >{1}</td>\n    <td >{2}</td>\n    <td >«{3}</td>\n</tr>';
        var rows = '';
        $.each(storage.buildings, function(buildingName, data) {
          rows += Utils.format(progTr, [Constant.BuildingData[buildingName].icon, Utils.FormatNumToStr(data.safe, false, 0), Utils.FormatNumToStr(data.storage, false, 0), database.getGlobalData.getLocalisedString(buildingName)])
        });
        return Utils.format(progTip,
	        [rows, Utils.FormatNumToStr(storage.safe, false, 0),
		        Utils.FormatNumToStr(storage.capacity, false, 0),
		        Utils.FormatNumToStr(Math.min(storage.safe, current), false, 0),
		        Utils.FormatNumToStr(Math.min(storage.capacity, current), false, 0),
		        Utils.FormatNumToStr(Math.min(1, current / storage.safe) * 100, false, 2) + '%',
		        Utils.FormatNumToStr(Math.min(1, current / storage.capacity) * 100, false, 2) + '%',
		        Utils.FormatTimeLengthToStr(fulltime),
		        fulltime < 0 ? 'empty' : 'full',
		        database.getGlobalData.hasPremiumFeature(Constant.Premium.STORAGECAPACITY_BONUS)?Constant.PremiumData[Constant.Premium.STORAGECAPACITY_BONUS].icon:'',
		        database.getGlobalData.hasPremiumFeature(Constant.Premium.SAFECAPACITY_BONUS)?Constant.PremiumData[Constant.Premium.SAFECAPACITY_BONUS].icon:''
	        ])
      }

      function getConsumptionTooltip(consumption, force) {
        //future proofing stage 1 :D
        if((consumption === 0 && !force) || resourceName !== Constant.Resources.WINE) {
          return ''
        } else return Utils.format('<table>\n    <thead>\n        <tr>\n            <th><div class="icon {0}Image"></div></th>\n            <th><b>{1}</b></th>\n            <th ><b>{2}</b></th>\n            <th ><b>{3}</b></th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr class="data">\n            <td><b>-</b></td>\n            <td >{4}</td>\n            <td >{5}</td>\n            <td >{6}</td>\n        </tr>\n    </tbody>\n    <tfoot>\n    <tr class="small total">\n        <td colspan="2"></td>\n        <td>{7}</td>\n        <td ><i>{8}</i></td>\n    </tr>\n    </tfoot>\n</table>', [
          Constant.Resources.WINE, '1' + database.getGlobalData.getLocalisedString('hour'), '1' + database.getGlobalData.getLocalisedString('day'), '7' + database.getGlobalData.getLocalisedString('day'), Utils.FormatNumToStr(consumption, false, 0), Utils.FormatNumToStr(consumption * 24, false, 0), Utils.FormatNumToStr(consumption * 24 * 7, false, 0), ikariam.getNextWineTick(2), '«' + database.getGlobalData.getLocalisedString('Next Tick')
        ])
      }

      function getProductionTip(income, force) {
        if(income === 0 && !force) {
          return ''
        } else return Utils.format('<table>\n    <thead>\n    <th><div class="icon {0}Image"></div></th>\n    <th>{1}</th>\n    <th >{2}</th>\n    <th >{3}</th>\n    </thead>\n    <tbody>\n    <tr class="data">\n        <td class="icon incomeIcon"></td>\n        <td >{4}</td>\n        <td >{5}</td>\n        <td >{6}</td>\n    </tr>\n    </tbody>\n</table>', [
          resourceName, '1' + database.getGlobalData.getLocalisedString('hour'), '1' + database.getGlobalData.getLocalisedString('day'), '7' + database.getGlobalData.getLocalisedString('day'), Utils.FormatNumToStr(income, false, 0), Utils.FormatNumToStr(income * 24, false, 0), Utils.FormatNumToStr(income * 24 * 7, false, 0), database.getGlobalData.getLocalisedString('Production')
        ])
      }

	  function getProductionConsumptionSubSumTip(income, consumption, force) {
	    if(income === 0 && consumption === 0 && !force) {
		  return ''
		} else if (resourceName !== Constant.Resources.WINE) {
		  return getProductionTip(income, force)
		} else if (income === 0) {
		  return getConsumptionTooltip(consumption, force)
		} else return Utils.format('<table>\n    <thead>\n        <tr>\n            <th><div class="icon {0}Image"></div></th>\n            <th><b>{1}</b></th>\n            <th ><b>{2}</b></th>\n            <th ><b>{3}</b></th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr class="data">\n            <td class="icon incomeIcon"></td>\n            <td >{4}</td>\n            <td >{5}</td>\n            <td >{6}</td>\n        </tr>\n        <tr class="data">\n            <td><b>-</b></td>\n            <td >{7}</td>\n            <td >{8}</td>\n            <td >{9}</td>\n        </tr>\n        <tr class="total">\n            <td>{10}</td>\n            <td >{11}</td>\n            <td >{12}</td>\n            <td >{13}</td>\n        </tr>\n    </tbody>\n    <tfoot>\n    <tr class="small total">\n        <td colspan="2"></td>\n        <td>{14}</td>\n        <td ><i>{15}</i></td>\n    </tr>\n    </tfoot>\n</table>', [
		  resourceName,
		  '1' + database.getGlobalData.getLocalisedString('hour'),
		  '1' + database.getGlobalData.getLocalisedString('day'),
		  '7' + database.getGlobalData.getLocalisedString('day'),

		  Utils.FormatNumToStr(income, false, 0),
		  Utils.FormatNumToStr(income * 24, false, 0),
		  Utils.FormatNumToStr(income * 24 * 7, false, 0),

		  Utils.FormatNumToStr(consumption, false, 0),
		  Utils.FormatNumToStr(consumption * 24, false, 0),
		  Utils.FormatNumToStr(consumption * 24 * 7, false, 0),
      (income > consumption?'+':'-'),
		  Utils.FormatNumToStr((income - consumption), false, 0),
		  Utils.FormatNumToStr((income - consumption) * 24, false, 0),
		  Utils.FormatNumToStr((income - consumption) * 24 * 7, false, 0),

		  ikariam.getNextWineTick(2), '«' + database.getGlobalData.getLocalisedString('Next Tick')
		])
	  }

      function getImage(unitID) { //Todo pull into css
        // /skin/characters/fleet/60x60/ship_submarine_faceright.png
        // /skin/characters/military/x60_y60/y60_medic_faceright.png
        return (Constant.UnitData[unitID].type == 'fleet') ? 'skin/characters/fleet/60x60/' + unitID + '_faceright.png' : 'skin/characters/military/x60_y60/y60_' + unitID + '_faceright.png'
      }
    }
  },
  cssResLoaded                  : function() {
    var ret = this._cssResLoaded;
    this._cssResLoaded = true;
    return ret;
  },
  Init                          : function() {

	  this.SidePanelButton();
    events(Constant.Events.DATABASE_LOADED).sub(function(){
      this.LoadCSS();
      this.DrawContentBox();
    }.bind(render));

    events(Constant.Events.MODEL_AVAILABLE).sub(function(){
      this.DrawTables();
      this.setCommonData();
      this.RestoreDisplayOptions();
      this.startMonitoringChanges();
      this.cityChange(ikariam.CurrentCityId);
    }.bind(render));

  },
  startMonitoringChanges                  : function() {
	  events(Constant.Events.TAB_CHANGED).sub(function (tab) {
		  this.stopResourceCounters();
		  switch (tab) {
			  case 0:
				  this.startResourceCounters();
				  break;
			  case 1:
				  this.updateCitiesBuildingData();
				  break;
			  case 2:
				  this.updateCitiesArmyData();
				  break;
			  case 3:
				  this.redrawSettings();
				  break;
		  }
	  }.bind(render));
	  events(Constant.Events.TAB_CHANGED).pub(database.settings.window.activeTab); //TODO Find a decent place for this
    //cityChange(newCityID)
    events('cityChanged').sub(this.cityChange.bind(render));

    // updateChangesForCityBuilding(city,changes)
    // change:{position:pos, name:oldBuildingName}
    events(Constant.Events.BUILDINGS_UPDATED).sub(this.updateChangesForCityBuilding.bind(render));

    // globalDataUpdated(changes)
    // change:{type:'research/government/finance', subType:'topic'
    events(Constant.Events.GLOBAL_UPDATED).sub(this.updateGlobalData.bind(render));

    // movementsUpdated(changedCitiesIDs)
    events(Constant.Events.MOVEMENTS_UPDATED).sub(this.updateMovementsForCity.bind(render));

    // resourcesUpdated(city,changes) -> irrelevant if dynamic update
    events(Constant.Events.RESOURCES_UPDATED).sub(this.updateResourcesForCity.bind(render));

    //cityUpdated(id, changes)
    // changes:[dataName]
    events(Constant.Events.CITY_UPDATED).sub(this.updateCityDataForCity.bind(render));

    events(Constant.Events.MILITARY_UPDATED).sub(this.updateChangesForCityMilitary.bind(render));
    events(Constant.Events.PREMIUM_UPDATED).sub(this.updateGlobalData.bind(render));
  },
  cityChange                    : function(cid) {
    var city = database.getCityFromId(cid);
    $('#SITRBoard tr.current,#SITRBoard tr.selected').removeClass('selected current');
    if(city) {
      this.getAllRowsForCity(city).addClass('selected').addClass((isChrome) ? 'current' : 'selected')
    }
  },
  getHelpTable : function(){
    var elems = '<div id="HelpTab"><div>';
    //Todo, rip this into constants and build dynamicly
    var inits = '<div class="options" style="clear:left "><span class="category">Initialize Board</span>'
                  + ' 1. <span id="setingsTownhall" class="clickable"><b>> Click <</b></span> on your Town Hall and go through each town with that view open <br>'
                  + ' 2. <span id="settingsMilitary" class="clickable"><b>> Click <</b></span> on the Troops in town tab on left side and go through each town with that view open<br>'
                  + ' 3. <span id="settingsMuseum" class="clickable"><b>> Click <</b></span> on Museum and then the "Distribute Cultural Treaties" tab<br>'
                  + ' 4. <span id="settingsResearch" class="clickable"><b>> Click <</b></span> on Research Advisor and then click on each of the 4 research tabs in the left window<br>'
                  + ' 5. <span id="settingsPalace" class="clickable"><b>> Click <</b></span> on your Palace<br>'
                  + ' 6. <span id="settingsFinance" class="clickable"><b>> Click <</b></span> on your Finance tab<br>'
                  + ' 7. <span id="settingsShop" class="clickable"><b>> Click <</b></span> on the "Ambrosia shop"<br>'
                  + '</div>';
    var features = '<div class="options">'
                     + '<span class="category">Re-Order Towns</span>On any tab, drag the resource icon to the left of the town name'
                     + '<span class="category">Reset Position</span>Right click on the SITR menu button on the left side page menu'
                     + '<span class="category">Hotkeys</span>'
                     + '1, 2, 3 ... 0, -, = : Navigate to town 1 to 12<br>'
                     + 'SHIFT + 1/2/3 : Navigate to City/Building/Army tab<br>'
                     + 'Q, W, E : Navigate to World/Island/City view<br>'
                     + 'SHIFT + Q, W, E, R : Navigate to City/Military/Research/Diplomacy advisor<br>'
                     + 'Spacebar: Minimise/Maximise the board<br>'
                     + '</div>';
    features += '<div class="options">'
                     + '<span class="category"></span>'
                     + ''
                     + ''
                     + ''
      + '</div>';
    // add instructions
    elems += features+inits +'<div style="clear:left"></div>';
    elems += '</div></div>'
    return elems
  },
  getSettingsTable :function(){
    //TODO this needs to itterate through options and build a list with localisation

    //format 1->3 name, localname, localdescription, value
    var checkbox = '<span  data-tooltip="{2}"><input type="checkbox" id="SITR_{0}" {3} /><label for="SITR_{0}">{1}</label></span>';

    // format name, localname, options
    var combo = '<label for="SITR_{0}">{1}</label><select id="SITR_{0}")>{2}</select>';

    // format value, text, selected
    var comboOption = '<option value="{0}" {2}>{1}</option>'

    // format name, options
    var category = '<span class="category">{0}</span>{1}';

    var elems ='';

    var settings = {};

    $.each(Constant.SettingCategories, function(key, name){
      settings[name] = [];
    });

    // build each option html and place in the array of the category
    $.each(Constant.Settings, function(key, name){
      if (database.settings[name] && database.settings[name].category != 'ignore'){
        switch(database.settings[name].type){
          case 'boolean': settings[database.settings[name].category].push(Utils.format(checkbox, [name,database.settings[name].name, database.settings[name].description, database.settings[name].value?'checked="checked"':'']));
            break;
          case 'array': break;
            break;
          case 'number':
            // not sure why, but i wrote it like this
            if (database.settings[name].choices){
              settings[database.settings[name].category].push(Utils.format(combo,[name,
                                                                                  database.settings[name].name,
                                                                                  (function(val, choices){
                                                                                    var elems = '';
                                                                                    $.each(choices, function(i, value){
                                                                                      elems += Utils.format(comboOption,[value,value+'h',(val==value?'selected=selected':'')])
                                                                                    });
                                                                                    return elems
                                                                                  })(database.settings[name].value,Constant.SettingData[name].choices)]));
            }
            else {
              //Texttual input
            }
            break;
        }
      }
    });

    // itterate the categories and push options into option divs (max 7 lines per div)
    var i = 0;var j = 0;
    $.each(settings, function(catName, html){
      j += html.length + 1;
      if (j>=7 || i== 0){
        if (i !== 0){
          elems+='</div>'
        }
        elems +='<div class="options">'
        j = 0;
      }
      elems += Utils.format(category, [database.getGlobalData.getLocalisedString(catName),html.join('')]);
      i++;
    });
    elems+='</div>'

    // add version
    elems += '<div style="clear:left"><p>&nbsp;Current version: ' + SITR.version + '</p></div>'

    // add buttons
    elems += '<div class="buttons">' + '<button  data-tooltip="Reset all settings to default" id="SITR_Reset_Button">Reset</button>' + '<button  data-tooltip="Goto the scripts Userscripts.com website " id="SITR_Website_Button">Website</button>' + '<button  data-tooltip="Force a check for updates" id="SITR_Update_Button">Check for updates</button>' + '<button  data-tooltip="Report a bug in the script" id="SITR_Bug_Button">Report Bug</button>'

    //wrap
    elems = '<div>' + elems + '</div>'

    return elems
  },
  DrawHelp : function(){
    $('#HelpTab').html(this.getHelpTable())
  },
  DrawSettings                  : function() {
    $('#SettingsTab').html(this.getSettingsTable())
    .on("click", "#setingsTownhall",function() {
          ikariam.loadUrl(ikariam.viewIsCity, "city", ikariam.getCurrentCity.getBuildingFromName(Constant.Buildings.TOWN_HALL).getUrlParams)
        })
    .on("click", "#settingsMilitary",function() {
                ikariam.loadUrl(ikariam.viewIsCity, "city", {view:'cityMilitary', activeTab:'tabUnits'} )
        })
    .on("click", "#settingsMuseum",function() {
                ikariam.loadUrl(ikariam.viewIsCity, "city", {view:'culturalPossessions_assign',activeTab:'tab_culturalPossessions_assign'})
              })
    .on("click", "#settingsResearch",function() {
                ikariam.loadUrl(ikariam.viewIsCity, "city", {view:'researchAdvisor'})
              })
    .on("click", "#settingsPalace",function() {
                var capital = ikariam.getCapital;
                if (capital){
                ikariam.loadUrl(ikariam.viewIsCity, "city", capital.getBuildingFromName(Constant.Buildings.PALACE).getUrlParams)
                }
                else alert('Please visit your capital city first')
              })
    .on("click", "#settingsFinance",function() {
        ikariam.loadUrl(ikariam.viewIsCity, "city", {view:'finances'} )
      })
    .on("click", "#settingsShop",function() {
        ikariam.loadUrl(ikariam.viewIsCity, "city", {view:'premium'} )
      })
    //Event Handlers
    .on("change", "#SITR_onTop", function() {
      database.settings.onTop.value = this.checked;
      render.mainContentBox.css('z-index', this.checked ? 65112 : 61);
    })
    .on("change", "#SITR_windowTennis", function() {
      database.settings.windowTennis.value = this.checked;
      if (!this.checked){
      render.mainContentBox.css('z-index', database.settings.onTop.value ? 65112 : 61);
      }
      else {
        render.mainContentBox.trigger('mouseenter')
      }
    })
    .on("change", "#SITR_fullArmyTable", function() {
      database.settings.fullArmyTable.value = this.checked;
      render.updateCitiesArmyData()
    })
    .on("change", "#SITR_hideOnWorldView", function() {
      database.settings.hideOnWorldView.value = this.checked;
    })
    .on("change", "#SITR_hideOnIslandView", function() {
      database.settings.hideOnIslandView.value = this.checked;
    })
    .on("change", "#SITR_enableAutoUpdates", function() {
      database.settings.autoUpdates.value = this.checked;
    })
    .on("change", "#SITR_smallFont", function() {
      database.settings.smallFont.value = this.checked;
      if(this.checked) {GM_addStyle("#SITRBoard {font-size:8pt}")}else {GM_addStyle("#SITRBoard {font-size:inherit}")}
    })
    .on("change", "#SITR_compressedBuildingList", function() {
      database.settings.compressedBuildingList.value = this.checked;
      render.cityRows.building = {};
      $('table.buildings').html(render.getBuildingTable());
      render.updateCitiesBuildingData();
      $.each(database.cities, function(cityId, city) {
        render.setCityName(city);
        render.setActionPoints(city);
        $.each(database.settings[Constant.Settings.CITY_ORDER].value, function (idx, val) {
          $('#' + 'building' + '_' + val).appendTo($('#' + 'building' + '_' + val).parent())
        })
      })
    })
    .on('change',"#SITR_wineWarningTime", function() {
      database.settings.wineWarningTime.value = this.value;
    })
    .on("click", "#SITR_Website_Button", function() {
      GM_openInTab('http://userscripts.org/scripts/show/' + SITR.scriptId);
    })
    .on("click", "#SITR_Reset_Button",function() {
      SITR.HardReset();
    })
    .on("click","#SITR_Update_Button", function() {
      SITR.CheckForUpdates.call(SITR, true);
    })
    .on("click","#SITR_Bug_Button", function() {
      GM_openInTab('http://userscripts.org/topics/118866');
    })
    .on("change", "input[type='checkbox']", function(){
                  this.blur()
    });
    //Additional Stuff
    $("#SITR_Reset_Button").button({icons: {primary: "ui-icon-alert"}, text: true});
    $("#SITR_Website_Button").button({icons: {primary: "ui-icon-home"}, text: true});
    $("#SITR_Update_Button").button({icons: {primary: "ui-icon-info"}, text: true});
    $("#SITR_Bug_Button").button({icons: {primary: "ui-icon-notice"}, text: true});
  },
  toast                         : function(sMessage) {
    $('<div>').addClass("ui-tooltip-content ui-widget-content").text(sMessage).appendTo($(document.createElement("div")).addClass("ui-helper-reset ui-tooltip ui-tooltip-pos-bc ui-widget").css({position: 'relative', display: 'inline-block', left: 'auto', top: 'auto'}).show().appendTo($(document.createElement("div")).addClass("toast").appendTo(document.body).delay(100).fadeIn("slow", function() {
      $(this).delay(2000).fadeOut("slow", function() {
        $(this).remove();
      });
    })));
  },
  RestoreDisplayOptions         : function() {
    render.mainContentBox.css('left', database.settings.window.left);
    render.mainContentBox.css('top', database.settings.window.top);
    this.$tabs.tabs('select', database.settings.window.activeTab);
    if(!(ikariam.viewIsWorld && database.settings.hideOnWorldView.value || ikariam.viewIsIsland && database.settings.hideOnIslandView.value) && database.settings.window['visible'])
      this.mainContentBox.fadeToggle('slow');
  },
  SaveDisplayOptions            : function() {
    if(database.settings)
      try {
        database.settings.addOptions({window: {
          left     : render.mainContentBox.css('left'),
          top      : render.mainContentBox.css('top'),
          visible  : (ikariam.viewIsWorld && database.settings.hideOnWorldView.value || ikariam.viewIsIsland && database.settings.hideOnIslandView.value) ? database.settings.window.visible : (render.mainContentBox.css('display') != 'none'),
          activeTab: render.$tabs.tabs('option', 'active')}
        })
      } catch(e) {
        SITR.error('SaveDisplayOptions', e)
      }
  },
  SidePanelButton               : function() {
    $('#js_viewCityMenu').find('li.SITR_Menu')
	    .on("click", function(event) {render.ToggleMainBox();})
	    .on("contextmenu", function(event) {
	      event.preventDefault();
	      database.settings.window.left = 150;
	      database.settings.window.top = 180;
		    render.mainContentBox.css('left', database.settings.window.left);
		    render.mainContentBox.css('top', database.settings.window.top);
    });
    $(document).on('keydown', function(event) {
      var index = -1;
      var type = event.target.nodeName.toLowerCase();
      if(type === 'input' || type === 'textarea' || type === 'select')
        return true;

      if(event.which === 32) {
        event.stopImmediatePropagation();
        render.ToggleMainBox();
        return false
      }
      if(event.originalEvent.shiftKey) {

        index = [49, 50, 51].indexOf(event.which);
        if(index !== -1) {
          render.$tabs.tabs('option', 'active', index);
          return false
        } else {
          switch(event.which){
            case 81:
              $('#js_worldMapLink').find('a').click();
              break;
            case 87:
              $('#js_islandLink').find('a').click();
              break;
            case 69:
              $('#js_cityLink').find('a').click();
              break;
          }
        }
      } else {
        var keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 173, 61];
        index = keycodes.indexOf(event.which);
        if(index !== -1) {
          if(index < database.settings.cityOrder.value.length) {
            //Todo: create a page changing class
            $('#resource_' + database.settings.cityOrder.value[index] +' .city_name .clickable').trigger('click');
            return false
          }
        } else {
          switch(event.which){
            case 81:
              $('#js_GlobalMenu_cities').click();
              break;
            case 87:
              $('#js_GlobalMenu_military').click();
              break;
            case 69:
              $('#js_GlobalMenu_research').click();
              break;
            case 82:
              $('#js_GlobalMenu_diplomacy').click();
              break;
          }
        }
      }
    })

  },
  ToggleMainBox                 : function() {
    database.settings.window.visible = (this.mainContentBox.css('display') == 'none');
    this.mainContentBox.fadeToggle("slow");
  },
  DrawTables                    : function() {
    if($(this.mainContentBox)) {
      $('#ArmyTab').html(this.getArmyTable());
      $('#ResTab').html(this.getResourceTable());
      $('#BuildTab').html(this.getBuildingTable());
      this.DrawSettings();
      this.DrawHelp();
      this.toolTip.init();

      $('#ResTab, #BuildTab, #ArmyTab').each(function () {
        $(this).sortable({
                           // Add widths to td's to prevent cell collapse, add borders to td's to maintain approx positioning
                           helper:function (e, ui) {
                             ui.children('td').each(function () {
                               $(this).width(Math.round($(this).width()));
                               $(this).hasClass('building') && $(this).css('border', '1px solid transparent');

                             });
                             ui.parents('div[role=tabpanel]').each(function () {
                               $(this).width(Math.round($(this).width()));
                             });
                             return ui;
                           },
                           handle:'.city_name .icon',
                           cursor:"move",
                           axis:'y',
                           items:'tbody tr',
                           container:'tbody',
                           revert:200,
                           //remove widths from td's
                           stop:function (event, ui) {
                             ui.item.parents("div[role=tabpanel]").css("width", "");
                             ui.item.children("td").css("width", "").css("border", "");
                             database.settings[Constant.Settings.CITY_ORDER].value = ui.item.parents('.ui-sortable').sortable('toArray').map(function (item) {
                               return parseInt(item.split('_').pop())
                             });
                             //Re=order the other tables
                             $.each(
                               [
                                 'building' ,
                                 'resource',
                                 'army'
                               ], function (idx, type) {
                                 if ($(this).parents('.ui-sortable').attr('id') !== type) {
                                   $.each(database.settings[Constant.Settings.CITY_ORDER].value, function (idx, val) {
                                     $('#' + type + '_' + val).appendTo($('#' + type + '_' + val).parent())
                                   })
                                 }
                               });
                           }
                         })
      });
      //initialise the row orders
      $.each(
        [
          'building' ,
          'resource',
          'army'
        ], function (idx, type) {
          $.each(database.settings[Constant.Settings.CITY_ORDER].value, function (idx, val) {
            $('#' + type + '_' + val).appendTo($('#' + type + '_' + val).parent())
          })
        });
    }
    this.AttachClickHandlers();
  },
  getResourceTable              : function() {
    var header = '    <colgroup span="3"/>\n    <colgroup span="3"/>\n    <colgroup span="2"/>\n    <colgroup span="2"/>\n    <colgroup span="2"/>\n    <colgroup span="2"/>\n    <colgroup span="2"/>\n    <colgroup span="2"/>\n<thead>\n<tr class="header_row">\n    <th class="city_name">{0}</th>\n    <th class="action_points icon actionpointImage" data-tooltip="{1}"></th>\n    <th class="actions"></th>\n    <th class="citizen_header icon populationImage" data-tooltip="{2}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=3\');return false;"></th>\n    <th class="satisfaction_header icon happyImage" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=3\');return false;"></th>\n    <th class="growth_header icon growthImage"></th>\n    <th class="research_header icon researchImage" data-tooltip="{3}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=0&subHelpId=2\');return false;"></th>\n    <th class="gold_header icon goldImage" data-tooltip="{4}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=4\');return false;"></th>\n    <th class="wood_header icon woodImage" colspan="2" data-tooltip="{5}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=5\');return false;"></th>\n    <th class="wine_header icon wineImage" colspan="2" data-tooltip="{6}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=6\');return false;"></th>\n    <th class="marble_header icon marbleImage" colspan="2" data-tooltip="{7}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=6\');return false;"></th>\n    <th class="glass_header icon glassImage" colspan="2" data-tooltip="{8}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=6\');return false;"></th>\n    <th class="sulfur_header icon sulfurImage" colspan="2" data-tooltip="{9}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=6\');return false;"></th>\n</tr>\n</thead>';
    var table = '<table class="resources">\n    {0}\n    <tbody>{1}</tbody>\n    <tfoot>{2}</tfoot>\n</table>';
    var resourceRow = '<tr id="resource_{0}">\n    <td class="city_name">\n        <span></span>\n        <span class="clickable"></span>\n        <sub></sub>\n    </td>\n    <td class="action_points"></td>\n    <td class="sitractions">\n        <div class="transport"></div>\n        <div class="deploymentfleet"></div>\n        <div class="deploymentarmy"></div>\n    </td>\n    <td class="population" data-tooltip="dynamic">\n        <span></span>\n        <span></span>\n        <div class="progressbar ui-progressbar ui-widget ui-widget-content ui-corner-all" data-tooltip="dynamic">\n            <div class="ui-progressbar-value ui-widget-header ui-corner-left" style="width: 95%"></div>\n        </div>\n    </td>\n    <td class="population_growth"  data-tooltip="dynamic">\n        <img align=right height=18 hspace=2 vspace=0></td>\n    <td class="population_happiness"></td>\n    <td class="research"  data-tooltip="dynamic"></td>\n    <td class="gold_income">\n        <span></span>\n        <span class="Red"></span>\n    </td>\n    {1}\n</tr>\n';
    var resourceCell = '<td class="resource {0}">\n    <span class="icon safeImage"></span>\n    <span class="current"></span>\n    <span class="incoming" data-tooltip="dynamic"></span>\n    <div class="progressbar ui-progressbar ui-widget ui-widget-content ui-corner-all" data-tooltip="dynamic">\n        <div class="ui-progressbar-value ui-widget-header ui-corner-left" style="width: 95%"></div>\n    </div>\n</td>\n<td class="resource {0}">\n    <span class="prodconssubsum production Green" data-tooltip="dynamic"></span>\n    <span class="prodconssubsum consumption Red" data-tooltip="dynamic"></span>\n    <span class="emptytime Red"></span>\n</td>';
    var footer = '<tr>\n    <td ></td>\n    <td id="t_sigma" class="total" colspan="2" data-tooltip="dynamic">Σ</td>\n    <td id="t_population" class="total" colspan=3></td>\n    <td id="t_research" class="total" data-tooltip="dynamic"></td>\n    <td id="t_goldincome" class="total" data-tooltip="dynamic">\n        <span class="Green"></span>\n        <span class="Red"></span>\n    </td>\n    <td id="t_currentwood" class="total"></td>\n    <td id="t_woodincome" class="total" data-tooltip="dynamic">\n        <span class="Green"></span>\n        <span class="Red"></span>\n    </td>\n    <td id="t_currentwine" class="total"></td>\n    <td id="t_wineincome" class="total" data-tooltip="dynamic">\n        <span class="Green"></span>\n        <span class="Red"></span>\n    </td>\n    <td id="t_currentmarble" class="total"></td>\n    <td id="t_marbleincome" class="total"data-tooltip="dynamic">\n        <span class="Green"></span>\n        <span class="Red"></span>\n    </td>\n    <td id="t_currentglass" class="total"></td>\n    <td id="t_glassincome" class="total" data-tooltip="dynamic">\n        <span class="Green"></span>\n        <span class="Red"></span>\n    </td>\n    <td id="t_currentsulfur" class="total"></td>\n    <td id="t_sulfurincome" class="total" data-tooltip="dynamic">\n        <span class="Green"></span>\n        <span class="Red"></span>\n    </td>\n</tr>';

    return Utils.format(table, [getHead(), getBody(), getFooter()]);

    function getHead() {
      return Utils.format(header, [
        database.getGlobalData.getLocalisedString("cities"), database.getGlobalData.getLocalisedString("ActionPoints"), database.getGlobalData.getLocalisedString('citizens'), database.getGlobalData.getLocalisedString('researchpoints'), database.getGlobalData.getLocalisedString("gold"), database.getGlobalData.getLocalisedString("wood"), database.getGlobalData.getLocalisedString("wine"), database.getGlobalData.getLocalisedString("marble"), database.getGlobalData.getLocalisedString("crystal"), database.getGlobalData.getLocalisedString("sulfur")])
    }

    function getBody() {
      var rows = '';
      $.each(database.cities, function(cityId, city) {
        var resourceCells = '';
        $.each(Constant.Resources, function(key, resourceName) {
          resourceCells += Utils.format(resourceCell, [resourceName])
        });
        rows += Utils.format(resourceRow, [city.getId, resourceCells])
      });
      return rows;
    }

    function getFooter() {
      return footer;
    }
  },
  getArmyTable                  : function() {
    var table = '<table class="army">\n    {0}\n    <tbody>{1}</tbody>\n    <tfoot>{2}</tfoot>\n</table>';
    var headerRow = '<thead><tr class="header_row">\n    <th class="city_name">{0}</th>\n    <th data-tooltip="{1}" class="icon actionpointImage action_points"></th>\n    <th></th>\n    {2}\n</tr></thead>';
    var headerCell = '<th data-tooltip="{0}" style="background:url(\'{1}\')  no-repeat center center;background-size: 26px auto;cursor: pointer;" colspan="2" class="army unit icon {2}" onclick="ajaxHandlerCall(\'?view=unitdescription&helpId=9&unitId={3}\'); return false;">&nbsp;</th>\n\n';
    var bodyRow = '<tr id="army_{0}">\n    <td class="city_name"><img><span class="clickable"></span><sub></sub></td>\n    <td class="action_points">\n    <td class="sitractions">\n        <div class="transport"></div>\n        <div class="deploymentfleet"></div>\n        <div class="deploymentarmy"></div>\n    </td>\n    {1}\n</tr>';
    var bodyCell = '<td style="" class="army unit {0}">\n    <span>{1}</span>\n</td>\n<td style="" class="army movement {0}" data-tooltip="dynamic">\n    <span class="More Green {0}">{2}</span>\n    <span class="More Blue {0}">{3}</span>\n</td>';
    var footerRow = '<tr class="totals_row">\n    <td class="city_name"></td>\n    <td></td>\n    <td class="sigma">Σ</td>\n    {0}\n</tr>';
    var footerCell = '<td class="army total {0} unit">\n    <span></span>\n</td>\n<td style="" class="army total {0} movement">\n    <span class="More Green"></span>\n    <span class="More Blue"></span>\n</td>';

    return Utils.format(table, [getHead(), getBody(), getFooter()]);

    function getHead() {
      var headerCells = '';
      var cols = '<colgroup span=3>';
      for(var category in Constant.unitOrder) {
        cols += '<colgroup>';
        $.each(Constant.unitOrder[category], function(index, value) {
          headerCells += Utils.format(headerCell, [database.getGlobalData.getLocalisedString(value), getImage(value), value, Constant.UnitData[value].id]);
          cols += '<col><col>'
        });
        cols += '</colgroup>'
      }
      return cols + Utils.format(headerRow, [database.getGlobalData.getLocalisedString("cities"), database.getGlobalData.getLocalisedString("ActionPoints"), headerCells])
    }

    function getBody() {
      var body = '';
      $.each(database.cities, function(cityId, city) {
        var rowCells = '';
        for(var category in Constant.unitOrder) {
          $.each(Constant.unitOrder[category], function(index, value) {
            var builds = city.getUnitBuildsByUnit(value);
            rowCells += Utils.format(bodyCell, [value, city.military.getUnits.getUnit(value) || '', builds[value] ? builds[value] : '', '' ])

          })
        }
        body += Utils.format(bodyRow, [city.getId, rowCells])
      });
      return body
    }

    function getFooter() {
      var footerCells = '';
      for(var category in Constant.unitOrder) {
        $.each(Constant.unitOrder[category], function(index, value) {
          footerCells += Utils.format(footerCell, [value])
        })
      }
      return Utils.format(footerRow, [footerCells])
    }

    function getImage(unitID) { //Todo pull into css
      // /skin/characters/fleet/60x60/ship_submarine_faceright.png
      // /skin/characters/military/x60_y60/y60_medic_faceright.png
      return (Constant.UnitData[unitID].type == 'fleet') ? 'skin/characters/fleet/60x60/' + unitID + '_faceright.png' : 'skin/characters/military/x60_y60/y60_' + unitID + '_faceright.png'
    }

  },
  getBuildingTable              : function() {
    var table = '<table class="buildings">\n{0}\n    <tbody>{1}</tbody>\n</table>';
    var headerCell = '<th data-tooltip="{0}" style="background-color: transparent; background-image: url(\'{1}\'); \nbackground-repeat: no-repeat; background-attachment: scroll; background-position: center center; background-clip: \nborder-box; background-origin: padding-box; background-size: 60px 60px; cursor: pointer;" colspan="{2}" class="icon" onclick="ajaxHandlerCall(\'{3}\');return false;">&nbsp;</th>';
    var headerRow = '<thead><tr class="header_row">\n    <th class="city_name">{0}</th>\n    <th data-tooltip="{1}" class="action_points icon actionpointImage"></th>\n    <th></th>\n    {2}\n</tr></thead>';
    var buildingCell = '<td class="building {0}" data-tooltip="dynamic"></td>';
    var buildingRow = '<tr id="building_{0}">\n    <td class="city_name"><img><span class="clickable"></span><sub></sub></td>\n    <td class="action_points">\n    <td class="sitractions">\n        <div class="transport"></div>\n        <div class="deploymentfleet"></div>\n        <div class="deploymentarmy"></div>\n    </td>\n    {1}\n</tr>';
    var counts = database.getBuildingCounts;
    var buildingOrder = (database.settings.compressedBuildingList.value ? Constant.altBuildingOrder : Constant.buildingOrder);
    return Utils.format(table, [getHead(), getBody()]);

    function getHead() {
      var headerCells = '';
      var colgroup = '<colgroup span="3"></colgroup>';
      for(var category in buildingOrder) {
        var cols = '';
        $.each(buildingOrder[category], function(index, value) {

          if(value == 'colonyBuilding') {
            if(!database.settings.compressedBuildingList.value || !counts[value]) {
              return true;
            }
            cols += '<col span="' + counts[value] + '">';
            headerCells += Utils.format(headerCell, [database.getGlobalData.getLocalisedString(Constant.Buildings.PALACE) + '/' + database.getGlobalData.getLocalisedString(Constant.Buildings.GOVERNORS_RESIDENCE), Constant.BuildingData[Constant.Buildings.PALACE].icon, counts[value], "?view=buildingDetail&helpId=1&buildingId=" + Constant.BuildingData.palace.buildingId])
          } else if(value == 'productionBuilding') {
            if(!database.settings.compressedBuildingList.value || !counts[value]) {
              return true;
            }
            cols += '<col span="' + counts[value] + '">';
            headerCells += Utils.format(headerCell, [database.getGlobalData.getLocalisedString(Constant.Buildings.WINERY) + '/' + database.getGlobalData.getLocalisedString(Constant.Buildings.STONEMASON) + '/' + database.getGlobalData.getLocalisedString(Constant.Buildings.ALCHEMISTS_TOWER) + '/' + database.getGlobalData.getLocalisedString(Constant.Buildings.GLASSBLOWER), 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAUCAMAAACknt2MAAABelBMVEUAAADp49mgkICxmnzVuIxMcwtciQ90pSC/tKR7aFWOfGmIdmPKr4lomxChyk/YxKjTyrzl2slrVkKBblu5ooXp0a3NwrOqm4uNeWRTMzMnGRZFQBvb0sS0p5j18OiTgW3cvpSeXF07JSSJUlLFeHY2NhZzrRKZh3XmyJwPCgl7jzSHyBXlx53EuateSje0amp0YE2Fc2FzSEeFqzfoyJftylO7l1312oXv0GzWyqzN0MH15b311WO3iy2jchyLXiuZrqtyt9uJx+bP2M789+/sz3nv2p7+5IOXZRWHVA/jxou7vquTyuS7x72MqKmEw+J/wOFdk6ylsaXsz6Xz1njKnzTBlkF6SAvhvE2TsraVzeiNyeZ8ttJ7v+EzXnXJ1M2tfiKts6S63ex2utyUw9hFhqV6ss2W0O7fvmDUrUJnnrOk0+tjq8602uzO6fbCyr7Eu6BqrM1tstS74fKbzeXS6/dvud7OrG1PlLeMwNfW7viu2e2i0ObK4OYudx14AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAFfSURBVCgVBcFLTlNhGADQ8/29t/e/reVhChWkUDFRE0hM1IlxYiIzhy5EN+ASTNyBO3DoIpw7VBNAiga0QFKsPK7nBBARV4AiIq4ukUBWVd0bQI0OJJjPC3VcV0AVTdOGhKVot//0TEFR9pebWQ8J1d9qNjxZjhGKYV3XI7N7JLDfU+dh48HmekrKcjYab0m2Y7GeP9tb2ztCL5meT8J45UJre5KOrlZv/hr0TyeXk3p6sdBqfc96439p399GXdx2Pbxv47zTreeiGcxKAABF8aiA/tZjAZ5EfAYA0ALDFKsrB4Cn63sgwbOyVeYu4HnOL0BgJyJOFkR88jIiIiI+ouDVecfhMCIa5iLix1oEJDtnnShmZ2mcT8k5VXdzzpB20kn/8HJkcfVnw4c8V09znr5GSpsbX5qlruOvA7zZbbdXqvJWhfR799tgduzhnVY9z/vtnN9VdfvgLQAAAPgPmQZaHvndsJEAAAAASUVORK5CYII=', counts[value], "?view=ikipedia&helpId=6"]).replace('60px 60px','38px 28px')
          } else if(counts[value]) {
            cols += '<col span="' + counts[value] + '">';
            headerCells += Utils.format(headerCell, [database.getGlobalData.getLocalisedString(value), Constant.BuildingData[value].icon, counts[value], "?view=buildingDetail&helpId=1&buildingId=" + Constant.BuildingData[value].buildingId])
          }
        });
        if(cols != '') {
          colgroup += '<colgroup>' + cols + '</colgroup>'
        }
      }
      return colgroup + Utils.format(headerRow, [database.getGlobalData.getLocalisedString("cities"), database.getGlobalData.getLocalisedString("ActionPoints"), headerCells])
    }

    function getBody() {
      var body = '';
      $.each(database.cities, function(cityId, city) {
        var rowCells = '';
        for(var category in buildingOrder) {
          $.each(buildingOrder[category], function(index, value) {
            if((value == 'productionBuilding' || value == 'colonyBuilding' ) && !database.settings.compressedBuildingList.value) return false;
            var i = 0;
            while(i < counts[value]) {
              var cssClass = '';
              if(value == 'colonyBuilding') {
                cssClass = city.isCapital ? Constant.Buildings.PALACE : Constant.Buildings.GOVERNORS_RESIDENCE
              } else if(value == 'productionBuilding') {
                switch(city.getTradeGoodID) {
                  case 1:
                    cssClass = Constant.Buildings.WINERY;
                    break;
                  case 2:
                    cssClass = Constant.Buildings.STONEMASON;
                    break;
                  case 3:
                    cssClass = Constant.Buildings.GLASSBLOWER;
                    break;
                  case 4:
                    cssClass = Constant.Buildings.ALCHEMISTS_TOWER;
                    break;
                }
              } else {
                cssClass = value
              }
              cssClass += +i;
              rowCells += Utils.format(buildingCell, [cssClass]);
              i++
            }
          })
        }
        body += Utils.format(buildingRow, [city.getId, rowCells])
      });
      return body
    }
  },
  AddIslandCSS                  : function() {
    if(!(/.*view=island.*/.test(window.document.location)))   //&& (ikariam.GameVersion() != undefined)
      if(!this.cssResLoaded()) Utils.addStyleSheet('@import "http://' + ikariam.Host() + '/skin/compiled-' + ikariam.Nationality() + '-island.css";');
  },

  updateCityArmyCell :function(cityId, type, $node){
    var $row;
    var celllevel = !$node;
    try {
      if(celllevel) {
        $row = this.getArmyRow(cityId);
        $node = Utils.getClone($row);
      }
      var city = database.getCityFromId(cityId);
      var data1 = city.military.getUnits.getUnit(type) || 0;
      var data2 = city.military.getIncomingTotals[type] || 0;
      var data3 = city.military.getTrainingTotals[type] || 0;
      var cells = $node.find('td.' + type);
      cells.get(0).textContent = Utils.FormatNumToStr(data1, false, 0) || '';
      cells = cells.eq(1).children('span');
      cells.get(0).textContent = Utils.FormatNumToStr(data2, true, 0) || '';
      cells.get(1).textContent = Utils.FormatNumToStr(data3, true, 0) || '';
      delete this.cityRows.army[cityId];
      if (celllevel){
        Utils.setClone($row, $node);
        this.setArmyTotals(undefined, type);
      }
    } catch(e) {
      SITR.error('updateCityArmyCell', e);
    } finally {

    }
  },
  updateCityArmyRow: function(cityId, $node) {
    var $row;
    var rowLevel = !$node;
    if(rowLevel) {
      $row = this.getArmyRow(cityId);
      $node = Utils.getClone($row);
    }
    for(var armyId in Constant.UnitData) {
      this.updateCityArmyCell(cityId, armyId, $node)
    }

    if(rowLevel) {
      Utils.setClone($row, $node);
      this.setArmyTotals();
      delete this.cityRows.army[cityId];
    }
  },
  updateCitiesArmyData :function(){
    var $node = $('#ArmyTab').find('table.army');
    var $clone = Utils.getClone($node);
    for (var cityId in database.cities){
      SITR.time(this.updateCityArmyRow.bind(this, cityId,$clone.find("#army_" + cityId)), 'updateArmyRow');
    }
    this.setArmyTotals($clone);
    Utils.setClone($node, $clone);
    this.cityRows.army = {};
  },

  updateChangesForCityMilitary         : function(cityId, changes) {
    if (changes && changes.length < 5){
      $.each(changes, function(index, unit) {
        this.updateCityArmyCell(cityId,unit)
      }.bind(render));
      this.setArmyTotals();
    } else {
      this.updateCityArmyRow(cityId)
    }

    //Todo
    //render.setAllArmyData()
  },
  updateGlobalData              : function(changes) {
    //        var pop, research, finance;
    //        for (var key in changes) {
    //            switch (key) {
    //                case 'government':
    //                case 'research':
    //                case 'finance':
    //                default :
    //
    //            }
    //        }
    this.setAllResourceData();
    return true;
    //Todo: implement update pushed from globaldata changes
  },
  updateMovementsForCity        : function(changedCityIds) {
    if(changedCityIds.length)
      $.each(changedCityIds, function(index, id) {
        var city = database.getCityFromId(id);
        if(city) {
          this.setMovementDataForCity(city)
        }
      }.bind(render))
  },
  updateResourcesForCity        : function(cityId, changes) {
    var city = database.getCityFromId(cityId);
    if(city) {
      //Todo:Write this. Single resource updates from changes
      events.scheduleAction(this.updateResourceCounters.bind(render, true), 0);
      //                $.each(changes, function (index, resourceName) {
      //                    this.SetAllResourceData(cityId);
      //                })
    }
  },
  updateCityDataForCity         : function(cityId, changes) {
    var city = database.getCityFromId(cityId);
    if(city) {
      var research = 0, population = 0, finance = 0;
      for(var key in changes) {
        switch(key) {
          case 'research' :
            research += changes[key];
            break;
          case 'priests':
            if(Constant.Government.THEOCRACY === database.getGovernmentType) {
              population += changes[key];
            }
            break;
          case 'culturalGoods':
            research += changes[key];
            population += changes[key];
            break;//todo add democracy only refresh
          case 'citizens':
          case 'population':
            population += changes[key];
            finance += changes[key];
            break;
          case 'name':
            this.setCityName(city);
            break;
          case 'islandId':
            break;
          case 'coordinates':
            break;
          case 'finance':
            finance += changes[key]
        }
      }
      if(!!population) {
        this.setPopulationData(city)
      }
      if(!!research) {
        this.setResearchData(city)
      }
      if(!!finance) {
        this.setFinanceData(city)
      }
    }
  },
  setArmyTotals                 : function($node, unitId) {
    var data = database.getArmyTotals;
    if(!$node) {
      $node = $('#ArmyTab');
    }
    if(unitId) {
      $node.find('td.total.' + unitId).eq(0).text(Utils.FormatNumToStr(data[unitId].total,false,0) ||'' )
      .next().children('span').eq(0).text(Utils.FormatNumToStr(data[unitId].incoming,true,0) ||'' )
      .next().text(Utils.FormatNumToStr(data[unitId].training,true,0) || '' );
      if(data[unitId].training || data[unitId].incoming || data[unitId].total || database.settings.fullArmyTable.value) {
        $node.find('td.' + unitId+' ,th.' + unitId).show()
      } else {
        $node.find('td.' + unitId+' ,th.' + unitId).hide();
      }
    } else {
      $.each(Constant.UnitData, function(unit, info) {
        $node.find('td.total.' + unit).eq(0).text(Utils.FormatNumToStr(data[unit].total,false,0) ||'' )
        .next().children('span').eq(0).text(Utils.FormatNumToStr(data[unit].incoming,true,0) ||'' )
        .next().text(Utils.FormatNumToStr(data[unit].training,true,0) || '' );
        if(data[unit].training || data[unit].incoming || data[unit].total || database.settings.fullArmyTable.value) {
          $node.find('td.' + unit+' ,th.' + unit).show();
        } else {
          $node.find('td.' + unit+' ,th.' + unit).hide();
        }
      });
    }
  },
  updateChangesForCityBuilding     : function(cityID, changes) {
    try {
      var city = database.getCityFromId(cityID);
      if(city) {
        if(changes.length) {
          $.each(changes, function(key, data) {
            var building = city.getBuildingFromPosition(data.position);
            if(building.getName === data.name) {
              this.updateCityBuildingPosition(city, data.position)
            } else {
              this.updateCityBuildingRow(city);
              return false
            }
          }.bind(render))
        }
      }
    } catch(e) {
      SITR.error('updateChangesForCityBuilding', e);
    } finally {
    }
  },
  updateCityBuildingPosition: function(city, position, $node) {
    var building = city.getBuildingFromPosition(position);
    var idx = 0;
    var cellOnly = ($node == undefined);
    $.each(city.getBuildingsFromName(building.getName), function (index, b) {
      if (b.getPosition == building.getPosition) {
        idx = index;
        return false;
      }
    });
    var cell;
    if (cellOnly) {
      $node = render.getBuildingsRow(city);
      cell = $node.find('td.building.' + building.getName + idx)
    }
    else{
      cell = $node.find('td.building.' + building.getName + idx)
    }
    if (!building.isEmpty) {
      if (cell.length) {
        cell.html('<span>' + building.getLevel + '</span>').find('span')
          .removeClass('upgrading upgradable upgradableSoon maxLevel')
          .addClass('clickable')
          .addClass((building.isMaxLevel ? 'maxLevel' : '') + ( building.isUpgrading ? ' upgrading' : '') + (building.isUpgradable ? (city.isUpgrading ? ' upgradableSoon' : ' upgradable') : ''));
      }
      else{
        return false
      }
    }
    return true
  },
  updateCityBuildingRow        : function(city, $node) {
    try {
      var $row;
      var cellLevel = !$node;
      if(cellLevel) {
        $row = this.getBuildingsRow(city);
        $node = Utils.getClone($row);
      }
      var success = true;
      $.each(city.getBuildings, function(position, building) {
        success = this.updateCityBuildingPosition(city, position, $node);
        return success
      }.bind(render));

      if (cellLevel){
        render.cityRows.building[city.getId] = undefined;
        $node.find('table.buildings').html(render.getBuildingTable);

        if (!success){
          render.updateCitiesBuildingData();
          $.each(database.cities, function (cityId, city) {
            render.setCityName(city);
          });
          return success;
        }
        Utils.setClone($row, $node);
      }
      return success
    } catch(e) {
      SITR.error('updateCityBuildingRow', e);
    } finally {
    }

  },
  updateCitiesBuildingData            : function($redraw) {
    try {
      var success = true;
      var i = 0;
      var $node = $('#BuildTab').find('table.buildings');
      var $clone = $redraw || Utils.getClone($node);
        $.each(database.cities, function(cityId, city){
          success = SITR.time(this.updateCityBuildingRow.bind(this, city, $clone.find('#building_' + city.getId)), 'updateBuildingRow');
          return success
        }.bind(render));
        if (!success){
          $clone.html(render.getBuildingTable);
          if (!$redraw){
            render.updateCitiesBuildingData($clone);
          }
        }
      if (!$redraw){
        this.cityRows.building = {};
        Utils.setClone($node, $clone);
      }
      else {
        $.each(database.cities, function (cityId, city) {
          render.setCityName(city);
        })
      }
    } catch(e) {
      SITR.error('updateCitiesBuildingData', e)
    } finally {
    }
  },
  redrawSettings:function () {
    $('#SettingsTab').html(render.getSettingsTable());
    $("#SITR_Reset_Button").button({icons: {primary: "ui-icon-alert"}, text: true});
		$("#SITR_Website_Button").button({icons: {primary: "ui-icon-home"}, text: true});
	  $("#SITR_Update_Button").button({icons: {primary: "ui-icon-info"}, text: true});
    $("#SITR_Bug_Button").button({icons: {primary: "ui-icon-notice"}, text: true});
	},
  DrawContentBox                : function() {
    var that = this;
    if(!this.mainContentBox) {
      $("#container").after('<div id="SITRBoard" class="ui-widget" style="display:none;z-index:' + (database.settings.onTop.value ? 65112 : 61) + ';position: absolute; left:70px;top:180px;">\
                                    <div id="SITR_Tabs">\
                                        <ul>\
                                            <li><a href="#ResTab">' + database.getGlobalData.getLocalisedString("Economy") + '</a></li>\
                                            <li><a href="#BuildTab">Buildings</a></li>\
                                            <li><a href="#ArmyTab">' + database.getGlobalData.getLocalisedString("Military") + '</a></li>\
                                            <li><a href="#SettingsTab"><span class="ui-icon ui-icon-gear"/></a></li>\
                                            <li><a href="#HelpTab"><span class="ui-icon ui-icon-help"/></a></li>\
                                        </ul>\
                                        <div id="ResTab"></div>\
                                        <div id="BuildTab"></div>\
                                        <div id="ArmyTab"></div>\
                                        <div id="SettingsTab"></div>\
                                        <div id="HelpTab"></div>\
                                    </div>\
                                </div>');
      this.mainContentBox = $("#SITRBoard");
      this.$tabs = $("#SITR_Tabs").tabs({collapsible: true, show: null, selected: -1 });
      this.mainContentBox.draggable({
        handle: '#SITR_Tabs > ul',
        cancel: 'div.ui-tabs-panel',
        stop  : function() {
          render.SaveDisplayOptions();
        }
      });
	    this.$tabs.find('ul li a').on('click', function() {
		    events(Constant.Events.TAB_CHANGED).pub(render.$tabs.tabs('option', 'active'));
		    render.SaveDisplayOptions();
	      
      });
      render.mainContentBox.on('mouseenter',function() {
        if(database.settings.windowTennis.value) {
          render.mainContentBox.css('z-index', "65112")
        }
      }).on('mouseleave', function() {
        if(database.settings.windowTennis.value) {
          render.mainContentBox.css('z-index', "2")
        }
      })
    }
  },
  AttachClickHandlers           : function() {
    $('body').on('click', '#js_buildingUpgradeButton', function(e) {

      var href = this.getAttribute('href');
      if(href !== '#') {
        var params = $.decodeUrlParam(href);
        if(params['function'] === "upgradeBuilding") {
          var upgradeSuccessCheck = (function upgradeSuccess() {
            var p = params;
            return function(response) {
              var len = response.length;
              var feedback = 0;
              while(len--) {
                if(response[len][0] == 'provideFeedback') {
                  feedback = response[len][1][0].type;
                  break;
                }
              }
              if(feedback == 10) { //success
                render.updateChangesForCityBuilding(p['cityId'] || ikariam.getCurrentCity, [])
              }
              events('ajaxResponse').unsub(upgradeSuccessCheck);
            }
          })();
        }
        events('ajaxResponse').sub(upgradeSuccessCheck)
      }
    });

    //Global click handlers
    render.mainContentBox.on('click', 'td.city_name span.clickable',function(event) {
      var target = $(event.target);
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      var classes = target.parents('td').attr('class');
      var params = {cityId: city.getId};
      // city link
      if(!city.isCurrentCity) {
        $("#js_cityIdOnChange").val(city.getId);
        if(unsafeWindow.ikariam.templateView) {
          if(unsafeWindow.ikariam.templateView.id === 'tradegood' || unsafeWindow.ikariam.templateView.id === 'resource') {
            params.templateView = unsafeWindow.ikariam.templateView.id;
            if(ikariam.viewIsCity) {
              params.islandId = city.getIslandID;
              params.view = unsafeWindow.ikariam.templateView.id;
              params.type = unsafeWindow.ikariam.templateView.id == 'resource' ? 'resource' : city.getTradeGoodID;
            } else {
              params.currentIslandId = ikariam.getCurrentCity.getIslandID
            }
          }
        }
        ikariam.loadUrl(true, ikariam.mainView, params)
      }
      return false;
    }).on('click', 'td.sitractions div.transport',function(event) {
        var target = $(event.target);
      var city = database.getCityFromId(target.parents('td').parents('tr').attr('id').split('_').pop());
        if(!city.isCurrentCity && ikariam.getCurrentCity) {
          ikariam.loadUrl(true, ikariam.mainView, {view: 'transport', destinationCityId: city.getId, templateView: Constant.Buildings.TRADING_PORT})
        }
        return false;
      }).on('click', 'td.sitractions div[class*=deployment]', function(event) {
        var target = $(event.target);
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
        var type = target.attr('class').split(' ').pop().split('deployment').pop();
        if(ikariam.currentCityId === city.getId) {
          return false
        }
        var params = {
          cityId           : ikariam.CurrentCityId,
          view             : 'deployment',
          deploymentType   : type,
          destinationCityId: city.getId
        };
        ikariam.loadUrl(true, null, params)
      });

    //Resource table handlers
    $('#ResTab').on('click', 'span.clickable[class^=current]', function(event) {
      var target = $(event.target);
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      //building link
      var resource = target.parents('td').attr('class').split(' ').pop();
      var params = {
        cityId: city.getId
      };

      if(ikariam.CurrentCityId == city.getId || !ikariam.viewIsIsland) {
        params.type = resource == Constant.Resources.WOOD ? 'resource' : city.getTradeGoodID;
        params.view = resource == Constant.Resources.WOOD ? 'resource' : 'tradegood';
        params.islandId = city.getIslandID;
      } else if(ikariam.viewIsIsland) {
        params.templateView = resource == Constant.Resources.WOOD ? 'resource' : 'tradegood';
        if(unsafeWindow.ikariam.templateView)unsafeWindow.ikariam.templateView.id = null;
      }

      if(ikariam.viewIsIsland) {
        params.currentIslandId = ikariam.getCurrentCity.getIslandID;
      }

      ikariam.loadUrl(true, ikariam.mainView, params);
      render.AddIslandCSS();
      return false;
    });

    //Building table handlers
    $('#SITR_Tabs').on('click', 'td.building span.clickable', function(event) {
      var target = $(event.target);
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      //building link

      var className = target.parents('td').attr('class').split(' ').pop();
      var building = city.getBuildingsFromName(className.slice(0, -1))[className.charAt(className.length - 1)];
      var params = building.getUrlParams;
      if(unsafeWindow.ikariam.templateView)unsafeWindow.ikariam.templateView.id = null;
      ikariam.loadUrl(true, 'city', params);
      return false;
    });

    //Army table handlers

  },
  dynamicTip                    : function(id, type) {

    var city = database.getCityFromId(id);
    type = type.split(' ');
    if(type[0] == 'dynamic') {
      type = type.splice(1)
    } else return type.join(' ');
    var a = type[0];
    var b = type[1];
    if(a == 'resource') {
      //b == cell type
      var resourceName = type[2];
      if(b == 'current') {
        return ''
      }
      if(b == 'income') {
        if(resourceName !== city.getTradeGood && resourceName !== Constant.Resources.WOOD) {
          return ''
        }
        return getIncomeTip(city.getResource(resourceName).getProduction * 3600, resourceName)
      }
      if(b == 'progress') {
        var prod = city.getResource(resourceName).getProduction * 3600;
        var current = city.getResource(resourceName).getCurrent;
        return getProgressTip(city, resourceName)
      }
      if(b == 'consumption') {

        return (resourceName == Constant.Resources.WINE ? getWineUseTooltip(city.getResource(Constant.Resources.WINE).getConsumption) : '');
      }
      if(b == 'movement') {
        return getMovementTip(database.getGlobalData.getResourceMovementsToCity(id), city.getResource(resourceName).getCurrent, resourceName);
      }
      if(b === 'totals') {
        var totals = {};
        $.each(database.cities, function(cityId, city) {
          $.each(Constant.Resources, function(key, resourceName) {
            var res = city.getResource(resourceName);
            if(!totals[resourceName]) {
              totals[resourceName] = {}
            }

            totals[resourceName].total = totals[resourceName].total ? totals[resourceName].total + res.getCurrent : res.getCurrent;
            totals[resourceName].income = totals[resourceName].income ? totals[resourceName].income + res.getProduction * 3600 - res.getConsumption : res.getProduction * 3600 - res.getConsumption;

          })
        });

        var r = '';
        var finalSums = {income: 0, total: 0, day: 0, week: 0};
        $.each(totals, function(resourceName, data) {
          var day = data.total + data.income * 24;
          var week = data.total + data.income * 168;
          r += Utils.format('<tr>\n    <td><div class="icon {0}Image"></div></td>\n    <td >{1}</td>\n    <td >{2}</td>\n    <td >{3}</td>\n    <td >{4}</td>\n</tr>', [resourceName, Utils.FormatNumToStr(data.income, false, 0), Utils.FormatNumToStr(data.total, false, 0) , Utils.FormatNumToStr(day, false, 0) , Utils.FormatNumToStr(week, false, 0)]);
          finalSums.income += data.income;
          finalSums.total += data.total;
          finalSums.day += day;
          finalSums.week += week
        });
        if(r === '') {
          return ''
        } else {
          return Utils.format('<table>\n    <thead>\n    <td></td>\n    <td><b>Income</b></td>\n    <td ><b>Total</b></td>\n    <td ><b>+24hrs</b></td>\n    <td ><b>+7days</b></td>\n    </thead>\n    <tbody>\n    {0}\n    <tfoot>\n    <td></td>\n    <td >{1}</td>\n    <td >{2}</td>\n    <td >{3}</td>\n    <td >{4}</td>\n    </tfoot>\n    </tbody>\n</table>', [r, Utils.FormatNumToStr(finalSums.income, false, 0) , Utils.FormatNumToStr(finalSums.total, false, 0) , Utils.FormatNumToStr(finalSums.day, false, 0) , Utils.FormatNumToStr(finalSums.week, false, 0)])
        }
      }

    } else if(a == 'building') {
      // b == building name
      var bName = type[1]; //building name
      var bLevel = parseInt(type[2]); //building level
      var pos = parseInt(type[3]); //position
      return getBuildingTooltip(database.cities[id]._buildings[pos]);
    } else if(a == 'army') {
      //b == cell type
      var unit = type[2];
      if(b == 'movement') {
        return 'not yet implemented'
      } else if(b == 'training') {
        var table = '<table>\n    <thead>\n        <td><img src="{0}" style="height: 11px;"></td>\n        <td><b>Training</b></td>\n        <td></td>\n    </thead>\n    <tbody>\n{1}\n    <tr class="small">\n        <td></td>\n        <td>{2}</td>\n        <td class="left"><i>«Total</i></td>\n    </tr>\n    </tbody>\n</table>';
        var rows = '';
        var total = 0;
        $.each(city.military.getTrainingForUnit(unit), function(index, data) {
          rows += Utils.format('<tr>\n    <td><b>+</b></td>\n    <td >{0}</td>\n    <td ><i>«{1}</i></td>\n</tr>', [data.count, Utils.FormatTimeLengthToStr(data.time - $.now(), 3)]);
          total += data.count;
        });

        if(rows === '') {
          return ''
        } else {
          return Utils.format(table, [getImage(unit), rows, total])
        }
      }
    }

  },
  startResourceCounters                  : function() {
    this.stopResourceCounters();
    this.resUpd = events.scheduleActionAtInterval(render.updateResourceCounters.bind(render), 5000);
    this.updateResourceCounters(true);
  },
  stopResourceCounters                  : function() {
    if(this.resUpd) {
      this.resUpd();
      this.resUpd = null;
    }
  },
  getResourceRow                : function(city) {
    return this._getRow(city, "resource")
  },
  getBuildingsRow               : function(city) {
    return this._getRow(city, "building")
  },
  getArmyRow                    : function(city) {
    return this._getRow(city, "army")
  },
  _getRow                       :function(city, type){
    city = typeof city == 'object'?city:database.getCityFromId(city);
    if(!this.cityRows[type][city.getId])
      this.cityRows[type][city.getId] = $("#" + type + "_" + city.getId);
    return this.cityRows[type][city.getId]
  },
  getAllRowsForCity             : function(city) {
    return this.getResourceRow(city).add(this.getBuildingsRow(city)).add(this.getArmyRow(city))
  },
  setCityName                   : function(city, rows) {
    if(!rows) {
      rows = this.getResourceRow(city).add(this.getBuildingsRow(city)).add(this.getArmyRow(city))
    }
    rows.find('td.city_name').each(function(index, elem) {
      elem.children[0].outerHTML = '<span class="icon ' + city.getTradeGood + 'Image"></span>';
      elem.children[1].textContent = city.getName;
      elem.children[2].textContent = ' ' + (city.getAvailableBuildings || '');
      elem.children[2].setAttribute('data-tooltip', database.getGlobalData.getLocalisedString('free_building_space'));
    });
  },
  setActionPoints               : function(city, rows) {
    if(!rows) {
      rows = this.getAllRowsForCity(city);
    }
    rows.find('td.action_points').text(city.getAvailableActions)
  },
  setFinanceData                : function(city, row) {
    if(!row) {
      row = this.getResourceRow(city)
    }
    row.find('td.gold_income > span').eq(0).text(Utils.FormatNumToStr(city.getIncome, true, 0)).siblings(0).text(Utils.FormatNumToStr(city.getExpenses, true, 0))
  },
  setPopulationData             : function(city, row) {
    if(!row) {
      row = this.getResourceRow(city)
    }
    var populationData = city.populationData;
    var popSpace = Math.floor(populationData.currentPop-populationData.maxPop);

    row.find('td.population span').get(0).textContent = Utils.FormatNumToStr(populationData.currentPop, false, 0);
    row.find('td.population span').get(1).textContent = (popSpace!== 0?Utils.FormatNumToStr(popSpace, true, 0):'');

    var fillperc = 100 / populationData.maxPop * populationData.currentPop ;
    row.find('td.population div.progressbar').find('div.ui-progressbar-value').width(fillperc + "%").removeClass("normal warning almostfull full").addClass(fillperc > 90 ? fillperc > 96 ? "warning" : "normal" : fillperc > 70 ? "almostfull" : "full");

    var img;
    img = populationData.growth > 1 ? (populationData.growth < 6 ? 'happy' : 'ecstatic') : populationData.growth < 0 ? (populationData.growth < -1 ? 'outraged' : 'sad') : 'neutral';

    if(populationData.growth > 1) {
      img = populationData.growth < 6 ? 'happy' : 'ecstatic';
    } else if(populationData.growth < 1) {
      img = populationData.growth < 0 ? populationData.growth < -1 ? 'outraged' : 'sad' : 'neutral';
    }
    img = Utils.format('skin/smilies/{0}_x25.png', [img]);

    row.find('td.population_growth img').attr('src', img);
    row.find('td.population_happiness').get(0).textContent = Utils.FormatNumToStr(populationData.growth, true, 2);
  },
  setResearchData               : function(city, row) {
    if(!row) {
      row = this.getResourceRow(city)
    }

    row.find('td.research').get(0).textContent = Math.floor(city.research.getResearch);
  },
  setMovementDataForCity        : function(city, row) {
    if(!row) {
      row = this.getResourceRow(city)
    }
    var totalIncoming = {wood: 0, wine: 0, marble: 0, glass: 0, sulfur: 0};
    $.each(city.getIncomingResources, function(index, element) {
      for(var resourceName in Constant.Resources) {
        totalIncoming[Constant.Resources[resourceName]] += element.getResource(Constant.Resources[resourceName]);
      }
    });
    row.find('td.resource.wood').find('span.incoming').get(0).textContent = Utils.FormatNumToStr(totalIncoming[Constant.Resources.WOOD] || ' - ');
    row.find('td.resource.wine').find('span.incoming').get(0).textContent = Utils.FormatNumToStr(totalIncoming[Constant.Resources.WINE] || ' - ');
    row.find('td.resource.marble').find('span.incoming').get(0).textContent = Utils.FormatNumToStr(totalIncoming[Constant.Resources.MARBLE] || ' - ');
    row.find('td.resource.glass').find('span.incoming').get(0).textContent = Utils.FormatNumToStr(totalIncoming[Constant.Resources.GLASS] || ' - ');
    row.find('td.resource.sulfur').find('span.incoming').get(0).textContent = Utils.FormatNumToStr(totalIncoming[Constant.Resources.SULFUR] || ' - ');
  },
  setAllResourceData            : function() {
    this.startResourceCounters()
  },
	setCommonData :function(){
		$.each(database.cities, function(cityId, city) {
		this.setCityName(city);
		this.setActionPoints(city);
		}.bind(render))
	},
  updateResourceCounters        : function(force) {
    try {
      if((this.$tabs.tabs('option', 'active') == 0 ) || force) {
        var tot = {wood: 0, wine: 0, marble: 0, glass: 0, sulfur: 0};
        var inc = {wood: 0, wine: 0, marble: 0, glass: 0, sulfur: 0};
        var conWine = 0;
        var income = 0;
        var researchCost = 0;
        var researchTot = 0;

        $.each(database.cities, function(cityId, city) {
          var $row = Utils.getClone(this.getResourceRow(city));
          if(force) {
            this.setFinanceData(city, $row);
            this.setPopulationData(city, $row);
            this.setResearchData(city, $row);
            this.setMovementDataForCity(city, $row)
          }

          income += Math.floor(city.getIncome);
          researchTot += city.research.getResearch;

          researchCost += Math.floor(city.getExpenses);

          var storage = city.maxResourceCapacities;
          $.each(Constant.Resources, function(key, resourceName) {
            var currentResource = city.getResource(resourceName);
            var production = currentResource.getProduction * 3600;
            var current = currentResource.getCurrent;
            var consumption = resourceName == Constant.Resources.WINE ? currentResource.getConsumption : 0;
            inc[resourceName] += production;
            tot[resourceName] += current;
            conWine += consumption;

            var rescells = $row.find('td.resource.' + resourceName);

            rescells.find('span.current').addClass((resourceName == Constant.Resources.WOOD || city.getTradeGood == resourceName) ? "clickable" : "").get(0).textContent = (current ? Utils.FormatNumToStr(current, false, 0) : '0');
            rescells.find('span.production').get(0).textContent = (production ? Utils.FormatNumToStr(production, true, 0) : '');

            if(resourceName === Constant.Resources.WINE) {
              rescells.find('span.consumption').get(0).textContent = (consumption ? Utils.FormatNumToStr(0 - consumption, true, 0) : '');
              //Full hours until tavern cant pay wine bill, plus time until next tick (current tick is paid)
	            var time = currentResource.getEmptyTime;
	            time = time > 1? Math.floor(time) + (60 - new Date().getMinutes())/60 : 0;
	            time *= 3600000;
              rescells.find('span.emptytime').removeClass('Red Green').addClass(time > database.settings.wineWarningTime.value * 3600000 ? 'Green' : 'Red').get(0).textContent = (Utils.FormatTimeLengthToStr(time, 2))
            }
            var fillperc = (current / storage.capacity) * 100;
            rescells.find('div.progressbar').find('div.ui-progressbar-value').width(fillperc + "%").removeClass("normal warning almostfull full").addClass(fillperc > 90 ? fillperc > 96 ? "full" : "almostfull" : fillperc > 70 ? "warning" : "normal");
            if(storage.safe > current) {
              rescells.find('span.safeImage').show()
            } else {
              rescells.find('span.safeImage').hide()
            }

          }.bind(render));
          Utils.setClone(this.getResourceRow(city),$row);
          this.cityRows.resource[city.getId] = null
        }.bind(render));

        $("#t_currentwood").get(0).textContent = Utils.FormatNumToStr(Math.round(tot[Constant.Resources.WOOD]), false);
        $("#t_currentwine").get(0).textContent = Utils.FormatNumToStr(Math.round(tot[Constant.Resources.WINE]), false);
        $("#t_currentmarble").get(0).textContent = Utils.FormatNumToStr(Math.round(tot[Constant.Resources.MARBLE]), false);
        $("#t_currentglass").get(0).textContent = Utils.FormatNumToStr(Math.round(tot[Constant.Resources.GLASS]), false);
        $("#t_currentsulfur").get(0).textContent = Utils.FormatNumToStr(Math.round(tot[Constant.Resources.SULFUR]), false);
        $("#t_woodincome").find('span').get(0).textContent = Utils.FormatNumToStr(Math.round(inc[Constant.Resources.WOOD]), true);
        $("#t_wineincome").children('span').eq(0).text(Utils.FormatNumToStr(Math.round(inc[Constant.Resources.WINE]), true)).siblings('span').eq(0).text(Utils.FormatNumToStr(Math.round(conWine), true));
        $("#t_marbleincome").find('span').get(0).textContent = Utils.FormatNumToStr(Math.round(inc[Constant.Resources.MARBLE]), true);
        $("#t_glassincome").find('span').get(0).textContent = Utils.FormatNumToStr(Math.round(inc[Constant.Resources.GLASS]), true);
        $("#t_sulfurincome").find('span').get(0).textContent = Utils.FormatNumToStr(Math.round(inc[Constant.Resources.SULFUR]), true);

        tot = inc = null;

        var expense = database.getGlobalData.finance.armyCost + database.getGlobalData.finance.armySupply + database.getGlobalData.finance.fleetCost + database.getGlobalData.finance.fleetSupply - researchCost;
        var sigmaIncome = income - expense;
        document.getElementById("t_goldincome").children[0].textContent = Utils.FormatNumToStr(sigmaIncome, true, 0);
        document.getElementById("t_goldincome").children[1].textContent = sigmaIncome > 0 ? '\u221E' : Utils.FormatTimeLengthToStr((database.getGlobalData.finance.currentGold / sigmaIncome) * 60 * 60 * 1000, true, 0);
        document.getElementById("t_research").textContent = researchTot ? Utils.FormatNumToStr(researchTot, true, 0) : ' - ';

      }
    } catch(e) {
      SITR.error('UpdateResourceCounters', e)
    }
  }
};

function getCityNameFromID(originCity) {
  var ret = '';
  try {
    ret = database.cities[parseInt(originCity)].getName
  } catch(e) {
    ret = originCity;
  }
  return ret;
}

render.LoadCSS = function() {
  //Main Css
	GM_addStyle('/* Global board styles */\n#SITRBoard .clickable {\n    color: #542c0f;\n    font-weight: 700; }\n#SITRBoard .clickable:hover {\n    cursor: pointer;\n    text-decoration: underline; }\n#SITRBoard .Bold, #SITRBoard .Red, #SITRBoard .Blue, #SITRBoard .Green {\n    font-weight: bold; }\n#SITRBoard .Green {\n    color: green !important; }\n#SITRBoard .Red {\n    color: red !important; }\n#SITRBoard .Blue {\n    color: blue !important; }\n#SITRBoard .icon {\n    background-clip: border-box;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-color: transparent;\n    background-size: auto 20px; }\n#SITRBoard .safeImage {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEFJREFUeNpi/P//PwMIhOrzQhhAsPriZ0YQzYQugcxnQhaE6YABxhA9HhRdyICJAQ/AayzxOtFdzYRuFLIVAAEGANwqFwuukYKqAAAAAElFTkSuQmCC");\n    background-size: auto auto !important; }\n#SITRBoard .transportImage {\n    background-image: url(skin/actions/transport.jpg); }\n#SITRBoard .tradeImage {\n    background-image: url(skin/actions/trade.jpg); }\n#SITRBoard .merchantImage {\n    background-image: url(skin/minimized/merchantNavy.png);\n    background-position: 0 -5px; }\n#SITRBoard .woodImage {\n    background-image: url(skin/resources/icon_wood.png); }\n#SITRBoard .wineImage {\n    background-image: url(skin/resources/icon_wine.png); }\n#SITRBoard .marbleImage {\n    background-image: url(skin/resources/icon_marble.png); }\n#SITRBoard .sulfurImage {\n    background-image: url(skin/resources/icon_sulfur.png); }\n#SITRBoard .glassImage {\n    background-image: url(skin/resources/icon_glass.png); }\n#SITRBoard .researchImage {\n    background-image: url(skin/layout/bulb-on.png); }\n#SITRBoard .populationImage {\n    background-image: url(skin/resources/icon_population.png); }\n#SITRBoard .goldImage {\n    background-image: url(skin/resources/icon_gold.png); }\n#SITRBoard .happyImage {\n    background-image: url(skin/smilies/happy.png); }\n#SITRBoard .actionpointImage {\n    background-image: url(skin/resources/icon_actionpoints.png); }\n#SITRBoard .growthImage {\n    background-image: url(skin/icons/growth_positive.png); }\n#SITRBoard .scientistImage {\n    background-image: url(skin/characters/40h/scientist_r.png); }\n#SITRBoard .priestImage {\n    background-image: url(skin/characters/40h/templer_r.png); }\n#SITRBoard .citizenImage {\n    background-image: url(skin/characters/40h/citizen_r.png); }\n#SITRBoard .cityIcon {\n    background-image: url(skin/icons/city_30x30.png); }\n#SITRBoard .governmentIcon {\n    background-image: url(skin/government/zepter_20.png); }\n#SITRBoard .researchIcon {\n    background-image: url(skin/icons/researchbonus_30x30.png); }\n#SITRBoard .tavernIcon {\n    background-image: url(skin/buildings/tavern_30x30.png); }\n#SITRBoard .culturalIcon {\n    background-image: url(skin/interface/icon_message_write.png); }\n#SITRBoard .museumIcon {\n    background-image: url(skin/buildings/museum_30x30.png); }\n#SITRBoard .incomeIcon {\n    background-image: url(skin/icons/income_positive.png); }\n#SITRBoard .crownIcon {\n    background-image: url(skin/layout/crown.png); }\n#SITRBoard .corruptionIcon {\n    background-image: url(skin/icons/corruption_24x24.png); }\n#SITRBoard #SITRTip {\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 99999999; }\n#SITRBoard #SITRTip .icon {\n    background-clip: border-box;\n    background-repeat: no-repeat;\n    background-position: 0;\n    background-color: transparent;\n    background-attachment: scroll;\n    background-size: 25px auto;\n    height: 17px;\n    min-width: 24px;\n    width: 24px; }\n#SITRBoard #SITRTip .content {\n    background-color: #fae0ae;\n    border: 1px solid #e4b873;\n    position: relative;\n    overflow: hidden;\n    text-align: left;\n    word-wrap: break-word; }\n#SITRBoard #SITRTip .content table {\n    width: 100%; }\n#SITRBoard #SITRTip .content table tr.data {\n    background-color: #faeac8; }\n#SITRBoard #SITRTip .content table tr.total {\n    background-color: #fae0ae; }\n#SITRBoard #SITRTip .content table td {\n    padding: 2px;\n    height: auto !important;\n    text-align: right; }\n#SITRBoard #SITRTip .content table th {\n    padding: 2px;\n    height: auto !important;\n    text-align: center;\n    font-weight: bold; }\n#SITRBoard #SITRTip .content table tbody td:last-child {\n    text-align: left;\n    white-space: nowrap;\n    font-style: italic; }\n#SITRBoard #SITRTip .content table tfoot {\n    border-top: 3px solid #fdf7dd; }\n#SITRBoard #SITRTip .content table tfoot td:last-child {\n    text-align: left;\n    white-space: nowrap;\n    font-style: italic; }\n#SITRBoard #SITRTip .content table thead {\n    background: #f8e7b3; }\n#SITRBoard #SITRTip .content table thead th.lf {\n    border-left: 2px solid #e4b873; }\n#SITRBoard #SITRTip .content table tbody td.lf {\n    border-left: 2px solid #e4b873; }\n#SITRBoard #SITRTip .content table th.nolf, #SITRBoard #SITRTip .content table td.nolf {\n    border-left: none; }\n#SITRBoard #SITRTip .content th.lfdash, #SITRBoard #SITRTip .content td.lfdash {\n    border-left: 1px dashed #e4b873; }\n#SITRBoard #SITRTip .content table tr.small td {\n    height: auto !important;\n    padding-top: 1px;\n    font-size: 10px !important;\n    line-height: 11px !important; }\n#SITRBoard #SITR_Tabs table {\n    width: 100% !important;\n    text-align: center;\n    border: 2px solid #ffffff; }\n#SITRBoard #SITR_Tabs table colgroup {\n    border-left: 2px solid #e4b873; }\n#SITRBoard #SITR_Tabs table colgroup:first-child {\n    border: none !important; }\n#SITRBoard #SITR_Tabs table colgroup col {\n    border-left: 1px dashed #e4b873; }\n#SITRBoard #SITR_Tabs table thead {\n    background: #f8e7b3 url(skin/input/button.png) repeat-x scroll 0 bottom; }\n#SITRBoard #SITR_Tabs table thead tr {\n    height: 30px; }\n#SITRBoard #SITR_Tabs table thead tr th {\n    text-align: center;\n    font-weight: bold;\n    text-shadow: 0 0.12em #FFFFFF;\n    overflow: hidden;\n    white-space: nowrap; }\n#SITRBoard #SITR_Tabs table thead tr th.icon {\n    min-width: 30px;\n    background-size: auto 20px; }\n#SITRBoard #SITR_Tabs table tbody tr {\n    border-top: 1px solid #e4b873; }\n#SITRBoard #SITR_Tabs table tbody tr:nth-child(even) {\n    background-color: #f6ebba; }\n#SITRBoard #SITR_Tabs table tbody tr.selected {\n    background-color: #FAE3B8;\n    box-shadow: 0 0 1em #CB9B6A inset; }\n#SITRBoard #SITR_Tabs table tbody tr:hover {\n    background-color: #fff;\n    box-shadow: 0 0 1em #CB9B6A; }\n#SITRBoard #SITR_Tabs table tbody tr td.city_name {\n    width: 110px;\n    max-width: 110px;\n    padding-left: 3px;\n    text-align: left;\n    padding-right: 14px; }\n#SITRBoard #SITR_Tabs table tbody tr td.city_name span.icon {\n    background-repeat: no-repeat;\n    float: left;\n    width: 20px;\n    background-size: 20px auto;\n    margin: 0 2px 0 -1px;\n    height: 16px;\n    cursor: move; }\n#SITRBoard #SITR_Tabs table tbody tr td.sitractions div {\n    background-clip: border-box;\n    background: transparent repeat scroll 0 0;\n    background-size: 25px auto;\n    height: 17px;\n    min-width: 24px;\n    width: 24px; }\n#SITRBoard #SITR_Tabs table tbody tr td.sitractions div.transport {\n    background-image: url("skin/actions/transport.jpg"); }\n#SITRBoard #SITR_Tabs table tbody tr td.sitractions div.deploymentarmy {\n    background-image: url("skin/actions/move_army.jpg");\n    float: left; }\n#SITRBoard #SITR_Tabs table tbody tr td.sitractions div.deploymentfleet {\n    background-image: url("skin/actions/move_fleet.jpg");\n    float: right; }\n#SITRBoard #SITR_Tabs table tbody tr td.sitractions div:hover {\n    background-position: 0 -17px; }\n#SITRBoard #SITR_Tabs table tbody tr.selected .sitractions div, #SITRBoard #SITR_Tabs table tbody tr.current .sitractions div {\n    background-position: 0 16px; }\n#SITRBoard #SITR_Tabs table tfoot {\n    background: #fae0ae;\n    background: #e7c680 url(skin/input/button.png) repeat-x scroll 0 0;\n    border-top: 2px solid #e4b873; }\n#SITRBoard #SITR_Tabs table tfoot tr td {\n    text-align: right;\n    text-shadow: 0 0.12em #FFFFFF; }\n#SITRBoard #SITR_Tabs table tfoot tr td.total {\n    text-align: right; }\n#SITRBoard #SITR_Tabs table tfoot tr td.total span {\n    line-height: 1em;\n    height: 1em;\n    font-size: 0.8em;\n    display: block; }\n#SITRBoard #SITR_Tabs table tfoot tr td#t_sigma, #SITRBoard #SITR_Tabs table tfoot tr td.sigma {\n    font-weight: 700;\n    text-align: center; }\n#SITRBoard #ResTab div.progressbar .normal {\n    background: #73443E; }\n#SITRBoard #ResTab div.progressbar .warning {\n    background: #8F1D1A; }\n#SITRBoard #ResTab div.progressbar .almostfull {\n    background: #B42521; }\n#SITRBoard #ResTab div.progressbar .full {\n    background: #ff0000; }\n#SITRBoard #ResTab table tr td.gold_income, #SITRBoard #ResTab table tr td.resource, #SITRBoard #ResTab table tr td.army:nth-child(even) {\n    text-align: right; }\n#SITRBoard #ResTab table tr td.gold_income span, #SITRBoard #ResTab table tr td.resource span, #SITRBoard #ResTab table tr td.army:nth-child(even) span {\n    line-height: 1em;\n    height: 1em;\n    font-size: 0.8em;\n    display: block; }\n#SITRBoard #ResTab table tr td.gold_income span.icon, #SITRBoard #ResTab table tr td.resource span.icon, #SITRBoard #ResTab table tr td.army:nth-child(even) span.icon {\n    background-repeat: no-repeat;\n    float: left;\n    width: 7px;\n    height: 9px;\n    padding: 5px 4px 0 0; }\n#SITRBoard #ResTab table tr td.gold_income span.current, #SITRBoard #ResTab table tr td.resource span.current, #SITRBoard #ResTab table tr td.army:nth-child(even) span.current {\n    font-size: 1em;\n    display: inline; }\n#SITRBoard #ResTab table tr td.population {\n    text-align: right; }\n#SITRBoard #ResTab table tr td.population span:nth-child(2) {\n    line-height: 1em;\n    height: 1em;\n    font-size: 0.8em;\n    display: block; }\n#SITRBoard #BuildTab table tbody tr td {\n    background-clip: border-box;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-color: transparent;\n    background-size: auto 20px; }\n#SITRBoard #BuildTab table tbody tr td span.maxLevel {\n    color: rgba(84, 44, 15, 0.3); }\n#SITRBoard #BuildTab table tbody tr td span.upgradableSoon {\n    color: #4169e1;\n    font-style: italic; }\n#SITRBoard #BuildTab table tbody tr td span.upgradable {\n    color: green;\n    font-style: italic; }\n#SITRBoard #BuildTab table tbody tr td span.upgradable:after {\n    content: "+"; }\n#SITRBoard #BuildTab table tbody tr td span.upgrading {\n    background: url("/skin/icons/arrow_upgrade.png") no-repeat scroll 1px 3px transparent;\n    border-radius: 5px 5px 5px 5px;\n    box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);\n    display: inline-block;\n    padding: 2px 5px 1px 20px;\n    margin: 2px; }\n#SITRBoard #BuildTab table tbody tr td.building.winegrower0:not(:empty) {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAABQRJREFUOMuV1MuOHFcBxvH/OXWqurqqu6vdM56LZ3wZC5w4G8OCBSAQCCkSEjs2bBBSFlGMxIKd90hIvACWeAUktjwCQjFJhBNMhtie8fSkZ3r6Xvc6dc5hwYaFjcj3AP/f7lO8YcX8BZ7qPFxMP//9p+MPeTb7J23jcyMZcf/GPRbFnLTc8M2b32V3/8EvTVs97m4dvbal3oQ4Y0E6yqJgPJ+xTgvAMtMNx7mmcRW+ryhNhjY1ranelHo9orMrVJiE6fLkrXU9Z1VO0brGU4Lalqz0DOEbnIpZBjOGXkrj8q+GGF2CtT/J8vEHJ/VTTKdE1gLnBNZYdFPTESFeENDQoJ1Gu+arIQAOZz3p235vSCeaUBYtrXaUmcE5h0g0XQFN5jAJtJr/H6mzKSAinIkDf+c0zPbfDuRzgm6FaR1VZslmDnEA/X5Ar7NF38Tf34v2F222+rNzduP3R/8bsbpEeP6Pi+X4D+cnZ+EXH51xpS11CBZBMQe77lBHIVVkSasLzk7/9rNef/jT/tbtx73B4W+yzXTWG+y8HtHVHNXph+V8/L3F+UX49Mkzzk5mrCtBGA8JE0FgHG3XIFSJ2mk4LRd8/I9P2D3o+/f51q9uCRcn/VuP/htSALZZAiK2unq3Xpz/oLw4f3/xfMrkyyV5VXM9HvLO3j7KF1hhSW3Gy3RMXhSEMZioJfVrxuavgjnvHToYJbceZel01uvvoNpq0W/q8kdllv8wnZ+/v766CrPTBek8w5eSuNNh1OshBMSqg5CS5TKnsgIuQOxCnChMBWmz5ovqL8K04j3hBMng8FG6uZypJlv9bjOb/OL5i9Po2dPPOT27gFbwnaO7PDg4YFmWSCkpm5rxZkleN8yKDYO3fAZJRKsrZGCoU0e2dqhww8v6Q6E8+Z7viYvR8P5vVXH16uHl30/47NNjpqsNurZEgU/aVCRxxG6SsCoK5nXDvyaXTLOMOFHc3tlChYa8AuEE0RZIKTCNI+/MuXRPxG69++uoGh4rXaaIquXta9e5k4xY1TWx73OZbfjo7BWDTkimNfM0RbcGTwqGOz7Jnseq0hhjUYCnBEKAaaCtHZldMTHHUccd7KvWWPKmBiEY9npsDQbgHKuy4HhxSVZVaGsZdEMOt0cYYQj2S9pgTZs34AALtgYZgghA55AWFavehEqsUFmRc3w55eJqxXaSsNfr4Xsem7phWZZsioLtfp+v7e1xmAzRXsM8uSTfrDDWISRY45BW4EmwgBeAtQ6DxmJQSsO1KOKlvuLldEpRlgSeR9223EgSpIDr/T5HW1sMOiHnm5qrVxXCaKItiW4N64VjuC/oh5JaO6x1oAVSd5BOobJXOZFQxN0O803KYZIw6vWojUGbluPZlHVecjKf0REeZ4slxD637t4gcHA5zsgmGVHcIg8EnudopcOrQ5LikG4zQk1WCybrDUXdUOmWQmv2g4BICBZ5ThxGSF8hQ8WqLImSLl8/usm9u4coKZisJnySPcepKZ7X0lUS3Vh8EXBNbhOLHurmN45IP3vOnue4di1Gh4JxmaK0wzhLMuryzt277OxsIX0fKSRR3C97w93HUgj6vd2Hnduj7lg8xbhzrKyRQhJ4IUr6CCFQRw++TRh1qPP1fw4SwXxZMXkxI4ljbt4bsXPrwA227/wxCKMngOfgS+EFf0IIBt3ux3eS7Z+7sXl3nBeY3hQhwPdCpJDg4N+FYbSjpEdluAAAAABJRU5ErkJggg==);\n    text-shadow: 0px 1px 2px #FFF; }\n#SITRBoard #BuildTab table tbody tr td.building.stonemason0:not(:empty) {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAMAAABPqWaPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAGBQTFRFAAAA8d/I6N/WzcS26NG27Nq68ezjv7Gotq2fyLqk1s3EqJqRraSWsaSW2sit0c2/pJaIrZ+Rn5GDqJqN49bE39rR7Ojaloh639bIxLqtsZ+R+vXxsaia39HEjX9xsaSaTMajHAAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAAAEgAAABIAEbJaz4AAADqSURBVChTpdDRboMwDAVQcBoTEqgDrkMAk/7/XzZM2tpufdt99NGVZTfNf9OCudhPYBE6138g69GHYeyvf4AAKYYhTL/Mkgf0M08hcnijmxFJZolVIvevlUwisHKc47u0IpT9Skhb7cSntAAnGNxFtdpTEmTyhiTtnlXHsb+8islIaTfzKcrXH/EkCCbt3aLOOVX9llSPSfkA1BLU6aTuHNsWs5cE4gXwXnjbmL86FjA7t66GThnKzMxx2yrcAKXuHIPr/ClLpfqgxh6ShOKkyjG6nO6lLHwe2xz1J55inIYwL+EALqXMNcsD5M0SNKvkKqsAAAAASUVORK5CYII=);\n    text-shadow: 0px 1px 2px #FFF; }\n#SITRBoard #BuildTab table tbody tr td.building.glassblowing0:not(:empty) {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAABJxJREFUOBG9wcuKZGcBwPH/dz3n1DlVXdXVPe3ETHomMQaSjYLEUYgv4CZP4VpGwQjZZOvChxDyFBJcBATNQjfiIgbNMEmc7uq6nfv5bjJCgwxMsvP3g/8DwTdw3RYQ8zg1b4cQTKMqTIrkTE4Z+2egttUdvo7ma4Rui9Sm7Jvtz7tm9+s2SH1QkozAWg1jWc7fTYmP+AaaF/DtBill2da7R9vD7v0ntbNHc8EkC3IZiJnUImXvrBYnH3ddPc1mc15E8wLj2CGFfLg97N77y5Wz2zTHFBmZkURheDJpoTr/y0Ttk+8/6XZPfGbzTxIcdXnG/9KuvTlxU/+DPkg7qgxFYiGGKa+qP17dHO0XjTePW4nMFGVISJmAQKsE/x5U2Q37D1y7Cy/Nzbhart+NKX3Ec7Sfuneaev/h08kUo52jCTgx+NLzGyPiaYjJxCiwUqGVJCZwISGFZDvBv652srm5kt9/sNb5ib4/jAPP04Pz+VXrsn8MpRG5RYrERmhzMbXvr0SDjgNSFCgh0BLGEEhSEBP0XcfjL27wfct07zTFRJsQPE8HNXurS40dMcgoUVJQY5icVrUuaBNEEiklIhGXIkSQDrabaw6HIzPpyYUXWRrfPFuflq69aU255paMQp4GlMiNpLAKKUAIGDHsYklnzojSMsXI6CISiUqCpm7Yba4JbsLmOcJkwo3tr/p2/0gIWU7NNbfkFCWNlygSF5Uh15KU+K+QQNkCYwuUtrgUiSnhXGCz3dLUNcUs5/LBJdXFA3pV2rE7vueG+mGYOm7JTPjrLA3ppm5IMbDMNTEmfIj4GBl8ososhVaYFOndwM1+R725QmnNnW/f4+TsLk6XRDsnRm9SnGwKjlvSCv+301x2wnV8frVDi0hhBD4mXEgMPoFULHPNMtcI5/BDQzXLeOXykrOLu3zZeD7bdAwBktQkNFFobslqNv/9+uTkt/fnKe0Oe77at5RWIgU4nxh9oO5HpFLkNsM7h02OV1/5Fm+9dsnd1YIgYNP1NF7Sy4UOMvtxWVala655Ro79oVnl+g+vLnV7nk082R459hMzq4gkfIhMIbDvHTElTnLNd++/zJuv3eflszmnpeW8LMi0YoySYzCia/ePur7/0Tj2PCONLRYIOV/Ol399YynB9zzd1xQ6oUWiGXq0jLTTQDNFLs9P+d7lXc4XM5QUOB+5t8z4zqpi8oLHTeTLLszGwE/L+bKcmg3ST/1PDofN7z7ftw8HNWc+K+nHkWPbU1lJZiTCGJQ1LErLS+uKKCW9S8gkaKeA1ZJ1Zeh85HpM1Mky9Yefjc3+h37qkM45u+/H/NMa/dlYYYqKRVVQT5HCaF6/s+SsynnjbMHr64Jn/rkdeFo7YoRMSVICAeQK+gBfdZpt54suqreL1T2ljbXjIjNTVTfZ3w+JrFqwynMW1rAqDOvS0IWc89wiBXx6M+JCZF1KaufZ947cS0QUrGaa4iA4tp62sKJP5heyH/4k89ni46xaf5iJhNtfMY0Dwzgx+QEjA1oLVoWhMBJSYpo8uRIYJRhcwihBTInBB6wSnGWK09JgZwsm7NxHsfoPqKt+g05SC1UAAAAASUVORK5CYII=);\n    text-shadow: 0px 1px 2px #FFF; }\n#SITRBoard #BuildTab table tbody tr td.building.alchemist0:not(:empty) {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAMAAABPqWaPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAGBQTFRFAAAA8d+/9d+W1rZ638Sa8dq29ei69dqD48h60baN9eOf+uzR+uio7NatupZs8d+f+uOR6NGRza1sv5pfrY1oyKRj7Naa//G6/+yftpFa//r1/+yopH9RrYhW2rpx7NGDIqezSAAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAD4SURBVCiRpY/ZcsMwCEUdLQZL3iQZO8RC+v+/jJpMm2mat/IGZw4Xuu6fdVHafAS2BxzsJ9IrcGawf5kfQVllBvOGrPdKTQa1nt82Wr+svQ8xprTRr7Muu3L+uGLiVvPLutz8ovrjvCrizFG26Sf9tjt3nOsKJYkUnTfzrUzVja42gJozVcr5MW+vVKeqrg4JMQqXwvICheoJkUvFJETCTxDGE1N0KxLrClqYRJ7GeASKu6uFOCJUlsRfOX1Qrn1Yr7XExKkAlCwtx/chBB0jroCRmFNbB5R57pYQzDCYHdaHwk0GQMlzZ+00Tda61upE0exmV4CUtztm+xM5HuXJowAAAABJRU5ErkJggg==);\n    text-shadow: 0px 1px 2px #FFF; }\n#SITRBoard #BuildTab table tbody tr td.building.palace0:not(:empty) {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAA2BJREFUOBEFwU1rXVUUgOF3rb3P1725yU3TWJWohEJxUJ1aOlBQiujQiQNnIo6c+gsExwqCv8BB/0HFoQNxoKK2tIJtKNUYaz5u7kfuOWefvZbPw4M7n/rRwY9/zufnbw/u4u5yPjt55+jJL48e3r3tR38/OJ7N5u9fXKzicrHg8PHPzM/Pbx49+f23+z994wd//JDPTo8/12ZjjuV/r1ruvhra7mbq2tdy7r/ou9P9jY0Gd3bykL4U93erKk6fffH6xOz8s747fGU6XrPVLDVo+kQWhx+6FLcg3nDr7VhD9lDqZfessaxxxljGh3Z1lrI+kEJ/jfHoA8nHm1EL8ICWLyEHd95zqZ/HR9dwNmmaRF2tqEYVcWMPimdoVwOr0wUXXcBCJPhDtptjoOFiLkx2XiW2s4RUh3jbos0lRhFUM+Rt3LbAJoRYE8uBsHhEoSvq8pjg0KVMu4QYz4giEBgIPiNKopKGGDYgNECJSCQUI4oyoN0B2ClVdKJMGcTAhdSuiQioOJGBJhplFQgFuGTAgICIEDwj7SmpOyYVNbFsEHrcA9kyigACIGgo0FihwRDJOAEn4gQEJ4ihPmBpwIeMqCFqSFAigAiIAAhgCAkk41IAEQccQzAcMHfAUUkEBRHQdQd5ANxx67HUkrPiFgFFUBRDLGPmZAN3MAfLjpARG4iHJ7CbYVOcInV4rsm2jdAQyIgouIKDO5hBGpzVGlJf0vZCEyGC899caLOjVSZURgiBUAZ8GNAwYK503cC6c1Zr6DGiDEgTaXulrJW4u1Ox7hLuznIlSOWU0qG0xGGFlHOMmvVizcnS6NewWQujQiE4rSgSIlruvMxkc8JkLNS1EgslFIbIgHuHWwIMCU4ZYdzAqFY8G4uTGX2XCGVF1MuvM+gYWd4je09OiZg6irKlKnukMnJOWDCq6LQ9LBaZfrai65Vm+hyxHhF3965/N2/Gb3G+pXn9F4MM5LZFfU4rJdovsWTkQdDRCKxlnXaRsMX0yh7TK/uMp1eQ+XK1N3SLj3SYXfXh4qkW+aZz94bqE0S3Qd4AuwQ+x/P35PyYlG89tbR9Oyj36o2tF8qqOhJ3BxDA2y69ebE8/Xpxdv/aOM4QE8ymuAfAwM/I3tGynyY7+99uTLY+tpz/GY8b/geGd+pmTCUDLQAAAABJRU5ErkJggg==);\n    text-shadow: 0px 1px 2px #FFF; }\n#SITRBoard #ArmyTab table colgroup col:nth-child(even) {\n    border-left: none; }\n#SITRBoard #SettingsTab .options, #SITRBoard #HelpTab .options {\n    float: left;\n    padding: 10px; }\n#SITRBoard #SettingsTab .options span.category, #SITRBoard #HelpTab .options span.category {\n    margin-left: -3px;\n    font-weight: 700; }\n#SITRBoard #SettingsTab .options span.category:not(:first-child), #SITRBoard #HelpTab .options span.category:not(:first-child) {\n    margin-top: 5px; }\n#SITRBoard #SettingsTab .options span:not(.clickable), #SITRBoard #HelpTab .options span:not(.clickable) {\n    display: block; }\n#SITRBoard #SettingsTab .options span label, #SITRBoard #HelpTab .options span label {\n    vertical-align: top;\n    padding-left: 5px; }\n#SITRBoard #SettingsTab .buttons, #SITRBoard #HelpTab .buttons {\n    clear: left;\n    padding: 3px; }\n#SITRBoard #SettingsTab .buttons button, #SITRBoard #HelpTab .buttons button {\n    margin-right: 5px; }\n\n.toast {\n    display: none;\n    position: fixed;\n    z-index: 99999;\n    width: 100%;\n    text-align: center;\n    bottom: 5em; }\n\n.toast .message {\n    display: inline-block;\n    color: #4C3000;\n    padding: 5px;\n    border-radius: 5px;\n    box-shadow: 3px 0px 15px 0 #542C0F;\n    -webkit-box-shadow: 3px 0px 15px 0 #542C0F;\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 11px;\n    background: #faf3d7;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #faf3d7), color-stop(1, #e1b06d)); }\n\ndiv.prog:after {\n    -webkit-animation: move 2s linear infinite;\n    -moz-animation: move 2s linear infinite; }\n\n.prog {\n    display: block;\n    width: 100%;\n    height: 100%;\n    background: #fcf938 -moz-linear-gradient(center bottom, #fcf938 37%, #fcf938 69%);\n    position: relative;\n    overflow: hidden; }\n.prog:after {\n    content: "";\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    background: -moz-linear-gradient(-45deg, rgba(10, 10, 10, 0.6) 25%, transparent 25%, transparent 50%, rgba(10, 10, 10, 0.6) 50%, rgba(10, 10, 10, 0.6) 75%, transparent 75%, transparent);\n    z-index: 1;\n    -webkit-background-size: 50px 50px;\n    -moz-background-size: 50px 50px;\n    background-size: 50px 50px;\n    -webkit-animation: move 5s linear infinite;\n    -moz-animation: move 5s linear infinite;\n    overflow: hidden; }\n\n.animate > .prog:after {\n    display: none; }\n\n@-webkit-keyframes move {\n    0% {\n        background-position: 0 0; }\n\n    100% {\n        background-position: 50px 50px; } }\n\n@-moz-keyframes move {\n    0% {\n        background-position: 0 0; }\n\n    100% {\n        background-position: 50px 50px; } }\n');

  //jQuery UI CSS
  GM_addStyle("/*!\n* jQuery UI CSS Framework 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Theming/API\n*/\n\n/* Layout helpers\n----------------------------------*/\n.ui-helper-hidden {\n    display: none;\n}\n\n.ui-helper-hidden-accessible {\n    position: absolute !important;\n    clip: rect(1px, 1px, 1px, 1px);\n    clip: rect(1px, 1px, 1px, 1px);\n}\n\n.ui-helper-reset {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    outline: 0;\n    line-height: 1.3;\n    text-decoration: none;\n    font-size: 100%;\n    list-style: none;\n}\n\n.ui-helper-clearfix:before, .ui-helper-clearfix:after {\n    content: \"\";\n    display: table;\n}\n\n.ui-helper-clearfix:after {\n    clear: both;\n}\n\n.ui-helper-clearfix {\n    zoom: 1;\n}\n\n.ui-helper-zfix {\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    position: absolute;\n    opacity: 0;\n    filter: Alpha(Opacity = 0);\n}\n\n/* Interaction Cues\n----------------------------------*/\n.ui-state-disabled {\n    cursor: default !important;\n}\n\n/* Icons\n----------------------------------*/\n\n/* states and images */\n.ui-icon {\n    display: block;\n    text-indent: -99999px;\n    overflow: hidden;\n    background-repeat: no-repeat;\n}\n\n/* Misc visuals\n----------------------------------*/\n\n/* Overlays */\n.ui-widget-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n\n/*!\n* jQuery UI CSS Framework 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Theming/API\n*\n* To view and modify this theme, visit http://jqueryui.com/themeroller/?ffDefault=Verdana,Arial,sans-serif&fwDefault=bold&fsDefault=1em&cornerRadius=4px&bgColorHeader=F8E7B3&bgTextureHeader=03_highlight_soft.png&bgImgOpacityHeader=75&borderColorHeader=ffffff&fcHeader=542c0f&iconColorHeader=542C0F&bgColorContent=f6ebba&bgTextureContent=01_flat.png&bgImgOpacityContent=75&borderColorContent=eccf8e&fcContent=542c0f&iconColorContent=542c0f&bgColorDefault=eccf8e&bgTextureDefault=02_glass.png&bgImgOpacityDefault=75&borderColorDefault=eccf8e&fcDefault=542c0f&iconColorDefault=542c0f&bgColorHover=f6ebba&bgTextureHover=02_glass.png&bgImgOpacityHover=75&borderColorHover=eccf8e&fcHover=542c0f&iconColorHover=542c0f&bgColorActive=f6ebba&bgTextureActive=02_glass.png&bgImgOpacityActive=65&borderColorActive=eccf8e&fcActive=542c0f&iconColorActive=542c0f&bgColorHighlight=f6ebba&bgTextureHighlight=07_diagonals_medium.png&bgImgOpacityHighlight=100&borderColorHighlight=eccf8e&fcHighlight=542c0f&iconColorHighlight=542c0f&bgColorError=f6ebba&bgTextureError=05_inset_soft.png&bgImgOpacityError=95&borderColorError=cd0a0a&fcError=cd0a0a&iconColorError=cd0a0a&bgColorOverlay=aaaaaa&bgTextureOverlay=07_diagonals_medium.png&bgImgOpacityOverlay=75&opacityOverlay=30&bgColorShadow=aaaaaa&bgTextureShadow=01_flat.png&bgImgOpacityShadow=0&opacityShadow=30&thicknessShadow=8px&offsetTopShadow=-8px&offsetLeftShadow=-8px&cornerRadiusShadow=8px\n*/\n\n/* Component containers\n----------------------------------*/\n.ui-widget {\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 1em;\n}\n\n.ui-widget .ui-widget {\n    font-size: 1em;\n}\n\n.ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button {\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 1em;\n}\n\n.ui-widget-content {\n    border: 1px solid #eccf8e;\n    background: #f6ebba url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD0ZHJ6AAAAfUlEQVRoge3OMQGAIAAAQaR/Iiq5u0oEhht0+Etw13Ovd/zY/DpwUlAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVBtVtsEYluRKCAAAAAASUVORK5CYII=\") 50% 50% repeat-x;\n    color: #542c0f;\n}\n\n.ui-widget-content a {\n    color: #542c0f;\n}\n\n.ui-widget-header {\n    border: 1px solid #ffffff;\n    background: #f8e7b3 url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABkCAYAAAEwK2r2AAAAY0lEQVQYlaWPMQ6DQAwER/v/7+UhQTRH7N00QEESiUAzki17vOb1fEQAR8QDpSaUmhHkYwSAb4LEKD2vAryc3/2JpFC8IDzWfHgg0qcEd47/haT3VEZxbWUKQW89GhFffeEi3kGvSQXcQU8oAAAAAElFTkSuQmCC\") 50% 50% repeat-x;\n    color: #542c0f;\n    font-weight: bold;\n}\n\n.ui-widget-header a {\n    color: #542c0f;\n}\n\n/* Interaction states\n----------------------------------*/\n.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default {\n    border: 1px solid #eccf8e;\n    background: #eccf8e url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGQCAYAAABvWArbAAAASklEQVQ4je3Puw2EABAD0fGw9F8KFSFqgJTgCPhEFHBCmzxN4sCs8/QToGmaz7JvC5JgMiAnhbEwjoiFPpXUXda1SPyHM03TvHEAd0QJtjgD5PAAAAAASUVORK5CYII=\") 50% 50% repeat-x;\n    font-weight: bold;\n    color: #542c0f;\n}\n\n.ui-state-default a, .ui-state-default a:link, .ui-state-default a:visited {\n    color: #542c0f;\n    text-decoration: none;\n}\n\n.ui-state-hover, .ui-widget-content .ui-state-hover, .ui-widget-header .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus, .ui-widget-header .ui-state-focus {\n    border: 1px solid #eccf8e;\n    background: #f6ebba url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGQCAYAAABvWArbAAAAR0lEQVQ4je3PMQrAIABD0Z/o/Y/Wk3RwLBSqg0KXHkBKlkeGv4SrHd0AIYTf8twnBmEkDF5IBTMxlupaM1HB0ht7hzMhhC8GEiwJ5YKag9EAAAAASUVORK5CYII=\") 50% 50% repeat-x;\n    font-weight: bold;\n    color: #542c0f;\n}\n\n.ui-state-hover a, .ui-state-hover a:hover {\n    color: #542c0f;\n    text-decoration: none;\n}\n\n.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active {\n    border: 1px solid #eccf8e;\n    background: #f6ebba url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGQCAYAAABvWArbAAAARklEQVQ4je3PsQnAMBBD0S9l/8kyTFIaDDkXBkMgA5ig5iEdXCHafZYBQgi/5ekXrlmFpQNLxmDMTOv2rrU+kHYYE0L4YgB9ewvfYTVHjwAAAABJRU5ErkJggg==\") 50% 50% repeat-x;\n    font-weight: bold;\n    color: #542c0f;\n}\n\n.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited {\n    color: #542c0f;\n    text-decoration: none;\n}\n\n.ui-widget :active {\n    outline: none;\n}\n\n/* Interaction Cues\n----------------------------------*/\n.ui-state-highlight, .ui-widget-content .ui-state-highlight, .ui-widget-header .ui-state-highlight {\n    border: 1px solid #eccf8e;\n    background: #f6ebba url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAjElEQVRYhe2UOwqAMBAFx2DlMbz/kSS3MIUIWij4aZ/gK952YZohu0y3zNPGOWur3Kcfxsf7D16c5YBD0FUOoDjLAdeKHeXWVi9BRzk4f9BVDqA4y8HrBt3k0sEveDqo8nRQ5emgytNBlaeDKk8HVZ4OqjwdVHk6qPJ0UOXpoMrTQZWngypPB1Vu38EdG7NcOPXFHAMAAAAASUVORK5CYII=\") 50% 50% repeat;\n    color: #542c0f;\n}\n\n.ui-state-highlight a, .ui-widget-content .ui-state-highlight a, .ui-widget-header .ui-state-highlight a {\n    color: #542c0f;\n}\n\n.ui-state-error, .ui-widget-content .ui-state-error, .ui-widget-header .ui-state-error {\n    border: 1px solid #cd0a0a;\n    background: #f6ebba url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABkCAYAAABHLFpgAAAASElEQVQYld2PMQ6DUBTDbP/7X4grde/6GACpjN0QS+QkyhC+n20CeI3MQChJJ4GEka7LEtkiRsJF2llw0G02SP5k0oxPOP2P7E3MCpW4kdm7AAAAAElFTkSuQmCC\") 50% bottom repeat-x;\n    color: #cd0a0a;\n}\n\n.ui-state-error a, .ui-widget-content .ui-state-error a, .ui-widget-header .ui-state-error a {\n    color: #cd0a0a;\n}\n\n.ui-state-error-text, .ui-widget-content .ui-state-error-text, .ui-widget-header .ui-state-error-text {\n    color: #cd0a0a;\n}\n\n.ui-priority-primary, .ui-widget-content .ui-priority-primary, .ui-widget-header .ui-priority-primary {\n    font-weight: bold;\n}\n\n.ui-priority-secondary, .ui-widget-content .ui-priority-secondary, .ui-widget-header .ui-priority-secondary {\n    opacity: .7;\n    filter: Alpha(Opacity = 70);\n    font-weight: normal;\n}\n\n.ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled {\n    opacity: .35;\n    filter: Alpha(Opacity = 35);\n    background-image: none;\n}\n\n/* Icons\n----------------------------------*/\n\n/* states and images */\n.ui-icon {\n    width: 16px;\n    height: 16px;\n}\n\n.ui-state-error .ui-icon, .ui-state-error-text .ui-icon {\n    background-image: url(\"data:image/png;base64,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\");\n}\n\n.ui-icon, .ui-widget-content .ui-icon, .ui-widget-header .ui-icon, .ui-state-default .ui-icon, .ui-state-hover .ui-icon, .ui-state-focus .ui-icon, .ui-state-active .ui-icon, .ui-state-highlight .ui-icon {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAAGvTnpvAAAA7VBMVEVULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxwjo40AAAATnRSTlMAGBAyBAhQv4OZLiJUcEBmYBoSzQwgPBZCSEoeWiYwUiyFNIeBw2rJz8c4RBy9uXyrtaWNqa2zKP2fJO8KBgKPo2KVoa9s351GPm5+kWho0kj9AAATX0lEQVR4nO1dC2PbthEGyUpaqJii/JgbZ3bTLNmyJns/Oi1bM7vp0q7r/f+fM+JxwOEAkNTTSoxPlqHD83AE7gAQBIUYBHSfQv0XnbsJgH02A3g5ibVzDFNtlkPI1VjIuOUa8eMclOLS1uRSPBETURnOrkbmID9T9fuPyu+cSGYYKya5efeddN9TRS1H8eD4kDjrPutBpptt2apkiqX57A4gfloj7ua9AXMQ3dWvNs8n7NCwZk6bqYSg1CgNsaCBHDAluMQjcihEWBNYSxamUYNMs15KmwMUKhm0S5UBwMQFjcqxelSYskHBtLC26X7/eWQtVB1MaWXzF1OrUyhLgOrFiBwalDwg6+tigfzbnNbM40UlTrrO3clTftcuX7jyY9gkv81RVWI9K0OxNa8Hruw+EFctu6xaqDhCGkjQ2hyMitiXKyR+7xSqx6u6AitlpI3wrBj5OSo5xv8ZShoq5VZE+p/hb/OVzuPHyHGXQLoug9b4af/OzArAqtlvq8PidqZSflOYigVIpTZ33192wQ1jHVXLgjWWeZdAfhn3UteqH43NI9EGSjns7CJ//g8h6o6++UrLBTrOZJUkhy4NxDNAblZld53kJZl34z4jE5cB0HbA5RHnzg9Txud28wwG4aS1pwzKH7t/IyxlEvW2XVQLcf0vyeCWfL9j39vk95iA1alinhtmcHDr34ti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\");\n}\n\n/* positioning */\n.ui-icon-carat-1-n {\n    background-position: 0 0;\n}\n\n.ui-icon-carat-1-ne {\n    background-position: -16px 0;\n}\n\n.ui-icon-carat-1-e {\n    background-position: -32px 0;\n}\n\n.ui-icon-carat-1-se {\n    background-position: -48px 0;\n}\n\n.ui-icon-carat-1-s {\n    background-position: -64px 0;\n}\n\n.ui-icon-carat-1-sw {\n    background-position: -80px 0;\n}\n\n.ui-icon-carat-1-w {\n    background-position: -96px 0;\n}\n\n.ui-icon-carat-1-nw {\n    background-position: -112px 0;\n}\n\n.ui-icon-carat-2-n-s {\n    background-position: -128px 0;\n}\n\n.ui-icon-carat-2-e-w {\n    background-position: -144px 0;\n}\n\n.ui-icon-triangle-1-n {\n    background-position: 0 -16px;\n}\n\n.ui-icon-triangle-1-ne {\n    background-position: -16px -16px;\n}\n\n.ui-icon-triangle-1-e {\n    background-position: -32px -16px;\n}\n\n.ui-icon-triangle-1-se {\n    background-position: -48px -16px;\n}\n\n.ui-icon-triangle-1-s {\n    background-position: -64px -16px;\n}\n\n.ui-icon-triangle-1-sw {\n    background-position: -80px -16px;\n}\n\n.ui-icon-triangle-1-w {\n    background-position: -96px -16px;\n}\n\n.ui-icon-triangle-1-nw {\n    background-position: -112px -16px;\n}\n\n.ui-icon-triangle-2-n-s {\n    background-position: -128px -16px;\n}\n\n.ui-icon-triangle-2-e-w {\n    background-position: -144px -16px;\n}\n\n.ui-icon-arrow-1-n {\n    background-position: 0 -32px;\n}\n\n.ui-icon-arrow-1-ne {\n    background-position: -16px -32px;\n}\n\n.ui-icon-arrow-1-e {\n    background-position: -32px -32px;\n}\n\n.ui-icon-arrow-1-se {\n    background-position: -48px -32px;\n}\n\n.ui-icon-arrow-1-s {\n    background-position: -64px -32px;\n}\n\n.ui-icon-arrow-1-sw {\n    background-position: -80px -32px;\n}\n\n.ui-icon-arrow-1-w {\n    background-position: -96px -32px;\n}\n\n.ui-icon-arrow-1-nw {\n    background-position: -112px -32px;\n}\n\n.ui-icon-arrow-2-n-s {\n    background-position: -128px -32px;\n}\n\n.ui-icon-arrow-2-ne-sw {\n    background-position: -144px -32px;\n}\n\n.ui-icon-arrow-2-e-w {\n    background-position: -160px -32px;\n}\n\n.ui-icon-arrow-2-se-nw {\n    background-position: -176px -32px;\n}\n\n.ui-icon-arrowstop-1-n {\n    background-position: -192px -32px;\n}\n\n.ui-icon-arrowstop-1-e {\n    background-position: -208px -32px;\n}\n\n.ui-icon-arrowstop-1-s {\n    background-position: -224px -32px;\n}\n\n.ui-icon-arrowstop-1-w {\n    background-position: -240px -32px;\n}\n\n.ui-icon-arrowthick-1-n {\n    background-position: 0 -48px;\n}\n\n.ui-icon-arrowthick-1-ne {\n    background-position: -16px -48px;\n}\n\n.ui-icon-arrowthick-1-e {\n    background-position: -32px -48px;\n}\n\n.ui-icon-arrowthick-1-se {\n    background-position: -48px -48px;\n}\n\n.ui-icon-arrowthick-1-s {\n    background-position: -64px -48px;\n}\n\n.ui-icon-arrowthick-1-sw {\n    background-position: -80px -48px;\n}\n\n.ui-icon-arrowthick-1-w {\n    background-position: -96px -48px;\n}\n\n.ui-icon-arrowthick-1-nw {\n    background-position: -112px -48px;\n}\n\n.ui-icon-arrowthick-2-n-s {\n    background-position: -128px -48px;\n}\n\n.ui-icon-arrowthick-2-ne-sw {\n    background-position: -144px -48px;\n}\n\n.ui-icon-arrowthick-2-e-w {\n    background-position: -160px -48px;\n}\n\n.ui-icon-arrowthick-2-se-nw {\n    background-position: -176px -48px;\n}\n\n.ui-icon-arrowthickstop-1-n {\n    background-position: -192px -48px;\n}\n\n.ui-icon-arrowthickstop-1-e {\n    background-position: -208px -48px;\n}\n\n.ui-icon-arrowthickstop-1-s {\n    background-position: -224px -48px;\n}\n\n.ui-icon-arrowthickstop-1-w {\n    background-position: -240px -48px;\n}\n\n.ui-icon-arrowreturnthick-1-w {\n    background-position: 0 -64px;\n}\n\n.ui-icon-arrowreturnthick-1-n {\n    background-position: -16px -64px;\n}\n\n.ui-icon-arrowreturnthick-1-e {\n    background-position: -32px -64px;\n}\n\n.ui-icon-arrowreturnthick-1-s {\n    background-position: -48px -64px;\n}\n\n.ui-icon-arrowreturn-1-w {\n    background-position: -64px -64px;\n}\n\n.ui-icon-arrowreturn-1-n {\n    background-position: -80px -64px;\n}\n\n.ui-icon-arrowreturn-1-e {\n    background-position: -96px -64px;\n}\n\n.ui-icon-arrowreturn-1-s {\n    background-position: -112px -64px;\n}\n\n.ui-icon-arrowrefresh-1-w {\n    background-position: -128px -64px;\n}\n\n.ui-icon-arrowrefresh-1-n {\n    background-position: -144px -64px;\n}\n\n.ui-icon-arrowrefresh-1-e {\n    background-position: -160px -64px;\n}\n\n.ui-icon-arrowrefresh-1-s {\n    background-position: -176px -64px;\n}\n\n.ui-icon-arrow-4 {\n    background-position: 0 -80px;\n}\n\n.ui-icon-arrow-4-diag {\n    background-position: -16px -80px;\n}\n\n.ui-icon-extlink {\n    background-position: -32px -80px;\n}\n\n.ui-icon-newwin {\n    background-position: -48px -80px;\n}\n\n.ui-icon-refresh {\n    background-position: -64px -80px;\n}\n\n.ui-icon-shuffle {\n    background-position: -80px -80px;\n}\n\n.ui-icon-transfer-e-w {\n    background-position: -96px -80px;\n}\n\n.ui-icon-transferthick-e-w {\n    background-position: -112px -80px;\n}\n\n.ui-icon-folder-collapsed {\n    background-position: 0 -96px;\n}\n\n.ui-icon-folder-open {\n    background-position: -16px -96px;\n}\n\n.ui-icon-document {\n    background-position: -32px -96px;\n}\n\n.ui-icon-document-b {\n    background-position: -48px -96px;\n}\n\n.ui-icon-note {\n    background-position: -64px -96px;\n}\n\n.ui-icon-mail-closed {\n    background-position: -80px -96px;\n}\n\n.ui-icon-mail-open {\n    background-position: -96px -96px;\n}\n\n.ui-icon-suitcase {\n    background-position: -112px -96px;\n}\n\n.ui-icon-comment {\n    background-position: -128px -96px;\n}\n\n.ui-icon-person {\n    background-position: -144px -96px;\n}\n\n.ui-icon-print {\n    background-position: -160px -96px;\n}\n\n.ui-icon-trash {\n    background-position: -176px -96px;\n}\n\n.ui-icon-locked {\n    background-position: -192px -96px;\n}\n\n.ui-icon-unlocked {\n    background-position: -208px -96px;\n}\n\n.ui-icon-bookmark {\n    background-position: -224px -96px;\n}\n\n.ui-icon-tag {\n    background-position: -240px -96px;\n}\n\n.ui-icon-home {\n    background-position: 0 -112px;\n}\n\n.ui-icon-flag {\n    background-position: -16px -112px;\n}\n\n.ui-icon-calendar {\n    background-position: -32px -112px;\n}\n\n.ui-icon-cart {\n    background-position: -48px -112px;\n}\n\n.ui-icon-pencil {\n    background-position: -64px -112px;\n}\n\n.ui-icon-clock {\n    background-position: -80px -112px;\n}\n\n.ui-icon-disk {\n    background-position: -96px -112px;\n}\n\n.ui-icon-calculator {\n    background-position: -112px -112px;\n}\n\n.ui-icon-zoomin {\n    background-position: -128px -112px;\n}\n\n.ui-icon-zoomout {\n    background-position: -144px -112px;\n}\n\n.ui-icon-search {\n    background-position: -160px -112px;\n}\n\n.ui-icon-wrench {\n    background-position: -176px -112px;\n}\n\n.ui-icon-gear {\n    background-position: -192px -112px;\n}\n\n.ui-icon-heart {\n    background-position: -208px -112px;\n}\n\n.ui-icon-star {\n    background-position: -224px -112px;\n}\n\n.ui-icon-link {\n    background-position: -240px -112px;\n}\n\n.ui-icon-cancel {\n    background-position: 0 -128px;\n}\n\n.ui-icon-plus {\n    background-position: -16px -128px;\n}\n\n.ui-icon-plusthick {\n    background-position: -32px -128px;\n}\n\n.ui-icon-minus {\n    background-position: -48px -128px;\n}\n\n.ui-icon-minusthick {\n    background-position: -64px -128px;\n}\n\n.ui-icon-close {\n    background-position: -80px -128px;\n}\n\n.ui-icon-closethick {\n    background-position: -96px -128px;\n}\n\n.ui-icon-key {\n    background-position: -112px -128px;\n}\n\n.ui-icon-lightbulb {\n    background-position: -128px -128px;\n}\n\n.ui-icon-scissors {\n    background-position: -144px -128px;\n}\n\n.ui-icon-clipboard {\n    background-position: -160px -128px;\n}\n\n.ui-icon-copy {\n    background-position: -176px -128px;\n}\n\n.ui-icon-contact {\n    background-position: -192px -128px;\n}\n\n.ui-icon-image {\n    background-position: -208px -128px;\n}\n\n.ui-icon-video {\n    background-position: -224px -128px;\n}\n\n.ui-icon-script {\n    background-position: -240px -128px;\n}\n\n.ui-icon-alert {\n    background-position: 0 -144px;\n}\n\n.ui-icon-info {\n    background-position: -16px -144px;\n}\n\n.ui-icon-notice {\n    background-position: -32px -144px;\n}\n\n.ui-icon-help {\n    background-position: -48px -144px;\n}\n\n.ui-icon-check {\n    background-position: -64px -144px;\n}\n\n.ui-icon-bullet {\n    background-position: -80px -144px;\n}\n\n.ui-icon-radio-off {\n    background-position: -96px -144px;\n}\n\n.ui-icon-radio-on {\n    background-position: -112px -144px;\n}\n\n.ui-icon-pin-w {\n    background-position: -128px -144px;\n}\n\n.ui-icon-pin-s {\n    background-position: -144px -144px;\n}\n\n.ui-icon-play {\n    background-position: 0 -160px;\n}\n\n.ui-icon-pause {\n    background-position: -16px -160px;\n}\n\n.ui-icon-seek-next {\n    background-position: -32px -160px;\n}\n\n.ui-icon-seek-prev {\n    background-position: -48px -160px;\n}\n\n.ui-icon-seek-end {\n    background-position: -64px -160px;\n}\n\n.ui-icon-seek-start {\n    background-position: -80px -160px;\n}\n\n/* ui-icon-seek-first is deprecated, use ui-icon-seek-start instead */\n.ui-icon-seek-first {\n    background-position: -80px -160px;\n}\n\n.ui-icon-stop {\n    background-position: -96px -160px;\n}\n\n.ui-icon-eject {\n    background-position: -112px -160px;\n}\n\n.ui-icon-volume-off {\n    background-position: -128px -160px;\n}\n\n.ui-icon-volume-on {\n    background-position: -144px -160px;\n}\n\n.ui-icon-power {\n    background-position: 0 -176px;\n}\n\n.ui-icon-signal-diag {\n    background-position: -16px -176px;\n}\n\n.ui-icon-signal {\n    background-position: -32px -176px;\n}\n\n.ui-icon-battery-0 {\n    background-position: -48px -176px;\n}\n\n.ui-icon-battery-1 {\n    background-position: -64px -176px;\n}\n\n.ui-icon-battery-2 {\n    background-position: -80px -176px;\n}\n\n.ui-icon-battery-3 {\n    background-position: -96px -176px;\n}\n\n.ui-icon-circle-plus {\n    background-position: 0 -192px;\n}\n\n.ui-icon-circle-minus {\n    background-position: -16px -192px;\n}\n\n.ui-icon-circle-close {\n    background-position: -32px -192px;\n}\n\n.ui-icon-circle-triangle-e {\n    background-position: -48px -192px;\n}\n\n.ui-icon-circle-triangle-s {\n    background-position: -64px -192px;\n}\n\n.ui-icon-circle-triangle-w {\n    background-position: -80px -192px;\n}\n\n.ui-icon-circle-triangle-n {\n    background-position: -96px -192px;\n}\n\n.ui-icon-circle-arrow-e {\n    background-position: -112px -192px;\n}\n\n.ui-icon-circle-arrow-s {\n    background-position: -128px -192px;\n}\n\n.ui-icon-circle-arrow-w {\n    background-position: -144px -192px;\n}\n\n.ui-icon-circle-arrow-n {\n    background-position: -160px -192px;\n}\n\n.ui-icon-circle-zoomin {\n    background-position: -176px -192px;\n}\n\n.ui-icon-circle-zoomout {\n    background-position: -192px -192px;\n}\n\n.ui-icon-circle-check {\n    background-position: -208px -192px;\n}\n\n.ui-icon-circlesmall-plus {\n    background-position: 0 -208px;\n}\n\n.ui-icon-circlesmall-minus {\n    background-position: -16px -208px;\n}\n\n.ui-icon-circlesmall-close {\n    background-position: -32px -208px;\n}\n\n.ui-icon-squaresmall-plus {\n    background-position: -48px -208px;\n}\n\n.ui-icon-squaresmall-minus {\n    background-position: -64px -208px;\n}\n\n.ui-icon-squaresmall-close {\n    background-position: -80px -208px;\n}\n\n.ui-icon-grip-dotted-vertical {\n    background-position: 0 -224px;\n}\n\n.ui-icon-grip-dotted-horizontal {\n    background-position: -16px -224px;\n}\n\n.ui-icon-grip-solid-vertical {\n    background-position: -32px -224px;\n}\n\n.ui-icon-grip-solid-horizontal {\n    background-position: -48px -224px;\n}\n\n.ui-icon-gripsmall-diagonal-se {\n    background-position: -64px -224px;\n}\n\n.ui-icon-grip-diagonal-se {\n    background-position: -80px -224px;\n}\n\n/* Misc visuals\n----------------------------------*/\n\n/* Corner radius */\n.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {\n    -moz-border-radius-topleft: 0px;\n    -webkit-border-top-left-radius: 0px;\n    -khtml-border-top-left-radius: 0px;\n    border-top-left-radius: 0px;\n}\n\n.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {\n    -moz-border-radius-topright: 0px;\n    -webkit-border-top-right-radius: 0px;\n    -khtml-border-top-right-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {\n    -moz-border-radius-bottomleft: 0px;\n    -webkit-border-bottom-left-radius: 0px;\n    -khtml-border-bottom-left-radius: 0px;\n    border-bottom-left-radius: 0px;\n}\n\n.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {\n    -moz-border-radius-bottomright: 0px;\n    -webkit-border-bottom-right-radius: 0px;\n    -khtml-border-bottom-right-radius: 0px;\n    border-bottom-right-radius: 0px;\n}\n\n/* Overlays */\n.ui-widget-overlay {\n    background: #aaaaaa url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAh0lEQVRYhe2UsQ3AIAwEL0zC/qMwhTdJiiCRpH2kfPHu0DUnbN0xxjiZU1U8p/f+ev/Bm7MccAu6ygE0ZzlgrdhRrqqWoKMczB90lQNoznLwuUE3uXRwB08HVZ4OqjwdVHk6qPJ0UOXpoMrTQZWngypPB1WeDqo8HVR5OqjydFDl6aDK7Tt4AWXCW8vnTP6PAAAAAElFTkSuQmCC\") 50% 50% repeat;\n    opacity: .30;\n    filter: Alpha(Opacity = 30);\n}\n\n.ui-widget-shadow {\n    margin: -8px 0 0 -8px;\n    padding: 8px;\n    background: #aaaaaa url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD0ZHJ6AAAAe0lEQVRoge3OMQHAIBAAMcC/kjdZJHTI0A4XBdkz86wfO18H3hRUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUF8O8A8WdY6opAAAAAElFTkSuQmCC\") 50% 50% repeat-x;\n    opacity: .30;\n    filter: Alpha(Opacity = 30);\n    -moz-border-radius: 8px;\n    -khtml-border-radius: 8px;\n    -webkit-border-radius: 8px;\n    border-radius: 8px;\n}\n\n/*!\n* jQuery UI Resizable 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Resizable#theming\n*/\n.ui-resizable {\n    position: relative;\n}\n\n.ui-resizable-handle {\n    position: absolute;\n    font-size: 0.1px;\n    display: block;\n}\n\n.ui-resizable-disabled .ui-resizable-handle, .ui-resizable-autohide .ui-resizable-handle {\n    display: none;\n}\n\n.ui-resizable-n {\n    cursor: n-resize;\n    height: 7px;\n    width: 100%;\n    top: -5px;\n    left: 0;\n}\n\n.ui-resizable-s {\n    cursor: s-resize;\n    height: 7px;\n    width: 100%;\n    bottom: -5px;\n    left: 0;\n}\n\n.ui-resizable-e {\n    cursor: e-resize;\n    width: 7px;\n    right: -5px;\n    top: 0;\n    height: 100%;\n}\n\n.ui-resizable-w {\n    cursor: w-resize;\n    width: 7px;\n    left: -5px;\n    top: 0;\n    height: 100%;\n}\n\n.ui-resizable-se {\n    cursor: se-resize;\n    width: 12px;\n    height: 12px;\n    right: 1px;\n    bottom: 1px;\n}\n\n.ui-resizable-sw {\n    cursor: sw-resize;\n    width: 9px;\n    height: 9px;\n    left: -5px;\n    bottom: -5px;\n}\n\n.ui-resizable-nw {\n    cursor: nw-resize;\n    width: 9px;\n    height: 9px;\n    left: -5px;\n    top: -5px;\n}\n\n.ui-resizable-ne {\n    cursor: ne-resize;\n    width: 9px;\n    height: 9px;\n    right: -5px;\n    top: -5px;\n}\n\n/*!\n* jQuery UI Button 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Button#theming\n*/\n.ui-button {\n    display: inline-block;\n    position: relative;\n    padding: 0;\n    margin-right: .1em;\n    text-decoration: none !important;\n    cursor: pointer;\n    text-align: center;\n    zoom: 1;\n    overflow: visible;\n}\n\n/* the overflow property removes extra width in IE */\n.ui-button-icon-only {\n    width: 2.2em;\n}\n\n/* to make room for the icon, a width needs to be set here */\nbutton.ui-button-icon-only {\n    width: 2.4em;\n}\n\n/* button elements seem to need a little more width */\n.ui-button-icons-only {\n    width: 3.4em;\n}\n\nbutton.ui-button-icons-only {\n    width: 3.7em;\n}\n\n/*button text element */\n.ui-button .ui-button-text {\n    display: block;\n    line-height: 1.4;\n}\n\n.ui-button-text-only .ui-button-text {\n    padding: .4em 1em;\n}\n\n.ui-button-icon-only .ui-button-text, .ui-button-icons-only .ui-button-text {\n    padding: .4em;\n    text-indent: -9999999px;\n}\n\n.ui-button-text-icon-primary .ui-button-text, .ui-button-text-icons .ui-button-text {\n    padding: .4em 1em .4em 2.1em;\n}\n\n.ui-button-text-icon-secondary .ui-button-text, .ui-button-text-icons .ui-button-text {\n    padding: .4em 2.1em .4em 1em;\n}\n\n.ui-button-text-icons .ui-button-text {\n    padding-left: 2.1em;\n    padding-right: 2.1em;\n}\n\n/* no icon support for input elements, provide padding by default */\ninput.ui-button {\n    padding: .4em 1em;\n}\n\n/*button icon element(s) */\n.ui-button-icon-only .ui-icon, .ui-button-text-icon-primary .ui-icon, .ui-button-text-icon-secondary .ui-icon, .ui-button-text-icons .ui-icon, .ui-button-icons-only .ui-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -8px;\n}\n\n.ui-button-icon-only .ui-icon {\n    left: 50%;\n    margin-left: -8px;\n}\n\n.ui-button-text-icon-primary .ui-button-icon-primary, .ui-button-text-icons .ui-button-icon-primary, .ui-button-icons-only .ui-button-icon-primary {\n    left: .5em;\n}\n\n.ui-button-text-icon-secondary .ui-button-icon-secondary, .ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary {\n    right: .5em;\n}\n\n.ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary {\n    right: .5em;\n}\n\n/*button sets*/\n.ui-buttonset {\n    margin-right: 7px;\n}\n\n.ui-buttonset .ui-button {\n    margin-left: 0;\n    margin-right: -.3em;\n}\n\n/* workarounds */\nbutton.ui-button::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n\n/* reset extra padding in Firefox */\n/*!\n * jQuery UI Dialog 1.8.21\n *\n * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n * Dual licensed under the MIT or GPL Version 2 licenses.\n * http://jquery.org/license\n *\n * http://docs.jquery.com/UI/Dialog#theming\n */\n.ui-dialog {\n    position: absolute;\n    padding: .2em;\n    width: 300px;\n    overflow: hidden;\n}\n\n.ui-dialog .ui-dialog-titlebar {\n    padding: .4em 1em;\n    position: relative;\n}\n\n.ui-dialog .ui-dialog-title {\n    float: left;\n    margin: .1em 16px .1em 0;\n}\n\n.ui-dialog .ui-dialog-titlebar-close {\n    position: absolute;\n    right: .3em;\n    top: 50%;\n    width: 19px;\n    margin: -10px 0 0 0;\n    padding: 1px;\n    height: 18px;\n}\n\n.ui-dialog .ui-dialog-titlebar-close span {\n    display: block;\n    margin: 1px;\n}\n\n.ui-dialog .ui-dialog-titlebar-close:hover, .ui-dialog .ui-dialog-titlebar-close:focus {\n    padding: 0;\n}\n\n.ui-dialog .ui-dialog-content {\n    position: relative;\n    border: 0;\n    padding: .5em;\n    background: none;\n    overflow: auto;\n    zoom: 1;\n}\n\n.ui-dialog .ui-dialog-buttonpane {\n    text-align: left;\n    border-width: 1px 0 0 0;\n    background-image: none;\n    margin: .5em 0 0 0;\n    padding: .3em 1em .5em .4em;\n}\n\n.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset {\n    float: right;\n}\n\n.ui-dialog .ui-dialog-buttonpane button {\n    margin: .5em .4em .5em 0;\n    cursor: pointer;\n}\n\n.ui-dialog .ui-resizable-se {\n    width: 14px;\n    height: 14px;\n    right: 3px;\n    bottom: 3px;\n}\n\n.ui-draggable .ui-dialog-titlebar {\n    cursor: move;\n}\n\n/*!\n* jQuery UI Tabs 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Tabs#theming\n*/\n.ui-tabs {\n    position: relative;\n    padding: 0em;\n    zoom: 1;\n}\n\n/* position: relative prevents IE scroll bug (element with position: relative inside container with overflow: auto appear as \"fixed\") */\n.ui-tabs .ui-tabs-nav {\n    margin: 0;\n    padding: .2em .2em 0;\n}\n\n.ui-tabs .ui-tabs-nav li {\n    list-style: none;\n    float: left;\n    position: relative;\n    top: 1px;\n    margin: 0 .2em 1px 0;\n    border-bottom: 0 !important;\n    padding: 0;\n    white-space: nowrap;\n}\n\n.ui-tabs .ui-tabs-nav li a {\n    float: left;\n    padding: .2em 1em;\n    text-decoration: none;\n}\n\n.ui-tabs .ui-tabs-nav li.ui-tabs-active {\n    margin-bottom: 0;\n    padding-bottom: 1px;\n}\n\n.ui-tabs .ui-tabs-nav li.ui-tabs-active a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-tabs-loading a {\n    cursor: text;\n}\n\n.ui-tabs .ui-tabs-nav li a, .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-active a {\n    cursor: pointer;\n}\n\n/* first selector in group seems obsolete, but required to overcome bug in Opera applying cursor: text overall if defined elsewhere... */\n.ui-tabs .ui-tabs-panel {\n    display: block;\n    border-width: 0;\n    padding: 0em 0.1em;\n    background: none;\n}\n\n/*!\n* jQuery UI Progressbar 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Progressbar#theming\n*/\n.ui-progressbar {\n    height: 5px;\n    text-align: left;\n    overflow: hidden;\n}\n\n.ui-progressbar .ui-progressbar-value {\n    margin: -1px;\n    height: 100%;\n}");
  //    var LF = "";
  if(database.settings.smallFont.value) GM_addStyle("#SITRBoard {font-size:8pt}");
};
/***********************************************************************************************************************
 * ikariam
 **********************************************************************************************************************/

var ikariam = {
  _View                    : null,
  _Host                    : null,
  _Server                  : null,
  _ActionRequest           : null,
  _Units                   : null,
  _BuildingsList           : null,
  _AltBuildingsList        : null,
  _Nationality             : null,
  _GameVersion             : null,
  _TemplateView            : null,
  _currentCity             : null,
  url                      : function() {
    return 'http://' + this.Host() + '/index.php'
  },
  get mainView() {
    return unsafeWindow.ikariam.backgroundView.id
  },
  get boxViewParams() {
    if(unsafeWindow.ikariam.mainbox_x || unsafeWindow.ikariam.mainbox_y || unsafeWindow.ikariam.mainbox_z) {
      return {
        mainbox_x: unsafeWindow.ikariam.mainbox_x,
        mainbox_y: unsafeWindow.ikariam.mainbox_y,
        mainbox_z: unsafeWindow.ikariam.mainbox_z
      };
    }
    return {};
  },
  loadUrl                  : function(ajax, mainView, params) {
    mainView = mainView || ikariam.mainView;
    var paramList = {cityId: ikariam.CurrentCityId};
    if(ikariam.CurrentCityId !== params.cityId) {
      paramList.action = 'header';
      paramList.function = 'changeCurrentCity';
      paramList.actionRequest = unsafeWindow.ikariam.model.actionRequest;
      paramList.currentCityId = ikariam.CurrentCityId;
      paramList.oldView = ikariam.mainView

    }

    if(mainView !== undefined && mainView !== ikariam.mainView) {
      paramList.oldBackgroundView = ikariam.mainView;
      paramList.backgroundView = mainView;
      ajax = false;
    }
    $.extend(paramList, params);
    if(ajax) {
      gotoAjaxURL('?' + $.map(paramList,function(value, key) {
        return key + '=' + value;
      }).join('&'))
    } else {
      gotoURL(ikariam.url() + '?' + $.map(paramList,function(value, key) {
        return key + '=' + value;
      }).join('&'))
    }

    function gotoURL(url) {
      window.location.assign(url)
    }

    function gotoAjaxURL(url) {
      document.location = 'javascript:ajaxHandlerCall(' + JSON.stringify(url) + '); void(0);';
    }
  },
  Host                     : function() {
    if(this._Host == null) {
      this._Host = '';
      this._Host = document.location.host;
    }
    return this._Host;
  },
  Server                   : function(host) {
    if(this._Server == null) {
      if(host == undefined) {
        host = this.Host();
      }
      this._Server = '';
      var parts = host.split(".");
      var idx = 0;
      if(parts[0] == 'www') {
        idx++;
      }
      this._Server = parts[idx];
    }
    return this._Server;
  },
  Nationality              : function(host) {
    if(this._Nationality == null) {
      if(host == undefined) {
        host = this.Host();
      }
      this._Nationality = '';
      var parts = host.split(".");
      var idx = (parts[0] == 'www') ? 2 : 1;
      this._Nationality = parts[idx];
    }
    return this._Nationality;
  },
  getNextWineTick          : function(precision) {
    precision = precision || 1; // 1 for Mins, 2 for mins:secs
    if(precision == 1) {
      return 60 - new Date().getMinutes();
    } else {
      var secs = 3600 - (new Date().getMinutes() * 60) - new Date().getSeconds();
      var ret = Math.floor(secs / 60) + database.getGlobalData.getLocalisedString('minute') + ' ';
      ret += secs - (Math.floor(secs / 60) * 60) + database.getGlobalData.getLocalisedString('second');
      return ret;
    }
  },
  GameVersion              : function() {
    if(this._GameVersion == null) {
      this._GameVersion = $('span.version a span').text().split("v ")[1];
    }
    return this._GameVersion
  },
  get CurrentCityId() {
    return unsafeWindow.ikariam.backgroundView && unsafeWindow.ikariam.backgroundView.id === 'city' ? ikariam._currentCity || unsafeWindow.ikariam.model.relatedCityData[unsafeWindow.ikariam.model.relatedCityData.selectedCity].id : unsafeWindow.ikariam.model.relatedCityData[unsafeWindow.ikariam.model.relatedCityData.selectedCity].id
  },
  get viewIsCity() {
    return unsafeWindow.ikariam.backgroundView && unsafeWindow.ikariam.backgroundView.id === 'city'
  },
  get viewIsIsland() {
    return unsafeWindow.ikariam.backgroundView && unsafeWindow.ikariam.backgroundView.id === 'island'
  },
  get viewIsWorld() {
    return unsafeWindow.ikariam.backgroundView && unsafeWindow.ikariam.backgroundView.id === 'worldmap_iso'
  },
  get getCurrentCity() {
    return database.cities[ikariam.CurrentCityId];
  },
  get getCapital() {
    for(var c in database.cities) {
      if(database.cities[c].isCapital) {
        return database.cities[c];
      }
    }
    return false;
  },
  get CurrentTemplateView() {
    try {
      this._CurrentTemplateView = unsafeWindow.ikariam.templateView.id;
    } catch(e) {
      this._CurrentTemplateView = null
    }
    return this._CurrentTemplateView;
  },
  getLocalizationStrings   : function() {
    var localStrings = unsafeWindow.LocalizationStrings;
    if(!localStrings) {
      $('script').each(function(index, script) {
        var match = /LocalizationStrings = JSON.parse\('(.*)'\);/.exec(script.innerHTML);
        if(match) {
          localStrings = JSON.parse(match[1]);
          return false;
        }
      });
    }
    var local = $.extend({}, localStrings);
    //merge ikariams time units
    $.extend(local, local['timeunits']['short']);
    //remove extra objects
    delete local['warnings'];
    delete local['timeunits'];
    $.each(local, function(name, value) {
      database.getGlobalData.addLocalisedString(name.toLowerCase(), value)
    });

    local = null;
    database.getGlobalData.addLocalisedString('Military', $('#js_GlobalMenu_military').find('span').text());
    database.getGlobalData.addLocalisedString('Options', $('#GF_toolbar').find('ul li.options a').attr('title'));
    database.getGlobalData.addLocalisedString('Economy', $('#js_GlobalMenu_cities').find('span').text());
    database.getGlobalData.addLocalisedString('Research', $('#js_GlobalMenu_research').find('span').text());
  },
  setupEventHandlers       : function() {
    events('ajaxResponse').sub(function(response) {
      var view, html, data, template;
      var len = response.length;
      var oldCity = this._currentCity;
      while(len) {
        len--;
        switch(response[len][0]) {
          case 'updateGlobalData':
            this._currentCity = parseInt(response[len][1]["backgroundData"].id);
            var cityData = $.extend({}, response[len][1]["backgroundData"], response[len][1]["headerData"]);
            events('updateCityData').pub(this.CurrentCityId, $.extend({}, cityData));
            events('updateBuildingData').pub(this.CurrentCityId, cityData.position);
            break;
          case 'changeView':
            view = response[len][1][0];
            html = response[len][1][1];
            break;
          case 'updateTemplateData':
            template = response[len][1];
            if(unsafeWindow.ikariam.templateView) {
              if(unsafeWindow.ikariam.templateView.id == 'researchAdvisor') {
                view = unsafeWindow.ikariam.templateView.id
              }
            }
            break;
          case 'updateBackgroundData':
            oldCity = this.CurrentCityId;
            this._currentCity = parseInt(response[len][1].id);
            events('updateCityData').pub(this._currentCity, $.extend(true, {}, unsafeWindow.dataSetForView, response[len][1]));
            events('updateBuildingData').pub(this._currentCity, response[len][1].position);
            break;
        }
      }

      this.parseViewData(view, html, template);
      if(oldCity !== this.CurrentCityId) {
        events('cityChanged').pub(this.CurrentCityId)
      }
    }.bind(ikariam));
    //parse data on form submit and add it when submit success
    events('formSubmit').sub(function(form) {
      var formID = form.getAttribute('id');
      if(!ikariam[formID + 'Submitted'])return false;
      var formSubmission = (function formSubmit() {
        var data = ikariam[formID + 'Submitted']();
        return function formSubmitID(response) {
          var len = response.length;
          var feedback = 0;
          while(len) {
            len--;
            if(response[len][0] == 'provideFeedback')
              feedback = response[len][1][0].type;
          }
          if(feedback == 10) //success
            ikariam[formID + 'Submitted'](data);
          events('ajaxResponse').unsub(formSubmission);
        }
      })();
      events('ajaxResponse').sub(formSubmission)
    }.bind(ikariam));
    events(Constant.Events.CITYDATA_AVAILABLE).sub(ikariam.FetchAllTowns.bind(ikariam))
  },
  Init                     : function() {
    this.setupEventHandlers();
  },
  parseViewData            : function(view, html, tData) {
    if(this.getCurrentCity) {
      switch(view) {
        case 'finances':
          this.parseFinances($('#finances').find('table.table01 tr').slice(2).children('td'));
          break;
        case Constant.Buildings.TOWN_HALL:
          this.parseTownHall(tData);
          break;
        case 'militaryAdvisor':
          this.parseMilitaryAdvisor(html, tData);
          break;
        case 'cityMilitary':
          this.parseCityMilitary();
          this.parseMilitaryLocalization();
          break;
        case 'researchAdvisor':
          this.parseResearchAdvisor(tData);
          break;
        case Constant.Buildings.PALACE:
          this.parsePalace();
          break;
        case Constant.Buildings.ACADEMY:
          this.parseAcademy(tData);
          break;
        case 'culturalPossessions_assign':
          this.parseCulturalPossessions(html);
          break;
        case Constant.Buildings.MUSEUM:
          this.parseMuseum();
          break;
        case Constant.Buildings.TAVERN:
          this.parseTavern();
          break;
        case 'transport':
          //this.transportFormSubmitted();
          break;
        case Constant.Buildings.TEMPLE:
          this.parseTemple(tData);
          break;
        case Constant.Buildings.BARRACKS:
        case Constant.Buildings.SHIPYARD:
          this.parseBarracks(view, html, tData);
          break;
        case 'deployment':
          this.parseMilitaryTransport();
          break;
	      case 'premium':
		      this.parsePremium(view, html, tData)
		      break
      }
    }
  },
  parsePalace              : function() {
    var governmentType = $('#formOfRuleContent').find('td.government_pic img').attr('src').slice(16, -8);
    var changed = (database.getGlobalData.getGovernmentType != governmentType);
    database.getGlobalData.governmentType = governmentType;
    if(changed) events(Constant.Events.GLOBAL_UPDATED).pub({type: 'government'})
  },
  parseCulturalPossessions : function(html) {
    var allCulturalGoods = html.match(/iniValue\s:\s(\d*)/g);
    var changes = [];
    $.each(html.match(/goodscity_(\d*)/g), function(i) {
      var cityID = this.split('_')[1];
      var culturalGoods = parseInt(allCulturalGoods[i].split(' ').pop());
      var changed = (database.cities[cityID]._culturalGoods != culturalGoods);
      if(changed) {
        database.cities[cityID]._culturalGoods = culturalGoods;
        changes.push(cityID)
      }
    });
    if(changes.length) $.each(changes, function(idx, cityID) {
      events(Constant.Events.CITY_UPDATED).pub(cityID, {culturalGoods: true})
    });
    database.getGlobalData.addLocalisedString('Cultural Goods', $('#js_mainBoxHeaderTitle').text())
  },
  parseMuseum              : function() {
    var regText = $('#val_culturalGoodsDeposit').parent().text().match(/(\d+)/g);
    if(regText.length == 2) {
      var changed = ikariam.getCurrentCity.updateCulturalGoods(parseInt(regText[0]))
    }
    if(changed) events(Constant.Events.CITY_UPDATED).pub(ikariam.CurrentCityId, {culturalGoods: true})
  },
  parseTavern              : function() {
  },
  resTransportObject       : function() {
    return {id    : null,
      wood        : 0,
      wine        : 0,
      marble      : 0,
      glass       : 0,
      sulfur      : 0,
      targetCityId: 0,
      arrivalTime : 0,
      originCityId: 0,
      loadedTime  : 0,
      mission     : ''};
  },
  troopTransportObject     : function() {
    return {id    : null,
      troops      : {},
      targetCityId: 0,
      arrivalTime : 0,
      originCityId: 0,
      returnTime  : 0,
      mission     : ''};
  },
  parseBarracks            : function(view, html, tData) {
    var type = view == Constant.Buildings.BARRACKS ? 'army' : view == Constant.Buildings.SHIPYARD ? 'fleet' : false;
    var city = ikariam.getCurrentCity;
    var currentUnits = {};
    var i = 14;
    while(i--) {
      if(tData['js_barracksUnitUnitsAvailable' + (i - 1)]) {
        currentUnits[tData['js_barracksUnitClass' + (i - 1)]['class'].split(' ').pop()] = parseInt(tData['js_barracksUnitUnitsAvailable' + (i - 1)].text)
      }
    }
    var changes = city.military.updateUnits(currentUnits);

    var elem = $('#unitConstructionList');
    if(elem.length) {
      var tasks = [];
      tasks.push({
        units         : parseUnits(elem.find('> .army_wrapper .army')),
        completionTime: parseTime($('#buildCountDown').text()),
        type          : type
      });
      elem.find('div.constructionBlock').each(function() {
        tasks.push({
          units         : parseUnits($(this).find('> .army_wrapper .army')),
          completionTime: parseTime($(this).find('h4 > span').text()),
          type          : type
        })
      });
      changes = changes.concat(city.military.setTraining(tasks))
    }

    elem = null;
    if(changes.length) {
      events(Constant.Events.MILITARY_UPDATED).pub(city.getId, $.exclusive(changes))
    }

    function parseUnits(element) {
      var units = {};
      element.each(function() {
        units[Constant.unitIds[this.classList.toString().match(/(\d+)/g)]] = parseInt(this.nextElementSibling.textContent.match(/(\d+)/g))
      });
      return units;
    }

    function parseTime(timeText) {
      var completionTime = new Date();
      completionTime.setSeconds(completionTime.getSeconds() + (
      timeText.match(/(\d+)s/) ? parseInt(timeText.match(/(\d+)s/)[1]) : 0));
      completionTime.setMinutes(completionTime.getMinutes() + (
      timeText.match(/(\d+)m/) ? parseInt(timeText.match(/(\d+)m/)[1]) : 0));
      completionTime.setHours(completionTime.getHours() + (
      timeText.match(/(\d+)h/) ? parseInt(timeText.match(/(\d+)h/)[1]) : 0));
      completionTime.setDate(completionTime.getDate() + (
      timeText.match(/(\d+)D/) ? parseInt(timeText.match(/(\d+)D/)[1]) : 0));
      return completionTime.getTime();
    }
  },
  /**
   * First call without data will parse the transportform, seccond call will add the forms data to the database
   */
  transportFormSubmitted   : function(data) {
    try {
      if(!data) {
        var journeyTime = $('#journeyTime').text();
        var loadingTime = $('#loadingTime').text();
        var wood = parseInt($('#textfield_wood').val());
        var wine = parseInt($('#textfield_wine').val());
        var marble = parseInt($('#textfield_marble').val());
        var glass = parseInt($('#textfield_glass').val());
        var sulfur = parseInt($('#textfield_sulfur').val());
        var targetID = $('input[name=destinationCityId]').val();
        var ships = $('#transporterCount').val();
        var arrTime = new Date();
        var loadedTime = new Date();

        arrTime.setSeconds(arrTime.getSeconds() + (
        journeyTime.match(/(\d+)s/) ? parseInt(journeyTime.match(/(\d+)s/)[1]) : 0));
        arrTime.setMinutes(arrTime.getMinutes() + (
        journeyTime.match(/(\d+)m/) ? parseInt(journeyTime.match(/(\d+)m/)[1]) : 0));
        arrTime.setHours(arrTime.getHours() + (
        journeyTime.match(/(\d+)h/) ? parseInt(journeyTime.match(/(\d+)h/)[1]) : 0));
        arrTime.setDate(arrTime.getDate() + (
        journeyTime.match(/(\d+)D/) ? parseInt(journeyTime.match(/(\d+)D/)[1]) : 0));

        loadedTime.setSeconds(loadedTime.getSeconds() + (
        loadingTime.match(/(\d+)s/) ? parseInt(loadingTime.match(/(\d+)s/)[1]) : 0));
        loadedTime.setMinutes(loadedTime.getMinutes() + (
        loadingTime.match(/(\d+)m/) ? parseInt(loadingTime.match(/(\d+)m/)[1]) : 0));
        loadedTime.setHours(loadedTime.getHours() + (
        loadingTime.match(/(\d+)h/) ? parseInt(loadingTime.match(/(\d+)h/)[1]) : 0));
        loadedTime.setDate(loadedTime.getDate() + (
        loadingTime.match(/(\d+)D/) ? parseInt(loadingTime.match(/(\d+)D/)[1]) : 0));

        return new Movement('XXX-' + arrTime.getTime(), this.CurrentCityId, targetID, arrTime.getTime(), 'transport', loadedTime.getTime(), { wood: wood || 0, wine: wine || 0, marble: marble || 0, glass: glass || 0, sulfur: sulfur || 0}, undefined, ships)
      } else {
        database.getGlobalData.addFleetMovement(data);
        events(Constant.Events.MOVEMENTS_UPDATED).pub([data.getTargetCityId]);
        //events(Constant.Events.RESOURCES_UPDATED).pub(data.getOriginCityId)
      }
    } catch(e) {
      SITR.error('transportFormSubmitted', e);
    } finally {
    }
  },
  parseMilitaryTransport   : function(submit) {
    //$('ul.assignUnits li input.textfield')
    return false;
    submit = submit || false;
    var that = this;
    if(submit) {
      var journeyTime = $('#journeyTime').text();
      var returnTime = $('#returnTime').text();
      var targetID = $('input:[name=destinationCityId]').val();
      var troops = {};
      var mission = '';
      $('ul.assignUnits li input.textfield').each(function() {
        if(this.value !== 0) {
          troops[this.getAttribute('name').split('_').pop()] = parseInt(this.value)
        }
        if(mission === '') {
          mission = 'deploy' + this.getAttribute('name').match(/_(.*)_/)[1]
        }
      });
      var arrTime = new Date();
      var transport = this.troopTransportObject();
      transport.id = 'XXX-' + arrTime.getTime();
      transport.targetCityId = targetID;
      transport.originCityId = this.CurrentCityId;
      transport.mission = mission;
      transport.troops = troops;
      arrTime.setSeconds(arrTime.getSeconds() + (journeyTime.match(/(\d+)s/) ? parseInt(journeyTime.match(/(\d+)s/)[1]) : 0));
      arrTime.setMinutes(arrTime.getMinutes() + (journeyTime.match(/(\d+)m/) ? parseInt(journeyTime.match(/(\d+)m/)[1]) : 0));
      arrTime.setHours(arrTime.getHours() + (journeyTime.match(/(\d+)h/) ? parseInt(journeyTime.match(/(\d+)h/)[1]) : 0));
      arrTime.setDate(arrTime.getDate() + (journeyTime.match(/(\d+)D/) ? parseInt(journeyTime.match(/(\d+)D/)[1]) : 0));
      transport.arrivalTime = arrTime.getTime();
      arrTime = new Date();
      arrTime.setSeconds(arrTime.getSeconds() + (returnTime.match(/(\d+)s/) ? parseInt(returnTime.match(/(\d+)s/)[1]) : 0));
      arrTime.setMinutes(arrTime.getMinutes() + (returnTime.match(/(\d+)m/) ? parseInt(returnTime.match(/(\d+)m/)[1]) : 0));
      arrTime.setHours(arrTime.getHours() + (returnTime.match(/(\d+)h/) ? parseInt(returnTime.match(/(\d+)h/)[1]) : 0));
      arrTime.setDate(arrTime.getDate() + (returnTime.match(/(\d+)D/) ? parseInt(returnTime.match(/(\d+)D/)[1]) : 0));
      transport.returnTime = arrTime.getTime();
      database.getGlobalData.addFleetMovement(transport);
      render.toast('Updated: Movement added');
    } else {
      return true
    }
  },
  parseFinances            : function($elem) {
    var updateTime = $.now();

    for(var i = 1; i < database.getCityCount + 1; i++) {
      var city = database.cities[Object.keys(database.cities)[i - 1]];
      if(city != false) {
        var changed = city.updateIncome(parseInt($elem[(i * 4) - 3].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join('')));
        changed = city.updateExpenses(parseInt($elem[(i * 4) - 2].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''))) || changed;
      }
      if(changed) events(Constant.Events.CITY_UPDATED).pub(city.getId, {finances: true});
      //database.getGlobalData.SigmaIncome = parseInt($elem[(Object.keys(database.cities).length * 4) + 1].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''));
      //database.getGlobalData.SigmaExpenses = -1 * parseInt($elem[(Object.keys(database.cities).length * 4) + 2].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''));
    }
    var $breakdown = $('#finances').find('tbody tr.bottomLine td:last-child');
    database.getGlobalData.finance.armyCost = parseInt($breakdown[0].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''));
    database.getGlobalData.finance.fleetCost = parseInt($breakdown[1].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''));
    database.getGlobalData.finance.armySupply = parseInt($breakdown[2].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''));
    database.getGlobalData.finance.fleetSupply = parseInt($breakdown[3].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''));
    events('globalData').pub({finances: true})
  },
  parseResearchAdvisor     : function(data) {
    var changes = [];
    var research = JSON.parse(data['new_js_params'] || data['load_js'].params).currResearchType;
    $.each(research, function(name, Data) {
      var id = parseInt(Data.aHref.match(/researchId=([0-9]+)/i)[1]);
      var level = name.match(/\((\d+)\)/);
      var explored = level ? parseInt(level[1]) - 1 : (Data.liClass === 'explored' ? 1 : 0);
      var changed = database.getGlobalData.updateResearchTopic(id, explored);
      if(changed) changes.push({type: 'research_topic', subType: id});
      database.getGlobalData.addLocalisedString('research_' + id, name.split('(').shift())
    });
    //        if (Object.keys(database.getGlobalData.research.topics).length > 66) {
    //            database.getGlobalData.research.lastUpdate = $.now();
    //        }
    if(changes.length) events(Constant.Events.GLOBAL_UPDATED).pub(changes);
    database.getGlobalData.addLocalisedString('researchpoints', $('li.points').text().split(':')[0]);
  },
  parseAcademy             : function(data) {
    var city = ikariam.getCurrentCity;
    var changed = city.updateResearchers(parseInt(data.js_AcademySlider.slider.ini_value));
    if(changed)
      events(Constant.Events.CITY_UPDATED).pub(city.getId, {research: changed});
    //database.getGlobalData.addLocalisedString('scientists', $('#setScientists').find('.scientists').text().text().split(':')[0])
  },
  parseTownHall            : function(data) {
    var changes = {};
    var city = ikariam.getCurrentCity;
    var cultBon = parseInt(data['js_TownHallSatisfactionOverviewCultureBoniTreatyBonusValue'].text) || 0;
    var priests = parseInt(data['js_TownHallPopulationGraphPriestCount'].text) || 0;
    var researchers = parseInt(data['js_TownHallPopulationGraphScientistCount'].text) || 0;
    changes['culturalGoods'] = city.updateCulturalGoods(cultBon / 50);
    changes['priests'] = city.updatePriests(priests);
    changes['research'] = city.updateResearchers(researchers);

    events(Constant.Events.CITY_UPDATED).pub(ikariam.CurrentCityId, changes);
    //parseInt(data.js_TownHallSatisfactionOverviewWineBoniServeBonusValue.text)/60
    database.getGlobalData.addLocalisedString('Scientists', $('#js_TownHallPopulationGraphScientists').find('div.type img').attr('title'));
    database.getGlobalData.addLocalisedString('Priests', $('#js_TownHallPopulationGraphPriests').find('div.type img').attr('title'));
    database.getGlobalData.addLocalisedString('Citizens', $('#js_TownHallPopulationGraphCitizens').find('div.type img').attr('title'));
    database.getGlobalData.addLocalisedString('Satisfaction', $('#townHall').find('div.contentBox01h h3.header').get(2).textContent);
  },
  parseTemple              : function(data) {
    var priests = parseInt(data['js_TempleSlider']['slider']['ini_value']) || 0;
    var changed = ikariam.getCurrentCity.updatePriests(priests);
    events(Constant.Events.CITY_UPDATED).pub(ikariam.CurrentCityId, {priests: changed})
  },
  parseMilitaryAdvisor     : function(html, data) {
    try {
      var ownMovementIds = [];
      var move;
      for(var key in data) {
        var match = key.match(/^js_MilitaryMovementsEventRow(\d+)$/);
        if(match && Utils.existsIn(data[key]['class'], 'own')) {
          ownMovementIds.push(match[1])
        }
      }
      var changes = database.getGlobalData.clearFleetMovements();
      if(ownMovementIds.length) {
        $.each(ownMovementIds, function(idx, value) {
          var transport = new Movement(value);
          transport._id = parseInt(value);
          transport._arrivalTime = parseInt(data['js_MilitaryMovementsEventRow' + value + 'ArrivalTime'].countdown.enddate * 1000);
          transport._loadingTime = 0;
          transport._originCityId = parseInt(data['js_MilitaryMovementsEventRow' + value + 'OriginLink'].href.match(/cityId=(\d+)/)[1]);
          transport._targetCityId = parseInt(data['js_MilitaryMovementsEventRow' + value + 'TargetLink'].href.match(/cityId=(\d+)/)[1]);
          transport._mission = data['js_MilitaryMovementsEventRow' + value + 'MissionIcon']['class'].split(' ')[1];
          var status = data['js_MilitaryMovementsEventRow' + value + 'Mission']['class'];
          if(status) {
            if(Utils.existsIn(status, 'arrow_left_green')) {
              var t = transport._originCityId;
              transport._originCityId = transport._targetCityId;
              transport._targetCityId = t;
            }
          } else {
            transport._loadingTime = transport._arrivalTime;
            if(database.getCityFromId(transport._originCityId) && database.getCityFromId(transport._targetCityId)) {
              transport._arrivalTime += Utils.estimateTravelTime(database.getCityFromId(transport._originCityId).getCoordinates, database.getCityFromId(transport._targetCityId).getCoordinates);
            }
          }
          switch(transport._mission) {
            case 'trade':
            case 'transport':
              $.each(data['js_MilitaryMovementsEventRow' + value + 'UnitDetails']['appendElement'], function(index, item) {
                if(Utils.existsIn(item['class'], Constant.Resources.WOOD)) {
                  transport._resources.wood = parseInt(item.text);
                } else if(Utils.existsIn(item['class'], Constant.Resources.WINE)) {
                  transport._resources.wine = parseInt(item.text);
                } else if(Utils.existsIn(item['class'], Constant.Resources.MARBLE)) {
                  transport._resources.marble = parseInt(item.text);
                } else if(Utils.existsIn(item['class'], Constant.Resources.GLASS)) {
                  transport._resources.glass = parseInt(item.text);
                } else if(Utils.existsIn(item['class'], Constant.Resources.SULFUR)) {
                  transport._resources.sulfur = parseInt(item.text);
                }
              });
              break;
            case 'deployarmy':
            case 'deployfleet':
              transport._military = new MilitaryUnits();
              $.each(data['js_MilitaryMovementsEventRow' + value + 'UnitDetails'].appendElement, function(index, item) {
                $.each(Constant.UnitData, function findIsUnit(val, info) {
                  if(Utils.existsIn(item['class'], ' ' + val)) {
                    transport._military.setUnit(val, parseInt(item.text));
                    return false;
                  }
                });
              });
              break;
            //TODO: other military movements
            default:
              return true
          }
          database.getGlobalData.addFleetMovement(transport);
          changes.push(transport._targetCityId);
        });
      }
      if(changes.length) events(Constant.Events.MOVEMENTS_UPDATED).pub($.exclusive(changes))
    } catch(e) {
      SITR.error('parseMilitaryAdvisor', e);
    } finally {
    }

  },
  parseCityMilitary        : function() {
    try {
      var $elemArmy = $('#tabUnits').find('> div.contentBox01h td');
      var $elemShips = $('#tabShips').find('> div.contentBox01h td');

      var city = ikariam.getCurrentCity;
      var cityArmy = {};

      cityArmy[Constant.Military.SLINGER] = parseInt($elemArmy[4].innerHTML);
      cityArmy[Constant.Military.SWORDSMAN] = parseInt($elemArmy[3].innerHTML);
      cityArmy[Constant.Military.HOPLITE] = parseInt($elemArmy[0].innerHTML);
      cityArmy[Constant.Military.MARKSMAN] = parseInt($elemArmy[6].innerHTML);
      cityArmy[Constant.Military.MORTAR] = parseInt($elemArmy[9].innerHTML);
      cityArmy[Constant.Military.CATAPULT] = parseInt($elemArmy[8].innerHTML);
      cityArmy[Constant.Military.RAM] = parseInt($elemArmy[7].innerHTML);
      cityArmy[Constant.Military.STEAM_GIANT] = parseInt($elemArmy[1].innerHTML);
      cityArmy[Constant.Military.BALLOON_BOMBADIER] = parseInt($elemArmy[11].innerHTML);
      cityArmy[Constant.Military.COOK] = parseInt($elemArmy[12].innerHTML);
      cityArmy[Constant.Military.DOCTOR] = parseInt($elemArmy[13].innerHTML);
      cityArmy[Constant.Military.GYROCOPTER] = parseInt($elemArmy[10].innerHTML);
      cityArmy[Constant.Military.ARCHER] = parseInt($elemArmy[5].innerHTML);
      cityArmy[Constant.Military.SPEARMAN] = parseInt($elemArmy[2].innerHTML);

      cityArmy[Constant.Military.RAM_SHIP] = parseInt($elemShips[2].innerHTML);
      cityArmy[Constant.Military.FLAME_THROWER] = parseInt($elemShips[0].innerHTML);
      cityArmy[Constant.Military.SUBMARINE] = parseInt($elemShips[7].innerHTML);
      cityArmy[Constant.Military.BALLISTA_SHIP] = parseInt($elemShips[4].innerHTML);
      cityArmy[Constant.Military.CATAPULT_SHIP] = parseInt($elemShips[3].innerHTML);
      cityArmy[Constant.Military.MORTAR_SHIP] = parseInt($elemShips[5].innerHTML);
      cityArmy[Constant.Military.STEAM_RAM] = parseInt($elemShips[1].innerHTML);
      cityArmy[Constant.Military.ROCKET_SHIP] = parseInt($elemShips[6].innerHTML);
      cityArmy[Constant.Military.PADDLE_SPEEDBOAT] = parseInt($elemShips[8].innerHTML);
      cityArmy[Constant.Military.BALLOON_CARRIER] = parseInt($elemShips[9].innerHTML);
      cityArmy[Constant.Military.TENDER] = parseInt($elemShips[10].innerHTML);
      var changes = city.military.updateUnits(cityArmy);
      //events('dataUpdated').pub(ikariam.CurrentCityId, 'cityMilitary');
      $elemArmy = null;
      $elemShips = null;
      events(Constant.Events.MILITARY_UPDATED).pub(city.getId, changes)

    } catch(e) {
      SITR.error('parseCityMilitary', e);
    } finally {
    }
  },
  parseMilitaryLocalization: function() {
    var $elemA = $('#tabUnits').find('> div.contentBox01h th');
    var $elemS = $('#tabShips').find('> div.contentBox01h th');
    if(($elemA.length == 0) || ($elemS.length == 0)) {
      return false;
    }
    database.getGlobalData.addLocalisedString('phalanx', $elemA[0].getAttribute('title'));
    database.getGlobalData.addLocalisedString('steamgiant', $elemA[1].getAttribute('title'));
    database.getGlobalData.addLocalisedString('spearman', $elemA[2].getAttribute('title'));
    database.getGlobalData.addLocalisedString('swordsman', $elemA[3].getAttribute('title'));
    database.getGlobalData.addLocalisedString('slinger', $elemA[4].getAttribute('title'));
    database.getGlobalData.addLocalisedString('archer', $elemA[5].getAttribute('title'));
    database.getGlobalData.addLocalisedString('marksman', $elemA[6].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ram', $elemA[7].getAttribute('title'));
    database.getGlobalData.addLocalisedString('catapult', $elemA[8].getAttribute('title'));
    database.getGlobalData.addLocalisedString('mortar', $elemA[9].getAttribute('title'));
    database.getGlobalData.addLocalisedString('gyrocopter', $elemA[10].getAttribute('title'));
    database.getGlobalData.addLocalisedString('bombardier', $elemA[11].getAttribute('title'));
    database.getGlobalData.addLocalisedString('cook', $elemA[12].getAttribute('title'));
    database.getGlobalData.addLocalisedString('medic', $elemA[13].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ship_ram', $elemS[2].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ship_flamethrower', $elemS[0].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ship_steamboat', $elemS[1].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ship_ballista', $elemS[4].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ship_catapult', $elemS[3].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ship_mortar', $elemS[5].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ship_submarine', $elemS[7].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ship_paddlespeedship', $elemS[8].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ship_ballooncarrier', $elemS[9].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ship_tender', $elemS[10].getAttribute('title'));
    database.getGlobalData.addLocalisedString('ship_rocketship', $elemS[6].getAttribute('title'));
    $elemA = null;
    $elemS = null
  },
	parsePremium :function(view, html, tData){
		var changes =[];
		var features= [];
		$('#premiumOffers').find('table.table01 tbody > tr[class]:not([class=""])')
			.each(function(){
				var item = $(this).attr('class').split(' ').shift();
				if (Constant.PremiumData[item] !== undefined){
					features.push(item)
				}
			});
		$.each(features, function(index, val){
			var active = false;
			var endTime = 0;
			var continuous = false;
			var type = 0;
			active = $('#js_buy'+val+'ActiveTime').hasClass('green');
			if(active){
				endTime = parseInt($('#js_buy'+val+'Link').attr('href').split('typeUntil=').pop().split('&').shift()) - Constant.PremiumData[val].duration;
        if (isNaN(endTime)){
          var str = $('#js_buy'+val+'ActiveTime').text();
          var time = new Date();
          time.setSeconds(time.getSeconds() + (str.match(/(\d+)s/) ? parseInt(str.match(/(\d+)s/)[1]) : 0));
          time.setMinutes(time.getMinutes() + (str.match(/(\d+)m/) ? parseInt(str.match(/(\d+)m/)[1]) : 0));
          time.setHours(time.getHours() + (str.match(/(\d+)h/) ? parseInt(str.match(/(\d+)h/)[1]) : 0));
          time.setDate(time.getDate() + (str.match(/(\d+)D/) ? parseInt(str.match(/(\d+)D/)[1]) : 0));
          endTime = time.getTime()/1000
        }
				type = parseInt($('#js_buy'+val+'Link').attr('href').split('type=').pop().split('&').shift());
			  continuous = $('#empireViewExtendCheckbox'+type+'Img').hasClass('checked');
			}
			changes.push(database.getGlobalData.setPremiumFeature(val,endTime*1000,continuous))
		});
		events(Constant.Events.PREMIUM_UPDATED).pub(changes);
	},
  FetchAllTowns            : function() {
    var _relatedCityData = unsafeWindow.ikariam.model.relatedCityData;
    var _cityId = null;
    var city = null;
    var order = database.settings.cityOrder.value
    if (!order.length) order = []; //temporary
    if(_relatedCityData) {
      for(_cityId in _relatedCityData) {
        if(_cityId != 'selectedCity' && _cityId != 'additionalInfo') {
          var own = (_relatedCityData[_cityId]['relationship'] == 'ownCity');
          if(own) {
            if(database.cities[_relatedCityData[_cityId]['id']] == undefined) {
              (database.cities[_relatedCityData[_cityId]['id']] = database.addCity(_relatedCityData[_cityId]['id'])).init();
              city = database.cities[_relatedCityData[_cityId]['id']];
              city.updateTradeGoodID(parseInt(_relatedCityData[_cityId]['tradegood']));
              city.isOwn = own;
            }
            city = database.cities[_relatedCityData[_cityId]['id']];
            city.updateName(_relatedCityData[_cityId]['name']);
            var coords = _relatedCityData[_cityId]['coords'].match(/(\d+)/);
            city.updateCoordinates(coords[0], coords[1]);
            if($.inArray(city.getId, order) == -1) {
              order.push(city.getId);
            }
          }
        }
      }
      //remove deleted cities
      for(var cID in database.cities) {
        var ghost = true;
        for(_cityId in _relatedCityData) {
          if(_relatedCityData[_cityId]['id'] == cID || !database.cities[cID].isOwn) {
            ghost = false;
          }
        }
        if(ghost) {
          delete database.cities[cID]
        }
      }
    }
    database.settings.cityOrder.value = order;
  },
  get currentShips() {
    if(this.$freeTransporters == undefined) {
      this.$freeTransporters = $('#js_GlobalMenu_freeTransporters');
    }
    return parseInt(this.$freeTransporters.text())
  }
};

/***********************************************************************************************************************
 * Constants
 **********************************************************************************************************************/
var Constant = {
  PremiumData:{
    PremiumAccount:{
      type:15,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0,
      icon:''
    },
    ResourceBonus:{
      type:16,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:''
    },
    WineBonus:{
      type:14,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:''
    },
    MarbleBonus:{
      type:11,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:''
    },
    SulfurBonus:{
      type:12,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:''
    },
    CrystalBonus:{
      type:13,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:''
    },
    ResearchPointsBonus:{
      type:18,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:'skin/premium/b_premium_research.jpg'
    },
    ResearchPointsBonusExtremeLength:{
      type:0,
      duration:70 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:'skin/premium/b_premium_research_big.jpg'
    },
    SafecapacityBonus:{
      type:17,
      duration:7 * 24 * 60,
      cost:0,
      bonus:1,
      icon:'skin/premium/b_premium_safecapacity.jpg'
    },
    StoragecapacityBonus:{
      type:33,
      duration:7 * 24 * 60,
      cost:0,
      bonus:1,
      icon:'skin/premium/b_premium_storagecapacity.jpg'
    }
	},
	Premium:{
		PREMIUM_ACCOUNT:'PremiumAccount',
		RESOURCE_BONUS:'ResourceBonus',
		WINE_BONUS:'WineBonus',
		MARBLE_BONUS:'MarbleBonus',
		SULFUR_BONUS:'SulfurBonus',
		CRYSTAL_BONUS:'CrystalBonus',
		RESEARCH_POINTS_BONUS:'ResearchPointsBonus',
		RESEARCH_POINTS_BONUS_EXTREME_LENGTH:'ResearchPointsBonusExtremeLength',
		SAFECAPACITY_BONUS:'SafecapacityBonus',
		STORAGECAPACITY_BONUS:'StoragecapacityBonus',
	},
  Events      : {
    BUILDINGS_UPDATED: 'buildingsUpdated',
    GLOBAL_UPDATED   : 'globalDataUpdated',
    MOVEMENTS_UPDATED: 'movementsUpdated',
    RESOURCES_UPDATED: 'resourcesUpdated',
    CITY_UPDATED     : 'cityData',
    MILITARY_UPDATED : 'militaryUpdated',
    LOCAL_STRINGS_AVAILABLE : 'localisationAvailable',
    MODEL_AVAILABLE : 'modelAvailable',
    CITYDATA_AVAILABLE: 'cityDataAvailable',
    DATABASE_LOADED: 'databaseLoaded',
	  TAB_CHANGED : 'tabChanged',
	  PREMIUM_UPDATED : 'premiumUpdated',
  },
  Settings: {
    CITY_ORDER:         'cityOrder',
    FULL_ARMY_TABLE:    'fullArmyTable',
    HIDE_ISLAND:        'hideOnIslandView',
    HIDE_WORLD:         'hideOnWorldView',
    HIDE_CITY:          'hideOnCityView',
    SHOW_ON_TOP:        'onTop',
    WINDOW_TENNIS:      'windowTennis',
    AUTO_UPDATE:        'autoUpdates',
    SMALLER_FONT:       'smallFont',
    COMPRESS_BUILDINGS: 'compressedBuildingList',
    WINE_WARNING_TIME:  'wineWarningTime',
  },
  SettingData:{
    cityOrder:{type:'array', default:[], category:'ignore'},
    fullArmyTable:{type:'boolean', default:false, category:'army_category'},
    hideOnIslandView:{type:'boolean', default:false, category:'visibility_category'},
    hideOnWorldView:{type:'boolean', default:false, category:'visibility_category'},
    hideOnCityView:{type:'boolean', default:false, category:'visibility_category'},
    onTop:{type:'boolean', default:true, category:'display_category'},
    windowTennis:{type:'boolean', default:false, category:'display_category'},
    autoUpdates:{type:'boolean', default:true, category:'global_category'},
    smallFont:{type:'boolean', default:false, category:'display_category'},
    compressedBuildingList:{type:'boolean', default:false, category:'building_category'},
    wineWarningTime:{type:'number', default:24, choices:[12,24,36,48], category:'resource_category'}
  },
  SettingCategories: {
    VISIBILITY: 'visibility_category',
    DISPLAY   : 'display_category',
    OTHER     : 'global_category',
    ARMY      : 'army_category',
    BUILDING  : 'building_category',
    RESOURCE  : 'resource_category',
  },
  Localization : {
    default : {
      //settings
      cityOrder : 'cityOrder',
      fullArmyTable : 'Show All Military Units',
      hideOnIslandView : 'Force hide on island view',
      hideOnWorldView : 'Force hide on world view',
      hideOnCityView : 'Force hide on city view (NYI)',
      onTop : 'Show on top of Ikariam windows',
      windowTennis : 'Show above ikariam on mouseover',
      autoUpdates : 'Automaticly check for updates',
      smallFont : 'Use smaller font size',
      compressedBuildingList : 'Use compressed building list',
      wineWarningTime : 'Wine remaining warning',
      //settings descriptions
      cityOrder_description : 'cityOrder_description',
      fullArmyTable_description : 'Show all possible army units on the Army tab',
      hideOnIslandView_description : 'Hide by default on world view',
      hideOnWorldView_description : 'Hide by default on island view',
      hideOnCityView_description : 'Hide by default on city view',
      onTop_description : 'Show board on top of Ikariam windows',
      windowTennis_description : 'Bring board to the top on mouseover<br>Send behind ikariam windows on mouseout<br>Ignores \'on top\' option',
      autoUpdates_description : 'Enable automatic update checking<br>(Once every 24hrs)',
      smallFont_description : 'Use a smaller font for the data tables',
      compressedBuildingList_description : 'Use condensed building table<br>Groups luxury resource production buildings<br>Groups palace/govenors residence',
      wineWarningTime_description : 'Wine remaining time turns \'red\' at this point',
      // settings categories
      visibility_category : 'Board Visibility',
      display_category : 'Display Settings',
      global_category : 'Global Settings',
      army_category : 'Army Settings',
      building_category : 'Building Settings',
      resource_category : 'Resource Settings',
      // formatting
      thousandSeperator : ',',
      decimalPoint:'.',
      click:'click'
    }
  },
  Resources   : {
    WOOD  : 'wood',
    WINE  : 'wine',
    MARBLE: 'marble',
    GLASS : 'glass',
    SULFUR: 'sulfur'
  },
  ResourceIDs : {
    WOOD  : 'resource',
    WINE  : 1,
    MARBLE: 2,
    GLASS : 3,
    SULFUR: 4
  },
  Research    : {
    Seafaring: {
      CARPENTRY          : 2150,
      DECK_WEAPONS       : 1010,
      PIRACY             : 1170,
      SHIP_MAINTENANCE   : 1020,
      DRAFT              : 1130,
      EXPANSION          : 1030,
      FOREIGN_CULTURES   : 1040,
      PITCH              : 1050,
      MARKET             : 2070,
      GREEK_FIRE         : 1060,
      COUNTERWEIGHT      : 1070,
      DIPLOMACY          : 1080,
      SEA_MAPS           : 1090,
      PADDLE_WHEEL_ENGINE: 1100,
      CAULKING           : 1140,
      MORTAR_ATTACHMENT  : 1110,
      MASSIVE_RAM        : 1150,
      OFFSHORE_BASE      : 1160,
      SEAFARING_FUTURE   : 1999
    },
    Economy  : {
      CONSERVATION               : 2010,
      PULLEY                     : 2020,
      WEALTH                     : 2030,
      WINE_CULTURE               : 2040,
      IMPROVED_RESOURCE_GATHERING: 2130,
      GEOMETRY                   : 2060,
      ARCHITECTURE               : 1120,
      HOLIDAY                    : 2080,
      LEGISLATION                : 2170,
      CULINARY_SPECIALITIES      : 2050,
      HELPING_HANDS              : 2090,
      SPIRIT_LEVEL               : 2100,
      WINE_PRESS                 : 2140,
      DEPOT                      : 2160,
      BUREACRACY                 : 2110,
      UTOPIA                     : 2120,
      ECONOMIC_FUTURE            : 2999
    },
    Science  : {
      WELL_CONSTRUCTION    : 3010,
      PAPER                : 3020,
      ESPIONAGE            : 3030,
      POLYTHEISM           : 3040,
      INK                  : 3050,
      GOVERNMENT_FORMATION : 3150,
      INVENTION            : 3140,
      CULTURAL_EXCHANGE    : 3060,
      ANATOMY              : 3070,
      OPTICS               : 3080,
      EXPERIMENTS          : 3081,
      MECHANICAL_PEN       : 3090,
      BIRDS_FLIGHT         : 3100,
      LETTER_CHUTE         : 3110,
      STATE_RELIGION       : 3160,
      PRESSURE_CHAMBER     : 3120,
      ARCHIMEDEAN_PRINCIPLE: 3130,
      SCIENTIFIC_FUTURE    : 3999
    },
    Military : {
      DRY_DOCKS          : 4010,
      MAPS               : 4020,
      PROFESSIONAL_ARMY  : 4030,
      SEIGE              : 4040,
      CODE_OF_HONOR      : 4050,
      BALLISTICS         : 4060,
      LAW_OF_THE_LEVEL   : 4070,
      GOVERNOR           : 4080,
      PYROTECHNICS       : 4130,
      LOGISTICS          : 4090,
      GUNPOWDER          : 4100,
      ROBOTICS           : 4110,
      CANNON_CASTING     : 4120,
      MILITARISTIC_FUTURE: 4999
    }
  },
  Military    : {
    // Army
    HOPLITE          : 'phalanx',
    STEAM_GIANT      : 'steamgiant',
    SPEARMAN         : 'spearman',
    SWORDSMAN        : 'swordsman',
    SLINGER          : 'slinger',
    ARCHER           : 'archer',
    MARKSMAN         : 'marksman',
    RAM              : 'ram',
    CATAPULT         : 'catapult',
    MORTAR           : 'mortar',
    GYROCOPTER       : 'gyrocopter',
    BALLOON_BOMBADIER: 'bombardier',
    COOK             : 'cook',
    DOCTOR           : 'medic',
    ARMY             : 'army',

    // Navy
    RAM_SHIP         : 'ship_ram',
    FLAME_THROWER    : 'ship_flamethrower',
    STEAM_RAM        : 'ship_steamboat',
    BALLISTA_SHIP    : 'ship_ballista',
    CATAPULT_SHIP    : 'ship_catapult',
    MORTAR_SHIP      : 'ship_mortar',
    SUBMARINE        : 'ship_submarine',
    PADDLE_SPEEDBOAT : 'ship_paddlespeedship',
    BALLOON_CARRIER  : 'ship_ballooncarrier',
    TENDER           : 'ship_tender',
    ROCKET_SHIP      : 'ship_rocketship',
    NAVY             : 'navy'
  },
  unitIds     : {
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
    220: 'ship_tender'
  },
  UnitData    : {
    slinger             : {id: 301, type: 'army', position: 'army_ranged', minlevel: 2, baseTime: 90},
    swordsman           : {id: 302, type: 'army', position: 'army_flank', minlevel: 6, baseTime: 180},
    phalanx             : {id: 303, type: 'army', position: 'army_front_line', minlevel: 4, baseTime: 300},
    marksman            : {id: 304, type: 'army', position: 'army_ranged', minlevel: 13, baseTime: 600},
    mortar              : {id: 305, type: 'army', position: 'army_seige', minlevel: 14, baseTime: 2400},
    catapult            : {id: 306, type: 'army', position: 'army_seige', minlevel: 8, baseTime: 1800},
    ram                 : {id: 307, type: 'army', position: 'army_seige', minlevel: 2, baseTime: 600},
    steamgiant          : {id: 308, type: 'army', position: 'army_front_line', minlevel: 12, baseTime: 900},
    bombardier          : {id: 309, type: 'army', position: 'army_air', minlevel: 11, baseTime: 1800},
    cook                : {id: 310, type: 'army', position: 'army_support', minlevel: 5, baseTime: 1200},
    medic               : {id: 311, type: 'army', position: 'army_support', minlevel: 9, baseTime: 1200},
    gyrocopter          : {id: 312, type: 'army', position: 'army_air', minlevel: 10, baseTime: 900},
    archer              : {id: 313, type: 'army', position: 'army_ranged', minlevel: 7, baseTime: 240},
    spearman            : {id: 315, type: 'army', position: 'army_flank', minLevel: 1, baseTime: 60},
    ship_ram            : {id: 210, type: 'fleet', position: 'navy_flank', minlevel: 1, baseTime: 2400},
    ship_flamethrower   : {id: 211, type: 'fleet', position: 'navy_front_line', minlevel: 4, baseTime: 1800},
    ship_submarine      : {id: 212, type: 'fleet', position: 'navy_seige', minlevel: 19, baseTime: 3600},
    ship_ballista       : {id: 213, type: 'fleet', position: 'navy_ranged', minlevel: 3, baseTime: 3000},
    ship_catapult       : {id: 214, type: 'fleet', position: 'navy_ranged', minlevel: 3, baseTime: 3000},
    ship_mortar         : {id: 215, type: 'fleet', position: 'navy_ranged', minlevel: 17, baseTime: 3000},
    ship_steamboat      : {id: 216, type: 'fleet', position: 'navy_front_line', minlevel: 15, baseTime: 2400},
    ship_rocketship     : {id: 217, type: 'fleet', position: 'navy_seige', minlevel: 11, baseTime: 3600},
    ship_paddlespeedship: {id: 218, type: 'fleet', position: 'navy_air', minlevel: 13, baseTime: 1800},
    ship_ballooncarrier : {id: 219, type: 'fleet', position: 'navy_air', minlevel: 7, baseTime: 3900},
    ship_tender         : {id: 220, type: 'fleet', position: 'navy_support', minlevel: 9, baseTime: 2400}
  },
  Government  : {
    ANARCHY     : 'anarchie',
    IKACRACY    : 'ikakratie',
    ARISTOCRACY : 'aristokratie',
    DICTATORSHIP: 'diktatur',
    DEMOCRACY   : 'demokratie',
    NOMOCRACY   : 'nomokratie',
    OLIGARCHY   : 'oligarchie',
    TECHNOCRACY : 'technokratie',
    THEOCRACY   : 'theokratie'
  },
  Buildings   : {
    TOWN_HALL          : 'townHall',
    PALACE             : 'palace',
    GOVERNORS_RESIDENCE: 'palaceColony',
    TAVERN             : 'tavern',
    MUSEUM             : 'museum',
    ACADEMY            : 'academy',
    WORKSHOP           : 'workshop',
    TEMPLE             : 'temple',
    EMBASSY            : 'embassy',
    WAREHOUSE          : 'warehouse',
    DUMP               : 'dump',
    TRADING_PORT       : 'port',
    TRADING_POST       : 'branchOffice',
    WALL               : 'wall',
    HIDEOUT            : 'safehouse',
    BARRACKS           : 'barracks',
    SHIPYARD           : 'shipyard',
    FORESTER           : 'forester',
    CARPENTER          : 'carpentering',
    WINERY             : 'winegrower',
    VINEYARD           : 'vineyard',
    STONEMASON         : 'stonemason',
    ARCHITECT          : 'architect',
    GLASSBLOWER        : 'glassblowing',
    OPTICIAN           : 'optician',
    ALCHEMISTS_TOWER   : 'alchemist',
    FIREWORK_TEST_AREA : 'fireworker',
    PIRATE_FORTRESS    : 'pirateFortress'
  },
  GovernmentData:{
    anarchie:{
      corruption:0.25,
      spyprotection:0,
      unitBuildTime:0,
      fleetBuildTime:0,
      loadingSpeed:0,
      buildingTime:0,
      happiness:0,
      bonusShips:0,
      armySupply:0,
      fleetSupply:0,
      researchPerCulturalGood:0,
      tradeShipSpeed:0,
      branchOfficeRange:0,
      researchBonus:0,
      researcherCost:0,
      productivity:0,
      happinessWithoutTemple:0,
      goldBonusPerPriest:0,
      cooldownTime:0,
      happinessBonusWithTempleConversion:0
    },
    ikakratie:{
      corruption:0,
      spyprotection:0,
      unitBuildTime:0,
      fleetBuildTime:0,
      loadingSpeed:0,
      buildingTime:0,
      happiness:0,
      bonusShips:0,
      armySupply:0,
      fleetSupply:0,
      researchPerCulturalGood:0,
      tradeShipSpeed:0,
      branchOfficeRange:0,
      researchBonus:0,
      researcherCost:0,
      productivity:0,
      happinessWithoutTemple:0,
      goldBonusPerPriest:0,
      cooldownTime:0,
      happinessBonusWithTempleConversion:0
    },
    aristokratie:{
      corruption:0.03,
      spyprotection:0.2,
      unitBuildTime:0,
      fleetBuildTime:0,
      loadingSpeed:0,
      buildingTime:-0.2,
      happiness:0,
      bonusShips:0,
      armySupply:0,
      fleetSupply:0,
      researchPerCulturalGood:0,
      tradeShipSpeed:0,
      branchOfficeRange:0,
      researchBonus:0,
      researcherCost:0,
      productivity:0,
      happinessWithoutTemple:0,
      goldBonusPerPriest:0,
      cooldownTime:0,
      happinessBonusWithTempleConversion:0
    },
    diktatur:{
      corruption:0,
      spyprotection:0,
      unitBuildTime:-0.02,
      fleetBuildTime:-0.02,
      loadingSpeed:0,
      buildingTime:0,
      happiness:-75,
      bonusShips:2,
      armySupply:-0.02,
      fleetSupply:-0.02,
      researchPerCulturalGood:0,
      tradeShipSpeed:0,
      branchOfficeRange:0,
      researchBonus:0,
      researcherCost:0,
      productivity:0,
      happinessWithoutTemple:0,
      goldBonusPerPriest:0,
      cooldownTime:0,
      happinessBonusWithTempleConversion:0
    },
    demokratie:{
      corruption:0,
      spyprotection:-0.2,
      unitBuildTime:0.05,
      fleetBuildTime:0,
      loadingSpeed:0,
      buildingTime:0,
      happiness:75,
      bonusShips:0,
      armySupply:0,
      fleetSupply:0,
      researchPerCulturalGood:1,
      tradeShipSpeed:0,
      branchOfficeRange:0,
      researchBonus:0,
      researcherCost:0,
      productivity:0,
      happinessWithoutTemple:0,
      goldBonusPerPriest:0,
      cooldownTime:0,
      happinessBonusWithTempleConversion:0
    },
    nomokratie:{
      corruption:-0.05,
      spyprotection:0.2,
      unitBuildTime:0.05,
      fleetBuildTime:0.05,
      loadingSpeed:0.5,
      buildingTime:0,
      happiness:0,
      bonusShips:0,
      armySupply:0,
      fleetSupply:0,
      researchPerCulturalGood:0,
      tradeShipSpeed:0,
      branchOfficeRange:0,
      researchBonus:0,
      researcherCost:0,
      productivity:0,
      happinessWithoutTemple:0,
      goldBonusPerPriest:0,
      cooldownTime:0,
      happinessBonusWithTempleConversion:0
    },
    oligarchie:{
      corruption:0.03,
      spyprotection:0,
      unitBuildTime:0,
      fleetBuildTime:0,
      loadingSpeed:0,
      buildingTime:0.2,
      happiness:0,
      bonusShips:2,
      armySupply:0,
      fleetSupply:-0.02,
      researchPerCulturalGood:0,
      tradeShipSpeed:0.1,
      branchOfficeRange:5,
      researchBonus:0,
      researcherCost:0,
      productivity:0,
      happinessWithoutTemple:0,
      goldBonusPerPriest:0,
      cooldownTime:0,
      happinessBonusWithTempleConversion:0
    },
    technokratie:{
      corruption:0,
      spyprotection:0,
      unitBuildTime:0,
      fleetBuildTime:0,
      loadingSpeed:0,
      buildingTime:0,
      happiness:0,
      bonusShips:0,
      armySupply:0,
      fleetSupply:0,
      researchPerCulturalGood:0,
      tradeShipSpeed:0,
      branchOfficeRange:0,
      researchBonus:0.05,
      researcherCost:1,
      productivity:0.2,
      happinessWithoutTemple:0,
      goldBonusPerPriest:0,
      cooldownTime:0,
      happinessBonusWithTempleConversion:0
    },
    theokratie:{
      corruption:0,
      spyprotection:0,
      unitBuildTime:0,
      fleetBuildTime:0,
      loadingSpeed:0,
      buildingTime:0,
      happiness:0,
      bonusShips:0,
      armySupply:0,
      fleetSupply:0,
      researchPerCulturalGood:0,
      tradeShipSpeed:0,
      branchOfficeRange:0,
      researchBonus:-0.05,
      researcherCost:0,
      productivity:0,
      happinessWithoutTemple:-20,
      goldBonusPerPriest:1,
      cooldownTime:-0.2,
      happinessBonusWithTempleConversion:2
    }
  },
  BuildingData:{
    academy:{
      buildingId:4,
      maxLevel:32,
      wood:[64, 68, 115, 263, 382, 626, 982, 1330, 2004, 2665, 3916, 5156, 7446, 9753, 12751, 18163, 23691, 33451, 43572, 56729, 73833, 103459, 144203, 175058, 243930, 317208, 439968, 536310, 743789, 1027470, 1257246, 1736683],
      glass:[0, 0, 0, 0, 225, 428, 744, 1089, 1748, 2454, 3786, 5216, 7862, 10729, 14599, 21627, 29322, 43020, 58213, 78724, 106414, 154857, 224146, 282572, 408877, 552141, 795252, 1006648, 1449741, 2079651, 2642548, 3790583],
      marble:0,
      sulfur:0,
      wine:0,
      time:{a:1440, b:1, c:1.2, d:720},
      icon:'skin/img/city/academy_l.png',
      maxScientists:[0, 8, 12, 16, 22, 28, 35, 43, 51, 60, 69, 79, 89, 100, 111, 122, 134, 146, 159, 172, 185, 198, 212, 227, 241, 256, 271, 287, 302, 318, 335, 351, 368 ]
    },
    alchemist:{
      buildingId:22,
      maxLevel:32,
      wood:[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72051, 93778, 122022, 158740, 206472, 268525, 349194, 454063, 590393, 767619, 998019, 1297536, 1686907, 2193090],
      glass:0,
      marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51831, 67485, 87835, 114290, 148681, 193390, 251512, 327069, 425295, 552987, 718988, 934789, 1215330],
      sulfur:0,
      wine:0,
      time:{a:72000, b:11, c:1.1, d:6120},
      icon:'skin/img/city/alchemist_l.png'
    },
    architect:{
      buildingId:24,
      maxLevel:32,
      wood:[185, 291, 413, 555, 720, 911, 1133, 1390, 1689, 2035, 2437, 2902, 3443, 4070, 4797, 5640, 6619, 7754, 9070, 10598, 12369, 14424, 16808, 19573, 22781, 26502, 30818, 35825, 41633, 48371, 56186, 65252],
      glass:0,
      marble:[106, 160, 222, 295, 379, 475, 587, 716, 865, 1036, 1233, 1460, 1722, 2023, 2369, 2767, 3226, 3753, 4359, 5056, 5857, 6778, 7836, 9052, 10449, 12055, 13899, 16017, 18451, 21246, 24455, 28141],
      sulfur:0,
      wine:0,
      time:{a:125660, b:37, c:1.06, d:2628},
      icon:'skin/img/city/architect_l.png'
    },
    barracks:{
      buildingId:6,
      maxLevel:54,
      wood:[49, 114, 195, 296, 420, 574, 766, 1003, 1297, 1662, 2115, 2676, 3371, 4234, 5304, 6630, 8275, 10314, 12843, 15979, 19868, 24690, 30669, 38083, 47277, 58676, 72812, 90341, 112076, 139028, 172448, 213889, 265276, 328996, 408008, 505984, 627473, 778120, 964923, 1196558, 1483785, 1839947, 2281558, 2829223, 3508290, 4350333, 5394466, 6689191, 8294651, 10285421, 12753975, 15814983, 19610632, 24317237],
      glass:0,
      marble:[0, 0, 0, 0, 0, 0, 0, 0, 178, 431, 745, 1134, 1616, 2214, 2956, 3875, 5015, 6429, 8183, 10357, 13052, 16395, 20540, 25680, 32054, 39957, 49757, 61909, 76977, 95661, 118830, 147560, 183185, 227359, 282136, 350059, 434283, 538721, 668224, 828808, 1027932, 1274847, 1581020, 1960675, 2431447, 3015205, 3739064, 4636650, 5749656, 7129784, 8841142, 10963226, 13594611, 16857527],
      sulfur:0,
      wine:0,
      time:{a:25200, b:11, c:1.1, d:1728},
      icon:'skin/img/city/barracks_l.png'
    },
    branchOffice:{
      buildingId:13,
      maxLevel:32,
      wood:[48, 173, 346, 581, 896, 1314, 1863, 2580, 3509, 4706, 6241, 8203, 10699, 13866, 17872, 22926, 29286, 37273, 47283, 59807, 75448, 94955, 119245, 149454, 186977, 233530, 291226, 362658, 451015, 560208, 695038, 861391],
      glass:0,
      marble:[0, 0, 0, 0, 540, 792, 1123, 1555, 2115, 2837, 3762, 4945, 6450, 8359, 10774, 13820, 17654, 22469, 28503, 36051, 45482, 57240, 71883, 90092, 112712, 121067, 175556, 218617, 271878, 337705, 418983, 446564],
      sulfur:0,
      wine:0,
      time:{a:108000, b:11, c:1.1, d:9360},
      icon:'skin/img/city/branchoffice_l.png'
    },
    carpentering:{
      buildingId:23,
      maxLevel:32,
      wood:[63, 122, 192, 274, 372, 486, 620, 777, 962, 1178, 1432, 1730, 2078, 2486, 2964, 3524, 4178, 4945, 5841, 6890, 8117, 95501, 11229, 13190, 15484, 18165, 21299, 24963, 29245, 34249, 40096, 46930],
      glass:0,
      marble:[0, 0, 0, 0, 0, 0, 0, 359, 444, 546, 669, 816, 993, 1205, 1459, 1765, 2131, 2571, 3098, 3731, 4491, 5402, 6496, 7809, 9384, 11275, 13543, 16265, 19531, 23451, 28154, 33799],
      sulfur:0,
      wine:0,
      time:{a:125660, b:37, c:1.06, d:2808},
      icon:'skin/img/city/carpentering_l.png'
    },
    dump:{
      buildingId:29,
      maxLevel:40,
      wood:[640, 1152, 1766, 2504, 3388, 4450, 5724, 7253, 9088, 11289, 13931, 17101, 20905, 25470, 30948, 37522, 45410, 54876, 66236, 79867, 96224, 115853, 139408, 167673, 201592, 242294, 291137, 349749, 420082, 504483, 605763, 727300, 873144, 1048157, 1258172, 1510191, 1812613, 2175519, 2611007, 3133593],
      glass:[701, 1146, 1668, 2278, 2991, 3526, 4803, 5946, 7283, 8847, 10678, 12819, 15325, 18257, 21687, 25700, 30395, 35889, 42316, 49837, 58635, 68930, 80974, 95066, 111554, 130844, 153414, 179821, 201717, 246865, 289158, 338642, 396537, 464275, 543528, 636254, 744743, 871676, 1020188, 1193946],
      marble:[497, 932, 1445, 2051, 2762, 3609, 4604, 5778, 7164, 8799, 10728, 13005, 15691, 18862, 22602, 27016, 32225, 38371, 45623, 54181, 64279, 76195, 90256, 106847, 126425, 149528, 176788, 208956, 246913, 291703, 344555, 406921, 480512, 567350, 669818, 790731, 933409, 1101768, 1300432, 1534855],
      sulfur:[384, 845, 1398, 2061, 2858, 3813, 4960, 6336, 7987, 9968, 12346, 15199, 18623, 22731, 27661, 33578, 40677, 49197, 59420, 71688, 86410, 104076, 125275, 150714, 181241, 217873, 261831, 314582, 377882, 453843, 544995, 654378, 785638, 943149, 1132163, 1358980, 1631160, 1957775, 2349715, 2820041],
      wine:0,
      time:{a:32000, b:13, c:1.17, d:2160},
      icon:'skin/img/city/dump_l.png'
    },
    embassy:{
      buildingId:12,
      maxLevel:32,
      wood:[242, 415, 623, 873, 1173, 1532, 1964, 2482, 3103, 3849, 4743, 5817, 7105, 8651, 10507, 12733, 15404, 18610, 22457, 27074, 32614, 39261, 47239, 56811, 68299, 82084, 98625, 118475, 142295, 170879, 205180, 246341],
      glass:0,
      marble:[155, 342, 571, 850, 1190, 1606, 2112, 2730, 3484, 4404, 5527, 6896, 8566, 10604, 13090, 16123, 19824, 24339, 29846, 36566, 44764, 54765, 66967, 81853, 100014, 122170, 149201, 182178, 222411, 271495, 331377, 404433],
      sulfur:0,
      wine:0,
      time:{a:96000, b:7, c:1.05, d:10080},
      icon:'skin/img/city/embassy_l.png'
    },
    fireworker:{
      buildingId:27,
      maxLevel:32,
      wood:[273, 353, 445, 551, 673, 813, 974, 1159, 1373, 1618, 1899, 2223, 2596, 3025, 3517, 4084, 4736, 5486, 6347, 7339, 8479, 9790, 11297, 13031, 15025, 17318, 19955, 22987, 26474, 30484, 35096, 40400],
      glass:0,
      marble:[135, 212, 302, 405, 526, 665, 827, 1015, 1233, 1486, 1779, 2120, 2514, 2972, 3503, 4119, 4834, 5662, 6624, 7739, 9033, 10534, 12275, 14294, 16637, 19354, 22507, 26163, 30405, 35325, 41033, 47653],
      sulfur:0,
      wine:0,
      time:{a:125660, b:37, c:1.06, d:2628},
      icon:'skin/img/city/fireworker_l.png'
    },
    forester:{
      buildingId:18,
      maxLevel:32,
      wood:[250, 430, 664, 968, 1364, 1878, 2546, 3415, 4544, 6013, 7922, 10403, 13629, 17823, 23274, 30362, 39575, 51552, 67123, 87365, 113680, 147889, 192360, 250173, 325330, 423035, 550050, 715170, 929826, 1208879, 1571647, 2043247],
      glass:0,
      marble:[0, 104, 237, 410, 635, 928, 1309, 1803, 2446, 3282, 4368, 5781, 7617, 10004, 13108, 17142, 22387, 29204, 38068, 49590, 64569, 84042, 109357, 142266, 185047, 240664, 312965, 406956, 529145, 68799 , 894489, 1162938],
      sulfur:0,
      wine:0,
      time:{a:72000, b:11, c:1.1, d:6120},
      icon:'skin/img/city/forester_l.png'
    },
    glassblowing:{
      buildingId:20,
      maxLevel:32,
      wood:[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72051, 93778, 122022, 158740, 206472, 268525, 349194, 454063, 590393, 767621, 998019, 1297536, 1686907, 2193090],
      glass:0,
      marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51831, 67485, 87835, 114290, 148681, 193390, 251512, 327069, 425295, 552987, 718988, 934789, 1215330],
      sulfur:0,
      wine:0,
      time:{a:72000, b:11, c:1.1, d:6120},
      icon:'skin/img/city/glassblowing_l.png'
    },
    museum:{
      buildingId:10,
      maxLevel:24,
      wood:[560, 1435, 2748, 4716, 7669, 12099, 18744, 28710, 43661, 66086, 99724, 150181, 225866, 339394, 509686, 765124, 1148281, 1723017, 2585121, 3878276, 5818009, 8727609, 13092008, 19638608],
      glass:0,
      marble:[280, 1190, 2573, 4676, 7871, 12729, 20112, 31335, 48394, 74323, 113736, 173643, 264701, 403110, 613492, 933272, 1419338, 2158158, 3281165, 4988136, 7582731, 11526515, 17521067, 26632786],
      sulfur:0,
      wine:0,
      time:{a:18000, b:1, c:1.1, d:14040},
      icon:'skin/img/city/museum_r.png'
    },
    optician:{
      buildingId:25,
      maxLevel:32,
      wood:[119, 188, 269, 362, 471, 597, 742, 912, 1108, 1335, 1600, 1906, 2261, 2673, 3152, 3706, 4350, 5096, 5962, 6966, 8131, 9482, 11050, 12868, 14978, 17424, 20263, 23555, 27374, 31805, 36944, 42905],
      glass:0,
      marble:[0, 35, 96, 167, 249, 345, 455, 584, 733, 905, 1106, 1338, 1608, 1921, 2283, 2704, 3192, 3759, 4416, 5178, 6062, 7087, 8276, 9656, 11257, 13113, 15267, 17765, 20663, 24025, 27924, 32448],
      sulfur:0,
      wine:0,
      time:{a:125660, b:37, c:1.06, d:2772},
      icon:'skin/img/city/optician_l.png'
    },
    palace:{
      buildingId:11,
      maxLevel:11,
      wood:[712, 5824, 16048, 36496, 77392, 159184, 322768, 649936, 1304272, 2612944, 4743518],
      glass:[0, 0, 0, 0, 21188, 42400, 84824, 169672, 339368, 678760, 1357544],
      marble:[0, 1434, 4546, 10770, 23218, 48114, 97906, 197490, 396658, 794994, 1591666],
      sulfur:[0, 0, 3089, 10301, 24725, 53573, 111269, 226661, 457445, 919013, 1842149],
      wine:[0, 0, 0, 10898, 22110, 44534, 89382, 179078, 358470, 717254, 1434822],
      time:{a:11520, b:1, c:1.4, d:0},
      icon:'skin/img/city/palace_l.png'
    },
    palaceColony:{
      buildingId:17,
      maxLevel:11,
      wood:[712, 5824, 16048, 36496, 77392, 159184, 322768, 649936, 1304272, 2612944, 4743518],
      glass:[0, 0, 0, 0, 21188, 42400, 84824, 169672, 339368, 678760, 1357544],
      marble:[0, 1434, 4546, 10770, 23218, 48114, 97906, 197490, 396658, 794994, 1591666],
      sulfur:[0, 0, 3089, 10301, 24725, 53573, 111269, 226661, 457445, 919013, 1842149],
      wine:[0, 0, 0, 10898, 22110, 44534, 89382, 179078, 358470, 717254, 1434822],
      time:{a:11520, b:1, c:1.4, d:0},
      icon:'skin/img/city/palaceColony_l.png'
    },
    port:{
      buildingId:3,
      maxLevel:48,
      wood:[60, 150, 274, 429, 637, 894, 1207, 1645, 2106, 2735, 3537, 4492, 5689, 7103, 8850, 11094, 13731, 17062, 21097, 25965, 31810, 39190, 47998, 58713, 71955, 87627, 107102, 130777, 159020, 193938, 235849, 286515, 348718, 423990, 513947, 625161, 758178, 919694, 1116013, 1353517, 1642275, 1990224, 2411062, 2923229, 3541580, 4291524, 5199343, 6296109],
      glass:0,
      marble:[0, 0, 0, 0, 0, 176, 326, 540, 791, 1138, 1598, 2176, 2928, 3859, 5051, 6628, 8566, 11089, 14265, 18241, 23197, 29642, 37636, 47703, 60556, 76367, 96639, 122157, 153754, 194090, 244301, 307174, 386956, 486969, 610992, 769303, 965794, 1212791, 1523572, 1913073, 2403314, 3015689, 3782993, 4749576, 5959027, 7478201, 9383420, 11768772],
      sulfur:0,
      wine:0,
      time:{a:50400, b:23, c:1.15, d:1512},
      loadingSpeed:[30, 60, 93, 129, 169, 213, 261, 315, 373, 437, 508, 586, 672, 766, 869, 983, 1108, 1246, 1398, 1565, 1748, 1950, 2172, 2416, 2685, 2980, 3305, 3663, 4056, 4489, 4965, 5488, 6064, 6698, 7394, 8161, 9004, 9931, 10951, 12073, 13308, 14666, 16159, 17802, 19609, 21597, 23784, 26189],
      icon:'skin/img/city/port_l.png'
    },
    safehouse:{
      buildingId:16,
      maxLevel:32,
      wood:[113, 248, 402, 578, 779, 1007, 1267, 1564, 1903, 2288, 2728, 3230, 3801, 4453, 5195, 6042, 7008, 8108, 9363, 10793, 12423, 14282, 16401, 18816, 21570, 24709, 28288, 32368, 37019, 42321, 48365, 55255],
      glass:0,
      marble:[0, 0, 0, 129, 197, 275, 366, 471, 593, 735, 900, 1090, 1312, 1569, 1866, 2212, 2613, 3078, 3617, 4243, 4968, 5810, 6787, 7919, 9233, 10758, 12526, 14577, 16956, 19716, 22917, 26631],
      sulfur:0,
      wine:0,
      time:{a:96000, b:7, c:1.05, d:12960},
      icon:'skin/img/city/safehouse_l.png'
    },
    shipyard:{
      buildingId:5,
      maxLevel:32,
      wood:[105, 202, 324, 477, 671, 914, 1222, 1609, 2096, 2711, 3485, 4460, 5689, 7238, 9190, 11648, 14746, 18650, 23568, 29765, 37573, 47412, 59808, 75428, 95108, 119906, 151151, 190520, 240124, 302626, 381378, 480605],
      glass:0,
      marble:[0, 0, 0, 0, 0, 778, 1052, 1397, 1832, 2381, 3071, 3942, 5038, 6420, 8161, 10354, 13118, 16601, 20989, 26517, 33484, 42261, 53321, 67256, 84814, 106938, 134814, 169937, 214192, 269954, 340214, 428741],
      sulfur:0,
      wine:0,
      time:{a:64800, b:7, c:1.05, d:7128},
      icon:'skin/img/city/shipyard_l.png'
    },
    stonemason:{
      buildingId:19,
      maxLevel:32,
      wood:[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72051, 93778, 122022, 158740, 206472, 268525, 349194, 454063, 590393, 767621, 998019, 1297536, 1686907, 2193090],
      glass:0,
      marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51831, 67485, 87835, 114290, 148681, 193390, 251512, 327069, 425295, 552987, 718988, 934789, 1215330],
      sulfur:0,
      wine:0,
      time:{a:72000, b:11, c:1.1, d:6120},
      icon:'skin/img/city/stonemason_l.png'
    },
    temple:{
      buildingId:28,
      maxLevel:32,
      wood:[216, 228, 333, 465, 598, 760, 958, 1197, 1432, 1773, 2112, 2512, 3082, 3655, 4458, 5126, 6232, 7167, 8688, 10247, 11784, 14229, 16753, 19266, 23186, 26664, 32027, 36831, 43257, 50782, 59591, 68529],
      glass:[173, 190, 290, 423, 567, 752, 989, 1290, 1610, 2080, 2586, 3210, 4109, 5084, 6471, 7765, 9851, 11821, 14952, 18402, 22082, 27824, 34184, 41020, 51514, 61817, 77477, 92972, 113941, 139577, 170911, 205093],
      marble:0,
      sulfur:0,
      wine:0,
      time:{a:2160, b:1, c:1.1, d:0},
      icon:'skin/img/city/temple_l.png'
    },
    tavern:{
      buildingId:9,
      maxLevel:48,
      wood:[101, 222, 367, 541, 750, 1001, 1302, 1663, 2097, 2617, 3241, 3990, 4888, 5967, 7261, 8814, 10678, 12914, 15598, 18818, 22683, 27320, 32885, 39562, 47576, 57192, 68731, 82578, 99194, 119134, 143061, 171774, 206230, 247577, 297193, 356732, 428179, 513916, 616800, 740261, 888414, 1066197, 1279538, 1535546, 1842756, 2211408, 2653790, 3184649],
      glass:0,
      marble:[0, 0, 0, 94, 122, 158, 206, 267, 348, 452, 587, 764, 993, 1290, 1677, 2181, 2835, 3685, 4791, 6228, 8097, 10526, 13684, 17789, 23125, 30063, 39082, 50806, 66048, 85862, 111621, 145107, 188640, 245232, 318801, 414441, 538774, 700406, 910528, 1183686, 1538792, 2000429, 2600558, 3380726, 4394943, 5713427, 7427454, 9655691],
      sulfur:0,
      wine:0,
      time:{a:10800, b:1, c:1.06, d:10440},
      icon:'skin/img/city/taverne_r.png',
      wineUse:[0, 4, 8, 13, 18, 24, 30, 37, 44, 51, 60, 68, 78, 88, 99, 110, 122, 136, 150, 165, 180, 197, 216, 235, 255, 277, 300, 325, 351, 378, 408, 439, 472, 507, 544, 584, 626, 670, 717, 766, 818, 874, 933, 995, 1060, 1129, 1203, 1280, 1362]
    },
    townHall:{
      buildingId:0,
      maxLevel:48,
      wood:[0, 158, 335, 623, 923, 1390, 2015, 2706, 3661, 4776, 6173, 8074, 10281, 13023, 16424, 20986, 25423, 32285, 40232, 49286, 61207, 74804, 93956, 113035, 141594, 170213, 210011, 258875, 314902, 387657, 471194, 572581, 695617, 854729, 1037816, 1274043, 1529212, 1876201, 2276286, 2761291, 3384434, 4061704, 4975980, 6032502, 7312524, 8863183, 10846842, 13016622],
      glass:0,
      marble:[0, 0, 0, 0, 285, 551, 936, 1411, 2091, 2945, 4072, 5664, 7637, 10214, 13575, 18254, 23250, 31022, 40599, 52216, 68069, 87316, 115101, 145326, 191053, 241039, 312128, 403825, 515593, 666229, 850031, 1084293, 1382827, 1783721, 2273687, 2930330, 3692591, 4756439, 6058643, 7716366, 9929885, 12512055, 16094038, 20485823, 26073282, 33181278, 42636729, 53722706],
      sulfur:0,
      wine:0,
      time:{a:1800, b:1, c:1.17, d:-1080},
      icon:'skin/img/city/townhall_l.png'
    },
    vineyard:{
      buildingId:26,
      maxLevel:32,
      wood:[339, 423, 520, 631, 758, 905, 1074, 1269, 1492, 1749, 2045, 2384, 2775, 3225, 3741, 4336, 5019, 5805, 6709, 7749, 8944, 10319, 11900, 13718, 15809, 18214, 20979, 24159, 27816, 32021, 36858, 42419],
      glass:0,
      marble:[123, 198, 285, 387, 504, 640, 798, 981, 1194, 1440, 1726, 2058, 2443, 2889, 3407, 4008, 4705, 5513, 6450, 7538, 8800, 10263, 11961, 13930, 16214, 18864, 21938, 25503, 29639, 34437, 40002, 46458],
      sulfur:0,
      wine:0,
      time:{a:125660, b:37, c:1.06, d:2232},
      icon:'skin/img/city/vineyard_l.png'
    },
    wall:{
      buildingId:8,
      maxLevel:48,
      wood:[114, 361, 657, 1012, 1439, 1951, 2565, 3302, 4186, 5247, 6521, 8049, 9882, 12083, 14724, 17892, 21695, 26258, 31733, 38304, 46189, 55650, 67004, 80629, 96979, 116599, 140143, 168395, 202298, 242982, 291802, 350387, 420688, 505050, 606284, 727765, 873542, 1048474, 1258393, 1510295, 1812578, 2175318, 2610605, 3132950, 3759764, 4511941, 5414554, 6497688],
      glass:0,
      marble:[0, 203, 516, 892, 1344, 1885, 2535, 3315, 4251, 5374, 6721, 8338, 10279, 12608, 15402, 18755, 22779, 27607, 33402, 40355, 48699, 58711, 70726, 85144, 102446, 123208, 148122, 178019, 213896, 256948, 308610, 370605, 444998, 534271, 641398, 769950, 924213, 1109329, 1331467, 1598033, 1917913, 2301768, 2762394, 3315146, 3978448, 4774411, 5729566, 6875751],
      sulfur:0,
      wine:0,
      time:{a:57600, b:11, c:1.1, d:3240},
      icon:'skin/img/city/wall.png'
    },
    warehouse:{
      buildingId:7,
      maxLevel:40,
      wood:[160, 288, 442, 626, 847, 1113, 1431, 1813, 2272, 2822, 3483, 4275, 5226, 6368, 7737, 9380, 11353, 13719, 16559, 19967, 24056, 28963, 34852, 41918, 50398, 60574, 72784, 87437, 105021, 126121, 151441, 181825, 218286, 262039, 314543, 377548, 453153, 543880, 652752, 783398],
      glass:0,
      marble:[0, 0, 0, 96, 211, 349, 515, 714, 953, 1240, 1584, 1997, 2492, 3086, 3800, 4656, 5683, 6915, 8394, 10169, 12299, 14855, 17922, 21602, 26019, 31319, 37678, 45310, 54468, 65458, 78645, 94471, 113461, 136249, 163595, 196409, 235787, 283041, 339745, 407790],
      sulfur:0,
      wine:0,
      time:{a:2880, b:1, c:1.14, d:2160},
      icon:'skin/img/city/warehouse_l.png'
    },
    winegrower:{
      buildingId:21,
      maxLevel:32,
      wood:[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72051, 93778, 122022, 158740, 206472, 268525, 349194, 454063, 590393, 767621, 998019, 1297536, 1686907, 2193090],
      glass:0,
      marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51831, 67485, 87835, 114290, 148681, 193390, 251512, 327069, 425295, 552987, 718988, 934789, 1215330],
      sulfur:0,
      wine:0,
      time:{a:72000, b:11, c:1.1, d:6120},
      icon:'skin/img/city/winegrower_l.png'
    },
    workshop:{
      buildingId:15,
      maxLevel:32,
      wood:[220, 383, 569, 781, 1023, 1299, 1613, 1972, 2380, 2846, 3377, 3982, 4672, 5458, 6355, 7377, 8542, 9870, 11385, 13111, 15079, 17322, 19880, 22796, 26119, 29909, 34228, 39153, 44766, 51166, 58462, 66779],
      glass:0,
      marble:[95, 167, 251, 349, 461, 592, 744, 920, 1125, 1362, 1637, 1956, 2326, 2755, 3253, 3831, 4501, 5278, 6180, 7226, 8439, 9847, 11479, 13373, 15570, 18118, 21074, 24503, 28481, 33095, 38447, 44656],
      sulfur:0,
      wine:0,
      time:{a:96000, b:7, c:1.05, d:11880},
      icon:'skin/img/city/workshop_l.png'
    },
    pirateFortress:{
      buildingId:30,
      maxLevel: 30,
      wood:[450, 906, 1389, 1935, 2593, 3427, 4516, 5950, 7834, 10284, 13430, 17415, 22394, 28534, 36015, 45029, 55779, 68482, 83366, 100671, 120648, 143562, 169686, 199309, 232729, 270255, 312210, 358926, 410748, 468032],
      glass:0,
      marble:[250, 505, 783, 1112, 1534, 2103, 2883, 3949, 5388, 7296, 9782, 12964, 16970, 21938, 28019, 35370, 44162, 54573, 66793, 81020, 97463, 116341, 137883, 162325, 189915, 220912, 255580, 294197, 337048, 384429],
      sulfur:0,
      wine:0,
      time:{a:0, b:0, c:0, d:0},
      icon:'skin/img/city/pirateFortress_l.png'
    }
  }
};
Constant.buildingOrder = {
  growth   : [Constant.Buildings.TOWN_HALL, Constant.Buildings.PALACE, Constant.Buildings.GOVERNORS_RESIDENCE, Constant.Buildings.TAVERN, Constant.Buildings.MUSEUM],
  research : [Constant.Buildings.ACADEMY, Constant.Buildings.WORKSHOP, Constant.Buildings.TEMPLE],
  diplomacy: [Constant.Buildings.EMBASSY],
  trading  : [Constant.Buildings.WAREHOUSE, Constant.Buildings.DUMP, Constant.Buildings.TRADING_PORT, Constant.Buildings.TRADING_POST],
  military : [Constant.Buildings.WALL, Constant.Buildings.HIDEOUT, Constant.Buildings.BARRACKS, Constant.Buildings.SHIPYARD, Constant.Buildings.PIRATE_FORTRESS],
  wood     : [Constant.Buildings.FORESTER, Constant.Buildings.CARPENTER],
  wine     : [Constant.Buildings.WINERY, Constant.Buildings.VINEYARD],
  marble   : [Constant.Buildings.STONEMASON, Constant.Buildings.ARCHITECT],
  crystal  : [Constant.Buildings.GLASSBLOWER, Constant.Buildings.OPTICIAN],
  sulfur   : [Constant.Buildings.ALCHEMISTS_TOWER, Constant.Buildings.FIREWORK_TEST_AREA]
};
Constant.altBuildingOrder = {
  growth    : [Constant.Buildings.TOWN_HALL, 'colonyBuilding', Constant.Buildings.PALACE, Constant.Buildings.GOVERNORS_RESIDENCE, Constant.Buildings.TAVERN, Constant.Buildings.MUSEUM],
  research  : [Constant.Buildings.ACADEMY, Constant.Buildings.WORKSHOP, Constant.Buildings.TEMPLE],
  diplomacy : [Constant.Buildings.EMBASSY],
  trading   : [Constant.Buildings.WAREHOUSE, Constant.Buildings.DUMP, Constant.Buildings.TRADING_PORT, Constant.Buildings.TRADING_POST],
  military  : [Constant.Buildings.WALL, Constant.Buildings.HIDEOUT, Constant.Buildings.BARRACKS, Constant.Buildings.SHIPYARD, Constant.Buildings.PIRATE_FORTRESS],
  production: [Constant.Buildings.FORESTER, 'productionBuilding', Constant.Buildings.WINERY, Constant.Buildings.STONEMASON, Constant.Buildings.GLASSBLOWER, Constant.Buildings.ALCHEMISTS_TOWER],
  reducton  : [Constant.Buildings.CARPENTER, Constant.Buildings.VINEYARD, Constant.Buildings.ARCHITECT, Constant.Buildings.OPTICIAN, Constant.Buildings.FIREWORK_TEST_AREA]
};
Constant.unitOrder = {
  army_front_line: [Constant.Military.HOPLITE, Constant.Military.STEAM_GIANT],
  army_flank     : [Constant.Military.SPEARMAN, Constant.Military.SWORDSMAN],
  army_ranged    : [Constant.Military.SLINGER, Constant.Military.ARCHER, Constant.Military.MARKSMAN],
  army_seige     : [Constant.Military.RAM, Constant.Military.CATAPULT, Constant.Military.MORTAR],
  army_air       : [Constant.Military.GYROCOPTER, Constant.Military.BALLOON_BOMBADIER],
  army_support   : [Constant.Military.COOK, Constant.Military.DOCTOR],
  navy_front_line: [Constant.Military.FLAME_THROWER, Constant.Military.STEAM_RAM],
  navy_flank     : [Constant.Military.RAM_SHIP],
  navy_ranged    : [Constant.Military.BALLISTA_SHIP, Constant.Military.CATAPULT_SHIP, Constant.Military.MORTAR_SHIP],
  navy_seige     : [Constant.Military.SUBMARINE, Constant.Military.ROCKET_SHIP],
  navy_air       : [Constant.Military.PADDLE_SPEEDBOAT, Constant.Military.BALLOON_CARRIER],
  navy_support   : [Constant.Military.TENDER]
};

/***********************************************************************************************************************
 * Main Init
 **********************************************************************************************************************/
    if(debug) {
        delete unsafeWindow.console;
        unsafeWindow.SITR = {
            s       : SITR,
            db      : database,
            ikariam : ikariam,
            render  : render,
            events  : events,
            utils   : Utils,
            Constant: Constant,
            $       : $,
            get tip(){return $('.breakdown_table').text().replace(/\s\s/g,' ').replace(/\s\s/g,' ').replace(/\s\s/g,' ').replace(/\s\s/g,' ').replace(/\s\s/g,' ').replace(/\s\s/g,' ').replace(/\s\s/g,' ').replace(/\s\s/g,' ').replace(/\s\s/g,' ').replace(/\s\s/g,' ').replace(/\s\s/g,' ').replace(/\s\s/g,' ')}
        }
    }

SITR.Init();
$(function() {
  var bgViewId = $('body').attr('id');
  if(!(bgViewId === 'city' || bgViewId === 'island' || bgViewId === 'worldmap_iso' || !$('backupLockTimer').length)) {
    return false
  }

  (function init(model, data, local, ajax){
    var mod, dat, loc, aj;
    mod = !!unsafeWindow.ikariam && !!unsafeWindow.ikariam.model;
    dat = !!unsafeWindow.ikariam && !!unsafeWindow.ikariam.model.relatedCityData;
    loc = !!unsafeWindow.LocalizationStrings;
    aj = !!unsafeWindow.ikariam.controller && !!unsafeWindow.ikariam.controller.executeAjaxRequest && !!unsafeWindow.ajaxHandlerCallFromForm;
    if (dat && !data){
      events(Constant.Events.CITYDATA_AVAILABLE).pub();
    }
    if (mod && dat && !model && !data){
      events(Constant.Events.MODEL_AVAILABLE).pub()
    }
    if (loc && !local){
      events(Constant.Events.LOCAL_STRINGS_AVAILABLE).pub()
    }
   if (aj && !ajax){
     unsafeWindow.ajaxHandlerCallFromForm = function(ajaxHandlerCallFromForm) {
       return function cAjaxHandlerCallFromForm(form) {
         events('formSubmit').pub(form);
         return ajaxHandlerCallFromForm.apply(this, arguments);
       };
     }(unsafeWindow.ajaxHandlerCallFromForm);

     unsafeWindow.ikariam.controller.executeAjaxRequest = function(execAjaxRequest) {
       return function cExecuteAjaxRequest() {
         var args = $.makeArray(arguments);
         args.push(undefined);
         if(!args[1]) {
           args[1] = function customAjaxCallback(responseText) {
             var responder = unsafeWindow.ikariam.getClass(unsafeWindow.ajax.Responder, responseText);
             unsafeWindow.ikariam.controller.ajaxResponder = responder;
             events('ajaxResponse').pub(responder.responseArray);
             unsafeWindow.response = responder
           }
         }
         var ret = execAjaxRequest.apply(this, args)
       };
     }(unsafeWindow.ikariam.controller.executeAjaxRequest);
   }
    if (!(mod && loc && dat && aj)){
    events.scheduleAction(init.bind(null, mod, loc, dat, aj),1000);
    }
    else {
      var initialAjax = [];
      $('script').each(function(index, script) {
        var match = /ikariam.getClass\(ajax.Responder, (.*)\);/.exec(script.innerHTML);
        if(match) {
          events('ajaxResponse').pub(JSON.parse(match[1] || []));
          return false;
        }
      });
    }
  })();
});
})(jQuery);