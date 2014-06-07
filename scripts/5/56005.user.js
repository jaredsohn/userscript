// ==UserScript==
// @name           Scrabulizer: Shuffle Rack Tiles
// @namespace      http://scrabulizer.com
// @description    Shuffles the tiles in the Scrabulizer.com rack.
// @include        http://www.scrabulizer.com/
// @include        http://www.scrabulizer.com/?*
// @version        1.0.0
// @license        Creative Commons Attribution-Non-Commercial-Share Alike 2.0 UK: England & Wales Licence
// ==/UserScript==

(function() 
{
  function getActions()
  {
    var sidebarContent = document.getElementById('sidebarContent');
    var uls = sidebarContent.getElementsByTagName('ul');
    
    for (var i = uls.length - 1; i >= 0; i--)
    {
      if (new RegExp('(^|\\s)actions(\\s|$)').test(uls[i].className))
      {
        return uls[i];
      }
    }
    
    throw 'Could not find actions list';  
  }

  function createButton()
  {
    var actions = getActions();
    
    var a = document.createElement('a');
    a.setAttribute('onclick', 'return false;');
    a.setAttribute('href', '#');
    a.textContent = 'Shuffle Rack';
    a.className = 'constructive';
    
    var li = document.createElement('li');
    li.appendChild(a);
    actions.appendChild(li);
    
    a.addEventListener('click', shuffleRack, false);
  }
  
  function shuffleRack()
  {
    var max = 7;
    
    while (max >= 0)
    {
      var rack = rackElement(max);
            
      if (rack.style.display != 'none' && rack.value != '')
      {
        break;
      }
      
      max--;
    }
    
    var rack = new Array(max + 1);
    
    for (var i = 0; i <= max; i++)
    {
      rack[i] = rackElement(i).value;
    }
    
    var n = max + 1;

    while (n > 1)
    {
      var k = Math.floor(Math.random() * n);
      n--;
      
      var rackK = rackElement(k);      
      var rackN = rackElement(n);
      
      var tmp = rack[k];
      rack[k] = rack[n];
      rack[n] = tmp;
    }
    
    for (var i = 0; i <= max; i++)
    {
      fireKeyUp(rackElement(i), rack[i]);
    }
  }
  
  function rackElement(n)
  {
    return document.getElementById('rack_' + n);
  }
  
  function fireKeyUp(rack, value)
  {
    var charCode = value.charCodeAt(0);
    var evt = document.createEvent('KeyboardEvent');
    evt.initKeyEvent('keyup', true, true, null, false, false, false, false, charCode, charCode);
    rack.dispatchEvent(evt);
  }
  
  createButton();
})();