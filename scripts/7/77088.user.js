// ==UserScript==
// @name           Steam Forums 2010 Tweaked by Red_153D & Aemony
// @namespace      http://forums.steampowered.com/forums/
// @description    Original screenshot/mockup by Red_153D. Images, JS and CSS by Aemony.
// @include        http://forums.steampowered.com/forums/*
// ==/UserScript==

// Variables used
var aemonyMainFolder = "http://dl.dropbox.com/u/2161168/steamforum2010tweak/";
var aemonyImgFolder = aemonyMainFolder + "imgs/";

// Imports the custom CSS stylesheet into the forum page, overwriting the necessary code.

function addStyle(style) {
	document.getElementsByTagName("HEAD")[0].appendChild(document.createElement( 'style' )).innerHTML = style.toString();
}

addStyle('@import "' + aemonyMainFolder + 'style.css";')


// Replaces the necessary images to their counterpart

function replaceImages()
{
    var imgs = document.getElementsByTagName("img");
    for (var i=0; i<imgs.length; i++)
      if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/misc/navbits_start.gif")
        imgs[i].src = aemonyImgFolder + "navbits_start.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/misc/navbits_finallink.gif")
        imgs[i].src = aemonyImgFolder + "navbits_finallink.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/misc/menu_open.gif")
        imgs[i].src = aemonyImgFolder + "menu_open.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/statusicon/forum_old.gif")
        imgs[i].src = aemonyImgFolder + "forum_old.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/lastpost.gif")
        imgs[i].src = aemonyImgFolder + "lastpost.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/firstnew.gif")
        imgs[i].src = aemonyImgFolder + "firstnew.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/statusicon/thread.gif")
        imgs[i].src = aemonyImgFolder + "thread.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/statusicon/thread_lock_new.gif")
        imgs[i].src = aemonyImgFolder + "thread_lock.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/statusicon/thread_lock.gif")
        imgs[i].src = aemonyImgFolder + "thread_lock.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/statusicon/post_old.gif")
        imgs[i].src = aemonyImgFolder + "post_old.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/newthread.gif")
        imgs[i].src = aemonyImgFolder + "newthread.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/reply.gif")
        imgs[i].src = aemonyImgFolder + "reply.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/quote.gif")
        imgs[i].src = aemonyImgFolder + "quote.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/multiquote_off.gif")
        imgs[i].src = aemonyImgFolder + "multiquote_off.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/quickreply.gif")
        imgs[i].src = aemonyImgFolder + "quickreply.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/edit.gif")
        imgs[i].src = aemonyImgFolder + "edit.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/threadclosed.gif")
        imgs[i].src = aemonyImgFolder + "threadclosed.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/collapse_tcat.gif")
        imgs[i].src = aemonyImgFolder + "collapse_tcat.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/collapse_tcat_collapsed.gif")
        imgs[i].src = aemonyImgFolder + "collapse_tcat_collapsed.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/collapse_thead.gif")
        imgs[i].src = aemonyImgFolder + "collapse_thead.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/buttons/collapse_thead_collapsed.gif")
        imgs[i].src = aemonyImgFolder + "collapse_thead_collapsed.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/misc/stats.gif")
        imgs[i].src = aemonyImgFolder + "stats.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/statusicon/subforum_old.gif")
        imgs[i].src = aemonyImgFolder + "subforum_old.gif";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/statusicon/forum_old_lock.gif")
        imgs[i].src = aemonyImgFolder + "forum_old_lock.gif";
      else if (imgs[i].src == "http://cdn.store.steampowered.com/public/images/logo_valve_footer.jpg")
        imgs[i].src = aemonyImgFolder + "logo_valve_footer.jpg";
      else if (imgs[i].src == "http://forums.steampowered.com/forums/v4_images/misc/tree_ltr.gif")
        imgs[i].src = aemonyImgFolder + "tree_ltr.gif";
}

replaceImages();

// Overwrite the original QuickReply function to point towards the images counterparts

function qr_do_ajax_post()
{
	if (xml.handler.readyState == 4 && xml.handler.status == 200)
	{
		if (xml.handler.responseXML)
		{
			document.body.style.cursor = 'auto';
			fetch_object('qr_posting_msg').style.display = 'none';
			qr_posting = 0;

			if (fetch_tag_count(xml.handler.responseXML, 'postbit'))
			{
				ajax_last_post = xml.fetch_data(fetch_tags(xml.handler.responseXML, 'time')[0]);
				qr_disable_controls();
				qr_hide_errors();

				var postbits = fetch_tags(xml.handler.responseXML, 'postbit');
				for (var i = 0; i < postbits.length; i++)
				{
					var newdiv = document.createElement('div');
					newdiv.innerHTML = xml.fetch_data(postbits[i]);
// BEGIN CUSTOM CHANGES

var myString = newdiv.innerHTML;

myString = myString.replace("v4_images/buttons/edit.gif", "http://dl.dropbox.com/u/2161168/steamforum2010tweak/imgs/edit.gif");
myString = myString.replace("v4_images/buttons/quote.gif", "http://dl.dropbox.com/u/2161168/steamforum2010tweak/imgs/quote.gif");
myString = myString.replace("v4_images/buttons/multiquote_off.gif", "http://dl.dropbox.com/u/2161168/steamforum2010tweak/imgs/multiquote_off.gif");
myString = myString.replace("v4_images/buttons/quickreply.gif", "http://dl.dropbox.com/u/2161168/steamforum2010tweak/imgs/quickreply.gif");

newdiv.innerHTML = myString;

// END CUSTOM CHANGES
					var lp = fetch_object('lastpost');
					var lpparent = lp.parentNode;
					var postbit = lpparent.insertBefore(newdiv, lp);

					PostBit_Init(postbit, postbits[i].getAttribute('postid'));
				}

				// unfocus the qr_submit button to prevent a space from resubmitting
				if (fetch_object('qr_submit'))
				{
					fetch_object('qr_submit').blur();
				}
			}
			else
			{
				if (!is_saf)
				{
					// this is the nice error handler, of which Safari makes a mess
					var errors = fetch_tags(xml.handler.responseXML, 'error');

					var error_html = '<ol>';
					for (var i = 0; i < errors.length; i++)
					{
						error_html += '<li>' + xml.fetch_data(errors[i]) + '</li>';
					}
					error_html += '</ol>';

					qr_show_errors('<ol>' + error_html + '</ol>');

					if (is_ie)
					{
						xml.handler.abort();
					}

					return false;
				}

				// this is the not so nice error handler, which is a fallback in case the previous one doesn't work

				qr_repost = true;
				fetch_object('qrform').submit();
			}
		}
		else
		{
			qr_repost = true;
			fetch_object('qrform').submit();
		}

		if (is_ie)
		{
			// in my tests, FF freaks out if I do this abort call here...
			// however, it seems to be necessary (in local tests) for IE
			xml.handler.abort();
		}
	}
}


// Overwrites the original function for collapsing/expanding categories to point towards the images counterparts

function Sorky01_ShowOrHide( n )
{
	span = fetch_object("Sorky01_ShowOrHide_span_" + n);
	img = fetch_object("Sorky01_ShowOrHide_img_" + n);

	if (span.style.display == "none")
	{
		span.style.display = "";
		img.src = "http://dl.dropbox.com/u/2161168/steamforum2010tweak/imgs/collapse_tcat.gif";
	}
	else
	{
		span.style.display = "none";
		img.src = "http://dl.dropbox.com/u/2161168/steamforum2010tweak/imgs/collapse_tcat_collapsed.gif";
	}

	return false;
}

// Embeds the new, customized, functions into the page

function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString();
}

embedFunction(qr_do_ajax_post);
embedFunction(Sorky01_ShowOrHide);