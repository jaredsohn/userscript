
// ==UserScript==
// @name       屏蔽签名档
// @namespace  http://www._(:з」∠)_.cn/
// @version    1.0
// @include      http://tieba.baidu.com/*
// @description  屏蔽签名档
// @match      http://tieba.baidu.com/*
// @copyright  2012+, You
// ==/UserScript==

var pbqmd=document.getElementsByTagName("img");

var pbqmdl=pbqmd.length;

var pbqmdn=0;

while (pbqmdn<pbqmdl){

if (pbqmd[pbqmdn].src=="http://imgsrc.baidu.com/forum/pic/item/3b939244ebf81a4c7cb50d1ed72a6059272da686.jpg?v=tbs"){

var pbpbpbpb=document.createElement("p");

var pbpbpb=document.createTextNode('由于该图片可能会引起chrome卡顿,因此将其屏蔽');

pbpbpbpb.appendChild(pbpbpb);

pbpbpbpb.style.color="#de3333";

pbpbpbpb.style.fontSize="20px";

pbqmd[pbqmdn].parentNode.appendChild(pbpbpbpb);

pbqmd[pbqmdn].parentNode.removeChild(pbqmd[pbqmdn]);

}

pbqmdn++;

}