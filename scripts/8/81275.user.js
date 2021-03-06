// ==UserScript==
// @name           TVU Your Way
// @namespace      http://userscripts.org/scripts/show/81275
// @description    Filter results by dub/sub
// @include        http://tvunderground.org.ru/*
// @author         knoldesparker@gmail.com
// @version        0.0.8
// ==/UserScript==

// GM_config
// version        1.2.9
// copyright      JoeSimmons & SizzleMcTwizzle & IzzySoft
/* Instructions
GM_config is now cross-browser compatible.

To use it in a Greasemonkey-only user script you can just @require it.

To use it in a cross-browser user script you will need to manually
include the code at the beginning of your user script. In this case
it is also very important you change the "storage" value below to
something unique to prevent collisions between scripts. Also remeber
that in this case that stored settings will only be accessable on
the same domain they were saved.
*/

var dubs = [
	'catalan',
	'chinese',
	'danish',
	'dutch',
	'english',
	'english-catalan',
	'english-chinese',
	'english-french',
	'english-german',
	'english-italian',
	'english-japanese',
	'english-portuguese',
	'english-russian',
	'english-spanish',
	'french',
	'french-german',
	'french-italian',
	'french-japanese',
	'french-spanish',
	'german',
	'german-spanish',
	'greek',
	'hebrew',
	'italian',
	'japanese',
	'japanese-italian',
	'korean',
	'polish',
	'portuguese',
	'russian',
	'spanish',
	'swedish'
];
var subs = [
	'catalan',
	'chinese',
	'danish',
	'dutch',
	'english',
	'english-chinese',
	'english-dutch',
	'english-french',
	'english-japanese',
	'english-portuguese',
	'english-spanish',
	'french',
	'french-german',
	'french-italian',
	'french-spanish',
	'german',
	'german-spanish',
	'greek',
	'hebrew',
	'italian',
	'japanese',
	'korean',
	'polish',
	'portuguese',
	'russian',
	'spanish',
	'swedish'
];
var GM_config = {
    storage: 'GM_config',
    // This needs to be changed to something unique for localStorage
    init: function () {
        // loop through GM_config.init() arguements
        for (var i = 0, l = arguments.length, arg; i < l; ++i) {
            arg = arguments[i];
            switch (typeof arg) {
            case 'object':
                for (var j in arg) { // could be a callback functions or settings object
                    if (typeof arg[j] != "function") { // we are in the settings object
                        var settings = arg; // store settings object
                        break; // leave the loop
                    } // otherwise we must be in the callback functions object
                    switch (j) {
                    case "open": // called when the frame is opened and loaded
                        this.onOpen = arg[j];
                        break; 
                    case "close": // called when frame is gone
                        this.onClose = arg[j];
                        break;
                    case "save": // called when settings have been saved
                        this.onSave = arg[j];
                        break; // store the settings objects
                    }
                }
                break;
            case 'function':
                this.onOpen = arg;
                break; // passing a bare function is set to open callback
                // could be custom CSS or the title string
            case 'string':
                if (arg.indexOf('{') != -1 && arg.indexOf('}') != -1) var css = arg;
                else this.title = arg;
                break;
            }
        }
        // if title wasn't passed through init()
        if (!this.title) this.title = 'Settings - Anonymous Script';
        var stored = this.read(), // read the stored settings
            passed_settings = {},
            passed_values = {};
        for (var i in settings) { // for each setting
            passed_settings[i] = settings[i];

            // if a setting was passed to init but wasn't stored then 
            //      if a default value wasn't passed through init() then use null
            //      else use the default value passed through init()
            // else use the stored value
            var value = typeof stored[i] == "undefined" ? 
                            typeof settings[i]['default'] == "undefined" ? null 
                            : settings[i]['default'] 
                        : stored[i];

            // If the value isn't stored and no default was passed through init()
            // try to predict a default value based on the type
            if (value === null) {
                switch (settings[i].type) {
                case 'radio': case 'select':
                    value = settings[i].options[0];
                    break;
                case 'checkbox':
                    value = false;
                    break;
                case 'int': case 'float':
                    value = 0;
                    break;
                default:
                    value = '';
                }
            }
            passed_values[i] = value;
        }
        this.settings = passed_settings; // store the settings object
        this.values = passed_values; // store the values
        if (css) this.css.stylish = css; // store the custom style
    },
    open: function () { // call GM_config.open() from your script to open the menu
        // Die if the menu is already open on this page
        if (document.evaluate("//iframe[@id='GM_config']", 
                               document, null, 9, null).singleNodeValue) return;

        // Create frame
        document.body.appendChild((this.frame = this.create('iframe', {
            id: 'GM_config',
            style: 'position:fixed; top:0; left:0; opacity:0; display:none; z-index:999;' +
                   ' width:50%; height:75%; max-height:95%; max-width:95%; ' +
                   'border:1px solid #000000; overflow:auto; z-index:10000;'
        })));
        this.frame.src = 'about:blank'; // In WebKit src can't be set until it is added to the page
        // we wait for the ifram to load before we can modify it
        this.frame.addEventListener('load', function () {
            var obj = GM_config,
                frameBody = this.contentDocument.getElementsByTagName('body')[0],
                create = obj.create,
                settings = obj.settings;

            // Append the style which is our default style plus the user style
            obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(
                obj.create('style', {
                type: 'text/css',
                textContent: obj.css.basic + obj.css.stylish
            }));

            // Add header and title
            frameBody.appendChild(obj.create('div', {
                id: 'header',
                className: 'config_header block center',
                textContent: obj.title
            }));

            // Append elements
            var anch = frameBody,
                secNo = 0; // anchor to append elements
            for (var i in settings) { // loop through settings object
                var type, field = settings[i],
                    Options = field.options,
                    label = field.label,
                    value = obj.values[i];

                if (field.section) { // the start of a new section
                    anch = frameBody.appendChild(create('div', {
                        className: 'section_header_holder',
                        kids: [
                            create('div', {
                            className: 'section_header center',
                            innerHTML: field.section[0]
                        })],
                        id: 'section_' + secNo
                    }));
                    if (field.section[1]) anch.appendChild(create('p', {
                        className: 'section_desc center',
                        innerHTML: field.section[1]
                    }));
                    ++secNo;
                }
                switch (field.type) {
                case 'textarea':
                    anch.appendChild(create('div', {
                        title: field.title || '',
                        kids: [
                            create('span', {
                            textContent: label,
                            className: 'field_label'
                        }),
                            create('textarea', {
                            id: 'field_' + i,
                            innerHTML: value,
                            cols: (field.cols ? field.cols : 20),
                            rows: (field.rows ? field.rows : 2)
                        })
                            ],
                        className: 'config_var'
                    }));
                    break;
                case 'radio':
                    var boxes = [];
                    for (var j = 0, len = Options.length; j < len; j++) {
                        boxes.push(create('span', {
                            textContent: Options[j]
                        }));
                        boxes.push(create('input', {
                            value: Options[j],
                            type: 'radio',
                            name: i,
                            checked: Options[j] == value ? true : false
                        }));
                    }
                    anch.appendChild(create('div', {
                        title: field.title || '',
                        kids: [
                            create('span', {
                            textContent: label,
                            className: 'field_label'
                        }),
                            create('div', {
                            id: 'field_' + i,
                            kids: boxes
                        })
                            ],
                        className: 'config_var'
                    }));
                    break;
                case 'select':
                    var options = new Array();
                    for (var j in Options)
                    options.push(create('option', {
                        textContent: Options[j],
                        value: j,
                        selected: Options[j] == value ? true : false
                    }));
                    anch.appendChild(create('div', {
                        title: field.title || '',
                        kids: [
                            create('span', {
                            textContent: label,
                            className: 'field_label'
                        }),
                            create('select', {
                            id: 'field_' + i,
                            kids: options
                        })
                            ],
                        className: 'config_var'
                    }));
                    break;
                case 'checkbox':
                    anch.appendChild(create('div', {
                        title: field.title || '',
                        kids: [
                            create('label', {
                            textContent: label,
                            className: 'field_label',
                            "for": 'field_' + i
                        }),
                            create('input', {
                            id: 'field_' + i,
                            type: 'checkbox',
                            value: value,
                            checked: value
                        })
                            ],
                        className: 'config_var'
                    }));
                    break;
                case 'button':
                    var tmp;
                    anch.appendChild(create('div', {
                        kids: [
                            (tmp = create('input', {
                            id: 'field_' + i,
                            type: 'button',
                            value: label,
                            size: (field.size ? field.size : 25),
                            title: field.title || ''
                        }))
                            ],
                        className: 'config_var'
                    }));
                    if (field.script) obj.addEvent(tmp, 'click', field.script);
                    break;
                case 'hidden':
                    anch.appendChild(create('div', {
                        title: field.title || '',
                        kids: [
                            create('input', {
                            id: 'field_' + i,
                            type: 'hidden',
                            value: value
                        })
                            ],
                        className: 'config_var'
                    }));
                    break;
                default:
                    // type = text, int, or float
                    anch.appendChild(create('div', {
                        title: field.title || '',
                        kids: [
                            create('span', {
                            textContent: label,
                            className: 'field_label'
                        }),
                            create('input', {
                            id: 'field_' + i,
                            type: 'text',
                            value: value,
                            size: (field.size ? field.size : 25)
                        })
                            ],
                        className: 'config_var'
                    }));
                }
            }

            // Add save and close buttons
            frameBody.appendChild(obj.create('div', {
                id: 'buttons_holder',
                kids: [
                    obj.create('button', {
                    id: 'saveBtn',
                    textContent: 'Save',
                    title: 'Save options and close window',
                    className: 'saveclose_buttons',
                    onclick: function () {
                        GM_config.close(true)
                    }
                }),
                    obj.create('button', {
                    id: 'cancelBtn',
                    textContent: 'Cancel',
                    title: 'Close window',
                    className: 'saveclose_buttons',
                    onclick: function () {
                        GM_config.close(false)
                    }
                }),
                    obj.create('div', {
                    className: 'reset_holder block',
                    kids: [
                        obj.create('a', {
                        id: 'resetLink',
                        textContent: 'Restore to default',
                        href: '#',
                        title: 'Restore settings to default configuration',
                        className: 'reset',
                        onclick: obj.reset
                    })
                        ]
                })]
            }));

            obj.center(); // Show and center iframe
            window.addEventListener('resize', obj.center, false); // Center frame on resize
            if (obj.onOpen) obj.onOpen(GM_config.frame.contentDocument, 
                                       GM_config.frame.contentWindow, 
                                       GM_config.frame); // Call the open() callback function
            // Close frame on window close
            window.addEventListener('beforeunload', function () {
                GM_config.remove(this);
            },
            false);
        },
        false);
    },
    close: function (save) {
        if (save) {
            var type, fields = this.settings,
                isNum = /^[\d\.]+$/,
                typewhite = /radio|text|hidden|checkbox/;
            for (f in fields) {
                var field = this.frame.contentDocument.getElementById('field_' + f);
                if (typewhite.test(field.type)) type = field.type;
                else type = field.tagName.toLowerCase();
                switch (type) {
                case 'text':
                    this.values[f] = (this.settings[f].type == 'text') ? field.value :
                                     (((isNum.test(field.value || field.value == '0')) &&
                                     (this.settings[f].type == 'int' || this.settings[f].type 
                                      == 'float')) ? parseFloat(field.value) : false);
                    if (this.values[f] === false) {
                        alert('Invalid type for field: ' + f + '\nPlease use type: ' + 
                              this.settings[f].type);
                        return;
                    }
                    break;
                case 'hidden':
                    this.values[f] = field.value.toString();
                    break;
                case 'textarea':
                    this.values[f] = field.value;
                    break;
                case 'checkbox':
                    this.values[f] = field.checked;
                    break;
                case 'select':
                    this.values[f] = field[field.selectedIndex].value;
                    break;
                case 'div':
                    var radios = field.getElementsByTagName('input');
                    if (radios.length > 0) 
                        for (var i = radios.length - 1; i >= 0; i--) 
                            if (radios[i].checked) 
                                this.values[f] = radios[i].value;
                    break;
                }
            }
            if (this.onSave) this.onSave(); // Call the save() callback function
            this.save();
        }
        if (this.frame) this.remove(this.frame);
        delete this.frame;
        if (this.onClose) this.onClose(); //  Call the close() callback function
    },
    set: function (name, val) {
        this.values[name] = val;
    },
    get: function (name) {
        return this.values[name];
    },
    isGM: typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',
    log: (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),
    save: function (store, obj) {
        try {
            if (!this.isGM)
                var setValue = function (name, value) {
                                       return localStorage.setItem(name, value);
                               },
                    stringify = JSON.stringify; // We only support JSON parser outside GM
      
            else
                var setValue = GM_setValue,
                    stringify = typeof JSON == "undefined" ? 
                                    function(obj) { 
                                        return obj.toSource();
                                    } : JSON.stringify;
            setValue(store || this.storage, stringify(obj || this.values));
        } catch(e) {
            this.log("GM_config failed to save settings!");
        }
    },
    read: function (store) {
        try {
            if (!this.isGM)
                var getValue = function(name, def){
                                      var s = localStorage.getItem(name); 
                                      return s == null ? def : s
                                  },
                    parser = JSON.parse; // We only support JSON parser outside GM
            else
                var getValue = GM_getValue,
                    parser = typeof JSON == "undefined" ? 
                                 function(jsonData) {
                                     return (new Function('return ' + jsonData + ';'))(); 
                                 } : JSON.parse;
            var rval = parser(getValue(store || this.storage, '{}'));
        } catch(e) {
            this.log("GM_config failed to read saved settings!");
            var rval = {};
        }
        return rval;
    },
    reset: function (e) {
        e.preventDefault();
        var type, obj = GM_config,
            fields = obj.settings;
        for (f in fields) {
            var field = obj.frame.contentDocument.getElementById('field_' + f);
            if (field.type == 'radio' || field.type == 'text' || 
                field.type == 'checkbox') type = field.type;
            else type = field.tagName.toLowerCase();
            switch (type) {
            case 'text':
                field.value = obj.settings[f]['default'] || '';
                break;
            case 'hidden':
                field.value = obj.settings[f]['default'] || '';
                break;
            case 'textarea':
                field.value = obj.settings[f]['default'] || '';
                break;
            case 'checkbox':
                field.checked = obj.settings[f]['default'] || false;
                break;
            case 'select':
                if (obj.settings[f]['default']) {
                    for (var i = field.options.length - 1; i >= 0; i--)
                        if (field.options[i].value == obj.settings[f]['default']) 
                            field.selectedIndex = i;
                } else field.selectedIndex = 0;
                break;
            case 'div':
                var radios = field.getElementsByTagName('input');
                if (radios.length > 0) 
                    for (var i = radios.length - 1; i >= 0; i--) 
                        if (radios[i].value == obj.settings[f]['default']) 
                            radios[i].checked = true;
                break;
            }
        }
    },
    values: {},
    settings: {},
    css: {
        basic: 'body {background:#FFFFFF;}\n' + '.indent40 {margin-left:40%;}\n' + 
               '* {font-family: arial, tahoma, sans-serif, myriad pro;}\n' + 
               '.field_label {font-weight:bold; font-size:12px; margin-right:6px;}\n' + 
               '.block {display:block;}\n' + '.saveclose_buttons {\n' + 
               'margin:16px 10px 10px 10px;\n' + 'padding:2px 12px 2px 12px;\n' + 
               '}\n.reset, #buttons_holder, .reset a {text-align:right; color:#000000;}\n' +
               '.config_header {font-size:20pt; margin:0;}\n' + 
               '.config_desc, .section_desc, .reset {font-size:9pt;}\n' + 
               '.center {text-align:center;}\n.section_header_holder {margin-top:8px; text-align:center;}\n' +
               '.config_var {margin:0px 0px 2px 0px; display:inline; background:#e0e0e0; border-right:2px solid #ffffff; border-left:2px solid #e0e0e0; text-align:left;}\n.section_header {font-size:13pt;' +
               'background:#414141; color:#FFFFFF; border:1px solid #000000; margin:0;}\n' +
               '.section_desc {font-size:9pt; background:#EFEFEF; color:#575757; ' + 
               'border:1px solid #CCCCCC; margin:0 0 6px 0;}\n' + 'input[type="radio"]' +
               ' {margin-right:8px;}',
        stylish: ''
    },
    create: function (a, b) {
        var ret = window.document.createElement(a);
        if (b) for (var prop in b) {
            if (prop.indexOf('on') == 0) 
                ret.addEventListener(prop.substring(2), b[prop], false);
            else if (prop == "kids" && (prop = b[prop])) 
                for (var i = 0; i < prop.length; i++) ret.appendChild(prop[i]);
            else if (",style,accesskey,id,name,src,href,for".indexOf("," + 
                     prop.toLowerCase()) != -1) ret.setAttribute(prop, b[prop]);
            else ret[prop] = b[prop];
        }
        return ret;
    },
    center: function () {
        var node = GM_config.frame,
            style = node.style,
            beforeOpacity = style.opacity;
        if (style.display == 'none') style.opacity = '0';
        style.display = '';
        style.top = Math.floor((window.innerHeight / 2) - (node.offsetHeight / 2)) + 'px';
        style.left = Math.floor((window.innerWidth / 2) - (node.offsetWidth / 2)) + 'px';
        style.opacity = '1';
    },
    run: function () {
        var script = this.getAttribute('script');
        if (script && typeof script == 'string' && script != '') {
            func = new Function(script);
            setTimeout(func, 0);
        }
    },
    addEvent: function (el, ev, scr) {
        el.addEventListener(ev, function () {
            typeof scr == 'function' ? setTimeout(scr, 0) : eval(scr)
        },
        false);
    },
    remove: function (el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
    }
};

GM_config.init(
	'Frontpage list', {
		'catalan': {
			'section': ['Dubbed', 'Remove series with following dubbed language:'],
			'label': 'Catalan',
			'type': 'checkbox',
			'default': true
		},
		'chinese': {
			'label': 'Chinese',
			'type': 'checkbox',
			'default': true
		},
		'danish': {
			'label': 'Danish',
			'type': 'checkbox',
			'default': false
		},
		'dutch': {
			'label': 'Dutch',
			'type': 'checkbox',
			'default': true
		},
		'english': {
			'label': 'English',
			'type': 'checkbox',
			'default': false
		},
		'english-catalan': {
			'label': 'English/Catalan',
			'type': 'checkbox',
			'default': true
		},
		'english-chinese': {
			'label': 'English/Chinese',
			'type': 'checkbox',
			'default': true
		},
		'english-french': {
			'label': 'English/French',
			'type': 'checkbox',
			'default': true
		},
		'english-german': {
			'label': 'English/German',
			'type': 'checkbox',
			'default': true
		},
		'english-italian': {
			'label': 'English/Italian',
			'type': 'checkbox',
			'default': true
		},
		'english-japanese': {
			'label': 'English/Japanese',
			'type': 'checkbox',
			'default': true
		},
		'english-portuguese': {
			'label': 'English/Portuguese',
			'type': 'checkbox',
			'default': true
		},
		'english-russian': {
			'label': 'English/Russian',
			'type': 'checkbox',
			'default': true
		},
		'english-spanish': {
			'label': 'English/Spanish',
			'type': 'checkbox',
			'default': true
		},
		'french': {
			'label': 'French',
			'type': 'checkbox',
			'default': true,
		},
		'french-german': {
			'label': 'French/German',
			'type': 'checkbox',
			'default': true
		},
		'french-italian': {
			'label': 'French/Italian',
			'type': 'checkbox',
			'default': true
		},
		'french-japanese': {
			'label': 'French/Japanese',
			'type': 'checkbox',
			'default': true
		},
		'french-spanish': {
			'label': 'French/Spanish',
			'type': 'checkbox',
			'default': true
		},
		'german': {
			'label': 'German',
			'type': 'checkbox',
			'default': true
		},
		'german-spanish': {
			'label': 'German/Spanish',
			'type': 'checkbox',
			'default': true
		},
		'greek': {
			'label': 'Greek',
			'type': 'checkbox',
			'default': true
		},
		'hebrew': {
			'label': 'Hebrew',
			'type': 'checkbox',
			'default': true
		},
		'italian': {
			'label': 'Italian',
			'type': 'checkbox',
			'default': true
		},
		'japanese': {
			'label': 'Japanese',
			'type': 'checkbox',
			'default': true
		},
		'japanese-italian': {
			'label': 'Japanese/Italian',
			'type': 'checkbox',
			'default': true
		},
		'korean': {
			'label': 'Korean',
			'type': 'checkbox',
			'default': true
		},
		'polish': {
			'label': 'Polish',
			'type': 'checkbox',
			'default': true
		},
		'portuguese': {
			'label': 'Portuguese',
			'type': 'checkbox',
			'default': true
		},
		'russian': {
			'label': 'Russian',
			'type': 'checkbox',
			'default': true
		},
		'spanish': {
			'label': 'Spanish',
			'type': 'checkbox',
			'default': true
		},
		'swedish': {
			'label': 'Swedish',
			'type': 'checkbox',
			'default': true
		},

		'catalan_s': {
			'section': ['Subtitles', 'Remove series with following subbed language:'],
			'label': 'Catalan',
			'type': 'checkbox',
			'default': true
		},
		'chinese_s': {
			'label': 'Chinese',
			'type': 'checkbox',
			'default': true
		},
		'danish_s': {
			'label': 'Danish',
			'type': 'checkbox',
			'default': false
		},
		'dutch_s': {
			'label': 'Dutch',
			'type': 'checkbox',
			'default': true
		},
		'english_s': {
			'label': 'English',
			'type': 'checkbox',
			'default': false
		},
		'english-chinese_s': {
			'label': 'English/Chinese',
			'type': 'checkbox',
			'default': true
		},
		'english-dutch_s': {
			'label': 'English/Dutch',
			'type': 'checkbox',
			'default': true
		},
		'english-french_s': {
			'label': 'English/French',
			'type': 'checkbox',
			'default': true
		},
		'english-japanese_s': {
			'label': 'English/Japanese',
			'type': 'checkbox',
			'default': true
		},
		'english-portuguese_s': {
			'label': 'English/Spanish',
			'type': 'checkbox',
			'default': true
		},
		'english-spanish_s': {
			'label': 'English/Portuguese',
			'type': 'checkbox',
			'default': true
		},
		'french_s': {
			'label': 'French',
			'type': 'checkbox',
			'default': true,
		},
		'french-german_s': {
			'label': 'French/German',
			'type': 'checkbox',
			'default': true,
		},
		'french-italian_s': {
			'label': 'French/Italian',
			'type': 'checkbox',
			'default': true,
		},
		'french-spanish_s': {
			'label': 'French/Spanish',
			'type': 'checkbox',
			'default': true,
		},
		'german_s': {
			'label': 'German',
			'type': 'checkbox',
			'default': true
		},
		'german-spanish_s': {
			'label': 'German/Spanish',
			'type': 'checkbox',
			'default': true
		},
		'greek_s': {
			'label': 'Greek',
			'type': 'checkbox',
			'default': true
		},
		'hebrew_s': {
			'label': 'Hebrew',
			'type': 'checkbox',
			'default': true
		},
		'italian_s': {
			'label': 'Italian',
			'type': 'checkbox',
			'default': true
		},
		'japanese_s': {
			'label': 'Japanese',
			'type': 'checkbox',
			'default': true
		},
		'korean_s': {
			'label': 'Korean',
			'type': 'checkbox',
			'default': true
		},
		'polish_s': {
			'label': 'Polish',
			'type': 'checkbox',
			'default': true
		},
		'portuguese_s': {
			'label': 'Portuguese',
			'type': 'checkbox',
			'default': true
		},
		'russian_s': {
			'label': 'Russian',
			'type': 'checkbox',
			'default': true
		},
		'spanish_s': {
			'label': 'Spanish',
			'type': 'checkbox',
			'default': true
		},
		'swedish_s': {
			'label': 'Swedish',
			'type': 'checkbox',
			'default': true
		},
	}
);

GM_registerMenuCommand("TVU Your Way", function(){GM_config.open();});

var tablerows = document.getElementsByTagName('tr');
	
for(i=0;i<tablerows.length;i++) {
	// Frontpage Dub
	if (tablerows[i].cells[1]) {
		if (tablerows[i].cells[1].childNodes[0]) {
			for(t=0;t<dubs.length;t++) {
				if (GM_config.get(dubs[t]) && tablerows[i].cells[1].childNodes[0].title == dubs[t]) {
					tablerows[i].style.display = 'none';
				}
			}
		}
	}
	// Frontpage Sub
	if (tablerows[i].cells[2]) {
		if (tablerows[i].cells[2].childNodes[0]) {
			for(cn=0;cn<tablerows[i].cells[2].childNodes.length;cn++) {
				for(t=0;t<subs.length;t++) {
					if (GM_config.get(subs[t] + '_s') && tablerows[i].cells[2].childNodes[cn].title == subs[t]) {
						tablerows[i].style.display = 'none';
					}
				}
			}
		}
	}
}

var tables = document.getElementsByTagName('table');

for(t=0;t<tables.length;t++) {
	if (tables[t].className == 'seriestable') {
		for(i=0;i<dubs.length;i++) {
			if (GM_config.get(dubs[i]) && tables[t].rows[0].cells[0].childNodes[3].title === dubs[i]) {
				tables[t].style.display = 'none';
			}
		}

		for(i=0;i<tables[t].rows.length;i++) {
			if (tables[t].rows[i].cells[4]) {
				if (tables[t].rows[i].cells[4].childNodes[0]) {
					for(cn=0;cn<tables[t].rows[i].cells[4].childNodes.length;cn++) {
						for(a=0;a<subs.length;a++) {
							if (GM_config.get(subs[a]+ '_s') && tables[t].rows[i].cells[4].childNodes[cn].title === subs[a]) {
								tables[t].rows[i].style.display = 'none';
							}
						}
					}
				}
			}
		}
	}
}

	
