// ==UserScript==
// @version       1.1.1
// @name          C&C: Tiberium Alliances Signer
// @namespace     C&C_TA_Signer
// @description   Press alt + 2 to sign. ((CiC) [player]yourName[/player] of [alliance]yourAlliance[allinace])
// @author        davidkn
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @license       MIT License
// ==/UserScript==

(function () {
    var cncSignMain = function () {
            function signGo() {
                'use strict';
                document.addEventListener('keypress', function (te) {
                    var a = ClientLib.Data.MainData.GetInstance(),
                        spielerName = a.get_Player().name,
                        spielerAllianz = a.get_Alliance().get_Name(),
                        istAnfuerer = a.get_Alliance().get_IsFirstLeader();
                    if (te.charCode == 50 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
                        var pre = '';
                        if (istAnfuerer) pre = 'CiC ';
                        var eingabeFeld = document.querySelector('input:focus, textarea:focus');
                        if (eingabeFeld !== null) eingabeFeld.value += pre + '[player]' + spielerName + '[/player] of [alliance]' + spielerAllianz + '[/alliance]';
                        te.preventDefault();
                    }
                }, true);
            }
            /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
            function cncCheckIfLoaded() {
                try {
                    if (typeof qx !== 'undefined') {
                        a = qx.core.Init.getApplication(); // application
                        a ? signGo() : window.setTimeout(cncCheckIfLoaded, 1000);
                    } else {
                        window.setTimeout(cncCheckIfLoaded, 1000);
                    }
                } catch (e) {
                    if (typeof console !== 'undefined') console.error(e);
                    else if (window.opera) opera.postError(e);
                    else GM_log(e);
                }
            }
            if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cncCheckIfLoaded, 1000);
        }
        // injecting because I can't seem to hook into the game interface via unsafeWindow
    var scriptBlock = document.createElement('script'),
        txt = cncSignMain.toString();
    scriptBlock.innerHTML = '(' + txt + ')();';
    if (/commandandconquer\.com/i.test(document.domain)) document.querySelector('head').appendChild(scriptBlock);
})();