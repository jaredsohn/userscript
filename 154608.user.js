// ==UserScript==
// @name        Emule Linker 
// @namespace   http://userscripts.org/scripts/show/154608
// @description Add all ED2K links (with one click) into remote emule/amule/mldonkey or any application installed on your system that handles ed2k links 
// @include     *
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_registerMenuCommand
// @grant 		GM_log
// @version     0.7
// -------------------------------------------------------------------------
// WHAT IT DOES:
// The script scans pages for ed2k links. It collects these links
// and displays them in a (closable) popup box in the upper left
// hand corner of the page. Then, you can add all of them into emule
// or separately.
// 
// This script has been inspired from these scripts below
// http://userscripts.org/scripts/show/4011
// http://userscripts.org/scripts/show/11310
// -------------------------------------------------------------------------
// INSTALLATION
// 1. install this script in Greasemonkey plugin
// 2. (optional) if your emule/amule/mldonkey application is on a remote system, activate the web interface on this application
// 3. Navigate to a page with ed2k links
// => The popup should appear at the upper left
// 4. Edit the script params using the settings dialog (ctl+alt+s)
// 5. (optional) restrict the pages where this script is active by modifying the @include variable of this script
// -------------------------------------------------------------------------
// CHANGELOG
// 0.7 (2013-01-27)
//  + Local appli ed2k handler support
//  + Checkbox filter
//  + Category selector
//  + Remove duplicate links check
//  + Add suffix to identical filename (but with different links)
//  + Key accelerator support (ctrl+alt+...  a, c, m, o, s, x)
//  + Bugfix: URL style was applying to the whole page
//	+ GM_config.js is now integrated into this script (for quick bugfix inside the lib)
// 0.6 (2013-01-17): 
//	+ added amule support
//  + added mldonkey support
//	+ added focus back to main window
//	+ enhanced switch beetween edit & normal mode
//  + bugfix: char encoding
// 0.5 (2013-01-04): 
//  + added edit mode function 
//	+ changed height and width settings
//	+ bugfix on character encoding display
// 0.4 (2012-12-21): add settings dialog
// 0.3 (2012-12-20): script renamed and uploaded to userscripts.org
// 0.2 (2012-11-20): fixbug - on '|' char escaped to '%7C'
// 0.1 (2012-11-18): first version
// -------------------------------------------------------------------------
// INSTALLATION
// 1. (optional) activate the web interface in your emule/amule/mldonkey
// 2. install this script as a new one in Greasemonkey plugin
// 3. edit the script params using the settings dialog (ctl+alt+s)
// 4. Go to a page with ed2k links,
// => The popup should appear at the upper left
// ==/UserScript==


// -------------------------------------------------------------------------
// 								PARAM 
// -------------------------------------------------------------------------
// These are the default values. Use the setting dialog to modify the parameters

var DEBUG_MODE = 0;	// Mode debug 0|1

// emule/amule/mldonkey server parameters
var ed2kDlMethod = 'local';	
	// local: ed2k default application of your system (default)
	// emule: emule via web url
	// amule: amule via web url
	// mldonkey: mldonkey via web url
	// custom: custom via web url (experimental)
					
var emuleUrl = 'http://127.0.0.1:4711/'; 	// the adress and port of your emule web server
var emulePwd = 'something'; // the password to access the emule web server
var emuleCat = [ {name: 'default', value: '0', select: '1'} ]; // Which emule category to assign 0=all (default)

// Popup parameters
var popupPos = 'absolute'; // absolute or fixed
var popupHeight = 200; // max height in pixel of the popup box
var popupWidth = 640; // max width in pixel of the popup box

// edit box parameters
var editCol = 80; // number of column
var editRow = 12; // number of line
var editMaxLength = 4096; // max number of char



// -------------------------------------------------------------------------
// 								LIB
// -------------------------------------------------------------------------

/*
Copyright 2009-2010, GM_config Contributors
All rights reserved.

GM_config Contributors:
    Mike Medley <medleymind@gmail.com>
    Joe Simmons
    Izzy Soft
    Marti Martz

GM_config is distributed under the terms of the GNU Lesser General Public License.

    GM_config is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// The GM_config constructor
function GM_configStruct() {
  // call init() if settings were passed to constructor
  if (arguments.length)
    GM_configInit(this, arguments);
}

// This is the initializer function
function GM_configInit(config, args) {
  // Initialize instance variables
  if (typeof config.fields == "undefined") {
    config.fields = {};
    config.onInit = function() {};
    config.onOpen = function() {};
    config.onSave = function() {};
    config.onClose = function() {};
    config.onReset = function() {};
    config.isOpen = false;
    config.title = 'User Script Settings';
    config.css = {
      basic: "#GM_config * { font-family: arial,tahoma,myriad pro,sans-serif; }"
             + '\n' + "#GM_config { background: #FFF; }"
             + '\n' + "#GM_config input[type='radio'] { margin-right: 8px; }"
             + '\n' + "#GM_config .indent40 { margin-left: 40%; }"
             + '\n' + "#GM_config .field_label { font-weight: bold; font-size: 12px; margin-right: 6px; }"
             + '\n' + "#GM_config .block { display: block; }"
             + '\n' + "#GM_config .saveclose_buttons { margin: 16px 10px 10px; padding: 2px 12px; }"
             + '\n' + "#GM_config .reset, #GM_config .reset a,"
             + '\n' + "#GM_config_buttons_holder { text-align: right; color: #000; }"
             + '\n' + "#GM_config .config_header { font-size: 20pt; margin: 0; }"
             + '\n' + "#GM_config .config_desc, #GM_config .section_desc, #GM_config .reset { font-size: 9pt; }"
             + '\n' + "#GM_config .center { text-align: center; }"
             + '\n' + "#GM_config .section_header_holder { margin-top: 8px; }"
             + '\n' + "#GM_config .config_var { margin: 0 0 4px; }"
             + '\n' + "#GM_config .section_header { font-size: 13pt; background: #414141; color: #FFF;"
             + '\n' +  "border: 1px solid #000; margin: 0; }"
             + '\n' + "#GM_config .section_desc { font-size: 9pt; background: #EFEFEF; color: #575757;"
             + '\n' + "border: 1px solid #CCC; margin: 0 0 6px; }",
      stylish: ""
    };
  }

  // Set a default id
  if (typeof config.id == "undefined")
    config.id = 'GM_config';

  var settings = null;
  // If the id has changed we must modify the default style
  if (config.id != 'GM_config')
    config.css.basic = config.css.basic.replace(/#GM_config/gm, '#' + config.id);

  // Save the previous initialize callback
  var oldInitCb = config.onInit;

  // loop through GM_config.init() arguments
  for (var i = 0, l = args.length, arg; i < l; ++i) {
    arg = args[i];

    // An element to use as the config window
    if (typeof arg.appendChild == "function") {
      config.frame = arg;
      continue;
    }

    switch (typeof arg) {
      case 'object':
        for (var j in arg) { // could be a callback functions or settings object
          if (typeof arg[j] != "function") { // we are in the settings object
            settings = arg; // store settings object
            break; // leave the loop
          } // otherwise it must be a callback function
          config["on" + j.charAt(0).toUpperCase() + j.slice(1)] = arg[j];
        }
        break;
      case 'function': // passing a bare function is set to open callback
        config.onOpen = arg;
        break;
      case 'string': // could be custom CSS or the title string
        if (arg.indexOf('{') != -1 && arg.indexOf('}') != -1)
          config.css.stylish = arg;
        else
          config.title = arg;
        break;
    }
  }

  if (settings) {
    var stored = config.read(); // read the stored settings

    for (var id in settings) // for each setting create a field object
      config.fields[id] = new GM_configField(settings[id], stored[id], id);
  }

  // Prevent infinite loops
  if (config.onInit === oldInitCb)
    config.onInit = function() {};

  // Call the previous init() callback function
  oldInitCb();
}

GM_configStruct.prototype = {
  // Support old method of initalizing
  init: function() { GM_configInit(this, arguments); },

  // call GM_config.open() from your script to open the menu
  open: function () {
    // Die if the menu is already open on this page
    // You can have multiple instances but they can't be open at the same time
    var match = document.getElementById(this.id);
    if (match && (match.tagName == "IFRAME" || match.childNodes.length > 0)) return;

    // Sometimes "this" gets overwritten so create an alias
    var config = this;

    // Function to build the mighty config window :)
    function buildConfigWin (body, head) {
      var create = config.create,
          fields = config.fields,
          configId = config.id,
          bodyWrapper = create('div', {id: configId + '_wrapper'});

      // Append the style which is our default style plus the user style
      head.appendChild(
        create('style', {
        type: 'text/css',
        textContent: config.css.basic + config.css.stylish
      }));

      // Add header and title
      bodyWrapper.appendChild(create('div', {
        id: configId + '_header',
        className: 'config_header block center',
        innerHTML: config.title
      }));

      // Append elements
      var section = bodyWrapper,
          secNum = 0; // Section count

      // loop through fields
      for (var id in fields) {
        var field = fields[id].settings;

        if (field.section) { // the start of a new section
          section = bodyWrapper.appendChild(create('div', {
              className: 'section_header_holder',
              id: configId + '_section_' + secNum
            }));

          if (typeof field.section[0] == "string")
            section.appendChild(create('div', {
              className: 'section_header center',
              id: configId + '_section_header_' + secNum,
              innerHTML: field.section[0]
            }));

          if (typeof field.section[1] == "string")
            section.appendChild(create('p', {
              className: 'section_desc center',
              id: configId + '_section_desc_' + secNum,
              innerHTML: field.section[1]
            }));
          ++secNum;
        }

        // Create field elements and append to current section
        section.appendChild(fields[id].toNode(configId));
      }

      // Add save and close buttons
      bodyWrapper.appendChild(create('div',
        {id: configId + '_buttons_holder'},

        create('button', {
          id: configId + '_saveBtn',
          textContent: 'Save',
          title: 'Save settings',
          className: 'saveclose_buttons',
          onclick: function () { config.save() }
        }),

        create('button', {
          id: configId + '_closeBtn',
          textContent: 'Close',
          title: 'Close window',
          className: 'saveclose_buttons',
          onclick: function () { config.close() }
        }),

        create('div',
          {className: 'reset_holder block'},

          // Reset link
          create('a', {
            id: configId + '_resetLink',
            textContent: 'Reset to defaults',
            href: '#',
            title: 'Reset fields to default values',
            className: 'reset',
            onclick: function(e) { e.preventDefault(); config.reset() }
          })
      )));

      body.appendChild(bodyWrapper); // Paint everything to window at once
      config.center(); // Show and center iframe
      window.addEventListener('resize', config.center, false); // Center frame on resize

      // Call the open() callback function
      config.onOpen(config.frame.contentDocument || config.frame.ownerDocument,
                    config.frame.contentWindow || window,
                    config.frame);

      // Close frame on window close
      window.addEventListener('beforeunload', function () {
          config.close();
      }, false);

      // Now that everything is loaded, make it visible
      config.frame.style.display = "block";
      config.isOpen = true;
    }

    // Either use the element passed to init() or create an iframe
    var defaultStyle = 'position:fixed; top:0; left:0; opacity:0; display:none; z-index:999;' +
                       'width:75%; height:75%; max-height:95%; max-width:95%;' +
                       'border:1px solid #000000; overflow:auto; bottom: auto;' +
                       'right: auto; margin: 0; padding: 0;';
    if (this.frame) {
      this.frame.id = this.id;
      this.frame.setAttribute('style', defaultStyle);
      buildConfigWin(this.frame, this.frame.ownerDocument.getElementsByTagName('head')[0]);
    } else {
      // Create frame
      document.body.appendChild((this.frame = this.create('iframe', {
        id: this.id,
        style: defaultStyle
      })));

      this.frame.src = 'about:blank'; // In WebKit src can't be set until it is added to the page
      // we wait for the iframe to load before we can modify it
      this.frame.addEventListener('load', function(e) {
          var frame = config.frame;
          var body = frame.contentDocument.getElementsByTagName('body')[0];
          body.id = config.id; // Allows for prefixing styles with "#GM_config"
          buildConfigWin(body, frame.contentDocument.getElementsByTagName('head')[0]);
      }, false);
    }
  },

  save: function () {
    var fields = this.fields;
    for (id in fields)
      if (fields[id].toValue() === null) // invalid value encountered
        return;

    this.write();
    this.onSave(); // Call the save() callback function
  },

  close: function() {
    // If frame is an iframe then remove it
    if (this.frame.contentDocument) {
      this.remove(this.frame);
      this.frame = null;
    } else { // else wipe its content
      this.frame.innerHTML = "";
      this.frame.style.display = "none";
    }

    // Null out all the fields so we don't leak memory
    var fields = this.fields;
    for (var id in fields)
      fields[id].node = null;

    this.onClose(); //  Call the close() callback function
    this.isOpen = false;
  },

  set: function (name, val) {
    this.fields[name].value = val;
  },

  get: function (name) {
    return this.fields[name].value;
  },

  write: function (store, obj) {
    if (!obj) {
      var values = {},
          fields = this.fields;

      for (var id in fields) {
        var field = fields[id];
        if (field.settings.type != "button")
          values[id] = field.value;
      }
    }
    try {
      this.setValue(store || this.id, this.stringify(obj || values));
    } catch(e) {
      this.log("GM_config failed to save settings!");
    }
  },

  read: function (store) {
    try {
      var rval = this.parser(this.getValue(store || this.id, '{}'));
    } catch(e) {
      this.log("GM_config failed to read saved settings!");
      var rval = {};
    }
    return rval;
  },

  reset: function () {
    var fields = this.fields,
        doc = this.frame.contentDocument || this.frame.ownerDocument,
        type;

    for (id in fields) {
      var node = fields[id].node,
          field = fields[id].settings,
          noDefault = typeof field['default'] == "undefined",
          type = field.type;

      switch (type) {
        case 'checkbox':
          node.checked = noDefault ? GM_configDefaultValue(type) : field['default'];
          break;
        case 'select':
          if (field['default']) {
            for (var i = 0, len = node.options.length; i < len; ++i)
              if (node.options[i].value == field['default'])
                node.selectedIndex = i;
          } else
            node.selectedIndex = 0;
          break;
        case 'radio':
          var radios = node.getElementsByTagName('input');
          for (var i = 0, len = radios.length; i < len; ++i)
            if (radios[i].value == field['default'])
              radios[i].checked = true;
          break;
        case 'button' :
          break;
        default:
          node.value = noDefault ? GM_configDefaultValue(type) : field['default'];
          break;
      }
    }

    this.onReset(); // Call the reset() callback function
  },

  create: function () {
    switch(arguments.length) {
      case 1:
        var A = document.createTextNode(arguments[0]);
        break;
      default:
        var A = document.createElement(arguments[0]),
            B = arguments[1];
        for (var b in B) {
          if (b.indexOf("on") == 0)
            A.addEventListener(b.substring(2), B[b], false);
          else if (",style,accesskey,id,name,src,href,which,for".indexOf("," +
                   b.toLowerCase()) != -1)
            A.setAttribute(b, B[b]);
          else
            A[b] = B[b];
        }
        for (var i = 2, len = arguments.length; i < len; ++i)
          A.appendChild(arguments[i]);
    }
    return A;
  },

  center: function () {
    var node = this.frame,
        style = node.style,
        beforeOpacity = style.opacity;
    if (style.display == 'none') style.opacity = '0';
    style.display = '';
    style.top = Math.floor((window.innerHeight / 2) - (node.offsetHeight / 2)) + 'px';
    style.left = Math.floor((window.innerWidth / 2) - (node.offsetWidth / 2)) + 'px';
    style.opacity = '1';
  },

  remove: function (el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }
};

// Define a bunch of API stuff
(function() {
  var isGM = typeof GM_getValue != 'undefined' &&
             typeof GM_getValue('a', 'b') != 'undefined',
      setValue, getValue, stringify, parser;

  // Define value storing and reading API
  if (!isGM) {
    setValue = function (name, value) {
      return localStorage.setItem(name, value);
    };
    getValue = function(name, def){
      var s = localStorage.getItem(name);
      return s == null ? def : s
    };

    // We only support JSON parser outside GM
    stringify = JSON.stringify;
    parser = JSON.parse;
  } else {
    setValue = GM_setValue;
    getValue = GM_getValue;
    stringify = typeof JSON == "undefined" ?
      function(obj) {
        return obj.toSource();
    } : JSON.stringify;
    parser = typeof JSON == "undefined" ?
      function(jsonData) {
        return (new Function('return ' + jsonData + ';'))();
    } : JSON.parse;
  }

  GM_configStruct.prototype.isGM = isGM;
  GM_configStruct.prototype.setValue = setValue;
  GM_configStruct.prototype.getValue = getValue;
  GM_configStruct.prototype.stringify = stringify;
  GM_configStruct.prototype.parser = parser;
  GM_configStruct.prototype.log = isGM ? GM_log : (window.opera ? opera.postError : console.log);
})();

function GM_configDefaultValue(type) {
  var value;

  if (type.indexOf('unsigned ') == 0)
    type = type.substring(9);

  switch (type) {
    case 'radio': case 'select':
      value = settings.options[0];
      break;
    case 'checkbox':
      value = false;
      break;
    case 'int': case 'integer':
    case 'float': case 'number':
      value = 0;
      break;
    default:
      value = '';
  }

  return value;
}

function GM_configField(settings, stored, id) {
  // Store the field's settings
  this.settings = settings;
  this.id = id;

  // if a setting was passed to init but wasn't stored then
  //      if a default value wasn't passed through init() then
  //      use default value for type
  //      else use the default value passed through init()
  // else use the stored value
  var value = typeof stored == "undefined" ?
                typeof settings['default'] == "undefined" ?
                  GM_configDefaultValue(settings.type)
                : settings['default']
              : stored;

  // Store the field's value
  this.value = value;
}

GM_configField.prototype = {
  create: GM_configStruct.prototype.create,

  node: null,

  toNode: function(configId) {
    var field = this.settings,
        value = this.value,
        options = field.options,
        id = this.id,
        create = this.create;

    var retNode = create('div', { className: 'config_var',
          id: configId + '_' + this.id + '_var',
          title: field.title || '' }),
        firstProp;

    // Retrieve the first prop
    for (var i in field) { firstProp = i; break; }

    var label = create('label', {
      innerHTML: field.label,
      id: configId + '_' + this.id +'_field_label',
      for: configId + '_field_' + this.id,
      className: 'field_label'
    });

    switch (field.type) {
      case 'textarea':
        retNode.appendChild((this.node = create('textarea', {
          id: configId + '_field_' + this.id,
          innerHTML: value,
          cols: (field.cols ? field.cols : 20),
          rows: (field.rows ? field.rows : 2)
        })));
        break;
      case 'radio':
        var wrap = create('div', {
          id: configId + '_field_' + id
        });
        this.node = wrap;

        for (var i = 0, len = options.length; i < len; ++i) {
          var radLabel = wrap.appendChild(create('span', {
            innerHTML: options[i]
          }));

          var rad = wrap.appendChild(create('input', {
            value: options[i],
            type: 'radio',
            name: id,
            checked: options[i] == value ? true : false
          }));

          if (firstProp == "options")
            wrap.insertBefore(radLabel, rad);
          else
            wrap.appendChild(radLabel);
        }

        retNode.appendChild(wrap);
        break;
      case 'select':
        var wrap = create('select', {
          id: configId + '_field_' + id
        });
        this.node = wrap;

        for (var i in options)
          wrap.appendChild(create('option', {
            innerHTML: options[i],
            value: i,
			selected: i == value ? true : false
            //selected: options[i] == value ? true : false	// bug: doesn't take into account the default value (https://github.com/sizzlemctwizzle/GM_config/issues/30)
          }));

        retNode.appendChild(wrap);
        break;
      case 'checkbox':
        retNode.appendChild((this.node = create('input', {
          id: configId + '_field_' + id,
          type: 'checkbox',
          value: value,
          checked: value
        })));
        break;
      case 'button':
        var btn = create('input', {
          id: configId + '_field_' + id,
          type: 'button',
          value: field.label,
          size: (field.size ? field.size : 25),
          title: field.title || ''
        });
        this.node = btn;

        if (field.script)
          btn.addEventListener('click', function () {
            var scr = field.script;
            typeof scr == 'function' ? setTimeout(scr, 0) : eval(scr);
          }, false);

        retNode.appendChild(btn);
        break;
      case 'hidden':
        retNode.appendChild((this.node = create('input', {
          id: configId + '_field_' + id,
          type: 'hidden',
          value: value
        })));
        break;
      default:
        // type = text, int, or float
        retNode.appendChild((this.node = create('input', {
          id: configId + '_field_' + id,
          type: 'text',
          value: value,
          size: (field.size ? field.size : 25)
        })));
    }

    // If the label is passed first, insert it before the field
    // else insert it after
    if (field.type != "hidden" &&
        field.type != "button" &&
        typeof field.label == "string") {
      if (firstProp == "label")
        retNode.insertBefore(label, retNode.firstChild);
      else
        retNode.appendChild(label);
    }

    return retNode;
  },

  toValue: function() {
    var node = this.node,
        field = this.settings,
        type = field.type,
        unsigned = false,
        rval;

    if (type.indexOf('unsigned ') == 0) {
      type = type.substring(9);
      unsigned = true;
    }

    switch (type) {
      case 'checkbox':
        this.value = node.checked;
        break;
      case 'select':
        this.value = node[node.selectedIndex].value;
        break;
      case 'radio':
        var radios = node.getElementsByTagName('input');
        for (var i = 0, len = radios.length; i < len; ++i)
          if (radios[i].checked)
            this.value = radios[i].value;
        break;
      case 'button':
        break;
      case 'int': case 'integer':
        var num = Number(node.value);
        var warn = 'Field labeled "' + field.label + '" expects a' +
          (unsigned ? ' positive ' : 'n ') + 'integer value';
        if (isNaN(num) || Math.ceil(num) != Math.floor(num) ||
            (unsigned && num < 0)) {
          alert(warn + '.');
          return null;
        }
        if (!this._checkNumberRange(num, warn))
          return null;
        this.value = num;
        break;
      case 'float': case 'number':
        var num = Number(node.value);
        var warn = 'Field labeled "' + field.label + '" expects a ' +
          (unsigned ? 'positive ' : '') + 'number value';
        if (isNaN(num) || (unsigned && num < 0)) {
          alert(warn + '.');
          return null;
        }
        if (!this._checkNumberRange(num, warn))
          return null;
        this.value = num;
        break;
      default:
        this.value = node.value;
        break;
    }

    return this.value; // value read successfully
  },

  _checkNumberRange: function(num, warn) {
    var field = this.settings;
    if (typeof field.min == "number" && num < field.min) {
      alert(warn + ' greater than or equal to ' + field.min + '.');
      return null;
    }

    if (typeof field.max == "number" && num > field.max) {
      alert(warn + ' less than or equal to ' + field.max + '.');
      return null;
    }
    return true;
  }
};

// Create default instance of GM_config
var GM_config = new GM_configStruct();



// -------------------------------------------------------------------------
// 								CODE
// -------------------------------------------------------------------------
/**
* Main : The entry point of the script
*/
var eLinks=new Array();
var eFiles=new Array();

// add Emule Linker settings dialog to Greasemonkey Menu
GM_registerMenuCommand('Emule Linker: Settings', setButton, 's');
GM_registerMenuCommand('Emule Linker: Add links', addButton, 'a');
GM_registerMenuCommand('Emule Linker: Change mode (edit/normal)', editButton, 'm');
GM_registerMenuCommand('Emule Linker: Close Popup', closeButton, 'c');
GM_registerMenuCommand('Emule Linker: Open Popup', location.reload, 'o');

// configuring the settings dialog & display it if it is the first time
scriptConfig();

// if ed2k links, display the popup
var n = getEd2kLinks(eLinks, eFiles);
if (n>0) {
	createPopup(eLinks, eFiles);
}

// Add key accelerator shortcuts
(function(d){
d.addEventListener('keydown', function(e) {
	// pressed ctl+alt
	if (e.keyCode == 65 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) { addButton(); }	// ctl+alt+a
	if (e.keyCode == 67 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) { closeButton(); } // ctl+alt+c
	if (e.keyCode == 77 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) { editButton(); } // ctl+alt+m
	if (e.keyCode == 79 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) { GM_setValue("popup_mode",1); createPopup(eLinks, eFiles); } // ctl+alt+o
	if (e.keyCode == 83 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) { setButton(); } // ctl+alt+s
	if (e.keyCode == 88 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) { // ctl+alt+x
		switch(GM_getValue("popup_mode", 1)) {
		case 0: // popup closed
			GM_setValue("popup_mode",1);
			createPopup(eLinks, eFiles);
			break;
			
		case 1: // normal mode
		case 2: // edit mode
			closeButton();
			break;
			
		default:
			trace("ERROR: popup_mode=" + GM_getValue("popup_mode", 1));
			alert("Error !!! popup_mode unknown.");
			break;
		}
	}
	}, false);
})(document);

// -------------------------------------------------------------------------	
/**
* To trace some text in the console
* @param txt the text to trace into the console
*/
function trace(txt) {
	if (DEBUG_MODE) { 
		console.log(txt);
	}
}

// -------------------------------------------------------------------------	
/**
* Get ed2k links in the page
* @param links array to stock the ed2k links
* @param files array to stock the ed2k file names
* @return number of ed2k links
*/
function getEd2kLinks(links, files) {
	var allLinks, thisLink;
	var i, lnk;
	var idx=0; // index of array
	
	trace("getEd2kLinks()");
	allLinks = document.evaluate(
		'//a[@href]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	for (i=0; i<allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if(thisLink.href.match(/^ed2k*/)) {

			// we remove any encodings from the link and make sure '|' separators are present
			lnk=decodeURIComponent(thisLink.href);
			lnk=lnk.replace(/\%257C/gi, '|');
			lnk=lnk.replace(/\%7C/gi, '|');
			
			// ingore duplicates links
			if (links.indexOf(lnk)>=0) {
				continue; 
			}

			// store the link
			links[idx]=lnk;
			
			// we retrieve the filename
			lnk = links[idx].split('|');
			// check if the filename doesn't already exist
			if (files.indexOf(lnk[2])>=0) {
				// storing the filename with a suffix
				lnk[2] += ' (' + idx + ')';
				files[idx]=lnk[2];
				lnk = lnk.join('|');
				links[idx]=lnk;
			}
			else {
				// storing the filename
				files[idx]=lnk[2];
			}

			idx++;
		}
	}
	
	trace("getEd2kLinks() ed2k links found: "+links.length);
	return links.length;
}

/**
* Creating the Popup
* @param links array filled with ed2k links
* @param files array filled with ed2k file names
*/
function createPopup(links, files) {
	var theDiv;		// the popup
	var divBody;	// The popup body
	var container; 	// the popup inserted in the page
	
	trace("createPopup");
	// First the Div
    theDiv=document.createElement('div');
	divBody = '<div id="theDiv" style="\
					position:'+ popupPos + '; \
					background-color:white; \
					opacity:0.97; \
					color:black;\
					border:2px solid #00f;\
					z-index:255;\
					text-align:left;\
					font-size:10px;\
					line-height:90%;\
					padding-left:5px;\
					padding-right:5px;';
	if (popupHeight != 0 && GM_getValue("popup_mode", 1)==1) {
		divBody += 'max-height:'+ popupHeight +'px;';
	}
	else {
		divBody += 'max-height:100%;';
	}
	if (popupWidth != 0 && GM_getValue("popup_mode", 1)==1) {
		divBody += 'max-width:'+ popupWidth +'px;';
	}
	else {
		divBody += 'max-width:100%;';
	}
	divBody += 'overflow:auto"> \
	<style> \
		a.ed2k:link       { color: #000000; text-decoration: none } \
		a.ed2k:visited    { color: #000000; text-decoration: none } \
		a.ed2k:hover      { color: #0000FF; text-decoration: underline } \
		a.ed2k:active     { color: #0000FF; text-decoration: underline} \
		input.bigcheck { \
			height: 16px; \
			width: 16px; \
		} \
		input.smallcheck { \
			height: 9px; \
			width: 9px; \
			vertical-align:text-bottom;\
			font-size:10px;\
			line-height:90%;\
		} \
	</style> \
	</div>';
	theDiv.innerHTML=divBody;
	document.body.insertBefore(theDiv, document.body.firstChild);
	
	var container = document.getElementById ("theDiv");	
	
	// adding the function toolbar at the top
	addToolbar(container, 0);

	// adding the body
	var tmp_link=document.createElement('div');
	tmp_link.setAttribute('id', 'divBody');
	tmp_link.style.clear='both';
	
	trace('createPopup() popup_mode=' + GM_getValue("popup_mode", 1));
	switch(GM_getValue("popup_mode", 1)) {
		case 0: // popup closed
			break;
			
		case 1: // normal mode
			tmp_link.innerHTML = htmlLinkList(links, files);
			container.appendChild(tmp_link);
			container.style.resize='both';
			break;
			
		case 2: // edit mode
			container.appendChild(tmp_link);
			addEditBox(tmp_link, concatLinks(eLinks));
			container.style.resize='none';
			container.style.overflow='hidden';
			break;
			
		default:
			trace("ERROR: popup_mode=" + GM_getValue("popup_mode", 1));
			alert("Error !!! popup_mode unknown.");
			break;
	}
	
	// adding the function toolbar at the bottom
	addToolbar(container, 1);
}

/**
* Delete popup
*/
function delPopup() {
	trace('delPopup()');
	var theDiv = document.getElementById ("theDiv");	
	theDiv.parentNode.removeChild(theDiv);
}

/**
* Update Popup
*/
function updatePopup() {
	trace('updatePopup()');
	delPopup();
	createPopup(eLinks, eFiles);
}

/**
* HTML link list
* @param links array
* @param files array
* @return html list
*/
function htmlLinkList(links, files) {
	var html="";
	var lnk = new Array();
	
	trace('htmlLinkList()');
	
	html = '<hr />';
	for (var i=0; i<links.length; i++) {
		lnk[0] = links[i];
		html += '<input class="smallcheck" name="l' + i + '" type="checkbox" id="l' + i + '" tabindex="' + i+1 + '" value="1" checked="checked" /><a class="ed2k" href="' + getAddLink(lnk) + '" target="emule">' + files[i] + '</a><br />';
	}
	
	html += '<hr />';
	return html;
}

/**
* concat links into one string with carrier returns
*/
function concatLinks(links) {
	var str=""; // string of links
	
	for (var i=0; i<links.length; i++) {
		if (i==0) {
			str=links[i];
		}
		else {
			str += '\n' + links[i];
		}
	}
	
	return str;
}

/**
* configuring and adding the toolbar
* @param container, the element to append the toolbar
*/
function addToolbar(container, pos) {
	trace('addToolbar(container, '+ pos +')');
    
	var divL=document.createElement('div');
	var divR=document.createElement('div');

	divL.style.cssFloat='left';
	divR.style.cssFloat='right';
	
	divL.style.paddingLeft='0px';
	divL.style.paddingRight='5px';
	divR.style.paddingLeft='5px';
	divR.style.paddingRight='5px';

	divL.style.paddingBottom='2px';
	divL.style.paddingTop='2px';
	divR.style.paddingBottom='2px';
	divR.style.paddingTop='2px';

	container.appendChild(divL);
	container.appendChild(divR);
	
	// checkbox all
	var tmp_link=document.createElement('input');
	tmp_link.type = "checkbox";
	tmp_link.value = "1";
	tmp_link.checked = true;
	tmp_link.className = 'smallcheck';
	tmp_link.style.verticalAlign='bottom';
	if (pos==0) {
		tmp_link.name = "lall";	
		tmp_link.id = "checkall";
		tmp_link.addEventListener('click', function(){ checkButton(); }, false );
	}
	else {
		tmp_link.disabled = true;		
	}

	divL.appendChild (tmp_link);	

	divL.appendChild (document.createTextNode(' '));
	
	// dynamic add links
	var tmp_link=document.createElement('button');
	tmp_link.addEventListener('click', function(){ addButton(); }, false );
	tmp_link.innerHTML = '<u>A</u>dd all links';
	tmp_link.style.fontSize='11px';
	divL.appendChild (tmp_link);
	
	divL.appendChild (document.createTextNode(' '));
	
	// Edit/Normal mode Link
	var tmp_link=document.createElement('button');
	tmp_link.addEventListener('click', function(){ editButton(); }, false );
	switch(GM_getValue("popup_mode", 1)) {
	case 0:	// popup closed
	case 1: // in normal mode
		tmp_link.innerHTML = 'Edit <u>m</u>ode';
		break;
	case 2: // in edit mode
		tmp_link.innerHTML = 'Normal <u>m</u>ode';
		break;
	default: // error
		trace("ERROR: popup_mode=" + GM_getValue("popup_mode", 1));
		alert("Error !!! popup_mode unknown.");
		tmp_link.innerHTML = 'Edit <u>m</u>ode';
		break;
	}

	tmp_link.style.fontSize='11px';
	divL.appendChild (tmp_link);
	
	divL.appendChild (document.createTextNode(' '));

	// Category list
	if (pos==0) { // top toolbar
		var selection = document.createElement('select');
		selection.setAttribute('name','Category');
		selection.id = "cat";
		selection.style.verticalAlign='bottom';
		selection.style.fontSize='11px';
		
		for(var i=0; i < emuleCat.length; i++) {
			trace('emuleCat['+i+'] => '+emuleCat[i].name+'='+emuleCat[i].value+' ('+emuleCat[i].select+')');
			var element = new Array()
			element[i] = document.createElement('option');
			element[i].setAttribute('value',emuleCat[i].value);
			element[i].text = emuleCat[i].name;
			if (emuleCat[i].select==1) {
				element[i].setAttribute('selected',1);
			}
			selection.appendChild(element[i]);
		}
		
		if(ed2kDlMethod=='local' || ed2kDlMethod=='mldonkey') {
			selection.disabled = true;
		}
		
		selection.addEventListener('change', function(){ changeCat(); }, false );
		divL.appendChild(selection);
		divL.appendChild (document.createTextNode(' '));
	}

	// Configuration Link
	var tmp_link=document.createElement('button');
	tmp_link.addEventListener('click', function(){ setButton();}, false );
	tmp_link.innerHTML = '<u>S</u>ettings';
	tmp_link.style.fontSize='11px';
	divR.appendChild (tmp_link);
	
	divR.appendChild (document.createTextNode(' '));
	
	// Close link
	var tmp_link=document.createElement('button');
	tmp_link.addEventListener('click', function(){ closeButton(); }, false );
	tmp_link.innerHTML = '<u>C</u>lose';
	tmp_link.style.fontSize='11px';
	divR.appendChild (tmp_link);

}

/**
* Add a text area full of ed2k links
* @param container, the element to append the textarea
*/
function addEditBox(container, txt) {
	var tmp_link=document.createElement('textarea');
	tmp_link.id = "editbox";
	tmp_link.name = "txt";
	tmp_link.maxLength = editMaxLength;
	tmp_link.cols = editCol;
	tmp_link.rows = editRow;
	tmp_link.value = txt;
	tmp_link.style.fontSize='11px';
	tmp_link.style.width='100%';
	tmp_link.style.height='100%';
	container.appendChild (tmp_link);
//	container.style.resize='none';
	tmp_link.select();
	
	if (txt.length >= editMaxLength) {
		alert("Warning! you need to increase the Max length to something above " +txt.length + " in the settings dialog to display the entire list");
	}
}

/**
* Delete text area
*/
function delEditBox() {
	var editBox=document.getElementById('editbox');
	editBox.parentNode.removeChild(editBox);
}

/**
* Actions when "Add all links" button is pressed
*/
function addButton() {
	trace("addButton()");
	var href="";
	var links=new Array();
	
	switch(GM_getValue("popup_mode", 1)) {
		case 0: // popup closed
		case 1: // in normal mode
			links=getSelectLink(eLinks);
			break;
		case 2: // in edit mode
			var txt = document.getElementById("editbox");
			links=txt.value.split('\n');
			break;
		default:
			trace("ERROR: popup_mode=" + GM_getValue("popup_mode", 1));
			alert("Error !!! popup_mode unknown.");
			return;
	}

	href = getAddLink(links);
	trace("href="+href);
	
	if(ed2kDlMethod=='local') {
		for (var i=0; i<links.length; i++) {
			window.location.replace(links[i]);
		}
	}
	else {
		var e_win = window.open(href, 'emule');
		e_win.blur();
	}
	
}

/**
* Actions when "Edit/Reset" button is pressed
*/
function editButton() {
	trace("editButton()");
	switch(GM_getValue("popup_mode", 1)) {
	case 1: // in normal mode
		GM_setValue("popup_mode",2);
		updatePopup();
		break;
		
	case 0: // popup closed
	case 2: // in edit mode
		GM_setValue("popup_mode",1); 
		updatePopup();
		break;
		
	default:
		trace("ERROR: popup_mode=" + GM_getValue("popup_mode", 1));
		alert("Error !!! popup_mode unknown.");
		return;
	}
}

/**
* Actions when "Settings" button is pressed
*/
function setButton() {
	trace("setButton()");
	trace("scriptConfig() invoking the dialog");
	GM_config.open();
	GM_setValue("emule_config",1);
}

/**
* Actions when "Close" button is pressed
*/
function closeButton() {
	trace("closeButton()");
	var candidate=document.getElementById("theDiv"); 
	candidate.parentNode.removeChild(candidate);
	GM_setValue("popup_mode",0);
}

/**
* Actions when "Check" button is pressed
*/
function checkButton() {
	trace("checkButton()");
	var checkbox=document.getElementById("checkall"); 
	if (checkbox.checked==true) {
		for (var i=0; i<eLinks.length; i++) {
			document.getElementById('l'+i).checked=true;
		}
	}
	else {
		for (var i=0; i<eLinks.length; i++) {
			document.getElementById('l'+i).checked=false;
		}
	}
}

/**
* Actions when category is changed
*/
function changeCat() {
	trace("changeCat()");

	var cat=document.getElementById("cat"); 

	for (var i=0; i<emuleCat.length; i++) {
		if(emuleCat[i].value==cat.value) {
			emuleCat[i].select=1;
		}
		else {
			emuleCat[i].select=0;
		}
	}
	//GM_config.set("emuleCat", catToStr(emuleCat));
	updatePopup();

}

// -------------------------------------------------------------------------	
/**
* Get selected links
*/
function getSelectLink(links) {
	var lnk= new Array();
	var idx=0;
	
	for (var i=0; i<links.length; i++) {
		if (document.getElementById('l'+i).checked==true){
			lnk[idx]=links[i];
			idx++;
		}
	}
	return lnk;
}


/**
* Choose the right method to send the ed2k files
*/
function getAddLink(links) {
	var url="";
	var lnk=""; // string of links
	var tmp="";
	var cat="";
	
	trace('getAddLink('+links+')');
	
	var cat = document.getElementById('cat').value;
	
	for (var i=0; i<links.length; i++) {
		tmp=links[i].split('|');

		// we encode the filename
		tmp[2]=encodeURIComponent(decodeURIComponent(tmp[2]));
		tmp=tmp.join('|');
			
		if (i==0) {
			lnk=tmp;
		}
		else {
			lnk += '\n' + tmp;
		}
	}

	// then we encode the link (so the filename is encoded twice)
	lnk=encodeURIComponent(lnk);
	lnk=lnk.replace(/\%257C/gi, '|');
	lnk=lnk.replace(/\%7C/gi, '|');

			
	switch(ed2kDlMethod) {
		case 'local':
			url = links.join('\n');
			break;
		case 'emule':
			url = getEmuleLink(lnk, cat);
			break;
		case 'amule':
			url = getAmuleLink(lnk, cat);
			break;
		case 'mldonkey':
			url = getMLDonkeyLink(lnk);
			break;
		case 'custom':
			url = getCustomLink(lnk, cat);
			break;
		default:
			break;
	}
	return url;
}

/**
* formatting the URL to add ed2k links to emule
*/
function getEmuleLink(links, cat) {
		
	// Url to add ed2k links to emule
	return emuleUrl + "?w=password&p=" + emulePwd + "&cat=" + cat + "&c=" + links;
}

/**
* formatting the URL to add ed2k links to amule
*/
function getAmuleLink(links, cat) {

	if(cat == "0") {
		cat = "all";
	}
	
	// Url to add ed2k links to amule
	return emuleUrl + "footer.php?selectcat=" + cat + "&Submit=Download+link&ed2klink=" + links;
}

/**
* formatting the URL to add ed2k links to mlDonkey
*/
function getMLDonkeyLink(links) {
	// Url to add ed2k links to mldonkey
	return emuleUrl + "submit?jvcmd=multidllink&links=" + links;
}

/**
* formatting the URL to add ed2k links to a custom application
*/
function getCustomLink(links, cat) {
	// Url to add ed2k links to custom application

	return 'http://192.168.0.43/ed2k.php?cat=' + cat + '&post=' + encodeURIComponent(window.location) + '&ed2k=' + links;
	//return emuleUrl +'ed2k.php?cat=' + cat + '&post=' + encodeURIComponent(window.location) + '&ed2k=' + links;
}

// -------------------------------------------------------------------------	
/**
* calling the settings dialog
*/
function resetConfig() {
	GM_setValue("emule_config",0);
	scriptConfig();
}

/**
* Configure and invoke the settings dialog
*/
function scriptConfig() {
	trace("scriptConfig() configuring the dialog");
	
	// Configure Settings dialog
	GM_config.init('Emule Linker Settings dialog', {
		'section1' : { section: ['ed2k download mode', 'Please refer to your emule/amule/mldonkey configuration'], label: '', type: 'hidden'},
		/*'ed2kDlMethod': { label: 'Ed2k Download Method', title: 'local: local application that handle ed2k links (default)\nemule: remote emule (via web frontend)\namule: remote amule (via web frontend)\nmldonkey: remote mldonkey (via web frontend)\ncustom: custom server implementation (experimental)', type:'radio', options:['local','emule','amule','mldonkey','custom'], default: ed2kDlMethod },*/
		'ed2kDlMethod': { label: 'Ed2k Download Method', title: 'local: local application that handle ed2k links (default)\nemule: remote emule (via web frontend)\namule: remote amule (via web frontend)\nmldonkey: remote mldonkey (via web frontend)\ncustom: custom server implementation (experimental)', type:'select', options:{'local':'your system default','emule':'(remote) emule','amule':'(remote) amule','mldonkey':'(remote) mldonkey','custom':'custom (experimental)'}, default: ed2kDlMethod}, // default value doesn't work with a dropdown menu => see bugfix in the lib
		'emuleUrl': { label: 'Emule Url', title : 'The complete url of your emule web server ending by a / (example: http://127.0.0.1:4711/)', type: 'text', default: emuleUrl },
		'emulePwd': { label: 'Emule Password', title : 'the password you choose to access your emule web server', type: 'text', default: emulePwd },
		'emuleCat': { label: 'Category', title : 'categories available in your emule/amule application. You can add categories using the following template:\ncategory_name1=corresponding_index_in_emule;category_name2=...\nAdding a * before the name specify the default choice.\nIf you don\'t know what you are doing just specify this: *default=0', type: 'text', default: catToStr(emuleCat) },
		'section2' : { section: ['Popup Configuration', 'modify how the popup is displayed'], label: '', type: 'hidden'},
		'popupPos': { label: 'Popup Position', title : 'choosing \'absolute\', the popup will stay at the top. Choosing fixed, the popup will follow as you scroll within the page', type: 'radio', options:['absolute','fixed'], default: popupPos },
		'popupHeight': { label: 'Max Popup Height in px (0=unlimited)', title : 'Max height of the popup in pixels (0=unlimited)', type: 'int', default: popupHeight },
		'popupWidth': { label: 'Max Popup Width in px (0=unlimited)', title : 'Max width of the popup in pixels (0=unlimited)', type: 'int', default: popupWidth },
		'section3' : { section: ['Edit box Configuration', 'modify how the edit box is displayed'], label: '', type: 'hidden'},
		'editCol': { label: 'Number of columns', title : 'number of columns', type: 'radio', type: 'int', default: editCol },
		'editRow': { label: 'Number of rows', title : 'Number of rows', type: 'int', default: editRow },
		'editMaxLength': { label: 'MaxLength', title : 'Max number of char in the text area', type: 'int', 'default': editMaxLength },
		}, 
		{
		//open: function() { GM_config.sections2tabs(); }, // not working (not included into the library)
		save: function() { location.reload(); } // reload the page when configuration was changed
		}
	);
	
	// invoke the dialog
	if (GM_getValue("emule_config", 0)<1)
	{
		trace("scriptConfig() invoking the dialog");
		GM_config.open();
		GM_setValue("emule_config",1);
	}

	// store the settings
	saveConfig();

}

/**
* Save the config parameters
*/
function saveConfig() {
	var err=0;
	
	trace("saveConfig() storing the settings");

	ed2kDlMethod = GM_config.get('ed2kDlMethod');

	emuleUrl = GM_config.get('emuleUrl');
	if(emuleUrl.charAt(emuleUrl.length-1) != '/') {
		GM_config.set("emuleUrl", emuleUrl + '/');
		emuleUrl += '/';
	}

	emulePwd = GM_config.get('emulePwd');
	if(emulePwd=='' && ed2kDlMethod=='emule') {
		alert("A password is mandatory to submit new link to emule via web URL.\nPlease choose another method or specify the password.");
		GM_config.set("emulePwd","something");
		emulePwd = GM_config.get('emulePwd');
		err=-1;
	}

	emuleCat = strToCat(GM_config.get('emuleCat'));
	if(emuleCat==-1) {
		alert("Category value invalid. Reverting back to the default value (*default=0)");
		GM_config.set('emuleCat', '*default=0');
		emuleCat = strToCat('*default=0');
	}

	popupPos = GM_config.get('popupPos');

	popupHeight = GM_config.get('popupHeight');
	if (popupHeight > 0 && popupHeight < 40 ) {
		alert("With a 'Max Popup Height' beetween 0 < x < 40px, you won't be able to press the Settings button. So we consider this value as 0 (unlimited)");
		GM_config.set("popupHeight",0);
		popupHeight = 0;
	}

	popupWidth = GM_config.get('popupWidth');
	if (popupWidth > 0 && popupWidth < 100 ) {
		alert("With a 'Max Popup Width' beetween 0 < x < 100 px, you won't be able to press the Settings button. So we consider this value as 0 (unlimited)");
		GM_config.set("popupWidth",0);
		popupWidth = 0;
	}

	editCol = GM_config.get('editCol');
	editRow = GM_config.get('editRow');

	if (GM_config.get('editMaxLength') < editMaxLength) {
		alert("MaxLength must be superior to " + editMaxLength);
		GM_config.set("editMaxLength",editMaxLength);
	}
	else {
		editMaxLength = GM_config.get('editMaxLength');
	}

	if (err<0) {
		GM_config.open();
		saveConfig();
	}

	return err;
}

/**
* Category array to string
*/
function catToStr(cat) {
	var str="";

	//trace('catToStr()');
	
	for (var i=0; i < cat.length; i++) {
		if (cat[i].select==1) {
			str +='*';
		}
		str +=cat[i].name+'=';
		str +=cat[i].value +';';
	}
	
	trace('catToStr() -> ' + str);
	return str;
}

/**
* String to category array
*/
function strToCat(str) {
	var cat = new Array();
	var tab = new Array();
	var tmp = new Array();
	var idx=0;
	
	//trace ('strToCat('+str+')');
	
	tab = str.split(';');
	for(var i=0; i<tab.length; i++) {
		tmp = tab[i].split('=');
		if (tmp[0]!='') {
			obj = new Object();
			if(tmp[0].charAt(0)=='*') {
				obj.select=1;
				obj.name=tmp[0].slice(1);
				obj.value=tmp[1];
			}
			else {
				obj.select=0;
				obj.name=tmp[0];
				obj.value=tmp[1];
			}
			cat[idx] = obj;
			//trace('cat['+idx+'] => '+cat[idx].name+'='+cat[idx].value+' ('+cat[idx].select+')');
			idx++;
		}
	
	}
	trace('strToCat() -> '+ idx +' categories');

	if (typeof cat[0].name === "undefined" || typeof cat[0].value === "undefined" || typeof cat[0].select === "undefined" || cat[0].name=='' || cat[0].value=='') {
		return -1;
	}
	else {
		return cat;
	}
}
