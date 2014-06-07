// ==UserScript==
// @name                 Empire Overview
// @author               germano
// @description          Script for Ikariam V 0.5.x, Overview tables for Ress, buildings and mititary, desktop versions in the style of Ikariam Empire Board
// @namespace            Test
// @grant                GM_getValue
// @grant                GM_setValue
// @grant                GM_addStyle
// @grant                GM_registerMenuCommand
// @grant                GM_deleteValue
// @grant                GM_xmlhttpRequest
// @grant                GM_openInTab
// @downloadURL          http://userscripts.org:8080/scripts/source/138078.user.js
// @updateURL            http://userscripts.org:8080/scripts/source/138078.meta.js
// @include              http://s*.ikariam.gameforge.*/index.php*
// @exclude              http://board.*.ikariam.gameforge.com*
// @exclude              http://*.ikariam.gameforge.*/board
//
// @require              http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @require              http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js
// @require              http://www.dynamicdrive.com/dynamicindex11/domdrag/dom-drag.js
//
// @version              1.164
// 
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

  retEvents.scheduleAction = function(callback, time) {
    return clearTimeout.bind(undefined, setTimeout(callback, time || 0));
  };

  retEvents.scheduleActionAtTime = function(callback, time) {
    return retEvents.scheduleAction(callback, (time - $.now() > 0 ? time - $.now() : 0))
  };

  retEvents.scheduleActionAtInterval = function(callback, time) {
    return clearInterval.bind(undefined, setInterval(callback, time));
  };
  return retEvents
})();

/***********************************************************************************************************************
 * Globals
 **********************************************************************************************************************/
var debug = false;
var log = false;
var timing = false;
if(!unsafeWindow) unsafeWindow = window;

/***********************************************************************************************************************
 * Inject button into page before the page renders the YUI menu or it will not be animated (less work)
 **********************************************************************************************************************/
$('.menu_slots > .expandable:last').after('<li class="expandable slot99 empire_Menu" onclick=""><div class="empire_Menu image" style="background-image: url(skin/minimized/weltinfo.png); background-position: 0px 0px; background-size:33px auto"></div></div><div class="name"><span class="namebox">Empire Overview</span></div></li>');

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
	 	var lang = database.settings.languageChange.value;
		timeString = timeString || 0;
		precision = precision || 2;
		spacer = spacer || " ";
		if(!isFinite(timeString)) {
			return  ' \u221E ';
		}
		if(timeString < 0) timeString *= -1;
		var factors = [];
		var locStr = [];
	    var server = ikariam.Nationality();
		factors.day = 86400;
		factors.hour = 3600;
		factors.minute = 60;
		factors.second = 1;
		locStr.day = Constant.LanguageData[lang].day;
		locStr.hour = database.getGlobalData.getLocalisedString('h');
		locStr.minute = database.getGlobalData.getLocalisedString('m');
		locStr.second = database.getGlobalData.getLocalisedString('s');
	      if (server == 'ir' || server == 'ae') {
	  		locStr.hour = database.getGlobalData.getLocalisedString('س');
			locStr.minute = database.getGlobalData.getLocalisedString('د');
			locStr.second = database.getGlobalData.getLocalisedString('ث');
			}
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
	    var lang = database.settings.languageChange.value;
		precise = precise || true;
		timeString = timeString || 0;
		var sInDay = 86400000;
		var day = '';
		var compDate = new Date(timeString);
		if(precise) {
			switch(Math.floor(compDate.getTime() / sInDay) - Math.floor($.now() / sInDay)) {
				case 0  :
					day = Constant.LanguageData[lang].today; 
					break;
				case 1  :
					day = Constant.LanguageData[lang].tomorrow;
					break;
				case -1 :
					day = Constant.LanguageData[lang].yesterday;
					break;
				default :
					day = (!isChrome ? compDate.toLocaleFormat('%a %d %b') : compDate.toString().split(' ').splice(0, 3).join(' ')) //Dienstag
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
	    var lang = database.settings.languageChange.value;
		precision = precision ? "10e" + (precision - 1) : 1;
		var ret, val, sign, i, j;
		var tho = Constant.LanguageData[lang].thousandSeperator;
		var dec = Constant.LanguageData[lang].decimalPoint;
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
    this._resources = id._resources || {wood: 0, wine: 0, marble: 0, glass: 0, sulfur: 0, gold: 0};
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
    this._resources = resources || {wood: 0, wine: 0, marble: 0, glass: 0, sulfur: 0, gold: 0};
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
    return (net < 0) ? this.getCurrent / net * -1 : Infinity; 
  },
  get getFullTime() {
    var net = this.getProduction * 3600 - this.getConsumption;
    return (net > 0) ? (this.city().maxResourceCapacities.capacity - this.getCurrent) / net : 0;
  },
  get getCurrent() {
    return Math.floor(this._current);

  },
  get getProduction() {
    return this._production || 0
  }, 
  get getConsumption() {
    return this._consumption || 0
  } 
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
  get getTrainingTotals() { 
	  if(!this._trainingTotals) {
		  this._trainingTotals = Utils.cacheFunction(this._getTrainingTotals.bind(this), 1000)
	  }
	  return this._trainingTotals()
  },
	_getIncomingTotals :function (){
		var ret = {};
		$.each(this.city().getIncomingMilitary, function(index, element) {
			for(var unitName in Constant.UnitData) {
        ret[unitName] = ret[unitName] ? ret[unitName] + (element.getMilitary.totals[unitName]||0) : element.getMilitary.totals[unitName]||0
			}
		});
		return ret
	},
  get getIncomingTotals() { 
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
    database.getGlobalData.addLocalisedString(name, data.name); 
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
      wine  : Math.floor((Constant.BuildingData[this._name].wine[level] || 0) * (bon - (vineyard = this.city().getBuildingFromName(Constant.Buildings.VINEYARD), vineyard ? vineyard.getLevel / 100 : 0))),
      marble: Math.floor((Constant.BuildingData[this._name].marble[level] || 0) * (bon - (architect = this.city().getBuildingFromName(Constant.Buildings.ARCHITECT), architect ? architect.getLevel / 100 : 0))),
      glass : Math.floor((Constant.BuildingData[this._name].glass[level] || 0) * (bon - (optician = this.city().getBuildingFromName(Constant.Buildings.OPTICIAN), optician ? optician.getLevel / 100 : 0))),
      sulfur: Math.floor((Constant.BuildingData[this._name].sulfur[level] || 0) * (bon - (fireworker = this.city().getBuildingFromName(Constant.Buildings.FIREWORK_TEST_AREA), fireworker ? fireworker.getLevel / 100 : 0))),
      time  : Math.round(time.a / time.b * Math.pow(time.c, level + 1) - time.d) * 1000 * bonTime
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
    return Constant.BuildingData[this.getName].maxLevel === (this.getLevel)
  },
  get getPosition() {
    return this._position
  },
  completeUpgrade                 : function() {
    this._level++;
    delete this._completionTime;
    delete this._updateTimer; 
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
  updateResearchers: function(researchers) { 
    var changed = this._researchers !== researchers;
    this._researchers = researchers;
    this._researchersLastUpdate = $.now();
    this._researchCost = this.getResearchCost;
    return changed;
  },
  updateCost       : function(cost) { 
    var changed = this._researchCost !== cost;
    this._researchCost = cost;
    this._researchCostLastUpdate = $.now();
    this._researchers = this.getResearchers;
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
    return this.researchData.total
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
    var premBon = database.getGlobalData.hasPremiumFeature(Constant.Premium.RESEARCH_POINTS_BONUS_EXTREME_LENGTH) ? (0 + Constant.PremiumData[Constant.Premium.RESEARCH_POINTS_BONUS_EXTREME_LENGTH].bonus) : database.getGlobalData.hasPremiumFeature(Constant.Premium.RESEARCH_POINTS_BONUS) ? (0 + Constant.PremiumData[Constant.Premium.RESEARCH_POINTS_BONUS].bonus) : 0;
    var goods = Constant.GovernmentData[database.getGlobalData.getGovernmentType].researchPerCulturalGood * this.city()._culturalGoods;
    var researchers = this.getResearchers;
    var corruptionSpend = researchers * this.city().getCorruption;
    var nonCorruptedResearchers = researchers * (1 - this.city().getCorruption);
    var premiumResBonus = nonCorruptedResearchers * premBon;
    var researchBonus = nonCorruptedResearchers * resBon;
    var premiumGoodsBonus = goods * premBon;
    var serverTyp = $('li.logout a[href="?view=normalServerStatus"]').text() ? 1 : 3;
    return {
      scientists: researchers,	  
      researchBonus: researchBonus,
      premiumScientistBonus: premiumResBonus,
      premiumResearchBonus: (researchBonus* premBon),
      culturalGoods: goods,
      premiumCulturalGoodsBonus: premiumGoodsBonus,
      corruption: corruptionSpend,
      total: (nonCorruptedResearchers + researchBonus + premiumResBonus + goods + premiumGoodsBonus + (researchBonus* premBon))* serverTyp
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
    gold  : new Resource(this, Constant.Resources.GOLD),
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
  this.actionPoints = 0;
  this._actionPoints = 0;  
  this.maxSci = 0;
  this._coordinates = {x: 0, y: 0};
  this._islandID = null;

  this.population = new Population(this);
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
        empire.error('fetchCurrentCityData', e)
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
      var h = 0;
      if (this.getBuildingFromName(Constant.Buildings.GOVERNORS_RESIDENCE) && (this.getBuildingFromName(Constant.Buildings.GOVERNORS_RESIDENCE).getLevel / database.getCityCount != 1)) {
      h = Constant.GovernmentData[database.getGlobalData.getGovernmentType].governors;
      }	  
      return Math.max(0, 1 - ((this.getBuildingFromName(Constant.Buildings.GOVERNORS_RESIDENCE) ? this.getBuildingFromName(Constant.Buildings.GOVERNORS_RESIDENCE).getLevel : this.getBuildingFromName(Constant.Buildings.PALACE) ? this.getBuildingFromName(Constant.Buildings.PALACE).getLevel : 0) + 1) / database.getCityCount + Constant.GovernmentData[database.getGlobalData.getGovernmentType].corruption + h);
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
    var priestsGold = 0;
	priestsGold = Math.floor(this._priests * Constant.GovernmentData[database.getGlobalData.getGovernmentType].goldBonusPerPriest);
    return this._citizens * 3 + priestsGold
  },
  updateIncome               : function(value) {
  /*  if(Math.abs(this._citizens - value / 3) > 2) {
      return this.updateCitizens((value / 3))
    }*/
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
  updatePriests              : function(priests) { 
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
  get garrisonland() {
    var i = 0, r = 0, t = 0;
    if(this.getBuildingFromName(Constant.Buildings.TOWN_HALL)) {
      i = this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel;
    }
	if(this.getBuildingFromName(Constant.Buildings.WALL)) {
      r = this.getBuildingFromName(Constant.Buildings.WALL).getLevel;
    }
	t = (i + r - 1)*50 + 300;
	return t
  },
  get garrisonsea() {
    var t = 0, n = 0, s = 0;
    if(this.getBuildingFromName(Constant.Buildings.TRADING_PORT)) {
      t = this.getBuildingFromName(Constant.Buildings.TRADING_PORT).getLevel;
    }
	if(this.getBuildingFromName(Constant.Buildings.SHIPYARD)) {
      s = this.getBuildingFromName(Constant.Buildings.SHIPYARD).getLevel;
    }
	n = t > t ? t : t > s ? t : s;
	return n * 25 + 125;
  },
    get plundergold() {
    var i = 0;
    if(this.getBuildingFromName(Constant.Buildings.PALACE)) {
      i = Math.floor(this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel) * 950;
    } else
    if(database.getCityCount == 1)	
      i = Math.floor(this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel) * 950;	
    return i
  },
  get maxculturalgood() {
    var i = 0;
    if(this.getBuildingFromName(Constant.Buildings.MUSEUM)) {
      i = this.getBuildingFromName(Constant.Buildings.MUSEUM).getLevel;
    }
	return i
  },
  get maxtavernlevel() {
    var i = 0;
    if(this.getBuildingFromName(Constant.Buildings.TAVERN)) {
      i = this.getBuildingFromName(Constant.Buildings.TAVERN).getLevel;
    }
	return  i
  },
  get tavernlevel() {
    if(this.getBuildingFromName(Constant.Buildings.TAVERN)) {
      var consumption = Math.floor(this.getResource(Constant.Resources.WINE).getConsumption * (100 / ( 100 - (this.getBuildingFromName(Constant.Buildings.VINEYARD) ? this.getBuildingFromName(Constant.Buildings.VINEYARD).getLevel : 0))));
      for(var i = 0; i < Constant.BuildingData[Constant.Buildings.TAVERN].wineUse.length; i++) {
        if(Math.abs(Constant.BuildingData[Constant.Buildings.TAVERN].wineUse[i] - consumption) <= 1) {
          break
        }
      }
    }
	return i > 0 ? i: ''
  },
  get CorruptionCity() {
    var i = Math.max(0, 1 - ((this.getBuildingFromName(Constant.Buildings.GOVERNORS_RESIDENCE) ? this.getBuildingFromName(Constant.Buildings.GOVERNORS_RESIDENCE).getLevel: this.getBuildingFromName(Constant.Buildings.PALACE) ? this.getBuildingFromName(Constant.Buildings.PALACE).getLevel: 0) + 1) / database.getCityCount + Constant.GovernmentData[database.getGlobalData.getGovernmentType].corruption);
    var h = 0;
    if (this.getBuildingFromName(Constant.Buildings.GOVERNORS_RESIDENCE) && (this.getBuildingFromName(Constant.Buildings.GOVERNORS_RESIDENCE).getLevel / database.getCityCount != 1)) {
    h = Constant.GovernmentData[database.getGlobalData.getGovernmentType].governors;
    }	
	return Math.floor(i * 100) + (h * 100)
  },		
  get maxAP() {
    var i = 0;
    if(this.getBuildingFromName(Constant.Buildings.TOWN_HALL)) { 
	    if (this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel >= 1) i = 3
        if (this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel >= 4) i = 4
        if (this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel >= 8) i = 5
        if (this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel >= 12) i = 6
        if (this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel >= 16) i = 7
        if (this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel >= 20) i = 8
        if (this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel >= 24) i = 9	
        if (this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel >= 28) i = 10
        if (this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel >= 32) i = 11
        if (this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel >= 36) i = 12
        if (this.getBuildingFromName(Constant.Buildings.TOWN_HALL).getLevel == 40) i = 13
    }
    return i
  },  
  get maxSci() {
    var i = 0;
    if (this.getBuildingFromName(Constant.Buildings.ACADEMY) ? this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel : '') { 
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 0) i = 0
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 1) i = 8
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 2) i = 12
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 3) i = 16
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 4) i = 22
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 5) i = 28
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 6) i = 35
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 7) i = 43
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 8) i = 51
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 9) i = 60
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 10) i = 69
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 11) i = 79
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 12) i = 89
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 13) i = 100
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 14) i = 111
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 15) i = 122
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 16) i = 134
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 17) i = 146
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 18) i = 159
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 19) i = 172
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 20) i = 185
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 21) i = 198
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 22) i = 212
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 23) i = 227
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 24) i = 241
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 25) i = 256
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 26) i = 271
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 27) i = 287
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 28) i = 302
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 29) i = 318
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 30) i = 335
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 31) i = 351
        if (this.getBuildingFromName(Constant.Buildings.ACADEMY).getLevel == 32) i = 368
    }
    return ((this.getBuildingsFromName(Constant.Buildings.ACADEMY)) ? i : '');
    },
  get iSci () {
	var i = '';
    if(this.getBuildingFromName(Constant.Buildings.ACADEMY)) {
      i = 0;
    }
	return  i
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
    if(database.getGlobalData.getResearchTopicLevel(Constant.Research.Science.WELL_CONSTRUCTION) && this.getBuildingFromName(Constant.Buildings.PALACE) || database.getCityCount == 1) {
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
    });
    return i
  },
  get maxResourceCapacities() {
    if(!this._capacities.invalid) {
      return this._capacities
    }
  	var lang = database.settings.languageChange.value;
    var ret = {};
    ret[Constant.Buildings.DUMP] = {storage: 0, safe: 0, lang: Constant.LanguageData[lang].dump_};
    ret[Constant.Buildings.WAREHOUSE] = {storage: 0, safe: 0, lang: Constant.LanguageData[lang].warehouse_};
    ret[Constant.Buildings.TOWN_HALL] = {storage: 2500, safe: 100, lang: Constant.LanguageData[lang].townhall_};
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
          r.tavern.wineConsumption = 60 * i ;
          break
        }
      }
    }
    r.research = (database.getGlobalData.getResearchTopicLevel(2080) * 25) + (database.getGlobalData.getResearchTopicLevel(2999) * 10) + (this.getBuildingFromName(Constant.Buildings.PALACE) ? 50 * database.getGlobalData.getResearchTopicLevel(3010) : 0) + (this.getBuildingFromName(Constant.Buildings.PALACE) ? 200 * database.getGlobalData.getResearchTopicLevel(2120) : 0) + (database.getCityCount == 1 ? 50 * database.getGlobalData.getResearchTopicLevel(3010) : 0) - (this.getBuildingFromName(Constant.Buildings.PALACE) && database.getCityCount == 1 ? 50 * database.getGlobalData.getResearchTopicLevel(3010) : 0);
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
    this.governmentType = 'ikakratie';
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
		var lang = database.settings.languageChange.value;
          $.each(Constant.LanguageData[lang], this.addLocalisedString.bind(this)); 	  
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
                return changes
            } catch(e) {
                empire.error('addFleetMovement', e);
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
                    return (el.getMission == 'trade' || el.getMission == 'transport' || el.getMission == 'plunder')
                }
            });
        },
        getMilitaryMovementsToCity: function(cityID) {
            return this.fleetMovements.filter(function(el) {
                if(el.getOriginCityId == cityID) {
                    return (el.getMission != 'trade' && el.getMission != 'transport' && el.getMission == 'plunder' && el.getMission == 'deploy') 
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
            lString = this.localStrings[string.replace(/([A-Z])/g, "_$1").toLowerCase()];
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
    get categories() {
      return Constant.SettingData[this._name].categories
    },
    get choices() {
      return Constant.SettingData[this._name].choices || false
    },
    get selection() {
      return Constant.SettingData[this._name].selection || false
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
      else if (this.type === 'buildings') {
        if (!isNaN(value)) {
          this._value = value
        }
      }
	  else if (this.type === 'language') {		 
        this._value = value;
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
 * empire
 **********************************************************************************************************************/
var empire = {
  version        : 1.164,
  scriptId       : 138078,
  scriptName     : 'Empire Overview',
  logger         : null,
  loaded         : false,
  log            : function(val) {
    if(debug) console.log('empire: ', $.makeArray(arguments));
    if(log) {
      if(this.logger) {
        this.logger.val(val + '\n' + this.logger.val());
        return true
      } else {
        render.$tabs.append($(document.createElement("div")).attr('id', 'empire_Log'));
        $('#empire_Log').html('<div><textarea id="empire_Logbox" rows="20" cols="120"></textarea></div>');
        $('<li><a href="#empire_Log"><img class="ui-icon ui-icon-info"/></a></li>').appendTo("#empire_Tabs .ui-tabs-nav");
        render.$tabs.tabs('refresh');
        this.logger = $('#empire_Logbox');
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
      empire.CheckForUpdates(true);
    });

  },

  CheckForUpdates: function(forced) {
    var lang = database.settings.languageChange.value;
    if((forced) || ((database.getGlobalData.LastUpdateCheck + 86400000 <= $.now()) && database.settings.autoUpdates.value)) 
    {
      try {
        GM_xmlhttpRequest({
          method : 'GET',
          url    : 'http://userscripts.org:8080/scripts/source/' + empire.scriptId + '.meta.js?' + $.now(),
          headers: {'Cache-Control': 'no-cache'},
          onload : function(resp) {
            var remote_version, rt;
            rt = resp.responseText;
            database.getGlobalData.LastUpdateCheck = $.now();
            remote_version = parseFloat(/@version\s*(.*?)\s*$/m.exec(rt)[1]);
            if(empire.version != -1) {
              if(remote_version > empire.version) {
                if(confirm(Constant.LanguageData[lang].alert_update + empire.scriptName + '". \n' + Constant.LanguageData[lang].alert_update1)) {
                  GM_openInTab('http://userscripts.org:8080/scripts/show/' + empire.scriptId);
                }
              } else if(forced)
                render.toast(Constant.LanguageData[lang].alert_noUpdate + empire.scriptName + '".');
            }
            database.getGlobalData.latestVersion = remote_version;
          }
        });
      } catch(err) {
        if(forced)
          render.toast(Constant.LanguageData[lang].alert_error +'\n' + err);
      }
    }
  },
  HardReset      : function() {
    var lang = database.settings.languageChange.value;
    database = {};
    empire.deleteVar("settings");
    empire.deleteVar("Options"); 
    empire.deleteVar("options");
    empire.deleteVar("cities");
    empire.deleteVar("LocalStrings");
    empire.deleteVar("globalData");
    render.toast(Constant.LanguageData[lang].alert_toast);
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
    version             : empire.version,
    window              : {
      left     : 110,
      top      : 200,
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
    prefix = prefix.replace('.ikariam.gameforge.', '-');
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
        if(database.settings.alternativeBuildingList.value && (value == '')) {
       }
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
    events(Constant.Events.BUILDINGS_UPDATED).sub(this.Save.bind(this));
    events(Constant.Events.GLOBAL_UPDATED).sub(this.Save.bind(this));
    events(Constant.Events.MOVEMENTS_UPDATED).sub(this.Save.bind(this));
    events(Constant.Events.RESOURCES_UPDATED).sub(this.Save.bind(this));
    events(Constant.Events.MILITARY_UPDATED).sub(this.Save.bind(this));
    events(Constant.Events.PREMIUM_UPDATED).sub(this.Save.bind(this));
  },
  Load                  : function() {
    var settings = this.UnSerialize(empire.getVar("settings", ""));
    if(typeof settings === 'object') {
      if(!this.isDatabaseOutdated(settings.version)) {

        $.mergeValues(this.settings, settings);

        var globalData = this.UnSerialize(empire.getVar("globalData", ""));
        if (globalData.governmentType == '') globalData.governmentType = 'ikakratie';
        if(typeof globalData == 'object') {
          $.mergeValues(this._globalData, globalData);

        }
        var cities = this.UnSerialize(empire.getVar("cities", ""));
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
        empire.log('error saving')
      }
    return ret || undefined;
  },
  UnSerialize           : function(data) {
    if(data)
      try {
        var ret = JSON.parse(data)
      } catch(e) {
        empire.log('error loading')
      }
    return ret || undefined;
  },
  Save                  : function() {
    events.scheduleAction(function() {
      empire.setVar("cities", database.Serialize(database.cities));
      empire.setVar("settings", database.Serialize(database.settings));
      empire.setVar("globalData", database.Serialize(database._globalData));
    })

  },
  get getGlobalData() {
    return this._globalData
  },
  isDatabaseOutdated    : function(version) {
    return 1.160 > (version || 0);
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
      totals[unitId] = {training: 0, total: 0, incoming: 0, plunder: 0};
    });
    $.each(this.cities, function(cityId, city) {
      var train = city.military.getTrainingTotals;
      var incoming = city.military.getIncomingTotals;
      var total = city.military.getUnits.totals;
      $.each(Constant.UnitData, function(unitId, info) {
        totals[unitId].training += train[unitId] || 0;
        totals[unitId].total += total[unitId] || 0;
        totals[unitId].incoming += incoming[unitId] || 0;
       // totals[unitId].plunder += plunder[unitId] || 0;		
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
        var y = event.pageY + 20 - t;

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
      render.toolTip.elem = render.mainContentBox.append($('<div id="empireTip" style="z-index: 999999999;"><div class="content"></div></div>')).find('div.content');
      render.mainContentBox.on('mouseover', '[data-tooltip]', render.toolTip.mouseOver).on('mousemove', '[data-tooltip]', render.toolTip.mouseMove).on('mouseout', '[data-tooltip]', render.toolTip.mouseOut);
    },
		
    dynamicTip: function(id, elem) {
  	  var lang = database.settings.languageChange.value;	
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
          if(resourceName !== Constant.Resources.GOLD) 		
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
        case "pop":
          return getPopulationTip();
          break;
        case "happy":   
          return getGrowthTip();
          break;
        case "garrisonlimit":
          return getActionPointsTip(); 
          break;
        case "prodconssubsum consumption Red":   
          return getFinanceTip();
          break;		  
        case "scientists":
          return getResearchTip();
          break;
		case "prodconssubsum":
		  return resourceName === Constant.Resources.GOLD ? getFinanceTip() : getProductionConsumptionSubSumTip(city.getResource(resourceName).getProduction * 3600, city.getResource(resourceName).getConsumption);
		  break;
        case "building":
          var bName = tiptype.shift(); 
          var index = parseInt(bName.slice(-1)); 
          bName = bName.slice(0, -1);
          return getBuildingTooltip(city.getBuildingsFromName(bName)[index]);
        case "army":
          switch(tiptype.shift()) {
            case "unit":
              return '';
              break;
            case "movement":
              return getArmyMovementTip(tiptype.pop());			  
              break;
            case "incoming":
              return getIncomeMovementTip(tiptype.pop());			  
              break;
         /*   case "plunder":
              return getPlunderMovementTip(tiptype.pop());			  
              break	*/		  
          }
          break;
        default :
          return "";
          break;
      }
      function getGoldIncomeTip() {
        var researchCost = 0;
        var income = 0;
        var sigmaIncome = 0;		
        $.each(database.cities, function(cityID, city) {  
          researchCost += Math.floor(city.getExpenses);
          income += Math.floor(city.getIncome);		  	  
        });
        var expense = database.getGlobalData.finance.armyCost + database.getGlobalData.finance.armySupply + database.getGlobalData.finance.fleetCost + database.getGlobalData.finance.fleetSupply - researchCost;
        sigmaIncome	= income - expense;			
        return '<table>\n    <thead>\n    <th><div align="center">\n <img src="skin/resources/icon_upkeep.png" style="height: 14px;"></td><td><b>1 '+ Constant.LanguageData[lang].hour +'</b></td><td><b>1 '+ Constant.LanguageData[lang].day +'</b></td><td><b> 1 ' + Constant.LanguageData[lang].week +'</b></div><td></td></th>\n    </thead>\n    <tbody>\n    <tr class="data">\n        <td><b>-&nbsp;</b></td>\n        <td> ' + Utils.FormatNumToStr(database.getGlobalData.finance.armyCost, false, 0) + ' </td>\n        <td> ' + Utils.FormatNumToStr(database.getGlobalData.finance.armyCost * 24, false, 0) + '</td>\n        <td> ' + Utils.FormatNumToStr(database.getGlobalData.finance.armyCost * 24 * 7, false, 0) + '</td>\n        <td class="left"><i>« '+ Constant.LanguageData[lang].army_cost +'</i></td>\n    </tr>\n    <tr class="data">\n        <td><b>-&nbsp;</b></td>\n        <td class="nolf"> ' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetCost, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetCost * 24, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetCost * 24 * 7, false, 0) + '</td>\n        <td class="left"><i>« '+ Constant.LanguageData[lang].fleet_cost +'</i></td>\n    </tr>\n    <tr class="data">\n        <td><b>-&nbsp;</b></td>\n        <td class="nolf">' + Utils.FormatNumToStr(database.getGlobalData.finance.armySupply, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(database.getGlobalData.finance.armySupply * 24, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(database.getGlobalData.finance.armySupply * 24 * 7, false, 0) + '</td>\n        <td class="left"><i>« '+ Constant.LanguageData[lang].army_supply +'</i></td>\n    </tr>\n    <tr class="data">\n        <td><b>-&nbsp;</b></td>\n        <td class="nolf">' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetSupply, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetSupply * 24, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(database.getGlobalData.finance.fleetSupply * 24 * 7, false, 0) + '</td>\n        <td class="left"><i>« '+ Constant.LanguageData[lang].fleet_supply +'</i></td>\n    </tr>\n    <tr class="data">\n        <td><b>-&nbsp;</b></td>\n        <td class="nolf">' + Utils.FormatNumToStr(researchCost, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(researchCost * 24, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(researchCost * 24 * 7, false, 0) + '</td>\n        <td class="left"><i>« '+ Constant.LanguageData[lang].research_cost +'</i></td>\n    </tr>\n    <tr style="border-top:1px solid #FFE4B5">\n        <td><b>+&nbsp;</b></td>\n        <td class="nolf">' + Utils.FormatNumToStr(income, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(income * 24, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(income * 7 * 24, false, 0) + '</td>\n        <td class="left"><i>« '+ Constant.LanguageData[lang].income +'</i></td>\n    </tr>\n    <tr>\n        <td><b>-&nbsp;</b></td>\n        <td class="nolf">' + Utils.FormatNumToStr(expense, false, 0) + '</td>\n        <td class="left">' + Utils.FormatNumToStr(expense * 24, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr(expense * 24 * 7, false, 0) + '</td>\n        <td><i>« '+ Constant.LanguageData[lang].expenses +'</i></td></tbody><tfoot>\n    </tr>\n    <tr  class="total">\n        <td><b>Σ ' + ((sigmaIncome > 0) ? '+&nbsp;' : '-&nbsp;') + '</b></td>\n        <td>' + Utils.FormatNumToStr((sigmaIncome), false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr((sigmaIncome) * 24, false, 0) + '</td>\n        <td>' + Utils.FormatNumToStr((sigmaIncome) * 7 * 24, false, 0) + '</td>\n        <td><i>« '+ Constant.LanguageData[lang].balances +'</i></td>\n    </tr>\n    </tfoot>\n</table>'
      }
      function getArmyMovementTip(unit) { 
        var total = 0;
        var table = '<table>\n    <thead>\n        <th colspan="3"><div align="center"><img src="{0}" style="height: 18px; float: left"></td>\n        <b>'+ Constant.LanguageData[lang].training +'</b></div></th>\n        \n    </thead>\n    <tbody>\n{1}\n    </tbody><tfoot><tr class="small">\n        <td><b>Σ +</b></td>\n        <td>{2}</td>\n        <td class="left"><i>« '+ Constant.LanguageData[lang].total_ +'</i></td>\n    </tr>\n    </tfoot>\n</table>';
        var rows = '';
        $.each(city.military.getTrainingForUnit(unit), function(index, data) {
          rows += Utils.format('<tr class="data">\n    <td><b>+</b></td>\n    <td >{0}</td>\n    <td ><i>« {1}</i></td>\n</tr>', [data.count, Utils.FormatTimeLengthToStr(data.time - $.now(), 3)]);
          total += data.count;
        });

        if(rows === '') {
          return ''
        } else {
          return Utils.format(table, [getImage(unit), rows, total])
        }
      }  
      function getPopulationTip() {
        var populationData = city.populationData;
        var popDiff = populationData.maxPop-populationData.currentPop;
        var populationTip = '<table>\n    <thead>\n    <th colspan="2"><div align="center">\n <img src="skin/resources/icon_population.png" style="height: 15px; float: left"><b>{0}</b></div></th>\n    </thead>\n    <tbody>\n ' +
		                    '<tr class="data">\n        <td>{1}</td>\n        <td>« {6}</td>\n    </tr>\n' +
			             	'<tr class="data">\n        <td>{2}</td>\n        <td>« {0}</td>\n    </tr>\n' +
			            	'<tr class="data">\n        <td>{3}</td>\n        <td>« {8}</td>\n    </tr>\n' +
				            '<tr class="data">\n        <td>{4}</td>\n        <td>« {7}</td>\n    </tr></tbody>\n' +
				            '<tr class="data"><tfoot>\n        <td>{5}</td>\n        <td>« {9}</td>\n    </tr>\n</tfoot></table>';
        return Utils.format(populationTip, [Constant.LanguageData[lang].citizens, Utils.FormatNumToStr(populationData.maxPop, false, 0), Utils.FormatNumToStr(populationData.currentPop, false, 0), Utils.FormatNumToStr(city._citizens, false, 0), ((popDiff == 0) ? Constant.LanguageData[lang].full : Utils.FormatNumToStr(popDiff, false, 2)), ((popDiff == 0) ? Constant.LanguageData[lang].full : Utils.FormatTimeLengthToStr((popDiff)/populationData.growth * 3600000, 2)), Constant.LanguageData[lang].housing_space, Constant.LanguageData[lang].free_housing_space, Constant.LanguageData[lang].free_Citizens, Constant.LanguageData[lang].time_to_full]);
      } 
	  function getGrowthTip() {
		var lang = database.settings.languageChange.value;
	  	var populationData = city.populationData;
        var popDiff = populationData.maxPop-populationData.currentPop;  
		var Icon = populationData.happiness >= 0 ? 'skin/icons/growth_positive.png' : 'skin/icons/growth_negative.png';			   
	    var Tip = '';
           if(popDiff > 0) {
           Tip = '<table>\n    <thead>\n    <th><div align="center">\n <img src="'+ Icon +'" style="height: 14px;"></td><td><b>1 '+ Constant.LanguageData[lang].hour +'</b></td><td><b>1 '+ Constant.LanguageData[lang].day +'</b></td><td><b> 1 ' + Constant.LanguageData[lang].week +'</b></div><td></td></th>\n    </thead>\n    <tbody>\n <tr><td><b>' + ((populationData.growth > 0)? '+' : '-') + '</b></td><td>' + ((popDiff == 0)? '0'+Constant.LanguageData[lang].decimalPoint+'00' : Utils.FormatNumToStr(populationData.growth, false, 2)) + '</td><td>' + ((popDiff == 0)?  '0'+Constant.LanguageData[lang].decimalPoint+'00' : (populationData.growth*24 > popDiff)? Utils.FormatNumToStr(popDiff, false, 2) : Utils.FormatNumToStr(populationData.growth*24, false, 2)) + '</td><td><i>' + ((popDiff == 0)?  '0'+Constant.LanguageData[lang].decimalPoint+'00' : (populationData.growth*24*7 > popDiff)? Utils.FormatNumToStr(popDiff, false, 2) : Utils.FormatNumToStr(populationData.growth*24*7, false, 2)) + '</i></td><td></td></tr></tbody></table>'
          }	
		var corruption = '<td>'+ city.CorruptionCity +'';
	       if(city.CorruptionCity > 0) {	
		   corruption = '<td class="red">'+ city.CorruptionCity +'';
		  }
	    var sat = '';
        var img = '';
           if(populationData.growth < -1) {
           img = 'outraged';
	       sat = Constant.LanguageData[lang].angry;
           } else if(populationData.growth < 0) {
           img = 'sad';
           sat = Constant.LanguageData[lang].unhappy;
           } else if(populationData.growth < 1) {
           img = 'neutral';
           sat = Constant.LanguageData[lang].neutral;
           } else if(populationData.growth < 6) {
           img = 'happy';
           sat = Constant.LanguageData[lang].happy ;
           } else {
           img = 'ecstatic';
           sat = Constant.LanguageData[lang].euphoric;
           } 
        var growthTip ='<table>\n    <thead>\n    <th colspan="2"><div align="center">\n <img src="skin/smilies/' + img + '_x25.png" style="height: 18px; float: left"><b>{0}</b></div></th>\n    </thead>\n    <tbody>\n ' +
		                    '<tr class="data">\n        <td>{1}</td>\n        <td>« {2}</td>\n    </tr>\n' +
			             	'<tr class="data">\n            {3}</td>\n        <td>« {4}</td>\n    </tr>\n' +
			            	'<tr class="data">\n        <td>{5}</td>\n        <td>« {6}</td>\n    </tr>\n' +
				            '<tr class="data">\n        <td>{7}</td>\n        <td>« {8}</td>\n    </tr></tbody>\n  </table> {9}';
        return Utils.format(growthTip, [Constant.LanguageData[lang].satisfaction, Utils.FormatNumToStr(populationData.happiness, true, 0), sat, corruption + '%', Constant.LanguageData[lang].corruption, Math.floor(city._culturalGoods) + '/' + Math.floor(city.maxculturalgood), Constant.LanguageData[lang].cultural, Math.floor(city.tavernlevel) + '/' + Math.floor(city.maxtavernlevel), Constant.LanguageData[lang].level_tavern, Tip]);	 
      }
      function getActionPointsTip() {
        var garrisonTip = '<table>\n    <thead>\n    <th colspan="3"><div align="center">\n <b>{0}</b></div></th>\n    </thead>\n    <tbody>\n ' +
		                    '<tr class="data">\n        <td>{1}</td>\n        <td>{2}</td>\n        <td>« {3}</td>\n    </tr>\n' +
			             	'<tr class="data">\n        <td>{4}</td>\n        <td>{5}</td>\n        <td>« {6}</td>\n    </tr>\n</tfoot></table>';
        return Utils.format(garrisonTip, [Constant.LanguageData[lang].garrision, '<img src="skin/advisors/military/bang_soldier.png" style="height: 15px;">', city.garrisonland, Constant.LanguageData[lang].Inland, '<img src="skin/advisors/military/bang_ship.png" style="height: 15px;">', city.garrisonsea, Constant.LanguageData[lang].Sea]);
	  }
      function getFinanceTip() {
        var totCity = Math.floor(city.getIncome + city.getExpenses);
	    var Tip = '';
           if(city.getExpenses < 0) {
           Tip = '<td></td><td>' + Utils.FormatNumToStr(city.getExpenses, true, 0) + '</td><td>' + Utils.FormatNumToStr(city.getExpenses*24, true, 0) + '</td><td><i>' + Utils.FormatNumToStr(city.getExpenses*24*7, true, 0) + '</i></td><td></td></tr></tbody><tfoot><tr><td>\u03A3<b> ' + ((totCity > 0) ? '+&nbsp;' : '-&nbsp;') + '</b></td><td>' + Utils.FormatNumToStr(totCity,false,0) + '</td><td>' + Utils.FormatNumToStr(totCity*24,false,0) + '</td><td><i>' + Utils.FormatNumToStr(totCity*7*24,false,0) + '</i></td><td></td></tr></tfoot>'
          }		
        var financeTip = '<table>\n    <thead>\n    <th><div align="center">\n <img src="skin/resources/icon_upkeep.png" style="height: 14px;"></td><td><b>{0}</b></td><td><b>{1}</b></td><td><b>{2}</b></div><td></td></th>\n    </thead>\n    <tbody>\n ' +
		                    '<tr class="data">\n        <td></td>\n        <td>{3}</td>\n        <td>{4}</td>\n        <td><i>{5}</i></td>\n        <td></td>\n    </tbody></tr>\n{6}</table>';
        return Utils.format(financeTip, [ '1 ' + Constant.LanguageData[lang].hour, '1 ' + Constant.LanguageData[lang].day, '1 ' + Constant.LanguageData[lang].week, Utils.FormatNumToStr(city.getIncome, true, 0), Utils.FormatNumToStr(city.getIncome*24, false, 0), Utils.FormatNumToStr(city.getIncome*24*7, false, 0), Tip]);
	  }	 
      function getResearchTip(researchData) {
        researchData = researchData || city.research.researchData
		var tooltip = (researchData.scientists > 0)? '<table>\n    <thead>\n  <th colspan="5"><div align="center">\n <img src="skin/buildings/y50/y50_academy.png" style="height: 20px; float: left"><b>{0}</b></div></th>\n    </thead>\n    <tbody>\n ' +
		                    '<tr class="data">\n        <td>{1}</td>\n        <td colspan="4">« {2}</td>\n    </tr>\n' +
				            '<tr class="data">\n        <td>{3}</td>\n        <td colspan="4">« {4}</td>\n    </tr>\n' +
							'<thead>\n    <th><div align="center">\n <img src="skin/resources/icon_research_time.png" style="height: 14px;">  <td><b>{5}</b></td><td><b>{6}</b></td><td><b>{7}</b></div><td></td></th>\n    </thead>\n    <tbody>\n  ' +
							'<tr class="data">\n        <td>{11}</td>\n        <td>{8}</td>\n        <td>{9}</td>\n    <td><i>{10}</i></td>\n        <td></td></tr>\n</table>' :'';
        return Utils.format(tooltip, [Constant.LanguageData[lang].academy_, Utils.FormatNumToStr(researchData.scientists, false, 0), Constant.LanguageData[lang].scientists, Utils.FormatNumToStr(city.maxSci, false, 0), Constant.LanguageData[lang].scientists_max, '1 ' + Constant.LanguageData[lang].hour,'1 ' + Constant.LanguageData[lang].day, '1 ' + Constant.LanguageData[lang].week, Utils.FormatNumToStr(researchData.total, true, 0), Utils.FormatNumToStr(researchData.total*24, false,0), Utils.FormatNumToStr((researchData.total*24)*7, false,0), database.getGlobalData.hasPremiumFeature(Constant.Premium.RESEARCH_POINTS_BONUS)? '<img src="skin/premium/b_premium_research.jpg" style="width:18px;">' : '']);
	  }
      function getIncomingTip() {
        var cRes = city.getResource(resourceName).getCurrent;
		    if (resourceName === Constant.Resources.GOLD)
		    cRes = database.getGlobalData.finance.currentGold;
        var rMov = database.getGlobalData.getResourceMovementsToCity(city.getId);
        var table = '<table>\n    <thead>{0}</thead>\n    <tbody>{1}</tbody>\n    <tfoot>{2}</tfoot>\n</table>';
        var row = '<tr class="data" style="border-top:1px solid #FFE4B5">\n    <td><div class="icon2 {0}Image"></div></td>\n    <td>{1}</td>\n    <td><i>« {2}</i></td>\n    \n</tr><td></td><td>{3}</td>\n<td class="small data">« ({4})</td>\n</tr>';
        var header = '<tr>\n    <th ><div class="icon2 merchantImage"></div></th>\n    <th colspan="3">'+ Constant.LanguageData[lang].transport +'</th>\n</tr>';
        var subtotal = '<tr class="total" style="border-top:1px solid #FFE4B5">\n    <td>=</td>\n    <td>{0}</td>\n    <td colspan=2><i>{1}</i></td>\n</tr>';
        var footer = '<tr class="total">\n    <td>Σ</td>\n    <td>{0}</td><td></td>\n</tr>';
        if(rMov.length) {
          var trades = '';  
          var transp = ''; 		  
		  var plunder = '';	
          var movTotal = 0;
          for(var movID in rMov) {
            if(rMov[movID].getResources[resourceName]) {
              var origin = database.getCityFromId(rMov[movID].getOriginCityId);	  
              var tMov = Utils.format(row, [rMov[movID].getMission, Utils.FormatNumToStr(rMov[movID].getResources[resourceName], false, 0), origin ? origin.getName : rMov[movID].getOriginCityId, Utils.FormatRemainingTime(rMov[movID].getArrivalTime - $.now()), rMov[movID].isLoading ? Constant.LanguageData[lang].loading +': ' + Utils.FormatRemainingTime(rMov[movID].getLoadingTime, false)  : rMov[movID].getArrivalTime > $.now() ? Constant.LanguageData[lang].en_route : Constant.LanguageData[lang].arrived]);
              if(rMov[movID].getMission == "trade")
                trades += tMov; else if(rMov[movID].getMission == 'transport')
                transp += tMov; else if(rMov[movID].getMission == 'plunder')
                plunder += tMov;			
              movTotal += rMov[movID].getResources[resourceName]
            }			
          }
          if(trades === '' && transp === '' && plunder === '') {
            return ''
          }
          var body = trades + transp + plunder + Utils.format(subtotal, [
            Utils.FormatNumToStr(movTotal, false, 0), '« '+ Constant.LanguageData[lang].total_ +''
          ]);
          var foot = Utils.format(footer, [
            Utils.FormatNumToStr((movTotal + cRes), false, 0)
          ]);
          var head = Utils.format(header, []);
          return Utils.format(table, [head, body, foot]);
        }
        return ''
      }
      function getBuildingTooltip(building) {
		if(building.isMaxLevel) return ''+ Constant.LanguageData[lang].max_Level +'';
        var uConst = (building.isUpgrading);
        var resourceCost = building.getUpgradeCost;
        var serverTyp = $('li.logout a[href="?view=normalServerStatus"]').text() ? 1 : 3;
        var elem = '';
        var time = 0;		
		var needlevel = 0;
		var costlevel = 0;
        needlevel = building.getLevel + 2;
		costlevel = building.getLevel + 1;
        for(var key in resourceCost) {
          if(key == 'time') {
            time = '<tr class="total"><td><img src="skin/resources/icon_time.png" style="height: 11px; float: left;"></td><td colspan="2" ><i>(' + Utils.FormatTimeLengthToStr(resourceCost[key]/serverTyp, 3, ' ') + ')</i></td></tr>';
            continue;
          }
          if(resourceCost[key]) {
            elem += '<tr class="data"><td><div class="icon ' + key + 'Image"></div></td><td>' + Utils.FormatNumToStr(resourceCost[key], false, 0) + '</td>';
            elem += (building.city().getResource(key).getCurrent < resourceCost[key] ? '<td class="red left">(' + Utils.FormatNumToStr(building.city().getResource(key).getCurrent - resourceCost[key], true, 0) + ')</td></tr>' : '<td><img src="skin/interface/check_mark_17px.png" style="height:11px; float:left;"></td></tr>')
          }
        }
        elem = (elem !== '') ? '<table><thead><tr><th colspan="3" align="center"><b>' + (uConst ? Constant.LanguageData[lang].next_Level + ' ' + needlevel : Constant.LanguageData[lang].next_Level + ' ' + costlevel) + '</b></th></tr></thead><tbody>' + elem + '</tbody><tfoot>' + time + '</tfoot></table>' : '';
        if(uConst) {
           elem = '<table><thead><tr><th colspan="3" align="center"><b>'+ Constant.LanguageData[lang].constructing +'</b></th></tr></thead>' + '<tbody><tr><td></td><td>' + Utils.FormatFullTimeToDateString(building.getCompletionTime, true) + '</td></tr>' + '<tr><td><img src="skin/resources/icon_time.png" style="height: 11px; float: left;"></td><td><i>(' + Utils.FormatTimeLengthToStr(building.getCompletionTime - $.now(), 3, ' ') + ')</i></td></tr></tbody></table>' + elem
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
			if (resourceName === Constant.Resources.GOLD) {
			var res = 0, researchCost = 0, expense = 0, inGold = 0;
			res += Math.floor(city.getIncome + city.getExpenses);
			researchCost += Math.floor(city.getExpenses);
			expense = (database.getGlobalData.finance.armyCost + database.getGlobalData.finance.armySupply + database.getGlobalData.finance.fleetCost + database.getGlobalData.finance.fleetSupply) / database.getCityCount;
			inGold = database.getGlobalData.finance.currentGold / database.getCityCount;
            totals[resourceName].total = totals[resourceName].total ? totals[resourceName].total + inGold : inGold;
            totals[resourceName].income = totals[resourceName].income ? totals[resourceName].income + res - expense : res - expense;
			}
          })
        });
        var r = '';
        var finalSums = {income: 0, total: 0, day: 0, week: 0};
        $.each(totals, function(resourceName, data) {		
          var day = data.total + data.income * 24;
          var week = data.total + data.income * 168;
          r += Utils.format('<tr class="data">\n    <td><div class="icon {0}Image"></div></td>\n    <td>{1}</td>\n    <td>{2}</td>\n    <td>{3}</td>\n    <td><i>{4}</i></td>\n<td></td></tr>', [resourceName, Utils.FormatNumToStr(data.income, true, 0), Utils.FormatNumToStr(data.total, true, 0) , Utils.FormatNumToStr(day, true, 0) , Utils.FormatNumToStr(week, true, 0)]);
          finalSums.income += data.income;
          finalSums.total += data.total;
          finalSums.day += day;
          finalSums.week += week
        });
        if(r === '') {
          return ''
        } else {
          return Utils.format('<table>\n    <thead>\n    <td></td>\n    <td><b>1 {5}</b></td>\n    <td><b>{6}</b></td>\n    <td><b>+24 {7}</b></td>\n    <td><b> +1 {8}</b></td>\n  <td></td>  </thead>\n    <tbody>\n    {0}\n    <tfoot>\n    <td><b>\u03A3&nbsp;</b></td>\n    <td>{1}</td>\n    <td>{2}</td>\n    <td>{3}</td>\n    <td><i>{4}</i></td>\n  <td></td>  </tfoot>\n    </tbody>\n</td></table>', [r, Utils.FormatNumToStr(finalSums.income, true, 0) , Utils.FormatNumToStr(finalSums.total, true, 0) , Utils.FormatNumToStr(finalSums.day, true, 0) , Utils.FormatNumToStr(finalSums.week, true, 0), Constant.LanguageData[lang].hour, Constant.LanguageData[lang].total_, Constant.LanguageData[lang].hour, Constant.LanguageData[lang].week])
        }
      }
      function getProgressTip() {
        if (resourceName == 'population' || resourceName =='ui-corner-all'){return ''};
        var storage = city.maxResourceCapacities;
        var current = city.getResource(resourceName).getCurrent;
        var fulltime = (city.getResource(resourceName).getFullTime || 0 - city.getResource(resourceName).getEmptyTime) * 3600000;		
		var gold = '';
        var serverTyp = $('li.logout a[href="?view=normalServerStatus"]').text() ? 1 : 3;
        if(city.plundergold > 0 && serverTyp != 1) {	
		gold = '<td><img src="skin/resources/icon_gold.png" style="height: 12px;"></td><td>'+ Utils.FormatNumToStr(city.plundergold) +'</td><td>\u221E</td><td> « '+ Constant.LanguageData[lang].plundergold +'';
		}
        var progTip = '<table>\n <thead>\n <tr>\n <th><img src="skin/premium/safecapacity_small.png" style="height: 16px;"></th>\n <th><b>{12}</b></th>\n <th colspan="2"><b>{13}</b></th>\n        \n    </tr>\n    </thead>\n    <tbody>{0}{11}<tr class="total" style="border-top:1px solid #daa520">\n        <td>{9}</td>\n        <td>{1}</td>\n        <td>{2}</td>\n        <td><i>« {14}</i></td>\n    </tr>\n    <tr class="total">\n        <td>{10}</td>\n        <td>{3}</td>\n        <td>{4}</td>\n        <td><i>« {15}</i></td>\n    </tr>\n    <tr>\n        <td></td>\n        <td>{5}</td>\n        <td>{6}</td>\n        <td></td>\n    </tr>\n    </tbody>\n    <tfoot>\n    <tr>\n        <td></td>\n        <td></td>\n        <td>{7}</td>\n        <td>« {8}</td>\n    </tr>\n    </tfoot>\n</table>';
        var progTr = '<tr class="data">\n <td style="width:20px; background: url(\'{0}\'); background-size: auto 23px; background-position: -1px -1px; \n background-repeat: no-repeat;">\n </td>\n <td>{1}</td>\n <td>{2}</td>\n <td>« {3}</td>\n</tr>';
        var rows = '';
        $.each(storage.buildings, function(buildingName, data) {			
        rows += Utils.format(progTr, [Constant.BuildingData[buildingName].icon, Utils.FormatNumToStr(data.safe, false, 0), Utils.FormatNumToStr(data.storage, false, 0), data.lang])		  
        });
        return Utils.format(progTip, [rows, Utils.FormatNumToStr(storage.safe, false, 0), Utils.FormatNumToStr(storage.capacity, false, 0), Utils.FormatNumToStr(Math.min(storage.safe, current), false, 0), Utils.FormatNumToStr(Math.min(storage.capacity, current), false, 0), Utils.FormatNumToStr(Math.min(1, current / storage.safe) * 100, false, 2) + '%', Utils.FormatNumToStr(Math.min(1, current / storage.capacity) * 100, false, 2) + '%', Utils.FormatTimeLengthToStr(fulltime), fulltime < 0 ? Constant.LanguageData[lang].time_to_empty : Constant.LanguageData[lang].time_to_full, database.getGlobalData.hasPremiumFeature(Constant.Premium.STORAGECAPACITY_BONUS)? '<img src="skin/premium/b_premium_storagecapacity.jpg" style="width:18px;">' : '', database.getGlobalData.hasPremiumFeature(Constant.Premium.SAFECAPACITY_BONUS)? '<img src="skin/premium/b_premium_safecapacity.jpg" style="width:18px;">' : '', gold, Constant.LanguageData[lang].safe, Constant.LanguageData[lang].capacity, Constant.LanguageData[lang].maximum, Constant.LanguageData[lang].used])
      }
      function getConsumptionTooltip(consumption, force) {
        if((consumption === 0 && !force) || resourceName !== Constant.Resources.WINE) {
          return ''
        } else return Utils.format('<table>\n    <thead>\n    <th><div align="center">\n <img src="skin/resources/icon_{0}.png" style="height: 14px;">  <td><b>{1}</b></td><td><b>{2}</b></td><td><b>{3}</b></div><td></td></th>\n    </thead>\n    <tbody>\n  ' +
		                           '<tr class="data">\n            <td></td>\n            <td>{4}</td>\n            <td>{5}</td>\n            <td><i>{6}</i></td>\n        <td></td></tr>\n    </tbody>\n</table>',
		 [Constant.Resources.WINE, '1 ' + Constant.LanguageData[lang].hour, '1 ' + Constant.LanguageData[lang].day, '1 ' + Constant.LanguageData[lang].week, Utils.FormatNumToStr(-consumption, true, 0), Utils.FormatNumToStr(-consumption * 24, true, 0), Utils.FormatNumToStr(-consumption * 24 * 7, true, 0)])
      }
      function getProductionTip(income, force) {
	    var resName = resourceName;
	    if (resourceName == 'glass')
	      resName = 'crystal';
		var resBonus = resourceName;
	    if (resourceName == 'wood')
	      resBonus = database.getGlobalData.hasPremiumFeature(Constant.Premium.WOOD_BONUS);
	    if (resourceName == 'wine')
	      resBonus = database.getGlobalData.hasPremiumFeature(Constant.Premium.WINE_BONUS);
	    if (resourceName == 'marble')
	      resBonus = database.getGlobalData.hasPremiumFeature(Constant.Premium.MARBLE_BONUS);
	    if (resourceName == 'sulfur')
	      resBonus = database.getGlobalData.hasPremiumFeature(Constant.Premium.SULFUR_BONUS);
	    if (resourceName == 'glass')
	      resBonus = database.getGlobalData.hasPremiumFeature(Constant.Premium.CRYSTAL_BONUS);
        if(income === 0 && !force) {
          return ''
        } else return Utils.format('<table>\n    <thead>\n    <th><div align="center">\n <img src="skin/resources/icon_{0}.png" style="height: 14px;">  <td><b>{1}</b></td><td><b>{2}</b></td><td><b>{3}</b></div><td></td></th>\n    </thead>\n    <tbody>\n  ' +
                       			   '<tr class="data">\n        <td>{7}</td>\n        <td>{4}</td>\n        <td>{5}</td>\n        <td><i>{6}</i></td>\n    <td></td></tr>\n    </tbody>\n</table>',
		 [resourceName, '1 ' + Constant.LanguageData[lang].hour,'1 ' + Constant.LanguageData[lang].day, '1 ' + Constant.LanguageData[lang].week,  Utils.FormatNumToStr(income, true, 0), Utils.FormatNumToStr(income * 24, false, 0), Utils.FormatNumToStr(income * 24 * 7, false, 0), resBonus ? '<img src="skin/premium/b_premium_'+resName+'.jpg" style="width:18px;">' : ''])
      }
	  function getProductionConsumptionSubSumTip(income, consumption, force) {
	    if(income === 0 && consumption === 0 && !force) {
		  return ''
		} else if (resourceName !== Constant.Resources.WINE) {
		  return getProductionTip(income, force)
		} else if (income === 0) {
		  return getConsumptionTooltip(consumption, force)
        } else return Utils.format('<table>\n    <thead>\n    <th><div align="center">\n <img src="skin/resources/icon_{0}.png" style="height: 14px;">  <td><b>{1}</b></td><td><b>{2}</b></td><td><b>{3}</b></div><td></td></th>\n    </thead>\n    <tbody>\n  ' +
                       		       '<tr class="data">\n            <td>{14}</td>\n        <td>{4}</td>\n            <td>{5}</td>\n            <td><i>{6}</i></td>\n        <td></td></tr>\n    ' +
								   '<tr class="data">\n            <td></td>\n            <td>{7}</td>\n            <td>{8}</td>\n            <td><i>{9}</i></td>\n        <td></td></tr>\n    </tbody><tfoot> ' +
								   '<tr class="total">\n           <td>{10}</td>\n        <td>{11}</td>\n           <td>{12}</td>\n           <td><i>{13}</i></td>\n       <td></td></tr>\n    </tfoot>\n</table>',
		 [resourceName, '1 ' + Constant.LanguageData[lang].hour,'1 ' + Constant.LanguageData[lang].day, '1 ' + Constant.LanguageData[lang].week, Utils.FormatNumToStr(income, true, 0), Utils.FormatNumToStr(income * 24, false, 0), Utils.FormatNumToStr(income * 24 * 7, false, 0), Utils.FormatNumToStr(-consumption, true, 0), Utils.FormatNumToStr(-consumption * 24, true, 0), Utils.FormatNumToStr(-consumption * 24 * 7, true, 0), (income > consumption?'\u03A3 +&nbsp;':'\u03A3 -&nbsp;'), Utils.FormatNumToStr((income - consumption), false, 0), Utils.FormatNumToStr((income - consumption) * 24, false, 0), Utils.FormatNumToStr((income - consumption) * 24 * 7, false, 0),database.getGlobalData.hasPremiumFeature(Constant.Premium.WINE_BONUS)? '<img src="skin/premium/b_premium_wine.jpg" style="width:18px;">' : ''])
	  }
      function getImage(unitID) { 
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
	  events(Constant.Events.TAB_CHANGED).pub(database.settings.window.activeTab);
      events('cityChanged').sub(this.cityChange.bind(render));
      events(Constant.Events.BUILDINGS_UPDATED).sub(this.updateChangesForCityBuilding.bind(render));
      events(Constant.Events.GLOBAL_UPDATED).sub(this.updateGlobalData.bind(render));
      events(Constant.Events.MOVEMENTS_UPDATED).sub(this.updateMovementsForCity.bind(render));
      events(Constant.Events.RESOURCES_UPDATED).sub(this.updateResourcesForCity.bind(render));
      events(Constant.Events.CITY_UPDATED).sub(this.updateCityDataForCity.bind(render));
      events(Constant.Events.MILITARY_UPDATED).sub(this.updateChangesForCityMilitary.bind(render));
      events(Constant.Events.PREMIUM_UPDATED).sub(this.updateGlobalData.bind(render));
  },
  cityChange                    : function(cid) {
    var city = database.getCityFromId(cid);
    $('#empireBoard tr.current,#empireBoard tr.selected').removeClass('selected current');
    if(city) {
      this.getAllRowsForCity(city).addClass('selected').addClass((isChrome) ? 'current' : 'selected')
    }
  },
   getWorldmapTable : function(){
  },  
  getHelpTable : function(){
  	var lang = database.settings.languageChange.value; 
    var elems = '<div id="HelpTab"><div>';
    var features = '<div class="options"><span class="categories">'+ Constant.LanguageData[lang].Re_Order_Towns +'</span> '+ Constant.LanguageData[lang].On_any_tab +''
					 + '<hr>'					 
                     + '<span class="categories">'+ Constant.LanguageData[lang].Reset_Position +'</span> '+ Constant.LanguageData[lang].Right_click +''
					 + '<hr>'					 
                     + '<span class="categories">'+ Constant.LanguageData[lang].Hotkeys +'</span>'					 
                     + ''+ Constant.LanguageData[lang].Navigate +'<br>'
                     + ''+ Constant.LanguageData[lang].Navigate_to_City +'<br>'
                     + ''+ Constant.LanguageData[lang].Navigate_to +'<br>'
                     + ''+ Constant.LanguageData[lang].Navigate_to_World +'<br>'					 
                     + ''+ Constant.LanguageData[lang].Spacebar +''
					 + '<hr>'
                     + '<span class="categories">'+ Constant.LanguageData[lang].Initialize_Board +'</span>'
					 + ' 1. <span id="helpTownhall" class="clickable"><b>> '+ Constant.LanguageData[lang].click_ +' <</b></span> '+ Constant.LanguageData[lang].on_your_Town_Hall +'<br>'
					 + ' 2. <span id="helpMuseum" class="clickable"><b>> '+ Constant.LanguageData[lang].click_ +' <</b></span> '+ Constant.LanguageData[lang].on_Museum +'<br>'
					 + ' 3. <span id="helpResearch" class="clickable"><b>> '+ Constant.LanguageData[lang].click_ +' <</b></span> '+ Constant.LanguageData[lang].on_Research_Advisor +'<br>'
					 + ' 4. <span id="helpPalace" class="clickable"><b>> '+ Constant.LanguageData[lang].click_ +' <</b></span> '+ Constant.LanguageData[lang].on_your_Palace +'<br>'
					 + ' 5. <span id="helpFinance" class="clickable"><b>> '+ Constant.LanguageData[lang].click_ +' <</b></span> '+ Constant.LanguageData[lang].on_your_Finance +'<br>'
					 + ' 6. <span id="helpShop" class="clickable"><b>> '+ Constant.LanguageData[lang].click_ +' <</b></span> '+ Constant.LanguageData[lang].on_the_Ambrosia +'<br>'
					 + ' 7. <span id="helpMilitary" class="clickable"><b>> '+ Constant.LanguageData[lang].click_ +' <</b></span> '+ Constant.LanguageData[lang].on_the_Troops +''					 
                     + '</div>';
    elems += features + '<div style="clear:left"></div>';
    elems += '</div></div>'
    return elems
  },
  getSettingsTable : function(){
  	var lang = database.settings.languageChange.value;
	var wineOut = '';
	var server = ikariam.Nationality();
	if (server == 'de') {
	wineOut = ' <span><input type="checkbox" id="empire_wineOut" ' + (database.settings.wineOut.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].wineOut_description +'"> '+ Constant.LanguageData[lang].wineOut +'</nobr></span>';
	}
    var elems = '<div id="SettingsTab"><div>';
    var inits = '<div class="options" style="clear:right"><span class="categories">'+ Constant.LanguageData[lang].building_category +'</span>'
                     + ' <span><input type="checkbox" id="empire_alternativeBuildingList" ' + (database.settings.alternativeBuildingList.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].alternativeBuildingList_description +'"> '+ Constant.LanguageData[lang].alternativeBuildingList +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_compressedBuildingList" ' + (database.settings.compressedBuildingList.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].compressedBuildingList_description +'"> '+ Constant.LanguageData[lang].compressedBuildingList +'</nobr></span>'
	        		 + ' <hr>' 
					 + ' <span class="categories">'+ Constant.LanguageData[lang].resource_category +'</span>'
                     + ' <span><input type="checkbox" id="empire_hourlyRess" ' + (database.settings.hourlyRess.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].hourlyRes_description +'"> '+ Constant.LanguageData[lang].hourlyRes +'</nobr></span>'
                     + ' '+ wineOut +''
                     + ' <span><input type="checkbox" id="empire_dailyBonus" ' + (database.settings.dailyBonus.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].dailyBonus_description +'"> '+ Constant.LanguageData[lang].dailyBonus +'</nobr></span>'
                     + ' <span><select id="empire_wineWarningTime"><option value="0"' + (database.settings.wineWarningTime.value == 0 ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].off +'</option><option value="12"' + (database.settings.wineWarningTime.value == 12 ? 'selected=selected' : '' ) + '> 12'+ Constant.LanguageData[lang].hour +'</option><option value="24"' + (database.settings.wineWarningTime.value== 24 ? 'selected=selected' : '' ) + '> 24'+ Constant.LanguageData[lang].hour +'</option><option value="36"' + (database.settings.wineWarningTime.value== 36 ? 'selected=selected' : '' ) + '> 36'+ Constant.LanguageData[lang].hour +'</option><option value="48"' + (database.settings.wineWarningTime.value== 48 ? 'selected=selected' : '' ) + '> 48'+ Constant.LanguageData[lang].hour +'</option></select><nobr data-tooltip="'+ Constant.LanguageData[lang].wineWarningTime_description +'"> '+ Constant.LanguageData[lang].wineWarningTime +'</nobr></span>'
					 + ' <hr>'
                     + ' <span class="categories">'+ Constant.LanguageData[lang].language_category +'</span>'
                     + ' <span><select id="empire_languageChange"><option value="en"' + (database.settings.languageChange.value == 'en' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].en +'</option><option value="de"' + (database.settings.languageChange.value == 'de' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].de +'</option><option value="it"' + (database.settings.languageChange.value == 'it' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].it +'</option><option value="el"' + (database.settings.languageChange.value == 'el' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].el +'</option><option value="es"' + (database.settings.languageChange.value == 'es' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].es +'</option><option value="fr"' + (database.settings.languageChange.value == 'fr' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].fr +'</option><option value="pt"' + (database.settings.languageChange.value == 'pt' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].pt +'</option><option value="nl"' + (database.settings.languageChange.value == 'nl' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].nl +'</option><option value="ro"' + (database.settings.languageChange.value == 'ro' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].ro +'</option><option value="ru"' + (database.settings.languageChange.value == 'ru' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].ru +'</option><option value="cz"' + (database.settings.languageChange.value == 'cz' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].cz +'</option><option value="pl"' + (database.settings.languageChange.value == 'pl' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].pl +'</option><option value="tr"' + (database.settings.languageChange.value == 'tr' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].tr +'</option><option value="ar"' + (database.settings.languageChange.value == 'ar' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].ar +'</option><option value="ir"' + (database.settings.languageChange.value == 'ir' ? 'selected=selected' : '' ) + '> '+ Constant.LanguageData[lang].ir +'</option></select><nobr data-tooltip="'+ Constant.LanguageData[lang].languageChange_description +'"> '+ Constant.LanguageData[lang].languageChange +'</nobr></span>'	  
                     + '</div>'; 
    var features = '<div class="options">'
                     + ' <span class="categories">'+ Constant.LanguageData[lang].visibility_category +'</span>'
                     + ' <span><input type="checkbox" id="empire_hideOnWorldView" ' + (database.settings.hideOnWorldView.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].hideOnWorldView_description +'"> '+ Constant.LanguageData[lang].hideOnWorldView +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_hideOnIslandView" ' + (database.settings.hideOnIslandView.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].hideOnIslandView_description +'"> '+ Constant.LanguageData[lang].hideOnIslandView +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_hideOnCityView" ' + (database.settings.hideOnCityView.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].hideOnCityView_description +'"> '+ Constant.LanguageData[lang].hideOnCityView +'</nobr></span>'					 
					 + ' <hr>'
					 + ' <span class="categories">'+ Constant.LanguageData[lang].army_category +'</span>'
                     + ' <span><input type="checkbox" id="empire_fullArmyTable" ' + (database.settings.fullArmyTable.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].fullArmyTable_description +'"> '+ Constant.LanguageData[lang].fullArmyTable +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_playerInfo" ' + (database.settings.playerInfo.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].playerInfo_description +'"> '+ Constant.LanguageData[lang].playerInfo +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_onIkaLogs" ' + (database.settings.onIkaLogs.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].onIkaLogs_description +'"> '+ Constant.LanguageData[lang].onIkaLogs +'</nobr></span>'
					 + ' <hr>'
					 + ' <span class="categories">'+ Constant.LanguageData[lang].global_category +'</span>'					 
                     + ' <span><input type="checkbox" id="empire_autoUpdates" ' + (database.settings.autoUpdates.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].autoUpdates_description +'"> '+ Constant.LanguageData[lang].autoUpdates +'</nobr></span>'
                     + '</div>';
    var display = '<div class="options">'
                     + ' <span class="categories">'+ Constant.LanguageData[lang].display_category +'</span>'
                     + ' <span><input type="checkbox" id="empire_onTop" ' + (database.settings.onTop.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].onTop_description +'"> '+ Constant.LanguageData[lang].onTop +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_windowTennis" ' + (database.settings.windowTennis.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].windowTennis_description +'"> '+ Constant.LanguageData[lang].windowTennis +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_smallFont" ' + (database.settings.smallFont.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].smallFont_description +'"> '+ Constant.LanguageData[lang].smallFont +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_newsTicker" ' + (database.settings.newsTicker.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].newsticker_description +'"> '+ Constant.LanguageData[lang].newsticker +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_event" ' + (database.settings.event.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].event_description +'"> '+ Constant.LanguageData[lang].event +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_logInPopup" ' + (database.settings.logInPopup.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].logInPopup_description +'"> '+ Constant.LanguageData[lang].logInPopup +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_birdSwarm" ' + (database.settings.birdSwarm.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].birdswarm_description +'"> '+ Constant.LanguageData[lang].birdswarm +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_controlCenter" ' + (database.settings.controlCenter.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].control_description +'"> '+ Constant.LanguageData[lang].control +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_withoutFable" ' + (database.settings.withoutFable.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].unnecessaryTexts_description +'"> '+ Constant.LanguageData[lang].unnecessaryTexts +'</nobr></span>'
                     + ' <span><input type="checkbox" id="empire_ambrosiaPay" ' + (database.settings.ambrosiaPay.value ? 'checked="checked"' : '') + '/><nobr data-tooltip="'+ Constant.LanguageData[lang].ambrosiaPay_description +'"> '+ Constant.LanguageData[lang].ambrosiaPay +'</nobr></span>'
					 + '</div>';
    elems += features + inits + display + '<div style="clear:left"></div>';
    elems += '</div></div>'
    elems += '<div style="clear:left"><hr><p>&nbsp; '+ Constant.LanguageData[lang].current_Version +' <b>&nbsp;'+ empire.version +'</b></p><p>&nbsp; '+ Constant.LanguageData[lang].ikariam_Version +' <b style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=version\')">&nbsp;'+ ikariam.GameVersion() +'</b></p></div><br>'
    elems += '<div class="buttons">' + '<button data-tooltip="'+ Constant.LanguageData[lang].reset +'" id="empire_Reset_Button">Reset</button>' + '<button data-tooltip="'+ Constant.LanguageData[lang].goto_website +'" id="empire_Website_Button">'+ Constant.LanguageData[lang].website +'</button>' + '<button data-tooltip="'+ Constant.LanguageData[lang].Check_for_updates +'" id="empire_Update_Button">'+ Constant.LanguageData[lang].check +'</button>' + '<button data-tooltip="'+ Constant.LanguageData[lang].Report_bug +'" id="empire_Bug_Button">'+ Constant.LanguageData[lang].report +'</button>' + '<button data-tooltip="'+ Constant.LanguageData[lang].save_settings +'" id="empire_Save_Button" onclick="ajaxHandlerCall(\'?view=city&oldBackgroundView\')">'+ Constant.LanguageData[lang].save +'</button>'
    return elems
  },
  DrawHelp : function(){
    	var lang = database.settings.languageChange.value;
    $('#HelpTab').html(this.getHelpTable(
	    )).on("click", "#helpTownhall",function() {
        ikariam.loadUrl(ikariam.viewIsCity, "city", ikariam.getCurrentCity.getBuildingFromName(Constant.Buildings.TOWN_HALL).getUrlParams)
        }).on("click", "#helpMilitary",function() {
        ikariam.loadUrl(ikariam.viewIsCity, "city", {view:'cityMilitary', activeTab:'tabUnits'})
        }).on("click", "#helpMuseum",function() {
        ikariam.loadUrl(ikariam.viewIsCity, "city", {view:'culturalPossessions_assign',activeTab:'tab_culturalPossessions_assign'})
        }).on("click", "#helpResearch",function() {
        ikariam.loadUrl(ikariam.viewIsCity, "city", {view:'researchAdvisor'})
        }).on("click", "#helpPalace",function() {
            var capital = ikariam.getCapital;
            if (capital){
            ikariam.loadUrl(ikariam.viewIsCity, "city", capital.getBuildingFromName(Constant.Buildings.PALACE).getUrlParams)			
            }
            else alert(Constant.LanguageData[lang].alert_palace)
        }).on("click", "#helpFinance",function() {
        ikariam.loadUrl(ikariam.viewIsCity, "city", {view:'finances'})
        }).on("click", "#helpShop",function() {
        ikariam.loadUrl(ikariam.viewIsCity, "city", {view:'premium'})		
        });
  },  
  DrawSettings                  : function() {
    	var lang = database.settings.languageChange.value;
	  	$('#SettingsTab').html(this.getSettingsTable(
	    )).on("change", "#empire_onTop", function() {
        database.settings.onTop.value = this.checked;
        render.mainContentBox.css('z-index', this.checked ? 65112 : 61);
        }).on("change", "#empire_windowTennis", function() {
        database.settings.windowTennis.value = this.checked;
            if (!this.checked){
            render.mainContentBox.css('z-index', database.settings.onTop.value ? 65112 : 61);
            }
            else {
            render.mainContentBox.trigger('mouseenter')
            }
        }).on("change", "#empire_fullArmyTable", function() {
        database.settings.fullArmyTable.value = this.checked;
        render.updateCitiesArmyData()
        }).on("change", "#empire_playerInfo", function() {
        database.settings.playerInfo.value = this.checked;
        }).on("change", "#empire_onIkaLogs", function() {
        database.settings.onIkaLogs.value = this.checked;
        }).on("change", "#empire_controlCenter", function() {
        database.settings.controlCenter.value = this.checked;
        }).on("change", "#empire_withoutFable", function() {
        database.settings.withoutFable.value = this.checked;
        }).on("change", "#empire_ambrosiaPay", function() {
        database.settings.ambrosiaPay.value = this.checked;
        }).on("change", "#empire_hideOnWorldView", function() {
        database.settings.hideOnWorldView.value = this.checked;
        }).on("change", "#empire_hideOnIslandView", function() {
        database.settings.hideOnIslandView.value = this.checked;
        }).on("change", "#empire_hideOnCityView", function() {
        database.settings.hideOnCityView.value = this.checked;
        }).on("change", "#empire_autoUpdates", function() {
        database.settings.autoUpdates.value = this.checked;
        }).on("change", "#empire_smallFont", function() {
        database.settings.smallFont.value = this.checked;
            if(this.checked) {GM_addStyle("#empireBoard {font-size:8pt}")}
			else {GM_addStyle("#empireBoard {font-size:inherit}")}
        }).on("change", "#empire_newsTicker", function() {
        database.settings.newsTicker.value = this.checked;
        }).on("change", "#empire_event", function() {
        database.settings.event.value = this.checked;
        }).on("change", "#empire_birdSwarm", function() {
        database.settings.birdSwarm.value = this.checked;
        }).on("change", "#empire_hourlyRess", function() {
        database.settings.hourlyRess.value = this.checked;
        }).on("change", "#empire_wineOut", function() {
        database.settings.wineOut.value = this.checked;
        }).on("change", "#empire_dailyBonus", function() {
        database.settings.dailyBonus.value = this.checked;
        }).on("change", "#empire_logInPopup", function() {
        database.settings.logInPopup.value = this.checked;
            if(this.checked)
            alert(Constant.LanguageData[lang].alert_daily)
        }).on("change", "#empire_alternativeBuildingList", function() {
        database.settings.alternativeBuildingList.value = this.checked;
        render.cityRows.building = {};
		if (database.settings.alternativeBuildingList.value == this.checked && database.settings.compressedBuildingList.value == 1){
            alert(Constant.LanguageData[lang].alert)
            replace(database.settings.compressedBuildingList.value == this.checked)
                }		
    $('table.buildings').html(render.getBuildingTable());
        render.updateCitiesBuildingData();				
    $.each(database.cities, function(cityId, city) {
        render.setCityName(city);
        render.setActionPoints(city);			
    $.each(database.settings[Constant.Settings.CITY_ORDER].value, function (idx, val) {
        $('#' + 'building' + '_' + val).appendTo($('#' + 'building' + '_' + val).parent())
            })
          })
        }).on("change", "#empire_compressedBuildingList", function() {
      database.settings.compressedBuildingList.value = this.checked;
		if (database.settings.compressedBuildingList.value == this.checked && database.settings.alternativeBuildingList.value == 1){
            alert(Constant.LanguageData[lang].alert)
            replace(database.settings.alternativeBuildingList.value == this.checked)
                }
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
    }).on('change',"#empire_wineWarningTime", function() {
        database.settings.wineWarningTime.value = this.value;
        }).on('change',"#empire_languageChange", function() { 
        database.settings.languageChange.value = this.value;
        }).on("click", "#empire_Website_Button", function() {
        GM_openInTab('http://userscripts.org:8080/scripts/show/' + empire.scriptId);
        }).on("click", "#empire_Reset_Button",function() {
        empire.HardReset();
        }).on("click","#empire_Update_Button", function() {
        empire.CheckForUpdates.call(empire, true);
        }).on("click","#empire_Bug_Button", function() {
        GM_openInTab('http://userscripts.org:8080/scripts/discuss/138078');
        }).on("change", "input[type='checkbox']", function(){
                  this.blur()
       });
	$(document).ready(function() {  //todo
        if ($('#empire_dailyBonus').attr('checked') && $('#dailyActivityBonus form')) {
			$('#dailyActivityBonus form').submit();
		}
		if ($('#empire_logInPopup').attr('checked')) {
			GM_addStyle('#multiPopup {display: none;}');
		}
		if ($('#empire_dailyBonus').attr('checked') && $('#empire_logInPopup').attr('checked')) {
			GM_addStyle('#multiPopup {display: none;}');
		}
	});
    $("#empire_Reset_Button").button({icons: {primary: "ui-icon-alert"}, text: true});
    $("#empire_Website_Button").button({icons: {primary: "ui-icon-home"}, text: true});
    $("#empire_Update_Button").button({icons: {primary: "ui-icon-info"}, text: true});
    $("#empire_Bug_Button").button({icons: {primary: "ui-icon-notice"}, text: true});
    $("#empire_Save_Button").button({icons: {primary: "ui-icon-check"}, text: true});	
    $("#empire_Allianz").button({text: true});
    $("#empire_Allianz_einlesen").button({text: true});
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
    if(!(ikariam.viewIsWorld && database.settings.hideOnWorldView.value || ikariam.viewIsIsland && database.settings.hideOnIslandView.value || ikariam.viewIsCity && database.settings.hideOnCityView.value) && database.settings.window['visible'])
      this.mainContentBox.fadeToggle('slow');
  },
  SaveDisplayOptions            : function() {
    if(database.settings)
      try {
        database.settings.addOptions({window: {
          left     : render.mainContentBox.css('left'),
          top      : render.mainContentBox.css('top'),
          visible  : (ikariam.viewIsWorld && database.settings.hideOnWorldView.value || ikariam.viewIsIsland && database.settings.hideOnIslandView.value || ikariam.viewIsCity && database.settings.hideOnCityView.value) ? database.settings.window.visible : (render.mainContentBox.css('display') != 'none'),
          activeTab: render.$tabs.tabs('option', 'active')}
        })
      } catch(e) {
        empire.error('SaveDisplayOptions', e)
      }
  },
  SidePanelButton               : function() {
    $('#js_viewCityMenu').find('li.empire_Menu')
	    .on("click", function(event) {render.ToggleMainBox();})
	    .on("contextmenu", function(event) {
	      event.preventDefault();
	      database.settings.window.left = 110;
	      database.settings.window.top = 200;
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

        index = [49, 50, 51, 52, 53].indexOf(event.which);
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
        var keycodes = '';
        var codeTyp = ikariam.Nationality();
          switch(codeTyp){
            case 'en':
			case 'gr':
			case 'ro':
			case 'ru': 
			case 'pl':
			case 'ir':
			case 'ae':
			case 'au':
			case 'br':
			case 'hk':
			case 'hu': // code 0,0 ü ó 
			case 'il':
			case 'lt':
			case 'nl':
			case 'tw':
			case 'us':
		      keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 173, 61]; //EN - =
              break;
            case 'de':
		      keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 63, 192]; //DE ß ´
              break;
            case 'it':
			  keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 222, 160]; //IT + \ 
              break;
            case 'es':
			case 'rs':
			case 'si':
			  keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 222, 171]; //ES, RS, SI ' +
              break;
            case 'ar':
			case 'cl':
			case 'co':
			case 'mx':
			case 'pe':
            case 'pt':
			case 've':
			  keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 222, 0]; //AR, CL, CO, MX, VE, PE ' ¿  PT ' «
              break;
            case 'fr':
			  keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 169, 61]; //FR ) =
              break;
            case 'cz':
			  keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 61, 169]; //CZ = )
              break;
            case 'bg':
			  keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 173, 190]; //BG - . 
              break;
            case 'dk':
			case 'fi':
			case 'ee':
			case 'se':
			  keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 171, 192]; //DK, FI, EE, SE + ´
              break;
            case 'no':
			  keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 171, 222]; //NO + \ 
              break;
            case 'tr':
			  keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 170, 173]; //TR * - 
              break;
            case 'sk':
			  keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 61, 0]; //SK = ´
              break;
          }
        index = keycodes.indexOf(event.which);
        if(index !== -1) {
          if(index < database.settings.cityOrder.value.length) {
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
	  $('#WorldmapTab').html(this.getWorldmapTable());	  
      this.DrawSettings();
      this.DrawHelp();	  
      this.toolTip.init();
      $('#ResTab, #BuildTab, #ArmyTab').each(function () {
        $(this).sortable({
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
                           stop:function (event, ui) {
                             ui.item.parents("div[role=tabpanel]").css("width", "");
                             ui.item.children("td").css("width", "").css("border", "");
                             database.settings[Constant.Settings.CITY_ORDER].value = ui.item.parents('.ui-sortable').sortable('toArray').map(function (item) {
                               return parseInt(item.split('_').pop())
                             });
                             $.each(['building','resource','army'], function (idx, type) {
                                 if ($(this).parents('.ui-sortable').attr('id') !== type) {
                                   $.each(database.settings[Constant.Settings.CITY_ORDER].value, function (idx, val) {
                                     $('#' + type + '_' + val).appendTo($('#' + type + '_' + val).parent())
                                   })
                                 }
                               });
                           }
                         })
      });
      $.each(['building','resource','army'], function (idx, type) {
          $.each(database.settings[Constant.Settings.CITY_ORDER].value, function (idx, val) {
            $('#' + type + '_' + val).appendTo($('#' + type + '_' + val).parent())
          })
        });
    }
    this.AttachClickHandlers(); 
  },
  getResourceTable              : function() {
  	var lang = database.settings.languageChange.value;
    var header = '<colgroup span="3"/>\n   <colgroup span="3"/>\n    <colgroup span="2"/>\n    <colgroup span="2"/>\n    <colgroup span="2"/>\n    <colgroup span="2"/>\n    <colgroup span="2"/>\n   <colgroup span="2"/>\n    <colgroup span="2"/>\n<thead>\n<tr class="header_row">\n    <th class="city_name" data-tooltip="{10}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=18\')">{0}</th>\n    <th class="action_points icon actionpointImage" data-tooltip="{1}"></th>\n    <th class="empireactions">\n       <div class="trading" data-tooltip="'+ Constant.LanguageData[lang].transport +'" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=militaryAdvisor\')"></div>\n<div class="agora" data-tooltip="'+ Constant.LanguageData[lang].agora +'" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=diplomacyIslandBoard&amp=&islandId\')"></div> <div class="member" data-tooltip="'+ Constant.LanguageData[lang].member +'" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=diplomacyAllyMemberlist\')"></div>\n  </th>\n    <th class="citizen_header icon populationImage" data-tooltip="{2}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=3\');return false;"></th>\n    \n    <th class="growth_header icon growthImage" data-tooltip="'+ Constant.LanguageData[lang].satisfaction +'"   style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=3\');return false;"></th>\n    <th class="research_header icon researchImage" data-tooltip="{3}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=researchAdvisor\');return false;"></th>\n    <th class="gold_header icon goldImage" colspan="2" data-tooltip="{4}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=finances\');return false;"></th>\n    <th class="wood_header icon woodImage" colspan="2" data-tooltip="{5}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=5\');return false;"></th>\n    <th class="wine_header icon wineImage" colspan="2" data-tooltip="{6}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=6\');return false;"></th>\n    <th class="marble_header icon marbleImage" colspan="2" data-tooltip="{7}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=6\');return false;"></th>\n    <th class="glass_header icon glassImage" colspan="2" data-tooltip="{8}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=6\');return false;"></th>\n    <th class="sulfur_header icon sulfurImage" colspan="2" data-tooltip="{9}" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=ikipedia&helpId=6\');return false;"></th>\n  \n</tr>\n</thead>';
    var table = '<table class="resources">\n    {0}\n   <tbody>{1}</tbody>\n    <tfoot>{2}</tfoot>\n</table>';
	var resourceRow = '<tr id="resource_{0}">\n    <td class="city_name">\n        <span></span>\n        <span class="clickable"></span>\n        <sub></sub>\n        <span class="Red" data-tooltip="{6}">&nbsp;&nbsp;<b>{5}</b>&nbsp;&nbsp;</span>\n         </td>\n    <td class="action_points"><span class="ap"></span>&nbsp;<br><span class="garrisonlimit"  data-tooltip="dynamic"><img height="18" hspace="3"></span></td>\n    <td class="empireactions">\n        <div class="worldmap" data-tooltip="'+ Constant.LanguageData[lang].to_world +'" style="cursor:pointer;"></div>        <div class="city" data-tooltip="'+ Constant.LanguageData[lang].to_town_hall +' {2}" style="cursor:pointer;"></div>\n    <div class="island" data-tooltip="'+ Constant.LanguageData[lang].to_island +'" style="cursor:pointer;"></div>\n  <br> <div class="islandwood" data-tooltip="'+ Constant.LanguageData[lang].to_saw_mill +'" style="cursor:pointer;"></div>\n    <div class="islandgood"  style="background: url(skin/resources/icon_{3}.png) no-repeat center center; background-size: 18px auto; cursor: pointer;" data-tooltip="'+ Constant.LanguageData[lang].to_mine +'"></div>\n <div class="transport" data-tooltip="'+ Constant.LanguageData[lang].transporting +' {2}" style="cursor:pointer;"></div>\n        </td>\n    <td class="population" data-tooltip="dynamic">\n        <span class= "pop" data-tooltip="dynamic"></span>\n        <span></span>\n        <div class="progressbarPop ui-progressbar ui-widget ui-widget-content ui-corner-all" data-tooltip="dynamic">\n            <div class="ui-progressbar-value ui-widget-header ui-corner-left" style="width: 95%"></div>\n        </div>\n    </td>\n    \n    <td class="population_happiness">   <span class="happy"  data-tooltip="dynamic"><img align=right height="18" hspace="8" vspace="2"></span><br><span class="growth clickbar"></span>\n </td>\n    <td class="research" data-tooltip="dynamic">\n        <span class="scientists" data-tooltip="dynamic"></span>\n        <span></span>\n    {4}   \n   </div>\n    </td>\n    {1}\n    </tr>\n'; 
    var resourceCell = '<td class="resource {0}">\n    <span class="icon safeImage"></span>\n    <span class="current"></span>\n   <span class="incoming" data-tooltip="dynamic"></span>\n    <div class="progressbar ui-progressbar ui-widget ui-widget-content ui-corner-all" data-tooltip="dynamic">\n    <div class="ui-progressbar-value ui-widget-header ui-corner-left" style="width: 95%"></div>\n    </div>\n  </td>\n<td class="resource {0}">\n    <span class="prodconssubsum production Green" data-tooltip="dynamic"></span>\n    <span class="prodconssubsum consumption Red" data-tooltip="dynamic"></span>\n    <span class="emptytime Red"></span>\n</td>'; 
    var footer = '<tr>\n    <td colspan="2"></td>\n   <td id="t_sigma" class="total" data-tooltip="dynamic">Σ</td>\n    <td id="t_population" class="total"></td><td id="t_growth" class="total"></td>\n    <td id="t_research" class="total" data-tooltip="dynamic"></td>\n        <td id="t_currentgold" class="total"></td>\n    <td id="t_goldincome" class="total" data-tooltip="dynamic">\n        <span class="Green"></span>\n      <span class="Red"></span>\n         <td id="t_currentwood" class="total"></td>\n    <td id="t_woodincome" class="total" data-tooltip="dynamic">\n        <span class="Green"></span>\n        <span class="Red"></span>\n    </td>\n    <td id="t_currentwine" class="total"></td>\n    <td id="t_wineincome" class="total" data-tooltip="dynamic">\n        <span class="Green"></span>\n        <span class="Red"></span>\n    </td>\n    <td id="t_currentmarble" class="total"></td>\n    <td id="t_marbleincome" class="total"data-tooltip="dynamic">\n        <span class="Green"></span>\n        <span class="Red"></span>\n    </td>\n    <td id="t_currentglass" class="total"></td>\n    <td id="t_glassincome" class="total" data-tooltip="dynamic">\n        <span class="Green"></span>\n        <span class="Red"></span>\n    </td>\n    <td id="t_currentsulfur" class="total"></td>\n    <td id="t_sulfurincome" class="total" data-tooltip="dynamic">\n        <span class="Green"></span>\n        <span class="Red"></span>\n    </td>\n</tr>';

    return Utils.format(table, [getHead(), getBody(), getFooter()]);  

    function getHead() {
      return Utils.format(header, [Constant.LanguageData[lang].towns, Constant.LanguageData[lang].actionP, Constant.LanguageData[lang].population, Constant.LanguageData[lang].researchP, Constant.LanguageData[lang].finances_, Constant.LanguageData[lang].wood_, Constant.LanguageData[lang].wine_, Constant.LanguageData[lang].marble_, Constant.LanguageData[lang].crystal_, Constant.LanguageData[lang].sulphur_, database.getGlobalData.getLocalisedString('Current form')])
    }
	
    function getBody() {
      var rows = '';
      $.each(database.cities, function(cityId, city) {
        var resourceCells = '';
	    var info = city.isUpgrading == true ? '!' : '';
        var progSci = '';
            if(this.getBuildingFromName(Constant.Buildings.ACADEMY)) {
            progSci = '<div class="progressbarSci ui-progressbar ui-widget ui-widget-content ui-corner-all" data-tooltip="dynamic">\n <div class="ui-progressbar-value ui-widget-header ui-corner-left" style="width: 95%"></span></div>';
           } 			   
        $.each(Constant.Resources, function(key, resourceName) {
          resourceCells += Utils.format(resourceCell, [resourceName])
        });		
        rows += Utils.format(resourceRow, [city.getId, resourceCells, city._name, city.getTradeGood, progSci, info, info ? Constant.LanguageData[lang].constructing : ''])
      });
      return rows; 
    } 
    function getFooter() {
      return footer;
    }
  },
  getArmyTable                  : function() {
  	var lang = database.settings.languageChange.value;  
    var table = '<table class="army">\n    {0}\n    <tbody>{1}</tbody>\n    <tfoot>{2}</tfoot>\n</table>';
    var headerRow = '<thead><tr class="header_row">\n    <th class="city_name">{0}</th>\n    <th data-tooltip="{1}" class="icon actionpointImage action_points" >\n <th class="empireactions" colspan="2">\n       <div class="spio" data-tooltip="'+ Constant.LanguageData[lang].espionage +'" style="cursor:pointer;"></div>\n<div class="combat"data-tooltip="'+ Constant.LanguageData[lang].combat +'" style="cursor:pointer;"></div>\n  </th><th class="expenses_header icon expensesImage"data-tooltip="'+ Constant.LanguageData[lang].expenses +'"></th>\n\n    {2}\n</tr></thead>';
    var headerCell = '<th data-tooltip="{0}" style="background:url(\'{1}\')  no-repeat center center; background-size: auto 24px; cursor: pointer;" colspan="2" class="army unit icon {2}" onclick="ajaxHandlerCall(\'?view=unitdescription&{5}Id={3}&helpId={4}\'); return false;">&nbsp;</th>\n\n';
    var bodyRow = '<tr id="army_{0}">\n    <td class="city_name"><img><span class="clickable"></span><sub></sub></td>\n    <td class="action_points"><span class="ap"></span>&nbsp;&nbsp;<br><span class="garrisonlimit"  data-tooltip="dynamic"><img height="18" hspace="5"></span></td>\n    <td class="empireactions">\n     <div class="deploymentarmy"data-tooltip="'+ Constant.LanguageData[lang].transporting_units +'&nbsp;{2}" style="cursor:pointer;"></div>\n  <br>  <div class="deploymentfleet" data-tooltip="'+ Constant.LanguageData[lang].transporting_fleets +'&nbsp;{2}" style="cursor:pointer;"></div>\n</td> \n <td class="empireactions">{3} <br> {4}  \n    </td>\n <td class="expenses"> {5} </td>\n   {1}\n</tr>';
    var bodyCell = '</td><td style="" class="army unit {0}">\n    <span>{1}</span>\n</td>\n<td style="" class="army movement {0}" data-tooltip="dynamic">\n    <span class="More Green {0}">{2}</span>\n  <br>  <span class="More Blue {0}">{3}</span>\n</td>';
	var costCell = '';
    var footerRow = '<tr class="totals_row">\n    <td class="city_name"></td>\n    <td></td>\n   <td class="sigma" colspan="2">Σ</td><td>&nbsp;{1}&nbsp;</td>\n    {0}\n</tr>'; 
    var footerCell = '<td class="army total {0} unit">\n    <span></span>\n</td>\n<td style="" class="army total {0} movement">\n    <span class="More Green"></span>\n    <span class="More Blue"></span>\n</td>';

    return Utils.format(table, [getHead(), getBody(), getFooter()]);

    function getHead() {
      var headerCells = '';
      var cols = '<colgroup span=4/><colgroup></colgroup>';
      for(var category in Constant.unitOrder) {
        cols += '<colgroup>';
        $.each(Constant.unitOrder[category], function(index, value) {
		   var helpId = 9;
	       var unit = 'unit';
	       if (Constant.UnitData[value].id < 300){
	       helpId = 10;
	       unit = 'ship';
	       }
          headerCells += Utils.format(headerCell, [database.getGlobalData.getLocalisedString(value), getImage(value), value, Constant.UnitData[value].id, helpId, unit]);
          cols += '<col><col>'
        });
        cols += '</colgroup>' 
      }
      return cols + Utils.format(headerRow, [Constant.LanguageData[lang].towns, Constant.LanguageData[lang].actionP, headerCells])
    }

    function getBody() {
      var body = '';
      $.each(database.cities, function(cityId, city) {
        var rowCells = '';
        var divbarracks = '';
            if(this.getBuildingFromName(Constant.Buildings.BARRACKS)) {
            divbarracks = '<div class="barracks" data-tooltip="'+ Constant.LanguageData[lang].to_barracks +'&nbsp;{2}" style="cursor:pointer;"></div>';
           }
        var divshipyard = '&nbsp;';
            if(this.getBuildingFromName(Constant.Buildings.SHIPYARD)) {
            divshipyard = '<div class="shipyard" data-tooltip="'+ Constant.LanguageData[lang].to_shipyard +'&nbsp;{2}" style="cursor:pointer;"></div>';
           }
		var cost = 0;
        for(var category in Constant.unitOrder) {
          $.each(Constant.unitOrder[category], function(index, value) {
            var builds = city.getUnitBuildsByUnit(value);
            rowCells += Utils.format(bodyCell, [value, city.military.getUnits.getUnit(value) || '', builds[value] ? builds[value] : '', ''])
          })
        }
        body += Utils.format(bodyRow, [city.getId, rowCells, city._name, divbarracks, divshipyard, cost])
      });
      return body
    }

    function getFooter() {
      var footerCells = '';
      var expense = Utils.FormatNumToStr(database.getGlobalData.finance.armyCost + database.getGlobalData.finance.fleetCost);	  
      for(var category in Constant.unitOrder) {
        $.each(Constant.unitOrder[category], function(index, value) {
          footerCells += Utils.format(footerCell, [value])
        })
      }
      return Utils.format(footerRow, [footerCells, expense])
    }

    function getImage(unitID) {
      return (Constant.UnitData[unitID].type == 'fleet') ? 'skin/characters/fleet/60x60/' + unitID + '_faceright.png' : 'skin/characters/military/x60_y60/y60_' + unitID + '_faceright.png'
    }
  },
  getBuildingTable              : function() {
  	var lang = database.settings.languageChange.value;  
    var table = '<table class="buildings">\n{0}\n    <tbody>{1}</tbody>\n</table>';
    var headerCell = '<th data-tooltip="{0}" style="background-color: transparent; background-image: url(\'{1}\'); \n background-repeat: no-repeat; background-attachment: scroll; background-position: center center; background-clip: \n border-box; background-origin: padding-box; background-size: 50px auto; cursor: pointer;" colspan="{2}" class="icon" onclick="ajaxHandlerCall(\'?view=buildingDetail&helpId=1&buildingId={3}\');return false;">&nbsp;</th>';
    var headerRow = '<thead><tr class="header_row">\n    <th class="city_name">{0}</th>\n    <th data-tooltip="{1}" class="action_points icon actionpointImage"></th>\n  <th class="empireactions">\n  <div class="contracts" data-tooltip="'+ Constant.LanguageData[lang].contracts +'" style="cursor:pointer;" onclick="ajaxHandlerCall(\'?view=diplomacyTreaty\')"></div></th>\n    {2}\n</tr></thead>';
    var buildingCell = '<td class="building {0}" data-tooltip="dynamic"></td>';
    var buildingRow = '<tr id="building_{0}">\n    <td class="city_name"><img><span class="clickable"></span><sub></sub></td>\n    <td class="action_points"><span class="ap"></span>&nbsp;&nbsp;<br><span class="garrisonlimit"  data-tooltip="dynamic"><img height="18" hspace="5"></span></td>\n    <td class="empireactions">\n  <div class="deploymentfleet"></div> <br>  <div class="transport" data-tooltip="'+ Constant.LanguageData[lang].transporting +' {2}" style="cursor:pointer;"></div>\n   </td>\n    {1}\n</tr>';
    var counts = database.getBuildingCounts;
    var buildingOrder = (database.settings.alternativeBuildingList.value ? Constant.altBuildingOrder : database.settings.compressedBuildingList.value ? Constant.compBuildingOrder : Constant.buildingOrder);

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
			var test = ''; //todo
			if ('#empireBoard #BuildTab table tbody tr td.building.winegrower0'){ 
			test = 21;}
			if ('#empireBoard #BuildTab table tbody tr td.building.stonemason0'){
			test = 19;}
            headerCells += Utils.format(headerCell, [database.getGlobalData.getLocalisedString(Constant.Buildings.STONEMASON) + '/' + database.getGlobalData.getLocalisedString(Constant.Buildings.WINERY) + '/' + database.getGlobalData.getLocalisedString(Constant.Buildings.ALCHEMISTS_TOWER) + '/' + database.getGlobalData.getLocalisedString(Constant.Buildings.GLASSBLOWER), 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAUCAMAAACknt2MAAABelBMVEUAAADp49mgkICxmnzVuIxMcwtciQ90pSC/tKR7aFWOfGmIdmPKr4lomxChyk/YxKjTyrzl2slrVkKBblu5ooXp0a3NwrOqm4uNeWRTMzMnGRZFQBvb0sS0p5j18OiTgW3cvpSeXF07JSSJUlLFeHY2NhZzrRKZh3XmyJwPCgl7jzSHyBXlx53EuateSje0amp0YE2Fc2FzSEeFqzfoyJftylO7l1312oXv0GzWyqzN0MH15b311WO3iy2jchyLXiuZrqtyt9uJx+bP2M789+/sz3nv2p7+5IOXZRWHVA/jxou7vquTyuS7x72MqKmEw+J/wOFdk6ylsaXsz6Xz1njKnzTBlkF6SAvhvE2TsraVzeiNyeZ8ttJ7v+EzXnXJ1M2tfiKts6S63ex2utyUw9hFhqV6ss2W0O7fvmDUrUJnnrOk0+tjq8602uzO6fbCyr7Eu6BqrM1tstS74fKbzeXS6/dvud7OrG1PlLeMwNfW7viu2e2i0ObK4OYudx14AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAFfSURBVCgVBcFLTlNhGADQ8/29t/e/reVhChWkUDFRE0hM1IlxYiIzhy5EN+ASTNyBO3DoIpw7VBNAiga0QFKsPK7nBBARV4AiIq4ukUBWVd0bQI0OJJjPC3VcV0AVTdOGhKVot//0TEFR9pebWQ8J1d9qNjxZjhGKYV3XI7N7JLDfU+dh48HmekrKcjYab0m2Y7GeP9tb2ztCL5meT8J45UJre5KOrlZv/hr0TyeXk3p6sdBqfc96439p399GXdx2Pbxv47zTreeiGcxKAABF8aiA/tZjAZ5EfAYA0ALDFKsrB4Cn63sgwbOyVeYu4HnOL0BgJyJOFkR88jIiIiI+ouDVecfhMCIa5iLix1oEJDtnnShmZ2mcT8k5VXdzzpB20kn/8HJkcfVnw4c8V09znr5GSpsbX5qlruOvA7zZbbdXqvJWhfR799tgduzhnVY9z/vtnN9VdfvgLQAAAPgPmQZaHvndsJEAAAAASUVORK5CYII=', counts[value], test, "?view=buildingDetail&helpId=1&buildingId=21"]).replace('50px auto','38px 28px')
 		    } else if(counts[value]) {
            cols += '<col span="' + counts[value] + '">';
            headerCells += Utils.format(headerCell, [database.getGlobalData.getLocalisedString(value), Constant.BuildingData[value].icon, counts[value], "?view=buildingDetail&helpId=1&buildingId=" + Constant.BuildingData[value].buildingId])
          }
        });
         if(cols != '') {
          colgroup += '<colgroup>' + cols + '</colgroup>'
        }
      }
      return colgroup + Utils.format(headerRow, [Constant.LanguageData[lang].towns, Constant.LanguageData[lang].actionP, headerCells])
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
        body += Utils.format(buildingRow, [city.getId, rowCells, city._name])
      });
      return body
    }
  },
  AddIslandCSS                  : function() {
    if(!(/.*view=island.*/.test(window.document.location))) 
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
      empire.error('updateCityArmyCell', e);
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
      empire.time(this.updateCityArmyRow.bind(this, cityId, $clone.find('#army_' + cityId)), 'updateArmyRow');
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
  },
  updateGlobalData              : function(changes) {
    this.setAllResourceData();
    return true;
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
      events.scheduleAction(this.updateResourceCounters.bind(render, true), 0);
    }
  },
  updateCityDataForCity         : function(cityId, changes) {
    var city = database.getCityFromId(cityId);
    if(city) {
      var research = 0, population = 0, finance = 0;
      for(var key in changes) {
        switch(key) {
          case 'research':		  
            research += changes[key];
            break;
          case 'priests':
            if(Constant.Government.THEOCRACY === database.getGovernmentType){
              population += changes[key];
              finance += changes[key];			  
            }			
            break;
          case 'culturalGoods':
            research += changes[key];
            population += changes[key];
            break;
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
      empire.error('updateChangesForCityBuilding', e);
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
            render.setActionPoints(city);			
          });
          return success;
        }
        Utils.setClone($row, $node);
      }
      return success
    } catch(e) {
      empire.error('updateCityBuildingRow', e);
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
          success = empire.time(this.updateCityBuildingRow.bind(this, city, $clone.find('#building_' + city.getId)), 'updateBuildingRow');
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
          render.setActionPoints(city);		  
        })
      }
    } catch(e) {
      empire.error('updateCitiesBuildingData', e)
    } finally {
    }
  },
  redrawSettings:function () {
    $('#SettingsTab').html(render.getSettingsTable());
    $("#empire_Reset_Button").button({icons: {primary: "ui-icon-alert"}, text: true});
	$("#empire_Website_Button").button({icons: {primary: "ui-icon-home"}, text: true});
	$("#empire_Update_Button").button({icons: {primary: "ui-icon-info"}, text: true});
    $("#empire_Bug_Button").button({icons: {primary: "ui-icon-notice"}, text: true});
    $("#empire_Save_Button").button({icons: {primary: "ui-icon-check"}, text: true});
	},	
  DrawContentBox                : function() {
  	var lang = database.settings.languageChange.value; 
    var that = this;
    if(!this.mainContentBox) { //<li><a href="#WorldmapTab" data-tooltip="Not yet implemented">Worldmap</a></li>
      $("#container").after('<div id="empireBoard" class="ui-widget" style="display:none;z-index:' + (database.settings.onTop.value ? 65112 : 61) + ';position: absolute; left:70px;top:180px;">\
                                    <div id="empire_Tabs">\
                                        <ul>\
                                            <li><a href="#ResTab">'+ Constant.LanguageData[lang].economy +'</a></li>\
                                            <li><a href="#BuildTab">'+ Constant.LanguageData[lang].buildings +'</a></li>\
                                            <li><a href="#ArmyTab">'+ Constant.LanguageData[lang].military +'</a></li>\
                                            <li><a href="#SettingsTab" data-tooltip="'+ Constant.LanguageData[lang].options +'"><span class="ui-icon ui-icon-gear"/></a></li>\
											<li><a href="#HelpTab" data-tooltip="'+ Constant.LanguageData[lang].help +'"><span class="ui-icon ui-icon-help"/></a></li>\
                                        </ul>\
                                        <div id="ResTab"></div>\
                                        <div id="BuildTab"></div>\
                                        <div id="ArmyTab"></div>\
										<div id="WorldmapTab"></div>\
                                        <div id="SettingsTab"></div>\
                                        <div id="HelpTab"></div>\
                                    </div>\
                                </div>');
      this.mainContentBox = $("#empireBoard");
      this.$tabs = $("#empire_Tabs").tabs({collapsible: true, show: null, selected: -1 });
      this.mainContentBox.draggable({
        handle: '#empire_Tabs > ul',
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
    render.mainContentBox.on('click', 'td.city_name span.clickable',function(event) {
      var target = $(event.target);
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      var classes = target.parents('td').attr('class');
      var params = {cityId: city.getId};
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
    }).on('click', 'td.empireactions div.transport',function(event) {
      var target = $(event.target);
      var city = database.getCityFromId(target.parents('td').parents('tr').attr('id').split('_').pop());
        if(!city.isCurrentCity && ikariam.getCurrentCity) {
          ikariam.loadUrl(true, ikariam.mainView, {view: 'transport', destinationCityId: city.getId, templateView: Constant.Buildings.TRADING_PORT})
        }
        return false;
    }).on('click', 'td.empireactions div[class*=deployment]', function(event) {
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
	$('#empire_Tabs').on('click', 'td.empireactions div.worldmap', function(event) {
      var target = $(event.target);
      var className = target.parents('td').attr('class').split(' ').pop();	  
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      var params = {
          cityId           : city.getId,
	      view             : 'worldmap_iso'
      };
      ikariam.loadUrl(true, 'city', params);
      return false;
    }).on('click', 'td.empireactions div.island', function(event) {
      var target = $(event.target);
      var className = target.parents('td').attr('class').split(' ').pop();	  
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      var params = {
          cityId           : city.getId,
	      view             : 'island'
      };
      ikariam.loadUrl(true, null, params);
      return false;
    }).on('click', 'td.empireactions div.city',function(event) {
	  var target = $(event.target);	  
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      var className = target.parents('td').attr('class').split(' ').pop();
      var building = city.getBuildingFromName(Constant.Buildings.TOWN_HALL);
      var params = building.getUrlParams;	  
      if(unsafeWindow.ikariam.templateView)unsafeWindow.ikariam.templateView.id = null;
      ikariam.loadUrl(true, 'city', params);
      return false;
    }).on('click', 'td.population_happiness', function(event) {
      var target = $(event.target);
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      var className = target.parents('td').attr('class').split(' ').pop();
      var building = city.getBuildingFromName(Constant.Buildings.TAVERN);
      var params = building.getUrlParams;	  
      if(unsafeWindow.ikariam.templateView)unsafeWindow.ikariam.templateView.id = null;
      ikariam.loadUrl(true, 'city', params);
      return false;
    }).on('click', 'td.research span',function(event) {
	  var target = $(event.target);	  
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      var className = target.parents('td').attr('class').split(' ').pop();
	  var building = city.getBuildingFromName(Constant.Buildings.ACADEMY);
      var params = building.getUrlParams;
      if(unsafeWindow.ikariam.templateView)unsafeWindow.ikariam.templateView.id = null;
      ikariam.loadUrl(true, 'city', params);
      return false;
    }).on('click', 'td.empireactions div.barracks',function(event) {
	  var target = $(event.target);	  
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      var className = target.parents('td').attr('class').split(' ').pop();
	  var building = city.getBuildingFromName(Constant.Buildings.BARRACKS);
      var params = building.getUrlParams;
      if(unsafeWindow.ikariam.templateView)unsafeWindow.ikariam.templateView.id = null;
      ikariam.loadUrl(true, 'city', params);
      return false;
    }).on('click', 'td.empireactions div.shipyard',function(event) {
	  var target = $(event.target);	  
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      var className = target.parents('td').attr('class').split(' ').pop();
	  var building = city.getBuildingFromName(Constant.Buildings.SHIPYARD);
      var params = building.getUrlParams;
      if(unsafeWindow.ikariam.templateView)unsafeWindow.ikariam.templateView.id = null;
      ikariam.loadUrl(true, 'city', params);
      return false;
    }).on('click', 'th.empireactions div.spio',function() {
         ikariam.loadUrl(ikariam.viewIsCity, "city", ikariam.getCurrentCity.getBuildingFromName(Constant.Buildings.HIDEOUT).getUrlParams) //tabReports
    }).on('click', 'th.empireactions div.combat',function() {
         ikariam.loadUrl(ikariam.viewIsCity, "city", {view:'militaryAdvisor', activeTab:'combatReports'} )
    }).on('click', 'span.production',function(event) {
      var target = $(event.target);
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
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
    }).on('click', 'td.empireactions div.islandgood', function(event) {
      var target = $(event.target);
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
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
    }).on('click', 'td.empireactions div.islandwood', function(event) { 
      var target = $(event.target);
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      var resource = target.parents('td').attr('class').split(' ').pop();
      var params = {
        cityId: city.getId
      };
      if(ikariam.CurrentCityId == city.getId || !ikariam.viewIsIsland) {
        params.type = resource == Constant.Resources.WOOD ? city.getTradeGoodID : 'resource';
        params.view = resource == Constant.Resources.WOOD ? 'tradegood' : 'resource';
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
	$('#empire_Tabs').on('click', 'td.building span.clickable', function(event) {
      var target = $(event.target);
      var city = database.getCityFromId(target.parents('tr').attr('id').split('_').pop());
      var className = target.parents('td').attr('class').split(' ').pop();
      var building = city.getBuildingsFromName(className.slice(0, -1))[className.charAt(className.length - 1)];
      var params = building.getUrlParams;
      if(unsafeWindow.ikariam.templateView)unsafeWindow.ikariam.templateView.id = null;
      ikariam.loadUrl(true, 'city', params);
      return false;
    });
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
    city = typeof city == 'object'? city : database.getCityFromId(city);
    if(!this.cityRows[type][city.getId])
      this.cityRows[type][city.getId] = $("#" + type + "_" + city.getId);
    return this.cityRows[type][city.getId]
  },
  getAllRowsForCity             : function(city) {
    return this.getResourceRow(city).add(this.getBuildingsRow(city)).add(this.getArmyRow(city))
  },  
  setCityName                   : function(city, rows) {
    if(!rows) {
      rows = this.getAllRowsForCity(city); 
    }
  	var lang = database.settings.languageChange.value;	
    rows.find('td.city_name').each(function(index, elem) {
      elem.children[0].outerHTML = '<span class="icon ' + city.getTradeGood + 'Image"></span>';
      elem.children[1].textContent = city.getName;
      elem.children[2].textContent = ' ' + (city.getAvailableBuildings || '') + ' ';
      elem.children[2].setAttribute('data-tooltip', Constant.LanguageData[lang].free_ground);  
    });
  },  
  setActionPoints               : function(city, rows) {
    if(!rows) {
      rows = this.getAllRowsForCity(city); 
    }
    rows.find('span.ap').text(city.getAvailableActions + '/' + city.maxAP);	
	rows.find('span.garrisonlimit img').attr('src', 'skin/advisors/military/bang_soldier.png');
  },  
  setFinanceData                : function(city, row) {
    if(!row) {
      row = this.getResourceRow(city)
    }
  },
  setPopulationData             : function(city, row) {
    if(!row) {
      row = this.getResourceRow(city)
    }
  	var lang = database.settings.languageChange.value;
	var populationData = city.populationData;
    var popSpace = Math.floor(populationData.currentPop-populationData.maxPop);
    var popDiff = populationData.maxPop-populationData.currentPop;
    row.find('td.population span').get(0).textContent = Utils.FormatNumToStr(populationData.currentPop, false, 0) + '/' + Utils.FormatNumToStr(populationData.maxPop, false, 0);
    row.find('td.population span').get(1).textContent = (popSpace!== 0 ? Utils.FormatNumToStr(popSpace, true, 0):'');
    var fillperc = 100 / populationData.maxPop * populationData.currentPop ;
    row.find('td.population div.progressbarPop').find('div.ui-progressbar-value').width(fillperc + "%").removeClass("normal, warning, full").addClass((populationData.currentPop / populationData.maxPop == 1) ? "full" : (city._citizens < 300) ? "warning" : "normal"); 
	var img = '';
     if(populationData.growth < -1) {
      img = 'outraged';
     } else if(populationData.growth < 0) {
      img = 'sad';
     } else if(populationData.growth < 1) {
      img = 'neutral';
     } else if(populationData.growth < 6) {
      img = 'happy';
     } else {
      img = 'ecstatic';
     }
    row.find('td.population_happiness span img').attr('src', 'skin/smilies/' + img + '_x25.png');
	row.find('span.growth').text(popDiff != 0 ? Utils.FormatNumToStr(populationData.growth, true, 2) : '0'+Constant.LanguageData[lang].decimalPoint+'00');	
	row.find('span.growth').removeClass('Red Green').addClass(populationData.happiness > 60 && popDiff == 0 ? 'Red' : populationData.happiness > 0 && populationData.happiness <= 60 && popDiff > 0 ? 'Green' : '');
  },  
  setResearchData  : function(city, row) {  
    if(!row) {
      row = this.getResourceRow(city)
    }
	var researchData = researchData || city.research.researchData;
	row.find('td.research span').addClass('clickbar').get(0).textContent = Utils.FormatNumToStr(city.research.getResearch) > 0 ? Utils.FormatNumToStr(city.research.getResearch, true, 0) : city.iSci;
    var fillperc = (100 * researchData.scientists) / city.maxSci;
    row.find('td.research div.progressbarSci').find('div.ui-progressbar-value').width(fillperc + "%").removeClass('normal, full').addClass(researchData.scientists == 0 ? '' : city.maxSci - researchData.scientists > 0 ? 'normal' : 'full' );
  },
  setMovementDataForCity        : function(city, row) {
    if(!row) {
      row = this.getResourceRow(city)
    }
    var totalIncoming = {wood: 0, wine: 0, marble: 0, glass: 0, sulfur: 0, gold: 0};
    $.each(city.getIncomingResources, function(index, element) {
      for(var resourceName in Constant.Resources) {
        totalIncoming[Constant.Resources[resourceName]] += element.getResource(Constant.Resources[resourceName]);	
      }		
    });
    row.find('td.resource.wood').find('span.incoming').get(0).textContent = Utils.FormatNumToStr(totalIncoming[Constant.Resources.WOOD]) || '';
    row.find('td.resource.wine').find('span.incoming').get(0).textContent = Utils.FormatNumToStr(totalIncoming[Constant.Resources.WINE]) || '';
    row.find('td.resource.marble').find('span.incoming').get(0).textContent = Utils.FormatNumToStr(totalIncoming[Constant.Resources.MARBLE]) || '';
    row.find('td.resource.glass').find('span.incoming').get(0).textContent = Utils.FormatNumToStr(totalIncoming[Constant.Resources.GLASS]) || '';
    row.find('td.resource.sulfur').find('span.incoming').get(0).textContent = Utils.FormatNumToStr(totalIncoming[Constant.Resources.SULFUR]) || '';
    row.find('td.resource.gold').find('span.incoming').get(0).textContent = Utils.FormatNumToStr(totalIncoming[Constant.Resources.GOLD]) || '';
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
        var populationTot = 0;
        var populationMaxTot = 0;
        var	growthTot = 0;
		var	citygrowth = 0;		
		var popDiffTot = 0; 		  
      $.each(database.cities, function(cityId, city) {
        var $row = Utils.getClone(this.getResourceRow(city));
        if(force) {
            this.setFinanceData(city, $row);
            this.setPopulationData(city, $row);		
            this.setResearchData(city, $row);
            this.setActionPoints(city, $row);			
            this.setMovementDataForCity(city, $row)
          }		  
          income += Math.floor(city.getIncome)
          researchTot += city.research.getResearch;
          researchCost += Math.floor(city.getExpenses); 	
          populationTot += city._population;
		  populationMaxTot += city.populationData.maxPop;
		  citygrowth = Math.floor(city.populationData.maxPop-city._population > 0) ? city.populationData.growth : 0;
		  growthTot += citygrowth;
		  popDiffTot = Math.floor(populationMaxTot-populationTot);
        var storage = city.maxResourceCapacities;
         $.each(Constant.Resources, function(key, resourceName) {
		   	var lang = database.settings.languageChange.value;
            var currentResource = city.getResource(resourceName);
            var production = currentResource.getProduction * 3600;
            var current = currentResource.getCurrent;
            var consumption = resourceName == Constant.Resources.WINE ? currentResource.getConsumption : 0;
            inc[resourceName] += production;
            tot[resourceName] += current;
            conWine += consumption;
            var rescells = $row.find('td.resource.' + resourceName);
            rescells.find('span.current').addClass(resourceName == Constant.Resources.WOOD || city.getTradeGood == resourceName).get(0).textContent = (current ? Utils.FormatNumToStr(current, false, 0) : '0'+Constant.LanguageData[lang].decimalPoint+'00');
            if(resourceName !== Constant.Resources.GOLD)
            rescells.find('span.production').addClass('clickable').get(0).textContent = (production ? Utils.FormatNumToStr(production, true, 0) : '');
            if(resourceName === Constant.Resources.WINE) {
              rescells.find('span.consumption').get(0).textContent = (consumption ? Utils.FormatNumToStr(0 - consumption, true, 0) : '');
	            var time = currentResource.getEmptyTime;
	            time = time > 1? Math.floor(time) + (60 - new Date().getMinutes())/60 : 0;
	            time *= 3600000;
                rescells.find('span.emptytime').removeClass('Red Green').addClass(time > database.settings.wineWarningTime.value * 3600000 ? 'Green' : 'Red').get(0).textContent = database.settings.wineWarningTime.value > 0 ? (Utils.FormatTimeLengthToStr(time, 2)) : '';
            }
            if(resourceName === Constant.Resources.GOLD) {
              rescells.find('span.current').get(0).textContent = city.getIncome + city.getExpenses >= 0 ? Utils.FormatNumToStr(city.getIncome + city.getExpenses) : Utils.FormatNumToStr((city.getIncome + city.getExpenses), true);
              rescells.find('span.production').get(0).textContent = Utils.FormatNumToStr(city.getIncome, true, 0);			
              rescells.find('span.consumption').get(0).textContent = city.getExpenses != 0 ? Utils.FormatNumToStr(city.getExpenses, true, 0) : '' ;	
            }			
            var fillperc = (current / storage.capacity) * 100;
            rescells.find('div.progressbar').find('div.ui-progressbar-value').width(fillperc + "%").removeClass("normal warning almostfull full").addClass(fillperc > 90 ? fillperc > 96 ? "full" : "almostfull" : fillperc > 70 ? "warning" : "normal");
            var diffGold = Math.floor(city.getIncome + city.getExpenses);
            var fillpercG = 100 / (city.populationData.maxPop * 3) * diffGold;
            if(resourceName === Constant.Resources.GOLD) {				
            rescells.find('div.progressbar').find('div.ui-progressbar-value').width(fillpercG + "%").removeClass("normal almostfull full fullGold").addClass(fillpercG > 50 ? fillpercG > 90 ? "fullGold" : "normal" : fillpercG > 25 ? "almostfull" : "full");
            }
			if(storage.safe > current) {
              rescells.find('span.safeImage').show()
            } else {
              rescells.find('span.safeImage').hide()
            }
            if(resourceName === Constant.Resources.GOLD) {
              rescells.find('span.safeImage').hide()
            }
          }.bind(render));
        Utils.setClone(this.getResourceRow(city),$row);
          this.cityRows.resource[city.getId] = null
        }.bind(render));
		var lang = database.settings.languageChange.value;
        var expense = database.getGlobalData.finance.armyCost + database.getGlobalData.finance.armySupply + database.getGlobalData.finance.fleetCost + database.getGlobalData.finance.fleetSupply - researchCost;
        var sigmaIncome = income - expense;	
		var currentGold = 0;
		    currentGold = Utils.FormatNumToStr(database.getGlobalData.finance.currentGold);
		  if (database.getGlobalData.finance.currentGold > 10000)
		    currentGold = Utils.FormatNumToStr(database.getGlobalData.finance.currentGold/1000) +'k';	
        $("#t_currentgold").get(0).textContent = currentGold;
        $("#t_currentwood").get(0).textContent = Utils.FormatNumToStr(Math.round(tot[Constant.Resources.WOOD]), false);
        $("#t_currentwine").get(0).textContent = Utils.FormatNumToStr(Math.round(tot[Constant.Resources.WINE]), false);
        $("#t_currentmarble").get(0).textContent = Utils.FormatNumToStr(Math.round(tot[Constant.Resources.MARBLE]), false);
        $("#t_currentglass").get(0).textContent = Utils.FormatNumToStr(Math.round(tot[Constant.Resources.GLASS]), false);
        $("#t_currentsulfur").get(0).textContent = Utils.FormatNumToStr(Math.round(tot[Constant.Resources.SULFUR]), false);
        $("#t_goldincome").children('span').eq(0).text(Utils.FormatNumToStr(sigmaIncome, true, 0)).siblings('span').eq(0).text(sigmaIncome > 0 ? '\u221E' : Utils.FormatTimeLengthToStr((database.getGlobalData.finance.currentGold / sigmaIncome) * 60 * 60 * 1000, true, 0));		
        $("#t_woodincome").find('span').get(0).textContent = Utils.FormatNumToStr(Math.round(inc[Constant.Resources.WOOD]), true);
        $("#t_wineincome").children('span').eq(0).text(Utils.FormatNumToStr(Math.round(inc[Constant.Resources.WINE]), true)).siblings('span').eq(0).text( '-' + Utils.FormatNumToStr(Math.round(conWine), false));
        $("#t_marbleincome").find('span').get(0).textContent = Utils.FormatNumToStr(Math.round(inc[Constant.Resources.MARBLE]), true);
        $("#t_glassincome").find('span').get(0).textContent = Utils.FormatNumToStr(Math.round(inc[Constant.Resources.GLASS]), true);
        $("#t_sulfurincome").find('span').get(0).textContent = Utils.FormatNumToStr(Math.round(inc[Constant.Resources.SULFUR]), true);
        $("#t_population").get(0).textContent = Utils.FormatNumToStr(Math.round(populationTot), false) + '(' + Utils.FormatNumToStr(Math.round(populationMaxTot), false) + ')';
        $("#t_growth").get(0).textContent = popDiffTot > 0 ? Utils.FormatNumToStr(growthTot, true, 2) : '0'+Constant.LanguageData[lang].decimalPoint+'00';	
        $("#t_research").get(0).textContent = researchTot ? Utils.FormatNumToStr(researchTot, true, 0) : '0'+Constant.LanguageData[lang].decimalPoint+'00';
        tot = inc = null;
        }
      } catch(e) {
        empire.error('UpdateResourceCounters', e)
      }
     }
    };

	function getCityNameFromID(originCity, city) {
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
	GM_addStyle('/* Global board styles */\n #js_GlobalMenu_wood, #js_GlobalMenu_wine, #js_GlobalMenu_marble, #js_GlobalMenu_crystal, #js_GlobalMenu_sulfur {font-size:95%; position:absolute; top:0px; right:5px}\n span.resourceProduction {font-size:85%;position:absolute;right:5px; padding-top: 13px}\n #empireBoard .clickable {\n    color: #542c0f;\n    font-weight: 600; }\n#empireBoard .clickable:hover, #empireBoard .clickbar:hover {\n    cursor: pointer;\n    text-decoration: underline; }\n#empireBoard .Bold, #empireBoard .Red, #empireBoard .Blue, #empireBoard .Green {\n    font-weight: normal; }\n#empireBoard .Green {\n    color: green !important; }\n#empireBoard .Red {\n    color: red !important; }\n#empireBoard .Blue {\n    color: blue !important; }\n#empireBoard .icon {\n    background-clip: border-box;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-color: transparent;\n    background-size: auto 20px; }\n#empireBoard .safeImage {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEFJREFUeNpi/P//PwMIhOrzQhhAsPriZ0YQzYQugcxnQhaE6YABxhA9HhRdyICJAQ/AayzxOtFdzYRuFLIVAAEGANwqFwuukYKqAAAAAElFTkSuQmCC");\n    background-size: auto auto !important; }\n#empireBoard .transportImage {\n    background-image: url(skin/actions/transport.jpg); }\n#empireBoard .tradeImage {\n    background-image: url(skin/actions/trade.jpg); }\n#empireBoard .plunderImage {\n    background-image: url(skin/actions/plunder.jpg); }\n#empireBoard .merchantImage {\n    background-image: url(skin/minimized/merchantNavy.png);\n    background-position: 0 -5px; }\n#empireBoard .woodImage {\n    background-image: url(skin/resources/icon_wood.png);}\n#empireBoard .wineImage {\n    background-image: url(skin/resources/icon_wine.png); }\n#empireBoard .marbleImage {\n    background-image: url(skin/resources/icon_marble.png); }\n#empireBoard .sulfurImage {\n    background-image: url(skin/resources/icon_sulfur.png); }\n#empireBoard .goldImage {\n    background-image: url(skin/resources/icon_gold.png); }\n#empireBoard .glassImage {\n    background-image: url(skin/resources/icon_glass.png); }\n#empireBoard .sawMillImage {\n    background-image: url(skin/characters/y100_worker_wood_faceleft.png); }\n#empireBoard .mineImage {\n    background-image: url(skin/characters/y100_worker_tradegood_faceleft.png); }\n#empireBoard .researchImage {\n    background-image: url(skin/layout/bulb-on.png); }\n#empireBoard .populationImage {\n    background-image: url(skin/resources/icon_population.png); }\n#empireBoard .goldImage {\n    background-image: url(skin/resources/icon_gold.png); }\n#empireBoard .expensesImage {\n    background-image: url(skin/resources/icon_upkeep.png); }\n#empireBoard .happyImage {\n    background-image: url(skin/smilies/happy.png); }\n#empireBoard .actionpointImage {\n    background-image: url(skin/resources/icon_actionpoints.png); }\n#empireBoard .growthImage {\n    background-image: url(skin/icons/growth_positive.png); }\n#empireBoard .scientistImage {\n    background-image: url(skin/characters/40h/scientist_r.png); }\n#empireBoard .priestImage {\n    background-image: url(skin/characters/40h/templer_r.png); }\n#empireBoard .citizenImage {\n    background-image: url(skin/characters/40h/citizen_r.png); }\n#empireBoard .cityIcon {\n    background-image: url(skin/icons/city_30x30.png); }\n#empireBoard .governmentIcon {\n    background-image: url(skin/government/zepter_20.png); }\n#empireBoard .researchIcon {\n    background-image: url(skin/icons/researchbonus_30x30.png); }\n#empireBoard .tavernIcon {\n    background-image: url(skin/buildings/tavern_30x30.png); }\n#empireBoard .culturalIcon {\n    background-image: url(skin/interface/icon_message_write.png); }\n#empireBoard .museumIcon {\n    background-image: url(skin/buildings/museum_30x30.png); }\n#empireBoard .incomeIcon {\n    background-image: url(skin/icons/income_positive.png); }\n#empireBoard .crownIcon {\n    background-image: url(skin/layout/crown.png); }\n#empireBoard .corruptionIcon {\n    background-image: url(skin/icons/corruption_24x24.png); }\n#empireBoard #empireTip {\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 99999999; }\n#empireBoard #empireTip .icon {\n    background-clip: border-box;\n    background-repeat: no-repeat;\n    background-position: 0;\n    background-color: transparent;\n    background-attachment: scroll;\n    background-size: 16px auto;\n    height: 17px;\n    min-width: 24px;\n    width: 24px; }\n#empireBoard #empireTip .icon2 {\n    background-clip: border-box;\n    background-repeat: no-repeat;\n    background-position: 0;\n    background-color: transparent;\n    background-attachment: scroll;\n    background-size: 24px auto;\n    height: 17px;\n    min-width: 24px;\n    width: 24px; }\n#empireBoard #empireTip .content {\n    background-color: #fae0ae;\n    border: 1px solid #e4b873;\n    position: relative;\n    overflow: hidden;\n    text-align: left;\n    word-wrap: break-word; }\n#empireBoard #empireTip .content table {\n    width: 100%; }\n#empireBoard #empireTip .content table tr.data {\n    background-color:  	#FFFAF0; }\n#empireBoard #empireTip .content table tr.total {\n     background: #E7C680 url(skin/input/button.png) repeat-x scroll 0 0; }\n#empireBoard #empireTip .content table td {\n    padding: 2px;\n    height: auto !important;\n    text-align: right; }\n#empireBoard #empireTip .content table th {\n    padding: 2px;\n    height: auto !important;\n    text-align: center;\n    font-weight: bold;  background: #F8E7B3 url(skin/input/button.png) repeat-x scroll 0 bottom;}\n#empireBoard #empireTip .content table tbody td {\n background-color: #FFFAF0;}\n#empireBoard #empireTip .content table tbody td:last-child {\n    text-align: left;\n    white-space: nowrap;\n    font-style: italic; }\n#empireBoard #empireTip .content table tfoot {\n  line-height: 12px !important;  border-top: 3px solid #fdf7dd; }\n#empireBoard #empireTip .content table tfoot td:last-child {\n    text-align: left;\n    white-space: nowrap;\n    font-style: italic; }\n#empireBoard #empireTip .content table thead {\n    background: #F8E7B3 url(skin/input/button.png) repeat-x scroll 0 bottom;}\n#empireBoard #empireTip .content table thead th.lf {\n    border-left: 2px solid #e4b873; }\n#empireBoard #empireTip .content table tbody td.lf {\n    border-left: 2px solid #e4b873; }\n#empireBoard #empireTip .content table th.nolf, #empireBoard #empireTip .content table td.nolf {\n    border-left: none; }\n#empireBoard #empireTip .content th.lfdash, #empireBoard #empireTip .content td.lfdash {\n    border-left: 1px dashed #e4b873; }\n#empireBoard #empireTip .content table tr.small td {\n    height: auto !important;\n    padding-top: 1px;\n    font-size: 10px !important;\n    line-height: 15px !important; }\n#empireBoard #empire_Tabs table {\n    width: 100% !important;\n    text-align: center;\n    border: 1px solid #ffffff; }\n#empireBoard #empire_Tabs table colgroup {\n    border-left: 1px solid #e4b873; }\n#empireBoard #empire_Tabs table colgroup:first-child {\n    border: none !important; }\n#empireBoard #empire_Tabs table colgroup col {\n    border-left: 1px dashed #e4b873; }\n#empireBoard #empire_Tabs table thead {\n    background: #f8e7b3 url(skin/input/button.png) repeat-x scroll 0 bottom; }\n#empireBoard #empire_Tabs table thead tr {\n    height: 30px; }\n#empireBoard #empire_Tabs table thead tr th {\n    text-align: center;\n    font-weight: bold;\n    \n    overflow: hidden;\n    white-space: nowrap; }\n#empireBoard #ArmyTab table thead tr th.empireactions {\n  min-width: 20px; width: 50px;}\n#empireBoard #empire_Tabs table thead tr th.icon {\n    min-width: 35px;\n    background-size: auto 20px; }\n#empireBoard #empire_Tabs table tbody tr {\n    border-top: 1px solid #e4b873;}\n#empireBoard #empire_Tabs table tbody tr:nth-child(even) {\n    background-color: #FDF1D4; }\n#empireBoard #empire_Tabs table tbody tr.selected {\n    background-color: #FAE3B8;\n    box-shadow: 0 0 1em #CB9B6A inset; }\n#empireBoard #empire_Tabs table tbody tr:hover {\n    background-color: #fff;\n    box-shadow: 0 0 1em #CB9B6A; }\n#empireBoard #empire_Tabs table tbody tr td.city_name {\n    width: 135px;\n    max-width: 135px;\n    padding-left: 3px;\n    text-align: left;\n    padding-right: 14px; }\n#empireBoard #empire_Tabs table tbody tr td.city_name span.icon {\n    background-repeat: no-repeat;\n    float: left;\n    width: 20px;\n    background-size: 15px auto;\n    margin: 0 2px 0 -1px;\n    height: 16px;\n    cursor: move; }\n   #empireBoard #empire_Tabs table tbody tr td.action_points {\n  text-align: right;}\n  #empireBoard #empire_Tabs table tbody tr td.population {\n  text-align: right;}\n#empireBoard #empire_Tabs  table tbody tr td.sawmill {\n    border-left: 1.5px solid #e4b873; }\n  #empireBoard #empire_Tabs table tbody tr td.sawmillprog {\n  text-align: right;}\n  #empireBoard #empire_Tabs table tbody tr td.mineprog {\n  text-align: right;}\n  #empireBoard #empire_Tabs table tbody tr td.empireactions div {\n    background-clip: border-box;\n    background: transparent repeat scroll 0 0;\n    background-size: 25px auto;\n    height: 17px;\n    min-width: 20px;\n    width: 25px; }\n#empireBoard #empire_Tabs table thead tr th.empireactions div {\n    background-clip: border-box;\n    background: transparent repeat scroll 0 0;\n    background-size: 25px auto;\n    height: 20px;\n    min-width: 24px;\n    width: 25px; }\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.transport {\n    background-image: url("skin/actions/transport.jpg"); float: right;}\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.worldmap {\n    background-image: url("skin/layout/icon-world.png"); background-size: 16px 16px; background-repeat: no-repeat; background-position: center center; float: left;}\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.island {\n    background-image: url("skin/layout/icon-island.png"); background-size: 23px 18px; background-position: center center; float: right;}\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.islandwood {\n    background-image: url("skin/resources/icon_wood.png"); background-size: 17px auto; background-repeat: no-repeat; background-position: center center; float: left;}\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.islandgood {\n   float: left;}\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.city {\n    background-image: url("skin/layout/icon-city2.png"); background-size: auto 21px; background-repeat: no-repeat; background-position: center center; float: right;}\n#empireBoard #empire_Tabs table thead tr th.empireactions div.member {\n    background-image: url("skin/characters/y100_citizen_faceright.png"); background-size: auto 20px; background-repeat: no-repeat; background-position: center center; float: right;}\n#empireBoard #empire_Tabs table thead tr th.empireactions div.agora {\n    background-image: url("skin/layout/icon-message.png"); background-size: 20px auto; background-repeat: no-repeat; background-position: center center; float: right;}\n#empireBoard #empire_Tabs table thead tr th.empireactions div.trading {\n    background-image: url("skin/characters/fleet/40x40/ship_transport_r_40x40.png"); background-size: 22px 19px; background-repeat: no-repeat; background-position: center center; float: left;}\n#empireBoard #empire_Tabs table thead tr th.empireactions div.spio {\n    background-image: url("skin/characters/military/120x100/spy_120x100.png"); background-size: 25px auto; background-position: center center;\n    float: left; }\n#empireBoard #empire_Tabs table thead tr th.empireactions div.combat {\n    background-image: url("skin/layout/medallie32x32_gold.png"); background-size: 19px auto; background-repeat: no-repeat;\n    float: right; }\n#empireBoard #empire_Tabs table thead tr th.empireactions div.contracts {\n    background-image: url("skin/museum/icon32_culturalgood.png"); background-size: 22px auto; background-position: center center;  background-repeat: no-repeat;}\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.barracks {\n    background-image: url("skin/buildings/y50/y50_barracks.png"); background-size: 30px auto; background-position: center center; float: right; }\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.shipyard {\n    background-image: url("skin/buildings/y50/y50_shipyard.png");\n  background-size: 28px auto;   float: right; }\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.deploymentarmy {\n    background-image: url("skin/actions/move_army.jpg");\n    float: left; }\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.deploymentfleet {\n    background-image: url("skin/actions/move_fleet.jpg");\n    float: right; }\n#empireBoard #empire_WorldmapTab table tbody tr td.worldmap div.worldmap{ width:829px; height:829px; background-image: url("skin/actions/move_fleet.jpg");\n    float: right; }\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.transport:hover {\n    background-position: 0 -17px; }\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.deploymentfleet:hover {\n    background-position: 0 -17px; }\n#empireBoard #empire_Tabs table tbody tr td.empireactions div.deploymentarmy:hover {\n    background-position: 0 -17px; }\n#empireBoard #empire_Tabs table tbody tr.selected .empireactions div.transport, #empireBoard #empire_Tabs table tbody tr.selected .empireactions div.deploymentarmy, #empireBoard #empire_Tabs table tbody tr.selected .empireactions div.deploymentfleet{\n    background-position: 0 17px; }\n#empireBoard #empire_Tabs table tbody tr.current .empireactions div.transport {\n    background-position: 0 px; }\n#empireBoard #empire_Tabs table tfoot {\n    background: #fae0ae;\n    background: #e7c680 url(skin/input/button.png) repeat-x scroll 0 0;\n    border-top: 2px solid #e4b873; }\n#empireBoard #empire_Tabs table tfoot tr td {\n    text-align: right;\n     font-weight: bold;}\n#empireBoard #empire_Tabs table tfoot tr #t_research.total {\n    text-align: center; }\n#empireBoard #empire_Tabs table tfoot tr #t_growth.total {\n    text-align: center; }\n#empireBoard #empire_Tabs table tfoot tr td.total span {\n    line-height: 1em;\n    height: 1em;\n    font-size: 0.8em;\n    display: block; }\n#empireBoard #empire_Tabs table tfoot tr td#t_sigma, #empireBoard #empire_Tabs table tfoot tr td.sigma {\n    font-weight: 800;\n    text-align: center; }\n#empireBoard #ResTab div.progressbar .normal {\n    background: #73443E; }\n#empireBoard #ResTab div.progressbar .warning {\n    background: #8F1D1A; }\n#empireBoard #ResTab div.progressbar .almostfull {\n    background: #B42521; }\n#empireBoard #ResTab div.progressbar .full {\n    background: #ff0000; }\n#empireBoard #ResTab div.progressbar .fullGold {\n    background: #185A39; }\n#empireBoard #ResTab div.progressbarPop .normal {\n    background: #73443E; }\n#empireBoard #ResTab div.progressbarPop .warning {\n    background: #CC3300; }\n#empireBoard #ResTab div.progressbarPop .full {\n    background: #185A39; }\n#empireBoard #ResTab div.progressbarSci .normal {\n    background: #73443E; }\n#empireBoard #ResTab div.progressbarSci .full {\n    background: #185A39; }\n#empireBoard #ResTab table tr td.gold_income, #empireBoard #ResTab table tr td.resource, #empireBoard #ResTab table tr td.army:nth-child(even) {\n    text-align: right; }\n#empireBoard #ResTab table tr td.gold_income span.incoming, #empireBoard #ResTab table tr td.resource span.incoming {\n  color: blue; }\n#empireBoard #ResTab table tr td.gold_unkeep span, #empireBoard #ResTab table tr td.resource span, #empireBoard #ResTab table tr td.army:nth-child(even) span {\n    line-height: 1em;\n    height: 1em;\n    font-size: 0.8em;\n    display: block; }\n#empireBoard #ResTab table tr td.gold_income span.icon, #empireBoard #ResTab table tr td.resource span.icon, #empireBoard #ResTab table tr td.army:nth-child(even) span.icon {\n    background-repeat: no-repeat;\n    float: left;\n    width: 20px;\n    height: 9px;\n    padding: 5px 4px 0 0; }\n#empireBoard #ResTab table tr td.gold_income span.current, #empireBoard #ResTab table tr td.resource span.current, #empireBoard #ResTab table tr td.army:nth-child(even) span.current {\n    font-size: 1em;\n    display: inline; }\n#empireBoard #ResTab table tr td.population {\n    text-align: right; }\n#empireBoard #ResTab table tr td.gold_income span:nth-child(2), #empireBoard #ResTab table tr td.population span:nth-child(2) {\n    line-height: 1em;\n    height: 1em;\n    font-size: 0.8em;\n    display: block; }\n#empireBoard #BuildTab table tbody tr td {\n    background-clip: border-box;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-color: transparent;\n    background-size: auto 20px; }\n#empireBoard #BuildTab table tbody tr td span.maxLevel {\n    color: rgba(84, 44, 15, 0.3); }\n#empireBoard #BuildTab table tbody tr td span.upgradableSoon {\n    color: #4169e1;\n    font-style: italic; }\n#empireBoard #BuildTab table tbody tr td span.upgradableSoon:after {\n    content: "+"; }\n#empireBoard #BuildTab table tbody tr td span.upgradable {\n    color: green;\n    font-style: italic; }\n#empireBoard #BuildTab table tbody tr td span.upgradable:after {\n    content: "+"; }\n#empireBoard #BuildTab table tbody tr td span.upgrading {\n    background: url("/skin/icons/arrow_upgrade.png") no-repeat scroll 1px 3px transparent;\n    border-radius: 5px 5px 5px 5px;\n    box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);\n    display: inline-block;\n    padding: 2px 5px 1px 20px;\n    margin: 2px; }\n#empireBoard #ArmyTab table colgroup col:nth-child(even) {\n    border-left: none; }\n#empireBoard #SettingsTab .options, #empireBoard #HelpTab .options {\n    float: left;\n    padding: 10px; }\n#empireBoard #SettingsTab .options span.categories, #empireBoard #HelpTab .options span.categories {\n    margin-left: -3px;\n    font-weight: 500; }\n#empireBoard #SettingsTab .options span.categories:not(:first-child), #empireBoard #HelpTab .options span.categories:not(:first-child) {\n    margin-top: 5px; }\n#empireBoard #SettingsTab .options span:not(.clickable), #empireBoard #HelpTab .options span:not(.clickable) {\n    display: block; }\n#empireBoard #SettingsTab .options span label, #empireBoard #HelpTab .options span label {\n    vertical-align: top;\n    padding-left: 5px; }\n#empireBoard #SettingsTab .buttons, #empireBoard #HelpTab .buttons {\n    clear: left;\n    padding: 3px; }\n#empireBoard #SettingsTab .buttons button, #empireBoard #HelpTab .buttons button {\n    margin-left: 3px; }\n\n.toast {\n    display: none;\n    position: fixed;\n    z-index: 99999;\n    width: 100%;\n    text-align: center;\n    bottom: 5em; }\n\n.toast .message {\n    display: inline-block;\n    color: #4C3000;\n    padding: 5px;\n    border-radius: 5px;\n    box-shadow: 3px 0px 15px 0 #542C0F;\n    -webkit-box-shadow: 3px 0px 15px 0 #542C0F;\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 11px;\n    background: #faf3d7;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #faf3d7), color-stop(1, #e1b06d)); }\n\ndiv.prog:after {\n    -webkit-animation: move 2s linear infinite;\n    -moz-animation: move 2s linear infinite; }\n\n.prog {\n    display: block;\n    width: 100%;\n    height: 100%;\n    background: #fcf938 -moz-linear-gradient(center bottom, #fcf938 37%, #fcf938 69%);\n    position: relative;\n    overflow: hidden; }\n.prog:after {\n    content: "";\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    background: -moz-linear-gradient(-45deg, rgba(10, 10, 10, 0.6) 25%, transparent 25%, transparent 50%, rgba(10, 10, 10, 0.6) 50%, rgba(10, 10, 10, 0.6) 75%, transparent 75%, transparent);\n    z-index: 1;\n    -webkit-background-size: 50px 50px;\n    -moz-background-size: 50px 50px;\n    background-size: 50px 50px;\n    -webkit-animation: move 5s linear infinite;\n    -moz-animation: move 5s linear infinite;\n    overflow: hidden; }\n\n.animate > .prog:after {\n    display: none; }\n\n@-webkit-keyframes move {\n    0% {\n        background-position: 0 0; }\n\n    100% {\n        background-position: 50px 50px; } }\n\n@-moz-keyframes move {\n    0% {\n        background-position: 0 0; }\n\n    100% {\n        background-position: 50px 50px; } }\n');
	   	if(database.settings.compressedBuildingList.value) GM_addStyle('#empireBoard #BuildTab table tbody tr td.building.forester0:not(:empty) {\n background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAMAAABPqWaPAAAKN2lDQ1BzUkdCIElFQzYxOTY2LTIuMQAAeJydlndUU9kWh8+9N71QkhCKlNBraFICSA29SJEuKjEJEErAkAAiNkRUcERRkaYIMijggKNDkbEiioUBUbHrBBlE1HFwFBuWSWStGd+8ee/Nm98f935rn73P3Wfvfda6AJD8gwXCTFgJgAyhWBTh58WIjYtnYAcBDPAAA2wA4HCzs0IW+EYCmQJ82IxsmRP4F726DiD5+yrTP4zBAP+flLlZIjEAUJiM5/L42VwZF8k4PVecJbdPyZi2NE3OMErOIlmCMlaTc/IsW3z2mWUPOfMyhDwZy3PO4mXw5Nwn4405Er6MkWAZF+cI+LkyviZjg3RJhkDGb+SxGXxONgAoktwu5nNTZGwtY5IoMoIt43kA4EjJX/DSL1jMzxPLD8XOzFouEiSniBkmXFOGjZMTi+HPz03ni8XMMA43jSPiMdiZGVkc4XIAZs/8WRR5bRmyIjvYODk4MG0tbb4o1H9d/JuS93aWXoR/7hlEH/jD9ld+mQ0AsKZltdn6h21pFQBd6wFQu/2HzWAvAIqyvnUOfXEeunxeUsTiLGcrq9zcXEsBn2spL+jv+p8Of0NffM9Svt3v5WF485M4knQxQ143bmZ6pkTEyM7icPkM5p+H+B8H/nUeFhH8JL6IL5RFRMumTCBMlrVbyBOIBZlChkD4n5r4D8P+pNm5lona+BHQllgCpSEaQH4eACgqESAJe2Qr0O99C8ZHA/nNi9GZmJ37z4L+fVe4TP7IFiR/jmNHRDK4ElHO7Jr8WgI0IABFQAPqQBvoAxPABLbAEbgAD+ADAkEoiARxYDHgghSQAUQgFxSAtaAYlIKtYCeoBnWgETSDNnAYdIFj4DQ4By6By2AE3AFSMA6egCnwCsxAEISFyBAVUod0IEPIHLKFWJAb5AMFQxFQHJQIJUNCSAIVQOugUqgcqobqoWboW+godBq6AA1Dt6BRaBL6FXoHIzAJpsFasBFsBbNgTzgIjoQXwcnwMjgfLoK3wJVwA3wQ7oRPw5fgEVgKP4GnEYAQETqiizARFsJGQpF4JAkRIauQEqQCaUDakB6kH7mKSJGnyFsUBkVFMVBMlAvKHxWF4qKWoVahNqOqUQdQnag+1FXUKGoK9RFNRmuizdHO6AB0LDoZnYsuRlegm9Ad6LPoEfQ4+hUGg6FjjDGOGH9MHCYVswKzGbMb0445hRnGjGGmsVisOtYc64oNxXKwYmwxtgp7EHsSewU7jn2DI+J0cLY4X1w8TogrxFXgWnAncFdwE7gZvBLeEO+MD8Xz8MvxZfhGfA9+CD+OnyEoE4wJroRIQiphLaGS0EY4S7hLeEEkEvWITsRwooC4hlhJPEQ8TxwlviVRSGYkNimBJCFtIe0nnSLdIr0gk8lGZA9yPFlM3kJuJp8h3ye/UaAqWCoEKPAUVivUKHQqXFF4pohXNFT0VFysmK9YoXhEcUjxqRJeyUiJrcRRWqVUo3RU6YbStDJV2UY5VDlDebNyi/IF5UcULMWI4kPhUYoo+yhnKGNUhKpPZVO51HXURupZ6jgNQzOmBdBSaaW0b2iDtCkVioqdSrRKnkqNynEVKR2hG9ED6On0Mvph+nX6O1UtVU9Vvuom1TbVK6qv1eaoeajx1UrU2tVG1N6pM9R91NPUt6l3qd/TQGmYaYRr5Grs0Tir8XQObY7LHO6ckjmH59zWhDXNNCM0V2ju0xzQnNbS1vLTytKq0jqj9VSbru2hnaq9Q/uE9qQOVcdNR6CzQ+ekzmOGCsOTkc6oZPQxpnQ1df11Jbr1uoO6M3rGelF6hXrtevf0Cfos/ST9Hfq9+lMGOgYhBgUGrQa3DfGGLMMUw12G/YavjYyNYow2GHUZPTJWMw4wzjduNb5rQjZxN1lm0mByzRRjyjJNM91tetkMNrM3SzGrMRsyh80dzAXmu82HLdAWThZCiwaLG0wS05OZw2xljlrSLYMtCy27LJ9ZGVjFW22z6rf6aG1vnW7daH3HhmITaFNo02Pzq62ZLde2xvbaXPJc37mr53bPfW5nbse322N3055qH2K/wb7X/oODo4PIoc1h0tHAMdGx1vEGi8YKY21mnXdCO3k5rXY65vTW2cFZ7HzY+RcXpkuaS4vLo3nG8/jzGueNueq5clzrXaVuDLdEt71uUnddd457g/sDD30PnkeTx4SnqWeq50HPZ17WXiKvDq/XbGf2SvYpb8Tbz7vEe9CH4hPlU+1z31fPN9m31XfKz95vhd8pf7R/kP82/xsBWgHcgOaAqUDHwJWBfUGkoAVB1UEPgs2CRcE9IXBIYMj2kLvzDecL53eFgtCA0O2h98KMw5aFfR+OCQ8Lrwl/GGETURDRv4C6YMmClgWvIr0iyyLvRJlESaJ6oxWjE6Kbo1/HeMeUx0hjrWJXxl6K04gTxHXHY+Oj45vipxf6LNy5cDzBPqE44foi40V5iy4s1licvvj4EsUlnCVHEtGJMYktie85oZwGzvTSgKW1S6e4bO4u7hOeB28Hb5Lvyi/nTyS5JpUnPUp2Td6ePJninlKR8lTAFlQLnqf6p9alvk4LTduf9ik9Jr09A5eRmHFUSBGmCfsytTPzMoezzLOKs6TLnJftXDYlChI1ZUPZi7K7xTTZz9SAxESyXjKa45ZTk/MmNzr3SJ5ynjBvYLnZ8k3LJ/J9879egVrBXdFboFuwtmB0pefK+lXQqqWrelfrry5aPb7Gb82BtYS1aWt/KLQuLC98uS5mXU+RVtGaorH1futbixWKRcU3NrhsqNuI2ijYOLhp7qaqTR9LeCUXS61LK0rfb+ZuvviVzVeVX33akrRlsMyhbM9WzFbh1uvb3LcdKFcuzy8f2x6yvXMHY0fJjpc7l+y8UGFXUbeLsEuyS1oZXNldZVC1tep9dUr1SI1XTXutZu2m2te7ebuv7PHY01anVVda926vYO/Ner/6zgajhop9mH05+x42Rjf2f836urlJo6m06cN+4X7pgYgDfc2Ozc0tmi1lrXCrpHXyYMLBy994f9Pdxmyrb6e3lx4ChySHHn+b+O31w0GHe4+wjrR9Z/hdbQe1o6QT6lzeOdWV0iXtjusePhp4tLfHpafje8vv9x/TPVZzXOV42QnCiaITn07mn5w+lXXq6enk02O9S3rvnIk9c60vvG/wbNDZ8+d8z53p9+w/ed71/LELzheOXmRd7LrkcKlzwH6g4wf7HzoGHQY7hxyHui87Xe4Znjd84or7ldNXva+euxZw7dLI/JHh61HXb95IuCG9ybv56Fb6ree3c27P3FlzF3235J7SvYr7mvcbfjT9sV3qID0+6j068GDBgztj3LEnP2X/9H686CH5YcWEzkTzI9tHxyZ9Jy8/Xvh4/EnWk5mnxT8r/1z7zOTZd794/DIwFTs1/lz0/NOvm1+ov9j/0u5l73TY9P1XGa9mXpe8UX9z4C3rbf+7mHcTM7nvse8rP5h+6PkY9PHup4xPn34D94Tz+49wZioAAABjUExURf////fetffelO/Wre/WjN7OpebOhN7OhN7Oe97Fe9a9hNa9c9athM61a8WtjNacWsWca86UWrWUa72UUs6MSrWEUq17UqV7Wox7a5xzUoxrUnNra3NrWntjUmNaUlJKSgAAAIa/w40AAAAhdFJOU///////////////////////////////////////////AJ/B0CEAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAEsSURBVHicXZDNjtswDISHP4ost8Ve9lYYu+//VoGxtwDtJfU6EsnSCdCmJQTw8IkzQ+o7jjozNbn6gr+lj8YRe53t/PY/WSPQZWJ9QneyyiB2QCrW5R8SXnd2Dyo6Pr4/E348IR2lXF6fiJjCWFWCHHLZlj9EbTC7SP6IEVO5K97JrTAckwyAeId+O3IkOYNnmDT6vBWizOf65ZhZ0QQ4KfvPK9eJnDTk4UMGGin2a0MqtW7KdCe5fTib37bWRcYoCGPODMqZGX4ij714wE41Ri8vl01RXPhYlHyvluvAp921saabAS7axXpRMerz1zh8alft2ctgdStpk5PSlfU6HTeeWXse24uapMaIDL+sldrMoJcf4NZIc4/Usq5YPhoGG3H9hOynkkmTbP4beIqL5HGYwHAAAAAASUVORK5CYII=);\n    text-shadow: 0px 1px 2px #FFF; background-size: 17px 17px}\n#empireBoard #BuildTab table tbody tr td.building.winegrower0:not(:empty) {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAABQRJREFUOMuV1MuOHFcBxvH/OXWqurqqu6vdM56LZ3wZC5w4G8OCBSAQCCkSEjs2bBBSFlGMxIKd90hIvACWeAUktjwCQjFJhBNMhtie8fSkZ3r6Xvc6dc5hwYaFjcj3AP/f7lO8YcX8BZ7qPFxMP//9p+MPeTb7J23jcyMZcf/GPRbFnLTc8M2b32V3/8EvTVs97m4dvbal3oQ4Y0E6yqJgPJ+xTgvAMtMNx7mmcRW+ryhNhjY1ranelHo9orMrVJiE6fLkrXU9Z1VO0brGU4Lalqz0DOEbnIpZBjOGXkrj8q+GGF2CtT/J8vEHJ/VTTKdE1gLnBNZYdFPTESFeENDQoJ1Gu+arIQAOZz3p235vSCeaUBYtrXaUmcE5h0g0XQFN5jAJtJr/H6mzKSAinIkDf+c0zPbfDuRzgm6FaR1VZslmDnEA/X5Ar7NF38Tf34v2F222+rNzduP3R/8bsbpEeP6Pi+X4D+cnZ+EXH51xpS11CBZBMQe77lBHIVVkSasLzk7/9rNef/jT/tbtx73B4W+yzXTWG+y8HtHVHNXph+V8/L3F+UX49Mkzzk5mrCtBGA8JE0FgHG3XIFSJ2mk4LRd8/I9P2D3o+/f51q9uCRcn/VuP/htSALZZAiK2unq3Xpz/oLw4f3/xfMrkyyV5VXM9HvLO3j7KF1hhSW3Gy3RMXhSEMZioJfVrxuavgjnvHToYJbceZel01uvvoNpq0W/q8kdllv8wnZ+/v766CrPTBek8w5eSuNNh1OshBMSqg5CS5TKnsgIuQOxCnChMBWmz5ovqL8K04j3hBMng8FG6uZypJlv9bjOb/OL5i9Po2dPPOT27gFbwnaO7PDg4YFmWSCkpm5rxZkleN8yKDYO3fAZJRKsrZGCoU0e2dqhww8v6Q6E8+Z7viYvR8P5vVXH16uHl30/47NNjpqsNurZEgU/aVCRxxG6SsCoK5nXDvyaXTLOMOFHc3tlChYa8AuEE0RZIKTCNI+/MuXRPxG69++uoGh4rXaaIquXta9e5k4xY1TWx73OZbfjo7BWDTkimNfM0RbcGTwqGOz7Jnseq0hhjUYCnBEKAaaCtHZldMTHHUccd7KvWWPKmBiEY9npsDQbgHKuy4HhxSVZVaGsZdEMOt0cYYQj2S9pgTZs34AALtgYZgghA55AWFavehEqsUFmRc3w55eJqxXaSsNfr4Xsem7phWZZsioLtfp+v7e1xmAzRXsM8uSTfrDDWISRY45BW4EmwgBeAtQ6DxmJQSsO1KOKlvuLldEpRlgSeR9223EgSpIDr/T5HW1sMOiHnm5qrVxXCaKItiW4N64VjuC/oh5JaO6x1oAVSd5BOobJXOZFQxN0O803KYZIw6vWojUGbluPZlHVecjKf0REeZ4slxD637t4gcHA5zsgmGVHcIg8EnudopcOrQ5LikG4zQk1WCybrDUXdUOmWQmv2g4BICBZ5ThxGSF8hQ8WqLImSLl8/usm9u4coKZisJnySPcepKZ7X0lUS3Vh8EXBNbhOLHurmN45IP3vOnue4di1Gh4JxmaK0wzhLMuryzt277OxsIX0fKSRR3C97w93HUgj6vd2Hnduj7lg8xbhzrKyRQhJ4IUr6CCFQRw++TRh1qPP1fw4SwXxZMXkxI4ljbt4bsXPrwA227/wxCKMngOfgS+EFf0IIBt3ux3eS7Z+7sXl3nBeY3hQhwPdCpJDg4N+FYbSjpEdluAAAAABJRU5ErkJggg==);\n    text-shadow: 0px 1px 2px #FFF; background-size: 17px 17px}\n#empireBoard #BuildTab table tbody tr td.building.stonemason0:not(:empty) {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAMAAABPqWaPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAGBQTFRFAAAA8d/I6N/WzcS26NG27Nq68ezjv7Gotq2fyLqk1s3EqJqRraSWsaSW2sit0c2/pJaIrZ+Rn5GDqJqN49bE39rR7Ojaloh639bIxLqtsZ+R+vXxsaia39HEjX9xsaSaTMajHAAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAAAEgAAABIAEbJaz4AAADqSURBVChTpdDRboMwDAVQcBoTEqgDrkMAk/7/XzZM2tpufdt99NGVZTfNf9OCudhPYBE6138g69GHYeyvf4AAKYYhTL/Mkgf0M08hcnijmxFJZolVIvevlUwisHKc47u0IpT9Skhb7cSntAAnGNxFtdpTEmTyhiTtnlXHsb+8islIaTfzKcrXH/EkCCbt3aLOOVX9llSPSfkA1BLU6aTuHNsWs5cE4gXwXnjbmL86FjA7t66GThnKzMxx2yrcAKXuHIPr/ClLpfqgxh6ShOKkyjG6nO6lLHwe2xz1J55inIYwL+EALqXMNcsD5M0SNKvkKqsAAAAASUVORK5CYII=);\n    text-shadow: 0px 1px 2px #FFF; background-size: 19px 19px}\n#empireBoard #BuildTab table tbody tr td.building.glassblowing0:not(:empty) {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAABJxJREFUOBG9wcuKZGcBwPH/dz3n1DlVXdXVPe3ETHomMQaSjYLEUYgv4CZP4VpGwQjZZOvChxDyFBJcBATNQjfiIgbNMEmc7uq6nfv5bjJCgwxMsvP3g/8DwTdw3RYQ8zg1b4cQTKMqTIrkTE4Z+2egttUdvo7ma4Rui9Sm7Jvtz7tm9+s2SH1QkozAWg1jWc7fTYmP+AaaF/DtBill2da7R9vD7v0ntbNHc8EkC3IZiJnUImXvrBYnH3ddPc1mc15E8wLj2CGFfLg97N77y5Wz2zTHFBmZkURheDJpoTr/y0Ttk+8/6XZPfGbzTxIcdXnG/9KuvTlxU/+DPkg7qgxFYiGGKa+qP17dHO0XjTePW4nMFGVISJmAQKsE/x5U2Q37D1y7Cy/Nzbhart+NKX3Ec7Sfuneaev/h08kUo52jCTgx+NLzGyPiaYjJxCiwUqGVJCZwISGFZDvBv652srm5kt9/sNb5ib4/jAPP04Pz+VXrsn8MpRG5RYrERmhzMbXvr0SDjgNSFCgh0BLGEEhSEBP0XcfjL27wfct07zTFRJsQPE8HNXurS40dMcgoUVJQY5icVrUuaBNEEiklIhGXIkSQDrabaw6HIzPpyYUXWRrfPFuflq69aU255paMQp4GlMiNpLAKKUAIGDHsYklnzojSMsXI6CISiUqCpm7Yba4JbsLmOcJkwo3tr/p2/0gIWU7NNbfkFCWNlygSF5Uh15KU+K+QQNkCYwuUtrgUiSnhXGCz3dLUNcUs5/LBJdXFA3pV2rE7vueG+mGYOm7JTPjrLA3ppm5IMbDMNTEmfIj4GBl8ososhVaYFOndwM1+R725QmnNnW/f4+TsLk6XRDsnRm9SnGwKjlvSCv+301x2wnV8frVDi0hhBD4mXEgMPoFULHPNMtcI5/BDQzXLeOXykrOLu3zZeD7bdAwBktQkNFFobslqNv/9+uTkt/fnKe0Oe77at5RWIgU4nxh9oO5HpFLkNsM7h02OV1/5Fm+9dsnd1YIgYNP1NF7Sy4UOMvtxWVala655Ro79oVnl+g+vLnV7nk082R459hMzq4gkfIhMIbDvHTElTnLNd++/zJuv3eflszmnpeW8LMi0YoySYzCia/ePur7/0Tj2PCONLRYIOV/Ol399YynB9zzd1xQ6oUWiGXq0jLTTQDNFLs9P+d7lXc4XM5QUOB+5t8z4zqpi8oLHTeTLLszGwE/L+bKcmg3ST/1PDofN7z7ftw8HNWc+K+nHkWPbU1lJZiTCGJQ1LErLS+uKKCW9S8gkaKeA1ZJ1Zeh85HpM1Mky9Yefjc3+h37qkM45u+/H/NMa/dlYYYqKRVVQT5HCaF6/s+SsynnjbMHr64Jn/rkdeFo7YoRMSVICAeQK+gBfdZpt54suqreL1T2ljbXjIjNTVTfZ3w+JrFqwynMW1rAqDOvS0IWc89wiBXx6M+JCZF1KaufZ947cS0QUrGaa4iA4tp62sKJP5heyH/4k89ni46xaf5iJhNtfMY0Dwzgx+QEjA1oLVoWhMBJSYpo8uRIYJRhcwihBTInBB6wSnGWK09JgZwsm7NxHsfoPqKt+g05SC1UAAAAASUVORK5CYII=);\n    text-shadow: 0px 1px 2px #FFF; background-size: 19px 19px}\n#empireBoard #BuildTab table tbody tr td.building.alchemist0:not(:empty) {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAMAAABPqWaPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAGBQTFRFAAAA8d+/9d+W1rZ638Sa8dq29ei69dqD48h60baN9eOf+uzR+uio7NatupZs8d+f+uOR6NGRza1sv5pfrY1oyKRj7Naa//G6/+yftpFa//r1/+yopH9RrYhW2rpx7NGDIqezSAAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAD4SURBVCiRpY/ZcsMwCEUdLQZL3iQZO8RC+v+/jJpMm2mat/IGZw4Xuu6fdVHafAS2BxzsJ9IrcGawf5kfQVllBvOGrPdKTQa1nt82Wr+svQ8xprTRr7Muu3L+uGLiVvPLutz8ovrjvCrizFG26Sf9tjt3nOsKJYkUnTfzrUzVja42gJozVcr5MW+vVKeqrg4JMQqXwvICheoJkUvFJETCTxDGE1N0KxLrClqYRJ7GeASKu6uFOCJUlsRfOX1Qrn1Yr7XExKkAlCwtx/chBB0jroCRmFNbB5R57pYQzDCYHdaHwk0GQMlzZ+00Tda61upE0exmV4CUtztm+xM5HuXJowAAAABJRU5ErkJggg==);\n    text-shadow: 0px 1px 2px #FFF; background-size: 19px 19px}\n#empireBoard #BuildTab table tbody tr td.building.palace0:not(:empty) {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAA2BJREFUOBEFwU1rXVUUgOF3rb3P1725yU3TWJWohEJxUJ1aOlBQiujQiQNnIo6c+gsExwqCv8BB/0HFoQNxoKK2tIJtKNUYaz5u7kfuOWefvZbPw4M7n/rRwY9/zufnbw/u4u5yPjt55+jJL48e3r3tR38/OJ7N5u9fXKzicrHg8PHPzM/Pbx49+f23+z994wd//JDPTo8/12ZjjuV/r1ruvhra7mbq2tdy7r/ou9P9jY0Gd3bykL4U93erKk6fffH6xOz8s747fGU6XrPVLDVo+kQWhx+6FLcg3nDr7VhD9lDqZfessaxxxljGh3Z1lrI+kEJ/jfHoA8nHm1EL8ICWLyEHd95zqZ/HR9dwNmmaRF2tqEYVcWMPimdoVwOr0wUXXcBCJPhDtptjoOFiLkx2XiW2s4RUh3jbos0lRhFUM+Rt3LbAJoRYE8uBsHhEoSvq8pjg0KVMu4QYz4giEBgIPiNKopKGGDYgNECJSCQUI4oyoN0B2ClVdKJMGcTAhdSuiQioOJGBJhplFQgFuGTAgICIEDwj7SmpOyYVNbFsEHrcA9kyigACIGgo0FihwRDJOAEn4gQEJ4ihPmBpwIeMqCFqSFAigAiIAAhgCAkk41IAEQccQzAcMHfAUUkEBRHQdQd5ANxx67HUkrPiFgFFUBRDLGPmZAN3MAfLjpARG4iHJ7CbYVOcInV4rsm2jdAQyIgouIKDO5hBGpzVGlJf0vZCEyGC899caLOjVSZURgiBUAZ8GNAwYK503cC6c1Zr6DGiDEgTaXulrJW4u1Ox7hLuznIlSOWU0qG0xGGFlHOMmvVizcnS6NewWQujQiE4rSgSIlruvMxkc8JkLNS1EgslFIbIgHuHWwIMCU4ZYdzAqFY8G4uTGX2XCGVF1MuvM+gYWd4je09OiZg6irKlKnukMnJOWDCq6LQ9LBaZfrai65Vm+hyxHhF3965/N2/Gb3G+pXn9F4MM5LZFfU4rJdovsWTkQdDRCKxlnXaRsMX0yh7TK/uMp1eQ+XK1N3SLj3SYXfXh4qkW+aZz94bqE0S3Qd4AuwQ+x/P35PyYlG89tbR9Oyj36o2tF8qqOhJ3BxDA2y69ebE8/Xpxdv/aOM4QE8ymuAfAwM/I3tGynyY7+99uTLY+tpz/GY8b/geGd+pmTCUDLQAAAABJRU5ErkJggg==);\n    text-shadow: 0px 1px 2px #FFF; background-size: 19px 19px}'); if(database.settings.smallFont.value) GM_addStyle('#empireBoard {font-size:11px}'); if(database.settings.hourlyRess.value) GM_addStyle('span.resourceProduction {display: none;} #js_GlobalMenu_wood, #js_GlobalMenu_wine, #js_GlobalMenu_marble, #js_GlobalMenu_crystal, #js_GlobalMenu_sulfur {position:absolute; top:0px; right:0px}'); if(database.settings.wineOut.value) GM_addStyle('#wineOutTable { display: none;}'); if(database.settings.onIkaLogs.value) addScript('http://ikalogs.ru/js/etc/script.js'); if(database.settings.newsTicker.value) GM_addStyle('#GF_toolbar #mmoNewsticker {display: none;}'); if(database.settings.event.value) GM_addStyle('#eventDiv, #genericPopup{display: none;}\n #redVsBlueInfo, #redVsBlueInfo_c {visibility: hidden !important;}'); if(database.settings.birdSwarm.value) GM_addStyle('.bird_swarm {visibility: hidden !important;}'); if(database.settings.controlCenter.value) GM_addStyle('#js_toggleControlsOn, #mapControls, div.footerleft, div.footerright {display: none;}'); if(database.settings.withoutFable.value) GM_addStyle('#buildUnits li.unit > div > p, div.buildingimg > p, div.buildingDescription > p:nth-child(2), #tavernDesc > p:nth-child(1), .content_left > p:nth-child(3), .desc {display: none;}\n #buildUnits li.unit > div img {transform: scale(0.7);}\n ul#buildings div.buildinginfo img {transform: scale(0.7);}'); if(isChrome && database.settings.withoutFable.value) GM_addStyle('ul#buildings div.buildinginfo img {-webkit-transform: scale(0.7);}\n #buildUnits li.unit > div img {-webkit-transform: scale(0.8);}'); if(database.settings.ambrosiaPay.value) GM_addStyle('#confirmResourcePremiumBuy, #confirmResourcePremiumBuy_c, #premiumResourceShop, #premiumResourceShop_c, #premiumOffers tr.resourceShop, div.resourceShopButton, #individualOfferBuildingSpeedup, #premium_btn, div.premiumOfferBox.highlightbox.twoCols, div.actionButton:nth-child(3) { display: none;} \n li.order {visibility: hidden !important;} \n #js_viewCityMenu ul.menu_slots li[onclick*="view=premiumResourceShop"] { position:absolute; top:-1000px; left:-1000px;}');
	//jQuery UI CSS
    GM_addStyle("/*!\n* jQuery UI CSS Framework 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Theming/API\n*/\n\n/* Layout helpers\n----------------------------------*/\n.ui-helper-hidden {\n    display: none;\n}\n\n.ui-helper-hidden-accessible {\n    position: absolute !important;\n    clip: rect(1px, 1px, 1px, 1px);\n    clip: rect(1px, 1px, 1px, 1px);\n}\n\n.ui-helper-reset {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    outline: 0;\n    line-height: 1.3;\n    text-decoration: none;\n    font-size: 100%;\n    list-style: none;\n}\n\n.ui-helper-clearfix:before, .ui-helper-clearfix:after {\n    content: \"\";\n    display: table;\n}\n\n.ui-helper-clearfix:after {\n    clear: both;\n}\n\n.ui-helper-clearfix {\n    zoom: 1;\n}\n\n.ui-helper-zfix {\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    position: absolute;\n    opacity: 0;\n    filter: Alpha(Opacity = 0);\n}\n\n/* Interaction Cues\n----------------------------------*/\n.ui-state-disabled {\n    cursor: default !important;\n}\n\n/* Icons\n----------------------------------*/\n\n/* states and images */\n.ui-icon {\n    display: block;\n    text-indent: -99999px;\n    overflow: hidden;\n    background-repeat: no-repeat;\n}\n\n/* Misc visuals\n----------------------------------*/\n\n/* Overlays */\n.ui-widget-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n\n/*!\n* jQuery UI CSS Framework 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Theming/API\n*\n* To view and modify this theme, visit http://jqueryui.com/themeroller/?ffDefault=Verdana,Arial,sans-serif&fwDefault=bold&fsDefault=1em&cornerRadius=4px&bgColorHeader=F8E7B3&bgTextureHeader=03_highlight_soft.png&bgImgOpacityHeader=75&borderColorHeader=ffffff&fcHeader=542c0f&iconColorHeader=542C0F&bgColorContent=f6ebba&bgTextureContent=01_flat.png&bgImgOpacityContent=75&borderColorContent=eccf8e&fcContent=542c0f&iconColorContent=542c0f&bgColorDefault=eccf8e&bgTextureDefault=02_glass.png&bgImgOpacityDefault=75&borderColorDefault=eccf8e&fcDefault=542c0f&iconColorDefault=542c0f&bgColorHover=f6ebba&bgTextureHover=02_glass.png&bgImgOpacityHover=75&borderColorHover=eccf8e&fcHover=542c0f&iconColorHover=542c0f&bgColorActive=f6ebba&bgTextureActive=02_glass.png&bgImgOpacityActive=65&borderColorActive=eccf8e&fcActive=542c0f&iconColorActive=542c0f&bgColorHighlight=f6ebba&bgTextureHighlight=07_diagonals_medium.png&bgImgOpacityHighlight=100&borderColorHighlight=eccf8e&fcHighlight=542c0f&iconColorHighlight=542c0f&bgColorError=f6ebba&bgTextureError=05_inset_soft.png&bgImgOpacityError=95&borderColorError=cd0a0a&fcError=cd0a0a&iconColorError=cd0a0a&bgColorOverlay=aaaaaa&bgTextureOverlay=07_diagonals_medium.png&bgImgOpacityOverlay=75&opacityOverlay=30&bgColorShadow=aaaaaa&bgTextureShadow=01_flat.png&bgImgOpacityShadow=0&opacityShadow=30&thicknessShadow=8px&offsetTopShadow=-8px&offsetLeftShadow=-8px&cornerRadiusShadow=8px\n*/\n\n/* Component containers\n----------------------------------*/\n.ui-widget {\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 1em;\n}\n\n.ui-widget .ui-widget {\n    font-size: 1em;\n}\n\n.ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button {\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 1em;\n}\n\n.ui-widget-content {\n    border: 1px solid #eccf8e;\n    background: #f6ebba url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD0ZHJ6AAAAfUlEQVRoge3OMQGAIAAAQaR/Iiq5u0oEhht0+Etw13Ovd/zY/DpwUlAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVBtVtsEYluRKCAAAAAASUVORK5CYII=\") 50% 50% repeat-x;\n    color: #542c0f;\n}\n\n.ui-widget-content a {\n    color: #542c0f;\n}\n\n.ui-widget-header {\n    border: 1px solid #ffffff;\n    background: #f8e7b3 url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABkCAYAAAEwK2r2AAAAY0lEQVQYlaWPMQ6DQAwER/v/7+UhQTRH7N00QEESiUAzki17vOb1fEQAR8QDpSaUmhHkYwSAb4LEKD2vAryc3/2JpFC8IDzWfHgg0qcEd47/haT3VEZxbWUKQW89GhFffeEi3kGvSQXcQU8oAAAAAElFTkSuQmCC\") 50% 50% repeat-x;\n    color: #542c0f;\n    font-weight: bold;\n}\n\n.ui-widget-header a {\n    color: #542c0f;\n}\n\n/* Interaction states\n----------------------------------*/\n.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default {\n    border: 1px solid #eccf8e;\n    background: #eccf8e url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGQCAYAAABvWArbAAAASklEQVQ4je3Puw2EABAD0fGw9F8KFSFqgJTgCPhEFHBCmzxN4sCs8/QToGmaz7JvC5JgMiAnhbEwjoiFPpXUXda1SPyHM03TvHEAd0QJtjgD5PAAAAAASUVORK5CYII=\") 50% 50% repeat-x;\n    font-weight: bold;\n    color: #542c0f;\n}\n\n.ui-state-default a, .ui-state-default a:link, .ui-state-default a:visited {\n    color: #542c0f;\n    text-decoration: none;\n}\n\n.ui-state-hover, .ui-widget-content .ui-state-hover, .ui-widget-header .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus, .ui-widget-header .ui-state-focus {\n    border: 1px solid #eccf8e;\n    background: #f6ebba url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGQCAYAAABvWArbAAAAR0lEQVQ4je3PMQrAIABD0Z/o/Y/Wk3RwLBSqg0KXHkBKlkeGv4SrHd0AIYTf8twnBmEkDF5IBTMxlupaM1HB0ht7hzMhhC8GEiwJ5YKag9EAAAAASUVORK5CYII=\") 50% 50% repeat-x;\n    font-weight: bold;\n    color: #542c0f;\n}\n\n.ui-state-hover a, .ui-state-hover a:hover {\n    color: #542c0f;\n    text-decoration: none;\n}\n\n.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active {\n    border: 1px solid #eccf8e;\n    background: #f6ebba url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAGQCAYAAABvWArbAAAARklEQVQ4je3PsQnAMBBD0S9l/8kyTFIaDDkXBkMgA5ig5iEdXCHafZYBQgi/5ekXrlmFpQNLxmDMTOv2rrU+kHYYE0L4YgB9ewvfYTVHjwAAAABJRU5ErkJggg==\") 50% 50% repeat-x;\n    font-weight: bold;\n    color: #542c0f;\n}\n\n.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited {\n    color: #542c0f;\n    text-decoration: none;\n}\n\n.ui-widget :active {\n    outline: none;\n}\n\n/* Interaction Cues\n----------------------------------*/\n.ui-state-highlight, .ui-widget-content .ui-state-highlight, .ui-widget-header .ui-state-highlight {\n    border: 1px solid #eccf8e;\n    background: #f6ebba url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAjElEQVRYhe2UOwqAMBAFx2DlMbz/kSS3MIUIWij4aZ/gK952YZohu0y3zNPGOWur3Kcfxsf7D16c5YBD0FUOoDjLAdeKHeXWVi9BRzk4f9BVDqA4y8HrBt3k0sEveDqo8nRQ5emgytNBlaeDKk8HVZ4OqjwdVHk6qPJ0UOXpoMrTQZWngypPB1Vu38EdG7NcOPXFHAMAAAAASUVORK5CYII=\") 50% 50% repeat;\n    color: #542c0f;\n}\n\n.ui-state-highlight a, .ui-widget-content .ui-state-highlight a, .ui-widget-header .ui-state-highlight a {\n    color: #542c0f;\n}\n\n.ui-state-error, .ui-widget-content .ui-state-error, .ui-widget-header .ui-state-error {\n    border: 1px solid #cd0a0a;\n    background: #f6ebba url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABkCAYAAABHLFpgAAAASElEQVQYld2PMQ6DUBTDbP/7X4grde/6GACpjN0QS+QkyhC+n20CeI3MQChJJ4GEka7LEtkiRsJF2llw0G02SP5k0oxPOP2P7E3MCpW4kdm7AAAAAElFTkSuQmCC\") 50% bottom repeat-x;\n    color: #cd0a0a;\n}\n\n.ui-state-error a, .ui-widget-content .ui-state-error a, .ui-widget-header .ui-state-error a {\n    color: #cd0a0a;\n}\n\n.ui-state-error-text, .ui-widget-content .ui-state-error-text, .ui-widget-header .ui-state-error-text {\n    color: #cd0a0a;\n}\n\n.ui-priority-primary, .ui-widget-content .ui-priority-primary, .ui-widget-header .ui-priority-primary {\n    font-weight: bold;\n}\n\n.ui-priority-secondary, .ui-widget-content .ui-priority-secondary, .ui-widget-header .ui-priority-secondary {\n    opacity: .7;\n    filter: Alpha(Opacity = 70);\n    font-weight: normal;\n}\n\n.ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled {\n    opacity: .35;\n    filter: Alpha(Opacity = 35);\n    background-image: none;\n}\n\n/* Icons\n----------------------------------*/\n\n/* states and images */\n.ui-icon {\n    width: 16px;\n    height: 16px;\n}\n\n.ui-state-error .ui-icon, .ui-state-error-text .ui-icon {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAADYSUr5AAAA7VBMVEXMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzMCgzrDkZjAAAATnRSTlMAGBAyBAhQv4OZLiJUcEBmYBoSzQwgPBZCSEoeWiYwUiyFNIeBw2rJz8c4RBy9uXyrtaWNqa2zKP2fJO8KBgKPo2KVoa9s351GPm5+kWho0kj9AAAPhUlEQVR4nO1djWLbthEGyUiq5YSSLXtp7FpLOmfzkmxr126tmi2p03RJ1/Xe/3EGgARxPyAgRbIk2/hkSz4CJO4+HsE7AJSVysjI2AMUUOxahZ2iANhzBtZWr4BoIRSYAVN5u4QwDwQDRbcwfUi5KS3wFuDmFnQLa4Dtb//cqktwD5QEFFwfUs7PoCCA7y4bEJVFizcIob8KmhAplwwqVjt+9FBl3uINQniwEiryEyw9JHqGpQdEFNi+B4QQ7QOiHhysIPoAxUqxvdvvA9K42bsAv4S2fxfYOe57IJSRkZGRkZGxx7jxSHDHcRBXQMTyIjInBgHwBJ/bEx8PEANC+uhbpSSggCBAVODVabpI1S/k4WLZpTn6NpMhoX9Y40hxYERFpMcqUs4AloCtDQdID1YhnyXZ2hLjAYWiO9Dy1PDB7tPhIqLx+uMB8grZaR+Qxl2/C2RkZGRkZGRk7A7rBf7J0DR5/LUTjzUPIPSPGvQJiVJiB7kcQCiUOJrcFNtDZIf2xarQ3aGvLNxAVIFAabz90BFiBIlycTBhgWwOWCH0FLYHlPqwHaCvcIn2ZbosCevfPTRiFFcgvHukCjWwrc3GrGh1fsAof8EaUReKXkCB4/MzFNo97qLpFiKFYv/kNR5YQxQbQEofkZ2OuEOHqqT6gFTpru8CN7x/+jaZkZGRkZGRcV+x/rLUNcMMqUAscgnFocmpqkTzqymwVAPxfJ5PnIUUQOUKT04tEdWZyv3JCQSn96WS4pD97QfyW25A7NhSAbyhmVj0FEltA4vdiygBibXhoUYgykCUP7HwPTDeEqAIcHVMkZg7Zx4k0uFANs63hPQXCoRLAwdgGsr9Az7Qv7sgQGgg1aPl/BJLExBWgG4RFRLFImGmIquPC/klEGyCG0AuAXaJJC+B8FVe9NYQDEcXB8g6AQcjYJ1goJIggHWCrFR0S6kRHN5+4BzFi8NaoN35NRxUvL+JJdZr7PV4wK6fj8nIyMjIyNhr3OxdXAYq7FHZwB6bDSzSh4sF0utChqo0NAvaT1hLzXwFinmCzmeDucEQK18TTaQoFgP7bNC+RZ4OT4T6gQogDFYk+1QxQlj19QGSAWKiLYp8P0Ag1Gbz1ULfWHLg9iUnQNK5QQJcukm04blKLH2GgEJCY+HzXAZWCvHKco3Bp6MIaCjSXXRJyOxeqhnzEaF93MfFGW/O16ZvDL5TM4MJIjujz/cHypkQuuzRwWJ93BKdIt+wCRAPl9kpe2Ikkb2mFgGlxh/i40d3EHfdvoyMjIyMu43ylt/IAmGHnN5iIt7wKfbv01RAcJqFRl9lcjYQSnbQqKgC4fYOwSJt6N6trE0twZ9kN/PqNpTQeICvr4TLsDYC06U7BMjshS+v1/aT7IwQYD5LcgRQXMT2FrBfBLjZ6151jDElk9tPFfpUgk2yregusX25BJbwAFEfM+YI6vGAti4bTtizB+TjfQCrERyhKb2X8D6A9wX75P4t4neBYJeP6pdhg/gQl8MWvytzeSTjgOQBynQdh/iXKdxOrGJ/RkZGRsb9QmXihGr5+g8GGg9uTh+KoVZuNIzV+CwRucFBEyr1mVjx4irOxwM1BhirB6Q+2eNQi4eqR+aF6mELtoMzCR7V9RAFe/ZvQogNiyY8FPSUTFsLp8TeTmMui5mtw7bcaT0Yw2AA4wFRQIlkgq+1DQrNhkmoxS5Jq+u6bMAIGRECEANgXHTgWzwgBOhDH2l0oTQ4D8D5NMktBgNywAEMjo8rwATMZrPY7JGxBoJCkIBDQiAY09EGTUiBCWkUpISfGPR5AAwBfZiG2z7Ayc1yeKTxid39xBNwfHr4O0LA48ePFTvhYrF1r4tyAoz9n2MCqEuBtp/6GDR0oAYfG/R6wJExHYZHfhygsv7fEWCOj4bYmsP5A+pL4MkTfAnMlD4F+r3bobKvTyTA2P/w7PN+Agq2QW8piqMCpTBwenoKvX0AHGkGtP2YAPvTEWA7QUTAudn7/NxtOG46wWNmDtpBEkBzN7rBEvAFHp+YTB/q97qPAN4gHFqgBi8uLsC7qPCA6mg41G/+ErByPwEXDdoNxRhOx+M5jPEzQugS0ht+b1/Y3gEnYMAIAOIBE29/hIDucE8tmMsNOgK4B1RHFu4UCRlMHzv0xzcajcfdXWDs2h8TArBCkoDUJYDLmz6w7ip3BFS0ve5wTRwAn6keMA9I3QYbfSZ0DKbyt+7OXjGI1idPcfNyAyfAMlCrzaGqphYrxHocLHRJVycnfGUcbtT+jIyMjIw9x7Nn8fJSzG0TmFtO8rZT+XT3S3ub+tKJbbLd5diTVp50+zahyeHSslJ/YPrU0fuazrZO2CZ92/ZCCVXlGRiZKPJyPPRxyIFWeXLQBXJBKiq/3divEAN6ZwM200Qjm7EJBZeWm/PRWVCbYK7s7u2l4XaCz+lzgOfMfhMonXr7TWzeZb98dbgIzBT8Ub8eYYUqfZ4rVJ/MDbIDgPqTulJ/xvntWAtjIisqnwxOkGz0n077FARoY79GdA6HPE4rOy196NiMWHTZlSSApcOgXpy/fHV2joaNKu3ffsAnRcBf4K/6NcIG6tIxk3HyoXPjASqfUgXbYN5PzpL2njkR9QMjeDTVHDTCgRuxOegjoO0FvKzP/t/gmVdI24+G7NIe8JX6Wv3dDyldMA+4YB5wwTygtd+dwRqaTqrLb1l73zTSN52CNpnHuQOYPsDblybgxfkXh/oVtr+N1DEBJdhRJyd/Bd/q1z+cbNrD17iVKyajcnv9arhOkRPgsruuD6DmNPwpDNrLw2CoTgHni4yALr0L29+tiKAEIPn868ejx//8rpWP3OEOl5On9OwpcQm0MhafP/ey8f1uvDNIgGLQG8z4YO99ENgg95etwv4uYJYY8fUGHYH6j6fscHFZMftlAl9i+9XL73X3N/n+ZStOzfVfRvYXhrbdKOpEgVQTg/wsDuDD3kwOfQNMTJ5y+/ltUDWLunyxnRF46IqlBzGMY4X7inggREFioIyMjIyMHWCIB6ZNKAcXseo3vLTQTkVE7348dlwJJSz0+wLfmi8BhZqfw3D4ww/wHVLnEd5/fgYvXsDZ3MlsvYUbbnDjDZ3MN3TJG4+bxjAaDl8TBri9qxEw1ccao2wTNAMLHo2f+sjrXwb/9qHoYqgPMBXJTVfOpmrZH23y6uvo0LHSyY6fHGwKfHJlAuMFvObjDYrIqxBgQi20h7Hd/nYVLmno+eaNUm/eeH2GCuopntnhBJAlI2AHo9CCh1I1QxUdAbqqGY9BBLwyc3W4wYVhvY8A4BoIc1l5M7vnPWphZW9/Ses3n37y9a0uGqFwFQZsQQbd386DogpgEk+dzynsAZMJXq8+ns9NeukJ0PYrNATGGefJQlhkLo7DTXr+y3bNiOsDvrXTz/C2q1DXZH84iRNwrP88Nj+u2DjYEE6RBxD9Knj16ujVHC67A7422o02RwD3gB+t7EblWvu9geOFxSnd3ROmT+nJyQkhoPlsxVONc/3TEdBos+jtA+ZzcwHgTvD1cDjaYCcItA8w9i88A8b+mqSjc6Pvqd998QguEQPmQMeo23ODN86+p0/bn1buBkT6+oBhNZ/PYY4ZAHYb3PRd4LkZmPX68NRtMZn4ASvdA+qf0jMA5MP9eeg28Nug9QiLnj5A33U1MAES6xHAUNpz/9zFAYE1gqQDMT3G6xI9pwdw/aIgKoHCS1YGlRnSq9yCjdXjgN3j+N27YyROHxmuNAeNKPpYuXIyIyMjYy0M8eros59MF/PT2c602T7eA7zvhJ9dr/vzDjXaLp4Yc5+0wllzxzHv3gdmMMM7/CcQzKgVBqYTmFn+Z+mKm8J7k0A5F/jgCfjQ1WBhQyiOqD0lYuqBb+AyzMw9Ha2G3m6c8qQx+AlqnIceQp+Sb6i9UyQWbhr54+AjnZ0VzW2TAN0DmBT6PWmc6jDBE2PK2u+nF43dyP7Q0t1pOcX2fdRvH0mF2Q4JqN35rnHjVIeaXfIAVyUuw/aHCCiJy9iF5l1621zweI8KZrPZ9iJdb7DXJ3US0OSrtZ10imt7wHY7QesAzUMz1oZ3noB3qFJ/H18j97FYuw8QDN4oeKf30osvcSW2ExLo+VcbuAuo/sUIm8fMG9xocO3Ea19J9gFYivnHJ2KnyfovZlgW3v6ySx32abQiIyMjIyPjhlFDTLxpwIgFMnTp6A3g4IDKNY+stkwAMAoIAbasxBXqUWneSAWTMjt50lTqT29rFjvXohjsDNm2YPXDFlICmrJOZ3t6tHm8AiEAl0sCeLIIorIRt+cFbew/QRsoAXb4o1XSfoywzm0FTMAoYBNvLyFu8v8HpLBtD1iKgC17wHb7AI6d9wFbvguAIGTHd4E9wG7jgIyMjIyM+434c2R3HeV/Ffx6jtZu6ijl8h59T655jhR+rdHzDOP6beABCheb8O8/WFXeOyzgf5oAhVYnKxP7CwaAf1afJu8bSrhS6tdaXeGnrRenOqOlz9d6QwYnA/3TLd+GE7qe3chA5YF5DfY0vK3adfOX/gyNp2BW25MHdxAB9qvRiiP3/XpQQFGYDU4+Mi///XumXG8pjvaUAOsBGlf4jJt+YYEzeEzAdw06F19R3juM7D1wita86GR0CKfDHgLuXCc4Bri6vMLdfjMc4VNSUNsdodo2xu/1+Xl/K5+az8jIyMhYG/z5gJTMF1GtKq/a3rpyCvz5gJTMl9GtKq/a3rpyCmfQ4WwZmS+kXFVetb115ST48wEf/AGcfG1iw+tWbpbS2vJ3nQxcVr3lH3z5h972FUTLzYpOVk7l5hD+eYcYwDcAnewOotrZ4OtrPDucqi/LRX0/RR4qx7Nn4U8g+qjffvuN6Gf+nC85vwauHjaYyubqvWYKY4VEfSUMitdnBCT1Ue63R5439m+OgCn6DroAAaHPVQxKth/wkJgHmG8bmQMsT0D6EjDfvhVRKO3ywOQUgRA7nmL1uawZmHf1k+DPBwQ6NdcJ+k6Md1LA5f5ONdhJ8vZ5J0vLHT99srkGOjmJbd/G1r2Nriqnse1AZt1AalU5jW2HsuuG0qvKGRkZGRkZGRG0gcONyXsP9v8D0/IdJADiBNiXl3327WRGgOL/9HC/0XwlIURkRhC4tz6Z/fu7fUf2gHvfB9z3u0BGRkZGRkbGplHcnkgguQoSqtUXuhbs/wPtMwqV0HUJAvj5vk32b8IDuL23yn7qAXZ5u32hbRX7d3o82Df1FZXvbh9QOfhyxldr/+3xgXU9oKmvsHyr7F/XA269/eveBXrsv7N9QALe/tvjA0kPWAXGbvebkbHn+D/J5nMcHzx1UAAAAABJRU5ErkJggg==\");\n}\n\n.ui-icon, .ui-widget-content .ui-icon, .ui-widget-header .ui-icon, .ui-state-default .ui-icon, .ui-state-hover .ui-icon, .ui-state-focus .ui-icon, .ui-state-active .ui-icon, .ui-state-highlight .ui-icon {\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAAGvTnpvAAAA7VBMVEVULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxULgxwjo40AAAATnRSTlMAGBAyBAhQv4OZLiJUcEBmYBoSzQwgPBZCSEoeWiYwUiyFNIeBw2rJz8c4RBy9uXyrtaWNqa2zKP2fJO8KBgKPo2KVoa9s351GPm5+kWho0kj9AAATX0lEQVR4nO1dC2PbthEGyUpaqJii/JgbZ3bTLNmyJns/Oi1bM7vp0q7r/f+fM+JxwOEAkNTTSoxPlqHD83AE7gAQBIUYBHSfQv0XnbsJgH02A3g5ibVzDFNtlkPI1VjIuOUa8eMclOLS1uRSPBETURnOrkbmID9T9fuPyu+cSGYYKya5efeddN9TRS1H8eD4kDjrPutBpptt2apkiqX57A4gfloj7ua9AXMQ3dWvNs8n7NCwZk6bqYSg1CgNsaCBHDAluMQjcihEWBNYSxamUYNMs15KmwMUKhm0S5UBwMQFjcqxelSYskHBtLC26X7/eWQtVB1MaWXzF1OrUyhLgOrFiBwalDwg6+tigfzbnNbM40UlTrrO3clTftcuX7jyY9gkv81RVWI9K0OxNa8Hruw+EFctu6xaqDhCGkjQ2hyMitiXKyR+7xSqx6u6AitlpI3wrBj5OSo5xv8ZShoq5VZE+p/hb/OVzuPHyHGXQLoug9b4af/OzArAqtlvq8PidqZSflOYigVIpTZ33192wQ1jHVXLgjWWeZdAfhn3UteqH43NI9EGSjns7CJ//g8h6o6++UrLBTrOZJUkhy4NxDNAblZld53kJZl34z4jE5cB0HbA5RHnzg9Txud28wwG4aS1pwzKH7t/IyxlEvW2XVQLcf0vyeCWfL9j39vk95iA1alinhtmcHDr34tiSDECRgCXwFMgynMfrB0PlAxMhdUoPyKDo7qq2yNZHa+Li9BQoynz/I9DNkNcFCQSVi2aQbTOJA7S1tIXYpwM9t+PgBYzwFI0mNdt9JjxuGBHXJuwuJO+fq8KYzpDLtDll1XoYZ6k53P9dUNdNzwQZTcsvLw0Cafa0snfyq/WGVUVDo/VxBxXF5ynLZn6zUO/FvTIdjeiw3VUeyUqv7Q5+dIiz+W/VoTs03r+4U/ERpyHVbkIFAU44dGMKQBZfrwrGeAl4litNO9TVGFXRN1TDlfTyGVqdQaVEV7T0ZNJGO/NTQ9nL18aDk29b2Ui2SaqfhltIIMn4gpz+k+TiNNXkjf0LYWzf+DXO4UzHuF49WYS9pIIN3mjcoga1CNDuZ3kKzlja00XXS71OHFZjBhkI1K98WCQ/QC/r9n3qudrYVVea6aE9iP8L1A/KnWuJMZ+jwiyz+P3SFkcguW26os1MoON1p+35uAIgB3fXnzm2hscgvkD0PBi23t8YcEsP2u+gEUvdsXAg4VrA0y2zD/ZBgCjbz07ZNd4bBvYHQMPFcBFznsTv/hBOj9hkE0yvyRHcYZCK5VoEwGHQwU+dJBlX08BOMGx8MBk+I2oMHdQbLZFkGDADfVBQcmCx8Nb6S6fwJqRehFktWEAVsSA0yNP5DQm8wcW6tNr9D/T6PzGVgS2gP3iCoyPB/L4YF2A2ZICUKoZI06GSjdZYhdlxzeOLANIWxfoGkaofzK2BDRlWaq76VMAuRDbiXyhQiYTtV1L7hBS64vLpRJ/xbYMQRcPVPRT4802P5ruaHvrAv3BtDmzxwz3IsFcru92uL4GysByOVV7H4Rx7Xaqax2xvqiNEQId74svvjAcglfgwis/o+vnFdpxsCJHV8uomprlYHfNpPvrV79B4+G75+dG5i3NEGBh0+urAGWrXZ1uItAYmWJNQl28cCs1pd6/AX+c/Q0znEddU8OOLjEDWWF4qcsp8d7DgweI1Vv85bs8or6kK+g+8scLc22/Ed/oVI3WF9iGKrNzybSd8sQsS9u2sFyqiPXbaWpgH2Xg3x0Dclm+whsRABfKOXlh2tCpCqhMo3wGz54pBkxbsAxUN0ejCKbq/xXAt/dS/BPA9VC+EFC6jiTkrS8w3Raj+Sp2U/vcdFdGprxDRcPbAOa7LwYyOtEZlWh08EyUjdA/GtU4Gjs+bDxRN0bi6HbezUEZQGzNwIMHiB+NDMugG1UD7o4YwLne9MIbbEYGKNT9dIA2gLs/ALzrc1PphlwOAO/BC/n7Vk/DuL+lE67wdleAuQEH8sEik0/U0KMNuDMF3XWkvO3+wdDEFZQm6Vh6pAX47qfXeHYGMwcMXHc/wHc/PQYyAslWXNUPjNf3xEAlocNxqJjbQEYcW6sHO6bEH/6+VSgKf75S2AReOLiEa5Y/dEuF3/yKd0ootu+mvgQCzYt04TNUmPsNG0tga4ze+ZSRkYK3DiJCPYDdAb2ZHiiA78JZt/yge6XcIk67fLbVA1jASD1QILmlBDIy9o7Bxsn1APMeG5/b6SB9cHc9sO9sApTgPNXfXbJUuC2AxWPjjUiOzI3Hc8UmphFJCWQ8eAwehjEYbs2338j4cD+Vn4vgNfOwURsvXhxPDzwDay39+UVkOhCsiHrhwPovDyfxPIXC0xVJPeBqWlCPgvVzJ0FWgPEtyGZUxuCe9MB9zUcydgZ7BdksfFhBGKTM8tg2BkGHTlnJuEKx/d56r9m6gRXF7+ByBiJW11NAm8AoCKvj9HyfP7SfkkAwkjq0nc/jio8frDsFw+P0cYU7uvrh4NWz53avCrHwyOAuOAhvZiV6HVMIUk/uyA6GEwJGl0bReIzu8CZc0AY44o0gd/9PBvIcKObhX91HzAPMHrUK2L0tqD/T/oAbEAVx56B3qorHj9VZBNJHBTSN2lQrThpbkD4EC/RmWWQAhN78BuA2yanYE9x9e1pp9+yMdWug0QXeRJ+b8krTnxr80fGjU1xeegxMBSx1Rrr8EnS8y0t5aIIQ9RN9auPZZHJmJOXNM9w8QTEwh8efewwUGHE+n+uI1zpDZKCaLpfGVcGV2b173UGlr29qUk6EgQml57CQG4QcA5TRn1EJGgbsFlOMv4AFnbEALxBdvgfNVlSXn3EMAF/XRwaVyuM5wHNFJFp3uM8A82HXGs7NjxbbRlWKSCMSv/rVCWUgCEfU5jH8Whh3ot1WNz6WbmHTT1vbzSvKgBXBye+/NByKSEYSqpteGwauDQPXhoGW9PvGT69OZr2wvcNUcHph+gXwGgvGgFZATy8vvxby0FPtz11Tf93Pjat3eL9UbtvagQ+qWkfjIwhO/iLZBsC/zWFdc4G1itWc6Lb2WDcKy2DG/aMO1vH6R3t27PjCtIXpP75Wrum0V1/Bjc5GWc2paSvKVSeR8940C1az4gykFNA34hvQJXkPVGDrh6py4wHtoY1Y+WapTwOfBt3Ob+WkQI9BG28+V/sLG+N/bgYypUt/Kt0XZsemTffmjcloOqs3kACgNcVN+ivQjx24eYRO9uwZPMOKUAlMb27YyT4DDJBoOh/HmXbeGkl+hTnp55W6SyA1ZroNZJjnG8S3AGPO9t89njijpTk4Mw+ruUs0avB2BrDuEf+mHHnAE2mlfBlAdjBjThWFg8z2++/ZAw+btanGdivMqTEVhlea0uW7ckrbzTw9UZ2dbbTjWz3h0RgG7igDlkEzTBiQwKbdStXgTB7hhRlYCQiPzMhIAxvLpsnBNjrVrRqhH3ppSv1jpg8nlP9mJoGJj+lM2910mZzNBwDMdn0xw+410wzMfIXDxiWb27aNJeAy0PHvb0PAlm0g497xX3iqXIDt3mO0KVb/A2FGszM8bg9GfHcGm2EN+KCVHh8sl4V+mL7Qy3MAS/NwPezy9UJi1op2pjkxi7ZuJWPR4+4O7+H9TvPLWBs4H+DuO4Af+txUuiGXQ40JrxLu6wE3la7HjTCgmz3OC9TDdhDxd0/Tob+I+/PvTz9h/JuYAjFzAueCHHjHMjIF8PhheogycCPiT9vjfEBVVLq3nced8f9g/FPuHU3PXAG+Czdm3sGA8wHufjfgptINuRkZIfD+YOCyWe/eGlFQEDIg/P1B+2PgviWQkREg3dYO9FRZwACWe6in2gwD+NBtV26B7kElgAwcvPxEGyiKw3GQ8QBRHPv+9K35692kXajXyBZe5INKRO5gouVBMPIoIHi4koV6Ebge4cnDAoLIQYl7hCyKn8naK4CYgHorGAqgh4HDC2AE9tsFeBM8eBfIyMjI6MfeleD9qjw+DnBbmxGRCDy6byf9ChVhdn1mtVBLnIeTCUB05MOieGZqxDigEH4CP3xo2HBQAYzAJ94FMjIyHjq2XnbfMoNgdtx7J2CD2wT9CfANgl4ZfTlAkCNwisfvzz3yLCewQEgEmgxDflgCSAXGyh8Rg1UwfMtiT+KIgHwGY8n7r9BwCT2BkfRrY9sM9pu+dwUqIyPjoaPgkzfRf0s+EhCJ3G/HvdAEAyRc0PnYCIXGz0blRotPziJ2mZcCvQyEwwaP/3CUMzDskBGARqd6HDgHTIAmMnAPR4c+veMwVn5Yg1HBwQKDT7L4rH6CryEERfAKFLQFsJsMMHQbJNrIe4oPCgiCw/wYf/wKRhIwjnsFEEbO44CMjI8ae+3BgZliWiksXKYoPLsSYIDjwDDz6W+wjN4XviWMlUrewFZBPff/I0rWn9+GDPeZBUwLNACCiLuUAJ5sTwsBL9yrYsSqhwz1iShYgIm0ACaAsIXs3K75A5lgnZ7dGBlYxx9a8hkad/QPmzIyMo4O4bvWPipEZxa+4imDCRuf//HnMIcV3bHcEYXYKrJvdUooPbPk2U3pll4OIDhJBVYgfSytZoQAgvj+AoU+rSshAL4+gZU/mgYghrpAtL2T+GX8akLkl0Q48v4EcE/PYWdkfBxQx1SucfLOZ/Ik0c/2x48POGmaKdFz9jAsF0N+F1wLOlXWVpo2h+dVuApcxelg8jc34eZgVjGp5QOE9cRjQARmhE4vg8mqx79mnpeIHlDKg1ZdKmiaotTADLrr4Zd3LpESAOiXooN7N7ppAUjrdX3C8blKbjOcwOnF/OdABSCPdmX15fUP7BSxYr4AZPU/d+FQ+hKFgnnIV+EVy4KsAMHFxUW6BcBy2bWiqXlJvCq4Un9WADJ+RQTwVKZ++hQ9TuXpf7U4ZdUhCSp76CxG8C2576EE8As6Llm0j8EdZxMIICjvmQKT+MReIS6AaqmAHAY0yF42Be+K1LXtAjWWbw8YCRj6Qn18fvpbAA3XXa4RO0NVtQpbvFLaKYCR0WGr0VQ+8zfjoeHLL3uDS3kmqR3Nz6TNe1FPnc551CmRxSOrw6K9r3L+z40Sfo7pYSHBJle+Havreg1az9Tsob2NVOSl7delPHZoQdcnXgK89NmVZyK3F5iZttOWv4LxB3pUQNYDvnr6+s3VUzJaqrqhEzl9VAsgVWH4Lfyu+8xIBaXmrxlNzU43KpqQ8NZn0NgxO27xy/sSSdIKZnDSQmslBLIFuPoFAtAC9wTwi3n3IdWnI11ACVi6BDXYQvoP8Jfu81e3QOJfYUVXjCbh6up1QMPRqKKcZUO7Turntbc2sCEAZPYfWbvSR0Yn7Q6wgf5zw4DrAnJBia8vWCbkxWbZ9dOCn1gddKmSVl+8/vtCiMXfXxuylVe/b/pe94QdLdY5DbRt85HfGfeOKR2MSy0G133R97uMWMNsOn0LtO/3bxsbQtvlVTtNBfI48BXXwxdOKf5T4l9OC6+mXQatm67FzHJkyZXO76nhli9OkYev2/J0gDOrnQ1fyUK9Cvu1Z1rWAwThej7nBLpS9MrSpR9fu3Ob/F0XNAMiwIkCEYBvReTAjUSQ50F3VboQVADdOIxIqr65kXbV0m8lc25cEkiceSTItAD+rWgci5V64OU0cb1SuPCTO3l1NTo/P/cEQASnVicunnZ/bIFjlWwBNzfd7Jxez9rnV+y+C7yUo1Fn97nNWi0WfyaFNd1f6UQAnoM/5+gxRfmbkakSiEKiBcBUAqLnDN4TTu/uTgnZnshxSokvAgt7oF6B2WL9ISPDx3sg58x+h03uu3vk6LB4Ly0HSuCD7m7y/wcbgynBmFFsnGprPSUf8eA0qBcWuNc29BjdfaC7/tJ0vvcK93lYsJONu+gzS8iKN0S3Bzqrq23Z0vWN77t/33sRzrwUhxWAqzAtvJ8HMttUVfdM29YCUMSG7/FYH0Ag6deOfE0jsUSE8KsvdtAFehYfDoEf5FgU3v1wnzwc0SAlI+PTB8zY7MRfJd0DHj3y6cYvrTnkKEAYQ0CF4AnAhFlNr7hrZsAj2C0UcsxAw0Obyq1kOAiQ5GFHAocUQKrGjDygAA7cBfhA6d67QEbGg8eDfj9s2c1s4ceG3C+sm3dskVQC9dLCTJUWG9LHhlK+bvHHRryit5NXF2Lm30Eli6qT80n3Z9ep4RzO6cK9pMGnJ/IzOVLNXur3TVIB6Fax8tahiQC+1sBV2XXpo0MN8OrFK9rm1TCgacg9p8hZUxkZGZ8I+H2AIfoW6dvN6HXL25YeAr8P8AEskFYvQrs19J2Kr8LvLA2cFsnwDy78Q7J8Ab3hcvmUhfu0zsLd1+gDkLu2CVpeO/vSMHAFJuOTaCLiBvHBjz/Ij8BvgpY3fm9swmEBcAYsbLlyX1Wa4WHaz89GSAgIXKy0gHpo/Y67sQLg9wGG6CtHX21Cr1vetvQI8PsAQ/TVt5L+9mpTet3ytqUzMjIGYHTG3uijh5yr0+k6+PvyhJ7PexUU/QIQ9LnA40cWwEPvAhkZGftA/3tFjgqFGDocrRpc0+XV/ahenOIJAAr8ED8qADvbojmAL4BCvUFvX/zuHNsKQMcXlP6IW0AM/V0gUf2PtQVsC3UAp/lmHDv+D/qKcxyg6AblAAAAAElFTkSuQmCC\");\n}\n\n/* positioning */\n.ui-icon-carat-1-n {\n    background-position: 0 0;\n}\n\n.ui-icon-carat-1-ne {\n    background-position: -16px 0;\n}\n\n.ui-icon-carat-1-e {\n    background-position: -32px 0;\n}\n\n.ui-icon-carat-1-se {\n    background-position: -48px 0;\n}\n\n.ui-icon-carat-1-s {\n    background-position: -64px 0;\n}\n\n.ui-icon-carat-1-sw {\n    background-position: -80px 0;\n}\n\n.ui-icon-carat-1-w {\n    background-position: -96px 0;\n}\n\n.ui-icon-carat-1-nw {\n    background-position: -112px 0;\n}\n\n.ui-icon-carat-2-n-s {\n    background-position: -128px 0;\n}\n\n.ui-icon-carat-2-e-w {\n    background-position: -144px 0;\n}\n\n.ui-icon-triangle-1-n {\n    background-position: 0 -16px;\n}\n\n.ui-icon-triangle-1-ne {\n    background-position: -16px -16px;\n}\n\n.ui-icon-triangle-1-e {\n    background-position: -32px -16px;\n}\n\n.ui-icon-triangle-1-se {\n    background-position: -48px -16px;\n}\n\n.ui-icon-triangle-1-s {\n    background-position: -64px -16px;\n}\n\n.ui-icon-triangle-1-sw {\n    background-position: -80px -16px;\n}\n\n.ui-icon-triangle-1-w {\n    background-position: -96px -16px;\n}\n\n.ui-icon-triangle-1-nw {\n    background-position: -112px -16px;\n}\n\n.ui-icon-triangle-2-n-s {\n    background-position: -128px -16px;\n}\n\n.ui-icon-triangle-2-e-w {\n    background-position: -144px -16px;\n}\n\n.ui-icon-arrow-1-n {\n    background-position: 0 -32px;\n}\n\n.ui-icon-arrow-1-ne {\n    background-position: -16px -32px;\n}\n\n.ui-icon-arrow-1-e {\n    background-position: -32px -32px;\n}\n\n.ui-icon-arrow-1-se {\n    background-position: -48px -32px;\n}\n\n.ui-icon-arrow-1-s {\n    background-position: -64px -32px;\n}\n\n.ui-icon-arrow-1-sw {\n    background-position: -80px -32px;\n}\n\n.ui-icon-arrow-1-w {\n    background-position: -96px -32px;\n}\n\n.ui-icon-arrow-1-nw {\n    background-position: -112px -32px;\n}\n\n.ui-icon-arrow-2-n-s {\n    background-position: -128px -32px;\n}\n\n.ui-icon-arrow-2-ne-sw {\n    background-position: -144px -32px;\n}\n\n.ui-icon-arrow-2-e-w {\n    background-position: -160px -32px;\n}\n\n.ui-icon-arrow-2-se-nw {\n    background-position: -176px -32px;\n}\n\n.ui-icon-arrowstop-1-n {\n    background-position: -192px -32px;\n}\n\n.ui-icon-arrowstop-1-e {\n    background-position: -208px -32px;\n}\n\n.ui-icon-arrowstop-1-s {\n    background-position: -224px -32px;\n}\n\n.ui-icon-arrowstop-1-w {\n    background-position: -240px -32px;\n}\n\n.ui-icon-arrowthick-1-n {\n    background-position: 0 -48px;\n}\n\n.ui-icon-arrowthick-1-ne {\n    background-position: -16px -48px;\n}\n\n.ui-icon-arrowthick-1-e {\n    background-position: -32px -48px;\n}\n\n.ui-icon-arrowthick-1-se {\n    background-position: -48px -48px;\n}\n\n.ui-icon-arrowthick-1-s {\n    background-position: -64px -48px;\n}\n\n.ui-icon-arrowthick-1-sw {\n    background-position: -80px -48px;\n}\n\n.ui-icon-arrowthick-1-w {\n    background-position: -96px -48px;\n}\n\n.ui-icon-arrowthick-1-nw {\n    background-position: -112px -48px;\n}\n\n.ui-icon-arrowthick-2-n-s {\n    background-position: -128px -48px;\n}\n\n.ui-icon-arrowthick-2-ne-sw {\n    background-position: -144px -48px;\n}\n\n.ui-icon-arrowthick-2-e-w {\n    background-position: -160px -48px;\n}\n\n.ui-icon-arrowthick-2-se-nw {\n    background-position: -176px -48px;\n}\n\n.ui-icon-arrowthickstop-1-n {\n    background-position: -192px -48px;\n}\n\n.ui-icon-arrowthickstop-1-e {\n    background-position: -208px -48px;\n}\n\n.ui-icon-arrowthickstop-1-s {\n    background-position: -224px -48px;\n}\n\n.ui-icon-arrowthickstop-1-w {\n    background-position: -240px -48px;\n}\n\n.ui-icon-arrowreturnthick-1-w {\n    background-position: 0 -64px;\n}\n\n.ui-icon-arrowreturnthick-1-n {\n    background-position: -16px -64px;\n}\n\n.ui-icon-arrowreturnthick-1-e {\n    background-position: -32px -64px;\n}\n\n.ui-icon-arrowreturnthick-1-s {\n    background-position: -48px -64px;\n}\n\n.ui-icon-arrowreturn-1-w {\n    background-position: -64px -64px;\n}\n\n.ui-icon-arrowreturn-1-n {\n    background-position: -80px -64px;\n}\n\n.ui-icon-arrowreturn-1-e {\n    background-position: -96px -64px;\n}\n\n.ui-icon-arrowreturn-1-s {\n    background-position: -112px -64px;\n}\n\n.ui-icon-arrowrefresh-1-w {\n    background-position: -128px -64px;\n}\n\n.ui-icon-arrowrefresh-1-n {\n    background-position: -144px -64px;\n}\n\n.ui-icon-arrowrefresh-1-e {\n    background-position: -160px -64px;\n}\n\n.ui-icon-arrowrefresh-1-s {\n    background-position: -176px -64px;\n}\n\n.ui-icon-arrow-4 {\n    background-position: 0 -80px;\n}\n\n.ui-icon-arrow-4-diag {\n    background-position: -16px -80px;\n}\n\n.ui-icon-extlink {\n    background-position: -32px -80px;\n}\n\n.ui-icon-newwin {\n    background-position: -48px -80px;\n}\n\n.ui-icon-refresh {\n    background-position: -64px -80px;\n}\n\n.ui-icon-shuffle {\n    background-position: -80px -80px;\n}\n\n.ui-icon-transfer-e-w {\n    background-position: -96px -80px;\n}\n\n.ui-icon-transferthick-e-w {\n    background-position: -112px -80px;\n}\n\n.ui-icon-folder-collapsed {\n    background-position: 0 -96px;\n}\n\n.ui-icon-folder-open {\n    background-position: -16px -96px;\n}\n\n.ui-icon-document {\n    background-position: -32px -96px;\n}\n\n.ui-icon-document-b {\n    background-position: -48px -96px;\n}\n\n.ui-icon-note {\n    background-position: -64px -96px;\n}\n\n.ui-icon-mail-closed {\n    background-position: -80px -96px;\n}\n\n.ui-icon-mail-open {\n    background-position: -96px -96px;\n}\n\n.ui-icon-suitcase {\n    background-position: -112px -96px;\n}\n\n.ui-icon-comment {\n    background-position: -128px -96px;\n}\n\n.ui-icon-person {\n    background-position: -144px -96px;\n}\n\n.ui-icon-print {\n    background-position: -160px -96px;\n}\n\n.ui-icon-trash {\n    background-position: -176px -96px;\n}\n\n.ui-icon-locked {\n    background-position: -192px -96px;\n}\n\n.ui-icon-unlocked {\n    background-position: -208px -96px;\n}\n\n.ui-icon-bookmark {\n    background-position: -224px -96px;\n}\n\n.ui-icon-tag {\n    background-position: -240px -96px;\n}\n\n.ui-icon-home {\n    background-position: 0 -112px;\n}\n\n.ui-icon-flag {\n    background-position: -16px -112px;\n}\n\n.ui-icon-calendar {\n    background-position: -32px -112px;\n}\n\n.ui-icon-cart {\n    background-position: -48px -112px;\n}\n\n.ui-icon-pencil {\n    background-position: -64px -112px;\n}\n\n.ui-icon-clock {\n    background-position: -80px -112px;\n}\n\n.ui-icon-disk {\n    background-position: -96px -112px;\n}\n\n.ui-icon-calculator {\n    background-position: -112px -112px;\n}\n\n.ui-icon-zoomin {\n    background-position: -128px -112px;\n}\n\n.ui-icon-zoomout {\n    background-position: -144px -112px;\n}\n\n.ui-icon-search {\n    background-position: -160px -112px;\n}\n\n.ui-icon-wrench {\n    background-position: -176px -112px;\n}\n\n.ui-icon-gear {\n    background-position: -192px -112px;\n}\n\n.ui-icon-heart {\n    background-position: -208px -112px;\n}\n\n.ui-icon-star {\n    background-position: -224px -112px;\n}\n\n.ui-icon-link {\n    background-position: -240px -112px;\n}\n\n.ui-icon-cancel {\n    background-position: 0 -128px;\n}\n\n.ui-icon-plus {\n    background-position: -16px -128px;\n}\n\n.ui-icon-plusthick {\n    background-position: -32px -128px;\n}\n\n.ui-icon-minus {\n    background-position: -48px -128px;\n}\n\n.ui-icon-minusthick {\n    background-position: -64px -128px;\n}\n\n.ui-icon-close {\n    background-position: -80px -128px;\n}\n\n.ui-icon-closethick {\n    background-position: -96px -128px;\n}\n\n.ui-icon-key {\n    background-position: -112px -128px;\n}\n\n.ui-icon-lightbulb {\n    background-position: -128px -128px;\n}\n\n.ui-icon-scissors {\n    background-position: -144px -128px;\n}\n\n.ui-icon-clipboard {\n    background-position: -160px -128px;\n}\n\n.ui-icon-copy {\n    background-position: -176px -128px;\n}\n\n.ui-icon-contact {\n    background-position: -192px -128px;\n}\n\n.ui-icon-image {\n    background-position: -208px -128px;\n}\n\n.ui-icon-video {\n    background-position: -224px -128px;\n}\n\n.ui-icon-script {\n    background-position: -240px -128px;\n}\n\n.ui-icon-alert {\n    background-position: 0 -144px;\n}\n\n.ui-icon-info {\n    background-position: -16px -144px;\n}\n\n.ui-icon-notice {\n    background-position: -32px -144px;\n}\n\n.ui-icon-help {\n    background-position: -48px -144px;\n}\n\n.ui-icon-check {\n    background-position: -64px -144px;\n}\n\n.ui-icon-bullet {\n    background-position: -80px -144px;\n}\n\n.ui-icon-radio-off {\n    background-position: -96px -144px;\n}\n\n.ui-icon-radio-on {\n    background-position: -112px -144px;\n}\n\n.ui-icon-pin-w {\n    background-position: -128px -144px;\n}\n\n.ui-icon-pin-s {\n    background-position: -144px -144px;\n}\n\n.ui-icon-play {\n    background-position: 0 -160px;\n}\n\n.ui-icon-pause {\n    background-position: -16px -160px;\n}\n\n.ui-icon-seek-next {\n    background-position: -32px -160px;\n}\n\n.ui-icon-seek-prev {\n    background-position: -48px -160px;\n}\n\n.ui-icon-seek-end {\n    background-position: -64px -160px;\n}\n\n.ui-icon-seek-start {\n    background-position: -80px -160px;\n}\n\n/* ui-icon-seek-first is deprecated, use ui-icon-seek-start instead */\n.ui-icon-seek-first {\n    background-position: -80px -160px;\n}\n\n.ui-icon-stop {\n    background-position: -96px -160px;\n}\n\n.ui-icon-eject {\n    background-position: -112px -160px;\n}\n\n.ui-icon-volume-off {\n    background-position: -128px -160px;\n}\n\n.ui-icon-volume-on {\n    background-position: -144px -160px;\n}\n\n.ui-icon-power {\n    background-position: 0 -176px;\n}\n\n.ui-icon-signal-diag {\n    background-position: -16px -176px;\n}\n\n.ui-icon-signal {\n    background-position: -32px -176px;\n}\n\n.ui-icon-battery-0 {\n    background-position: -48px -176px;\n}\n\n.ui-icon-battery-1 {\n    background-position: -64px -176px;\n}\n\n.ui-icon-battery-2 {\n    background-position: -80px -176px;\n}\n\n.ui-icon-battery-3 {\n    background-position: -96px -176px;\n}\n\n.ui-icon-circle-plus {\n    background-position: 0 -192px;\n}\n\n.ui-icon-circle-minus {\n    background-position: -16px -192px;\n}\n\n.ui-icon-circle-close {\n    background-position: -32px -192px;\n}\n\n.ui-icon-circle-triangle-e {\n    background-position: -48px -192px;\n}\n\n.ui-icon-circle-triangle-s {\n    background-position: -64px -192px;\n}\n\n.ui-icon-circle-triangle-w {\n    background-position: -80px -192px;\n}\n\n.ui-icon-circle-triangle-n {\n    background-position: -96px -192px;\n}\n\n.ui-icon-circle-arrow-e {\n    background-position: -112px -192px;\n}\n\n.ui-icon-circle-arrow-s {\n    background-position: -128px -192px;\n}\n\n.ui-icon-circle-arrow-w {\n    background-position: -144px -192px;\n}\n\n.ui-icon-circle-arrow-n {\n    background-position: -160px -192px;\n}\n\n.ui-icon-circle-zoomin {\n    background-position: -176px -192px;\n}\n\n.ui-icon-circle-zoomout {\n    background-position: -192px -192px;\n}\n\n.ui-icon-circle-check {\n    background-position: -208px -192px;\n}\n\n.ui-icon-circlesmall-plus {\n    background-position: 0 -208px;\n}\n\n.ui-icon-circlesmall-minus {\n    background-position: -16px -208px;\n}\n\n.ui-icon-circlesmall-close {\n    background-position: -32px -208px;\n}\n\n.ui-icon-squaresmall-plus {\n    background-position: -48px -208px;\n}\n\n.ui-icon-squaresmall-minus {\n    background-position: -64px -208px;\n}\n\n.ui-icon-squaresmall-close {\n    background-position: -80px -208px;\n}\n\n.ui-icon-grip-dotted-vertical {\n    background-position: 0 -224px;\n}\n\n.ui-icon-grip-dotted-horizontal {\n    background-position: -16px -224px;\n}\n\n.ui-icon-grip-solid-vertical {\n    background-position: -32px -224px;\n}\n\n.ui-icon-grip-solid-horizontal {\n    background-position: -48px -224px;\n}\n\n.ui-icon-gripsmall-diagonal-se {\n    background-position: -64px -224px;\n}\n\n.ui-icon-grip-diagonal-se {\n    background-position: -80px -224px;\n}\n\n/* Misc visuals\n----------------------------------*/\n\n/* Corner radius */\n.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {\n    -moz-border-radius-topleft: 0px;\n    -webkit-border-top-left-radius: 0px;\n    -khtml-border-top-left-radius: 0px;\n    border-top-left-radius: 0px;\n}\n\n.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {\n    -moz-border-radius-topright: 0px;\n    -webkit-border-top-right-radius: 0px;\n    -khtml-border-top-right-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {\n    -moz-border-radius-bottomleft: 0px;\n    -webkit-border-bottom-left-radius: 0px;\n    -khtml-border-bottom-left-radius: 0px;\n    border-bottom-left-radius: 0px;\n}\n\n.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {\n    -moz-border-radius-bottomright: 0px;\n    -webkit-border-bottom-right-radius: 0px;\n    -khtml-border-bottom-right-radius: 0px;\n    border-bottom-right-radius: 0px;\n}\n\n/* Overlays */\n.ui-widget-overlay {\n    background: #aaaaaa url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAh0lEQVRYhe2UsQ3AIAwEL0zC/qMwhTdJiiCRpH2kfPHu0DUnbN0xxjiZU1U8p/f+ev/Bm7MccAu6ygE0ZzlgrdhRrqqWoKMczB90lQNoznLwuUE3uXRwB08HVZ4OqjwdVHk6qPJ0UOXpoMrTQZWngypPB1WeDqo8HVR5OqjydFDl6aDK7Tt4AWXCW8vnTP6PAAAAAElFTkSuQmCC\") 50% 50% repeat;\n    opacity: .30;\n    filter: Alpha(Opacity = 30);\n}\n\n.ui-widget-shadow {\n    margin: -8px 0 0 -8px;\n    padding: 8px;\n    background: #aaaaaa url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD0ZHJ6AAAAe0lEQVRoge3OMQHAIBAAMcC/kjdZJHTI0A4XBdkz86wfO18H3hRUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUBVVBVVAVVAVVQVVQFVQFVUFVUBVUF8O8A8WdY6opAAAAAElFTkSuQmCC\") 50% 50% repeat-x;\n    opacity: .30;\n    filter: Alpha(Opacity = 30);\n    -moz-border-radius: 8px;\n    -khtml-border-radius: 8px;\n    -webkit-border-radius: 8px;\n    border-radius: 8px;\n}\n\n/*!\n* jQuery UI Resizable 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Resizable#theming\n*/\n.ui-resizable {\n    position: relative;\n}\n\n.ui-resizable-handle {\n    position: absolute;\n    font-size: 0.1px;\n    display: block;\n}\n\n.ui-resizable-disabled .ui-resizable-handle, .ui-resizable-autohide .ui-resizable-handle {\n    display: none;\n}\n\n.ui-resizable-n {\n    cursor: n-resize;\n    height: 7px;\n    width: 100%;\n    top: -5px;\n    left: 0;\n}\n\n.ui-resizable-s {\n    cursor: s-resize;\n    height: 7px;\n    width: 100%;\n    bottom: -5px;\n    left: 0;\n}\n\n.ui-resizable-e {\n    cursor: e-resize;\n    width: 7px;\n    right: -5px;\n    top: 0;\n    height: 100%;\n}\n\n.ui-resizable-w {\n    cursor: w-resize;\n    width: 7px;\n    left: -5px;\n    top: 0;\n    height: 100%;\n}\n\n.ui-resizable-se {\n    cursor: se-resize;\n    width: 12px;\n    height: 12px;\n    right: 1px;\n    bottom: 1px;\n}\n\n.ui-resizable-sw {\n    cursor: sw-resize;\n    width: 9px;\n    height: 9px;\n    left: -5px;\n    bottom: -5px;\n}\n\n.ui-resizable-nw {\n    cursor: nw-resize;\n    width: 9px;\n    height: 9px;\n    left: -5px;\n    top: -5px;\n}\n\n.ui-resizable-ne {\n    cursor: ne-resize;\n    width: 9px;\n    height: 9px;\n    right: -5px;\n    top: -5px;\n}\n\n/*!\n* jQuery UI Button 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Button#theming\n*/\n.ui-button {\n    display: inline-block;\n    position: relative;\n    padding: 0;\n    margin-right: .1em;\n    text-decoration: none !important;\n    cursor: pointer;\n    text-align: center;\n    zoom: 1;\n    overflow: visible;\n}\n\n/* the overflow property removes extra width in IE */\n.ui-button-icon-only {\n    width: 2.2em;\n}\n\n/* to make room for the icon, a width needs to be set here */\nbutton.ui-button-icon-only {\n    width: 2.4em;\n}\n\n/* button elements seem to need a little more width */\n.ui-button-icons-only {\n    width: 3.4em;\n}\n\nbutton.ui-button-icons-only {\n    width: 3.7em;\n}\n\n/*button text element */\n.ui-button .ui-button-text {\n    display: block;\n    line-height: 1.4;\n}\n\n.ui-button-text-only .ui-button-text {\n    padding: .4em 1em;\n}\n\n.ui-button-icon-only .ui-button-text, .ui-button-icons-only .ui-button-text {\n    padding: .4em;\n    text-indent: -9999999px;\n}\n\n.ui-button-text-icon-primary .ui-button-text, .ui-button-text-icons .ui-button-text {\n    padding: .4em 1em .4em 2.1em;\n}\n\n.ui-button-text-icon-secondary .ui-button-text, .ui-button-text-icons .ui-button-text {\n    padding: .4em 2.1em .4em 1em;\n}\n\n.ui-button-text-icons .ui-button-text {\n    padding-left: 2.1em;\n    padding-right: 2.1em;\n}\n\n/* no icon support for input elements, provide padding by default */\ninput.ui-button {\n    padding: .4em 1em;\n}\n\n/*button icon element(s) */\n.ui-button-icon-only .ui-icon, .ui-button-text-icon-primary .ui-icon, .ui-button-text-icon-secondary .ui-icon, .ui-button-text-icons .ui-icon, .ui-button-icons-only .ui-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -8px;\n}\n\n.ui-button-icon-only .ui-icon {\n    left: 50%;\n    margin-left: -8px;\n}\n\n.ui-button-text-icon-primary .ui-button-icon-primary, .ui-button-text-icons .ui-button-icon-primary, .ui-button-icons-only .ui-button-icon-primary {\n    left: .5em;\n}\n\n.ui-button-text-icon-secondary .ui-button-icon-secondary, .ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary {\n    right: .5em;\n}\n\n.ui-button-text-icons .ui-button-icon-secondary, .ui-button-icons-only .ui-button-icon-secondary {\n    right: .5em;\n}\n\n/*button sets*/\n.ui-buttonset {\n    margin-right: 7px;\n}\n\n.ui-buttonset .ui-button {\n    margin-left: 0;\n    margin-right: -.3em;\n}\n\n/* workarounds */\nbutton.ui-button::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n\n/* reset extra padding in Firefox */\n/*!\n * jQuery UI Dialog 1.8.21\n *\n * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n * Dual licensed under the MIT or GPL Version 2 licenses.\n * http://jquery.org/license\n *\n * http://docs.jquery.com/UI/Dialog#theming\n */\n.ui-dialog {\n    position: absolute;\n    padding: .2em;\n    width: 300px;\n    overflow: hidden;\n}\n\n.ui-dialog .ui-dialog-titlebar {\n    padding: .4em 1em;\n    position: relative;\n}\n\n.ui-dialog .ui-dialog-title {\n    float: left;\n    margin: .1em 16px .1em 0;\n}\n\n.ui-dialog .ui-dialog-titlebar-close {\n    position: absolute;\n    right: .3em;\n    top: 50%;\n    width: 19px;\n    margin: -10px 0 0 0;\n    padding: 1px;\n    height: 18px;\n}\n\n.ui-dialog .ui-dialog-titlebar-close span {\n    display: block;\n    margin: 1px;\n}\n\n.ui-dialog .ui-dialog-titlebar-close:hover, .ui-dialog .ui-dialog-titlebar-close:focus {\n    padding: 0;\n}\n\n.ui-dialog .ui-dialog-content {\n    position: relative;\n    border: 0;\n    padding: .5em;\n    background: none;\n    overflow: auto;\n    zoom: 1;\n}\n\n.ui-dialog .ui-dialog-buttonpane {\n    text-align: left;\n    border-width: 1px 0 0 0;\n    background-image: none;\n    margin: .5em 0 0 0;\n    padding: .3em 1em .5em .4em;\n}\n\n.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset {\n    float: right;\n}\n\n.ui-dialog .ui-dialog-buttonpane button {\n    margin: .5em .4em .5em 0;\n    cursor: pointer;\n}\n\n.ui-dialog .ui-resizable-se {\n    width: 14px;\n    height: 14px;\n    right: 3px;\n    bottom: 3px;\n}\n\n.ui-draggable .ui-dialog-titlebar {\n    cursor: move;\n}\n\n/*!\n* jQuery UI Tabs 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Tabs#theming\n*/\n.ui-tabs {\n    position: relative;\n    padding: 0em;\n    zoom: 1;\n}\n\n/* position: relative prevents IE scroll bug (element with position: relative inside container with overflow: auto appear as \"fixed\") */\n.ui-tabs .ui-tabs-nav {\n    margin: 0;\n    padding: .2em .2em 0;\n}\n\n.ui-tabs .ui-tabs-nav li {\n    list-style: none;\n    float: left;\n    position: relative;\n    top: 1px;\n    margin: 0 .2em 1px 0;\n    border-bottom: 0 !important;\n    padding: 0;\n    white-space: nowrap;\n}\n\n.ui-tabs .ui-tabs-nav li a {\n    float: left;\n    padding: .2em 1em;\n    text-decoration: none;\n}\n\n.ui-tabs .ui-tabs-nav li.ui-tabs-active {\n    margin-bottom: 0;\n    padding-bottom: 1px;\n}\n\n.ui-tabs .ui-tabs-nav li.ui-tabs-active a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-tabs-loading a {\n    cursor: text;\n}\n\n.ui-tabs .ui-tabs-nav li a, .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-active a {\n    cursor: pointer;\n}\n\n/* first selector in group seems obsolete, but required to overcome bug in Opera applying cursor: text overall if defined elsewhere... */\n.ui-tabs .ui-tabs-panel {\n    display: block;\n    border-width: 0;\n    padding: 0em 0.1em;\n    background: none;\n}\n\n/*!\n* jQuery UI Progressbar 1.8.21\n*\n* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)\n* Dual licensed under the MIT or GPL Version 2 licenses.\n* http://jquery.org/license\n*\n* http://docs.jquery.com/UI/Progressbar#theming\n*/\n.ui-progressbar {\n    height: 4px;\n    text-align: left;\n    overflow: hidden;\n}\n\n.ui-progressbar .ui-progressbar-value {\n    margin: -1px;\n    height: 100%;\n}");
	};
/**************************************************************************
*  hourly Resources
***************************************************************************/

    var ResourceProduction = new function() {
	function addProd(position, value) {
		value = Math.floor(value);
		     if(value>0)
			 $('span#rp'+position).css('color','green').text(Utils.FormatNumToStr(value, true));
		else if(value<0)
			 $('span#rp'+position).css('color','red').text(Utils.FormatNumToStr(value, true));
		else $('span#rp'+position).css('color','gray').text('+0');
	}
	this.createSpan = function(n) {
		var ids = ['wood', 'wine', 'marble', 'glass', 'sulfur'];
		if($('span#rp'+n).length == 0) {
		   $('#cityResources li[id="resources_'+ids[n]+'"]').css({'line-height':'normal','padding-top':'0px'}).append('<span id="rp'+n+'" class="resourceProduction"></span>');
		}
	}
	this.repositionSpan = function(newTradegood) {
		var oldTradegood = unsafeWindow.ikariam.model.producedTradegood;		
		if(newTradegood != oldTradegood) {
			if(oldTradegood > 1) {
				$('span#rp'+oldTradegood).remove();
			}
			this.createSpan(newTradegood);
		}
	}
    this.updateProd = function() {
		addProd(0, unsafeWindow.ikariam.model.resourceProduction*3600);
		if(unsafeWindow.ikariam.model.cityProducesWine) {
			addProd(1, unsafeWindow.ikariam.model.tradegoodProduction*3600 - unsafeWindow.ikariam.model.wineSpendings);		
		}
		else {
			addProd(1, - unsafeWindow.ikariam.model.wineSpendings);
			addProd(unsafeWindow.ikariam.model.producedTradegood, unsafeWindow.ikariam.model.tradegoodProduction*3600);
		}
	  }
    }
    $(function(){
      ResourceProduction.createSpan(0); ResourceProduction.createSpan(1); ResourceProduction.createSpan(2); ResourceProduction.createSpan(3); ResourceProduction.createSpan(4); ResourceProduction.updateProd(); unsafeWindow.ikariam.model.ResourceProduction_updateGlobalData = unsafeWindow.ikariam.model.updateGlobalData;
	  unsafeWindow.ikariam.model.updateGlobalData = function(dataSet) {
	  ResourceProduction.repositionSpan(dataSet.producedTradegood); unsafeWindow.ikariam.model.ResourceProduction_updateGlobalData(dataSet); ResourceProduction.updateProd();
	  }
    });

/**************************************************************************
*  Player Overview
***************************************************************************/

var tlist = new Array();
unsafeWindow.db = function() {   
  this.serverName = unsafeWindow.dataSetForView['serverName'];
  this.serverId = location.href.split('-')[0].split('//s')[1];
  this.language = location.href.split('.')[0].split('-')[1];
  this.view = unsafeWindow.backgroundView;   
  this.addTool = function(tool) {
    unsafeWindow.toolsList.push(tool);
  }
  this.save = function(key, el) {
    localStorage.setItem(key, el);
  }
  this.load = function(key) {
    return localStorage.getItem(key);
  }
  this.del = function(key) {
    delete localStorage[key];
  }
  this.addToolName = function(nm) {
    tlist.push(nm);
    this.save('tlist', tlist.sort());
  }  
}
unsafeWindow.database = new unsafeWindow.db();
unsafeWindow.ajaxController = function() {
  this.httpRequest = function(url, f) {
      GM_xmlhttpRequest({
      method: "GET",
      url: url,
      headers: {'Cache-Control': 'no-cache'},	  
      onload: f
    });
  }
}
unsafeWindow.boxInterceptor = function() {
  this.functions = new Array();
  this.interceptSidebar = false;
  this.sidehtml = '';
  this.sidebar = null;
  this.sidefunctions = new Array();
  this.getSidebar = function() {
    var bar = getById('sidebar');
    if (bar) return bar;
    return false;
  }
  this.setInterceptor = function(name, f) {
    this.functions.push(f);
  }
  this.setSidebarInterceptor = function(f) {
    this.interceptSidebar = true;
    this.sidefunctions.push(f);
  }
  this.controller = function() {
    this.sidebar = getById('sidebar');
    if (this.interceptSidebar && this.sidebar && this.sidebar.innerHTML != '' && this.sidebar.innerHTML != this.sidehtml) {
      this.sidehtml = this.sidebar.innerHTML ;
      for (i=0; i<this.sidefunctions.length; i++) this.sidefunctions[i]();
    }
  }
}
unsafeWindow.interceptor = new unsafeWindow.boxInterceptor();
unsafeWindow.loader = ' function getById(id) { return document.getElementById(id); } ' +
                      ' function getByClass(c) { return document.getElementsByClassName(c); } ' +
                      ' function getByTag(t) { return document.getElementsByTagName(t); } ' +				  
                      ' function createFrame(x, y, w, h, t) { return new unsafeWindow.frameBox(x, y, w, h, t); } ' +
                      ' var ajax = new unsafeWindow.ajaxController();  ' +
                      ' var interceptor = unsafeWindow.interceptor;  ' +
                      ' var db = unsafeWindow.database; ' ;
eval(unsafeWindow.loader);
unsafeWindow.toolsList = new Array();
setInterval(scheduleTimer,1000);
function scheduleTimer() {
  for (i=0; i<unsafeWindow.toolsList.length; i++) {
    eval(unsafeWindow.toolsList[i]);
  }
}
db.addTool('unsafeWindow.interceptor.controller()');
unsafeWindow.frameBox = function(x, y, w, h, t) {
  this.title = t; 
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  if(database.settings.playerInfo.value) this.div = document.createElement('div');
  this.div.id = this.title+'Frame'; 
  this.div.className = 'frameBox';
  document.body.appendChild(this.div);
  this.div.style.top = this.y+'px';
  this.div.style.left = this.x+'px';
  this.div.style.width = this.w+'px';
  this.div.style.height = this.h+'px';
  this.div.style.visibility = 'hidden';
  this.titleDiv = document.createElement('div');
  this.titleDiv.className = 'titleDiv';
  this.titleDiv.innerHTML = '<span class="titleSpan">' + this.title + '</span>' +
                            '<span class="closeDiv"><a href="javascript: closeFrame(\'' + this.title+'Frame' + '\')"></a></span>';							
  this.div.appendChild(this.titleDiv);
  this.Box = document.createElement('div');
  this.Box.className = 'BoxDiv';
  this.Box.style.height = (this.h-15) + 'px';
  this.div.appendChild(this.Box);
  Drag.init(this.titleDiv, this.div); 
  this.addInnerHtml = function(html) {
    this.Box.innerHTML = html;
  }
  this.show = function() {
    this.div.style.visibility = 'visible';
  }
  this.hide = function() {
    this.div.style.visibility = 'hidden';
  }
}
function onMove(e) {
  var frame = e.target.parentNode;
}
unsafeWindow.closeFrame = function(id) {
  document.getElementById(id).style.visibility = 'hidden';
}
var frameStyle = document.createElement('style');
frameStyle.innerHTML = ' .frameBox {position: absolute; background-color: #f7e9b9; z-index: 9999; outline: 2px solid #DCBF94; opacity: 0.9; overflow: hidden;} ' +
					   ' .titleDiv {margin: 0px; width: 100%; background-image: url("/skin/layout/bg_maincontentbox_header.jpg"); background-repeat: no-repeat; background-size: 760px 24px; font-weight: bold; height: 25px; color: #663333; cursor: move;} ' +					 
                       ' .titleSpan {position: relative; margin-left: 325px; bottom: -6px;} ' +		   
                       ' .closeDiv {bottom: -6px; right: 4px; float: right;} ' +				   
                       ' .closeDiv a {background-image: url("/skin/interface/window_control_sprite.png"); width: 19px; height: 18px; background-position: 0.5px 0px; cursor: pointer; display: block; margin: 4px 1.5px;} ' +
                       ' .closeDiv a:hover {background-image: url("/skin/interface/window_control_sprite.png"); width: 20px; height: 18px; background-position: 55.5px -18px; cursor: pointer; display: block; margin: 4px 1px;} ' +
                       ' .BoxDiv {width: 100%; margin: 15px; overflow: auto; margin-top: -2px;} ' ;
document.body.appendChild(frameStyle);
var exec = db.load('exec');
if (exec && exec != null) eval(exec);
var suspend = setInterval(checkLoader, 1000);
function checkLoader() {
  if(!unsafeWindow.db) return;
  clearTimeout(suspend);
  startScript();
}
function startScript() { 
eval(unsafeWindow.loader);
db.addToolName('island');
interceptor.setSidebarInterceptor(sidebarManipulator);
var lang = database.settings.languageChange.value;
var cityInfo = null;
var PlayerName = '';
var searchLink = '';
var chartsLink = '';
var html = '';
var infoBox = createFrame(300, 180, 760, 'auto', 'Player Overview');
var textExpr = 'banner:';
var PlayerText = Constant.LanguageData[lang].ika_world ;
var ChartsText = Constant.LanguageData[lang].charts ;
var interval = null;
var modified = false;
var loadingHtml = '<div></div>';
function sidebarManipulator() {
  if (db.view != 'island') return;
  if (modified == true) {
    modified = false;
    return;
  }
  PlayerName = getById('js_selectedCityOwnerName');
  if (!PlayerName) return;
  searchLink = 'http://www.ika-world.com/details/player.html?land='+db.language+'&welt='+db.serverId+'&spieler='+PlayerName.innerHTML;
  modified = true;
  PlayerName.innerHTML = '<a href="javascript: activeAjax()"; style="font-weight: bold;">' + PlayerName.innerHTML + '</a>';
}
unsafeWindow.activeAjax = function() {
  interval = setInterval(doAjax, 0);
  return void(0);
}
function doAjax() {
  clearInterval(interval);
  ajax.httpRequest(searchLink, displayData);
  infoBox.addInnerHtml('<div style="padding:8px;">' + loadingHtml + '</div>');
  infoBox.show();
}
function displayData(response) {
  html = response.responseText;
  html = processHtml(html);
  infoBox.addInnerHtml('<div style="padding:8px;">' + html + '</div>');
}
function processHtml(html) {
  html = html.replace(/<script[^>]*?>[\s\S]*?<\/script>/gi, '');
  html = html.split('<table cellpadding="0" cellspacing="1"');
  if (!html[3]) return html[0];
  var id = html[0].split('id=');
  id = id[id.length-1].split('"')[0];
  html[3] = html[3].split(textExpr)[0];
  html[1] = html[1].replace(/<span class="icon holiday" title="(.*?)"><\/span>/g, '<img src="'+location.href.split('/')[0]+'/skin/layout/icon-palm.png" width="16" height="14" title="'+ database.getGlobalData.getLocalisedString('avatar_vacation') +'"/>');
  html[3] = html[3].replace(/<span class="icon wood" title="(.*?)"><\/span>/g, '<img src="'+location.href.split('/')[0]+'/skin/resources/icon_wood.png" width="18" height="16" title="'+ database.getGlobalData.getLocalisedString('wood_deposit') +'"/>&nbsp;');
  html[3] = html[3].replace(/<span class="icon marble" title="(.*?)"><\/span>/g, '<img src="'+location.href.split('/')[0]+'/skin/resources/icon_marble.png" width="18" height="16" title="'+ database.getGlobalData.getLocalisedString('marble_deposit') +'"/>&nbsp;');
  html[3] = html[3].replace(/<span class="icon crystal" title="(.*?)"><\/span>/g, '<img src="'+location.href.split('/')[0]+'/skin/resources/icon_crystal.png" width="18" height="16" title="'+ database.getGlobalData.getLocalisedString('crystal_deposit') +'"/>&nbsp;');
  html[3] = html[3].replace(/<span class="icon wine" title="(.*?)"><\/span>/g, '<img src="'+location.href.split('/')[0]+'/skin/resources/icon_wine.png" width="18" height="16" title="'+ database.getGlobalData.getLocalisedString('wine_deposit') +'"/>&nbsp;');
  html[3] = html[3].replace(/<span class="icon sulfur" title="(.*?)"><\/span>/g, '<img src="'+location.href.split('/')[0]+'/skin/resources/icon_sulfur.png" width="18" height="16" title="'+ database.getGlobalData.getLocalisedString('sulfur_deposit') +'"/>&nbsp;');
  html[3] = html[3].replace(/<span class="icon townhall" title="(.*?)"><\/span>/g, '<img src="'+location.href.split('/')[0]+'/skin/img/city/townhall_l.png" width="28" height="24" title="'+ database.getGlobalData.getLocalisedString('Level') +''+' '+''+ database.getGlobalData.getLocalisedString('townHall') +'"/>');
  html[3] = html[3].replace(/<span class="icon city" title="(.*?)"><\/span>/g, '<img src="'+location.href.split('/')[0]+'/skin/layout/icon-city2.png" width="20" height="22" title="'+ database.getGlobalData.getLocalisedString('cities') +'"/>');
  html[3] = html[3].replace(/<span class="num"><\/span>/g, '<span class="num">:</span>');
  html[3] = html[3].replace(/X/g, '&nbsp;X'+'<b>&nbsp;&nbsp;&nbsp;:</b>');
  html[3] = html[3].replace(/Y/g, 'Y');   
  html[3] = html[3].replace(/banner/g, ''); 
  html[3] = html[3].replace(/Dein persönliches Banner/g, '');  
  chartsLink = 'http://'+db.language+'.ika-world.com/details/player/charts.html?land='+db.language+'&welt='+db.serverId+'&id='+id;
  html = '<br><table '+html[1]+'<hr>'+
         '<table '+html[3] +
         '<p align="center" style="margin-top: -10px;">' +
         ' <a class="button" target="_blank" href="'+searchLink+'">'+PlayerText+'</a>' +
         ' <a class="button" target="_blank" href="'+chartsLink+'">'+ChartsText+'</a><br>&nbsp;' +
         '</p>';
  html = html.replace(/href="\/details/g, 'target="_blank" href="http://'+db.language+'.ika-world.com/details');
  return html;
 }
}

/***********************************************************************************************************************
 * ikariam
 **********************************************************************************************************************/

var ikariam = {
  _View                    : null,
  _Host                    : null,
  _ServerTyp               : null,
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
  Host : function() {
    if(this._Host == null) {
      this._Host = '';
      this._Host = document.location.host;
    }
    return this._Host;
  },
  Server : function(host) {
    if(this._Server == null) {
      if(host == undefined) {
        host = this.Host();
      }
      this._Server = '';
      var parts = host.split('.');
      this._Server = parts[0].split('-')[1];
    }
    return this._Server;
  },
  Language : function(host) {
    if(this._Language == null) {
      if(host == undefined) {
        host = this.Host();
      }
      this._Language = '';
      var parts = host.split('.');
      this._Language = parts[0].split('-')[1];
    }
	if ((this._Language == 'us') || (this._Language == 'au') || (this._Language == 'hk') || (this._Language == 'tw') || (this._Language == 'il') || (this._Language == 'lt') || (this._Language == 'hu') || (this._Language == 'bg') || (this._Language == 'rs') || (this._Language == 'si') || (this._Language == 'sk') || (this._Language == 'dk') || (this._Language == 'fi') || (this._Language == 'ee') || (this._Language == 'se') || (this._Language == 'no')) {
        this._Language = 'en';
      }
    if ((this._Language == 've') || (this._Language == 'mx') || (this._Language == 'ar') || (this._Language == 'co') || (this._Language == 'cl') || (this._Language == 'pe')) {
        this._Language = 'es';
      }
    if (this._Language == 'br') {
        this._Language = 'pt';
      }
    if (this._Language == 'ae') {
        this._Language = 'ar';
      }
    if (this._Language == 'gr') {
        this._Language = 'el';
      }
    return this._Language;
  },
  Nationality : function(host) {
    if(this._Nationality == null) {
      if(host == undefined) {
        host = this.Host();
      }
      this._Nationality = '';
      var parts = host.split('.');
      this._Nationality = parts[0].split('-')[1];
    }
    return this._Nationality;
  },
  getNextWineTick          : function(precision) {
    precision = precision || 1; 
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
      this._GameVersion = $('.version').text().split('v')[1];
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
    $.extend(local, local['timeunits']['short']);
    delete local['warnings'];
    delete local['timeunits'];
    $.each(local, function(name, value) {
      database.getGlobalData.addLocalisedString(name.toLowerCase(), value)
    });
    local = null;
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
          if(feedback == 10) 
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
	    case 'plunder':		
          this.transportFormSubmitted();
          break;
        case Constant.Buildings.TEMPLE:
          this.parseTemple(tData);
          break;
        case Constant.Buildings.BARRACKS:
        case Constant.Buildings.SHIPYARD:
          this.parseBarracks(view, html, tData);
          break;
        case 'deployment':
	    case 'plunder':		
          this.parseMilitaryTransport();
          break;
	    case 'premium':
		  this.parsePremium(view, html, tData);
		  break
      }
    }
  },
  parsePalace              : function() {
    var governmentType = $('#formOfRuleContent').find('td.government_pic img').attr('src').slice(16, -8);
    var changed = (database.getGlobalData.getGovernmentType != governmentType);
    database.getGlobalData.governmentType = governmentType;
    if(changed) events(Constant.Events.GLOBAL_UPDATED).pub({type: 'government'})
    database.getGlobalData.addLocalisedString('Current form', $('#palace').find('div.contentBox01h h3.header').get(0).textContent);
	render.toast('Updated: ' + $('#palace').children(":first").text());
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
	render.toast('Updated: ' + $('#culturalPossessions_assign > .header').text());
  },
  parseMuseum              : function() {
    var regText = $('#val_culturalGoodsDeposit').parent().text().match(/(\d+)/g);
    if(regText.length == 2) {
      var changed = ikariam.getCurrentCity.updateCulturalGoods(parseInt(regText[0]))
    } 
    if(changed) events(Constant.Events.CITY_UPDATED).pub(ikariam.CurrentCityId, {culturalGoods: true})
	render.toast('Updated: '+ $('#tab_museum > div > h3').get(0).textContent);
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
      gold        : 0,
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
	  var server = ikariam.Nationality();
      completionTime.setSeconds(completionTime.getSeconds() + (timeText.match(/(\d+)s/) ? parseInt(timeText.match(/(\d+)s/)[1]) : 0));
      completionTime.setMinutes(completionTime.getMinutes() + (timeText.match(/(\d+)m/) ? parseInt(timeText.match(/(\d+)m/)[1]) : 0));
      completionTime.setHours(completionTime.getHours() + (timeText.match(/(\d+)h/) ? parseInt(timeText.match(/(\d+)h/)[1]) : 0));
      completionTime.setDate(completionTime.getDate() + (timeText.match(/(\d+)D/) ? parseInt(timeText.match(/(\d+)D/)[1]) : 0));
        switch(server){
            case 'de':
			completionTime.setDate(completionTime.getDate() + (timeText.match(/(\d+)T/) ? parseInt(timeText.match(/(\d+)T/)[1]) : 0));
            break;
            case 'gr':
			completionTime.setDate(completionTime.getDate() + (timeText.match(/(\d+)M/) ? parseInt(timeText.match(/(\d+)M/)[1]) : 0));
            break;
            case 'fr':
			completionTime.setDate(completionTime.getDate() + (timeText.match(/(\d+)J/) ? parseInt(timeText.match(/(\d+)J/)[1]) : 0));
            break;
            case 'ro':
			completionTime.setDate(completionTime.getDate() + (timeText.match(/(\d+)Z/) ? parseInt(timeText.match(/(\d+)Z/)[1]) : 0));
            break;
            case 'it':
            case 'tr':
			completionTime.setDate(completionTime.getDate() + (timeText.match(/(\d+)G/) ? parseInt(timeText.match(/(\d+)G/)[1]) : 0));
            break;
            case 'ir':
            case 'ae':
			completionTime.setSeconds(completionTime.getSeconds() + (timeText.match(/(\d+)ث/) ? parseInt(timeText.match(/(\d+)ث/)[1]) : 0));
			completionTime.setMinutes(completionTime.getMinutes() + (timeText.match(/(\d+)د/) ? parseInt(timeText.match(/(\d+)د/)[1]) : 0));
			completionTime.setHours(completionTime.getHours() + (timeText.match(/(\d+)س/) ? parseInt(timeText.match(/(\d+)س/)[1]) : 0));
			completionTime.setDate(completionTime.getDate() + (timeText.match(/(\d+)ر/) ? parseInt(timeText.match(/(\d+)ر/)[1]) : 0));
            break;
			}
      return completionTime.getTime();
    }
      render.toast('Updated: ' + $('#js_mainBoxHeaderTitle').text());
  },
  /**
   * First call without data will parse the transportform, second call will add the forms data to the database
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
        var gold = '';
        var targetID = $('input[name=destinationCityId]').val();
        var ships = $('#transporterCount').val();
        var arrTime = new Date();
        var loadedTime = new Date();
		var server = ikariam.Nationality();

        arrTime.setSeconds(arrTime.getSeconds() + (journeyTime.match(/(\d+)s/) ? parseInt(journeyTime.match(/(\d+)s/)[1]) : 0));
        arrTime.setMinutes(arrTime.getMinutes() + (journeyTime.match(/(\d+)m/) ? parseInt(journeyTime.match(/(\d+)m/)[1]) : 0));
        arrTime.setHours(arrTime.getHours() + (journeyTime.match(/(\d+)h/) ? parseInt(journeyTime.match(/(\d+)h/)[1]) : 0));
        arrTime.setDate(arrTime.getDate() + (journeyTime.match(/(\d+)D/) ? parseInt(journeyTime.match(/(\d+)D/)[1]) : 0));
		if (server == 'de')
        arrTime.setDate(arrTime.getDate() + (journeyTime.match(/(\d+)T/) ? parseInt(journeyTime.match(/(\d+)T/)[1]) : 0));

        loadedTime.setSeconds(loadedTime.getSeconds() + (loadingTime.match(/(\d+)s/) ? parseInt(loadingTime.match(/(\d+)s/)[1]) : 0));
        loadedTime.setMinutes(loadedTime.getMinutes() + (loadingTime.match(/(\d+)m/) ? parseInt(loadingTime.match(/(\d+)m/)[1]) : 0));
        loadedTime.setHours(loadedTime.getHours() + (loadingTime.match(/(\d+)h/) ? parseInt(loadingTime.match(/(\d+)h/)[1]) : 0));
		loadedTime.setDate(loadedTime.getDate() + (loadingTime.match(/(\d+)D/) ? parseInt(loadingTime.match(/(\d+)D/)[1]) : 0));
		if (server == 'de')
        loadedTime.setDate(loadedTime.getDate() + (loadingTime.match(/(\d+)T/) ? parseInt(loadingTime.match(/(\d+)T/)[1]) : 0));

        return new Movement('XXX-' + arrTime.getTime(), this.CurrentCityId, targetID, arrTime.getTime() + loadedTime.getTime() - $.now(), 'transport', loadedTime.getTime(), {gold: gold || 0, wood: wood || 0, wine: wine || 0, marble: marble || 0, glass: glass || 0, sulfur: sulfur || 0}, undefined, ships)
      } else {
        database.getGlobalData.addFleetMovement(data);
        events(Constant.Events.MOVEMENTS_UPDATED).pub([data.getTargetCityId])
      }
    } catch(e) {
      empire.error('transportFormSubmitted', e);
    } finally {
    }
  },
  parseMilitaryTransport   : function(submit) {
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
        } else {
		  mission = 'plunder' + this.getAttribute('name').match(/_(.*)_/)[1]
        }
      });
      var arrTime = new Date();
      var transport = this.troopTransportObject();
	  var server = ikariam.Nationality();
      transport.id = 'XXX-' + arrTime.getTime();
      transport.targetCityId = targetID;
      transport.originCityId = this.CurrentCityId;
      transport.mission = mission;
      transport.troops = troops;
      arrTime.setSeconds(arrTime.getSeconds() + (journeyTime.match(/(\d+)s/) ? parseInt(journeyTime.match(/(\d+)s/)[1]) : 0));
      arrTime.setMinutes(arrTime.getMinutes() + (journeyTime.match(/(\d+)m/) ? parseInt(journeyTime.match(/(\d+)m/)[1]) : 0));
      arrTime.setHours(arrTime.getHours() + (journeyTime.match(/(\d+)h/) ? parseInt(journeyTime.match(/(\d+)h/)[1]) : 0));
      arrTime.setDate(arrTime.getDate() + (journeyTime.match(/(\d+)D/) ? parseInt(journeyTime.match(/(\d+)D/)[1]) : 0));
	  if (server == 'de')
      arrTime.setDate(arrTime.getDate() + (journeyTime.match(/(\d+)T/) ? parseInt(journeyTime.match(/(\d+)T/)[1]) : 0));
      transport.arrivalTime = arrTime.getTime();
      arrTime = new Date();
      arrTime.setSeconds(arrTime.getSeconds() + (returnTime.match(/(\d+)s/) ? parseInt(returnTime.match(/(\d+)s/)[1]) : 0));
      arrTime.setMinutes(arrTime.getMinutes() + (returnTime.match(/(\d+)m/) ? parseInt(returnTime.match(/(\d+)m/)[1]) : 0));
      arrTime.setHours(arrTime.getHours() + (returnTime.match(/(\d+)h/) ? parseInt(returnTime.match(/(\d+)h/)[1]) : 0));
      arrTime.setDate(arrTime.getDate() + (returnTime.match(/(\d+)D/) ? parseInt(returnTime.match(/(\d+)D/)[1]) : 0));
	  if (server == 'de')
      arrTime.setDate(arrTime.getDate() + (returnTime.match(/(\d+)T/) ? parseInt(returnTime.match(/(\d+)T/)[1]) : 0));
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
    }
    var $breakdown = $('#finances').find('tbody tr.bottomLine td:last-child');
    database.getGlobalData.finance.armyCost = parseInt($breakdown[0].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''));
    database.getGlobalData.finance.fleetCost = parseInt($breakdown[1].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''));
    database.getGlobalData.finance.armySupply = parseInt($breakdown[2].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''));
    database.getGlobalData.finance.fleetSupply = parseInt($breakdown[3].textContent.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''));
    events('globalData').pub({finances: true})	
	database.getGlobalData.addLocalisedString('finances', $('#finances').find('h3#js_mainBoxHeaderTitle').text());
	render.toast('Updated: ' + $('#finances').children(":first").text());
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
    if(changes.length) events(Constant.Events.GLOBAL_UPDATED).pub(changes);
    database.getGlobalData.addLocalisedString('researchpoints', $('li.points').text().split(':')[0]);
	render.toast('Updated: ' + $('#tab_researchAdvisor').children(":first").text());
  },
  parseAcademy             : function(data) {
    var city = ikariam.getCurrentCity;
    var changed = city.updateResearchers(parseInt(data.js_AcademySlider.slider.ini_value));
    if(changed)
	  events(Constant.Events.CITY_UPDATED).pub(ikariam.CurrentCityId, {research: changed}); 
	render.toast('Updated: '+ $('#academy h3#js_mainBoxHeaderTitle').text() + '');
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
    render.toast('Updated: '+ $('#js_TownHallCityName').text() + '');	
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
		  var targetAvatar = '';
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
		    var serverTyp = $('li.logout a[href="?view=normalServerStatus"]').text() ? 1 : 3;
            transport._loadingTime = transport._arrivalTime ;
            if(database.getCityFromId(transport._originCityId) && database.getCityFromId(transport._targetCityId)) {
              transport._arrivalTime += Utils.estimateTravelTime(database.getCityFromId(transport._originCityId).getCoordinates, database.getCityFromId(transport._targetCityId).getCoordinates)/serverTyp;
            }
          }
          switch(transport._mission) {
            case 'trade':
            case 'transport':
            case 'plunder':			
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
                } else if(Utils.existsIn(item['class'], Constant.Resources.GOLD)) {
                  transport._resources.gold = parseInt(item.text.split(database.getGlobalData.getLocalisedString('thousandSeperator')).join(''));
                }
              });
              break;
            case 'deployarmy':
            case 'deployfleet':
            case 'plunder':				
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
            default:
              return true
          }
          database.getGlobalData.addFleetMovement(transport);
          changes.push(transport._targetCityId);
        });
      }
      if(changes.length) events(Constant.Events.MOVEMENTS_UPDATED).pub($.exclusive(changes))
    } catch(e) {
      empire.error('parseMilitaryAdvisor', e);
    } finally {
    }
      render.toast('Updated: ' + $('#js_MilitaryMovementsFleetMovements h3').text());	
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
	  cityArmy[Constant.Military.SPARTAN] = parseInt($elemArmy[14].innerHTML);

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
      $elemArmy = null;
      $elemShips = null;
      events(Constant.Events.MILITARY_UPDATED).pub(city.getId, changes)

    } catch(e) {
      empire.error('parseCityMilitary', e);
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
    database.getGlobalData.addLocalisedString('spartan', $elemA[14].getAttribute('title'));
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
	    render.toast('Updated: ' + $('#premium').children(":first").text());		
  },
  FetchAllTowns            : function() {
    var _relatedCityData = unsafeWindow.ikariam.model.relatedCityData;
    var _cityId = null;	
    var city = null;
    var order = database.settings.cityOrder.value
    if (!order.length) order = [];
    if(_relatedCityData) {
      for(_cityId in _relatedCityData) {
        if(_cityId != 'selectedCity' && _cityId != 'additionalInfo') {
          var own = (_relatedCityData[_cityId]['relationship'] == 'ownCity');
          var deployed = (_relatedCityData[_cityId]['relationship'] == 'deployedCities');
          var occupied = (_relatedCityData[_cityId]['relationship'] == 'occupiedCities');		  
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
      icon:'skin/premium/premium_account.png'
    },
    ResourceBonus:{
      type:16,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:'skin/premium/b_premium_wood.jpg'
    },
    WineBonus:{
      type:14,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:'skin/premium/b_premium_wine.jpg'
    },
    MarbleBonus:{
      type:11,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:'skin/premium/b_premium_marble.jpg'
    },
    SulfurBonus:{
      type:12,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:'skin/premium/b_premium_sulfur.jpg'
    },
    CrystalBonus:{
      type:13,
      duration:7 * 24 * 60,
      cost:0,
      bonus:0.2,
      icon:'skin/premium/b_premium_crystal.jpg'
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
		WOOD_BONUS:'ResourceBonus',
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
		PLAYER_INFO:        'playerInfo',
		ON_IKA_LOGS:        'onIkaLogs',
		HIDE_WORLD:         'hideOnWorldView',
		HIDE_ISLAND:        'hideOnIslandView',		
		HIDE_CITY:          'hideOnCityView',
		SHOW_ON_TOP:        'onTop',
		WINDOW_TENNIS:      'windowTennis',
		AUTO_UPDATE:        'autoUpdates',		
		SMALLER_FONT:       'smallFont',
		NEWS_TICKER:        'newsTicker',
		EVENT:              'event',
		LOGIN_POPUP:        'logInPopup',		
		BIRD_SWARM:         'birdSwarm',
		CONTROL_CENTER:     'controlCenter',
		WITHOUT_FABLE:      'withoutFable',
		AMBROSIA_PAY:       'ambrosiaPay',
		ALTERNATIV_BUILDINGS: 'alternativeBuildingList',
        COMPRESS_BUILDINGS: 'compressedBuildingList',
		HOURLY_RESS:        'hourlyRess',
		WINE_OUT:           'wineOut',
		DAILY_BONUS:        'dailyBonus',
		WINE_WARNING_TIME:  'wineWarningTime',
		LANGUAGE_CHANGE:    'languageChange',		
	},
	SettingData:{
		cityOrder:{type:'array', default:[], categories:'ignore'},
		fullArmyTable:{type:'boolean', default:false, categories:'army_category'},
		playerInfo:{type:'boolean', default:false, categories:'army_category'},
		onIkaLogs:{type:'boolean', default:false, categories:'army_category'},
		hideOnWorldView:{type:'boolean', default:false, categories:'visibility_category'},		
		hideOnIslandView:{type:'boolean', default:false, categories:'visibility_category'},
		hideOnCityView:{type:'boolean', default:false, categories:'visibility_category'},
		onTop:{type:'boolean', default:false, categories:'display_category'},
		windowTennis:{type:'boolean', default:false, categories:'display_category'},
		autoUpdates:{type:'boolean', default:false, categories:'global_category'},		
		smallFont:{type:'boolean', default:false, categories:'display_category'},
		newsTicker:{type:'boolean', default:false, categories:'display_category'},
		event:{type:'boolean', default:false, categories:'display_category'},
		logInPopup:{type:'boolean', default:false, categories:'display_category'},		
		birdSwarm:{type:'boolean', default:false, categories:'display_category'},
		controlCenter:{type:'boolean', default:false, categories:'display_category'},
		withoutFable:{type:'boolean', default:false, categories:'display_category'},
		ambrosiaPay:{type:'boolean', default:false, categories:'display_category'},		
		alternativeBuildingList:{type:'boolean', default:false, categories:'building_category'},
        compressedBuildingList:{type:'boolean', default:false, category:'building_category'},
		hourlyRess:{type:'boolean', default:false, categories:'resource_category'},
		wineOut:{type:'boolean', default:false, categories:'resource_category'},
		dailyBonus:{type:'boolean', default:false, categories:'resource_category'},
		wineWarningTime:{type:'number', default:0, choices:[0,12,24,36,48], categories:'resource_category'},
		languageChange:{type:'language', default:ikariam.Language(), selection:['en','de','it','el','es','fr','ro','ru','cz','pl','ar','ir','pt','tr','nl'], categories:'language_category'},		
	},	
	SettingCategories: {
		VISIBILITY: 'visibility_category',
		DISPLAY   : 'display_category',
		OTHER     : 'global_category',
		ARMY      : 'army_category',
		BUILDING  : 'building_category',
		RESOURCE  : 'resource_category',
		LANGUAGE  : 'language_category',		
	},	

  	LanguageData : {
		en:{
      buildings: 'Buildings',
	  economy: 'Economy',
	  military: 'Military',
	  towns: 'Towns',
	  academy_: 'Academy',
	  townhall_: 'Town Hall',
	  dump_: 'Dump',
	  warehouse_: 'Warehouse',
	  tavern_level: 'Tavern Level',
	  corruption: 'Corruption',
	  cultural: 'Cultural Goods',
	  population: 'Population',
	  citizens: 'Citizens',
	  scientists: 'Scientists',
	  scientists_max: 'max. Scientists',
	  options: 'Options',
	  help: 'Help',
	  agora: 'to Agora',
	  to_world: 'Show World', 
	  to_island: 'Show Island',
	  army_cost: 'Army Cost',
	  fleet_cost: 'Fleet Cost',
	  army_supply: 'Army Supply',
	  fleet_supply: 'Fleet Supply',
	  research_cost: 'Research Cost', 
	  income: 'Income',
	  expenses: 'Expenses',
	  balances: 'Balances',
      espionage: 'View Espionage',
	  contracts: 'View Contracts',
	  combat: 'View Combats',
	  satisfaction: 'Satisfaction',
      total_ : 'total',
      max_Level : 'max. Level',
      actionP : 'Action Points',
      researchP : 'Research Points',
      finances_ : 'Finances',
      free_ground : 'free Building Ground', 
      wood_ : 'Building Material',
      wine_ : 'Wine',
      marble_ : 'Marble', 
      crystal_ : 'Crystal Glass', 
      sulphur_ : 'Sulphur',	  
	  angry: 'angry',
	  unhappy: 'unhappy',
	  neutral: 'neutral',
	  happy: 'happy',
	  euphoric: 'euphoric',	  
	  housing_space: 'max. Housing space',
	  free_Citizens: 'free Citizens',
	  free_housing_space: 'free Housing space',
	  level_tavern: 'Level Tavern',
	  maximum: 'maximum',
	  used: 'used',
      plundergold: 'Gold',	  
	  garrision: 'Garrison limit',
	  Sea: 'Sea',
	  Inland: 'Inland',		
      full: '0',
	  off: 'off',
      time_to_full: 'to full',
      time_to_empty: 'to empty',
      capacity: 'Capacity',
      safe: 'Safe',	
      training: 'Training',		
      plundering: 'Plundering',		
      constructing: 'Expansion in Progress',
	  next_Level: 'Needed for Level',
      transport: 'Transports',
	  loading: 'loading',
	  en_route: 'en route',
	  arrived: 'arrived',
      to_town_hall: 'to Town Hall',
	  to_saw_mill: 'to Saw Mill',
      to_mine: 'to luxury good',
      to_barracks: 'to Barracks',
      to_shipyard: 'to Shipyard',
      member: 'View Memberlist',
      transporting: 'Transport to',
      transporting_units: 'Deploying troops to',
      transporting_fleets: 'Moving fleet to',
	  today: 'today',
	  tomorrow: 'tomorrow',
	  yesterday: 'yesterday',
	  hour: 'h',
	  day: 'D',
	  week: 'W',
	  hour_long: 'Hour',
	  day_long: 'Day',
	  week_long: 'Week',
      ika_world: 'Search on Ikariam-World',
      charts: 'Show Charts',
      //settings
      cityOrder : 'cityOrder',
      fullArmyTable :  'Show all military units',
      hideOnWorldView : 'Force hide on world view',
      hideOnIslandView : 'Force hide on island view',	  
      hideOnCityView : 'Force hide on city view',
      onTop : 'Show on top of Ikariam windows',
      windowTennis : 'Show above ikariam on mouseover',
      autoUpdates : 'Automaticly check for updates',
      smallFont : 'Use smaller font size',
      alternativeBuildingList : 'Use alternative building list',
      compressedBuildingList : 'Use compressed building list',
	  wineOut : 'Disable Ambrosia feature "Out of Wine"',
	  dailyBonus : 'Automatically confirm the daily bonus',
	  unnecessaryTexts : 'Removes unnecessary descriptions',
	  ambrosiaPay : 'Deactivate new Ambrosia buying options',
      wineWarningTime : 'Wine remaining warning',
      languageChange : 'Change language',
	  current_Version : 'Current Version<b>:</b>',
	  ikariam_Version : 'Ikariam Version<b>:</b>',
	  reset : 'Reset all settings to default',
	  goto_website : 'Goto the scripts Userscripts.com website',
	  website : 'Website', 
      Check_for_updates : 'Force a check for updates',
      check : 'Check for updates', 
      Report_bug : 'Report a bug in the script',
      report : 'Report Bug',
      save : 'Save',
      save_settings : 'Save settings<b>!</b>&nbsp;',	  
      newsticker : 'Hide news ticker',
      event : 'Hide events',
	  logInPopup : 'Hide the Info Window when login',
      birdswarm : 'Hide the bird swarm',
      hourlyRes : 'Hide hourly resources',
      onIkaLogs : 'Use IkaLog Battle Report Converter',
      playerInfo : 'Show information about player',
	  control: 'Hide Control center',
	  alert: 'Please choose only one option!',
	  alert_palace: 'Please visit your capital city first',
	  alert_toast: 'Data Reset, reloading the page in a few seconds',
	  alert_error: 'An error occurred while checking for updates: ',
	  alert_noUpdate: 'No update is available for "',
	  alert_update: 'There is an update available for the Greasemonkey script "',
	  alert_update1: 'Would you like to go to the install page now?',
	  alert_daily: 'Please enable \'Automatically confirm the daily bonus \'',
      en : 'English',
      de : 'German',
      it : 'Italian',
      el : 'Greek',
      es : 'Spanish',
      fr : 'French',
	  ro : 'Romanian',
	  ru : 'Russian',
	  cz : 'Czech',
      pl : 'Polish',
      ar : 'Arabic',
      ir : 'Persian',
      pt : 'Portuguese',
	  tr : 'Turkish',
	  nl : 'Dutch',
      //settings descriptions
      cityOrder_description : 'cityOrder_description',
      fullArmyTable_description : 'Show all possible army units on the Army tab',
	  hideOnWorldView_description : 'Hide by default on world view',
      hideOnIslandView_description : 'Hide by default on island view',
      hideOnCityView_description : 'Hide by default on city view',
      onTop_description : 'Show board on top of Ikariam windows',
      windowTennis_description : 'Bring board to the top on mouseover<br>Send behind ikariam windows on mouseout<br>Ignores \'on top\' option',
      autoUpdates_description : 'Enable automatic update checking<br>(Once every 24hrs)',
      smallFont_description : 'Use a smaller font for the data tables',
      alternativeBuildingList_description : 'Use alternative building table',
      compressedBuildingList_description : 'Use condensed building table<br>Groups luxury resource production buildings<br>Groups palace/govenors residence',
      wineOut_description : 'Disables the Ambrosia option to buy \'Out of Wine\'',
	  dailyBonus_description : 'The daily bonus will be automatically confirmed<br>and the window is no longer displayed',
	  unnecessaryTexts_description: 'Removes unnecessary descriptions in buildings,<br>the building list of buildings, minimize scrolling',
	  ambrosiaPay_description : 'Disables the new Ambrosia buying options,<br>click on the button cancels the action',
      wineWarningTime_description : 'Wine remaining time turns, \'red\' at this point',
      languageChange_description : 'Change the language',
      newsticker_description : 'Hide news ticker in the GF-toolbar',
      event_description : 'Hide events under the advisers',
      logInPopup_description : 'Hide the Info Window when login',
      birdswarm_description : 'Hide the bird swarm in island and city view',
      hourlyRes_description : 'Hide hourly resources in the infobar',
      onIkaLogs_description : 'use IkaLogs for your battle reports',
      playerInfo_description : 'View information from the players in the island view',
	  control_description: 'Hide the Control center in world, island and city view',
      // settings categories
      visibility_category : '<b>Board Visibility</b>',
      display_category : '<b>Display Settings</b>',
      global_category : '<b>Global Settings</b>',
      army_category : '<b>Army Settings</b>',
      building_category : '<b>Building Settings</b>',
      resource_category : '<b>Resource Settings</b>',
	  language_category : '<b>Language Settings</b>',
      // Helptable
      Initialize_Board : '<b>Initialize Board</b>',
	  on_your_Town_Hall : 'on your Town Hall and go through each town with that view open',
	  on_the_Troops : 'on the \"Troops in town\" tab on left side and go through each town with that view open',
	  on_Museum : 'on Museum and then the \"Distribute Cultural Treaties\" tab',
	  on_Research_Advisor : 'on Research Advisor and then click on each of the 4 research tabs in the left window',
	  on_your_Palace : 'on your Palace',
	  on_your_Finance : 'on your Finance tab',
	  on_the_Ambrosia : 'on the \"Ambrosia shop\"',
	  Re_Order_Towns : '<b>Re-Order Towns</b>',
	  Reset_Position : '<b>Reset Position</b>',
	  On_any_tab : 'On any tab, drag the resource icon to the left of the town name',
	  Right_click : 'Right click on the empire menu button on the left side page menu',
	  Navigate : '1, 2, 3 ... 0, -, = <b>:&nbsp;&nbsp;</b> Navigate to town 1 to 12',
	  Navigate_to_City : 'SHIFT + 1/2/3/4/5/4/5 <b>:&nbsp;&nbsp;</b> Navigate to City/ Building/ Army/ Setting/ Help tab',
	  Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Navigate to City/ Military/ Research/ Diplomacy advisor',
	  Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Navigate to World/ Island/ City view',
	  Spacebar : 'Spacebar<b>:&nbsp;&nbsp;</b> Minimise/ Maximise the board',
	  Hotkeys : '<b>Hotkeys</b>',
      // formatting
      thousandSeperator : ',',
      decimalPoint:'.',
      click_:'<b>Click</b>'		
		},
	    de:{
      buildings: 'Gebäude',
	  economy: 'Wirtschaft',
	  military: 'Militär',
	  towns: 'Städte',
	  academy_: 'Akademie',	  
	  townhall_: 'Rathaus',
	  dump_: 'Halde',
	  warehouse_: 'Lagerhaus',
	  corruption: 'Korruption',
	  cultural: 'Kulturgüter',
	  population: 'Bevölkerung',
	  citizens: 'Bürger',
	  scientists: 'Forscher',
	  scientists_max: 'max. Forscher',
	  options: 'Optionen',
	  help: 'Hilfe',
	  agora: 'zur Agora',
	  to_world: 'Zeige Weltkarte', 
	  to_island: 'Zeige Insel',
	  army_cost: 'Kosten Armee',
	  fleet_cost: 'Kosten Flotte',
	  army_supply: 'Unterhalt Armee',
	  fleet_supply: 'Unterhalt Flotte',
	  research_cost: 'Kosten Forschung', 
	  income: 'Einkommen',
	  expenses: 'Ausgaben',
	  balances: 'Bilanz',	  
      espionage: 'Zeige Spionageberichte',
	  contracts: 'Zeige Verträge',
	  combat: 'Zeige Kampfberichte',
	  satisfaction: 'Zufriedenheit',
      total_ : 'gesamt',
      max_Level : 'max. Stufe',
      actionP : 'Aktionspunkte',
      researchP : 'Forschungspunkte',
      finances_ : 'Finanzen',
      free_ground : 'freier Bauplatz', 
      wood_ : 'Baumaterial',
      wine_ : 'Wein',
      marble_ : 'Marmor', 
      crystal_ : 'Kristallglas', 
      sulphur_ : 'Schwefel',	  
	  angry: 'wütend',
	  unhappy: 'unzufrieden',
	  neutral: 'neutral',
	  happy: 'zufrieden',
	  euphoric: 'euphorisch',		  
	  housing_space: 'max. Wohnraum',
	  free_Citizens: 'freie Bürger',
	  free_housing_space: 'freier Wohnraum',
	  level_tavern: 'Stufe Taverne',
	  maximum: 'maximum',
	  used: 'benutzt',
      plundergold: 'Gold',	  
	  garrision: 'Garnisionslimit',
	  Sea: 'See',
	  Inland: 'Land',		
      full: '0',
	  off: 'aus',
      time_to_full: 'bis voll',
      time_to_empty: 'bis leer',
	  capacity: 'Kapazität',
      safe: 'Sicher',	
      training: 'Ausbildung',		
      plundering: 'Plündern',		
      constructing: 'Ausbau im Gang',
	  next_Level: 'Benötigt für Stufe',
      transport: 'Transporte',
	  loading: 'beladen',
	  en_route: 'unterwegs',
	  arrived: 'angekommen',	  
      to_town_hall: 'zum Rathaus',
	  to_saw_mill: 'zum Sägewerk',
	  to_mine: 'zum Luxusgut',		
      to_barracks: 'zur Kaserne',
      to_shipyard: 'zur Kriegswerft',
      member: 'zur Mitgliederliste',
      transporting: 'Transport nach',
      transporting_units: 'Truppen verlegen nach',
      transporting_fleets: 'Flotte verlegen nach',
	  today: 'heute',
	  tomorrow: 'morgen',
	  yesterday: 'gestern',
	  hour: 'h',
	  day: 'T',
	  week: 'W',
	  hour_long: 'Stunde',
	  day_long: 'Tag',
	  week_long: 'Woche',
      ika_world: 'Suche in Ikariam-World',
      charts: 'Zeige Grafiken', 	  
      //settings
      cityOrder : 'Stadtanordnung sortieren',
      fullArmyTable : 'Zeige alle militärischen Einheiten',
      hideOnWorldView : 'Board in Weltansicht ausblenden',
      hideOnIslandView : 'Board in Inselansicht ausblenden',	  
      hideOnCityView : 'Board in Stadtansicht ausblenden',
      onTop : 'Board oben anzeigen',
      windowTennis : 'Board mit Mauszeiger oben anzeigen',
      autoUpdates : 'Automatische Aktualisierung',
      smallFont : 'Kleinere Schriftgröße benutzen',
      alternativeBuildingList : 'Alternative Gebäudeliste benutzen',
      compressedBuildingList : 'Komprimierte Gebäudeliste benutzen',
      wineOut : 'Ambrosia Feature "Wein geht aus" deaktivieren',
	  dailyBonus : 'Den täglichen Bonus automatisch bestätigen',
	  unnecessaryTexts : 'Entfernt unnötige Beschreibungen',
	  ambrosiaPay : 'Neue Ambrosia Kaufoptionen deaktivieren',
      wineWarningTime : 'Warnung: restlicher Wein',
      languageChange : 'Sprache wechseln',
	  current_Version : 'Aktuelle Version<b>:</b>',
	  ikariam_Version : 'Ikariam Version<b>:</b>',
	  reset : 'Auf Standard Einstellung zurücksetzen',
	  goto_website : 'Gehe zur Userscripts.com website',
	  website : 'Webseite', 	  
      Check_for_updates : 'Auf Updates überprüfen',
	  check : 'Überprüfe Updates', 	  
      Report_bug : 'Melde einen Fehler im Script',
	  report : 'Fehler melden',
      save : 'Speichern',
      save_settings : 'Einstellungen speichern<b>!</b>&nbsp;',
      newsticker : 'Newsticker ausblenden',
      event : 'Events ausblenden',
	  logInPopup : 'Infofenster beim einloggen ausblenden',
      birdswarm : 'Vogelschwarm ausblenden',
      hourlyRes : 'Stündliche Ressourcen Anzeige ausblenden',
      onIkaLogs : 'IkaLog Kampfbericht Konverter benutzen',
      playerInfo : 'Informationen über Spieler anzeigen',
	  control: 'Control Center ausblenden',
	  alert: 'Bitte wähle nur eine Option aus!',
	  alert_palace: 'Schaue bitte zuerst in den Palast deiner Hauptstadt',
	  alert_toast: 'Daten-Reset, Neuladen der Seite in wenigen Sekunden',
	  alert_error: 'Beim Suchen nach Updates ist ein Fehler aufgetreten: ',
	  alert_noUpdate: 'keine Updates verfügbar für "',
	  alert_update: 'Es ist ein Update verfügbar für das Greasemonkey-Skript "',
	  alert_update1: 'Möchten Sie jetzt auf die Installationsseite gehen?',
	  alert_daily: 'Aktiviere bitte \'Den täglichen Bonus automatisch bestätigen\'',
      en : 'Englisch',
      de : 'Deutsch',
      it : 'Italienisch',
      el : 'Griechisch',
      es : 'Spanisch',
      fr : 'Französisch',
	  ro : 'Rumänisch',
	  ru : 'Russisch',
	  cz : 'Tschechisch',
      pl : 'Polnisch',
      ar : 'Arabisch',
      ir : 'Persisch',
      pt : 'Portugiesisch',
	  tr : 'Türkisch',
	  nl : 'Niederländisch',
      //settings descriptions
      cityOrder_description : 'cityOrder_description',
      fullArmyTable_description : 'Zeigt alle möglichen Militär Einheiten in der Militäransicht an',
	  hideOnWorldView_description : 'Board standardmäßig in Weltansicht ausblenden',
      hideOnIslandView_description : 'Board standardmäßig in Inselansicht ausblenden',
      hideOnCityView_description : 'Board standardmäßig in Stadtansicht ausblenden',
      onTop_description : 'Zeige Board über Ikariam Fenster',
      windowTennis_description : 'Zeige Board mit Mauszeiger oben <br> oder hinter dem Ikariam Fenster <br> Ignoriert Option Board oben anzeigen',
      autoUpdates_description : 'Aktiviert die automatische Update-Überprüfung <br> (einmal alle 24 Stunden)',
      smallFont_description : 'Kleinere Schriftart benutzen',
      alternativeBuildingList_description : 'Alternative Gebäudeansicht verwenden',
      compressedBuildingList_description : 'Komprimierte Gebäudeansicht verwenden<br>Zusammenlegung der Gebäude der Luxus-Ressourcen Produktion<br>Zusammelegung von Palast und Stadthaltersitz',
      wineOut_description : 'deaktiviert die Ambrosia-Kauf Option \'Wein geht aus\'',
	  dailyBonus_description : 'Der tägliche Bonus wird automatisch bestätigt<br>und das Fenster wird nicht mehr angezeigt',
	  unnecessaryTexts_description: 'Entfernt unnötige Beschreibungen in Gebäuden,<br>der Bauliste von Gebäuden, minimiert das Scrollen',
	  ambrosiaPay_description: 'Deaktiviert die neuen Ambrosia Kaufoptionen,<br> betätigen des Buttons bricht die Aktion ab',
      wineWarningTime_description : 'Verbleibende Zeit für Wein, \'rot\' an dieser Stelle',
      languageChange_description : 'Sprachen einstellen',
      newsticker_description : 'Newsticker in der GF-Toolbar ausblenden',
      event_description : 'Events unter den Beratern ausblenden',
      logInPopup_description : 'Blendet das Infofenster beim einloggen aus',
      birdswarm_description : 'Vogelschwarm in Insel- und Stadtansicht ausblenden',
      hourlyRes_description : 'Stündliche Ressourcen Anzeige in der Infobar ausblenden',
      onIkaLogs_description : 'Benutze IkaLogs für deine Kampfberichte',
      playerInfo_description : 'Informationen vom Spieler in der Inselansicht anzeigen',
	  control_description: 'Control Center in Welt-, Insel- und Stadtansicht ausblenden',  
      // settings categories
      visibility_category : '<b>Board Sichtbarkeit</b>',
      display_category : '<b>Anzeigeoptionen</b>',
      global_category : '<b>Globale Einstellungen</b>',
      army_category : '<b>Militär Einstellungen</b>',
      building_category : '<b>Optionen Gebäude</b>',
      resource_category : '<b>Optionen Ressourcen</b>',
	  language_category : '<b>Optionen Sprache</b>',
      // Helptable
      Initialize_Board : '<b>Installationsanleitung</b>',
	  on_your_Town_Hall : 'Gehe ins Rathaus und durch jede Stadt mit geöffnetem Fenster',
	  on_the_Troops : 'Gehe zur linken Registerkarte \"Truppen in der Stadt\" und mit geöffnetem Fenster durch jede Stadt',
	  on_Museum : 'Gehe auf Museum und dann auf Registerkarte \"Kulturgüter verteilen\"',
	  on_Research_Advisor : 'Gehe zur Forschung und dann im linken Fenster alle 4 Forschungen anklicken',
	  on_your_Palace : 'Gehe zum Palast',
	  on_your_Finance : 'Gehe zur Finanzübersicht',
	  on_the_Ambrosia : 'Gehe zum \"Ambrosia Shop\"',
	  Re_Order_Towns : '<b>Städte neu anordnen</b>',
	  Reset_Position : '<b>Position zurücksetzen</b>',
	  On_any_tab : 'In jedem Reiter, links auf dem Ressourcen Symbol kann man die Städte verschieben',
	  Right_click : 'Gehe zur linken Registerkarte \"Empire Overview\" und drücke die rechte Maustaste',
	  Navigate : '1, 2, 3 ... 0, ß, ´ <b>:&nbsp;&nbsp;</b> Wechselt zwischen den Städten 1 bis 12',
	  Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Wechselt zwischen Stadt-, Gebäude-, Militäransicht, Optionen und Hilfe',
	  Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Wechselt zwischen Stadt-, Militär-, Forschungs- und Diplomatieberater',
	  Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Wechselt zwischen Welt-, Insel- und Stadtansicht',
	  Spacebar : 'Leertaste <b>:&nbsp;&nbsp;</b> Minimiert oder maximiert das Board',
	  Hotkeys : '<b>Kurztasten</b>',  
      // formatting
      thousandSeperator : '.',
      decimalPoint:',',
      click_:'<b>Klick</b>'	  
        },
	    it:{
      buildings: 'Edifici',
	  economy: 'Economia',
	  military: 'Forze armate',
	  towns: 'Città',
	  academy_: 'Accademia',
	  townhall_: 'Municipio',
	  dump_: 'Discarica',
	  warehouse_: 'Maggazino',
	  corruption: 'Corruzione',
	  cultural: 'Beni culturali',
	  population: 'Popolazione',
	  citizens: 'Cittadini',
	  scientists: 'Scienziati',
	  scientists_max: 'Scienziati mass.',
	  options: 'Opzioni',
	  help: 'Aiuto',
	  agora: '&nbsp;l\'Agorà',
	  to_world: 'Mostra Mondo', 
	  to_island: 'Mostra Isola',
	  army_cost: 'Costi Army',
	  fleet_cost: 'Costi della Flotta',
	  army_supply: 'Spesa Army',
	  fleet_supply: 'Spesa della Flotta',
	  research_cost: 'Costi Ricerca', 
	  income: 'Proventi',
	  expenses: 'Spese',
	  balances: 'Bilanci',	  
      espionage: 'Mostra rapporti di spionaggio',
	  contracts: 'Mostra contratti',
	  combat: 'Mostra battle Report',	
      satisfaction: 'Soddisfazione',
      total_ : 'totale',
      max_Level : 'Livello massimo',
      actionP : 'Punti azione',
      researchP : 'Punti di ricerca',
      finances_ : 'Finanze',
      free_ground : 'Terreno edificabile libero', 
      wood_ : 'Legno',
      wine_ : 'Vino',
      marble_ : 'Marmo', 
      crystal_ : 'Cristallo', 
      sulphur_ : 'Zolfo',		  
	  angry: 'arrabiato',
	  unhappy: 'triste',
	  neutral: 'neutro',
	  happy: 'felice',
	  euphoric: 'euforico',		  
	  housing_space: 'Spazio abitabile massimo',
   	  free_Citizens: 'Cittadini liberi',
	  free_housing_space: 'Spazio abitabile libero',
	  level_tavern: 'Livello Taverna',
	  maximum: 'massimo',
	  used: 'usato',
      plundergold: 'Oro',	  
	  garrision: 'Lim. guarnigione',
	  Sea: 'Mare',
	  Inland: 'Entroterra',		
      full: '0',
	  off: 'spento',
      time_to_full: 'appieno',
      time_to_empty: 'svuotare',
      capacity: 'Capacità',
      safe: 'Sicuro',	
      training: 'Formazione',		
      plundering: 'Saccheggio',		
      constructing: 'Ampliamento in corso!',
      next_Level: 'Necessari per<br>il livello',
      transport: 'Trasporti',
	  loading: 'caricamento',
	  en_route: 'in corso',
	  arrived: 'arrivato',	  
      to_town_hall: 'a Municipio di',
	  to_saw_mill: 'alla segheria',
	  to_mine: 'a bene di lusso',		
      to_barracks: 'alla caserma di',
      to_shipyard: 'alle cantiere navale di guerra di',
      member: 'Elenco dei membri',
      transporting: 'Trasportati a',
      transporting_units: 'Sposta l`esercito a',
      transporting_fleets: 'Sposta la flotta a',
	  today: 'oggi',
	  tomorrow: 'domani',
	  yesterday: 'ieri',
	  hour: 'h',
	  day: 'G',
	  week: 'S',
	  hour_long: 'Ora',
	  day_long: 'Giorno',
	  week_long: 'Settimana',
      ika_world: 'Cerca su Ikariam-World',
      charts: 'Visualizza Grafici',	  
      //settings
      cityOrder : 'Metti in ordine le città',
      fullArmyTable :  'Mostra tutte le unità militari',
      hideOnWorldView : 'Nascondere visione del mondo',
      hideOnIslandView : 'Nascondere vista dell\'isola',	  
      hideOnCityView : 'Nascondere vista della città',
      onTop : 'Mostra sopra le finestre Ikariam',
      windowTennis : 'Mostra sopra Ikariam al passaggio del mouse',
      autoUpdates : 'Controllare automaticamente gli aggiornamenti',
      smallFont : 'Utilizzare caratteri più piccoli',
      alternativeBuildingList : 'Utilizza elenco edifici alternativo',
      compressedBuildingList : 'Utilizza l\'elenco compressa di edifici',
      wineOut : 'Disattivare Ambrosia funzione "vino esce"',
	  dailyBonus : 'Automaticamente confermare il bonus giornaliero',
	  unnecessaryTexts : 'Rimuovere descrizioni inutili',
	  ambrosiaPay : 'Disattivare le nuove opzioni di acquisto Ambrosia',
      wineWarningTime : 'Vino avvertimento rimanente',
      languageChange : 'Cambia Lingua',
	  current_Version : 'Versione attuale<b>:</b>',
	  ikariam_Version : 'Versione Ikariam<b>:</b>',
	  reset : 'Ripristinare tutte le impostazioni di default',
	  goto_website : 'Vai al sito web script Userscripts.com',
	  website : 'Sito web', 	  
      Check_for_updates : 'Controlla aggiornamenti',
	  check : 'Controlla aggiornamenti', 	  
      Report_bug : 'Segnala un bug nello script',
	  report : 'Segnala bug',
      save : 'Salvare',
      save_settings : 'Salva impostazioni<b> !</b>&nbsp;',		  
      newsticker : 'Nascondere il ticker per notizie',
      event : 'Nascondere gli eventi',
	  logInPopup : 'Nascondere la finestra informazioni quando login',
      birdswarm : 'Nascondere lo sciame di uccelli',
      hourlyRes : 'Nascondere la visualizzazione le risorse orarie',
      onIkaLogs : 'Utilizzare IkaLog Battle Report Converter',
      playerInfo : 'Visualizza informazioni su giocatore',
	  control: 'Nascondere il centro di controllo',
	  alert: 'Si prega di scegliere una sola opzione!',
	  alert_palace: 'Si prega di visitare il vostro capitale prima',
	  alert_toast: 'Data Reset, ricaricare la pagina in pochi secondi',
	  alert_error: 'Si è verificato un errore durante la ricerca degli aggiornamenti: ',
	  alert_noUpdate: 'Nessun aggiornamento è disponibile per "',
	  alert_update: 'C\'è un aggiornamento disponibile per lo script Greasemonkey  "',
	  alert_update1: 'Vuoi andare alla pagina installa ora?',
	  alert_daily: 'Si prega di abilitare \'Automaticamente confermare il bonus giornaliero \'',
      en : 'Inglese',
      de : 'Tedesco',
      it : 'Italiano',
      el : 'Greco',
      es : 'Spagnolo',
      fr : 'Francese',
	  ro : 'Rumeno',
	  ru : 'Russo',
	  cz : 'Ceco',
      pl : 'Polacco',
      ar : 'Arabo',
      ir : 'Persiano',
      pt : 'Portoghese',
	  tr : 'Turco',
	  nl : 'Olandese',
      //settings descriptions
      cityOrder_description : 'cityOrder_description',
      fullArmyTable_description : 'Mostra tutti i tipi di unità militari nella vista per militare',
	  hideOnWorldView_description : 'Nascondere di default su visione del mondo',
      hideOnIslandView_description : 'Nascondere di default su vista sull\'isola',
      hideOnCityView_description : 'Nascondere di default su vista sulla città',
      onTop_description : 'Visualizza bordo sopra le finestre Ikariam',
      windowTennis_description : 'Portare bordo verso l\'alto al passaggio del mouse<br>Invia dietro finestre Ikariam su mouseout<br>Ignora l\'opzione \'alto su\'',
      autoUpdates_description : 'Attivare il controllo di aggiornamento automatico<br>(Una volta ogni 24 ore)',
      smallFont_description : 'Utilizzare un carattere più piccolo per le tabelle di dati',
      alternativeBuildingList_description : 'Utilizzare tavolo edificio alternativo',
      compressedBuildingList_description : 'Utilizzare tavolo edificio compressa<br>la fusione la costruzione di produzione<br>la fusione la costruzione di palazzo e sede governatore',
      wineOut_description : 'Disattiva l\'opzione Ambrosia di acquistare \'Vino esce \'',
	  dailyBonus_description : 'Il bonus giornaliero sarà automaticamente confermata<br>e la finestra non viene più visualizzato',
	  unnecessaryTexts_description: 'Rimuove le descrizioni inutili negli edifici,<br>la lista costruzione di edifici,<br>ridurre al minimo lo scorrimento',
	  ambrosiaPay_description : 'Disattiva le nuove opzioni di acquisto Ambrosia,<br>fare clic sul pulsante annulla l\'azione',
      wineWarningTime_description : 'Tempo rimanente per il vino, \'rosso \' a questo punto',
      languageChange_description : 'Cambiare la lingua',
      newsticker_description : 'Nascondere il ticker per notizie nel GF-Toolbar',
      event_description : 'Nascondere la gli eventi tra i consulenti',
      logInPopup_description : 'Nascondere la finestra informazioni quando login', //,<br>la finestra \'bonus giornaliero\' rimane attivo',
      birdswarm_description : 'Nascondere lo sciame di uccelli nella vista dell\'isola e vista sulla città',
      hourlyRes_description : 'Nascondere la visualizzazione le risorse orarie nella barra informazioni',
      onIkaLogs_description : 'Usa IkaLogs per i report di battaglia',
      playerInfo_description : 'Guarda le informazioni dai giocatori in vista dell\'isola',
	  control_description: 'Nascondere il centro controllo nell mondo, nella isola e vista sulla città',
      // settings categories
      visibility_category : '<b>Visibilità Board</b>',
      display_category : '<b>Opzioni di visualizzazione</b>',
      global_category : '<b>Impostazioni globali</b>',
      army_category : '<b>Impostazioni militari</b>',
      building_category : '<b>Impostazioni da costruzione</b>',
      resource_category : '<b>Impostazioni delle risorse</b>',
	  language_category : '<b>Impostazioni della lingua</b>',
      // Helptable
      Initialize_Board : '<b>Inizializzare Board</b>',
	  on_your_Town_Hall : 'Andare sul vostro municipio e passare attraverso ogni città con quella vista aperta',
	  on_the_Troops : 'Andare su \"Truppe nella città\" linguetta sul lato sinistro e passare attraverso ogni città con quella vista aperta',
	  on_Museum : 'Andare in Museo e poi il \"Distribuisci beni culturali\" scheda',
	  on_Research_Advisor : 'Andare a consulente di ricerca e fare clic su ciascuna delle quattro schede nella finestra di ricerca sulla sinistra',
	  on_your_Palace : 'Andare sul Palazzo',
	  on_your_Finance : 'Andare sul scheda Finanza',
	  on_the_Ambrosia : 'Andare sul \"Ambrosia shop\"',
	  Re_Order_Towns : '<b>Organizzare le città nuove</b>',
	  Reset_Position : '<b>Ripristina posizione</b>',
	  On_any_tab : 'Su ogni scheda, trascinare l\'icona di risorse a sinistra del nome della città',
	  Right_click : 'Fare clic destro sul pulsante del menu \"Empire Overview\" sul menù sinistro della pagina',
	  Navigate : '1, 2, 3 ... 0, +, \\ <b>:&nbsp;&nbsp;</b> Passare alla città 1 - 12',
	  Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Passare alla scheda Città/ Edilizia/ dell\'Esercito/ Opzioni e Aiuto',
	  Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Passare alla Città/ Military/ Ricerca/ consulente Diplomazia',
	  Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Passare alla visione del mondo/ della Isola/ della Città',
	  Spacebar : 'Barra spaziatrice<b>:&nbsp;&nbsp;</b> Minimizzare/ Massimizzare il Board',
	  Hotkeys : '<b>Comandi Rapidi</b>',	  
      // formatting
      thousandSeperator : ',',
      decimalPoint:'.',
      click_:'<b>Clic</b>'		
        },
		el:{                     // Thx Minoas for Translation
      buildings: 'Κτιρια',
	  economy: 'Oικονομια',
	  military: 'Στρατευμα',
	  towns: 'Πολεις',
	  academy_: 'Ακαδημια',
	  townhall_: 'Δημαρχειο',
	  dump_: 'Αλανα',
	  warehouse_: 'Αποθηκη<br>&nbsp;&nbsp;&nbsp;εμπορευματων',
	  corruption: 'Διαφθορα',
	  cultural: 'Πολιτιστικα αγαθα',
	  population: 'Πληθυσμος',
	  citizens: 'Πολιτες',
	  scientists: 'Ερευνητες',
	  scientists_max: 'Ερευνητες μεγιστο',
	  options: 'Επιλογες',
	  help: 'Βοηθεια',
	  agora: 'to Αγορα',
	  to_world: 'Προβολη Κοσμου',
	  to_island: 'tο Νησι μου',
	  army_cost: 'Κοστος στρατου',
	  fleet_cost: 'Κοστος στολου',
	  army_supply: 'Προμηθεια στρατου',
	  fleet_supply: 'Προμηθεια στολου',
	  research_cost: 'Κοστος ερευνας',
	  income: 'Εσοδα',
	  expenses: 'Δαπανες',
	  balances: 'Ισορροπιες',	  
      espionage: 'Κατασκοπικες αναφορες',
	  contracts: 'Συμβολαια',
	  combat: 'Αναφορες μαχης',
	  satisfaction: 'Ικανοποιηση',
      total_ : 'συνολο',
      max_Level : 'Eπιπεδο ανωτατο οριο',
      actionP : 'Ποντοι Δρασης',
      researchP : 'Ποντοι ερευνας',
      finances_ : 'Oικονομικα',
      free_ground : 'Ελευθερος Οικοδομικος Χωρος',
      wood_ : 'ξυλο',
      wine_ : 'Kρασι',
      marble_ : 'Mαρμαρο',
      crystal_ : 'Kρυσταλλο',
      sulphur_ : 'θειο',	  
	  angry: 'θυμωμενος',
	  unhappy: 'δυστυχης',
	  neutral: 'ουδετερος',
	  happy: 'χαρουμενοι',
	  euphoric: 'ευφορικη',		  
	  housing_space: 'μεγιστος χωρος κατοικιας',
	  free_Citizens: 'ελευθεροι Πολιτες',
	  free_housing_space: 'ελευθερος χωρος κατοικιας',
	  level_tavern: 'Eπιπεδο Ταβερνας',
	  maximum: 'μεγιστο',
	  used: 'χρησιμοποιημενο',
      plundergold: 'χρυσoς',	  
	  garrision: 'Οριο φρουρας',
	  Sea: 'θαλασσης',
	  Inland: 'ξηρας',		
      full: '0',
	  off: 'μακριά από',
      time_to_full: 'ος γεμισει',
      time_to_empty: 'ος αδιασμα',
      capacity: 'Χωριτηκοτητα',
      safe: 'Σιγουρο',
      training: 'Eκπαιδευση',	
      plundering: 'Λεηλασιες',	
      constructing: 'Επεκτεινεται!',
	  next_Level: 'Χρειαζονται για<br>επιπεδο',
      transport: 'Μεταφορες',
	  loading: 'Φορτωνει',
	  en_route: 'Καθ`οδΟν',
	  arrived: 'εφτασε',  
      to_town_hall: 'προς Δημαρχειο',
	  to_saw_mill: 'προς Πριονιστηριο', 
      to_mine: 'προς Ορυχειο', 
      to_barracks: 'προς Στρατονες',
      to_shipyard: 'προς πολεμικο Ναυπηγειο',
      member: 'προς λιστα Μελων',
      transporting: 'Μεταφορα προς',
      transporting_units: 'Μεταφορα ταγματον',
      transporting_fleets: 'Μεταφορα Αρμαδας',
	  today: 'σημερα',
	  tomorrow: 'αυριο',
	  yesterday: 'εχτες',
	  hour: 'h',
	  day: 'Μ',
	  week: 'Ε',
	  hour_long: 'Ωρα',
	  day_long: 'Μερας',
	  week_long: 'Εβδομαδας',
      ika_world: 'Αναζήτησης Ikariam-World',
      charts: 'δείτε τα Γραφήματα',	 
      //settings
      cityOrder : 'Καταχωρηση πολεων',
      fullArmyTable :  'Εμφανιση ολων τον πολεμικων δυναμεων',
      hideOnWorldView : 'Αποκρυψη προγραμματος στον κοσμικο χαρτη',
      hideOnIslandView : 'Αποκρυψη προγραμματος στον χαρτη νησιων',  
      hideOnCityView : 'Αποκρυψη προγραμματος στον χαρτη πολεως',
      onTop : 'Ενδειξη προγραμματος στην κορυφη της σελιδας',
      windowTennis : 'Ενδειξη προγραμματος μεσω ποντικιου',
      autoUpdates : 'Αυτοματη επικυρωση σελιδας',
      smallFont : 'Χρηση μικρων γραμματων',
      alternativeBuildingList : 'Χρηση συγκεντρωτικων στοιχειων',
      compressedBuildingList : 'Use compressed building list', //
      wineOut : 'Disable Ambrosia feature "Out of Wine"', //
	  dailyBonus : 'Automatically confirm the daily bonus', //
  	  unnecessaryTexts : 'Removes unnecessary descriptions', //
	  ambrosiaPay : 'Deactivate new Ambrosia buying options', //
      wineWarningTime : 'Προειδοποιηση υπολοιπο κρασιου',
      languageChange : 'Αλλαγη γλωσσας',
	  current_Version : 'Επικαιρη εκδοση<b>:</b>',
	  ikariam_Version : 'Ikariam Version<b>:</b>', //
	  reset : 'Επαναφορα ρυθμισεις',
	  goto_website : 'Επισκεφτητε τη σελιδα Userscripts.com',
	  website : 'Ηλεκρονικη σελιδα',
      Check_for_updates : 'Ελεγχος για Updates',
      check : 'Ελεγχος Updates',
      Report_bug : 'Αναφορα λαθη στο προγραμμα',
      report : 'Αναφορα λαθος',
      save : 'Save', //
      save_settings : 'Save settings<b>!</b>&nbsp;', //	  
      newsticker : 'Hide news ticker', //
      event : 'Hide events', //
	  logInPopup : 'Hide the Info Window when login', //
      birdswarm : 'Hide the bird swarm', //
      hourlyRes : 'Hide hourly resources', //
      onIkaLogs : 'Use IkaLog Battle Report Converter', //
      playerInfo : 'Show information about player', //
	  control: 'Hide Control center', //
	  alert: 'Please choose only one option!', //
	  alert_palace: 'Please visit your capital city first', //
	  alert_toast: 'Data Reset, reloading the page in a few seconds', //
	  alert_error: 'An error occurred while checking for updates: ', //
	  alert_noUpdate: 'No update is available for "', //
	  alert_update: 'There is an update available for the Greasemonkey script "', //
	  alert_update1: 'Would you like to go to the install page now?', //
	  alert_daily: 'Please enable \'Automatically confirm the daily bonus \'', //
      en : 'Αγγλικα',
      de : 'Γερμανικα',
      it : 'Iταλικα',
      el : 'Eλληνικα',
      es : 'Iσπανικα',
      fr : 'Γαλλικα',
	  ro : 'Ρουμανικα',
	  ru : 'Ρωσικα',
	  cz : 'Τσεχικα',
      pl : 'Πολωνoς',
      ar : 'Αραβικα',
      ir : 'Περσικα',
      pt : 'Πορτογαλικα',
	  tr : 'Τουρκικα',
	  nl : 'Ολλανδικα',
      //settings descriptions
      cityOrder_description : 'cityOrder_description',
      fullArmyTable_description : 'Ενδειξη ολων των πιθανων ταγματων στη στρατιωτικη θεα',
	  hideOnWorldView_description : 'Αθετικη αποκρυψη προγραμματος στον κοσμικο χαρτη',
      hideOnIslandView_description : 'Αθετικη αποκρυψη προγραμματος στον χαρτη του νησιου',
      hideOnCityView_description : 'Αθετικη αποκρυψη προγραμματος στον χαρτη πολεως',
      onTop_description : 'Ενδειξη προγραμματος πανω απο το παραθυρο Ικαριαμ',
      windowTennis_description : 'Φερτε σκαφους στην κορυφη για mouseover<br>Αποστολη πισω Ikariam παραθυρα για MouseOut<br>Αγνοει \'στην κορυφη\' επιλογη',
      autoUpdates_description : 'Ενεργοποιηση του αυτοματου ελεγχου<br>(μια φορα καθε 24 ωρες)',
      smallFont_description : 'Χρησιμοποιησε μικρη γραμματοσειρα',
      alternativeBuildingList_description : 'Συγκεντωτικη χρηση τις οψεις τον κτιριον',
      compressedBuildingList_description : 'Use condensed building table<br>Groups luxury resource production buildings<br>Groups palace/govenors residence', //
      wineOut_description : 'Disables the Ambrosia option to buy \'Out of Wine\'', //
	  dailyBonus_description : 'The daily bonus will be automatically confirmed<br>and the window is no longer displayed', //
	  unnecessaryTexts_description: 'Removes unnecessary descriptions in buildings,<br>the building list of buildings, minimize scrolling', //
	  ambrosiaPay_description : 'Disables the new Ambrosia buying options,<br>click on the button cancels the action', //
      wineWarningTime_description : 'Υπολοιπο χρονου για κραση σε αυτην την πολη<br>\'κοκκινο\' σε αυτο το σημειο',
      languageChange_description : 'Επιλογη γλωσσας',
      newsticker_description : 'Hide news ticker in the GF-toolbar', //
      event_description : 'Hide events under the advisers', //
      logInPopup_description : 'Hide the Info Window when login', //
      birdswarm_description : 'Hide the bird swarm in island and city view', //
      hourlyRes_description : 'Hide hourly resources in the infobar', //
      onIkaLogs_description : 'use IkaLogs for your battle reports', //
      playerInfo_description : 'View information from the players in the island view', //
	  control_description: 'Hide the Control center in world, island and city view', //
      // settings categories
      visibility_category : '<b>Ορατοτητα προγραμματος</b>',
      display_category : '<b>Επιλογες Εμφανισης</b>',
      global_category : '<b>Παγκοσμιες επιλογες</b>',
      army_category : '<b>Στρατιωτικες επιλογες</b>',
      building_category : '<b>Επιλογες κτιριων</b>',
      resource_category : '<b>Επιλογες πορων</b>',
	  language_category : '<b>Επιλογες γλωσσας</b>',
      // Helptable
      Initialize_Board : '<b>Τοποθετηση προγραμματος</b>',
	  on_your_Town_Hall : 'Πηγαινε στο Δημαρχειο μεσο καθε πολης με ανοιχτο παραθυρο',
	  on_the_Troops : 'Πηγαινε στην αριστερη καρτα καταχωρησης \"Στρατευματα στην πολη\" κε μεσω ανοιχτου παραθηρου σε καθε πολη',
	  on_Museum : 'Πηγαινε στο Μουσειο και μετα στην καρτα καταχωρησης \"Διανομη πολιτιστικων αγαθων\"',
	  on_Research_Advisor : 'Πηγαινε στην ερευνα και μετα στο αριστερο παραθυρο και διαλεςε τις 4 ερευνες',
	  on_your_Palace : 'Πηγαινε στο παλατι',
	  on_your_Finance : 'Πηγαινε στην οικονομικη ανασκοπηση',
	  on_the_Ambrosia : 'Πηγαινε \"Ambrosia Shop\"',
	  Re_Order_Towns : '<b>Καινουρια τακτοποιηση πολεων</b>',
	  Reset_Position : '<b>Αποδοση Θεσεων</b>',
	  On_any_tab : 'Κινιση τον πολεων σε οποιαδηποτε καρτελα πηγων',
	  Right_click : 'Πηγαινε στην καρτελα \"Empire Overview\" και πατησει το δες πληκτρο του ποντικιου',
	  Navigate : '1, 2, 3 ... 0, -, = <b>:&nbsp;&nbsp;</b> Αλλαγη αναμεσα της πολης 1 εως 12',
	  Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Αλλαγη θεα αναμεσα πολης-, κτιριων και στρατευματα', // Setting/ Help tab
	  Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Αλλαγη θεα αναμεσα πολης-, στρατιωτικων-, η ερευνα και οι συμβουλοι διπλωματιας',
	  Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Αλλαγη θεα αναμεσα Κοσμου, νησιου και πολης',
	  Spacebar : 'Spacebar<b>:&nbsp;&nbsp;</b> Μεγιστοποιει η ελαχιστοποιει το προγραμμα',
	  Hotkeys : '<b>Πληκτρα συντομευσης</b>',
      // formatting
      thousandSeperator : ',',
      decimalPoint:'.',
      click_:'<b>Kλικ</b>' 	
		},
		es:{                     // Thx Max783 for Translation
      buildings: 'Edificios',
	  economy: 'Economía',
	  military: 'Milicia',
	  towns: 'Ciudades',
	  academy_: 'Academia',
	  townhall_: 'Intendencia',
	  dump_: 'Almacén',
	  warehouse_: 'Depósito',
	  corruption: 'Corrupción',
	  cultural: ' Bienes Culturales',
	  population: 'Población',
	  citizens: 'Ciudadanos',
	  scientists: 'Investigadores',
	  scientists_max: 'Max Investigadores',
	  options: 'Opciones',
	  help: 'Ayuda',
	  agora: 'Ágora',
	  to_world: 'Mostrar Mundo', 
	  to_island: 'Mostrar Isla',
	  army_cost: 'Costo del Ejército',
	  fleet_cost: 'Costo la Flota',
	  army_supply: 'Suministro del Ejército',
	  fleet_supply: 'Suministro la Flota',
	  research_cost: 'Costo de Investigación', 
	  income: 'Ingresos',
	  expenses: 'Cargos',
	  balances: 'Balances',	  
      espionage: 'Mostrar Informes de espionaje',
	  contracts: 'Mostrar Acuerdo',
	  combat: 'Mostrar Informes de guerra',
	  satisfaction: 'Satisfacción',
      total_ : 'total',
      max_Level : 'Nivel máximo',
      actionP : 'Puntos de acción',
      researchP : 'Puntos de Investigación',
      finances_ : 'Finanzas',
      free_ground : 'Terreno libre', 
      wood_ : 'Madera',
      wine_ : 'Vino',
      marble_ : 'Mármol', 
      crystal_ : 'Cristal',
      sulphur_ : 'Azufre',		  
	  angry: 'enojado',
	  unhappy: 'infeliz',
	  neutral: 'neutro',
	  happy: 'feliz',
	  euphoric: 'eufórico',	  
	  housing_space: 'Espacio habitable máximo',
	  free_Citizens: 'Ciudadanos libres',
	  free_housing_space: 'Espacio habitable libre',
	  level_tavern: 'Nivel Taberna',
	  maximum: 'máximo',
	  used: 'usado',
      plundergold: 'Oro',	  
	  garrision: 'Límite de guarnición',
	  Sea: 'de Mar',
	  Inland: 'de Tierra',		
      full: '0',
	  off: 'apagado',
      time_to_full: 'para llenar',
      time_to_empty: 'para vaciar',
      capacity: 'Capacidad',
      safe: 'Seguro',	
      training: 'Entrenando',		
      plundering: 'Saqueando',		
      constructing: 'Ampliación en progreso',
	  next_Level: 'Necesario para<br>el nivel',
      transport: 'Transportes',
	  loading: 'cargando',
	  en_route: 'en marcha',
	  arrived: 'llegado',	  
      to_town_hall: 'a la Intendencia de',
	  to_saw_mill: 'Al aserradero',
      to_mine: 'Al bien de lujo',
      to_barracks: 'a Cuartel de',
      to_shipyard: 'a el Astillero de',
      member: 'Lista de miembros',
      transporting: 'Transporte en',
      transporting_units: 'Desplegar Tropas a',
      transporting_fleets: 'Desplegar Flotas a',
	  today: 'hoy',
	  tomorrow: 'mañana',
	  yesterday: 'ayer',
	  hour: 'h',
	  day: 'D',
	  week: 'S',
	  hour_long: 'Hora',
	  day_long: 'Día',
	  week_long: 'Semana',
      ika_world: 'Buscar Ikariam-World',
      charts: 'Mostrar Gráficos',	 	  
      //settings
      cityOrder : 'Ordene los ciudades',
      fullArmyTable : 'Mostrar todas las unidades militares',
      hideOnWorldView : 'Ocultar al Mostrar mundo',
      hideOnIslandView : 'Ocultar al Mostrar isla',	  
      hideOnCityView : 'Ocultar al Mostrar ciudad',
      onTop : 'Mostrar encima de las ventanas de Ikariam',
      windowTennis : 'Mostrar arriba de las ventanas de Ikariam al posicionar el mouse',
      autoUpdates : 'Comprobar automáticamente si hay actualizaciones',
      smallFont : 'Utilizar una fuente más pequeña',
      alternativeBuildingList : 'Utilizar la lista de edificios alternativa',
      compressedBuildingList : 'Usar la vista comprimida de edificios',
      wineOut : 'Desactivar la opción de Ambrosía cuando te quedas sin vino',
	  dailyBonus : 'Confirmar automaticamente el bonus diario',
  	  unnecessaryTexts : 'Remover descripciones innecesarias',
	  ambrosiaPay : 'Desactivar las nuevas opciones de compra de Ambrosía',
      wineWarningTime : 'Advertencia cuando se esté acabando el vino',
      languageChange : 'Cambiar Idioma',
	  current_Version : 'La versión actual<b>:</b>',
	  ikariam_Version : 'La versión Ikariam<b>:</b>',
	  reset : 'Restablecer los ajustes por defecto',
	  goto_website : 'Ir al sitio de Userscripts.com',
	  website : 'Sitio web', 
      Check_for_updates : 'Buscar actualizaciones',
      check : 'Buscar actualizaciones', 
      Report_bug : 'Notificar un error en el script',
      report : 'Informar de un error',
      save : 'Guardar',
      save_settings : 'Guardar cambios<b>!</b>&nbsp;',		  
      newsticker : 'Ocultar noticias',
      event : 'Ocultar eventos',
	  logInPopup : 'Ocultar la ventana de info al loguearse',
      birdswarm : 'Ocultar las aves',
      hourlyRes : 'Ocultar los recursos por hora',
      onIkaLogs : 'Utilizar el convertidor de batallas de Ikalogs',
      playerInfo : 'Mostrar información sobre el jugador',
	  control: 'Ocultar barra inferior de control',
	  alert: '¡Sólo se admite una sola opción!',
	  alert_palace: 'Visite antes la ciudad capital, por favor.',
	  alert_toast: 'Script reiniciado, recargando página en unos segundos',
	  alert_error: 'Un error ha ocurrido al comprobar actualizaciones: ',
	  alert_noUpdate: 'No hay actualizaciones disponibles para "',
	  alert_update: 'Hay una actualización para el script de Greasemonkey! "',
	  alert_update1: '¿Desea ir a la página del script?',
	  alert_daily: 'Please enable \'Automatically confirm the daily bonus \'', //
      en : 'Inglés',
      de : 'Alemán',
      it : 'Italiano',
      el : 'Griego',
      es : 'Español',
      fr : 'Francés',
	  ro : 'Rumano',
	  ru : 'Ruso',
	  cz : 'Checo',
      pl : 'Polaco',
      ar : 'Arábico',
      ir : 'Persa',
      pt : 'Portugués',
	  tr : 'Turco',
	  nl : 'Holandés',
      //settings descriptions
      cityOrder_description : 'Orden de la descripción de ciudades',
      fullArmyTable_description : 'Mostrar todos los tipos de unidades militares aún al no tenerlas',
	  hideOnWorldView_description : 'Ocultar por defecto cuando se ve el mundo',
      hideOnIslandView_description : 'Ocultar por defecto cuando se ve la isla',
      hideOnCityView_description : 'Ocultar por defecto cuando se ve la ciudad',
      onTop_description : 'Mostrar tabla de arriba de las ventanas de Ikariam',
      windowTennis_description : 'Llevar tablero sobre las ventanas de Ikariam al posar el mouse sobre el<br>Enviar Ikariam detrás de las ventanas de Ikariam al posar el mouse sobre el<br>No tiene en cuenta la opción de \'alto\'',
      autoUpdates_description : 'Habilitar la comprobación de actualización automática<br>(Una vez cada 24 horas)',
      smallFont_description : 'Utilice una fuente más pequeña para las tablas de datos',
      alternativeBuildingList_description : 'Utilizar la lista de construcción alternativa',
      compressedBuildingList_description : 'Usar la vista comprimida de edificios<br>Juntar los edificios de producción de recursos<br>Juntar palacio y residencias del gobernador',
      wineOut_description : 'Desactiva el cartel de ambrosía al quedarte sin vino',
	  dailyBonus_description : 'El bonus diario se confirma automaticamente<br>y esa ventana no se mostrará más.',
	  unnecessaryTexts_description: 'Elimina las descripciones innecesarias en la lista de construcción de edificios, reduce el desplazamiento',
	  ambrosiaPay_description : 'Desactiva el cartel de compras de Ambrosía,<br>Cliquear el botón cancela la acción',
      wineWarningTime_description : 'Tiempo restante del vino se convierte, \'rojo\' en ese momento',
      languageChange_description : 'Cambiar el idioma',
      newsticker_description : 'Oculta las noticias en la barra de Gameforge',
      event_description : 'Oculta los carteles de eventos',
      logInPopup_description : 'Oculta la ventana de info al loguearte', //El cartel de \'Bonus Diario\’ permanece activo
      birdswarm_description : 'Oculta las aves en la vista de isla y ciudad',
      hourlyRes_description : 'Ocultar los recursos por hora en la barra de info',
      onIkaLogs_description : 'Utilizar IkaLogs para sus informes de batalla',
      playerInfo_description : 'Ver información de los jugadores de la opinión de la isla',
	  control_description: 'Oculta la barra de control inferior en vistas de ciudad, isla y mundo (Mantiene coordenadas)',
      // settings categories
      visibility_category : '<b>Visibilidad del Tablero</b>',
      display_category : '<b>Ajustes de pantalla</b>',
      global_category : '<b>Ajustes globales</b>',
      army_category : '<b>Ajustes del Ejército</b>',
      building_category : '<b>Ajustes de edificio</b>',
      resource_category : '<b>Configuración de recursos</b>',
	  language_category : '<b>Configuración de idioma</b>',
      // Helptable
      Initialize_Board : '<b>Inicializar Tablero</b>',
	  on_your_Town_Hall : 'Vaya a la intendencia y pase por todas sus ciudades con esta vista',
	  on_the_Troops : 'Vaya a la pestaña de \"Tropas en la ciudad\" en la parte izquierda y pase por cada ciudad con esta vista',
	  on_Museum : 'Vaya al museo y luego haga clic en  \"Distribuir bienes culturales\"',
	  on_Research_Advisor : 'Vaya al Ayudante de Investigación y pase por los 4 temas de investigación',
	  on_your_Palace : 'Vaya al Palacio',
	  on_your_Finance : 'Vaya a las finanzas (Donde se ve el oro)',
	  on_the_Ambrosia : 'Vaya a la \"Tienda de ambrosía\"',
	  Re_Order_Towns : '<b>Reordenar ciudades</b>',
	  Reset_Position : '<b>Restablecer Posición</b>',
	  On_any_tab : 'Sobre el ícono de recurso de cada ciudad, hágale clic y múevalo a la posición deseada',
	  Right_click : 'Haga clic derecho sobre el la pestaña de \"Empire Overview\" en el menú izquierdo de la página',
	  Navigate : '1, 2, 3 ... 0, \', + <b>:&nbsp;&nbsp;</b> Cambiar entre las ciudades 1-12',
	  Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Vaya a Ciudad / Construcción / Ejército', // Setting/ Help tab
	  Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Vaya a Ciudades / Milicia / Investigación / Diplomacia',
	  Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Vaya a la visión del mundo / isla / ciudad',
	  Spacebar : 'Spacebar<b>:&nbsp;&nbsp;</b> Minimizar / Maximizar el tablero',
	  Hotkeys : '<b>Teclas de acceso rápido</b>',
      // formatting
      thousandSeperator : ',',
      decimalPoint:'.',
      click_:'<b>Clic</b>'		
		},
        fr:{                     // Thx randalph for Translation
      buildings: 'Bâtiments',  
      economy: 'Ressources',  
      military: 'Armée',  
      towns: 'Villes',  
      academy_: 'Académie',  
      townhall_: 'Hôtel de ville',  
      dump_: 'Dépot',  
      warehouse_: 'Entrepôt',  
      tavern_level: 'Niveau taverne',  
      corruption: 'Corruption',  
      cultural: 'Traités culturels',  
      population: 'Population',  
      citizens: 'Citoyens',  
      scientists: 'Scientifiques',  
      scientists_max: 'max. Scientifiques',  
      options: 'Options',  
      help: 'Aide',  
      agora: 'Vers l\'Agora',  
      to_world: 'Vers le monde', 
      to_island: 'Vers l\'île',
      army_cost: 'Coût de l\'armée',  
      fleet_cost: 'Coût de la flotte',  
      army_supply: 'Entretien de l\'armée',  
      fleet_supply: 'Entretien de la flotte',  
      research_cost: 'Coût de la recherche',   
      income: 'Revenu',  
      expenses: 'Dépense',  
      balances: 'Résultat',        
      espionage: 'Voir la cachette',  
      contracts: 'Afficher contrats',
      combat: 'Rapport de combats',  
      satisfaction: 'Satisfaction',  
      total_ : 'total',  
      max_Level : 'Niveau maximal',  
      actionP : 'Points d\'Action',  
      researchP : 'Points de recherche',  
      finances_ : 'Finances',  
      free_ground : 'emplacement(s) libre',  
      wood_ : 'Bois',  
      wine_ : 'Vin',  
      marble_ : 'Marbre',   
      crystal_ : 'Cristal',   
      sulphur_ : 'Soufre',      
      angry: 'furieux',  
      unhappy: 'malheureux',  
      neutral: 'neutre',  
      happy: 'heureux',  
      euphoric: 'euphorique',       
      housing_space: 'max. espace(s) de logement',  
      free_Citizens: 'Inactifs',  
      free_housing_space: 'Espace(s) de logement libre',  
      level_tavern: 'Niveaux taverne',  
      maximum: 'maximum',  
      used: 'disponible',
      plundergold: 'Or',	  
      garrision: 'Limite de garnison',  
      Sea: 'en mer',  
      Inland: 'à terre',        
      full: '0',
	  off: 'off',
      time_to_full: 'avant max.',  
      time_to_empty: 'restant',  
      capacity: 'Capacité',  
      safe: 'Sécurisé',     
      training: 'Entrainement',       
      plundering: 'Plundering',       
      constructing: 'Construction en cours',  
      next_Level: 'Nécessaire pour<br>le niveau',  
      transport: 'Transports',  
      loading: 'chargement',  
      en_route: 'en route',  
      arrived: 'arrivé',       
      to_town_hall: 'Vers l\'hôtel de ville',  
      to_saw_mill: 'Vers la scierie',  
      to_mine: 'Vers la mine',  
      to_barracks: 'Vers la caserne',  
      to_shipyard: 'Vers le chantier naval',  
      member: 'Liste des membres',  
      transporting: 'Transporter vers',  
      transporting_units: 'Deplacer des troupes vers',  
      transporting_fleets: 'Deplacer des navires vers',  
      today: 'aujourd\'hui',  
      tomorrow: 'demain',  
      yesterday: 'hier',  
      hour: 'h',  
      day: 'J',  
      week: 'S',  
      hour_long: 'Heure',  
      day_long: 'Jour',  
      week_long: 'Semaine',
      ika_world: 'Recherche Ikariam-World',
      charts: 'Afficher Graphiques',		  
      //settings  
      cityOrder : 'cityOrder',  
      fullArmyTable :  'Afficher toutes les unitées',  
      hideOnWorldView : 'Cacher en vue carte du monde',  
      hideOnIslandView : 'Cacher en vue d\'île',       
      hideOnCityView : 'Cacher en vue de ville',  
      onTop : 'Toujours au-dessus',  
      windowTennis : 'Afficher au passage de la souris',  
      autoUpdates : 'Mise à jour automatique',  
      smallFont : 'Utiliser une police plus petite',  
      alternativeBuildingList : 'Regrouper les batiments spéciaux par catégorie',
      compressedBuildingList : 'Use compressed building list', //
      wineOut : 'Disable Ambrosia feature "Out of Wine"', //
	  dailyBonus : 'Automatically confirm the daily bonus', //
  	  unnecessaryTexts : 'Removes unnecessary descriptions', //
	  ambrosiaPay : 'Deactivate new Ambrosia buying options', //
      wineWarningTime : 'Alerte sur conso de vin',  
      languageChange : 'Changer Langage',  
      current_Version : 'Version actuelle<b>:</b>',
	  ikariam_Version : 'Version Ikariam<b>:</b>',
      reset : 'Réinitialiser les réglages par défaut',  
      goto_website : 'Aller sur Userscripts.com website',  
      website : 'Website',   
      Check_for_updates : 'Forcer la mise à jour',  
      check : 'Vérifier les mises à jour',   
      Report_bug : 'Signaler un bug sur le script',  
      report : 'Rapport de bug',
      save : 'Save',
      save_settings : 'Save settings<b>!</b>&nbsp;',		  
      newsticker : 'Cacher ticker de nouvelles',
      event : 'Cacher les événements',
	  logInPopup : 'Hide the Info Window when login', //
      birdswarm : 'Cacher volée des oiseaux',
      hourlyRes : 'Cacher ressources horaires',
      onIkaLogs : 'Use IkaLog Battle Report Converter', //
      playerInfo : 'Show information about player', //
	  control: 'Hide Control center', //
	  alert: 'Please choose only one option!', //
	  alert_palace: 'Please visit your capital city first', //
	  alert_toast: 'Data Reset, reloading the page in a few seconds', //
	  alert_error: 'An error occurred while checking for updates: ', //
	  alert_noUpdate: 'No update is available for "', //
	  alert_update: 'There is an update available for the Greasemonkey script "', //
	  alert_update1: 'Would you like to go to the install page now?', //
	  alert_daily: 'Please enable \'Automatically confirm the daily bonus \'', //
      en : 'Anglais',  
      de : 'Allemand',  
      it : 'Italien',  
      el : 'Grecque',  
      es : 'Espagnol',  
      fr : 'Français',  
      ro : 'Roumain',
      ru : 'Russie',
	  cz : 'Tchèque',
      pl : 'Polonais',
      ar : 'Arabic',
      ir : 'Persan',
      pt : 'Portugais',
	  tr : 'Turc',
	  nl : 'Néerlandais',
      //settings descriptions  
      cityOrder_description : 'cityOrder_description',  
      fullArmyTable_description : 'Afficher toutes les unités possible dans l\'onglet armée',  
      hideOnWorldView_description : 'Cacher par défaut en vue carte du monde',  
      hideOnIslandView_description : 'Cacher par défaut en vue d\'île',  
      hideOnCityView_description : 'Cacher par défaut en vue de ville',  
      onTop_description : 'Afficher le tableau sur la fenêtre d\'ikariam',  
      windowTennis_description : 'Affiche le tableau au passage du pointeur<br>Ignoré avec option \'Toujours au-dessus\' coché',  
      autoUpdates_description : 'Activer mise à jour automatique<br>(toute les 24hrs)',  
      smallFont_description : 'Utiliser des caractères plus petits pour l\'affichage des données du tableau',  
      alternativeBuildingList_description : 'Regrouper les bâtiments spéciaux de collecte améliorée<br>et d\‘économie des ressources en fin de tableau',
      compressedBuildingList_description : 'Use condensed building table<br>Groups luxury resource production buildings<br>Groups palace/govenors residence', //
      wineOut_description : 'Disables the Ambrosia option to buy \'Out of Wine\'', //
	  dailyBonus_description : 'The daily bonus will be automatically confirmed<br>and the window is no longer displayed', //
	  unnecessaryTexts_description: 'Removes unnecessary descriptions in buildings,<br>the building list of buildings, minimize scrolling', //
	  ambrosiaPay_description : 'Disables the new Ambrosia buying options,<br>click on the button cancels the action', //
      wineWarningTime_description : 'Le temps restant affiché devient, \'rouge\' à partir de la valeur choisi',  
      languageChange_description : 'Changer la langue', //
      newsticker_description : 'Hide news ticker in the GF-toolbar', //
      event_description : 'Hide events under the advisers', //
      logInPopup_description : 'Hide the Info Window when login', //
      birdswarm_description : 'Hide the bird swarm in island and city view', //
      hourlyRes_description : 'Hide hourly resources in the infobar', //
      onIkaLogs_description : 'Utiliser IkaLogs pour vos rapports de combat',
      playerInfo_description : 'Afficher les informations des acteurs de la vue sur l\'île',
	  control_description: 'Hide the Control center in world, island and city view',
      // settings categories  
      visibility_category : '<b>Affichage du tableau</b>',  
      display_category : '<b>Options d\'affichage</b>',  
      global_category : '<b>Options globale</b>',  
      army_category : '<b>Réglages armée</b>',  
      building_category : '<b>Réglages bâtiments</b>',  
      resource_category : '<b>Réglages ressources</b>',  
      language_category : '<b>Choisir la langue</b>',  
      // Helptable  
      Initialize_Board : '<b>Initialisation du script</b>',  
      on_your_Town_Hall : 'sur un hôtel de ville et visite chaque ville avec cette vue ouverte',  
      on_the_Troops : 'sur l\'onglet \"Troupes dans la ville\" à gauche et visite chaque ville avec cette vue ouverte',  
      on_Museum : 'sur un musée et ensuite sur l\'onglet \"Distribuer les biens culturels\"',  
      on_Research_Advisor : 'sur le conseiller de recherche et clik sur les 4 domaines de recherche à gauche de l\'écran',  
      on_your_Palace : 'sur le Palais',  
      on_your_Finance : 'sur l\'onglet Finances',  
      on_the_Ambrosia : 'sur l\'onglet \"Ikariam PLUS\"',  
      Re_Order_Towns : '<b>Modifier l\'ordre des villes</b>',  
      Reset_Position : '<b>Reset Position</b>',  
      On_any_tab : 'Dans le tableau cliquez/déposez l\'icone de ressources à coté du nom <br>de la ville (une croix remplace le pointeur) pour modifier l\'ordre d\'affichage de vos villes',  
      Right_click : 'Faites un clik droit sur le bouton “Empire overview a gauche de l\'écran',
      Navigate : '1, 2, 3 ... 0, ), = <b>:&nbsp;&nbsp;</b> Rendez vous à la ville 1 jusqu\'à 12',  
      Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Affichez les onglets: Ressources/Bâtiments/Armée', // Setting/ Help tab
      Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Naviguez entre vos conseillers',  
      Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Naviguez vers les vues: Monde/Île/Ville',  
      Spacebar : 'Espace<b>:&nbsp;&nbsp;</b> Afficher/Cacher le tableau',  
      Hotkeys : '<b>Touches de raccourcis</b>',  
      // formatting  
      thousandSeperator : ',',  
      decimalPoint:'.',  
      click_:'<b>Clik</b>'        
        },
		ro:{                     // Thx corectsunt for Translation
      buildings: 'Clădiri',
	  economy: 'Economia',
	  military: 'Armata',
	  towns: 'Orașe',
	  academy_: 'Academia',
	  townhall_: 'Primăria',
	  dump_: 'SuperMagazie',
	  warehouse_: 'Magazie',
	  tavern_level: 'Nivelul Taraveneil',
	  corruption: 'Corupție',
	  cultural: 'Bunuri culturale',
	  population: 'Populația',
	  citizens: 'Cetățeni',
	  scientists: 'Cercetători',
	  scientists_max: 'nr. max. de Cercetători',
	  options: 'Opțiuni',
	  help: 'Ajutor',
	  agora: 'Către Agora',
	  to_world: 'Arată lumea', 
	  to_island: 'Arată insula',
	  army_cost: 'Costuri Fundamentale trupe',
	  fleet_cost: 'Costuri Fundamentale flotă',
	  army_supply: 'Costuri de aprovizionare trupe',
	  fleet_supply: 'Costuri de aprovizionare flotă',
	  research_cost: 'Costuri de cercetare', 
	  income: 'Venit',
	  expenses: 'Întreținere',
	  balances: 'Balanța',	  
      espionage: 'Vezi Ascunzătoarea',
	  contracts: 'Vezi Tratatele',
	  combat: 'Vezi Rapoartele de luptă',
	  satisfaction: 'Satisfacție',
      total_ : 'Total', 
      max_Level : 'Nivel maxim',
      actionP : 'Puncte de acțiune',
      researchP : 'Puncte de cercetare',
      finances_ : 'Finanțe',
      free_ground : 'Teren liber de construcție',
      wood_ : 'Lemn',
      wine_ : 'Vin',
      marble_ : 'Marmură',
      crystal_ : 'Cristal',
      sulphur_ : 'Sulf',  
	  angry: 'mânios',
	  unhappy: 'nefericit',
	  neutral: 'neutru',
	  happy: 'bucuros',
	  euphoric: 'euforic',	  
	  housing_space: 'Capacitate locuire',
	  free_Citizens: 'Cetățeni liberi',
	  free_housing_space: 'Capacitate locuire liberă',
	  level_tavern: 'Nivelul Taranevei',
	  maximum: 'maxim',
	  used: 'folosit',
      plundergold: 'Aur',	  
	  garrision: 'Limita garnizoanei',
	  Sea: 'Naval',
	  Inland: 'Terestru',		
      full: '0',
	  off: 'off',
      time_to_full: 'până la umplere',
      time_to_empty: 'până la golire',
      capacity: 'Capacitate',
      safe: 'În sig.',
      training: 'Unități programate<br>la antrenament',		
      plundering: 'Jefuire',		
      constructing: 'Extindere în curs',
	  next_Level: 'Necesar pentru<br>Nivelul',
      transport: 'Transport',
	  loading: 'încărcare',
	  en_route: 'în curs de desf.', 
	  arrived: 'sosire',	  
      to_town_hall: 'Către Primăria',
	  to_saw_mill: 'Către Pădure',
      to_mine: 'Către bunuri de lux',
      to_barracks: 'Către Cazarma',
      to_shipyard: 'Către Șantierul Naval',
      member: 'Vezi Lista Membrilor',
      transporting: 'Transport la',
      transporting_units: 'Deplasează armata la',
      transporting_fleets: 'Deplasează flota la',
	  today: 'astăzi',
	  tomorrow: 'mâine',
	  yesterday: 'ieri',
	  hour: 'h',
	  day: 'Z',
	  week: 'S',
	  hour_long: 'Ore',
	  day_long: 'Zile',
	  week_long: 'Săptămâni',
      ika_world: 'Caută Ikariam-World',
      charts: 'Vezi Grafice',	  
      //settings
      cityOrder : 'cityOrder',
      fullArmyTable : 'Arată toate unitățile militare',
      hideOnWorldView : 'Ascunde fereastra la vederea lumii',
      hideOnIslandView : 'Ascunde fereastra la vederea insulei',
      hideOnCityView : 'Ascunde fereastra la vederea orașului',
      onTop : 'Arată în fața ferestrei Ikariam',
      windowTennis : 'Arată fereasta în față la apropierea mouse-ului',
      autoUpdates : 'Verifică actualizările automat',
      smallFont : 'Utilizați caractere mai mici',
      alternativeBuildingList : 'Utilizați lista alternativă de construcții',
      compressedBuildingList : 'Use compressed building list', //
      wineOut : 'Disable Ambrosia feature "Out of Wine"', //
	  dailyBonus : 'Automatically confirm the daily bonus', //
  	  unnecessaryTexts : 'Removes unnecessary descriptions', //
	  ambrosiaPay : 'Deactivate new Ambrosia buying options', //
      wineWarningTime : 'Avertizare vin rămas',
      languageChange : 'Schimbă Limba',
      current_Version : 'Versiunea curentă:',
	  ikariam_Version : 'Versiunea Ikariam<b>:</b>',
      reset : 'Resetați toate setările la valorile implicite',
      goto_website : 'Dute la site-ul scrip-ului Userscripts.com',
      website : 'Website',
      Check_for_updates : 'Forțează verificarea de actualizări',
      check : 'Verificați dacă există actualizări',
      Report_bug : 'Raportează o eroare în script',
      report : 'Raportează Eroare',
      save : 'Save', //
      save_settings : 'Save settings<b>!</b>&nbsp;', //  
      newsticker : 'Hide news ticker', //
      event : 'Hide events', //
	  logInPopup : 'Hide the Info Window when login', //
      birdswarm : 'Hide the bird swarm', //
      hourlyRes : 'Hide hourly resources', //
      onIkaLogs : 'Use IkaLog Battle Report Converter', //
      playerInfo : 'Show information about player', //
	  control: 'Hide Control center', //
	  alert: 'Please choose only one option!', //
	  alert_palace: 'Please visit your capital city first', //
	  alert_toast: 'Data Reset, reloading the page in a few seconds', //
	  alert_error: 'An error occurred while checking for updates: ', //
	  alert_noUpdate: 'No update is available for "', //
	  alert_update: 'There is an update available for the Greasemonkey script "', //
	  alert_update1: 'Would you like to go to the install page now?', //
	  alert_daily: 'Please enable \'Automatically confirm the daily bonus \'', //
      en : 'Engleză',
      de : 'Germană',
      it : 'Italiană',
      el : 'Greacă',
      es : 'Spaniolă',
      fr : 'Franceză',
      ro : 'Română',
      ru : 'Rusă',
	  cz : 'Cehă',
      pl : 'Polonez',
      ar : 'Arabă',	
      ir : 'Persană',
      pt : 'Portugheză',
	  tr : 'Turcă',
	  nl : 'Olandez',
      //settings descriptions
      cityOrder_description : 'cityOrder_description',
      fullArmyTable_description : 'Arată toate unitățile militare posibile în fila Armatei',
      hideOnWorldView_description : 'Ascunde în mod implicit tabla pe vederea asupra lumii',
      hideOnIslandView_description : 'Ascunde în mod implicit tabla pe vederea asupra insulei',
      hideOnCityView_description : 'Ascunde în mod implicit tabla pe vederea asupra orașului',
      onTop_description : 'Arată tabla înaintea (în prim-plan) ferestrei Ikariam',
      windowTennis_description : 'Aduce tabla înintea (în prim-plan) ferestrei Ikariam prin apropierea cu mouse-ului<br>Trimite în spatele fereastrei Ikariam la depărtarea mouse-ului<br>Ignoră opțiunea “înainte” (prim-plan)',
      autoUpdates_description : 'Permite verificarea de actualizare automată<br>(O dată la fiecare 24 de ore)',
      smallFont_description : 'Utilizați un font mai mic pentru datele din tabele',
      alternativeBuildingList_description : 'Utilizați tabelul de clădiri alternativ',
      compressedBuildingList_description : 'Use condensed building table<br>Groups luxury resource production buildings<br>Groups palace/govenors residence', //
      wineOut_description : 'Disables the Ambrosia option to buy \'Out of Wine\'', //
	  dailyBonus_description : 'The daily bonus will be automatically confirmed<br>and the window is no longer displayed', //
	  unnecessaryTexts_description: 'Removes unnecessary descriptions in buildings,<br>the building list of buildings, minimize scrolling', //
	  ambrosiaPay_description : 'Disables the new Ambrosia buying options,<br>click on the button cancels the action', //
      wineWarningTime_description : 'Timpul în care a mai rămas devine \'roșu\' în acest punct',
      languageChange_description : 'Schimbă Limba',
      newsticker_description : 'Hide news ticker in the GF-toolbar', //
      event_description : 'Hide events under the advisers', //
      logInPopup_description : 'Hide the Info Window when login', //
      birdswarm_description : 'Hide the bird swarm in island and city view', //
      hourlyRes_description : 'Hide hourly resources in the infobar', //
      onIkaLogs_description : 'use IkaLogs for your battle reports', //
      playerInfo_description : 'View information from the players in the island view', //
	  control_description: 'Hide the Control center in world, island and city view', //
      // settings categories
      visibility_category : '<b>Vizibilitatea tablei</b>',
      display_category : '<b>Setări afișaj</b>',
      global_category : '<b>Setări globale</b>',
      army_category : '<b>Setări ale armatei</b>',
      building_category : '<b>Setări de construcții</b>',
      resource_category : '<b>Setări de resurse</b>',
	  language_category : '<b>Setări de limbă</b>',
      // Helptable
      Initialize_Board : '<b>Inițializare tablă (script)</b>',
	  on_your_Town_Hall : 'pe Primărie și trecere prin fiecare oraș cu acest punct de vedere de deschidere',
	  on_the_Troops : 'pe \"Trupele aflate in oras\" fila de pe partea stângă și du-te prin fiecare oraș cu acest punct de vedere de deschidere',
	  on_Museum : 'pe Muzeu și apoi pe fila \"Distribuirea bunurilor culturale\"',
	  on_Research_Advisor : 'pe \"Îndrumătorul\" în cercetare și apoi faceți click pe fiecare din cele 4 file de cercetare în fereastra din stânga (\"Câmpul cercetării\")',
	  on_your_Palace : 'pe Palatul tău',
	  on_your_Finance : 'pe fila Finanțe',
	  on_the_Ambrosia : 'pe \"Ikariam PLUS\"',
	  Re_Order_Towns : '<b>Reordonare Orașe</b>',
	  Reset_Position : '<b>Resetează Pozițiile</b>',
	  On_any_tab : 'Pe orice filă, trageți pictograma de resurse din partea stângă a numelui orașului',
	  Right_click : 'Faceți click dreapta pe butonul din meniul imperiului în meniul din partea stângă a paginii',
	  Navigate : '1, 2, 3 ... 0, -, = <b>:&nbsp;&nbsp;</b> Navigați la orașe cu 1 la 12',
	  Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Navigați la fila de Economia/Clădiri/Armata', // Setting/ Help tab
	  Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Navigați la consilierele Orașe/Armata/Cercetare/Diplomație',
	  Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Navigați la vizualizarea lumii/insulei/orașului',
	  Spacebar : 'Bara de spațiu<b>:&nbsp;&nbsp;</b> Minimizare/Maximizare tablă',
	  Hotkeys : '<b>Taste</b>',
      // formatting
      thousandSeperator : ',',
      decimalPoint:'.',
      click_:'<b>Click</b>'		
		},
		ru:{                     // Thx Toxa13 for Translation
      buildings: 'Здания',  
	  economy: 'Экономика',  
      military: 'Войска',  
      towns: 'Города',  
      academy_: 'Академия',  
      townhall_: 'Ратуша',  
      dump_: 'Хранилище',  
      warehouse_: 'Склад',  
      tavern_level: 'Уровень таверны',  
      corruption: 'Коррупция',  
      cultural: 'Культурные ценности',  
      population: 'Население',  
      citizens: 'Жители',  
      scientists: 'Ученых',  
      scientists_max: 'max. Ученых',  
      options: 'Опции',  
      help: 'Справка',  
      agora: 'к Агора',  
      to_world: 'Смотреть Мир',   
      to_island: 'Смотреть остров',  
      army_cost: 'Содержание Армии',  
      fleet_cost: 'Содержание Флота',  
      army_supply: 'Снабжение Армии',  
      fleet_supply: 'Снабжение Флота',  
      research_cost: 'Затраты на исследования',   
      income: 'Доход',  
      expenses: 'Расходы',  
      balances: 'Баланс',  
      espionage: 'Отчет шпионов',  
      contracts: 'Смотреть контракты',  
      combat: 'Боевые доклады',  
      satisfaction: 'Удовлетворенность',  
      total_ : 'Всего',  
      max_Level : 'max. Уровень',  
      actionP : 'Очки действий',  
      researchP : 'Очки исследований',  
      finances_ : 'Финансы',  
      free_ground : 'Свободно участков под строительство',   
      wood_ : 'Строительный материал',  
      wine_ : 'Вино',  
      marble_ : 'Мрамор',   
      crystal_ : 'Кристаллы',   
      sulphur_ : 'Сера',        
      angry: 'сердитый',  
      unhappy: 'несчастный',  
      neutral: 'нейтральный',  
      happy: 'счастье',  
      euphoric: 'эйфория',       
      housing_space: 'макс. Жилая площадь',  
      free_Citizens: 'Свободных жителей',  
      free_housing_space: 'свободная жилая площадь',  
      level_tavern: 'Уровень таверны',  
      maximum: 'максимум',  
      used: 'использовано',
      plundergold: 'Золото',	  
      garrision: 'Лимит гарнизона',  
      Sea: 'Флот',  
      Inland: 'Войска',         
      full: '0',
	  off: 'off',
      time_to_full: 'до полноты',  
      time_to_empty: 'до пустоты',  
      capacity: 'Вместимость',  
      safe: 'Застраховано',   
      training: 'Подготовка',       
      plundering: 'Грабеж',         
      constructing: 'Процесс улучшения',  
      next_Level: 'Необходимо для<br>уровня',  
      transport: 'Транспорт',  
      loading: 'загрузка',  
      en_route: 'в пути',  
      arrived: 'прибыль',  
      to_town_hall: 'к Ратуше',  
      to_saw_mill: 'к Лесопилке',  
      to_mine: 'к Руднику',  
      to_barracks: 'в Казармы',  
      to_shipyard: 'к Верфи',  
      member: 'Смотреть список',  
      transporting: 'Транспортировать в',  
      transporting_units: 'Переместить войска в',  
      transporting_fleets: 'Транспортировать флот в',  
      today: 'сегодня',  
      tomorrow: 'завтра',  
      yesterday: 'вчера',  
      hour: 'ч',  
      day: 'д',  
      week: 'н',  
      hour_long: 'Час',  
      day_long: 'День',  
      week_long: 'Неделя',
      ika_world: 'Поиск Ikariam-World',
      charts: 'Просматривать графики',      
      //settings  
      cityOrder : 'cityOrder',  
      fullArmyTable :  'Показать все войска',  
      hideOnWorldView : 'Скрывать таблицу на карте Мира',  
      hideOnIslandView : 'Скрывать таблицу на карте Острова',      
      hideOnCityView : 'Скрывать таблицу при переходе в Город',  
      onTop : 'Показывать всегда сверху',  
      windowTennis : 'Показывать при наведении курсора мыши',  
      autoUpdates : 'Автоматически проверять наличие обновлений',  
      smallFont : 'Использовать меньший размер шрифта',  
      alternativeBuildingList : 'Использовать альтернативный список зданий',
      compressedBuildingList : 'Use compressed building list', //
      wineOut : 'Disable Ambrosia feature "Out of Wine"', //
	  dailyBonus : 'Automatically confirm the daily bonus', //
  	  unnecessaryTexts : 'Removes unnecessary descriptions', //
	  ambrosiaPay : 'Deactivate new Ambrosia buying options', //
      wineWarningTime : 'Предупреждение об остатке вина',  
      languageChange : 'Изменить язык',  
      current_Version : 'Текущая версия<b>:</b>',
	  ikariam_Version : 'Ikariam Version<b>:</b>', //
      reset : 'Сбросить все настройки по умолчанию',  
      goto_website : 'Перейти на сайт скрипта',  
      website : 'Вебсайт',   
      Check_for_updates : 'Принудительная проверка обновления',  
      check : 'Проверить обновления',   
      Report_bug : 'Сообщить об ошибке скрипта',  
      report : 'Сообщить об ошибке',
      save : 'Cохранить',
      save_settings : 'Save settings<b>!</b>&nbsp;',		  
      newsticker : 'Скрывать лентy новостeй',
      event : 'Скрывать события',
	  logInPopup : 'Hide the Info Window when login', //
      birdswarm : 'Скрывать стаю птиц',
      hourlyRes : 'Скрывать почасовые ресурсы',
      onIkaLogs : 'Использовать IkaLog конвертер отчет битвы',
      playerInfo : 'Показать информацию об игроке',
	  control: 'Скрывать центр контроля',
	  alert: 'Please choose only one option!', //
	  alert_palace: 'Please visit your capital city first', //
	  alert_toast: 'Data Reset, reloading the page in a few seconds', //
	  alert_error: 'An error occurred while checking for updates: ', //
	  alert_noUpdate: 'No update is available for "', //
	  alert_update: 'There is an update available for the Greasemonkey script "', //
	  alert_update1: 'Would you like to go to the install page now?', //
	  alert_daily: 'Please enable \'Automatically confirm the daily bonus \'', //
      en : 'Английский',  
      de : 'Немецкий',  
      it : 'Итальянский',  
      el : 'Греческий',  
      es : 'Испанский',  
      fr : 'Французский',  
      ro : 'Румынский',  
      ru : 'Русский',
	  cz : 'Чешский',
      pl : 'Польский',
      ar : 'Aрабский',
      ir : 'Персидский',
      pt : 'Португальский',
	  tr : 'Tурецкий',
	  nl : 'Голландский',
      //settings descriptions  
      cityOrder_description : 'cityOrder_description',  
      fullArmyTable_description : 'Показать все возможное, армейских подразделений на вкладке Армии',  
      hideOnWorldView_description : 'Скрыть, по умолчанию, на карте Мира',  
      hideOnIslandView_description : 'Скрыть, по умолчанию, на карте Острова',  
      hideOnCityView_description : 'Скрыть, по умолчанию, при переходе в город',  
      onTop_description : 'Таблица сверху всех Икариам окон',  
      windowTennis_description : 'Открывается то окно<br>на которое наведен курсор мыши',  
      autoUpdates_description : 'Включить автоматическую проверку обновлений<br>(каждые 24 часа)',  
      smallFont_description : 'Используйте меньший шрифт для данных таблицы',  
      alternativeBuildingList_description : 'Использовать альтернативную таблицу зданий',
      compressedBuildingList_description : 'Use condensed building table<br>Groups luxury resource production buildings<br>Groups palace/govenors residence', //
      wineOut_description : 'Disables the Ambrosia option to buy \'Out of Wine\'', //
	  dailyBonus_description : 'The daily bonus will be automatically confirmed<br>and the window is no longer displayed', //
	  unnecessaryTexts_description: 'Removes unnecessary descriptions in buildings,<br>the building list of buildings, minimize scrolling', //
	  ambrosiaPay_description : 'Disables the new Ambrosia buying options,<br>click on the button cancels the action', //
      wineWarningTime_description : 'Предупреждение об остатке вина, \'красный\' по умолчанию',  
      languageChange_description : 'Изменение языка',
      newsticker_description : 'Hide news ticker in the GF-toolbar', //
      event_description : 'Hide events under the advisers', //
      logInPopup_description : 'Hide the Info Window when login', //
      birdswarm_description : 'Hide the bird swarm in island and city view', //
      hourlyRes_description : 'Hide hourly resources in the infobar', //
      onIkaLogs_description : 'use IkaLogs for your battle reports', //
      playerInfo_description : 'View information from the players in the island view', //
	  control_description: 'Hide the Control center in world, island and city view', //
      // settings categories  
      visibility_category : '<b>Настройка отображения во вкладках</b>',  
      display_category : '<b>Настройка вида</b>',  
      global_category : '<b>Глобальные настройки</b>',  
      army_category : '<b>Настройка отображения войск</b>',  
      building_category : '<b>Настройка отображения зданий</b>',  
      resource_category : '<b>Настройка ресурсов</b>',  
      language_category : '<b>Настройки языка</b>',  
      // Helptable  
      Initialize_Board : '<b>Для начала использования таблицы</b>',  
      on_your_Town_Hall : 'Откройте "Ратуша" и при открытой вкладке пройдите по всем городам',  
      on_the_Troops : 'Откройте вкладку "Войска в городе" (на панели слева) и пройдите по всем городам',  
      on_Museum : 'Откройте "Музей" затем нажмите на вкладку "Распределить культурные ценности"',  
      on_Research_Advisor : 'Откройте "Научный обзор" (Исследования) и пройдите по всем 4 областям исследований',  
      on_your_Palace : 'Откройте "Дворец"',  
      on_your_Finance : 'Откройте "Баланс"',  
      on_the_Ambrosia : 'Откройте "shop" Магазин Амброзии',  
      Re_Order_Towns : '<b>Настройка последовательности отображения городов в таблице</b>',  
      Reset_Position : '<b>Начальное положение таблицы</b>',  
      On_any_tab : 'Открыв любую вкладку, перетащите значок ресурса слева от названия города',  
      Right_click : 'Щелкните правой кнопкой мыши на кнопке "Империя" на панели с левой стороны страницы',  
      Navigate : '1, 2, 3 ... 0, -, = <b>:&nbsp;&nbsp;</b> Перемещение по городам с 1 до 12',  
      Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Перемещение в городе/ Экономика/ Здания/ Войска', // Setting/ Help tab
      Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Перемещение/ Города/ Войска/ Исследования/ Дипломатия',  
      Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Перемещение к Мир/ Остров/ Город',  
      Spacebar : 'Пробел<b>:&nbsp;&nbsp;</b> таблицы Открыть/ Закрыть в разделах',  
      Hotkeys : '<b>Быстрые клавиши</b>',  
      // formatting  
      thousandSeperator : ',',  
      decimalPoint:'.',  
      click_:'<b>Нажать</b>' 	
	    },
		cz:{                     // Thx Ikariam CZ for Translation
      buildings: 'Budovy',
	  economy: 'Ekonomika',
	  military: 'Armáda',
	  towns: 'Města',
	  academy_: 'Akademie',
	  townhall_: 'Městská radnice',
	  dump_: 'Halda',
	  warehouse_: 'Sklad',
	  tavern_level: 'Úroveň hostince',
	  corruption: 'Korupce',
	  cultural: 'Kulturní zboží',
	  population: 'Obyvatelstvo',
	  citizens: 'Obyvatelé',
	  scientists: 'Vědci',
	  scientists_max: 'max. vědců',
	  options: 'Nastavení',
	  help: 'Nápověda',
	  agora: 'do Agory',
	  to_world: 'Zobrazit svět', 
	  to_island: 'Zobrazit ostrov',
	  army_cost: 'Údržba armády',
	  fleet_cost: 'Údržba flotily',
	  army_supply: 'Cestovní náklady armády',
	  fleet_supply: 'Cestovní náklady flotily',
	  research_cost: 'Náklady na výzkum', 
	  income: 'Příjem',
	  expenses: 'Náklady',
	  balances: 'Zůstatek',
      espionage: 'Zobrazit úkryt',
	  contracts: 'Zobrazit dohody',
	  combat: 'Zobrazit bitevní zprávy',
	  satisfaction: 'Spokojenost',
      total_ : 'Celkem',
      max_Level : 'max. úroveň',
      actionP : 'Akční body',
      researchP : 'Výzkumné body',
      finances_ : 'Rozpočet',
      free_ground : 'Volná stavební plocha', 
      wood_ : 'Stavební materiál',
      wine_ : 'Víno',
      marble_ : 'Mramor', 
      crystal_ : 'Krystalické sklo', 
      sulphur_ : 'Síra',	  
	  angry: 'zlost',
	  unhappy: 'neštěstí',
	  neutral: 'neutrální',
	  happy: 'štěstí',
	  euphoric: 'eufórie',	  
	  housing_space: 'max. ubytovací kapacita',
	  free_Citizens: 'Volní obyvatelé',
	  free_housing_space: 'Volná ubytovací kapacita',
	  level_tavern: 'Úroveň hostince',
	  maximum: 'maximum',
	  used: 'zaplněno',
      plundergold: 'Zlato',	  
	  garrision: 'Limit posádky',
	  Sea: 'Námořní',
	  Inland: 'Pozemní',		
      full: '0',
	  off: 'off',
      time_to_full: 'do zaplnění',
      time_to_empty: 'do vyprázdnění',
      capacity: 'Kapacita',
      safe: 'Bezpečné',	
      training: 've výcviku',		
      plundering: 'Drancování',		
      constructing: 'Probíhá rozšiřování',
	  next_Level: 'Potřeba pro úroveň',
      transport: 'Transporty',
	  loading: 'nakládání',
	  en_route: 'na cestě',
	  arrived: 'dorazil',
      to_town_hall: 'do městské radnice',
	  to_saw_mill: 'do pily',
      to_mine: 'do dolu',
      to_barracks: 'do kasáren',
      to_shipyard: 'do loděnice',
      member: 'Zobrazit seznam členů aliance',
      transporting: 'Přepravit do',
      transporting_units: 'Přesunout jednotky do',
      transporting_fleets: 'Přesunout flotilu do',
	  today: 'dnes',
	  tomorrow: 'zítra',
	  yesterday: 'včera',
	  hour: 'h',
	  day: 'D',
	  week: 'T',
	  hour_long: 'Hodina',
	  day_long: 'Den',
	  week_long: 'Týden',
      ika_world: 'Hledat Ikariam-World',
      charts: 'Zobrazení diagramů', 	  
      //settings
      cityOrder : 'Řazení měst',
      fullArmyTable :  'Zobrazit všechny vojenské jednotky',
      hideOnWorldView : 'Skrýt na zobrazení světa',
      hideOnIslandView : 'Skrýt na zobrazení ostrova',	  
      hideOnCityView : 'Skrýt na zobrazení města',
      onTop : 'Zobrazit vždy nahoře nad ostatními Ikariam okny',
      windowTennis : 'Zobrazit vždy nahoře nad ostatními Ikariam okny při najetí myši',
      autoUpdates : 'Automaticky kontroluj aktualizace',
      smallFont : 'Použít menší velikost písma',
      alternativeBuildingList : 'Použít jiné zobrazení budov',
      compressedBuildingList : 'Použít stlačený přehled budov',
      wineOut : 'Disable Ambrosia feature "Out of Wine"', //
	  dailyBonus : 'Automaticky potvrzovat denní bonus',
  	  unnecessaryTexts : 'Odstranit nepotřebné popisy',
	  ambrosiaPay : 'Zakázat možnost nákupu surovin za Ambrozie',
      wineWarningTime : 'Upozornění na zbývající víno',
      languageChange : 'Změnit jazyk',
	  current_Version : 'Aktuální verze<b>:</b>',
	  ikariam_Version : 'Ikariam verze<b>:</b>',
	  reset : 'Resetovat všechna nastavení',
	  goto_website : 'Jít na webové stránky skriptů Userscripts.com',
	  website : 'Webové stránky', 
      Check_for_updates : 'Zkontroluje dostupné aktualizace',
      check : 'Zkontrolovat aktualizace', 
      Report_bug : 'Nahlásit chybu ve skriptu',
      report : 'Nahlásit chybu',
      save : 'Uložit',
      save_settings : 'Uložit nastavení<b>!</b>&nbsp;',		  
      newsticker : 'Skrýt odkaz na novinky',
	  event : 'Skrýt akce',
	  logInPopup : 'Skrýt informační okno při přihlášení',
	  birdswarm : 'Skrýt animace letu ptáků',
	  hourlyRes : 'Skrýt hodinovou produkci / spotřebu surovin',
	  onIkaLogs : 'Použít IkaLog Battle Report Converter',
	  playerInfo : 'Zobrazit informace o hráči',
	  control: 'Skrýt ovládací panel',
	  alert: ' Zvolte prosím pouze jednu možnost!',
	  alert_palace: 'Navštivte prosím své hlavní město jako první',
	  alert_toast: 'Resetování dat, znovunačtení stránky proběhne během několika vteřin',
	  alert_error: ' Při kontrole aktualizací došlo k chybě: ',
	  alert_noUpdate: ' Žádné aktualizace k dispozici pro "',
	  alert_update: 'K dispozici jsou aktualizace pro Greasemonkey skript "',
	  alert_update1: ' Chcete jít nyní na stránku s instalací?',
	  alert_daily: 'Please enable \'Automatically confirm the daily bonus \'', //
      en : 'Anglicky',
      de : 'Německy',
      it : 'Italsky',
      el : 'Řecky',
      es : 'Španělsky',
      fr : 'Francouzsky',
	  ro : 'Rumunsky',
	  ru : 'Rusky',
	  cz : 'Česky',
      pl : 'Polsky',
      ar : 'Arabsky',
      ir : 'Persky',
      pt : 'Portugalsky',
	  tr : 'Turecky',
	  nl : 'Holandsky',
      //settings descriptions
      cityOrder_description : 'cityOrder_description',
      fullArmyTable_description : 'Zobrazí všechny možné jednotky v Armádním přehledu',
	  hideOnWorldView_description : 'Skryje přehled na zobrazení světa',
      hideOnIslandView_description : 'Skryje přehled na zobrazení ostrova',
      hideOnCityView_description : 'Skryje přehled na zobrazení města',
      onTop_description : 'Zobrazí přehled vždy nahoře nad ostatními Ikariam okny',
      windowTennis_description : 'Zobrazí přehled vždy nahoře nad ostatními Ikariam okny při najetí myši',
      autoUpdates_description : 'Povolí automatickou kontrolu aktualizace<br>(jednou za 24 hodin)',
      smallFont_description : 'Použije menší velikost písma pro data v přehledu',
      alternativeBuildingList_description : 'Seřadí budovy na produkci a snížení spotřeby v jiném pořadí',
      compressedBuildingList_description : 'Použije zúžený přehled budov<br>Seskupí budovy na produkci luxusních surovin<br>Seskupí Palác / Guvernérovu rezidenci',
      wineOut_description : 'Disables the Ambrosia option to buy \'Out of Wine\'', //
	  dailyBonus_description : 'Denní bonus bude automaticky potvrzován<br>a okno se již nebude zobrazovat',
	  unnecessaryTexts_description: 'Odstraní nepotřebné popisy v budovách a<br>v seznamu budov na prázdné stavební ploše, minimalizuje rolování',
	  ambrosiaPay_description : 'Znemožní nákup surovin za Ambrozie,<br>kliknutí na tlačítko akci zruší',
      wineWarningTime_description : 'Docházení vína bude zobrazeno \‘červeně\’ při tomto času',
      languageChange_description : 'Změnit jazyk',
      newsticker_description : 'Skryje odkaz na novinky v horním panelu nabídek',
	  event_description : 'Skryje nabídky a akce při přihlášení a pod poradci města',
      logInPopup_description : 'Skryje informační okno při přihlášení', //, okno “denní bonus” bude i nadále aktivní
	  birdswarm_description : 'Skryje animanice letu ptáků na přehledu ostrova a města',
	  hourlyRes_description : 'Skryje hodinovou produkci / spotřebu surovin pod panelem surovin',
	  onIkaLogs_description : 'Použije IkaLogs pro tvé bitevní zprávy',
	  playerInfo_description : 'Zobrazí informace o hráči na přehledu ostrova',
	  control_description: 'Skryje dolní lištu s ovládacím panelem na pohledu světa, ostrova a města',
      // settings categories
      visibility_category : '<b>Zobrazení přehledu</b>',
      display_category : '<b>Nastavení zobrazení</b>',
      global_category : '<b>Globální nastavení</b>',
      army_category : '<b>Armáda</b>',
      building_category : '<b>Budovy</b>',
      resource_category : '<b>Nastavení surovin</b>',
	  language_category : '<b>Jazyk</b>',
      // Helptable
      Initialize_Board : '<b>Nastavení počátečních hodnot v přehledu</b>',
	  on_your_Town_Hall : 'na Městskou radnici a postupně projdi každé město s tímto otevřeným oknem',
	  on_the_Troops : 'na záložku \“Vojáci ve městě\” na levé straně a postupně projdi každé město s tímto otevřeným oknem',
	  on_Museum : 'na Muzeum a pak na záložku \“Rozdělit kulturní zboží\” ',
	  on_Research_Advisor : 'na Vědeckého poradce a v něm na všechny 4 oblasti výzkumu na levé straně',
	  on_your_Palace : 'na tvůj Palác',
	  on_your_Finance : 'na tvůj Rozpočet',
	  on_the_Ambrosia : 'na \“Ikariam plus\”',
	  Re_Order_Towns : '<b>Změna pořadí měst</b>',
	  Reset_Position : '<b>Obnovit umístění</b>',
	  On_any_tab : 'Na libovolné záložce můžete města přesouvat pomocí ikony suroviny vlevo od názvu města',
	  Right_click : 'Kliknutím pravým tlačítkem na záložku Empire Overview na levém menu obnovíte umístění přehledu na jeho základní pozici',
	  Navigate : '1, 2, 3 ... 0, =, ) <b>:&nbsp;&nbsp;</b> Přepne na město 1 až 12',
	  Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Přepne na záložku Ekonomika/ Budovy/ Armáda', // Setting/ Help tab
	  Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Přepne na poradce Města/ Armáda/ Výzkum/ Diplomacie',
	  Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Přepne na náhled Světa/ Ostrova/ Města',
	  Spacebar : 'Spacebar<b>:&nbsp;&nbsp;</b> Mezerník: Otevře / zavře přehled',
	  Hotkeys : '<b>Klávesové zkratky</b>',
      // formatting
      thousandSeperator : ',',
      decimalPoint:'.',
      click_:'<b>Klikni</b>'		
		},
		pl:{                     // Thx Komandos for Translation
      buildings: 'Budynki',  
      economy: 'Ekonomia',  
      military: 'Wojsko',  
      towns: 'Miasta',  
      academy_: 'Akademia',  
      townhall_: 'Ratusz',  
      dump_: 'Składowisko',  
      warehouse_: 'Magazyn',  
      tavern_level: 'Poziom tawerny',  
      corruption: 'Korupcja',  
      cultural: 'Dobra kulturowe',  
      population: 'Populacja',  
      citizens: 'Mieszkańcy',  
      scientists: 'Naukowcy',  
      scientists_max: 'Maks. naukowców',  
      options: 'Opcje',  
      help: 'Pomoc',  
      agora: 'Agora',  
      to_world: 'Pokaż świat',   
      to_island: 'Pokaż wyspę',  
      army_cost: 'Koszt armii',  
      fleet_cost: 'Koszt floty',  
      army_supply: 'Zaopatrzenie armii',  
      fleet_supply: 'Zaopatrzenie floty',  
      research_cost: 'Koszt badań',   
      income: 'Przychód',  
      expenses: 'Wydatki',  
      balances: 'Bilans',  
      espionage: 'Kryjówka',  
      contracts: 'Traktaty',  
      combat: 'Raporty wojenne',  
      satisfaction: 'Zadowolenie',  
      total_ : 'Suma',  
      max_Level : 'Maks. poziom',  
      actionP : 'Punkty akcji',  
      researchP : 'Punkty badań',  
      finances_ : 'Finanse',  
      free_ground : 'wolne parcele',   
      wood_ : 'Materiał budowlany',  
      wine_ : 'Wino',  
      marble_ : 'Marmur',   
      crystal_ : 'Kryształ',   
      sulphur_ : 'Siarka',      
      angry: 'zły',  
      unhappy: 'nieszczęśliwy',  
      neutral: 'neutralny',  
      happy: 'szczęśliwy',  
      euphoric: 'euforia',      
      housing_space: 'Maks. ilość mieszkańców',  
      free_Citizens: 'Niepracujący mieszkańcy',  
      free_housing_space: 'Ilość wolnych miejsc',  
      level_tavern: 'Poziom tawerny',  
      maximum: 'maksymalnie',  
      used: 'aktualnie',  
      plundergold: 'Złoto',        
      garrision: 'Limit garnizonu',  
      Sea: 'Morskie',  
      Inland: 'Lądowe',          
      full: '0',
	  off: 'off',
      time_to_full: 'do pełna',  
      time_to_empty: 'do wyczerpania',  
      capacity: 'Pojemność',  
      safe: 'Bezpieczne',     
      training: 'Trening',        
      plundering: 'Plądrowanie',         
      constructing: 'Trwa rozbudowa',  
      next_Level: 'Wymagane do poziomu',  
      transport: 'Transporty',  
      loading: 'ładowanie',  
      en_route: 'w drodze',  
      arrived: 'przybycie',  
      to_town_hall: 'Otwórz ratusz w',  
      to_saw_mill: 'Otwórz tartak',  
      to_mine: 'Otwórz kopalnię',  
      to_barracks: 'Otwórz koszary w',  
      to_shipyard: 'Otwórz sztocznię w',  
      member: 'Sojusznicy',  
      transporting: 'Transportuj do',  
      transporting_units: 'Przemieść armię do',  
      transporting_fleets: 'Przemieść flotę do',  
      today: 'dziś',  
      tomorrow: 'jutro',  
      yesterday: 'wczoraj',  
      hour: 'g',  
      day: 'd',  
      week: 'T',  
      hour_long: 'godzin',  
      day_long: 'dni',  
      week_long: 'tygodni',
      ika_world: 'Szukaj Ikariam-World',
      charts: 'Zobacz wykresy',
      //settings  
      cityOrder : 'cityOrder',  
      fullArmyTable :  'Pokaż wszystkie jednostki',  
      hideOnWorldView : 'Ukryj w podglądzie świata',  
      hideOnIslandView : 'Ukryh w podglądzie wyspy',       
      hideOnCityView : 'Ukryj w podglądzie miasta',  
      onTop : 'Zawsze na wierzchu',  
      windowTennis : 'Przesuń na wierzch po najechaniu myszą',  
      autoUpdates : 'Automatyczne sprawdzanie aktualizacji',  
      smallFont : 'Użyj mniejszej czcionki',  
      alternativeBuildingList : 'Użyj alternatywnej listy budynków',
      compressedBuildingList : 'Use compressed building list', //
      wineOut : 'Disable Ambrosia feature "Out of Wine"', //
	  dailyBonus : 'Automatically confirm the daily bonus', //
  	  unnecessaryTexts : 'Removes unnecessary descriptions', //
	  ambrosiaPay : 'Deactivate new Ambrosia buying options', //
      wineWarningTime : 'Ostrzeżenie o kończącym się winie',  
      languageChange : 'Zmień język',  
      current_Version : 'Bieżąca wersja<b>:</b>',
	  ikariam_Version : 'Ikariam Version<b>:</b>', //
      reset : 'Przywróć ustawienia domyślne',  
      goto_website : 'Idź do Userscripts.com website',  
      website : 'Website',   
      Check_for_updates : 'Sprawdź aktualizację',  
      check : 'Sprawdź aktualizację',   
      Report_bug : 'Zgłoszenia błędów',  
      report : 'Zgłoś błąd',
      save : 'Save', //
      save_settings : 'Save settings<b>!</b>&nbsp;', //	  
      newsticker : 'Hide news ticker', //
      event : 'Hide events', //
	  logInPopup : 'Hide the Info Window when login', //
      birdswarm : 'Ukryj ptaki',
      hourlyRes : 'Hide hourly resources', //
      onIkaLogs : 'Use IkaLog Battle Report Converter', //
      playerInfo : 'Show information about player', //
	  control: 'Hide Control center', //
	  alert: 'Please choose only one option!', //
	  alert_palace: 'Please visit your capital city first', //
	  alert_toast: 'Data Reset, reloading the page in a few seconds', //
	  alert_error: 'An error occurred while checking for updates: ', //
	  alert_noUpdate: 'No update is available for "', //
	  alert_update: 'There is an update available for the Greasemonkey script "', //
	  alert_update1: 'Would you like to go to the install page now?', //
	  alert_daily: 'Please enable \'Automatically confirm the daily bonus \'', //
      en : 'Angielski',  
      de : 'Niemiecki',  
      it : 'Włoski',  
      el : 'Grecki',  
      es : 'Hiszpański',  
      fr : 'Francuski',  
      ro : 'Rumuński',  
      ru : 'Rosyjski',  
      cz : 'Czeski',  
      pl : 'Polski',
      ar : 'Arabski',
      ir : 'Perski',
      pt : 'Portugalski',
	  tr : 'Turecki',
	  nl : 'Holenderski',
      //settings descriptions  
      cityOrder_description : 'cityOrder_description',  
      fullArmyTable_description : 'Pokaż wszystkie możliwe jednostki',  
	  hideOnWorldView_description : 'Ukryj okno w podglądzie świata',  
      hideOnIslandView_description : 'Ukryj okno w podglądzie wyspy',  
      hideOnCityView_description : 'Ukryj okno w podglądzie miasta',  
      onTop_description : 'Okno będzie położone zawsze na wierzchu',  
      windowTennis_description : 'Przenosi okno imperium na wierzch po najechaniu myszą, gdy odjedziemy myszą okno się schowa pod poprzednio aktywne - opcja wyłączona, gdy uaktywniona opcja - Zawsze na wierzchu',  
      autoUpdates_description : 'Włącza automatyczne aktualizacje (co 24 godziny)',  
      smallFont_description : 'Użyj mniejszej czcionki',  
      alternativeBuildingList_description : 'Użyj alternatywnej tabeli',
      compressedBuildingList_description : 'Use condensed building table<br>Groups luxury resource production buildings<br>Groups palace/govenors residence', //
      wineOut_description : 'Disables the Ambrosia option to buy \'Out of Wine\'', //
	  dailyBonus_description : 'The daily bonus will be automatically confirmed<br>and the window is no longer displayed', //
	  unnecessaryTexts_description: 'Removes unnecessary descriptions in buildings,<br>the building list of buildings, minimize scrolling', //
	  ambrosiaPay_description : 'Disables the new Ambrosia buying options,<br>click on the button cancels the action', //
      wineWarningTime_description : 'W tym czasie skończy się dana ilość wina ',  
      languageChange_description : 'Zmień język',
      newsticker_description : 'Hide news ticker in the GF-toolbar', //
      event_description : 'Hide events under the advisers', //
      logInPopup_description : 'Hide the Info Window when login', //
      birdswarm_description : 'Hide the bird swarm in island and city view', //
      hourlyRes_description : 'Hide hourly resources in the infobar', //
      onIkaLogs_description : 'use IkaLogs for your battle reports', //
      playerInfo_description : 'View information from the players in the island view', //
	  control_description: 'Hide the Control center in world, island and city view', //
      // settings categories  
      visibility_category : '<b>Ukrywanie</b>',  
      display_category : '<b>Pokazywanie</b>',  
      global_category : '<b>Ustawienia globalne</b>',  
      army_category : '<b>Ustawienia armii</b>',  
      building_category : '<b>Ustawienia budynków</b>',  
      resource_category : '<b>Ustawienia zasobów</b>',  
      language_category : '<b>Zmień język</b>',  
      // Helptable  
      Initialize_Board : '<b>Wczytywanie okien</b>',  
      on_your_Town_Hall : 'ratusz i przejdź do każdego miasta nie zamykając tego okna',  
      on_the_Troops : 'okno \"Wojska w mieście\" po lewej tronie i przejdź do każdego miasta nie zamykając tego okna',  
      on_Museum : 'muzeum, później kliknij w zakładkę \"Rozdysponuj dobra kulturowe\"',  
      on_Research_Advisor : 'badania, później kliknij na każdą zakładkę w obszarze badań po lewej stronie okna',  
      on_your_Palace : 'pałac',  
      on_your_Finance : 'okno finansów',  
      on_the_Ambrosia : '\"Sklep z ambrozją\"',  
      Re_Order_Towns : '<b>Kolejność miast</b>',  
      Reset_Position : '<b>Resetowanie pozycji okna</b>',  
      On_any_tab : 'Można ustawić sobie kolejność miast przeciągając za ikonę zasobu po lewej stronie nazwy miasta',  
      Right_click : 'Kliknij prawym na przycisku imperium po lewej stronie',  
      Navigate : '1, 2, 3 ... 0, -, = <b>:&nbsp;&nbsp;</b> Przechodzenie od miasta 1 do 12',  
      Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Przechodzenie do Miasta/ Bydynków/ Armii', // Setting/ Help tab
      Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Przechodzenie do Miasta/ Wojska/ Badań/ Dyplomaty',  
      Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Przechodzenie pomiędy Świat / Wyspa/ Miasto',  
      Spacebar : 'Spacja<b>:&nbsp;&nbsp;</b> Pokaż / ukryj Empire Overview',  
      Hotkeys : '<b>Skróty</b>',
      // formatting
      thousandSeperator : ',',
      decimalPoint:'.',
      click_:'<b>Otwórz</b>'		
		},
		ar:{                     // Thx AbdelKarimCI and Hayato500 for Translation  
	  buildings: 'المباني',  
	  economy: 'الموارد',  
	  military: 'الجيش',  
	  towns: 'المدن',  
	  academy_: 'أكاديمية',  
      townhall_: 'دار البلدية',  
      dump_: 'منزل التخزين',  
      warehouse_: 'مستودع',  
      tavern_level: 'مستوى الاستراحة',  
      corruption: 'فساد',  
      cultural: 'المعالم الثقافية',  
      population: 'السكان',  
      citizens: 'مواطنون',  
      scientists: 'علماء',  
      scientists_max: 'أقصى عدد من العلماء',  
      options: 'خيارات',  
      help: 'مساعدة',  
      agora: 'إلى أغورا',  
      to_world: 'عرض العالم',   
      to_island: 'عرض الجزيرة',  
      army_cost: 'أسعار القوات',  
      fleet_cost: 'أسعار الأساطيل',  
      army_supply: 'تأمين القوات',  
      fleet_supply: 'تأمين الأساطيل',  
      research_cost: 'تكاليف الأبحاث',   
      income: 'الدَّخل',  
      expenses: 'تأمين',  
      balances: 'النتيجة',  
      espionage: 'عرض المخبأ',  
      contracts: 'عرض معاهدات',  
      combat: 'تقارير القتال',  
      satisfaction: 'السعادة',  
      total_ : 'مجموع',  
      max_Level : 'أقصى مستوى',  
      actionP : 'نقاط التحرك',  
      researchP : 'نقاط الأبحاث',  
      finances_ : 'الموارد المالية',  
      free_ground : 'مكان بناء فارغ',   
      wood_ : 'مادة البناء',  
      wine_ : 'مشروب العنب',  
      marble_ : 'رخام',   
      crystal_ : 'بلور',   
      sulphur_ : 'كبريت',      
      angry: 'غضبان',  
      unhappy: 'حزين',  
      neutral: 'عادي',  
      happy: 'سعيد',  
      euphoric: 'مبتهج',       
      housing_space: 'أقصى عدد أماكن سكن',  
      free_Citizens: 'سكان عاطلون',  
      free_housing_space: 'مكان سكن فارغ',  
      level_tavern: 'مستويات الإستراحات',  
      maximum: 'أقصى',  
      used: 'مستعمل',  
      plundergold: 'ذهب',        
      garrision: 'أقصى حد قوات الحماية',  
      Sea: 'البحر',  
      Inland: 'داخلي',       
      full: '0',
	  off: 'off',
      time_to_full: 'قبل الإمتلاء',  
      time_to_empty: 'قبل النفاد',  
      capacity: 'سعة',  
      safe: 'آمن',     
      training: 'تدريب',         
      plundering: 'نهب',       
      constructing: 'جاري إكمال الإنشاء',  
      next_Level: 'مطلوب للمستوى',  
      transport: 'مواصلات',  
      loading: 'جاري تحميل',  
      en_route: 'في الطريق',  
      arrived: 'وصل',  
      to_town_hall: 'إلى دار البلدية',  
      to_saw_mill: 'إلى المنشرة',  
      to_mine: 'إلى المنجم',  
      to_barracks: 'إلى الثكنة',  
      to_shipyard: 'إلى حوض السفن',  
      member: 'عرض الاعضاء',  
      transporting: 'نقل إلى',  
      transporting_units: 'نشر الوحدات في',  
      transporting_fleets: 'تحريك السفن إلى',  
      today: 'اليوم',  
      tomorrow: 'غدا',  
      yesterday: 'أمس',  
      hour: 'س',  
      day: 'ي',  
      week: 'أ',  
      hour_long: 'ساعة',  
      day_long: 'يوم',  
      week_long: 'أسبوع',
      ika_world: 'البحث في عالم إيكاريام',
      charts: 'عرض الرسوم البيانية',  
      //settings  
      cityOrder : 'ترتيب المدن',  
      fullArmyTable :  'إظهار كل الوحدات العسكرية',  
      hideOnWorldView : 'فرض الإخفاء عند عرض العالم',  
      hideOnIslandView : 'فرض الإخفاء عند عرض الجزيرة',      
      hideOnCityView : 'فرض الإخفاء عند عرض المدينة',  
      onTop : 'عرض فوق نوافذ إيكاريام',  
      windowTennis : 'عرض فوق إيكاريام عند مرور الفأرة',  
      autoUpdates : 'تحقق تلقائيا من وجود تحديثات',  
      smallFont : 'إستعمل حجم خط أصغر',  
      alternativeBuildingList : 'المباني الخاصة مجموعة حسب الفئة',
      compressedBuildingList : 'أستخدام قائمة المباني المضغوطة',
      wineOut : 'ايقاف خاصية الامبروزيا “خالي من مشروب العنب”',
	  dailyBonus : 'قبول المكافئة اليومية تلقائيا',
  	  unnecessaryTexts : 'حذف الوصف الغير هام',
	  ambrosiaPay : 'تعطيل خيارات شراء الأمبروزيا الجديدة',
      wineWarningTime : 'تحذير حول إستهلاك مشروب العنب',  
      languageChange : 'تغيير اللغة',  
      current_Version : 'النسخة الحالية<b>:</b>',
	  ikariam_Version : 'نسخة أيكاريام<b>:</b>',
      reset : 'إعادة تعيين كافة الإعدادات إلى الافتراضي',  
      goto_website : 'إذهب إلى موقع Userscripts.com',  
      website : 'موقع',
      Check_for_updates : 'فرض التحقق من وجود تحديثات',  
      check : 'تحقق من وجود تحديثات',   
      Report_bug : 'الإبلاغ عن خطأ في البرنامج النصي',
      report : 'الإبلاغ عن خطأ',
      save : 'Save',
      save_settings : 'حفظ الإعدادات<b>!</b>&nbsp;',		  
      newsticker : 'إخفاء شريط الأخبار',
      event : 'إخفاء الأحداث',
	  logInPopup : 'أخفاء نافذة المعلومات بعد تسجيل الدخول',
      birdswarm : 'إخفاء سرب الطيور',
      hourlyRes : 'إخفاء الموارد بالساعة',
      onIkaLogs : 'إستخدام محول تقرير المعارك IkaLog',
      playerInfo : 'إظهار معلومات حول اللاعب',
	  control: 'إخفاء مركز التحكم',
	  alert: 'من فضلك قم بأختيار خيار واحد فقط!',
	  alert_palace: 'من فضلك قم بزيارة العاصمة أولا!',
	  alert_toast: 'اعادة البيانات , جاري تحديث الصفحة بعد ثواني',
	  alert_error: 'حدث خطأ أثناء تفقد التحديثات المتوفرة: ',
	  alert_noUpdate: 'لا يوجد تحديثات حاليا لـ "',
	  alert_update: 'هناك تحديث متوفر لـ الـ Greasemonkey script "',
	  alert_update1: 'هل ترغب في الذهاب الي صفحة التحميل الان ؟',
	  alert_daily: 'أرجو منك تفعيل \'قبول المكافئة اليومية تلقائيا \'',
      en : 'الأنجليزية',  
      de : 'الألمانية',  
      it : 'الإيطالية',  
      el : 'اليونانية',  
      es : 'الإسبانية',  
      fr : 'الفرنسية',  
      ro : 'الرومانية',  
      ru : 'الروسية',  
      cz : 'التشيكية',  
      pl : 'البولندية',  
      ar : 'العربية',
      ir : 'الفارسي',
      pt : 'البرتغالية',
	  tr : 'التركية',
	  nl : 'هولندي',
      //settings descriptions  
      cityOrder_description : 'وصف ترتيب المدينة',  
      fullArmyTable_description : 'عرض جميع وحدات الجيوش الممكنة في علامة تبويب الجيش',  
      hideOnWorldView_description : 'الإخفاء تلقائيا عند عرض العالم',  
      hideOnIslandView_description : 'الإخفاء تلقائيا عند عرض الجزيرة',  
      hideOnCityView_description : 'الإخفاء تلقائيا عند عرض المدينة',  
      onTop_description : 'عرض الواجهة فوق نوافذ إيكاريام',  
      windowTennis_description : 'عرض الواجهة فوق نوافذ إيكاريام عند مرور مؤشر الفأرة<br>تعود تلقائيا إلى الخلف عند خروج مؤشر الفأرة<br>تتجاهل خيار \'دائما فوق\'',  
      autoUpdates_description : 'تشغل البحث التلقائي عن التحديثات<br>(مرة كل 24 ساعة)',  
      smallFont_description : 'إستعمال حجم خط أصغر لبيانات الواجهة',  
      alternativeBuildingList_description : 'جمع المباني الخاصة بتحسين الجمع والإقتصاد في الموارد في آخر الجدول',
      compressedBuildingList_description : 'قم بأستخدام طاولة البناء المكثفة<br>مجموعات مباني زيادة انتاج الموارد<br>مجموعات القصر/دار البلدية',
      wineOut_description : 'تعطيل خيار شراء الامبروزيا لشراء \'خالي من مشروب العنب\'',
	  dailyBonus_description : 'المكافئة اليومية تم قبولها تلقائيا<br>و النافذة لن يتم عرضها بعد الان',
	  unnecessaryTexts_description: 'Rحذف الوصف الغير هام للمباني,<br>قائمة البناء للمباني, تقليل التمرير',
	  ambrosiaPay_description : 'تعطيل خيار شراء الامبروزيا الجديد,<br>الضغط علي الزر يقوم بألغاء الحدث',
      wineWarningTime_description : 'الوقت المتبقي لمشروب العنب يصبح \'أحمر\' بداية من القيمة المختارة',
      languageChange_description : 'تغيير اللغة',
      newsticker_description : 'إخفاء شريط الأخبار في شريط أدوات GF',
      event_description : 'إخفاء الأحداث تحت المستشارين',
      logInPopup_description : 'قم بألغاء نافذة المعلومات عند تسجيل الدخول',
      birdswarm_description : 'إخفاء سرب الطيور في عرض الجزيرة والمدينة',
      hourlyRes_description : 'إخفاء الموارد بالساعة من شريط المعلومات',
      onIkaLogs_description : 'إستخدام IkaLogs لتقارير معارككم',
      playerInfo_description : 'عرض معلومات عن اللاعبين في عرض الجزيرة',
	  control_description: 'إخفاء مركز التحكم في عرض العالم، الجزيرة والمدينة',
      // settings categories  
      visibility_category : '<b>رؤية الواجهة</b>',  
      display_category : '<b>إعدادات العرض</b>',  
      global_category : '<b>إعدادات عامة</b>',  
      army_category : '<b>إعدادات الجيش</b>',  
      building_category : '<b>إعدادات المباني</b>',  
      resource_category : '<b>إعدادات الموارد</b>',  
      language_category : '<b>إعدادات اللغة</b>',  
      // Helptable  
      Initialize_Board : '<b>تهيئة الواجهة</b>',  
      on_your_Town_Hall : 'على دار البلدية في مدينتك وتذهب إلى كل مدينة مع المحافظة على هذه الرؤية مفتوحة',  
      on_the_Troops : 'على رؤية \"قوات في المدينة\" من الجهة اليمنى وتذهب إلى كل مدينة مع المحافظة على هذه الرؤية مفتوحة',  
      on_Museum : 'على المتحف ثم رؤية \"توزيع المعالم الثقافية\"',  
      on_Research_Advisor : 'على مستشار الأبحاث ثم إضغط على تبويبات الأبحاث الأربعة من جهة اليمين',  
      on_your_Palace : 'على قصرك',  
      on_your_Finance : 'على تبويت الموازنات (الذهب)',  
      on_the_Ambrosia : 'على \"متجر أمبروزيا\"',  
      Re_Order_Towns : '<b>إعادة ترتيب المدن</b>',  
      Reset_Position : '<b>إعادة تعيين الرتبة</b>',  
      On_any_tab : 'من أي تبويب، إسحب أيقونة الموارد التي على يسار إسم المدينة',  
      Right_click : 'انقر بالزر الأيمن على زر قائمة إمبراطورية في القائمة اليمنى للصفحة',  
      Navigate : '1، 2، 3، ... ، 0، -، = <b>:&nbsp;&nbsp;</b> تنقل بين المدن من 1 إلى 12',  
      Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> تنقل بين تبويبات المدينة/ المباني/ الجيش', // Setting/ Help tab
      Navigate_to : 'Q، W، E، R <b>:&nbsp;&nbsp;</b> تنقل بين مستشار المدينة/ الجيش/ الأبحاث/ الديبلوماسية',  
      Navigate_to_World : 'SHIFT + Q، W، E <b>:&nbsp;&nbsp;</b> تنقل بين رؤية العالم/ الجزيرة/ المدينة',  
      Spacebar : 'زر الفراغ<b>:&nbsp;&nbsp;</b> إخفاء/ إظهار الواجهة',  
      Hotkeys : '<b>إختصارات لوحة المفاتيح</b>',  
      // formatting  
      thousandSeperator : ',', 
      decimalPoint:'.',  
      click_:'<b>إضغط</b>'        
        },
		ir:{                     // Thx SHAB_RO for Translation  
	  buildings: 'ساختمانها',
	  economy: 'اقتصاد',
	  military: 'نظامى',
	  towns: 'شهرها',
	  academy_: 'دانشگاه',
	  townhall_: 'شهردارى',
	  dump_: 'انبار موقت’',
	  warehouse_ : 'انبار معمولى’',
	  tavern_level: 'مرحله آبميوه فروشى',
	  corruption: 'فساد',
	  cultural: 'اجناس فرهنگى',
	  population: 'جمعيت',
	  citizens: 'ساكنين',
	  scientists: 'دانشمندان',
	  scientists_max: 'حداكثر دانشمندان',
	  options: 'تنظيمات',
	  help: 'راهنما',
	  agora: 'انجمن جزيره',
	  to_world: 'نمايش جهان',
	  to_island: 'نمايش جزيره',
	  army_cost: 'هزينه نيروى زمينى',
	  fleet_cost: 'هزينه نيروى دريايى',
	  army_supply: 'نيروهاى زمينى',
	  fleet_supply: 'نيروهاى دريايى',
	  research_cost: 'هزينه تحقيقات',
	  income: 'درآمد',
	  expenses: 'مخارج',
	  balances: 'تراز',
	  espionage: 'مخفيگاه',
	  contracts: 'قراداد ها',
	  combat: 'گزارشات جنگى',
	  satisfaction: 'رضایتمندی',
	  total_ : 'مجموع',
	  max_Level : 'آخرين مرحله',
	  actionP : 'امتيازات حركتى',
	  researchP : 'امتيازات تحقيق',
	  finances : 'ترازنامه',
	  free_ground : 'زمين ساختمانى آزاد',
	  wood : 'چوب',
	  wine : 'انگور',
	  marble : 'سنگ',
	  crystal : 'كريستال',
	  sulphur : 'گوگرد',
	  angry: 'عصبانى',
	  unhappy: 'ناراحت',
	  neutral: 'عادى',
	  happy: 'خوشحال',
	  euphoric: 'ذوق مرگ',
	  housing_space: 'حداكثر جمعيت ممكن',
	  free_Citizens: 'ساكنين بيكار',
	  free_housing_space: 'فضاى خالى جمعيت',
	  level_tavern: 'مرحله آبميوه فروشى',
	  maximum: 'حداكثر',
	  used: 'استفاده شده',
	  plundergold: 'طلا',
	  garrision: 'محدوديت پاديگان',
	  Sea: 'دريايى',
	  Inland: 'زمينى',
	  full: '0',
	  off: 'off',
	  time_to_full: 'تا پر شدن',
	  time_to_empty: 'تا خالى شدن',
	  capacity: 'ظرفيت',
	  safe: 'امنيت',
	  training: 'درحال ساخت',
	  plundering: 'غارت',
	  constructing: 'در حال توسعه',
	  next_Level: 'مورد نياز براى مرحله',
	  transport: 'حمل و نقل',
	  loading: 'بارگيرى',
	  en_route: 'در مسير',
	  arrived: 'رسيده',
	  to_town_hall: 'شهردارى',
	  to_saw_mill: 'جنگل',
	  to_mine: 'معدن لوكس',
	  to_barracks: 'سربازخانه',
	  to_shipyard: 'كشتى سازى',
	  member: 'اعضاى اتحاد',
	  transporting: 'حمل ونقل به',
	  transporting_units: 'استقرار نيروى زمينى به',
	  transporting_fleets: 'حركت نيروى دريايى به',
	  today: 'امروز',
	  tomorrow: 'فردا',
	  yesterday: 'ديروز',
	  hour: 'س',
	  day: 'ر',
	  week: 'ه',
	  hour_long: 'ساعت',
	  day_long: 'روز',
	  week_long: 'هفته',
      ika_world: 'در Ikariam-World جستجو كن',
      charts: 'نمايش نمودارها',
      //settings  
	  cityOrder : 'به ترتيب شهر',
	  fullArmyTable : 'نمايش تمام واحدهاى نظامى',
	  hideOnWorldView : 'پنهان كردن در نمايش جهان',
	  hideOnIslandView : 'پنهان كردن در نمايش جزيره',
	  hideOnCityView : 'پنهان كردن در نمايش شهر',
	  onTop : 'نمايش در بالاى تمام پنجره هاى بازى',
	  windowTennis : 'بالاترين پنجره محل استقرار موس باشد',
	  autoUpdates : 'بروزآورى خودكار',
	  smallFont : 'استفاده از فونت كوچك',
	  alternativeBuildingList : 'كنار هم قرار دادن ساختمانهاى افزاينده',
      compressedBuildingList : 'استفاده از ليست ساختمانها فشرده',
      wineOut : 'غير فعال كردن گزينه پلاس براى “تمام شدن انگور شهر”',
	  dailyBonus : 'تاييد خودكار پاداش روزانه',
  	  unnecessaryTexts : 'حذف توضيحات غير ضرورى',
	  ambrosiaPay : 'حذف خريد منابع با آمبروژيا',
	  wineWarningTime : 'زمان هشدار براى اتمام انگور',
	  languageChange : 'تغيير زبان',
	  current_Version : 'نسخه ى اسكريپت<b>:</b>',
	  ikariam_Version : 'نسخه ى بازى<b>:</b>',
	  reset : 'بازگشت به تنظيمات پيشفرض',
	  goto_website : 'رفتن به صفحه اسكريپت',
	  website : 'صفحه ما',
	  Check_for_updates : 'بررسى بروز بودن اسكريپت',
	  check : 'بررسى بروزسانى',
	  Report_bug : 'گزارش اشكالات اسكريپت',
	  report : 'گزارش اشكالات',
      save : 'ذخيره',
      save_settings : 'ذخيره تنظيمات<b>!</b>&nbsp;',  
      newsticker : 'پنهان كردن تيكر اخبار',
      event : 'پنهان كردن رويدادها',
	  logInPopup : 'پنهان كردن پنجره اطلاعات',
      birdswarm : 'پنهان كردن پرندگان',
      hourlyRes : 'پنهان كردن درآمد منابع',
      onIkaLogs : 'استفاده از مبدل گزارشات جنگى',
      playerInfo : 'نمايش اطلاعات بازيكنان',
	  control: 'پنهان كردن تولبار كنترل',
	  alert: 'لطفا فقط يكى از دو گزينه را انتخاب كنيد!',
	  alert_palace: 'ابتدا لطفا شهر پايتخت خود را مشاهده كنيد',
	  alert_toast: 'ريست اطلاعات، صفحه طى چند ثانيه دوباره بارگزارى ميشود',
	  alert_error: 'يك خطا در هنگام بروزرسانى رخ داده است: ',
	  alert_noUpdate: 'هيچ بروزرسانى اى موجود نيست براى “',
	  alert_update: 'بروزرسانى جديد براى اسكريپت موجود است ”',
	  alert_update1: 'آيا مايليد همينك به صفحه ى نصب اسكريپ برويم؟',
	  alert_daily: 'Please enable \'Automatically confirm the daily bonus \'', //
	  en : 'انگلیسی',
	  de : 'آلمانی',
	  it : 'ایتالیایی',
	  el : 'یونانی',
	  es : 'اسپانیایی',
	  fr : 'زبان فرانسه',
	  ro : 'رومانیایی',
	  ru : 'روسی',
	  cz : 'چک',
	  pl : 'لهستانی',
	  ar : 'عربی',
	  ir : 'فارسی',
      pt : 'پرتغالی',
	  tr : 'تركى',
	  nl : 'هلندی',
	  //settings descriptions
	  cityOrder_description : 'توصيفات نظم شهرى',
	  fullArmyTable_description : 'نمايش تمام نيروهاى قابل ساخت در قسمت نظامى',
	  hideOnWorldView_description : 'بصورت پيشفرض در نمايش جهان پنهان باشد',
	  hideOnIslandView_description : 'بصورت پيشفرض در نمايش جزيره پنهان باشد',
	  hideOnCityView_description : 'بصورت پيشفرض در نمايش شهر پنهان باشد',
	  onTop_description : 'نمايش دادن برد بالاتر از پنجره هاى ديگر بازى',
	  windowTennis_description : 'زمانى كه موس روى برد قرار گيرد، برد به بالاى تمام پنجره هاى بازى ميآيد<br>زمانى كه موس روى پنجهر هاى بازى قرار گيرد، برد به پايين تمام پنجره هاى بازى ميرود<br>نكته: اين گزينه مورد هميشه بالا بودن برد را نقض ميكند',
	  autoUpdates_description : 'فعال كردن بروزرسانى خودكار <br>(در هر 24 ساعت)',
	  smallFont_description : 'استفاده از فونت كوچك براى اطلاعات برد',
	  alternativeBuildingList_description : 'استفاده از ترتيب متفاوت در نمايش ساختمانها',
      compressedBuildingList_description : 'فشرده سازى تب ساختمانهايك گروه كردن ساختمانهاى افزاينده ى منابع لوكسيك گروه كردن قصر و فرماندارى',
      wineOut_description : 'غيرفعال كردن گزينه خريد با آمبروژيا \'زمان اتمام انگور\’',
	  dailyBonus_description : 'پاداش روزانه بصورت خودكار تاييد شده و پنجره آن ظاهر نميشود',
	  unnecessaryTexts_description: 'حذف توضيحات غير ضرورى در ساختمانها،>br>ليست ساختمان سازى،كوچك شدن اسكرول',
	  ambrosiaPay_description : 'حذف گزينه خريد منابع با آمبروژيا,<br>كليك كردن بر روى دكمه انصراف زمان فعال شدن آن',
	  wineWarningTime_description : 'زمانى كه اين مقدار ساعت به اتمام انگور مانده باشد، برنگ قرمز هشدار داده خواهد شد',
	  languageChange_description : 'تغيير زبان برد',
      newsticker_description : 'پنهان كردن تيكر اخبار در تولبار گيم فرج',
      event_description : 'پنهان كردن رويداد زير مشاورين',
      logInPopup_description : 'پنهان كردن پنجره هايى كه در ابتداى ورود به بازى ظاهر ميشود',
      birdswarm_description : 'پنهان كردن پرندگان در نمايش شهر و جزيره',
      hourlyRes_description : 'پنهان كردن در آمد منابع در هر ساعت',
      onIkaLogs_description : 'استفاده از IkaLogs براى گزارشات جنگى',
      playerInfo_description : 'نمايش اطلاعات بازيكنان در نمايش جزيره',
	  control_description: 'مخفى كردن تولبار كليدهاى كنترل صفحه كه در پايين صفحه نمايش داده ميشود',
      // settings categories  
      visibility_category : '<b>نمايش برد</b>',
      display_category : '<b>تنظيمات نمايش</b>',  
      global_category : '<b>تنظيمات عمومى</b>',
      army_category : '<b>تنظيمات نظامى</b>',
      building_category : '<b>تنظيمات ساختمانها</b>',  
      resource_category : '<b>تنظيمات منابع</b>',  
      language_category : '<b>تنظيمات زبان</b>',  
      // Helptable  
      Initialize_Board : '<b>تكميل اطلاعات اوليه برد</b>',  
	  on_your_Town_Hall : 'روى شهردارىدر تمام شهراى خود ',
	  on_the_Troops : 'روى سربازان در شهر كه سمت راست نمايش شهر وجود دارد',
	  on_Museum : 'روى پخش کردن اجناس فرهنگی كه در موزه قرار دارد',
	  on_Research_Advisor : 'روى چهار تحقيقى كه رد قسمت تحقيقات هستند',
	  on_your_Palace : 'روى قصر',
	  on_your_Finance : 'روى تراز نامه',
      on_the_Ambrosia : 'روى فروشگاه آمبروژيا',
      Re_Order_Towns : '<b>ترتيب بندى شهرها</b>',  
      Reset_Position : '<b>ريست محل استقرار برد</b>',
	  On_any_tab : 'در هر تب، با گرفتن و كشيدن عكس كالايى كه كنار اسم شهر قرار داره ترتيب شهرها رو ميتوانيد تغيير دهيد',
	  Right_click : 'بر روى آيكن اصلى برد كه در سمت راست صفحه وجود دارد كليك راست كنيد', 
      Navigate : '1، 2، 3، ... ، 0، -، = <b>:&nbsp;&nbsp;</b> حركت بين شهر 1 تا 12',
      Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> حركت بين تب هاى اقتصاد/ساختمانها/نظامى', // Setting/ Help tab
      Navigate_to : 'Q، W، E، R <b>:&nbsp;&nbsp;</b> حركت بين شهرها/نظامى/تحقيق/سياستمدارى',  
      Navigate_to_World : 'SHIFT + Q، W، E <b>:&nbsp;&nbsp;</b> حركت بين نمايش جهان/جزيره/شهر',  
      Spacebar : 'Spacebar<b>:&nbsp;&nbsp;</b> پنهان/آشكار كردن برد',  
      Hotkeys : '<b>كليدهاى ميانبر</b>',
      // formatting  
      thousandSeperator : ',', 
      decimalPoint:'.',  
      click_:'<b>كليك كنيد</b>'        
       },
	   pt:{                     // Thx mosca_fly for Translation 
	  buildings: 'Edifícios',
	  economy: 'Economia',
	  military: 'Militares',
	  towns: 'Cidades',
	  academy_: 'Academia',
	  townhall_: 'Câmara Municipal',
	  dump_: 'Depósito',
	  warehouse_: 'Armazém',
	  tavern_level: 'Nível da Taberna',
	  corruption: 'Corrupção',
	  cultural: 'Bens Culturais',
	  population: 'População',
	  citizens: 'Cidadãos',
	  scientists: 'Cientistas',
	  scientists_max: 'Máx. Cientistas',
	  options: 'Opções',
	  help: 'Ajuda',
	  agora: 'Ir para Ágora',
	  to_world: 'Mostrar Mundo', 
	  to_island: 'Mostrar Ilha',
	  army_cost: 'Custo do Exército',
	  fleet_cost: 'Custo da Frota',
	  army_supply: 'Manutenção do Exército',
	  fleet_supply: 'Manutenção da Frota',
	  research_cost: 'Custo de Pesquisa', 
	  income: 'Rendimento',
	  expenses: 'Despesas',
	  balances: 'Balanços',
	  espionage: 'Ver Espionagem',
	  contracts: 'Ver Tratados',
	  combat: 'Ver Combates',
	  satisfaction: 'Satisfação',
	  total_ : 'Total',
	  max_Level : 'Máx. Nível',
	  actionP : 'Pontos de Acção',
	  researchP : 'Pontos de Pesquisa',
      finances_ : 'Finanças',
      free_ground : 'Terrenos de Construção Livres', 
      wood_ : 'Materiais de Construção',
      wine_ : 'Vinho',
      marble_ : 'Mármore', 
      crystal_ : 'Cristal', 
      sulphur_ : 'Enxofre',   
	  angry: 'Irado',
	  unhappy: 'Triste',
	  neutral: 'Neutral',
	  happy: 'Contente',
	  euphoric: 'Eufórico',   
	  housing_space: 'Máx. Espaço na Câmara Municipal',
	  free_Citizens: 'Cidadãos Livres',
	  free_housing_space: 'Espaço Livre na Câmara Municipal',
	  level_tavern: 'Nível da Taberna',
	  maximum: 'Máximo',
	  used: 'Usado',
	  plundergold: 'Ouro',   
	  garrision: 'Limite de Guarnição',
	  Sea: 'Mar',
	  Inland: 'Interior',  
      full: '0',
	  off: 'off',
      time_to_full: 'para Encher',
      time_to_empty: 'para Esvaziar',
      capacity: 'Capacidade',
      safe: 'Seguro', 
      training: 'Treinando',  
      plundering: 'Pilhando',  
      constructing: 'Expansão em Progresso',
	  next_Level: 'Necessário para Nível',
      transport: 'Transportes',
	  loading: 'Carregando',
	  en_route: 'A Caminho',
	  arrived: 'Chegou',
      to_town_hall: 'para Câmara Municipal',
	  to_saw_mill: 'para Floresta',
      to_mine: 'para Bem de Luxo',
      to_barracks: 'para Quartel',
      to_shipyard: 'para Estaleiro',
      member: 'Ver Lista de Membros',
      transporting: 'Transportar para',
      transporting_units: 'Enviar Tropas para',
      transporting_fleets: 'Mover Frota para',
	  today: 'Hoje',
	  tomorrow: 'Amanhã',
	  yesterday: 'Ontem',
	  hour: 'h',
	  day: 'D',
	  week: 'S',
	  hour_long: 'Hora',
	  day_long: 'Dia',
	  week_long: 'Semana',
      ika_world: 'Procurar em Ikariam-World',
      charts: 'Ver Cartas',
      //settings
      cityOrder : 'OrdemCidade',
      fullArmyTable :  'Mostrar todas Unidades Militares',
      hideOnWorldView : 'Forçar Ocultação no Mapa Mundo',
      hideOnIslandView : 'Forçar Ocultação no Mapa da Ilha',   
      hideOnCityView : 'Forçar Ocultação no Mapa da Cidade',
      onTop : 'Sobrepor as das Janelas do Ikariam',
      windowTennis : 'Sobrepor ao ikariam passando com o Rato por cima',
      autoUpdates : 'Procurar por Actualizações Automaticamente',
      smallFont : 'Usar Letra pequena',
      alternativeBuildingList : 'Usar lista de Edifícios Alternativa',
      compressedBuildingList : 'Use compressed building list', //
      wineOut : 'Disable Ambrosia feature "Out of Wine"', //
	  dailyBonus : 'Automatically confirm the daily bonus', //
  	  unnecessaryTexts : 'Removes unnecessary descriptions', //
	  ambrosiaPay : 'Deactivate new Ambrosia buying options', //
      wineWarningTime : 'Aviso de Vinho Restante',
      languageChange : 'Alterar Língua',
	  current_Version : 'Versão Actual<b>:</b>',
	  ikariam_Version : 'Versão Ikariam<b>:</b>',
	  reset : 'Repor Definições Padrão',
	  goto_website : 'Ir para o Sítio Web de scripts Userscripts.com',
	  website : 'Sítio Web', 
      Check_for_updates : 'Forçar uma verificação por Actualizações',
      check : 'Procurar por actualizações', 
      Report_bug : 'Reportar erro no script',
      report : 'Reportar Erro',
      save : 'Save',
      save_settings : 'Save settings<b>!</b>&nbsp;',		  
      newsticker : 'Ocultar newsticker',
      event : 'Ocultar Eventos',
	  logInPopup : 'Hide the Info Window when login', //
      birdswarm : 'Ocultar birdswarm',
      hourlyRes : 'Ocultar Recursos por Hora',
      onIkaLogs : 'Use IkaLog Battle Report Converter', //
      playerInfo : 'Show information about player', //
	  control: 'Hide Control center', //
	  alert: 'Please choose only one option!', //
	  alert_palace: 'Please visit your capital city first', //
	  alert_toast: 'Data Reset, reloading the page in a few seconds', //
	  alert_error: 'An error occurred while checking for updates: ', //
	  alert_noUpdate: 'No update is available for "', //
	  alert_update: 'There is an update available for the Greasemonkey script "', //
	  alert_update1: 'Would you like to go to the install page now?', //
	  alert_daily: 'Please enable \'Automatically confirm the daily bonus \'', //
      en : 'Inglês',
      de : 'Alemão',
      it : 'Italiano',
      el : 'Grego',
      es : 'Espanhol',
      fr : 'Francês',
	  ro : 'Romeno',
	  ru : 'Russo',
	  cz : 'Checo',
      pl : 'Polaco',
      ar : 'Árabe',
      ir : 'Persa',
      pt : 'Português',
	  tr : 'Turco',
	  nl : 'Holandês',
      //settings descriptions
      cityOrder_description : 'OrdemCidade_Descrição',
      fullArmyTable_description : 'Mostrar todas as unidades possíveis no separador do Exército',
	  hideOnWorldView_description : 'Ocultar por padrão no Mapa do Mundo',
      hideOnIslandView_description : 'Ocultar por padrão no Mapa da Ilha',
      hideOnCityView_description : 'Ocultar por padrão no Mapa da Ilha',
      onTop_description : 'Mostrar Tabela por cima das janelas do Ikariam',
      windowTennis_description : 'Sobrepor Tabela ao passar o rato por cima<br>Esta Opção Ignora a opção: Mostrar Tabela por cima das janelas do Ikariam<br>',
      autoUpdates_description : 'Activa a opção de verificar por actualizações automáticas <br>(A cada 24hrs)',
      smallFont_description : 'Usa letra pequena para dados da tabela',
      alternativeBuildingList_description : 'Usa tabela alternativa de Edifícios',
      compressedBuildingList_description : 'Use condensed building table<br>Groups luxury resource production buildings<br>Groups palace/govenors residence', //
      wineOut_description : 'Disables the Ambrosia option to buy \'Out of Wine\'', //
	  dailyBonus_description : 'The daily bonus will be automatically confirmed<br>and the window is no longer displayed', //
	  unnecessaryTexts_description: 'Removes unnecessary descriptions in buildings,<br>the building list of buildings, minimize scrolling', //
	  ambrosiaPay_description : 'Disables the new Ambrosia buying options,<br>click on the button cancels the action', //
      wineWarningTime_description : 'Tempo restante de vinho torna-se, \'vermelho\' nesta altura',
      languageChange_description : 'Altera a língua',
      newsticker_description : 'Oculta o newsticker no GF-toolbar',
      event_description : 'Oculta eventos debaixo dos conselheiros',
      logInPopup_description : 'Hide the Info Window when login', //
      birdswarm_description : 'Ocultar birdswarm no Mapa de Ilha e de Cidade',
      hourlyRes_description : 'Ocultar Recursos por hora na barra informativa',
      onIkaLogs_description : 'use IkaLogs for your battle reports',
      playerInfo_description : 'View information from the players in the island view', //
	  control_description: 'Hide the Control center in world, island and city view', //
	  // settings categories
      visibility_category : '<b>Visibilidade da Tabela</b>',
      display_category : '<b>Mostrar Definições</b>',
      global_category : '<b>Definições Gerais</b>',
      army_category : '<b>Definições do Exército</b>',
      building_category : '<b>Definições de Edifícios</b>',
      resource_category : '<b>Definições de Recursos</b>',
      language_category : '<b>Definições de Língua</b>',
      // Helptable
      Initialize_Board : '<b>Inicializar Tabela</b>',
	  on_your_Town_Hall : 'na tua Câmara Municipal e passa por cada cidade com esse modo de vista aberto',
	  on_the_Troops : ' no separador \"Tropas na cidade\" no lado esquerdo e passa por cada cidade com esse modo de vista aberto',
	  on_Museum : 'no Museu e depois no separador \"Distribuir Tratados Culturais\"',
	  on_Research_Advisor : 'no Conselheiro Científico e depois clica em cada um dos 4 separadores de pesquisa na janela a esquerda',
	  on_your_Palace : 'no teu palácio',
	  on_your_Finance : 'no teu separador de Finanças',
	  on_the_Ambrosia : 'na \"Loja de Ambrósia\"',
	  Re_Order_Towns : '<b>Re-Ordenar Cidades</b>',
	  Reset_Position : '<b>Redefinir Posição</b>',
	  On_any_tab : 'Em qualquer separador, arrasta o ícone do recurso a esquerda do nome da Cidade',
	  Right_click : 'Clica botão direito do rato no botão do Menu de Império do menu da página no lado esquerdo',
	  Navigate : '1, 2, 3 ... 0, -, = <b>:&nbsp;&nbsp;</b> Navega da Cidade 1 a 12',
	  Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Navega aos separadores Cidade/ Edifícios/ Exército', // Setting/ Help tab
	  Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Navega para os Conselheiros da Cidade/ Militar/ Pesquisas/ Diplomacia',
	  Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Navega para Mapas do Mundo/ Ilha/ Cidade',
	  Spacebar : 'Barra-de-espaços<b>:&nbsp;&nbsp;</b> Minimiza/ Maximiza a Tabela',
	  Hotkeys : '<b>Atalhos</b>',
      // formatting
      thousandSeperator : ',',
      decimalPoint:'.',
      click_:'<b>Click</b>'  
       },
	   tr:{                     // Thx Tyrant for Translation
	  buildings: 'Binalar',  
	  economy: 'Ekonomi',  
	  military: 'Askeri',  
	  towns: 'Koloniler',  
	  academy_: 'Akademi',  
	  townhall_: 'Belediye Binası',  
	  dump_: 'Yığın Sahası',  
	  warehouse_: 'Depo',  
	  tavern_level: 'Taverna Seviyesi',  
	  corruption: 'Bozulum',  
	  cultural: 'Kültürel Eşyalar',  
	  population: 'Popülasyon',  
	  citizens: 'Vatandaşlar',  
	  scientists: 'Bilim Adamları',  
	  scientists_max: 'maks. Bilim Adamı',  
	  options: 'Ayarlar',  
	  help: 'Yardım',  
	  agora: 'Agoraya Git',  
	  to_world: 'Dünya',   
	  to_island: 'Adayı Göster',  
	  army_cost: 'Birliklerin Temel Maliyeti',  
	  fleet_cost: 'Filonun Temel Maliyeti',  
	  army_supply: 'Birliklerin Beslenme Masrafları',  
	  fleet_supply: 'Filonun Beslenme Masrafları',  
	  research_cost: 'Araştırma Maliyeti',   
	  income: 'Gelir',  
	  expenses: 'Bakım Masrafı',  
	  balances: 'Genel Durum',  
	  espionage: 'İstihbarat Merkezine Git',  
	  contracts: 'Antlaşmalara Git',  
	  combat: 'Savaş Raporlarına Git',  
	  satisfaction: 'Memnuniyet',  
	  total_ : 'toplam',  
	  max_Level : 'maks. Seviye',  
	  actionP : 'Aksiyon Puanı',  
	  researchP : 'Araştırma Puanı',  
	  finances_ : 'Bilanço',  
	  free_ground : 'boş Bina Alanı',   
	  wood_ : 'İnşa Malzemesi',  
	  wine_ : 'Üzüm',  
	  marble_ : 'Mermer',   
	  crystal_ : 'Kristal',   
	  sulphur_ : 'Sülfür',        
	  angry: 'Kızgın',  
	  unhappy: 'Mutsuz',  
	  neutral: 'Nötr',  
	  happy: 'Mutlu',  
	  euphoric: 'Mükemmel',        
	  housing_space: 'maks. Konut',  
	  free_Citizens: 'İşsiz Vatandaşlar',  
	  free_housing_space: 'boş Konut',  
	  level_tavern: 'Taverna Seviyesi',  
	  maximum: 'maksimum',  
	  used: 'kullanılan',  
	  plundergold: 'Altın',        
	  garrision: 'Garnizon limiti',  
	  Sea: 'Deniz',  
	  Inland: 'Kara',         
	  full: '0',
	  off: 'off',
	  time_to_full: 'Kalan Süre (Dolması için)',  
	  time_to_empty: 'Kalan Süre (Bitmesi için)',  
	  capacity: 'Kapasite',  
	  safe: 'Güvende',   
	  training: 'Eğitiliyor',        
	  plundering: 'Yağmalanıyor',       
	  constructing: 'Yükseltiliyor!',  
	  next_Level: 'Gerekenler : Seviye',  
	  transport: 'Kargo Gemileri',  
	  loading: 'yükleniyor',  
	  en_route: 'yolda',  
	  arrived: 'ulaştı',  
	  to_town_hall: 'Belediye Binasına Git :',  
	  to_saw_mill: 'Ormana Git',  
	  to_mine: 'Lüks Kaynağa Git',  
	  to_barracks: 'Kışlaya Git :',  
	  to_shipyard: 'Donanma Tershanesine Git :',  
	  member: 'Üye Listesi',  
	  transporting: 'Malzeme Gönder ->',  
	  transporting_units: 'Birlik Konuşlandır ->',  
	  transporting_fleets: 'Filo Konuşlandır ->',  
	  today: 'bugün',  
	  tomorrow: 'yarın',  
	  yesterday: 'dün',  
	  hour: 's',  
	  day: 'G',  
	  week: 'H',  
	  hour_long: 'Saat',  
	  day_long: 'Gün',  
	  week_long: 'Hafta',  
	  ika_world: 'Ikariam-World \'te Ara',  
	  charts: 'İstatistikleri Göster',  
	  //settings  
	  cityOrder : 'cityOrder',  
	  fullArmyTable : 'Alternatif askeri birimleride göster',  
      hideOnWorldView : 'Dünya haritasında gizle',  
	  hideOnIslandView : 'Ada görünümünde gizle',       
      hideOnCityView : 'Şehir görünümünde gizle',  
	  onTop : 'En önde göster',  
	  windowTennis : 'Fare üstüne geldiğinde öne getir',  
	  autoUpdates : 'Otomatik güncelleme',  
	  smallFont : 'Küçük yazı tipi kullan',  
	  alternativeBuildingList : 'Alternatif binalarıda göster',
      compressedBuildingList : 'Sıkıştırılmış bina listesi',
      wineOut : 'Hide Ambrosia Feature "Out of Wine"', //
	  dailyBonus : 'Günlük bonusları otomatik onayla',
  	  unnecessaryTexts : 'Gereksiz açıklamaları gizle',
	  ambrosiaPay : 'Ambrosia\'lı işlemleri gizle',
	  wineWarningTime : 'Üzüm azalma uyarı süresi',  
	  languageChange : 'Dil değiştir',  
	  current_Version : 'Kullanılan Versiyon<b>:</b>',
	  ikariam_Version : 'Ikariam Versiyonu<b>:</b>',
	  reset : 'Ayarları sıfırla',  
	  goto_website : 'Empire Overview \'ın sitesine git',  
	  website : 'Website',   
	  Check_for_updates : 'Yeni bir güncelleme çıkmışmı diye kontrol eder',  
	  check : 'Güncellemeleri Kontrol Et',   
	  Report_bug : 'Eklentide karşılaştığınız hataları bildirin',  
	  report : 'Hata Bildir',
      save : 'Kaydet',
      save_settings : 'Şu anki ayarları kaydeder<b>!</b>&nbsp;',		  
	  newsticker : 'Haberleri gizle',  
	  event : 'Etkinlikleri gizle',  
	  logInPopup : 'Girişteki Bilgi Penceresini gizle',
	  birdswarm : 'Kuş sürüsünü gizle',  
	  hourlyRes : 'Saatlik üretimi gizle',  
	  onIkaLogs : 'IkaLog Savaş Raporu Dönüştürüsü kullan',  
	  playerInfo : 'Oyuncuya ait bilgileri göster',
	  control: 'Kontrol merkezini gizle',
	  alert: 'Bina Ayarları \'nda sadece bir adet seçeneği seçebilirsiniz!',
	  alert_palace: 'Lütfen öncelikle başkentinize gidiniz',
	  alert_toast: 'Veriler sıfırlanıyor, sayfa birkaç saniye içinde yenilenecektir',
	  alert_error: 'Güncellemeleri kontrol ederken hata oluştu: ',
	  alert_noUpdate: 'Son versiyonu kullanmaktasınız "',
	  alert_update: 'Yeni bir güncelleme var "',
	  alert_update1: 'Yükleme sayfasına gitmek istediğinize eminmisiniz?',
	  alert_daily: 'Lütfen \'Günlük bonusları otomatik onayla \' yı aktifleştiriniz',
	  en : 'English',  
      de : 'German',  
	  it : 'Italian',  
	  el : 'Greek',  
	  es : 'Spanish',  
	  fr : 'French',  
	  ro : 'Romanian',  
	  ru : 'Russian',  
	  cz : 'Czech',  
	  pl : 'Polish',  
	  ar : 'Arabic',  
	  ir : 'Persian',  
	  pt : 'Portuguese',  
	  tr : 'Türkçe',
	  nl : 'Hollandalı',
	  //settings descriptions  
	  cityOrder_description : 'cityOrder_description',  
	  fullArmyTable_description : 'Askeri sekmesinde bütün askeri birimleri gösterir',  
	  hideOnWorldView_description : 'Dünya haritasında bu pencereyi göstermez',  
	  hideOnIslandView_description : 'Ada görünümünde bu pencereyi göstermez',  
	  hideOnCityView_description : 'Şehir görünümünde bu pencereyi göstermez',  
	  onTop_description : 'Bu pencereyi her zaman İkariam pencerelerinin önünde gösterir',  
	  windowTennis_description : 'Farenizi hangi pencerenin üzerine getirirseniz o pencereyi en öne getirir',  
	  autoUpdates_description : 'Sizin yerinize her 24 saatte bir güncellemeleri kontrol eder',  
	  smallFont_description : 'Empire Overview \'da kullanılan yazı tiplerini küçültür',  
	  alternativeBuildingList_description : 'Binalar sekmesinde bütün binaları gösterir',
      compressedBuildingList_description : 'Binalar sekmesinde;<br>Lüks kaynak üretimi binalarını gruplar<br>Saray ve Valiliği gruplar',
	  wineWarningTime_description : 'Ekonomi sekmesinde, üzüm yeterliliği belirttiğiniz sürenin altına düşen kolonilerde \'kırmızı\' olarak gösterilir',
      wineOut_description : 'Disables the Ambrosia option to buy \'Out of Wine\'', //
	  dailyBonus_description : 'Günlük bonus otomatik olarak onaylanır<br>ve ekranda gösterilmez',
	  unnecessaryTexts_description: 'Binalardaki gereksiz açıklamaları gizler,<br>böylelikle pencereler daha az yer kaplar',
	  ambrosiaPay_description : 'Bazı Ambrosia\'lı işlemleri gizler',
	  languageChange_description : 'Dili buradan değiştirebilirsiniz',  
	  newsticker_description : 'GF-toolbar \'daki haberleri gizler',  
	  event_description : 'İkariam \'ın düzenlendiği etkinlikleri gizler',
      logInPopup_description : 'Giriş yapıldıktan sonra açılan Bilgilendirme Penceresini gizler',
	  birdswarm_description : 'Şehir ve ada görünümde uçan kuş sürülerini gizler',  
	  hourlyRes_description : 'Sol üst köşedeki bilgilendirme çubuğunda yer alan saatlik üretimi gizler',  
	  onIkaLogs_description : 'Savaş raporlarınızı IkaLogs kullanarak dönüştürür',  
	  playerInfo_description : 'Ada görünümünde adada yer alan oyuncular hakkında bilgileri gösterir',
	  control_description: 'Dünya, Ada ve Şehir görünümünde Kontrol merkezini gizler',
	  // settings categories  
	  visibility_category : '<b>Empire Overview Görünürlüğü</b>',  
	  display_category : '<b>Görünüm Ayarları</b>',  
	  global_category : '<b>Genel Ayarlar</b>',  
	  army_category : '<b>Ordu Ayarları</b>',  
	  building_category : '<b>Bina Ayarları</b>',  
	  resource_category : '<b>Üretim Ayarları</b>',  
	  language_category : '<b>Dil Ayarları</b>',  
	  // Helptable  
	  Initialize_Board : '<b>Diğer İşlemler</b>',  
	  on_your_Town_Hall : 'Belediye Binasını açmak için tıklayın',  
	  on_the_Troops : 'Şehirdeki birlikleri görüntülemek için tıklayın',  
	  on_Museum : 'Kültürel Eşya dağıtımı yapmak için tıklayın',  
	  on_Research_Advisor : 'Araştırmalara bakmak için tıklayın',  
	  on_your_Palace : 'Saraya gitmek için tıklayın',  
	  on_your_Finance : 'Bilançoya bakmak için tıklayın',  
	  on_the_Ambrosia : 'Ambrosia Shop \'u açmak için tıklayın',  
	  Re_Order_Towns : '<b>Şehir Sıralama</b>',  
	  Reset_Position : '<b>Pencere Pozisyonunu Sıfırla</b>',  
	  On_any_tab : 'Ekonomi / Binalar / Askeri sekmelerinden herhangi bir tanesinde şehir sıralamasını değiştirmek istiyorsanız,<br>şehrin sol tarafındaki lüks kaynak ikonunu aşağı/yukarı sürükleyerek şehir sıralamasını değiştirebilirsiniz',  
	  Right_click : 'Sol taraftaki Empire Overview butonunun üzerinde sağ tuşa tıklarsanız Empire Overview penceresinin<br>konumunu sıfırlayacaktır.',  
	  Navigate : '1, 2, 3 ... 0, *, - <b>:&nbsp;&nbsp;</b> Şehirlerinizi dolaşmanızı sağlar',  
	  Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Empire Overview \'ın Ekonomi / Binalar / Askeri sekmelerini açmanızı sağlar', // Setting/ Help tab
	  Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Şehirler / Ordu / Araştırma / Diplomasi pencerelerini açmanızı sağlar',  
	  Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Dünya / Ada / Şehir görünümlerini açmanızı sağlar',  
	  Spacebar : 'Spacebar<b>:&nbsp;&nbsp;</b> Pencereyi gizler / gösterir',  
	  Hotkeys : '<b>Kısayollar</b>',  
	  // formatting  
	  thousandSeperator : ',',  
	  decimalPoint:'.',  
	  click_:'<b>Tıkla</b>'          
	   },
	   nl:{                     // Thx Edel1965 for Translation
	  buildings: 'Gebouwen',  
	  economy: 'Economie',  
	  military: 'Militair',  
	  towns: 'Steden',  
	  academy_: 'Academie',  
	  townhall_: 'Stadhuis',  
	  dump_: 'Stort',  
	  warehouse_: 'Opslagplaats',  
	  tavern_level: 'Taverne Level',  
	  corruption: 'Corruptie',  
	  cultural: 'Culturele Goederen',  
	  population: 'Populatie',  
	  citizens: 'Inwoners',  
	  scientists: 'Onderzoekers',  
	  scientists_max: 'max. Onderzoekers',  
	  options: 'Opties',  
	  help: 'Help',  
	  agora: 'naar Agora',  
	  to_world: 'Toon Wereld',   
	  to_island: 'Toon Eiland',  
	  army_cost: 'Troepen kosten',  
	  fleet_cost: 'Vloot kosten',  
	  army_supply: 'Troepen Bevoorrading',  
	  fleet_supply: 'Vloot Bevoorrading',  
	  research_cost: 'Onderzoeks kosten',   
	  income: 'Inkomen',  
	  expenses: 'Kosten',  
	  balances: 'Balansen',  
	  espionage: 'Bekijk Spionage',  
	  contracts: 'Bekijk Contracten',  
	  combat: 'Bekijk Gevechten',  
	  satisfaction: 'Tevredenheid',  
	  total_ : 'totaal',  
	  max_Level : 'max. Level',  
	  actionP : 'Actie Punten',  
	  researchP : 'Onderzoeks Punten',  
	  finances_ : 'Balansen',  
	  free_ground : 'Vrije Bouwgrond',   
	  wood_ : 'Bouwmateriaal',  
	  wine_ : 'Wijn',  
	  marble_ : 'Marmer',   
	  crystal_ : 'Kristal Glas',   
	  sulphur_ : 'Zwavel',        
	  angry: 'Kwaad',  
	  unhappy: 'Ongelukkig',  
	  neutral: 'Neutraal',  
	  happy: 'Gelukkig',  
	  euphoric: 'Euforisch',        
	  housing_space: 'max. Woonruimte',  
	  free_Citizens: 'Vrije Inwoners',  
	  free_housing_space: 'Vrije Woonruimte',  
	  level_tavern: 'Level Taverne',  
	  maximum: 'maximaal',  
	  used: 'Gebruikt',  
	  plundergold: 'Goud',        
	  garrision: 'Garnizoenslimiet',  
	  Sea: 'Zee',  
	  Inland: 'Land',         
	  full: '0',
	  off: 'af',
	  time_to_full: 'Tot Vol',  
	  time_to_empty: 'Tot Leeg',  
	  capacity: 'Capaciteit',  
	  safe: 'Veilig',   
	  training: 'Training',        
	  plundering: 'Plundering',       
	  constructing: 'Uitbreiding Bezig',  
	  next_Level: 'Nodig voor Level',  
	  transport: 'Transporten',  
	  loading: 'Laden',  
	  en_route: 'Onderweg',  
	  arrived: 'Gearriveerd',  
	  to_town_hall: 'Naar Stadhuis',  
	  to_saw_mill: 'Naar de Houtmijn',  
	  to_mine: 'Naar de Luxegrondstof',  
	  to_barracks: 'Naar de Barakken',  
	  to_shipyard: 'Naar de Scheepswerf',  
	  member: 'Bekijk Ledenlijst',  
	  transporting: 'Transport naar',  
	  transporting_units: 'Stuur troepen naar',  
	  transporting_fleets: 'Stuur vloot naar',  
	  today: 'Vandaag',  
	  tomorrow: 'Morgen',  
	  yesterday: 'Gisteren',  
	  hour: 'U',  
	  day: 'D',  
	  week: 'W',  
	  hour_long: 'Uur',  
	  day_long: 'Dag',  
	  week_long: 'Week',  
	  ika_world: 'Zoek op Ikariam-World',  
	  charts: 'Toon Grafieken',  
	  //settings  
	  cityOrder : 'cityOrder',  
	  fullArmyTable : 'Toon alle militaire eenheden',  
      hideOnWorldView : 'Verberg in toon wereld',  
	  hideOnIslandView : 'Verberg in toon eiland',       
      hideOnCityView : 'Verberg in toon stad',  
	  onTop : 'Toon boven de ikariam schermen',  
	  windowTennis : 'Toon boven de ikariam schermen met muisaanwijzing',  
	  autoUpdates : 'Controleer automatisch op updates',  
	  smallFont : 'Gebruik een kleiner lettertype',  
	  alternativeBuildingList : 'Gebruik een alternatieve gebouwenlijst',
      compressedBuildingList : 'Gebruik een gecomprimeerde gebouwenlijst',
      wineOut : 'Hide Ambrosia Feature "Out of Wine"', //
	  dailyBonus : 'Ontvang je dagelijkse bonus automatisch',
  	  unnecessaryTexts : 'Verwijder onnodige omschrijvingen',
	  ambrosiaPay : 'Zet de koop nieuwe Ambrosia optie uit',
	  wineWarningTime : 'Resterende wijn waarschuwing',  
	  languageChange : 'Verander taal',  
	  current_Version : 'Huidige Versie<b>:</b>',
	  ikariam_Version : 'Ikariam Versie<b>:</b>',
	  reset : 'Reset all settings to default', //
	  goto_website : 'Ga naar de scriptpagina op Userscripts.com',  
	  website : 'Website',   
	  Check_for_updates : 'Controleer nu voor een update',  
	  check : 'Update controlle',   
	  Report_bug : 'Raporteer een fout in het script',  
	  report : 'Raporteer fout',
      save : 'Opslaan',
      save_settings : 'Opties opslaan<b>!</b>&nbsp;',		  
	  newsticker : 'verberg de nieuws banner',  
	  event : 'Verberg evenementen',  
	  logInPopup : 'Verberg het inlog infoscherm',
	  birdswarm : 'Verberg de vogelzwerm',  
	  hourlyRes : 'Verberg de goederen per uur',  
	  onIkaLogs : 'Gebruik de IkaLog Gevechtsraport Converter',  
	  playerInfo : 'Toon spelersinformatie',
	  control: 'Verberg de navigatiebalk',
	  alert: 'Kies slechts één optie AUB!',
	  alert_palace: 'Bezoek eerst je hoofdstad AUB',
	  alert_toast: 'Data Reset, de pagina wordt over een paar seconden herladen',
	  alert_error: 'Er is een fout geconstateerd tijdens het controleren op een update: ',
	  alert_noUpdate: 'Er is geen update beschikbaar voor "',
	  alert_update: 'Er is een update beschikbaar voor dit Greasemonkey script "',
	  alert_update1: 'Wil je nu naar de installatiepagina gaan?',
	  alert_daily: 'Schakel AUB \'Ontvang je dagelijkse bonus automatisch \' in',
	  en : 'Engels',  
      de : 'Duits',  
	  it : 'Italiaans',  
	  el : 'Grieks',  
	  es : 'Spaans',  
	  fr : 'Frans',  
	  ro : 'Roemeens',  
	  ru : 'Russisch',  
	  cz : 'Tsjechisch',  
	  pl : 'Pools',  
	  ar : 'Arabisch',  
	  ir : 'Perzisch',  
	  pt : 'Portugees',  
	  tr : 'Turks',
	  nl : 'Nederlands',	  
	  //settings descriptions  
	  cityOrder_description : 'cityOrder_description',  
	  fullArmyTable_description : 'Toon alle militaire eenheden op de militaire tab',  
	  hideOnWorldView_description : 'Verberg standaard op Toon wereld',  
	  hideOnIslandView_description : 'Verberg standaard op Toon eiland',  
	  hideOnCityView_description : 'Verberg standaard in Toon stad',  
	  onTop_description : 'Toon dit overzicht bovenop de Ikariam schermen',  
	  windowTennis_description : 'Brengt dit overzicht met je muis bovenop <br> Weer naar de achtergrond als de muis het scherm verlaat <br> Negeert \'Toon bovenop\’ optie',  
	  autoUpdates_description : 'Zet de automatische update controle aan <br>(één keer per 24 uur)',  
	  smallFont_description : 'Gebruik een kleiner lettertype in de tabs',  
	  alternativeBuildingList_description : 'Gebruik een alternatieve gebouwen overzicht',
      compressedBuildingList_description : 'Gebruik een gecomprimeerde gebouwen overzicht <br> Groepeert de luxegoederen productie gebouwen <br> Groepeerd de paleis/gouverneurswoning',
	  wineWarningTime_description : 'Resterende wijn tijd wordt, \'rood\' Vanaf dit moment',
      wineOut_description : 'Schakelt de Ambrosia optie om \'Out of Wine\’ te kopen uit', 
	  dailyBonus_description : 'De dagelijkse bonus zal automatisch worden geaccepteert <br> en het scherm zal niet meer worden getoond',
	  unnecessaryTexts_description: 'Verwijderd onnodige beschrijvingen in de gebouwen,<br>de bouwlijst van de gebouwen, minimaal scrollen',
	  ambrosiaPay_description : 'Schakelt de koop nieuwe Ambrosia optie uit <br> Klik op de knop om de actie te cancelen',
	  languageChange_description : 'Verander de taal',  
	  newsticker_description : 'Verberg de nieuwsbanner uit de GF-menubalk',  
	  event_description : 'Verberg de gebeurtenissen onder de adviseurs',
      logInPopup_description : 'Verberg het informatiescherm bij het inloggen',
	  birdswarm_description : 'Verberg de vogelzwerm bij toon eiland en stad',  
	  hourlyRes_description : 'Verberg het uur verbruik van de middelen in de infobalk',  
	  onIkaLogs_description : 'Gebruik IkaLogs voor je gevechtsraporten',  
	  playerInfo_description : 'Bekijk spelersinformatie in toon eiland',
	  control_description: 'Verberg de navigatiebalk in toon wereld, eiland en stad',
	  // settings categories  
	  visibility_category : '<b>Board Visibility</b>',  
	  display_category : '<b>Display Settings</b>',  
	  global_category : '<b>Globale Instellingen</b>',  
	  army_category : '<b>Militaire Instellingen</b>',  
	  building_category : '<b>Gebouwen Instellingen</b>',  
	  resource_category : '<b>Grondstoffen Instellingen</b>',  
	  language_category : '<b>Taal Instellingen</b>',  
	  // Helptable  
	  Initialize_Board : '<b>Instellen overzichtentab</b>',  
	  on_your_Town_Hall : 'Op jouw Stadhuis en bezoek iedere stad met dat scherm open',  
	  on_the_Troops : 'Op de \"Troepen in de stad\" tab aan de linker zijde en bezoek iedere stad met dat scherm open',  
	  on_Museum : 'Op je Museum en dan op de \"Verdeel cultureel-goederen\" tab',  
	  on_Research_Advisor : 'Op de onderzoeksadviseur en klik dan op elk van de 4 onderzoek tabs aan de linker kant',  
	  on_your_Palace : 'op jouw Paleis',  
	  on_your_Finance : 'op jouw Financiele tab',  
	  on_the_Ambrosia : 'op de \"Ambrosia shop\"',  
	  Re_Order_Towns : '<b>Re-Order Steden</b>',  
	  Reset_Position : '<b>Reset Positie</b>',  
	  On_any_tab : 'Bij elke tab, sleep de grondstof icoon naar de linker zijde van de stadsnaam',  
	  Right_click : 'Klik rechts op het empire menu button aan het linker pagina menu',  
	  Navigate : '1, 2, 3 … 0, –, = <b>:&nbsp;&nbsp;</b> Navigeer naar stad 1 tot 12',  
	  Navigate_to_City : 'SHIFT + 1/2/3/4/5 <b>:&nbsp;&nbsp;</b> Navigeer naar de Steden/ Gebouwen/ Militaire tab', // Setting/ Help tab
	  Navigate_to : 'Q, W, E, R <b>:&nbsp;&nbsp;</b> Navigeer naar Steden/ Militair/ Onderzoek/ Diplomatie adviseur',  
	  Navigate_to_World : 'SHIFT + Q, W, E <b>:&nbsp;&nbsp;</b> Navigeer naar het Wereld/ Eiland/ Stads overzicht',  
	  Spacebar : 'Spacebar<b>:&nbsp;&nbsp;</b> Minimaliseer/ Maximaliseer het overzicht',  
	  Hotkeys : '<b>Sneltoetsen</b>',  
	  // formatting  
	  thousandSeperator : ',',  
	  decimalPoint:'.',  
	  click_:'<b>Klik</b>'          
	   }
   },

  Resources   : {
    GOLD  : 'gold',
    WOOD  : 'wood',
    WINE  : 'wine',
    MARBLE: 'marble',
    GLASS : 'glass',
    SULFUR: 'sulfur'	
  },
  ResourceIDs : {
    GOLD  :	'gold',  
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
	  SOLDIER_EXCHANGE           : 2180,
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
	SPARTAN          : 'spartan',
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
    319: 'spartan',

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
    slinger             : {id: 301, type: 'army', position: 'army_ranged', minlevel: 2, baseTime: 90, baseCost: 2},
    swordsman           : {id: 302, type: 'army', position: 'army_flank', minlevel: 6, baseTime: 180, baseCost: 4},
    phalanx             : {id: 303, type: 'army', position: 'army_front_line', minlevel: 4, baseTime: 300, baseCost: 3},
    marksman            : {id: 304, type: 'army', position: 'army_ranged', minlevel: 13, baseTime: 600, baseCost: 3},
    mortar              : {id: 305, type: 'army', position: 'army_seige', minlevel: 14, baseTime: 2400, baseCost: 30},
    catapult            : {id: 306, type: 'army', position: 'army_seige', minlevel: 8, baseTime: 1800, baseCost: 25},
    ram                 : {id: 307, type: 'army', position: 'army_seige', minlevel: 2, baseTime: 600, baseCost: 15},
    steamgiant          : {id: 308, type: 'army', position: 'army_front_line', minlevel: 12, baseTime: 900, baseCost: 12},
    bombardier          : {id: 309, type: 'army', position: 'army_air', minlevel: 11, baseTime: 1800, baseCost: 45},
    cook                : {id: 310, type: 'army', position: 'army_support', minlevel: 5, baseTime: 1200, baseCost: 10},
    medic               : {id: 311, type: 'army', position: 'army_support', minlevel: 9, baseTime: 1200, baseCost: 20},
    gyrocopter          : {id: 312, type: 'army', position: 'army_air', minlevel: 10, baseTime: 900, baseCost: 15},
    archer              : {id: 313, type: 'army', position: 'army_ranged', minlevel: 7, baseTime: 240, baseCost: 4},
    spearman            : {id: 315, type: 'army', position: 'army_flank', minLevel: 1, baseTime: 60, baseCost: 1},
    spartan             : {id: 319, type: 'army', position: 'army_front_line', minLevel: 0, baseTime: 0, baseCost: 0},
    ship_ram            : {id: 210, type: 'fleet', position: 'navy_flank', minlevel: 1, baseTime: 2400, baseCost: 15},
    ship_flamethrower   : {id: 211, type: 'fleet', position: 'navy_front_line', minlevel: 4, baseTime: 1800, baseCost: 25},
    ship_submarine      : {id: 212, type: 'fleet', position: 'navy_seige', minlevel: 19, baseTime: 3600, baseCost: 50},
    ship_ballista       : {id: 213, type: 'fleet', position: 'navy_ranged', minlevel: 3, baseTime: 3000, baseCost: 20},
    ship_catapult       : {id: 214, type: 'fleet', position: 'navy_ranged', minlevel: 3, baseTime: 3000, baseCost: 35},
    ship_mortar         : {id: 215, type: 'fleet', position: 'navy_ranged', minlevel: 17, baseTime: 3000, baseCost: 50},
    ship_steamboat      : {id: 216, type: 'fleet', position: 'navy_front_line', minlevel: 15, baseTime: 2400, baseCost: 45},
    ship_rocketship     : {id: 217, type: 'fleet', position: 'navy_seige', minlevel: 11, baseTime: 3600, baseCost: 55},
    ship_paddlespeedship: {id: 218, type: 'fleet', position: 'navy_air', minlevel: 13, baseTime: 1800, baseCost: 5},
    ship_ballooncarrier : {id: 219, type: 'fleet', position: 'navy_air', minlevel: 7, baseTime: 3900, baseCost: 100},
    ship_tender         : {id: 220, type: 'fleet', position: 'navy_support', minlevel: 9, baseTime: 2400, baseCost: 100}
  },
  Government  : {
    ANARCHY     : 'anarchie',
	XENOCRACY   : 'xenokratie',
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
    PIRATE_FORTRESS    : 'pirateFortress',
	BLACK_MARKET       : 'blackMarket'
  },
  GovernmentData:{
    anarchie:{
	  corruptionPalace:0,
	  governors:0,
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
    xenokratie:{
	  corruptionPalace:0,
	  governors:0,	  
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
    ikakratie:{
	  corruptionPalace:0,
	  governors:0,	  
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
	  corruptionPalace:3,
	  governors:0.03,	  
      corruption:0, 
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
	  corruptionPalace:0,
	  governors:0,	  
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
	  corruptionPalace:0,
	  governors:0,	  
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
	  corruptionPalace:0,
	  governors:0,	  
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
	  corruptionPalace:0,
	  governors:0,	  
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
	  corruptionPalace:0,
	  governors:0,	  
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
	  corruptionPalace:0,
	  governors:0,	  
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
      wood:[64, 68, 115, 263, 382, 626, 982, 1330, 2004, 2665, 3916, 5156, 7446, 9753, 12751, 18163, 23691, 33451, 43571, 56729, 73832, 103459, 144203, 175058, 243930, 317208, 439967, 536310, 743789, 1027469, 1257244, 1736681],
      glass:[0, 0, 0, 0, 225, 428, 744, 1089, 1748, 2454, 3786, 5216, 7862, 10729, 14599, 21627, 29321, 43020, 58213, 78724, 106414, 154857, 224146, 282571, 408877, 552141, 795252, 1006647, 1449741, 2079650, 2642546, 3790581],
      marble:0,
      sulfur:0,
      wine:0,
      time:{a:1440, b:1, c:1.2, d:720},
      icon:'skin/img/city/academy_l.png',
      maxScientists:[0, 8, 12, 16, 22, 28, 35, 43, 51, 60, 69, 79, 89, 100, 111, 122, 134, 146, 159, 172, 185, 198, 212, 227, 241, 256, 271, 287, 302, 318, 335, 351, 368]
    },
    alchemist:{
      buildingId:22,
      maxLevel:32,
      wood:[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
      glass:0,
      marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
      sulfur:0,
      wine:0,
      time:{a:72000, b:11, c:1.1, d:6120},
      icon:'skin/img/city/alchemist_l.png'
    },
    architect:{
      buildingId:24,
      maxLevel:32,
      wood:[185, 291, 413, 555, 720, 911, 1133, 1390, 1689, 2035, 2437, 2902, 3443, 4070, 4797, 5640, 6618, 7754, 9070, 10598, 12369, 14424, 16807, 19573, 22780, 26501, 30817, 35826, 41631, 48371, 56185, 65251],
      glass:0,
      marble:[106, 160, 222, 295, 379, 475, 587, 716, 865, 1036, 1233, 1460, 1722, 2023, 2369, 2767, 3226, 3752, 4358, 5056, 5857, 6778, 7836, 9052, 10448, 12054, 13899, 16289, 18450, 21246, 24455, 28141],
      sulfur:0,
      wine:0,
      time:{a:125660, b:37, c:1.06, d:2628},
      icon:'skin/img/city/architect_l.png'
    },
    barracks:{
      buildingId:6,
	  maxLevel:54, 
      wood  :[48, 114, 195, 296, 420, 574, 766, 1003, 1297, 1662, 2115, 2676, 3371, 4234, 5304, 6630, 8275, 10314, 12843, 15979, 19868, 24690, 30669, 38083, 47277, 58676, 72812, 90341, 112076, 139028, 172448, 213889, 265276, 328996, 408008, 505984, 627473, 778121, 964924, 1196559, 1483787, 1839950, 2281591, 2829227, 3508295, 4350340, 5394474, 6689202, 8294664, 10285438, 12753995, 15815008, 19610663, 24317276],
      glass :0,
      marble:[0, 0, 0, 0, 0, 0, 0, 0, 178, 431, 745, 1134, 1616, 2214, 2956, 3875, 5015, 6429, 8183, 10357, 13052, 16395, 20540, 25680, 32054, 39957, 49757, 61909, 76977, 95661, 118830, 147560, 183185, 227359, 282136, 350059, 434283, 538722, 668224, 828808, 1027933, 1274849, 1581022, 1960678, 2431450, 3015210, 3739070, 4636658, 5749665, 7129795, 8841156, 10963244, 13594633, 16857554],
      sulfur:0,
      wine:0,
      time:{a:25200, b:11, c:1.1, d:1728},
      icon:'skin/img/city/barracks_l.png'
    },
	blackMarket:{
      buildingId:31,
      maxLevel: 25,
      wood:[440, 886, 1360, 1890, 2516, 3288, 4263, 5506, 7086, 9086, 11591, 14692, 18491, 23088, 28605, 35147, 42845, 51828, 62227, 74186, 87851, 103372, 120906, 140618, 162672],
      glass:0,
      marble:[259, 525, 807, 1126, 1508, 1988, 2600, 3390, 4403, 5693, 7315, 9331, 11809, 14812, 18423, 22711, 27761, 33659, 40491, 48355, 57343, 67556, 79099, 92078, 106603],
      sulfur:0,
      wine:0,
      time:{a:4321, b:1, c:1.1, d:4627},
      icon:'skin/img/city/blackmarket_l.png'
    },	
    branchOffice:{
      buildingId:13,
      maxLevel:32,
      wood:[48, 173, 346, 581, 896, 1314, 1863, 2580, 3509, 4706, 6241, 8203, 10699, 13866, 17872, 22926, 29286, 37272, 47283, 59806, 75447, 94954, 119245, 149453, 186977, 233530, 291225, 362658, 451015, 560208, 695038, 861391],
      glass:0,
      marble:[0, 0, 0, 0, 540, 792, 1123, 1555, 2115, 2837, 3762, 4945, 6450, 8359, 10774, 13820, 17654, 22469, 28503, 36051, 45482, 57240, 71883, 90092, 112712, 140776, 175556, 218617, 271878, 337705, 418983, 446564],
      sulfur:0,
      wine:0,
      time:{a:108000, b:11, c:1.1, d:9360},
      icon:'skin/img/city/branchoffice_l.png'
    },
    carpentering:{
      buildingId:23,
      maxLevel:32,
      wood:[63, 122, 191, 274, 372, 486, 620, 777, 962, 1178, 1432, 1730, 2078, 2486, 2964, 3524, 4178, 4945, 5841, 6890, 8117, 9550, 11229, 13190, 15484, 18166, 21299, 24963, 29245, 34247, 40096, 46930],
      glass:0,
      marble:[0, 0, 0, 0, 0, 0, 0, 359, 444, 546, 669, 816, 993, 1205, 1459, 1765, 2131, 2571, 3097, 3731, 4490, 5402, 6496, 7809, 9383, 11274, 13543, 16265, 19531, 23450, 28154, 33798],
      sulfur:0,
      wine:0,
      time:{a:125660, b:37, c:1.06, d:2808},
      icon:'skin/img/city/carpentering_l.png'
    },
    dump:{
      buildingId:29,
      maxLevel:40,
      wood:[640, 1152, 1766, 2504, 3388, 4450, 5724, 7253, 9088, 11289, 13931, 17101, 20905, 25470, 30948, 37522, 45410, 54876, 66236, 79867, 96223, 115852, 139407, 167672, 201592, 242293, 291136, 349749, 420081, 504483, 605763, 727300, 873143, 1048157, 1258171, 1510191, 1812613, 2175519, 2611007, 3133592],
      glass:[701, 1146, 1668, 2278, 2991, 3526, 4803, 5946, 7283, 8847, 10678, 12819, 15324, 18257, 21687, 25700, 30395, 35889, 42316, 49837, 58635, 68929, 80973, 95065, 111553, 130843, 153414, 179821, 201716, 246864, 289157, 338642, 396536, 464274, 543528, 636253, 744742, 871676, 1020187, 1193945],
      marble:[497, 932, 1445, 2051, 2762, 3609, 4604, 5778, 7164, 8799, 10728, 13005, 15691, 18862, 22602, 27016, 32225, 38371, 45623, 54181, 64278, 76194, 90256, 106847, 126424, 149528, 176787, 208956, 246913, 291702, 344555, 406921, 480512, 567350, 669817, 790730, 933408, 1101767, 1300431, 1534855],
      sulfur:[384, 845, 1398, 2061, 2858, 3813, 4960, 6336, 7987, 9968, 12346, 15199, 18623, 22731, 27661, 33578, 40677, 49197, 59420, 71688, 86409, 104076, 125274, 150714, 181241, 217872, 261830, 314581, 377881, 453842, 544994, 654378, 785637, 943149, 1132163, 1358979, 1631159, 1957774, 2349714, 2820041],
      wine:0,
      time:{a:32000, b:13, c:1.17, d:2160},
      icon:'skin/img/city/dump_l.png'
    },
    embassy:{
      buildingId:12,
      maxLevel:32,
      wood:[242, 415, 623, 873, 1173, 1532, 1964, 2482, 3103, 3849, 4743, 5817, 7105, 8651, 10507, 12733, 15610, 18498, 22457, 27074, 32290, 33764, 47240, 56812, 70157, 84318, 101310, 121979, 146503, 175932, 222202, 266778],
      glass:0,
      marble:[155, 342, 571, 850, 1190, 1606, 2112, 2730, 3484, 4404, 5527, 6896, 8566, 10604, 13090, 16123, 19824, 24339, 29846, 36564, 45216, 47097, 66967, 81859, 104537, 129580, 158759, 193849, 236659, 288888, 358869, 437985 ],
      sulfur:0,
      wine:0,
      time:{a:96000, b:7, c:1.05, d:10080},
      icon:'skin/img/city/embassy_l.png'
    },
    fireworker:{
      buildingId:27,
      maxLevel:32,
      wood:[272, 353, 445, 551, 673, 813, 974, 1159, 1373, 1618, 1899, 2223, 2596, 3025, 3517, 4084, 4736, 5485, 6346, 7338, 8478, 9790, 11297, 13030, 14990, 17317, 19954, 22986, 26472, 30484, 35096, 40398],
      glass:0,
      marble:[135, 212, 302, 405, 526, 665, 827, 1015, 1233, 1486, 1779, 2120, 2514, 2972, 3503, 4119, 4834, 5662, 6623, 7738, 9032, 10534, 12275, 13355, 16636, 19354, 22507, 26163, 30404, 35325, 41033, 47652],
      sulfur:0,
      wine:0,
      time:{a:125660, b:37, c:1.06, d:2628},
      icon:'skin/img/city/fireworker_l.png'
    },
    forester:{
      buildingId:18,
      maxLevel:32,
      wood:[250, 430, 664, 968, 1364, 1878, 2546, 3415, 4544, 6013, 7922, 10403, 13629, 17823, 23274, 30362, 39574, 51552, 67123, 87363, 113680, 147889, 192360, 250173, 325258, 423034, 550049, 715169, 929826, 1208878, 1571646, 2043246],
      glass:0,
      marble:[0, 104, 237, 410, 635, 928, 1309, 1803, 2446, 3282, 4368, 5781, 7617, 10422, 13108, 17142, 22386, 29204, 38068, 49589, 64569, 84041, 109356, 142266, 185046, 240663, 312965, 406956, 529144, 687989, 894489, 1162937],
      sulfur:0,
      wine:0,
      time:{a:72000, b:11, c:1.1, d:6120},
      icon:'skin/img/city/forester_l.png'
    },
    glassblowing:{
      buildingId:20,
      maxLevel:32,
      wood:[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
      glass:0,
      marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
      sulfur:0,
      wine:0,
      time:{a:72000, b:11, c:1.1, d:6120},
      icon:'skin/img/city/glassblowing_l.png'
    },
    museum:{
      buildingId:10,
      maxLevel:24,
      wood:[560, 1435, 2748, 4716, 7669, 12099, 18744, 28710, 43661, 66086, 99724, 150181, 225866, 339394, 509686, 765124, 1148280, 1723016, 2585120, 3878276, 5818010, 8727610, 13092010, 19638612],
      glass:0,
      marble:[280, 1190, 2573, 4676, 7871, 12729, 20112, 31335, 48394, 74323, 113736, 173643, 264701, 403110, 613492, 933272, 1419338, 2158157, 3281164, 4988135, 7582732, 11526516, 17521070, 26632791],
      sulfur:0,
      wine:0,
      time:{a:18000, b:1, c:1.1, d:14040},
      icon:'skin/img/city/museum_r.png'
    },
    optician:{
      buildingId:25,
      maxLevel:32,
      wood:[119, 188, 269, 362, 471, 597, 742, 912, 1108, 1335, 1600, 1906, 2261, 2673, 3152, 3706, 4348, 5096, 5962, 6966, 8131, 9482, 11050, 12868, 14978, 17424, 20262, 23553, 27373, 31804, 36943, 42904],
      glass:0,
      marble:[0, 35, 96, 167, 249, 345, 455, 584, 733, 905, 1106, 1338, 1608, 1921, 2283, 2704, 3191, 3759, 4416, 5178, 6062, 7087, 8276, 9656, 11257, 13113, 15267, 17762, 20662, 24024, 27922, 32447],
      sulfur:0,
      wine:0,
      time:{a:125660, b:37, c:1.06, d:2772},
      icon:'skin/img/city/optician_l.png'
    },
    palace:{
      buildingId:11,
      maxLevel:11,
      wood:[712, 5823, 16048, 36496, 77392, 159184, 322768, 649936, 1304272, 2612944, 4743517],
      glass:[0, 0, 0, 0, 21188, 42400, 84824, 169672, 339368, 678760, 1357543],
      marble:[0, 1433, 4546, 10770, 23218, 48114, 97906, 197490, 396658, 794994, 1591666],
      sulfur:[0, 0, 3088, 10300, 24725, 53573, 111269, 226661, 457445, 919013, 1842149],
      wine:[0, 0, 0, 10898, 22110, 44534, 89382, 179078, 358470, 717254, 1434821],
      time:{a:11520, b:1, c:1.4, d:0},
      icon:'skin/img/city/palace_l.png'
    },
    palaceColony:{
      buildingId:17,
      maxLevel:11,
      wood:[712, 5823, 16048, 36496, 77392, 159184, 322768, 649936, 1304272, 2612944, 4743517],
      glass:[0, 0, 0, 0, 21188, 42400, 84824, 169672, 339368, 678760, 1357543],
      marble:[0, 1433, 4546, 10770, 23218, 48114, 97906, 197490, 396658, 794994, 1591666],
      sulfur:[0, 0, 3088, 10300, 24725, 53573, 111269, 226661, 457445, 919013, 1842149],
      wine:[0, 0, 0, 10898, 22110, 44534, 89382, 179078, 358470, 717254, 1434821],
      time:{a:11520, b:1, c:1.4, d:0},
      icon:'skin/img/city/palaceColony_l.png'
    },
	pirateFortress:{
      buildingId:30,
      maxLevel: 30,
      wood:[450, 906, 1389, 1935, 2593, 3427, 4516, 5950, 7834, 10284, 13430, 17415, 22394, 28534, 36015, 45029, 55779, 68482, 83366, 100671, 120648, 143562, 169686, 199309, 232729, 270255, 312210, 358926, 410748, 468032],
      glass:0,
      marble:[250, 505, 783, 1112, 1534, 2103, 2883, 3949, 5388, 7296, 9782, 12964, 16970, 21938, 28019, 35370, 44162, 54573, 66793, 81020, 97463, 116341, 137883, 162325, 189915, 220912, 255580, 294197, 337048, 384429],
      sulfur:0,
      wine:0,
      time  :{a:1550, b:1, c:1.2, d:1800},
      icon:'skin/img/city/pirateFortress_l.png'
    },
    port:{
      buildingId:3,
      maxLevel:47,
      wood:[60, 150, 274, 429, 637, 894, 1207, 1645, 2106, 2735, 3537, 4492, 5689, 7103, 8850, 11094, 13731, 17062, 21097, 25965, 31810, 39190, 47998, 58713, 71955, 87627, 107102, 130776, 159019, 193938, 235849, 286514, 348718, 423990, 513947, 625160, 758178, 919693, 1116013, 1353517, 1642274, 1990223, 2411061],
      glass:0,
      marble:[0, 0, 0, 0, 0, 176, 326, 540, 791, 1138, 1598, 2176, 2928, 3859, 5051, 6628, 8566, 11089, 14265, 18241, 23197, 29642, 37636, 47703, 60556, 76367, 96639, 122156, 153754, 194089, 244300, 307174, 386955, 486969, 610992, 769302, 965792, 1212790, 1523570, 1913072, 2403313, 3015688, 3782992],
      sulfur:0,
      wine:0,
      time:{a:50400, b:23, c:1.15, d:1512},
      loadingSpeed:[10, 30, 60, 93, 129, 169, 213, 261, 315, 373, 437, 508, 586, 672, 766, 869, 983, 1108, 1246, 1398, 1565, 1748, 1950, 2172, 2416, 2685, 2980, 3305, 3663, 4056, 4489, 4965, 5488, 6064, 6698, 7394, 8161, 9004, 9931, 10951, 12073, 13308, 14666, 16159, 17803, 19616, 21613, 23813, 26237],
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
      wood:[98, 202, 324, 477, 671, 914, 1222, 1609, 2096, 2711, 3485, 4459, 5688, 7238, 9190, 11648, 14746, 18650, 23568, 29765, 37573, 47412, 59808, 75428, 95108, 119906, 151151, 190520, 240124, 302626, 381378, 480605],
      glass:0,
      marble:[0, 0, 0, 0, 0, 778, 1052, 1397, 1832, 2381, 3070, 3941, 5037, 6420, 8161, 10354, 13118, 16601, 20989, 26517, 33484, 42261, 53321, 67256, 84814, 106938, 134814, 169937, 214192, 269954, 340214, 428741],
      sulfur:0,
      wine:0,
      time:{a:64800, b:7, c:1.05, d:7128},
      icon:'skin/img/city/shipyard_l.png'
    },
    stonemason:{
      buildingId:19,
      maxLevel:32,
      wood:[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
      glass:0,
      marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
      sulfur:0,
      wine:0,
      time:{a:72000, b:11, c:1.1, d:6120},
      icon:'skin/img/city/stonemason_l.png'
    },
    temple:{
      buildingId:28,
      maxLevel:32,
      wood:[216, 228, 333, 465, 598, 760, 958, 1197, 1432, 1773, 2112, 2512, 3082, 3655, 4458, 5126, 6232, 7167, 8687, 10247, 11784, 14228, 16752, 19265, 23156, 26663, 32026, 36830, 43256, 50782, 59591, 68528],
      glass:[173, 190, 290, 423, 567, 752, 989, 1290, 1610, 2080, 2586, 3210, 4109, 5084, 6471, 7765, 9851, 11821, 14952, 18402, 22082, 27824, 34184, 41020, 51514, 61817, 77477, 92972, 113941, 139577, 170910, 205093],
      marble:0,
      sulfur:0,
      wine:0,
      time:{a:2160, b:1, c:1.1, d:0},
      icon:'skin/img/city/temple_l.png'
    },
    tavern:{
      buildingId:9,
      maxLevel:47,
      wood:[101, 222, 367, 541, 750, 1001, 1302, 1663, 2097, 2617, 3241, 3990, 4888, 5967, 7261, 8814, 10678, 12914, 15598, 18818, 22683, 27320, 32885, 39562, 47576, 57192, 68731, 82578, 99194, 119134, 143061, 171774, 206230, 247577, 297193, 356732, 428179, 513916, 616800, 740261, 888413, 1066196, 1279537, 1535545, 1842756, 2211407, 2653789 ],
      glass:0,
      marble:[0, 0, 0, 94, 122, 158, 206, 267, 348, 452, 587, 764, 993, 1290, 1677, 2181, 2835, 3685, 4791, 6228, 8097, 10526, 13684, 17789, 23125, 30063, 39082, 50806, 66048, 85862, 111621, 145107, 188640, 245232, 318801, 414441, 538774, 700406, 910528, 1183686, 1538791, 2000427, 2600557, 3380725, 4394943, 5713425, 7427454],
      sulfur:0,
      wine:0,
      time:{a:10800, b:1, c:1.06, d:10440},
      icon:'skin/img/city/taverne_r.png',
      wineUse:[0, 4, 8, 13, 18, 24, 30, 37, 44, 51, 60, 68, 78, 88, 99, 110, 122, 136, 150, 165, 180, 197, 216, 235, 255, 277, 300, 325, 351, 378, 408, 439, 472, 507, 544, 584, 626, 670, 717, 766, 818, 874, 933, 995, 1060, 1129, 1202, 1280, 1362]
    },
    townHall:{
      buildingId:0,
      maxLevel:40,
      wood:[0, 158, 335, 623, 923, 1390, 2015, 2706, 3661, 4776, 6173, 8074, 10281, 13023, 16424, 20986, 25423, 32285, 40232, 49286, 61207, 74804, 93956, 113035, 141594, 170213, 210011, 258875, 314902, 387656, 471194, 572580, 695615, 854728, 1037814, 1274043, 1714396, 1876185, 2276285, 2761291],
      glass:0,
      marble:[0, 0, 0, 0, 285, 551, 936, 1411, 2091, 2945, 4072, 5664, 7637, 10214, 13575, 18254, 23250, 31022, 40599, 52216, 68069, 87316, 115101, 145326, 191053, 241039, 312128, 403825, 515593, 666228, 850031, 1084292, 1382826, 1783721, 2273685, 2930330, 3692589, 4756439, 6058680, 7716365],
      sulfur:0,
      wine:0,
      time:{a:1800, b:1, c:1.17, d:-1080},
      icon:'skin/img/city/townhall_l.png',
      actionPointsMax:[3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13]
    },
    vineyard:{
      buildingId:26,
      maxLevel:32,
      wood:[339, 423, 520, 631, 758, 905, 1074, 1269, 1492, 1749, 2045, 2384, 2775, 3225, 3741, 4336, 5019, 5813, 6875, 7941, 8944, 10319, 11900, 13718, 15809, 18215, 20978, 24159, 27816, 32021, 36857, 42419],
      glass:0,
      marble:[123, 198, 285, 387, 504, 640, 798, 981, 1194, 1440, 1726, 2058, 2443, 2889, 3407, 4008, 4705, 5513, 6450, 7537, 8800, 10263, 11961, 13930, 16214, 18864, 21938, 25503, 29639, 34437, 40002, 46457],
      sulfur:0,
      wine:0,
      time:{a:125660, b:37, c:1.06, d:2232},
      icon:'skin/img/city/vineyard_l.png'
    },
    wall:{
      buildingId:8,
      maxLevel:48,
      wood:[114, 361, 657, 1012, 1439, 1951, 2565, 3302, 4186, 5247, 6521, 8049, 9882, 12083, 14724, 17892, 21695, 26258, 31733, 38304, 46189, 55650, 67004, 80629, 96979, 116599, 140143, 168395, 202298, 242982, 291802, 350387, 420689, 505049, 606284, 727765, 873541, 1048473, 1258393, 1510294, 1812577, 2175317, 2610603, 3132948, 3759764],
      glass:0,
      marble:[0, 203, 516, 892, 1344, 1885, 2535, 3315, 4251, 5374, 6721, 8338, 10279, 12608, 15402, 18755, 22779, 27607, 33402, 40355, 48699, 58711, 70726, 85144, 102446, 123208, 148122, 178019, 213896, 256948, 308610, 370605, 444998, 534270, 641397, 769949, 924213, 1109328, 1331467, 1598031, 1917913, 2301767, 2762392, 3315144, 3978446],
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
      marble:[0, 0, 0, 96, 211, 349, 515, 714, 953, 1240, 1584, 1997, 2492, 3086, 3800, 4656, 5683, 6915, 8394, 10169, 12299, 14855, 17922, 21602, 26019, 31319, 37678, 45310, 54468, 65458, 78645, 94471, 113461, 136249, 163595, 196409, 235787, 283041, 339745, 407790 ],
      sulfur:0,
      wine:0,
      time:{a:2880, b:1, c:1.14, d:2160},
      icon:'skin/img/city/warehouse_l.png'
    },
    winegrower:{
      buildingId:21,
      maxLevel:32,
      wood:[274, 467, 718, 1045, 1469, 2021, 2738, 3671, 4883, 6459, 8508, 11172, 14634, 19135, 24987, 32594, 42483, 55339, 72050, 93778, 122021, 158740, 206471, 268524, 349194, 454063, 590393, 767620, 998018, 1297535, 1686906, 2193088],
      glass:0,
      marble:[0, 116, 255, 436, 671, 977, 1375, 1892, 2564, 3437, 4572, 6049, 7968, 10462, 13705, 17921, 23402, 30527, 39790, 51830, 67485, 87835, 114289, 148680, 193389, 251512, 327069, 425294, 552986, 718987, 934789, 1215329],
      sulfur:0,
      wine:0,
      time:{a:72000, b:11, c:1.1, d:6120},
      icon:'skin/img/city/winegrower_l.png'
    },
    workshop:{
      buildingId:15,
      maxLevel:32,
      wood:[206, 383, 569, 781, 1023, 1299, 1613, 1972, 2380, 2846, 3377, 3982, 4672, 5458, 6355, 7377, 8542, 9870, 11385, 13111, 15078, 17714, 19481, 22796, 26119, 29909, 34228, 39153, 44766, 51166, 58462, 66778],
      glass:0,
      marble:[89, 167, 251, 349, 461, 592, 744, 920, 1125, 1362, 1637, 1956, 2326, 2755, 3253, 3831, 4500, 5279, 6180, 7226, 8439, 9776, 11477, 13373, 15570, 18118, 21074, 24503, 28481, 33095, 38447, 44656],
      sulfur:0,
      wine:0,
      time:{a:96000, b:7, c:1.05, d:11880},
      icon:'skin/img/city/workshop_l.png'
    }
  }
};

Constant.buildingOrder = {
  growth   : [Constant.Buildings.TOWN_HALL, Constant.Buildings.PALACE, Constant.Buildings.GOVERNORS_RESIDENCE, Constant.Buildings.TAVERN, Constant.Buildings.MUSEUM],
  research : [Constant.Buildings.ACADEMY, Constant.Buildings.WORKSHOP, Constant.Buildings.TEMPLE],
  diplomacy: [Constant.Buildings.EMBASSY],
  trading  : [Constant.Buildings.WAREHOUSE, Constant.Buildings.DUMP, Constant.Buildings.TRADING_PORT, Constant.Buildings.TRADING_POST, Constant.Buildings.BLACK_MARKET],
  military : [Constant.Buildings.WALL, Constant.Buildings.HIDEOUT, Constant.Buildings.BARRACKS, Constant.Buildings.SHIPYARD],
  wood     : [Constant.Buildings.FORESTER, Constant.Buildings.CARPENTER],
  wine     : [Constant.Buildings.WINERY, Constant.Buildings.VINEYARD],
  marble   : [Constant.Buildings.STONEMASON, Constant.Buildings.ARCHITECT],
  crystal  : [Constant.Buildings.GLASSBLOWER, Constant.Buildings.OPTICIAN],
  sulfur   : [Constant.Buildings.ALCHEMISTS_TOWER, Constant.Buildings.FIREWORK_TEST_AREA],
  piracy   : [Constant.Buildings.PIRATE_FORTRESS]
};
Constant.altBuildingOrder = {
  growth    : [Constant.Buildings.TOWN_HALL, Constant.Buildings.PALACE, Constant.Buildings.GOVERNORS_RESIDENCE, Constant.Buildings.TAVERN, Constant.Buildings.MUSEUM],
  research  : [Constant.Buildings.ACADEMY, Constant.Buildings.WORKSHOP, Constant.Buildings.TEMPLE],
  diplomacy : [Constant.Buildings.EMBASSY],
  trading   : [Constant.Buildings.WAREHOUSE, Constant.Buildings.DUMP, Constant.Buildings.TRADING_PORT, Constant.Buildings.TRADING_POST, Constant.Buildings.BLACK_MARKET],
  military  : [Constant.Buildings.WALL, Constant.Buildings.HIDEOUT, Constant.Buildings.BARRACKS, Constant.Buildings.SHIPYARD],
  production: [Constant.Buildings.FORESTER, Constant.Buildings.WINERY, Constant.Buildings.STONEMASON, Constant.Buildings.GLASSBLOWER, Constant.Buildings.ALCHEMISTS_TOWER],
  reducton  : [Constant.Buildings.CARPENTER, Constant.Buildings.VINEYARD, Constant.Buildings.ARCHITECT, Constant.Buildings.OPTICIAN, Constant.Buildings.FIREWORK_TEST_AREA],
  piracy    : [Constant.Buildings.PIRATE_FORTRESS]
};
Constant.compBuildingOrder = {
  growth    : [Constant.Buildings.TOWN_HALL, 'colonyBuilding', Constant.Buildings.PALACE, Constant.Buildings.GOVERNORS_RESIDENCE, Constant.Buildings.TAVERN, Constant.Buildings.MUSEUM],
  research  : [Constant.Buildings.ACADEMY, Constant.Buildings.WORKSHOP, Constant.Buildings.TEMPLE],
  diplomacy : [Constant.Buildings.EMBASSY],
  trading   : [Constant.Buildings.WAREHOUSE, Constant.Buildings.DUMP, Constant.Buildings.TRADING_PORT, Constant.Buildings.TRADING_POST, Constant.Buildings.BLACK_MARKET],
  military  : [Constant.Buildings.WALL, Constant.Buildings.HIDEOUT, Constant.Buildings.BARRACKS, Constant.Buildings.SHIPYARD],
  production: [Constant.Buildings.FORESTER, 'productionBuilding', Constant.Buildings.WINERY, Constant.Buildings.STONEMASON, Constant.Buildings.GLASSBLOWER, Constant.Buildings.ALCHEMISTS_TOWER],
  reducton  : [Constant.Buildings.CARPENTER, Constant.Buildings.VINEYARD, Constant.Buildings.ARCHITECT, Constant.Buildings.OPTICIAN, Constant.Buildings.FIREWORK_TEST_AREA],
  piracy    : [Constant.Buildings.PIRATE_FORTRESS]
};
Constant.unitOrder = {
  army_front_line: [Constant.Military.HOPLITE, Constant.Military.SPARTAN, Constant.Military.STEAM_GIANT],
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
        unsafeWindow.empire = {
            s       : empire,
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

empire.Init();
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

/**************************************************************************
*  for IkaLogs
***************************************************************************/

function addScript(src) {
    var scr = document.createElement('script');
    scr.type = 'text/javascript';
    scr.src  = src;
    document.getElementsByTagName('body')[0].appendChild(scr);
}
})(jQuery);