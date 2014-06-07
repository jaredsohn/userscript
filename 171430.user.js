// ==UserScript==
// @name          Klavogonki: save race in logbook
// @namespace     klavogonki
// @version       1.0
// @description   добавляет кнопку для сохранения результата любого заезда в бортжурнале
// @include       http://klavogonki.ru/g/?gmid=*
// @author        Lexin
// @updateURL     
// @downloadURL   
// ==/UserScript==

function main(){
	var scores = $('userpanel-scores-container');    
    var MutationObserver = window.MutationObserver ||
                           window.WebKitMutationObserver ||
                           window.MozMutationObserver;
    var observer = new MutationObserver(
        function(mutations) {
            observer.disconnect();
            scoresChangeHandler();
    });
    
    observer.observe(scores, {
        characterData: true,
        subtree: true,
        childList: true
    }); 
    
    function scoresChangeHandler() {
        var saveScript = "popconfirm('Добавить запись в бортжурнал?',"
        	+ "function(){"
        	+ "new Ajax.Request('/g/'+game.id+'.publish',{method:'post',parameters:{text:game.errors_text_bbcode}});"
            + "document.getElementById('save-result').innerHTML = 'Сохранен';"
            + "});";
        var saveButton = document.createElement('div');
        saveButton.id = 'save-result';
        saveButton.setAttribute('style', 'float:left; font-size:10pt;');
        saveButton.innerHTML = '<a href="javascript:void(0);" onclick="' + saveScript + '" style="color:#2a0;">Сохранить в бортжурнале</a>';

        var e = document.getElementById('again');
        if (e) {
            e = e.getElementsByTagName('td')[0];
            e.insertBefore(saveButton, e.firstChild);
        }
    }
}

function execScript(source) {
    if (typeof source == 'function') {
        source = '(' + source + ')();';
    }
    
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = source;
    document.body.appendChild(script);
}

execScript(main);