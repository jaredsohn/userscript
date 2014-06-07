// ==UserScript==
// @name          Klavogonki: best5 results
// @namespace     klavogonki
// @version       1.0
// @description   отображает 5 лучших результатов игрока в профиле
// @include       http://klavogonki.ru/profile/*/stats*
// @author        Lexin
// @updateURL     
// @downloadURL   
// ==/UserScript==

function main(){
    
    var userId = /http:\/\/klavogonki\.ru\/profile\/(\d+)\/stats(?!.*[^\w]gametype=(?!normal(?:[^\w]|\b)))/.exec(location.href);
  
    if (!userId) 
        return;
    
    userId = userId[1];
    
    var dl = jQuery('<dl></dl>');
    dl.append(jQuery('<dt>5 лучших результатов:</dt>'));
    dl.append(jQuery('<dd id="best5-container"></dd>').html('<img src="/img/small_loading.gif" id="best5-loading">'));
    dl.insertBefore(jQuery('#chart'));
    
    jQuery.get('/api/best5',
               {user_id: userId},
               function(data) {
                   var checkValue = /\{check:\s*'([0-9a-f]+)'\}/.exec(data);
                   checkValue = checkValue ? checkValue[1] : null;
                   if (checkValue) {
                       var interval = setInterval(function() {
                           jQuery.get('/api/best5',
                                      {check: checkValue},
                                      function(data) {
                                          if(data.result == 'ok') {
                                              clearInterval(interval);

                                              var dateRow = jQuery('<tr></tr>');
                                              var speedRow = jQuery('<tr></tr>');
                                              for(var i = 0; i < data.data.length; i++) {
                                                  var rec = data.data[i];
                                                  dateRow.append(jQuery('<th></th>').html(rec.date));
                                                  speedRow.append(jQuery('<td></td>').html(rec.speed));
                                              }
                                              
                                              var table = jQuery('<table class="best5"></table>');
                                              table.append(dateRow);
                                              table.append(speedRow);
                                              jQuery('#best5-container').html(table);
                                          }
                                      },
                                      'json');
                       }, 1000);
                   }
                   else {
                       jQuery('#best5-container').html('Статистика закрыта');
                   }
               }, 
               'html');
    
    var style = document.createElement('style');
    style.innerHTML = ''
		+ 'table.best5{color:#333; border-collapse:collapse;}'
		+ 'table.best5 th{font-size:10px; width:64px; background-color:#eee; text-align:center; border:1px solid #a9a9a9; padding:4px;}'
		+ 'table.best5 td{font-size:12px; text-align:center; border:1px solid #a9a9a9; padding:8px;}'
		;  
    document.body.appendChild(style);
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