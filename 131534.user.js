// ==UserScript==
// @name           Easy UA Award Search
// @namespace      jasonvr
// @match          http://www.united.com/web/en-US/apps/booking/flight/searchResultAward1.aspx
// @match	   http://www.united.com/web/en-US/apps/booking/flight/searchModify.aspx
// @match          http://united.com/web/en-US/apps/booking/flight/searchResultAward1.aspx
// @match	   http://united.com/web/en-US/apps/booking/flight/searchModify.aspx
// @match          https://www.united.com/web/en-US/apps/booking/flight/searchResultAward1.aspx
// @match	   https://www.united.com/web/en-US/apps/booking/flight/searchModify.aspx
// @match          https://united.com/web/en-US/apps/booking/flight/searchResultAward1.aspx
// @match	   https://united.com/web/en-US/apps/booking/flight/searchModify.aspx
// @include        htt*://www.united.com/web/en-US/apps/booking/flight/searchResultAward1.aspx
// @include	   htt*://www.united.com/web/en-US/apps/booking/flight/searchModify.aspx
// @include        htt*://united.com/web/en-US/apps/booking/flight/searchResultAward1.aspx
// @include	   htt*://united.com/web/en-US/apps/booking/flight/searchModify.aspx
// @grant	   GM_log
// @grant	   GM_deleteValue
// @grant	   GM_getValue
// @grant	   GM_setValue
// @grant	   GM_addStyle
// @version        3.2
// ==/UserScript==







//PER INSTRUCTIONS OF DEVELOPERS, IN ORDER TO BE CROSS BROWSER
//COMPATIBLE, THE FULL TEXT OF THE SCRIPT MUST BE INCLUDED
//IN THIS SCRIPT

/* Instructions
GM_config is now cross-browser compatible.

To use it in a Greasemonkey-only user script you can just @include it.

To use it in a cross-browser user script you will need to manually
include the code at the beginning of your user script. In this case
it is also very important you change the "storage" value below to
something unique to prevent collisions between scripts. Also remeber
that in this case that stored settings will only be accessable on
the same domain they were saved.
*/


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
          else if (",style,accesskey,id,name,src,href,which".indexOf("," +
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
  },
  
  
   //these functions are taken from GM_config Extender by the same authors
   /* =========================================[ Resize configuration window ]===
    * int width: new width
    * int height: new height */
   resizeFrame: function (wid,hei) {
     if(fid=this.frame.id) {
       this.frame.style.width = wid;
       this.frame.style.height = hei;
     }
   },
   
   
   /* ====================================[ Add a border to the config frame ]===
    * object spec { width (5px), style (ridge), color (#eae9e8) }
    */
   addBorder: function() {
     if(fid=this.frame.id) {
       spec = arguments[0] || {};
       this.frame.style.borderWidth = (spec.width || '5px');
       this.frame.style.borderStyle = (spec.style || 'ridge');
       this.frame.style.borderColor = (spec.color || '#999999');
     }
}   
   
   //end of the functions from GM_config Extender
  
  
  
  
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
  //GM_configStruct.prototype.log = isGM ? GM_log : (window.opera ? opera.postError : console.log);
  GM_configStruct.prototype.log = window.opera ? opera.postError : console.log;
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

    var label = create('span', {
      innerHTML: field.label,
      id: configId + '_' + this.id +'_field_label',
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
            selected: options[i] == value ? true : false
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




//END OF GM_CONFIG 






//the next three functions are necessary to emulate greasemonkey functions in Chrome

// GM_addStyle()
// taken from actual greasemonkey source
if('undefined' == typeof GM_addStyle) 
{
  function GM_addStyle(css) 
  {
    var head = document.getElementsByTagName("head")[0];
    if (head) 
    {
      var style = document.createElement("style");
      style.textContent = css;
      style.type = "text/css";
      head.appendChild(style);
    }
    return style;
  }
}



if('undefined' == typeof GM_deleteValue) 
{

  // GM_setValue()
  function GM_setValue(name,value) 
  {
  	value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
  }



  // GM_getValue()

  function GM_getValue(name,defaultValue) 
  {

	var value = localStorage.getItem(name);
        if (!value)
        	return defaultValue;
        var type = value[0];
        value = value.substring(1);
      	switch (type) 
      	{
      		case 'b':
              		return value == 'true';
            	case 'n':
                	return Number(value);
            	default:
                	return value;
	}
  }
}






var scrolldelayUp;
var scrolldelayDown;


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}


function getCurrentDateURL()
{

	var calendars = getElementsByClass( "Calendar", document, "table" );
	//console.log( "calendars is %s", calendars);
	//console.log( "calendars.length is %d", calendars.length );


	currentMonthCalendar = calendars[0];

	//console.log( "currentMonthCalendar = %s", currentMonthCalendar );

	var currentMonthCalendarBody = currentMonthCalendar.getElementsByTagName("tbody");

	//console.log( "currentMonthCalendarBody = %s", currentMonthCalendarBody );

	//console.log( "currentMonthCalendarBody.length = %d", currentMonthCalendarBody.length );

	var calendarRows = currentMonthCalendarBody[0].getElementsByTagName("tr");
	//console.log( "calendarRows = %s", calendarRows );

	for( var row = 2; row < calendarRows.length; row++)
	{

		var cells = calendarRows[row].getElementsByTagName("td");
		//console.log( "cells.length is %d", cells.length);

		
		for( var column = 0; column < cells.length; column++ )
		{
			//console.log(" value is %s", cells[column].innerHTML );
			
			var style = cells[column].getAttribute('style');
			
			var styleRegex = new RegExp("border:solid");

			var findStyle = style.match( styleRegex );
			if( findStyle )
			{
				//console.log( "found right style");
				
				//found the currently selected date
				var address = cells[column].childNodes[0].toString();
				//alert( address ); //the address
				
				return address;
			}
		}
	}
}



function getPreviousDateURL()
{
	address = getCurrentDateURL();
	

	//console.log( "spot 2");
	//console.log( "address is %s", address.stringValue );

	var startOfDateTag = address.indexOf("Date=") + 5;
	var endOfDateTag = address.indexOf("&CName", startOfDateTag );
	var date = address.substring( startOfDateTag, endOfDateTag );


	var indexOfFirstSlash = date.indexOf("/");

	var indexOfSecondSlash = date.indexOf("/", indexOfFirstSlash+1);
	var month = date.substring( 0, indexOfFirstSlash );
	var day = date.substring( indexOfFirstSlash+1, indexOfSecondSlash );
	var year = date.substring( indexOfSecondSlash+1 );

	var currentDay = new Date();
	currentDay.setFullYear( parseInt(year), parseInt(month)-1, parseInt(day) );


	var oneDayEarlier = new Date( currentDay.toString() );
	oneDayEarlier.setDate( oneDayEarlier.getDate()-1 );

	var oneDayEarlierString = oneDayEarlier.getMonth()+1 + "/" + oneDayEarlier.getDate() + "/" + oneDayEarlier.getFullYear();
	
	var searchRE = new RegExp( date, 'g');

	address = address.replace( searchRE, oneDayEarlierString );
	

	return address;
}

function getNextDateURL()
{

	address = getCurrentDateURL();
	
	var startOfDateTag = address.indexOf("Date=") + 5;
	var endOfDateTag = address.indexOf("&CName", startOfDateTag );
	var date = address.substring( startOfDateTag, endOfDateTag );


	var indexOfFirstSlash = date.indexOf("/");

	var indexOfSecondSlash = date.indexOf("/", indexOfFirstSlash+1);
	var month = date.substring( 0, indexOfFirstSlash );
	var day = date.substring( indexOfFirstSlash+1, indexOfSecondSlash );
	var year = date.substring( indexOfSecondSlash+1 );

	var currentDay = new Date();
	currentDay.setFullYear( parseInt(year), parseInt(month)-1, parseInt(day) );

	var oneDayLater = new Date( currentDay.toString() );
	oneDayLater.setDate( oneDayLater.getDate()+1 );

	var oneDayLaterString = oneDayLater.getMonth()+1 + "/" + oneDayLater.getDate() + "/" + oneDayLater.getFullYear();
	
	var searchRE = new RegExp( date, 'g');	
	
	address = address.replace( searchRE, oneDayLaterString );
	
	return address;
}

function stopScrollUp() {
    	clearTimeout(scrolldelayUp);
}

function stopScrollDown() {
    	clearTimeout(scrolldelayDown);
}

function pageScrollDown() 
{

	stopScrollDown();
	window.scrollBy(0,100); // horizontal and vertical scroll increments
    	scrolldelayDown = setTimeout(pageScrollDown,100); // scrolls every 100 milliseconds
}

function pageScrollUp()
{
	stopScrollUp();
	window.scrollBy(0,-100); // horizontal and vertical scroll increments
    	scrolldelayUp = setTimeout(pageScrollUp,100); // scrolls every 100 milliseconds

}

function doInsertNavButtons()
{

	//console.log( "spot 0" );

	var mainElement = getElementsByClass( "Contents", document, "div" );
	//console.log( "mainElement is %s", mainElement );
	//console.log( "mainElement.length is %d", mainElement.length );
	var target = mainElement[0];



	var divElement = document.createElement('div');
	divElement.setAttribute('style','margin-right:1em;float:right');
	divElement.setAttribute('id', 'jts_new_div');
	divElement.setAttribute('class', 'jts_div_new');

	var tableElement = document.createElement('table');
	divElement.appendChild( tableElement );

	var trElement = document.createElement('tr');
	tableElement.appendChild( trElement );

	var tdElement = document.createElement('td');
	trElement.appendChild( tdElement );
	
	
	//console.log( "spot 0.5" );
	
	var scrollUpButton = document.createElement('input');
	scrollUpButton.setAttribute('id','jts_scroll_up');
	scrollUpButton.setAttribute('type','button');
	scrollUpButton.setAttribute('style','margin:0.5em 0em 0em 0em');
	scrollUpButton.setAttribute('value','Scroll Up');
	scrollUpButton.setAttribute('name','jts_scroll_up');
	scrollUpButton.addEventListener("mousedown", pageScrollUp, false);
	scrollUpButton.addEventListener("mouseup", stopScrollUp, false );

	tdElement.appendChild( scrollUpButton );
	
	
	

	//console.log( "spot 1");

	var prevButtonElement = document.createElement('input');
	var nextButtonElement = document.createElement('input');

	prevButtonElement.setAttribute('id','jts_prev');
	nextButtonElement.setAttribute('id','jts_next');
	prevButtonElement.setAttribute('type','button');
	nextButtonElement.setAttribute('type','button');
	prevButtonElement.setAttribute('style','margin:0.5em 0em 0em 0em');
	nextButtonElement.setAttribute('style','margin:0.5em 0em 0em 0em');
	prevButtonElement.setAttribute('value','Previous');
	nextButtonElement.setAttribute('value','Next');
	prevButtonElement.setAttribute('name','jts_prev');
	nextButtonElement.setAttribute('name','jts_next');


	var location1 = getPreviousDateURL();
	var location2 = getNextDateURL();



	var location1Action = "window.location.replace(\"" + location1 + "\")";
	var location2Action = "window.location.replace(\"" + location2 + "\")";

	prevButtonElement.setAttribute('onclick',location1Action);
	nextButtonElement.setAttribute('onclick',location2Action);

	tdElement.appendChild( prevButtonElement );
	tdElement.appendChild( nextButtonElement );

	//console.log( "spot 3");


	var scrollDownButton = document.createElement('input');
	scrollDownButton.setAttribute('id','jts_scroll_down');
	scrollDownButton.setAttribute('type','button');
	scrollDownButton.setAttribute('style','margin:0.5em 0em 0em 0em');
	scrollDownButton.setAttribute('value','Scroll Down');
	scrollDownButton.setAttribute('name','jts_scroll_down');
	scrollDownButton.addEventListener("mousedown", pageScrollDown, false);
	scrollDownButton.addEventListener("mouseup", stopScrollDown, false );

	tdElement.appendChild( scrollDownButton );

	//console.log( "spot 4" );


	target.parentNode.insertBefore(divElement, target.nextSibling );


	GM_addStyle("#jts_prev { position: fixed; top: 50px; right: 60px; z-index: 222; background: yellow; }");
	GM_addStyle("#jts_next { position: fixed; top: 50px; right: 10px; z-index: 222; background: yellow; }");
	GM_addStyle("#jts_scroll_down { position: fixed; top: 80px; right: 25px; z-index: 222; background: yellow; }");
	GM_addStyle("#jts_scroll_up { position: fixed; top: 20px; right: 25px; z-index: 222; background: yellow; }");
}



var saverAwardsFound;


function doRemoveStandardAwardOnlyRows()
{

	saverAwardsFound = false;

	var tableElement = getElementsByClass( "rewardResults", document, "table" );
	//console.log( "tableElement.length = %d", tableElement.length );
	
	if( tableElement.length != 0 )
	{


		var rows = tableElement[0].getElementsByTagName( "tr" );
		//console.log( "number of rows is %d", rows.length );

		for( var row = rows.length-1 ; row >= 0; row-- )
		{


			var tdElements = rows[row].getElementsByTagName( "td" );

			var tdRewardPriceElements = getElementsByClass( "tdRewardPrice", rows[row], "td" );
			//console.log( "number of reward blocks = %d", tdRewardPriceElements.length );

			if( tdRewardPriceElements.length > 0 )
			{

				//columns 0, 2, 4 are where saver awards are
				//if they all have divNA elements, then the row is standard awards only
				var hasSaverAward = false;
				for( var column=0; column < tdRewardPriceElements.length; column+=2 )
				{
					//console.log( "loop start %d", column );
					//console.log( "tdRewardPrice block is %s", tdRewardPriceElements[column].innerHTML );
					var divNAElements = getElementsByClass( "divNA", tdRewardPriceElements[column], "div" );
					//console.log( "number of divNAElements elements is %d", divNAElements.length );
					if( divNAElements.length == 0 )
					{
						hasSaverAward = true;
					}
				}



				if( !hasSaverAward )
				{
					//the row does not have any saver awards, so remove the row
					rows[row].parentNode.removeChild( rows[row] );
				}
				else
				{
					saverAwardsFound = true;
				}

			}
		}
	
	}



}



function doRemoveStandardAwardColumns()
{



	var headerDivStdAwardElements = getElementsByClass( "easyPass", document, "div" );
	//console.log( "Number of easy pass header elements = %d", headerDivStdAwardElements.length );
	
	var numEasyPassHeaderElements = headerDivStdAwardElements.length;
	

	for( var headerElement = headerDivStdAwardElements.length - 1; headerElement >=0; headerElement-- )
	{
		//this should be the td element
		var parent = headerDivStdAwardElements[headerElement].parentNode;
		parent.parentNode.removeChild( parent );

	}



	var tableElement = getElementsByClass( "rewardResults", document, "table" );
	//console.log( "tableElement.length = %d", tableElement.length );
	
	if( tableElement.length != 0 )
	{


		var rows = tableElement[0].getElementsByTagName( "tr" );
		//console.log( "number of rows is %d", rows.length );

		for( var row = rows.length-1 ; row >= 0; row-- )
		{


			var tdElements = rows[row].getElementsByTagName( "td" );

			var tdRewardPriceElements = getElementsByClass( "tdRewardPrice", rows[row], "td" );
			//console.log( "number of reward blocks = %d", tdRewardPriceElements.length );

			if( tdRewardPriceElements.length > 0 )
			{
				var maxStdAwardElement = 5;
				if( tdRewardPriceElements.length == 4 )
				{
					maxStdAwardElement = 3;
				}
				else if( tdRewardPriceElements.length == 2 )
				{
					maxStdAwardElement = 1;
				}


				//columns 1, 3, 5 are where standard awards are
				for( var column = maxStdAwardElement; column >= 0; column-=2 )
				{
					//console.log( "loop start %d", column );

					//console.log( "in column %d", column );

					tdRewardPriceElements[column].parentNode.removeChild( tdRewardPriceElements[column] );
				}
			}
		}


		//find the class header elements to change the colspan
		var classHeaders = getElementsByClass( "cabin", document, "td" );
		//console.log( "number of class headers is %d", classHeaders.length );

		for( var columnHeaderNumber = 0; columnHeaderNumber < classHeaders.length; columnHeaderNumber++ )
		{
			//console.log( "%s", classHeaders[columnHeaderNumber] );
			classHeaders[columnHeaderNumber].setAttribute( "colspan", "1" );
		}

		//find the award booking header and change the colspan
		var awardAvailableHeader = getElementsByClass( "trSegmentTblHdg", document, "tr" );
		if( awardAvailableHeader != null )
		{
			var awardAvailableHeader2 = awardAvailableHeader[0].getElementsByTagName("td");

			//console.log( "%s", awardAvailableHeader2[0].innerHTML );
			awardAvailableHeader2[0].setAttribute( "colspan", numEasyPassHeaderElements );
			
			if( numEasyPassHeaderElements == 1 )
			{
				awardAvailableHeader2[0].setAttribute( "style", "width:10%;text-align:center" );
			}
		}
	
	}



}


var insertNavButtons = false;
var hideStdAwards = false;
var expandMixedCabin = false;
var showEconomyAwards = false;
var showBusinessAwards = false;
var showFirstAwards = false;
var autoScrollToCalendar = false;


function doExpandAndHighlightMixedCabin()
{


	var tableElement = getElementsByClass( "rewardResults", document, "table" );
	//console.log( "tableElement.length = %d", tableElement.length );
	
	if( tableElement.length != 0 )
	{


		var rows = tableElement[0].getElementsByTagName( "tr" );
		//console.log( "number of rows is %d", rows.length );

		for( var row = rows.length-1 ; row >= 0; row-- )
		{


			var tdElements = rows[row].getElementsByTagName( "td" );

			var tdRewardPriceElements = getElementsByClass( "tdRewardPrice", rows[row], "td" );
			//console.log( "number of reward blocks = %d", tdRewardPriceElements.length );

			if( tdRewardPriceElements.length > 0 )
			{

				for( var column = tdRewardPriceElements.length-1; column >= 0; column-- )
				{
					//console.log( "loop start %d", column );
					//console.log( "in column %d", column );
					
					var mixedCabinNodes = getElementsByClass( "divMixedCabin", tdRewardPriceElements[column], "div" );
					
					//console.log( "Found %d mixed cabin nodes", mixedCabinNodes.length );
					if( mixedCabinNodes.length != 0 )
					{
					
						//get the description of the mixed cabin
						var text = mixedCabinNodes[0].getAttribute( "data-title" );
						//console.log( text );

						//modify the text to format it nicely
						//example is 
						//UA839 LAX to MEL---United Global First|SQ238 MEL to SIN---Business, (Saver First sold out)					
	
						var searchRE = new RegExp( "---", 'g');	
						text = text.replace( searchRE, "|" );
						//console.log( "with first replace\n%s", text);

						var lines = text.split("|");
						//console.log( "number of lines is %d", lines.length );

						var divElement = document.createElement('div');
						divElement.setAttribute('id', 'divMixedCabinJts');
	
						var findEconomyRegex = new RegExp( "Economy", "g" );	
						var findCoachRegex = new RegExp( "Coach", "g" );
						var findBusinessRegex = new RegExp( "Business", "g" );	
						var findSingleCabinRegex = new RegExp( "Single-Cabin", "g" );
						var findTwoCabinRegex = new RegExp( "Two-Cabin", "g" );
						var findSoldOutRegex = new RegExp( "sold out", "g" );
						
						var bizColumnOne = -1;
						var bizColumnTwo = -1;
						var firstColumnOne = -1;
						var firstColumnTwo = -1;
						
						if( showEconomyAwards && hideStdAwards )
						{
							if( showBusinessAwards )
							{
								bizColumnOne = 1;
								firstColumnOne = 2;
							}
							else
							{
								firstColumnOne = 1;
							}
						}
						else if( showEconomyAwards && !hideStdAwards )
						{
							if( showBusinessAwards )
							{
								bizColumnOne = 2;
								bizColumnTwo = 3;
								firstColumnOne = 4;
								firstColumnTwo = 5;
							}
							else
							{
								firstColumnOne = 2;
								firstColumnTwo = 3;
							
							}
						}
						else if( !showEconomyAwards && hideStdAwards )
						{
							if( showBusinessAwards )
							{
								bizColumnOne = 0;
								fistColumnOne = 1;
							}
							else
							{
								firstColumnOne = 0;
							}
						}
						else if( !showEconomyAwards && !hideStdAwards )
						{
							if( showBusinessAwards )
							{
								bizColumnOne = 0;
								bizColumnTwo = 1;
								firstColumnOne = 2;
								firstColumnTwo = 3;
							}
							else
							{
								firstColumnOne = 0;
								firstColumnTwo = 1;							
							}
						}
						
						
						
						for( var j = 0; j < lines.length; j++ )
						{
							var spanElement = document.createElement('span');

							if( findSoldOutRegex.test( lines[j] ) )
							{
								//console.log( "Found sold out text in %s", lines[j] );
								spanElement.setAttribute("style", "background-color: #ffff00");
							}
							else if( findSingleCabinRegex.test( lines[j] ) ||
								 findTwoCabinRegex.test( lines[j] ) )
							{
								//console.log( "Found single cabin in %s", lines[j] );
								spanElement.setAttribute("style", "background-color: #00ff00");
							}
							else if( ( (findEconomyRegex.test( lines[j] ) ) || (findCoachRegex.test( lines[j] ) ) ) &&
							         ( ( column == bizColumnOne ) || ( column == bizColumnTwo ) || ( column == firstColumnOne ) || ( column == firstColumnTwo ) ) ) 
							{
								//if we find an economy segment in anything but the first column
								//and it hasn't already been flagged as a single cabin aircraft
								//if means that we hit the UA display bug
								//color it yellow
								spanElement.setAttribute("style", "background-color: #ffff00");
							}
							else if( findBusinessRegex.test( lines[j] ) &&
							         ( ( hideStdAwards && column != bizColumnOne ) || ( !hideStdAwards && column != bizColumnOne && column != bizColumnTwo ) ) )
							{
								//if we find a business segment in the first class columns, highlight it in yellow
								//if std awards are hidden, then business should be in column 1
								//if std awards are not hidden, then business should be in columns 2 and 3
								spanElement.setAttribute("style", "background-color: #ffff00");
							}

							spanElement.innerHTML = lines[j] + "\<br\>";
							divElement.appendChild( spanElement );

						}

						mixedCabinNodes[0].parentNode.insertBefore( divElement, mixedCabinNodes[0].nextSibling );						
						
	
					
					}
				}
				
				
			}
		}
	}







	//now let's find the "mixed cabin" text and the graphic so that we can delete it
	var mixedCabinTextElements = getElementsByClass( "spanMixedCabin", document, "span" );
	//console.log( "mixedCabinTextElements.length = %d", mixedCabinTextElements.length );
	for( var x = mixedCabinTextElements.length - 1; x>=0 ; x-- )
	{
		mixedCabinTextElements[x].parentNode.removeChild( mixedCabinTextElements[x] );
	}

	var mixedCabinWarningIconElements = getElementsByClass( "imgMixedCabin", document, "img" );
	//console.log( "mixedCabinWarningIconElements.length = %d", mixedCabinWarningIconElements.length );
	for( var x = mixedCabinWarningIconElements.length - 1; x >= 0; x-- )
	{
		mixedCabinWarningIconElements[x].parentNode.removeChild( mixedCabinWarningIconElements[x] );
	}



}



function readOptions()
{
	
	//only works in GreaseMonkey, not Chrome
	//var header = "Easy United Award Search Options v" + GM_info.script.version;

	GM_config.init( "Easy United Award Search Options", 
	//GM_config.init( header, 
	/* Fields object */ 
	{
		'insertNavButtons':
		{
			'label': 'Insert Nav Buttons', // Appears next to field
			'type': 'checkbox', // Makes this setting a text field
			'default': true // Default value if user doesn't change it
		},
		

		'hideStdAwards':
		{
			'label': 'Hide Standard Awards', // Appears next to field
			'type': 'checkbox', // Makes this setting a text field
			'default': true // Default value if user doesn't change it
		},


		'expandMixedCabin':
		{
			'label': 'Expand Mixed Cabin Info', // Appears next to field
			'type': 'checkbox', // Makes this setting a text field
			'default': true // Default value if user doesn't change it
		},
		
		
		'autoScrollToCalendar':
		{
			'label': 'Auto Scroll to Top of Calendar', // Appears next to field
			'type': 'checkbox', // Makes this setting a text field
			'default': true // Default value if user doesn't change it
		},
		
		'showEconomyAwards':
		{
			'section': ['Show These Award Types',''],
			'label': 'Show Economy Awards', 
			'type': 'checkbox',
			'default': true
		},
		
		'showBusinessAwards':
		{
			'label': 'Show Business/BusinessFirst/First (two-cabin) Awards',
			'type': 'checkbox',
			'default': true
		},
		
		'showFirstAwards':
		{
			'label': 'Show First (three-cabin) Awards',
			'type': 'checkbox',
			'default': true
		}
		
		
		
	} , ".indent40 { \
		    margin-left: auto !important; \
		    text-align: center !important; } \
		#config_header { \
		    font-size: 20pt !important; } \
		div.section_header_holder { \
		    margin-top: 0 !important; } \
		h2.section_header { \
		    text-align: left !important; } \
		.config_var .field_label { \
		    margin-left: 23px !important; } \
		.config_var input[type='checkbox'] { \
		    position: absolute !important; \
		    left: 5px !important; } \
		#field_customCSS{ \
		    display: block; \
		    font: 12px monospace; \
		    margin-left: 25px; }",
		{
		    save: function() {
		       location.reload();
		    },
		    open: function() {
		    	GM_config.addBorder();
		    	GM_config.resizeFrame('370px','320px'); // resize the config window
		    	GM_config.center();
		    }
		}	

	);
	
	
	insertNavButtons = GM_config.get('insertNavButtons');
	hideStdAwards = GM_config.get('hideStdAwards');
	expandMixedCabin = GM_config.get('expandMixedCabin');
	autoScrollToCalendar = GM_config.get('autoScrollToCalendar');
	showEconomyAwards = GM_config.get('showEconomyAwards');
	showBusinessAwards = GM_config.get('showBusinessAwards');
	showFirstAwards = GM_config.get('showFirstAwards');
		
}


function openOptionsDialog()
{
	//console.log( "inside openOptionsDialog" );
	GM_config.open();
	//console.log( "done opening dialog");
}


function createOptionsButton()
{


	var mainElement = getElementsByClass( "Contents", document, "div" );
	var target = mainElement[0];


	var optionsButton = document.createElement('input');
	optionsButton.setAttribute('id','jts_options');
	optionsButton.setAttribute('type','button');
	optionsButton.setAttribute('style','margin:0.5em 0em 0em 0em');
	optionsButton.setAttribute('value','Options');
	optionsButton.setAttribute('name','jts_options');
	optionsButton.addEventListener("click", openOptionsDialog, false);

	//tdElement.appendChild( optionsButton );


	target.parentNode.insertBefore(optionsButton, target.nextSibling );

	GM_addStyle("#jts_options { position: fixed; bottom: 10px; right: 25px; z-index: 222; background: yellow; }");


}


var noResultsReturned;

function testNoResults()
{
	noResultsReturned = false;

	var errorMessage = document.getElementById("ctl00_ContentInfo_ErrorMessage");
	if( errorMessage != undefined )
	{
		//console.log( "errorMessage.length is %s", errorMessage.innerHTML );
		GM_addStyle("#ctl00_ContentInfo_ErrorMessage { color:black; background:yellow; font-size:150%; }");
		noResultsReturned = true;
	}
	//else
	//{
	//	console.log( "errorMessage is undefined" );
	//}
}

function informUserOfFullFilter()
{
	
	var pageHeading = getElementsByClass( "PageHeading", document, "h1" );
	//console.log( "pageHeading.length = %d", pageHeading.length );
	
	if( pageHeading.length != 0 )
	{
		
		
		var h1Element = document.createElement('h1');
		
		
		var spanElement = document.createElement('span');
		spanElement.innerHTML = "All results have been filtered out.  There may be Saver awards in filtered classes";
		spanElement.setAttribute('id', 'jtsFilteredResultsWarning' );
		
		h1Element.appendChild( spanElement );
		
		pageHeading[0].parentNode.insertBefore( h1Element, pageHeading[0].nextSibling );
		
		GM_addStyle("#jtsFilteredResultsWarning { color:black; background:yellow; font-size:100%; }");
	
	}	
	
	
	
	
}


var originalNumAwardTypes = -1;

function determineNumAwardTypes()
{
	var awardClassHeaders = getElementsByClass( "cabin", document, "td" );
	console.log( "Number of class type headers = %d", awardClassHeaders.length );
	
	var numAwardClassHeaders = awardClassHeaders.length;
	
	originalNumAwardTypes = numAwardClassHeaders;

}


function hideClassColumns(lastColumn, colSpan)
{


	var awardClassHeaders = getElementsByClass( "cabin", document, "td" );
	console.log( "Number of class type headers = %d", awardClassHeaders.length );
	
	var numAwardClassHeaders = awardClassHeaders.length;
		
	if( lastColumn <= numAwardClassHeaders*2 )
	{
		
		for( var headerElement = awardClassHeaders.length - 1; headerElement >= 0; headerElement-- )
		{
			//This should be the td element
			console.log( "InnerHTML is %s", awardClassHeaders[headerElement].innerHTML );
			if( ( awardClassHeaders[headerElement].innerHTML == "Economy" ) && (lastColumn == 2 ) )
			{
				//console.log( "Found Economy Header" );
				//economyColumn = headerElement;

				//economyColSpan = awardClassHeaders[headerElement].getAttribute( "colspan" );
				//console.log( "Economy column colspan is %d", economyColSpan );

				var parent = awardClassHeaders[headerElement].parentNode;
				parent.removeChild( awardClassHeaders[headerElement] );
			}
			else if( ( awardClassHeaders[headerElement].innerHTML == "Business/ BusinessFirst / First (two-cabin flights)" ) && (lastColumn == 4 ) )
			{
				var parent = awardClassHeaders[headerElement].parentNode;
				parent.removeChild( awardClassHeaders[headerElement] );
			
			}
			else if( ( awardClassHeaders[headerElement].innerHTML == "First/ BusinessFirst" ) && (lastColumn == 4 ) )
			{
				var parent = awardClassHeaders[headerElement].parentNode;
				parent.removeChild( awardClassHeaders[headerElement] );
			
			}
			else if( ( awardClassHeaders[headerElement].innerHTML == "First (three-cabin flights)" ) && (lastColumn == 6 ) )
			{
				var parent = awardClassHeaders[headerElement].parentNode;
				parent.removeChild( awardClassHeaders[headerElement] );
			}
			else 
			{
				console.log( "Found non-economy header" );
			}
		}

		//now get rid of the Saver/Easypass headers for the class
		var awardTypeHeader = getElementsByClass( "trRewardPriceHdg", document, "tr" );
		var childElements = awardTypeHeader[1].getElementsByTagName("td");

		console.log( "Number of td element children = %d", childElements.length );

		for( var column = lastColumn-1; column >= lastColumn-colSpan; column-- )
		{
			awardTypeHeader[1].removeChild( childElements[column] );
		}




		var tableElement = getElementsByClass( "rewardResults", document, "table" );
		//console.log( "tableElement.length = %d", tableElement.length );

		if( tableElement.length != 0 )
		{


			var rows = tableElement[0].getElementsByTagName( "tr" );
			//console.log( "number of rows is %d", rows.length );

			for( var row = rows.length-1 ; row >= 0; row-- )
			{


				var tdElements = rows[row].getElementsByTagName( "td" );

				var tdRewardPriceElements = getElementsByClass( "tdRewardPrice", rows[row], "td" );
				//console.log( "number of reward blocks = %d", tdRewardPriceElements.length );

				if( tdRewardPriceElements.length > 0 )
				{
					for( var column = lastColumn-1; column >= lastColumn-colSpan; column-- )
					{
						tdRewardPriceElements[column].parentNode.removeChild( tdRewardPriceElements[column] );
					}
				}
			}
		}

		//adjust the colspan of ctl00_ContentInfo_resultsReward_showSegmentsReward1_tdHdgTop
		var awardAvailableHeader = document.getElementById('ctl00_ContentInfo_resultsReward_showSegmentsReward1_tdHdgTop');
		var currentColSpan = awardAvailableHeader.getAttribute( "colspan" );
		console.log( "current award avilable colspan is %d", currentColSpan );
		var newColSpan = currentColSpan - colSpan;
		console.log( "new award available colspan should be %d", newColSpan );
		awardAvailableHeader.setAttribute("colspan", newColSpan);


	}



}



function cleanUpEmptyRows()
{



	var tableElement = getElementsByClass( "rewardResults", document, "table" );
	//console.log( "tableElement.length = %d", tableElement.length );
	
	if( tableElement.length != 0 )
	{


		var rows = tableElement[0].getElementsByTagName( "tr" );
		//console.log( "number of rows is %d", rows.length );

		for( var row = rows.length-1 ; row >= 0; row-- )
		{


			var tdElements = rows[row].getElementsByTagName( "td" );

			var tdRewardPriceElements = getElementsByClass( "tdRewardPrice", rows[row], "td" );
			//console.log( "number of reward blocks = %d", tdRewardPriceElements.length );

			if( tdRewardPriceElements.length > 0 )
			{

				//if they all have divNA elements, then the row has no awards
				var hasAward = false;
				for( var column=0; column < tdRewardPriceElements.length; column++ )
				{
					//console.log( "loop start %d", column );
					//console.log( "tdRewardPrice block is %s", tdRewardPriceElements[column].innerHTML );
					var divNAElements = getElementsByClass( "divNA", tdRewardPriceElements[column], "div" );
					//console.log( "number of divNAElements elements is %d", divNAElements.length );
					if( divNAElements.length == 0 )
					{
						hasAward = true;
					}
				}



				if( !hasAward )
				{
					//the row does not have any awards, so remove the row
					rows[row].parentNode.removeChild( rows[row] );
				}

			}
			//else
			//{
			//	rows[row].parentNode.removeChild( rows[row] );
			//}
		}
	
	}


}


function findPos(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	return [curtop];
	}
}


testNoResults();

createOptionsButton();

readOptions();

determineNumAwardTypes();

//Don't allow all award types to be turned off
//turn the highest available class
if( !showFirstAwards && !showBusinessAwards && !showEconomyAwards )
{
	if( originalNumAwardTypes == 1 )
	{
		showEconomyAwards = true;
	}
	else if( originalNumAwardTypes == 2 )
	{
		showBusinessAwards = true;
	}
	else if( originalNumAwardTypes == 3 )
	{
		showFirstAwards = true;
	}
}

//if there were only two award types (business and economy) and both are filtered
//turn business back on
if( originalNumAwardTypes == 2 && !showEconomyAwards && !showBusinessAwards )
{
	showBusinessAwards = true;
}

//if there is only one award type (economy) and it i filtered
//turn it back on
if( originalNumAwardTypes == 1 && !showEconomyAwards )
{
	showEconomyAwards = true;
}

if( !showFirstAwards )
{
	hideClassColumns(6,2);
}

if( !showBusinessAwards )
{
	hideClassColumns(4,2);
}

if( !showEconomyAwards )
{

	hideClassColumns(2,2);
}




if( hideStdAwards )
{
	doRemoveStandardAwardOnlyRows();
	doRemoveStandardAwardColumns();
	
	if( !saverAwardsFound && !noResultsReturned )
	{
		informUserOfFullFilter();
	}
}

if( expandMixedCabin )
{
	doExpandAndHighlightMixedCabin();
}

if( insertNavButtons )
{
	doInsertNavButtons();
}


cleanUpEmptyRows();


if( autoScrollToCalendar && saverAwardsFound )
{
	var elem = document.getElementById( 'ctl00_ContentInfo_resultsReward_trCalendar' );
	//console.log( "elem is %s", elem);
	
	var offset = findPos( elem );
	//console.log( "offset is %d", offset );	
	
	window.scrollBy(0,offset);
}
else
{
	window.scrollBy(0,-50000);
}
