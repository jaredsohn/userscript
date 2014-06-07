var GMSU_meta_116461 = <><![CDATA[
// ==UserScript==
// @name           GM_ScriptUpdater
// @namespace      http://projects.izzysoft.de/
// @description    GreaseMonkey Script Updater - informs user of updates for your script and installs it on demand. Multi-language, capable of showing change history, and more.
// @version        1.1.6
// @include        *
// @copyright      IzzySoft
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @uso:script     116461
// @history        1.1.6 fix for faulty Array.filter() method. by phoenix7C2
// @history        1.1.5 reload GUI on language change (i.e. immediately apply the change visibly)
// @history        1.1.4 offer to chose the language
// @history        1.1.3 reworked notify window (straighter DOM usage) and implemented history view (main script only for now)
// @history        1.1.2 some code cleanup
// ==/UserScript==
]]></>;

// simple in_array check (is the item contained in the array?)
function in_array(item,arr) {
  for(p=0;p<arr.length;p++) if (item == arr[p]) return true;
  return false;
}

/** GreaseMonkey Script Updater class
 * @class GMSU
 */
var GMSU = {
  usoMeta: new Array(),
  localMeta: new Array(),
  scriptCount: 0,
  scriptIDs: new Array(),
  localIDs: new Array(),
  force: false,
  depForce: false,
  depData: new Array(),
  failedDeps: 0,
  updateCount: 0,
  newDeps: 0,
  debugMode: 0,
  /** Set language to use
   * @method setLang
   * @param string language two char language code
   */
  setLang: function(lng) {
    this.trans.useLang = lng;
	GM_setValue('GMSU_lang',lng);
  },
  /** Set translations for a given language
   * @method setTranslations
   * @param string lang 2-char language code
   * @param object trans translations { string term: string translation }
   */
  setTranslations: function(lang,trans) {
    if (typeof(this.trans[lang])!="object") { // new language?
      this.trans.lang = trans;
      return;
    }
    for (attrname in trans) { this.trans[lang][attrname] = trans[attrname]; }
  },
  /** Translations
   * @attribute object trans
   */
  trans: {
    de: {
      'HaveNewVerOf': '<b>Für <i>%1</i> gibt es Aktualisierungen:</b>',
      'InstalledVer': 'Installierte Version:',
      'AvailableVer': 'Verfügbare Version:',
      'DepsFailedCheck': 'Einige Abhängigkeiten konnten nicht verifiziert werden.',
      'DepUpdAvail': 'Einige Abhängigkeiten wurden aktualisiert:',
      'Update': 'Aktualisieren',
      'UpdateAnyway': 'Trotzdem aktualisieren',
      'VisitScriptHome': 'Homepage besuchen',
      'Nothing': 'Nichts',
      'NoUpdAvail': 'Kein Update verfügbar.',
      'WhatAction': '<b>Was soll jetzt geschehen?</b>',
      'UpToDate': 'Aktuell (%1)',
	  'DepsUpToDate': 'Die Abhängigkeiten scheinen auf dem aktuellen Stand zu sein:',
	  'Close': 'Schließen',
	  'CheckForUpdates': 'Auf Updates prüfen',
	  'daily': 'täglich',
	  'weekly': 'wöchentlich',
	  'monthly': 'monatlich',
	  'ShowHist': 'Historie',
	  'NewDeps': 'Es wurde(n) %1 neue (zusätzliche) Abhängigkeit(en) festgestellt.',
	  'Language': 'Sprache'
    },
    en: {
      'HaveNewVerOf': '<b>There are updates available for <i>%1</i>:</b>',
      'InstalledVer': 'Installed Version:',
      'AvailableVer': 'Available Version:',
      'DepsFailedCheck': 'Some dependencies could not be verified.',
      'DepUpdAvail': 'Some dependencies have been updated:',
      'Update': 'Update',
      'VisitScriptHome': 'Visit Homepage',
      'Nothing': 'Nothing',
      'NoUpdAvail': 'No update available.',
      'WhatAction': '<b>What do you want to do?</b>',
      'UpToDate': 'Up to date (%1)',
	  'DepsUpToDate': 'Dependencies seem to be up to date:',
	  'Close': 'Close',
	  'CheckForUpdates': 'Check for updates',
	  'daily': 'daily',
	  'weekly': 'weekly',
	  'monthly': 'monthly',
	  'ShowHist': 'History',
	  'NewDeps' : '%1 new dependencies have been detected.',
	  'lang_de' : 'Deutsch',
	  'lang_en' : 'English',
	  'lang_fr' : 'Française',
	  'lang_nl' : 'Nederlands'
    },
    fr: {
      'HaveNewVerOf': '<b>Il y a des mises à jours disponibles pour <i>%1</i>:</b>',
      'InstalledVer': 'Version installé:',
      'AvailableVer': 'Version disponible:',
      'DepsFailedCheck': 'Quelques dépendences ne peuvent  verifiées.',
      'DepUpdAvail': 'Quelques dépendences ont été mis à jours',
      'Update': 'Mise à jour',
      'VisitScriptHome': 'Visiter la page d\'acceuil',
      'Nothing': 'Rien',
      'NoUpdAvail': 'Pas de mise à jour disponible.',
      'WhatAction': '<b>Que voulez-vous faire?</b>',
      'UpToDate': 'A jour (%1)',
	  'DepsUpToDate': 'Les dépendences sembles être à jours:',
	  'Close': 'Fermer',
	  'Language': 'Langue'
    },
    nl: {
      'HaveNewVerOf': '<b>Er zijn bijwerken beschikbaar voor <i>%1</i>:</b>',
      'InstalledVer': 'Geïnstalleerde Versie:',
      'AvailableVer': 'Beschikbare Versie:',
      'DepsFailedCheck': 'Enkele script-onderdelen konden niet worden gecontroleerd.',
      'DepUpdAvail': 'Enkele script-onderdelen zijn geüpdatet:',
      'Update': 'Updaten',
      'UpdateAnyway': 'Toch updaten',
      'VisitScriptHome': 'Bezoek de website',
      'Nothing': 'Niets',
      'NoUpdAvail': 'Geen update beschikbaar.',
      'WhatAction': '<b>Wat wilt u doen?</b>'
    },
    useLang: GM_getValue('GMSU_lang','en')
  },
  /** Translate a given string
   * @method lang
   * @param string term to translate
   * @param optional array of strings replaces
   * @return string translated term
   */
  lang: function(term) {
    if (!term) return '';
    var res;
    if (this.trans[this.trans.useLang][term]) res = this.trans[this.trans.useLang][term];
    else if (this.trans['en'][term]) res = this.trans['en'][term];
    else return term;
    if (typeof(arguments[1])!="object") return res;
    for (var i=0;i<arguments[1].length;i++) {
      res = res.replace('%'+(i+1),arguments[1][i]);
    }
    return res;
  },
  /** Debug Output (GM_log only when this.debugMode is enabled)
   * @method debugOut
   * @param mixed message
   */
  debugOut: function(msg) {
    if (this.debugMode) GM_log(msg);
  },
  /** Parse UserScript Metadata
   * @method parseHeader
   * @param object metadataBlock The stuff between ==UserScript and /UserScript==
   * @return object MetaData
   */
  parseHeaders: function(metadataBlock) {
    var headers = {};
    var line, name, prefix, header, key, value;
    var multival = new Array('attribution','author','contributor','copyright','exclude','history','include','license','require','resource'); // these tags may appear multiple times

    for each(item in multival) headers[item] = new Array();

    var lines = metadataBlock.split(/\n/).filter(function(element, index, array){return !(element.match(/\/\/ @/)==null);});
    for each (line in lines) {
      [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);

      [key, prefix] = name.split(/:/).reverse();

      if (prefix) {
        if (!headers[prefix]) 
          headers[prefix] = new Object;
        header = headers[prefix];
      } else
        header = headers;

      if (header[key] && !(header[key] instanceof Array))
        header[key] = new Array(header[key]);

      if (header[key] instanceof Array)
        header[key].push(value);
      else
        header[key] = value;
    }

    return headers;
  },
  /** Retrieve Metadata for a given script ID from USO
   * @method getUsoMeta
   * @param integer scriptID
   * @param integer index script index
   * @return object MetaData MetaData as returned by parseHeaders
   */
  getUsoMeta: function(scriptID,num) {
    if (/[^\d]/.exec(scriptID)) {
      GM_log('ERROR: Cannot obtain USO metaData for non-numeric ID "'+scriptID+'".');
      return {};
    }
    if (num==0) this.depData = new Array();
    var scriptUrl="http://userscripts.org/scripts/source/"+scriptID+".meta.js",
        usoMeta;
    GM_xmlhttpRequest({
      method: 'GET',
      url: scriptUrl,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8',
        'Accept': 'text/html,application/xml,text/xml' },
      onload: function(responseDetails) {
        var failed = true;
        GMSU.usoMeta[num]=GMSU.parseHeaders(responseDetails.responseText);
        switch(num) {
          case 0: // main script
            GMSU.debugOut('Main Version: '+GMSU.localMeta[num].version+' / '+GMSU.usoMeta[num].version);
            GMSU.scriptCount = GMSU.usoMeta[0].require.length +1;
            if (GMSU.scriptCount>1) { // setup scriptIDs to check
              for (var i=0;i<GMSU.usoMeta[0].require.length;i++) {
                if (GMSU.usoMeta[0].require[i].match(/[^0-9]*([0-9]*)/)[1])
                  GMSU.scriptIDs.push(GMSU.usoMeta[0].require[i].match(/[^0-9]*([0-9]*)/)[1]);
                else
                  GMSU.scriptIDs.push(0);
              }
            }
            GMSU.debugOut('Scripts to check: '+GMSU.scriptCount);
            GMSU.debugOut('ScriptIDs: '+GMSU.scriptIDs);
            if (GMSU.localMeta[num].version == GMSU.usoMeta[num].version && !GMSU.depForce) { // no update
              GMSU.update();
            } else { // we've got some update (or dependency check was forced)
              if (GMSU.localMeta[num].version != GMSU.usoMeta[num].version) GMSU.updateCount++;
              if (GMSU.scriptCount>1) { // dependencies
                for (var k=1;k<GMSU.scriptCount+1;k++) {
                  if (GMSU.scriptIDs[k]==0) {
                    GMSU.failedDeps++;
                    continue;
                  }
                  try {
                    GMSU.localMeta[k] = GMSU.parseHeaders(eval('GMSU_meta_'+GMSU.scriptIDs[k]));
                    failed = false;
                  }
                  catch(e) {
                    GMSU.failedDeps++;
                    GMSU.debugOut('No MetaData for '+GMSU.scriptIDs[k]+' (k='+k+')');
                    continue;
                  }
                  GMSU.getUsoMeta(GMSU.scriptIDs[k],k);
                  break;
                }
                if (failed) GMSU.update(); // all deps failed
              } else { // no deps
                GMSU.update();
              }
            }
            break;
          case GMSU.scriptCount-1: // last dependency
            GMSU.debugOut('Checking ScriptID '+GMSU.scriptIDs[num]+' (#'+num+')');
            if ( GMSU.localMeta[num]!=undefined ) {
              if (!in_array(GMSU.scriptIDs[num],GMSU.localIDs)) GMSU.newDeps++;
              GMSU.debugOut('#'+num+' Version: '+GMSU.localMeta[num].version+' / '+GMSU.usoMeta[num].version);
              if (GMSU.localMeta[num].version != GMSU.usoMeta[num].version) { // dep update available
                GMSU.updateCount++;
              }
              GMSU.depData.push({name:GMSU.localMeta[num].name,oldVer:GMSU.localMeta[num].version,newVer:GMSU.usoMeta[num].version});
            } else {
              GMSU.debugOut('No version info for script #'+num);
              GMSU.failedDeps++;
            }
            GMSU.update(); // last item processed
            break;
          default: // dependency, but not the last
            GMSU.debugOut('Checking ScriptID '+GMSU.scriptIDs[num]+' (#'+num+'), default');
            if ( GMSU.localMeta[num]!=undefined ) {
              GMSU.debugOut('#'+num+' Version: '+GMSU.localMeta[num].version+' / '+GMSU.usoMeta[num].version);
              if (!in_array(GMSU.scriptIDs[num],GMSU.localIDs)) GMSU.newDeps++;
              if (GMSU.localMeta[num].version != GMSU.usoMeta[num].version) { // dep update available
                GMSU.updateCount++;
              }
              GMSU.depData.push({name:GMSU.localMeta[num].name,oldVer:GMSU.localMeta[num].version,newVer:GMSU.usoMeta[num].version});
            } else {
              GMSU.debugOut('No version info for script #'+num);
              GMSU.failedDeps++;
            }
            for (var k=num+1;k<GMSU.scriptCount;k++) {
              if (GMSU.scriptIDs[k]==0) {
                GMSU.failedDeps++;
                continue;
              }
              failed = false;
              try {
                GMSU.localMeta[k] = GMSU.parseHeaders(eval('GMSU_meta_'+GMSU.scriptIDs[k]));
              }
              catch(e) {
                GMSU.failedDeps++;
                GMSU.debugOut('No MetaData for '+GMSU.scriptIDs[k]+' (default, k='+k+')');
                continue;
              }
              GMSU.getUsoMeta(GMSU.scriptIDs[k],k);
              break;
            }
            if (failed) GMSU.update(); // remaining deps failed
            break;
        }
        GM_setValue('GMSU_lastCheck',String(new Date().getTime()));
      }
    });
  },
  /** Initialize GMSU for a given script ID
   * @method init
   * @param integer scriptID
   */
  init: function(scriptID,force,depForce) {
    this.debugOut('GMSU: Init called');
    this.force = force || false;
    this.setDepForce(depForce);
    this.debugOut('DepForce is set to: '+this.depForce);
    if (!(this.force || this.updateDue())) return;
    this.localMeta[0] = this.parseHeaders(eval('GMSU_meta_'+scriptID));
    this.scriptIDs.push(scriptID);
    this.localIDs.push(scriptID);
    for (var i=0;i<this.localMeta[0].require.length;i++) {
      if (this.localMeta[0].require[i].match(/[^0-9]*([0-9]*)/)[1])
        this.localIDs.push(this.localMeta[0].require[i].match(/[^0-9]*([0-9]*)/)[1]);
    }
    this.getUsoMeta(scriptID,0);
  },
  /** Set the interval between updates
   * @method setCheckInterval
   * @param integer days days between update checks
   */
  setCheckInterval: function(days) {
    if (isNaN(days)||days==undefined) return;
    GM_setValue('GMSU_checkInterval',days);
  },
  /** Shall we check dependencies?
   * @method setDepForce
   * @param boolean force
   */
  setDepForce: function(force) {
    if (typeof(force)!='boolean') return;
    this.depForce = force;
  },
  /** Check whether an update is due
   * @method updateDue
   * @return boolean
   */
  updateDue: function() {
    var now = new Date().getTime();
    var lastCheck = parseInt(GM_getValue('GMSU_lastCheck',String(now)));
    var interval = GM_getValue('GMSU_checkInterval',7)*86400000;
    this.debugOut('UpdateDue? Now: '+now+', lastCheck: '+lastCheck+', interval: '+interval);
    if (now-lastCheck>interval) return true;
    this.debugOut('Update not due.');
    return false;
  },
  /** Close (remove) the updater div
   * @method destroyMCDiv
   */
  destroyMCDiv: function() {
    if ( al=document.getElementById("GMSU_upd_alert") )
      al.parentNode.removeChild(al);
  },
  /** Create a DIV with multiple choices (links)
   * @method createMCDiv
   * @param string intro informational text to display
   * @param string action what button(s) to show ('home','update') - can be repeated.
   */
  createMCDiv: function() {
    if (document.getElementById('GMSU_upd_alert')) this.destroyMCDiv();
	// create main DIV
    var MCD = document.createElement('div');
    MCD.id = 'GMSU_upd_alert';
	if (typeof(arguments[0])=='string') { // old style *!* obsolete
      var intro = document.createElement('p');
      intro.innerHTML = arguments[0];
      intro.id = 'GMSU_upd_intro';
      MCD.appendChild(intro);
	} else { // new style
	  deps = arguments[0];
	  var tmp = document.createElement('h2');
	  tmp.innerHTML = deps.title;
	  MCD.appendChild(tmp);
	  tmp = document.createElement('table');
	  tmp.setAttribute('style','margin-left:auto;margin-right:auto;margin-bottom:5px;width:auto;');
	  tmp.id = 'GMSU_mainver';
	  var tr = document.createElement('tr');
	  var td = document.createElement('td');
	  td.appendChild( document.createTextNode(this.lang('InstalledVer')+' '+deps.main.instVer) );
	  td.appendChild( document.createElement('br') );
	  td.appendChild( document.createTextNode(this.lang('AvailableVer')+' '+deps.main.newVer) );
	  tr.appendChild(td);
	  if ( deps.main.history ) {
		var choiceL = document.createElement('a');
		choiceL.innerHTML = this.lang('ShowHist');
		choiceL.href='#';
		choiceL.setAttribute('style','margin-left:15px;');
		choiceL.addEventListener('click',function(){if(document.getElementById('GMSU_mainhist').style.display=='block') document.getElementById('GMSU_mainhist').style.display='none';else document.getElementById('GMSU_mainhist').style.display='block';},true);
		td = document.createElement('td');
		td.appendChild(choiceL);
		tr.appendChild(td);
		tmp.appendChild(tr);
	    MCD.appendChild(tmp);
	    tmp = document.createElement('div');
		var list = document.createElement('dl');
	    var version, desc, min=false, max=false;
		for (var i=0;i<deps.main.history.length;i++) {
		  [, version, desc] = deps.main.history[i].match(/(\S+)\s+(.*)$/);
		  var item = document.createElement('dt');
		  item.innerHTML = version;
		  list.appendChild(item);
		  item = document.createElement('dd');
		  item.innerHTML = desc;
		  list.appendChild(item);
		  if (version==deps.main.instVer) min=true;
		  if (version==deps.main.newVer) max=true;
		  if (min && max) break;
		}
		tmp.id = 'GMSU_mainhist';
		tmp.setAttribute('class','history');
		tmp.appendChild(list);
		MCD.appendChild(tmp);
	  } else {
	    tmp.appendChild(tr);
	    MCD.appendChild(tmp);
	  }
	  if (deps.depUpdAvail) {
	    tmp = document.createElement('div');
		tmp.id = 'GMSU_updAvail';
		tmp.appendChild( document.createTextNode(deps.depUpdAvail) );
		MCD.appendChild(tmp);
	  }
	  tmp = document.createElement('div');
	  tmp.innerHTML = deps.details;
	  MCD.appendChild(tmp);
	  if (deps.newDeps) {
	    tmp = document.createElement('div');
		tmp.id = 'GMSU_newdeps';
		tmp.appendChild( document.createTextNode(deps.newDeps) );
		MCD.appendChild(tmp);
	  }
	  if (deps.failed) {
	    tmp = document.createElement('div');
		tmp.id = 'GMSU_faileddeps';
		tmp.appendChild( document.createTextNode(deps.failed) );
		MCD.appendChild(tmp);
	  }
	  tmp = document.createElement('div');
	  tmp.id = 'GMSU_prompt';
	  tmp.innerHTML = deps.prompt;
	  MCD.appendChild(tmp);
	}

	// table for the actions
	choiceT = document.createElement('table');
	choiceT.align = 'center';
	choiceT.id = 'GMSU_actions';
	choiceR = document.createElement('tr');

	// language select drop down
    var choiceC = document.createElement('td');
	choiceC.id = 'GMSU_langdiv';
	var curLang = GM_getValue('GMSU_lang','en');
	choiceC.innerHTML = this.lang('Language')+': ';
	choiceL = document.createElement('select');
	choiceL.id = 'GMSU_lang';
	choiceL.addEventListener('change',function() { GMSU.setLang(this.value); GMSU.init(GMSU.scriptIDs[0],true); },true);
	var opt;
	for (var x in this.trans) {
	  if (x == 'useLang') continue;
	  opt  = document.createElement('option');
	  opt.value = x;
	  if (x==this.trans.useLang) opt.setAttribute('selected',true);
	  opt.appendChild(document.createTextNode(this.lang('lang_'+x)));
	  choiceL.appendChild(opt);
	  choiceC.appendChild(choiceL);
	}
	choiceR.appendChild(choiceC);

	// interval select drop down
    choiceC = document.createElement('td');
	choiceC.id = 'GMSU_intseldiv';
	var interval = GM_getValue('GMSU_checkInterval',7);
	choiceC.innerHTML = this.lang('CheckForUpdates')+': ';
	choiceL = document.createElement('select');
	choiceL.id = 'GMSU_interval';
	choiceL.addEventListener('change',function() { GM_setValue('GMSU_checkInterval',this.value); },true);
	opt = document.createElement('option');
	opt.value = 1;
	if (interval == 1) opt.setAttribute('selected',true);
	opt.appendChild(document.createTextNode( this.lang('daily') ));
	choiceL.appendChild(opt);
	choiceC.appendChild(choiceL);
	opt = document.createElement('option');
	opt.value = 7;
	if (interval == 7) opt.setAttribute('selected',true);
	opt.appendChild(document.createTextNode( this.lang('weekly') ));
	choiceL.appendChild(opt);
	choiceC.appendChild(choiceL);
	opt = document.createElement('option');
	opt.value = 30;
	if (interval == 30) opt.setAttribute('selected',true);
	opt.appendChild(document.createTextNode( this.lang('monthly') ));
	choiceL.appendChild(opt);
	choiceC.appendChild(choiceL);
	choiceR.appendChild(choiceC);
	choiceT.appendChild(choiceR);

	// action buttons
	choiceR = document.createElement('tr');
	choiceC = document.createElement('td');
	choiceC.id = 'GMSU_actionbuttons';
	choiceC.setAttribute('colspan',2);
    for (var i=1;i<arguments.length;i++) { // choices
      var choiceL = document.createElement('input');
	  choiceL.type = 'button';
	  choiceL.id = 'gmsu_'+arguments[i].text;
	  switch ( arguments[i] ) {
	    case 'update':
		  choiceL.setAttribute('style','background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D)');
		  choiceL.addEventListener('click',function() {
		    setTimeout(GMSU.destroyMCDiv, 500);
			window.location = 'http://userscripts.org/scripts/source/'+GMSU.scriptIDs[0]+'.user.js';
		  },true);
		  choiceL.value = this.lang('Update');
		  break;
		case 'home' :
		  choiceL.setAttribute('style','background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D)');
		  choiceL.addEventListener('click',function(){
		    setTimeout(GMSU.destroyMCDiv, 500);
			GM_openInTab('http://userscripts.org/scripts/show/'+GMSU.scriptIDs[0]);
		  },true);
		  choiceL.value = this.lang('VisitScriptHome');
		  break;
		default:
		  break;
	  }
      choiceC.appendChild(choiceL);
    }
	choiceL = document.createElement('input');
	choiceL.id = 'gmsu_close';
	choiceL.type = 'button';
	choiceL.value = this.lang('Close');
	choiceL.setAttribute('style','background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D)');
	choiceL.addEventListener('click',GMSU.destroyMCDiv,true);
    choiceC.appendChild(choiceL);
	choiceR.appendChild(choiceC);
	choiceT.appendChild(choiceR);

	// append it to master control div
    MCD.appendChild(choiceT);
    MCD.display = 'block';
    document.body.appendChild(MCD);

	// styles and positioning
    GM_addStyle('#GMSU_upd_alert { position:absolute;top:30%;left:35%;width:390px;z-index:1001;background-color:#f0e68c;border:5px ridge #fa8072;padding:2px; } #GMSU_upd_intro { text-align:center;color:#000000;margin-top:0px;margin-bottom:0px; } #GMSU_upd_alert * { text-align:center;font-size:12px; } #GMSU_upd_alert td {padding-left:7px;padding-right:7px;font-size:12px;}');
	GM_addStyle('#GMSU_upd_alert input { border:1px outset #666; padding:3px 5px 5px 20px; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; margin-left:.5em; } #GMSU_upd_alert input:hover { background-color:#f9f9f9; }');
	GM_addStyle('#GMSU_upd_alert #GMSU_intseldiv { margin-bottom:5px; } #GMSU_updAvail, #GMSU_prompt { font-weight:bold; } #GMSU_prompt { margin-top:2em; } #GMSU_upd_alert h2, #GMSU_upd_alert h2 * { font-size:14px; }');
	GM_addStyle('#GMSU_actions { margin:0.75em 1em; font-size:13px; font-family:Helvetica,Arial,sans-serif; text-decoration:none; width:380px; } #GMSU_upd_alert td { border:0px; }');
	GM_addStyle('#GMSU_upd_alert .history * { text-align:left; } #GMSU_upd_alert .history { outline:1px solid grey; margin-left:10px; margin-right:10px; margin-bottom:10px; display:none; background-color:lightgrey; } #GMSU_mainhist {height:100px;overflow-y:auto;}');
    MCD.style.top = Math.floor((window.innerHeight/2)-(MCD.offsetHeight/2)) + 'px';
    MCD.style.left = Math.floor((window.innerWidth/2)-(MCD.offsetWidth/2)) + 'px';
  },
  /** Update the script specified by its USO script ID - after confirmation
   * @method update
   */
  update: function() {
    this.debugOut('We have '+this.updateCount+' updates, '+this.newDeps+' new and '+this.failedDeps+' failed dependencies.');
	var deps = {}
    switch(this.updateCount) {
      case 0: // no updates
        if (this.force) alert(this.lang('NoUpdAvail'));
        break;
      case 1: // only main script (or one dependency on forced dep check)
        if (this.localMeta[0].version==this.usoMeta[0].version) { // only a dep
		  deps.depUpdAvail = this.lang('DepUpdAvail');
          var depDetails = '';
		  for (var i=0;i<this.depData.length;i++) {
		    if (this.depData[i].oldVer==this.depData[i].newVer)
			  depDetails += this.depData[0].name+': '+this.lang('UpToDate',new Array(this.depData[0].newVer))+'<br/>';
			else
			  depDetails += this.depData[0].name+': '+this.depData[i].oldVer+' =&gt; '+this.depData[i].newVer+'<br/>';
		  }
        } else  {
		  deps.depUpdAvail = this.lang('DepsUpToDate');
          var depDetails = '';
		  for (var i=0;i<this.depData.length;i++)
		    depDetails += this.depData[0].name+': '+this.depData[i].oldVer+' =&gt; '+this.depData[i].newVer+'<br/>';
		}
		deps.title = this.lang('HaveNewVerOf',new Array(this.localMeta[0].name));
		deps.main = {}
		deps.main.instVer = this.localMeta[0].version;
		deps.main.newVer  = this.usoMeta[0].version;
		if ( deps.main.instVer != deps.main.newVer && this.usoMeta[0].history.length ) deps.main.history = this.usoMeta[0].history;
		deps.prompt = this.lang('WhatAction');
		deps.details = depDetails; // temporarily *!*
        if (this.failedDeps>0) {
	      deps.failed = this.lang('DepsFailedCheck');
          if (this.newDeps==0) {
			this.createMCDiv(deps,'update','home');
          } else {
		    deps.newDeps = this.lang('NewDeps',new Array(this.newDeps.toString()));
			this.createMCDiv(deps,'update','home');
          }
        } else {
          if (this.newDeps==0) {
			this.createMCDiv(deps,'update','home');
          } else {
		    deps.newDeps = this.lang('NewDeps',new Array(this.newDeps.toString()));
			this.createMCDiv(deps,'update','home');
          }
        }
        break;
      default: // main script + dependencies
		var depDetails = '';
		deps.title = this.lang('HaveNewVerOf',new Array(this.localMeta[0].name));
		deps.main = {}
		deps.main.instVer = this.localMeta[0].version;
		deps.main.newVer  = this.usoMeta[0].version;
		if ( deps.main.instVer != deps.main.newVer && this.localMeta[0].history ) deps.main.history = this.localMeta[0].history;
		deps.prompt = this.lang('WhatAction');
        for (var i=0;i<this.depData.length;i++) {
          if (this.depData[i].oldVer==this.depData[i].newVer)
            depDetails += this.depData[i].name+': '+this.lang('UpToDate',new Array(this.depData[i].newVer))+'<br/>';
          else
            depDetails += this.depData[i].name+': '+this.depData[i].oldVer+' =&gt; '+this.depData[i].newVer+'<br/>';
        }
		if (this.failedDeps>0) deps.failed = this.lang('DepsFailedCheck');
		if (this.newDeps>0) deps.newDeps = this.lang('NewDeps',new Array(this.newDeps.toString()));
		deps.depUpdAvail = this.lang('DepUpdAvail');
		deps.details = depDetails; // temporarily *!*
		this.createMCDiv(deps,'update','home');
        break;
    }
  }
}