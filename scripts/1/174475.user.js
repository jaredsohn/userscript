// ==UserScript==
// @name       A Dark Room Cheats
// @namespace  http://natabbotts.com/
// @version    1.2
// @description  Cheat Engine for "A Dark Room"
// @match      http://adarkroom.doublespeakgames.com/*
// @copyright  2013- Nathanael Abbotts
// ==/UserScript==
var cheatEngine = {
    init: function () {
        $('body').append('<span class="cheat">cheat.</span>');
        $('.cheat').css({
            'position': 'absolute',
            'right': '120px',
            'bottom': '10px',
            'cursor': 'pointer'
        }).click(cheatEngine.click);
    },
    click: function () {
        Notifications.notify(Engine.activeModule, 'cheater.');
        Events.startEvent(cheatEngine.cheatConsole);
    },
    cheatConsole: {
        title: 'Cheats',
        scenes: {
            start: {
                text: [
                    'select your type of cheat.',
                    'certain cheats are unavailable until they can be meaningfully used.'
                ],
                buttons: {
                    'inventoryBtn': {
                        text: 'resources',
                        nextScene: {
                            1: 'getInventory',
                            available: function () {
                                // is inventory visible?
                                return Engine.storeAvailable('wood');
                            }
                        }
                    },
                    'weaponsBtn': {
                        text: 'weapons',
                        nextScene: {
                            1: 'getWeapons'
                        },
                        available: function () {
                            return Engine.getStore('compass') > 0;
                        }
                    },
                    'unlockablesBtn': {
                        text: 'unlock items',
                        nextScene: {
                            1: 'getUnlockables'
                        },
                        available: function () {
                            return Engine.storeAvailable('fur');
                        }
                    },
                    'perksBtn': {
                        text: 'perks',
                        nextScene: {
                            1: 'getPerks'
                        },
                        available: function () {
                            return Engine.getStore('compass') > 0;
                        }
                    },
                    'buildingsBtn': {
                        text: 'buildings',
                        nextScene: {
                            1: 'getBuildings'
                        },
                        available: function () {
                            return Engine.getStore('wood') > 0;
                        }
                    },
                    'modsBtn': {
                        text: 'mods',
                        nextScene: {
                            1: 'getMods'
                        }
                    },
                    'goodbye': {
                        text: 'stop cheating',
                        notification: 'once a cheater, always a cheater.',
                        nextScene: 'end'
                    }
                }
            },
            getMods: {
                text: ['game modifications.'],
                buttons: {
                    'full population': {
                        text: 'full population',
                        onChoose: function () {
                            State.outside.population = Outside.getMaxPopulation();
                            Outside.updateVillage();
                            Outside.updateWorkersView();
                            Outside.updateVillageIncome();
                            Notifications.notify(null, "the town's booming. word does get around.");
                        },
                        available: function () {
                            return Engine.storeAvailable('wood') && ((Outside.getMaxPopulation() - State.outside.population) > 0);
                        },
                        nextScene: {
                            1: 'getMods'
                        }
                    },
                    'kill weapon': {
                        text: '\'kill\' weapon',
                        onChoose: function () {
                            World.Weapons['kill'] = {
                                verb: 'kill',
                                type: 'ranged',
                                damage: 100,
                                cooldown: 0
                            };
                            Path.Weight['kill'] = 0;
                            Room.Craftables['kill'] = {
                                button: null,
                                type: 'weapon',
                                cost: function () {
                                    return {}
                                }
                            };
                        },
                        reward: {
                            'kill': 1
                        }
                    },
                    'back': {
                        text: 'back',
                        nextScene: {
                            1: 'start'
                        }
                    },
                    'goodbye': {
                        text: 'stop cheating',
                        notification: 'once a cheater, always a cheater.',
                        nextScene: 'end'
                    }
                }
            },
            getInventory: {
                text: ['adds significant numbers of each item to your inventory (Usually +1000).',
                       'resources are locked until you discover them as part of the natural progression of the game. you can force-unlock them with the unlock all button.'
                      ],
                buttons: {
                    'wood': {
                        text: 'wood',
                        reward: {
                            'wood': 1000
                        },
                        notification: '+ 1000 Wood',
                        available: function () {
                            return Engine.storeAvailable('wood');
                        }
                    },
                    'charm': {
                        text: 'charm',
                        reward: {
                            'charm': 1
                        },
                        available: function () {
                            return Engine.storeAvailable('charm');
                        },
                        notification: 'you only need one.'
                    },
                    'fur': {
                        text: 'fur',
                        reward: {
                            'fur': 1000
                        },
                        notification: '+ 1000 fur',
                        available: function () {
                            return Engine.storeAvailable('fur');
                        }
                    },
                    'leather': {
                        text: 'leather',
                        reward: {
                            'fur': 1,
                            'leather': 1000
                        },
                        notification: '+ 1000 leather',
                        available: function () {
                            return Engine.storeAvailable('leather');
                        }
                    },
                    'meat': {
                        text: 'meat',
                        reward: {
                            'meat': 1000
                        },
                        notification: '+ 1000 meat',
                        available: function () {
                            return Engine.storeAvailable('meat');
                        }
                    },
                    'cured meat': {
                        text: 'cured meat',
                        reward: {
                            'meat': 1,
                            'cured meat': 1000
                        },
                        notification: '+ 1000 cured meat',
                        available: function () {
                            return Engine.storeAvailable('cured meat');
                        }
                    },
                    'bait': {
                        text: 'bait',
                        reward: {
                            //'meat': 1,
                            'bait': 1000
                        },
                        notification: '+ 1000 bait',
                        available: function () {
                            return Engine.storeAvailable('bait');
                        }
                    },
                    /*
                        '': {
                        text: '',
                        reward: {
                            '': 1000
                        },
                        notification: '+ 1000 '
                    },*/
                    'scales': {
                        text: 'scales',
                        reward: {
                            'scales': 1000
                        },
                        notification: '+ 1000 scales',
                        available: function () {
                            return Engine.storeAvailable('scales');
                        }
                    },
                    'teeth': {
                        text: 'teeth',
                        reward: {
                            'teeth': 1000
                        },
                        notification: '+ 1000 teeth',
                        available: function () {
                            return Engine.storeAvailable('teeth');
                        }
                    },
                    'cloth': {
                        text: 'cloth',
                        reward: {
                            'cloth': 1000
                        },
                        notification: '+ 1000 cloth',
                        available: function () {
                            return Engine.storeAvailable('cloth');
                        }
                    },
                    'coal': {
                        text: 'coal',
                        reward: {
                            'coal': 1000
                        },
                        notification: '+ 1000 coal',
                        available: function () {
                            return Engine.storeAvailable('coal');
                        }
                    },
                    'iron': {
                        text: 'iron',
                        reward: {
                            'iron': 1000
                        },
                        notification: '+ 1000 iron',
                        available: function () {
                            return Engine.storeAvailable('iron');
                        }
                    },
                    'steel': {
                        text: 'steel',
                        reward: {
                            'coal': 1,
                            'iron': 1,
                            'steel': 1000
                        },
                        notification: '+ 1000 steel',
                        available: function () {
                            return Engine.storeAvailable('steel');
                        }
                    },
                    'sulphur': {
                        text: 'sulphur',
                        reward: {
                            'sulphur': 1000
                        },
                        notification: '+ 1000 sulphur',
                        available: function () {
                            return Engine.storeAvailable('sulphur');
                        }
                    },
                    'bullets': {
                        text: 'bullets',
                        reward: {
                            'coal': 1,
                            'iron': 1,
                            'steel': 1,
                            'bullets': 1000
                        },
                        notification: '+ 1000 bullets',
                        available: function () {
                            return Engine.storeAvailable('bullets');
                        }
                    },
                    'energy cell': {
                        text: 'energy cell',
                        reward: {
                            'energy cell': 1000
                        },
                        notification: '+ 1000 energy cell',
                        available: function () {
                            return Engine.storeAvailable('energy cell');
                        }
                    },
                    'alien alloy': {
                        text: 'alien alloy',
                        reward: {
                            'alien alloy': 50
                        },
                        notification: '+ 50 alien alloy',
                        available: function () {
                            return Engine.storeAvailable('alien alloy');
                        }
                    },
                    'torch': {
                        text: 'torch',
                        reward: {
                            'wood': 1,
                            'cloth': 1,
                            'torch': 50
                        },
                        notification: '+ 50 torches',
                        available: function () {
                            return Engine.storeAvailable('torch');
                        }
                    },
                    'unlock all': {
                        text: 'unlock all',
                        reward: {
                            'wood': 1,
                            'fur': 1,
                            'charm': 1,
                            'meat': 1,
                            'scales': 1,
                            'teeth': 1,
                            'cloth': 1,
                            'coal': 1,
                            'iron': 1,
                            'bait': 1,
                            'leather': 1,
                            'cured meat': 1,
                            'steel': 1,
                            'sulphur': 1,
                            'bullets': 1,
                            'energy cell': 1,
                            'alien alloy': 1,
                            'torch': 1
                        },
                        notification: 'make me one with everything.',
                        nextScene: {
                            1: 'getInventory'
                        }
                    },
                    'back': {
                        text: 'back',
                        nextScene: {
                            1: 'start'
                        }
                    },
                    'goodbye': {
                        text: 'stop cheating',
                        notification: 'once a cheater, always a cheater.',
                        nextScene: 'end'
                    }
                }
            },
            getWeapons: {
                text: ['gain weapons & ammo.'],
                buttons: {
                    'bone spear': {
                        text: 'bone spear',
                        reward: {
                            'teeth': 1,
                            'bone spear': 1
                        },
                        notification: '+1 bone spear'
                    },
                    'iron sword': {
                        text: 'iron sword',
                        reward: {
                            'iron': 1,
                            'leather': 1,
                            'iron sword': 1
                        },
                        notification: '+1 iron sword'
                    },
                    'steel sword': {
                        text: 'steel sword',
                        reward: {
                            'coal': 1,
                            'iron': 1,
                            'leather': 1,
                            'steel': 1,
                            'steel sword': 1
                        },
                        notification: '+1 steel sword'
                    },
                    'bayonet': {
                        text: 'bayonet',
                        reward: {
                            'bayonet': 1
                        },
                        notification: 'swoosh. your bayonet slices through the air.'
                    },
                    'rifle': {
                        text: 'rifle',
                        reward: {
                            'rifle': 1,
                            'bullets': 100
                        },
                        notification: 'a rifle and some ammo.'
                    },
                    'laser rifle': {
                        text: 'laser rifle',
                        reward: {
                            'laser rifle': 1,
                            'energy cell': 100
                        },
                        notification: 'zap.'
                    },
                    'bolas': {
                        text: 'bolas',
                        reward: {
                            'bolas': 10
                        },
                        notification: '+10 bolas.'
                    },
                    'grenade': {
                        text: 'grenade',
                        reward: {
                            'grenade': 10
                        },
                        notification: '+10 grenades.'
                    },
                    'back': {
                        text: 'back',
                        nextScene: {
                            1: 'start'
                        }
                    },
                    'goodbye': {
                        text: 'stop cheating',
                        notification: 'once a cheater, always a cheater.',
                        nextScene: 'end'
                    }
                }
            },
            getUnlockables: {
                text: ['Unlock any item.'],
                buttons: {
                    'buyCompass': {
                        available: function () {
                            return (Engine.getStore('compass') < 1) && Engine.storeAvailable('fur'); // compass is available once fur exists 
                        },
                        text: 'unlock compass',
                        reward: {
                            'compass': 1
                        },
                        notification: 'the old compass is dented and dusty, but it looks to work.',
                        onChoose: Engine.openPath,
                        nextScene: {
                            1: 'getUnlockables'
                        }
                    },
                    'waterskin': {
                        available: function () {
                            return Engine.storeAvailable('leather') && (Engine.getStore('waterskin') < 1);
                        },
                        text: 'unlock waterskin',
                        reward: {
                            'leather': 1,
                            'waterskin': 1
                        },
                        notification: Room.Craftables['waterskin'].buildMsg,
                        nextScene: {
                            1: 'getUnlockables'
                        }
                    },
                    'cask': {
                        available: function () {
                            return Engine.storeAvailable('iron') && (Engine.getStore('cask') < 1) && (Engine.getStore('waterskin') === 1);
                        },
                        text: 'unlock cask',
                        reward: {
                            'leather': 1,
                            'iron': 1,
                            'cask': 1
                        },
                        notification: Room.Craftables['cask'].buildMsg,
                        nextScene: {
                            1: 'getUnlockables'
                        }
                    },
                    'water tank': {
                        available: function () {
                            return Engine.storeAvailable('steel') && (Engine.getStore('water tank') < 1) && (Engine.getStore('cask') === 1);
                        },
                        text: 'unlock water tank',
                        reward: {
                            'iron': 1,
                            'steel': 1,
                            'water tank': 1
                        },
                        notification: Room.Craftables['water tank'].buildMsg,
                        nextScene: {
                            1: 'getUnlockables'
                        }
                    },
                    'rucksack': {
                        available: function () {
                            return Engine.storeAvailable('leather') && (Engine.getStore('rucksack') < 1);
                        },
                        text: 'unlock rucksack',
                        reward: {
                            'leather': 1,
                            'rucksack': 1
                        },
                        notification: Room.Craftables['rucksack'].buildMsg,
                        nextScene: {
                            1: 'getUnlockables'
                        }
                    },
                    'wagon': {
                        available: function () {
                            return Engine.storeAvailable('iron') && (Engine.getStore('wagon') < 1) && (Engine.getStore('rucksack') === 1);
                        },
                        text: 'unlock wagon',
                        reward: {
                            'wood': 1,
                            'iron': 1,
                            'wagon': 1
                        },
                        notification: Room.Craftables['wagon'].buildMsg,
                        nextScene: {
                            1: 'getUnlockables'
                        }
                    },
                    'convoy': {
                        available: function () {
                            return Engine.storeAvailable('steel') && (Engine.getStore('convoy') < 1) && (Engine.getStore('wagon') === 1);
                        },
                        text: 'unlock convoy',
                        reward: {
                            'wood': 1,
                            'iron': 1,
                            'steel': 1,
                            'convoy': 1
                        },
                        notification: Room.Craftables['convoy'].buildMsg,
                        nextScene: {
                            1: 'getUnlockables'
                        }
                    },
                    'l armour': {
                        available: function () {
                            return Engine.storeAvailable('leather') && Engine.storeAvailable('scales') && (Engine.getStore('l armour') < 1);
                        },
                        text: 'unlock l armour',
                        reward: {
                            'leather': 1,
                            'scales': 1,
                            'l armour': 1
                        },
                        notification: Room.Craftables['l armour'].buildMsg,
                        nextScene: {
                            1: 'getUnlockables'
                        }
                    },
                    'i armour': {
                        available: function () {
                            return Engine.storeAvailable('iron') && (Engine.getStore('i armour') < 1) && (Engine.getStore('l armour') === 1);
                        },
                        text: 'unlock i armour',
                        reward: {
                            'leather': 1,
                            'iron': 1,
                            'i armour': 1
                        },
                        notification: Room.Craftables['i armour'].buildMsg,
                        nextScene: {
                            1: 'getUnlockables'
                        }
                    },
                    's armour': {
                        available: function () {
                            return Engine.storeAvailable('steel') && (Engine.getStore('s armour') < 1) && (Engine.getStore('i armour') === 1);
                        },
                        text: 'unlock s armour',
                        reward: {
                            'leather': 1,
                            'steel': 1,
                            's armour': 1
                        },
                        notification: Room.Craftables['s armour'].buildMsg,
                        nextScene: {
                            1: 'getUnlockables'
                        }
                    },
                    'back': {
                        text: 'back',
                        nextScene: {
                            1: 'start'
                        }
                    },
                    'goodbye': {
                        text: 'stop cheating',
                        notification: 'once a cheater, always a cheater.',
                        nextScene: 'end'
                    }
                }
            },
            getBuildings: {
                text: ['build any buildings. Some may not appear constructed until particular resources appear in game, but all function correctly.',
                       'the various mines (coal, iron, sulphur) must be unlocked on the map before use, but their resources are available.'
                      ],
                buttons: {
                    /* TODO 
                     * Ensure a building is available within the game before construction. Current available functions are insufficient.
                     *
                     * */
                    'trap': {
                        text: 'trap',
                        reward: {
                            'wood': 1
                        },
                        notification: Room.Craftables['trap'].buildMsg,
                        available: function () {
                            return (Room.Craftables['trap'].button !== null) && (Outside.numBuilding('trap') < Room.Craftables['trap'].maximum);
                        },
                        onChoose: function () {
                            Outside.addBuilding('trap', 1);
                        }
                    },
                    'cart': {
                        text: 'cart',
                        reward: {
                            'wood': 1
                        },
                        notification: Room.Craftables['cart'].buildMsg,
                        available: function () {
                            return (Room.Craftables['cart'].button !== null) && (Outside.numBuilding('cart') < Room.Craftables['cart'].maximum);
                        },
                        onChoose: function () {
                            Outside.addBuilding('cart', 1);
                        }
                    },
                    'hut': {
                        text: 'hut',
                        reward: {
                            'wood': 1
                        },
                        notification: Room.Craftables['hut'].buildMsg,
                        available: function () {
                            return (Room.Craftables['hut'].button !== null) && (Outside.numBuilding('hut') < Room.Craftables['hut'].maximum);
                        },
                        onChoose: function () {
                            Outside.addBuilding('hut', 1);
                        }
                    },
                    'lodge': {
                        text: 'lodge',
                        reward: {
                            'wood': 1,
                            'fur': 1,
                            'meat': 1
                        },
                        notification: Room.Craftables['lodge'].buildMsg,
                        available: function () {
                            return (Room.Craftables['lodge'].button !== null) && (Outside.numBuilding('lodge') < Room.Craftables['lodge'].maximum);
                        },
                        onChoose: function () {
                            Outside.addBuilding('lodge', 1);
                        }
                    },
                    'trading post': {
                        text: 'trading post',
                        reward: {
                            'wood': 1,
                            'fur': 1
                        },
                        notification: Room.Craftables['trading post'].buildMsg,
                        available: function () {
                            return (Room.Craftables['trading post'].button !== null) && (Outside.numBuilding('trading post') < Room.Craftables['trading post'].maximum);
                        },
                        onChoose: function () {
                            Outside.addBuilding('trading post', 1);
                        },
                        nextScene: {
                            1: 'getBuildings'
                        }
                    },
                    'tannery': {
                        text: 'tannery',
                        reward: {
                            'wood': 1,
                            'fur': 1
                        },
                        notification: Room.Craftables['tannery'].buildMsg,
                        available: function () {
                            return (Room.Craftables['tannery'].button !== null) && (Outside.numBuilding('tannery') < Room.Craftables['tannery'].maximum);
                        },
                        onChoose: function () {
                            Outside.addBuilding('tannery', 1);
                        }
                    },
                    'smokehouse': {
                        text: 'smokehouse',
                        reward: {
                            'wood': 1,
                            'meat': 1
                        },
                        notification: Room.Craftables['smokehouse'].buildMsg,
                        available: function () {
                            return (Room.Craftables['smokehouse'].button !== null) && (Outside.numBuilding('smokehouse') < Room.Craftables['smokehouse'].maximum);
                        },
                        onChoose: function () {
                            Outside.addBuilding('smokehouse', 1);
                        }
                    },
                    'workshop': {
                        text: 'workshop',
                        reward: {
                            'wood': 1,
                            'leather': 1,
                            'scales': 1
                        },
                        notification: Room.Craftables['workshop'].buildMsg,
                        available: function () {
                            return (Room.Craftables['workshop'].button !== null) && (Outside.numBuilding('workshop') < Room.Craftables['workshop'].maximum);
                        },
                        onChoose: function () {
                            Outside.addBuilding('workshop', 1);
                        }
                    },
                    'steelworks': {
                        text: 'steelworks',
                        reward: {
                            'wood': 1,
                            'iron': 1,
                            'coal': 1
                        },
                        notification: Room.Craftables['steelworks'].buildMsg,
                        available: function () {
                            return (Room.Craftables['steelworks'].button !== null) && (Outside.numBuilding('steelworks') < Room.Craftables['steelworks'].maximum);
                        },
                        onChoose: function () {
                            Outside.addBuilding('steelworks', 1);
                        }
                    },
                    'armoury': {
                        text: 'armoury',
                        reward: {
                            'wood': 1,
                            'steel': 1,
                            'sulphur': 1
                        },
                        notification: Room.Craftables['armoury'].buildMsg,
                        available: function () {
                            return (Room.Craftables['armoury'].button !== null) && (Outside.numBuilding('armoury') < Room.Craftables['armoury'].maximum);
                        },
                        onChoose: function () {
                            Outside.addBuilding('armoury', 1);
                        }
                    },
                    'back': {
                        text: 'back',
                        nextScene: {
                            1: 'start'
                        }
                    },
                    'goodbye': {
                        text: 'stop cheating',
                        notification: 'once a cheater, always a cheater.',
                        nextScene: 'end'
                    }
                }
            },
            getPerks: {
                text: ['Award yourself a perk. These are useful when exploring.'],
                buttons: {
                    'boxer': {
                        text: 'boxer',
                        notification: 'learned to throw punches with purpose',
                        available: function () {
                            return !Engine.hasPerk('boxer');
                        },
                        onChoose: function () {
                            Engine.addPerk('boxer');
                        },
                        nextScene: {
                            1: 'getPerks'
                        }
                    },
                    'martial artist': {
                        text: 'martial artist',
                        notification: 'learned to fight quite effectively without weapons',
                        available: function () {
                            return !Engine.hasPerk('martial artist');
                        },
                        onChoose: function () {
                            Engine.addPerk('martial artist');
                        },
                        nextScene: {
                            1: 'getPerks'
                        }
                    },
                    'unarmed master': {
                        text: 'unarmed master',
                        notification: 'learned to strike faster without weapons',
                        available: function () {
                            return !Engine.hasPerk('unarmed master');
                        },
                        onChoose: function () {
                            Engine.addPerk('unarmed master');
                        },
                        nextScene: {
                            1: 'getPerks'
                        }
                    },
                    'barbarian': {
                        text: 'barbarian',
                        notification: 'Your face is now permanently disfigured. +100 intimidation.',
                        available: function () {
                            return !Engine.hasPerk('barbarian');
                        },
                        onChoose: function () {
                            Engine.addPerk('barbarian');
                        },
                        nextScene: {
                            1: 'getPerks'
                        }
                    },
                    'slow metabolism': {
                        text: 'slow metabolism',
                        notification: 'you\'re just big boned, honest.',
                        available: function () {
                            return !Engine.hasPerk('slow metabolism');
                        },
                        onChoose: function () {
                            Engine.addPerk('slow metabolism');
                        },
                        nextScene: {
                            1: 'getPerks'
                        }
                    },
                    'scout': {
                        text: 'scout',
                        notification: 'you earn a knot tying merit badge.',
                        available: function () {
                            return !Engine.hasPerk('scout');
                        },
                        onChoose: function () {
                            Engine.addPerk('scout');
                        },
                        nextScene: {
                            1: 'getPerks'
                        }
                    },
                    'stealthy': {
                        text: 'stealthy',
                        notification: 'learned how not to be seen',
                        available: function () {
                            return !Engine.hasPerk('stealthy');
                        },
                        onChoose: function () {
                            Engine.addPerk('stealthy');
                        },
                        nextScene: {
                            1: 'getPerks'
                        }
                    },
                    'gastronome': {
                        text: 'gastronome',
                        notification: 'you eat your greens. +5 HP.',
                        available: function () {
                            return !Engine.hasPerk('gastronome');
                        },
                        onChoose: function () {
                            Engine.addPerk('gastronome');
                        },
                        nextScene: {
                            1: 'getPerks'
                        }
                    },
                    'desert rat': {
                        text: 'desert rat',
                        notification: 'you scuttle around the floor, with some plague.',
                        available: function () {
                            return !Engine.hasPerk('desert rat');
                        },
                        onChoose: function () {
                            Engine.addPerk('desert rat');
                        },
                        nextScene: {
                            1: 'getPerks'
                        }
                    },
                    'evasive': {
                        text: 'evasive',
                        notification: 'you cover your eyes. they can\'t see you if you can\'t see them.',
                        available: function () {
                            return !Engine.hasPerk('evasive');
                        },
                        onChoose: function () {
                            Engine.addPerk('evasive');
                        },
                        nextScene: {
                            1: 'getPerks'
                        }
                    },
                    'precise': {
                        text: 'precise',
                        notification: 'you won\'t miss quite as often.',
                        available: function () {
                            return !Engine.hasPerk('precise');
                        },
                        onChoose: function () {
                            Engine.addPerk('precise');
                        },
                        nextScene: {
                            1: 'getPerks'
                        }
                    },
                    'back': {
                        text: 'back',
                        nextScene: {
                            1: 'start'
                        }
                    },
                    'goodbye': {
                        text: 'stop cheating',
                        notification: 'once a cheater, always a cheater.',
                        nextScene: 'end'
                    }
                }
            }
        }
    }
};

$(cheatEngine.init);