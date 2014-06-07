// ==UserScript==
// @name            TimeCop
// @namespace       tech.nimbus.fi
// @description     TimeCop will ban you from the Internet and force you to make some productive work!
// @include         *
// @version         1.0.4
// @license         GPLv3 (http://www.gnu.org/licenses/)
// @author          Tero Niemi (javascript:document.write('\x74al'+'amus\u0040gm'+'ail\056co'+'m'))
// ==/UserScript==
//
// ==ReleaseInfo==
//
// 1.0.0  (2009-11-18)  Initial release.
//
// 1.0.1  (2009-11-19)  Minor issues fixed:
//  * Ban counter was not drawn in some very rare cases.
//  * Tried to make the status screen clearer.
//  + allowResetButton configuration variable.
//
// 1.0.2  (2009-11-19)  Minor issues fixed and a gave in:
//  * window.top object is sometimes null, also, so is window!
//  + allowSetSurfTime configuration variable and function.
//  * Status screen timestamp format cleared.
//
// 1.0.3  (2009-11-21)  Minor issues fixed:
//  * Status display when ban time was negative.
//  * Changed window.location.href to document.documentURI because of Firefox error screens.
//  + drawScreen for all our display needs.
//
// 1.0.4  (2009-11-21)  Minor issue fixed:
//  * Fixed iframe compatibility (1.0.2 anomality: window.top is null when in iframe!)
//  + Possibility to use non-destructive alert boxes for warnings (useFullScreenWarnings: false)
//
// ==/ReleaseInfo==
//
// See end of file for full license information.

var TN = TN || {};
TN.TimeCop = {
    version: '1.0.4 Copyright \u00a9 2009 Tero Niemi (\x74al'+'amus\u0040gm'+'ail\056co'+'m)',

/// configuration /////////////////////////////////////////////////////////////

    funTime: 120,                 // minutes   Internet surf time, followed by...
    banTime: 360,                 // minutes   Ban time!
    warnTime: [30, 15, 5, 2],     // minutes   Warn about ban when n minutes left.

    ignoreSites: [                // Allow the following sites to function:
        '^about:',                //     Url begins with 'about:'
        '^https://'               //     Url begins with 'https://'
    ],

    useFullScreenWarnings: true,  // Fullscreen warnings? (false == simple alert box)

/// program ///////////////////////////////////////////////////////////////////

    // Do not touch the following two options! For debug purposes only!

    allowSetSurfTime: false,   // Allow Set Surf Time menu option?
    allowResetButton: false,   // Allow counter reset from the status screen?

    /** init()
     *
     *  TimeCop makes it's patrol round.
     *  Ban user if necessary!
     */
    init: function() {
        // register menu commands
        GM_registerMenuCommand('TimeCop Status', TN.TimeCop.statusBox, 'C', 'control shift alt', 'C');
        if (TN.TimeCop.allowSetSurfTime) GM_registerMenuCommand('TimeCop Set Surf Time', TN.TimeCop.setSurfTime);

        // exit if we are in iframe
        if (!window.top) return;

        // skip a few sites
        var re = new RegExp(TN.TimeCop.ignoreSites.join('|'));
        if (window.top.document.documentURI.match(re)) return;

        // Let's start!
        var msFunTime = TN.TimeCop.funTime * (60*1000);                            // millisecs   Surf time is fun time!
        var msBanTime = TN.TimeCop.banTime * (60*1000);                            // millisecs   Ban time is bad time!
        var msNow = new Date().getTime();                                          // millisecs   Current time
        var msLastSurfed = parseInt(GM_getValue('TN.TimeCop.lastSurfed')) || 0;    // millisecs   Last time the user surfed
        var msFirstSurfed = parseInt(GM_getValue('TN.TimeCop.firstSurfed')) || 0;  // millisecs   First time the user surfed

        // Remove ban if it is outdated
        if (msNow > msLastSurfed + msBanTime) {
            GM_setValue('TN.TimeCop.lastSurfed', msNow.toString());
            GM_setValue('TN.TimeCop.firstSurfed', msNow.toString());
            TN.TimeCop.drawResetedScreen();
            return;
        }
/*                                                                 msFirstSurfed + msWarnTime
                                                                              |
    msFirstSurfed                                          msLastSurfed       |       msNow              msFirstSurfed + msFunTime
           |                                                     |            |         |                           |
           |-----------------------------------------------------|------------|---------| - - - - - - - - - - - - - |
           |                                                     |                      |                           |
*/
        // Has the fun time run out? Ban time!
        if (msNow > msFirstSurfed + msFunTime) {
            TN.TimeCop.drawBanScreen();
            return;
        }

        // Perhaps it is time to give a warning.
        for (var i = TN.TimeCop.warnTime.length; i--;) {
            var minWarnTime = parseInt(TN.TimeCop.warnTime[i]);    // minutes     T-n minutes to ban!
            var msWarnTime = msFunTime - (minWarnTime * 60*1000);  // millisecs   Warning is n minutes before end of fun time.

            // Is warning time located between last surfed time and now?
            if (msFirstSurfed + msWarnTime > msLastSurfed && msFirstSurfed + msWarnTime < msNow) {
                if (TN.TimeCop.useFullScreenWarnings) {
                    TN.TimeCop.drawWarningScreen(minWarnTime);
                } else {
                    alert('TimeCop '+ TN.TimeCop.version +'\n\nWARNING!\nYou are about to get banned in less than '+ minWarnTime +' minutes!');
                }
            }
        }

        // Continue your precious fun time while you can...
        GM_setValue('TN.TimeCop.lastSurfed', msNow.toString());
    }, // init()

    /** setSurfTime()
     *
     *  Set surf time manually. For losers only.
     */
    setSurfTime: function() {
        var min = parseInt(prompt('TimeCop '+ TN.TimeCop.version +'\n\nEnter temporarily allowed time in minutes (1-'+ TN.TimeCop.funTime +'):')) || 0;
        if (min > 0 && min <= TN.TimeCop.funTime) {
            var msNow = new Date().getTime();                                      // millisecs   Current time
            var msFunTime = TN.TimeCop.funTime * (60*1000);                        // millisecs   Surf time!
            GM_setValue('TN.TimeCop.lastSurfed', (msNow).toString());
            GM_setValue('TN.TimeCop.firstSurfed', (msNow - msFunTime + min*(60*1000)).toString());
            TN.TimeCop.drawResetedScreen(min);
            return;
        } else {
            alert('TimeCop '+ TN.TimeCop.version +'\n\nNothing done.');
        }
    }, // setSurfTime()

    /** statusBox()
     *
     *  Display TimeCop status.
     *  Enable reseting for losers.
     */
    statusBox: function() {
        var msFunTime = TN.TimeCop.funTime * (60*1000);                            // millisecs   Surf time!
        var msBanTime = TN.TimeCop.banTime * (60*1000);                            // millisecs   Ban time!
        var msNow = new Date().getTime();                                          // millisecs   Current time
        var msLastSurfed = parseInt(GM_getValue('TN.TimeCop.lastSurfed')) || 0;    // millisecs   Last time the user surfed
        var msFirstSurfed = parseInt(GM_getValue('TN.TimeCop.firstSurfed')) || 0;  // millisecs   First time the user surfed
        var msFunTimeLeft = msFirstSurfed + msFunTime - msNow;                     // millisecs   Fun time left
        var msBanTimeLeft = msLastSurfed + msBanTime - msNow;                      // millisecs   Ban time left

        var message = 'TimeCop '+ TN.TimeCop.version +'\n';
        message += '\nSurfing started: '+ (msFirstSurfed > 0 ? TN.TimeCop.msToDateStr(msFirstSurfed) : '(never)');
        message += (msFunTimeLeft <= 0 ? '\nSurfing ended: ' : '\nLast page load: ');
        message += (msLastSurfed > 0 ? TN.TimeCop.msToDateStr(msLastSurfed) : '(never)');
        message += '\n\nSurfing time left: '+ TN.TimeCop.msToCounterStr(msFunTimeLeft);
        message += ' (of '+ TN.TimeCop.funTime +' minutes)';
        if (msFunTimeLeft > 0) {
            message += '\nSurfing time automatic reset in: '+ TN.TimeCop.msToCounterStr(msBanTimeLeft) + ' (of '+ TN.TimeCop.banTime +' minutes)';
        } else {
            message += '\nBan time left: '+ TN.TimeCop.msToCounterStr(msBanTimeLeft) + ' (of '+ TN.TimeCop.banTime +' minutes)';
        }

        if (TN.TimeCop.allowResetButton) {
            message += '\n\nPRESS OK TO RESET ALL COUNTERS. Cancel to exit.';
            if (confirm(message) && confirm('TimeCop '+ TN.TimeCop.version +'\n\nARE YOU SURE? All counters will be reseted.')) {
                msNow = new Date().getTime();  // In case time has passed...
                GM_setValue('TN.TimeCop.lastSurfed', msNow.toString());
                GM_setValue('TN.TimeCop.firstSurfed', msNow.toString());
                TN.TimeCop.drawResetedScreen();
                return;
            }
        } else {
            alert(message);
        }
    }, // statusBox()

    /** drawScreen(template)
     *
     *  Draw screen 'template'. Return true on success, false on failure.
     */
    drawScreen: function(template) {
        if (!(template in TN.TimeCop.bodyInnerHTML)) return false;
        var objHead = window.top.document.getElementsByTagName('head')[0];
        var objBody = window.top.document.getElementsByTagName('body')[0];
        if (!objHead || !objBody) return false;
        objHead.innerHTML = TN.TimeCop.headInnerHTML;
        objBody.innerHTML = TN.TimeCop.bodyInnerHTML[template];
        objBody.id = 'TN_TimeCop';
        return true;
    }, // drawScreen(template)

    /** drawResetedScreen(min)
     *
     *  Replace view with ban reseted screen.
     */
    drawResetedScreen: function(min) {
        if (!TN.TimeCop.drawScreen('reseted')) return;
        var obj = window.top.document.getElementById('TN_TimeCopFunTime');
        if (!obj) return;
        obj.innerHTML = min || TN.TimeCop.funTime;
    }, // drawResetedScreen()

    /** drawWarningScreen(min)
     *
     *  Replace view with warning screen.
     */
    drawWarningScreen: function(min) {
        if (!TN.TimeCop.drawScreen('warning')) return;
        var obj = window.top.document.getElementById('TN_TimeCopWarningTime');
        if (!obj || !min) return;
        obj.innerHTML = min;
    }, // drawWarningScreen(min)

    /** drawBanScreen()
     *
     *  Replace view with ban screen, start counter display.
     */
    drawBanScreen: function() {
        if (!TN.TimeCop.drawScreen('ban')) return;
        TN.TimeCop.drawCounter();
    }, // drawBanScreen()

    /** drawCounter()
     *
     *  Display counter, keep updating it if necessary.
     */
    drawCounter: function() {
        var msBanTime = TN.TimeCop.banTime * (60*1000);                          // millisecs   Ban time!
        var msNow = new Date().getTime();                                        // millisecs   Current time
        var msLastSurfed = parseInt(GM_getValue('TN.TimeCop.lastSurfed')) || 0;  // millisecs   Last time the user surfed
        var msBanTimeLeft = msLastSurfed + msBanTime - msNow;                    // millisecs   Ban time left

        var str = TN.TimeCop.msToCounterStr(msBanTimeLeft);
        window.top.document.title = str + ' - Banned by TimeCop!';
        var obj = window.top.document.getElementById('TN_TimeCopCounter');
        if (obj) obj.innerHTML = str;

        if (msBanTimeLeft > 0) window.top.setTimeout(TN.TimeCop.drawCounter, 1000);
    }, // drawCounter()

    /** msToDateStr(msTime)
     *
     *  Convert milliseconds to a date string.
     */
    msToDateStr: function(msTime) {
        return new Date(msTime).toString().split('GMT')[0];
    }, // msToDateStr(msTime)

    /** msToCounterStr(msTime)
     *
     *  Convert milliseconds to a counter string.
     */
    msToCounterStr: function(msTime) {
        msTime = msTime < 0 ? 0 : msTime;

        var remainder = msTime % (60*60*1000);
        var hours = (msTime - remainder) / (60*60*1000);
        var hoursPrefix = hours < 10 ? '0' : '';
        msTime = remainder;

        remainder = msTime % (60*1000);
        var minutes = (msTime - remainder) / (60*1000);
        var minutesPrefix = minutes < 10 ? '0' : '';
        msTime = remainder;

        remainder = msTime % (1000);
        var seconds = (msTime - remainder) / (1000);
        var secondsPrefix = seconds < 10 ? '0' : '';

        return hoursPrefix + hours +':'+ minutesPrefix + minutes +':'+ secondsPrefix + seconds;
    }, // msToCounterStr(msTime)

/// templates /////////////////////////////////////////////////////////////////

headInnerHTML: <><![CDATA[
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title> TimeCop </title>
    <style type="text/css">
      HTML, #TN_TimeCop {
          width: 100%;
          height: 100%;
      }
      HTML, #TN_TimeCop, #TN_TimeCop * {
          margin: 0;
          padding: 0;
          border: 0;
          background-image: none;
          background-color: #000;
          color: #fff;
          text-align: center;
          font-size: 12px;
          font-family: 'Trebuchet MS',Arial,sans-serif;
          line-height: 1.0;
      }
      #TN_TimeCop A, #TN_TimeCop A:hover, #TN_TimeCop A:visited {
          color: #fff;
      }
      #TN_TimeCop A:active {
          color: #f00;
      }
      #TN_TimeCop TABLE {
          width: 100%;
          height: 100%;
          border-collapse: collapse;
      }
      #TN_TimeCop TD {
          vertical-align: middle;
      }
      #TN_TimeCop H1, #TN_TimeCop H1 * {
          color: #d00;
          font-family: Impact,Haettenschweiler,'Arial Black',sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 180px;
      }
      #TN_TimeCop H2, #TN_TimeCop H2 * {
          font-style: normal;
          font-weight: normal;
          font-size: 32px;
          margin: 0.3em 0 0.6em 0;
      }
      H1#TN_TimeCopCounter {
          color: #fff;
          font-family: 'Letter Gothic','Consolas','Lucida Console','DejaVu Sans Mono','Andale Mono',monospace;
          font-size: 120px;
      }
    </style>
]]></>.toString(),

bodyInnerHTML: {

reseted: <><![CDATA[
    <table><tr><td>
      <h1>TimeCop</h1>
      <h2>Happy surfing, citizen! You have <span id="TN_TimeCopFunTime">few</span> minutes.</h2>
      <h2><a href="#" onclick="history.go(0); return false;">Continue</a></h2>
    </td></tr></table>
]]></>.toString(),

warning: <><![CDATA[
    <table><tr><td>
      <h1>Warning!</h1>
      <h2>You are about to get banned in less than <span id="TN_TimeCopWarningTime">few</span> minutes!</h2>
      <h2><a href="#" onclick="history.go(0); return false;">Continue</a></h2>
      <h2></h2>
    </td></tr></table>
]]></>.toString(),

ban: <><![CDATA[
    <table><tr><td>
      <h1>Banned!</h1>
      <h2>You have been banned from the Internet!</h2>
      <h1 id="TN_TimeCopCounter">&#x00a0;</h1>
    </td></tr></table>
]]></>.toString()

} // bodyInnerHTML

///////////////////////////////////////////////////////////////////////////////

}; // TN.TimeCop

// Start TimeCop!
TN.TimeCop.init();

// ==Legal==
//  TimeCop - Will ban you from the Internet and force you to make some productive work!
//  Copyright (C) 2009 Tero Niemi
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.
// ==/Legal==

// eof
