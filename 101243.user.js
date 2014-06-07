// ==UserScript==
// @name           Video Download Link (DC)
// @namespace      http://services.sample.me.uk/greasemonkey/vid_download_dc
// @match          http://www.deviantclip.com/Media*
// @include        http://www.deviantclip.com/Media*
// ==/UserScript==
//function addDownloadLink() {

	decode = function (string) {
			return utf8_decode(unescape(string));
	};

	utf8_decode = function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;

			while ( i < utftext.length ) {

				c = utftext.charCodeAt(i);

				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}

			}

			return string;
		};

    var test = document.body.innerHTML;
    var regex = new RegExp("\"file\":\"(http[a-zA-Z0-9%:./+_-]*)\"","igm");
    var res = regex.exec(test);
    var vidurl = "";
    if (res.length > 0) {
        vidurl = decode(res[1]);
    } else {
        //<PARAM NAME="FileName" VALUE="http://ads.tsseduction.com/imagedb/6018/v/h/320/hires/6018_7.wmv">
        regex = new RegExp("param name=\"filename\" value=\"(http://[a-zA-Z0-9./+_-]*\.[wmv])\"","igm");
        res = regex.exec(test);
        if (res.length > 0) {
            vidurl = res[1];
        }
    }
    if (vidurl != "") {
        Array.filter( document.getElementsByClassName('toolbar'), function(elem) {
            elem.innerHTML = '<a href="' + vidurl + '">Download</a>';
        });
    }
//}
//GM_registerMenuCommand("Add Download Link", addDownloadLink, undefined, undefined, "A");
//addDownloadLink();
//javascript:test=document.body.innerHTML;regex=new RegExp("file=(http://[a-zA-Z0-9./+_-]*\.mp4)","igm");res=regex.exec(test);vidurl=res[1];document.getElementById('watch').innerHTML='<a href="'+vidurl+'">Download</a>';