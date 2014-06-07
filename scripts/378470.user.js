// ==UserScript==
// @id             iitc-plugin-portals-localization@destp
// @name           IITC plugin: show list of portals with localizations
// @category       Info
// @version        0.1.0
// @namespace      https://github.com/darioestupinan/learningiitcplugins
// @description    [darioestupinan-2014-02-11] Display a sortable list of all visible portals with full details about the localization.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildname = 'destp'
plugin_info.datetimeversion = '20140211.440557';
plugin_info.pluginid = 'portals-localization';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

  /* whatsnew
   * 0.1.0 : First Step create functional plugin
   *
   * Code inspired in Portal List official plugin... no great deal
   * Display code inspired from @vita10gy's scoreboard plugin : iitc-plugin-scoreboard@vita10gy - https://github.com/breunigs/ingress-intel-total-conversion
   * Portal link code from xelio - iitc: AP List - https://raw.github.com/breunigs/ingress-intel-total-conversion/gh-pages/plugins/ap-list.user.js
   *
   */

// use own namespace for plugin
window.plugin.portalslocalization = function() {};

window.plugin.portalslocalization.listPortals = [];
window.plugin.portalslocalization.sortBy = 'level';
window.plugin.portalslocalization.sortOrder = -1;
window.plugin.portalslocalization.enlP = 0;
window.plugin.portalslocalization.resP = 0;
window.plugin.portalslocalization.filter = 0;

//fill the listPortals array with portals available on the map (level filtered portals will not appear in the table)
window.plugin.portalslocalization.getPortals = function() {
  //filter : 0 = All, 1 = Res, 2 = Enl
  var retval=false;

  var displayBounds = map.getBounds();

  window.plugin.portalslocalization.listPortals = [];
  $.each(window.portals, function(i, portal) {
    // eliminate offscreen portals (selected, and in padding)
    if(!displayBounds.contains(portal.getLatLng())) return true;

    retval=true;
    var d = portal.options.data;
	//debugger;
    var teamN = portal.options.team;

    switch (teamN) {
      case TEAM_RES:
        window.plugin.portalslocalization.resP++;
        break;
      case TEAM_ENL:
        window.plugin.portalslocalization.enlP++;
        break;
    }
    var l = window.getPortalLinks(i);
    var f = window.getPortalFields(i);
	
	var dl = d.resCount===0? '': unixTimeToDateTimeString(portal.options.timestamp, false) ;
	
    var ap = portalApGainMaths(d.resCount, l.in.length+l.out.length, f.length);

    var thisPortal = {
      'portal': portal,
      'guid': i,
      'teamN': teamN, // TEAM_NONE, TEAM_RES or TEAM_ENL
      'team': d.team, // "NEUTRAL", "RESISTANCE" or "ENLIGHTENED"
      'name': d.title,
	  'lat': d.latE6/1E6,
	  'lng': d.lngE6/1E6,
	  'nameLower': d.title.toLowerCase(),
      'level': portal.options.level,
      'health': d.health,
      'resCount': d.resCount,
      'img': d.img,
      'linkCount': l.in.length + l.out.length,
      'link' : l,
      'fieldCount': f.length,
      'field' : f,
      'enemyAp': ap.enemyAp,
      'ap': ap,
	  'decay' : dl,
	  'optimal' : Math.round((((d.latE6)/1E6)-0.00035),6)
    };
    window.plugin.portalslocalization.listPortals.push(thisPortal);
  });

  return retval;
}

window.plugin.portalslocalization.displayPL = function() {
  var html = '';
  window.plugin.portalslocalization.sortBy = 'level';
  window.plugin.portalslocalization.sortOrder = -1;
  window.plugin.portalslocalization.enlP = 0;
  window.plugin.portalslocalization.resP = 0;
  window.plugin.portalslocalization.filter = 0;

  if (window.plugin.portalslocalization.getPortals()) {
    html += window.plugin.portalslocalization.portalTable(window.plugin.portalslocalization.sortBy, window.plugin.portalslocalization.sortOrder,window.plugin.portalslocalization.filter);
  } else {
    html = '<table class="noPortals"><tr><td>Nothing to show!</td></tr></table>';
  };

  if(window.useAndroidPanes()) {
    $('<div id="portalslocalization" class="mobile">' + html + '</div>').appendTo(document.body);
  } else {
    dialog({
      html: '<div id="portalslocalization">' + html + '</div>',
      dialogClass: 'ui-dialog-portalslocalization',
      title: 'Localization list: ' + window.plugin.portalslocalization.listPortals.length + ' ' + (window.plugin.portalslocalization.listPortals.length == 1 ? 'portal' : 'portals'),
      id: 'localization-list',
      width: 700
    });
  }
}

window.plugin.portalslocalization.portalTable = function(sortBy, sortOrder, filter) {
  // save the sortBy/sortOrder/filter
  window.plugin.portalslocalization.sortBy = sortBy;
  window.plugin.portalslocalization.sortOrder = sortOrder;
  window.plugin.portalslocalization.filter = filter;

  var portals=window.plugin.portalslocalization.listPortals;

  //Array sort
  window.plugin.portalslocalization.listPortals.sort(function(a, b) {
    var retVal = 0;

    var aComp = a[sortBy];
    var bComp = b[sortBy];

    if (aComp < bComp) {
      retVal = -1;
    } else if (aComp > bComp) {
      retVal = 1;
    } else {
      // equal - compare GUIDs to ensure consistent (but arbitrary) order
      retVal = a.guid < b.guid ? -1 : 1;
    }

    // sortOrder is 1 (normal) or -1 (reversed)
    retVal = retVal * sortOrder;
    return retVal;
  });

  var sortAttr = window.plugin.portalslocalization.portalTableHeaderSortAttr;
  var html = window.plugin.portalslocalization.stats();
  html += '<table class="portals">'
    + '<tr class="header">'
    + '<th>#</th>'
    + '<th ' + sortAttr('nameLower', sortBy, 1, 'portalTitle') + '>Portal Name</th>'
    // + '<th ' + sortAttr('decay', sortBy, -1) + '>Decay</th>'	
    // + '<th ' + sortAttr('lat', sortBy, 1) + '>Lat</th>'
	// + '<th ' + sortAttr('lng', sortBy, -1) + '>Long</th>'
    + '<th ' + sortAttr('lat', sortBy, -1) + '>Localization</th>'
    + '<th ' + sortAttr('health', sortBy, -1) + '>Health</th>'
    + '</tr>\n';

  var rowNum = 1;

  $.each(portals, function(ind, portal) {
    if (filter === TEAM_NONE || filter === portal.teamN) {

      html += '<tr class="' + (portal.teamN === window.TEAM_RES ? 'res' : (portal.teamN === window.TEAM_ENL ? 'enl' : 'neutral')) + '">'
        + '<td>'+rowNum+'</td>'
        + '<td class="portalTitle" style="">' + window.plugin.portalslocalization.getPortalLink(portal, portal.guid) + '</td>'
        // + '<td class="portalTitle" style="">' + portal.decay + '</td>'
		// + '<td class="portalTitle" style="">' + portal.lat + '</td>'
		// + '<td class="portalTitle" style="">' + portal.lng + '</td>'
		+ '<td class="portalTitle" style="">' + portal.optimal +";"+ portal.lng + '</td>'
		+ '<td class="portalTitle" style="">' + portal.health + '</td>';		
      html+= '</tr>';

      rowNum++;
    }
  });
  html += '</table>';

  html += '<div class="disclaimer">Click on portals table headers to sort by that column. '
    + 'Click on <b>All Portals, Resistance Portals, Enlightened Portals</b> to filter</div>';

  return html;
}

window.plugin.portalslocalization.stats = function(sortBy) {
  var html = '<table class="teamFilter"><tr>'
    + '<td class="filterAll" style="cursor:pointer"><a href=""></a>All Portals : (click to filter)</td><td class="filterAll">' + window.plugin.portalslocalization.listPortals.length + '</td>'
    + '<td class="filterRes" style="cursor:pointer" class="sorted">Resistance Portals : </td><td class="filterRes">' + window.plugin.portalslocalization.resP +' (' + Math.floor(window.plugin.portalslocalization.resP/window.plugin.portalslocalization.listPortals.length*100) + '%)</td>'
    + '<td class="filterEnl" style="cursor:pointer" class="sorted">Enlightened Portals : </td><td class="filterEnl">'+ window.plugin.portalslocalization.enlP +' (' + Math.floor(window.plugin.portalslocalization.enlP/window.plugin.portalslocalization.listPortals.length*100) + '%)</td>'
    + '</tr>'
    + '</table>';
  return html;
}

// A little helper function so the above isn't so messy
window.plugin.portalslocalization.portalTableHeaderSortAttr = function(name, by, defOrder, extraClass) {
  // data-sort attr: used by jquery .data('sort') below
  var retVal = 'data-sort="'+name+'" data-defaultorder="'+defOrder+'" class="'+(extraClass?extraClass+' ':'')+'sortable'+(name==by?' sorted':'')+'"';

  return retVal;
};

// portal link - single click: select portal
//               double click: zoom to and select portal
//               hover: show address
// code from getPortalLink function by xelio from iitc: AP List - https://raw.github.com/breunigs/ingress-intel-total-conversion/gh-pages/plugins/ap-list.user.js
window.plugin.portalslocalization.getPortalLink = function(portal,guid) {
  var coord = portal.portal.getLatLng();
  var latlng = [coord.lat, coord.lng].join();
  var jsSingleClick = 'window.renderPortalDetails(\''+guid+'\');return false';
  var jsDoubleClick = 'window.zoomToAndShowPortal(\''+guid+'\', ['+latlng+']);return false';
  var perma = '/intel?latE6='+coord.lat+'&lngE6='+coord.lng+'&z=17&pguid='+guid;

  //Use Jquery to create the link, which escape characters in TITLE and ADDRESS of portal
  var a = $('<a>',{
    text: portal.name,
    title: portal.name,
    href: perma,
    onClick: jsSingleClick,
    onDblClick: jsDoubleClick
  })[0].outerHTML;

  return a;
}

window.plugin.portalslocalization.onPaneChanged = function(pane) {
  if(pane == "plugin-portalslocalization")
    window.plugin.portalslocalization.displayPL();
  else
    $("#portalslocalization").remove()
};

var setup =  function() {
  if(window.useAndroidPanes()) {
    android.addPane("plugin-portalslocalization", "Portals Localization", "ic_action_paste");
    addHook("paneChanged", window.plugin.portalslocalization.onPaneChanged);
  } else {
    $('#toolbox').append(' <a onclick="window.plugin.portalslocalization.displayPL()" title="Display a list of localizations in the current view">Portals Localization</a>');
  }

  $('head').append('<style>' +
    '#portalslocalization.mobile {background: transparent; border: 0 none !important; height: 90% !important; width: 100% !important; left: 0 !important; top: 0 !important; position: absolute; overflow: auto; }' +
    '#portalslocalization table { margin-top:5px; border-collapse: collapse; empty-cells: show; width: 90%; clear: both; }' +
    '#portalslocalization table td, #portalslocalization table th {border-bottom: 1px solid #0b314e; padding:3px; color:white; background-color:#1b415e}' +
    '#portalslocalization table tr.res td { background-color: #005684; }' +
    '#portalslocalization table tr.enl td { background-color: #017f01; }' +
    '#portalslocalization table tr.neutral td { background-color: #000000; }' +
    '#portalslocalization table th { text-align: center; }' +
    '#portalslocalization table td { text-align: center; }' +
    '#portalslocalization table.portals td { white-space: nowrap; }' +
    '#portalslocalization table td.portalTitle { text-align: left;}' +
    '#portalslocalization table th.sortable { cursor:pointer;}' +
    '#portalslocalization table th.portalTitle { text-align: left;}' +
    '#portalslocalization table .portalTitle { min-width: 120px !important; max-width: 240px !important; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }' +
    '#portalslocalization table .apGain { text-align: right !important; }' +
    '#portalslocalization .sorted { color:#FFCE00; }' +
    '#portalslocalization .filterAll { margin-top: 10px;}' +
    '#portalslocalization .filterRes { margin-top: 10px; background-color: #005684  }' +
    '#portalslocalization .filterEnl { margin-top: 10px; background-color: #017f01  }' +
    '#portalslocalization .disclaimer { margin-top: 10px; font-size:10px; }' +
    '</style>');

  // Setup sorting
  $(document).on('click.portalslocalization', '#portalslocalization table th.sortable', function() {
    var sortBy = $(this).data('sort');
    // if this is the currently selected column, toggle the sort order - otherwise use the columns default sort order
    var sortOrder = sortBy == window.plugin.portalslocalization.sortBy ? window.plugin.portalslocalization.sortOrder*-1 : parseInt($(this).data('defaultorder'));
    $('#portalslocalization').html(window.plugin.portalslocalization.portalTable(sortBy,sortOrder,window.plugin.portalslocalization.filter));
  });

  $(document).on('click.portalslocalization', '#portalslocalization .filterAll', function() {
    $('#portalslocalization').html(window.plugin.portalslocalization.portalTable(window.plugin.portalslocalization.sortBy,window.plugin.portalslocalization.sortOrder,0));
  });
  $(document).on('click.portalslocalization', '#portalslocalization .filterRes', function() {
    $('#portalslocalization').html(window.plugin.portalslocalization.portalTable(window.plugin.portalslocalization.sortBy,window.plugin.portalslocalization.sortOrder,1));
  });
  $(document).on('click.portalslocalization', '#portalslocalization .filterEnl', function() {
    $('#portalslocalization').html(window.plugin.portalslocalization.portalTable(window.plugin.portalslocalization.sortBy,window.plugin.portalslocalization.sortOrder,2));
  });
}

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


