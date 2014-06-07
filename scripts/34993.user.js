// ==UserScript==
// @name           Reading Blinds
// @namespace      http://userscripts.org/
// @author         SUCCESS
// @description    护眼聚焦。“盖住”网页中不必要的区域，然后打开一扇适度的“阅读之窗”。
// @include        *
// @version        3
// ==/UserScript==

var showed = false;
var visible = false;
var size = window.innerHeight * 0.2; // 默认阅读区高度是窗口高度的 20%
var top_cover, bottom_cover;
var clientY;

var setShortcutKeysAction = '';
var show_hide_keycode, show_hide_shift, show_hide_ctrl, show_hide_alt; // 显示/隐藏 快捷键
var increase_keycode, increase_shift, increase_ctrl, increase_alt; // 扩大阅读区域 快捷键
var decrease_keycode, decrease_shift, decrease_ctrl, decrease_alt; // 缩小阅读区域 快捷键
var code2keyTable={'65':'A','66':'B','67':'C','68':'D','69':'E','70':'F','71':'G','72':'H','73':'I','74':'J','75':'K','76':'L','77':'M','78':'N','79':'O','80':'P','81':'Q','82':'R','83':'S','84':'T','85':'U','86':'V','87':'W','88':'X','89':'Y','90':'Z','48':'0','49':'1','50':'2','51':'3','52':'4','53':'5','54':'6','55':'7','56':'8','57':'9','96':'Numpad 0','97':'Numpad 1','98':'Numpad 2','99':'Numpad 3','100':'Numpad 4','101':'Numpad 5','102':'Numpad 6','103':'Numpad 7','104':'Numpad 8','105':'Numpad 9','106':'Numpad *','107':'Numpad +','108':'Numpad Enter','109':'Numpad -','110':'Numpad .','111':'Numpad /','112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12','8':'BackSpace','9':'Tab','12':'Clear','13':'Enter','16':'Shift','17':'Control','18':'Alt','20':'Cape Lock','27':'Esc','32':'Spacebar','33':'Page Up','34':'Page Down','35':'End','36':'Home','37':'Left Arrow','38':'Up Arrow','39':'Right Arrow','40':'Down Arrow','45':'Insert','46':'Delete','144':'Num Lock','186':';:','187':'=+','188':',<','189':'-_','190':'.>','191':'/?','192':'`~','219':'[{','220':'\|','221':']}','222':'"'};

// 注册 【设置 显示/隐藏 快捷键】 菜单
GM_registerMenuCommand('Reading Blinds - 设置 显示/隐藏 快捷键', function(){
	if(visible) hide();
    setShortcutKeysAction = 'show_hide';
    showShortcutKeySettings();
});

// 注册 【设置 扩大阅读区域 快捷键】 菜单
GM_registerMenuCommand('Reading Blinds - 设置 扩大阅读区域 快捷键', function(){
	if(visible) hide();
    setShortcutKeysAction = 'increase';
    showShortcutKeySettings();
});

// 注册 【设置 缩小阅读区域 快捷键】 菜单
GM_registerMenuCommand('Reading Blinds - 设置 缩小阅读区域 快捷键', function(){
	if(visible) hide();
    setShortcutKeysAction = 'decrease';
    showShortcutKeySettings();
});

// 初始化。读取各快捷键。
function init(){
    var keycodes, array;
	
	// 读取 显示/隐藏 快捷键
    keycodes = GM_getValue('show_hide', 'alt+116');
    array = keycodes.split('+');
    show_hide_keycode = array[array.length - 1];
    show_hide_shift = keycodes.indexOf('shift') > -1;
    show_hide_ctrl = keycodes.indexOf('ctrl') > -1;
    show_hide_alt = keycodes.indexOf('alt') > -1;
	
	// 读取 扩大阅读区域 快捷键
    keycodes = GM_getValue('increase', '107');
    array = keycodes.split('+');
    increase_keycode = array[array.length - 1];
    increase_shift = keycodes.indexOf('shift') > -1;
    increase_ctrl = keycodes.indexOf('ctrl') > -1;
    increase_alt = keycodes.indexOf('alt') > -1;
	
	// 读取 缩小阅读区域 快捷键
    keycodes = GM_getValue('decrease', '109');
    array = keycodes.split('+');
    decrease_keycode = array[array.length - 1];
    decrease_shift = keycodes.indexOf('shift') > -1;
    decrease_ctrl = keycodes.indexOf('ctrl') > -1;
    decrease_alt = keycodes.indexOf('alt') > -1;
}

// 显示设置快捷键的界面
function showShortcutKeySettings(){
	var cover = document.getElementById('setShortcutKey');
	var message = document.getElementById('message');
	if (!cover) {
		var cover = document.createElement('div');
		cover.setAttribute('id', 'setShortcutKey');
		cover.setAttribute('style', 'display: table; background: black; color: white; text-align: center; position: fixed; top:0; left:0; width:100%; height: 100%; opacity: .9; z-index:100;');
		var message = document.createElement('div');
		message.setAttribute('id', 'message');
		message.setAttribute('style', 'font-size: 200%; line-height: 1.5em; text-align: center; display: table-cell; vertical-align: middle; padding: 1em;');
	}
	switch (setShortcutKeysAction) {
		case 'show_hide':
			message.innerHTML = '功能：显示/隐藏<br />当前快捷键：<font color="red">' + parse2keys(GM_getValue('show_hide','alt+116')) + '</font><br />按 ESC 键保存当前设置并退出';
			break;
		case 'increase':
			message.innerHTML = '功能：扩大阅读区域<br />当前快捷键：<font color="red">' + parse2keys(GM_getValue('increase','107')) + '</font><br />按 ESC 键保存当前设置并退出';
			break;
		case 'decrease':
			message.innerHTML = '功能：缩小阅读区域<br />当前快捷键：<font color="red">' + parse2keys(GM_getValue('decrease','109')) + '</font><br />按 ESC 键保存当前设置并退出';
			break;
	}
    cover.appendChild(message);
    document.body.appendChild(cover);
}

// 关闭设置快捷键的界面
function hideShortcutKeySettings(){
    var cover = document.getElementById('setShortcutKey');
    cover.parentNode.removeChild(cover);
    setShortcutKeysAction = '';
}

// 将 keycode 转换成按键名称
function parse2keys(keycodes){
	var array = keycodes.split('+');
	array[array.length-1]=code2keyTable[array[array.length-1]] || '';
	return array.join('+');
}

// 打开 护眼聚焦
function show(){
    if (!showed) {
        top_cover = document.createElement('div');
        top_cover.setAttribute('style', 'background: black; width: 100%; position: fixed; left: 0; top: 0; opacity: .85; overflow: hidden; z-index: 100;');
        bottom_cover = document.createElement('div');
        bottom_cover.setAttribute('style', 'background: black; width: 100%; position: fixed; left: 0; bottom: 0; opacity: .85; overflow: hidden; z-index: 100;');
        var message = document.createElement('div');
        message.setAttribute('id', 'msgtip');
        message.setAttribute('style', 'text-align: right; padding: 1em; color: white;');
        message.innerHTML = '移动鼠标选择阅读区域。 “' + parse2keys(GM_getValue('increase', '107')) + '/' + parse2keys(GM_getValue('decrease', '109')) + '” 扩大/缩小阅读区域。 “' + parse2keys(GM_getValue('show_hide', 'alt+116')) + '” 显示/隐藏。';
        top_cover.appendChild(message);
        document.body.appendChild(top_cover);
        document.body.appendChild(bottom_cover);
        
        // 将阅读区移动到当前鼠标位置
        render(clientY);
        
        showed = true;
    }
    else {
        var message = document.getElementById('msgtip');
        message.innerHTML = '移动鼠标选择阅读区域。 “' + parse2keys(GM_getValue('increase', '107')) + '/' + parse2keys(GM_getValue('decrease', '109')) + '” 扩大/缩小阅读区域。 “' + parse2keys(GM_getValue('show_hide', 'alt+116')) + '” 显示/隐藏。';
        top_cover.style.display = '';
        bottom_cover.style.display = '';
        
        // 将阅读区移动到当前鼠标位置
        render(clientY);
    }
	
    // 移动鼠标选择阅读区域
    document.body.addEventListener('mousemove', function(event){
        clientY = event.clientY;
        if (visible) 
            render(clientY);
    }, false);
    
    visible = true;
}

// 关闭 护眼聚焦
function hide(){
    top_cover.style.display = 'none';
    bottom_cover.style.display = 'none';
    visible = false;
}

// 绘制阅读区域
function render(clientY){
    top_cover.style.height = clientY - size / 2 + 'px';
    bottom_cover.style.height = window.innerHeight - clientY - size / 2 + 'px';
}

// 设置快捷键
window.addEventListener('keydown', function(event){
    switch (setShortcutKeysAction) {
		// 显示/隐藏
        case 'show_hide':
            // ESC 退出
            if (event.keyCode == 27) {
				hideShortcutKeySettings();
                break;
            }

            show_hide_keycode = event.keyCode;
			show_hide_shift = event.shiftKey;
			show_hide_ctrl = event.ctrlKey;
			show_hide_alt = event.altKey;
			
            var Keys = '';
            if (show_hide_shift) {
                Keys += 'shift+';
            }
            if (show_hide_ctrl) {
                Keys += 'ctrl+';
            }
            if (show_hide_alt) {
                Keys += 'alt+';
            }
            
			var message = document.getElementById('message');
			message.innerHTML = '功能：显示/隐藏<br />当前快捷键：<font color="red">' + Keys + (code2keyTable[show_hide_keycode] || '') + '</font><br />按 ESC 键保存当前设置并退出';
			Keys += String(event.keyCode);
            GM_setValue('show_hide', Keys);
            break;
		// 扩大阅读区域
        case 'increase':
            // ESC 退出
            if (event.keyCode == 27) {
				hideShortcutKeySettings();
                break;
            }

            increase_keycode = event.keyCode;
			increase_shift = event.shiftKey;
			increase_ctrl = event.ctrlKey;
			increase_alt = event.altKey;
			
            var Keys = '';
            if (increase_shift) {
                Keys += 'shift+';
            }
            if (increase_ctrl) {
                Keys += 'ctrl+';
            }
            if (increase_alt) {
                Keys += 'alt+';
            }
            
			var message = document.getElementById('message');
			message.innerHTML = '功能：扩大阅读区域<br />当前快捷键：<font color="red">' + Keys + (code2keyTable[increase_keycode] || '') + '</font><br />按 ESC 键保存当前设置并退出';
			Keys += String(event.keyCode);
            GM_setValue('increase', Keys);
            break;
		// 缩小阅读区域
        case 'decrease':
            // ESC 退出
            if (event.keyCode == 27) {
				hideShortcutKeySettings();
                break;
            }

            decrease_keycode = event.keyCode;
			decrease_shift = event.shiftKey;
			decrease_ctrl = event.ctrlKey;
			decrease_alt = event.altKey;
			
            var Keys = '';
            if (decrease_shift) {
                Keys += 'shift+';
            }
            if (decrease_ctrl) {
                Keys += 'ctrl+';
            }
            if (decrease_alt) {
                Keys += 'alt+';
            }
            
			var message = document.getElementById('message');
			message.innerHTML = '功能：缩小阅读区域<br />当前快捷键：<font color="red">' + Keys + (code2keyTable[decrease_keycode] || '') + '</font><br />按 ESC 键保存当前设置并退出';
			Keys += String(event.keyCode);
            GM_setValue('decrease', Keys);
            break;
    }
}, true);

window.addEventListener('keyup', function(event){
    if (setShortcutKeysAction != '') return;
    // 显示/隐藏
    if ((event.altKey == show_hide_alt) && (event.ctrlKey == show_hide_ctrl) && (event.shiftKey == show_hide_shift) && (event.keyCode == show_hide_keycode)){
        if (!visible) {
            show();
        }
        else {
            hide();
        }
	} 
    
    // 调整阅读区域大小
    // 放大阅读区域
    else 
        if (visible && (event.altKey == increase_alt) && (event.ctrlKey == increase_ctrl) && (event.shiftKey == increase_shift) && (event.keyCode == increase_keycode)) {
            if (size < window.innerHeight / 2) {
                size += 5;
				render(clientY);
            }
        }
        // 缩小阅读区域
        else 
            if (visible && (event.altKey == decrease_alt) && (event.ctrlKey == decrease_ctrl) && (event.shiftKey == decrease_shift) && (event.keyCode == decrease_keycode)) {
                if (size > 10) {
                    size -= 5;
				render(clientY);
                }
            }
}, true);

init();