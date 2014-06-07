// ==UserScript==
// @name            Multi_Translation
// @description	    B: dict.bing, D: 3g.dict.cn, U: urbandictionary, W: wikipedia, Y: dict.youdao
// @author          yulanggong
// @version         0.1
// @date            2013.01.31
// @namespace       http://multi_translation.user.js
// @include         *
// ==/UserScript==

var u,s,i; 

function q(e){
    s = window.getSelection();
    if(s!=""&&e.which){
        if(i) document.body.removeChild(i);
		u=null;
		switch (e.which){
			case 66 ://B
			u = "http://dict.bing.com.cn/?view=wap&q="+encodeURIComponent(s);//bing wap
			break;
			case 68 : //D
			u="http://3g.dict.cn/s.php?q="+s; 
			break;
			case 85 : //U
			u="http://www.urbandictionary.com/define.php?term="+s; 
			break;
			case 87 : //W
			u="http://zh.wikipedia.org/wiki/"+encodeURIComponent(s); //
			break;
			case 89 : //Y
			u="http://dict.youdao.com/search?q="+encodeURIComponent(s);//
			break;
		}
		if (u){
			i = document.createElement("iframe");
			i.setAttribute("src",u);
			with(i.style){
				position="fixed";
				left="0px";
				bottom="0px";
				width="100%";
				height="300px";
				zIndex="10000";
				background="#fff";
				border="0 none"
				borderTop="1px solid #888";
			}
			document.body.appendChild(i);
		}
    }
}

function r(){
    if(s==""&&i){
        document.body.removeChild(i);
        i=null;
    }
}

document.addEventListener("keydown",q,false);
document.addEventListener("click",r,false);