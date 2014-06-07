// ==UserScript==
// @name           Market Resources Filler
// @namespace      http://code.google.com/p/plemiona-skrypty/
// @description    Automatyczne uzupełnianie surowców na rynku.
// @version        1.0.0010
// @include        http://pl*.plemiona.pl/game.php*screen=market*
// @license        Creative Commons 2.5 BY-SA (http://creativecommons.org/licenses/by-sa/2.5/deed.pl)
// @author         Nexces
// ==/UserScript==


if ((typeof unsafeWindow) == "undefined") {
	unsafeWindow = window;
}
String.prototype.htmlentities = function () {
	return this.replace(/</g,'&lt').replace(/>/g,'&gt');
};
unsafeWindow.marketResourcesFiller = {

	/* universalConsoleLogger section */
	scriptVerbosity : 5,
	useCallTracing : false,
	useInternalConsoleFirst : true,
	forceConsoleLoading : false,
	universalConsoleLoggerURL : null,
	log : function(msg, msgLvl) {
	    try {
		if ((typeof msgLvl) == "undefined") {msgLvl = 1;}
	    if (msgLvl > this.scriptVerbosity) {return;}
	    if (typeof $LOG != 'undefined') {$LOG(msg,msgLvl); return; };
        if ((typeof console) != "undefined") {if ((typeof console.log) != "undefined") {console.log(msg);return;}}
        if (window.opera) {window.opera.postError(msg);return;}
	    } catch (e) {}
        return;
	    if (msgLvl <= this.scriptVerbosity) {
	        if ($LOG) {$LOG(msg,msgLvL); return;}
	        if (this.useInternalConsoleFirst) {
	        }
	        if ((typeof unsafeWindow.universalConsoleLogger) == "undefined") {
	            if (this.forceConsoleLoading) {
	                if (this.universalConsoleLoggerURL == null) {return void(0);}
	                if (this.consoleLoaderState == 0) {this.consoleLoader();this.consoleLoaderState = 1;}
	                if (this.consoleLoaderState == 1) {this.delayedConsoleMessages.push(msg+'#delim#'+msgLvl);}
	                if (this.consoleLoaderState == 2) {this.forceConsoleLoading = false;}}
	                return;
	        } else {
	            if ((typeof unsafeWindow.universalConsoleLogger.log) == "undefined") {return;}
	            else {
	                if (this.consoleLoaderState == 1) {
	                    try {
	                        clearInterval(unsafeWindow.universalConsoleLoggerWait);
	                       this.delayedConsoleMessages.push(msg+'#delim#'+msgLvl);
	                       this.consoleLoaderState = 4;this.dumpDelayedMessages();
	                    } catch (e) {
	                        alert(e.description);}
	                }
	                unsafeWindow.universalConsoleLogger.log(msg, this.useCallTracing);
	            }
	        }
	    }
	},

	consoleLoader : function () {try {var universalConsoleLoggerLoader = document.createElement('script');universalConsoleLoggerLoader.setAttribute('type','text/javascript');universalConsoleLoggerLoader.setAttribute('src',this.universalConsoleLoggerURL);universalConsoleLoggerLoader.setAttribute('id','universalConsoleLoggerScriptHolder');document.getElementsByTagName('head')[0].appendChild(universalConsoleLoggerLoader);universalConsoleLoggerLoader = void(0);unsafeWindow.universalConsoleLoggerWait=setInterval(" if ((typeof universalConsoleLogger)!='undefined') { try { clearInterval(unsafeWindow.universalConsoleLoggerWait); universalConsoleLogger.log('clearInterval succesful'); } catch (e) { universalConsoleLogger.log('still trying to clearInterval after loading console: '+e.description); } villagePreviewEnhancer.consoleLoaderState = 3; try { villagePreviewEnhancer.dumpDelayedMessages(); } catch (e) {} } else if (villagePreviewEnhancer.consoleLoaderState == 2) { clearInterval(unsafeWindow.universalConsoleLoggerWait); } ",500);} catch (e) {this.consoleLoaderState = 2;alert('universalConsoleLoader loading failed. (try())'+"\n"+e.description);}},
	dumpDelayedMessages : function () {try {this.log('init: '+this.delayedConsoleMessages.length+' messages pending');for (var i=0; i<this.delayedConsoleMessages.length; i++) {if (this.delayedConsoleMessages[i] != null) {this.log(this.delayedConsoleMessages[i].split('#delim#')[0], this.delayedConsoleMessages[i].split('#delim#')[1]);this.delayedConsoleMessages[i] = null;} else {this.log(i+': dumpDelayedMessages encountered `null` message');}}this.delayedConsoleMessages = new Array();this.consoleLoaderState = 3;} catch (e) {this.log(e.description);}return void(0);},
	delayedConsoleMessages : new Array(),
	consoleLoaderState : 0, // 0 - never launched, 1 - runnig, 2 - finished (console NOT loaded), 3 - finished (console loaded)
	/* endof universalConsoleLogger section */

	totalCapacity : null,
	getWood : function () { return parseInt(document.getElementById('wood').innerHTML); },
	getClay : function () { return parseInt(document.getElementById('stone').innerHTML); },
	getIron : function () { return parseInt(document.getElementById('iron').innerHTML); },
	setWood : function (val) { unsafeWindow.document.forms.units.wood.value = val; },
	setClay : function (val) { unsafeWindow.document.forms.units.stone.value = val; },
	setIron : function (val) { unsafeWindow.document.forms.units.iron.value = val; },
	getStorage : function () { return parseInt(document.getElementById('storage').textContent); },
	verifyLocationScreen : function () {
		if (document.URL.match(/screen=market/)) {
			return true;
		} else {
			this.log('MRF::verifyLocationScreen() => marketResourcesFiller can be launched only from within market', 0);
			return false;
		}
	},
	getMarketMode : function () {
		if (!document.URL.match(/mode/)) {
			this.log('MRF::getMarketMode() => mode set to `send`', 1);
			return 'send';
		} else {
			this.log('MRF::getMarketMode => mode is: '+document.URL.match(/mode=(\w+)/)[1], 1);
			return document.URL.match(/mode=(\w+)/)[1];
		}
	},
	maxCapacity : function() {
		if (this.totalCapacity == null) {
			if (document.forms[0].parentNode.getElementsByTagName('table')) {
				try {
					this.totalCapacity = document.forms[0].parentNode.getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.match(/[0-9]+/)[0];
					this.totalCapacity = parseInt(this.totalCapacity);
				} catch (e) {
					this.log('MRF::maxCapacity() => Error: `'+e.description+'` occured while trying to find maxCapacity', 0);
					this.totalCapacity = 0;
				}
				if (this.totalCapacity == null) {
					this.log('MRF::maxCapacity() => totalCapacity scan failed', 1);
					this.totalCapacity = 0;
				}
			} else {
				return 0;
			}
			this.log('MRF::maxCapacity() => max capacity is: '+this.totalCapacity, 1);
		}
		return this.totalCapacity;
	},
	fillMax : function (submitForm) {
	    this.log('MRF::fillMax();', 1);
	    if (!this.verifyLocationScreen() || this.getMarketMode() != 'send') {
			return void(0);
		}
		if ((typeof submitForm) == "undefined") {
			submitForm = false;
		}
		if (this.maxCapacity() == 0) {
			this.log('MRF::fillMax() => capacity is 0 -> bailing out', 1);
			return void(0);
		}
		var allowance = Math.floor(this.maxCapacity()/3);
		// equality
		if (this.getWood() == this.getClay() && this.getWood() == this.getIron()) {
			this.log('MRF::fillMax() => wood == clay == iron', 2);
			this.fillStandard();
			if (submitForm) { this.submitOwn(); }
			return void(0);
		}
		// everything is above capacity
		if (this.getWood() >= allowance && this.getClay() >= allowance && this.getIron() >= allowance) {
			this.log('MRF::fillMax() => wood && clay && iron > '+allowance, 2);
			this.fillStandard();
			if (submitForm) { this.submitOwn(); }
			return void(0);
		}

		// wood is lowest resource
		if (this.getWood() < this.getClay() && this.getWood() < this.getIron() && this.getWood() < allowance) {
			this.log('MRF::fillMax() => wood < clay && wood < iron && wood < allowance', 2);
			this.setWood(this.getWood());
			var reminder = Math.floor((this.maxCapacity()-this.getWood())/2);
			this.log('MRF::fillMax() => wood set to: '+this.getWood()+'; space left: '+reminder, 2);
			if (this.getClay() < this.getIron() && this.getClay() < reminder) {
				this.log('MRF::fillMax() => clay < iron && clay < reminder', 2);

				this.setClay(this.getClay());
				reminder = reminder*2-this.getClay();
				this.log('MRF::fillMax() => clay set to: '+this.getClay()+'; space left: '+reminder, 2);
				if (this.getIron() < reminder) {
					this.setIron(this.getIron());
					this.log('MRF::fillMax() => iron set to: '+this.getIron(), 2);
				} else {
					this.setIron(reminder);
					this.log('MRF::fillMax() => iron set to: '+reminder, 2);
				}
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
			if (this.getIron() < this.getClay() && this.getIron() < reminder) {
				this.log('MRF::fillMax() => iron < clay && iron < reminder', 2);
				this.setIron(this.getIron());
				reminder = reminder*2-this.getIron();
				this.log('MRF::fillMax() => iron set to: '+this.getIron()+'; space left: '+reminder, 2);
				if (this.getClay() < reminder) {
					this.setClay(this.getClay());
					this.log('MRF::fillMax() => clay set to: '+this.getClay(), 2);
				} else {
					this.setClay(reminder);
					this.log('MRF::fillMax() => clay set to: '+reminder, 2);
				}
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
			this.setClay(this.getClay() < reminder ? this.getClay() : reminder);
			this.log('MRF::fillMax() => clay set to: '+(this.getClay() < reminder ? this.getClay() : reminder), 2);
			this.setIron(this.getIron() < reminder ? this.getIron() : reminder);
			this.log('MRF::fillMax() => iron set to: '+(this.getIron() < reminder ? this.getIron() : reminder), 2);
			if (submitForm) { this.submitOwn(); }
			return void(0);
			// ...
		}
		// clay is the lowest resource
		if (this.getClay() < this.getWood() && this.getClay() < this.getIron() && this.getClay() < allowance) {
			this.log('MRF::fillMax() => clay < wood && clay < iron && clay < allowance', 2);
			this.setClay(this.getClay());
			var reminder = Math.floor((this.maxCapacity()-this.getClay())/2);
			this.log('MRF::fillMax() => clay set to: '+this.getClay()+'; space left: '+reminder, 2);
			if (this.getWood() < this.getIron() && this.getWood() < reminder) {
				this.log('MRF::fillMax() => wood < iron && wood < reminder', 2);
				this.setWood(this.getWood());
				reminder = reminder*2-this.getWood();
				this.log('MRF::fillMax() => wood set to: '+this.getWood()+'; space left: '+reminder, 2);
				if (this.getIron() < reminder) {
					this.setIron(this.getIron());
					this.log('MRF::fillMax() => iron set to: '+this.getIron(), 2);
				} else {
					this.setIron(reminder);
					this.log('MRF::fillMax() => iron set to: '+reminder, 2);
				}
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
			if (this.getIron() < this.getWood() && this.getIron() < reminder) {
				this.log('MRF::fillMax() => iron < wood && iron < reminder', 2);
				this.setIron(this.getIron());
				reminder = reminder*2-this.getIron();
				this.log('MRF::fillMax() => iron set to: '+this.getIron()+'; space left: '+reminder, 2);
				if (this.getWood() < reminder) {
					this.setWood(this.getWood());
					this.log('MRF::fillMax() => wood set to: '+this.getWood(), 2);
				} else {
					this.setWood(reminder);
					this.log('MRF::fillMax() => wood set to: '+reminder, 2);
				}
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
			this.setWood(this.getWood() < reminder ? this.getWood() : reminder);
			this.log('MRF::fillMax() => wood set to: '+(this.getWood() < reminder ? this.getWood() : reminder), 2);
			this.setIron(this.getIron() < reminder ? this.getIron() : reminder);
			this.log('MRF::fillMax() => iron set to: '+(this.getIron() < reminder ? this.getIron() : reminder), 2);
			if (submitForm) { this.submitOwn(); }
			return void(0);
			// ...
		}
		// iron is the lowest resource
		if (this.getIron() < this.getWood() && this.getIron() < this.getClay() && this.getIron() < allowance) {
			this.log('MRF::fillMax() => iron < wood && iron < clay && iron < allowance', 2);
			this.setIron(this.getIron());
			var reminder = Math.floor((this.maxCapacity()-this.getIron())/2);
			this.log('MRF::fillMax() => iron set to: '+this.getIron()+'; space left: '+reminder, 2);
			if (this.getWood() < this.getClay() && this.getWood() < reminder) {
				this.log('MRF::fillMax() => wood < clay && wood < reminder', 2);
				this.setWood(this.getWood());
				reminder = reminder*2-this.getWood();
				this.log('MRF::fillMax() => wood set to: '+this.getWood()+'; space left: '+reminder, 2);
				if (this.getClay() < reminder) {
					this.setClay(this.getClay());
					this.log('MRF::fillMax() => clay set to: '+this.getClay(), 2);
				} else {
					this.setClay(reminder);
					this.log('MRF::fillMax() => clay set to: '+reminder, 2);
				}
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
			if (this.getClay() < this.getWood() && this.getClay() < reminder) {
				this.log('MRF::fillMax() => clay < iron && clay < reminder', 2);
				this.setClay(this.getClay());
				reminder = reminder*2-this.getClay();
				this.log('MRF::fillMax() => clay set to: '+this.getClay()+'; space left: '+reminder, 2);
				if (this.getWood() < reminder) {
					this.setWood(this.getWood());
					this.log('MRF::fillMax() => wood set to: '+this.getWood(), 2);
				} else {
					this.setWood(reminder);
					this.log('MRF::fillMax() => wood set to: '+reminder, 2);
				}
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
			this.setWood(this.getWood() < reminder ? this.getWood() : reminder);
			this.log('MRF::fillMax() => wood set to: '+(this.getWood() < reminder ? this.getWood() : reminder), 2);
			this.setClay(this.getClay() < reminder ? this.getClay() : reminder);
			this.log('MRF::fillMax() => clay set to: '+(this.getClay() < reminder ? this.getClay() : reminder), 2);
			if (submitForm) { this.submitOwn(); }
			return void(0);
			// ...
		}
		// wood == clay
		if (this.getWood() == this.getClay()) {
			this.log('MRF::fillMax() => wood == clay', 2);
			if (this.getIron() < this.getWood()) {
				this.log('MRF::fillMax() => (wood == clay) > iron', 2);
				this.setIron(this.getIron());
				var reminder = Math.floor((this.maxCapacity()-this.getIron())/2);
				this.log('MRF::fillMax() => iron set to: '+this.getIron()+'; space left: '+reminder, 2);
				// because of previous statments there is no need to check wheather wood and clay are below reminder if that would be the case sum would be below totalCapacity
				this.setWood(reminder);
				this.setClay(reminder);
				this.log('MRF::fillMax() => (wood == clay) set to: '+reminder, 2);
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
			if (this.getWood() < this.getIron()) {
				this.log('MRF::fillMax() => (wood == clay) < iron', 2);
				this.setWood(this.getWood());
				this.setClay(this.getClay());
				var reminder = this.maxCapacity()-this.getWood()-this.getClay();
				this.log('MRF::fillMax() => (wood == clay) set to: '+this.getWood()+'; space left: '+reminder, 2);
				this.setIron(reminder > this.getIron() ? this.getIron() : reminder);
				this.log('MRF::fillMax() => iron set to: '+reminder, 2);
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
		}
		// clay == iron
		if (this.getClay() == this.getIron()) {
			this.log('MRF::fillMax() => clay == iron', 2);
			if (this.getWood() < this.getClay()) {
				this.log('MRF::fillMax() => (clay == iron) > wood', 2);
				this.setWood(this.getWood());
				var reminder = Math.floor((this.maxCapacity()-this.getWood())/2);
				this.log('MRF::fillMax() => wood set to: '+this.getWood()+'; space left: '+reminder, 2);
				// because of previous statments there is no need to check wheather wood and clay are below reminder if that would be the case sum would be below totalCapacity
				this.setClay(reminder);
				this.setIron(reminder);
				this.log('MRF::fillMax() => (clay == iron) set to: '+reminder, 2);
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
			if (this.getClay() < this.getWood()) {
				this.log('MRF::fillMax() => (wood == clay) < iron', 2);
				this.setClay(this.getClay());
				this.setIron(this.getIron());
				var reminder = this.maxCapacity()-this.getClay()-this.getIron();
				this.log('MRF::fillMax() => (clay == iron) set to: '+this.getClay()+'; space left: '+reminder, 2);
				this.setWood(reminder > this.getWood() ? this.getWood() : reminder);
				this.log('MRF::fillMax() => wood set to: '+reminder, 2);
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
		}
		// wood == iron
		this.log('MRF::fillMax() => wood == iron ? '+(this.getWood() == this.getIron()), 2);
		if (this.getWood() == this.getIron()) {
			this.log('MRF::fillMax() => wood == iron', 2);
			if (this.getClay() < this.getWood()) {
				this.log('MRF::fillMax() => (wood == iron) > clay', 2);
				this.setClay(this.getClay());
				var reminder = Math.floor((this.maxCapacity()-this.getClay())/2);
				this.log('MRF::fillMax() => clay set to: '+this.getClay()+'; space left: '+reminder, 2);
				// because of previous statments there is no need to check wheather wood and clay are below reminder if that would be the case sum would be below totalCapacity
				this.setWood(reminder);
				this.setIron(reminder);
				this.log('MRF::fillMax() => (wood == iron) set to: '+reminder, 2);
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
			if (this.getWood() < this.getClay()) {
				this.log('MRF::fillMax() => (wood == iron) < clay', 2);
				this.setWood(this.getWood());
				this.setIron(this.getIron());
				var reminder = this.maxCapacity()-this.getWood()-this.getIron();
				this.log('MRF::fillMax() => (wood == iron) set to: '+this.getWood()+'; space left: '+reminder, 2);
				this.setClay(reminder > this.getClay() ? this.getClay() : reminder);
				this.log('MRF::fillMax() => clay set to: '+reminder, 2);
				if (submitForm) { this.submitOwn(); }
				return void(0);
			}
		}
		alert("UWAGA!\n\nSkrypt wykrył nieopracowany scenariusz. Proszę podaj poniższe wartości na forum w temacie tego skryptu:\n\nfillMax encoutered:\ntotalCapacity: "+this.maxCapacity()+"\nWood: "+this.getWood()+"\nClay: "+this.getClay()+"\nIron: "+this.getIron());
		this.log('MRF::fillMax() => wood: '+this.getWood()+'; clay: '+this.getClay()+'; iron: '+this.getIron(), 1);
		this.log('MRF::fillMax() => wood < clay ? '+(this.getWood() < this.getClay()), 1);
		this.log('MRF::fillMax() => wood < iron ? '+(this.getWood() < this.getIron()), 1);
		this.log('MRF::fillMax() => clay < wood ? '+(this.getClay() < this.getWood()), 1);
		this.log('MRF::fillMax() => clay < iron ? '+(this.getClay() < this.getIron()), 1);
		this.log('MRF::fillMax() => iron < wood ? '+(this.getIron() < this.getWood()), 1);
		this.log('MRF::fillMax() => iron < clay ? '+(this.getIron() < this.getClay()), 1);
	},
	fillBalanced : function (submitForm) {
		if (!this.verifyLocationScreen() || this.getMarketMode() != 'send') {
			return void(0);
		}
		if (this.maxCapacity() == 0) {
			this.log('MRF::fillBalanced() => capacity is 0 -> bailing out', 1);
			return void(0);
		}
		if ((typeof submitForm) == "undefined") {
			submitForm = false;
		}
		var pWood = ((this.getWood())/(this.getWood()+this.getClay()+this.getIron()));
		var pClay = ((this.getClay())/(this.getWood()+this.getClay()+this.getIron()));
		var pIron = ((this.getIron())/(this.getWood()+this.getClay()+this.getIron()));
		this.log('MRF::fillBalanced() => wood is '+Math.round(pWood*10000)/100+'%; clay is '+Math.round(pClay*10000)/100+'%; iron is '+Math.round(pIron*10000)/100+'%; totalCapacity is '+this.maxCapacity(), 2);
		var tWood = Math.floor(pWood*this.maxCapacity());
		var tClay = Math.floor(pClay*this.maxCapacity());
		var tIron = Math.floor(pIron*this.maxCapacity());
		var tLeft = this.maxCapacity()-tWood-tClay-tIron;
		if (tLeft>0) {
			this.log('MRF::fillBalanced() => space left: '+tLeft, 2);
			if (tWood > tClay && tWood > tIron) {
				this.log('MRF::fillBalanced() => assigning free space to wood', 2);
				tWood += tLeft;
			}
			if (tClay > tWood && tClay > tIron) {
				this.log('MRF::fillBalanced() => assigning free space to clay', 2);
				tClay += tLeft;
			}
			if (tIron > tWood && tIron > tClay) {
				this.log('MRF::fillBalanced() => assigning free space to iron', 2);
				tIron += tLeft;
			}
		}
		tWood = tWood > this.getWood() ? this.getWood() : tWood;
		tClay = tClay > this.getClay() ? this.getClay() : tClay;
		tIron = tIron > this.getIron() ? this.getIron() : tIron;
		this.setWood(tWood);
		this.setClay(tClay);
		this.setIron(tIron);
		if (submitForm) { this.submitOwn(); }
		return void(0);
	},
	fillToEquality : function (submitForm) {
		if (!this.verifyLocationScreen() || this.getMarketMode() != 'send') {
			return void(0);
		}
		if (this.maxCapacity() == 0) {
			this.log('MRF::fillToEquality() => capacity is 0 -> bailing out', 1);
			return void(0);
		}
		if ((typeof submitForm) == "undefined") {
			submitForm = false;
		}
		if (this.getWood() == this.getClay() && this.getWood() == this.getIron()) {
			this.log('MRF::fillToEquality() => resources are equal, using fillStandard', 1);
			this.fillStandard();
			if (submitForm) { this.submitOwn(); }
			return void(0);
		}
		var cap = this.maxCapacity();
		if (this.getWood()+this.getClay()+this.getIron() < cap) {
			this.log('MRF::fillToEquality() => sum of resources is less than capacity, using fillStandard', 1);
			this.fillStandard();
			if (submitForm) { this.submitOwn(); }
			return void(0);
		}

		var top = this.getWood() > this.getClay() ? (this.getWood() > this.getIron() ? 'Wood' : 'Iron') : (this.getClay() > this.getIron() ? 'Clay' : 'Iron');
		if (top == 'Wood') {
			var mid = this.getClay() > this.getIron() ? 'Clay' : 'Iron';
			var lst = this.getClay() > this.getIron() ? 'Iron' : 'Clay';
		} else if (top == 'Clay') {
			var mid = this.getWood() > this.getIron() ? 'Wood' : 'Iron';
			var lst = this.getWood() > this.getIron() ? 'Iron' : 'Wood';
		} else if (top == 'Iron') {
			var mid = this.getWood() > this.getClay() ? 'Wood' : 'Clay';
			var lst = this.getWood() > this.getClay() ? 'Clay' : 'Wood';
		}
		this.log('MRF::fillToEquality() => `'+top+'` >> `'+mid+'` >> `'+lst+'`', 1);
		var diff, Wood, Clay, Iron; diff=Wood=Clay=Iron=0;
		eval('diff = this.get'+top+'() - this.get'+mid+'()');
		if (diff > cap) {
			this.log('MRF::fillToEquality() => diff is more than cap... setting `'+top+'` to '+cap+' and bailing out', 1);
			eval('this.set'+top+'(cap);');
		} else {
			this.log('MRF::fillToEquality() => got space left :P', 1);
			eval(top+' += diff'); cap = cap - diff;
			eval('diff = this.get'+mid+'() - this.get'+lst+'();');
			if (diff*2 > cap) {
				this.log('MRF::fillToEquality() => diff(mid, lst) is more than cap... ready to set all', 1);
				eval('this.set'+top+'(Math.floor('+top+'+cap/2)); this.set'+mid+'('+Math.floor(cap/2)+');');
			} else {
				eval(top+' += Math.floor(diff); '+mid+' += Math.floor(diff);');
				cap = cap - diff*2;
				this.log('MRF::fillToEquality() => `'+top+'` = '+eval(top)+', `'+mid+'` = '+eval(mid)+'; cap_left = '+cap, 1);
				eval(top+' += Math.floor(cap/3); '+mid+' += Math.floor(cap/3); '+lst+' += Math.floor(cap/3);');
				eval('this.set'+top+'('+top+');');
				eval('this.set'+mid+'('+mid+');');
				eval('this.set'+lst+'('+lst+');');
			}
		}

		//this.log('MRF::fillToEquality() => `'+top+'` - `'+mid+'` = '+diff, 1);
		if (submitForm) { this.submitOwn(); }
		return void(0);
	},
	submitOwn : function () {
		if (this.verbose) {
			this.log('MRF::submitOwn() => submitForm is set to true', 1);
		}
		if (document.forms[0].x.value != '' && document.forms[0].x.value != '0' && document.forms[0].y.value != '' && document.forms[0].y.value != '0') {
			document.forms[0].submit();
		} else {
			this.log('MRF::submitOwn() => submit aborted :: no target specified', 1);
		}
	},
	fillStandard : function () {
		this.log('MRF::fillStandard()', 1);
		var t = Math.floor(this.maxCapacity()/3);
		this.setWood(this.getWood() > t ? t : this.getWood());
		this.setClay(this.getClay() > t ? t : this.getClay());
		this.setIron(this.getWood() > t ? t : this.getIron());
	},
	setMarketOffer : function (submitFrom) {
		if (!this.verifyLocationScreen() || this.getMarketMode() != 'own_offer') {
			return void(0);
		}
		try {
			this.log('MRF::setMarketOffer() => trying to set offer', 2);
			document.getElementById('res_sell_wood').checked  = this.getWood() > this.getClay() && this.getWood() > this.getIron();
			document.getElementById('res_sell_stone').checked = this.getClay() > this.getWood() && this.getClay() > this.getIron();
			document.getElementById('res_sell_iron').checked  = this.getIron() > this.getClay() && this.getIron() > this.getWood();
			document.getElementById('res_buy_wood').checked   = this.getWood() < this.getClay() && this.getWood() < this.getIron();
			document.getElementById('res_buy_stone').checked  = this.getClay() < this.getWood() && this.getClay() < this.getIron();
			document.getElementById('res_buy_iron').checked   = this.getIron() < this.getClay() && this.getIron() < this.getWood();
			var offers = Math.max(Math.max(this.getWood(),this.getClay()),this.getIron())-Math.min(Math.min(this.getWood(),this.getClay()),this.getIron());
			offers = Math.round(offers/2);
			offers = offers > this.maxCapacity() ? this.maxCapacity() : offers;
			document.getElementsByName('multi')[0].value=Math.round(offers/1000);
			document.getElementsByName('max_time')[0].value=17;
			document.getElementsByName('sell')[0].value=parseInt(1000);
			document.getElementsByName('buy')[0].value=parseInt(1000);
			if (submitFrom) {
				document.forms[0].submit();
			}
		} catch (e) {
			this.log(e);
		}
		return void(0);
	}
};



