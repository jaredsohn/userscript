// ==UserScript==
// @name           What.CD :: Highlight Invitees
// @namespace      http://userscripts.org/users/124715
// @description    Highlight your invites throughout the What.CD website
// @include        http*://*what.cd*
// ==/UserScript==

	// user customization settings //
	var id_font_color = "red";	// change to your liking (blue, red, orange, etc)
	var id_font_weight = "bold";	// change to your liking (normal, bold, bolder, lighter, ###)
	var check_interval = 600000;	//amount of time to wait before checking for new upload comments
								// keep to above 5 minutes to reduce load on the server
								// 900k = 15 min, 600k = 10 min, 300k = 5 min
	// user customization settings //
	
	// please do not edit below this line //
	
	var whatcd_base_url = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];
	var pos_start
	var pos_stop
	var account_id
	var user_id
	var user_ids
	var invitees
	var invitee_list = "";
	var lastChecked
	var matches
	var all_links = document.links;
	var current = new Date()
	var uid = location.href.split('/')[3].split('=')[1]; //userid on profiles
	invitees = GM_getValue("invitees", "");
	lastChecked = GM_getValue("lastChecked", "1");

	/* parse out account id */
	pos_start = document.body.innerHTML.indexOf("user\.php\?action=edit\&amp;userid=") + 32;
	pos_stop = document.body.innerHTML.indexOf("\"", pos_start);
	account_id = document.body.innerHTML.substring(pos_start, pos_stop);
	
	/* highlight invitees if found on the page */
	function highlight_invitees() {
			var loc2 = location.href.split('/')[3].split('=')[1];
			if (loc2 != "invitetree" && loc2 != "invite") {
		if ( invitees != "" ) {
			user_ids = invitees.split(",");

			for ( i = 0; i < all_links.length; i++ ) {
				for ( z = 0; z < user_ids.length; z++ ) {
					if (uid == user_ids[z] && location.href.split('/')[3].split('=')[0] == "user.php?id") {//if userid on profile matches your invitee list
					var username = document.title.split(' ')[0];//get username of profile through <title> (crude but works nicely)
					document.body.innerHTML = document.body.innerHTML.replace(username, "<h2><font color=\""+id_font_color+"\">"+username+"</font>"); //highlight on userprofile
					}
					if (all_links[i].href.match("user.php") && (all_links[i].href.indexOf(user_ids[z]) != "-1")) {
if (all_links[i].innerHTML.match("(View)")) { break; } //fix for requests on profile.
else {
						all_links[i].style.color = id_font_color; 
						all_links[i].style.fontWeight = id_font_weight;
}

					}
				}
			}
		}
	}
}

	/* update invitee list if use browses to invite page */
	if ( document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)\/user\.php\?action=invite/) ) {
		invitees = ""
		invitee_list = "";
		
		for ( i = 0; i < all_links.length; i++ ) {
			if (all_links[i].href.match(/user\.php\?id=/) && (all_links[i].href.indexOf(account_id) == "-1") ) {
				user_id = all_links[i].href.substring(all_links[i].href.indexOf("id=") + 3, all_links[i].href.length);
				if ( user_id != account_id ) {
					invitee_list += user_id + ",";
				}
			}
		}

		invitees = invitee_list.substring(0, invitee_list.length - 1);
		GM_setValue("invitees", invitees);
		GM_setValue("lastChecked", String(current.getTime()));
	}
	
	/* to change the "check" interval, please adjust the value at the top of this script */
	if ( !lastChecked || (current.getTime() - lastChecked) > check_interval ) {
		GM_setValue("lastChecked", String(current.getTime()));

		/* check for new invitees */
		GM_xmlhttpRequest({
			method: 'GET',
			url: whatcd_base_url + '/user.php?action=invite',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				if ( responseDetails.status == "200" ) {
					invitees = "";
					invitee_list = "";
					
					matches = responseDetails.responseText.match(/id=[0-9]{1,}/gi);
					if ( matches != null ) {
						for (i = 0; i < matches.length; i++) {
							matches[i] = matches[i].replace("id=", "");
							if ( matches[i] != account_id ) {
								invitee_list += matches[i] + ",";
							}
						}
						invitees = invitee_list.substring(0, invitee_list.length - 1);
						GM_setValue("invitees", invitees);
					}
				}
			}
		});
	}
	
	/* call function to execute highlighting */
	highlight_invitees();