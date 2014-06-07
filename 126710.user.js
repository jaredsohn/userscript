// ==UserScript==
// @name Craft Manager.js
// @copyright (C) David Cabrera 2010 - 2012.
// @author Leonard
// @version 0.6.1.3
// @description http://fb.com/leothelion96
// @include http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include https://facebook.mafiawars*/mwfb/remote/html_server.php*
// ==/UserScript==

UserConfig.create('cmopt');
/**
 * Craft Manager.
 */
function CraftManager() {
    /**
     * @type {CSPropertyCollection}
     */
    var Properties;
    var options = UserConfig.cmopt;
    var gVar = {
        nyCashProps: false,
        countdowns: new Object(),
        ny_props: {
            '1'              : {name:'Sports Bar',             icon:'LimitedTimeProperty/SportsBar/flashImage.png'         },
            '2'              : {name:'Venetian Condo',         icon:'LimitedTimeProperty/Condo/condoFlash.png'             },
            '3'              : {name:'Tad\'s Gun Shop',        icon:'LimitedTimeProperty/Gunshop/2_pv2.png'                },
            '4'              : {name:'Biker Clubhouse',        icon:'LimitedTimeProperty/BikerClubhouse/flashImage.png'    },
            '5'              : {name:'Martial Arts Dojo',      icon:'LimitedTimeProperty/MartialArts/flashImage.png'       },
            '6'              : {name:'Botanical Garden',       icon:'LimitedTimeProperty/Garden/flashImage.png'            },
            '7'              : {name:'Cemetery',               icon:'LimitedTimeProperty/Cemetery/flashImage.png'          },
            '8'              : {name:'Cider House',            icon:'LimitedTimeProperty/Ciderhouse/flashImage.png'        },
            '9'              : {name:'Toy Store',              icon:'LimitedTimeProperty/Toystore/flashImage.png'          },
            '10'             : {name:'Assassin\'s Academy',    icon:'LimitedTimeProperty/Assassin/Assassin-flashImage.png' },
            'chop_shop'      : {name:'Chop Shop',              icon:'PropertiesV2/prop11_chopshop.png'                     },
            'weapons_depot'  : {name:'Weapons Depot',          icon:'PropertiesV2/prop12_weaponsdepot_01.png'              },
            '20'         : {name:'Hangar',                 icon:'LimitedTimeProperty/Hangar/HangarFlash.png'                              },
            'private_zoo'    : {name:'Private Zoo',            icon:'PropertiesV2/zoo.png'                                 },
            '21'            : {name:'Cage Fight Arena',       icon:'LimitedTimeProperty/CageFightingArena/cagefightarena.png'    }
        },
        props: {
            'port': {
                buy   : MW.getIntURL('propertyV2','portBuyItem') + '&city=6&building_type=7&id=',
                up    : '&city=6&building_type=7',
                cash  : global.zGraphicsURL + 'icon_cash_italy_16x16_02.png',
                load  : 'it'
            },
            'warehouse': {
                buy   : MW.getIntURL('propertyV2','portBuyItem') + '&city=8&building_type=3&id=',
                up    : '&city=8&building_type=3',
                cash  : global.zGraphicsURL + 'chic_clam_sm.png',
                load  : 'ch'
            },
            'speakeasy': {
                buy   : MW.getIntURL('propertyV2','portBuyItem') + '&city=8&building_type=2&id=',
                up    : '&city=8&building_type=2',
                load  : 'ch'
            },
            'black_market': {
                buy   : MW.getIntURL('propertyV2','portBuyItem') + '&city=7&building_type=3&id=',
                up    : '&city=7&building_type=3',
                cash  : global.zGraphicsURL + 'brz_real_sm.png',
                load  : 'br'
            },
            'workshop': {
                buy   : MW.getIntURL('propertyV2','portBuyItem') + '&city=7&building_type=2&id=',
                up    : '&city=7&building_type=2',
                load  : 'br'
            }
        },
        reqs: {
            ny: 'remote/' + MW.getIntURL('LimitedTimeProperty', 'showProperties')+'&view_tab=build&page_click=viewV2',
            br: 'remote/' + MW.getIntURL('propertyV2', 'createData', 7) + '&city=7',
            ch: 'remote/' + MW.getIntURL('propertyV2', 'createData', 8) + '&city=8',
            it: 'remote/' + MW.getIntURL('propertyV2', 'createData', 6) + '&city=6',
            ny_cash_prop: 'remote/'+ MW.getIntURL('propertyV2', 'view', 1)
        }
    };
    /**
     * Create a Property Item.
     * @constructor
     * @return {CSPropertyItem}
     */
    var CSPropertyItem = function() {
        this.name = 'Unknow';
        this.level = 0;
        this.attack = '0';
        this.defense = '0';
        this.bonus = '';
        this.requirements = new Array();
        
        this.canBuy = function() {
            if (!Util.isString(this.buy)) {
                return false;
            }
            var result = true;
            
            Util.each(this.requirements, function(i,r) {
                return (result = (!Util.isSet(r.have) || r.have >= r.need));
            });
            return result;
        };
        
        return this;
    };
    /**
     * Create a property class.
     * @constructor
     * @param {Element} masterElt
     * @return {CSProperty}
     */
    var CSProperty = function(id, name, icon) {
        var Items = new Array();
        
        this.id = id;
        this.icon = icon; 
        this.name = (name ? name : 'Unknow');
        this.level = 0;
        this.is_ny = false;
        this.canUpgrade = false;
        
        this.length = function() {
            return Items.length;
        };
        /**
         * @param {Object} index
         * @return {CSPropertyItem}
         */        
        this.get = function(index) {
            return Items[index];
        };
        /**
         * @param {CSPropertyItem} obj
         */
        this.add = function(obj) {
            Items.push(obj);
        };
        /**
         * Loops through all items.
         * @param {Function} callback
         */
        this.each = function(callback) {
            Util.each(Items, callback);
        };
        
        return this;
    };
    /**
     * Create a new property collection.
     * @constructor
     * @return {CSPropertyCollection}
     */
    var CSPropertyCollection = function() {
        var Props = new Object();
        /**
         * @param {CSProperty} prop
         */
        this.add = function(prop) {
            if (prop && prop.id) {
                Props[prop.id] = prop;
            }
        }
        /**
         * @return {Collection} 
         */
        this.getCollection = function() {
            return new Collection(Props);
        };
        /**
         * @param {String} id
         * @return {CSProperty}
         */
        this.get = function(id) {
            return Props[id];
        };
        /**
         * @return {Number}
         */
        this.length = function() {
            return Util.length(Props);
        };
        /**
         * Loops through all properties.
         * @param {Function} callback
         * @param {Boolean} bSorted true to sort properties by name.
         */
        this.each = function(callback, bSorted) {
            var obj = Props;
            if (bSorted) {
                obj = new Array();
                Util.each(Props, function(id, prop) {
                    obj.push(prop);
                });
                obj.sort(function(a, b) {
                    if (a.is_ny_cash && b.is_ny_cash) {
                        return a.upgrade_cost - b.upgrade_cost;
                    }
                    if (a.is_ny_cash || b.is_ny_cash) {
                        return (a.is_ny_cash ? -1 : 1);
                    }
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
            Util.each(obj, callback);
        }
        
        return this;        
    };
    // -------------
    // EVENTS
    // -------------
    var Events = {
        upgrade: function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            $('.property_inner a', Popup.content).addClass('disabled');
            var me = $(this);
            var name = me.attr('name');
            var prop = Properties.get(name);
            var url, to_level, $input;
            if (!prop.upgrade) {
                return;
            }
            options.fromDomElements();
            options.save();
            if (prop.is_ny) {
                url = prop.upgrade;
            } else if (prop.is_ny_cash) {
                to_level = parseInt( $('#upgrade_in_'+prop.id, Popup.content).val() );
                $input = $('#level_'+prop.id, Popup.content);
                url = prop.upgrade;
            } else {
                url = 'remote/';
                url += MW.getIntURL('propertyV2','buy', Util.uSplit(prop.upgrade).city) 
                url += prop.upgrade;
            }
            (function upgradeProperty() {
                sendMessage('Upgrading '+prop.name+'...', true);
                httpAjaxRequest({'url': url, 'liteLoad':1, 
                'success': function(response) {
                    if (Popup.is_closed===true||gVar.autocrafting===true) {return;}
                    var message = parseUpgradeResponse(response);
                    if (prop.is_ny_cash) {
                        if (/success/i.test(message)) {
                            prop.level++;
                        }
                        if (to_level > prop.level) {
                            $input.text(prop.level);
                            setTimeout(upgradeProperty, 1000);
                        } else {
                          Properties.each(updateProperty);
                        }
                    } else {
                        refreshProperty(prop.id, true);
                    }
                    sendMessage(message);
                    addLog(message, 'info');
                }, 
                'error' : function(errText) {
                    sendMessage(errText);
                    addLog(errText, 'info');
                }});
            })();
            return false;
        },
        build: function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            $('.property_inner a', Popup.content).addClass('disabled');
            
            var name = $(this).attr('name');
            var id = $('option:selected', '#cmopt_build_'+name).val();
            var item = Properties.get(name).get(id);
            
            options.fromDomElements();
            options.save();
            
            craftItem(name, item);
            return false;
        },        
        build_change: function() {
            var id = $(this).attr('name');
            if (id) {
                updateProperty(id);
            }
        },
        upgrade_change: function() {
            var id = Util.doRgx(/upgrade_in_(.*)/, this.id).$1;
            if (id) {
                updateProperty(id);
            }
        },
        upgrade_keyup: function() {
            var me = $(this);
            var waiting = me.attr('timeout');
            if (waiting) {
                clearTimeout(waiting);
            }
            me.attr('timeout', setTimeout(function() {
                me.removeAttr('timeout');
                me.change();
            }, 600));
        },
        refresh: function() {
            gVar.restart = true;
            Popup.close(); 
            return false;
        },
        autocraft: function() {
            var $btn = $(this);
            if ($btn.hasClass('disabled')) {
                return false;
            }
            options.fromDomElements();
            options.save();
            if ($btn.hasClass('green')) {
                $btn.removeClass('green').addClass('red disabled');
                gVar.tab.showTab(3);
                gVar.autocrafting = true;
                tabsEnabled(false);
                addLog('AutoCrafting started.', 'info');
                autoCrafting();
            } else {
                $btn.removeClass('red').addClass('green disabled');
                gVar.autocrafting = false;
                tabsEnabled(true);
                addLog('AutoCrafting stopped.', 'info');
                sendMessage('AutoCrafting stopped.');
            }
            setTimeout(function() {
                $btn.removeClass('disabled');
            }, 5000);
            return false;
        }
    };