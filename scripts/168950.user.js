// ==UserScript==
// @name			Подсветка строк для RuTor.Org
// @version			0.2.2
// @description		Подсветка строк на RuTor.org для выделения новинок (текущий и прошедший год) 
// @namespace		http://forum.sources.ru
// @updateURL		http://userscripts.org/scripts/source/168950.meta.js
// @installURL		http://userscripts.org/scripts/source/168950.user.js
// @match			http://rutor.org/*
// @exclude			http://rutor.org/torrent/*
// @copyright		2012-2013, Sunny
// ==/UserScript==

(function(){
    // добавляем функцию in_array
    function in_array(p_val, arr){
        for(var i = 0, l = arr.length; i < l; i++){
            if(arr[i] == p_val) return true;
        }
        return false;
    }
    
    // настройки строк
    var listClasses = ["tum", "gai"];
    var thisYear = new Date().getFullYear();
    var regExp = new RegExp('\((?:' + (thisYear - 1) + '|' + thisYear + ')\)');
    
    // ищем элементы
    var tableRows = document.getElementsByTagName("tr");
    for(var i=0, count=tableRows.length; i<count; i++){
        // пропускаем не нужные
        if(in_array(tableRows[i].className, listClasses) == false) continue;
        
        // получаем и проверяем текст 2 ячейки
        if(typeof(tableRows[i].cells[1]) == "undefined") continue;
        var text = tableRows[i].cells[1].innerText;
        if(!regExp.test(text)) continue;
        
        // окрашиваем нужные
        tableRows[i].cells[1].style.fontWeight = "bold";
    }
})();