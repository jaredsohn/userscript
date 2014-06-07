// ==UserScript==
// @name          Heello Keyboard Shortcuts 
// @namespace     http://userstyles.org
// @description   Heello Keyboard Shortcuts 
// @author        kawau
// @match         http://heello.com/*
// @match         https://heello.com/*
// @version       0.6
// ==/UserScript==

// Navigation
// 
// j: Next Ping 
// k: Previous Ping 
// gg: Scroll to top
// shift+g: Scroll to bottom
// 
// Actions
// 
// r: Reply 
// e: Echo 
// c: Repeat 
// f: Like 
// Enter: Open Ping details 
// n: New Ping 
// Shift+Enter or Ctrl+Enter: Send Ping
// 
// Timelines
// 
// gh: Home 
// gr: Replies 
// gl: What's Happening? 
// gp: Profile 
// gf: Likes 
// gs: Settings



/****************************************************************
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut = {
    'all_shortcuts':{},//All the shortcuts are stored in this array
    'add': function(shortcut_combination,callback,opt) {
        //Provide a set of default options
        var default_options = {
            'type':'keydown',
            'propagate':false,
            'disable_in_input':true,
            'target':document,
            'keycode':false
        }
        if(!opt) opt = default_options;
        else {
            for(var dfo in default_options) {
                if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
            }
        }

        var ele = opt.target;
        if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
        var ths = this;
        shortcut_combination = shortcut_combination.toLowerCase();

        //The function to be called at keypress
        var func = function(e) {
            e = e || window.event;

            if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
                var element;
                if(e.target) element=e.target;
                else if(e.srcElement) element=e.srcElement;
                if(element.nodeType==3) element=element.parentNode;

                if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
            }

            //Find Which key is pressed
            if (e.keyCode) code = e.keyCode;
            else if (e.which) code = e.which;
            var character = String.fromCharCode(code).toLowerCase();

            if(code == 188) character=","; //If the user presses , when the type is onkeydown
            if(code == 190) character="."; //If the user presses , when the type is onkeydown

            var keys = shortcut_combination.split("+");
            //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
            var kp = 0;

            //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
            var shift_nums = {
                "`":"~",
                "1":"!",
                "2":"@",
                "3":"#",
                "4":"$",
                "5":"%",
                "6":"^",
                "7":"&",
                "8":"*",
                "9":"(",
                "0":")",
                "-":"_",
                "=":"+",
                ";":":",
                "'":"\"",
                ",":"<",
                ".":">",
                "/":"?",
                "\\":"|"
            }
            //Special Keys - and their codes
            var special_keys = {
                'esc':27,
                'escape':27,
                'tab':9,
                'space':32,
                'return':13,
                'enter':13,
                'backspace':8,

                'scrolllock':145,
                'scroll_lock':145,
                'scroll':145,
                'capslock':20,
                'caps_lock':20,
                'caps':20,
                'numlock':144,
                'num_lock':144,
                'num':144,

                'pause':19,
                'break':19,

                'insert':45,
                'home':36,
                'delete':46,
                'end':35,

                'pageup':33,
                'page_up':33,
                'pu':33,

                'pagedown':34,
                'page_down':34,
                'pd':34,

                'left':37,
                'up':38,
                'right':39,
                'down':40,

                'f1':112,
                'f2':113,
                'f3':114,
                'f4':115,
                'f5':116,
                'f6':117,
                'f7':118,
                'f8':119,
                'f9':120,
                'f10':121,
                'f11':122,
                'f12':123
            }

            var modifiers = { 
                shift: { wanted:false, pressed:false},
                ctrl : { wanted:false, pressed:false},
                alt  : { wanted:false, pressed:false},
                meta : { wanted:false, pressed:false}    //Meta is Mac specific
            };

            if(e.ctrlKey)    modifiers.ctrl.pressed = true;
            if(e.shiftKey)    modifiers.shift.pressed = true;
            if(e.altKey)    modifiers.alt.pressed = true;
            if(e.metaKey)   modifiers.meta.pressed = true;

            for(var i=0; k=keys[i],i<keys.length; i++) {
                //Modifiers
                if(k == 'ctrl' || k == 'control') {
                    kp++;
                    modifiers.ctrl.wanted = true;

                } else if(k == 'shift') {
                    kp++;
                    modifiers.shift.wanted = true;

                } else if(k == 'alt') {
                    kp++;
                    modifiers.alt.wanted = true;
                } else if(k == 'meta') {
                    kp++;
                    modifiers.meta.wanted = true;
                } else if(k.length > 1) { //If it is a special key
                    if(special_keys[k] == code) kp++;

                } else if(opt['keycode']) {
                    if(opt['keycode'] == code) kp++;

                } else { //The special keys did not match
                    if(character == k) kp++;
                    else {
                        if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                            character = shift_nums[character]; 
                            if(character == k) kp++;
                        }
                    }
                }
            }

            if(kp == keys.length && 
                    modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
                    modifiers.shift.pressed == modifiers.shift.wanted &&
                    modifiers.alt.pressed == modifiers.alt.wanted &&
                    modifiers.meta.pressed == modifiers.meta.wanted) {
                        callback(e);

                        if(!opt['propagate']) { //Stop the event
                            //e.cancelBubble is supported by IE - this will kill the bubbling process.
                            e.cancelBubble = true;
                            e.returnValue = false;

                            //e.stopPropagation works in Firefox.
                            if (e.stopPropagation) {
                                e.stopPropagation();
                                e.preventDefault();
                            }
                            return false;
                        }
                    }
        }
        this.all_shortcuts[shortcut_combination] = {
            'callback':func, 
            'target':ele, 
            'event': opt['type']
        };
        //Attach the function with the event
        if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
        else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
        else ele['on'+opt['type']] = func;
    },

    //Remove the shortcut - just specify the shortcut and I will remove the binding
    'remove':function(shortcut_combination) {
        shortcut_combination = shortcut_combination.toLowerCase();
        var binding = this.all_shortcuts[shortcut_combination];
        delete(this.all_shortcuts[shortcut_combination])
            if(!binding) return;
        var type = binding['event'];
        var ele = binding['target'];
        var callback = binding['callback'];

        if(ele.detachEvent) ele.detachEvent('on'+type, callback);
        else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
        else ele['on'+type] = false;
    }
};

/**********************************************************/
/*           End of "shorcut.js"                          */
/**********************************************************/


// Add class name
function add_class_name(obj,add_classes){
    var tmp_hash = new Array();
    var new_class_names = new Array();
    var class_names = obj.className.split(" ").concat(add_classes.split(" "));
    for(var i in class_names){if(class_names[i] != ""){tmp_hash[class_names[i]] = 0;}}
    for(var key in tmp_hash){new_class_names.push(key);}
    obj.className = new_class_names.join(" ");
}

// Delete class name 
function delete_class_name(obj,delete_classes){
    var new_class_names = new Array();
    var class_names = obj.className.split(" ");
    var delete_class_names = delete_classes.split(" ");
    for(var i in class_names){
        var flag = true;
        for(var j in delete_class_names){
            if(class_names[i] == delete_class_names[j]){flag = false;break;};
        }
        if(flag){new_class_names.push(class_names[i])}
    }
    obj.className = new_class_names.join(" ");
}

// Send Ping
function shortPing(content) {
    var obj = new XMLHttpRequest();
    obj.open('POST', "https://heello.com/pings.json", true);
    obj.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    obj.send("text="+encodeURIComponent(content));
}

// Echo
function shortEcho(id) {
    var obj = new XMLHttpRequest();
    obj.open('POST', "https://heello.com/pings/" + id + "/echo", true);
    obj.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    obj.send('');
}

// Like
function shortLike(id) {
    var obj = new XMLHttpRequest();
    obj.open('POST', "https://heello.com/pings/" + id + "/like.json", true);
    obj.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    obj.send('');
}

// Button
function clickPing(){
    var forms = document.getElementsByTagName('form');
    if (forms[0].getElementsByTagName('textarea')[0].value){
        document.querySelector('div.modal-buttons input[type="button"].grey-button').click();
    }
    if (forms[1]) {
        if (forms[1].getElementsByTagName('textarea')[0].value){
            forms[1].querySelector('input[type="button"].grey-button').click();
        }
    }
    document.activeElement.blur();
}


// Scroll window
function scrollStream(elm) {
    var body = document.body;
    var html = document.documentElement;
    var rect = elm.getBoundingClientRect();
    var pos = {
        "left": rect.left + (body.scrollLeft || html.scrollLeft),
        "top" : rect.top  + (body.scrollTop || html.scrollTop) - (html.clientHeight)/2 + 90 
    }
    window.scrollTo(body.scrollLeft || html.scrollLeft, pos.top);
}

// Initialization
var username = document.querySelector('ul#navbar-user li span').textContent.replace(/^@/, '');

// Background-color of selected Ping 
var sh = document.styleSheets[0];
sh.insertRule("div.hovered-stream-item {background-color: #eff8ff;}", sh.cssRules.length);

var pnt = null;
var cmf = false;
var elements = document.getElementById('pings');

var newPing = document.querySelector('span#nav-compose.black-button img');
var click = function(n) {
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
    n.dispatchEvent(e);
};

// Keyboard shortcuts

// Navigation
//
// j: Next Ping
shortcut.add('j', function() {
    var hov = elements.querySelector('div.hovered-stream-item');
    if (pnt === null) {
        add_class_name(elements.querySelector('div[data-id]'), 'hovered-stream-item');
        pnt = 0;
    } else if (pnt >= 0 && pnt < elements.querySelectorAll('div[data-id]').length-1) {
        delete_class_name(hov, 'hovered-stream-item');
        add_class_name(elements.querySelectorAll('div[data-id]')[pnt+1], 'hovered-stream-item');
        pnt++;
    }
    var hov2 = elements.querySelector('div.hovered-stream-item');
    if (hov2) {
        scrollStream(hov2);
    }
});

// k: Previous Ping
shortcut.add('k', function() {
    var hov = elements.querySelector('div.hovered-stream-item');
    if (pnt === 0) {
        delete_class_name(hov, 'hovered-stream-item');
        pnt = null;
    } else if (pnt > 0) {
        delete_class_name(hov, 'hovered-stream-item');
        add_class_name(elements.querySelectorAll('div[data-id]')[pnt-1], 'hovered-stream-item');
        pnt--;
    }
    var hov2 = elements.querySelector('div.hovered-stream-item');
    if (hov2) {
        scrollStream(hov2);
    }
});

// shift+g: scroll to bottom
shortcut.add('shift+g', function() {
    var hov = elements.querySelector('div.hovered-stream-item');
    var pings = elements.querySelectorAll('div[data-id]');
    if (pnt !== null && pnt < pings.length-1) {
        delete_class_name(hov, 'hovered-stream-item');
    }
    pnt = pings.length-1;
    add_class_name(pings[pnt], 'hovered-stream-item');
    scrollStream(pings[pnt]);
});

// Actions
//
// e: Echo
shortcut.add('e', function() {
    var id;
    var hov = elements.querySelector('div.hovered-stream-item');
    if (hov) {
        id = hov.getAttribute('data-id');
    } else {
        id = elements.querySelector('div[data-id]').getAttribute('data-id');
    }
    shortEcho(id);
});

// c: Repeat
shortcut.add('c', function() {
    var content;
    var hov = elements.querySelector('div.hovered-stream-item');
    if (hov) {
        content = hov.querySelector('div.ping-text').textContent;        
    } else {
        content = elements.querySelector('div.ping-text').textContent;
    }
    shortPing(content);
});

// enter: Open Ping details
shortcut.add('enter', function() {
    window.location.href = elements.querySelector('div.hovered-stream-item div.username small a').href;
});

// n: New Ping
shortcut.add('n', function() {
    click(newPing);
});

// shift + enter: Send Ping
// ctrl + enter : Send Ping
shortcut.add('shift+enter', function() {
    clickPing();
}, { 'disable_in_input': false});

shortcut.add('ctrl+enter', function() {
    clickPing();
}, { 'disable_in_input': false});

// Timelines
//
//   g: Timeline Commands Flag ON
// g g: Scroll to top
shortcut.add('g', function() {
    if (cmf) {
        cmf = false;
        var hov = elements.querySelector('div.hovered-stream-item');
        if (hov) {
            delete_class_name(hov, 'hovered-stream-item');
        }
        pnt = null;
        window.scrollTo(document.body.scrollLeft || document.documentElement.scrollLeft, 0);
    } else {
        cmf = true;
    }
});

// g h: Home
shortcut.add('h', function() {
    if (cmf) {
        cmf = false;
        window.location.href = '/';
    }
});

//   r: Reply
// g r: Replies
shortcut.add('r', function() {
    if (cmf) {
        cmf = false;
        window.location.href = '/replies';
    } else {
        click(elements.querySelector('div.hovered-stream-item span.ping-reply img'));
    }
});

// g l: What's Happening?
shortcut.add('l', function() {
    if (cmf) {
        cmf = false;
        window.location.href = '/live';
    }
});

// g p: Profile
shortcut.add('p', function() {
    if (cmf) {
        cmf = false;
        window.location.href = '/' + username;
    }
});

// g s: Settings
shortcut.add('s', function() {
    if (cmf) {
        cmf = false;
        window.location.href = '/account/settings';
    }
});

//   f: Like      
// g f: Likes
shortcut.add('f', function() {
    if (cmf) {
        cmf = false;
        window.location.href = '/' + username + '/likes';
    } else {
        var hov = elements.querySelector('div.hovered-stream-item');
        if (hov) {
            id = hov.getAttribute('data-id');
            shortLike(id);
        }
    }
});

//
// esc: Close modal windows
shortcut.add('esc', function() {
    cmf = false;
    var closeButtons = document.querySelectorAll("div.modal-title div.modal-title-close");
    for (var i=0; i<closeButtons.length; i++) {
        click(closeButtons[i]);
    }
    document.activeElement.blur();
}, {'disable_in_input': false});
