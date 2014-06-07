// ==UserScript==
// @name           Soundcloud UI Cleanup
// @namespace      http://tos.network.in.rs/greasemonkey/soundcloud
// @include        http://*soundcloud.com/*
// ==/UserScript==

unsafeWindow.$('.waveform-overlay').remove();
unsafeWindow.$('.timestamped-comments').css('background-image', 'none');
unsafeWindow.$('.controls').css('background-image', 'none');
unsafeWindow.$('.playhead').css('background-image', 'none');
unsafeWindow.$('.playhead').css('border-right', '1px solid #FF6030');
unsafeWindow.$('.playhead').css('border-top', '5px solid #FF6030');
unsafeWindow.$('.pagination a').css('background-image', 'none');
unsafeWindow.$('.pagination .current').css('background-image', 'none');
unsafeWindow.$('.button').css('background-image', 'none');
unsafeWindow.$('.link-button').css('background-image', 'none');