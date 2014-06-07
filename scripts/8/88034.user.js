// ==UserScript==
// @name            Google Reader Colored
// @description     Google Reader Colored colors feeds based on their name, making it more pleasant to look at and easier to pick out specific feeds.
// @author          Michon van Dooren <michon1992@gmail.com>
// @version         0.4.0
// @namespace       -
// @website         http://userscripts.org/scripts/show/88034
// @updateUrl       https://userscripts.org/scripts/source/88034.meta.js
// @include         http://www.google.com/reader/*
// @include         https://www.google.com/reader/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require         http://userscripts.org/scripts/source/93944.user.js
// ==/UserScript==

/*
 * === Changelog ===
 * Version 0.4.0
 *  - Updated it to work with the new layout.
 *  - Made the search box (in the settings page) work with custom ranges.
 *  - Removed the update script. Both scriptish (firefox) and tampermonkey (chrome) have this built in now.
 *  - Updated jquery to 1.7.1 (from 1.3.2).
 *  - Made the custom range selector in the color select hover box (settings page) actually use the custom range instead of the first color in the range.
 *  - Added a select color item to the dropdown menu in the navigation pane.
 *
 * Version 0.3.3
 *  - Ranges now auto-wrap around 360. For example, 359-2 would result in [359, 360, 1, 2] where previously it wouldn't result in anything at all. (This basically saves you from having to add 360 to the last number yourself).
 *
 * Version 0.3.2
 *  - Added an option to store (up to) 6 custom ranges/hues you can use to search/define colors. You can click them using the color select form, or you can use them in searches/bulk recoloring as custom1-custom6.
 *  - Fixed a bug where a hue of 360 was considered to be 0, and would thus cause the color to reset. 
 *
 * Version 0.3.1
 *  - Added an option to only color feeds that have new items in them in the navigation panel.
 *  
 * Version 0.3.0
 *  - Moved a lot of functions to a general script. Nothing should change for you guys, but this makes it easier for me to reuse my code in other projects.
 *
 * Version 0.2.6
 *  - Fixed the script not working with the https version of Google Reader.
 *
 * Version 0.2.5
 *   - Fixed a bug that caused boxes/elements with a colored background (other than white) in the feed contents to lose their background, which made things hard to read at times.
 *   - Added step support to the ranges. The format of a range now is start-end(-step). If not given, step defaults to 1. So, for example, 2-10 would result in [2, 3, 4, 5, 6, 7, 8, 9, 10], and 2-10-2 would result in [2, 4, 6, 8, 10]. Is this useful? For setting colors, it might be. It is for me anyway. For searching, it's pretty much useless, although it does work, if you want to.
 *   - Added support for resetting the color of a feed to default by setting it's color value to 0.
 *
 * Version 0.2.4
 *   - Fixed a bug in the range-generating function that caused ranges in which both numbers were of different length to fail (eg 1-10, 90-100, 9-100, 90-1000, etc).
 *   - Fixed the not coloring of feeds/navs in some cases. (Specifically, in situations where they already had been loaded/added to the page at the moment the page got flagged ready/fully loaded).
 *   - Fixed using the enter button to confirm/save when changin the color for a single feed.
 *   - Added searching for color values (or ranges) using the top-right searchbox (on the settings page).
 *   - Removed the select-by-color link as it is made obsolete by the search function (see above).
 *   - Added color wrapping. Basically, hue 120 == hue 480, except until now they were considered different (when searching). Now any hue over 360 automatically gets wrapped around to 0, so 480 changes into 120, etc. Makes searching for colors that are visually the same/similar more intuitive.
 *
 * Version 0.2.3
 *   - Added proper locale support.
 *   - Added Dutch (nl) locale. 
 *   - General code cleanup and reorganisation. Moved functions around to group them more logically, moved some actions out of the element-generating functions into the setup functions, etc. In other words, boring internal stuff.
 *
 * Version 0.2.2
 *   - Added a select-by-color link to the subscription pane of the settings.
 *   - Did some preparation for possible future localization.
 *   - Moved some functions to convenience function, added some convenience functions.
 *
 * Version 0.2.1
 *   - Fixed a bug that caused all feeds with any non-alphanumeric (including spaces) to not use the stored color.
 *   - Removed a forgotten debug line.
 *
 * Version 0.2.0
 *   - Added support for expanded view.
 *   - Added preferces to:
 *     - Toggle the coloring of items in the navigation menu.
 *     - Toggle the coloring of list view/expanded view.
 *     - Color just the borders instead of the whole feed (for list and expanded view).
 *
 * Version 0.1.1
 *  - Changed the hover behavior in the settings page so both rows of a subscription get highlighted when hovering one.
 *  - Added the automatic script updater. Let's hope it works.
 *  - Added the option to specify multiple colors when batch-recoloring subscriptions.
 *
 * Version 0.1.0
 *   - Initial release.
 */



// =============== Constants. ===============
// Locales.
locales = 
{
  // English.
  en:
  {
    // Preferences.
    header: 'Color Settings',
    colorNav: 'Colorize the navigation panel.',
    colorNavUnreadOnly: 'Only colorize items with unread items in the navigation panel.',
    listView: 'Enable coloring in list view.',
    listViewBordersOnly: 'Only colorize the borders in list view',
    expandedView: 'Enable coloring in expanded view.',
    expandedViewBordersOnly: 'Only colorize the borders in expanded view.',
    customRanges: 'Custom hues/ranges: ',
    customRangesHelp: 'You can use these values when setting colors/searching by using the strings custom1, custom2, etc.',

    // Color selection.
    selectColor: 'Select Color',
    hue: 'Hue',
    noSelection: 'No subscriptions selected.',
    promptHue: 'Enter the hue(s) to set for the selected items.',
    promptSelect: 'Enter the hue(s) to search for.',
    promptRange: 'You can enter multiple values ("18,34") and/or ranges (in the form "begin-end(-step)", eg "18-34" or "18-34-2") to randomly choose from.',
    searchIndicator: 'color',
  },

  // Dutch.
  nl:
  {
    // Preferences.
    header: 'Kleur Instellingen.',
    colorNav: 'Kleur het navigatiepaneel.',
    colorNavUnreadOnly: 'Kleur enkel elementen met ongelezel berichten in het navigatiepaneel.',
    listView: 'Schakel kleuren in voor de lijst weergave.',
    listViewBordersOnly: 'Kleur enkel de randen in de lijst weergave.',
    expandedView: 'Schakel keuren in voor de uitgebreide weergave.',
    expandedViewBordersOnly: 'Kleur enkel de randen in de uitgebreide weergave.',
    customRanges: 'Opgeslagen kleuren/bereiken: ',
    customRangesHelp: 'Deze waarden kunnen in zoekopdrachten/tijdens het kiezen van kleuren gebruikt worden door middel van de tekst custom1, custom2, etc.',

    // Color selection.
    selectColor: 'Kies Kleur',
    hue: 'Tint',
    noSelection: 'Geen abonnementen geselecteerd.',
    promptHue: 'Welke tint(en) wilt u aan deze abonnementen geven?',
    promptSelect: 'Naar welke tint(en) wilt u zoeken?',
    promptRange: 'Het is mogelijk om meerde waarden (in de vorm "18,34") en/of gebieden (in de vorm "start-end(-stap)", bv "18-34" of "18-34-2") aan te geven om een willekeurige selectie uit te maken.',
    searchIndicator: 'kleur',
  },
}

// Base CSS.
baseCSS = '' +
  // CSS for the navigation pane.
  '#nav #sub-tree .sub {' +
    'margin: 0;' +
  '}' + 

  // CSS for the settings page.
  '#subscriptions tr[colored] * {' +
    'background-color: inherit !important;' + 
  '}' +
  '#subscriptions.filtered .filtered-color {' +
    'display: table-row;' +
  '}' +
  
  // Hover form CSS (settings page).
  '.hover-form .color {' +
    'display: inline;' +
    'margin-right: -18px;' +
  '}' +
  '.hover-form .pick {' +
    'background-color: transparent;' +
    'padding: 0;' +
    'border: 0;' +
    'background-position: -64px -32px;' +
  '}' +
  '.hover-form .picker {' +
    'width: 16em;' +
    'position: relative;' +
    'top: -4px;' +
    'margin-right: -18px;' +
    'line-height: 9px;' +
  '}' +
  '.hover-form .picker span {' +
    'display: inline-block;' +
    'height: 12px;' +
  '}' +
  '.hover-form .picker .bar span {' +
    'width: 0.545%;' +
  '}' +
  '.hover-form .picker .favs span {' +
    'width: 15.35%;' +
    'margin-right: 1%;' +
  '}' + 
  '.hover-form .picker .favs5 span {' +
    'width: 18.4%;' + 
  '}' +
  '.hover-form .picker .favs4 span {' +
    'width: 23.3%;' + 
  '}' +
  '.hover-form .picker .favs3 span {' +
    'width: 31.3%;' + 
  '}' +
  '.hover-form .picker .favs2 span {' +
    'width: 47.3%;' + 
  '}' +
  '.hover-form .picker .favs1 span {' +
    'width: 96%;' + 
  '}';

// CSS specific to settings being enabled/disabled.
// Each value is an array in the form of [disabledcss, enabledcss].
settingsCSS =
{
  colorNav: ['' +
    '#nav #sub-tree .sub {' +
      'background-color: transparent !important;' +
    '}',
    ''],
  colorNavUnreadOnly: ['' +
    '',
    '#nav #sub-tree .sub:not(.unread) {' +
      'background-color: transparent !important;' +
    '}'],
  listView: ['' +
    '#entries.list .entry .collapsed' +
    '{' +
      'background-color: transparent !important;' +
      'border-color: transparent !important;' +
    '}', 
    ''],
  listViewBordersOnly: ['' +
    '#entries.list .entry .collapsed' +
    '{' +
      'border-color: transparent !important;' +
    '}', 
    '#entries.list .entry .collapsed' +
    '{' +
      'border-width: 0 12px;' +
      'background-color: transparent !important;' +
    '}'],
  expandedView: ['' +
    '#entries.cards .entry .card' +
    '{' +
      'background-color: transparent !important;' +
    '}',
    '#entries.cards .entry .card .card-bottom' +
    '{' +
      'background-color: inherit !important;' +
    '}'],
  expandedViewBordersOnly: ['' +
    '',
    '#entries.cards .entry .card' +
    '{' +
      'border-width: 2px 12px;' +
      'background-color: transparent !important;' +
    '}'],
}



// =============== Common/shared variables. ===============
common = 
{
  apiname: 'color',
  colors: {},
  styles: {},
  bgColor: null,
  locale: locales['en'],
  settings:  
  {
    // These values are the default values.
    colorNav: false,
    colorNavUnreadOnly: false,
    listView: true,
    listViewBordersOnly: false,
    expandedView: true,
    expandedViewBordersOnly: false,
    customRanges: ['1-60', '61-120', '121-180', '181-240', '241-300', '301-360'],
  },
  settingsConfig:
  {
    customRanges:
    {
      fromString: function(s){ return s.split('|'); },
      toString: function(a){ return a.join('|'); },
      attributes: 
      {
        style: 'width: 50px; margin-top: 2px;',
      }
    },
  },
}



// =============== Convenience functions. ===============
// Converts a given text sequence ("8, 12-16, 38, 90-88", "100-120-5") into an array of numbers ([8, 12, 13, 14, 15, 16, 38, 88, 89, 90, 100, 105, 110, 115, 120]). Also wraps numbers above 360 around to start from 0 again (361 = 1, 375 = 15, etc).
String.prototype.toRange = function()
{
  var array = [];
  var parts = this.split(',');
  var p;

  while ((p = parts.shift())) 
  {
    // Handle ranges.
    if (p.contains('-'))
    {
      var range = p.split('-');
      var begin = parseInt(range.shift()),
          end   = parseInt(range.shift()),
          step  = parseInt(range.shift()) || 1;
      if (isNaN(begin) || isNaN(end))
      {
        continue;
      }
      while (begin > end)
      {
        end += 360;
      }
      for (var i=begin; i<=end; i+=step)
      {
        if ((i.colorWrap() != 0) && (!array.contains(i.colorWrap)))
        {
          array.push(i.colorWrap());
        }
      }
    }

    // Handle single numbers.
    else if (isNumeric(p))
    {
      array.push(parseInt(p).colorWrap());
    }

    // Handle unnamed custom ranges.
    else if (/custom[1-6]/.test(p))
    {
      parts = parts.concat(common.settings.customRanges[parseInt(/custom([0-6])/.exec(p)[1]) - 1].split(':').pop().split(','));
    }

    // Handle named custom ranges.
    else
    {
      for (var i=0; i<6; i++)
      {
        var m = common.settings.customRanges[i].split(':');
        if (m.contains(p))
        {
          parts = parts.concat(m.pop().split(','));
        }
      }
    }
  }

  return array.sort(function(a, b){ return a-b; });
}

// Wrap an integer to not go over 360.
Number.prototype.colorWrap = function()
{
  return (this-1)%360+1;
}

// For some reason jQuery's offset(), position() and offsetParent() all fail at determining the correct position.
function findPos(obj) 
{
  var curLeft = curTop = 0;
  if (obj.offsetParent)
  {
    do
    {
      curLeft += obj.offsetLeft;
      curTop += obj.offsetTop;
    }
    while (obj = obj.offsetParent)
  }
  return {
    left: curLeft, 
    top: curTop
  };
}



// =============== CSS related functions. ===============
// This function is called to retrieve the color tag to use for a feed.
function getFeedColor()
{
  var title = $(this).find('.entry-source-title, .sub-name-text, .subscription-title').html().toTitle();
  if (!(title in common.styles))
  {
    updateFeedCSS(title);
  }
  return title;
}

// Function used to create the css for a feed.
function updateFeedCSS(title)
{
  function part(sel, color)
  {
    selector = '[colored=' + title + ']' + sel
    return '' +
      '#entries .entry' + selector + ' .collapsed, ' + 
      '#entries .entry' + selector + ' .card, ' + 
      '#subscriptions tr' + selector + ', ' +
      '#nav #sub-tree .sub' + selector + ' {' +
        'background-color: ' + color + ';' + 
      '}' +
      '#entries .entry' + selector + ' .collapsed {' + 
        'border-left-color: ' + color + ';' +
        'border-right-color: ' + color + ';' +
      '}' +
      '#entries .entry' + selector + ' .card {' +
        'border-color: ' + color + ';' +
      '}';
  }

  if (title in common.styles)
  {
    $__('style[forfeed=' + title +']').remove();
  }

  var colors = getFeedColors(title);
  common.styles[title] = createCSS('' +
    part('', colors.normal) + 
    part(':hover', colors.hover) +
    part('.hover', colors.hover) // for javascript based hover events.
  );
  $(common.styles[title]).attr('forfeed', title);

  $__('head').append($(common.styles[title]).clone());
}

// This function returns an object with the elemtents hue, normal and hover, for the hue, and the css code for the normal/hover background for a feed.
// Based on the getColorCss function in kepp's script. Credits to him for this.
function getFeedColors(title)
{
  var hue = getFeedHue(title);
  var sat = common.bgColor.sat;
  var lt = common.bgColor.lt;
  var dir = (lt > 50) ? 1 : -1;

  return {
    hue: hue,
    normal: hslToCSS(hue, sat + 7, lt - 5*dir),
    hover: hslToCSS(hue, sat + 27, lt),
  };
}

// Function used to get the hue of a feed.
function getFeedHue(title)
{
  var hue = common.colors[title];
  if (!isNumeric(hue) || !hue)
  {
    hue = getFeedHueFromTitle(title);
  }
  hue = hue.colorWrap();
  common.colors[title] = hue;
  return hue;
}

// Function used to calculate the hue of a feed based on it's name.
function getFeedHueFromTitle(title)
{
  var hue = 0;
  for (var i=0; i<title.length; i++)
  {
    hue += title.charCodeAt(i);
  }
  return hue.colorWrap();
}  

// Wrapper to create a hsl css tag.
function hslToCSS(h, s, l)
{
  if (typeof s == 'undefined')
  {
    s = common.bgColor.sat;
  }
  if (typeof l == 'undefined')
  {
    l = common.bgColor.lt;
  }
  return 'hsl(' + (Math.round(h, 0)) + ', ' + (Math.round(s, 0)) + '%, ' + (Math.round(l, 0)) + '%)';
}

// This function is used to convert a RGB value into a HSL value.
// Based on the rgbToHsl function in kepp's script. Credits to him for this.
function rgbToHsl(rgb)
{
  var color;
  var hue = 0, sat = 0, lt = 0;
  
  if ((color = /rgb\(([0-9]{1,3}), ([0-9]{1,3}), ([0-9]{1,3})\)/.exec(rgb)))
  {
    rgb = [parseInt(color[1]), parseInt(color[2]), parseInt(color[3])];
  }
  else if ((color = /#?(..)(..)(..)/.exec(rgb)))
  {
    rgb = [parseInt(color[1], 16), parseInt(color[2], 16), parseInt(color[3], 16)];
  }

  for (var i=0; i<rgb.length; i++)
  {
    rgb[i] = rgb[i]/255;
  }

  var max = Math.max.apply(Math, rgb);
  var min = Math.min.apply(Math, rgb);
  var chroma = max - min;
  var index = rgb.indexOf(max);
  rgb.splice(index, 1);
  lt = (max + min)/2;

  if (chroma) 
  {
    sat = (lt > 0.5) ? (max - min)/(2 - (max + min)) : (max - min)/(max + min);
    hue = 60 * ((rgb[0] - rgb[1])/(max - min) + index * 2);
  }

  return {
    hue: hue,
    sat: Math.min(Math.max(sat*100, 35), 80),
    lt: Math.min(Math.max(lt*100, 32), 80),
  };
}



// =============== Creating the settings elements. ===============
// Create the color-select hover-form.
function createColorForm() 
{
  var colorForm = document.createElement('form');
  colorForm.className = 'hover-form';
  colorForm.id = 'color-form';
  colorForm.style.display = 'none';
  colorForm.innerHTML = '' +
    '<label>' +
      '<span class="prompt">' + common.locale.hue + ': </span>' +
      '<span id="color-form-name"></span>' +
    '</label>' +
    '<div class="settings-data">' +
      '<input type="text" class="color text" id="color-form-color" />' +
      '<input type="button" class="sharing-icon pick" id="color-form-pick" />' +
    '</div>' +
    '<div class="picker" id="color-form-picker">' +
      '<div class="favs" id="color-form-picker-favs"></div>' + 
      '<div class="bar" id="color-form-picker-bar"></div>' +
    '</div>' +
    '<input type="submit" class="save button" id="color-form-save" value="Save" />' +
    '<input type="button" class="cancel button" id="color-form-cancel" value="Cancel" />';

  var sat = common.bgColor.sat;
  var lt = common.bgColor.lt;
  var dir = (lt > 50) ? 1 : -1;

  // Fill the color picker.
  var bar = $(colorForm).find('#color-form-picker-bar');
  for (var i=2; i<=360; i+=2)
  {
    var picker = document.createElement('span');
    picker.style.backgroundColor = hslToCSS(i, sat+7, lt-5*dir);
    $(picker).data('hue', i)
    $(picker).click(function()
    {
      $(colorForm).find('#color-form-color').val($(this).data('hue'));
      $(colorForm).find('#color-form-color').css('background-color', $(this).css('background-color'));
    });

    bar.append(picker);
  }
  
  var favs = $(colorForm).find('#color-form-picker-favs');
  for (var i=0; i<6; i++)
  {
    if (common.settings.customRanges[i] != '')
    {
      var block = document.createElement('span');
      cust = common.settings.customRanges[i].split(':')
      hue = cust.pop().toRange()[0];
      block.style.background = hslToCSS(hue, sat+7, lt-5*dir);
      block.title = cust.join(', ');
      cust.push('custom' + (i + 1));
      $(block).data('hue', cust[0]);
      $(block).click(function()
      {
        $(colorForm).find('#color-form-color').val($(this).data('hue'));
        $(colorForm).find('#color-form-color').css('background-color', $(this).css('background-color'));
      });

      favs.append(block);
    }
    else
    {
      $(colorForm).find('#color-form-picker-favs').addClass('favs' + i);
      break;
    }
  }

  // Bind the functions to the form buttons.
  $(colorForm).submit(function(e)
  {
    // Hide the form.
    $_('#color-form').hide();

    // Get the title of the subscription.
    var title = $_('#color-form-name').text().toTitle();

    // Get the hue.
    var hue = $_('#color-form-color').val();

    // Update the feed color.
    setFeedColor(title, hue);
  
    // Stop the default action.
    e.preventDefault();
  });
  $(colorForm).find('#color-form-cancel').click(function()
  {
    $_('#color-form').hide();
  });
  $(colorForm).find('#color-form-color').keyup(function()
  {
    if (isNumeric($(this).val()))
    {
      $(this).css('background-color', hslToCSS($(this).val()));
    }
  });
  $(colorForm).find('#color-form-pick').click(function()
  {
    $_('#color-form-picker').toggle();
  });
  
  return colorForm;
}

// Create the bulk color-edit button.
function createBulkButton()
{
  var bulkButton = document.createElement('input');
  bulkButton.type = 'button';
  bulkButton.value = common.locale.selectColor;
  $(bulkButton).click(function()
  {
    if (!$_('#subscriptions tr[colored] .chkbox').is(':checked'))
    {
      alert(common.locale.noSelection);
    }
    else
    {
      var hue = prompt(common.locale.promptHue + '\n' + common.locale.promptRange);
      if (!hue)
      {
        return;
      }

      var hues = hue.toRange();
      $_('#subscriptions tr[colored] .chkbox:checked').parent().parent().each(function()
      {
        var title = $(this).attr('colored');
        setFeedColor(title, hues[getFeedHueFromTitle(title)%hues.length]);
      });
    }
  });

  return bulkButton;
}

// Set up searching for color values.
function setupColorSearch()
{
  // Add a handler to the search box to implement searching for color values.
  $_('#subs-filter-input').keyup(function()
  {
    // Get the hues to search for.
    var hues = $(this).val().toRange();

    // Search for the hues.
    $_('#subscriptions tr[colored]').each(function()
    {
      if (hues.contains(common.colors[$(this).attr('colored')]))
      {
        $(this).addClass('filtered-color');
      }
      else 
      {
        $(this).removeClass('filtered-color');
        $(this).removeAttr('checked');
      }
    });

    // Trigger the counting.  
    $_('#subs-total').trigger('DOMNodeInserted');
  });

  // Add text indicating this option to the text below the search box ("Filter by....").
  $_('#other-bulk-actions .subs-filter .subs-filter-prompt').each(function()
  {
    var match = /(.*, )(.*)/.exec($(this).text());
    $(this).text(match[1] + common.locale.searchIndicator + ' ' + match[2]);
  });

  // Bind an event to the matching-subscription-counter to make it display the correct number with the search for color option as well.
  $_('#subs-total').bind('DOMNodeInserted', function()
  {
    var newCount = $_('#subscriptions tr[colored].data-row').filter('.filtered-data, .filtered-color').length;
    var oldCount = /([0-9]*)/.exec($(this).text())[1];
    if (newCount != oldCount && oldCount != '')
    {
      $(this).text(newCount + ' ');
    }  
  });

  // Bind an event to the select all * subscriptions to make it work with the search for color option.
  // This event is bound to the parent of the link instead of the link itself so all google's event handlers will have run already when this gets called, otherwise google's event handlers will deselect what we select here.
  $_('#main-bulk-actions').click(function(e)
  {
    // Check if the select all link was the one that was clicked.
    if ($(e.target).closest('.subs-select-all').length)
    {
      $_('#subscriptions tr[colored].data-row').filter('.filtered-data, .filtered-color').find('.chkbox').attr('checked', 'checked');
    }
  });
}


// =============== Color Form related. ==============
// Display the select-color form, with the right values for the selected feed loaded.
function colorFormShow() 
{
  // Show the form and move it to the clicked link.
  $_('#color-form').show();
  $_('#color-form').css(findPos(this));

  // Get the title of the subscription and store it in the form.
  var title = $(this).parent().parent().find('.subscription-title').text().unescapeHTML();
  $_('#color-form-name').text(title);

  // Get the color of this subscription, and fill it in in the form.
  var hue = getFeedHue(title.toTitle());
  $_('#color-form-color').val(hue);
  $_('#color-form-color').css('background-color', hslToCSS(hue));
}



// =============== Setting modification wrappers. ===============
// Change a setting.
function _setSetting(name, value)
{
}

// Set the color of a feed.
function setFeedColor(title, color) 
{
  color = (parseInt(color) || 0).colorWrap();
  GM_setValue("color:" + title, color);
  common.colors[title] = color;
  updateFeedCSS(title);
}



// =============== Setup functions. ===============
// Main page setup.
function setup()
{
  // Load all colors.
  var variables = GM_listValues();
  for (var key in variables)
  {
    var name = variables[key].split(':');
    var pref = name[0],
        name = name[1];
    if (pref == 'color')
    {
      common.colors[name] = GM_getValue('color:' + name);
    }
  }

  // Get the bgColor.
  common.bgColor = rgbToHsl($('body').css('background-color'));

  // Add some event handlers.
  $('#entries').bind('DOMNodeInserted', function()
  { 
    $('#entries .entry:not([colored])').attr('colored', getFeedColor);
  });
  $('#nav #sub-tree').bind('DOMNodeInserted', function()
  {
    $('#nav #sub-tree .sub:not([colored])').attr('colored', getFeedColor);
  });

  // Color any items that may already exist at this point. 
  $('#entries .entry:not([colored]), #nav #sub-tree .sub:not([colored])').attr('colored', getFeedColor);
  // Doesn't work for some reason?
  //$('#entries, #nav #sub-tree').trigger('DOMNodeInserted');
  
  // Bind an event to add a "Select Color" menu item to the menu's in the navigation panel.
  $('#nav #sub-tree .sub .goog-menu-button').click(function()
  {
    // Get the feed name.
    var feed = $(this).parents('.sub').attr('colored');

    // Find the menu, and clear old items.
    var menu = $('.goog-menu.subscription-folders-menu:visible');
    $(menu).find('.color').remove();
    
    // Find the rename item.
    var renameItem = $(menu).children()[5];

    // Clone the rename item, and make the needed edits.
    var colorItem = $(renameItem).clone();
    $(colorItem).children().html(common.locale.selectColor);
    $(colorItem).attr('id', $(colorItem).attr('id') + 'a');
    $(colorItem).addClass('color');
    $(colorItem).data('feed', feed);
    $(colorItem).hover(function()
    {
      $(this).addClass('goog-menuitem-highlight');
    }, function()
    {
      $(this).removeClass('goog-menuitem-highlight');
    });
    $(colorItem).bind('click', function()
    {
      var hue = prompt(common.locale.promptHue + '\n' + common.locale.promptRange);
      if (!hue)
      {
        return;
      }

      var hues = hue.toRange();
      var title = $(this).data('feed');
      setFeedColor(title, hues[getFeedHueFromTitle(title)%hues.length]);
    });

    // Insert the color item.
    $(renameItem).after(colorItem);
  });
}

// Setings page setup.
function setupSettings()
{
  // Add colorized tags to all subscriptions.
  $_('#subscriptions .data-row').attr('colored', getFeedColor);
  $_('#subscriptions .feed-row').attr('colored', function()
  {
    return $(this).prev().attr('colored');
  });
  $_('#subscriptions tr[colored]').hover(function()
  {
    $_('[colored=' + $(this).attr('colored') + ']').addClass('hover');
  }, function()
  {
    $_('[colored=' + $(this).attr('colored') + ']').removeClass('hover');
  });

  // Add the CSS.
  $_('head').append($('style[forfeed]').clone());

    // Add the bulk-actions for subscriptions.
  $_('#main-bulk-actions').append(createBulkButton());

  // Add the select-color form.
  $_('body').append(createColorForm());

  // Setup searching for colors using the top-right search box.
  setupColorSearch();

  // Create a new 'link' to show the color selection form.
  var colorLink = document.createElement('span');
  $(colorLink).addClass('color-link');
  $(colorLink).addClass('link');
  $(colorLink).html(common.locale.selectColor);

  // Add a "Select color" link.
  $_('#subscriptions .data-row .rename').attr('rowspan', 2);
  $_('#subscriptions .data-row .rename').append(document.createElement('br'));
  $_('#subscriptions .data-row .rename').append(colorLink);
  $_('#subscriptions .data-row .rename .color-link').click(colorFormShow);
}

// vim: expandtab sw=2
