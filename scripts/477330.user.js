// ==UserScript==
// @name         KuroAW
// @version      1.0.0.1
// @description  Custom wrapper for anime-wiki.pl.
// @include      http://anime-wiki.pl/*
// @include      https://anime-wiki.pl/*
// @run-at	 document-end
// @copyright    2014+, kurogetsusai, CC-BY license
// @downloadURL  http://userscripts.org/scripts/source/477330.user.js
// @updateURL    http://userscripts.org/scripts/source/477330.user.js
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////
//// NAMESPACE __KuroAW__
    var __KuroAW__ = {
        chatInited: false,
        isUserInElite: false,
        
        ////////////////////////////////////////
    	// FUNCTIONS: CONFIG
        
        chatInit: function() {
            if (!__KuroAW__.chatInited) {
                if (($('textarea#text_okno').length > 0) && ($('div.czat_nowy').length > 0)) {
                    // chat loaded, lock multiple constructor calling
            		__KuroAW__.chatInited = true;
                    
                    // check if user is in elite
                    if ($('#elita').length > 0)
                        __KuroAW__.isUserInElite = true;
                    
                    // overwrite chat GUI
                    if (localStorage.__KuroAW__ChatGUI === 'true') 
						__KuroAW__.loadChatGui();
                    
                    // add config link to the side menu
                    $('ul#czat_menu_ul').append('<li id="czat_menu_li"><a id="__KuroAW__showConfigWindow" href="javascript:void(0)">KuroAW</a></li>');
                    $('a#__KuroAW__showConfigWindow').click(function(){__KuroAW__.toggleConfigWindow();});
            		$('div#czat_menu').css({
                		"height": "102px",
                		"width": "54px",
            		});
            		$('li#czat_menu_li > a').css({
                		"padding": "4px 5px",
            		});
                }
            }
    	},
        
        createConfigWindow: function() {
            // add HTML
			$('body').prepend(
				'<div id="__KuroAW__configWindowWrapper">' + 
                	'<div id="__KuroAW__configWindow">' + 
                		'<span class="__KuroAW__closeButton">&times;</span>' +
                		'<span class="__KuroAW__H1">Konfiguracja KuroAW</span>' +
                		'<table style="width: 100%; margin-top: 15px; margin-bottom: 15px;">' + 
                			'<tr><td>Nowe GUI czatu:</td><td><input id="__KuroAW__chatGui" type="checkbox"' + (localStorage.__KuroAW__ChatGUI === 'true' ? ' checked' : '') + '></td></tr>' + 
                			'<tr><td>Dźwięk domyślnie włączony:</td><td><input id="__KuroAW__chatGuiSoundDef" type="checkbox"' + (localStorage.__KuroAW__ChatGUISoundDef === 'true' ? ' checked' : '') + '></td></tr>' + 
                			'<tr><td>Włącz przyciski BBCode:</td><td><input id="__KuroAW__chatGuiBbcode" type="checkbox"' + (localStorage.__KuroAW__ChatGUIBBCode === 'true' ? ' checked' : '') + '></td></tr>' + 
                			'<tr><td>Przyciski GUI na górze:</td><td><input id="__KuroAW__chatGuiOnTop" type="checkbox"' + (localStorage.__KuroAW__ChatGUIOnTop === 'true' ? ' checked' : '') + '></td></tr>' + 
                			(__KuroAW__.isUserInElite ?
                            	'<tr><td>Krótki prefiks elity:</td><td><input id="__KuroAW__chatGuiElitePrefix" type="text" value="' + localStorage.__KuroAW__ChatGUIElitePrefix + '"></td></tr>' +
                				'<tr><td>Krótki prefiks domyślnie włączony:</td><td><input id="__KuroAW__chatGuiElitePrefixDef" type="checkbox"' + (localStorage.__KuroAW__ChatGUIElitePrefixDef === 'true' ? ' checked' : '') + '></td></tr>' : ''
            				) + 
                			'<tr><td>User CSS:</td><td><textarea id="__KuroAW__userCssTextarea" style="width: 100%; height: 100px;">' + localStorage.__KuroAW__UserCSS + '</textarea></td></tr>' + 
                		'</table>' +
                		'<div style="width: 100%; text-align: center;"><button id="__KuroAW__saveButton">Zapisz</button></div>' + 
                	'</div>' + 
                '</div>'
			);
            
            // CSS - config window wrapper
            $('div#__KuroAW__configWindowWrapper').css({
                "position": "fixed",
                "width": "100%",
                "height": "100%",
                "z-index": "9999",
                "background": "rgba(0,0,0,.2)",
                "display": "none",
            });
            
            // CSS - config window
            $('div#__KuroAW__configWindow').css({
                "width": "600px",
                "margin": "0 auto",
                "padding": "20px",
                "border-radius": "0 0 6px 6px",
                "box-shadow": "0 0 10px 0 black",
                "background": "#fff",
                "font-family": "Arial, sans-serif",
                "display": "none",
            });
            
            // CSS - config window close button
            $('div#__KuroAW__configWindow > span.__KuroAW__closeButton').css({
				"float": "right",
                "padding": "2px 6px 1px 6px",
                "background": "#fff",
                "color": "#333",
                "font-size": "18px",
                "font-weight": "normal",
            });
            $('div#__KuroAW__configWindow > span.__KuroAW__closeButton').mouseover(function() {
                $(this).css({
                	"background": "#D51F1F",
                	"color": "#fff",
                });
            }).mouseout(function() {
                $(this).css({
                	"background": "#fff",
                	"color": "#333",
                });
            });
            
            // CSS - config window title
            $('div#__KuroAW__configWindow > span.__KuroAW__H1').css({
                "font-size": "20px",
                "font-weight": "normal",
            });
            
            // CSS - config window table
            $('div#__KuroAW__configWindow > table tr').css({
                "vertical-align": "top",
            });
            $('div#__KuroAW__configWindow > table tr td').css({
                "padding": "4px",
            });
            $('div#__KuroAW__configWindow > table tr td:first-child').css({
                "text-align": "right",
            });
            
            // bind functions
            $('div#__KuroAW__configWindow > span.__KuroAW__closeButton').click(function(){__KuroAW__.toggleConfigWindow();});
            $('div#__KuroAW__configWindow > div > button#__KuroAW__saveButton').click(function(){__KuroAW__.saveConfig();});
            $('div#__KuroAW__configWindow input#__KuroAW__chatGui').change(function(e) {
                var guiEnabled = $(this).attr('checked');
                $('div#__KuroAW__configWindow input#__KuroAW__chatGuiSoundDef').attr('disabled', (guiEnabled ? '' : 'disabled'));
                $('div#__KuroAW__configWindow input#__KuroAW__chatGuiBbcode').attr('disabled', (guiEnabled ? '' : 'disabled'));
                $('div#__KuroAW__configWindow input#__KuroAW__chatGuiOnTop').attr('disabled', (guiEnabled ? '' : 'disabled'));
                $('div#__KuroAW__configWindow input#__KuroAW__chatGuiElitePrefix').attr('disabled', (guiEnabled ? '' : 'disabled'));
                $('div#__KuroAW__configWindow input#__KuroAW__chatGuiElitePrefixDef').attr('disabled', (guiEnabled ? '' : 'disabled'));
            });
        },
        
        toggleConfigWindow: function() {
            if ($('div#__KuroAW__configWindowWrapper').length > 0) {
                // slide toggle config window, fade out wrapper, remove config window and wrapper
                $('div#__KuroAW__configWindow').slideToggle(150, function() {$('div#__KuroAW__configWindowWrapper').fadeOut(150, function() {$('div#__KuroAW__configWindowWrapper').remove();});});
            } else {
                // create config window, fade in wrapper, slide toggle config window
                __KuroAW__.createConfigWindow();
                $('div#__KuroAW__configWindowWrapper').fadeIn(150, function() {$('div#__KuroAW__configWindow').slideToggle(150);});
            }
        },
        
        saveConfig: function() {
            localStorage.__KuroAW__ChatGUI = $('div#__KuroAW__configWindow input#__KuroAW__chatGui').attr('checked');
            localStorage.__KuroAW__ChatGUISoundDef = $('div#__KuroAW__configWindow input#__KuroAW__chatGuiSoundDef').attr('checked');
            localStorage.__KuroAW__ChatGUIBBCode = $('div#__KuroAW__configWindow input#__KuroAW__chatGuiBbcode').attr('checked');
            localStorage.__KuroAW__ChatGUIOnTop = $('div#__KuroAW__configWindow input#__KuroAW__chatGuiOnTop').attr('checked');
            localStorage.__KuroAW__ChatGUIElitePrefix = $('div#__KuroAW__configWindow input#__KuroAW__chatGuiElitePrefix').val();
            localStorage.__KuroAW__ChatGUIElitePrefixDef = $('div#__KuroAW__configWindow input#__KuroAW__chatGuiElitePrefixDef').attr('checked');
            localStorage.__KuroAW__UserCSS = $('div#__KuroAW__configWindow textarea#__KuroAW__userCssTextarea').val();
            alert('Nowe ustawienia będą widoczne po odświeżeniu strony.');
            __KuroAW__.toggleConfigWindow();
        },
        
        ////////////////////////////////////////
    	// FUNCTIONS: CHAT GUI
        
        loadChatGui: function() {
            // bbcode buttons
            var bbcode_buttons =
                '<div id="__KuroAW__bbcodeButtonsWrapper">' + 
                	(localStorage.__KuroAW__ChatGUIBBCode === 'true' ?
                        '<button class="__KuroAW__bbcodeButton" id="__KuroAW__bbcodeButtonB">b</button>' +
                        '<button class="__KuroAW__bbcodeButton" id="__KuroAW__bbcodeButtonI">i</button>' +
                        '<button class="__KuroAW__bbcodeButton" id="__KuroAW__bbcodeButtonU">u</button>' +
                        '<button class="__KuroAW__bbcodeButton" id="__KuroAW__bbcodeButtonS">s</button>' +
                        '<button class="__KuroAW__bbcodeButton" id="__KuroAW__bbcodeButtonCytuj">cytuj</button>' +
                        '<button class="__KuroAW__bbcodeButton" id="__KuroAW__bbcodeButtonSpoiler">spoiler</button>' +
                        '<button class="__KuroAW__bbcodeButton" id="__KuroAW__bbcodeButtonSpoilerLink">spoiler_link</button>' +
                        '<button class="__KuroAW__bbcodeButton" id="__KuroAW__bbcodeButtonSpoilerImg">spoiler_img</button>' +
                        '<button class="__KuroAW__bbcodeButton" id="__KuroAW__bbcodeButtonUrl">url</button>' +
                     	'<button class="__KuroAW__bbcodeButton" id="__KuroAW__bbcodeButtonWikilink">wikilink</button>' : ''
                    ) +
                
                	'<button class="__KuroAW__bbcodeButton" id="__KuroAW__chatButtonRefresh">odśwież</button>' +
            		'<button class="__KuroAW__bbcodeButton" id="__KuroAW__chatButtonSend" onclick="wyslij(); return false;">wyślij</button>' +
            		'<span class="__KuroAW__bbcodeButton" id="licznik"  style="display: inline; padding: 0; margin: 0; margin-left: 4px;"></span>' +
            	'</div>';
            
            // copy parts of the default chat GUI
            var czat_col2 = $('div#czat_formularz table tr:first-child td:first-child').html();
            var czat_menu_ul = $('div#czat_menu').html();
            
            // remove chat GUI and append new one
            $('div#forma_cale').empty().append(
                '<div id="czat_col1">' +
                	'<a id="linki_pozycji" onclick="gora();" style="margin-right: 5px;">▲</a><a id="linki_pozycji" onclick="dol();">▼</a><br>' +
                	'<input type="checkbox" id="dzwiek_czatu" name="dzwiek" value="dzwiek"' + (localStorage.__KuroAW__ChatGUISoundDef === 'true' ? ' checked' : '') + '>Dźwięk czatu<br>' +
                	(__KuroAW__.isUserInElite ?
                		'<input type="checkbox" id="elita" name="elita">Tylko elita<br>' +
                     	'<input type="checkbox" id="__KuroAW__eliteShortPrefix"' + (localStorage.__KuroAW__ChatGUIElitePrefixDef === 'true' ? ' checked' : '') + '>Krótki prefix' : ''
                	) +
                '</div>' +
                (localStorage.__KuroAW__ChatGUIOnTop === 'true' ? 
                	'<div id="czat_col2">' + bbcode_buttons + czat_col2 + '</div>' :
                	'<div id="czat_col2">' + czat_col2 + bbcode_buttons + '</div>'
                ) +
                '<div id="czat_menu">' + czat_menu_ul + '</div>'
            // give it a CSS
            ).prepend(
                '<style type="text/css"> ' +
                	'#forma_cale{position:relative;}' +
                	'#czat_col1{width:100px;position:absolute;left:0px;top:0px;}' +
                	'#czat_col2{margin: 0 66px 0 100px;}' +
                	'#czat_menu{width:66px;position:absolute;right:0px;top:0px;}' +
                	'textarea#text_okno{width: 100%; height: 76px; margin: 3px 0 3px 0;}' +
                ' </style>'
            );
			
            // and CSS for bbcode buttons
            $('div#__KuroAW__bbcodeButtonsWrapper').prepend(
                '<style type="text/css"> ' +
                	'div#__KuroAW__bbcodeButtonsWrapper{margin: 0; padding: 0; margin-left: -2px;}' +
                	'button.__KuroAW__bbcodeButton{border: solid 1px #bbb; background-color: #f4f4f4; height: 22px; margin: 0 2px; border-radius: 2px;}' +
                	'button.__KuroAW__bbcodeButton:hover{background-color: #333; color: #eee;}' +
                ' </style>'
            );
            
            // fix events
            $("div#forma_cale textarea[name=tresc]").keyup(__KuroAW__.chatTextareaKeyUp);
            $("input#elita").change(function() {
                if ($("input#elita").attr("checked")) {
                    $("div.czat_nowy").hide();
                    $("div.czat_nowy[title=elita]").show();
                }
                else {
                    $("div.czat_nowy").show();
                    Load(1);
                }
            });
            
            $('#__KuroAW__chatButtonRefresh').click(function(){Load(1); setTimeout("if ($('span#licznik').text() === 'Odświeżono') $('span#licznik').text('" + $('span#licznik').text() + "');", 3000); $('span#licznik').text('Odświeżono');});
            
            $('#__KuroAW__bbcodeButtonB').click(function(){__KuroAW__.chatBbcode('[b]', '[/b]')});
            $('#__KuroAW__bbcodeButtonI').click(function(){__KuroAW__.chatBbcode('[i]', '[/i]')});
            $('#__KuroAW__bbcodeButtonU').click(function(){__KuroAW__.chatBbcode('[u]', '[/u]')});
            $('#__KuroAW__bbcodeButtonS').click(function(){__KuroAW__.chatBbcode('[s]', '[/s]')});
            $('#__KuroAW__bbcodeButtonCytuj').click(function(){__KuroAW__.chatBbcode('[cytuj]', '[/cytuj]')});
            $('#__KuroAW__bbcodeButtonSpoiler').click(function(){__KuroAW__.chatBbcode('[spoiler]', '[/spoiler]')});
            $('#__KuroAW__bbcodeButtonSpoilerLink').click(function(){__KuroAW__.chatBbcode('[spoiler_link]', '[/spoiler_link]')});
            $('#__KuroAW__bbcodeButtonSpoilerImg').click(function(){__KuroAW__.chatBbcode('[spoiler_img]', '[/spoiler_img]')});
            $('#__KuroAW__bbcodeButtonUrl').click(function(){__KuroAW__.chatBbcode('[url=', ']link[/url]')});
            $('#__KuroAW__bbcodeButtonWikilink').click(function(){__KuroAW__.chatBbcode('[wikilink]', '[/wikilink]')});
        },
        
        chatTextareaKeyUp: function(e) {
            var limit = 700;
            var count_chars = $(this).val().length;
            if (count_chars !== 0)
            	$('span#licznik').text(count_chars + ' / 700');
            else
            	$('span#licznik').text('');
                
            if (count_chars > limit) {
                var new_value = $(this).val().substring(0, limit);
                $(this).val(new_value)
            }
            if (e.keyCode == 13) {
                if (count_chars > 1) {
                    if (__KuroAW__.isUserInElite)
                    	if ($('input#__KuroAW__eliteShortPrefix').attr('checked') && $('#text_okno').val().indexOf(localStorage.__KuroAW__ChatGUIElitePrefix + ' ') == 0)
                        	$("#text_okno").val('!elita ' + $("#text_okno").val().substring(localStorage.__KuroAW__ChatGUIElitePrefix.length + 1));
                    wyslij();
                    $('#text_okno').val('');
            		$('span#licznik').text('Wysłano');
        			setTimeout("if ($('span#licznik').text() === 'Wysłano') $('span#licznik').text('');", 3000);
                } else {
                	Load(1);
                    $('#text_okno').val('');
            		$('span#licznik').text('Odświeżono');
        			setTimeout("if ($('span#licznik').text() === 'Odświeżono') $('span#licznik').text('');", 3000);
                }
            }
        },
        
        chatBbcode: function(tag1, tag2) {
            var textArea = $('#text_okno');
            var len = textArea.val().length;
            var start = textArea[0].selectionStart;
            var end = textArea[0].selectionEnd;
            var selectedText = textArea.val().substring(start, end);
            var replacement = tag1 + selectedText + tag2;
            textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
        }
    };
    

////////////////////////////////////////////////////////////////////////////////
//// PAGE: ALL

if(typeof(Storage) === "undefined") alert("Używasz KuroAW na przeglądarce, która nie obsługuje local storage lub ma wyłączoną tę funkcję, więc KuroAW nie ma gdzie zapisać swojej konfiguracji. Spodziewaj się problemów.");
else {
	if (localStorage.__KuroAW__ChatGUI === undefined)
        localStorage.__KuroAW__ChatGUI = "false";
	if (localStorage.__KuroAW__ChatGUISoundDef === undefined)
        localStorage.__KuroAW__ChatGUISoundDef = "false";
	if (localStorage.__KuroAW__ChatGUIBBCode === undefined)
        localStorage.__KuroAW__ChatGUIBBCode = "true";
	if (localStorage.__KuroAW__ChatGUIOnTop === undefined)
        localStorage.__KuroAW__ChatGUIOnTop = "false";
	if (localStorage.__KuroAW__ChatGUIElitePrefix === undefined)
        localStorage.__KuroAW__ChatGUIElitePrefix = "?";
	if (localStorage.__KuroAW__ChatGUIElitePrefixDef === undefined)
        localStorage.__KuroAW__ChatGUIElitePrefixDef = "true";
	if (localStorage.__KuroAW__UserCSS === undefined)
        localStorage.__KuroAW__UserCSS = "";
    
    $('body').append('<style type="text/css">' + localStorage.__KuroAW__UserCSS + '</style>');
}

////////////////////////////////////////////////////////////////////////////////
//// PAGE: Strona_główna
	if ($('body').hasClass('page-Strona_główna')) {
	
        // chat init delay
        $('body').append('<a href="javascript:void(0)" id="__KuroAW__chatInitDelay" style="display:none"></a>');
        $("body > a#__KuroAW__chatInitDelay").click(function(){__KuroAW__.chatInit();});
        for (var i = 1; i < 20; ++i) setTimeout("$('a#__KuroAW__chatInitDelay').click();", i * 500);
	}