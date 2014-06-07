// ==UserScript==
// @name       Reddit Doge Tipper
// @namespace  http://www.reddit.com/r/dogecoin
// @version    0.1
// @description  wow. much tip. very script.
// @match      http://www.reddit.com/r/*/comments/*
// @copyright  2013+, MattCoady
// ==/UserScript==

function amount(){
	var dogecoins = prompt("How many dogecoin?");
	return dogecoins;
}

function mainComment(dogecoins){
	jQuery('.commentarea > form.usertext textarea').val('+/u/dogetipbot ' + dogecoins + ' doge');
}



function tipClick(dogecoins,a){
	var b = comment_reply_for_elem(a),
		c = b.find("textarea");
	if (window.getSelection && c.val().length == 0) {
		var e = window.getSelection(),
			i = jQuery(e.focusNode).parents(".md").first(),
			j = jQuery(e.anchorNode).parents(".md").first();
		i.length && i.is(j) && (e = e.toString(), e.length > 0 && (e = e.replace(/^/gm, "> "), c.val(e + "\n\n"), c.scrollTop(c.scrollHeight)))
	}
	show_edit_usertext(b);
	b.show();
	
	b.find(".cancel").get(0).onclick = function () {
		b.hide()
	};
	jQuery(a).thing().find(".showreplies:visible").click();
	c.val('+/u/dogetipbot ' + dogecoins + ' doge');
	return !1
}


if($('body').hasClass('loggedin')){
	jQuery('.doge').remove();
		jQuery('.commentarea .flat-list').each(function(){
		var usrName = $(this).siblings('p').children('a.author').text();
		$(this).append('<li class="doge"><a href="javascript:void(0)"><img src="http://coinmarketcap.com/img/DogeCoin.png" style="margin: 0 3px;">Doge Tip ' + usrName + ' </a></li>');
	})
    jQuery('li.doge a').click(function(){
        tipClick(amount(),this);
    })
    var firstCommentBox = jQuery('.commentarea textarea').first();
	var op = $('#siteTable .tagline .author').first().text();
	jQuery('.menuarea').after('<a class="doge" href="javascript:void(0)" style="margin-left: 15px;"><img src="http://coinmarketcap.com/img/DogeCoin.png" style="margin-right: 3px;">Doge Tip ' + op + '</a>');
    jQuery('a.doge').click(function(){
        mainComment(amount());
    })
}