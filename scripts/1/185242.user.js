// ==UserScript==
// @name         Portable MD5 Lib.
// @namespace    http://jixun.org/
// @version      0.1
// @description  自己用的库, 动态调用。
// @copyright    2013+, Jixun.Moe


// Note: Please don't install this script to your browser.
// 注意: 请不要安装该脚本
// Dev: Refer this script using HTTPS portal.
// 开发者: 包含该脚本请使用 HTTPS 连接.


// ==/UserScript==



// MD5 Function (Min & Portable)
// Usage : md5 (<string> SourceText)
// Return: Lower-case MD5.
// Source: http://pajhome.org.uk/crypt/md5/md5.html

var md5 = (new (function (){function k(f,b,c,d,e,g,p){return l(m(l(l(f,b&c|~b&d),l(e,p)),g),b)}function n(f,b,c,d,e,g,p){return l(m(l(l(f,b&d|c&~d),l(e,p)),g),b)}function q(f,b,c,d,e,g,p){return l(m(l(l(f,b^c^d),l(e,p)),g),b)}function r(f,b,c,d,e,g,p){return l(m(l(l(f,c^(b|~d)),l(e,p)),g),b)}function l(f,b){var c=(f&65535)+(b&65535);return(f>>16)+(b>>16)+(c>>16)<<16|c&65535}function m(f,b){return f<<b|f>>>32-b}this.calc=function(f){for(var b="",c=-1,d,e;++c<f.length;)d=f.charCodeAt(c),e=c+1<f.length?f.charCodeAt(c+1):0,55296<=d&&56319>=d&&56320<=e&&57343>=e&&(d=65536+((d&1023)<<10)+(e&1023),c++),127>=d?b+=String.fromCharCode(d):2047>=d?b+=String.fromCharCode(192|d>>>6&31,128|d&63):65535>=d?b+=String.fromCharCode(224|d>>>12&15,128|d>>>6&63,128|d&63):2097151>=d&&(b+=String.fromCharCode(240|d>>>18&7,128|d>>>12&63,128|d>>>6&63,128|d&63));f=Array(b.length>>2);for(c=0;c<f.length;c++)f[c]=0;for(c=0;c<8*b.length;c+=8)f[c>>5]|=(b.charCodeAt(c/8)&255)<<c%32;b=8*b.length;f[b>>5]|=128<<b%32;f[(b+64>>>9<<4)+14]=b;b=1732584193;c=-271733879;d=-1732584194;e=271733878;for(var g=0;g<f.length;g+=16){var p=b,s=c,t=d,u=e,b=k(b,c,d,e,f[g+0],7,-680876936);e=k(e,b,c,d,f[g+1],12,-389564586);d=k(d,e,b,c,f[g+2],17,606105819);c=k(c,d,e,b,f[g+3],22,-1044525330);b=k(b,c,d,e,f[g+4],7,-176418897);e=k(e,b,c,d,f[g+5],12,1200080426);d=k(d,e,b,c,f[g+6],17,-1473231341);c=k(c,d,e,b,f[g+7],22,-45705983);b=k(b,c,d,e,f[g+8],7,1770035416);e=k(e,b,c,d,f[g+9],12,-1958414417);d=k(d,e,b,c,f[g+10],17,-42063);c=k(c,d,e,b,f[g+11],22,-1990404162);b=k(b,c,d,e,f[g+12],7,1804603682);e=k(e,b,c,d,f[g+13],12,-40341101);d=k(d,e,b,c,f[g+14],17,-1502002290);c=k(c,d,e,b,f[g+15],22,1236535329);b=n(b,c,d,e,f[g+1],5,-165796510);e=n(e,b,c,d,f[g+6],9,-1069501632);d=n(d,e,b,c,f[g+11],14,643717713);c=n(c,d,e,b,f[g+0],20,-373897302);b=n(b,c,d,e,f[g+5],5,-701558691);e=n(e,b,c,d,f[g+10],9,38016083);d=n(d,e,b,c,f[g+15],14,-660478335);c=n(c,d,e,b,f[g+4],20,-405537848);b=n(b,c,d,e,f[g+9],5,568446438);e=n(e,b,c,d,f[g+14],9,-1019803690);d=n(d,e,b,c,f[g+3],14,-187363961);c=n(c,d,e,b,f[g+8],20,1163531501);b=n(b,c,d,e,f[g+13],5,-1444681467);e=n(e,b,c,d,f[g+2],9,-51403784);d=n(d,e,b,c,f[g+7],14,1735328473);c=n(c,d,e,b,f[g+12],20,-1926607734);b=q(b,c,d,e,f[g+5],4,-378558);e=q(e,b,c,d,f[g+8],11,-2022574463);d=q(d,e,b,c,f[g+11],16,1839030562);c=q(c,d,e,b,f[g+14],23,-35309556);b=q(b,c,d,e,f[g+1],4,-1530992060);e=q(e,b,c,d,f[g+4],11,1272893353);d=q(d,e,b,c,f[g+7],16,-155497632);c=q(c,d,e,b,f[g+10],23,-1094730640);b=q(b,c,d,e,f[g+13],4,681279174);e=q(e,b,c,d,f[g+0],11,-358537222);d=q(d,e,b,c,f[g+3],16,-722521979);c=q(c,d,e,b,f[g+6],23,76029189);b=q(b,c,d,e,f[g+9],4,-640364487);e=q(e,b,c,d,f[g+12],11,-421815835);d=q(d,e,b,c,f[g+15],16,530742520);c=q(c,d,e,b,f[g+2],23,-995338651);b=r(b,c,d,e,f[g+0],6,-198630844);e=r(e,b,c,d,f[g+7],10,1126891415);d=r(d,e,b,c,f[g+14],15,-1416354905);c=r(c,d,e,b,f[g+5],21,-57434055);b=r(b,c,d,e,f[g+12],6,1700485571);e=r(e,b,c,d,f[g+3],10,-1894986606);d=r(d,e,b,c,f[g+10],15,-1051523);c=r(c,d,e,b,f[g+1],21,-2054922799);b=r(b,c,d,e,f[g+8],6,1873313359);e=r(e,b,c,d,f[g+15],10,-30611744);d=r(d,e,b,c,f[g+6],15,-1560198380);c=r(c,d,e,b,f[g+13],21,1309151649);b=r(b,c,d,e,f[g+4],6,-145523070);e=r(e,b,c,d,f[g+11],10,-1120210379);d=r(d,e,b,c,f[g+2],15,718787259);c=r(c,d,e,b,f[g+9],21,-343485551);b=l(b,p);c=l(c,s);d=l(d,t);e=l(e,u)}f=[b,c,d,e];b="";for(c=0;c<32*f.length;c+=8)b+=String.fromCharCode(f[c>>5]>>>c%32&255);f=b;b="0123456789abcdef";c="";for(e=0;e<f.length;e++)d=f.charCodeAt(e),c+=b.charAt(d>>>4&15)+b.charAt(d&15);return c}})()).calc;
