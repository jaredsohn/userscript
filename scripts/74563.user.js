// ==UserScript==
// @name        turbofilm.tv blog extension
// @namespace   Turbofilm 
// @description Add navigation for my/new message. Replace text links and image links
// @author      zb3k
// @version     0.19
// @licence     GPL v.2
// @require     http://code.jquery.com/jquery-1.4.2.min.js
// @include     http://turbofilm.tv/Tlog/Posts/*
// @include     http://*.turbofilm.tv/Tlog/Posts/*
// @include     http://turbofilm.tv/Blog/Posts/*
// @include     http://*.turbofilm.tv/Blog/Posts/*
// @include		http://turbofilm.tv/Watch/*/Season*/Episode*
// @include		http://*.turbofilm.tv/Watch/*/Season*/Episode*
// ==/UserScript==

(function(){

//location is blog or watch
var loc = location.pathname;

// for Opera
if(location.hostname.indexOf('turbofilm.tv') == -1)
{
	return;
}

if((loc.search('My/Messages') == 1) || ((loc.search('My/Series') == 1)))
{
	return;
}

//for both situations
var css = function(rule) {document.styleSheets[0].insertRule(rule, document.styleSheets[0].cssRules.length)};
css('#Zfloat_box {opacity:0; overflow:hidden; color:#456; border:1px solid #09F; text-align:center; position:fixed; top:50%; right:-10px; width:30px; padding:5px 15px 5px 5px; margin-top:-120px; background:#000; -webkit-box-shadow:0 0 50px #09F; -webkit-border-radius:10px; -moz-box-shadow:0 0 50px #09F; -moz-border-radius:10px; box-shadow:0 0 50px #09F; border-radius:10px}');
	css('#Zfloat_box:hover {opacity:1 !important}');
	css('#Zfloat_box hr {border:none; border-top:1px solid #06C; margin:5px -5px}');
	css('#Zfloat_box a {display:block; padding:2px 7px; margin:3px; border:1px solid #07C; -webkit-border-radius:3px; -moz-border-radius:3px; border-radius:3px}');
	css('#Zfloat_box a:hover {border-color:#0CF; color:#0CF; -webkit-box-shadow:0 0 10px #09F; -moz-box-shadow:0 0 10px #09F; box-shadow:0 0 10px #09F}');
	css('#Zfloat_box b {font-weight:normal; color:#FFF; text-shadow:0 0 3px #FFF}');
	css('.X_img {border:1px solid #999; background:#222; margin:10px 0; padding:5px; width:30%; display:block; -webkit-border-radius:5px; -moz-border-radius:5px; border-radius:5px}');
	css('.X_irony {color:#FF0000}');
	css('.X_user {color:#AAA; border:1px solid #666; padding:0 3px 0 13px; background:url(http://turbofilm.tv/media/i/blog/iuser.png) no-repeat 2px -2px; -webkit-border-radius:3px; -moz-border-radius:3px; border-radius:3px}');
	css('.X_user.me {background-color:#000; border-color:#09F; color:#5CF}');
	css('.god .userpic {background:none !important; border:2px solid #C33; background:#422 !important; margin:-1px 0 0 -1px; -moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; box-shadow:0 0 5px #900; -webkit-box-shadow:0 0 5px #900; -moz-box-shadow:0 0 5px #900}');
	css('.god .name {color:#D55 !important}');
	css('.X_img:hover {width: auto;}');
	
	//if location is Tlog or Blog use one css block
if((location.pathname.search('[TB]log') == 1))
{
	css('.replybox,.replytext{background:none !important}');
	css('#newcomment .addcomta{margin:5px 5px 12px !important; float:none}');
	css('#blog #blogcomments .replybox .area, #blogcomments #newcomment {width:490px; height:160px; background:#555; padding:0 0 15px 0; border:2px solid #777; margin:-1px 0 0 -10px; box-shadow:0 3px 20px rgba(0,0,0,.7); border-radius:5px; -webkit-box-shadow:0 3px 20px rgba(0,0,0,.7); -webkit-border-radius:5px; -moz-box-shadow:0 3px 20px rgba(0,0,0,.7); -moz-border-radius:5px}');
	css('#blogcomments #newcomment{position:relative}');
	css('#newcomment .Z_bb_box {margin-left:5px}');
	css('.replytext,.replytext textarea ,#blogcomments #newcommtext, #newcomment .addcomta  {width:475px !important; height:130px !important}');
	css('.replytext textarea, #blogcomments #newcommtext{clear:both; padding:2px; border:1px solid #777 !important; background:#333 !important; border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px}');
	css('.replybox .button, #blogcomments #newcommb {margin:0 !important; display:block; float:right !important}');
	css('.Z_bb_box {position:absolute; top:146px}');
	css('.Z_bb_box * {font-family:"Times New Roman"; font-size:15px; display:inline-block; border:1px solid #777; padding:3px 5px; margin:0 3px 0 0; min-width:14px; text-align:center; border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px}');
	css('.Z_bb_box *:hover{background:#666; cursor:pointer}');
}
//if location is Tlog or Blog use another css block
else
{
	css('.replybox,.replytext{background:none !important}');
	css('#newcomment .addcomta{margin:5px 5px 12px !important; float:none}');
	css('#content #watchcomments .replybox .area, #watchcomments #newcomment {width:490px; height:160px; background:#555; padding:0 0 15px 0; border:2px solid #777; margin:-1px 0 0 -10px; box-shadow:0 3px 20px rgba(0,0,0,.7); border-radius:5px; -webkit-box-shadow:0 3px 20px rgba(0,0,0,.7); -webkit-border-radius:5px; -moz-box-shadow:0 3px 20px rgba(0,0,0,.7); -moz-border-radius:5px}');
	css('#watchcomments #newcomment{position:relative}');
	css('#newcomment .Z_bb_box {margin-left:5px}');
	css('.replytext,.replytext textarea ,#watchcomments #newcommtext, #newcomment .addcomta  {width:475px !important; height:130px !important}');
	css('.replytext textarea, #watchcomments #newcommtext{clear:both; padding:2px; border:1px solid #777 !important; background:#333 !important; border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px}');
	css('.replybox .button, #watchcomments #newcommb {margin:0 !important; display:block; float:right !important}');
	css('.Z_bb_box {position:absolute; top:146px; color:#ffffff}');
	css('.Z_bb_box * {font-family:"Times New Roman"; font-size:15px; display:inline-block; border:1px solid #777; padding:3px 5px; margin:0 3px 0 0; min-width:14px; text-align:center; border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px}');
	css('.Z_bb_box *:hover{background:#666; cursor:pointer}');
}

var fieldSelection = {

		getSelection: function() {

			var e = this.jquery ? this[0] : this;

			return (

				/* mozilla / dom 3.0 */
				('selectionStart' in e && function() {
					var l = e.selectionEnd - e.selectionStart;
					return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
				}) ||

				/* exploder */
				(document.selection && function() {

					e.focus();

					var r = document.selection.createRange();
					if (r == null) {
						return { start: 0, end: e.value.length, length: 0 }
					}

					var re = e.createTextRange();
					var rc = re.duplicate();
					re.moveToBookmark(r.getBookmark());
					rc.setEndPoint('EndToStart', re);

					return { start: rc.text.length, end: rc.text.length + r.text.length, length: r.text.length, text: r.text };
				}) ||

				/* browser not supported */
				function() {
					return { start: 0, end: e.value.length, length: 0 };
				}

			)();

		},

		replaceSelection: function() {

			var e = this.jquery ? this[0] : this;
			var text = arguments[0] || '';

			return (

				/* mozilla / dom 3.0 */
				('selectionStart' in e && function() {
					e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
					return this;
				}) ||

				/* exploder */
				(document.selection && function() {
					e.focus();
					document.selection.createRange().text = text;
					return this;
				}) ||

				/* browser not supported */
				function() {
					e.value += text;
					return this;
				}

			)();

		}

	};

	jQuery.each(fieldSelection, function(i) { jQuery.fn[i] = this; });


var process = function()
{
	var hash;
	//K.O.
	var my_login = $('#header span.loginame a').html();

	//K.O.
	var my_comments = [];
	//K.O.
	var new_comments = [];
	
	// Add comment
	var bb_box = '<div class="Z_bb_box"><p>@</p><b>B</b><i>I</i><s>S</s><u>U</u><em>irony</em></div>';
	
	//bb_box added flag
	var reply_added;
	
	var clickEv;
	
	var watchStuffRendered = false;
	
	
	// JQuery ScrollTo
	if ( ! jQuery.scrollTo)
	{
		;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
	}
	
	//blog
	if((location.pathname.search('[TB]log') == 1))
	{
			enumComm('.blogcom');
			renderStuff('#posttext, div.comcontent');
			addFloatBox('body');
			animate();
			clickEvent();
	}
	else //watch
	{
		$('body').ajaxComplete(function(event,request, settings)
		{
			if(!watchStuffRendered){				
				enumComm('.watchcom');
				clickEvent();
				addFloatBox('body');
				animate();
				watchStuffRendered = true;
			}
			renderStuff('.watchcom');
		});
	}
	
	//Find comments
	function enumComm(target)
	{
			// Find my comments that rape your brains
			$(target + ' div.combox.my').each(function(i){
				my_comments[i] = '#' + this.parentNode.id;
			});
			
			// Find new comments
			$(target + ' div.combox.new').each(function(i){
				new_comments[i] = '#' + this.parentNode.id;
			});	
	}
	
	//Get screen resolution 
	function screenRes()
	{
		ScreenWidth = screen.width;
		ScreenHeight = screen.height;
		resImg = ScreenWidth * 1.0;
		css('.X_img:hover {width: auto;}');
	}
	
	//IMG
	function replaceIMGlinksToHTML(text)
	{
		//screenRes();
		return text.replace(/([^'"])((http|ftp|https):\/\/[a-z0-9.-]{2,}\.[a-z]{2,4}[-a-zа-я0-9.,:\/=_?&%()#+~]*\.(jpg|jpeg|gif|png))/ig, '$1<a href="$2" target="_blank"><img src="$2" class="X_img"></a>');
	}
	
	// LINKS
	function replaceURLWithHTMLLinks(text) { 
	  var exp = /[^'"](\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; 
	  return text.replace(exp,"<a href='$1'> $1</a>");  
	} 
	
	// @my username
	function replaceMyUserName(text)
	{
		return text.replace('@' + my_login, '<a href="http://turbofilm.tv/Users/' + my_login + '" class="X_user me">' + my_login + '</a>');
	}
	
	//@username
	function replaceUsernName(text)
	{
		return text.replace(/([\s>(\[.,]+)@([-a-zа-я\d@_.]+)/ig, '$1<a href="http://turbofilm.tv/Users/$2" class="X_user">$2</a>');
	}
	
	//BBtags
	function replaceBBTags(text)
	{
		return text.replace(/\[(b|s|i|u)\]((.|\n)+?)\[\/\1\]/ig, '<$1>$2</$1>');
	}
	function replaceBBTags1(text)
	{
		return text.replace(/\[(irony)\]((.|\n)+?)\[\/\1\]/ig, '<i class="X_irony">$2</i>');
	}	
	function renderStuff(blogOrNot)
	{
		// Render post message and comments
		$(blogOrNot).each(function(){
			
			var t = this.innerHTML;
			
			if (t.match(/(http|ftp|https):/i))
			{
				t = ' ' + t; // for first links
				
				// IMG
				t = replaceIMGlinksToHTML(t);
				
				// LINKS
				t = replaceURLWithHTMLLinks(t);
			}
			
			if (t.match(/@/))
			{
				//@my username
				t = replaceMyUserName(t);
				
				//@username
				t = replaceUsernName(t);
			}
			
			if (t.match(/\[/))
			{
				// BBTags
				t = replaceBBTags(t);
				t = replaceBBTags1(t);
			}
					
			this.innerHTML = t;
		});
	}
	
	function addFloatBox(e)
	{
		
	// Add control float box html
		$(e).append('<div id="Zfloat_box">'
	    + (my_comments.length  ? 'My (' + my_comments.length + ')<a href="#" id="Z_my_u">&uarr;</a><a href="#" id="Z_my_d">&darr;</a><hr>' : '')
	    + (new_comments.length ? '<b>New (' + new_comments.length + ')</b><a href="#" id="Z_new_u">&uarr;</a><a href="#" id="Z_new_d">&darr;</a><hr>' : '')
	    + 'Page<a href="#header">&uarr;</a><a href="#addcomment">&darr;</a>'
	    + '</div>');
	}
	
	function animate()
	{
		$('#Zfloat_box').animate({opacity:.5}, 300).find('a').click(function(){
			
			// Page up/down
			if ( ! this.id)
			{
				$(window).scrollTo('#' + this.href.split('#')[1], 500);
				return false;
			}
			
			var type     = this.id.split('_');
			var step     = type[2] == 'u' ? -1 : +1;
			var comments = eval(type[1] + '_comments');
			
			if ( ! comments.length)
			{
				return false;
			}
			
			var current = comments.indexOf(hash) + step;
				
			if ( ! comments[current])
			{
				current = step > 0 ? 0 : comments.length - 1;
			}
			
			hash = comments[current];
			
			// FadeOut comment
			$(hash).animate({opacity:.5}, 100, function(){
				var ob=this;
				setTimeout(function(){$(ob).css({opacity:1})}, 500);
			});
			
			// Scroll and FadeIn comment
			$(window).scrollTo(hash, 300, function(){
				$(hash).animate({opacity:1}, 200)
			});
			
			return false;
		});
	}
	
	function addBB(txtarea, bbCode) {
		var range = $(txtarea).getSelection();
		var code = '[' + bbCode + ']' + range.text + '[/' + bbCode + ']';
		$(txtarea).replaceSelection(code);
	}
	
	function clickEvent()
	{
		if (clickEv != null)
			return;
			
		$('body').click(function(e)
		{
			var ob = e.target;
			
			// click BB btn
			if(ob.parentNode.className == 'Z_bb_box')
			{
				var $ta = $(ob.parentNode.parentNode).find('textarea');
				if (ob.innerHTML == '@')
				{
					var login = ob.parentNode.parentNode.id.substring(0,4) == 'rbox' ? $('#comm' + ob.parentNode.parentNode.id.substring(4) + ' span.name').html() + ', ' : '';
					var code = '@' + login;
					$ta.val(code + $ta.val()).focus();
				}
				else
				{
					addBB($ta, ob.innerHTML);
				}
			}
			
			// click reply
			else if(ob.id.substr(0,5) == 'reply' && ob.className == 'reply')
			{
				$('#rbox' + ob.id.substring(5)).append(bb_box);
			}
			else if(ob.innerHTML == 'Добавить комментарий')
			{
				if(reply_added == null)
				{
					$('.addcomarea').append(bb_box);
					reply_added = 1;
				}
			}
		});
		
		clickEv = 1;
	}
}

// Run
if (jQuery)
{
	process();
}
else
{
	window.addEventListener('load', process, false); // for opera
}

})();