// ==UserScript==
// @name			Steamgifts Giveaway Improvement
// @version			2.4
// @namespace		http://indie-elitist.blogspot.ca/
// @description		Automates and streamlines commenting while entering giveaway.
// @match			http://www.steamgifts.com/*
// @include			http://www.steamgifts.com/*
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_deleteValue
// @grant			GM_listValues
// @grant			GM_getResourceText
// @grant			GM_getResourceURL
// @grant			GM_addStyle
// @downloadURL		http://userscripts.org/scripts/source/174828.user.js
// @updateURL		http://userscripts.org/scripts/source/174828.meta.js
// @require			https://raw.github.com/domchristie/to-markdown/master/src/to-markdown.js
// @resource		MarkdownDeepLib			https://raw.github.com/toptensoftware/markdowndeep/master/MarkdownDeepJS/MarkdownDeepLib.min.js
// @resource		mdd_styles				https://raw.github.com/toptensoftware/markdowndeep/master/MarkdownDeepJS/mdd_styles.css
// @resource		mdd_ajax_loader			https://raw.github.com/toptensoftware/markdowndeep/master/MarkdownDeepJS/mdd_ajax_loader.gif
// @resource		mdd_gripper				https://raw.github.com/toptensoftware/markdowndeep/master/MarkdownDeepJS/mdd_gripper.png
// @resource		mdd_modal_background	https://raw.github.com/toptensoftware/markdowndeep/master/MarkdownDeepJS/mdd_modal_background.png
// @resource		mdd_toolbar				https://raw.github.com/toptensoftware/markdowndeep/master/MarkdownDeepJS/mdd_toolbar.png
// ==/UserScript==

// ------- SETUP -------
var ga_id = window.location.pathname.split('/')[2];
var spam_char = '\uFEFF\uFEFF\uFEFF';
var account = $('#navigation>ol>li:nth-of-type(3) li:nth-of-type(1)>a').attr('href').split('/')[2];

var gifter, gift;
// ------- LOAD -------
var GM_garbage_collection = GM_getValue('garbage_collection', false);
var GM_filter, GM_filterauto, GM_filterauthorwl, GM_filterpunctuation, GM_filterspam, GM_filtergeneric;

var GM_movecomment, GM_markasspam, GM_whitelistauthor, GM_giveawayonoff;

var GM_endreload, GM_endclose;

var GM_markdown_tools, GM_markdown_tools_forum, GM_removehtml; 

var default_text = { defaultcomment: 'Thanks!', filterauthorwl: account, filterpunctuation: '[^a-z\\s]', filterspam: '', filtergeneric: 'interresting,appreciation,interesting,appreciated,haveniceday,opportunity,appreciate,collection,generosity,hvalapuno,gratitude,excellent,forskyrim,wonderful,everyone,thankies,offering,verymuch,terrific,giveaway,generous,gracias,thankee,monsieur,sincere,awesome,forthis,amazing,winning,sharing,friend,cheers,lovely,thnaks,indeed,grazie,awsome,forthe,chance,bundle,schoen,dzieki,somuch,thanks,giving,sweet,buddy,merci,salut,tacos,hanks,merci,koszi,kudos,thank,great,thanx,danke,thnks,dziki,heaps,bunch,merci,tanks,looks,madam,again,hope,away,much,gift,game,thnx,many,dude,cool,luck,love,mate,nice,kind,kszi,good,your,very,this,bien,woot,tyvm,alot,schn,epic,caco,tnud,thx,one,win,ton,lot,man,why,yay,sir,big,bro,big,wow,tnx,and,you,bud,yes,the,tks,ta,it,of,oh,ga,or,ya,to,so,tx,xd,ty'};

function load(){
	GM_ga_enter				= GM_getValue(ga_id, false);
	GM_commentonoff			= GM_getValue('commentonoff', true);
	GM_personalized			= GM_getValue('personalized', false);
	GM_defaultcomment		= GM_getValue('defaultcomment', default_text.defaultcomment);
	GM_signature			= GM_getValue('signature', false);

	GM_filter				= GM_getValue('filter', true);
	GM_filterauto			= GM_getValue('filterauto', true);
	GM_filterauthorwl		= GM_getValue('filterauthorwl', default_text.filterauthorwl).split(',').filter(function(cur){return(cur !== '');}); // authors to skip over
	GM_filterpunctuation	= new RegExp(GM_getValue('filterpunctuation', default_text.filterpunctuation), 'g'); 
	GM_filterspam			= GM_getValue('filterspam', default_text.filterspam).split(',').filter(function(cur){return(cur !== '');}); // whole messages to skip
	GM_filtergeneric		= GM_getValue('filtergeneric', default_text.filtergeneric).split(','); // Generic message content
	if(gifter){ GM_filtergeneric.push(gifter); GM_filtergeneric.push(gift); GM_filtergeneric.sort(function(a,b){return(b.length-a.length);}); } // Add in the gifter's name.
	GM_filtergeneric		= new RegExp('(?:' + GM_filtergeneric.join(')|(?:') + ')', 'g');  // create regexp

	GM_movecomment			= GM_getValue('movecomment', true);
	GM_markasspam			= GM_getValue('markasspam', true);
	GM_whitelistauthor		= GM_getValue('whitelistauthor', true);

	GM_giveawayonoff		= GM_getValue('giveawayonoff', true);

	GM_endreload			= GM_getValue('endreload', true);
	GM_endclose				= GM_getValue('endclose', false);
}
function load_commentbox(){
	GM_markdown_tools		= GM_getValue('markdown_tools', true);
	GM_markdown_tools_forum	= GM_getValue('markdown_tools_forum', true);
	GM_removehtml			= GM_getValue('removehtml', true);
}
function load_giveaway(){
	gifter = filter_punctuation($('.hosted_by a').text().toLowerCase());
	gift = window.location.pathname.split('/')[3].split('-');
	for(var i=0; gift.length > i; i++){
		gift[i] = filter_punctuation(gift[i]);
	}
}

// ------- HELPER -------
 String.prototype.contains = function(it) { return(this.indexOf(it) !== -1); };
 String.prototype.empty = function() { return(this === ''); };
function event_default(ev){ // Prevent link "#" from being annoying
	if(ev.preventDefault){ ev.preventDefault(); }
	else if(ev.stop){ ev.stop(); }
}
function post_form(button, comment, type, success){ // type[1=>"enter", 0=>"exit"]
	var data = { form_key: button.parent().find("input[name='form_key']").val(), enter_giveaway: type };
	
	if(comment){
		$.extend(data, { body: comment, parent_id: '0', submit_comment: 'Submit Comment' });
	}
	
	return($.post(window.location.href, data, success, 'html').fail(function(){ post_form(button, null, type, success); })); // Set a recursive fail, but with no comment
}
function get_expiry_date(){ // Get the expiry date for this giveaway
	var matchs = $('.time_remaining>strong').html().match(/(\d*) (second|minute|hour|day|week|month)s?/); // Parse expiry date to get amount and unit
	var expiry = 1;
	
	switch(matchs[2]){
		case('week'): expiry *= 7;
		case('day'): expiry *= 24;
		case('hour'): expiry *= 60;
		case('minute'): expiry *= 60;
		case('second'): expiry *= 1000;
		break;
	}
	expiry *= (parseInt(matchs[1]) + 1); // Units *= Amount. Round up, unless month (max is 1 month)
	
	var date = new Date();
	date.setTime(date.getTime() + expiry);
	return(date.getTime());
}
// - ENTER_GIVEAWAY -
function enter(button){ // Enter giveaway
	/*function expand_tags(comment){ //TODO: if/endif
		//user, gift, copies, open for, price, entries
		var tags = { u: $('.hosted_by span').html(), g: $('.title').html(), c: null, o: null, p: null, e: null };
		var matchs = $('.time_remaining>strong').html().match(/(\d*) (second|minute|hour|day|week|month)s?/);
	}*/
	function getComment(){
		var comment = null; 
		
		if((!GM_ga_enter) && GM_commentonoff){ // If not a reenter and script is set to comment
			if(!(comment = $('#body').val())){ // Use comment box, else user set default, else hardcoded default
				if(GM_personalized || (GM_defaultcomment === null) || (GM_defaultcomment === 'null') || GM_defaultcomment.empty()){ // If comment is not personalized (or the default comment is blank), don't submit it.
					return(null);
				}
				comment = GM_defaultcomment;
				comment += spam_char;// Add in spam character sequence
			}else if(GM_personalized && GM_signature && (comment !== GM_defaultcomment)){ // If sig then comment box contains value. And if personalized as well then submit if message is not default.
				return(comment);
			}
		}
		
		if(GM_signature){ // Prevent auto comment when sig option is on
			return(null);
		}
		
		return(comment);
	}
	function enter_done(data){ // Submitting Success: replace page with result
		$('body').html(data);
		GM_setValue(ga_id, get_expiry_date());
		
		if(!$('.remove_entry').length){ // If we did not enter
			button = $('.submit_entry');
			if(button.length){
				post_form(button, null, 1);
			}
		}
		
		if(GM_endreload){ window.location.reload(); } // End behavior: reload, close, or either.
		else if(GM_endclose){ window.open("","_self").close(); }
		else{ main(); }
	}	
	
	return(function (ev){
		event_default(ev);
		
		var posting = post_form(button, getComment(), 1, enter_done);
		
		button.html('Processing...'); // Change button
		button.unbind('click');
		
		return(false);
	});
}
// - EXIT_GIVEAWAY -
function exit(button){ // Leave giveaway
	function exit_done(data){ // Submitting Success: replace page with result and save that you just exited a giveaway (so we do not later re-comment)
		$('body').html(data);
		button = $('.remove_entry');
		if(button.length){ // If we did not exit
			post_form(button, null, 0);
		}
		if(GM_endreload){ window.location.reload(); } // End behavior: reload, close, or either.
		else if(GM_endclose){ window.open("","_self").close(); }
		else{ main(); }
	}

	return(function(ev){
		event_default(ev);
		
		var posting = post_form(button, null, 0, exit_done);
		
		button.find('.checkmark').html('Processing...');
		button.unbind('click');
		return(false);
	});
}

// ------- FILTER -------
function filter_static(text){ // The non customizable filter.
	text = text.replace(/(?:\s|^)([a-z])\1*(?:$|\s)/g, ''); // Romove single letter
	text = text.replace(/\s/g, ''); // Romove whitespace
	return(text);
}
function filter_punctuation(text){
	text = text.toLowerCase().replace(GM_filterpunctuation, ''); // Romove punctuation, make lowercase
	text = filter_static(text);
	return(text);
}
function filter_generic(text){
	var text_new = text.replace(GM_filtergeneric, '');
	if(text_new !== text){
		text_new = filter_generic(text_new);
	}
	return(text_new);
}
function filter(){ // Filter out spam thanks 
	var spam_authors = [];
	var spam_flag;
	
	function list_as_spam(author, comment){
		author.each(function(){spam_authors.push(this.innerHTML);}); // Add all nested authors
		
		comment.css('display', 'none').css('background-color', 'rgb(211, 211, 211)').addClass('spam');
	}

	$("div.parent_container").each(function(){
		var jq_this = $(this);
		var author = jq_this.find('.author_name>a');
		
		for(var i=0; author.length > i; i++){ // check whole nested comment tree
			if($.inArray(author[i].innerHTML.toLowerCase(), GM_filterauthorwl) !== -1){ // Skip white listed authors
				return;
			}
		}

		spam_flag = true; // only list a nested list of comments as spam, if every single one of them is spam
		jq_this.find('.comment_body.markdown').each(function(index, node){
			var text = $(node).text();

			if(GM_filterauto && text.contains(spam_char)){ // remove auto spam messages
				return;
			}else if($(node).find('a').length){ // If not auto comment, links are always NOT spam
				return(spam_flag = false); // not spam
			}
			
			text = filter_punctuation(text);
			
			if($.inArray(text, GM_filterspam) !== -1){ // List as spam if message is exacly one of the list of spam messages if just filled with empty platitudes
				return;
			}
			text = filter_generic(text);
			if(text.replace(/([a-z])\1*/, '') === ''){
				return;
			}
			
			return(spam_flag = false); // Not spam
		});

		if(spam_flag){
			list_as_spam(author, jq_this);
		}
	});
	
	// create list
	function make_list(){
		var text = '';
		for(var i=0; spam_authors.length > i; i++){
			if(i > 0){ text += ', '; }
			text += '<a href="/user/' + spam_authors[i] + '" style="color: rgb(79, 86, 90);">' + spam_authors[i] + '</a>';
		}
		return(text);
	}
	$('.comment_container:first').prepend('<p class="parent_container" style="padding: 1em;">This giveaway has received <b>' + spam_authors.length + '</b> thanks, from: ' + make_list() + ' &nbsp;<span onClick="$(\'.spam\').css(\'display\', \'\')" style="font-size: 10px; text-decoration: none; margin-left: 1em; color: rgb(127, 134, 138); cursor: pointer;">show all</span></p>');
}

// ------- GIVEAWAY -------
function page_giveaway(){
	function giveaway_gui(){
		if(GM_movecomment){ // Move comment box up
			$('#comment_form').prependTo('.wrapper>.content');
			$('#comment_form span.cancel a').bind('click', function(){$('#comment_form').prependTo('.wrapper>.content');}); // Put back into right position after replying.
		}
		
		if(GM_markasspam){
			$('div.author_name').append('<div class="markasspam" style="float:right"><a href="#">Spam</a></div>');
			$('div.border_container div.comment_reply').append(' &nbsp; &nbsp;<a class="markasspam" href="#">Spam</a>');
			$('.markasspam').bind('click', function(ev){
				event_default(ev);
				var text = $(this).parent().parent().find('.comment_body.markdown').text()
				text = filter_punctuation(text);
				if($.inArray(text, GM_filterspam) === -1){
					GM_filterspam.push(text);
					GM_setValue('filterspam', GM_filterspam.join(','));
				}
			});
		}
		if(GM_whitelistauthor){
			var toggle = { true : '+', false : '-', '+' : '-', '-' : '+' };
			$('div.author_name>a').each(function(index, node){
				var author = $(node);
				author.after(' <a class="whitelistauthor" style="cursor:pointer">' + toggle[($.inArray(author.text(), GM_filterauthorwl) === -1)] + '</a>')
			});
			$('div.border_container .author_name>a').each(function(index, node){
				var author = $(node);
				author.before('<a class="whitelistauthor" style="cursor:pointer">' + toggle[($.inArray(author.text().toLowerCase(), GM_filterauthorwl) === -1)] + '</a> ')
			});
			$('.whitelistauthor').bind('click', function(ev){
				event_default(ev);
				var jq_this = $(this);
				var sym = jq_this.text();
				var author = jq_this.parent().find('>a:not(.whitelistauthor)').text().toLowerCase();
				var wl = ($.inArray(author, GM_filterauthorwl) === -1);
				
				jq_this.html(toggle[sym]);
				if((sym === '+') && wl){
					GM_filterauthorwl.push(author);
				}else if((sym === '-') && (!wl)){
					GM_filterauthorwl.splice(GM_filterauthorwl.indexOf(author), 1);
				}else{ return; } // If the symbol does not match the reality, just exit.
				
				GM_setValue('filterauthorwl', GM_filterauthorwl.join(','));
			});
		}
	}

	var click_handler;
	var button = $('.submit_entry');
	
	if(GM_filter){ // Filter comments
		filter();
	}
	
	giveaway_gui();
	
	$('#comment_form>form').submit(function(ev){ GM_setValue(ga_id, get_expiry_date()); }); // Record commenting
	
	if(GM_signature){ // Insert comment into comment box
		$('#body').val(GM_defaultcomment);
	}
	
	if(GM_giveawayonoff){ // Turn off all modified form submittal, prevent all auto comments as well.
		if(button.length){ // Unentered Giveaway
			click_handler = enter(button);
		}else if($('.remove_entry').length){ // Entered Giveaway
			button = $('.remove_entry');
			click_handler = exit(button);
		}else{ return; } // Not enterable or exitable
		
		button.attr('href', '#');
		button.unbind('click').bind('click', click_handler);
	}
}

// ------- MARKDOWN -------
function escapeRegExp(str){
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function insert_markdown_tools(){
	var cssTxt = GM_getResourceText("mdd_styles");
    cssTxt = cssTxt.replace(/url\(.?mdd_ajax_loader\.gif.?\);/g,        'url(' + GM_getResourceURL('mdd_ajax_loader') + ');');
    cssTxt = cssTxt.replace(/url\(.?mdd_gripper\.png.?\);/g,            'url(' + GM_getResourceURL('mdd_gripper') + ');');
    cssTxt = cssTxt.replace(/url\(.?mdd_modal_background\.png.?\);/g,   'url(' + GM_getResourceURL('mdd_modal_background') + ');');
    cssTxt = cssTxt.replace(/url\(.?mdd_toolbar\.png.?\);/g,            'url(' + GM_getResourceURL('mdd_toolbar') + ');');
    GM_addStyle(cssTxt);
    
	var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.innerHTML = GM_getResourceText('MarkdownDeepLib');
    $('head').append(scriptTag);

    $('textarea#body').addClass('mdd_editor').MarkdownDeep({ help_location: 'http://www.steamgifts.com/forum/b7gwc/formatting-help-faq', disableTabHandling:true });
    $('.mdd_preview').addClass('comment_body markdown comment_container');
    $('#mdd_img').css('display', 'none');
    $('#mdd_indent').css('display', 'none');
    $('#mdd_outdent').css('display', 'none');
    
	//Add Preview toggle, html2markdown, and html removal buttoms
    $('.mdd_toolbar ul').append('<li><span class="mdd_sep"></span></li><li><span class="mdd_sep"></span></li><li><a href="#" class="mdd_button" id="mdd_preview" title="Toggle Preview" tabindex="-1"></a></li><li><a href="#" class="mdd_button" id="mdd_html2markdown" title="HTML to Markdown" tabindex="-1"></a></li><li><a href="#" class="mdd_button" id="mdd_html" title="Remove HTML" tabindex="-1"></a></li>');
	GM_addStyle('#mdd_preview{\
width: 25px;\
background-position: 2px 2px;\
background-repeat: no-repeat;\
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADLUlEQVR4nGJkgAJ7B8d4Hx/fAgVFRQMGBgaGB/fvX9iyZfOEgwf2L2TAAwAAAAD//2JgYGBgSMvInH/o8JH/X758+Q8DX758+X/o8JH/aRmZ8/HpBQAAAP//YrGytokPDQlNMDcz/Xvq1Kkn7969+/Hr168fnJycjM7Ozpq/fv1OuHL58oFjR49gdQkAAAD//2JycHAo0NRUZzh69OhDHh4eFisrKzFDQ0OBf//+/dy2bds5bW1NBgcHhwJcLgAAAAD//2ISFRUzYGBgYPj69etnYWFhJhYWFpa/f/8ysrNzMN67f//N58+fv8DUYAMAAAAA//9i+fHzJ8PnT58Z/vz5++3Ro8cf2NjYvn36/On769evvzMxMf1kYGDk+fHzJ84wAAAAAP//Ynn44P6Fl69eGfz+/Zvl4aNHrxkZGVm+f//+69vXb5+FhYR5X7x4wfDwwf0LuAwAAAAA//9iOnrkyIRz584zCImI6P/69Yvx/bt3L75///6Kh5ebXV5Bwe7M2bMMSsoqCnJycvrYDAAAAAD//2JkYGBgcPfwnG9v75CgrqHOwMvDw/Djx4/Pf/785b1x4waDqKgIg72W8curk7f8fffo2V+Da/+9jd9PvwwzAAAAAP//YoQxNDQ14/X09AuERUQNGBgYGN6+eX1BUlJKwcHI4v+v9Rf/KkjJirDyczGcOHLsjdllRicTqCEAAAAA//9iZMADREXF9JPUnPZJ/+IUspfVZZD1NGF49v09w4HV295aXGZ0NPkw4zIAAAD//2LCZ8Dr168u8n/8//3d27cMd05dZnh+4BKDNJ8Ig12Ip/BRrT/7zwhk6AIAAAD//8JrAAMDA4P7EyGPf9xs7y5zfGC4cfAMw7Pd5xlk+UQZbPxchY8r/tgKAAAA//8iaIDxh+lX/B6L2v/mYHx3if091JBzDPJ8YgziijKyAAAAAP//whsGyOCEQJrROqkXe5h+/hM0FVNhELBUY3h37t4HAAAAAP//YmRgYGBkYGBgZmRkZGJgYOBghAAeRkZGDgYGBjYmJiY+qBqW2Tz+KidFP3b/E+IU4f7B+M39uUguAAAA//8DADQzI7/SovQmAAAAAElFTkSuQmCC);\
}\
#mdd_html2markdown{\
width: 25px;\
background-position: 0px 3px;\
background-repeat: no-repeat;\
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsSAAALEgHS3X78AAABNklEQVQ4jaXTvUpdQRQF4O/qERWCYGenglaCREWwsPEZbGxiZZM8QiKmS6lg4R9YWYkPoKWdguAbGBQskloMuei918I9urlaxLhgmLN/1jprZtiwiwZa71wN7NYi+IpT9KOZFnSilkgirlJ8gxn8qCJxguMgl6Z/ReG0oCOSRfgA55hNhCX8xHLKfcQlviUDVRZspsYJbKEbU1jDMEaSYB8GMZpy99lZQSv2MexgCB/aanCXRQK17LCgB7dYxyLGsdrW8wWf43sSKxhA/TXBRrj+jjNsY+8Vh5+idwLT+IUuXh65FoW/mMfvcJGx4fHON3GIhch3ZsHi9Nzj61W4Dld1XOEienrDeYUj/Elmno4yl//yRhTOHFrF4UzsZVLaX69MRTPlOjzf603SsB+Fpv+f48LdfwA3jWf06X/diQAAAABJRU5ErkJggg==);\
}\
#mdd_html{\
width: 25px;\
background-position: 3px 1px;\
background-repeat: no-repeat;\
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAA2ElEQVQ4jeXOsS7DYRjF4SfaSIilRiysNkaDEbv0EgwSYesFdHEFElNjkbgEEkujQ1MXUa5ASSQMWE4a+dL+xWRwkm94f+ec7335FzrHYJo5M4Wtf5u30AublB+rhgMMcRG2iA/shw2TqZXlXdzjE31sh++FrYT1Mw/SAd3AO+wUH7fxMGFZL50uPOcdY64I3+KyYPM4wUt6FtDCE0Y4RQOzeMVhio14o2Rb6Y61jDO8o4PNnLkRv4O3ZJZUaA1NHOXMengTq1XFUle4+SlUr/Cu8fibjX+jL4v8L1nEh26RAAAAAElFTkSuQmCC);\
}');
    
	function get_selection_nocursor(comment_box){
		var text = comment_box.val();
		if(comment_box.attr('selectionStart') != comment_box.attr('selectionEnd')){
			return(new Array(text.substring(0, comment_box.attr('selectionStart')),
				text.substring(comment_box.attr('selectionStart'), comment_box.attr('selectionEnd')),
				text.substring(comment_box.attr('selectionEnd'))));
		}
		return(new Array('', text, ''));
	}
	var comment_box = $('#body');
	
    $('#mdd_preview').bind('click', function(ev){event_default(ev);
		$('.mdd_preview').toggle();
	});
	$('#mdd_html2markdown').bind('click', function(ev){event_default(ev);
		var text = get_selection_nocursor(comment_box);
		
		text[1] = toMarkdown(text[1]);
		
		if(GM_removehtml){ text[1] = $('<p>' + text[1] + '</p>').text(); }
		comment_box.val(text[0]+text[1]+text[2]);
	});
	
	$('#mdd_html').bind('click', function(ev){event_default(ev);
		var text = get_selection_nocursor(comment_box);
		comment_box.val(text[0] + $('<p>' + text[1] + '</p>').text() + text[2]);
	});
}

// ------- GARBAGE COLLECTION -------
function garbage_collection(cur_date){ // Delete all giveaways that have expired
	var storage = GM_listValues();
	var temp_data;
	for(var i = 0; storage.length > i; i++){
		if(storage[i].length === 5){
			temp_data = GM_getValue(storage[i], 0);
			if((typeof temp_data === 'string') && (cur_date < temp_data)){
				GM_deleteValue(storage[i]);
			}
		}
	}
}

// ------- MAIN -------
function main(){
	insert_options_link();
	load_commentbox();
	if(window.location.pathname === '/giveaway/improvement'){ // Options page
		load();
		load_commentbox();
		page_options();
	}else if(window.location.pathname.split('/')[1] === 'giveaway'){ // Giveaway
		load_commentbox();
		load_giveaway();
		load();
		
		if(GM_markdown_tools){ insert_markdown_tools(); }
		page_giveaway();
	}else if(GM_markdown_tools_forum && $('#body').length){
		load_commentbox();
		insert_markdown_tools();
	}
}

// ------- RUN -------
main();

var cur_date = (new Date()).getTime();
if(GM_garbage_collection < (cur_date - 86400000)){ // Run garbage collection once every day
	GM_setValue('garbage_collection', cur_date);
	garbage_collection(cur_date);
}
//buttons for links/ect around comment box  https://github.com/toptensoftware/markdowndeep
//a mark to denote, already commented
//A first time/updated page
//suggest that you default the puncuation

//button to check if you own game
//Keep points up to date on all pages, check every X, if not changed over period look yourself.
//know when the list page is open, for end bahavior

//new Replys
//different end behaviour for attempted, but not enough points giveaway.

// ------- OPTIONS -------
function insert_options_link(){
	$('#navigation>ol>li:nth-child(3) .absolute-dropdown>ul').append('<li><a href="/giveaway/improvement">GA Improvement</a></li>'); // Insert option
}
function page_options(){
	var body = $('.wrapper');
	body.html('<style type="text/css">\
fieldset.create_giveaway>div.input { margin-right: 73px; width: 822px; }\
.content .notification a.sale { text-align:center; color:#4F565A; }\
</style>\
<div class="content"><div class="notification">\
<h2 align="center">Steamgifts Giveaway Improvement Script</h2>\
<div style="text-align:center;"><i>By: <a href="http://www.steamgifts.com/user/wisnoskij">Wisnoskij</a> (Version ' + GM_info.script.version + ')</i></div><br>\
<br>\
<div class="footer_sales">\
<a href="#comment" name="comment" onClick="tab(this.name);return(false);" class="sale" style="width:135px; float:left;border-radius:8px 0 0 8px;"><h1>Comment</h1></a>\
<a href="#filter" name="filter" onClick="tab(this.name);return(false);" class="sale" style="width:130px; float:left;"><h1>Filter</h1></a>\
<a href="#about" name="about" onClick="tab(this.name);return(false);" class="sale" style="width:130px; float:left; background-color: rgb(187, 187, 187);"><h1>About</h1></a>\
<a href="#gui" name="gui" onClick="tab(this.name);return(false);" class="sale" style="width:80px; float:left;"><h1>Gui</h1></a>\
<a href="#giveaway" name="giveaway" onClick="tab(this.name);return(false);" class="sale" style="width:130px; float:left;"><h1>Giveaway</h1></a>\
<a href="#finish" name="finish" onClick="tab(this.name);return(false);" class="sale" style="width:170px; float:left;border-radius:0 8px 8px 0;"><h1>End Behavior</h1></a>\
</div>\
<div class="clear_both"></div><div class="divider"></div><br>\
\
<fieldset id="comment" class="create_giveaway" hidden>\
<div class="input"><label style="display: inline; margin-right: 50px;">On/Off:</label>  <span class="option"  id="commentnoff" style="cursor:pointer;font-size: 3em;color: green;font-weight:bold;">✓</span>\
<div class="clear_both"></div><div class="date_description">Turns all script commenting behavior off. It will not auto comment, insert anything into the comment box, or do anything else comment related.<br><strong>Default: ON</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label style="display: inline; margin-right: 50px;">Only if Personalized:</label>  <span class="option"  id="personalized" style="cursor:pointer;font-size: 3em;color: gray;font-weight:bold;">✖</span>\
<div class="clear_both"></div><div class="date_description">Only auto comment if the comment is personalized (read: you wrote something for this specific giveaway). Combine this with the <i>Signature</i> option to only auto comment when the signature has been modified/added to.<br><strong>Default: OFF</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label style="display: inline; margin-right: 50px;">Signature:</label>  <span class="option"  id="signature" style="cursor:pointer;font-size: 3em;color: gray;font-weight:bold;">✖</span>\
<div class="clear_both"></div><div class="date_description">Only insert the auto comment into the comment form, do not submit. Combine this with the <i>Personalize</i> option to only auto comment when the signature has been modified/added to.<br><strong>Default: OFF</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label for="body">Default Comment:<span class="resetdefault" style="cursor:pointer;float:right;font-size:1em;color: red;font-weight:bold;" title="Reset to Default">✖</span></label><textarea class="textoption" style="width:811px;" id="defaultcomment">'+default_text.defaultcomment+'</textarea>\
<div class="date_description">The default auto comment. &nbsp; <strong>Default: "Thanks!"</strong></div></div>\
</fieldset>\
\
<fieldset id="filter" class="create_giveaway" hidden>\
<div class="input"><label style="display: inline; margin-right: 50px;">Filter On/Off:</label>  <span class="option"  id="filter" style="cursor:pointer;font-size: 3em;color: green;font-weight:bold;">✓</span>\
<div class="clear_both"></div><div class="date_description">Turn on or off giveaway comment "thanks" spam filtering. Nested comment trees are only filtered if every single comment in the tree is considered spam.<br><strong>Default: ON</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label style="display: inline; margin-right: 50px;">Filter Auto Comments:</label>  <span class="option"  id="filterauto" style="cursor:pointer;font-size: 3em;color: green;font-weight:bold;">✓</span>\
<div class="clear_both"></div><div class="date_description">Filter out all auto comments made by this script, no matter how long and complex they are.<br><strong>Default: ON</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label for="body">Author Whitelist:<span class="resetdefault" style="cursor:pointer;float:right;font-size:1em;color: red;font-weight:bold;" title="Reset to Default">✖</span></label><textarea class="textoption" style="width:811px;" id="filterauthorwl">'+default_text.filterauthorwl+'</textarea>\
<div class="date_description">List of authors whose comments you always want to show. Comma separated, no spaces. &nbsp; <strong>Default: "'+default_text.filterauthorwl+'"</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label for="body">Punctuation:<span class="resetdefault" style="cursor:pointer;float:right;font-size:1em;color: red;font-weight:bold;" title="Reset to Default">✖</span></label><textarea class="textoption" style="width:811px;" id="filterpunctuation">'+default_text.filterpunctuation+'</textarea>\
<div class="date_description">The punctuation to ignore in all the messages, in regex format. Leave in whitespace if you also want to remove all singel letter words (this includes all words that are made single letter by removing punctuation, like emoticons including letters). &nbsp; <strong>Default: "'+default_text.filterpunctuation+'"</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label for="body">Spam Messages:<span class="resetdefault" style="cursor:pointer;float:right;font-size:1em;color: red;font-weight:bold;" title="Reset to Default">✖</span></label><textarea class="textoption" style="width:811px;" id="filterspam">'+default_text.filterspam+'</textarea>\
<div class="date_description">Whole messages that are considered spam. If a message matches any of these exactly (ignoring punctuation, whitespace, and single letter words), mark and filter as spam. Comma separated, no spaces, symbols, numbers, or single letter words. &nbsp; <strong>Default: "'+default_text.filterspam+'"</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label for="body">Platitudes:<span class="resetdefault" style="cursor:pointer;float:right;font-size:1em;color: red;font-weight:bold;" title="Reset to Default">✖</span></label><textarea class="textoption" style="width:811px;" id="filtergeneric">'+default_text.filtergeneric+'</textarea>\
<div class="date_description">Generic platitude pieces. Messages composed only of any of these in any order and number are considered spam. Comma separated, no spaces, symbols, numbers, or single letter words ("D" or "DDD").<br><strong style="word-break:break-all;word-wrap:break-word">Default: "'+default_text.filtergeneric+'"</strong></div></div>\
</fieldset>\
\
<fieldset id="about" class="create_giveaway">\
<div class="input"><div class="date_description" style="width: 795px; font-size: 14px;">\
<p align="justify">The <i>Steamgifts Giveaway Improvement Script</i> was originally designed to automatically thank the giveaway\'s creator when entering their giveaway; Saving you both time, and making sure you remain polite; But has evolved into much more. It is now a general efficiency improvement tool for everything to do with the giveaway page of <i>Steamgifts.com</i>. It comments and enters a GA with a single form submit, halving the amount of server communications time it can take to both enter and comment on a single giveaway. The script also makes the site slightly more stable when the site is particularly laggy and unresponsive. Specifically, because it uses AJAX requests; If one fails it can tell, and the script just sends another one, and so on and so forth until the request gets through. Additionally, you can specify a number of End Behaviors to perform, after you have entered into a giveaway, including closing the tab.\
<br><br>\
The script first looks for any content in the page\'s comment box, and will use that if it is available. Otherwise, it uses whatever custom comment you have set, or just defaults to "Thanks!", if one is not available. When the script submits a comment it records this, and stores an expiring data point to remember not to auto comment if you re-enter this giveaway. You can also set a specific "end behavior", to perform after submittal of both the comment and entrance into the giveaway (e.g., close the page).\
<br><br>\
The script is also built with a filter specifically designed to recognize other auto thank comments, as well as a host of other generic thanks spam. Filtering them out, and adding them to the "thanked" summery. So you can personalize and lengthen your default comment as much as you want, while still having it filtered out as generic "thanks" spam. The filter ignores your own comments, but will filter out all default auto thank comments, while leaving the personalized ones (read: comments that you wrote for a specific giveaway). When the script encounters replies, it only filters out the entire comment tree if every single comment is considered spam, otherwise the entire tree is left intact. While viewing the comments, or through the options menu, you can add more messages to filtered list, or more authors to the whitelist.\
<br><br>\
Another major feature is the Markdown toolbar. Steamgifts uses the Markdown language to style and format comments. This script incorporates the <i>MarkdownDeep</i> editor as of version 2.4, which allows you to easily add hyper links, format text, and even preview the result. Additionally, I have added two additional features/buttons to this editor. One button converts the selected (or entire comment) from HTML to Markdown, and by default strips out any remaining HTML code as well. Meaning you can create links, list, or bold text using HTML code, and one click of this button will convert it to Markdown. The other button simply strips out HTML code, useful if you are copy pasting.\
<br><br>\
<b>(Options will not take effect on any current pages, until they are reloaded)</b><br>\
<br><p>\
<h3>Compatibility:</h3>\
Designed and tested on <b>Chrome</b>, using the <a href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo"><i>Tampermonkey</i></a> extension.<br>\
<p style="line-height: .5em;">&nbsp;</p>\
<ul style="margin-left:25px; list-style: none;">\
<li><b>Firefox</b> - Does not work, and I cannot get it to work. This project needs a Firefox expert to port it. If you are interested in giving it a try, please contact me.</li>\
<p style="line-height: .5em;">&nbsp;</p>\
<li><b>SteamGifts Plus</b> - Some minimal testing. Appears to be compatible.</li>\
<p style="line-height: .5em;">&nbsp;</p>\
<li><b>Help Needed</b> - If it works for you, or does not work for you, in any unlisted ways, please let me know.</li>\
</ul>\
</p><br><p>\
<h3>Version History:</h3>\
<ul style="margin-left:25px; list-style-type: none;">\
<li><b>Version 2.4 –</b> Added fully featured Markdown editor. Added option to use the markdown editor in ALL site comment forms. Added a few more default filter words (reset to default to use). &nbsp; <span style="float: right; font-size: 12px; margin-right: 25px"><i>(October 13th, 2013)</i></span></li><p style="line-height: .5em;">&nbsp;</p>\
<li><b>Version 2.3 –</b> Added fully featured, and customizable filter system. Preload options. Fixed some bugs, improved stability. Moved options link to option in "Account" dropdown; Changed page to "/giveaway/improvement". As well as a bunch of really nessesary little features to improve normal commenting. Two buttons arounds the comment box to make using the markdown easier; One to conver HTML to markdown, and anouther to strip out html code. Added in reset to default buttons for all text options. ADDED: auto update feature. &nbsp; <span style="float: right; font-size: 12px; margin-right: 25px"><i>(August 24th, 2013)</i></span></li><p style="line-height: .5em;">&nbsp;</p>\
<li><b>Version 2.1.1 –</b> FIX: Page closing by default. &nbsp; <span style="float: right; font-size: 12px; margin-right: 25px"><i>(August 7th, 2013)</i></span></li><p style="line-height: .5em;">&nbsp;</p>\
<li><b>Version 2.1 –</b> CHANGED: Name, some wording in about page changed. ADDED: highlight options link when in options page. &nbsp; <span style="float: right; font-size: 12px; margin-right: 25px"><i>(August 7th, 2013)</i></span></li><p style="line-height: .5em;">&nbsp;</p>\
<li><b>Version 2.0 –</b> Complete code redesign and many features added. Code stabilized, improved, modularized, and documented. Designed to be feature complete (aka, have all the necessary features, but nothing fancy or particularly involved). &nbsp; <span style="float: right; font-size: 12px; margin-right: 25px"><i>(August 7th, 2013)</i></span></li><p style="line-height: .5em;">&nbsp;</p>\
<li><b>Version 1.X –</b> Original design and release of the <i>Auto Thank Script</i>. Many rapid updates were released to stabilize and improve basic design. All it did was comment "Thanks." every time you entered a giveaway. It worked, but had ragged, patchwork, code. Latter versions tried to prevent double comments. &nbsp; <span style="float: right; font-size: 12px; margin-right: 25px"><i>(August 2th, 2013)</i></span></li>\
</ul></p><br><p>\
<h3>Potential Future Updates:</h3>\
<ul style="margin-left:75px;">\
<li>Make Markdown editor automaticlaly handle newline better (a single newline needs the last line of text to have two spaces after it to show up in the result), and have a option to toggle this mode on or off.</li>\
<p style="line-height: .5em;">&nbsp;</p>\
<li>A mark/badge to denote that you have already commented on this current giveaway.</li>\
<li>When script launched for the first time or newly updated, show About page.</li>\
<p style="line-height: .5em;">&nbsp;</p>\
<li>Add more End Behavior features.</li>\
<li>Keep points up to date on all pages.</li>\
<li>Check for new replies, and show in menu bar.</li>\
<li>Add in support for special tags, that would be replaced by the gifter\'s name, the giveaway name, etc.</li>\
<p style="line-height: .5em;">&nbsp;</p>\
<li>Add in support for multiple different auto comments, and allow user to select one when entering giveaways/commenting.</li>\
<li>Add support for more special tags to select and insert from a randomly chosen one from a range of other auto comments.</li>\
<p style="line-height: .5em;">&nbsp;</p>\
<li>Add support for simple IF/else special tags for use within the comments.</li>\
<li>Allow support for templates. Comments that are designed to be added to (e.g., signatures).</li>\
</ul><br>\
<b>(Submit any suggestions, bugs, or compatibility information to the Official <i>Steamgifts Giveaway Improvement Script</i>)</b>\
<br><br>\
<h3>Links:</h3>\
<ul style="margin-left:25px;"><li><a href="http://www.steamgifts.com/forum/bcax1/automatic-thanks-when-entering-giveaway-userscript-v14/">Official Steamgifts Giveaway Improvement Script</a><br></li>\
<li><a href="http://userscripts.org/scripts/show/174828">Userscript Page</a></li></ul>\
</div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label style="display: inline; margin-right: 50px;">Clear All Options:</label>  <span id="clearoptions" style="cursor:pointer;font-size: 3em;color: red;font-weight:bold;">✖</span>\
<div class="clear_both"></div><div class="date_description">Clear all options, and reset to default.</div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label style="display: inline; margin-right: 50px;">Clear All History:</label>  <span id="clearhistory" style="cursor:pointer;font-size: 3em;color: red;font-weight:bold;">✖</span>\
<div class="clear_both"></div><div class="date_description">Clear all comment history. This history is used to prevent dual commenting; This script will not auto comment when it detects that you have previously auto, or otherwise, commented on that specific giveaway. This history expires when the giveaway it links to expires.</div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input">\
<label style="display: inline; margin-right: 50px;">Legal & Acknowledgments:</label>\
<div class="date_description" style="width: 795px; font-size: 14px;">\
This entire project, and in particular the auto comment feature, was inspired by <a href="http://www.steamgifts.com/user/BarefootMonkey">BarefootMonkey\'s</a> <i>Thank Filter Userscript</i>. Additionally, the visual style of BarefootMonkey\'s "thanked" summery is almost copied for my own.<br>\
<br>\
The HTML to Markdown conversion is done using Dom Christie\'s <a href="http://html2markdown.com/"><i>to-markdown</i></a> JS engine, copyright © 2011 <a href="http://domchristie.co.uk/">Dom Christie</a> and released under the MIT license.<br>\
<br>\
The a href="http://www.toptensoftware.com/markdowndeep/"><i>MarkdownDeep</i></a> project is copyright © 2010-2011 <a href="http://www.toptensoftware.com/">Topten Software</a>, and licenced under the Apache License, Version 2.0.</p>\
</div>\
<div class="date_description" style="width: 795px; font-size: 14px;">\
<h3>MarkdownDeep License</h3>\
====================<br>\
<br>\
MarkdownDeep - <<a href="http://www.toptensoftware.com/markdowndeep">http://www.toptensoftware.com/markdowndeep</a>><br \>\
Copyright (C) 2010-2011 Topten Software<br \>\
<br>\
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this product except in compliance with the License. You may obtain a copy of the License at<br>\
<br>\
<<a href="http://www.apache.org/licenses/LICENSE-2.0">http://www.apache.org/licenses/LICENSE-2.0</a>><br>\
<br>\
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br>\
See the License for the specific language governing permissions and limitations under the License.<br>\
</div></div>\
</fieldset>\
\
<fieldset id="gui" class="create_giveaway" hidden>\
<div class="input"><label style="display: inline; margin-right: 50px;">Move Comment Box Up:</label>  <span class="option"  id="movecomment" style="cursor:pointer;font-size: 3em;color: green;font-weight:bold;">✓</span>\
<div class="clear_both"></div><div class="date_description">Move the comment box up to the very top of the comment section, so that it is visible and easily accessible right away.<br><strong>Default: ON</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label style="display: inline; margin-right: 50px;">Mark as Spam:</label>  <span class="option"  id="markasspam" style="cursor:pointer;font-size: 3em;color: green;font-weight:bold;">✓</span>\
<div class="clear_both"></div><div class="date_description">Insert button into every giveaway comment, that, when pressed, will add that comment\'s text to the spam list.<br><strong>Default: ON</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label style="display: inline; margin-right: 50px;">Whitelist Author:</label>  <span class="option"  id="whitelistauthor" style="cursor:pointer;font-size: 3em;color: green;font-weight:bold;">✓</span>\
<div class="clear_both"></div><div class="date_description">Insert button into every giveaway comment, that when pressed, will toggle that commenter\'s name onto and off of the author whitelist.<br><strong>Default: ON</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label style="display: inline; margin-right: 50px;">Markdown Tools:</label>  <span class="option"  id="markdown_tools" style="cursor:pointer;font-size: 3em;color: green;font-weight:bold;">✓</span>\
<div class="clear_both"></div><div class="date_description">Insert Markdown tools into comment box in giveaways.<br><strong>Default: ON</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label style="display: inline; margin-right: 50px;">Markdown Tools (misc):</label>  <span class="option"  id="markdown_tools_forum" style="cursor:pointer;font-size: 3em;color: green;font-weight:bold;">✓</span>\
<div class="clear_both"></div><div class="date_description">Insert Markdown tools into all comment boxes on the site (forum, giveaway creation, etc).<br><strong>Default: ON</strong></div></div>\
<div class="clear_both"></div><div class="divider"></div>\
<div class="input"><label style="display: inline; margin-right: 50px;">Remove HTML:</label>  <span class="option"  id="removehtml" style="cursor:pointer;font-size: 3em;color: green;font-weight:bold;">✓</span>\
<div class="clear_both"></div><div class="date_description">When converting HTML to Markdown, removing any remaining HTML.<br><strong>Default: ON</strong></div></div>\
</fieldset>\
\
<fieldset id="giveaway" class="create_giveaway" hidden>\
<div class="input"><label style="display: inline; margin-right: 50px;">On/Off:</label>  <span class="option"  id="giveawayonoff" style="cursor:pointer;font-size: 3em;color: green;font-weight:bold;">✓</span>\
<div class="clear_both"></div><div class="date_description">When set to OFF, this turns the modified giveaway submittal off. This will also prevent all auto commenting.<br><strong>Default: ON</strong></div></div>\
</fieldset>\
\
<fieldset id="finish" class="create_giveaway" hidden>\
<div class="input"><label style="display: inline; margin-right: 50px;">Reload:</label>  <span class="option"  id="endreload" style="cursor:pointer;font-size:3em;color: green;font-weight:bold;">✓</span>\
<label style="display:inline;margin-right:50px;margin-left:100px;">Close Tab:</label>  <span class="option" id="endclose" style="cursor:pointer;font-size:3em;color:grey;font-weight:bold;">✖</span>\
<div class="clear_both"></div><div class="date_description">When set to OFF, this turns the modified giveaway submittal off. This will also prevent all auto commenting. Note: Both may be turned off, but they cannot both be on at the same time.<br><strong>Default: RELOAD &nbsp; &nbsp; &nbsp; &nbsp; Suggested: CLOSE TAB</strong></div></div>\
</fieldset>');

$('head').append('<script type="text/javascript">\
function tab(name){\
	if(!name){ name = location.hash.substring(1);  }\
	if(!name){ name = "about";  }\
	$("fieldset.create_giveaway").each(function(){\
		if($(this).attr("id") !== name){\
			$(this).attr("hidden", true);\
		}else{\
			$(this).removeAttr("hidden");\
		}\
	});\
	\
	$(".footer_sales>a.sale").css("background-color", "#e8e8e8"); \
	$(".footer_sales>a.sale[name=" + name + "]").css("background-color", "#bbbbbb");\
	\
	return(false);\
}\
</script>');

	var toggle = { '✖': '✓', '✓': '✖' };
	var toggle_style = { '✓': ['color','green'], '✖': ['color','grey'] };
	var toggle_bool = { '✖': false, '✓': true };
	var toggle_options = {
		'✓': { endclose:		function(){click_handler($('fieldset.create_giveaway#finish span#endreload'), '✖');},
				endreload:		function(){click_handler($('fieldset.create_giveaway#finish span#endclose'), '✖');}},
		defaultcomment:		function(text){
								if(text.empty() || (default_text.defaultcomment === text)){
									return(null);
								}return(text);
							},
		filterauthorwl:		function(text){
								test = text.replace(/\s/g, '').replace(/(?:^,)|(?:,$)/g,'');
								if(text === default_text.filterauthorwl){
									return(null);
								}return(text);
							},
		filterspam:			function(text){
								test = text.replace(/\s/g, '').replace(/(?:^,)|(?:,$)/g,'');
								if(text === default_text.filterspam){
									return(null);
								}return(text);
							},
		filtergeneric:		function(text){
								test = text.replace(/\s/g, '').replace(/(?:^,)|(?:,$)/g,'');
								if(text === default_text.filtergeneric){
									return(null);
								}return(text);
							}
		};
	function click_handler(element, state, visual){ // handle custom checkmark type clicks
		if(this instanceof HTMLElement){ element = $(this); }
		if(typeof state !== 'string'){ state = toggle[element.html()]; }
		
		element.html(state);
		element.css(toggle_style[state][0], toggle_style[state][1]);
		
		if(!visual){
			GM_setValue(element.attr('id'), toggle_bool[state]);
			if(toggle_options[state][element.attr('id')]){
				toggle_options[state][element.attr('id')]();
			}
		}
	}
	function text_handler(element, state){ // handle text changes
		if(this instanceof HTMLElement){ element = $(this); }
		if(typeof state !== 'string'){ state = element.val(); }
		
		element = element.attr('id');
		
		if(toggle_options[element]){
			state = toggle_options[element](state);
		}
		if(state === null){
			GM_deleteValue(element);
		}else{
			GM_setValue(element, state);
		}
	}
	function load(){ // Load options and set options page
		$('.option').each(function(){
			var value = GM_getValue($(this).attr('id'), null);
			if(typeof value === 'boolean'){
				click_handler($(this), (value ? '✓':'✖' ), true);
			}
		});
		$('.textoption').each(function(){
			var value = GM_getValue($(this).attr('id'), null);
			if(typeof value === 'string'){
				$(this).val(value);
			}
		});
	}
	function clear_options(){
		if(confirm('Clear all options?')){
			var storage = GM_listValues();
			for(var i = 0; storage.length > i; i++){
				if(storage[i].length !== 5){
					GM_deleteValue(storage[i]);
				}
			}
			$('.textoption').val('');
		}
	}
	function clear_option(){
		var text = $(this).parent();
		if(confirm('Reset ' + text.text().slice(0,-2) + " to default?")){
			var node = text.siblings('.textoption');
			node.val(default_text[node.attr('id')]);
			GM_deleteValue(node.attr('id'));
		}
	}
	function clear_history(){
		if(confirm('Clear all comment history?')){
			var storage = GM_listValues();
			for(var i = 0; storage.length > i; i++){
				if(storage[i].length === 5){
					GM_deleteValue(storage[i]);
				}
			}
		}
	}
	
	$('.option').bind('click', click_handler);
	$('.textoption').bind('keyup', text_handler);
	$('#clearoptions').bind('click', clear_options);
	$('#clearhistory').bind('click', clear_history);
	$('.resetdefault').bind('click', clear_option);
	load();
}