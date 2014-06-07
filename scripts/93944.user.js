// ==UserScript==
// @name            MaienM's Google Reader API
// @namespace       -
// @description     Functions used by some of my scripts, which I decided to bundle into a script for easy maintenance. There is no reason to download this, as it's included in the scripts that need it.
// @exclude         *
// ==/UserScript==

/*
 *  All scripts using this api are expected to specify the following variables:
 *    common                  A global wrapper used to minimize the polution of the global namespace.
 *    common.apiname          A name to use for this script in id's for generated page elements. Short, no spaces. 
 *    common.settings         Name: value pairs for all settings this script has. The specified values are the default values.
 *    common.locale           Name: description pairs for all settings in common.settings. 
 *    locales                 Name: locale pairs for all existing locales. At the very least, there should be a locale for 'en' (English).
 *
 *  And the following functions:
 *    setup                   ()
 *                            Called when the page has finished loading.
 *    setupSettings           ()
 *                            Called when the setup page is opened. Due to the way of Google Reader opens the settings page, this function may be called multiple times in one session.
 *    _setSetting             (name, value)
 *                            Called when a setting is changed through the setSetting(name, value) function (which is the prefered way to change settings).
 *
 *  Furthermore the following optional variables are used:
 *    common.settingsConfig   Name: config pairs for all settings that somehow require custom settings. Valid config options are:
 *      toString              (value)
 *                            Calles to convert the value to a string. Needed to be able to save non-string/number/boolean values (like an array).
 *      fromString            (string)
 *                            Called to convert the value from a string to whatever it should be. Called whenever the variable is loaded.
 *      attributes            An array of attributes that the input element(s) should receive.
 *    settingsCSS             Name: [disabledCSS, enabledCSS] pairs for all boolean settings that simply rely on a different piece of CSS being present. The CSS will only be inserted on the normal reader ui, not on the settings page.
 *    baseCSS                 Core CSS that will be present at both the settings page and the normal reader ui.
 */


// =============== String functions. ===============
// Replaces all non-alphanumeric characters with '_'. 
String.prototype.toTitle = function()
{
  return this.unescapeHTML().replace(/\W/g, '_');
}
// Unescapes escaped html stuff (&amp; = &, &lt; = <, etc).
String.prototype.unescapeHTML = function() 
{
  var temp = document.createElement("div");
  temp.innerHTML = this;
  var result = temp.childNodes[0].nodeValue;
  return result;
} 
// Check whether a string is in another string.
String.prototype.contains = function(text)
{
  return this.search(text) >= 0;
}
// Check whether a string starts with another string.
String.prototype.startsWith = function(text)
{
  return this.search(text) == 0;
}

// =============== Array functions. ===============
// Check if an array contains an element/a value.
Array.prototype.contains = function(value)
{
  for (var i in this)
  {
    if (this[i] == value)
    {
      return true;
    }
  }
  return false;
}

// =============== JQuery wrappers. ===============
// Behaves just like $ (mostly), except from within the settings iframe.
function $_(arg)
{
  return $('#settings-frame').contents().find(arg);
}

// A combination of $ and $_, working both inside and outside of the iframe.
function $__(arg)
{
  return $_(arg).add(arg);
}

// =============== Other functions. ===============
// Checks whether a string/value is a number. isNaN considers an empty string ('') a number, so we need this.
function isNumeric(val)
{
  return !isNaN(parseInt(val));
}

// Creates a style object, sets the css, and returns it.
function createCSS(css)
{
  var style = document.createElement('style');
  style.type = 'text/css';
  style.textContent = css;
  return style;
}


// =============== Creating the settings elements. ===============
// Generate the general preferences part.
function createPreferences()
{
  var prefContainer = document.createElement('div');
  prefContainer.className = 'extra';
  prefContainer.id = common.apiname + '-settings';
  prefContainer.innerHTML = '<div class="extra-header">' + common.locale.header + '</div>';

  for (var name in common.settings)
  {
    if (common.locale[name])
    {
      $(prefContainer).append(createPreferenceElement(name));
    }
  }

  return prefContainer;
}

// Generate a preference element.
function createPreferenceElement(name)
{
  // Create a span element to contain the whole line.
  var span = document.createElement('span');
  span.className = 'settings-data';

  // Create the label.
  var label = document.createElement('label');
  $(span).append(label);
  $(label).text(common.locale[name]);

  // Create the input element.
  switch (typeof(common.settings[name]))
  {
    case 'boolean':
      var input = createInputElement('boolean', name);
      $(label).prepend(input);
    break;

    case 'string':
      var input = createInputElement('string', name);
      $(label).append(input);
    break;      

    case 'object':
      var s = common.settingsConfig[name]
      var id = common.apiname + '-settings-' + name + '-';
      for (var i = 0; i < common.settings[name].length; i++)
      {
        var getter = (function(n)
        {
          return function() 
          {
            return common.settings[name][n];
          }
        })(i);
        var setter = (function(n)
        { 
          return function(v)
          {
            common.settings[name][n] = v;
            GM_log('setting ' + name + ' ' + n + ' to ' + v);
            setSetting(name, common.settings[name]);
          }
        })(i);
        $(span).append(createInputElement(typeof(common.settings[name][i]), name, i, getter, setter));
      }
    break;

    default:
      GM_log('Unknown type, don\'t know how to handle this: ' + typeof(common.settings[name]));
  }

  // Check if there is a help text for this setting. If there is one, we'll add it as mouseover text, and we'll append an icon to indicate the help text is available.
  if (common.locale[name + 'Help'])
  {
    span.title = common.locale[name + 'Help'];
    var icon = document.createElement('input');
    $(icon).attr(
    {
      class: 'sharing-icon',
      type: 'button',
      style: 'background-position: -48px -64px; border: 0; padding: 0; margin-left: 2px;',
    });
    $(span).append(icon);
  }

  // Add a newline to the span.
  $(span).append(document.createElement('br'));

  return span;
}

function createInputElement(type, name, postf, getter, setter)
{
  // Create the input element.
  var input = document.createElement('input');
  var vname = name;
  if (typeof postf != 'undefined' && postf != '')
  {
    vname += '-' + postf;
  }
  var id = common.apiname + '-settings-' + vname;
  $(input).attr(
  {
    id: id,
    name: vname,
  });

  // Apply the custom attributes specified in the settingsConfig, if any.
  if (common.settingsConfig && common.settingsConfig[name] && common.settingsConfig[name].attributes)
  {
    $(input).attr(common.settingsConfig[name].attributes);
  }

  // Define default getters/setters if needed.
  if (typeof getter == 'undefined')
  {
    getter = function(){ return common.settings[name]; }
  }
  if (typeof setter == 'undefined')
  {
    setter = function(v){ setSetting(name, v); }
  }

  switch (type)
  {
    case 'boolean':
      $(input).attr(
      {
        type: 'checkbox',
        checked: getter(),
      });
      
      // Bind a toggle event to the input to store the settings when they change.
      $(input).change(function()
      {
        var name = $(this).attr('name');
        var value = $_('#' + id + ':checked').val() == 'on' && true || false;
        setter(value);
      });
    break;

    case 'string':
      $(input).attr(
      {
        type: 'text',
        value: getter(),
      });

      // Bind a change event to the input to store the settings when they change.
      $(input).change(function()
      {
        var value = $_('#' + id).val();
        setter(value);
      });
    break;

    default:
      GM_log('unknown type, don\'t know how to create an input element for this: ' + type);
  }

  return input;
}

function setSetting(name, value)
{
  common.settings[name] = value;
  var val = value;
  if (common.settingsConfig && common.settingsConfig[name] && common.settingsConfig[name].toString)
  {
    val = common.settingsConfig[name].toString(val);
  }
  GM_setValue('settings:' + name, val);

  $('style[forsetting=' + name + ']').remove();
  if (settingsCSS[name] && settingsCSS[name][value * 1])
  {
    var style = createCSS(settingsCSS[name][value * 1]);
    $(style).attr('forsetting', name);
    $('head').append(style);
  }
 
  $_('#' + common.apiname + '-settings input[name^="' + name + '"][name!="' + name + '"]').each(function()
  {
    if (value)
    {
      $(this).removeAttr('disabled');
    }
    else
    {
      $(this).attr('disabled', 'disabled');
    }
  });

  _setSetting(name, value)
}

// =============== Setup functions. ===============
// Main page setup.
function _setup()
{
  // Load all settings.
  var variables = GM_listValues();
  for (var i=0; i<variables.length; i++)
  {
    var name = variables[i].split(':');
    var pref = name[0],
        name = name[1];
    if (pref == 'settings')
    {
      common.settings[name] = GM_getValue('settings:' + name);
      if (common.settingsConfig && common.settingsConfig[name] && common.settingsConfig[name].fromString)
      {
        common.settings[name] = common.settingsConfig[name].fromString(common.settings[name]);
      }
    }
  }

  var process = 'processed-' + common.apiname;

  // Bind the ready handler for the settings page.
  $('body').bind('DOMNodeInserted', function()
  {
    $('#settings-frame:not([' + process + '])').each(function()
    {
      $(this).attr(process, 'yes');
      $(this).load(_setupSettings);
      // Prevent hiding of additional settings if more than ~7 additional settings (or even less if they belong to multiple scripts) are present.
      $(this).css({
      'overflow': 'visible',
      'height':   '100%',
      });
    });
  });
  
  // If the baseCSS is specified, add it.
  if (baseCSS)
  {
    $('head').append(createCSS(baseCSS));
  }
  
  // Apply all settings.
  for (var name in common.settings)
  {
    setSetting(name, common.settings[name]);
  }

  // Run the script-specific setup function.
  setup();
}

function _setupSettings()
{
  // Determine the locale.
  var locale = $_('#locale option:selected').attr('value');
  locale = (locale in locales && locale) || (locale.substr(0, 2) in locales && locale.substr(0, 2)) || 'en';
  common.locale = locales[locale];
  
  // Add the general preferences.
  if (common.settings)
  {
    $_('#setting-extras-body').append(createPreferences());
  }

  // If the baseCSS is specified, add it.
  if (baseCSS)
  {
    $_('head').append(createCSS(baseCSS));
  }
    
  // Apply all settings (disable checkboxes if needed, etc).
  for (var name in common.settings)
  {
    setSetting(name, common.settings[name]);
  }

  // Run the script-specific setupSettings function.
  setupSettings();
}

// Bind the ready handler.
$(function()
{
  if (document.getElementById('chrome'))
  {
    _setup();
  }
});

// vim: expandtab sw=2

