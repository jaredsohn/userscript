// ==UserScript==
// @name       Reddit Vertcoin Tipper
// @namespace  http://www.reddit.com/r/vertcoin
// @version    0.2
// @description Vertcoin tip scrpiot, Fork of Dogecoin Tipper by MattCoady
// @match      http://www.reddit.com/r/*/comments/*
// @copyright  2014+, /u/lizardsrock4
// ==/UserScript==

function amount(){
	var vertcoins = prompt("How many vertcoins?");
	return vertcoins;
}

function mainComment(vertcoins){
	jQuery('.commentarea > form.usertext textarea').val('+/u/vertcointipbot ' + vertcoins + ' vertcoins');
}



function tipClick(vertcoins,a){
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
	c.val('+/u/vertcointipbot ' + vertcoins + ' vertcoins');
	return !1
}


if($('body').hasClass('loggedin')){
	jQuery('.doge').remove();
		jQuery('.commentarea .flat-list').each(function(){
		var usrName = $(this).siblings('p').children('a.author').text();
		$(this).append('<li class="vert"><a href="javascript:void(0)"><img src="http://i.imgur.com/0lf6IV5.png" style="margin: 0 3px;">Vertcoin Tip ' + usrName + ' </a></li>');
	})
    jQuery('li.vert a').click(function(){
        tipClick(amount(),this);
    })
    var firstCommentBox = jQuery('.commentarea textarea').first();
	var op = $('#siteTable .tagline .author').first().text();
	jQuery('.menuarea').after('<a class="vert" href="javascript:void(0)" style="margin-left: 15px;"><img src="http://i.imgur.com/0lf6IV5.png" style="margin-right: 3px;">Vertcoin Tip ' + op + '</a>');
    jQuery('a.vert').click(function(){
        mainComment(amount());
    })
}