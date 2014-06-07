// ==UserScript==
// @name ABW Bezpieczny Przycisk
// @namespace abw_bezpieczny_przycisk
// @description Przycisk do ABW
// @include http://*.wykop.pl/*
// @version 2.87
// ==/UserScript==

var x = document.createElement('script');
x.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js');
document.body.appendChild(x);

function main() {
	var Grupa = 'agencjabezpieczenstwawykopu';
	var WykopAction = window['_action'] || unsafeWindow['_action'];
	var x;
	var token = window.token || unsafeWindow.token;
	var FirstRun = localStorage.getItem('abw_przycisk_observe_ginden');
	if (!FirstRun) {
		  x = confirm("Czy chcesz zaobserwowa\u0107 Gindena, tw\u00F3rc\u0119 tego dodatku"
		  +"(ten komunikat powinien pojawi\u0107 si\u0119\ntylko raz, je\u015Bli pojawia si\u0119 cz\u0119\u015Bciej - daj zna\u0107)?\nJeśli juz go subskrybujesz, nic si\u0119 nie stanie.");
		  if (x === true) {
			  $.get('http://www.wykop.pl/ludzie/observe/Ginden/'+token+'/');
		  }
		  else {
			  
		  }
		  localStorage.setItem('abw_przycisk_observe_ginden', 'true');
	}
	
	var CurrentUser, UserColor;
	
	try {
		CurrentUser = $('nav div.avatar ul li').first();
		UserColor = (function(UserNode){
			var link = $('a', UserNode);
			var lista_klas = link.attr('class').split(/\s+/);
			var kolor = lista_klas.filter(function(el){
				if (el.match('color-')) {
					return true;
				}
				return false;
			});
			return (kolor[0].replace('color-', ''));
			})(CurrentUser);
		
		CurrentUser = $.trim(CurrentUser.text());

	} catch(e) {
		CurrentUser = 'Guest';
		UserColor = 0;
	}

	$.extend({ alert: function (message, title) {
	    $("<div />").dialog( {
		  buttons: { "Ok": function () { $(this).dialog("close"); } },
		  close: function (event, ui) { $(this).remove(); },
		  resizable: false,
		  title: title,
		  modal: true
		  }).text(message);
	    }
	});
	
	var SendMessageToChannel = function SendMessageToChannel (message, grupa, spamlista) {
	    var url  = (grupa) ? 'http://www.wykop.pl/wpis/dodaj/kanal/'+grupa+'/' : 'http://www.wykop.pl/wpis/dodaj/';
	    $.ajax(
		  url,
		  {type: 'POST',
		  data: {
			'__token': token,
			'entry[body]': message
			}
		  }
	    )
	    .success(function(){
		  var alarm = 'Request wys\u0142any poprawnie, sprawd\u017A czy si\u0119 \n'+
		  ' doda\u0142 wpis (pozdro 600 dla #maciej).';
		  if (UserColor !== "2") {
			alarm = 'Nie jeste\u015B bordowy, przejd\u017A na stron\u0119 grupy'+
			' i rozdziel spamlist\u0119 do komentarza. Ale doda\u0142o si\u0119'+
			' poprawnie (chyba, pozdrawiam #macieja).';
		  }
		  $.ajax({
			method: 'GET',
			url: '/ludzie/wpisy/'+CurrentUser+'/',
			success: function(html){
			    var Entry = $('ul#activities-stream li', html);
			    var EntryID = Entry.first().attr('data-id');
			    var temp = Entry.text();
			    if (!temp.match('AgencjaBezpiecze\u0144stwaWykopu') && !temp.match('\u21D2') && grupa) {
				  alert('Co\u015B posz\u0142o nie tak, nie jeste\u015B cz\u0142onkiem kana\u0142u. ;_;');
				  return;
			    }
			    //
			    if (spamlista) {
				  $.ajax({
				  url: 'http://wykop.koziolek.biz/spamlista/abw/?json',
				  dataType: 'json',
				  success: function(data) {
					var n = 0;
					var ok = (function(number){
						number = number + 1;
						return 10*(Math.pow(number, 2)-2*number+2);
						})(parseInt(UserColor, 10));
					var m = ok;
					var z;
					var message;
					var temp = function(element) {
						  message = message + '@' + element + ' ';
						  };
					while(data[n]) {
					    z = data.slice(n, m);
					    message = '';
					    z.forEach(temp);
					    if (n === 0) {
						  message =
		  '[Spamlista](http://wykop.koziolek.biz/spamlista/abw/) '+
		  '**[Wypisywanie ze spamlisty](http://www.wykop.pl/dodatki/pokaz/267/)** '
		  +'[Dodatek Gindena](https://userscripts.org/scripts/show/154553).'
		  +'\n'
		  + message;
					    }
					    $.ajax({
						  url:
	'http://www.wykop.pl/ajax/entries/addcomment/'+EntryID,
						  async: false,
						  type: 'POST',
						  data: {
							'__token': token,
							'entry[body]': message
						  }
						  
					    });
					    n = m;
					    m += ok;
					}
					
				  }
				  });
			    }
			    $.alert('Wpis zosta\u0142 dodany poprawnie. Prawdopodobnie.');
			}
			});
		  //$.alert(alarm);
	    });
	    
  
  
  
	};
	var ABW_report = function ABW_report() {
		  var tekst = '**PRZYCZYNA**\n['+$(this).data('title')+']('+$(this).data('id')+')\n';
		  $(document.body).append('<div id="dialog-zglosfest" title="Dodaj link ('+$(this).data('id')+') do ABW"></div>');
		  $('#dialog-zglosfest')
			.append(
			$('Komentarz do linku: <br><textarea style="width: 750px !important; height: 300px;" id="komentarz">'))
			.dialog({
			    create: function(event, ui) {
			$('#komentarz', this).val(tekst.replace('\u2022', ''));
			    },
			    autoOpen: true,
			    resizable: false,
			    height: 500,
			    width: 800,
			    modal: true,
			    buttons: {
			    "zg\u0142o\u015B": function() {
				  var ReportText = $('#komentarz', this).val();
				  SendMessageToChannel(ReportText, Grupa, true);
				  $( this ).dialog( "close" );
				  $('#dialog-zglosfest').empty().remove();
			    },
			    "zg\u0142o\u015B bez spamlisty": function() {
				  var ReportText = $('#komentarz', this).val();
				  SendMessageToChannel(ReportText, Grupa, false);
				  $( this ).dialog( "close" );
				  $('#dialog-zglosfest').empty().remove();
			    },
			    
			    "publicznie": function() {
				  var ReportText = $('#komentarz', this).val();
				  SendMessageToChannel(ReportText, false, false);
				  $( this ).dialog( "close" );
				  $('#dialog-zglosfest').empty().remove();
			    },
			    
			    "Anuluj": function() {
				  $( this ).dialog( "close" );
				  $('#dialog-zglosfest').empty().remove();
			    }
			    },
			    close: function(event, ui) {
				  $('#dialog-zglosfest').empty().remove();
			    }
			});
	};
	String.prototype.reverse=function(){return this.split("").reverse().join("");};
	String.prototype.killWhiteSpace = function() {return this.replace(/\s/g, '');};
	function GetConfiguration(numer) {return numer.toString(2).reverse();}
	(function () {
		var nightmode;
		if (typeof(window) !== 'undefined') {
			nightmode = window.nightmode;
		}
		else {
			nighmode = unsafeWindow.nightmode;
		}
		var jQueryUI_theme = $('<link/>').attr('rel', 'stylesheet').attr('type', 'text/css');
		if (nightmode) {
		  jQueryUI_theme.attr('href', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/dark-hive/jquery-ui.css');
		}
		else {
		  jQueryUI_theme.attr('href', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/smoothness/jquery-ui.css');
		}
		$(document.head).append(jQueryUI_theme);
	    var SavedConfiguration,
		  Belka,
		  OdznakaLink,
		  button_div,
		  Configuration;
	    if (typeof SavedConfiguration === typeof undefined) {
		  SavedConfiguration = 255;
		  // ustawiamy na 254, by zniknela nam ikonka
	  
	    }
	    Configuration = GetConfiguration(SavedConfiguration);
	    $(document.head).append(
		//
			$('<style />').html(
			"#abw_grupa a{background-image:url('http://i.imgur.com/aCuKTnV.png')"+
			" !important;"+
			"background-repeat:no-repeat;background-position: 5px 2px !important}"+
			"#abw_grupa:hover a { "+
			"background-image: url('http://i.imgur.com/ghRv6kv.png')"+
			"!important;background-repeat:no-repeat!important}"+
			" div.raport_abw{display:inline-block;float:right;cursor:pointer;"+
			"background-color:lightgray;width:50px;height:30px;line-height:30px"+
			"!important;font-size:18px!important;vertical-align:middle;text-align:center;"+
			"border-radius:5px;opacity:.2} div.raport_abw:hover{opacity:1}"
	    ));
	    if (Configuration[0] === '1') {
		  //przycisk
		  Belka = $('nav.main');
		  button_div = $('<div />')    
			.attr('class', 'quickpoint fright rel')
			.attr('id', 'abw_grupa');
		  OdznakaLink =$('<a />')
			.attr('class', 'tip fright cfff tdnone quickicon tcenter')
			.attr('href', 'http://www.wykop.pl/mikroblog/kanal/'+Grupa+'/');
		  Belka.append(button_div);
		  button_div.append(OdznakaLink);
	    }
	    if (Configuration[1] === '1') {
		  var jaszczur_button;
		  if (WykopAction === 'index' || WykopAction === 'upcoming') {
			var LinksList = $('.article-list article');
			$.each(LinksList, function(id, element){
			    var tytul = $('h2', element).text();
			    var LinkID = $(element).attr('data-id');
			    var jaszczur_button = $('<div />')
				  .attr('class', 'raport_abw')
				  .data('id', 'http://www.wykop.pl/link/'+LinkID+'/')
				  .data('title', tytul)
				  .text('ABW')
				  .click(ABW_report);
			    $('div.rel', element).prepend(jaszczur_button);
			});
		  }
		  else if (WykopAction === 'link') {
			var LinkID = document.URL;
			var tytul = $('h2 a span.linkTitle').text();
			LinkID = LinkID.substring(LinkID.indexOf('/link/')+6);
			LinkID = LinkID.substring(0, LinkID.indexOf('/'));
			jaszczur_button = $('<div />')
				  .attr('class', 'raport_abw')
				  .data('id', 'http://wykop.pl/link/'+LinkID+'/')
				  .data('title', tytul)
				  .text('ABW')
				  .click(ABW_report);
			$('h2 a span.linkTitle').parent().before(jaszczur_button);
		  }
		  else if (WykopAction === 'profile') {
			jaszczur_button = $('<div />')
				  .attr('class', 'raport_abw')
				  .data('id', document.URL)
				  .data('title', $('.userstory h2').text().killWhiteSpace())
				  .text('ABW')
				  .click(ABW_report);
			$('.userstory h2').before(jaszczur_button);
		  }
		  else if (WykopAction === 'entries') {
			jaszczur_button = $('<div />')
				  .attr('class', 'raport_abw')
				  .data('id', document.URL)
				  .data('title', $('.userstory h2').text().killWhiteSpace())
				  .text('ABW')
				  .click(ABW_report);
			$('.userstory h2').before(jaszczur_button);
		  }
	    }
  })();
}
function addJQuery(callback) {
    "use strict";
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
if (typeof $ === typeof undefined) {
    if (unsafeWindow.jQuery) {
        var $ = unsafeWindow.jQuery;
        main();
    } else {
        addJQuery(main);
        }
} else {main();}