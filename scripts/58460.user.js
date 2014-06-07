// ==UserScript==
// @name           Xbox Live Info
// @namespace      Xbox Live Info
// @description    Adds some pretty Xbox.com features to profiles.
// @include        http://*bungie.net/Account/Profile.aspx*
// ==/UserScript==

var bpro = document.getElementById('ctl00_mainContent_rdMinDisplay_box_minuteDisplayUL');
var gt = document.getElementById('ctl00_mainContent_header_gamertagLinkFloat').textContent;
var panel = document.getElementsByClassName('boxD_outer');
var xblContainer = document.createElement('div');
xblContainer.style.margin = '0 0 0 648px';
xblContainer.innerHTML = '<div class="boxD_outer"><div class="boxD_inner"><div class="boxD" style="width: 230px;"><h3>Xbox Live Info</h3><div style="margin: 10px 5px 5px 15px; height: 220px;"><span style="font-size: 15px; padding-left: 5px; font-weight: normal;">Gamertag:</span> <a href="http://live.xbox.com/en-US/profile/profile.aspx?GamerTag='+gt+'">'+gt+'</a><br/><br/><iframe src="http://gamercard.xbox.com/'+gt+'.card" style="border: 0; width: 204px; height: 140px;" scrolling="no"></iframe><br/><br/><a class="xbl_btn" href="http://live.xbox.com/en-US/profile/MessageCenter/SendMessage.aspx?gt='+gt+'"><span>Send XBL Message</span></a></div></div></div></div></div>';
panel[0].parentNode.insertBefore(xblContainer, panel[1].nextSibling); 
if (bpro)
{
GM_addStyle(".bpro.littleright .bpro.box { margin-top: 274px; } div.sContent div.infopopup { margin-top: 0; } a.xbl_btn { display: block; height: 24px; width: 150px; background: transparent url(http://apx.comlu.com/uploads/greenbutton-left.gif) no-repeat left top; padding-left: 10px; line-height: 24px; color: #00FF00;} a.xbl_btn span { display: block; height: 24px; width: auto; background: transparent url(http://apx.comlu.com/uploads/greenbutton-right.gif) no-repeat right top; padding-right: 20px; cursor:pointer; } a.xbl_btn:hover { color: #00FF00; text-decoration: none; background-position: left bottom; } a.xbl_btn:hover span { background-position: right bottom;}");
}
else 
{
GM_addStyle("a.xbl_btn { display: block; height: 24px; width: 150px; background: transparent url(http://apx.comlu.com/uploads/greenbutton-left.gif) no-repeat left top; padding-left: 10px; line-height: 24px; color: #00FF00;} a.xbl_btn span { display: block; height: 24px; width: auto; background: transparent url(http://apx.comlu.com/uploads/greenbutton-right.gif) no-repeat right top; padding-right: 20px; cursor:pointer; } a.xbl_btn:hover { color: #00FF00; text-decoration: none; background-position: left bottom; } a.xbl_btn:hover span { background-position: right bottom;}");
}

// ApocalypeX. Sexi. Button.