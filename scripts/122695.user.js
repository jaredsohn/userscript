// ==UserScript==
// @name Auto Refresh
// @include https://pg.securecodecenter.com/QueueScanner.aspx?stageid=2
// @include https://pg.securecodecenter.com/Queue.aspx?stageid=3
// @include https://pg.securecodecenter.com/Queue.aspx?stageid=5
// ==/UserScript==
var delay = '900';
if (delay > 0) setTimeout("location.reload(true);",delay*1000);
