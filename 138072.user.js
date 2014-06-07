// ==UserScript==
// @name        E书园导航
// @namespace   http://eshuyuan.com/space-uid-8462.html
// @description 为E书园添加导航
// @include     http://*eshuyuan.com/thread-*
// @include     http://*eshuyuan.com/forum.php?mod=viewthread*
// @version     1
// ==/UserScript==


var daoHang=document.createElement("div")
daoHang.innerHTML='版块导航</h2><dl class="a" id="lf_44"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_44\’)" title="==『书园学堂』==">==『书园学堂』==</a></dt><dd class="bdl_a"><a href="forum-158-1.html" title="新手学园（有不懂问题请在本版发贴提问）">新手学园（有不懂问题请在本版发贴提问）</a></dd><dd><a href="forum-159-1.html" title="技巧普及(切勿提供破解软件说明及相关链接)">技巧普及(切勿提供破解软件说明及相关链接)</a></dd></dl><dl class="" id="lf_1"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_1\’)" title="==『分享一区』==">==『分享一区』==</a></dt><dd><a href="forum-73-1.html" title="人文、社科[刀币 ≥ 20]">人文、社科[刀币 ≥ 20]</a></dd><dd><a href="forum-100-1.html" title="文化、教育">文化、教育</a></dd><dd><a href="forum-101-1.html" title="语言、文字">语言、文字</a></dd><dd><a href="forum-141-1.html" title="文学、艺术[刀币 ≥ 20]">文学、艺术[刀币 ≥ 20]</a></dd></dl><dl class="" id="lf_119"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_119\’)" title="==『分享二区』==">==『分享二区』==</a></dt><dd><a href="forum-142-1.html" title="历史、地理[刀币 ≥ 20]">历史、地理[刀币 ≥ 20]</a></dd><dd><a href="forum-124-1.html" title="哲学、宗教">哲学、宗教</a></dd><dd><a href="forum-122-1.html" title="政治、法律">政治、法律</a></dd><dd><a href="forum-125-1.html" title="财经、管理">财经、管理</a></dd></dl><dl class="" id="lf_120"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_120\’)" title="==『分享三区』==">==『分享三区』==</a></dt><dd><a href="forum-126-1.html" title="医药卫生">医药卫生</a></dd><dd><a href="forum-128-1.html" title="自然科学">自然科学</a></dd><dd><a href="forum-127-1.html" title="农业、工业">农业、工业</a></dd><dd><a href="forum-129-1.html" title="数理、化学">数理、化学</a></dd></dl><dl class="" id="lf_121"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_121\’)" title="==『分享四区』==">==『分享四区』==</a></dt><dd><a href="forum-131-1.html" title="高清外文">高清外文</a></dd><dd><a href="forum-130-1.html" title="计算机专区">计算机专区</a></dd><dd><a href="forum-133-1.html" title="百科全书、工具书">百科全书、工具书</a></dd><dd><a href="forum-139-1.html" title="心理、励志">心理、励志</a></dd></dl><dl class="" id="lf_179"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_179\’)" title="==『分享五区』==">==『分享五区』==</a></dt><dd><a href="forum-180-1.html" title="古籍专区">古籍专区</a></dd><dd><a href="forum-181-1.html" title="清晰期刊整本">清晰期刊整本</a></dd><dd><a href="forum-182-1.html" title="其他分类（以上无法归类的高清图书）">其他分类（以上无法归类的高清图书）</a></dd><dd><a href="forum-183-1.html" title="杂书铺子（清晰pdg、清晰大图、清晰pdf、清晰djvu以外清晰格式）">杂书铺子（清晰pdg、清晰大图、清晰pdf、清晰djvu以外清晰格式）</a></dd><dd><a href="forum-187-1.html" title="有声电子书专区">有声电子书专区</a></dd><dd><a href="forum-188-1.html" title="手工制作专区">手工制作专区</a></dd></dl><dl class="" id="lf_143"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_143\’)" title="==『找书区/回收营/交易区』==">==『找书区/回收营/交易区』==</a></dt><dd><a href="forum-146-1.html" title="快速找书专区">快速找书专区</a></dd><dd><a href="forum-170-1.html" title="非清晰版免费回收营">非清晰版免费回收营</a></dd><dd><a href="forum-186-1.html" title="跳蚤市场（诚信度 ≥ 0， 书迷及以上级别）">跳蚤市场（诚信度 ≥ 0， 书迷及以上级别）</a></dd><dd><a href="forum-176-1.html" title="敏感贴回收营">敏感贴回收营</a></dd></dl><dl class="" id="lf_248"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_248\’)" title="==『特色藏书楼』==">==『特色藏书楼』==</a></dt><dd><a href="forum-249-1.html" title="莎莎推理馆(只收PDG)">莎莎推理馆(只收PDG)</a></dd><dd><a href="forum-253-1.html" title="莎莎生活馆(只收PDG)">莎莎生活馆(只收PDG)</a></dd><dd><a href="forum-251-1.html" title="玄幻居">玄幻居</a></dd><dd><a href="forum-250-1.html" title="弈林院">弈林院</a></dd><dd><a href="forum-252-1.html" title="方志阁">方志阁</a></dd><dd><a href="forum-255-1.html" title="随书光盘专版">随书光盘专版</a></dd></dl><dl class="" id="lf_172"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_172\’)" title="==『网络资源分享区』==">==『网络资源分享区』==</a></dt><dd><a href="forum-173-1.html" title="好软推介（限原链接严禁上传）">好软推介（限原链接严禁上传）</a></dd><dd><a href="forum-174-1.html" title="课件中心">课件中心</a></dd><dd><a href="forum-175-1.html" title="免费账号专区（可隐藏，不可出售）">免费账号专区（可隐藏，不可出售）</a></dd><dd><a href="forum-177-1.html" title="账号销售专区（销售所得，不再评分，售价不得高于50刀）">账号销售专区（销售所得，不再评分，售价不得高于50刀）</a></dd></dl><dl class="" id="lf_68"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_68\’)" title="==『娱乐/博彩区』==（禁止刷屏、广告、表情流、一字党等无意义灌水）">==『娱乐/博彩区』==（禁止刷屏、广告、表情流、一字党等无意义灌水）</a></dt><dd><a href="forum-70-1.html" title="龙门茶社">龙门茶社</a></dd><dd><a href="forum-171-1.html" title="宋财主博彩（刀币 ≥ 50）">宋财主博彩（刀币 ≥ 50）</a></dd></dl><dl class="" id="lf_149"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_149\’)" title="==『书园交流版』（严禁灌水，转贴注明来源）==">==『书园交流版』（严禁灌水，转贴注明来源）==</a></dt><dd><a href="forum-156-1.html" title="图书资讯">图书资讯</a></dd><dd><a href="forum-154-1.html" title="绝对原创">绝对原创</a></dd><dd><a href="forum-155-1.html" title="多媒体专区">多媒体专区</a></dd><dd><a href="forum-185-1.html" title="辩论活动专区">辩论活动专区</a></dd></dl><dl class="" id="lf_36"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_36\’)" title="==『E书园管理中心』==">==『E书园管理中心』==</a></dt><dd><a href="forum-41-1.html" title="网站公告栏">网站公告栏</a></dd><dd><a href="forum-40-1.html" title="网站建设栏">网站建设栏</a></dd></dl><dl class="" id="lf_89"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_89\’)" title="==『胡萝卜俱乐部』==">==『胡萝卜俱乐部』==</a></dt><dd><a href="forum-91-1.html" title="胡萝卜活动区">胡萝卜活动区</a></dd><dd><a href="forum-90-1.html" title="胡萝卜兑换区">胡萝卜兑换区</a></dd></dl><dl class="" id="lf_135"><dt><a href="javascript:;" hidefocus="true" onclick="leftside(\’lf_135\’)" title="==『PDG精英盟』==">==『PDG精英盟』==</a></dt><dd><a href="forum-254-1.html" title="精英盟高清大厅">精英盟高清大厅</a></dd><dd><a href="forum-244-1.html" title="重点套书专项组">重点套书专项组</a></dd></dl>'
document.body.appendChild(daoHang)

//daoHang.setAttribute("id","forumleftside")


//daoHang=document.getElementById('forumleftside');
//daoHangStyl=document.getElementById('forumleftside').style;
daoHang.setAttribute("class","tbn");
var daoHangStyl=daoHang.style
var possXMax=0;possXMin=-150;

daoHang.setAttribute("onMouseover","moveRight()");

daoHang.setAttribute("onMouseout","moveLeft()");
daoHang.setAttribute("style","position:absolute")
daoHangStyl.backgroundColor="#99FF99";
daoHangStyl.left="-157px";


daoHangStyl.width="180px";
daoHangStyl.top="167px";

function moveRight(){
if (window.leftX3)clearInterval(leftX3);rightX3=setInterval("moveRightX()",45);}
function moveLeft(){clearInterval(rightX3);leftX3=setInterval("moveLeft3()",45);}
function moveRightX(){var left=daoHangStyl.left.split('px'); left=parseInt(left[0]);
if (document.getElementById&&left<possXMax){left+=6;daoHangStyl.left=left+'px'; }
else if (window.rightX3)clearInterval(rightX3);}
function moveLeft3(){ var left=daoHangStyl.left.split('px'); left=parseInt(left[0]);
if (document.getElementById&&left>possXMin){left-=5;daoHangStyl.left=left+'px';}else if (window.leftX3)clearInterval(leftX3);}