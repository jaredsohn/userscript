// ==UserScript==
// @name        Next Video Please (StumbleUpon edition)
// @description Automatically stumbles when the current video ends
// @namespace   http://userscripts.org/users/AnnanFay
// @include     http*://video.stumbleupon.com*
// @exclude     http*://video.stumbleupon.com/toolbar/*
// @version     1
// @grant       none
// ==/UserScript==

(function (w) {
    var target = $('#video_box').get(0);
    var observer = new MutationObserver(updateVid);
    var config = { childList: true };
    observer.observe(target, config);

    function updateVid () {
        observer.disconnect();
        var p = $('#stumblevid');
        var embedsrc = '<embed width="100%" height="100%" wmode="opaque" quality="high" bgcolor="#000000" name="stumblevid" id="stumblevid" style="" '
            + 'src="' + p.attr('src') + '&enablejsapi=1" '
            + 'flashvars="' + p.attr('flashvars') + '" type="application/x-shockwave-flash" '
            + 'allowFullscreen="true" allowScriptAccess="always">';
        
        $('#video_box').html(embedsrc).val();
        observer.observe(target, config);
    }

    var state;
    function new_state () {
        if (state === 0) {
            $('#linkStumble img').click();
        }
    }

    function check_state() {
        try {
            var p = $('#stumblevid').get(0);
            var cs = p.getPlayerState();
            var ns = cs !== state;
            state = cs;
            
            if (ns) {
                new_state();
            }
        } catch (e) { };
        setTimeout(check_state, 1000);
    }
    check_state();

}) (unsafeWindow);