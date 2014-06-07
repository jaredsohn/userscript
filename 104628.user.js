// ==UserScript==
// @name           GM_test
// @namespace      http://diveintogreasemonkey.org/download/
// @description    test for fun
// @include        http://www.douban.com/*
// @exclude        http://www.douban.com/group/*
// @exclude        http://www.douban.com/photos/*
// @exclude        http://www.douban.com/online/*
// ==/UserScript==

/*
   1.修改豆瓣主页<a>属性，将相册、日记、小组话题、用户、线上活动在新标签页中打开。
   2.友邻说添加转发与回复按钮。
   3.备忘提醒与时间提醒。
   4.Gmail未读邮件提醒
   5.输入框提示字数
   6.隐藏侧栏
*/

/*页面跳转*/

//正则筛选链接
var ret = new RegExp("http://www.douban.com/group/topic/*")
var reph = new RegExp("http://www.douban.com/photos/photo/*")
var ren = new RegExp("http://www.douban.com/note/*")
var rea = new RegExp("http://www.douban.com/photos/album/*")
var rep = new RegExp("http://www.douban.com/people/*")
var reo = new RegExp("http://www.douban.com/online/*");

     var alllinks;
     alllinks = xpath("//a[@href]");
	 for (var i = 0; i < alllinks.snapshotLength; i++) {
	 thisLink = alllinks.snapshotItem(i);
	 if(ret.test(thisLink.href)){
	 thisLink.target = "_blank";
	 }
	 if(reph.test(thisLink.href)){
	 thisLink.target = "_blank";
	 }
	  if(ren.test(thisLink.href)){
	 thisLink.target = "_blank";
	 }
	   if(rea.test(thisLink.href)){
	 thisLink.target = "_blank";
	 }
	   if(rep.test(thisLink.href)){
	 thisLink.target = "_blank";
	 }
	   if(reo.test(thisLink.href)){
	 thisLink.target = "_blank";
	 }
	 }
	 
/*备忘录与时间提醒*/

var logo = document.createElement("div");
var links = document.createElement("a");
links.setAttribute("href","javascript:");
logo.setAttribute("style","bottom: 10pt; position: fixed;border: 1px;right: 3%;color:#1398B0;font:12px Tahoma,Geneva,sans-serif");
logo.setAttribute("id","beiwanglu");
document.body.appendChild(logo);
links.innerHTML="备忘";
links.addEventListener("click",show,true);//隐藏显示
logo.appendChild(links);
GM_addStyle('#bwl_div{right:0;bottom:10%;position:fixed;padding:10px;width:180px;border:1px solid #BBBBBB;;visibility: hidden;background:#EBF8F9}')

var bwl = document.createElement("div");bwl.id = 'bwl_div'; //主界面
var input = document.createElement("textarea"); input.id="bw"//备忘输入框
var ti = document.createElement("span");ti.innerHTML="时间&nbsp;&nbsp;" 
input.addEventListener("focus",hl_input,true)//输入框高亮
var begin = document.createElement("input");begin.type = "text";begin.size="2";begin.maxLength="2";begin.id="time"//时间输入框
var bu = document.createElement("input");bu.setAttribute("type","button");bu.value = "确定"; //按钮

//时间提醒
var sleep = document.createElement("div");
sleep.innerHTML = '睡眠提醒 <input id="bt" type="text" size="2" maxLength="2" />至<input id="et" type="text" size="2" maxLength="2" />';
var butt = document.createElement("input");
butt.setAttribute("type","button");
butt.value = "确定";

//添加睡眠时间提醒
butt.addEventListener("click",function(){
GM_setValue("bt",document.getElementById("bt").value)
GM_setValue("et",document.getElementById("et").value)
},true);

sleep.appendChild(butt);
bwl.appendChild(input);
bwl.insertBefore(ti,input.nextSibling);
bwl.insertBefore(begin,ti.nextSibling);
bwl.insertBefore(bu,begin.nextSibling);
bwl.insertBefore(sleep,bu.nextSibling);
document.body.appendChild(bwl);

//睡眠提醒
var currenttime;
var d = new Date;
var currenttime = d.getHours();
var bt=GM_getValue("bt");
var et =GM_getValue("et");
if(bt!=""&& et!=""){
	var b = document.getElementById("bt")
	b.value = bt;
	var e = document.getElementById("et")
	e.value = et;
if(currenttime>=bt&&currenttime<=et){
	alert("time to sleep");
}
}

var bw = GM_getValue("bw");
var t = GM_getValue("time","null");
//判断备忘是否为空，不为空则显示
if(bw!=""){
	var div2 = document.createElement("div");
	var span = document.createElement("span");
	//取消备忘
	var a = document.createElement("a");
	a.innerHTML = "取消";
	a.setAttribute("text-decoration","none");
	a.setAttribute("href","javascript:");
	a.addEventListener("click",function(){GM_setValue("bw","");GM_setValue("time","");div2.removeChild(this)},true);
	
	span.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
	div2.innerHTML = bw;
	bwl.insertBefore(div2,input);
	div2.appendChild(span);
	div2.insertBefore(a,span.nextSibling);
	}
//备忘提示
if(t!=""&&bw!=""){
if(currenttime >=t){
	var timeup = document.createElement("div");
	timeup.innerHTML = bw;
	timeup.id="tixing";
	timeup.setAttribute("style","top:30%;position:fixed;padding:10px;width:150px;border:1px solid #BBBBBB;background:#E9F4E9")
	document.body.appendChild(timeup);
	}
}

//添加备忘
if(GM_getValue("bw")==""){
  bu.addEventListener("click",function(){
  GM_setValue("bw",begin.value+"点要"+input.value);input.value="";
  GM_setValue("time",begin.value);begin.value="";
  var div1 = document.createElement("div");div1.innerHTML = GM_getValue("bw");bwl.insertBefore(div1,input);},true);
}
//显示隐藏界面
function show(){
	var bwl = document.getElementById("bwl_div");
	if(bwl.style.visibility=="hidden"){
                bwl.style.visibility="visible";
       }else{
               bwl.style.visibility="hidden";
    }
}

/*豆瓣说转发与回复*/

//form与输入框
var mbform = document.getElementsByName("mbform").item(0);
var comment = document.getElementsByName("comment").item(0);
//查找所有豆瓣说过滤推荐内容
var mbs = xpath("//a[@class='j a_saying_reply']");
//添加RT
var reg = new RegExp("&nbsp;")
for(var i = 0; i < mbs.snapshotLength; i++) {
	var span = document.createElement("span");
	var space = document.createElement("span");
	space.innerHTML= "&nbsp;&nbsp;&middot;&nbsp;&nbsp;"
	var rt = document.createElement("a");
	
	mb = mbs.snapshotItem(i);
	var time = mb.parentNode.parentNode.previousSibling.innerHTML; //获取发布时间
	var name = mb.parentNode.parentNode.parentNode.getElementsByTagName("a").item(0).innerHTML;//获取名字
	time = time.replace(reg," ").replace(reg," ");//去除前后&nbsp;重复两次replace
	var say = mb.parentNode.parentNode.firstChild.innerHTML; //获取我说内容 <a>标签未处理
    name += time+say;
	rt.innerHTML = "转发";
    rt.setAttribute("href","#");
	rt.setAttribute("name",name); //给每个RT设置属性name值为 name+time+say
	rt.setAttribute("style","text-decoration:none;color:#83BF73;font-weight: 700")
	rt.addEventListener("click",function(){comment.value = this.name;comment.focus();mbform.submit();},true);
	span.appendChild(rt);
	mb.parentNode.insertBefore(span,mb.nextSibling);
	mb.parentNode.insertBefore(space,mb.nextSibling);
	mb.addEventListener("click",showreply,true); 
}
//设置延时获取子节点 必须在链接的第一个方法（提交请求）获取返回值后再执行，否者无法获得生成的div
function showreply()
	{
		setTimeout(getreply,200)
		 }
//添加回复
function getreply(){
	   var replylist = xpath("//div[@class='simplelst']");
	   for(var i = 0;i<replylist.snapshotLength;i++)
	   {
	        var form = xpath("//input[@name='comment']").snapshotItem(0);//输入框
			var simplelst = replylist.snapshotItem(i);
			var span = document.createElement("span");
	        var reply = document.createElement("a");
			reply.innerHTML = "回复";
			reply.setAttribute("href","javascript:");
			reply.setAttribute("style","text-decoration:none;color:#1398B0;font-weight: 600")
			reply.name = "@"+simplelst.getElementsByTagName("a").item(0).innerHTML+" ";//获取姓名
			reply.addEventListener("click",function(){form.value = this.name;form.focus();},true);
			span.appendChild(reply);
			simplelst.appendChild(span);
		   }
	}

/*邮件提醒*/

//请求与接收，通过rss获取未读邮件（需先输入账号密码订阅）
GM_xmlhttpRequest(
{
method: 'GET',
url: 'https://mail.google.com/mail/feed/atom',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(responseDetails) 
  { 
  var dom = new createXml(responseDetails.responseText); //将字符串转换为xml
  var count = dom.getElementsByTagName("fullcount").item(0).firstChild.data; //获取邮件总数
  //如果没有未读邮件则不显示
  if(parseInt(count)>0){
  var icon = document.createElement("img"); //gmail图标
  icon.src = "http://mail.google.com/mail/images/favicon.ico";
   var mail = document.createElement("div");
   mail.id = "mail";
   mail.appendChild(icon);
  var span = document.createElement("span");
  span.innerHTML = "  (<a href='https://mail.google.com/mail' style='color:red;text-decoration:none' target='_blank' title='点击查看'>"+count+"</a>)";
  mail.appendChild(span);
  GM_addStyle('#mail{top:5px;position:fixed;float:left;cursor:pointer;font:12px Tahoma,Geneva,sans-serif;}');
  // xpath("//div[@class='top-nav']").snapshotItem(0).appendChild(mail);
  document.body.appendChild(mail);
  }
}
});

/*var timeline = xpath("//div[@class='timeline-album']")
var aimg = xpath("//div[@class='timeline-album']/a"); 
var imgsrc = xpath("//div[@class='timeline-album']/a/img"); 
var bgdiv = document.createElement('div');//覆盖背景
var show_pic = document.createElement('div');
var pic = document.createElement('img');
pic.id = 'pic';
bgdiv.id = 'newbg';
show_pic.id = 'showpic';
GM_addStyle('#pic{width:auto;height:auto;cursor:pointer;}');
GM_addStyle('#showpic{top:10%;right:50%;overflow:visible;position:fixed;background:black;opacity:1;}');
GM_addStyle('#newbg{width:100%;height:100%;background:#999;top:0;right:0;position: fixed;opacity:.9;display:none;}');
for(var i = 0;i<aimg.snapshotLength;i++){
		var src = imgsrc.snapshotItem(i).src;
		var newsrc = 'http://img3.douban.com/view/photo/photo/public/'+src.slice(46);
		var alt = imgsrc.snapshotItem(i).alt;
		aimg.snapshotItem(i).addEventListener('click',function(){
			document.body.appendChild(bgdiv);
			delete this.onclick;
			this.href = 'javascript:';
			pic.src = newsrc;
			bgdiv.style.display = 'block';
			show_pic.appendChild(pic);
			bgdiv.appendChild(show_pic);
			pic.addEventListener('click',function(){
				bgdiv.style.display = 'none';
				},true);
		},true);
	}
*/
 
/*验证输入框字数*/ 
var db_comment = document.getElementsByName('comment')[0];
db_comment.addEventListener('keyup',function(){
	currentLength = this.value.length;
	var maxLength = 128;
	if(currentLength > maxLength){
		alert('字数超出');
		}
	this.relatedElement.firstChild.nodeValue = maxLength - currentLength;
	},true);
GM_addStyle('.countor{font-weight:600;font-size:14;color:#999999;margin:5px 0 0 5px;}')
var countor = document.createElement('h2');
countor.className = 'countor';
countor.innerHTML = '128';
db_comment.parentNode.insertBefore(countor,db_comment.nextSibling);
db_comment.relatedElement = countor;


/*隐藏侧栏*/
var enter = xpath("//div[@class='enter']");
enter.snapshotItem(0).setAttribute('style','display:none');
document.getElementById('friend').style.display = 'none';
document.getElementById('friend-3').style.display = 'none';


//字符串转换xml
function createXml(str){
　　if(document.all){
　　var xmlDom=new ActiveXObject("Microsoft.XMLDOM")
　　xmlDom.loadXML(str)
　　return xmlDom
　　}
　　else
　　return new DOMParser().parseFromString(str, "text/xml")
　　}


//xpath
function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
//输入框高亮 from doubanhelper
function hl_input() {
	if (GM_getValue('hl_input', true)){
		GM_addStyle('input:focus, select:focus, textarea:focus {-moz-outline: 2px solid -moz-rgba(255,153,0,0.5);outline: 2px solid -moz-rgba(255,153,0,0.5);-moz-outline-radius: 3px;-webkit-outline-radius: 3px;}');
	}
};