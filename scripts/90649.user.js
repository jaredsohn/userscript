{\rtf1\ansi\ansicpg1254\deff0\deflang1055{\fonttbl{\f0\fnil\fcharset0 ;}{\f1\fswiss\fcharset238{\*\fname Arial;}Arial CE;}{\f2\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\lang1033\f0\fs20 //\par
// DO NO MODIFY DIRECTLY !!!\par
//\par
var metadata = <><![CDATA[\par
// ==UserScript==\par
// @author       Alex10336\par
// @name         Data Engine\par
// @namespace    http://eude.googlecode.com/\par
// @version      1.4.5\par
// @lastmod      Id: eude.user.js 572 2010-07-29 20:50:11Z Alex10336 $\par
// @license      GNU Public License 3.0 ( http://www.gnu.org/licenses/gpl-3.0.txt )\par
// @license      Creative Commons 3.0 BY-SA ( http://creativecommons.org/licenses/by-sa/3.0/deed.fr )\par
// @description  Script de liaison entre firefox et un serveur Data Engine\par
// @include      http://*eu2.looki.tld/index.php\par
// @include      http://*eu2.looki.tld/galaxy/galaxy_overview.php*\par
// @include      http://*eu2.looki.tld/galaxy/galaxy_info.php*\par
// @include      http://*eu2.looki.tld/planet/planet_info.php*\par
// @include      http://*eu2.looki.tld/fleet/fleet_info.php*\par
// @include      http://*eu2.looki.tld/fleet/fleet_edit.php*\par
// @include      http://*eu2.looki.tld/fleet/fleet_troop.php*\par
// @include      http://*eu2.looki.tld/fleet/commander_info.php?commander_id=*\par
// @include      http://*eu2.looki.tld/wormhole/wormhole_info.php*\par
// @include      http://*eu2.looki.tld/building/control/control_overview.php?area=planet\par
// @include      http://*eu2.looki.tld/user/settings_overview.php?area=options\par
// @include      http://*eu2.looki.tld/battle/battle_ground_report_info.php?area=ground_battle*\par
// @include      http://*eu2.looki.tld/gamelog/gamelog_view.php?gamelog_id*\par
// @include      http://*eu2.looki.tld/empire/empire_info.php?area=member&empire_id=*\par
// @include      http://*eu2.looki.tld/empire/empire_info.php?empire_id=*\par
// @include      http://*eu2.looki.tld/empire/empire_info.php?area=info&empire_id=*\par
// @include      http://*eu2.looki.tld/empire/empire_info.php?user_id=*&empire_id=*\par
// @include      http://marketing.looki-france.net/*pub_jeux_*\par
// @exclude      http://vs.eu2.looki.tld/*\par
// ==/UserScript==\par
]]></>.toString();\par
\par
var c_url = document.location.href;\par
var c_host = document.location.hostname;\par
var c_server = c_host.substr(0, c_host.indexOf('.'));\par
var c_lang = c_host.substr(-3);\par
c_lang = c_lang.substr(c_lang.indexOf('.')+1);\par
var c_page = c_url.substr(7+c_host.length);\par
var c_prefix = c_server+'.'+c_lang;\par
if (c_prefix == 'eu2.fr') c_prefix = 'australis.fr';\par
metadata.search(/\\@version\\s+(.*)/);\par
var mversion=RegExp.$1.replace(/\\.*/g, '');\par
metadata.search(/Id\\:\\ eude\\.user\\.js\\ (\\d+)\\ \\d+\\-\\d+\\-\\d+\\ .+\\$/);\par
var revision=RegExp.$1;\par
var version=mversion+'r'+revision;\par
const debug=false;\par
//c_prefix = 'borealis.fr';\par
\par
//const UseTamper = function_exists('TM_log');\par
//\par
//if (UseTamper) \{\par
//    TM_log('Version '+version);\par
//    TM_log('Page Check '+c_page);\par
//\}\par
\par
try \{\par
    var c_game_lang = (typeof unsafeWindow.top.window.fv['lang'] != 'undefined') ? unsafeWindow.top.window.fv['lang']: c_lang;\par
\} catch(e) \{\par
    c_game_lang = c_lang;\par
\}\par
\par
//if (UseTamper) TM_log('Check Point, should no work after yet !');\par
\par
\par
if (c_page.indexOf('pub_jeux_')>0 && debug &&\par
    c_page.indexOf('?')==-1 &&\par
    c_host == 'marketing.looki-france.net') \{\par
    // html/body/form/table/tbody/tr/input\par
    try \{\par
        main.document.forms['compteur'].nbClick.value = '2';\par
    \} catch(e) \{\par
        unsafeWindow.main.document.forms['compteur'].nbClick.value = '2';\par
    \}\par
return true; // stop script...\par
\}\par
var i18n = Array();\par
i18n['fr'] = Array();\par
i18n['fr']['eudeready']      = '<u>Data Engine</u> Fran\'c3\'a7ais, actif';\par
i18n['fr']['confheader']     = 'Options sp\'c3\'a9cifique au <u>Data Engine</u>';\par
i18n['fr']['conflink']       = 'Adresse';\par
i18n['fr']['confuser']       = 'Nom d\\'utilisateur';\par
i18n['fr']['confpass']       = 'Mot de passe';\par
i18n['fr']['confspacer']     = 130;\par
i18n['fr']['confcells']      = 20;\par
i18n['fr']['coords']         = 'Coordonn\'c3\'a9es';\par
i18n['fr']['ress0']          = 'Titane';\par
i18n['fr']['ress1']          = 'Cuivre';\par
i18n['fr']['ress2']          = 'Fer';\par
i18n['fr']['ress3']          = 'Aluminium';\par
i18n['fr']['ress4']          = 'Mercure';\par
i18n['fr']['ress5']          = 'Silicium';\par
i18n['fr']['ress6']          = 'Uranium';\par
i18n['fr']['ress7']          = 'Krypton';\par
i18n['fr']['ress8']          = 'Azote';\par
i18n['fr']['ress9']          = 'Hydrog\'c3\'a8ne';\par
i18n['fr']['ss_preview']     = 'Aper\'c3\'a7u syst\'c3\'a8me solaire n\'c2\'b0';\par
i18n['fr']['neutral,planet'] = ' plan\'c3\'a8tes';\par
i18n['fr']['emp,planet']     = ' joueur(s) de l\\'empire';\par
i18n['fr']['ally,planet']    = ' joueur(s) alli\'c3\'a9';\par
i18n['fr']['war,planet']     = ' joueur(s) en guerre';\par
i18n['fr']['nap,planet']     = ' joueur(s) en pna';\par
i18n['fr']['wormhole']       = ' vortex';\par
i18n['fr'][',asteroid']      = ' ast\'c3\'a9ro\'c3\'afde(s)';\par
i18n['fr'][',wreckage']      = ' champs de d\'c3\'a9bris';\par
i18n['fr']['neutral,fleet']  = ' flotte(s) neutre';\par
i18n['fr']['own,fleet']      = ' flotte(s) perso';\par
i18n['fr']['nap,fleet']      = ' flotte(s) en pna';\par
i18n['fr']['enemy,fleet']    = ' flotte(s) ennemie(s)';\par
i18n['fr']['npc,fleet']      = ' flotte(s) pirate';\par
i18n['fr']['ga,fleet']       = ' flotte(s) schtroumpfs';\par
i18n['fr']['troop_log_def']  = 'D\'c3\'a9valis\'c3\'a9 par';\par
i18n['fr']['troop_log_att']  = 'Quitter la plan\'c3\'a8te';\par
// TODO: Replace by XPath...\par
i18n['fr']['building']       = 'Nombre de b\'c3\'a2timents';\par
i18n['fr']['water']          = 'Surface d\\'eau';\par
i18n['fr']['active_empire']  = 'Activer MAJ empire';\par
\par
if (c_game_lang == 'com') c_game_lang = 'en';\par
i18n['en'] = Array();\par
i18n['en']['eudeready']      = 'English <u>Data Engine</u> online';\par
i18n['en']['confheader']     = '<u>Data Engine</u> specifics options';\par
i18n['en']['conflink']       = 'Address';\par
i18n['en']['confuser']       = 'User name';\par
i18n['en']['confpass']       = 'Password';\par
i18n['en']['confspacer']     = 65;\par
i18n['en']['confcells']      = 20;\par
i18n['en']['coords']         = 'Coordinates';\par
i18n['en']['ress0']          = 'Titanium';\par
i18n['en']['ress1']          = 'Copper';\par
i18n['en']['ress2']          = 'Iron';\par
i18n['en']['ress3']          = 'Aluminium';\par
i18n['en']['ress4']          = 'Mercury';\par
i18n['en']['ress5']          = 'Silicon';\par
i18n['en']['ress6']          = 'Uranium';\par
i18n['en']['ress7']          = 'Krypton';\par
i18n['en']['ress8']          = 'Nitrogen';\par
i18n['en']['ress9']          = 'Hydrogen';\par
i18n['en']['ss_preview']     = 'Starsystem overview n\'c2\'b0';\par
i18n['en']['neutral,planet'] = ' Planet';\par
i18n['en']['emp,planet']     = ' Empire Planet';\par
i18n['en']['ally,planet']    = ' Alliance Planet';\par
i18n['en']['war,planet']     = ' enemy Planet';\par
i18n['en']['nap,planet']     = ' Nap Planet';\par
i18n['en']['wormhole']       = ' Wormhole';\par
i18n['en'][',asteroid']      = ' Asterroide';\par
i18n['en'][',wreckage']      = ' Wreckage';\par
i18n['en']['neutral,fleet']  = ' Neutral Fleet';\par
i18n['en']['own,fleet']      = ' Empire/Alliance Fleet';\par
i18n['en']['nap,fleet']      = ' Nap Fleet';\par
i18n['en']['enemy,fleet']    = ' Enemy Fleet';\par
i18n['en']['npc,fleet']      = ' Reaper Fleet';\par
i18n['en']['ga,fleet']       = ' Passive Fleet';\par
i18n['en']['troop_log_def']  = 'Robbed by';\par
i18n['en']['troop_log_att']  = 'Leave planet';\par
i18n['en']['building']       = 'Amount of buildings';\par
i18n['en']['water']          = 'Water surface';\par
i18n['en']['active_empire']  = 'Activate empire update';\par
\par
i18n['de'] = Array();\par
i18n['de']['eudeready']      = '<u>Data Engine</u> "de", actif';\par
i18n['de']['confheader']     = 'Options sp\'c3\'a9cifique au <u>Data Engine</u>';\par
i18n['de']['conflink']       = 'Adresse';\par
i18n['de']['confuser']       = 'Nickname';\par
i18n['de']['confpass']       = 'Passwort';\par
i18n['de']['confspacer']     = 1;\par
i18n['de']['confcells']      = 20;\par
i18n['de']['coords']         = 'Koordinaten';\par
i18n['de']['ress0']          = 'Titan';\par
i18n['de']['ress1']          = 'Kupfer';\par
i18n['de']['ress2']          = 'Eisen';\par
i18n['de']['ress3']          = 'Aluminium';\par
i18n['de']['ress4']          = 'Quecksilber';\par
i18n['de']['ress5']          = 'Silizium';\par
i18n['de']['ress6']          = 'Uran';\par
i18n['de']['ress7']          = 'Krypton';\par
i18n['de']['ress8']          = 'Stickstoff';\par
i18n['de']['ress9']          = 'Wasserstoff';\par
i18n['de']['ss_preview']     = 'Aper\'c3\'a7u syst\'c3\'a8me solaire n\'c2\'b0';\par
i18n['de']['neutral,planet'] = ' plan\'c3\'a8tes';\par
i18n['de']['emp,planet']     = ' joueur(s) de l\\'empire';\par
i18n['de']['ally,planet']    = ' joueur(s) alli\'c3\'a9';\par
i18n['de']['war,planet']     = ' joueur(s) en guerre';\par
i18n['de']['nap,planet']     = ' joueur(s) en pna';\par
i18n['de']['wormhole']       = ' vortex';\par
i18n['de'][',asteroid']      = ' ast\'c3\'a9ro\'c3\'afde(s)';\par
i18n['de'][',wreckage']      = ' champs de d\'c3\'a9bris';\par
i18n['de']['neutral,fleet']  = ' flotte(s) neutre';\par
i18n['de']['own,fleet']      = ' flotte(s) perso';\par
i18n['de']['nap,fleet']      = ' flotte(s) en pna';\par
i18n['de']['enemy,fleet']    = ' flotte(s) ennemie(s)';\par
i18n['de']['npc,fleet']      = ' flotte(s) pirate';\par
i18n['de']['ga,fleet']       = ' flotte(s) schtroumpfs';\par
i18n['de']['troop_log_def']  = 'D\'c3\'a9valis\'c3\'a9 par';\par
i18n['de']['troop_log_att']  = 'Quitter la plan\'c3\'a8te';\par
i18n['de']['building']       = 'Nombre de b\'c3\'a2timents';\par
i18n['de']['water']          = 'Surface d\\'eau';\par
i18n['de']['active_empire']  = 'Activer MAJ empire';\par
\par
// [PL] translation by jhonny\par
i18n['pl'] = Array();\par
i18n['pl']['eudeready']      = '<u>Data Engine</u> "pl", actif';\par
i18n['pl']['confheader']     = 'Opcje ustawienia do <u>Data Engine</u>';\par
i18n['pl']['conflink']       = 'Strona';\par
i18n['pl']['confuser']       = 'U\'c5\'bcytkownik';\par
i18n['pl']['confpass']       = 'Has\'c5\'82o';\par
i18n['pl']['confspacer']     = 1;\par
i18n['pl']['confcells']      = 20;\par
i18n['pl']['coords']         = 'Wsp\'c3\'b3\'c5\'82rz\'c4\'99dne';\par
i18n['pl']['ress0']          = 'Tytan';\par
i18n['pl']['ress1']          = 'Mied\'c5\'ba';\par
i18n['pl']['ress2']          = '\'c5\'bbelazo';\par
i18n['pl']['ress3']          = 'Aluminium';\par
i18n['pl']['ress4']          = 'Rt\'c4\'99\'c4\f1\'87';\par
i18n['pl']['ress5']          = 'Krzem';\par
i18n['pl']['ress6']          = 'Uran';\par
i18n['pl']['ress7']          = 'Krypton';\par
i18n['pl']['ress8']          = 'Azot';\par
i18n['pl']['ress9']          = 'Wod\f2\'c3\'b3r';\par
i18n['pl']['ss_preview']     = 'Przegl\'c4\'85d systemu gwiezdnego n\'c2\'b0';\par
i18n['pl']['neutral,planet'] = ' Planety';\par
i18n['pl']['emp,planet']     = ' Cz\'c5\'82onkowie imperium';\par
i18n['pl']['ally,planet']    = ' Cz\'c5\'82onkowie sojuszu';\par
i18n['pl']['war,planet']     = ' Cz\'c5\'82onkowie Wrogowie';\par
i18n['pl']['nap,planet']     = ' Cz\'c5\'82onkowie PON';\par
i18n['pl']['wormhole']       = ' Wormhold';\par
i18n['pl'][',asteroid']      = ' Asteroidy';\par
i18n['pl'][',wreckage']      = ' Z\'c5\'82om';\par
i18n['pl']['neutral,fleet']  = ' Neutralne Floty';\par
i18n['pl']['own,fleet']      = ' Moje Floty';\par
i18n['pl']['nap,fleet']      = ' Floty PON';\par
i18n['pl']['enemy,fleet']    = ' Wrogie Floty';\par
i18n['pl']['npc,fleet']      = ' Pirackie Floty';\par
i18n['pl']['ga,fleet']       = ' Smerfy Floty';\par
i18n['pl']['troop_log_def']  = 'D\'c3\'a9valis\'c3\'a9 par';\par
i18n['pl']['troop_log_att']  = 'Quitter la plan\'c3\'a8te';\par
i18n['pl']['building']       = 'Nombre de b\'c3\'a2timents';\par
i18n['pl']['water']          = 'Surface d\\'eau';\par
i18n['pl']['active_empire']  = 'Activer MAJ empire';\par
\par
function $() \{\par
    if (arguments.length==1) return document.getElementById(arguments[0]);\par
    var z=[], i=0, el;\par
    while(el=document.getElementById(arguments[i++]))\par
        if (el)\par
            z.push(el);\par
    return z;\par
\}\par
\par
function $x() \{\par
    var x='',          // default values\par
    node=document,\par
    type=0,\par
    fix=true,\par
    i=0,\par
    toAr=function(xp)\{      // XPathResult to array\par
        var _final=[], next;\par
        while(next=xp.iterateNext(),next)\par
            _final.push(next);\par
        return _final\par
    \},\par
    cur;\par
    while (cur=arguments[i++],cur)      // argument handler\par
        switch(typeof cur) \{\par
            case "string":\par
                x+=(x=='') ? cur : " | " + cur;\par
                continue;\par
            case "number":\par
                type=cur;\par
                continue;\par
            case "object":\par
                node=cur;\par
                continue;\par
            case "boolean":\par
                fix=cur;\par
                continue;\par
        \}\par
    if (fix) \{      // array conversion logic\par
        if (type==6) type=4;\par
        if (type==7) type=5;\par
    \}\par
    if (!/^\\//.test(x)) x="//"+x;         \tab  // selection mistake helper\par
    if (node!=document && !/^\\./.test(x)) x="."+x;  // context mistake helper\par
    var temp=document.evaluate(x,node,null,type,null); //evaluate!\par
    if (fix)\par
        switch(type) \{                              // automatically return special type\par
            case 1:\par
                return temp.numberValue;\par
            case 2:\par
                return temp.stringValue;\par
            case 3:\par
                return temp.booleanValue;\par
            case 8:\par
                return temp.singleNodeValue;\par
            case 9:\par
                return temp.singleNodeValue;\par
        \}\par
    return fix ? toAr(temp) : temp;\par
\}\par
\par
function trim (text) \{\par
    return rtrim(ltrim(text));\par
\}\par
/*\par
 * More info at: http://phpjs.org\par
 *\par
 * This is version: 3.17\par
 * php.js is copyright 2010 Kevin van Zonneveld.\par
 *\par
 * Portions copyright Brett Zamir (http://brett-zamir.me), Kevin van Zonneveld\par
 * (http://kevin.vanzonneveld.net), Onno Marsman, Theriault, Michael White\par
 * (http://getsprink.com), Waldo Malqui Silva, Paulo Freitas, Jonas Raoni\par
 * Soares Silva (http://www.jsfromhell.com), Jack, Philip Peterson, Legaev\par
 * Andrey, Ates Goral (http://magnetiq.com), Alex, Ratheous, Martijn Wieringa,\par
 * lmeyrick (https://sourceforge.net/projects/bcmath-js/), Nate, Philippe\par
 * Baumann, Enrique Gonzalez, Webtoolkit.info (http://www.webtoolkit.info/),\par
 * Jani Hartikainen, Ash Searle (http://hexmen.com/blog/), travc, Ole\par
 * Vrijenhoek, Carlos R. L. Rodrigues (http://www.jsfromhell.com),\par
 * http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript,\par
 * Michael Grier, Johnny Mast (http://www.phpvrouwen.nl), stag019, Rafa\'c5\'82\par
 * Kukawski (http://blog.kukawski.pl), pilus, T.Wild, Andrea Giammarchi\par
 * (http://webreflection.blogspot.com), WebDevHobo\par
 * (http://webdevhobo.blogspot.com/), GeekFG (http://geekfg.blogspot.com),\par
 * d3x, Erkekjetter, marrtins, Steve Hilder, Martin\par
 * (http://www.erlenwiese.de/), Robin, Oleg Eremeev, mdsjack\par
 * (http://www.mdsjack.bo.it), majak, Mailfaker (http://www.weedem.fr/),\par
 * David, felix, Mirek Slugen, KELAN, Paul Smith, Marc Palau, Chris, Josh\par
 * Fraser\par
 * (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/),\par
 * Breaking Par Consulting Inc\par
 * (http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7),\par
 * Tim de Koning (http://www.kingsquare.nl), Arpad Ray (mailto:arpad@php.net),\par
 * Public Domain (http://www.json.org/json2.js), Michael White, Steven\par
 * Levithan (http://blog.stevenlevithan.com), Joris, gettimeofday, Sakimori,\par
 * Alfonso Jimenez (http://www.alfonsojimenez.com), Aman Gupta, Caio Ariede\par
 * (http://caioariede.com), AJ, Diplom@t (http://difane.com/), saulius,\par
 * Pellentesque Malesuada, Thunder.m, Tyler Akins (http://rumkin.com), Felix\par
 * Geisendoerfer (http://www.debuggable.com/felix), gorthaur, Imgen Tata\par
 * (http://www.myipdf.com/), Karol Kowalski, Kankrelune\par
 * (http://www.webfaktory.info/), Lars Fischer, Subhasis Deb, josh, Frank\par
 * Forte, Douglas Crockford (http://javascript.crockford.com), Adam Wallner\par
 * (http://web2.bitbaro.hu/), Marco, paulo kuong, madipta, Gilbert, duncan,\par
 * ger, mktime, Oskar Larsson H\'c3\'b6gfeldt (http://oskar-lh.name/), Arno, Nathan,\par
 * Mateusz "loonquawl" Zalega, ReverseSyntax, Francois, Scott Cariss, Slawomir\par
 * Kaniecki, Denny Wardhana, sankai, 0m3r, noname, john\par
 * (http://www.jd-tech.net), Nick Kolosov (http://sammy.ru), Sanjoy Roy,\par
 * Shingo, nobbler, Fox, marc andreu, T. Wild, class_exists, Jon Hohle,\par
 * Pyerre, JT, Thiago Mata (http://thiagomata.blog.com), Linuxworld, Ozh,\par
 * nord_ua, lmeyrick (https://sourceforge.net/projects/bcmath-js/this.),\par
 * Thomas Beaucourt (http://www.webapp.fr), David Randall, merabi, T0bsn,\par
 * Soren Hansen, Peter-Paul Koch (http://www.quirksmode.org/js/beat.html),\par
 * MeEtc (http://yass.meetcweb.com), Bryan Elliott, Tim Wiel, Brad Touesnard,\par
 * XoraX (http://www.xorax.info), djmix, Hyam Singer\par
 * (http://www.impact-computing.com/), Paul, J A R, kenneth, Raphael (Ao\par
 * RUDLER), David James, Steve Clay, Ole Vrijenhoek (http://www.nervous.nl/),\par
 * Marc Jansen, Francesco, Der Simon (http://innerdom.sourceforge.net/), echo\par
 * is bad, Lincoln Ramsay, Eugene Bulkin (http://doubleaw.com/), JB, Bayron\par
 * Guevara, Stoyan Kyosev (http://www.svest.org/), LH, Matt Bradley, date,\par
 * Kristof Coomans (SCK-CEN Belgian Nucleair Research Centre), Pierre-Luc\par
 * Paour, Martin Pool, Brant Messenger (http://www.brantmessenger.com/), Kirk\par
 * Strobeck, Saulo Vallory, Christoph, Wagner B. Soares, Artur Tchernychev,\par
 * Valentina De Rosa, Jason Wong (http://carrot.org/), Daniel Esteban,\par
 * strftime, Rick Waldron, Mick@el, Anton Ongson, Simon Willison\par
 * (http://simonwillison.net), Gabriel Paderni, Philipp Lenssen, Marco van\par
 * Oort, Bug?, Blues (http://tech.bluesmoon.info/), Tomasz Wesolowski, rezna,\par
 * Eric Nagel, Bobby Drake, Luke Godfrey, Pul, uestla, Alan C, Zahlii, Ulrich,\par
 * Yves Sucaet, hitwork, sowberry, johnrembo, Brian Tafoya\par
 * (http://www.premasolutions.com/), Nick Callen, Steven Levithan\par
 * (stevenlevithan.com), ejsanders, Scott Baker, Philippe Jausions\par
 * (http://pear.php.net/user/jausions), Aidan Lister\par
 * (http://aidanlister.com/), Norman "zEh" Fuchs, Rob, HKM, ChaosNo1, metjay,\par
 * strcasecmp, strcmp, Taras Bogach, jpfle, Alexander Ermolaev\par
 * (http://snippets.dzone.com/user/AlexanderErmolaev), DxGx, kilops, Orlando,\par
 * dptr1988, Le Torbi, Pedro Tainha (http://www.pedrotainha.com), James,\par
 * penutbutterjelly, Christian Doebler, baris ozdil, Greg Frazier, Tod\par
 * Gentille, Alexander M Beedie, Ryan W Tenney (http://ryan.10e.us),\par
 * FGFEmperor, gabriel paderni, Atli \'c3\'9e\'c3\'b3r, Maximusya, daniel airton wermann\par
 * (http://wermann.com.br), 3D-GRAF, Yannoo, jakes, Riddler\par
 * (http://www.frontierwebdev.com/), T.J. Leahy, stensi, Matteo, Billy, vlado\par
 * houba, Itsacon (http://www.itsacon.net/), Jalal Berrami, Victor, fearphage\par
 * (http://http/my.opera.com/fearphage/), Luis Salazar\par
 * (http://www.freaky-media.com/), FremyCompany, Tim de Koning, taith, Cord,\par
 * Manish, davook, Benjamin Lupton, Garagoth, Andrej Pavlovic, Dino, William,\par
 * rem, Russell Walker (http://www.nbill.co.uk/), Jamie Beck\par
 * (http://www.terabit.ca/), setcookie, Michael, YUI Library:\par
 * http://developer.yahoo.com/yui/docs/YAHOO.util.DateLocale.html, Blues at\par
 * http://hacks.bluesmoon.info/strftime/strftime.js, DtTvB\par
 * (http://dt.in.th/2008-09-16.string-length-in-bytes.html), Andreas, meo,\par
 * Greenseed, Luke Smith (http://lucassmith.name), Kheang Hok Chin\par
 * (http://www.distantia.ca/), Rival, Diogo Resende, Allan Jensen\par
 * (http://www.winternet.no), Howard Yeend, Jay Klehr, Amir Habibi\par
 * (http://www.residence-mixte.com/), mk.keck, Yen-Wei Liu, Leslie Hoare, Ben\par
 * Bryan, Cagri Ekin, booeyOH\par
 *\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * Permission is hereby granted, free of charge, to any person obtaining a\par
 * copy of this software and associated documentation files (the\par
 * "Software"), to deal in the Software without restriction, including\par
 * without limitation the rights to use, copy, modify, merge, publish,\par
 * distribute, sublicense, and/or sell copies of the Software, and to\par
 * permit persons to whom the Software is furnished to do so, subject to\par
 * the following conditions:\par
 *\par
 * The above copyright notice and this permission notice shall be included\par
 * in all copies or substantial portions of the Software.\par
 *\par
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS\par
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\par
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\par
 * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES\par
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,\par
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\par
 * OTHER DEALINGS IN THE SOFTWARE.\par
 */\par
\par
function ltrim ( str, charlist ) \{\par
    // Strips whitespace from the beginning of a string\par
    //\par
    // version: 1006.1915\par
    // discuss at: http://phpjs.org/functions/ltrim\par
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // +      input by: Erkekjetter\par
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // +   bugfixed by: Onno Marsman\par
    // *     example 1: ltrim('    Kevin van Zonneveld    ');\par
    // *     returns 1: 'Kevin van Zonneveld    '\par
    charlist = !charlist ? ' \\\\s\\u00A0' : (charlist+'').replace(/([\\[\\]\\(\\)\\.\\?\\/\\*\\\{\\\}\\+\\$\\^\\:])/g, '$1');\par
    var re = new RegExp('^[' + charlist + ']+', 'g');\par
    return (str+'').replace(re, '');\par
\}\par
\par
function md5 (str) \{\par
    // Calculate the md5 hash of a string\par
    //\par
    // version: 1006.1915\par
    // discuss at: http://phpjs.org/functions/md5\par
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)\par
    // + namespaced by: Michael White (http://getsprink.com)\par
    // +    tweaked by: Jack\par
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // +      input by: Brett Zamir (http://brett-zamir.me)\par
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // -    depends on: utf8_encode\par
    // *     example 1: md5('Kevin van Zonneveld');\par
    // *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'\par
    var xl;\par
\par
    var rotateLeft = function (lValue, iShiftBits) \{\par
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));\par
    \};\par
\par
    var addUnsigned = function (lX,lY) \{\par
        var lX4,lY4,lX8,lY8,lResult;\par
        lX8 = (lX & 0x80000000);\par
        lY8 = (lY & 0x80000000);\par
        lX4 = (lX & 0x40000000);\par
        lY4 = (lY & 0x40000000);\par
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);\par
        if (lX4 & lY4) \{\par
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);\par
        \}\par
        if (lX4 | lY4) \{\par
            if (lResult & 0x40000000) \{\par
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);\par
            \} else \{\par
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);\par
            \}\par
        \} else \{\par
            return (lResult ^ lX8 ^ lY8);\par
        \}\par
    \};\par
\par
    var _F = function (x,y,z) \{\par
        return (x & y) | ((~x) & z);\par
    \};\par
    var _G = function (x,y,z) \{\par
        return (x & z) | (y & (~z));\par
    \};\par
    var _H = function (x,y,z) \{\par
        return (x ^ y ^ z);\par
    \};\par
    var _I = function (x,y,z) \{\par
        return (y ^ (x | (~z)));\par
    \};\par
\par
    var _FF = function (a,b,c,d,x,s,ac) \{\par
        a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));\par
        return addUnsigned(rotateLeft(a, s), b);\par
    \};\par
\par
    var _GG = function (a,b,c,d,x,s,ac) \{\par
        a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));\par
        return addUnsigned(rotateLeft(a, s), b);\par
    \};\par
\par
    var _HH = function (a,b,c,d,x,s,ac) \{\par
        a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));\par
        return addUnsigned(rotateLeft(a, s), b);\par
    \};\par
\par
    var _II = function (a,b,c,d,x,s,ac) \{\par
        a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));\par
        return addUnsigned(rotateLeft(a, s), b);\par
    \};\par
\par
    var convertToWordArray = function (str) \{\par
        var lWordCount;\par
        var lMessageLength = str.length;\par
        var lNumberOfWords_temp1=lMessageLength + 8;\par
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;\par
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;\par
        var lWordArray=new Array(lNumberOfWords-1);\par
        var lBytePosition = 0;\par
        var lByteCount = 0;\par
        while ( lByteCount < lMessageLength ) \{\par
            lWordCount = (lByteCount-(lByteCount % 4))/4;\par
            lBytePosition = (lByteCount % 4)*8;\par
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));\par
            lByteCount++;\par
        \}\par
        lWordCount = (lByteCount-(lByteCount % 4))/4;\par
        lBytePosition = (lByteCount % 4)*8;\par
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);\par
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;\par
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;\par
        return lWordArray;\par
    \};\par
\par
    var wordToHex = function (lValue) \{\par
        var wordToHexValue="",wordToHexValue_temp="",lByte,lCount;\par
        for (lCount = 0;lCount<=3;lCount++) \{\par
            lByte = (lValue>>>(lCount*8)) & 255;\par
            wordToHexValue_temp = "0" + lByte.toString(16);\par
            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length-2,2);\par
        \}\par
        return wordToHexValue;\par
    \};\par
\par
    var x=[],\par
    k,AA,BB,CC,DD,a,b,c,d,\par
    S11=7, S12=12, S13=17, S14=22,\par
    S21=5, S22=9 , S23=14, S24=20,\par
    S31=4, S32=11, S33=16, S34=23,\par
    S41=6, S42=10, S43=15, S44=21;\par
\par
    str = utf8_encode(str);\par
    x = convertToWordArray(str);\par
    a = 0x67452301;\par
    b = 0xEFCDAB89;\par
    c = 0x98BADCFE;\par
    d = 0x10325476;\par
\par
    xl = x.length;\par
    for (k=0;k<xl;k+=16) \{\par
        AA=a;\par
        BB=b;\par
        CC=c;\par
        DD=d;\par
        a=_FF(a,b,c,d,x[k+0], S11,0xD76AA478);\par
        d=_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);\par
        c=_FF(c,d,a,b,x[k+2], S13,0x242070DB);\par
        b=_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);\par
        a=_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);\par
        d=_FF(d,a,b,c,x[k+5], S12,0x4787C62A);\par
        c=_FF(c,d,a,b,x[k+6], S13,0xA8304613);\par
        b=_FF(b,c,d,a,x[k+7], S14,0xFD469501);\par
        a=_FF(a,b,c,d,x[k+8], S11,0x698098D8);\par
        d=_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);\par
        c=_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);\par
        b=_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);\par
        a=_FF(a,b,c,d,x[k+12],S11,0x6B901122);\par
        d=_FF(d,a,b,c,x[k+13],S12,0xFD987193);\par
        c=_FF(c,d,a,b,x[k+14],S13,0xA679438E);\par
        b=_FF(b,c,d,a,x[k+15],S14,0x49B40821);\par
        a=_GG(a,b,c,d,x[k+1], S21,0xF61E2562);\par
        d=_GG(d,a,b,c,x[k+6], S22,0xC040B340);\par
        c=_GG(c,d,a,b,x[k+11],S23,0x265E5A51);\par
        b=_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);\par
        a=_GG(a,b,c,d,x[k+5], S21,0xD62F105D);\par
        d=_GG(d,a,b,c,x[k+10],S22,0x2441453);\par
        c=_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);\par
        b=_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);\par
        a=_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);\par
        d=_GG(d,a,b,c,x[k+14],S22,0xC33707D6);\par
        c=_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);\par
        b=_GG(b,c,d,a,x[k+8], S24,0x455A14ED);\par
        a=_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);\par
        d=_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);\par
        c=_GG(c,d,a,b,x[k+7], S23,0x676F02D9);\par
        b=_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);\par
        a=_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);\par
        d=_HH(d,a,b,c,x[k+8], S32,0x8771F681);\par
        c=_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);\par
        b=_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);\par
        a=_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);\par
        d=_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);\par
        c=_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);\par
        b=_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);\par
        a=_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);\par
        d=_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);\par
        c=_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);\par
        b=_HH(b,c,d,a,x[k+6], S34,0x4881D05);\par
        a=_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);\par
        d=_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);\par
        c=_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);\par
        b=_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);\par
        a=_II(a,b,c,d,x[k+0], S41,0xF4292244);\par
        d=_II(d,a,b,c,x[k+7], S42,0x432AFF97);\par
        c=_II(c,d,a,b,x[k+14],S43,0xAB9423A7);\par
        b=_II(b,c,d,a,x[k+5], S44,0xFC93A039);\par
        a=_II(a,b,c,d,x[k+12],S41,0x655B59C3);\par
        d=_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);\par
        c=_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);\par
        b=_II(b,c,d,a,x[k+1], S44,0x85845DD1);\par
        a=_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);\par
        d=_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);\par
        c=_II(c,d,a,b,x[k+6], S43,0xA3014314);\par
        b=_II(b,c,d,a,x[k+13],S44,0x4E0811A1);\par
        a=_II(a,b,c,d,x[k+4], S41,0xF7537E82);\par
        d=_II(d,a,b,c,x[k+11],S42,0xBD3AF235);\par
        c=_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);\par
        b=_II(b,c,d,a,x[k+9], S44,0xEB86D391);\par
        a=addUnsigned(a,AA);\par
        b=addUnsigned(b,BB);\par
        c=addUnsigned(c,CC);\par
        d=addUnsigned(d,DD);\par
    \}\par
\par
    var temp = wordToHex(a)+wordToHex(b)+wordToHex(c)+wordToHex(d);\par
\par
    return temp.toLowerCase();\par
\}\par
\par
function rtrim ( str, charlist ) \{\par
    // Removes trailing whitespace\par
    //\par
    // version: 1006.1915\par
    // discuss at: http://phpjs.org/functions/rtrim\par
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // +      input by: Erkekjetter\par
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // +   bugfixed by: Onno Marsman\par
    // +   input by: rem\par
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)\par
    // *     example 1: rtrim('    Kevin van Zonneveld    ');\par
    // *     returns 1: '    Kevin van Zonneveld'\par
    charlist = !charlist ? ' \\\\s\\u00A0' : (charlist+'').replace(/([\\[\\]\\(\\)\\.\\?\\/\\*\\\{\\\}\\+\\$\\^\\:])/g, '\\\\$1');\par
    var re = new RegExp('[' + charlist + ']+$', 'g');\par
    return (str+'').replace(re, '');\par
\}\par
\par
function serialize (mixed_value) \{\par
    // Returns a string representation of variable (which can later be unserialized)\par
    //\par
    // version: 1006.1915\par
    // discuss at: http://phpjs.org/functions/serialize\par
    // +   original by: Arpad Ray (mailto:arpad@php.net)\par
    // +   improved by: Dino\par
    // +   bugfixed by: Andrej Pavlovic\par
    // +   bugfixed by: Garagoth\par
    // +      input by: DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)\par
    // +   bugfixed by: Russell Walker (http://www.nbill.co.uk/)\par
    // +   bugfixed by: Jamie Beck (http://www.terabit.ca/)\par
    // +      input by: Martin (http://www.erlenwiese.de/)\par
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // -    depends on: utf8_encode\par
    // %          note: We feel the main purpose of this function should be to ease the transport of data between php & js\par
    // %          note: Aiming for PHP-compatibility, we have to translate objects to arrays\par
    // *     example 1: serialize(['Kevin', 'van', 'Zonneveld']);\par
    // *     returns 1: 'a:3:\{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";\}'\par
    // *     example 2: serialize(\{firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'\});\par
    // *     returns 2: 'a:3:\{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";\}'\par
    var _getType = function (inp) \{\par
        var type = typeof inp, match;\par
        var key;\par
        if (type == 'object' && !inp) \{\par
            return 'null';\par
        \}\par
        if (type == "object") \{\par
            if (!inp.constructor) \{\par
                return 'object';\par
            \}\par
            var cons = inp.constructor.toString();\par
            match = cons.match(/(\\w+)\\(/);\par
            if (match) \{\par
                cons = match[1].toLowerCase();\par
            \}\par
            var types = ["boolean", "number", "string", "array"];\par
            for (key in types) \{\par
                if (cons == types[key]) \{\par
                    type = types[key];\par
                    break;\par
                \}\par
            \}\par
        \}\par
        return type;\par
    \};\par
    var type = _getType(mixed_value);\par
    var val, ktype = '';\par
\par
    switch (type) \{\par
        case "function":\par
            val = "";\par
            break;\par
        case "boolean":\par
            val = "b:" + (mixed_value ? "1" : "0");\par
            break;\par
        case "number":\par
            val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;\par
            break;\par
        case "string":\par
            mixed_value = utf8_encode(mixed_value);\par
            val = "s:" + encodeURIComponent(mixed_value).replace(/%../g, 'x').length + ":\\"" + mixed_value + "\\"";\par
            break;\par
        case "array":\par
        case "object":\par
            val = "a";\par
            /*\par
            if (type == "object") \{\par
                var objname = mixed_value.constructor.toString().match(/(\\w+)\\(\\)/);\par
                if (objname == undefined) \{\par
                    return;\par
                \}\par
                objname[1] = this.serialize(objname[1]);\par
                val = "O" + objname[1].substring(1, objname[1].length - 1);\par
            \}\par
             */\par
            var count = 0;\par
            var vals = "";\par
            var okey;\par
            var key;\par
            for (key in mixed_value) \{\par
                ktype = _getType(mixed_value[key]);\par
                if (ktype == "function") \{\par
                    continue;\par
                \}\par
\par
                okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);\par
                vals += serialize(okey) +\par
                serialize(mixed_value[key]);\par
                count++;\par
            \}\par
            val += ":" + count + ":\{" + vals + "\}";\par
            break;\par
        case "undefined": // Fall-through\par
        default: // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP\par
            val = "N";\par
            break;\par
    \}\par
    if (type != "object" && type != "array") \{\par
        val += ";";\par
    \}\par
    return val;\par
\}\par
\par
function unserialize (data) \{\par
    // Takes a string representation of variable and recreates it\par
    //\par
    // version: 1006.1915\par
    // discuss at: http://phpjs.org/functions/unserialize\par
    // +     original by: Arpad Ray (mailto:arpad@php.net)\par
    // +     improved by: Pedro Tainha (http://www.pedrotainha.com)\par
    // +     bugfixed by: dptr1988\par
    // +      revised by: d3x\par
    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // +        input by: Brett Zamir (http://brett-zamir.me)\par
    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // +     improved by: Chris\par
    // +     improved by: James\par
    // +        input by: Martin (http://www.erlenwiese.de/)\par
    // +     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // +     improved by: Le Torbi\par
    // +     input by: kilops\par
    // +     bugfixed by: Brett Zamir (http://brett-zamir.me)\par
    // -      depends on: utf8_decode\par
    // %            note: We feel the main purpose of this function should be to ease the transport of data between php & js\par
    // %            note: Aiming for PHP-compatibility, we have to translate objects to arrays\par
    // *       example 1: unserialize('a:3:\{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";\}');\par
    // *       returns 1: ['Kevin', 'van', 'Zonneveld']\par
    // *       example 2: unserialize('a:3:\{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";\}');\par
    // *       returns 2: \{firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'\}\par
    var utf8Overhead = function(chr) \{\par
        // http://phpjs.org/functions/unserialize:571#comment_95906\par
        var code = chr.charCodeAt(0);\par
        if (code < 0x0080) \{\par
            return 0;\par
        \}\par
        if (code < 0x0800) \{\par
            return 1;\par
        \}\par
        return 2;\par
    \};\par
\par
\par
    var error = function (type, msg, filename, line)\{\par
        throw new window[type](msg, filename, line);\par
    \};\par
    var read_until = function (data, offset, stopchr)\{\par
        var buf = [];\par
        var chr = data.slice(offset, offset + 1);\par
        var i = 2;\par
        while (chr != stopchr) \{\par
            if ((i+offset) > data.length) \{\par
                error('Error', 'Invalid');\par
            \}\par
            buf.push(chr);\par
            chr = data.slice(offset + (i - 1),offset + i);\par
            i += 1;\par
        \}\par
        return [buf.length, buf.join('')];\par
    \};\par
    var read_chrs = function (data, offset, length)\{\par
        var buf;\par
\par
        buf = [];\par
        for (var i = 0;i < length;i++)\{\par
            var chr = data.slice(offset + (i - 1),offset + i);\par
            buf.push(chr);\par
            length -= utf8Overhead(chr);\par
        \}\par
        return [buf.length, buf.join('')];\par
    \};\par
    var _unserialize = function (data, offset)\{\par
        var readdata;\par
        var readData;\par
        var chrs = 0;\par
        var ccount;\par
        var stringlength;\par
        var keyandchrs;\par
        var keys;\par
\par
        if (!offset) \{\par
            offset = 0;\par
        \}\par
        var dtype = (data.slice(offset, offset + 1)).toLowerCase();\par
\par
        var dataoffset = offset + 2;\par
        var typeconvert = function(x) \{\par
            return x;\par
        \};\par
\par
        switch (dtype)\{\par
            case 'i':\par
                typeconvert = function (x) \{\par
                    return parseInt(x, 10);\par
                \};\par
                readData = read_until(data, dataoffset, ';');\par
                chrs = readData[0];\par
                readdata = readData[1];\par
                dataoffset += chrs + 1;\par
                break;\par
            case 'b':\par
                typeconvert = function (x) \{\par
                    return parseInt(x, 10) !== 0;\par
                \};\par
                readData = read_until(data, dataoffset, ';');\par
                chrs = readData[0];\par
                readdata = readData[1];\par
                dataoffset += chrs + 1;\par
                break;\par
            case 'd':\par
                typeconvert = function (x) \{\par
                    return parseFloat(x);\par
                \};\par
                readData = read_until(data, dataoffset, ';');\par
                chrs = readData[0];\par
                readdata = readData[1];\par
                dataoffset += chrs + 1;\par
                break;\par
            case 'n':\par
                readdata = null;\par
                break;\par
            case 's':\par
                ccount = read_until(data, dataoffset, ':');\par
                chrs = ccount[0];\par
                stringlength = ccount[1];\par
                dataoffset += chrs + 2;\par
\par
                readData = read_chrs(data, dataoffset+1, parseInt(stringlength, 10));\par
                chrs = readData[0];\par
                readdata = readData[1];\par
                dataoffset += chrs + 2;\par
                if (chrs != parseInt(stringlength, 10) && chrs != readdata.length)\{\par
                    error('SyntaxError', 'String length mismatch');\par
                \}\par
\par
                // Length was calculated on an utf-8 encoded string\par
                // so wait with decoding\par
                readdata = utf8_decode(readdata);\par
                break;\par
            case 'a':\par
                readdata = \{\};\par
\par
                keyandchrs = read_until(data, dataoffset, ':');\par
                chrs = keyandchrs[0];\par
                keys = keyandchrs[1];\par
                dataoffset += chrs + 2;\par
\par
                for (var i = 0; i < parseInt(keys, 10); i++)\{\par
                    var kprops = _unserialize(data, dataoffset);\par
                    var kchrs = kprops[1];\par
                    var key = kprops[2];\par
                    dataoffset += kchrs;\par
\par
                    var vprops = _unserialize(data, dataoffset);\par
                    var vchrs = vprops[1];\par
                    var value = vprops[2];\par
                    dataoffset += vchrs;\par
\par
                    readdata[key] = value;\par
                \}\par
\par
                dataoffset += 1;\par
                break;\par
            default:\par
                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);\par
                break;\par
        \}\par
        return [dtype, dataoffset - offset, typeconvert(readdata)];\par
    \};\par
\par
    return _unserialize((data+''), 0)[2];\par
\}\par
\par
function utf8_decode ( str_data ) \{\par
    // Converts a UTF-8 encoded string to ISO-8859-1\par
    //\par
    // version: 1006.1915\par
    // discuss at: http://phpjs.org/functions/utf8_decode\par
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)\par
    // +      input by: Aman Gupta\par
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // +   improved by: Norman "zEh" Fuchs\par
    // +   bugfixed by: hitwork\par
    // +   bugfixed by: Onno Marsman\par
    // +      input by: Brett Zamir (http://brett-zamir.me)\par
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // *     example 1: utf8_decode('Kevin van Zonneveld');\par
    // *     returns 1: 'Kevin van Zonneveld'\par
    var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;\par
\par
    str_data += '';\par
\par
    while ( i < str_data.length ) \{\par
        c1 = str_data.charCodeAt(i);\par
        if (c1 < 128) \{\par
            tmp_arr[ac++] = String.fromCharCode(c1);\par
            i++;\par
        \} else if ((c1 > 191) && (c1 < 224)) \{\par
            c2 = str_data.charCodeAt(i+1);\par
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));\par
            i += 2;\par
        \} else \{\par
            c2 = str_data.charCodeAt(i+1);\par
            c3 = str_data.charCodeAt(i+2);\par
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));\par
            i += 3;\par
        \}\par
    \}\par
\par
    return tmp_arr.join('');\par
\}\par
\par
function utf8_encode ( argString ) \{\par
    // Encodes an ISO-8859-1 string to UTF-8\par
    //\par
    // version: 1006.1915\par
    // discuss at: http://phpjs.org/functions/utf8_encode\par
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)\par
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // +   improved by: sowberry\par
    // +    tweaked by: Jack\par
    // +   bugfixed by: Onno Marsman\par
    // +   improved by: Yves Sucaet\par
    // +   bugfixed by: Onno Marsman\par
    // +   bugfixed by: Ulrich\par
    // *     example 1: utf8_encode('Kevin van Zonneveld');\par
    // *     returns 1: 'Kevin van Zonneveld'\par
    var string = (argString+''); // .replace(/\\r\\n/g, "\\n").replace(/\\r/g, "\\n");\par
\par
    var utftext = "";\par
    var start, end;\par
    var stringl = 0;\par
\par
    start = end = 0;\par
    stringl = string.length;\par
    for (var n = 0; n < stringl; n++) \{\par
        var c1 = string.charCodeAt(n);\par
        var enc = null;\par
\par
        if (c1 < 128) \{\par
            end++;\par
        \} else if (c1 > 127 && c1 < 2048) \{\par
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);\par
        \} else \{\par
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);\par
        \}\par
        if (enc !== null) \{\par
            if (end > start) \{\par
                utftext += string.substring(start, end);\par
            \}\par
            utftext += enc;\par
            start = end = n+1;\par
        \}\par
    \}\par
\par
    if (end > start) \{\par
        utftext += string.substring(start, string.length);\par
    \}\par
\par
    return utftext;\par
\}\par
function function_exists (function_name) \{\par
    // Checks if the function exists\par
    //\par
    // version: 1006.1915\par
    // discuss at: http://phpjs.org/functions/function_exists\par
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\par
    // +   improved by: Steve Clay\par
    // +   improved by: Legaev Andrey\par
    // *     example 1: function_exists('isFinite');\par
    // *     returns 1: true\par
    if (typeof function_name == 'string')\{\par
        return (typeof this.window[function_name] == 'function');\par
    \} else \{\par
        return (function_name instanceof Function);\par
    \}\par
\}\par
function getElementsByClass(searchClass,node,tag) \{\par
\tab var classElements = new Array();\par
\tab if ( node == null )\par
\tab\tab node = document;\par
\tab if ( tag == null )\par
\tab\tab tag = '*';\par
\tab var els = node.getElementsByTagName(tag);\par
\tab var elsLen = els.length;\par
\tab var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");\par
\tab for (i = 0, j = 0; i < elsLen; i++) \{\par
\tab\tab if ( pattern.test(els[i].className) ) \{\par
\tab\tab\tab classElements[j] = els[i];\par
\tab\tab\tab j++;\par
\tab\tab\}\par
\tab\}\par
\tab return classElements;\par
\}\par
function options_spacer(width) \{\par
    var cell = document.createElement('td');\par
    if (!width) width='20';\par
    cell.innerHTML = '<img width="'+width+'" height="1" src="/img/empty.gif"/>';\par
    return cell;\par
\}\par
function options_header(text) \{\par
    var cell = document.createElement('td');\par
    cell.setAttribute('class', 'font_pink_bold');\par
    cell.setAttribute('colspan', '4');\par
    cell.innerHTML = text;\par
    return cell;\par
\}\par
function options_cell(text, style) \{\par
    var cell = document.createElement('td');\par
    cell.setAttribute('class', 'font_white');\par
    if (style) cell.setAttribute('valign', 'top');\par
    cell.innerHTML = text;\par
    return cell;\par
\}\par
\par
function options_text_s(name, value, width, type) \{\par
    if (!type) type = 'text'; else type = 'password';\par
    result = "<table cellspacing='0' cellpadding='0'><tr>"+\par
    "<td><img src='http://static.empireuniverse2.de/default/fr/default/input/input_left_blue.gif'></td>"+\par
    "<td style='background-image:url(http://static.empireuniverse2.de/default/fr/default/input/input_back_blue.gif);'>"+\par
    "<input type='"+type+"' class='input' maxlength='' style='width:"+width+\par
    "px;height:18px;background:transparent;padding:2px 0px 0px 0px; font-size:11px;color:#000000;margin:0px;border:0px' "+\par
    "' id='"+name+"' value='"+value+"' >    </td>"+\par
    "<td><img src='http://static.empireuniverse2.de/default/fr/default/input/input_right_blue.gif'></td>"+\par
    "</tr>    </table>";\par
\par
    return result;\par
\}\par
\par
function options_button_save(id) \{\par
    return '<img border="0" id="'+id+\par
    '" onmousedown="image_swap(\\''+id+'\\',\\'http://static.empireuniverse2.de/default/'+c_game_lang+'/default/button/button_1/save/button_down.gif\\')"'+\par
    ' onmouseover="image_swap(\\''+id+'\\',\\'http://static.empireuniverse2.de/default/'+c_game_lang+'/default/button/button_1/save/button_over.gif\\')"'+\par
    ' onmouseup="image_swap(\\''+id+'\\',\\'http://static.empireuniverse2.de/default/'+c_game_lang+'/default/button/button_1/save/button_default.gif\\')"'+\par
    ' onmouseout="image_swap(\\''+id+'\\',\\'http://static.empireuniverse2.de/default/'+c_game_lang+'/default/button/button_1/save/button_default.gif\\')"'+\par
    ' src="http://static.empireuniverse2.de/default/'+c_game_lang+'/default/button/button_1/save/button_default.gif" class="button"/>';\par
\}\par
\par
function options_checkbox_s(name, active) \{\par
\tab var status;\par
\tab if (!active) status = ''; else status = 'checked';\par
    result = "<input type='checkbox' class='input' maxlength='' name='"+name+"' id='"+name+"' value='on' "+status+">";\par
\par
    return result;\par
\}\par
\par
\par
function AddGameLog(text) \{\par
    var log = null;\par
    try \{\par
        log = unsafeWindow.top.document.getElementById('gamelog');\par
    \} catch(e) \{\par
        GM_log('AddGameLog Err:'+text);\par
    \}\par
    if (log != null) log.innerHTML = text+'<br/>'+log.innerHTML;\par
\}\par
\par
function AddToMotd(text,sep) \{\par
\tab AddGameLog(text);\par
/*    var chat_motd = null;\par
    try \{\par
        chat_motd = unsafeWindow.top.document.getElementById('chat_motd');\par
    \} catch(e) \{\par
        GM_log('AddToMotd Err:'+text);\par
    \}\par
    if (!sep) sep = '<br/>';\par
    var tmp = text+sep+chat_motd.innerHTML;\par
    chat_motd.innerHTML = tmp.substr(0,4000);*/\par
\}\par
var c_onload = function(e) \{\par
\par
    if (e.status=='404' || e.status=='405') \{\par
        GM_setValue(c_prefix+'actived','0');\par
        AddGameLog('<span class="gamelog_raid">No answer with Data Engine ('+e.status+')</span>');\par
        return alert('No link etablished with ours Data Engine\\nCheck address');\par
        top.location.reload(true);\par
    \}\par
    if (e.status=='500') \{\par
        AddGameLog('<span class="gamelog_raid">Ours server has crached ?</span>');\par
        return alert('Ours server has crached ?!');\par
    \}\par
\par
    if (e.responseText.indexOf('<eude>')<0) \{\par
        alert("XML error, disabling 'eude'...\\n\\n\\n\\nData Engine send:\\n"+e.responseText);\par
        if (debug) return false;\par
        GM_setValue(c_prefix+'actived','0');\par
        return top.location.reload(true);\par
    \}\par
    \par
    //if (debug) alert("Debug...\\n"+e.responseXML+e.responseText);\par
\par
    if (!e.responseXML)\par
        e.responseXML = new DOMParser().parseFromString(e.responseText, "text/xml");\par
    //    alert('xx'+ e.responseXML.getDocumentElement());\par
\par
\par
    if (GetNode(e.responseXML, 'phperror')!='')\par
        alert("Error found:\\n\\n"+GetNode(e.responseXML, 'phperror'));\par
    \par
    if (GetNode(e.responseXML, 'logtype'))\par
        $type = GetNode(e.responseXML, 'logtype');\par
    else\par
        $type = ((e.status!='200')? 'raid':'event');\par
\par
    if (GetNode(e.responseXML, 'log')!='')\par
        AddGameLog('<span class="gamelog_'+$type+'">'+GetNode(e.responseXML, 'log')+'</span>');\par
\par
    if (GetNode(e.responseXML, 'alert')!='') alert(GetNode(e.responseXML, 'alert'));\par
    if (GetNode(e.responseXML, 'script')!='') eval(GetNode(e.responseXML, 'script'));\par
\par
    if (GetNode(e.responseXML, 'GM_active')!='') \{\par
        var active = GetNode(e.responseXML, 'GM_active');\par
        GM_setValue(c_prefix+'actived', active);\par
        if (active=='1') \{\par
            GM_setValue(c_prefix+'galaxy_info',   GetNode(e.responseXML, 'GM_galaxy_info')  =='1'? true:false);\par
            GM_setValue(c_prefix+'planet_info',   GetNode(e.responseXML, 'GM_planet_info')  =='1'? true:false);\par
            GM_setValue(c_prefix+'asteroid_info', GetNode(e.responseXML, 'GM_asteroid_info')=='1'? true:false);\par
            GM_setValue(c_prefix+'pnj_info',      GetNode(e.responseXML, 'GM_pnj_info')     =='1'? true:false);\par
            GM_setValue(c_prefix+'troops_battle', GetNode(e.responseXML, 'GM_troops_battle')=='1'? true:false);\par
\tab\tab\tab GM_setValue(c_prefix+'empire_maj',  GetNode(e.responseXML, 'GM_empire_maj')     =='1'? true:false);\par
        \}\par
        if (c_page!='/index.php') top.location.reload(true);\par
    \}\par
    if (GetNode(e.responseXML, 'content')!='')\par
        AddToMotd(GetNode(e.responseXML, 'content'));\par
\par
    return true;\par
\}\par
\par
var c_onerror = function(e) \{\par
    AddGameLog('<span class="gamelog_raid">Fatal ('+e.status+'): Use in firefox only</span>');\par
\}\par
\par
function get_xml(key, data) \{\par
    var _server = GM_getValue(c_prefix+'serveur','')+\par
    'xml/eude.php?act='+key;\par
    if (debug) _server += '&XDEBUG_SESSION_START=netbeans-xdebug';\par
    var _data='';\par
\par
    switch(typeof data) \{\par
        case "string":\par
            _data = '&data='+encodeURIComponent(data);\par
            break;\par
        case "number":\par
            _data = '&data='+data;\par
            break;\par
        case "object":\par
            for (var item in data) \{\par
                _data+='&'+item+'='+encodeURIComponent(data[item]);\par
            \}\par
            break;\par
        case "boolean":\par
            if (data)\par
                _data = '&data=1';\par
            else\par
                _data = '&data=0';\par
            break;\par
    \}\par
    _data = 'user='+encodeURIComponent(GM_getValue(c_prefix+'user',''))+\par
    '&pass='+encodeURIComponent(md5(GM_getValue(c_prefix+'pass','')))+\par
    '&svr='+encodeURIComponent(c_prefix)+_data;\par
\par
    GM_xmlhttpRequest(\{\par
        method: 'POST',\par
        headers: \{\par
            'Content-Type':'application/x-www-form-urlencoded',\par
            "User-Agent": navigator.userAgent,\par
            "Accept": "text/xml",\par
            "Accept-Encoding":"deflate"\par
        \},\par
        data: _data,\par
        url: _server,\par
        onload: c_onload,\par
        onerror: c_onerror\par
    \});\par
\}\par
\par
function GetNode (xml, tag)\{\par
    try\par
    \{\par
        var tagdata = xml.firstChild.getElementsByTagName(tag);\par
        if (tagdata.length>0)\par
            return tagdata[0].firstChild.nodeValue;\par
        else\par
            return '';\par
    \} catch (e) \{\par
        return 'Erreur XML';\par
    \}\par
    return '';\par
\}\par
function Index() \{\par
    AddGameLog('<span class="gamelog_event">'+i18n[c_game_lang]['eudeready']+'</span>');\par
    var script = document.createElement('script');\par
    script.type = 'text/javascript';\par
    script.text = '\\x6f\\x6c\\x64\\x53\\x65\\x74\\x54\\x69\\x6d\\x65\\x6f\\x75\\x74'+\par
    '\\x20\\x3d\\x20\\x77\\x69\\x6e\\x64\\x6f\\x77\\x2e\\x73\\x65\\x74\\x54\\x69\\x6d'+\par
    '\\x65\\x6f\\x75\\x74\\x3b\\x0d\\x0a\\x77\\x69\\x6e\\x64\\x6f\\x77\\x2e\\x73\\x65'+\par
    '\\x74\\x54\\x69\\x6d\\x65\\x6f\\x75\\x74\\x20\\x3d\\x20\\x66\\x75\\x6e\\x63\\x74'+\par
    '\\x69\\x6f\\x6e\\x28\\x63\\x6f\\x64\\x65\\x2c\\x20\\x69\\x6e\\x74\\x65\\x72\\x76'+\par
    '\\x61\\x6c\\x29\\x20\\x7b\\x0d\\x0a\\x69\\x66\\x20\\x28\\x63\\x6f\\x64\\x65\\x3d'+\par
    '\\x3d\\x27\\x63\\x68\\x61\\x74\\x4f\\x70\\x65\\x6e\\x28\\x29\\x27\\x29\\x20\\x7b'+\par
    '\\x0d\\x0a\\x77\\x69\\x6e\\x64\\x6f\\x77\\x2e\\x73\\x65\\x74\\x54\\x69\\x6d\\x65'+\par
    '\\x6f\\x75\\x74\\x3d\\x6f\\x6c\\x64\\x53\\x65\\x74\\x54\\x69\\x6d\\x65\\x6f\\x75'+\par
    '\\x74\\x3b\\x0d\\x0a\\x72\\x65\\x74\\x75\\x72\\x6e\\x20\\x66\\x61\\x6c\\x73\\x65'+\par
    '\\x3b\\x0d\\x0a\\x7d\\x0d\\x0a\\x6f\\x6c\\x64\\x53\\x65\\x74\\x54\\x69\\x6d\\x65'+\par
    '\\x6f\\x75\\x74\\x28\\x63\\x6f\\x64\\x65\\x2c\\x20\\x69\\x6e\\x74\\x65\\x72\\x76'+\par
    '\\x61\\x6c\\x29\\x3b\\x0d\\x0a\\x7d';\par
    $x('/html/body')[0].appendChild(script);\par
\par
    var aserver = document.createElement('a');\par
    aserver.href=GM_getValue(c_prefix+'serveur','');\par
    aserver.target='_blank';\par
    aserver.innerHTML = 'DE';\par
\par
    x = $x('//*[@id="linkline"]');\par
    block = x[x.length-1];\par
    block.innerHTML = block.innerHTML + ' | ';\par
    block.appendChild(aserver);\par
    var chatton = unsafeWindow.top.window.document.getElementById('chat_motd');\par
    //chatton.style.height = 500;\par
\par
    if (debug) \{\par
        chatton.removeAttribute('OnClick');\par
        var js_OnClick = document.createAttribute('Ondblclick');\par
        js_OnClick.value = "chatOpen();";\par
        chatton.setAttributeNode(js_OnClick);\par
        var adebug = document.createElement('a');\par
        adebug.href='javascript:;';\par
        adebug.innerHTML = 'Reset';\par
        js_OnClick = document.createAttribute('OnClick');\par
        js_OnClick.value = "top.window.document.getElementById('chat_motd').style.display='';top.window.document.getElementById('chat').style.display='none';top.window.document.getElementById('chat_motd').innerHTML='';";\par
        adebug.setAttributeNode(js_OnClick);\par
        block.innerHTML = block.innerHTML + ', ';\par
        block.appendChild(adebug);\par
    \} else \{\par
      /*  var alog = document.createElement('a');\par
        alog.href='javascript:;';\par
        alog.innerHTML = 'Log';\par
        var js_OnClick = document.createAttribute('OnClick');\par
        js_OnClick.value = "top.window.document.getElementById('chat_motd').style.display='';top.window.document.getElementById('chat').style.display='none';";\par
        alog.setAttributeNode(js_OnClick);\par
        block.innerHTML = block.innerHTML + ', ';\par
        block.appendChild(alog);*/\par
    \}\par
\par
    get_xml('init');\par
    if (debug || mversion=='svn' || revision == '') return AddGameLog('<span class="gamelog_raid">Dev release, no update check</span>');\par
\par
    GM_xmlhttpRequest(\{\par
        method: 'GET',\par
        headers: \{\par
            "User-Agent": navigator.userAgent,\par
            "Accept": "text/xml",\par
            "Accept-Encoding":"deflate"\par
        \},\par
        url: 'http://eude.googlecode.com/svn/tag/GreaseMonkey/lastrelease.xml',\par
        onload: function(e)\{\par
            if (e.status!='200') \{\par
                AddGameLog('<span class="gamelog_raid">Official server has dirty answer (omg)</span>');\par
                return;\par
            \}\par
\par
            if (!e.responseXML)\par
                e.responseXML = new DOMParser().parseFromString(e.responseText, "text/xml");\par
            rversion = GetNode(e.responseXML, 'rversion');\par
            eudeversion = GetNode(e.responseXML, 'eudeversion');\par
            majurl = GetNode(e.responseXML, 'url');\par
            majlog = GetNode(e.responseXML, 'log');\par
            if (revision<rversion) \{\par
                AddToMotd('<b>Log:</b><br/>'+majlog, '<hr/>');\par
                if (mversion==eudeversion)\par
                    AddToMotd('<a href="'+majurl+'" class="gamelog_raid">=> MAJ Greasemonkey disponible</a>');\par
                AddToMotd('<hr/>Mise \'c3  jour disponible de '+mversion+'r'+revision+' vers '+eudeversion+'r'+rversion);\par
\par
                if (mversion==eudeversion)\par
                    AddGameLog('<a href="'+majurl+'" class="gamelog_raid">=> MAJ Greasemonkey</a>');\par
                else\par
                    AddGameLog('<a href="'+majurl+'" class="gamelog_raid">Une mise \'c3  jour est disponible</a>');\par
            \}\par
        \},\par
        onerror: c_onerror\par
    \});\par
\}\par
\par
function Galaxy() \{\par
    var reg=/orb\\[\\d+\\]\\='(\\w+),[^,]*,[^,]*,[^,]*,[^,]*,(\\w+|),[^,]*,[^,]*,([0-9a-h]\{32\})(?:,(?:&nbsp;|[^;])+)?';/g;\par
    var m = document.documentElement.innerHTML.match(reg);\par
\par
    var e=new Array();\par
    for (i = 0; i < m.length; i++) \{\par
        m[i].search(reg);\par
        found = RegExp.$2+','+RegExp.$1;\par
        if (found.substr(1,8)=='wormhole') found='wormhole';\par
        if (e[found])\par
            e[found]= e[found]+1;\par
        else\par
            e[found]=1;\par
    \}\par
\par
    var msg = '<br/><b>'+i18n[c_game_lang]['ss_preview']+document.getElementById('target_starsystem_id').value+'</b>';\par
    if (e['neutral,planet']) msg += '<br/>'+                      e['neutral,planet']+i18n[c_game_lang]['neutral,planet'];\par
    if (e['emp,planet'])     msg += '<br/><font color=#ffff88>'+  e['emp,planet']    +i18n[c_game_lang]['emp,planet']     +'</font>';\par
    if (e['ally,planet'])    msg += '<br/><font color=gold>'+     e['ally,planet']   +i18n[c_game_lang]['ally,planet']    +'</font>';\par
    if (e['war,planet'])     msg += '<br/><font color=red>'+      e['war,planet']    +i18n[c_game_lang]['war,planet']     +'</font>';\par
    if (e['nap,planet'])     msg += '<br/><font color=#9966FF>'+  e['nap,planet']    +i18n[c_game_lang]['nap,planet']     +'</font>';\par
    if (e['wormhole'])       msg += '<br/><font color=#AABBFF>'+  e['wormhole']      +i18n[c_game_lang]['wormhole']       +'</font>';\par
    if (e[',asteroid'])      msg += '<br/><font color=gray>'+     e[',asteroid']     +i18n[c_game_lang][',asteroid']      +'</font>';\par
    if (e[',wreckage'])      msg += '<br/><font color=#AA55FF>'+  e[',wreckage']     +i18n[c_game_lang][',wreckage']      +'</font>';\par
    if (e['neutral,fleet'])  msg += '<br/>'+                      e['neutral,fleet'] +i18n[c_game_lang]['neutral,fleet'];\par
    if (e['own,fleet'])      msg += '<br/><font color=green>'+    e['own,fleet']     +i18n[c_game_lang]['own,fleet']      +'</font>';\par
    if (e['nap,fleet'])      msg += '<br/><font color=#9966FF>'+  e['nap,fleet']     +i18n[c_game_lang]['nap,fleet']      +'</font>';\par
    if (e['enemy,fleet'])    msg += '<br/><font color=red>'+      e['enemy,fleet']   +i18n[c_game_lang]['enemy,fleet']    +'</font>';\par
    if (e['npc,fleet'])      msg += '<br/><font color=gold>'+     e['npc,fleet']     +i18n[c_game_lang]['npc,fleet']      +'</font>';\par
    if (e['ga,fleet'])       msg += '<br/><font color=lightblue>'+e['ga,fleet']      +i18n[c_game_lang]['ga,fleet']       +'</font>';\par
    delete(e['neutral,sun']);\par
    delete(e['neutral,planet']);\par
    delete(e['own,planet']);\par
    delete(e['emp,planet']);\par
    delete(e['nap,planet']);\par
    delete(e['ally,planet']);\par
    delete(e['war,planet']);\par
    delete(e['wormhole']);\par
    delete(e[',asteroid']);\par
    delete(e[',wreckage']);\par
    delete(e['neutral,fleet']);\par
    delete(e['own,fleet']);\par
    delete(e['enemy,fleet']);\par
    delete(e['nap,fleet']);\par
    delete(e['npc,fleet']);\par
    delete(e['ga,fleet']);\par
    for (var item in e) \{\par
        msg += '<br/><font color=red>'+e[item]+' &quot;'+item+'&quot; unknown item !</font>';\par
        delete(e[item]);\par
    \}\par
    AddToMotd(msg,'<hr/>');\par
\}\par
\par
function Galaxy_Info() \{\par
    a = new Array();\par
    row = id= 1;\par
    while (typeof $x('/html/body/div/div[4]/div/table/tbody/tr['+id+']/td[3]')[0] != 'undefined') \{\par
        a[row-1] = new Array();\par
        a[row-1][1] = $x('/html/body/div/div[4]/div/table/tbody/tr['+id+']/td[3]')[0].innerHTML;\par
        a[row-1][2] = $x('/html/body/div/div[4]/div/table/tbody/tr['+id+']/td[5]')[0].innerHTML;\par
        a[row-1][3] = $x('/html/body/div/div[4]/div/table/tbody/tr['+id+']/td[7]')[0].innerHTML;\par
        row++;\par
        id = (row*2)-1;\par
    \}\par
    data = new Array();\par
    data['ss']   = $x('/html/body/div/div/table/tbody/tr[3]/td[4]')[0].innerHTML;\par
    data['data'] = serialize(a);\par
    get_xml('galaxy_info', data);\par
\}\par
\par
function Wormhole() \{\par
    var tables = $x('/html/body/div[2]/div/div/table/tbody/tr/td[3]/table', XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);\par
    var i=1;\par
    var a=new Array();\par
    tables.forEach(function(paragraph) \{  // Loop over every paragraph\par
        var nodess=paragraph.childNodes[1].childNodes[4].childNodes[7];\par
        var node=paragraph.childNodes[1].childNodes[6].childNodes[7];\par
        if (i==1) // d\'c3\'a9part\par
            a['IN'] = nodess.innerHTML+':'+node.innerHTML;\par
        else if (i==2) // arriv\'c3\'a9e\par
            a['OUT'] = nodess.innerHTML+':'+node.innerHTML;\par
        i++;\par
    \});\par
    get_xml('wormhole', a);\par
\}\par
\par
function Planet() \{\par
    var html = document.documentElement.innerHTML;\par
\par
    var a=new Array();\par
\par
    if (html.match(eval('/'+i18n[c_game_lang]['water']+'.+<td class=\\\\"font_white\\\\">(\\\\d+)%<\\\\/td>/'))) \{\par
        a['WATER'] = trim(RegExp.$1);\par
        if (debug) GM_log(i18n[c_game_lang]['water']+':'+a['WATER']);\par
        a['COORIN']= $x('/html/body/div/table/tbody/tr/td[3]/table/tbody/tr[4]/td[4]')[0].innerHTML;\par
        if (debug) GM_log(i18n[c_game_lang]['coords']+':'+a['COORIN']);\par
        a['BUILDINGS']=trim($x('/html/body/div/table/tbody/tr/td[3]/table/tbody/tr[6]/td[4]')[0].innerHTML);\par
        if (debug) GM_log(i18n[c_game_lang]['building']+':'+a['BUILDINGS']);\par
        get_xml('player', a);\par
    \} else \{\par
        if ($x('/html/body/div/table/tbody/tr/td[3]/table/tbody/tr[3]/td[2]')[0].innerHTML != i18n[c_game_lang]['coords']) \{\par
            a['COORIN']= $x('/html/body/div/table/tbody/tr/td[3]/table/tbody/tr[4]/td[4]')[0].innerHTML;\par
        \} else \{\par
            a['COORIN']= $x('/html/body/div/table/tbody/tr/td[3]/table/tbody/tr[3]/td[4]')[0].innerHTML;\par
        \}\par
        if (debug) GM_log(i18n[c_game_lang]['coords']+':'+a['COORIN']);\par
        row=4;\par
        while (typeof $x('/html/body/div/table/tbody/tr/td[3]/table/tbody/tr['+row+']/td[2]')[0] != 'undefined') \{\par
            ress = $x('/html/body/div/table/tbody/tr/td[3]/table/tbody/tr['+row+']/td[2]')[0].innerHTML;\par
            for (i=0;i<10;i++)\par
                if (ress.indexOf(i18n[c_game_lang]['ress'+i])>0) \{\par
                    a[i]= $x('/html/body/div/table/tbody/tr/td[3]/table/tbody/tr['+row+']/td[4]')[0].innerHTML;\par
                    break;\par
                \}\par
            row++;\par
        \}\par
        get_xml('planet', a);\par
    \}\par
\par
\}\par
\par
function Asteroid() \{\par
    var html = document.documentElement.innerHTML;\par
\par
    var a=new Array();\par
    if (html.match(/<td class="font_white">(\\d+:\\d+:\\d+:\\d+)<\\/td>/))\par
        a['COORIN']= RegExp.$1;\par
\par
    row = 4;\par
    while (typeof $x('/html/body/div[2]/table/tbody/tr/td[3]/table/tbody/tr['+row+']/td[2]')[0] != 'undefined') \{\par
        ress = $x('/html/body/div[2]/table/tbody/tr/td[3]/table/tbody/tr['+row+']/td[2]')[0].innerHTML;\par
        for (i=0;i<10;i++)\par
            if (ress.indexOf(i18n[c_game_lang]['ress'+i])>0) \{\par
                a[i]= $x('/html/body/div[2]/table/tbody/tr/td[3]/table/tbody/tr['+row+']/td[4]')[0].innerHTML;\par
                break;\par
            \}\par
        row++;\par
    \}\par
\par
    get_xml('asteroid', a);\par
\}\par
\par
function Fleet() \{\par
\par
    var a = Array();\par
    var npc = false;\par
    a['owner']     = $x('/html/body/div/div/table/tbody/tr[2]/td[4]')[0].innerHTML;\par
    a['fleetname'] = $x('/html/body/div/div/table/tbody/tr[3]/td[4]')[0].innerHTML;\par
    a['coords']    = $x('/html/body/div/div/table/tbody/tr[4]/td[4]')[0].innerHTML;\par
    if (!a['coords'].match(/\\d+\\s+-\\s+\\d+\\s+-\\s+\\d+\\s+-\\s+\\d+/)) \{ // PNJ only ?\par
        npc = true;\par
        a['coords'] = $x('/html/body/div/div/table/tbody/tr[5]/td[4]')[0].innerHTML;\par
    \}\par
    a['coords'] = a['coords'].replace(/\\s*/g,'');\par
    if (npc && GM_getValue(c_prefix+'pnj_info',false)) get_xml('pnj', a);\par
\par
    if (!npc) \{\par
        a['owner'] = a['owner'].replace(/<\\/?[^>]+>/gi, '')\par
\par
    //    get_xml('userfleet', a);\par
    \}\par
\}\par
\par
function FleetEdit() \{\par
\tab var html = document.documentElement.innerHTML;\par
    var coords = '';\par
\tab if (html.match(eval('/'+i18n[c_game_lang]['coords']+'.+<td class=\\\\"font_white\\\\">(\\\\d+-\\\\d+-\\\\d+-\\\\d+)<\\\\/td>/')))\par
        coords=trim(RegExp.$1);\par
    AddToMotd("'"+coords+"'");\par
    GM_setValue(c_prefix+'lastcoords', coords);\par
\}\par
\par
function FleetTroop() \{\par
    var lastpage=GM_getValue(c_prefix+'lastpage', '');\par
    var lastcoords=GM_getValue(c_prefix+'lastcoords', '');\par
    if (lastpage.indexOf('fleet/fleet_edit.php')<1) return;\par
    if (lastcoords == '') return;\par
    if (!GM_getValue(c_prefix+'galaxy_info',false)) return;\par
\par
    Planets = unserialize(GM_getValue(c_prefix+'ownplanets', false));\par
    xpath = '/html/body/div[2]/div/div/div[2]/table/tbody/tr[4]/td[4]/font';\par
    i=0;\par
    while (typeof(Planets[i]) != 'undefined') \{\par
        if (Planets[i]['Coord']==lastcoords) \{\par
            xpath = '/html/body/div[2]/div/div/div[2]/table/tbody/tr[5]/td[4]/font';\par
            break;\par
        \}\par
        i++;\par
    \}\par
    var a = Array();\par
    a['EnnemyTroops'] = $x(xpath)[0].innerHTML;\par
    a['lastcoords']   = lastcoords;\par
    AddToMotd("Troops: "+a['EnnemyTroops']+" on "+a['lastcoords']);\par
    \par
    get_xml('troop_howmany', a);\par
\}\par
\par
function MaFiche() \{\par
    var a = Array();\par
\par
    prefixpts = '/html/body/div[2]/div/div/div/center';\par
    prefixright = '/html/body/div[2]/div/div/div[2]';\par
    id_td = 4;\par
\par
    player = $x(prefixright+'/table/tbody/tr[2]/td[4]')[0].innerHTML;\par
\par
    if (player.toLowerCase() != GM_getValue(c_prefix+'user','').toLowerCase()) return;\par
\par
    a['Titre'] = $x(prefixright+'/table/tbody/tr[3]/td[4]')[0].innerHTML;\par
    a['Race'] = $x(prefixright+'/table/tbody/tr[4]/td[4]')[0].innerHTML;\par
\par
    a['Commerce'] = $x(prefixright+'/table[2]/tbody/tr[2]/td[3]')[0].innerHTML;\par
    a['Recherche'] = $x(prefixright+'/table[2]/tbody/tr[4]/td[3]')[0].innerHTML;\par
    a['Combat'] = $x(prefixright+'/table[2]/tbody/tr[6]/td[3]')[0].innerHTML;\par
    a['Construction'] = $x(prefixright+'/table[2]/tbody/tr[8]/td[3]')[0].innerHTML;\par
    a['Economie'] = $x(prefixright+'/table[2]/tbody/tr[10]/td[3]')[0].innerHTML;\par
    a['Navigation'] = $x(prefixright+'/table[2]/tbody/tr[12]/td[3]')[0].innerHTML;\par
\par
    a['GameGrade'] = $x(prefixpts)[0].innerHTML;\par
    i = a['GameGrade'].indexOf('>')+1;\par
    j = a['GameGrade'].indexOf('<', i);\par
    a['GameGrade'] = a['GameGrade'].substr(i, j-i);\par
\par
    a['POINTS'] = $x(prefixpts+'/table/tbody/tr[4]/td['+id_td+']/b')[0].innerHTML;\par
    a['pts_architecte'] = $x(prefixpts+'/table/tbody/tr[6]/td['+id_td+']')[0].innerHTML;\par
    a['pts_mineur'] = $x(prefixpts+'/table/tbody/tr[7]/td['+id_td+']')[0].innerHTML;\par
    a['pts_science'] = $x(prefixpts+'/table/tbody/tr[8]/td['+id_td+']')[0].innerHTML;\par
    a['pts_commercant'] = $x(prefixpts+'/table/tbody/tr[9]/td['+id_td+']')[0].innerHTML;\par
    a['pts_amiral'] = $x(prefixpts+'/table/tbody/tr[10]/td['+id_td+']')[0].innerHTML;\par
    a['pts_guerrier'] = $x(prefixpts+'/table/tbody/tr[11]/td['+id_td+']')[0].innerHTML;\par
\par
    get_xml('mafiche', a);\par
\}\par
\par
function ownuniverse () \{\par
    var Planet = Array();\par
    var i = 3;\par
    var j = 0;\par
    var p = 0;\par
    var k = '';\par
\par
    while (trim($x('/html/body/div[2]/div/div[3]/div/table/tbody/tr/td['+i+']')[0].innerHTML) != '')\par
    \{\par
        Planet[p] = Array();\par
        Planet[p]['Coord'] = trim($x('/html/body/div[2]/div/div[3]/div/table/tbody/tr/td['+i+']')[0].innerHTML);\par
        i += 2;\par
        p++;\par
    \}\par
    GM_setValue(c_prefix+'ownplanets', serialize(Planet));\par
\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['Name'] = trim($x('/html/body/div[2]/div/div[2]/table/tbody/tr/td['+i+']')[0].innerHTML);\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['control'] = trim($x('/html/body/div[2]/div/div[3]/div/div/table/tbody/tr[3]/td['+i+']')[0].innerHTML);\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['communication'] = trim($x('/html/body/div[2]/div/div[3]/div/div/table/tbody/tr[5]/td['+i+']')[0].innerHTML);\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['university'] = trim($x('/html/body/div[2]/div/div[3]/div/div/table/tbody/tr[7]/td['+i+']')[0].innerHTML);\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['technology'] = trim($x('/html/body/div[2]/div/div[3]/div/div/table/tbody/tr[9]/td['+i+']')[0].innerHTML);\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['gouv'] = trim($x('/html/body/div[2]/div/div[3]/div/div/table/tbody/tr[11]/td['+i+']')[0].innerHTML);\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['defense'] = trim($x('/html/body/div[2]/div/div[3]/div/div/table/tbody/tr[13]/td['+i+']')[0].innerHTML);\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['shipyard'] = trim($x('/html/body/div[2]/div/div[3]/div/div/table/tbody/tr[15]/td['+i+']')[0].innerHTML);\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['spacedock'] = trim($x('/html/body/div[2]/div/div[3]/div/div/table/tbody/tr[17]/td['+i+']')[0].innerHTML);\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['bunker'] = trim($x('/html/body/div[2]/div/div[3]/div/div/table/tbody/tr[19]/td['+i+']')[0].innerHTML);\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['tradepost'] = trim($x('/html/body/div[2]/div/div[3]/div/div/table/tbody/tr[21]/td['+i+']')[0].innerHTML);\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j]['ressource'] = trim($x('/html/body/div[2]/div/div[3]/div/div/table/tbody/tr[23]/td['+i+']')[0].innerHTML);\par
\par
    k='current_';// Stock sur plan\'c3\'a8te\par
    div='2';\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Titane'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[3]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Cuivre'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[5]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Fer'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[7]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Aluminium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[9]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Mercure'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[11]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Silicium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[13]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Uranium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[15]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Krypton'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[17]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Azote'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[19]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Hydrogene'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[21]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
\par
    k='';// Production par heure\par
    div='3';\par
    for (i=3,j=0; j<p; i+=2,j++)  ///html/body/div[2]/div/div[3]/div/div[3]/table/tbody/tr[3]/td[3]\par
        Planet[j][k+'Titane'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[3]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Cuivre'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[5]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Fer'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[7]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Aluminium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[9]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Mercure'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[11]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Silicium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[13]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Uranium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[15]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Krypton'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[17]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Azote'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[19]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Hydrogene'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[21]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
\par
    k='bunker_';// Ressources dans le bunker\par
    div='4';\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Titane'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[3]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Cuivre'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[5]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Fer'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[7]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Aluminium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[9]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Mercure'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[11]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Silicium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[13]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Uranium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[15]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Krypton'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[17]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Azote'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[19]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Hydrogene'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[21]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
\par
    k='sell_';// Ventes par jours\par
    div='5';\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Titane'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[3]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Cuivre'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[5]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Fer'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[7]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Aluminium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[9]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Mercure'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[11]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Silicium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[13]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Uranium'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[15]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Krypton'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[17]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Azote'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[19]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
    for (i=3,j=0; j<p; i+=2,j++)\par
        Planet[j][k+'Hydrogene'] = trim($x('/html/body/div[2]/div/div[3]/div/div['+div+']/table/tbody/tr[21]/td['+i+']')[0].innerHTML.replace(/\\.*/g, ''));\par
\par
    get_xml('ownuniverse', serialize(Planet));\par
\}\par
\par
function troop_battle() \{\par
\par
    if (!GM_getValue(c_prefix+'troops_battle',false)) return;\par
\par
    var inf = Array();\par
    inf['date'] = $x('/html/body/div[2]/div/div/table[2]/tbody/tr/td/table/tbody/tr[2]/td[4]')[0].innerHTML;\par
    inf['coords'] = $x('/html/body/div[2]/div/div/table[2]/tbody/tr/td/table/tbody/tr[3]/td[4]')[0].innerHTML;\par
\par
\par
\par
    reg= /shiplist\\[(\\d+)]\\['caption'\\] = '([^']+)'/g;\par
    m = document.documentElement.innerHTML.match(reg);\par
    var IdToPlayer=new Array();\par
    for (i = 0; i < m.length; i++) \{\par
        m[i].search(reg);\par
        IdToPlayer[RegExp.$1] = RegExp.$2;\par
    \}\par
\par
    reg = /Array\\(\\'dmg\\',(\\d+),(\\d+),(\\d+)\\);/g;\par
    m = document.documentElement.innerHTML.match(reg);\par
    if (m == null) \{\par
        inf['nb_assault'] = 0;\par
        inf['pertes'] = new Array();\par
    \} else \{\par
        inf['nb_assault'] = m.length;\par
        var pertes=new Array();\par
        for (i = 0; i < m.length; i++) \{\par
            m[i].search(reg);\par
            if (typeof pertes[IdToPlayer[RegExp.$2]] == 'undefined')\par
                pertes[IdToPlayer[RegExp.$2]] = parseInt(RegExp.$3);\par
            else\par
                pertes[IdToPlayer[RegExp.$2]] += parseInt(RegExp.$3);\par
        \}\par
    \}\par
    inf['pertes'] = serialize(pertes);\par
\par
    reg= /shiplist\\[(\\d+)\\]\\['color'\\] = 'green'/g;\par
    m = document.documentElement.innerHTML.match(reg);\par
    var arr=new Array();\par
    for (i = 0; i < m.length; i++) \{\par
        m[i].search(reg);\par
        id = RegExp.$1;\par
        reg2= eval("/shiplist\\\\["+id+"\\\\]\\\\['caption'\\\\] = '([^']+)'/");\par
        document.documentElement.innerHTML.match(reg2);\par
        Player = RegExp.$1;\par
        reg2= eval("/shiplist\\\\["+id+"\\\\]\\\\['health_max'\\\\] = '([^']+)'/");\par
        document.documentElement.innerHTML.match(reg2);\par
        troops = parseInt(RegExp.$1);\par
\par
        arr[Player] = troops;\par
    \}\par
    inf['left'] = serialize(arr);\par
\par
    reg= /shiplist\\[(\\d+)\\]\\['color'\\] = 'red'/g;\par
    m = document.documentElement.innerHTML.match(reg);\par
    arr=new Array();\par
    for (i = 0; i < m.length; i++) \{\par
        m[i].search(reg);\par
        id = RegExp.$1;\par
        reg2= eval("/shiplist\\\\["+id+"\\\\]\\\\['caption'\\\\] = '([^']+)'/");\par
        document.documentElement.innerHTML.match(reg2);\par
        Player = RegExp.$1;\par
        reg2= eval("/shiplist\\\\["+id+"\\\\]\\\\['health_max'\\\\] = '([^']+)'/");\par
        document.documentElement.innerHTML.match(reg2);\par
        troops = parseInt(RegExp.$1);\par
\par
        arr[Player] = troops;\par
    \}\par
    inf['right'] = serialize(arr);\par
\par
    get_xml('troop_battle', inf);\par
\}\par
\par
function troop_log (mode) \{\par
\par
    if (!GM_getValue(c_prefix+'troops_battle',false)) return;\par
\par
    var inf = Array();\par
    inf['date'] = $x('/html/body/div[2]/div/div/table/tbody/tr[4]/td[4]')[0].innerHTML;\par
    inf['msg'] = $x('/html/body/div[2]/div/div/table[2]/tbody/tr[2]/td')[0].innerHTML.replace(/<[^<]*>/g, '\\n');\par
    inf['mode'] = mode;\par
    get_xml('troop_log', inf);\par
\}\par
\par
function gamelog_spooler () \{\par
    ident = $x('/html/body/div[2]/div/div/table/tbody/tr[2]/td[4]')[0].innerHTML;\par
\par
    if (ident.indexOf(i18n[c_game_lang]['troop_log_att']) == 0) troop_log('attacker');\par
    if (ident.indexOf(i18n[c_game_lang]['troop_log_def']) == 0) troop_log('defender');\par
\}\par
\par
function Options() \{\par
    var area = $x('/html/body/div[2]/div/div/div/form/table[2]')[0];\par
\par
    area.rows[4].innerHTML='';\par
    area.rows[4].appendChild(options_header(i18n[c_game_lang]['confheader']+' <small>('+version+')</small>'));\par
\par
    area.rows[5].innerHTML='';\par
    area.rows[5].appendChild(options_spacer());\par
    area.rows[5].appendChild(options_cell(i18n[c_game_lang]['conflink'], true));\par
    area.rows[5].appendChild(options_spacer());\par
    area.rows[5].appendChild(options_cell(options_text_s('eude_server',GM_getValue(c_prefix+'serveur','http://app216.free.fr/eu2/test/'),'250')));\par
\par
    area.rows[6].innerHTML='';\par
    area.rows[6].appendChild(options_spacer());\par
    area.rows[6].appendChild(options_cell(i18n[c_game_lang]['confuser'], true));\par
    area.rows[6].appendChild(options_spacer());\par
    area.rows[6].appendChild(options_cell(options_text_s('eude_user',GM_getValue(c_prefix+'user','test'),'100')));\par
\par
    area.rows[7].innerHTML='';\par
    area.rows[7].appendChild(options_spacer());\par
    area.rows[7].appendChild(options_cell(i18n[c_game_lang]['confpass'], true));\par
    area.rows[7].appendChild(options_spacer());\par
    area.rows[7].appendChild(options_cell(options_text_s('eude_pass',GM_getValue(c_prefix+'pass','test'),'100', true)));\par
\tab var i = 8\par
\tab if (GM_getValue(c_prefix+'empire_maj',false) ) \{\par
\tab\tab area.rows[i].innerHTML='';\par
\tab\tab area.rows[i].appendChild(options_spacer());\par
\tab\tab area.rows[i].appendChild(options_cell(i18n[c_game_lang]['active_empire'], true));\par
\tab\tab area.rows[i].appendChild(options_spacer());\par
\tab\tab area.rows[i].appendChild(options_cell(options_checkbox_s('eude_active_empire', GM_getValue(c_prefix+'active_empire',false))));\par
\tab\tab i++;\par
\tab\}\par
    area.rows[i].innerHTML='';\par
    area.rows[i].appendChild(options_spacer());\par
    area.rows[i].appendChild(options_cell(options_button_save('eude_save')));\par
    area.rows[i].appendChild(options_spacer(i18n[c_game_lang]['confspacer']));\par
    area.rows[i].appendChild(options_spacer());\par
\tab i++;\par
\tab\par
    // rewrite delete accounts cells\par
    id = i18n[c_game_lang]['confcells'];\par
    var msg = area.rows[id].cells[3].innerHTML;\par
    area.rows[id].innerHTML='';\par
    area.rows[id].appendChild(options_spacer());\par
    var cell = options_cell(msg);\par
    cell.setAttribute('colspan', '3');\par
    area.rows[id].appendChild(cell);\par
    area.deleteRow(i);\par
    area.deleteRow(i);\par
    area.deleteRow(i);\par
    area.deleteRow(i);\par
    area.deleteRow(i);\par
    area.deleteRow(i);\par
    area.deleteRow(i);\par
\par
\par
    document.getElementById('eude_save').addEventListener('click', function() \{\par
        var server = document.getElementById('eude_server').value;\par
        var user = document.getElementById('eude_user').value;\par
        var pass = document.getElementById('eude_pass').value;\par
        if (server.substr(-1)!='/') server+='/';\par
        GM_setValue(c_prefix+'serveur',server);\par
        GM_setValue(c_prefix+'user',user);\par
        GM_setValue(c_prefix+'pass',pass);\par
\tab\tab if (GM_getValue(c_prefix+'empire_maj',false) ) \{\par
\tab\tab\tab GM_setValue(c_prefix+'active_empire',document.getElementById('eude_active_empire').checked);\par
\tab\tab\} else \{\par
\tab\tab\tab GM_setValue(c_prefix+'active_empire',false);\par
\tab\tab\tab GM_deleteValue(c_prefix+'empire_name');\par
\tab\tab\}\par
\par
        get_xml('config', '');\par
\par
    \}, false);\par
\}\par
\par
function update_empire() \{\par
\tab var activetab = getElementsByClass("tab_active");\par
\tab if (activetab[0].innerHTML == "Info") \{\par
\tab\tab if (typeof $x('/html/body/div[2]/table/tbody/tr/td')[0] != 'undefined'\par
\tab\tab\tab && $x('/html/body/div[2]/table/tbody/tr/td')[0].innerHTML == '<font class="font_pink_bold">Informations</font>') \{\par
\tab\tab\tab var empire = trim($x('/html/body/div[2]/table/tbody/tr[2]/td[4]')[0].innerHTML);\par
\tab\tab\tab GM_setValue(c_prefix+'empire_name',empire);\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
function update_empire_members() \{\par
\tab var activetab = getElementsByClass("tab_active");\par
\tab if (activetab[0].innerHTML == "Membre" && GM_getValue(c_prefix+'empire_name',false)) \{\par
\tab\tab var a = new Array();\par
\tab\tab var data = new Array();\par
\tab\tab var row=0;\par
\tab\tab var tab = getElementsByClass("ei_mn");\par
\tab\tab for (var i = 0; i < tab.length; i++) \{\par
\tab\tab\tab a[row]=trim(tab[i].innerHTML);\par
\tab\tab\tab row++;\par
\tab\tab\}\par
\tab\tab data['empire']=GM_getValue(c_prefix+'empire_name',"");\par
\tab\tab data['data'] = serialize(a);\par
\tab\tab get_xml('empire', data);\par
\tab\tab GM_deleteValue(c_prefix+'empire_name');\par
\tab\}\par
\}\par
/// Dispacheur\par
if (debug) AddToMotd('Page: '+c_page);\par
\par
if (c_page.indexOf('user/settings_overview.php?area=options')>0)      Options();\par
\par
if (GM_getValue(c_prefix+'actived','0')!='0') \{\par
    if (c_page.indexOf('index.php')>0)                                  Index();\par
   // if (c_page.indexOf('galaxy/galaxy_overview.php')>0)                Galaxy();\par
    if (c_page.indexOf('galaxy/galaxy_info.php')>0 &&\par
        GM_getValue(c_prefix+'galaxy_info',false) )               Galaxy_Info();\par
    if (c_page.indexOf('wormhole/wormhole_info.php?')>0)             Wormhole();\par
\par
    if (c_page.indexOf('planet/planet_info.php?')>0) \{\par
        if (c_page.indexOf('asteroid')>0 &&\par
            GM_getValue(c_prefix+'asteroid_info',false))             Asteroid();\par
        //if (c_page.indexOf('wreckage')>0)                               cdr();\par
        if (c_page.indexOf('plantype')<0 &&\par
            GM_getValue(c_prefix+'planet_info',false) )                Planet();\par
    \}\par
\par
    if (c_page.indexOf('fleet/fleet_info.php?')>0)                      Fleet();\par
    if (c_page.indexOf('fleet/commander_info.php?commander_id=')>0)   MaFiche();\par
    if (c_page.indexOf('fleet/fleet_edit.php')>0)                   FleetEdit();\par
    if (c_page.indexOf('fleet/fleet_troop.php')>0)                 FleetTroop();\par
    \par
    if (c_page.indexOf('building/control/control_overview.php?area=planet')>0)\par
        ownuniverse();\par
    if (c_page.indexOf('battle/battle_ground_report_info.php?area=ground_battle')>0)\par
        troop_battle();\par
    if (c_page.indexOf('gamelog/gamelog_view.php?gamelog_id')>0)\par
        gamelog_spooler();\par
\par
    if  ((c_page.indexOf('empire/empire_info.php?empire_id=')>0\par
        ||c_page.indexOf('empire/empire_info.php?area=info&empire_id=')>0\par
        ||c_page.indexOf('empire/empire_info.php?user_id=')>0 )\par
    &&\tab GM_getValue(c_prefix+'empire_maj',false)\par
        && GM_getValue(c_prefix+'active_empire',false) )\tab\tab\tab update_empire();\par
    if  (\tab c_page.indexOf('empire/empire_info.php?area=member&empire_id=')>0\par
        &&\tab GM_getValue(c_prefix+'empire_maj',false)\par
        && GM_getValue(c_prefix+'active_empire',false)  )\tab\tab\tab update_empire_members();\par
\par
    GM_setValue(c_prefix+'lastpage', c_page);\f0\par
}
