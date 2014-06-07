// ==UserScript==
// @name           Info Edit [GW]
// @description    Помощник в редактировании информации персонажа.
// @include        http://*.ganjawars.ru/info.edit.php*
// @version        1.18
// @author         Снайпер Конторы (автор), GoreGrindGeek (редактор)
// ==/UserScript==

(function() {

    if (location.href.indexOf('ganjawars.ru/info.edit') == -1) { return false; }

	var textArea = document.getElementsByName('about')[0];
    var cssBtnBB = '<style type="text/css">'
                          +'.bbCodePanel {position:absolute; top:'+(3+getPixelsFromTop(textArea.parentNode))+'px}'
                          +'.bbCodePanel a {display: block;float: left;margin: 1px;text-decoration: none;}'
                          +'.bbCodePanel span {display: block; padding: 3px 5px;background: #E0FFE0;color: #004400;border: 1px solid #D0F5D0;font: 11px tahoma;text-transform: uppercase}'
                          +'.bbCodePanel a:hover span {background: #D0F5D0}'
                          +'.bbCodePanel a:active span {margin: 1px 0 0 1px !important; padding-top: 2px;padding-right: 4px}'
                          +'</style>';
    document.getElementsByTagName("head")[0].innerHTML += cssBtnBB;
    textArea.setAttribute('style', 'width:800px; margin-top:30px');
	
	var panelBB = document.createElement('div');
    panelBB.className = 'bbCodePanel';
	panelBB.style.display = 'table-row';
    // Добавляем кнопку пробел
    var btnB = setItem('space','');
	bindEvent(btnB, 'click', function(){addNonBreakingSpace(' ')});
    panelBB.appendChild(btnB);
    // Добавляем кнопку пробел
    btnB = setItem('space x10','');
	bindEvent(btnB, 'click', function(){addNonBreakingSpace('          ')});
    panelBB.appendChild(btnB);
    // Добавляем кнопку пробел
    btnB = setItem('•','');
	bindEvent(btnB, 'click', function(){addNonBreakingSpace('•')});
    panelBB.appendChild(btnB);
    // Добавляем кнопку B
    btnB = setItem('b','font-weight:bold');
	bindEvent(btnB, 'click', function(){addBBcode('[b]','[/b]')});
    panelBB.appendChild(btnB);
    // Добавляем кнопку I
    btnB = setItem('i','font-weight:italic');
	bindEvent(btnB, 'click', function(){addBBcode('[i]','[/i]')});
    panelBB.appendChild(btnB);
   // Добавляем кнопку U
    btnB = setItem('u','text-decoration: underline;');
	bindEvent(btnB, 'click', function(){addBBcode('[u]','[/u]')});
    panelBB.appendChild(btnB);
    // Добавляем кнопку S
    btnB = setItem('s','text-decoration: line-through;');
	bindEvent(btnB, 'click', function(){addBBcode('[s]','[/s]')});
    panelBB.appendChild(btnB);
	// Добавляем кнопку R
    btnB = setItem('r','background: red');
	bindEvent(btnB, 'click', function(){addBBcode('[red]','[/red]')});
    panelBB.appendChild(btnB);
    // Добавляем кнопку G
    btnB = setItem('g','background: green;color:#fff');
	bindEvent(btnB, 'click', function(){addBBcode('[green]','[/green]')});
    panelBB.appendChild(btnB);
    // Добавляем кнопку B
    btnB = setItem('b','background: blue;color:#fff');
	bindEvent(btnB, 'click', function(){addBBcode('[blue]','[/blue]')});
    panelBB.appendChild(btnB);
	// добавляем все кнопки
    textArea.parentNode.appendChild(panelBB);

    function getPixelsFromTop(obj){
    	objFromTop = obj.offsetTop;
    	while(obj.offsetParent!=null) {
    		objParent = obj.offsetParent;
    		objFromTop += objParent.offsetTop;
    		obj = objParent;
    	}
    	return objFromTop;
    }

    function addNonBreakingSpace(tag1) {
           textarea = document.getElementsByName('about')[0];
           var len = textarea.value.length;
           var start = textarea.selectionStart;
           var end = textarea.selectionEnd;
           var scrollTop = textarea.scrollTop;
           var scrollLeft = textarea.scrollLeft;
           var sel = textarea.value.substring(start, end);
           var rep = tag1 + sel;
           textarea.value = textarea.value.substring(0, start) + rep + textarea.value.substring(end, len);
           textarea.setSelectionRange(start + 1, end);
           textarea.scrollTop = scrollTop;
           textarea.scrollLeft = scrollLeft;
           textArea.focus();
           return false;
    }

    function addBBcode(tag1, tag2) {
            var textarea = document.getElementsByName('about')[0];
            var len = textarea.value.length;
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;
            var scrollTop = textarea.scrollTop;
            var scrollLeft = textarea.scrollLeft;
            var sel = textarea.value.substring(start, end);
            var rep = tag1 + sel + tag2;
            textarea.value = textarea.value.substring(0, start) + rep + textarea.value.substring(end, len);
            textarea.scrollTop = scrollTop;
            textarea.scrollLeft = scrollLeft;
            textArea.focus();
            return false;
    }

    function setItem(value, css){
        var el = document.createElement('span');
		el.setAttribute('style', css);
		with (el.style) { cursor = 'pointer'; border = '1px solid black'; display = 'table-cell'; }
		el.textContent = value;
        return el;
    }
	
	function bindEvent(element, event, callback) {
		if (!element) { return; }
		if (element.addEventListener) {
			if (event.substr(0, 2) == 'on') { event = event.substr(2); }
			element.addEventListener(event, callback, false);
		} else if (element.attachEvent) {
			if (event.substr(0, 2) != 'on') { event = 'on' + event; }
			element.attachEvent(event, callback, false);
		}
		return;
	}

})();
