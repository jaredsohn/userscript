// ==UserScript==
// @name           TestforJQuerySortable
// @namespace      http://userscripts.org/scripts/show/70543
// @description    Test
// @include        *what.cd/torrents.php?id*
// @include        *what.cd/artist.php?id*
// @resource      JQ http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @resource      JQUI http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js
// @resource      GM_JQ_XHR http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @resource      JQ_MetaData http://dl.dropbox.com/u/1130474/JQuery/Plugins/metadata/jquery.metadata.js
// @resource      JQ_TabSet  http://dl.dropbox.com/u/1130474/JQuery/Plugins/mbTabset/inc/mbTabset.min.js
// @resource      JQ_TabSet_Css http://dl.dropbox.com/u/1130474/JQuery/Plugins/mbTabset/css/mbTabset.css
// @resource      JQ_TabSet_Grippy http://dl.dropbox.com/u/1130474/JQuery/Plugins/mbTabset/images/grip.png
// @resource      JQ_DataTables http://dl.dropbox.com/u/1130474/JQuery/Plugins/dataTables/media/js/jquery.dataTables.min.gmMod.js
// @resource      JQ_JSON http://dl.dropbox.com/u/1130474/JQuery/Plugins/JSON/jquery.json-2.2.min.js
// @resource      JQ_JStorage http://dl.dropbox.com/u/1130474/JQuery/Plugins/jStorage/jstorage.js
// @resource      JQ_Atd http://dl.dropbox.com/u/1130474/JQuery/Plugins/atd-jquery/scripts/jquery.atd.textarea.js
// @resource      JQ_Atd_Request http://dl.dropbox.com/u/1130474/JQuery/Plugins/atd-jquery/scripts/csshttprequest.js
// @resource      JQ_StickyTooltip http://dl.dropbox.com/u/1130474/JQuery/Plugins/stickyTooltip/stickytooltip.js
// @resource      Protovis http://dl.dropbox.com/u/1130474/protovis-r3.2.js
// @resource      Loader http://dl.dropbox.com/u/1130474/loader.gif
// ==/UserScript==
// Add jQuery



// Inject JQuery into the document head
function injectJQuery() {
    var head = document.getElementsByTagName('head')[0];
    // Scripts
    var JQ = GM_getResourceText('JQ');
    var JQUI = GM_getResourceText('JQUI');
    var GM_JQ_XHR = GM_getResourceText('GM_JQ_XHR');
    var JQ_MetaData = GM_getResourceText('JQ_MetaData');
    var JQ_TabSet = GM_getResourceText('JQ_TabSet');
    var JQ_DataTables = GM_getResourceText('JQ_DataTables');
    var JQ_JSON = GM_getResourceText('JQ_JSON');
    var JQ_JStorage = GM_getResourceText('JQ_JStorage');
    var JQ_Atd = GM_getResourceText('JQ_Atd');
    var JQ_Atd_Request = GM_getResourceText('JQ_Atd_Request');
    var JQ_Atd_StickyTooltip = GM_getResourceText('JQ_StickyTooltip');
    var GM_JQ = document.createElement('script');
    GM_JQ.type = 'text/javascript';
    GM_JQ.innerHTML = JQ + JQUI + GM_JQ_XHR + JQ_MetaData + JQ_TabSet + JQ_DataTables + JQ_JSON + JQ_JStorage + JQ_Atd + JQ_Atd_Request + JQ_Atd_StickyTooltip;
    head.appendChild(GM_JQ);
}

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    }
    else {
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}
injectJQuery();
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    //////// Start of JS Helper Functions
    /**
     *
     *  MD5 (Message-Digest Algorithm)
     *  http://www.webtoolkit.info/
     *
     **/
    
    var MD5 = function (string) {

        function RotateLeft(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
        }

        function AddUnsigned(lX,lY) {
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function F(x,y,z) {
            return (x & y) | ((~x) & z);
        }
        function G(x,y,z) {
            return (x & z) | (y & (~z));
        }
        function H(x,y,z) {
            return (x ^ y ^ z);
        }
        function I(x,y,z) {
            return (y ^ (x | (~z)));
        }

        function FF(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
        };

        function WordToHex(lValue) {
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                lByte = (lValue>>>(lCount*8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
        };

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        };

        var x=Array();
        var k,AA,BB,CC,DD,a,b,c,d;
        var S11=7, S12=12, S13=17, S14=22;
        var S21=5, S22=9 , S23=14, S24=20;
        var S31=4, S32=11, S33=16, S34=23;
        var S41=6, S42=10, S43=15, S44=21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;

        for (k=0;k<x.length;k+=16) {
            AA=a;
            BB=b;
            CC=c;
            DD=d;
            a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=GG(d,a,b,c,x[k+10],S22,0x2441453);
            c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
            a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=AddUnsigned(a,AA);
            b=AddUnsigned(b,BB);
            c=AddUnsigned(c,CC);
            d=AddUnsigned(d,DD);
        }

        var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

        return temp.toLowerCase();
    }
    var colorTools = {
        /**
         * Converts an RGB color value to HSL. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes r, g, and b are contained in the set [0, 255] and
         * returns h, s, and l in the set [0, 1].
         *
         * @param   Number  r       The red color value
         * @param   Number  g       The green color value
         * @param   Number  b       The blue color value
         * @return  Array           The HSL representation
         */
        rgbToHsl: function (r, g, b) {
            r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if(max == min){
                h = s = 0; // achromatic
            }else{
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }

            return [h, s, l];
        },

        /**
         * Converts an HSL color value to RGB. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes h, s, and l are contained in the set [0, 1] and
         * returns r, g, and b in the set [0, 255].
         *
         * @param   Number  h       The hue
         * @param   Number  s       The saturation
         * @param   Number  l       The lightness
         * @return  Array           The RGB representation
         */
        hslToRgb: function (h, s, l){
            var r, g, b;

            if(s == 0){
                r = g = b = l; // achromatic
            }else{
                function hue2rgb(p, q, t){
                    if(t < 0) t += 1;
                    if(t > 1) t -= 1;
                    if(t < 1/6) return p + (q - p) * 6 * t;
                    if(t < 1/2) return q;
                    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                }

                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }

            return [r * 255, g * 255, b * 255];
        },

        luminance: function(colorString, lumPerc){
            return this.hslShift(colorString, 0, 0, lumPerc);
        },
        saturation: function(colorString, satPerc){
            return this.hslShift(colorString, 0, satPerc, 0);
        },
        hue: function(colorString, degree){
            return this.hslShift(colorString, degree, 0, 0);
        },
        hslShift: function(colorString, degree, satPerc, lumPerc){
            if (/^rgb/.test(colorString)){
                var rgbArray = colorString.match(/(\d+)/g);
                var hslArray = this.rgbToHsl(rgbArray[0],rgbArray[1],rgbArray[2]);

                // hue shift
                hslArray[0] += (degree/360);
                if (hslArray[0] <0) hslArray[0] += 1;
                // saturation shift
                hslArray[1] += (satPerc/100);
                hslArray[1] = satPerc >=0 ? Math.min(1, hslArray[1]): Math.max(0, hslArray[1]);
                // luminance shift
                hslArray[2] += (lumPerc/100);
                hslArray[2] = lumPerc >=0 ? Math.min(1, hslArray[2]): Math.max(0, hslArray[2]);

                rgbArray = this.hslToRgb(hslArray[0],hslArray[1],hslArray[2]);
                return "rgb("+Math.round(rgbArray[0])+", "+Math.round(rgbArray[1])+", "+Math.round(rgbArray[2])+")";
            }else return "Not a Rgb color string";
        }
    }
    //////// End of JS Helper Functions


    ///////////////////////// START OF GLOBAL CONFIGURATION /////////////////////////////////////////////////////////////
    var DISCOGS_API_KEY = "7a102303dc";
    // Ressources
    var JQ_TabSet_Css = GM_getResourceText('JQ_TabSet_Css');
    var JQ_TabSet_Grippy = GM_getResourceURL('JQ_TabSet_Grippy');
    var LoaderGif = GM_getResourceURL('Loader');

    function injectCSS(){
        JQ_TabSet_Css = JQ_TabSet_Css.replace("'../images/grippy.png'",JQ_TabSet_Grippy);
        // What UserCss Colors
        var dotBox = $('.box:first');
        var fgColor = dotBox.css('color');
        //var fgColor = $('.head:first').css('background-color');
        var bgColor = dotBox.css('background-color');
        var ref = dotBox;
        while (bgColor == 'transparent') {
            ref = ref.parent();
            bgColor = ref.css('background-color');
        }

        var unselectedColor = colorTools.hslShift(fgColor, 0, -10, -20);
        var hintColor = $('h2:first').css('color');
        JQ_TabSet_Css = JQ_TabSet_Css.replace(/%background-color%/g,bgColor);
        JQ_TabSet_Css = JQ_TabSet_Css.replace(/%foreground-color%/g,fgColor);
        JQ_TabSet_Css = JQ_TabSet_Css.replace(/%hint-color%/g,fgColor);
        JQ_TabSet_Css = JQ_TabSet_Css.replace(/%unselected-color%/g,unselectedColor);

        var head = document.getElementsByTagName('head')[0];
        var GM_CSS = document.createElement('style');
        GM_CSS.type = 'text/css';
        GM_CSS.innerHTML = JQ_TabSet_Css;
        head.appendChild(GM_CSS);
    }
    
    function sidebarSide(){
        var sidebarSide = GM_getValue("sidebarSide", "left");
        if (sidebarSide == "left"){
            $('.sidebar').css('float','left');
            $('.main_column').css('float','right');
        } else {
            $('.sidebar').css('float','right');
            $('.main_column').css('float','left');
        }
    }
    

    //var whatWidth = GM_getValue("whatWidth", "default");
    var whatWidth = GM_getValue("whatWidth", "1400");
    var sidebarPercWidth = GM_getValue("sidebarWidth", "25%");
    $('.thin').css('padding', '0 10px');
    $('.thin').css('float', 'right');
    // Uniformize margins
    $('.main_column').css({
        'margin':'0 10px'
    }); 
    $('.sidebar').css({
        'margin':'0 10px'
    });
    $('.sidebar .box').css({
        'margin':'0  0 10px'
    });
    if (whatWidth != 'default'){
        var content = $('#content');
        var sidebar = $('.sidebar');

        content.width(whatWidth + 'px'); 
       
        //        var contentPaddingL = content.css('padding-left').match(/\d+/)[0];
        //        var contentPaddingR = content.css('padding-right').match(/\d+/)[0];
        var thinWidth = whatWidth -20; // -20 thin padding
        //var thinWidth = whatWidth - contentPaddingL - contentPaddingR - 20; // -20 thin padding
        $('.thin').css('width',thinWidth);

        sidebar.css('width', sidebarPercWidth);
        var sidebarWidth = sidebar.width();

        var mainColumnWidth= thinWidth - sidebarWidth - 40;//  -40 compensate for sidebar and main column margins
        $('.main_column').css('width', mainColumnWidth);
    }
    ///////////////////////// END OF GLOBAL CONFIGURATION /////////////////////////////////////////////////////////////

    ///////////////////////// START OF USER CONFIGURATION /////////////////////////////////////////////////////////////
    var lastFmBioShow = GM_getValue("lastFmBioShow", true);
    var mSpacePlayerShow = GM_getValue("mSpacePlayerShow", true);
    var discogsApiKey = GM_getValue("discogsApiKey", "");
    var discogsShow = GM_getValue("discogsShow", false);
    // Configuration function
    function configUserOptions(evt) {
        

        // Get the Config Div
        var configDiv = $('#WhatLite div.config');

        // Check the config div State
        if (configDiv.length == 1){
            if(configDiv.css('display') == 'none'){
                setConfigInputState(true);
                configDiv.css('display','');
            }
            configDiv.focus();
        }
        else{
            createConfigDiv();
        }

        return; //Exit Function

        // Inject configDiv
        // It is a nested function
        function createConfigDiv() {
            var configDivHook = $('#WhatLite div.head');
            configDiv = $('<div class ="config"></div>');
            //Title
            configDiv.append('<h3>Options</h3>');
            //Options
            var optionsList = $('<div></div>');
            // LastFm Bio config options
            var lfmBioCfg = $('<dl></dl>');
            var lfmBioCfgShow = $('<dt><input type ="checkbox" id="WLcfgLfmBioShow"' + (lastFmBioShow ? ' checked="checked"' : '') + ' /></dt><dd>Show LastFM Artist Info</dd>');
            lfmBioCfgShow.appendTo(lfmBioCfg);
            lfmBioCfg.appendTo(optionsList);

            // My Space Music Player config options
            var msMPlCfg = $('<dl></dl>');
            var msMPlCfgShow = $('<dt><input type ="checkbox" id="WLcfgmsMPlShow"' + (mSpacePlayerShow ? ' checked="checked"' : '') + ' /></dt><dd>Show mySpace Music Player</dd>');
            msMPlCfgShow.appendTo(msMPlCfg);
            msMPlCfg.appendTo(optionsList);

            // Discogs config options
            var discogsCfg = $('<dl></dl>');
            var discogsCfgShow = $('<dt><input type ="checkbox" id="WLcfgDiscogsShow"' + (discogsShow ? ' checked="checked"' : '') + '/></dt> Show Discogs Info (Experimental)</dd>');
            discogsCfgShow.appendTo(discogsCfg);
            var discogsCfgApiKey = $('<dt>Discogs Api Key : </dt><dd><input type ="text" id="WLcfgDiscogsApiKey" value = "' + discogsApiKey + '" /></dd>');
            discogsCfgApiKey.appendTo(discogsCfg);
            discogsCfg.appendTo(optionsList);

            optionsList.appendTo(configDiv);

            // Buttons
            var cfgOkButton = $('<input type="button" id="WLcfgSaveButton" value="Save" title="Save WhatLite Config"/>');
            var cfgCancelButton = $('<input type="button" id="WLcfgCancelButton" value="Cancel" title="Close without saving"/>');

            cfgCancelButton.appendTo(configDiv);
            cfgOkButton.appendTo(configDiv);

            // Insert ConfigDiv
            configDiv.insertAfter(configDivHook);

            //  Adds the necessary event listeners
            document.getElementById("WLcfgSaveButton").addEventListener("click", saveConfiguration, false);
            document.getElementById("WLcfgCancelButton").addEventListener("click", hideConfigDiv, false);
        //            $("#WLcfgSaveButton").click(function(){
        //                saveConfiguration(evt);
        //            });
        //            $("#WLcfgCancelButton").click(function(){
        //                hideConfigDiv(evt);
        //            });
        }


        // Changes the enabled state of all input/select fields of the dialog layer. If newState is undefined or not boolean, it does nothing
        // It is a nested function
        function setConfigInputState(newState) {
            if (typeof(newState) != "boolean") return;
            var cfgInputs = configDiv.find('input');
            $.each(cfgInputs,function(){
                if(newState){
                    $(this).removeAttr('disabled');
                }else{
                    $(this).attr('disabled','disabled');
                }
            });
        }
        //
        //        // Implements a master/slave logic to two following sibling checkboxes. The first is the master one and the following is the slave one
        //        // The slave checkbox is disabled and unchecked when the master one is unchecked
        //        // It is called by the master checkbox event listener
        //        // It is a nested function
        //        function chkDependantLogic(evt) {
        //            var chkMasterState = evt.target.checked;
        //            var chkSlave = $x1("following-sibling::input[@type='checkbox']", evt.target);
        //            if (!chkSlave) return;
        //            if (chkMasterState === false) chkSlave.checked = false;
        //            chkSlave.disabled = !chkMasterState;
        //        }

        // Exits the configuration by hiding the layers
        // It is called by the Cancel button
        // It is a nested function
        function hideConfigDiv(evt) {
            setConfigInputState(false);
            configDiv.css('display' , 'none');
        }

        // Checks and saves the configuration to the configuration variables
        // It is called by the Ok button event listener
        // It is a nested function
        function saveConfiguration(evt) {
            console.info('Saving configuration');
            // Disables the input/select fields
            setConfigInputState(false);

            // Sets other configuration variables
            GM_setValue("lastFmBioShow", $("#WLcfgLfmBioShow").attr('checked'));
            GM_setValue("mSpacePlayerShow", $("#WLcfgmsMPlShow").attr('checked'));
            GM_setValue("discogsShow", $("#WLcfgDiscogsShow").attr('checked'));
            GM_setValue("discogsApiKey", $("#WLcfgDiscogsApiKey").attr('value'));

            // Reloads page and script
            window.location.reload();

        }

    }

    // Registers the configuration menu command
    GM_registerMenuCommand("Test Configuration", configUserOptions, null, null, null);
    ////////////////////// END OF USER CONFIGURATION ///////////////////////////////////////////////////////////////

    /* Get what.CD base URL */
    var whatcd_url_base = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];
    /////////////////////  START OF MAIN /////////////////////////////////////////////////////////////////////////////

    //////////////// Start of  My Space Player

    function getMySpacePlayer(artistName){
        var googleMySpaceGenericSearch = "http://www.google.com/search?&q=site:www.myspace.com+-intitle:MySpaceTV+%22%s%22";
        var searchResultPageUrl = googleMySpaceGenericSearch.replace(/%s/, artistName);
        GM_xmlhttpRequest({
            method: "GET",
            url: searchResultPageUrl,
            onload: function(rsp) {
                if(rsp.status == 200 && rsp.readyState == 4){
                    var mySpaceArtistPageUrl = $(rsp.responseText).find("#res li a:first").attr("href");
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: mySpaceArtistPageUrl,
                        onload: function(rsp) {
                            if(rsp.status == 200 && rsp.readyState == 4){
                                var player = $(rsp.responseText).find("#profile_mp3Player #shell object");
                                if(player.length == 0){
                                    player = $(rsp.responseText).find("object embed[src^='http://musicservices.myspace.com/Modules/MusicServices/Services/Embed.ashx/']");
                                }
                                $('#mSPlayer_Wrapper').append(player);
                            }else{
                                $('#mSPlayer_Wrapper').html('MySpace connection failed.');
                            }
                        }
                    });
                }else{
                    $('#mSPlayer_Wrapper').html('Google connection failed.');
                }
            }
        });
    }

    ////////////////// End of  My Space Player


    ///////////////// Start of  Discogs
    

    function getDiscogsArtistData(artistName,container){
        var uniqueName = MD5(artistName);
        artistName = encodeURIComponent(artistName);
        var artistDataUrl = "http://www.discogs.com/artist/" + artistName + "?f=xml&api_key=" + discogsApiKey;
        console.debug('artist Url ', artistDataUrl);
        GM_xmlhttpRequest({
            method: "GET",
            url: artistDataUrl,
            headers:{
                "Accept-Encoding": "gzip"
            },
            onload: function(rsp) {
                if(rsp.status == 200 && rsp.readyState == 4){
                    //var discogsWrapper = $('#discogs_Wrapper');
                    if (container == null){
                        container = $('#discogs_Wrapper');
                    }

                    var artistContWrapperDiv = container;
                    var artistInfoDiv = $('<div id="discogs_artist_' + uniqueName + '_Details"/>');
                    var artistRelDiv = $('<div id="discogs_artist_' + uniqueName + '_Releases"/>');

                    /////// Setup Tabs
                    var discogs_artist_tabs_wrapper = $('<div class="tabs_wrapper"></div>').appendTo(artistContWrapperDiv);
                    // mbTabset
                    var discogs_artist_tabSet = $('<div class="tabset" id="discogs_artist_' + uniqueName +  '_tabset"></div>');
                    discogs_artist_tabSet.appendTo(discogs_artist_tabs_wrapper);
                    // tab links
                    $('<a id="discogs_artist_tab_a" class="tab {content:\'discogs_artist_' + uniqueName +  '_Details\'}">Info</a>').appendTo(discogs_artist_tabSet);
                    artistInfoDiv.appendTo(discogs_artist_tabs_wrapper);
                    $('<a id="discogs_artist_tab_b" class="tab {content:\'discogs_artist_' + uniqueName +  '_Releases\'}">Releases</a>').appendTo(discogs_artist_tabSet);
                    artistRelDiv.appendTo(discogs_artist_tabs_wrapper);

                    $('#discogs_artist_' + uniqueName + '_tabset').disableSelection();
                    $('#discogs_artist_' + uniqueName + '_tabset').buildMbTabset();

                    /////// Response Data
                    var data = rsp.responseText;
                    var urls = $(data).find("url");
                    var releases = $(data).find("release");
                    var name = $(data).find("name:first");
                    var realname = $(data).find("realname");
                    var anvs = $(data).find("namevariations name");
                    var aliases = $(data).find("aliases name");

                    ////////// Artist Info Tab
                    
                    $('<dt>Name</dt><dd>' + name.text() + '</dd>').appendTo(artistInfoDiv);
                    if (realname.length > 0){
                        $('<dt>Real Name</dt><dd>' + realname.text() + '</dd>').appendTo(artistInfoDiv);
                    }
                    if (urls.length > 0){
                        $('<dt>Urls</dt>').appendTo(artistInfoDiv);
                        $.each(urls, function(){
                            var url = $(this).html();
                            if (url != ""){
                                $('<dd><a href ="'+ url +'">'+ url +'</a></dd>').appendTo(artistInfoDiv);
                            }
                        });
                    }
                    if (anvs.length > 0){
                        $('<dt>Name Variations</dt>').appendTo(artistInfoDiv);
                        anvs.each(function(){
                            var anv = $(this).text();
                            $('<dd>' + anv + '</dd>').appendTo(artistInfoDiv);
                        });
                    }
                    if (aliases.length > 0){
                        $('<dt>Aliases</dt>').appendTo(artistInfoDiv);
                        aliases.each(function(){
                            var alias = $(this).text();
                            $('<dd>' + alias + '</dd>').appendTo(artistInfoDiv);
                        });
                    }


                    ////////// Artist Releases Tab
                    
                    if(releases.length > 0){
                        var artistReleases = $('<div id="artistReleases></div>');
                        artistReleases.appendTo(artistRelDiv);
                        var releaseTable = $('<table id="releaseTable"></table>');

                        var thead = $('<thead/>');
                        var tr = $('<tr/>');
                        var headings = $('<th>DiscogsId</th><th>Type</th><th>Title</th><th>Format</th><th>Label</th><th>Year</th>');
                        headings.appendTo(tr);
                        tr.appendTo(thead);
                        var tbody = $('<tbody/>');

                        thead.appendTo(releaseTable);
                        tbody.appendTo(releaseTable);
                        

                        releaseTable.appendTo(artistReleases);

                        $.each(releases, function(){
                            tr = $('<tr></tr>');
                            var type = $(this).attr('type');
                            //tr.addClass(type);
                            var discogsId =$(this).attr('id');
                            //tr.attr('id','discogsId_'+discogsId);
                            var title = $(this).find('title').html();
                            var format = $(this).find('format').html();
                            var label = $(this).find('label').html();
                            var year =  $(this).find('year').html();
                            var splitLabels = label.split(', ');
                            var labelHtml = '';
                            for (var y in splitLabels){
                                labelHtml += ( labelHtml ==''?'':', ') + '<span>' + splitLabels[y] + '</span>';
                            }
                            var rowData =  $('<td>' + discogsId + '</td><td>' + type + '</td><td discogs_id="'+discogsId+'">' + title + '</td><td>' + format + '</td><td class="label">' + labelHtml + '</td><td>' + year + '</td>');
                            rowData.appendTo(tr);
                            tr.appendTo(tbody);
                        });

                        // Insert a 'details' column to the table
                        var nCloneTh = document.createElement( 'th' );
                        var nCloneTd = document.createElement( 'td' );
                        nCloneTd.innerHTML = ' + ';
                        nCloneTd.className = "center detailsToggle";
                        
                        $('#releaseTable thead tr').each( function () {
                            this.insertBefore( nCloneTh, this.childNodes[0] );
                        } );
                        
                        $('#releaseTable tbody tr').each( function () {
                            this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
                        } );

                        // set up custom classes
                        $.fn.dataTableExt.oStdClasses.sPageButtonStaticDisabled = "paginate_button disabled";

                        var oTable =  releaseTable.dataTable( {
                            "sPaginationType": "full_numbers",
                            "aoColumns": [
                            {
                                "bSortable": false
                            },
                            {
                                "bSearchable": false,
                                "bVisible":    false
                            },
                            {
                                "bSearchable": false,
                                "bVisible":    false
                            },
                            null,
                            null,
                            null,
                            null
                            ]
                        } );

                        // Release details toggle in artist release tab
                        var nodes = $('td.detailsToggle', oTable.fnGetNodes() );
                        nodes = $.makeArray(nodes);
                        for ( var n in nodes){
                            nodes[n].addEventListener("click", function(){
                                var nTr = this.parentNode;
                                if (this.textContent.match('-')){
                                    /* This row is already open - close it */
                                    this.textContent = " + ";
                                    oTable.fnClose(nTr);
                                }else{
                                    /* Open this row */
                                    this.textContent = " - ";
                                    oTable.fnOpen( nTr, getReleaseDetails(this.nextSibling.getAttribute("discogs_id")), 'details' );
                                }
                            },false);
                        }


                        // Label tab from artist release table
                        var labelNodes = $('td.label span', oTable.fnGetNodes() );
                        labelNodes = $.makeArray(labelNodes);
                        for ( var k in labelNodes){
                   
                            labelNodes[k].addEventListener("click", function(){
                                
                                var labelName = this.textContent;             
                                var uniqueLabelName = MD5(labelName);
                                //  test if label tab already exist, if yes select it and exit
                                var tab = $('#discogs_tab_label_' + uniqueLabelName);
                                if (tab.length >0) {
                                    tab.selectMbTab();
                                    return;
                                }
                                // tlabel tab do no exist, create  and select it
                                var tabsCont = $('#discogs_tabset_container');
                                var labelTabCont = $('<div id = "cont_discogs_tab_label_' + uniqueLabelName + '"/>');
                                labelTabCont.appendTo(tabsCont);
                                discogs_artist_getLabelDetails(labelName,labelTabCont);
                          
                                $("#discogs_tabset").addMbTab({
                                    id:'discogs_tab_label_' + uniqueLabelName,
                                    title:'Label : ' + labelName,
                                    ajaxContent:'',
                                    ajaxData:''
                                });
                                $('#discogs_tab_label_' + uniqueLabelName).selectMbTab();                      
                            },false);
                        }

                       
                    }
                }
            }
        });
    }

    function getDiscogsReleaseData(releaseId){
        var releaseDataUrl = "http://www.discogs.com/release/" + releaseId + "?f=xml&api_key=" + DISCOGS_API_KEY;
        console.debug('release Url ', releaseDataUrl);
        GM_xmlhttpRequest({
            method: "GET",
            url: releaseDataUrl,
            headers:{
                "Accept-Encoding": "gzip"
            },
            onload: function(rsp) {
                if(rsp.status == 200 && rsp.readyState == 4){
                    var data = rsp.responseText;

                    var title = $(data).find('title:first');
                    var artists = $(data).find('artists:first').find('artist');
                    var labels = $(data).find('label'); //  attr : catno, name
                    var country = $(data).find('country').text();
                    var releaseDate = $(data).find('released');
                    var tracks = $(data).find("track");
                    var extraArtists = $(data).find('release > extraartists').find('artist');
                    var notes = $(data).find('notes');
                    var formats = $(data).find('format'); // attr : name, qty  / children: description
                    var genres = $(data).find('genre');
                    var styles = $(data).find('style');

                    var relDetailsDiv = $('div.discogs_relDetails');
                    relDetailsDiv.empty();
                  
                    // title  
                    $('<dt>Title</dt><dd>' + title.text() + '</dd>').appendTo(relDetailsDiv);
                    // artists
                    $('<dt>Artist' + (artists.lenght > 1 ? 's' : '') + '</dt>').appendTo(relDetailsDiv);
                    var prevArtist = '';
                    artists.each(function(){
                        var artistName = $(this).find('name').text();
                        var join = $(this).find('join').text();
                        var anv = $(this).find('anv').text();
                        if(join){
                            prevArtist += artistName + ' ' + join + ' ';
                        }else{
                            $('<dd>' + prevArtist + artistName  + (anv ? ' - ' + anv : '') + '</dd>').appendTo(relDetailsDiv);
                            prevArtist = '';
                        }
                    });
                   
                    // labels
                    var labelText = '';
                    var catNbText = '';
                    labels.each(function(){
                        var catnumber = $(this).attr('catno');
                        var labelname = $(this).attr('name');
                        labelText += ( labelText == '' ? labelname : ', ' + labelname);
                        catNbText += ( catNbText == '' ? catnumber : ', ' + catnumber);
                    });
                    $('<dt>Label</dt><dd>' + labelText + '</dd>').appendTo(relDetailsDiv);
                    $('<dt>Cat Number</dt><dd>' + catNbText + '</dd>').appendTo(relDetailsDiv);

                    // formats list
                    $('<dt>Format</dt>').appendTo(relDetailsDiv);
                    formats.each(function(){
                        var support = $(this).attr('name');
                        var qty = $(this).attr('qty');
                        var descriptions = $(this).find('description');
                        var descriptionText ='';
                        if (descriptions){
                            var dText = '';
                            descriptions.each(function(){
                                var description = $(this).text();
                                dText += ( dText == '' ? description : ', ' + description);
                            });
                            descriptionText =' (' + dText + ')';
                        }
                        var format = '<dd>' + support + ( qty > 1 ? ' (' + qty + ')':'') + descriptionText + '</dd>';
                        $(format).appendTo(relDetailsDiv);
                    });
                    
                    $('<dt>Country</dt><dd>' + country + '</dd>').appendTo(relDetailsDiv);
                    if (releaseDate.length > 0){
                        $('<dt>Release Date</dt><dd>' + releaseDate.text() + '</dd>').appendTo(relDetailsDiv);
                    }
                    
                    // genre
                    var genreText = '';
                    genres.each(function(){
                        var genre = $(this).text();
                        genreText += ( genreText == '' ? genre : ', ' + genre);
                    });
                    $('<dt>Genre</dt><dd>' + genreText + '</dd>').appendTo(relDetailsDiv);

                    // style
                    var styleText = '';
                    styles.each(function(){
                        var style = $(this).text();
                        styleText += ( styleText == '' ? style : ', ' + style);
                    });
                    $('<dt>Style</dt><dd>' + styleText + '</dd>').appendTo(relDetailsDiv);

                    // Tracks
                    $('<dt>Tracklist</dt>').appendTo(relDetailsDiv);
                    var trackList = $('<table/>');
                    
                    tracks.each(function(){
                        var position = $(this).find('position').text();
                        var title = $(this).find('title').text();
                        var duration = $(this).find('duration').text();
                        var trackArtists = $(this).find('artists artist');
                        var trackextraArtists = $(this).find('extraartists artist');
                        var tr = $('<tr/>');
                        tr.append($('<td/>').html(position));
                        if (trackArtists.length > 0){
                            var taText = '';
                            trackArtists.each(function(){
                                var trackArtist = $(this).text();
                                taText += ( taText == '' ? '' : ', ') + trackArtist;
                            });
                            tr.append($('<td/>').html(taText));
                        }
                        tr.append($('<td/>').html(title));
                        if (duration){
                            tr.append($('<td/>').html(duration));
                        }
                        if (trackextraArtists.length > 0){
                            var eaText = '';
                            trackextraArtists.each(function(){
                                var name = $(this).find('name').text();
                                var role = $(this).find('role').text();
                                eaText += (eaText == '' ? '': ', ') + role + ' : ' + name;
                            });

                            tr.append($('<td/>').html(eaText));
                        }
                        
                        tr.appendTo(trackList);
                    });
                    var tracksDD = $('<dd class="trackList"/>')
                    trackList.appendTo(tracksDD);
                    tracksDD.appendTo(relDetailsDiv);

                    // credits   
                    if (extraArtists.length >0){
                        $('<dt>Credits</dt>').appendTo(relDetailsDiv);
                        extraArtists.each(function(){
                            var artistName = $(this).find('name').text();
                            var role = $(this).find('role').text();
                            var tracks = $(this).find('tracks').text();
                            $('<dd>' + role  + ( tracks ? ' [' + tracks + ']':'') +' : ' + artistName + '</dd>').appendTo(relDetailsDiv);
                        });
                    }
                    
                    // notes
                    if (notes.length > 0){
                        notes = unescapeHTML(notes.html());
                        $('<dt>Notes</dt><dd>' + notes + '</dd>').appendTo(relDetailsDiv);
                    }
                }
            }
        });
    }

    function getReleaseDetails(releaseId){
        var detailsTable = '<div class="discogs_relDetails" discogs_id="'+releaseId+'"><img src="'+LoaderGif+'"/> Loading...</div>';
        getDiscogsReleaseData(releaseId);
        return detailsTable;
    }

    function getDiscogsLabelData(labelName, container){
        var uniqueName = MD5(labelName);
        labelName = labelName.replace(/\s+/gi,"+");
        var labelDataUrl = "http://www.discogs.com/label/" + labelName + "?f=xml&api_key=" + DISCOGS_API_KEY;
        console.debug('label requestUrl ', labelDataUrl);
        GM_xmlhttpRequest({
            method: "GET",
            url: labelDataUrl,
            headers:{
                "Accept-Encoding": "gzip"
            },
            onload: function(rsp) {
                if(rsp.status == 200 && rsp.readyState == 4){
                    
                    
                    var data = rsp.responseText;
                    var name = $(data).find("name:first");
                    var contactInfo = $(data).find("contactinfo");
                    var profile = $(data).find("profile");
                    var urls = $(data).find("url");
                    var sublabels = $(data).find("sublabels").find("label");
                    var parentlabel = $(data).find("parentLabel");
                    var releases = $(data).find("release");


                    var labelContWrapperDiv = container;

                    var labelInfoDiv = $('<div id="discogs_label_' + uniqueName +  '_Details"/>');
                    var labelRelDiv = $('<div id="discogs_label_' + uniqueName +  '_Releases"/>');
                    labelContWrapperDiv.empty();

                    /////// Setup Tabs
                    var discogs_label_tabs_wrapper = $('<div class="discogs_tabs"></div>').appendTo(labelContWrapperDiv);
                    
                    // mbTabset
                    var discogs_label_tabSet = $('<div class="tabset" id="discogs_label_' + uniqueName +  '_tabset"></div>');
                    discogs_label_tabSet.appendTo(discogs_label_tabs_wrapper);
                    // tab links
                    $('<a id="discogs_label_tab_a" class="tab {content:\'discogs_label_' + uniqueName +  '_Details\'}">Info</a>').appendTo(discogs_label_tabSet);
                    labelInfoDiv.appendTo(discogs_label_tabs_wrapper);
                    $('<a id="discogs_label_tab_b" class="tab {content:\'discogs_label_' + uniqueName +  '_Releases\'}">Releases</a>').appendTo(discogs_label_tabSet);
                    labelRelDiv.appendTo(discogs_label_tabs_wrapper);

                    $("#discogs_label_" + uniqueName +  "_tabset").disableSelection();
                    $("#discogs_label_" + uniqueName +  "_tabset").buildMbTabset();

                    ///////  Label Info
                    $('<dt>Name</dt><dd>' + name.text() + '</dd>').appendTo(labelInfoDiv);
                    if (contactInfo.length > 0){
                        $('<dt>Contact Info</dt><dd>' + contactInfo.text() + '</dd>').appendTo(labelInfoDiv);
                    }
                    if (profile.length > 0){
                        $('<dt>Profile</dt><dd>' + profile.text() + '</dd>').appendTo(labelInfoDiv);
                    }
                    if (urls.length > 0){
                        $('<dt>Urls</dt>').appendTo(labelInfoDiv);
                        $.each(urls, function(){
                            var url = $(this).text();
                            if (url != ""){
                                $('<dd><a href ="'+ url +'">'+ url +'</a></dd>').appendTo(labelInfoDiv);
                            }
                        });
                    }
                    
                    if (parentlabel.length > 0){
                        $('<dt>Parent Label</dt><dd>' + parentlabel.text() + '</dd>').appendTo(labelInfoDiv);
                    }
                    if (sublabels.length > 0){
                        $('<dt>Sub Label</dt>').appendTo(labelInfoDiv);
                        $.each(sublabels, function(){
                            var sublabel = $(this).text();
                            $('<dd>' + sublabel +'</dd>').appendTo(labelInfoDiv);
                        });
                    }


                    ///////  Label Releases
                    var labelRelTable = $('<table/>').appendTo(labelRelDiv);
                    var thead = $('<thead/>').append($('<tr><th>Discogs Id</th><th>Catalog Number</th><th>Artist</th><th>Title</th><th>Format</th></tr>'));
                    thead.appendTo(labelRelTable);
                    var tbody = $('<tbody/>');
                    tbody.appendTo(labelRelTable);
                    releases.each(function(){
                        var discogsId = $(this).attr('id');
                        var catNb = $(this).find('catno').text();
                        var artist = $(this).find('artist').text();
                        var title = $(this).find('title').text();
                        var format = $(this).find('format').text();

                        var tr = $('<tr/>');
                        tr.append($('<td>' + discogsId + '</td><td discogs_id="'+discogsId+'">' + catNb + '</td><td class="artist">' + artist + '</td><td>' + title + '</td><td>' + format + '</td>'));
                        tr.appendTo(tbody);
                    });

                    // Insert a 'details' column to the table
                    var nCloneTh = document.createElement( 'th' );
                    var nCloneTd = document.createElement( 'td' );
                    nCloneTd.innerHTML = ' + ';
                    nCloneTd.className = "center detailsToggle";

                    labelRelTable.find('thead tr').each( function () {
                        this.insertBefore( nCloneTh, this.childNodes[0] );
                    } );

                    labelRelTable.find('tbody tr').each( function () {
                        this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
                    } );

                    // set up custom classes
                    $.fn.dataTableExt.oStdClasses.sPageButtonStaticDisabled = "paginate_button disabled";
                
                    var pTable =  labelRelTable.dataTable( {
                        "sPaginationType": "full_numbers",
                        "aoColumns": [
                        {
                            "bSortable": false
                        },
                        {
                            "bSearchable": false,
                            "bVisible":    false
                        },
                        null,
                        null,
                        null,
                        null
                        ]
                    } );
                
                    var nodes = $('td.detailsToggle', pTable.fnGetNodes() );
                    nodes = $.makeArray(nodes);
                    for ( var n in nodes){
                        nodes[n].addEventListener("click", function(){
                            var nTr = this.parentNode;
                            if (this.textContent.match('-')){
                                /* This row is already open - close it */
                                this.textContent = " + ";
                                pTable.fnClose(nTr);
                            }else{
                                /* Open this row */
                                this.textContent = " - ";
                                pTable.fnOpen( nTr, getReleaseDetails(this.nextSibling.getAttribute("discogs_id")), 'details' );
                            }
                        },false);
                    }

                    // Artist tab from label release table
                    var artistNodes = $('td.artist', pTable.fnGetNodes() );
                    artistNodes = $.makeArray(artistNodes);
                    for ( var j in artistNodes){
                        artistNodes[j].addEventListener("click", function(){
                            var artistName = this.textContent;
                            var uniqueArtistName = MD5(artistName);
                            //  test if artist tab already exist, if yes select it and exit
                            var tab = $('#discogs_tab_artist_' + uniqueArtistName);
                            if (tab.length >0) {
                                tab.selectMbTab();
                                return;
                            }
                            // tartist tab do no exist, create  and select it
                            var tabsCont = $('#discogs_tabset_container');
                            var labelTabCont = $('<div id = "cont_discogs_tab_artist_' + uniqueArtistName + '"/>');
                            labelTabCont.appendTo(tabsCont);
                            discogs_artist_getLabelDetails(labelName,labelTabCont);

                            $("#discogs_tabset").addMbTab({
                                id:'discogs_tab_artist_' + uniqueArtistName,
                                title:'Artist : ' + artistName,
                                ajaxContent:'',
                                ajaxData:''
                            });
                            $('#discogs_tab_artist_' + uniqueArtistName).selectMbTab();

                            
                        },false);
                    }
                }

            }
        });
    }

    function discogs_artist_getLabelDetails(labelName, container){
        container.append($('<img src="'+LoaderGif+'"/><p> Loading...</p>'));
        getDiscogsLabelData(labelName, container);
    }

    

    /////////////// End of  Discogs


    ///////  Start of LastFM  Bio

    function getLastFmBio(artistname){
        var infoUrl = 'http://ws.audioscrobbler.com/2.0/artist/%s/info.xml'.replace(/%s/, artistname);
        GM_xmlhttpRequest({
            method: "GET",
            url: infoUrl,
            onload: function(rsp) {
                if(rsp.status == 200 && rsp.readyState == 4){
                    var rawBioHtml = $(rsp.responseText).find("bio").find("content").html();
                    var bioHtml = formatBio(rawBioHtml);
                    $('#lfmBio_Wrapper').html(bioHtml);
                }else{
                    $('#lfmBio_Wrapper').html('LastFm connection failed.');
                }
            }
        });
    }

    function formatBio(rawResponse){
        //console.debug('Raw response : %o', rawResponse);
        resCdataRemoved = stripCDataTags(rawResponse);
        //console.debug('CData stripped : %o', resCdataRemoved);
        resTagsRemoved = stripHtmlTags(resCdataRemoved);
        //console.debug('Html tags sanitized, hopefully : %o', resTagsRemoved);
        //bioFormated = restoreLinks(bioFormated);
        bioPreFormated = resTagsRemoved.replace(/\s{2,}/ig,"</p><p>");
        bioFormatedHtml = '<p>' + bioPreFormated + '</p>';
        //console.debug('<p> tags and links restored : %o', bioFormatedHtml);
        return bioFormatedHtml;

    }

    function stripCDataTags(string){
        //        var regex0=/\<\!--\[CDATA\[/g;
        //        var regex1=/.*\[CDATA\[/g;
        //        var regex2=/\]\]--\>/g;
        //        var regex3=/\]\].*/g;
        //        string = string.replace(regex0,"");
        //        string = string.replace(regex2,"");
        //        string = string.replace(regex1,"");
        //        string = string.replace(regex3,"");
        var regex=/(.*\[CDATA\[|\]\].*)/g;
        string = string.replace(regex,"");
        return string
    }

    function stripHtmlTags(string){
        var regex1=/\<script[^\>]*>[^\<]*\<\/script\>/gi;
        var regex2=/\<object[^\>]*\>.*\<\/object\>/i;
        string = string.replace(regex1,"");
        string = string.replace(regex2,"");
        //var regex=/(<([^>]+)>)/ig;
        var regex=/\<[^\<\>]+\>/ig;
        //string = string.replace(regex,"");
        return string
    }

    function restoreLinks(string){
        var urlRegex = /\b(https?:\/\/[^\s+\"\<\>]+)/ig;
        urls = string.match(urlRegex);
        //console.debug('Found links :  %o', urls);
        for (i in urls){
            url = urls[i];
            string = string.replace(url,"<a href ='" + url + "'>" + url + "</a>");
        }
        return string;
    }

    function unescapeHTML(html) {
        var htmlNode = document.createElement("DIV");
        htmlNode.innerHTML = html;
        if(htmlNode.innerText !== undefined)
            return htmlNode.innerText; // IE
        return htmlNode.textContent; // FF
    }

    function sanitizeStringForRequest(string){
        string = string.replace(/&/g, '%26').replace(/\//g, '%2F').replace(/\?/,"%3F");
        return string;
    }

    ///////  End of LastFM  Bio


    ///////  Start of Similar Map Tweaks

    function showArtistInfoOnMap(){
        var dialogDiv = $('<div id="WL_simArtMap_infoDialog"></div>');
        dialogDiv.appendTo('body');
        // Grab Links
        var artistLinks = document.getElementById('what_SimilarMap').getElementsByTagName('a');
        for (var i in artistLinks){
            if (!isNaN(i)){
                artistLinks[i].addEventListener("mouseover", showPopupInfo, false);
                artistLinks[i].addEventListener("mouseout", hidePopupInfo, false);
            }
        }

        function showPopupInfo(e){
            var link = e.target;
            var href = link.href;
            var artistName = link.text;
            //console.log(artistName);
            var posX = e.screenX;
            
            var posY = e.screenY;
            
            GM_xmlhttpRequest({
                method: "GET",
                url: href,
                onload: function(rsp) {
                    if(rsp.status == 200 && rsp.readyState == 4){
                        var artistInfo = $(rsp.responseText).find("#content div.main_column div.box:contains('info'):last .body").html();
                        dialogDiv.attr('title', artistName);
                        dialogDiv.html(artistInfo);
                        dialogDiv.dialog({
                            autoOpen: false,
                            width: 500,
                            modal: false,
                            height: 300
                        //                            resizable: false,
                        //                            draggable: false
                        });


                        console.log('Screen X : ' + posX);
                        console.log('Screen Y : ' + posY);
                        dialogDiv.dialog('open');
                    }else{
                        console.log('Failed fetching artist info');
                    }
                }
            });
        }
            
        function hidePopupInfo(e){
            dialogDiv.dialog('destroy');
            console.log('hide popup');
        }
        
    }
    
    ///////  End of Similar Map Tweaks
    
    function isAudioRelease(){
        dT = $("#discog_table"); //artist page
        aL = $("#content div.thin h2 a[href^='artist.php?id=']"); // torrent page
        if (dT.length == 0 && aL.length == 0){
            return false;
        }
        return true;
    }

    function hook(){

        var hook = $("#content div.main_column div.box:contains('info'):last");

        var whatLiteDiv = $('<div id ="WhatLite" class ="box">'+
            '<div class ="head"><strong>WhatLite</strong></div>'+
            '<div class ="body"></div>');
        whatLiteDiv.insertAfter(hook);
        var tabs_wrapper = $('<div id="WL_tabs"></div>');

        // mbTabset
        var tabSet = $('<div class="tabset" id="WL_tabset"></div>');
        tabSet.appendTo(tabs_wrapper);
        // What artist info
        $('<a id="WL_TL_a" class="tab {content:\'what_ArtistInfo\'}">Artist Info</a>').appendTo(tabSet);
        var what_ArtistInfoBox = hook;
        what_ArtistInfoBox.children('div.body:first').removeClass().attr('id','what_ArtistInfo').appendTo(tabs_wrapper);
        what_ArtistInfoBox.remove();
        // Similar Artist Map
        // ==============TODO set up a wrapper div================
        $('<a id="WL_TL_b" class="tab {content:\'what_SimilarMap\'}">Similar Artists</a>').appendTo(tabSet);
        var what_SimilarArtistMapBox = $("#content div.main_column div.box:contains('Similar artist map'):first"); //div.main_column div.box:first");
        what_SimilarArtistMapBox.children('div:last').removeClass().attr('id','what_SimilarMap').appendTo(tabs_wrapper);
        what_SimilarArtistMapBox.remove();
        // Last FM Bio
        if (lastFmBioShow){
            $('<a id="WL_TL_c" class="tab {content:\'lfmBio_wrapper\'}">LFM Bio</a>').appendTo(tabSet);
            $('<div id="lfmBio_wrapper"></div>').appendTo(tabs_wrapper);
        }
        // MySpace Player
        if (mSpacePlayerShow){
            $('<a id="WL_TL_d" class="tab {content:\'mSPlayer_wrapper\'}">MySpace Player</a>').appendTo(tabSet);
            $('<div id="mSPlayer_wrapper" display="none"></div>').appendTo(tabs_wrapper);
        }
        // Discogs Data
        if (discogsShow){
            $('<a id="WL_TL_e" class="tab {content:\'discogs_wrapper\'}">Discogs Info</a>').appendTo(tabSet);
            $('<div id="discogs_wrapper" ></div>').appendTo(tabs_wrapper);
        }
        // What artist info
        whatLiteDiv.find('.body').append(tabs_wrapper);

        

        $("#WL_tabset").disableSelection();
        $("#WL_tabset").buildMbTabset();

        whatLiteDiv.append($('<div class="clear"/>'))


        

    }

    function formatSidebar(){
        var sidebar = $('#content .thin .sidebar');
        var sidebarFirst = sidebar.find('.box:first').css('padding-bottom','19px');
        // Move Add Artist widget to Similar artist
        var sidebarAddArtist = sidebar.find('.box:last');
        var sidebarSimilar = sidebar.find('.box:last').prev();
        sidebarAddArtist.find('ul').appendTo(sidebarSimilar);
        sidebarSimilar.find('ul').wrapAll('<div/>');
        sidebarAddArtist.remove();
        // grab widget except first (artist picture)
        var sidebarWidgets = sidebar.find('.box + .box');
        var sidebarAccordion = $('<div id="sidebarAccordion" />');
        sidebarAccordion.appendTo(sidebarFirst).css({
            'margin' : '0 10px'
        });
        sidebarWidgets.children().appendTo(sidebarAccordion);
        sidebarWidgets.remove();
        sidebarAccordion.accordion({
            autoHeight: false,
            active: 1
        });
    }

    function findArtist(){

        var h2 = $('#content h2:first');
        var h2a = h2.find('a');
        var artistName = '';
        if (h2a.length == 1){
            artistName = $.trim(h2a.text());
            return artistName;
        }else{
            artistName = $.trim(h2.text());
            return artistName;
        }
    }

   


    ////// Start of What Proxy for requests

    /* Throttled proxy */
    function Proxy(delay) {
        var last_req = new Date();
        var queue = [];
        var processing = false;

        return {
            get: function(url, accept, callback) {
                var now = new Date();
                queue.push({
                    url: url,
                    accept: accept,
                    callback: callback
                });
                if (!processing) {
                    processing = true;
                    var diff = last_req.getTime() + delay - now.getTime();
                    if (diff > 0) {
                        var that = this;
                        window.setTimeout(function() {
                            that.process_queue();
                        }, diff);
                    } else {
                        this.process_queue();
                    }
                }
            },

            process_queue: function() {
                var req = queue.shift();
                this.do_request(req.url, req.accept, req.callback);
                processing = (queue.length > 0);
                if (processing) {
                    var that = this;
                    window.setTimeout(function() {
                        that.process_queue();
                    }, delay);
                }
            },

            do_request: function(url, accept, callback) {
                last_req = new Date();
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    headers: {
                        'User-Agent': navigator.userAgent,
                        'Accept': accept
                    },
                    onload: callback
                });
            }
        };
    }

    /* What.CD proxy */
    var whatcd_proxy = Proxy(250);

    ////// End of What Proxy for requests

    function formatReleaseTables(){

        //////////// Start of WHAT Releases Tabs Interface
        //// Build TabSet
        var what_relLinksDiv = $('#discog_table div:first');
        what_relLinksDiv.removeClass().attr('id','WRel_tabset').addClass('tabset');
        var what_relLinks = what_relLinksDiv.find('a');
        var tabIndex = 1;
        $.each(what_relLinks,function(){
            var linkText = $(this).text().replace(/[\[\]]+/g,'');
            $(this).text(linkText);
            var lHrefId = $(this).attr('href').replace('#','');
            $(this).addClass("tab {content:'" + lHrefId + "_Wrapper'}").attr('id','WR_TL_'+ tabIndex).removeAttr('href');
            tabIndex++;
        });
        //// Build Containers
        var what_relTables = $('#discog_table table');
        $.each(what_relTables,function(){
            var what_relTableId = $(this).attr('id');
            $(this).wrap('<div id ="'+ what_relTableId +'_Wrapper" class="releaseWrapper"></div>');
        });
        //// Ensure table rows are shown
        what_relTables.find('tr').removeClass('hidden');
        //// Wrap
        var relDiv = $('#discog_table');
        relDiv.wrap('<div class="box"></div>').before('<div class="head"><strong>Releases</strong></div>').wrap('<div class="body"></div>');
        //// do Tabset
        $("#WRel_tabset").disableSelection();
        $("#WRel_tabset").buildMbTabset();
        //////////// End of WHAT Releases Tabs Interface



        /////////// Start of Releases Tables Options

        //// Options default values
        //=====Release Cover
        var coverShow = GM_getValue("coverShow", false);
        var coverSize = GM_getValue("coverSize", "90");

        ///////////////////

        var filterOptionsHook = $('#discog_table');
        var filterOptionsDiv = $('<div id="releases_options"><h3>Options</h3></div>');
        filterOptionsDiv.insertBefore(filterOptionsHook);

        var relTableCfg_OptionsList = $('<div></div>');
        // Option::releaseCover : show / size
        var relTableCfg_cover = $('<dl><h4><strong>Release Cover</strong></h4></dl>');
        var relTableCfg_coverShow = $('<dt>Show</dt><dd><input type ="checkbox" id="WLcfg_RelTable_coverShow"' + (coverShow ? ' checked="checked"' : '') + ' /></dd>');
        relTableCfg_coverShow.appendTo(relTableCfg_cover);
        var relTableCfg_coverSize = $('<dt>Size</dt><dd><input type ="text" id="WLcfg_RelTable_coverSize" value = "' + coverSize + '" /> px</dd>');
        relTableCfg_coverSize.appendTo(relTableCfg_cover);
        relTableCfg_cover.appendTo(relTableCfg_OptionsList);
        

        // Option::filter : codec / birate

        relTableCfg_OptionsList.appendTo(filterOptionsDiv);

        /////////// End of Releases Tables Options

        
        

        // column width :  1: snatched 2: seeders 3: leechers
        var tdRef = albumsRows.eq(0).next().next().find('td:last');
        var td3W = tdRef.width();
        var td2W = tdRef.prev().width();
        var td1W = tdRef.prev().prev().width();
        // remove headers row
        $('.torrent_table').each(function(){
            $(this).find('tr:first').remove();
        });
        
        // Grab Albums row
        var albumsRows = $('.torrent_table .group.discog');
        // GROSS HACK : Bullshit request to ensure the first GM_xmlhttpRequest for album cover
        //              is executed outside the scope of jQuery.each
        if (coverShow){
            whatcd_proxy.get('http://www.a.com','text/xml',function(){});
        }
        
        albumsRows.each(function(){
            //// Grab Release cover
            if (coverShow){
                var albumLink = $(this).find('strong a');
                var albumHref = albumLink.attr('href');
                var albumTitle = albumLink.text();
                albumHref = whatcd_url_base +'/' +albumHref;
                var td = $(this).find('td');
                var cover_image = $('<img/>').attr('alt', 'Album Cover').attr('src', whatcd_url_base+'/static/common/noartwork/music.png').css('width', coverSize + 'px');
                //cover_image.prependTo(td).wrap('<div></div>');
                cover_image.prependTo(td).css({
                    'float':'left',
                    'margin-right':'5px'
                });
                // Queue Request cover image
                whatcd_proxy.get(albumHref, 'text/xml',
                    function(rsp) {
                        if(rsp.status == 200 && rsp.readyState == 4){
                            var albumCoverSrc = $(rsp.responseText).find("#content div.sidebar div.box_albumart > p img").eq(0).attr('src');
                            if (albumCoverSrc) {
                                cover_image.attr('src', albumCoverSrc);
                            }
                        }
                    }
                    );
            }

            // Columns headers img
            var snatchedImg = $('<div/>').append($('<img/>').attr("src",whatcd_url_base+"/static/styles/postmod/images/snatched.png"));
            snatchedImg.css('width',td1W);
            var seedersImg = $('<div/>').append($('<img/>').attr("src",whatcd_url_base+"/static/styles/postmod/images/seeders.png"));
            seedersImg.css('width',td2W);
            var leechersImg = $('<div/>').append($('<img/>').attr("src",whatcd_url_base+"/static/styles/postmod/images/leechers.png"));
            leechersImg.css('width',td3W);
            var headerDiv = $('<div/>').append(leechersImg).append(seedersImg).append(snatchedImg).addClass('header_icons');
            // insert img in tr following release row
            headerDiv.appendTo($(this).next().find('td'));

            // Grab relative table rows
            var refRow = $(this);
            var i = 0;
            while (refRow.next().hasClass('group_torrent')){
                refRow = refRow.next();
                i++;
            }
            var relRows = $(this).nextAll().slice(0,i);
     
            // Hide rel Rows and set toggle event
            relRows.hide();
            $(this).click(function(){
                relRows.toggle();

                // Test Filter
                //var trs = $('.torrent_table tr').not(albumsRows);
                var trs = $('.torrent_table tr').not('.edition').not('.group.discog');
                //var trsSub = trs.not(editions);
                var filter = '[source="vinyl"][bitrate="24bit"]';
                var testCustomAttr = trs.not(filter);
            //testCustomAttr.hide();
            });

            // Check for release type and set customs attributes
            //  release editions
            var editions = relRows.find('.edition_info').parent();
            editions.each(function(){
                $(this).addClass('edition');
                $(this).removeClass('discog');
                var edRow = $(this);
                var j = 0;
                while (!edRow.next().find('td:first').hasClass('edition_info') && edRow.next().hasClass('group_torrent')){
                    edRow = edRow.next();
                    j++;
                }
                // edition torrents rows
                var editionRows = $(this).nextAll().slice(0,j);
                
                // set custom attributes
                editionRows.each(function(){
                    var text = $(this).find('td > a').text();
                    
                    // support
                    var isCdRow = false;
                    var isVinylRow = false;
                    var isWebRow = false;
                    var isSoundboardRow = false;

                    if (/CD/.test(text)) {
                        isCdRow = true;
                        $(this).attr('source','cd');
                    } else if (/Vinyl/.test(text)) {
                        isVinylRow = true;
                        $(this).attr('source','vinyl');
                    } else if (/WEB/.test(text)) {
                        isWebRow = true;
                        $(this).attr('source','web');
                    } else if (/Soundboard/.test(text)) {
                        isSoundboardRow = true;
                        $(this).attr('source','soundboard');
                    }

                    // codec
                    if (/MP3/.test(text)) {
                        $(this).attr('codec','MP3');
                        if (/320/.test(text)) $(this).attr('bitrate','320');
                        if (/V0/.test(text)) $(this).attr('bitrate','V0');
                        if (/V2/.test(text)) $(this).attr('bitrate','V2');
                    } else if (/FLAC/.test(text)) {
                        $(this).attr('codec','FLAC');
                        if(isCdRow){
                            if (/Log/.test(text)){
                                var perc = text.match(/(\d+)%/);
                                if (perc){
                                    $(this).attr('log',perc[1]);
                                }else{
                                    $(this).attr('log','unknown');
                                }
                            }
                            if (/Cue/.test(text)){
                                $(this).attr('cue','cue');
                            }
                        } else if(isVinylRow){
                            if (/FLAC \/ 24bit/.test(text)) $(this).attr('bitrate','24bit');
                        }
                    } else if (/Ogg/.test(text)) {
                        $(this).attr('codec','Ogg');
                    }

                });
          
            });
            
            
        });
    }

   

    /////// Start of Fixes

    function fixBrokenToggleLinks(){
        var toggleLinks = $("#discog_table a:contains('View')");
        $.each(toggleLinks, function(){
            var correspondingReleases = $(this).parent().parent().nextAll();
            $(this).click(function(){
                correspondingReleases.toggleClass('hidden');
                return false;
            });
        });
    }

    function fixCollector(){
        //ZIP downloader stuff
        function add_selection() {
            var selected = $('#formats')[0].options[$('#formats')[0].selectedIndex];
            if (selected.disabled === false) {
                var listitem = document.createElement("li");
                listitem.id = 'list' + selected.value;
                listitem.innerHTML = ' <input type="hidden" name="list[]" value="'+selected.value+'" /> ' +
                ' <span style="float:left;">'+selected.innerHTML+'</span>' +
                ' <a href="#" onclick="remove_selection(\''+selected.value+'\');return false;" style="float:right;">[X]</a>' +
                ' <br style="clear:all;" />';
                $('#list')[0].appendChild(listitem);
                $('#opt' + selected.value)[0].disabled = true;
            }
        }

        function remove_selection(index) {
            $('#list' + index).remove();
            $('#opt' + index)[0].disabled='';
        }

        $('#formats').parent().find('button').click(function(){
            add_selection();
        });

        formatsListItems = $('#list').find('li');
        $.each(formatsListItems,function(){
            var index= $(this).find('input').attr('value');
            var link = $(this).find('a');
            link.bind("click",function(e){
                e.preventDefault();
                remove_selection(index);
                return false;
            });
        });
    }

    /////// End of Fixes

    //Lightbox stuff
    var lightbox = {
        init: function (image, size) {
            if (image.naturalWidth === undefined) {
                tmp = document.createElement('img');
                tmp.style.visibility = 'hidden';
                tmp.src = image.src;
                image.naturalWidth = tmp.width;
                tmp.parentNode.removeChild(tmp); //unset()
            }
            if (image.naturalWidth > size) {
                lightbox.box(image);
            }
        },
        box: function (image) {
            $('#lightbox').show().click(lightbox.unbox).innerHTML = '<img src="' + image.src + '" />';
            $('#curtain').show().click(lightbox.unbox);
        },
        unbox: function (data) {
            $('#curtain').hide();
            $('#lightbox').hide().innerHTML = '';
        }
    };

   
    var test = function(artist){
        var myArtist = artist
        console.debug('test callback : ', myArtist);
    }
    var testa = function(release){
        var myrelease = release
        console.debug('test2 callback : ', myrelease);
    }

    var WhatUiWrapper = function(){

        this.sidebar = function(){
            var sidebar = {
                wrapper : function(){
                    this.wrapper = $('.sidebar');
                    return this.wrapper;
                }(),
                widgets : function(){
                    var widgets = [];
                    var widgetsDivs = this.wrapper.find('.box');
                    //console.debug('widgets' ,widgetsDivs);
                    widgetsDivs.each(function(index){

                        var type = $(this).find('.head strong').text();
                        widgets[type] = $(this).find('.head').next();

                    });
                    //this.widgets = widgetsDivs;
                    return widgets;
                }()
            };
            this.sidebar = sidebar;
            return this.sidebar;
        }();

        this.userInfo = function(){
            var info = {};
            var infoDiv = $('#userinfo');
            info.div = infoDiv;
            info.username = $('#userinfo_username');
            info.major = $('#userinfo_major');
            info.stats = $('#userinfo_stats');
            info.minor = $('#userinfo_minor');
            return info;
        }

        this.artistReleases = function(){
            var JQtables = $('#discog_table table.torrent_table');
            var tables= [];
            JQtables.each(function(){
                var type = $(this).attr('id').match(/[a-z]+$/)[0];
                var that = $(this);
                tables[type] = {
                    table: function(){
                        this.table = that;
                        return this.table
                    }(),
                    headers : function(){
                        this.headers = this.table.find('tr:first');
                        return this.headers;
                    }(),
                    releases: function(){
                        var releases = [];
                        var tableReleases =  this.table.find('.group.discog');
                        tableReleases.each(function(index){
                            var that = $(this);
                            releases[index] = {
                                row : function(){
                                    this.row = that;
                                    return this.row;
                                }(),
                                dependantRows : function(){
                                    var refRow = this.row;
                                    var i = 0;
                                    while (refRow.next().hasClass('group_torrent')){
                                        refRow = refRow.next();
                                        i++;
                                    }
                                    var relRows = this.row.nextAll().slice(0,i);
                                    this.dependantRows = relRows;
                                    return this.dependantRows;
                                }(),
                                editions : function(){
                                    var editions = []
                                    var editionsRows = this.dependantRows.find('.edition_info').parent();
                                    editionsRows.each(function(index){
                                        var that = $(this);
                                        editions[index] = {
                                            row: function(){
                                                this.row = that;
                                                return this.row;
                                            }(),
                                            dependantRows : function(){
                                                var refRow = this.row;
                                                var j = 0;
                                                while (!refRow.next().find('td:first').hasClass('edition_info') && refRow.next().hasClass('group_torrent')){
                                                    refRow = refRow.next();
                                                    j++;
                                                }
                                                var relRows = this.row.nextAll().slice(0,j);
                                                this.dependantRows = relRows;
                                                return this.dependantRows;
                                            }()
                                        }
                                    })
                                    this.editions = editions;
                                    return this.editions;
                                }()
                            }
                        })
                        this.releases = releases;
                        return this.releases;
                    }()

                };
            })
            this.tables = tables;
            return this.tables;
        }();

        this.artistInfo = function(){
            var infoBox = $("#content div.main_column div.box:contains('info'):last");
            var aInfo = {};
            aInfo.widget = infoBox;
            aInfo.content = infoBox.children('div.body:first');
            this.artistInfo = aInfo;
            return this.artistInfo;
        }();

        this.similarArtistMap = function(){
            var simABox = $("#content div.main_column div.box:contains('artist map')");
            var aSimMap = {};
            aSimMap.widget = simABox;
            aSimMap.content = simABox.children('div:last');
            return aSimMap;
        }();
    }


    var WhatDataWrapper = function(){
        var uiHelper = new WhatUiWrapper();
        this.baseUrl = function() {
            var url = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];
            this.baseUrl = url;
            return this.baseUrl;
        }();

        this.pageType = function(){

            var pageType = null;
            if ($("#discog_table").length > 0){
                pageType = 'artist';
            }else if ($("#content div.thin h2 a[href^='artist.php?id=']").length > 0){
                pageType = 'audioTorrent';
            }
            this.pageType = pageType;
            return this.pageType;

        }();

        this.userInfo = function(){
            var infoUsername = uiHelper.userInfo().username;
            var editLink = infoUsername.find('li.brackets:first a').attr('href');
        };

        this.artist = {
            // name
            name: function(){
                var artistName = null;
                switch (this.pageType) {
                    case 'artist':
                        var h2 = $('#content h2:first');
                        artistName = $.trim(h2.text());
                        break;
                    case 'audioTorrent':
                        var h2a = $('#content h2:first a');
                        artistName = $.trim(h2a.text());
                        break;
                    default:
                        break;
                }
                this.name = artistName;
                return this.name;
            }(),

            info: function(){
                var info = uiHelper.artistInfo.content.html();
                this.info = info;
                return this.info;
            }(),

            similarArtists : function(){
                var simArtists = uiHelper.sidebar.widgets['Similar artists'].find('span');
                var artists = [];
                simArtists.each(function(index){
                    artists[index] = {
                        name : $(this).find('a').text(),
                        href : $(this).find('a').attr('href'),
                        weight : parseInt($(this).attr('title'))
                    }
                })
                this.similarArtists = artists;
                return this.similarArtists;
            }(),

            tags : function(){
                var aTags = uiHelper.sidebar.widgets['Tags'].find('li');
                var tags = [];
                aTags.each(function(index){
                    tags[index] = {
                        name : $(this).find('a').text(),
                        href : $(this).find('a').attr('href'),
                        weight : parseInt($(this).text().match(/\d+(?!.+\()/))
                    }
                })
                this.tags = tags;
                return this.tags;
            }(),

            statistics : function(){
                var aStats = uiHelper.sidebar.widgets['Statistics'];
                var stats = {
                    groups : parseInt(aStats.find("li:contains('groups')").text().match(/\d+/)),
                    torrents : parseInt(aStats.find("li:contains('torrents')").text().match(/\d+/)),
                    seeders : parseInt(aStats.find("li:contains('seeders')").text().match(/\d+/)),
                    leechers : parseInt(aStats.find("li:contains('leechers')").text().match(/\d+/)),
                    snatches : parseInt(aStats.find("li:contains('snatches')").text().match(/\d+/))
                };
                this.statistics = stats;
                return this.statistics;
            }(),

            releases: function(){
                var tables = uiHelper.artistReleases;
                var aReleases = [];
                for (var i in tables){
                    var relType = i;
                    var tableRel = tables[i].releases
                    for(var j in tableRel){
                        var currentRelRow = tableRel[j].row;
                        var currentRel = {};
                        currentRel.year = parseInt(currentRelRow.find('strong').text().match(/^\d{4}/)[0]);
                        currentRel.title = currentRelRow.find('strong a').text();
                        currentRel.type = relType;
                        currentRel.tags = function(){
                            var tags = [];
                            var rTags = currentRelRow.find('.tags a');
                            rTags.each(function(index){
                                tags[$(this).text()] = $(this).attr('href');
                            //                                tags[index] = {
                            //                                    name: $(this).text(),
                            //                                    href: $(this).attr('href')
                            //                                }
                            });
                            this.tags = tags;
                            return this.tags;
                        }();
                        currentRel.editions = function(){
                            var editions = [];
                            var relEds = tableRel[j].editions;
                            
                            for (var k in relEds){
                                editions[k] = {
                                    name : this.row.find('strong').text(),
                                    torrents : function(){
                                        var torrents = [];
                                        var edTorrents = relEds[k].dependantRows;
                                        // console.debug('editions torrents', edTorrents);
                                        edTorrents.each(function(index){
                                            var that = $(this);
                                            torrents[index] = function(){
                                                var torrent = {};
                                                var torrentA = that.find('td:first a:last');
                                                // console.debug(' torrents link', torrentA);
                                                torrent.href = torrentA.attr('href');
                                                var torrentText = torrentA.text();
                                                // support
                                                var isCdRow = false;
                                                var isVinylRow = false;
                                                var isWebRow = false;
                                                var isSoundboardRow = false;
                                                
                                                if (/CD/.test(torrentText)) {
                                                    isCdRow = true;
                                                    torrent.source = 'cd';
                                                } else if (/Vinyl/.test(torrentText)) {
                                                    isVinylRow = true;
                                                    torrent.source = 'vinyl';
                                                } else if (/WEB/.test(torrentText)) {
                                                    isWebRow = true;
                                                    torrent.source = 'web';
                                                } else if (/Soundboard/.test(torrentText)) {
                                                    isSoundboardRow = true;
                                                    torrent.source = 'soundboard';
                                                }
                                                
                                                // codec
                                                if (/MP3/.test(torrentText)) {
                                                    torrent.codec = 'MP3';
                                                    if (/320/.test(torrentText)) torrent.bitrate = '320';
                                                    if (/V0/.test(torrentText)) torrent.bitrate = 'V0';
                                                    if (/V2/.test(torrentText)) torrent.bitrate = 'V2';
                                                } else if (/FLAC/.test(torrentText)) {
                                                    torrent.codec = 'FLAC';
                                                    if(isCdRow){
                                                        if (/Log/.test(torrentText)){
                                                            var perc = torrentText.match(/(\d+)%/);
                                                            if (perc){
                                                                torrent.log = perc[1];
                                                            }else{
                                                                torrent.log = 'unknown';
                                                            }
                                                        }else{
                                                            torrent.log = false;
                                                        }
                                                        if (/Cue/.test(torrentText)){
                                                            torrent.cue = true;
                                                        }
                                                    } else if(isVinylRow){
                                                        if (/FLAC \/ 24bit/.test(torrentText)) torrent.bitrate = '24bit';
                                                    }
                                                } else if (/Ogg/.test(torrentText)) {
                                                    torrent.codec = 'Ogg';
                                                }

                                                var tds = that.find('td');
                                                torrent.dlLink = tds.eq(0).find('a:first').attr('href');
                                                torrent.size = tds.eq(1).text();
                                                torrent.snatches = parseInt(tds.eq(2).text());
                                                torrent.seeders = parseInt(tds.eq(3).text());
                                                torrent.leechers = parseInt(tds.eq(4).text());



                                                return torrent;
                                            }();
                                        })
                                        return torrents;
                                    }()
                                }
                            }
                            return editions;
                        }()





                        aReleases.push(currentRel);

                    }
                //aReleases[i] = tables[i].releases;
                //                    console.log('table type'  + tableType)
                //                    $.each(tableRel, function(index){
                //                        var currentRelRow = this.row;
                //                        var currentRel = {};
                //                        currentRel.year = currentRelRow.find('strong').text().match(/^\d+(?=\n-)/);
                //                        currentRel.title = currentRelRow.find('strong a').text();
                //                        currentRel.type = tableType;
                //                        releases.push(currentRel);
                //                    })

                }
   
                return aReleases;
            }
        }
        
        
    }

    var Proxy = function(delay) {
        var last_req = new Date();
        var queue = [];
        var processing = false;

        return {
            get: function(url, accept, callback) {
                var now = new Date();
                queue.push({
                    url: url,
                    accept: accept,
                    callback: callback
                });
                if (!processing) {
                    processing = true;
                    var diff = last_req.getTime() + delay - now.getTime();
                    if (diff > 0) {
                        var that = this;
                        window.setTimeout(function() {
                            that.process_queue();
                        }, diff);
                    } else {
                        this.process_queue();
                    }
                }
            },

            process_queue: function() {
                var req = queue.shift();
                this.do_request(req.url, req.accept, req.callback);
                processing = (queue.length > 0);
                if (processing) {
                    var that = this;
                    window.setTimeout(function() {
                        that.process_queue();
                    }, delay);
                }
            },

            do_request: function(url, accept, callback) {
                last_req = new Date();
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    headers: {
                        'User-Agent': navigator.userAgent,
                        'Accept': accept
                    },
                    onload: callback
                });
            }
        };
    }



    var DiscogsApiWrapper = function(apiKey){

        this.apiKey = apiKey;

        this.getArtist = function(artistName, callback){
            artistName = encodeURIComponent(artistName);
            var artistDataUrl = "http://www.discogs.com/artist/" + artistName + "?f=xml&api_key=" + this.apiKey;
            console.debug('artist Url ', artistDataUrl);
            GM_xmlhttpRequest({
                method: "GET",
                url: artistDataUrl,
                headers:{
                    "Accept-Encoding": "gzip"
                },
                onload: function(rsp) {
                    if(rsp.status == 200 && rsp.readyState == 4){
                        var data = rsp.responseText;
                        /////// Build artist object
                        var artist = {};
                        // name
                        artist.name = $(data).find("name:first").text();
                        // realname
                        artist.realname = $(data).find("realname").text();
                        // name variations
                        artist.anvs = [];
                        var artist_anvs = $(data).find("namevariations name");
                        artist_anvs.each(function(index){
                            var anv = this.textContent.replace(/\n$/,'');
                            if (anv != '') {
                                artist.anvs[index] = anv;
                            }
                        });
                        // aliases
                        artist.aliases = [];
                        var artist_aliases = $(data).find("aliases name");
                        artist_aliases.each(function(index){
                            var alias = this.textContent.replace(/\n$/,'');
                            if (alias != '') {
                                artist.aliases[index] = alias;
                            }
                        });
                        // urls
                        artist.urls = [];
                        var artist_urls = $(data).find("url");
                        artist_urls.each(function(index){
                            var url = this.textContent.replace(/\n$/,'');
                            if (url != '') {
                                artist.urls[index] = url;
                            }
                        });
                        // releases
                        artist.releases = [];
                        var releases = $(data).find("release");
                        $.each(releases, function(index){
                            var labels = $(this).find('label').html();
                            var splitLabels = labels.split(', ');
                            artist.releases[index] = {
                                type: $(this).attr('type'),
                                discogsId: $(this).attr('id'),
                                title: $(this).find('title').html(),
                                format: $(this).find('format').html(),
                                labels: splitLabels,
                                year:  $(this).find('year').html()
                            }
                        });
                        callback(artist);

                    }
                }
            });
        }

        this.getRelease = function(releaseId, callback){
            var releaseDataUrl = "http://www.discogs.com/release/" + releaseId + "?f=xml&api_key=" + this.apiKey;
            console.debug('release Url ', releaseDataUrl);
            GM_xmlhttpRequest({
                method: "GET",
                url: releaseDataUrl,
                headers:{
                    "Accept-Encoding": "gzip"
                },
                onload: function(rsp) {
                    if(rsp.status == 200 && rsp.readyState == 4){
                        var data = rsp.responseText;
                        ///  Build release object
                        var release = {};
                        // title
                        release.title = $(data).find('title:first').text();
                        // artists
                        release.artists = [];
                        var artists = $(data).find('artists:first').find('artist');
                        artists.each(function(index){
                            release.artists[index] = {
                                name : $(this).find('name').text(),
                                join : $(this).find('join').text(),
                                anv: $(this).find('anv').text()
                            };
                        });
                        // labels
                        release.labels = [];
                        var labels = $(data).find('label'); //  attr : catno, name
                        labels.each(function(index){
                            release.labels[index] = {
                                catno : $(this).attr('catno'),
                                name : $(this).attr('name')
                            }
                        });
                        // country
                        release.country = $(data).find('country').text();
                        // release date
                        release.releaseDate = $(data).find('released').text();
                        // tracks
                        release.tracks = []
                        var tracks = $(data).find("track");
                        tracks.each(function(index){
                            var trackArtists = $(this).find('artists artist');
                            var artistsArray = [];
                            trackArtists.each(function(i){
                                artists[i] = $(this).text();
                            });
                            var extraArtistsArray = [];
                            var trackExtraArtists =$(this).find('extraartists artist');
                            trackExtraArtists.each(function(j){
                                extraArtistsArray[j] = {
                                    name: $(this).find('name').text(),
                                    role: $(this).find('role').text()
                                }
                            })
                            release.tracks[index] = {
                                position: $(this).find('position').text(),
                                title:$(this).find('title').text(),
                                duration:$(this).find('duration').text(),
                                artists: artistsArray,
                                extraArtists: extraArtistsArray
                            }
                        });
                        // credits
                        release.credits = []
                        var extraArtists = $(data).find('release > extraartists').find('artist');
                        extraArtists.each(function(index){
                            release.credits[index] = {
                                name: $(this).find('name').text(),
                                role: $(this).find('role').text(),
                                tracks: $(this).find('tracks').text()
                            }
                        });
                        //notes
                        var notes = $(data).find('notes');
                        release.notes = unescapeHTML(notes.html());
                        // formats
                        release.formats = []
                        var formats = $(data).find('format'); // attr : name, qty  / children: description
                        formats.each(function(index){
                            var descrArray = []
                            var formatDescr = $(this).find('description');
                            formatDescr.each(function(j){
                                descrArray[j] = $(this).text()
                            })
                            release.formats[index] = {
                                support: $(this).attr('name'),
                                quantity: $(this).attr('qty'),
                                descriptions: descrArray
                            }
                        });
                        // genres
                        release.genres = []
                        var genres = $(data).find('genre');
                        genres.each(function(index){
                            release.genres[index] = $(this).text();
                        });
                        //  styles
                        release.styles = []
                        var styles = $(data).find('style');
                        styles.each(function(index){
                            release.styles[index] = $(this).text();
                        });

                        //////// callback
                        callback(release);
                    }
                }
            });
        }

        this.getLabel =  function(labelName, callback){
            labelName = labelName.replace(/\s+/gi,"+");
            var labelDataUrl = "http://www.discogs.com/label/" + labelName + "?f=xml&api_key=" + this.apiKey;
            console.debug('label requestUrl ', labelDataUrl);
            GM_xmlhttpRequest({
                method: "GET",
                url: labelDataUrl,
                headers:{
                    "Accept-Encoding": "gzip"
                },
                onload: function(rsp) {
                    if(rsp.status == 200 && rsp.readyState == 4){
                        var data = rsp.responseText;
                        ///  Build release object
                        var label = {};
                        // name
                        label.name = $(data).find("name:first").text();
                        // contact ino
                        label.name = $(data).find("contactinfo").text();
                        // profile
                        label.profile = $(data).find("profile").text();
                        // urls
                        var urls = $(data).find("url");
                        // urls
                        label.urls = [];
                        var label_urls = $(data).find("url");
                        label_urls.each(function(index){
                            var url = this.textContent.replace(/\n$/,'');
                            if (url != '') {
                                label.urls[index] = url;
                            }
                        });
                        // sublabels
                        label.sublabels = [];
                        var label_sublabels = $(data).find("sublabels").find("label");
                        label_sublabels.each(function(index){
                            label.sublabels[index] = $(this).text();
                        });
                        // parent label
                        label.parentlabel = $(data).find("parentLabel").text();
                        // label releases
                        label.releases = [];
                        var label_releases = $(data).find("release");
                        label_releases.each(function(index){
                            label.releases[index] = {
                                discogsId : $(this).attr('id'),
                                catno : $(this).find('catno').text(),
                                artist : $(this).find('artist').text(),
                                title : $(this).find('title').text(),
                                format : $(this).find('format').text()
                            }
                        });
                        callback(label);
                    }
                }
            });


        }

        this.search = function(searchTerm){

        }

    };

    var WhatMore = function(options){
        this.options = {
            uiTweaks: {
                releaseTables : {
                    tabs : true,
                    covers:{
                        show: true,
                        size: 90
                    },
                    collapse: true
                },
                whatWidth : 'default',
                sidebar: {
                    width: '25%',
                    side: 'left',
                    accordion : true
                },
                simArtMapTooltip : false ,
                groupInfoDivs : true
            },
            externalData : {
                discogs: {
                    show: true,
                    apiKey: null
                },
                mySpacePlayer: false,
                lastFm: {
                    bio : true
                }
            }
        };

        

        
        
        

        function showCovers(){
            // Grab Albums rows
            var albumsRows = $('.torrent_table .group.discog');
            // GROSS HACK : Bullshit request to ensure the first GM_xmlhttpRequest for album cover
            //              is executed outside the scope of jQuery.each
            whatcd_proxy.get('http://www.a.com','text/xml',function(){});
            albumsRows.each(function(){
                //// Grab Release cover
                var albumLink = $(this).find('strong a');
                var albumHref = albumLink.attr('href');
                var albumTitle = albumLink.text();
                albumHref = this.baseUrl +'/' +albumHref;
                var td = $(this).find('td');
                var cover_image = $('<img/>').attr('alt', 'Album Cover').attr('src', this.baseUrl+'/static/common/noartwork/music.png').css('width', coverSize + 'px');
                //cover_image.prependTo(td).wrap('<div></div>');
                cover_image.prependTo(td).css({
                    'float':'left',
                    'margin-right':'5px'
                });
                // Queue Request cover image
                whatcd_proxy.get(albumHref, 'text/xml',
                    function(rsp) {
                        if(rsp.status == 200 && rsp.readyState == 4){
                            var albumCoverSrc = $(rsp.responseText).find("#content div.sidebar div.box_albumart > p img").eq(0).attr('src');
                            if (albumCoverSrc) {
                                cover_image.attr('src', albumCoverSrc);
                            }
                        }
                    }
                    );
            });
        }

        function getUserOptions(){
            console.log('user options setup');
        }
    //getUserOptions();
    }

      function similarMap(){
            var what = new WhatDataWrapper();
            
            var simArtists = what.artist.similarArtists;
            var artistsNumber = simArtists.length;
            console.debug(' #espected nodes : ', artistsNumber);
            var nodes = [];
            getSimilarArtistsData();
            Request_wait();

            function getSimilarArtistsData(){

                var what_proxy = new Proxy(200);
                
                for (var k in simArtists){
                    var href = what.baseUrl + '/' + simArtists[k].href;
                    //console.debug('href : ', href);
                    what_proxy.get(href, 'text/xml', function(rsp){
                        var data = rsp.responseText;
                        var artists = [];
                        var h2 = $(data).find('#content h2:first');
                        var name = $.trim(h2.text());
                        //console.debug('name : ', name);
                        var artistSimArtists = $(data).find('.sidebar .box .head strong:contains("Similar artists")').parent().next().find('span');
                        artistSimArtists.each(function(index){
                            artists[index] = {
                                name : $(this).find('a').text(),
                                href : $(this).find('a').attr('href'),
                                weight : parseInt($(this).attr('title'))
                            }
                        });
                        var node = {
                            name : name,
                            similarArtists : artists
                        };
                        //console.debug('node : ', node);
                        nodes.push(node);
                        //console.debug('nodes : ', nodes.length);
                        //console.debug('nodes final: ', nodes);
                    });
                }
            }

            var injectMapScript = function(mapData){
                console.debug('map data final: ', mapData);
                var SimMapVis = document.createElement('script');
                SimMapVis.type = 'text/javascript';//+protovis';
                SimMapVis.id = 'mapVis';
                var mapDataStr = mapData.toString();
                console.log('map data final string: '+ mapDataStr);
                var scriptText ='alert("test execution");'//+
//                                'var vis = new pv.Panel()'+
//                                '.width(window.innerWidth)'+
//                                '.height(window.innerHeight)'+
//                                '.fillStyle("white")'+
//                                '.event("mousedown", pv.Behavior.pan())'+
//                                '.event("mousewheel", pv.Behavior.zoom());'+
//                                'vis.add(pv.Layout.Force)'+
//                                '.nodes(mapData.nodes)'+
//                                '.links(mapData.links)'+
//                                '.link.add(pv.Line)'+
//                                '.node.add(pv.Dot)'+
//                                '.event("mousedown", pv.Behavior.drag());'+
//                                'vis.render();';
                 SimMapVis.innerHTML = scriptText;
                 document.getElementById('content').appendChild(SimMapVis);
                 console.log('injected! ');
                 var map = $('#mapVis');


            }

            function buildMap(callback){


                var mapNodes = [];
                var mapLinks = [];
                var mainNode = what.artist.name;
                var mainIndex = mapNodes.push(mainNode)  -1;
                for (var i in nodes){
                    var newSimIndex = true
                    console.debug('mainSim node index: ', i);
                    var mainSimName = String(nodes[i].name);
                    //                mapNodes[iname] = {
                    //                    name : iname,
                    //                    degree : 'first'
                    //                };
                    var mainSimNode = mainSimName;
                    var mainSimIndex = mapNodes.indexOf(mainSimName);
                    if (mainSimIndex == -1){
                        mainSimIndex = mapNodes.push(mainSimNode)  -1;
                        newSimIndex = false;
                    }

//                    console.debug('mainSim node map index: ', mainSimIndex);
//                    console.debug('mainSim node map index test: ', mapNodes.indexOf('Cougar'));
//                    console.debug('mainSim node map index test: ', mapNodes.indexOf('Tristeza'));
//                    console.debug('map Nodes: ', mapNodes);
                    var link = {
                        sourceNode: mainIndex,
                        targetNode: mainSimIndex
                    }
                    mapLinks.push(link)
                    //console.debug('name node: ', mainSimName);
                    var simArtists = nodes[i].similarArtists;
                    var testArray = mapNodes;
                    //console.debug('test nodes: [' + testArray.length + '] ', testArray);
                    //console.debug('simArtists: ', simArtists);
                    for (var k in simArtists){
                        var kname = String(simArtists[k].name);
                        var simNode = kname;
                        var simIndex = mapNodes.indexOf(kname);
                        if( simIndex == -1){
                            var index = mapNodes.push(kname) -1;
                            var kLink = {
                                sourceNode: mainSimIndex,
                                targetNode: index
                            }
                            mapLinks.push(kLink);
                        }else if(newSimIndex){
                            var kLink = {
                                sourceNode: mainSimIndex,
                                targetNode: simIndex
                            }
                            //console.debug('klink: ', kLink);
                            mapLinks.push(kLink);
                        }

                    //    console.debug('map nodes: [' + mapNodes.length + '] ', mapNodes);
                    }
                }
                var mapData = {
                    nodes : mapNodes,
                    links : mapLinks
                }
                console.debug('map data build map: ', mapData);
                callback(mapData);
//                console.debug('map nodes final: ', mapNodes);
//                console.debug('map nodes final: ', mapNodes[1]);
//                console.debug('map links final: ', mapLinks);
            }


            function Request_wait() {
                if(nodes.length < artistsNumber) {
                    //console.debug('nodes test: ', nodes.length);
                    window.setTimeout(Request_wait,1000);
                } else {
                    buildMap(injectMapScript);
                }
            }

            




        }

    function main(){
        injectCSS();
        console.log('start');
        var artistName = findArtist();
        var discogs = new DiscogsApiWrapper(DISCOGS_API_KEY);
        console.log('test discogs');
        var myWhat = new WhatMore();
        console.log('test more');
        var whatUi = new WhatUiWrapper();
        console.log('test ui');
        var what = new WhatDataWrapper();
        console.log('test data');
        //console.debug('test my what : ' , what.artist.similarArtists);
        console.log('pageType : ' + what.pageType);
        //console.debug('artist rel : ' , what.artist.releases());
        //console.debug('artist releases: ' , whatUi.artistReleases);
        //console.debug('artist sidebar: ' , whatUi.sidebar);
        //console.debug('artist map: ' , whatUi.similarArtistMap);
        //console.debug('artist sim artists: ' , what.artist.similarArtists);
        similarMap();
        

      

        
       
        
    // discogs.getRelease('146599', testa);
    // discogs.getArtist(artistName, test);

    // fixBrokenToggleLinks();
    //        fixCollector();
    //        formatSidebar();
    //
    //        if (isAudioRelease()) {
    //            console.log('audio release');
    //            hook();
    //            console.log('finished hook');
    //            if (/what\.cd\/artist\.php\?id=/.test(document.URL)) {
    //                formatReleaseTables();
    //            }
    //            console.log('test');
    //
    //            showArtistInfoOnMap();
    //
    //            var artistName = findArtist();
    //            artistName = sanitizeStringForRequest(artistName);
    //            if(lastFmBioShow) {
    //                getLastFmBio(artistName);
    //            }
    //            if(mSpacePlayerShow) {
    //                getMySpacePlayer(artistName);
    //            }
    //            if(discogsApiKey != '' && discogsShow) {
    //                console.log('discogs start');
    //                getDiscogsArtistData(artistName);
    //            }
    //        }
    }
    main();
}