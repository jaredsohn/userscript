// ==UserScript==
// @name          Facebook Font Fixer (Updated With Profile Font Fix)
// @namespace     http://userscripts.org/scripts/new?form=true
// @description   Facebook themes
// @author        Arnab Nandi (updated by Peter Cheung)
// @homepage      http://userscripts.org/users/245183
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// @include   http://www.facebook.com
// @include      https://www.facebook.com
// @include   http://facebook.com/*
// @include   https://facebook.com/*
// @include   http://facebook.com
// @include   https://facebook.com
// ==/UserScript==
(function() {var d=document;var S=d.createElement('style');S.type = 'text/css';S.appendChild(d.createTextNode('#home_stream h6{font-size:13px}'));S.appendChild(d.createTextNode('.uiStream .uiStreamMessage .messageBody {font-size:13px}'));S.appendChild(d.createTextNode('#profile_minifeed .uiStreamMessage .messageBody {line-height:16px}'));S.appendChild(d.createTextNode('.uiStream .uiStreamMessage .actorName {font-size:13px}'));S.appendChild(d.createTextNode('h6.uiStreamMessage.uiStreamPassive {font-size:13px}'));S.appendChild(d.createTextNode('h6.uiStreamMessage.uiStreamPassive.ministoryMessage {font-size:11px}'));S.appendChild(d.createTextNode('.uiStream .uiStreamMessage .actorDescription {font-size:13px}'));S.appendChild(d.createTextNode('.mbs {margin-bottom: 2px;}'));S.appendChild(d.createTextNode('.uiAttachmentNoMedia {border-left: 2px solid #FFFFFF;}'));S.appendChild(d.createTextNode('.MessagingMessage {font-size:13px}'));S.appendChild(d.createTextNode('.MessagingMessage .content {font-size:11px}'));S.appendChild(d.createTextNode('.UIStoryAttachment_Info {font-size:11px}'));S.appendChild(d.createTextNode('.MessagingMessage .rfloat {font-size:11px}'));S.appendChild(d.createTextNode('.mrl.friendTitle.fwb {font-size:13px}'));S.appendChild(d.createTextNode('.externalShareUnit.externalShareHasImage .image {border-right: 1px solid #FFFFFF;}'));S.appendChild(d.createTextNode('.mrl.friendTitle .fcg .fwb {font-size:13px}'));S.appendChild(d.createTextNode('.mrl.friendTitle .fcg {font-size:13px}'));S.appendChild(d.createTextNode('.UIImageBlock_Content.UIImageBlock_SMALL_Content .unitHeader span.fcg span.fwb {font-size:13px}'));S.appendChild(d.createTextNode('.timelineRecentActivityLabel .uiLinkSubtle {font-size:13px}'));S.appendChild(d.createTextNode('.UIImageBlock_Content.UIImageBlock_SMALL_Content .unitHeader span.fcg {font-size:13px}'));S.appendChild(d.createTextNode('.UIImageBlock_Content.UIImageBlock_SMALL_Content span.fwb {font-size:13px}'));S.appendChild(d.createTextNode('.-cx-PRIVATE-fbTimelineUnitActor__header {font-size:13px}'));S.appendChild(d.createTextNode('._1_s {font-size:13px}'));S.appendChild(d.createTextNode('.aboveUnitContent {font-size:13px}'));S.appendChild(d.createTextNode('.permalinkBody .permalink_stream .uiStreamHeadline {font-size:13px}'));S.appendChild(d.createTextNode('h5._1_s {font-size:13px}'));S.appendChild(d.createTextNode('._4lh ._1_s {font-size:13px}'));S.appendChild(d.createTextNode('._5sem ._1_s, ._cf_._4lh ._1_s {font-size:13px}'));d.body.appendChild(S);})();
