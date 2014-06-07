// ==UserScript==
// @name          MySpace
// @namespace    
// @description   Gives menu access to MySpace profile sections (including hidden ones)
// @include       http://*.myspace.com/index.cfm?fuseaction=*&friendid=*
// ==/UserScript==

// find friendID

var path = location.href;
var query = '';
if(path.indexOf('friendID=') > 0)
	query = 'friendID=';
if(path.indexOf('friendid=') > 0)
	query = 'friendid=';
var section = path.split(query);
var friendID = '';
if(section.length > 1)
        friendID = section[1];
section = friendID.split('&');
if(section.length > 1)
        friendID = section[0];
//alert('|'+path+'|'+friendID+'|');

// add menu

var myHaxMenu = document.createElement("div");
myHaxMenu.innerHTML = '<style type="text/css">'
+'<!--'
+'#myhaxlayer #table1 a {'
+'text-decoration: none !important;'
+'color: #000000 !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#myhaxlayer #table1 a:hover {'
+'text-decoration: none !important;'
+'color: #0000FF !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#myhaxlayer #table1 {'
+'background-color: #CCCCCC !important;'
+'}'
+'-->'
+'</style>'
+'<div style="position: absolute; width: 65px; height: 100px; z-index: 1; right; top: 0pt; right: 0pt" id="myhaxlayer">'
+'<table border="0" width="100%" id="table1" bgcolor="#C0C0C0">'
+'<tr><td><p align="left">'
+'<a href="http://collect.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID='+friendID+'">Add</a><br>'
+'<a href="http://groups.myspace.com/index.cfm?fuseaction=groups.addtogroup&friendID='+friendID+'">Add to Group</a><br>'
+'<a href="http://www.myspace.com/index.cfm?fuseaction=block.blockUser&userID='+friendID+'">Block</a><br>'
+'<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.ListAll&friendID='+friendID+'">Blog</a><br>'
+'<a href="http://comments.myspace.com/index.cfm?fuseaction=user&circuitaction=viewProfile_commentForm&friendID='+friendID+'">Comment</a><br>'
+'<a href="http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid='+friendID+'">Profile</a><br>'
+'<a href="http://comments.myspace.com/index.cfm?fuseaction=user.viewComments&friendID='+friendID+'">View Comments</a><br>'
+'<a href="http://home.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID='+friendID+'">View Friends</a><br>'
+'<a href="http://groups.myspace.com/index.cfm?fuseaction=groups.myGroups&userid='+friendID+'">View Groups</a><br>'
+'<a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&friendID='+friendID+'">View Pics</a>'
+'</font></td></tr></table></div>';
document.body.insertBefore(myHaxMenu, document.body.firstChild);

<script type="text/javascript">
var ifpc_current_surface = "profile"; var ifpc_canvas_urltemplate = "http://profile.myspace.com/Modules/Applications/Pages/Canvas.aspx?appId={0}&friendId={1}&appParams={2}"; var ifpc_profile_urltemplate = "http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&appId={0}&friendId={1}&appParams={2}"; var ifpc_home_urltemplate = "http://home.myspace.com/index.cfm?fuseaction=user&appId={0}&friendId={1}&appParams={2}"; var ifpc_supported_postto_targets = ['COMMENTS','BLOG','BULLETINS','PROFILE','SEND_MESSAGE','SHARE_APP','ACTIVITY']; var ifpc_locale = {country: "US", lang: "en"}; var ifpc_ownerid = 108844180; 
MySpace.MDP.Apps.setViewerAppsResource("http://api.myspace.com/v1/users/108844180/applications.jsnp?token=KotefaIwdVeuW%2f6OkEAff88hQYU%3d");MySpace.MDP.Apps.setOwnerAppsResource("http://api.myspace.com/v1/users/108844180/applications.jsnp?token=KotefaIwdVeuW%2f6OkEAff88hQYU%3d&ownerid=108844180&surface=profile");
MySpace.ProfileClientContext = {"ProfileType":2,"ProfileVersion":1};

<script type="text/javascript">
var ifpc_current_surface = "profile"; var ifpc_canvas_urltemplate = "http://profile.myspace.com/Modules/Applications/Pages/Canvas.aspx?appId={0}&friendId={1}&appParams={2}"; var ifpc_profile_urltemplate = "http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&appId={0}&friendId={1}&appParams={2}"; var ifpc_home_urltemplate = "http://home.myspace.com/index.cfm?fuseaction=user&appId={0}&friendId={1}&appParams={2}"; var ifpc_supported_postto_targets = ['COMMENTS','BLOG','BULLETINS','PROFILE','SEND_MESSAGE','SHARE_APP','ACTIVITY']; var ifpc_locale = {country: "US", lang: "en"}; var ifpc_ownerid = 108844180; 
MySpace.MDP.Apps.setViewerAppsResource("http://api.myspace.com/v1/users/108844180/applications.jsnp?token=KotefaIwdVeuW%2f6OkEAff88hQYU%3d");MySpace.MDP.Apps.setOwnerAppsResource("http://api.myspace.com/v1/users/108844180/applications.jsnp?token=KotefaIwdVeuW%2f6OkEAff88hQYU%3d&ownerid=108844180&surface=profile");
MySpace.ProfileClientContext = {"ProfileType":2,"ProfileVersion":1};

</script>
<!-- CMS:c9b2d4e5-659b-4df1-a8aa-191ab1482c5a:20090123.1 -->
<!-- CMS Placement ID = "myspace_profilev1_head" -->
<!-- End CMS Content -->
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
