// ==UserScript==
// @name        贴吧自定义输入法
// @description ▉▉▉▉ 更新脚本前 请手动备份代码 ▉▉▉▉
// @namespace   yuxingyc
// @include     http://localhost/_tieba_baidu_com/*
// @include     http://tieba.baidu.com/*
// @updateURL      https://userscripts.org/scripts/source/179946.meta.js
// @downloadURL    https://userscripts.org/scripts/source/179946.user.js
// @version     1.0
// ==/UserScript==
(function(){
/*
 *         直接跳到第23行,按说明添加新内容
 */
var $=unsafeWindow.$;
var MAX=15;//限制搜索结果为 MAX 条
var TIME=300;//单位:毫秒.   停止按键 t 毫秒后, 自动搜索内容
var LEN=30;//输入的关键词超过 LEN 个字时停止搜索.
var MIN_LEN=0;//输入的关键词长度大于 MIN_LEN个字时才进行搜索. 请确保所有关键词的长度都大于 MIN_LEN
var scrollH=40;//设置搜索结果的滚动条的滚动行数
var keywords=[],keywordsNum=[];
function init(){
	FAQ=[
	[5,"HELP 帮助","代码转换工具",textEditor]// 贴吧打字状态按一次 ALT键 然后后输入 help 查看所有关键词
	/*
	*
	*新增一行内容,请按箭头之间的格式添加
	*模糊匹配-->  ,[1,"关键词1 关键词2 关键词n","添加到编辑框的内容"]	<--
	*模糊匹配--> ,[1, 标题 , 内容]	<--
	*模糊匹配--> ,[2, 文本内容] <--这种格式搜索的是文本内容 , 添加到编辑框的也是文本内容 , 适用于简短的句子. 
	*
	*模糊匹配--> ,[4, 关键词 , function(){.... return xxx} ] <--函数在搜索结果显示的时候执行
	*模糊匹配--> ,[5, 关键词 , 文字说明 ,function(){.... return xxx} ] <--函数在点击搜索结果时运行
	*
	*从左到右匹配:只需将前边的数字改为负数 例如--> ,[-1, 标题 , 内容] <--这种格式不支持模糊搜索. 只能按顺序从左到右逐个匹配
	*
	*可添加图片(请使用baidu.com的图片) 例如: ,["斜眼笑",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f25.png")]
	*文本+图片(请使用baidu.com的图片) 例如: ,["斜眼笑","文本1"+image("http://static.tieba.baidu.com/tb/editor/images/face/i_f25.png")+"文本2"]
	*在搜索结果中不显示图片. 请使用  image(图片地址,-1); 例如 ,["斜眼笑",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f25.png",-1)]
	*
	*搜索时,多个关键词之间用空格隔开, 
	*显示搜索结果后,  长按数字键添加内容到编辑框并删除输入的关键词, ALT+数字键 保存输入的关键词 
	*
	*贴吧打字状态 没有显示搜索结果时, 按 ALT键或F2 可进行新的搜索;
	*
	*贴吧打字状态 按下组合键 Shift+F1 可打开代码转换工具. 输入关键词后, 能将编辑框的内容转换为脚本代码,  复制 粘贴到下方"自定义内容"区域,保存后即可使用.
	*编辑框支持js代码 例如 function(){alert(1)}   js代码放到大括号内  function(){你的JS代码} 
	*
	*
	*
	*/

//---------------------------------以下为自定义内容 ---------------------------------
// 为避免脚本更新等原因造成数据意外丢失,建议你将修改后的内容备份到txt文档 

//放在前面的词条,在搜索结果中优先显示

//示例 

,[1,"test1 春晓","春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少？"]
,[1,"test1","添加到编辑框时显示图片"+image("http://static.tieba.baidu.com/tb/editor/images/face/i_f25.png",-1)]
,[2,"test2 关键词将添加到编辑框"]
,[4,"test4 时间", timeFn]	
,[4,"test4 星期", day]
,[5,"test5 alert","弹出警告",function(){alert("test5")}]

//常用短语	(常用放在前面可优先显示)
,[-2,"好顶赞"+image("http://static.tieba.baidu.com/tb/editor/images/face/i_f13.png")]
,[-2,"无法直视!"+image("http://static.tieba.baidu.com/tb/editor/images/face/i_f33.png")]
,[-2,"丧心病狂!"+image("http://static.tieba.baidu.com/tb/editor/images/face/i_f33.png")]

//文字转表情
//林大B
,[1,"我看你很有想法,跟我学做菜吧",image("http://imgsrc.baidu.com/forum/w%3D223/sign=2ad34eeafcfaaf5184e386bdbf5694ed/9ea245afa40f4bfb1f257898024f78f0f53618a1.jpg",-1)]
,[1,"绝对好评",image("http://imgsrc.baidu.com/forum/w%3D223/sign=aac8c6dff9dcd100cd9cff23418a47be/1ea864f40ad162d963dc0ece10dfa9ec8b13cd56.jpg",-1)]
,[1,"小学生表示不服",image("http://imgsrc.baidu.com/forum/w%3D223/sign=761457161ad5ad6eaaf963e8b2ca39a3/495badfb43166d22eb457946472309f79152d256.jpg",-1)]
,[1,"请允许我做一个悲伤的表情",image("http://imgsrc.baidu.com/forum/w%3D223/sign=208c33901e30e924cfa49b337f096e66/91b01ee93901213f9f8a604455e736d12e2e9508.jpg",-1)]
,[1,"我和我的小伙伴们都惊呆了",image("http://imgsrc.baidu.com/forum/w%3D223/sign=2204e05ab3119313c743f8b256390c10/a601d211728b4710c855d354c2cec3fdfd03234b.jpg",-1)]
,[1,"失意体前屈 orz",image("http://imgsrc.baidu.com/forum/w%3D223/sign=694ee6b74034970a4773172da6cbd1c0/bd2b98d6277f9e2fc69533901e30e924b999f322.jpg",-1)]
,[1,"不能直视 无法直视",image("http://imgsrc.baidu.com/forum/w%3D223/sign=82a98ca2314e251fe2f7e3fa9487c9c2/3bdf812f07082838dcadf28cb999a9014d08f122.jpg",-1)]
,[1,"抱大腿 ",image("http://imgsrc.baidu.com/forum/w%3D223/sign=6c5c3ddb8ad4b31cf03c93b9b4d7276f/10542eadcbef76096d87bf072fdda3cc7dd99e3d.jpg",-1)]
,[1,"不明觉历",image("http://imgsrc.baidu.com/forum/w%3D223/sign=31647171f3d3572c66e29bdeb9126352/c9c29a35e5dde711ab5a656ea6efce1b9c166139.jpg",-1)]
,[1,"我去年买了个表 wqnmlgb",image("http://imgsrc.baidu.com/forum/w%3D223/sign=c4be295b3b87e9504217f46e2339531b/7ba9d63d70cf3bc7ed83eb74d000baa1cf112ac2.jpg",-1)]
,[1,"你看看你",image("http://imgsrc.baidu.com/forum/w%3D223/sign=80338df90eb30f24359aeb01fb94d192/77c3e9246b600c337cfef8501b4c510fdbf9a1c7.jpg",-1)]
,[1,"大王饶命",image("http://imgsrc.baidu.com/forum/w%3D223/sign=0d844fc835a85edffa8cf9217a5509d8/f764a84543a982267e490dbf8b82b9014b90eb3a.jpg",-1)]
,[1,"作死",image("http://imgsrc.baidu.com/forum/w%3D223/sign=6e4dbadf3812b31bc76cca2bb5193674/799813d7912397ddbc84be9c5882b2b7d2a287cc.jpg",-1)]
,[1,"喵喵喵喵",image("http://imgsrc.baidu.com/forum/w%3D223/sign=84ed4907a50f4bfb8cd09956304d788f/398dcb2a2834349b05d4481dc8ea15ce34d3bef3.jpg",-1)]
,[1,"哎哟 不错 这个屌",image("http://imgsrc.baidu.com/forum/w%3D223/sign=a38b50018326cffc692ab8b08a004a7d/298ad95c10385343ef3ca1b99213b07ec88088d2.jpg",-1)]
,[1,"大快人心",image("http://imgsrc.baidu.com/forum/w%3D223/sign=d392bee3d01373f0f53f689d970e4b8b/4dafc6f9d72a605927fcc7822934349b013bbadd.jpg",-1)]
,[1,"平地摔",image("http://imgsrc.baidu.com/forum/w%3D223/sign=3118656ea6efce1bea2bcfc89c53f3e8/b1ebce1373f08202fb58b7a74afbfbeda9641bfb.jpg",-1)]

//默认表情
,[1,"开心",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f01.png",-1)+image("http://static.tieba.baidu.com/tb/editor/images/face/i_f01.png",-1)]
,[1,"哈哈 haha",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f02.png")]
,[1,"调皮",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f03.png")]
,[1,"惊讶",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f04.png")]
,[1,"酷",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f05.png")]
,[1,"生气",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f06.png")]
//,[1,"",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f07.png")]
,[1,"汗",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f08.png")]
,[1,"大哭",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f09.png")]
,[1,"困",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f10.png")]
,[1,"鄙视",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f11.png")]
,[1,"囧 jiong",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f12.png")]
,[1,"牛 好",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f13.png")]
//,[1,"",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f14.png")]
,[1,"?",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f15.png")]
,[1,"红脸",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f16.png")]
,[1,"吐",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f17.png")]
,[1,"瞪眼",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f18.png")]
,[1,"委屈",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f19.png")]
//,[1,"kiss 吻",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f20.png")]
//,[1,"",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f21.png")]
//,[1,"",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f22.png")]
,[1,"无语 ...",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f23.png")]
,[1,"可爱",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f24.png")]
,[1,"斜眼笑",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f25.png")]
//,[1,"",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f26.png")]
,[1,"大汗",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f27.png")]
,[1,"感动",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f28.png")]
,[1,"ZZZ 睡",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f29.png")]
,[1,"啊 !!!!",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f30.png")]
,[1,"生气 怒 !!!!",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f31.png")]
//,[1,"",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f32.png")]
,[1,"pu 噗",image("http://static.tieba.baidu.com/tb/editor/images/face/i_f33.png")]
	
//汽泡熊
,[1,"大笑 哈哈 haha",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b05.gif")]
,[1,"奸笑",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b06.gif")]
,[1,"飞吻 kiss",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b08.gif")]
,[1,"期待 憧憬",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b11.gif")]
,[1,"鼓掌",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b13.gif")]
,[1,"委屈",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b15.gif")]
,[1,"大哭",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b16.gif")]
,[1,"泪奔 哭",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b17.gif")]
,[1,"晕",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b25.gif")]
,[1,"鬼脸",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b40.gif")]
//,[1,"无语 ...",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b31.gi")]
,[1,"打人",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b53.gif")]

//兔斯基
,[1,"love",image("http://static.tieba.baidu.com/tb/editor/images/tsj/t_0002.gif")]
,[1,"啊 !!!!",image("http://static.tieba.baidu.com/tb/editor/images/tsj/t_0004.gif")]
,[1,"顶",image("http://static.tieba.baidu.com/tb/editor/images/tsj/t_0006.gif")]
,[1,"汗",image("http://static.tieba.baidu.com/tb/editor/images/tsj/t_0009.gif")]

//波波
,[1,"orz 膜拜",image("http://static.tieba.baidu.com/tb/editor/images/bobo/B_0025.gif")]
,[1,"口水",image("http://static.tieba.baidu.com/tb/editor/images/qpx_n/b54.gif")]

//绿豆蛙
,[1,"酱油",image("http://static.tieba.baidu.com/tb/editor/images/ldw/w_0003.gif")]
,[1,"囧 jiong",image("http://static.tieba.baidu.com/tb/editor/images/ldw/w_0004.gif")]
,[1,"瀑布汗",image("http://static.tieba.baidu.com/tb/editor/images/ldw/w_0006.gif")]
,[1,"大笑 哈哈 haha",image("http://static.tieba.baidu.com/tb/editor/images/ldw/w_0005.gif")]
,[1,"错了 orz 膜拜",image("http://static.tieba.baidu.com/tb/editor/images/ldw/w_0012.gif")]
,[1,"委屈",image("http://static.tieba.baidu.com/tb/editor/images/ldw/w_0019.gif")]
,[1,"啊 !!!!",image("http://static.tieba.baidu.com/tb/editor/images/ldw/w_0011.gif")]
,[1,"气愤 !!!!",image("http://static.tieba.baidu.com/tb/editor/images/ldw/w_0014.gif")]
,[1,"飞吻 Kiss",image("http://static.tieba.baidu.com/tb/editor/images/ldw/w_0025.gif")]

//------------------------------------------------------------------------------------------

//------------------------------以下代码不要修改--------------------------------------------

	,[1,"help 帮助",""]
	];	
	
	keywords[0]=FAQ[0][1].replace(/^\s+|\s+$/,"").toLowerCase();
	keywordsNum[0]=FAQ[0][0];
	FAQ[FAQ.length-1][2]=(function(s){
		var c="";
		for(var i=1;i<FAQ.length;i++){c+=FAQ[i][1]+"<br>";keywords[i]=FAQ[i][1].replace(/^\s+|\s+$/,"").toLowerCase();keywordsNum[i]=Math.abs(FAQ[i][0])}
		return s+c
	})("帮助 <br> 搜索内容: <br>按一次ALT键,然后输入关键词, 多个关键词用空格隔开. <br><br>ALT+数字(1~9)可将搜索结果添加到编辑框:<br><br>所有关键词:<br>")

GM_addStyle(".gszs_show{display:block}\
.gszs_hide{display:none}\
.gszs_click{padding:2px;padding-right:20px;max-height:260px;}\
.gszs_cur{cursor:pointer;border-radius: 2px 2px 2px 2px;}\
.gszs_cur:hover{\
background:-moz-linear-gradient(top,rgba(253,255,248,0.4) 0%,rgba(253,195,108,0.2) 5%,rgba(253,195,108,0.2) 95%,rgba(253,255,248,0.4) 100%);\
background:-webkit-linear-gradient(top,rgba(253,255,248,0.4) 0%,rgba(253,195,108,0.2)5%,rgba(253,195,108,0.2) 95%,rgba(253,255,248,0.4) 100%);\
}\
.gszs_g{color:gray;white-space:nowrap;padding-right:20px;}\
.gszs_p{color:red}\
.gszs_ovf1{OVERFLOW-Y: hidden; OVERFLOW-X:hidden;}\
.gszs_ovf2{OVERFLOW-Y: auto; OVERFLOW-X:auto;}\
.gszs_ovf{OVERFLOW-Y: auto; OVERFLOW-X:hidden;}\
.gszs_bg{margin-left:1px;margin-right:1px;padding:1px;border: 1px solid rgb(209, 176, 124);background-color: rgb(200, 245, 245);border-radius: 4px 4px 4px 4px;}\
.gszs_editor_focus:focus{\
outline:none;\
border: 1px solid rgb(157, 204, 240);\
box-shadow:0px 0px 2px rgba(100,150,160,0.5);\
}\
.gszs_click_title>img{display:none}\
.gszs_admin_border{background:rgba(240,240,240,.8);border:1px solid rgba(198,216,234,.8);margin:3px;padding-left:2px;padding-right:2px}\
#gszs_search{margin-bottom:-3px;color:pink;}\
#gszs_search_end,#html_mode{background:pink}\
");
	resultContainer=ADD("div",document.body,["class","gszs_hide"],["style","width:auto;max-height:300px;z-index:99999;OVERFLOW-Y: auto; OVERFLOW-X:hidden;position:absolute;border: 1px solid rgb(209, 176, 124);background-color: rgb(255, 255, 218);border-radius: 4px 4px 4px 4px;box-shadow: 1px 1px 2px rgb(212, 212, 212);padding: 5px;"]);
	mScroll(resultContainer,scrollH);
	addImgFlag();
}//init

var timeFn=function(){return (new Date()).toLocaleString()+" "+day()};
var day=function(){var d=new Date(), w=["天","一","二","三","四","五","六"];return "星期" + w[d.getDay()]};
var image=function(url,a){
	if(a==-1) return "(图片#"+url+"#)";	
	return "<img  unselectable='on' src='"+url+"' class='BDE_Image'>"
}

function mouseMoveElement(onEl,moveEl,fn){
	var p=false,xxx,yyy;
	onEl.onmousedown=function(e){
		p=true;		
		xxx =  e.pageX- moveEl.offsetLeft;
		yyy =  e.pageY - moveEl.offsetTop;
		if(typeof(fn)=="function")fn();
		return false;
	}
	document.body.addEventListener("mousemove",function(e){
		if(!p)return;		
		moveEl.style.left=e.pageX - xxx+"px";
		moveEl.style.top=e.pageY - yyy+"px";					
		},false);
	onEl.onmouseup=function(){p=false}
};

var brs=(/chrome/i.test(navigator.userAgent))?'mousewheel':'DOMMouseScroll';
function mScroll(r,h){
	var c;
	r.addEventListener(brs,function(e){
		c=-e.wheelDelta||e.detail;
		r.scrollTop+=h*c/Math.abs(c);
		e.preventDefault()
	},false);
}

var fixH=0,fixW=0;
var editor,jEditor,resultContainer,FAQ=[];
editor=document.querySelector(".tb-editor-editarea");
if(unsafeWindow.PageData.thread){
	jEditor=document.querySelector(".j_editor_windex");
}else{ 
	jEditor=document.querySelector(".forum_foot");
	fixH=114,fixW=58;
}
editor.addEventListener("click",function(){
	init();
	init=function(){};	
	resultContainer.style.top=jEditor.offsetTop+fixH+"px";
	resultContainer.style.left=jEditor.offsetLeft+fixW+620+"px";
	resultContainer.style.maxWidth=ww-(jEditor.offsetLeft+fixW+635)+"px";	
},false);

var ww=document.documentElement.clientWidth;
var hh=document.documentElement.clientHeight;
function ADD(el,pos,s){
	var a;
	if(typeof el =="object"){
		a=document.createElement(el[0]);
		a.innerHTML=el[1];
		}else a=document.createElement(el);
	
	if(s)for(var i=2,len=arguments.length;i<len;i++){
		a.setAttribute(arguments[i][0],arguments[i][1]); 
	}
	pos.appendChild(a);	
	return a;
}

var searchEl,searchEl2;
function addImgFlag(){//添加搜索光标
	if(resultContainer.className=="gszs_show")return;
	divData0=getPos(editor);
	removeImgFlag();
	unsafeWindow.rich_postor._editor.execCommand("inserthtml","<img  unselectable='on' alt='▶' src='http://imgsrc.baidu.com/forum/pic/item/75bdf3deb48f8c544f4a2d0e38292df5e1fe7f67.jpg' id='gszs_search'class='BDE_Image'>");		
}
function removeImgFlag(){
	searchEl=editor.querySelector("#gszs_search");		
	if(searchEl)searchEl.parentNode.removeChild(searchEl);
}
removeImgFlag();
searchEl2=editor.querySelector("#gszs_search_end");		
if(searchEl2)searchEl2.parentNode.removeChild(searchEl2);

var checkEl;
function insertHtml(str){	
	resultContainer.className="gszs_hide";
	unsafeWindow.rich_postor._editor.execCommand("inserthtml", "<img alt='光标位置有误!' id='gszs_search_end' src=''></img>"+str);
	searchEl2=editor.querySelector("#gszs_search_end");		
	if(searchEl2){
		checkEl=editor.querySelector("#gszs_search_end");
		while(checkEl){
			checkEl=checkEl.previousSibling;
			if(checkEl.previousSibling.id=="gszs_search"){
				do{
					searchEl2.previousSibling.parentNode.removeChild(searchEl2.previousSibling);
				}while(searchEl2.previousSibling.id!="gszs_search");
				addImgFlag();
				searchEl2.parentNode.removeChild(searchEl2);
				return;
			}			
		}
	}	
}
var strLen,regText,kws,reg2,cNum,con_f,reg,con_num,tiDiv,conDiv,ii,rr;
function searchText(str){
	str=str.replace(/^\s+|\s+$/,"").replace(/\n/g,"").toLowerCase();
	strLen=str.length;
	if(strLen>LEN||strLen<=MIN_LEN){resultContainer.className="gszs_hide";return}	
	resultContainer.textContent="";
	resultContainer.className="gszs_hide";
	regText=str.replace(/(\*|\.|\?|\$|\^|\[|\]|\(|\)|\{|\}|\||\\|\/)/g,"\\$1");
	kws=str.split(/\s+/);
	reg1=new RegExp("(^"+regText+")","i");
	reg2=new RegExp("("+regText.replace(/\s+/g,"|")+")","ig");
	cNum=0;	
	for(ii=0;ii<FAQ.length;ii++){
		rr=0;
		if(FAQ[ii][0]<1){			
			if(keywords[ii].indexOf(kws[rr])==0)rr=1;			
			reg=reg1;
		}else for(;rr<kws.length;rr++){
			if(keywords[ii].indexOf(kws[rr])==-1)break;
			reg=reg2;
		}		
		if(rr!=kws.length){continue}				
		con_num=Math.abs(FAQ[ii][0]);
		resultContainer.className="gszs_show";
		
		switch(keywordsNum[ii]){
			case 0:con_f=FAQ[ii][1];break;
			case 1:con_f=FAQ[ii][2];break;
			case 2:con_f=FAQ[ii][1];break;
			case 4:con_f=FAQ[ii][2]();break;
			case 5:con_f=FAQ[ii][2];break;
			default:con_f="";
		}
		tiDiv=ADD(["div",++cNum+"( "+FAQ[ii][1].replace(reg,"<b class='gszs_p'>$1</b>")+" )"],resultContainer,["title","保留关键词: ALT+数字(1~9)"],["class","gszs_g gszs_cur gszs_click_title"]);
		conDiv=ADD(["div",con_f],resultContainer,["title","快捷键:长按数字(1~9)"],["class","gszs_click gszs_cur gszs_ovf1"]);
	
		if(keywordsNum[ii]==5){
			tiDiv.onclick=conDiv.onclick=FAQ[ii][3];
			tiDiv.style.background="pink";
			tiDiv.title=conDiv.title="";
		} else {
			tiDiv.onclick=function(){
			insertHtml(str+this.nextSibling.innerHTML.replace(/\(图片#(.*?)#\)/g,function(p,p1){return image(p1)}));
			this.onclick=null;
			};
			conDiv.onclick=function(){
			insertHtml(this.innerHTML.replace(/\(图片#(.*?)#\)/g,function(p,p1){return image(p1)}));
			this.onclick=null;
			}
		}
		conDiv.scrollTop=0;
		conDiv.onmouseover=function(){this.className="gszs_click gszs_cur gszs_ovf2"}
		conDiv.onmouseout=function(){this.className="gszs_click gszs_cur gszs_ovf1"}		
		if(cNum==MAX)break;	
	}
}

var divData0={},divData1={},cursorData={};
var rngeStr,rngePos,rnge;
function getPos(f) { 
	rngeStr="",rngePos=0; 
	rnge = window.getSelection().getRangeAt(0).cloneRange();  
	rnge.setStart(f, 0); 
	rngeStr=rnge.toString();
	rngePos=rngeStr.length;
	return {pos:rngePos,val:rngeStr.substring(0,rngePos)};       
} 

var timer;
var isKeyDown=0,theKeyCode,tFlag;
var selNumTimer,selNumTimerFlag;
editor.addEventListener("keyup",function(e){
	if(timer)clearTimeout(timer);	
	if(tFlag==0)timer=setTimeout(function(){
		if(editor.querySelector("#gszs_search")){
			divData1=getPos(editor);		
			searchText(divData1.val.slice(divData0.pos));
		}else resultContainer.className="gszs_hide";
	},TIME);	
	if(isKeyDown==1){
		if(resultContainer.className=="gszs_show"){
		try{resultContainer.querySelectorAll(".gszs_click_title")[theKeyCode-49].onclick()}catch(e){}			
		}
		addImgFlag();
		isKeyDown=0;
	}
	if(e.keyCode>=49&&e.keyCode<=57){
		if(selNumTimer)clearTimeout(selNumTimer);
		selNumTimerFlag=0;
	}
},false);
editor.addEventListener("keydown",function(e){	
	if(e.altKey&&e.keyCode>=49&&e.keyCode<=57){
		if(isKeyDown==1)return;
		theKeyCode=e.keyCode;
		isKeyDown=1;
	}else if(e.keyCode>=49&&e.keyCode<=57){
		if(selNumTimerFlag==1){e.preventDefault();return;}	
		if(resultContainer.className=="gszs_show"){						
			selNumTimerFlag=1;
			if(selNumTimer)clearTimeout(selNumTimer);
			selNumTimer=setTimeout(function(){
				try{resultContainer.querySelectorAll(".gszs_click")[e.keyCode-49].onclick()}catch(e){}
				},600);
		}		
	}	
	else if(e.keyCode==113||e.altKey){		
		addImgFlag();
	}else if((e.keyCode==13&&e.ctrlKey)||(e.keyCode==13&&e.shiftKey)){
		editor.blur();
		removeImgFlag();
	}else if(e.shiftKey&&e.keyCode==112){		
		if(!adminDiv)textEditor();
	}else tFlag=0;
},false);

var adminDiv;
function textEditor(){
	if(adminDiv)return;
	removeImgFlag();
	editor.blur();
	adminDiv=ADD(["div",""],document.body,["style","z-index:999999999;background:rgba(240,240,240,.8);width:500px;height:380px;border:1px solid rgba(198,216,234,.8);padding:5px;overflow:hidden;text-align:middle;position:fixed;font-size: 12px;border-radius: 4px;"]);	
	var tDiv=ADD(["div","请输入关键词, 然后点击右下角按钮生成代码"],adminDiv,["class","gszs_admin_border"],["style","background:rgba(199,214,225,.4);"]);
	var closeBtn=ADD(["div","✕"], tDiv,["style","float:right;"],["class","gszs_cur"]);
	var tips=ADD(["div","设置关键词,多个关键词之间用空格隔开"], adminDiv,["style","margin:3px;color:gray"]);
	var titleEl=ADD("div",adminDiv,["class","gszs_editor_focus gszs_ovf gszs_admin_border"],["style","height:50px"],["contenteditable","true"]);
	var tips2=ADD(["div","关键词对应的内容:"], adminDiv,["style","margin:3px;color:gray"]);
	var mDiv=ADD(["div",editor.innerHTML],adminDiv,["class","gszs_editor_focus gszs_ovf gszs_admin_border"],["style","height:220px"],["contenteditable","true"]);
	var submitBtn=ADD(["div","生成代码"],adminDiv,["style","float:right;"],["class","gszs_cur gszs_admin_border"]);
	var restoreBtn=ADD(["div","还原"],adminDiv,["style","float:right;display:none"],["class","gszs_cur gszs_admin_border"]);
	adminDiv.style.top=hh/2-200+"px";
	adminDiv.style.left=ww/2-400+"px";
	mouseMoveElement(tDiv,adminDiv);
	mScroll(titleEl,10);
	mScroll(mDiv,40);	
	closeBtn.onclick=function(){
		adminDiv.parentNode.removeChild(adminDiv);
		adminDiv=null;
	}
	var htmlCode="",ti,con, jsCode;
	submitBtn.onclick=function(){
		ti=titleEl.textContent.replace(/^\s+|\s+$/g,"").replace(/\s+|\n/g," ").replace(/"/g,"\\\"");		
		htmlCode=mDiv.innerHTML;		
		if(/(\s+)?function.*}(\s+)?$/.test(mDiv.textContent)){
			jsCode=mDiv.textContent.match(/(function.*})(\s+)?$/)[1];
			try{eval("("+jsCode+")()")}catch(e){alert("js代码有误!\n"+e)}
			if(ti.length==0){tips.innerHTML="<span style='color:red'>请输入关键词</span>";return}
			mDiv.textContent=',[5,"'+ti+'","执行JS代码",'+jsCode+']';			
		}else{
			if(ti.length==0){tips.innerHTML="<span style='color:red'>请输入关键词</span>";return}
			con=mDiv.innerHTML.replace(/(\\+)?"/g,"\\\"");
			mDiv.textContent=',[1,"'+ti+'","'+con+'"]';
		}		
		tips.innerHTML="设置关键词,多个关键词之间用空格隔开";
		tips2.innerHTML="<span style='color:red'>CTRL+C 复制以下代码到脚本的相应位置</span>";
		var g=document.createRange(),i=document.getSelection();
		g.selectNode(mDiv.childNodes[0]);
		i.removeAllRanges();
		i.addRange(g);
		restoreBtn.style.display="block";
		this.style.display="none";
		mDiv.removeAttribute("contenteditable");
		titleEl.removeAttribute("contenteditable");
	}
	restoreBtn.onclick=function(){
		tips2.innerHTML="关键词对应的内容:";
		submitBtn.style.display="block";
		this.style.display="none";
		mDiv.innerHTML=htmlCode;
		mDiv.setAttribute("contenteditable","true");		
		titleEl.setAttribute("contenteditable","true");
		titleEl.textContent=titleEl.textContent;
	}
	mDiv.onblur=titleEl.onblur=function(){keyFlag=0}
	mDiv.onfocus=titleEl.onfocus=function(){keyFlag=1}
	titleEl.focus();
}
var keyFlag=0;
document.addEventListener("keydown",function(e){
	if(adminDiv&& e.keyCode==8 &&keyFlag==0){e.preventDefault()}
},false);

})();

