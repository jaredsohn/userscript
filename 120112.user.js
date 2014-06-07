// ==UserScript==
// @name           Battlefield 3 Battlelog Award improvements
// @namespace      zirrka.de
// @description    Percentage Bars for Awards in Battlefield 3 
// @include        http*://battlelog.battlefield.com/bf3/soldier/*/awards/*
// ==/UserScript==
//
// based on "Battlefield 3 Battlelog interface improvements"

Function.prototype.bind = function(scope) {
  var _function = this;
  
  return function() {
    return _function.apply(scope, arguments);
  }
}
Object.prototype.hasClass = function(className) {
   var pattern = new RegExp('(^|\\s)' + className + '(\\s|$)'); //use this regexp
   return pattern.test(this.className); //to check for the class
}
Object.prototype.addClass = function(className) {
   if (!this.hasClass(className)) { //if the class isn't there already
      this.className += (' ' + className); //append it to the end of the class list
   }
}
Object.prototype.removeClass = function(className) {
   var pattern = new RegExp('(^|\\s)' + className + '(\\s|$)'); //use this regexp
   this.className = this.className.replace(pattern, ' '); //to make a search and replace by a blank space
}

var Decorator = {
    options: {
        profileAwards: 'profile-stats-awards-main-column',
        profileAwardsMedal: '.profile-stats-awards-progression-item-medal',
        profileAwardsRibbon: '.profile-stats-awards-progression-item-ribbon',
        profileAwardsTaken: '.profile-stats-num-awards-taken',
        profileNotTaken: 'nottaken'
    },
    ribbonData: {
    },
    
    initialize: function() {
        var container = document.querySelector('#content-container');
        container.addEventListener('DOMNodeInserted', function(event) {
            if (!event) event = window.event;
            var target = event.target;
            if ('div' == event.target.tagName.toLowerCase() && this.options.profileAwards == event.target.id) {
                this.profileAwards(event.target);
            }
        }.bind(this), true);
    },
    profileAwards: function(container) {
        this.parseRibbons(container);
        var medals = container.querySelectorAll(this.options.profileAwardsMedal);
        try {
            for (i=0; i<medals.length; i++) {
                var medal = medals[i];
                var type = this.getMedalType(medal);
                var ribbonInfo = this.getRibbonInfoFromMedal(medal);
                if (ribbonInfo == null) {
                    continue;
                }
                var ribbon = this.ribbonData[ribbonInfo.name];
                if (ribbon != null) {
                    var ribbonCountRequired = ribbonInfo.required;
                    var progress = medal.querySelector('.progress');
                    var modulo = ribbon.count % ribbonInfo.required;
		    
                    var percentage = 0;
                    if (modulo > 0) {
                        percentage = Math.round(modulo*100/ribbonInfo.required);
                    }
                    progress.setAttribute('style', 'width: '+ percentage +'%');
                    this.medalAppendTooltip(medal, '('+ ribbon.count +')');
                }
            }
        } catch (e) {console.log({'Ex profileAwards': e})}
    },
    parseRibbons: function(container) {
        var ribbons = container.querySelectorAll(this.options.profileAwardsRibbon);
        for (i=0; i<ribbons.length; i++) {
            var ribbon = ribbons[i];
            var type = (ribbon.hasAttribute('title') ? ribbon.getAttribute('title') : ribbon.getAttribute('data-battlebubble')).match(/[^<]+/)[0];
            type = type.replace('ARMORED', 'ARMOR').replace('HAND GUN', 'HANDGUN').replace('SURVEILLANCE EFFICIENCY', 'SURVEILLANCE').replace('MEDICAL EFFICIENCY', 'MEDICAL').replace('MVP 3', '3RD MVP').replace('MVP 2', '2ND MVP');
            var count = 0;
            if (ribbon.className.indexOf(this.options.profileNotTaken) < 0) {
                var taken = ribbon.querySelector(this.options.profileAwardsTaken);
                if (taken) {
                    count = parseInt(taken.childNodes[0].nodeValue.match(/[[0-9]+/)[0]);
                } else {
                    count = 1;
                }
            }
            this.ribbonData[type] = {'count': count, 'dom': ribbon};
        }
    },
    getRibbonInfoFromMedal: function(medal) {
        var matches = this.getMedalData(medal).match(/Obtain.+/);
        if (!matches) {
            return null;
        }
        var str = matches[0].replace('Obtain the ', '');
        var ribbonCount = str.match(/ [0-9]+ times./)[0];
        str = str.replace(ribbonCount, '').toUpperCase();
        ribbonCount = ribbonCount.match(/[0-9]+/)[0]
        return {'name': str, 'required': ribbonCount};
    },
    getRibbon: function(ribbonString) {
        var info = this.ribbonCount
    },
    getMedalType: function(medal) {
        return this.getMedalData(medal).match(/[^<]+/)[0];
    },
    getMedalData: function(medal) {
        return medal.hasAttribute('title') ? medal.getAttribute('title') : medal.getAttribute('data-battlebubble');
    },
    getRibbon: function(medal) {
        
    },
    medalAppendTooltip: function(medal, text) {
        if (medal.hasAttribute('title')) {
            medal.setAttribute('title', medal.getAttribute('title') +' '+ text);
        } else {
            medal.setAttribute('data-battlebubble', medal.getAttribute('data-battlebubble') +' '+ text);
        }
    }
};
Decorator.initialize();