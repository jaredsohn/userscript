// ==UserScript==
// @name ABW Przycisk
// @namespace abw_przycisk
// @description Przycisk do ABW
// @include http://*.wykop.pl/*
// @version 2.72
// ==/UserScript==

var x = document.createElement('script');
x.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js');
document.body.appendChild(x);

function main() {
	"use strict";
	var Grupa = 'agencjabezpieczenstwawykopu';
	var WykopAction = window['_action'] || unsafeWindow['_action'];
	var x;
	var token = window.token || unsafeWindow.token;
	var FirstRun = localStorage.getItem('abw_przycisk_observe_ginden');

	var CurrentUser, UserColor;
	UserColor = window['yaParams'];
	if (UserColor) {
	    UserColor = UserColor['UserGroup'];
	}
	if (!UserColor || typeof(unsafeWindow) !== 'undefined') {
	    UserColor = unsafeWindow['yaParams']['UserGroup'];
	}
	CurrentUser = $('nav div.avatar ul li').first().text();
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
					var ok = (UserColor === '2') ? 50 : 20;
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
	$(function () {
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
			"#abw_grupa a{background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAgCAQAAAE+Z/smAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXRFWHRDb21tZW50AACJKo0GAAADh0lEQVR4nH1Ua0wTQRAeBUWpz6gE/6Am/jLR+EsT/UHi45cmRqOJxhiNP7aI9ApWBEQBjUaB4jOEl6AYxUowoiiKwQdigjFRiPhKFIyAtbRQaA9KC/TG3dtr79pUZ5PbmflmZndn5gYIsHViAf0gErhfBPaXBB7kIMoaxFuVlOluIECl181UjSjMliVGUJCIGgI9lF8c/EWg4ZRhFhXbzrOgJGAsHzYd0XKLcWCKZduzNPbNDETkdCIBnJ8Z86rkcCyijBJIX3wvgwVTxFEnvXmiRWjKkn0JXNvL9pLt8LVVDUWN2QHv26hFtHzQ8wwZkDTnSVyqWEEtJS2A1RXOXrb/ssmBuNIvESVhBFw2xD8/KVh/EPGZmUDyjJFBFfaKiKfjwdHJ/Oro9VPnu+0MKNnBY7VeBSGasxZj1T4MIeXylcf9fq3aM553QH4K0az6s8c2qRIFDdEBwbxi0mWaqYIgP1cKSwElnxNCT1Kp1wEFK7UKmygoMtEFM0Nz4eIPH7LyosDlNRzISiRgMT4+QyBFJ0NTQGx3efQJyTE+j5owdz/iw7NKRQk4e4W5tC+zH+QQMMUhTvpl6Ek+AeM8cYCZdDsI6KcyrXIJpvQMJ8cydU8H1ylQ7REG6qfavgXfLcFIH2cPTevr1L6wuREOTYuUC4nWn4WZ0dUTCrz9SKKIWpa8rayZRJ+wLph5bcVEr1aCJGgv89o/FNfsNK8sTChcXprYZLK+kJR6+Bwfymr2XFhNkWXF6x8ZrM3SWOkGWub+75EL9j9qY3/1u5v/N3J7Q99cJMgdpwfv78gOtdf1S9lLLEZV13RHaVQhShrWGtvclcX6ZUnRjq4xT9oCnoLaIwG05bbi1pLDFb1DpeaaXMTnV7hpis5t9wynzudSXXrgkrmrqFvBEqRZ840ejefw7WTExnzOG2aLA6NO4zwuNZ7jjt0d1K2jlAte0RSn/FMnEeuzOS/MGRkUB1g3ymPLzG2rt8HAp8Ctx9xpCznckId4L5PzSToSz3qubJfaXm8uQ99TNRkum0HHjavTL54ks6hTVNX+358wjB7lQNlGrWLImhLLO7p8t/VL5LIMe44voib3U7VKd7/9R2RzJQcTmZuVASMs6mwLHYqRaXzyroXowudSTNaGupKuvvAA3on336suGdaS4JAKG2fBFVWdPeln8+fYlkj4v9zoOhxz49y/sEz4C2QNb1dRgwHeAAAAAElFTkSuQmCC') "+
			" !important;"+
			"background-repeat:no-repeat;background-position: 5px 2px !important}"+
			"#abw_grupa:hover a { "+
			"background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAgCAQAAAE+Z/smAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXRFWHRDb21tZW50AACJKo0GAAADgklEQVR4nH1UXUhUURCedXWv7t1VN39a+7FWeojIfoRSslywlEpT02yzyNJKRUhNXaxELco2a0vv6rp7iAiiqPcgepB66MHHpD8CiygrTM0sySzT0/m5670rqwzcMzPfzJw5M3MHEFC6EEU+gBHkXYOYJwhymgEzDeBDNwljeUAEwNt6iAawZGQSI7tVZjh54UT7og8Iss+7DERMuUyDIp8xu0wH2HaHKZ16emScol/HbERGF+LB9IoyVk+XHjBDEVyJy2+gwWRRP0oyt9qqMs8wXwTHDtGzYi+sfqqEIsb0gqReYhHMLkpvYMiM6sIZLh1fQyw1agAX3zAN0DN+kAXiyqAZJBcMQfggYPN7AuaWAs5wInCHit8UWBgH3GSG6BfUr4Ck324yDlGgIp/H2toJUjBnbdUlh/3K6Uu+9GzQtFod9rflKHsKUlFua9sORSKgK9gn1K3R/nCGKSCw587MKQH56kbB/yaFlg2DPVGtWDwuyTISlR5j8w/+8MgvvClQtZkDl6wIbNW7LyLoFBmkAcOz8AlvvFvQTSgFM34FvKdV7igC04AUQeayMacZgTMWsHaaQTvbEHREGkaoiWUYgTeIXSLnQ5RhY249VS/vkxPjR2EtBb1Bi9/48iXtFj9xtjtk6Qv1C7c/hO6QQLXQkP7TMKEJH/2B5OdIi5S2tGTTYTL8kbbMVl7dMcOkWgIPbEDC0EZ30b66xPr4+lXl1sy6uMcauR+64Y2oqOjUBoJYKlOzTsb1aH6Xp5M2x/YHbthClEL/6k23FzYyTvq/ubaKTZwXhM+BHQpveVfSl9iqFV3mPXlQJa1mzG98fpa6vRZPcPS70InrUbwEhbU+NO2u7JbWLI/f93JnUQvgdBc37RSNQ2Fj7SYuFdh9SZ5bR9zsK4BUTffrqpnDBysB72rjvMtoGNGPdkRyaZeDO1r6iNt6LxeEcWes/E81Ac5t5LwULn4zjNBpZGvLyW2LcyHqpS/r0J/XozmcfQ5w/mnOe0RkpjNXVqiMV6oESx8pxQgfdIncuNhe04QMxElbcmTJS3XBKGU1Q9l2tSLyS6eeT/SJA3GvA7clYqI1hpjk1fg192vM24WaL0w5MuQFI8Ws7fVfioEp5N/++0icu5eES+kFnoRPcwMIU0n9JR2uZDS7pOass1nSFjeSn57sn7asQPh8boS6hCOO+TAH/AfA68tfJo9QJAAAAABJRU5ErkJggg==')"+
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
  });
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