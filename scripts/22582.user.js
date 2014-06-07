// ==UserScript==
// @name           RTM keyconfig
// @namespace      http://endflow.net/
// @description    change & customize keyboard shortcuts of Remember The Milk.
// @include        http://www.rememberthemilk.com/home/*/#section.tasks
// ==/UserScript==
// @author         Yuki KODAMA (twitter: kuy, skype: netkuy)
// @version        0.1.4
// @history        [2008-02-06] 0.1.0 first version
//                 [2008-02-10] 0.1.1 support Alt key and code optimize
//                 [2008-02-10] 0.1.2 support new syntax of keyconfig
//                 [2008-07-04] 0.1.3 update for Firefox 3 + GM 0.8
//                 [2008-11-12] 0.1.4 bugfix of keybind generator [thx Jason]

(function(){
var cfg = {
    keys: [
        ["esc", "taskList.taskSelectNone()"],
        ["space", "this.keyboardEntrySelect(ev)"],
        ["j", function(){
            var list = view.getViewList();
            if(list.keyboardPosition + 1 != list.entries.length){
                list.keyboardDown();
            }
        }],
        ["k", function(){
            var list = view.getViewList();
            if(list.keyboardPosition != 0){
                list.keyboardUp();
            }
        }],
        ["ctrl+d", "pagedown", function(){
            var list = view.getViewList();
            for(var i = 0; i < 5; i++){
                if(list.keyboardPosition + 1 == list.entries.length){break}
                list.keyboardDown();
            }
        }],
        ["ctrl+u", "pageup", function(){
            var list = view.getViewList();
            for(var i = 0; i < 5; i++){
                if(list.keyboardPosition == 0){break}
                list.keyboardUp();
            }
        }],
        ["l", "tab", function(){
            var tabs = view.getViewTabs();
            if(tabs.selected != tabs.entries.length - 1){
                tabs.selectRight();
            }
        }],
        ["h", "shift+tab", function(){
            var tabs = view.getViewTabs();
            if(tabs.selected != 0){
                tabs.selectLeft();
            }
        }],
        ["u", "control.undoLastAction()"]
    ],
    interval: 250
}
var w = this.unsafeWindow || window;
setTimeout(function(){with(w){
    if(!eventMgr){
        setTimeout(arguments.callee, cfg.interval);
        return;
    }
    var hotkeys = transConfig(cfg.keys);
    var code = "switch(pressed){\n";
    for(var k in hotkeys){
        code += "case " + hotkeys[k].code + ":\n\tif(false){}\n";
        hotkeys[k].forEach(function(hotkey){
            code += "\telse if(" + hotkey.cond + "){" + hotkey.func + "}\n";
        });
        code += "\tbreak;\n";
    }
    code += "default:break;}\n";
    var base = trimDeclare(eventMgr.bodyKeyPressHandler.toString());
    base = removeCode(base, "if (pressed > 48", "var currentView");
    var newcode = injectCode(base, "switch (pressed)", code);
    var script = document.createElement('SCRIPT');
    script.innerHTML = 'function gm_rtm_keyconfig(ev, ignoreCombo){\n' + newcode + '\n}';
    document.getElementById('content').appendChild(script);
    eventMgr.bodyKeyPressHandler = function(ev, ignoreCombo){
        gm_rtm_keyconfig.call(eventMgr, ev, ignoreCombo);
    };
}}, cfg.interval);
// remove "function ...(){" and "}"
function trimDeclare(code){
    return code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
}
// inject code before "mark"
function injectCode(base, mark, code){
    var pos = base.indexOf(mark);
    var firstHalf = base.substring(0, pos);
    var latterHalf = base.substr(pos);
    return firstHalf + code + latterHalf;
}
// remove code of region "from" ... "to"
function removeCode(base, from, to){
    var fromPos = base.indexOf(from);
    var toPos = base.indexOf(to);
    return base.slice(0, fromPos) + base.slice(toPos);
}
function transConfig(cfgkeys){
    var keys = {};
    for(var i = 0; i < cfgkeys.length; i++){
        var func = transFunc(cfgkeys[i][cfgkeys[i].length - 1]);
        for(var j = 0; j < cfgkeys[i].length - 1; j++){
            var hotkey = parseHotkey(cfgkeys[i][j]);
            hotkey.func = func;
            var name = "_" + hotkey.code;
            if(typeof keys[name] == "undefined"){(keys[name] = []).code = hotkey.code};
            keys[name].push(hotkey);
        }
    }
    return keys;
}
function transFunc(func){
    if(typeof func != "string"){func = trimDeclare(func.toString())}
    if(func[func.length - 1] != ";"){func += ";"}
    return func + "utility.stopEvent(ev);return false;";
}
function parseHotkey(hotkey){
    var tokens = hotkey.split("+");
    var modifiers = tokens.slice(0, -1);
    modifiers = modifiers.map(function(mod){return "ev." + mod + "Key"});
    var cond = modifiers.join(" && ");
    if(cond == ""){cond = "!ev.altKey && !ev.ctrlKey && !ev.shiftKey"}
    var code = getCharCode(tokens[tokens.length - 1]);
    return {code:code, cond:cond};
}
var KEYS={  esc:27,del:127,bs:8,enter:13,tab:9,space:32,left:37,up:38,
            right:39,down:40,pageup:33,pagedown:34,home:36,end:35,insert:45}
function getCharCode(str){
    if(str.length == 1){
        return str.charCodeAt(0);
    }else if(typeof KEYS[str] != "undefined"){
        return KEYS[str];
    }
    return null;
}
})();
