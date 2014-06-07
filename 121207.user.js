// ==UserScript==
// @name           Tatoeba Sentence Timeline
// @namespace      Jakob V. <jakov@gmx.at>
// @description    Places the log entries and the tags chronologically between the comments
// @include        http://anonymouse.org/cgi-bin/anon-www_de.cgi/http://tatoeba.org/*
// @include        http://tatoeba.org/*/sentences/show/*
// @require        http://code.jquery.com/jquery-1.7.js
// @require        https://jquery-json.googlecode.com/files/jquery.json-2.2.js
// ==/UserScript==

// @require        http://www.mattkruse.com/javascript/date/date.js
$(document).ready(function(){
	
	namebynumber = $.evalJSON(GM_getValue('namebynumber') || $.toJSON({}));
	console.log('namebynumber=',$.toJSON(namebynumber));
	
	userimage =  $.evalJSON(GM_getValue('userimage') || $.toJSON({}));
	console.log('userimage=',$.toJSON(userimage));

	facelang = window.location.href.split('/')[3];
	console.log('facelang: '+facelang);
	pencil = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFUSURBVDjLrZM/SAJxGIZdWwuDlnCplkAEm1zkaIiGFFpyMIwGK5KGoK2lphDKkMDg3LLUSIJsSKhIi+684CokOtTiMizCGuzEU5K3vOEgKvtBDe/2Pc8H3x8NAM1fQlx4H9M3pcOWp6TXWmM8A7j0629v1nraiAVC0IrrwATKIgs5xyG5QiE+Z4iQdoeU2oAsnqCSO1NSTu+D9VhqRLD8nIB8F0Q2MgmJDyipCzjvYJkIfpN2UBLG8MpP4dxvQ3ZzGuyyBQ2H+AnOOCBd9aL6soh81A5hyYSGWyCFvxUcerqI4S+CvYVOFPMHxLAq8I3qdHVY5LbBhJzEsCrwutpRFBlUHy6wO2tEYtWAzLELPN2P03kjfj3luqDycV2F8AgefWbEnVqEHa2IznSD6BdsVDNStB0lfh0FPoQjdx8RrAqGzC0YprSgxzsUMOY2bf37N/6Ud1Vc9yYcH50CAAAAAElFTkSuQmCC';
	tag_blue = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHcSURBVDjLhZPZihpBFIbrJeY2wbcQmjxdIGSSTC4zQxLyAK4o7igoKm7TPW49LoiYjqLG3DWpZmx7/tQpsR1xycW5qTr/9/+n+jTTdR3dbhftdhutVgvNZhOapkFVVTQajSsA7FKxTqcDx3GOajqdSki1Wr0IYeRMAsMwpPNkMnEhdCZSoFQqnYUwikzN5EYH9XpdNU0Ttm3LcwJWKhXk8/mTEEauu0YhfhKRDcuysDBt5H5tk4zHYxSLReRyuSMII+dd5M1mAxL//uvgw8Mz3t4DWWN7NxqNKAXS6fQBhIkZ+Wq1kk3r9Rpz4XytPeNLF/iqAx8f9pDhcEgpEI/HXQir1WpvxIx8uVzKps7Kls53AvCjB3x7PIQMBgNKgUgkIiGSUi6XFTEjXywWsunxj433qoM7fQ+51oDMzy2k1+tRCoRCoSt3lkKhoIgZ+Xw+P4J8F4DPTeDm3oK92aZIJpMIBAKvD15UzKdks1k+m81cyDsB+SRGuG2tYVpPL8Ued4SXlclklFQqxWkTCaILyG3bgWXvnf1+v8d9xFPLkUgklFgsxmkTd5+YxOL8QHwWQBWNRr3ipTktWL/fPym+CKAKh8PeYDDISezz+TwnV/l/v6tw9Qrxq3P3/wBazDrstPR7KQAAAABJRU5ErkJggg==';
	comments = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG/SURBVDjLjZK9T8JQFMVZTUyc3IyJg4mDi87+GyYu6qB/gcZdFxkkJM66qJMGSNRBxDzigJMRQ1jQ4EcQ+SgVKB+FtuL13EdJxNDq8Ev7Xu85797T51nwhqeAH5w6cAxWwDgReX7jwYfdaCIraroptB7NLlVQrOoiGEsL1G06GZyxuILicsMUH3VTlOqGKNUMUdTacj+j1Nng0NGAT2WxYosK1bbIVVoiW27J9V8G57WWKVSczMV5iK+Tudv1vVh5yXdlLQN+os4AFZss2Ob82CCgQmhYHSnmkzf2b6rIhTAaaT2aXZALIRdCLgRtkA1WfYG4iKcVYX52JIs7EYvFmJ8wGiEXQi6EXAhdyn2MxQaPcg68zIETTvzyLsPzWnwqixVbhFwI3RFykes+A9vkIBKX4jCoIxdCLrI4/0OcUXXK4/1dbbDBS088xGGCCzAJCsiF2lanT8xdKNhHXvRarLFBqmcwCrbAhL32+kP3lHguETKRsNlbqUFPeY2OoikW62DNM+jf2ibzQNN0g5ALC75AGiT59oIReQ+cDGyTB+TC4jaYGXiRXMTD3AFogVmnOjeDMRAC025duo7wH74BwZ8JlHrTPLcAAAAASUVORK5CYII=';
	
	//$('.sentenceAdded').css({'background':'-moz-linear-gradient(bottom, #c2e5a9 30%, #e1f2d6 100%)', 'border':'1px solid #c2e5a9'});
	//$('.linkAdded').css({'background': '-moz-linear-gradient(bottom, #d7f3de 30%, #ebf9ef 100%)', 'border':'1px solid #d7f3de'});
	//$('.sentenceModified').css({'background': '-moz-linear-gradient(bottom, #fcfbba 30%, #fefede 100%)', 'border':'1px solid #fcfbba'});
	//$('.commentText').css({'background':'-moz-linear-gradient(top, #cae2aa 3px, #ffffff 3px, #ffffff 4px, #e9e9e9 4px, #ffffff 53px)'});
	//$('span.tag').css({ 'background':'#fdf58d', 'background':'-moz-linear-gradient(bottom, #fdf58d 0%, #fade90 100%)', });
	months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	languages_arr = [
		/iso|(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d)(?::(\d\d))?/,
		/usa|(\w{3}) (\d{1,2})\w+? (\d\d\d\d), (\d\d):(\d\d)(?::(\d\d))?/,
		/deu|vor (\d+) Minuten|vor (\d+) Stunde\(n\)|vor (\d+) Tag\(en\)|(Datum unbekannt)/,
		/eng|(\d+) mn ago|(\d+) hour\(s\) ago|(\d+) day\(s\) ago|(date unknown)/,
		/spa|hace (\d+) minutos|hace (\d+) hora\(s\)|hace (\d+) día\(s\)|(fecha desconocida)/,
		/epo|antaŭ (\d+) minutoj|antaŭ (\d+) horo\(j\)|antaŭ (\d+) tago\(j\)|(dato nekonata)/,
		/eus|duela (\d+) hilabete|duela (\d+) ordu|duela (\d+) egun|(Data, eguna, ezezaguna)/,
		/fre|il y a (\d+) mn|il y a (\d+) heure\(s\)|il y a (\d+) jour\(s\)|(date inconnue)/,
		/ita|(\d+) minuto\/i fa|(\d+) ora\/e fa|(\d+) giorno\/i fa|(data sconosciuta)/,
		/hun|(\d+) perce|(\d+) órája|(\d+) nappal ezelőtt|(ismeretlen dátum)/,
		/nds|vör (\d+) Minuten|vör (\d+) Stünn\(en\)|vör (\d+) Daag|(Datum nich kennt)/,
		/pol|(\d+) minut temu|(\d+) godzin temu|(\d+) dni temu|(data nieznana)/,
		/pt_BR|(\d+) minuto\(s\) atrás|(\d+) hora\(s\) atrás|(\d+) dias\(s\) atrás|(Data desconhecida)/,
		/tgl|(\d+) minuto nakaraan|(\d+) oras nakaraan|(\d+) araw nakaraan|(Hindi tiyak ang petsa)/,
		/tur|(\d+) dakika önce|(\d+) saat önce|(\d+) gün önce|(tarih bilinmiyor)/,
		/rus|(\d+) мин. назад|(\d+) ч. назад|(\d+) д. назад|(дата неизвестна)/,
		/ara|منذ (\d+) دقيقة (دقائق)|منذ (\d+) ساعة \(ساعات\)|منذ (\d+) يوم \(أيام\)|(التاريخ غير معروف)/,
		/chi|(\d+)分钟前|(\d+)小时前|(\d+)天前|(未知日期)/,
		/jpn|(\d+)分前|(\d+)時間前|(\d+)日前|(日付不明)/,
	];
	lang_obj = {};
	$.each(languages_arr, function(ind, val){
		test = val.toString().substr(1,val.toString().length-2).split('|');
		lang_obj[test[0]] = {'minutes':test[1],'hours':test[2],'days':test[3],'unknown':test[4]};
	});
	lang_obj;
	
	usernamerequest = [];
	function applyusername(usernumber){
		if(!isNaN(usernumber)){
			if(namebynumber[usernumber]){
				username = namebynumber[usernumber];
				$comments.children().find('.author a:contains('+usernumber+')').text(username).attr('href', 'http://tatoeba.org/'+facelang+'/user/profile/'+username);
				$('.tagName').each(function(){
					$(this).attr('title',$(this).attr('title').replace(usernumber+',', username+','));
				});
				$comments.children().find('div.image a[href^="/users/show/"]').each(function(){
					$(this).attr('href',$(this).attr('href').replace('/users/show/'+usernumber, '/user/profile/'+username));
				});
				applyuserimage(username, usernumber);
			}
			else if(!usernamerequest[usernumber]){
				usernamerequest[usernumber] = $.get(
					'http://tatoeba.org/'+facelang+'/users/show/'+usernumber,
					function(data){
						username = $(data).find('a:first').attr('href').substr('/xxx/user/profile/'.length);
						namebynumber[usernumber] = username;
						GM_setValue('namebynumber', $.toJSON(namebynumber));
						console.log('namebynumber', $.toJSON(namebynumber));
						$comments.children().find('.author a:contains('+usernumber+')').text(username).attr('href', 'http://tatoeba.org/'+facelang+'/user/profile/'+username);
						$('.tagName').each(function(){
							$(this).attr('title',$(this).attr('title').replace(usernumber+',', username+','));
						});
						$comments.children().find('div.image a[href^="/users/show/"]').each(function(){
							$(this).attr('href',$(this).attr('href').replace('/users/show/'+usernumber, '/user/profile/'+username));
						});
						applyuserimage(username, usernumber);
					}
				);
			}
		}
		else{
			applyuserimage(usernumber, usernumber);
		}
	}
	
	userimagerequest = [];
	function applyuserimage(username, usernumber){
		if(username!=""){
			if(userimage[username] && (userimage[username]!='unknown-avatar' || Math.random()>0.1)){ // should reload the userimage in 10% of the cases (thereby from time to time) if it is unknown-avatar;; this should be solved more elegantly!!! maybe a timestamp of the last lookup?
				$comments.children().find('div.image img[alt="'+usernumber+'"], div.image img[alt="'+username+'"]').attr('src', 'http://flags.tatoeba.org/img/profiles_36/'+userimage[username]+'.png');
			}
			else{
				userimagerequest[username] = $.get(
					'http://tatoeba.org/'+facelang+'/user/profile/'+username,
					function(data){
						userimage[username] = $(data).find('div.module.profileSummary img').attr('src').split('/').pop().split('.').shift();
						GM_setValue('userimage', $.toJSON(userimage));
						console.log('userimage', $.toJSON(userimage));
						$comments.children().find('div.image img[alt="'+usernumber+'"], div.image img[alt="'+username+'"]').attr('src', 'http://flags.tatoeba.org/img/profiles_36/'+userimage[username]+'.png');
					}
				);
			}
		}
	}
	
	
	
	$changes = $(".annexeLogEntry");
	$changes_clones = $changes.clone(true);
	//$changes_clones = $changes;
	
	$tags = $('span.tag');
	$tags_clones = $tags.clone(true);
	//$tags_clones = $tags;
	
	$module = $('.module:has(.comments), .module:has(.sentences_set) + .module').filter(':first');
	$module.find('em').wrap('<ol class="comments"><li></li></ol>').parent().css({'clear':'both', 'padding':'15px'}).data('date', new Date());
	
	$comments = $module.find('.comments');
	$comments.append($changes_clones);
	$comments.append($tags_clones);
	
	console.info($comments.children());
	
	$comments.children().each(function(index, value){
		console.log(this);
		if(!$(value).data('date')){
			if($(value).is('.annexeLogEntry')){
				text = $(value).find('div:first').text().split('-').pop().trim();
			}
			else if($(value).is('.tag')){
				text = $(value).find('a.tagName').attr('title').trim();
			}
			else if($(value).is('li')){
				text = $(value).find('.meta .date').attr('title');
			}
			//
			for(ind in languages_arr){
				val = languages_arr[ind];
				textdate_arr = text.match(val);
				if(textdate_arr){
					date = false;
					console.log('found match in',(val+'').substr(1).split('|').shift());
					console.log('textdate_arr=',textdate_arr);
					if(ind==0){ //iso
						date = new Date((textdate_arr[1]||0), (textdate_arr[2]-1||0), (textdate_arr[3]||0), (textdate_arr[4]||0), (textdate_arr[5]||0), (textdate_arr[6]||0));
					}
					else if(ind==1){ //usa
						date = new Date(1*textdate_arr[3],1*months_arr.indexOf(textdate_arr[1]),1*textdate_arr[2],1*textdate_arr[4],1*textdate_arr[5]);
					}
					else{ //languages
						if(textdate_arr[4]){
							date = new Date(0);
						}
						else{
							date = new Date(new Date()-(textdate_arr[1]||0)*60*1000-(textdate_arr[2]||0)*60*60*1000-(textdate_arr[3]||0)*24*60*60*1000);
						}
					}
					$(value).data('date', date);
					console.log('date=',date);
					break;
				}
			}
		}
		//
		if($(value).is('.annexeLogEntry')){
			$(value).css({'padding':'0', 'border':'0', 'margin':'1.5em 0'});
			authorandtime = $(value).find('div:first').html().split('-');
			author = '<div class="author">'+authorandtime[0].trim()+'</div>';
			username = $(author).text().trim();
			actions = '<div class="actions"><div class="action"><a href="/private_messages/write/'+username+'"><img height="24" width="24" alt="" title="Send private message" src="http://flags.tatoeba.org/img/send_pm.png"></a></div></div>';
			time = '<div title="" class="date">'+authorandtime[1].trim()+'</div>';
			$(value).children('div:first').addClass('meta').css({'background':'#fff'}).before(actions).html('<div class="image"><a href="/user/profile/'+username+'"><img height="36" width="36" alt="'+username+'" src="http://flags.tatoeba.org/img/profiles_36/unknown-avatar.png"></a></div>'+author+time);
			link = $(value).children('div:last').find('a[href^="/'+facelang+'/sentences/show/"]');
			if(link.is('a')){
				href = link.attr('href');
				inject = $('.sentences_set a.text[href="'+href+'"]').parent().parent().clone();
				inject.find('script').remove();
				inject.find('.audioButton, .delete').removeAttr('onclick');
				$(value).find('div:last').replaceWith(inject);
			}
			$(value).children('div:last').css({'border':'0','font-style':'italic','padding':'15px', 'background':'-moz-linear-gradient(top, rgba(202,226,170,1) 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px, rgba(255,255,255,0) 4px, rgba(255,255,255,1) 53px)'});
			if($(value).is('.sentenceAdded') || $(value).is('.sentenceModified ')){
				$(value).children('div:last').prepend('<img src="'+pencil+'"/>');
			}
			applyuserimage(username, username);
		}
		else if($(value).is('.tag')){
			$(value).wrapInner('<div class="commentText"></div>');
			$(value).css({'padding':'0', 'border':'0', 'margin':'1.5em 0', 'float':'none', 'border-radius':'0'});
			
			$(value).find('div:last').prepend('<img src="'+tag_blue+'" />').css({'font-style':'italic','padding':'15px', 'background':'-moz-linear-gradient(top, rgba(202,226,170,1) 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px, rgba(255,255,255,0) 4px, rgba(255,255,255,1) 53px)'});
			
			old = (new Date()-date)*1;
			console.log(old);
			dayshoursminutes = (old > (24*60*60*1000) ? (24*60*60*1000) : (old> (60*60*1000) ? (60*60*1000) : (60*1000)));
			whichone = (old > (24*60*60*1000) ? 'days' : (old> (60*60*1000) ? 'hours' : 'minutes' ));
			
			if(old > (30*24*60*60*1000)){
				nth = date.getDate().toString().substr(date.getDate().toString().length-1);
				hours = date.getHours().toString();
				hours = (hours.length==1 ? '0'+hours : hours);
				minutes = date.getMinutes().toString();
				minutes = (minutes.length==1 ? '0'+minutes : minutes);
				time = $('<div title="" class="date">'+months_arr[date.getMonth()]+' '+date.getDate()+(nth==1 ? 'st':(nth==2 ? 'nd' : (nth==3 ? 'rd' : 'th')))+' '+date.getFullYear()+', '+hours+':'+minutes+'</div>');
			}
			else{
				time = $('<div title="" class="date">'+lang_obj[facelang][whichone].replace(/\(\\d\+\)/, Math.round(old/dayshoursminutes)).replace(/\\\(/, '(').replace(/\\\)/, ')')+'</div>');
			}
			var title = $(this).find('.tagName').attr('title');
			var usernumber = title.split(',')[0].split(':')[1].trim();
			$(this).prepend(time);
			$(time).prepend('<div class="image"><a href="/users/show/'+usernumber+'"><img height="36" width="36" alt="'+usernumber+'" src="http://flags.tatoeba.org/img/profiles_36/unknown-avatar.png"></a></div>'+'<div class="author"><a href="/users/show/'+usernumber+'">'+usernumber+'</a></div>').wrap("<div class='meta'></div>").parent().css({'background':'#fff'});
			
			$(value).prepend($(value).find('.removeTagFromSentenceButton').html('<img alt="" onclick="return confirm();" src="http://flags.tatoeba.org/img/delete_comment.png">').css({'border-left':'0'}).wrap('<div class="actions"><div class="action"></div></div>').parent().parent());
			applyusername(usernumber);
		}
		else if($(value).is('li')){
			//$(value).find('.commentText').prepend('<img src="'+comments+'"/>');
		}
	});
	
	$('.comments').parent().children('h2').click(function(){
		$('.comments').children(':not(li)').slideToggle('slow');
	});
	
	$sorted = $comments.children().sort(function(a,b){
		console.log($(a).data('date') - $(b).data('date'));
		return $(a).data('date') - $(b).data('date');
	});
	console.info($sorted);
	$comments.html($sorted);
});