// ==UserScript==
// @name           Append bookmarkcount in Google
// @namespace      http://userjs.0fk.org
// @include        http://*.google.*/search*
// @include        http://*.google.*/custom*
// @version        0.0.1
// ==/UserScript==

var md5_hex = (function(){var MD5_T=[0x00000000,0xd76aa478,0xe8c7b756,0x242070db,0xc1bdceee,0xf57c0faf,0x4787c62a,0xa8304613,0xfd469501,0x698098d8,0x8b44f7af,0xffff5bb1,0x895cd7be,0x6b901122,0xfd987193,0xa679438e,0x49b40821,0xf61e2562,0xc040b340,0x265e5a51,0xe9b6c7aa,0xd62f105d,0x02441453,0xd8a1e681,0xe7d3fbc8,0x21e1cde6,0xc33707d6,0xf4d50d87,0x455a14ed,0xa9e3e905,0xfcefa3f8,0x676f02d9,0x8d2a4c8a,0xfffa3942,0x8771f681,0x6d9d6122,0xfde5380c,0xa4beea44,0x4bdecfa9,0xf6bb4b60,0xbebfbc70,0x289b7ec6,0xeaa127fa,0xd4ef3085,0x04881d05,0xd9d4d039,0xe6db99e5,0x1fa27cf8,0xc4ac5665,0xf4292244,0x432aff97,0xab9423a7,0xfc93a039,0x655b59c3,0x8f0ccc92,0xffeff47d,0x85845dd1,0x6fa87e4f,0xfe2ce6e0,0xa3014314,0x4e0811a1,0xf7537e82,0xbd3af235,0x2ad7d2bb,0xeb86d391];var MD5_round1=[[0,7,1],[1,12,2],[2,17,3],[3,22,4],[4,7,5],[5,12,6],[6,17,7],[7,22,8],[8,7,9],[9,12,10],[10,17,11],[11,22,12],[12,7,13],[13,12,14],[14,17,15],[15,22,16]];var MD5_round2=[[1,5,17],[6,9,18],[11,14,19],[0,20,20],[5,5,21],[10,9,22],[15,14,23],[4,20,24],[9,5,25],[14,9,26],[3,14,27],[8,20,28],[13,5,29],[2,9,30],[7,14,31],[12,20,32]];var MD5_round3=[[5,4,33],[8,11,34],[11,16,35],[14,23,36],[1,4,37],[4,11,38],[7,16,39],[10,23,40],[13,4,41],[0,11,42],[3,16,43],[6,23,44],[9,4,45],[12,11,46],[15,16,47],[2,23,48]];var MD5_round4=[[0,6,49],[7,10,50],[14,15,51],[5,21,52],[12,6,53],[3,10,54],[10,15,55],[1,21,56],[8,6,57],[15,10,58],[6,15,59],[13,21,60],[4,6,61],[11,10,62],[2,15,63],[9,21,64]];function MD5_F(x,y,z){return (x&y)|(~x&z)}function MD5_G(x,y,z){return (x&z)|(y&~z)}function MD5_H(x,y,z){return x^y^z}function MD5_I(x,y,z){return y^(x|~z)}var MD5_round=[[MD5_F,MD5_round1],[MD5_G,MD5_round2],[MD5_H,MD5_round3],[MD5_I,MD5_round4]];var CC=String.fromCharCode;function MD5_pack(n32){return CC(n32&0xff)+CC((n32>>>8)&0xff)+CC((n32>>>16)&0xff)+CC((n32>>>24)&0xff)}function MD5_unpack(s4){return s4.charCodeAt(0)|(s4.charCodeAt(1)<<8)|(s4.charCodeAt(2)<<16)|(s4.charCodeAt(3)<<24)}function MD5_number(n){while(n<0)n+=4294967296;while(n>4294967295)n-=4294967296;return n}function MD5_apply_round(x,s,f,abcd,r){var a,b,c,d,kk,ss,ii,t,u;a=abcd[0];b=abcd[1];c=abcd[2];d=abcd[3];kk=r[0];ss=r[1];ii=r[2];u=f(s[b],s[c],s[d]);t=s[a]+u+x[kk]+MD5_T[ii];t=MD5_number(t);t=((t<<ss)|(t>>>(32-ss)));t+=s[b];s[a]=MD5_number(t)}function MD5_hash(data){var abcd,x,state,s,len,index,padLen,f,r,i,j,k,tmp;state=[0x67452301,0xefcdab89,0x98badcfe,0x10325476];len=data.length;index=len&0x3f;padLen=(index<56)?(56-index):(120-index);if(padLen>0){data+="\x80";for(i=0;i<padLen-1;i++)data+="\x00"}data+=MD5_pack(len*8);data+=MD5_pack(0);len+=padLen+8;abcd=[0,1,2,3];x=new Array(16);s=new Array(4);for(k=0;k<len;k+=64){for(i=0,j=k;i<16;i++,j+=4){x[i]=data.charCodeAt(j)|(data.charCodeAt(j+1)<< 8)|(data.charCodeAt(j+2)<<16)|(data.charCodeAt(j+3)<<24)}for(i=0;i<4;i++)s[i]=state[i];for(i=0;i<4;i++){f=MD5_round[i][0];r=MD5_round[i][1];for(j=0;j<16;j++){MD5_apply_round(x,s,f,abcd,r[j]);tmp=abcd[0];abcd[0]=abcd[3];abcd[3]=abcd[2];abcd[2]=abcd[1];abcd[1]=tmp}}for(i=0;i<4;i++){state[i]+=s[i];state[i]=MD5_number(state[i])}}return MD5_pack(state[0])+MD5_pack(state[1])+MD5_pack(state[2])+MD5_pack(state[3])}function MD5_hexhash(data){var i,out,c;var bit128=MD5_hash(data);out="";for(i=0;i<16;i++){c=bit128.charCodeAt(i);out+="0123456789abcdef".charAt((c>>4)&0xf);out+="0123456789abcdef".charAt(c&0xf)}return out}return MD5_hexhash})();

var sbmfilter = function (context) {
	var links = document.evaluate('.//a[@class="l"][parent::*[not(child::span[@class="sbm"])]]', context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, j = links.snapshotLength; i < j; ++i) {
		var a = links.snapshotItem(i);
		var url = a.href;
		var md5 = md5_hex(url);
		a.parentNode.appendChild($N('span', {
			'class': 'sbm'
		}, [
			// はてブ
			$N('a', {
				'href': 'http://b.hatena.ne.jp/entry/' + url
			}, [$N('img', {
				'src': 'http://b.hatena.ne.jp/entry/image/' + url,
				'style': 'margin:0;border:0;vertical-align:middle;'
			})]),
			// livedoor clip
			$N('a', {
				'href': 'http://clip.livedoor.com/page/' + url
			}, [$N('img', {
				'src': 'http://image.clip.livedoor.com/counter/' + url,
				'style': 'margin:0;border:0;vertical-align:middle;'
			})]),
			// del.icio.us
			$N('a', {
				'href': 'http://del.icio.us/url/' + md5
			}, [$N('img', {
				'src': 'http://del.icio.us/feeds/img/savedcount/' + md5 + '?aggregate',
				'style': 'margin:0;border:0;vertical-align:middle;'
			})])
		]));
	}
};

sbmfilter(document);

addFilter(sbmfilter);

function addFilter(func, i) {
	i = i || 4;
	if (window.AutoPagerize && window.AutoPagerize.addFilter) {
		func(document);
		window.AutoPagerize.addFilter(function (nodes) {
			nodes.forEach(func);
		});
	}
	else if (i > 1) {
		setTimeout(arguments.callee, 1000, func, i - 1);
	}
	else {
		(function () {
			func(document);
			setTimeout(arguments.callee, 200);
		})();
	}
}

function $N(name, attr, childs) {
	var res = document.createElement(name);
	for (var i in attr) {
		res.setAttribute(i, attr[i]);
	}
	if (childs) {
		if (typeof childs == 'string') {
			res.innerHTML = childs;
		}
		else {
			for (var i = 0, j = childs.length; i < j; ++i) {
				res.appendChild(typeof childs[i] == 'string' ? document.createTextNode(childs[i]) : childs[i]);
			}
		}
	}
	return res;
}
