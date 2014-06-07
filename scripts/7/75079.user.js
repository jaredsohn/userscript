// ==UserScript==
// @name           DS Ausbaustufen ohne Scrollen (AddOn)
// @namespace      c1b1.de
// @description    Erstellt eine Schnellleiste im Hauptgebäude zum Ausbauen der Gebäude ohne Scrollen. Setzt DSimproveMainBuilding von Heinzel voraus
// @version        1.5
// @author         Samuel Essig (http://c1b1.de)
// @homepage       http://c1b1.de
// @copyright      2010, Samuel Essig (http://c1b1.de)
// @license        CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @require        http://userscripts.org/scripts/source/44063.user.js
// @include        http://*.die-staemme.de/game.php*
// ==/UserScript==

/*
 * Dieses Script ist ein AddOn-Script zum Script DSimproveMainBuilding von Heinzel(mänchen)
 * Das Script kann hier geladen werden:
 * http://forum.die-staemme.de/showthread.php?t=89981
 *
 * Für eine schnelle Ausführung sollte dieses Script in den Greasemonkey
 * Einstellungen unterhalb von Heinzels Script stehen, dies ist i.d.R.
 * aber nicht unbedingt notwendig.
 *
 */

var url = document.location.href;
String.prototype.str = function(haystack) { return haystack.indexOf(this) != -1; };

var names = ['main','barracks','stable','garage','church','snob','smith','place','statue','market','wood','stone','iron','farm','storage','hide','wall'];

const decreaseIcon = '<img alt="Abriss um eine Stufe: " src="data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQAQMAAAD+hscAAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA\
BlBMVEXsHOUAAACAUKm/AAAAAXRSTlMAQObYZgAAACRJREFUeF5dyLENAAAERcFfGsIsVmNzvEIj\
uerk+rqQQqx7wwCKiAVpyLisFQAAAABJRU5ErkJggg==" />';

const increaseIcon = '<img alt="Ausbau um eine Stufe: " src="data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQAQMAAAD+hscAAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA\
BlBMVEXsHOUAAACAUKm/AAAAAXRSTlMAQObYZgAAACNJREFUeF5dyLENAAAIAjBGj/AWXtPPFRlN\
OhWBk0Yrmxbls3zABWlcjOpjAAAAAElFTkSuQmCC" />';

if($('toggleKind') && 'screen=main'.str(url) && 'village='.str(url))
  {
  init();
  }
else if('screen=main'.str(url) && 'village='.str(url) && $('hide_completed'))
  {
  // Wait for "DSimproveMainBuilding" Script
  var changes = 1;
  var last = 0;
  $('content_value').addEventListener('DOMSubtreeModified',function() { changes++; },false);
  var intervalID = function() {
    if(last == changes) {
      init();
      $clear(intervalID);
      } else {
      last = changes;
      }
    }.periodical(100,window);
  }


function init() {

  var result = {};

  // Add placeholders
  $each(names,function(item,name)
    {
    result[item] = '--';
    });

  // Get 'Decrease' Buildings
  var list = $$('#buildings td:contains(Abriss)');
  $each(list,function(item)
    {
    var a = item.getElement('a');
    var name = a.get('href').match(/building_id=(\w+)/)[1];

    var display = $(item.parentNode).getElement('a').get('text').trim();

    var build_queue = $$('#build_queue tr td');  // Walk through the building queue to get next level
    var level = false;
    $each(build_queue,function(el) {
        if(display.str(el.get('text')))
          {
          try {
            level = el.get('text').match(/(\d{1,2})/)[1];
            }
          catch(e) {
            level = level===false?-1:level-1;
            }
          }
    });

    if(level === false) // Was not in building queue
      level = $(item.parentNode.getElementsByTagName('span')[0]).get('text').match(/(\d{1,2})/)[1];
    else if(level < 0)
      level = parseInt($(item.parentNode.getElementsByTagName('span')[0]).get('text').match(/(\d{1,2})/)[1])+level;

    result[name] = '<a href="'+a.get('href')+'">' + decreaseIcon + ' ' + (parseInt(level)-1) +'</a>';
    });

  // Get 'Increase' Buildings
  var list = $$('#buildings td:contains(Ausbau)');
  $each(list,function(item)
    {
    var a = item.getElement('a');
    var name = a.get('href').match(/id=(\w+)/)[1];

    var display = $(item.parentNode).getElement('a').get('text').trim();

    var build_queue = $$('#build_queue tr td');  // Walk through the building queue to get next level
    var level = false;
    $each(build_queue,function(el) {
        if(display.str(el.get('text')))
          {
          level = el.get('text').match(/(\d{1,2})/)[1];
          }
    });

    if(level === false) // Was not in building queue
      level = $(item.parentNode.getElementsByTagName('span')[0]).get('text').match(/(\d{1,2})/)[1];

    result[name] = '<a href="'+a.get('href')+'">' + increaseIcon + ' ' + (parseInt(level)+1) +'</a>';
    });

  // Get Not Exist Buildings
  var list = $$('#buildings td:contains(Bauen)');
  $each(list,function(item)
    {
    var a = item.getElement('a');
    var name = a.get('href').match(/id=(\w+)/)[1];

    level = 0;

    result[name] = '<a href="'+a.get('href')+'">' + increaseIcon + ' ' + (parseInt(level)+1) +'</a>';
    });

  // Add bar
  var table = new Element('table',{'style':'display:block;','class':'vis'});
  var colgroup = new Element('colgroup',{'width':50}).inject(table);
  var tr0 = new Element('tr').inject(table);
  var tr1 = new Element('tr').inject(table);
  var i = 1;
  $each(result,function(item,name)
    {
    i++;
    var th = new Element('th',{style:'text-align: center;'}).inject(tr0);
    var td = new Element('td',{style:'text-align: center;'}).inject(tr1);

    new Element('img',{src:'/graphic/buildings/'+name+'.png?1'}).inject(th);
    td.set('html',item);
    if(item != '--')
      {
      td.setStyle('background','#fadc9b');
      }
    });
  colgroup.set('span',i);

  table.inject($('content_value').getElementsByTagName('table')[0],'after'); 
  }
  
  