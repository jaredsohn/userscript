// ==UserScript==
// @name           LibraryThing Employee Highlighter
// @namespace      http://userscripts.org/users/126691
// @description    Highlights LibraryThing employee postings in the groups
// @include        http://*.librarything.tld/topic/*
// @include        http://*.librarything.tld/talktopic*
// @license        Public Domain
// ==/UserScript==

var userId = document.evaluate("//div[@class='userpad']/a[contains (@href, '/home')]",
        document, null, XPathResult.ANY_UNORDERED_NODE_TYPE,
        null).singleNodeValue;

var setting_heading_color = 'lteh_heading_color';
var setting_border_color = 'lteh_border_color';
var setting_message_color = 'lteh_message_color';
var setting_heading_css = 'lteh_heading_css';
var setting_message_css = 'lteh_message_css';
var setting_heading_disable = 'lteh_disable_heading';
var setting_message_disable = 'lteh_disable_message';


var default_heading_color = '#FFFF9E';
var default_border_color = '#E8E863';
var default_message_color = '#FFFFC1';
var default_heading_css = 'border-width:1px; border-style:solid !important;';
var default_message_css = 'margin-top: -10px; padding-top:20px; padding-right: 10px; padding-left: 1em; border-width:0 1px 1px 1px; border-style:solid';

var headingColor = GM_getValue(setting_heading_color, default_heading_color);
var messageColor = GM_getValue(setting_message_color, default_message_color);
var borderColor = GM_getValue(setting_border_color, default_border_color);
var headingCSS = GM_getValue(setting_heading_css, default_heading_css);
var messageCSS = GM_getValue(setting_message_css, default_message_css);

var div;
var style;
// use the LibraryThing icon to find the employee posts
var elems = document.evaluate('//div/h3[img[@src="/pics/fav-librarything.gif"]]',
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < elems.snapshotLength; i++)
{
  // get the message heading div
  div = elems.snapshotItem(i);
  if (!GM_getValue(setting_heading_disable)) {
    style = div.getAttribute('style');

    if (headingColor)
      style += ';background-color:' + headingColor + ';border-color: ' + borderColor;
    if (headingCSS)
      style += ';' + headingCSS;

    div.setAttribute('style', style);
  }

  // find the message body div
  if (!GM_getValue(setting_message_disable)) {
    div = nextElementSibling(div);
    if (div.tagName == 'DIV') {  // safety check
      style = div.getAttribute('style');

      if (messageColor)
        style += ';background-color:' + messageColor + ';border-color: ' + borderColor;
      if (messageCSS)
        style += ';' + messageCSS;

      div.setAttribute('style', style);
    }
  }
}


function nextElementSibling(node) {
  if (node.nextElementSibling !== undefined)
    return node.nextElementSibling;
  else {
    while (node = node.nextSibling() && node.nodeType != Node.ELEMENT_NODE);
  
    return node;
  }
}

/*************** The following is configuration code ***************/

function createEnterColorMenu(menu, label, key, def) {
  GM_registerMenuCommand(menu,
    function() {
      var regColorcode = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;

      var originalValue = prompt('Enter a new color for the ' + label +
        '.  Colors must be given as html colors, with the # optional.  You can pick a color ' +
        'easily by using the Open HTML Color Picker menu item', GM_getValue(key, def));
      value = originalValue;

      if (value != null) {  // make sure something was entered
        if (value != null && value.charAt(0) != '#')
          value = '#' + value;
        if(!regColorcode.test(value)) {
          alert('The color you entered (' + originalValue + ') is not a valid HTML color.');
          return;
        }
        if (value != GM_getValue(key, def)) {
          if (value != def)
            GM_setValue(key, value);
          else
            GM_deleteValue(key);  // keep it tidy

          window.location.reload();
        }
      }
    }
  );
}

function createEnterCSSMenu(menu, label, key, def) {
  GM_registerMenuCommand(menu,
    function() {
      var value = prompt('Enter the ' + label + ' CSS style to use.  ' +
          'Here you can set additonal styles such as border thicknesses.  ' +
          'Refer to the help on CSS styles for more information on the format.',
          GM_getValue(key, def));

      if (value != null && value != GM_getValue(key, def)) {
        if (value != def)
          GM_setValue(key, value);
        else
          GM_deleteValue(key);  // keep it tidy

        window.location.reload();
      }
    }
  );
}

function createToggleMenuItem(label, key) {
  GM_registerMenuCommand(
    (GM_getValue(key) ? 'Enable' : 'Disable') + ' ' + label,
    function () {
      if (!GM_getValue(key))
        GM_setValue(key, true)
      else // delete false values
        GM_deleteValue(key);

      window.location.reload();
    }
  );
}

function createSpacerMenu() {
  GM_registerMenuCommand('', function(){});
}

createEnterColorMenu('Set Message Heading Color', 'message heading', setting_heading_color, default_heading_color);
createEnterColorMenu('Set Message Body Color', 'message body', setting_message_color, default_message_color);
createEnterColorMenu('Set Message Border Color', 'message border', setting_border_color, default_border_color);

GM_registerMenuCommand('Open HTML Color Picker', function () {
  window.open('http://html-color-codes.info/', '');
});

createSpacerMenu();

createEnterCSSMenu('Set Message Heading CSS', 'message heading', setting_heading_css, default_heading_css);
createEnterCSSMenu('Set Message Body CSS', 'message body', setting_message_css, default_message_css);

createSpacerMenu();

createToggleMenuItem('Message Heading Background', setting_heading_disable);
createToggleMenuItem('Message Body Background', setting_message_disable);

createSpacerMenu();

GM_registerMenuCommand('Reset Message Highlighting Settings', function () {
  GM_deleteValue(setting_heading_color);
  GM_deleteValue(setting_message_color);
  GM_deleteValue(setting_border_color);
  GM_deleteValue(setting_heading_css);
  GM_deleteValue(setting_message_css);
  GM_deleteValue(setting_heading_disable);
  GM_deleteValue(setting_message_disable);

  window.location.reload();
});
