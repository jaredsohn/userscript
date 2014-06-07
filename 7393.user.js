// ==UserScript==
// @name           JO's Homepage
// @namespace      http://www.myspace.com/jo_recklesslife
// @description    Customized Default Homepage
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var friendid1 = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyProfileHyperLink').href;
var friendid = friendid1.replace(/http.*friendid=/, '');

S =
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer, #squareAd {display:none;}\n";
s+= "#home_friends{position:absolute; top:0px;}\n";
s+= "#squareAd {position:absolute; top:850px; left:-336px;}\n";


html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/vids.myspace.*Videos/, 'comments.myspace.com/index.cfm?fuseaction=user.homeComments&friendID='+friendid+'">Comments');
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/ My Friend Space/, "The Young Hustlas"); 
document.body.innerHTML = html;

GM_addStyle(s);



