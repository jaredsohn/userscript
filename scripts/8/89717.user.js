// ==UserScript==
// @name           BvS Agenda
// @namespace      ?
// @description    Displays tasks that you need to do today, and allows you to set reminders.
// @include        http://*animecubed.com/billy/bvs/*
// ==/UserScript==
function addStyle(css)
 {var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  style.textContent = css;
  head.appendChild(style);
  }

// Insert styles
addStyle([
  "td.header {text-align: center; background: url('http://i856.photobucket.com/albums/ab125/BrainTazer/scrolldark.jpg') repeat scroll 0 0 #833102; border: 1px solid black; }",
  "div#agenda {border: 1px solid black; width: 750px; height: 500px; display: none; position: fixed; top: 50%; left: 50%; margin: -250px 0 0 -375px; background-image: url('http://i856.photobucket.com/albums/ab125/BrainTazer/scrollbg3.jpg'); overflow: auto; text-align: center; z-index: 1000000000; }",
  "div#agenda table {width: 100%; }",
  "div#agenda table tr td span {font-size: 10px; color: blue; }",
  "div#agenda span {font-size: 10px; color: blue; }",
  ".strikethrough {text-decoration: line-through; color: grey; }"
  ].join("\n"));

function buildElement(type, attribute, attributeValue, HTML, appendTo, event, eventType, eventFunction)
 {var element = document.createElement(type);
  if(attribute.length == attributeValue.length)
    for(x in attribute)
      element.setAttribute(attribute[x], attributeValue[x]);
  else
    alert('Uh-oh! Your element did not build correctly, due to mismatched attribute and attributeValue arrays.')
  if(HTML)
    element.innerHTML = HTML;
  appendTo.appendChild(element);
  if(event)
    if(element.addEventListener)
      element.addEventListener(eventType, eventFunction, false);
      
  return element;
  }

function listItems()
 {// Begin Daily Items
 
  var x = 0;
  div.innerHTML = '';
  var table = buildElement('table', [], [], '', div, false);
  var tr = buildElement('tr', [], [], '', table, false);
  var td = buildElement('td', ['class', 'colspan'], ['minimenu header', '4'], '', tr, false);
  var a = buildElement('a', ['class', 'href'], ['minimenu', 'JavaScript: void(0); '], 'BvS Agenda', td, false);
  for each(val in GM_listValues().sort())
   {if(val.indexOf('-complete') == -1 && val.indexOf('-type') == -1 && GM_getValue(val + '-type') == 'daily')
     {var tr = buildElement('tr', [], [], '', table, false);
      var td = buildElement('td', [], [], '', tr, false);
      var checkbox = buildElement('input', ['type', 'name', 'id'], ['checkbox', val, 'checkbox' + x], false, td, true, 'click', flipValue);
      if(GM_getValue(val + '-complete'))
        checkbox.setAttribute('checked', 'yes');
      var td = buildElement('td', [], [], '', tr, false);
      var b = buildElement('b', [], [], val, td, false);
      var td = buildElement('td', [], [], GM_getValue(val), tr, false);
      var td = buildElement('td', [], [], '', tr, false);
      var span = buildElement('span', ['title'], [val], 'remove', td, true, 'click', removeItem);
      x++;
      }
    }
    
  // Begin Long Term Items
  
  var table = buildElement('table', [], [], '', div, false);
  var tr = buildElement('tr', [], [], '', table, false);
  var td = buildElement('td', ['class', 'colspan'], ['minimenu header', '4'], '', tr, false);
  var a = buildElement('a', ['class', 'href'], ['minimenu', 'JavaScript: void(0); '], 'Long Term Tasks', td, false);
  for each(val in GM_listValues().sort())
   {if(val.indexOf('-complete') == -1 && val.indexOf('-type') == -1 && GM_getValue(val + '-type') == 'longterm')
     {var tr = buildElement('tr', [], [], '', table, false);
      var td = buildElement('td', [], [], '', tr, false);
      var checkbox = buildElement('input', ['type', 'name', 'id'], ['checkbox', val, 'checkbox' + x], false, td, true, 'click', flipValue);
      if(GM_getValue(val + '-complete'))
        checkbox.setAttribute('checked', 'yes');
      var td = buildElement('td', [], [], '', tr, false);
      var b = buildElement('b', [], [], val, td, false);
      var td = buildElement('td', [], [], GM_getValue(val), tr, false);
      var td = buildElement('td', [], [], '', tr, false);
      var span = buildElement('span', ['title'], [val], 'remove', td, true, 'click', removeItem);
      x++;
      }
    }
    
  // Begin Agenda Entry
  var input = buildElement('input', ['type', 'size', 'id'], ['text', '20', 'agendaName'], false, div, false);
  var input = buildElement('input', ['type', 'size', 'id'], ['text', '30', 'agendaItem'], false, div, false);
  var select = buildElement('select', ['id'], ['agendaType'], false, div, false);
  var option = buildElement('option', ['value'], ['daily'], 'Daily Task', select, false);
  var option = buildElement('option', ['value'], ['longterm'], 'Long Term Task', select, false);
  var button = buildElement('input', ['type', 'value'], ['button', 'Add to Agenda!'], false, div, true, 'click', addItem);
  var br = buildElement('br', [], [], false, div, false);
  var span = buildElement('span', ['onclick'], ['this.parentNode.style.display = "none"; '], 'close', div, false);
  }
  
function addItem(e)
 {GM_setValue(document.getElementById('agendaName').value, document.getElementById('agendaItem').value);
  GM_setValue(document.getElementById('agendaName').value + '-complete', false);
  GM_setValue(document.getElementById('agendaName').value + '-type', document.getElementById('agendaType').value);
  document.getElementById('agendaName').value = '';
  document.getElementById('agendaItem').value = '';
  listItems();
  }
  
function removeItem(e)
 {GM_deleteValue(e.target.title);
  GM_deleteValue(e.target.title + '-complete');
  GM_deleteValue(e.target.title + '-type');
  listItems();
  }
  
function flipValue(e)
 {GM_setValue(e.target.name + '-complete', e.target.checked);
  if(e.target.checked)
    e.target.parentNode.parentNode.childNodes[2].setAttribute('class', 'strikethrough');
  else
    e.target.parentNode.parentNode.childNodes[2].setAttribute('class', '');
  }

function uncheckDaily()
 {for each(val in GM_listValues().sort())
   {if(val.indexOf('-complete') == -1 && val.indexOf('-type') == -1 && GM_getValue(val + '-type') == 'daily')
      GM_setValue(val + '-complete', false);
    }
  }
  
function checkDayroll()
 {var d = new Date();
  var lastDayroll = GM_getValue('lastDayroll');
  var thisHour = d.getUTCHours();
  var thisDay = d.getUTCDate();
  if(lastDayroll == null)
    GM_setValue('lastDayroll', thisDay);
  if(lastDayroll != thisDay)
   {if(thisHour > 11)
     {GM_setValue('lastDayroll', thisDay);
      uncheckDaily();
      }
    }
  }
  
var snap = document.evaluate("//table[@class='minimenu']/tbody/tr", document, null, 7, null);
var node = snap.snapshotItem(0);
var td = buildElement('td', ['class', 'style'], ['minimenu', 'text-align: center; '], '', node, false);
var a = buildElement('a', ['class', 'onclick'], ['minimenu', 'document.getElementById("agenda").style.display = "block"; '], 'Agenda', td, false); 

checkDayroll();

var div = buildElement('div', ['id'], ['agenda'], '', document.body, false);
listItems();