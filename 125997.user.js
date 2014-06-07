// ==UserScript==
// @name           Facebook AdBlocker
// @namespace      facebook.com
// @version        0.1
// @description    Removes Facebook ads
// @include        *www.facebook.com*
// @copyright      Written by Doron Shem Tov, Based on deebs.net "Facebook Boss"
// ==/UserScript==

GM_addStyle((<><![CDATA[ .storyContent a {color: #325087 !important;} #fbPhotoSnowboxAdsBottom, .fbPhotoSnowboxAdsSponsored,  .ego_section, .ego_column, .pagelet_ego_pane_w {display: none;}  ]]></>).toString()); 
