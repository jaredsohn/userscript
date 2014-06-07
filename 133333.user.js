// ==UserScript==
// @name    Image Resizer for HackForums.net
// @namespace  spafic/imgsize
// @description  Resizes images posted by users on HackForums.net
// @include  *hackforums.net/showthread.php*
// @include  *hackforums.net/usercp.php*
// @include  *hackforums.net/private.php*
// @include  *hackforums.net/usercp.php?action=imgsize
// @version  1.0.0
// ==/UserScript==

function DoWriteHTML() {
	var mynewhtml = document.createElement('html');
	mynewhtml.innerHTML = '<head>\
	<title>Hack Forums - Edit Image Resizer</title>\
	<script type="text/javascript" src="http://cdn2.hackforums.net/jscripts/prototype.js?ver=1603"></script>\
	<script type="text/javascript" src="http://cdn2.hackforums.net/jscripts/general.js?ver=1603"></script>\
	<script type="text/javascript" src="http://cdn2.hackforums.net/jscripts/popup_menu.js?ver=1600"></script>\
	<link type="text/css" rel="stylesheet" href="http://cdn2.hackforums.net/cache/themes/theme3/global.css" />\
	<link type="text/css" rel="stylesheet" href="http://cdn2.hackforums.net/cache/themes/theme3/usercp.css" />\
\
	<script type="text/javascript">\
	<!--\
		var cookieDomain = ".hackforums.net";\
		var cookiePath = "/";\
		var cookiePrefix = "";\
		var deleteevent_confirm = "Are you sure you want to delete this event?";\
		var removeattach_confirm = "Are you sure you want to remove the selected attachment from this post?";\
		var loading_text = "Loading. <br />Please Wait..";\
		var saving_changes = "Saving changes..";\
		var use_xmlhttprequest = "1";\
		var my_post_key = "482cec3cef4ffe53e5d2d04c3fb5652e";\
		var imagepath = "http://cdn2.hackforums.net/images/blackreign";\
	// -->\
	</script>\
</head>\
\
<body>\
	<div id="container" style="background-color:black;background-image:none;">\
		<a name="top" id="top"></a>\
		<div id="header">\
			<div class="logo"><a href="http://www.hackforums.net/"><img src="http://cdn2.hackforums.net/images/blackreign/logo.jpg" alt="Hack Forums" title="Hack Forums" /></a></div>\
			<div class="menu">\
				<ul>\
					<li><a href="http://www.hackforums.net/"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/home.gif" alt="Home Page" title="Hack Forums" />Home</a></li>\
					<li><a href="http://www.hackforums.net/upgrade.php"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/subscribe.gif" alt="" title="upgrade your account" />Upgrade</a></li>\
					<li><a href="http://www.hackforums.net/search.php"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/search.gif" alt="" title="" />Search</a></li>\
					<li><a href="http://www.hackforums.net/memberlist.php"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/memberlist.gif" alt="" title="" />Member List</a></li>\
					<li><a href="http://www.hackforums.net/misc.php?action=help"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/help.gif" alt="" title="" />Help</a></li>\
					<li><a href="http://twitter.com/hackforumsnet"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/twitter.gif" alt="contact" title="twitter" />Follow</a></li>\
					<li><a href="contact.php"><img src="http://cdn2.hackforums.net/images/blackreign/toplinks/contact.gif" alt="contact" title="contact" />Contact</a></li>\
				</ul>\
			</div>\
			<hr class="hidden" />\
		</div>\
		<br />\
		<div id="content">\
			<div class="navigation">\
				<a href="http://www.hackforums.net/index.php">Hack Forums</a> / <a href="usercp.php">User Control Panel</a> / <span class="active">Edit Image Resizer</span>\
			</div>\
			<br />\
			<div class="quick_keys">\
				<form action="" method="post" onsubmit="return false;">\
					<input type="hidden" name="my_post_key" value="482cec3cef4ffe53e5d2d04c3fb5652e" />\
					<table width="100%" border="0" align="center">\
					<tr>\
						<td width="180" valign="top">\
							<table border="0" cellspacing="1" cellpadding="4" class="tborder">\
							<tr>\
								<td class="thead"><strong>Menu</strong></td>\
							</tr>\
							<tr>\
								<td class="trow1 smalltext"><a href="usercp.php" class="usercp_nav_item usercp_nav_home">User CP Home</a></td>\
							</tr>\
							<tr>\
								<td class="tcat">\
									<div class="expcolimage"><img src="http://cdn2.hackforums.net/images/blackreign/collapse.gif" id="usercppms_img" class="expander" alt="[-]"/></div>\
									<div><span class="smalltext"><strong>Messenger</strong></span></div>\
								</td>\
							</tr>\
							<tbody style="" id="usercppms_e">\
								<tr><td class="trow1 smalltext"><a href="private.php?action=send" class="usercp_nav_item usercp_nav_composepm">Compose</a></td></tr>\
								<tr>\
									<td class="trow1 smalltext">\
										<div><a href="private.php?fid=1" class="usercp_nav_item usercp_nav_pmfolder">Inbox</a></div>\
										<div><a href="private.php?fid=2" class="usercp_nav_item usercp_nav_sub_pmfolder">Sent</a></div>\
										<div><a href="private.php?fid=3" class="usercp_nav_item usercp_nav_sub_pmfolder">Drafts</a></div>\
										<div><a href="private.php?fid=4" class="usercp_nav_item usercp_nav_trash_pmfolder">Trash</a></div>\
									</td>\
								</tr>\
								<tr><td class="trow1 smalltext"><a href="private.php?action=tracking" class="usercp_nav_item usercp_nav_pmtracking">Tracking</a></td></tr>\
								<tr><td class="trow1 smalltext"><a href="private.php?action=folders" class="usercp_nav_item usercp_nav_pmfolders">Edit Folders</a></td></tr>\
							</tbody>\
							<tr>\
								<td class="tcat">\
									<div class="expcolimage"><img src="http://cdn2.hackforums.net/images/blackreign/collapse.gif" id="usercpprofile_img" class="expander" alt="[-]" title="[-]" /></div>\
									<div><span class="smalltext"><strong>Your Profile</strong></span></div>\
								</td>\
							</tr>\
							<tbody style="" id="usercpprofile_e">\
								<tr>\
									<td class="trow1 smalltext">\
										<div><a href="usercp.php?action=profile" class="usercp_nav_item usercp_nav_profile">Edit Profile</a></div>\
										<div><a href="usercp.php?action=changename" class="usercp_nav_item usercp_nav_username">Change Username</a></div>\
										<div><a href="usercp.php?action=password" class="usercp_nav_item usercp_nav_password">Change Password</a></div>\
										<div><a href="usercp.php?action=email" class="usercp_nav_item usercp_nav_email">Change Email</a></div>\
										<div><a href="usercp.php?action=avatar" class="usercp_nav_item usercp_nav_avatar">Change Avatar</a></div>\
										<div><a href="usercp.php?action=editsig" class="usercp_nav_item usercp_nav_editsig">Change Signature</a></div>\
									</td>\
								</tr>\
								<tr>\
									<td class="trow1 smalltext">\
										<a href="usercp.php?action=options" class="usercp_nav_item usercp_nav_options">Edit Options</a>\
									</td>\
								</tr>\
								<tr>\
									<td class="trow1 smalltext"><a href="usercp.php?action=preset" class="usercp_nav_item usercp_nav_editsig">Edit Post Preset</a></td>\
								</tr>\
								<tr>\
									<td class="trow1 smalltext"><a href="usercp.php?action=imgsize" class="usercp_nav_item usercp_nav_avatar">Image Resizer</a></td>\
								</tr>\
							</tbody>\
							<tr>\
								<td class="tcat">\
									<div class="expcolimage">\
										<img src="http://cdn2.hackforums.net/images/blackreign/collapse.gif" id="usercpmisc_img" class="expander" alt="[-]" title="[-]" />\
									</div>\
									<div>\
										<span class="smalltext"><strong>Miscellaneous</strong></span>\
									</div>\
								</td>\
							</tr>\
							<tbody style="" id="usercpmisc_e">\
								<tr>\
									<td class="trow1 smalltext">\
										<a href="usercp.php?action=usergroups" class="usercp_nav_item usercp_nav_usergroups">Group Memberships</a>\
									</td>\
								</tr>\
								<tr>\
									<td class="trow1 smalltext">\
										<a href="usercp.php?action=editlists" class="usercp_nav_item usercp_nav_editlists">Buddy/Ignore List</a>\
									</td>\
								</tr>\
								<tr>\
									<td class="trow1 smalltext">\
										<a href="usercp.php?action=attachments" class="usercp_nav_item usercp_nav_attachments">Manage Attachments</a>\
									</td>\
								</tr>\
								<tr>\
									<td class="trow1 smalltext">\
										<a href="usercp.php?action=drafts" class="usercp_nav_item usercp_nav_drafts">Saved Drafts </a>\
									</td>\
								</tr>\
								<tr>\
									<td class="trow1 smalltext">\
										<a href="usercp.php?action=subscriptions" class="usercp_nav_item usercp_nav_subscriptions">Subscribed Threads</a>\
									</td>\
								</tr>\
								<tr>\
									<td class="trow1 smalltext">\
										<a href="usercp.php?action=forumsubscriptions" class="usercp_nav_item usercp_nav_fsubscriptions">Forum Subscriptions</a>\
									</td>\
								</tr>\
								<tr>\
									<td class="trow1 smalltext">\
										<a href="member.php?action=profile&amp;uid=47962" class="usercp_nav_item usercp_nav_viewprofile">View Profile</a>\
									</td>\
								</tr>\
							</tbody>\
						</table>\
					</td>\
					<td valign="top">\
						<table border="0" cellspacing="1" cellpadding="4" class="tborder">\
							<tr>\
								<td class="thead" colspan="2">\
									<strong>Preview Image Size</strong>\
								</td>\
							</tr>\
							<tr>\
								<td class="trow1" width="100%">\
									<center><img src="http://cloud.steampowered.com/ugc/524907501770484828/507DC9BE6A79DCD6D57C5E00A38DA98584FCF80A/" width="'+localStorage.getItem("hf_imagesize_width")+'" height="'+localStorage.getItem("hf_imagesize_height")+'" id="image_size" /></center>\
								</td>\
							</tr>\
						</table>\
						<br />\
						<table border="0" cellspacing="1" cellpadding="4" class="tborder">\
							<tr>\
								<td class="thead" colspan="2">\
									<strong>Edit Image Size</strong>\
								</td>\
							</tr>\
							<tr>\
								<td class="trow1" width="20%">\
									Note, you must keep "px" in the textareas, otherwise this will not work!\
								</td>\
								<td class="trow1" width="80%">\
									<input id="width" type="text" length="4" value="'+localStorage.getItem("hf_imagesize_width")+'"> x <input id="height" type="text" length="4" value="'+localStorage.getItem("hf_imagesize_height")+'" >\
								</td>\
							</tr>\
						</table>\
						<br />\
						<table border="0" cellspacing="1" cellpadding="4" class="tborder">\
							<tr>\
								<td class="thead" colspan="2">\
									<strong>Options</strong>\
								</td>\
							</tr>\
							<tr>\
								<td class="trow1" colspan="3">\
									<div align="center">\
										<input type="submit" class="button" value="Save Image Size" name="me_button" id="me_button" onclick="if (typeof(localStorage) == \'undefined\' ) { alert(\'Your browser does not support HTML5 localStorage. Try upgrading.\');	} else { try { localStorage.setItem(\'hf_imagesize_width\',document.getElementById(\'width\').value);localStorage.setItem(\'hf_imagesize_height\',document.getElementById(\'height\').value) } catch (e) { if (e == QUOTA_EXCEEDED_ERR) { alert(\'Quota exceeded!\'); } } } document.location = \'./usercp.php?action=imgsize\';" />\
									</div>\
								</td>\
							</tr>\
						</table>\
					</td>\
				</form>\
			</div>\
			<br />\
		</div>\
		<br />\
	</div>\
	<br class="clear" />\
</body>';
document.body.appendChild(mynewhtml);
document.getElementById("image_size").style.width = localStorage.getItem("hf_imagesize_width");
document.getElementById("image_size").style.height = localStorage.getItem("hf_imagesize_height");
}

if((document.location.toString().indexOf('usercp.php')!=-1)|(document.location.toString().indexOf('private.php')!=-1)&&(document.location.toString().indexOf('action=imgsize')==-1)) {
	var workarea = document.getElementById('usercpprofile_e');
	var mynewtr = document.createElement('tr');
	mynewtr.innerHTML = '<td class="trow1 smalltext"><a href="usercp.php?action=imgsize" class="usercp_nav_item usercp_nav_avatar">Image Resizer</a></td>';
	workarea.appendChild(mynewtr);
} else if(document.location.toString().indexOf('usercp.php?action=imgsize')!=-1) {
	DoWriteHTML();
} else {
	var workarea = document.getElementsByClassName("post_body")[0];
	var images = workarea.getElementsByTagName("img");
	for(i=0;i<images.length;i++) {
		images[i].style.maxWidth = localStorage.getItem("hf_imagesize_width");
		images[i].style.maxHeight = localStorage.getItem("hf_imagesize_height");
	}
}