// ==UserScript==
// @name         PoECAF
// @namespace    https://userscripts.org/scripts/show/161828
// @version      6.3.2
// @description  Path of Exile Calculator Advanced Features
// @match        http://www.pathofexile.com/passive-skill-tree*
// @downloadURL  https://userscripts.org/scripts/source/161828.user.js
// @updateURL    https://userscripts.org/scripts/source/161828.meta.js
// @copyright    2013+, https://userscripts.org/users/274679
// @grant        none
// @run-at       document-start
// ==/UserScript==

function main () {
    function objectSortedForEach(o,f){Object.keys(o).sort().forEach(function(k){f(k,o[k])})}
    function hookBeforeCallReturnOriginal(o,m,h){var t=o[m];o[m]=function(){h.apply(this,arguments);return t.apply(this,arguments)}}
    PoeCaf = function () { return this.init.apply(this, arguments) }
    PoeCaf.prototype = {
        init : function (instance) {
            this.skillTree = instance;
            this.initContainer(true);
            
            instance.passiveAllocation.calculateTotal = function (replacer) {
                var keyword = replacer || '', total = {}, regexp = /([+|-]?\d+(?:\.\d+)?)/gi;
                this.foreachAllocatedSkill(function (e) {
                    if (e.keyStone) {
                        total['* ' + e.skill.displayName + ': ' + keyword] = [e.skill.skillDescription.join(", ")];
                    } else for (var i = e.skill.skillDescription.length - 1; i >= 0; --i) {
                        var s = e.skill.skillDescription[i], m = s.match(regexp);
                        if (m) {
                            s = s.replace(regexp, keyword);
                            if (!total[s])
                                total[s] = [];
                            total[s].push(+m[0]);
                        }
                    }
                });
                return total;
            };
            
            var caf = this;
            instance.finalDrawFuncs.push(function () {
                instance.events.pointsChanged.add(function () {
                    caf.update();
                });
                caf.update();
            });
        },
        initContainer : function (showing) {
            var head = $('<div/>', {id: 'totalStats', class: 'cursor-pointer'}),
                instance = this.skillTree;

            $('<style/>', {type: 'text/css'}).html('#poe-popup-container #skillTreeInfo { position: fixed; top: 10px; left: 10px; z-index: 1004; pointer-events: none; } .cursor-pointer { cursor: pointer; pointer-events: auto; } #toggleControlsForm { position: absolute; right: 4px; top: 4px; } .fullscreen.fullscreen-hide { display: none; } div.icon { overflow: hidden; display: inline-block; background-repeat: no-repeat; background-position: center center; } .toggleable { overflow: hidden; display: inline-block; background-repeat: no-repeat; background-position: center center; } .icon-arrow { width: 10px; height: 10px; } .icon-arrow.toggleable { background-image: url(http://cdn1.iconfinder.com/data/icons/lullacons/bullet-arrow-down.png); } .icon-arrow.toggleable.toggled { background-image: url(http://cdn1.iconfinder.com/data/icons/lullacons/bullet-arrow-right.png); } .icon-toggle { width: 32px; height: 32px; } .icon-toggle.toggleable { background-image: url(http://cdn1.iconfinder.com/data/icons/realistiK-new/32x32/actions/window_fullscreen.png); } .icon-toggle.toggleable.toggled { background-image: url(http://cdn1.iconfinder.com/data/icons/realistiK-new/32x32/actions/window_nofullscreen.png); }').appendTo('head');
            $('#passiveControlsForm > :not(.buttonContainer):not(.clear)').addClass('fullscreen-affected').not('#skillTreeInfo').addClass('fullscreen-hide');

            $("<div/>", {id: 'toggleControlsForm', class: 'buttonContainer cursor-pointer icon-toggle toggleable'}).click(function () {
                $(this).toggleClass('toggled');
                $('#passiveControlsForm > .fullscreen-affected').toggleClass('fullscreen-hide');
                instance.updateCanvasSize();
            }).prependTo('#passiveControlsForm').hide();
            
            hookBeforeCallReturnOriginal(instance, 'toggleFullScreen', function () {
                var isFullScreen = !this.fullScreen; // flag is currently in before toggle state
                $('#skillTreeInfo').prependTo(isFullScreen ? '#poe-popup-container' : '#passiveControlsForm');
                $('.fullscreen-affected').toggleClass('fullscreen');
                $('#toggleControlsForm').toggle();
            });

            head.click(function () {
                $(this).contents().add('.icon-arrow').toggleClass('toggled');
                $(this).next().slideToggle();
            }).prepend(
                $('<div/>', {class: 'icon-arrow toggleable'})
            );
            $('#skillTreeInfo').contents().replaceWith(head).appendTo(head);

            this.container = $("<div/>").appendTo('#skillTreeInfo');
        },
        update : function () {
            var keyword = '{v}', passiveSkillBonuses = this.skillTree.passiveAllocation.calculateTotal(keyword), container = this.container.empty();
    
            objectSortedForEach(passiveSkillBonuses, function(pattern, bonuses) {
                var value = bonuses.reduce(function(a,b){return a+b;}),
                    bonus = pattern.replace(keyword, value%1>0?value.toFixed(1):value);
                if (bonus.split(' ')[1] === 'to') bonus = (value < 0 ? '-' : '+') + bonus;
                $("<div/>", {text: bonus, class: 'text formTextInline'}).appendTo(container);
            });
        }
    }

    // hook on constructor of skill tree
    define('PassiveSkillTree-adapter', ['PoE/PassiveSkillTree/PassiveSkillTree'], function (PassiveSkillTree) {
        console.log('PoECAF Installed');
        return function () {
            var instance = new Object();
            PassiveSkillTree.apply(instance, arguments);
            new PoeCaf(instance);
            return instance;
        };
    });
    require.config({
        map: {
            '*': { 'PoE/PassiveSkillTree/PassiveSkillTree': 'PassiveSkillTree-adapter' },
            'PassiveSkillTree-adapter': { 'PoE/PassiveSkillTree/PassiveSkillTree': 'PoE/PassiveSkillTree/PassiveSkillTree' }
        }
    });
}

// we have to do it after requirejs is configured, but before any skill tree was created
window.addEventListener("DOMNodeInserted", function (event) {
    for (var tags = document.getElementsByTagName("script"), i = tags.length - 1; i >= 0; --i) {
        var e = tags.item(i);
        if (e.text.indexOf('require.config') !== -1) {
            window.removeEventListener(event.type, arguments.callee, true);
            var script = document.createElement('script');
            script.appendChild(document.createTextNode('('+ main +')();'));
            e.parentNode.insertBefore(script, e.nextSibling);
            return;
        }
    }
}, true);
