// ==UserScript==
// @name           RePlurk
// @namespace      http://maxchu.blogspot.com
// @description    RePlurk (version 0.3)
// @include        http://www.plurk.com/*
// @exclude        http://www.plurk.com/_comet/*
// @exclude        http://www.plurk.com/User/*
// @exclude        http://www.plurk.com/i18n/*      
// ==/UserScript==

// RePlurk (http://userscripts.org/scripts/show/39186)
// version 0.3
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// == History ==
// 2012-05-08 V0.3: reuse jquery of plurk
// 2010-03-18 V0.2.2: fixed bug and use jquery 1.4.2 min version
// 2009-07-16 V0.2.1: add some exclude URLs
// 2009-01-15 V0.2: fixed bug and use jquery 1.3 min version
// 2009-01-09 V0.1.1: fixed bug and make replurk message shorter
// 2008-12-25 V0.1: first version


$ = unsafeWindow.jQuery;

var uw = unsafeWindow;
var p = uw.Plurks;
var o_expand;
var o_Plurks_removeExpand;

if(p) {
	o_expand = p.expand;
	o_Plurks_removeExpand = p._removeExpand;

	p.expand = function(div) {
		o_expand(div);

		var ib = $('#input_big').get(0);

		if(ib) {
			var plurk = uw.getPD(div).obj;
			var info_box = $(uw.$dp.info_box);

			if(info_box.children("#RePlurk").length == 0) {
				var rp = $('<a href="#" id="RePlurk">RePlurk</a>').css('float','right').css('right-padding','3px').click(function(){
					doRePlurk(plurk);
				});

				info_box.children(".perma_link").after(rp);
			}
		}
	}

	p._removeExpand = function(D) {
		var info_box = $(uw.$dp.info_box);
		if(info_box.children("#RePlurk").length == 1) {
			$("#RePlurk").remove();
		}
		o_Plurks_removeExpand();
	};
}


function doRePlurk(plurk){
	var link = 'http://plurk.com/p/' + (plurk.plurk_id).toString(36);
	var raw = plurk.content_raw;
	var owner_id = plurk.owner_id;
	var nick = uw.SiteState.getUserById(owner_id).nick_name;

	$('#input_big').val(link + ' ([ReP]) ' + ((nick) ? ('@' + nick + ': ') : '') + raw);
	p._removeExpand();
	uw.MaxChar.updateBig();
}