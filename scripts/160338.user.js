// ==UserScript==
// @name             FarmWatchdog [GW]
// @description      Уведомления для фермы
// @include          http://www.ganjawars.ru/ferma.php*
// @version          0.3
// @author           Jimmy Banditto
// @namespace        http://www.ganjawars.ru/info.php?id=611489
// ==/UserScript==

(function() {
    var eSound = 8;    // Номер звука (1-30), 0 - если звук не нужен

    var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

    if(root.document.body.innerHTML.indexOf('уже пора') == -1) {
        var eTime = 60 * /\(через (.+?) мин.\)/.exec(root.document.body.innerHTML)[1] - 1;
        root.document.title = '[' + getTime(eTime) + '] Ганжаферма';
        root.setInterval(function() {
            if(eTime != 0)
                eTime--;
            root.document.title = '[' + getTime(eTime) + '] Ганжаферма'; if(eTime == 0) root.location = 'http://www.ganjawars.ru/ferma.php?checksound'
        }, 1000);
    } else {
        root.document.title = '[КОПАЙ!] Ганжаферма';
        if(eSound > 0 && root.location.href.indexOf('checksound') != -1) {
            var dSound = root.document.createElement('div');
            dSound.innerHTML = '<embed height="1" width="1" flashvars="soundPath=/sounds/'+ eSound +'.mp3" allowscriptaccess="always" quality="high" bgcolor="#F5fff5" name="gr_server" id="gr_server" src="http://images.ganjawars.ru/i/play.swf" type="application/x-shockwave-flash"/>';
            root.document.body.appendChild(dSound);
        }
    }

    function getTime(eT) {
        var eDate = new Date(eT * 1000);
        var eResult = '';
        if(eTime > 3600) eResult += eDate.getUTCHours() < 10 ? '0' + eDate.getUTCHours() + ':' : eDate.getUTCHours() + ':';
        if(eTime > 60) eResult += eDate.getUTCMinutes() < 10 ? '0' + eDate.getUTCMinutes() + ':' : eDate.getUTCMinutes() + ':';
        eResult += eDate.getUTCSeconds() < 10 ? '0' + eDate.getUTCSeconds() : eDate.getUTCSeconds();
        return eResult;
    }
})();
