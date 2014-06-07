// ==UserScript==
// @name           sape YAP checker
// @namespace      http://userscripts.org/users/28106
// @include        http://*sape.ru/sites.php*
// ==/UserScript==

var loading=document.createElement("img");
loading.src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///zg4OM/Pz2trazg4OISEhJ2dnampqSH/C05FVFNDQVBFMi4wAwEAAAAh/h1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh/hVNYWRlIGJ5IEFqYXhMb2FkLmluZm8AIfkECQoAAAAsAAAAABAAEAAAAzMIutz+MMpJaxNjCDoIGZwHTphmCUWxMcK6FJnBti5gxMJx0C1bGDndpgc5GAwHSmvnSAAAIfkECQoAAAAsAAAAABAAEAAAAzQIutz+TowhIBuEDLuw5opEcUJRVGAxGSBgTEVbGqh8HLV13+1hGAeAINcY4oZDGbIlJCoSACH5BAkKAAAALAAAAAAQABAAAAM2CLoyIyvKQciQzJRWLwaFYxwO9BlO8UlCYZircBzwCsyzvRzGqCsCWe0X/AGDww8yqWQan78EACH5BAkKAAAALAAAAAAQABAAAAMzCLpiJSvKMoaR7JxWX4WLpgmFIQwEMUSHYRwRqkaCsNEfA2JSXfM9HzA4LBqPyKRyOUwAACH5BAkKAAAALAAAAAAQABAAAAMyCLpyJytK52QU8BjzTIEMJnbDYFxiVJSFhLkeaFlCKc/KQBADHuk8H8MmLBqPyKRSkgAAIfkECQoAAAAsAAAAABAAEAAAAzMIuiDCkDkX43TnvNqeMBnHHOAhLkK2ncpXrKIxDAYLFHNhu7A195UBgTCwCYm7n20pSgAAIfkECQoAAAAsAAAAABAAEAAAAzIIutz+8AkR2ZxVXZoB7tpxcJVgiN1hnN00loVBRsUwFJBgm7YBDQTCQBCbMYDC1s6RAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P4wykmrZULUnCnXHggIwyCOx3EOBDEwqcqwrlAYwmEYB1bapQIgdWIYgp5bEZAAADsAAAAAAAAAAAA=";

YAP_INIT = 0;

$ = unsafeWindow.jQuery;
if(!$)
	alert("GM script need page to have jQuery");
else {
	init();
}

function init() {
  $('<div class="button_actions" style="width: 100%; margin-bottom: 10px; height: auto"><div class="lt" style="height: auto"><div class="rt" style="height: auto"><div class="lb" style="height: auto"><div id="gm-tools" style="padding-bottom: 10px; text-align: left;"></div></div></div></div></div>').insertBefore('.c26_5:first');
  $gmtools = $('#gm-tools');
  $('<div style="padding: 0 0 5px;">'+
      '<span id="gm-yap-info"></span>'+
      '<span id="gm-yap-status"></span>'+
      '<span id="gm-yap-settings">'+
        'Интервал запросов: '+
        '<input type="text" id="gm-yap-interval" value="0.3" style="width: 1.5em;" /> сек. '+
        'Пауза длинной '+
        '<input type="text" id="gm-yap-biginterval" value="5" style="width: 1.5em;" /> сек. '+
        'после '+
        '<input type="text" id="gm-yap-bigitems" value="25" style="width: 1.5em;" /> '+
        'запросов. '+
        'Только новые: '+
        '<input type="checkbox" id="gm-yap-new-only" checked  /> '+
        '<!--<button id="gm-yap-do">Пошел</button>-->'+
      '</span>'+
  '</div>').appendTo($gmtools);
  $gmtools.append('С отмеченными ');
  $('select[name=act]').clone().attr('id', 'gm-action').css('width', 'auto').appendTo($gmtools);
  $gmtools.append(' <button id="gm-action-do">Выполнить</button> <small><i>Откроется в новом окне</i></small>');
  
  GM_registerMenuCommand("check YAP",
    function(){
      interval = parseFloat($('#gm-yap-interval').val());
      biginterval = parseFloat($('#gm-yap-biginterval').val());
      bigitems = parseFloat($('#gm-yap-bigitems').val());
      new_only = $('#gm-yap-new-only').is('[checked]') ? 1 : 0;

      if (interval <= 0 || biginterval <=0 || bigitems <= 0) return false;

      check_yap(new_only, interval*1000, biginterval*1000, bigitems);

      $('#gm-yap-settings').hide();
      $('#gm-yap-status').html('<br /><small>Интервал запросов: '+interval+' сек. Пауза длинной '+biginterval+' сек. после '+bigitems+' запросов. Проверять ' + (new_only ? 'только новые' : 'все') + ' ссылки</small>');
    }
  );

  //$('#gm-yap-do').click();
  
  $('#gm-action').change(function(){
    $('select[name=act]').val($(this).val());
  });
  
  $('#gm-action-do').click(function(){
    $('form[action*=site_pages.php?site_id=]').attr('target', '_blank').submit();
  });
}


function check_yap(new_only, interval, biginterval, bigitems) {
  if (!YAP_INIT) {
    init_yap(new_only);
  }
  show_yap_status();
  if (YAP_LINKS[YAP_CHECKED])
    check_yap_link(YAP_LINKS[YAP_CHECKED], interval, biginterval, bigitems)
  else
    alert('Все ссылки проверены.');
}

function check_yap_link(link, interval, biginterval, bigitems) {
  query = String(link).replace('http://123sdfsdfsdfsd.ru/yandsearch?rpt=rad&text=', '');
  $link= $(link);
  
	$link.before(loading);
  $link.attr('checking', 1);
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://xmlsearch.yandex.ru/xmlsearch?query='+query,
		onload: function(r){
			$data = $(r.responseText);
			if($data.find('results').length == 0) {
			 YAP_NA++;
				result = '<b style="color: #f55" title="does not exists in yandex">[n/a]</b> ';
			}
			else {
        result = '<b style="color: #5f5" title="page exists in yandex">[ok]</b> ';
        $(":checkbox", $link.parents("tr:first")).attr("checked", "checked");
			}

			$link.prev("img").remove();
			$link.before(result);
			$link.attr("checked", "1").css("display", "none");


      if (YAP_CHECKED % bigitems != 0)
        window.setTimeout(function(){ check_yap(null, interval, biginterval, bigitems); }, interval);
      else
        window.setTimeout(function(){ check_yap(null, interval, biginterval, bigitems); }, biginterval);

      YAP_CHECKED++
		}
	});
}

function show_yap_status() {
  YAP_INFO.html('Всего ссылок: '+YAP_TOTAL+'. Проверено: '+YAP_CHECKED+'. Завершено на '+Math.round(YAP_CHECKED/YAP_TOTAL*100)+'%. Отсутствуют в индексе: '+YAP_NA+' ('+Math.round(YAP_NA/YAP_CHECKED*100)+'%).');
}

function init_yap(new_only) {
  YAP_INIT = 1;
  YAP_LINKS = $('a.icon_yap[checked!=1]');
  if (new_only) {
    YAP_LINKS.each(function(i){
      if ($('.stat_ok', $(this).parents('tr:first')).length != 0) {
        YAP_LINKS = YAP_LINKS.not($(this));
      }
    });
  }
  YAP_TOTAL = YAP_LINKS.length;
  YAP_CHECKED = 0;
  YAP_NA = 0;
  YAP_INFO = $('#gm-yap-info');
}
