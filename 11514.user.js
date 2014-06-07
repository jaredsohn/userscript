// ==UserScript==
// @name           Planzo Countdown
// @namespace      http://greasemonkey.kramers.ws/
// @description    Puts a ticking countdown in the mouseovers of events on your calendar at Planzo.com
// @include        *//*.planzo.com/*
// @include        *//planzo.com/*
// ==/UserScript==

unsafeWindow['showCellDetails'] = function(a){
	a=unsafeWindow.fixEvent(a);
	if(this.event!=null) {
		var txt="<i>event:</i> "+this.event.subject;
		txt+="<br><i>details:</i> "+this.event.eventdesc;
		if(this.event.stime!=unsafeWindow._NOTIME) {
			txt+="<br><i>time:</i> "+
				unsafeWindow.timeToString(this.event.stime,unsafeWindow._CLOCK)+"&nbsp;to&nbsp;"+
				unsafeWindow.timeToString(this.event.etime,unsafeWindow._CLOCK);
			txt+='<div id="ttcountdown"></div>';
		}
		txt+="<br><i>date:</i> "+
			unsafeWindow.dateToString(new Array(this.event.smonth,this.event.sday,this.event.syear));
		if(unsafeWindow._DEBUG||unsafeWindow._DEBUG2||unsafeWindow._DEBUG3)
			txt = unsafeWindow.eventToString(this.event);
		unsafeWindow.showToolTip(
			a.clientX+document.body.scrollLeft+10,
			a.clientY+document.body.scrollTop+10,
			txt
		);
		if(this.event.stime!=unsafeWindow._NOTIME) {
		var aja = '';
		for (var x in this.event) {
			aja += x+' = '+this.event[x]+'\n';
		}
		var time = unsafeWindow.timeToString(this.event.stime, unsafeWindow._24HOURCLOCK);
		var tmp = time.split(':');
		// 'MonthName, DayNr Year Hrs:Min:Sec'
		var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
		var dateString = months[this.event.smonth-1]+', '+this.event.sday+' '+this.event.syear+' '+tmp[0]+':'+tmp[1]+':00';
		cdDate = new Date(dateString);
		cd = new Countdown({
			display: new TextDisplay(document.getElementById('ttcountdown')),
			targetDate: cdDate,
			REMatZero: function() { alert('ZERO'); }
		});
	}
		unsafeWindow.toolTipStyle().fontSize="12px";
	}
	a.cancelBubble=true;
	if(a.stopPropagation) a.stopPropagation();
	return false;
};


/**
 * Countdown by Kramer <http://countdown.kramers.ws/>
 * 051224
 *
 * Documentation pending.
 */
function Countdown(settings) {
	this.s_targetDate    = null;                        // Must be a date object
	this.s_display       = null;
	this.s_atZero        = null;
	this.s_decimalPlaces = 2;
	this.s_updateInterval= null;
	this.s_format        = '%days:%hours:%minutes:%seconds';
	this.s_loadTime      = null;
	this.s_countUp       = true;
	this.s_factors = {
		years: 31557600000,
		weeks: 604800000,
		days: 86400000,
		hours: 3600000,
		minutes: 60000,
		seconds: 1000,
		deciseconds: 100,
		milliseconds: 1
	};
	this.interval        = null;
	this.future          = null;
	this.errors          = new Array();
	this.settings        = settings;

	this.construct = function() {
		// Import settings
		for (var key in this.settings) {
			this['s_'+key] = this.settings[key];
		}

		if (this.s_targetDate == null || this.s_targetDate.toString().indexOf('Invalid') != -1) {
			this.error('Invalid date!\n'+this.s_targetDate);
		} else {
			if (this.s_updateInterval == null) {
				// Autodetect an update interval
				var smallestUnitUsed = null;
				for (var unit in this.s_factors) {
					var unitMCI = '\%'+unit;
					if (this.s_format.indexOf(unitMCI) != -1) {
						// This unit is used in the format string
						if (this.s_factors[unit] < smallestUnitUsed || smallestUnitUsed == null) {
							// This unit beats the previous
							smallestUnitUsed = this.s_factors[unit];
						}
					}
				}
				if (!smallestUnitUsed > 0) {
					this.error('Could not autodetect an update interval.');
					this.s_updateInterval = 1000; // 1 second fallback update interval
				} else {
					this.s_updateInterval = smallestUnitUsed;
				}
			}
			this.tick();
			if (Function.prototype.closure) {
				this.interval = setInterval(this.tick.closure(this), this.s_updateInterval);
			} else {
				this.error('Function::closure() not found!  The closure extention is vital to CountDown.js.');
			}
		}
	}

	this.tick = function() {
		var now = new Date();
		var timeLeft = this.s_targetDate.valueOf() - now.valueOf();
		var ms = Math.abs(timeLeft);
		var future = (timeLeft == Math.abs(timeLeft));
		if (this.future != null && this.future != future) {  // Zeropoint detection
			this.s_atZero();
			clearInterval(this.interval);
		}
		this.future = future;

		var digitSet = new Array();
		var measurements = {};
		var text = this.s_format;
		for (unit in this.s_factors) {
			var unitMCI = '\%'+unit;
			var factor = this.s_factors[unit];
			var qty = Math.floor(ms/this.s_factors[unit]);
			if (this.s_format.indexOf(unitMCI) != -1) {
				ms -= qty*this.s_factors[unit];
				measurements[unit] = [qty.zeropad(this.s_decimalPlaces)];
				var tmp = new RegExp(unitMCI);
				var text = text.replace(tmp, qty.zeropad(this.s_decimalPlaces));
			}
		}
		switch (typeof(this.s_display)) {
			case 'function':
				this.s_display(text);
			break;
			case 'object':
				this.s_display.update(text);
			break;
			default:
				this.error('Display type not recognized.\nIt must be an object with an update() method, or a function.');
			break;
		}
	}

	Number.prototype.zeropad = function(places) {
		len = this.toString().length;
		newVal = '';
		for (x=0; x<places-len; x++) {
			newVal += '0';
		}
		newVal += this.toString();
		return newVal;
	}

	this.setVar = function(name, value) {
		this['s_'+name] = value;
	}

	this.error = function(text) {
		this.errors.push(text);
		alert("CountDown.js Error:\n____________________\n"+text);
	}

	this.construct();
}


function TextDisplay(parentNode) {
	this.container = parentNode;
	this.initialized = false;

	/**
	 * Generates the DOM nodes and inserts them as a child of
	 * the specified element.
	 */
	this.generate = function() {
		this.container.innerHTML = '';
		this.initialized = true;
	}

	this.update = function(newValue) {
		if (!this.initialized) this.generate();
		if (this.initialized) {
			tmp = this.container;
			tmp.innerHTML = newValue;
		} else {
			this.error('Container is uninitialized.  Could not initialize.');
		}
	}

	this.error = function(text) {
		alert('TextDisplay Error: '+text);
	}
}


Function.prototype.closure = function(obj) {
	// Extends the Function object, adding a closure() method which
	// fixes circular references and MSIE's lack of garbage collection
	// as a result thereof.
	//
	// From: http://laurens.vd.oever.nl/weblog/items2005/closures/
	//
	// Init object storage.
	if (!window.__objs)
	{
		window.__objs = [];
		window.__funs = [];
	}

	// For symmetry and clarity.
	var fun = this;

	// Make sure the object has an id and is stored in the object store.
	var objId = obj.__objId;
	if (!objId)
		__objs[objId = obj.__objId = __objs.length] = obj;

	// Make sure the function has an id and is stored in the function store.
	var funId = fun.__funId;
	if (!funId)
		__funs[funId = fun.__funId = __funs.length] = fun;

	// Init closure storage.
	if (!obj.__closures)
		obj.__closures = [];

	// See if we previously created a closure for this object/function pair.
	var closure = obj.__closures[funId];
	if (closure)
		return closure;

	// Clear references to keep them out of the closure scope.
	obj = null;
	fun = null;

	// Create the closure, store in cache and return result.
	return __objs[objId].__closures[funId] = function ()
	{
		return __funs[funId].apply(__objs[objId], arguments);
	};
};