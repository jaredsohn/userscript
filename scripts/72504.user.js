// ==UserScript==
// @name           LJ Thread Comments subscribe
// @version        0.1
// @description    Script enables checkbox for thread comments subscription in livejournal.com
// @namespace      LJTCS
// @author         Tapac
// @include        http://www.livejournal.com/manage/subscriptions/comments.bml?journal=*&talkid=*
// ==/UserScript==

var sub02 = document.getElementById('sub-0-2');
var sub01 = document.getElementById('sub-0-1');

sub02.disabled = false;
sub01.disabled = false;