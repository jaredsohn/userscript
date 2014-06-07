// ==UserScript==
// @name Urentool UI
// @namespace http://www.jaron.nl/misc/efocus/
// @description Enhance urentool UI
// @include https://uren.netwerkgroep.nl/*
// @exclude https://uren.netwerkgroep.nl/leeg.html
// ==/UserScript== 

(function($) {

	var $form = $('form[name="frm_urenregels"]'),
		startTime = [9,00],//time to start logging from;
		tabindexCheckTimer;


	/**
	* add css; we can't load script because urentool is on https
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var addCss = function() {
		var css = 'html{font-size:62.5%}body{font-size:1.2rem;line-height:1.5}div#container{margin:0 auto;max-width:1500px}div#main span.footer,div#main span.header,div#main table.urendag{width:100%;max-width:1140px}select,td{-moz-box-sizing:border-box;box-sizing:border-box}div#head{float:none;overflow:hidden;margin:0 0 20px;height:auto}div#head div#menu{overflow:hidden;float:none;border-top:0;border-right:0;width:auto;height:auto}div#head div#menu ul#nav{float:none;width:auto;background:0 0}div.buttons_top_right{margin:48px 5px 0}div#left{clear:none;margin:0 20px}div#agenda,div#meldingen{margin:0 0 20px;width:auto}input:focus,select:focus{box-shadow:0 0 3px #39f}div#container2{overflow:hidden;margin-right:20px;width:auto}div#main{display:block;float:none;background:0 0;margin:0;width:auto;border:0;font:inherit}div#main span.header{overflow:hidden;display:block;float:none;padding:10px 0;height:auto;background:0 0}div#main span.header h1{display:inline-block;font-size:inherit;margin:0 1em 0 2.5em;width:auto;height:auto}div#main span.header select,div#mainbreed span.header select{float:none;margin:0;width:auto;height:auto;font:inherit}div#main table.urendag{clear:none;float:none;border:1px solid #C3C5C6;border-top:0;font-size:1.2rem}div#main .header+table.urendag{border-top:1px solid #C3C5C6}div#main table.even,div#main table.oneven{background:0 0}div#main form .test:nth-child(2n) table,div#main form table:nth-child(2n+1){background:#f5f5f5}div#main form .test:nth-child(2n+1) table{background:0 0}td{background:none!important}div#main table.urendag tr{height:auto;line-height:inherit}div#main table.urendag td{width:auto;height:auto;padding:5px!important;line-height:inherit}div#main table.urendag tr:first-child td{padding-top:8px!important}div#main table.urendag tr:last-child td{padding-bottom:8px!important}div#main table.urendag td.nummer{font-size:inherit;padding:5px;width:2em}div#main table.urendag td.eerste,div#main table.urendag td.tweede{height:auto;line-height:inherit;vertical-align:auto}div#main table.urendag td.nummer+td.eerste{width:30em}td div.projectnaam_en_urensoort{width:auto}div.bedrijf_pulldown_replacement,td div.projectnaam{margin:0 5px 0 0;padding:0;width:45%;line-height:inherit}td div.urensoort{float:none;margin:0;padding:0;width:auto;line-height:inherit}td div.eerste_regel_rechts{width:auto}div#main table.urendag input.omschrijving,div.uren_omschrijving,td div.urenfase,td div.urenfase2{-moz-box-sizing:border-box;box-sizing:border-box;overflow:visible;margin:0 5px 0 0;padding:5px;width:20em;line-height:inherit}td div.urenfase,td div.urenfase2{margin-right:16px}td div.urenfase2{padding:0}div#main table.urendag tr+tr td:first-child+td{width:21em}div.uren_van_tot{float:left;margin:0;width:16em}div#main table.urendag td.nummer.nietvolledig{color:#404040}div#main table.urendag select{width:90%;padding:5px;max-width:20em;font-size:inherit}div#main table.urendag select.werksoort{margin:0;width:52%;font-size:inherit}option{padding:3px}.urenfase2 span{display:block}div#main table.urendag select.projectfase{width:100%;font-size:inherit}td div.voorcalculatie{margin:0;height:auto;width:auto;color:#999}.tweede.rechts{text-align:left}.verwijderknopregel{display:block;float:right;margin:0}.verwijderknopregel a,a[title="Copy regel"],a[title="Edit regel"],td.verwijderknop a{display:block;float:right;margin:0 0 0 5px!important;padding:5px}.verwijderknopregel a,td.verwijderknop a{border:1px solid transparent;background:0 0}.verwijderknopregel a:focus,.verwijderknopregel a:hover,td.verwijderknop a:focus,td.verwijderknop a:hover{border:1px solid #e63200;background:#e63200}a[title="Copy regel"]{border:1px solid transparent}a[title="Copy regel"]:focus,a[title="Copy regel"]:hover{border:1px solid #e67731}a[title="Edit regel"]{border:1px solid transparent;background:0 0}a[title="Edit regel"]:focus,a[title="Edit regel"]:hover{border:1px solid #090;background:#090}td.verwijderknop a.bekijk_details{border:0;background:0 0}a[title="Copy regel"] img,a[title="Edit regel"] img{margin:0}div#main table.urendag input.project{font-size:inherit;height:auto;padding:5px;width:88%}div#main table.urendag input.project+a{display:inline-block}.fav_pulldown{position:static;margin:0 0 0 5px}div#main table.urendag input.omschrijving{height:auto;font:inherit}td input{padding:5px}div#main table.urendag input.tijd,div#main table.urendag input.tijdtotaal{height:auto;font-size:inherit}div#main table.urendag .tweede.rechts input.tijd{border-color:#eee;color:#999}.urenregel_project{overflow:visible;float:none;margin:0;width:auto}.uren_omschrijving{overflow:visible;margin:0;width:auto}div#main span.footer{display:block;float:none;overflow:hidden;border:0;padding:10px 0;height:auto;background:0 0}div#main span.afronden,div#main span.dagtotaal,div#main span.opslaan,div#main span.weektotaal{display:block;margin:0 .5em;padding:5px 0;width:auto;height:auto;font-size:inherit;line-height:inherit}div#main span.afronden,div#main span.opslaan{padding:5px}.afronden,.opslaan,input[type=button]{cursor:pointer}div#main span.afronden:focus,div#main span.afronden:hover,div#main span.opslaan:focus,div#main span.opslaan:hover,div#main table input[type=button]:focus,div#main table input[type=button]:hover{background:#0072bc!important}div#main span.afronden input{vertical-align:middle}div#main span.opslaan[title="Nieuwe urenregel"]{background:0 0;color:#f95808;text-decoration:underline}div#main span.opslaan[title="Nieuwe urenregel"]:focus,div#main span.opslaan[title="Nieuwe urenregel"]:hover{background:0 0;text-decoration:none}div#main span.dagtotaal,div#main span.weektotaal{color:#999}div#main span.dagtotaal span,div#main span.weektotaal span{padding:0;background:0 0;color:#404040}div#main span.dagtotaal span{font-weight:700}div#main table.even input,div#main table.even select,div#main table.even textarea div#main table.oneven input,div#main table.oneven select,div#main table.oneven textarea{border:1px solid #ccc}div#main table.oneven input,div#main table.oneven select,div#main table.oneven textarea{background:rgba(255,255,155,.3)}.timeSpentForm{float:left;margin-right:5px}.timeSpent,.timeSpentForm label{margin-right:4px}div#main table input.timeSpentButton{border:0;background:#090;color:#fff}::-webkit-input-placeholder{font-style:italic}::-moz-placeholder{font-style:italic}:-ms-input-placeholder{font-style:italic}';
		var h = '<style>'+css+'</style>';
		$('head').append(h);
	};
	

	/**
	* add a timeSpent input field to a line
	* @param {jQuery object} $line The line to add the input to
	* @returns {undefined}
	*/
	var addTimeSpentInput = function($line) {
		if (!$line.find('input.timeSpent').length) {
			//it doesn't have an input yet
			var lineNumber = $line.find('td.nummer').text();

			var tabindex = parseInt($line.find('input.tijd').eq(0).attr('tabindex'),10),
				inputId = 'timeSpent-'+lineNumber,
				titleAttr = 'Bijv. 30 (=30m), 1h15, 1h15m, 1:15 (=1h15m), 1.5 (=1h30m)...';

			var html = '<div class="timeSpentForm">';
				html += '<label for="'+inputId+'">Tijdsduur</label>';
				html += '<input type="text" class="tijd timeSpent" name="'+inputId+'" id="'+inputId+'" placeholder="1h15" tabindex="'+tabindex+'" title="'+titleAttr+'">';
				html += '<input type="button" class="timeSpentButton" value="Opslaan" tabindex="'+tabindex+'">';
				html += '</div>';

			$line.find('.eerste.verwijderknop').find('.urenfase, .urenfase2').after(html);
		}
	};
	

	/**
	* 
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var newLineHandler = function(e) {
		//add spentTime input field to any urenregel that doesn't have one yet
		$form.find('.urendag').each(function() {
			var $line = $(this);
			if ($line.find('input[class="tijd"]').length) {
				//this rule isn't completed yet
				addTimeSpentInput($line);
			}
		});

	};


	/**
	* initialize hook for when new line is added
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var initAddLineHook = function() {
		//$table.on('click', '.tweede:first-child ');
		$form.on('click', '[onclick^="voegNieuweRegelToe"], [onclick^="nieuweUrenregel"]', function() {setTimeout(newLineHandler, 500);});
	};


	/**
	* parse time string and return array containing hours and minutes
	* @param {string} time The time spent, like 1h15m, 15m, 1h, 15, 1h15, 1.15, 1:15 etc
	* @returns {array} [hours, minutes]
	*/
	var parseTime = function(timeStr) {
		var hourDelimiterRegex = /[\:\.\h]/,
			hours = 0,
			minutes = 0;

		if (timeStr) {

			var m = timeStr.match(hourDelimiterRegex);

			if (m) {
				//hours and possibly minutes
				var delimiter = m[0],
				arr = timeStr.split(delimiter);

				hours = parseInt(arr[0], 10);
				if (arr[1]) {
					if (delimiter === '.') {
						//consider 1.25 as 1h15m
						var factor = +timeStr;//+ converts string to number
						factor -= hours;
						minutes = Math.floor(60*factor);
					} else {
						minutes = parseInt(arr[1], 10);
					}
				}
			} else {
				//only minutes
				minutes = parseInt(timeStr, 10);
			}
		}

		return [hours, minutes];

	};


	/**
	* 
	* @param {string} vaurername Description
	* @returns {undefined}
	*/
	var logTimeHandler = function(e) {
		e.preventDefault();
		//set the current starttime (time may have been entered the old-fashioned way)
		setStartTime();
		var $btn = $(e.currentTarget);
		var timeSpent = $btn.siblings('.timeSpent').val();
		if (timeSpent) {
			var timeArr = parseTime(timeSpent),
				hours = timeArr[0],
				minutes = timeArr[1];
			
			console.log('logTimeHandler - startTime:',startTime);
			var startHours = startTime[0],
				startMinutes = startTime[1];

			var endMinutes = startMinutes + minutes,
				endHours = startHours + hours;
			if (endMinutes > 59) {
				endHours += Math.floor(endMinutes/60);
				endMinutes = endMinutes%60;
			}

			if (startMinutes < 10) {
				startMinutes = '0'+startMinutes;
			}

			if (endMinutes < 10) {
				endMinutes = '0'+endMinutes;
			}

			var entryStart = startHours+':'+startMinutes,
				entryEnd = endHours+':'+endMinutes;

			//now put time into input fields
			$btn.closest('table')
				.find('.tweede.rechts')
				.find('input.tijd:first-child')
				.val(entryStart)
				.next()
				.val(entryEnd);
			
			slaOp();//global function defined in original script
		}
	};


	/**
	* check if enter is pressed within timeSpent input
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var timeSpentKeyHandler = function(e) {
		if (e.keyCode === 13) {
			$(e.target).siblings('.timeSpentButton').trigger('click');
		}
	};
	
	
	


	/**
	* 
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var initLogEvent = function() {
		$form.on('click', '.timeSpentButton', logTimeHandler);
		$form.on('keyup', '.timeSpent', timeSpentKeyHandler);
	};


	/**
	* set the time to start logging from (the last time we have logged until so far)
	* @param {array} newStartTime [optional] [hours, minutes] to set time to
	* @returns {undefined}
	*/
	var setStartTime = function(newStartTime) {
		if (newStartTime) {
			startTime = newStartTime;
		} else {
			//get the tot times
			var $totTimes = $('.uren_van_tot:nth-child(3)');
			if ($totTimes.length) {
				$totTimes.each(function() {
					var hours = startTime[0],
						minutes = startTime[1],
						entryArr = $(this).text().split(':'),
						entryHours = parseInt(entryArr[0],10),
						entryMinutes = parseInt(entryArr[1],10);

					if (entryHours > hours || (entryHours === hours && entryMinutes > minutes)) {
						startTime = [entryHours, entryMinutes];
					}
				});
			}
		}
	};
	
	


	/**
	* 
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var init = function() {
		addCss();
		//adjustTabindexes();
		//checkTabindexes();
		setStartTime();
		initAddLineHook();
		initLogEvent();
		newLineHandler();
	};

	init();

})(jQuery);