// ==UserScript==
// @id             DuoMiDLAndPlayOnline
// @name           DuoMi DL And Play Online
// @version        1.0.2.2
// @namespace      Jixun.Org
// @author         Jixun66
// @description    DL and play Duomi.com Music with out install plugin
// @include        http://www.duomi.com/*
// @include        http://duomi.com/*
// @run-at         document-end
// ==/UserScript==

(function () {
    try {
        var win = unsafeWindow;
    } catch (e) {
        // For opera?
        var win = window;
    }
    win.console.log ('DM :: Start :: Version :: 1.0.2.2');
    
    function rA (a) {
        var p=document.querySelectorAll (a);
        for (i=0; i<p.length; i++) { p[i].parentNode.removeChild (p[i])};
    }

    // If user hasn't have the plugin installed or wrong page
    if (win.isPluginInstall && !win.isPluginInstall()){
        win.console.log ('DM :: Hook Func Start');
        win.play =  function (id) {
            win.location.href = '//www.duomi.com/track/' + id;
        };
        win.down = function (id) {
            win.location.href = '//www.duomi.com/third-ajaxthird-play?id=' + id;
        }
        // Play-All Removal
        rA('.all_play');
        
        win.console.log ('DM :: Hook Func Finish');
    } else { win.console.log ('DM :: No need to Hook, Skip..') }
    
    // Banner Removal
    rA ('.mob_js');
    // Install Box Removal
    rA ('[id^="fancybox-"]')
    
    // If in the singal track page.
    if (win.location.href.toLowerCase().indexOf('/track/') > 0) {
        win.console.log ('DM :: DL link Start.');
        
        // 小广告，想看就取消注释这几行吧：
        /* 
            win.g_lrcHandlerChn.lrcList.push ({
                'context': 'Jixun.Org',
                'time': '00:00.00'
            });
        */
        
        $t = win.$('#timeCurrent').prev ().prev ();
        $t.after(win.$('<a />').attr ({
            'title': 'Download: ' + $t.text (),
            'href': 'javascript:;',
            'target': '_blank'
        }).css({
            'font-size': 'small',
            'float': 'right'
        }).click(function () {
            try {
                // Firefox
                var addr = win.$("#jquery_jplayer_1").data ().jPlayer.status.src;
            } catch (e) {
                // Chrome not working for some reason,
                // So we have those code to enjoy ;)
                for (i in win.jQuery.cache) {
                    if (win.jQuery.cache [i].jPlayer) {
                        var addr = win.jQuery.cache [i].jPlayer.status.src;
                        break;
                    }
                }
                if (!addr) { alert ('Read download url failed!!'); return ; }
            }
            win.location.href = win.$(this).attr('href',addr).attr('href');
            win.console.log ('DM :: ' + addr);
        }).text ('Download'));
        win.console.log ('DM :: DL link Finish.');
    }
    win.console.log ('DM :: Finish.');
})();