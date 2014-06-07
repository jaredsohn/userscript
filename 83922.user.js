// ==UserScript==
// @name            The-West Düello TP Hesaplayıcı
// @namespace       http://userscripts.org/scripts/review/96794
// @description     Şehirlerdeki "Bar" penceresinde, motivasyonunuza göre düellodan kazanacağınız TP'yi gösterir. 
// @author          Dun [SOM - Scripts-O-Maniacs]
// @website         http://scripts-o-maniacs.leforum.eu
// @include         http://*.the-west.*/game.php*
// @version         1.0.1
// @history         1.0.1 Création
// ==/UserScript==

// MAJ Auto

var duel_version = "1.0.1";

var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {
    
    var insertBeforeElement = document.getElementById('left_top');
    
    var newScriptElement = document.createElement('script');
    newScriptElement.setAttribute('type', 'text/javascript');
    var myScript = "var duel_version = '"+duel_version+"';";
    newScriptElement.innerHTML = myScript;
    insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);

(function(f) {
    var d=document,s=d.createElement('script');
    s.setAttribute('type','application/javascript');
    s.textContent = '('+f.toString()+')()';
    (d.body||d.head||d.documentElement).appendChild(s);
    s.parentNode.removeChild(s)
})( function() {
    var level_duel = 0;
     
    var filler;
    function isNull(variable) {
        return (typeof(variable) === "undefined" || variable === null) ? true : false;
    }

    function refreshPage(element) {

        var detail ="", posBRfin="";
        var textNode = element.target;

        if(isNull(textNode)) {
            // Premiere page
            detail = element.innerHTML;

        } else {

            // Pages suivantes
            detail =textNode.innerHTML;
        }
        if(detail.indexOf('- TP')>0){
              posBRfin = detail.indexOf('- TP');
        }else{
              posBRfin = detail.lastIndexOf('<br>');
            
        }
        var motivation = $("duel_motivation_bar_num").innerHTML;
       
        motivation =  ( 0 + motivation.substring(0, (motivation.length - 1) ) ) / 100;
        
        var reg = new RegExp(":\\s*(\\d+)\\s*<")

        var result = reg.exec(detail);
     
         if(!isNull(result)) {
           
            var exp=result[1];

            var xpreel = ((7 * exp.trim()) - (5 * level_duel)) + 4;
            xpreel=xpreel.toFixed(0);

            var xp = xpreel * motivation;

            var cible;
            if(!isNull(textNode)) {
 
                textNode.innerHTML =  detail.substring(0, posBRfin) +   "<b> - TP " + xpreel + " (" + xp.toFixed(0)  + "</b>)";

            } else {
               
                element.innerHTML = detail.substring(0, posBRfin) + "<b> - TP "+ xpreel + " (" + xp.toFixed(0)  + ")</b></div>";

            }
            return true;
        }
        return false;

    }

    /**
     * Recherche un element avec une classe spécifié dans un element parent
     *
     */
    function getElementByClassName( element, id ) {

        var result = null;
        if ( element.getAttribute('class') == id )
            return element;

        for ( var indR = 0; indR < element.childNodes.length; indR++ ) {

            if ( element.childNodes[indR].nodeType == 1 ) {
                result = getElementByClassName( element.childNodes[indR], id );
                if ( result != null ) {
                    break;
                }

            }
        }

        return result;
    }

    function setXPForSaloon() {

        var divSaloon = $('tab_saloon');
        var motivation = getElementByClassName(divSaloon, 'bar_perc').innerHTML;

        motivation =  ( 0 + motivation.substring(0, (motivation.length - 1) ) ) / 100;
          
        var trJoueur = getElementByClassName(divSaloon, "saloon_duel_table").getElementsByTagName( "tr" );

        for( i = 1; i < trJoueur.length; i++ ) {
            var exp = trJoueur[ i ].childNodes[5].innerHTML;

            if( exp.length <= 5 ) {
                var xp = (0 + exp) * motivation;
                trJoueur[ i ].childNodes[5].innerHTML += " (" + xp.toFixed(0)  + ")";
            }
        }
    }

    

    function initLevelDuel() {

        level_duel = getLevelDuel();
        $('lvlduel').innerHTML="Düello seviyen : " + level_duel ;
        
    }

    function parsePage() {
        var element = $('op_duel_list').getElementsByTagName( "tr" );
         
        for(var i = 0; i < element.length; i++ ) {

            refreshPage(element[ i ].childNodes[1]);
            element[ i ].childNodes[1].addEventListener ("DOMNodeInserted", refreshPage, false);
        }
    }

    function setXPForDuelPage() {

        var lvlDuel= document.createElement("span");
        var tblOp = $('op_duel_list');
        var trJoueur = tblOp.getElementsByTagName( "tr" );

        lvlDuel.innerHTML = "<br><span style='cursor: pointer;' id='lvlduel'>Düello seviyen : " + level_duel +"</span>";
        parsePage();
        $('duel_op_picture').appendChild(lvlDuel);

        lvlDuel.addMousePopup(new MousePopup("<B>Düello seviyeni yenile</B>"));
        lvlDuel.addEventListener('click', function() {
                     initLevelDuel();
                     parsePage();
        }, false);
        return true;
    }

    function findDuelLevel(data) {

        var carObject =  JSON.parse(data);
        var html='<div id="char_avatar"> <div class="char_frame" style=\'overflow:visible\'> <div class=\'char_background\'></div> <img src=\'/images/transparent.png\' class="reward_opener" /> <table class="char_reward_show_slots" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="char_reward_drop expose_0"></td><td class="char_reward_drop expose_1"></td><td class="char_reward_drop expose_2"></td><td class="char_reward_drop expose_3"></td> </tr> </tbody> </table> <div class="char_reward_box"><div class="char_reward_box_background"></div> <div class="switch_prev ie0height" onmouseout="this.removeClass(\'glow_left\')" onmouseover="this.addClass(\'glow_left\')"></div> <div class="switch_next ie0height" onmouseout="this.removeClass(\'glow_right\')" onmouseover="this.addClass(\'glow_right\')"></div> <table class="char_reward_slots" cellspacing="0" cellpadding="0"> <tbody> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> </tbody> </table> </div> </div> <div id="char_avatar_img" style="display: inline-block;"> <img src="images/avatars/iroquois.jpg" alt="Avatar" class="char_avatar_picture" /> </div> </div> <div id="char_info"> <table> <tr> <th>Niveau</th> <td id="level">87</td> </tr> <tr> <th>Points d\'exp�rience</th> <td id="experience">314 / 7754</td> </tr> <tr> <th>Points de vie</th> <td id="health">2840 / 2840</td> </tr> <tr> <th>Repos</th> <td id="energy">30 / 100</td> </tr> <tr> <th>Vitesse</th> <td id="speed">6 mph (146%)</td> </tr> <tr> <th>Niveau de duel</th> <td>144</td> </tr> <tr> <th>Duels gagn�s</th> <td>359</td> </tr> <tr> <th>Duels perdus</th> <td>251</td> </tr> </table> </div> <div class="class_choose_icon_layer" id="character_window_choose_class_layer"> <a href="#" onclick="AjaxWindow.show(\'class_choose\');"><img id="character_choose_image" src="images/class_choose/characters_grey.png" alt="" /></a> </div> <br style="clear:both;" /> <br /> <h2>Classe de personnage: Soldat</h2> <br /> <div id="char_class_advantages"> <strong>Avantages:</strong><br /> <table cellspacing=\'0\' cellpadding=\'0\'> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_health_raise" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Pour chaque point d\'aptitude que tu attribues au points de vie, tu re�ois 10 points de vie en plus.</td></tr> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_item_wear_level" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Le niveau requis pour l\'usage d\'armes diminue de 6 niveaux. </td></tr> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_duel_tactic" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Pour un duel tu re�ois un bonus de 100% pour l\'aptitude "Tactique".</td></tr> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_fb_lead" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Au cours des batailles de forts, tu augmentes ton aptitude au commandement et celle de tes quatre voisins � hauteur de 50% de tes propres capacit�s de commandement.</td></tr> </table> </div> <img src="images/class_choose/symbol_soldier.png" id="char_class_symbol">';
      
        var tdChar = document.createElement("div");
        tdChar.innerHTML= carObject.page;
        tdChar=tdChar.getElementsByTagName("td");
 
        for(var ij = 0; ij < tdChar.length; ij++ ) {
            if(tdChar[ ij ].id == "speed") {
                level_duel = tdChar[ ij + 1 ];
                level_duel=level_duel.innerHTML.trim();
                  
                break;
            }
        }
         
        return level_duel;
    }

    function getLevelDuel() {

        filler=  new Ajax('game.php?window=character',   {
            async:'false',
            method:'post',
            data:{},
            onComplete: function(data) {

                level_duel =  findDuelLevel(data);
            }
        }).request();
        
        return level_duel;
    }

    // injection sur ouverture de la fenêtre de duel

    function initDuel() {

        AjaxWindow.setJSHTML_Saloon = AjaxWindow.setJSHTML;
        AjaxWindow.setJSHTML = function(div,content) {
            AjaxWindow.setJSHTML_Saloon(div,content);
            if(div && div.id && div.id.search(/saloon/) != -1) {

                setTimeout(setXPForSaloon, 100);

            }
        }
        AjaxWindow.setJSHTML_Duel = AjaxWindow.setJSHTML;
        AjaxWindow.setJSHTML = function(div,content) {
            AjaxWindow.setJSHTML_Duel(div,content);
            if(div && div.id && div.id.search(/duel/) != -1) {
            //   getLevelDuel();
              // attente pour la récupération du level duel 
                setTimeout(setXPForDuelPage, 1000);
            }
        }
        return true;
    }

    getLevelDuel();
    initDuel();

        //MAJ AUTO SOM
    })
    /***************************************************************
     * DOM Storage Wrapper Class
     *
     * Public members:
     *     ctor({"session"|"local"}[, <namespace>])
     *     setItem(<key>, <value>)
     *     getItem(<key>, <default value>)
     *     removeItem(<key>)
     *     keys()
     ***************************************************************/
    function Storage(type, namespace) {
        var object = this;

        if(typeof(type) != "string")
            type = "session";

        switch(type) {
            case "local": {
                object.storage = localStorage;
                }
                break;

            case "session": {
                object.storage = sessionStorage;
                }
                break;

            default: {
                object.storage = sessionStorage;
                }
                break;
        }

        if (!namespace || (typeof(namespace) != "string" && typeof(namespace) != "number"))
            namespace = "ScriptStorage";

        object.namespace = [namespace, "."].join("");

        object.setItem = function(key, value) {
            try {
                object.storage.setItem(escape([object.namespace, key].join("")), JSON.stringify(value));
            } catch(e) {
            }
        }
        object.getItem = function(key, defaultValue) {
            try {
                var value = object.storage.getItem(escape([object.namespace, key].join("")));
                if(value)
                    return eval(value);
                else
                    return defaultValue;
            } catch(e) {
                return defaultValue;
            }
        }
        object.removeItem = function(key) {
            try {
                object.storage.removeItem(escape([object.namespace, key].join("")));
            } catch(e) {
            }
        }
        object.keys = function() {
            var array = [];
            var indDun = 0;
            do {
                try {
                    var key = unescape(object.storage.key(indDun++));
                    if(key.indexOf(object.namespace) == 0 && object.storage.getItem(key))
                        array.push(key.slice(object.namespace.length));
                } catch(e) {
                    break;
                }
            } while(true);
            return array;
        }
    }

    /***************************************************************
     * ScriptUpdater Class
     *
     * Public members:
     *     ScriptUpdater.check(<script id>, <current script version>[, <callback function>])
     *     ScriptUpdater.forceCheck(<script id>, <current script version>[, <callback function>])
     *     ScriptUpdater.forceNotice(<script id>, <current script version>[, <callback function>])
     ***************************************************************/
    ScriptUpdater = {
        id: 96794,
        version: "1.03f",
        scriptId: null,
        scriptCurrentVersion: null,
        scriptCallbackFunction: null,
        scriptUseNotice: null,
        scriptForceNotice: null,
        scriptMetaTags: null,
        scriptStorage: null,
        icons: {
            install: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
            close: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
            uso: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D"
        },

        $: function(id) {
            return document.getElementById(id);
        },
        initialize: function(scriptId, scriptCurrentVersion, scriptCallbackFunction, scriptUseNotice, scriptForceNotice) {
            ScriptUpdater.scriptId = scriptId;
            ScriptUpdater.scriptCurrentVersion = scriptCurrentVersion;
            ScriptUpdater.scriptCallbackFunction = typeof(scriptCallbackFunction) == "function" ? scriptCallbackFunction : false;
            ScriptUpdater.scriptUseNotice = scriptUseNotice;
            ScriptUpdater.scriptForceNotice = scriptForceNotice;
            if(ScriptUpdater.scriptStorage == null) {
                ScriptUpdater.scriptStorage = new Storage("local", "ScriptUpdater." + scriptId);
            }
        },
        setValue: function(key, value) {
            if(ScriptUpdater.scriptStorage != null) {
                ScriptUpdater.scriptStorage.setItem(key, value);
            }
        },
        getValue: function(key, defaultValue) {
            if(ScriptUpdater.scriptStorage != null) {
                return ScriptUpdater.scriptStorage.getItem(key, defaultValue);
            } else {
                return defaultValue;
            }
        },
        getOffers: function() {
            var offers = ScriptUpdater.getValue("offers", "");
            return (typeof(offers) == "undefined" || typeof(offers.length) == "undefined" || typeof(offers.push) == "undefined") ? new Array() : offers;
        },
        addOffer: function(version) {
            var offers = ScriptUpdater.getOffers();
            offers.push(version);
            ScriptUpdater.setValue("offers", offers);
        },
        alreadyOffered: function(version) {
            var offers = ScriptUpdater.getOffers();
            for(var indDun = 0; indDun < offers.length; indDun++) {
                if(version.toString() == offers[indDun].toString())
                    return true;
            }
            return false;
        },
        addStyle: function(css) {
            var head = document.getElementsByTagName("head")[0];
            if (!head)
                return;
            var style = document.createElement("style");
            style.type = "text/css";
            style.textContent = css;
            head.appendChild(style);
        },
        parseMetaTags: function(metaTags) {
            function find_meta(element, index, array) {
                return (element.indexOf("// @") != -1);
            }

            var headers = {};
            var name, prefix, header, key, value;
            var lines = metaTags.split(/\n/).filter(find_meta);

            for(var indDun in lines) {

                if(typeof(lines[indDun]) == "string") {
                    name = lines[indDun].match(/\/\/ @(\S+)\s*.*/)[1];
                    value = lines[indDun].match(/\/\/ @\S+\s*(.*)/)[1];
                    key = name.split(/:/).reverse()[0];
                    prefix = name.split(/:/).reverse()[1];

                    if(prefix) {
                        if(!headers[prefix]) {
                            headers[prefix] = new Object;
                        }
                        header = headers[prefix];
                    } else {
                        header = headers;
                    }

                    if(header[key] && !(header[key] instanceof Array)) {
                        header[key] = new Array(header[key]);
                    }

                    if(header[key] instanceof Array) {
                        header[key].push(value);
                    } else {
                        header[key] = value;
                    }
                }
            }
            return headers;
        },
        checkRemoteScript: function() {

            if(ScriptUpdater.scriptCurrentVersion && !ScriptUpdater.alreadyOffered(ScriptUpdater.scriptCurrentVersion)) {
                ScriptUpdater.addOffer(ScriptUpdater.scriptCurrentVersion);
            }

            var date = new Date();
            ScriptUpdater.setValue("lastCheck", parseInt(date.getTime()));

            var su_script=document.createElement('iframe');
            su_script.setAttribute('id', 'updater_96794');
            su_script.setAttribute('style', 'display:none;');
            su_script.src="http://userscripts.org/scripts/source/96794.meta.js";

           // su_script.src="http://userscripts.org/scripts/review/96794";
            document.body.appendChild(su_script);

            window.addEventListener('message', onMessage, true);

            function onMessage(e) {
                if (e.origin != "http://userscripts.org")
                    return;
                myversion = unescape(e.data);
                if (myversion.substring(0, myversion.indexOf("/")) == 96794)
                    gonextstep();
            }

            function gonextstep() {
                ScriptUpdater.scriptMetaTags = ScriptUpdater.parseMetaTags(myversion);
                ScriptUpdater.setValue("versionAvailable", ScriptUpdater.scriptMetaTags.version);
                if(ScriptUpdater.scriptForceNotice || (!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version) && ScriptUpdater.scriptUseNotice)) {
                    if(!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version)) {
                        ScriptUpdater.addOffer(ScriptUpdater.scriptMetaTags.version);
                    }
                    ScriptUpdater.showNotice();
                }
                if(typeof(ScriptUpdater.scriptCallbackFunction) == "function") {
                    ScriptUpdater.scriptCallbackFunction(ScriptUpdater.scriptMetaTags.version);
                }
            }

        },
        getLastCheck: function() {
            return ScriptUpdater.getValue("lastCheck", 0);
        },
        getInterval: function() {
            var interval = ScriptUpdater.getValue("interval", 86400000);
            return (typeof(interval) == "undefined" || !interval.toString().match(/^\d+$/)) ? 86400000 : parseInt(interval.toString());
        },
        setInterval: function(interval) {
            ScriptUpdater.setValue("interval", parseInt(interval));
        },
        check: function(scriptId, scriptVersion, scriptCallbackFunction) {
            ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
            var date = new Date();
            if((date.getTime() - ScriptUpdater.getLastCheck()) > ScriptUpdater.getInterval()) {
                ScriptUpdater.checkRemoteScript();
            }
        },
        forceCheck: function(scriptId, scriptVersion, scriptCallbackFunction) {
            ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
            ScriptUpdater.checkRemoteScript();
        },
        forceNotice: function(scriptId, scriptVersion, scriptCallbackFunction) {
            ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, true);
            ScriptUpdater.checkRemoteScript();
        },
        showNotice: function() {
            if(ScriptUpdater.scriptMetaTags.name && ScriptUpdater.scriptMetaTags.version) {
                ScriptUpdater.addStyle([
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Mask { position:fixed; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body * { border:none; font-size:12px; color:#333; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body { width:500px; margin:auto; top:125px; position:fixed; left:35%; text-align:left; background:#DED7C5; border:1px outset #333; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:5px; cursor:default; z-index:9010; color:#333; padding-bottom:1em ; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body a { margin:0 .5em; text-decoration:underline; color:#000099; font-weight:bold; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body strong { font-weight:bold; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 { font-size:13px; font-weight:bold; padding:.5em; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h2 { font-weight:bold; margin:.5em 1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; cursor:help; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a:hover { text-decoration:underline; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body table { width:auto; margin:0 1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr th { padding-left:2em; text-align:right; padding-right:.5em; line-height:2em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr td { line-height:2em; font-weight:bold; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body li { list-style-type:circle; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body p { font-size:12px; font-weight:normal; margin:1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "History { margin:0 1em 1em 1em; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em; width:448px; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "History ul { margin-left:2em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Close { float:right; cursor:pointer; height:14px; opacity:.5; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Close:hover { opacity:.9; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer { margin:.75em 1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input { border:1px outset #666; padding:3px 5px 5px 20px; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; width:70px; float:right; margin-left:.5em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input:hover { background-color:#f9f9f9; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer select { border:1px inset #666; }"].join(""),
                ""
                ].join("\n"));

                var html = new Array();
                html.push(["<h2><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.id, "\" target=\"_blank\" title=\"About the Userscripts.org Script Updater\"><img src=\"", ScriptUpdater.icons.uso, "\" align=\"absmiddle\" style=\"margin-top:-2px;\"/></a><img id=\"ScriptUpdater", ScriptUpdater.scriptId, "Close\" src=\"", ScriptUpdater.icons.close, "\" title=\"Close\"/>Userscripts.org Updater</h2>"].join(""));

                if(!ScriptUpdater.scriptForceNotice) {
                    html.push(["<p>There is a new version of <strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\">", ScriptUpdater.scriptMetaTags.name, "</a></strong> available for installation.</p>"].join(""));
                } else {
                    html.push(["<p><strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\" style=\"margin:0; padding:0;\">", ScriptUpdater.scriptMetaTags.name, "</a></strong></p>"].join(""));
                }

                if(ScriptUpdater.scriptCurrentVersion) {
                    html.push(["<p>You currently have version <strong>", ScriptUpdater.scriptCurrentVersion, "</strong> installed. The latest version is <strong>", ScriptUpdater.scriptMetaTags.version, "</strong></p>"].join(""));
                }

                if(ScriptUpdater.scriptMetaTags.history) {
                    html.push(["<h2>Version History:</h2><div id=\"ScriptUpdater", ScriptUpdater.scriptId, "History\">"].join(""));

                    var history = new Array();
                    var version, desc;
                    if(typeof(ScriptUpdater.scriptMetaTags.history) != "string") {
                        for(var indDun = 0; indDun < ScriptUpdater.scriptMetaTags.history.length; indDun++) {
                            version = ScriptUpdater.scriptMetaTags.history[indDun].match(/(\S+)\s+.*$/)[1];
                            change = ScriptUpdater.scriptMetaTags.history[indDun].match(/\S+\s+(.*)$/)[1];

                            history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
                            history[version].push(change);
                        }
                    } else {
                        version = ScriptUpdater.scriptMetaTags.history.match(/(\S+)\s+.*$/)[1];
                        change = ScriptUpdater.scriptMetaTags.history.match(/\S+\s+(.*)$/)[1];
                        history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
                        history[version].push(change);
                    }

                    for(var v in history) {

                        if(typeof(v) == "string" && v.match(/v?[0-9.]+[a-z]?/) || typeof(v) == "number") {
                            html.push(["<div style=\"margin-top:.75em;\"><strong>v", v, "</strong></div><ul>"].join(""));
                            for(var indDun = 0; indDun < history[v].length; indDun++) {
                                html.push(["<li>", history[v][indDun], "</li>"].join(""));
                            }
                            html.push("</ul>");
                        }
                    }

                    html.push("</div>");
                }

                html.push(["<div id=\"ScriptUpdater" + ScriptUpdater.scriptId + "Footer\">", "<input type=\"button\" id=\"ScriptUpdater", ScriptUpdater.scriptId, "CloseButton\" value=\"Close\" style=\"background-image:url(", ScriptUpdater.icons.close, ")\"/><input type=\"button\" id=\"ScriptUpdater" + ScriptUpdater.scriptId + "BodyInstall\" value=\"Install\" style=\"background-image:url(", ScriptUpdater.icons.install, ");\"/>", "Check this script for updates "].join(""));
                html.push(["<select id=\"ScriptUpdater", ScriptUpdater.scriptId, "Interval\">",
                "<option value=\"3600000\">every hour</option>",
                "<option value=\"21600000\">every 6 hours</option>",
                "<option value=\"86400000\">every day</option>",
                "<option value=\"604800000\">every week</option>",
                "<option value=\"0\">never</option>",
                "</select>"].join(""));
                html.push("</div>");

                var noticeBackground = document.createElement("div");
                noticeBackground.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Mask"].join("");
                document.body.appendChild(noticeBackground);

                var noticeWrapper = document.createElement("div");
                noticeWrapper.setAttribute("style", "position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;");
                noticeWrapper.id = ["ScriptUpdater", ScriptUpdater.scriptId, "BodyWrapper"].join("");

                var notice = document.createElement("div");
                notice.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Body"].join("");
                notice.innerHTML = html.join("");

                noticeWrapper.appendChild(notice);

                document.body.appendChild(noticeWrapper);

                ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Close"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
                ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "CloseButton"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
                ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "BodyInstall"].join("")).addEventListener("click", function() {
                    setTimeout(ScriptUpdater.closeNotice, 500);
                    document.location = ["http://userscripts.org/scripts/source/", ScriptUpdater.scriptId, ".user.js"].join("");
                }, true);
                var selector = ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Interval"].join(""));
                for(var indDun = 0; indDun < selector.options.length; indDun++) {
                    if(selector.options[indDun].value.toString() == ScriptUpdater.getInterval().toString())
                        selector.options[indDun].selected = true;
                }

                ScriptUpdater.setInterval(selector.value);
                selector.addEventListener("change", function() {
                    ScriptUpdater.setInterval(selector.value);
                }, true);
                window.addEventListener("keyup", ScriptUpdater.keyUpHandler, true);
            }
        },
        closeNotice: function() {
            document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'BodyWrapper'].join("")));
            document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'Mask'].join("")));
            window.removeEventListener("keyup", ScriptUpdater.keyUpHandler, true);
        },
        keyUpHandler: function(event) {
            switch(event.keyCode) {
                case 27:
                    ScriptUpdater.closeNotice();
                    break;
            }
        }
    };

    //ScriptUpdater.forceNotice(96794, duel_version);
    //ScriptUpdater.forceCheck(96794, duel_version);
    ScriptUpdater.uncheck(96794, duel_version);
} else {
    (function(f) {
        var d=document,s=d.createElement('script');
        s.setAttribute('type','application/javascript');
        s.textContent = '('+f.toString()+')()';
        (d.body||d.head||d.documentElement).appendChild(s);
        s.parentNode.removeChild(s)
    })( function() {
        function sendMessage() {
            var dstWindow = window.parent;
            mymessage = String(escape(document.body.textContent));
            if(dstWindow.postMessage) {
                dstWindow.postMessage('96794'+mymessage, '*');
            }
        }

        sendMessage();
    })
}
//FIN MAJ AUTO SOM