// ==UserScript==
// @author         Снайпер Конторы http://www.ganjawars.ru/info.php?id=384647
// @name           GWinfoEdit
// @namespace      ganjawars.ru
// @include        http://www.ganjawars.ru/info.edit.php?type=pinfo
// @include        http://www.ganjawars.ru/info.edit.php
// @include        http://www.ganjawars.ru/syndicate.edit.php?id=*
// ==/UserScript==
(function() {

    if(document.getElementsByName('about').length > 0){
        var areaName = 'about';
    } else {
        if(document.getElementsByName('synd_desc').length > 0){
            var areaName = 'synd_desc'
        } else {
            return false;
        }
    }
    var textArea = document.getElementsByName(areaName)[0];
    var cssBtnBB = '<style type="text/css">'
                          +'.bbCodePanel {position:absolute; top:'+(3+getPixelsFromTop(textArea.parentNode))+'px}'
                          +'.bbCodePanel a {display: block;float: left;margin: 1px;text-decoration: none;}'
                          +'.bbCodePanel span {display: block; padding: 3px 5px;background: #E0FFE0;color: #004400;border: 1px solid #D0F5D0;font: 11px tahoma;text-transform: uppercase}'
                          +'.bbCodePanel a:hover span {background: #D0F5D0}'
                          +'.bbCodePanel a:active span {margin: 1px 0 0 1px !important; padding-top: 2px;padding-right: 4px}'
                          +'</style>';
    document.getElementsByTagName("head")[0].innerHTML += cssBtnBB;
    textArea.setAttribute('style', 'width:800px; margin-top:30px');
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
           textarea = document.getElementsByName(areaName)[0];
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
            var textarea = document.getElementsByName(areaName)[0];
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
        var el = document.createElement('a');
        el.innerHTML   = '<span style="'+css+'">'+value+'</span>';
        el.href        = '#';
        return el;
    }

    var panelBB = document.createElement('div');
    panelBB.className   = 'bbCodePanel';
    // Добавляем кнопку пробел
          var btnB = setItem('space',' ');
          btnB.onclick = function(){addNonBreakingSpace(' '); return false}
          panelBB.appendChild(btnB);
    // Добавляем кнопку пробел
              var btnB = setItem('space x10','');
              btnB.onclick = function(){addNonBreakingSpace('          '); return false}
              panelBB.appendChild(btnB);
    // Добавляем кнопку пробел
                 var btnB = setItem('•','');
                 btnB.onclick = function(){addNonBreakingSpace('•'); return false}
                 panelBB.appendChild(btnB);
    // Добавляем кнопку B
    var btnB = setItem('b','font-weight:bold');
    btnB.onclick = function(){addBBcode('[b]','[/b]'); return false}
    panelBB.appendChild(btnB);
    // Добавляем кнопку I
   var btnB = setItem('i','font-weight:italic');
   btnB.onclick = function(){addBBcode('[i]','[/i]'); return false}
   panelBB.appendChild(btnB);
   // Добавляем кнопку U
         var btnB = setItem('u','text-decoration: underline;');
         btnB.onclick = function(){addBBcode('[u]','[/u]'); return false}
         panelBB.appendChild(btnB);
    // Добавляем кнопку S
   var btnB = setItem('s','text-decoration: line-through;');
   btnB.onclick = function(){addBBcode('[s]','[/s]'); return false}
   panelBB.appendChild(btnB);

    // Добавляем кнопку R
      var btnB = setItem('r','background: red');
      btnB.onclick = function(){addBBcode('[red]','[/red]'); return false}
      panelBB.appendChild(btnB);
    // Добавляем кнопку G
          var btnB = setItem('g','background: green;color:#fff');
          btnB.onclick = function(){addBBcode('[green]','[/green]'); return false}
          panelBB.appendChild(btnB);
    // Добавляем кнопку B
          var btnB = setItem('b','background: blue;color:#fff');
          btnB.onclick = function(){addBBcode('[blue]','[/blue]'); return false}
          panelBB.appendChild(btnB);

   // добавляем все кнопки
    textArea.parentNode.appendChild(panelBB);

})();
