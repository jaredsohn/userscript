// ==UserScript==
// @name       Facebook AutoPoke
// @namespace  https://github.com/joneschrisan/Facebook-AutoPoke
// @version    1.0.0
// @description  Atomaticaly pokes people who poke you on facebook
// @match      *://*.facebook.com/pokes
// @copyright  2013+, Chris 'CJ' Jones
// ==/UserScript==

if (!Object.create) {
    Object.create = (function() {
        function F(){};
        
        return function(o, v) {
            var v = v || false;
            if (arguments.length != 1 || arguments.length != 2) {
                throw new Error('Object.create implementation only accepts two parameter.');
            }
            F.prototype = o;
            if(v) F.extend(v);
            return new F();
        }
    })()
}

var cj = cj || {};
cj.facebook = cj.facebook || {};
cj.facebook.autopoke = (function() {
    "use strict";
    
    var i = 0, j = 0;
    
    var autopoke = Object.create({});
    
    var obj = autopoke;
    
    var _timeBetweenPokes = 5000, _autoStart = false;
    
    var _numPokes = 0, _pokeHeader = null, _pokeButtons = Array(), _autoPokeTimeOutId = null, _pokeSuggested = false;
    
    function _searchPokeHeader() {
        var pokeHeader = document.getElementsByClassName('uiHeaderTitle');
        var pokeHeaderLength = pokeHeader.length;
        for(i = 0; i < pokeHeaderLength; i++) {
            var html = pokeHeader[i].innerHTML.toLowerCase();
            if(html.indexOf('pokes') > 0) {
            	break;   
            }
    	}
        _pokeHeader = pokeHeader[i];
    }
    
    function _drawControlConsole() {
        var autoPokeContainer = document.createElement('h6');
        
        var autoPokePokesText = document.createElement('span');
        autoPokePokesText.innerHTML = 'Pokes back: ';
        
        var autoPokePokes = document.createElement('span');
        autoPokePokes.id = 'autoPokePokes';
        autoPokePokes.innerHTML = '0';
        
        var autoPokeBR = document.createElement('br');
        
        var autoPokeOnOffText = document.createElement('label');
        autoPokeOnOffText.htmlFor = 'autoPokeCounterOnOff';
        autoPokeOnOffText.id = '_autoPokeCounterOnOff';
        autoPokeOnOffText.innerHTML = 'autoPoke On: ';
        
        var autoPokeCounterOnOff = document.createElement('input');
        autoPokeCounterOnOff.type = 'checkbox';
        autoPokeCounterOnOff.id = 'autoPokeCounterOnOff';
        if(_autoStart) autoPokeCounterOnOff.checked = 'checked';
        autoPokeCounterOnOff.onchange = function() {
            if(this.checked) {
                _run();
            } else {
                _stop();
            }
        }
        
        //var autoPokeBR2 = document.createElement('br');
        //
        //var autoPokeSuggestedOnOffText = document.createElement('label');
        //autoPokeSuggestedOnOffText.htmlFor = 'autoPokeSuggestedOnOffText';
        //autoPokeSuggestedOnOffText.id = '_autoPokeSuggestedOnOffText';
        //autoPokeSuggestedOnOffText.innerHTML = 'autoPokeSuggested On: ';
        //
        //var autoPokeSuggestedOnOff = document.createElement('input');
        //autoPokeSuggestedOnOff.type = 'checkbox';
        //autoPokeSuggestedOnOff.id = 'autoPokeSuggestedOnOff';
        //if(_autoStart) autoPokeSuggestedOnOff.checked = 'checked';
        //autoPokeSuggestedOnOff.onchange = function() {
        //    if(this.checked) {
        //        _pokeSuggested = true;
        //    } else {
        //        console.log('stop suggested');
        //        _pokeSuggested = false;
        //    }
        //}
        
        autoPokeContainer.appendChild(autoPokePokesText);
        autoPokeContainer.appendChild(autoPokePokes);
        autoPokeContainer.appendChild(autoPokeBR);
        autoPokeContainer.appendChild(autoPokeOnOffText);
        autoPokeContainer.appendChild(autoPokeCounterOnOff);
        //autoPokeContainer.appendChild(autoPokeBR2);
        //autoPokeContainer.appendChild(autoPokeSuggestedOnOffText);
        //autoPokeContainer.appendChild(autoPokeSuggestedOnOff);
        
        _pokeHeader.appendChild(autoPokeContainer);
    }
    
    function _searchAllPokeButtons() {
        var aTags = document.getElementsByTagName('a');
        var aTagsLength = aTags.length;
        for(i = 0, j = 0; i < aTagsLength; i++) {
            if(
               //(
               // _pokeSuggested &&
               // (
               //  (aTags[i].innerHTML.search('poke') >= 0) ||
               //	 (aTags[i].innerHTML.search('Poke') >= 0)
               // )
               //) ||
               (aTags[i].innerHTML.search('poke back') >= 0) ||
               (aTags[i].innerHTML.search('Poke back') >= 0)
              ) {
                _pokeButtons[j] = aTags[i];
                j++;
            }
        }
    }
    
    function _run() {
        _doPoke()
        _autoPokeTimeOutId = self.setInterval(_doPoke, _timeBetweenPokes);
        _updateNumPokes();
    }
    
    function _stop() {
        clearInterval(_autoPokeTimeOutId);
    }
    
    function _doPoke() {
        _searchAllPokeButtons();
        var pokeButtonsLength = _pokeButtons.length;
        for(i = 0; i < pokeButtonsLength; i++) {
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            var canceled = !_pokeButtons[i].dispatchEvent(evt);
            _numPokes++;
        }
    }
    
    function _updateNumPokes() {
        document.getElementById('autoPokePokes').innerHTML = _numPokes;
    }
    
    Object.defineProperties(obj, {
        'timeBetweenPokes': {
            configurable: false,
            enumerable: true,
            set: function(value) {
                _timeBetweenPokes = value;
            },
            get: function() {
                return _timeBetweenPokes;
            }
        },
        'autoStart': {
            configurable: false,
            enumerable: true,
            set: function(value) {
                if(value) {
                    _autoStart = true;
                } else {
                    _autoStart = false;
                }
            },
            get: function() {
                return _autoStart;
            }
        },
        'init': {
            value: function(options_object) {
                if(options_object) {
                    var that = this;
                    Object.keys(options_object).forEach(
                        function(prop) {
                            that[prop] = options_object[prop];
                        }
                    );
                }
                _searchPokeHeader();
                _drawControlConsole();
            },
            writable: false,
            configurable: false,
            enumerable: false
        }
    });
    
    if(false) Object.seal(obj);
    
    return obj;
})();

window.addEventListener(
    'load',
    function() {
        cj.facebook.autopoke.init({
            timeBetweenPokes: 5000,
            autoStart: false
        });
    }
    , false
);