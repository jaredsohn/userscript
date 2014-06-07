// ==UserScript==
// @name           NewFxckBaidu
// @namespace      http://userscripts.org/scripts/edit_src/92266
// @author	   xXx.W
// @version	   2.2
// @include        http://www.baidu.com/
// @include        http://www.baidu.com/index.php?tn=*
// @include        http://www.baidu.com/s*
// @include        http://www.baidu.com/baidu*
// @include        http://www.baidu.com/?fr=img*
// @include        http://www.baidu.com/?t=*
// @description    在我心中，百度不是一家值得尊重的公司，所以，我想通过这种方法来表达我对它的厌恶。这段脚本不会对您的电脑产生任何危害，它的用途只是使您在访问百度首页时让整个页面看起来和原来不同而已。
// ==/UserScript==

var s_LogoSrc = 'http://i3.6.cn/cvbnm/61/bd/a8/7f1dc8511d7d7668dd7cee755c1506ec.jpg'; //自定义logo，可随意修改；
var s_LogoHerf = 'http://www.fanbaidu.com/'; //自定义logo的链接地址，可随意修改；
var obj_Links   = document.links; //页面中的所有链接



// 删除右侧广告
var e=document.getElementById("ec_im_container");
e!=null && e.parentNode.removeChild(e);

// 删除顶部推广链接广告1
var f=document.getElementById("4001");
f!=null && f.parentNode.removeChild(f);

// 删除顶部推广链接广告2
var g=document.getElementById("4002");
g!=null && g.parentNode.removeChild(g);





document.title += '为什么聪明人都用Google';

if( 
    (document.images[0].src == 'http://www.baidu.com/img/logo-yy.gif')||
(document.images[0].src == 'http://www.baidu.com/img/lm.gif')||
(document.images[0].src == 'http://www.baidu.com/img/logo-yy1.gif')||(document.images[0].src == 'http://www.baidu.com/img/baidu_jgylogo2.gif')||(document.images[0].src == 'http://www.baidu.com/img/baidu_jgylogo1.gif')||(document.images[0].src == 'http://www.baidu.com/img/baidu_jgylogo3.gif')||(document.images[0].src == 
'http://www.baidu.com/img/baidu_jgylogo4.gif')

  ) 
{	
	changeResultPage();
} else {  
	changeIndexPage();
}

//此处的修改是针对搜索结果页面
function changeResultPage() {
        var obj_index    = document.getElementById('u'); //首页
        var obj_Btn     = document.getElementById('su'); //提交搜索按钮

        obj_index.innerHTML = '<a href="http://www.baidu.com/">首页</a>&nbsp;|&nbsp;' + obj_index.innerHTML;

        obj_index.innerHTML = '<a href="http://www.baidu.com/">改用谷歌</a>&nbsp;|&nbsp;' + obj_index.innerHTML;
        
        obj_Btn.value = '忍耐一下';


    document.images[0].src = s_LogoSrc;
	document.images[0].parentNode.href = s_LogoHerf;
        document.images[0].title = '到反百度联盟';
      if(document.images[0].src == 'http://www.baidu.com/img/logo-yy1.gif'){
	document.images[0].width = '117';
	document.images[0].height = '38';}
      if((document.images[0].src == 'http://www.baidu.com/img/logo-yy.gif')
||(document.images[0].src == 'http://www.baidu.com/img/lm.gif')){
        document.images[0].width = '137';
	document.images[0].height = '46';}
	
	//获取当前搜索keyword
	var ary_e_Input = document.getElementsByTagName('input');
	var s_currKeyWord = '';
	for(i = 0; i < ary_e_Input.length; i++) {
	    if(ary_e_Input[i].getAttribute('name') == 'wd') {
            s_currKeyWord = ary_e_Input[i].value;
	    }
	}
	
	for(i = 0; i < obj_Links.length; i++) {
		var s_LinkTxt = obj_Links[i].innerHTML;
		var s_NewLinkTxt = s_LinkTxt;
		
		switch(s_LinkTxt) {
		    case '推广':
			    s_NewLinkTxt = '这条是广告，囧rz=3';
				break;

		    case '百度快照':
			    s_NewLinkTxt = '为何Google的快照就“不好使”呢？';
				break;
		    case '改用谷歌':
			    s_NewLinkTxt = '在谷歌搜索<b><FONT color=#ff0000>' + s_currKeyWord + '</FONT></b>看有何不同！';

                                obj_Links[i].href = 'http://gg.eeload.com/search?hl=zh-CN&q=' + s_currKeyWord;

				obj_Links[i].onclick = "h(this,'http://gg.eeload.com/');hc('google')";
			    break;
			case '与百度对话':
			    s_NewLinkTxt = s_LinkTxt + '？百度会理你吗？';
			    break;
		}
		obj_Links[i].innerHTML = s_NewLinkTxt;
    }


	
}

//此处的修改是针对百度首页
function changeIndexPage() {
	var obj_Logo    = document.getElementById('lg'); //百度logo
	var obj_P       = document.getElementById('lk'); //搜索框下方的链接
	var obj_Btn     = document.getElementById('su'); //提交搜索按钮
	var obj_Keyword = document.getElementById('kw'); //搜索框
        var obj_Dbword  = document.getElementById('lh'); //底部的链接
        var obj_Sethopa = document.getElementById('sh'); 

        obj_Logo.innerHTML = '<img height=129 src="http://i3.6.cn/cvbnm/61/bd/a8/7f1dc8511d7d7668dd7cee755c1506ec.jpg"  width=270 useMap=#mp>';
        
        obj_P.innerHTML = '<a href="http://mp3.baidu.com/">mp3</a>&nbsp;&nbsp;&nbsp;' + obj_P.innerHTML;

	obj_P.innerHTML = '<a href="http://gg.eeload.com/">改用Google</a>&nbsp;&nbsp;|&nbsp;&nbsp;' + obj_P.innerHTML;

         obj_Sethopa.onclick = "this.style.behavior='url(#default#homepage)';this.setHomePage('http://gg.eeload.com/')";

    obj_Sethopa.href = 'http://gg.eeload.com/';

	obj_Btn.value = '忍耐一下';
	document.getElementsByTagName('area')[0].href = s_LogoHerf;
        document.getElementsByTagName('area')[0].title = '到反百度联盟';
	
	for(i = 0; i < obj_Links.length; i++) {
		var s_LinkTxt = obj_Links[i].innerHTML;
		var s_NewLinkTxt = s_LinkTxt;
		
		switch(s_LinkTxt) {
		    case '把百度设为主页':
			    s_NewLinkTxt = '把百度设为主页是一种很愚蠢的行为';
			    break;
			case '贴&nbsp;吧':
			    s_NewLinkTxt = '无鸡吧的贴吧';
			    break;
                        case '知&nbsp;道':
			    s_NewLinkTxt = '不知道';
			    break;
			case 'MP3':
			    s_NewLinkTxt = 'MP3涉嫌侵权';
         obj_Links[i].href = 'http://tech.sina.com.cn/focus/Baidu_MP3/index.shtml';
			    break;
                        case '加入百度推广':
			    s_NewLinkTxt = '加入献金排名';
			    break;
		}
		obj_Links[i].innerHTML = s_NewLinkTxt;
    }
}

