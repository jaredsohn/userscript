// ==UserScript==
// @description    А ты боишься умереть, %username%?
// @name           kamikadze
// @namespace      ru.lepra.anatol
// @include        http://leprosorium.ru/
// @include        http://www.leprosorium.ru/
// @include        http://leprosorium.ru/my/inbox/*
// @include        http://www.leprosorium.ru/my/inbox/*
// @include        http://leprosorium.ru/my/inbox/write/
// @exclude        http://leprosorium.ru/my/inbox/
// @exclude        http://www.leprosorium.ru/my/inbox/
// ==/UserScript==

function embedFunction(s) { document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2'); }

var soulHarvesterName = 'SoulHarvester';
embedFunction( "var soulHarvesterName = '" + soulHarvesterName + "';" );

function xPathSingle(xpath, parent){return document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}
embedFunction( xPathSingle );

function $(id) { return document.getElementById(id); }
function $$(tag) { return document.createElement(tag); }

var started = GM_getValue('death_sequence_started', 0);

if ( /leprosorium\.ru\/$/.test(location.href) ) {
	function startDeathSequence(t){
		if ( confirm('Внимание!\nЭто не шутка, как вы возможно подумали. Нажав ОК, Вы действительно скорее всего лишитесь реги на лепре.\nУ Вас ещё есть шанс отказаться, нажав "Отмена"(Cancel).') )
		{
			var span = document.createElement('span')
			//span.innerHTML = '<span class="startDeathSequence"></span>';
			span.className = 'startDeathSequence';
			t.appendChild(span);
			return true;
		}
		return false;	
	}
	embedFunction( startDeathSequence );
	
	var left_div = xPathSingle("//div[@class='layout_left']", document);
	var unread_div = xPathSingle("//div[@id='domains_unread']", left_div);
	
	var ns = unread_div.nextSibling;
	
	var div = $$('div');
	div.innerHTML = '<div>'
									+ '<a onclick="return startDeathSequence(this);" style="font-size:13px;margin-top:5px;padding:15px 0 13px 75px;" href="/my/inbox/write/">Уйти навсегда</a>' +
									'</div>';
									
	left_div.insertBefore(div, ns);

	function sequenceStarted(event) {
		if ( event.target.className == 'startDeathSequence') {
		window.setTimeout( function() { 
																		GM_setValue('death_sequence_started', 1);
																	}, 0 ); //fucking security
		}
	}
	div.addEventListener('DOMNodeInserted', sequenceStarted, false);
	
	return;
}

if ( /\/my\/inbox\/write/.test(location.href) && started ) {
	function createInboxOfDeath(){
		var our_form = xPathSingle("//form[@onsubmit='return writeOnSubmit(this)']", document);
		var whom_inp = xPathSingle("//input[@name='whom']", our_form);
		whom_inp.value = soulHarvesterName;
		var comment_inp = xPathSingle("//textarea[@name='comment']", our_form);
		comment_inp.value = 'Этот инбокс предназначен для зверского убийства и ни для чего кроме. Не обращайте внимания.';
		our_form.submit();
	}
	embedFunction( createInboxOfDeath );
	embedFunction('createInboxOfDeath();');
	
	return;
}

if ( /\/my\/inbox\//.test(location.href) && started ) {

	var user_input = $('js-inboxUserAddInput');
	// если инбокс не наш
	if ( !user_input ) { return; }
	
	if ( xPathSingle("//div[@class='post ord']/div[@class='dt']", document).innerHTML
			  == 'Этот инбокс предназначен для зверского убийства и ни для чего кроме. Не обращайте внимания.' )
	{
		// мы на месте
		GM_setValue('death_sequence_started', 0);
		
		var inbox_id = location.href.match(/my\/inbox\/(\d+)/)[1];
		embedFunction( "var inbox_id = " + inbox_id + ";" );
		function fuckThemAll() {
			alert('Нажав ОК под данным сообщением, вы увидите серию роковых ошибок, и через несколько (десятков) секунд (минут) ваша рега исчезнет.');
			$('js-inboxUserAddInput').value = '.';
			for(var i = 0; i < 700; i++) {
				inboxHandler.usersAdd('call', inbox_id , soulHarvesterName);
			}
			return false;
		}
		function letterInvitation() {
			if ( confirm('Вам любезно предоставляется возможность написать прощальное письмо. Возможно мы даже его опубликуем.\nЕсли хотите просто спокойно умереть, нажмите ОК.\nЧтобы сначала написать письмо, нажмите "Отмена"(Cancel), а когда допишете, пройдите по ссылке "наконец-то умереть" в правой нижней части страницы.') )
			{
				fuckThemAll();
			}
		}
		embedFunction( fuckThemAll );
		
		var ui_prnt = user_input.parentNode;
		var ui_ns = user_input.nextSibling;
		
		var div = $$('div');
		div.innerHTML = '<div>'
										+ 'или '
										+	'<br />'
										+	'<a class="js-inboxPerson-ban" href="#" onclick="return fuckThemAll();">'
											+	'наконец-то умереть'
										+	'</a>'
										'</div>';
										
		ui_prnt.insertBefore(div, ui_ns);

		embedFunction( letterInvitation );
		embedFunction('letterInvitation();');
	}
	
	
	return;
}