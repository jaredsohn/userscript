// ==UserScript==
// @name           Down Dou's Music
// @author         chenze - surfchen.org
// @namespace      http://www.liulanqi.org/Firefox/DownDouMusic
// @include        http://www.douban.com/artist/*
// ==/UserScript==
//


/*
 *
 * base64解码来自: http://www.webtoolkit.info/javascript-base64.html
 *
 * */


function downDouMusic() {
    var Base64 = {

        // private property
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

          // public method for decoding
          decode : function (input) {
              var output = "";
              var chr1, chr2, chr3;
              var enc1, enc2, enc3, enc4;
              var i = 0;

              input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

              while (i < input.length) {

                  enc1 = this._keyStr.indexOf(input.charAt(i++));
                  enc2 = this._keyStr.indexOf(input.charAt(i++));
                  enc3 = this._keyStr.indexOf(input.charAt(i++));
                  enc4 = this._keyStr.indexOf(input.charAt(i++));

                  chr1 = (enc1 << 2) | (enc2 >> 4);
                  chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                  chr3 = ((enc3 & 3) << 6) | enc4;

                  output = output + String.fromCharCode(chr1);

                  if (enc3 != 64) {
                      output = output + String.fromCharCode(chr2);
                  }
                  if (enc4 != 64) {
                      output = output + String.fromCharCode(chr3);
                  }

              }

              output = Base64._utf8_decode(output);

              return output;

          },

          // private method for UTF-8 decoding
_utf8_decode : function (utftext) {
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
               }

    }

    var sdata;
    sdata=window.sdata;
    if ((typeof sdata)=='undefined') {
        var w;
        if ((typeof unsafeWindow)!='undefined') {
            w=unsafeWindow;
        } else if ((typeof window)!='undefined') {
            w=window;
        } else {
            return;
        }
        if ((typeof w.sdata)=='undefined') {
            return
        }
        sdata=w.sdata;
    }

    var songlist_e=document.getElementById('songlist');
    if (!songlist_e) {
        return;
    }
    
    var count;

    var tds=songlist_e.getElementsByTagName('td');
    count=tds.length;
    for (var i=0;i<count;++i) {
        if (tds.item(i).className=='j a_down_title') {
            tds.item(i).style.visibility='visible';//把"下载"两个字显示出来
            break;
        }
    }

    count=sdata.length;
    var tre;
    var td;
    for (var i=0;i<count;++i) {
        tre=document.getElementById('tr'+i); 
        td=tre.getElementsByTagName('td').item(1);
        if (td.getElementsByTagName('a').length<=0) {//如果下载链接不存在，则添加链接
            td.innerHTML='<a href="'+Base64.decode(sdata[i]['url'])+'" title="下载 '+decodeURIComponent(sdata[i]['title'])+'"><img src="http://t.douban.com/pics/download.gif" class="down_mp3"/></a';
        }
    }
}
//downDouMusic();
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ downDouMusic +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
