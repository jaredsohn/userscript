// ==UserScript==
// @name       RuTor.org seed graph
// @namespace  http://qmegas.info/rutor
// @version    0.4.3
// @description  Помогает визуально увидить популярность той или иной раздачи.
// @include    http://rutor.org/*
// @include    http://*.rutor.org/*
// @copyright  Megas (qmegas.info)
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
//
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
//
// ==/UserScript==

//Version log:
// v0.4
//	- Добавлена возможность выделять раздачи с переводом от iTunes
//
// v0.3.5
//	- Исправления всвязи с изменениями на сайте
//
// v0.3.3
// 	- Смена маски скрипта так, чтоб он срабатывал как для домейна с www, так и для альтернативного сервера alt.rutor.org
//
// v0.3
// 	- Добавлено окно настроек (открывается в верхнем меню при клике на таб "Настройки")
// 	- Добавлено выделение раздач для iPad
// 	- Добавлено выделение 3D раздач
//
// v0.2
//	- Добавлено ограничение длины полосы в зависимости от размера окна браузера, так как у супер популярных раздач таблица растягивалась за пределы экрана. 
// 	- Лицензионные раздачи теперь помечаются другим цветом.
//

GM_addStyle('#qmegas_settings { width: 400px; height: 230px; position: fixed; left: 0; top: 0; background-color: #fff; border: 1px solid #a00; }');
GM_addStyle('#qmegas_settings .header {	background: url("http://s.rutor.org/i/backgr.png") 0 -13px;	height: 41px;	color: #000000;	font-weight: bold; text-align: center; }');
GM_addStyle('#qmegas_settings .fields { padding: 5px; }');
GM_addStyle('#qmegas_settings .fields .row { clear: both; height: 30px; }');
GM_addStyle('#qmegas_settings .fields .row .col1 { width: 300px;	float: left; }');
GM_addStyle('#qmegas_settings .fields .row .col2 { width: 90px; float: left; }');
GM_addStyle('#qmegas_settings .qmegas-color { max-width: 70px; max-height: 20px; }');


function RutorScript()
{
	this.settings = {};
	
	this.loadSettings = function()
	{
		this.settings = {
			line_color: GM_getValue('line_color', '#ff0000'),
			mark_license: GM_getValue('mark_license', true),
			license_color: GM_getValue('license_color', '#ddffdd'),
			mark_ipad: GM_getValue('mark_ipad', false),
			ipad_color: GM_getValue('ipad_color', '#ddddff'),
			mark_treed: GM_getValue('mark_treed', false),
			treed_color: GM_getValue('treed_color', '#f4ddff'),
            mark_itunes: GM_getValue('mark_itunes', true),
			itunes_color: GM_getValue('itunes_color', '#ffe2d5'),
		};
	}

	this.setStyles = function()
	{
		GM_addStyle('.qmegas-line { height: 3px; background-color: ' + this.settings.line_color + '; }');
		GM_addStyle('tr.qmegas-license td { background-color: ' + this.settings.license_color + '; }');
		GM_addStyle('tr.qmegas-ipad td { background-color: ' + this.settings.ipad_color + '; }');
		GM_addStyle('tr.qmegas-3d td { background-color: ' + this.settings.treed_color + '; }');
        GM_addStyle('tr.qmegas-itunes td { background-color: ' + this.settings.itunes_color + '; }');
	}
	
	this.toggleSettings = function()
	{
		var $sett_wnd = $('#qmegas_settings'), 
			x = parseInt(($(window).width() - $sett_wnd.width())/2),
			y = parseInt(($(window).height() - $sett_wnd.height())/2);
			
		$('#qmegas_line_color').val(this.settings.line_color);
		if (this.settings.mark_license)
			$('#qmegas_mark_license').attr('checked', true);
		$('#qmegas_license_color').val(this.settings.license_color);
		if (this.settings.mark_ipad)
			$('#qmegas_mark_ipad').attr('checked', true);
		$('#qmegas_ipad_color').val(this.settings.ipad_color);
		if (this.settings.mark_treed)
			$('#qmegas_mark_treed').attr('checked', true);
		$('#qmegas_treed_color').val(this.settings.treed_color);
        if (this.settings.mark_itunes)
			$('#qmegas_mark_itunes').attr('checked', true);
		$('#qmegas_itunes_color').val(this.settings.itunes_color);
			
		$('#qmegas_settings')
			.css({'left': x, 'top': y})
			.toggle('fast');
	}
	
	this.addSettings = function()
	{
		var $tab = $('<a href="javascript:;" class="menu_b"><div>Настройка</div></a>');
		var obj = this;
		$tab.click(function(){
			obj.toggleSettings();
		});
		$('#menu').append($tab);
		
		var $wnd = $('<div id="qmegas_settings" style="display: none">	<div class="header">Настройка скрипта</div>	<div class="fields">		<div class="row">			<div class="col1">Цвет полоски популярности раздачи:</div>			<div class="col2"><input type="color" class="qmegas-color" id="qmegas_line_color" /></div>		</div>		<div class="row"> 			<div class="col1"><input type="checkbox" id="qmegas_mark_license"> Выделять лицензии</div>			<div class="col2"><input type="color" class="qmegas-color" id="qmegas_license_color" /></div>		</div>		<div class="row"> 			<div class="col1"><input type="checkbox" id="qmegas_mark_ipad"> Выделять раздачи iPad</div>			<div class="col2"><input type="color" class="qmegas-color" id="qmegas_ipad_color" /></div>		</div>		<div class="row">			<div class="col1"><input type="checkbox" id="qmegas_mark_treed"> Выделять 3D раздачи</div>			<div class="col2"><input type="color" class="qmegas-color" id="qmegas_treed_color" /></div>		</div>		<div class="row">			<div class="col1"><input type="checkbox" id="qmegas_mark_itunes"> Выделять раздачи с переводом iTunes</div>			<div class="col2"><input type="color" class="qmegas-color" id="qmegas_itunes_color" /></div>		</div>		<div class="row" style="text-align: center">			<input type="button" value="Сохранить настройки" id="qmegas_save_settings" />		</div>	</div></div>');
		$('body').append($wnd);
		
		var obj = this;
		$('#qmegas_save_settings').live('click', function(){
			GM_setValue('line_color', $('#qmegas_line_color').val());
			GM_setValue('mark_license', $('#qmegas_mark_license').is(':checked'));
			GM_setValue('license_color', $('#qmegas_license_color').val());
			GM_setValue('mark_ipad', $('#qmegas_mark_ipad').is(':checked'));
			GM_setValue('ipad_color', $('#qmegas_ipad_color').val());
			GM_setValue('mark_treed', $('#qmegas_mark_treed').is(':checked'));
			GM_setValue('treed_color', $('#qmegas_treed_color').val());
            GM_setValue('mark_itunes', $('#qmegas_mark_itunes').is(':checked'));
			GM_setValue('itunes_color', $('#qmegas_itunes_color').val());
			
			obj.loadSettings();
			obj.setStyles();
			$('#qmegas_settings').toggle('fast');
		});
	}
	
	this.markLines = function()
	{
		var max_width = $(window).width()*0.6, obj = this;
		$('tr.gai, tr.tum').each(function(){
		    var $trs = $(this).find('td'), 
                $spans4 = $($trs.get().pop()).find('span'),
		        count = parseInt($.trim($($spans4.get(0)).text())) + parseInt($.trim($($spans4.get(1)).text())),
		        sp1as$ = $($trs.get(1)).find('a');
            
            var sp1a = (sp1as$.length == 2) ? sp1as$.get(1) : sp1as$.get(2);
		        
		    count = Math.min(max_width, parseInt(count/10));
		    $($trs.get(1)).append('<div class="qmegas-line" style="width: ' + count + 'px"></div>');
		    
		    if (obj.settings.mark_license && ((sp1a.innerHTML.indexOf('Лицензия') !== -1) || (sp1a.innerHTML.indexOf('лицензия') !== -1)))
		        $(this).addClass('qmegas-license');
		    if (obj.settings.mark_ipad && (sp1a.innerHTML.indexOf('iPad') !== -1))
		        $(this).addClass('qmegas-ipad');
		    if (obj.settings.mark_treed && (sp1a.innerHTML.indexOf('3D-Video') !== -1))
		        $(this).addClass('qmegas-3d');
            if (obj.settings.mark_itunes && (sp1a.innerHTML.indexOf('iTunes') !== -1))
		        $(this).addClass('qmegas-itunes');
		});
	}
	
	this.init = function()
	{
		this.loadSettings();
		this.setStyles();
		this.addSettings();
		this.markLines();
	}
}

(new RutorScript()).init();