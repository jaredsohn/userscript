// ==UserScript==
// @author         excieve
// @originalAuthor AMitrev
// @name           Merciless boot
// @namespace      merciless_boot
// @description    Improves the combat module of Erepublik
// @version        0.10
// @include        http://*erepublik.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @resource eatButtonImg http://lh5.googleusercontent.com/_Ls4H9rmhEDQ/TWLZQfBpLtI/AAAAAAAAAA8/5o-LmhXRB54/Salo.png
// @resource fightButtonImg http://i.imgur.com/SHutM.jpg
// ==/UserScript==

// Changelog:
// v0.10
// - Added food consumption button to every page
// - Implemented blocking of buttons when action is impossible to perform
// - Improved damage calculation, fixed a bug in it
// - Added info on health replenishment to damage info block
// - Damage/food replenishment info is now updated on every Ajax request
// v0.9
// - New buttons design
// - Fixed some regressions
// - Implemented a better method for popup hiding
// - Added action button blocking and hiding when in process
// - Removed alerts that idicated end of actions
// v0.8
// - Added timeout between eat and fight calls
// - "Add influence" pop-up now doesn't shop up during ninja fight
// - Refactored all code
// - Sidebar now shows up only on the account page
// - Script is now initialised only where it's needed
// - Some minor fixes and improvements
// =============================================================================
// v0.7 - Ninja Damage & Influence core by AMitrev
// =============================================================================

// Global timeout between any actions
var actionTimeout = 600;

ninjaInfo = {
    ranks: [
        'Recruit', 'Private', 'Private*', 'Private**', 'Private***', 'Corporal',
        'Corporal*', 'Corporal**', 'Corporal***', 'Sergeant', 'Sergeant*', 'Sergeant**',
        'Sergeant***', 'Lieutenant', 'Lieutenant*', 'Lieutenant**', 'Lieutenant***',
        'Captain', 'Captain*', 'Captain**', 'Captain***', 'Major', 'Major*', 'Major**',
        'Major***', 'Commander', 'Commander*', 'Commander**', 'Commander***',
        'Lt Colonel', 'Lt Colonel*', 'Lt Colonel**', 'Lt Colonel***', 'Colonel',
        'Colonel*', 'Colonel**', 'Colonel***', 'General', 'General*', 'General**',
        'General***', 'Field Marshal', 'Field Marshal*', 'Field Marshal**',
        'Field Marshal***', 'Supreme Marshal', 'Supreme Marshal*', 'Supreme Marshal**',
        'Supreme Marshal***', 'National Force', 'National Force*', 'National Force**',
        'National Force***', 'World Class Force', 'World Class Force*', 'World Class Force**',
        'World Class Force***', 'Legendary Force', 'Legendary Force*', 'Legendary Force**',
        'Legendary Force***', 'God of War'
    ],

    init: function() {
        var info = this.getOptions(),
            container = $('.citizen_content'),
            weaponHtml = '';

        this.addStyles();


        for (var i = 1; i < 6; i++) {
            weaponHtml += 'Q' + i + ' <input type="checkbox" id="DI_weapon_Q' + i + '" value="1" ' + (info.weapon[i] ? 'checked="checked"' : '') + ' />';
        }
        $('#sidebar').append('<div id="DI_options"><div id="DI_opt_content"><h2>D&I Options</h2>' +
                '<div class="DI_option"><strong>Str per day:</strong> <input type="text" id="DI_str_per_day" value="' + info.str_delta + '" /></div>' +
                '<div class="DI_option"><strong>Weapons:</strong><br />' +
                weaponHtml +
                '<div class="DI_option"><strong>Weapon:</strong><br />' +
                '<input type="text" id="DI_mod_weapon" value="' + info.mod_weapon + '" /></div>' +
                '<div class="DI_option"><strong>Influence:</strong><br />' +
                'Q5 <input type="checkbox" id="DI_influence_Q5" value="1" ' + (info.influence['q5'] ? 'checked="checked"' : '') + ' />' +
                'Q0 <input type="checkbox" id="DI_influence_Q0" value="5" ' + (info.influence['q0'] ? 'checked="checked"' : '') + ' /></div>' +
                '</div>' +
                '</div>');

        $('#DI_str_per_day, #DI_mod_weapon').keyup(function() {
            GM_setValue(this.id, $(this).val());
        });

        var setBoolValue = function() {
            GM_setValue(this.id, $(this).attr('checked'));
        };

        for(var i = 1; i < 6; i++) {
            $('#DI_weapon_Q' + i).change(setBoolValue);
        }
        $('#DI_influence_Q0, #DI_influence_Q5').change(setBoolValue);

        if (container.length)
            this.showAccountInfo(container, info);

        GM_log('Bushido initialized');
    },

    addStyles: function() {
        GM_addStyle(
          '#DI_options { float: left; margin-top: 10px; }' +
          '#DI_opt_content { float: left; background-color: #eee; padding: 10px 5px; width: 73px; -moz-border-radius: 5px 5px 5px 5px }'+
          '#DI_opt_content h2 { font-size: 12px; margin-bottom: 4px; text-shadow: #fff 0.2em 0.2em; } '+
          '.DI_option { font-size: 10px; -moz-border-radius: 5px 5px 5px 5px; border-top: 1px solid #E5E5E5; background: none repeat scroll 0 0 #FFFFFF; border-bottom: 1px solid #F0F0F0; display: block; float: left; padding: 0 3px; width: 65px; }' +
          '.DI_option input { width: 58px; font-size: 10px; margin: 2px; } '+
          '.DI_option input[type=checkbox] { margin: 0; width: 35px; }'
        );
    },

    getOptions: function() {
        var info = {
            str_delta: parseFloat(GM_getValue('DI_str_per_day')) || 0,
            mod_weapon: parseInt(GM_getValue('DI_mod_weapon')) || 0,
            influence: {
                'q0': GM_getValue('DI_influence_Q0') || false,
                'q5': GM_getValue('DI_influence_Q5') || false
            },
            weapon: []
        };

        for (var i = 1; i < 6; i++) {
            info.weapon[i] = GM_getValue('DI_weapon_Q' + i) || false;
        }

        return info;
    },

    calcInfluence: function(rank, str, firepower) {
        var rankKoef   = (rank - 1)/20 + 0.3,
            strKoef    = (str / 10) + 40,
            weaponKoef = 1 + firepower/100;

        return Math.floor(rankKoef * strKoef * weaponKoef);
    },

    showAccountInfo: function(box, info) {
        var strength = parseFloat($('.citizen_military:eq(0) h4').text().trim().replace(',', '')),
            rankIndex = this.ranks.indexOf($('.citizen_military:eq(1) h4').text().trim()) + 1,
            tomorrowStrength = strength + info.str_delta,
            influence = {
                today: [],
                tomorrow: []
            };

        if (!rankIndex) {
            return;
        }

        for (var i = 0; i < 6; i++) {
            var nextDay = '';

            influence.today.push(this.calcInfluence(rankIndex, strength, i * 20));
            influence.tomorrow.push(this.calcInfluence(rankIndex, tomorrowStrength, i * 20));

            if (i == 0) {
                box.append('<h3>Influence per fight</h3>');
            }
            if (info.weapon[i] || i == 0) {
                nextDay = '<div class="stat"><small>Tomorrow (+' + info.str_delta + 'str):</small><small><strong>' + influence.tomorrow[i] + '</strong></small></div>';
                box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Q' + i + '</strong> <h4>' + influence.today[i] + '</h4>' + nextDay + '</div>');
            }
        }

        if (info.mod_weapon > 0) {
            var todayMod = this.calcInfluence(rankIndex, strength, info.mod_weapon),
                tomorrowMod = this.calcInfluence(rankIndex, tomorrowStrength, info.mod_weapon),
                nextDay = '<div class="stat"><small>Tomorrow (+' + info.str_delta + 'str):</small><small><strong>' + tomorrowMod + '</strong></small></div>';
            box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Mod. weapon</strong> <h4>' + todayMod + '</h4>' + nextDay + '</div>');
        }

        $.each([5, 0], function(k, i) {
            if (info.influence['q' + i]) {
                box.append('<br clear="all"/><h3 style="margin-top: 15px;">Influence - Q' + i + ' weapon</h3>');
                box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Influence 30 fights</strong> <h4>Q' + i + ': ' + (30 * influence.today[i]) + '</h4> <div class="stat"><small>Tomorrow (+' + info.str_delta + 'str):</small><small><strong>300 health with Q' + i + ': ' + (30 * influence.tomorrow[i]) + '</strong></small></div></div>');
                box.append('<div class="clear"></div>');
                box.append('<div class="citizen_military"><strong>Max Influence</strong> <h4>Q' + i + ': ' + (38 * influence.today[i]) + '</h4> <div class="stat"><small>Tomorrow (+' + info.str_delta + 'str):</small><small><strong>380 health with Q' + i + ': ' + (38 * influence.tomorrow[i]) + '</strong></small></div></div>');
            }
        });
    }
};

ninjaMilitary = {
    state: {
        player: {
            strength: 0,
            weaponAttribute: 0,
            health: 0
        },
        enemy: {
            strength: 0,
            weaponAttribute: 0,
            health: 0
        }
    },
    minFighterHealth: 20,
    healthLimit: 300,
    ninjaPunching: false,
    ninjaEating: false,
    originalBattlePopup: null,
    punchButton: null,
    eatButton: null,

    init: function() {
        var self = this;

        if (unsafeWindow.SERVER_DATA.onlySpectator != 0)
            return;

        this.originalBattlePopup = unsafeWindow.battleFX.pop;

        this.updateHealthState();
        this.state.player.strength = parseFloat($('#fighter_skill').html().replace(',', ''));
        this.state.player.weaponAttribute = parseInt($('.weapon_attributes p strong').html());
        this.state.enemy = {
            strength: parseFloat($('#enemy_skill').html().replace(',', '')),
            weaponAttribute: parseInt($('#enemy_weapon').attr('src').match(/\d/g)) * 20,
            health: parseInt($('#enemy_life').attr('title').match(/\d+/g))
        };

        unsafeWindow.$j("body").ajaxSuccess(function(e, res, opt) { self.handleHooks(e, res, opt) });

        this.showUI();

        GM_log('Shuriken initialized');
    },

    showUI: function() {
        var self = this;

        this.addStyles();

        $('#player_rank').append('<div id="myKillBox" style="position: absolute; top: -200px; left: 100px; width: 170px; text-align: center;"></div>');

        if (this.canFight()) {
            this.showKillInfo();
        }

        //bonus Fight button :D
        $('.beta_notice').remove();
        this.punchButton = $('<a id="ninjaFight" href="javascript: void(0);" title="Attack"></a>')
            .appendTo('#pvp')
            .css({
                background: 'url('+ GM_getResourceURL('fightButtonImg') +') no-repeat',
                display: 'block',
                width: '191px',
                height: '48px',
                position: 'absolute',
                bottom: '44px',
                left: '13px'
            })
            .bind('click', function() {
                if (!self.ninjaPunching && self.canFight()) {
                    self.ninjaPunching = true;
                    self.fight();
                    $(this).hide();
                } else {
                    alert('Cant\'t fight.');
                }
                return false;
            });

        $('.help_button').remove();
        this.eatButton = $('<a id="ninjaEat" href="javascript: void(0);" title="Eat Salo"></a>')
            .appendTo('#pvp')
            .css({
                background: 'url('+ GM_getResourceURL('eatButtonImg') +') no-repeat',
                display: 'block',
                width: '191px',
                height: '48px',
                position: 'absolute',
                right: '13px',
                bottom: '44px'
            })
            .bind('click', function() {
                if (!self.ninjaEating && self.canEat()) {
                    self.ninjaEating = true;
                    self.eat();
                    $(this).hide();
                } else {
                    alert('Can\'t eat.');
                }
                return false;
            });
    },

    updateHealthState: function() {
            this.state.player.health = unsafeWindow.SERVER_DATA.health;
            this.healthLimit = unsafeWindow.food_remaining;
    },

    showKillInfo: function() {
        var koefStr = 60 + (this.state.player.strength
                - this.state.enemy.strength) / 10,
            koefWeapon = 1 + (this.state.player.weaponAttribute
                    - this.state.enemy.weaponAttribute) / 400,
            hit = Math.ceil(this.state.enemy.health / (koefStr * koefWeapon)),
            healthLeft = this.state.player.health - (hit * 10),
            killInfo = '';

        GM_log('State: ' + this.state.toSource());

        function pluralize(text, count) {
            return count == 1 ? text : text + 's';
        }

        // Show how much health needs to be restored to kill opponent
        // if there's not enough to perform a full attack.
        if (healthLeft < 11) {
            killInfo = 'Restore ' + (11 - healthLeft) + ' health to kill your opponent in ';
        } else {
            killInfo = 'You will kill your opponent in ';
        }
        killInfo += hit + pluralize(' fight', hit) +'!';

        $('#myKillBox').html('<h4>' + killInfo + '</h4>');
    },

    handleHooks: function(e, res, opt) {
        var response = null,
            self = this;


        if (opt.url.indexOf('change-weapon') != -1) {
            response = JSON.parse(res.responseText);

            this.state.player.weaponAttribute = response.weaponDamage;
        } else if (opt.url.indexOf('/military/fight-shoot') != -1) {
            response = JSON.parse(res.responseText);

            // Block of handlers that only work if ninja fighting is enabled
            if (this.ninjaPunching) {
                // Simulate "add influence" pop-up closing if enemy was killed
                if (response.message == "ENEMY_KILLED") {
                    unsafeWindow.battleFX.pop = function(target, width) {
                        GM_log('killed an enemy');
                        unsafeWindow.closeAddDamagePopup();
                        // Restore original function. Hope this won't produce too big memory leaks.
                        unsafeWindow.battleFX.pop = self.originalBattlePopup;
                        return false;
                    };
                }

                if (response.error && response.message == "SHOOT_LOCKOUT") {
                    setTimeout(this.fight, actionTimeout);
                }

                if (this.canFight(response)) {
                    setTimeout(this.fight, actionTimeout);
                }
                else {
                    this.ninjaPunching = false;
                    this.punchButton.show();
                }
            }

            //after fight :D
            this.state.enemy = {
                strength: parseFloat(response.enemy.skill.replace(',', '')),
                weaponAttribute: parseInt(response.enemy.damage),
                health: response.enemy.health
            };
            this.state.player.weaponAttribute = response.user.weaponDamage;

        } else if (opt.url.indexOf('/eat?') != -1 && this.ninjaEating) {
            response = res.responseText;
            response = JSON.parse(response.slice(response.indexOf('(') + 1, -1));

            if (this.canEat(response)) {
                setTimeout(this.eat, this.actionTimeout);
            }
            else {
                this.ninjaEating = false;
                this.eatButton.show();
            }
        }
        // Update damage and health replenishment info
        this.updateHealthState();
        this.showKillInfo();
    },

    fight: function() {
        unsafeWindow.$j('#fight_btn').click();
        GM_log('enemy punched: ' + new Date().getTime());
    },

    eat: function() {
        unsafeWindow.$j('#DailyConsumtionTrigger').click();
        GM_log('food consumed: ' + new Date().getTime());
    },

    addStyles: function() {
        GM_addStyle('.battle_stats_button { bottom: 150px; right: 382px; }');
    },

    canEat: function(response) {
        var hasFood = response ? response.has_food_in_inventory : !$('#DailyConsumtionTrigger').hasClass('buy');
        GM_log("hasFood: " + hasFood + ' health: ' + this.state.player.health + ' limit: ' + this.healthLimit);
        return hasFood > 0 && this.state.player.health <= 90 && this.healthLimit > 0;
    },

    canFight: function(response) {
        var playerHealth = response ? response.user.health : unsafeWindow.SERVER_DATA.health;
        return playerHealth > this.minFighterHealth;
    }
};

ninjaDailyConsumption = {
    eatButton: null,
    eating: false,

    init: function() {
        var self = this;

        unsafeWindow.$j("body").ajaxSuccess(function(e, res, opt) { self.handleHooks(e, res, opt) });
        this.addStyles();
        this.showUI();

        GM_log('Daily consumption initialized.');
    },

    showUI: function() {
        var self = this;

        this.eatButton = $('<a href="#" class="eat_food" id="merciless-auto-eat"><strong>Auto</strong></a>')
            .insertAfter('#DailyConsumtion')
            .click(function() {
                if (!self.eating && self.canEat()) {
                    self.eating = true;
                    self.eat();
                    $(this).hide();
                } else {
                    alert('Can\'t eat.');
                }
                return false;
            });
    },

    handleHooks: function(e, res, opt) {
        var response = null;

        GM_log('In handle hooks, url: ' + opt.url);
        if (this.eating && opt.url.indexOf('/eat') != -1) {
            response = res.responseText;
            response = JSON.parse(response.slice(response.indexOf('(') + 1, -1));
            if (this.canEat(response)) {
                setTimeout(this.eat, actionTimeout);
            } else {
                this.eating = false;
                this.eatButton.show();
            }
        }
    },

    eat: function() {
        unsafeWindow.$j('#DailyConsumtionTrigger').click();
        GM_log("Food consumed");
    },

    canEat: function(response) {
        var health = 0,
            foodRemaining = 0,
            hasFood = 0;

        if (response) {
            health = parseFloat(response.health);
            foodRemaining = response.food_remaining;
            hasFood = response.has_food_in_inventory;
        } else {
            health = parseFloat($('#wellnessBar span').html());
            foodRemaining = unsafeWindow.food_remaining;
            hasFood = !$('#DailyConsumtionTrigger').hasClass('buy');
        }

        return health <= 90 && foodRemaining && hasFood;
    },

    addStyles: function() {
        GM_addStyle('#merciless-auto-eat { height: 24px; margin-top: 10px; padding-top: 5px; }');
    }
};

$(function() {
    var isPvp = false;

    if (typeof unsafeWindow.$j == 'undefined') {
        return;
    }

    GM_log('Initializing ninja');

    isPvp = $('div#pvp').length;

    if (!isPvp && $('#DailyConsumtion').length) {
        ninjaDailyConsumption.init();
    }

    if ($('body').attr('id') == 'citizenprofile') {
        ninjaInfo.init();
    } else if (isPvp) {
        ninjaMilitary.init();
    }
});
