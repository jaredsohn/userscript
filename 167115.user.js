// ==UserScript==
// @name       2chru.net toolkit
// @namespace  http://kustosoft.com/*
// @author	KustoSoft
// @version    1.5.2.0
// @description  Ru2ch toolkit
// @match      https://2chru.net/*
// @copyright  2013+, KustoSoft
// @updateURL		http://kustosoft.com/ru2ch/metadata.js
// @downloadURL http://kustosoft.com/ru2ch/merge.php
// @require http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==
function config_load() {
    var default_config = {
			  "cooldown"		:	5,
			  "url_base"		:	"https://2chru.net/",
//			  "board"		:	location.pathname.match(/[^\/]+/).toString(),
			  "apiurl"		:	"imgboard.php",
			  "postform_name"	:	"",
			  "postform_password"	:	"",
			  "thread_autoupdate"	:	60,
			  "remove_spoilers"	:	"no",
			  "postform_sage"	:	"yes",
			  "postform_no_rules"	:	"yes",
			  "mask_images"		:	"yes",
			  "debug"		:	"no",
			  "panel_hideByDefault"	:	"yes",
			  "form_hide"		:	"yes",
			  "form_bottom"		:	"yes",
			  "exif"		:	"no",
			  "same_images"		:	"yes",
			  "noname_files"	:	"yes",
			  "steal_cookies"	:	"yes"
			  };
    var cfg = storage_get("ru2ch_config") || {};
    cfg = $.extend(default_config, cfg);
    config = cfg;
}

function config_save() {
    storage_set("ru2ch_config",config);
    ui_css();
}String.prototype.replaceAll = function(search, replace){
  return this.split(search).join(replace);
};

jQuery.fn.live = function( types, data, fn ) {
	jQuery( this.context ).on( types, this.selector, data, fn );
	return this;
};


$.extend({KXHR : function(url, options) {
						if(typeof url == "object") 
						    options = url;
						else
						    options['url'] = url;
						var done = function() {
						    var isSuccess = ((this.status == 200) && (this.statusText == "OK"));
						    if(isSuccess && options.success)
							options.success.call(this, this.response);
						    
						    if(!isSuccess && options.error)
							options.error.call(this);
						};
						var  xhr = new window.XMLHttpRequest();
						
						xhr.onload = done;
						xhr.onerror = done;
						xhr.open(options['type'], options['url'], true);
												
						for(var header in options['headers'])
							xhr.setRequestHeader(header, options['headers'][header]);
						xhr.withCredentials = true;
						
						xhr.send(options['data'] || null);
					}
	});

$.extend({"selectedText":	function () {
					    var txt = "";
					    if(window.getSelection)
					      txt = window.getSelection().toString();
					    else if(document.getSelection)
					      txt = document.getSelection();                
					    else if(document.selection)
					      txt = document.selection.createRange().text;
					  
					    return txt;
					  }
	});

$.fn.hasAttr = function(name) {
   return this.attr(name) !== undefined;
};

jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
};

$.fn.ajaxSubmit = function(options) {
	var append =  function(el) {
		lock++;
		var file, idx, fr,
			pre = '--' + boundary + '\r\nContent-Disposition: form-data; name="' + el.name + '"';
		if(el.type === 'file' && el.files.length > 0) {
			
			file = el.files[0];
			fName = file.name;
			
			
			if(!/^image\/(?:png|jpeg)$/.test(file.type)) {
				data.push(pre + '; filename="' + (!(config.noname_files == "yes") ? fName : 'name_removed' + fName.substring(fName.lastIndexOf('.'))
												    ) + '"\r\nContent-type: ' + file.type + '\r\n\r\n', null, '\r\n');
				idx = data.length - 2;
				data[idx] = file;
				lock--;
				return;
			}
			data.push(pre + '; filename="' + (
				!(config.noname_files == "yes") ? fName : 'name_removed' + fName.substring(fName.lastIndexOf('.'))
			) + '"\r\nContent-type: ' + file.type + '\r\nContent-transfer-encoding: binary\r\n\r\n', null, '\r\n');
			idx = data.length - 2;
			lock++;
			fr = new FileReader();
			fr.onload = function(e) {
				var dat = [new Uint8Array(e.target.result)];
				if(config.same_images == "yes")
				    dat.push(Math.round(Math.random() * 1e8));
				data[idx] = new Blob(dat);
				lock--;
				submit();
			};
			fr.readAsArrayBuffer(file);
			
		} else if(el.type !== 'checkbox' || el.checked)
			data.push(pre + '\r\n\r\n' + el.value + '\r\n');
		lock--;
	},
	submit = function() {
		if(lock!=0) return;
		data.push('--' + boundary + '--\r\n');
		options.data = new Blob(options.data);
		$.KXHR(options);
	};
	var boundary = '--------------------KustoSoft-------' + Math.round(Math.random() * 1e11) + '----------------------',
	    data = [],
	    lock = 0,
	    url = this.action,
	    //url = "http://kustosoft.com/test.php",
	    default_opts = {};
	options.url = $(this).attr("action");
	$(this).find("input:not([type='submit']),textarea,select").each(function(){append(this);});
	
	default_opts = {
			    type: 'post',
			    headers: {'Content-type': 'multipart/form-data; boundary=' + boundary},
			    data: data,
			    url: url			    
		    };
	$.extend(default_opts,options);
	options = default_opts;
	
	submit();
};function log(data) {
    console.log(data);
    $("#log").html("<div><a href='#' class='remover'>X</a>"+data+"<hr></div>"+$("#log").html());
    $(".remover").unbind('click').click(function(e) {
	  e.preventDefault();
	  $(e.target).parent().remove();
    });
}

function notification(notif) {
    $("#notification").html(notif).show(500);
    setTimeout(function(){$("#notification").hide(500);},5000);
}/*======================================
 *					*
 * 		Storage			*
 * 	Функции для хранения данных 	*
 * 					*
 *=====================================*
 */

function storage_get(key) {
    var val = GM_getValue(key);
    try {
      var v = JSON.parse(val);
      if(v) return v;
      return val;
    } catch(e) {
      return val;
    }
}

function storage_set(key, value) {
    var val = value;
    if((typeof val) == "object") {
	console.log("Saving as JSON");
	console.log(val);
	val = JSON.stringify(val);
    }
    GM_setValue(key, val);
}

function storage_unset(key) {
    GM_deleteValue(key);
}function tabs_init(base) {
    base.addClass("section").append("<div class='tabwrap'><div class='full'><ul class='tabs'></ul></div></div>");
}

function tabs_add(base, tab_header, tab_id) {
    var current = (!base.find(".tabs").children().length);
    base.find(".tabs").append("<li"+(current?" class='current'":"")+">"+tab_header+"</li>");
    base.append("<div class='box"+(current?" visible":"")+"' id='"+tab_id+"'></div>");
}var _togglers = [];
var _togglers_num = 0;

function toggler_create(params) {
    params.text1 = params.text1 || "[включено]";
    params.text2 = params.text2 || "[отключено]";
    var _f1 = function() {
	    params.elem.html(params.text1);
	    params.func1();
	};
    
	var _f2 = function() {
	    params.elem.html(params.text2);
	    params.func2();
	    
	};
    
    _togglers_num++;
    _togglers[_togglers_num] = true;
    
    var handle = function(e) {
	e.preventDefault();
	
	
	
	var id = parseInt(params.elem.attr("toggler-id"),10);
	if(_togglers[id]) {
 	    _f2(); _togglers[id] = false;
	} else {
	    _f1(); _togglers[id] = true;
	}
    };
    
    params.elem.click(handle);
    _f2();
}
function type_int(str) {
	if(!str) return 0;
	str = str.toString();
	return parseInt(str.replace(new RegExp("[^0-9]*"),""),10);
}

function type_object(delimiter, string) {
	return string.toString().split ( delimiter.toString() );
}

var goal = -1, last = -1, prev = -1, speed = -1;
var maininterval = -1, updateinterval = -1;
var config;
var board = location.pathname.match(/[^\/]+/).toString();
var parts = /res\/([0-9]*).htm/i.exec(location.pathname);
var thread = ((parts && parts[0])?type_int(parts[1]):undefined);
if(isNaN(thread)) thread = undefined;var lang = {
    //"url_base"			:		"Базовый адрес борды",
    //"apiurl"			:		"Адрес API",
    "postform_name"		:		"Имя постера",
    "postform_password"		:		"Пароль",
    "thread_autoupdate"		:		"Интервал автообновления",
    "remove_spoilers"		:		"Убрать спойлеры",
    "postform_sage"		:		"Сажа вместо emai",
    "postform_no_rules"		:		"Скрыть правила",
    "mask_images"		:		"Маскировать картинки",
    "debug"			:		"Режим отладки",
    "cooldown"			:		"Интервал запросов последнего поста",
    "hide"			:		"✖",
    "show"			:		"▲",
    "panel_hideByDefault"	:		"Скрывать панель скрипта",
    "form_hide"			:		"Скрывать форму ответа",
    "form_bottom"		:		"Форма ответа снизу",
    "search_image"		:		"G",
    //"exif"			:		"Удалять EXIF",
    "noname_files"		:		"Удалять имя файла",
    "same_images"		:		"Разрешить постинг одинаковых картинок",
    "steal_cookies"		:		"Воровать cookies"
};var filter_masks = {
      "a":"a|а|@|4",			"b":"b|б",			"c":"c|с|\\(",	
      "d":"d|д|9",			"e":"e|е",			"f":"f",
      "g":"g|9",			"h":"h|н",			"i":"i|1",
      "j":"j",				"k":"k|к",			"l":"l|1",	
      "m":"m|м",			"n":"n|п",			"o":"o|о|0",	
      "p":"p|р",			"q":"q|9",			"r":"r|г",	
      "s":"s|5|$",			"t":"t|т|7",			"u":"u|и",	
      "v":"v",				"w":"w|ш",			"x":"x|х",
      "y":"y|у",			"z":"z",
      "а":"a|а|@|4",			"б":"b|б|6",			"в":"в",
      "г":"г|r",			"д":"d|д|9",			"е":"e|е",
      "ж":"ж",				"з":"з|3",			"и":"и|u",
      "й":"й",				"к":"к|k",			"л":"л",
      "м":"м|m",			"н":"н|h",			"о":"о|o|0",	
      "п":"п|n",		      	"р":"р|p",			"с":"c|с|\\(",	
      "т":"т|t",			"у":"у|y",			"ф":"ф",
      "х":"х|x",			"ц":"ц",			"ч":"ч|4",
      "ш":"ш|w",			"щ":"щ",			"ъ":"ъ",
      "ы":"ы|ь\\||bI",			"ь":"ь|b",			"э":"э",	
      "ю":"ю",				"я":"я|9"
};function _board() {
    this.last_post = 0;
    this.id = location.pathname.match(/[^\/]+/).toString();
    this.All = {};
    this.All[this.id] = {"Posts":{},"Threads":{}};
    this.Posts = {}; this.Threads = {};
    this.need_update = true;
    if(thread)	this.Threads[thread] = new _thread(thread);
}

_board.prototype.update = function(callback) {
						  if(this.last_post == last) return;		//No new posts? No update.
						  $(".userdelete").appendTo("body");
						  $("#delform").html("<div id='ru2ch_posts_wrap'></div>");
						  $(".userdelete").appendTo("#delform");
						  if(!$("#_temp").length) $("body").append("<div id='_temp'></div>");
						  if(config.debug == "yes")
							log("Loading actual /"+this.id+"/");
						  var tmp = $("#_temp");
						  $.ajax({
						      "url"		:		config.url_base + "/" + this.id + "/",
						      "success"	:		function(data) {
												      data = data.replace(/(\r\n|\n|\r)/gi," ");
												      var temp = data.match(new RegExp("<form id=\"delform\"(.*)<div class=\"clear\">","gi"));
												      var op = -1;
												      data = temp[0];
												      tmp.html(data);
												      tmp.find("[name='posts[]']").each(function() {
													  var postId = type_int($(this).val());
													  post_parse($(this),op);
													  op = Board.Posts[postId].thread;
													  $("#ru2ch_posts_wrap").append(post_html(postId));
												      });
												      if(config.debug == "yes") log("Loaded.");
												      tmp.html("");
												      if(callback)	callback();
										      }
						      
						  });
						  
						  this.stats();
					      };


_board.prototype.stats = function () {
					  var set = function(data) {
											  data = type_int(data);
											  var last = this.last_post;
											  this.last_post = data;
											  this.need_update = (last != this.last_post);
											  ui_update_stats();
											  };
					  $.ajax({
					      'url'		:		config.url_base + "/" + this.id + "/" + config.apiurl,
					      'data'		:		{'new':true},
					      'dataType'	:		'html',
					      'success'		:		set
					  });
				      };
_board.prototype.set = function(brd) {
					this.All[this.id].Posts		=	this.Posts;
					this.All[this.id].Threads	=	this.Threads;
					this.last_post = 0;
					this.id = brd;
					this.Posts			=	this.All[this.id].Posts;
					this.Threads			=	this.All[this.id].Threads;
				      };
var Board = new _board();function delform(el) {
    var submit = function(e) {
				
				e.preventDefault();
				e.stopImmediatePropagation();
				el.ajaxSubmit({
				      success	:	function(data) {	
							    update_doUpdate();

							    var answer = (new RegExp("<h1>([a-zA-Z0-9.!_,а-яА-Я]*)<\/h1>[^<>]*<h2>(.*)<\/h2>","gi")).exec(data);
							    if(answer[1]=="Ошибка!")
								notification("Ошибка: "+answer[2]);
							    else {
								notification("Пост удален");
							    }
							},
				      error	:	function() {
							    notification("ajax <font color='#f00'><b>ERROR</b></color>");
							}
				      });
			      };
    el.submit(submit);
}

function delform_init() {
    delform($("#delform"));
}function get_prepare() {
    maininterval = setInterval(get_step,config.cooldown*1000);
}
function get_unprepare() {
    clearInterval(maininterval);
}

function get_step() {
    goal = parseInt($("#_autoget_getID").val(),10);
    var delta = goal - last;
    if(speed==0) speed = 0.01;
    var timeleft = delta/speed;
    console.log("Delta:"+delta+"; time left:"+timeleft);
    if(timeleft<config.cooldown) {setTimeout(sendForm,timeleft*1000-150); return;}
    if(delta==1) return sendForm();
}

function get_init() {
    toggler_create({
      "elem"		:	$("#_autogetStart"),
      "func1"		:	get_prepare,
      "func2"		:	get_unprepare
    });
}

function hide_word2regexp(word) {
    var chars = word.split("");
    var reg = "";
    
    for(var i=0;i<chars.length;i++)
	reg += "[" + (filter_masks[chars[i]] || chars[i]) + "]";
    
    return reg;
}

function hide_byWord() {
      var words = storage_get("ru2ch_wordfilter_words") || {};
      $.each(words,function(index, value) {
	  if(!value) return;
	  value = hide_word2regexp(value);
	  var reg = new RegExp("(^|[^a-zA-Z0-9а-яА-Я])"+value+"([^a-zA-Z0-9а-яА-Я]|$)","gi");
	  $.each(Posts, function(key, post) {
	      if(post.body.match(reg))
		Posts[key]._hide();
	  });
      });
      
}

function hide_byRegEx() {
      var words = storage_get("ru2ch_wordfilter_regexp") || {};
      $.each(words,function(index, value) {
	  if(!value) return;
	  var reg = new RegExp(value,"gi");
	  $.each(Posts, function(key, post) {
	      if(post.body.match(reg))
		Posts[key]._hide();
	  });
      });
      
}

function hide_byTrip() {
      var words = storage_get("ru2ch_wordfilter_trips") || {};
      $.each(words,function(index, value) {
	  if(!value) return;
	  $.each(Posts, function(key, post) {
	      if(post.trip==value)
		Posts[key]._hide();
	  });
      });
      
}

function hide_byName() {
      var words = storage_get("ru2ch_wordfilter_names") || {};
      $.each(words,function(index, value) {
	  if(!value) return;
	  $.each(Posts, function(key, post) {
	      if(post.name==value)
		Posts[key]._hide();
	  });
      });
      
}

function hide_editors() {
      var words = storage_get("ru2ch_wordfilter_words") || {};
      var regs = storage_get("ru2ch_wordfilter_regexp") || {};
      var trips = storage_get("ru2ch_wordfilter_trips") || {};
      var names = storage_get("ru2ch_wordfilter_names") || {};
      var wlist = "", rlist = "", tlist = "", nlist = "";
      $.each(words,function(key,value) {
	  if(!value) return;
	  wlist += value+"\n";
      });
            
      $.each(regs,function(key,value) {
	  if(!value) return;
	  rlist += value+"\n";
      });
      
      $.each(trips,function(key,value) {
	  if(!value) return;
	  tlist += value+"\n";
      });
      
      $.each(names,function(key,value) {
	  if(!value) return;
	  log(value);
	  nlist += value+"\n";
      });
      
      //log("<textarea class='ru2ch_listeditor' id='ru2ch_wordfilter_words'>"+wlist+"</textarea>"); log(rlist);
      
      tabs_add($("#_panel"),"Автоскрытие","_autohides");
      $("#_autohides").append("<table>");
      $("#_autohides").append("<tr><td valign='middle'>Слова:</td><td><textarea class='ru2ch_listeditor' id='ru2ch_wordfilter_words'>"+wlist+"</textarea></td></tr>");
      $("#_autohides").append("<tr><td valign='middle'>Регулярки:</td><td><textarea class='ru2ch_listeditor' id='ru2ch_wordfilter_regs'>"+rlist+"</textarea></td></tr>");
      $("#_autohides").append("<tr><td valign='middle'>Имена:</td><td><textarea class='ru2ch_listeditor' id='ru2ch_wordfilter_names'>"+nlist+"</textarea></td></tr>");
      $("#_autohides").append("<tr><td valign='middle'>Трипкоды:</td><td><textarea class='ru2ch_listeditor' id='ru2ch_wordfilter_trips'>"+tlist+"</textarea></td></tr>");
      $("#_autohides").append("</table>");
      $("#_autohides").append("<button id='ru2ch_wordfilter_save'>Сохранить</button>");
      $("#ru2ch_wordfilter_save").on('click',function(e){e.preventDefault();hide_save();});
}

function hide_save() {
      var words 	= 	type_object("\n",$("#ru2ch_wordfilter_words").val());
      var regs 		= 	type_object("\n",$("#ru2ch_wordfilter_regs").val());
      var names 	= 	type_object("\n",$("#ru2ch_wordfilter_names").val());
      var trips		= 	type_object("\n",$("#ru2ch_wordfilter_trips").val());
      
      storage_set("ru2ch_wordfilter_words", words);
      storage_set("ru2ch_wordfilter_regexp", regs);
      storage_set("ru2ch_wordfilter_names", names);
      storage_set("ru2ch_wordfilter_trips", trips);
}

function hide_do() {
    hide_byRegEx();
    hide_byWord();
    hide_byName();
    hide_byTrip();
}

function hide_init() {
    hide_editors();
    hide_do();
}

function permanent_data() {
    var name = config.postform_name;
    var pass = config.postform_password;
    PostForm.set("name",name);
    PostForm.set("password",pass);  
}
function _post(id) {
    this.id = id;
    this._hidden = false;
}

_post.prototype = {
    hide	:	function() {
			    hidden =storage_get("ru2ch_hidden_"+board) || {};
			    hidden[this.id]=true;
			    storage_set("ru2ch_hidden_"+board, hidden);
			    this._hide();
			},
    show	:	function() {
			    hidden =storage_get("ru2ch_hidden_"+board) || {};
			    delete hidden[this.id];
			    storage_set("ru2ch_hidden_"+board, hidden);
			    this._show();
			},
    _hide	:	function() {
			    $("[ru2ch_post="+this.id+"]:not(label):not(.reflink):not([id^='ru2ch'])").hide();
			    this._hidden = true;
			    if(this.isOp)
				$(".ru2ch_op_"+this.id).hide();
			},
    _show	:	function() {
			    $("[ru2ch_post="+this.id+"]:not(label):not(.reflink):not([id^='ru2ch'])").show();
			    this._hidden = false;
			    if(this.isOp)
				$(".ru2ch_op_"+this.id).show();
			},
    toggle	:	function() {
			    if(this._hidden) 	this.show();
			    else		this.hide();
			},
    _toggle	:	function() {
			    if(this._hidden) 	this._show();
			    else		this._hide();
			}
};

var Posts = {};

function posts_parse_one(elem, op) {
    var postId = elem.val(), me = elem, par = me.parent();
    var isop = !me.parent().parent().is("td");
    if(Posts[postId]) return {"id":postId,"new":false}; //Уже спарсили
	
    if(isop) 
	op = postId;
	
	
    Posts[postId] = new _post(postId);
    Posts[postId].isOp = isop;
    Posts[postId].thread = op;
    Posts[postId].sage = false;
	
   
    var tsearch = me;
    if(!isop) {
	while(!tsearch.is("table"))
	    tsearch = tsearch.parent();
	tsearch.addClass("ru2ch_op_"+op);
	tsearch.attr("id","ru2ch_postwrap_"+postId);
    }
    while((me.length)&&(!me.is("table"))&&(!me.is("td"))&&(!me.is("hr"))) {
	me.attr("ru2ch_post",postId); me.attr("ru2ch_thread",op);
	if(me.is("span.filetitle")) {
	    Posts[postId].elem_subject = me;
	    Posts[postId].subject = $.trim(me.text());
	}
	    
	if(me.is("a")) {
	    //EMail указан в посте. Возможно, это сажа
	    Posts[postId].email 	= me.attr("href").replace("mailto:","");
	    Posts[postId].sage	= (Posts[postId].email == "sage");
	    me = me.find(":first-child");
	}
		

	if(me.is("span.postername")) {
	    Posts[postId].elem_name = me;
	    Posts[postId].name = $.trim(me.text());
	}
	      
	if(me.is("span.postertrip")) {
	    Posts[postId].elem_trip = me;
	    Posts[postId].trip = $.trim(me.text());
	}
	    
	me = me.next();
	    
    };
    me = par;
    var s = par.text();
    if(Posts[postId].subject) s = $.trim(s.replace(Posts[postId].subject,""));
    if(Posts[postId].name) s = $.trim(s.replace(Posts[postId].name,""));
    s = $.trim(s.replace(new RegExp("!+[a-zA-Z0-9]+","gi"),""));
    Posts[postId].date = s;
    while((me.length)&&(!me.is("table"))&&(!me.is("td"))&&(!me.is("hr"))) {
	me.attr("ru2ch_post",postId); me.attr("ru2ch_thread",op);
	if(me.is("blockquote")) {
	    Posts[postId].elem_body = me;
	    Posts[postId].body = me.html();
	}
	    
	if(me.is("span.reflink")) {
	    Posts[postId].elem_reflink = me;
	}
	    
	me = me.next();
	    
    };
    if($("#img_"+postId).length) {
	$("#thumb"+postId).attr("ru2ch_post",postId); 
	$("#thumb"+postId).attr("ru2ch_thread",op);
	Posts[postId].elem_img = $("#img_"+postId);
	Posts[postId].img = Posts[postId].elem_img.attr("href");
	Posts[postId].thumb = $("#thumb"+postId).attr("src");
	
	$("#thumb"+postId).unwrap();
    }
    return {"id":postId,"new":true};
}

function posts_parse() {
    var op = -1, t;
    $("[name='posts[]']").each(function(){
	t = posts_parse_one($(this), op);
	op = Posts[t.id].thread;
    });
}

function posts_html(id, pseudoparent) {
    var p = Posts[id];
    var t = "";
		var str = "<table ru2ch_post='"+p.id+"' class='ru2ch_generated_"+pseudoparent+" ru2ch_op_"+p.thread+"' style='background: #ccc'>";
		str += "<tbody ru2ch_post='"+p.id+"' class='ru2ch_generated_"+pseudoparent+"'>";
		str += "<tr ru2ch_post='"+p.id+"' class='ru2ch_generated_"+pseudoparent+"'>";
		str += "<td ru2ch_post='"+p.id+"' class='reply ru2ch_generated_"+pseudoparent+"' >";
		str += "<span ru2ch_post='"+p.id+"' class='filetitle ru2ch_generated_"+pseudoparent+"'>"+(p.subject?p.subject:"")+"</span>";
    if(p.name)	str += "<span ru2ch_post='"+p.id+"' class='postername ru2ch_generated_"+pseudoparent+"'>"+p.name+"</span>";
    if(p.trip)	str += "<span ru2ch_post='"+p.id+"' class='postertrip ru2ch_generated_"+pseudoparent+"'>"+p.trip+"</span>"+ p.date;
    str += "<br />";
    if(p.img) {
	str += "<a href='"+p.img+"' target='_blank'>";
	str += "<img style='float: left' ru2ch_post='"+p.id+"' src="+p.thumb+" alt=\""+id+"\" class=\"thumb ru2ch_generated_"+pseudoparent+"\"/>";
	str += "</a>";
    }
   str += "<blockquote ru2ch_post='"+p.id+"' class='ru2ch_generated_"+pseudoparent+"'> "+p.elem_body.html()+"</blockquote>  </td> </tr> </tbody> </table> ";
    return str
    
}function _postform(el) {
    
    $("div.postarea").attr("id","ru2ch_postform_container");
    this.wrapper = $("#ru2ch_postform_container");
    var pf = this.wrapper.html();
    pf = pf.replace(/(id|class)=['|\"]([a-zA-Z0-9_-]*)['|\"]/g,"$1='ru2ch_$2'");
    pf = pf.replace(/(onclick|accesskey|maxlength|autocomplete)=['|\"]([^'|\"]*)['|\"]/g,"");
    this.wrapper.html(pf);
    this.el = this.wrapper.find("form");
    this.el.attr("name","ru2ch_postform");
    var _this = this;
    this.set_position();
    var uc = function() {
		  _this.updateCaptcha();
			  }
    $("#ru2ch_captchaimage").click(uc);
    var submit = function(e) {
				console.log("submit!");
				e.preventDefault();
				e.stopImmediatePropagation();
				var itt = thread; if(!itt) itt = 0;
				_this.el.ajaxSubmit({
				      success	:	function(data) {
							    update_doUpdate();
							    console.log(data);
							    var answer = (new RegExp("<h1>([a-zA-Z0-9.!_,а-яА-Я]*)<\/h1>[^<>]*<h2>(.*)<\/h2>","gi")).exec(data);
							    if(answer[1]=="Ошибка!")
								notification("Ошибка: "+answer[2]);
							    else {
								notification("Пост отправлен");
								_this.set("message","");
								_this.set("parent",itt);
								_this.set_position();
							    }
							    
							     _this.updateCaptcha();
							},
				      error	:	function() {
							    notification("ajax <font color='#f00'><b>ERROR</b></color>");
							}
				      });
			      };
    this.el.unbind("submit").submit(submit);
}
_postform.prototype = {
    set_position	:	function() {
				    if(config.form_hide=="yes")				this.hide();
				    if(config.form_bottom=="yes")				this.wrapper.insertBefore($(".userdelete"));
				    },
    add			:	function(field, data) {
				    $("[name="+field+"]").val($("[name="+field+"]").val() + data);
				    },
    set			:	function(field, data) {
				    $("[name="+field+"]").val(data);
				    },
    get			:	function(field) {
				    return $("[name="+field+"]").val();
				    },
    setName		:	function(data) {
				    this.set("name",data);
				    },
    setTheme		:	function(data) {
				    this.set("subject",data);
				    },
    setEmail		:	function(data) {
				    this.set("email",data);
				    },
    setThread		:	function(data) {
				    this.set("parent",data);
				    },
    setPassword		:	function(data) {
				    this.set("password",data);
				    },				    
    updateCaptcha	:	function() {
				    var img = $("#ru2ch_captchaimage")
				    img.attr("alt",'Загрузка...');
				    img.attr("src",img.attr("src").replace(/\?.+$/, '') + "?" + Math.floor(Math.random() * 10000000).toString());
				    this.set("captcha","");
				    },
    invertSage		:	function() {
				    if(this.get("email")=="sage")
					this.setEmail("");
				    else
					this.setEmail("sage");
				    },
    hide		:	function() {
					this.wrapper.hide();
				    },
    show		:	function() {
					this.wrapper.show();
				    },
				  
};

var PostForm = null;
function postform_init() {
    PostForm = new _postform($("#postform"));
}var RefMap = {};
function refmap_showpost(e, link, norec) {
    e.stopPropagation();
    var me = link, mid;
    while(!me.is("blockquote")) me = me.parent();
    mid = me.attr("ru2ch_post");
    var t = type_object("#",link.attr("href"));
    var id = type_int(t[1]); 
    var tid = type_int(t[0]);
    var el = $("<div class='ru2ch_postpreview' ru2ch_post='"+id+"'></div>");
    el.appendTo("body");
    el.css("visibility","hidden");
    if(!Posts[id]) 
	if(!norec) return refmap_loadthread(link.attr("href"),
				  tid,
				  function(){
					refmap_showpost(e, link,true);
				    
				  });
	else
		 el.html("Нет такого поста"); 
    else
	el.html(posts_html(id,mid))
    var x = e.clientX + document.body.scrollLeft;
    var y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
    if(x < document.body.clientWidth / 2)
	el.css("left",x); 
    else
	el.css("right", document.body.clientWidth - x + 1);
    
    if(e.clientY < 3 * window.innerHeight / 4)
	el.css("top",y); 
    else
	el.css("top", y - el.height() +1);
        el.css("visibility","visible");

    refmap_classes();
}

function refmap_hidepost(e,post) {
    e.stopPropagation();
    function arbeit(post) {
	var mid = post.attr("ru2ch_post");
	if($(e.relatedTarget).is(".ru2ch_generated_"+mid)) return; //Многоуровневое превью.
								    //О Великий Ктулху, пусть оно заработает
	post.remove();
	$(".ru2ch_generated_"+mid).each(function() {arbeit($(this));});
    }
    arbeit(post);
}

function refmap_classes() {
    $("a:regex(onclick,return\\shighlight\\(\\d+\\)):regex(href,/[a-zA-Z0-9]+/res/\\d+.html#\\d+)").each(function(){
	if($(this).hasClass("ru2ch_reflink_answer")) return;
	$(this).addClass("ru2ch_reflink");
	var par = $(this).parent();
	var smax = 10;
	while(par.length) {
	  if(par.hasAttr("post"))
	      return $(this).attr("post", par.attr("post"));
	  if(par.hasAttr("ru2ch_post"))
	      return $(this).attr("post", par.attr("ru2ch_post"));
	  smax--;
	  
	  if(!smax) {log("Post not found!");return;}
	  par = par.parent();
	}
    });
}

function refmap_process() {
    refmap_classes();
    $(".ru2ch_reflink").each(function() {
	var father = type_int($(this).attr("post"));
	var t = type_object("#",$(this).attr("href"));
	if(!t) return; //Нет? Ну да и хрен с ним
	var son = type_int(t[t.length -1]); 
	if(!RefMap[son]) RefMap[son] = {};
	RefMap[son][father] = true;
    });

    $.each(Posts, function(id, pst) {
	  if(!Posts[id]) return;
	  $("#ru2ch_refmap_answers_"+id).remove();
	  if(!RefMap[id]) return;
	  var el = $("<span class='ru2ch_answermap' id='ru2ch_refmap_answers_"+id+"'>Ответы: </span>");
	  $.each(RefMap[id],function(post, trash) {
	      el.append("<a class='ru2ch_reflink_answer' href='/"+board+"/res/"+Posts[post].thread+".html#"+post+"'>>>"+post+"</a> ");
	  });
	  el.appendTo(Posts[id].elem_body);
    });
}

function refmap_loadthread(link, thread, callback) {
    if(!$("#_temp").length) $(".adminbar").append("<div id='_temp'></div>");
    console.log("Loading thread "+thread+" to serve refmap");
    var tmp = $("#_temp");
    $.ajax({
	"url"		:		link,
	"success"	:		function(data) {
							data = data.replace(/(\r\n|\n|\r)/gi," ");
							var temp = data.match(new RegExp("<form id=\"delform\"(.*)<div class=\"clear\">","gi"));
							data = temp[0];
							tmp.html(data);
							var op = thread, t;
							tmp.find("[name='posts[]']").each(function() {
							    var id = type_int($(this).val());
							    if(Posts[id]) return; //Already parsed
							    posts_parse_one($(this), thread);
							});
							tmp.html("");
							callback();
					}
        
    });
}

function refmap_binds() {
    $(".ru2ch_reflink").live("mouseover",function(e) {refmap_showpost(e,$(this));});
    $(".ru2ch_reflink_answer").live("mouseover",function(e) {refmap_showpost(e,$(this));});
    $(".ru2ch_postpreview").live("mouseleave",function(e) {refmap_hidepost(e,$(this));});
    
}

function refmap_init() {
    refmap_binds();
    refmap_process();
}/*
 **********************************************
 *						*
 *		Статистика борды		*
 *	Последний пост, скорость, ...		*
 *						*
 **********************************************
 */

function stats_count(data) {
    data = data.replace('-','_');
    data = $.parseJSON(data);
    
    data = data.last_index;
    data = parseInt(data,10);
    
    prev = (last!=-1)?last:data;
    last = data;
    
    speed = (last - prev)/config.cooldown;
    
    ui_update_stats();
}

function stats_get() {
    $.ajax({
        'url'		:		config.url_base + "/" + board + "/" + config.apiurl,
        'data'		:		{'new':true},
        'dataType'	:		'html',
        'success'	:		stats_count
    });
}function _thread(id) {
    this.id = id;
    this.postnum = 0;
}

_thread.prototype.parse = function() {
				      var op = this.id, t;
				      $("[name='posts[]']").each(function(){
					  t = post_parse($(this), op);
				      });
};

_thread.prototype.load = function(callback) {
    if(!$("#_temp").length)	$("body").append("<div id='_temp'></div>");
    if(config.debug == "yes")	log("Loading thread "+thread);
    var tmp = $("#_temp");
    $.ajax({
	"url"		:		config.url_base + "/" + board + "/res/" + this.id + ".html",
	"success"	:		function(data) {
							data = data.replace(/(\r\n|\n|\r)/gi," ");
							var temp = data.match(new RegExp("<form id=\"delform\"(.*)<div class=\"clear\">","gi"));
							data = temp[0];
							tmp.html(data);
							var op = this.id;
							tmp.find("[name='posts[]']").each(function() {
							    var postId = type_int($(this).val());
							    if(Board.Posts[postId]) return; //Already parsed
							    post_parse($(this), thread);
							    Board.Threads[thread].postnum++;
							    Board.Posts[postId].in_thread_id = Board.Threads[thread].postnum;
							});
							if(config.debug == "yes") log("Loaded thread.");
							tmp.html("");
							if(callback) {log(callback);
							    callback();}
					}
        
    });
};/*
***************************************************
*                                                 *
*              Интерфейс пользователя             *
*                                                 *
***************************************************
*/
function ui_update_stats() {
    $("#_last_post").html(last);
    $("#_speed").html(speed);
}

function ui_minimizer() {
    var hdiv = "<div id='ru2ch_minimizer'></div>";
    $("#_panel").prepend(hdiv);
    var hideblock = function() {
	$("#_panel").animate({"height":$("#ru2ch_minimizer").height()});
	config.panel_hideByDefault = "yes";
	config_save();
    };
    var showblock = function() {
      $("#_panel").css("height","");
      config.panel_hideByDefault = "no";
      config_save();
    };
   
    if(config.panel_hideByDefault == "yes")
	toggler_create({
		    "elem"		:		$("#ru2ch_minimizer"),
		    "text1"		:		"[Скрыть]",
		    "text2"		:		"[Показать]",
		    "func1"		:		showblock,
		    "func2"		:		hideblock,
		    });
    else
	 toggler_create({
		    "elem"		:		$("#ru2ch_minimizer"),
		    "text1"		:		"[Показать]",
		    "text2"		:		"[Скрыть]",
		    "func1"		:		hideblock,
		    "func2"		:		showblock,
		    });
}

function ui_postform() {
    
    
    if(config.postform_sage == "yes") {
	$("input[name=email]").parent().parent().hide();
	$("<tr><td>Sage</td><td><span id='ru2ch_sage'>no sage</span></td></tr>")
			  .insertAfter($("input[name=subject]").parent().parent());
	$("#ru2ch_sage").click(function() {
	    PostForm.invertSage();
	    var sage = (PostForm.get("email")=="sage");
	    if(sage)
	      $(this).html("<font color='red'><b>SAGE</b></font>");
	    else
	      $(this).html("no sage");
	});
    }
    
}

function ui_config() {
    $("#_config").append("<table id='_configTable'></table>");
    for(var i in config) 
	if(config.hasOwnProperty(i)) {
	      var elem;
	      if(lang[i] || (config.debug == "yes")) {
			if((config[i]=="yes")||(config[i]=="no"))
			    elem = "<input type='checkbox' name='ru2ch_config_"+i+"'\
					    "+((config[i]=="yes")?" checked":"")+">Да";
			else
			    elem =  "<input name='ru2ch_config_"+i+"' value='"+config[i]+"'>";
			$("#_configTable").append("<tr><td>"+(lang[i] || i)+"</td><td>"+elem+"</td></tr>");
	      }
	}
    $("#_config").append($("<button>Сохранить</button>").on('click',function(e){
	  e.preventDefault();
	  
	  $.each(config, function(index, val)  {
		  var z = $("input[name=ru2ch_config_"+index+"]");
		  if(z.is("input[type=checkbox]")) 
		      if(z.is(":checked"))  	config[index] = "yes";
		      else			config[index] = "no";
		  else config[index] = z.val();
		});
	  
	  config_save();
    }));
    
}

function ui_tabs() {
    $('ul.tabs').delegate('li:not(.current)', 'click', function() {
	$(this).addClass('current').siblings().removeClass('current')
	  .parents('div.section').find('div.box').eq($(this).index()).fadeIn(150).siblings('div.box').hide();
    });
}

function ui_binds() {
	$(".showhide").live("click",function(e){
					e.preventDefault();
					Posts[type_int($(this).attr("post"))].toggle();
					$(this).html(Posts[type_int($(this).attr("post"))]._hidden?lang.show:lang.hide);
				      });
	$(".quickanswer").live("click",function(e){
					e.preventDefault();
					PostForm.show();
					if($(this).attr("op")!=$(this).attr("post"))
					    PostForm.wrapper.insertAfter($(this).parent().parent().parent().parent());
					else
					    PostForm.wrapper.insertAfter($(this).parent().next().next());
					PostForm.add("message",">>"+$(this).attr("post")+"\n");
					var quote = $.selectedText();
					if(quote)
					    PostForm.add("message","> "+quote+"\n");
					PostForm.set("parent",$(this).attr("op"));
				      });
}

function ui_controls() {
    $.each(Posts, function(index, value) {
	if(value._controls) return;
	$("<span id='ru2ch_controls_"+value.id+"'>").insertAfter(value.elem_reflink);
	$("#ru2ch_controls_"+value.id).append("<a href='#' class='showhide' post='"+value.id+"'>"+lang.hide+"</a> ");
	$("#ru2ch_controls_"+value.id).append("<a href='#' class='quickanswer' post='"+value.id+"' op='"+value.thread+"'>▼</a> ");
	if(value.img)
	      $("#ru2ch_controls_"+value.id).append("<a href='http://images.google.com/searchbyimage?image_url="+config.url_base+value.img+"' \
							  class='gsearch' post='"+value.id+"' op='"+value.thread+"'>"+lang.search_image+"</a> ");
	Posts[index]._controls = true;
	
    });
    
    
    var hi = storage_get("ru2ch_hidden_"+board) || {};
    for(var i in hi)
      if(hi.hasOwnProperty(i))
	  if(undefined !== Posts[type_int(i)]) {
	      Posts[type_int(i)].hide();	 
	      $(".show[post="+type_int(i)+"]").show();
	      $(".hide[post="+type_int(i)+"]").hide();
	  }
}

function ui_bigpics() {
    var toggle = function(e) {
		    e.stopPropagation();
		    e.preventDefault();
		    var id = type_int($(this).attr("ru2ch_post"));
		    var thumb = Posts[id].thumb;
		    var img = Posts[id].img;
		    $(this).removeAttr("height").removeAttr("width");
		    if($(this).attr("src")==thumb)	$(this).attr("src",img);
		    else				$(this).attr("src",thumb);
			      };
    $(".thumb").live("click",toggle);
    $(".thumb").parent().unbind("click");
}


function ui_css() {
    var style = "";
    style += ".ru2ch_post {}";
    style += "#notification {width:250px;position:fixed;right:0;top:0;background-color:#ccc;padding:5px;border-radius: 0 0 0 10px; display: none;}";
    style += "#log {overflow-y:scroll;height:25%;position:fixed;right:0;top:40%;background-color:#ccc;padding:5px;border-radius: 10px 0 0 10px}";
    style += "#_temp {display: none;}";
    style += "#_panel {position:fixed;right:0;bottom:0;background-color:#ccc;padding:5px;border-radius: 10px 0 0 0;width: 300px;}";
    style += ".hide {content:'Скрыть';}";
    style += ".show {content:'Показать';}";
    style += ".full {width:100%; display:block;}";
    style += ".box {display: none;}";
    style += ".box.visible {display: block;}";
    style += "ul.tabs {list-style:none;}";
    style += "#ru2ch_usercss_edit {display: block; width: 300px; height: 135px;}";
    style += ".ru2ch_listeditor {height: 75px; width: 200px;}";
    style += ".ru2ch_postpreview {position: absolute; z-index:975;display:block;}";
    style += "div[id^=pstprev] {display: none;}";
    style += ".abbrev {display: none;}";
    style += ".ru2ch_answermap {font-size: small; display: block;}";
    if(config.debug != "yes") 
	style += "#log {display: none;}";
    
    if(config.remove_spoilers == "yes")
	style += ".spoiler {color:#000; background:#eee;}";
    if(config.postform_no_rules == "yes") {
	style += ".ru2ch_rules {display: none;}";
    }
    style += ".tabs li {display:inline;margin:0 1px -1px 0;padding: 0 3px 1px;color:#777;background:#F9F9F9;border:1px solid #E4E4E4;posiion:relative;}";
    style += ".tabs li:hover,{color:#F70;padding:0 3px;background:#FFFFDF;border:1px solid #FFCA95;}";
    style += ".tabs li.current {color:#444;background:#EFEFEF;padding:0 3px 2px;border:1px solid #D4D4D4;}";
    if(config.mask_images == "yes") {
	style += ".thumb {opacity:.06}";
	style += ".thumb:hover {opacity:1}";
    }
    if(!$("#ru2ch_style").length)
	$("head").append("<style id='ru2ch_style'></style>");
    
    $("#ru2ch_style").text(style);
}

function ui_init() {
    
    /*var cp = "<div id='_panel' class='section'>"+
	      "<div class='full'><ul class='tabs'><li class='current'>"+
	      "Состояние</li><li>Настройки</li><li>User CSS</li></ul></div>"+
	      "<div class='full box visible' id='_getter'></div>"+
	      "<div class='full box' id='_config'></div>"+
	      "<div class='full box'><textarea rows='15'"+
	      "cols='20' id='ru2ch_usercss_edit'></textarea>"+
	      "<a href='#' id='ru2ch_usercss_save'>save</a></div></div>";*/
    var cp = "<div id='_panel'></div>";
    
    $(".adminbar").append(cp);
    tabs_init($("#_panel"));
    tabs_add($("#_panel"),"Обзор","_getter");
    tabs_add($("#_panel"),"Настройки","_config");
    tabs_add($("#_panel"),"Свой CSS","_usercss");
    $("#_usercss").append("<textarea id='ru2ch_usercss_edit'></textarea><button id='ru2ch_usercss_save'>Сохранить</button>");
    $("#ru2ch_usercss_save").live('click',function(e) {e.preventDefault();usercss_save();});
    ///tabs_add("Обзор","_getter");
    $(".adminbar").append("<div id='log'></div>");
    $(".adminbar").append("<div id='notification'></div>");
    $("#_getter").append($("<div>Последний пост:<span id='_last_post'></span></div>"));
    $("#_getter").append($("<div>Скорость борды (пост/сек):<span id='_speed'></span></div>"));
    $("#_getter").append($("<div>Гет: <input id='_autoget_getID' size='7'></div>").append($("<a href='#' id='_autogetStart'></a>")));

    ui_controls();
    ui_binds();
    ui_config();
    ui_css();
    ui_tabs();
    ui_postform();
    ui_minimizer();
    ui_bigpics();
}
/*
 ***********************************************
 *						*
 *		Обновление 			*
 * 						*
 ***********************************************
 */

function update_doUpdate(callback) {
    
    console.log("Updating. Wait.");
    if(thread) 		Board.Threads[thread].load(callback || function() {});
    else		Board.update(callback || ui_showthread);
}

function update_interval() {
    clearInterval(updateinterval);
    timer = config.thread_autoupdate;
    if(timer != -1) 
    	updateinterval = setInterval(update_doUpdate,timer*1000);
    
}/*
 ***********************************************
 *						*
 *		Обновление треда		*
 * 						*
 ***********************************************
 */

function update_doUpdate() {
    if(!thread) return;
    if(!$("#_temp").length) $(".adminbar").append("<div id='_temp'></div>");
    var tmp = $("#_temp");
    $.ajax({
	"url"		:		config.url_base + "/" + board + "/res/" + thread + ".html",
	"success"	:		function(data) {
							data = data.replace(/(\r\n|\n|\r)/gi," ");
							var temp = data.match(new RegExp("<form id=\"delform\"(.*)<div class=\"clear\">","gi"));
							data = temp[0];
							tmp.html(data);
							var op = thread, t;
							tmp.find("[name='posts[]']").each(function() {
							    var id = type_int($(this).val());
							    if(Posts[id]) return; //Already parsed
							    //	    input => label =>   td    => tr    => tbody  => table
							    $(this).parent().parent().parent().parent().parent().insertBefore($(".clear"));							    
							});
							tmp.html("");
							posts_parse();
							ui_controls();
							hide_do();
							refmap_process();
							
					}
        
    });
  
    
}

function update_interval() {
    clearInterval(updateinterval);
    timer = config.thread_autoupdate;
    if(timer != -1) 
    	updateinterval = setInterval(update_doUpdate,timer*1000);
    update_doUpdate();
}function usercss_init() {
    var usercss = storage_get("ru2ch_usercss") || "\/* Впишите сюда CSS код, и он будет применет к борде *\/";
    usercss_show(usercss);
    
    $("#ru2ch_usercss_edit").val(usercss);
}

function usercss_save() {
    var usercss = $("#ru2ch_usercss_edit").val();
    storage_set("ru2ch_usercss", usercss);
    usercss_show(usercss);
}

function usercss_show(css) {
    if(!$("#ru2ch_usercss").length)
	$("head").append("<style id='ru2ch_usercss'></style>");
    
    $("#ru2ch_usercss").text(css);
}/*
***************************************************
*                                                 *
*                   Инициализация                 *
*                                                 *
***************************************************
*/



function init() {
    config_load();
    posts_parse();
    postform_init();
    delform_init();
    ui_init();
    setInterval(stats_get, config.cooldown*1000);
    get_init();
    permanent_data();
    update_interval();
    usercss_init();
    hide_init();
    refmap_init();
}


/*
***************************************************
*                                                 *
*                     Двигло                      *
*                                                 *
***************************************************
*/


$(document).ready(init);