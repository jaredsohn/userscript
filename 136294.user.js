// ==UserScript==
// @name        FlickrSoftBlock
// @namespace   vispillo
// @include     http://www.flickr.com/*
// @require http://userscripts.org/scripts/source/78952.user.js
// @version     1
// ==/UserScript==

function getJSVariable (regex) {
  // Credit for this function goes to Alesa Dam
  // Some slight modifications for use with jQuery
  var retval;
  jQuery('script').each( function (i,script) {
    if (retval != undefined) {
      return;
    }
    var html = script.innerHTML;
    try {
      retval = html.match(regex)[1];
    } catch (e) {
    }
  });
  return retval
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
}

var mgc = getJSVariable(/\"?auth_hash\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
var nsid = getJSVariable(/\"nsid\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
var trg = '';
unsafeWindow.console.log(nsid);
unsafeWindow.console.log(mgc);

if (jQuery('#person_menu_other_div').length > 0) {
  addGlobalStyle('#softblockclick { display: block;color:#868686; font: 12px Arial,Helvetica,sans-serif;margin: 2px 5px;padding: 1px 4px;text-align:left;} #softblockclick:link {color: #868686; text-decoration:none} #softblockclick:visited {color: #868686; text-decoration:none} #softblockclick:hover {background: none repeat scroll 0 0 #4c93e9; color:#ffffff; text-decoration:none} #softblockclick:active {background: none repeat scroll 0 0 #4c93e9; color: #ffffff; text-decoration}');
  jQuery('#person_menu_other_div').append('<a id="softblockclick" role="menuitem" >SoftBlock</a>');
  jQuery('#personmenu_contact_link').bind("DOMAttrModified propertychange", function(e) {
    var evt = jQuery(e.target);
    if (evt.attr('href') != undefined) {
      unsafeWindow.console.log('Change - new target id is: ' + evt.attr('href').split(/=/)[1]);
      trg = evt.attr('href').split(/=/)[1];
      if (e.newValue.split(/\//)[2] == nsid) {
			  unsafeWindow.console.log('changed, hiding...');
			  jQuery('#softblockclick').parent().hide();
			}
			else {
			  unsafeWindow.console.log('changed, showing...');
			  jQuery('#softblockclick').parent().show();
			}
    }
  });
  jQuery('#softblockclick').click(function () {
    var that = this;
		jQuery(that).html('Blocking, please wait');
		jQuery.post("/ignore.gne",{confirm : 'on', done: 1, id: trg, magic_cookie: mgc }, function (data) {
		  jQuery(that).html('Unblocking, please wait');
		  jQuery.post("/ignore.gne",{confirm : 'on', done: 1, id: trg, magic_cookie: mgc }, function (data) {
		    jQuery(that).html('All done!');
		  });
		});
  });
}
else {
  jQuery(document).bind('DOMNodeInserted', function(event) {
		  var evt = jQuery(event.target);
		  //if (evt.hasClass('personmenu-bd')) {
		  if (evt.attr('role') == 'menu') {
			  if (evt.hasClass('modified')) {
			
			  } else {
				  evt.addClass('modified');
				  unsafeWindow.console.log(evt);
				  unsafeWindow.console.log('menu added, id is:' + evt.parent().parent().find('div.personmenu-hd a.personmenu-icon-link').attr('href').split(/\//)[2]);
				  trg = evt.parent().parent().find('div.personmenu-hd a.personmenu-icon-link').attr('href').split(/\//)[2];
				  jQuery('ul[role=menu]').append('<li class="personmenu-block"><a id="softblockclick" class="personmenu-item" role="menuitem" >SoftBlock</a></li>');
				  jQuery('#softblockclick').click(function () {
					  var that = this;
					  jQuery(that).html('Blocking, please wait');
					  jQuery.post("/ignore.gne",{confirm : 'on', done: 1, id: trg, magic_cookie: mgc }, function (data) {
						  jQuery(that).html('Unblocking, please wait');
						  jQuery.post("/ignore.gne",{confirm : 'on', done: 1, id: trg, magic_cookie: mgc }, function (data) {
							  jQuery(that).html('All done!');
						  });
					  });
				  });
				  if (evt.parent().parent().find('div.personmenu-hd a.personmenu-icon-link').attr('href').split(/\//)[2] == nsid) {
					  unsafeWindow.console.log('initially added, hiding...');
					  jQuery('#softblockclick').parent().hide();
				  }
				  evt.parent().parent().find('div.personmenu-hd a.personmenu-icon-link').bind("DOMAttrModified propertychange", function(e) {
					  if (e.attrName == 'href') {
						  if (e.newValue.split(/\//)[2] == nsid) {
							  unsafeWindow.console.log('changed, hiding...');
							  jQuery('#softblockclick').parent().hide();
							  trg = evt.parent().parent().find('div.personmenu-hd a.personmenu-icon-link').attr('href').split(/\//)[2];
						  }
						  else {
							  unsafeWindow.console.log('changed, showing...');
							  trg = evt.parent().parent().find('div.personmenu-hd a.personmenu-icon-link').attr('href').split(/\//)[2];
							  jQuery('#softblockclick').parent().show();
						  }
						  unsafeWindow.console.log('old value was:'+e.prevValue.split(/\//)[2]+', and now it is: '+e.newValue.split(/\//)[2]);
					  }
				  });
			  }
		  }
  });
}
