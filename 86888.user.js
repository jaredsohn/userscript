// ==UserScript==
// @name           GLB Offense AI - print-friendly
// @namespace      GLB
// @description    Printer-friendly popup of GLB Offense AI
// @version        1.0.0
// @author         ErDrRon
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){

	// functions
	var buildobj = function(a){
		var newobj = document.createElement(arguments[0]);
		for (var varval = 1; varval < arguments.length; varval++) {
			newobj.setAttribute(arguments[varval],arguments[varval+1]);
			varval++;
		};
		return newobj;
	};


	function doPrint(){

		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
			if (minutes < 10){
				minutes = "0" + minutes
				};

		var d = month + '-' + day + '-' + year + '&nbsp;&nbsp;&nbsp;' + hours + ':' + minutes;

		var fullstring = '<font size =4><b>' + $('div[class*="big_head"]:first').text() + '</b></font><br>Team Tactics - Offense AI<br><font size =1>' + d + '</font><br><br>';
		$('div[class*="tactic_container"]').each(function(z){
			$('div[class="tactic"], select, input[type="text"]', $(this)).each(function(x){
				if ((x % 2) == 0){
					fullstring += '';
				}
				switch ($(this).attr('tagName').toLowerCase()) {
					case 'div':
						fullstring += '<font size =2>' + $(this).text() + '</font>';
						break;
					case 'select':
						fullstring += '<font size =3><b>' + $(this).val() + '</b></font>';
						break;
					case 'input':
						fullstring += '<font size =3><b>' + $(this).attr('value') + '</b></font>';
						break;
				}
                if ((x % 2) != 0){
					fullstring += '<br>';
				}else{
					fullstring += '&nbsp;&nbsp;';
				}
			})
		})
		workingwindow=window.open('',"Team Tactics - Offense AI", "width=800,height=600,scrollbars=yes,resizable=yes,toolbar=yes,location=no,menubar=yes");

		if (!workingwindow.opener) workingwindow.opener = self;
		workingwindow.document.writeln(fullstring);
	}

	
	var printerdbut = buildobj('input','type','button','value','Print Friendly','id','printerdbut','name','printerdbut');
	$(printerdbut).insertBefore($('div[class="medium_head"]:eq(1)'));
	$('#printerdbut').bind('click',doPrint);
	

})
