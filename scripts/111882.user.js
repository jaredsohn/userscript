// ==UserScript==
// @name           Modd
// @namespace      None
// @description    None
// @include        http://*.roblox.*
// ==/UserScript==



if(document.getElementById("AdvertisingLeaderboard"))
{
var accept = null;
if(document.getElementById("ctl00_ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus"))
{
accept = document.getElementById("ctl00_ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus");
}
if(document.getElementById("ctl00_ctl00_ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus"))
{
accept = document.getElementById("ctl00_ctl00_ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus");
}

if(document.getElementById("ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus"))
{
accept = document.getElementById("ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus");
}

if(accept)
{
if(accept.innerHTML == "Logout")
{
document.getElementById("AdvertisingLeaderboard").innerHTML = "<div class=\"boxed\" style=\"border: 1px solid green ;\"><a href=\"http://www.roblox.com/My/Places.aspx\">Manage Your Places</a><br/><a href=\"http://www.roblox.com/My/Character.aspx\">Edit you Character</a></div>";
}
}
}

if(document.getElementById("ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus"))
{
document.getElementById("ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus").href = "javascript:logout = confirm('Are you sure you want to logout?'); if(logout==true){__doPostBack('ctl00$ctl00$BannerOptionsLoginView$BannerOptions_Authenticated$lsLoginStatus$ctl00','');} void 0;";
}


if(document.getElementById("ctl00_ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus"))
{
document.getElementById("ctl00_ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus").href = "javascript:logout = confirm('Are you sure you want to logout?'); if(logout==true){__doPostBack('ctl00$ctl00$BannerOptionsLoginView$BannerOptions_Authenticated$lsLoginStatus$ctl00','');} void 0;";
}

if(document.getElementById("ctl00_ctl00_ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus"))
{
document.getElementById("ctl00_ctl00_ctl00_BannerOptionsLoginView_BannerOptions_Authenticated_lsLoginStatus").href = "javascript:logout = confirm('Are you sure you want to logout?'); if(logout==true){__doPostBack('ctl00$ctl00$BannerOptionsLoginView$BannerOptions_Authenticated$lsLoginStatus$ctl00','');} void 0;";
}

if(document.getElementById("party_invite_instructions"))
{
document.getElementById("party_invite_instructions").innerHTML='<input type="text" onkeydown="return Party.ProcessKey("party_my_invite_name",event)" class="party_invite_box" id="party_my_invite_name" style="color: rgb(136, 136, 136);"><input type="button" value="Invite" onclick=\' var player_name = document.getElementById("party_my_invite_name").value; aprove=confirm("Are you sure you want to invite "+player_name+"?"); if(aprove){Party.DoInvite("party_my_invite_name")}; if(!aprove) {document.getElementById("party_my_invite_name").value=player_name;}; void 0; \'>';
}



