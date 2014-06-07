// ==UserScript==
// @name           BattleRoyaleKeyCut
// @namespace      ZxMYS
// @include        */game.php
// @author Zx.MYS modified by Tao Yang
// @Homepage http://ZxMYS.COM       
// ==/UserScript==




/**
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
                        'disable_in_input':false,
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
                                meta : { wanted:false, pressed:false}   //Meta is Mac specific
                        };
                        
                        if(e.ctrlKey)   modifiers.ctrl.pressed = true;
                        if(e.shiftKey)  modifiers.shift.pressed = true;
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
}


function $(id){
    return document.getElementById(id);
}

function sl(id){
    $(id).checked=true;
}

km="QWERTYUIOPASDFGHJKLZXCVBNM";
kmap = new Array(km.length*2) ;
for(i=0;i<km.length;i++){
    kmap[i]=km[i];
    kmap[i+26]="Alt+"+km[i];
}
moveto=document.getElementsByTagName('option');
for(i=0,j=0;i<moveto.length&&j<kmap.length;i++){
    if(moveto[i].innerHTML.indexOf("全员")!=-1)break;
    if(moveto[i].parentNode.id=="attmode"||moveto[i].innerHTML.indexOf("■")!=-1)continue;
    shortcut.add(kmap[j],function(e){
        $("key_"+(e.altKey?"Alt+":"")+String.fromCharCode(e.keyCode)).selected=true;
        eval($("key_"+(e.altKey?"Alt+":"")+String.fromCharCode(e.keyCode)).parentNode.parentNode.getAttribute('onclick'));
        //$("submit").click();
    });
    j++;
}




shortcut.add("Ctrl+1",function(e){
    $("lastform").innerHTML=$("cmd").innerHTML;
});

shortcut.add("Ctrl+2",function(e){
    $("cmd").innerHTML=$("lastform").innerHTML;
});

shortcut.add("space",function(e){
    $("submit").click();
});

/*for(i=1;i<=5;i++){
	shortcut("Ctrl"+i,function(e){
		$("itm"+String.fromCharCode(e.keyCode)).click();
		$("submit").click();
	});
}*/

for(i=0;i<=9;i++){
    shortcut.add(i+"",function(e){
        if(e.altKey||e.ctrlKey)return;
        if (parseInt(String.fromCharCode(e.keyCode)) == 0) {
            document.getElementsByName("command")[9].checked=true;
            //alert("jiong");
        } else {
            document.getElementsByName("command")[(parseInt(String.fromCharCode(e.keyCode))-1)%10].checked=true;
            //$("submit").click();
        }
    });
}

s=document.createElement("span");
s.style.display="none";
s.id="lastattmode";
s.innerHTML='modeP';
document.getElementsByTagName("body")[0].appendChild(s);
s=document.createElement("span");
s.style.display="none";
s.id="lastwid";
document.getElementsByTagName("body")[0].appendChild(s);
s=document.createElement("div");
s.style.display="none";
s.id="lastform";
document.getElementsByTagName("body")[0].appendChild(s);
$("cmd").parentNode.innerHTML+="<br/><hr/><form style=\"margin: 0px;\" name=\"cmd2\" id=\"cmd2\" method=\"post\"></form>";
s=document.createElement("div");
s.id="_notice";
$("notice").parentNode.insertBefore(s,$("notice"));
s=document.createElement("script");
s.setAttribute("language","javascript");
//s.text="var km='"+km+"';var help='Zx.MYS的GreaseMonkey脚本快捷键：Space:提交 Alt+1:攻击 Alt+2:扒尸  Alt+3:赠送 Alt+4:连击 Alt+5:抢劫商店 Ctrl+1:记录表单 Ctrl+2:读取表单 1/2/3/4/5/6/7/8/9/0:执行一般命令 设置攻击类型:<select id=\"attmode\" name=\"attmode\" onclick=\"modechange();\"><option id=\"modeC\" value=\"C\">投</option><option id=\"modeD\" value=\"D\" >暴</option><option id=\"modeP\" value=\"P\">殴</option><option id=\"modeK\" value=\"K\">斩</option><option id=\"modeG\" value=\"G\">射</option><option value=\"N\" id=\"modeN\">空手殴</option></select><span id=\\'keymap\\'></span>'; function insertAfter(newElement,targetElement) {  var parent = targetElement.parentNode;  if(parent.lastChild == targetElement) {    parent.appendChild(newElement);  }else{    parent.insertBefore(newElement,targetElement.nextSibling);  }} function init(){if(document.getElementsByName('wid')[0]!=null&&document.getElementsByName('wid')[0].parentNode.id!='cmd2'){document.getElementsByName('wid')[0].type='text';document.getElementById('lastwid').innerHTML=document.getElementsByName('wid')[0].value;}if(document.getElementsByName('command')[0].value.length==1)document.getElementsByName('command')[0].value=document.getElementsByName('attmode')[0].value;$('submit').disabled=false;$('_notice').innerHTML=help;var commands=document.getElementsByName('command');for(var i=0;i<Math.min(commands.length,10);i++){if(commands[i].parentNode.id==\"cmd2\")continue; var s=document.createElement('span');s.innerHTML='['+(i+1==10?0:i+1)+'] ';insertAfter(s,commands[i]);}var moveto=document.getElementsByTagName('option');var kmap = new Array(km.length*2);for(i=0;i<km.length;i++){kmap[i]=km[i];kmap[i+26]='Alt+'+km[i];}for(var i=0,j=0;i<moveto.length&&j<kmap.length;i++){if(moveto[i].innerHTML.indexOf('全员')!=-1)break;if(moveto[i].parentNode.id==\"attmode\"||moveto[i].parentNode.parentNode.id==\"cmd2\")continue;if(moveto[i].innerHTML.indexOf('■')!=-1){$('keymap').innerHTML+='<br/>';$('keymap').innerHTML+=moveto[i].innerHTML+' ';continue;}$('keymap').innerHTML+=kmap[j]+':'+moveto[i].innerHTML+' ';moveto[i].id='key_'+kmap[j];moveto[i].innerHTML='['+kmap[j]+'] '+moveto[i].innerHTML;j++}$($('lastattmode').innerHTML).selected=true;} function showGamedata(sGamedata){gamedata = sGamedata.parseJSON();if(gamedata['url']) {window.location.href = gamedata['url'];} else if(!gamedata['main']) {window.location.href = 'index.php';}if(gamedata['team']) {$('team').value = gamedata['team'];gamedata['team'] = '';}for(var id in gamedata) {if((id == 'toJSONString')||(!gamedata[id])) {continue;}$(id).innerHTML = gamedata[id];}init();} function modechange(){var commands=document.getElementsByName('command');for(var i=0;i<commands.length;i++){if(commands[i].value.length==1)commands[i].value=document.getElementsByName('attmode')[0].value;} $('lastattmode').innerHTML='mode'+document.getElementsByName('attmode')[0].value;} init(); ";
s.text="var km='"+km+"';var help='Zx.MYS的GreaseMonkey脚本快捷键：Space:提交 Ctrl+1:记录表单 Ctrl+2:读取表单 1/2/3/4/5/6/7/8/9/0:执行一般命令: <span id=\\'keymap\\'></span>'; function insertAfter(newElement,targetElement) {  var parent = targetElement.parentNode;  if(parent.lastChild == targetElement) {    parent.appendChild(newElement);  }else{    parent.insertBefore(newElement,targetElement.nextSibling);  }} function init(){if(document.getElementsByName('wid')[0]!=null&&document.getElementsByName('wid')[0].parentNode.id!='cmd2'){document.getElementsByName('wid')[0].type='text';document.getElementById('lastwid').innerHTML=document.getElementsByName('wid')[0].value;}if(document.getElementsByName('command')[0].value.length==1)document.getElementsByName('command')[0].value=document.getElementsByName('attmode')[0].value;$('submit').disabled=false;$('_notice').innerHTML=help;var commands=document.getElementsByName('command');for(var i=0;i<Math.min(commands.length,10);i++){if(commands[i].parentNode.id==\"cmd2\")continue; var s=document.createElement('span');s.innerHTML='['+(i+1==10?0:i+1)+'] ';insertAfter(s,commands[i]);}var moveto=document.getElementsByTagName('option');var kmap = new Array(km.length*2);for(i=0;i<km.length;i++){kmap[i]=km[i];kmap[i+26]='Alt+'+km[i];}for(var i=0,j=0;i<moveto.length&&j<kmap.length;i++){if(moveto[i].innerHTML.indexOf('全员')!=-1)break;if(moveto[i].parentNode.id==\"attmode\"||moveto[i].parentNode.parentNode.id==\"cmd2\")continue;if(moveto[i].innerHTML.indexOf('■')!=-1){$('keymap').innerHTML+='<br/>';$('keymap').innerHTML+=moveto[i].innerHTML+' ';continue;}$('keymap').innerHTML+=kmap[j]+':'+moveto[i].innerHTML+' ';moveto[i].id='key_'+kmap[j];moveto[i].innerHTML='['+kmap[j]+'] '+moveto[i].innerHTML;j++}$($('lastattmode').innerHTML).selected=true;} function showGamedata(sGamedata){gamedata = sGamedata.parseJSON();if(gamedata['url']) {window.location.href = gamedata['url'];} else if(!gamedata['main']) {window.location.href = 'index.php';}if(gamedata['team']) {$('team').value = gamedata['team'];gamedata['team'] = '';}for(var id in gamedata) {if((id == 'toJSONString')||(!gamedata[id])) {continue;}$(id).innerHTML = gamedata[id];}init();} function modechange(){var commands=document.getElementsByName('command');for(var i=0;i<commands.length;i++){if(commands[i].value.length==1)commands[i].value=document.getElementsByName('attmode')[0].value;} $('lastattmode').innerHTML='mode'+document.getElementsByName('attmode')[0].value;} init(); ";
document.getElementsByTagName("body")[0].appendChild(s);