// ==UserScript==
// @name           Vk_message_del
// @namespace      vk
// @description    Delete all messages from mailbox on vkontakte web site
// @include        http://vkontakte.ru/mail.php*
// @include        http://vk.com/mail.php*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        // тут мы создаём кнопки, которые будут дёргать одну нашу внешнюю функцию.
	// out = 0 - inbox	
	// out = 1 - outcox
	var code='<li class="vkskript"><a id="del0">Delete All Inbox</a></li><li class="vkskript"><a  id="del1">Delete Outbox</a></li>';
	if ( $('#msgs ul.tabs').length > 0){	// Если нашли правильное  место, то ставим в него
		$('#msgs ul.tabs').append(code);		
		$('#msgs ul.tabs').css('width','80%');
		log.push("Used '#msgs ul.tabs' to append buttons");
	} else if ( $('#msgs ul:first').length > 0){	// Иначе ищем чуть более подходящее место
		$('#msgs ul:first').append(code);
		log.push("Used '#msgs ul:first' to append buttons");
	} else if ( $('#content ul').length > 0){ // Продолжаем искать
		$('#content ul').append(code);
		log.push("Used '#content ul' to append buttons");
	} else { // не нашли
		alert("Разработчики поменяли разметку страницы, скрипт нуждается в модификации. Обратитесь к разработчику.");
	}
	
	$("#del0").click(function(){
		deleteAllCKInboxMessaged(0);
	});
	$("#del1").click(function(){
		deleteAllCKInboxMessaged(1);
	});
}
		
var deleteAllCKInboxMessaged;
var deleteAllVKMessagedLog = new Array();
function deleteAllVKMessagedLogShow(){
	alert(deleteAllVKMessagedLog.join('\n'));
}

var log = deleteAllVKMessagedLog;
var deletedPagesNumber = 0;

function executeFunction(number,ss,out){
	ss.addFunction(function(){		
		$.get('/mail.php',{'out':out,'st':number},function(data){
			try{
				json_parse(data,function(key, value){
					if ( key == "content"){
						deleteMessagesOnCurrentPage(value,out,number);
						deletedPagesNumber--;
						if(deletedPagesNumber==0){
							window.location = "/mail.php?out="+out;
						}
						ss.removeFunction();
					}
				});
				// Иногда от сервера приходят кривые даннные. Теоретически их можно попытаться разобрать
				// но в данном случае будет логично будет просто продолжить работу.
			} catch(ex) {
				ss.removeFunction();
				log.push("Error during json parsing   " +  ex);
				deletedPagesNumber--;
				if(deletedPagesNumber==0){
					window.location = "/mail.php?out="+out;
				}
			} 		
		});
			/*		
			// Это предыдущия верси получения контента страницы и удаления сообщений.
			// Иногда вызов callback не происходит, судя по всему из-за того, то 
			// JSON неправильно сформирован. Перехватить это у меня не получилось, а 
			// чтобы механизм продолжил работу нужно вызвать "ss.removeFunction();"
			$.getJSON('/mail.php',{'out':out,'st':number},function(data){
				var $data = data.content;		
				deleteMessagesOnCurrentPage($data,out,number);
				deletedPagesNumber--;
				if(deletedPagesNumber==0){
					window.location = "/mail.php?out="+out;
				}
				ss.removeFunction();
			});
			*/
	});
}		

function deleteMessagesOnCurrentPage(data,out,number){
	result = data.match(/<tr[^>]+id="mess([0-9]+)"/g);
	for(i=result.length-1;i>=0;i--){
		var msg_id = parseInt(/<tr[^>]+id="mess([0-9]+)"/.exec(result[i])[1]);
		if ((typeof msg_id == 'undefined')|| isNaN(msg_id)){
				log.push('Unable to parse message. id:' + this.id);
		}
		$.post('/mail.php', {'out': out, 'act': 'a_delete', 'id': msg_id}, function(answer){},'String');
	}
}
		
function deleteAllCKInboxMessaged(out){
	if(!confirm("Are you sure?"))
		return;				
	$('#content').fadeTo(400,0.3);
	$.getJSON('/mail.php',{'out':out},function(data){
			var messagesNumber = data.count;
			if((typeof messagesNumber == 'undefined') || isNaN(messagesNumber))
				alert('Невозможно получить число сообщений.');
			messagesNumber = messagesNumber - messagesNumber%20
			setTimeout(function(){afterGetMessageNumber(messagesNumber,out);},2000);
		});
}

function afterGetMessageNumber(messagesNumber,out){
	var ss = new SyncSequence();
	while(messagesNumber>=0)
	{				
		executeFunction(messagesNumber,ss,out);	
		// На странице по 20 сообщений, надеюсь это не поменяется. 
		// Вообще неплохо бы вынести в переменную, но как-нибудь потом.
		messagesNumber = messagesNumber - 20;		
		deletedPagesNumber++;
	}
	// Вначале мы составили последовательность вызовов, каждый из которых будет удалять
	// по одной странице сообщений, а теперь запускаем эту последовательность.
	// Можно откинуться в кресло и наслаждаться результатом.
	ss.runSequence();
}


// Этот объект необходим для того, чтобы исполнять асинхронные вызовы последовательно.
// Вначале мы добавляем функции в очередь, а потом, в конце работы каждой из добавленных функций
// извлекаем её из очереди. В этот момент вызывается следующая функция. Таким методом достигается синхронность.
function SyncSequence(){
	this.__functions__ = new Array();
}
SyncSequence.prototype={	
	addFunction:function(func){
		this.__functions__.push(func);		
	},
	removeFunction:function(){		
		this.__functions__.splice(0,1);		
		this.runSequence();
	},
	runSequence:function(){
		var context = this.__functions__[1];	
		if(this.__functions__.length > 0)
			setTimeout(function(){context();},2000);
	}
}

// Поскльку библиотека JQuery в случае если внутри JSON возникли проблемы тихо падает, мне пришлось
// использовать готовую библиотеку. Благо минимального её функционала хватает.

var json_parse = (function () {

// This is a function that can parse a JSON text, producing a JavaScript
// data structure. It is a simple, recursive descent parser. It does not use
// eval or regular expressions, so it can be used as a model for implementing
// a JSON parser in other languages.

// We are defining the function inside of another function to avoid creating
// global variables.

    var at,     // The index of the current character
        ch,     // The current character
        escapee = {
            '"':  '"',
            '\\': '\\',
            '/':  '/',
            b:    '\b',
            f:    '\f',
            n:    '\n',
            r:    '\r',
            t:    '\t'
        },
        text,

        error = function (m) {

// Call error when something is wrong.

            throw {
                name:    'SyntaxError',
                message: m,
                at:      at,
                text:    text
            };
        },

        next = function (c) {

// If a c parameter is provided, verify that it matches the current character.

            if (c && c !== ch) {
                error("Expected '" + c + "' instead of '" + ch + "'");
            }

// Get the next character. When there are no more characters,
// return the empty string.

            ch = text.charAt(at);
            at += 1;
            return ch;
        },

        number = function () {

// Parse a number value.

            var number,
                string = '';

            if (ch === '-') {
                string = '-';
                next('-');
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
            if (ch === '.') {
                string += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    string += ch;
                }
            }
            if (ch === 'e' || ch === 'E') {
                string += ch;
                next();
                if (ch === '-' || ch === '+') {
                    string += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    string += ch;
                    next();
                }
            }
            number = +string;
            if (isNaN(number)) {
                error("Bad number");
            } else {
                return number;
            }
        },

        string = function () {

// Parse a string value.

            var hex,
                i,
                string = '',
                uffff;

// When parsing for string values, we must look for " and \ characters.

            if (ch === '"') {
                while (next()) {
                    if (ch === '"') {
                        next();
                        return string;
                    } else if (ch === '\\') {
                        next();
                        if (ch === 'u') {
                            uffff = 0;
                            for (i = 0; i < 4; i += 1) {
                                hex = parseInt(next(), 16);
                                if (!isFinite(hex)) {
                                    break;
                                }
                                uffff = uffff * 16 + hex;
                            }
                            string += String.fromCharCode(uffff);
                        } else if (typeof escapee[ch] === 'string') {
                            string += escapee[ch];
                        } else {
                            break;
                        }
                    } else {
                        string += ch;
                    }
                }
            }
            error("Bad string");
        },

        white = function () {

// Skip whitespace.

            while (ch && ch <= ' ') {
                next();
            }
        },

        word = function () {

// true, false, or null.

            switch (ch) {
            case 't':
                next('t');
                next('r');
                next('u');
                next('e');
                return true;
            case 'f':
                next('f');
                next('a');
                next('l');
                next('s');
                next('e');
                return false;
            case 'n':
                next('n');
                next('u');
                next('l');
                next('l');
                return null;
            }
            error("Unexpected '" + ch + "'");
        },

        value,  // Place holder for the value function.

        array = function () {

// Parse an array value.

            var array = [];

            if (ch === '[') {
                next('[');
                white();
                if (ch === ']') {
                    next(']');
                    return array;   // empty array
                }
                while (ch) {
                    array.push(value());
                    white();
                    if (ch === ']') {
                        next(']');
                        return array;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad array");
        },

        object = function () {

// Parse an object value.

            var key,
                object = {};

            if (ch === '{') {
                next('{');
                white();
                if (ch === '}') {
                    next('}');
                    return object;   // empty object
                }
                while (ch) {
                    key = string();
                    white();
                    next(':');
                    if (Object.hasOwnProperty.call(object, key)) {
                        error('Duplicate key "' + key + '"');
                    }
                    object[key] = value();
                    white();
                    if (ch === '}') {
                        next('}');
                        return object;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad object");
        };

    value = function () {

// Parse a JSON value. It could be an object, an array, a string, a number,
// or a word.

        white();
        switch (ch) {
        case '{':
            return object();
        case '[':
            return array();
        case '"':
            return string();
        case '-':
            return number();
        default:
            return ch >= '0' && ch <= '9' ? number() : word();
        }
    };

// Return the json_parse function. It will have access to all of the above
// functions and variables.

    return function (source, reviver) {
        var result;

        text = source;
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) {
            error("Syntax error");
        }

// If there is a reviver function, we recursively walk the new structure,
// passing each name/value pair to the reviver function for possible
// transformation, starting with a temporary root object that holds the result
// in an empty key. If there is not a reviver function, we simply return the
// result.

        return typeof reviver === 'function' ? (function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && typeof value === 'object') {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = walk(value, k);
                        if (v !== undefined) {
                            value[k] = v;
                        } else {
                            delete value[k];
                        }
                    }
                }
            }
            return reviver.call(holder, key, value);
        }({'': result}, '')) : result;
    };
}());

