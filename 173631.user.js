// ==UserScript==
// @id             iitc-plugin-scandiitc@z4r
// @name           IITC plugin: show neighborhood portals 
// @category       Info
// @version        0.0.1.20130718.232527
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      none
// @downloadURL    none
// @description    [local-2013-07-18-232527] Display a sortable list of all portals with shared info
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==


function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};



// PLUGIN START ////////////////////////////////////////////////////////

window.plugin.scandiitc = function() {};
google.visualization = window.plugin.scandiitc
window.plugin.scandiitc.Query = function() {};
window.plugin.scandiitc.displayPL = function() {
  var spreadsheetsApiJs = '//spreadsheets.google.com/tq?key=0AqGKZsYV0yFydEktU3l5UUVuTU5HZ2dxM0JsV1VTdVE';
  load(spreadsheetsApiJs).thenRun(window.plugin.scandiitc.draw);
}
window.plugin.scandiitc.Query.setResponse = function(obj){
  window.plugin.scandiitc.Agents = [];
  window.plugin.scandiitc.PortalKeys = [];
  window.plugin.scandiitc.PortalNames = [];
  $.each(obj.table.cols, function(index, entry) {
    if (entry.label) {window.plugin.scandiitc.Agents.push(entry.label.toLowerCase())};
  });
  $.each(obj.table.rows, function(index, entry) {
    keys = [];
    if (entry.c[0].v) {
      for (i=1; i<=window.plugin.scandiitc.Agents.length; i++){
        keys.push(entry.c[i].v);
      }
      window.plugin.scandiitc.PortalNames.push(entry.c[0].v.toLowerCase());
      window.plugin.scandiitc.PortalKeys.push(keys);
    }
  });
}
window.plugin.scandiitc.draw = function(){
  window.plugin.scandiitc.desc = window.selectedPortal ? true : false;
  window.plugin.scandiitc.lastSort = window.selectedPortal ? 'distance' : 'name';
  window.plugin.scandiitc.portalList = window.plugin.scandiitc.getPortalList();
  var html = '<table><tr><td>Nothing to show!</td></tr></table>';
  if (window.plugin.scandiitc.portalList.length) {
    window.plugin.scandiitc.sortPortals();
    html = window.plugin.scandiitc.portalTable();
  }
  dialog({
    html: '<div id="scandiitc">' + html + '</div>',
    dialogClass: 'ui-dialog-scandiitc',
    title: 'ScandIITC',
    id: 'scandiitc'
  });
  // Setup sorting
  $(document).on('click.scandiitc', '#scandiitc table th.sortable', function() {
    window.plugin.scandiitc.desc = (window.plugin.scandiitc.lastSort == $(this).data('sort')) ? !window.plugin.scandiitc.desc : false;
    window.plugin.scandiitc.lastSort = $(this).data('sort');
    window.plugin.scandiitc.sortPortals();
    $('#scandiitc').html(window.plugin.scandiitc.portalTable());
  });
}
window.plugin.scandiitc.portalTable = function(){
  var portalList = window.plugin.scandiitc.portalList
  var html = '<table>';
  html += '<tr>';
  html += '<th colspan="4">&nbsp;</th>';
  $.each(window.plugin.scandiitc.Agents, function(index, agent) {
    html += '<th colspan="2">' + agent + '</th>';
  });
  html += '</tr>';
  html += '<tr>';
  html += '<th data-sort="name" class="sortable">PORTAL</th>';
  html += '<th data-sort="level" class="sortable">L</th>';
  html += '<th data-sort="energy" class="sortable">NRG</th>';
  html += '<th data-sort="distance" class="sortable">D(m)</th>';
  $.each(window.plugin.scandiitc.Agents, function(index, agent) {
    html += '<th>L8</th>';
    html += '<th>Ks</th>';
  });
  html += '</tr>';
  $.each(portalList, function(index, portal) {
    html += '<tr class="' + (portal.team === 1 ? 'res' : (portal.team === 2 ? 'enl' : 'neutral')) + '">';
    html += '<td>' + '<div style="max-height: 15px !important; min-width:140px !important;max-width:180px !important; overflow: hidden; text-overflow:ellipsis;">'+portal.name+'</div>' + '</td>';
    html += '<td class="L' + portal.level + '">' + portal.level + '</td>';
    html += '<td class="energy L' + ((portal.energy > 50) ? '' : '4') + '">' + portal.energy + '%</td>';
    html += '<td class="distance">' + portal.distance + '</td>';
    $.each(window.plugin.scandiitc.Agents, function(indexAnget, agent) {
      html += '<td class="eights L'+ (portal.eights[indexAnget] ? '' : '4') + '">' + (portal.eights[indexAnget] ? 'X' : '') + '</td>';
      html += '<td class="keys L'+ ((portal.keys[indexAnget] > 0) ? '' : '4') + '">' + portal.keys[indexAnget] + '</td>';
    });
    html += '</tr>';
  });
  html += '</table>';
  return html;
}
window.plugin.scandiitc.sortPortals = function() {
  var portalList = window.plugin.scandiitc.portalList;
  var sortBy = window.plugin.scandiitc.lastSort;
  var desc = window.plugin.scandiitc.desc;
  portalList.sort(function(a, b) {
    var retVal = 0;
    switch (sortBy) {
      case 'name':
        retVal = a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        break;
      default:
        retVal = b[sortBy] - a[sortBy];
        break;
    }
    if (desc) retVal = -retVal;
    return retVal;
  });
}
window.plugin.scandiitc.getPortalList = function(){
  var displayBounds = map.getBounds();
  var selectedPortalLatLng = window.selectedPortal ? window.portals[window.selectedPortal].getLatLng() : null;
  var portalList = []
  $.each(window.portals, function(i, portal) {
    if(!displayBounds.contains(portal.getLatLng())) return true;
    var portalDetail = portal.options.details;
    var portalName =  window.plugin.scandiitc.getPortalName(portalDetail);
    if(window.plugin.scandiitc.getPortalIndex(portalName) < 0) return true;
    var portalTeam = portal.options.team;
    var portalLevel = window.plugin.scandiitc.getPortalLevel(portalDetail);
    var portalEnergyRatio = window.plugin.scandiitc.getPortalEnergyRatio(portalDetail);
    var portalDistance = window.plugin.scandiitc.getPortalDistance(portal.getLatLng(), selectedPortalLatLng);
    var portalKeys = window.plugin.scandiitc.getPortalKeys(portalName);
    var portalEights = window.plugin.scandiitc.getPortalEights(portalDetail);
    portalList.push({
      name: portalName,
      team: portalTeam,
      level: portalLevel,
      energy: portalEnergyRatio,
      distance: portalDistance,
      keys: portalKeys,
      eights: portalEights
    });
  })
  return portalList;
}
// Accessors //
window.plugin.scandiitc.getPortalDistance = function(portalLatLng, selectedPortalLatLng){
  return selectedPortalLatLng ? Math.floor(portalLatLng.distanceTo(selectedPortalLatLng)) : 0;
}
window.plugin.scandiitc.getAgentIndex = function(agentName) {
  return window.plugin.scandiitc.Agents.indexOf(agentName.toLowerCase());
}
window.plugin.scandiitc.getPortalIndex = function(portalName) {
  return window.plugin.scandiitc.PortalNames.indexOf(portalName.toLowerCase());
}
window.plugin.scandiitc.getPortalKeys = function(portalName) {
  return window.plugin.scandiitc.PortalKeys[window.plugin.scandiitc.getPortalIndex(portalName)];
}
window.plugin.scandiitc.getPortalName = function(portalDetail) {
  return portalDetail.portalV2.descriptiveText.TITLE;
}
window.plugin.scandiitc.getPortalLevel = function(portalDetail) {
  return Math.floor(getPortalLevel(portalDetail));
}
window.plugin.scandiitc.getPortalEnergyRatio = function(portalDetail) {
  var energy = 0;
  var maxenergy = 0;
  $.each(portalDetail.resonatorArray.resonators, function(ind, reso) {
    if(reso) {
      energy += reso.energyTotal;
      maxenergy += RESO_NRG[reso.level];
    }
  });
  return maxenergy ? Math.floor(energy/maxenergy*100) : 0;
}
window.plugin.scandiitc.getPortalEights = function(portalDetail) {
  ret = new Array(window.plugin.scandiitc.Agents.length);
  for(var i=0;i<ret.length;i++) ret[i] = false;
  $.each(portalDetail.resonatorArray.resonators, function(ind, reso) {
    if (reso) {
      if(reso.level < 8) return ;
      var ownerIndex = window.plugin.scandiitc.getAgentIndex(window.getPlayerName(reso.ownerGuid));
      if(ownerIndex < 0) return;
      ret[ownerIndex] = true;
    }
  });
  return ret;
}

// SETUP ////
var setup =  function() {
  $('#toolbox').append(' <a onclick="window.plugin.scandiitc.displayPL()" title="Display portals keys shared on g+">ScandIITC</a>');
  $('head').append('<style>' +
    '.ui-dialog-scandiitc {max-width: 800px !important; width: auto !important;}' +
    '#scandiitc table {margin-top:5px; border-collapse: collapse; empty-cells: show; width:100%; clear: both;}' +
    '#scandiitc table td, #scandiitc table th {border-bottom: 1px solid #0b314e; padding:3px; color:white; background-color:#1b415e}' +
    '#scandiitc table tr.res td {  background-color: #005684; }' +
    '#scandiitc table tr.enl td {  background-color: #017f01; }' +
    '#scandiitc table tr.neutral td {  background-color: #000000; }' +
    '#scandiitc table th { text-align:center;}' +
    '#scandiitc table th.sortable { cursor: pointer;}' +
    '#scandiitc table td { text-align: center;}' +
    '#scandiitc table td.energy { text-align: right;}' +
    '#scandiitc table td.distance { text-align: right;}' +
    '#scandiitc table td.eights { width: 50px; border-left: 1px solid #0b314e;}' +
    '#scandiitc table td.keys { width: 50px;}' +
    '#scandiitc table td.L0 { background-color: #000000 !important;}' +
    '#scandiitc table td.L1 { background-color: #FECE5A !important; color: #000000 !important;}' +
    '#scandiitc table td.L2 { background-color: #FFA630 !important;}' +
    '#scandiitc table td.L3 { background-color: #FF7315 !important;}' +
    '#scandiitc table td.L4 { background-color: #E40000 !important;}' +
    '#scandiitc table td.L5 { background-color: #FD2992 !important;}' +
    '#scandiitc table td.L6 { background-color: #EB26CD !important;}' +
    '#scandiitc table td.L7 { background-color: #C124E0 !important;}' +
    '#scandiitc table td.L8 { background-color: #9627F4 !important;}' +
    '#scandiitc table td:nth-child(1) { text-align: left;}' +
    '#scandiitc table th:nth-child(1) { text-align: left;}' +
    '</style>');
}

// PLUGIN END //////////////////////////////////////////////////////////


if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);


