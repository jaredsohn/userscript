// ==UserScript==
// @name        PimpMyNotabenoid
// @description This script adds some usefull features like hot-keys to notabenoid.com
// @namespace   igor.mukhin@gmx.de
//
// @version     7.7.1
// @downloadURL https://userscripts.org/scripts/source/117888.meta.js
// @downloadURL https://userscripts.org/scripts/source/117888.user.js
//
// @include     http://notabenoid.com/*
// @include     http://www.notabenoid.com/*
// @include     http://notabenoid.ru/*
// @include     http://www.notabenoid.ru/*
//
// @grant		none
// ==/UserScript==

// Wrap whole code into one function. Needed to inject the code into the page
function PimpMyNotabenoid3() {

/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/
(function(jQuery){

	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},

		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
			
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}

		var origHandler = handleObj.handler;
		var	keys = handleObj.data.toLowerCase().split(" ");

		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				 event.target.type === "text") ) {
				return;
			}

			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}

			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );



var U = {
	username: null,
    orig_hovered_id: "", // "o13857594" id of the hovered translation area (current line)
    tr_hovered_id: "", // "t13857594" id of the hovered translation (current translation)
    newtr_text: "", // text for the next new variant
	
	init: function() {
		U.username = $("#header-submenu strong:first").text();
		
		// inject our CSS
		$("<style type='text/css'>\n"
			+ ".div_hovered { background-color: #EEE; }\n"
			+ ".tdt_hovered { }\n" // вроде и без фона нормально
			+ ".deleting { background-color: #f5989d; }\n"
			+ ".translator td.tdu_todo { background-color: #EEEEBB }\n"
			  // чтобы не прыгало из-за появляющихся и исчезающих кнопок на новой строке
			+ ".translator td.t a.e, .translator td.t a.x { display: inline; visibility: hidden; }"
			+ ".translator tr:hover td.t a.e, .translator tr:hover td.t a.x { visibility: visible; } "
			+ "</style>").appendTo("head");

	    // remove standard edit handlers
	    $("#Tr")
	        .off("click", "td.u a.t", T.tr)
	        .off("click", "td.t a.e", T.tr_edit)
	        .off("click", "td.t a.x", T.tr_rm);

	    // inject our own edit handlers
	    T.tr = U.tr;
	    T.tr_edit = U.tr_edit;
	    T.tr_rm = U.tr_rm;
	    
	    // activate our edit handlers
	    $("#Tr")
	        .on("click", "td.u a.t", U.tr)
	        .on("click", "td.t a.e", U.tr_edit)
	        .on("click", "td.t a.x", U.tr_rm);
	        
	    // setup our character counter
	    // (the native one was started every time the edit box was open, so it overloaded the processor after some work on the page. So we start it only once.)
	    T.tr_ccnt.update = U.tr_ccnt_update;
		setInterval(U.tr_ccnt_update, 1000);
		
		// hovering handlers
	    $("#Tr").on("mouseenter", "td.t > div", U.tr_mouseenter);
	    $("#Tr").on("mouseleave", "td.t > div", U.tr_mouseleave);
	    $("#Tr").on("mouseenter", "td.t", U.orig_mouseenter);
	    $("#Tr").on("mouseleave", "td.t", U.orig_mouseleave);

		// 'e' for edit of the hightlighted variant
		$(document).bind("keydown", "e", U.tr_hovered_edit);
		// 'v' for new variant of the hightlighted row
		$(document).bind("keydown", "v", U.tr_hovered_newtr);
		// 'c' for new variant of the hightlighted row as a copy of the highlighted variant
		$(document).bind("keydown", "c", U.tr_hovered_newtr_withcopy);
		// 'o' take the translation variant over
		$(document).bind("keydown", "o", U.tr_hovered_take_over);
		// 'd' for selecting of the hightlighted variant for deletion
		$(document).bind("keydown", "d", U.tr_hovered_mark_delete);
		// 'y' for confirming a deletion
		$(document).bind("keydown", "y", U.tr_marked_delete);
		// 'm' for hightlighting rows with multiple variants or with comments
		$(document).bind("keydown", "m", U.highlight_todo_rows);
		// 'g' to goto line
		//$(document).bind("keydown", "g", U.goto_line);
	},
	
	log: function (msg) {
    	if (console) console.log("PMN3: " + msg);
	},
	
	getCurrentTextarea: function() {
		var $ta = $("#form-tr [name=Translation\\[body\\]]");
		if ($ta.size() != 1) return null;
		return $ta;
	},
	
	getCurrentTextInEditor: function() {
		var $ta = U.getCurrentTextarea();
		if ($ta == null) return "";
		return $ta.val();
	},
	
	highlight_todo_rows: function() {
		$("#Tr tbody tr").each(function() {
	        var $tr = $(this);
	        
	        var hit = ($tr.find("td.u a.c").text().length > 0) 
	               || ($tr.find("td.t > div").size() != 1);
	        
        	$tr.find("td.u").toggleClass("tdu_todo", hit);
		});
	},
	
	goto_line: function() {
	    var to = prompt("Введите номер абзаца для быстрого перехода", "");
	    if (to && parseInt(to) != 0) {
	    	var orig_id = "?"; // как-то не найти айдишник строки
	        location.href = "/book/" + Book.id + "/" + Chap.id + "/" + orig_id;
	    }
	},	
	
    tr_mouseenter: function(evt) {
        U.tr_hovered_id = $(this).attr("id");
        $(this).addClass("div_hovered");
    },
    
    tr_mouseleave: function(evt) {
        U.tr_hovered_id = "";
        $(this).removeClass("div_hovered deleting");
    },
	
    orig_mouseenter: function(evt) {
        U.orig_hovered_id = $(this).parent().attr("id");
        $(this).addClass("tdt_hovered");
    },
    
    orig_mouseleave: function(evt) {
        U.orig_hovered_id = "";
        $(this).removeClass("tdt_hovered");
    },
    
    tr_hovered_getText: function() {
        if (U.tr_hovered_id == "") return "";
	    return $("#" + U.tr_hovered_id + " span.b").text();
    },
    
    tr_hovered_edit: function(evt) {
        if (evt) evt.preventDefault();
        if (U.tr_hovered_id != "") {
	        $("#" + U.tr_hovered_id + " a.e").click();
	        return false;
        }
        
        // if nothing under the mouse than try to add the new translation
        return U.tr_hovered_newtr(evt);
    },
    
    tr_hovered_newtr: function(evt) {
        if (evt) evt.preventDefault();
        if (U.orig_hovered_id == "") return false;
        
	    $("#" + U.orig_hovered_id + " td.u a.t").click();
	    return false;
    }, 
    
    tr_hovered_newtr_withcopy: function(evt) {
        if (evt) evt.preventDefault();
        if (U.orig_hovered_id == "") return false;
        
        U.newtr_text = U.tr_hovered_getText();
        return U.tr_hovered_newtr(evt);
    }, 
    
    tr_hovered_take_over: function(evt) {
        if (evt) evt.preventDefault();
    	if (U.tr_hovered_id == "") return false;
    	
    	var divId = "#" + U.tr_hovered_id;
        var $div = $(divId);
        var tr_text = $div.find("span.b").text();
        var $tr = $div.closest("tr");
        
        // check user have add new variant button
        if ($tr.find("td.u a.t").size() == 0) return;
        // check user can delete the variant under mouse
        if ($div.find("a.x").size() == 0) return;
        // check the variant under mouse is not of user
        if ($div.find("a.user").text() == U.username) return;

		if (U.tr_add_now($tr, tr_text)) {
			$div = $(divId); // the DOM was refreshed by tr_add_now, so get the div again
	        U.tr_remove($div);
		}      
    },
    
    // adds new variant to row $tr with text new_text
    tr_add_now: function($tr, new_text) {
    	if (!$tr || $tr.size() != 1) return false;
    	var orig_id = $tr.attr("id").substr(1);
    	
    	var saved = false;
		$.ajax({
			url: "/book/" + Book.id + "/" + Chap.id + "/" + orig_id + "/translate",
			type: 'POST',
			data: {'Translation[body]': new_text, ajax: 1},
			async: false,
			dataType: "json",
			success: function(data) {
				if (data.status == "error") return !!alert(data.error);

				$tr.children("td.t").html(data.text);
				T.setStats(data.n_vars, data.d_vars, data.n_verses);
				saved = true;
			}
		});
    	
    	return saved;
    },
    
    tr_hovered_mark_delete: function(evt) {
        if (evt) evt.preventDefault();
    	if (U.tr_hovered_id == "") return false;
    	
        var $div = $("#" + U.tr_hovered_id);
    	$div.addClass("deleting");
    },
    
    tr_marked_delete: function(evt) {
        if (evt) evt.preventDefault();
    	$("td.t > div.deleting").each(function () {
    		U.tr_remove($(this));
    	});	
    },
    
    tr: function(evt) {
        if (evt) evt.preventDefault();
		T.tr_next = null;

        var $tr = $(this).closest("tr");
        var orig_id = $tr.attr("id").substr(1);
        if (T.editing_start("tradd", orig_id)) return;

		var html =
			"<div class='tr-editor'><form id='form-tr' method='post' action='/book/" + Book.id + "/" + Chap.id + "/" + orig_id + "/translate'>" +
			"<textarea name='Translation[body]'></textarea>" +
			"<button type='submit' class='btn btn-mini btn-primary' title='Ctrl+Enter &ndash; сохранить и перейти к следующему\nCtrl+Shift+Enter &ndash; сохранить.'>Добавить</button> " +
			"<button type='button' class='btn btn-mini cancel' onclick='T.editing_stop()'>Отмена</button> " +
			"<span id='tr-ccnt' title='Длина в символах'>Оригинал: <b class='o'>?</b> / Перевод: <b class='t'>?</b></span>" +
			"</form></div>";
        $tr.children("td.t").append(html);
        
		$ta = $("#form-tr textarea");
		$ta.val(U.newtr_text);
		U.newtr_text = "";
		U.tr_setupEditor(orig_id, $ta);

		$("#form-tr").ajaxForm({
			dataType: "json",
	        data: {ajax: 1},
			beforeSubmit: function() {
			    $("#form-tr :submit").attr("disabled", true);
			},
            success: function(data) {
                if (data.error) {
				    $("#form-tr :submit").attr("disabled", false);
				    alert(data.error);
				    return false;
				}

				U.tr_editorFinished("tradd", orig_id, $tr, data);
            }
        });
    },
    
	tr_edit: function(evt) {
        if (evt) evt.preventDefault();
        T.tr_next = null;

        var $tr = $(this).closest("tr");
	    var orig_id = $tr.attr("id").substr(1);
        var $div = $(this).closest("div");
        var tr_id = $div.attr("id").substr(1);
        var tr_text = $div.find("span.b").text();
        T.editing_start("tredit", tr_id);
        T.editing_html = $div.html();

        var html =
			"<div class='tr-editor'><form id='form-tr' method='post' action='/book/" + Book.id + "/" + Chap.id + "/" + orig_id + "/translate?tr_id=" + tr_id + "'>" +
			"<textarea name='Translation[body]'></textarea>" +
			"<button type='submit' class='btn btn-mini btn-primary'>Сохранить</button> " +
			"<button type='button' class='btn btn-mini cancel' onclick='T.editing_stop()'>Отмена</button> " +
			(Book.membership.status != 2 ? "<small class='help-inline'>рейтинг будет обнулён</small>": "") +
			"<span id='tr-ccnt' title='Длина в символах'>Оригинал: <b class='o'>?</b> / Перевод: <b class='t'>?</b></span>" +
			"</form></div>";
        $div.html(html);
        
		$ta = $("#form-tr textarea");
		$ta.val(tr_text);
		U.tr_setupEditor(orig_id, $ta);
	    
		$("#form-tr").ajaxForm({
			dataType: "json",
			data: {ajax: 1},
			beforeSubmit: function() {
				if (tr_text == U.getCurrentTextInEditor()) {
					U.tr_editorFinished("tredit", tr_id, null, null);
					return false;
				}
				
				$("#form-tr :submit").attr("disabled", true);
			},
			success: function(data) {
				if (data.error) {
					$("#form-tr :submit").attr("disabled", false);
					alert(data.error);
					return false;
				}

				U.tr_editorFinished("tredit", tr_id, $tr, data);
			}
		})
    },
    
    tr_editorFinished: function(editing_mode, editing_id, $tr, data) {
		// если еще не открыли другой редактор, то закрываем себя
		if (T.editing_mode == editing_mode && T.editing_id == editing_id) {
			T.editing_stop();
		}
		
		if (data && $tr) {
			$tr.children("td.t").html(data.text);
			T.setStats(data.n_vars, data.d_vars, data.n_verses);
		}
		
		// После сохранения нового варианта и он единственный, а след. поле пустое, то прыгать на след. поле
		if (!T.tr_next && editing_mode == "tradd" && $tr) {
			var $tr_next = $tr.next();
			if ($tr_next.size() != 0 && $tr.find("td.t > div").size() == 1 && $tr_next.find("td.t > div").size() == 0) {
				T.tr_next = $tr_next.find("td.u a.t");
			}
		}
		
		// jump to the next edit
		setTimeout(function() {
			if (T.tr_next && T.tr_next.length) {
				 T.tr_next.click();
			}
	    }, 0);
    },
    
    tr_setupEditor: function(orig_id, $ta) {
		T.tr_ccnt.init(orig_id);
		U.tr_ccnt_update();
		
		$ta.elastic();
		$ta.focus();
		U.scrollIntoView($ta);

        $ta.bind("keydown", "ctrl+return", function(e) {
			$("#form-tr :submit").click();
		});
        $ta.bind("keydown", "esc", function(e) {
			$("#form-tr .cancel").click();
		});
		
        $ta.bind("keydown", "ctrl+down", U.tr_save_and_goto_next);
        $ta.bind("keydown", "ctrl+up", U.tr_save_and_goto_prev);
        $ta.bind("keydown", "ctrl+k", U.ta_korrekt);
    },
    
    ta_korrekt: function(evt) {
        if (evt) evt.preventDefault();
        var lines = U.getCurrentTextInEditor().split(/\n/);
        var text = "";
/*
Это тестовый текст.
- Тире в начале строки.
Тире в конце строки -
Тире - бывает и в середине.
"Слово" в "кавычках"
Закрывающая строка
*/

        for (var i in lines) {
            var line = lines[i];
            line = line.replace(/^\-\s/g, "— ");
            line = line.replace(/\s\-/g, " —");
            line = line.replace(/\s\-\s/g, " — ");
            
            line = line.replace(/\"([\u0400-\u04FF\w])/g, "«$1");
            line = line.replace(/([\u0400-\u04FF\w\.\?\!])\"/g, "$1»");
            
            if (i > 0) text += "\n";
            text += line;
        }
        
        //console.log(text);
        U.getCurrentTextarea().val(text);
    },
    
	tr_rm: function(evt) {
        if (evt) evt.preventDefault();
		var $div = $(this).closest("div");

		$div.addClass("deleting");
		if (!confirm("Вы уверены, что хотите удалить этот вариант перевода? Отменить эту процедуру нельзя.")) {
			$div.removeClass("deleting");
			return;
		}

		U.tr_remove($div);
	},
	
    tr_remove: function($div) {
		var tr_id = $div.attr("id").substr(1);
    	var $tr = $div.closest("tr");
		var orig_id = $tr.attr("id").substr(1);
		
		$div.addClass("deleting");
		
		$.ajax({
			url: "/book/" + Book.id + "/" + Chap.id + "/" + orig_id + "/tr_rm",
			dataType: "json",
			type: "POST",
			data: {tr_id: tr_id},
			async: false,
			success: function(data) {
				$div.removeClass("deleting");
				if(data.error) {
					alert(data.error);
					return false;
				} else if(data.status == "ok") {
					$div.remove();
					T.setStats(data.n_vars, data.d_vars, data.n_verses);
				} else {
					alert("Произошла какая-то ошибка, удалить перевод не удалось. Попробуйте обновить страницу.");
					return false;
				}
			},
			error: function(xhr) {
				$div.removeClass("deleting");
			}
		});
    },
	
    tr_save_and_goto_next: function(evt) {
        if (evt) evt.preventDefault();
        var $tr = $("#form-tr").closest("tr");
        if ($tr.size() == 0) return; 
        var $tr_next = $tr.next("tr");
        U.tr_save_and_goto($tr_next);
    },
    
    tr_save_and_goto_prev: function(evt) {
        if (evt) evt.preventDefault();
        var $tr = $("#form-tr").closest("tr");
        if ($tr.size() == 0) return; 
        var $tr_next = $tr.prev("tr");
        U.tr_save_and_goto($tr_next);
    },
    	
    tr_save_and_goto: function($tr_next) {
    	if ($tr_next == null || $tr_next.size() != 1) return;

		// TODO: escape U.username - http://forum.jquery.com/topic/add-a-jquery-selector-escape-function
		// try to find user's own best variant
        var $but_next = $tr_next.find("td.t div.best:has(a.user:contains('" + U.username + "')) a.e:first");
        if ($but_next.size() == 0) {
			// try to find user's own variant
			$but_next = $tr_next.find("td.t div:has(a.user:contains('" + U.username + "')) a.e:first");	        
	    }
        if ($but_next.size() == 0) {
	        // try to find bold variant
	        $but_next = $tr_next.find("td.t div.best a.e");
        }
        if ($but_next.size() == 0) {
	        // try to find any editable variant
	        $but_next = $tr_next.find("td.t a.e:first");
        }
        if ($but_next.size() == 0) {
	        // try to find add new variant button
            $but_next = $tr_next.find("td.u a.t");
        }
        
        if ($.trim(U.getCurrentTextInEditor()) == "") {
        	if (T.editing_mode == "tradd") {
	            T.editing_stop();
	            if ($but_next.size() == 1) $but_next.click();
        	} else if (T.editing_mode == "tredit") {
        		var $tr = $("#t" + T.editing_id);
	            T.editing_stop();
        		U.tr_remove($tr);
	            if ($but_next.size() == 1) $but_next.click();
        	}
        	
		} else {
            T.tr_next = $but_next;
            $("#form-tr :submit").click();
		}
    },
    
	tr_ccnt_update: function() {
		var t = U.getCurrentTextInEditor().replace(/\n/g, "");
		$("#tr-ccnt b.t").text(t.length);
	},
	
	scrollIntoView: function($element) {
		if (!$element) return;
		
	    var margin = 100;
	    var containerTop = $(document).scrollTop(); 
	    var containerBottom = containerTop + $(window).height();
	    var elemTop = $element.offset().top;
	    var elemBottom = elemTop + $element.height(); 
	    if (elemTop - margin < containerTop) {
	        $(document).scrollTop(elemTop - margin);
	    } else if (elemBottom + margin > containerBottom) {
	        $(document).scrollTop(elemBottom - $(window).height() + margin);
	    }
	}
	
};

$(document).ready(function() {
	// Добавляем записке о себе в подвал
	var $fd = $("footer div.container div.row");
	if ($fd.size() != 0) {
		$fd.after(
			  "<div>" 
			+ "<br>На сайте работает плагин <a href=\"http://userscripts.org/scripts/show/117888\">PimpMyNotabenoid</a> версии 7.5"
			+ "<br>Разработчики рекомедуют <a href=\"http://www.youtube.com/watch?v=V3uunhQIMIY\">Проект Венера</a>"
			+ "<br>Ошибки в плагине сообщайте <a href=\"http://vk.com/igormukhin\">Игорю Мухину</a>"
			+ "</div>"
		);
	}
	
	// Проверяем в переводчике ли мы
    if ($("table.translator").size() == 0) {
    	U.log("Not in translator... Exiting...");
        return;
    }
    
    // cheking notabenoid javascript version
    //var supportedTranslateJsVersion = 18;
    //if ($("head script[src$='translate.js?" + supportedTranslateJsVersion + "']").size() == 0) {
    //	U.log("This version of notabenoid's translate.js is not supported.");
    //	return;
    //}

	// Начинаем    
    U.log("Initalizing...");
    U.init();
	U.log("Finished initialisation...");
});

} // end of PimpMyNotabenoid3()


/* 
 * Inject the whole script into the page. We will need to manuplate internal objects of Notabenoid engine.
 */
(function page_scope_runner() {
	var script = document.createElement('script');
	script.setAttribute("type", "text/javascript");
	script.textContent = "(" + PimpMyNotabenoid3.toString() + ")();";
	document.body.appendChild(script);
})();
