
// ==UserScript==
// @name           Da Grease Master
// @namespace      D-
// @description    Script pour l'ajout de modules dans le DGM - version onefile pour chrome - v5.0beta
// @include        http://www.hordes.fr/*
// ==/UserScript==


/****************************************************************************/
/******************************** common.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// common.js
// Ensemble de fonctionnalitées diverses et utilisable partout

//§ Flags: Oblig
//§ Rank: 1


/**
 * Fonction de debugage standar
 */
function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}


/**
 * Rends l'ecriture de chaine de caractére plus lisible.
 * Utilisation: "Afficher: {0}".format(texte);
 * la valeur de la variable texte prendra alors la place de {0}
 * dans la chaine de caractéres
 *
 * @param       Variable(s) a inserer dans le texte
 */
String.prototype.format = function() {
    var s = this;
    
    for(var i=0; i<arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i]);
    }

    return s;
}


/**
 * Indique si une valeur est dans le tableau
 *
 * @param array         Tableau dans lequel faire le test
 * @param element       Element que l'on désire situer dans le tableau
 *
 * @return              true s'il est trouvé, false sinon
 */
arrayHas = function(array, element) {
    for(i=0; i<array.length; i++) {
        if(array[i] == element)
            return true;
    }
    
    return false;
} 


/**
 * Rends l'ecriture de chaine de caractére plus lisible.
 * Utilisation: format("Afficher: {0}", texte);
 * la valeur de laa variable texte prendra alors la place de {0}
 * dans la chaine de caractéres
 *
 * @param {String} str      Texte dans lequel on souhaite 
                            inserer des variables
 * @param                   Variable(s) a inserer dans le texte
 */
String.format = function(str) {
    var s = arguments[0];
    
    for(var i=0; i<arguments.length-1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i+1]);
    }

    return s;
}


/**
 * Récupére un element via son ID.
 *
 * @param id        ID de l'élément de la page à récupérer
 */
function $(id) {
    return document.getElementById(id);
}


/**
 * Récupére un element dans type via un chemin relatif.
 *
 * @param expression                Chemin en XPath vers la cible
 * @param contextNode               Noeud de départ pour la recherche
 * @param {XPathResult} type        Résultat voulu
 */
function $xpath(expression, contextNode, type)
{
    if(!contextNode)
        contextNode = document.body;
    
    var doc = (contextNode.nodeType == 9 ? contextNode : contextNode.ownerDocument);
    
    if(!type) {
        return doc.evaluate(
                expression, contextNode, null, 
                XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    } else {
        return doc.evaluate(
                expression, contextNode, null, 
                type, null);
    }
}


/**
 * Fonction permettant d'appeler une fonction définie derrière les wrappers à partir d'une fonction js de la page (unsafeWindow)
 * Gardez en mémoire que toute fonction appelée par ce moyen peut avoir ses arguments altérés !
 * Si ses arguments doivent provenir d'un script de page, le mieux reste de faire une closure 
 * contenant ces arguments dupliqués, sans /références/ vers un élément externe !
 * (utiliser la fonction copy() pour ce faire)
 *
 * @param {function} fun        Fonction que l'on souhaite appeller
 */
window.unsafeCall = function unsafeCall(fn) {
    if(typeof fn == 'function')
        window.setTimeout(fn, 0);
    else {
        console.error("Error: window.unsafeCall argument must be a Function!");
        console.error(fn);
    }
};


/**
 * Sépare le prototype/appel d'une fonction en {name:nom, params:[params], body:corps}
 *
 * @param {function or String} fun          Fonction à décortiquer
 */
function explodeFunction(fun) {
    if(fun === undefined) 
        return undefined;
    
    if((typeof fun != 'function') && (typeof fun != 'string'))
        throw "explodeFunction: argument must be a Function or String !";
    
    var res = {};
    var s = String(fun);
    
    // extrait le nom
    var exp = /(?:function\s)?\s*(\w*)\s*\(/g; // le g est juste pour avoir lastIndex (coz leftContext deprecated)
    exp.lastIndex = 0; // autrement le lastIndex est conservé (!!) entre deux appels de la fonction (effet de bord, RegExp précompilée)
    var r = exp.exec(s);
    res.name = (r && r[1]);
    s = s.substr(exp.lastIndex);

    // extrait les arguments
    res.args = [];
    // voir (#) pour le fun
    var _s = s.replace(/\\./g, 'XX'); // vire les échappements (partout) <= si c'est pas du génie !?
    while(1) {
        _s = s.replace(/^\s*/, ''); // ltrim
        if(r = /^(["'])(.*?)\1\s*[,\)]/.exec(_s)) { // chaine
            arg = r[1]+( s.substr(1, r[2].length) )+r[1]; // prend de la chaîne non échappée !!
        } else if(r = /^(\(function\s+\w*\([^\)]*\)\s*{.*?}\))[,\)]/.exec(_s)) { // fonction en paramètre : (function () {...})
            arg = r[1];
        } else if(r = /^(\(void 0\))/.exec(_s)) { // (void 0) cas particulier car finit par ')'
            arg = r[1];
        } else if(r = /^([^,\){]+)[,\)]/.exec(_s)) { // arguments
            arg = r[1];
        } else 
            break;
        res.args.push(arg.replace(/^\s*|\s*$/g, '')); // trim
        _s = _s.substr(r[0].length);
        s = s.substr(r[0].length);
    }

    // le corps
    var b = s.indexOf('{');
    var e = s.lastIndexOf('}');
    if(b != -1 && e != -1)
        res.body = s.substring(b+1, e);
    else 
        res.body = '';

    return res;
}


/**
 * Retire les espaces de debut et de fin
 *
 * @param str       Chaine que l'on souhaite trimer
 */
function trimSpace(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}


/**
 * merge deux objets, les propriétés identiques seront écrasées par le second
 * ATTENTION : ce n'est pas un merge en profondeur toutes les propriétés de niveau 1
 * sont rassemblées, mais les références sont toujours liées aux objets de base !
 */
function mergeObjectsNotDeep(o1, o2) {
    var o = {}, p;

    for(p in o1) o[p] = o1[p];
    for(p in o2) o[p] = o2[p];

    return o;
}


/**
 * Echappe chaque caractère appartenant à chars dans str
 *
 * @param chaine       Chaine que l'on veut traiter
 * @param chars     Liste de caractéres
 *
 * @return          Chaine échappée
 */
function escapeStr(chaine, l_char) {
    for(var i=0; i<l_char.length; i++)
        chaine = chaine.split(l_char[i]).join('\\'+l_char[i]);
    
    return chaine;
};


/**
 * Donne un nombre compris entre min et max.
 * Si max est omis, le nombre sera compris entre 0 et max
 *
 * @param min       Borne inférieure    
 * @param max       Borne supérieure
 *
 * @return          Nombre aléatoire
 */
function randInt(min, max) {
    if(max == undefined) {
        max = min;
        min = 0;
    }
    
    return Math.floor(Math.random() * (max-min+1) + min);
}


/**
 * Retourne un élément du tableau donné choisit au hasard
 *
 * @param tableau       Tableau de valeur
 *
 * @return              Element du tableau pris au hasard
 */
function any(tableau) {
    return tableau[randInt(tableau.length-1)];
}

/**
 * Calcule une sorte de hashage texte sur chaine
 * pas de contrainte forte
 *
 * @param str       Chaine
 */
function str2hash(str){ 
    var hash = "";
    var dec = str.charCodeAt(0);
    
    for(var i=1; i< str.length; i++)
        hash += ( (dec+str.charCodeAt(i)) % 16 ).toString(16);
    
    return hash;
}


// TODO WTF is that ?
// $grep(subject, callback) - par Hypher
// Retourne subject privé de certains de ses membres
// Si subject est une String, callback doit être une RegExp, retourne la première parenthèse capturante 
//    de callback, ou bien true si la chaîne match mais qu'il n'y a pas de parenthèse capturante, sinon false
//    Si RegExp est global (/.../g), renvera un tableau de tous les éléments matchés, sinon false
// Si subject est un Array, retourne un Array privé de certains des élément de subject
// Si subject est un Object, retourne un Object privé de certaines méthodes
// Si callback est une Function, ne conserve que les éléments/membres pour lesquels callback(val, key) renvoie true
// Si callback est une RegExp, ne conserve que les éléments/membres dont la valeur/le nom matchent RegExp
function $grep(subject, callback)
{
	if(typeof subject == 'string') {
		if(!(callback instanceof RegExp))
			throw '$grep: expected RegExp for second parameter if the first one is a String';
		var res, exp = callback;
		if(exp.global) {
			var ress = [], lastIndex = -1;
			while((res = exp.exec(subject)) && (exp.lastIndex != lastIndex)) {
				lastIndex = exp.lastIndex; // évite de boucler si un con a fait : /(.*?)/g => la production nulle sort tjrs sans avancer dans la chaîne
				if(res[1] !== undefined) ress.push(res[1]);
			}
			return ress;
		}
				
		if(res = exp.exec(subject)) {
			if(res[1] !== undefined) return (res[1]);
			else return true;
		}
		return false;
	}

	if(callback instanceof RegExp) {
		var exp = callback;
		callback = function(elem){ return exp.test(elem); }
	}
	
	if(subject instanceof Array) {
		var array = [];
		for(var i=0; i<subject.length; i++) {
			if(callback(subject[i], i))
				array.push(subject[i]);
		}
		return array;
	} else if(subject instanceof Object) {
		var object = {};
		for(var prop in subject) {
			if(callback(subject[prop], prop))
				object[prop] = subject[prop];
		}
		return object;
	} else return subject;
}


/****************************************************************************/
/******************************** prototypes.core.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// prototypes.core.js
// Définit tous les prototypes de base du DGM

//§ Flags: Oblig
//§ Rank: 10

/**
 * Prototypes de base.
 * Tout objet Core, Tool ou Module utilise ce prototype comme "classe mére"
 *
 * @param {String} classname        Nom de la classe en cours de création
 * @param {Object} properties       Liste des propriétés de l'objet a créer
 */
function Component(classname, properties) {
    if(typeof classname != 'string')
        throw TypeError("Component constructor: first argument must be the class name string");
    if(typeof properties != 'object')
        throw TypeError("Component constructor: second argument must be the properties list");

    var base = {
        classname: classname,
        options: {hide: false},
        
        // Niveau de debugage du Component
        // Tout message de niveau supérieur ne sera pas affiché
        DEBUG_MODE: 1,
        
        // Interface pour utiliser la DB
        // Permet d'obtenir des noms d'entrée qui devraient être unique si tout les modules font appel
        // a cette "interface"
        db: {
            set: function (entry, val) { database.set("{0}/{1}".format(classname, entry), val); },
            get: function (entry, defaultVal, disable_cache) { return database.get("{0}/{1}".format(classname, entry), defaultVal, disable_cache); },
            delete: function (entry) { database.delete("{0}/{1}".format(classname, entry)); },
            
            getArray: function (arrayName) {
                return database.getArray("{0}/{1}".format(classname, arrayName));
            },
            getFromArray: function (arrayName, index, defaultVal) {
                return database.getFromArray("{0}/{1}".format(classname, arrayName), index, defaultVal);
            },
            setToArray: function (arrayName, index, val) {
                database.setToArray("{0}/{1}".format(classname, arrayName), index, val);
            },
        },
        
        // Interface pour utiliser le debugeur
        // Même principe que pour la DB
        /**
         * Affiche un message normal via le debugeur
         *
         * @param {String} message      Message de debugage
         * @param {Integer} level       Niveau de debugage du message
         */
        debug: function (message, level) {
            // Verifie le niveau de debugage
            if((level || 1) > base.DEBUG_MODE)
                return;
            
            // Fonction appellante
            var caller = (arguments.callee.caller.name || "?");
            
            if(typeof debugeur != "undefined")
                debugeur.debug(message, "{0}.{1}".format(classname, caller), level);
            else
                console.log("{0}.{1}: {2}".format(classname, caller, message));
        },
        
        
        /**
         * Affiche un message d'erreur via le debugeur
         *
         * @param {String} message      Message de debugage
         * @param ex                    Exception ayant causé l'erreur
         * @param {Integer} level       Niveau de debugage du message
         */
        debugException: function (message, ex, level) {
            // Si on ne fournit que l'exception
            if(arguments.length == 1) {
                ex = message;
                message = "";
            }
            
            // Verifie le niveau de debugage
            if((level || 1) > base.DEBUG_MODE)
                return;
            
            // Fonction appellante
            var caller = (arguments.callee.caller.name || "?");
            
            if(typeof debugeur != "undefined")
                debugeur.debugException(message, "{0}.{1}".format(classname, caller), ex);
            else
                console.log("{0}.{1}: {2}".format(classname, caller, message));
        },
    };
    
    base.toRealString = base.toString;
    base.toRealSource = base.toSource;
    
    // pour éviter trop de texte en cas de debug
    base.toString = function() { return "[Component {0}]".format(base.classname); };
    base.toSource = function() { return "(void '{0}')".format(base.classname); };

    // adjoint à cette base les propriétés de l'objet final passées en paramètre
    for(var p in properties)
        base[p] = properties[p];

    // sauvegarde de l'original - AQ en TEST, TODO inutile ?
    base['original_properties']= properties;

    return base;
}


/**
 * Prototypes des objets core. Est core tout objet primordial pour le
 * fonctionnement du chargement et de l'application correcte des modules.
 * (dispatcher, localisation, settings)
 *
 * @param {String} classname    Nom de la classe en cours de création
 * @param {Object} properties   Liste des propriétés de l'objet a créer
 */
function Core(classname, properties) {
    var core = new Component(classname, properties);
    
    core.componentType = "Core";
    core.isCore = function() { return true; };
    core.isTool = function() { return false; };
    core.isModule = function() { return false; };
    
    if(classname == "Dispatcher") {
        // On est en train de créer le Dispatcher, on ne peut donc pas encore utiliser
        // Dispatcher.registerCore, le Dispatcher devra le faire manuellement après sa création
        // (code rajouté pour la compréhension)
    } else {
        if(!Dispatcher)
            core.debug("Erreur critique en enregistrant {0}, le Dispatcher n'existe pas !".format(classname), -1);
        Dispatcher.registerCore(core);
    }
    
    return core;
}


/**
 * Prototypes des outils. Un outil est un genre de librairies de
 * fonctions utilitaire oeuvrant dans un but commun.
 *
 * @param {String} classname    Nom de l'outil en cours de création
 * @param {Object} properties   Liste des propriétés de l'outil a créer
 */
function Tool(classname, properties) {
    var tool = new Component(classname, properties);
    
    tool.componentType = "Tool";
    tool.isCore = function() { return false; };
    tool.isTool = function() { return true; };
    tool.isModule = function() { return false; };
    
    Dispatcher.registerTool(tool);
    
    return tool;
}


/**
 * Prototypes des modules.
 *
 * @param {String} classname    Nom de la classe en cours de création
 * @param {Object} properties   Liste des propriétés de l'objet a créer
 */
function Module(classname, properties) {
    var module = new Component(classname, properties);
    
    module.componentType = "Module";
    module.isCore = function() { return false; };
    module.isTool = function() { return false; };
    module.isModule = function() { return true; };
    
    Dispatcher.registerModule(module);
    
    return module;
}


/****************************************************************************/
/******************************** dispatcher.core.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// dispatcher.core.js
// Ce composant noyau permet aux autres composants de s'y enregistrer et de se faire initialiser
// il se greffe sur les fonctions de callback de XmlHttp de la page et active les modules ayant
// enregistré une fonction de callback sur cette page

//§ Flags: Oblig
//§ Rank: 20

// Les composants appellent automatiquement registerCore / registerModule à leur déclaration (sauf le Dispatcher lui même)
// Ils doivent donc être déclarés APRES la déclaration de Dispatcher
// Voici l'ordre des actions :
// - Déclaration du Dispatcher
// - Enregistrement du Dispatcher
// - Déclaration des composants (noyau en premier, puis modules)
// - Appel de Dispatcher.main qui :
//   - Appelle des fonctions initialize() de chaque composant
//     - Dont Dispatcher.initialize() (en premier) qui se greffe sur js.XmlHttp
//   - Appelle les callbacks des modules de la page courante
//
// De plus, à chaque appel de la fonction greffée onEnd :
//   - Appel des callbacks des modules de la page courante


const GM_KEY_MODS_DISABLED = "mods_disabled"; // variable GM pour stocker les modules désactivés


/**
 * Permet d'initialiser les autres composants et les active
 * sur les pages qui leurs correspondent.
 *
 * @param {String} classname    Nom de la classe en cours de création
 * @param {Object} properties   Liste des propriétés de l'objet a créer
 */
Dispatcher = new Core("Dispatcher", {
    l_core: {},     // liste des composants noyau : {classname:ref, ...}
    l_tool: {},     // liste des outils : {classname:ref, ...}
    l_module: {},   // liste des modules : {classname:ref, ...}
    
    l_callback: {},             // liste des fonctions de callback associées à une page : {pagecode:{modclassname: {'module':module, l_callback:[{'callback':callback, 'modifier':modifier}, ...]}, ...}, ...}
    l_activeModule: {},         // liste des modules actifs sur la page courante {modclassname:module, ...}
    l_currentPagecodes: {},     // contient le retour de pagedetect.getPageCodes() après l'appel de Dispatcher.activateMods()
    
    data_preprocessors: [], // liste des préprocesseurs des données hordiennes (paramètre de onData) : [{'comref':comref , 'callback':fn}, ...]

    // Pour ModMan
    label: "Dispatcher",
    options: {
        hide: true,
        icon: "http://data.hordes.fr/gfx/icons/item_pc.gif",
        htmldesc: "Coeur de DGM. Permet d'enregistrer les modules et de les appeler lorsque l'on est sur la bonne page. Se greffe sur les fonctions asynchrones Ajax de Hordes.",
        credits: "Hypher sur une idée géniale de Bluflonalgul. Greffe d'après HMUpdater.",
    },
    
    // Accesseurs
    getCoreByClassname: function getCoreByClassname(ccn) { return Dispatcher.l_core[ccn]; },
    getModByClassname: function getModByClassname(mcn) { return Dispatcher.l_module[mcn]; },
    getToolByClassname: function getToolByClassname(tcn) { return Dispatcher.tool[tcn]; },
    getComponentByClassname: function getComponentByClassname(cn) { return (Dispatcher.l_core[cn] || Dispatcher.l_module[cn] || Dispatcher.l_tool[cn]); },
    isModDisabled: function isModDisabled(mcn) { return Dispatcher.l_module[mcn].disabled; },
    getAllCores: function getAllCores() { return Dispatcher.l_core; },
    getAllMods: function getAllMods() { return Dispatcher.l_module; },
    getAllTools: function getAllTools() { return Dispatcher.l_tool; },
    getAllComponents: function getAllComponents() { return mergeObjectsNotDeep(mergeObjectsNotDeep(Dispatcher.l_core, Dispatcher.l_module), Dispatcher.l_tool); },
    
    // AfterAll : pour pas oublier qu'on peut l'appeler qu'à la fin de tous les callbacks ! (genre dans un Event)
    getCurrentActiveModsAfterAll: function getCurrentActiveModsAfterAll() { return Dispatcher.l_activeModule; },


    /**
     * Appellée lorsque tout les composants ont été enregistré
     * Initialise tout les composants
     */
    main: function main () {
        // Permet de desactiver le DGM a certains endroits
        if($('_DGM_DO_NOT_EXEC_HERE_'))
            return Dispatcher.debug("_DGM_DO_NOT_EXEC_HERE_: do nothing.");
        
        Dispatcher.getComponentByClassname.DEBUG_NO_TRACE = true;
        
        // Initialise les composants noyau
        for(var classname in Dispatcher.l_core) {
            var core = Dispatcher.l_core[classname];
            Dispatcher.debug(classname);
            
            if(core.disabled) {
                Dispatcher.debug("Le composant noyau {0} est désactivé !".format(classname));
                continue;
            }
            
            try {
                Dispatcher.debug("Initialisation du composant noyau {0}.".format(classname), 2);
                core.initialize.apply(core);
            } catch(ex) {
                Dispatcher.debugException("Erreur: l'initialisation du composant noyau {0} a échoué.".format(classname), ex);
            }
        }
        
        // Initialise les modules
        for(var classname in Dispatcher.l_module) {
            var module = Dispatcher.l_module[classname];
            
            try {
                Dispatcher.debug("Initialisation du module {0}.".format(classname), 2);
                module.initialize.apply(module);
            } catch(ex) {
                Dispatcher.debugException("Erreur: l'initialisation du module {0} a échoué.".format(classname), ex);
            }
        }
            
        horloge.initialize();
        
        pagedetect.hook();
    },


    /**
     * Initialise le Dispatcher
     */
    initialize: function initialize() {
        Dispatcher.hook();
    },
    

    /**
     * Réalise les greffes sur les requêtes XmlHttp
     */
    hook: function hook() {
        if(!window.wrappedJSObject.js)
            return Dispatcher.debug("window.wrappedJSObject.js non définit, greffes impossibles.");
        
        // se greffe sur js.XmlHttp.onData pour récupérer urlForBack
        Dispatcher.debug("Greffe sur window.wrappedJSObject.js.XmlHttp.onData", 2);
        try{
            window.wrappedJSObject.js.XmlHttp._dgm_onData = window.wrappedJSObject.js.XmlHttp.onData;
            window.wrappedJSObject.js.XmlHttp.onData = function onData(data) {
                // exécute les préprocesseurs de données hordiennes
                try{
                    for(var dpi in Dispatcher.data_preprocessors) {
                        Dispatcher.debug(dpi);
                        var dp = Dispatcher.data_preprocessors[dpi];
                        
                        if(!dp.comref.disabled) {
                            Dispatcher.debug("Appelle le préprocesseur de données "+dp.comref.classname+"."+dp.callback.name, 2);
                            try{
                                data = dp.callback.call(dp.comref, data);
                            } catch(ex) {
                                Dispatcher.debug("Erreur: le dataprerocessor "+dp.comref.classname+" a échoué: "+ex);
                            }
                        }
                    }
                } catch(ex) {
                    Dispatcher.debugException("Erreur dans les datapreprocessors ", ex);
                }
                
                // appelle Dispatcher.XmlHttp_onData
                window.unsafeCall(function() { Dispatcher.XmlHttp_onData(); });
                
                // exécution normale
                return window.wrappedJSObject.js.XmlHttp._dgm_onData(data);
            };
        } catch(ex) {
            Dispatcher.debugException("greffe sur js.XmlHttp.onData échouée.", ex);
        }
        
        // Greffe sur le js.XmlHttp.get. Permet de récuperer le urlForBack
        Dispatcher.debug("Greffe sur window.wrappedJSObject.js.XmlHttp.get", 2);
        try{
            window.wrappedJSObject.js.XmlHttp._dgm_get = window.wrappedJSObject.js.XmlHttp.get;
            window.wrappedJSObject.js.XmlHttp.get = function(url, obj) {
                Dispatcher.XmlHttp_get(url);
                return window.wrappedJSObject.js.XmlHttp._dgm_get(url, obj);
            };
        } catch(ex) {
            Dispatcher.debugException("greffe sur js.XmlHttp.get échouée.", ex);
        }
        
        // Greffe sur le js.XmlHttp.onEnd. Permet de charger les modules au changement de page
        Dispatcher.debug("Greffe sur window.wrappedJSObject.js.XmlHttp.onEnd", 2);
        try{
            window.wrappedJSObject.js.XmlHttp._dgm_onEnd = window.wrappedJSObject.js.XmlHttp.onEnd;
            window.wrappedJSObject.js.XmlHttp.onEnd = function() {
                var ret = window.wrappedJSObject.js.XmlHttp._dgm_onEnd();
                // pas super propre et peut-être pas fiable
                // Seul moyen de briser la pile d'appels et donc contourner la sécurité abusive de GM
                // afin que les modules puissent appeler les fonctions GM_*
                window.unsafeCall(function() { Dispatcher.XmlHttp_onEnd(); });
                return ret;
            };
        } catch(ex) {
            Dispatcher.debugException("greffe sur js.XmlHttp.onEnd échouée", ex);
        }
    },
    

    /**
     * Fonction appellée lors d'une requête onData.
     */
    XmlHttp_onData: function XmlHttp_onData() {
        Dispatcher.debug("js.XmlHttp.onData a été appelé", 2);
        
        // Sert pour la minuterie
        pagedetect.setUrlOnData(Dispatcher.url_on_get);
    },
    

    /**
     * Fonction appellée lors d'une requête get.
     * Permet de récupérer l'URL de la page.
     */
    XmlHttp_get: function XmlHttp_get(url) {
        Dispatcher.debug("js.XmlHttp.get a été appelé", 2);
        Dispatcher.url_on_get = url;
    },
    

    /**
     * Fonction appellée lors d'une requête onEnd.
     * Chargement de section dynamique de la page.
     */
    XmlHttp_onEnd: function XmlHttp_onEnd() {
        try {
            Dispatcher.debug("js.XmlHttp.onEnd a été appelé", 2);
            Dispatcher.debug("Relance la reconnaissance de page...", 3);
            
            horloge.initialize();
        
            pagedetect.hook();
        } catch(ex) {
            Dispatcher.debugException("Uncaught ", ex);
        }
    },

    
    /**
     * Enregistre un composant noyau, appelé par le constructeur de Core.
     *
     * @param {Component} core          Noyau que l'on souhaite enregistrer
     */
    registerCore: function registerCore(core) {
        Dispatcher.debug("Enregistre le composant noyau {0}.".format(core.classname), 2);
        
        Dispatcher.l_core[core.classname] = core;
    },

    
    /**
     * Enregistre un outil, appelé par le constructeur de Tool.
     *
     * @param {Component} tool          Outil que l'on souhaite enregistrer
     */
    registerTool: function registerTool(tool) {
        Dispatcher.debug("Enregistre l'outil {0}.".format(tool.classname), 2);
        
        Dispatcher.l_tool[tool.classname] = tool;
    },

    
    /**
     * Enregistre un module, appelé par le constructeur de Module.
     *
     * @param {Component} module        Module que l'on souhaite enregistrer
     */
    registerModule: function registerModule(module) {
        Dispatcher.debug("Enregistre le module {0}.".format(module.classname), 2);

        Dispatcher.l_module[module.classname] = module;
        
        // vérifie s'il doit être désactivé ou non
        module.disabled = Dispatcher.db.getFromArray(GM_KEY_MODS_DISABLED, module.classname, false);
    },
    

    /**
     * Enregistre une fonction callback d'un module à appeler si on est sur la pagecode
     *
     * @param module        Module pour lequel on enregistre le callback
     * @param pagecode      Code de la page sur laquelle appeller le callback
     * @param callback      Fonction callback que l'on souhaite enregistrer
     * @param modifer       modifier est optionnel et peut être 'before:<cn>' ou 'after:<cn>' pour forcer l'appel
     *                      du callback avant ou après le module de classname <cn>. Si <cn>=all, l'appellera avant
     *                      ou après tous les autres modules.
     */
    registerCallback: function registerCallback(module, pagecode, callback, modifier) {
        // Verifie le callback
        if(typeof callback != 'function')
            return Dispatcher.debug("Enregistrement de {0} sur {1}: callback ({2}) doit être une fonction !".format(module.classname, callback, pagecode));
        
        // Verifie le modifieur
        if(modifier) {
            if(!/(before|after):\w+/.test(modifier))
                return Dispatcher.debug("Enregistrement de {0} sur {1}: modifieur spécifié invalide! ({2})".format(module.classname, callback, modifier));
        } else
            modifier = "aucun";
        
        Dispatcher.debug("Enregistre le callback {0}.{1} sur {2} (modifieur: {3}).".format(module.classname, callback.name, pagecode, modifier), 2);
        
        // crée l'objet Dispatcher.l_callback[pagecode] s'il n'existe pas encore
        if(Dispatcher.l_callback[pagecode] === undefined)
            Dispatcher.l_callback[pagecode] = {};
        
        // crée l'objet Dispatcher.l_callback[pagecode].classname s'il n'existe pas encore
        if(Dispatcher.l_callback[pagecode][module.classname] === undefined) {
            Dispatcher.l_callback[pagecode][module.classname] = { 
                    module: module, 
                    l_callback: [] 
            };
        } else
            Dispatcher.debug("Le module {0} a déja une fonction de callback pour {1}. Mise en queue ...".format(module.classname, pagecode), 2);
        
        Dispatcher.l_callback[pagecode][module.classname].l_callback.push({
                callback: callback,
                modifier: modifier
        });
    },
    

    /**
     * Désenregistre une fonction de callback préalablement enregistrée.
     *
     * @param module        Module pour lequel on supprimme le callback
     * @param pagecode      Code de la page de laquelle on souhaite retirer le callback.
     *                      Si undefined: Retire tous les callbacks enregistrés par module
     * @param callback      Fonction callback que l'on souhaite retirer.
     *                      Si undefined: Retire tout les callback appartenant a module sur pagecode
     * @param modifer       Retire les callback de module sur pagecode ayant le modifier spécifié.
     *                      Si undefined: Retire callback appartenant a module sur pagecode
     *
     * @return              Nombre de callbacks désenregistrés, ou false s'il y a eu une erreur.
     */
    unregisterCallback: function unregisterCallback(module, pagecode, callback, modifier) {
        Dispatcher.debug("Retire le callback {0}.{1} sur {2} (modifieur: {3}).".format(module.classname, callback.name, pagecode, modifier), 2);
        
        var nbRemoved = 0;
        
        if(pagecode === undefined) {
            // supprime tous les callbacks de module, quelque soit le pagecode
            for(currentCallback in Dispatcher.l_callback) {
                if(Dispatcher.l_callback[currentCallback][module.classname]) {
                    Dispatcher.l_callback[currentCallback][module.classname] = undefined;
                    
                    removed += 1;
                }
            }
        } else {
            // s'assure que module est bien enregistré sur pagecode
            if( Dispatcher.l_callback[pagecode] === undefined ||
                Dispatcher.l_callback[pagecode][module.classname] === undefined) 
            {
                Dispatcher.debug("Retrait de {0} sur '{1}' impossible car ce module n'est pas enregistré sur cette page !".format(module.classname, pagecode));
                return false;
            }
            
            if(callback === undefined) {
                // retire tous les callbacks
                removed = Dispatcher.l_callback[pagecode][module.classname].l_callback.length;
                Dispatcher.l_callback[pagecode][module.classname] = undefined;
            } else {
                // retire seulement ceux identique au callback et respectant éventuellement le modifieur
                for(currentCallback in Dispatcher.l_callback[pagecode][module.classname].l_callback) {
                    if(Dispatcher.l_callback[pagecode][module.classname].l_callback[currentCallback] === callback) {
                        // si modifier spécifié, ne supprime que ceux qui correspondent
                        if(modifier !== undefined && Dispatcher.l_callback[pagecode][module.classname].l_callback[currentCallback].modifier != modifier)
                            continue;
                        
                        Dispatcher.l_callback[pagecode][module.classname].l_callback[currentCallback] = undefined;
                        
                        removed += 1;
                    }
                }
            }
        }
        
        return removed;
    },

    
    /**
     * Change l'état désactivé d'un module.
     *
     * @param {string} classname        Classname du module a désactiver
     *
     * @return                          true si module actif, false sinon
     */
    toggleModule: function toggleModule(classname) {
        module = Dispatcher.l_module[classname];
        module.disabled = !module.disabled;
        
        Dispatcher.debug("Change l'état de {0}.disabled = {1}.".format(classname, module.disabled), 2);
        
        // stocke son nouvel état
        Dispatcher.db.setToArray(GM_KEY_MODS_DISABLED, module.classname, module.disabled);
        
        return !module.disabled;
    },
    

    /**
     * enregistre un préprocesseur de données hordiennes
     * callback prend un argument data (les données reçues par XmlHTTP.onData)
     * et retourne ces mêmes data, éventuellement modifiées
     * Attention: la fonction s'exécute dans l'environement de unsafeWindow, donc pas d'appels GM_* !
     *
     * @param component         Composant sur lequel 
     */
    registerDataPreprocessor: function registerDataPreprocessor(component, callback) {
        if(typeof callback != 'function')
            return Dispatcher.debug("Le 2e argument de registerDataPreprocessor doit être une fonction !");
        
        Dispatcher.debug("Enregistre le dataPreprocessor {0}.{1}.".format(component.classname, callback.name));
        Dispatcher.data_preprocessors.push({'comref':component, 'callback':callback});
        
        return true;
    },

    /**
     * Permet d'appeller une fonction voulue lorsqu'un noeud donné apparaitra après
     * modification d'un noeud donné.
     * 
     * @param nodePath      Node que l'on désire avoir avant d'appeller la fonction
     * @param callback      Fonction que l'on désire appeller lorsque
     *                      le noeud voulu sera présent
     * @param inNode        Node dans sur laquelle poser le listenner
     */
    addNodeChangeListenner: function addNodeChangeListenner(nodePath, callback, listenToNode) {
        var node = $xpath(listenToNode);
        if(!node) {
            Dispatcher.debug("listenToNode ne désigne auncun noeud");
            return;
        }
        
        var onNodeModified = function onNodeModified() {
            // On attend de trouver le node demandé
            if(!$xpath(nodePath))
                return;
            
            // Retire le listenner
            var node = $xpath(listenToNode);
            node.removeEventListener('DOMSubtreeModified', onNodeModified, false);
            
            callback();
        }
        
        node.addEventListener('DOMSubtreeModified', onNodeModified, false);
    },

    /**
     * Ecoute les X changements de node
     * 
     * @param nodePath      Node dont on surveille les modifications
     * @param callback      Fonction que l'on désire appeller lorsque
     *                      le noeud voulu sera modifié X fois
     * @param x             Nombre de modifs attendues avant le callback
     */
    addXNodeChangeListenner: function addXNodeChangeListenner(nodePath, callback, x) {
        (function() {
            var closure_x = x;
            var closure_nodePath = nodePath;
            var closure_callback = callback;
            
            var node = $xpath(closure_nodePath);
            node.addEventListener('DOMSubtreeModified', function onNodeModified() {
                    Dispatcher.debug("Nb appel: " + closure_x);
                    closure_x -= 1;
                    if(closure_x > 0)
                        return;
                    
                    // Retire le listenner
                    var node = $xpath(closure_nodePath);
                    node.removeEventListener('DOMSubtreeModified', onNodeModified, false);
                    
                    closure_callback();
            }, false);
        })();
        
        
    },
    
    /**
     * Retourne une liste {modclassname: module} des modules enregistrés sur la page courante
     */
    getModsRegisteredOnCurrentPage: function getModsRegisteredOnCurrentPage() {
        var list = {};
        
        // pour chaque pagecode de la page courante
        for(var pagecode in Dispatcher.l_currentPagecodes) {
            // récup les modules enregistrés sur cette page
            for(var classname in Dispatcher.l_callback[pagecode])
                list[classname] = Dispatcher.l_callback[pagecode][classname].module;
        }
        
        return list;
    },
    

    /**
     * Active les modules des pages fournies par pagedetect
     *
     * @param l_pagecode        Liste des codes pages actifs
     */
    activateModsOnPage: function activateModsOnPage(l_pagecode) {
        Dispatcher.l_currentPagecodes = l_pagecode;
        
        Dispatcher.debug("Activation des modules sur: {{0}}".format($grep(uneval(Dispatcher.l_currentPagecodes), /(\w+):true/g).join(',')), 2);
        
        // liste des appels à effectuer: [{'pagecode':pagecode, 'callconfig':{'module':module, 'callback':fn, 'modifier':modifier}}, ...}]
        var l_call = [];
        
        // pour chaque pagecode de la page en cours
        for(var pagecode in Dispatcher.l_currentPagecodes) {
            // Rappel : Dispatcher.l_callback de la forme {pagecode:{modclassname:{'module':module, 'l_callback':[{'callback':callback}, ...]}, ...}, ...}
            var l_callback = Dispatcher.l_callback[pagecode];
            
            // pour chaque module enregistré sur ce codepage (mcn = modclassname)
            for(var classname in l_callback) {
                var module = l_callback[classname].module;
                
                if(module.disabled) {
                    Dispatcher.debug("Le module {0} est désactivé".format(classname), 2);
                    continue;
                }
                
                // TODO encore un WTF is this ?
                // ajoute le module à la liste des modules actifs
                // [NOTE : cette liste n'est pas à jour tant que tous les modules ne sont pas appelés
                // donc elle est inutile pour l'extérieur, mais très utile pour les modifier ! euh... géré autrement;
                Dispatcher.l_activeModule[classname] = module;
                
                // pour tous les callbacks de ce module sur pagecode
                for(var i=0; i<l_callback[classname].l_callback.length; i++) {
                    // construit le callconfig {'module':module, 'callback':fn, 'modifier':[axis, classname]}
                    // Rappel: modifier = after:classname -> after est l'axis
                    
                    var modifierArray = undefined;
                    if(l_callback[classname].l_callback[i].modifier)
                        modifierArray = l_callback[classname].l_callback[i].modifier.split(':');
                    
                    var callconfig = {
                            module: module,
                            callback: l_callback[classname].l_callback[i].callback,
                            modifier: modifierArray
                    };
                
                    l_call.push({
                            pagecode: pagecode, 
                            callconfig: callconfig
                    });
                }
            }
        }
        
        // L'application des modifieurs est réservée à des cas très spécifiques, quand un module veut absolument s'exécuter avant ou après un autre
        Dispatcher.debug("Application des modifieurs...", 2);
        
        // Affiche la liste des callback avant
        if(Dispatcher.DEBUG_MODE >= 2) {
            var l_callBefore = [];
            l_callBefore.forEach(function (callback) {
                    modifier = "";
                    if(callback.callconfig.modifier)
                        modifier = c.callconfig.modifier.join(':');
                    
                    l_callBefore.push("{0}.{1}/{2} {3}".format(
                            callback.callconfig.module.classname,
                            callback.callconfig.callback.name,
                            callback.pagecode, modifier
                    ));
            });
            Dispatcher.debug("Avant : {0}".format(uneval(l_callBefore)), 2);
        }
        
        // Si on dépasse iter_max, c'est qu'il y'a un probléme dans les positionnement
        var iter_max = l_call.length+1;
        var stable;
        do {
            stable = true;
            
            // On parcourt tout les callback
            // si stable vaut true en sortant, aucune modif n'a été faite,
            // donc tout les callaback sont en place
            for(var i=0; i<l_call.length; i++) {
                var modifier = l_call[i].callconfig.modifier;
                if(modifier) {
                    var axis = modifier[0];
                    var classnameCible = modifier[1];
                    
                    Dispatcher.debug("Vérifie que {0}.{1} s'execute selon le modifier {{2}:{3}}".format(l_call[i].callconfig.module.classname, l_call[i].callconfig.callback.name, axis, classnameCible), 3);
                    
                    // Passe a true lorsque l'ordre est suceptible d'avoir été perturbé
                    // (pour l'insertion entre plusieurs elements d'un callback par exemple)
                    // (mais pas dans le cas ou l'on place un callback en fin ou debut de liste)
                    var missplaced = false;
                    
                    if(axis == 'before') {
                        // Si on est le tout premier
                        if(classnameCible == 'all') {
                            // Si on est pas déjà devant tout le monde
                            if(i != 0) {
                                Dispatcher.debug("Mal placé en {0} ! Le replace en premier".format(i), 3);
                                
                                l_call.splice(0, 0, l_call[i]);     // Place l'element au debut (décale i)
                                l_call.splice(i+1, 1);              // Retire l'element d'ou il etait (i+1 car i décalé)
                            }
                        // On est avant un classname particulier
                        } else {
                            for(var j=0; j<i; j++) {
                                if(l_call[j].callconfig.module.classname == classnameCible) {
                                    Dispatcher.debug("Mal placé en {0} ! Le replace en {1}".format(i, j), 3);
                                    
                                    missplaced = true;
                                    
                                    l_call.splice(j, 0, l_call[i]);     // Place l'element a l'index du classname ciblé (décale i car j<i)
                                    l_call.splice(i+1, 1);              // Retire l'element d'ou il etait (i+1 car i décalé)
                                    
                                    break;
                                }
                            }
                        }
                    } else if(axis == 'after') {
                        // Si on est le tout dernier
                        if(classnameCible == 'all') {
                            // Si on est pas déjà le tout dernier
                            if(i != l_call.length-1) {
                                Dispatcher.debug("Mal placé en {0} ! Le replace en dernier".format(i), 3);
                                
                                l_call.splice(l_call.length-1, 0, l_call[i]);       // Place l'element a la fin
                                l_call.splice(i, 1);                                // Retire l'element d'ou il etait
                            }
                        // On est après un classname particulier
                        } else {
                            for(var j=l_call.length-1; j>i; j--) {
                                if(l_call[j].callconfig.module.classname == classnameCible) {
                                    Dispatcher.debug("Mal placé en {0} ! Le replace en {1}".format(i, j), 3);
                                    
                                    missplaced = true;
                                    
                                    l_call.splice(j+1, 0, l_call[i]);       // Place l'element a l'index du classname ciblé
                                    l_call.splice(i, 1);                    // Retire l'element d'ou il etait
                                    
                                    break;
                                }
                            }
                        }
                    }
                    
                    if(missplaced)
                        stable = false;
                }
            }
            
            iter_max -= 1;
        // Continue de boucler tant que la liste n'est pas stable (ie qu'il reste des callback
        // qui ne sont peut etre pas a leur place correcte)
        } while(!stable && iter_max > 0);
        
        // On a rencontré une boucle infinie
        if(!stable) {
            Dispatcher.debug("Référence récursive dans les modifieurs !");
            
            // On cherche le premier callback mal placé
            for(var i=0; i<l_call.length; i++) {
                var modifier = l_call[i].callconfig.modifier;
                if(modifier) {
                    var axis = modifier[0];
                    var classnameCible = modifier[1];
                    
                    if(axis == 'before') {
                        for(var j=0; j<i; j++) {
                            if(l_call[j].callconfig.module.classname == classnameCible) {
                                Dispatcher.debug("Boucle infinie générée par {0}.{1} qui veut s'exécuter avant {2}".format(l_call[i].callconfig.module.classname, l_call[i].callconfig.callback.name, classnameCible));
                                break;
                            }
                        }
                    } else if(axis == 'after') {
                        for(var j=l_call.length-1; j>i; j--) {
                            if(l_call[j].callconfig.module.classname == classnameCible) {
                                Dispatcher.debug("Boucle infinie générée par {0}.{1} qui veut s'exécuter après {2}".format(l_call[i].callconfig.module.classname, l_call[i].callconfig.callback.name, classnameCible));
                                break;
                            }
                        }
                    }
                }
            }
        }
        
        // Affiche la liste des callback apres
        if(Dispatcher.DEBUG_MODE >= 2) {
            var l_callAfter = [];
            l_callAfter.forEach(function (callback) {
                    modifier = "";
                    if(callback.callconfig.modifier)
                        modifier = c.callconfig.modifier.join(':');
                    
                    l_callAfter.push("{0}.{1}/{2} {3}".format(
                            callback.callconfig.module.classname,
                            callback.callconfig.callback.name,
                            callback.pagecode, modifier
                    ));
            });
            Dispatcher.debug("Avant : {0}".format(uneval(l_callAfter)), 2);
        }
        
        // Appelle les callbacks
        for(var i=0; i<l_call.length; i++) {
            try {
                // appelle la méthode de callback dans le contexte du module
                Dispatcher.debug("Appelle {0}.{1}({2})".format(l_call[i].callconfig.module.classname, l_call[i].callconfig.callback.name, l_call[i].pagecode));
                l_call[i].callconfig.callback.call(l_call[i].callconfig.module, l_call[i].pagecode);
            } catch(ex) {
                Dispatcher.debugException("Uncaught (in {0})".format(l_call[i].callconfig.module.classname), ex);
            }
        }
    },
});

// Maintenant qu'il est déclaré, il peut s'enregistrer
Dispatcher.registerCore(Dispatcher);


/****************************************************************************/
/******************************** pagedetect.core.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// pagedetect.core.js
// Détécte les codes de pages correspondant a la page
// sur laquelle on est

//§ Flags: Oblig
//§ Rank: 30

/***********************************************
// Nouvel arbre (# à implémenter) :
TOUT . . . Toutes les pages
+-- XTRN . . . Disclaimer d'un site externe
+-- NDSP . . . Site Non Disponible
|   +-- MTNC*. . . Maintenance #
|   +-- ATTQ*. . . Attaque de minuit #
|   +-- INCO . . . Autre/Page non repérée #
+-- DISP . . . Site disponible
    +-- NOOB . . . Inscription d'un nouveau joueur
    +-- LGIN*. . . Non logué, page de login
    +-- LOGD . . . Logué, authentifié
        +-- AIDE . . . L'aide
        +-- MENU . . . Barre de menu de l'âme
        |   +-- REIN . . . Réincarnations
        |   |   +-- RAND*. . . Réincarnation au hasard
        |   |   +-- CVIL*. . . Choix de ville (héros)
        |   +-- NEWS*. . . Les nouvelles
        |   +-- REGL*. . . Réglages
        |   +-- EVOL*. . . Evolutions
        |   +-- ECHL*. . . Echelle
        |   +-- ECRT*. . . Ecrits
        |   +-- COAL . . . Coalition
        |   |   +-- CONH*. . . Coa non héros
        |   |   +-- COHE*. . . Coa héros
        |   |   +-- COCH%. . . Chef de Coa
        |   +-- LAME . . . L'âme d'un joueur
        |   |   +-- MAME*. . . Mon âme
        |   |   +-- OAME*. . . Autre âme
        |   |   +-- POUV*. . . Pouvoirs du héros
        |   +-- VLLE*. . . Habitants d'une ville passée
        |   +-- COMV*. . . Mon historique et saisie commentaires de ville
        +-- FRUM . . . Forum
        |   +-- FOMO . . . Forum monde
        |   |   +-- FMAC*. . . Accueil FM
        |   |   +-- FMSJ*. . . Lecture sujet FM
        |   |   +-- FMEC*. . . Ecriture sujet FM 
        |   +-- FOVI . . . Forum ville
        |   +-- FVAC*. . . Accueil FV
        |   +-- FVSJ*. . . Lecture sujet FV
        |   +-- FVEC*. . . Ecriture sujet FV
        +-- NPLY  Pas en jeu, transition
        |   +-- VMOR*. . . Validation de mort #
        |   +-- CMET . . . Choix du métier
        |     +-- MET1* Métier habitant (non héros)
        |     +-- MET3* Métier spécialisé (héros)
        +-- PLAY En jeu, bandeau joueur
            +-- HORS . . . Dehors
            |   +-- TCTC*. . . Portes dehors toc!toc! ('en ville' si msg) <= ???
            |   +-- DSRT*. . . Dans le désert
            |      +-- BLOQ%. . . Bloqué par les zombis
            |      +-- BATI%. . . Sur un batiment
            +-- GAZT*. . . Gazette // en ville avec registre général <= plus vrai !!
            +-- CITY . . . En ville
                +-- VENS*. . . Vue d'ensemble
                +-- PUIT*. . . Le puits
                +-- BNQU*. . . La banque
                +-- ANNU*. . . Annuaire citoyens
                |   +-- CHEZ*. . . Chez quelqu'un
                +-- CHTR*. . . Les chantiers
                +-- PROJ . . . Vote du projet
                |   +-- PRON*. . . Pas encore voté
                |   +-- PROV*. . . A voté
                +-- TOUR . . . Tour de guet (dist. voté/resultat/rien?)
                +-- ATEL*. . . Atelier
                +-- SORT . . . Aux portes, en ville
                |   +-- EXPE . . .  Expéditions
                |   |   +-- EXPD . . . Edition d'expédition
                |   +-- PRTE . . . Manoeuvre de porte
                |     +-- OUVR*. . . Porte ouvrable (donc fermée)
                |     +-- FERM*. . . Porte fermable (donc ouverte)
                |     +-- PTFA*. . . A la porte mais Fatigué
                +-- HOME . . . A la maison
                    +-- COFA*. . . Coffre et Actions
                    +-- MSGP . . . Messages privés 
                    |   +-- MSGR*. . . Messages reçus
                    |   +-- MSGA*. . . Messages archivés
                    |   +-- MSGE*. . . Edition d'un message
                    +-- TRVX*. . . Travaux
                    +-- AMNG*. . . Aménagements

Groupes :

(FVAC ou FMAC) =>  FXAC . . . Accueil d'un des forum ville ou monde
(FVSJ ou FMSJ) =>  FXSJ . . . Lecture Sujet d'un des forum ville ou monde
(FVEC ou FMEC) =>  FXEC . . . Ecriture Sujet d'un des forum ville ou monde

***********************************************

S'enregistrer:
http://www.hordes.fr/#index?go=user/freeRegister

Se logguer:
http://www.hordes.fr/

Disclaimer:
http://www.hordes.fr/#disclaimer?id=7;sk=30b8b

Forum :
http://www.hordes.fr/#saloon/195024
    http://www.hordes.fr/#saloon/?go=saloon/thread/27257116?page=1;tpage=1
        http://www.hordes.fr/#saloon?go=saloon/thread/30948575/reply
    http://www.hordes.fr/#saloon?go=saloon/195024/editor

Gazette :
http://www.hordes.fr/#news?sk=ae244

Dernière Gazette :
http://www.hordes.fr/#dnews?sk=30b8b

Ame :
http://www.hordes.fr/#ghost[/city]!!!
    http://www.hordes.fr/#ghost?go=ghost/maps;sk=30b8b
    http://www.hordes.fr/#ghost/city?go=ghost/user;sk=ae244
        http://www.hordes.fr/#ghost/city?go=ghost/user?uid=47486;sk=ae244 // une autre ame que soi
    http://www.hordes.fr/#ghost/city?go=ghost/news;sk=ae244
    http://www.hordes.fr/#ghost/city?go=ghost/ranking;sk=ae244
    http://www.hordes.fr/#ghost/city?go=ghost/underDev;sk=ae244
    http://www.hordes.fr/#ghost/city?go=ghost/books;sk=ae244
    http://www.hordes.fr/#ghost/city?go=ghost/team;sk=ae244
    http://www.hordes.fr/#ghost/city?go=ghost/options;sk=ae244

    http://www.hordes.fr/#ghost/city?go=ghost/ingame;sk=ae244 //historique de mes parties
        http://www.hordes.fr/#ghost/city?go=ghost/ingame?id=3090182;sk=ae244 //détail d'une ville

Aide :
http://www.hordes.fr/#help?id=intro



Mort :
http://www.hordes.fr/#user/welcomeToNowhere?sk=30b8b

Choix métier :
http://www.hordes.fr/#ghost/chooseJob?sk=30b8b

Ville:
http://www.hordes.fr/#city/enter?sk=30b8b
    http://www.hordes.fr/#city/enter?go=home;sk=30b8b
        http://www.hordes.fr/#city/enter?go=msg;sk=30b8b // coffre
            http://www.hordes.fr/#city/enter?go=msg;goSub=9566649;sk=0aa9e // lire
            http://www.hordes.fr/#city/enter?go=msg;goSub=archives;sk=30b8b
            http://www.hordes.fr/#city/enter?go=msg;goSub=write;sk=30b8b
        http://www.hordes.fr/#city/enter?go=home/upgrade;sk=30b8b
        http://www.hordes.fr/#city/enter?go=home/deco;sk=30b8b
        // par defaut : coffre
    http://www.hordes.fr/#city/enter?go=city/well;sk=30b8b
    http://www.hordes.fr/#city/enter?go=city/bank;sk=30b8b
    http://www.hordes.fr/#city/enter?go=city/co;sk=30b8b
        http://www.hordes.fr/#city/enter?go=city/seeClint?id=343082;sk=30b8b
    http://www.hordes.fr/#city/enter?go=city/buildings?reqMode=1;filter=;sk=30b8b (reqMode=1 => affichage normal des ressources ; sinon voir les couts)
    http://www.hordes.fr/#city/enter?go=city/door;sk=30b8b
        http://www.hordes.fr/#city/enter?go=city/exp;sk=30b8b
            http://www.hordes.fr/#city/enter?go=city/exp?editor=1;sk=30b8b
    http://www.hordes.fr/#city/enter?go=city/upgrades;sk=30b8b


Désert :
http://www.hordes.fr/#outside?go=outside/doors;sk=30b8b
http://www.hordes.fr/#outside?go=outside/refresh;sk=ae244


Attaque :
<div id="gamebody">
<div class="event">
    <div class="swf">
<div class="eventInfos">
    <h2>Qu'est-ce que ça veut dire ?</h2>
    <img src="http://data.hordes.fr/gfx/art/server.png" alt="" class="art"/>
    <p>Le site Hordes.fr est actuellement submergé de zombies ! C'est l'assaut quotidien !</p>

Maintenance :
<div id="main">
    <div id="gamebody">
        <div class="eventInfos">
            <h2>Maintenance du Site !</h2>
            <img class="art" alt="" src="http://data.hordes.fr/gfx/art/server.png"/>
            <p>Le site Hordes.fr est actuellement en période de maintenance pour une durée indéterminée.</p>

            
//
// Diff avec ancien PageDiag : quand on lit la gazette, on est pas sur une page 'en ville' ('CITY')
//
//

***********************************************/


/**
 * Identifie la page par type et famille. Voir l'arbre de repérage avec les codes à 4 lettres.
 */
var pagedetect = new Tool("pagedetect", {
    dynamicSection: null,       // dynamic section de plus haut niveau où faire les $xpath (generic_section, ghost_pages ou gamebody, voire body)
    locationHash: null,         // document.location.hash
    l_page: {},                 // pages détectées

    url_on_data: '',            // url reçue par le js OnData
    setUrlOnData: function(url) { pagedetect.url_on_data = url; pagedetect.debug("url = {0}".format(url), 2) },
    getUrlOnData: function() { return pagedetect.url_on_data; }, // utilisé par la minuterie
    lastUrlOnData: function() { return pagedetect.getUrlOnData(); }, // rétrocompatibilité, dépréciée

    // Pour ModMan
    label: "Pagedetect",
    options: {
        hide: true,
        icon: "gfx/icons/item_rp_scroll.gif",
        htmldesc: "Détecte la page sur laquelle on se trouve.",
        credits: "Hypher, après trois tentatives, sur une idée géniale de Bluflonalgul",
    },

    initialize: function initialize() {
    },
    
    
    /**
     * Lance la detection des pages
     */
    hook: function hook() {
        pagedetect.debug("greffes en cours", 2);
        
        // Effectue les greffes sur la page si elle se charge dynamiquement
        var node = $xpath("//div[contains(@class,'forumcore')]");
        if(node) {
            pagedetect.debug("Section de forum détéctée, mise en attente", 2);
            Dispatcher.addNodeChangeListenner(
                    "//div[contains(@class,'tid_containerWrapper')]",
                    pagedetect.getPageCodes,
                    "//div[contains(@class,'forumcore')]"
            );
        }
        else
            pagedetect.getPageCodes();
    },

    // Dans les structures de données qui suivent, les valeurs des attributs peuvent être :
    // - Une chaîne commençant par '$', qui testera la présence de l'élément de cet ID (sans le $)
    // - Une chaîne, qui sera évaluée comme une recherche xpath sur le dynamic container de plus haut niveau
    // - Une expression régulière, qui sera évaluée sur document.location.hash
    // - Une fonction, appelée avec le nom de la page à tester en paramètre, et devra retourner true si on est dessus

    // Liste des pages en terme de dépendances
    // - Chaque page dépend de son parent
    // - Chaque page est exclusive avec ses soeurs
    // - L'ordre est important, quand une page est détectée, on évalue pas ses soeurs
    // La page spéciale '_' doit être la première page d'un groupe et ne traitera pas le groupe si elle échoue
    pages_tree: {_:true, // pour All
        Maintenance:"//div/div[@class='eventInfos']/h2/text()[contains(., 'Maintenance')]", // ajout du "//" car pb de détection maintenance - blu
        Attack:"//div/div[@class='event']/div[@class='swf']",
        Login:"$logger",
        //Register:null,
        Disclaimer:/^#disclaimer/,
        Help:/^#help/,
        Forum:{_:"//div[contains(@class,'forumcore')]",
            ListeForum: "//div[contains(@class,'tid_forums')]",
            Thread:/\|thread/, // !ordre important
            Reply:/\|thread/, // !ordre important
            NewThread:/\|post/, // !ordre important
            ForumWelcome:true, // !ordre important
        },
        Ghost:{_:"//div[contains(@class,'guser')]",
            ChooseJob:/chooseJob/, // techniquement on est pas en ville (pas de nom de ville), ni mort ; dans cet état toute page redirige ici
            Reincarnate:/ghost\/maps/,
            Soul:"//div[contains(@class,'guser')]/a[contains(@class,'button close')]", // le bouton fermer fiche est la ?
            Titles:/ghost\/listTitles/,
            HeroAbilities:/ghost\/heroUpgrade/,
            News:/ghost\/news/,
            Ladder:/ghost\/ranking/,
            UnderDev:/ghost\/underDev/,
            Books:/ghost\/books/,
            Team:/ghost\/team/,
            Options:/ghost\/options/,
            CityDetails:/ghost\/ingame\?id=/, // !ordre important
            MyGames:/ghost\/ingame/, // !ordre important
            MySoul:"//div[contains(@class,'guser')]/ul[contains(@class,'tabs')]", // les onglets sont la ?
        },
        Papers:/^#news/,
        DeathPapers:/^#dnews/,
        Dead:/^#user\/welcomeToNowhere/,
        HeroNag:/^#hero\?go=hero\/death/,
        City:{_:/#city\/enter/,
            MyHome:{_:/go=home/,
                Upgrades:/go=home\/upgrade/,
                Deco:/go=home\/deco/,
                Chest:true, // !ordre important
            },
            Mails:{_:/go=msg/,
                ReadMail:/go=msg;goSub=[0-9]+/,
                Archives:/go=msg;goSub=archives/,
                Write:/go=msg;goSub=write/,
                Inbox:true, // !ordre important
            },
            Well:/go=city\/well/,
            Bank:/go=city\/bank/,
            Citizens:/go=city\/co/,
            CitizenHome:/go=city\/seeClint/,
            Buildings:/go=city\/buildings/,
            InDoor:/go=city\/door/,
            ExpeditionTool:/go=city\/exp\?editor=1/, // !ordre important
            Expeditions:/go=city\/exp/, // !ordre important
            Projects:/go=city\/upgrades/,
            Tower:/go=city\/tower/,
            Workshop:/go=city\/refine/,
            Summary:true, // !ordre important
        },
        Outside:{_:/^#outside/,
            OutDoor:/go=outside\/doors/,
            Desert:/go=outside\/refresh/,
        },
    },


    // Description des modifieurs
    // Un modifieur n'est pas une page, mais un élément sur celle-ci qui la spécifie
    // Il est de la forme ['PageModifiee', elemDeRecherche] ou bien une fonction a retour booléen
    // L'ordre peut-être important, ils seront parcourus dans l'ordre
    l_modifier: {
        Logged:['All', "$cornerBt"],
        GhostCity:['Ghost', /^#ghost\/city/], // en ghost mais incarné
        CityForum:['Forum', function(){ return hortool.areWeOnForum() && hortool.areWeOnCityForum(); }],
        WorldForum:['Forum', function(){ return hortool.areWeOnWorldForum(); }],
        CityPannel:['All', "$mainMenu"], // le panneau ville avec les images à gauche
        DoorOpenable:['InDoor', "//div[@class='left']/a/text()[contains(., 'Ouvrir les')]"], // Ouvrir les Portes (majuscule!!)
        DoorClosable:['InDoor', "//div[@class='left']/a/text()[contains(., 'Fermer les')]"], // Fermer les portes
        TooTiredIn:['InDoor', "//div[@class='left']//p/descendant::text()[contains(., 'Vous êtes fatigué')]"], // pour PTFA !! deprecated : utiliser Hortools.getEtats plutôt !
        ProjectNotVoted:['Projects', "//a[contains(@onclick, 'city/voteUpgrade')]"],
        ProjectVoted:['Projects', function(){ return !pagedetect.isPage('ProjectNotVoted'); } ],
        // TODO : TooTiredOut ; TooTired = '&' ... mouai... il a qu'à faire un getEtat ... nan mais !
        Stealth:['Desert', "//div[@class='feist']/descendant::text()[contains(., 'déplacer sans être vu')]"], // Bloqué mais Furtif :)
        Fleeing:['Desert', "//div[@class='feist']/descendant::text()[contains(., 'FUYEZ !')]"], // vient de fuire
        Blocked:['Desert', "//div[@class='feist']"], // FIXME : Blocked && (Stealth || Fleeing) possible !
        Building:['Desert', "//div[@class='left']/a/text()[contains(., 'Explorer :')]"],
        InTown:[], // TODO: en ville (physiquement)
        ThreadLastPage:['Thread', function(){ return ($xpath("//li[@class='next']/a[contains(@onclick,'tpage')]", pagedetect.dynamicSection) == null) || ((document.getElementsByClassName('next')).length <= 2); }], // dernière page du sujet : pas de bouton next tpage, ou moins de 2 boutons next (une seule page)
        IAmHero: function(){ // on est héros
            var img=$('ghostImg'); //quand on est en ghost
            if(img && $xpath("img[contains(@src, 'ghost_red')]", img))
                return true;
            // autres pages avec le bandeau
            var bag = $('myBag');
            if(bag && $xpath("li/img[contains(@onmouseover, 'Objet de métier') and not(contains(@src, 'item_basic_suit'))]", bag))
                return true;
            // sur le FM, surtout si non incarné
            var saloon_panel_menu= $('saloon_panel_menu');
            if ( saloon_panel_menu ) {
                var newSubjectBtn= $xpath("a", saloon_panel_menu);
                if ( newSubjectBtn )
                    if ( /Devenir Héros/.test(newSubjectBtn.innerHTML) )
                        return false;
                    else
                        return true;
            }
            // spécifique à cette page
            if(pagedetect.isPage('ChooseJob') && $('job#3') != null) {
                if($xpath("//img[@class='lock']", document) == null)
                    return true;
                else return false;
            }
            return undefined;
        },
        IAmWeak: function(){ return (pagedetect.isPage('IAmHero') === undefined ? undefined : !pagedetect.isPage('IAmHero')); },
        /*function(){ // on est PAS héros
            var img=$('ghostImg'); //quand on est en ghost
            if(img && $xpath("img[contains(@src, 'ghost_blue')]", img))
                return true;
            // spécifique à cette page
            if(pagedetect.isPage('ChooseJob') && $xpath("//img[@class='lock']", document) != null)
                return true;
            return false;
        },*/
        TeamOwner:['Team', "//div[@class='right']/a/text()[contains(., 'Dissoudre')]"], // Chef de coa
        ForumUnwritable:['Forum', function(){
            if(pagedetect.isPage('WorldForum'))
                return pagedetect.isPage('IAmWeak');
            else return ($xpath("//div[@class='thread']/div[@class='actions']/a[@class='button off']", document) != null);
        }], // ! ordre important (IAmWeak)
    },

    // Liste des pages virtuelles
    // Tableau de l'ensemble des pages composant la page virtuelle
    // par défaut c'est la disjonction (or), et si [0]='&' c'est la conjonction (and) des pages
    // Peut aussi être une fonction
    l_virtualPage: {
        ChooseHeroJob:['&', 'ChooseJob', 'Hero'], // un héros choisit son métier (abusé, il peut le tester lui) 
            //( ^^ seul indice sur la page: absence des .*heros*. <img title="" alt="icon" src="http://data.hordes.fr/gfx/design/heroLogo.gif" class="lock"/>)
        Unavailable:['Maintenance', 'Attack'], // site indisponible
        Available:function(){ return !pagedetect.isPage('Unavailable'); }, // ...ou bien disponible !
        
        // ceux ci sont deprecated, juste pour compatibilité
        InGame:['Outside', 'City', 'Papers'], // documenté comme "bandeau joueur" c'est quoi ?
        ReincarnateHero:['&', 'Reincarnate', 'IAmHero'], // pour CVIL
        ReincarnateWeak:['&', 'Reincarnate', 'IAmWeak'], // pour RAND
        TeamHero:['&', 'Team', 'IAmHero'], // pour CVIL
        TeamWeak:['&', 'Team', 'IAmWeak'], // pour CVIL
        ChooseWeakJob:['&', 'ChooseJob', 'IAmWeak'], // pour MET1
        ChooseHeroJob:['&', 'ChooseJob', 'IAmHero'], // pour MET3
        NotPlaying:['Dead', 'ChooseJob'], // pour NPLY
        
        NewForumMessage:['Reply', 'NewThread'],
        AnySoul:['MySoul', 'Soul'], // pour LAME
        CityForumWelcome:['&', 'ForumWelcome', 'CityForum'],
        CityThread:['&', 'Thread', 'CityForum'],
        CityThreadLastPage:['&', 'ThreadLastPage', 'CityForum'],
        CityNewThread:['&', 'NewThread', 'CityForum'],
        CityReply:['&', 'Reply', 'CityForum'],
        WorldForumWelcome:['&', 'ForumWelcome', 'WorldForum'],
        WorldThread:['&', 'Thread', 'WorldForum'],
        WorldThreadLastPage:['&', 'ThreadLastPage', 'WorldForum'],
        WorldNewThread:['&', 'NewThread', 'WorldForum'],
        WorldReply:['&', 'Reply', 'WorldForum'],
        ForumThreadLastPageWritable: function(){ return !pagedetect.isPage('ForumUnwritable') && pagedetect.isPage('ThreadLastPage') },
        CityThreadLastPageWritable: function(){ return !pagedetect.isPage('ForumUnwritable') && pagedetect.isPage('CityThreadLastPage') },
        WorldThreadLastPageWritable: function(){ return !pagedetect.isPage('ForumUnwritable') && pagedetect.isPage('WorldThreadLastPage') },
        CityThreadWritable: function(){ return !pagedetect.isPage('ForumUnwritable') && pagedetect.isPage('CityThread') },
        ThreadWritable: function(){ return hortool.areWeOnForum() && !pagedetect.isPage('ForumUnwritable') }, // TODO voir pour la cohérence des noms
    },
    
    
    /**
     * Analyse la page pour trouver les pagecodes
     */
    getPageCodes: function getPageCodes() {
        pagedetect.debug("Detection des pages démarée", 2);
        
        if(!pagedetect.initMembers())
            return false;
        
        pagedetect.l_page = {};
        
        // Parcours récursivement l'arbre des pages
        pagedetect.testPages(pagedetect.pages_tree, 'All');
        
        // Applique les modifiers
        for(var modifier in pagedetect.l_modifier) {
            var value = pagedetect.l_modifier[modifier];
            var match = null;
            
            if(value instanceof Array) {
                match = ((value[0] in pagedetect.l_page) && pagedetect.testValue(value[1], modifier))
            } else if(typeof value == 'function') {
                match = value(modifier);
            } else
                pagedetect.debug("Erreur: typeof modifier[{0}] = {1}".format(modifier, typeof value));
            
            if(match)
                pagedetect.l_page[modifier] = true;
        }
        
        // Applique les pages virtuelles
        var virtualPage;
        for(virtualPage in pagedetect.l_virtualPage) {
            var value = pagedetect.l_virtualPage[virtualPage];
            var match = null;
            if(value instanceof Array) {
                if(value[0] == '&') match = pagedetect.conjunction(value.slice(1));
                else match = pagedetect.disjunction(value);
            } else if(typeof value == 'function') {
                match = value(virtualPage);
            } else
                pagedetect.debug("Erreur: typeof l_virtualPage[{0}] = {1}".format(virtualPage, typeof value));
            
            if(match) pagedetect.l_page[virtualPage] = true;
        }
        
        // Affiche de facon détaillée le résultat de la détéction
        if(pagedetect.DEBUG_MODE == 3) {
            var base = [];
            var l_modifier = [];
            var l_virtuel = [];
            var all = [];
            
            for(var page in pagedetect.l_page) {
                if(page in pagedetect.l_modifier)
                    l_modifier.push(page);
                else if(page in pagedetect.l_virtualPage)
                    l_virtuel.push(page);
                else
                    base.push(page);
                
                all.push(page);
            }
            
            pagedetect.debug("{0}\nbase: {1}\nl_modifier: {2}\nl_virtual: {3}".format(
                    all.join(', '),
                    base.join(', '),
                    l_modifier.join(', '),
                    l_virtuel.join(', ')
            ));
        }
        
        // Reset morphorum s'il existe
        if(typeof Morphorum != "undefined")
            Morphorum.reset();
        
        // todo: soucis lors du premiere chargement, le forum se recharge deux fois
        pagedetect.debug("Detection terminée, appel du Dispatcher", 2);
        Dispatcher.activateModsOnPage(pagedetect.l_page);
        
        var node = $xpath("//td[contains(@id,'tid_forum_right')]");
        if(node) {
            var forumModifiedNode = document.createElement('div');
            node.appendChild(forumModifiedNode);
            
            // Si node removed
            forumModifiedNode.addEventListener('DOMNodeRemoved', function() {
                    pagedetect.debug("Changement de thread détécté, attend l'arrivée du thread");
                    
                    Dispatcher.addXNodeChangeListenner("//td[contains(@id,'tid_forum_right')]", function() {
                            pagedetect.debug("Changement de thread terminé, lance la détéction des pages");
                            pagedetect.getPageCodes();
                    }, 2);
            }, false);
        }
    },

    
    /**
     * Parcourt tree a la recherche des pagecode correspondant a la page courante
     *
     * @param tree          Arbre de page a parcourir
     * @param parent        parent de l'arbre dans page_tree
     */
    testPages: function testPages(tree, parent) {
        var page;
        for(page in tree) {
            var value = tree[page];
            var match = pagedetect.testValue(value, page);
            if(match === null && typeof value == 'object') // sous-groupe
                match = pagedetect.testPages(value, page); // double emploi avec _ : si un fils match, la page match ; mais _ n'est pas obligatoire
            
            if(match === null)
                pagedetect.debug("Erreur: match=null & typeof pages_tree[{0}] = {1}".format(page, typeof value));
            
            if(page == '_') { // cas spécial : on traite le parent
                if(match)
                    pagedetect.l_page[parent] = true; // seul moment ou on continue d'itérer sur les soeurs
                else if(match === false)
                    return false;
            } else if(match) { // au premier match positif on retourne au père
                pagedetect.l_page[page] = true;
                return true; 
            }
        }
        
        return false;
    },


    /**
     * Fonction qui prend une value de type variable et le name (codepage) de la page à tester
     * et dit si la page correspont a la page courante
     * 
     * @param value     Valeur a tester
     * @param name      pagecode dans la liste (index)
     *
     * @return          renvoie true si value correspond a la page courante, 
     *                  false sinon
     *                  null si val n'est pas d'un type attendu (surement un sous-groupe)
     */
    testValue: function testValue(value, name) {
        var matched = null;
        
        if(typeof value == 'string') {
            if(value[0] == '$') // l'$ID existe ?
                matched = ( $(value.substr(1)) != null );
            else // xpath expression sur dynamic section
                matched = ( $xpath(value, pagedetect.dynamicSection) != null );
        } else if(value instanceof RegExp) { // regexp sur location.hash
            matched = value.test(pagedetect.locationHash);
        } else if(typeof value == 'boolean') { // simple booléen
            matched = value;
        } else if(typeof value == 'function') { // fonction a retour booléen
            matched = value(name);
        }
        
        return matched;
    },


    /**
     * Initialise les membres de pagedetect (section dynamique et hash)
     */
    initMembers: function initMembers() {
        if(typeof pagedetect.nb_retries == "undefined")
            pagedetect.nb_retries = 0;
        
        pagedetect.nb_retries += 1;
        
        // Au cas ou la page ne se chargerait pas
        if(pagedetect.nb_retries > 100) {
            pagedetect.debug("Erreur: trop de tentatives de pagedetect.getPageCodes, la page semble ne pas se charger");
            return {TOUT:1, _ERROR:1}; // histoire d'avoir quand même le marteau
        }

        if(pagedetect.nb_retries > 1)
            pagedetect.debug("Tentative de rechargement de pagedetect n° {0}".format(pagedetect.nb_retries), 2);

        pagedetect.debug("On a document.location.hash: {0}\net url_on_get: {1}".format(uneval(document.location.hash), uneval(Dispatcher.url_on_get)), 2);
        
        // Cette ligne peut poser des problémes de compatibilité
        var locationHash = document.location.hash;
        if(!locationHash) {
            // Ceci est plus sûr (pris direct de js.HmlHttp.get())
            locationHash = Dispatcher.url_on_get;
            
            if (locationHash)
                pagedetect.debug("Valeur url_on_get prise au lieu de location.hash.");
            else{
                locationHash = "";
                pagedetect.debug("Pas de valeur ni pour location.hash, ni avec url_on_get ! On met \"\".");
            }
        }
        
        // page non encore complètement chargée, ou bien page de login (d'où le if(h)!
        if(locationHash && locationHash.indexOf('#') == -1)
            return false;
        
        // chaque page doit avoir son contenu dynamique chargé
        var dynamicSection = $('generic_section');
        if(!dynamicSection) dynamicSection = $('ghost_pages');
        if(!dynamicSection) dynamicSection = $('gamebody');
        if(!dynamicSection) dynamicSection = document.body; // pour faire les xpath
        if(!dynamicSection) {
            pagedetect.debug("La page n'a pas de body !");
            return false
        }
        
        // page non encore complètement chargée
        if(!dynamicSection.hasChildNodes())
            return false;
        
        pagedetect.locationHash = locationHash;
        pagedetect.dynamicSection = dynamicSection;
        
        return true;
    },

    
    /**
     * Effectue une conjonction de array dans l_page.
     * En francais, ET logique
     *
     * @return      true si un element de array n'est pas dans l_page,
     *              false sinon
     */
    conjunction: function(array) {
        var i;
        
        for(i=0; i<array.length; i++) {
            if(!(array[i] in pagedetect.l_page))
                return false;
        }
        
        return true;
    },

    
    /**
     * Effectue une dijonction de array dans l_page
     * En francais, OU logique (non exclusif)
     *
     * @return      true si un element de array est dans l_page,
     *              false sinon
     */
    disjunction: function(array) {
        var i;
        
        for(i=0; i<array.length; i++) {
            if(array[i] in pagedetect.l_page)
                return true;
        }
        
        return false;
    },

    // Accesseurs
    isPage: function isPage(pagecode) { return (pagecode in pagedetect.l_page); },
    getPagesList: function getPagesList(pagecode) { return pagedetect.l_page; },
    isPageBase: function isPageBase(pagecode) { return (pagecode in pagedetect.pages_tree && pagecode in pagedetect.l_page); },
    getPageBaseList: function getPageBaseList(pagecode) { return $grep(pagedetect.l_page, function(p){ return pagedetect.isPageBase(p); }); },
    isPageModifier: function isPageModifier(pagecode) { return (pagecode in pagedetect.l_modifier && pagecode in pagedetect.l_page); },
    getPageModifiersList: function getPageModifiersList(pagecode) { return $grep(pagedetect.l_page, function(p){ return pagedetect.isPageModifier(p); }); },
    isVirtualPage: function isVirtualPage(pagecode) { return (pagecode in pagedetect.virtual_pages && pagecode in pagedetect.l_page); },
    getVirtualPagesList: function getVirtualPagesList(pagecode) { return $grep(pagedetect.l_page, function(p){ return pagedetect.isVirtualPage(p); }); },
});



/****************************************************************************/
/******************************** optionsmanager.core.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// optionsmanager.core.js
// Ce composant noyau permet aux autres modules de gérer leurs options facilement
// Il collecte des informations sur l'utilisation des modules
// Et permet de sauver les préférences utilisateur sur un serveur distant,
// afin de les récupérer sur un autre PC

//§ Flags: Oblig
//§ Rank: 40


// Utilisation dans un module :
//
//  params:{
//      disp_icon:{type:'bool', desc:"Afficher une icone ?"},
//      delta_t:{type:'int', desc:"Réactualiser toutes les : ", call:this.checkRange, help:"En secondes. Minimum 10."},
//      text:{type:'string', desc:"Texte du message : ", default:''},
//      checkme:{type:'bool', desc:"Invalide les contrôles ci-dessous", onchange: function(){ settings.enableOptionsIf(this, 'checkme', ['gender', 'clickme']); } },
//      info:{type:'info', desc:"Nous avons détecté une forte concentration de choucroute dans votre navigateur."},
//      gender:{type:'enum', desc:"Sexe : ", values:{'M':"Homme", 'F':"Femme"}, default:'M', 
//              onchange: function(cn, opt, val, syscall){ alert('Changement '+(syscall?'syscall ':'')+' : '+cn+'.'+opt+'='+val); }},
//      clickme:{type:'button', default:'Clique Moi !', onchange: function(){ alert('Clic !'); } },
//  },
//
//  checkRange: function checkRange(newval, oldval, param_name) {
//      if(newval < 10) {
//          settings.error("La durée minimale entre deux réactualisations est de 10 secondes");
//          return oldval; // ne change pas la valeur
//      }
//      return newval; // toujours ! (autrement définirai param_name à undefined ...)
//  }
//
/////////////////////////////////////////////////////////////////////////////

settings = new Core('settings', {
    // Pour ModMan
    label: "Settings",
    options: {
        hide: true,
        icon: "http://data.hordes.fr/gfx/icons/small_more.gif",
        htmldesc: "Permet aux modules de gérer leurs options, permet de sauver ses préférences sur un serveur distant, et collecte des statistiques sur l'utilisation des modules.",
        credits: "Hypher",
    },
    
    IMG_MODOPTIONS:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%10%08%03%00%00%00%18%A1%1Er%00%00%00%07tIME%07%D9%09%10%0D%18%04)B%1D%BA%00%00%00%09pHYs%00%00%1E%C1%00%00%1E%C1%01%C3iTS%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%12PLTEk%24%11%00%00%00%FF%FF%FF%9C%9C%9C%84%84%84%D6%EF%8CI%C0)%FB%00%00%00%3DIDATx%DA%8D%CC%C1%0E%80%00%08%02P%0C%F8%FF_.%B0%D6%D6)%0E%EE%8D%A9%C0l%0C%84%D2%B8t%3AO%5BG%CBH%25s%C5%25%25%F2%5Eh%3E%3C%9A%E55%F0%97%EF%D9%F3%EC%04R%EA%00%CC%8E%12%B9P%00%00%00%00IEND%AEB%60%82", // icone à droite des modules réglables
    SAVECONFIG_CHECKBOX_ID: 'settings_save_config_cb',
    
    l_component: {},    // Liste des composants à gérer {classname:{'comref':comref, 'gmdb':com_gmdb}, ...}
    errors: [],         // liste des erreurs de validation (cf settings.error(msg))

    // le classname du module entrain de se faire configurer
    active_options_pane_classname: null,
    
    options_pane_container_id:  'DGM_OptionsPane_container',
    options_pane_id:            'DGM_OptionsPane',
    options_pane_content_id:    'DGM_OptionsPane_content',
    options_btn_bar_id:         'DGM_OptionsBtnBar',

    buttons_install_mark:       'DGM_settings_icons_installed',
    
    /**
     * Initialise le composant noyau
     */
    initialize: function initialize() {
        try{
            // S'il n'est pas encore initialisé
            if($(settings.options_pane_container_id))
                return settings.debug("Déja initialisé !");
            
            htmltool.addStyle('#'+settings.options_pane_container_id+" { left: 0px; top: 0px; width: 100%; height: 100%; position: fixed; overflow:auto; display:none; z-index: 10; }");
            htmltool.addStyle('#'+settings.options_pane_container_id+" table { width: 600px; height: 100%; margin: auto; }");
            
            //div d'options (+boutons)
            htmltool.addStyle('#'+settings.options_pane_id+" { background-color:#7D4C2A; border:1px solid #B37C4A; color:#F0D79E; outline-color:black; outline-style:solid; outline-width:2px; padding:5px; }");
            //htmltool.addStyle('#'+settings.options_pane_id+" input[type='button'] { height: 20px; float: left; }");
            htmltool.addStyle('#'+settings.options_pane_container_id+" table td { text-align: center; }");
            htmltool.addStyle('#'+settings.options_btn_bar_id+" .button { display:inline; width:120px; margin-left:40px; margin-right:40px; text-align:center; }");
            htmltool.addStyle('#'+settings.options_btn_bar_id+" { margin-top: 10px;  height: 30px;}");
            htmltool.addStyle('#'+settings.options_btn_bar_id+" div { height: 30px; float: left; }");

            //htmltool.addStyle("#DGM_OptionsPane input { width:120px; }");
            
            settings.debug("Crée le panneau d'options générique", 2);
            settings.createOptionsPane();
            
            settings.debug("Initialise les composants configurables", 2);
            settings.l_component = Dispatcher.getAllComponents();
            
            // pour tous les composants
            for(var classname in settings.l_component) {
                var component = settings.l_component[classname];
                if(component.params) {
                    settings.debug("Initialise les paramètres du composant {0}".format(classname), 3);
                    
                    for(var param_name in component.params) {
                        settings._buildParam(classname, param_name);
                    }
                }
            }
            
            Dispatcher.registerCallback(settings, 'All', settings.installIcons, 'after:ModMan');
        } catch(ex) {
            settings.debugException(ex);
        }
    },

    
    /**
     * Construit la structure autour du paramètre param_name dans le composant classname
     * @private Ne pas appeller en dehors du composant settings
     *                   
     * Déjà présent :
     *  parametre.type;
     *  parametre.desc;
     *  parametre.default; (optionnel)
     *  parametre.call; (optionnel)
     *  parametre.help; (optionnel)
     *  parametre.disabled (optionnel)
     * Va créer :
     *  parametre.name;
     *  parametre.owner;
     *  parametre.value;
     *  parametre.disabled_deep;
     *  parametre.set(newval);
     *  parametre.getInstantValue();
     *  parametre.setInstantValue(value);
     *
     * @param classname         Nom de la classe a laquelle le parametre appartient
     * @param param_name        Nom du paramétre
     */
    _buildParam: function _buildParam(classname, param_name) {
        var component = settings.l_component[classname];
        var parametre = component.params[param_name];
        
        parametre.name = param_name;
        parametre.owner = classname;
        
        if(parametre.type == 'button')      // les boutons n'ont pas d'entrée GMDB
            parametre.value = parametre.default;
        else
            parametre.value = settings.db.get("{0}/params/{1}".format(classname, param_name), parametre.default);
        
        // entier: compte le nombre d'enable/disable
        parametre.disabled_deep = 0;
        if(parametre.disabled)
            settings.disableOptions(component, [param_name], false);
        
        (function(){ // closure
            var _cn = classname;
            var _param_name = param_name;
            parametre.set = function(newval) { return settings.setParam(_cn, _param_name, newval, true); };
            parametre.getInstantValue = function() { return settings.getValueFromDOMInput(parametre); };
            parametre.setInstantValue = function(value) { return settings.setValueToDOMInput(parametre, value); };
        })();
        
        if(parametre.call && typeof parametre.call != 'function') {
            parametre.call = undefined;
            settings.debug("{0}.params.{1}.call doit être une fonction !".format(classname, param_name));
        }
    },

    
    /**
     * Place les icones sur la page
     */
    installIcons: function installIcons() {
        // S'il n'est pas encore installé
        if($(settings.buttons_install_mark))
            return settings.debug("Déja installées !", 2);
        
        var install_mark = document.createElement('span');
        install_mark.id = settings.buttons_install_mark;
        document.body.appendChild(install_mark); // l'installe sur la page entière
        
        for(var classname in settings.l_component) {
            // pas paramétrable
            if(!settings.l_component[classname].params)
                continue;
            
            settings._addParamIcon(classname);
        }
    },

    
    
    /**
     * Ajoute une icone de paramétrisation à coté du nom du module dans ModMan.
     * (seulement si modman existe)
     * @private Ne pas appeller en dehors du composant settings
     */
    _addParamIcon: function _addParamIcon(classname) {
        settings.debug("Ajoute un bouton de paramétrisation sur "+classname, 2);
            
        if(typeof ModMan == "undefined") {
            settings.debug("Le module ModMan n'est pas installé");
            return false;
        }
        
        var a = ModMan.modlinks[classname];
        if(!a) {
            if( classname != "ModMan" &&
                classname != "debugeur")
            {
                settings.debug("Référence à ModMan.modlinks[{0}] indéfinie.".format(classname));
            }
            
            return false;
        }
        
        var img = document.createElement('img');
        img.setAttribute('src', settings.IMG_MODOPTIONS);
        img.setAttribute('alt', 'Options du module');
        img.setAttribute('title', img.getAttribute('alt'));
        img.className = "modoptions"; // Pris en charge dans le css de modman
        
        (function(){ // closure
            var _classname = classname;
            
             // évite la propag pour pas désactiver le module
            img.addEventListener('click', function(evt) {
                evt.stopPropagation();
                settings.showOptionsPane(_classname);
            }, true);
        })();
        
        a.appendChild(document.createTextNode(' '));
        a.appendChild(img, a);
    },

    
    /**
     * Ajoute dynamiquement un paramètre à un module
     
     * @param component     Composant sur lequel ajouter le parametre
     * @param param_name    Nom du parametre
     * @param param_value   Valeur du parametre
     */
    addParamDynamically: function addParamDynamically(component, param_name, param_value) {
        settings.debug("Ajoute dynamiquement le paramètre {0}.params.{1}".format(component.classname, param_name), 2);

        // le composant n'a pas du tout d'options
        if(!settings.l_component[component.classname]) {
            settings.l_component[component.classname] = component;
            
            _addParamIcon(component.classname);
        }
        
        // ajoute dynamiquement le paramètre
        component.params[param_name] = param_value;
        settings._buildParam(component.classname, param_name);
    },

    
    /**
     * Récupère la valeur du paramètre stocké en DB.
     * Utile pour accéder à un paramètre avant son initialisation
     * (par addParamDynamically, ou avant initialize)
     */
    getDBValue: function getDBValue(component, param_name) {
        return settings.get("{0}/params/{1}".format(component.classname, param_name), undefined, true);
    },
    // TODO virer ca, seulement utile pour Upgrade (dans misc.part.js de l'ancienne version)
    getGMDBValue: function getGMDBValue(component, param_name) {
        return settings.getDBValue(component, param_name)
    },
    
    
    /**
     * Crée la paneau d'options
     */
    createOptionsPane: function createOptionsPane() {
        try {
            var div = document.createElement('div');
            div.id = settings.options_pane_container_id;
            var dark_div = document.createElement('div');
            dark_div.setAttribute('class', 'black');
            dark_div.setAttribute('style', 'z-index:-1'); // j'arrive pas à mettre le z-index d'une autre div par dessus, alors mettons celle là par dessous...
            div.appendChild(dark_div);
            var table = document.createElement('table');
            div.appendChild(table);
            var tr = document.createElement('tr');
            table.appendChild(tr);
            var td = document.createElement('td');
            td.setAttribute('valign', 'center'); // tout ça pour un valign
            tr.appendChild(td);
            var pane = document.createElement('div');
            pane.id = settings.options_pane_id;
            td.appendChild(pane);
            var pane_content = document.createElement('div');
            pane_content.id = settings.options_pane_content_id;
            pane.appendChild(pane_content);
            
            var buttons = document.createElement('div');
            buttons.id= settings.options_btn_bar_id; // bluflonalgul
            //buttons.setAttribute('style', 'margin-top:10px;');
            pane.appendChild(buttons);

            buttons.appendChild( settings.buildButton( 'Annuler',       settings.hideOptionsPane     ) );
            buttons.appendChild( settings.buildButton( 'Réinitialiser', settings.resetOptionsPane    ) );
            buttons.appendChild( settings.buildButton( 'Enregistrer',   settings.validateOptionsPane ) );

            if(typeof ConfiGarde != 'undefined' && !ConfiGarde.disabled) {
                var div_upload = document.createElement('div');
                div_upload.setAttribute('style', ' margin-left:auto; margin-right:auto; padding-right:20px; text-align:right; font-size:8pt;');
                div_upload.innerHTML = '<input type="checkbox" disabled="disabled" id="'+settings.SAVECONFIG_CHECKBOX_ID+'" /> Sauvegarder sur le serveur';
                pane.appendChild(div_upload);
                HorTools.addSpecialTip( div_upload, "Sauvegarde serveur en cours de développement..."); // TODO rectifier quand ok LCN
            }
            
            document.body.appendChild(div);
        } catch(ex) {
            settings.debugException(ex);
        }
    },

    
    /**
     * Ajoute un bouton sur la page
     *
     * @param label     Texte du boutton
     * @param func      Fonction appellée lors du clic
     */
    buildButton: function buildButton(label, func) {
        var div = document.createElement('div');
        var btn = document.createElement('input');
        
        div.appendChild(btn);
        
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', label);
        btn.setAttribute('class', 'button');
        
        btn.addEventListener('click', function(){ func(); }, false);

        return div;
    },
    

    /**
     * Permet d'afficher le panel d'options d'un composant donné
     *
     * @param classname     Nom du composant
     */
    showOptionsPane: function showOptionsPane(classname) {
        // Deja ouvert ?
        if(settings.active_options_pane_classname !== null)
            return settings.debug("Ne peut pas ouvrir l'option_pane de {0} car il est déjà ouvert pour {1}".format(classname, settings.active_options_pane_classname));
        
        settings.active_options_pane_classname = classname;
    
        // remplace le contenu du panneau par les options du bon module
        var content_node = $(settings.options_pane_content_id);
        
        // vide le contenu
        while(content_node.hasChildNodes())
            content_node.removeChild(content_node.firstChild);
        
        // Ajoute le bon panneau
        var html = settings.createOptionsPaneContent(classname);
        content_node.appendChild(html);
        
        document.body.className = "hideSwf";
        
        // appelle les onchange en syscall pour invalider certaines options avant affichage si besoin
        var component = settings.l_component[classname];
        for(var param_name in component.params) {
            var param = component.params[param_name];
            
            // SAUF pour les boutons
            if( param.onchange && 
                param.type != 'button' && 
                param.type != 'info')
            {
                param.onchange.call(
                        component, component.classname, 
                        param_name, param.value, 
                        true    // syscall
                ); 
            }
        }
        
        // affiche le panneau
        var pane_node = $(settings.options_pane_container_id);
        pane_node.style.display = 'block';
    },
    

    /**
     * Cache le panneau d'options
     */
    hideOptionsPane: function hideOptionsPane() {
        var pane_node = $(settings.options_pane_container_id);
        pane_node.style.display = 'none';
        document.body.className = '';
        
        settings.active_options_pane_classname = null;
    },
    

    /**
     * Remet les options par défaut
     */
    resetOptionsPane: function resetOptionsPane() {
        var classname = settings.active_options_pane_classname;
        var component = settings.l_component[classname];
        
        for(var param_name in component.params) {
            var param = component.params[param_name];
            settings.setValueToDOMInput(param, param.default);
        }
    },

    
    /**
     * Enregistre les options données par l'utilisateur
     */
    validateOptionsPane: function validateOptionsPane() {
        try {
            var classname = settings.active_options_pane_classname;
            
            var component = settings.l_component[classname];
            var l_param = component.params;
            
            settings.clearErrors(); // efface les précédentes erreurs
            
            //valide chaque option
            for(var param_name in l_param) {
                var param = l_param[param_name];
                    
                // les boutons n'ont pas de valeur associée, les info non plus
                if(param.type == 'button' || param.type == 'info')
                    continue;
                    
                var input = $("DGM_OM_{0}_{1}".format(classname, param_name));
                var new_value = settings.getValueFromDOMInput(param);
                
                // vérifie les valeurs de base
                switch(param.type) {
                    case 'int':
                        if(isNaN(new_value))
                            settings.error('"{0}" doit être un nombre.'.format(param.desc));
                        else
                            settings.setParam(classname, param_name, new_value);
                        break;
                    
                    case 'float':
                        if(isNaN(new_value))
                            settings.error('"{0}" doit être un nombre à virgule.'.format(param.desc));
                        else
                            settings.setParam(classname, param_name, new_value);
                        break;
                    
                    default:
                        settings.setParam(classname, param_name, new_value);
                }
            }
            
            if(settings.errors.length > 0) {
                //HorTools.showNotif(settings.errors.join("<br />")); TODO
            } else {
                if(typeof ConfiGarde != 'undefined' && !ConfiGarde.disabled) {
                    // demande sauvegarde distante
                    if($(settings.SAVECONFIG_CHECKBOX_ID).checked)
                        ConfiGarde.uploadConfig();
                }
                
                settings.hideOptionsPane();
            }
        } catch(ex) {
            settings.debugException(ex);
        }
    },

    
    /**
     * normalise et retourne la valeur contenue dans le champ
     * correspondant à param dans le formulaire
     *
     * @param param     Valeur voulue
     */
    getValueFromDOMInput: function getValueFromDOMInput(param) {
        if(!param.DOMRef)
            throw "getValueFromDOMInput: param.DOMRef n'existe pas.";
        
        var input = param.DOMRef;
        
        switch(param.type) {
            case 'bool':
                return (input.checked ? true : false);
            
            case 'int':
                return parseInt(input.value);
            
            case 'float':
                return parseFloat(input.value);
            
            case 'enum':
                return input.options[input.selectedIndex].value;
            
            case 'info':
                return input.textContent;
            
            case 'string':
            case 'password':
            case 'text':
            case 'button':
            default:
                return input.value;
        }
    },
    

    /**
     * Modifie la valeur d'un des champs d'options
     *
     * @param param         Champs a modifier
     * @param new_value     Nouvelle valeur
     */
    setValueToDOMInput: function setValueToDOMInput(param, new_value) {
        if(!param.DOMRef)
            return false;
        
        var input = param.DOMRef;
        
        switch(param.type) {
            case 'bool':
                input.checked = (new_value ? true : false);
                break;
            
            case 'enum':
                for(var i=0; i<input.options.length; i++) {
                    if(input.options[i].value == new_value) {
                        input.selectedIndex = i;
                        input.value = new_value;
                    }
                }
                break;
            
            case 'info':
                input.textContent = new_value;
            case 'int':
            case 'float':
            case 'string':
            case 'password':
            case 'text':
            case 'button': // changera le texte du bouton
            default:
                input.value = new_value;
        }
        
        return true;
    },

    
    /**
     * Crée le panel d'options pour un component donné
     *
     * @param classname     Nom du component
     */
    createOptionsPaneContent: function createOptionsPaneContent(classname) {
        try {
            var component = settings.l_component[classname];
        
            var div = document.createElement('div');
            var h1 = document.createElement('h1');
            var table = document.createElement('table');
            
            div.appendChild(h1);
            h1.appendChild(document.createTextNode("Configurer {0}".format((component.label || component.classref))));
            div.appendChild(table);
            
            for(var param_name in component.params) {
                var param = component.params[param_name];
                
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                
                table.appendChild(tr);
                
                // exlut les paramètres prenant toute la ligne
                if((param.type != 'bool') && (param.type != 'info')) {
                    td.setAttribute('style', 'text-align:right');
                    tr.appendChild(td);
                    td.appendChild(document.createTextNode(param.desc));
                    td = document.createElement('td');
                    td.setAttribute('style', 'text-align:left; padding-left:5px;');
                    tr.appendChild(td);
                }
                
                var input = document.createElement('input');
                input.id = "DGM_OM_{0}_{1}".format(classname, param_name);
                param.DOMRef = input;
                
                switch(param.type) {
                    case 'bool':
                        td.setAttribute('colspan', '2');
                        td.setAttribute('style', 'text-align:left; padding-left:150px;');
                        tr.appendChild(td);
                        input.setAttribute('type', 'checkbox');
                        if(param.value) input.setAttribute('checked', 'checked');
                        td.appendChild(input);
                        td.appendChild(document.createTextNode(' '+param.desc));
                    break;
                    case 'int':
                    case 'float':
                    case 'string':
                        input.setAttribute('type', 'text');
                        input.setAttribute('class', 'field'); // classe Hordes
                        input.value = param.value;
                        td.appendChild(input);
                    break;
                    case 'password':
                        input.setAttribute('type', 'password');
                        input.setAttribute('class', 'field'); // classe Hordes
                        input.value = param.value;
                        td.appendChild(input);
                    break;
                    case 'button':
                        input.setAttribute('type', 'button');
                        input.setAttribute('class', 'button'); // classe Hordes
                        input.value = param.value;
                        td.appendChild(input);
                    break;
                    case 'info':
                        td.setAttribute('colspan', '2');
                        tr.appendChild(td);
                        var span = document.createElement('span');
                        span.id = input.id;
                        span.textContent = param.desc;
                        td.appendChild(span);
                        param.DOMRef = span;
                        delete input;
                        input = span;
                        td.appendChild(input);
                    break;
                    case 'text': // multiline string
                        var textarea = document.createElement('textarea');
                        textarea.id = input.id;
                        textarea.value = param.value;
                        td.appendChild(textarea);
                        param.DOMRef = textarea;
                        delete input;
                        input = textarea;
                    break;
                    case 'enum': // select
                        var select = document.createElement('select');
                        select.id = input.id;
                        select.value = param.value;
                        for(var key in param.values) {
                            var option = document.createElement('option');
                            option.setAttribute('value', key);
                            if(param.value == key) option.setAttribute('selected', 'selected');
                            option.appendChild(document.createTextNode(param.values[key]));
                            select.appendChild(option);
                        }
                        td.appendChild(select);
                        param.DOMRef = select;
                        delete input;
                        input = select;
                    break;
                    default:
                        settings.debug("{0}.{1}.type n'est pas un type valide.".format(classname, param_name));
                }
                
                // gère les onchange
                if(param.onchange) {
                    switch(param.type) {
                        case 'button': //input button
                            event_type = 'click';
                        break;
                        case 'info':
                            settings.debug("Impossible d'ajouter un gestionnaire onchange sur {0}.{1} de type 'info'.".format(classname, param_name));
                        break;
                        case 'bool': //input checkbox
                        case 'int': //input text
                        case 'float':
                        case 'string':
                        case 'password':
                        case 'text': //textarea
                        case 'enum': // select
                        default:
                            event_type = 'change';
                    }
                    
                    // ajoute le gestionnaire d'évènements qui va bien
                    (function(){
                            var _param_name = param_name;
                            var _param = settings.l_component[classname].params[_param_name]; // dieu que les closures c'est chiant...
                            input.addEventListener(event_type, function(){
                                    _param.onchange.call(settings.l_component[classname], classname, param_name, _param.getInstantValue());
                                }, false);
                        })();
                }
                
                if(param.help) {
                    td.appendChild(hortool.buildRoundHelpTip(param.help)); 
                }
                
            } // /for(param_name ..)
            
            return div;
        } catch(ex) {
            settings.debugException(ex);
        }
    },

    
    /**
     * Modifie un parametre pour un component donné
     *
     * @param classname             Component ciblé
     * @param param_name            Nom du parametre
     * @param newval                Nouvelle valeur
     * @param {Boolean} syscall     Appellé en syscall ou non
     */
    setParam: function setParam(classname, param_name, newval, syscall) {
        var component = settings.l_component[classname];
        var param = component.params[param_name];
        
        if(param.call) {
            settings.debug("Appelle {0}.{1}.call(...)".format(classname, param_name), 3);
            newval = param.call.call(component, newval, param.value, param_name, syscall);
        }
        
        param.value = newval;
        
        // TODO : faire ça une fois toutes les validations effectuées
        settings.db.set("{0}/params/{1}".format(classname, param_name), newval);
        
        return newval;
    },

    /**
     * appelée depuis les fonctions call de validation
     * enqueue une erreur et empêche la validation du formulaire
     *
     * @param msg       Message d'erreur
     */
    error: function error(msg) {
        settings.errors.push(msg);
    },
    

    /**
     * Vide la liste d'erreurs
     */
    clearErrors: function clearErrors() {
        settings.errors = [];
    },


    /**
     * Active des options dans un panneau d'options
     * pour un composant donné
     * 
     * @param component             Composant ciblé
     * @param {Array} l_option      Nom des options a activer
     * @param {Boolean} cumul       si true, cumule les enable/disable
     *                              (il faut autant d'enable que de disable pour la réactiver)
     */
    enableOptions: function enableOptions(component, l_option, cumul) {
        for(i=0; i<l_option.length; i++) {
            var param = component.params[l_option[i]];
            
            if(cumul) {
                if(--param.disabled_deep > 0)
                    continue;
                // évite qu'on tombe dans le négatif
                else
                    param.disabled_deep = 0;
            }
            
            param.DOMRef.disabled = false;
            
            // supprime la classe 'off'
            if(param.type == 'button')
                param.DOMRef.className = param.DOMRef.className.replace(/^off$|^off | off$| off /g,'');
        }
    },
    
    
    /**
     * Désactive des options dans un panneau d'options
     * pour un composant donné
     * 
     * @param component             Composant ciblé
     * @param {Array} l_option      Nom des options a activer
     * @param {Boolean} cumul       si true, cumule les enable/disable
     *                              (il faut autant d'enable que de disable pour la réactiver)
     */
    disableOptions: function disableOptions(component, l_option, cumul) {
        for(i=0; i<l_option.length; i++) {
            var param = component.params[l_option[i]];
            
            if(cumul) {
                if(++param.disabled_deep < 0)
                    continue;
            }
            
            param.DOMRef.disabled = true;
            
            if(param.type == 'button')
                param.DOMRef.className += ' off';
        }
    },
    
    
    /**
     * Active/desactive une liste d'option selon une autre condition
     * 
     * @param component             Composant ciblé
     * @param condition             Nom de l'option a vérifier ou booléen
     * @param {Array} l_option      Nom des options a activer
     */
    enableOptionsIf: function enableOptionsIf(component, condition, l_option) {
        var toBeEnabled = condition;
        if(typeof toBeEnabled != 'boolean')
            toBeEnabled = component.params[condition].getInstantValue() ? true : false;
        
        // Si l'option sur laquelle on test est désactivée, on désactive la liste d'options.
        // Cependant, on ne cumul que si on devait effectivement désactiver les options
        if(component.params[condition].DOMRef.disabled)
            return settings.disableOptions(component, l_option, !toBeEnabled);
        
        if(toBeEnabled)
            return settings.enableOptions(component, l_option, true);
        else
            return settings.disableOptions(component, l_option, true);
    },
    
    
    /**
     * Cache une liste d'option
     *
     * @param component             Composant ciblé
     * @param {Array} l_option      Nom des options a cacher
     */
    hideOptions: function hideOptions(component, l_option) {
        for(i=0; i<l_option.length; i++) {
            component.params[l_option[i]].DOMRef.parentNode.parentNode.style.display = 'none';
        }
    },
    
    
    /**
     * Montre une liste d'option
     *
     * @param component             Composant ciblé
     * @param {Array} l_option      Nom des options a montrer
     */
    showOptions: function showOptions(component, l_option) {
        for(i=0; i<l_option.length; i++) {
            component.params[l_option[i]].DOMRef.parentNode.parentNode.style.display = 'table-row';
        }
    },
    
    
    /**
     * Affiche/Cache une liste d'option selon une autre condition
     *
     * @param component             Composant ciblé
     * @param condition             Nom de l'option a vérifier ou booléen
     * @param {Array} l_option      Nom des options a cacher
     */
    showOptionsIf: function showOptionsIf(component, condition, l_option) {
        var toBeShow = condition;
        if(typeof toBeShow != 'boolean')
            toBeShow = component.params[optcond].getInstantValue() ? true : false;
        
        if(toBeShow)
            settings.showOptions(component, l_option);
        else
            settings.hideOptions(component, l_option);
    },
});




/****************************************************************************/
/******************************** debugeur.tool.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// debugeur.tool.js
// Permet a tout les component d'afficher des erreurs
// warnings, informations ou messages de debugage

//§ Flags: Oblig
//§ Rank: 100

//  /|\  Eviter de définir des fonctions anonymes autrement,
// / ! \ le debugeur ne pourra pas récuperer le nom de la fonction
// Preferer ecrire "main: function main() {};"
// Plutot que "main: function() {};"


/**
 * Outils de débogage.
 *
 * @param {String} classname    Nom de la classe en cours de création
 * @param {Object} properties   Liste des propriétés de l'objet a créer
 */
var debugeur = new Tool("debugeur", {
    // pour ModMan
    label: "Debugeur",
    options: {
        hide: false, 
        icon: "http://data.hordes.fr/gfx/icons/item_electro.gif?v=4", // choix d'icone
        htmldesc: "Gére le debugage",
        credits: "Bluflonalgul.",
    },
    
    params: {
        sortie: {
            type:       "enum",
            desc:       "Sortie préférée pour le débugeur: ",
            values: {
                "GM": "GreaseMonley",
                "FB": "FireBug"
            },
            default:    "FB",
        },
    },
    
    
    /**
     * Affiche un simple message destiné à faciliter le debogage.
     *
     * @param {String} message          Message que l'on désire afficher
     * @param {Integer} level           Niveau de debugage du message
     */
    out: function out(message, level) {
        switch(debugeur.params.sortie.value) {
            // Console firebug
            case "FB":
                if(level == 1)
                    console.error(message);
                else if(level == 2)
                    console.info(message);
                else if(level == 3)
                    console.debug(message);
                else
                    console.warn(message);
                break;
            
            // Console GreaseMonkey
            case "GM":
            default:
                GM_log(message);
                break;
        }
    },
     
    /**
     * Affiche un simple message destiné à faciliter le debogage.
     *
     * @param {String} message          Message que l'on désire afficher
     * @param {String} from             Origine du message
     * @param {Integer} level           Niveau de debugage du message
     */
    debug: function debug(message, from, level) {
        message = "{0}: {1}".format(from, message);
        
        debugeur.out(message, level);
    },
    
    
    // TODO traceinfo
    /**
     * Affiche un message d'erreur suite à une exception.
     *
     * @param {String} message          Message que l'on désire afficher
     * @param {String} from             Origine du message
     * @param {String} ex               Exception que l'on veut détailler
     */
    debugException: function debugException(message, from, ex) {
        // Raccourcit le nom de fichier
        file = $grep(ex.fileName, /([\w\.]+)$/);
        
        // Eclaircit le stack
        var stack = []
        if(ex.stack) {
            var l_fonction = $grep(ex.stack, /^([\w\.]+\(.*\))@file:/gm);
            for(var i=0; i<l_fonction.length; i++) {
                var fonction = explodeFunction(l_fonction[i]);
                
                if(fonction.name == 'dbgEncapsulator') continue; // ne mets pas les encapsulateurs dans la trace
                
                //if(traceinfo) { // traceinfo = [[funname1, __dbg__], [funname2, __dbg__], ...]
                //    //if(traceinfo.indexOf(r.name))
                //    //GM_log('comp '+traceinfo[0][0]+' with '+r.name);
                //    if(traceinfo[0][0] == r.name) { // traceinfo est dans l'ordre et a forcément au moins autant de fonctions que funlist... <= FIXME est-ce vrai ??? peut en avoir moins ?
                //        r.traceinfo = traceinfo.shift()[1]; //... ainsi si 2 objets ont une fonction de même nom on gère :)
                //    }
                //}
                    
                //coupe les arguments trop longs
                var maxlen = 50;
                for(var j=0; j<fonction.args.length; j++)
                    fonction.args[j] = "[[{0}...]]".format(fonction.args[j].substr(0, maxlen));
                
                stack.push("{0}.{1}({2})".format(fonction.classname, fonction.name, fonction.args.join(', ')));
            }
        }
        ex.stack = stack.join('\n');
        
        message =   "{0}: {1}\n".format(from, message) +
                    "{0}: {1} ({0}:{1})\n".format(ex.name, ex.message, file, ex.message) +
                    "[stack:\n{0}\n]".format(ex.stack);
        
        debugeur.out(message, 1);
    },
});


/****************************************************************************/
/******************************** database.tool.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// database.tool.js
// Définit le prototype de l'interface entre GM_getValue et GM_setValue

//§ Flags: Oblig
//§ Rank: 110


/**
 * Base de donnée persistante entre les pages. Permet de garder des informations
 * lors du changement de page.
 *
 * @param {String} classname    Nom de la classe en cours de création
 * @param {Object} properties   Liste des propriétés de l'objet a créer
 */
var database = new Tool("database", {
    all_entries: {},        // liste de toutes les entrées database associées au module
    cache: {},              // cache local pour éviter les eval fréquents lors de l'accès à de grosses structures
    
    
    /**
     * Associe une clé à une valeur dans la DB. Supprimme la clé si val est non définit.
     *
     * @param {String} entry        Nom que l'on souhaite associer à val
     * @param val                   Valeurs quelconque a conserver en DB
     */
    set: function set(entry, val) {
        // Supprime l'entrée si val est non définit
        // TODO Retirer cette fonctionnalitée ?
        if(val === undefined) {
            database.delete(entry);
            return;
        }
        
        // Crée l'entrée
        if(!(entry in database.all_entries)) {
            database.all_entries[entry] = true;
            GM_setValue(entry, uneval(database.all_entries));
        }
        
        // Lui assigne la valeur voulue
        database.cache[entry] = val;
        GM_setValue(entry, uneval(val));
    },
    
    
    /**
     * Récupére une valeur associée à une entry.
     *
     * @param {String} entry                Nom de la valeur à récuperer
     * @param default_val                   Valeur à renvoyer en cas d'erreur
     * @param {Boolean} disable_cache       Demande ou non l'utilisation du cache
     */
    get: function get(entry, default_val, disable_cache) {
        if(!disable_cache && entry in database.cache)
            return database.cache[entry];
        
        var val_source = GM_getValue(entry);
        
        if(val_source === undefined)
            return default_val;
        
        return eval(val_source);
    },
    
    
    /**
     * Récupére toutes les valeurs enregistrées
     */
    getAll: function getAll() {
        var ret = {};
        
        for(var v in database.all_entries) {
            ret[v] = database.get(v);
        }
        
        return ret;
    },
    
    
    /**
     * Supprime une entrée.
     *
     * @param {String} entry                Nom de la valeur à supprimer
     */
    delete: function delete(entry) {
        // Suppresssion de la valeur dans la DB
        delete database.all_entries[entry];
        GM_setValue(entry, uneval(database.all_entries));
        
        // Suppresssion de la valeur dans le cache
        delete database.cache[entry];
        GM_deleteValue(entry);
    },
    
    
    /**
     * Efface toutes les valeurs enregistrées
     */
    deleteAll: function deleteAll(){
        var keys= {};
        var v;
        
        for(v in database.all_entries) { // copie des valeurs car l'appel va modifier la structure all_entries
            keys[v] = true;
        }
        
        for(v in keys ){
            database.delete(v);
        } 
    },
    
    
    /**
     * Récupére un tableau
     *
     * @param arrayName     Nom du tableau
     */
    getArray: function getArray(arrayName) {
        var array = {};
        
        try {
            array = eval(GM_getValue(arrayName, {}));
        }
        catch(e) {}
        
        return array;
    },
    
    
    /**
     * Récupére une valeur dans un tableau
     *
     * @param arrayName     Nom du tableau
     * @param index         Nom de la valeur
     * @param defaultVal    Valeur de retour si erreur
     */
    getFromArray: function getFromArray(arrayName, index, defaultVal) {
        var array = {};
        
        array = database.getArray(arrayName);
        
        return (index in array) ? array[index] : defaultVal;
    },
    
    
    /**
     * Place une valeur dans un tableau
     *
     * @param arrayName     Nom du tableau
     * @param index         Nom de la valeur
     * @param val           Valeur a inserer
     */
    setToArray: function setToArray(arrayName, index, val) {
        var array = {};
        
        array = database.getArray(arrayName);
        
        if(val === undefined) {
            delete array[index];
        }
        else
            array[index] = val;
        
        database.setArray(arrayName, array);
    },
        
    /**
     * Sauvegarde un tableau
     *
     * @param array         Tableau que l'on veut sauver
     */
    setArray: function setArray(arrayName, array) {
        var str = "";
        if(typeof(array.toSource) == 'undefined') {
            for(var key in array) {
                if(typeof(array[key]) != 'string' && typeof(array[key]) != 'boolean' )
                    continue;
                
                str += ', ' + key + ': ' +
                    (typeof(array[key]) == 'string' ? '"' + array[key] + '"' : array[key]);
            }
            
            str = '({' + str.substr(1, str.length) + '})';
        }
        else
            str = array.toSource();
        
        GM_setValue(arrayName, str);
    },
});


/****************************************************************************/
/******************************** horloge.tool.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// horloge.tool.js
// Outils permettant de récupérer l'heure du serveur

//§ Flags: Oblig
//§ Rank: 120


/**
 * Gestion de l'heure serveur et locale
 *
 * @param {String} classname    Nom de la classe en cours de création
 * @param {Object} properties   Liste des propriétés de l'objet a créer
 */
var horloge = new Tool("horloge", {
    // variables en secondes
    decallage: 0,   // fuseau, heure d'été, d'hiver, etc, en secondes à ajouter à la date système pour avoir le temps local, voir init()
    ecart: null,    // différence par rapport au serveur hordes, +120 => ajouter 2mn à l'heure locale pour avoir l'heure serveur
    ecartMS: null,  // différence précise (ms) par rapport au serveur hordes, exemple : +120000 => ajouter 2mn à l'heure locale pour avoir l'heure serveur
    exact: false,   // true si on considère l'heure locale est calée sur le serveur
    ajustemin: 0,   // précision d'écart par rapport au serveur (à 1mn près, rafraichi toutes les 5s)
    ajustmax: 65,   // +60 => le serveur est peut-être déjà 60 secondes plus tard qu'on ne le croit... dangereux!

    GM_key_ecartMS: "Horloge_ecartMS",  // stockage de l'écart temps local - serveur en MS, utile si non logué
    

    /**
     * Initialise les fonctions de horloge
     * à appeler dès le chargement de la page principale qui contient l'heure serveur
     * nb: cette fonction n'est pas gérée par le dispatcher, c'est un cas particulier ou un outil
     * necessite une initialisation
     */
    initialize: function initialize() { // à appeler dès le chargement de la page principale qui contient l'heure serveur
        var date_jour=new Date();
        horloge.decallage= - (60 * date_jour.getTimezoneOffset() );
        // positif = danger (risque d'être en retard si on se fie à l'heure système)
        var srvTm= horloge.readServerTime();
        if ( srvTm!=null ) {
            horloge.ecart= srvTm - horloge.localTime() + 30; // +30s car en moyenne l'heure serveur indiquée à la minute près a justement cette minute entammée
        }
    },

    
    /**
     * Conversion des secondes en texte au format préféré
     *
     * @param tps           Temps que l'on veut convertir
     * @param precis        A la seconde près, sinon: m => à la minute près, 
     *                      so => secondes optionnelles (non affichée si 0)
     */
    sec2txt: function sec2txt(tps, precis) {
        var retour = '';
        var j, h, mn, sec;
        
        if(tps == null)
            return 'inconnue';
        
        if (precis == undefined)
            precis = 's';

        if(tps < 0) {
            tps= - tps;
            retour = '- ';
        }
        
        // recupère le nb de jour
        j = Math.floor(tps / (3600*24));
        if(j > 0)
            retour = "{0} {1}j".format(retour, j);
        
        // Récupére les heures
        tps = tps % (3600*24);
        h = Math.floor(tps / 3600);
        if(h > 0)
            retour = "{0} {1}h".format(retour, h);
        
        // Récupéres les minutes
        tps = tps % 3600;
        if(precis == 'm')
            mn = Math.round(tps/60);
        else
            mn = Math.floor(tps/60);
        
        if(mn > 0)
            retour = "{0} {1}mn".format(retour, mn);
        
        // Récupére les secondes
        tps = tps % 60;
        sec = Math.floor(tps);
        if(precis == 's' || (precis == 'so' && sec > 0))
            retour = "{0} {1}s".format(retour, sec);
        
        return retour;
    },
    

    /**
     * Heure serveur affichée sur la page, retournée en secondes
     */
    readServerTime: function readServerTime() {
        var srvTime= null;
        var spanSrvTime= $('serverTime');
        if ( spanSrvTime !=null ){
            var srvTimeVal= spanSrvTime.innerHTML.split(':');
            srvTime= 60*(parseInt(srvTimeVal[1]) + 60*parseInt(srvTimeVal[0]));
        }
        return srvTime;
    },
    

    /**
     * jour du serveur disponible sur la page, en secondes epoch
     */
    readServerDay: function readServerDay() {
        var srvDate= null;
        var scriptDate= $('parsed_1') || $('parsed_2');     // l'un ou l'autre, selon la page...
        if ( scriptDate !=null ){
            var srvDateStr= scriptDate.innerHTML.match(/\d\d\d\d\-\d\d\-\d\d/g);
            if ( srvDateStr ) {
                var dataComp= srvDateStr[0].split('-');
                
                // pas oublier le -1 du format JS ...
                var dt=new Date(parseInt(dataComp[0]),parseInt(dataComp[1])-1,parseInt(dataComp[2]));
                
                srvDate= Math.floor(dt.getTime() / 1000);
            }
        }
        return srvDate;
    },

    
    /**
     * Donne le temps serveur exact depuis le XML joueur
     * en ms ! heure serveur présente sur le XML joueur !!
     * avec requête !! exacte à la seconde, modulo les temps de requêtes
     */
    getServerExactTime: function getServerExactTime() {
        if ( $("cornerBt") ){
            var dt=new Date();
            var startTimeMS= dt.getTime() + 1000*horloge.decallage; // heure locale en milisecondes
            GM_log("Horloge.getServerExactTime: temps local: "+horloge.sec2txt((startTimeMS/1000)% (3600*24))+" ("+startTimeMS+")" ); // DEBUG
            var xmlhash= HorTools.XML2Hash(HorTools.getXML()); // requête, elle prend x temps
            if ( xmlhash.game ) {
                var serverTime= GenTools.strDateTimeToDateTime(xmlhash.game.datetime);
                serverTime= serverTime.getTime() + 1000*horloge.decallage; // d'après tests, mais bizarre de devoir faire ça
                GM_log("Horloge.getServerExactTime: temps serveur XML: "+horloge.sec2txt((serverTime/1000)% (3600*24))+" ("+serverTime+")" ); // DEBUG
                horloge.ecartMS= serverTime - startTimeMS; // écart entre l'heure du PC et l'heure serveur (en ms)
                GM_log("Horloge.getServerExactTime: écart temps serveur: "+horloge.ecartMS/1000); // INFO , envisager calibrage si trop varié
                GM_setValue(horloge.GM_key_ecartMS, horloge.ecartMS);
                return serverTime;
            }else{
                GM_log("Horloge.getServerExactTime: pas en jeu, lecture heure sur la page");
                var serverTime= horloge.readServerTime(); // lu sur la page
                if ( serverTime ){
                    return serverTime*1000;
                }
            }
        }
        
        // non connecté, pas moyen de savoir l'heure serveur MT
        horloge.debug("Non connecté, pas moyen de savoir l'heure serveur MT");
        
        return horloge.getServerQuickTime();
    },
    

    /**
     * Donne l'heure exacte a la seconde
     * en ms ! heure serveur exacte à la seconde,
     * d'après les relevés d'écart, sans la requête.
     */
    getServerQuickTime: function getServerQuickTime() {
        var ecartMS2;
        if ( horloge.ecartMS ){
            ecartMS2= horloge.ecartMS; // cache mémoire
        }else{
            ecartMS2= GM_getValue(horloge.GM_key_ecartMS, 0); // lecture ancienne valeur, 0 sinon
        }
        var dt=new Date();
        var locTimeMS= dt.getTime() + 1000*horloge.decallage; // heure locale en milisecondes
        var serverTime= locTimeMS + ecartMS2;
        return serverTime;
    },
    

    /**
     * calcule l'écart entre temps local et temps serveur hordes,
     * pour futurs appels à getServerQuickTime ou équivalent
     */
    initServerTime: function initServerTime(){
        horloge.getServerExactTime(); // on ne garde pas le résultat, c'est juste l'écart qui est stocké
    },
    

    /**
     * retourne les secondes du jour, pour le serveur hortool.
     * Appeler initServerTime ou getServerQuickTime avant sinon un vieil écart est pris (ou 0)
     */
    getServerSecDay: function getServerSecDay() {
        var sec= Math.floor( horloge.getServerQuickTime() / 1000) ;
        sec= sec % (3600*24); // secondes du jour courant
        return sec;
    },
    

    /**
     * secondes avant prochaine attaque, càd minuit temps serveur,
     * pas de requête (prévoir un appel de calibration à getServerExactTime)
     */
    nextAttack: function nextAttack(){
        return 3600*24 - horloge.getServerSecDay;
    },
    

    /**
     * heure locale client en secondes,
     * depuis Unix / epoch
     */
    localTimeAbs: function localTimeAbs() {
        var date_jour=new Date();
        var tps= Math.floor(date_jour.getTime()/1000) + horloge.decallage;
        return tps;
    },
    

    /**
     * heure locale client en secondes du jour
     */
    localTime: function localTime() {
        var tps= horloge.localTimeAbs() % (3600*24); // arrondir au jour en secondes
        return tps;
    },
    

    /**
     * heure locale client en format 04h09 ou 04h09'12 si withSec
     *
     * @param withSec       Avec ou sans secondes ?
     * @param withTags      Encapsule dans <small> si true
     */
    localTimeStr: function localTimeStr(withSec, withTags) {
        var tps= horloge.localTime();
        var str="";
        var h=Math.floor(tps / 3600);
        if ( h < 10 ) {
            str= str+"0";
        }
        str= str+h+"h";
        tps=tps % 3600;
        var mn=Math.floor(tps/60);
        if ( mn < 10 ) {
            str= str+"0";
        }
        str= str+mn;
        if (withSec){
          var btag=(withTags?"<small>":"");
          var etag=(withTags?"</small>":"");
            str= str+"'"+btag;
            tps=tps % 60;
            var sec=Math.floor(tps);
            if ( sec < 10 ){
                str= str+"0";
            }
            str= str+sec+etag;
        }
        return str;
    },
    

    /**
     * heure locale client en milisecondes, depuis Unix / epoch
     */
    localTimestamp: function localTimestamp() {
        var date_jour=new Date();
        var tps= date_jour.getTime() + horloge.decallage*1000;
        return tps;
    },
    

    /**
     * ce qu'on considère comme heure serveur
     * TODO, en passe d'être obsolète,
     */
    effectiveServerTime: function effectiveServerTime() {
        if ( horloge.exact ) {
            return horloge.localTime();
        }else{
            return horloge.localTime()+horloge.ecart;
        }
    },
    

    /**
     * retourne le n° du jour depuis le début du calendrier Unix / epoch
     */
    jourNum: function jourNum() {
      var date_jour=new Date();
        return Math.floor(date_jour.getTime()/(1000*3600*24));
    },
    

    /**
     * minutes depuis le début du calendrier Unix, sert en delta
     */
    curMinutes: function curMinutes() {
      var date_jour=new Date();
      return Math.floor(date_jour.getTime()/60000);
    },
});


/****************************************************************************/
/******************************** hordes.tool.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// hortool.tool.js
// jeu d'outils spécifiques hordes

//§ Flags: Oblig
//§ Rank: 200


/**
 * Outils spécifique a hordes
 *
 * @param {String} classname    Nom de la classe en cours de création
 * @param {Object} properties   Liste des propriétés de l'objet a créer
 */
var hortool = new Tool("hortool", {
    sk: null,           // no de session avec "?sk=xxxxx" (session key)
    cityName: null,     // nom de ville
    cityDay: null,      // jour de la ville, en numérique
    extKey: null,       // clé externe
    myUID: null,        // mon propre uid
    myPseudo: null,     // mon pseudo
    ExternalSiteKeys: {},           // hash des clé externes des sites (key: n°id en texte, value: sitekey)
    
    contentId: 'contentS5',             // Node de content officiel (banniére)
    
    queuedNotifTexts: [],           // tableau des textes mis en attente de notification quand une notification est déjà là
    listenerAddedToNotif: false,    // true quand on a ajouté le listener sur le bouton de fermeture de notification
    
    // Listes des nom de forum officiel
    l_forumName: [
        "Abri 13",
        "Discussions",
        "Le Saloon",
        "Détente",
        "MiniJeux",
        "Roleplay",
        "Créations",
        "Discussions générales"
    ],

    
    /**
     * Charge le cache d'informations
     */
    loadCache: function loadCache() { // charge les info sauvées dans le cache vers le 
        var cache = hortool.db.get("cache", { sk: '' });
        
        // on n'a pas changé de session, données valides
        // (ou alors vraiment pas de chance)
        if(cache.sk == hortool.getsk()) {
            hortool.debug("Cache valide, chargement");
            
            // on complète ce qui manque avec le cache gm
            hortool.extKey =   hortool.extKey   || cache.extKey; 
            hortool.myUID =    hortool.myUID    || cache.myUID;
            hortool.myPseudo = hortool.myPseudo || cache.myPseudo;
        }
    },

    
    /**
     * Enregistre le cache
     */
    saveCache: function saveCache() {
        var cache = {
            sk:         hortool.getsk(),
            extKey:     hortool.extKey,
            myUID:      hortool.myUID,
            myPseudo:   hortool.myPseudo
        };
        
        hortool.db.set("cache", cache);
    },
    
    
    /**
     * Récupére la session key
     */
    getsk: function getsk() {
        if(hortool.sk != null)
            return hortool.sk;
        
        var statusNode = $('myStatus');
        if(statusNode != null) {
            regex = /.*js\.XmlHttp\.get\('help\?id=status&short=1;sk=(.*)',this\).*/;
            
            hortool.sk = statusNode.getAttribute('onclick').replace(regex, "$1");
        } else
            hortool.debug("Pas de sk disponible, qui m'a appelé ?");
        
        return hortool.sk;
    },


    /**
     * Crée un node image ronde d'aide avec la bulle d'aide
     *
     * @param helptext      Texte d'aide
     * @param className     Optionnel, classname de l'image
     */
    buildRoundHelpTip: function buildRoundHelpTip(helptext, className) {
        var img = document.createElement('img');
        
        img.setAttribute('src', 'http://data.hordes.fr/gfx/icons/small_help.gif');
        
        // bug MT : le z-index est redéfini à 10 dans mt.* 
        // alors qu'il était à 1000 dans le CSS. 
        // Du coup passe en dessous de <div class="black">
        img.setAttribute('onmouseover', "js.HordeTip.showHelp(this,'<p>"+helptext.replace(/'/g, '\\\'')+"</p>'); mt.js.Tip.tooltip.style.zIndex = 1000; ");
        
        img.setAttribute('onmouseout', "js.HordeTip.hide()");
        img.setAttribute('style', 'margin-left:5px');
        
        if(className) {
            img.className = className;
        }
        
        return img;
    },
    
    
    /**
     * Ajoute une bulle flotante sur un noeud DOM
     *
     * @param node      Noeud sur lequel faire l'ajout
     * @param texte     Message d'information
     */
    addSpecialTip: function addSpecialTip(node, texte, tipType) {
        tipType = tipType || 'help';
        
        // échappement des ' (on pense qu'il n'y aura pas de \ à échapper quand même.
        texte = texte.replace(/'/g, "\\'");
        
        node.setAttribute("onmouseout","js.HordeTip.hide()");
        node.setAttribute('onmouseover',"js.HordeTip.showSpecialTip(this,\'"+tipType+"Tip\',\'\', \'"+texte+"\');");
        
        return node;
    },
    
    
    /**
     * Affiche la notification donnée
     *
     * @param texte         Text de la notification
     */
    showNotif: function showNotif(texte) {
        var notifTxtNode = $('notificationText');
        if(notifTxtNode == null) {
            debug("Pas de noeud \"notificationText\" sur la page.");
            return false;
        }
        
        var notifNode = $('notification');
        
        if(notifNode.className == "showNotif") {
            // déjà affichée pour autre chose, on fait la queue...
            if (!hortool.listenerAddedToNotif) {
                // ajout du listener pour déclencher la suite
                var btn = XXXXX; /** @todo trouver le bouton */
                btn.addEventListener('click', function(evt) {
                    // 100ms d'attente entre les notifs enchaînées
                    setTimeout(hortool.nextNotif, 100);
                }, false);
                
                hortool.listenerAddedToNotif= true;
            }
            
            hortool.queuedNotifTexts[hortool.queuedNotifTexts.length] = texte;
        }else {
            notifNode.className = "showNotif";
            $('body').className = "hideSwf";
            notifTxtNode.innerHTML = texte;
            window.wrappedJSObject.js.Lib.window.scrollTo(0,150);
        }
        
        return true;
    },
    
    
    /**
     * Dit si on est dans le forum monde
     *
     * @return          True si on y est
     */
    areWeOnWorldForum: function areWeOnWorldForum() {
        var forumName = hortool.getCurrentForumName();
        
        if(forumName == "")
            return false;
        
        return arrayHas(hortool.l_forumName, forumName);
    },
    
    
    /**
     * Dit si on est dans le forum ville
     *
     * @return          True si on y est
     */
    areWeOnCityForum: function areWeOnCityForum() {
        var forumName = hortool.getCurrentForumName();
        
        if(forumName == "")
            return false;
        
        return !arrayHas(hortool.l_forumName, forumName);
    },
    
    
    /**
     * Dit si on est dans un forum
     *
     * @return          True si on y est
     */
    areWeOnForum: function areWeOnForum() {
        var forumName = hortool.getCurrentForumName();
        
        return (forumName != "");
    },
    
    
    /**
     * Donne le nom du forum sur lequel on est
     *
     * @return      Nom du forum sur lequel on est
     */
    getCurrentForumName: function getCurrentForumName() {
        // Trouve le node contenant le nom
        var nameNode = $xpath("//div[contains(@class,'tid_mainBar')]/div/span");
        if(!nameNode) {
            hortool.debug("Section nom de forum introuvable");
            return "";
        }
        
        return nameNode.innerHTML;
    },
    
    
    /**
     * Affiche un chargement
     */
    showLoading: function showLoading() {
        window.wrappedJSObject.js.Block.show(
                window.wrappedJSObject.js.Utils.getSection(
                        window.wrappedJSObject.js.Js.LOADING_SECTION
                )
        );
    },
    
    
    /**
     * Cache un chargement
     */
    hideLoading: function hideLoading() {
        window.wrappedJSObject.js.Block.hide(
                window.wrappedJSObject.js.Utils.getSection(
                        window.wrappedJSObject.js.Js.LOADING_SECTION
                )
        );
    },
    
    
    /**
     * Liste le contenu du sac
     *
     * @return      Liste des objets dans le sac
     */
    liste_sac: function liste_sac() {
        var l_objet = new Array();
        var pNode = $('myBag');
        
        // Sac non trouvé
        if(pNode == null) {
            hortool.debug("Sac introuvable");
            return l_objet;
        }
        
        // Contenu du sac non trouvé
        var nodes = $xpath("li/img", pNode, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
        if(nodes == null) {
            hortool.debug("Contenu du sac introuvable");
            return l_objet;
        }
        
        // liste les objets (sans les objets de métiers)
        var obj, overtip, nom;
        for(var i=1; i<nodes.snapshotLength; i++) {
            obj = nodes.snapshotItem(i);
            overtip = obj.getAttribute("onmouseover");
            
            nom = overtip.match(/js.HordeTip.showTip\(this,'(.*?)<img/);
            if(nom == null)
                break;
            
            nom = htmltool.trimSpace(nom[1]);
            nom = nom.replace(/\\'/, "'");
            
            l_objet[l_objet.length] = { nom: nom };
        }
        
        return l_objet;
    },
    
    
    /**
     * Liste les objets du coffre de la maison
     *
     * @param pObjets       Ajoute les objets en paramétre a la liste
     */
    liste_coffre: function liste_coffre(pObjets) {
        var l_objet = pObjets || new Array();
        
        // Coffre non trouvé
        var pNode = $xpath("//ul[contains(@class,'homeInv')]");
        if(!pNode) {
            hortool.debug("Coffre introuvable");
            return l_objet;
        }
        
        // Contenu du coffre non trouvé
        var nodes = $xpath("li/a", pNode, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
        if(nodes == null) {
            hortool.debug("Coffre vide");
            return l_objet; // vide car coffre vide
        }
        
        // Récupére les objets un a un
        var obj,overtip,nom;
        for(var i=0; i<nodes.snapshotLength; i++) { 
            obj = nodes.snapshotItem(i);
            overtip = obj.getAttribute("onmouseover");
            
            nom = overtip.match(/js.HordeTip.showTip\(this,'(.*?)<img/);
            if(nom == null)
                break;
            
            nom = htmltool.trimSpace(nom[1]);
            nom = nom.replace(/\\'/, "'");
            
            l_objet[l_objet.length]= { nom: nom };
        }
        
        return l_objet;
    },
    
    
    /**
     * Donne les états actifs du joueur
     *
     * @return      Liste de string des états appliqués sur le joueur
     */
    get_etats: function get_etats() {
        var l_etat = new Array();
        
        var nodeStatus = $('userStatus') || $('myStatus');
        var elements = $xpath("li/img", nodeStatus, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);

        if(elements != null) {
            for(var i=0; i<elements.snapshotLength; i++) {
                var child = elements.snapshotItem(i);
                var over = child.getAttribute("onmouseover");
                
                var text = over.substring(
                        over.indexOf("this,'",0) + "this,'".length,
                        over.indexOf("', '",0)
                );
                
                l_etat[i] = text;
            }   
        }
        
        hortool.debug(l_etat.join(", "));
        
        return l_etat;
    },
    
    
    /**
     * Dit si le joueur est clair
     *
     * @return      True s'il l'est
     */
    isClair: function isClair() {
        return (hortool.get_etats().toString().indexOf("Clair(e)") === -1);
    },
    
    
    /**
     * Dit si le joueur a asoiffé
     *
     * @return      True s'il l'est
     */
    isSoif: function isSoif(){
        return (hortool.get_etats().toString().indexOf("Soif") === -1);
    },
    
    
    /**
     * Dit si le joueur a déséché
     *
     * @return      True s'il l'est
     */
    isEau: function isEau(){
        return (hortool.get_etats().toString().indexOf("Eau") === -1);
    },
    
    
    /**
     * Dit si le joueur a affamé
     *
     * @return      True s'il l'est
     */
    isNourriture: function isNourriture(){
        return (hortool.get_etats().toString().indexOf("Nourriture") === -1);
    },
    
    
    /**
     * Dit si le joueur est drogué
     *
     * @return      True s'il l'est
     */
    isDrogue: function isDrogue(){
        return (hortool.get_etats().toString().indexOf("Drogu") === -1);
    },
    
    
    /**
     * Dit si le joueur est infecté
     *
     * @return      True s'il l'est
     */
    isInfecte: function isInfecte(){
        return (hortool.get_etats().toString().indexOf("Infect") === -1);
    },
    
    
    /**
     * Dit si le joueur est terrorisé
     *
     * @return      True s'il l'est
     */
    isTerror: function isTerror(){
        return (hortool.get_etats().toString().indexOf("Terreur") === -1);
    },
    
    
    /**
     * Donne le numéro de discussion de la page courante
     *
     * @return          0 en cas d'erreur, id de la discussion sinon
     */
    getCurrentDiscuNo: function getCurrentDiscuNo() {
        // http://www.hordes.fr/tid/forum#!view/XXXXXXX|thread/YYYYYYY(?...)
        regex = /.*\|thread\/([0-9]*).*/;
        var discussionNumero = window.location.href.replace(regex, "$1");
        
        return parseInt(discussionNumero);
    },
});


/****************************************************************************/
/******************************** hordesplus.tool.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// hordesplus.tool.js
// jeu d'outils spécifiques hordes
// non public (en théorie)

//§ Rank: 201
//§ Zone: Bonus

/**
 * Retourne le html de l'url *hordienne*
 *
 * @param url       URL voulue
 * @param exact     True si il ne faut pas changer l'url en rien (flux xml)
 */
hortool.httpGet = function httpGet(url,exact) {
    if(!exact) {
        var morepar = url.indexOf('?') == -1 ? '?' : ';';
        
        if(url.indexOf('sk=') == -1)
            url += morepar + "sk=" + hortool.getsk();
        
        var rnd = Math.round(Math.random()*10000000);
        
        // forcément déjà un paramètre donc pas de test pour '?' ou ';'
        url += ";rand=" + rnd;
    }
    
    var req = new XMLHttpRequest();
    
    req.open("get", "/"+url, false);
    req.setRequestHeader("X-Handler","js.XmlHttp");// nécessaire
    req.send(null);
    
    return req.responseText;
};


/**
 * retourne le uid du perso courant, 
 * c'est un nombre retourné sous forme de texte !
 * (pour faire clé de hash)
 */
hortool.getMyUID = function getMyUID() {
    if(hortool.myUID == null)
        hortool.loadCache();
    
    if(hortool.myUID != null) {
        hortool.debug("uid trouvé en cache: {0}".format(hortool.myUID), 2);
        return hortool.myUID;
    }

     // historique des parties avec commentaire perso à saisir
    var html = hortool.httpGet('ghost/ingame');
    
    // title="Couleur d'âme de pseudo" ...
    // a onclick="js.XmlHttp.get('ghost/user?uid=xxxxxxx;sk=99ca2',this)
    try{
        var motif = "Couleur d'âme de ";
        var pos = html.indexOf(motif);
        var html2 = html.substr(pos+motif.length);
        var pseudo = html2.match(/^(.+?)"/)[1];
        
        motif = "ghost/user?uid=";
        pos = html2.indexOf(motif);
        
        var html3 = html2.substr(pos+motif.length);
        var uid = html3.match(/^\d*/)[0];
    } catch(ex) {
        hortool.debugException("Echec de traitement pour uid et pseudo...");
        
        uid="";
        pseudo="";
    }
    
    hortool.myUID = uid;
    hortool.myPseudo = pseudo;
    
    hortool.saveCache();
    
    return uid;
};


/**
 * Retourne le pseudo du joueur
 */
hortool.getMyPseudo = function getMyPseudo() {
    if(!hortool.myPseudo)
        hortool.getMyUID();
    
    return hortool.myPseudo;
};


/****************************************************************************/
/******************************** ircom.tool.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// ircom.tool.js


/****************************************************************************/
/******************************** html.tool.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// html.tool.js
// Outils permettant de modifier la page

//§ Flags: Oblig
//§ Rank: 130


/**
 * Modifie le css, le html, ...
 * Manipule la page
 *
 * @param {String} classname    Nom de la classe en cours de création
 * @param {Object} properties   Liste des propriétés de l'objet a créer
 */
var htmltool = new Tool("htmltool", {
    styleSheet: null,
    
    
    /**
     * Ajoute une régle css sur la page
     *
     * @param rule      Regles que l'on veut ajouter
     */
    addStyle: function addStyle(rule) {
        if(htmltool.styleSheet == null) {
            var style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            document.getElementsByTagName('head')[0].appendChild(style);
            htmltool.styleSheet = style.sheet;
        }

        try {
            var num = htmltool.styleSheet.insertRule(rule, htmltool.styleSheet.cssRules.length);
            
            // retourne la règle insérée
            return htmltool.styleSheet.cssRules[num];
        }
        catch(e) {
            htmltool.debugException("Exception levée par insertRule", e);
            return -1;
        }
    },
    
    
    /**
     * Permet d'ajouter un fichier css dans la page
     *
     * @param l_rule        Regles que l'on veut ajouter
     *                      Format en entrée: données du fichier css, ensemble de règles,
     *                      ou format comme dans stylish.
      
     */
    addManyStyles: function addManyStyles(l_rule) {
        if(!l_rule) {
            htmltool.debug("l_rule est nul");
            return;
        }
        
        // remplace les fins de lignes ou toute suite caractère d'espacement par un espace. 
        l_rule = l_rule.replace(/\s+/g, " ");
        
        // enlève les commentaires /* */
        expcom = new RegExp("/\\*.*?\\*/", "g");
        l_rule = l_rule.replace(expcom, "");
        l_rule = l_rule.replace(/ +}/g, '}');
        
        // format stylish: extraire...
        if(/}}/.test(l_rule))
            l_rule = l_rule.substring(l_rule.indexOf('{')+1, l_rule.lastIndexOf('}'));
            
        var allrules = l_rule.split('}'); // du coup on perd le '}', faudra le rajouter

        // on s'arrête à l'avant-dernier élément car le dernier '}' n'annonce pas une autre règle.
        for(var i=0; i<allrules.length-1; i++)
            htmltool.addStyle(allrules[i]+'}');
    },
    
    
    /**
     * Supprime une règle CSS précédemment ajoutée
     * Soit par son index (numérique) [Risqué ! Décale tous les index !!]
     * Soit par valeur (la règle elle même)
     * Soit par le nom du sélecteur (string) (la 1ere rencontrée)
     *
     * @param rule      Regle que l'on souhaite retirer
     */
    removeStyle: function removeStyle(rule) {
        if(htmltool.styleSheet == null)
            return false;
        
        var index = -1;
        
        if(typeof rule != 'number') {
            // commence par la fin, plus de chance de la trouver (car addStyle ajoute en fin)
            for(var i=htmltool.styleSheet.cssRules.length-1; i>=0; i--) {
                if( htmltool.styleSheet.cssRules[i] == rule ||
                    htmltool.styleSheet.cssRules[i].selectorText === rule)
                {
                    index = i;
                    break;
                }
            }
        }
        else
            index = rule;
        
        // pas trouvée
        if(index < 0)
            return false;
        
        htmltool.styleSheet.deleteRule(index);
        
        return true;
    },
    
    
    /**
     * Pour que les div flottants soient séparé verticalement
     * s'appuie sur le css hordes
     */
    divClear: function divClear() {
        var div = document.createElement('div');
        
        div.className = "clear";
        
        return div;
    },
    
    
    /**
     * Retire les tags html de façon simpliste mais suffisante pour les messages forum
     *
     * @param html      Chaine dont on souhaite virer les tags
     */
    stripTags: function stripTags(html) {
        var texte;
        
        texte = htmltool.replace(/<br>/g,"\n");
        texte = texte.replace(/<(.*?)>/g,'');
        
        return texte;
    },
    
    
    /**
     * Crée un node contenant l'image donnée
     * 
     * @param href     L'url source de l'image
     *
     * @return          Node <img> affichant l'image donnée
     */
    buildImgNode: function buildImgNode(href) {
        var img = document.createElement('img');

        img.setAttribute('alt', "");
        img.setAttribute('src', href);

        return img;
    },
    
    
    /**
     * Parse le contenu du fichier *.dat donné
     *
     * @param textes        Contenu du fichier *.dat
     */
    ReadTextes2HTML: function ReadTextes2HTML(textes) {
        var resu = {};
        
        // chaque section est séparée par §xxx où § est le repère et xxx le nom de section
        var txtarray = textes.split('§');
        
        // ce qu'il y a éventuellement avant le premier § est ignoré.
        txtarray.shift();
        
        var lignes, nom;
        for(var i=0; i<txtarray.length; i++) {
            lignes = txtarray[i].split("\n");
            
            nom = trimSpace(lignes[0].split("/")[0]);
            
            lignes.shift(); 
            
            /** @todo échappement des caractères problématiques (<, >, ...) */
            resu[nom] = lignes.join('<br>');
        }
        
        return resu;
    }
});


/****************************************************************************/
/******************************** modman.module.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// Ceci est un module pour un script Greasemonkey particulier.
// Gestionnaire de Modules 

//§ Flags: Oblig
//§ Rank: 510
//§ Zone: Base
//§ Require: modmancss

// $Id: modman.module.js 959 2011-03-28 21:06:04Z bluflonalgul $

// Gestionnaire de Modules, Copyright (C) Version intiale Bluflonalgul 2009-03 / 2009-04 et mise en Module de la Nouvelle Architecture par Hypher le 26/07/2009
// La qualité du code diffusé est pour les auteurs une préocupation constante, c'est pourquoi en utilisant et/ou en diffusant ce Gestionnaire de Module vous autorisez ses auteurs à accéder à votre code de module à des fins de contrôle qualité, vous vous engagez à conserver cette clause dans tous les travaux dérivés du Gestionnaire de module et à proposer votre code de module sous la licence GPL et ce quelles que soient les dispositions prises par ailleurs à son sujet. La licence GPL s'applique à ce Gestionnaire de Module tant que son interprétation n'entrave pas ces dispositions d'assurance qualité. 
// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html
  

// Dépendances:
// - fonctions raccourcis de misc.part.js
// - ressource modmancss
// - dispatcher aussi à cause du clic sur Modules

// v4
// TODO des $DGMTip sur tous les items
///////////////////////////////////////////////
// Gestionnaire de modules
const DGM_ModMan_boxID = "modules";
const DGM_ModManHelp_boxID = "moduleshelp";

ModMan = new Module('ModMan', {
	
	// pour ModMan
	label: "Module Manager",
	options: {
		hide: false,    // TODO pour la version de ditribution, passer a true
		icon: "http://data.hordes.fr/gfx/icons/item_electro.gif?v=4", // choix d'icone
		htmldesc: "Crée la liste des modules dans une boîte et gère leur activation/désactivation. (c'est le marteau)",
		credits: "Gestionnaire de modules: Bluflonalgul.",
	},
	params: {
        show_cores: {type:'bool', desc:"Afficher les composants noyau", default:false},
        show_hidden:{type:'bool', desc:"Afficher les modules cachés"  , default:false}
    },
    box: null, // la div du marteau
    mainImgNode: null, // node img de l'image marteau
    divInfoNode: null, // node de l'info du fond hors onglets
    helpbox: null, // la div d'aide
    modlinks: {}, // liste des liens affichés dans la box {modclassname: HTMLAElement}
    modcredits: [], // liste des nodes de crédit pour cacher/afficher
    knownModules: [], // modules déjà connus par l'utilisateur (renseigné à l'appel de loadKnow dans install)

	// Ces deux propriétés ne sont pas des limites mais des infos mise à jour au remplissage
	maxModsInUL:  1, // nb de lignes maxi dans toutes les colonnes de tous les groupes
	maxColsInDiv: 2, // nb de colonnes maxi dans tous les groupes
	// Limitation: constante
	MODMAXINCOL: 9, // nb de modules maxi une colonne

	new_modules_shown: false, // un message "Nouveaux modules sur cette page" existe déjà ?
	new_modules_p_id: 'new_modules_p_id', // ID de l'élément DOM a remplir avec la descro des nouveaux modules sur la page (et sous-sections)
	
	// TODO : vérifier si les utilisateurs de ce cache (pariaforum) ne peuvent pas utiliser Dispatcher.isModDisabled, qui ne fait pas d'appel GM
	modEnabledCache: {}, // Copie des valeurs GM (module activé ou non), pour les appels venant d'éléments de page. Pas strictement à jour. clé: code module, valeur: vrai/faux // pour pariaforum
	
	modmanicon: "http://www.hordes.fr/gfx/forum/smiley/h_refine.gif", // icone marteau
	defmodicon: "http://data.hordes.fr/gfx/icons/item_electro.gif?v=4", // icone composant électronique ; PLUS UTILISE voir DEFAULT_MOD_ICON
	
	GM_KEY_BLINKHELP: "modman_blinkhelp", // on fait clignotter l'aide ?
	GM_KEY_KNOWNMODS: "modman_knownmods", // quels modules sont connus par l'utilisateur ?
	DEFAULT_MOD_ICON: "http://data.hordes.fr/gfx/icons/item_taser_empty.gif",
	
	componentsByGroup: null, // initialisé lors du build { 'En Jeu': [ composant1, ... ], Forum: [ composant1, ... ], Autre: [ composant1, ... ] }
    css: "",

	initialize: function initialize() {
		Dispatcher.registerCallback(ModMan, 'All', ModMan.install);
        
        ModMan.css = GM_getResourceText("modmancss");
	},
	
	install: function install() {
		if ( $(DGM_ModMan_boxID) != null ) // déjà installé ?
		{
            ModMan.SyncClass(); // mets juste à jour les classes
            // Et pis aussi affiche les nouveaux modules :
            ModMan.loadKnown();
            ModMan.showNew(Dispatcher.getModsRegisteredOnCurrentPage());
            ModMan.checkQualityTimeAndProcess();      
            return false;
		}
			
		var mainNode= $('gamebody');
		if ( mainNode == null )
			return false; // pas installable. Signaler ?

		if (ModMan.box == null ) 
			ModMan.build(); // on construit l'élément html en mémoire si pas déjà fait.
		
        // CSS: voir les formules plus bas
        htmltool.addManyStyles( ModMan.css);
        htmltool.addStyle(ModMan.adjustedCSS(ModMan.maxColsInDiv,ModMan.maxModsInUL)); // fn à la fin du fichier pour tailler le div d'info

        ModMan.loadKnown();
        ModMan.showNew(Dispatcher.getModsRegisteredOnCurrentPage());
        ModMan.initQTestMod();
        
        mainNode.appendChild(ModMan.box);
    },


	getComponentsByGroup: function getComponentsByGroup() { // accesseur
		return ModMan.componentsByGroup;
	},

	// *****************************************
	// **      Construit Le Marteau ;)        **
	// *****************************************
	build: function build() {
		//TODO prendre en charge ModMan.show_all = true; (en option?) Euh: déjà en paramètre non ?
		ModMan.box=  document.createElement('div');
		ModMan.box.id = DGM_ModMan_boxID;
		/************* construction de l'entête qui a maintenant les listes **********/
		var entete=  document.createElement('div');
		entete.id= "mmbar";
		entete.className="modmantitre";
		ModMan.box.appendChild(entete);
		/*--------- titre avec icone marteau et "Modules" ----------*/
		entete.appendChild(ModMan.buildBarTitle());
		/*--------- Ajout des groupes ----------*/
		// 1) listes des modules par groupes dans allGroups :
		var allGroups= {
			"En Jeu": new Array(),
			"Forum":  new Array(),
			"Autre":  new Array()
			}; // Dev ou d'autres catégories sont ajoutés à la volée à la suite. Espérons que l'ordre demeure

		// 2) tous les composants concernés, visibles ou pas
		var components;
		if(ModMan.params.show_cores.value) {
			components = Dispatcher.getAllComponents();
		}else{
			components = Dispatcher.getAllMods();
		}
		// 3) classement des composants par groupe en ne gardant que les visibles
		var com, defaultGroup, comGroup;
		for ( var mod in components ) {
			com= components[mod];
            if(typeof com.options == "undefined")
                continue;
            if (com.componentType == "Tool")
                continue;
            if ( (com.componentType == "Core") || (com.options && com.options.hide) )
                // il est noyau ou normalement invisible
                defaultGroup= "Dev";
            else
                defaultGroup= "Autre"; // pas de s à Autre: c'est Autre motif/type, pas autres modules
            comGroup= (com.options && com.options.group)?com.options.group:defaultGroup; // op ternaire
            if ( !(com.options && com.options.hide && !ModMan.params.show_hidden.value) ){ // core déjà géré au niveau components
                if ( ! allGroups[comGroup] )
                    allGroups[comGroup]= new Array();
                allGroups[comGroup].push(com);
            }
        }
        ModMan.componentsByGroup= allGroups; // sauvé en cache objet pour AideDGM
        // 4) insertion de chaque groupe 
        var grp;
        for ( comGroup in allGroups ) {
            grp= ModMan.buildGroupItem( comGroup, allGroups[comGroup] );
            entete.appendChild(grp.itemNode);
            ModMan.maxModsInUL=  Math.max( ModMan.maxModsInUL, grp.maxincol );
            ModMan.maxColsInDiv= Math.max( ModMan.maxColsInDiv, grp.nbcol );
        }
        /*------------- bouton d'aide ---------------*/
        entete.appendChild(ModMan.buildHelpBtn());  
        /************* fin de construction de l'entête  **********/

        var fill=  document.createElement('div'); // pour avoir au moins un div normal en en-tête
        fill.className= "mmfill";
        fill.innerHTML="&nbsp;";
        entete.appendChild(fill);

        entete.appendChild(htmltool.divClear()); // un clear pour l'alignement quand ça déborde

        /************ corps de fond du ModMan **********/
        ModMan.divInfoNode= ModMan.buildDivInfo(); // sera utilisé pour des substitutions dans setDivInfo
        ModMan.box.appendChild(ModMan.divInfoNode);

        ModMan.SyncClass(); // initialisation des classes suivant module actif ou non
    },

    // pour avoir une closure à chaque appel dans la boucle buildOnePage, sinon pas bon (subtil)
    closureToggleEvent: function closureToggleEvent(pnode, mcn) { 
        pnode.addEventListener('click', function(evt) { // attention à la closure ici !!
            evt.preventDefault(); // car ce sont des liens a
            Dispatcher.toggleModule(mcn); // c'est là que sert la closure
            ModMan.SyncClass();
        }, false);
    },

    // construction du titre principal de la barre de ModMan
    buildBarTitle: function buildBarTitle() {
        var barNode=  document.createElement('div');
        barNode.className= "bartitle";

        var modicon= document.createElement('img');
        ModMan.mainImgNode= modicon; // pour changer par les fonctions setMainImg et resetMainImg
        modicon.setAttribute('alt','');
        modicon.setAttribute('src',ModMan.modmanicon);
        barNode.appendChild(modicon);
        var hspan= document.createElement('span');
        hspan.innerHTML="<b>M</b>odules";
        barNode.appendChild(hspan);
        // à voir si utile, pas sûr, pb rendu sous windows, ...
        var fill=  document.createElement('div');
        fill.className= "mmcontent";
        fill.innerHTML="&nbsp;";
        barNode.appendChild(fill);

        barNode.addEventListener('click', function(evt) {
                Dispatcher.activateModsOnPage();
        }, false);

        return barNode;
    },

    // construction du lien pour demander l'aide (petite image d'aide)
    buildHelpBtn: function buildHelpBtn() {
        var divhelp=  document.createElement('div');
        divhelp.className="modhelp";
        // opérateur ternaire, fixe le blink suivant un param GM, que ça ne clignote pas tout le temps  (cliquer l'aide une fois)
        divhelp.innerHTML= (ModMan.db.get(ModMan.GM_KEY_BLINKHELP, true) ? "<span style=\"text-decoration:blink; color:white;\">'</span>" : "");
        divhelp.innerHTML+="<img alt=\"Aide et Informations\" src=\"http://data.hordes.fr/gfx/loc/fr/helpLink.gif\"/>"; 
        divhelp.addEventListener('click', function(evt) {
                evt.stopPropagation();// pas de bouillonnement sinon déclencherait l'event pour h1
                ModMan.showHelp();
            }, false); 

        return divhelp;
    },

	// construction d'un groupe de modules avec son onglet et sa page de modules 
	buildGroupItem: function buildGroupItem(groupName, components) {// nom du tab et liste des modules (ou core)
		var itemNode= document.createElement("div");
		itemNode.className= "mmitem";

		var titleNode= document.createElement("div");
		titleNode.className= "modmantitre mmtitle";
		titleNode.innerHTML= groupName;
		itemNode.appendChild(titleNode);

		var resu= ModMan.buildOnePage(components);
		itemNode.appendChild(resu.content);
		resu.itemNode= itemNode;

		return resu; // seront utilisé les éléments: itemNode, nbcol, maxincol
	},

	// construction d'une page de menu modman avec liste des modules
	buildOnePage: function buildOnePage(components) { // liste des modules (ou core)
		var content= document.createElement("div");
		content.className= "mmcontent";

		var visibleModCount = components.length;
		//for(var dumb in components) visibleModCount++; // c'est maintenant un tableau normal
		
		var nbcol= Math.ceil( visibleModCount / ModMan.MODMAXINCOL ); // un maximum de 9 par colonne // CONSTANTE DE REGLAGE ICI
		nbcol= Math.max(2, nbcol); // un minimum de 2 colonnes, pour la mise en page
		var maxincol= Math.ceil( visibleModCount / nbcol ); // nb de modules maxi par colonne
		ModMan.debug("A trouvé "+visibleModCount+" modules visibles, donc nbcol="+nbcol+" maxincol="+maxincol, 2);

		var listck= document.createElement('ul');
		content.appendChild(listck);
		// Pour chaque module non caché on ajoute un élément à bascule
		var displayedSoFar=0; // combien d'affichés jusqu'à maintenant dans la colonne courante
		
		/*for(var modclassname in components) {
			var modref = components[modclassname];*/ // tableau classique à présent
		for(var i=0; i<components.length; i++) {
			var modref = components[i];
			var modclassname= modref.classname;

            // valeurs par défaut
            var opt=modref.options; // ici c'est une référence 
            if (opt == undefined) opt = modref.options = {}; // ... et comme ça oui
            if (opt.hide == undefined) opt.hide=false; // par défaut non caché
            if (opt.icon == undefined) if(!(opt.icon=modref.icon)) opt.icon=ModMan.DEFAULT_MOD_ICON; // confusion parfois : icon est dans options ou pas ? gère les deux... TODO V3 tirer ça au clair
            if (modref.icon) ModMan.debug("A VOIR: "+modclassname+" a une propriété icon au lieu d'être en option",2); // DEBUG TODO vérifier et virer
            if (opt.htmldesc == undefined) opt.htmldesc="(sans description)"; 
            if (opt.credits ==  undefined) opt.credits="";
            if (opt.group ==  undefined) opt.group="Autre"; // V3 groupe par défaut
            
            if (displayedSoFar==maxincol) {// nouvelle colonne
                listck= document.createElement('ul'); // variable déclarée avant et initialisée avec la colonnne 1
                content.appendChild(listck);
                displayedSoFar=0;
            }
            displayedSoFar++; // un de plus affiché
            var litem= document.createElement('li');
            listck.appendChild(litem);
            litem.appendChild(ModMan.buildModItem(modref));

        }

        return { content: content, nbcol: nbcol, maxincol: maxincol };
    },

    // construction d'un élément de liste de module (ou core)
    buildModItem: function buildModItem(modref) {
        // TODO prise en charge des paramètres de module (option manager) et debug (tournevis), et core (css, etc)

        var lien= document.createElement('div'); // note: sa class est fixée par SyncClass (sauf pour les Core)
        var modclassname= modref.classname;
        ModMan.modlinks[modclassname]= lien; // hashage
        lien.href="#";
        lien.innerHTML= "<img alt=\"\" src=\""+(modref.options.icon || ModMan.DEFAULT_MOD_ICON)+"\"/><span>"+(modref.label || modclassname)+"</span>";
        
        if(modref.componentType == "Module" && modclassname != 'ModMan') // seulement si c'est un module
            ModMan.closureToggleEvent(lien, modclassname); // merci la closure !
        else
            lien.className = 'core';

        return lien;
    },

    //construction du bloc d'info en fond de div module
    buildDivInfo: function buildDivInfo() {
        var infoNode= document.createElement('div');
        infoNode.className= "mmback";
        var description=  document.createElement('p');
        description.innerHTML= "Ces modules sont insérés sur les pages du navigateur et peuvent être en partie désactivés.<br><i>Méfiez vous des scripts greasemonkey.</i>";
        infoNode.appendChild(description);
        // En attente de plus de dev. TODO: lien doc externe dès qu'elle est ok, plus des infos...
        var infoplus=  document.createElement('p');
        // infoplus.innerHTML= "(BETA:) Il y a X modules d'activés sur les N installés.<br/> Z n'ont pas été installés.";
        infoplus.innerHTML= "Nouvelle version du Dangeureux Greffon Massacreur :<br/>Avec une meilleure gestion des mises à jour.";
        infoNode.appendChild(infoplus);


        return infoNode; // à l'avenir: peut-être un return de {} pour le node et les éléments à mettre à jour
    },

    setMainImg: function setMainImg(imgsrc) { // change le marteau en...
        ModMan.mainImgNode.setAttribute('src',imgsrc);
    },

    resetMainImg: function resetMainImg(){ // remet le marteau normal
        ModMan.mainImgNode.setAttribute('src',ModMan.modmanicon);
    },

    setMainBkg: function setMainBkg(color) { // change la couleur de fond du marteau (#446DFF)
        ModMan.mainImgNode.setAttribute("style","background-color: "+color+";");
    },

    resetMainBkg: function resetMainBkg() { // remet la couleur de fond normale du marteau
        ModMan.mainImgNode.removeAttribute("style");
    },

    setDivInfo: function setDivInfo(node) { // change le contenu d'info principal (hors onglet) de modman
        ModMan.divInfoNode.parentNode.replaceChild(node,ModMan.divInfoNode);
        ModMan.divInfoNode= node;
    },

    resetDivInfo: function resetDivInfo() { // remet le contenu principal (hors onglet) de modman
        ModMan.setDivInfo( ModMan.buildDivInfo() );
    },


	// *****************************************
	// **      Construit la page d'aide       **
	// *****************************************
	buildHelp: function buildHelp() { // à appeler lors du 1er clic d'aide.
		ModMan.helpbox=  document.createElement('div');
		ModMan.helpbox.id = DGM_ModManHelp_boxID;
		// div de fond bloquant noir ajouté en début de boîte
		var black=  document.createElement('div');
		black.setAttribute('class','black');
		ModMan.helpbox.appendChild(black);
		// div principal de boîte
		var box=  document.createElement('div');
		box.setAttribute('class','helpboxcontent');

		var entete=  document.createElement('div');
		entete.className= "modmantitre";
		entete.innerHTML= '<img alt="" class="modheader" src="http://data.hordes.fr/gfx/icons/small_help.gif"/><span>Aide des Modules</span>';
		box.appendChild(entete);

		var brRefs="";
		var installref="";
		var URL= ModMan.getInstallURL();
		//ModMan.debug("URL="+URL,2);
		if ( URL && URL != "" ) { 
			installref="<a href='"+URL+"'>[ Réinstallation / mise à jour ]</a>";
			brRefs="<br>";
		}
		var extdocref="";
		if ( typeof(DGM_EXTDOC_URL) == 'string' ) { // constante du script maître
			extdocref=" &nbsp; <a href='"+DGM_EXTDOC_URL+"'>[ Documentation externe ]</a>";
			brRefs="<br>";
		}
		var description=  document.createElement('p');
		description.innerHTML=
			"Ces modules sont insérés sur les pages du navigateur et peuvent être en partie désactivés. <br>"+
			"Ils modifient votre perception du site officiel.<br>"+
			"Ils ne sont pas fournis par le site officiel, inutile de vous plaindre chez eux par rapport aux modules, ça n'a rien à voir: c'est vous dans votre navigateur qui réalisez les changements. <br>"+
			installref + extdocref + brRefs +
			"<br><i>Méfiez vous des scripts greasemonkey. Ils peuvent provoquer diverses erreurs ou anomalies. Ils peuvent compromettre la sécurité de votre navigation web. Ils peuvent transmettre des informations à des sites tiers.<br>Ils peuvent vous trahir.</i>";
		box.appendChild(description);

		var btn = document.createElement('a');
		btn.setAttribute('class', 'button');
		btn.setAttribute('href',  '#');
		btn.innerHTML = "<img alt=\"\" src=\"gfx/forum/smiley/h_arrow.gif\"/> <span>J'ai bien tout lu et compris, merci.</span>";
		btn.addEventListener('click', function(evt) {
				evt.preventDefault();
				ModMan.hideHelp();
			}, false);
		box.appendChild(btn);

		var cleardiv= document.createElement('div');
		cleardiv.className='clear'
		box.appendChild(cleardiv); /* sinon le moddoc à gauche du bouton */

		var moddoc=   document.createElement('div');
		moddoc.setAttribute('class','moddoc');
		var titre,desc,credits;

		credits=  document.createElement('div');
		ModMan.modcredits[0]= credits; // doit être le premier, il est différencié par le setCreditsDisplay
		credits.className= "creditsShow"; // "creditHide" sinon
		credits.innerHTML= "<span style=\"text-decoration:underline; cursor: pointer;\">Afficher les crédits</span>"; // style en ligne pour une fois... (exception)
		moddoc.appendChild(credits);
		credits.addEventListener('click', function(evt) {
				ModMan.setCreditsDisplay(true);
			}, false);

		credits=  document.createElement('div');
		ModMan.modcredits.push(credits);
		credits.className= "creditsHide"; // "creditShow" sinon
		credits.innerHTML= ModMan.options.credits; // crédit du ModMan lui-même
		moddoc.appendChild(credits);

		// Pour chaque module affiché :
		
	//	for ( var mcn in Dispatcher./*ModMan.modlinks*/) {
		for ( var mcn in $grep(Dispatcher.getAllComponents(), function(mod){ return (mod.options?!mod.options.hide:true); }) ) { // On mets les crédits des composants en mode debug :)
	//		var modref = Dispatcher.getModByClassname(mcn);
			var modref = Dispatcher.getComponentByClassname(mcn); // On mets les crédits des composants en mode debug :)
			if ( modref.options.hide )
				continue;
			// Entrée de doc module:
			titre= document.createElement('div');
			titre.className="modmantitre modheader";
			titre.innerHTML= '<img alt="" class="modheader" src="'+(modref.options.icon || ModMan.DEFAULT_MOD_ICON)+'"/><span>'+(modref.label || modref.classname)+'</span>';
			moddoc.appendChild(titre);
			desc= document.createElement('p');
			desc.innerHTML= modref.options.htmldesc;
			credits=  document.createElement('div');
			ModMan.modcredits.push(credits);
			credits.className= "creditsHide"; // "creditShow" sinon
			credits.innerHTML= modref.options.credits; // init à "" si non défini par le module.
			desc.appendChild(credits); // j'espère que c'est ok après avoir fixé un innerHTML dans desc
			moddoc.appendChild(desc);
		}
		titre= document.createElement('div'); // un dernier vide pour espacer
		titre.className="modmantitre modheader";
		titre.innerHTML= '<span class="nomoremodules">.</span>'; // si vide: pas de marge, trouver un truc.
		moddoc.appendChild(titre);
		box.appendChild(moddoc);
		ModMan.helpbox.appendChild(box);

		/* garde comme exemple de onmouseleave !
		this.helpbox.addEventListener('mouseout', function(evt) {// attention à la closure ici !!
		if ( evt.target == ModMan.helpbox ) // truc à faire que si on quitte le div de boîte, pas un noeud fils
		// inspiré par http://www.quirksmode.org/js/events_mouse.html
		var reltg=evt.relatedTarget; // là où on rentre.
		if (!reltg)
		return; // en test car reltg est undefined
		while (reltg != evt.target && reltg.nodeName != 'BODY')
		reltg= reltg.parentNode;
		if (reltg== evt.target) // on retombe sur notre boîte, donc on l'avait pas quittée
		return; // rien à faire
		ModMan.helpbox.setAttribute('class',hideclass);
		}, false);
		*/

	},

	showHelp: function showHelp(){
		// PAS DE this ICI
		ModMan.db.set(ModMan.GM_KEY_BLINKHELP, false); // fini de clignoter
		// basculer vers l'aide intégrée si le module est présent
		try {
			if (typeof AideDGM.jumpToHelp == 'function'){
				if (  Dispatcher.isModDisabled('AideDGM') ){
					alert("Vous demandez l'aide: Activez d'abord le module Aide DGM (sinon l'ancienne aide s'affiche)");
				}else{
					AideDGM.jumpToHelp(); // recharge la page
					return 0;
				}
			}
		}catch(e){
			ModMan.debug("Echec de bascule vers l'aide intégrée, le module AideDGM est peut-être absent.");
		}
		if ( $(DGM_ModManHelp_boxID) == null ) { // pas installé ?
			var mainNode= $(hortool.contentId);
			if ( mainNode == null )
				return false; // pas installable. Signaler ?
			if (ModMan.helpbox == null ) // pas encore créé
                ModMan.buildHelp(); // on construit l'élément html en mémoire
            mainNode.insertBefore(ModMan.helpbox, mainNode.firstChild);
		}
		//ModMan.helpbox.setAttribute('class',''); // on enlève le hide //old
        /* TODO
		if ( HorTools.removeTrax )
			HorTools.removeTrax(); // truc qui recouvre l'aide, page de maintenance*/
		ModMan.helpbox.className="showNotif";
		$('body').className='hideSwf';
		ModMan.helpbox.lastChild.focus(); /* en test: pour permettre le défilement à la molette sans avoir à cliquer */
	},

	hideHelp: function hideHelp(){
		// PAS DE this ICI
		if ( ModMan.helpbox != null ){
			ModMan.helpbox.className='';
		}
		$('body').className='';
	},
	
	// voir buildHelp
	setCreditsDisplay: function setCreditsDisplay(disp) {
		// PAS DE this ICI
		ModMan.modcredits[0].className= disp?"creditsHide":"creditShow"; // le contraire, car c'est le lien d'affichage  
		for ( var i=1; i < ModMan.modcredits.length; i++)
			ModMan.modcredits[i].className= disp?"creditShow":"creditsHide";  
	},
	
	// change les classes css suivant les valeurs stockées par GM
	SyncClass: function SyncClass() {
		// PAS DE this ICI
		if ( ModMan.box == null ) {
			GM_log("ModMan.SyncClass: BUG à l'appel."); // ne devrait pas arriver, pas critique sinon
			return false;
		}
		var current_active_mods = Dispatcher.getCurrentActiveModsAfterAll();
		var active, onpage;
		for ( var mcn in ModMan.modlinks ) {
			var comref = Dispatcher.getComponentByClassname(mcn);
			if(comref.componentType == "Module" && comref.classname != "ModMan") { // seuls les modules peuvent être actifs/désactivés
				active= !Dispatcher.isModDisabled(mcn);
				onpage= (mcn in current_active_mods)?" modactive":""; // ajout de classe pour les modules installés sur la page
				ModMan.modlinks[mcn].setAttribute('class', active?'modon'+onpage:'modoff'+onpage); //hop: opérateur ternaire, vu?
				//if(mcn in current_active_mods) ModMan.modlinks[mcn].setAttribute('class', "modon modactive"); // - Hypher, mets les modules actifs en .... // Bluflonalgul: non on règle la classe :)
				ModMan.modEnabledCache[mcn]= active;
			}
		}
	},

	saveKnown: function saveKnown() {
		var liste = [];
		for ( var key in ModMan.knownModules)
			liste.push(key);
		ModMan.db.set(ModMan.GM_KEY_KNOWNMODS, liste.join(';'));
	},

	loadKnown: function loadKnown() {
		var liste= ModMan.db.get(ModMan.GM_KEY_KNOWNMODS, "").split(';');
		for ( i=0; i<liste.length; i++ ) {
			if ( liste[i] != "" ) // =="" cas du 1er je crois, si liste vide
				ModMan.knownModules[liste[i]]= null; // seule la clé compte // du coup pas de doublons...
		}
	},

	isKnown: function isKnown(modcode) { 
		//GM_log("ModMan.isKnown: modcode= "+modcode ); //DEBUG
		return ( modcode in ModMan.knownModules );
	},

  isQKnown: function isQKnown(modcode) {
    /*hmod= str2hash(modcode);   // TODO
		return HorTools.QMods[hmod];      // true ou undef*/
        return undefined;
	},
  
  postPoneQualityCheck: function postPoneQualityCheck(){
    ppdelay= 1; // minutes
    ModMan.db.set("PPQC",horloge.localTimeAbs()+ppdelay*60);  
  },
  
  checkQualityTimeAndProcess: function checkQualityTimeAndProcess(){
    //ModMan.debug("début...",-1);
    var qctime= ModMan.db.get("PPQC",0);
    if (  ModMan.UQMods && qctime>0 && qctime<horloge.localTimeAbs()) {
      if ( pagedetect.isPage('Logged') ){
        ModMan.db.set("PPQC",0);
        //ModMan.debug("qcheck pour "+uneval(ModMan.UQMods),-1);   
        for ( var cmod in ModMan.UQMods ){
          ModMan.QCheckStatus[cmod]= ModMan.UQMods[cmod].original_properties.toSource().length ;// ModMan.UQMods[cmod].toRealSource().length //Object.prototype.toSource.apply(ModMan.UQMods[cmod]).length        
          processQCheck(cmod,ModMan.UQMods[cmod]);            
        }
        ModMan.db.set("QChecked",ModMan.QCheckStatus);
      }else{
        //ModMan.debug("pas logué, on repousse le moment",-1);
        ModMan.postPoneQualityCheck();
      }
    }else{
        //ModMan.debug("pas le moment ou rien à faire ",-1);
    }    
  },
  	
	// Affiche une notification sur les nouveaux modules installé pour la page en question, paramètre: hash clé=mcode et contenu null, pour tous les modules installé sur la page courante
	showNew: function showNew(active_mods) {
		//GM_log("ModMan.showNew: début..."); //DEBUG
		var listeConnus= []; // les libéllés des modules connus sur la page
		var docNew=""; // html de présentation des nouveautés, chaîne construite plus loin
		var nbNouv=0;
		var nbConnu=0;
		
		for ( var mcn in active_mods ) {
	//		var modref = Dispatcher.getModByClassname(mcn);
			var modref = Dispatcher.getComponentByClassname(mcn);
			if ( modref.options.hide ) {
				//GM_log("ModMan.showNew: module: "+mc+" caché.");  //DEBUG
				continue; // rien à faire pour ce module
			}
			if ( ModMan.isKnown(mcn) ) {
				//GM_log("ModMan.showNew: module: "+mc+" connu.");  //DEBUG
				listeConnus.push(modref.label);
				nbConnu++;
			} else {
				//GM_log("ModMan.showNew: module: "+mc+" nouveau.");  //DEBUG
				docNew+= "<br><strong>" + (modref.label || modref.classname) + "</strong>: " + modref.options.htmldesc;
				nbNouv++;
			}
		}
		if ( nbNouv > 0 ) {
			if(ModMan.new_modules_shown) { // déjà un message similaire : le complète, c'est un peu un HACK..
				var p = $(ModMan.new_modules_p_id);
				if(!p) return ModMan.debug("Erreur : élément d'id "+ModMan.new_modules_p_id+" introuvable !");
				p.innerHTML += docNew;
				for ( var c in active_mods ) {
					ModMan.knownModules[c]= null; // Hypher se demande si ce null veut encore dire qu'on a juste besoin de la clé. Mais alors pourquoi pas true ?? :'(
				}
				ModMan.saveKnown();
			} else {			
				var texte=
					"Information du Dangereux Greffon Massacreur."+
					( (nbNouv == 1) ? "<p id=\""+ModMan.new_modules_p_id+"\">Nouveau module" : "<p>Nouveaux modules" ) + // op. ternaire
					" sur cette page: "+ // <br> inclus ensuite
					docNew+
					"</p>";
				if ( nbConnu > 0 ) {
					texte+=
					"<p>Il y aussi sur cette page "+
					( ( nbConnu == 1 ) ? "le module connu: " : "les modules connus: " )+
					listeConnus.join(', ')+
					".</p>";
				}
				var affOk= false; //HorTools.showNotif(texte); // plus lisible TODO
				if ( affOk ) {
					for ( var c in active_mods ) {
						ModMan.knownModules[c]= null; // Hypher se demande si ce null veut encore dire qu'on a juste besoin de la clé. Mais alors pourquoi pas true ?? :'(
					}
					ModMan.saveKnown();
				}
			}
		}
	},
	
	// Compatibilité avec les anciens modules, bien sur, toutes ces fonctions sont dépréciées (deprecated) et viendront à disparaître
	
	RegMod: function RegMod(modself) {
		ModMan.debug("Le module de mcode="+modself.mcode+" tente de s'enregistrer avec ModMan.RegMod. Utilisez le constructeur Module à la place !");
		Dispatcher.registerMod(modself);
	},
	
	RegPlug: function RegPlug(modself, pagecode, callbackfunc) {
		ModMan.debug("Le module de mcode="+modself.mcode+" tente de s'enregistrer avec ModMan.RegPlug. Utilisez Dispatcher.registerCallback à la place !");
		Dispatcher.registerCallback(modself, pagecode, callbackfunc);
	},

  initQTestMod: function initQTestMod(){
    if ( ModMan.QCheckStatus )
      return;
    ModMan.QCheckStatus= ModMan.db.get('QChecked',{});
    var mods= Dispatcher.getAllMods();
    var uqmods= {};
    var lcqmods= new Array; //{};
    var notEmpty= false;
    for ( var cmod in mods ){
      if ( ModMan.isQKnown(cmod) ){
        //lcqmods[str2hash(cmod)]= true;
        lcqmods.push(cmod);
      }else{
        if (ModMan.QCheckStatus[cmod] && ModMan.QCheckStatus[cmod] == mods[cmod].original_properties.toSource().length ) { // mods[cmod].toRealSource().length // Object.prototype.toSource.apply(mods[cmod]).length )
          //ModMan.debug("Le module "+cmod+" est assez q checked",-1 );
        }else{
          //ModMan.debug("Le module "+cmod+" est mal q checked",-1 );
          uqmods[cmod]= mods[cmod];
          notEmpty=true;
          ModMan.postPoneQualityCheck();
        }
        //ModMan.debug("Début du module "+cmod+", source======>\n"+ mods[cmod].original_properties.toSource().substr(0,400));
      }
    }
    //lcqmods.sort();
    //ModMan.debug("Les modules "+uneval(lcqmods)+" sont qknown",-1 );
    if ( notEmpty ) ModMan.UQMods= uqmods;
  },
  	
	// Nouvelles fonctions, à garder donc

	adjustedCSS: function adjustedCSS(nbcol, nbitem) {
		var large= nbcol * 155 + 6;
		var haut=  nbitem * 18 + 6 + 4 + 6; // le dernier 6: ajustement après observation
		var regle= "#modules:hover div.mmback {height:"+haut+"px; width:"+large+"px;}";
		ModMan.debug("adjustedCSS: "+nbcol+" col max et "+nbitem+" item max donnent: \n"+regle, 2);
		return regle;
	},

	getInstallURL: function getInstallURL() {
		var URL="";
		if ( typeof(DGM_INSTALL_URL) == 'string' ) { // constante du script maître
			URL= DGM_INSTALL_URL;
			var params="";
			if ( /lacitadellenoire/.test(URL) ){// login auto sur LCN si distribué par LCN
				if ( /index.php/.test(URL) ) { // retirer le index.php qui reste sur d'anciennes versions
					URL= URL.substring(0,URL.indexOf("index.php"));
				}
                // TODO
				/*var key= HorTools.getExternalSiteKey(14);
				if ( key != "" ) {
					params=((/\/$/.test(URL))?"":"/")+key+"/"; // ajout de la clé, avec "/" avant si nécessaire (au cas où)
					URL+= params;
				}*/
			}
		}
		return URL;
	},



});

/*
Formules CSS pour la taille
#modules:hover div.mmback {
height:
width:
}
largeur colonne <ul> = 150px   ( passée à 155 en test )
largeur page= N*col + 4 + 2 // 4 de padding droit de compensation et 2xbordure (min 2 col)
[ page 2 col= 306 et largeur div mmback: 306 ok pour 2 col ]

hauteur item = 18px
hauteur colonne = N*item + 8 // 8 de marge en bas
hauteur page = col + 6 // marge 5 top et 1 bottom
[ page 6 items = 122 et hauteur div mmback: 126 ok pour 6 items, soit page + 4 ]

*/



/****************************************************************************/
/******************************** morphorum.module.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// Module pour un script Greasemonkey particulier.
// Morphorum: Module de soutien pour d'autres modules  créés par un un script Greasemonkey particulier.

//§ Rank: 520
//§ Zone: Base

// $Id: Morphorum.module.js 635 2010-07-05 21:44:27Z bluflonalgul $

// Auteur: Bluflonalgul

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

// Note: pas de $DGMTip à mettre

/////////////////////////////////////////////////////////////////////////////
// Module de soutien pour d'autres modules :
// Marquage, Sujet Epinglés, LienVille, Demorphorum, Sombre Plagiat
// ( à valider: Paria de Forum, Sobriquet, ATropCiter, imMedia(jolifofo), )
// ( en cours: Ecrivain Public,  )
// et bientôt Reliure(bkfofo2_light) ...

Morphorum = new Module('Morphorum', {
    nodeId: "MorphorumId", // identifiant DOM pour le bidule à insérer, penser à en mettre un unique
    label:  "Morphorum", // libellé du module pour la liste
    options: {
        hide: true, // caché car obligatoire et sans effet direct (module de soutien)
        icon: "http://data.hordes.fr/gfx/icons/item_electro.gif?v=4", 
        htmldesc: "Morphing de Forum: Parcours d'une page de forum pour la traiter suivant les modules activés inscrits. Ne fait rien en soit.", // description plus longue
        credits: "Bluflonalgul", // penser à créditer les auteurs et aides
        //group: "Forum",
    },
    // Les fonctions de callback avec ordre de priorité
    CBS: new Array(), // [ {mod: moduleRef1, codepage: 'XXXX', init: fonctionCB1, process: fonctionCB11, rank: 0, initDone: false} , { ... } , ... ]
    registeredMods: {}, // clé: nom module, val: array codes pages. pour savoir simplement si un module a déjà appelé Morphorum et pour quel codepage
    // cache objet de la page de msg
    infos: { // informations générales de la page
        title:       "",//Titre de la dicussion
        discuNo:   null,// n° de discussion
        pageNo:    null,// n° de la page
        lastPage: false,// true/false on est sur la dernière page.
        writable: false,// true si on peut écrire dans le sujet
    },
    // suite cache objet: le tableau envoyé aux fonctions postProcess des modules clients
    msgs: new Array(), // tableau des messages {} de type demoMsg :
    demoMsg: { // NE SERT PAS, juste pour documenter
        msgNode:     null,// noeud DOM principal du message
        msgGNo:         0,// n° du message dans la discussion entière, en comptant 1 le premier
        infoNode:    null,// noeud DOM du div info
        authorNode:  null,// noeud DOM du div de classe author
        avatarNode:  null,// noeud DOM du div de classe avatar (contient un node img ou sinon rien)
        titleNode:   null,// noeud DOM du div de classe title pour la distinction, ou null si absent
        contentNode: null,// noeud DOM du contenu du msg
        userNode:    null,// noeud DOM du div de l'auteur ! n'est pas le node de classe author mais un des fils !
        dateNode:    null,// noeud DOM de la date du msg
        cityNode:    null,// noeud DOM de la ville, pour les msg FM
        pseudo:  "machin",// pseudo de l'auteur
        fromMyself: false,// true si on est soi-même l'auteur
        fromHero:   false,// true si l'auteur est un héros TODO
        fromDead:   false,// true si l'auteur est mort (en ville) 
        fromCrow:   false,// true si vient du corbeau 
        fromBanned: false,// true si vient d'un bannis TODO
        fromWinner: false,// true si vient d'un premier de la classe TODO
        txtOri:        "",// texte original du msg, le innerHTML du contenu
        marque:      null,// ajouté par marquage: le code de marque si présent. ( 0 est une marque )
    },
    

    initialize: function initialize() {
        Dispatcher.registerCallback(Morphorum, 'Forum', Morphorum.install);
    },
    

    /**
     * Installe morphorum
     */
    install: function install() {
        Morphorum.debug("début install...",3);
        
        // Vérifie que l'on est pas déjà installé
        var thread = $('tid_forum_right');
        if((!thread) || $(Morphorum.nodeId)) { 
            Morphorum.debug("Marque déjà la ou thread non trouvé");
            return false;
        }

        // Installation du marqueur div
        var div = document.createElement('div');
        div.id = Morphorum.nodeId;
        thread.insertBefore(div, thread.firstChild);
        Morphorum.myNodeId = div; // pour éviter une recherche dans DOM et servir à tester la validité du cache

        Morphorum.debug("appel initialisation des modules clients...", 3);
        // TODO risque de double init si double appel register et bascule vers autre pagecode
        for(var i=0; i<Morphorum.CBS.length; i++) {
            if(Dispatcher.isModDisabled(Morphorum.CBS[i].mod.classname))
                Morphorum.debug("(module {0} n'est pas activé, pas d'initialisation)".format(Morphorum.CBS[i].mod.label), 2);
            else if(Morphorum.CBS[i].initDone)
                Morphorum.debug("(module {0} déjà initialisé)".format(Morphorum.CBS[i].mod.label), 2);
            else if ( !Morphorum.CBS[i].init )
                Morphorum.debug("(module {0} n'a pas d'initialisation)".format(Morphorum.CBS[i].mod.label), 2);
            else {
                Morphorum.debug("Initialise module {0}".format(Morphorum.CBS[i].mod.label), 2);
                Morphorum.CBS[i].init();
                Morphorum.CBS[i].initDone= true;
            }
        }
        //Morphorum.debug("les traitements...",3);
        Morphorum.infos.discuNo = hortool.getCurrentDiscuNo(); // n° de discussion
        Morphorum.infos.lastPage = pagedetect.isPage('ThreadLastPage'); // true/false on est sur la dernière page.
        Morphorum.infos.writable = ! pagedetect.isPage('ForumUnwritable'); // true/false on peut répondre sur ce sujet 
        Morphorum.msgs = Morphorum.analyzeThread(thread); // Traitement d'analyse de la page
        Morphorum.morph();   // Traitements de morphing sur Morphorum.msgs
    },
    
    
    /**
     * Prépare le rechargement en passant les modules initialisé a non initialisé
     */
    reset: function reset() {
        for(var i=0; i<Morphorum.CBS.length; i++)
            Morphorum.CBS[i].initDone = false;
    },
    

    isCacheValid: function isCacheValid(){ // vérifie si le thread est toujours le même depuis l'étape analyzeThread
        // testé ok avec firebug & JSh
        try{
            if ( Morphorum.myNodeId.parentNode ){ // posera pb si retiré du DOM suite à rechargement partiel
                return true; // il est tjs là donc ok
            }else{
                return false;
            }
        }catch(ex){
            return false; // ça a posé pb car pas ou plus là, donc cache non valide
        }
    },

registerCallback: function registerCallback( moduleRef, codepage, processFunc, initFunc, rank ){
  // moduleRef: objet module
  // codepage : code de page pagedetect désirée, comme avant avec le Dispatcher
  // processFunc : fonction de post-traitement, reçoit Morphorum.msgs en param, à appeler pour tout chargement de sujet forum
  // initFunc: fonction d'initialisation de module à appeler juste une fois (lecture de données texte, préparation de structures, etc) - facultatif
  // rank: rang de priorité, par exemple de 0 à 99 (entier)
  // ( note: multiples appels possible pour des pages *différentes* => pagecode disjoints )
  if(typeof processFunc != 'function') return Morphorum.debug("processFunc n'est pas une fonction !",-1);
  if ( initFunc && (typeof initFunc != 'function') )  return Morphorum.debug("initFunc n'est pas une fonction !",-1);
  rank= rank || 50; // valeur par défaut médiane
  
  var rmods= Morphorum.registeredMods;
	var modName= moduleRef.classname;
  if ( ! rmods[modName] ){
    rmods[modName]= new Array(codepage);
  }else {// déjà enregistré
    Morphorum.debug("Note: le module "+modName+" est déjà enregistré pour "+uneval(rmods[modName])+" et rappelle Morphorum pour "+codepage+".\nCeci n'est possible qu'avec différentes pages *sans recouvrement*.", 2);
    rmods[modName].push(codepage);
  }

  var currentCB= { mod: moduleRef, codepage: codepage, init: initFunc, process: processFunc, rank: rank, initDone: false };
  var swapCB;
  for ( var i=0; i<Morphorum.CBS.length; i++){
    if ( currentCB.rank<Morphorum.CBS[i].rank ) {
      // le rang supérieur se décale en fin de tableau, les rang identiques sont gardés dans l'ordre d'appel
      swapCB= Morphorum.CBS[i];
      Morphorum.CBS[i]= currentCB;
      currentCB= swapCB;
    }
  }
  Morphorum.CBS.push(currentCB); // finalise le décallage, valide si aucune boucle
},

    /**
     * Parcourt le thread pour récupérer les informations dont on a besoin
     *
     * @param thread        Section forum_left de la page
     */
    analyzeThread: function analyzeThread(thread) {
        // Si aucun thread donné
        if (!thread) {
            Morphorum.debug("paramètre invalide, abandon",-1);
            return [];
        }

        // Numero de la page
        try{
            var pageSelect = $xpath(
                    "(//span[contains(@class, 'tid_pageNumber')])[2]",
                    thread
            );
            
            pageSelect = trimSpace(pageSelect.innerHTML);
            Morphorum.infos.pageNo = parseInt(pageSelect) || 1;
        }catch(ex){
            Morphorum.infos.pageNo = 1; // pas trouvé le node donc page 1
        }
        Morphorum.debug("Numéro de page: " + Morphorum.infos.pageNo, 3);

        // Titre du thread
        try{
            var title = $xpath("(//span[@class='tid_title'])[2]", thread);
            Morphorum.infos.title = trimSpace(title.lastChild.nodeValue);
        }catch(ex){
            Morphorum.infos.title = "";
        }
        Morphorum.debug("Titre: " + Morphorum.infos.title, 3);

        // Récupére la liste des messages
        var l_messageBrut = $xpath(
                "//div[@class='tid_forumThread']/div[contains(@class, 'tid_post tid_ tid_read')]",
                thread, XPathResult.ORDERED_NODE_ITERATOR_TYPE
        );
        
        var contenu, infoNode, avatarNode, titleNode, authorNode,
            userNode, pseudo, city, datemsg, fromMyself, fromCrow,
            fromDead, fromHero, fromBanned, fromWinner;
        
        var l_messageTraite = new Array();                      // tableau des messages pré-analysés
        var currentMessage = l_messageBrut.iterateNext();       // init boucle ( les en-têtes )

        // Pour chaque message
        while(currentMessage != null) {
            fromMyself = fromCrow = fromDead = false;
            fromHero = fromBanned = fromWinner = false;
            
            // Contenu du message
            contenu = $xpath(".//div[@class='tid_editorContent']", currentMessage);
            Morphorum.debug("Message: " + contenu.innerHTML, 3);
            
            infoNode = $xpath("div[@class='tid_header tid_bg1']", currentMessage);
            avatarNode = $xpath(".//div[@class='tid_twinoidAvatar']", infoNode);
            
            // Pseudo de l'auteur
            authorNode = $xpath("div[@class='tid_name']/a", infoNode);
            if(authorNode)
                pseudo = authorNode.innerHTML;
            else
                pseudo = "machin";
            Morphorum.debug("Pseudo: " + pseudo, 3);
            
            // TODO : fromHero, fromBanned, fromWinner
            
            // Si on est l'auteur
            fromMyself = (pseudo == hortool.getMyPseudo());
            Morphorum.debug("Mon message: " + fromMyself, 3);
            
            // Date du message
            datemsg = $xpath(".//div[@class='tid_date']", infoNode);
            if(!datemsg) {
                datemsg = null;
                Morphorum.debug("node date non trouvé!",1);
            } else
                Morphorum.debug("Date: " + datemsg.innerHTML, 3);
            
            // Titre de l'auteur
            titleNode = $xpath(".//span[@class='tid_userTitle']", infoNode);
            if(!titleNode)
                titleNode = null;
            else
                Morphorum.debug("Titre: " + titleNode.innerHTML, 3);
            
            // Numéro du message
            var msgGNo = (Morphorum.infos.pageNo - 1) * 10 + l_messageTraite.length;
            Morphorum.debug("Numero du message: " + msgGNo, 3);
            
            l_messageTraite.push({
                msgNode:     currentMessage,       // noeud DOM principal du message
                msgGNo:      msgGNo,        // n° du message dans la discussion entière (0 = premier)
                contentNode: contenu,       // noeud DOM du contenu du message
                infoNode:    infoNode,      // noeud DOM du header du message
                avatarNode:  avatarNode,    // noeud DOM contenant l'avatar
                titleNode:   titleNode,     // noeud DOM contenant le titre
                authorNode:  authorNode,    // noeud DOM contenant le pseudo
                dateNode:    datemsg,       // noeud DOM de la date du msg
                pseudo:      pseudo,        // pseudo de l'auteur
                fromMyself:  fromMyself || false,   // true si on est soi-même l'auteur
                fromCrow:    fromCrow || false,
                fromDead:    fromDead || false,
                fromHero:    fromHero || false,
                fromBanned:  fromBanned || false,
                fromWinner:  fromWinner || false,
                txtOri: contenu.innerHTML           // texte original du msg
            });
            
            currentMessage = l_messageBrut.iterateNext();
        }
        
        return l_messageTraite;
    },

morph: function morph() { // change l'élément DOM si concerné
	Morphorum.debug("début de morph",3);
  for ( var i=0; i<Morphorum.CBS.length; i++){
    //vérifier si le module est actif avant d'appeler le post-traitement
    if ( Dispatcher.isModDisabled(Morphorum.CBS[i].mod.classname) ) { // ?Hypher? ok comme ça ?
      continue; // au suivant!
    }
    // s'assurer qu'il n'y a pas eu recharchement de section de page entre temps
    if ( !Morphorum.isCacheValid() ){
      Morphorum.debug("Cache invalidé, abandon de morphing de page",1);
      return 1;
    }
    // ne traiter que si on est sur la bonne page
    if ( pagedetect.isPage(Morphorum.CBS[i].codepage) ){
      Morphorum.debug("Appel post-traitement de "+Morphorum.CBS[i].mod.label,2);
      Morphorum.CBS[i].process(Morphorum.msgs);
    }else{
      Morphorum.debug("Pas la bonne page pour traiter "+Morphorum.CBS[i].mod.label,2);
    }
  }
},

//fonctions accesseurs (pas fini)
getMsgs: function getMsgs() {
  return Morphorum.msgs; // TODO tester la validité ?
},
getInfos: function getInfos(){
  return Morphorum.infos;
},

});



/****************************************************************************/
/******************************** troll.module.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// Troll (module): Intégrez votre forum préféré directement sur le forum de hordes.

//§ Zone: Std

// $Id: troll.module.js 614 2010-05-19 20:30:32Z Hypher $

// Auteur: Paradino

// Released under the GPL license
// Sous licence GPL: la licence n'est a accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

troll = new Module('troll', {

	// pour ModMan
	label: "Troll", // le nom tel qu'il apparaît dans le Module Manager (le marteau)
	articleCe: "Ce ", // "ce " "cette " "ces " (masc/fem/sing/plur) pour le label
	options: {
		icon: "http://data.hordes.fr/gfx/icons/small_archive.gif", 
		htmldesc: "Intégrez votre forum préféré directement sur le forum de hordes.", 
		credits: "Paradino basé sur une idée de Sirvek.", // penser a créditer les auteurs et aides
		group: "Forum",
        subgroup: "Autre",
	},
	
	// pour OptionsManager
	params: {
		forum_name: {type:'string',
					 desc:"Nom du forum",
					 default:"Alpha-Hordes"},
		forum_buton: {type:'string',
					  desc:"Bouton",
					  help:"Si le nom de votre forum est trop long pour le bouton, vous pouvez en choisir un plus court.",
					  default:"Alpha-H",
					  call: function (val, old) {return val.substring(0, 7);}},
		forum_link: {type:'string',
					 desc:"Lien du forum",
					 default:"http://alpha-hordes.forumactif.net"},
	},
	
	initialize: function initialize() {
		Dispatcher.registerCallback(troll, 'FOMO', troll.install);
		troll.debug('Initialisation', 2);
	},
	
	install: function install() {
		if($('li_troll')) {return false;}
	 	var tab   = $('sub_saloon');
		var node           = document.createElement('li');
			node.innerHTML = "<a><img src=\"http://data.hordes.fr/gfx/icons/small_archive.gif\"/>"+troll.params.forum_buton.value+"</a>";
			node.id        = "li_troll";
			tab.appendChild(node);
			troll.debug('Installation', 2);
			
			node.addEventListener('click', function(e){
				$('message_panel').innerHTML = '';
				$('saloon_panel_menu').innerHTML = '';
				$('generic_section').innerHTML = '<h2>'+troll.params.forum_name.value+'</h2><div class="warning">Vous pouvez changer le site affiché a tout moment depuis la configuration du module <b>Troll</b> disponible dans l\'onglet DGM, partie forum. <img src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%10%08%03%00%00%00%18%A1%1Er%00%00%00%07tIME%07%D9%09%10%0D%18%04)B%1D%BA%00%00%00%09pHYs%00%00%1E%C1%00%00%1E%C1%01%C3iTS%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%12PLTEk%24%11%00%00%00%FF%FF%FF%9C%9C%9C%84%84%84%D6%EF%8CI%C0)%FB%00%00%00%3DIDATx%DA%8D%CC%C1%0E%80%00%08%02P%0C%F8%FF_.%B0%D6%D6)%0E%EE%8D%A9%C0l%0C%84%D2%B8t%3AO%5BG%CBH%25s%C5%25%25%F2%5Eh%3E%3C%9A%E55%F0%97%EF%D9%F3%EC%04R%EA%00%CC%8E%12%B9P%00%00%00%00IEND%AEB%60%82" /></div><br /><iframe width="900" height="700" src="'+troll.params.forum_link.value+'" style="margin-left:-333px;"></iframe>';
				var tab_selected = document.evaluate('//ul[@id="sub_saloon"]/li[@class=" selected"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				if(tab_selected.singleNodeValue!=null) {
					tab_selected.singleNodeValue.className = '';
				}
				node.className = 'selected';
			}, true);
	},
	
});


/****************************************************************************/
/******************************** sobriquet.module.js ****************************/
/* ------------------------------------------------------------------------ */

﻿// Module pour un script Greasemonkey particulier.
// Sobriquet: Permet de modifier la distinction de vos concitoyens

//§ Zone: Std
// à voir pour le css

// $Id: sobriquet.module.js 959 2011-03-28 21:06:04Z bluflonalgul $

// Auteur: T4g1
// Version: 2.0

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

/////////////////////////////////////////////////////////////////////////////
// Module permettant de modifier la distinction de vos concitoyens

Sobriquet = new Module('Sobriquet', {
    // Description utilisée par le module modMan
    label: "Sobriquet",
    options: {
        icon:       "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%DA%05%08%12*%1C%16%ED%D5%0F%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%01%5DIDATx%DAc%60%40%80%FFP%CC%40%8A%18%13L%F0%81%AE%09%03%08%C3%24%D9%D8%D8%FE%C3%94%82%D9p%CDp%FDpC%FE%DF%90V%FA%0F%A3%DF%CA%A8%80%D9P%03%C0%10j%00H3%90%BD%0A*%0F%A1%19%A1%261%22%BB%84%F7%FD%070G%B8K%17%22%1A%B5%0E%E2%5C%A63%0C%FF%FE%992%20%ABg%81q%60%CET%B8%7C%06%2C%03t%09%9A%D7%19%81%9A%C1%EA%C0%1A%7F%FD%FA%05%D2%C7%C8%84%ACd%5D%B2%0APf%11%18%0B%DD%ABc%F8%FB%FD'%C3%FF%90%40%20%7F1D%FCf6X%0D%06%00%D9%BE%25S%EB%3FP%01%D8%BF%F80H%5D%89%0D%2F%2C%5C%18%98%D0%0D%03%D9%F0%F3%E7O%86%3C3v%86%9F%97S!4%94%8F%CDv%14%03%FE%1D%B9%CF%E0%5D%E0%C8%F0o%9E7%83%83%AE%2CX%0CDo%CD%D2%86%F3%B1%1A%00%0A%90%A0%B9w%18%B6%9Fy%00%11%B4Q%84%C8*%9A%83%0D%F44Q%00c%18%98t%EA'%034%101%BD%00r%05%0C%94%3Ae3%94%26%2FB%91%3Fp%F91Z%DC%A0%05%E6%F7%E9.X%9D%CA%99%B9%07%1C%06%20%97%C2l%C7%EA%02%987%60l%90F%10%06%19%8Cn%3B%86%0B%60%AE%00%D9%84%ECg%98a%E8%B6c5%00%D9%10d%80M3N%03%60%86%20%F3%B1i%06%01%00X%8B%BF%13%60%EDY%EB%00%00%00%00IEND%AEB%60%82",
        htmldesc:   "Ce module permet au joueur de modifier la distinction de ses concitoyens (les modifications ne sont visibles que pour lui). <i>Cliquez sur le peudo dans un message du forum.</i>",
        credits:    "T4g1, idées et sobriquets de Bluflonalgul, génération auto d'Hypher, v2 refondue de Bluflonalgul",
        group:      "Forum",
        subgroup:   "Autre",
    },
  
    // Paramétres du module
    params: {
        infobule: {type: 'bool', desc: 'Afficher le titre original en info-bulle', default: true}
    },
  
    INSTALL_MARK_ID: "sobriquet_installed",
    msgsCache: null, // copie de la liste des messages envoyés par Morphorum, pour la synchro en cas de modif sobriquet

    // Liste des personnes auquelles appliquer le sobriquet
    mod_target: {}, //{ pseudo: { 'sob_index': str, 'sob_perso': str, 'avatar': str } }

    // Sobriquets pré-définit
    // G = Good, B = Bad, N = Other
    sob_auto: {
        // Other title
        'N00': 'Aucun',
        'N01': 'Joyeux dingue',
        'N02': 'Lapinou crétin',

        // Good title
        'G00': 'Aimable concitoyen',
        'G01': 'Âme sœur',
        'G02': 'Ami fidèle',
        'G03': 'Brave fille',
        'G04': 'Brave garçon',
        'G05': 'Célèbre star',
        'G06': 'Citoyen modèle',
        'G07': 'Complice fiable',
        'G08': 'Dieu vivant',
        'G09': 'Expert reconnu',
        'G10': 'Guide charismatique',
        'G11': 'Idole vénérée',
        'G12': 'Maître à penser',
        'G13': 'Noble cerveau',
        'G14': 'Prophète avisé',

        // Bad title
        'B00': 'Beauf aigri',
        'B01': 'Boulet lamentable',
        'B02': 'Cancre bouché',
        'B03': 'Dictateur fasciste',
        'B04': 'Enfoiré notable',
        'B05': 'Honte mondiale',
        'B06': 'Inculte des sables',
        'B07': 'Kevin neuneu',
        'B08': 'Misérable sot',
        'B09': 'Pénible rencontre',
        'B10': 'Plaie des villes',
        'B11': 'Piètre assistant',
        'B12': 'Raclure finie',
        'B13': 'Sombre nuisance',
        'B14': 'Tare indigne',
        'B15': 'Traître en puissance',
        'B16': 'Trouillard cupide',
        'B17': 'Vulgaire rebut',
        'B18': 'Crétin obtus',
    },
  
  // Modèles pour les noms aléatoires  N=nom T=titre A=adjectif &=conjonction (de|d')
    sob_random:{
        pattern: [
          'NA','NA','NA','NA','NA',
            'TA','TA',
            'NT','NT','NT',
            'NAT','NAT','NTA','NTA',
          //'NAA',
          'N&T',
          'NA&T',
          'N&TA',
          //'N&TAA',
          'T&N',
          'T&NA',
          'TA&N',
          //'TA&NA' // trop long
        ],
      
      // titre pour le random titre
      title: [
          'sœur',
          'modèle',
          'fasciste',
          'maître|~sse',
          'indigne',
          'vulgaire',
          '|calibre',
          '|beauf',
          'neuneu',
          'dingue',
          'cerveau|cervelle',
          '|putain',
      ],
      
      // Adjectifs pour le random titre
      adj: [
          'petit|~e-',
          'gros|~se-',
          '-poilu|~e',
          'sale-',
          'fiable',
          'sombre-',
          'misérable',
          'noble',
          'pénible',
          'fidèle',
          'lamentable',
          'brave',
          'cupide',
          '-aigri|~e',
          'piètre-',
          'aimable',
          '-bouché|~e',
          'célèbre',
          'vivant|~e',
          'notable',
          '-reconnu|~e',
          'charismatique',
          'vénéré|~e',
          'joyeux|joyeuse',
          'vieux|vieille-',
          '-avisé|~e',
      ],
      
      // Nom du joueur pour le random titre
      name: [
          'trouillard|~e',
          'assistant|~e',
          'concitoyen|~ne',
          'crétin|~e',
          'ami|~e',
          'boulet|~te',
          'garçon|fille',
          'cancre',
          '|star',
          'citoyen|~ne',
          'complice',
          'dictateur|',
          'dieu|déesse',
          'enfoiré|~e',
          'expert|~e',
          'guide',
          '|idole',
          'kévin|',
          'lapinou|lapine',
          'maître|~sse',
          'sot|~te',
          '|rencontre',
          'prophète|',
          '|raclure',
          '|tare',
          'traître',
          'rebut',
          '|nuisance',
          '|plaie',
      ],
    },
  
    devTeamMedals: { // Aux membres de l'équipe de personnaliser la distinction pour leurs messages qui mentionnent "DGM"
    // Attention! le pseudo doit être le pseudo hordes exact avec les majuscules ou minuscules !
    // pas de blague: que des images de la taille d'icone ;)
        bluflonalgul: { img:"data:image/gif,GIF89a%10%00%10%00%84%17%00%00%00%00!%0D%00'%0F%00%2B%11%00%2C%11%00-%12%00%3E%20%0AH)%0Fu3%19lH%25%9BD!%BCf*%C0i%3B%96%89%10%92%8Du%C1%95%5D%E4%98%5B%BA%B3%95%E9%B9e%D3%CB%A9%FF%C6%7B%EC%E3%BD%FF%FF%1F%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%1F%00%2C%00%00%00%00%10%00%10%00%00%05o%E0'%8E%1F%60%9E%00I%02NU9%40%95%AA%E5dOQ%24%D3%40%D4%E7%B0%9D%0A%A5P%A0h%23%C0B2C%8ANL%E7%93%0116%9FI%08e%0B%80%5CO%85%02%A5%EA%3D%25%01%03K%E1%C1Px)%C6d%C1%D2(%1C%20%08%C4Q4%B7%F8%13%14%08%0A%5B%0CM%04%05%0D%16%06%84zfO%01%16%04%00T%0A%08T_%02%05%25(%26*!%00%3B", title: "Papa du DGM" }  // marteau éclair Leedo
        ,Hypher:      { img:"/gfx/icons/item_pc.gif", title: "Codeur DGM" }
        ,Shuny:       { img:"/gfx/icons/item_pc.gif", title: "Codeur DGM" }
        ,ericvivi2:   { img:"/gfx/icons/item_pc.gif", title: "Codeur DGM" }
        ,Bugzilla:    { img:"/gfx/icons/item_pc.gif", title: "Codeur DGM" }
        ,leedo:       { img:"/gfx/icons/item_pc.gif", title: "Codeur DGM" }
        ,Scipion:     { img:"/gfx/icons/item_pc.gif", title: "Codeur DGM" }
        ,Paradino:    { img:"/gfx/icons/item_pc.gif", title: "Codeur DGM" }
        ,gmotw:       { img:"/gfx/icons/item_pc.gif", title: "Codeuse DGM" }
        ,T4g1:        { img:"/gfx/icons/item_pc.gif", title: "Super Codeur DGM" }
        ,SirVek:      { img:"/gfx/icons/item_pc.gif", title: "Codeur DGM" }
    },
    DEV_TEAM_TIP: "Vous avez l'honneur de croiser un joueur impliqué dans le développement du <strong>Dangereux Greffon Massacreur</strong>&nbsp;! (DGM)",

    ParamBox: null,         // Boite pour configurer le sobriquet a appliquer
    ParamSelected: null,    // Liste déroulantes contenant les options
    ParamInputField: null,  // Champs pour saisir le texte personalisé
    ParamAvatarField: null, // Champs pour entrer l'avatar personalisé
    param_pseudo: "",       // Pseudo de la personne concernée
    lateInitGenDone: false, // Partie commune de LateInit faite
  
    // Enregistre le module auprès du Dispatcher
    initialize: function initialize() {
        Morphorum.registerCallback(Sobriquet, 'CityThread',  Sobriquet.postProcess, Sobriquet.lateInitFV);
        Morphorum.registerCallback(Sobriquet, 'WorldThread', Sobriquet.postProcess, Sobriquet.lateInitFM);
        Dispatcher.registerCallback(Sobriquet, 'AnySoul', Sobriquet.installSoul);
    },

    
    lateInitFV: function lateInitFV(){ // fn d'init module pour le cas thread FV, n'est appelé qu'une fois par Morphorum
        if ( pagedetect.isPage('CityThread') ) {
            Sobriquet.setupHook(); // lien pour modifier le sobriquet dans la boîte utilisateur
        }
        
        Sobriquet._lateInitGen();
    },
    
    
  lateInitFM: function lateInitFM(){ // fn d'init module pour le cas thread FM, n'est appelé qu'une fois par Morphorum
		Sobriquet._lateInitGen();
  },
    _lateInitGen: function _lateInitGen(){ // fn d'init module commune le cas thread général, est appelé par l'un ou l'autre des lateInit
        if ( Sobriquet.lateInitGenDone )
            return false;
        Sobriquet.loadParam();
        //if ( Dispatcher.isModDisabled('RepEclair') )
        //    htmltool.addManyStyles(GM_getResourceText("repeclaircss")); // TODO voir pourquoi ce css
        //Sobriquet.lateInitGenDone = true;
    },
    
    
    postProcess: function postProcess(msgs){ // appelé par Morphorum si module actif
        Sobriquet.msgsCache= msgs;
        Sobriquet.reProcess(msgs,false);
    },

    syncThread: function syncThread() {  // appelé après changement d'un sobriquet
        if (Sobriquet.msgsCache){
            Sobriquet.reProcess(Sobriquet.msgsCache, true);
        }else{
            Sobriquet.debug("syncThread appelé mais aucune liste de messages en mémoire... abandon.",1);
        }
    },
  
    reProcess: function reProcess(msgs, syncCall){ // fonction interne pour postProcess et syncThread : transformation des en-tête de messages
        // cette fonction modifie éventuellement le tableau passé par Morphorum pour ajouter ses nodes:
        //   - sobTitleNode : la distinction sobriquet
        //   - sobAvatarImgNode : l'image de l'avatar sobriquet
        //   - avatarImgNode : l'image de l'avatar d'origine
        try {
            var amsg, pseudo; // un message, le pseudo
            for ( var msgno=0; msgno<msgs.length; msgno++ ){
                amsg= msgs[msgno];
                pseudo= amsg.pseudo;
                if ( pseudo in Sobriquet.devTeamMedals && / DGM[ \.,!?]/.test(amsg.txtOri) ){ // un des codeurs DGM parle de DGM ! //TODO affiner la RE
                    Sobriquet.addTeamMemberMedal(amsg);
                }else if (Sobriquet.isTarget(pseudo)) { // Le pseudo est affublé d'un sobriquet :)
          // le pseudo a une distinction sobriquet !
          if (Sobriquet.mod_target[pseudo].sob_index != 'N00' || Sobriquet.mod_target[pseudo].sob_perso != "") { 
            if ( amsg.sobTitleNode ) // suppression de la distinction sobriquet déjà posée
              amsg.sobTitleNode.parentNode.removeChild( amsg.sobTitleNode );
            if ( amsg.titleNode ) // masquer la distinction d'origine
              amsg.titleNode.style.display = "none"; 
            // Ajout de la nouvelle distinction :)
            amsg.sobTitleNode= Sobriquet.buildSobTitle(pseudo, amsg.titleNode );
            amsg.authorNode.appendChild(amsg.sobTitleNode);
          }
          // le pseudo a un avatar sobriquet
          if (Sobriquet.mod_target[pseudo].avatar != "") {
            if ( amsg.sobAvatarImgNode ) // suppression de l'avatar sobriquet déjà posé
              amsg.sobAvatarImgNode.parentNode.removeChild( amsg.sobAvatarImgNode );
            if ( !amsg.avatarImgNode ) // il nous faut le node img de l'avatar d'origine 
              amsg.avatarImgNode= $xpath("img",amsg.avatarNode);
            if ( amsg.avatarImgNode )// masquer l'avatar d'origine, parfois absent
              amsg.avatarImgNode.style.display = "none"; 
            amsg.sobAvatarImgNode= Sobriquet.buildSobAvatar(pseudo);
            amsg.avatarNode.appendChild(amsg.sobAvatarImgNode);
          }
        }else if (syncCall) { // Le pseudo n'est pas visé par un sobriquet, des choses à faire seulement si on supprime un sobriquet sur un pseudo, avec appel de syncThread
          if ( amsg.sobTitleNode ) { // suppression de la distinction sobriquet et restauration de l'originale
            amsg.sobTitleNode.parentNode.removeChild( amsg.sobTitleNode );
            amsg.sobTitleNode= null;
            if ( amsg.titleNode )
              amsg.titleNode.style.display = "block";
          }
          if ( amsg.sobAvatarImgNode ) {// suppression de l'avatar sobriquet et restauration de l'original
            amsg.sobAvatarImgNode.parentNode.removeChild( amsg.sobAvatarImgNode );
            amsg.sobAvatarImgNode= null;
            if ( amsg.avatarImgNode )
              amsg.avatarImgNode.style.display = "block";
          }
        }
            }// fin boucle sur le tableau de messages

        } catch(ex) {
            Sobriquet.debugException(ex); // on transmets l'exception au débogueur
        }

    },
  
    buildSobTitle: function buildSobTitle( pseudo, oldTitleNode ){ // construit un nouveau div title pour le pseudo suivant son sobriquet
        // !! Doit avoir un sobriquet, ne pas appeler la fonction sinon
        var title= document.createElement('div');
        title.className= "title";
        var oldTitleTxt= null;
        if(Sobriquet.params.infobule.value && oldTitleNode ) { // Place le titre existant en infobulle
            oldTitleTxt = trimSpace( htmltool.stripTags(oldTitleNode.innerHTML) );
        }
        var newTitleTxt;
        if(Sobriquet.mod_target[pseudo].sob_perso != "") // Si on a un message perso
            newTitleTxt= Sobriquet.mod_target[pseudo].sob_perso;
        else
            newTitleTxt= Sobriquet.sob_auto[Sobriquet.mod_target[pseudo].sob_index];// Sinon, on utilise le message pre-defini
        return Sobriquet.buildGenTitle(Sobriquet.options.icon, newTitleTxt, oldTitleTxt);
    },
  
    buildGenTitle: function buildGenTitle( iconRef, titleLabel, tipText ){ // construit un nouveau div title général avec les param
        var title= document.createElement('div');
        title.className= "title";         
        if(tipText ) {
            hortool.addSpecialTip( title, tipText );
        }
        title.innerHTML = '<img src="' + iconRef + '"> '+titleLabel;;
        return title;
    },

    buildSobAvatar: function buildSobAvatar( pseudo ){ // construit un img l'avatar 
        var avatar = document.createElement('img');
        avatar.setAttribute('src', escapeStr(Sobriquet.mod_target[pseudo].avatar, "'\""));
        return avatar;
    },
  
    installSoul: function installSoul() {
        if($(Sobriquet.INSTALL_MARK_ID)) {
            Sobriquet.debug("Module déjà installé", 2);
            return false;
        }

        if ( !Sobriquet.cssSoulDone ) {
            Sobriquet.cssSoulDone = true;
            htmltool.addManyStyles(GM_getResourceText("repeclaircss")); // je me demande pourquoi mais c'était codé avec cet appel dans le install d'origine
            htmltool.addStyle("ul.levelList li span.dgm_sobriquet {color: rgb(71, 222, 67);}");  
        }

        try {
            // Charge les couples pseudo/sobriquets
            Sobriquet.loadParam();

            // Récupére le pseudo du joueur
            var Pseudo = $xpath("//div[@class='guser']/div[@class='side']/strong/a/child::text()");
            Sobriquet.param_pseudo = trimSpace(Pseudo.textContent);
            Sobriquet.debug(Sobriquet.param_pseudo);
            
            if(Sobriquet.param_pseudo == hortool.getMyPseudo())
                return;
            
            // Crée la boite pour ajouter un sobriquet au pseudo
            Sobriquet.buildParBox();

            // Ajoute le sobriquet dans la liste des distinctions
            Dispatcher.addNodeChangeListenner(
                    "//div[contains(@class,'tid_title')]/span", 
                    Sobriquet.addTitleToSoul, 
                    "//div[contains(@class,'guser')]"
            );
        } catch(ex) {
            Sobriquet.debugException(ex);
        }
    },
  
    setupHook: function setupHook(){// branchement sur la fonction qui montre la boîte utilisateur
        /* Ajoute le lien pour modifier le sobriquet dans la boite qui 
        s'affiche lorsqu'on clique sur un pseudo */
        if(window.wrappedJSObject.js) {
            var _dgm_show = window.wrappedJSObject.js.UserBox.show;
            window.wrappedJSObject.js.UserBox.show = function(obj, id, name, avatar, about, urle) {
                // Conserve le déroulement normal
                _dgm_show(obj, id, name, avatar, about, urle);          
                // Enregistre le pseudo de la personne
                Sobriquet.param_pseudo = name;           
                // Ajoute un lien vers l'ajout de sobriquet
                Sobriquet.addSobLink();         
                // Crée la boite pour ajouter un sobriquet au pseudo
                Sobriquet.buildParBox();
            }
        }    
    },
  
  // Retourne true si le pseudo est affublé d'un sobriquet, false sinon
  isTarget: function isTarget(pseudo) {
      for(var target in Sobriquet.mod_target) {
          if(pseudo == target)
              return true;
      }
      return false;
  },
  
  // Ajoute le bouton permettant d'accéder aux options du sobriquet et la boite des options
  addSobLink: function addSobLink() {
      // Si le bouton existe, on le suprimme
      var OldButton = $(Sobriquet.label + "_Button");
      if(OldButton)
          OldButton.parentNode.removeChild(OldButton);
      
      var PrevNode = $('userBoxMail');
      if(PrevNode == undefined) {
          Sobriquet.debug("userBoxMail non trouvé !");
          return;
      }
      
      // Option du bouton à ajouter
      if(Sobriquet.isTarget(Sobriquet.param_pseudo)) {
          var button_data = {
              'label': 'Modifier le sobriquet',
              'icone': "gfx/forum/smiley/h_calim.gif"
          };
      }
      else {
          button_data = {
              'label': 'Affubler d\'un sobriquet',
              'icone': Sobriquet.options.icon
          };
      }
      
      // Création du bouton
      var Button = document.createElement('a');
      Button.id = Sobriquet.label + "_Button";
      Button.className = "action";
      Button.href = "#";
      Button.innerHTML = '<img src="' + button_data.icone + '"> ' + button_data.label;
      
      // Affiche la boite de parametrage du sobriquet lors du click sur le boutton
      Button.addEventListener('click', function(e) {
          e.preventDefault();
          Sobriquet.showParamBox();
      }, false);
  
      // Ajoute le bouton après le message "lui écrire"
      PrevNode.parentNode.insertBefore(Button, PrevNode.nextSibling);
  },
  
  // Affiche la boite permettant de modifier le sobriquet
  showParamBox: function showParamBox() {
      // Cache la UserBox
      window.wrappedJSObject.js.UserBox.hide();
      
      // Affiche la boite de paramétrage
      Sobriquet.ParamBox.className = 'showNotif';
      $('body').className = 'hideSwf';
      window.wrappedJSObject.js.Lib.window.scrollTo(0,180);
  },
  
  // Crée la boite de paramétres du sobriquet
  buildParBox: function buildParBox() {
      // Node dans laquelle insérer la boite de paramétres
      var MainNode = $(hortool.contentId);
      if(!MainNode) return;
      
      // Option du joueur
      var pseudo_values = { 'sob_index': 'N00', 'sob_perso': "", 'avatar': "" };
      for(var target in Sobriquet.mod_target) {
          if(target == Sobriquet.param_pseudo)
              pseudo_values = Sobriquet.mod_target[target];
      }
      
      Sobriquet.ParamBox = document.createElement('div');
      Sobriquet.ParamBox.id = "parboxid";
      
      // Neutralise le reste de la page
      var BlackOut = document.createElement('div');
      BlackOut.setAttribute('class', 'black');
      Sobriquet.ParamBox.appendChild(BlackOut);
      
      // Boite contenant les options
      var Box = document.createElement('div');
      Box.setAttribute('class', 'parboxcontent');

      // En-tête de la boite
      var Header = document.createElement('h1');
      Header.className= 'eclairheader';
      Header.innerHTML= '<span>Paramétrage du sobriquet</span>';
      Box.appendChild(Header);
      
      // Description des paramétres
      var Description = document.createElement('p');
      Description.innerHTML  = "Choisissez un sobriquet automatique ou créez votre propre sobriquet.<br>";
      Description.innerHTML += "Laissez vide le champ sobriquet pour utiliser un sobriquet automatique.";
      Box.appendChild(Description);

      // Crée les bouttons de gestion de la boite
      var button_list = [
          {'name': 'Annuler', 'action': Sobriquet.paramCancel,'icon': "gfx/icons/small_fight.gif" },
          {'name': 'Supprimer', 'action': Sobriquet.paramDelete, 'icon': "gfx/forum/smiley/h_calim.gif" },
          {'name': 'Appliquer', 'action': Sobriquet.paramApply, 'icon': Sobriquet.options.icon },
      ];
      for(i in button_list) {
          var Button = document.createElement('a');
          Button.setAttribute('class', 'button');
          Button.setAttribute('href',  '#');
          Button.innerHTML = '<img src="' + button_list[i].icon + '" /> <span>' + button_list[i].name + '</span>';
          
          // Evenement lors du click sur le bouton
          (function() {
              var element = Button;
              var func = button_list[i].action;
              element.addEventListener('click', function(event) {
                  event.preventDefault();
                  func();
              }, false);
          })();
          
          Box.appendChild(Button);
      }
      
      Box.appendChild(htmltool.divClear());
      
      // Emplacement pour le formulaire
      var FormDiv = document.createElement('div');
      FormDiv.setAttribute('class','params');
      Box.appendChild(FormDiv);

      // Formulaire
      var Form = document.createElement('form');
      Form.className='form';
      FormDiv.appendChild(Form);
      
      // Liste déroulante
      var Line = document.createElement('div'); 
      Line.className = 'row';
      
      var Label= document.createElement('label');
      Label.innerHTML = 'Sobriquet :';
      Line.appendChild(Label);
      
      var Select = document.createElement('select');
      Select.name = Sobriquet.INSTALL_MARK_ID +"_select";
      Line.appendChild(Select);
      Sobriquet.ParamSelected = Select;
      
      // Ajoute les éléments a la liste
      for(var id in Sobriquet.sob_auto) {
          var Option = document.createElement('option');
          Option.value = id;
          Option.innerHTML = Sobriquet.sob_auto[id];
          Option.selected = (id == pseudo_values.sob_index);
          
          if(id.substr(0, 1) == 'G')  // Good title, green font
              Option.setAttribute('style', 'background-color: green;');
          else if(id.substr(0, 1) == 'B') // Bad title, red font
              Option.setAttribute('style', 'background-color: #D81414');
          
          Select.appendChild(Option);
      }
      
      Form.appendChild(Line);
      
      // Ajout du champ sobriquet personalisé
      var Line = document.createElement('div'); 
      Line.className = 'row';
      
      var Label= document.createElement('label');
      Label.innerHTML = 'Autre :';
      Line.appendChild(Label);
      
      var Input = document.createElement('input');
      Input.className = 'field';
      Input.maxlength = 60;
      Input.setAttribute('style', 'width:280px');
      Input.value = pseudo_values.sob_perso;
      
      Line.appendChild(Input);
      Sobriquet.ParamInputField = Input;
      
      // Bouton random
      var Random = document.createElement('a');
      Random.className = 'button';
      Random.setAttribute('style', 'float:none; display:inline; width:110px !important; margin-left:5px;');
      Random.href = '#';
      Random.innerHTML = "Aléatoire";
      
      Random.addEventListener('click', function(e) {
          e.preventDefault();
          Sobriquet.randomTitle();
      }, false);
      
      Line.appendChild(Random);
      
      Form.appendChild(Line);

      // Ajout du champ avatar personalisé
      var Line = document.createElement('div'); 
      Line.className = 'row';
      
      var Label= document.createElement('label');
      Label.innerHTML = 'Avatar :';
      Line.appendChild(Label);
      
      var Input = document.createElement('input');
      Input.className = 'field';
      Input.setAttribute('style', 'width:280px');
      Input.value = pseudo_values.avatar;
      
      Line.appendChild(Input);
      Sobriquet.ParamAvatarField = Input;
      
      Form.appendChild(Line);
      
      Box.appendChild(FormDiv);
      Sobriquet.ParamBox.appendChild(Box);
      
      // Supprime la boite d'option si elle est deja la
      var OldBox = $(Sobriquet.ParamBox.id);
      if (OldBox != null)
          OldBox.parentNode.removeChild(OldBox);
      
      MainNode.insertBefore(Sobriquet.ParamBox, MainNode.firstChild);
  },
  
  // Ferme la boite de paramétrage
  paramCancel: function paramCancel() {
      if ($(Sobriquet.ParamBox.id))
          Sobriquet.ParamBox.className = '';
      
      $('body').className = '';
      
      if( pagedetect.isPage('AnySoul') )
          // Met a jour la page d'âme
          Sobriquet.addTitleToSoul();
      else
          // Met a jour les messages
          Sobriquet.syncThread();
  },
  
  // Supprime le sobriquet sur la personne
  paramDelete: function paramDelete() {
      for(var target in Sobriquet.mod_target) {
          if(target == Sobriquet.param_pseudo) {
              delete Sobriquet.mod_target[target];
              break;
          }
      }
      
      // Sauvegarde la nouvelle configuration
      Sobriquet.saveParam();
      
      Sobriquet.paramCancel();
  },
  
  // Applique les modifications
  paramApply: function paramApply() {
      // Code de titre automatique
      var code = Sobriquet.ParamSelected.childNodes[ Sobriquet.ParamSelected.selectedIndex ].value;
      
      Sobriquet.mod_target[Sobriquet.param_pseudo] = { 
          'sob_index': code, 
          'sob_perso': Sobriquet.ParamInputField.value,
          'avatar': Sobriquet.ParamAvatarField.value
      };
      
      // Sauvegarde la nouvelle configuration
      Sobriquet.saveParam();
      
      Sobriquet.paramCancel();
  },
  
  // Génére un titre aléatoire
  randomTitle: function randomTitle() {
      // Fonction utilitaire qui applique un genre (0=masc, 1=fem) à une valeur du type "gentil|~le"
      function applyGender(val, gender) {
          if(val.indexOf('|') == -1) return val; // unisexe !
          
          var genders = val.split('|');
          val = genders[gender];
          if(val[0] == '~') // Pour le féminin: "gentil|~le" => "gentille"
              val = genders[0] + genders[1].substr(1);
          
          return val;
      }
      
      // Les données composant le sobriquet final
      var data = [];
      
      // Quel pattern ?
      var pattern = any(Sobriquet.sob_random.pattern);
      
      var gender = null; // genre du sobriquet (pour accorder l'adj)
      for(var c=0; c<pattern.length; c++) {
          switch(pattern[c]) {
              case 'N': // Nom affecté au joueur
              case 'T': // Titre affecté au joueur
                  var field; // le champ de Sobriquet.sob_random dans lequel prendre le nom
                  if(pattern[c] == 'N') field = 'name';
                  else if(pattern[c] == 'T') field = 'title';
                  
                  var val;
                  if(gender == null) { // genre non défini
                      gender = randInt(1); // Définit un nouveau genre
                      var valp = any(Sobriquet.sob_random[field]);
                      val = applyGender(valp, gender);
                      if(val == '') { // ce genre est impossible !!
                          gender ^= 1; // change de genre
                          val = applyGender(valp, gender);
                      }
                  } else { // genre déja défini
                      do {
                          var valp = any(Sobriquet.sob_random[field]);
                          val = applyGender(valp, gender);
                      } while(val == ''); // val n'a pas ce genre => choisit une autre val (ne change pas le genre)
                  }
                  
                  data.push(val);
                  break;
              
              case 'A': // Adjectif (s'applique au nom ou au titre qui le précède)
                  var pos = randInt(1); // position de l'adj (0 = avant le nom, 1 = après)
                  var adjp = any(Sobriquet.sob_random.adj);
                  if(adjp[0] == '-') { // se place toujours après le nom
                      pos = 1;
                      adjp = adjp.substr(1);
                  } else if(adjp.substr(-1) == '-') { // se place toujours avant
                      pos = 0;
                      adjp = adjp.substr(0, adjp.length-1);
                  }
                  adj = applyGender(adjp, gender); // tous les adjectifs supportent tous les genres
                  
                  if(pos == 1)
                      data.push(adj); // après la val précédente
                  else
                      data.splice(data.length-1, 0, adj); // avant la val précédente
                  break;
              
              case '&': // locution de ou d' (ou de son|sa ?)
                  data.push('&'); // résolu plus tard (pour l'accord)
                  break;
          }
      }
      
      // Gère l'accord de la locution
      for(var i=0; i<data.length; i++) {
          if(data[i] == '&') {
              var fl = data[i+1][0].toLowerCase(); // première lettre de la valeur suivante
              if("aeiouy".indexOf(fl) != -1) // voyelle ?
                  data[i] = "d'";//data[i] = any(['d\'', 'en', 'à']);
              else
                  data[i] = 'de';//any(['de', 'en', 'à']);
          }
      }
      
      // Assemble le tout
      var full_title = data.join(' ');
      full_title = full_title.replace("' ","'"); // d' abruti => abruti
      // 1er caractère en majuscule
      full_title = full_title[0].toUpperCase() + full_title.substr(1);
      
      Sobriquet.ParamInputField.value = full_title;
  },
  
  // Sauvegarde la configuration actuelle
  saveParam: function saveParam() {
      Sobriquet.db.set("mod_target", Sobriquet.mod_target);
  },
  
  // Charge les couples pseudo/sobriquet
  loadParam: function loadParam() {
      Sobriquet.mod_target = Sobriquet.db.get("mod_target", {});
  },
  
  // Ajoute la distinction perso à la liste des distinctions
  addTitleToSoul: function addTitleToSoul() {
      var special_tip_content = "<h2>Sobriquet</h2>Distinction ajoutée par le module Sobriquet du DGM";
      Sobriquet.debug(Sobriquet.param_pseudo);
      // Si on doit appliquer un sobriquet particulier
      if(Sobriquet.isTarget(Sobriquet.param_pseudo) && 
        (Sobriquet.mod_target[Sobriquet.param_pseudo].sob_index != 'N00' ||
         Sobriquet.mod_target[Sobriquet.param_pseudo].sob_perso != "")) {
          special_tip_content += "<p><em>Cliquez pour modifier ce titre...</em></p>";
          
          // Récupére le sobriquet a appliquer
          var title = "";
          if(Sobriquet.mod_target[Sobriquet.param_pseudo].sob_perso != "")
              title = Sobriquet.mod_target[Sobriquet.param_pseudo].sob_perso;
          else
              title = Sobriquet.sob_auto[Sobriquet.mod_target[Sobriquet.param_pseudo].sob_index];
      }
      // Sinon, message par défaut
      else {
          special_tip_content += "<p><em>Cliquez pour ajouter un titre...</em></p>";
          
          var title = "Ajouter une distinction";
      }
      
      // Liste des distinctions
      var TitleList = $xpath("//div[contains(@class,'tid_title')]/span", document);
      
      // Crée le nouveau titre
      var NewTitle = document.createElement('span');
      NewTitle.setAttribute('id', "sobriquet_title_id");
      NewTitle.innerHTML = "<a href='#' onmouseover=\"js.HordeTip.showSpecialTip(this,'helpTip','', '" + special_tip_content + "');\" onmouseout=\"js.HordeTip.hide()\">" +
          '<img class="icon" src="'+Sobriquet.options.icon+'" alt="icon" title=""> ' +
          '<span class="dgm_sobriquet">«&nbsp;' + title + '&nbsp;»</span></a>&nbsp;';
      
      // Au clic, afficher la boite de parametrage du sobriquet
      NewTitle.firstChild.addEventListener('click', function(e) {
          e.preventDefault();
          Sobriquet.showParamBox();
      }, false);
      
      // Suprimme le titre en place pour rajouter une eventuelle modification
      var OldTitle = $(NewTitle.id);
      if (OldTitle != null)
          OldTitle.parentNode.removeChild(OldTitle);
      
      // Ajoute le sobriquet aux distinctions
      TitleList.insertBefore(NewTitle, TitleList.firstChild);
      
      // Si on est pas sur notre propre page d'âme
      if(Sobriquet.param_pseudo != hortool.getMyPseudo()) {
          // Titre sous le pseudo
          var MainTitle = $xpath("//div[@class='guser']/div[@class='banner']/div[@class='side']/em", document);
          if(MainTitle == null) {
              // On crée un titre par défaut
              var ParentMainTitle = $xpath("//div[@class='guser']/div[@class='banner']/div[@class='side']", document);
              
              MainTitle = document.createElement('em');
              MainTitle.innerHTML = '<img>  ';
              ParentMainTitle.appendChild(MainTitle);
          }
          
          // Récupére le titre original
          if(MainTitle.innerHTML.indexOf("<strike>") > -1)
              MainTitle.innerHTML = MainTitle.innerHTML.replace(new RegExp("(.*) <strike>(.*)</strike>.*"), "$1 $2");
          
          // S'il n'y avait pas de titre original
          if(MainTitle.innerHTML.replace(new RegExp("<.*> (.*)"), "$1").length <= 1)
              MainTitle.innerHTML = '<img>  ';
          
          // On ajoute le nouveau titre en regard du titre original
          if(title != "Ajouter une distinction")
              MainTitle.innerHTML = MainTitle.innerHTML.replace(new RegExp("(<.*>) (.*)"), '<img src="' + Sobriquet.options.icon + '"> <strike>$2</strike> ' + title);
      }
      
    // Remplacement de l'avatar
    var DivAvatar = $xpath("//div[@class='tid_twinoidAvatar']", document);
    var Avatar = $xpath("//img[@class='tid_avatarImg']", DivAvatar);
    var OldAvatar = $('old_avatar_id');
    Sobriquet.debug("Avatar récupéré");
    if(OldAvatar == null) {
        // Si la personne n'a pas d'avatar, on l'ajoute
        if(Avatar == null) {
            var Avatar = document.createElement('img');
            Avatar.setAttribute('src', '');
            DivAvatar.appendChild(Avatar);
            Sobriquet.debug("Avatar créés");
        }

        // Cache l'ancien avatar
        OldAvatar = Avatar.cloneNode(true);
        OldAvatar.setAttribute('id', 'old_avatar_id');;
        OldAvatar.style.display = "none";
        DivAvatar.appendChild(OldAvatar);
        Sobriquet.debug("OldAvatar créés");
    }

    // Si l'avatar ne doit pas être remplacé
    if(!Sobriquet.isTarget(Sobriquet.param_pseudo) || Sobriquet.mod_target[Sobriquet.param_pseudo].avatar == "") {
        // Cache le nouvel avatar
        OldAvatar.style.display = "block";
        Avatar.style.display = "none";
        Sobriquet.debug("s1");
    } else {
        // Cache l'ancien avatar
        OldAvatar.style.display = "none";
        Avatar.style.display = "block";
        Sobriquet.debug("s2");

        Avatar.setAttribute('src', escapeStr(Sobriquet.mod_target[Sobriquet.param_pseudo].avatar, "'\""));
    }
},

    addTeamMemberMedal: function addTeamMemberMedal(amsg){ // ! doit être ré-entrant à cause du sync
        var medal= Sobriquet.devTeamMedals[ amsg.pseudo ];
        if ( ! medal )
            return false;
        if ( amsg.sobTitleNode ) // suppression de la distinction sobriquet déjà posée
            amsg.sobTitleNode.parentNode.removeChild( amsg.sobTitleNode );
        if ( amsg.titleNode ) // masquer la distinction d'origine
            amsg.titleNode.style.display = "none"; 
        // Ajout de la nouvelle distinction :)
        amsg.sobTitleNode= Sobriquet.buildGenTitle(medal.img, medal.title, Sobriquet.DEV_TEAM_TIP );
        amsg.authorNode.appendChild(amsg.sobTitleNode);
        return true;
    },
});


Dispatcher.main();
