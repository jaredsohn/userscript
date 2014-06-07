// ==UserScript==
// @name           Ikariam All-In-One
// @namespace      http://userscripts.org/scripts/show/69322
// @description    Combines a number of the Ikariam scripts I like to use into one script, so that IkaTools and jQuery only have to be initialized once per Ikariam page.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/jquery-1.4.2-GM.min.js
// IkaTools
// @require         http://userscripts.org/scripts/source/88158.user.js
// Script Updater
// @require         http://userscripts.org/scripts/source/94662.user.js
// Config
// @require         http://userscripts.org/scripts/source/94663.user.js
// 
// Requirements of Ikariam Inline Score
//// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
//// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
//// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
//// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Time.js
//// @require        http://userscripts.org/scripts/source/67716.user.js
//
// Requirements for Ikariam Alliance Map
//// @require        http://jquery-ui.googlecode.com/svn/tags/1.7.2/ui/minified/ui.core.min.js
//// @require        http://jquery-ui.googlecode.com/svn/tags/1.7.2/ui/minified/ui.draggable.min.js
//// @require        http://jquery-ui.googlecode.com/svn/tags/1.7.2/ui/minified/ui.tabs.min.js
//// require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
//// require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
//// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamMap-Id_Luxury_Name.js
//// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/ColourSelector.js
//
// @version         1.18
//
// @history         1.18 Removed other PhasmaExMachina scripts (that could represent a hacking opportunity.)  Unfortunately, this guts a major portion of the functionality of this script.  I would recommend switching to my copy of Ikariam ExMachina (http://userscripts.org/scripts/show/88157), which has most of the same functionality as this script and is less vulnerable to the type of hack that occurred.  Some scripts (such as CR Converter) must be installed in addition to Ikariam ExMachina to have all the functionality of this script.
// @history         1.17 Updated to no longer use PhasmaExMachina scripts (because of delete-city hack done to his/her scripts).
// @history         1.16 Removed enhancements to IkaTools that are now part of that library.
// @history         1.15 Fixed a bug with Treaty Tools where museum levels greater than 10 would get forgotten on occasion.
// @history         1.14 Fixed display of Auto Build and Upgrade and Intercity Trading scripts that made detailed combat reports look ugly.  Fixed InterCity Trading - Show Only Own Cities option to work with latest version of that script.
// @history         1.13 Fixed a bug that could cause Ikariam Alliance Map to interfere with other component scripts in All-In-One.  Unfortunately, dragging the minimap and changing the map colors still remain broken.
// @history         1.12 Updated to work with latest version of Ikariam InterCity Trading script.  Fix to deal with userscripts.org DOS protection when initially installed or using the "Force script redownload" command.  You may need to refresh the page 2 or 3 times to get all script downloaded.
// @history         1.11 Added a bunch more component scripts.
// @history         1.10 Made "Occupation" icon show up in Ikariam Empire Overview "military island hover".
// @history         1.09 Upgraded the used jQuery version to 1.4.2.
// @history         1.08 Improved the handling of script dependencies (making addition of future scripts simpler).  This should have no visible effect on the script.
// @history         1.07 Fixed parsing of incoming blockade missions so they show up as unknown ships rather than cargo ships.
// @history         1.06 Improved the look of the config dialog.
// @history         1.05 Improved IkaTools.getRemoteDocument so as to cause fewer encounters with the "don't use the back button or tabs" page.
// @history         1.04 Added configuration dialog for component scripts so that each one can be enabled/disabled separately.  Improved behavior of update component scripts command to automatically refresh the page.
// @history         1.03 Made component script config options work.  Looks a little ugly but it gets the job done.
// @history         1.02 Improved parsing of unit movements so incoming deploy missions parse out the number of units.  Unknown units show up in Ikariam Overview "Island hover" with a question mark.  (Only works in English version of Ikariam, as it relies on parsing the document content.)
// @history         1.01 Fixed a bug where "force download scripts" menu item didn't work.  Fixed a bug with GM_setValue that caused a few things (transport times in Empire Overview "island" hover) to appear incorrectly.
// @history         1.00 Initial version.
// 
// ==/UserScript==

IKARIAM_ALL_IN_ONE_VERSION = '1.18';

function curry(f) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return f.apply(this, args.concat([].slice.call(arguments, 0)));
  };
}
  
function curry_scope(f, scope) {
  var args = [].slice.call(arguments, 2);
  return function () {
    return f.apply(scope, args.concat([].slice.call(arguments, 0)));
  };
}

IkariamAllInOne = function() {
    var self = this;
    var startTime = new Date();
    this.startTiming();
    
    ScriptUpdater.check(69322, IKARIAM_ALL_IN_ONE_VERSION);
    this.setUpScriptUpdater();
    this.resetTiming('IkariamAllInOne.setUpScriptUpdater');
    
    this._forceLoadScripts = GM_getValue('IkariamAllInOne-ForceDownloadScripts', false);
    var old_version = GM_getValue('IkariamAllInOne-KnownVersion', IKARIAM_ALL_IN_ONE_VERSION);
    if (old_version != IKARIAM_ALL_IN_ONE_VERSION) {
        this._forceLoadScripts = true;
    }
    this.debug('forceLoadScripts: ' + this._forceLoadScripts);
    GM_setValue('IkariamAllInOne-ForceDownloadScripts', false);
    GM_setValue('IkariamAllInOne-KnownVersion', IKARIAM_ALL_IN_ONE_VERSION);
    GM_registerMenuCommand('Ikariam All-In-One: Force script redownload',
        function() {
            GM_setValue('IkariamAllInOne-ForceDownloadScripts', true);
            window.location = window.location;
        });
    this.resetTiming('Loaded _forceLoadScripts value');
    
    this.loadGMVars();
    this.resetTiming('IkariamAllInOne.loadGMVars:');
    
    this.redefineGMFunctions(); 
    this.resetTiming('IkariamAllInOne.redefineGmFunctions:');
    
    this.setUpConfig();
    this.resetTiming('Config setup:');
    
    IkaTools.debug('Ikariam All-In-One setup time: ' + (new Date() - startTime) + 'ms');
    
    IkaTools.init();
    IkaTools.init = function() {};
    this.resetTiming('IkaTools.init:');
    
    this._loadedDependencies = {
        'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js': true,
        'http://userscripts.org/scripts/source/57377.user.js': true,
        'http://userscripts.org/scripts/source/57756.user.js': true,
        'http://userscripts.org/scripts/source/62718.user.js': true,
// My copies of PhasmaExMachina's scripts
        'http://userscripts.org/scripts/source/88158.user.js': true,
        'http://userscripts.org/scripts/source/94662.user.js': true,
        'http://userscripts.org/scripts/source/94663.user.js': true,

        // Alternate copy of PhasmaExMachina's Script Updater script
        'http://www.betawarriors.com/bin/gm/57756user.js': true,
        
        // We have version 1.4.2
        'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js': true, // Used by a number of scripts
        'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js': true, // Used by Leecher Checker
        'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js': true, // Resource links
        'http://ikariamscriptresources.googlecode.com/svn/tags/Latest/jquery-1.4.2-GM.min.js': true, // Ikariam Aide-Memoire
        'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js': true, // My GM Object
    };
    
    // Removed PhasmaExMachina script that has been deleted (and could be hacked anyway, so we don't want it anymore)
    //this.loadScript('http://userscripts.org/scripts/source/57197.user.js', 'IkariamEmpireOverview', 
    //    curry_scope(this.loadIkariamEmpireOverview, this));
    //this.resetTiming('Load script: Ikariam Empire Overview:');

    
    this.loadScript('http://hightekcafe.com/ikariam/leecher_checker_beta.user.js', 'VejidasLeacherChecker',
        curry_scope(this.loadVejidasLeacherChecker, this));
    //this.resetTiming('Load script: Vejidas Leacher Checker');

    // Removed PhasmaExMachina script that has been deleted (and could be hacked anyway, so we don't want it anymore)    
    //this.loadScript('http://userscripts.org/scripts/source/57148.user.js', 'IkariamResourceLinks',
    //    curry_scope(this.loadIkariamResourceLinks, this));
    //this.resetTiming('Load script: Ikariam Resource Links:');
    
    this.loadScript('http://userscripts.org/scripts/source/67519.user.js', 'IkariamSuperMarket',
        curry_scope(this.loadIkariamSuperMarket, this));
    //this.resetTiming('Load script: Ikariam Super Market:');
    
    this.loadScript('http://userscripts.org/scripts/source/69058.user.js', 'IkariamFarmList',
        curry_scope(this.loadIkariamFarmList, this));
    //this.resetTiming('Load script: Ikariam Farm List:');
    
    this.loadScript('http://userscripts.org/scripts/source/69026.user.js', 'IkariamSearch',
        curry_scope(this.loadIkariamSearch, this));
    //this.resetTiming('Load script: Ikariam Search:');
    
    this.loadScript('http://userscripts.org/scripts/source/67717.user.js', 'IkariamAideMemoireGeneralsInline',
        curry_scope(this.loadIkariamAideMemoireGeneralsInline, this));
    //this.resetTiming('Load script: Ikariam Aide-Memoire Generals (Inline):');
    
    this.loadScript('http://userscripts.org/scripts/source/46874.user.js', 'IkariamAllianceMap',
        curry_scope(this.loadIkariamAllianceMap, this));
    
// Removed for safety since it references hacked PhasmaExMachina scripts (and author has stopped supporting it).
//    this.loadScript('http://userscripts.org/scripts/source/54649.user.js', 'IkariamInterCityTrading',
//        curry_scope(this.loadIkariamInterCityTrading, this));
        
    this.loadScript('http://userscripts.org/scripts/source/50784.user.js', 'IkariamCRConverter',
        curry_scope(this.loadIkariamCRConverter, this));

// Removed PhasmaExMachina script that has been deleted (and could be hacked anyway, so we don't want it anymore)  
//    this.loadScript('http://userscripts.org/scripts/source/56817.user.js', 'IkariamAutoBuildAndUpgrade',
//        curry_scope(this.loadIkariamAutoBuildAndUpgrade, this));
    
// Removed PhasmaExMachina script that has been deleted (and could be hacked anyway, so we don't want it anymore)  
//    this.loadScript('http://userscripts.org/scripts/source/58855.user.js', 'IkariamTreatyTools',
//        curry_scope(this.loadIkariamTreatyTools, this));
    
    this.loadScript('http://userscripts.org/scripts/source/72241.user.js', 'IkariamMessageUtilities',
        curry_scope(this.loadIkariamMessageUtilities, this));

// Removed for safety since it references hacked PhasmaExMachina scripts.
//    this.loadScript('http://userscripts.org/scripts/source/59908.user.js', 'IkariamArmyHelper',
//        curry_scope(this.loadIkariamArmyHelper, this));
    
    this.loadScript('http://userscripts.org/scripts/source/68447.user.js', 'IkariamRefresh',
        curry_scope(this.loadIkariamRefresh, this));
    
    if (Config.get('ikariamAllInOne_Debug')) {
        IkaTools.debug('Ikariam All-In-One Total Time: ' + (new Date() - startTime) + 'ms');
    }
}

IkariamAllInOne.prototype.startTiming = function() {
    this.startTime = new Date();
    this.lastStartTime = new Date();
}

IkariamAllInOne.prototype.resetTiming = function(label) {
    this.debug(label + ' ' + (new Date() - this.lastStartTime) + ' ms (Total ' + (new Date() - this.startTime) + ' ms)');
    this.lastStartTime = new Date();
}

IkariamAllInOne.prototype.finishTiming = function() {
    this.debug('Total init time: ' + (new Date() - this.startTime) + ' ms');
}

IkariamAllInOne.prototype.loadIkariamEmpireOverview = function(script, startTime) {
    // Hack because extension of occupy image is .jpg while everything else is .gif
    script = script.replace('\'<td><img src="skin/interface/mission_\' + movements[i].mission + \'.gif" title="\'',
                            '\'<td><img src="skin/interface/mission_\' + movements[i].mission + (movements[i].mission == \'occupy\' ? \'.jpg" title="\' : \'.gif" title="\')');
    this.executeScript(script, 'Ikariam Empire Overview', startTime);
}

IkariamAllInOne.prototype.loadVejidasLeacherChecker = function(script, startTime) {
    // Handles the case that some dick has made a really small donation (less than 10 by default)
    // that results in an out-of-bounds access attempt.
    script = script.replace('workplace[workers_100-1][0]', '(workers_100 > 1) ? workplace[workers_100-1][0] : workplace[1][0]');
    this.executeScript(script, 'Vejidas Leacher Checker', startTime);
}

IkariamAllInOne.prototype.loadIkariamResourceLinks = function(script, startTime) {
    this.executeScript(script, 'Ikariam Resource Links', startTime);
}

IkariamAllInOne.prototype.loadIkariamSuperMarket = function(script, startTime) {
    this.executeScript(script, 'IkariamSuperMarket', startTime);
}

IkariamAllInOne.prototype.loadIkariamSearch = function(script, startTime) {
    this.executeScript(script, 'Ikariam Search', startTime);
}

IkariamAllInOne.prototype.loadIkariamAideMemoireGeneralsInline = function(script, startTime) {
    this.executeScript(script, 'Ikariam Aide Memoire Generals (Inline)', startTime);
}

IkariamAllInOne.prototype.loadIkariamFarmList = function(script, startTime) {
    // Only update 3 targets on each page load.  10 is just overkill
    script = script.replace('var max=10;', 'var max=3;');
    this.executeScript(script, 'Ikariam Farm List', startTime);
}

IkariamAllInOne.prototype.loadIkariamAllianceMap = function(script, startTime) {   
    // Default location of island local view so it doesn't overlap some cities
    script = script.replace('{x:242,y:177}', '{x:980,y:155}');
    
    // If we mess around with jQuery, we can't have someone else doing it also.  They'll interfere with each other.
    script = script.replace('var \$\$', 'var $$$$ = $; //');
    script = script.replace('\(function\(\){var l=', '//');
    script = script.replace('\(function\(\){var R=', '//');
    this.executeScript(script, 'Ikariam Alliance Map', startTime);
}

IkariamAllInOne.prototype.loadIkariamInterCityTrading = function(script, startTime) {
    // These need to take place in window scope.  They don't work from within Greasemonkey, 
    // which means it won't get set up normally with these.
    //script = script.replace('$(\'#ictContent\').hide();', 'window.setTimeout(function() {$(\'#ictContent\').hide();');
    //script = script.replace('$(\'#shade\').text(this.downArr);', '$(\'#shade\').text(this.downArr); }, 0);');
    //script = script.replace('$(\'#ictContent\').show();', 'window.setTimeout(function() {$(\'#ictContent\').show();');
    //script = script.replace('$(\'#shade\').text(this.upArr);', '$(\'#shade\').text(this.upArr); }, 0);');
    // Only show your own cities, not those you have troops garrisoned at.
    if (Config.get('ikariamAllInOne_IkariamInterCityTrading_ShowOnlyOwnCities')) {
        script = script.replace('this.cityList = this.IT.getCities();', 'this.cityList = []; var tempCities = this.IT.getCities(); for (var i = 0; i < tempCities.length; i++) { if (this.IT.cityIsOwn(tempCities[i])) { this.cityList.push(tempCities[i]); } }');
    }
    if (!unsafeWindow.location.href.match(/.*militaryAdvisorDetailedReportView.*/)) {
        this.executeScript(script, 'Ikariam InterCity Trading', startTime);
    }
}

IkariamAllInOne.prototype.loadIkariamCRConverter = function(script, startTime) {
    this.executeScript(script, 'Ikariam CR Converter', startTime);
}

IkariamAllInOne.prototype.loadIkariamAutoBuildAndUpgrade = function(script, startTime) {
    if (!unsafeWindow.location.href.match(/.*militaryAdvisorDetailedReportView.*/)) {
        this.executeScript(script, 'Ikariam Auto Build And Upgrade', startTime);
    }
}

IkariamAllInOne.prototype.loadIkariamTreatyTools = function(script, startTime) {
    // Deals with correctly setting treaties when you have no pending proposals out.  The original script makes existing ones pending in this condition.
    script = script.replace('$(\'tr\', $(\'.contentBox01h\', root).eq(2))', '$(\'tr\', $(\'.contentBox01h:last\', root))');
    // Fixes a typo.
    script = script.replace('You cave a cultural treaty', 'You have a cultural treaty');
    // Fix parsing of museum level when level is >=10
    script = script.replace('Treaty.setMuseumLevelForCityId($(\'a\', this).attr(\'title\').match(/\\d$/)[0], cityId);',
                            'Treaty.setMuseumLevelForCityId($(\'a\', this).attr(\'title\').match(/\\d+$/)[0], cityId);');
    this.executeScript(script, 'Ikariam Treaty Tools', startTime);
}

IkariamAllInOne.prototype.loadIkariamMessageUtilities = function(script, startTime) {
    // :get selector does not work with our jQuery version
    script = script.replace('a:get(0)', 'a:eq(0)');
    this.executeScript(script, 'Ikariam Message Utilities', startTime);
}

IkariamAllInOne.prototype.loadIkariamArmyHelper = function(script, startTime) {
    script = script.replace('$(this).setAttribute(', 'this.setAttribute(');
    this.executeScript(script, 'Ikariam Army Helper', startTime);
}

IkariamAllInOne.prototype.loadIkariamRefresh = function(script, startTime) {
    this.executeScript(script, 'Ikariam Refresh', startTime);
}

// TODO: Install a more intelligent script updater check.  This hard to do because of the 
// asynchronous nature of update checks and the global nature of Script Updater.
IkariamAllInOne.prototype.setUpScriptUpdater = function() {
    ScriptUpdater.check = function(scriptId, version) {
    };
    
    ScriptUpdater.forceCheck = function(scriptId, version) {
    };
}

IkariamAllInOne.prototype.setUpConfig = function() {
    this._configTabs = {
        'Ikariam All-In-One General': {
            html: 'Select component scripts loaded by Ikariam All-In-One:',
            fields: {
                ikariamAllInOneScript_IkariamEmpireOverview:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/57197" target="_blank"><strong>Ikariam Empire Overview</strong></a>',
                    text: 'Adds drop-down overviews of your empire to the Show world, island, town and adviser buttons.',
                    value: true,
                },
                ikariamAllInOneScript_VejidasLeacherChecker:{
                    type: 'checkbox',
                    label: '<a href="http://ikariamlibrary.com/?content=Vejidas%20Leecher%20Checker" target="_blank"><strong>Vejidas Leecher Checker</strong></a>',
                    text: 'Enhances sawmill and luxury mine views to detect players leeching off your donations',
                    value: true,
                },
                ikariamAllInOneScript_IkariamResourceLinks:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/57148" target="_blank"><strong>Ikariam Resource Links</strong></a>',
                    text: 'Turns resource icons into links to mines and population icon into link to town hall.',
                    value: true,
                },
                ikariamAllInOneScript_IkariamSuperMarket:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/67519" target="_blank"><strong>Ikariam SuperMarket</strong></a>',
                    text: 'Enhances trade post view to display buy and sell orders for each resource together and allows quickly switching between resources.',
                    value: true,
                },
                ikariamAllInOneScript_IkariamFarmList:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/69058" target="_blank"><strong>Ikariam Farm List</strong></a>',
                    text: 'Lets you create a list of towns you regularly target, making espionage and pillages quicker.',
                    value: true,
                },
                ikariamAllInOneScript_IkariamSearch:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/69026" target="_blank"><strong>Ikariam Search</strong></a>',
                    text: 'Lets you search for islands, cities, players, etc. from in game using www.ika-world.com.',
                    value: true,
                },
                ikariamAllInOneScript_IkariamAideMemoireGeneralsInline:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/67717" target="_blank"><strong>Ikariam Aide-Memoire Generals Score</strong></a>',
                    text: 'Shows the generals score of a player in island/city view after you have expressed interest in it.',
                    value: true,
                },
                ikariamAllInOneScript_IkariamAllianceMap:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/46874" target="_blank"><strong>Ikariam Alliance Map</strong></a>',
                    text: 'In the alliance and embassy pages, a map of the world can be opened and, in the island view, a mini-map is shown.',
                    value: true,
                },
            }
        },
        'Ikariam All-In-One General Page 2': {
            html: 'Select component scripts loaded by Ikariam All-In-One:',
            fields: {
                ikariamAllInOneScript_IkariamInterCityTrading:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/54649" target="_blank"><strong>Ikariam InterCity Trading</strong></a>',
                    text: 'Adds links for transporting goods, ships, and troops between all your cities.',
                    value: true,
                },
                ikariamAllInOne_IkariamInterCityTrading_ShowOnlyOwnCities:{
                    type: 'checkbox',
                    label: 'InterCity Trading: Show own cities only',
                    text: 'Restricts Ikariam InterCity Trading to show only your own cities rather than all those you have troops garrisoned at.',
                    value: true,
                },
                ikariamAllInOneScript_IkariamCRConverter:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/50784" target="_blank"><strong>Ikariam CR Converter</strong></a>',
                    text: 'Parses combat report details (remaining offense/defense/stamina, units remaining/lost, resources, victors, etc) and converts report into a new format for display on forums, in-game messages, etc.',
                    value: true,
                },
                ikariamAllInOneScript_IkariamAutoBuildAndUpgrade:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/56817" target="_blank"><strong>Ikariam Auto Build And Upgrade</strong></a>',
                    text: 'Automates building construction and upgrading as resources become available.',
                    value: true,
                },
                ikariamAllInOneScript_IkariamTreatyTools:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/58855" target="_blank"><strong>Ikariam Treaty Tools</strong></a>',
                    text: 'Shows an icon next to players you have a CAT with and lets you send CAT requests even if your museums are full.',
                    value: true,
                },
                ikariamAllInOneScript_IkariamMessageUtilities:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/72241" target="_blank"><strong>Ikariam Message Utilities</strong></a>',
                    text: 'Makes reading the message inbox faster and provides an alliance "reply all" button.',
                    value: true,
                },
                ikariamAllInOneScript_IkariamArmyHelper:{
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/59908" target="_blank"><strong>Ikariam Army Helper</strong></a>',
                    text: 'Helps to see current garrison occupation and provides live preview of units disposition when send army or fleet to attack or defend a city.',
                    value: true,
                },
                ikariamAllInOneScript_IkariamRefresh: {
                    type: 'checkbox',
                    label: '<a href="http://userscripts.org/scripts/show/58447" target="_blank"><strong>Ikariam Refresh</strong></a>',
                    text: 'Automatically goes through all Ikariam buildings and military view so as to refresh any data used by IkaTools or other scripts.',
                    value: true,
                },
            }
        },
        'Ikariam All-In-One About': {
            html: '<p><a href="http://userscripts.org/scripts/show/69322" target="_blank" style="font-weight:bold !important;">Ikariam All-In-One v' + IKARIAM_ALL_IN_ONE_VERSION +
                  '</a> by <a href="http://userscripts.org/users/AubergineAnodyne" target="_blank">AubergineAnodyne</a>' + 
                  '<p>Combines a number of the Ikariam scripts I like to use into one script, so that IkaTools and jQuery only have to be initialized once per Ikariam page.</p>',
            fields: {
                ikariamAllInOne_Debug:{
                    type: 'checkbox',
                    label: 'Debug Mode',
                    text: 'show script execution time',
                    value: false,
                }
            }
        }
    };
    
    // Isn't CSS awesome.  We can almost fix this to make it look good.
    GM_addStyle(
        '#ConfigTabs span { white-space: nowrap; display: block; float: left; } ' +
        //'#ConfigBody #ConfigTabs span.active { padding-top: 0px !important; top: 0px !important; }' +
        '#ConfigContentBox { float: left; width: 450px;}' + 
        '#ConfigFooter { float: left; width: 450px; }'
    );
    
    var configOldShow = Config.show;
    Config.show = curry_scope(
        function(callback) {
            //this.debug('Showing config');
            Config.scriptName = 'Ikariam All-In-One';
            if (!this._shownConfig) {
                //this.debug('Setting up config');
                delete Config.settings;
                delete Config.tabs;
                Config.settings = {};
                for (var tabName in this._configTabs) {
                    Config.settings[tabName] = this._configTabs[tabName];
                }
                this._shownConfig = true;
            }
            configOldShow(callback);
        }, this);
    
    
    var prefix = IkaTools.getDomain();
   
    // We need config values to always use the Ikariam per-world prefix.  We can't let them use 
    // their own or it may be set differently for different scripts.  So we have to copy these 
    // methods from Script Options Tools and slightly edit them here to See any other comments
    // about writing your shit with classes.
    Config.get = function(key) {
        var field = Config.getField(key);
        key = prefix + key;
        switch(field.type) {
            case 'checkbox':
                if(typeof(field.value) == 'undefined' || !field.value)
                    return (typeof(GM_getValue(key)) != 'undefined' && GM_getValue(key).toString() == "1") ? true : false;    // false by default
                else 
                    return (typeof(GM_getValue(key)) != 'undefined' && GM_getValue(key).toString() == "0") ? false : true;    // true by default
                break;
            case 'select':
            case 'password':
            case 'text':
                return typeof(GM_getValue(key)) == 'undefined' ? (typeof(field.value) != 'undefined' ?  field.value : '') : GM_getValue(key);
                break;
            default: 
                return 'unfound';
                return typeof(GM_getValue(key)) == 'undefined' ? false : GM_getValue(key);
        }    
    };
    
    Config.set = function(key, value) {
        key = prefix + key;
        GM_setValue(key, value);
    };
    
    this.copyConfigTabs();
    
    IkaTools.addOptionsLink('Ikariam All-In-One');
    IkaTools.addOptionsLink = function(scriptName) {};
}

IkariamAllInOne.prototype.redefineGMFunctions = function() {
    this.debug('redefineGMFunctions');
    var self = this;
    
    self._oldGM_getValue = GM_getValue;
    self._oldGM_setValue = GM_setValue;
    
    var recordGMValue = function(name) {
        if($.inArray(name, self._gmVarNames) < 0) {
            self._gmVarNames.push(name);
            unsafeWindow.setTimeout(curry_scope(self._actualGM_setValue, self, 'IkariamAllInOne-' + IkaTools.getDomain() + '-GMVars', uneval(self._gmVarNames)), 0);
        }
    }
    
    GM_getValue = function(name, defaultValue) {
        recordGMValue(name);
        var ret = self._gmVars[name];
        if (typeof(ret) === 'undefined') {
            ret = defaultValue;
        }
        //self.debug('New GM_getValue: ' + name + ' = ' + ret + 
        //   (typeof(self._gmVars[name]) == 'undefined' ? ' (default)' : ''));
        return ret;
    };
    
    GM_setValue = function(name, value) {
        //self.debug('New GM_setValue: ' + name);
        recordGMValue(name);
        self._gmVars[name] = value;
        window.setTimeout(curry_scope(self._actualGM_setValue, self, name, value));
    };
    
    self._oldGM_xmlhttpRequest = GM_xmlhttpRequest;
    GM_xmlhttpRequest = function(args) {
        window.setTimeout(curry_scope(self._actualGM_xmlhttpRequest, self, args));
    };
    
    self._oldGM_registerMenuCommand = GM_registerMenuCommand;
    GM_registerMenuCommand = function(caption, commandFunc, accelKey, accelModifiers, accessKey) {
        window.setTimeout(curry_scope(self._actualGM_registerMenuCommand, self, caption, commandFunc, accelKey, accelModifiers, accessKey));
    };
    
    GM_getResourceURL = function(name) {
        return "";
    }
}

IkariamAllInOne.prototype._actualGM_registerMenuCommand = function(caption, commandFunc, accelKey, accelModifiers, accessKey) {
    this._oldGM_registerMenuCommand(caption, commandFunc, accelKey, accelModifiers, accessKey);
}

IkariamAllInOne.prototype._actualGM_setValue = function(name, value) {
    //this.debug('_actualGM_setValue of ' + name + ': ' + value);
    this._oldGM_setValue(name, value);
    //this.debug('_actualGM_setValue done');
}

IkariamAllInOne.prototype._actualGM_xmlhttpRequest = function(details) {
    //this.debug('Making xml http request to: ' + details.url);
    this._oldGM_xmlhttpRequest(details);
}

IkariamAllInOne.prototype.loadGMVars = function() {
    //this.debug('loadGMVars');
    this._gmVarNames = eval(GM_getValue('IkariamAllInOne-' + IkaTools.getDomain() + '-GMVars')) || [];
    this._gmVars = {};
    for (var i = 0; i < this._gmVarNames.length; i++) {
        var gmVarName = this._gmVarNames[i];
        var gmVarValue = GM_getValue(gmVarName);
        if (typeof(gmVarValue) != 'undefined') {
            this._gmVars[gmVarName] = gmVarValue;
        }
    }
}

IkariamAllInOne.prototype.executeScript = function(script, name, startTime) {
    startTime = startTime || new Date();
    var success = false;
    try {
        eval(script);
        success = true;
    } catch (e) {
        this.debug('Caught exception in execution of ' + name + ': ' + e);
    }
    this.resetTiming('Script execution: ' + name + ':');
    this.copyConfigTabs(name);
    //this.debug('ikariamAllInOne_Debug is ' + Config.get('ikariamAllInOne_Debug'));
    if (Config.get('ikariamAllInOne_Debug')) {
        IkaTools.debug(name + ': ' + (new Date() - startTime) + 'ms' + (success ? "" : " FAILURE"));
    }
}

IkariamAllInOne.prototype.executeDependency = function(script, url) {
    var startTime = new Date();
    if (url == 'http://userscripts.org/scripts/source/72585.user.js') {
        this.debug('Replacing http://userscripts.org/scripts/source/72585.user.js');
        // Why the fuck someone would declare a global variable with var is baffling.
        // And why they would put a guard on the declaration but not the initialization 
        // is even more unbelievable.
        script = script.replace('if (!GM) var GM = {};', 'GM = {}');
        // Note that we can't use eval(null, script) to use the global scope in code 
        // execution - this messes a lot of things up because global scope is not 
        // the same as Greasemonkey scope.
        // So instead we have to do this hacky substitution.
    }
    if (url == 'http://tools.betawarriors.com/ikcrc/ikcrc_formatter.js') {
        script = script.replace('function IKCRCFormatter(format, formatter, colors, colorize)', 
            'IKCRCFormatter = function (format, formatter, colors, colorize)');
    }
    try {
        eval(script);
    } catch (e) {
        this.debug('Caught exception in execution of dependency ' + url + ': ' + e);
    }
    this.debug('Dependency execution ' + url + ': ' + (new Date() - startTime) + 'ms');
//    if (Config.get('ikariamAllInOne_Debug')) {
//        IkaTools.debug("Dependency: " + url + ': ' + (new Date() - startTime) + 'ms');
//    }
}

// Saves config tabs for later use.  This is the kind of shit you have to do when 
// things are not written as objects (if Config was an object and each script had 
// its own Config object, then everything would just work).
IkariamAllInOne.prototype.copyConfigTabs = function(scriptName) {
    //this.debug('Tabs:');
    //this.debug(Config.tabs);
    if (Config.tabs) {
        for (var tabName in Config.tabs) {
            var tab = Config.tabs[tabName];
            if (!(tab.handledByIkariamAllInOne)) {
                this._configTabs[scriptName + ' - ' + tabName] = tab;
            }
        }
        delete Config.tabs;
    }
    //this.debug('Settings:');
    //this.debug(Config.settings);
    if (Config.settings) {
        for (var tabName in Config.settings) {
            var tab = Config.settings[tabName];
            if (!(tab.handledByIkariamAllInOne)) {
                this._configTabs[scriptName + ' - ' + tabName] = tab;
            }
        }
        delete Config.settings;
    }
    Config.settings = {};
    for (tabName in this._configTabs) {
        //this.debug('Restoring tab ' + tabName);
        this._configTabs[tabName].handledByIkariamAllInOne = true;
        Config.settings[tabName] = this._configTabs[tabName];
    }
    IkaTools.config.debugMode = Config.get('ikariamAllInOne_Debug');
}

IkariamAllInOne.prototype.debug = function(message) {
    if (unsafeWindow.console) {
        if (typeof(message) == 'string') {
            unsafeWindow.console.log("IkariamAllInOne: " + message);
        } else {
            unsafeWindow.console.log(message);
        }
    }
}

IkariamAllInOne.prototype.downloadScript = function(url, callback) {
    var headers = {
        "User-agent": navigator.userAgent, 
        "Accept": 'text/javascript',
    };
    var self = this;
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: headers,
        onload: function (response) {
            //self.debug('Loaded script: ' + response.responseText.substring(0, 200));
            var script = response.responseText;
            // Check that we are not being hit by userscripts DOS protection
            if (script.indexOf('is temporarily unavailable') < 0) {
                self.saveSavedScript(url, script);
                if (callback) {
                    callback(script);
                }
            }
        }
    });
}

IkariamAllInOne.prototype.loadScript = function(url, saveName, callback) {
    var startTime = new Date();
    if (this._forceLoadScripts) {
        this.saveSavedScript(url, '');
    }
    if (Config.get('ikariamAllInOneScript_' + saveName)) {
        //this.debug('Loading script at url: ' + url + ' name: ' + saveName);
        var existingScript = this.loadSavedScript(url);
        if (existingScript == '' || this._forceLoadScripts) {
            this.downloadScript(url, curry_scope(function(script) {
                this.loadDependencies(url, script, callback, true);
            }, this));
        } else {
            this.loadDependencies(url, existingScript, callback, false, startTime);
        }
    }
}

IkariamAllInOne.prototype.loadDependencies = function(url, script, callback, forceReparse, startTime) {
    var dependencyUrls = eval(this._oldGM_getValue('IkariamAllInOne-ScriptDependencies-' + url, 'false'));
    if (!dependencyUrls | forceReparse) {
        dependencyUrls = [];
        var lines = script.split(/\n/).filter(/\/\/\s+@require(\s)+/);
        for each (line in lines) {
            [, dependencyUrl] = line.match(/\/\/ @require\s+(\S+)/);
            dependencyUrls.push(dependencyUrl);
        }
        this._oldGM_setValue('IkariamAllInOne-ScriptDependencies-' + url, uneval(dependencyUrls));
    }
    this.debug('Dependency urls for ' + url + ': ' + dependencyUrls);
    var count = dependencyUrls.length;
    if (count > 0) {
        for (var i = 0; i < dependencyUrls.length; i++) {
            this.loadDependencyScript(dependencyUrls[i], 
                function() {
                    count--;
                    if (count == 0 && callback) {
                        callback(script, startTime);
                    }
                });
        }
   } else {
       callback(script, startTime);
   }
}

IkariamAllInOne.prototype.loadDependencyScript = function(url, callback) {
    if (!this._loadedDependencies[url]) {
        this._loadedDependencies[url] = true;
        var existingScript = this.loadSavedScript(url);
        if (existingScript == '' || this._forceLoadScripts) {
            this.downloadScript(url, curry_scope(function(script) {
                this.executeDependency(script, url);
                if (callback) {
                    callback();
                }
            }, this));
        } else {
            this.executeDependency(existingScript, url);
            if (callback) {
                callback();
            }
        }
    } else {
        debug('Dependency already loaded: ' + url);
        if (callback) {
            callback();
        }
    }
}

IkariamAllInOne.prototype.loadSavedScript = function(url) {
    return this._oldGM_getValue('IkariamAllInOne-Script-' + url, '');
}

IkariamAllInOne.prototype.saveSavedScript = function(url, script) {
    this._oldGM_setValue('IkariamAllInOne-Script-' + url, script);
}

IkariamAllInOne.enhanceIkaTools = function() {
	// The > selector does not seem to work correctly in 
	// http://ikariamscriptresources.googlecode.com/svn/tags/Latest/jquery-1.4.2-GM.min.js
	// No idea why, but this select is functionally equivalent.
	IkaTools.getCurrentCityId = function() {
		return $('#citySelect option:selected').attr('value');
	};
}

IkariamAllInOne.enhanceIkaTools();
new IkariamAllInOne();