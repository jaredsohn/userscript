// ==UserScript==
// @name        peka2tv chat
// @namespace   http://chat.sc2tv.ru
// @description sc2tv.ru chat with extra features
// @author      Winns
// @copyright   27.04.2013, Winns
// @include     http://chat.sc2tv.ru/*
// @include     http://sc2tv.ru/*
// @match 		http://chat.sc2tv.ru/*
// @match 		http://sc2tv.ru/*
// @version     2.0.21
// @updateURL   http://userscripts.org/scripts/source/166081.meta.js
// @downloadURL https://userscripts.org/scripts/source/166081.user.js
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_getResourceText
// @require     http://code.jquery.com/jquery-2.0.2.min.js
// @resource    peka2tv_chat_css https://raw.github.com/Winns/p2tv/master/peka2tv_chat2/peka2tv_chat.css
// ==/UserScript==
(function () {

GM_addStyle (GM_getResourceText ('peka2tv_chat_css'));

var HOST = window.location.host, 
	SUBDOMAIN = HOST.split('.')[0];
	FILE = location.pathname.substring(1);

$(document).ready(function() {
	if ( (SUBDOMAIN === 'chat') && (FILE === 'index.htm') ){

	/* ====== Variables ====== */
		var cfg = { 
			el: {
				chat:					'#wchat-msgs-wrapper',
				chatInput:				'#wchat-input',
				chatPopUpClose:			'.wchat-menu-popup-close',
				chatPopUp:				'.wchat-menu-popup',
				channelsWrapper:		'#wchat-chanells-wrapper',
				streamerBtn: 			'#wchat-btn-streamer',
				privateSmiles:			'.wchat-smile-private',
				userName: 				'.wchat-nick',
				userMenu: 				'#wchat-usermenu-wrapper',
				userMenuName: 			'.wchat-usermenu-name',
				userMenuClose: 			'#wchat-usermenu-wrapper .wchat-usermenu-close',
				userMenuBan: 			'#wchat-usermenu-wrapper .wchat-usermenu-banmenu .wchat-btn',
				userMenuBanCallback:	'#wchat-usermenu-wrapper .wchat-usermenu-banmenu .wchat-usermenu-callback',
				menuButtons: 			'#wchat-menu-inner-wrapper .wchat-btn',
				menuWrapper: 			'#wchat-menu-wrapper',
				userState:				'#wchat-menu-inner-wrapper .wchat-userstate',
				cfgFriendList: 			'#wchat-cfg-friendlist select',
				cfgFriendListBtn: 		'#wchat-cfg-friendlist .wchat-btn',
				cfgIgnoreList: 			'#wchat-cfg-ignorelist select',
				cfgIgnoreListBtn: 		'#wchat-cfg-ignorelist .wchat-btn',
				cfgSmilesSize: 			'#wchat-cfg-smiles select',
				cfgFontSize: 			'#wchat-cfg-fontsize select',
				cfgMsgsLimit:			'#wchat-cfg-msgslimit select',
				cfgFriendsMsgStyle:		'#wchat-cfg-friendsmsgstyle select',
				cfgForUserMsgStyle:		'#wchat-cfg-forusermsgstyle select',

				cfgWrapper: 			'#wchat-cfg-wrapper',
				admWrapper: 			'#wchat-adm-wrapper',
				linksWrapper: 			'#wchat-links-wrapper',
				forYouWrapper: 			'#wchat-foryou-wrapper',
				smilesWrapper: 			'#wchat-smiles-wrapper'
			},
			eventMessages: {
				capsAbuse:		'Слишком много капса.',
				autoBan:		'Что-то не так с вашим сообщением, возможно превышен лимит смайлов.',
				pleaseLogIn:	'Please log in...',
				banned:			'Вы забанены до '
			},

			userMenuUserSetup: {
				name:	null,
				userId:	null,
				msgId:	null
			},
			
			userInfo: null,
			
			chatURL: 'http://chat.sc2tv.ru/',
			chatGate: 'http://chat.sc2tv.ru/gate.php',
			
			channelId: decodeURIComponent((new RegExp('[?|&]channelId=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null,
			channelsList: null,
			
			streamerName: '',
			streamTitle: '',
			chatMessagesLimit: GM_getValue('wchat_chatMessagesLimit') || 50,
			chatInterval: null,
			inputCaretPosition: 0,
			
			messages: null,
			smiles: unsafeWindow.smiles,
			
			friendList: JSON.parse( GM_getValue('wchat_friendList') || '{}' ),
			ignoreList: JSON.parse( GM_getValue('wchat_ignoreList') || '{}' ),
			smilesSize: GM_getValue('wchat_smilesSize') || 1,
			fontSize: GM_getValue('wchat_fontSize') || 12,
			friendsMsgStyle: GM_getValue('wchat_friendsMsgStyle') || 'wchat-msg-friend-style-default',
			forUserMsgStyle: GM_getValue('wchat_forUserMsgStyle') || 'wchat-msg-foruser-style-default',

			doScroll: true,
			time: {
				scroll: 900,
				newMsg: 900,
				hide: 300,
				show: 300,
				removeMsg: 800,
				userMenu: 180,
				banMsg: 3000,
				toggleChannels: 300,
				ajaxRetryOnError: 1000,
				scrollTimer: 2500, // auto scroll disabled for n seconds after user scroll or mousedown
				chatUpdateInterval: 4000
			}
		}
		var templates = {};
	
	
	
	/* ===== Templates ====== */
		templates.chat = function() {
			var html = '';
			html += '<div id="wchat-wrapper">';
			html += 	'<div id="wchat-chanells-wrapper"></div>';
			html += 	'<div id="wchat-msgs-wrapper"></div>';
			html += 	'<div id="wchat-menu-wrapper">';
			html += 		templates.cfgWrapper();
			html += 		templates.admWrapper();
			html += 		templates.linksWrapper();
			html += 		templates.forYouWrapper();
			html += 		templates.userMenu();
			html += 		'<div id="wchat-menu-inner-wrapper">';
			html += 			'<div class="input-wrapper"><textarea id="wchat-input" placeholder="Сообщение..." maxlength="1024"></textarea>';
			html += 				'<div id="wchat-btn-streamer" class="wchat-btn" title="Написать стримеру">S</div>';
			html += 				'<div id="wchat-btn-smiles" class="wchat-btn" title="Смайлы" data-target="smilesWrapper"></div>';
			html += 			'</div>';
			html += 			templates.userState();
			html += 			'<div id="wchat-menu-control">';
			html += 				'<div class="wchat-btn" title="Настройки" data-target="cfgWrapper">CFG</div>';
			html += 				'<div class="wchat-btn" title="Сообщения от администрации" data-target="admWrapper">ADM</div>';
			html += 				'<div class="wchat-btn" title="Ссылки из чата" data-target="linksWrapper">LINKS</div>';
			html += 				'<div class="wchat-btn disabled" title="Сообщения адресованные вам" data-target="forYouWrapper">4YOU</div>';
			html += 			'</div>';
			html += 		'</div>';
			html += 	'</div>';
			html += '</div>';
			return html;
		}
		templates.chatMSG = function( data ) {
			var html = '', style = getMessageStyle( data ),
				msgData = 'data-userid="'+ data.uid +'" data-msgid="'+ data.id +'"';

			html += '<div class="wchat-msg '+ style.msg +'" title="'+ data.date +'">';
			html += 	'<span class="wchat-nick '+ style.nick +'" '+ msgData +' >'+ data.name +'</span> <span class="wchat-msg-text">'+ msg2html(data.message) +'</span>';
			html += '</div>';
			
			return html;
		}
		templates.smile = function( data ) {
			var style = 'width: '+ Math.floor(data.width * cfg.smilesSize) +'px; height: '+ Math.floor(data.height * cfg.smilesSize)+'px;';
			return '<img src="img/'+ data.img +'" title="'+ data.code +'" style="'+ style +'" />';
		}
		templates.smilesWrapper = function() {
			var html = '', smilesHtml = '', smile, noAccess,
				privateSmile, userLoggedIn = isUserLoggedIn(),
				userRoles = cfg.userInfo.roleIds.slice();

			for (var i=0; i < cfg.smiles.length; i++) {
				smile = cfg.smiles[ i ];
				
				privateSmile = '';
				
				// check if user have access to smile
				if (( userLoggedIn ) && ( smile.private )) {
					noAccess = true;
					
					for (var j=0; j < userRoles.length; j++) {
						if (smile.roles.indexOf( userRoles[ j ] ) !== -1) {
							noAccess = false;
							break;
						}
					}
					
					if (noAccess) { privateSmile = ' class="wchat-smile-private" title="Платные смайлы"'; }
				}

				smilesHtml += '<div'+ privateSmile +'><img src="/img/'+ smile.img +'" title="'+ smile.code +'" /></div>';
			}
		
			html +=		'<div id="wchat-smiles-wrapper" class="wchat-menu-popup">';
			html += 		'<div class="wchat-menu-popup-close"><span>Смайлы</span><div>&#10005;</div></div>';
			html += 		'<div class="wchat-menu-popup-content">'+ smilesHtml +'</div>';
			html += 	'</div>';
			
			return html;
		}
		templates.cfgWrapper = function() {
			var html = '';

			html +=		'<div id="wchat-cfg-wrapper" class="wchat-menu-popup">';
			html += 		'<div class="wchat-menu-popup-close"><span>Настройки</span><div>&#10005;</div></div>';
			html += 		'<div class="wchat-menu-popup-content">';
			html += 			'<ul>';
			
			html += 				'<li id="wchat-cfg-friendlist">';
			html += 					'В друзьях <br><select></select><br><div class="wchat-btn">УДАЛИТЬ</div>';
			html += 				'</li>';
			
			html += 				'<li id="wchat-cfg-ignorelist">';
			html += 					'В игноре <br><select></select><br><div class="wchat-btn">УДАЛИТЬ</div>';
			html += 				'</li>';
			
			html += 				'<li id="wchat-cfg-smiles">';
			html += 					'Размер смайлов ';
			html += 					'<select>';
			html += 						'<option>2</option>';
			html += 						'<option>1.5</option>';
			html += 						'<option>1.25</option>';
			html += 						'<option>1</option>';
			html += 						'<option>0.9</option>';
			html += 						'<option>0.8</option>';
			html += 						'<option>0.7</option>';
			html += 						'<option>0.6</option>';
			html += 						'<option>0.5</option>';
			html += 						'<option title="Выключить смайлы">0</option>';
			html += 					'</select>';
			html += 				'</li>';
			
			html += 				'<li id="wchat-cfg-fontsize">';
			html += 					'Размер шрифта ';
			html += 					'<select>';
			html += 						'<option>40</option><option>36</option><option>32</option><option>28</option>';
			html += 						'<option>24</option><option>20</option><option>18</option><option>16</option>';
			html += 						'<option>15</option><option>14</option><option>13</option><option>12</option>';
			html += 						'<option>11</option><option>10</option><option>9</option><option>8</option>';
			html += 					'</select>';
			html += 				'</li>';
			
			html += 				'<li id="wchat-cfg-msgslimit">';
			html += 					'Лимит сообщений в чате ';
			html += 					'<select>';
			html += 						'<option>250</option>';
			html += 						'<option>200</option>';
			html += 						'<option>150</option>';
			html += 						'<option>100</option>';
			html += 						'<option>50</option>';
			html += 						'<option>20</option>';
			html += 						'<option>10</option>';
			html += 					'</select>';
			html += 				'</li>';
			
			html += 				'<li id="wchat-cfg-friendsmsgstyle">';
			html += 					'Friends msg style ';
			html += 					'<select>';
			html += 						'<option data-class="wchat-msg-friend-style-default">default</option>';
			html += 						'<option data-class="wchat-msg-friend-style-grgray">gray gradient</option>';
			html += 						'<option data-class="wchat-msg-friend-style-grgray3d">gray gradient + 3d</option>';
			html += 					'</select>';
			html += 				'</li>';
			
			html += 				'<li id="wchat-cfg-forusermsgstyle">';
			html += 					'4YOU msg style ';
			html += 					'<select>';
			html += 						'<option data-class="wchat-msg-foruser-style-default">default</option>';
			html += 						'<option data-class="wchat-msg-foruser-style-classic">classic</option>';
			html += 						'<option data-class="wchat-msg-foruser-style-grbrown">brown gradient</option>';
			html += 						'<option data-class="wchat-msg-foruser-style-grbrown3d">brown gradient + 3d</option>';
			html += 						'<option data-class="wchat-msg-foruser-style-grgreen">green gradient</option>';
			html += 						'<option data-class="wchat-msg-foruser-style-grgreen3d">green gradient + 3d</option>';
			html += 					'</select>';
			html += 				'</li>';
			
			html += 				'<li id="wchat-cfg-about">';
			html += 					'<a href="http://chat.sc2tv.ru/history.htm" target="_blank">История сообщений</a>, ';
			html += 					'<a href="http://sc2tv.ru/chat-rules" target="_blank">Правила</a>, ';
			html += 					'<a href="http://chat.sc2tv.ru/automoderation_history.htm" target="_blank">Баны</a>';
			html += 				'</li>';
			
			html += 				'<li id="wchat-cfg-about">';
			html += 					'peka2tv chat <a href="http://userscripts.org/scripts/show/166081" target="_blank">v2.x</a><br>';
			html += 					'Установить старую версию <a href="http://userscripts.org/scripts/show/186199" target="_blank">v1.x</a>';
			html += 				'</li>';
			html += 			'</ul>';
			html += 		'</div>';
			html += 	'</div>';
			
			return html;
		}
		templates.channels = function() {
			var html = '', id, text, textHTML,
				title = cfg.streamTitle,
				streamer = cfg.streamerName;

			if ((cfg.streamerName == '') && (cfg.streamTitle == ''))
				text = textHTML = 'Unknown channel';
			else {
				if (cfg.streamerName === undefined)
					text = textHTML = cfg.streamTitle;
				else {
					text = cfg.streamerName +': '+ cfg.streamTitle;
					textHTML = '<em>'+ cfg.streamerName +':</em> '+ cfg.streamTitle;
				}
			}

			html += '<div id="wchat-chanells-title" title="'+ text +'">';
			html += 	textHTML +'<span></span><a href="http://chat.sc2tv.ru/index.htm?channelId='+ cfg.channelId +'" title="Full screen chat" target="_blank">&rarr;</a>';
			html += '</div>';
			html += '<div id="wchat-chanells-list">';
			html += 	'<div class="wchat-select-menu">';
			
				for (var i=0; i < cfg.channelsList.length; i++) {
					id			= cfg.channelsList[ i ].channelId;
					title		= cfg.channelsList[ i ].channelTitle;
					streamer	= cfg.channelsList[ i ].streamerName;

					if (streamer === undefined)
						text = textHTML = title;
					else {
						text = streamer +': '+title;
						textHTML = '<em>'+ streamer +':</em> '+ title;
					}
					
					html += '<div title="'+ text +'" data-chanell-id="'+ id +'" data-streamer="'+ streamer +'">'+ textHTML +'</div>';
				}
				
			html += 	'</div>';
			html += '</div>';
			
			return html;
		}
		templates.admWrapper = function() {
			var html = '';

			html +=		'<div id="wchat-adm-wrapper" class="wchat-menu-popup">';
			html += 		'<div class="wchat-menu-popup-close"><span>Сообщения от администрации</span><div>&#10005;</div></div>';
			html += 		'<div class="wchat-menu-popup-content"></div>';
			html += 	'</div>';
			
			return html;
		}
		templates.linksWrapper = function() {
			var html = '';

			html +=		'<div id="wchat-links-wrapper" class="wchat-menu-popup">';
			html += 		'<div class="wchat-menu-popup-close"><span>Ссылки из чата</span><div>&#10005;</div></div>';
			html += 		'<div class="wchat-menu-popup-content"></div>';
			html += 	'</div>';
			
			return html;
		}
		templates.forYouWrapper = function() {
			var html = '';

			html +=		'<div id="wchat-foryou-wrapper" class="wchat-menu-popup">';
			html += 		'<div class="wchat-menu-popup-close"><span>Сообщения адресованные вам</span><div>&#10005;</div></div>';
			html += 		'<div class="wchat-menu-popup-content"></div>';
			html += 	'</div>';
			
			return html;
		}
		templates.userMenu = function() {
			var html = '';

			html +=		'<div id="wchat-usermenu-wrapper">';
			html += 		'<div class="wchat-usermenu-close"><span class="wchat-usermenu-name"></span><div>&#10005;</div></div>';
			html += 		'<div class="wchat-usermenu-content">';
			html += 			'<ul>';
			html += 				'<li data-action="answer">Ответить</li>';
			html += 				'<li data-action="add-to-friends">Добавить в друзья</li>';
			html += 				'<li data-action="send-private-msg">Послать ЛС</li>';
			html += 				'<li data-action="banmenu">Забанить</li>';
			html += 				'<li data-action="add-to-ignore">Добавить в игнор</li>';
			html += 			'</ul>';
			html += 		'</div>';
			html += 		'<div class="wchat-usermenu-banmenu">';
			html += 			'<div>Причина бана</div>';
			html += 			'<select>';
			html += 				'<option data-reason-id="1">Мат</option>';
			html += 				'<option data-reason-id="2">Завуалированый мат</option>';
			html += 				'<option data-reason-id="3">Угрозы жизни и здоровью</option>';
			html += 				'<option data-reason-id="4">Лёгкие оскорбления</option>';
			html += 				'<option data-reason-id="5">Серьёзные оскорбления</option>';
			html += 				'<option data-reason-id="6">Национализм, нацизм</option>';
			html += 				'<option data-reason-id="7">Реклама</option>';
			html += 				'<option data-reason-id="8">Спам</option>';
			html += 				'<option data-reason-id="9">Клевета</option>';
			html += 				'<option data-reason-id="10">Негативный троллинг</option>';
			html += 				'<option data-reason-id="11">Транслит, удаффщина, капсы</option>';
			html += 				'<option data-reason-id="12">Вредные ссылки</option>';
			html += 				'<option data-reason-id="13">Вредные флэшмобы</option>';
			html += 				'<option data-reason-id="14">Спойлер</option>';
			html += 			'</select>';
			html += 			'<br><div class="wchat-btn">Забанить</div>';
			html += 			'<div class="wchat-usermenu-callback"></div>';
			html += 		'</div>';
			html += 	'</div>';
			
			return html;
		}
		templates.userState = function() {
			var html = '';
			if ( !isUserLoggedIn() ) {
				html = '<div class="wchat-userstate">'+ cfg.eventMessages.pleaseLogIn +'</div>';
			}
			return html;
		}
	
	
	
	/* ====== Functions ====== */
		/* === jQuery === */
		$.fn.selectRange = function(start, end) {
			if(!end) end = start; 
			return this.each(function() {
				if (this.setSelectionRange) {
					this.focus();
					this.setSelectionRange(start, end);
				} else if (this.createTextRange) {
					var range = this.createTextRange();
					range.collapse(true);
					range.moveEnd('character', end);
					range.moveStart('character', start);
					range.select();
				}
			});
		};
		
		/* === Script === */
		function isUserLoggedIn() {
			if ((cfg.userInfo === '') || (cfg.userInfo === null) || (cfg.userInfo === undefined)) {
				return false;
			} else {
				if (cfg.userInfo.type === 'anon') {
					return false;
				} else {
					return true;
				}
			}
		}
		
		function getBanInfo() {
			var info = { isBanned: false, banExpire: '' };

			if ((cfg.userInfo !== '') || (cfg.userInfo !== null) || (cfg.userInfo !== undefined)) {
				if ((cfg.userInfo.type === 'bannedInChat') || (cfg.userInfo.type === 'bannedOnSite')) {
					info.isBanned = true;
					info.banExpire = new Date( cfg.userInfo.banExpirationTime * 1000 ).toLocaleString();
				}
			}
			
			return info;
		}
		
		function msg2html( data ) {
			// bb codes parser
			var html = [
				'<b>$1</b>',
				'<a href="$1" target="_blank">$2</a>'
			];
			var bb = [
				/\[b\](.*?)\[\/b\]/g,
				/\[url=(.*?)\](.*?)\[\/url\]/g
			];
			for (var i=0; i < bb.length; i++) {
				data = data.replace( bb[i], html[i] );
			}
			
			// url shortener
			data = data.replace( /\[url\](.*?)\[\/url\]/g, function( match, url ) {
				var text;
				if (url.length > 40)
					text = url.substr(0, 26) +'...'+ url.substr(url.length - 11);
				else
					text = url;
					
				text = text.replace(/(http[s]?:\/\/)?(www\.)?/i, '');
				if (text.length < 1) text = 'link';
					
				return '<a href="'+ url +'" target="_blank">'+ text +'</a>';
			});

			// smiles
			data = data.replace( /:s(:[-a-z0-9]{2,}:)/gi, function( match, code ) {
				var smile = '';
				for (var i=0; i < cfg.smiles.length; i++) {
					if (cfg.smiles[i].code == code) {
						smile = templates.smile( cfg.smiles[i] );
					}
				}
				return smile;
			});
			
			return data;
		}

		function readChat( renderCfg ) {
			
			$.getJSON( cfg.chatURL + 'memfs/channel-' + cfg.channelId + '.json', function( messages ){
				if ( messages != undefined ) {
					messages = messages.messages;

					// get new messages
					var newMessages = [];
					if (cfg.messages === null) {
						newMessages = messages;
						renderMessages( newMessages, renderCfg );
					} else {

						var newId, oldId, isOldMsg;
						for (var i=0, lenI = messages.length; i < lenI; i++) {
							newId = messages[i].id;
							isOldMsg = false;
							
							for (var j=0, lenJ = cfg.messages.length; j < lenJ; j++) {
								oldId = cfg.messages[j].id;
								if (newId == oldId) { 
									isOldMsg = true; 
									break;
								}
							}
							
							if (!isOldMsg) { newMessages.push( messages[i] ); }
						}

						renderMessages( newMessages, renderCfg );
					}

					cfg.messages = messages;

					// chat widgets
					if (newMessages.length > 0) {
						widgetChatLinks( newMessages );
						widgetAdmMsgs( newMessages );
						widgetMsgsForYou( newMessages );
					}
				}
			});
		}
		
		function checkMsgCount() {
			var msgsEl = $(cfg.el.chat).find('div');
			if (msgsEl.length > cfg.chatMessagesLimit)
				msgsEl.slice(0, msgsEl.length - cfg.chatMessagesLimit).remove();
		}
		
		function renderMessages( data, renderCfg ) {

			if (data.length < 1) return;
			
			var html = '', 
				oldMsgs = $(cfg.el.chat).find('.wchat-msg'),
				newMsgs;
			
			if (renderCfg === undefined) {
				renderCfg = {scroll: 'animation', fade: true, append: true }; 
			} else {
				if (!renderCfg.hasOwnProperty( 'scroll' )) { renderCfg.scroll = 'animation'; }
				if (!renderCfg.hasOwnProperty( 'fade' ))  { renderCfg.fade = true; }
				if (!renderCfg.hasOwnProperty( 'append' ))  { renderCfg.append = true; }
			}

			// form msgs html
			for (var i=0; i < data.length; i++) {
				html = templates.chatMSG( data[i] ) + html;
			}
			
			// push new msgs
			if ( renderCfg.append )
				$(cfg.el.chat).append( html );
			else
				$(cfg.el.chat).html( html );
			
			// animate new msgs
			newMsgs = $(cfg.el.chat).find('.wchat-msg').not( oldMsgs );

			if ( newMsgs.length ) {
				if ( renderCfg.fade )
					newMsgs.fadeTo( cfg.time.newMsg, 1 );
				else
					newMsgs.css( 'opacity', 1 );

				switch ( renderCfg.scroll ) {
					case 'animation':
						// scroll, del msg over limit
						// if mousedown and scroll = false
						if ( (!$( cfg.el.chat+':active' ).length) && cfg.doScroll ) {
							$(cfg.el.chat).animate({ 
									scrollTop: $(cfg.el.chat)[0].scrollHeight - ($(cfg.el.chat).height()+0.001)
								}, cfg.time.scroll, function(){
									checkMsgCount();
								}
							);
						}
						break;
					case 'instant':
						$(cfg.el.chat).scrollTop( $(cfg.el.chat)[0].scrollHeight - ($(cfg.el.chat).height()+0.001) );
						checkMsgCount();
						break;
				}
			}
		}
		
		function clearChat() {
			cfg.messages = null;
			$(cfg.el.chat).html('');
			readChat( {scroll: 'instant'} );
		}
		
		function getMessageStyle( data ) {
			var style = { msg: '', nick: '' };
			
			switch (data.role) {
				case 'user': 				style.nick = 'wchat-user-default'; break;	
				case 'userstream-editor': 	style.nick = 'wchat-user-userstream-editor'; break;
				case 'moderator':			style.nick = 'wchat-user-moderator'; break;
				case 'editor': 				style.nick = 'wchat-user-editor'; break;
				case 'root': 				style.nick = 'wchat-user-root'; break;
				case 'streamer': 			style.nick = 'wchat-user-streamer'; break;
				case 'prime-streamer':		style.nick = 'wchat-user-primestreamer'; break;
				
				case 'admin':
				case 'color-red': 			style.nick = 'wchat-user-admin'; break;

				default: 					style.nick = 'wchat-user-default'; break;
			}
			
			// top supporter
			if (data.roleIds.indexOf( 24 ) !== -1)
				style.nick += ' wchat-user-topsupporter';

			if (isUserLoggedIn()) {
				// if @ ignore list
				if ( cfg.ignoreList.hasOwnProperty(data.uid) )
					style.msg += ' wchat-msg-ignore';

				// message for you
				var msgForUserRegExp = new RegExp('\\[b\\]' + escapeData( cfg.userInfo.name ) + '\\[/b\\],','gi');
				if ( data.message.search( msgForUserRegExp ) != -1 ) {
					style.msg += ' wchat-msg-foruser '+ cfg.forUserMsgStyle;
				} else {
					// if @ friend list
					if ( cfg.friendList.hasOwnProperty(data.uid) )
						style.msg += ' wchat-msg-friend '+ cfg.friendsMsgStyle;
				}

			}
			
			switch( data.uid ) {
				case '-2': 
					style.msg += ' wchat-msg-primetime'; 
					style.nick += ' wchat-user-primetime'; 
					break; // primetime bot
				case '-1': 
					style.msg += ' wchat-msg-system'; 
					style.nick += ' wchat-user-system'; 
					break;	// system message
			};
			
			return style;
		}
		
		function sendMessage() {
			var msg = $( cfg.el.chatInput ).val();

			// sanitize user msg
			msg = msg.replace( /[^\u0020-\u007E\u0400-\u045F\u0490\u0491\u0207\u0239\u2012\u2013\u2014]+/g, '' );
			msg = msg.replace( /[\s]+/g, ' ' );
			
			// check for caps abuse
			if ( unsafeWindow.IsStringCapsOrAbuse( msg ) == true ) {
				alert( cfg.eventMessages.capsAbuse ); return;
			}
			
			// fix smiles
			msg = fixSmileCode( msg );
			// fix url
			msg = unsafeWindow.AddUrlBBCode( msg );
			
			// check for auto ban
			if ( unsafeWindow.CheckForAutoBan( msg ) == true ) {
				alert( cfg.eventMessages.autoBan ); return;
			}

			$( cfg.el.chatInput ).attr( 'readonly', 'readonly' );
			// post message
			$.post( cfg.chatGate,
				{ task: 'WriteMessage', message: msg, channel_id: cfg.channelId, token: cfg.userInfo.token },
				function( data ) {
					var jsonData = $.parseJSON( data );
					if( jsonData.error == '' ) {
						$( cfg.el.chatInput ).val('');
						readChat();
					} else {
						// error
					}

					$( cfg.el.chatInput ).removeAttr( 'readonly' );
				}
			);
		}
		
		function escapeData( data ) {
			return data.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
		}
		
		function fixSmileCode( data ) {
			var smilePattern;
			for( i=0; i < cfg.smiles.length; i++) {
				smilePattern = new RegExp( escapeData( cfg.smiles[ i ].code ), 'gi' );
				data = data.replace( smilePattern, ':s' + cfg.smiles[ i ].code  );
			}
			return data;
		}
		
		function saveCaretePosition() {
			cfg.inputCaretPosition = $(cfg.el.chatInput)[0].selectionStart;
		}

		
		
		/* === User menu === */
		function userMenuShow() {
			$( cfg.el.userMenu ).animate( {right: -$( cfg.el.userMenu ).width()}, cfg.time.userMenu );
		}
		function userMenuHide() {
			$( cfg.el.userMenu ).animate( {right: 0}, cfg.time.userMenu );
		}
		
		function voteBan( reasonId ) {
			$.post( cfg.chatGate, {
					task:		'CitizenVoteForUserBan',
					messageId:	cfg.userMenuUserSetup.msgId,
					banUserId:	cfg.userMenuUserSetup.userId,
					userName:	cfg.userMenuUserSetup.name,
					reasonId:	reasonId,
					token:		cfg.userInfo.token
				}, function( data ) {
					$( cfg.el.userMenuBanCallback ).html( $.parseJSON( data ).result );
					setTimeout(function() {
						userMenuHide();
					}, cfg.time.banMsg);
				}
			);
		}
		
		function addToFriends( id, name ) {
			cfg.friendList[ id ] = name;
			GM_setValue('wchat_friendList', JSON.stringify( cfg.friendList ) );
			
			if (isIgnored( id ))
				removeIgnore( id );

			$( cfg.el.userName +'[data-userid="'+ id +'"]' ).parent()
				.addClass('wchat-msg-friend '+ cfg.friendsMsgStyle);
		}
		function removeFriend( id ) {
			delete cfg.friendList[ id ];
			GM_setValue('wchat_friendList', JSON.stringify( cfg.friendList ) );
			
			$( cfg.el.userName +'[data-userid="'+ id +'"]' ).parent()
				.removeClass('wchat-msg-friend')
				.removeClass(function (index, elClass) {
					return (elClass.match (/\wchat-msg-friend-style\S+/g) || []).join(' ');
				});
		}
		function isFriend( id ) {
			if ( cfg.friendList.hasOwnProperty( id ) )
				return true;
			else
				return false;
		}
		
		function addToIgnore( id, name ) {
			cfg.ignoreList[ id ] = name;
			GM_setValue('wchat_ignoreList', JSON.stringify( cfg.ignoreList ) );
			
			if (isFriend( id ))
				removeFriend( id );
			
			$( cfg.el.userName +'[data-userid="'+ id +'"]' ).parent().addClass('wchat-msg-ignore');
		}
		function removeIgnore( id ) {
			delete cfg.ignoreList[ id ];
			GM_setValue('wchat_ignoreList', JSON.stringify( cfg.ignoreList ) );
			$( cfg.el.userName +'[data-userid="'+ id +'"]' ).parent().removeClass('wchat-msg-ignore');	
		}
		function isIgnored( id ) {
			if ( cfg.ignoreList.hasOwnProperty( id ) )
				return true;
			else
				return false;
		}
		
		
		
		
		
		function getUserInfo() {
			$.ajax({
				url: cfg.chatGate + '?task=GetUserInfo&ref=' + document.referrer,
				dataType: 'json',
				success: function( data ) { 
					cfg.userInfo = data; 
					onUserInfoUpdate();
				},
				error: function() {
					setTimeout(function() { getUserInfo(); }, cfg.time.ajaxRetryOnError);
				}
			});
		}
			function onUserInfoUpdate() {
				if ( isUserLoggedIn() ) {
					// if user banned
					if ( getBanInfo().isBanned ) {
						$( cfg.el.userState ).html( cfg.eventMessages.banned + getBanInfo().banExpire );
						return;
					}
					// hide user state overlay
					$( cfg.el.userState ).fadeOut( cfg.time.hide );
					// activate '4YOU' button
					$('.wchat-btn.disabled[data-target="forYouWrapper"]').removeClass('disabled');
					// append smiles window
					if ( !$( cfg.el.smilesWrapper ).length ) {
						$( cfg.el.menuWrapper ).prepend( templates.smilesWrapper() );
					}
				}
			}
		
		function getChannelsInfo() {
			$.ajax({
				url: cfg.chatURL + 'memfs/channels.json',
				dataType: 'json',
				success: function( jsonData ) { 
					cfg.channelsList = jsonData.channel;
					onChannelsInfoUpdate();
				},
				error: function() {
					setTimeout(function() { getChannelsInfo(); }, cfg.time.ajaxRetryOnError);
				}
			});
		}
			function onChannelsInfoUpdate() {
				for (var i=0; i < cfg.channelsList.length; i++) {
					if ( cfg.channelsList[ i ].channelId == cfg.channelId ) {
						cfg.streamerName = cfg.channelsList[ i ].streamerName;
						cfg.streamTitle = cfg.channelsList[ i ].channelTitle;
					}
				}
				
				// add channels to cfg menu
				$( cfg.el.channelsWrapper ).html( templates.channels() );
			}
		
		function toggleChannels() {
			var el = $('#wchat-chanells-list');
					
			el.toggleClass('active');
			if ( !el.hasClass('active') ) {
				el.stop(true, false).animate({top: '-83px' }, cfg.time.toggleChannels );
			} else {
				el.stop(true, false).animate({top: '12px' }, cfg.time.toggleChannels );
			}
		}
		
		
		
	/* ====== Chat widgets ====== */
		/* === Links === */
		function widgetChatLinks( data ) {
			var msg, hasLink, html = '', newMsgs, duplicate;

			for (var i=0; i < data.length; i++ ) {
				msg = data[ i ].message;
				hasLink = msg.match( /\[url\](.*?)\[\/url\]/g );
				
				if ( hasLink ) {
					// check for duplicate
					duplicate = $( cfg.el.linksWrapper ).find('.wchat-nick[data-msgid="'+ data[ i ].id +'"]').length;
					if ( !duplicate )
						html = templates.chatMSG( data[ i ] ) + html;
				}
			}
			
			$( cfg.el.linksWrapper ).find('.wchat-menu-popup-content').append( html );
			
			var messages = $( cfg.el.linksWrapper ).find('.wchat-msg');
			messages.css({opacity: 1});

			// remove messages over limit
			if (messages.length > cfg.chatMessagesLimit) {
				messages.slice(0, messages.length-cfg.chatMessagesLimit).remove();
			}
		}
		
		/* === Adm === */
		function widgetAdmMsgs( data ) {
			var html = '', duplicate;
			
			for (var i=0; i < data.length; i++) {
				if ( data[ i ].role != 'user' ) {
					// check for duplicate
					duplicate = $( cfg.el.admWrapper ).find('.wchat-nick[data-msgid="'+ data[ i ].id +'"]').length;
					if ( !duplicate )
						html = templates.chatMSG( data[ i ] ) + html;
				}
			}
			$( cfg.el.admWrapper ).find('.wchat-menu-popup-content').append( html );
			
			var messages = $( cfg.el.admWrapper ).find('.wchat-msg');
			messages.css({opacity: 1});

			// remove messages over limit
			if (messages.length > cfg.chatMessagesLimit) {
				messages.slice(0, messages.length-cfg.chatMessagesLimit).remove();
			}
		}
		
		/* === 4You === */
		function widgetMsgsForYou( data ) {
			var html = '', duplicate,
				msgForUserRegExp = new RegExp('\\[b\\]' + escapeData( cfg.userInfo.name ) + '\\[/b\\],','gi');

			for (var i=0; i < data.length; i++ ) {
				if ( data[ i ].message.search( msgForUserRegExp ) != -1 ) {
					// check for duplicate
					duplicate = $( cfg.el.forYouWrapper ).find('.wchat-nick[data-msgid="'+ data[ i ].id +'"]').length;
					if ( !duplicate )
						html = templates.chatMSG( data[ i ] ) + html;
				}
			};
			
			$( cfg.el.forYouWrapper ).find('.wchat-menu-popup-content').append( html );
			
			var messages = $( cfg.el.forYouWrapper ).find('.wchat-msg');
			messages.css({opacity: 1});
			
			// remove messages over limit
			if (messages.length > cfg.chatMessagesLimit) {
				messages.slice(0, messages.length-cfg.chatMessagesLimit).remove();
			}
		}
		
		/* === Cfg === */
		function updateCfgFrame() {
			var html = '';
			// friend list
			for (var key in cfg.friendList) {
				html += '<option data-id="'+ key +'">'+ cfg.friendList[ key ] +'</option>';
			}
			$( cfg.el.cfgFriendList ).html( html );
			
			// ignore list
			html = '';
			for (var key in cfg.ignoreList) {
				html += '<option data-id="'+ key +'">'+ cfg.ignoreList[ key ] +'</option>';
			}
			$( cfg.el.cfgIgnoreList ).html( html );
			
			$( cfg.el.cfgSmilesSize ).val( cfg.smilesSize );
			$( cfg.el.cfgFontSize ).val( cfg.fontSize );
			$( cfg.el.cfgMsgsLimit ).val( cfg.chatMessagesLimit );
			$( cfg.el.cfgFriendsMsgStyle ).find('option[data-class="'+ cfg.friendsMsgStyle +'"]').attr('selected', 'selected');
			$( cfg.el.cfgForUserMsgStyle).find('option[data-class="'+ cfg.forUserMsgStyle +'"]').attr('selected', 'selected');
		}
		function setSmilesSize( size ) {
			GM_setValue( 'wchat_smilesSize', size.toString() );
			cfg.smilesSize = size;
			renderMessages( cfg.messages, {scroll: 'off', fade: false, append: false} );
		}
		function setFontSize( size ) {
			GM_setValue( 'wchat_fontSize', size.toString() );
			cfg.fontSize = size;
			
			$( cfg.el.chat ).css('font-size', cfg.fontSize +'px');
		}
		function setMsgsLimit( limit ) {
			GM_setValue( 'wchat_chatMessagesLimit', limit.toString() );
			cfg.chatMessagesLimit = limit;
			
			renderMessages( cfg.messages, {scroll: 'instant', fade: false, append: false} );
		}
		function setFriendsMsgStyle( style ) {
			GM_setValue( 'wchat_friendsMsgStyle', style );
			
			cfg.friendsMsgStyle = style;
			
			$('.wchat-msg-friend')
				.removeClass(function (index, elClass) {
					return (elClass.match (/\wchat-msg-friend-style\S+/g) || []).join(' ');
				})
				.addClass( cfg.friendsMsgStyle );
		}
		function setForUserMsgStyle( style ) {
			GM_setValue( 'wchat_forUserMsgStyle', style );
			
			cfg.forUserMsgStyle = style;
			
			$('.wchat-msg-foruser')
				.removeClass(function (index, elClass) {
					return (elClass.match (/\wchat-msg-foruser-style\S+/g) || []).join(' ');
				})
				.addClass( cfg.forUserMsgStyle );
		}

		
		
		/* ====== Init ====== */
		function init() {
			/* === Render === */
			$('body').append( templates.chat() );

			/* === Elements === */
				// stop jquery scroll animation on user scroll
				$(cfg.el.chat).on('wheel mousedown', function(){
					$(cfg.el.chat).stop();

					cfg.doScroll = false;
					clearTimeout( cfg.sctollTimer );
					cfg.sctollTimer = setTimeout(function() {
						cfg.doScroll = true;
					}, cfg.time.scrollTimer);
				});
				
				// fix scroll animation on window resize
				$(window).on('resize', function() {
					var el = $(cfg.el.chat);
					
					if (el.scrollTop() >= el[0].scrollHeight - el.height()) {
						el.scrollTop( el[0].scrollHeight - (el.height()+1) );
					}
				});

			/* === Channels === */
				// set new channel
				$( document ).on('click', cfg.el.channelsWrapper +' .wchat-select-menu div', function() {			
					cfg.channelId = $(this).attr('data-chanell-id');

					clearChat();
					toggleChannels();
					onChannelsInfoUpdate();
				});
				// open channel menu
				$( document ).on('click', '#wchat-chanells-title span', function() {
					toggleChannels();
				});

			/* === Chat input === */
				// submit message on "enter"
				$( cfg.el.chatInput ).on('keypress', function(e){
					if (e.which == 13) {
						e.preventDefault();
						sendMessage();
						return false; 
					}
				});
				
				// fix pageUp, pageDown @ textarea bug (chrome)
				$( cfg.el.chatInput ).on('keydown', function(e){
					if ((e.which == 33) || (e.which == 34)) {
						e.stopPropagation();
						e.preventDefault();
						return false;
					}
				});

				// save caret position
				$( cfg.el.chatInput ).on('mouseup input paste change blur keypress', function(e){
					saveCaretePosition();
				});

			/* === Chat popup === */
				// close
				$ ( document ).on('click', cfg.el.chatPopUpClose, function() {
					$(this).parent().toggleClass('active');
					$(this).parent().animate({top: 0 }, cfg.time.hide );
				});

			/* === Streamer === */
				// handle streamer button
				$( cfg.el.streamerBtn ).on('click', function() {
					if ( (cfg.streamerName != '') && (cfg.streamerName != undefined) ){
						var streamer = '[b]'+ cfg.streamerName +'[/b], ',

						msg = $(cfg.el.chatInput).val();
						if (msg.substr(0, streamer.length) != streamer) {
							$(cfg.el.chatInput).val( streamer + msg );
						}
						$(cfg.el.chatInput).selectRange( streamer.length + msg.length );
					}
				});


			/* === handle popup show === */
				$( document ).on('click', cfg.el.menuButtons +':not(.disabled)', function(){
					var target = $(this).attr('data-target');

					if (target) {
						switch (target) {
							case 'cfgWrapper': updateCfgFrame(); break;
						}

						// hide other frames
						$( cfg.el.chatPopUp ).not( $(cfg.el[target]) )
							.removeClass('active')
							.animate({top: '0' }, cfg.time.hide );

						$( cfg.el[ target ] ).toggleClass('active');
						if ($( cfg.el[ target ] ).hasClass('active')) {
							$( cfg.el[ target ] ).animate({top: -$(cfg.el[ target ]).height() }, cfg.time.show );
						} else {
							$( cfg.el[ target ] ).animate({top: '0' }, cfg.time.hide );
						}
					}
				});

			/* === Smiles === */
				// handle smile post
				$( document ).on('click', cfg.el.smilesWrapper + ' .wchat-menu-popup-content div:not(.wchat-smile-private)', function() {
					var smile			= ' '+ $(this).find('img').attr('title') +' ',
						inputLength		= $( cfg.el.chatInput ).val().length,
						textBeforeCaret = $( cfg.el.chatInput ).val().substring( 0, cfg.inputCaretPosition ),
						textAfterCaret	= $( cfg.el.chatInput ).val().substring( cfg.inputCaretPosition, inputLength );

					// insert smile
					$(cfg.el.chatInput).val( textBeforeCaret + smile + textAfterCaret );
					// close window
					$( cfg.el.smilesWrapper ).removeClass('active').animate({top: '0' }, cfg.time.hide );
					// restor cursor position
					$(cfg.el.chatInput).selectRange( cfg.inputCaretPosition + smile.length );
				});
				// on private smile click
				$( document ).on('click', cfg.el.privateSmiles, function() {
					window.open('http://prime.sc2tv.ru/donate','_blank');
				});

			/* === User menu (on username click) === */
				// show
				$( document ).on('click', cfg.el.userName, function() {
					if ( isUserLoggedIn() ){
						var userMenu			= $( cfg.el.userMenu ),
							userMenuHeight		= userMenu.outerHeight(),
							chatHeight			= $(cfg.el.chat).outerHeight(),
							msgPosition			= $(this).position(),
							chatMenuPosition	= $(cfg.el.menuWrapper).position(),
							top					= -(chatHeight - msgPosition.top),
							text 				= '';

						if (-top < userMenuHeight) {
							top =  -userMenu.outerHeight();
						}
						userMenu.css('top', top );
						userMenu.find( cfg.el.userMenuName ).html( $(this).text() );

						// hide ban menu, show default menu
						userMenu.find('.wchat-usermenu-banmenu').hide();
						userMenu.find('.wchat-usermenu-content').show();

						// save data to variable
						cfg.userMenuUserSetup = {
							name: $(this).text(),
							userId: $(this).attr('data-userid'),
							msgId: $(this).attr('data-msgid')
						}
						
						// handle add/remove friend text
						if (isFriend( cfg.userMenuUserSetup.userId )) {
							text = 'Удалить из друзей';
						} else {
							text = 'Добавить в друзья';
						}
						$( cfg.el.userMenu ).find('.wchat-usermenu-content ul li[data-action="add-to-friends"]').text( text );
						
						// handle add/remove ignore text
						if (isIgnored( cfg.userMenuUserSetup.userId )) {
							text = 'Удалить из игнора';
						} else {
							text = 'Добавить в игнор';
						}
						$( cfg.el.userMenu ).find('.wchat-usermenu-content ul li[data-action="add-to-ignore"]').text( text );
						
						userMenuShow();
					}
				});
				
				// hide
				$( cfg.el.userMenuClose ).on('click', function() { userMenuHide(); });
				
				// on menu click
				$( cfg.el.userMenu ).find('ul li[data-action]').on('click', function() {
					var action = $(this).attr('data-action');
					switch( action ) {
						case 'answer':
							var nick = '[b]'+ $( cfg.el.userMenuName ).text() +'[/b], ';
							$( cfg.el.chatInput ).val( nick );
							$( cfg.el.chatInput ).selectRange( nick.length );
							userMenuHide();
							break;
						case 'banmenu': // hide default menu, show ban menu
							$( cfg.el.userMenu ).find('.wchat-usermenu-content').hide();
							$( cfg.el.userMenuBanCallback ).html('');
							$( cfg.el.userMenu ).find('.wchat-usermenu-banmenu').show();
							break;
						case 'send-private-msg':
							var id = cfg.userMenuUserSetup.userId;
							window.open('http://sc2tv.ru/messages/new/'+ id,'_blank'); 
							break;
						case 'add-to-friends':
							var id = cfg.userMenuUserSetup.userId,
								nick = $( cfg.el.userMenuName ).text();
							if (isFriend( cfg.userMenuUserSetup.userId )) {
								removeFriend( id );
							} else {
								addToFriends( id, nick );
							}
							userMenuHide();
							break;
						case 'add-to-ignore':
							var id = cfg.userMenuUserSetup.userId,
								nick = $( cfg.el.userMenuName ).text();
							if (isIgnored( cfg.userMenuUserSetup.userId )) {
								removeIgnore( id );
							} else {
								addToIgnore( id, nick );
							}
							userMenuHide();
							break;	
						
					}
				});
				
				// ban menu
				$( cfg.el.userMenuBan ).on('click', function() {
					var reasonId = $(this).parent().find('option:selected').attr('data-reason-id');
					voteBan( reasonId );
				});

			/* ====== Cfg ====== */
				/* === Cfg init === */
				setFontSize( cfg.fontSize );
				
				/* === Friend list === */
				$( cfg.el.cfgFriendListBtn ).on('click', function() {
					removeFriend( $( cfg.el.cfgFriendList ).find(':selected').attr('data-id') );
					updateCfgFrame();
				});
				
				/* === Ignore list === */
				$( cfg.el.cfgIgnoreListBtn ).on('click', function() {
					removeIgnore( $( cfg.el.cfgIgnoreList ).find(':selected').attr('data-id') );
					updateCfgFrame();
				});
				
				/* === Smiles size === */
				$( cfg.el.cfgSmilesSize ).on('change', function() {
					setSmilesSize( $(this).val() );
				});
				/* === Font size === */
				$( cfg.el.cfgFontSize ).on('change', function() {
					setFontSize( $(this).val() );
				});
				/* === Messages limit === */
				$( cfg.el.cfgMsgsLimit ).on('change', function() {
					setMsgsLimit( $(this).val() );
				});
				/* === Friends msgs style === */
				$( cfg.el.cfgFriendsMsgStyle ).on('change', function() {
					setFriendsMsgStyle( $(this).find(':selected').attr('data-class') );
				});
				/* === 4YOU msgs style === */
				$( cfg.el.cfgForUserMsgStyle ).on('change', function() {
					setForUserMsgStyle( $(this).find(':selected').attr('data-class') );
				});

			/* === Script === */
				// shutdown original chat
				unsafeWindow.StopChat();

				// get chat data from server
				setTimeout(function() { readChat( {scroll: 'instant'} ); }, 250);

				// updata chat data on interval
				if (cfg.chatInterval != null) {
					clearInterval( cfg.chatInterval );
				}
				cfg.chatInterval = setInterval(function() { 
					readChat() 
				}, cfg.time.chatUpdateInterval);
		}

		getUserInfo();
		getChannelsInfo();
		init();

	} else { // END (if SUBDOMAIN = chat)
	
		// add wrapper to iframe, to fix fullscreen button
		$( '#tab_chat iframe' ).wrap( '<div id="wchat-iframe-fix" style="display: inline-block; position: relative;"></div>' );
		$( '#chat-switch-screen-btn' ).appendTo( '#wchat-iframe-fix' );
	
	}
});

})();
