// ==UserScript==

// @name           Textarea Replace

// @namespace      http://yurikhan.livejournal.com/

// @description    Adds Indent/Unindent to textareas.

// ==/UserScript==
 function dump(x)
 {
   var result = '';
   switch (typeof(x))
   {
     case 'object':
     {
       for (var i in x)
       {
         result += i + ' => ' + (typeof(x[i]) == 'function' ? 'function' : typeof(x[i]) == 'string' ? 'string' : x[i]) + '; ';
       }
       return result;
     }
     case 'function': return 'function';
     default: return x.toString();
   }
 }

function textarea_transform_selection(textarea, func)
{
  var scrollTop = textarea.scrollTop;
  var scrollLeft = textarea.scrollLeft;

  var value = textarea.value;
  var before = value.substring(0, textarea.selectionStart);
  var text = value.substring(textarea.selectionStart, textarea.selectionEnd);
  var after = value.substring(textarea.selectionEnd);

  text = func.call(textarea, text);
  if (text instanceof Array)
  {
    textarea.value = before + text[0] + after;
    switch (text.length)
    {
    case 2:
      textarea.setSelectionRange(before.length + text[1], before.length + text[1]);
      break;
    case 3:
      textarea.setSelectionRange(before.length + text[1], 
        before.length + text[0].length - text[2]);
      break;
    }
  }
  else
  {
    textarea.value = before + text + after;
    textarea.setSelectionRange(before.length, 
      before.length + text.length);
  }

  textarea.scrollLeft = scrollLeft;
  textarea.scrollTop = scrollTop;
}

function textarea_replace(textarea, what, withWhat)
{
  textarea_transform_selection(textarea, function (text)
  {
    return text.replace(what, withWhat);
  });
}

function textarea_unindent(textarea)
{
  textarea_replace(textarea, /^ /gm, '');
}

function textarea_indent(textarea)
{
  textarea_replace(textarea, /^(?!$)/gm, ' ');
}

function textarea_enclose(textarea, brackets)
{
  textarea_transform_selection(textarea, function (text)
  {
    return [brackets[0] + text + brackets[1],
      brackets[0].length, brackets[1].length];
  });
}

function do_replace(text)
{
  var pattern = window.prompt('Find what:', GM_getValue('lastPattern', ''));
  if (pattern === null) return text;

  var replacement = window.prompt('Replace ' + pattern + ' with:', GM_getValue('lastReplacement', ''));
  if (replacement === null) return text;

  GM_setValue('lastPattern', pattern);
  GM_setValue('lastReplacement', replacement);

  return text.replace(pattern, replacement, 'g');
}
function do_replace_regexp(text)
{
  var pattern = window.prompt('Find what:', GM_getValue('lastRegexp', ''));
  if (pattern === null) return text;

  var flags = window.prompt('Flags:', GM_getValue('lastRegexpFlags', 'gim'));
  if (flags === null) return text;

  var replacement = window.prompt('Replace /' + pattern + '/' + flags + ' with:', GM_getValue('lastRegexpReplacement', ''));
  if (replacement === null) return text;

  GM_setValue('lastRegexp', pattern);
  GM_setValue('lastRegexpFlags', flags);
  GM_setValue('lastRegexpReplacement', replacement);

  return text.replace(RegExp(pattern, flags), replacement);
}

function html(tagname) { return ['<' + tagname + '>', '</' + tagname + '>']; }
function bbcode(tagname) { return ['[' + tagname + ']', '[/' + tagname + ']']; }
function regexp(pattern, replacement)
{
  return function(text)
  {
    return text.replace(pattern, replacement);
  };
}

var markups =
{
  base:
  {
    unindent: regexp(/^ /gm, ''),
    indent: regexp(/^(?!$)/gm, ' '),
    replace: do_replace,
    replace_regexp: do_replace_regexp,
    rtrim: regexp(/ +$/gm, ''),
  },
  html:
  {
    quote: html('blockquote')
  },
  bbcode:
  {
    quote: bbcode('quote')
  },
  plaintext:
  {
    quote: regexp(/^/gm, '>')
  },
};

function get_action(actionName)
{
  return markups[GM_getValue('markup', 'html')][actionName]
      || markups['base'][actionName];
}

function apply_markup(textarea, actionName)
{
  var action = get_action(actionName);
  if (action instanceof Function)
  {
    textarea_transform_selection(textarea, action);
  }
  else if (action instanceof Array)
  {
    textarea_enclose(textarea, action);
  }
}

var markup_map =
{
  'M--' : 'unindent',
  'M-=' : 'indent',
  'M-q' : 'quote',
  'M-S-q' : 'inline_quote',
  'M-a' : 'about',
  'M-b' : 'bib',
  'M-C-b' : 'bibs',
  'M-k' : 'link',
  'M-l' : 'item',
  'M-o' : 'ordered_list',
  'M-u' : 'unordered_list',
  'M-C-m' : 'minilist',
  'M-p' : 'para',
  'M-v' : 'var',
  'M-r' : 'ref',
  'M-C-r' : 'reflist',
  'M-S-[' : 'transclude',
  'M-S-]' : 'subst',
  'M-C-i' : 'refitem',
  'M-\\' : 'source',
  'C-\\' : 'code',
  'M-S-\\' : 'rtrim',
  'C-i' : 'italic',
  'C-b' : 'bold',
  'C-h' : 'replace',
  'C-S-h' : 'replace_regexp',

  'M-Scroll' : 'dump1',
};

var keyLabels =
{
  '8' : 'BS',
  '9' : 'Tab',
  '12' : 'Center',
  '13' : 'CR',
  '19' : 'Pause',
  '20' : 'Caps',
  '27' : 'Esc',

  '33' : 'PgUp',
  '34' : 'PgDn',
  '35' : 'End',
  '36' : 'Home',
  '37' : 'Left',
  '38' : 'Up',
  '39' : 'Right',
  '40' : 'Down',

  '45' : 'Ins',
  '46' : 'Del',


  '48' : '0',
  '49' : '1',
  '50' : '2',
  '51' : '3',
  '52' : '4',
  '53' : '5',
  '54' : '6',
  '55' : '7',
  '56' : '8',
  '57' : '9',
  '59' : ';',
  
  '65' : 'a',
  '66' : 'b',
  '67' : 'c',
  '68' : 'd',
  '69' : 'e',
  '70' : 'f',
  '71' : 'g',
  '72' : 'h',
  '73' : 'i',
  '74' : 'j',
  '75' : 'k',
  '76' : 'l',
  '77' : 'm',
  '78' : 'n',
  '79' : 'o',
  '80' : 'p',
  '81' : 'q',
  '82' : 'r',
  '83' : 's',
  '84' : 't',
  '85' : 'u',
  '86' : 'v',
  '87' : 'w',
  '88' : 'x',
  '89' : 'y',
  '90' : 'z',
  '91' : 'Win',
  '93' : 'Menu',

  '106' : 'Gray*',
  '107' : '=',
  '109' : '-',

  '111' : 'Gray/',
  '112' : 'F1',
  '113' : 'F2',
  '114' : 'F3',
  '115' : 'F4',
  '116' : 'F5',
  '117' : 'F6',
  '118' : 'F7',
  '119' : 'F8',
  '120' : 'F9',
  '121' : 'F10',
  '122' : 'F11',
  '123' : 'F12',

  '144' : 'Num',
  '145' : 'Scroll',


  '188' : ',',
  '190' : '.',
  '191' : '/',
  '192' : '`',

  '219' : '[',
  '220' : '\\',
  '221' : ']',
  '222' : '\'',

};

function textarea_keydown(event)
{
  // window.status = event.keyCode;

  var keyName =
    (event.altKey ? 'M-' : '') +
    (event.ctrlKey ? 'C-' : '') +
    (event.shiftKey ? 'S-' : '') +
    keyLabels[event.keyCode];

  var actionName = markup_map[keyName];
  if (actionName)
  {
    GM_log(actionName);
    apply_markup(this, actionName);
    event.preventDefault();
    event.stopPropagation();
  }
  else if (keyName == 'C-Up')
  {
    this.scrollTop = this.scrollTop - parseInt(window.getComputedStyle(this, '').getPropertyValue('line-height'));
  }
  else if (keyName == 'C-Down')
  {
    this.scrollTop = this.scrollTop + parseInt(window.getComputedStyle(this, '').getPropertyValue('line-height'));
  }
}

function textarea_change(event)
{
  alert('change');
  window.status = 'changed ' + this.value.length;
}

function nodelist_foreach(nodelist, action)
{
  for (var i = 0; i < nodelist.length; ++i)
  {
    action(nodelist[i]);
  }
}

nodelist_foreach(document.getElementsByTagName('textarea'), function(textarea)
{
  textarea.addEventListener('keydown', textarea_keydown, true);
  textarea.addEventListener('ValueChange', textarea_change, true);
});


function register_markup(userFriendlyName, internalName)
{
  GM_registerMenuCommand('Markup: ' + userFriendlyName, 
    function ()
    {
      GM_setValue('markup', internalName);
    });
}
register_markup('HTML', 'html');
register_markup('BBCode', 'bbcode');
register_markup('Plain text', 'plaintext');
