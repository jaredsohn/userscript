// ==UserScript==
// @name		OGame ResGestion
// @namespace	Brom19
// @description	Aide à la gestion des ressources.
// @version		14.04.06
// @author		Brom19
// @updateURL	http://userscripts.org/scripts/source/176938.meta.js
// @downloadURL	https://userscripts.org/scripts/source/176938.user.js
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_deleteValue
// @grant		GM_getResourceURL
// @grant		GM_xmlhttpRequest
// @grant		GM_log
// @include		http://*.ogame.*/game/*
// ==/UserScript==


/******************************* Paramètres Personnalisable *******************************/

//Intervale de mise à jour des ressources à quai (en ms):
var interval = 999;

//Nombre maxi d'éléments dans "Cout":
var imax = 5;

//Met en évidence quand les hangars seront plein dans moins de X heures:
var tpsAlert = 24;

//Réduit la hauteur de l'image de la planète:
var minHeader = false;



//******************************* Ne rien modifier après *******************************/

//Production de base de métal:
var mBase = 30;

//Production de base de cristal:
var cBase = 15;

var Fret_GT = 25000;
var Fret_PT = 5000;

var Nom = {
    mmet: 'Mine de m&eacute;tal',
    mcri: 'Mine de cristal',
    mdet: 'Synth&eacute; de deut',
    ces: 'CE Solaire',
    cef: 'CE de Fusion',
    hmet: 'Hangar de m&eacute;tal',
    hcri: 'Hangar de cristal',
    hdet: 'R&eacute;servoir de deut',
    cmet: 'Cachette de m&eacute;tal',
    ccri: 'Cachette de cristal',
    cdet: 'Cachette de deut',
    
    rob: 'Usine de robots',
    cspa: 'Chantier spatial',
    lab: 'Labo. de recherche',
    depo: 'D&eacute;p&ocirc;t ravitail.',
    silo: 'Silo de missiles',
    nan: 'Usine de nanites',
    ter: 'Terraformeur',
    base: 'Base lunaire',
    phal: 'Phalange de capteur',
    port: 'Porte de saut',
    
    ener: 'Techno Energie',
    lase: 'Techno Laser',
    ions: 'Techno Ions',
    hype: 'Techno Hyperespace',
    plas: 'Techno Plasma',
    comb: 'R&eacute;acteur à combustion',
    impu: 'R&eacute;acteur à impulsion',
    phyp: 'Propulsion hyperespace',
    espi: 'Techno Espionnage',
    ordi: 'Techno Ordinateur',
    astro: 'Astrophysique',
    rese: 'R&eacute;seau de recherche',
    grav: 'Techno Graviton',
    arme: 'Techno Armes',
    bouc: 'Techno Bouclier',
    prot: 'Protection des vaisseaux',
    
    pt: 'Petit transporteur',
    gt: 'Grand transporteur',
    cle: 'Chasseur l&eacute;ger',
    clo: 'Chasseur lourd',
    crois: 'Croiseur',
    vb: 'Vaisseau de bataille',
    vc: 'Vaisseau de colonisation',
    rec: 'Recycleur',
    esp: 'Sonde d&#39;espionnage',
    bomb: 'Bombardier',
    ss: 'Satellite solaire',
    dest: 'Destructeur',
    edlm: 'Etoile de la mort',
    traq: 'Traqueur',
    
    lm: 'Lanceur de missiles',
    lle: 'Artillerie laser l&eacute;g&egrave;re',
    llo: 'Artillerie laser lourde',
    gauss: 'Canon de Gauss',
    ion: 'Artillerie à ions',
    pla: 'Lanceur de plasma',
    pb: 'Petit bouclier',
    gb: 'Grand bouclier',
    mic: 'Missile d&#39;interception',
    mip: 'Missile Interplan&eacute;taire',
    
    vol: 'En Transit'};

var BatRes = ['mmet', 'mcri', 'mdet', 'ces', 'cef', 'ss', 'hmet', 'hcri', 'hdet', 'cmet', 'ccri', 'cdet'];
var BatIns = ['rob', 'cspa', 'lab', 'depo', 'silo', 'nan', 'ter', 'base', 'phal', 'port'];
var AllRech = ['ener', 'lase', 'ions', 'hype', 'plas', 'comb', 'impu', 'phyp', 'espi', 'ordi', 'astro', 'rese', 'grav', 'arme', 'bouc', 'prot'];
var Defense = ['lm', 'lle', 'llo', 'gauss', 'ion', 'pla', 'pb', 'gb', 'mic', 'mip'];
var Vaisseau = ['cle','clo','crois','vb','traq','bomb','dest','edlm','pt','gt','vc','rec','esp'];

var url, serveurUni, exporter, Param, limite;
var TxM, TxC, TxD, MpH, CpH, DpH, RefID;

url = location.href;
serveurUni = url.split('/')[2];

/*************
 * Fonctions *
 *************/


/******************************* Google Chrome *******************************/

if (!GM_getValue) {
    function GM_getValue(key, defaultVal) {
        var retValue = localStorage.getItem(key);
        if (!retValue) {
            return defaultVal;
        }
        return retValue;
    }
    
    function GM_setValue(key, value) {
        localStorage.setItem(key, value);
    }
}



/******************************* String -> Nombre Entier *******************************/

function numI(val) {
    val = '0' + val;
    if (isNaN(val))	{
        val = val.replace(/[^0]-/g, "");
        val = val.replace("0-", "-");
        val = val.replace(/[^0-9\-]/g, "");
        if (val == "")	{
            val = 0;
        }
    }
    return parseInt(val, 0);
}



/******************************* String -> Nombre Float *******************************/

function numF(val) {
    if (isNaN(val))	{
        val = '0' + val;
        val = val.replace(",", ".");
        val = val.replace(/[^0]-/g, "");
        val = val.replace("0-", "-");
        val = val.replace(/[^0-9\-\.]/g, "");
        if (val == "")	{
            val = 0;
        }
    }
    val = (parseInt(val * 100, 0) / 100);
    return Number(val);
}



/******************************* Séparateur de milliers *******************************/

function sepaMille(nombre) {
    var signe = '',
        str, n;
    nombre = numI(nombre);
    if (nombre < 0) {
        nombre = Math.abs(nombre);
        signe = '-';
    }
    if (nombre == 0) {
        str = ".";
    } else if(nombre>999)	{
        str = nombre.toString();
        n = str.length;
        str = signe + (((n % 3) ? str.substr(0, n % 3) + ' ' : '') + str.substr(n % 3).match(/[0-9]{3}/g).join(' '));
    } else	{
        str = signe + nombre;
    }
    return str;
}



/******************************* Temps en J H M *******************************/

function conv_tps(val) {
    var txt = "", signe = '', J, H, M;
    if (val == Infinity) {
        txt = "Infini";
    } else	{
        if (val < 0) {
            signe = '-';
            val = Math.abs(val);
        }
        J = Math.floor(val / 24);
        H = Math.floor(val % 24);
        M = Math.ceil(60 * ((val % 24) - H));
        
        if (H == 24) {
            H = 0;
            J++;
        }
        if (M == 60) {
            M = 0;
            H++;
        }
        
        if (J != 0)	{
            txt += J + "j&nbsp;";
        }
        if (H != 0)	{
            txt += H + "h&nbsp;";
        }
        if (M != 0)	{
            txt += M + "m";
        }
        txt = (txt) ? signe + txt : "0m";
    }
    return txt;
}



/******************************* Format date *******************************/

function form_date(d) {
    return (d.getDate() + "/" + (d.getMonth() + 1) + " à " + d.getHours() + ":" + (d.getMinutes() + 1));
}



/******************************* Coloration nombre +/- *******************************/

function conv_nbr(nb, color) {
    nb = Math.round(nb);
    var txt = "<span>";
    if (color == "-")	{
        nb = -nb;
    }
    
    if (nb == 0) {
        txt = 0;
    } else {
        if (color)	{
            txt = ((nb >= 0) ? "<span style='color: green;'>+" : "<span style='color: red;'>");
        }
        txt+= sepaMille(nb) + "</span>";
    }
    return txt;
}



/******************************* Ordonne dans l'ordre croissant *******************************/

function croissant(a, b) {
    if (a > b)	{
        return 1;
    }
    if (a < b)	{
        return -1;
    }
    return 0;
}



/******************************* Cout de construction *******************************/

function cout2(bat, lvl) {
    var Qte_Met, Qte_Cri, Qte_Deu;
    
    switch (bat) {
            /*
             * Batiments
             */
        case "MM":
            //"Mine de Métal",
        case "mmet":
            Qte_Met = Math.floor(60 * Math.pow(1.5, lvl - 1));
            Qte_Cri = Math.floor(15 * Math.pow(1.5, lvl - 1));
            Qte_Deu = 0;
            break;
        case "MC":
            //"Mine de Cristal",
        case "mcri":
            Qte_Met = Math.floor(48 * Math.pow(1.6, lvl - 1));
            Qte_Cri = Math.floor(24 * Math.pow(1.6, lvl - 1));
            Qte_Deu = 0;
            break;
        case "SD":
            //"Synthetiseur de Deuterium",
        case "mdet":
            Qte_Met = Math.floor(225 * Math.pow(1.5, lvl - 1));
            Qte_Cri = Math.floor(75 * Math.pow(1.5, lvl - 1));
            Qte_Deu = 0;
            break;
        case "CES":
            //"Centrale Electrique Solaire",
        case "ces":
            Qte_Met = Math.floor(75 * Math.pow(1.5, lvl - 1));
            Qte_Cri = Math.floor(30 * Math.pow(1.5, lvl - 1));
            Qte_Deu = 0;
            break;
        case "CEF":
            //"Centrale Electrique de Fusion",
        case "cef":
            Qte_Met = Math.floor(900 * Math.pow(1.8, lvl - 1));
            Qte_Cri = Math.floor(360 * Math.pow(1.8, lvl - 1));
            Qte_Deu = Math.floor(180 * Math.pow(1.8, lvl - 1));
            break;
        case "UR":
            //"Usine de robots",
        case "rob":
            Qte_Met = Math.floor(400 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(120 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(200 * Math.pow(2, lvl - 1));
            break;
        case "UN":
            //"Usine de nanites",
        case "nan":
            Qte_Met = Math.floor(1000000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(500000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(100000 * Math.pow(2, lvl - 1));
            break;
        case "CS":
            //"Chantier spatial",
        case "cspa":
            Qte_Met = Math.floor(400 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(200 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(100 * Math.pow(2, lvl - 1));
            break;
        case "HM":
            //"Hangar de Métal",
        case "hmet":
            Qte_Met = Math.floor(2000 * Math.pow(2, lvl - 1));
            Qte_Cri = 0;
            Qte_Deu = 0;
            break;
        case "HC":
            //"Hangar de cristal",
        case "hcri":
            Qte_Met = Math.floor(2000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(1000 * Math.pow(2, lvl - 1));
            Qte_Deu = 0;
            break;
        case "RD":
            //"Reservoir de deuterium",
        case "hdet":
            Qte_Met = Math.floor(2000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(2000 * Math.pow(2, lvl - 1));
            Qte_Deu = 0;
            break;
        case "LR":
            //"Laboratoire de recherche",
        case "lab":
            Qte_Met = Math.floor(200 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(400 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(200 * Math.pow(2, lvl - 1));
            break;
        case "DR":
            //"Depot de ravitaillement",
        case "depo":
            Qte_Met = Math.floor(20000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(40000 * Math.pow(2, lvl - 1));
            Qte_Deu = 0;
            break;
        case "T":
            //"Terraformeur",
        case "ter":
            Qte_Met = 0;
            Qte_Cri = Math.floor(50000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(100000 * Math.pow(2, lvl - 1));
            break;
        case "SM":
            //"Silo de missiles",
        case "silo":
            Qte_Met = Math.floor(20000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(20000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(1000 * Math.pow(2, lvl - 1));
            break;
        case "BL":
            //"Base lunaire",
        case "base":
            Qte_Met = Math.floor(20000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(40000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(20000 * Math.pow(2, lvl - 1));
            break;
        case "PC":
            //"Phalange de capteur",
        case "phal":
            Qte_Met = Math.floor(20000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(40000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(20000 * Math.pow(2, lvl - 1));
            break;
        case "PSS":
            //"Porte de saut spatial",
        case "port":
            Qte_Met = Math.floor(2000000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(4000000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(2000000 * Math.pow(2, lvl - 1));
            break;
            
            /*
             * Recherches
             */
            
        case "TEs":
            //"Technologie Espionnage",
        case "espi":
            Qte_Met = Math.floor(200 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(1000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(200 * Math.pow(2, lvl - 1));
            break;
        case "TO":
            //"Technologie Ordinateur",
        case "ordi":
            Qte_Met = 0; //1/2 - 1
            Qte_Cri = Math.floor(400 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(600 * Math.pow(2, lvl - 1));
            break;
        case "AS":
            //"Astrophysique",
        case "astro":
            Qte_Met = Math.floor(4000 * Math.pow(1.75, lvl - 1));
            Qte_Cri = Math.floor(8000 * Math.pow(1.75, lvl - 1));
            Qte_Deu = Math.floor(4000 * Math.pow(1.75, lvl - 1));
            break;
        case "TA":
            //"Technologie Armes",
        case "arme":
            Qte_Met = Math.floor(800 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(200 * Math.pow(2, lvl - 1));
            Qte_Deu = 0;
            break;
        case "TB":
            //"Technologie Bouclier",
        case "bouc":
            Qte_Met = Math.floor(200 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(600 * Math.pow(2, lvl - 1));
            Qte_Deu = 0;
            break;
        case "TPV":
            //"Technologie Protection des vaisseaux spatiaux",
        case "prot":
            Qte_Met = Math.floor(1000 * Math.pow(2, lvl - 1));
            Qte_Cri = 0;
            Qte_Deu = 0;
            break;
        case "TEn":
            //"Technologie Energie",
        case "ener":
            Qte_Met = 0;
            Qte_Cri = Math.floor(800 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(400 * Math.pow(2, lvl - 1));
            break;
        case "TH":
            //"Technologie Hyperespace",
        case "hype":
            Qte_Met = 0; //1/2 - 1
            Qte_Cri = Math.floor(4000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(2000 * Math.pow(2, lvl - 1));
            break;
        case "RC":
            //"Réacteur à combustion",
        case "comb":
            Qte_Met = Math.floor(400 * Math.pow(2, lvl - 1));
            Qte_Cri = 0;
            Qte_Deu = Math.floor(600 * Math.pow(2, lvl - 1));
            break;
        case "RI":
            //"Réacteur à impulsion",
        case "impu":
            Qte_Met = Math.floor(2000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(4000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(600 * Math.pow(2, lvl - 1));
            break;
        case "PH":
            //"Propulsion hyperespace",
        case "phyp":
            Qte_Met = Math.floor(10000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(20000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(6000 * Math.pow(2, lvl - 1));
            break;
        case "TL":
            //"Technologie Laser",
        case "lase":
            Qte_Met = Math.floor(200 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(100 * Math.pow(2, lvl - 1));
            Qte_Deu = 0;
            break;
        case "TI":
            //"Technologie Ions",
        case "ions":
            Qte_Met = Math.floor(1000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(300 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(100 * Math.pow(2, lvl - 1));
            break;
        case "TP":
            //"Technologie Plasma",
        case "plas":
            Qte_Met = Math.floor(2000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(4000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(1000 * Math.pow(2, lvl - 1));
            break;
        case "RRI":
            //"Réseau de recherche intergalactique",
        case "rese":
            Qte_Met = Math.floor(240000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(400000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(160000 * Math.pow(2, lvl - 1));
            break;
        case "TEx":
            //"Technologie Expéditions",
        case "expe":
            Qte_Met = Math.floor(2000 * Math.pow(2, lvl - 1));
            Qte_Cri = Math.floor(4000 * Math.pow(2, lvl - 1));
            Qte_Deu = Math.floor(2000 * Math.pow(2, lvl - 1));
            break;
        case "TG":
            //"Technologie Graviton",
        case "grav":
            Qte_Met = 0;
            Qte_Cri = 0;
            Qte_Deu = 0;
            break;
            
            /*
             * Defenses
             */
        case "lm":
            Qte_Met = lvl * 2000;
            Qte_Cri = 0;
            Qte_Deu = 0;
            break;
        case "lle":
            Qte_Met = lvl * 1500;
            Qte_Cri = lvl * 500;
            Qte_Deu = 0;
            break;
        case "llo":
            Qte_Met = lvl * 6000;
            Qte_Cri = lvl * 2000;
            Qte_Deu = 0;
            break;
        case "gauss":
            Qte_Met = lvl * 20000;
            Qte_Cri = lvl * 15000;
            Qte_Deu = lvl * 2000;
            break;
        case "ion":
            Qte_Met = lvl * 2000;
            Qte_Cri = lvl * 6000;
            Qte_Deu = 0;
            break;
        case "pla":
            Qte_Met = lvl * 50000;
            Qte_Cri = lvl * 50000;
            Qte_Deu = lvl * 30000;
            break;
        case "pb":
            Qte_Met = lvl * 10000;
            Qte_Cri = lvl * 10000;
            Qte_Deu = 0;
            break;
        case "gb":
            Qte_Met = lvl * 50000;
            Qte_Cri = lvl * 50000;
            Qte_Deu = 0;
            break;
        case "mic":
            Qte_Met = lvl * 8000;
            Qte_Cri = 0;
            Qte_Deu = lvl * 2000;
            break;
        case "mip":
            Qte_Met = lvl * 12500;
            Qte_Cri = lvl * 2500;
            Qte_Deu = lvl * 10000;
            break;
            
            /*
             * Vaisseaux
             */
        case "pt":
            Qte_Met = lvl * 2000;
            Qte_Cri = lvl * 2000;
            Qte_Deu = 0;
            break;
        case "gt":
            Qte_Met = lvl * 6000;
            Qte_Cri = lvl * 6000;
            Qte_Deu = 0;
            break;
        case "cle":
            Qte_Met = lvl * 3000;
            Qte_Cri = lvl * 1000;
            Qte_Deu = 0;
            break;
        case "clo":
            Qte_Met = lvl * 6000;
            Qte_Cri = lvl * 4000;
            Qte_Deu = 0;
            break;
        case "crois":
            Qte_Met = lvl * 20000;
            Qte_Cri = lvl * 7000;
            Qte_Deu = lvl * 2000;
            break;
        case "vb":
            Qte_Met = lvl * 45000;
            Qte_Cri = lvl * 15000;
            Qte_Deu = 0;
            break;
        case "vc":
            Qte_Met = lvl * 10000;
            Qte_Cri = lvl * 20000;
            Qte_Deu = lvl * 10000;
            break;
        case "rec":
            Qte_Met = lvl * 10000;
            Qte_Cri = lvl * 6000;
            Qte_Deu = lvl * 2000;
            break;
        case "esp":
            Qte_Met = 0;
            Qte_Cri = lvl * 1000;
            Qte_Deu = 0;
            break;
        case "bomb":
            Qte_Met = lvl * 50000;
            Qte_Cri = lvl * 25000;
            Qte_Deu = lvl * 15000;
            break;
        case "ss":
            Qte_Met = 0;
            Qte_Cri = lvl * 2000;
            Qte_Deu = lvl * 500;
            break;
        case "dest":
            Qte_Met = lvl * 60000;
            Qte_Cri = lvl * 50000;
            Qte_Deu = lvl * 15000;
            break;
        case "edlm":
            Qte_Met = lvl * 5000000;
            Qte_Cri = lvl * 4000000;
            Qte_Deu = lvl * 1000000;
            break;
        case "traq":
            Qte_Met = lvl * 30000;
            Qte_Cri = lvl * 40000;
            Qte_Deu = lvl * 15000;
            break;
            
        default:
            Qte_Met = Qte_Cri = Qte_Deu = 0;
    }
    if (lvl <= 0)	{
        Qte_Met = Qte_Cri = Qte_Deu = 0;
    }
    
    this.met = Qte_Met;
    this.cri = Qte_Cri;
    this.deu = Qte_Deu;
}



/******************************* Style <table> *******************************/

function styleperso(baliseID) {
    var balise = ["td", "th"],
        j, i, limite;
    for (j=0;j<balise.length;j++)	{
        limite = document.getElementById(baliseID).getElementsByTagName(balise[j]);
        for (i = 0; i < limite.length; i++) {
            limite[i].style.border = "thin solid #222222";
            if (balise[j] == "td")	{
                limite[i].style.textAlign = "right";
            }
        }
    }
}



/******************************* Calcul du cadre d'obtention... *******************************/

function calcul() {
    //Taux commercial:
    var TxM = numF(document.getElementById("TxM").value),
        TxC = numF(document.getElementById("TxC").value),
        TxD = numF(document.getElementById("TxD").value),
        MpH, CpH, DpH, MCpH, MDpH, CDpH, TpH, 
        Ini_M, Ini_C, Ini_D, Ini_MC, Ini_MD, Ini_CD, Ini_T,
        But_M, But_C, But_D, But_MC, But_MD, But_CD, But_T, Tps_X,
        Dif_M, Dif_C, Dif_D, Dif_MC, Dif_MD, Dif_CD, Dif_T,
        Tps_Dif_M, Tps_Dif_C, Tps_Dif_D, Tps_Dif_MC, Tps_Dif_MD, Tps_Dif_CD, Tps_Dif_T,
        last, table, now, tempo, i, tmp,
        Def_M, Def_C, Def_D, Def_T, Add_M, Add_C, Add_D, Ref, aff, RefID;
    
    //Ressource de référence
    if (document.getElementsByName("Ref")[0].checked) {
        Ref = TxM;
        RefID = 0;
        aff = "M&eacute;tal";
        document.getElementById("Def_M").style.display = "none";
        document.getElementById("Def_M").value = 0;
        document.getElementById("Def_C").style.display = "inline";
        document.getElementById("Def_D").style.display = "inline";
    } else if (document.getElementsByName("Ref")[1].checked) {
        Ref = TxC;
        RefID = 1;
        aff = "Cristal";
        document.getElementById("Def_M").style.display = "inline";
        document.getElementById("Def_C").style.display = "none";
        document.getElementById("Def_C").value = 0;
        document.getElementById("Def_D").style.display = "inline";
    } else {
        Ref = TxD;
        RefID = 2;
        aff = "Deut&eacute;rium";
        document.getElementById("Def_M").style.display = "inline";
        document.getElementById("Def_C").style.display = "inline";
        document.getElementById("Def_D").style.display = "none";
        document.getElementById("Def_D").value = 0;
    }
    
    //Production horaire:
    MpH = numI(document.getElementById("MpH").value);
    CpH = numI(document.getElementById("CpH").value);
    DpH = numI(document.getElementById("DpH").value);
    MCpH = MpH * Ref / TxM + CpH * Ref / TxC;
    MDpH = MpH * Ref / TxM + DpH * Ref / TxD;
    CDpH = CpH * Ref / TxC + DpH * Ref / TxD;
    
    TpH = MpH * Ref / TxM + CpH * Ref / TxC + DpH * Ref / TxD;
    document.getElementById("Prod_Total").innerHTML = conv_nbr(TpH);
    
    //Qté de départ:
    Ini_M = numI(document.getElementById("Ini_M").value) + numI(document.getElementById("Add_M").value);
    Ini_C = numI(document.getElementById("Ini_C").value) + numI(document.getElementById("Add_C").value);
    Ini_D = numI(document.getElementById("Ini_D").value) + numI(document.getElementById("Add_D").value);
    Ini_MC = Ini_M * Ref / TxM + Ini_C * Ref / TxC;
    Ini_MD = Ini_M * Ref / TxM + Ini_D * Ref / TxD;
    Ini_CD = Ini_C * Ref / TxC + Ini_D * Ref / TxD;
    
    Ini_T = Ini_M * Ref / TxM + Ini_C * Ref / TxC + Ini_D * Ref / TxD;
    document.getElementById("Ini_Total").innerHTML = conv_nbr(Ini_T);
    
    //Qté recherchée:
    But_M = numI(document.getElementById("But_M").value);
    But_C = numI(document.getElementById("But_C").value);
    But_D = numI(document.getElementById("But_D").value);
    But_MC = But_M * Ref / TxM + But_C * Ref / TxC;
    But_MD = But_M * Ref / TxM + But_D * Ref / TxD;
    But_CD = But_C * Ref / TxC + But_D * Ref / TxD;
    
    But_T = But_M * Ref / TxM + But_C * Ref / TxC + But_D * Ref / TxD;
    document.getElementById("But_Total").innerHTML = conv_nbr(But_T);
    
    //Ressources à un temps donné : "dans X heures"
    Tps_X = numI(document.getElementById("Tps_Xj").value) * 24 + numI(document.getElementById("Tps_Xh").value);
    
    //Ressources en moins ou en trop:
    Dif_M = Ini_M - But_M;
    Dif_C = Ini_C - But_C;
    Dif_D = Ini_D - But_D;
    Dif_MC = Ini_MC - But_MC;
    Dif_MD = Ini_MD - But_MD;
    Dif_CD = Ini_CD - But_CD;
    
    Dif_T = Ini_T - But_T;
    
    Tps_Dif_M = (((Dif_M / MpH) < 0) ? Math.abs(Dif_M / MpH) : 0);
    Tps_Dif_C = (((Dif_C / CpH) < 0) ? Math.abs(Dif_C / CpH) : 0);
    Tps_Dif_D = (((Dif_D / DpH) < 0) ? Math.abs(Dif_D / DpH) : 0);
    Tps_Dif_MC = (((Dif_MC / MCpH) < 0) ? Math.abs(Dif_MC / MCpH) : 0);
    Tps_Dif_MD = (((Dif_MD / MDpH) < 0) ? Math.abs(Dif_MD / MDpH) : 0);
    Tps_Dif_CD = (((Dif_CD / CDpH) < 0) ? Math.abs(Dif_CD / CDpH) : 0);
    
    Tps_Dif_T = (((Dif_T / TpH) < 0) ? Math.abs(Dif_T / TpH) : 0);
    
    //Calcul des ressources dispo à différents tps clé
    table = [Tps_Dif_M, Tps_Dif_C, Tps_Dif_D, Tps_Dif_MC, Tps_Dif_MD, Tps_Dif_CD, Tps_Dif_T, Tps_X];
    
    table.sort(croissant); //ordonne dans l'ordre chronologique
    aff = "<tr><th colspan=5>Diff&eacute;rence de ressources par rapport &agrave; la quantit&eacute; souhait&eacute;e</th></tr>";
    
    now = new Date();
    tempo = new Date();
    for (i = 0; i < table.length; i++) {
        tmp = table[i];
        if (tmp != last) {
            tempo.setTime(now.getTime() + tmp * 3600000);
            aff += "<tr><th title='" + form_date(tempo) + "'>" + conv_tps(tmp) + "</th><td>" + conv_nbr(tmp * MpH + Dif_M, 1) + "</td><td>" + conv_nbr(tmp * CpH + Dif_C, 1) + "</td><td>" + conv_nbr(tmp * DpH + Dif_D, 1) + "</td><td>" + conv_nbr(tmp * TpH + Dif_T, 1) + "</td></tr>";
        }
        last = tmp;
    }
    
    document.getElementById("Resultat").innerHTML = aff;
    styleperso("Resultat");
    
    //Commerce
    Def_M = numI(document.getElementById("Def_M").value);
    Def_C = numI(document.getElementById("Def_C").value);
    Def_D = numI(document.getElementById("Def_D").value);
    
    Def_T = Def_M * Ref / TxM + Def_C * Ref / TxC + Def_D * Ref / TxD;
    document.getElementById("Def_T").innerHTML = conv_nbr(Def_T, 1);
    
    //Enregistre les paramètres
    GM_setValue('Param' + serveurUni, TxM + '|' + TxC + '|' + TxD + '|' + RefID);
    
    Ini_M = document.getElementById("Ini_M").value;
    Ini_C = document.getElementById("Ini_C").value;
    Ini_D = document.getElementById("Ini_D").value;
    Add_M = document.getElementById("Add_M").value;
    Add_C = document.getElementById("Add_C").value;
    Add_D = document.getElementById("Add_D").value;
    But_M = document.getElementById("But_M").value;
    But_C = document.getElementById("But_C").value;
    But_D = document.getElementById("But_D").value;
    tpsAlert = document.getElementById("tpsAlert").value;
    GM_setValue('Datas' + serveurUni, Ini_M + '|' + Ini_C + '|' + Ini_D + '|' + Add_M + '|' + Add_C + '|' + Add_D + '|' + But_M + '|' + But_C + '|' + But_D + '|' + tpsAlert);
}



/******************************* Complète le tableau "Cout" *******************************/

function cout() {
    var Qte_MT, Qte_CT, Qte_DT, i, bat, lvl, bat1, Qte_Met, Qte_Cri, Qte_Deu;
    Qte_MT = Qte_CT = Qte_DT = 0;
    
    for (i = 0; i < imax; i++) {
        bat = document.getElementsByName("Batiment")[i].value;
        lvl = numI(document.getElementsByName("level")[i].value);
        //*
        bat1 = new cout2(bat, lvl);
        Qte_Met = bat1.met;
        Qte_Cri = bat1.cri;
        Qte_Deu = bat1.deu;
        
        document.getElementById("Qte_M" + i).innerHTML = conv_nbr(Qte_Met);
        document.getElementById("Qte_C" + i).innerHTML = conv_nbr(Qte_Cri);
        document.getElementById("Qte_D" + i).innerHTML = conv_nbr(Qte_Deu);
        
        Qte_MT += Qte_Met;
        Qte_CT += Qte_Cri;
        Qte_DT += Qte_Deu;
    }
    
    document.getElementById("Qte_MT").innerHTML = conv_nbr(Qte_MT);
    document.getElementById("Qte_CT").innerHTML = conv_nbr(Qte_CT);
    document.getElementById("Qte_DT").innerHTML = conv_nbr(Qte_DT);
    
    document.getElementById("But_M").value = Qte_MT;
    document.getElementById("But_C").value = Qte_CT;
    document.getElementById("But_D").value = Qte_DT;
    
    setTimeout(calcul, 100);
}



/******************************* Enregistre les cases cochées *******************************/

function saveCheckbox() {
    var checkAdd_str = "", i, MpH, CpH, DpH, prodH,
        planetList = GM_getValue('planetList' + serveurUni, '0').split('|'),
        checkAll = document.getElementById("checkAll").checked,
        checkAll2 = document.getElementById("checkAll2").checked,
        checkAdd_tab = document.getElementsByName("checkAdd");
    
    if (checkAll != checkAll2) {
        for (i = 0; i < checkAdd_tab.length; i++) {
            checkAdd_str += (checkAll == true) ? (checkAdd_tab[i].id + "|") : "";
            checkAdd_tab[i].checked = checkAll;
        }
    } else {
        for (i = 0; i < checkAdd_tab.length; i++) {
            checkAdd_str += (checkAdd_tab[i].checked == true) ? (checkAdd_tab[i].id + "|") : "";
            checkAll = (checkAll && checkAdd_tab[i].checked); //TRUE : si absolument tout est coché
        }
    }
    document.getElementById("checkAll").checked = checkAll;
    GM_setValue('checkAdd' + serveurUni, checkAdd_str);
    
    //Production horaire
    MpH = CpH = DpH = 0;
    
    for(i=0;i<planetList.length;i++)	{
        if (document.getElementById('p' + planetList[i]).checked == true) {
            prodH = GM_getValue('resHrs' + planetList[i] + serveurUni, "0|0|0").split('|');
            MpH += parseInt(prodH[0], 0);
            CpH += parseInt(prodH[1], 0);
            DpH += parseInt(prodH[2], 0);
        }
    }
    
    document.getElementById("MpH").value = MpH;
    document.getElementById("CpH").value = CpH;
    document.getElementById("DpH").value = DpH;
}



/******************************* Enregistre la liste des colos *******************************/

function listPlanetID() {
    var planetList = document.getElementById("planetList").getElementsByTagName('a'),
        pList = "", i, planetID;
    for (i=0;i<planetList.length;i++)	{
        planetID = planetList[i].href.split("cp=")[1];
        if (pList.indexOf(planetID) < 0) {
            pList += planetID + '|';
        }
    }
    pList = pList.substring(0, pList.length - 1);
    GM_setValue('planetList' + serveurUni, pList);
}



/******************************* Enregistre les metadatas de la colo *******************************/

function metaPlanet() {
    var pID = document.getElementsByName('ogame-planet-id')[0].content,
        pName = document.getElementsByName('ogame-planet-name')[0].content,
        pCoord = document.getElementsByName('ogame-planet-coordinates')[0].content,
        pType = document.getElementsByName('ogame-planet-type')[0].content,
        lune = "", t0, tMin, tMax, casesU, casesT;
    
    if ((url.indexOf('page=overview', 0)) >= 0) {
        t0 = document.getElementById("temperatureContentField").innerHTML.replace(/[^0-9-].[^0-9-]*/g, " ").split(' ');
        tMin = parseInt(t0[0], 0);
        tMax = parseInt(t0[1], 0);
        casesU = document.getElementById("diameterContentField").getElementsByTagName("span")[0].innerHTML;
        casesT = document.getElementById("diameterContentField").getElementsByTagName("span")[1].innerHTML;
        if (document.getElementById("planet").innerHTML.indexOf('moon') >= 0) {
            if (pType.indexOf('moon') >= 0) {
                lune = document.getElementById("planet_as_moon").getElementsByTagName("a")[0].href.split('cp=')[1];
            } else	{
                lune = document.getElementById("moon").getElementsByTagName("a")[0].href.split('cp=')[1];
            }
        }
    } else	{
        t0 = GM_getValue('metaPla' + pID + serveurUni, '||||||||||').split('|');
        casesU = t0[3];
        casesT = t0[4];
        tMin = t0[5];
        tMax = t0[6];
        lune = t0[7];
    }
    GM_setValue('metaPla' + pID + serveurUni, pName + '|' + pCoord + '|' + pType + '|' + casesU + '|' + casesT + '|' + tMin + '|' + tMax + '|' + lune);
}



/******************************* Enregistre les quantités de ressources *******************************/

function majRes() {
    //Ressources à quai:
    var start_time = (new Date()).getTime(),
        qMet = document.getElementById('resources_metal').innerHTML.replace(/[\D]/g, ""),
        qCri = document.getElementById('resources_crystal').innerHTML.replace(/[\D]/g, ""),
        qDeu = document.getElementById('resources_deuterium').innerHTML.replace(/[\D]/g, ""),
        planetID = document.getElementsByName('ogame-planet-id')[0].content;
    GM_setValue('resPla' + planetID + serveurUni, start_time + '|' + qMet + '|' + qCri + '|' + qDeu);
}



/******************************* Enregistre les niveaux de Ressources *******************************/

function majResLvl() {
    if ((url.indexOf('page=resources', 0)) >= 0) {
        var metH, criH, deuH, i, lvl, bat1, lPlasma, cef, str_bat = "",
            bat = document.getElementById('buttonz').getElementsByTagName('li'),
            planetID = document.getElementsByName('ogame-planet-id')[0].content;
        
        GM_setValue('consRes' + planetID + serveurUni, '0|0|0');
        
        for (i = 0; i < bat.length; i++) {
            lvl = bat[i].getElementsByClassName('ecke')[0].innerHTML.replace(/[\D]/g, "");
            if (i == 4)	{
                cef = lvl;
            }
            str_bat += lvl + '|';
            
            //En construction
            if (bat[i].innerHTML.indexOf('eckeoben') > 0) {
                lvl = parseInt(bat[i].getElementsByClassName('eckeoben')[0].innerHTML.replace(/<.[^>]*>/g, ""), 0);
                bat1 = new cout2(BatRes[i], lvl);
                GM_setValue('consRes' + planetID + serveurUni, bat1.met + '|' + bat1.cri + '|' + bat1.deu + '|' + BatRes[i]);
            }
        }
        str_bat = str_bat.substring(0, str_bat.length - 1);
        GM_setValue('resLvlPla' + planetID + serveurUni, str_bat);
        
        // Prod par heure
        if (document.getElementsByName('ogame-planet-type')[0].content == "planet") {
            metH = document.getElementById('resourceSettings').getElementsByClassName('label')[0].getElementsByClassName('undermark')[1].innerHTML.replace(/[\D]/g, "");
            criH = document.getElementById('resourceSettings').getElementsByClassName('label')[1].getElementsByClassName('undermark')[1].innerHTML.replace(/[\D]/g, "");
            deuH = document.getElementById('resourceSettings').getElementsByClassName('label')[2].getElementsByClassName('undermark')[1].innerHTML.replace(/[\D]/g, "");
            
            lPlasma = GM_getValue('recherches' + serveurUni, "0|0|0|0|0|0").split('|')[4];
            metH = Math.round(metH * (1 + lPlasma / 100) + 30);
            criH = Math.round(criH * (1 + 0.66 * lPlasma / 100) + 15);
            deuH = Math.round(deuH - (10 * cef * Math.pow(1.1, cef)));
        }
        else {
            metH = criH = deuH = 0;
        }
        GM_setValue('resHrs' + planetID + serveurUni, metH + '|' + criH + '|' + deuH);
    }
}



/******************************* Enregistre les niveaux des Installations *******************************/

function majInsLvl() {
    if ((url.indexOf('page=station', 0)) >= 0) {
        var str_bat = "", i, lvl, bat1,
            bat = document.getElementById('buttonz').getElementsByTagName('li'),
            planetType = document.getElementsByName('ogame-planet-type')[0].content,
            planetID = document.getElementsByName('ogame-planet-id')[0].content;
        
        GM_setValue('consIns' + planetID + serveurUni, '0|0|0');
        
        for (i = 0; i < bat.length; i++) {
            bat1 = bat[i].getElementsByClassName('ecke')[0].innerHTML.replace(/[\D]/g, "");
            if (planetType.indexOf("moon") >= 0) {
                if (i == 2)	{
                    str_bat += '0|0|0|0|0|';
                }
            }
            str_bat += bat1 + '|';
            
            //En construction
            if (bat[i].innerHTML.indexOf('eckeoben') > 0) {
                lvl = parseInt(bat[i].getElementsByClassName('eckeoben')[0].innerHTML.replace(/<.[^>]*>/g, ""), 0);
                bat1 = new cout2(BatIns[i], lvl);
                GM_setValue('consIns' + planetID + serveurUni, bat1.met + '|' + bat1.cri + '|' + bat1.deu + '|' + BatIns[i]);
            }
        }
        str_bat = str_bat.substring(0, str_bat.length - 1);
        GM_setValue('insLvlPla' + planetID + serveurUni, str_bat);
    }
}



/******************************* Enregistre la Défense *******************************/

function majNbDef() {
    if ((url.indexOf('page=defense', 0)) >= 0) {
        var bat = document.getElementById('buttonz').getElementsByTagName('li'),
            str_bat = "", i,
            planetID = document.getElementsByName('ogame-planet-id')[0].content;
        
        for (i = 0; i < bat.length; i++) {
            str_bat += bat[i].getElementsByClassName('ecke')[0].innerHTML.replace(/[\D]/g, "") + '|';
        }
        str_bat = str_bat.substring(0, str_bat.length - 1);
        GM_setValue('defNbPla' + planetID + serveurUni, str_bat);
    }
}



/******************************* Enregistre la Flotte *******************************/

function majFlotte() {
    var bat, str_bat = "", i,
        planetID = document.getElementsByName('ogame-planet-id')[0].content;
    
    if ((url.indexOf('page=fleet1', 0)) >= 0) {
        bat = document.getElementById('shipsChosen').getElementsByTagName('li');
    }else if ((url.indexOf('page=shipyard', 0)) >= 0) {
        bat = document.getElementById('buttonz').getElementsByTagName('li');
    }else	{
        return 0;
    }
    
    for (i = 0; i < bat.length; i++) {
        str_bat += bat[i].getElementsByClassName('ecke')[0].innerHTML.replace(/[\D]/g, "") + '|';
    }
    str_bat = str_bat.substring(0, str_bat.length - 1);
    GM_setValue('flottePla' + planetID + serveurUni, str_bat);
}



/******************************* Enregistre les recherches *******************************/

function majRech() {
    if ((url.indexOf('page=research', 0)) >= 0) {
        var bat = new Array(16),
            str_bat = "", i, lvl, bat1;
        
        GM_setValue('curRech' + serveurUni, '0|0|0');
        
        for (i = 0; i < bat.length; i++) {
            bat[i] = document.getElementById('buttonz').getElementsByTagName('li')[i].getElementsByClassName('ecke')[0].innerHTML.replace(/[\D]/g, "");
            str_bat += bat[i] + '|';
            
            //En construction
            if (document.getElementById('buttonz').getElementsByTagName('li')[i].innerHTML.indexOf('eckeoben') > 0) {
                lvl = parseInt(document.getElementById('buttonz').getElementsByTagName('li')[i].getElementsByClassName('eckeoben')[0].innerHTML.replace(/<.[^>]*>/g, ""), 0);
                bat1 = new cout2(AllRech[i], lvl);
                GM_setValue('curRech' + serveurUni, bat1.met + '|' + bat1.cri + '|' + bat1.deu + '|' + AllRech[i]);
            }
        }
        str_bat = str_bat.substring(0, str_bat.length - 1);
        GM_setValue('recherches' + serveurUni, str_bat);
    }
}



/******************************* Enregistre les ressources en vol *******************************/

function resVol() {
    var planetList = GM_getValue('planetList' + serveurUni, '0').split('|'),
        i, j, fleetDetails, coord, planetName, pCoord, pName, ress_tab, metal, cristal, deut, res, m, c, d;
    
    for (i=0;i<planetList.length;i++)	{
        GM_setValue('resTo' + planetList[i] + serveurUni, '0|0|0');
    }
    
    if ((url.indexOf('page=movement', 0)) >= 0) {
        fleetDetails = document.getElementsByClassName('fleetDetails detailsOpened');
        
        for (i = 0; i < fleetDetails.length; i++) {
            if (fleetDetails[i].getElementsByClassName("reversal reversal_time").length > 0) { //aller
                coord = fleetDetails[i].getElementsByClassName('destinationCoords tooltip')[0].getElementsByTagName('A')[0].innerHTML;
                planetName = fleetDetails[i].getElementsByClassName('destinationPlanet')[0].innerHTML;
            } else { //retour
                coord = fleetDetails[i].getElementsByClassName('originCoords tooltip')[0].getElementsByTagName('A')[0].innerHTML;
                planetName = fleetDetails[i].getElementsByClassName('originPlanet')[0].innerHTML;
            }
            
            for (j=0;j<planetList.length;j++)	{
                pCoord = '[' + GM_getValue('metaPla' + planetList[j] + serveurUni, '0|0|0').split('|')[1] + ']';
                if (pCoord == coord) {
                    pName = GM_getValue('metaPla' + planetList[j] + serveurUni, '0|0|0').split('|')[0];
                    if (planetName.indexOf(pName) >= 0)	{
                        coord = planetList[j];
                    }
                }
            }
            
            ress_tab = fleetDetails[i].getElementsByClassName('value');
            
            metal = Number(ress_tab[ress_tab.length - 3].innerHTML.replace(/[\D]/g, ""));
            cristal = Number(ress_tab[ress_tab.length - 2].innerHTML.replace(/[\D]/g, ""));
            deut = Number(ress_tab[ress_tab.length - 1].innerHTML.replace(/[\D]/g, ""));
            
            res = GM_getValue('resTo' + coord + serveurUni, '0|0|0').split('|');
            
            m = metal + parseInt(res[0], 0);
            c = cristal + parseInt(res[1], 0);
            d = deut + parseInt(res[2], 0);
            
            GM_setValue('resTo' + coord + serveurUni, m + '|' + c + '|' + d + '|vol');
        }
    }
}



/******************************* Visite chaque colo *******************************/

function majAll() {
    // Liste les colos
    listPlanetID();
    
    var pID = document.getElementsByName('ogame-planet-id')[0].content,
        planetList = GM_getValue('planetList' + serveurUni, '0').split('|'),
        lk, i, j, lien = new Array(1), titre = new Array(1);
    
    lk = url.split('?')[0] + "?";
    
    //Curseur en sablier
    document.body.style.cursor = "wait";
    
    //Recherches
    lien[0] = lk + "page=research";
    titre[0] = "Recherches";
    
    i = 1;
    
    //En vol
    resVol();
    titre[i] = "Mouvement";
    lien[i++] = lk + "page=movement";
    
    //Par colo
    for (j=0;j<planetList.length;j++)	{
        titre[i] = "Batiments Ressources";
        lien[i] = lk + "page=resources&cp=" + planetList[j];
        i++;
    }
    //*
    for (j=0;j<planetList.length;j++)	{
        titre[i] = "Batiments Installations";
        lien[i] = lk + "page=station&cp=" + planetList[j];
        i++;
    }
    for (j=0;j<planetList.length;j++)	{
        titre[i] = "Defense";
        lien[i] = lk + "page=defense&cp=" + planetList[j];
        i++;
    }
    
    for (j=0;j<planetList.length;j++)	{
        titre[i] = "Flotte";
        lien[i] = lk + "page=shipyard&cp=" + planetList[j];
        i++;
    }    //*/
    
    document.open(lien[0], "tempo", "");
    document.getElementById("majDe").innerHTML = "Mise à jour : 1%";
    
    i = 1;
    
    document.getElementById("ifram").addEventListener("load", function (event) {
        if (i < lien.length) {
            document.getElementById("majDe").innerHTML = "Mise à jour : " + parseInt(100 * i / lien.length, 0) + "%";
            window.setTimeout(document.open(lien[i], "tempo", ""), 100);
            i++;
        } else {
            //alert("Mise à jour terminée (" + planetList.length + " Planètes/Lunes)");
            window.setTimeout(document.open(url + '&cp=' + pID, "_self", ""), 100);
        }
    }, true);
}



/******************************* Total des ressources *******************************/

function allQteRes() {
    var totMet = 0, totCri = 0, totDeu = 0,
        table = '<table><tr><th>Planete</th><th>Metal</th><th>Cristal</th><th>Deut</th><th><input type=\"checkbox\" id=\"checkAll\" /><input type=\"checkbox\" style=\"display:none;\" id=\"checkAll2\" /></th></tr>',
        checkAdd_tab = GM_getValue('checkAdd' + serveurUni, ""),
        tpsAlert = numI(document.getElementById("tpsAlert").value),
        planetList = GM_getValue('planetList' + serveurUni, '0').split('|'),
        checkAll = true, f = 0, i, j,
        start_time, planetMeta, res, qMet, qCri, qDeu, prodH, pMet, pCri, pDeu, bat,
        MaxMet, MaxCri, MaxDeu, infoMet, infoCri, infoDeu, strongM, strongC, strongD,
        redM, redC, redD, greenM, greenC, greenD, tpsMet, tpsCri, tpsDeu, check, bonusType;
    
    for (i=0;i<planetList.length;i++)	{
        start_time = (new Date()).getTime();
        
        planetMeta = GM_getValue('metaPla' + planetList[i] + serveurUni, start_time + "|0|0|0").split('|');
        
        res = GM_getValue('resPla' + planetList[i] + serveurUni, start_time + "|0|0|0").split('|');
        qMet = parseInt(res[1], 0);
        qCri = parseInt(res[2], 0);
        qDeu = parseInt(res[3], 0);
        
        prodH = GM_getValue('resHrs' + planetList[i] + serveurUni, "0|0|0").split('|');
        pMet = parseInt(prodH[0], 0);
        pCri = parseInt(prodH[1], 0);
        pDeu = parseInt(prodH[2], 0);
        
        bat = GM_getValue('resLvlPla' + planetList[i] + serveurUni, "0|0|0|0|0|0|0|0|0|0|0|0").split('|');
        MaxMet = Math.floor(2.5 * Math.exp(20 * parseInt(bat[6], 0) / 33)) * 5000;
        MaxCri = Math.floor(2.5 * Math.exp(20 * parseInt(bat[7], 0) / 33)) * 5000;
        MaxDeu = Math.floor(2.5 * Math.exp(20 * parseInt(bat[8], 0) / 33)) * 5000;
        
        infoMet = infoCri = infoDeu = "";
        strongM = strongC = strongD = "text-decoration:underline;";
        
        if (qMet >= MaxMet) {
            redM = 255;
            greenM = 0;
        } else {
            qMet += (start_time - res[0]) / (1000 * 3600) * pMet;
            if (qMet >= MaxMet) {
                redM = 255;
                greenM = 0;
                qMet = MaxMet;
            } else {
                tpsMet = (MaxMet - qMet) / pMet;
                if (tpsMet > tpsAlert) {
                    redM = Math.floor(255 * qMet / MaxMet);
                    greenM = 255;
                    strongM = "";
                } else {
                    redM = 255;
                    greenM = Math.floor(255 * tpsMet / tpsAlert);
                }
                infoMet = 'title=\"Max: ' + sepaMille(MaxMet) + ' &hArr; Atteint dans: ' + conv_tps(tpsMet) + '\"';
            }
        }
        if (qCri >= MaxCri) {
            redC = 255;
            greenC = 0;
        } else {
            qCri += (start_time - res[0]) / (1000 * 3600) * pCri;
            if (qCri >= MaxCri) {
                redC = 255;
                greenC = 0;
                qCri = MaxCri;
            } else {
                tpsCri = (MaxCri - qCri) / pCri;
                if (tpsCri > tpsAlert) {
                    redC = Math.floor(255 * qCri / MaxCri);
                    greenC = 255;
                    strongC = "";
                } else {
                    redC = 255;
                    greenC = Math.floor(255 * tpsCri / tpsAlert);
                }
                infoCri = 'title=\"Max: ' + sepaMille(MaxCri) + ' &hArr; Atteint dans: ' + conv_tps(tpsCri) + '\"';
            }
        }
        if (qDeu >= MaxDeu) {
            redD = 255;
            greenD = 0;
        } else {
            qDeu += (start_time - res[0]) / (1000 * 3600) * pDeu;
            if (qDeu >= MaxDeu) {
                redD = 255;
                greenD = 0;
                qDeu = MaxDeu;
            } else {
                tpsDeu = (MaxDeu - qDeu) / pDeu;
                if (tpsDeu > tpsAlert) {
                    redD = Math.floor(255 * qDeu / MaxDeu);
                    greenD = 255;
                    strongD = "";
                } else {
                    redD = 255;
                    greenD = Math.floor(255 * tpsDeu / tpsAlert);
                }
                infoDeu = 'title=\"Max: ' + sepaMille(MaxDeu) + ' &hArr; Atteint dans: ' + conv_tps(tpsDeu) + '\"';
            }
        }
        table += '<tr><td style=\"font-size:90%\">' + planetMeta[0];
        table += '</td><td style=\"color:rgb(' + redM + ',' + greenM + ',0);' + strongM + '\" ' + infoMet + '>' + sepaMille(qMet);
        table += '</td><td style=\"color:rgb(' + redC + ',' + greenC + ',0);' + strongC + '\" ' + infoCri + '>' + sepaMille(qCri);
        table += '</td><td style=\"color:rgb(' + redD + ',' + greenD + ',0);' + strongD + '\" ' + infoDeu + '>' + sepaMille(qDeu);
        
        check = (checkAdd_tab.indexOf("p" + planetList[i]) > -1) ? "checked=\"checked\"" : "";
        table += '</td><td><input id="p' + planetList[i] + '" name=\"checkAdd\" type=\"checkbox\" value=\"' + i + '\" ' + check + ' /></td></tr>';
        
        if (check != "") {
            totMet += qMet;
            totCri += qCri;
            totDeu += qDeu;
        }
        
        //Ressources en +
        bonusType = ["resTo", "consRes", "consIns"];
        for ( j = 0; j < bonusType.length; j++) {
            res = GM_getValue(bonusType[j] + planetList[i] + serveurUni, "0|0|0").split('|');
            if (res[0] + res[1] + res[2] != "000") {
                check = (checkAdd_tab.indexOf(bonusType[j] + planetList[i]) > -1) ? "checked=\"checked\"" : "";
                table += '<tr style=\"font-size:80%;font-style:italic;\"><td>' + Nom[res[3]] + '</td><td>' + sepaMille(res[0]) + '</td><td>' + sepaMille(res[1]) + '</td><td>' + sepaMille(res[2]);
                table += '</td><td><input id=\"' + bonusType[j] + planetList[i] + '\" name=\"checkAdd\" type=\"checkbox\" value=\"' + bonusType[j] + planetList[i] + '\" ' + check + ' /></td></tr>';
                
                if (check != "") {
                    totMet += parseInt(res[0], 0);
                    totCri += parseInt(res[1], 0);
                    totDeu += parseInt(res[2], 0);
                }
            }
        }
        
        checkAll = (checkAll && check);
    }
    
    //Recherche en cours
    res = GM_getValue('curRech' + serveurUni, "0|0|0").split('|');
    if (res[0] + res[1] + res[2] != "000") {
        check = (checkAdd_tab.indexOf('EnRech') > -1) ? "checked=\"checked\"" : "";
        table += '<tr style=\"font-size:80%;font-style:italic;\"><td>' + Nom[res[3]] + '</td><td>' + sepaMille(res[0]) + '</td><td>' + sepaMille(res[1]) + '</td><td>' + sepaMille(res[2]);
        table += '</td><td><input id=\"EnRech\" name=\"checkAdd\" type=\"checkbox\" value=\"EnRech\" ' + check + ' /></td></tr>';
        
        if (check != "") {
            totMet += parseInt(res[0], 0);
            totCri += parseInt(res[1], 0);
            totDeu += parseInt(res[2], 0);
        }
    }
    checkAll = (checkAll && check);
    
    if (exporter == true) {
        document.getElementById("Ini_M").value = parseInt(totMet, 0);
        document.getElementById("Ini_C").value = parseInt(totCri, 0);
        document.getElementById("Ini_D").value = parseInt(totDeu, 0);
        exporter = false;
        calcul();
    }
    
    table = 'Metal: ' + sepaMille(totMet) + '&emsp;|&emsp;Cristal: ' + sepaMille(totCri) + '&emsp;|&emsp;Deut: ' + sepaMille(totDeu) + '<br/><br/>' + table + '</table>';
    
    document.getElementById("DetailRess").innerHTML = table;
    
    document.getElementById("checkAll").checked = checkAll;
    document.getElementById("checkAll2").checked = checkAll;
    document.getElementById("checkAll").title = (checkAll) ? "Deselectionner tout" : "Selectionner tout";
    
    styleperso("DetailRess");
}



/******************************* Affichage *******************************/

function contenu() {
    var txt = "<div id='traderOverview'>",
        grp, i, j, limite, Val;
    
    //Détail des ressources à quai:
    txt += "<div class='boxWrapper' style='clear:both;'><div class='header'><h3>Ressources</h3></div><div class='content'><form ID='DetailRess'></form>Seuil d'alerte <input class='ship_amount' type='text' size=3 ID='tpsAlert' value=" + tpsAlert + " /> heures (souligne la quantité)<br /><input ID='btn_MAJ' class='btn_blue' type='button' value='Mettre &agrave; jour' /> <input ID='btn_Export' class='btn_blue' style='display:inline' type='button' value='Exporter vers &#39;Obtention ...&#39;' /></div><div class='footer' id='majDe'></div></div>";
    
    
    //Durée d'obtention des ressources:
    txt += "<div class='boxWrapper'><div class='header'><h3>Obtention de ressources</h3></div><div class='content'><form ID='Form_Calc'><p style='line-height:200%;'>Taux commercial : <input class='ship_amount' type='text' size=2 ID='TxM' value=" + TxM + " />M&eacute;tal &hArr; <input class='ship_amount' type='text' size=2 ID='TxC' value=" + TxC + " />Cristal &hArr; <input class='ship_amount' type='text' size=2 ID='TxD' value=" + TxD + " />Deut&eacute;rium<br/>(*) Ressource de r&eacute;f&eacute;rence : <input type='radio' name='Ref' ID='M' value='M' /><label for='M'>M&eacute;tal</label> <input type='radio' name='Ref' ID='C' value='C' /><label for='C'>Cristal</label> <input type='radio' name='Ref' ID='D' value='D' checked /><label for='D'>Deut&eacute;rium</label></p>";
    txt += "<table style='border-colapse:separate;'><tr><th><input type='reset' class='btn_blue' /></th><th>M&eacute;tal</th><th>Cristal</th><th>Deut&eacute;rium</th><th title='Total converti en ressources de r&eacute;f&eacute;rence'>Total (*)</th></tr>";
    txt += "<tr><td>Production </td><th><input class='ship_amount' type='text' size=7 ID='MpH' value=" + MpH + " />/H</th><th><input class='ship_amount' type='text' size=7 ID='CpH' value=" + CpH + " />/H</th><th><input class='ship_amount' type='text' size=7 ID='DpH' value=" + DpH + " />/H</th><td ID='Prod_Total'></td></tr>";
    txt += "<tr><td>Qt&eacute; initiale </td><th><input class='ship_amount' type='text' size=9 ID='Ini_M' /></th><th><input class='ship_amount' type='text' size=9 ID='Ini_C' /></th><th><input class='ship_amount' type='text' size=9 ID='Ini_D' /></th><td rowspan=2 ID='Ini_Total'></td></tr>";
    txt += "<tr><td title='Permet d&#39;ajouter les ressources en livraison et de soustraire une réserve de carburant, par exemple.'>+/-</td><th><input class='ship_amount' type='text' size=9 ID='Add_M' /></th><th><input class='ship_amount' type='text' size=9 ID='Add_C' /></th><th><input class='ship_amount' type='text' size=9 ID='Add_D' /></th></tr><tr><td colspan=5><br style='font-size:3px;'/></td></tr>";
    txt += "<tr><td>Qt&eacute; souhait&eacute;e </td><th><input class='ship_amount' type='text' size=9 ID='But_M' /></th><th><input class='ship_amount' type='text' size=9 ID='But_C' /></th><th><input class='ship_amount' type='text' size=9 ID='But_D' /></th><td ID='But_Total'></td></tr><tbody ID='Resultat'></tbody><tr><th colspan=5>Ressources dans <input class='ship_amount' type='text' size=3 ID='Tps_Xj' value=0 /> jours <input class='ship_amount' type='text' size=3 ID='Tps_Xh' value=0 /> heures</th></tr>";
    txt += "<tr><th>Commerce:</th><th><input class='ship_amount' type='text' size=9 ID='Def_M' /></th><th><input class='ship_amount' type='text' size=9 ID='Def_C' /></th><th><input class='ship_amount' type='text' size=9 ID='Def_D' /></th><td ID='Def_T'></td></tr>";
    txt += "</table></form></div><div class='footer'></div></div>";
    
    
    //Cout des investissements:
    txt += "<div class='boxWrapper'><div class='header'><h3>Co&ucirc;t de construction</h3></div><div class='content'><input type='hidden' ID='focus' value='' /><form ID='Form_Bat_Tec'><table border=1 ID='Bat_Tec'><tr><th><input type='reset' class='btn_blue' ID='RAZ_Bat_Tec'/></th><td>level</td><th>M&eacute;tal</th><th>Cristal</th><th>Deut&eacute;rium</th></tr>";
    for (i = 0; i < imax; i++) {
        txt += "<tr><td><select name='Batiment' style='visibility:visible;'><option>---</option>";
        
        grp = Defense;
        txt += "</optgroup><optgroup style='color:#EEEEEE;' label='Defense :'>";
        for (j=0;j<grp.length;j++)	{
            txt += "<option value='" + grp[j] + "'>" + Nom[grp[j]] + " </option>";
        }
        
        grp = Vaisseau;
        txt += "</optgroup><optgroup style='color:#EEEEEE;' label='Vaisseaux :'>";
        for (j=0;j<grp.length;j++)	{
            txt += "<option value='" + grp[j] + "'>" + Nom[grp[j]] + " </option>";
        }
        
        grp = BatRes;
        txt += "</optgroup><optgroup style='color:#EEEEEE;' label='Ressources :'>";
        for (j=0;j<grp.length;j++)	{
            txt += "<option value='" + grp[j] + "'>" + Nom[grp[j]] + " </option>";
        }
        
        grp = BatIns;
        txt += "</optgroup><optgroup style='color:#EEEEEE;' label='Installations :'>";
        for (j=0;j<grp.length;j++)	{
            txt += "<option value='" + grp[j] + "'>" + Nom[grp[j]] + " </option>";
        }
        
        grp = AllRech;
        txt += "</optgroup><optgroup style='color:#EEEEEE;' label='Recherches :'>";
        for (j=0;j<grp.length;j++)	{
            txt += "<option value='" + grp[j] + "'>" + Nom[grp[j]] + " </option>";
        }
        
        txt += "</optgroup></select></td><td><input class='ship_amount' name='level' size=4></td><td id='Qte_M" + i + "'>0</td><td id='Qte_C" + i + "'>0</td><td id='Qte_D" + i + "'>0</td></tr>";
        
    }
    txt += "<tr><th colspan='2'>Co&ucirc;t Total: </th><td id='Qte_MT'>0</td><td id='Qte_CT'>0</td><td id='Qte_DT'>0</td></tr></table></form></div><div class='footer'></div></div>";
    
    //Empire:
    txt += "<div class='boxWrapper' style='clear:both;'><div class='header'><h3>Empire</h3></div><div class='content'><span ID='EmpireID'></span></div><div class='footer'></div></div></div>";
    
    //Fin
    document.getElementById('CoutBatiment').innerHTML = "<center>" + txt + "</center><br/>";
    document.getElementById('CoutBatiment').style.marginTop = "-20px";
    
    //h2
    limite = document.getElementById('CoutBatiment').getElementsByTagName("h2");
    for (i = 0; i < limite.length; i++) {
        limite[i].style.color = "#6f9fc8";
        limite[i].style.paddingTop = "3px";
    }
    limite = document.getElementById('CoutBatiment').getElementsByClassName("ship_amount");
    for (i = 0; i < limite.length; i++) {
        limite[i].style.width = limite[i].size * 8 + "px";
    }
    
    styleperso("CoutBatiment");
    
    Val = GM_getValue('Datas' + serveurUni, "|||||||||").split('|');
    document.getElementById("Ini_M").value = Val[0];
    document.getElementById("Ini_C").value = Val[1];
    document.getElementById("Ini_D").value = Val[2];
    document.getElementById("Add_M").value = Val[3];
    document.getElementById("Add_C").value = Val[4];
    document.getElementById("Add_D").value = Val[5];
    document.getElementById("But_M").value = Val[6];
    document.getElementById("But_C").value = Val[7];
    document.getElementById("But_D").value = Val[8];
    document.getElementById("tpsAlert").value = Val[9];
}



/******************************* Empire *******************************/

function AfficherEmpire() {
    var Elmt = document.getElementById('EmpireID'),
        txt = '<table style="white-space: nowrap;"><tr><th></th>',
        planetList = GM_getValue('planetList' + serveurUni, '0').split('|'),
        i, j, pDetail, a, bat, lvl, style, style2, id, balise, separ, nb;
    
    separ = "</tr><tr><th style='font-size:40%;'>&nbsp;</th></tr>";
    style = " style=\'border:thin solid #222222; text-align:center; background-color: #0d1014\' ";
    
    //Nom des planetes
    for (i=0;i<planetList.length;i++)	{
        pDetail = GM_getValue('metaPla' + planetList[i] + serveurUni, '0|0|0').split('|');
        if (pDetail[2] == "moon")	{
            style2 = style.replace("style=\'", "style=\'font-size:80%; ");
            pDetail[1]= "";
        } else	{
            style2 = style;
            pDetail[1]= "<p" + style + ">" + pDetail[1] + "</p>";
        }
        txt += "<td" + style2 + ">" + pDetail[0] + "<br/>" + pDetail[1] + pDetail[3] + "/" + pDetail[4] + "</td>";
    }
    
    //Bat Ressources
    a = BatRes;
    for ( i = 0; i < a.length; i++) {
        bat = a[i];
        txt += "<tr><td " + style + ">" + Nom[bat] + "</td>"; //Titre de la ligne : Nom du batiment
        for (j=0;j<planetList.length;j++)	{
            lvl = GM_getValue('resLvlPla' + planetList[j] + serveurUni, '0|0|0').split('|')[i];
            lvl = (lvl > 0) ? lvl : ".";
            txt += "<td" + style + "id=\"" + bat + "|" + lvl + "\">" + lvl + "</td>";
        }
    }
    txt += separ;
    
    //Bat Installations
    a = BatIns;
    for (i = 0; i < a.length; i++) {
        bat = a[i];
        txt += "<tr><td " + style + ">" + Nom[bat] + "</td>"; //Titre de la ligne : Nom du batiment
        for (j=0;j<planetList.length;j++){
            lvl = GM_getValue('insLvlPla' + planetList[j] + serveurUni, '0|0|0').split('|')[i];
            lvl = (lvl > 0) ? lvl : ".";
            txt += "<td" + style + "id=\"" + bat + "|" + lvl + "\">" + lvl + "</td>";
        }
    }
    txt += separ;
    
    //Defense
    a = Defense;
    for (i = 0; i < a.length; i++) {
        bat = a[i];
        txt += "<tr><td " + style + ">" + Nom[bat] + "</td>";
        nb = 0;
        for (j=0;j<planetList.length;j++){
            lvl = GM_getValue('defNbPla' + planetList[j] + serveurUni, '0|0|0').split('|')[i];
            lvl = (lvl > 0) ? lvl : ".";
            txt += "<td" + style + "id=\"" + bat + "|0\">" + sepaMille(lvl) + "</td>";
            nb += numI(lvl);
        }
        txt += "<td" + style + ">"+ sepaMille(nb) +"</td>";
    }
    txt += separ;
    
    //Flotte
    a = Vaisseau;
    for (i = 0; i < a.length; i++) {
        bat = a[i];
        txt += "<tr><td " + style + ">" + Nom[bat] + "</td>";
        nb = 0;
        for (j=0;j<planetList.length;j++){
            lvl = GM_getValue('flottePla' + planetList[j] + serveurUni, '0|0|0').split('|')[i];
            lvl = (lvl > 0) ? lvl : ".";
            txt += "<td" + style + "id=\"" + bat + "|0\">" + sepaMille(lvl) + "</td>";
            nb += numI(lvl);
        }
        txt += "<td" + style + ">"+ sepaMille(nb) +"</td>";
    }
    txt += separ + "</table>";
    
    //Recherches
    a = AllRech;
    txt += "<table><tr>";
    style = style.replace(':center;', ':right;');
    for (i=0;i<a.length;i++)	{
        if (i % 4 == 0) {
            txt += "</tr><tr>";
        }
        lvl = GM_getValue('recherches' + serveurUni, '0|0|0').split('|')[i];
        id = " id='" + a[i] + "|" + lvl + "'";
        lvl = ((lvl < 10) ? '&emsp;' : ' ' ) + lvl;
        txt += "<td " + style + id + ">" + Nom[a[i]] + " :" + lvl + "</td>";
    }
    
    Elmt.innerHTML = txt + "</tr></table>";
    
    //Style:
    Elmt.style.display = "block";
    Elmt.style.position = "relative";
    Elmt.style.marginBottom = "-10px";
    Elmt.style.marginLeft = "-200px";
    Elmt.style.marginRight = "-200px";
    Elmt.style.fontSize = "92%";
}




/********************************************************************/
/******************************* Main *******************************/
/********************************************************************/

window.addEventListener("load", function (event) {
    var newElement;
    
    url = location.href;
    serveurUni = url.split('/')[2];
    
    majRes();
    
    //Pour afficher une page en cache
    document.getElementById('playerName').innerHTML += "<iframe name=\"tempo\" id=\"ifram\" style=\"display:none;\"></iframe>";
    
    if ((url.indexOf('page=resourceSettings', 0)) > 0)	{
        newElement = 0;
    } else if ((url.indexOf('page=movement', 0)) > 0)	{
        resVol();
    } else if ((url.indexOf('page=resources', 0)) > 0)	{
        majResLvl();
    } else if ((url.indexOf('page=station', 0)) > 0)	{
        majInsLvl();
    } else if ((url.indexOf('page=research', 0)) > 0)	{
        majRech();
    } else if ((url.indexOf('page=defense', 0)) > 0)	{
        majNbDef();
    } else if ((url.indexOf('page=shipyard', 0)) > 0)	{
        majFlotte();
    } else if ((url.indexOf('page=fleet1', 0)) > 0)		{
        majFlotte();
    } else if ((url.indexOf('page=messages', 0)) > 0)	{
        newElement = 0;
    } else if ((url.indexOf('page=overview', 0)) > 0)	{
        resVol();
        document.open(url.replace('=overview', '=movement'), "tempo", "");
        
        //Réduit la hauteur du contenu original
        if (minHeader) {
            document.getElementById('planet').style.height = "157px";
            document.getElementById('planet').style.borderBottom = "3px solid #0d1518";
            document.getElementById('planetdata').style.marginTop = "5px";
        }
        
        limite = document.getElementsByClassName("content-box-s");
        
        // Création du DIV où on va écrire
        newElement = document.createElement("div");
        newElement.id = "CoutBatiment";
        document.getElementById('contentWrapper').appendChild(newElement);
        
        // Récupération des paramètres
        Param = GM_getValue('Param' + serveurUni, '3|2|1|2').split('|');
        TxM = Param[0];
        TxC = Param[1];
        TxD = Param[2];
        RefID = Param[3]; //0:Métal	/	1:Cristal	/	2:Deut
        
        // Production horaire
        MpH = 0;
        CpH = 0;
        DpH = 0;
        
        contenu();
        document.getElementsByName("Ref")[RefID].checked = "checked";
        
        //évite au script de se bloquer régulièrement
        window.setTimeout(allQteRes, 100);
        window.setTimeout(saveCheckbox, 200);
        window.setTimeout(calcul, 300);
        window.setTimeout(AfficherEmpire, 400);
        
        exporter = false;
        
        //Rafraichissement périodique des ressources
        window.setInterval(allQteRes, interval);
        
        // Actions sur événement
        
        document.getElementById("Form_Bat_Tec").addEventListener("change", function (event) {
            setTimeout(cout, 100);
        }, true);
        document.getElementById("Form_Bat_Tec").addEventListener("reset", function (event) {
            AfficherEmpire();
            setTimeout(cout, 100);
        }, true);
        
        document.getElementById("DetailRess").addEventListener("change", function (event) {
            setTimeout(calcul, 100);
        }, true);
        
        document.getElementById("DetailRess").addEventListener("click", function (event) {
            saveCheckbox();
            setTimeout(allQteRes, 100);
        }, true);
        
        document.getElementById("Form_Calc").addEventListener("change", function (event) {
            setTimeout(calcul, 100);
        }, true);
        document.getElementById("Form_Calc").addEventListener("keyup", function (event) {
            setTimeout(calcul, 100);
        }, true);
        document.getElementById("Form_Calc").addEventListener("reset", function (event) {
            setTimeout(calcul, 100);
        }, true);
        
        document.getElementById("btn_Export").addEventListener("click", function (event) {
            exporter = true;
            saveCheckbox();
            setTimeout(allQteRes, 100);
        }, true);
        
        document.getElementById("btn_MAJ").addEventListener("click", function (event) {
            majAll();
        }, true);
        
        document.getElementById('EmpireID').addEventListener("click", function (event) {
            var curLvl = event.target.id.split("|"),
                color = "red", i;
            if ((event.target.style.color != color) && (curLvl.length > 1))	{
                for (i = 0; i < imax; i++) {
                    if (document.getElementsByName("level")[i].value == "") {
                        document.getElementsByName("Batiment")[i].value = curLvl[0];
                        document.getElementsByName("level")[i].value = numI(curLvl[1]) + 1;
                        event.target.style.color = color;
                        break;
                    }
                }
                setTimeout(cout, 100);
            }
        }, true);
    } else	{
        return 0;
    }
}, false);

metaPlanet();
