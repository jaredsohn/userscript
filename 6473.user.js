// ==UserScript==
// @name           LJ Message Center: Quick Track
// @namespace      afuna.livejournal.com
// @description    Track entries with one click
// @include        http://*.livejournal.com*
// ==/UserScript==

/*== Some notes == 
	- Unwatching with one click does not work
	- You can still go to the interim page by ctrl/cmd/shift-clicking on the link (depends on the browser and OS)
	- (20070414) You can set the default notification mode to email/im/just message center by right-clicking on the monkey status bar icon, and then going to User Script Commands->(toggle your desired option). Please note that the menu text won't change until you refresh. As far as I can tell, this is a limitation of Greasemonkey and there's no way around it
	- Don't know what it does when you exceed your limit of tracked posts
	- Will change the icon/text to show that the entry is being tracked. This might not match the layout if you've customized icons/text, but it will show up as normal once you refresh the page
	- Slight conflict with the script to show entry subject. You'll need to visit the manage subscriptions page to grab the list of subjects instead of having the script do it for you automatically
*/
function quick_track(url)
{
	return function(event) {
		track_url = url;
			GM_xmlhttpRequest({
				method: 'GET',
				url: track_url,
				onload: function(responseDetails) {
					if (responseDetails.readyState == 4) {
						if (responseDetails.status != 200) return;
	
						index  = responseDetails.responseText.indexOf('lj_form_auth')+21;
						lj_form_auth = responseDetails.responseText.slice(index);
						lj_form_auth = lj_form_auth.slice(0,lj_form_auth.indexOf('"'));
						lj_form_auth = escape(lj_form_auth);
						lj_form_auth=lj_form_auth.replace("+", "%2B");
						lj_form_auth=lj_form_auth.replace("/", "%2F"); 
						
						index = responseDetails.responseText.indexOf('SubscriptionInboxCheck')+28;
						pending = responseDetails.responseText.slice(index);
						pending = pending.slice(0,pending.indexOf('"'));

                        by_email = GM_getValue("by_email", false)
                            ? "&" + pending.replace("4-1", "0-2") + "=on" 
                            : "";
                        by_sms = GM_getValue("by_SMS", false)
                            ? "&" + pending.replace("4-1", "0-3") + "=on" 
                            : "";
                        by_im = GM_getValue("by_IM", false)
                            ? "&" + pending.replace("4-1", "0-4") + "=on"
                            : "";

						
						GM_xmlhttpRequest({
							method: 'POST',
							url: 'http://www.livejournal.com/manage/subscriptions/',
							data: "lj_form_auth="+lj_form_auth+"&"+pending+"=on&mode=save_subscriptions"+by_email+by_sms+by_im,
							headers: {'Content-type': 'application/x-www-form-urlencoded'},
							onload: function(details) {
								if(details.readyState == 4)  {
									if (details.status != 200) return;
									
									// not bothering to distinguish whether it's an image or a link
									// also, not bothering to try to fit it into the layout since it's just a temporary indicator
									event.target.setAttribute("src", "http://stat.livejournal.com/img/btn_tracking.gif");
									event.target.textContent = "Tracked";
								}
							}
						}); 
					}
				}
			
			});
	}
}

function toggleMenu(target)
{
    if(GM_getValue("by_"+target, false))
    {
        GM_registerMenuCommand("Disable notifications via "+target, function(event)
        {
            GM_setValue("by_"+target, false);
        });
    }
    else
    {
        GM_registerMenuCommand("Enable notifications via "+target, function(event)
        {
            GM_setValue("by_"+target, true);
        });
    }
}

toggleMenu("email");
toggleMenu("IM");
//toggleMenu("SMS");

xpath = document.evaluate("//a[contains(@href, 'subscriptions/entry.bml?journal=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(i = 0; i < xpath.snapshotLength; ++i)
{
	a = xpath.snapshotItem(i);
	a.setAttribute("onClick", "return false");
	a.addEventListener("click", quick_track(a.href) , false);
}
