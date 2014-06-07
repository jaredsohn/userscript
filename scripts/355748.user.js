// ==UserScript==
// @name       Reddit Vertcoin Tipper
// @namespace  http://www.reddit.com/r/vertcoin
// @version    0.1
// @description Vertcoin tip script, Fork of /u/lizardrsrock4's Fork of Dogecoin Tipper by MattCoady
// @match      http://www.reddit.com/r/*/comments/*
// @copyright  2014+, /u/thebitking
// @grant       none
// ==/UserScript==

function amount(){
	var vertcoins = prompt("Enter amount of Vertcoins to tip:");
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
	if (vertcoins != '' && vertcoins != null)
	c.val(c.val() + '+/u/vertcointipbot ' + vertcoins + ' vertcoins' + '[**^^VTC ^^Tipping ^^Extension!**](http://userscripts.org/scripts/show/355748)');
	return !1
}


if($('body').hasClass('loggedin')){
	jQuery('.doge').remove();
		jQuery('.commentarea .flat-list').each(function(){
		var usrName = $(this).siblings('p').children('a.author').text();
		$(this).append('<li class="vert"><a href="javascript:void(0)"> *** VTC Tip ***  </a></li>');
	})
    jQuery('li.vert a').click(function(){
        tipClick(amount(),this);
    })
    var firstCommentBox = jQuery('.commentarea textarea').first();
	var op = $('#siteTable .tagline .author').first().text();
	jQuery('.menuarea').after('<a class="vert" href="javascript:void(0)" style="margin-left: 15px;"><img src="http://coinmarketcap.com/img/Vertcoin.png" style="margin-right: 3px;">Vertcoin Tip ' + op + '</a>');
    jQuery('a.vert').click(function(){
        mainComment(amount());
    })
}