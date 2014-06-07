// ==UserScript==
// @name           天涯助手v2(TianYa Helper)
// @namespace      http://www.quchao.com/entry/tianya-helper
// @author         Kelvin You (Kelvin.You) <Kelvin.You@Gmail.com>
// @author         Qu Chao (Chappell.Wat) <Chappell.Wat@Gmail.com>
// @description    为天涯社区增加高亮指定帖子/只显示指定帖子/用户状态显示等多项辅助功能
// @include        http://*.tianya.cn/*publicforum/content*
// @include        http://*.tianya.cn/*techforum/content*
// @include        http://*.tianya.cn/*tianyacity/content*
// @version        2.0.8
// ==/UserScript==
// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
// Appreciate to
//  ofk (http://userscripts.org/scripts/show/7623)
// script link: http://userscripts.org/scripts/show/36799
// ver 1.0 @ 2008-4-15
//  Initialize release
// ver 1.1 @ 2008-4-16
//  FF2 platform supported with bugfixes
// ver 1.2 @ 2008-4-17
//  Floating Bar added with some bugfixes
// ver 1.3 @ 2008-4-17
//  Fixed the bug of fetching the author's name in techforum
//  Stripped consecutive <br>s.
//
// ver 1.3a @ 2008-11-7 by Kelvin.You <Kelvin.You@Gmail.com>
//   * Fixed floatbar hidden/show property can not kept
//   * Fixed get author name will be failed for multiple pages article
//   + Impove the effect of highlight/filter for the first author in each page
//
// ver 1.3b @ 2008-11-9 by Kelvin.You <Kelvin.You@Gmail.com>
//   + Remember the selected option of tianya article in below case:
//         1. Switching between multiple pages of the same articles
//         2. close and reopen
//         3. Switching between multiple articles
//   + Resolve the compatibility with AutoPager
//   + Fixed the tianya city and tianya tech board can not be applied
//
// ver 2.0 @ 2008-11-29 by Kelvin.You <Kelvin.You@Gmail.com>
//   + A new helper bar with better usability and capability
//   + Highlight/Showonly now support applied to multiple user IDs
//   + BaiBaoXiang: Replace the function show somebody posts
//   + Fixed the writers's link which contains Chinese characters can not be
//     opened normal. (Maybe bug for FF)
//   + The posts can be hidden or show with animation
//   + Support show the user's status (avatar and online status)
//
// ver 2.0.3 @ 2008-12-02 by Kelvin.You <Kelvin.You@Gmail.com>
//   * Improve the compatibility with FF3.1 beta version
//   * Fixed tiny issue with the baibaoxiang appearance
//   + Add the floor number at the right side for each post.
//
// ver 2.0.4 @ 2008-12-04 by Kelvin.You <Kelvin.You@Gmail.com>
//   * Fixed mistake style applied to the reply textbox of tianya
//   + Add the black list support
//   + Press CTRL and drag the helpbar can put it to a new location
//
// ver 2.0.5 @ 2008-12-10 by Kelvin.You <Kelvin.You@Gmail.com>
//   + Add the float link bar to let user go to previous and next post with the
//     same author.
//
// ver 2.0.6 @ 2008-12-11 by Kelvin.You <Kelvin.You@Gmail.com>
//   * Fixed: the float link should not move the horizontal scroll.
//   * Scroll the target posts to the same position with last one
//   * Tiny modification to the helpbar
//
// ver 2.0.7 @ 2008-12-15 by Kelvin.You <Kelvin.You@Gmail.com>
//   + Detect and hide the disturb posts(刷屏帖)
//   * Optimize the process speed
//
// ver 2.0.8 @ 2008-12-18 by Kelvin.You <Kelvin.You@Gmail.com>
//   * Fixed the bug tianyacity/tianyacampus don't work anymore which is introduced
//     with last version
//


/*-----------------------------------------------------------------------------
 * Configuration
 *-------------------------------------------------------------------------- */
// Constant for indicating the status of article
var TIANYA_NONE     = 0;
var TIANYA_SHOWONLY = 1;
var TIANYA_HIGHLIGHT = 2;

// Maximum status of tianya article are saved in configuration
var MAX_ARTICLE_NUM = 30;

var TianyaConfig = function () {
    this.defaultopt = {floatbar   :1,             //Enable Floatbar
                       slideshow  :1,             //Enable post slide animation
                       bbxreplace :1,             //Replace the BaiBaoXiang
                       floornum   :0,             //Show the floor number
                       defstate   :TIANYA_NONE,   //Default status
                       hotkey     :1,             //Enable hotkey: Ctrl+Y and Alt+Y
                       autoclose  :5,             //Auto close the helpbar in 5 secs
                       repairlink :1,             //Fixed the link which contains Chinese character
                       userstatus :1,             //Show the poster's status
                       //Style used to highlight the post
                       hlstyle    : 'margin:2px 0; font-weight:bold; border:1px outset #CCCC00; background:#F0F07F',
                       anchorpos  : {top:'auto', right:1, bottom:22, left:'auto'},
                       linkpost   :1,             //show the link that associate the posts belong to the same writer
                       disturb    :10             //Detect the disturb post
                       };
	this.author = '';
	this.writers = '';
	this.title = '';
	this.key = '';
	this.option = {};
	this.target = [];
	this.blackids = [];
	this.state = TIANYA_NONE;
	this.commit = 0;
	
	this.init();
}

/* config format: key:writer0,writer1..:status ... */
TianyaConfig.prototype = {
    update: function () {
        var re, aInfo, newInfo = '';
        var escTarget = this.target.map( function(el) {
            return escape(el);
        })

        updateItem = this.key + ':' + escTarget.join(',') + '=' + this.state;
        aInfo = GM_getValue('TianYaArticles');
        
        if (typeof aInfo != "undefined") {
            oldIndex = aInfo.indexOf(updateItem)
            if ( oldIndex == 0 ) {
                return;
            }

            re = new RegExp(this.key+':[^\\s]+\\s', '');
            newInfo = aInfo.replace(re, '');
            
            if ( this.state == TIANYA_NONE && newInfo == aInfo ) {
                return;
            }
        }

        if ( this.state != TIANYA_NONE ) {
            newInfo = updateItem + ' ' + newInfo;
        }

        if ( newInfo != '' ) {
            re = new RegExp('^([^\\s]+\\s){1,' + MAX_ARTICLE_NUM + '}', '');
            newInfo = newInfo.match(re)[0];
        }
        
        GM_setValue('TianYaArticles', newInfo);
        this.commit++;
    },
    __statArticle: function () {
        var aInfo, escTarget;

        //got this article's key: author + title
        this.__getArticleKey();

        aInfo = GM_getValue('TianYaArticles');
        if (typeof aInfo != "undefined" &&  aInfo != '') {
            try {
                var re = new RegExp(this.key + ':(?:([^=]+))?=(\\d)\\s', '');
                var matchAry = aInfo.match(re);
                if ( matchAry != null ) {
                    if ( matchAry[1] != "undefined") {
                        escTarget = matchAry[1].split(',');
                        this.target = escTarget.map(function (el) {
                            return unescape(el);
                        });
                    }
                    this.state = matchAry[2];
                }
            } catch (e) {
                GM_log('found invalid configuration, try to do reset');
                GM_setValue('TianYaArticles', '');
            }
        }
    },
    __getArticleKey: function () {
        if (typeof unsafeWindow.chrAuthorName == "undefined") {
            try {
                this.author = $X('//input[@type="hidden" and @name="chrAuthor"]')[0].value
            } catch (e) {
                // HRER should never be reached.
                GM_log("'chrAuthor' doesn't exists!");
            }
        } else {
            this.author = unsafeWindow.chrAuthorName;
        }
        
        if (typeof unsafeWindow.chrTitle == "undefined") {
            try {
                this.title = $X('//input[@type="hidden" and @name="strTitle"]')[0].value
            } catch (e) {
                this.title = document.title;
            }
        } else {
            this.title = unsafeWindow.chrTitle;
        }
        
        //use [title+author] as the key of a article
        this.key = getStringDigest(this.title+this.author);
    },
    saveOptions: function() {
        GM_setValue('TianYaOption', uneval(this.option));
    },
    __getOptions: function() {
        var s_opt = GM_getValue('TianYaOption', null);
        if (s_opt) {
            this.option = eval(s_opt);
        }
        //assign the default value
        for (var opt in this.defaultopt) {
            if (typeof this.option[opt] == 'undefined') {
                this.option[opt] = this.defaultopt[opt];
            }
        }
    },
    saveBlackIDs: function () {
        var escBlackIds = this.blackids.map( function(el) {
            return escape(el);
        })
        GM_setValue('TianYaBlackIDs', escBlackIds.join(','));
    },
    __getBlackIDs: function () {
        var escBlackIds = GM_getValue('TianYaBlackIDs');
        if (typeof escBlackIds != "undefined" && escBlackIds != '') {
            this.blackids = escBlackIds.split(',').map(function (el) {
                return unescape(el);
            });
        }
    },
    init: function () {
        this.__statArticle();
        this.__getBlackIDs();
        this.__getOptions();
    }
}


/*-----------------------------------------------------------------------------
 * TianyaHelper
 *-------------------------------------------------------------------------- */
var gif_up = '\
R0lGODlhDQAOAIQfAFa8TLzkuOP74vf+9/v+++f75uH64M/szPj++P3//f7//un86Pb+9uz4697y\
3G3FZXnKcfX99X7Md2bCXVm9T9Xu02zFY93y2/P989Dszdvx2eX75Pr++vH98O787v///yH+FUNy\
ZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBAAAfACwAAAAADQAOAAAFNOAnjmRpnmSAitkDSNpZTUAA\
QFd5UPVnWwcSoCeyAVCqVesVM81qtxxp1/sFR8Okb7jqrkIAOw=='

var gif_avatar = '\
R0lGODlhKAA0AOf/AGZFHwBubwB4eHJULm9VNQN0uQCDgnJcPnlbOQWNjgCL0R2QgwCdoDuEhoNq\
V4FvYJJsRhmehgClqJ5xGqV1ADKUlKF1DYV6P4WAIACe6gCps0GJsJB0TACtrKR6AMRfRZB5WaB8\
HgCyuZ59LiqZ5SOqoZqAWAC8vLKBFFGdjAC8w6+EFSCn5WeQqbSHC2aWlpaJdKaIVQDHyK+LNKeM\
SKeIZIWRkmqYt7eQHL+MIqWMbBjDyoeToF+mqbGSOqiKg5mRi56RgADR2LiTMFO0lADT0q2RX7+O\
Q020r6iRdnWlmTuy95+bYjDGtL+bFwDY3qySl8CdKpOeoUXCuMCXVsmaL7eZZ2mt1iTTzJSgrWey\
zsOfPcqcQbmcc6ydmMubVX6szCvWzwDo6l/BuYiwsYutubighZSpt8eiU3K/obuhgdCmOk3Trpyr\
sJ6pt6Gpsbyhk7+nc8qkZ327v82sQcqsUs2sTNmlVteoTM+pX5qzu9KrU8iqfm7D8bqtm6+xrqK1\
wZXDnq2xwKuzu6C3yc6ufKe3vrC2rJ7Cnj7l69WwbMi4bbuzrNazZ8G0m9K0bY7A56m4zNy3SLW3\
s9e6T9+1V9i4XZHKybi7t62+xuW2ZqrCx7W+x9m9a9G8jOG6bJjK5L7BvbzBw0jz+O++YdvEgaXQ\
1MLFwbPLz+jAe9nApNrDluPGcujFavLBa6nard7Ifr/J0cbIxd/HjNXIosLKzKTY1PLDde7Gc8jK\
x+3GeujIgc3Lz5ri5PPKiM7QzcfS29bPxffOe93RsvvMgM3U1ufQpsHZ3tLU0eLVpa7l3dLT3fnS\
he3Rr8/Y4vPVk9bY1ejbmLnm4PzUjvHalfnVm/zVlc3e59nb2Mfh6dXc3/nZkN/d0e3au87j4ube\
vdze2/fbo+Xfx97g3eHg5+Hj4Ofi4Nbp7Pvjt+Ln6vnkv83y7u7l2+zm5efp5uPzxers6fPq4+nv\
8e3v6/Tu3+/x7en08fHz8Pbz6vfy8vP18vb49fT4+/n7+P778v///yH+FUNyZWF0ZWQgd2l0aCBU\
aGUgR0lNUAAh+QQBCgD/ACwAAAAAKAA0AAAI/gD/CRxIsKDBgwgTKlz4z505c/kYCvTXLU+jR4uS\
8WPYjpEfP46CBGNIbxalk7ha2elET2GwIGbUdKlh4gEvhfhmdZJEBxYsatRYlYp38N4fGElqcDhA\
QAeIIPUSssvTiZWlLZ0aRYtWR9zBfEAGDCCAAAAIHQgcsEs4bAglq1vsDNkzy86wdwfZyZnliU8X\
HRwAEOCWkNaEFTiGeAhRxwUrLsMQwqNSDZ26ZiAIADjQLuEqCzlWrEAxxM6KOlsiH6wnp7I6dBwg\
mIAxr/CEVOGsTdNEx0KUId8QBpPjq1q4anny0HCkUNyERtOYCXMVxUOVGV4RFkpl7dmuT5pq/qxN\
mM8IGmbEfOFyYgEHDXyeP+3SBR6PKoa0tkwTRgwXDgoeGLFPQvTcoYkumnyhiTEbNXfELa6QcocL\
FFhghEL58IHGF0d88cwh1yyEjxUjMLHHHlt4YEEM8BnkTDrOFENGHIqoQoYWhISY0D3SRJACLK7c\
UgkGFxBmUDrnlJNNBhmwwMIS16CSCTkI8dMLFjsE4gsxxMyyQARK2FMQP9o4cw0oCmRAQh/X1OOM\
M8Boc9A6RTyBRTLTdIfICWKcMMc//gzEDyeZZAKGAgpAko49/JCTTjnXpGOQMifIwIY11VgTzRRP\
jDLKCbYQJM8ZggxyQwFXAMNJLG/KMw4w/sAYZIsGIqTxjHGv1JmIGDKMEZxA6bwBCCAtbBAJIJEk\
G+cytYhi0CUJMFACEYEE0sQOJxQhhBBINPgPP22cQYgbZQjSRhl6ELJJMbFwMohB3jQQrQYlSKBB\
BxrIsMMOSJxDULBtCCIIIIZ4AQcggxjCiSFteDtQvAJEy4AGFTAgQgcdVOBNQem0kQUgbgzywQeC\
uCEIw1I4PNAxLwQQgAACBGCABgwY0IPKDYkihQ1S/OCFFDxk8UYWsWCoTS2bxOKNKabIqVA95PDC\
yy/FFKONmBJlrfXWXHfNtT733NNP1v3oM045aNcz9kL6kGOO27+4w1A/7bhNTjt1t7O2/mS8IFPM\
L83yAo9C/MhTjjbIyJPOPPK0487eBPVDTi5Sn4IJI7yIwgvkBeUzDt4PlWNOPfKQE5FB/PzCyCSM\
iPIHL8UwEsrpXyEzTjqIRw3OPNrcMyDqy7gtdeaDTBIVQvKEMjwvsoDDSzsQIbRP3PLkM88pjPwh\
Cu0GtXMKMrmcIjU4tWhTzPEG5YNMO9Xnk7nUvx8kz/P5WO/QKcEswz1B80CTTjvpSEflwKGQe8ii\
HPzIB94yR7X9EQQa5WgH2syxDF7cQyH90Ibp5MFBZIgPGjgbyNvA8RBkIKMcDIFHMay3QEyEwhzx\
M8g9ikEOaECDF+YoB+fShwx4tAMe/uSQRShEQSXyQOMXUjuh6RaSj6hpAxxRCwUmkOHAf8xjH/WD\
BjKgYQ6/gQN9B+GHAX/hOAUqL4T8KBw8eCG+vimQHBc8SD/qUQxezCMfPsxHKGQBw4L0o375MIco\
TsHHfPCjHvlwBxgHoj4cyuOO/BAgL2pBpb3xA23pIIfsTMePPyYwH/pIH/MgwkH1IcMc8PgF95qI\
Def1TR7uYJ88CpdIgySPF9po3zwqCA4kaiOUAuEHF80RPrv9rx13/F/3XIjLWEKDcsiQWh8Fkg9t\
aLCGTwQHNsrhKHekYxyo4wUmXCiKQQqRF7mQRTEcFshWPqSLbxOdOaC4Q/dNgpyZRMMEG5UXw38E\
shjm0GAt+IgNbZjjhjv05zJY94bsiWKIoojemMxRx2j6DYcAHVxCPok3BbajigQBJDIbJw9geu2k\
AwkIADs=\
'

var gif_go = '\
R0lGODlhJAAkAMZDAAQCBA8HD0ZGRmNjY2pqand3d4ODg4SEhImJiY2NjZWVlZSWlJubm5ycnKGh\
oaKioqenp6urq6ysrLOzs7i4uLq5urq6ur29vcDAwL/Bv8LCwsTExMfHx8jIyMvLy8zMzM7Ozs/P\
z9LS0tPT09XV1dfX19nZ2dvb3Nzc3N7e3t/f3+Li4uLi4+Pj4+Tk5OXl5ebm5ujo6Ojo6erq6uvr\
7O3t7e7u7u/v7+/v8PDw8PHx8fPz8/Tz8/T09PX08vX19fb29vn5+fr5+P//////////////////\
////////////////////////////////////////////////////////////////////////////\
////////////////////////////////////////////////////////////////////////////\
/////////////////////////////////////////////////////////////////////////yH5\
BAEKAH8ALAAAAAAkACQAAAf+gH+Cg4SFhoeIhT4nGhMSFR4riX9CNCgjISUrN4krExUiLzwzJx4e\
M4c3IyUwOkE9NCsrPYYnEqczMzU1PIseNYU0IbM9PT8/QZUrP4Q1EBovKy8vury+hD8fKDo3OjrG\
yMqEGhIrKSnSAro8vZGDKCE3u90HxkHJm4I1DxonJykuCAAQ0MMGuxQgBP3ogIIGjRo5HAQ4EATI\
vRotBK1IQMLfCQEAQgrYxaPGBUE3LMRwSONAgJcHjgX5YULQCQMpOvpLUWDaOh4TBNGYUGOlwxoR\
vNkLMkKQCAQiSHRkIXCAi2ozKgiCQQFGjJU4JDbIAa5HCUEkGFwgERWkSGr+PEoJirHBRAyvLmF+\
CxJLUIoJD05E7SgDHbUaGlLoG9GBhteVO2p0M4YC2J8ZHBZUEKzT8AwQJwX1UJGhhGOjkr+1qDno\
RAXNHv9J8zDhBSEaJUqzfNhtxQgdhOK+frB2RakJEyQR4pu7g90bsUaM4FQoLu0HChAsuMXjEF/f\
HTBQyDAsSKIaxkmkEDXpzw/oMWq4ak+/vv37+AUtavTIXaJKl2SSDyKegCIKKaagYogqrLgCiyy0\
FGILLtX0UoplgwhDDDjJxMLMIM5AI81h1sg1SDbbdPONTOIMQo45hh3Gjg/+/QGPPKmteI8QA+7T\
zz9uDcQLDwgpxNBReU27hEwQGGnEkUcpgKQOSSahpBJLNbhUj0w02YSTTv/0JCNQQhFl1ENJ6ciU\
U1BJ9VFIA2Gl1R9cPdbSSxOVddYfaa01mJQ+WTdXXXd9paVS3/kFGGcdCeAZYor9UQNjp610QGqU\
WYYZbFHtJM1nof0xmm5eHTXZaoS4BhuUs9V2W26mYdnbb8GpShwJxtGWXCHMZeBcDND5Np0h1gGW\
3XYedGfId4yJR94K5iGC3gnqsTfJezTEN19+3BoSCAA7\
'

var gif_disturb ='\
R0lGODlhDwAPAIQQAMFHQdZPSYmJiaysrMLCwtLS0tXV1dvb3N7e3uLi4uXl5erq6u3t7fTz8/X0\
8vz+/P///////////////////////////////////////////////////////////////yH5BAEK\
ABAALAAAAAAPAA8AAAVuICRCQmkKxziWxeO6gkoWQuE0DfPEa1vjDcduZRoUcovAMDArOJGBqCAA\
AAgeOAZjoVBEqYDdQ8vtJhBf2LicWDCo6Ssb8a4SwFdF4nxQMMIDEAAkD3sIB4htQyJXh4gGBk6L\
hC+VMCMHJ5ooIyEAOw==\
'

var TianyaHelper = function () {
	this.floatBar = null;
	this.bbxReplacer = null;
	
	this.running = false;
	this.rebuilt = false;

    this.writerCache = '';
    this.floor = 0;
}

TianyaHelper.prototype = {
	apply: function( sts ) {
	    var target, state;
	    var cssText = '';
	    
        if (typeof sts != "undefined") {
            target = [Tyconfig.author];
            state = sts;
        } else {
            target = Tyconfig.target;
            state = Tyconfig.state;
        }
        
        if (target.length && state == TIANYA_SHOWONLY) {
    		css_sel = '.writer' + getStringDigest(target[0]);
    		for (var i = 1; i<target.length; i++) {
                css_sel += ',.writer' + getStringDigest(target[i]);
            }
    		cssText = '.allwriters { display:none; } ' + css_sel + ' { display:block; } ';

		} else if (target.length && state == TIANYA_HIGHLIGHT) {
    		css_sel = '.writer' + getStringDigest(target[0]);
    		for (var i = 1; i<target.length; i++) {
                css_sel += ',.writer' + getStringDigest(target[i]);
            }
    		cssText = '.allwriters { display:block; } ' + css_sel + ' {' + Tyconfig.option.hlstyle + '} ';
        } else {
    		cssText = '.allwriters { display:block; } ';
        }
        
        //process the black list
        if ( Tyconfig.blackids.length > 0 ) {
            target = Tyconfig.blackids;
    		css_sel = '.writer' + getStringDigest(target[0]);
    		for (var i = 1; i<target.length; i++) {
                css_sel += ',.writer' + getStringDigest(target[i]);
            }
            cssText += css_sel + ' { display:none; }';
        }
        
        setGlobalStyle(cssText, 'tianyahelper');
		this.bbxReplacer.update();
		this.floatBar.update();
	},
	process: function() {
	    countSubStr = function (mainStr, subStr) {
            var count = 0;
            var offset = 0;
            var len = subStr.length;
            do {
                offset = mainStr.indexOf(subStr, offset);
                if(offset != -1) {
                    count++;
                    offset += len;
                }
            } while (offset != -1);
            return count;
        }
        checkChars = function (str, threshold) {
            var ch, temp = '', chars = 0, count=0;
            var len = str.length;
            var disturb = true;
            for (var i=0; i<len; i++) {
                 ch = str[i];
                 if (ch == '\x0d' || ch == '\x0a' || ch == '\u3000' || ch == '\x20' || ch == '\x09' ) continue;
                 if (disturb && temp.indexOf(ch) == -1) {
                       temp += ch;
                       if (++chars > threshold) disturb = false;
                 }
                 count++
            }
            return {pass:!disturb, total:count, chars:chars}
        }
        hideDisturb = function (str) {
            return '<span class="disturb_post">&nbsp;&nbsp;&nbsp;&nbsp;此处疑似刷屏，点击<a href="javascript:void(0)" onclick="TYH_showDisturbText(this);">这里</a>查看原文</span><div style="display:none"><br>' + str + '</div>';
        }
        var self = this;
        var option = Tyconfig.option;
        //var start_time = (new Date).getTime();
        try {
            var fauthorNode = $X('id("firstAuthor")[last()]')[0];
            var newFirstAuthor = '<table bgcolor="#f5f9fa" border="0" cellspacing="0" width="100%">' + fauthorNode.innerHTML + '</table>'
            fauthorNode.parentNode.removeChild(fauthorNode)
            
            var newHTML = newFirstAuthor + $X('id("pContentDiv")[last()]')[0].innerHTML.replace(/<div class="content"[^>]*>/g, '');
            newHTML = newHTML.replace(/(<table[^>]*>)/g, '</div><div class="content">\$1');

            $X('id("pContentDiv")[last()]')[0].innerHTML = newHTML;
 			$X('id("pContentDiv")[last()]/div[@class="content" and descendant::a[contains(@href, "vwriter")]]').forEach(function (node) {
                var writerNode = node.firstChild.getElementsByTagName('a')[0];
                var writer = writerNode.textContent;
                var writerId = getStringDigest(writer);

                node.className = 'allwriters writer' + writerId + ' ' + node.className;
                // set the folder section
                if (option.linkpost) {
                    newHTML = node.innerHTML.replace(/\<\/table\>/, "</table><div class='folder' onmouseover='showGoLink(this,\""+writerId+"\");'>") + "</div>";
                } else {
                    newHTML = node.innerHTML.replace(/\<\/table\>/, "</table><div class='folder'>") + "</div>";
                }
                node.innerHTML = newHTML;

                // fixed the writer link encoding issue for firfox
                writerNode = node.firstChild.getElementsByTagName('a')[0];
                var gbWriter = HZ2GB(writer);
                if ( option.repairlink ) {
                    writerNode.href = writerNode.href.replace(/(vwriter=)[^&]+/, "\$1"+gbWriter);
                }
    			
    			// add slide show stuff
                var colNodes = node.firstChild.getElementsByTagName('td');
                if ( option.slideshow ) {
                     colNodes[0].align = "left";
                     colNodes[0].innerHTML = '<a class="updown" href="javascript:void(0)" title="缩进回复" onclick="TYH_folderClickHandle(event);"/>';
                }
                
                colNodes[2].align = "right";
                
                // add the floor number
                if ( option.floornum ) {
                    var span = document.createElement('span');
                    span.className = "floornum";

                    if (++self.floor == 1) {
                        span.textContent = '顶楼';
                    } else {
                        span.textContent = self.floor + '楼';
                    }
                    colNodes[2].appendChild(span);
                }
                
                // add user status show stuff
                if ( option.userstatus ) {
                    var avatar = document.createElement('a');
                    avatar.className = 'blank';
                    avatar.href = 'javascript:void(0)';
                    avatar.setAttribute('onmousemove', 'TYH_showStatusTip(this);');
                    colNodes[2].appendChild(avatar);
                    
                    self.__addStatusRequest(gbWriter, writerId);
    			}
    			
    			// detect the disturb posts
    			if ( option.disturb ) {
    			    var html = node.lastChild.innerHTML;
                    var t = checkChars(node.lastChild.textContent, 30);
                    if (!t.pass && (t.total/t.chars) >= option.disturb) {
                        node.lastChild.innerHTML  = hideDisturb(html);
                    } else {
        			    var linenum = countSubStr(html, '<br>');
                        if (linenum >= option.disturb && (t.total/linenum) <= 3) {
                            node.lastChild.innerHTML  = hideDisturb(html);
                        }
                    }
                }
 			});
        } catch (e) {
            try {
                // This article doesn't have the firstAuthor node, that means this is tianya city ...
    			$X('(id("pContentDiv")|id("AllDelResponse"))/table[descendant::a[contains(@href,"vwriter")]]').forEach(function (node) {

                    var divNode = document.createElement('div');
                    var writer = node.getElementsByTagName('a')[0].textContent;
                    var writerId = getStringDigest(writer);
                    var writerLink;

                    divNode.className = 'allwriters writer' + writerId + ' content';
                    node.setAttribute('bgcolor', '#f5f9fa');
    				divNode.appendChild(node.cloneNode(true));
    				var copyNode = node.nextSibling;

    				while ( copyNode && copyNode.nodeName != "BR" ) {
                        if (copyNode.nodeName == "DIV") {
                            copyNode.className = 'folder';
                            if (option.linkpost) {
                                copyNode.setAttribute('onmouseover', 'showGoLink(this,\''+writerId+'\');')
                            }
                        }
                        divNode.appendChild(copyNode.cloneNode(true));
                        nextNode = copyNode.nextSibling;
                        node.parentNode.removeChild(copyNode);
                        copyNode = nextNode;
                    }
                    
                    // deal with the distance between the posts
                    if (copyNode && copyNode.nodeName == "BR") {
                        cell = divNode.firstChild.getElementsByTagName('td')[1];
                        cell.insertBefore(document.createElement("BR"), cell.firstChild);
                        node.parentNode.removeChild(copyNode);
                    }
                    node.parentNode.replaceChild(divNode, node);

                    //fixed the writer link encoding issue for firfox
                    var writerNode = divNode.firstChild.getElementsByTagName('a')[0];
                    var gbWriter = HZ2GB(writer);
                    if ( option.repairlink ) {
                        writerNode.href = writerNode.href.replace(/(vwriter=)[^&]+/, "\$1"+gbWriter);
                    }

        			// add slide show stuff
                    var colNodes = divNode.firstChild.getElementsByTagName('td');
                    if ( option.slideshow ) {
                         colNodes[0].align = "left";
                         colNodes[0].innerHTML = '<a class="updown" href="javascript:void(0)" title="缩进回复" onclick="TYH_folderClickHandle(event);"/>';
                    }

                    colNodes[2].align = "right";

                    // add the floor number
                    if ( option.floornum ) {
                        var span = document.createElement('span');
                        span.className = "floornum";

                        if (++self.floor == 1) {
                            span.textContent = '顶楼';
                        } else {
                            span.textContent = self.floor + '楼';
                        }
                        colNodes[2].appendChild(span);
                    }

                    // add user status show stuff
                    if ( option.userstatus ) {
                        //colNodes[2].innerHTML = '<a class="blank" href="javascript:void(0)" onmousemove="TYH_showStatusTip(this);" />';
                        var avatar = document.createElement('a');
                        avatar.className = 'blank';
                        avatar.href = 'javascript:void(0)';
                        avatar.setAttribute('onmousemove', 'TYH_showStatusTip(this);');
                        colNodes[2].appendChild(avatar);
                        
                        self.__addStatusRequest(gbWriter, writerId);
        			}

                    // detect the disturb posts
        			if ( option.disturb ) {
                        var contentNode = divNode.getElementsByClassName('folder')[0];
        			    var html = contentNode.innerHTML;

                        var t = checkChars(contentNode.textContent, 30);
                        if (!t.pass && (t.total/t.chars) >= option.disturb) {
                            contentNode.innerHTML  = hideDisturb(html);
                        } else {
            			    var linenum = countSubStr(html, '<br>');
                            if (linenum >= option.disturb && (t.total/linenum) <= 3) {
                                contentNode.innerHTML  = hideDisturb(html);
                            }
                        }
                    }
                });
            } catch (e) {
                GM_log(e);
            }
        }
        //GM_log("time:" + ((new Date).getTime()-start_time));
		this.rebuilt = true;
	},
	__addStatusRequest: function(gbname, idname) {
        
        if (this.writerCache.indexOf(idname + " ") == -1) {
            this.writerCache += idname + " ";
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://my.tianya.cn/mytianya/ListWriterNew.asp?vwriter=' + gbname + '&idwriter=0&key=0',
				overrideMimeType: 'text/html; charset=' + document.characterSet,
				onload: function (req) {
				    try {
    					if (req.status == 200) {
                            status = 0x0;
    					    if (req.responseText.indexOf("class=\"info\">女 ") > -1)
                                status |= 0x01;

    					    if (req.responseText.indexOf("不在线") > -1)
                                status |= (0x01<<1);
    					}
    					$X('//div[contains(@class,"'+idname+'")]//td[last()]/a').forEach(function (stNode) {
                            stNode.className = "avatar "+ (['male_online', 'female_online', 'male_offline', 'female_offline'])[status]
                        });
                    } catch (e) {}
				},
				onerror: function (req) {
					//GM_log(req.statusText);
				}
			});
		}
    },
	init: function() {
		if (this.running) {
			alert('正在处理中……');
		} else {
        	if (Tyconfig.option.hotkey == 1) {
        		document.addEventListener('keydown', hotkeyHandle, false);
        	}
            // Add menu command to GreaseMonkey
            if (Tyconfig.option.floatbar)
                GM_registerMenuCommand('天涯助手 - 隐藏浮动栏', floatbarHandle);
            else
                GM_registerMenuCommand('天涯助手 - 显示浮动栏', floatbarHandle);
        	
        	// Add the style for the slideshow
            setGlobalStyle('a.updown:link, a.updown:visited { display:block; width:16px; height:16px; outline:none; background:url(data:image/gif;base64,' + gif_up +') no-repeat center center;}' +
                           'a.updown:hover, a.updown:active { border: 1px solid #79CA71; }' +
                           'a.blank:link {display:block; width:20px; height:26px; outline:none; cursor:default;}' +
                           'a.avatar:link {display:block; width:20px; height:26px; outline:none; background-image:url(data:image/gif;base64,'+gif_avatar+'); background-repeat:no-repeat;}' +
                           '.male_online {background-position:-20px 0;}'+
                           '.female_online {background-position:0 0;}'+
                           '.male_offline {background-position:-20px -26px;}'+
                           '.female_offline {background-position:0 -26px;}'+
                           '.floornum {font-family:"Lucida Grande","Microsoft Yahei",Arial; font-size:12px; color:silver; font-weight:bold;}' +
                           '#__tyh_postlink {position:absolute; width:18px; height:36px; display:none; z-index:99999;}' +
                           'a.postlink {cursor:pointer; display:block; border:none; height:18px; width:18px; outline:none; background-image:url(data:image/gif;base64,'+ gif_go + '); background-repeat:no-repeat; }' +
                           'a.goprev:link {background-position:0 0;}' +
                           'a.gonext:link {background-position:0 -18px;}' +
                           'a.goprev:hover {background-position:-18px 0;}' +
                           'a.gonext:hover {background-position:-18px -18px;}' +
                           '.disturb_post {color:#444;background:url(data:image/gif;base64,'+gif_disturb+') no-repeat left center;font-size:14px;font-weight:bold;height:15px;}'
                           );
                           
            script = (function TYH_showStatusTip(el) {
                if (el.className != "blank") el.title = el.className.indexOf('on')>0? '在线' : '不在线';
            }) + (function TYH_showDisturbText(el) {
                var txtNode = el.parentNode.nextSibling;
                if (txtNode.style.display=='none')
                    txtNode.style.display='block'
                else
                    txtNode.style.display='none'
            }) + getPos.toString() + getScroll.toString() + scroller.toString() + go2post.toString() +
            showGoLink.toString() + $X.toString();
            setGlobalScript(script);
        	
			this.running = true;
			this.process();
			
			//create floatbar and the baibaoxiang replacer
        	this.floatBar = new FloatBar();
        	this.bbxReplacer = new BBX_Replacer();
			
            var postLinkContent = '\
<a class="postlink goprev" href="javascript:void(0)" title="查看此作者的上一篇帖子" onclick="go2post(this, 0)" />\
<a class="postlink gonext" href="javascript:void(0)" title="查看此作者的下一篇帖子" onclick="go2post(this, 1)" />\
'
			this.bar = document.createElement('div');
        	this.bar.id = "__tyh_postlink";
        	this.bar.innerHTML = postLinkContent;
            document.body.appendChild(this.bar);
			
			if (Tyconfig.state != TIANYA_NONE) {
                this.apply();
                Tyconfig.update();
            } else if (Tyconfig.option.defstate != TIANYA_NONE) {
                // for default status, don't update the config
                this.apply(Tyconfig.option.defstate);
            } else if (Tyconfig.blackids.length > 0) {
                // for black list
                this.apply();
            }
		}
	}
}


/*-----------------------------------------------------------------------------
 * FloatBar
 *-------------------------------------------------------------------------- */
var FloatBar = function () {

var menu_gif = '\
R0lGODlhEgASAOedAOl8Eup+EuiDFOqECemFCemGC+mFFeuJBOqJEtqKQ+mMC+yQEtaRUeqQIeuP\
KeuQI+ySGOqRKuqTMemWH+6XCuuXFe2YC+qWLOqXN+ybEO6cFvCdCO+dDO6eDe+eDu6fDe+fDe+f\
Du6gD/GkAO6hL/GmBPGkGe2kJ++iU/OqAOymSvCpJu+mTe2pTO+qPvCrNfCpSfKvDPKwDvGuLvCu\
QPOzCfGwMfCwOO+wO/CuTPS0C/GxNPO0HfOxPfS3BfS2EfS2Eva3CO2waPGxU/G1L+6xZ/GzS/K3\
I/KyXfW4GvGxbPG1RvO0S9G3n/O4Ne+3VfO6LPS7JPS7NPK7PfO6SfO6Su+4d++5dPO+UPK9YvS+\
VvPASPTEJPTAW/XFKM3GvvPEZ/HEf/PEffXJUvLEj/XKXcrMzfXLWfPJfsvN0ffOUPTOW/XKgszP\
0M7P0c/R0/PPhPbPfPLNnPXSZtDS1NHS0vTRfPbSbfbPjvPQltTU1fXSiPXVc/TTn/XYfeDWz/bY\
fNfY2N7X0PXYjNnZ2NnZ2dra2vfbftvb2/jbitzc3Pfdjd7d3Pjcnd3e3t7e3vXcs/bcsvbfoeDg\
4PjgrOLi4vTknfjjsOXl5efn5/foz+rq6vrrxf//////////////////////////////////////\
////////////////////////////////////////////////////////////////////////////\
////////////////////////////////////////////////////////////////////////////\
////////////////////////////////////////////////////////////////////////////\
////////////////////////////////////////////////////////////////////////////\
/////////////////////////////////////////////////////yH5BAEKAP8ALAAAAAASABIA\
AAjcAP8JHEiwoMGDCA8e4uLFUkKBc/z8UxPEB6B/a/gcHPMjSaJFOmr8OwMkyh2DZXikOMIphhRJ\
MlJAQThoygg7TuIQKbHloBYbYCg12oGlS5VLe6jMgEOQA4gQH0wsWdHjhogOHjbgIHjCggYjeLLQ\
YIKGzYsMFJ4c7EPCxRAxFXJA+pfnIIwFCiJNQBLmAIQWB1kQKKBCDoIHmi4MaHDFYBEJEf4JMSDg\
nxUHGBCSEYgiAAAlCCsFqvPGTZomCRh8MdOGjh5FmwZielTIkCJGfwQ5QkQI0aRMDx8GBAA7\
'

var floatBarContent = ' \
<!-- \
#tianya_anchor{-moz-border-radius:3px; -moz-user-select:none; cursor:pointer; color:#333333; font-family:"Lucida Grande","Microsoft Yahei",Arial,Geneva,Lucida,Helvetica,sans-serif;font-size:12px;font-weight:bold;line-height:15px;background-color:#A4CDF2;width:15px;padding:2px; padding-right:0px; position:fixed; z-index:9999998; display:block;}\
#tianya_helpbar{-moz-border-radius:3px; margin-right:-1px; border:1px solid #A4CDF2; background-color:#ffffff; text-align:left;width:160px;font-family:"Lucida Grande","Microsoft Yahei",Arial,Geneva,Lucida,Helvetica,sans-serif;font-size:12px; position:fixed; z-index:9999998; display:none;}\
.main{clear:both;padding:8px;text-align:left;}\
#tianya_helpbar ul,li{margin:0 auto;padding:0;}\
.menubox{position:relative;overflow:hidden;height:22px;width:160px;text-align:left;font-size:12px;}\
#tabmenu{position:absolute;top:0;left:0;z-index:1;-moz-user-select:none;width:160px;}\
#tabmenu li{-moz-border-radius:3px;width:34px;margin-top:2px;margin-left:2px;padding-left:2px;padding-right:2px;float:left;display:block;cursor:pointer;text-align:center;line-height:16px;height:21px;}\
#tabmenu li.hover{width:40px;font-size:14px; background:#EBF0FF;border-left:1px solid #A4CDF2;border-top:1px solid #A4CDF2;border-right:1px solid #A4CDF2;font-weight:bold;}\
#tabmenu a:link{color:#3B5998;text-decoration:none;outline:none;padding:0;margin:0;}\
#tabmenu a:visited{color:#3B5998;text-decoration:none;outline:none;}\
#tabmenu a:hover{color:#666600;text-decoration:underline;font-weight:bold;outline:none;}\
.mainbox {clear:both;margin-top:-1px;border-top:1px solid #A4CDF2;height:100px;width:160px; background:#EBF0FF;}\
#tabmain div{display:none;color:#1E7ABA;}\
#tabmain div.block{display:block;}\
#tabmain {padding:0px;margin:4px;}\
#tabmain table{padding:0px;margin:0px;border-collapse:collapse;height:95px;width:100%;color:#1E7ABA;}\
#tabmain select,#tabmain textarea {padding:1px;margin:1px;border:none;}\
#tabmain textarea{border:1px solid #A4CDF2;background:transparent;overflow-x:hidden;overflow-y:auto;width:98%;height:50px;font-family:"Lucida Grande","Microsoft Yahei",Verdana,Geneva,Lucida,Helvetica,sans-serif;font-size:12px;color:#1E7ACE;}\
#tabmain td{padding:0;margin:0;vertical-align:middle;text-align:left;border:none;font-family:"Lucida Grande","Microsoft Yahei",Verdana,Geneva,Lucida,Helvetica,sans-serif;font-size:12px;}\
#tabmain #tabdiv1,#tabmain #tabdiv2 {vertical-align:center;}\
#tabmain #tabdiv5 {height:90px; width:100%; overflow-x:hidden; overflow-y:auto; border:none;}\
#tabmain #tabdiv5 tr:hover {background:#bbddff;}\
#tabmain #tabdiv5 td {height:10px;border-bottom:1px dashed #aaa;padding:1px 0;}\
#tabmain input[type="text"] {border:none; border-bottom:1px solid #A4CDF2;font-size:9pt; height:18px; color:#006600; padding:0 2px; background:transparent;}\
#tabmain #black_list {height:74px;}\
-->'

var floatBarConent = '\
    <div id="tianya_helpbar">\
     <div class="menubox">\
      <ul id="tabmenu">\
       <li class="hover" onclick="TYH_setTab(0)"><a href="javascript:void(0)">过滤</a></li>\
       <li onclick="TYH_setTab(1)"><a href="javascript:void(0)">高亮</a></li>\
       <li onclick="TYH_setTab(2)"><a href="javascript:void(0)">屏蔽</a></li>\
       <li onclick="TYH_setTab(3)" style="display:none"><a href="javascript:void(0)">提醒</a></li>\
       <li onclick="TYH_setTab(4)" style="width:20px;float:right;margin-right:2px;"><a href="javascript:void(0)"><img src="data:image/gif;base64,'+ menu_gif +'" style="border:none" /></a></li>\
      </ul>\
     </div>\
     <div class="mainbox">\
      <div class="main" id="tabmain">\
        <div class="block" id="tabdiv1">\
            <table><tr height="5px">\
                <td width="15%"><input type="checkbox" id="filter_author" /></td>\
                <td><label for="filter_author" title="快捷键:Ctrl+Y">只看楼主帖子</label></td>\
            </tr><tr height="5px">\
                <td width="15%"><input type="checkbox" id="filter_others" /></td>\
                <td><label for="filter_others">只看其他跟帖：</label></td>\
            </tr><tr>\
                <td colspan="2">\
                <textarea title="每行输入一个天涯ID" id="filter_list" class="tianyaid" onfocus="TYH_idInputFocus(this);" onblur="TYH_idInputBlur(this);"></textarea>\
                </td>\
            </tr></table>\
        </div>\
        <div id="tabdiv2">\
            <table><tr height="5px">\
                <td width="15%"><input type="checkbox" id="highlight_author" /></td>\
                <td><label for="highlight_author" title="快捷键:Alt+Y">高亮楼主帖子</label></td>\
            </tr><tr height="5px">\
                <td width="15%"><input type="checkbox" id="highlight_others" /></td>\
                <td><label for="highlight_others">高亮其他跟帖：</label></td>\
            </tr><tr>\
                <td colspan="2">\
                <textarea title="每行输入一个天涯ID" id="highlight_list" class="tianyaid" onfocus="TYH_idInputFocus(this);" onblur="TYH_idInputBlur(this);"></textarea>\
                </td>\
            </tr></table>\
        </div>\
        <div id="tabdiv3">\
            <span>输入需要屏蔽的天涯ID:</span>\
            <textarea title="每行输入一个天涯ID, 这里输入的ID所发的帖子都将被隐藏" id="black_list" class="tianyaid" onfocus="TYH_idInputFocus(this);" onblur="TYH_idInputBlur(this);" onchange="this.setAttribute(\'ischanged\', \'true\');"></textarea>\
        </div>\
        <div id="tabdiv4" style="display:none">\
        </div>\
        <div id="tabdiv5">\
            <table><tr>\
                <td width="15%"><input type="checkbox" id="bbxreplace" /></td>\
                <td><label for="bbxreplace" title="替换天涯百宝箱中的部分功能">替换天涯百宝箱</label></td>\
            </tr><tr>\
                <td width="15%"><input type="checkbox" id="slideshow" /></td>\
                <td><label for="slideshow" title="单击帖子左上角图标可以隐藏/显示帖子">滑动隐藏帖子*</label></td>\
            </tr><tr>\
                <td width="15%"><input type="checkbox" id="floornum" /></td>\
                <td><label for="floornum" title="在帖子右上角显示楼号">显示帖子楼号*</label></td>\
            </tr><tr>\
            </tr><tr>\
                <td width="15%" style="vertical-align:top;"><input type="checkbox" id="linkpost" /></td>\
                <td><label for="linkpost" title="在帖子右下角显示[前一篇/后一篇]链接">显示前一篇/后一篇链接*</label></td>\
            </tr><tr>\
                <td width="15%"><input type="checkbox" id="repairlink" /></td>\
                <td><label for="repairlink" title="修复Firefox打开中文名作者链接的问题">修复中文名链接*</label></td>\
            </tr><tr>  \
                <td width="15%" style="vertical-align:top;"><input type="checkbox" id="userstatus" /></td>\
                <td><label for="userstatus" title="显示发帖者头像及在线状态">显示用户头像及在线状态*</label></td>\
            </tr><tr>\
                <td width="15%" style="vertical-align:top;"><input type="checkbox" id="disturb" /></td>\
                <td><label for="disturb" title="侦测/隐藏刷屏的帖子">侦测刷屏的帖子*</label><br />同一文字重复<input type="text" id="repeatnum" value="" maxlength="2" style="width:20px; text-align:center;"/>次判为刷屏</td>\
            </tr><tr>\
                <td width="15%" style="vertical-align:top;"><input type="checkbox" id="hotkey" /></td>\
                <td><label for="hotkey" title="启用只看楼主/高亮楼主热键">启用热键</label><br />只看楼主:Ctrl+Y <br />高亮楼主:Alt+Y</td>                           \
            </tr><tr>\
                <td width="15%" style="vertical-align:top;"><input type="checkbox" id="hlstyle" /></td>\
                <td><label for="hlstyle" title="高亮帖子时的样式">帖子高亮样式</label><br>\
                <input type="text" id="csstext" value="" style="width:100%" onmousemove="this.title=this.value" /></td>\
            </tr><tr>\
                <td width="15%" style="vertical-align:top;"><input type="checkbox" id="autoclose" /></td>\
                <td><label for="autoclose" title="浮动栏若没有任何操作将在指定的时间内关闭">自动关闭浮动栏</label><br />超时<input type="text" id="timeout" value="" maxlength="2" style="width:20px; text-align:center;"/>秒钟后</td>\
            </tr><tr>\
                <td width="15%" style="vertical-align:top;"><input type="checkbox" id="defstate" /></td> \
                <td><label for="defstate" title="打开任意帖子默认执行的动作">任意帖子默认执行</label><br />\
                <input type="radio" name="defstate_sel" id="showonly" checked="true" />只看楼主<br />\
                <input type="radio" name="defstate_sel" id="highlight" />高亮楼主</td>\
            </tr><tr>\
                <td colspan="2" style="font-size:9px; font-weight:bold;">按住CTRL键用鼠标拖动浮动栏可以调整位置</td>\
            </tr><tr>\
                <td colspan="2" style="font-size:9px; font-weight:bold;">改变标(*)的选项会刷新当前页面</td>\
            </tr></table>\
        </div>\
      </div>\
     </div>\
    </div>\
    <div id="tianya_anchor">\
    天<br/>涯<br/>助<br/>手<br/>\
    </div>'

    setGlobalStyle(floatBarContent, 'helperbar_style');
    
    script = (TYH_setTab.toString() + TYH_idInputFocus.toString() +  TYH_idInputBlur.toString() +
              TYH_folderClickHandle.toString() + TYH_getDimensions.toString() + TYH_slideToggle.toString());
    script = script.replace(/\s*[\x0d\x0a]+\s*/g, "");
    setGlobalScript(script);

	this.bar = document.createElement('div');
	this.bar.id = "tianya_helper";
	this.bar.innerHTML = floatBarConent;
    document.body.appendChild(this.bar);
    
    this.anchor = $X('id("tianya_anchor")', this.bar, 0);
    this.manbox = $X('id("tianya_helpbar")', this.bar, 0);

    this.anchor.addEventListener('click', TYH_toggleHelpbarHandle, false);
    this.anchor.addEventListener('mousedown', TYH_dragHelpbarHandle, false);
    
    this.manbox.addEventListener('mouseout', TYH_mouseActiveHandle, false);
    this.manbox.addEventListener('mouseover', TYH_mouseActiveHandle, false);
    
    self = this;
    ['filter_author', 'filter_others', 'highlight_author', 'highlight_others'].forEach ( function (id) {
        $X('id("' + id + '")', self.manbox, 0).addEventListener('click', TYH_helpbarHandle, false);
    });

	this.init();
};

FloatBar.prototype = {
	show: function () {
		this.bar.style.visibility = 'visible';
	},
	hide: function () {
		this.bar.style.visibility = 'hidden';
	},
	update: function () {
        var id_list = "";
        
        var elm = ['filter_author', 'highlight_author', 'filter_others', 'highlight_others'];
        for (var i in elm) {
            $(elm[i]).checked = false;
        }
        
        if(Tyconfig.state == TIANYA_SHOWONLY) {
            for (var i in Tyconfig.target) {
                if (Tyconfig.target[i] == Tyconfig.author) {
                    $('filter_author').checked = true;
                } else {
                    id_list += Tyconfig.target[i] + "\n";
                }
            }
            if (id_list != "") {
                $('filter_others').checked = true;
                $('filter_list').value = id_list;
                $('filter_list').style.color = "#1E7ACE";
            } 
            TYH_setTab(0);
        } else if (Tyconfig.state == TIANYA_HIGHLIGHT) {
            
            for (var i in Tyconfig.target) {
                if (Tyconfig.target[i] == Tyconfig.author) {
                    $('highlight_author').checked = true;
                } else {
                    id_list += Tyconfig.target[i] + "\n";
                }
            }
            if(id_list != "") {
                $('highlight_others').checked = true;
                $('highlight_list').value = id_list;
                $('highlight_list').style.color = "#1E7ACE";
            }
            TYH_setTab(1);
        }
    },
	init: function () {
	    //window.addEventListener('load', function() {
            var nodes = $X('//div[@class="mainbox"]//textarea[@class="tianyaid"]')
            for (var i=0; i<nodes.length; i++) {
                TYH_idInputBlur(nodes[i]);
            }
        //}, false);

        this.update();
        
        //update the blacklist to textarea
        if (Tyconfig.blackids.length > 0)
            $('black_list').value = Tyconfig.blackids.join('\n');

        //update the options to helpbar only at the first clicking the tab title
        $X('id("tianya_helpbar")/div/ul/li[last()]')[0].addEventListener('click', function(event) {
            var el = event.currentTarget;
            if (el.getAttribute('option_updated', null)) return;
            //update the option panal
            var tabdiv = $("tabdiv5");
            var optname = ['bbxreplace', 'slideshow', 'floornum', 'hotkey', 'hlstyle', 'autoclose', 'defstate', 'repairlink', 'userstatus', 'linkpost', 'disturb']
            var optnode;
            
            for (var i in optname) {
                optnode = $X('.//input[@id="'+optname[i]+'"]', tabdiv, 0);
                optnode.checked = Tyconfig.option[optname[i]]? true : false;
                optnode.addEventListener('click', handleOptionChange, false);
            }

            optnode = $X('.//input[@id="repeatnum"]', tabdiv, 0);
            optnode.value = Tyconfig.option.disturb;
            if (optnode.value == 0) optnode.value = 10;
            optnode.addEventListener('change', handleOptionChange, false);

            optnode = $X('.//input[@id="csstext"]', tabdiv, 0);
            optnode.value = Tyconfig.option.hlstyle;
            optnode.addEventListener('change', handleOptionChange, false);

            optnode = $X('.//input[@id="timeout"]', tabdiv, 0);
            optnode.value = Tyconfig.option.autoclose;
            if (optnode.value == 0) optnode.value = 5;
            optnode.addEventListener('change', handleOptionChange, false);
            
            optnode = $X('.//input[@id="showonly"]', tabdiv, 0);
            optnode.addEventListener('click', handleOptionChange, false);
            if (Tyconfig.option.defstate == TIANYA_SHOWONLY) {
                optnode.checked = true;
            }
            
            optnode = $X('.//input[@id="highlight"]', tabdiv, 0);
            optnode.addEventListener('click', handleOptionChange, false);
            if (Tyconfig.option.defstate == TIANYA_HIGHLIGHT) {
                optnode.checked = true;
            }
            
            el.setAttribute('option_updated', 1);
        }, false);
        
        //move to the specified position
        if (Tyconfig.option.anchorpos['left'] == 'auto') {
            this.manbox.style['left'] = this.anchor.style['left'] = 'auto';
            this.anchor.style['right'] = Tyconfig.option.anchorpos['right']+'px';
            this.manbox.style['right'] =  (Tyconfig.option.anchorpos['right'] + 17) + 'px';
        } else {
            this.anchor.style['left'] = Tyconfig.option.anchorpos['left']+'px';
            this.manbox.style['left'] = (Tyconfig.option.anchorpos['left'] + 17) + 'px';
            this.manbox.style['right'] = this.anchor.style['right'] = 'auto';
        }
        
        if (Tyconfig.option.anchorpos['top'] == 'auto') {
            this.manbox.style['top'] = this.anchor.style['top'] = 'auto';
            this.manbox.style['bottom'] = this.anchor.style['bottom'] = Tyconfig.option.anchorpos['bottom']+'px';
        } else {
            this.manbox.style['top'] = this.anchor.style['top'] = Tyconfig.option.anchorpos['top']+'px';
            this.manbox.style['bottom'] = this.anchor.style['bottom'] = 'auto';
        }
        
		if (Tyconfig.option.floatbar == 1) {
            this.show();
        } else {
            this.hide();
        }
	}
};

function handleOptionChange(event) {
    var inputbox = event.currentTarget || event;
    
    switch (inputbox.id) {
        case 'bbxreplace':
            Tyconfig.option.bbxreplace = inputbox.checked? 1:0;
            if (inputbox.checked) {
                TianYa.bbxReplacer.install();
                TianYa.bbxReplacer.update();
            } else {
                TianYa.bbxReplacer.uninst();
            }
            break;
        case 'slideshow':
            Tyconfig.option.slideshow = inputbox.checked? 1:0;
            window.setTimeout("window.location.reload();", 1000);
            break;
        case 'floornum':
            Tyconfig.option.floornum = inputbox.checked? 1:0;
            window.setTimeout("window.location.reload();", 1000);
            break;
        case 'linkpost':
            Tyconfig.option.linkpost = inputbox.checked? 1:0;
            window.setTimeout("window.location.reload();", 1000);
            break;
        case 'repairlink':
            Tyconfig.option.repairlink = inputbox.checked? 1:0;
            window.setTimeout("window.location.reload();", 1000);
            break;
        case 'userstatus':
            Tyconfig.option.userstatus = inputbox.checked? 1:0;
            window.setTimeout("window.location.reload();", 1000);
            break;
        case 'disturb':
            if (!inputbox.checked)
                Tyconfig.option.disturb = 0;
            else
                Tyconfig.option.disturb = parseInt($X('id("repeatnum")', 0).value);
            window.setTimeout("window.location.reload();", 1000);
            break;
        case 'repeatnum':
            var threshold = parseInt(inputbox.value);
            if (isNaN(threshold) || threshold<3) {
                inputbox.value = Tyconfig.option.disturb;
                return;
            }
            if ($X('id("disturb")', 0).checked)
                Tyconfig.option.disturb = threshold;
            break;
        case 'hotkey':
            Tyconfig.option.hotkey = inputbox.checked? 1:0;
            break;
        case 'hlstyle':
            inputbox.checked = true;
            break;
        case 'csstext':
            if (inputbox.value == "") {
                alert("用于高亮留言的样式不能为空");
                inputbox.value = Tyconfig.option.hlstyle;
                return;
            } else {
                Tyconfig.option.hlstyle = inputbox.value;
            }
            break;
        case 'autoclose':
            if (!inputbox.checked)
                Tyconfig.option.autoclose = 0;
            else
                Tyconfig.option.autoclose = parseInt($X('id("timeout")', 0).value);
            break;
        case 'timeout':
            if ($X('id("autoclose")', 0).checked)
                Tyconfig.option.autoclose = parseInt(inputbox.value);
            break;
        case 'showonly':
        case 'highlight':
        case 'defstate':
              if ($X('id("defstate")', 0).checked)
                Tyconfig.option.defstate = $X('id("showonly")', 0).checked? TIANYA_SHOWONLY:TIANYA_HIGHLIGHT;
              else
                Tyconfig.option.defstate = TIANYA_NONE;
              break;
    }

    Tyconfig.saveOptions();
}

/* ----------------------------------------------------------------------------
   Below function used by page-base HTML. They will be embeded to page.
   ------------------------------------------------------------------------- */
function TYH_setTab(n){
    var tli=document.getElementById("tabmenu").getElementsByTagName("li");
    var mli=document.getElementById("tabmain").getElementsByTagName("div");
    for(i=0; i<tli.length; i++){
        tli[i].className = i==n?"hover":"";
        mli[i].style.display = i==n?"block":"none";
    }
}
function TYH_idInputFocus(event) {
    var inputbox = event.currentTarget || event;
    
    if (inputbox.value == "请输入天涯ID列表...") {
        inputbox.value = "";
        //inputbox.style.color = "#1E7ACE";
        inputbox.style.setProperty('color', '#1E7ACE', 'important');
    }
}
function TYH_idInputBlur(event) {
    var inputbox = event.currentTarget || event;
    value = inputbox.value.replace(/\s+/,"");
    
    if (value == "" || value == "请输入天涯ID列表...") {
        inputbox.value = "请输入天涯ID列表...";
        //inputbox.style.color = "#BCBCBC";
        inputbox.style.setProperty('color', '#BCBCBC', 'important');
    }
}

/* -------------------------------------------------------------------------- */
function TYH_helpbarHandle(event) {
    var el = event.currentTarget;

    if (el.id == "filter_author" || el.id == "filter_others") {
        $('highlight_author').checked = false;
        $('highlight_others').checked = false;
    } else {
        $('filter_author').checked = false;
        $('filter_others').checked = false;
    }
}

function TYH_dragHelpbarHandle(event) {
    var anchor = event.currentTarget;
    if ( !event.ctrlKey ) return;
    
    var manbox = $('tianya_helpbar');
    anchor.style.cursor = "move";
    anchor.setAttribute('offsetX', event.clientX-anchor.offsetLeft);
    anchor.setAttribute('offsetY', event.clientY-anchor.offsetTop);
    
    document.addEventListener('mousemove', TYH_moveHelpbarHandle, false);
    document.addEventListener('mouseup', TYH_dropHelpbarHandle, false);
    document.addEventListener('blur', TYH_dropHelpbarHandle, false);
    
    function TYH_moveHelpbarHandle(event) {
        totalWidth = anchor.offsetParent.clientWidth;
        totalHeight = anchor.offsetParent.clientHeight;

        curLeft = event.clientX - parseInt(anchor.getAttribute('offsetX'));
        curTop = event.clientY - parseInt(anchor.getAttribute('offsetY'));

        if (curTop > 0 && curTop < totalHeight - anchor.clientHeight) {
            if (curTop > totalHeight/2) {
                manbox.style.top = anchor.style.top = 'auto';
                manbox.style.bottom = anchor.style.bottom = (totalHeight - curTop - anchor.clientHeight)  + 'px';
            } else {
                manbox.style.top = anchor.style.top = curTop + 'px';
                manbox.style.bottom = anchor.style.bottom = 'auto';
            }
        }
        
        if (curLeft < totalHeight/2) {
            anchor.style.left = '1px';
            manbox.style.left = '18px';
            manbox.style.right = anchor.style.right = 'auto';
        } else {
            manbox.style.left = anchor.style.left = 'auto';
            anchor.style.right = '1px';
            manbox.style.right = '18px';
        }
    }
    
    function TYH_dropHelpbarHandle(event) {
        anchor.style.cursor = "pointer";
        document.removeEventListener('mousemove', TYH_moveHelpbarHandle, false);
        document.removeEventListener('mouseup', TYH_dropHelpbarHandle, false);
        document.removeEventListener('blur', TYH_dropHelpbarHandle, false);
        
        ['top', 'right', 'bottom', 'left'].forEach ( function (s) {
            Tyconfig.option.anchorpos[s] = anchor.style[s] == 'auto'? 'auto': parseInt(anchor.style[s]);
        });

        Tyconfig.saveOptions();
    }
}

function TYH_mouseActiveHandle(event) {
    var bar = event.currentTarget;

    if (event.type == "mouseout") {
        if (event.clientX > bar.offsetLeft && event.clientX < bar.offsetLeft+bar.offsetWidth &&
            event.clientY > bar.offsetTop && event.clientY < bar.offsetTop+bar.offsetHeight)
            return;
        if ( Tyconfig.option.autoclose > 0 && !bar.getAttribute('timerId') ) {
            bar.setAttribute('timerId', window.setTimeout(function(){TYH_toggleHelpbarHandle(null, 0)}, Tyconfig.option.autoclose*1000));
        }
    } else { //mouseover
        timerId = bar.getAttribute('timerId');
        if (timerId != "undefined") {
            window.clearTimeout(timerId);
            bar.removeAttribute('timerId');
        }
    }
}

function TYH_toggleHelpbarHandle(event, openIt) {
    var bar = $("tianya_helpbar");
    var anchor = $("tianya_anchor");
    
    if ( bar.getAttribute('locked')) return;

    open = bar.getAttribute('hasOpen');
    if ( open == null ) {
        open = 1;
    } else if (typeof openIt != "undefined" ) {
        if (openIt == open) return;
        open = openIt;
    } else {
        open ^= 1;
    }

    bar.setAttribute('locked', 1);
    bar.setAttribute('hasOpen', open);
    
    if (open) {
        anchor.style.height = '122px';
        
        TYH_slideToggle(bar, 250, true, function () {
            bar.removeAttribute('locked');
            /* Maybe firefox bug. the div with overfolow-y 'auto' will cause the
             * slides action not smooth. so here hidden the scroll bar first
             * and display the scroll bar after slide out. -- Kelvin You
             */
            $('tabdiv5').style.overflowY = "auto";
            
            // set the timer to close the bar after specified duration.
            if ( Tyconfig.option.autoclose > 0 && !bar.getAttribute('timerId') ) {
                bar.setAttribute('timerId', window.setTimeout(function(){TYH_toggleHelpbarHandle(null, 0)}, Tyconfig.option.autoclose*1000));
            }
        });
    } else {
        /* Maybe firefox bug. the div with overfolow-y 'auto' will cause the
         * slides action not smooth. so here hidden the scroll bar first
         * and display the scroll bar after slide out. -- Kelvin You
         */
        var optDiv = $('tabdiv5');
        if (optDiv.style.display == 'block') {
            optDiv.style.overflowY = "hidden";
        }

        TYH_slideToggle(bar, 250, true, function () {
            anchor.style.height = 'auto';
            bar.style.display = "none";
            bar.removeAttribute('locked');
            
            timerId = bar.getAttribute('timerId');
            if (timerId != "undefined") {
                window.clearTimeout(timerId);
                bar.removeAttribute('timerId');
            }
            
            //apply the new configuration
            var fa = $('filter_author');
            var fo = $('filter_others');
            var fl = $('filter_list');
            var ha = $('highlight_author')
            var ho = $('highlight_others')
            var hl = $('highlight_list');
            
            var state = TIANYA_NONE;
            var target = [];
            if(fa.checked || fo.checked) {
                state = TIANYA_SHOWONLY;
                if (fa.checked) {
                    target.push(Tyconfig.author);
                }
                if (fo.checked && fl.value != "" && fl.value != "请输入天涯ID列表...") {
                    var ids = fl.value.replace(/^\s+|\s+$/g,"").split(/\s+/g);
                    for (var i in ids) {
                       target.push(ids[i]);
                    }
                }
            } else if(ha.checked || ho.checked) {
                state = TIANYA_HIGHLIGHT;
                if (ha.checked) {
                    target.push(Tyconfig.author);
                }
                if (ho.checked && hl.value != "" && hl.value != "请输入天涯ID列表...") {
                    var ids = hl.value.replace(/^\s+|\s+$/g,"").split(/\s+/g);
                    for (var i in ids) {
                        target.push(ids[i]);
                    }
                }
            }
            
            if ( target.length == 0 ) {
                state = TIANYA_NONE;
            }
            
            //process the black id list
            var bl = $('black_list');
   
            if (bl.getAttribute('ischanged')) {
                var blackids = [];
                if ( bl.value != "" && bl.value != "请输入天涯ID列表...") {
                    var ids = bl.value.replace(/^\s+|\s+$/g,"").split(/\s+/g);
                    for (var i in ids) {
                        blackids.push(ids[i]);
                    }
                }
                Tyconfig.blackids = blackids;
                Tyconfig.saveBlackIDs();
                bl.removeAttribute('ischanged');
            }
            
            Tyconfig.target = target;
            Tyconfig.state = state;
            
            TianYa.apply();
            Tyconfig.update();
        });
    }
}

function TYH_folderClickHandle(event) {
var icon_down = '\
R0lGODlhDQAOAIQbAFa8TLzkuOP74vf+9/v+++f75uH64M/szPj++P3//f7//un86Pb+9uz4697y\
3G3FZXnKcfX99X7Md2bCXVm9T9Xu02zFY93y2/P989Dszdvx2f///////////////////yH+FUNy\
ZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBAAAfACwAAAAADQAOAAAFM+AnjmRpngAQjEFKHpT6tdZR\
VpMKQNeZPQCJ5sQiplaiFuAVW9FsJJyO5wMKiUmsdisKAQA7'

    o = event.currentTarget;
    node = o;
    // serach the nearest folder block
    while (node.tagName != "TABLE") {
        node = node.parentNode;
    }
    while (node.tagName != "DIV") {
        node = node.nextSibling;
    }

    TYH_slideToggle(node, 250, function (node, collapse) {
        if (collapse) {
            o.style.background = 'url(data:image/gif;base64,' + icon_down +') no-repeat center center';
            o.title = "展开回复";
        } else {
            o.style.background = ''; //recover the original background
            o.title = "缩进回复";
        }
    });
    
    event.preventDefault();
}

function TYH_getDimensions(element) {

    var style = getComputedStyle(element, null);
    
    if ((typeof style.display == 'undefined') || style.display != 'none' ) // Safari bug
      return {width: element.clientWidth, height: element.clientHeight};

    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    var originalDisplay = els.display;

    // visibility set to hidden, the element still non-display, but the height
    // and width is available
    els.visibility = 'hidden';
    els.position = 'absolute';
    els.display = 'block';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;

    // recover to the original value
    els.display = originalDisplay;
    els.position = originalPosition;
    els.visibility = originalVisibility;

    return {width: originalWidth, height: originalHeight};
}

/* --------------------------------------------------------------------------- /
   [Description]
       Simulate the slideToggle in JQuery  
   [Parameters]
         obj: A block element, such as DIV, SPAN ...
       speed: Slide speed in milliseconds
    callback: Invoked when the slide animate is finised
     horizon: if slide by horizon, set it to true
   ==========================================================================
    By Kelvin.You<Kelvin.You@Gmail.com> 20/Nov/2008
/  -------------------------------------------------------------------------- */
function TYH_slideToggle (obj, speed) {
    var m_length, pixels, t_length, c_length, collapse, tid;
    var horizon = false, callback = null;
    var els = obj.style;
    var do_buffer = false;
    
    for (var i = 2; i<arguments.length; i++) {
        switch (typeof arguments[i]) {
            case 'boolean':
                  horizon = arguments[i]; break;
            case 'function':
                  callback = arguments[i]; break;
            case 'number':
                  if (arguments[i] == 1) do_buffer = true;
        }
    }

    if ( !do_buffer ) {
        // increase the click event count
        ref = parseInt(obj.getAttribute('toggleCount'));
        if (isNaN(ref)) ref = 0;
        obj.setAttribute('toggleCount', ref+1);
        if (ref > 0) {
            return;  //just buffer this event and return;
        }
    }

    m_length = parseInt(obj.getAttribute(horizon? 'oriWidth':'oriHeight'));
    
    if (isNaN(m_length)) {
        m_length = horizon? TYH_getDimensions(obj).width : TYH_getDimensions(obj).height;
        obj.setAttribute(horizon? 'oriWidth':'oriHeight', m_length);
    }

    if (horizon && obj.clientWidth < m_length || !horizon && obj.clientHeight < m_length) {
        t_length = m_length;
        collapse = false;
    } else {
        t_length = 0;
        collapse = true;
    }

    style = getComputedStyle(obj, null);
    if ( style.display == 'none') {
        horizon? els.width = '0px' : els.height = '0px';
        els.display = 'block';
        collapse = false;
    }

    d_len = (m_length/speed)*10;
    //els.overflow = "hidden";
    els.setProperty('overflow', 'hidden', 'important');
    horizon? els.height = obj.clientHeight : els.width = obj.clientWidth;

    pixels = 0;
    c_length = horizon? obj.clientWidth : obj.clientHeight;
    
    function slideit() {
        pixels += d_len;
        
        if (pixels >= 1) {
            delta = Math.floor(pixels);
            pixels -= delta;

            if(!collapse && c_length + delta > t_length ) {
                horizon? els.width = t_length + 'px' : els.height = t_length + 'px';
                window.clearInterval(tid);
                if(callback) callback(obj, collapse);
                
                //decrease the click event number
                ref = parseInt(obj.getAttribute('toggleCount'));
                obj.setAttribute('toggleCount', ref-1);
                
                if (ref > 1) {
                    TYH_slideToggle (obj, speed, callback, horizon, 1);
                }
                
            } else if (collapse && c_length - delta < 0 ) {
                horizon? els.width = 0 + 'px' : els.height = 0 + 'px';
                window.clearInterval(tid);
                if(callback) callback(obj, collapse);
                
                //decrease the click event number
                ref = parseInt(obj.getAttribute('toggleCount'));
                obj.setAttribute('toggleCount', ref-1);

                if (ref > 1) {
                    TYH_slideToggle (obj, speed, callback, horizon, 1);
                }
            } else {
                if (horizon) {
                    els.width = collapse?(c_length-delta):(c_length+delta) + 'px';
                } else {
                    els.height = collapse?(c_length-delta):(c_length+delta) + 'px';
                }
                c_length = parseInt(horizon? els.width : els.height);
            }
        }
    }

    tid = window.setInterval(slideit, 10);
}
/* -------------------------------------------------------------------------- */
// scroll to the specified element smoothly
function getPos(e) {
    var rc = e.getBoundingClientRect();
	return {x:rc.left, y:rc.top};
}

function getScroll() {
	if (document.documentElement && document.documentElement.scrollTop) {
		return {x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop};
	} else if (document.body) {
		return {x:document.body.scrollLeft, y:document.body.scrollTop};
	}
}

function scroller(et, duration, ef) {
	var z = this;
    if (document.locked) return;
    document.locked = 1;
    
	z.s = getScroll();
	z.f = (typeof ef != "undefined")? getPos(ef):{x:0, y:0};

	if (z.f.x < 0) z.f.x = 0;
	if (z.f.y < 0) z.f.y = 0;

	z.p = getPos(et);

	z.clear = function(){window.clearInterval(z.timer);z.timer=null};
	z.t=(new Date).getTime();
	
    //Here, do not need scrolling by horizon. -- Kelvin.You
    z.p.x = z.f.x; 

	z.step = function(){
		var t = (new Date).getTime();
		var p = (t - z.t) / duration;
		if (t >= duration + z.t) {
			z.clear();
			window.setTimeout(function(){
                z.scroll((z.p.y-z.f.y)+z.s.y, (z.p.x-z.f.x)+z.s.x);
                delete document.locked;
            },13);
		} else {
			st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.f.y) + z.s.y;
			sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.f.x) + z.s.x;
			z.scroll(st, sl);
		}
	};
	z.scroll = function (t, l){window.scrollTo(l, t)};
	z.timer = window.setInterval(function(){z.step();},13);
}

function go2post(el, direction) {
    var target = el.parentNode.target;
    if (direction) {
        xpath = './following::div[contains(@class,"writer'+el.parentNode.writerId+' ")][1]';
    } else {
        xpath = './preceding::div[contains(@class,"writer'+el.parentNode.writerId+' ")][1]';
    }
    if (postDiv = $X(xpath, target.parentNode, 0)) {
        scroller(postDiv, 1000, target.parentNode);
    }
}

function showGoLink(el, writerId) {
    var pos = getPos(el);
    var scroll = getScroll();

    var goDiv = document.getElementById('__tyh_postlink');
    goDiv.target = el;
    goDiv.writerId = writerId;
    
    goDiv.style.left = (pos.x + scroll.x + el.clientWidth - 19) + 'px';
    goDiv.style.top = (pos.y + scroll.y + el.clientHeight - 37) + 'px';
    goDiv.style.display = 'block';
}

/*-----------------------------------------------------------------------------
 * Replace the TianYa BaiBaoXiang
 *-------------------------------------------------------------------------- */
var BBX_Replacer = function () {
var close_btn_gif = '\
R0lGODlhDwAPAOcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4O\
Dg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEh\
ISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0\
NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdH\
R0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpa\
WltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1t\
bW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CA\
gIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOT\
k5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaam\
pqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5\
ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zM\
zM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f\
3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy\
8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH+FUNyZWF0ZWQgd2l0aCBU\
aGUgR0lNUAAh+QQBCgD/ACwAAAAADwAPAAAIYwD/CRxIsOC/eAgTKkwoMN62SXAiSoQzaVu8hpNg\
LUQIa9LFg3Di6QqJEI6ueCEbhpSIMiLKjy9bsnypMuFMmiBLTiwJc6VLlilzjrR5Mmi8Sak2xusI\
8+FEiRVhKl1osOrAgAA7\
'
var close_bg_jpg = '\
/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAZAAA/+4ADkFkb2JlAGTAAAAAAf/b\
AIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgIC\
AwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD\
AwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAKAAIAwERAAIRAQMRAf/EAG4AAQEBAAAAAAAAAAAAAAAA\
AAYCCgEAAwEAAAAAAAAAAAAAAAAAAAMEBRAAAAMFCQEAAAAAAAAAAAAAAAEUkdECUgZxYpKi4gTU\
lRZWEQABAQcFAQAAAAAAAAAAAAAAARFRYQISkhPRUgNTBBT/2gAMAwEAAhEDEQA/ANva2+TYhrsR\
xnNVwaV253BuNBFQXUnMbdQpxk9SxDKg5ixRODWTOE1rArzVY/JVR02+44Po8/ZJcmoYefZPap//\
2Q==\
'

var writerListContent = '<table><tr><td style="cursor:default;font-weight:bold;">=请选择要查看的用户=</td><td><img id="closeme" style="cursor: pointer;" src="data:image/gif;base64,'+ close_btn_gif +'"/></td></tr></table>';
var writerListStyle = '\
#__tyh_writers {background:#ffffff; display:none; z-index:100; position:absolute; max-height:300px; width:200px; overflow-y:auto; overflow-x:hidden; border:1px solid #0066CC;}\
#__tyh_writers table {padding:0px; margin:0px; border-collapse:collapse; border:none; width:100%;}\
#__tyh_writers tr {height:20px;}\
#__tyh_writers td {background:url(data:image/gif;base64,'+close_bg_jpg+');cursor:pointer;font-size:12px;padding:0 6px 0 6px;text-align:left;color:#333; vertical-align:middle;}\
#__tyh_writers label {cursor:pointer; white-space:nowrap; color:#333;}\
#__tyh_writers td:last-child {text-align:right; cursor:default;}\
#__tyh_writers input {cursor:pointer; vertical-align:-10%;}\
'

    setGlobalStyle(writerListStyle, 'bbx_writerlist');

	this.writerList = document.createElement('div');
	this.writerList.id = "__tyh_writers";
	this.writerList.setAttribute('writerCount', 0);
	this.writerList.setAttribute('commitRefs', -1);
	this.writerList.innerHTML = writerListContent;
    document.body.appendChild(this.writerList);
    
    this.oldShowonlyClick = '';
    this.oldHighlightClick = '';
    this.oldShowotherClick = '';
    this.oldShowotherHTML = '';

    this.init();
}

BBX_Replacer.prototype = {
    install: function () {
        setGlobalStyle('.TianYaBBXShowonly,.TianYaBBXHighlight,.TianYaBBXShowOthers {outline:none; cursor: pointer !important; color:#3B5998 !important; font-size:14px !important; font-weight:bold !important; padding-left:5px !important; padding-right:5px !important;}',
                        'bbx_global');

        try {
            // Replace the author show-only
            node = $X('//a[text()="只看楼主"]|//span[text()="只看楼主"]')[0];

            node.className = "TianYaBBXShowonly";
            node.title = "只显示楼主的帖子(快捷键:Ctrl+Y)";
            this.oldShowonlyClick = node.getAttribute('onclick');
            node.removeAttribute('onclick');
            node.addEventListener('click', handleBBXShowOnly, false);
        } catch (e) {}
            
        try {
            // Replace the highlight author
            node = $X('//a[text()="高亮楼主"]|//span[text()="高亮楼主"]')[0];

            node.className = "TianYaBBXHighlight";
            node.title = "高亮显示楼主的帖子(快捷键:Alt+Y)";
            this.oldHighlightClick = node.getAttribute('onclick');
            node.removeAttribute('onclick');
            node.addEventListener('click', handleBBXHighlight, false);
        } catch (e) {}

        try {
            // Only show somebody's posts
            node = $X('//a[text()="只看某人回复"]', 0);
            
            node.className = "TianYaBBXShowOthers";
            node.title = "只显示指定人的帖子";
            this.oldShowotherClick = node.getAttribute('onclick');
            node.removeAttribute('onclick');
            node.addEventListener('click', handleBBXShowOthers, false);
        } catch (e) {
            try {
                node = $X('//span[text()="只看" and child::select[@onchange]]', 0);
                this.oldShowotherHTML = node.innerHTML;
                node.innerHTML = "只看某人回复";
                node.className = "TianYaBBXShowOthers";
                node.title = "只显示指定人的帖子";
                node.addEventListener('click', handleBBXShowOthers, false);
            } catch (e) {}
        }


    },
    uninst: function () {
        setGlobalStyle(null, 'bbx_global');
        setGlobalStyle(null, 'bbx_style');
        try {
            node = $X('//a[text()="只看楼主"]|//span[text()="只看楼主"]')[0];
            
            node.title = "";
            node.setAttribute('onclick', this.oldShowonlyClick);
            node.removeEventListener('click', handleBBXShowOnly, false);
        } catch (e) {}
        
        try {
            node = $X('//a[text()="高亮楼主"]|//span[text()="高亮楼主"]')[0];
            
            node.title = "";
            node.setAttribute('onclick', this.oldHighlightClick);
            node.removeEventListener('click', handleBBXHighlight, false);
        } catch (e) {}
        
        try {
            node = $X('//a[text()="只看某人回复"]')[0];
            
            node.title = "";
            node.setAttribute('onclick', this.oldShowotherClick);
            node.removeEventListener('click', handleBBXShowOthers, false);
        } catch (e) {
            try {
                node = $X('//span[text()="只看某人回复"]', 0);
                node.innerHTML = this.oldShowotherHTML;
                node.title = "";
                node.removeEventListener('click', handleBBXShowOthers, false);
            } catch (e) {GM_log("uninstall failed");}
        }
    },
    update: function () {
        if ( Tyconfig.option.bbxreplace == 1 ) {
            try {
                //////////////////////////////////////////////////
                if (Tyconfig.state == TIANYA_SHOWONLY) {
                    if (Tyconfig.target.length == 1 && Tyconfig.target[0] == Tyconfig.author ) {
                        setGlobalStyle('.TianYaBBXShowonly {border: 1px inset #000000 !important} .TianYaBBXHighlight {border: 0px none !important} .TianYaBBXShowOthers {border: 0px none !important}', 'bbx_style')
                    } else {
                        setGlobalStyle('.TianYaBBXShowonly {border: 0px none !important} .TianYaBBXHighlight {border: 0px none !important} .TianYaBBXShowOthers {border: 1px inset #000000 !important}', 'bbx_style')
                    }
                    return;
                } else if (Tyconfig.state == TIANYA_HIGHLIGHT) {
                    if (Tyconfig.target.length == 1 && Tyconfig.target[0] == Tyconfig.author ) {
                        setGlobalStyle('.TianYaBBXShowonly {border: 0px none !important} .TianYaBBXHighlight {border: 1px inset #000000 !important} .TianYaBBXShowOthers {border: 0px none !important}', 'bbx_style')
                        return;
                    }
                }
                setGlobalStyle('.TianYaBBXShowonly {border: 0px none !important} .TianYaBBXHighlight {border: 0px none !important} .TianYaBBXShowOthers {border: 0px none !important}', 'bbx_style')
            } catch (e) {
                GM_log(e);
            }
        }
    },
    init: function () {
		if (Tyconfig.option.bbxreplace == 1) {
            this.install();
        }
    }
}

function handleBBXShowOnly (event) {
    toggleShowOnly();
    event.stopPropagation();
    event.preventDefault();
}

function handleBBXHighlight (event) {
    toggleHighlight();
    event.stopPropagation();
    event.preventDefault();
}

function handleBBXShowOthers (event) {
    var clickNode = event.currentTarget;
    var divNode = $('__tyh_writers');

    style = getComputedStyle(divNode, null);
    
    if (!style || style.display == 'none') {
        var writers = {};
        var writerCount = 0;
        
        $X('//a[contains(@href, "vwriter")]').forEach(function(o) {
            if (typeof writers[o.textContent] == "undefined") {
                writers[o.textContent] = 1;
                writerCount++;
            }
            else {
                writers[o.textContent]++;
            }
        });
        
        if (parseInt(divNode.getAttribute('writerCount')) != writerCount ||
            parseInt(divNode.getAttribute('commitRefs')) != Tyconfig.commit) {
            var writersRows = "";
            var tableNode = $X('id("__tyh_writers")/table/tbody', 0);
            writersRows = '<tr>'+tableNode.firstChild.innerHTML+'</tr>';

            checkedList = (Tyconfig.state == TIANYA_SHOWONLY)? Tyconfig.target.join(' ')+' ' : '';
            for (var name in writers) {
                writersRows += '<tr><td><label><input type="checkbox"';
                writersRows += (checkedList.indexOf(name+' ')>=0)?'checked="true"':'';
                writersRows += ' /> '+name+'</label></td><td>'+writers[name]+'</td></tr>';
            }

            tableNode.innerHTML = writersRows;
            divNode.setAttribute('writerCount', writerCount);
            divNode.setAttribute('commitRefs', Tyconfig.commit);
            
            // rebind all the event asociate to each writers and close button
            $X('.//img[@id="closeme"]', tableNode, 0).addEventListener('click', function(){
                clickNode.style.removeProperty('border');
                clickNode.style.removeProperty('background');
                divNode.style.display = 'none';
            }, false);
            
            $X('.//input[@type="checkbox"]', tableNode).forEach( function(chkbox) {
                chkbox.addEventListener('click', function(event){
                    var writer = chkbox.parentNode.textContent.replace(/\s+/g, '');
        
                    if (chkbox.checked) {
                        if (Tyconfig.state != TIANYA_SHOWONLY) {
                            Tyconfig.target.length = 0;
                            Tyconfig.state = TIANYA_SHOWONLY;
                        }
                        
                        Tyconfig.target.push(writer);
                    } else {
                        for (var i in Tyconfig.target) {
                            if (Tyconfig.target[i] == writer) {
                                Tyconfig.target.splice(i, 1);
                                break;
                            }
                        }
                        
                        if (Tyconfig.target.length == 0) {
                            Tyconfig.state = TIANYA_NONE;
                        }
                    }
                    TianYa.apply();
                    Tyconfig.update()
                    divNode.setAttribute('commitRefs', Tyconfig.commit);
                }, false);
            });
        } 

        var clickRect = clickNode.getBoundingClientRect();
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);

        divNode.style.left = clickRect.left + scrollLeft;
        divNode.style.top = clickRect.top + scrollTop + clickNode.offsetHeight;

        clickNode.style.setProperty('border', '1px solid #0066CC', 'important');
        clickNode.style.setProperty('background', '#E6EBF1', 'important');
        divNode.style.display = 'block';
    } else {
        clickNode.style.removeProperty('border');
        clickNode.style.removeProperty('background');
        divNode.style.display = 'none';
    }
}

/*-----------------------------------------------------------------------------
 * Initialization
 *-------------------------------------------------------------------------- */

if (typeof TianYa == 'undefined') {
	var Tyconfig = new TianyaConfig();
	var TianYa = new TianyaHelper();

	if (!TianYa.rebuilt) {
		TianYa.init();
	} else {
		return;
	}
}

/*-----------------------------------------------------------------------------
 * Functions
 *-------------------------------------------------------------------------- */
function hotkeyHandle(event) {
	// Ctrl-Y
	if (event.ctrlKey && event.keyCode == '89') {
		toggleShowOnly();
	}
	// Alt-Y
	if (event.altKey && event.keyCode == '89') {
		toggleHighlight();
	}
}

function floatbarHandle() {
	if (Tyconfig.option.floatbar == 0) {
		TianYa.floatBar.show();
	} else {
		TianYa.floatBar.hide();
	}
	
	Tyconfig.option.floatbar ^= 1;
	Tyconfig.saveOptions();
	
	//reload the current page to update the menu text
	window.location.reload();
}

function toggleShowOnly() {
    if (Tyconfig.state == TIANYA_SHOWONLY
        && Tyconfig.target.length == 1
        && Tyconfig.target[0] == Tyconfig.author) {
        Tyconfig.state = TIANYA_NONE;
    } else {
        Tyconfig.state = TIANYA_SHOWONLY;
        Tyconfig.target = [Tyconfig.author];
    }
    TianYa.apply();
    Tyconfig.update();
}

function toggleHighlight() {
    if (Tyconfig.state == TIANYA_HIGHLIGHT
        && Tyconfig.target.length == 1
        && Tyconfig.target[0] == Tyconfig.author) {
        Tyconfig.state = TIANYA_NONE;
    } else {
        Tyconfig.state = TIANYA_HIGHLIGHT;
        Tyconfig.target = [Tyconfig.author];
    }
    TianYa.apply();
    Tyconfig.update();
}

/* -----------------------------------------------------------------------------
   this function add the css to head css node according to the specified id
   if not found, create a css node to add it
   -------------------------------------------------------------------------- */
function setGlobalStyle(style, id) {
    var head, styleNode = null;
    
    if (typeof id != "undefined") {
        styleNode = $X('/html/head/style[@id="'+id+'"]', 0);
    }
    
    if ( style == null ) {
        //remove the style node
        if (styleNode) {
            styleNode.parentNode.removeChild(styleNode);
        }
    } else {
        if (!styleNode) {
            head = $X('/html/head', 0);
            if (!head) { return; }
            styleNode = document.createElement('style');
            if ( typeof id != "undefined" ) {
                styleNode.id = id;
            }
            styleNode.type = 'text/css';
            styleNode.innerHTML = style;
            head.appendChild(styleNode);
        } else {
            styleNode.innerHTML = style;
        }
    }
}

function setGlobalScript(script, id) {
    var head, script;
    var scriptNode = null;

    if (typeof id != "undefined") {
        scriptNode = $X('/html/head/script[@id="'+id+'"]', 0);
    }
    
    if ( script == null ) {
        //remove the empty script node
        if (scriptNode) {
            scriptNode.parentNode.removeChild(scriptNode);
        }
    } else {
        if (!scriptNode) {
            head = $X('/html/head', 0);
            if (!head) { return; }
            scriptNode = document.createElement('script');
            scriptNode.language = "javascript";
            if ( typeof id != "undefined" ) {
                scriptNode.id = id;
            }
            scriptNode.innerHTML = script;
            head.appendChild(scriptNode);
        } else {
            scriptNode.innerHTML = script;
        }
    }
}

function getStringDigest(str) {
        var digestSum = 0;
        var maxCount = Math.floor(str.length/2)
        for (var i=0; i<maxCount; i++) {
            digestSum += (str.charCodeAt(i*2)<<16) | str.charCodeAt(i*2+1);
        }
        if (str.length%2 == 1) {
            digestSum += str.charCodeAt(i*2);
        }
        
        if (digestSum < 0) {
            digestSum = -digestSum;
        }
        
        return digestSum.toString(16);
}

function getStyleString(style_obj, name_list) {
    var styleStr = ''

    for (var index in name_list) {
        name = name_list[index];
        field = name.split(/\-|_/);

        for (var i=1; i<field.length; i++) {
            field[i] = field[i].charAt(0).toUpperCase()+field[i].substring(1);
        }
        obj_prop = field.join('');

        if (style_obj[obj_prop]) {
            styleStr += name+':'+style_obj[obj_prop]+' !important;';
        }
    }
    return styleStr;
}

function $(id) {
	return document.getElementById(id);
}

function debug(msg) {
	var textarea = $N('textarea', {}), body = document.body;
	textarea.value = msg;
	body.insertBefore(textarea, body.firstChild);
}

function $N(name, attr, childs) {
	var result = document.createElement(name);
	for (var i in attr) {
		result.setAttribute(i, attr[i]);
	}
	if (childs) {
		if (typeof childs == 'string') {
			result.innerHTML = childs;
		}
		else {
			for (var i = 0, j = childs.length; i < j; ++i) {
				var child = childs[i];
				result.appendChild(typeof child == 'string' ? document.createTextNode(child) : child);
			}
		}
	}
	return result;
}

function $X(exp, context, type) {
    var s = exp;
	if (typeof context == 'function' || typeof context == 'number') {
		type = context;
		context = document;
	}
	else {
		context = context || document;
	}

	var doc = context.ownerDocument || context;
	exp = doc.createExpression(exp, function (prefix) {
		return document.createNSResolver(doc).lookupNamespaceURI(prefix) || document.documentElement.namespaceURI;
	});
	
	/* the type:number indicate which node in the result set will be returned */
	if (typeof type == 'number') {
		if (type == 0) {
			return exp.evaluate(context, 9, null).singleNodeValue;
		}
		var result = exp.evaluate(context, 7, null);
		var length = result.snapshotLength;
		if (type < 0) {
			type += length;
		}
		return 0 <= type && type < length ? result.snapshotItem(type) : null;
	}
	
	/* if type is specified Number, String, Boolean or Array, return related value type in the XpathResult object*/
	switch (type) {
	case Number:
		return exp.evaluate(context, 1, null).numberValue;
	case String:
		return exp.evaluate(context, 2, null).stringValue;
	case Boolean:
		return exp.evaluate(context, 3, null).booleanValue;
	case Array:
		var result = exp.evaluate(context, 7, null), res = [];
		for (var i = 0, j = result.snapshotLength; i < j; ++i) {
			res[res.length] = result.snapshotItem(i);
		}
		return res;
	default:
        /* default the result type is determined by the resultType */
		var result = exp.evaluate(context, 0, null);
		switch (result.resultType) {
		case 1:
			return result.numberValue;
		case 2:
			return result.stringValue;
		case 3:
			return result.booleanValue;
		case 4:
			var res = [], i = null;
			while (i = result.iterateNext()) {
				res[res.length] = i;
			}
			return res;
		}
		return null;
	}
}

function parseHTML(str) {
	res = document.implementation.createDocument(null, 'html', null)
	range = document.createRange();
	range.setStartAfter(document.body);
	res.documentElement.appendChild(
		res.importNode(range.createContextualFragment(
			str.replace(/^([\n\r]|.)*?<html([\n\r]|.)*?>|<\/html([\n\r]|.)*?>([\n\r]|.)*$/ig, '')
		), true)
	);
	return res;
}

function HZ2GB(str){
    var strGB = "啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧饨饩饪饫饬饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡缢缣缤缥缦缧缪缫缬缭缯缰缱缲缳缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶钷钸钹钺钼钽钿铄铈铉铊铋铌铍铎铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒锓锔锕锖锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤镥镦镧镨镩镪镫镬镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨鸩鸪鸫鸬鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦鹧鹨鹩鹪鹫鹬鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅龆龇龈龉龊龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞鲟鲠鲡鲢鲣鲥鲦鲧鲨鲩鲫鲭鲮鲰鲱鲲鲳鲴鲵鲶鲷鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋鳌鳍鳎鳏鳐鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄";
	var i,c,p,q,ret="",strSpecial="!\"#$%&'()*+,/:;<=>?@[\]^`{|}~%";
	var charCount = str.length;
	for(i=0; i<charCount; i++){
		if(str.charCodeAt(i)>=0x4e00){
			var p=strGB.indexOf(str.charAt(i));
			if(p>=0){
				q=p%94;
				p=(p-q)/94;
				ret+=("%"+(0xB0+p).toString(16)+"%"+(0xA1+q).toString(16)).toUpperCase();
			}
		}
		else{
			c=str.charAt(i);
			if(c==" ")
				ret+="+";
			else if(strSpecial.indexOf(c)!=-1)
				ret+="%"+str.charCodeAt(i).toString(16);
			else
				ret+=c;
		}
	}
	return ret;
}
