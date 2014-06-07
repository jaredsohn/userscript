// ==UserScript==
// @name           Virtonomica: управление предприятиями
// @namespace      virtonomica
// @version 1.41
// @description    Добавление нового функционала к управлению предприятиями
// @include        http://*virtonomic*.*/*/main/company/view/*/unit_list
// @exclude	   http://*virtonomic*.*/*/main/company/view/*/unit_list/service
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

	// поиск эффективности
	$("td.u-f").each(function() {
		// эффективность
		ef = parseInt( $(this).text() );
		if (ef < 100) {
			$(this).css("color", 'red');
		}
	});

	var url = /^http:\/\/virtonomic[as]\.(\w+)\/\w+\//.exec(location.href)[0];

	// Список с ячейками, содержащими названия подразделений
	var list = $('td[class^=u-c]');

	var input_ef = $('<select>')
			.append('<option value=-1>Все</option>')
			.append('<option value=10>< 100%</option>')
			.append('<option value=100>100%</option>')
			.append('<option value=0>0%</option>').change(function() {
		var find_count = 0;
		list.each(function() {
        		var needle = input_ef.val();
			// поиск эффективности
			var ef = parseInt ( $(this).next().next().next().next().text() );

			var find =  -1;	
			switch( needle ) {
				case '10': {
					if ( (ef >0)  && (ef != 100) ) find = 1;
					break;
				}
				case '100':  {
					if (ef == 100) find = 1;
					break;
				}
				case '0': {
					if (ef == 0) find = 1;
					break;
				}
				case '-1': find = 1; break;
			}

			// заметки
			var find_notes = 0;
			if ( ( $(this).parent().next().prop("class") == "u-z") ||
			     ( $(this).parent().next().prop("class") == "u-z ozz")
			   ) {
				find_notes = 1;
			}
            		if ( find ==  -1) {
	                	$(this).parent().hide();
				if ( find_notes == 1 ) $(this).parent().next().hide();
			} else {
	                	$(this).parent().show();
				find_count++
				if ( find_notes == 1 ) $(this).parent().next().show();
			}


		});
		if ( find_count == 0) $("#ef_info").html ("&nbsp;");
		else $("#ef_info").html ("(" + find_count + ")");
	});


	// Клик по эффективности
	$(list).next().next().next().next().css('cursor', 'pointer').prop('title', 'Узнать прогноз эффективности').click(function() {
		var td = $(this);
        	td.empty().append($('<img>').attr({'src': 'http://s3.devels.info/load.gif', 'height': 16, 'width': 16}).css('padding-right', '20px'));

		var el = $("td.u-f", $(this).parent() );
		var id  = el.text() ;
        	$.get(url + 'window/unit/productivity_info/' + id, function(data) {
            		var percent = $('td:contains(Эффективность работы) + td td:eq(1)', data).text().replace('%', '').trim();
            		var color = (percent == '100.00' ? 'green' : 'red');
            		var html = percent + '<i>%</i>';

            		td.css('color', color).html(html);
        	});
	});

	var container = $("td.u-l").parent().parent();

	var input = $('<input>').attr({type: 'text', value: ''}).change( function() {

		//alert( list.length );
        	var needle = new RegExp('^\\s*' + input.val(), 'i');

		var find_count = 0;
		list.each(function() {
			// если фильтр не задан, то показать все что есть
			if (needle.length == 0) {
                		$(this).parent().show();
                		return;
            		}
			// заметки
			var find_notes = 0;
			if ( ( $(this).parent().next().prop("class") == "u-z") ||
			     ( $(this).parent().next().prop("class") == "u-z ozz")
			   ) {
				find_notes = 1;
			}
			// применить фильтр
            		if ($(this).text().search(needle) == -1) {
                		$(this).parent().hide();
				if ( find_notes == 1 ) $(this).parent().next().hide();
            		} else {
                		$(this).parent().show();
				find_count++;
				if ( find_notes == 1 ) $(this).parent().next().show();
            		}

        	});
		if ( find_count == 0) $("#find_info").html ("&nbsp;");
		else $("#find_info").html ("(" + find_count + ")");
    	});

	var ext_panel = $("#extension_panel");
	if ( ext_panel.length  == 0 ) {
		// если панели еще нет, то доабвить её
		var panel = "<div style='padding: 2px; border: 1px solid #0184D0; border-radius: 4px 4px 4px 4px; float:left; white-space:nowrap; color:#0184D0;'  id=extension_panel></div>";
		container.append( "<tr><td>" +panel );
	}
	$("#extension_panel").append(  " Название: " ).append("<span id=find_info>&nbsp;</span> ").append( input).append( "&nbsp;")
	.append('Эффективность: ').append("<span id=ef_info>&nbsp;</span> ").append(input_ef);
	// Не забыть убрать
	$("#extension_panel").append("&nbsp;").append(input_id);
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}