/*
 * #NewTwitter RTL Support
 * Sepehr Lajevardi - me@sepehr.ws
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

// ==UserScript==
// @name           New Twitter RTL
// @description    Add support for RTL languages in #NewTwitter. Alter the code configs to disable adding font styles.
// @namespace      http://userscripts.org/scripts/show/88073
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://*.twitter.com/*
// ==/UserScript==

var NewTwitterRTL = {
  rtlMonitorTimeout: 1500,
  rtlChangeFont: false,
  rtlChangeFontAttr: '12px Tahoma, Dejavu Sans',
  tweetsCount: 0,
  tweetTextSelector: 'tweet-text',
  tweetTriggerSelector: 'new-tweets-bar',
  
  /**
   * Make tweets which match rtlCharPattern RTL.
   */
  makeRtl: function() {
    var tweets = document.getElementsByClassName(NewTwitterRTL.tweetTextSelector),        
        rtlCharPattern = /.*[\u0600-\u06ff]+.*|.*[\u0590-\u05ff]+.*/;
        NewTwitterRTL.tweetsCount = tweets.length;
  
    for (i = 0; i < NewTwitterRTL.tweetsCount; i++) {
      if (rtlCharPattern.test(tweets[i].innerHTML)) {
        tweets[i].style.direction = 'rtl';
        tweets[i].style.textAlign = 'right';
        if(NewTwitterRTL.rtlChangeFont) {
          tweets[i].style.font = NewTwitterRTL.rtlChangeFontAttr;
        }
      }
    }
  },
  
  /**
   * Monitor new tweets.
   */
  monitorRtl: function() {
    if (document.getElementsByClassName(NewTwitterRTL.tweetTextSelector).length != NewTwitterRTL.tweetsCount) {
      NewTwitterRTL.makeRtl();
    }
    
    window.setTimeout(function() {
      NewTwitterRTL.monitorRtl();
    }, NewTwitterRTL.rtlMonitorTimeout);
  },
};

/**
 * Initialization.
 */
window.setTimeout(function() {
  NewTwitterRTL.monitorRtl();
}, NewTwitterRTL.rtlMonitorTimeout);
