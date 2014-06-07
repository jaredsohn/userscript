// ==UserScript==
// @name          Travian Reply Pattern
// @author        C1B1SE
// @namespace     c1b1.de
// @include       http://*.travian.*/nachrichten.php
// ==/UserScript==


/*

travian.replyPattern.user.js



###################################################


Version 1.1


Travian Reply Pattern

(c) 2009 by c1b1.de
         info@c1b1.de
         http://c1b1.de

###################################################


All Content by c1b1.de
Please do not distribute this script without this header.


##################### License #####################

Shared under the 'Creative Commons Attribution-Noncommercial 3.0 United States' License:

http://creativecommons.org/licenses/by-nc/3.0/us/legalcode

THE WORK IS PROVIDED UNDER THE TERMS OF THIS CREATIVE COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE").
THE WORK IS PROTECTED BY COPYRIGHT AND/OR OTHER APPLICABLE LAW.
ANY USE OF THE WORK OTHER THAN AS AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.

BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE TO BE BOUND BY THE TERMS OF THIS LICENSE.
TO THE EXTENT THIS LICENSE MAY BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND CONDITIONS.
*/


//############################## Common Functions ##############################

function $(id) { return document.getElementById(id); };
function t(str) { return document.createTextNode(str); };
function n(type,attrs,evt,html,args)
  {
  var e = document.createElement(type);
  if(attrs)
    for(var attr in attrs)
      if(attr == 'style' && typeof(attrs[attr]) == 'object')
        for(var property in attrs[attr])
          e.style[property] = attrs[attr][property];
      else
        e.setAttribute(attr,attrs[attr]);
  if(evt)
    e.addEventListener(evt[0],evt[1],evt[2]);
  if(html)
    e.innerHTML = html;
  if(html === false)
    for(var i = 4; i < arguments.length; i++)
      if(!arguments[i].nodeType)
        e.appendChild(document.createTextNode(arguments[i]));
      else
        e.appendChild(arguments[i]);
  return e;
  }

//############################## Special Functions ##############################

// void addPattern(String prefix, String suffix);
function addPattern(prefix,suffix)
  {
  var textarea = $('igm');

  textarea.insertBefore(t(suffix),textarea.firstChild);

  textarea.insertBefore(t(prefix),textarea.firstChild);

  var len = prefix.length - 2;

  textarea.focus();
  textarea.selectionStart = len;
  textarea.selectionEnd = len;
  }

// String eval_prompt(String str)
function eval_prompt(str)
  {
  str = str.replace(/\\n/g,'\n');
  return str;
  }

// Boolean selfConfig(MouseEvent e)
function selfConfig(e)
  {
  // prefix
  if(typeof(GM_getValue('prefix')) == 'undefined')
    {
    var prefix = prompt('Prefix:\n(Use \\n for newline)','Hi.') || 'Hi.';
    }
  else
    {
    var prefix = prompt('Prefix:\n(Use \\n for newline)',GM_getValue('prefix')) || 'Hi.';
    }
  GM_setValue('prefix',prefix);

  // suffix
  if(typeof(GM_getValue('suffix')) == 'undefined')
    {
    var suffix = prompt('Suffix:\n(Use \\n for newline)','Regards\\nNick\\nLeader YourAlliance') || 'Regards\\nNick\\nLeader YourAlliance';
    }
  else
    {
    var suffix = prompt('Suffix:\n(Use \\n for newline)',GM_getValue('suffix')) || 'Regards\\nNick\\nLeader YourAlliance';
    }
  GM_setValue('suffix',suffix);

  alert('Done!');
  }




//############################## Procedural Code ##############################


if($('textmenu').getElementsByTagName('a')[1].getAttribute('class') == 'selected' && $('igm').firstChild)
  {
  // Prefix
  if(typeof(GM_getValue('prefix')) == 'undefined')
    {
    var prefix = prompt('Prefix:\n(Use \\n for newline)','Hi.') || 'Hi.';
    GM_setValue('prefix',prefix);
    }
  else
    {
    var prefix = GM_getValue('prefix');
    }
  // Suffix
  if(typeof(GM_getValue('suffix')) == 'undefined')
    {
    var suffix = prompt('Suffix:\n(Use \\n for newline)','Regards\\nNick\\nLeader YourAlliance') || 'Regards\\nNick\\nLeader YourAlliance';
    GM_setValue('suffix',suffix);
    }
  else
    {
    var suffix = GM_getValue('suffix');
    }

  prefix = eval_prompt(prefix);
  suffix = eval_prompt(suffix);

  prefix += '\n\n\n\n';
  suffix += '\n';


  addPattern(prefix,suffix);

  // Config Link:
  var a = $('btn_send').parentNode.appendChild(n('a',{'href':'#','title':'Travian Reply Pattern by c1b1.de - Configuration','style':'font-size:smaller;'},['click',selfConfig,false],false,'Reply Pattern'));
  }