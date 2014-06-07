// ==UserScript==
// @name          one free ruuls
// @author         NoTriX
// @namespace      http://www.one.lt
// @description    Free your one.lt from adds
// @include        http://w*.one.lt/*
// @email          notrix@gmail.com
// @version        1.2 BETA
// ==/UserScript==

body {
	margin: 8px;
	padding: 0;
    font-size: 10px;
    font-family: Arial, Tahoma, Helvetica, sans-serif;
    min-height: 100%;    
}

#center{
	text-align: center;
}

#wrap { width: 990px; margin: 0 auto; padding: 7px; text-align: left; }
body#popup {
    margin: 0px;
    padding: 0px;
    width: auto;
}

form {
    margin: 0px;
    padding: 0px;
}

h1 {
    margin-top: 10px;
    font-size: 25px;
    font-weight: bold;
    color: #FF9900;
}

a {
    outline:none;
}

a:link, a:visited {
    text-decoration: underline;
    color: black;
    font-size: 11px;
}

a:hover, a:active {
    text-decoration: underline;
    color: black;
    font-size: 11px;
}

a img {
    border: 0px;
}

acronym {
    border-bottom: none;
}

pre {
    text-transform: none;
}

hr {
    color: #FF9900;
    height: 1px;
    width: 95%
}

td.markScale {
    background-color:#FFF;
}

/* deprecated */

.header {
    color: #d1481e;
}

.MoreGrayBg {background-color:#E2E2E2;}
.whiteBg {background-color:#FFFFFF;}
.yellowBg {background-color:#FFFF99;}
.header {font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 25px; font-weight: bold;}

a.smallnormalBlue {font-size: 11px; color:#000;}
a.smallnormalBlue:visited {font-size: 11px; color:#000;}
a.smallnormalBlue:hover {font-size: 11px; color:#F00;}

a span.smallnormalBlue {font-size: 11px; color:white;}
a span.smallnormalBlue:visited {font-size: 11px; color:white;}
a span.smallnormalBlue:hover {font-size: 11px; color:white;}

.smallnormal { font-size: 11px; font-weight: normal;}
.smallnormalGray { font-size: 11px; font-weight: normal; color:#FFF;}
.smallnormalMoreGray { font-size: 11px; font-weight: normal; color:#FFF;}
.smallnormalRed { font-size: 11px; font-weight: normal; color:#FF0000;}
.smallnormalBlue { font-size: 11px; color:#0000FF;}
.smallnormalSelect {font-size: 11px; font-weight: normal; color: #000;}
.smallbold { font-size: 11px; font-weight: bold;}
.smallboldGray { font-size: 11px; font-weight: bold; color: #FFF;}
.smallboldRed { font-size: 11px; font-weight: bold; color:#FF0000;}
.smallboldOrange { font-size: 11px; font-weight: bold; color:#FFFFFF;}
.smallboldBlue { font-size: 11px; font-weight: bold; color:#0000FF;}
.bignormal { font-size: 13px; font-weight: normal;}
.bigbold { font-size: 13px; font-weight: bold;}

.cat_adbox {
	height: 16px;
}

div.toggleOpen {
	height: 16px;
	width: 20px;
	cursor: pointer;
	background: url( /res/dk/leopard/icons/categories/plus_white.gif ) no-repeat left;
}

div.toggleClosed {
	height: 16px;
	width: 20px;
	cursor: pointer;
	background: url( /res/dk/leopard/icons/categories/minus_white.gif ) no-repeat left;
}

#onePartnersAdbox a {
	display: block;
	padding-left: 5px;
}

#article #articleText div {
	background-color: #fff;
	color: #000;
	padding: 8px;
	border: 1px solid #878787;
}

#article #articleText p {
	color: #000;
}

#articleCommentsArea {
	background-color: #fff;
}

#articleCommentsArea .articleComment p {
	color: #000;
}

#forumMessagesArea p, #forumMessagesArea div {
	color: #000;
}

.clubsSmallGrey {
	color: #878787;
	font-size: 11px;
}

div.portletBody #articleCommentsArea .clubsSmallBlue, div.portletBody #forumMessagesArea .clubsSmallBlue,
div.portletBody #articleCommentsArea .articleCommentArea a, div.portletBody #forumMessagesArea .messageBlock a {
	font-size: 11px;
	color :#0000FF !important;
}

.smallNormalGreyNew {
	font-size: 11px;
	color: #fff;
}

.portletBody #forumMessagesArea .smallboldRed {
	color:#FF0000;
}

div#articleCommentsNavigation span.smallnormal, div#articleCommentsNavigation span.smallnormal .tableNavigationDisabled, div#articleCommentsNavigation span.smallnormal a {
	color: #fff !important;
}

#borderBottomGray { border-bottom: 1px solid white; border-width: 0px 0px 1px 0px; padding-bottom: 8px; }

#borderForums { text-align: left; border-color: white; border-width: 1px; border-width: 1px 0px 0px 0px; border-style: solid; }

#borderAlbums { text-align: center; padding: 5px; border-color: white; border-width: 1px; border-style: solid; }

.titleMessage{ font-size: 14px; font-weight: bold;}
.teamName{ font-size: 14px; font-weight: bold;}
.result{ font-size: 14px; font-weight: bold;}
.error{ font-size: 12px; color: red;}
.descriptionHeader{font-size: 14px; color: #FF9900; font-weight: bold;}
.ornageLink:link,
.ornageLink{font-size: 13px; color: #FF9900; font-weight: bold;text-decoration: underline;}


.tob-close-block {
  position: relative;
  background: no-repeat 50% 50%;
  text-align: center;
}
.tob-close, .tob-title {
  position: absolute;
  top: 0; right: 0;
  text-indent: -999em;
  font-size: 1px;
  background: no-repeat 0 0;
  overflow: hidden;
}

.tob-title { width: 100%; height: 100%; }
.tob-close { width: 12px; height: 13px; }

.tob-750x100-top { width: 750px; height: 100px; }
.tob-750x100-top .tob-title { right: -12px; width: 12px; background-position: 100% 50%; }
.tob-750x100-top .tob-close { right: -12px; width: 12px; background-position: 0 0; }
/*
.tob-468x310, .tob-468x60 { padding: 4px 0 4px 0; margin: 0 7px 0 19px; height: 60px; }
.tob-468x310 .tob-title, .tob-468x60 .tob-title { left: -12px; width: 12px; background-position: 0 50%; }
.tob-468x310 { height: 310px; }
*/
.tob-468x310, .tob-544x150, .tob-750x100-bottom,
.tob-180x80, .tob-180x150, .tob-512x64 { margin: 13px 7px 0; height: 150px; width: 202px; }

.tob-468x310 .tob-title, .tob-544x150 .tob-title,
.tob-180x80 .tob-title,
.tob-180x150 .tob-title, .tob-750x100-bottom .tob-title,
.tob-512x64 .tob-title { height: 13px; top: -13px; background-position: 50% 0; }
.tob-468x310 .tob-close, .tob-544x150 .tob-close,
.tob-180x80 .tob-close,
.tob-180x150 .tob-close, .tob-750x100-bottom .tob-close,
.tob-512x64 .tob-close { top: -13px; }

.tob-750x100-bottom,
.tob-468x310, .tob-544x150, .tob-512x64 { height: auto; width: 544px; }
.tob-750x100-bottom { width: 750px; }
.tob-180x80 { height: 80px; margin: 13px 0 0; }

.tob-line { margin: 0 8px 2px; width: 200px; height: 11px; background: none !important; overflow: hidden; }
.tob-line .tob-title { background-position: 50% 0; }

.tob-close-block, .tob-close, .tob-title { background-image: url(/res/dk/one/icons/labels/tob.png); }
.tob-lang-ru, .tob-lang-ru .tob-close, .tob-lang-ru .tob-title { background-image: url(/res/dk/one/icons/labels/tob-ru.png); }

.pa-label, .pa-user-tag-list, .pa-comment-tag-list { color: #fff; }
#CreatePhotoTags {
  background: #d1481e;
  border: 0;
}

/* IE menu fix */
.side-navigation li,
#menuColumn li { zoom: 1; }

/* IE6 gif */
.side-navigation li,
#menuColumn li.clubArticlesMenuItem, #switches .sw-adv, #switches .sw-invisible, #switches .sw-mood, #switches .sw-slyde, #switches .sw-vip, .activityMenuItem, .advphoto h6 span, .distantFriendsMenuItem, .friendBirthdaysMenuItem, .friendCommonMenuItem, .friendForumMenuItem, .friendFriendsMenuItem, .friendGroupMenuItem, .friendHomeMenuItem, .friendMessagingMenuItem, .friendPhotoAlbumsMenuItem, .friendPhotosMenuItem, .friendSchoolMenuItem, .futureFriendsMenuItem, .groupForumHeadersMenuItem, .groupForumHeadersMenuItemNew, .groupMainMenuItem, .groupMainMenuItemNew, .groupMembersMenuItem, .groupMembersMenuItemNew, .groupPicturesMenuItem, .groupPicturesMenuItemNew, .indirectFriendsMenuItem, .labelActivity, .labelActivityAuction, .labelActivityEducation, .labelActivityExtra, .labelActivityForum, .labelActivityFriend, .labelActivityGroup, .labelActivityPhoto, .labelActivityPhotoAlbum, .labelActivityPhotoComment, .labelActivityPhototop, .labelActivityPresent, .labelActivityProfile, .labelActivitySkin, .link2photoalbums, .mainMenuItem, .ownAdminMessagesMenuItem, .ownAdvertisementsMenuItem, .ownAllAdvertisementsMenuItem, .ownAuctionMenuItem, .ownClubMenuItem, .ownClubsMenuItem, .ownCommentaryMenuItem, .ownContestsMenuItem, .ownFavoriteUsersMenuItem, .ownFriendsMenuItem, .ownGenerosityTopMenuItem, .ownGOSMenuItem, .ownGroupsMenuItem, .ownHelpMenuItem, .ownHistoryMenuItem, .ownIncomingMessageMenuItem, .ownLoveGamesMenuItem, .ownLoveTopMenuItem, .ownModeratorMenuItem, .ownMyAdvertisementsMenuItem, .ownOnlineUserMenuItem, .ownOutgoingMessageMenuItem, .ownPhotoAlbumsMenuItem, .ownPhotoMarksMenuItem, .ownPhotosMenuItem, .ownPhotoTopMenuItem, .ownPresentsMenuItem, .ownProfileMenuItem, .ownSchoolsMenuItem, .ownSearchMenuItem, .ownServiceStatesMenuItem, .ownThemesMenuItem, .ownUserAlertsMenuItem, .requestsMenuItem, .shortcutMenuItem-chat a, .shortcutMenuItem-club a, .shortcutMenuItem-favorite a, .shortcutMenuItem-forum a, .shortcutMenuItem-friends a, .shortcutMenuItem-games a, .shortcutMenuItem-gift a, .shortcutMenuItem-group a, .shortcutMenuItem-group-albums a, .shortcutMenuItem-group-forum a, .shortcutMenuItem-group-main a, .shortcutMenuItem-group-members a, .shortcutMenuItem-message a, .shortcutMenuItem-messaging a, .shortcutMenuItem-photo a, .shortcutMenuItem-photo-albums a, .shortcutMenuItem-take-this-smile a, .shortcutMenuItem-view a, div.userSmileShortcutMenu li.shortcutMenuItem-smile-complain a, li.ua-li-auction, li.ua-li-x1, li.ua-li-x10, li.ua-li-x11, li.ua-li-x12, li.ua-li-x13, li.ua-li-x14, li.ua-li-x15, li.ua-li-x16, li.ua-li-x17, li.ua-li-x18, li.ua-li-x19, li.ua-li-x2, li.ua-li-x20, li.ua-li-x21, li.ua-li-x22, li.ua-li-x23, li.ua-li-x24, li.ua-li-x25, li.ua-li-x26, li.ua-li-x27, li.ua-li-x28, li.ua-li-x29, li.ua-li-x3, li.ua-li-x30, li.ua-li-x31, li.ua-li-x32, li.ua-li-x33, li.ua-li-x34, li.ua-li-x35, li.ua-li-x36, li.ua-li-x37, li.ua-li-x38, li.ua-li-x39, li.ua-li-x4, li.ua-li-x40, li.ua-li-x41, li.ua-li-x42, li.ua-li-x43, li.ua-li-x44, li.ua-li-x46, li.ua-li-x47, li.ua-li-x48, li.ua-li-x49, li.ua-li-x5, li.ua-li-x51, li.ua-li-x52, li.ua-li-x55, li.ua-li-x56, li.ua-li-x57, li.ua-li-x58, li.ua-li-x59, li.ua-li-x6, li.ua-li-x60, li.ua-li-x61, li.ua-li-x7, li.ua-li-x8, li.ua-li-x9, span.labelActivityClub, span.labelActivityUsersmile, span.shortcutSkin
{
  background-repeat: no-repeat !important;
  background-image: url(/res/dk/one/icons/toolbar/small/icon_set_IE6.gif?2) !important;
}


/* IE6 hack, makes selector invisible to IE6 and prior in quirksmode */
* html > z,
.side-navigation li,
#menuColumn li.clubArticlesMenuItem, #switches .sw-adv, #switches .sw-invisible, #switches .sw-mood, #switches .sw-slyde, #switches .sw-vip, .activityMenuItem, .advphoto h6 span, .distantFriendsMenuItem, .friendBirthdaysMenuItem, .friendCommonMenuItem, .friendForumMenuItem, .friendFriendsMenuItem, .friendGroupMenuItem, .friendHomeMenuItem, .friendMessagingMenuItem, .friendPhotoAlbumsMenuItem, .friendPhotosMenuItem, .friendSchoolMenuItem, .futureFriendsMenuItem, .groupForumHeadersMenuItem, .groupForumHeadersMenuItemNew, .groupMainMenuItem, .groupMainMenuItemNew, .groupMembersMenuItem, .groupMembersMenuItemNew, .groupPicturesMenuItem, .groupPicturesMenuItemNew, .indirectFriendsMenuItem, .labelActivity, .labelActivityAuction, .labelActivityEducation, .labelActivityExtra, .labelActivityForum, .labelActivityFriend, .labelActivityGroup, .labelActivityPhoto, .labelActivityPhotoAlbum, .labelActivityPhotoComment, .labelActivityPhototop, .labelActivityPresent, .labelActivityProfile, .labelActivitySkin, .link2photoalbums, .mainMenuItem, .ownAdminMessagesMenuItem, .ownAdvertisementsMenuItem, .ownAllAdvertisementsMenuItem, .ownAuctionMenuItem, .ownClubMenuItem, .ownClubsMenuItem, .ownCommentaryMenuItem, .ownContestsMenuItem, .ownFavoriteUsersMenuItem, .ownFriendsMenuItem, .ownGenerosityTopMenuItem, .ownGOSMenuItem, .ownGroupsMenuItem, .ownHelpMenuItem, .ownHistoryMenuItem, .ownIncomingMessageMenuItem, .ownLoveGamesMenuItem, .ownLoveTopMenuItem, .ownModeratorMenuItem, .ownMyAdvertisementsMenuItem, .ownOnlineUserMenuItem, .ownOutgoingMessageMenuItem, .ownPhotoAlbumsMenuItem, .ownPhotoMarksMenuItem, .ownPhotosMenuItem, .ownPhotoTopMenuItem, .ownPresentsMenuItem, .ownProfileMenuItem, .ownSchoolsMenuItem, .ownSearchMenuItem, .ownServiceStatesMenuItem, .ownThemesMenuItem, .ownUserAlertsMenuItem, .requestsMenuItem, .shortcutMenuItem-chat a, .shortcutMenuItem-club a, .shortcutMenuItem-favorite a, .shortcutMenuItem-forum a, .shortcutMenuItem-friends a, .shortcutMenuItem-games a, .shortcutMenuItem-gift a, .shortcutMenuItem-group a, .shortcutMenuItem-group-albums a, .shortcutMenuItem-group-forum a, .shortcutMenuItem-group-main a, .shortcutMenuItem-group-members a, .shortcutMenuItem-message a, .shortcutMenuItem-messaging a, .shortcutMenuItem-photo a, .shortcutMenuItem-photo-albums a, .shortcutMenuItem-take-this-smile a, .shortcutMenuItem-view a, div.userSmileShortcutMenu li.shortcutMenuItem-smile-complain a, li.ua-li-auction, li.ua-li-x1, li.ua-li-x10, li.ua-li-x11, li.ua-li-x12, li.ua-li-x13, li.ua-li-x14, li.ua-li-x15, li.ua-li-x16, li.ua-li-x17, li.ua-li-x18, li.ua-li-x19, li.ua-li-x2, li.ua-li-x20, li.ua-li-x21, li.ua-li-x22, li.ua-li-x23, li.ua-li-x24, li.ua-li-x25, li.ua-li-x26, li.ua-li-x27, li.ua-li-x28, li.ua-li-x29, li.ua-li-x3, li.ua-li-x30, li.ua-li-x31, li.ua-li-x32, li.ua-li-x33, li.ua-li-x34, li.ua-li-x35, li.ua-li-x36, li.ua-li-x37, li.ua-li-x38, li.ua-li-x39, li.ua-li-x4, li.ua-li-x40, li.ua-li-x41, li.ua-li-x42, li.ua-li-x43, li.ua-li-x44, li.ua-li-x46, li.ua-li-x47, li.ua-li-x48, li.ua-li-x49, li.ua-li-x5, li.ua-li-x51, li.ua-li-x52, li.ua-li-x55, li.ua-li-x56, li.ua-li-x57, li.ua-li-x58, li.ua-li-x59, li.ua-li-x6, li.ua-li-x60, li.ua-li-x61, li.ua-li-x7, li.ua-li-x8, li.ua-li-x9, span.labelActivityClub, span.labelActivityUsersmile, span.shortcutSkin
{
  background-repeat: no-repeat !important;
  background-image: url(/res/dk/one/icons/toolbar/small/icon_set.png?1) !important;
}

/*====== Pagrindinis ==========*/

.mainMenuItem, .friendHomeMenuItem, .groupMainMenuItem, .groupMainMenuItemNew, li.ua-li-x56, .shortcutMenuItem-group-main a, .labelActivityProfile {
  background-position: 0 -460px !important;
}

/*====== Paieska ==========*/

.ownSearchMenuItem, .shortcutMenuItem-view a {
  background-position: 0 -700px !important;
}

/*====== Isrinktieji ==========*/

.ownFavoriteUsersMenuItem, .shortcutMenuItem-favorite a  {
  background-position: 0 -180px !important;
}

/*====== Mano Fotoalbumas ==========*/

.ownPhotosMenuItem, .friendPhotosMenuItem, li.ua-li-x2, li.ua-li-x3, li.ua-li-x4, .shortcutMenuItem-photo a, .labelActivityPhoto {
  background-position: 0 -640px !important;
}

.advphoto h6 span {
  background-position: 0 -600px !important;
  padding-right: 20px;
}

/*====== LV Foto albumai >> KITA IKONA!==========*/

.ownPhotoAlbumsMenuItem, .friendPhotoAlbumsMenuItem, .groupPicturesMenuItem, .groupPicturesMenuItemNew, li.ua-li-x9, li.ua-li-x10, li.ua-li-x11, li.ua-li-x12, .link2photoalbums, .shortcutMenuItem-photo-albums a, .shortcutMenuItem-group-albums a, .labelActivityPhotoAlbum {
  background-position: 0 -600px !important;
}

/*====== Nuotrauku ivertinimai ==========*/

.ownPhotoMarksMenuItem {
  background-position: 0 -620px !important;
}

/*====== Draugai ==========*/

.ownFriendsMenuItem, .friendFriendsMenuItem, li.ua-li-x17, li.ua-li-x18, li.ua-li-x19, li.ua-li-x20, li.ua-li-x21, li.ua-li-x22, li.ua-li-x23, li.ua-li-x24, li.ua-li-x25, li.ua-li-x26, li.ua-li-x55, .labelActivityFriend {
  background-position: 0 -220px !important;
}

/*====== Drauagu Draugai ==========*/

.indirectFriendsMenuItem, .shortcutMenuItem-friends a {
  background-position: 0 -240px !important;
}

/*====== Drauagu Draugu Draugai ==========*/

.distantFriendsMenuItem, .groupMembersMenuItem, .groupMembersMenuItemNew, li.ua-li-x27, li.ua-li-x28, li.ua-li-x29, li.ua-li-x30, li.ua-li-x31, li.ua-li-x32, li.ua-li-x33, li.ua-li-x34, li.ua-li-x35, li.ua-li-x36, .shortcutMenuItem-group a, .shortcutMenuItem-group-members a, .labelActivityGroup {
  background-position: 0 -260px !important;
}

/*====== Drauagu aktyvumas ==========*/

.activityMenuItem, li.ua-li-x55,.labelActivity, li.ua-li-x60 {
  background-position: 0 -0px !important;
}

/*====== Grupes (buvo old pozicija 400) ==========*/

.ownGroupsMenuItem, .friendGroupMenuItem {
  background-position: 0 -940px !important;
}

/*====== Clubs =========*/

.ownClubsMenuItem {
  background-position: 0 -79px !important;
}

.shortcutMenuItem-club a {
  background-position: 0 -99px !important;
}

span.labelActivityClub {
  background-position: 0 -100px !important;
}

/* clubs apacioje */

.ownClubMenuItem {
  background-position: 0 -120px !important;
}


/*====== Bendraklasiai ==========*/

.ownSchoolsMenuItem, .friendSchoolMenuItem, li.ua-li-x37, li.ua-li-x38, li.ua-li-x39, li.ua-li-x40, li.ua-li-x41, li.ua-li-x42, .labelActivityEducation {
  background-position: 0 -660px !important;
}

/*====== Mano pakvietimai ==========*/

.futureFriendsMenuItem {
  background-position: 0 -320px !important;
}

/*====== Draugu pakvietimai ==========*/

.requestsMenuItem {
  background-position: 0 -680px !important;
}

/*====== Mano anketa ==========*/

.ownProfileMenuItem, li.ua-li-x1 {
  background-position: 0 -920px !important;
}

/*====== Mano sveciai ==========*/

.ownHistoryMenuItem {
  background-position: 0 -420px !important;
}

/*====== Gimimo dienos ==========*/

.friendBirthdaysMenuItem {
  background-position: 0 -60px !important;
}

/*====== Prisijunge draugai ==========*/

.ownOnlineUserMenuItem {
  background-position: 0 -300px !important;
}

/*====== Mano forumas ==========*/

.ownCommentaryMenuItem, .friendForumMenuItem, .groupForumHeadersMenuItem, .groupForumHeadersMenuItemNew, li.ua-li-x5, li.ua-li-x6, li.ua-li-x7, li.ua-li-x8, li.ua-li-x13, li.ua-li-x14, li.ua-li-x15, li.ua-li-x16, .shortcutMenuItem-chat a, .shortcutMenuItem-forum a, .shortcutMenuItem-group-forum a, .labelActivityForum, .labelActivityPhotoComment {
  background-position: 0 -200px !important;
}

/*====== Draugu dovanos ==========*/

.ownPresentsMenuItem, li.ua-li-x43, li.ua-li-x44, .shortcutMenuItem-gift a, .labelActivityPresent {
      background-position: 0 -380px !important;
}

/*====== susirasinemimas su draugu / MENIU ==========*/

.friendMessagingMenuItem, .shortcutMenuItem-messaging a {
  background-position: 0 -540px !important;
}

/*====== Mano ekstros ==========*/

.ownServiceStatesMenuItem, .labelActivityExtra {
  background-position: 0 -160px !important;
}

/*====== Top dosniausi ==========*/

.ownGenerosityTopMenuItem {
  background-position: 0 -360px !important;
}


/*====== Pagalba ==========*/

.ownHelpMenuItem {
  background-position: 0 -440px !important;
}

/*====== Bendri draugai /draugo meniu ==========*/

.friendCommonMenuItem, li.ua-li-x51 {
  background-position: 0 -280px !important;
}

/*====== 
X
X   ONE.LV only - skelbimai ir statusai, 2 skirtingos ikonos
X
======*/

.ownMyAdvertisementsMenuItem, li.ua-li-x58, li.ua-li-x57 {
  background-position: 0 -580px !important;
}

.ownAllAdvertisementsMenuItem, .ownAdvertisementsMenuItem {
  background-position: 0 -800px !important;
}



/*====== Gautos zinutes ==========*/
	
.ownIncomingMessageMenuItem {
  background-position: 0 -500px !important;
}

/*====== Issiustos zinutes ==========*/

.ownOutgoingMessageMenuItem {
  background-position: 0 -520px !important;
}

/*====== Nuotrauku topas ==========*/

.ownPhotoTopMenuItem, li.ua-li-x52, .labelActivityPhototop {
  background-position: 0 -780px !important;
}

/*====== Patys mylimiausi draugai ==========*/

.ownLoveTopMenuItem, .ownLoveGamesMenuItem {
  background-position: 0 -760px !important;
}

/*====== Nuotrauku tikrinimas ==========*/

.ownModeratorMenuItem {
  background-position: 0 -560px !important;
}

/*====== Aukcionai ==========*/

.ownAuctionMenuItem, li.ua-li-auction, .labelActivityAuction {
  background-position: 0 -40px !important;
}

/*====== Nauji skinai ==========*/

.ownThemesMenuItem, li.ua-li-x46, li.ua-li-x47, .labelActivitySkin {
  background-position: 0 -720px !important;
}


/*====== Smailikai =========*/


li.ua-li-x48, li.ua-li-x49, .shortcutMenuItem-take-this-smile a {
  background-position: 0 -740px !important;
}

span.labelActivityUsersmile {
  background-position: 0 -740px !important;
}

div.userSmileShortcutMenu li.shortcutMenuItem-smile-complain a {
  background-position: 0 -980px !important;
}

/*====== Contest ikona ==========*/

.ownContestsMenuItem, li.ua-li-x59 {
  background-position: 0 -140px !important;
}

/*====== siusti zinute ==========*/

.shortcutMenuItem-message a {
  background-position: 0 -480px !important;
}


/*====== attention, alerts, notifs ==========*/

.ownUserAlertsMenuItem, .ownAdminMessagesMenuItem {
  background-position: 0 -20px !important;
}


/*====== GAMES ==========*/

li.ua-li-x61, .ownGOSMenuItem, .shortcutMenuItem-games a {
  background-position: 0 -340px !important;
}


/*========= SWITCHES 




Nemoku fona padaryti sviesesne pilka spalva :( !!!!!!!!!




=========*/ 
	
#switches .sw-slyde {
  background-position: 3px -857px !important;
}

#switches .sw-invisible {
  background-position: 3px -817px !important;
}

#switches .sw-mood {
  background-position: 3px -837px !important;
}

#switches .sw-vip {
  background-position: 3px -877px !important;
}

#switches .sw-adv {
  background-position: 3px -897px !important;
}

#switches a:hover,
#switches .on { background-color: #FF9900 !important; }
#switches .off { background-color: #bfbfbf !important; }

/*========= skino ikona anketoje =========*/ 

span.shortcutSkin {
  background-position: 0 -716px !important;
}

/*========= klubu naujienos =========*/ 

#menuColumn li.clubArticlesMenuItem {
  background-position: 0 -959px !important;
}


#wrap .as-response,
.as-content-mark,
#wrap .as-content-mark,
#wrap .as-notifications-container,
#wrap .as-comment-form .as-thumb-block-38x38,
#wrap .as-comment-block .as-thumb-block-38x38 {
  background: #d1481e;
}
#wrap .as-comment-form .as-larr,
#wrap .as-comment-block .as-larr {
  border-color: transparent #d1481e transparent transparent;
}
.as-content-mark .as-tarr,
#wrap .as-notifications-container .as-tarr,
#wrap .as-responses-block .as-tarr {
  border-color: transparent transparent #d1481e;
}

#wrap .tabbed-navigation li {
  background: #d1481e;
}
#wrap .tabbed-navigation a:hover,
#wrap .tabbed-navigation a:active,
#wrap .tabbed-navigation .tab-active {
  background: #d1481e;
}

#wrap .as-slink span,
#wrap .as-slink:link span,
#wrap .as-slink:visited span,
#wrap .as-link,
#wrap .as-link:link,
#wrap .as-link:visited,
#wrap .as-link span,
#wrap .as-link:link span,
#wrap .as-link:visited span { color: #fff; border-bottom: solid 1px #fff; }

#wrap .as-link span { border-bottom: solid 1px #fff; }
#wrap .as-slink:hover span,
#wrap .as-link:hover,
#wrap .as-link:hover span { border-bottom: solid 1px #fff; }


.as-comment { color: #ddd; }

#wrap .as-big-header,
#wrap .as-small-header,
#wrap .as-date { color: #fff; }
.as-stream-container {
  color: #fff;
  background: #d1481e;
}
x > y, .as-stream-container {
  color: #fff;
  background: url(/res/images/as/transparent.png);
}

.pa-album-list-likes, .pa-photo-view-likes,
.pa-album-list-comments, .pa-photo-view-comments,
.pa-album-list-views, .pa-photo-view-views { color: #fff; }
.pa-album-list-views .ib, .pa-photo-view-views .ib { background-position: -26px 0; }
.pa-album-list-comments .ib, .pa-photo-view-comments .ib { background-position: -26px -10px; }
.pa-album-list-likes .ib, .pa-photo-view-likes .ib { background-position: -26px -20px; }
div.portletNavigator, div.portletEvent, div.portletContent, div.portletContentTable { margin: 7px; }

div.portletPopup {
    margin: 8px 8px 0px;
}

div.portlet div.portletBody {
    padding: 2px;
}

#menuColumn .portletBody {
    padding: 5px 3px 10px;
}

div.portletBody {
    color: #FFF;
/* hack for IE: pojavljajutsja artefactu sprava i snizu poertleta */
    //height: 1%;
}

div.portletPopup div.portlet {
    height: 1500px;
}

div.portlet h2 {
    text-align: left;
    padding: 5px 10px 0px;
    margin: 0px;
    color: #FFF;
    font-family: Arial, Tahoma, Helvetica, sans-serif;
    font-size: 13px;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
}

div.portlet h2 a:link, div.portlet h2 a:visited {
    text-decoration: none;
    font-size: 13px;
    color: #FFF;
}

div.portlet h2 a:hover, div.portlet h2 a:active {
    font-size: 13px;
    text-decoration: underline;
}

div.portletBody a {
    color: #FFF;
}

div.portletBody p {
    font-size: 11px;
    color: #FFF;
}

div.portletPopup div.portlet div.portletBody {
    padding-top: 15px;
}

div.portletBody td {
    font-size: 11px;
    color: #FFF;
}

/* deprecated */

div.portletBody a:link, div.portletBody a:visited {
    color: #FFF !important;
}

div.portletBody a:hover, div.portletBody a:active {
    color: #FFF !important;
}

div.portletBody .smallnormal {
    color: #FFF;
}

div.portletBody .smallnormalRed {
    color: #FFF;
}

div.portletBody .smallnormalBlue {
    color: #FFF;
}

div.portletBody .smallbold {
    color: #FFF;
}

div.portletBody .smallboldRed {
    color: #FFF;
}

div.portletBody .smallboldBlue {
    color: #FFF;
}

div.portletBody .bignormal {
    color: #FFF;
}

div.portletBody .bigbold {
    color: #FFF;
}

div.eMailData {
    margin-top:9px;
    margin-bottom:9px;
}

div.eMailDataPanel {
    margin-top:-19px;
    margin-bottom:-19px;
}

div.eMailDataHeader {
    font-weight:bold;
    font-size:12px;
}


body {
    background: #050505 url( http://t12.one.lt/getTheme?id=55804025651200&v=22&key=LAYER1_IMAGE ) no-repeat bottom right;
      background-attachment: fixed;
}

div.portletPopup { background: url( http://t12.one.lt/getTheme?id=55804025651200&v=22&key=LAYER1_IMAGE_1 ) no-repeat bottom right;
background-attachment: fixed;
*/}

div.portletWA {
      border: 1px solid #b0340e;
}

#navigation td, #layout-Navigation .WLoginPanel-Panel {
      border: none !important;
}
 
#navigation td.home, #navigation td.logout, #navigation td.home a, #navigation td.logout a {
      width: 26px !important;
}

body, body a {
color: #fff !important;
}
 
#footer,#layout-Footer .WFooter-Panel {
border-top: 1px solid #fff !important;
}

#layout-Footer .WFooter-Panel .smallboldBlue {
color: #fff;
}


body center img {
display: none;
}

#menuColumn .portlet li.select a {
    color: #fff !important;
}

.as-activity-block { 
border-bottom: solid 1px #a72900 !important; 
}#menuColumn { width: 216px; }

#menuColumn li {
    text-align: left;
    font-size: 11px;
    list-style: none;
    list-style-position: outside;
    padding: 1px;
}

.side-navigation li a:link, .side-navigation li a:visited,
#menuColumn li a:link, #menuColumn li a:visited {
    color: #FFF;
    font-weight: normal;
    display: block;
    padding: 2px 0px 2px 20px;
}

.side-navigation li a:hover,
#menuColumn li a:hover {
    color: #FFF;
    font-weight: bold;
}

#menuColumn li.mainMenuItem {
    background: url( /res/dk/leopard/icons/menu/home.gif ) no-repeat 1px;
}

#menuColumn li.ownSearchMenuItem {
    background: url( /res/dk/leopard/icons/menu/search.gif ) no-repeat 1px;
}

#menuColumn li.ownFavoriteUsersMenuItem {
    background: url( /res/dk/leopard/icons/menu/favorite.gif ) no-repeat 1px;
}

#menuColumn li.ownPhotosMenuItem {
    background: url( /res/dk/leopard/icons/menu/photo.gif ) no-repeat 1px;
}

#menuColumn li.ownPhotoMarksMenuItem {
    background: url( /res/dk/leopard/icons/menu/photomarks.gif ) no-repeat 1px;
}

#menuColumn li.ownFriendsMenuItem {
    background: url( /res/dk/leopard/icons/menu/friends.gif ) no-repeat 1px;
}

#menuColumn li.indirectFriendsMenuItem {
    background: url( /res/dk/leopard/icons/menu/friends2.gif ) no-repeat 1px;
}

#menuColumn li.distantFriendsMenuItem {
    background: url( /res/dk/leopard/icons/menu/friends3.gif ) no-repeat 1px;
}

#menuColumn li.activityMenuItem {
    background: url( /res/dk/leopard/icons/menu/activity.gif ) no-repeat 1px;
}

#menuColumn li.ownSchoolsMenuItem {
    background: url( /res/dk/leopard/icons/menu/schoolmates.gif ) no-repeat 1px;
}

#menuColumn li.futureFriendsMenuItem {
    background: url( /res/dk/leopard/icons/menu/future-friends.gif ) no-repeat 1px;
}

#menuColumn li.requestsMenuItem {
    background: url( /res/dk/leopard/icons/menu/requests.gif ) no-repeat 1px;
}

#menuColumn li.ownProfileMenuItem {
    background: url( /res/dk/leopard/icons/menu/profile.gif ) no-repeat 1px;
}

#menuColumn li.ownHistoryMenuItem {
    background: url( /res/dk/leopard/icons/menu/history.gif ) no-repeat 1px;
}

#menuColumn li.friendBirthdaysMenuItem {
    background: url( /res/dk/leopard/icons/menu/birthdays.gif ) no-repeat 1px;
}

#menuColumn li.ownOnlineUserMenuItem {
    background: url( /res/dk/leopard/icons/menu/friends-online.gif ) no-repeat 1px;
}

#menuColumn li.ownCommentaryMenuItem {
    background: url( /res/dk/leopard/icons/menu/forum.gif ) no-repeat 1px;
}

#menuColumn li.ownPresentsMenuItem {
    background: url( /res/dk/leopard/icons/menu/gifts.gif ) no-repeat 1px;
}

#menuColumn li.ownServiceStatesMenuItem {
    background: url( /res/dk/leopard/icons/menu/extra.gif ) no-repeat 1px;
}

#menuColumn li.ownHelpMenuItem {
    background: url( /res/dk/leopard/icons/menu/help.gif ) no-repeat 1px;
}

#menuColumn li.ownIncomingMessageMenuItem {
    background: url( /res/dk/leopard/icons/menu/message-in.gif ) no-repeat 1px;
}

#menuColumn li.ownOutgoingMessageMenuItem {
    background: url( /res/dk/leopard/icons/menu/message-out.gif ) no-repeat 1px;
}

#menuColumn li.ownPhotoTopMenuItem {
    background: url( /res/dk/leopard/icons/menu/top-photos.gif ) no-repeat 1px;
}

#menuColumn li.ownGenerosityTopMenuItem {
    background: url( /res/dk/leopard/icons/menu/top-generosity.gif ) no-repeat 1px;
}

#menuColumn li.ownLoveTopMenuItem {
    background: url( /res/dk/leopard/icons/menu/top-love.gif ) no-repeat 1px;
}

#menuColumn li.ownModeratorMenuItem {
    background: url( /res/dk/leopard/icons/menu/moderator.gif ) no-repeat 1px;
}

#menuColumn li.ownAuctionMenuItem {
    background: url( /res/dk/leopard/icons/menu/auction.gif ) no-repeat 1px;
}

#menuColumn li.ownAdminMessagesMenuItem {
    background: url( /res/dk/leopard/icons/menu/attention.gif ) no-repeat 1px;
}

#menuColumn li.ownUserAlertsMenuItem {
    background: url( /res/dk/leopard/icons/menu/attention.gif ) no-repeat 1px;
}

#menuColumn li.ownLoveGamesMenuItem {
    background: url( /res/dk/leopard/icons/menu/hearts.gif ) no-repeat 1px;
}

#menuColumn li.ownRiskGamesMenuItem {
    background: url( /res/dk/leopard/icons/menu/kisses.gif ) no-repeat 1px;
}

#menuColumn li.ownThemesMenuItem {
    background: url( /res/dk/leopard/icons/menu/theme.gif ) no-repeat 1px;
}

#menuColumn li.friendHomeMenuItem {
    background: url( /res/dk/leopard/icons/menu/home.gif ) no-repeat 1px;
}

#menuColumn li.friendPhotosMenuItem {
    background: url( /res/dk/leopard/icons/menu/photo.gif ) no-repeat 1px;
}

#menuColumn li.friendFriendsMenuItem {
    background: url( /res/dk/leopard/icons/menu/friends.gif ) no-repeat 1px;
}

#menuColumn li.friendCommonMenuItem {
    background: url( /res/dk/leopard/icons/menu/friends_common.gif ) no-repeat 1px;
}

#menuColumn li.friendSchoolMenuItem {
    background: url( /res/dk/leopard/icons/menu/schoolmates.gif ) no-repeat 1px;
}

#menuColumn li.friendForumMenuItem {
    background: url( /res/dk/leopard/icons/menu/forum.gif ) no-repeat 1px;
}

#menuColumn li.friendMessagingMenuItem {
    background: url( /res/dk/leopard/icons/menu/friend_messaging.gif ) no-repeat 1px;
}

#menuColumn li.friendGroupMenuItem {
    background: url( /res/dk/leopard/icons/menu/group_members.gif ) no-repeat 1px;
}

#menuColumn li.ownQAGameMenuItem {
    background: url( /res/dk/leopard/icons/menu/qagame.gif ) no-repeat 1px;
}

/* clubs - start */
#menuColumn li.ownClubsMenuItem {
    background: url( /res/images/clubs/clubs_section_small_dark_v1.gif ) no-repeat 1px;
}
#menuColumn li.ownClubMenuItem {
    background: url( /res/images/clubs/clubs_section_single_dark_v1.gif ) no-repeat 1px;
}
/* clubs - end */

/*groups: start*/
#menuColumn li.ownGroupsMenuItem {
    background: url( /res/dk/leopard/icons/menu/groups.gif ) no-repeat 1px;
}

#menuColumn li.groupMainMenuItem {
    background: url( /res/dk/leopard/icons/menu/group_main.gif ) no-repeat 1px;
}

#menuColumn li.groupMembersMenuItem {
    background: url( /res/dk/leopard/icons/menu/group_members.gif ) no-repeat 1px;
}

#menuColumn li.groupForumHeadersMenuItem {
    background: url( /res/dk/leopard/icons/menu/group_forum_headers.gif ) no-repeat 1px;
}

#menuColumn li.groupPicturesMenuItem {
    background: url( /res/dk/leopard/icons/menu/group_pictures.gif ) no-repeat 1px;
}

#menuColumn li.groupMainMenuItemNew {
    background: url( /res/dk/leopard/icons/menu/group_main.gif ) no-repeat 1px;
    font-weight: bold;
}

#menuColumn li.groupMembersMenuItemNew {
    background: url( /res/dk/leopard/icons/menu/group_members.gif ) no-repeat 1px;
    font-weight: bold;
}

#menuColumn li.groupForumHeadersMenuItemNew {
    background: url( /res/dk/leopard/icons/menu/group_forum_headers.gif ) no-repeat 1px;
    font-weight: bold;
}

#menuColumn li.groupPicturesMenuItemNew {
    background: url( /res/dk/leopard/icons/menu/group_pictures.gif ) no-repeat 1px;
    font-weight: bold;
}
/*groups: end*/

#menuColumn li.clubArticlesMenuItem {
	background: url( /res/dk/leopard/icons/menu/club_articles_v1.gif ) no-repeat 1px;
}

#menuColumn li.ownContestsMenuItem {
    background: url( /res/dk/leopard/icons/menu/contest.gif ) no-repeat 1px;
    font-weight: bold;
}

#menuColumn .portlet li.select {
    background-color: #d1481e;
}

#shortcutMenuFriend *, div.userSmileShortcutMenu * {
    margin: 0px;
    padding: 0px;
}

#shortcutMenuFriend {
    font-size: 11px;
    border: 1px solid #b0340e;
    position: absolute;
    visibility: hidden;
    z-index: +1;
    background-color: #050505;
    padding: 5px 1px;
    text-align: left;
}

#shortcutMenuFriend span {
    color: #FFF;
    padding: 5px 5px 5px 15px;
}

#shortcutMenuFriend li, div.userSmileShortcutMenu li {
    list-style: none;
    list-style-position: outside;
    padding: 1px;
}

#shortcutMenuFriend li a:link, #shortcutMenuFriend li a:visited, div.userSmileShortcutMenu li a:link, div.userSmileShortcutMenu li a:visited {
    color: #FFF;
    font-weight: normal;
    display: block;
    padding: 2px 20px 2px 25px;
}

#shortcutMenuFriend li.shortcutMenuItem-view a {
    background: url( /res/dk/leopard/icons/menu/shortcut/view.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-message a {
    background: url( /res/dk/leopard/icons/menu/shortcut/message.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-bmessage a {
    background: url( /res/dk/leopard/icons/menu/shortcut/bmessage.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-mmail a {
    background: url( /res/dk/leopard/icons/menu/shortcut/mmail.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-group a {
    background: url( /res/dk/leopard/icons/menu/shortcut/group.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-club a {
    background: url( /res/images/clubs/clubs_invite_dropdown_dark_v1.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-chat a {
    background: url( /res/dk/leopard/icons/menu/shortcut/chat.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-photo a {
    background: url( /res/dk/leopard/icons/menu/photo.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-friends a {
    background: url( /res/dk/leopard/icons/menu/friends2.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-favorite a {
    background: url( /res/dk/leopard/icons/menu/favorite.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-forum a {
    background: url( /res/dk/leopard/icons/menu/forum.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-messaging a {
    background: url( /res/dk/leopard/icons/menu/friend_messaging.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-gift a {
    background: url( /res/dk/leopard/icons/menu/gifts.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-group-main a {
    background: url( /res/dk/leopard/icons/menu/shortcut/group_main.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-group-forum a {
    background: url( /res/dk/leopard/icons/menu/shortcut/group_forum_headers.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-group-members a {
    background: url( /res/dk/leopard/icons/menu/shortcut/group_members.gif ) no-repeat 3px;
}

#shortcutMenuFriend li.shortcutMenuItem-group-albums a {
    background: url( /res/dk/leopard/icons/menu/shortcut/group_albums.gif ) no-repeat 3px;
}

#shortcutMenuFriend li a:hover {
    color: #FFF;
    background-color: #d1481e;
}


#shortcutMenuMedal * {
    margin: 0px;
    padding: 0px;
}

#shortcutMenuMedal {
    font-size: 11px;
    border: 1px solid #b0340e;
    position: absolute;
    visibility: hidden;
    z-index: +1;
    background-color: #050505;
    padding: 10px;
    text-align: center;
}

#shortcutMenuMedal p {
    padding-top: 5px;
    text-align: center;
    color: #FFF;
}

#shortcutMenuMedal em {
    font-style: normal;
}

/* polls start */

div.portlet h2.phPoll { 
	   
}

div.portlet .phPollBody {
       padding-bottom: 8px!important;
}

div.portlet .phPollBody p {
       padding-left:8px;
       margin-top: 5px!important;
}

div.portlet .pollForm {
       text-align: center;
}

div.portlet .pollForm ul {
        margin: 5px 8px 0 0;
		padding: 0 0 0 3px;
		list-style-image: none;
		list-style-position: outside;
		list-style-type: none;
		text-align: left;
}

div.portlet .pollForm ul li {
       margin-bottom: 5px;
       padding-bottom: 0px;
}

div.portlet .pollForm ul li input {
       display: table-cell;
       float: left;
       margin-top: 0px;
}

div.portlet .pollForm ul li label {
       font-size: 11px;
       display: table-cell;
       text-align: left;
       margin-top: 0px;
       padding-bottom: 0px;
       margin-bottom: 0px;
}

div.portlet ul.aZone {
 	margin: 5px 0pt 0pt;
 	padding: 0 0 0 8px; 
 	list-style-image: none; 
 	list-style-position: outside; 
 	list-style-type: none; 
 	text-align: left; 
 	font-size:11px;
}

div.portlet ul.aZone li {
       margin-bottom: 5px;
       padding-bottom: 0px;
}

div.portlet ul.aZone li div {
       background-color:#cccc33; font-size:6px; height:8px; line-height:8px;
margin:1px;
}

/* polls end */

/* menu.css pattern33 */
div.userSmileShortcutMenu{
    font-size: 11px;
    border: 1px solid #b0340e;
    position: absolute;
    z-index: +1;
    background-color: #050505;
    padding: 5px 1px;
}

div.userSmileShortcutMenu div {
    color: #FFF;
    padding: 5px 5px 5px 15px;
    text-align: center;
}

div.userSmileShortcutMenu li.shortcutMenuItem-take-this-smile a {
    background: url( /res/dk/leopard/icons/menu/shortcut/smile.gif ) no-repeat 3px;
}

div.userSmileShortcutMenu li.shortcutMenuItem-smile-complain a {
    background: url( /res/dk/leopard/icons/menu/shortcut/smile-complain.gif ) no-repeat 3px;
}

div.userSmileShortcutMenu li a:hover {
    color: #FFF;
    background-color: #d1481e;
}
span.formButton {
    margin: 0px 3px;
    padding: 0px;
}

span.formButton a {
    background-color: #d1481e;
    padding: 1px 10px;
    font-family: Arial, Tahoma, Helvetica, sans-serif;
    font-size: 11px;
    font-weight: normal;
    line-height: 22px;
    text-decoration: none;
    color: #FFF;
    border: solid 2px #FFF;
    cursor: pointer;
}

span.formButton a:link, span.formButton a:visited {
    text-decoration: none;
    color: #FFF;
}

span.formButton a:hover, span.formButton a:active {
    text-decoration: none;
    color: #FFF;
}

div.toolbarButtonW {
    position: relative;
    float: left;
    margin-right: 5px;
}

div.toolbarButtonW a {
    display: block;
    width: 36px;
    height: 36px;
}

div.toolbarButtonW a:hover {
    background-color: #d1481e;
}

div.toolbarButtonW div {
    width: 36px;
    height: 36px;
}

div.toolbarButtonW span {
    position: absolute;
    font-family: Arial, Tahoma, Helvetica, sans-serif;
    font-size: 11px;
    display: none;
}

div.toolbarButtonW a.tbMessage div {
    background: url( /res/dk/leopard/icons/toolbar/messageOff.gif ) no-repeat;
}

div.toolbarButtonW a.tbChat div {
    background: url( /res/dk/leopard/icons/toolbar/chatOff.gif ) no-repeat;
}

div.toolbarButtonW a.tbBMessage div {
    background: url( /res/dk/leopard/icons/toolbar/bmsgOff.gif ) no-repeat;
}

div.toolbarButtonW a.tbFavorite div {
    background: url( /res/dk/leopard/icons/toolbar/favoriteOff.gif ) no-repeat;
}

div.toolbarButtonW a.tbPresent div {
    background: url( /res/dk/leopard/icons/toolbar/presentOff.gif ) no-repeat;
}

div.toolbarButtonW a.tbDelFriend div {
    background: url( /res/dk/leopard/icons/toolbar/delFriendOff.gif ) no-repeat;
}

div.toolbarButtonW a.tbAddFriend div {
    background: url( /res/dk/leopard/icons/toolbar/addFriendOff.gif ) no-repeat;
}

div.toolbarButtonW a.tbReport div {
    background: url( /res/dk/leopard/icons/toolbar/reportOff.gif ) no-repeat;
}

div.toolbarButtonW a.tbBlock div {
    background: url( /res/dk/leopard/icons/toolbar/blockOff.gif ) no-repeat;
}

div.toolbarButtonW a.tbGroup div {
    background: url( /res/dk/leopard/icons/toolbar/toGroup.gif ) no-repeat;
}


span.friendType a:link, span.friendType a:visited, span.friendType a:active {
    text-decoration: none;
}

span.friendType a:hover {
    color: #d1481e !important;
    text-decoration: underline;
}

span.friendType span {
    color: #d1481e;
    font-family: Tahoma, Helvetica, sans-serif;
    letter-spacing: 2px;
    font-size: 10px;
    text-transform: lowercase;
}

table.tableSolid tr.rowSelect td span.friendType span {
    color: #FFF !important;
}

span.toolbarSlydeOn a span, span.toolbarSlydeOff a span, span.toolbarHiddenOn a span, span.toolbarHiddenOff a span, span.toolbarMoodOn a span, span.toolbarMoodOff a span, span.toolbarPersonalPageOn a span, span.toolbarPersonalPageOff a span, span.toolbarPersonalPage a span, span.toolbarVIPOn a span, span.toolbarVIPOff a span {
    font-size: 18px;
	width: 20px;
	height: 20px;
	padding: 0px 10px;
    cursor: pointer;
}

span.toolbarSlydeOn a span, span.toolbarSlydeOff a span  {
	background: url( /res/dk/one/icons/toolbar/small/slyde.gif ) no-repeat;
}

span.toolbarHiddenOn a span, span.toolbarHiddenOff a span {
	background: url( /res/dk/one/icons/toolbar/small/hidden.gif ) no-repeat;
}

span.toolbarMoodOn a span, span.toolbarMoodOff a span {
	background: url( /res/dk/one/icons/toolbar/small/mood.gif ) no-repeat;
}

span.toolbarPersonalPageOn a span, span.toolbarPersonalPageOff a span, span.toolbarPersonalPage a span {
background: url( /res/dk/one/icons/toolbar/small/personalPage.gif ) no-repeat;
}

span.toolbarVIPOn a span, span.toolbarVIPOff a span {
    background: url( /res/dk/one/icons/toolbar/small/vip.gif ) no-repeat;
}

span.toolbarSlydeOff a:link, span.toolbarSlydeOff a:visited, span.toolbarSlydeOff a:active, span.toolbarHiddenOff a:link, span.toolbarHiddenOff a:visited, span.toolbarHiddenOff a:active, span.toolbarMoodOff a:link, span.toolbarMoodOff a:visited, span.toolbarMoodOff a:active, span.toolbarPersonalPageOff a:link, span.toolbarPersonalPageOff a:visited, span.toolbarPersonalPageOff a:active, span.toolbarVIPOff a:link, span.toolbarVIPOff a:visited, span.toolbarVIPOff a:active {
    background-color: transparent;
    padding: 1px;
    margin: 0px 4px;
}

span.toolbarSlydeOff a:hover, span.toolbarSlydeOn a:link, span.toolbarSlydeOn a:visited, span.toolbarSlydeOn a:active, span.toolbarHiddenOff a:hover, span.toolbarHiddenOn a:link, span.toolbarHiddenOn a:visited, span.toolbarHiddenOn a:active, span.toolbarMoodOff a:hover, span.toolbarMoodOn a:link, span.toolbarMoodOn a:visited, span.toolbarMoodOn a:active, span.toolbarPersonalPageOff a:hover, span.toolbarPersonalPageOn a:link, span.toolbarPersonalPageOn a:visited, span.toolbarPersonalPageOn a:active, span.toolbarVIPOff a:hover, span.toolbarVIPOn a:link, span.toolbarVIPOn a:visited, span.toolbarVIPOn a:active {
    font-size: 18px;
	background-color: #d1481e;
    padding: 1px;
    margin: 0px 4px;
}

span.toolbarSlydeOn a:hover, span.toolbarHiddenOn a:hover, span.toolbarMoodOn a:hover, span.toolbarPersonalPageOn a:hover, span.toolbarVIPOn a:hover {
    background-color: transparent;
    padding: 1px;
    margin: 0px 4px;
}

span img.sw-slideshow-icon {background-color:transparent; vertical-align:middle;}
img.sw-adv-icon {background-color:transparent; vertical-align:middle;}

#switches {position:relative;margin:17px 0 0 0;text-align:center;overflow:hidden;}
#switches span {display:-moz-inline-box;display:inline-block;width:22px;height:22px;margin:0 2px;padding:0;list-style:none;}
#switches span a {display:block;width:22px;height:22px;padding:0;background:transparent url(/res/dk/one/icons/toolbar/small/slyde.gif) center center no-repeat;text-indent:-5000px;}
#switches .sw-slyde {background-image:url(/res/dk/one/icons/toolbar/small/slyde.gif);}
#switches .sw-invisible {background-image:url(/res/dk/one/icons/toolbar/small/hidden.gif);}
#switches .sw-mood {background-image:url(/res/dk/one/icons/toolbar/small/mood.gif);}
#switches .sw-vip {background-image:url(/res/dk/one/icons/toolbar/small/vip.gif);}
#switches .sw-adv {background-image:url(/res/dk/one/icons/toolbar/small/noad.gif);}
#switches a:hover {background-color:#999;}
#switches :hover.on {background-color:transparent;}
#switches .on {
	background-color: #d1481e;
}

a.sw-invisible, a.sw-slyde {background-color:transparent;display: -moz-inline-box;display:inline-block;width:22px;height:22px;padding:0; background:#808080 url(/res/dk/one/icons/toolbar/small/hidden.gif) center center no-repeat;text-indent:-5000px;vertical-align:middle;}
a.sw-slyde {background-image:url(/res/dk/one/icons/toolbar/small/slyde.gif);}
a.sw-invisible:hover, a.sw-slyde:hover {background-color:#999;}table.tableSolid {
    width: 100%;
    border: 1px solid #5d6077;
    border-collapse: collapse;
}

table.tableSolid caption {
    padding-bottom: 5px;
    font-size: 11px;
}

table.tableSolid thead {
    background-color: #5d6077;
    color: #FFF;
    font-size: 13px;
    font-weight: bold;
    line-height: 1.7em;
}

table.tableSolid tfoot {
    background-color: #5d6077;
    color: #FFF;
    font-size: 13px;
    font-weight: bold;
    line-height: 1.7em;
}

table.tableSolid th a {
    font-size: 13px;
    font-weight: bold;
}

table.tableSolid td {
    text-align: center;
    border: 1px solid #5d6077;
    padding: 2px;
    font-size: 11px;
}

table.tableSolid tr.rowSelect {
    background-color: #d1481e;
}

table.tableCard {
    width: 100%;
    border: none;
}

table.tableCard td {
    text-align: center;
    font-size: 11px;
}

table.tableBorderNone td {
    border: none;
}

table.tableSolid td.msgW {
    padding: 8px;
    vertical-align: top;
    text-align: left;
    background-color: white;
    color: black;
}

table.tableSolid td.msgW p {
    color: black;
}


span.tableNavigationDisabled {
    font-size: 13px !important;
	color: #050505;
}

span.tableNavigationEnabled a:link, span.tableNavigationEnabled a:visited, span.tableNavigationEnabled a:hover, span.tableNavigationEnabled a:active {
	text-decoration: none;
    font-size: 13px !important;
	color: #FFF;
}

ul.pagination {margin:0;padding:0;list-style:none;}
ul.pagination li {display:inline;margin:0 .1em;}
ul.pagination li a, ul.pagination li.active, ul.pagination .off {padding:0 2px 0 3px;}
ul.pagination li a {color:#000;text-decoration:none;}
ul.pagination li a:hover {
  background: #d1481e; 
    color:#fff;
    text-decoration:none;
}
ul.pagination li.active {
    color:#fff;
    font-weight:bolder;
}
ul.pagination .prev, ul.pagination .next {
    color: #050505; 
}
ul.pagination .prev a, ul.pagination .next a {
    color: #d1481e; 
    padding:0;
}

span.topStatusUp {
	text-align: center;
	font-size: 10px;
    color: #FFF;
}

span.topStatusDown {
	text-align: center;
	font-size: 10px;
    color: #FFF;
}

span.tableHeaderSortDirector {
	text-align: center;
	font-size: 10px;
    color: #FFF;
}

span.tableMessagingIncoming, span.tableMessagingOutcoming {
	text-align: center;
	font-size: 13px;
    color: #FFF;
}

input.browseFile {
    border: 2px solid #FFF;
    font-family: Arial, Tahoma, Helvetica, sans-serif;
    font-size: 12px;
}


#shortcutPresent * {
    margin: 0px;
    padding: 0px;
}

#shortcutPresent {
    font-size: 11px;
    border: 1px solid #f90;
    position: absolute;
    visibility: hidden;
    z-index: +1;
    /*background-color: #fff;*/
    padding: 5px 1px;

    background: url( /res/dk/one/icons/labels/white_semitransparent_a_1x1.png ) repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/white_semitransparent_a_1x1.png,sizingMethod=scale);
}
#headerJsp { width: 976px; margin: 0 auto; }
#headerJsp * {
    margin: 0;
    padding: 0;
    font-size: 11px;
}

#headerLogo {
    text-align: left;
    margin-right: 10px;
}

#headerBannerLarge {
    text-align: center;
    padding-bottom: 7px;
}

#headerBannerSmall {
    margin-left: 10px;
    text-align: right;
}

#headerDate, #headerTooltip, #headerLangSwitch {
    width: 33%;
}

#headerDate {
    text-align: left;
}

#headerTooltip {
    text-align: center;
}

#headerLangSwitch {
    text-align: right;
}

#headerDate, #headerTooltip {
    padding-top: 3px;
    padding-bottom: 3px;
}

#headerLangSwitch em, #headerJsp div.Header-Language {
    margin-left: 15px;
    font-style: normal;
    vertical-align: middle;
}

#headerLangSwitch a, #headerJsp div.Header-Language a {
    text-decoration: none;
}



#navigation {
    padding: 0px 3px;
}

#navigation table {
    border-collapse: collapse;
}

#navigation td {
    width: 20%;
    text-align: center;
    border: white solid 3px;
}

#navigation td a:link, #navigation td a:visited {
    color: white;
    background-color: #d1481e;
    font-family: Arial, Tahoma, Helvetica, sans-serif;
    font-size: 13px;
    font-weight: bold;
    line-height: 1.85em;
    text-decoration: none;
    text-transform: uppercase;
    display: block;
}

#navigation td a:hover {
    background-color: #d1481e;
}

#navigation td.select a, #navigation td.select a:link, #navigation td.select a:visited {
    background-color: #d1481e;
}

#navigation td.home, #navigation td.logout {
    width: 22px;
    height: 22px;
    text-indent: -1000px;
}

#navigation td.home a, #navigation td.logout a {
    overflow: hidden;
    width: 22px;
}

#navigation td.home a {
    background: #d1481e url( /res/dk/one/icons/pane/home.gif ) no-repeat 3px 4px;
}

#navigation td.logout a {
    background: #d1481e url( /res/dk/one/icons/pane/logout.gif ) no-repeat 3px 4px;
}

#layout-Navigation {
    padding: 0px 3px;
}

#layout-Navigation .WLoginPanel-Panel {
    background-color: #d1481e;
    border: white solid 3px;
}

#layout-Navigation .WLoginPanel-Panel td {
    height: 25px;
}

#layout-Navigation .WLoginPanel-Panel .WLoginPanel-Label, #layout-Navigation .WLoginPanel-Panel .WLoginPanel-Link a {
    margin: 0px 10px;
    color: white;
    font: Arial, Tahoma, Helvetica, sans-serif;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
}

#layout-Navigation .WLoginPanel-Panel .WLoginPanel-Link a:hover {
    text-decoration: underline;
}

#layout-Navigation .WLoginPanel-Panel input {
    width: 90px;
    height: 13px;
    font-size: 11px;
}

#layout-Navigation .WLoginPanel-Panel .WLoginPanel-Button {
    height: 20px;
    margin: 0px 10px;
    color: white;
    background-color: #d1481e;
    font: Arial, Tahoma, Helvetica, sans-serif;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
}
#layout-Page {
    width: 100%;
}

#layout-Page-anonym {
    width: 750px;
    margin: 0 auto;
}

#layout-Page-login, #layout-Page-failure {
    width: 400px;
    margin: 0 auto;
}

#bannerCommunity1, #bannerCommunity2, #bannerCommunity5, #bannerCommunity6 {
    margin: 0px auto;
    padding: 10px 0px;
    text-align: center;
}

#bannerCommunity9, #bannerCommunity3, #bannerCommunity4, #bannerCommunity10, 
#bannerInfoblock2, #bannerF5{
    margin: 0px auto;
    padding: 0px 0px 10px 0px;
    text-align: center;
}
/*
#bannerCommunity4 {
    margin: 0px auto;
    padding: 0px 0px;
    text-align: center;
}

#bannerCommunity10 {
    margin: 0px auto;
    padding: 5px 0px 0px 0px;
    text-align: center;
}*/

#layout-Banner-center {
    width: 365px;
    height: 178px;
    margin: 7px 10px;
}

.Banner_side {
    top: 0;
    overflow: hidden;
    position: absolute;
    width: 100px;
    height: 1200px;
    z-index: 100;
}

.Banner_side_content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
}

.Banner_scroll {
    left: 0;
    top: 0;
    overflow: hidden;
    position: absolute;
    height: 35px;
    z-index: 101;
}

.Banner_scroll_content {
    left: 0;
    top: 0;
    height: 35px;
    position: absolute;
}



table.photoW {
    margin: 0px auto;
}

table.photoW td {
    border: none;
}

div.photoW {
    position:relative;
    display:inline-block;
    _display:inline;
    _width:1px;
    margin-bottom: 3px;
    z-index: 0;
}

div.slide-show {
    height:128px;
}

img.mood {
    position: absolute;
    top: -8px;
    left: 3px;
    border: 2px solid #FFF;
}

img.mood-no-border {
  position: absolute;
  top: 0px;
  left: 3px;
  border: 0px;
}

table.slideW {
    margin: 0px auto;
    width: 140px;
    height: 142px;
}

table.slideW td {
    text-align: center;
    vertical-align: bottom;
    border: none;
}

.clearing {
    font-size: 1px;
    line-height: 0px;
    clear: both;
}

div.msg-area p {
    margin: 0px;
}

#eventMsgW {
    margin: 0px auto;
    padding: 5px 5px 20px;
    background-color: white;
    color: black;
    width: 165px;
    overflow: auto;
}

#eventMsgW p {
    color: black;
    margin: 0;
    padding: 0;
}

/* START: labels.css */
.Clickable {
    cursor: pointer;
}

div.arrowPath {
    width: 18px;
    height: 18px;
    background: url( /res/dk/one/icons/labels/arrowPath.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/arrowPath.png,sizingMethod=crop);
}

span.labelBirthday {
    font-size: 20px;
    padding: 0px 10px;
    margin-left: 5px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    background: url( /res/dk/one/icons/labels/tort_20.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/tort_20.png,sizingMethod=crop);
}

div.mark30small, div.mark20small, div.mark10small, div.mark5small, div.mark4small, div.mark3small, div.mark2small, div.mark1small {
    font-size: 25px;
    display: inline;
    padding: 0px 14px;
    width: 28px;
    height: 28px;
    vertical-align: middle;
}

div.mark50small {
    font-size: 25px;
    display: inline;
    padding: 8px 20px;
    width: 40px;
    height: 40px;
    vertical-align: middle;	
    background: url( /res/dk/one/icons/mark/50_40x40.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/50_40x40.png,sizingMethod=crop);
}

div.mark30small {
    background: url( /res/dk/one/icons/mark/30_28x28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/30_28x28.png,sizingMethod=crop);
}

div.mark20small {
    background: url( /res/dk/one/icons/mark/20_28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/20_28.png,sizingMethod=crop);
}

div.mark10small {
    background: url( /res/dk/one/icons/mark/10_28x28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/10_28x28.png,sizingMethod=crop);
}

div.mark5small {
    background: url( /res/dk/one/icons/mark/5_28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/5_28.png,sizingMethod=crop);
}

div.mark4small {
    background: url( /res/dk/one/icons/mark/4_28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/4_28.png,sizingMethod=crop);
}

div.mark3small {
    background: url( /res/dk/one/icons/mark/3_28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/3_28.png,sizingMethod=crop);
}

div.mark2small {
    background: url( /res/dk/one/icons/mark/2_28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/2_28.png,sizingMethod=crop);
}

div.mark1small {
    background: url( /res/dk/one/icons/mark/1_28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/1_28.png,sizingMethod=crop);
}

div.mark30, div.mark20, div.mark10, div.labelService8, div.labelService7, div.labelService6 {
    width: 60px;
    height: 60px;
}

div.mark50 {
	width: 66px;
	height: 66px;
    background: url( /res/dk/one/icons/mark/50_66x66.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/50_66x66.png,sizingMethod=crop);
}

div.mark30, div.labelService8 {
    background: url( /res/dk/one/icons/mark/30.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/30.png,sizingMethod=crop);
}

div.mark20, div.labelService7 {
    background: url( /res/dk/one/icons/mark/20.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/20.png,sizingMethod=crop);
}

div.mark10, div.labelService6 {
    background: url( /res/dk/one/icons/mark/10.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/10.png,sizingMethod=crop);
}

div.mark5, div.mark4, div.mark3, div.mark2, div.mark1 {
    width: 45px;
    height: 45px;
}

div.mark5 {
    background: url( /res/dk/one/icons/mark/5.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/5.png,sizingMethod=crop);
}

div.mark4 {
    background: url( /res/dk/one/icons/mark/4.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/4.png,sizingMethod=crop);
}

div.mark3 {
    background: url( /res/dk/one/icons/mark/3.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/3.png,sizingMethod=crop);
}

div.mark2 {
    background: url( /res/dk/one/icons/mark/2.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/2.png,sizingMethod=crop);
}

div.mark1 {
    background: url( /res/dk/one/icons/mark/1.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/mark/1.png,sizingMethod=crop);
}

div.labelLove, div.labelLoveFail, div.labelRiskGame-0, div.labelRiskGame-1, div.labelRiskGame-2, div.labelRiskGame-3, div.labelRiskGame-4, div.labelKiss70, div.labelYes, div.labelNo, div.labelLoveGame-1, div.labelLoveGame-2{
    width: 70px;
    height: 70px;
}

div.labelLove, div.labelLoveGame-1, div.labelLoveGame-2 {
    background: url( /res/dk/one/icons/labels/love_70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/love_70.png,sizingMethod=crop);
}

div.labelLoveGame-0 {
    width: 140px;
    height: 70px;
    background: url( /res/dk/one/icons/labels/heart_140x70_with_wings.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/heart_140x70_with_wings.png,sizingMethod=crop);
}

div.labelLoveFail, div.labelLoveGame-2 {
    background: url( /res/dk/one/icons/labels/loveGray_70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/loveGray_70.png,sizingMethod=crop);
}

div.labelRiskGame-0, div.labelRiskGame-2, div.labelKiss70 {
    background: url( /res/dk/one/icons/labels/kiss_70_1.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/kiss_70_1.png,sizingMethod=crop);
}

div.labelRiskGame-1, div.labelLoveRiskGame-1, div.labelYes {
    background: url( /res/dk/one/icons/labels/yes_68x70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/yes_68x70.png,sizingMethod=crop);
}

div.labelRiskGame-3, div.labelLoveRiskGame-2, div.labelNo {
    background: url( /res/dk/one/icons/labels/no_68x70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/no_68x70.png,sizingMethod=crop);
}

div.labelRiskGame-4 {
    background: url( /res/dk/one/icons/labels/arrow2_68x70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/arrow2_68x70.png,sizingMethod=crop);
}

div.labelKiss50 {
    width: 50px;
    height: 32px;
    background: url( /res/images/labels/mood-riskgame_1.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/images/labels/mood-riskgame_1.png,sizingMethod=crop);
}

div.labelPlace1 {
    width: 42px;
    height: 45px;
    background: url( /res/dk/one/icons/labels/place1_42x45.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/place1_42x45.png,sizingMethod=crop);
}

div.labelPlace2 {
    width: 38px;
    height: 38px;
    background: url( /res/dk/one/icons/labels/place2_38.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/place2_38.png,sizingMethod=crop);
}

div.labelPlace3 {
    width: 30px;
    height: 32px;
    background: url( /res/dk/one/icons/labels/place3_30x32.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/place3_30x32.png,sizingMethod=crop);
}


div.labelHeart70, div.labelService28 {
    width: 70px;
    height: 70px;
    background: url( /res/dk/leopard/icons/labels/heart_70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/leopard/icons/labels/heart_70.png,sizingMethod=crop);
}

div.labelService1, div.labelService2, div.labelService3, div.labelService4, div.labelService5, div.labelService9, div.labelService10, div.labelService11, div.labelService20, div.labelService21, div.labelService25, div.labelService27, div.labelService31, div.labelService35, div.labelFileTransfer, div.labelService45, div.labelService46, div.labelService53 {
    width: 103px;
    height: 91px;
}

div.labelService1 {
    background: url( /res/dk/one/icons/labels/viewGuest_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/viewGuest_103x91.png,sizingMethod=crop);
}

div.labelService2 {
    background: url( /res/dk/one/icons/labels/search_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/search_103x91.png,sizingMethod=crop);
}

div.labelService3 {
    background: url( /res/dk/one/icons/labels/viewPhoto_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/viewPhoto_103x91.png,sizingMethod=crop);
}

div.labelService4 {
    background: url( /res/dk/one/icons/labels/addPhoto_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/addPhoto_103x91.png,sizingMethod=crop);
}

div.labelService5 {
    background: url( /res/dk/one/icons/labels/viewMark_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/viewMark_103x91.png,sizingMethod=crop);
}

div.labelService9 {
    background: url( /res/dk/one/icons/labels/hidden_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/hidden_103x91.png,sizingMethod=crop);
}

div.labelService10 {
    background: url( /res/dk/one/icons/labels/notify_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/notify_103x91.png,sizingMethod=crop);
}

div.labelService11, div.labelService21 {
    background: url( /res/dk/one/icons/labels/delete_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/delete_103x91.png,sizingMethod=crop);
}

div.labelService20 {
    background: url( /res/dk/one/icons/labels/chat_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/chat_103x91.png,sizingMethod=crop);
}

div.labelService25 {
    background: url( /res/dk/one/icons/labels/animation_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/animation_103x91.png,sizingMethod=crop);
}

div.labelService27 {
    background: url( /res/dk/one/icons/labels/formatText_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/formatText_103x91.png,sizingMethod=crop);
}

div.labelService30 {
    width: 92px;
    height: 92px;
    background: url( /res/dk/one/icons/labels/kiss_92x92.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/kiss_92x92.png,sizingMethod=crop);
}

div.labelService31 {
    background: url( /res/dk/one/icons/labels/slideShow_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/slideShow_103x91.png,sizingMethod=crop);
}

div.labelService35 {
    background: url( /res/dk/one/icons/labels/skin_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/skin_103x91.png,sizingMethod=crop);
}

div.labelService50 {
    width: 92px;
    height: 92px;	
    background: url( /res/dk/one/icons/labels/presentsPack_92x92.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentsPack_92x92.png,sizingMethod=crop);
}

div.labelService53 {
    background: url( /res/dk/one/icons/labels/smile_extra_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/smile_extra_103x91.png,sizingMethod=crop);
}

div.labelService500 {
    width: 92px;
    height: 92px;
    background: url( /res/dk/one/icons/labels/billing_92x92.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/billing_92x92.png,sizingMethod=crop);
}

div.labelService501 {
    width: 92px;
    height: 92px;
    background: url( /res/dk/one/icons/labels/vip_92x92.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/vip_92x92.png,sizingMethod=crop);
}

div.labelService502 {
    width: 92px;
    height: 92px;
    background: url( /res/dk/one/icons/labels/vip_92x92.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/vip_92x92.png,sizingMethod=crop);
}

div.vip92x92 {
    width: 92px;
    height: 92px;
    background: url( /res/dk/one/icons/labels/vip_92x92.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/vip_92x92.png,sizingMethod=crop);
}

div.vip_card_92x92 {
    width: 92px;
    height: 92px;
    background: url( /res/dk/one/icons/labels/vip_card_92x92.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/vip_card_92x92.png,sizingMethod=crop);
}

div.vip_hero_92x92 {
    width: 92px;
    height: 92px;
    background: url( /res/dk/one/icons/labels/vip_hero_92x92.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/vip_hero_92x92.png,sizingMethod=crop);
}

div.labelService55,div.labelService54,div.adv103x91 {
    width: 103px;
    height: 91px;
    background: url( /res/dk/one/icons/labels/noadv_103x91.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/noadv_103x91.png,sizingMethod=crop);
}
div.billing92x92 {
    width: 92px;
    height: 92px;
    background: url( /res/dk/one/icons/labels/billing_92x92.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/billing_92x92.png,sizingMethod=crop);
}

div.labelPresentCategoryBig1, div.labelPresentCategoryBig2, div.labelPresentCategoryBig3, div.labelPresentCategoryBig4, div.labelPresentCategoryBig5, div.labelPresentCategoryBig6, div.labelPresentCategoryBig8 {
    width: 92px;
    height: 92px;
}

div.labelPresentCategoryBig1 {
    background: url( /res/dk/one/icons/labels/presentcategories/flowers_92x92.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/flowers_92x92.png,sizingMethod=crop);
}

div.labelPresentCategoryBig2 {
    background: url( /res/dk/one/icons/labels/presentcategories/romantic_92x92.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/romantic_92x92.png,sizingMethod=crop);
}

div.labelPresentCategoryBig3 {
    background: url( /res/dk/one/icons/labels/presentcategories/toys_92x92.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/toys_92x92.png,sizingMethod=crop);
}

div.labelPresentCategoryBig4 {
    background: url( /res/dk/one/icons/labels/presentcategories/other_92x92.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/other_92x92.png,sizingMethod=crop);
}

div.labelPresentCategoryBig5 {
    background: url( /res/dk/one/icons/labels/presentcategories/medals_92x92.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/medals_92x92.png,sizingMethod=crop);
}

div.labelPresentCategoryBig6 {
    background: url( /res/dk/one/icons/labels/presentcategories/terror_92x92.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/terror_92x92.png,sizingMethod=crop);
}

div.labelPresentCategoryBig8 {
    background: url( /res/dk/one/icons/labels/presentcategories/animated_92x92.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/animated_92x92.png,sizingMethod=crop);
}

div.labelPresentCategoryMid1, div.labelPresentCategoryMid2, div.labelPresentCategoryMid3, div.labelPresentCategoryMid4, div.labelPresentCategoryMid5, div.labelPresentCategoryMid6, div.labelPresentCategoryMid8 {
    width: 70px;
    height: 70px;
}

div.labelPresentCategoryMid1 {
    background: url( /res/dk/one/icons/labels/presentcategories/flowers_70x70_1.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/flowers_70x70_1.png,sizingMethod=crop);
}

div.labelPresentCategoryMid2 {
    background: url( /res/dk/one/icons/labels/presentcategories/romantic_70x70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/romantic_70x70.png,sizingMethod=crop);
}

div.labelPresentCategoryMid3 {
    background: url( /res/dk/one/icons/labels/presentcategories/toys_70x70_1.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/toys_70x70_1.png,sizingMethod=crop);
}

div.labelPresentCategoryMid4 {
    background: url( /res/dk/one/icons/labels/presentcategories/other_70x70_1.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/other_70x70_1.png,sizingMethod=crop);
}

div.labelPresentCategoryMid5 {
    background: url( /res/dk/one/icons/labels/presentcategories/medals_70x70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/medals_70x70.png,sizingMethod=crop);
}

div.labelPresentCategoryMid6 {
    background: url( /res/dk/one/icons/labels/presentcategories/terror_70x70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/terror_70x70.png,sizingMethod=crop);
}

div.labelPresentCategoryMid8 {
    background: url( /res/dk/one/icons/labels/presentcategories/animated_70x70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/animated_70x70.png,sizingMethod=crop);
}

div.labelPresentCategorySmall1, div.labelPresentCategorySmall2, div.labelPresentCategorySmall3, div.labelPresentCategorySmall4, div.labelPresentCategorySmall5, div.labelPresentCategorySmall6, div.labelPresentCategorySmall8 {
    width: 28px;
    height: 28px;
}

div.labelPresentCategorySmall1 {
    background: url( /res/dk/one/icons/labels/presentcategories/flowers_28x28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/flowers_28x28.png,sizingMethod=crop);
}

div.labelPresentCategorySmall2 {
    background: url( /res/dk/one/icons/labels/presentcategories/romantic_28x28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/romantic_28x28.png,sizingMethod=crop);
}

div.labelPresentCategorySmall3 {
    background: url( /res/dk/one/icons/labels/presentcategories/toys_28x28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/toys_28x28.png,sizingMethod=crop);
}

div.labelPresentCategorySmall4 {
    background: url( /res/dk/one/icons/labels/presentcategories/other_28x28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/other_28x28.png,sizingMethod=crop);
}

div.labelPresentCategorySmall5 {
    background: url( /res/dk/one/icons/labels/presentcategories/medals_28x28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/medals_28x28.png,sizingMethod=crop);
}

div.labelPresentCategorySmall6 {
    background: url( /res/dk/one/icons/labels/presentcategories/terror_28x28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/terror_28x28.png,sizingMethod=crop);
}

div.labelPresentCategorySmall8 {
    background: url( /res/dk/one/icons/labels/presentcategories/animated_1_28x28.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/presentcategories/animated_1_28x28.png,sizingMethod=crop);
}

div.labelFileTransfer {
    background: url( /res/dk/one/icons/labels/fileTransfer_103x91.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/fileTransfer_103x91.png,sizingMethod=crop);
}

div.labelFileTransferMid {
    width: 60px;
    height: 53px;
    background: url( /res/dk/one/icons/labels/fileTransfer_60x53.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/fileTransfer_60x53.png,sizingMethod=crop);
}

div.labelOne {
    width: 139px;
    height: 65px;
    background: url( /res/dk/one/icons/labels/one_139x65.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/one_139x65.png,sizingMethod=crop);
}

div.labelInvite-email {
    width: 70px;
    height: 70px;
    background: url( /res/dk/one/icons/labels/inviteEmail_70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/inviteEmail_70.png,sizingMethod=crop);
}

div.labelInvite-mobile {
    width: 70px;
    height: 70px;
    background: url( /res/dk/one/icons/labels/inviteMobile_70.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/inviteMobile_70.png,sizingMethod=crop);
}

div.labelInvite-login-lv, div.labelInvite-login-lt {
    width: 130px;
    height: 60px;
    background: url( /res/dk/one/icons/labels/inviteOne_130x60.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/inviteOne_130x60.png,sizingMethod=crop);
}

div.labelKiss28, div.labelKissAccept, div.labelKissSkip, div.labelKissDecline {
    width: 28px;
    height: 28px;
}

div.labelKiss28 {
    background: url( /res/dk/one/icons/labels/kiss_28_1.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/kiss_28_1.png,sizingMethod=crop);
}

span.labelTheme {
    font-size: 16px;
	width: 16px;
	height: 16px;
	padding: 0px 8px;
    background: url( /res/dk/one/icons/menu/theme.gif ) no-repeat;
}

span.shortcutPersonalPage {
    font-size: 16px;
	width: 16px;
	height: 16px;
	padding: 0px 8px;
    background: url( /res/images/shortcut/links_16x16.gif ) no-repeat;
    cursor: pointer;
}

span.labelSkin {
    font-size: 16px;
	width: 16px;
	height: 16px;
	padding: 0px 8px;
    background: url( /res/images/shortcut/skin.gif ) no-repeat;
}

span.shortcutSkin {
    font-size: 16px;
	width: 16px;
	height: 16px;
	padding: 0px 8px;
    background: url( /res/images/shortcut/skin.gif ) no-repeat;
    cursor: pointer;
}

div.labelZZ {
    width: 41px;
    height: 25px;
    background: url( /res/images/sponsor/zz.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/images/sponsor/zz.png,sizingMethod=crop);
}

div.labelPhotoTopWon {
    width: 46px;
    height: 46px;
    background: url( /res/dk/one/icons/labels/top_won_46.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/top_won_46.png,sizingMethod=crop);
}

div.labelPhotoTopWonBig {
    width: 98px;
    height: 98px;
    background: url( /res/dk/one/icons/labels/top_won_98.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/top_won_98.png,sizingMethod=crop);
}

span.labelFlagRed {
    width: 14px;
    height: 16px;
    font-size: 16px;
    padding: 0 7px;
    margin-right: 5px;
    vertical-align: middle;
    background: url( /res/dk/one/icons/labels/flag_red_14x16.gif ) no-repeat;
}

span.labelFlag {
    width: 14px;
    height: 16px;
    font-size: 16px;
    padding: 0 7px;
    margin-right: 5px;
    vertical-align: middle;
    background: url( /res/dk/one/icons/labels/flag_red_14x16.gif ) no-repeat;
}

div.labelUOGroup {
    width: 16px;
    height: 17px;
}

div.groupNotification-F, div.groupNotification-J, div.groupNotification-P {
    width: 103px;
    height: 91px;
    margin: 0px auto;
}

div.groupNotification-F {
    background: url( /res/images/labels/groupNotification-F.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/images/labels/groupNotification-F.png,sizingMethod=crop);
}

div.groupNotification-J {
    background: url( /res/images/labels/groupNotification-J.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/images/labels/groupNotification-J.png,sizingMethod=crop);
}

div.groupNotification-P {
    background: url( /res/images/labels/groupNotification-P.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/images/labels/groupNotification-P.png,sizingMethod=crop);
}

div.eMailNotification {
    width: 90px;
    height: 71px;
    margin: 12px 0px 0px 0px;
    border: 1px;
    background: url( /res/images/labels/letter_icon.png ) no-repeat;
    //background: none;  /* to work around MSIE png alpha transparency bug  */
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/images/labels/letter_icon.png,sizingMethod=crop);
}

span.labelActivity {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/activity.gif ) no-repeat;
}

span.labelActivityPhoto {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/photo2.gif ) no-repeat;
}

span.labelActivityProfile {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/profile.gif ) no-repeat;
}

span.labelActivityGroup {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/group.gif ) no-repeat;
}

div.labelVIP {
	width: 70px;
    height: 70px;
    background: url( /res/dk/one/icons/labels/vip_70x70.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/vip_70x70.png,sizingMethod=crop);
}

div.labelVIP1 {
    width: 70px;
    height: 70px;
    background: url( /res/dk/one/icons/labels/vip_card_70x70.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/vip_card_70x70.png,sizingMethod=crop);
}

div.labelVIP2 {
    width: 70px;
    height: 70px;
    background: url( /res/dk/one/icons/labels/vip_hero_70x70.png ) no-repeat;
    //background: none;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/one/icons/labels/vip_hero_70x70.png,sizingMethod=crop);
}

span.labelActivityForum {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/forum2.gif ) no-repeat;
}

span.labelActivityFriend {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/friend.gif ) no-repeat;
}

span.labelActivityClub {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/clubs/clubs_activity_v1.gif ) no-repeat;
}

span.labelActivityPresent {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/gift2.gif ) no-repeat;
}

span.labelActivitySkin {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/skin.gif ) no-repeat;
}

span.labelActivityAuction {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/auction.gif ) no-repeat;
}

span.labelActivityEducation {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/odnoklasniki.gif ) no-repeat;
}

span.labelActivityExtra {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/extra.gif ) no-repeat;
}

span.labelActivityPhototop {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/images/shortcut/top_photos.gif ) no-repeat;
}

div.labelPresentShowFriend {
    position: absolute;
    width: 12px;
    height: 12px;
    bottom: 0px;
    right: 0px;
    background: url( /res/dk/one/icons/labels/friend_12x12.gif ) no-repeat;
}
span.labelActivityUserSmile {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/one/icons/labels/smile.gif ) no-repeat;
}
/* END: labels.css */

div.arrowPath {
        width: 17px;
    height: 13px;
    background: url( /res/dk/leopard/icons/labels/arrowPath.gif ) no-repeat;
}

div.mark5small, div.mark4small, div.mark3small, div.mark2small, div.mark1small {
    font-size: 25px;
    display: inline;
    padding: 0px 14px;
    width: 28px;
    height: 28px;
    vertical-align: middle;
}


div.mark5small {
    background: url( /res/dk/leopard/icons/mark/5_28.png ) no-repeat;
    //background: nleopard;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/leopard/icons/mark/5_28.png,sizingMethod=crop);
}

div.mark4small {
    background: url( /res/dk/leopard/icons/mark/4_28.png ) no-repeat;
    //background: nleopard;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/leopard/icons/mark/4_28.png,sizingMethod=crop);
}

div.mark3small {
    background: url( /res/dk/leopard/icons/mark/3_28.png ) no-repeat;
    //background: nleopard;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/leopard/icons/mark/3_28.png,sizingMethod=crop);
}

div.mark2small {
    background: url( /res/dk/leopard/icons/mark/2_28.png ) no-repeat;
    //background: nleopard;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/leopard/icons/mark/2_28.png,sizingMethod=crop);
}

div.mark1small {
    background: url( /res/dk/leopard/icons/mark/1_28.png ) no-repeat;
    //background: nleopard;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/leopard/icons/mark/1_28.png,sizingMethod=crop);
}


div.mark5, div.mark4, div.mark3, div.mark2, div.mark1 {
    width: 43px;
    height: 43px;
}

div.mark5 {
    background: url( /res/dk/leopard/icons/mark/5.png ) no-repeat;
    //background: nleopard;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/leopard/icons/mark/5.png,sizingMethod=crop);
}

div.mark4 {
    background: url( /res/dk/leopard/icons/mark/4.png ) no-repeat;
    //background: nleopard;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/leopard/icons/mark/4.png,sizingMethod=crop);
}

div.mark3 {
    background: url( /res/dk/leopard/icons/mark/3.png ) no-repeat;
    //background: nleopard;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/leopard/icons/mark/3.png,sizingMethod=crop);
}

div.mark2 {
    background: url( /res/dk/leopard/icons/mark/2.png ) no-repeat;
    //background: nleopard;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/leopard/icons/mark/2.png,sizingMethod=crop);
}

div.mark1 {
    background: url( /res/dk/leopard/icons/mark/1.png ) no-repeat;
    //background: nleopard;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/res/dk/leopard/icons/mark/1.png,sizingMethod=crop);
}

span.labelTheme {
    font-size: 16px;
	width: 16px;
	height: 16px;
	padding: 0px 8px;
    background: url( /res/dk/leopard/icons/menu/theme.gif ) no-repeat;
}

span.shortcutPersonalPage {
    font-size: 16px;
	width: 16px;
	height: 16px;
	padding: 0px 8px;
    background: url( /res/dk/leopard/icons/menu/links_16x16_white.gif ) no-repeat;
    cursor: pointer;
}

span.labelSkin {
    font-size: 16px;
	width: 16px;
	height: 16px;
	padding: 0px 8px;
    background: url( /res/dk/leopard/icons/menu/theme.gif ) no-repeat;
}

span.shortcutSkin {
    font-size: 16px;
	width: 16px;
	height: 16px;
	padding: 0px 8px;
    background: url( /res/dk/leopard/icons/menu/theme.gif ) no-repeat;
    cursor: pointer;
}

span.labelFlagRed {
    background: url( /res/dk/one/icons/labels/flag_white_14x16.gif ) no-repeat;
}

div.labelQAGame {
    background: url( /res/dk/leopard/icons/menu/qagame.gif ) no-repeat;
}

span.labelActivity {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/activity.gif ) no-repeat;
}

span.labelActivityPhoto {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/photo.gif ) no-repeat;
}

span.labelActivityProfile {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/profile.gif ) no-repeat;
}

span.labelActivityGroup {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/menu-group.gif ) no-repeat;
}

span.labelActivityForum {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/forum.gif ) no-repeat;
}

span.labelActivityFriend {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/friends.gif ) no-repeat;
}

span.labelActivityClub {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/clubs_activity_v1.gif ) no-repeat;
}

span.labelActivityPresent {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/gifts.gif ) no-repeat;
}

span.labelActivitySkin {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/theme.gif ) no-repeat;
}

span.labelActivityAuction {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/auction.gif ) no-repeat;
}

span.labelActivityEducation {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/schoolmates.gif ) no-repeat;
}

span.labelActivityExtra {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/extra.gif ) no-repeat;
}

span.labelActivityPhototop {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/top-photos.gif ) no-repeat;
}
span.labelActivityUserSmile {
    padding: 1px 8px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url( /res/dk/leopard/icons/menu/smile.gif ) no-repeat;
}/* deprecated */
#footer a:link, #footer a:visited {
    color: black;
}

/* deprecated */
#footer a:hover {
    color: red;
}

#layout-Footer a:link, #layout-Footer a:visited {
    color: black;
}

#layout-Footer a:hover {
    color: red;
}

#layout-Footer .WFooter-Panel {
    margin: 15px 0 35px;
    border-top: 1px solid black;
}.smile-bar {display:block;width:315px;height:40px;text-decoration:none;text-align:center;}
.smile-bar b.r {padding:3px 0;}
.smile-bar img {display:inline;line-height:40px;vertical-align:middle;}
.smile-bar b.r, .smile-bar b.r1, .smile-bar b.r2, .smile-bar b.r1t, .smile-bar b.r2t, .smile-bar b.corner b {background: #FFF;}
b.r,b.r1, b.r2, b.r1t, b.r2t, b.corner b {position:relative;display:block;width:auto;height:1px;margin:0;border:1px solid #d1481e;background:#fff;overflow:hidden;font-size:1px;font-weight:normal;}
b.r,b.r1, b.r2, b.r1t, b.r2t {border-width:0 1px;}
b.r {height:auto;font-size:11px;}
b.r1 {margin:0 1px;}
b.r2 {margin:0 2px;height:0px;_height:1px;border-width:1px 0 0 0;}

.smiles-tag {
	display: block;
	width: 200px;
	height: 18px;
	text-decoration: none;
	text-align: center;
}
.smiles-tag b.r {
	padding: 2px 0 3px 0;
	font-size: 9px;
	font-weight: bold;
	height: auto;
}
b.r2t {
	border-width: 1px 0 0 0;
	height: 0;
	_height:1px;
	margin: 0 0 0 2px;
}
b.r1t {
	margin: 0px 0px 0px 1px;
}
.smiles-tag b.r, .smiles-tag b.r1, .smiles-tag b.r2 {
	background: #d1481e;
	color: #fff;
}
