// ==UserScript==
// @name            TWCrop
// @description     Przycina białą ramkę miniaturki w znaleziskach na wykop.pl
// @version         20130713150751
// @author          opsomh
// @namespace       http://userscripts.org/users/465520/scripts
// @downloadURL     http://userscripts.org/scripts/source/133134.user.js
// @updateURL       http://userscripts.org/scripts/source/133134.meta.js
// @grant           none
// @include         http://www.wykop.pl/link/*
// ==/UserScript==

(function(){
"use strict";
var main = function (){
/*
 *
 *  jQuery $.getImageData Plugin 0.3
 *  http://www.maxnov.com/getimagedata
 *
 *  Written by Max Novakovic (http://www.maxnov.com/)
 *  Date: Thu Jan 13 2011
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *  Includes jQuery JSONP Core Plugin 2.1.4
 *  http://code.google.com/p/jquery-jsonp/
 *  Copyright 2010, Julian Aubourg
 *  Released under the MIT License.
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *  Copyright 2011, Max Novakovic
 *  Dual licensed under the MIT or GPL Version 2 licenses.
 *  http://www.maxnov.com/getimagedata/#license
 *
 */
(function(e,b){function m(){}function r(a){s=[a]}function c(a,b,e){return a&&a.apply(b.context||b,e)}function k(a){function k(g){!l++&&b(function(){n();h&&(u[d]={s:[g]});y&&(g=y.apply(a,[g]));c(a.success,a,[g,z]);c(A,a,[a,z])},0)}function t(g){!l++&&b(function(){n();h&&g!=B&&(u[d]=g);c(a.error,a,[a,g]);c(A,a,[a,g])},0)}a=e.extend({},C,a);var A=a.complete,y=a.dataFilter,D=a.callbackParameter,E=a.callback,O=a.cache,h=a.pageCache,F=a.charset,d=a.url,f=a.data,G=a.timeout,p,l=0,n=m;a.abort=function(){!l++&&
n()};if(!1===c(a.beforeSend,a,[a])||l)return a;d=d||v;f=f?"string"==typeof f?f:e.param(f,a.traditional):v;d+=f?(/\?/.test(d)?"&":"?")+f:v;D&&(d+=(/\?/.test(d)?"&":"?")+encodeURIComponent(D)+"=?");!O&&!h&&(d+=(/\?/.test(d)?"&":"?")+"_"+(new Date).getTime()+"=");d=d.replace(/=\?(&|$)/,"="+E+"$1");h&&(p=u[d])?p.s?k(p.s[0]):t(p):b(function(a,c,f){if(!l){f=0<G&&b(function(){t(B)},G);n=function(){f&&clearTimeout(f);a[H]=a[w]=a[I]=a[x]=null;j[J](a);c&&j[J](c)};window[E]=r;a=e(K)[0];a.id=L+P++;F&&(a[Q]=F);
var h=function(b){(a[w]||m)();b=s;s=void 0;b?k(b[0]):t(M)};N.msie?(a.event=w,a.htmlFor=a.id,a[H]=function(){/loaded|complete/.test(a.readyState)&&h()}):(a[x]=a[I]=h,N.opera?(c=e(K)[0]).text="jQuery('#"+a.id+"')[0]."+x+"()":a[q]=q);a.src=d;j.insertBefore(a,j.firstChild);c&&j.insertBefore(c,j.firstChild)}},0);return a}var q="async",Q="charset",v="",M="error",L="_jqjsp",w="onclick",x="on"+M,I="onload",H="onreadystatechange",J="removeChild",K="<script/>",z="success",B="timeout",N=e.browser,j=e("head")[0]||
document.documentElement,u={},P=0,s,C={callback:L,url:location.href};k.setup=function(a){e.extend(C,a)};e.jsonp=k})(jQuery,setTimeout);
(function(e){e.getImageData=function(b){var m=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;if(b.url){var r="https:"===location.protocol,c="",c=b.server&&m.test(b.server)&&!(r&&0==b.server.indexOf("http:"))?b.server:"//img-to-json.appspot.com/";e.jsonp({url:c+"?callback=?",data:{url:escape(b.url)},dataType:"jsonp",timeout:1E4,success:function(c){var q=new Image;e(q).load(function(){this.width=c.width;this.height=c.height;typeof b.success==typeof Function&&b.success(this)}).attr("src",
c.data)},error:function(c,e){typeof b.error==typeof Function&&b.error(c,e)}})}else typeof b.error==typeof Function&&b.error(null,"no_url")}})(jQuery);
/*****************************************************************/
    var fitIn = function (image){
        var c, ct,
            imgData, imgDataOut,
            data, dataout,
            r, g, b,
            offp, off, offn,
            x, y,
            width = image.width,
            height = image.height,
            cropx, cropy, newsize,
            left = width,
            top = height,
            right = 0,
            bottom = 0;

        //init
        c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        ct = c.getContext('2d');
        ct.drawImage(image, 0, 0);
        imgData = ct.getImageData(0, 0, width, height);
        data = imgData.data;

        //detect borders
        for (y = 0; y < height; y++){
            for (x = 0; x < width; x++){
                r = data[(width * y + x) * 4];
                g = data[(width * y + x) * 4 + 1];
                b = data[(width * y + x) * 4 + 2];
                if (r < 230 && g < 230 && b < 230){//10%
                    if (x > right){
                        right = x;
                    }
                    if (x < left){
                        left = x;
                    }
                    if (y > bottom){
                        bottom = y;
                    }
                    if (y < top){
                        top = y;
                    }
                }
            }
        }
        right++;
        bottom++;
        console.log('TWCrop log:', JSON.stringify({'left': left, 'top': top, 'right': right, 'bottom': bottom}));

        //crop and resize
        cropx = left + width - right;
        cropy = top + height - bottom;

        if(0 === cropx || 0 === cropy){
            console.log('TWCrop log: return without cropping');
            return c.toDataURL();
        }

        ct.clearRect(0, 0, width, height);
        if(cropx > cropy){
            //l-r
            newsize = (height / (height - cropy)) * (width - cropx);
            ct.drawImage(image, left, top, right - left, bottom - top,
                        (width - newsize) / 2, 0, newsize, height);
        } else {
            //t-b
            newsize = (width / (width - cropx)) * (height - cropy);
            ct.drawImage(image, left, top, right - left, bottom - top,
                        0, (height - newsize) / 2, width, newsize);
        }

        //sharpen
        imgData = ct.getImageData(0, 0, width, height);
        data = imgData.data;

        imgDataOut = ct.createImageData(width, height);
        dataout = imgDataOut.data;

        for(y = 0; y < height; y++){
            for(x = 0; x < width; x++){
                off = y * width * 4 + x * 4;
                offp = off - 4;
                offn = off + 4;
                if(x === 0 || x === width-1){
                    dataout[off] = data[off];
                    dataout[off+1] = data[off+1];
                    dataout[off+2] = data[off+2];
                    dataout[off+3] = data[off+3];
                    continue;
                }
                dataout[off]   = data[offp]   * -.5 + data[off]   * 2 + data[offn]  * -.5;
                dataout[off+1] = data[offp+1] * -.5 + data[off+1] * 2 +data[offn+1] * -.5;
                dataout[off+2] = data[offp+2] * -.5 + data[off+2] * 2 +data[offn+2] * -.5;
                dataout[off+3] = data[offp+3] * -.5 + data[off+3] * 2 +data[offn+3] * -.5;
            }
        }

        ct.putImageData(imgDataOut, 0, 0);
        return c.toDataURL();
    };

    var img = document.querySelector('a.imagexbig>img');//300x223
    if(!img) return;

    jQuery.jsonp.setup({cache: true});
    jQuery.getImageData({
        url: img.src,
        server: 'http://opsomh.tk/TWCrop/getImageData.php',
        success: function(image){
            img.src = fitIn(image);
        },
        error: function(xhr, text_status){
            console.log('TWCrop error:', JSON.stringify({'text_status': text_status, 'xhr': xhr}));
        }
    });
}

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
})();
