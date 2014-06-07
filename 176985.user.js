// ==UserScript==
// @name         Cookie Clicker Cheats
// @namespace    http://userscripts.org/users/zackton
// @description  Enable/Disable different cheats/hacks for Cookie Clicker
// @include      http://orteil.dashnet.org/cookieclicker/
// @include      orteil.dashnet.org/cookieclicker/
// @updateURL    http://userscripts.org/scripts/source/176985.meta.js
// @require      http://userscripts.org/scripts/source/187400.user.js
// @require      http://userscripts.org/scripts/source/276064.user.js
// @icon         http://images2.wikia.nocookie.net/__cb20130827014914/cookieclicker/images/5/5a/PerfectCookie.png
// @grant        none
// @run-at       document-end
// @version      1.7
// ==/UserScript== 

// Main wait loop
setTimeout(doSomething, 1000);

function doSomething() {
    var element = document.getElementById('particle0');
    if (typeof (element) != 'undefined' && element != null) {

//Game particles have loaded, FIRE AWAY!
        (function () {
            var options = {
                panelId: 'cookie-cheater',
                intervalDelay: 1,
                longDelay: 250,
                buttons: {
                    'bigCookie': {
                        label: 'Autoclick Big Cookie',
                        action: function () {
                            toggleAutoAction('bigCookie', function () {
                                Game.ClickCookie();
                            })
                        }
                    },
                    'spawnGoldenCookie': {
                        label: 'Spawn a Golden Cookie',
                        action: function () {
                            Game.goldenCookie.life = 0;
                            Game.goldenCookie.time = Game.goldenCookie.minTime;
                            Game.goldenCookie.spawn();
                        }
                    },
                    'autoGoldenCookie': {
                        label: 'Autospawnclick GCs',
                        action: function () {
                            toggleAutoAction('autoGoldenCookie', function () {
                                if (Game.frenzy <= 0) {
                                    Game.goldenCookie.time = Game.goldenCookie.minTime;
                                    Game.goldenCookie.spawn();
                                }
                                if (Game.goldenCookie.last == "clot" || Game.goldenCookie.last == "ruin cookies") {
                                    if (Game.elderWrath > 0) {
                                        Game.goldenCookie.last = "blood frenzy"
                                    } else {
                                        Game.goldenCookie.last = "frenzy"
                                    }
                                    Game.frenzy = 1
                                }
                                if (Game.frenzy > 0) {
                                    Game.goldenCookie.toDie = 1
                                }
                                 if (Game.goldenCookie.life >= 0 && (Game.frenzy <= 0 || Game.frenzyPower < 2 || Game.goldenCookie.chain > 0)) {
                                    Game.goldenCookie.click();
                                }
                            })
                        }
                    },
                    'autoBuyUpgrades': {
                        label: 'Autobuy Upgrades',
                        action: function () {
                            toggleAutoAction('autoBuyUpgrades', function () {
                                buyUpgrades();
                            })
                        }
                    },
                    'fuckThemWrinklers': {
                        label: 'Slaughter Wrinklers',
                        action: function () {
                            toggleAutoAction('fuckThemWrinklers', function () {
                                setTimeout(function() { for (var i in Game.wrinklers) { var me=Game.wrinklers[i]; if (me.phase==2) { me.hurt=1; me.hp--; var x=me.x+(Math.sin(me.r*Math.PI/180)*100); var y=me.y+(Math.cos(me.r*Math.PI/180)*100); for (var ii=0;ii<4;ii++) { Game.particleAdd(x+Math.random()*50-25,y+Math.random()*50-25,Math.random()*4-2,Math.random()*-2-2,1,1,2,'wrinklerBits.png'); } } } }, 200);                            
                            })
                        }
                    },
                    'catchThemWonderdeer': {
                        label: 'Capture the Deer',
                        action: function () {
                            toggleAutoAction('catchThemWonderdeer', function () {           
                                setTimeout(function(){if (Game.seasonPopup.life > 0) {Game.seasonPopup.click()}},Math.floor(((Math.random()*7)+3)*2500));
                            })
                        }
                    },
                }
            };

            addStyleSheet();
            addPanel();
            for (var name in options.buttons) {
                if (!options.buttons[name]) {
                    return;
                }
                addButton(name, options.buttons[name].label, options.buttons[name].action);
            }

            function buyUpgrades() {
                for (var i = 0; i < Game.UpgradesById.length; i++) {
                    if ((i > 63 && i < 75) || i === 79 || (i > 82 && i < 86) || i === 91 || i === 124 || (i > 140 && i < 143) || i === 167 || (i > 181 && i < 186)) {
                        continue;
                    } else {
                        if (Game.UpgradesById[i].unlocked === 1) { 
                            if(Game.cookies >= Game.UpgradesById[i].basePrice) {                                
                                Game.UpgradesById[i].buy(); 
                            }
                        }
                    }
                }
            }

            //Lets bind some keys!!!
            //Buys one of specified building
            Mousetrap.bind('shift+1', function() { Game.ObjectsById[Game.ObjectsById.length - 11].buy(); }); //Cursor
            Mousetrap.bind('shift+2', function() { Game.ObjectsById[Game.ObjectsById.length - 10].buy(); }); //Grandma
            Mousetrap.bind('shift+3', function() { Game.ObjectsById[Game.ObjectsById.length - 9].buy(); }); //Farm
            Mousetrap.bind('shift+4', function() { Game.ObjectsById[Game.ObjectsById.length - 8].buy(); }); //Factory
            Mousetrap.bind('shift+5', function() { Game.ObjectsById[Game.ObjectsById.length - 7].buy(); }); //Mine
            Mousetrap.bind('shift+6', function() { Game.ObjectsById[Game.ObjectsById.length - 6].buy(); }); //Shipment
            Mousetrap.bind('shift+7', function() { Game.ObjectsById[Game.ObjectsById.length - 5].buy(); }); //Alchemy Lab
            Mousetrap.bind('shift+8', function() { Game.ObjectsById[Game.ObjectsById.length - 4].buy(); }); //Portal
            Mousetrap.bind('shift+9', function() { Game.ObjectsById[Game.ObjectsById.length - 3].buy(); }); //Time Machine
            Mousetrap.bind('shift+0', function() { Game.ObjectsById[Game.ObjectsById.length - 2].buy(); }); //Antimatter Condenser
            Mousetrap.bind('shift+-', function() { Game.ObjectsById[Game.ObjectsById.length - 1].buy(); }); //Prism

            //Sells one of specified building
            Mousetrap.bind('option+1', function() { Game.ObjectsById[Game.ObjectsById.length - 11].sell(); }); //Cursor
            Mousetrap.bind('option+2', function() { Game.ObjectsById[Game.ObjectsById.length - 10].sell(); }); //Grandma
            Mousetrap.bind('option+3', function() { Game.ObjectsById[Game.ObjectsById.length - 9].sell(); }); //Farm
            Mousetrap.bind('option+4', function() { Game.ObjectsById[Game.ObjectsById.length - 8].sell(); }); //Factory
            Mousetrap.bind('option+5', function() { Game.ObjectsById[Game.ObjectsById.length - 7].sell(); }); //Mine
            Mousetrap.bind('option+6', function() { Game.ObjectsById[Game.ObjectsById.length - 6].sell(); }); //Shipment
            Mousetrap.bind('option+7', function() { Game.ObjectsById[Game.ObjectsById.length - 5].sell(); }); //Alchemy Lab
            Mousetrap.bind('option+8', function() { Game.ObjectsById[Game.ObjectsById.length - 4].sell(); }); //Portal
            Mousetrap.bind('option+9', function() { Game.ObjectsById[Game.ObjectsById.length - 3].sell(); }); //Time Machine
            Mousetrap.bind('option+0', function() { Game.ObjectsById[Game.ObjectsById.length - 2].sell(); }); //Antimatter Condenser
            Mousetrap.bind('option+-', function() { Game.ObjectsById[Game.ObjectsById.length - 1].sell(); }); //Prism

             // Awesome textParticle mod, mostly for execution of "Cookie Clicker Cheats v.X.X launched!" message.
            Game.textParticlesAdd = function (text, el) {
                //pick the first free (or the oldest) particle to replace it
                var highest = 0;
                var highestI = 0;
                for (var i in Game.textParticles) {
                    if (Game.textParticles[i].life == -1) {
                        highestI = i;
                        break;
                    }
                    if (Game.textParticles[i].life > highest) {
                        highest = Game.textParticles[i].life;
                        highestI = i;
                    }
                }
                var i = highestI;
                var x = (Math.random() - 0.5) * 40;
                var y = 0; //+(Math.random()-0.5)*40;
                if (!el) {
                    var rect = l('game').getBoundingClientRect();
                    var x = Math.floor((rect.left + rect.right) / 2);
                    var y = Math.floor(((rect.bottom)) - 60);
                    x += (Math.random() - 0.5) * 40;
                    y += 0; //(Math.random()-0.5)*40;
                }
                var me = Game.textParticles[i];
                if (!me.l) me.l = l('particle' + i);
                me.life = 0;
                me.x = x;
                me.y = y - Game.textParticlesY;
                if (me.y < 60) {
                    for (var j = 0; j <= (rect.bottom); j++) {
                        me.y += (me.y - 60);
                    }
                }
                me.text = text;
                me.l.innerHTML = text;
                me.l.style.left = Math.floor(Game.textParticles[i].x - 200) + 'px';
                me.l.style.bottom = Math.floor(-Game.textParticles[i].y) + 'px';
                me.l.style.display = 'block';
                Game.textParticlesY += 60;
            }

            function autoAction(name, action) {
                if (!options.buttons[name]) {
                    return;
                }
                if (name == 'bigCookie') {
                    options.buttons[name].interval = setInterval(action, options.intervalDelay);
                } else {
                    options.buttons[name].interval = setInterval(action, options.longDelay);
                }
            }

            function stopAutoAction(name) {
                clearInterval(options.buttons[name].interval);
            }

            function toggleAutoAction(name, action) {
                if (!options.buttons[name].on) {
                    autoAction(name, action);
                    options.buttons[name].on = true;
                    options.buttons[name].element.className = 'active';
                } else {
                    stopAutoAction(name);
                    options.buttons[name].on = false;
                    options.buttons[name].element.className = '';
                }
            }

            function addPanel() {
                if (document.getElementById(options.panelId)) {
                    document.getElementById(options.panelId).remove();
                }
                options.panel = document.createElement("div");
                options.panel.id = options.panelId;
                document.body.appendChild(options.panel);
            }

            function addButton(name, label, action) {
                if (!options.buttons[name]) {
                    return;
                }
                options.buttons[name].element = document.createElement('button');
                options.buttons[name].element[(typeof document.body.style.WebkitAppearance == "string") ? "innerText" : "innerHTML"] = label;
                options.buttons[name].element.addEventListener('click', action);
                options.panel.appendChild(options.buttons[name].element);
            }

            function addStyleSheet() {
                var stylesClassName = options.panelId + '-styles';
                var styles = document.getElementsByClassName(stylesClassName);
                if (styles.length <= 0) {
                    styles = document.createElement('style');
                    styles.type = 'text/css';
                    styles.className += ' ' + stylesClassName;
                    document.body.appendChild(styles);
                }

                var css = '#' + options.panelId + '{position:fixed;top:25px;right:0;padding:5px;z-index:9999;}#' + options.panelId + ' button{margin-left: 5px; font-family:\"Kavoon\"; color:#2ba39f;}#' + options.panelId + ' button.active:after{content:"*";color:#1E7471;}';
                styles[(typeof document.body.style.WebkitAppearance == "string") ? "innerText" : "innerHTML"] = css;
            }

            var link = document.createElement('a');
            link.setAttribute('href', 'http://orteil.dashnet.org/experiments/cookie/');
            link.target = 'blank';
            link.appendChild(
            document.createTextNode('Cookie Clicker Classic'));
            var add = document.getElementsByTagName('div')[2];
            add.insertBefore(document.createTextNode('| '), add.lastChild);
            add.insertBefore(link, add.lastChild);

            if (window.location == "http://orteil.dashnet.org/cookieclicker/") {
                var linkb = document.createElement('a');
                linkb.setAttribute('href', 'beta');
                linkb.target = 'blank';
                linkb.appendChild(
                document.createTextNode('Try the beta!'));
                var addb = document.getElementsByTagName('div')[2];
                addb.insertBefore(document.createTextNode(' | '), add.lastChild);
                addb.insertBefore(linkb, add.lastChild);
            }
            var del = document.getElementById('links');
            del.parentNode.removeChild(del);
            return;
        })();

        var seasonalText;
        var d = new Date();

        if ((d.getMonth() == 1-1) && (d.getDate() == 1)) {
            seasonalText = "Happy New Year!"
        } else if ((d.getMonth() == 2-1) && (d.getDate() == 14)) {
            seasonalText = "Happy Valentine's Day!"
        } else if ((d.getMonth() == 3-1) && (d.getDate() == 17)) {
            seasonalText = "Happy St. Patrick's Day!"
        } else if ((d.getMonth() == 4-1) && (d.getDate() == 20)) {
            seasonalText = "Happy Easter Sunday!"
        } else if ((d.getMonth() == 7-1) && (d.getDate() == 4)) {
            seasonalText = "Happy 4th of July!"
        } else if ((d.getMonth() == 10-1) && (d.getDate() == 31)) {
            seasonalText = "Happy Halloween!"
        } else if ((d.getMonth() == 11-1) && (d.getDate() == 27)) {
            seasonalText = "Happy Thanksgiving!"
        } else if ((d.getMonth() == 12-1) && (d.getDate() == 25)) {
            seasonalText = "Merry Christmas!"
        }

        if (typeof (seasonalText) != 'undefined' && seasonalText != null) {
             var seasonText = seasonalText; 
            var br1 = document.createElement('br');  
            var br2 = document.createElement('br');  
            var append = document.createElement('div');
            append.setAttribute('id', 'seasonalText');
            append.setAttribute('class', 'commentsText');
            append.setAttribute('style', 'font-size:28px');
            append.appendChild(
            document.createTextNode(seasonText));
            var add = document.getElementById('comments');
            add.insertBefore(br1, add.lastChild);
            add.insertBefore(br2, add.lastChild);
            add.insertBefore(append, add.lastChild);
            Game.Popup(seasonalText);
        }

        setInterval(function() {Game.WriteSave()},20000);

        var script = document.createElement('script');
        script.setAttribute('src', 'https://gist.github.com/DanielJochem/8142934/raw');
        document.body.appendChild(script);

    } else {
        setTimeout(doSomething, 1000);
    }
}