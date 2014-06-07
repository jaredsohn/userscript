// ==UserScript==
// @name        Turbofilm.ru blog extension
// @namespace   Turbofilm 
// @description Add navigation for my/new message. Replace text links and image links
// @author      zb3k
// @version     0.19
// @licence     GPL v.2
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include     http://turbofilm.ru/Tlog/Posts/*
// @include     http://*.turbofilm.ru/Tlog/Posts/*
// @include     http://turbofilm.ru/Blog/Posts/*
// @include     http://*.turbofilm.ru/Blog/Posts/*
// @include     http://turbofilm.ru/My/Messages/*
// @include     http://*.turbofilm.ru/My/Messages/*
// ==/UserScript==


(function(){


// for Opera
if(location.hostname.indexOf('turbofilm.ru') == -1)
{
	return;
}


// CSS
var css = function(rule) {document.styleSheets[0].insertRule(rule, document.styleSheets[0].cssRules.length)};
css('#Zfloat_box {opacity:0; overflow:hidden; color:#456; border:1px solid #09F; text-align:center; position:fixed; top:50%; right:-10px; width:30px; padding:5px 15px 5px 5px; margin-top:-120px; background:#000; -webkit-box-shadow:0 0 50px #09F; -webkit-border-radius:10px; -moz-box-shadow:0 0 50px #09F; -moz-border-radius:10px; box-shadow:0 0 50px #09F; border-radius:10px}');
css('#Zfloat_box:hover {opacity:1 !important}');
css('#Zfloat_box hr {border:none; border-top:1px solid #06C; margin:5px -5px}');
css('#Zfloat_box a {display:block; padding:2px 7px; margin:3px; border:1px solid #07C; -webkit-border-radius:3px; -moz-border-radius:3px; border-radius:3px}');
css('#Zfloat_box a:hover {border-color:#0CF; color:#0CF; -webkit-box-shadow:0 0 10px #09F; -moz-box-shadow:0 0 10px #09F; box-shadow:0 0 10px #09F}');
css('#Zfloat_box b {font-weight:normal; color:#FFF; text-shadow:0 0 3px #FFF}');
css('.X_img {border:1px solid #999; background:#222; margin:10px 0; padding:5px; width:30%; display:block; -webkit-border-radius:5px; -moz-border-radius:5px; border-radius:5px}');
css('.X_img:hover {width:auto}');
css('.X_irony {color:#F66}');
css('.X_user {color:#AAA; border:1px solid #666; padding:0 3px 0 13px; background:url(http://turbofilm.ru/media/i/blog/iuser.png) no-repeat 2px -2px; -webkit-border-radius:3px; -moz-border-radius:3px; border-radius:3px}');
css('.X_user.me {background-color:#000; border-color:#09F; color:#5CF}');
css('.god .userpic {background:none !important; border:2px solid #C33; background:#422 !important; margin:-1px 0 0 -1px; -moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; box-shadow:0 0 5px #900; -webkit-box-shadow:0 0 5px #900; -moz-box-shadow:0 0 5px #900}');
css('.god .name {color:#D55 !important}');
css('.replybox,.replytext{background:none !important}');
css('#newcomment .addcomta{margin:5px 5px 12px !important; float:none}');
css('#blog #blogcomments .replybox .area, #blogcomments #newcomment {width:490px; height:160px; background:#555; padding:0 0 15px 0; border:2px solid #777; margin:-1px 0 0 -10px; box-shadow:0 3px 20px rgba(0,0,0,.7); border-radius:5px; -webkit-box-shadow:0 3px 20px rgba(0,0,0,.7); -webkit-border-radius:5px; -moz-box-shadow:0 3px 20px rgba(0,0,0,.7); -moz-border-radius:5px}');
css('#blogcomments #newcomment{position:relative}');
css('#newcomment .Z_bb_box {margin-left:5px}');
css('.replytext,.replytext textarea, #blogcomments #newcommtext, #newcomment .addcomta {width:475px !important; height:130px !important}');
css('.replytext textarea, #blogcomments #newcommtext{clear:both; padding:2px; border:1px solid #777 !important; background:#333 !important; border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px}');
css('.replybox .button, #blogcomments #newcommb {margin:0 !important; display:block; float:right !important}');
css('.Z_bb_box {position:absolute; top:146px}');
css('.Z_bb_box * {font-family:"Times New Roman"; font-size:15px; display:inline-block; border:1px solid #777; padding:3px 5px; margin:0 3px 0 0; min-width:14px; text-align:center; border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px}');
css('.Z_bb_box *:hover{background:#666; cursor:pointer}');



var process = function()
{
	var hash;



	// JQuery ScrollTo
	if ( ! jQuery.scrollTo)
	{
		;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
	}
	
	
	
	// Find my comments
	var my_comments = [];
	$('.blogcom div.combox.my').each(function(i){
		my_comments[i] = '#' + this.parentNode.id;
	});
	
	// Find new comments
	var new_comments = [];
	$('.blogcom div.combox.new').each(function(i){
		new_comments[i] = '#' + this.parentNode.id;
	});
	
	
	
	// Add control float box html
	$('body').append('<div id="Zfloat_box">'
	    + (my_comments.length  ? 'My (' + my_comments.length + ')<a href="#" id="Z_my_u">&uarr;</a><a href="#" id="Z_my_d">&darr;</a><hr>' : '')
	    + (new_comments.length ? '<b>New (' + new_comments.length + ')</b><a href="#" id="Z_new_u">&uarr;</a><a href="#" id="Z_new_d">&darr;</a><hr>' : '')
	    + 'Page<a href="#header">&uarr;</a><a href="#addcomment">&darr;</a>'
	    + '</div>');
	
	
	
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
	
	
	
	// Get my login
	var my_login = $('#header span.loginame a').html();
	
	
	
	// Render post message and comments
	$('#posttext, div.comcontent').each(function(){
		
		var t = this.innerHTML;
		
		if (t.match(/(http|ftp|https):/i))
		{
			t = ' ' + t; // for first links
			
			// IMG
			t = t.replace(/([^'"])((http|ftp|https):\/\/[a-z0-9.-]{2,}\.[a-z]{2,4}[-a-zа-я0-9.,:\/=_?&%()#+~]*\.(jpg|jpeg|gif|png))/ig, '$1<a href="$2" target="_blank"><img src="$2" class="X_img"></a>');
			
			// LINKS
			t = t.replace(/([^'"])((http|ftp|https):\/\/[a-z0-9.-]{2,}\.[a-z]{2,4}[-a-zа-я0-9\.,:\/=_?&%()#+~]*)([^.,])/ig, '$1<a href="$2" target="_blank">$2</a>$4');
		}
		
		if (t.match(/@/))
		{
			// @username
			t = t.replace('@' + my_login, '<a href="http://turbofilm.ru/Users/' + my_login + '" class="X_user me">' + my_login + '</a>');
			t = t.replace(/([\s>(\[.,]+)@([-a-zа-я\d@_.]+)/ig, '$1<a href="http://turbofilm.ru/Users/$1" class="X_user">$2</a>');
		}
		
		if (t.match(/\[/))
		{
			// BBTags
			t = t.replace(/\[(b|s|i|u)\]((.|\n)+?)\[\/\1\]/ig, '<$1>$2</$1>');
			t = t.replace(/\[(irony)\]((.|\n)+?)\[\/\1\]/ig, '<i class="X_irony">$2</i>');
		}
				
		this.innerHTML = t;
	});
	
	
	// Add comment
	var bb_box = '<div class="Z_bb_box"><p>@</p><b>B</b><i>I</i><s>S</s><u>U</u><em>irony</em></div>';
	$('#newcomment').append(bb_box);
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
			}
			else
			{
				var code = '[' + ob.innerHTML + '][/' + ob.innerHTML + ']';
			}
			$ta.val($ta.val() + code).focus();
		}
		
		// click reply
		else if(ob.id.substr(0,5) == 'reply' && ob.className == 'reply')
		{
			$('#rbox' + ob.id.substring(5)).append(bb_box);
		}
	});
	
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