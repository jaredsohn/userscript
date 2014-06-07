// ==UserScript==
// @name           Scrum cards
// @namespace      sl
// @include        https://prj.slweb.ru/projects/*/issues*
// @match          https://prj.slweb.ru/projects/*/issues*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.js
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {

$('.other-formats').append('| <a id="scrm" href="#">Cards</a>');
$('#scrm').click(function(){
	var jqIssues	= $('table.issues');
	var oFields		= {'ID':0, 'Tracker':0, 'Priority':0, 'Title':0, 'Author':0, 'Time':0, 'Date':0};
	var aData		= [];

	jqIssues.find('th').each(function(i){
		if ( $(this).find('a').length != 0 ) {
			var sTitles = $(this).find('a').text();
			switch ( sTitles ) {
					case '#':
						oFields.ID	= i;
					break;
					case 'Трекер':
						oFields.Tracker	= i;
					break;
					case 'Приоритет':
						oFields.Priority	= i;
					break;
					case 'Тема':
						oFields.Title	= i;
					break;
					case 'Оцененное время':
						oFields.Time	= i;
					break;
					case 'Желаемая дата завершения':
						oFields.Date	= i;
					break;
			}
		} else {
			oFields.Author = i;
		}
	});

	jqIssues.find('tr').each(function(i){
		var jqTd	= $(this).find('td');
		var oTmp	= {};
		if ( jqTd.length > 0 ) {
			for ( sKey in oFields ) {
				var jqThis	= jqTd.eq( oFields[sKey] );
				if ( jqThis.text() != '' ) {
					oTmp[sKey]	= jqThis.text();
				} else if ( jqThis.find('a').text() != '' ) {
					oTmp[sKey]	= jqThis.find('a').text();
				}
			}
			aData.push( oTmp );
		}
	});

	var iLength	= aData.length;
	if ( iLength > 0 ) {

		var sOut		= '';
		var iPages	= Math.ceil( iLength / 8 );

		function drawPriority( iPriority ) {
			var oData	= {	0:		'low.png',
									50:	'medium.png',
									70:	'high.png',
									90:	'very_high.png'};
			var sUrl	= '';
			for ( iKey in oData ) {
					if ( iPriority >= iKey ) {
						sUrl	= oData[iKey];
					}
			}
			return sUrl;
		}

		for ( var i = 0; i < iPages; i++ ) {
			sOut	+= '<table class="b-card">';
			for ( var j = 0; j < 8; j++ ) {
				sOut	+= ( j % 2 == 0 ) ? '<tr>':'';
				sOut	+= '<td>';
				if ( aData.length > 0 ) {
					var oCur			= aData.pop();
					var iPriority	= ( typeof oCur.Priority != 'undefined' ? parseInt( oCur.Priority, 10 ) : 0 );
					var sDate		= ( typeof oCur.Date != 'undefined' ? '<p class="grey">Завершить до: '+oCur.Date+'</p>' : '' );
					var iTime		= ( typeof oCur.Time != 'undefined' ? parseInt( oCur.Time ) : 0 );

					sOut += '<div class="b-left"> \
						<h1>#'+oCur.ID+' <span>'+oCur.Tracker+'</span></h1> \
						<p>'+oCur.Title+'</p> \
						<p class="grey">Автор: '+oCur.Author+'</p> \
						'+ sDate +' \
					</div> \
					<div class="b-right"> \
						<div class="b-plan"> \
							'+ iTime +' \
						</div> \
						<div class="b-prior-image" style="background: url(\'http://img.softline.ru/softline/images/scrumcards/'+drawPriority( iPriority )+'\') bottom right no-repeat;"></div> \
						<div class="b-bubble"> \
							' + iPriority + ' \
						</div> \
					</div>';
				}
				sOut	+= '</td>';
				sOut	+= ( j % 2 == 1 ) ? '</tr>':'';
			}
			sOut	+= '</table>';
		}

		$('head').html('<title>Scrum Cards</title><style media="print">.noprint{display: none;}</style> \
			<style media="all">.b-panel{text-align: center; background: #000; font-size: 1.15em; color: #fff; padding: 0.5em;} \
			.b-panel a {color: #fff;}</style> \
			<link href="http://img.softline.ru/softline/images/scrumcards/cards.css" media="all" rel="stylesheet" type="text/css" />');
		$('body').html('<div class="noprint b-panel"><a href="#" onclick="window.print(); return false;">распечатать</a> :: <a href="http://img.softline.ru/softline/images/scrumcards/settings.png" target="_blank">настройки</a> :: <a href="'+location.href+'">вернуться</a></div>' + sOut );
	} else {
		alert('Список задач пуст');
	}
	return false;
});

}

// load jQuery and execute the main function
addJQuery(main);
