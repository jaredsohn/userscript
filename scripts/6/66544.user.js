// ==UserScript==
// @name Facebook Sold Helper
// @namespace JustSold
// @description This script is starting to do alot of things, I'll document it all eventualy.
// @include http://apps.facebook.com/justsold/*
// @exclude http://apps.facebook.com/justsold/startall.php*
// @exclude http://apps.facebook.com/justsold/selltobank.php*
// @exclude http://apps.facebook.com/justsold/installed_sell.php*
// @exclude http://apps.facebook.com/justsold/postwall.php*
// @require http://sizzlemctwizzle.com/updater.php?id=66544
// ==/UserScript==
"use strict";
//window.addEventListener("load", function() {
var GM_config = {
    storage: 'GM_config',
    // This needs to be changed to something unique for localStorage
    init: function() {
        var i, j, l, arg, css, kid, settings, stored;
        // loop through GM_config.init() arguements
        for (i = 0, l = arguments.length, arg; i < l; i = i + 1) {
            arg = arguments[i];
            switch (typeof arg) {
            case 'object':
                for (j in arg) { // could be a callback functions or settings object
                    switch (j) {
                    case "open":
                        GM_config.onOpen = arg[j];
                        delete arg[j];
                        break; // called when frame is gone
                    case "close":
                        GM_config.onClose = arg[j];
                        delete arg[j];
                        break; // called when settings have been saved
                    case "save":
                        GM_config.onSave = arg[j];
                        delete arg[j];
                        break; // store the settings objects
                    default:
                        settings = arg;
                    }
                }
                break;
            case 'function':
                GM_config.onOpen = arg;
                break; // passing a bare function is set to open
                // could be custom CSS or the title string
            case 'string':
                if (arg.indexOf('{') !== -1 && arg.indexOf('}') !== -1) {
                    css = arg;
                } else {
                    GM_config.title = arg;
                }
                break;
            }
        }
        if (!GM_config.title) {
            GM_config.title = 'Settings - Anonymous Script'; // if title wasn't passed through init()
        }
        stored = GM_config.read(); // read the stored settings
        GM_config.passed_values = {};
        for (i in settings) {
            GM_config.doSettingValue(settings, stored, i, null, false);
            if (settings[i].kids) {
                for (kid in settings[i].kids) {
                    GM_config.doSettingValue(settings, stored, kid, i, true);
                }
            }
            GM_config.values = GM_config.passed_values;
            GM_config.settings = settings;
            if (css) {
                GM_config.css.stylish = css;
            }
        }
    },
    open: function() {
        var i, obj, anch, type;
        if (document.evaluate("//iframe[@id='GM_config']", document, null, 9, null).singleNodeValue) {
            return;
        }
        // Create frame
        document.body.appendChild((GM_config.frame = GM_config.create('iframe', {
            id: 'GM_config',
            style: 'position:fixed; top:0; left:0; opacity:0; display:none; z-index:999; width:75%; height:75%; max-height:95%; max-width:95%; border:1px solid #000000; overflow:auto;'
        })));
        GM_config.frame.src = 'about:blank'; // In WebKit src cant be set until it is added to the page
        GM_config.frame.addEventListener('load', function() {
            obj = GM_config, frameBody = this.contentDocument.getElementsByTagName('body')[0], create = obj.create, settings = obj.settings;
            obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(obj.create('style', {
                type: 'text/css',
                textContent: obj.css.basic + obj.css.stylish
            }));

            // Add header and title
            frameBody.appendChild(obj.create('div', {
                id: 'header',
                className: 'config_header block center',
                innerHTML: obj.title
            }));

            // Append elements
            anch = frameBody, secNo = 0; // anchor to append elements
            for (i in settings) {
                type, field = settings[i], value = obj.values[i];
                if (field.section) {
                    anch = frameBody.appendChild(create('div', {
                        className: 'section_header_holder',
                        kids: new Array(
                        create('div', {
                            className: 'section_header center',
                            innerHTML: field.section[0]
                        })),
                        id: 'section_' + secNo
                    }));
                    if (field.section[1]) anch.appendChild(create('p', {
                        className: 'section_desc center',
                        innerHTML: field.section[1]
                    }));
                    secNo++;
                }
                anch.appendChild(GM_config.addToFrame(field, i, false));
            }

            // Add save and close buttons
            frameBody.appendChild(obj.create('div', {
                id: 'buttons_holder',
                kids: new Array(
                obj.create('button', {
                    id: 'saveBtn',
                    textContent: 'Save',
                    title: 'Save options and close window',
                    className: 'saveclose_buttons',
                    onclick: function() {
                        GM_config.close(true)
                    }
                }), obj.create('button', {
                    id: 'cancelBtn',
                    textContent: 'Cancel',
                    title: 'Close window',
                    className: 'saveclose_buttons',
                    onclick: function() {
                        GM_config.close(false)
                    }
                }), obj.create('div', {
                    className: 'reset_holder block',
                    kids: new Array(
                    obj.create('a', {
                        id: 'resetLink',
                        textContent: 'Restore to default',
                        href: '#',
                        title: 'Restore settings to default configuration',
                        className: 'reset',
                        onclick: obj.reset
                    }))
                }))
            }));

            obj.center(); // Show and center it
            window.addEventListener('resize', obj.center, false); // Center it on resize
            if (obj.onOpen) obj.onOpen(); // Call the open() callback function
            // Close frame on window close
            window.addEventListener('beforeunload', function() {
                GM_config.remove(this);
            }, false);
        }, false);
    },
    close: function(save) {
        if (save) {
            var type, fields = GM_config.settings,
                typewhite = /radio|text|hidden|checkbox/;
            for (f in fields) {
                var field = GM_config.frame.contentDocument.getElementById('field_' + f),
                    kids = fields[f].kids;
                if (typewhite.test(field.type)) type = field.type;
                else type = field.tagName.toLowerCase();
                GM_config.doSave(f, field, type);
                if (kids) for (var kid in kids) {
                    var field = GM_config.frame.contentDocument.getElementById('field_' + kid);
                    if (typewhite.test(field.type)) type = field.type;
                    else type = field.tagName.toLowerCase();
                    GM_config.doSave(kid, field, type, f);
                }
            }
            if (GM_config.onSave) GM_config.onSave(); // Call the save() callback function
            GM_config.save();
        }
        if (GM_config.frame) GM_config.remove(GM_config.frame);
        delete GM_config.frame;
        if (GM_config.onClose) GM_config.onClose(); //  Call the close() callback function
    },
    set: function(name, val) {
        GM_config.values[name] = val;
    },
    get: function(name) {
        return GM_config.values[name];
    },
    isGM: typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',
    log: (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),
    save: function(store, obj) {
        try {
            var val = JSON.stringify(obj || GM_config.values);
            (GM_config.isGM ? GM_setValue : (function(name, value) {
                return localStorage.setItem(name, value)
            }))((store || GM_config.storage), val);
        } catch (e) {
            GM_config.log("GM_config failed to save settings!");
        }
    },
    read: function(store) {
        try {
            var val = (GM_config.isGM ? GM_getValue : (function(name, def) {
                return localStorage.getItem(name) || def
            }))((store || GM_config.storage), '{}'),
                rval;
            rval = JSON.parse(val);
        } catch (e) {
            GM_config.log("GM_config failed to read saved settings!");
            rval = {};
        }
        return rval;
    },
    reset: function(e) {
        e.preventDefault();
        var type, obj = GM_config,
            fields = obj.settings;
        for (f in fields) {
            var field = obj.frame.contentDocument.getElementById('field_' + f),
                kids = fields[f].kids;
            if (field.type == 'radio' || field.type == 'text' || field.type == 'checkbox') type = field.type;
            else type = field.tagName.toLowerCase();
            GM_config.doReset(field, type, null, f, null, false);
            if (kids) for (var kid in kids) {
                var field = GM_config.frame.contentDocument.getElementById('field_' + kid);
                if (field.type == 'radio' || field.type == 'text' || field.type == 'checkbox') type = field.type;
                else type = field.tagName.toLowerCase();
                GM_config.doReset(field, type, f, kid, true);
            }
        }
    },
    addToFrame: function(field, i, k) {
        var elem, obj = GM_config,
            anch = GM_config.frame,
            value = obj.values[i],
            Options = field.options,
            label = field.label,
            create = GM_config.create,
            isKid = k != null && k === true;
        switch (field.type) {
        case 'textarea':
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('span', {
                    textContent: label,
                    className: 'field_label'
                }), create('textarea', {
                    id: 'field_' + i,
                    innerHTML: value,
                    cols: (field.cols ? field.cols : 20),
                    rows: (field.rows ? field.rows : 2)
                })),
                className: 'config_var'
            });
            break;
        case 'radio':
            var boxes = new Array();
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
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('span', {
                    textContent: label,
                    className: 'field_label'
                }), create('span', {
                    id: 'field_' + i,
                    kids: boxes
                })),
                className: 'config_var'
            });
            break;
        case 'select':
            var options = new Array();
            if (!Options.inArray) for (var j in Options) options.push(create('option', {
                textContent: Options[j],
                value: j,
                selected: (j == value)
            }));
            else options.push(create("option", {
                textContent: "Error - options needs to be an object type, not an array.",
                value: "error",
                selected: true
            }));
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('span', {
                    textContent: label,
                    className: 'field_label'
                }), create('select', {
                    id: 'field_' + i,
                    kids: options
                })),
                className: 'config_var'
            });
            break;
        case 'checkbox':
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('label', {
                    textContent: label,
                    className: 'field_label',
                    "for": 'field_' + i
                }), create('input', {
                    id: 'field_' + i,
                    type: 'checkbox',
                    value: value,
                    checked: value
                })),
                className: 'config_var'
            });
            break;
        case 'button':
            var tmp;
            elem = create(isKid ? "span" : "div", {
                kids: new Array((tmp = create('input', {
                    id: 'field_' + i,
                    type: 'button',
                    value: label,
                    size: (field.size ? field.size : 25),
                    title: field.title || ''
                }))),
                className: 'config_var'
            });
            if (field.script) obj.addEvent(tmp, 'click', field.script);
            break;
        case 'hidden':
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('input', {
                    id: 'field_' + i,
                    type: 'hidden',
                    value: value
                })),
                className: 'config_var'
            });
            break;
        default:
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('span', {
                    textContent: label,
                    className: 'field_label'
                }), create('input', {
                    id: 'field_' + i,
                    type: 'text',
                    value: value,
                    size: (field.size ? field.size : 25)
                })),
                className: 'config_var'
            });
        }
        if (field.kids) {
            var kids = field.kids;
            for (var kid in kids) elem.appendChild(GM_config.addToFrame(kids[kid], kid, true));
        }
        return elem;
    },
    doSave: function(f, field, type, oldf) {
        var isNum = /^[\d\.]+$/,
            set = oldf ? GM_config.settings[oldf]["kids"] : GM_config.settings;
        switch (type) {
        case 'text':
            GM_config.values[f] = ((set[f].type == 'text') ? field.value : ((isNum.test(field.value) && ",int,float".indexOf("," + set[f].type) != -1) ? parseFloat(field.value) : false));
            if (set[f] === false) {
                alert('Invalid type for field: ' + f + '\nPlease use type: ' + set[f].type);
                return;
            }
            break;
        case 'hidden':
            GM_config.values[f] = field.value.toString();
            break;
        case 'textarea':
            GM_config.values[f] = field.value;
            break;
        case 'checkbox':
            GM_config.values[f] = field.checked;
            break;
        case 'select':
            GM_config.values[f] = field[field.selectedIndex].value;
            break;
        case 'span':
            var radios = field.getElementsByTagName('input');
            if (radios.length > 0) for (var i = radios.length - 1; i >= 0; i--) {
                if (radios[i].checked) GM_config.values[f] = radios[i].value;
            }
            break;
        }
    },
    doSettingValue: function(settings, stored, i, oldi, k) {
        var set = k != null && k == true && oldi != null ? settings[oldi]["kids"][i] : settings[i];
        if (",save,open,close".indexOf("," + i) == -1) {
            // The code below translates to:
            // if a setting was passed to init but wasn't stored then 
            //      if a default value wasn't passed through init() then use null
            //      else use the default value passed through init()
            // 		else use the stored value
            var value = typeof stored[i] == "undefined" ? (typeof set['default'] == "undefined" ? null : set['default']) : stored[i];

            // If the value isn't stored and no default was passed through init()
            // try to predict a default value based on the type
            if (value === null) {
                switch (set["type"]) {
                case 'radio':
                case 'select':
                    value = set.options[0];
                    break;
                case 'checkbox':
                    value = false;
                    break;
                case 'int':
                case 'float':
                    value = 0;
                    break;
                default:
                    value = (typeof stored[i] == "function") ? stored[i] : "";
                }
            }

        }
        GM_config.passed_values[i] = value;
    },
    doReset: function(field, type, oldf, f, k) {
        var isKid = k != null && k == true,
            obj = GM_config,
            set = isKid ? obj.settings[oldf]["kids"][f] : obj.settings[f];
        switch (type) {
        case 'text':
            field.value = set['default'] || '';
            break;
        case 'hidden':
            field.value = set['default'] || '';
            break;
        case 'textarea':
            field.value = set['default'] || '';
            break;
        case 'checkbox':
            field.checked = set['default'] || false;
            break;
        case 'select':
            if (set['default']) {
                for (var i = field.options.length - 1; i >= 0; i--)
                if (field.options[i].value == set['default']) field.selectedIndex = i;
            } else field.selectedIndex = 0;
            break;
        case 'span':
            var radios = field.getElementsByTagName('input');
            if (radios.length > 0) for (var i = radios.length - 1; i >= 0; i--) {
                if (radios[i].value == set['default']) radios[i].checked = true;
            }
            break;
        }
    },
    values: {},
    settings: {},
    css: {
        basic: 'body {background:#FFFFFF;}\n' + '.indent40 {margin-left:40%;}\n' + '* {font-family: arial, tahoma, sans-serif, myriad pro;}\n' + '.field_label {font-weight:bold; font-size:12px; margin-right:6px;}\n' + '.block {display:block;}\n' + '.saveclose_buttons {\n' + 'margin:16px 10px 10px 10px;\n' + 'padding:2px 12px 2px 12px;\n' + '}\n' + '.reset, #buttons_holder, .reset a {text-align:right; color:#000000;}\n' + '.config_header {font-size:20pt; margin:0;}\n' + '.config_desc, .section_desc, .reset {font-size:9pt;}\n' + '.center {text-align:center;}\n' + '.section_header_holder {margin-top:8px;}\n' + '.config_var {margin:0 0 4px 0; display:block;}\n' + '.section_header {font-size:13pt; background:#414141; color:#FFFFFF; border:1px solid #000000; margin:0;}\n' + '.section_desc {font-size:9pt; background:#EFEFEF; color:#575757; border:1px solid #CCCCCC; margin:0 0 6px 0;}\n' + 'input[type="radio"] {margin-right:8px;}',
        stylish: ''
    },
    create: function(a, b) {
        var ret = window.document.createElement(a);
        if (b) for (var prop in b) {
            if (prop.indexOf('on') == 0) ret.addEventListener(prop.substring(2), b[prop], false);
            else if (prop == "kids" && (prop = b[prop])) for (var i = 0; i < prop.length; i++) ret.appendChild(prop[i]);
            else if (",style,accesskey,id,name,src,href,for".indexOf("," + prop.toLowerCase()) != -1) ret.setAttribute(prop, b[prop]);
            else ret[prop] = b[prop];
        }
        return ret;
    },
    center: function() {
        var node = GM_config.frame,
            style = node.style,
            beforeOpacity = style.opacity;
        if (style.display == 'none') style.opacity = '0';
        style.display = '';
        style.top = Math.floor((window.innerHeight / 2) - (node.offsetHeight / 2)) + 'px';
        style.left = Math.floor((window.innerWidth / 2) - (node.offsetWidth / 2)) + 'px';
        style.opacity = '1';
    },
    run: function() {
        var script = GM_config.getAttribute('script');
        if (script && typeof script == 'string' && script != '') {
            func = new Function(script);
            window.setTimeout(func, 0);
        }
    },
    addEvent: function(el, ev, scr) {
        el.addEventListener(ev, function() {
            typeof scr == 'function' ? window.setTimeout(scr, 0) : eval(scr)
        }, false);
    },
    remove: function(el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
    }
};
// Sold Helper starts here!!!
GM_log('Begining of FB_SOLD_HELPER');
GM_config.init('Facebook Sold Helper', {
    'home_page': {
        'label': 'Auto Start/Sell when on home page?',
        'type': 'checkbox',
        'default': true
    },
    'quick_page': {
        'type': 'checkbox',
        'label': 'Auto start 12 hour all auctions when on quick start page?',
        'default': true
    },
    'hide_shaded': {
        'type': 'checkbox',
        'label': 'Hide shaded auctions that you cannot bid on anyway?',
        'default': true
    },
    'hide_old': {
        'type': 'checkbox',
        'label': 'Hide auctions that are > 7 DAYS old',
        'default': true
    },
    'hide_mission1': {
        'type': 'checkbox',
        'label': 'Hide Mission1 auctions that are not in your watch list?',
        'default': true
    },
    'hide_private': {
        'type': 'checkbox',
        'label': 'Hide auctions that have Private in their name?',
        'default': true
    },
    'hide_Linda_Kowall': {
        'type': 'checkbox',
        'label': 'Hide Linda Kowall? You cannot bid on her anyway!',
        'default': true
    },
    'hide_expensive': {
        'type': 'checkbox',
        'label': 'Hide auctions that you can not afford?',
        'default': true
    },
    'hide_bid_cap': {
        'type': 'checkbox',
        'label': 'Hide auctions that have reached their Bid Cap?',
        'default': true
    },
    'hide_i_am_high_bid': {
        'type': 'checkbox',
        'label': 'Hide auction where I am the high bidder?',
        'default': true
    },
    'hide_minimum_bid': {
        'type': 'checkbox',
        'label': 'Hide auctions below Min Amount?',
        'default': false
    },
    'myMinBid': {
        'type': 'int',
        'label': 'Min Amount',
        'default': 5000
    },
    'hide_maximum_bid': {
        'type': 'checkbox',
        'label': 'Hide auctions above Max Amount?',
        'default': false
    },
    'myMaxBid': {
        'type': 'int',
        'label': 'Max Amount',
        'default': 50000000000
    },
    'blockedFromSold': {
        'type': 'checkbox',
        'label': 'Hide if Multiple Account has been blocked from Sold?',
        'default': true
    },
    'liveFeedHides': {
        'type': 'checkbox',
        'label': 'Do expensive/min/max hides in Live Feed?',
        'default': true
    },
    'zeroAuctions': {
        'type': 'checkbox',
        'label': 'Hide if has zero auctions?',
        'default': true
    },
    'bankOwnes': {
        'type': 'checkbox',
        'label': 'hide Owner: Sold Bank auctions?',
        'default': false
    },
    'dropPrice': {
        'type': 'checkbox',
        'label': 'Cut price on Starts?',
        'default': false
    },
    'waitToSell': {
        'type': 'checkbox',
        'label': 'Wait until under an hour to Start or Sell?',
        'default': true
    }
});

function HideDivs(xpath, myReason) {
    try {
        var nodes = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (nodes) {
            //GM_log('HidDives: ' + xpath + ' : ' + myReason);
            for (var i = 0; i < nodes.snapshotLength; i++) {
                var olddiv = nodes.snapshotItem(i);
                var newdiv = document.createElement("div");
                newdiv.innerHTML = "<span>" + myReason + "</span>";
                olddiv.parentNode.replaceChild(newdiv, olddiv);
            }
        }

    } catch (e) {}
}

function ClickMe(xpath) {
    var node = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
    if (node) {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        node.dispatchEvent(evt);
    }
}

function visableRequest(text, maxBid) {
    xpath = '//div[@id="app28640100051_wactionDiv"]//span[contains(.,"' + text + '")]/ancestor::div[2]//span[contains(.,"Value:")]/following-sibling::span[1][translate(.,"$.","")>' + maxBid + ']/ancestor::div[3]';
    HideDivs(xpath, 'Has Reached Max Requested Bid.');
}

function Mcap(mission, maxBid) {
    xpath = '//div[2][contains(.,"' + mission + '")]/preceding-sibling::div/span[contains(.,"Value:")]/following-sibling::span[1][translate(.,"$.","")>' + maxBid + ']/ancestor::div[3]';
    HideDivs(xpath, 'Has reached Mission or Demention level Max Bid');
}

function SMcap(text, maxBid) {
    xpath = '//img[@title="' + text + '"]/ancestor::div[1]/preceding-sibling::div[1]/span[contains(.,"Value:")]/following-sibling::span[1][translate(.,"$.","")>' + maxBid + ']/ancestor::div[3]';
    HideDivs(xpath, 'Has reached CapX request.');

}

function addOptButton() {
    GM_log('IN addOptButton()');
    var helperDiv = document.createElement("div");
    helperDiv.innerHTML = '<div id="SoldHelper" style="position: absolute; top: 40px; right: 40px; width: 100px; margin: 0 auto 0 auto; background-color: #000000; color: #ffffff;"><span>Sold Helper Options</span></div>';
    document.body.insertBefore(helperDiv, document.body.firstChild);
    document.getElementById('SoldHelper').addEventListener('click', GM_config.open, false);
}

function checkForErrorPage() {
    GM_log('IN checkForErrorPage()');
    if (document.URL.match(/^http:\/\/.*=err.*$/)) {
        window.location.replace('http://apps.facebook.com/justsold/home.php');
    }

}

function bc(x) {
    return Math.round((+x - 1) / 1.11);
}

function doHiding() {
    window.setTimeout(function() {

        GM_log('IN doHiding()');
        var myCash = document.evaluate("round(translate(.//*[@id='pagelet_fbml_canvas_content']/div/div/div[1]/div[1]/div[2]/span/a,'$. ','') div 1.11)", document, null, XPathResult.NUMBER_TYPE, null).numberValue;

        if (isNaN(myCash)) {
            GM_log("Sorry, myCash is a NaN");
        }
        if (myCash == null) {
            GM_log("Sorry, myCash is a Null");
        }
        GM_log('myCash=' + myCash);
        var myFBid = document.evaluate("substring-after(.//*[@id='pagelet_fbml_canvas_content']/div/div/div[1]/div[1]/div[2]/span/a/@href,'id=')", document, null, XPathResult.STRING_TYPE, null).stringValue;
        GM_log('myFBid=' + myFBid);

        if (GM_config.get('liveFeedHides') == 1) {
            HideDivs('//div[@id="app28640100051_actionDivs4"]/div[*]/div/span[1]/img[@src="http://174.121.82.60/~soldapp/justsold/images/outb.gif"]/ancestor::div/span[2]/span[3][translate(.,"$.","")>' + myCash + ']/ancestor::div/span[2]', 'Too Expensive.');
            HideDivs('//div[@id="app28640100051_actionDivs4"]/div[*]/div/span[1]/img[@src="http://174.121.82.60/~soldapp/justsold/images/outb.gif"]/ancestor::div/span[2]/span[3][translate(.,"$.","")<' + GM_config.get('myMinBid') + ']/ancestor::div/span[2]', 'Below your requested Min Bid.');
        }
        if (GM_config.get('hide_i_am_high_bid') == 1) {
            HideDivs('//div[@id="app28640100051_wactionDiv"]//span[contains(.,"HighBidder:")]/following-sibling::span[1]//a[@href="./auction.php?user_id=' + myFBid + '"]/ancestor::div[3]', 'You are high bidder.');
        }
        if (GM_config.get('bankOwnes') == 1) {
            HideDivs('//div[@id="app28640100051_wactionDiv"]//span[contains(.,"Owner:")]/following-sibling::span[1]/a[@href="./auction.php?user_id=1435655169"]/ancestor::div[3]', 'Owned by Bank.');
        }
        if (GM_config.get('hide_old') == 1) {
            HideDivs('.//*[@id="app28640100051_wactionDiv"]/div[5]//span[contains(.,"days ago")]/.[translate(.,"lastonlinedayesago ","") > 7]/ancestor::div[3]', 'Old Auction.');
        }
        if (GM_config.get('hide_shaded') == 1) {
            HideDivs('//div[@id="app28640100051_wactionDiv"]//img[contains(@src, "snobid.gif")]/ancestor::div[3]', 'Shadded Bid Button.');
        }
        if (GM_config.get('hide_mission1') == 1) {
            HideDivs('//div[@id="app28640100051_wactionDiv"]//a[contains(.,"Add to Watchlist")]/ancestor::div[2][contains(.,"Mission1")]/ancestor::div[2]', 'Mission1 and not in watchlist.');
        }
        if (GM_config.get('hide_private') == 1) {
            HideDivs('//div[@id="app28640100051_wactionDiv"]/div[5]/div[*]/div[1]/a[contains(.,"Private")]/ancestor::div[2]', 'Name Contains Private.');
        }
        if (GM_config.get('hide_Linda_Kowall') == 1) {
            HideDivs('//div[@id="app28640100051_wactionDiv"]/div[5]/div[*]/div[1]/a[contains(.,"Linda Kowall")]/ancestor::div[2]', 'Sorry Linda.');
        }
        if (GM_config.get('blockedFromSold') == 1) {
            HideDivs('//*[@id="app28640100051_wactionDiv"]/div[5]/div[*]/div[2]/div[1]/span[contains(.,"Multiple Account has been blocked from Sold")]/ancestor::div[3]', 'Multiple Account has been blocked from Sold');
        }
        if (GM_config.get('zeroAuctions') == 1) {
            HideDivs('//div[@id="app28640100051_wactionDiv"]//span[contains(.,"Auctions:")]/following-sibling::span[1][.="0"]/ancestor::div[3]', 'has zero auctions');
        }
        if (GM_config.get('hide_minimum_bid') == 1) {
            HideDivs('//div[@id="app28640100051_wactionDiv"]//span[contains(.,"Value:")]/following-sibling::span[1][translate(.,"$.","")<' + bc(GM_config.get('myMinBid')) + ']/ancestor::div[3]', 'Below your requested MIN Bid.');
        }
        if (GM_config.get('hide_maximum_bid') == 1) {
            HideDivs('//div[@id="app28640100051_wactionDiv"]//span[contains(.,"Value:")]/following-sibling::span[1][translate(.,"$.","")>' + bc(GM_config.get('myMaxBid')) + ']/ancestor::div[3]', 'Above your requested MAX Bid.');
        }
        if (GM_config.get('hide_expensive') == 1) {
            HideDivs('//div[@id="app28640100051_wactionDiv"]//span[contains(.,"Value:")]/following-sibling::span[1][translate(.,"$.","")>' + myCash + ']/ancestor::div[3]', 'Too Expensive.');
        }
        if (GM_config.get('hide_bid_cap') == 1) {

            /* mission one grid */
            visableRequest('bids over 199mil', bc(200000000));
            visableRequest('bids over 299mil', bc(300000000));
            visableRequest('bids over 399mil', bc(400000000));
            visableRequest('bids over 499mil', bc(500000000));
            visableRequest('bids over 599mil', bc(600000000));
            visableRequest('bids over 699mil', bc(700000000));
            visableRequest('bids over 799mil', bc(800000000));
            visableRequest('bids over 899mil', bc(900000000));
            visableRequest('bids over 999mil', bc(1000000000));
            visableRequest('bids over 1,99bil', bc(2000000000));
            visableRequest('bids over 3,99bil', bc(4000000000));
            visableRequest('bids over 5,99bil', bc(6000000000));
            visableRequest('bids over 7,99bil', bc(8000000000));
            visableRequest('bids over 9,99bil', bc(10000000000));

            /* higher levels, not sure why these are not x,99 like above, but I'm treating them as above */
            visableRequest('bids over 10bil', bc(10000000000));
            visableRequest('bids over 15bil', bc(15000000000));
            visableRequest('bids over 20bil', bc(20000000000));
            visableRequest('bids over 25bil', bc(25000000000));
            visableRequest('bids over 30bil', bc(30000000000));
            visableRequest('bids over 35bil', bc(35000000000));
            visableRequest('bids over 40bil', bc(40000000000));
            visableRequest('bids over 45bil', bc(45000000000));
            visableRequest('bids over 50bil', bc(50000000000));
            visableRequest('bids over 55bil', bc(55000000000));

            Mcap('[Mission1]', bc(10000000000));
            Mcap('[Mission2]', bc(30000000000));
            Mcap('[Mission3]', bc(40000000000));
            Mcap('[Mission4]', bc(50000000000));
            Mcap('[Mission5]', bc(60000000000));

            Mcap('[Mission6]', bc(70000000000));
            SMcap('Using Cap3 at Mission6. Max Value until 50bil', bc(50000000000));
            SMcap('Using Cap2 at Mission6. Max Value until 40bil', bc(40000000000));
            SMcap('Using Cap1 at Mission6. Max Value until 30bil', bc(30000000000));

            Mcap('[Mission7]', bc(80000000000));
            SMcap('Using Cap3 at Mission7. Max Value until 60bil', bc(60000000000));
            SMcap('Using Cap2 at Mission7. Max Value until 50bil', bc(50000000000));
            SMcap('Using Cap1 at Mission7. Max Value until 40bil', bc(40000000000));

            Mcap('[Mission8]', bc(90000000000));
            SMcap('Using Cap3 at Mission8. Max Value until 70bil', bc(70000000000));
            SMcap('Using Cap2 at Mission8. Max Value until 60bil', bc(60000000000));
            SMcap('Using Cap1 at Mission8. Max Value until 50bil', bc(50000000000));

            Mcap('[Mission9]', bc(100000000000));
            SMcap('Using Cap3 at Mission9. Max Value until 80bil', bc(80000000000));
            SMcap('Using Cap2 at Mission9. Max Value until 70bil', bc(70000000000));
            SMcap('Using Cap1 at Mission9. Max Value until 60bil', bc(60000000000));

            Mcap('[Mission10]', bc(110000000000));
            SMcap('Using Cap3 at Mission10. Max Value until 90bil', bc(90000000000));
            SMcap('Using Cap2 at Mission10. Max Value until 80bil', bc(80000000000));
            SMcap('Using Cap1 at Mission10. Max Value until 70bil', bc(70000000000));

            /* I think Dim1+ also introduces a "time cap auction", but I don't understand it yet */

            Mcap('[DimensionI]', bc(120000000000));
            SMcap('Using Cap3 at Dimension I. Max Value until 80bil', bc(80000000000));
            SMcap('Using Cap2 at Dimension I. Max Value until 70bil', bc(70000000000));
            SMcap('Using Cap1 at Dimension I. Max Value until 60bil', bc(60000000000));

            Mcap('[DimensionII]', bc(130000000000));
            SMcap('Using Cap3 at Dimension II. Max Value until 90bil', bc(90000000000));
            SMcap('Using Cap2 at Dimension II. Max Value until 80bil', bc(80000000000));
            SMcap('Using Cap1 at Dimension II. Max Value until 70bil', bc(70000000000));

            Mcap('[DimensionIII]', bc(140000000000)); /* guessing on all the below, as I have never see any real ones yet */
            SMcap('Using Cap3 at Dimension III. Max Value until 90bil', bc(100000000000));
            SMcap('Using Cap2 at Dimension III. Max Value until 80bil', bc(90000000000));
            SMcap('Using Cap1 at Dimension III. Max Value until 70bil', bc(80000000000));

            Mcap('[DimensionIV]', bc(150000000000));
            SMcap('Using Cap3 at Dimension III. Max Value until 90bil', bc(110000000000));
            SMcap('Using Cap2 at Dimension III. Max Value until 80bil', bc(100000000000));
            SMcap('Using Cap1 at Dimension III. Max Value until 70bil', bc(90000000000));

            Mcap('[DimensionV]', bc(160000000000));
            SMcap('Using Cap3 at Dimension III. Max Value until 90bil', bc(120000000000));
            SMcap('Using Cap2 at Dimension III. Max Value until 80bil', bc(110000000000));
            SMcap('Using Cap1 at Dimension III. Max Value until 70bil', bc(100000000000));

            Mcap('[DimensionVI]', bc(170000000000));
            SMcap('Using Cap3 at Dimension III. Max Value until 90bil', bc(130000000000));
            SMcap('Using Cap2 at Dimension III. Max Value until 80bil', bc(120000000000));
            SMcap('Using Cap1 at Dimension III. Max Value until 70bil', bc(110000000000));

            Mcap('[DimensionVII]', bc(180000000000));
            SMcap('Using Cap3 at Dimension III. Max Value until 90bil', bc(140000000000));
            SMcap('Using Cap2 at Dimension III. Max Value until 80bil', bc(130000000000));
            SMcap('Using Cap1 at Dimension III. Max Value until 70bil', bc(120000000000));

            Mcap('[DimensionVIII]', bc(190000000000));
            SMcap('Using Cap3 at Dimension III. Max Value until 90bil', bc(150000000000));
            SMcap('Using Cap2 at Dimension III. Max Value until 80bil', bc(140000000000));
            SMcap('Using Cap1 at Dimension III. Max Value until 70bil', bc(130000000000));

            Mcap('[DimensionIX]', bc(200000000000));
            SMcap('Using Cap3 at Dimension III. Max Value until 90bil', bc(160000000000));
            SMcap('Using Cap2 at Dimension III. Max Value until 80bil', bc(150000000000));
            SMcap('Using Cap1 at Dimension III. Max Value until 70bil', bc(140000000000));

            Mcap('[DimensionX]', bc(210000000000));
            SMcap('Using Cap3 at Dimension III. Max Value until 90bil', bc(170000000000));
            SMcap('Using Cap2 at Dimension III. Max Value until 80bil', bc(160000000000));
            SMcap('Using Cap1 at Dimension III. Max Value until 70bil', bc(150000000000));
        }
    }, 1000);

}

function StartPages() {
    GM_log('IN StartPages()');
    addOptButton();
    if (document.URL.match(/^http:\/\/apps\.facebook\.com\/justsold\/all_auctions\.php.*$/)) {
        GM_log('ON PAGE all_auctions');
        doHiding();
        window.setTimeout(function() {
            window.location.replace(window.location);
        }, 60000);
    }
    if (document.URL.match(/^http:\/\/apps\.facebook\.com\/justsold\/bidlist.php\?bidder_id.*$/)) {
        doHiding();
    }

    if (document.URL.match(/^http:\/\/apps\.facebook\.com\/justsold\/home\.php\?show=ends.*$/)) {
        if (GM_config.get('quick_page') == 1) {
            var qsa_checkbox = document.evaluate('//*[@id="app28640100051_check1"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
            if (qsa_checkbox) { /* Select All */
                ClickMe('//*[@id="app28640100051_out2"]/../input[1]'); /*Start auction*/
                ClickMe('//*[@id="app28640100051_out2"]');
            }
        }
        window.setTimeout(function() {
            window.location.replace('http://apps.facebook.com/justsold/home.php?show=ends');
        }, 60000);
    }
    if (document.URL.match(/^http:\/\/apps\.facebook\.com\/justsold\/startall\.php.*$/)) {
        window.setTimeout(function() {
            window.location.replace('http://apps.facebook.com/justsold/home.php?show=ends');
        }, 60000);
    }
    if (document.URL.match(/^http:\/\/apps\.facebook\.com\/justsold\/home\.php.*$/)) {
        if (GM_config.get('home_page') == 1) {
            window.setInterval(function() {
                if (GM_config.get('waitToSell') == 1) {
                    ClickMe('//*[@id="app28640100051_actionDivs3"]/div[2]/div[1]/div[2]/div[1]/span[contains(.,"Autostart:")]/following-sibling::span[1]/span[not(contains(.,"hrs")) and contains(.,"sec")]/ancestor::div[1]/following-sibling::div[1]/span[contains(.,"min") or contains(.,"hr") or (substring-before(.,"day") <= 20)]/preceding-sibling::form/a[contains(.,"Start Auction")]');
                    ClickMe('//*[@id="app28640100051_actionDivs3"]/div[2]/div[1]/div[2]/div[1]/span[contains(.,"Autostart:")]/following-sibling::span[1]//span[not(contains(.,"hrs")) and contains(.,"sec")]/ancestor::span[1]/following-sibling::span[1][contains(.,"Offline")]/following-sibling::span[1][contains(.,"days")][number(translate(.,"lastonlinedaysago ",""))>=21]/ancestor::div[1]/following-sibling::div[1]/span[substring-before(.,"day")>=21]/preceding-sibling::form/a[contains(.,"Sell to bank")]');
                }
                if (GM_config.get('waitToSell') == 0) {
                    ClickMe('//*[@id="app28640100051_actionDivs3"]/div[2]/div[1]/div[2]/div[1]/span[contains(.,"Autostart:")]/following-sibling::span[1]/span/ancestor::div[1]/following-sibling::div[1]/span[contains(.,"min") or contains(.,"hr") or (substring-before(.,"day") <= 20)]/preceding-sibling::form/a[contains(.,"Start Auction")]');
                    ClickMe('//*[@id="app28640100051_actionDivs3"]/div[2]/div[1]/div[2]/div[1]/span[contains(.,"Autostart:")]/following-sibling::span[1]//span/ancestor::span[1]/following-sibling::span[1][contains(.,"Offline")]/following-sibling::span[1][contains(.,"days")][number(translate(.,"lastonlinedaysago ",""))>=21]/ancestor::div[1]/following-sibling::div[1]/span[substring-before(.,"day")>=21]/preceding-sibling::form/a[contains(.,"Sell to bank")]');
                }
                window.setTimeout(function() {
                    if (GM_config.get('dropPrice') == 1) {
                        try {
                            document.evaluate('//form/center[2]/span[4]/select', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.selectedIndex = 1;
                        } catch (e) {}
                    }
                    ClickMe('//input[@name="sellbank" or @name="ustartauction"]');
                }, 5000);
            }, 10000);
        }
    }
}
checkForErrorPage();
StartPages();
//},false);
