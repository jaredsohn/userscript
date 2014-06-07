// ==UserScript==
// @name           blinds
// @namespace      mtube
// @include        http://*
// ==/UserScript==

var showed = false;
var visible = false;
var hsize = window.innerHeight * 0.25; // 設定亮的為40%
var wsize = window.innerWidth * 0.25;
var top_cover, bottom_cover, left_cover, right_cover;
var clientX, clientY;
var AllDivTags = document.getElementsByTagName("div");
var maxWidth=0;
var divtop;
var divleft;
var state;
//

var setShortcutKeysAction = '';
var show_hide_keycode, show_hide_shift, show_hide_ctrl, show_hide_alt; // 顯示隱藏快速鍵
var increase_keycode, increase_shift, increase_ctrl, increase_alt; // 擴大
var decrease_keycode, decrease_shift, decrease_ctrl, decrease_alt; // 縮小
var wide_keycode, wide_shift, wide_ctrl, wide_alt; // 變寬
var narrow_keycode, narrow_shift, narrow_ctrl, narrow_alt; // 變窄

var code2keyTable={'65':'A','66':'B','67':'C','68':'D','69':'E','70':'F','71':'G','72':'H','73':'I','74':'J','75':'K','76':'L','77':'M','78':'N','79':'O','80':'P','81':'Q','82':'R','83':'S','84':'T','85':'U','86':'V','87':'W','88':'X','89':'Y','90':'Z','48':'0','49':'1','50':'2','51':'3','52':'4','53':'5','54':'6','55':'7','56':'8','57':'9','96':'Numpad 0','97':'Numpad 1','98':'Numpad 2','99':'Numpad 3','100':'Numpad 4','101':'Numpad 5','102':'Numpad 6','103':'Numpad 7','104':'Numpad 8','105':'Numpad 9','106':'Numpad *','107':'Numpad +','108':'Numpad Enter','109':'Numpad -','110':'Numpad .','111':'Numpad /','112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12','8':'BackSpace','9':'Tab','12':'Clear','13':'Enter','16':'Shift','17':'Control','18':'Alt','20':'Cape Lock','27':'Esc','32':'Spacebar','33':'Page Up','34':'Page Down','35':'End','36':'Home','37':'Left Arrow','38':'Up Arrow','39':'Right Arrow','40':'Down Arrow','45':'Insert','46':'Delete','144':'Num Lock','186':';:','187':'=+','188':',<','189':'-_','190':'.>','191':'/?','192':'`~','219':'[{','220':'\|','221':']}','222':'"'};

// 註冊快速鍵
GM_registerMenuCommand('Reading Blinds - 設置顯示 or 隱藏的快速鍵', function(){
	if(visible) hide();
    setShortcutKeysAction = 'show_hide';
    showShortcutKeySettings();
});

// 設定變大的快速鍵
GM_registerMenuCommand('Reading Blinds -  設定變大的快速鍵', function(){
	if(visible) hide();
    setShortcutKeysAction = 'increase';
    showShortcutKeySettings();
});

// 設定變小的快速鍵
GM_registerMenuCommand('Reading Blinds - 設定變小的快速鍵', function(){
	if(visible) hide();
    setShortcutKeysAction = 'decrease';
    showShortcutKeySettings();
});

// 設定變寬的快速鍵
GM_registerMenuCommand('Reading Blinds -  設定變寬的快速鍵', function(){
	if(visible) hide();
    setShortcutKeysAction = 'wide';
    showShortcutKeySettings();
});

// 設定變窄的快速鍵
GM_registerMenuCommand('Reading Blinds - 設定變窄的快速鍵', function(){
	if(visible) hide();
    setShortcutKeysAction = 'narrow';
    showShortcutKeySettings();
});

// 初始化, 讀取快速鍵。
function init(){
    var keycodes, array;
	// 讀取顯示隱藏的快速鍵
    keycodes = GM_getValue('show_hide', 'alt+74');
    array = keycodes.split('+');
    show_hide_keycode = array[array.length - 1];
    show_hide_shift = keycodes.indexOf('shift') > -1;
    show_hide_ctrl = keycodes.indexOf('ctrl') > -1;
    show_hide_alt = keycodes.indexOf('alt') > -1;
	
	// 讀取擴大的快速鍵
    keycodes = GM_getValue('increase', '107');
    array = keycodes.split('+');
    increase_keycode = array[array.length - 1];
    increase_shift = keycodes.indexOf('shift') > -1;
    increase_ctrl = keycodes.indexOf('ctrl') > -1;
    increase_alt = keycodes.indexOf('alt') > -1;
	
	// 讀取縮小的快速鍵
    keycodes = GM_getValue('decrease', '109');
    array = keycodes.split('+');
    decrease_keycode = array[array.length - 1];
    decrease_shift = keycodes.indexOf('shift') > -1;
    decrease_ctrl = keycodes.indexOf('ctrl') > -1;
    decrease_alt = keycodes.indexOf('alt') > -1;

	// 讀取變寬的快速鍵
    keycodes = GM_getValue('wide', '87');
    array = keycodes.split('+');
    wide_keycode = array[array.length - 1];
    wide_shift = keycodes.indexOf('shift') > -1;
    wide_ctrl = keycodes.indexOf('ctrl') > -1;
    wide_alt = keycodes.indexOf('alt') > -1;
	
	// 讀取變窄的快速鍵
    keycodes = GM_getValue('narrow', '78');
    array = keycodes.split('+');
    narrow_keycode = array[array.length - 1];
    narrow_shift = keycodes.indexOf('shift') > -1;
    narrow_ctrl = keycodes.indexOf('ctrl') > -1;
    narrow_alt = keycodes.indexOf('alt') > -1;

    for(i = 0; i<AllDivTags.length; i++)
    {
	d=AllDivTags[i].clientWidth;
	//alert("width"+d);
	if(maxWidth<d)
	{
		wsize=d;
		maxWidth=d;
		divtop = AllDivTags[i].offsetTop + 'px';
		divleft = AllDivTags[i].offsetLeft + 'px';		
	}

    }
    state = GM_getValue('blindstate','false');
    //alert(state);
    if(state=="true")	
    	show();
    else
    	hide();
}


// 快速鍵設定
function showShortcutKeySettings(){
	var cover = document.getElementById('setShortcutKey');
	var message = document.getElementById('message');
	if (!cover) {
		var cover = document.createElement('div');
		cover.setAttribute('id', 'setShortcutKey');
		cover.setAttribute('style', 'display: table; background: black; color: green; text-align: center; position: fixed; top:0; left:0; width:100%; height: 100%; opacity: .9; z-index:100000;');
		var message = document.createElement('div');
		message.setAttribute('id', 'message');
		message.setAttribute('style', 'font-size: 200%; line-height: 1.5em; text-align: center; display: table-cell; vertical-align: middle; padding: 1em;');
	}
	switch (setShortcutKeysAction) {
		case 'show_hide':
			message.innerHTML = '功能：顯示隱藏<br />目前快速鍵：<font color="red">' + parse2keys(GM_getValue('show_hide','alt+74')) + '</font><br />按 ESC save並退出';
			break;
		case 'increase':
			message.innerHTML = '功能：擴大<br />目前快速鍵：<font color="red">' + parse2keys(GM_getValue('increase','107')) + '</font><br />按 ESC save並退出';
			break;
		case 'decrease':
			message.innerHTML = '功能：縮小<br />目前快速鍵：<font color="red">' + parse2keys(GM_getValue('decrease','109')) + '</font><br />按 ESC save並退出';
			break;
		case 'wide':
			message.innerHTML = '功能：變寬<br />目前快速鍵：<font color="red">' + parse2keys(GM_getValue('wide','87')) + '</font><br />按 ESC save並退出';
			break;
		case 'narrow':
			message.innerHTML = '功能：變窄<br />目前快速鍵：<font color="red">' + parse2keys(GM_getValue('narrow','78')) + '</font><br />按 ESC save並退出';
			break;
	}
    cover.appendChild(message);
    document.body.appendChild(cover);
}

// 關閉設定快速鍵
function hideShortcutKeySettings(){
    var cover = document.getElementById('setShortcutKey');
    cover.parentNode.removeChild(cover);
    setShortcutKeysAction = '';
}

// 將keycode轉換成名稱
function parse2keys(keycodes){
	var array = keycodes.split('+');
	array[array.length-1]=code2keyTable[array[array.length-1]] || '';
	return array.join('+');
}

// 打開blind
function show(){
    if (!showed) {
        //var AllTags = document.getElementsByTagName("div");
	//alert("Div:"+AllTags.length);
	

        top_cover = document.createElement('div');
        top_cover.setAttribute('style', 'background: black; width: 100%; position: fixed; left: 0; top: 0; opacity: .85; overflow: hidden; z-index: 8000;');
        bottom_cover = document.createElement('div');
        bottom_cover.setAttribute('style', 'background: black; width: 100%; position: fixed; left: 0; bottom: 0; opacity: .85; overflow: hidden; z-index: 8000;');
				left_cover = document.createElement('div');
        left_cover.setAttribute('style', 'background: black; height: 100%;position: fixed;top:0; left:0; bottom:0; opacity: .85; overflow: hidden; z-index: 8000;');
        right_cover = document.createElement('div');
        right_cover.setAttribute('style', 'background: black; height: 100%; position: fixed; top:0 ; right:0;  opacity: .85; overflow: hidden; z-index: 8000;');
        var message = document.createElement('div');
        message.setAttribute('id', 'msgtip');
        message.setAttribute('style', 'text-align: right; padding: 1em; color: green; z-index:8000;');
        message.innerHTML = '移動滑鼠選擇閱讀區域。 “' + parse2keys(GM_getValue('wide', '87')) + '/' + parse2keys(GM_getValue('narrow', '78')) + '” 變寬/變窄。 “' +  parse2keys(GM_getValue('increase', '107')) + '/' + parse2keys(GM_getValue('decrease', '109')) + '” 擴大/縮小。 “' + parse2keys(GM_getValue('show_hide', 'alt+74')) + '”顯示/隱藏。';
        top_cover.appendChild(message);
	document.body.appendChild(top_cover);
        document.body.appendChild(bottom_cover);
	document.body.appendChild(left_cover);
        document.body.appendChild(right_cover);
	// 將閱讀區移到滑鼠所在位置
        render(clientX, clientY);
	showed = true;
       
    }
    else {
        var message = document.getElementById('msgtip');
        message.innerHTML = '移動滑鼠選擇閱讀區域。 “' + parse2keys(GM_getValue('increase', '87')) + '/' + parse2keys(GM_getValue('decrease', '78')) + '” 變寬/變窄。 “' + parse2keys(GM_getValue('increase', '107')) + '/' + parse2keys(GM_getValue('decrease', '109')) + '” 擴大/縮小。 “' + parse2keys(GM_getValue('show_hide', 'alt+74')) + '”顯示/隱藏。';
        top_cover.style.display = '';
        bottom_cover.style.display = '';
	left_cover.style.display = '';
        right_cover.style.display = '';
        
        // 將閱讀區移到滑鼠所在位置
        render(clientX, clientY);
    }
	
    // 移動滑鼠選擇閱讀區域
    document.body.addEventListener('mousemove', function(event){
        clientX = event.clientX;
        clientY = event.clientY;
        if (visible) 
            render(clientX,clientY);
    }, false);
    
    visible = true;
}

// 關閉blinds
function hide(){
    top_cover.style.display = 'none';
    bottom_cover.style.display = 'none';
    left_cover.style.display = 'none';
    right_cover.style.display = 'none';
    visible = false;
}

function onDivMouseOver(event){
   if (event.target.tagName.toLowerCase() == 'div') {
       //event.target.style.cssText = "position:relative;z-index:100000;";
	wsize=event.target.clientWidth;
	alert("wsize");
   }
 }


 function onDivMouseOut(event){
   if (event.target.tagName.toLowerCase() == 'div') {
       //event.target.style.cssText = "position:relative;z-index:-1;";;
       ;
   }
 }


// render
function render(clientX,clientY){
    top_cover.style.height = clientY - hsize / 2 + 'px';
    bottom_cover.style.height = window.innerHeight - clientY - hsize / 2 + 'px';
    left_cover.style.width = clientX - wsize / 2 + 'px';
    right_cover.style.width = window.innerWidth - clientX - wsize / 2 + 'px';
    left_cover.style.top = clientY - hsize/2 + 'px';
    left_cover.style.height = hsize + 'px';
    right_cover.style.top =clientY - hsize/2 +'px';
    right_cover.style.height = hsize +'px';
}

// 設定快速鍵
window.addEventListener('keydown', function(event){
    switch (setShortcutKeysAction) {
		// 顯示/隱藏
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
			message.innerHTML = '功能：顯示/隱藏<br />快速鍵：<font color="red">' + Keys + (code2keyTable[show_hide_keycode] || '') + '</font><br />按 ESC save';
			Keys += String(event.keyCode);
            GM_setValue('show_hide', Keys);
            break;
		// 擴大
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
			message.innerHTML = '功能：放大<br />快速鍵：<font color="red">' + Keys + (code2keyTable[increase_keycode] || '') + '</font><br />按 ESC save';
			Keys += String(event.keyCode);
            GM_setValue('increase', Keys);
            break;
		// 縮小
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
			message.innerHTML = '功能：縮小<br />快速鍵：<font color="red">' + Keys + (code2keyTable[decrease_keycode] || '') + '</font><br />按 ESC save';
			Keys += String(event.keyCode);
            GM_setValue('decrease', Keys);
            break;
	 case 'wide':
            // ESC 退出
            if (event.keyCode == 27) {
				hideShortcutKeySettings();
                break;
            }

            wide_keycode = event.keyCode;
			wide_shift = event.shiftKey;
			wide_ctrl = event.ctrlKey;
			wide_alt = event.altKey;
			
            var Keys = '';
            if (wide_shift) {
                Keys += 'shift+';
            }
            if (wide_ctrl) {
                Keys += 'ctrl+';
            }
            if (wide_alt) {
                Keys += 'alt+';
            }
            
			var message = document.getElementById('message');
			message.innerHTML = '功能：變寬<br />快速鍵：<font color="red">' + Keys + (code2keyTable[wide_keycode] || '') + '</font><br />按 ESC save';
			Keys += String(event.keyCode);
            GM_setValue('wide', Keys);
            break;
	 case 'narrow':
            // ESC 退出
            if (event.keyCode == 27) {
				hideShortcutKeySettings();
                break;
            }

            narrow_keycode = event.keyCode;
			narrow_shift = event.shiftKey;
			narrow_ctrl = event.ctrlKey;
			narrow_alt = event.altKey;
			
            var Keys = '';
            if (narrow_shift) {
                Keys += 'shift+';
            }
            if (narrow_ctrl) {
                Keys += 'ctrl+';
            }
            if (narrow_alt) {
                Keys += 'alt+';
            }
            
			var message = document.getElementById('message');
			message.innerHTML = '功能：變窄<br />快速鍵：<font color="red">' + Keys + (code2keyTable[narrow_keycode] || '') + '</font><br />按 ESC save';
			Keys += String(event.keyCode);
            GM_setValue('narrow', Keys);
            break;
    }
}, true);

window.addEventListener('keyup', function(event){
    if (setShortcutKeysAction != '') return;
    // 顯示/隱藏
    if ((event.altKey == show_hide_alt) && (event.ctrlKey == show_hide_ctrl) && (event.shiftKey == show_hide_shift) && (event.keyCode == show_hide_keycode)){
        if (!visible) {
            GM_setValue('blindstate','true');
            show();
        }
        else {
            GM_setValue('blindstate','false');
            hide();
        }
	} 
    
    // 放大
    else 
    {
        if (visible && (event.altKey == increase_alt) && (event.ctrlKey == increase_ctrl) && (event.shiftKey == increase_shift) && (event.keyCode == increase_keycode)) {
            if (hsize < window.innerHeight / 2) {
                hsize += 5;
				render(clientX,clientY);
            }
        }
        //變寬
        else if (visible && (event.altKey == wide_alt) && (event.ctrlKey == wide_ctrl) && (event.shiftKey == wide_shift) && (event.keyCode == wide_keycode)) {
            if (wsize < window.innerWidth / 2) {
                wsize += 5;
				render(clientX,clientY);
            }
        }
	else if (visible && (event.altKey == narrow_alt) && (event.ctrlKey == narrow_ctrl) && (event.shiftKey == narrow_shift) && (event.keyCode == narrow_keycode)) {
            if (wsize < window.innerWidth / 2) {
                wsize -= 5;
				render(clientX,clientY);
            }
        }
        //縮小
        else 
            if (visible && (event.altKey == decrease_alt) && (event.ctrlKey == decrease_ctrl) && (event.shiftKey == decrease_shift) && (event.keyCode == decrease_keycode)) {
                if (hsize > 10) {
                    hsize -= 5;
				render(clientX,clientY);
                }
            }
    }   
}, true);

init();
//

