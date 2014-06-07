// ==UserScript==
// @name          DS Notes Manager
// @description   Notizen können in Teil-Notizblöcke aufgeteilt werden
// @version       1.2
// @author        Samuel Essig (http://c1b1.de)
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009-2010, Samuel Essig (http://c1b1.de)
// @license       No distribution!
// @include       http://*.die-staemme.de/game.php?*screen=memo*
// @exclude       http://forum.die-staemme.de/*
// ==/UserScript==

/*
ds.NotesManager.user.js


DS Duke & Forum Assistant

(c) by C1B1SE
         info@c1b1.de
         http://c1b1.de

Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.
You may change string values if it's necessary for your language area.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.
*/


var dom = new html();

if(dom.class('menu nowrap quickbar')[0])
  var subtrahend = 2;
else
  var subtrahend = 1;

var notes_td = dom.id('show_row').getElementsByTagName('td')[0];

var headings = new Array();
var edit_mode = false;

secedeReadElement(notes_td);

secedeWriteElement(dom.id('message'));
addAdvancedEditLink('Erweitertes Bearbeiten - aus');

function saveAdvanced()
  {
  var texts = new Array();
  var first = true;
  for(var i = 0, elist = document.getElementsByClassName('secededWriteTextArea'), len = elist.length; i < len; i++)
    {
    var text = elist[i].value;

    if(!first)
      text = '[secede]' + text;
    else
      first = false;

    texts.push(text);
    }

  var text = texts.join('\n');

  dom.id('message').innerHTML = '';
  dom.id('message').value = text;

  dom.id('submit_row').getElementsByTagName('td')[0].getElementsByTagName('input')[0].click();
  }

function addAdvancedEditLink(text)
  {
  var a = dom.n('a');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    if(dom.id("edit_row").style.display == '')
      {
      alert('Nach dem Öffnen des normalen Bearbeitens funktioniert diese Funktion nicht mehr.');
      return true;
      }

    if(edit_mode)
      {
      this.style.color = '#804000';
      this.innerHTML = this.innerHTML.split('-')[this.innerHTML.split('-').length-2] + ' - aus';

      dom.id("show_row").style.display = '';
      dom.id("edit_link").style.display = '';
      dom.id("edit_row").style.display = 'none';
      dom.id("submit_row").style.display = 'none';
      dom.id("bbcodes").style.display = 'none';
      dom.id('save_advanced_button').style.display = 'none';
      dom.id('submit_row').getElementsByTagName('td')[0].getElementsByTagName('input')[0].style.display = '';

      for(var i = 0, elist = document.getElementsByClassName('notes_section'), len = elist.length; i < len; i++)
        elist[i].style.display = 'none';
      for(var i = 0, elist = document.getElementsByClassName('secededWriteTextArea'), len = elist.length; i < len; i++)
        elist[i].style.display = 'none';
      for(var i = 0, elist = document.getElementsByClassName('sectionLink'), len = elist.length; i < len; i++)
        elist[i].parentNode.style.backgroundColor = '#F7EED3';

      edit_mode = false;
      }
    else
      {
      this.style.color = 'red';
      this.innerHTML = this.innerHTML.split('-')[this.innerHTML.split('-').length-2] + ' - an';

      dom.id("show_row").style.display = 'none';
      dom.id("edit_link").style.display = 'none';
      dom.id("edit_row").style.display = 'none';
      dom.id("submit_row").style.display = '';
      dom.id("bbcodes").style.display = 'none';
      dom.id('submit_row').getElementsByTagName('td')[0].getElementsByTagName('input')[0].style.display = 'none';

      edit_mode = true;

      for(var i = 0, elist = document.getElementsByClassName('sectionLink'), len = elist.length; i < len; i++)
        {
        elist[i].addEventListener('mouseover',function()
          {
          if(edit_mode)
            this.parentNode.style.border = 'rgb(170,255,220) 2px solid';
          },false)
        elist[i].addEventListener('mouseout',function()
          {
          if(edit_mode)
            this.parentNode.style.border = 'transparent 2px solid';
          },false)
        }

      if(!dom.id('save_advanced_button'))
        {

        var input = dom.n('input');
        input.setAttribute('type','button');
        input.setAttribute('id','save_advanced_button');
        input.setAttribute('value','Erweitertes Speichern');
        input.addEventListener('click',saveAdvanced,false);

        dom.id('submit_row').getElementsByTagName('td')[0].appendChild(dom.text(' '));
        dom.id('submit_row').getElementsByTagName('td')[0].appendChild(input);
        }

      }

  },false);
  a.appendChild(dom.text(text));
  dom.id("edit_link").parentNode.insertBefore(a, dom.id("edit_link").nextSibling );
  dom.id("edit_link").parentNode.insertBefore(dom.text(' -> '), a );
  }


function secedeReadElement(notes_td)
  {
  // First Heading
  var after = notes_td.innerHTML;
  headings.push( after.split('<br>').shift() );
  after = after.split('<br>');
  after[0] = '<h3>' + after[0] + '</h3>';
  after = after.join('<br>');
  notes_td.innerHTML = after;

  notes_td.innerHTML = '<div class="notes_section" style="display:none; ">'+notes_td.innerHTML;
  var primaryKey_sections = 0;

  var text = notes_td.innerHTML;
  var positions = getCodesPositions(text);
  while(positions[0] != false)
    {
    var first = positions[0];
    var last = positions[1];

    var match = positions[2];

    var text = text.substr(first,last);
    var tmp_element = dom.n('div');
    tmp_element.innerHTML = text;

    var table = dom.n('table');

    var tr = dom.n('tr');
    var th = dom.n('th');
    th.appendChild(dom.text(' - Parted here - '));
    th.setAttribute('colspan','3');
    th.setAttribute('style','text-align:center; ');

    tr.appendChild(th);
    table.appendChild(tr);

    var before = notes_td.innerHTML.substr(0,first);
    var after = notes_td.innerHTML.substr(last);

    // Heading:
    if(match[1])
      {
      headings.push( match[1] );
      after = '<h3>' + match[1] + '</h3>' + after;
      }
    else
      {
      headings.push( after.split('<br>').shift() );
      after = after.split('<br>');
      after[0] = '<h3>' + after[0] + '</h3>';
      after = after.join('<br>');
      }

    notes_td.innerHTML = before + '</div><div class="notes_section" style="display:none; ">' + after + '</div>';

    var text = notes_td.innerHTML;
    var positions = getCodesPositions(text);
    primaryKey_sections++;
    }
  notes_td.innerHTML = notes_td.innerHTML + '</div>';

  var section_links = dom.n('tr');
  for(var i = 0; i <= primaryKey_sections;)
    {
    var td = dom.n('td');
    td.setAttribute('style','border:transparent 2px solid; ');
    var a = dom.n('a');
    a.setAttribute('href','#');
    a.setAttribute('title',i);
    a.setAttribute('class','sectionLink');

    if(headings[i].indexOf('<') == -1 && dom.trim(headings[i]) != '')
      a.appendChild(dom.text(headings[i++]));
    else
      a.appendChild(dom.text(' ' + (++i) ));

    var onclick_fct = function()
      {
      if(dom.id('show_row').style.display != 'none')
        {
        // Read Mode
        if(!edit_mode)
          {
          for(var i = 0, elist = document.getElementsByClassName('notes_section'), len = elist.length; i < len; i++)
            elist[i].style.display = 'none';

          document.getElementsByClassName('notes_section')[this.title].style.display = 'block';
          return false;
          }
        return true;
        }
      else
        {
        if(edit_mode)
          {
          for(var i = 0, elist = document.getElementsByClassName('notes_section'), len = elist.length; i < len; i++)
            elist[i].style.display = 'none';
          for(var i = 0, elist = document.getElementsByClassName('secededWriteTextArea'), len = elist.length; i < len; i++)
            elist[i].style.display = 'none';
          for(var i = 0, elist = document.getElementsByClassName('sectionLink'), len = elist.length; i < len; i++)
            elist[i].parentNode.style.backgroundColor = '#F7EED3';
          for(var i = 0, elist = document.getElementsByClassName('secededBBCodesBar'), len = elist.length; i < len; i++)
            elist[i].style.display = 'none';

          this.parentNode.style.backgroundColor = 'rgb(230,255,200)';

          dom.id('secededWriteTextArea_'+this.title).style.display = 'block';
          dom.id('secededBBCodesBar_'+this.title).style.display = 'block';

          // Insert Heading, if it was defined by regular expression
          var text = dom.id('secededWriteTextArea_'+this.title).innerHTML;
          var heading = this.firstChild.nodeValue;
          if(text.split('\n').shift().indexOf(heading) == -1)
            {
            dom.id('secededWriteTextArea_'+this.title).innerHTML = heading + '\n' + dom.id('secededWriteTextArea_'+this.title).innerHTML;
            }

          return false;
          }
        return true;
        }

      };

    a.addEventListener('click',onclick_fct,false);
    td.appendChild(a);
    section_links.appendChild(td);
    }
  dom.id('show_row').parentNode.insertBefore(section_links,dom.id('show_row'));

  onclick_fct.apply(td);

  // Add colspans:
  var elist = dom.id('show_row').parentNode.getElementsByTagName('tr');
  for(var i = 1, len = elist.length; i < len; i++)
    {
    elist[i].getElementsByTagName('td')[0].setAttribute('colspan',primaryKey_sections+1);
    }
  dom.id('serverDate').replaceChild(dom.text(' - Du benutzt ein Script von c1b1.de'),dom.id('serverDate').firstChild);

  }

function secedeWriteElement(notes_td)
  {
  var result = '';

  result += '<textarea cols="90" rows="25" style="display:none; " class="secededWriteTextArea" id="secededWriteTextArea_0">'+notes_td.innerHTML;
  var primaryKey_sections = 0;

  var text = result;
  var positions = getCodesPositions(text);
  while(positions[0] != false)
    {
    primaryKey_sections++;
    var first = positions[0];
    var last = positions[1];

    var match = positions[2];

    var text = text.substr(first,last);
    var tmp_element = dom.n('div');
    tmp_element.innerHTML = text;


    var table = dom.n('table');

    var tr = dom.n('tr');
    var th = dom.n('th');
    th.appendChild(dom.text(' - Parted here - '));
    th.setAttribute('colspan','3');
    th.setAttribute('style','text-align:center; ');

    tr.appendChild(th);
    table.appendChild(tr);

    var before = result.substr(0,first);
    var after = result.substr(last);

    result = before + '</textarea><textarea cols="90" rows="25" style="display:none; " class="secededWriteTextArea" id="secededWriteTextArea_'+primaryKey_sections+'">' + after + '</textarea>';

    var text = result;
    var positions = getCodesPositions(text);


    // BBCodes:

    var div = dom.n('div');
    div.setAttribute('class','secededBBCodesBar');
    div.setAttribute('id','secededBBCodesBar_'+primaryKey_sections);
    div.setAttribute('style','display:none;');

    var code = dom.id('bbcodes').cloneNode(true).innerHTML;
    while(code.indexOf('message') != -1)
    code = code.replace('message','secededWriteTextArea_'+primaryKey_sections);
    div.innerHTML = code;
    dom.id('bbcodes').parentNode.insertBefore(div,dom.id('bbcodes'));

    }

  var tr = dom.n('tr');
  var td = dom.n('td');
  td.setAttribute('colspan',primaryKey_sections+1);
  td.innerHTML = result;
  tr.appendChild(td);

  dom.id('submit_row').parentNode.insertBefore(tr,dom.id('submit_row'));
  }


function getCodesPositions(text)
  {
  var text = text;
  var patterns = new Array(/\[secede=(.+)\]/,/\[secede\]/,'[secede/]','[secede /]');

  for(var i = 0, len = patterns.length, pattern; i < len; i++)
    {
    var pattern = patterns[i];
    if(typeof(pattern) != 'object')
      {
      var first = text.indexOf(pattern);
      }
    else
      {
      var first = text.search(pattern);
      }

    if(first != -1)
      {
      if(typeof(pattern) != 'object')
        {
        last = first + pattern.length;
        return new Array(first,last,false);
        }
      else
        {
        var matched = text.match(pattern)
        last = first + matched[0].length;
        return new Array(first,last,matched);
        }

      }
    };
  return new Array(false);
  }



function html()
  {
  this.n = function(type) // Returns a new element of the type [type]
    {
    return document.createElement(type);
    }

  this.text = function(c) // Returns a new textnode with the content [c]
    {
    return document.createTextNode(c);
    }

  this.img = function(c) // Returns a new textnode with the content [c]
    {
    if(c)
      {
      var img = new Image();
      img.src = c;
      return img;
      }
    return new Image();
    }

  // Search functions

  this.id = function(type)  // Returns the element with the id [type]
    {
    return document.getElementById(type);
    }

  this.tag = function(type) // Returns the list ob elements with the tag given in [type]
    {
    return document.getElementsByTagName(type);
    }

  this.name = function(type) // Returns the list ob elements with the tag name given in [type]
    {
    return document.getElementsByName(type);
    }

  this.class = function(type) // Returns the list ob elements with the class given in [type]
    {
    return document.getElementsByClassName(type);
    }

  this.findByAttr = function(obj,attr,value) // Returns a list ob elements that have an attribute [attr] with the value [value]
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i][attr] == value)
        {
        list[a] = obj.getElementsByTagName('*')[i];
        a++;
        }
      }
    list['length'] = a;
    return list;
    }

  this.findByInner = function(obj,value) // Returns a list ob elements that contain the value [value]
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i].firstChild)
        {
        if(obj.getElementsByTagName('*')[i].firstChild.data)
          {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1)
            {
            list[a] = obj.getElementsByTagName('*')[i];
            a++;
            }
          }
        }
      }
    list['length'] = a;
    return list;
    }

  this.appendChilds = function(obj)
    {
    for(var i = 1; i < arguments.length; i++)
      arguments[0].appendChild(arguments[i]);
    }

  this.removeChilds = function(obj)
    {
    while(obj.firstChild)
      {
      obj.removeChild(obj.firstChild);
      }
    }

  this.dumpObj = function(e,html,count)
    {
    if(!count)
      count = 0;
    var spaces = '  ';
    for(var i = 0; i < count; i++)
      spaces += '  ';
    if(html)
      n = '<br />\n';
    else
      n = '\n';
    var o = '( '+typeof(e)+' )'+n;
    for(var p in e)
      o+= spaces+p+' = '+'( '+typeof(e[p])+' ) '+(typeof(e[p]) == 'object'?(this.dumpObj(e[p],html,(count+2))):e[p])+n;
    return o;
    }

  this.trim = function(str)
    {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
    }


  // Gets the element (target) of a DOM Mouse Event Object
  // Returns false if there's no element
  this.mouseEventTarget = function(e)
    {
    if(e.target) // Mozilla, Opera, Safari
      return e.target;
    else if (e.srcElement) // IE
      return e.srcElement;
    else // No Target
      return false;
    }



  // Flexible Javascript Events by John Resig (ejohn.org)
  // http://ejohn.org/projects/flexible-javascript-events/
  this.addEvent = function( obj, type, fn )
    {
    if(obj.attachEvent)
      {
      obj['e'+type+fn] = fn;
      obj[type+fn] = function(){obj['e'+type+fn](window.event);}
      obj.attachEvent( 'on'+type, obj[type+fn] );
      }
    else
      obj.addEventListener( type, fn, false );
    }

  this.removeEvent = function( obj, type, fn )
    {
    if(obj.detachEvent)
      {
      obj.detachEvent( 'on'+type, obj[type+fn] );
      obj[type+fn] = null;
      }
    else
      obj.removeEventListener( type, fn, false );
    }



  return true;
  }