// ==UserScript==
// @name        FlickrHomePageTweaks
// @namespace   vispillo
// @description Configure the kind of activity displayed on your home page
// @grant		GM_getValue
// @grant		GM_setValue
// @require        http://userscripts.org/scripts/source/78952.user.js
// @include     http://www.flickr.com/activity*
// @include     http://www.flickr.com/
// @version     1
// ==/UserScript==

var config = { 
	"addsyouasacontact":GM_getValue("item_"+'addsyouasacontact'+"x","show"),
	"people":GM_getValue("item_"+'people'+"x","show"),
	"favorites":GM_getValue("item_"+'favorites'+"x","show"),
	"comments":GM_getValue("item_"+'comments'+"x","show"),
	"tocommentsonothersphotos":GM_getValue("item_"+'tocommentsonothersphotos'+"x","show"),
	"addsyoutoaphoto":GM_getValue("item_"+'addsyoutoaphoto'+"x","show")
}

unsafeWindow.console.log(config);

var mutableItems = {
	"addsyouasacontact":new RegExp("added you as a"),
	"people":new RegExp("tagged (?!you in this)"),
	"addsyoutoaphoto":new RegExp("tagged you in this"),
	"favorites":new RegExp("faved your photo"),
	"comments":new RegExp("commented on your photo"),
	"tocommentsonothersphotos":new RegExp("commented on (?!your photo)")
};
	
if (jQuery('#tt-recent-nav ul li b').text()=="Custom view") {
	var foo = jQuery("#filter-list").html();
	foo = "RA HP<br />"+foo;
	jQuery("#filter-list").html(foo);
	jQuery('#tt-save-default p.tt-default-message').remove();
	jQuery('#tt-save-default p.tt-save-button').attr('style','display:block');
	
	var editable = new Array("comments","favorites","tocommentsonothersphotos","addsyouasacontact","people","addsyoutoaphoto");
	jQuery('#tt-activity-settings-submit').click(function (i) {
		jQuery('#tt-activity-settings-submit').addClass('DisabledButt');
		for (var i in mutableItems) {
			if (jQuery('#'+i).attr('checked')) {
				GM_setValue("item_"+i+"x","show");
			}
			else {
				GM_setValue("item_"+i+"x","hide");
			}
		}
	});

	
	jQuery("#filter-list ul li").each( function (i) {
		var idstr = jQuery(this).find('label').html();
		idstr = idstr.replace(/[\'\ ]+/g,"");
		var item = '';
			
		if (editable.indexOf(idstr) != -1) {
			item = '<input class="fabulous" id="' + idstr + '" type="checkbox">';
		}
		else {
			item = '<input class="fabulous" id="' + idstr + '" type="checkbox" disabled="disabled">';
		}
		
		jQuery(this).find('input').after(item);
		jQuery('input.fabulous:enabled').each(function (j){
			if ( GM_getValue("item_"+jQuery(this).attr('id')+"x","show") == "show") {
				jQuery(this).attr("checked",true);
			}
		});
	});
	jQuery('input.fabulous').change(function (i) {
		jQuery('#tt-activity-settings-submit').removeClass('DisabledButt');
	});
}
else {
	jQuery('div.card').each(function(t) {
		processCard(jQuery(this));
	});

}

function checkItem (item) {
	//unsafeWindow.console.log("Checking for item: "+item+"!");
	if (config[item] == "hide") {
		//unsafeWindow.console.log("returning true");
		return true;
	}
	else {
		//unsafeWindow.console.log("returning false");
		return false;
	}
}

$(unsafeWindow.document).bind('DOMNodeInserted', function(e) {
	if (jQuery(e.target).hasClass('card')) {
		processCard(jQuery(e.target));
	}
});

function processCard (card) {
	unsafeWindow.console.log(card);
	for (var k in mutableItems) {
		//unsafeWindow.console.log(k + ": "+mutableItems[k]);
		//unsafeWindow.console.log(card.find('span.action-author, span.phographer_name').text());
		if ( mutableItems[k].test(card.find('span.action-author, span.phographer_name').text())) {
			if ( checkItem(k) == true ) {
				card.attr("style","display:none");
			}
		}
	}
}